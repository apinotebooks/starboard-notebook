(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["codemirror"],{

/***/ "./src/components/editor/codemirror.ts":
/*!*********************************************!*\
  !*** ./src/components/editor/codemirror.ts ***!
  \*********************************************/
/*! exports provided: createCodeMirrorEditor */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCodeMirrorEditor", function() { return createCodeMirrorEditor; });
/* harmony import */ var _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @codemirror/next/view */ "./node_modules/@codemirror/next/view/dist/index.js");
/* harmony import */ var _codemirror_next_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @codemirror/next/state */ "./node_modules/@codemirror/next/state/dist/index.js");
/* harmony import */ var _codemirror_next_commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @codemirror/next/commands */ "./node_modules/@codemirror/next/commands/dist/index.js");
/* harmony import */ var _codemirror_next_matchbrackets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @codemirror/next/matchbrackets */ "./node_modules/@codemirror/next/matchbrackets/dist/index.js");
/* harmony import */ var _codemirror_next_closebrackets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @codemirror/next/closebrackets */ "./node_modules/@codemirror/next/closebrackets/dist/index.js");
/* harmony import */ var _codemirror_next_fold__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @codemirror/next/fold */ "./node_modules/@codemirror/next/fold/dist/index.js");
/* harmony import */ var _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @codemirror/next/highlight */ "./node_modules/@codemirror/next/highlight/dist/index.js");
/* harmony import */ var _codemirror_next_gutter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @codemirror/next/gutter */ "./node_modules/@codemirror/next/gutter/dist/index.js");
/* harmony import */ var _codemirror_next_comment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @codemirror/next/comment */ "./node_modules/@codemirror/next/comment/dist/index.js");
/* harmony import */ var _codemirror_next_lang_markdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @codemirror/next/lang-markdown */ "./node_modules/@codemirror/next/lang-markdown/dist/index.js");
/* harmony import */ var _codemirror_next_lang_javascript__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @codemirror/next/lang-javascript */ "./node_modules/@codemirror/next/lang-javascript/dist/index.js");
/* harmony import */ var _codemirror_next_lang_python__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @codemirror/next/lang-python */ "./node_modules/@codemirror/next/lang-python/dist/index.js");
/* harmony import */ var _codemirror_next_lang_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @codemirror/next/lang-css */ "./node_modules/@codemirror/next/lang-css/dist/index.js");
/* harmony import */ var _codemirror_next_lang_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @codemirror/next/lang-html */ "./node_modules/@codemirror/next/lang-html/dist/index.js");
/* harmony import */ var _codemirror_next_history__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @codemirror/next/history */ "./node_modules/@codemirror/next/history/dist/index.js");
/* harmony import */ var _codemirror_next_autocomplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @codemirror/next/autocomplete */ "./node_modules/@codemirror/next/autocomplete/dist/index.js");
/* harmony import */ var _codemirror_next_search__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @codemirror/next/search */ "./node_modules/@codemirror/next/search/dist/index.js");

















