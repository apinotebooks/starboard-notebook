/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { textToNotebookContent } from "../content/parsing";
import { notebookContentToText } from "../content/serialization";
/**
 * When new cell types are registered, or overwritten, the corresponding cells should update.
 * For example: if there is a my-language cell present, which is loaded dynamically in the first cell,
 * subsequent cells should update to this new definition.
 */
export function updateCellsWhenCellDefinitionChanges(runtime) {
    const newCellTypeListenerFunction = (e) => {
        if (e.type !== "register") {
            return;
        }
        for (const c of runtime.dom.cells) {
            if (e.key === c.cell.cellType) {
                runtime.controls.emit({ id: c.cell.id, type: "CHANGE_CELL_TYPE", newCellType: c.cell.cellType });
            }
        }
    };
    runtime.definitions.cellTypes.subscribe(newCellTypeListenerFunction);
}
export function setupCommunicationWithParentFrame(runtime) {
    let contentHasBeenSetFromParentIframe = false;
    const nb = runtime.dom.notebook;
    window.iFrameResizer = {
        onReady: () => {
            // It is possible that the parent iFrame isn't ready for messages yet, so we try to make contact a few times.+
            let numTries = 0;
            const askForContent = () => {
                if (contentHasBeenSetFromParentIframe || numTries > 15)
                    return;
                runtime.controls.sendMessage({
                    type: "NOTEBOOK_READY_SIGNAL",
                    payload: {
                        communicationFormatVersion: 1,
                        content: notebookContentToText(runtime.content),
                        runtime: {
                            name: runtime.name,
                            version: runtime.version,
                        }
                    }
                });
                numTries++;
                setTimeout(() => askForContent(), numTries * 100);
            };
            askForContent();
        },
        onMessage: (msg) => {
            if (msg.type === "NOTEBOOK_SET_INIT_DATA") {
                if (contentHasBeenSetFromParentIframe)
                    return; // be idempotent
                runtime.content = textToNotebookContent(msg.payload.content);
                // copy public metadata (so frontmatter variable names not starting with _) to variables
                // token is a special case: it is not persistet, and should be used as an private environment variable in the script
                Object.keys(runtime.content.metadata).forEach(key => {
                    if (!key.startsWith("_") && key != "_token")
                        runtime.variables[key] = runtime.content.metadata[key];
                });
                // copy variables provided by container
                if (msg.payload.variables) {
                    Object.keys(msg.payload.variables).forEach(key => {
                        runtime.variables[key] = msg.payload.variables[key];
                    });
                }
                runtime.editMode = "edit";
                if (msg.payload.editMode)
                    runtime.editMode = msg.payload.editMode;
                contentHasBeenSetFromParentIframe = true;
                nb.hasHadInitialRun = false;
                nb.notebookInitialize();
                nb.performUpdate();
                if (msg.payload.baseUrl !== undefined) {
                    const baseEl = document.querySelector("base");
                    if (baseEl) {
                        baseEl.href = msg.payload.baseUrl;
                    }
                    else {
                        console.error("Could not set base URL as no base element is present");
                    }
                }
            }
            else if (msg.type === "NOTEBOOK_RELOAD_PAGE") {
                window.location.reload();
            }
        }
    };
}
export function registerDefaultPlugins(_runtime) {
}
export function setupGlobalKeybindings(runtime) {
    document.addEventListener("keydown", (e) => {
        if (e.key === "s" && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            runtime.controls.save();
        }
    }, false);
}
//# sourceMappingURL=core.js.map