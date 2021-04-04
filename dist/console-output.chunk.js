(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["console-output"],{

/***/ "./src/components/output/consoleOutputModule.ts":
/*!******************************************************!*\
  !*** ./src/components/output/consoleOutputModule.ts ***!
  \******************************************************/
/*! exports provided: renderStandardConsoleOutputIntoElement */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderStandardConsoleOutputIntoElement", function() { return renderStandardConsoleOutputIntoElement; });
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var console_feed_modern__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! console-feed-modern */ "./node_modules/console-feed-modern/lib/index.js");
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* eslint @typescript-eslint/ban-ts-comment: off */
//@ts-ignore

// React functional component render function
const StarboardConsoleOutput = (props) => {
    return Object(preact_compat__WEBPACK_IMPORTED_MODULE_0__["createElement"])(console_feed_modern__WEBPACK_IMPORTED_MODULE_1__[/* Console */ "a"], { logs: props.logs, variant: "dark", logFilter: props.logFilter });
};
function renderStandardConsoleOutputIntoElement(intoElement, logs) {
    /** Note(gzuidhof): We must pass the always-true logFilter here or console-feed chokes on pyodide._module because it's too large to stringify.. */
    const el = StarboardConsoleOutput({ logs: logs, logFilter: () => true });
    Object(preact_compat__WEBPACK_IMPORTED_MODULE_0__["render"])(el, intoElement);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vdXRwdXQvY29uc29sZU91dHB1dE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OytEQUUrRDtBQUVKO0FBRTNELG1EQUFtRDtBQUNuRCxZQUFZO0FBQ2tDO0FBTzlDLDZDQUE2QztBQUM3QyxNQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBbUMsRUFBRSxFQUFFO0lBQ25FLE9BQU8sbUVBQUMsQ0FBQyxtRUFBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDOUYsQ0FBQyxDQUFDO0FBRUssU0FBUyxzQ0FBc0MsQ0FBQyxXQUF3QixFQUFFLElBQVc7SUFDeEYsa0pBQWtKO0lBQ2xKLE1BQU0sRUFBRSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUN2RSw0REFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM1QixDQUFDIiwiZmlsZSI6ImNvbnNvbGUtb3V0cHV0LmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwczovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IHsgcmVuZGVyLCBjcmVhdGVFbGVtZW50IGFzIGggfSBmcm9tICdwcmVhY3QvY29tcGF0JztcclxuXHJcbi8qIGVzbGludCBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQ6IG9mZiAqL1xyXG4vL0B0cy1pZ25vcmVcclxuaW1wb3J0IHsgQ29uc29sZSB9IGZyb20gXCJjb25zb2xlLWZlZWQtbW9kZXJuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YXJib2FyZENvbnNvbGVPdXRwdXRJUHJvcHMge1xyXG4gICAgbG9nczogYW55W107XHJcbiAgICBsb2dGaWx0ZXI/OiAoKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG4vLyBSZWFjdCBmdW5jdGlvbmFsIGNvbXBvbmVudCByZW5kZXIgZnVuY3Rpb25cclxuY29uc3QgU3RhcmJvYXJkQ29uc29sZU91dHB1dCA9IChwcm9wczogU3RhcmJvYXJkQ29uc29sZU91dHB1dElQcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIGgoQ29uc29sZSBhcyBhbnksIHtsb2dzOiBwcm9wcy5sb2dzLCB2YXJpYW50OiBcImRhcmtcIiwgbG9nRmlsdGVyOiBwcm9wcy5sb2dGaWx0ZXJ9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGFuZGFyZENvbnNvbGVPdXRwdXRJbnRvRWxlbWVudChpbnRvRWxlbWVudDogSFRNTEVsZW1lbnQsIGxvZ3M6IGFueVtdKSB7XHJcbiAgICAvKiogTm90ZShnenVpZGhvZik6IFdlIG11c3QgcGFzcyB0aGUgYWx3YXlzLXRydWUgbG9nRmlsdGVyIGhlcmUgb3IgY29uc29sZS1mZWVkIGNob2tlcyBvbiBweW9kaWRlLl9tb2R1bGUgYmVjYXVzZSBpdCdzIHRvbyBsYXJnZSB0byBzdHJpbmdpZnkuLiAqL1xyXG4gICAgY29uc3QgZWwgPSBTdGFyYm9hcmRDb25zb2xlT3V0cHV0KHtsb2dzOiBsb2dzLCBsb2dGaWx0ZXI6ICgpID0+IHRydWV9KTtcclxuICAgIHJlbmRlcihlbCwgaW50b0VsZW1lbnQpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==