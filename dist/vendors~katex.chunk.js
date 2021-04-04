(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~katex"],{

/***/ "./node_modules/@iktakahiro/markdown-it-katex/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@iktakahiro/markdown-it-katex/index.js ***!
  \*************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Process inline math */
/*
Like markdown-it-simplemath, this is a stripped down, simplified version of:
https://github.com/runarberg/markdown-it-math

It differs in that it takes (a subset of) LaTeX as input and relies on KaTeX
for rendering output.
*/

/*jslint node: true */


var katex = __webpack_require__(/*! katex */ "./node_modules/katex/dist/katex.js");

// Test if potential opening or closing delimieter
// Assumes that there is a "$" at state.src[pos]
function isValidDelim(state, pos) {
    var prevChar, nextChar,
        max = state.posMax,
        can_open = true,
        can_close = true;

    prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

    // Check non-whitespace conditions for opening and closing, and
    // check that closing delimeter isn't followed by a number
    if (prevChar === 0x20/* " " */ || prevChar === 0x09/* \t */ ||
            (nextChar >= 0x30/* "0" */ && nextChar <= 0x39/* "9" */)) {
        can_close = false;
    }
    if (nextChar === 0x20/* " " */ || nextChar === 0x09/* \t */) {
        can_open = false;
    }

    return {
        can_open: can_open,
        can_close: can_close
    };
}

function math_inline(state, silent) {
    var start, match, token, res, pos, esc_count;

    if (state.src[state.pos] !== "$") { return false; }

    res = isValidDelim(state, state.pos);
    if (!res.can_open) {
        if (!silent) { state.pending += "$"; }
        state.pos += 1;
        return true;
    }

    // First check for and bypass all properly escaped delimieters
    // This loop will assume that the first leading backtick can not
    // be the first character in state.src, which is known since
    // we have found an opening delimieter already.
    start = state.pos + 1;
    match = start;
    while ( (match = state.src.indexOf("$", match)) !== -1) {
        // Found potential $, look for escapes, pos will point to
        // first non escape when complete
        pos = match - 1;
        while (state.src[pos] === "\\") { pos -= 1; }

        // Even number of escapes, potential closing delimiter found
        if ( ((match - pos) % 2) == 1 ) { break; }
        match += 1;
    }

    // No closing delimter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent) { state.pending += "$"; }
        state.pos = start;
        return true;
    }

    // Check if we have empty content, ie: $$.  Do not parse.
    if (match - start === 0) {
        if (!silent) { state.pending += "$$"; }
        state.pos = start + 1;
        return true;
    }

    // Check for valid closing delimiter
    res = isValidDelim(state, match);
    if (!res.can_close) {
        if (!silent) { state.pending += "$"; }
        state.pos = start;
        return true;
    }

    if (!silent) {
        token         = state.push('math_inline', 'math', 0);
        token.markup  = "$";
        token.content = state.src.slice(start, match);
    }

    state.pos = match + 1;
    return true;
}

function math_block(state, start, end, silent){
    var firstLine, lastLine, next, lastPos, found = false, token,
        pos = state.bMarks[start] + state.tShift[start],
        max = state.eMarks[start]

    if(pos + 2 > max){ return false; }
    if(state.src.slice(pos,pos+2)!=='$$'){ return false; }

    pos += 2;
    firstLine = state.src.slice(pos,max);

    if(silent){ return true; }
    if(firstLine.trim().slice(-2)==='$$'){
        // Single line expression
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
    }

    for(next = start; !found; ){

        next++;

        if(next >= end){ break; }

        pos = state.bMarks[next]+state.tShift[next];
        max = state.eMarks[next];

        if(pos < max && state.tShift[next] < state.blkIndent){
            // non-empty line with negative indent should stop the list:
            break;
        }

        if(state.src.slice(pos,max).trim().slice(-2)==='$$'){
            lastPos = state.src.slice(0,max).lastIndexOf('$$');
            lastLine = state.src.slice(pos,lastPos);
            found = true;
        }

    }

    state.line = next + 1;

    token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '')
    + state.getLines(start + 1, next, state.tShift[start], true)
    + (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [ start, state.line ];
    token.markup = '$$';
    return true;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

module.exports = function math_plugin(md, options) {
    // Default options

    options = options || {};

    // set KaTeX as the renderer for markdown-it-simplemath
    var katexInline = function(latex){
        options.displayMode = false;
        try{
            return katex.renderToString(latex, options);
        }
        catch(error){
            if(options.throwOnError){ console.log(error); }
            return `<span class='katex-error' title='${escapeHtml(error.toString())}'>${escapeHtml(latex)}</span>`;
        }
    };

    var inlineRenderer = function(tokens, idx){
        return katexInline(tokens[idx].content);
    };

    var katexBlock = function(latex){
        options.displayMode = true;
        try{
            return "<p class='katex-block'>" + katex.renderToString(latex, options) + "</p>";
        }
        catch(error){
            if(options.throwOnError){ console.log(error); }
            return `<p class='katex-block katex-error' title='${escapeHtml(error.toString())}'>${escapeHtml(latex)}</p>`;
        }
    }

    var blockRenderer = function(tokens, idx){
        return  katexBlock(tokens[idx].content) + '\n';
    }

    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
    });
    md.renderer.rules.math_inline = inlineRenderer;
    md.renderer.rules.math_block = blockRenderer;
};


