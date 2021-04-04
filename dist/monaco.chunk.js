(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["monaco"],{

/***/ "./src/components/editor/monaco.ts":
/*!*****************************************!*\
  !*** ./src/components/editor/monaco.ts ***!
  \*****************************************/
/*! exports provided: createMonacoEditor */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMonacoEditor", function() { return createMonacoEditor; });
/* harmony import */ var monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! monaco-editor/esm/vs/editor/editor.api */ "./include-loader!./node_modules/monaco-editor/esm/vs/editor/editor.api.js");
/* harmony import */ var monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _github_mini_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @github/mini-throttle */ "./node_modules/@github/mini-throttle/dist/index.js");


monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["editor"].defineTheme('starboard-theme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
        'editor.foreground': '#000000',
        'editor.background': '#fbfbfb',
        'editorCursor.foreground': '#00d1b2ba',
        'editor.lineHighlightBackground': '#33333308',
        'editorLineNumber.foreground': '#ccc',
        'editor.selectionBackground': '#00000010',
        'editor.inactiveSelectionBackground': '#88000008',
        'scrollbarSlider.background': '#ff0000',
        'scrollbarSlider.hoverBackground': '#00d1b280',
        'scrollbarSlider.activeBackground': '#00d1b2f0'
    }
});
monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["languages"].typescript.javascriptDefaults.addExtraLib(`
        /**
         * Interprets a template literal as an HTML template that can efficiently
         * render to and update a container.
         */
        declare const html: (strings: TemplateStringsArray, ...values: unknown[]) => any ;
        /**
        * Interprets a template literal as an SVG template that can efficiently
        * render to and update a container.
        */
        declare const svg: (strings: TemplateStringsArray, ...values: unknown[]) => any;
        declare const litHtml: any;
        declare const runtime: any;
`, 'global.d.ts');
function makeEditorResizeToFitContent(editor) {
    editor.onDidChangeModelDecorations(() => {
        requestAnimationFrame(updateEditorHeight);
    });
    let prevHeight = 0;
    let prevWidth = 0;
    let aboveEl = document.querySelector('.cell-controls-above');
    const updateEditorHeight = () => {
        const editorElement = editor.getDomNode();
        if (!editorElement) {
            return;
        }
        const height = editor.getContentHeight();
        const width = aboveEl.offsetWidth - 2;
        if (prevHeight !== height || prevWidth !== width) {
            prevHeight = height;
            prevWidth = width;
            editorElement.style.width = `${ width }px`;
            editorElement.style.height = `${ height }px`;
            editor.layout({
                width,
                height
            });
        }
    };
    requestAnimationFrame(() => updateEditorHeight());
}
function addEditorKeyboardShortcuts(editor, emit, cellId) {
    editor.addAction({
        id: 'run-cell',
        label: 'Run Cell',
        keybindings: [monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyMod"].CtrlCmd | monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyCode"].Enter],
        contextMenuGroupId: 'starboard',
        contextMenuOrder: 0,
        run: _ed => emit({
            id: cellId,
            type: 'RUN_CELL',
            focusNextCell: false,
            insertNewCell: false
        })
    });
    editor.addAction({
        id: 'run-cell-and-next',
        label: 'Run Cell and Select Below',
        keybindings: [monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyMod"].Shift | monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyCode"].Enter],
        contextMenuGroupId: 'starboard',
        contextMenuOrder: 1,
        run: _ed => emit({
            id: cellId,
            type: 'RUN_CELL',
            focusNextCell: true,
            insertNewCell: false
        })
    });
    editor.addAction({
        id: 'run-cell-and-insert-cell',
        label: 'Run Cell and Insert Cell',
        keybindings: [monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyMod"].Alt | monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["KeyCode"].Enter],
        contextMenuGroupId: 'starboard',
        contextMenuOrder: 2,
        run: _ed => emit({
            id: cellId,
            type: 'RUN_CELL',
            focusNextCell: true,
            insertNewCell: true
        })
    });
}
function createMonacoEditor(element, cell, opts, runtime) {
    const editor = monaco_editor_esm_vs_editor_editor_api__WEBPACK_IMPORTED_MODULE_0__["editor"].create(element, {
        value: cell.textContent,
        language: opts.language,
        readOnly: cell.metadata.properties.locked,
        minimap: { enabled: false },
        fontSize: 14,
        theme: 'starboard-theme',
        scrollbar: {
            useShadows: false,
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            alwaysConsumeMouseWheel: false
        },
        overviewRulerBorder: false,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        wordWrap: opts.wordWrap
    });
    const setEditable = function (editor, _isLocked) {
        editor.updateOptions({ readOnly: !!_isLocked });
    };
    let isLocked = cell.metadata.properties.locked;
    runtime.controls.subscribeToCellChanges(cell.id, () => {
        if (isLocked === cell.metadata.properties.locked)
            return;
        setEditable(editor, cell.metadata.properties.locked);
    });
    const resizeDebounced = Object(_github_mini_throttle__WEBPACK_IMPORTED_MODULE_1__[/* debounce */ "a"])(() => editor.layout(), 100);
    window.addEventListener('resize', resizeDebounced);
    makeEditorResizeToFitContent(editor);
    addEditorKeyboardShortcuts(editor, runtime.controls.emit, cell.id);
    const model = editor.getModel();
    if (model) {
        model.onDidChangeContent(_event => {
            cell.textContent = model.getValue();
        });
    } else {
        console.error('Monaco editor model was not truthy, change detection will not work');
    }
    return editor;
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9lZGl0b3IvbW9uYWNvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQSw4RUFBYyxXQUFkLENBQTBCLGlCQUExQixFQUE2QztBQUFBLElBQ3pDLE1BQU0sSUFEbUM7QUFBQSxJQUV6QyxTQUFTLElBRmdDO0FBQUEsSUFHekMsT0FBTyxFQUhrQztBQUFBLElBSXpDLFFBQVE7QUFBQSxRQUNKLHFCQUFxQixTQURqQjtBQUFBLFFBRUoscUJBQXFCLFNBRmpCO0FBQUEsUUFHSiwyQkFBMkIsV0FIdkI7QUFBQSxRQUlKLGtDQUFrQyxXQUo5QjtBQUFBLFFBS0osK0JBQStCLE1BTDNCO0FBQUEsUUFNSiw4QkFBOEIsV0FOMUI7QUFBQSxRQU9KLHNDQUFzQyxXQVBsQztBQUFBLFFBUUosOEJBQThCLFNBUjFCO0FBQUEsUUFTSixtQ0FBbUMsV0FUL0I7QUFBQSxRQVVKLG9DQUFvQyxXQVZoQztBQUFBLEtBSmlDO0FBQUEsQ0FBN0MsRUFSQTtBQTBCQSxpRkFBaUIsVUFBakIsQ0FBNEIsa0JBQTVCLENBQStDLFdBQS9DLENBQTJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBM0QsRUFhRyxhQWJILEVBMUJBO0FBeUNBLFNBQVMsNEJBQVQsQ0FBc0MsTUFBdEMsRUFBaUY7QUFBQSxJQUM3RSxPQUFPLDJCQUFQLENBQW1DLE1BQUs7QUFBQSxRQUNwQyxzQkFBc0Isa0JBQXRCLEVBRG9DO0FBQUEsS0FBeEMsRUFENkU7QUFBQSxJQUs3RSxJQUFJLGFBQWEsQ0FBakIsQ0FMNkU7QUFBQSxJQU03RSxJQUFJLFlBQVksQ0FBaEIsQ0FONkU7QUFBQSxJQU83RSxJQUFJLFVBQVUsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFkLENBUDZFO0FBQUEsSUFRN0Us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LENBQXdCLFFBQXhCLEVBQWtDLGVBQWxDLEVBdEMrSjtBQUFBLElBd0MvSiw2QkFBNkIsTUFBN0IsRUF4QytKO0FBQUEsSUF5Qy9KLDJCQUEyQixNQUEzQixFQUFtQyxRQUFRLFFBQVIsQ0FBaUIsSUFBcEQsRUFBMEQsS0FBSyxFQUEvRCxFQXpDK0o7QUFBQSxJQTJDL0osTUFBTSxRQUFRLE9BQU8sUUFBUCxFQUFkLENBM0MrSjtBQUFBLElBNEMvSixJQUFJLEtBQUosRUFBVTtBQUFBLFFBQ04sTUFBTSxrQkFBTixDQUEwQixNQUFELElBQVc7QUFBQSxZQUNoQyxLQUFLLFdBQUwsR0FBbUIsTUFBTSxRQUFOLEVBQW5CLENBRGdDO0FBQUEsU0FBcEMsRUFETTtBQUFBLEtBQVYsTUFJTztBQUFBLFFBQ0gsUUFBUSxLQUFSLENBQWMsb0VBQWQsRUFERztBQUFBLEtBaER3SjtBQUFBLElBb0QvSixPQUFPLE1BQVAsQ0FwRCtKO0FBQUEsQyIsImZpbGUiOiJtb25hY28uY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHBzOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgKiBhcyBtb25hY28gZnJvbSAnbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci5hcGknO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ0BnaXRodWIvbWluaS10aHJvdHRsZSc7XHJcbmltcG9ydCB7IFdvcmRXcmFwU2V0dGluZyB9IGZyb20gJy4uL3RleHRFZGl0b3InO1xyXG5pbXBvcnQgeyBDZWxsRXZlbnQsIENlbGwgfSBmcm9tICcuLi8uLi90eXBlcyc7XHJcbmltcG9ydCB7IFJ1bnRpbWUgfSBmcm9tICcuLi8uLi9ydW50aW1lJztcclxuXHJcbmV4cG9ydCB0eXBlIE1vbmFjb0VkaXRvclN1cHBvcnRlZExhbmd1YWdlID0gXCJqYXZhc2NyaXB0XCIgfCBcInR5cGVzY3JpcHRcIiB8IFwibWFya2Rvd25cIiB8IFwiY3NzXCIgfCBcImh0bWxcIiB8IFwicHl0aG9uXCI7XHJcblxyXG5tb25hY28uZWRpdG9yLmRlZmluZVRoZW1lKCdzdGFyYm9hcmQtdGhlbWUnLCB7XHJcbiAgICBiYXNlOiAndnMnLFxyXG4gICAgaW5oZXJpdDogdHJ1ZSxcclxuICAgIHJ1bGVzOiBbXSxcclxuICAgIGNvbG9yczoge1xyXG4gICAgICAgICdlZGl0b3IuZm9yZWdyb3VuZCc6ICcjMDAwMDAwJyxcclxuICAgICAgICAnZWRpdG9yLmJhY2tncm91bmQnOiAnI2ZiZmJmYicsXHJcbiAgICAgICAgJ2VkaXRvckN1cnNvci5mb3JlZ3JvdW5kJzogJyMwMGQxYjJiYScsXHJcbiAgICAgICAgJ2VkaXRvci5saW5lSGlnaGxpZ2h0QmFja2dyb3VuZCc6ICcjMzMzMzMzMDgnLFxyXG4gICAgICAgICdlZGl0b3JMaW5lTnVtYmVyLmZvcmVncm91bmQnOiAnI2NjYycsXHJcbiAgICAgICAgJ2VkaXRvci5zZWxlY3Rpb25CYWNrZ3JvdW5kJzogJyMwMDAwMDAxMCcsXHJcbiAgICAgICAgJ2VkaXRvci5pbmFjdGl2ZVNlbGVjdGlvbkJhY2tncm91bmQnOiAnIzg4MDAwMDA4JyxcclxuICAgICAgICAnc2Nyb2xsYmFyU2xpZGVyLmJhY2tncm91bmQnOiAnI2ZmMDAwMCcsXHJcbiAgICAgICAgJ3Njcm9sbGJhclNsaWRlci5ob3ZlckJhY2tncm91bmQnOiAnIzAwZDFiMjgwJyxcclxuICAgICAgICAnc2Nyb2xsYmFyU2xpZGVyLmFjdGl2ZUJhY2tncm91bmQnOiAnIzAwZDFiMmYwJyxcclxuICAgIH1cclxufSk7XHJcblxyXG5tb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKGBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBIVE1MIHRlbXBsYXRlIHRoYXQgY2FuIGVmZmljaWVudGx5XHJcbiAgICAgICAgICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVjbGFyZSBjb25zdCBodG1sOiAoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnZhbHVlczogdW5rbm93bltdKSA9PiBhbnkgO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gU1ZHIHRlbXBsYXRlIHRoYXQgY2FuIGVmZmljaWVudGx5XHJcbiAgICAgICAgKiByZW5kZXIgdG8gYW5kIHVwZGF0ZSBhIGNvbnRhaW5lci5cclxuICAgICAgICAqL1xyXG4gICAgICAgIGRlY2xhcmUgY29uc3Qgc3ZnOiAoc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnZhbHVlczogdW5rbm93bltdKSA9PiBhbnk7XHJcbiAgICAgICAgZGVjbGFyZSBjb25zdCBsaXRIdG1sOiBhbnk7XHJcbiAgICAgICAgZGVjbGFyZSBjb25zdCBydW50aW1lOiBhbnk7XHJcbmAsICdnbG9iYWwuZC50cycpO1xyXG5cclxuZnVuY3Rpb24gbWFrZUVkaXRvclJlc2l6ZVRvRml0Q29udGVudChlZGl0b3I6IG1vbmFjby5lZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yKSB7XHJcbiAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbERlY29yYXRpb25zKCgpID0+IHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRWRpdG9ySGVpZ2h0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBwcmV2SGVpZ2h0ID0gMDtcclxuICAgIGxldCBwcmV2V2lkdGggPSAwO1xyXG4gICAgbGV0IGFib3ZlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNlbGwtY29udHJvbHMtYWJvdmVcIikhIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgdXBkYXRlRWRpdG9ySGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVkaXRvckVsZW1lbnQgPSBlZGl0b3IuZ2V0RG9tTm9kZSgpO1xyXG4gICAgICAgIGlmICghZWRpdG9yRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGVkaXRvci5nZXRDb250ZW50SGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIC8vIFRvdGFsIGhhY2suLiB0aGVzZSBlbGVtZW50cyBhcmUgbmV2ZXIgaGlkZGVuIGFuZCB3aWxsIGhhdmUgdGhlIGRlc2lyZWQgd2lkdGguXHJcbiAgICAgICAgLy8gLTIgdG8gYWNjb3VudCBmb3IgdGhlIDFweCBib3JkZXIuLlxyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gYWJvdmVFbC5vZmZzZXRXaWR0aCAtIDI7XHJcbiAgICAgICAgaWYgKHByZXZIZWlnaHQgIT09IGhlaWdodCB8fCBwcmV2V2lkdGggIT09IHdpZHRoKSB7XHJcbiAgICAgICAgICAgIHByZXZIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHByZXZXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICBlZGl0b3JFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4gICAgICAgICAgICBlZGl0b3JFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XHJcbiAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoe3dpZHRoLCBoZWlnaHR9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB1cGRhdGVFZGl0b3JIZWlnaHQoKSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRFZGl0b3JLZXlib2FyZFNob3J0Y3V0cyhcclxuICAgIGVkaXRvcjogbW9uYWNvLmVkaXRvci5JU3RhbmRhbG9uZUNvZGVFZGl0b3IsXHJcbiAgICBlbWl0OiAoZXZlbnQ6IENlbGxFdmVudCkgPT4gdm9pZCxcclxuICAgIGNlbGxJZDogc3RyaW5nKSB7XHJcblxyXG4gICAgZWRpdG9yLmFkZEFjdGlvbih7XHJcbiAgICAgICAgaWQ6ICdydW4tY2VsbCcsXHJcbiAgICAgICAgbGFiZWw6ICdSdW4gQ2VsbCcsXHJcbiAgICAgICAga2V5YmluZGluZ3M6IFttb25hY28uS2V5TW9kLkN0cmxDbWQgfCBtb25hY28uS2V5Q29kZS5FbnRlcl0sXHJcblxyXG4gICAgICAgIGNvbnRleHRNZW51R3JvdXBJZDogJ3N0YXJib2FyZCcsXHJcbiAgICAgICAgY29udGV4dE1lbnVPcmRlcjogMCxcclxuICAgICAgICBydW46IChfZWQpID0+IGVtaXQoe1xyXG4gICAgICAgICAgICBpZDogY2VsbElkLCB0eXBlOiBcIlJVTl9DRUxMXCIsIGZvY3VzTmV4dENlbGw6IGZhbHNlLCBpbnNlcnROZXdDZWxsOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBlZGl0b3IuYWRkQWN0aW9uKHtcclxuICAgICAgICBpZDogJ3J1bi1jZWxsLWFuZC1uZXh0JyxcclxuICAgICAgICBsYWJlbDogJ1J1biBDZWxsIGFuZCBTZWxlY3QgQmVsb3cnLFxyXG4gICAgICAgIGtleWJpbmRpbmdzOiBbbW9uYWNvLktleU1vZC5TaGlmdCB8IG1vbmFjby5LZXlDb2RlLkVudGVyXSxcclxuXHJcbiAgICAgICAgY29udGV4dE1lbnVHcm91cElkOiAnc3RhcmJvYXJkJyxcclxuICAgICAgICBjb250ZXh0TWVudU9yZGVyOiAxLFxyXG4gICAgICAgIHJ1bjogKF9lZCkgPT4gZW1pdCh7XHJcbiAgICAgICAgICAgIGlkOiBjZWxsSWQsIHR5cGU6IFwiUlVOX0NFTExcIiwgZm9jdXNOZXh0Q2VsbDogdHJ1ZSwgaW5zZXJ0TmV3Q2VsbDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZWRpdG9yLmFkZEFjdGlvbih7XHJcbiAgICAgICAgaWQ6ICdydW4tY2VsbC1hbmQtaW5zZXJ0LWNlbGwnLFxyXG4gICAgICAgIGxhYmVsOiAnUnVuIENlbGwgYW5kIEluc2VydCBDZWxsJyxcclxuICAgICAgICBrZXliaW5kaW5nczogW21vbmFjby5LZXlNb2QuQWx0IHwgbW9uYWNvLktleUNvZGUuRW50ZXJdLFxyXG5cclxuICAgICAgICBjb250ZXh0TWVudUdyb3VwSWQ6ICdzdGFyYm9hcmQnLFxyXG4gICAgICAgIGNvbnRleHRNZW51T3JkZXI6IDIsXHJcbiAgICAgICAgcnVuOiAoX2VkKSA9PiBlbWl0KHtcclxuICAgICAgICAgICAgaWQ6IGNlbGxJZCwgdHlwZTogXCJSVU5fQ0VMTFwiLCBmb2N1c05leHRDZWxsOiB0cnVlLCBpbnNlcnROZXdDZWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vbmFjb0VkaXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY2VsbDogQ2VsbCwgb3B0czoge2xhbmd1YWdlPzogTW9uYWNvRWRpdG9yU3VwcG9ydGVkTGFuZ3VhZ2U7IHdvcmRXcmFwPzogV29yZFdyYXBTZXR0aW5nfSwgcnVudGltZTogUnVudGltZSkge1xyXG4gICAgY29uc3QgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoZWxlbWVudCwge1xyXG4gICAgICAgIHZhbHVlOiBjZWxsLnRleHRDb250ZW50LFxyXG4gICAgICAgIGxhbmd1YWdlOiBvcHRzLmxhbmd1YWdlLFxyXG4gICAgICAgIHJlYWRPbmx5OiBjZWxsLm1ldGFkYXRhLnByb3BlcnRpZXMubG9ja2VkLFxyXG4gICAgICAgIG1pbmltYXA6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgICB0aGVtZTogXCJzdGFyYm9hcmQtdGhlbWVcIixcclxuICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgICAgdXNlU2hhZG93czogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcnRpY2FsOiAnYXV0bycsXHJcbiAgICAgICAgICAgIGhvcml6b250YWw6ICdhdXRvJyxcclxuICAgICAgICAgICAgdmVydGljYWxTY3JvbGxiYXJTaXplOiAxMCxcclxuICAgICAgICAgICAgaG9yaXpvbnRhbFNjcm9sbGJhclNpemU6IDEwLFxyXG4gICAgICAgICAgICBhbHdheXNDb25zdW1lTW91c2VXaGVlbDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdmVydmlld1J1bGVyQm9yZGVyOiBmYWxzZSxcclxuICAgICAgICBsaW5lTnVtYmVyc01pbkNoYXJzOiAzLFxyXG4gICAgICAgIHNjcm9sbEJleW9uZExhc3RMaW5lOiBmYWxzZSxcclxuICAgICAgICB3b3JkV3JhcDogb3B0cy53b3JkV3JhcFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2V0RWRpdGFibGUgPSBmdW5jdGlvbihlZGl0b3I6IG1vbmFjby5lZGl0b3IuSVN0YW5kYWxvbmVDb2RlRWRpdG9yLCBfaXNMb2NrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBlZGl0b3IudXBkYXRlT3B0aW9ucyh7cmVhZE9ubHk6ICEhX2lzTG9ja2VkfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBpc0xvY2tlZDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGNlbGwubWV0YWRhdGEucHJvcGVydGllcy5sb2NrZWQ7XHJcblxyXG4gICAgcnVudGltZS5jb250cm9scy5zdWJzY3JpYmVUb0NlbGxDaGFuZ2VzKGNlbGwuaWQsICgpID0+IHtcclxuICAgICAgICAvLyBOb3RlIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb24gQUxMIHRleHQgY2hhbmdlcywgc28gYW55IGxldHRlciB0eXBlZCxcclxuICAgICAgICAvLyBpdCdzIHByb2JhYmx5IGJldHRlciBmb3IgcGVyZm9ybWFuY2UgdG8gb25seSBhc2sgTW9uYWNvIHRvIGNoYW5nZSBpdCdzIGVkaXRhYmxlIHN0YXRlIGlmIGl0IGFjdHVhbGx5IGNoYW5nZWQuXHJcbiAgICAgICAgaWYgKGlzTG9ja2VkID09PSBjZWxsLm1ldGFkYXRhLnByb3BlcnRpZXMubG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgc2V0RWRpdGFibGUoZWRpdG9yLCBjZWxsLm1ldGFkYXRhLnByb3BlcnRpZXMubG9ja2VkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZURlYm91bmNlZCA9IGRlYm91bmNlKCgpID0+IGVkaXRvci5sYXlvdXQoKSwgMTAwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZURlYm91bmNlZCk7XHJcblxyXG4gICAgbWFrZUVkaXRvclJlc2l6ZVRvRml0Q29udGVudChlZGl0b3IpO1xyXG4gICAgYWRkRWRpdG9yS2V5Ym9hcmRTaG9ydGN1dHMoZWRpdG9yLCBydW50aW1lLmNvbnRyb2xzLmVtaXQsIGNlbGwuaWQpO1xyXG5cclxuICAgIGNvbnN0IG1vZGVsID0gZWRpdG9yLmdldE1vZGVsKCk7XHJcbiAgICBpZiAobW9kZWwpe1xyXG4gICAgICAgIG1vZGVsLm9uRGlkQ2hhbmdlQ29udGVudCgoX2V2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBtb2RlbC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9uYWNvIGVkaXRvciBtb2RlbCB3YXMgbm90IHRydXRoeSwgY2hhbmdlIGRldGVjdGlvbiB3aWxsIG5vdCB3b3JrXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlZGl0b3I7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9