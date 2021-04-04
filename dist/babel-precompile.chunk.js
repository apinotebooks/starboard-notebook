(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["babel-precompile"],{

/***/ "./src/cellTypes/javascript/precompileModule.ts":
/*!******************************************************!*\
  !*** ./src/cellTypes/javascript/precompileModule.ts ***!
  \******************************************************/
/*! exports provided: precompileJavascriptCode */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "precompileJavascriptCode", function() { return precompileJavascriptCode; });
/* harmony import */ var _babel_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/parser */ "./node_modules/@babel/parser/lib/index.js");
/* harmony import */ var _babel_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_walk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-walk */ "./node_modules/babel-walk/lib/index.js");
/* harmony import */ var babel_walk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_walk__WEBPACK_IMPORTED_MODULE_1__);
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/** This file is dynamically loaded so the initial bundle can be smaller */


/**
 * Precompile takes a cell's code as a string, parses it and transforms it.
 * In particular it wraps everything in an async function, handles the var->global magic,
 * and its output can be used to set $_ to the last statement.
 */
async function precompileJavascriptCode(content) {
    let wrapped = '(async () => {' + content + '\n})()';
    const root = Object(_babel_parser__WEBPACK_IMPORTED_MODULE_0__["parse"])(wrapped, { ecmaVersion: 8 });
    const body = root.program.body[0].expression.callee.body;
    const isTopLevel = (node) => {
        return body.body.indexOf(node) !== -1;
    };
    const changes = [];
    const visitors = {
        ClassDeclaration(node) {
            if (isTopLevel(node))
                changes.push({
                    text: node.id.name + '=',
                    start: node.start,
                    end: node.start,
                });
        },
        FunctionDeclaration(node) {
            changes.push({
                text: node.id.name + '=',
                start: node.start,
                end: node.start,
            });
            return node;
        },
        VariableDeclaration(node) {
            if (node.kind !== 'var' || !isTopLevel(node))
                return;
            return; // disable the var->global magic
            const onlyOneDeclaration = node.declarations.length === 1;
            changes.push({
                text: onlyOneDeclaration ? 'void' : 'void (',
                start: node.start,
                end: node.start + node.kind.length,
            });
            for (const declaration of node.declarations) {
                if (!declaration.init) {
                    changes.push({
                        text: '(',
                        start: declaration.start,
                        end: declaration.start,
                    });
                    changes.push({
                        text: '=undefined)',
                        start: declaration.end,
                        end: declaration.end,
                    });
                    continue;
                }
                changes.push({
                    text: '(',
                    start: declaration.start,
                    end: declaration.start,
                });
                changes.push({
                    text: ')',
                    start: declaration.end,
                    end: declaration.end,
                });
            }
            if (!onlyOneDeclaration) {
                const last = node.declarations[node.declarations.length - 1];
                changes.push({ text: ')', start: last.end, end: last.end });
            }
        },
    };
    const walk = Object(babel_walk__WEBPACK_IMPORTED_MODULE_1__["simple"])(visitors);
    walk(root, undefined);
    const last = body.body[body.body.length - 1];
    if (last === undefined) {
        return content;
    }
    if (last.type === 'ExpressionStatement') {
        changes.push({
            text: 'return {returnValue: (',
            start: last.start,
            end: last.start,
        });
        if (wrapped[last.end - 1] !== ';')
            changes.push({ text: ')}', start: last.end, end: last.end });
        else
            changes.push({ text: ')}', start: last.end - 1, end: last.end - 1 });
        // We need to offset changes in the final expression with 22, the length of 
        // `return {returnValue: (`
        changes.forEach((change, i) => {
            if (i >= changes.length - 2)
                return;
            if (change.start >= last.start && change.start < last.end) {
                change.start += 22;
                change.end += 22;
            }
        });
    }
    while (changes.length) {
        const change = changes.pop();
        wrapped =
            wrapped.substr(0, change.start) +
                change.text +
                wrapped.substr(change.end);
    }
    // console.log("Cell code\n", wrapped);
    return wrapped;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2VsbFR5cGVzL2phdmFzY3JpcHQvcHJlY29tcGlsZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzsrREFFK0Q7QUFFL0QsMkVBQTJFO0FBRXJDO0FBQ0Y7QUFFcEM7Ozs7R0FJRztBQUNJLEtBQUssVUFBVSx3QkFBd0IsQ0FBQyxPQUFlO0lBQzFELElBQUksT0FBTyxHQUFHLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDcEQsTUFBTSxJQUFJLEdBQUcsMkRBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLElBQUksR0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUVsRSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFO1FBQy9CLE9BQVEsSUFBSSxDQUFDLElBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztJQUUxQixNQUFNLFFBQVEsR0FBRztRQUNmLGdCQUFnQixDQUFDLElBQVM7WUFDeEIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHO29CQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDaEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELG1CQUFtQixDQUFDLElBQVM7WUFDM0IsT0FBTyxDQUFDLElB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O0tBQzlCO0lBRUQsdUNBQXVDO0lBQ3ZDLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJmaWxlIjoiYmFiZWwtcHJlY29tcGlsZS5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cHM6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbi8qKiBUaGlzIGZpbGUgaXMgZHluYW1pY2FsbHkgbG9hZGVkIHNvIHRoZSBpbml0aWFsIGJ1bmRsZSBjYW4gYmUgc21hbGxlciAqL1xyXG5cclxuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiQGJhYmVsL3BhcnNlclwiO1xyXG5pbXBvcnQgeyBzaW1wbGUgfSBmcm9tIFwiYmFiZWwtd2Fsa1wiO1xyXG5cclxuLyoqXHJcbiAqIFByZWNvbXBpbGUgdGFrZXMgYSBjZWxsJ3MgY29kZSBhcyBhIHN0cmluZywgcGFyc2VzIGl0IGFuZCB0cmFuc2Zvcm1zIGl0LlxyXG4gKiBJbiBwYXJ0aWN1bGFyIGl0IHdyYXBzIGV2ZXJ5dGhpbmcgaW4gYW4gYXN5bmMgZnVuY3Rpb24sIGhhbmRsZXMgdGhlIHZhci0+Z2xvYmFsIG1hZ2ljLFxyXG4gKiBhbmQgaXRzIG91dHB1dCBjYW4gYmUgdXNlZCB0byBzZXQgJF8gdG8gdGhlIGxhc3Qgc3RhdGVtZW50LlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWNvbXBpbGVKYXZhc2NyaXB0Q29kZShjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgbGV0IHdyYXBwZWQgPSAnKGFzeW5jICgpID0+IHsnICsgY29udGVudCArICdcXG59KSgpJztcclxuICAgIGNvbnN0IHJvb3QgPSBwYXJzZSh3cmFwcGVkLCB7IGVjbWFWZXJzaW9uOiA4IH0gYXMgYW55KTtcclxuICAgIGNvbnN0IGJvZHkgPSAocm9vdC5wcm9ncmFtLmJvZHlbMF0gYXMgYW55KS5leHByZXNzaW9uLmNhbGxlZS5ib2R5O1xyXG5cclxuICAgIGNvbnN0IGlzVG9wTGV2ZWwgPSAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiAoYm9keS5ib2R5IGFzIEFycmF5PGFueT4pLmluZGV4T2Yobm9kZSkgIT09IC0xO1xyXG4gICAgfTtcclxuICBcclxuICAgIGNvbnN0IGNoYW5nZXM6IGFueVtdID0gW107XHJcbiAgXHJcbiAgICBjb25zdCB2aXNpdG9ycyA9IHtcclxuICAgICAgQ2xhc3NEZWNsYXJhdGlvbihub2RlOiBhbnkpIHtcclxuICAgICAgICBpZiAoaXNUb3BMZXZlbChub2RlKSlcclxuICAgICAgICAgIGNoYW5nZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHRleHQ6IG5vZGUuaWQubmFtZSArICc9JyxcclxuICAgICAgICAgICAgc3RhcnQ6IG5vZGUuc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogbm9kZS5zdGFydCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IGFueSkge1xyXG4gICAgICAgIGNoYW5nZXMucHVzaCh7XHJcbiAgICAgICAgICB0ZXh0OiBub2RlLmlkLm5hbWUgKyAnPScsXHJcbiAgICAgICAgICBzdGFydDogbm9kZS5zdGFydCxcclxuICAgICAgICAgIGVuZDogbm9kZS5zdGFydCxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfSxcclxuICAgICAgVmFyaWFibGVEZWNsYXJhdGlvbihub2RlOiBhbnkpIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAobm9kZS5raW5kICE9PSAndmFyJyB8fCAhaXNUb3BMZXZlbChub2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybjsgLy8gZGlzYWJsZSB0aGUgdmFyLT5nbG9iYWwgbWFnaWNcclxuXHJcbiAgICAgICAgY29uc3Qgb25seU9uZURlY2xhcmF0aW9uID0gbm9kZS5kZWNsYXJhdGlvbnMubGVuZ3RoID09PSAxO1xyXG4gICAgICAgIGNoYW5nZXMucHVzaCh7XHJcbiAgICAgICAgICB0ZXh0OiBvbmx5T25lRGVjbGFyYXRpb24gPyAndm9pZCcgOiAndm9pZCAoJyxcclxuICAgICAgICAgIHN0YXJ0OiBub2RlLnN0YXJ0LFxyXG4gICAgICAgICAgZW5kOiBub2RlLnN0YXJ0ICsgbm9kZS5raW5kLmxlbmd0aCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IGRlY2xhcmF0aW9uIG9mIG5vZGUuZGVjbGFyYXRpb25zKSB7XHJcbiAgICAgICAgICBpZiAoIWRlY2xhcmF0aW9uLmluaXQpIHtcclxuICAgICAgICAgICAgY2hhbmdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnKCcsXHJcbiAgICAgICAgICAgICAgc3RhcnQ6IGRlY2xhcmF0aW9uLnN0YXJ0LFxyXG4gICAgICAgICAgICAgIGVuZDogZGVjbGFyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjaGFuZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgIHRleHQ6ICc9dW5kZWZpbmVkKScsXHJcbiAgICAgICAgICAgICAgc3RhcnQ6IGRlY2xhcmF0aW9uLmVuZCxcclxuICAgICAgICAgICAgICBlbmQ6IGRlY2xhcmF0aW9uLmVuZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2hhbmdlcy5wdXNoKHtcclxuICAgICAgICAgICAgdGV4dDogJygnLFxyXG4gICAgICAgICAgICBzdGFydDogZGVjbGFyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgICAgIGVuZDogZGVjbGFyYXRpb24uc3RhcnQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNoYW5nZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHRleHQ6ICcpJyxcclxuICAgICAgICAgICAgc3RhcnQ6IGRlY2xhcmF0aW9uLmVuZCxcclxuICAgICAgICAgICAgZW5kOiBkZWNsYXJhdGlvbi5lbmQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFvbmx5T25lRGVjbGFyYXRpb24pIHtcclxuICAgICAgICAgIGNvbnN0IGxhc3QgPSBub2RlLmRlY2xhcmF0aW9uc1tub2RlLmRlY2xhcmF0aW9ucy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgIGNoYW5nZXMucHVzaCh7IHRleHQ6ICcpJywgc3RhcnQ6IGxhc3QuZW5kLCBlbmQ6IGxhc3QuZW5kIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgXHJcbiAgICBjb25zdCB3YWxrID0gc2ltcGxlKHZpc2l0b3JzKTtcclxuICAgIHdhbGsocm9vdCwgdW5kZWZpbmVkKTtcclxuICBcclxuICAgIGNvbnN0IGxhc3QgPSBib2R5LmJvZHlbYm9keS5ib2R5Lmxlbmd0aCAtIDFdO1xyXG4gICAgaWYgKGxhc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuICBcclxuICAgIGlmIChsYXN0LnR5cGUgPT09ICdFeHByZXNzaW9uU3RhdGVtZW50Jykge1xyXG4gICAgICBjaGFuZ2VzLnB1c2goe1xyXG4gICAgICAgIHRleHQ6ICdyZXR1cm4ge3JldHVyblZhbHVlOiAoJyxcclxuICAgICAgICBzdGFydDogbGFzdC5zdGFydCxcclxuICAgICAgICBlbmQ6IGxhc3Quc3RhcnQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAod3JhcHBlZFtsYXN0LmVuZCAtIDFdICE9PSAnOycpXHJcbiAgICAgICAgY2hhbmdlcy5wdXNoKHsgdGV4dDogJyl9Jywgc3RhcnQ6IGxhc3QuZW5kLCBlbmQ6IGxhc3QuZW5kIH0pO1xyXG4gICAgICBlbHNlIGNoYW5nZXMucHVzaCh7IHRleHQ6ICcpfScsIHN0YXJ0OiBsYXN0LmVuZCAtIDEsIGVuZDogbGFzdC5lbmQgLSAxIH0pO1xyXG4gIFxyXG4gICAgICAvLyBXZSBuZWVkIHRvIG9mZnNldCBjaGFuZ2VzIGluIHRoZSBmaW5hbCBleHByZXNzaW9uIHdpdGggMjIsIHRoZSBsZW5ndGggb2YgXHJcbiAgICAgIC8vIGByZXR1cm4ge3JldHVyblZhbHVlOiAoYFxyXG4gICAgICBjaGFuZ2VzLmZvckVhY2goKGNoYW5nZSwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChpID49IGNoYW5nZXMubGVuZ3RoIC0gMikgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjaGFuZ2Uuc3RhcnQgPj0gbGFzdC5zdGFydCAmJiBjaGFuZ2Uuc3RhcnQgPCBsYXN0LmVuZCkge1xyXG4gICAgICAgICAgY2hhbmdlLnN0YXJ0ICs9IDIyO1xyXG4gICAgICAgICAgY2hhbmdlLmVuZCArPSAyMjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgd2hpbGUgKGNoYW5nZXMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXMucG9wKCkgYXMgYW55O1xyXG4gICAgICB3cmFwcGVkID1cclxuICAgICAgICB3cmFwcGVkLnN1YnN0cigwLCBjaGFuZ2Uuc3RhcnQpICtcclxuICAgICAgICBjaGFuZ2UudGV4dCArXHJcbiAgICAgICAgd3JhcHBlZC5zdWJzdHIoY2hhbmdlLmVuZCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNlbGwgY29kZVxcblwiLCB3cmFwcGVkKTtcclxuICAgIHJldHVybiB3cmFwcGVkO1xyXG4gIH1cclxuICAiXSwic291cmNlUm9vdCI6IiJ9