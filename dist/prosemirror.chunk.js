(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["prosemirror"],{

/***/ "./src/components/editor/prosemirror/extensions/markdown/markdownitMathParserPlugin.ts":
/*!*********************************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/markdown/markdownitMathParserPlugin.ts ***!
  \*********************************************************************************************/
/*! exports provided: mathParserPlugin */
/*! exports used: mathParserPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mathParserPlugin; });
function isValidDelim(state, pos) {
    let prevChar, nextChar, max = state.posMax, can_open = true, can_close = true;
    prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;
    if (prevChar === 32 || prevChar === 9 || nextChar >= 48 && nextChar <= 57) {
        can_close = false;
    }
    if (nextChar === 32 || nextChar === 9) {
        can_open = false;
    }
    return {
        can_open: can_open,
        can_close: can_close
    };
}
function math_inline(state, silent) {
    let start, match, token, res, pos;
    if (state.src[state.pos] !== '$') {
        return false;
    }
    res = isValidDelim(state, state.pos);
    if (!res.can_open) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos += 1;
        return true;
    }
    start = state.pos + 1;
    match = start;
    while ((match = state.src.indexOf('$', match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === '\\') {
            pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
            break;
        }
        match += 1;
    }
    if (match === -1) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }
    if (match - start === 0) {
        if (!silent) {
            state.pending += '$$';
        }
        state.pos = start + 1;
        return true;
    }
    res = isValidDelim(state, match);
    if (!res.can_close) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }
    if (!silent) {
        token = state.push('math_inline', 'math', 0);
        token.markup = '$';
        token.content = state.src.slice(start, match);
    }
    state.pos = match + 1;
    return true;
}
function math_block(state, start, end, silent) {
    let firstLine, lastLine, next, lastPos, found = false, token, pos = state.bMarks[start] + state.tShift[start], max = state.eMarks[start];
    if (pos + 2 > max) {
        return false;
    }
    if (state.src.slice(pos, pos + 2) !== '$$') {
        return false;
    }
    pos += 2;
    firstLine = state.src.slice(pos, max);
    if (silent) {
        return true;
    }
    if (firstLine.trim().slice(-2) === '$$') {
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
    }
    for (next = start; !found;) {
        next++;
        if (next >= end) {
            break;
        }
        pos = state.bMarks[next] + state.tShift[next];
        max = state.eMarks[next];
        if (pos < max && state.tShift[next] < state.blkIndent) {
            break;
        }
        if (state.src.slice(pos, max).trim().slice(-2) === '$$') {
            lastPos = state.src.slice(0, max).lastIndexOf('$$');
            lastLine = state.src.slice(pos, lastPos);
            found = true;
        }
    }
    state.line = next + 1;
    token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '') + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [
        start,
        state.line
    ];
    token.markup = '$$';
    return true;
}
function mathParserPlugin(md) {
    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: [
            'paragraph',
            'reference',
            'blockquote',
            'list'
        ]
    });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/markdown/parser.ts":
/*!*************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/markdown/parser.ts ***!
  \*************************************************************************/
/*! exports provided: MarkdownParser, createMarkdownParser */
/*! exports used: createMarkdownParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MarkdownParser */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createMarkdownParser; });
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js");
/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(markdown_it__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _markdownitMathParserPlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdownitMathParserPlugin */ "./src/components/editor/prosemirror/extensions/markdown/markdownitMathParserPlugin.ts");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");



function maybeMerge(a, b) {
    if (a.isText && b.isText && prosemirror_model__WEBPACK_IMPORTED_MODULE_2__[/* Mark */ "d"].sameSet(a.marks, b.marks))
        return a.withText(a.text + b.text);
}
class MarkdownParseState {
    constructor(schema, tokenHandlers) {
        this.schema = schema;
        this.stack = [{
                type: schema.topNodeType,
                content: []
            }];
        this.marks = prosemirror_model__WEBPACK_IMPORTED_MODULE_2__[/* Mark */ "d"].none;
        this.tokenHandlers = tokenHandlers;
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    push(elt) {
        if (this.stack.length)
            this.top().content.push(elt);
    }
    addText(text) {
        if (!text)
            return;
        const nodes = this.top().content, last = nodes[nodes.length - 1];
        const node = this.schema.text(text, this.marks);
        let merged;
        if (last && (merged = maybeMerge(last, node)))
            nodes[nodes.length - 1] = merged;
        else
            nodes.push(node);
    }
    openMark(mark) {
        this.marks = mark.addToSet(this.marks);
    }
    closeMark(mark) {
        this.marks = mark.removeFromSet(this.marks);
    }
    parseTokens(toks) {
        for (let i = 0; i < toks.length; i++) {
            const tok = toks[i];
            const handler = this.tokenHandlers[tok.type];
            if (!handler)
                throw new Error('Token type `' + tok.type + '` not supported by Markdown parser');
            handler(this, tok, toks, i);
        }
    }
    addNode(type, attrs, content) {
        const node = type.createAndFill(attrs, content, this.marks);
        if (!node)
            return null;
        this.push(node);
        return node;
    }
    openNode(type, attrs) {
        this.stack.push({
            type: type,
            attrs: attrs,
            content: []
        });
    }
    closeNode() {
        if (this.marks.length)
            this.marks = prosemirror_model__WEBPACK_IMPORTED_MODULE_2__[/* Mark */ "d"].none;
        const info = this.stack.pop();
        return this.addNode(info.type, info.attrs, info.content);
    }
}
function attrs(spec, token, tokens, i) {
    if (spec.getAttrs)
        return spec.getAttrs(token, tokens, i);
    else if (spec.attrs instanceof Function)
        return spec.attrs(token);
    else
        return spec.attrs;
}
function noCloseToken(spec, type) {
    return spec.noCloseToken || type == 'code_inline' || type == 'code_block' || type == 'fence';
}
function withoutTrailingNewline(str) {
    return str[str.length - 1] == '\n' ? str.slice(0, str.length - 1) : str;
}
function noOp() {
}
function tokenHandlers(schema, tokens) {
    const handlers = Object.create(null);
    for (const type in tokens) {
        const spec = tokens[type];
        if (spec.block) {
            const nodeType = schema.nodeType(spec.block);
            if (noCloseToken(spec, type)) {
                handlers[type] = (state, tok, tokens, i) => {
                    state.openNode(nodeType, attrs(spec, tok, tokens, i));
                    state.addText(withoutTrailingNewline(tok.content));
                    state.closeNode();
                };
            } else {
                handlers[type + '_open'] = (state, tok, tokens, i) => state.openNode(nodeType, attrs(spec, tok, tokens, i));
                handlers[type + '_close'] = state => state.closeNode();
            }
        } else if (spec.node) {
            const nodeType = schema.nodeType(spec.node);
            handlers[type] = (state, tok, tokens, i) => state.addNode(nodeType, attrs(spec, tok, tokens, i));
        } else if (spec.mark) {
            const markType = schema.marks[spec.mark];
            if (noCloseToken(spec, type)) {
                handlers[type] = (state, tok, tokens, i) => {
                    state.openMark(markType.create(attrs(spec, tok, tokens, i)));
                    state.addText(withoutTrailingNewline(tok.content));
                    state.closeMark(markType);
                };
            } else {
                handlers[type + '_open'] = (state, tok, tokens, i) => state.openMark(markType.create(attrs(spec, tok, tokens, i)));
                handlers[type + '_close'] = state => state.closeMark(markType);
            }
        } else if (spec.ignore) {
            if (noCloseToken(spec, type)) {
                handlers[type] = noOp;
            } else {
                handlers[type + '_open'] = noOp;
                handlers[type + '_close'] = noOp;
            }
        } else {
            throw new RangeError('Unrecognized parsing spec ' + JSON.stringify(spec));
        }
    }
    handlers.text = (state, tok) => state.addText(tok.content);
    handlers.inline = (state, tok) => state.parseTokens(tok.children);
    handlers.softbreak = handlers.softbreak || (state => state.addText('\n'));
    return handlers;
}
class MarkdownParser {
    constructor(schema, tokenizer, tokens) {
        this.tokens = tokens;
        this.schema = schema;
        this.tokenizer = tokenizer;
        this.tokenHandlers = tokenHandlers(schema, tokens);
    }
    parse(text) {
        const state = new MarkdownParseState(this.schema, this.tokenHandlers);
        let doc;
        state.parseTokens(this.tokenizer.parse(text, {}));
        do {
            doc = state.closeNode();
        } while (state.stack.length);
        return doc;
    }
}
function listIsTight(tokens, i) {
    while (++i < tokens.length)
        if (tokens[i].type != 'list_item_open')
            return tokens[i].hidden;
    return false;
}
function createMarkdownParser(schema) {
    const mdit = markdown_it__WEBPACK_IMPORTED_MODULE_0___default()('commonmark', { html: false });
    mdit.use(_markdownitMathParserPlugin__WEBPACK_IMPORTED_MODULE_1__[/* mathParserPlugin */ "a"]);
    return new MarkdownParser(schema, mdit, {
        blockquote: { block: 'blockquote' },
        paragraph: { block: 'paragraph' },
        list_item: { block: 'list_item' },
        bullet_list: {
            block: 'bullet_list',
            getAttrs: (_, tokens, i) => ({ tight: listIsTight(tokens, i) })
        },
        ordered_list: {
            block: 'ordered_list',
            getAttrs: (tok, tokens, i) => ({
                order: +tok.attrGet('start') || 1,
                tight: listIsTight(tokens, i)
            })
        },
        heading: {
            block: 'heading',
            getAttrs: tok => ({ level: +tok.tag.slice(1) })
        },
        code_block: {
            block: 'code_block',
            noCloseToken: true
        },
        fence: {
            block: 'code_block',
            getAttrs: tok => ({ params: tok.info || '' }),
            noCloseToken: true
        },
        hr: { node: 'horizontal_rule' },
        image: {
            node: 'image',
            getAttrs: tok => ({
                src: tok.attrGet('src'),
                title: tok.attrGet('title') || null,
                alt: tok.children[0] && tok.children[0].content || null
            })
        },
        hardbreak: { node: 'hard_break' },
        math_inline: {
            block: 'math_inline',
            noCloseToken: true
        },
        math_block: {
            block: 'math_block',
            noCloseToken: true
        },
        em: { mark: 'em' },
        strong: { mark: 'strong' },
        link: {
            mark: 'link',
            getAttrs: tok => ({
                href: tok.attrGet('href'),
                title: tok.attrGet('title') || null
            })
        },
        code_inline: {
            mark: 'code',
            noCloseToken: true
        }
    });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/markdown/serializer.ts":
/*!*****************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/markdown/serializer.ts ***!
  \*****************************************************************************/
/*! exports provided: MarkdownSerializer, createMarkdownSerializer */
/*! exports used: createMarkdownSerializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MarkdownSerializer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createMarkdownSerializer; });
/* harmony import */ var _serializerState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serializerState */ "./src/components/editor/prosemirror/extensions/markdown/serializerState.ts");

function backticksFor(node, side) {
    const ticks = /`+/g;
    let m;
    let len = 0;
    if (node.isText)
        while (m = ticks.exec(node.text))
            len = Math.max(len, m[0].length);
    let result = len > 0 && side > 0 ? ' `' : '`';
    for (let i = 0; i < len; i++)
        result += '`';
    if (len > 0 && side < 0)
        result += ' ';
    return result;
}
function isPlainURL(link, parent, index, side) {
    if (link.attrs.title || !/^\w+:/.test(link.attrs.href))
        return false;
    const content = parent.child(index + (side < 0 ? -1 : 0));
    if (!content.isText || content.text != link.attrs.href || content.marks[content.marks.length - 1] != link)
        return false;
    if (index == (side < 0 ? 1 : parent.childCount - 1))
        return true;
    const next = parent.child(index + (side < 0 ? -2 : 1));
    return !link.isInSet(next.marks);
}
class MarkdownSerializer {
    constructor(nodes, marks) {
        this.nodes = nodes;
        this.marks = marks;
    }
    serialize(content, options) {
        const state = new _serializerState__WEBPACK_IMPORTED_MODULE_0__[/* MarkdownSerializerState */ "a"](this.nodes, this.marks, options);
        state.renderContent(content);
        return state.out;
    }
}
function createMarkdownSerializer() {
    return new MarkdownSerializer({
        blockquote(state, node) {
            state.wrapBlock('> ', null, node, () => state.renderContent(node));
        },
        code_block(state, node) {
            state.write('```' + (node.attrs.params || '') + '\n');
            state.text(node.textContent, false);
            state.ensureNewLine();
            state.write('```');
            state.closeBlock(node);
        },
        heading(state, node) {
            state.write(state.repeat('#', node.attrs.level) + ' ');
            state.renderInline(node);
            state.closeBlock(node);
        },
        horizontal_rule(state, node) {
            state.write(node.attrs.markup || '---');
            state.closeBlock(node);
        },
        bullet_list(state, node) {
            state.renderList(node, '  ', () => (node.attrs.bullet || '*') + ' ');
        },
        ordered_list(state, node) {
            const start = node.attrs.order || 1;
            const maxW = String(start + node.childCount - 1).length;
            const space = state.repeat(' ', maxW + 2);
            state.renderList(node, space, i => {
                const nStr = String(start + i);
                return state.repeat(' ', maxW - nStr.length) + nStr + '. ';
            });
        },
        list_item(state, node) {
            state.renderContent(node);
        },
        math_inline(state, node) {
            state.write('$' + node.textContent + '$');
        },
        math_block(state, node) {
            state.write('$$\n');
            state.text(node.textContent, false);
            state.ensureNewLine();
            state.write('$$');
            state.closeBlock(node);
        },
        paragraph(state, node) {
            state.renderInline(node);
            state.closeBlock(node);
        },
        image(state, node) {
            state.write('![' + state.esc(node.attrs.alt || '') + '](' + state.esc(node.attrs.src) + (node.attrs.title ? ' ' + state.quote(node.attrs.title) : '') + ')');
        },
        hard_break(state, node, parent, index) {
            for (let i = index + 1; i < parent.childCount; i++)
                if (parent.child(i).type != node.type) {
                    state.write('\\\n');
                    return;
                }
        },
        text(state, node) {
            state.text(node.text);
        }
    }, {
        em: {
            open: '*',
            close: '*',
            mixable: true,
            expelEnclosingWhitespace: true
        },
        strong: {
            open: '**',
            close: '**',
            mixable: true,
            expelEnclosingWhitespace: true
        },
        link: {
            open(_state, mark, parent, index) {
                return isPlainURL(mark, parent, index, 1) ? '<' : '[';
            },
            close(state, mark, parent, index) {
                return isPlainURL(mark, parent, index, -1) ? '>' : '](' + state.esc(mark.attrs.href) + (mark.attrs.title ? ' ' + state.quote(mark.attrs.title) : '') + ')';
            }
        },
        code: {
            open(_state, _mark, parent, index) {
                return backticksFor(parent.child(index), -1);
            },
            close(_state, _mark, parent, index) {
                return backticksFor(parent.child(index - 1), 1);
            },
            escape: false
        }
    });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/markdown/serializerState.ts":
/*!**********************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/markdown/serializerState.ts ***!
  \**********************************************************************************/
/*! exports provided: MarkdownSerializerState */
/*! exports used: MarkdownSerializerState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarkdownSerializerState; });
class MarkdownSerializerState {
    constructor(nodes, marks, options) {
        this.nodes = nodes;
        this.marks = marks;
        this.delim = this.out = '';
        this.closed = false;
        this.inTightList = false;
        this.options = options || {};
        if (typeof this.options.tightLists == 'undefined')
            this.options.tightLists = false;
    }
    flushClose(size) {
        if (this.closed) {
            if (!this.atBlank())
                this.out += '\n';
            if (size == null)
                size = 2;
            if (size > 1) {
                let delimMin = this.delim;
                const trim = /\s+$/.exec(delimMin);
                if (trim)
                    delimMin = delimMin.slice(0, delimMin.length - trim[0].length);
                for (let i = 1; i < size; i++)
                    this.out += delimMin + '\n';
            }
            this.closed = false;
        }
    }
    wrapBlock(delim, firstDelim, node, f) {
        const old = this.delim;
        this.write(firstDelim || delim);
        this.delim += delim;
        f();
        this.delim = old;
        this.closeBlock(node);
    }
    atBlank() {
        return /(^|\n)$/.test(this.out);
    }
    ensureNewLine() {
        if (!this.atBlank())
            this.out += '\n';
    }
    write(content) {
        this.flushClose();
        if (this.delim && this.atBlank())
            this.out += this.delim;
        if (content)
            this.out += content;
    }
    closeBlock(node) {
        this.closed = node;
    }
    text(text, escape) {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const startOfLine = this.atBlank() || this.closed;
            this.write();
            this.out += escape !== false ? this.esc(lines[i], !!startOfLine) : lines[i];
            if (i != lines.length - 1)
                this.out += '\n';
        }
    }
    render(node, parent, index) {
        if (typeof parent == 'number')
            throw new Error('!');
        if (!this.nodes[node.type.name])
            throw new Error('Token type `' + node.type.name + '` not supported by Markdown renderer');
        this.nodes[node.type.name](this, node, parent, index);
    }
    renderContent(parent) {
        parent.forEach((node, _, i) => this.render(node, parent, i));
    }
    renderInline(parent) {
        const active = [];
        let trailing = '';
        const progress = (node, _, index) => {
            let marks = node ? node.marks : [];
            if (node && node.type.name === 'hard_break')
                marks = marks.filter(m => {
                    if (index + 1 == parent.childCount)
                        return false;
                    const next = parent.child(index + 1);
                    return m.isInSet(next.marks) && (!next.isText || /\S/.test(next.text));
                });
            let leading = trailing;
            trailing = '';
            if (node && node.isText && marks.some(mark => {
                    const info = this.marks[mark.type.name];
                    return info && info.expelEnclosingWhitespace;
                })) {
                const [_, lead, inner, trail] = /^(\s*)(.*?)(\s*)$/m.exec(node.text);
                leading += lead;
                trailing = trail;
                if (lead || trail) {
                    node = inner ? node.withText(inner) : null;
                    if (!node)
                        marks = active;
                }
            }
            const inner = marks.length && marks[marks.length - 1];
            const noEsc = inner && this.marks[inner.type.name].escape === false;
            const len = marks.length - (noEsc ? 1 : 0);
            outer:
                for (let i = 0; i < len; i++) {
                    const mark = marks[i];
                    if (!this.marks[mark.type.name].mixable)
                        break;
                    for (let j = 0; j < active.length; j++) {
                        const other = active[j];
                        if (!this.marks[other.type.name].mixable)
                            break;
                        if (mark.eq(other)) {
                            if (i > j)
                                marks = marks.slice(0, j).concat(mark).concat(marks.slice(j, i)).concat(marks.slice(i + 1, len));
                            else if (j > i)
                                marks = marks.slice(0, i).concat(marks.slice(i + 1, j)).concat(mark).concat(marks.slice(j, len));
                            continue outer;
                        }
                    }
                }
            let keep = 0;
            while (keep < Math.min(active.length, len) && marks[keep].eq(active[keep]))
                ++keep;
            while (keep < active.length)
                this.text(this.markString(active.pop(), false, parent, index), false);
            if (leading)
                this.text(leading);
            if (node) {
                while (active.length < len) {
                    const add = marks[active.length];
                    active.push(add);
                    this.text(this.markString(add, true, parent, index), false);
                }
                if (noEsc && node.isText)
                    this.text(this.markString(inner, true, parent, index) + node.text + this.markString(inner, false, parent, index + 1), false);
                else
                    this.render(node, parent, index);
            }
        };
        parent.forEach(progress);
        progress(null, null, parent.childCount);
    }
    renderList(node, delim, firstDelim) {
        if (this.closed && this.closed.type == node.type)
            this.flushClose(3);
        else if (this.inTightList)
            this.flushClose(1);
        const isTight = typeof node.attrs.tight != 'undefined' ? node.attrs.tight : this.options.tightLists;
        const prevTight = this.inTightList;
        this.inTightList = isTight;
        node.forEach((child, _, i) => {
            if (i && isTight)
                this.flushClose(1);
            this.wrapBlock(delim, firstDelim(i), node, () => this.render(child, node, i));
        });
        this.inTightList = prevTight;
    }
    esc(str, startOfLine) {
        str = str.replace(/[`*\\~\[\]]/g, '\\$&');
        if (startOfLine)
            str = str.replace(/^[:#\-*+]/, '\\$&').replace(/^(\s*\d+)\./, '$1\\.');
        return str;
    }
    quote(str) {
        const wrap = str.indexOf('"') == -1 ? '""' : str.indexOf('\'') == -1 ? '\'\'' : '()';
        return wrap[0] + str + wrap[1];
    }
    repeat(str, n) {
        let out = '';
        for (let i = 0; i < n; i++)
            out += str;
        return out;
    }
    markString(mark, open, parent, index) {
        const info = this.marks[mark.type.name];
        const value = open ? info.open : info.close;
        return typeof value == 'string' ? value : value(this, mark, parent, index);
    }
    getEnclosingWhitespace(text) {
        return {
            leading: (text.match(/^(\s+)/) || [])[0],
            trailing: (text.match(/(\s+)$/) || [])[0]
        };
    }
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/index.ts":
/*!********************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/index.ts ***!
  \********************************************************************/
/*! exports provided: buildMathPlugins, createMathView, insertMath */
/*! exports used: buildMathPlugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildMathPlugins; });
/* unused harmony export insertMath */
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _plugins_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/select */ "./src/components/editor/prosemirror/extensions/math/plugins/select.ts");
/* harmony import */ var _plugins_inputrules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/inputrules */ "./src/components/editor/prosemirror/extensions/math/plugins/inputrules.ts");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugin */ "./src/components/editor/prosemirror/extensions/math/plugin.ts");




function buildMathPlugins(schema) {
    return [
        _plugin__WEBPACK_IMPORTED_MODULE_3__[/* mathPlugin */ "a"],
        _plugins_select__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
        Object(_plugins_inputrules__WEBPACK_IMPORTED_MODULE_2__[/* buildMathInputRules */ "a"])(schema)
    ];
}

function insertMath(schema) {
    const mathType = schema.nodes.inlinemath;
    return function (state, dispatch) {
        const {$from} = state.selection, index = $from.index();
        if (!$from.parent.canReplaceWith(index, index, mathType)) {
            return false;
        }
        if (dispatch) {
            let tr = state.tr.replaceSelectionWith(mathType.create({}));
            tr = tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].create(tr.doc, $from.pos));
            dispatch(tr);
        }
        return true;
    };
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/nodeView.ts":
/*!***********************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/nodeView.ts ***!
  \***********************************************************************/
/*! exports provided: MathView */
/*! exports used: MathView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MathView; });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_keymap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-keymap */ "./node_modules/prosemirror-keymap/dist/index.es.js");
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! katex */ "./node_modules/katex/dist/katex.js");
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(katex__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_katex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../helpers/katex */ "./src/components/helpers/katex.ts");







const katex = Object(_helpers_katex__WEBPACK_IMPORTED_MODULE_6__[/* katexLoader */ "c"])();
class MathView {
    constructor(node, view, getPos, options = {}, onDestroy) {
        this._node = node;
        this._outerView = view;
        this._getPos = getPos;
        this._onDestroy = onDestroy && onDestroy.bind(this);
        this.cursorSide = 'start';
        this._isEditing = false;
        this._katexOptions = Object.assign({
            globalGroup: true,
            throwOnError: false
        }, options.katexOptions);
        this._tagName = options.tagName || this._node.type.name.replace('_', '-');
        this.dom = document.createElement(this._tagName);
        this.dom.classList.add('math-node');
        this._mathRenderElt = document.createElement('span');
        this._mathRenderElt.textContent = '';
        this._mathRenderElt.classList.add('math-render');
        this.dom.appendChild(this._mathRenderElt);
        this._mathSrcElt = document.createElement('span');
        this._mathSrcElt.classList.add('math-src');
        this.dom.appendChild(this._mathSrcElt);
        this.dom.addEventListener('click', () => this.ensureFocus());
        this.renderMath();
    }
    destroy() {
        this.closeEditor(false);
        if (this._mathRenderElt) {
            this._mathRenderElt.remove();
            delete this._mathRenderElt;
        }
        if (this._mathSrcElt) {
            this._mathSrcElt.remove();
            delete this._mathSrcElt;
        }
        delete this.dom;
    }
    ensureFocus() {
        if (this._innerView && this._outerView.hasFocus()) {
            this._innerView.focus();
        }
    }
    update(node, decorations) {
        if (!node.sameMarkup(this._node))
            return false;
        this._node = node;
        if (this._innerView) {
            const state = this._innerView.state;
            const start = node.content.findDiffStart(state.doc.content);
            if (start != null) {
                const diff = node.content.findDiffEnd(state.doc.content);
                if (diff) {
                    let {
                        a: endA,
                        b: endB
                    } = diff;
                    const overlap = start - Math.min(endA, endB);
                    if (overlap > 0) {
                        endA += overlap;
                        endB += overlap;
                    }
                    this._innerView.dispatch(state.tr.replace(start, endB, node.slice(start, endA)).setMeta('fromOutside', true));
                }
            }
        }
        if (!this._isEditing) {
            this.renderMath();
        }
        return true;
    }
    updateCursorPos(state) {
        const pos = this._getPos();
        const size = this._node.nodeSize;
        const inPmSelection = state.selection.from < pos + size && pos < state.selection.to;
        if (!inPmSelection) {
            this.cursorSide = pos < state.selection.from ? 'end' : 'start';
        }
    }
    selectNode() {
        this.dom.classList.add('ProseMirror-selectednode');
        if (!this._isEditing) {
            this.openEditor();
        }
    }
    deselectNode() {
        this.dom.classList.remove('ProseMirror-selectednode');
        if (this._isEditing) {
            this.closeEditor();
        }
    }
    stopEvent(event) {
        return this._innerView !== undefined && event.target !== undefined && this._innerView.dom.contains(event.target);
    }
    ignoreMutation() {
        return true;
    }
    renderMath() {
        if (!this._mathRenderElt) {
            return;
        }
        const content = this._node.content.content;
        let texString = '';
        if (content.length > 0 && content[0].textContent !== null) {
            texString = content[0].textContent.trim();
        }
        if (texString.length < 1) {
            this.dom.classList.add('empty-math');
            while (this._mathRenderElt.firstChild) {
                this._mathRenderElt.firstChild.remove();
            }
            return;
        } else {
            this.dom.classList.remove('empty-math');
        }
        katex.then(k => {
            try {
                k.render(texString, this._mathRenderElt, this._katexOptions);
                this._mathRenderElt.classList.remove('parse-error');
                this.dom.setAttribute('title', '');
            } catch (err) {
                if (err instanceof katex__WEBPACK_IMPORTED_MODULE_5__["ParseError"]) {
                    console.error(err);
                    this._mathRenderElt.classList.add('parse-error');
                    this.dom.setAttribute('title', err.toString());
                } else {
                    throw err;
                }
            }
        });
    }
    dispatchInner(tr) {
        if (!this._innerView) {
            return;
        }
        const {state, transactions} = this._innerView.state.applyTransaction(tr);
        this._innerView.updateState(state);
        if (!tr.getMeta('fromOutside')) {
            const outerTr = this._outerView.state.tr, offsetMap = prosemirror_transform__WEBPACK_IMPORTED_MODULE_2__[/* StepMap */ "d"].offset(this._getPos() + 1);
            for (let i = 0; i < transactions.length; i++) {
                const steps = transactions[i].steps;
                for (let j = 0; j < steps.length; j++) {
                    const mapped = steps[j].map(offsetMap);
                    if (!mapped) {
                        throw Error('step discarded!');
                    }
                    outerTr.step(mapped);
                }
            }
            if (outerTr.docChanged)
                this._outerView.dispatch(outerTr);
        }
    }
    openEditor() {
        if (this._innerView) {
            throw Error('inner view should not exist!');
        }
        this._innerView = new prosemirror_view__WEBPACK_IMPORTED_MODULE_1__[/* EditorView */ "c"](this._mathSrcElt, {
            state: prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* EditorState */ "b"].create({
                doc: this._node,
                plugins: [Object(prosemirror_keymap__WEBPACK_IMPORTED_MODULE_3__[/* keymap */ "b"])({
                        'Tab': (state, dispatch) => {
                            if (dispatch) {
                                dispatch(state.tr.insertText('\t'));
                            }
                            return true;
                        },
                        'Backspace': Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_4__[/* chainCommands */ "b"])(prosemirror_commands__WEBPACK_IMPORTED_MODULE_4__[/* deleteSelection */ "c"], (state, dispatch, tr_inner) => {
                            if (!state.selection.empty) {
                                return false;
                            }
                            if (this._node.textContent.length > 0) {
                                return false;
                            }
                            this._outerView.dispatch(this._outerView.state.tr.insertText(''));
                            this._outerView.focus();
                            return true;
                        }),
                        'Enter': prosemirror_commands__WEBPACK_IMPORTED_MODULE_4__[/* newlineInCode */ "h"],
                        'Ctrl-Enter': (state, dispatch) => {
                            const {to} = this._outerView.state.selection;
                            const outerState = this._outerView.state;
                            this._outerView.dispatch(outerState.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"].create(outerState.doc, to)));
                            this._outerView.focus();
                            return true;
                        }
                    })]
            }),
            dispatchTransaction: this.dispatchInner.bind(this)
        });
        const innerState = this._innerView.state;
        this._innerView.focus();
        const pos = this.cursorSide == 'start' ? 0 : this._node.nodeSize - 2;
        this._innerView.dispatch(innerState.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"].create(innerState.doc, pos)));
        this._isEditing = true;
    }
    closeEditor(render = true) {
        if (this._innerView) {
            this._innerView.destroy();
            this._innerView = undefined;
        }
        if (render) {
            this.renderMath();
        }
        this._isEditing = false;
    }
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/plugin.ts":
/*!*********************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/plugin.ts ***!
  \*********************************************************************/
/*! exports provided: createMathView, mathPlugin */
/*! exports used: mathPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createMathView */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mathPlugin; });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var _nodeView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodeView */ "./src/components/editor/prosemirror/extensions/math/nodeView.ts");


function createMathView(displayMode) {
    return (node, view, getPos) => {
        const pluginState = mathPluginKey.getState(view.state);
        if (!pluginState) {
            throw new Error('no math plugin!');
        }
        const nodeViews = pluginState.activeNodeViews;
        const nodeView = new _nodeView__WEBPACK_IMPORTED_MODULE_1__[/* MathView */ "a"](node, view, getPos, {
            katexOptions: {
                displayMode,
                macros: pluginState.macros
            }
        }, () => {
            nodeViews.splice(nodeViews.indexOf(nodeView));
        });
        nodeViews.push(nodeView);
        return nodeView;
    };
}
const mathPluginKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* PluginKey */ "e"]('prosemirror-math');
const mathPluginSpec = {
    key: mathPluginKey,
    state: {
        init(_config, _instance) {
            return {
                macros: {},
                activeNodeViews: []
            };
        },
        apply(tr, value, oldState, newState) {
            const pluginState = mathPluginKey.getState(oldState);
            if (pluginState) {
                for (const mathView of pluginState.activeNodeViews) {
                    mathView.updateCursorPos(newState);
                }
            }
            return value;
        }
    },
    props: {
        nodeViews: {
            'math_inline': createMathView(false),
            'math_block': createMathView(true)
        }
    }
};
const mathPlugin = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Plugin */ "d"](mathPluginSpec);

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/plugins/inputrules.ts":
/*!*********************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/plugins/inputrules.ts ***!
  \*********************************************************************************/
/*! exports provided: inlineInputRule, blockInputRule, buildMathInputRules */
/*! exports used: buildMathInputRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export inlineInputRule */
/* unused harmony export blockInputRule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildMathInputRules; });
/* harmony import */ var prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-inputrules */ "./node_modules/prosemirror-inputrules/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");


function inlineInputRule(pattern, nodeType, getAttrs) {
    return new prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* InputRule */ "a"](pattern, (state, match, start, end) => {
        const $start = state.doc.resolve(start);
        const index = $start.index();
        const $end = state.doc.resolve(end);
        const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
        if (!$start.parent.canReplaceWith(index, $end.index(), nodeType)) {
            return null;
        }
        return state.tr.replaceRangeWith(start, end, nodeType.create(attrs, nodeType.schema.text(match[1])));
    });
}
function blockInputRule(pattern, nodeType, getAttrs) {
    return new prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* InputRule */ "a"](pattern, (state, match, start, end) => {
        const $start = state.doc.resolve(start);
        const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
        if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType))
            return null;
        const tr = state.tr.delete(start, end).setBlockType(start, start, nodeType, attrs);
        return tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* NodeSelection */ "c"].create(tr.doc, tr.mapping.map($start.pos - 1)));
    });
}
function buildMathInputRules(schema) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* inputRules */ "d"])({
        rules: [
            inlineInputRule(/(?<!\\)\$(.+)(?<!\\)\$/, schema.nodes.math_inline),
            blockInputRule(/^\$\$\s+$/, schema.nodes.math_block)
        ]
    });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/plugins/select.ts":
/*!*****************************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/plugins/select.ts ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");


const checkSelection = arg => {
    const {from} = arg.selection;
    const content = arg.selection.content().content;
    const result = [];
    content.descendants((node, pos, _parent) => {
        if (node.type.name == 'text') {
            return false;
        }
        if (node.type.name.startsWith('math_')) {
            result.push({
                start: Math.max(from + pos - 1, 0),
                end: from + pos + node.nodeSize - 1
            });
            return false;
        }
        return true;
    });
    return prosemirror_view__WEBPACK_IMPORTED_MODULE_1__[/* DecorationSet */ "b"].create(arg.doc, result.map(({start, end}) => prosemirror_view__WEBPACK_IMPORTED_MODULE_1__[/* Decoration */ "a"].node(start, end, { class: 'math-select' })));
};
const mathSelectPlugin = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Plugin */ "d"]({
    state: {
        init(config, partialState) {
            return checkSelection(partialState);
        },
        apply(tr, oldState) {
            if (!tr.selection || !tr.selectionSet) {
                return oldState;
            }
            const sel = checkSelection(tr);
            return sel;
        }
    },
    props: {
        decorations: state => {
            return mathSelectPlugin.getState(state);
        }
    }
});
/* harmony default export */ __webpack_exports__["a"] = (mathSelectPlugin);

/***/ }),

/***/ "./src/components/editor/prosemirror/extensions/math/schema.ts":
/*!*********************************************************************!*\
  !*** ./src/components/editor/prosemirror/extensions/math/schema.ts ***!
  \*********************************************************************/
