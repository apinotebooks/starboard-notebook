/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DefaultCellHandler, DEFAULT_CELL_TYPE_DEFINITION } from "./default";
import { MARKDOWN_CELL_TYPE_DEFINITION } from "./markdown";
import { JAVASCRIPT_CELL_TYPE_DEFINITION } from "./javascript/javascript";
import { JAVASCRIPT_WORKER_CELL_TYPE_DEFINITION } from "./javascript-worker/javascript-worker";
import { JAVASCRIPT_CONNECTOR_CELL_TYPE_DEFINITION } from "./javascript-connector/javascript-connector";
import { JSON_TEMPLATE_CELL_TYPE_DEFINITION } from "./json-template/json-template";
import { ADAPTIVE_CARD_CELL_TYPE_DEFINITION } from "./json-adaptive-card/json-adaptive-card";
import { ADAPTIVE_FORM_CELL_TYPE_DEFINITION } from "./json-adaptive-form/json-adaptive-form";
import { HTML_CELL_TYPE_DEFINITION } from "./html";
import { CSS_CELL_TYPE_DEFINITION } from "./css";
import { MapRegistry } from "../runtime/registry";
import { ES_MODULE_CELL_TYPE_DEFINITION } from "./javascript-esm/javascript-esm";
import { LATEX_CELL_TYPE_DEFINITION } from "./latex";
const PLAINTEXT_CELL_TYPE_DEFINITION = {
    name: "Plaintext",
    cellType: ["plaintext", "raw"],
    worker: false,
    createHandler: (c, r) => new DefaultCellHandler(c, r),
};
const builtinCellTypes = [
    MARKDOWN_CELL_TYPE_DEFINITION,
    JAVASCRIPT_CELL_TYPE_DEFINITION,
    JAVASCRIPT_WORKER_CELL_TYPE_DEFINITION,
    JAVASCRIPT_CONNECTOR_CELL_TYPE_DEFINITION,
    ADAPTIVE_CARD_CELL_TYPE_DEFINITION,
    ADAPTIVE_FORM_CELL_TYPE_DEFINITION,
    JSON_TEMPLATE_CELL_TYPE_DEFINITION,
    ES_MODULE_CELL_TYPE_DEFINITION,
    HTML_CELL_TYPE_DEFINITION,
    CSS_CELL_TYPE_DEFINITION,
    LATEX_CELL_TYPE_DEFINITION,
    // PLAINTEXT_CELL_TYPE_DEFINITION,
];
export function getCellTypeDefinitionForCellType(cellType) {
    if (registry.has(cellType)) {
        return registry.get(cellType);
    }
    else {
        return {
            ...DEFAULT_CELL_TYPE_DEFINITION,
            cellType: cellType,
            name: `Unknown type "${cellType}"`,
            worker: false
        };
    }
}
export function getAvailableCellTypes() {
    return [...new Set(registry.values())];
}
// Singleton global value
export const registry = new MapRegistry();
builtinCellTypes.forEach((e) => {
    registry.set(e.cellType, e);
});
//# sourceMappingURL=registry.js.map