/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as YAML from "yaml";
const PreferredCellDelimiter = "\`\`\`";
function objectIsEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export function notebookContentToText(nb) {
    const cellsAsText = nb.cells.map(cellToText).join("\n");
    if (!objectIsEmpty(nb.metadata)) {
        const ymlHeader = YAML.stringify(nb.metadata);
        return `---\n${ymlHeader}---\n${cellsAsText}`;
    }
    return cellsAsText;
}
export function cellToText(cell) {
    let cellHeader;
    let cellType = cell.cellType.replace("-", " "); // splitt cell subtype
    // markdown cells are persisted as markdown
    if (cell.cellType == "markdown") {
        var md = cell.textContent;
        // for better readability ensure that markdown cells are persisted with leading and trailing new line
        if (!md.startsWith("\n"))
            md = "\n" + md;
        if (!md.endsWith("\n"))
            md = md + "\n";
        return md;
    }
    // other cells are persisted as markdown code blocks
    if (objectIsEmpty(cell.metadata.properties) && Object.keys(cell.metadata).length === 1) {
        // The cell metadata is empty
        cellHeader = `${PreferredCellDelimiter}${cellType}`;
    }
    else {
        cellHeader = `${PreferredCellDelimiter}${cellType} `;
        cellHeader = cellHeader + JSON.stringify(cell.metadata.properties);
        /*
        let ymlCellMetadata = YAML.stringify(cell.metadata);
        // Add a comment marker to each of the lines.
        // The last line contains a trailing \n, which we slice off
        ymlCellMetadata = ymlCellMetadata.split("\n").slice(0, -1).map(s => PreferredCellDelimiter.replace("%%", "") + s).join("\n");

        cellHeader = `${PreferredCellDelimiter}${cell.cellType}\n${ymlCellMetadata}\n${PreferredCellDelimiter.replace("%%", "---%%")}`;
        */
    }
    const cellText = `${cellHeader}\n${cell.textContent}\n${PreferredCellDelimiter}`;
    return cellText;
}
//# sourceMappingURL=serialization.js.map