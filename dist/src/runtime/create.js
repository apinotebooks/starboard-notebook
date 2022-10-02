/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* This file is internal and should never be imported externally if using starboard-notebook as a library */
// @ts-ignore
import _MD5 from 'md5.js';
// @ts-ignore
import { DateTime } from 'luxon';
// @ts-ignore
import * as _humanizeDuration from 'humanize-duration';
import { textToNotebookContent } from "../content/parsing";
import { ConsoleCatcher } from "../console/console";
import { registry as cellTypeRegistry } from "../cellTypes/registry";
import { registry as cellPropertiesRegistry } from "../cellProperties/registry";
import { addCellToNotebookContent, removeCellFromNotebookById, changeCellType } from "../content/notebookContent";
import { notebookContentToText } from "../content/serialization";
import { debounce } from "@github/mini-throttle";
import { registerDefaultPlugins, setupCommunicationWithParentFrame, setupGlobalKeybindings, updateCellsWhenCellDefinitionChanges } from "./core";
import { createExports } from "./exports";
function getInitialContent() {
    if (window.initialNotebookContent) {
        return textToNotebookContent(window.initialNotebookContent);
    }
    const notebookContentElement = document.querySelector('script[type="application/vnd.starboard.nb"]');
    if (notebookContentElement) {
        return textToNotebookContent(notebookContentElement.innerText);
    }
    return { cells: [], metadata: {} };
}
function getConfig() {
    let config = {
        persistCellIds: false,
        defaultTextEditor: "codemirror"
    };
    if (window.runtimeConfig) {
        config = {
            ...config,
            ...window.runtimeConfig
        };
    }
    return config;
}
export function setupRuntime(notebook) {
    const content = getInitialContent();
    /** Runtime without any of the functions **/
    const rt = {
        consoleCatcher: new ConsoleCatcher(window.console),
        content,
        config: getConfig(),
        dom: {
            cells: [],
            notebook,
        },
        definitions: {
            cellTypes: cellTypeRegistry,
            cellProperties: cellPropertiesRegistry,
        },
        name: "starboard-notebook",
        version: STARBOARD_NOTEBOOK_VERSION,
        // These are set below
        controls: null,
        exports: null,
        internal: {
            listeners: {
                cellContentChanges: new Map()
            }
        },
        variables: {},
        editMode: "edit"
    };
    const controls = {
        insertCell(position, adjacentCellId) {
            addCellToNotebookContent(rt, rt.content, position, adjacentCellId);
            notebook.performUpdate();
            controls.contentChanged();
        },
        removeCell(id) {
            removeCellFromNotebookById(rt.content, id);
            notebook.performUpdate();
            controls.contentChanged();
        },
        changeCellType(id, newCellType) {
            changeCellType(rt.content, id, newCellType);
            rt.dom.cells.forEach(c => {
                if (c.cell.id === id) {
                    c.remove();
                }
            });
            notebook.performUpdate();
            controls.contentChanged();
        },
        resetCell(id) {
            rt.dom.cells.forEach(c => {
                if (c.id === id) {
                    c.remove();
                }
            });
            notebook.performUpdate();
        },
        runCell(id, focusNext, insertNewCell) {
            const cellElements = rt.dom.cells;
            let idxOfCell = -1;
            for (let i = 0; i < cellElements.length; i++) {
                const cellElement = cellElements[i];
                if (cellElement.cell.id === id) {
                    idxOfCell = i;
                    cellElement.run();
                    break; // IDs should be unique, so after we find it we can stop searching.
                }
            }
            const isLastCell = idxOfCell === cellElements.length - 1;
            if (insertNewCell) { // run should have no side effects || isLastCell) {
                controls.insertCell("after", id);
            }
            if (focusNext) {
                window.setTimeout(() => {
                    const next = cellElements[idxOfCell + 1];
                    if (next)
                        next.focusEditor();
                });
            }
        },
        save() {
            const couldSave = controls.sendMessage({
                type: "NOTEBOOK_SAVE_REQUEST", payload: {
                    content: notebookContentToText(rt.content)
                }
            });
            if (!couldSave) {
                console.error("Can't save as parent frame is not listening for messages");
            }
            return couldSave;
        },
        async runAllCells(opts = {}) {
            let cellElement = rt.dom.cells[0] || null;
            while (cellElement) {
                if (opts.onlyRunOnLoad && !cellElement.cell.metadata.properties.run_on_load) {
                    // Don't run this cell..
                }
                else {
                    await cellElement.run();
                }
                cellElement = cellElement.nextSibling;
            }
        },
        sendMessage(message, targetOrigin) {
            if (window.parentIFrame) {
                window.parentIFrame.sendMessage(message, targetOrigin);
                return true;
            }
            return false;
        },
        /**
        * To be called when the notebook content text changes in any way.
        */
        contentChanged: debounce(function () {
            controls.sendMessage(({
                type: "NOTEBOOK_CONTENT_UPDATE", payload: {
                    content: notebookContentToText(rt.content)
                }
            }));
        }, 100),
        emit(event) {
            if (event.type === "RUN_CELL") {
                controls.runCell(event.id, !!event.focusNextCell, !!event.insertNewCell);
            }
            else if (event.type === "INSERT_CELL") {
                controls.insertCell(event.position, event.id);
            }
            else if (event.type === "REMOVE_CELL") {
                controls.removeCell(event.id);
            }
            else if (event.type === "CHANGE_CELL_TYPE") {
                controls.changeCellType(event.id, event.newCellType);
            }
            else if (event.type === "RESET_CELL") {
                controls.resetCell(event.id);
            }
            else if (event.type === "SAVE") {
                controls.save();
            }
        },
        subscribeToCellChanges(id, callback) {
            const listeners = rt.internal.listeners.cellContentChanges.get(id);
            if (listeners !== undefined) {
                listeners.push(callback);
            }
            else {
                rt.internal.listeners.cellContentChanges.set(id, [callback]);
            }
        },
        unsubscribeToCellChanges(id, callback) {
            const listeners = rt.internal.listeners.cellContentChanges.get(id);
            if (!listeners)
                return;
            const idx = listeners.indexOf(callback);
            if (idx === -1)
                return;
            listeners.splice(idx, 1);
        },
        previousResponse(cellId) {
            const cellElements = rt.content.cells;
            // find index of current cell
            let idxOfCell = -1;
            for (let i = cellElements.length - 1; i >= 0; i--) {
                const cell = cellElements[i];
                if (cell.id === cellId) {
                    idxOfCell = i;
                    break; // IDs should be unique, so after we find it we can stop searching.
                }
            }
            if (idxOfCell == 0) {
                // first cell uses container variables as request
                return rt.variables;
            }
            // find previous worker cell
            let idxOfPrevCell = -1;
            for (let i = idxOfCell - 1; i >= 0; i--) {
                const cell = cellElements[i];
                var ct = rt.definitions.cellTypes.get(cell.cellType);
                if (ct && ct.worker === true) {
                    idxOfPrevCell = i;
                    break; // found previous work cell
                }
            }
            if (idxOfPrevCell == -1) {
                // no previous worker cell, use container variables as request
                return rt.variables;
            }
            else {
                // return response of previous worker cell
                var cell = cellElements[idxOfPrevCell];
                return cell.response;
            }
            return undefined;
        }
    };
    rt.controls = controls;
    rt.exports = createExports();
    setupGlobalKeybindings(rt);
    /** Initialize certain functionality */
    updateCellsWhenCellDefinitionChanges(rt);
    window.runtime = rt;
    (function (win, DateTime, _humanizeDuration) {
        win.MD5 = function (source) {
            const md5 = new _MD5();
            source = source.toLowerCase().trim();
            return md5.update(source).digest('hex');
        };
        win.dateConvertTimezone = function (time, targetTz) {
            return DateTime.fromISO(time).setZone(targetTz).toISO();
        };
        win.dateStringParse = function (time, sourceTz) {
            if (!sourceTz) {
                return DateTime.fromISO(time).toUTC().toISO();
            }
            return DateTime.fromISO(time, { zone: sourceTz }).toUTC().toISO();
        };
        win.humanizeDuration = function (startTime, endTime) {
            const duration = DateTime.fromISO(endTime).diff(DateTime.fromISO(startTime)).values.milliseconds;
            return _humanizeDuration(duration, { largest: 2 });
        };
        win.humanizeRelative = function (time) {
            return DateTime.fromISO(time).toRelative();
        };
        win.dateToIsoUri = function (date) {
            var tzo = -date.getTimezoneOffset(), dif = tzo >= 0 ? "+" : "-", pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? "0" : "") + norm;
            };
            return encodeURIComponent(date.getFullYear() +
                "-" +
                pad(date.getMonth() + 1) +
                "-" +
                pad(date.getDate()) +
                "T" +
                pad(date.getHours()) +
                ":" +
                pad(date.getMinutes()) +
                ":" +
                pad(date.getSeconds()) +
                dif +
                pad(tzo / 60) +
                ":" +
                pad(tzo % 60));
        };
    }(window, DateTime, _humanizeDuration));
    // fetchJSON - fetch wrapper with global error handling
    window.fetchJSON = async function (url, options) {
        if (window.notebookConfig && window.notebookConfig.APIProxy) {
            url = window.notebookConfig.APIProxy + url.replace("://", "/");
        }
        options = options || {};
        options.headers = options.headers || {};
        // provide list of headers explicitly defined in fetch
        var proxyHeaders = "";
        for (var header in options.headers) {
            proxyHeaders += "," + header;
        }
        if (proxyHeaders.indexOf(",") == 0)
            proxyHeaders = proxyHeaders.substring(1);
        if (!options.headers["X-Fetch-Headers"])
            options.headers["X-Fetch-Headers"] = proxyHeaders;
        if (!options.headers["X-Requested-With"])
            options.headers["X-Requested-With"] = 'API Notebook';
        var response = await fetch(url, options);
        // todo: add error handling
        var json = await response.json();
        if (!response.ok) {
            if (Array.isArray(json))
                json = { response: json };
        }
        return json;
    };
    setupCommunicationWithParentFrame(rt);
    registerDefaultPlugins(rt);
    return rt;
}
//# sourceMappingURL=create.js.map