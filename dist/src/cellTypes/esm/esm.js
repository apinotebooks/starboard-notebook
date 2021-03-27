/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { html, render } from "lit-html";
import { BaseCellHandler } from "../base";
import { cellControlsTemplate } from "../../components/controls";
import { PlayCircleIcon, ClockIcon } from "@spectrum-web-components/icons-workflow";
import { ConsoleOutputElement } from "../../components/output/consoleOutput";
import { StarboardTextEditor } from '../../components/textEditor';
import { renderIfHtmlOutput } from "../../components/output/htmlOutput";
export const ES_MODULE_CELL_TYPE_DEFINITION = {
    name: "ES Module",
    cellType: "esm",
    createHandler: (c, r) => new ESModuleCellHandler(c, r),
};
export class ESModuleCellHandler extends BaseCellHandler {
    constructor(cell, runtime) {
        super(cell, runtime);
        this.isCurrentlyRunning = false;
        this.lastRunId = 0;
    }
    getControls() {
        const icon = this.isCurrentlyRunning ? ClockIcon : PlayCircleIcon;
        const tooltip = this.isCurrentlyRunning ? "Run Cell" : "Cell is running";
        const runButton = {
            icon,
            tooltip,
            callback: () => this.runtime.controls.emit({ id: this.cell.id, type: "RUN_CELL" }),
        };
        return cellControlsTemplate({ buttons: [runButton] });
    }
    attach(params) {
        this.elements = params.elements;
        const topElement = this.elements.topElement;
        render(this.getControls(), this.elements.topControlsElement);
        this.editor = new StarboardTextEditor(this.cell, this.runtime, { language: "javascript" });
        topElement.appendChild(this.editor);
    }
    async run() {
        this.lastRunId++;
        const currentRunId = this.lastRunId;
        this.isCurrentlyRunning = true;
        render(this.getControls(), this.elements.topControlsElement);
        this.outputElement = new ConsoleOutputElement();
        this.outputElement.hook(this.runtime.consoleCatcher);
        const htmlOutput = document.createElement("div");
        render(html `${this.outputElement}${htmlOutput}`, this.elements.bottomElement);
        const esmCodeUrl = URL.createObjectURL(new Blob([this.cell.textContent], { type: 'text/javascript' }));
        let out = {};
        let error = undefined;
        try {
            out = await import(/* webpackIgnore: true */ esmCodeUrl);
        }
        catch (e) {
            error = e;
        }
        await this.outputElement.unhookAfterOneTick(this.runtime.consoleCatcher);
        const val = out.default;
        window.$_ = val;
        if (out) {
            Object.assign(window, out);
        }
        if (error) {
            console.error(error); // NOTE: perhaps problematic for async code, don't want to loop this!
            if (error.stack !== undefined) {
                let stackToPrint = error.stack;
                const errMsg = error.toString();
                if (stackToPrint.startsWith(errMsg)) { // Prevent duplicate error msg in Chrome
                    stackToPrint = stackToPrint.substr(errMsg.length);
                }
                this.outputElement.addEntry({
                    method: "error",
                    data: [errMsg, stackToPrint]
                });
            }
            else {
                this.outputElement.addEntry({
                    method: "error",
                    data: [error]
                });
            }
        }
        const htmlOutputRendered = renderIfHtmlOutput(val, htmlOutput);
        if (!htmlOutputRendered) {
            if (val !== undefined) { // Don't show undefined output
                this.outputElement.addEntry({
                    method: "result",
                    data: [val]
                });
            }
        }
        if (this.lastRunId === currentRunId) {
            this.isCurrentlyRunning = false;
            render(this.getControls(), this.elements.topControlsElement);
        }
    }
    focusEditor() {
        this.editor.focus();
    }
    async dispose() {
        this.editor.remove();
    }
}
//# sourceMappingURL=esm.js.map