/*! exports provided: mathSchema */
/*! exports used: mathSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mathSchema; });
const mathSchema = {
    nodes: {
        math_inline: {
            group: 'inline math',
            content: 'text*',
            inline: true,
            atom: true,
            toDOM: () => [
                'math-inline',
                { class: 'math-node' },
                0
            ],
            parseDOM: [{ tag: 'math-inline' }]
        },
        math_block: {
            group: 'block math',
            content: 'text*',
            atom: true,
            code: true,
            toDOM: () => [
                'math-display',
                { class: 'math-node' },
                0
            ],
            parseDOM: [{ tag: 'math-display' }]
        }
    },
    marks: {
        math_select: {
            toDOM() {
                return [
                    'math-select',
                    0
                ];
            },
            parseDOM: [{ tag: 'math-select' }]
        }
    }
};

/***/ }),

/***/ "./src/components/editor/prosemirror/inputrules/index.ts":
/*!***************************************************************!*\
  !*** ./src/components/editor/prosemirror/inputrules/index.ts ***!
  \***************************************************************/
/*! exports provided: blockQuoteRule, orderedListRule, bulletListRule, codeBlockRule, headingRule, buildInputRules */
/*! exports used: buildInputRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export blockQuoteRule */
/* unused harmony export orderedListRule */
/* unused harmony export bulletListRule */
/* unused harmony export codeBlockRule */
/* unused harmony export headingRule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildInputRules; });
/* harmony import */ var prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-inputrules */ "./node_modules/prosemirror-inputrules/dist/index.es.js");

function blockQuoteRule(nodeType) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* wrappingInputRule */ "h"])(/^\s*>\s$/, nodeType);
}
function orderedListRule(nodeType) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* wrappingInputRule */ "h"])(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }), (match, node) => node.childCount + node.attrs.order == +match[1]);
}
function bulletListRule(nodeType) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* wrappingInputRule */ "h"])(/^\s*([-+*])\s$/, nodeType);
}
function codeBlockRule(nodeType) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* textblockTypeInputRule */ "f"])(/^```$/, nodeType);
}
function headingRule(nodeType, maxLevel) {
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* textblockTypeInputRule */ "f"])(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, match => ({ level: match[1].length }));
}
function buildInputRules(schema) {
    const rules = prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* smartQuotes */ "e"].concat(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* ellipsis */ "b"], prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* emDash */ "c"]);
    let type;
    if (type = schema.nodes.blockquote)
        rules.push(blockQuoteRule(type));
    if (type = schema.nodes.ordered_list)
        rules.push(orderedListRule(type));
    if (type = schema.nodes.bullet_list)
        rules.push(bulletListRule(type));
    if (type = schema.nodes.code_block)
        rules.push(codeBlockRule(type));
    if (type = schema.nodes.heading)
        rules.push(headingRule(type, 6));
    return Object(prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_0__[/* inputRules */ "d"])({ rules });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/keymap/index.ts":
/*!***********************************************************!*\
  !*** ./src/components/editor/prosemirror/keymap/index.ts ***!
  \***********************************************************/
/*! exports provided: buildKeymap */
/*! exports used: buildKeymap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildKeymap; });
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-schema-list */ "./node_modules/prosemirror-schema-list/dist/index.es.js");
/* harmony import */ var prosemirror_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-history */ "./node_modules/prosemirror-history/dist/index.es.js");
/* harmony import */ var prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-inputrules */ "./node_modules/prosemirror-inputrules/dist/index.es.js");




const mac = typeof navigator != 'undefined' ? /Mac/.test(navigator.platform) : false;
function buildKeymap(schema, mapKeys) {
    const keys = {};
    let type;
    function bind(key, cmd) {
        if (mapKeys) {
            const mapped = mapKeys[key];
            if (mapped === false)
                return;
            if (mapped)
                key = mapped;
        }
        keys[key] = cmd;
    }
    bind('Mod-z', prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* undo */ "c"]);
    bind('Shift-Mod-z', prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* redo */ "b"]);
    bind('Backspace', prosemirror_inputrules__WEBPACK_IMPORTED_MODULE_3__[/* undoInputRule */ "g"]);
    if (!mac)
        bind('Mod-y', prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* redo */ "b"]);
    bind('Alt-ArrowUp', prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* joinUp */ "f"]);
    bind('Alt-ArrowDown', prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* joinDown */ "e"]);
    bind('Mod-BracketLeft', prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* lift */ "g"]);
    bind('Escape', prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* selectParentNode */ "i"]);
    if (type = schema.marks.strong) {
        bind('Mod-b', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* toggleMark */ "k"])(type));
        bind('Mod-B', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* toggleMark */ "k"])(type));
    }
    if (type = schema.marks.em) {
        bind('Mod-i', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* toggleMark */ "k"])(type));
        bind('Mod-I', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* toggleMark */ "k"])(type));
    }
    if (type = schema.marks.code)
        bind('Mod-`', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* toggleMark */ "k"])(type));
    if (type = schema.nodes.bullet_list)
        bind('Shift-Ctrl-8', Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__[/* wrapInList */ "d"])(type));
    if (type = schema.nodes.ordered_list)
        bind('Shift-Ctrl-9', Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__[/* wrapInList */ "d"])(type));
    if (type = schema.nodes.blockquote)
        bind('Ctrl->', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* wrapIn */ "l"])(type));
    if (type = schema.nodes.hard_break) {
        const br = type;
        const cmd = Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* chainCommands */ "b"])(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* exitCode */ "d"], (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
            return true;
        });
        bind('Mod-Enter', cmd);
        bind('Shift-Enter', cmd);
        if (mac)
            bind('Ctrl-Enter', cmd);
    }
    if (type = schema.nodes.list_item) {
        bind('Enter', Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__[/* splitListItem */ "c"])(type));
        bind('Mod-[', Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__[/* liftListItem */ "a"])(type));
        bind('Mod-]', Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_1__[/* sinkListItem */ "b"])(type));
    }
    if (type = schema.nodes.paragraph)
        bind('Shift-Ctrl-0', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* setBlockType */ "j"])(type));
    if (type = schema.nodes.code_block)
        bind('Shift-Ctrl-\\', Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* setBlockType */ "j"])(type));
    if (type = schema.nodes.heading)
        for (let i = 1; i <= 6; i++)
            bind('Shift-Ctrl-' + i, Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_0__[/* setBlockType */ "j"])(type, { level: i }));
    if (type = schema.nodes.horizontal_rule) {
        const hr = type;
        bind('Mod-_', (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
            return true;
        });
    }
    return keys;
}

/***/ }),

/***/ "./src/components/editor/prosemirror/menu/index.ts":
/*!*********************************************************!*\
  !*** ./src/components/editor/prosemirror/menu/index.ts ***!
  \*********************************************************/
/*! exports provided: buildMenuItems */
/*! exports used: buildMenuItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildMenuItems; });
/* harmony import */ var prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-menu */ "./node_modules/prosemirror-menu/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-schema-list */ "./node_modules/prosemirror-schema-list/dist/index.es.js");
/* harmony import */ var _prompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prompt */ "./src/components/editor/prosemirror/menu/prompt.ts");





function canInsert(state, nodeType) {
    const $from = state.selection.$from;
    for (let d = $from.depth; d >= 0; d--) {
        const index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, nodeType))
            return true;
    }
    return false;
}
function insertImageItem(nodeType) {
    return new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* MenuItem */ "c"]({
        title: 'Insert image',
        label: 'Image',
        enable(state) {
            return canInsert(state, nodeType);
        },
        run(state, _, view) {
            const {from, to} = state.selection;
            let attrs = null;
            if (state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* NodeSelection */ "c"] && state.selection.node.type == nodeType)
                attrs = state.selection.node.attrs;
            Object(_prompt__WEBPACK_IMPORTED_MODULE_4__[/* openPrompt */ "b"])({
                title: 'Insert image',
                fields: {
                    src: new _prompt__WEBPACK_IMPORTED_MODULE_4__[/* TextField */ "a"]({
                        label: 'Location',
                        required: true,
                        value: attrs && attrs.src
                    }),
                    title: new _prompt__WEBPACK_IMPORTED_MODULE_4__[/* TextField */ "a"]({
                        label: 'Title',
                        value: attrs && attrs.title
                    }),
                    alt: new _prompt__WEBPACK_IMPORTED_MODULE_4__[/* TextField */ "a"]({
                        label: 'Description',
                        value: attrs ? attrs.alt : state.doc.textBetween(from, to, ' ')
                    })
                },
                callback(attrs) {
                    view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)));
                    view.focus();
                }
            });
        }
    });
}
function cmdItem(cmd, options) {
    const passedOptions = {
        label: options.title,
        run: cmd
    };
    for (const prop in options)
        passedOptions[prop] = options[prop];
    if ((!options.enable || options.enable === true) && !options.select)
        passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
    return new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* MenuItem */ "c"](passedOptions);
}
function markActive(state, type) {
    const {from, $from, to, empty} = state.selection;
    if (empty)
        return type.isInSet(state.storedMarks || $from.marks());
    else
        return state.doc.rangeHasMark(from, to, type);
}
function markItem(markType, options) {
    const passedOptions = {
        active(state) {
            return markActive(state, markType);
        },
        enable: true
    };
    for (const prop in options)
        passedOptions[prop] = options[prop];
    return cmdItem(Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__[/* toggleMark */ "k"])(markType), passedOptions);
}
function linkItem(markType) {
    return new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* MenuItem */ "c"]({
        title: 'Add or remove link',
        icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].link,
        active(state) {
            return markActive(state, markType);
        },
        enable(state) {
            return !state.selection.empty;
        },
        run(state, dispatch, view) {
            if (markActive(state, markType)) {
                Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__[/* toggleMark */ "k"])(markType)(state, dispatch);
                return true;
            }
            Object(_prompt__WEBPACK_IMPORTED_MODULE_4__[/* openPrompt */ "b"])({
                title: 'Create a link',
                fields: {
                    href: new _prompt__WEBPACK_IMPORTED_MODULE_4__[/* TextField */ "a"]({
                        label: 'Link target',
                        required: true
                    }),
                    title: new _prompt__WEBPACK_IMPORTED_MODULE_4__[/* TextField */ "a"]({ label: 'Title' })
                },
                callback(attrs) {
                    Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__[/* toggleMark */ "k"])(markType, attrs)(view.state, view.dispatch);
                    view.focus();
                }
            });
        }
    });
}
function wrapListItem(nodeType, options) {
    return cmdItem(Object(prosemirror_schema_list__WEBPACK_IMPORTED_MODULE_3__[/* wrapInList */ "d"])(nodeType, options.attrs), options);
}
function buildMenuItems(schema) {
    const r = {};
    let type;
    if (type = schema.marks.strong)
        r.toggleStrong = markItem(type, {
            title: 'Toggle strong style',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].strong
        });
    if (type = schema.marks.em)
        r.toggleEm = markItem(type, {
            title: 'Toggle emphasis',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].em
        });
    if (type = schema.marks.code)
        r.toggleCode = markItem(type, {
            title: 'Toggle code font',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].code
        });
    if (type = schema.marks.link)
        r.toggleLink = linkItem(type);
    if (type = schema.nodes.image)
        r.insertImage = insertImageItem(type);
    if (type = schema.nodes.bullet_list)
        r.wrapBulletList = wrapListItem(type, {
            title: 'Wrap in bullet list',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].bulletList
        });
    if (type = schema.nodes.ordered_list)
        r.wrapOrderedList = wrapListItem(type, {
            title: 'Wrap in ordered list',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].orderedList
        });
    if (type = schema.nodes.blockquote)
        r.wrapBlockQuote = Object(prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* wrapItem */ "l"])(type, {
            title: 'Wrap in block quote',
            icon: prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* icons */ "e"].blockquote
        });
    if (type = schema.nodes.paragraph)
        r.makeParagraph = Object(prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* blockTypeItem */ "d"])(type, {
            title: 'Change to paragraph',
            label: 'Plain'
        });
    if (type = schema.nodes.code_block)
        r.makeCodeBlock = Object(prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* blockTypeItem */ "d"])(type, {
            title: 'Change to code block',
            label: 'Code'
        });
    if (type = schema.nodes.heading)
        for (let i = 1; i <= 10; i++)
            r['makeHead' + i] = Object(prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* blockTypeItem */ "d"])(type, {
                title: 'Change to heading ' + i,
                label: 'Level ' + i,
                attrs: { level: i }
            });
    if (type = schema.nodes.horizontal_rule) {
        const hr = type;
        r.insertHorizontalRule = new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* MenuItem */ "c"]({
            title: 'Insert horizontal rule',
            label: 'Horizontal rule',
            enable(state) {
                return canInsert(state, hr);
            },
            run(state, dispatch) {
                dispatch(state.tr.replaceSelectionWith(hr.create()));
            }
        });
    }
    const cut = arr => arr.filter(x => x);
    r.insertMenu = new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* Dropdown */ "a"](cut([
        r.insertImage,
        r.insertHorizontalRule
    ]), { label: 'Insert' });
    r.typeMenu = new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* Dropdown */ "a"](cut([
        r.makeParagraph,
        r.makeCodeBlock,
        r.makeHead1 && new prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* DropdownSubmenu */ "b"](cut([
            r.makeHead1,
            r.makeHead2,
            r.makeHead3,
            r.makeHead4,
            r.makeHead5,
            r.makeHead6
        ]), { label: 'Heading' })
    ]), { label: 'Type...' });
    r.inlineMenu = [cut([
            r.toggleStrong,
            r.toggleEm,
            r.toggleCode,
            r.toggleLink
        ])];
    r.blockMenu = [cut([
            r.wrapBulletList,
            r.wrapOrderedList,
            r.wrapBlockQuote,
            prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* joinUpItem */ "f"],
            prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* liftItem */ "g"],
            prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* selectParentNodeItem */ "j"]
        ])];
    r.fullMenu = r.inlineMenu.concat([[
            r.insertMenu,
            r.typeMenu
        ]], [[
            prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* undoItem */ "k"],
            prosemirror_menu__WEBPACK_IMPORTED_MODULE_0__[/* redoItem */ "i"]
        ]], r.blockMenu);
    return r;
}

/***/ }),

/***/ "./src/components/editor/prosemirror/menu/prompt.ts":
/*!**********************************************************!*\
  !*** ./src/components/editor/prosemirror/menu/prompt.ts ***!
  \**********************************************************/
/*! exports provided: openPrompt, Field, TextField, SelectField */
/*! exports used: TextField, openPrompt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return openPrompt; });
/* unused harmony export Field */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextField; });
/* unused harmony export SelectField */
const prefix = 'ProseMirror-prompt';
function openPrompt(options) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    wrapper.className = prefix;
    const mouseOutside = e => {
        if (!wrapper.contains(e.target))
            close();
    };
    setTimeout(() => window.addEventListener('mousedown', mouseOutside), 50);
    const close = () => {
        window.removeEventListener('mousedown', mouseOutside);
        if (wrapper.parentNode)
            wrapper.parentNode.removeChild(wrapper);
    };
    const domFields = [];
    for (const name in options.fields)
        domFields.push(options.fields[name].render());
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = prefix + '-submit';
    submitButton.textContent = 'OK';
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = prefix + '-cancel';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', close);
    const form = wrapper.appendChild(document.createElement('form'));
    if (options.title)
        form.appendChild(document.createElement('h5')).textContent = options.title;
    domFields.forEach(field => {
        form.appendChild(document.createElement('div')).appendChild(field);
    });
    const buttons = form.appendChild(document.createElement('div'));
    buttons.className = prefix + '-buttons';
    buttons.appendChild(submitButton);
    buttons.appendChild(document.createTextNode(' '));
    buttons.appendChild(cancelButton);
    const box = wrapper.getBoundingClientRect();
    wrapper.style.top = (window.innerHeight - box.height) / 2 + 'px';
    wrapper.style.left = (window.innerWidth - box.width) / 2 + 'px';
    const submit = () => {
        const params = getValues(options.fields, domFields);
        if (params) {
            close();
            options.callback(params);
        }
    };
    form.addEventListener('submit', e => {
        e.preventDefault();
        submit();
    });
    form.addEventListener('keydown', e => {
        if (e.keyCode == 27) {
            e.preventDefault();
            close();
        } else if (e.keyCode == 13 && !(e.ctrlKey || e.metaKey || e.shiftKey)) {
            e.preventDefault();
            submit();
        } else if (e.keyCode == 9) {
            window.setTimeout(() => {
                if (!wrapper.contains(document.activeElement))
                    close();
            }, 500);
        }
    });
    const input = form.elements[0];
    if (input)
        input.focus();
}
function getValues(fields, domFields) {
    let result = Object.create(null), i = 0;
    for (const name in fields) {
        const field = fields[name], dom = domFields[i++];
        const value = field.read(dom), bad = field.validate(value);
        if (bad) {
            reportInvalid(dom, bad);
            return null;
        }
        result[name] = field.clean(value);
    }
    return result;
}
function reportInvalid(dom, message) {
    const parent = dom.parentNode;
    const msg = parent.appendChild(document.createElement('div'));
    msg.style.left = dom.offsetLeft + dom.offsetWidth + 2 + 'px';
    msg.style.top = dom.offsetTop - 5 + 'px';
    msg.className = 'ProseMirror-invalid';
    msg.textContent = message;
    setTimeout(() => parent.removeChild(msg), 1500);
}
class Field {
    constructor(options) {
        this.options = options;
    }
    read(dom) {
        return dom.value;
    }
    validateType(_value) {
        return undefined;
    }
    validate(value) {
        if (!value && this.options.required)
            return 'Required field';
        return this.validateType(value) || this.options.validate && this.options.validate(value);
    }
    clean(value) {
        return this.options.clean ? this.options.clean(value) : value;
    }
}
class TextField extends Field {
    render() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = this.options.label;
        input.value = this.options.value || '';
        input.autocomplete = 'off';
        return input;
    }
}
class SelectField extends Field {
    render() {
        const select = document.createElement('select');
        this.options.options.forEach(o => {
            const opt = select.appendChild(document.createElement('option'));
            opt.value = o.value;
            opt.selected = o.value == this.options.value;
            opt.label = o.label;
        });
        return select;
    }
}

/***/ }),

/***/ "./src/components/editor/prosemirror/module.ts":
/*!*****************************************************!*\
  !*** ./src/components/editor/prosemirror/module.ts ***!
  \*****************************************************/
/*! exports provided: EditorView, EditorState, Plugin, defaultMarkdownSerializer, createEditorState */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMarkdownSerializer", function() { return defaultMarkdownSerializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEditorState", function() { return createEditorState; });
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorView", function() { return prosemirror_view__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorState", function() { return prosemirror_state__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plugin", function() { return prosemirror_state__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony import */ var _github_mini_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @github/mini-throttle */ "./node_modules/@github/mini-throttle/dist/index.js");
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setup */ "./src/components/editor/prosemirror/setup.ts");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./schema */ "./src/components/editor/prosemirror/schema/index.ts");
/* harmony import */ var _extensions_markdown_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extensions/markdown/parser */ "./src/components/editor/prosemirror/extensions/markdown/parser.ts");
/* harmony import */ var _extensions_markdown_serializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./extensions/markdown/serializer */ "./src/components/editor/prosemirror/extensions/markdown/serializer.ts");







const defaultMarkdownSerializer = Object(_extensions_markdown_serializer__WEBPACK_IMPORTED_MODULE_6__[/* createMarkdownSerializer */ "a"])();

const schema = Object(_schema__WEBPACK_IMPORTED_MODULE_4__[/* createSchema */ "a"])();
const parser = Object(_extensions_markdown_parser__WEBPACK_IMPORTED_MODULE_5__[/* createMarkdownParser */ "a"])(schema);
function createEditorState(opts) {
    return prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* EditorState */ "b"].create({
        doc: parser.parse(opts.content.textContent),
        plugins: [
            ...Object(_setup__WEBPACK_IMPORTED_MODULE_3__[/* setupPlugins */ "a"])({ schema }),
            new prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Plugin */ "d"]({
                view: () => {
                    return {
                        update: Object(_github_mini_throttle__WEBPACK_IMPORTED_MODULE_2__[/* debounce */ "a"])(view => {
                            opts.content.textContent = defaultMarkdownSerializer.serialize(view.state.doc);
                        }, 50)
                    };
                }
            })
        ]
    });
}

/***/ }),

/***/ "./src/components/editor/prosemirror/schema/index.ts":
/*!***********************************************************!*\
  !*** ./src/components/editor/prosemirror/schema/index.ts ***!
  \***********************************************************/
/*! exports provided: createSchemaSpec, createSchema */
/*! exports used: createSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createSchemaSpec */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSchema; });
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown */ "./src/components/editor/prosemirror/schema/markdown.ts");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");
/* harmony import */ var _extensions_math_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensions/math/schema */ "./src/components/editor/prosemirror/extensions/math/schema.ts");



function merge(s1, s2) {
    return {
        nodes: {
            ...s1.nodes,
            ...s2.nodes
        },
        marks: {
            ...s1.marks,
            ...s2.marks
        }
    };
}
function createSchemaSpec() {
    return merge(_markdown__WEBPACK_IMPORTED_MODULE_0__[/* markdownSchema */ "a"], _extensions_math_schema__WEBPACK_IMPORTED_MODULE_2__[/* mathSchema */ "a"]);
}
function createSchema() {
    return new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Schema */ "i"](createSchemaSpec());
}

/***/ }),

/***/ "./src/components/editor/prosemirror/schema/markdown.ts":
/*!**************************************************************!*\
  !*** ./src/components/editor/prosemirror/schema/markdown.ts ***!
  \**************************************************************/
/*! exports provided: markdownSchema */
/*! exports used: markdownSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return markdownSchema; });
const markdownSchema = {
    nodes: {
        doc: { content: 'block+' },
        paragraph: {
            content: 'inline*',
            group: 'block',
            parseDOM: [{ tag: 'p' }],
            toDOM() {
                return [
                    'p',
                    0
                ];
            }
        },
        blockquote: {
            content: 'block+',
            group: 'block',
            parseDOM: [{ tag: 'blockquote' }],
            toDOM() {
                return [
                    'blockquote',
                    0
                ];
            }
        },
        horizontal_rule: {
            group: 'block',
            parseDOM: [{ tag: 'hr' }],
            toDOM() {
                return [
                    'div',
                    ['hr']
                ];
            }
        },
        heading: {
            attrs: { level: { default: 1 } },
            content: '(text | image)*',
            group: 'block',
            defining: true,
            parseDOM: [
                {
                    tag: 'h1',
                    attrs: { level: 1 }
                },
                {
                    tag: 'h2',
                    attrs: { level: 2 }
                },
                {
                    tag: 'h3',
                    attrs: { level: 3 }
                },
                {
                    tag: 'h4',
                    attrs: { level: 4 }
                },
                {
                    tag: 'h5',
                    attrs: { level: 5 }
                },
                {
                    tag: 'h6',
                    attrs: { level: 6 }
                }
            ],
            toDOM(node) {
                return [
                    'h' + node.attrs.level,
                    0
                ];
            }
        },
        code_block: {
            content: 'text*',
            group: 'block',
            code: true,
            defining: true,
            marks: '',
            attrs: { params: { default: '' } },
            parseDOM: [{
                    tag: 'pre',
                    preserveWhitespace: 'full',
                    getAttrs: value => ({ params: node.getAttribute('data-params') || '' })
                }],
            toDOM(node) {
                return [
                    'pre',
                    node.attrs.params ? { 'data-params': node.attrs.params } : {},
                    [
                        'code',
                        0
                    ]
                ];
            }
        },
        ordered_list: {
            content: 'list_item+',
            group: 'block',
            attrs: {
                order: { default: 1 },
                tight: { default: false }
            },
            parseDOM: [{
                    tag: 'ol',
                    getAttrs(dom) {
                        return {
                            order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1,
                            tight: dom.hasAttribute('data-tight')
                        };
                    }
                }],
            toDOM(node) {
                return [
                    'ol',
                    {
                        start: node.attrs.order == 1 ? null : node.attrs.order,
                        'data-tight': node.attrs.tight ? 'true' : null
                    },
                    0
                ];
            }
        },
        bullet_list: {
            content: 'list_item+',
            group: 'block',
            attrs: { tight: { default: false } },
            parseDOM: [{
                    tag: 'ul',
                    getAttrs: dom => ({ tight: dom.hasAttribute('data-tight') })
                }],
            toDOM(node) {
                return [
                    'ul',
                    { 'data-tight': node.attrs.tight ? 'true' : null },
                    0
                ];
            }
        },
        list_item: {
            content: 'paragraph block*',
            defining: true,
            parseDOM: [{ tag: 'li' }],
            toDOM() {
                return [
                    'li',
                    0
                ];
            }
        },
        text: { group: 'inline' },
        image: {
            inline: true,
            attrs: {
                src: {},
                alt: { default: null },
                title: { default: null }
            },
            group: 'inline',
            draggable: true,
            parseDOM: [{
                    tag: 'img[src]',
                    getAttrs(dom) {
                        return {
                            src: dom.getAttribute('src'),
                            title: dom.getAttribute('title'),
                            alt: dom.getAttribute('alt')
                        };
                    }
                }],
            toDOM(node) {
                return [
                    'img',
                    node.attrs
                ];
            }
        },
        hard_break: {
            inline: true,
            group: 'inline',
            selectable: false,
            parseDOM: [{ tag: 'br' }],
            toDOM() {
                return ['br'];
            }
        }
    },
    marks: {
        em: {
            parseDOM: [
                { tag: 'i' },
                { tag: 'em' },
                {
                    style: 'font-style',
                    getAttrs: value => value == 'italic' && null
                }
            ],
            toDOM() {
                return ['em'];
            }
        },
        strong: {
            parseDOM: [
                { tag: 'b' },
                { tag: 'strong' },
                {
                    style: 'font-weight',
                    getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
                }
            ],
            toDOM() {
                return ['strong'];
            }
        },
        link: {
            attrs: {
                href: {},
                title: { default: null }
            },
            inclusive: false,
            parseDOM: [{
                    tag: 'a[href]',
                    getAttrs(dom) {
                        return {
                            href: dom.getAttribute('href'),
                            title: dom.getAttribute('title')
                        };
                    }
                }],
            toDOM(node) {
                return [
                    'a',
                    node.attrs
                ];
            }
        },
        code: {
            parseDOM: [{ tag: 'code' }],
            toDOM() {
                return ['code'];
            }
        }
    }
};

/***/ }),

/***/ "./src/components/editor/prosemirror/setup.ts":
/*!****************************************************!*\
  !*** ./src/components/editor/prosemirror/setup.ts ***!
  \****************************************************/
/*! exports provided: buildMenuItems, buildKeymap, buildInputRules, setupPlugins */
/*! exports used: setupPlugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setupPlugins; });
/* harmony import */ var prosemirror_keymap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-keymap */ "./node_modules/prosemirror-keymap/dist/index.es.js");
/* harmony import */ var prosemirror_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-history */ "./node_modules/prosemirror-history/dist/index.es.js");
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_dropcursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prosemirror-dropcursor */ "./node_modules/prosemirror-dropcursor/dist/index.es.js");
/* harmony import */ var prosemirror_gapcursor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prosemirror-gapcursor */ "./node_modules/prosemirror-gapcursor/dist/index.es.js");
/* harmony import */ var prosemirror_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prosemirror-menu */ "./node_modules/prosemirror-menu/dist/index.es.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menu */ "./src/components/editor/prosemirror/menu/index.ts");
/* harmony import */ var _keymap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./keymap */ "./src/components/editor/prosemirror/keymap/index.ts");
/* harmony import */ var _inputrules__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./inputrules */ "./src/components/editor/prosemirror/inputrules/index.ts");
/* harmony import */ var _extensions_math___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./extensions/math/ */ "./src/components/editor/prosemirror/extensions/math/index.ts");