const x = [
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].link,
        textDecoration: 'underline'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].heading,
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].emphasis,
        fontStyle: 'italic'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].strong,
        fontWeight: 'bold'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].keyword,
        color: '#07A'
    },
    {
        tag: [
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].atom,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].bool,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].url,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].contentSeparator,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].labelName
        ],
        color: '#219'
    },
    {
        tag: [
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].literal,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].inserted
        ],
        color: '#164'
    },
    {
        tag: [_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].string],
        color: '#a11'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].deleted,
        textDecoration: 'line-through',
        color: '#a11'
    },
    {
        tag: [
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].regexp,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].escape,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].special(_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].string)
        ],
        color: '#b11'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].definition(_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].variableName),
        color: '#00f'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].local(_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].variableName),
        color: '#30a'
    },
    {
        tag: [
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].typeName,
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].namespace
        ],
        color: '#085'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].className,
        color: '#167'
    },
    {
        tag: [
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].special(_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].variableName),
            _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].macroName
        ],
        color: '#256'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].definition(_codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].propertyName),
        color: '#00c'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].comment,
        color: '#080'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].meta,
        color: '#555'
    },
    {
        tag: _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* tags */ "c"].invalid,
        color: '#f00'
    }
];
const starboardHighlighter = _codemirror_next_highlight__WEBPACK_IMPORTED_MODULE_6__[/* HighlightStyle */ "a"].define(...x);
const commonExtensions = [
    Object(_codemirror_next_matchbrackets__WEBPACK_IMPORTED_MODULE_3__[/* bracketMatching */ "a"])(),
    Object(_codemirror_next_closebrackets__WEBPACK_IMPORTED_MODULE_4__[/* closeBrackets */ "a"])(),
    Object(_codemirror_next_fold__WEBPACK_IMPORTED_MODULE_5__[/* codeFolding */ "a"])(),
    Object(_codemirror_next_gutter__WEBPACK_IMPORTED_MODULE_7__[/* lineNumbers */ "c"])(),
    Object(_codemirror_next_fold__WEBPACK_IMPORTED_MODULE_5__[/* foldGutter */ "b"])(),
    Object(_codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* highlightSpecialChars */ "i"])(),
    starboardHighlighter,
    Object(_codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* highlightActiveLine */ "h"])(),
    Object(_codemirror_next_search__WEBPACK_IMPORTED_MODULE_16__[/* highlightSelectionMatches */ "a"])(),
    Object(_codemirror_next_history__WEBPACK_IMPORTED_MODULE_14__[/* history */ "a"])(),
    _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* keymap */ "j"].of([
        ..._codemirror_next_commands__WEBPACK_IMPORTED_MODULE_2__[/* defaultKeymap */ "a"],
        ..._codemirror_next_comment__WEBPACK_IMPORTED_MODULE_8__[/* commentKeymap */ "a"],
        ..._codemirror_next_autocomplete__WEBPACK_IMPORTED_MODULE_15__[/* completionKeymap */ "c"],
        ..._codemirror_next_history__WEBPACK_IMPORTED_MODULE_14__[/* historyKeymap */ "b"],
        ..._codemirror_next_fold__WEBPACK_IMPORTED_MODULE_5__[/* foldKeymap */ "c"],
        ..._codemirror_next_search__WEBPACK_IMPORTED_MODULE_16__[/* searchKeymap */ "b"]
    ]),
    Object(_codemirror_next_autocomplete__WEBPACK_IMPORTED_MODULE_15__[/* autocompletion */ "a"])()
];
function createCodeMirrorEditor(element, cell, opts, _runtime) {
    const listen = _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* EditorView */ "d"].updateListener.of(update => {
        if (update.docChanged) {
            cell.textContent = update.state.doc.toString();
        }
    });
    const readOnlyExtension = Object(_codemirror_next_state__WEBPACK_IMPORTED_MODULE_1__[/* tagExtension */ "n"])('readOnly', _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* EditorView */ "d"].editable.of(!cell.metadata.properties.locked));
    const editorView = new _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* EditorView */ "d"]({
        state: _codemirror_next_state__WEBPACK_IMPORTED_MODULE_1__[/* EditorState */ "e"].create({
            doc: cell.textContent.length === 0 ? undefined : cell.textContent,
            extensions: [
                ...commonExtensions,
                ...opts.language === 'javascript' ? [Object(_codemirror_next_lang_javascript__WEBPACK_IMPORTED_MODULE_10__[/* javascript */ "a"])()] : [],
                ...opts.language === 'python' ? [Object(_codemirror_next_lang_python__WEBPACK_IMPORTED_MODULE_11__[/* python */ "a"])()] : [],
                ...opts.language === 'css' ? [Object(_codemirror_next_lang_css__WEBPACK_IMPORTED_MODULE_12__[/* css */ "a"])()] : [],
                ...opts.language === 'html' ? [Object(_codemirror_next_lang_html__WEBPACK_IMPORTED_MODULE_13__[/* html */ "a"])()] : [],
                ...opts.language === 'markdown' ? [Object(_codemirror_next_lang_markdown__WEBPACK_IMPORTED_MODULE_9__[/* markdown */ "a"])()] : [],
                ...opts.wordWrap === 'on' ? [_codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* EditorView */ "d"].lineWrapping] : [],
                readOnlyExtension,
                listen
            ]
        })
    });
    const setEditable = function (editor, _isLocked) {
        editor.dispatch({ reconfigure: { ['readOnly']: _codemirror_next_view__WEBPACK_IMPORTED_MODULE_0__[/* EditorView */ "d"].editable.of(!_isLocked) } });
    };
    let isLocked = cell.metadata.properties.locked;
    _runtime.controls.subscribeToCellChanges(cell.id, () => {
        if (isLocked === cell.metadata.properties.locked)
            return;
        isLocked = cell.metadata.properties.locked;
        setEditable(editorView, isLocked);
    });
    element.appendChild(editorView.dom);
    return editorView;
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvY29kZW1pcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQW9EQSxNQUFNLElBQUk7QUFBQSxJQUNOO0FBQUEsUUFDSSxLQUFLLHdFQUFLLElBRGQ7QUFBQSxRQUVJLGdCQUFnQixXQUZwQjtBQUFBLEtBRE07QUFBQSxJQUtOO0FBQUEsUUFDSSxLQUFLLHdFQUFLLE9BRGQ7QUFBQSxRQUVJLGdCQUFnQixXQUZwQjtBQUFBLFFBR0ksWUFBWSxNQUhoQjtBQUFBLEtBTE07QUFBQSxJQVVOO0FBQUEsUUFDSSxLQUFLLHdFQUFLLFFBRGQ7QUFBQSxRQUVJLFdBQVcsUUFGZjtBQUFBLEtBVk07QUFBQSxJQWNOO0FBQUEsUUFDSSxLQUFLLHdFQUFLLE1BRGQ7QUFBQSxRQUVJLFlBQVksTUFGaEI7QUFBQSxLQWRNO0FBQUEsSUFrQk47QUFBQSxRQUNJLEtBQUssd0VBQUssT0FEZDtBQUFBLFFBRUksT0FBTyxNQUZYO0FBQUEsS0FsQk07QUFBQSxJQXNCTjtBQUFBLFFBQ0ksS0FBSztBQUFBLFlBQUMsd0VBQUssSUFBTjtBQUFBLFlBQVksd0VBQUssSUFBakI7QUFBQSxZQUF1Qix3RUFBSyxHQUE1QjtBQUFBLFlBQWlDLHdFQUFLLGdCQUF0QztBQUFBLFlBQXdELHdFQUFLLFNBQTdEO0FBQUEsU0FEVDtBQUFBLFFBRUksT0FBTyxNQUZYO0FBQUEsS0F0Qk07QUFBQSxJQTBCTjtBQUFBLFFBQ0ksS0FBSztBQUFBLFlBQUMsd0VBQUssT0FBTjtBQUFBLFlB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QjtBQUFBLFNBREcsQ0FEWDtBQUFBLEtBRGUsQ0FBbkIsQ0FUMks7QUFBQSxJQThCM0ssTUFBTSxjQUFjLFVBQVUsTUFBVixFQUE4QixTQUE5QixFQUE0RDtBQUFBLFFBQzVFLE9BQU8sUUFBUCxDQUFnQixFQUNaLGFBQWEsRUFDVCxDQUFDLFVBQUQsR0FBYyx5RUFBVyxRQUFYLENBQW9CLEVBQXBCLENBQXVCLENBQUMsU0FBeEIsQ0FETCxFQURELEVBQWhCLEVBRDRFO0FBQUEsS0FBaEYsQ0E5QjJLO0FBQUEsSUFzQzNLLElBQUksV0FBZ0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixNQUE3RCxDQXRDMks7QUFBQSxJQXdDM0ssU0FBUyxRQUFULENBQWtCLHNCQUFsQixDQUF5QyxLQUFLLEVBQTlDLEVBQWtELE1BQUs7QUFBQSxRQUduRCxJQUFJLGFBQWEsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixNQUExQztBQUFBLFlBQWtELE9BSEM7QUFBQSxRQUluRCxXQUFXLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsTUFBcEMsQ0FKbUQ7QUFBQSxRQUtuRCxZQUFZLFVBQVosRUFBd0IsUUFBeEIsRUFMbUQ7QUFBQSxLQUF2RCxFQXhDMks7QUFBQSxJQWlEM0ssUUFBUSxXQUFSLENBQW9CLFdBQVcsR0FBL0IsRUFqRDJLO0FBQUEsSUFrRDNLLE9BQU8sVUFBUCxDQWxEMks7QUFBQSxDIiwiZmlsZSI6ImNvZGVtaXJyb3IuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgeyBFZGl0b3JWaWV3LCBrZXltYXAsIGhpZ2hsaWdodFNwZWNpYWxDaGFycywgaGlnaGxpZ2h0QWN0aXZlTGluZSB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L3ZpZXdcIjtcclxuaW1wb3J0IHsgRWRpdG9yU3RhdGUsIHRhZ0V4dGVuc2lvbiB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L3N0YXRlXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZhdWx0S2V5bWFwIH0gZnJvbSBcIkBjb2RlbWlycm9yL25leHQvY29tbWFuZHNcIjtcclxuXHJcbmltcG9ydCB7IGJyYWNrZXRNYXRjaGluZyB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L21hdGNoYnJhY2tldHNcIjtcclxuaW1wb3J0IHsgY2xvc2VCcmFja2V0cyB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L2Nsb3NlYnJhY2tldHNcIjtcclxuaW1wb3J0IHsgY29kZUZvbGRpbmcsIGZvbGRLZXltYXAsIGZvbGRHdXR0ZXIgfSBmcm9tIFwiQGNvZGVtaXJyb3IvbmV4dC9mb2xkXCI7XHJcblxyXG5pbXBvcnQgeyBIaWdobGlnaHRTdHlsZSwgVGFnLCB0YWdzIH0gZnJvbSBcIkBjb2RlbWlycm9yL25leHQvaGlnaGxpZ2h0XCI7XHJcbmltcG9ydCB7IGxpbmVOdW1iZXJzIH0gZnJvbSBcIkBjb2RlbWlycm9yL25leHQvZ3V0dGVyXCI7XHJcbmltcG9ydCB7IGNvbW1lbnRLZXltYXAgfSBmcm9tIFwiQGNvZGVtaXJyb3IvbmV4dC9jb21tZW50XCI7XHJcblxyXG5pbXBvcnQgeyBtYXJrZG93biB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L2xhbmctbWFya2Rvd25cIjtcclxuaW1wb3J0IHsgamF2YXNjcmlwdCB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L2xhbmctamF2YXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBweXRob24gfSBmcm9tIFwiQGNvZGVtaXJyb3IvbmV4dC9sYW5nLXB5dGhvblwiO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwiQGNvZGVtaXJyb3IvbmV4dC9sYW5nLWNzc1wiO1xyXG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcIkBjb2RlbWlycm9yL25leHQvbGFuZy1odG1sXCI7XHJcbmltcG9ydCB7IGhpc3RvcnksIGhpc3RvcnlLZXltYXAgfSBmcm9tIFwiQGNvZGVtaXJyb3IvbmV4dC9oaXN0b3J5XCI7XHJcbmltcG9ydCB7IGF1dG9jb21wbGV0aW9uLCBjb21wbGV0aW9uS2V5bWFwIH0gZnJvbSBcIkBjb2RlbWlycm9yL25leHQvYXV0b2NvbXBsZXRlXCI7XHJcbmltcG9ydCB7IHNlYXJjaEtleW1hcCwgaGlnaGxpZ2h0U2VsZWN0aW9uTWF0Y2hlcyB9IGZyb20gXCJAY29kZW1pcnJvci9uZXh0L3NlYXJjaFwiO1xyXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XHJcbmltcG9ydCB7IFJ1bnRpbWUgfSBmcm9tIFwiLi4vLi4vcnVudGltZVwiO1xyXG5cclxuLy8gZnVuY3Rpb24gY3JlYXRlSlNDb21wbGV0aW9uKCkge1xyXG4vLyAgICAgcmV0dXJuIGNvbXBsZXRlRnJvbUxpc3QoXHJcbi8vICAgICAgICAgXCJicmVhayBjYXNlIGNhdGNoIGNsYXNzIGNvbnN0IGNvbnRpbnVlIGRlYnVnZ2VyIGRlZmF1bHQgZGVsZXRlIGRvIGVsc2UgZW51bSBleHBvcnQgZXh0ZW5kcyBmYWxzZSBmaW5hbGx5IGZvciBmdW5jdGlvbiBpZiBpbXBsZW1lbnRzIGltcG9ydCBpbnRlcmZhY2UgaW4gaW5zdGFuY2VvZiBsZXQgbmV3IHBhY2thZ2UgcHJpdmF0ZSBwcm90ZWN0ZWQgcHVibGljIHJldHVybiBzdGF0aWMgc3VwZXIgc3dpdGNoIHRoaXMgdGhyb3cgdHJ1ZSB0cnkgdHlwZW9mIHZhciB2b2lkIHdoaWxlIHdpdGggeWllbGRcIi5zcGxpdChcIiBcIilcclxuLy8gICAgICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykpKTtcclxuLy8gfVxyXG5cclxuLy8gU2hhcmVkIGJldHdlZW4gYWxsIGVkaXRvciBpbnN0YW5jZXNcclxuLy8gY29uc3Qgc3RhcmJvYXJkSGlnaGxpZ2h0ZXIgPSBIaWdobGlnaHRTdHlsZS5kZWZpbmUoe1xyXG4vLyAgICAgZGVsZXRlZDoge3RleHREZWNvcmF0aW9uOiBcImxpbmUtdGhyb3VnaFwifSxcclxuLy8gICAgIGluc2VydGVkOiB7dGV4dERlY29yYXRpb246IFwidW5kZXJsaW5lXCJ9LFxyXG4vLyAgICAgbGluazoge3RleHREZWNvcmF0aW9uOiBcInVuZGVybGluZVwifSxcclxuLy8gICAgIHN0cm9uZzoge2ZvbnRXZWlnaHQ6IFwiYm9sZFwifSxcclxuLy8gICAgIGVtcGhhc2lzOiB7Zm9udFN0eWxlOiBcIml0YWxpY1wifSxcclxuLy8gICAgIGtleXdvcmQ6IHtjb2xvcjogXCIjMDdBXCJ9LFxyXG4vLyAgICAgXCJhdG9tLCBib29sXCI6IHtjb2xvcjogXCIjMjE5XCJ9LFxyXG4vLyAgICAgbnVtYmVyOiB7Y29sb3I6IFwiIzE2NFwifSxcclxuLy8gICAgIHN0cmluZzoge2NvbG9yOiBcIiNiMTFcIn0sXHJcbi8vICAgICBcInJlZ2V4cCwgZXNjYXBlLCBzdHJpbmcjMlwiOiB7Y29sb3I6IFwiI2MyMlwifSxcclxuLy8gICAgIFwidmFyaWFibGVOYW1lIGRlZmluaXRpb25cIjoge2NvbG9yOiBcIiM0MDZcIn0sXHJcbi8vICAgICB0eXBlTmFtZToge2NvbG9yOiBcIiMwODVcIn0sXHJcbi8vICAgICBjbGFzc05hbWU6IHtjb2xvcjogXCIjMTY3XCJ9LFxyXG4vLyAgICAgXCJuYW1lIzJcIjoge2NvbG9yOiBcIiMyNTZcIn0sXHJcbi8vICAgICBcInByb3BlcnR5TmFtZSBkZWZpbml0aW9uXCI6IHtjb2xvcjogXCIjMDBjXCJ9LFxyXG4vLyAgICAgY29tbWVudDoge2NvbG9yOiBcIiMwODBcIn0sXHJcbi8vICAgICBtZXRhOiB7Y29sb3I6IFwiIzU1NVwifSxcclxuLy8gICAgIGludmFsaWQ6IHtjb2xvcjogXCIjZjAwXCJ9LFxyXG4vLyB9KTtcclxuXHJcbmNvbnN0IHggPSBbXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiB0YWdzLmxpbmssXHJcbiAgICAgICAgdGV4dERlY29yYXRpb246IFwidW5kZXJsaW5lXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiB0YWdzLmhlYWRpbmcsXHJcbiAgICAgICAgdGV4dERlY29yYXRpb246IFwidW5kZXJsaW5lXCIsXHJcbiAgICAgICAgZm9udFdlaWdodDogXCJib2xkXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiB0YWdzLmVtcGhhc2lzLFxyXG4gICAgICAgIGZvbnRTdHlsZTogXCJpdGFsaWNcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IHRhZ3Muc3Ryb25nLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6IFwiYm9sZFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhZzogdGFncy5rZXl3b3JkLFxyXG4gICAgICAgIGNvbG9yOiBcIiMwN0FcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IFt0YWdzLmF0b20sIHRhZ3MuYm9vbCwgdGFncy51cmwsIHRhZ3MuY29udGVudFNlcGFyYXRvciwgdGFncy5sYWJlbE5hbWVdLFxyXG4gICAgICAgIGNvbG9yOiBcIiMyMTlcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IFt0YWdzLmxpdGVyYWwsIHRhZ3MuaW5zZXJ0ZWRdLFxyXG4gICAgICAgIGNvbG9yOiBcIiMxNjRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IFt0YWdzLnN0cmluZ10sXHJcbiAgICAgICAgY29sb3I6IFwiI2ExMVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhZzogdGFncy5kZWxldGVkLFxyXG4gICAgICAgIHRleHREZWNvcmF0aW9uOiBcImxpbmUtdGhyb3VnaFwiLFxyXG4gICAgICAgIGNvbG9yOiBcIiNhMTFcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IFt0YWdzLnJlZ2V4cCwgdGFncy5lc2NhcGUsIHRhZ3Muc3BlY2lhbCh0YWdzLnN0cmluZyldLFxyXG4gICAgICAgIGNvbG9yOiBcIiNiMTFcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IHRhZ3MuZGVmaW5pdGlvbih0YWdzLnZhcmlhYmxlTmFtZSksXHJcbiAgICAgICAgY29sb3I6IFwiIzAwZlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhZzogdGFncy5sb2NhbCh0YWdzLnZhcmlhYmxlTmFtZSksXHJcbiAgICAgICAgY29sb3I6IFwiIzMwYVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhZzogW3RhZ3MudHlwZU5hbWUsIHRhZ3MubmFtZXNwYWNlXSxcclxuICAgICAgICBjb2xvcjogXCIjMDg1XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiB0YWdzLmNsYXNzTmFtZSxcclxuICAgICAgICBjb2xvcjogXCIjMTY3XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiBbdGFncy5zcGVjaWFsKHRhZ3MudmFyaWFibGVOYW1lKSwgdGFncy5tYWNyb05hbWVdLFxyXG4gICAgICAgIGNvbG9yOiBcIiMyNTZcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IHRhZ3MuZGVmaW5pdGlvbih0YWdzLnByb3BlcnR5TmFtZSksXHJcbiAgICAgICAgY29sb3I6IFwiIzAwY1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhZzogdGFncy5jb21tZW50LFxyXG4gICAgICAgIGNvbG9yOiBcIiMwODBcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWc6IHRhZ3MubWV0YSxcclxuICAgICAgICBjb2xvcjogXCIjNTU1XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFnOiB0YWdzLmludmFsaWQsXHJcbiAgICAgICAgY29sb3I6IFwiI2YwMFwiXHJcbiAgICB9XHJcbl0gYXMgeyB0YWc6IFRhZztbcHJvcDogc3RyaW5nXTogYW55IH1bXTtcclxuXHJcblxyXG5jb25zdCBzdGFyYm9hcmRIaWdobGlnaHRlciA9IEhpZ2hsaWdodFN0eWxlLmRlZmluZSguLi54KTtcclxuXHJcbi8vIFNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXNcclxuY29uc3QgY29tbW9uRXh0ZW5zaW9ucyA9IFtcclxuICAgIGJyYWNrZXRNYXRjaGluZygpLFxyXG4gICAgY2xvc2VCcmFja2V0cygpLFxyXG4gICAgY29kZUZvbGRpbmcoKSxcclxuICAgIGxpbmVOdW1iZXJzKCksXHJcbiAgICBmb2xkR3V0dGVyKCksXHJcbiAgICBoaWdobGlnaHRTcGVjaWFsQ2hhcnMoKSxcclxuXHJcbiAgICBzdGFyYm9hcmRIaWdobGlnaHRlcixcclxuICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmUoKSxcclxuICAgIGhpZ2hsaWdodFNlbGVjdGlvbk1hdGNoZXMoKSxcclxuICAgIGhpc3RvcnkoKSxcclxuXHJcbiAgICBrZXltYXAub2YoW1xyXG4gICAgICAgIC4uLmRlZmF1bHRLZXltYXAsXHJcbiAgICAgICAgLi4uY29tbWVudEtleW1hcCxcclxuICAgICAgICAuLi5jb21wbGV0aW9uS2V5bWFwLFxyXG4gICAgICAgIC4uLmhpc3RvcnlLZXltYXAsXHJcbiAgICAgICAgLi4uZm9sZEtleW1hcCxcclxuICAgICAgICAuLi5zZWFyY2hLZXltYXAsXHJcbiAgICBdKSxcclxuICAgIGF1dG9jb21wbGV0aW9uKCksXHJcbl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29kZU1pcnJvckVkaXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY2VsbDogQ2VsbCwgb3B0czogeyBsYW5ndWFnZT86IHN0cmluZzsgd29yZFdyYXA/OiBcIm9mZlwiIHwgXCJvblwiIHwgXCJ3b3JkV3JhcENvbHVtblwiIHwgXCJib3VuZGVkXCIgfSwgX3J1bnRpbWU6IFJ1bnRpbWUpIHtcclxuICAgIGNvbnN0IGxpc3RlbiA9IEVkaXRvclZpZXcudXBkYXRlTGlzdGVuZXIub2YodXBkYXRlID0+IHtcclxuICAgICAgICBpZiAodXBkYXRlLmRvY0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IHVwZGF0ZS5zdGF0ZS5kb2MudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZWFkT25seUV4dGVuc2lvbiA9IHRhZ0V4dGVuc2lvbigncmVhZE9ubHknLCBFZGl0b3JWaWV3LmVkaXRhYmxlLm9mKCFjZWxsLm1ldGFkYXRhLnByb3BlcnRpZXMubG9ja2VkKSk7XHJcblxyXG4gICAgY29uc3QgZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGU6IEVkaXRvclN0YXRlLmNyZWF0ZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2M6IGNlbGwudGV4dENvbnRlbnQubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogY2VsbC50ZXh0Q29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbW1vbkV4dGVuc2lvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihvcHRzLmxhbmd1YWdlID09PSBcImphdmFzY3JpcHRcIiA/IFtqYXZhc2NyaXB0KCldIDogW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4ob3B0cy5sYW5ndWFnZSA9PT0gXCJweXRob25cIiA/IFtweXRob24oKV0gOiBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihvcHRzLmxhbmd1YWdlID09PSBcImNzc1wiID8gW2NzcygpXSA6IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG9wdHMubGFuZ3VhZ2UgPT09IFwiaHRtbFwiID8gW2h0bWwoKV0gOiBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihvcHRzLmxhbmd1YWdlID09PSBcIm1hcmtkb3duXCIgPyBbbWFya2Rvd24oKV0gOiBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihvcHRzLndvcmRXcmFwID09PSBcIm9uXCIgPyBbRWRpdG9yVmlldy5saW5lV3JhcHBpbmddIDogW10pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHlFeHRlbnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgc2V0RWRpdGFibGUgPSBmdW5jdGlvbiAoZWRpdG9yOiBFZGl0b3JWaWV3LCBfaXNMb2NrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBlZGl0b3IuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICByZWNvbmZpZ3VyZToge1xyXG4gICAgICAgICAgICAgICAgWydyZWFkT25seSddOiBFZGl0b3JWaWV3LmVkaXRhYmxlLm9mKCFfaXNMb2NrZWQpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgaXNMb2NrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBjZWxsLm1ldGFkYXRhLnByb3BlcnRpZXMubG9ja2VkO1xyXG5cclxuICAgIF9ydW50aW1lLmNvbnRyb2xzLnN1YnNjcmliZVRvQ2VsbENoYW5nZXMoY2VsbC5pZCwgKCkgPT4ge1xyXG4gICAgICAgIC8vIE5vdGUgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiBBTEwgdGV4dCBjaGFuZ2VzLCBzbyBhbnkgbGV0dGVyIHR5cGVkLFxyXG4gICAgICAgIC8vIGl0J3MgcHJvYmFibHkgYmV0dGVyIGZvciBwZXJmb3JtYW5jZSB0byBvbmx5IGFzayBjbSB0byBjaGFuZ2UgaXQncyBlZGl0YWJsZSBzdGF0ZSBpZiBpdCBhY3R1YWxseSBjaGFuZ2VkLlxyXG4gICAgICAgIGlmIChpc0xvY2tlZCA9PT0gY2VsbC5tZXRhZGF0YS5wcm9wZXJ0aWVzLmxvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlzTG9ja2VkID0gY2VsbC5tZXRhZGF0YS5wcm9wZXJ0aWVzLmxvY2tlZDtcclxuICAgICAgICBzZXRFZGl0YWJsZShlZGl0b3JWaWV3LCBpc0xvY2tlZCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChlZGl0b3JWaWV3LmRvbSk7XHJcbiAgICByZXR1cm4gZWRpdG9yVmlldztcclxufSJdLCJzb3VyY2VSb290IjoiIn0=