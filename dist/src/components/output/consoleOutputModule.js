/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { render, createElement as h } from 'preact/compat';
/* eslint @typescript-eslint/ban-ts-comment: off */
//@ts-ignore
import { Console } from "console-feed-modern";
// React functional component render function
const StarboardConsoleOutput = (props) => {
    return h(Console, { logs: props.logs, variant: "dark", logFilter: props.logFilter });
};
export function renderStandardConsoleOutputIntoElement(intoElement, logs) {
    /** Note(gzuidhof): We must pass the always-true logFilter here or console-feed chokes on pyodide._module because it's too large to stringify.. */
    const el = StarboardConsoleOutput({ logs: logs, logFilter: () => true });
    render(el, intoElement);
}
//# sourceMappingURL=consoleOutputModule.js.map