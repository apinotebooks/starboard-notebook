/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { flatPromise } from './flatPromise';
const { resolve, promise: katexPromise } = flatPromise();
/**
 * Will eventually resolve to katex if loadModule is ever called (indirectly).
 */
export const katexEventualPromise = katexPromise;
async function loadModule() {
    resolve(await import(/* webpackChunkName: "katex", webpackPrefetch: true */ "./katexModule"));
    return katexPromise;
}
export function katexLoader() {
    return loadModule().then(m => m.katex);
}
export async function hookMarkdownItToKaTeX(markdownItInstance) {
    const m = await loadModule();
    markdownItInstance.use(m.katexPlugin, { "throwOnError": false, "errorColor": " #cc0000" });
}
//# sourceMappingURL=katex.js.map