function setupPlugins(options) {
    const plugins = [
        Object(_inputrules__WEBPACK_IMPORTED_MODULE_9__[/* buildInputRules */ "a"])(options.schema),
        Object(prosemirror_keymap__WEBPACK_IMPORTED_MODULE_0__[/* keymap */ "b"])(Object(_keymap__WEBPACK_IMPORTED_MODULE_8__[/* buildKeymap */ "a"])(options.schema, options.mapKeys)),
        Object(prosemirror_keymap__WEBPACK_IMPORTED_MODULE_0__[/* keymap */ "b"])(prosemirror_commands__WEBPACK_IMPORTED_MODULE_2__[/* baseKeymap */ "a"]),
        Object(prosemirror_dropcursor__WEBPACK_IMPORTED_MODULE_4__[/* dropCursor */ "a"])(),
        Object(prosemirror_gapcursor__WEBPACK_IMPORTED_MODULE_5__[/* gapCursor */ "a"])(),
        ...Object(_extensions_math___WEBPACK_IMPORTED_MODULE_10__[/* buildMathPlugins */ "a"])(options.schema)
    ];
    if (options.menuBar !== false)
        plugins.push(Object(prosemirror_menu__WEBPACK_IMPORTED_MODULE_6__[/* menuBar */ "h"])({
            floating: options.floatingMenu !== false,
            content: options.menuContent || Object(_menu__WEBPACK_IMPORTED_MODULE_7__[/* buildMenuItems */ "a"])(options.schema).fullMenu
        }));
    plugins.push(Object(prosemirror_history__WEBPACK_IMPORTED_MODULE_1__[/* history */ "a"])());
    return plugins.concat(new prosemirror_state__WEBPACK_IMPORTED_MODULE_3__[/* Plugin */ "d"]({ props: { attributes: { class: 'ProseMirror-example-setup-style' } } }));
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvZXh0ZW5zaW9ucy9tYXJrZG93bi9tYXJrZG93bml0TWF0aFBhcnNlclBsdWdpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvZXh0ZW5zaW9ucy9tYXJrZG93bi9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL2V4dGVuc2lvbnMvbWFya2Rvd24vc2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvZXh0ZW5zaW9ucy9tYXJrZG93bi9zZXJpYWxpemVyU3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL2V4dGVuc2lvbnMvbWF0aC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvZXh0ZW5zaW9ucy9tYXRoL25vZGVWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2VkaXRvci9wcm9zZW1pcnJvci9leHRlbnNpb25zL21hdGgvcGx1Z2luLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2VkaXRvci9wcm9zZW1pcnJvci9leHRlbnNpb25zL21hdGgvcGx1Z2lucy9pbnB1dHJ1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2VkaXRvci9wcm9zZW1pcnJvci9leHRlbnNpb25zL21hdGgvcGx1Z2lucy9zZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL2V4dGVuc2lvbnMvbWF0aC9zY2hlbWEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL2lucHV0cnVsZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL2tleW1hcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvbWVudS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3IvbWVudS9wcm9tcHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL21vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvcHJvc2VtaXJyb3Ivc2NoZW1hL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2VkaXRvci9wcm9zZW1pcnJvci9zY2hlbWEvbWFya2Rvd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZWRpdG9yL3Byb3NlbWlycm9yL3NldHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBeUJBO0FBQUEsU0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTBDLEdBQTFDLEVBQXFEO0FBQUEsSUFDakQsSUFBSSxRQUFKLEVBQWMsUUFBZCxFQUNJLE1BQU0sTUFBTSxNQURoQixFQUVJLFdBQVcsSUFGZixFQUdJLFlBQVksSUFIaEIsQ0FEaUQ7QUFBQSxJQU1qRCxXQUFXLE1BQU0sQ0FBTixHQUFVLE1BQU0sR0FBTixDQUFVLFVBQVYsQ0FBcUIsTUFBTSxDQUEzQixDQUFWLEdBQTBDLENBQUMsQ0FBdEQsQ0FOaUQ7QUFBQSxJQU9qRCxXQUFXLE1BQU0sQ0FBTixJQUFXLEdBQVgsR0FBaUIsTUFBTSxHQUFOLENBQVUsVUFBVixDQUFxQixNQUFNLENBQTNCLENBQWpCLEdBQWlELENBQUMsQ0FBN0QsQ0FQaUQ7QUFBQSxJQVdqRCxJQUFJLGFBQWEsRUFBYixJQUE4QixhQUFhLENBQTNDLElBQ0ssWUFBWSxFQUFaLElBQTZCLFlB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QUFBQSxJQUVuSSxNQUFNLFVBQThCO0FBQUEsUUFDbEMsNEVBQWdCLFFBQVEsTUFBeEIsQ0FEa0M7QUFBQSxRQUVsQywwRUFBTyxvRUFBWSxRQUFRLE1BQXBCLEVBQTRCLFFBQVEsT0FBcEMsQ0FBUCxDQUZrQztBQUFBLFFBR2xDLDBFQUFPLHVFQUFQLENBSGtDO0FBQUEsUUFJbEMsbUZBSmtDO0FBQUEsUUFLbEMsaUZBTGtDO0FBQUEsUUFNbEMsR0FBRyxvRkFBaUIsUUFBUSxNQUF6QixDQU4rQjtBQUFBLEtBQXBDLENBRm1JO0FBQUEsSUFVbkksSUFBSSxRQUFRLE9BQVIsS0FBb0IsS0FBeEI7QUFBQSxRQUNFLFFBQVEsSUFBUixDQUFhLHlFQUFRO0FBQUEsWUFDbkIsVUFBVSxRQUFRLFlBQVIsS0FBeUIsS0FEaEI7QUFBQSxZQUVuQixTQUFTLFFBQVEsV0FBUixJQUF1QixxRUFBZSxRQUFRLE1BQXZCLEVBQStCLFFBRjVDO0FBQUEsU0FBUixDQUFiLEVBWGlJO0FBQUEsSUFlbkksUUFBUSxJQUFSLENBQWEsNkVBQWIsRUFmbUk7QUFBQSxJQWlCbkksT0FBTyxRQUFRLE1BQVIsQ0FBZSxJQUFJLGdFQUFKLENBQVcsRUFDL0IsT0FBTyxFQUNMLFlBQVksRUFBRSxPQUFPLGlDQUFULEVBRFAsRUFEd0IsRUFBWCxDQUFmLENBQVAsQ0FqQm1JO0FBQUEsQyIsImZpbGUiOiJwcm9zZW1pcnJvci5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1jb25zdCAqL1xyXG5cclxuXHJcbi8qIEJhc2VkIG9uIE1JVCBsaWNlbnNlZCBodHRwczovL2dpdGh1Yi5jb20vaWt0YWthaGlyby9tYXJrZG93bi1pdC1rYXRleCBcclxuICAgTm90ZSB0aGlzIGlzIGN1cnJlbnRseSBkdXBsaWNhdGVkIGluIHRoZSBidW5kbGUgYXMgd2UgYWxzbyB1c2UgdGhhdCBwYWNrYWdlIGRpcmVjdGx5LlxyXG4gICBBIHNtYWxsIGltcHJvdmVtZW50IGluIGJ1bmRsZSBzaXplIGFuZCBtYWludGFpbmFiaWxpdHkgY291bGQgYmUgZm9ya2luZyB0aGlzIHBhY2thZ2UgYW5kIHNwbGl0dGluZyB0aGUgcGx1Z2luIGludG9cclxuICAgcGFyc2luZyBzdXBwb3J0IGFuZCByZW5kZXJpbmcgc3VwcG9ydC4gVGhlIGZpcnN0IGRvZXMgbm90IGRlcGVuZCBvbiBLYVRlWCBpdHNlbGYuXHJcbiovXHJcblxyXG4vKiBQcm9jZXNzIGlubGluZSBtYXRoICovXHJcbi8qXHJcbkxpa2UgbWFya2Rvd24taXQtc2ltcGxlbWF0aCwgdGhpcyBpcyBhIHN0cmlwcGVkIGRvd24sIHNpbXBsaWZpZWQgdmVyc2lvbiBvZjpcclxuaHR0cHM6Ly9naXRodWIuY29tL3J1bmFyYmVyZy9tYXJrZG93bi1pdC1tYXRoXHJcbkl0IGRpZmZlcnMgaW4gdGhhdCBpdCB0YWtlcyAoYSBzdWJzZXQgb2YpIExhVGVYIGFzIGlucHV0IGFuZCByZWxpZXMgb24gS2FUZVhcclxuZm9yIHJlbmRlcmluZyBvdXRwdXQuXHJcbiovXHJcblxyXG5leHBvcnQgdHlwZSBQYXJzZXJTdGF0ZSA9IGFueTtcclxuXHJcbi8vIFRlc3QgaWYgcG90ZW50aWFsIG9wZW5pbmcgb3IgY2xvc2luZyBkZWxpbWlldGVyXHJcbi8vIEFzc3VtZXMgdGhhdCB0aGVyZSBpcyBhIFwiJFwiIGF0IHN0YXRlLnNyY1twb3NdXHJcbmZ1bmN0aW9uIGlzVmFsaWREZWxpbShzdGF0ZTogUGFyc2VyU3RhdGUsIHBvczogbnVtYmVyKSB7XHJcbiAgICBsZXQgcHJldkNoYXIsIG5leHRDaGFyLFxyXG4gICAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcclxuICAgICAgICBjYW5fb3BlbiA9IHRydWUsXHJcbiAgICAgICAgY2FuX2Nsb3NlID0gdHJ1ZTtcclxuXHJcbiAgICBwcmV2Q2hhciA9IHBvcyA+IDAgPyBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MgLSAxKSA6IC0xO1xyXG4gICAgbmV4dENoYXIgPSBwb3MgKyAxIDw9IG1heCA/IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyArIDEpIDogLTE7XHJcblxyXG4gICAgLy8gQ2hlY2sgbm9uLXdoaXRlc3BhY2UgY29uZGl0aW9ucyBmb3Igb3BlbmluZyBhbmQgY2xvc2luZywgYW5kXHJcbiAgICAvLyBjaGVjayB0aGF0IGNsb3NpbmcgZGVsaW1ldGVyIGlzbid0IGZvbGxvd2VkIGJ5IGEgbnVtYmVyXHJcbiAgICBpZiAocHJldkNoYXIgPT09IDB4MjAvKiBcIiBcIiAqLyB8fCBwcmV2Q2hhciA9PT0gMHgwOS8qIFxcdCAqLyB8fFxyXG4gICAgICAgICAgICAobmV4dENoYXIgPj0gMHgzMC8qIFwiMFwiICovICYmIG5leHRDaGFyIDw9IDB4MzkvKiBcIjlcIiAqLykpIHtcclxuICAgICAgICBjYW5fY2xvc2UgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChuZXh0Q2hhciA9PT0gMHgyMC8qIFwiIFwiICovIHx8IG5leHRDaGFyID09PSAweDA5LyogXFx0ICovKSB7XHJcbiAgICAgICAgY2FuX29wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhbl9vcGVuOiBjYW5fb3BlbixcclxuICAgICAgICBjYW5fY2xvc2U6IGNhbl9jbG9zZVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0aF9pbmxpbmUoc3RhdGU6IFBhcnNlclN0YXRlLCBzaWxlbnQ6IGJvb2xlYW4pIHtcclxuICAgIGxldCBzdGFydCwgbWF0Y2gsIHRva2VuLCByZXMsIHBvcztcclxuXHJcbiAgICBpZiAoc3RhdGUuc3JjW3N0YXRlLnBvc10gIT09IFwiJFwiKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIHJlcyA9IGlzVmFsaWREZWxpbShzdGF0ZSwgc3RhdGUucG9zKTtcclxuICAgIGlmICghcmVzLmNhbl9vcGVuKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHsgc3RhdGUucGVuZGluZyArPSBcIiRcIjsgfVxyXG4gICAgICAgIHN0YXRlLnBvcyArPSAxO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpcnN0IGNoZWNrIGZvciBhbmQgYnlwYXNzIGFsbCBwcm9wZXJseSBlc2NhcGVkIGRlbGltaWV0ZXJzXHJcbiAgICAvLyBUaGlzIGxvb3Agd2lsbCBhc3N1bWUgdGhhdCB0aGUgZmlyc3QgbGVhZGluZyBiYWNrdGljayBjYW4gbm90XHJcbiAgICAvLyBiZSB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHN0YXRlLnNyYywgd2hpY2ggaXMga25vd24gc2luY2VcclxuICAgIC8vIHdlIGhhdmUgZm91bmQgYW4gb3BlbmluZyBkZWxpbWlldGVyIGFscmVhZHkuXHJcbiAgICBzdGFydCA9IHN0YXRlLnBvcyArIDE7XHJcbiAgICBtYXRjaCA9IHN0YXJ0O1xyXG4gICAgd2hpbGUgKCAobWF0Y2ggPSBzdGF0ZS5zcmMuaW5kZXhPZihcIiRcIiwgbWF0Y2gpKSAhPT0gLTEpIHtcclxuICAgICAgICAvLyBGb3VuZCBwb3RlbnRpYWwgJCwgbG9vayBmb3IgZXNjYXBlcywgcG9zIHdpbGwgcG9pbnQgdG9cclxuICAgICAgICAvLyBmaXJzdCBub24gZXNjYXBlIHdoZW4gY29tcGxldGVcclxuICAgICAgICBwb3MgPSBtYXRjaCAtIDE7XHJcbiAgICAgICAgd2hpbGUgKHN0YXRlLnNyY1twb3NdID09PSBcIlxcXFxcIikgeyBwb3MgLT0gMTsgfVxyXG5cclxuICAgICAgICAvLyBFdmVuIG51bWJlciBvZiBlc2NhcGVzLCBwb3RlbnRpYWwgY2xvc2luZyBkZWxpbWl0ZXIgZm91bmRcclxuICAgICAgICBpZiAoICgobWF0Y2ggLSBwb3MpICUgMikgPT0gMSApIHsgYnJlYWs7IH1cclxuICAgICAgICBtYXRjaCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIGNsb3NpbmcgZGVsaW10ZXIgZm91bmQuICBDb25zdW1lICQgYW5kIGNvbnRpbnVlLlxyXG4gICAgaWYgKG1hdGNoID09PSAtMSkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gXCIkXCI7IH1cclxuICAgICAgICBzdGF0ZS5wb3MgPSBzdGFydDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGVtcHR5IGNvbnRlbnQsIGllOiAkJC4gIERvIG5vdCBwYXJzZS5cclxuICAgIGlmIChtYXRjaCAtIHN0YXJ0ID09PSAwKSB7XHJcbiAgICAgICAgaWYgKCFzaWxlbnQpIHsgc3RhdGUucGVuZGluZyArPSBcIiQkXCI7IH1cclxuICAgICAgICBzdGF0ZS5wb3MgPSBzdGFydCArIDE7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGNsb3NpbmcgZGVsaW1pdGVyXHJcbiAgICByZXMgPSBpc1ZhbGlkRGVsaW0oc3RhdGUsIG1hdGNoKTtcclxuICAgIGlmICghcmVzLmNhbl9jbG9zZSkge1xyXG4gICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gXCIkXCI7IH1cclxuICAgICAgICBzdGF0ZS5wb3MgPSBzdGFydDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNpbGVudCkge1xyXG4gICAgICAgIHRva2VuICAgICAgICAgPSBzdGF0ZS5wdXNoKCdtYXRoX2lubGluZScsICdtYXRoJywgMCk7XHJcbiAgICAgICAgdG9rZW4ubWFya3VwICA9IFwiJFwiO1xyXG4gICAgICAgIHRva2VuLmNvbnRlbnQgPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQsIG1hdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZS5wb3MgPSBtYXRjaCArIDE7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0aF9ibG9jayhzdGF0ZTogUGFyc2VyU3RhdGUsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzaWxlbnQ6IGJvb2xlYW4pe1xyXG4gICAgbGV0IGZpcnN0TGluZSwgbGFzdExpbmUsIG5leHQsIGxhc3RQb3MsIGZvdW5kID0gZmFsc2UsIHRva2VuLFxyXG4gICAgICAgIHBvcyA9IHN0YXRlLmJNYXJrc1tzdGFydF0gKyBzdGF0ZS50U2hpZnRbc3RhcnRdLFxyXG4gICAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydF07XHJcblxyXG4gICAgaWYocG9zICsgMiA+IG1heCl7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYoc3RhdGUuc3JjLnNsaWNlKHBvcyxwb3MrMikhPT0nJCQnKXsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgcG9zICs9IDI7XHJcbiAgICBmaXJzdExpbmUgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLG1heCk7XHJcblxyXG4gICAgaWYoc2lsZW50KXsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmKGZpcnN0TGluZS50cmltKCkuc2xpY2UoLTIpPT09JyQkJyl7XHJcbiAgICAgICAgLy8gU2luZ2xlIGxpbmUgZXhwcmVzc2lvblxyXG4gICAgICAgIGZpcnN0TGluZSA9IGZpcnN0TGluZS50cmltKCkuc2xpY2UoMCwgLTIpO1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IobmV4dCA9IHN0YXJ0OyAhZm91bmQ7ICl7XHJcblxyXG4gICAgICAgIG5leHQrKztcclxuXHJcbiAgICAgICAgaWYobmV4dCA+PSBlbmQpeyBicmVhazsgfVxyXG5cclxuICAgICAgICBwb3MgPSBzdGF0ZS5iTWFya3NbbmV4dF0rc3RhdGUudFNoaWZ0W25leHRdO1xyXG4gICAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tuZXh0XTtcclxuXHJcbiAgICAgICAgaWYocG9zIDwgbWF4ICYmIHN0YXRlLnRTaGlmdFtuZXh0XSA8IHN0YXRlLmJsa0luZGVudCl7XHJcbiAgICAgICAgICAgIC8vIG5vbi1lbXB0eSBsaW5lIHdpdGggbmVnYXRpdmUgaW5kZW50IHNob3VsZCBzdG9wIHRoZSBsaXN0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHN0YXRlLnNyYy5zbGljZShwb3MsbWF4KS50cmltKCkuc2xpY2UoLTIpPT09JyQkJyl7XHJcbiAgICAgICAgICAgIGxhc3RQb3MgPSBzdGF0ZS5zcmMuc2xpY2UoMCxtYXgpLmxhc3RJbmRleE9mKCckJCcpO1xyXG4gICAgICAgICAgICBsYXN0TGluZSA9IHN0YXRlLnNyYy5zbGljZShwb3MsbGFzdFBvcyk7XHJcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRlLmxpbmUgPSBuZXh0ICsgMTtcclxuXHJcbiAgICB0b2tlbiA9IHN0YXRlLnB1c2goJ21hdGhfYmxvY2snLCAnbWF0aCcsIDApO1xyXG4gICAgdG9rZW4uYmxvY2sgPSB0cnVlO1xyXG4gICAgdG9rZW4uY29udGVudCA9IChmaXJzdExpbmUgJiYgZmlyc3RMaW5lLnRyaW0oKSA/IGZpcnN0TGluZSArICdcXG4nIDogJycpXHJcbiAgICArIHN0YXRlLmdldExpbmVzKHN0YXJ0ICsgMSwgbmV4dCwgc3RhdGUudFNoaWZ0W3N0YXJ0XSwgdHJ1ZSlcclxuICAgICsgKGxhc3RMaW5lICYmIGxhc3RMaW5lLnRyaW0oKSA/IGxhc3RMaW5lIDogJycpO1xyXG4gICAgdG9rZW4ubWFwID0gWyBzdGFydCwgc3RhdGUubGluZSBdO1xyXG4gICAgdG9rZW4ubWFya3VwID0gJyQkJztcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKSB7XHJcbi8vICAgICByZXR1cm4gdW5zYWZlXHJcbi8vICAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxyXG4vLyAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4vLyAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxyXG4vLyAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxyXG4vLyAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0aFBhcnNlclBsdWdpbihtZDogYW55KSB7XHJcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnNcclxuXHJcbiAgICAvLyAvLyBzZXQgS2FUZVggYXMgdGhlIHJlbmRlcmVyIGZvciBtYXJrZG93bi1pdC1zaW1wbGVtYXRoXHJcbiAgICAvLyBjb25zdCBrYXRleElubGluZSA9IGZ1bmN0aW9uKGxhdGV4KXtcclxuICAgIC8vICAgICBvcHRpb25zLmRpc3BsYXlNb2RlID0gZmFsc2U7XHJcbiAgICAvLyAgICAgdHJ5e1xyXG4gICAgLy8gICAgICAgICByZXR1cm4ga2F0ZXgucmVuZGVyVG9TdHJpbmcobGF0ZXgsIG9wdGlvbnMpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBjYXRjaChlcnJvcil7XHJcbiAgICAvLyAgICAgICAgIGlmKG9wdGlvbnMudGhyb3dPbkVycm9yKXsgY29uc29sZS5sb2coZXJyb3IpOyB9XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9J2thdGV4LWVycm9yJyB0aXRsZT0nJHtlc2NhcGVIdG1sKGVycm9yLnRvU3RyaW5nKCkpfSc+JHtlc2NhcGVIdG1sKGxhdGV4KX08L3NwYW4+YDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIC8vIGNvbnN0IGlubGluZVJlbmRlcmVyID0gZnVuY3Rpb24odG9rZW5zLCBpZHgpe1xyXG4gICAgLy8gICAgIHJldHVybiBrYXRleElubGluZSh0b2tlbnNbaWR4XS5jb250ZW50KTtcclxuICAgIC8vIH07XHJcblxyXG4gICAgLy8gY29uc3Qga2F0ZXhCbG9jayA9IGZ1bmN0aW9uKGxhdGV4KXtcclxuICAgIC8vICAgICBvcHRpb25zLmRpc3BsYXlNb2RlID0gdHJ1ZTtcclxuICAgIC8vICAgICB0cnl7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBcIjxwIGNsYXNzPSdrYXRleC1ibG9jayc+XCIgKyBrYXRleC5yZW5kZXJUb1N0cmluZyhsYXRleCwgb3B0aW9ucykgKyBcIjwvcD5cIjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgY2F0Y2goZXJyb3Ipe1xyXG4gICAgLy8gICAgICAgICBpZihvcHRpb25zLnRocm93T25FcnJvcil7IGNvbnNvbGUubG9nKGVycm9yKTsgfVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gYDxwIGNsYXNzPSdrYXRleC1ibG9jayBrYXRleC1lcnJvcicgdGl0bGU9JyR7ZXNjYXBlSHRtbChlcnJvci50b1N0cmluZygpKX0nPiR7ZXNjYXBlSHRtbChsYXRleCl9PC9wPmA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfTtcclxuXHJcbiAgICAvLyBjb25zdCBibG9ja1JlbmRlcmVyID0gZnVuY3Rpb24odG9rZW5zOiwgaWR4KXtcclxuICAgIC8vICAgICByZXR1cm4gIGthdGV4QmxvY2sodG9rZW5zW2lkeF0uY29udGVudCkgKyAnXFxuJztcclxuICAgIC8vIH07XHJcblxyXG4gICAgbWQuaW5saW5lLnJ1bGVyLmFmdGVyKCdlc2NhcGUnLCAnbWF0aF9pbmxpbmUnLCBtYXRoX2lubGluZSk7XHJcbiAgICBtZC5ibG9jay5ydWxlci5hZnRlcignYmxvY2txdW90ZScsICdtYXRoX2Jsb2NrJywgbWF0aF9ibG9jaywge1xyXG4gICAgICAgIGFsdDogWyAncGFyYWdyYXBoJywgJ3JlZmVyZW5jZScsICdibG9ja3F1b3RlJywgJ2xpc3QnIF1cclxuICAgIH0pO1xyXG59IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IG1hcmtkb3duaXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XHJcbmltcG9ydCB7bWF0aFBhcnNlclBsdWdpbn0gZnJvbSBcIi4vbWFya2Rvd25pdE1hdGhQYXJzZXJQbHVnaW5cIjtcclxuaW1wb3J0IHsgTWFyaywgTm9kZSwgTm9kZVNwZWMsIFNjaGVtYSB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG5pbXBvcnQgVG9rZW4gZnJvbSBcIm1hcmtkb3duLWl0L2xpYi90b2tlblwiO1xyXG5pbXBvcnQgeyBOb2RlVHlwZSB9IGZyb20gXCJiYWJlbC13YWxrXCI7XHJcbmltcG9ydCBNYXJrZG93bkl0IGZyb20gXCJtYXJrZG93bi1pdFwiO1xyXG5cclxuZnVuY3Rpb24gbWF5YmVNZXJnZShhOiBOb2RlLCBiOiBOb2RlKSB7XHJcbiAgaWYgKGEuaXNUZXh0ICYmIGIuaXNUZXh0ICYmIE1hcmsuc2FtZVNldChhLm1hcmtzLCBiLm1hcmtzKSlcclxuICAgIHJldHVybiAoYSBhcyBhbnkpLndpdGhUZXh0KGEudGV4dCEgKyBiLnRleHQhKTtcclxufVxyXG5cclxuLy8gT2JqZWN0IHVzZWQgdG8gdHJhY2sgdGhlIGNvbnRleHQgb2YgYSBydW5uaW5nIHBhcnNlLlxyXG5jbGFzcyBNYXJrZG93blBhcnNlU3RhdGUge1xyXG4gIHNjaGVtYTogU2NoZW1hPGFueSwgYW55PjtcclxuICBzdGFjazogYW55W107XHJcbiAgbWFya3M6IE1hcms8YW55PltdO1xyXG4gIHRva2VuSGFuZGxlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWEsIHRva2VuSGFuZGxlcnM6IGFueSkge1xyXG4gICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XHJcbiAgICB0aGlzLnN0YWNrID0gW3sgdHlwZTogc2NoZW1hLnRvcE5vZGVUeXBlLCBjb250ZW50OiBbXSB9XTtcclxuICAgIHRoaXMubWFya3MgPSBNYXJrLm5vbmU7XHJcbiAgICB0aGlzLnRva2VuSGFuZGxlcnMgPSB0b2tlbkhhbmRsZXJzO1xyXG4gIH1cclxuXHJcbiAgdG9wKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcclxuICB9XHJcblxyXG4gIHB1c2goZWx0OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCkgdGhpcy50b3AoKS5jb250ZW50LnB1c2goZWx0KTtcclxuICB9XHJcblxyXG4gIC8vIDogKHN0cmluZylcclxuICAvLyBBZGRzIHRoZSBnaXZlbiB0ZXh0IHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBkb2N1bWVudCxcclxuICAvLyB1c2luZyB0aGUgY3VycmVudCBtYXJrcyBhcyBzdHlsaW5nLlxyXG4gIGFkZFRleHQodGV4dDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRleHQpIHJldHVybjtcclxuICAgIGNvbnN0IG5vZGVzID0gdGhpcy50b3AoKS5jb250ZW50LCBsYXN0ID0gbm9kZXNbbm9kZXMubGVuZ3RoIC0gMV07XHJcbiAgICBjb25zdCBub2RlID0gdGhpcy5zY2hlbWEudGV4dCh0ZXh0LCB0aGlzLm1hcmtzKTtcclxuICAgIGxldCBtZXJnZWQ7XHJcbiAgICBpZiAobGFzdCAmJiAobWVyZ2VkID0gbWF5YmVNZXJnZShsYXN0LCBub2RlKSkpIG5vZGVzW25vZGVzLmxlbmd0aCAtIDFdID0gbWVyZ2VkO1xyXG4gICAgZWxzZSBub2Rlcy5wdXNoKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gOiAoTWFyaylcclxuICAvLyBBZGRzIHRoZSBnaXZlbiBtYXJrIHRvIHRoZSBzZXQgb2YgYWN0aXZlIG1hcmtzLlxyXG4gIG9wZW5NYXJrKG1hcms6IE1hcmspIHtcclxuICAgIHRoaXMubWFya3MgPSBtYXJrLmFkZFRvU2V0KHRoaXMubWFya3MpO1xyXG4gIH1cclxuXHJcbiAgLy8gOiAoTWFyaylcclxuICAvLyBSZW1vdmVzIHRoZSBnaXZlbiBtYXJrIGZyb20gdGhlIHNldCBvZiBhY3RpdmUgbWFya3MuXHJcbiAgY2xvc2VNYXJrKG1hcms6IE1hcmspIHtcclxuICAgIHRoaXMubWFya3MgPSBtYXJrLnJlbW92ZUZyb21TZXQodGhpcy5tYXJrcyk7XHJcbiAgfVxyXG5cclxuICBwYXJzZVRva2Vucyh0b2tzOiBUb2tlbltdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdG9rID0gdG9rc1tpXTtcclxuICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMudG9rZW5IYW5kbGVyc1t0b2sudHlwZV07XHJcbiAgICAgIGlmICghaGFuZGxlcilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb2tlbiB0eXBlIGBcIiArIHRvay50eXBlICsgXCJgIG5vdCBzdXBwb3J0ZWQgYnkgTWFya2Rvd24gcGFyc2VyXCIpO1xyXG4gICAgICBoYW5kbGVyKHRoaXMsIHRvaywgdG9rcywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA6IChOb2RlVHlwZSwgP09iamVjdCwgP1tOb2RlXSkg4oaSID9Ob2RlXHJcbiAgLy8gQWRkIGEgbm9kZSBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cclxuICBhZGROb2RlKHR5cGU6IE5vZGVUeXBlPGFueT4sIGF0dHJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgY29udGVudDogTm9kZVtdKSB7XHJcbiAgICBjb25zdCBub2RlID0gdHlwZS5jcmVhdGVBbmRGaWxsKGF0dHJzLCBjb250ZW50LCB0aGlzLm1hcmtzKTtcclxuICAgIGlmICghbm9kZSkgcmV0dXJuIG51bGw7XHJcbiAgICB0aGlzLnB1c2gobm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZTtcclxuICB9XHJcblxyXG4gIC8vIDogKE5vZGVUeXBlLCA/T2JqZWN0KVxyXG4gIC8vIFdyYXAgc3Vic2VxdWVudCBjb250ZW50IGluIGEgbm9kZSBvZiB0aGUgZ2l2ZW4gdHlwZS5cclxuICBvcGVuTm9kZSh0eXBlOiBOb2RlVHlwZTxhbnk+LCBhdHRyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcclxuICAgIHRoaXMuc3RhY2sucHVzaCh7IHR5cGU6IHR5cGUsIGF0dHJzOiBhdHRycywgY29udGVudDogW10gfSk7XHJcbiAgfVxyXG5cclxuICAvLyA6ICgpIOKGkiA/Tm9kZVxyXG4gIC8vIENsb3NlIGFuZCByZXR1cm4gdGhlIG5vZGUgdGhhdCBpcyBjdXJyZW50bHkgb24gdG9wIG9mIHRoZSBzdGFjay5cclxuICBjbG9zZU5vZGUoKSB7XHJcbiAgICBpZiAodGhpcy5tYXJrcy5sZW5ndGgpIHRoaXMubWFya3MgPSBNYXJrLm5vbmU7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5zdGFjay5wb3AoKTtcclxuICAgIHJldHVybiB0aGlzLmFkZE5vZGUoaW5mby50eXBlLCBpbmZvLmF0dHJzLCBpbmZvLmNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0cnMoc3BlYzogYW55LCB0b2tlbjogYW55LCB0b2tlbnM6IGFueSwgaTogYW55KSB7XHJcbiAgaWYgKHNwZWMuZ2V0QXR0cnMpIHJldHVybiBzcGVjLmdldEF0dHJzKHRva2VuLCB0b2tlbnMsIGkpO1xyXG4gIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aGVuIGBhdHRyc2AgaXMgYSBGdW5jdGlvblxyXG4gIGVsc2UgaWYgKHNwZWMuYXR0cnMgaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIHNwZWMuYXR0cnModG9rZW4pO1xyXG4gIGVsc2UgcmV0dXJuIHNwZWMuYXR0cnM7XHJcbn1cclxuXHJcbi8vIENvZGUgY29udGVudCBpcyByZXByZXNlbnRlZCBhcyBhIHNpbmdsZSB0b2tlbiB3aXRoIGEgYGNvbnRlbnRgXHJcbi8vIHByb3BlcnR5IGluIE1hcmtkb3duLWl0LlxyXG5mdW5jdGlvbiBub0Nsb3NlVG9rZW4oc3BlYzogTm9kZVNwZWMsIHR5cGU6IHN0cmluZykge1xyXG4gIHJldHVybiBzcGVjLm5vQ2xvc2VUb2tlbiB8fCB0eXBlID09IFwiY29kZV9pbmxpbmVcIiB8fCB0eXBlID09IFwiY29kZV9ibG9ja1wiIHx8IHR5cGUgPT0gXCJmZW5jZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRob3V0VHJhaWxpbmdOZXdsaW5lKHN0cjogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHN0cltzdHIubGVuZ3RoIC0gMV0gPT0gXCJcXG5cIiA/IHN0ci5zbGljZSgwLCBzdHIubGVuZ3RoIC0gMSkgOiBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vT3AoKSB7LyogRG8gbm90aGluZyAqLyB9XHJcblxyXG5mdW5jdGlvbiB0b2tlbkhhbmRsZXJzKHNjaGVtYTogYW55LCB0b2tlbnM6IGFueSkge1xyXG4gIGNvbnN0IGhhbmRsZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICBmb3IgKGNvbnN0IHR5cGUgaW4gdG9rZW5zKSB7XHJcbiAgICBjb25zdCBzcGVjID0gdG9rZW5zW3R5cGVdO1xyXG4gICAgaWYgKHNwZWMuYmxvY2spIHtcclxuICAgICAgY29uc3Qgbm9kZVR5cGUgPSBzY2hlbWEubm9kZVR5cGUoc3BlYy5ibG9jayk7XHJcbiAgICAgIGlmIChub0Nsb3NlVG9rZW4oc3BlYywgdHlwZSkpIHtcclxuICAgICAgICBoYW5kbGVyc1t0eXBlXSA9IChzdGF0ZTogYW55LCB0b2s6IGFueSwgdG9rZW5zOiBhbnksIGk6IGFueSkgPT4ge1xyXG4gICAgICAgICAgc3RhdGUub3Blbk5vZGUobm9kZVR5cGUsIGF0dHJzKHNwZWMsIHRvaywgdG9rZW5zLCBpKSk7XHJcbiAgICAgICAgICBzdGF0ZS5hZGRUZXh0KHdpdGhvdXRUcmFpbGluZ05ld2xpbmUodG9rLmNvbnRlbnQpKTtcclxuICAgICAgICAgIHN0YXRlLmNsb3NlTm9kZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlcnNbdHlwZSArIFwiX29wZW5cIl0gPSAoc3RhdGU6IGFueSwgdG9rOiBhbnksIHRva2VuczogYW55LCBpOiBhbnkpID0+IHN0YXRlLm9wZW5Ob2RlKG5vZGVUeXBlLCBhdHRycyhzcGVjLCB0b2ssIHRva2VucywgaSkpO1xyXG4gICAgICAgIGhhbmRsZXJzW3R5cGUgKyBcIl9jbG9zZVwiXSA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5jbG9zZU5vZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzcGVjLm5vZGUpIHtcclxuICAgICAgY29uc3Qgbm9kZVR5cGUgPSBzY2hlbWEubm9kZVR5cGUoc3BlYy5ub2RlKTtcclxuICAgICAgaGFuZGxlcnNbdHlwZV0gPSAoc3RhdGU6IGFueSwgdG9rOiBhbnksIHRva2VuczogYW55LCBpOiBhbnkpID0+IHN0YXRlLmFkZE5vZGUobm9kZVR5cGUsIGF0dHJzKHNwZWMsIHRvaywgdG9rZW5zLCBpKSk7XHJcbiAgICB9IGVsc2UgaWYgKHNwZWMubWFyaykge1xyXG4gICAgICBjb25zdCBtYXJrVHlwZSA9IHNjaGVtYS5tYXJrc1tzcGVjLm1hcmtdO1xyXG4gICAgICBpZiAobm9DbG9zZVRva2VuKHNwZWMsIHR5cGUpKSB7XHJcbiAgICAgICAgaGFuZGxlcnNbdHlwZV0gPSAoc3RhdGU6IGFueSwgdG9rOiBhbnksIHRva2VuczogYW55LCBpOiBhbnkpID0+IHtcclxuICAgICAgICAgIHN0YXRlLm9wZW5NYXJrKG1hcmtUeXBlLmNyZWF0ZShhdHRycyhzcGVjLCB0b2ssIHRva2VucywgaSkpKTtcclxuICAgICAgICAgIHN0YXRlLmFkZFRleHQod2l0aG91dFRyYWlsaW5nTmV3bGluZSh0b2suY29udGVudCkpO1xyXG4gICAgICAgICAgc3RhdGUuY2xvc2VNYXJrKG1hcmtUeXBlKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZXJzW3R5cGUgKyBcIl9vcGVuXCJdID0gKHN0YXRlOiBhbnksIHRvazogYW55LCB0b2tlbnM6IGFueSwgaTogYW55KSA9PiBzdGF0ZS5vcGVuTWFyayhtYXJrVHlwZS5jcmVhdGUoYXR0cnMoc3BlYywgdG9rLCB0b2tlbnMsIGkpKSk7XHJcbiAgICAgICAgaGFuZGxlcnNbdHlwZSArIFwiX2Nsb3NlXCJdID0gKHN0YXRlOiBhbnkpID0+IHN0YXRlLmNsb3NlTWFyayhtYXJrVHlwZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3BlYy5pZ25vcmUpIHtcclxuICAgICAgaWYgKG5vQ2xvc2VUb2tlbihzcGVjLCB0eXBlKSkge1xyXG4gICAgICAgIGhhbmRsZXJzW3R5cGVdID0gbm9PcDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVyc1t0eXBlICsgJ19vcGVuJ10gPSBub09wO1xyXG4gICAgICAgIGhhbmRsZXJzW3R5cGUgKyAnX2Nsb3NlJ10gPSBub09wO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVucmVjb2duaXplZCBwYXJzaW5nIHNwZWMgXCIgKyBKU09OLnN0cmluZ2lmeShzcGVjKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVycy50ZXh0ID0gKHN0YXRlOiBhbnksIHRvazogYW55KSA9PiBzdGF0ZS5hZGRUZXh0KHRvay5jb250ZW50KTtcclxuICBoYW5kbGVycy5pbmxpbmUgPSAoc3RhdGU6IGFueSwgdG9rOiBhbnkpID0+IHN0YXRlLnBhcnNlVG9rZW5zKHRvay5jaGlsZHJlbik7XHJcbiAgaGFuZGxlcnMuc29mdGJyZWFrID0gaGFuZGxlcnMuc29mdGJyZWFrIHx8ICgoc3RhdGU6IGFueSkgPT4gc3RhdGUuYWRkVGV4dChcIlxcblwiKSk7XHJcblxyXG4gIHJldHVybiBoYW5kbGVycztcclxufVxyXG5cclxuLy8gOjotIEEgY29uZmlndXJhdGlvbiBvZiBhIE1hcmtkb3duIHBhcnNlci4gU3VjaCBhIHBhcnNlciB1c2VzXHJcbi8vIFttYXJrZG93bi1pdF0oaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L21hcmtkb3duLWl0KSB0b1xyXG4vLyB0b2tlbml6ZSBhIGZpbGUsIGFuZCB0aGVuIHJ1bnMgdGhlIGN1c3RvbSBydWxlcyBpdCBpcyBnaXZlbiBvdmVyXHJcbi8vIHRoZSB0b2tlbnMgdG8gY3JlYXRlIGEgUHJvc2VNaXJyb3IgZG9jdW1lbnQgdHJlZS5cclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duUGFyc2VyIHtcclxuICB0b2tlbnM6IGFueTtcclxuICBzY2hlbWE6IGFueTtcclxuICB0b2tlbml6ZXI6IGFueTtcclxuICB0b2tlbkhhbmRsZXJzOiBhbnk7XHJcbiAgLy8gOjogKFNjaGVtYSwgTWFya2Rvd25JdCwgT2JqZWN0KVxyXG4gIC8vIENyZWF0ZSBhIHBhcnNlciB3aXRoIHRoZSBnaXZlbiBjb25maWd1cmF0aW9uLiBZb3UgY2FuIGNvbmZpZ3VyZVxyXG4gIC8vIHRoZSBtYXJrZG93bi1pdCBwYXJzZXIgdG8gcGFyc2UgdGhlIGRpYWxlY3QgeW91IHdhbnQsIGFuZCBwcm92aWRlXHJcbiAgLy8gYSBkZXNjcmlwdGlvbiBvZiB0aGUgUHJvc2VNaXJyb3IgZW50aXRpZXMgdGhvc2UgdG9rZW5zIG1hcCB0byBpblxyXG4gIC8vIHRoZSBgdG9rZW5zYCBvYmplY3QsIHdoaWNoIG1hcHMgdG9rZW4gbmFtZXMgdG8gZGVzY3JpcHRpb25zIG9mXHJcbiAgLy8gd2hhdCB0byBkbyB3aXRoIHRoZW0uIFN1Y2ggYSBkZXNjcmlwdGlvbiBpcyBhbiBvYmplY3QsIGFuZCBtYXlcclxuICAvLyBoYXZlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAvL1xyXG4gIC8vICoqYG5vZGVgKipgOiA/c3RyaW5nYFxyXG4gIC8vICAgOiBUaGlzIHRva2VuIG1hcHMgdG8gYSBzaW5nbGUgbm9kZSwgd2hvc2UgdHlwZSBjYW4gYmUgbG9va2VkIHVwXHJcbiAgLy8gICAgIGluIHRoZSBzY2hlbWEgdW5kZXIgdGhlIGdpdmVuIG5hbWUuIEV4YWN0bHkgb25lIG9mIGBub2RlYCxcclxuICAvLyAgICAgYGJsb2NrYCwgb3IgYG1hcmtgIG11c3QgYmUgc2V0LlxyXG4gIC8vXHJcbiAgLy8gKipgYmxvY2tgKipgOiA/c3RyaW5nYFxyXG4gIC8vICAgOiBUaGlzIHRva2VuICh1bmxlc3MgYG5vQ2xvc2VUb2tlbmAgaXMgdHJ1ZSkgY29tZXMgaW4gYF9vcGVuYFxyXG4gIC8vICAgICBhbmQgYF9jbG9zZWAgdmFyaWFudHMgKHdoaWNoIGFyZSBhcHBlbmRlZCB0byB0aGUgYmFzZSB0b2tlblxyXG4gIC8vICAgICBuYW1lIHByb3ZpZGVzIGEgdGhlIG9iamVjdCBwcm9wZXJ0eSksIGFuZCB3cmFwcyBhIGJsb2NrIG9mXHJcbiAgLy8gICAgIGNvbnRlbnQuIFRoZSBibG9jayBzaG91bGQgYmUgd3JhcHBlZCBpbiBhIG5vZGUgb2YgdGhlIHR5cGVcclxuICAvLyAgICAgbmFtZWQgdG8gYnkgdGhlIHByb3BlcnR5J3MgdmFsdWUuIElmIHRoZSB0b2tlbiBkb2VzIG5vdCBoYXZlXHJcbiAgLy8gICAgIGBfb3BlbmAgb3IgYF9jbG9zZWAsIHVzZSB0aGUgYG5vQ2xvc2VUb2tlbmAgb3B0aW9uLlxyXG4gIC8vXHJcbiAgLy8gKipgbWFya2AqKmA6ID9zdHJpbmdgXHJcbiAgLy8gICA6IFRoaXMgdG9rZW4gKGFnYWluLCB1bmxlc3MgYG5vQ2xvc2VUb2tlbmAgaXMgdHJ1ZSkgYWxzbyBjb21lc1xyXG4gIC8vICAgICBpbiBgX29wZW5gIGFuZCBgX2Nsb3NlYCB2YXJpYW50cywgYnV0IHNob3VsZCBhZGQgYSBtYXJrXHJcbiAgLy8gICAgIChuYW1lZCBieSB0aGUgdmFsdWUpIHRvIGl0cyBjb250ZW50LCByYXRoZXIgdGhhbiB3cmFwcGluZyBpdFxyXG4gIC8vICAgICBpbiBhIG5vZGUuXHJcbiAgLy9cclxuICAvLyAqKmBhdHRyc2AqKmA6ID9PYmplY3RgXHJcbiAgLy8gICA6IEF0dHJpYnV0ZXMgZm9yIHRoZSBub2RlIG9yIG1hcmsuIFdoZW4gYGdldEF0dHJzYCBpcyBwcm92aWRlZCxcclxuICAvLyAgICAgaXQgdGFrZXMgcHJlY2VkZW5jZS5cclxuICAvL1xyXG4gIC8vICoqYGdldEF0dHJzYCoqYDogPyhNYXJrZG93blRva2VuKSDihpIgT2JqZWN0YFxyXG4gIC8vICAgOiBBIGZ1bmN0aW9uIHVzZWQgdG8gY29tcHV0ZSB0aGUgYXR0cmlidXRlcyBmb3IgdGhlIG5vZGUgb3IgbWFya1xyXG4gIC8vICAgICB0aGF0IHRha2VzIGEgW21hcmtkb3duLWl0XHJcbiAgLy8gICAgIHRva2VuXShodHRwczovL21hcmtkb3duLWl0LmdpdGh1Yi5pby9tYXJrZG93bi1pdC8jVG9rZW4pIGFuZFxyXG4gIC8vICAgICByZXR1cm5zIGFuIGF0dHJpYnV0ZSBvYmplY3QuXHJcbiAgLy9cclxuICAvLyAqKmBub0Nsb3NlVG9rZW5gKipgOiA/Ym9vbGVhbmBcclxuICAvLyAgIDogSW5kaWNhdGVzIHRoYXQgdGhlIFttYXJrZG93bi1pdFxyXG4gIC8vICAgICB0b2tlbl0oaHR0cHM6Ly9tYXJrZG93bi1pdC5naXRodWIuaW8vbWFya2Rvd24taXQvI1Rva2VuKSBoYXNcclxuICAvLyAgICAgbm8gYF9vcGVuYCBvciBgX2Nsb3NlYCBmb3IgdGhlIG5vZGVzLiBUaGlzIGRlZmF1bHRzIHRvIGB0cnVlYFxyXG4gIC8vICAgICBmb3IgYGNvZGVfaW5saW5lYCwgYGNvZGVfYmxvY2tgIGFuZCBgZmVuY2VgLlxyXG4gIC8vXHJcbiAgLy8gKipgaWdub3JlYCoqYDogP2Jvb2xgXHJcbiAgLy8gICA6IFdoZW4gdHJ1ZSwgaWdub3JlIGNvbnRlbnQgZm9yIHRoZSBtYXRjaGVkIHRva2VuLlxyXG4gIGNvbnN0cnVjdG9yKHNjaGVtYTogU2NoZW1hLCB0b2tlbml6ZXI6IE1hcmtkb3duSXQsIHRva2VuczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgLy8gOjogT2JqZWN0IFRoZSB2YWx1ZSBvZiB0aGUgYHRva2Vuc2Agb2JqZWN0IHVzZWQgdG8gY29uc3RydWN0XHJcbiAgICAvLyB0aGlzIHBhcnNlci4gQ2FuIGJlIHVzZWZ1bCB0byBjb3B5IGFuZCBtb2RpZnkgdG8gYmFzZSBvdGhlclxyXG4gICAgLy8gcGFyc2VycyBvbi5cclxuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xyXG4gICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XHJcbiAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcjtcclxuICAgIHRoaXMudG9rZW5IYW5kbGVycyA9IHRva2VuSGFuZGxlcnMoc2NoZW1hLCB0b2tlbnMpO1xyXG4gIH1cclxuXHJcbiAgLy8gOjogKHN0cmluZykg4oaSIE5vZGVcclxuICAvLyBQYXJzZSBhIHN0cmluZyBhcyBbQ29tbW9uTWFya10oaHR0cDovL2NvbW1vbm1hcmsub3JnLykgbWFya3VwLFxyXG4gIC8vIGFuZCBjcmVhdGUgYSBQcm9zZU1pcnJvciBkb2N1bWVudCBhcyBwcmVzY3JpYmVkIGJ5IHRoaXMgcGFyc2VyJ3NcclxuICAvLyBydWxlcy5cclxuICBwYXJzZSh0ZXh0OiBzdHJpbmcpOiBOb2RlIHtcclxuICAgIGNvbnN0IHN0YXRlID0gbmV3IE1hcmtkb3duUGFyc2VTdGF0ZSh0aGlzLnNjaGVtYSwgdGhpcy50b2tlbkhhbmRsZXJzKTtcclxuICAgIGxldCBkb2M7XHJcbiAgICBzdGF0ZS5wYXJzZVRva2Vucyh0aGlzLnRva2VuaXplci5wYXJzZSh0ZXh0LCB7fSkpO1xyXG5cclxuICAgIGRvIHsgZG9jID0gc3RhdGUuY2xvc2VOb2RlKCk7IH0gd2hpbGUgKHN0YXRlLnN0YWNrLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gZG9jO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdElzVGlnaHQodG9rZW5zOiBhbnlbXSwgaTogbnVtYmVyKSB7XHJcbiAgd2hpbGUgKCsraSA8IHRva2Vucy5sZW5ndGgpXHJcbiAgICBpZiAodG9rZW5zW2ldLnR5cGUgIT0gXCJsaXN0X2l0ZW1fb3BlblwiKSByZXR1cm4gdG9rZW5zW2ldLmhpZGRlbjtcclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbnR5cGUgTWFya2Rvd25Ub2tlbiA9IGFueTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXJrZG93blBhcnNlcihzY2hlbWE6IFNjaGVtYSkge1xyXG5cclxuICBjb25zdCBtZGl0ID0gbWFya2Rvd25pdChcImNvbW1vbm1hcmtcIiwgeyBodG1sOiBmYWxzZSB9KTtcclxuICBtZGl0LnVzZShtYXRoUGFyc2VyUGx1Z2luKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBNYXJrZG93blBhcnNlcihzY2hlbWEsIG1kaXQsIHtcclxuICAgIGJsb2NrcXVvdGU6IHsgYmxvY2s6IFwiYmxvY2txdW90ZVwiIH0sXHJcbiAgICBwYXJhZ3JhcGg6IHsgYmxvY2s6IFwicGFyYWdyYXBoXCIgfSxcclxuICAgIGxpc3RfaXRlbTogeyBibG9jazogXCJsaXN0X2l0ZW1cIiB9LFxyXG4gICAgYnVsbGV0X2xpc3Q6IHsgYmxvY2s6IFwiYnVsbGV0X2xpc3RcIiwgZ2V0QXR0cnM6IChfOiBNYXJrZG93blRva2VuLCB0b2tlbnM6IE1hcmtkb3duVG9rZW5bXSwgaTogbnVtYmVyKSA9PiAoeyB0aWdodDogbGlzdElzVGlnaHQodG9rZW5zLCBpKSB9KSB9LFxyXG4gICAgb3JkZXJlZF9saXN0OiB7XHJcbiAgICAgIGJsb2NrOiBcIm9yZGVyZWRfbGlzdFwiLCBnZXRBdHRyczogKHRvazogTWFya2Rvd25Ub2tlbiwgdG9rZW5zOiBNYXJrZG93blRva2VuW10sIGk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICBvcmRlcjogK3Rvay5hdHRyR2V0KFwic3RhcnRcIikgfHwgMSxcclxuICAgICAgICB0aWdodDogbGlzdElzVGlnaHQodG9rZW5zLCBpKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhlYWRpbmc6IHsgYmxvY2s6IFwiaGVhZGluZ1wiLCBnZXRBdHRyczogKHRvazogTWFya2Rvd25Ub2tlbikgPT4gKHsgbGV2ZWw6ICt0b2sudGFnLnNsaWNlKDEpIH0pIH0sXHJcbiAgICBjb2RlX2Jsb2NrOiB7IGJsb2NrOiBcImNvZGVfYmxvY2tcIiwgbm9DbG9zZVRva2VuOiB0cnVlIH0sXHJcbiAgICBmZW5jZTogeyBibG9jazogXCJjb2RlX2Jsb2NrXCIsIGdldEF0dHJzOiAodG9rOiBNYXJrZG93blRva2VuKSA9PiAoeyBwYXJhbXM6IHRvay5pbmZvIHx8IFwiXCIgfSksIG5vQ2xvc2VUb2tlbjogdHJ1ZSB9LFxyXG4gICAgaHI6IHsgbm9kZTogXCJob3Jpem9udGFsX3J1bGVcIiB9LFxyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgbm9kZTogXCJpbWFnZVwiLCBnZXRBdHRyczogKHRvazogTWFya2Rvd25Ub2tlbikgPT4gKHtcclxuICAgICAgICBzcmM6IHRvay5hdHRyR2V0KFwic3JjXCIpLFxyXG4gICAgICAgIHRpdGxlOiB0b2suYXR0ckdldChcInRpdGxlXCIpIHx8IG51bGwsXHJcbiAgICAgICAgYWx0OiB0b2suY2hpbGRyZW5bMF0gJiYgdG9rLmNoaWxkcmVuWzBdLmNvbnRlbnQgfHwgbnVsbFxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhhcmRicmVhazogeyBub2RlOiBcImhhcmRfYnJlYWtcIiB9LFxyXG4gICAgbWF0aF9pbmxpbmU6IHsgYmxvY2s6IFwibWF0aF9pbmxpbmVcIiwgbm9DbG9zZVRva2VuOiB0cnVlICB9LFxyXG4gICAgbWF0aF9ibG9jazogeyBibG9jazogXCJtYXRoX2Jsb2NrXCIsIG5vQ2xvc2VUb2tlbjogdHJ1ZSB9LFxyXG4gICAgZW06IHsgbWFyazogXCJlbVwiIH0sXHJcbiAgICBzdHJvbmc6IHsgbWFyazogXCJzdHJvbmdcIiB9LFxyXG4gICAgbGluazoge1xyXG4gICAgICBtYXJrOiBcImxpbmtcIiwgZ2V0QXR0cnM6ICh0b2s6IE1hcmtkb3duVG9rZW4pID0+ICh7XHJcbiAgICAgICAgaHJlZjogdG9rLmF0dHJHZXQoXCJocmVmXCIpLFxyXG4gICAgICAgIHRpdGxlOiB0b2suYXR0ckdldChcInRpdGxlXCIpIHx8IG51bGxcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjb2RlX2lubGluZTogeyBtYXJrOiBcImNvZGVcIiwgbm9DbG9zZVRva2VuOiB0cnVlIH1cclxuICB9KTtcclxuXHJcbn0iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgeyBNYXJrLCBOb2RlIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcbmltcG9ydCB7IE1hcmtkb3duU2VyaWFsaXplclN0YXRlIH0gZnJvbSBcIi4vc2VyaWFsaXplclN0YXRlXCI7XHJcblxyXG5mdW5jdGlvbiBiYWNrdGlja3NGb3Iobm9kZTogTm9kZSwgc2lkZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0aWNrcyA9IC9gKy9nO1xyXG4gICAgbGV0IG06IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGw7XHJcbiAgICBsZXQgbGVuID0gMDtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxyXG4gICAgaWYgKG5vZGUuaXNUZXh0KSB3aGlsZSAobSA9IHRpY2tzLmV4ZWMobm9kZS50ZXh0ISkpIGxlbiA9IE1hdGgubWF4KGxlbiwgbVswXS5sZW5ndGgpO1xyXG4gICAgbGV0IHJlc3VsdCA9IGxlbiA+IDAgJiYgc2lkZSA+IDAgPyBcIiBgXCIgOiBcImBcIjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHJlc3VsdCArPSBcImBcIjtcclxuICAgIGlmIChsZW4gPiAwICYmIHNpZGUgPCAwKSByZXN1bHQgKz0gXCIgXCI7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1BsYWluVVJMKGxpbms6IE1hcmssIHBhcmVudDogTm9kZSwgaW5kZXg6IG51bWJlciwgc2lkZTogbnVtYmVyKSB7XHJcbiAgICBpZiAobGluay5hdHRycy50aXRsZSB8fCAhL15cXHcrOi8udGVzdChsaW5rLmF0dHJzLmhyZWYpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBjb250ZW50ID0gcGFyZW50LmNoaWxkKGluZGV4ICsgKHNpZGUgPCAwID8gLTEgOiAwKSk7XHJcbiAgICBpZiAoIWNvbnRlbnQuaXNUZXh0IHx8IGNvbnRlbnQudGV4dCAhPSBsaW5rLmF0dHJzLmhyZWYgfHwgY29udGVudC5tYXJrc1tjb250ZW50Lm1hcmtzLmxlbmd0aCAtIDFdICE9IGxpbmspIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpbmRleCA9PSAoc2lkZSA8IDAgPyAxIDogcGFyZW50LmNoaWxkQ291bnQgLSAxKSkgcmV0dXJuIHRydWU7XHJcbiAgICBjb25zdCBuZXh0ID0gcGFyZW50LmNoaWxkKGluZGV4ICsgKHNpZGUgPCAwID8gLTIgOiAxKSk7XHJcbiAgICByZXR1cm4gIWxpbmsuaXNJblNldChuZXh0Lm1hcmtzKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duU2VyaWFsaXplciB7XHJcbiAgICBub2RlczogYW55O1xyXG4gICAgbWFya3M6IGFueTtcclxuICAgIC8vIDo6IChPYmplY3Q8KHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbm9kZTogTm9kZSwgcGFyZW50OiBOb2RlLCBpbmRleDogbnVtYmVyKT4sIE9iamVjdClcclxuICAgIC8vIENvbnN0cnVjdCBhIHNlcmlhbGl6ZXIgd2l0aCB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbi4gVGhlIGBub2Rlc2BcclxuICAgIC8vIG9iamVjdCBzaG91bGQgbWFwIG5vZGUgbmFtZXMgaW4gYSBnaXZlbiBzY2hlbWEgdG8gZnVuY3Rpb24gdGhhdFxyXG4gICAgLy8gdGFrZSBhIHNlcmlhbGl6ZXIgc3RhdGUgYW5kIHN1Y2ggYSBub2RlLCBhbmQgc2VyaWFsaXplIHRoZSBub2RlLlxyXG4gICAgLy9cclxuICAgIC8vIFRoZSBgbWFya3NgIG9iamVjdCBzaG91bGQgaG9sZCBvYmplY3RzIHdpdGggYG9wZW5gIGFuZCBgY2xvc2VgXHJcbiAgICAvLyBwcm9wZXJ0aWVzLCB3aGljaCBob2xkIHRoZSBzdHJpbmdzIHRoYXQgc2hvdWxkIGFwcGVhciBiZWZvcmUgYW5kXHJcbiAgICAvLyBhZnRlciBhIHBpZWNlIG9mIHRleHQgbWFya2VkIHRoYXQgd2F5LCBlaXRoZXIgZGlyZWN0bHkgb3IgYXMgYVxyXG4gICAgLy8gZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHNlcmlhbGl6ZXIgc3RhdGUgYW5kIGEgbWFyaywgYW5kIHJldHVybnMgYVxyXG4gICAgLy8gc3RyaW5nLiBgb3BlbmAgYW5kIGBjbG9zZWAgY2FuIGFsc28gYmUgZnVuY3Rpb25zLCB3aGljaCB3aWxsIGJlXHJcbiAgICAvLyBjYWxsZWQgYXNcclxuICAgIC8vXHJcbiAgICAvLyAgICAgKHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbWFyazogTWFyayxcclxuICAgIC8vICAgICAgcGFyZW50OiBGcmFnbWVudCwgaW5kZXg6IG51bWJlcikg4oaSIHN0cmluZ1xyXG4gICAgLy9cclxuICAgIC8vIFdoZXJlIGBwYXJlbnRgIGFuZCBgaW5kZXhgIGFsbG93IHlvdSB0byBpbnNwZWN0IHRoZSBtYXJrJ3NcclxuICAgIC8vIGNvbnRleHQgdG8gc2VlIHdoaWNoIG5vZGVzIGl0IGFwcGxpZXMgdG8uXHJcbiAgICAvL1xyXG4gICAgLy8gTWFyayBpbmZvcm1hdGlvbiBvYmplY3RzIGNhbiBhbHNvIGhhdmUgYSBgbWl4YWJsZWAgcHJvcGVydHlcclxuICAgIC8vIHdoaWNoLCB3aGVuIGB0cnVlYCwgaW5kaWNhdGVzIHRoYXQgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBtYXJrJ3NcclxuICAgIC8vIG9wZW5pbmcgYW5kIGNsb3Npbmcgc3ludGF4IGFwcGVhcnMgcmVsYXRpdmUgdG8gb3RoZXIgbWl4YWJsZVxyXG4gICAgLy8gbWFya3MgY2FuIGJlIHZhcmllZC4gKEZvciBleGFtcGxlLCB5b3UgY2FuIHNheSBgKiphICpiKioqYCBhbmRcclxuICAgIC8vIGAqYSAqKmIqKipgLCBidXQgbm90IGBgIGBhICpiKmAgYGAuKVxyXG4gICAgLy9cclxuICAgIC8vIFRvIGRpc2FibGUgY2hhcmFjdGVyIGVzY2FwaW5nIGluIGEgbWFyaywgeW91IGNhbiBnaXZlIGl0IGFuXHJcbiAgICAvLyBgZXNjYXBlYCBwcm9wZXJ0eSBvZiBgZmFsc2VgLiBTdWNoIGEgbWFyayBoYXMgdG8gaGF2ZSB0aGUgaGlnaGVzdFxyXG4gICAgLy8gcHJlY2VkZW5jZSAobXVzdCBhbHdheXMgYmUgdGhlIGlubmVybW9zdCBtYXJrKS5cclxuICAgIC8vXHJcbiAgICAvLyBUaGUgYGV4cGVsRW5jbG9zaW5nV2hpdGVzcGFjZWAgbWFyayBwcm9wZXJ0eSBjYXVzZXMgdGhlXHJcbiAgICAvLyBzZXJpYWxpemVyIHRvIG1vdmUgZW5jbG9zaW5nIHdoaXRlc3BhY2UgZnJvbSBpbnNpZGUgdGhlIG1hcmtzIHRvXHJcbiAgICAvLyBvdXRzaWRlIHRoZSBtYXJrcy4gVGhpcyBpcyBuZWNlc3NhcnkgZm9yIGVtcGhhc2lzIG1hcmtzIGFzXHJcbiAgICAvLyBDb21tb25NYXJrIGRvZXMgbm90IHBlcm1pdCBlbmNsb3Npbmcgd2hpdGVzcGFjZSBpbnNpZGUgZW1waGFzaXNcclxuICAgIC8vIG1hcmtzLCBzZWU6IGh0dHA6Ly9zcGVjLmNvbW1vbm1hcmsub3JnLzAuMjYvI2V4YW1wbGUtMzMwXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlczogdW5rbm93biwgbWFya3M6IHVua25vd24pIHtcclxuICAgICAgICAvLyA6OiBPYmplY3Q8KE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBOb2RlKT4gVGhlIG5vZGUgc2VyaWFsaXplclxyXG4gICAgICAgIC8vIGZ1bmN0aW9ucyBmb3IgdGhpcyBzZXJpYWxpemVyLlxyXG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcclxuICAgICAgICAvLyA6OiBPYmplY3QgVGhlIG1hcmsgc2VyaWFsaXplciBpbmZvLlxyXG4gICAgICAgIHRoaXMubWFya3MgPSBtYXJrcztcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoTm9kZSwgP09iamVjdCkg4oaSIHN0cmluZ1xyXG4gICAgLy8gU2VyaWFsaXplIHRoZSBjb250ZW50IG9mIHRoZSBnaXZlbiBub2RlIHRvXHJcbiAgICAvLyBbQ29tbW9uTWFya10oaHR0cDovL2NvbW1vbm1hcmsub3JnLykuXHJcbiAgICBzZXJpYWxpemUoY29udGVudDogTm9kZSwgb3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IE1hcmtkb3duU2VyaWFsaXplclN0YXRlKHRoaXMubm9kZXMsIHRoaXMubWFya3MsIG9wdGlvbnMpO1xyXG4gICAgICAgIHN0YXRlLnJlbmRlckNvbnRlbnQoY29udGVudCk7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLm91dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcmtkb3duU2VyaWFsaXplcigpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IE1hcmtkb3duU2VyaWFsaXplcih7XHJcbiAgICAgICAgYmxvY2txdW90ZShzdGF0ZTogTWFya2Rvd25TZXJpYWxpemVyU3RhdGUsIG5vZGU6IE5vZGUpIHtcclxuICAgICAgICAgICAgc3RhdGUud3JhcEJsb2NrKFwiPiBcIiwgbnVsbCwgbm9kZSwgKCkgPT4gc3RhdGUucmVuZGVyQ29udGVudChub2RlKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2RlX2Jsb2NrKHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbm9kZTogTm9kZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS53cml0ZShcImBgYFwiICsgKG5vZGUuYXR0cnMucGFyYW1zIHx8IFwiXCIpICsgXCJcXG5cIik7XHJcbiAgICAgICAgICAgIHN0YXRlLnRleHQobm9kZS50ZXh0Q29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGF0ZS5lbnN1cmVOZXdMaW5lKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLndyaXRlKFwiYGBgXCIpO1xyXG4gICAgICAgICAgICBzdGF0ZS5jbG9zZUJsb2NrKG5vZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVhZGluZyhzdGF0ZTogTWFya2Rvd25TZXJpYWxpemVyU3RhdGUsIG5vZGU6IE5vZGUpIHtcclxuICAgICAgICAgICAgc3RhdGUud3JpdGUoc3RhdGUucmVwZWF0KFwiI1wiLCBub2RlLmF0dHJzLmxldmVsKSArIFwiIFwiKTtcclxuICAgICAgICAgICAgc3RhdGUucmVuZGVySW5saW5lKG5vZGUpO1xyXG4gICAgICAgICAgICBzdGF0ZS5jbG9zZUJsb2NrKG5vZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaG9yaXpvbnRhbF9ydWxlKHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbm9kZTogTm9kZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS53cml0ZShub2RlLmF0dHJzLm1hcmt1cCB8fCBcIi0tLVwiKTtcclxuICAgICAgICAgICAgc3RhdGUuY2xvc2VCbG9jayhub2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1bGxldF9saXN0KHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbm9kZTogTm9kZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5yZW5kZXJMaXN0KG5vZGUsIFwiICBcIiwgKCkgPT4gKG5vZGUuYXR0cnMuYnVsbGV0IHx8IFwiKlwiKSArIFwiIFwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9yZGVyZWRfbGlzdChzdGF0ZTogTWFya2Rvd25TZXJpYWxpemVyU3RhdGUsIG5vZGU6IE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBub2RlLmF0dHJzLm9yZGVyIHx8IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFcgPSBTdHJpbmcoc3RhcnQgKyBub2RlLmNoaWxkQ291bnQgLSAxKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlID0gc3RhdGUucmVwZWF0KFwiIFwiLCBtYXhXICsgMik7XHJcbiAgICAgICAgICAgIHN0YXRlLnJlbmRlckxpc3Qobm9kZSwgc3BhY2UsIGkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgblN0ciA9IFN0cmluZyhzdGFydCArIGkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnJlcGVhdChcIiBcIiwgbWF4VyAtIG5TdHIubGVuZ3RoKSArIG5TdHIgKyBcIi4gXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGlzdF9pdGVtKHN0YXRlOiBNYXJrZG93blNlcmlhbGl6ZXJTdGF0ZSwgbm9kZTogTm9kZSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5yZW5kZXJDb250ZW50KG5vZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0aF9pbmxpbmUoc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLndyaXRlKFwiJFwiICsgbm9kZS50ZXh0Q29udGVudCArIFwiJFwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGhfYmxvY2soc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLndyaXRlKFwiJCRcXG5cIik7XHJcbiAgICAgICAgICAgIHN0YXRlLnRleHQobm9kZS50ZXh0Q29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGF0ZS5lbnN1cmVOZXdMaW5lKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLndyaXRlKFwiJCRcIik7XHJcbiAgICAgICAgICAgIHN0YXRlLmNsb3NlQmxvY2sobm9kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhZ3JhcGgoc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnJlbmRlcklubGluZShub2RlKTtcclxuICAgICAgICAgICAgc3RhdGUuY2xvc2VCbG9jayhub2RlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbWFnZShzdGF0ZTogTWFya2Rvd25TZXJpYWxpemVyU3RhdGUsIG5vZGU6IE5vZGUpIHtcclxuICAgICAgICAgICAgc3RhdGUud3JpdGUoXCIhW1wiICsgc3RhdGUuZXNjKG5vZGUuYXR0cnMuYWx0IHx8IFwiXCIpICsgXCJdKFwiICsgc3RhdGUuZXNjKG5vZGUuYXR0cnMuc3JjKSArXHJcbiAgICAgICAgICAgICAgICAobm9kZS5hdHRycy50aXRsZSA/IFwiIFwiICsgc3RhdGUucXVvdGUobm9kZS5hdHRycy50aXRsZSkgOiBcIlwiKSArIFwiKVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhcmRfYnJlYWsoc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBub2RlOiBOb2RlLCBwYXJlbnQ6IE5vZGUsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IHBhcmVudC5jaGlsZENvdW50OyBpKyspXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkKGkpLnR5cGUgIT0gbm9kZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUud3JpdGUoXCJcXFxcXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRleHQoc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBub2RlOiBOb2RlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRleHQobm9kZS50ZXh0ISk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwge1xyXG4gICAgICAgIGVtOiB7IG9wZW46IFwiKlwiLCBjbG9zZTogXCIqXCIsIG1peGFibGU6IHRydWUsIGV4cGVsRW5jbG9zaW5nV2hpdGVzcGFjZTogdHJ1ZSB9LFxyXG4gICAgICAgIHN0cm9uZzogeyBvcGVuOiBcIioqXCIsIGNsb3NlOiBcIioqXCIsIG1peGFibGU6IHRydWUsIGV4cGVsRW5jbG9zaW5nV2hpdGVzcGFjZTogdHJ1ZSB9LFxyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgb3Blbihfc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBtYXJrOiBNYXJrLCBwYXJlbnQ6IE5vZGUsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1BsYWluVVJMKG1hcmssIHBhcmVudCwgaW5kZXgsIDEpID8gXCI8XCIgOiBcIltcIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2Uoc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBtYXJrOiBNYXJrLCBwYXJlbnQ6IE5vZGUsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1BsYWluVVJMKG1hcmssIHBhcmVudCwgaW5kZXgsIC0xKSA/IFwiPlwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcIl0oXCIgKyBzdGF0ZS5lc2MobWFyay5hdHRycy5ocmVmKSArIChtYXJrLmF0dHJzLnRpdGxlID8gXCIgXCIgKyBzdGF0ZS5xdW90ZShtYXJrLmF0dHJzLnRpdGxlKSA6IFwiXCIpICsgXCIpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvZGU6IHtcclxuICAgICAgICAgICAgb3Blbihfc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBfbWFyazogTWFyaywgcGFyZW50OiBOb2RlLCBpbmRleDogbnVtYmVyKSB7IHJldHVybiBiYWNrdGlja3NGb3IocGFyZW50LmNoaWxkKGluZGV4KSwgLTEpOyB9LFxyXG4gICAgICAgICAgICBjbG9zZShfc3RhdGU6IE1hcmtkb3duU2VyaWFsaXplclN0YXRlLCBfbWFyazogTWFyaywgcGFyZW50OiBOb2RlLCBpbmRleDogbnVtYmVyKSB7IHJldHVybiBiYWNrdGlja3NGb3IocGFyZW50LmNoaWxkKGluZGV4IC0gMSksIDEpOyB9LFxyXG4gICAgICAgICAgICBlc2NhcGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IHsgTWFyaywgTm9kZSB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG5cclxuLy8gOjotIFRoaXMgaXMgYW4gb2JqZWN0IHVzZWQgdG8gdHJhY2sgc3RhdGUgYW5kIGV4cG9zZVxyXG4vLyBtZXRob2RzIHJlbGF0ZWQgdG8gbWFya2Rvd24gc2VyaWFsaXphdGlvbi4gSW5zdGFuY2VzIGFyZSBwYXNzZWQgdG9cclxuLy8gbm9kZSBhbmQgbWFyayBzZXJpYWxpemF0aW9uIG1ldGhvZHMgKHNlZSBgdG9NYXJrZG93bmApLlxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25TZXJpYWxpemVyU3RhdGUge1xyXG4gICAgbWFya3M6IGFueTtcclxuICAgIG91dDogYW55O1xyXG4gICAgbm9kZXM6IGFueTtcclxuICAgIGRlbGltOiBzdHJpbmc7XHJcbiAgICBjbG9zZWQ6IGZhbHNlIHwgTm9kZTtcclxuICAgIGluVGlnaHRMaXN0OiBib29sZWFuO1xyXG4gICAgb3B0aW9uczogYW55O1xyXG4gICAgY29uc3RydWN0b3Iobm9kZXM6IGFueSwgbWFya3M6IGFueSwgb3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG4gICAgICAgIHRoaXMubWFya3MgPSBtYXJrcztcclxuICAgICAgICB0aGlzLmRlbGltID0gdGhpcy5vdXQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pblRpZ2h0TGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIDo6IE9iamVjdFxyXG4gICAgICAgIC8vIFRoZSBvcHRpb25zIHBhc3NlZCB0byB0aGUgc2VyaWFsaXplci5cclxuICAgICAgICAvLyAgIHRpZ2h0TGlzdHM6OiA/Ym9vbFxyXG4gICAgICAgIC8vICAgV2hldGhlciB0byByZW5kZXIgbGlzdHMgaW4gYSB0aWdodCBzdHlsZS4gVGhpcyBjYW4gYmUgb3ZlcnJpZGRlblxyXG4gICAgICAgIC8vICAgb24gYSBub2RlIGxldmVsIGJ5IHNwZWNpZnlpbmcgYSB0aWdodCBhdHRyaWJ1dGUgb24gdGhlIG5vZGUuXHJcbiAgICAgICAgLy8gICBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnRpZ2h0TGlzdHMgPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnRpZ2h0TGlzdHMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmbHVzaENsb3NlKHNpemU/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmF0QmxhbmsoKSkgdGhpcy5vdXQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgaWYgKHNpemUgPT0gbnVsbCkgc2l6ZSA9IDI7XHJcbiAgICAgICAgICAgIGlmIChzaXplID4gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGltTWluID0gdGhpcy5kZWxpbTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyaW0gPSAvXFxzKyQvLmV4ZWMoZGVsaW1NaW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaW0pIGRlbGltTWluID0gZGVsaW1NaW4uc2xpY2UoMCwgZGVsaW1NaW4ubGVuZ3RoIC0gdHJpbVswXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaXplOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXQgKz0gZGVsaW1NaW4gKyBcIlxcblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDo6IChzdHJpbmcsID9zdHJpbmcsIE5vZGUsICgpKVxyXG4gICAgLy8gUmVuZGVyIGEgYmxvY2ssIHByZWZpeGluZyBlYWNoIGxpbmUgd2l0aCBgZGVsaW1gLCBhbmQgdGhlIGZpcnN0XHJcbiAgICAvLyBsaW5lIGluIGBmaXJzdERlbGltYC4gYG5vZGVgIHNob3VsZCBiZSB0aGUgbm9kZSB0aGF0IGlzIGNsb3NlZCBhdFxyXG4gICAgLy8gdGhlIGVuZCBvZiB0aGUgYmxvY2ssIGFuZCBgZmAgaXMgYSBmdW5jdGlvbiB0aGF0IHJlbmRlcnMgdGhlXHJcbiAgICAvLyBjb250ZW50IG9mIHRoZSBibG9jay5cclxuICAgIHdyYXBCbG9jayhkZWxpbTogc3RyaW5nLCBmaXJzdERlbGltOiBzdHJpbmcgfCBudWxsLCBub2RlOiBOb2RlLCBmOiAoKSA9PiBhbnkpIHtcclxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRlbGltO1xyXG4gICAgICAgIHRoaXMud3JpdGUoZmlyc3REZWxpbSB8fCBkZWxpbSk7XHJcbiAgICAgICAgdGhpcy5kZWxpbSArPSBkZWxpbTtcclxuICAgICAgICBmKCk7XHJcbiAgICAgICAgdGhpcy5kZWxpbSA9IG9sZDtcclxuICAgICAgICB0aGlzLmNsb3NlQmxvY2sobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXRCbGFuaygpIHtcclxuICAgICAgICByZXR1cm4gLyhefFxcbikkLy50ZXN0KHRoaXMub3V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoKVxyXG4gICAgLy8gRW5zdXJlIHRoZSBjdXJyZW50IGNvbnRlbnQgZW5kcyB3aXRoIGEgbmV3bGluZS5cclxuICAgIGVuc3VyZU5ld0xpbmUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF0QmxhbmsoKSkgdGhpcy5vdXQgKz0gXCJcXG5cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoP3N0cmluZylcclxuICAgIC8vIFByZXBhcmUgdGhlIHN0YXRlIGZvciB3cml0aW5nIG91dHB1dCAoY2xvc2luZyBjbG9zZWQgcGFyYWdyYXBocyxcclxuICAgIC8vIGFkZGluZyBkZWxpbWl0ZXJzLCBhbmQgc28gb24pLCBhbmQgdGhlbiBvcHRpb25hbGx5IGFkZCBjb250ZW50XHJcbiAgICAvLyAodW5lc2NhcGVkKSB0byB0aGUgb3V0cHV0LlxyXG4gICAgd3JpdGUoY29udGVudD86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZmx1c2hDbG9zZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlbGltICYmIHRoaXMuYXRCbGFuaygpKVxyXG4gICAgICAgICAgICB0aGlzLm91dCArPSB0aGlzLmRlbGltO1xyXG4gICAgICAgIGlmIChjb250ZW50KSB0aGlzLm91dCArPSBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDo6IChOb2RlKVxyXG4gICAgLy8gQ2xvc2UgdGhlIGJsb2NrIGZvciB0aGUgZ2l2ZW4gbm9kZS5cclxuICAgIGNsb3NlQmxvY2sobm9kZTogTm9kZSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VkID0gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoc3RyaW5nLCA/Ym9vbClcclxuICAgIC8vIEFkZCB0aGUgZ2l2ZW4gdGV4dCB0byB0aGUgZG9jdW1lbnQuIFdoZW4gZXNjYXBlIGlzIG5vdCBgZmFsc2VgLFxyXG4gICAgLy8gaXQgd2lsbCBiZSBlc2NhcGVkLlxyXG4gICAgdGV4dCh0ZXh0OiBzdHJpbmcsIGVzY2FwZT86IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBsaW5lcyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydE9mTGluZSA9IHRoaXMuYXRCbGFuaygpIHx8IHRoaXMuY2xvc2VkO1xyXG4gICAgICAgICAgICB0aGlzLndyaXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0ICs9IGVzY2FwZSAhPT0gZmFsc2UgPyB0aGlzLmVzYyhsaW5lc1tpXSwgISFzdGFydE9mTGluZSkgOiBsaW5lc1tpXTtcclxuICAgICAgICAgICAgaWYgKGkgIT0gbGluZXMubGVuZ3RoIC0gMSkgdGhpcy5vdXQgKz0gXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gOjogKE5vZGUpXHJcbiAgICAvLyBSZW5kZXIgdGhlIGdpdmVuIG5vZGUgYXMgYSBibG9jay5cclxuICAgIHJlbmRlcihub2RlOiBOb2RlLCBwYXJlbnQ6IE5vZGUgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBhcmVudCA9PSBcIm51bWJlclwiKSB0aHJvdyBuZXcgRXJyb3IoXCIhXCIpO1xyXG4gICAgICAgIGlmICghdGhpcy5ub2Rlc1tub2RlLnR5cGUubmFtZV0pIHRocm93IG5ldyBFcnJvcihcIlRva2VuIHR5cGUgYFwiICsgbm9kZS50eXBlLm5hbWUgKyBcImAgbm90IHN1cHBvcnRlZCBieSBNYXJrZG93biByZW5kZXJlclwiKTtcclxuICAgICAgICB0aGlzLm5vZGVzW25vZGUudHlwZS5uYW1lXSh0aGlzLCBub2RlLCBwYXJlbnQsIGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoTm9kZSlcclxuICAgIC8vIFJlbmRlciB0aGUgY29udGVudHMgb2YgYHBhcmVudGAgYXMgYmxvY2sgbm9kZXMuXHJcbiAgICByZW5kZXJDb250ZW50KHBhcmVudDogTm9kZSkge1xyXG4gICAgICAgIHBhcmVudC5mb3JFYWNoKChub2RlLCBfLCBpKSA9PiB0aGlzLnJlbmRlcihub2RlLCBwYXJlbnQsIGkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoTm9kZSlcclxuICAgIC8vIFJlbmRlciB0aGUgY29udGVudHMgb2YgYHBhcmVudGAgYXMgaW5saW5lIGNvbnRlbnQuXHJcbiAgICByZW5kZXJJbmxpbmUocGFyZW50OiBOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlOiBNYXJrPGFueT5bXSA9IFtdO1xyXG4gICAgICAgIGxldCB0cmFpbGluZyA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAobm9kZTogTm9kZSB8IG51bGwsIF86IG51bWJlciB8IG51bGwsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hcmtzID0gbm9kZSA/IG5vZGUubWFya3MgOiBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBtYXJrcyBmcm9tIGBoYXJkX2JyZWFrYCB0aGF0IGFyZSB0aGUgbGFzdCBub2RlIGluc2lkZVxyXG4gICAgICAgICAgICAvLyB0aGF0IG1hcmsgdG8gcHJldmVudCBwYXJzZXIgZWRnZSBjYXNlcyB3aXRoIG5ldyBsaW5lcyBqdXN0XHJcbiAgICAgICAgICAgIC8vIGJlZm9yZSBjbG9zaW5nIG1hcmtzLlxyXG4gICAgICAgICAgICAvLyAoRklYTUUgaXQnZCBiZSBuaWNlIGlmIHdlIGhhZCBhIHNjaGVtYS1hZ25vc3RpYyB3YXkgdG9cclxuICAgICAgICAgICAgLy8gaWRlbnRpZnkgbm9kZXMgdGhhdCBzZXJpYWxpemUgYXMgaGFyZCBicmVha3MpXHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUudHlwZS5uYW1lID09PSBcImhhcmRfYnJlYWtcIilcclxuICAgICAgICAgICAgICAgIG1hcmtzID0gbWFya3MuZmlsdGVyKG0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCArIDEgPT0gcGFyZW50LmNoaWxkQ291bnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcGFyZW50LmNoaWxkKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0uaXNJblNldChuZXh0Lm1hcmtzKSAmJiAoIW5leHQuaXNUZXh0IHx8IC9cXFMvLnRlc3QobmV4dC50ZXh0ISkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVhZGluZyA9IHRyYWlsaW5nO1xyXG4gICAgICAgICAgICB0cmFpbGluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vIElmIHdoaXRlc3BhY2UgaGFzIHRvIGJlIGV4cGVsbGVkIGZyb20gdGhlIG5vZGUsIGFkanVzdFxyXG4gICAgICAgICAgICAvLyBsZWFkaW5nIGFuZCB0cmFpbGluZyBhY2NvcmRpbmdseS5cclxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5pc1RleHQgJiYgbWFya3Muc29tZShtYXJrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLm1hcmtzW21hcmsudHlwZS5uYW1lXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvICYmIGluZm8uZXhwZWxFbmNsb3NpbmdXaGl0ZXNwYWNlO1xyXG4gICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW18sIGxlYWQsIGlubmVyLCB0cmFpbF0gPSAvXihcXHMqKSguKj8pKFxccyopJC9tLmV4ZWMobm9kZS50ZXh0ISkgYXMgUmVnRXhwRXhlY0FycmF5O1xyXG4gICAgICAgICAgICAgICAgbGVhZGluZyArPSBsZWFkO1xyXG4gICAgICAgICAgICAgICAgdHJhaWxpbmcgPSB0cmFpbDtcclxuICAgICAgICAgICAgICAgIGlmIChsZWFkIHx8IHRyYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGlubmVyID8gKG5vZGUgYXMgYW55KS53aXRoVGV4dChpbm5lcikgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZSkgbWFya3MgPSBhY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlubmVyID0gKG1hcmtzLmxlbmd0aCAmJiBtYXJrc1ttYXJrcy5sZW5ndGggLSAxXSkgYXMgTWFyazxhbnk+O1xyXG4gICAgICAgICAgICBjb25zdCBub0VzYyA9IGlubmVyICYmIHRoaXMubWFya3NbaW5uZXIudHlwZS5uYW1lXS5lc2NhcGUgPT09IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4gPSBtYXJrcy5sZW5ndGggLSAobm9Fc2MgPyAxIDogMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gcmVvcmRlciAnbWl4YWJsZScgbWFya3MsIHN1Y2ggYXMgZW0gYW5kIHN0cm9uZywgd2hpY2hcclxuICAgICAgICAgICAgLy8gaW4gTWFya2Rvd24gbWF5IGJlIG9wZW5lZCBhbmQgY2xvc2VkIGluIGRpZmZlcmVudCBvcmRlciwgc29cclxuICAgICAgICAgICAgLy8gdGhhdCBvcmRlciBvZiB0aGUgbWFya3MgZm9yIHRoZSB0b2tlbiBtYXRjaGVzIHRoZSBvcmRlciBpblxyXG4gICAgICAgICAgICAvLyBhY3RpdmUuXHJcbiAgICAgICAgICAgIG91dGVyOiBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrID0gbWFya3NbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWFya3NbbWFyay50eXBlLm5hbWVdLm1peGFibGUpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlciA9IGFjdGl2ZVtqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWFya3Nbb3RoZXIudHlwZS5uYW1lXS5taXhhYmxlKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFyay5lcShvdGhlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya3MgPSBtYXJrcy5zbGljZSgwLCBqKS5jb25jYXQobWFyaykuY29uY2F0KG1hcmtzLnNsaWNlKGosIGkpKS5jb25jYXQobWFya3Muc2xpY2UoaSArIDEsIGxlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChqID4gaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtzID0gbWFya3Muc2xpY2UoMCwgaSkuY29uY2F0KG1hcmtzLnNsaWNlKGkgKyAxLCBqKSkuY29uY2F0KG1hcmspLmNvbmNhdChtYXJrcy5zbGljZShqLCBsZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBwcmVmaXggb2YgdGhlIG1hcmsgc2V0IHRoYXQgZGlkbid0IGNoYW5nZVxyXG4gICAgICAgICAgICBsZXQga2VlcCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChrZWVwIDwgTWF0aC5taW4oYWN0aXZlLmxlbmd0aCwgbGVuKSAmJiBtYXJrc1trZWVwXS5lcShhY3RpdmVba2VlcF0pKSArK2tlZXA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgbWFya3MgdGhhdCBuZWVkIHRvIGJlIGNsb3NlZFxyXG4gICAgICAgICAgICB3aGlsZSAoa2VlcCA8IGFjdGl2ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQodGhpcy5tYXJrU3RyaW5nKGFjdGl2ZS5wb3AoKSEsIGZhbHNlLCBwYXJlbnQsIGluZGV4KSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gT3V0cHV0IGFueSBwcmV2aW91c2x5IGV4cGVsbGVkIHRyYWlsaW5nIHdoaXRlc3BhY2Ugb3V0c2lkZSB0aGUgbWFya3NcclxuICAgICAgICAgICAgaWYgKGxlYWRpbmcpIHRoaXMudGV4dChsZWFkaW5nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIG1hcmtzIHRoYXQgbmVlZCB0byBiZSBvcGVuZWRcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChhY3RpdmUubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkID0gbWFya3NbYWN0aXZlLmxlbmd0aF07XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlLnB1c2goYWRkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQodGhpcy5tYXJrU3RyaW5nKGFkZCwgdHJ1ZSwgcGFyZW50LCBpbmRleCksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIG5vZGUuIFNwZWNpYWwgY2FzZSBjb2RlIG1hcmtzLCBzaW5jZSB0aGVpciBjb250ZW50XHJcbiAgICAgICAgICAgICAgICAvLyBtYXkgbm90IGJlIGVzY2FwZWQuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9Fc2MgJiYgbm9kZS5pc1RleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0KHRoaXMubWFya1N0cmluZyhpbm5lciwgdHJ1ZSwgcGFyZW50LCBpbmRleCkgKyBub2RlLnRleHQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtTdHJpbmcoaW5uZXIsIGZhbHNlLCBwYXJlbnQsIGluZGV4ICsgMSksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihub2RlLCBwYXJlbnQsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyZW50LmZvckVhY2gocHJvZ3Jlc3MpO1xyXG4gICAgICAgIHByb2dyZXNzKG51bGwsIG51bGwsIHBhcmVudC5jaGlsZENvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA6OiAoTm9kZSwgc3RyaW5nLCAobnVtYmVyKSDihpIgc3RyaW5nKVxyXG4gICAgLy8gUmVuZGVyIGEgbm9kZSdzIGNvbnRlbnQgYXMgYSBsaXN0LiBgZGVsaW1gIHNob3VsZCBiZSB0aGUgZXh0cmFcclxuICAgIC8vIGluZGVudGF0aW9uIGFkZGVkIHRvIGFsbCBsaW5lcyBleGNlcHQgdGhlIGZpcnN0IGluIGFuIGl0ZW0sXHJcbiAgICAvLyBgZmlyc3REZWxpbWAgaXMgYSBmdW5jdGlvbiBnb2luZyBmcm9tIGFuIGl0ZW0gaW5kZXggdG8gYVxyXG4gICAgLy8gZGVsaW1pdGVyIGZvciB0aGUgZmlyc3QgbGluZSBvZiB0aGUgaXRlbS5cclxuICAgIHJlbmRlckxpc3Qobm9kZTogTm9kZSwgZGVsaW06IHN0cmluZywgZmlyc3REZWxpbTogKG46IG51bWJlcikgPT4gc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkICYmIHRoaXMuY2xvc2VkLnR5cGUgPT0gbm9kZS50eXBlKVxyXG4gICAgICAgICAgICB0aGlzLmZsdXNoQ2xvc2UoMyk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pblRpZ2h0TGlzdClcclxuICAgICAgICAgICAgdGhpcy5mbHVzaENsb3NlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBpc1RpZ2h0ID0gdHlwZW9mIG5vZGUuYXR0cnMudGlnaHQgIT0gXCJ1bmRlZmluZWRcIiA/IG5vZGUuYXR0cnMudGlnaHQgOiB0aGlzLm9wdGlvbnMudGlnaHRMaXN0cztcclxuICAgICAgICBjb25zdCBwcmV2VGlnaHQgPSB0aGlzLmluVGlnaHRMaXN0O1xyXG4gICAgICAgIHRoaXMuaW5UaWdodExpc3QgPSBpc1RpZ2h0O1xyXG4gICAgICAgIG5vZGUuZm9yRWFjaCgoY2hpbGQsIF8sIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGkgJiYgaXNUaWdodCkgdGhpcy5mbHVzaENsb3NlKDEpO1xyXG4gICAgICAgICAgICB0aGlzLndyYXBCbG9jayhkZWxpbSwgZmlyc3REZWxpbShpKSwgbm9kZSwgKCkgPT4gdGhpcy5yZW5kZXIoY2hpbGQsIG5vZGUsIGkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmluVGlnaHRMaXN0ID0gcHJldlRpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDo6IChzdHJpbmcsID9ib29sKSDihpIgc3RyaW5nXHJcbiAgICAvLyBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBzbyB0aGF0IGl0IGNhbiBzYWZlbHkgYXBwZWFyIGluIE1hcmtkb3duXHJcbiAgICAvLyBjb250ZW50LiBJZiBgc3RhcnRPZkxpbmVgIGlzIHRydWUsIGFsc28gZXNjYXBlIGNoYXJhY3RlcnMgdGhhdFxyXG4gICAgLy8gaGF2ZSBzcGVjaWFsIG1lYW5pbmcgb25seSBhdCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUuXHJcbiAgICBlc2Moc3RyOiBzdHJpbmcsIHN0YXJ0T2ZMaW5lPzogYm9vbGVhbikge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9bYCpcXFxcflxcW1xcXV0vZywgXCJcXFxcJCZcIik7XHJcbiAgICAgICAgaWYgKHN0YXJ0T2ZMaW5lKSBzdHIgPSBzdHIucmVwbGFjZSgvXls6I1xcLSorXS8sIFwiXFxcXCQmXCIpLnJlcGxhY2UoL14oXFxzKlxcZCspXFwuLywgXCIkMVxcXFwuXCIpO1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgcXVvdGUoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB3cmFwID0gc3RyLmluZGV4T2YoJ1wiJykgPT0gLTEgPyAnXCJcIicgOiBzdHIuaW5kZXhPZihcIidcIikgPT0gLTEgPyBcIicnXCIgOiBcIigpXCI7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBbMF0gKyBzdHIgKyB3cmFwWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDo6IChzdHJpbmcsIG51bWJlcikg4oaSIHN0cmluZ1xyXG4gICAgLy8gUmVwZWF0IHRoZSBnaXZlbiBzdHJpbmcgYG5gIHRpbWVzLlxyXG4gICAgcmVwZWF0KHN0cjogc3RyaW5nLCBuOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb3V0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgb3V0ICs9IHN0cjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDogKE1hcmssIGJvb2wsIHN0cmluZz8pIOKGkiBzdHJpbmdcclxuICAgIC8vIEdldCB0aGUgbWFya2Rvd24gc3RyaW5nIGZvciBhIGdpdmVuIG9wZW5pbmcgb3IgY2xvc2luZyBtYXJrLlxyXG4gICAgbWFya1N0cmluZyhtYXJrOiBNYXJrLCBvcGVuOiBib29sZWFuLCBwYXJlbnQ6IHVua25vd24sIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5tYXJrc1ttYXJrLnR5cGUubmFtZV07XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcGVuID8gaW5mby5vcGVuIDogaW5mby5jbG9zZTtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgPyB2YWx1ZSA6IHZhbHVlKHRoaXMsIG1hcmssIHBhcmVudCwgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDo6IChzdHJpbmcpIOKGkiB7IGxlYWRpbmc6ID9zdHJpbmcsIHRyYWlsaW5nOiA/c3RyaW5nIH1cclxuICAgIC8vIEdldCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlIGZyb20gYSBzdHJpbmcuIFZhbHVlcyBvZlxyXG4gICAgLy8gbGVhZGluZyBvciB0cmFpbGluZyBwcm9wZXJ0eSBvZiB0aGUgcmV0dXJuIG9iamVjdCB3aWxsIGJlIHVuZGVmaW5lZFxyXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbWF0Y2guXHJcbiAgICBnZXRFbmNsb3NpbmdXaGl0ZXNwYWNlKHRleHQ6IHN0cmluZyk6IHsgbGVhZGluZz86IHN0cmluZzsgdHJhaWxpbmc/OiBzdHJpbmcgfSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVhZGluZzogKHRleHQubWF0Y2goL14oXFxzKykvKSB8fCBbXSlbMF0sXHJcbiAgICAgICAgICAgIHRyYWlsaW5nOiAodGV4dC5tYXRjaCgvKFxccyspJC8pIHx8IFtdKVswXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIEF1dGhvcjogQmVuamFtaW4gUi4gQnJheVxyXG4gKiAgTGljZW5zZTogTUlUIChzZWUgTElDRU5TRSBpbiBwcm9qZWN0IHJvb3QgZm9yIGRldGFpbHMpXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLy8gUHJvc2VNaXJyb3IgaW1wb3J0c1xyXG5pbXBvcnQgeyBFZGl0b3JTdGF0ZSwgVHJhbnNhY3Rpb24sIE5vZGVTZWxlY3Rpb24sIFBsdWdpbn0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XHJcblxyXG5cclxuLy8gcHJvamVjdCBpbXBvcnRzXHJcbmltcG9ydCBtYXRoU2VsZWN0UGx1Z2luIGZyb20gXCIuL3BsdWdpbnMvc2VsZWN0XCI7XHJcbmltcG9ydCB7IGJ1aWxkTWF0aElucHV0UnVsZXMgfSBmcm9tIFwiLi9wbHVnaW5zL2lucHV0cnVsZXNcIjtcclxuaW1wb3J0IHsgbWF0aFBsdWdpbiwgY3JlYXRlTWF0aFZpZXcgfSBmcm9tIFwiLi9wbHVnaW5cIjtcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRoUGx1Z2lucyhzY2hlbWE6IFNjaGVtYSk6IFBsdWdpbjxhbnksIGFueT5bXSB7XHJcblx0cmV0dXJuIFtcclxuXHRcdG1hdGhQbHVnaW4sXHJcblx0XHRtYXRoU2VsZWN0UGx1Z2luLFxyXG5cdFx0YnVpbGRNYXRoSW5wdXRSdWxlcyhzY2hlbWEpLFxyXG5cdF07XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZU1hdGhWaWV3IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0TWF0aChzY2hlbWE6IFNjaGVtYSl7XHJcblx0Y29uc3QgbWF0aFR5cGUgPSBzY2hlbWEubm9kZXMuaW5saW5lbWF0aDtcclxuXHRyZXR1cm4gZnVuY3Rpb24oc3RhdGU6RWRpdG9yU3RhdGUsIGRpc3BhdGNoOigodHI6VHJhbnNhY3Rpb24pPT52b2lkKXx1bmRlZmluZWQpe1xyXG5cdFx0Y29uc3QgeyAkZnJvbSB9ID0gc3RhdGUuc2VsZWN0aW9uLCBpbmRleCA9ICRmcm9tLmluZGV4KCk7XHJcblx0XHRpZiAoISRmcm9tLnBhcmVudC5jYW5SZXBsYWNlV2l0aChpbmRleCwgaW5kZXgsIG1hdGhUeXBlKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoZGlzcGF0Y2gpe1xyXG5cdFx0XHRsZXQgdHIgPSBzdGF0ZS50ci5yZXBsYWNlU2VsZWN0aW9uV2l0aChtYXRoVHlwZS5jcmVhdGUoe30pKTtcclxuXHRcdFx0dHIgPSB0ci5zZXRTZWxlY3Rpb24oTm9kZVNlbGVjdGlvbi5jcmVhdGUodHIuZG9jLCAkZnJvbS5wb3MpKTtcclxuXHRcdFx0ZGlzcGF0Y2godHIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fTtcclxufSIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbmltcG9ydCB7IE5vZGUgYXMgUHJvc2VOb2RlIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcbmltcG9ydCB7IEVkaXRvclN0YXRlLCBUcmFuc2FjdGlvbiwgVGV4dFNlbGVjdGlvbiB9IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBOb2RlVmlldywgRWRpdG9yVmlldywgRGVjb3JhdGlvbiB9IGZyb20gXCJwcm9zZW1pcnJvci12aWV3XCI7XHJcbmltcG9ydCB7IFN0ZXBNYXAgfSBmcm9tIFwicHJvc2VtaXJyb3ItdHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IGtleW1hcCB9IGZyb20gXCJwcm9zZW1pcnJvci1rZXltYXBcIjtcclxuaW1wb3J0IHsgbmV3bGluZUluQ29kZSwgY2hhaW5Db21tYW5kcywgZGVsZXRlU2VsZWN0aW9uIH0gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XHJcblxyXG4vLyBrYXRleFxyXG5pbXBvcnQgeyBLYXRleE9wdGlvbnMsIFBhcnNlRXJyb3IgfSBmcm9tIFwia2F0ZXhcIjtcclxuaW1wb3J0IHsga2F0ZXhMb2FkZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGVscGVycy9rYXRleFwiO1xyXG5cclxuY29uc3Qga2F0ZXggPSBrYXRleExvYWRlcigpO1xyXG5cclxuLy8vLyBJTkxJTkUgTUFUSCBOT0RFVklFVyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDdXJzb3JQb3NPYnNlcnZlciB7XHJcbiAgICAvKiogaW5kaWNhdGVzIG9uIHdoaWNoIHNpZGUgY3Vyc29yIHNob3VsZCBhcHBlYXIgd2hlbiB0aGlzIG5vZGUgaXMgc2VsZWN0ZWQgKi9cclxuICAgIGN1cnNvclNpZGU6IFwic3RhcnRcIiB8IFwiZW5kXCI7XHJcbiAgICAvKiogICovXHJcbiAgICB1cGRhdGVDdXJzb3JQb3Moc3RhdGU6IEVkaXRvclN0YXRlKTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIElNYXRoVmlld09wdGlvbnMge1xyXG4gICAgLyoqIERvbSBlbGVtZW50IG5hbWUgdG8gdXNlIGZvciB0aGlzIE5vZGVWaWV3ICovXHJcbiAgICB0YWdOYW1lPzogc3RyaW5nO1xyXG4gICAgLyoqIFdoZXRoZXIgdG8gcmVuZGVyIHRoaXMgbm9kZSBhcyBkaXNwbGF5IG9yIGlubGluZSBtYXRoLiAqL1xyXG4gICAga2F0ZXhPcHRpb25zPzogS2F0ZXhPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0aFZpZXcgaW1wbGVtZW50cyBOb2RlVmlldywgSUN1cnNvclBvc09ic2VydmVyIHtcclxuXHJcbiAgICAvLyBub2RldmlldyBwYXJhbXNcclxuICAgIHByaXZhdGUgX25vZGU6IFByb3NlTm9kZTtcclxuICAgIHByaXZhdGUgX291dGVyVmlldzogRWRpdG9yVmlldztcclxuICAgIHByaXZhdGUgX2dldFBvczogKCgpID0+IG51bWJlcik7XHJcblxyXG4gICAgLy8gbm9kZXZpZXcgZG9tXHJcbiAgICBkb20/OiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgX21hdGhSZW5kZXJFbHQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBfbWF0aFNyY0VsdDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9pbm5lclZpZXc6IEVkaXRvclZpZXcgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLy8gaW50ZXJuYWwgc3RhdGVcclxuICAgIGN1cnNvclNpZGU6IFwic3RhcnRcIiB8IFwiZW5kXCI7XHJcbiAgICBwcml2YXRlIF9rYXRleE9wdGlvbnM6IEthdGV4T3B0aW9ucztcclxuICAgIHByaXZhdGUgX3RhZ05hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2lzRWRpdGluZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8vID09IExpZmVjeWNsZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb25EZXN0cm95IENhbGxiYWNrIGZvciB3aGVuIHRoaXMgTm9kZVZpZXcgaXMgZGVzdHJveWVkLlxyXG4gICAgICogICAgIFRoaXMgTm9kZVZpZXcgc2hvdWxkIHVucmVnaXN0ZXIgaXRzZWxmIGZyb20gdGhlIGxpc3Qgb2YgSUN1cnNvclBvc09ic2VydmVycy5cclxuICAgICAqXHJcbiAgICAgKiBNYXRoIFZpZXdzIHN1cHBvcnQgdGhlIGZvbGxvd2luZyBvcHRpb25zOlxyXG4gICAgICogQG9wdGlvbiBkaXNwbGF5TW9kZSBJZiBUUlVFLCB3aWxsIHJlbmRlciBtYXRoIGluIGRpc3BsYXkgbW9kZSwgb3RoZXJ3aXNlIGluIGlubGluZSBtb2RlLlxyXG4gICAgICogQG9wdGlvbiB0YWdOYW1lIEhUTUwgdGFnIG5hbWUgdG8gdXNlIGZvciB0aGlzIE5vZGVWaWV3LiAgSWYgbm9uZSBpcyBwcm92aWRlZCxcclxuICAgICAqICAgICB3aWxsIHVzZSB0aGUgbm9kZSBuYW1lIHdpdGggdW5kZXJzY29yZXMgY29udmVydGVkIHRvIGh5cGhlbnMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IFByb3NlTm9kZSwgdmlldzogRWRpdG9yVmlldywgZ2V0UG9zOiAoKCkgPT4gbnVtYmVyKSwgb3B0aW9uczogSU1hdGhWaWV3T3B0aW9ucyA9IHt9LCBvbkRlc3Ryb3k/OiAoKCkgPT4gdm9pZCkpIHtcclxuICAgICAgICAvLyBzdG9yZSBhcmd1bWVudHNcclxuICAgICAgICB0aGlzLl9ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLl9vdXRlclZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMuX2dldFBvcyA9IGdldFBvcztcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kgPSBvbkRlc3Ryb3kgJiYgb25EZXN0cm95LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGVkaXRpbmcgc3RhdGVcclxuICAgICAgICB0aGlzLmN1cnNvclNpZGUgPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgdGhpcy5faXNFZGl0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICB0aGlzLl9rYXRleE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgZ2xvYmFsR3JvdXA6IHRydWUsIHRocm93T25FcnJvcjogZmFsc2UgfSwgb3B0aW9ucy5rYXRleE9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuX3RhZ05hbWUgPSBvcHRpb25zLnRhZ05hbWUgfHwgdGhpcy5fbm9kZS50eXBlLm5hbWUucmVwbGFjZShcIl9cIiwgXCItXCIpO1xyXG5cclxuICAgICAgICAvLyBjcmVhdGUgZG9tIHJlcHJlc2VudGF0aW9uIG9mIG5vZGV2aWV3XHJcbiAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuX3RhZ05hbWUpO1xyXG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoXCJtYXRoLW5vZGVcIik7XHJcblxyXG4gICAgICAgIHRoaXMuX21hdGhSZW5kZXJFbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICB0aGlzLl9tYXRoUmVuZGVyRWx0LnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9tYXRoUmVuZGVyRWx0LmNsYXNzTGlzdC5hZGQoXCJtYXRoLXJlbmRlclwiKTtcclxuICAgICAgICB0aGlzLmRvbS5hcHBlbmRDaGlsZCh0aGlzLl9tYXRoUmVuZGVyRWx0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWF0aFNyY0VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIHRoaXMuX21hdGhTcmNFbHQuY2xhc3NMaXN0LmFkZChcIm1hdGgtc3JjXCIpO1xyXG4gICAgICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKHRoaXMuX21hdGhTcmNFbHQpO1xyXG5cclxuICAgICAgICAvLyBlbnN1cmVcclxuICAgICAgICB0aGlzLmRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5lbnN1cmVGb2N1cygpKTtcclxuXHJcbiAgICAgICAgLy8gcmVuZGVyIGluaXRpYWwgY29udGVudFxyXG4gICAgICAgIHRoaXMucmVuZGVyTWF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy8gY2xvc2UgdGhlIGlubmVyIGVkaXRvciB3aXRob3V0IHJlbmRlcmluZ1xyXG4gICAgICAgIHRoaXMuY2xvc2VFZGl0b3IoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBjbGVhbiB1cCBkb20gZWxlbWVudHNcclxuICAgICAgICBpZiAodGhpcy5fbWF0aFJlbmRlckVsdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRoUmVuZGVyRWx0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbWF0aFJlbmRlckVsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hdGhTcmNFbHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF0aFNyY0VsdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX21hdGhTcmNFbHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuc3VyZSBmb2N1cyBvbiB0aGUgaW5uZXIgZWRpdG9yIHdoZW5ldmVyIHRoaXMgbm9kZSBoYXMgZm9jdXMuXHJcbiAgICAgKiBUaGlzIGhlbHBzIHRvIHByZXZlbnQgYWNjaWRlbnRhbCBkZWxldGlvbnMgb2YgbWF0aCBibG9ja3MuXHJcbiAgICAgKi9cclxuICAgIGVuc3VyZUZvY3VzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbm5lclZpZXcgJiYgdGhpcy5fb3V0ZXJWaWV3Lmhhc0ZvY3VzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJWaWV3LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09IFVwZGF0ZXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXHJcblxyXG4gICAgdXBkYXRlKG5vZGU6IFByb3NlTm9kZSwgZGVjb3JhdGlvbnM6IERlY29yYXRpb25bXSkge1xyXG4gICAgICAgIGlmICghbm9kZS5zYW1lTWFya3VwKHRoaXMuX25vZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbm9kZSA9IG5vZGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pbm5lclZpZXcpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9pbm5lclZpZXcuc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IG5vZGUuY29udGVudC5maW5kRGlmZlN0YXJ0KHN0YXRlLmRvYy5jb250ZW50KTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBub2RlLmNvbnRlbnQuZmluZERpZmZFbmQoc3RhdGUuZG9jLmNvbnRlbnQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIGlmIChkaWZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgYTogZW5kQSwgYjogZW5kQiB9ID0gZGlmZjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdmVybGFwID0gc3RhcnQgLSBNYXRoLm1pbihlbmRBLCBlbmRCKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcmxhcCA+IDApIHsgZW5kQSArPSBvdmVybGFwOyBlbmRCICs9IG92ZXJsYXA7IH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbm5lclZpZXcuZGlzcGF0Y2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnRyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShzdGFydCwgZW5kQiwgbm9kZS5zbGljZShzdGFydCwgZW5kQSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0TWV0YShcImZyb21PdXRzaWRlXCIsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJNYXRoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDdXJzb3JQb3Moc3RhdGU6IEVkaXRvclN0YXRlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5fZ2V0UG9zKCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX25vZGUubm9kZVNpemU7XHJcbiAgICAgICAgY29uc3QgaW5QbVNlbGVjdGlvbiA9XHJcbiAgICAgICAgICAgIChzdGF0ZS5zZWxlY3Rpb24uZnJvbSA8IHBvcyArIHNpemUpXHJcbiAgICAgICAgICAgICYmIChwb3MgPCBzdGF0ZS5zZWxlY3Rpb24udG8pO1xyXG5cclxuICAgICAgICBpZiAoIWluUG1TZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJzb3JTaWRlID0gKHBvcyA8IHN0YXRlLnNlbGVjdGlvbi5mcm9tKSA/IFwiZW5kXCIgOiBcInN0YXJ0XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09IEV2ZW50cyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXHJcblxyXG4gICAgc2VsZWN0Tm9kZSgpIHtcclxuICAgICAgICB0aGlzLmRvbSEuY2xhc3NMaXN0LmFkZChcIlByb3NlTWlycm9yLXNlbGVjdGVkbm9kZVwiKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzRWRpdGluZykgeyB0aGlzLm9wZW5FZGl0b3IoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc2VsZWN0Tm9kZSgpIHtcclxuICAgICAgICB0aGlzLmRvbSEuY2xhc3NMaXN0LnJlbW92ZShcIlByb3NlTWlycm9yLXNlbGVjdGVkbm9kZVwiKTtcclxuICAgICAgICBpZiAodGhpcy5faXNFZGl0aW5nKSB7IHRoaXMuY2xvc2VFZGl0b3IoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0b3BFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2lubmVyVmlldyAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAmJiAoZXZlbnQudGFyZ2V0ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICYmIHRoaXMuX2lubmVyVmlldy5kb20uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlnbm9yZU11dGF0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIC8vID09IFJlbmRlcmluZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXHJcblxyXG4gICAgcmVuZGVyTWF0aCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21hdGhSZW5kZXJFbHQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIGdldCB0ZXggc3RyaW5nIHRvIHJlbmRlclxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAodGhpcy5fbm9kZS5jb250ZW50IGFzIGFueSkuY29udGVudDtcclxuICAgICAgICBsZXQgdGV4U3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwICYmIGNvbnRlbnRbMF0udGV4dENvbnRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGV4U3RyaW5nID0gY29udGVudFswXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlbXB0eSBtYXRoP1xyXG4gICAgICAgIGlmICh0ZXhTdHJpbmcubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvbSEuY2xhc3NMaXN0LmFkZChcImVtcHR5LW1hdGhcIik7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHJlbmRlcmVkIG1hdGgsIHNpbmNlIHRoaXMgbm9kZSBpcyBpbiBhbiBpbnZhbGlkIHN0YXRlXHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9tYXRoUmVuZGVyRWx0LmZpcnN0Q2hpbGQpIHsgdGhpcy5fbWF0aFJlbmRlckVsdC5maXJzdENoaWxkLnJlbW92ZSgpOyB9XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCByZW5kZXIgZW1wdHkgbWF0aFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kb20hLmNsYXNzTGlzdC5yZW1vdmUoXCJlbXB0eS1tYXRoXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVuZGVyIGthdGV4LCBidXQgZmFpbCBncmFjZWZ1bGx5XHJcbiAgICAgICAga2F0ZXgudGhlbihrID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGsucmVuZGVyKHRleFN0cmluZywgdGhpcy5fbWF0aFJlbmRlckVsdCEsIHRoaXMuX2thdGV4T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRoUmVuZGVyRWx0IS5jbGFzc0xpc3QucmVtb3ZlKFwicGFyc2UtZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvbSEuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFBhcnNlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0aFJlbmRlckVsdCEuY2xhc3NMaXN0LmFkZChcInBhcnNlLWVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tIS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBlcnIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09IElubmVyIEVkaXRvciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXHJcblxyXG4gICAgZGlzcGF0Y2hJbm5lcih0cjogVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lubmVyVmlldykgeyByZXR1cm47IH1cclxuICAgICAgICBjb25zdCB7IHN0YXRlLCB0cmFuc2FjdGlvbnMgfSA9IHRoaXMuX2lubmVyVmlldy5zdGF0ZS5hcHBseVRyYW5zYWN0aW9uKHRyKTtcclxuICAgICAgICB0aGlzLl9pbm5lclZpZXcudXBkYXRlU3RhdGUoc3RhdGUpO1xyXG5cclxuICAgICAgICBpZiAoIXRyLmdldE1ldGEoXCJmcm9tT3V0c2lkZVwiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBvdXRlclRyID0gdGhpcy5fb3V0ZXJWaWV3LnN0YXRlLnRyLCBvZmZzZXRNYXAgPSBTdGVwTWFwLm9mZnNldCh0aGlzLl9nZXRQb3MoKSArIDEpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zYWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcHMgPSB0cmFuc2FjdGlvbnNbaV0uc3RlcHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ZXBzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkID0gc3RlcHNbal0ubWFwKG9mZnNldE1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXBwZWQpIHsgdGhyb3cgRXJyb3IoXCJzdGVwIGRpc2NhcmRlZCFcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICBvdXRlclRyLnN0ZXAobWFwcGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3V0ZXJUci5kb2NDaGFuZ2VkKSB0aGlzLl9vdXRlclZpZXcuZGlzcGF0Y2gob3V0ZXJUcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5FZGl0b3IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lubmVyVmlldykgeyB0aHJvdyBFcnJvcihcImlubmVyIHZpZXcgc2hvdWxkIG5vdCBleGlzdCFcIik7IH1cclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmVzdGVkIFByb3NlTWlycm9yIHZpZXdcclxuICAgICAgICB0aGlzLl9pbm5lclZpZXcgPSBuZXcgRWRpdG9yVmlldyh0aGlzLl9tYXRoU3JjRWx0LCB7XHJcbiAgICAgICAgICAgIHN0YXRlOiBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgZG9jOiB0aGlzLl9ub2RlLFxyXG4gICAgICAgICAgICAgICAgcGx1Z2luczogW2tleW1hcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJUYWJcIjogKHN0YXRlLCBkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuaW5zZXJ0VGV4dChcIlxcdFwiKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcIkJhY2tzcGFjZVwiOiBjaGFpbkNvbW1hbmRzKGRlbGV0ZVNlbGVjdGlvbiwgKHN0YXRlLCBkaXNwYXRjaCwgdHJfaW5uZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBiYWNrc3BhY2UgYmVoYXZpb3IgZm9yIG5vbi1lbXB0eSBzZWxlY3Rpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuc2VsZWN0aW9uLmVtcHR5KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGJhY2tzcGFjZSBiZWhhdmlvciB3aGVuIG1hdGggbm9kZSBpcyBub24tZW1wdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25vZGUudGV4dENvbnRlbnQubGVuZ3RoID4gMCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCB3ZSB3YW50IHRvIGRlbGV0ZSB0aGUgZW1wdHkgbWF0aCBub2RlIGFuZCBmb2N1cyB0aGUgb3V0ZXIgdmlld1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vdXRlclZpZXcuZGlzcGF0Y2godGhpcy5fb3V0ZXJWaWV3LnN0YXRlLnRyLmluc2VydFRleHQoXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vdXRlclZpZXcuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbnRlclwiOiBuZXdsaW5lSW5Db2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ3RybC1FbnRlclwiOiAoc3RhdGU6IEVkaXRvclN0YXRlLCBkaXNwYXRjaDogKCh0cjogVHJhbnNhY3Rpb24pID0+IHZvaWQpIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdG8gfSA9IHRoaXMuX291dGVyVmlldy5zdGF0ZS5zZWxlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG91dGVyU3RhdGU6IEVkaXRvclN0YXRlID0gdGhpcy5fb3V0ZXJWaWV3LnN0YXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxhY2UgY3Vyc29yIG91dHNpZGUgb2YgbWF0aCBub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX291dGVyVmlldy5kaXNwYXRjaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyU3RhdGUudHIuc2V0U2VsZWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRleHRTZWxlY3Rpb24uY3JlYXRlKG91dGVyU3RhdGUuZG9jLCB0bylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c3QgcmV0dXJuIGZvY3VzIHRvIHRoZSBvdXRlciB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2Ugbm8gY3Vyc29yIHdpbGwgYXBwZWFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX291dGVyVmlldy5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGRpc3BhdGNoVHJhbnNhY3Rpb246IHRoaXMuZGlzcGF0Y2hJbm5lci5iaW5kKHRoaXMpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGZvY3VzIGVsZW1lbnRcclxuICAgICAgICBjb25zdCBpbm5lclN0YXRlID0gdGhpcy5faW5uZXJWaWV3LnN0YXRlO1xyXG4gICAgICAgIHRoaXMuX2lubmVyVmlldy5mb2N1cygpO1xyXG5cclxuICAgICAgICAvLyBkZXRlcm1pbmUgY3Vyc29yIHBvc2l0aW9uXHJcbiAgICAgICAgY29uc3QgcG9zOiBudW1iZXIgPSAodGhpcy5jdXJzb3JTaWRlID09IFwic3RhcnRcIikgPyAwIDogdGhpcy5fbm9kZS5ub2RlU2l6ZSAtIDI7XHJcbiAgICAgICAgdGhpcy5faW5uZXJWaWV3LmRpc3BhdGNoKFxyXG4gICAgICAgICAgICBpbm5lclN0YXRlLnRyLnNldFNlbGVjdGlvbihcclxuICAgICAgICAgICAgICAgIFRleHRTZWxlY3Rpb24uY3JlYXRlKGlubmVyU3RhdGUuZG9jLCBwb3MpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLl9pc0VkaXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGlubmVyIFByb3NlTWlycm9yIGVkaXRvciBzaG91bGQgY2xvc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJlbmRlciBPcHRpb25hbGx5IHVwZGF0ZSB0aGUgcmVuZGVyZWQgbWF0aCBhZnRlciBjbG9zaW5nLiAod2hpY2hcclxuICAgICAqICAgIGlzIGdlbmVyYWxseSB3aGF0IHdlIHdhbnQgdG8gZG8sIHNpbmNlIHRoZSB1c2VyIGlzIGRvbmUgZWRpdGluZyEpXHJcbiAgICAgKi9cclxuICAgIGNsb3NlRWRpdG9yKHJlbmRlciA9IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5uZXJWaWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVyVmlldy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVyVmlldyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZW5kZXIpIHsgdGhpcy5yZW5kZXJNYXRoKCk7IH1cclxuICAgICAgICB0aGlzLl9pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxufSIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcblxyXG4vLyBwcm9zZW1pcnJvciBpbXBvcnRzXHJcbmltcG9ydCB7IE5vZGUgYXMgUHJvc2VOb2RlIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcbmltcG9ydCB7IFBsdWdpbiBhcyBQcm9zZVBsdWdpbiwgUGx1Z2luS2V5LCBQbHVnaW5TcGVjIH0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XHJcbmltcG9ydCB7IE1hdGhWaWV3IH0gZnJvbSBcIi4vbm9kZVZpZXdcIjtcclxuaW1wb3J0IHsgRWRpdG9yVmlldyB9IGZyb20gXCJwcm9zZW1pcnJvci12aWV3XCI7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmludGVyZmFjZSBJTWF0aFBsdWdpblN0YXRlIHtcclxuICAgIG1hY3JvczogeyBbY21kOiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgIGFjdGl2ZU5vZGVWaWV3czogTWF0aFZpZXdbXTtcclxufVxyXG5cclxuLyoqIFxyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gc3VpdGFibGUgZm9yIHBhc3NpbmcgYXMgYSBmaWVsZCBpbiBgRWRpdG9yUHJvcHMubm9kZVZpZXdzYC5cclxuICogQHBhcmFtIGRpc3BsYXlNb2RlIFRSVUUgZm9yIGJsb2NrIG1hdGgsIEZBTFNFIGZvciBpbmxpbmUgbWF0aC5cclxuICogQHNlZSBodHRwczovL3Byb3NlbWlycm9yLm5ldC9kb2NzL3JlZi8jdmlldy5FZGl0b3JQcm9wcy5ub2RlVmlld3NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXRoVmlldyhkaXNwbGF5TW9kZTogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIChub2RlOiBQcm9zZU5vZGUsIHZpZXc6IEVkaXRvclZpZXcsIGdldFBvczogYm9vbGVhbiB8ICgoKSA9PiBudW1iZXIpKTogTWF0aFZpZXcgPT4ge1xyXG4gICAgICAgIC8qKiBAdG9kbyBpcyB0aGlzIG5lY2Vzc2FyeT9cclxuICAgICAgICAqIERvY3Mgc2F5cyB0aGF0IGZvciBhbnkgZnVuY3Rpb24gcHJvcHJzLCB0aGUgY3VycmVudCBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAqIHdpbGwgYmUgYm91bmQgdG8gYHRoaXNgLiAgSG93ZXZlciwgdGhlIHR5cGluZ3MgZG9uJ3QgcmVmbGVjdCB0aGlzLlxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29uc3QgcGx1Z2luU3RhdGUgPSBtYXRoUGx1Z2luS2V5LmdldFN0YXRlKHZpZXcuc3RhdGUpO1xyXG4gICAgICAgIGlmICghcGx1Z2luU3RhdGUpIHsgdGhyb3cgbmV3IEVycm9yKFwibm8gbWF0aCBwbHVnaW4hXCIpOyB9XHJcbiAgICAgICAgY29uc3Qgbm9kZVZpZXdzID0gcGx1Z2luU3RhdGUuYWN0aXZlTm9kZVZpZXdzO1xyXG5cclxuICAgICAgICAvLyBzZXQgdXAgTm9kZVZpZXdcclxuICAgICAgICBjb25zdCBub2RlVmlldyA9IG5ldyBNYXRoVmlldyhcclxuICAgICAgICAgICAgbm9kZSwgdmlldywgZ2V0UG9zIGFzICgoKSA9PiBudW1iZXIpLFxyXG4gICAgICAgICAgICB7IGthdGV4T3B0aW9uczogeyBkaXNwbGF5TW9kZSwgbWFjcm9zOiBwbHVnaW5TdGF0ZS5tYWNyb3MgfSB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7IG5vZGVWaWV3cy5zcGxpY2Uobm9kZVZpZXdzLmluZGV4T2Yobm9kZVZpZXcpKTsgfSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBub2RlVmlld3MucHVzaChub2RlVmlldyk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVWaWV3O1xyXG4gICAgfTtcclxufVxyXG5cclxuY29uc3QgbWF0aFBsdWdpbktleSA9IG5ldyBQbHVnaW5LZXk8SU1hdGhQbHVnaW5TdGF0ZT4oXCJwcm9zZW1pcnJvci1tYXRoXCIpO1xyXG5cclxuY29uc3QgbWF0aFBsdWdpblNwZWM6IFBsdWdpblNwZWM8SU1hdGhQbHVnaW5TdGF0ZT4gPSB7XHJcbiAgICBrZXk6IG1hdGhQbHVnaW5LZXksXHJcbiAgICBzdGF0ZToge1xyXG4gICAgICAgIGluaXQoX2NvbmZpZywgX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtYWNyb3M6IHt9LFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlTm9kZVZpZXdzOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBwbHkodHIsIHZhbHVlLCBvbGRTdGF0ZSwgbmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgLyoqIEB0b2RvICg4LzIxLzIwKVxyXG4gICAgICAgICAgICAgKiBzaW5jZSBuZXcgc3RhdGUgaGFzIG5vdCBiZWVuIGZ1bGx5IGFwcGxpZWQgeWV0LCB3ZSBkb24ndCB5ZXQgaGF2ZVxyXG4gICAgICAgICAgICAgKiBpbmZvcm1hdGlvbiBhYm91dCBhbnkgbmV3IE1hdGhWaWV3cyB0aGF0IHdlcmUgY3JlYXRlZCBieSB0aGlzIHRyYW5zYWN0aW9uLlxyXG4gICAgICAgICAgICAgKiBBcyBhIHJlc3VsdCwgdGhlIGN1cnNvciBwb3NpdGlvbiBtYXkgYmUgd3JvbmcgZm9yIGFueSBuZXdseSBjcmVhdGVkIG1hdGggYmxvY2tzLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY29uc3QgcGx1Z2luU3RhdGUgPSBtYXRoUGx1Z2luS2V5LmdldFN0YXRlKG9sZFN0YXRlKTtcclxuICAgICAgICAgICAgaWYgKHBsdWdpblN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1hdGhWaWV3IG9mIHBsdWdpblN0YXRlLmFjdGl2ZU5vZGVWaWV3cykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGhWaWV3LnVwZGF0ZUN1cnNvclBvcyhuZXdTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqIEB0b2RvICg4LzIxLzIwKSBpbXBsZW1lbnQgc2VyaWFsaXphdGlvbiBmb3IgbWF0aCBwbHVnaW4gKi9cclxuICAgICAgICAvLyB0b0pTT04odmFsdWUpIHsgfSxcclxuICAgICAgICAvLyBmcm9tSlNPTihjb25maWcsIHZhbHVlLCBzdGF0ZSl7IHJldHVybiB7fTsgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgbm9kZVZpZXdzOiB7XHJcbiAgICAgICAgICAgIFwibWF0aF9pbmxpbmVcIjogY3JlYXRlTWF0aFZpZXcoZmFsc2UpLFxyXG4gICAgICAgICAgICBcIm1hdGhfYmxvY2tcIjogY3JlYXRlTWF0aFZpZXcodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWF0aFBsdWdpbiA9IG5ldyBQcm9zZVBsdWdpbihtYXRoUGx1Z2luU3BlYyk7IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IHsgSW5wdXRSdWxlLCBpbnB1dFJ1bGVzIH0gZnJvbSBcInByb3NlbWlycm9yLWlucHV0cnVsZXNcIjtcclxuaW1wb3J0IHsgTm9kZVR5cGUsIFNjaGVtYSB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG5pbXBvcnQgeyBOb2RlU2VsZWN0aW9uIH0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5saW5lSW5wdXRSdWxlKHBhdHRlcm46IFJlZ0V4cCwgbm9kZVR5cGU6IE5vZGVUeXBlLCBnZXRBdHRycz86IChtYXRjaDogc3RyaW5nW10pID0+IGFueSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnB1dFJ1bGUocGF0dGVybiwgKHN0YXRlLCBtYXRjaCwgc3RhcnQsIGVuZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRzdGFydCA9IHN0YXRlLmRvYy5yZXNvbHZlKHN0YXJ0KTtcclxuICAgICAgICBjb25zdCBpbmRleCA9ICRzdGFydC5pbmRleCgpO1xyXG4gICAgICAgIGNvbnN0ICRlbmQgPSBzdGF0ZS5kb2MucmVzb2x2ZShlbmQpO1xyXG4gICAgICAgIC8vIGdldCBhdHRyc1xyXG4gICAgICAgIGNvbnN0IGF0dHJzID0gZ2V0QXR0cnMgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGdldEF0dHJzKG1hdGNoKSA6IGdldEF0dHJzO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIHJlcGxhY2VtZW50IHZhbGlkXHJcbiAgICAgICAgaWYgKCEkc3RhcnQucGFyZW50LmNhblJlcGxhY2VXaXRoKGluZGV4LCAkZW5kLmluZGV4KCksIG5vZGVUeXBlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGVyZm9ybSByZXBsYWNlbWVudFxyXG4gICAgICAgIHJldHVybiBzdGF0ZS50ci5yZXBsYWNlUmFuZ2VXaXRoKFxyXG4gICAgICAgICAgICBzdGFydCwgZW5kLFxyXG4gICAgICAgICAgICBub2RlVHlwZS5jcmVhdGUoYXR0cnMsIG5vZGVUeXBlLnNjaGVtYS50ZXh0KG1hdGNoWzFdKSlcclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBibG9ja0lucHV0UnVsZShwYXR0ZXJuOiBSZWdFeHAsIG5vZGVUeXBlOiBOb2RlVHlwZSwgZ2V0QXR0cnM/OiAobWF0Y2g6IHN0cmluZ1tdKSA9PiBhbnkpIHtcclxuICAgIHJldHVybiBuZXcgSW5wdXRSdWxlKHBhdHRlcm4sIChzdGF0ZSwgbWF0Y2gsIHN0YXJ0LCBlbmQpID0+IHtcclxuICAgICAgICBjb25zdCAkc3RhcnQgPSBzdGF0ZS5kb2MucmVzb2x2ZShzdGFydCk7XHJcbiAgICAgICAgY29uc3QgYXR0cnMgPSBnZXRBdHRycyBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gZ2V0QXR0cnMobWF0Y2gpIDogZ2V0QXR0cnM7XHJcbiAgICAgICAgaWYgKCEkc3RhcnQubm9kZSgtMSkuY2FuUmVwbGFjZVdpdGgoJHN0YXJ0LmluZGV4KC0xKSwgJHN0YXJ0LmluZGV4QWZ0ZXIoLTEpLCBub2RlVHlwZSkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHRyID0gc3RhdGUudHJcclxuICAgICAgICAgICAgLmRlbGV0ZShzdGFydCwgZW5kKVxyXG4gICAgICAgICAgICAuc2V0QmxvY2tUeXBlKHN0YXJ0LCBzdGFydCwgbm9kZVR5cGUsIGF0dHJzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRyLnNldFNlbGVjdGlvbihOb2RlU2VsZWN0aW9uLmNyZWF0ZShcclxuICAgICAgICAgICAgdHIuZG9jLCB0ci5tYXBwaW5nLm1hcCgkc3RhcnQucG9zIC0gMSlcclxuICAgICAgICApKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRoSW5wdXRSdWxlcyhzY2hlbWE6IFNjaGVtYSkge1xyXG4gICAgcmV0dXJuIGlucHV0UnVsZXMoe1xyXG4gICAgICAgIHJ1bGVzOiBbXHJcbiAgICAgICAgICAgIC8vIG5lZ2F0aXZlIGxvb2tiZWhpbmQgcmVnZXggbm90YXRpb24gZm9yIGVzY2FwZWQgXFwkIGRlbGltaXRlcnNcclxuICAgICAgICAgICAgLy8gKHNlZSBodHRwczovL2phdmFzY3JpcHQuaW5mby9yZWdleHAtbG9va2FoZWFkLWxvb2tiZWhpbmQpXHJcbiAgICAgICAgICAgIGlubGluZUlucHV0UnVsZSgvKD88IVxcXFwpXFwkKC4rKSg/PCFcXFxcKVxcJC8sIHNjaGVtYS5ub2Rlcy5tYXRoX2lubGluZSksXHJcbiAgICAgICAgICAgIC8vIHNpbXBsZXIgdmVyc2lvbiB3aXRob3V0IHRoZSBvcHRpb24gdG8gZXNjYXBlIFxcJFxyXG4gICAgICAgICAgICAvL2lubGluZUlucHV0UnVsZSgvXFwkKC4rKVxcJC8sIGVkaXRvclNjaGVtYS5ub2Rlcy5tYXRoX2lubGluZSksXHJcbiAgICAgICAgICAgIGJsb2NrSW5wdXRSdWxlKC9eXFwkXFwkXFxzKyQvLCBzY2hlbWEubm9kZXMubWF0aF9ibG9jaylcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxufVxyXG4iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgeyBFZGl0b3JTdGF0ZSwgVHJhbnNhY3Rpb24sIFNlbGVjdGlvbiBhcyBQcm9zZVNlbGVjdGlvbiwgUGx1Z2luIGFzIFByb3NlUGx1Z2luIH0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XHJcbmltcG9ydCB7IERlY29yYXRpb25TZXQsIERlY29yYXRpb24gfSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xyXG5pbXBvcnQgeyBGcmFnbWVudCwgTm9kZSBhcyBQcm9zZU5vZGUgfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBVc2VzIHRoZSBzZWxlY3Rpb24gdG8gZGV0ZXJtaW5lIHdoaWNoIG1hdGhfc2VsZWN0IGRlY29yYXRpb25zXHJcbiAqIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBnaXZlbiBkb2N1bWVudC5cclxuICogQHBhcmFtIGFyZyBTaG91bGQgYmUgZWl0aGVyIGEgVHJhbnNhY3Rpb24gb3IgYW4gRWRpdG9yU3RhdGUsXHJcbiAqICAgICBhbHRob3VnaCBhbnkgb2JqZWN0IHdpdGggYHNlbGVjdGlvbmAgYW5kIGBkb2NgIHdpbGwgd29yay5cclxuICovXHJcbmNvbnN0IGNoZWNrU2VsZWN0aW9uID0gKGFyZzogeyBzZWxlY3Rpb246IFByb3NlU2VsZWN0aW9uOyBkb2M6IFByb3NlTm9kZSB9KSA9PiB7XHJcbiAgICBjb25zdCB7IGZyb20sIH0gPSBhcmcuc2VsZWN0aW9uO1xyXG4gICAgY29uc3QgY29udGVudDogRnJhZ21lbnQgPSBhcmcuc2VsZWN0aW9uLmNvbnRlbnQoKS5jb250ZW50O1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdDogeyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9W10gPSBbXTtcclxuXHJcbiAgICBjb250ZW50LmRlc2NlbmRhbnRzKChub2RlOiBQcm9zZU5vZGUsIHBvczogbnVtYmVyLCBfcGFyZW50OiBQcm9zZU5vZGUpID0+IHtcclxuICAgICAgICBpZiAobm9kZS50eXBlLm5hbWUgPT0gXCJ0ZXh0XCIpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgaWYgKG5vZGUudHlwZS5uYW1lLnN0YXJ0c1dpdGgoXCJtYXRoX1wiKSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogTWF0aC5tYXgoZnJvbSArIHBvcyAtIDEsIDApLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmcm9tICsgcG9zICsgbm9kZS5ub2RlU2l6ZSAtIDFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gRGVjb3JhdGlvblNldC5jcmVhdGUoYXJnLmRvYywgcmVzdWx0Lm1hcChcclxuICAgICAgICAoeyBzdGFydCwgZW5kIH0pID0+IERlY29yYXRpb24ubm9kZShzdGFydCwgZW5kLCB7IGNsYXNzOiBcIm1hdGgtc2VsZWN0XCIgfSlcclxuICAgICkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIER1ZSB0byB0aGUgaW50ZXJuYWxzIG9mIEthVGVYLCBieSBkZWZhdWx0LCBzZWxlY3RpbmcgcmVuZGVyZWRcclxuICogbWF0aCB3aWxsIHB1dCBhIGJveCBhcm91bmQgZWFjaCBpbmRpdmlkdWFsIGNoYXJhY3RlciBvZiBhXHJcbiAqIG1hdGggZXhwcmVzc2lvbi4gIFRoaXMgcGx1Z2luIGF0dGVtcHRzIHRvIG1ha2UgbWF0aCBzZWxlY3Rpb25zXHJcbiAqIHNsaWdodGx5IHByZXR0aWVyIGJ5IGluc3RlYWQgc2V0dGluZyBhIGJhY2tncm91bmQgY29sb3Igb24gdGhlIG5vZGUuXHJcbiAqIFxyXG4gKiAocmVtZW1iZXIgdG8gdXNlIHRoZSBpbmNsdWRlZCBtYXRoLmNzcyEpXHJcbiAqIFxyXG4gKiBAdG9kbyAoNi8xMy8yMCkgbWF0aCBzZWxlY3Rpb24gcmVjdGFuZ2xlcyBhcmUgbm90IHF1aXRlIGV2ZW4gd2l0aCB0ZXh0XHJcbiAqL1xyXG5jb25zdCBtYXRoU2VsZWN0UGx1Z2luOiBQcm9zZVBsdWdpbiA9IG5ldyBQcm9zZVBsdWdpbih7XHJcbiAgICBzdGF0ZToge1xyXG4gICAgICAgIGluaXQoY29uZmlnOiBhbnksIHBhcnRpYWxTdGF0ZTogRWRpdG9yU3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoZWNrU2VsZWN0aW9uKHBhcnRpYWxTdGF0ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcHBseSh0cjogVHJhbnNhY3Rpb24sIG9sZFN0YXRlOiBFZGl0b3JTdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRyLnNlbGVjdGlvbiB8fCAhdHIuc2VsZWN0aW9uU2V0KSB7IHJldHVybiBvbGRTdGF0ZTsgfVxyXG4gICAgICAgICAgICBjb25zdCBzZWwgPSBjaGVja1NlbGVjdGlvbih0cik7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgZGVjb3JhdGlvbnM6IChzdGF0ZTogRWRpdG9yU3RhdGUpID0+IHsgcmV0dXJuIG1hdGhTZWxlY3RQbHVnaW4uZ2V0U3RhdGUoc3RhdGUpOyB9LFxyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hdGhTZWxlY3RQbHVnaW47IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuXHJcbmltcG9ydCB7IFNjaGVtYVNwZWMgfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXRoU2NoZW1hOiBTY2hlbWFTcGVjID0ge1xyXG4gICAgbm9kZXM6IHtcclxuICAgICAgICBtYXRoX2lubGluZToge1xyXG4gICAgICAgICAgICBncm91cDogXCJpbmxpbmUgbWF0aFwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcInRleHQqXCIsXHJcbiAgICAgICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXRvbTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9ET006ICgpID0+IFtcIm1hdGgtaW5saW5lXCIsIHsgY2xhc3M6IFwibWF0aC1ub2RlXCIgfSwgMF0sXHJcbiAgICAgICAgICAgIHBhcnNlRE9NOiBbe1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIm1hdGgtaW5saW5lXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGhfYmxvY2s6IHtcclxuICAgICAgICAgICAgZ3JvdXA6IFwiYmxvY2sgbWF0aFwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcInRleHQqXCIsXHJcbiAgICAgICAgICAgIGF0b206IHRydWUsXHJcbiAgICAgICAgICAgIGNvZGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvRE9NOiAoKSA9PiBbXCJtYXRoLWRpc3BsYXlcIiwgeyBjbGFzczogXCJtYXRoLW5vZGVcIiB9LCAwXSxcclxuICAgICAgICAgICAgcGFyc2VET006IFt7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwibWF0aC1kaXNwbGF5XCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG1hcmtzOiB7XHJcbiAgICAgICAgbWF0aF9zZWxlY3Q6IHtcclxuICAgICAgICAgICAgdG9ET00oKSB7IHJldHVybiBbXCJtYXRoLXNlbGVjdFwiLCAwXTsgfSxcclxuICAgICAgICAgICAgcGFyc2VET006IFt7IHRhZzogXCJtYXRoLXNlbGVjdFwiIH1dXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG4gLyogQWRhcHRlZCBmcm9tIE1JVCBsaWNlbnNlZCBwcm9zZW1pcnJvci1leGFtcGxlLXNldHVwIHBhY2thZ2UgKi9cclxuXHJcbmltcG9ydCB7aW5wdXRSdWxlcywgd3JhcHBpbmdJbnB1dFJ1bGUsIHRleHRibG9ja1R5cGVJbnB1dFJ1bGUsXHJcbiAgICBzbWFydFF1b3RlcywgZW1EYXNoLCBlbGxpcHNpc30gZnJvbSBcInByb3NlbWlycm9yLWlucHV0cnVsZXNcIjtcclxuaW1wb3J0IHsgTm9kZVR5cGUsIFNjaGVtYSB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG5cclxuLy8gR2l2ZW4gYSBibG9ja3F1b3RlIG5vZGUgdHlwZSwgcmV0dXJucyBhbiBpbnB1dCBydWxlIHRoYXQgdHVybnMgYFwiPiBcImBcclxuLy8gYXQgdGhlIHN0YXJ0IG9mIGEgdGV4dGJsb2NrIGludG8gYSBibG9ja3F1b3RlLlxyXG5leHBvcnQgZnVuY3Rpb24gYmxvY2tRdW90ZVJ1bGU8VCBleHRlbmRzIFNjaGVtYT4obm9kZVR5cGU6IE5vZGVUeXBlPFQ+KSB7XHJcbiAgICByZXR1cm4gd3JhcHBpbmdJbnB1dFJ1bGUoL15cXHMqPlxccyQvLCBub2RlVHlwZSk7XHJcbn1cclxuXHJcbi8vIEdpdmVuIGEgbGlzdCBub2RlIHR5cGUsIHJldHVybnMgYW4gaW5wdXQgcnVsZSB0aGF0IHR1cm5zIGEgbnVtYmVyXHJcbi8vIGZvbGxvd2VkIGJ5IGEgZG90IGF0IHRoZSBzdGFydCBvZiBhIHRleHRibG9jayBpbnRvIGFuIG9yZGVyZWQgbGlzdC5cclxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyZWRMaXN0UnVsZTxUIGV4dGVuZHMgU2NoZW1hPihub2RlVHlwZTogTm9kZVR5cGU8VD4pIHtcclxuICAgIHJldHVybiB3cmFwcGluZ0lucHV0UnVsZSgvXihcXGQrKVxcLlxccyQvLCBub2RlVHlwZSwgbWF0Y2ggPT4gKHtvcmRlcjogK21hdGNoWzFdfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoLCBub2RlKSA9PiBub2RlLmNoaWxkQ291bnQgKyBub2RlLmF0dHJzLm9yZGVyID09ICttYXRjaFsxXSk7XHJcbn1cclxuXHJcbi8vIEdpdmVuIGEgbGlzdCBub2RlIHR5cGUsIHJldHVybnMgYW4gaW5wdXQgcnVsZSB0aGF0IHR1cm5zIGEgYnVsbGV0XHJcbi8vIChkYXNoLCBwbHVzaCwgb3IgYXN0ZXJpc2spIGF0IHRoZSBzdGFydCBvZiBhIHRleHRibG9jayBpbnRvIGFcclxuLy8gYnVsbGV0IGxpc3QuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWxsZXRMaXN0UnVsZTxUIGV4dGVuZHMgU2NoZW1hPihub2RlVHlwZTogTm9kZVR5cGU8VD4pIHtcclxuICAgIHJldHVybiB3cmFwcGluZ0lucHV0UnVsZSgvXlxccyooWy0rKl0pXFxzJC8sIG5vZGVUeXBlKTtcclxufVxyXG5cclxuLy8gR2l2ZW4gYSBjb2RlIGJsb2NrIG5vZGUgdHlwZSwgcmV0dXJucyBhbiBpbnB1dCBydWxlIHRoYXQgdHVybnMgYVxyXG4vLyB0ZXh0YmxvY2sgc3RhcnRpbmcgd2l0aCB0aHJlZSBiYWNrdGlja3MgaW50byBhIGNvZGUgYmxvY2suXHJcbmV4cG9ydCBmdW5jdGlvbiBjb2RlQmxvY2tSdWxlPFQgZXh0ZW5kcyBTY2hlbWE+KG5vZGVUeXBlOiBOb2RlVHlwZTxUPikge1xyXG4gICAgcmV0dXJuIHRleHRibG9ja1R5cGVJbnB1dFJ1bGUoL15gYGAkLywgbm9kZVR5cGUpO1xyXG59XHJcblxyXG4vLyBHaXZlbiBhIG5vZGUgdHlwZSBhbmQgYSBtYXhpbXVtIGxldmVsLCBjcmVhdGVzIGFuIGlucHV0IHJ1bGUgdGhhdFxyXG4vLyB0dXJucyB1cCB0byB0aGF0IG51bWJlciBvZiBgI2AgY2hhcmFjdGVycyBmb2xsb3dlZCBieSBhIHNwYWNlIGF0XHJcbi8vIHRoZSBzdGFydCBvZiBhIHRleHRibG9jayBpbnRvIGEgaGVhZGluZyB3aG9zZSBsZXZlbCBjb3JyZXNwb25kcyB0b1xyXG4vLyB0aGUgbnVtYmVyIG9mIGAjYCBzaWducy5cclxuZXhwb3J0IGZ1bmN0aW9uIGhlYWRpbmdSdWxlPFQgZXh0ZW5kcyBTY2hlbWE+KG5vZGVUeXBlOiBOb2RlVHlwZTxUPiwgbWF4TGV2ZWw6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRleHRibG9ja1R5cGVJbnB1dFJ1bGUobmV3IFJlZ0V4cChcIl4oI3sxLFwiICsgbWF4TGV2ZWwgKyBcIn0pXFxcXHMkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVUeXBlLCBtYXRjaCA9PiAoe2xldmVsOiBtYXRjaFsxXS5sZW5ndGh9KSk7XHJcbn1cclxuXHJcbi8vIEEgc2V0IG9mIGlucHV0IHJ1bGVzIGZvciBjcmVhdGluZyB0aGUgYmFzaWMgYmxvY2sgcXVvdGVzLCBsaXN0cyxcclxuLy8gY29kZSBibG9ja3MsIGFuZCBoZWFkaW5nLlxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRJbnB1dFJ1bGVzKHNjaGVtYTogU2NoZW1hKSB7XHJcbiAgICBjb25zdCBydWxlcyA9IHNtYXJ0UXVvdGVzLmNvbmNhdChlbGxpcHNpcywgZW1EYXNoKTtcclxuICAgIGxldCB0eXBlOiBOb2RlVHlwZTxhbnk+O1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduXHJcbiAgICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5ibG9ja3F1b3RlKSBydWxlcy5wdXNoKGJsb2NrUXVvdGVSdWxlKHR5cGUpKTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxyXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMub3JkZXJlZF9saXN0KSBydWxlcy5wdXNoKG9yZGVyZWRMaXN0UnVsZSh0eXBlKSk7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uZC1hc3NpZ25cclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmJ1bGxldF9saXN0KSBydWxlcy5wdXNoKGJ1bGxldExpc3RSdWxlKHR5cGUpKTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxyXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMuY29kZV9ibG9jaykgcnVsZXMucHVzaChjb2RlQmxvY2tSdWxlKHR5cGUpKTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxyXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMuaGVhZGluZykgcnVsZXMucHVzaChoZWFkaW5nUnVsZSh0eXBlLCA2KSk7XHJcbiAgICByZXR1cm4gaW5wdXRSdWxlcyh7cnVsZXN9KTtcclxufSIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXHJcbmltcG9ydCB7XHJcbiAgd3JhcEluLCBzZXRCbG9ja1R5cGUsIGNoYWluQ29tbWFuZHMsIHRvZ2dsZU1hcmssIGV4aXRDb2RlLFxyXG4gIGpvaW5VcCwgam9pbkRvd24sIGxpZnQsIHNlbGVjdFBhcmVudE5vZGUsIENvbW1hbmQsIEtleW1hcFxyXG59IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xyXG5pbXBvcnQgeyB3cmFwSW5MaXN0LCBzcGxpdExpc3RJdGVtLCBsaWZ0TGlzdEl0ZW0sIHNpbmtMaXN0SXRlbSB9IGZyb20gXCJwcm9zZW1pcnJvci1zY2hlbWEtbGlzdFwiO1xyXG5pbXBvcnQgeyB1bmRvLCByZWRvIH0gZnJvbSBcInByb3NlbWlycm9yLWhpc3RvcnlcIjtcclxuaW1wb3J0IHsgdW5kb0lucHV0UnVsZSB9IGZyb20gXCJwcm9zZW1pcnJvci1pbnB1dHJ1bGVzXCI7XHJcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG4gXHJcbmNvbnN0IG1hYyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT0gXCJ1bmRlZmluZWRcIiA/IC9NYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSA6IGZhbHNlO1xyXG5cclxuLy8gSW5zcGVjdCB0aGUgZ2l2ZW4gc2NoZW1hIGxvb2tpbmcgZm9yIG1hcmtzIGFuZCBub2RlcyBmcm9tIHRoZVxyXG4vLyBiYXNpYyBzY2hlbWEsIGFuZCBpZiBmb3VuZCwgYWRkIGtleSBiaW5kaW5ncyByZWxhdGVkIHRvIHRoZW0uXHJcbi8vIFRoaXMgd2lsbCBhZGQ6XHJcbi8vXHJcbi8vICogKipNb2QtYioqIGZvciB0b2dnbGluZyBbc3Ryb25nXSgjc2NoZW1hLWJhc2ljLlN0cm9uZ01hcmspXHJcbi8vICogKipNb2QtaSoqIGZvciB0b2dnbGluZyBbZW1waGFzaXNdKCNzY2hlbWEtYmFzaWMuRW1NYXJrKVxyXG4vLyAqICoqTW9kLWAqKiBmb3IgdG9nZ2xpbmcgW2NvZGUgZm9udF0oI3NjaGVtYS1iYXNpYy5Db2RlTWFyaylcclxuLy8gKiAqKkN0cmwtU2hpZnQtMCoqIGZvciBtYWtpbmcgdGhlIGN1cnJlbnQgdGV4dGJsb2NrIGEgcGFyYWdyYXBoXHJcbi8vICogKipDdHJsLVNoaWZ0LTEqKiB0byAqKkN0cmwtU2hpZnQtRGlnaXQ2KiogZm9yIG1ha2luZyB0aGUgY3VycmVudFxyXG4vLyAgIHRleHRibG9jayBhIGhlYWRpbmcgb2YgdGhlIGNvcnJlc3BvbmRpbmcgbGV2ZWxcclxuLy8gKiAqKkN0cmwtU2hpZnQtQmFja3NsYXNoKiogdG8gbWFrZSB0aGUgY3VycmVudCB0ZXh0YmxvY2sgYSBjb2RlIGJsb2NrXHJcbi8vICogKipDdHJsLVNoaWZ0LTgqKiB0byB3cmFwIHRoZSBzZWxlY3Rpb24gaW4gYW4gb3JkZXJlZCBsaXN0XHJcbi8vICogKipDdHJsLVNoaWZ0LTkqKiB0byB3cmFwIHRoZSBzZWxlY3Rpb24gaW4gYSBidWxsZXQgbGlzdFxyXG4vLyAqICoqQ3RybC0+KiogdG8gd3JhcCB0aGUgc2VsZWN0aW9uIGluIGEgYmxvY2sgcXVvdGVcclxuLy8gKiAqKkVudGVyKiogdG8gc3BsaXQgYSBub24tZW1wdHkgdGV4dGJsb2NrIGluIGEgbGlzdCBpdGVtIHdoaWxlIGF0XHJcbi8vICAgdGhlIHNhbWUgdGltZSBzcGxpdHRpbmcgdGhlIGxpc3QgaXRlbVxyXG4vLyAqICoqTW9kLUVudGVyKiogdG8gaW5zZXJ0IGEgaGFyZCBicmVha1xyXG4vLyAqICoqTW9kLV8qKiB0byBpbnNlcnQgYSBob3Jpem9udGFsIHJ1bGVcclxuLy8gKiAqKkJhY2tzcGFjZSoqIHRvIHVuZG8gYW4gaW5wdXQgcnVsZVxyXG4vLyAqICoqQWx0LUFycm93VXAqKiB0byBgam9pblVwYFxyXG4vLyAqICoqQWx0LUFycm93RG93bioqIHRvIGBqb2luRG93bmBcclxuLy8gKiAqKk1vZC1CcmFja2V0TGVmdCoqIHRvIGBsaWZ0YFxyXG4vLyAqICoqRXNjYXBlKiogdG8gYHNlbGVjdFBhcmVudE5vZGVgXHJcbi8vXHJcbi8vIFlvdSBjYW4gc3VwcHJlc3Mgb3IgbWFwIHRoZXNlIGJpbmRpbmdzIGJ5IHBhc3NpbmcgYSBgbWFwS2V5c2BcclxuLy8gYXJndW1lbnQsIHdoaWNoIG1hcHMga2V5IG5hbWVzIChzYXkgYFwiTW9kLUJcImAgdG8gZWl0aGVyIGBmYWxzZWAsIHRvXHJcbi8vIHJlbW92ZSB0aGUgYmluZGluZywgb3IgYSBuZXcga2V5IG5hbWUgc3RyaW5nLlxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRLZXltYXAoc2NoZW1hOiBTY2hlbWEsIG1hcEtleXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IGZhbHNlPik6IEtleW1hcCB7XHJcbiAgY29uc3Qga2V5czogS2V5bWFwID0ge307XHJcbiAgbGV0IHR5cGU7XHJcblxyXG4gIGZ1bmN0aW9uIGJpbmQoa2V5OiBzdHJpbmcsIGNtZDogQ29tbWFuZCkge1xyXG4gICAgaWYgKG1hcEtleXMpIHtcclxuICAgICAgY29uc3QgbWFwcGVkID0gbWFwS2V5c1trZXldO1xyXG4gICAgICBpZiAobWFwcGVkID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICBpZiAobWFwcGVkKSBrZXkgPSBtYXBwZWQ7XHJcbiAgICB9XHJcbiAgICBrZXlzW2tleV0gPSBjbWQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgYmluZChcIk1vZC16XCIsIHVuZG8pO1xyXG4gIGJpbmQoXCJTaGlmdC1Nb2QtelwiLCByZWRvKTtcclxuICBiaW5kKFwiQmFja3NwYWNlXCIsIHVuZG9JbnB1dFJ1bGUpO1xyXG4gIGlmICghbWFjKSBiaW5kKFwiTW9kLXlcIiwgcmVkbyk7XHJcblxyXG4gIGJpbmQoXCJBbHQtQXJyb3dVcFwiLCBqb2luVXApO1xyXG4gIGJpbmQoXCJBbHQtQXJyb3dEb3duXCIsIGpvaW5Eb3duKTtcclxuICBiaW5kKFwiTW9kLUJyYWNrZXRMZWZ0XCIsIGxpZnQpO1xyXG4gIGJpbmQoXCJFc2NhcGVcIiwgc2VsZWN0UGFyZW50Tm9kZSk7XHJcblxyXG4gIGlmICh0eXBlID0gc2NoZW1hLm1hcmtzLnN0cm9uZykge1xyXG4gICAgYmluZChcIk1vZC1iXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xyXG4gICAgYmluZChcIk1vZC1CXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xyXG4gIH1cclxuICBpZiAodHlwZSA9IHNjaGVtYS5tYXJrcy5lbSkge1xyXG4gICAgYmluZChcIk1vZC1pXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xyXG4gICAgYmluZChcIk1vZC1JXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xyXG4gIH1cclxuICBpZiAodHlwZSA9IHNjaGVtYS5tYXJrcy5jb2RlKVxyXG4gICAgYmluZChcIk1vZC1gXCIsIHRvZ2dsZU1hcmsodHlwZSkpO1xyXG5cclxuICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5idWxsZXRfbGlzdClcclxuICAgIGJpbmQoXCJTaGlmdC1DdHJsLThcIiwgd3JhcEluTGlzdCh0eXBlKSk7XHJcbiAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMub3JkZXJlZF9saXN0KVxyXG4gICAgYmluZChcIlNoaWZ0LUN0cmwtOVwiLCB3cmFwSW5MaXN0KHR5cGUpKTtcclxuICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5ibG9ja3F1b3RlKVxyXG4gICAgYmluZChcIkN0cmwtPlwiLCB3cmFwSW4odHlwZSkpO1xyXG4gIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmhhcmRfYnJlYWspIHtcclxuICAgIGNvbnN0IGJyID0gdHlwZTtcclxuICAgIGNvbnN0IGNtZCA9IGNoYWluQ29tbWFuZHMoZXhpdENvZGUsIChzdGF0ZSwgZGlzcGF0Y2gpID0+IHtcclxuICAgICAgKGRpc3BhdGNoIGFzIGFueSkoc3RhdGUudHIucmVwbGFjZVNlbGVjdGlvbldpdGgoYnIuY3JlYXRlKCkpLnNjcm9sbEludG9WaWV3KCkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYmluZChcIk1vZC1FbnRlclwiLCBjbWQpO1xyXG4gICAgYmluZChcIlNoaWZ0LUVudGVyXCIsIGNtZCk7XHJcbiAgICBpZiAobWFjKSBiaW5kKFwiQ3RybC1FbnRlclwiLCBjbWQpO1xyXG4gIH1cclxuICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5saXN0X2l0ZW0pIHtcclxuICAgIGJpbmQoXCJFbnRlclwiLCBzcGxpdExpc3RJdGVtKHR5cGUpKTtcclxuICAgIGJpbmQoXCJNb2QtW1wiLCBsaWZ0TGlzdEl0ZW0odHlwZSkpO1xyXG4gICAgYmluZChcIk1vZC1dXCIsIHNpbmtMaXN0SXRlbSh0eXBlKSk7XHJcbiAgfVxyXG4gIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLnBhcmFncmFwaClcclxuICAgIGJpbmQoXCJTaGlmdC1DdHJsLTBcIiwgc2V0QmxvY2tUeXBlKHR5cGUpKTtcclxuICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5jb2RlX2Jsb2NrKVxyXG4gICAgYmluZChcIlNoaWZ0LUN0cmwtXFxcXFwiLCBzZXRCbG9ja1R5cGUodHlwZSkpO1xyXG4gIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmhlYWRpbmcpXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA2OyBpKyspIGJpbmQoXCJTaGlmdC1DdHJsLVwiICsgaSwgc2V0QmxvY2tUeXBlKHR5cGUsIHsgbGV2ZWw6IGkgfSkpO1xyXG4gIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmhvcml6b250YWxfcnVsZSkge1xyXG4gICAgY29uc3QgaHIgPSB0eXBlO1xyXG4gICAgYmluZChcIk1vZC1fXCIsIChzdGF0ZSwgZGlzcGF0Y2gpID0+IHtcclxuICAgICAgKGRpc3BhdGNoIGFzIGFueSkoc3RhdGUudHIucmVwbGFjZVNlbGVjdGlvbldpdGgoaHIuY3JlYXRlKCkpLnNjcm9sbEludG9WaWV3KCkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGtleXM7XHJcbn0iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xyXG5pbXBvcnQge1xyXG4gICAgd3JhcEl0ZW0sIGJsb2NrVHlwZUl0ZW0sIERyb3Bkb3duLCBEcm9wZG93blN1Ym1lbnUsIGpvaW5VcEl0ZW0sIGxpZnRJdGVtLFxyXG4gICAgc2VsZWN0UGFyZW50Tm9kZUl0ZW0sIHVuZG9JdGVtLCByZWRvSXRlbSwgaWNvbnMsIE1lbnVJdGVtXHJcbn0gZnJvbSBcInByb3NlbWlycm9yLW1lbnVcIjtcclxuaW1wb3J0IHsgTm9kZVNlbGVjdGlvbiwgRWRpdG9yU3RhdGUgfSBmcm9tIFwicHJvc2VtaXJyb3Itc3RhdGVcIjtcclxuaW1wb3J0IHsgQ29tbWFuZCwgdG9nZ2xlTWFyayB9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xyXG5pbXBvcnQgeyB3cmFwSW5MaXN0IH0gZnJvbSBcInByb3NlbWlycm9yLXNjaGVtYS1saXN0XCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCwgb3BlblByb21wdCB9IGZyb20gXCIuL3Byb21wdFwiO1xyXG5pbXBvcnQgeyBNYXJrLCBOb2RlVHlwZSwgU2NoZW1hIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcblxyXG4vLyBIZWxwZXJzIHRvIGNyZWF0ZSBzcGVjaWZpYyB0eXBlcyBvZiBpdGVtc1xyXG5cclxuZnVuY3Rpb24gY2FuSW5zZXJ0KHN0YXRlOiBFZGl0b3JTdGF0ZSwgbm9kZVR5cGU6IE5vZGVUeXBlKSB7XHJcbiAgICBjb25zdCAkZnJvbSA9IHN0YXRlLnNlbGVjdGlvbi4kZnJvbTtcclxuICAgIGZvciAobGV0IGQgPSAkZnJvbS5kZXB0aDsgZCA+PSAwOyBkLS0pIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9ICRmcm9tLmluZGV4KGQpO1xyXG4gICAgICAgIGlmICgkZnJvbS5ub2RlKGQpLmNhblJlcGxhY2VXaXRoKGluZGV4LCBpbmRleCwgbm9kZVR5cGUpKSByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0SW1hZ2VJdGVtKG5vZGVUeXBlOiBOb2RlVHlwZSkge1xyXG4gICAgcmV0dXJuIG5ldyBNZW51SXRlbSh7XHJcbiAgICAgICAgdGl0bGU6IFwiSW5zZXJ0IGltYWdlXCIsXHJcbiAgICAgICAgbGFiZWw6IFwiSW1hZ2VcIixcclxuICAgICAgICBlbmFibGUoc3RhdGUpIHsgcmV0dXJuIGNhbkluc2VydChzdGF0ZSwgbm9kZVR5cGUpOyB9LFxyXG4gICAgICAgIHJ1bihzdGF0ZSwgXywgdmlldykge1xyXG4gICAgICAgICAgICBjb25zdCB7IGZyb20sIHRvIH0gPSBzdGF0ZS5zZWxlY3Rpb247XHJcbiAgICAgICAgICAgIGxldCBhdHRycyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBOb2RlU2VsZWN0aW9uICYmIHN0YXRlLnNlbGVjdGlvbi5ub2RlLnR5cGUgPT0gbm9kZVR5cGUpXHJcbiAgICAgICAgICAgICAgICBhdHRycyA9IHN0YXRlLnNlbGVjdGlvbi5ub2RlLmF0dHJzO1xyXG4gICAgICAgICAgICBvcGVuUHJvbXB0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkluc2VydCBpbWFnZVwiLFxyXG4gICAgICAgICAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBuZXcgVGV4dEZpZWxkKHsgbGFiZWw6IFwiTG9jYXRpb25cIiwgcmVxdWlyZWQ6IHRydWUsIHZhbHVlOiBhdHRycyAmJiBhdHRycy5zcmMgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5ldyBUZXh0RmllbGQoeyBsYWJlbDogXCJUaXRsZVwiLCB2YWx1ZTogYXR0cnMgJiYgYXR0cnMudGl0bGUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBuZXcgVGV4dEZpZWxkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGF0dHJzID8gYXR0cnMuYWx0IDogc3RhdGUuZG9jLnRleHRCZXR3ZWVuKGZyb20sIHRvLCBcIiBcIilcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGF0dHJzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BhdGNoKHZpZXcuc3RhdGUudHIucmVwbGFjZVNlbGVjdGlvbldpdGgobm9kZVR5cGUuY3JlYXRlQW5kRmlsbChhdHRycykhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY21kSXRlbShjbWQ6IENvbW1hbmQsIG9wdGlvbnM6IGFueSkge1xyXG4gICAgY29uc3QgcGFzc2VkT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGxhYmVsOiBvcHRpb25zLnRpdGxlLFxyXG4gICAgICAgIHJ1bjogY21kXHJcbiAgICB9O1xyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIG9wdGlvbnMpIHBhc3NlZE9wdGlvbnNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xyXG4gICAgaWYgKCghb3B0aW9ucy5lbmFibGUgfHwgb3B0aW9ucy5lbmFibGUgPT09IHRydWUpICYmICFvcHRpb25zLnNlbGVjdClcclxuICAgICAgICBwYXNzZWRPcHRpb25zW29wdGlvbnMuZW5hYmxlID8gXCJlbmFibGVcIiA6IFwic2VsZWN0XCJdID0gKHN0YXRlOiBFZGl0b3JTdGF0ZSkgPT4gY21kKHN0YXRlKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE1lbnVJdGVtKHBhc3NlZE9wdGlvbnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXJrQWN0aXZlKHN0YXRlOiBFZGl0b3JTdGF0ZSwgdHlwZTogTWFyaykge1xyXG4gICAgY29uc3QgeyBmcm9tLCAkZnJvbSwgdG8sIGVtcHR5IH0gPSBzdGF0ZS5zZWxlY3Rpb247XHJcbiAgICBpZiAoZW1wdHkpIHJldHVybiB0eXBlLmlzSW5TZXQoc3RhdGUuc3RvcmVkTWFya3MgfHwgJGZyb20ubWFya3MoKSk7XHJcbiAgICBlbHNlIHJldHVybiBzdGF0ZS5kb2MucmFuZ2VIYXNNYXJrKGZyb20sIHRvLCB0eXBlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFya0l0ZW0obWFya1R5cGU6IGFueSwgb3B0aW9uczogYW55KSB7XHJcbiAgICBjb25zdCBwYXNzZWRPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgICAgYWN0aXZlKHN0YXRlOiBhbnkpIHsgcmV0dXJuIG1hcmtBY3RpdmUoc3RhdGUsIG1hcmtUeXBlKTsgfSxcclxuICAgICAgICBlbmFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gb3B0aW9ucykgcGFzc2VkT3B0aW9uc1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XHJcbiAgICByZXR1cm4gY21kSXRlbSh0b2dnbGVNYXJrKG1hcmtUeXBlKSwgcGFzc2VkT3B0aW9ucyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpbmtJdGVtKG1hcmtUeXBlOiBhbnkpIHtcclxuICAgIHJldHVybiBuZXcgTWVudUl0ZW0oe1xyXG4gICAgICAgIHRpdGxlOiBcIkFkZCBvciByZW1vdmUgbGlua1wiLFxyXG4gICAgICAgIGljb246IGljb25zLmxpbmssXHJcbiAgICAgICAgYWN0aXZlKHN0YXRlKSB7IHJldHVybiBtYXJrQWN0aXZlKHN0YXRlLCBtYXJrVHlwZSk7IH0sXHJcbiAgICAgICAgZW5hYmxlKHN0YXRlKSB7IHJldHVybiAhc3RhdGUuc2VsZWN0aW9uLmVtcHR5OyB9LFxyXG4gICAgICAgIHJ1bihzdGF0ZSwgZGlzcGF0Y2gsIHZpZXcpIHtcclxuICAgICAgICAgICAgaWYgKG1hcmtBY3RpdmUoc3RhdGUsIG1hcmtUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlTWFyayhtYXJrVHlwZSkoc3RhdGUsIGRpc3BhdGNoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wZW5Qcm9tcHQoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQ3JlYXRlIGEgbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgZmllbGRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogbmV3IFRleHRGaWVsZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkxpbmsgdGFyZ2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5ldyBUZXh0RmllbGQoeyBsYWJlbDogXCJUaXRsZVwiIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYXR0cnM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZU1hcmsobWFya1R5cGUsIGF0dHJzKSh2aWV3LnN0YXRlLCB2aWV3LmRpc3BhdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cmFwTGlzdEl0ZW0obm9kZVR5cGU6IE5vZGVUeXBlLCBvcHRpb25zOiBhbnkpIHtcclxuICAgIHJldHVybiBjbWRJdGVtKHdyYXBJbkxpc3Qobm9kZVR5cGUsIG9wdGlvbnMuYXR0cnMpLCBvcHRpb25zKTtcclxufVxyXG5cclxuLy8gOjogKFNjaGVtYSkg4oaSIE9iamVjdFxyXG4vLyBHaXZlbiBhIHNjaGVtYSwgbG9vayBmb3IgZGVmYXVsdCBtYXJrIGFuZCBub2RlIHR5cGVzIGluIGl0IGFuZFxyXG4vLyByZXR1cm4gYW4gb2JqZWN0IHdpdGggcmVsZXZhbnQgbWVudSBpdGVtcyByZWxhdGluZyB0byB0aG9zZSBtYXJrczpcclxuLy9cclxuLy8gKipgdG9nZ2xlU3Ryb25nYCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBBIG1lbnUgaXRlbSB0byB0b2dnbGUgdGhlIFtzdHJvbmcgbWFya10oI3NjaGVtYS1iYXNpYy5TdHJvbmdNYXJrKS5cclxuLy9cclxuLy8gKipgdG9nZ2xlRW1gKipgOiBNZW51SXRlbWBcclxuLy8gICA6IEEgbWVudSBpdGVtIHRvIHRvZ2dsZSB0aGUgW2VtcGhhc2lzIG1hcmtdKCNzY2hlbWEtYmFzaWMuRW1NYXJrKS5cclxuLy9cclxuLy8gKipgdG9nZ2xlQ29kZWAqKmA6IE1lbnVJdGVtYFxyXG4vLyAgIDogQSBtZW51IGl0ZW0gdG8gdG9nZ2xlIHRoZSBbY29kZSBmb250IG1hcmtdKCNzY2hlbWEtYmFzaWMuQ29kZU1hcmspLlxyXG4vL1xyXG4vLyAqKmB0b2dnbGVMaW5rYCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBBIG1lbnUgaXRlbSB0byB0b2dnbGUgdGhlIFtsaW5rIG1hcmtdKCNzY2hlbWEtYmFzaWMuTGlua01hcmspLlxyXG4vL1xyXG4vLyAqKmBpbnNlcnRJbWFnZWAqKmA6IE1lbnVJdGVtYFxyXG4vLyAgIDogQSBtZW51IGl0ZW0gdG8gaW5zZXJ0IGFuIFtpbWFnZV0oI3NjaGVtYS1iYXNpYy5JbWFnZSkuXHJcbi8vXHJcbi8vICoqYHdyYXBCdWxsZXRMaXN0YCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBBIG1lbnUgaXRlbSB0byB3cmFwIHRoZSBzZWxlY3Rpb24gaW4gYSBbYnVsbGV0IGxpc3RdKCNzY2hlbWEtbGlzdC5CdWxsZXRMaXN0KS5cclxuLy9cclxuLy8gKipgd3JhcE9yZGVyZWRMaXN0YCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBBIG1lbnUgaXRlbSB0byB3cmFwIHRoZSBzZWxlY3Rpb24gaW4gYW4gW29yZGVyZWQgbGlzdF0oI3NjaGVtYS1saXN0Lk9yZGVyZWRMaXN0KS5cclxuLy9cclxuLy8gKipgd3JhcEJsb2NrUXVvdGVgKipgOiBNZW51SXRlbWBcclxuLy8gICA6IEEgbWVudSBpdGVtIHRvIHdyYXAgdGhlIHNlbGVjdGlvbiBpbiBhIFtibG9jayBxdW90ZV0oI3NjaGVtYS1iYXNpYy5CbG9ja1F1b3RlKS5cclxuLy9cclxuLy8gKipgbWFrZVBhcmFncmFwaGAqKmA6IE1lbnVJdGVtYFxyXG4vLyAgIDogQSBtZW51IGl0ZW0gdG8gc2V0IHRoZSBjdXJyZW50IHRleHRibG9jayB0byBiZSBhIG5vcm1hbFxyXG4vLyAgICAgW3BhcmFncmFwaF0oI3NjaGVtYS1iYXNpYy5QYXJhZ3JhcGgpLlxyXG4vL1xyXG4vLyAqKmBtYWtlQ29kZUJsb2NrYCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBBIG1lbnUgaXRlbSB0byBzZXQgdGhlIGN1cnJlbnQgdGV4dGJsb2NrIHRvIGJlIGFcclxuLy8gICAgIFtjb2RlIGJsb2NrXSgjc2NoZW1hLWJhc2ljLkNvZGVCbG9jaykuXHJcbi8vXHJcbi8vICoqYG1ha2VIZWFkW05dYCoqYDogTWVudUl0ZW1gXHJcbi8vICAgOiBXaGVyZSBfTl8gaXMgMSB0byA2LiBNZW51IGl0ZW1zIHRvIHNldCB0aGUgY3VycmVudCB0ZXh0YmxvY2sgdG9cclxuLy8gICAgIGJlIGEgW2hlYWRpbmddKCNzY2hlbWEtYmFzaWMuSGVhZGluZykgb2YgbGV2ZWwgX05fLlxyXG4vL1xyXG4vLyAqKmBpbnNlcnRIb3Jpem9udGFsUnVsZWAqKmA6IE1lbnVJdGVtYFxyXG4vLyAgIDogQSBtZW51IGl0ZW0gdG8gaW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlLlxyXG4vL1xyXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGFsc28gY29udGFpbnMgc29tZSBwcmVmYWJyaWNhdGVkIG1lbnUgZWxlbWVudHMgYW5kXHJcbi8vIG1lbnVzLCB0aGF0IHlvdSBjYW4gdXNlIGluc3RlYWQgb2YgY29tcG9zaW5nIHlvdXIgb3duIG1lbnUgZnJvbVxyXG4vLyBzY3JhdGNoOlxyXG4vL1xyXG4vLyAqKmBpbnNlcnRNZW51YCoqYDogRHJvcGRvd25gXHJcbi8vICAgOiBBIGRyb3Bkb3duIGNvbnRhaW5pbmcgdGhlIGBpbnNlcnRJbWFnZWAgYW5kXHJcbi8vICAgICBgaW5zZXJ0SG9yaXpvbnRhbFJ1bGVgIGl0ZW1zLlxyXG4vL1xyXG4vLyAqKmB0eXBlTWVudWAqKmA6IERyb3Bkb3duYFxyXG4vLyAgIDogQSBkcm9wZG93biBjb250YWluaW5nIHRoZSBpdGVtcyBmb3IgbWFraW5nIHRoZSBjdXJyZW50XHJcbi8vICAgICB0ZXh0YmxvY2sgYSBwYXJhZ3JhcGgsIGNvZGUgYmxvY2ssIG9yIGhlYWRpbmcuXHJcbi8vXHJcbi8vICoqYGZ1bGxNZW51YCoqYDogW1tNZW51RWxlbWVudF1dYFxyXG4vLyAgIDogQW4gYXJyYXkgb2YgYXJyYXlzIG9mIG1lbnUgZWxlbWVudHMgZm9yIHVzZSBhcyB0aGUgZnVsbCBtZW51XHJcbi8vICAgICBmb3IsIGZvciBleGFtcGxlIHRoZSBbbWVudSBiYXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9zZW1pcnJvci9wcm9zZW1pcnJvci1tZW51I3VzZXItY29udGVudC1tZW51YmFyKS5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWVudUl0ZW1zKHNjaGVtYTogU2NoZW1hKSB7XHJcbiAgICBjb25zdCByOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogTWVudUl0ZW07XHJcbiAgICAgICAgaW5zZXJ0TWVudT86IGFueTtcclxuICAgICAgICBpbmxpbmVNZW51PzogYW55O1xyXG4gICAgICAgIHR5cGVNZW51PzogYW55O1xyXG4gICAgICAgIGJsb2NrTWVudT86IGFueTtcclxuICAgIH0gPSB7fTtcclxuICAgIGxldCB0eXBlO1xyXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubWFya3Muc3Ryb25nKVxyXG4gICAgICAgIHIudG9nZ2xlU3Ryb25nID0gbWFya0l0ZW0odHlwZSwgeyB0aXRsZTogXCJUb2dnbGUgc3Ryb25nIHN0eWxlXCIsIGljb246IGljb25zLnN0cm9uZyB9KTtcclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm1hcmtzLmVtKVxyXG4gICAgICAgIHIudG9nZ2xlRW0gPSBtYXJrSXRlbSh0eXBlLCB7IHRpdGxlOiBcIlRvZ2dsZSBlbXBoYXNpc1wiLCBpY29uOiBpY29ucy5lbSB9KTtcclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm1hcmtzLmNvZGUpXHJcbiAgICAgICAgci50b2dnbGVDb2RlID0gbWFya0l0ZW0odHlwZSwgeyB0aXRsZTogXCJUb2dnbGUgY29kZSBmb250XCIsIGljb246IGljb25zLmNvZGUgfSk7XHJcbiAgICBpZiAodHlwZSA9IHNjaGVtYS5tYXJrcy5saW5rKVxyXG4gICAgICAgIHIudG9nZ2xlTGluayA9IGxpbmtJdGVtKHR5cGUpO1xyXG5cclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmltYWdlKVxyXG4gICAgICAgIHIuaW5zZXJ0SW1hZ2UgPSBpbnNlcnRJbWFnZUl0ZW0odHlwZSk7XHJcbiAgICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5idWxsZXRfbGlzdClcclxuICAgICAgICByLndyYXBCdWxsZXRMaXN0ID0gd3JhcExpc3RJdGVtKHR5cGUsIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiV3JhcCBpbiBidWxsZXQgbGlzdFwiLFxyXG4gICAgICAgICAgICBpY29uOiBpY29ucy5idWxsZXRMaXN0XHJcbiAgICAgICAgfSk7XHJcbiAgICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5vcmRlcmVkX2xpc3QpXHJcbiAgICAgICAgci53cmFwT3JkZXJlZExpc3QgPSB3cmFwTGlzdEl0ZW0odHlwZSwge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJXcmFwIGluIG9yZGVyZWQgbGlzdFwiLFxyXG4gICAgICAgICAgICBpY29uOiBpY29ucy5vcmRlcmVkTGlzdFxyXG4gICAgICAgIH0pO1xyXG4gICAgaWYgKHR5cGUgPSBzY2hlbWEubm9kZXMuYmxvY2txdW90ZSlcclxuICAgICAgICByLndyYXBCbG9ja1F1b3RlID0gd3JhcEl0ZW0odHlwZSwge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJXcmFwIGluIGJsb2NrIHF1b3RlXCIsXHJcbiAgICAgICAgICAgIGljb246IGljb25zLmJsb2NrcXVvdGVcclxuICAgICAgICB9KTtcclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLnBhcmFncmFwaClcclxuICAgICAgICByLm1ha2VQYXJhZ3JhcGggPSBibG9ja1R5cGVJdGVtKHR5cGUsIHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQ2hhbmdlIHRvIHBhcmFncmFwaFwiLFxyXG4gICAgICAgICAgICBsYWJlbDogXCJQbGFpblwiXHJcbiAgICAgICAgfSk7XHJcbiAgICBpZiAodHlwZSA9IHNjaGVtYS5ub2Rlcy5jb2RlX2Jsb2NrKVxyXG4gICAgICAgIHIubWFrZUNvZGVCbG9jayA9IGJsb2NrVHlwZUl0ZW0odHlwZSwge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJDaGFuZ2UgdG8gY29kZSBibG9ja1wiLFxyXG4gICAgICAgICAgICBsYWJlbDogXCJDb2RlXCJcclxuICAgICAgICB9KTtcclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmhlYWRpbmcpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKylcclxuICAgICAgICAgICAgcltcIm1ha2VIZWFkXCIgKyBpXSA9IGJsb2NrVHlwZUl0ZW0odHlwZSwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2hhbmdlIHRvIGhlYWRpbmcgXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiTGV2ZWwgXCIgKyBpLFxyXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgbGV2ZWw6IGkgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIGlmICh0eXBlID0gc2NoZW1hLm5vZGVzLmhvcml6b250YWxfcnVsZSkge1xyXG4gICAgICAgIGNvbnN0IGhyID0gdHlwZTtcclxuICAgICAgICByLmluc2VydEhvcml6b250YWxSdWxlID0gbmV3IE1lbnVJdGVtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiSW5zZXJ0IGhvcml6b250YWwgcnVsZVwiLFxyXG4gICAgICAgICAgICBsYWJlbDogXCJIb3Jpem9udGFsIHJ1bGVcIixcclxuICAgICAgICAgICAgZW5hYmxlKHN0YXRlKSB7IHJldHVybiBjYW5JbnNlcnQoc3RhdGUsIGhyKTsgfSxcclxuICAgICAgICAgICAgcnVuKHN0YXRlLCBkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5yZXBsYWNlU2VsZWN0aW9uV2l0aChoci5jcmVhdGUoKSkpOyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3V0ID0gKGFycjogQXJyYXk8YW55PikgPT4gYXJyLmZpbHRlcih4ID0+IHgpO1xyXG4gICAgci5pbnNlcnRNZW51ID0gbmV3IERyb3Bkb3duKGN1dChbci5pbnNlcnRJbWFnZSwgci5pbnNlcnRIb3Jpem9udGFsUnVsZV0pLCB7IGxhYmVsOiBcIkluc2VydFwiIH0pO1xyXG4gICAgci50eXBlTWVudSA9IG5ldyBEcm9wZG93bihjdXQoW3IubWFrZVBhcmFncmFwaCwgci5tYWtlQ29kZUJsb2NrLCByLm1ha2VIZWFkMSAmJiBuZXcgRHJvcGRvd25TdWJtZW51KGN1dChbXHJcbiAgICAgICAgci5tYWtlSGVhZDEsIHIubWFrZUhlYWQyLCByLm1ha2VIZWFkMywgci5tYWtlSGVhZDQsIHIubWFrZUhlYWQ1LCByLm1ha2VIZWFkNlxyXG4gICAgXSksIHsgbGFiZWw6IFwiSGVhZGluZ1wiIH0pXSksIHsgbGFiZWw6IFwiVHlwZS4uLlwiIH0pO1xyXG5cclxuICAgIHIuaW5saW5lTWVudSA9IFtjdXQoW3IudG9nZ2xlU3Ryb25nLCByLnRvZ2dsZUVtLCByLnRvZ2dsZUNvZGUsIHIudG9nZ2xlTGlua10pXTtcclxuICAgIHIuYmxvY2tNZW51ID0gW2N1dChbci53cmFwQnVsbGV0TGlzdCwgci53cmFwT3JkZXJlZExpc3QsIHIud3JhcEJsb2NrUXVvdGUsIGpvaW5VcEl0ZW0sXHJcbiAgICAgICAgbGlmdEl0ZW0sIHNlbGVjdFBhcmVudE5vZGVJdGVtXSldO1xyXG4gICAgci5mdWxsTWVudSA9IHIuaW5saW5lTWVudS5jb25jYXQoW1tyLmluc2VydE1lbnUsIHIudHlwZU1lbnVdXSwgW1t1bmRvSXRlbSwgcmVkb0l0ZW1dXSwgci5ibG9ja01lbnUpO1xyXG5cclxuICAgIHJldHVybiByO1xyXG59IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xyXG5jb25zdCBwcmVmaXggPSBcIlByb3NlTWlycm9yLXByb21wdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Qcm9tcHQob3B0aW9uczogYW55KSB7XHJcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XHJcbiAgd3JhcHBlci5jbGFzc05hbWUgPSBwcmVmaXg7XHJcblxyXG4gIGNvbnN0IG1vdXNlT3V0c2lkZSA9IChlOiBhbnkpID0+IHsgaWYgKCF3cmFwcGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkgY2xvc2UoKTsgfTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlT3V0c2lkZSksIDUwKTtcclxuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlT3V0c2lkZSk7XHJcbiAgICBpZiAod3JhcHBlci5wYXJlbnROb2RlKSB3cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZG9tRmllbGRzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgZm9yIChjb25zdCBuYW1lIGluIG9wdGlvbnMuZmllbGRzKSBkb21GaWVsZHMucHVzaChvcHRpb25zLmZpZWxkc1tuYW1lXS5yZW5kZXIoKSk7XHJcblxyXG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc3VibWl0QnV0dG9uLnR5cGUgPSBcInN1Ym1pdFwiO1xyXG4gIHN1Ym1pdEJ1dHRvbi5jbGFzc05hbWUgPSBwcmVmaXggKyBcIi1zdWJtaXRcIjtcclxuICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIk9LXCI7XHJcbiAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBjYW5jZWxCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XHJcbiAgY2FuY2VsQnV0dG9uLmNsYXNzTmFtZSA9IHByZWZpeCArIFwiLWNhbmNlbFwiO1xyXG4gIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XHJcbiAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZSk7XHJcblxyXG4gIGNvbnN0IGZvcm0gPSB3cmFwcGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpKTtcclxuICBpZiAob3B0aW9ucy50aXRsZSkgZm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIikpLnRleHRDb250ZW50ID0gb3B0aW9ucy50aXRsZTtcclxuICBkb21GaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmFwcGVuZENoaWxkKGZpZWxkKTtcclxuICB9KTtcclxuICBjb25zdCBidXR0b25zID0gZm9ybS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICBidXR0b25zLmNsYXNzTmFtZSA9IHByZWZpeCArIFwiLWJ1dHRvbnNcIjtcclxuICBidXR0b25zLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XHJcbiAgYnV0dG9ucy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIiBcIikpO1xyXG4gIGJ1dHRvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcclxuXHJcbiAgY29uc3QgYm94ID0gd3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICB3cmFwcGVyLnN0eWxlLnRvcCA9ICgod2luZG93LmlubmVySGVpZ2h0IC0gYm94LmhlaWdodCkgLyAyKSArIFwicHhcIjtcclxuICB3cmFwcGVyLnN0eWxlLmxlZnQgPSAoKHdpbmRvdy5pbm5lcldpZHRoIC0gYm94LndpZHRoKSAvIDIpICsgXCJweFwiO1xyXG5cclxuICBjb25zdCBzdWJtaXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSBnZXRWYWx1ZXMob3B0aW9ucy5maWVsZHMsIGRvbUZpZWxkcyk7XHJcbiAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgIGNsb3NlKCk7XHJcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2socGFyYW1zKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBzdWJtaXQoKTtcclxuICB9KTtcclxuXHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjbG9zZSgpO1xyXG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMTMgJiYgIShlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkpKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgc3VibWl0KCk7XHJcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSA5KSB7XHJcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoIXdyYXBwZXIuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIGNsb3NlKCk7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gZm9ybS5lbGVtZW50c1swXTtcclxuICBpZiAoaW5wdXQpIChpbnB1dCBhcyBhbnkpLmZvY3VzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFZhbHVlcyhmaWVsZHM6IGFueSwgZG9tRmllbGRzOiBhbnkpIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XHJcbiAgbGV0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCksIGkgPSAwO1xyXG4gIGZvciAoY29uc3QgbmFtZSBpbiBmaWVsZHMpIHtcclxuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW25hbWVdLCBkb20gPSBkb21GaWVsZHNbaSsrXTtcclxuICAgIGNvbnN0IHZhbHVlID0gZmllbGQucmVhZChkb20pLCBiYWQgPSBmaWVsZC52YWxpZGF0ZSh2YWx1ZSk7XHJcbiAgICBpZiAoYmFkKSB7XHJcbiAgICAgIHJlcG9ydEludmFsaWQoZG9tLCBiYWQpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJlc3VsdFtuYW1lXSA9IGZpZWxkLmNsZWFuKHZhbHVlKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwb3J0SW52YWxpZChkb206IEhUTUxFbGVtZW50LCBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAvLyBGSVhNRSB0aGlzIGlzIGF3ZnVsIGFuZCBuZWVkcyBhIGxvdCBtb3JlIHdvcmtcclxuICBjb25zdCBwYXJlbnQgPSBkb20ucGFyZW50Tm9kZTtcclxuICBjb25zdCBtc2cgPSBwYXJlbnQhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xyXG4gIG1zZy5zdHlsZS5sZWZ0ID0gKGRvbS5vZmZzZXRMZWZ0ICsgZG9tLm9mZnNldFdpZHRoICsgMikgKyBcInB4XCI7XHJcbiAgbXNnLnN0eWxlLnRvcCA9IChkb20ub2Zmc2V0VG9wIC0gNSkgKyBcInB4XCI7XHJcbiAgbXNnLmNsYXNzTmFtZSA9IFwiUHJvc2VNaXJyb3ItaW52YWxpZFwiO1xyXG4gIG1zZy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgc2V0VGltZW91dCgoKSA9PiBwYXJlbnQhLnJlbW92ZUNoaWxkKG1zZyksIDE1MDApO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBGaWVsZE9wdGlvbnMgPSB7XHJcbiAgdmFsdWU/OiBhbnk7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgdmFsaWRhdGU/OiAodjogYW55KSA9PiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgb3B0aW9ucz86IEZpZWxkT3B0aW9uc1tdO1xyXG4gIGNsZWFuPzogKHY6IGFueSkgPT4gYW55O1xyXG59O1xyXG5cclxuLy8gOjotIFRoZSB0eXBlIG9mIGZpZWxkIHRoYXQgYEZpZWxkUHJvbXB0YCBleHBlY3RzIHRvIGJlIHBhc3NlZCB0byBpdC5cclxuZXhwb3J0IGNsYXNzIEZpZWxkIHtcclxuICBvcHRpb25zOiBGaWVsZE9wdGlvbnM7XHJcbiAgLy8gOjogKE9iamVjdClcclxuICAvLyBDcmVhdGUgYSBmaWVsZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLiBPcHRpb25zIHN1cHBvcnQgYnkgYWxsXHJcbiAgLy8gZmllbGQgdHlwZXMgYXJlOlxyXG4gIC8vXHJcbiAgLy8gKipgdmFsdWVgKipgOiA/YW55YFxyXG4gIC8vICAgOiBUaGUgc3RhcnRpbmcgdmFsdWUgZm9yIHRoZSBmaWVsZC5cclxuICAvL1xyXG4gIC8vICoqYGxhYmVsYCoqYDogc3RyaW5nYFxyXG4gIC8vICAgOiBUaGUgbGFiZWwgZm9yIHRoZSBmaWVsZC5cclxuICAvL1xyXG4gIC8vICoqYHJlcXVpcmVkYCoqYDogP2Jvb2xgXHJcbiAgLy8gICA6IFdoZXRoZXIgdGhlIGZpZWxkIGlzIHJlcXVpcmVkLlxyXG4gIC8vXHJcbiAgLy8gKipgdmFsaWRhdGVgKipgOiA/KGFueSkg4oaSID9zdHJpbmdgXHJcbiAgLy8gICA6IEEgZnVuY3Rpb24gdG8gdmFsaWRhdGUgdGhlIGdpdmVuIHZhbHVlLiBTaG91bGQgcmV0dXJuIGFuXHJcbiAgLy8gICAgIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgbm90IHZhbGlkLlxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpZWxkT3B0aW9ucykgeyB0aGlzLm9wdGlvbnMgPSBvcHRpb25zOyB9XHJcblxyXG4gIC8vIHJlbmRlcjo6IChzdGF0ZTogRWRpdG9yU3RhdGUsIHByb3BzOiBPYmplY3QpIOKGkiBkb20uTm9kZVxyXG4gIC8vIFJlbmRlciB0aGUgZmllbGQgdG8gdGhlIERPTS4gU2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IGFsbCBzdWJjbGFzc2VzLlxyXG5cclxuICAvLyA6OiAoZG9tLk5vZGUpIOKGkiBhbnlcclxuICAvLyBSZWFkIHRoZSBmaWVsZCdzIHZhbHVlIGZyb20gaXRzIERPTSBub2RlLlxyXG4gIHJlYWQoZG9tOiB7dmFsdWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWR9KSB7IHJldHVybiBkb20udmFsdWU7IH1cclxuXHJcbiAgLy8gOjogKGFueSkg4oaSID9zdHJpbmdcclxuICAvLyBBIGZpZWxkLXR5cGUtc3BlY2lmaWMgdmFsaWRhdGlvbiBmdW5jdGlvbi5cclxuICB2YWxpZGF0ZVR5cGUoX3ZhbHVlOiBhbnkpIHtyZXR1cm4gdW5kZWZpbmVkO31cclxuXHJcbiAgdmFsaWRhdGUodmFsdWU6IGFueSkge1xyXG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLm9wdGlvbnMucmVxdWlyZWQpXHJcbiAgICAgIHJldHVybiBcIlJlcXVpcmVkIGZpZWxkXCI7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZVR5cGUodmFsdWUpIHx8ICh0aGlzLm9wdGlvbnMudmFsaWRhdGUgJiYgdGhpcy5vcHRpb25zLnZhbGlkYXRlKHZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICBjbGVhbih2YWx1ZTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsZWFuID8gdGhpcy5vcHRpb25zLmNsZWFuKHZhbHVlKSA6IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuLy8gOjotIEEgZmllbGQgY2xhc3MgZm9yIHNpbmdsZS1saW5lIHRleHQgZmllbGRzLlxyXG5leHBvcnQgY2xhc3MgVGV4dEZpZWxkIGV4dGVuZHMgRmllbGQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMubGFiZWw7XHJcbiAgICBpbnB1dC52YWx1ZSA9IHRoaXMub3B0aW9ucy52YWx1ZSB8fCBcIlwiO1xyXG4gICAgaW5wdXQuYXV0b2NvbXBsZXRlID0gXCJvZmZcIjtcclxuICAgIHJldHVybiBpbnB1dDtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyA6Oi0gQSBmaWVsZCBjbGFzcyBmb3IgZHJvcGRvd24gZmllbGRzIGJhc2VkIG9uIGEgcGxhaW4gYDxzZWxlY3Q+YFxyXG4vLyB0YWcuIEV4cGVjdHMgYW4gb3B0aW9uIGBvcHRpb25zYCwgd2hpY2ggc2hvdWxkIGJlIGFuIGFycmF5IG9mXHJcbi8vIGB7dmFsdWU6IHN0cmluZywgbGFiZWw6IHN0cmluZ31gIG9iamVjdHMsIG9yIGEgZnVuY3Rpb24gdGFraW5nIGFcclxuLy8gYFByb3NlTWlycm9yYCBpbnN0YW5jZSBhbmQgcmV0dXJuaW5nIHN1Y2ggYW4gYXJyYXkuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RGaWVsZCBleHRlbmRzIEZpZWxkIHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gICAgdGhpcy5vcHRpb25zLm9wdGlvbnMhLmZvckVhY2goKG86IEZpZWxkT3B0aW9ucykgPT4ge1xyXG4gICAgICBjb25zdCBvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSk7XHJcbiAgICAgIG9wdC52YWx1ZSA9IG8udmFsdWU7XHJcbiAgICAgIG9wdC5zZWxlY3RlZCA9IG8udmFsdWUgPT0gdGhpcy5vcHRpb25zLnZhbHVlO1xyXG4gICAgICBvcHQubGFiZWwgPSBvLmxhYmVsO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc2VsZWN0O1xyXG4gIH1cclxufVxyXG4iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgeyBFZGl0b3JWaWV3IH0gZnJvbSBcInByb3NlbWlycm9yLXZpZXdcIjtcclxuaW1wb3J0IHsgRWRpdG9yU3RhdGUsIFBsdWdpbiB9IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gXCJAZ2l0aHViL21pbmktdGhyb3R0bGVcIjtcclxuaW1wb3J0IHsgc2V0dXBQbHVnaW5zIH0gZnJvbSBcIi4vc2V0dXBcIjtcclxuaW1wb3J0IHtjcmVhdGVTY2hlbWF9IGZyb20gXCIuL3NjaGVtYVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVNYXJrZG93blBhcnNlciB9IGZyb20gXCIuL2V4dGVuc2lvbnMvbWFya2Rvd24vcGFyc2VyXCI7XHJcbmltcG9ydCB7IGNyZWF0ZU1hcmtkb3duU2VyaWFsaXplciB9IGZyb20gXCIuL2V4dGVuc2lvbnMvbWFya2Rvd24vc2VyaWFsaXplclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb250ZW50Q29udGFpbmVyIHtcclxuICAgIHRleHRDb250ZW50OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRNYXJrZG93blNlcmlhbGl6ZXIgPSBjcmVhdGVNYXJrZG93blNlcmlhbGl6ZXIoKTtcclxuXHJcbmV4cG9ydCB7IEVkaXRvclZpZXcsIEVkaXRvclN0YXRlLCBQbHVnaW4sIGRlZmF1bHRNYXJrZG93blNlcmlhbGl6ZXIgfTtcclxuXHJcbmNvbnN0IHNjaGVtYSA9IGNyZWF0ZVNjaGVtYSgpO1xyXG5jb25zdCBwYXJzZXIgPSBjcmVhdGVNYXJrZG93blBhcnNlcihzY2hlbWEpO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFZGl0b3JTdGF0ZShvcHRzOiB7Y29udGVudDogQ29udGVudENvbnRhaW5lciB9KSB7ICBcclxuICAgIHJldHVybiBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xyXG4gICAgICAgIGRvYzogcGFyc2VyLnBhcnNlKG9wdHMuY29udGVudC50ZXh0Q29udGVudCksXHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAuLi5zZXR1cFBsdWdpbnMoeyBzY2hlbWEgfSksXHJcbiAgICAgICAgICAgIG5ldyBQbHVnaW4oe1xyXG4gICAgICAgICAgICAgICAgdmlldzogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogZGVib3VuY2UoKHZpZXc6IEVkaXRvclZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29udGVudC50ZXh0Q29udGVudCA9IGRlZmF1bHRNYXJrZG93blNlcmlhbGl6ZXIuc2VyaWFsaXplKHZpZXcuc3RhdGUuZG9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTApXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxufVxyXG4iLCIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5cclxuaW1wb3J0IHsgbWFya2Rvd25TY2hlbWEgfSBmcm9tIFwiLi9tYXJrZG93blwiO1xyXG5pbXBvcnQgeyBNYXJrU3BlYywgTm9kZVNwZWMsIFNjaGVtYSwgU2NoZW1hU3BlYyB9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xyXG5pbXBvcnQgeyBtYXRoU2NoZW1hIH0gZnJvbSBcIi4uL2V4dGVuc2lvbnMvbWF0aC9zY2hlbWFcIjtcclxuXHJcblxyXG5mdW5jdGlvbiBtZXJnZTxBMSBleHRlbmRzIHN0cmluZywgQjEgZXh0ZW5kcyBzdHJpbmcsIEEyIGV4dGVuZHMgc3RyaW5nLCBCMiBleHRlbmRzIHN0cmluZz4oczE6IFNjaGVtYVNwZWM8QTEsIEIxPiwgczI6IFNjaGVtYVNwZWM8QTIsIEIyPik6IFNjaGVtYVNwZWM8QTEgJiBBMiwgQjEgJiBCMj4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBub2Rlczoge1xyXG4gICAgICAgICAgICAuLi4oczEubm9kZXMgYXMgeyBbeCBpbiBBMV06IE5vZGVTcGVjIH0pLFxyXG4gICAgICAgICAgICAuLi4oczIubm9kZXMgYXMgeyBbeCBpbiBBMl06IE5vZGVTcGVjIH0pLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFya3M6IHtcclxuICAgICAgICAgICAgLi4uKHMxLm1hcmtzIGFzIHsgW3ggaW4gQjFdOiBNYXJrU3BlYyB9KSxcclxuICAgICAgICAgICAgLi4uKHMyLm1hcmtzIGFzIHsgW3ggaW4gQjJdOiBNYXJrU3BlYyB9KSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjaGVtYVNwZWMoKSB7XHJcbiAgICByZXR1cm4gbWVyZ2UobWFya2Rvd25TY2hlbWEsIG1hdGhTY2hlbWEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NoZW1hKCk6IFNjaGVtYSB7XHJcbiAgICByZXR1cm4gbmV3IFNjaGVtYShjcmVhdGVTY2hlbWFTcGVjKCkpO1xyXG59XHJcbiIsIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcblxyXG5pbXBvcnQgeyBNYXJrLCBOb2RlLCBTY2hlbWFTcGVjIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWFya2Rvd25TY2hlbWE6IFNjaGVtYVNwZWMgPSB7XHJcbiAgICBub2Rlczoge1xyXG4gICAgICBkb2M6IHtcclxuICAgICAgICBjb250ZW50OiBcImJsb2NrK1wiXHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICAgIHBhcmFncmFwaDoge1xyXG4gICAgICAgIGNvbnRlbnQ6IFwiaW5saW5lKlwiLFxyXG4gICAgICAgIGdyb3VwOiBcImJsb2NrXCIsXHJcbiAgICAgICAgcGFyc2VET006IFt7dGFnOiBcInBcIn1dLFxyXG4gICAgICAgIHRvRE9NKCkgeyByZXR1cm4gW1wicFwiLCAwXTsgfVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgICBibG9ja3F1b3RlOiB7XHJcbiAgICAgICAgY29udGVudDogXCJibG9jaytcIixcclxuICAgICAgICBncm91cDogXCJibG9ja1wiLFxyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJibG9ja3F1b3RlXCJ9XSxcclxuICAgICAgICB0b0RPTSgpIHsgcmV0dXJuIFtcImJsb2NrcXVvdGVcIiwgMF07IH1cclxuICAgICAgfSxcclxuICBcclxuICAgICAgaG9yaXpvbnRhbF9ydWxlOiB7XHJcbiAgICAgICAgZ3JvdXA6IFwiYmxvY2tcIixcclxuICAgICAgICBwYXJzZURPTTogW3t0YWc6IFwiaHJcIn1dLFxyXG4gICAgICAgIHRvRE9NKCkgeyByZXR1cm4gW1wiZGl2XCIsIFtcImhyXCJdXTsgfVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgICBoZWFkaW5nOiB7XHJcbiAgICAgICAgYXR0cnM6IHtsZXZlbDoge2RlZmF1bHQ6IDF9fSxcclxuICAgICAgICBjb250ZW50OiBcIih0ZXh0IHwgaW1hZ2UpKlwiLFxyXG4gICAgICAgIGdyb3VwOiBcImJsb2NrXCIsXHJcbiAgICAgICAgZGVmaW5pbmc6IHRydWUsXHJcbiAgICAgICAgcGFyc2VET006IFt7dGFnOiBcImgxXCIsIGF0dHJzOiB7bGV2ZWw6IDF9fSxcclxuICAgICAgICAgICAgICAgICAgIHt0YWc6IFwiaDJcIiwgYXR0cnM6IHtsZXZlbDogMn19LFxyXG4gICAgICAgICAgICAgICAgICAge3RhZzogXCJoM1wiLCBhdHRyczoge2xldmVsOiAzfX0sXHJcbiAgICAgICAgICAgICAgICAgICB7dGFnOiBcImg0XCIsIGF0dHJzOiB7bGV2ZWw6IDR9fSxcclxuICAgICAgICAgICAgICAgICAgIHt0YWc6IFwiaDVcIiwgYXR0cnM6IHtsZXZlbDogNX19LFxyXG4gICAgICAgICAgICAgICAgICAge3RhZzogXCJoNlwiLCBhdHRyczoge2xldmVsOiA2fX1dLFxyXG4gICAgICAgIHRvRE9NKG5vZGU6IE5vZGUpIHsgcmV0dXJuIFtcImhcIiArIG5vZGUuYXR0cnMubGV2ZWwsIDBdOyB9XHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICAgIGNvZGVfYmxvY2s6IHtcclxuICAgICAgICBjb250ZW50OiBcInRleHQqXCIsXHJcbiAgICAgICAgZ3JvdXA6IFwiYmxvY2tcIixcclxuICAgICAgICBjb2RlOiB0cnVlLFxyXG4gICAgICAgIGRlZmluaW5nOiB0cnVlLFxyXG4gICAgICAgIG1hcmtzOiBcIlwiLFxyXG4gICAgICAgIGF0dHJzOiB7cGFyYW1zOiB7ZGVmYXVsdDogXCJcIn19LFxyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJwcmVcIiwgcHJlc2VydmVXaGl0ZXNwYWNlOiBcImZ1bGxcIiwgZ2V0QXR0cnM6ICh2YWx1ZSkgPT4gKFxyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAge3BhcmFtczogbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmFtc1wiKSB8fCBcIlwifVxyXG4gICAgICAgICl9XSxcclxuICAgICAgICB0b0RPTShub2RlOiBOb2RlKSB7IHJldHVybiBbXCJwcmVcIiwgbm9kZS5hdHRycy5wYXJhbXMgPyB7XCJkYXRhLXBhcmFtc1wiOiBub2RlLmF0dHJzLnBhcmFtc30gOiB7fSwgW1wiY29kZVwiLCAwXV07IH1cclxuICAgICAgfSxcclxuICBcclxuICAgICAgb3JkZXJlZF9saXN0OiB7XHJcbiAgICAgICAgY29udGVudDogXCJsaXN0X2l0ZW0rXCIsXHJcbiAgICAgICAgZ3JvdXA6IFwiYmxvY2tcIixcclxuICAgICAgICBhdHRyczoge29yZGVyOiB7ZGVmYXVsdDogMX0sIHRpZ2h0OiB7ZGVmYXVsdDogZmFsc2V9fSxcclxuICAgICAgICBwYXJzZURPTTogW3t0YWc6IFwib2xcIiwgZ2V0QXR0cnMoZG9tKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgcmV0dXJuIHtvcmRlcjogZG9tLmhhc0F0dHJpYnV0ZShcInN0YXJ0XCIpID8gK2RvbS5nZXRBdHRyaWJ1dGUoXCJzdGFydFwiKSA6IDEsXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICB0aWdodDogZG9tLmhhc0F0dHJpYnV0ZShcImRhdGEtdGlnaHRcIil9O1xyXG4gICAgICAgIH19XSxcclxuICAgICAgICB0b0RPTShub2RlKSB7XHJcbiAgICAgICAgICByZXR1cm4gW1wib2xcIiwge3N0YXJ0OiBub2RlLmF0dHJzLm9yZGVyID09IDEgPyBudWxsIDogbm9kZS5hdHRycy5vcmRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS10aWdodFwiOiBub2RlLmF0dHJzLnRpZ2h0ID8gXCJ0cnVlXCIgOiBudWxsfSwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgICBidWxsZXRfbGlzdDoge1xyXG4gICAgICAgIGNvbnRlbnQ6IFwibGlzdF9pdGVtK1wiLFxyXG4gICAgICAgIGdyb3VwOiBcImJsb2NrXCIsXHJcbiAgICAgICAgYXR0cnM6IHt0aWdodDoge2RlZmF1bHQ6IGZhbHNlfX0sXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJ1bFwiLCBnZXRBdHRyczogKGRvbSkgPT4gKHt0aWdodDogZG9tLmhhc0F0dHJpYnV0ZShcImRhdGEtdGlnaHRcIil9KX1dLFxyXG4gICAgICAgIHRvRE9NKG5vZGU6IE5vZGUpIHsgcmV0dXJuIFtcInVsXCIsIHtcImRhdGEtdGlnaHRcIjogbm9kZS5hdHRycy50aWdodCA/IFwidHJ1ZVwiIDogbnVsbH0sIDBdOyB9XHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICAgIGxpc3RfaXRlbToge1xyXG4gICAgICAgIGNvbnRlbnQ6IFwicGFyYWdyYXBoIGJsb2NrKlwiLFxyXG4gICAgICAgIGRlZmluaW5nOiB0cnVlLFxyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJsaVwifV0sXHJcbiAgICAgICAgdG9ET00oKSB7IHJldHVybiBbXCJsaVwiLCAwXTsgfVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgICB0ZXh0OiB7XHJcbiAgICAgICAgZ3JvdXA6IFwiaW5saW5lXCJcclxuICAgICAgfSxcclxuICBcclxuICAgICAgaW1hZ2U6IHtcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgYXR0cnM6IHtcclxuICAgICAgICAgIHNyYzoge30sXHJcbiAgICAgICAgICBhbHQ6IHtkZWZhdWx0OiBudWxsfSxcclxuICAgICAgICAgIHRpdGxlOiB7ZGVmYXVsdDogbnVsbH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyb3VwOiBcImlubGluZVwiLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBwYXJzZURPTTogW3t0YWc6IFwiaW1nW3NyY11cIiwgZ2V0QXR0cnMoZG9tKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHNyYzogZG9tLmdldEF0dHJpYnV0ZShcInNyY1wiKSxcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aXRsZTogZG9tLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpLFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGFsdDogZG9tLmdldEF0dHJpYnV0ZShcImFsdFwiKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9fV0sXHJcbiAgICAgICAgdG9ET00obm9kZTogTm9kZSkgeyByZXR1cm4gW1wiaW1nXCIsIG5vZGUuYXR0cnNdOyB9XHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICAgIGhhcmRfYnJlYWs6IHtcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgZ3JvdXA6IFwiaW5saW5lXCIsXHJcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgcGFyc2VET006IFt7dGFnOiBcImJyXCJ9XSxcclxuICAgICAgICB0b0RPTSgpIHsgcmV0dXJuIFtcImJyXCJdOyB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgXHJcbiAgICBtYXJrczoge1xyXG4gICAgICBlbToge1xyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJpXCJ9LCB7dGFnOiBcImVtXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAge3N0eWxlOiBcImZvbnQtc3R5bGVcIiwgZ2V0QXR0cnM6ICh2YWx1ZSkgPT4gdmFsdWUgPT0gXCJpdGFsaWNcIiAmJiBudWxsfV0sXHJcbiAgICAgICAgdG9ET00oKSB7IHJldHVybiBbXCJlbVwiXTsgfVxyXG4gICAgICB9LFxyXG4gIFxyXG4gICAgICBzdHJvbmc6IHtcclxuICAgICAgICBwYXJzZURPTTogW3t0YWc6IFwiYlwifSwge3RhZzogXCJzdHJvbmdcIn0sXHJcbiAgICAgICAgICAgICAgICAgICB7c3R5bGU6IFwiZm9udC13ZWlnaHRcIiwgZ2V0QXR0cnM6ICh2YWx1ZSkgPT4gL14oYm9sZChlcik/fFs1LTldXFxkezIsfSkkLy50ZXN0KHZhbHVlIGFzIHN0cmluZykgJiYgbnVsbH1dLFxyXG4gICAgICAgIHRvRE9NKCkgeyByZXR1cm4gW1wic3Ryb25nXCJdOyB9XHJcbiAgICAgIH0sXHJcbiAgXHJcbiAgICAgIGxpbms6IHtcclxuICAgICAgICBhdHRyczoge1xyXG4gICAgICAgICAgaHJlZjoge30sXHJcbiAgICAgICAgICB0aXRsZToge2RlZmF1bHQ6IG51bGx9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmNsdXNpdmU6IGZhbHNlLFxyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJhW2hyZWZdXCIsIGdldEF0dHJzKGRvbSkge1xyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgcmV0dXJuIHtocmVmOiBkb20uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSwgdGl0bGU6IGRvbS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX07XHJcbiAgICAgICAgfX1dLFxyXG4gICAgICAgIHRvRE9NKG5vZGU6IE1hcmspIHsgcmV0dXJuIFtcImFcIiwgbm9kZS5hdHRyc107IH1cclxuICAgICAgfSxcclxuICBcclxuICAgICAgY29kZToge1xyXG4gICAgICAgIHBhcnNlRE9NOiBbe3RhZzogXCJjb2RlXCJ9XSxcclxuICAgICAgICB0b0RPTSgpIHsgcmV0dXJuIFtcImNvZGVcIl07IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07IiwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuLyogQWRhcHRlZCBmcm9tIE1JVCBsaWNlbnNlZCBwcm9zZW1pcnJvci1leGFtcGxlLXNldHVwIHBhY2thZ2UgKi9cclxuXHJcbmltcG9ydCB7IGtleW1hcCB9IGZyb20gXCJwcm9zZW1pcnJvci1rZXltYXBcIjtcclxuaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gXCJwcm9zZW1pcnJvci1oaXN0b3J5XCI7XHJcbmltcG9ydCB7IGJhc2VLZXltYXAgfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcclxuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XHJcbmltcG9ydCB7IGRyb3BDdXJzb3IgfSBmcm9tIFwicHJvc2VtaXJyb3ItZHJvcGN1cnNvclwiO1xyXG5pbXBvcnQgeyBnYXBDdXJzb3IgfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XHJcbmltcG9ydCB7IG1lbnVCYXIgfSBmcm9tIFwicHJvc2VtaXJyb3ItbWVudVwiO1xyXG5cclxuaW1wb3J0IHsgYnVpbGRNZW51SXRlbXMgfSBmcm9tIFwiLi9tZW51XCI7XHJcbmltcG9ydCB7IGJ1aWxkS2V5bWFwIH0gZnJvbSBcIi4va2V5bWFwXCI7XHJcbmltcG9ydCB7IGJ1aWxkSW5wdXRSdWxlcyB9IGZyb20gXCIuL2lucHV0cnVsZXNcIjtcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XHJcblxyXG5pbXBvcnQge2J1aWxkTWF0aFBsdWdpbnN9IGZyb20gXCIuL2V4dGVuc2lvbnMvbWF0aC9cIjtcclxuXHJcbmV4cG9ydCB7IGJ1aWxkTWVudUl0ZW1zLCBidWlsZEtleW1hcCwgYnVpbGRJbnB1dFJ1bGVzIH07XHJcblxyXG5cclxuLy8gICBvcHRpb25zOjotIFRoZSBmb2xsb3dpbmcgb3B0aW9ucyBhcmUgcmVjb2duaXplZDpcclxuLy9cclxuLy8gICAgIHNjaGVtYTo6IFNjaGVtYVxyXG4vLyAgICAgVGhlIHNjaGVtYSB0byBnZW5lcmF0ZSBrZXkgYmluZGluZ3MgYW5kIG1lbnUgaXRlbXMgZm9yLlxyXG4vL1xyXG4vLyAgICAgbWFwS2V5czo6ID9PYmplY3RcclxuLy8gICAgIENhbiBiZSB1c2VkIHRvIFthZGp1c3RdKCNleGFtcGxlLXNldHVwLmJ1aWxkS2V5bWFwKSB0aGUga2V5IGJpbmRpbmdzIGNyZWF0ZWQuXHJcbi8vXHJcbi8vICAgICBtZW51QmFyOjogP2Jvb2xcclxuLy8gICAgIFNldCB0byBmYWxzZSB0byBkaXNhYmxlIHRoZSBtZW51IGJhci5cclxuLy9cclxuLy8gICAgIGZsb2F0aW5nTWVudTo6ID9ib29sXHJcbi8vICAgICBTZXQgdG8gZmFsc2UgdG8gbWFrZSB0aGUgbWVudSBiYXIgbm9uLWZsb2F0aW5nLlxyXG4vL1xyXG4vLyAgICAgbWVudUNvbnRlbnQ6OiBbW01lbnVJdGVtXV1cclxuLy8gICAgIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBtZW51IGNvbnRlbnQuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFBsdWdpbnMob3B0aW9uczogeyBzY2hlbWE6IFNjaGVtYTsgbWFwS2V5cz86IGFueTsgbWVudUJhcj86IGJvb2xlYW47IGZsb2F0aW5nTWVudT86IGJvb2xlYW47IG1lbnVDb250ZW50PzogYW55IH0pIHtcclxuXHJcbiAgY29uc3QgcGx1Z2luczogUGx1Z2luPGFueSwgYW55PltdID0gW1xyXG4gICAgYnVpbGRJbnB1dFJ1bGVzKG9wdGlvbnMuc2NoZW1hKSxcclxuICAgIGtleW1hcChidWlsZEtleW1hcChvcHRpb25zLnNjaGVtYSwgb3B0aW9ucy5tYXBLZXlzKSksXHJcbiAgICBrZXltYXAoYmFzZUtleW1hcCksXHJcbiAgICBkcm9wQ3Vyc29yKCksXHJcbiAgICBnYXBDdXJzb3IoKSxcclxuICAgIC4uLmJ1aWxkTWF0aFBsdWdpbnMob3B0aW9ucy5zY2hlbWEpLFxyXG4gIF07XHJcbiAgaWYgKG9wdGlvbnMubWVudUJhciAhPT0gZmFsc2UpXHJcbiAgICBwbHVnaW5zLnB1c2gobWVudUJhcih7XHJcbiAgICAgIGZsb2F0aW5nOiBvcHRpb25zLmZsb2F0aW5nTWVudSAhPT0gZmFsc2UsXHJcbiAgICAgIGNvbnRlbnQ6IG9wdGlvbnMubWVudUNvbnRlbnQgfHwgYnVpbGRNZW51SXRlbXMob3B0aW9ucy5zY2hlbWEpLmZ1bGxNZW51XHJcbiAgICB9KSk7XHJcbiAgcGx1Z2lucy5wdXNoKGhpc3RvcnkoKSk7XHJcblxyXG4gIHJldHVybiBwbHVnaW5zLmNvbmNhdChuZXcgUGx1Z2luKHtcclxuICAgIHByb3BzOiB7XHJcbiAgICAgIGF0dHJpYnV0ZXM6IHsgY2xhc3M6IFwiUHJvc2VNaXJyb3ItZXhhbXBsZS1zZXR1cC1zdHlsZVwiIH1cclxuICAgIH1cclxuICB9KSk7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9