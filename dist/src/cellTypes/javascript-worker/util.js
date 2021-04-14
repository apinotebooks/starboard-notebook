/* eslint-disable no-prototype-builtins */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { TemplateResult } from "lit-html";
export function isProbablyTemplateResult(value) {
    if (typeof value !== "object") {
        return false;
    }
    if (value === null) {
        return false;
    }
    if (value instanceof TemplateResult) {
        return true;
    }
    if (value.prototype && value.prototype.hasOwnProperty("strings")
        && value.prototype.hasOwnProperty("values")
        && value.prototype.hasOwnProperty("type")
        && value.prototype.hasOwnProperty("processor")
        && !!value["getHTML"]) {
        return true;
    }
    return false;
}
/**
 * Checks the state of a promise more or less 'right now'.
 * @param p
 */
export function promiseState(p) {
    const t = {};
    return Promise.race([p, t])
        .then(v => (v === t) ? "pending" : "fulfilled", () => "rejected");
}
//# sourceMappingURL=util.js.map