/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export class JavascriptEvaluator {
    async run(cell) {
        const res = {
            error: false,
            code: cell.textContent,
        };
        var code = cell.textContent;
        try {
            // // trick from devtools
            // // via https://chromium.googlesource.com/chromium/src.git/+/4fd348fdb9c0b3842829acdfb2b82c86dacd8e0a%5E%21/#F2
            if (/^\s*\{/.test(code) && /\}\s*$/.test(code)) {
                code = `(${code})`;
            }
            const codeToRun = `${code}`;
            if (!window) {
                res.error = true;
                res.value = "Run error: container or window is null";
                return res;
            }
            var previousResult = window.runtime.controls.previousResponse(cell.id);
            if (!previousResult) {
                res.error = true;
                res.value = "Previous cell not yet executed";
                cell.response = undefined;
                return res;
            }
            let AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
            let worker = new AsyncFunction('request', 'context', `${code}
      
      return await handleRequest(request, context);`);
            // *todo* add context provider, global config       
            var context = window.runtime.variables;
            window.__context = context;
            if (context._token && !context.token) {
                context.token = context._token;
                delete context._token;
            }
            if (context._config) {
                window.notebookConfig = context._config;
                delete context._config;
            }
            if (!context.UserLocale)
                context.UserLocale = navigator.language;
            if (!context.UserTimezone)
                context.UserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const cellResult = await worker(previousResult, context);
            res.value = cellResult;
            cell.response = res.value;
            (window)["$_"] = res.value;
            return res;
        }
        catch (error) {
            cell.response = undefined;
            res.error = true;
            res.value = error;
            return res;
        }
    }
}
//# sourceMappingURL=eval.js.map