/***/ }),

/***/ "./node_modules/katex/dist/katex.min.css":
/*!***********************************************!*\
  !*** ./node_modules/katex/dist/katex.min.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGlrdGFrYWhpcm8vbWFya2Rvd24taXQta2F0ZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2thdGV4L2Rpc3Qva2F0ZXgubWluLmNzcz80ZjcxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGlEQUFPOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLGNBQWM7O0FBRXJEO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVOztBQUVuRDtBQUNBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixzQkFBc0I7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsY0FBYztBQUNwQywwQ0FBMEMsY0FBYzs7QUFFeEQ7QUFDQTs7QUFFQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsUUFBUTs7QUFFN0I7O0FBRUEsd0JBQXdCLE9BQU87O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQkFBb0I7QUFDekQsdURBQXVELDZCQUE2QixJQUFJLGtCQUFrQjtBQUMxRztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsb0JBQW9CO0FBQ3pELGdFQUFnRSw2QkFBNkIsSUFBSSxrQkFBa0I7QUFDbkg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN01BLHVDIiwiZmlsZSI6InZlbmRvcnN+a2F0ZXguY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBQcm9jZXNzIGlubGluZSBtYXRoICovXG4vKlxuTGlrZSBtYXJrZG93bi1pdC1zaW1wbGVtYXRoLCB0aGlzIGlzIGEgc3RyaXBwZWQgZG93biwgc2ltcGxpZmllZCB2ZXJzaW9uIG9mOlxuaHR0cHM6Ly9naXRodWIuY29tL3J1bmFyYmVyZy9tYXJrZG93bi1pdC1tYXRoXG5cbkl0IGRpZmZlcnMgaW4gdGhhdCBpdCB0YWtlcyAoYSBzdWJzZXQgb2YpIExhVGVYIGFzIGlucHV0IGFuZCByZWxpZXMgb24gS2FUZVhcbmZvciByZW5kZXJpbmcgb3V0cHV0LlxuKi9cblxuLypqc2xpbnQgbm9kZTogdHJ1ZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2F0ZXggPSByZXF1aXJlKCdrYXRleCcpO1xuXG4vLyBUZXN0IGlmIHBvdGVudGlhbCBvcGVuaW5nIG9yIGNsb3NpbmcgZGVsaW1pZXRlclxuLy8gQXNzdW1lcyB0aGF0IHRoZXJlIGlzIGEgXCIkXCIgYXQgc3RhdGUuc3JjW3Bvc11cbmZ1bmN0aW9uIGlzVmFsaWREZWxpbShzdGF0ZSwgcG9zKSB7XG4gICAgdmFyIHByZXZDaGFyLCBuZXh0Q2hhcixcbiAgICAgICAgbWF4ID0gc3RhdGUucG9zTWF4LFxuICAgICAgICBjYW5fb3BlbiA9IHRydWUsXG4gICAgICAgIGNhbl9jbG9zZSA9IHRydWU7XG5cbiAgICBwcmV2Q2hhciA9IHBvcyA+IDAgPyBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MgLSAxKSA6IC0xO1xuICAgIG5leHRDaGFyID0gcG9zICsgMSA8PSBtYXggPyBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MgKyAxKSA6IC0xO1xuXG4gICAgLy8gQ2hlY2sgbm9uLXdoaXRlc3BhY2UgY29uZGl0aW9ucyBmb3Igb3BlbmluZyBhbmQgY2xvc2luZywgYW5kXG4gICAgLy8gY2hlY2sgdGhhdCBjbG9zaW5nIGRlbGltZXRlciBpc24ndCBmb2xsb3dlZCBieSBhIG51bWJlclxuICAgIGlmIChwcmV2Q2hhciA9PT0gMHgyMC8qIFwiIFwiICovIHx8IHByZXZDaGFyID09PSAweDA5LyogXFx0ICovIHx8XG4gICAgICAgICAgICAobmV4dENoYXIgPj0gMHgzMC8qIFwiMFwiICovICYmIG5leHRDaGFyIDw9IDB4MzkvKiBcIjlcIiAqLykpIHtcbiAgICAgICAgY2FuX2Nsb3NlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChuZXh0Q2hhciA9PT0gMHgyMC8qIFwiIFwiICovIHx8IG5leHRDaGFyID09PSAweDA5LyogXFx0ICovKSB7XG4gICAgICAgIGNhbl9vcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2FuX29wZW46IGNhbl9vcGVuLFxuICAgICAgICBjYW5fY2xvc2U6IGNhbl9jbG9zZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG1hdGhfaW5saW5lKHN0YXRlLCBzaWxlbnQpIHtcbiAgICB2YXIgc3RhcnQsIG1hdGNoLCB0b2tlbiwgcmVzLCBwb3MsIGVzY19jb3VudDtcblxuICAgIGlmIChzdGF0ZS5zcmNbc3RhdGUucG9zXSAhPT0gXCIkXCIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICByZXMgPSBpc1ZhbGlkRGVsaW0oc3RhdGUsIHN0YXRlLnBvcyk7XG4gICAgaWYgKCFyZXMuY2FuX29wZW4pIHtcbiAgICAgICAgaWYgKCFzaWxlbnQpIHsgc3RhdGUucGVuZGluZyArPSBcIiRcIjsgfVxuICAgICAgICBzdGF0ZS5wb3MgKz0gMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmlyc3QgY2hlY2sgZm9yIGFuZCBieXBhc3MgYWxsIHByb3Blcmx5IGVzY2FwZWQgZGVsaW1pZXRlcnNcbiAgICAvLyBUaGlzIGxvb3Agd2lsbCBhc3N1bWUgdGhhdCB0aGUgZmlyc3QgbGVhZGluZyBiYWNrdGljayBjYW4gbm90XG4gICAgLy8gYmUgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBzdGF0ZS5zcmMsIHdoaWNoIGlzIGtub3duIHNpbmNlXG4gICAgLy8gd2UgaGF2ZSBmb3VuZCBhbiBvcGVuaW5nIGRlbGltaWV0ZXIgYWxyZWFkeS5cbiAgICBzdGFydCA9IHN0YXRlLnBvcyArIDE7XG4gICAgbWF0Y2ggPSBzdGFydDtcbiAgICB3aGlsZSAoIChtYXRjaCA9IHN0YXRlLnNyYy5pbmRleE9mKFwiJFwiLCBtYXRjaCkpICE9PSAtMSkge1xuICAgICAgICAvLyBGb3VuZCBwb3RlbnRpYWwgJCwgbG9vayBmb3IgZXNjYXBlcywgcG9zIHdpbGwgcG9pbnQgdG9cbiAgICAgICAgLy8gZmlyc3Qgbm9uIGVzY2FwZSB3aGVuIGNvbXBsZXRlXG4gICAgICAgIHBvcyA9IG1hdGNoIC0gMTtcbiAgICAgICAgd2hpbGUgKHN0YXRlLnNyY1twb3NdID09PSBcIlxcXFxcIikgeyBwb3MgLT0gMTsgfVxuXG4gICAgICAgIC8vIEV2ZW4gbnVtYmVyIG9mIGVzY2FwZXMsIHBvdGVudGlhbCBjbG9zaW5nIGRlbGltaXRlciBmb3VuZFxuICAgICAgICBpZiAoICgobWF0Y2ggLSBwb3MpICUgMikgPT0gMSApIHsgYnJlYWs7IH1cbiAgICAgICAgbWF0Y2ggKz0gMTtcbiAgICB9XG5cbiAgICAvLyBObyBjbG9zaW5nIGRlbGltdGVyIGZvdW5kLiAgQ29uc3VtZSAkIGFuZCBjb250aW51ZS5cbiAgICBpZiAobWF0Y2ggPT09IC0xKSB7XG4gICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gXCIkXCI7IH1cbiAgICAgICAgc3RhdGUucG9zID0gc3RhcnQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgZW1wdHkgY29udGVudCwgaWU6ICQkLiAgRG8gbm90IHBhcnNlLlxuICAgIGlmIChtYXRjaCAtIHN0YXJ0ID09PSAwKSB7XG4gICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gXCIkJFwiOyB9XG4gICAgICAgIHN0YXRlLnBvcyA9IHN0YXJ0ICsgMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGNsb3NpbmcgZGVsaW1pdGVyXG4gICAgcmVzID0gaXNWYWxpZERlbGltKHN0YXRlLCBtYXRjaCk7XG4gICAgaWYgKCFyZXMuY2FuX2Nsb3NlKSB7XG4gICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gXCIkXCI7IH1cbiAgICAgICAgc3RhdGUucG9zID0gc3RhcnQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIHRva2VuICAgICAgICAgPSBzdGF0ZS5wdXNoKCdtYXRoX2lubGluZScsICdtYXRoJywgMCk7XG4gICAgICAgIHRva2VuLm1hcmt1cCAgPSBcIiRcIjtcbiAgICAgICAgdG9rZW4uY29udGVudCA9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgbWF0Y2gpO1xuICAgIH1cblxuICAgIHN0YXRlLnBvcyA9IG1hdGNoICsgMTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbWF0aF9ibG9jayhzdGF0ZSwgc3RhcnQsIGVuZCwgc2lsZW50KXtcbiAgICB2YXIgZmlyc3RMaW5lLCBsYXN0TGluZSwgbmV4dCwgbGFzdFBvcywgZm91bmQgPSBmYWxzZSwgdG9rZW4sXG4gICAgICAgIHBvcyA9IHN0YXRlLmJNYXJrc1tzdGFydF0gKyBzdGF0ZS50U2hpZnRbc3RhcnRdLFxuICAgICAgICBtYXggPSBzdGF0ZS5lTWFya3Nbc3RhcnRdXG5cbiAgICBpZihwb3MgKyAyID4gbWF4KXsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYoc3RhdGUuc3JjLnNsaWNlKHBvcyxwb3MrMikhPT0nJCQnKXsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBwb3MgKz0gMjtcbiAgICBmaXJzdExpbmUgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLG1heCk7XG5cbiAgICBpZihzaWxlbnQpeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmKGZpcnN0TGluZS50cmltKCkuc2xpY2UoLTIpPT09JyQkJyl7XG4gICAgICAgIC8vIFNpbmdsZSBsaW5lIGV4cHJlc3Npb25cbiAgICAgICAgZmlyc3RMaW5lID0gZmlyc3RMaW5lLnRyaW0oKS5zbGljZSgwLCAtMik7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IobmV4dCA9IHN0YXJ0OyAhZm91bmQ7ICl7XG5cbiAgICAgICAgbmV4dCsrO1xuXG4gICAgICAgIGlmKG5leHQgPj0gZW5kKXsgYnJlYWs7IH1cblxuICAgICAgICBwb3MgPSBzdGF0ZS5iTWFya3NbbmV4dF0rc3RhdGUudFNoaWZ0W25leHRdO1xuICAgICAgICBtYXggPSBzdGF0ZS5lTWFya3NbbmV4dF07XG5cbiAgICAgICAgaWYocG9zIDwgbWF4ICYmIHN0YXRlLnRTaGlmdFtuZXh0XSA8IHN0YXRlLmJsa0luZGVudCl7XG4gICAgICAgICAgICAvLyBub24tZW1wdHkgbGluZSB3aXRoIG5lZ2F0aXZlIGluZGVudCBzaG91bGQgc3RvcCB0aGUgbGlzdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc3RhdGUuc3JjLnNsaWNlKHBvcyxtYXgpLnRyaW0oKS5zbGljZSgtMik9PT0nJCQnKXtcbiAgICAgICAgICAgIGxhc3RQb3MgPSBzdGF0ZS5zcmMuc2xpY2UoMCxtYXgpLmxhc3RJbmRleE9mKCckJCcpO1xuICAgICAgICAgICAgbGFzdExpbmUgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLGxhc3RQb3MpO1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGF0ZS5saW5lID0gbmV4dCArIDE7XG5cbiAgICB0b2tlbiA9IHN0YXRlLnB1c2goJ21hdGhfYmxvY2snLCAnbWF0aCcsIDApO1xuICAgIHRva2VuLmJsb2NrID0gdHJ1ZTtcbiAgICB0b2tlbi5jb250ZW50ID0gKGZpcnN0TGluZSAmJiBmaXJzdExpbmUudHJpbSgpID8gZmlyc3RMaW5lICsgJ1xcbicgOiAnJylcbiAgICArIHN0YXRlLmdldExpbmVzKHN0YXJ0ICsgMSwgbmV4dCwgc3RhdGUudFNoaWZ0W3N0YXJ0XSwgdHJ1ZSlcbiAgICArIChsYXN0TGluZSAmJiBsYXN0TGluZS50cmltKCkgPyBsYXN0TGluZSA6ICcnKTtcbiAgICB0b2tlbi5tYXAgPSBbIHN0YXJ0LCBzdGF0ZS5saW5lIF07XG4gICAgdG9rZW4ubWFya3VwID0gJyQkJztcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmUpIHtcbiAgICByZXR1cm4gdW5zYWZlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aF9wbHVnaW4obWQsIG9wdGlvbnMpIHtcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnNcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gc2V0IEthVGVYIGFzIHRoZSByZW5kZXJlciBmb3IgbWFya2Rvd24taXQtc2ltcGxlbWF0aFxuICAgIHZhciBrYXRleElubGluZSA9IGZ1bmN0aW9uKGxhdGV4KXtcbiAgICAgICAgb3B0aW9ucy5kaXNwbGF5TW9kZSA9IGZhbHNlO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICByZXR1cm4ga2F0ZXgucmVuZGVyVG9TdHJpbmcobGF0ZXgsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGlmKG9wdGlvbnMudGhyb3dPbkVycm9yKXsgY29uc29sZS5sb2coZXJyb3IpOyB9XG4gICAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPSdrYXRleC1lcnJvcicgdGl0bGU9JyR7ZXNjYXBlSHRtbChlcnJvci50b1N0cmluZygpKX0nPiR7ZXNjYXBlSHRtbChsYXRleCl9PC9zcGFuPmA7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGlubGluZVJlbmRlcmVyID0gZnVuY3Rpb24odG9rZW5zLCBpZHgpe1xuICAgICAgICByZXR1cm4ga2F0ZXhJbmxpbmUodG9rZW5zW2lkeF0uY29udGVudCk7XG4gICAgfTtcblxuICAgIHZhciBrYXRleEJsb2NrID0gZnVuY3Rpb24obGF0ZXgpe1xuICAgICAgICBvcHRpb25zLmRpc3BsYXlNb2RlID0gdHJ1ZTtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcmV0dXJuIFwiPHAgY2xhc3M9J2thdGV4LWJsb2NrJz5cIiArIGthdGV4LnJlbmRlclRvU3RyaW5nKGxhdGV4LCBvcHRpb25zKSArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIGlmKG9wdGlvbnMudGhyb3dPbkVycm9yKXsgY29uc29sZS5sb2coZXJyb3IpOyB9XG4gICAgICAgICAgICByZXR1cm4gYDxwIGNsYXNzPSdrYXRleC1ibG9jayBrYXRleC1lcnJvcicgdGl0bGU9JyR7ZXNjYXBlSHRtbChlcnJvci50b1N0cmluZygpKX0nPiR7ZXNjYXBlSHRtbChsYXRleCl9PC9wPmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYmxvY2tSZW5kZXJlciA9IGZ1bmN0aW9uKHRva2VucywgaWR4KXtcbiAgICAgICAgcmV0dXJuICBrYXRleEJsb2NrKHRva2Vuc1tpZHhdLmNvbnRlbnQpICsgJ1xcbic7XG4gICAgfVxuXG4gICAgbWQuaW5saW5lLnJ1bGVyLmFmdGVyKCdlc2NhcGUnLCAnbWF0aF9pbmxpbmUnLCBtYXRoX2lubGluZSk7XG4gICAgbWQuYmxvY2sucnVsZXIuYWZ0ZXIoJ2Jsb2NrcXVvdGUnLCAnbWF0aF9ibG9jaycsIG1hdGhfYmxvY2ssIHtcbiAgICAgICAgYWx0OiBbICdwYXJhZ3JhcGgnLCAncmVmZXJlbmNlJywgJ2Jsb2NrcXVvdGUnLCAnbGlzdCcgXVxuICAgIH0pO1xuICAgIG1kLnJlbmRlcmVyLnJ1bGVzLm1hdGhfaW5saW5lID0gaW5saW5lUmVuZGVyZXI7XG4gICAgbWQucmVuZGVyZXIucnVsZXMubWF0aF9ibG9jayA9IGJsb2NrUmVuZGVyZXI7XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==