/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { html, render, TemplateResult } from "lit-html";
import { BaseCellHandler } from "../base";
import { cellControlsTemplate } from "../../components/controls";
import { AdaptiveCardTemplateEvaluator } from "./eval";
import { PlayCircleIcon, ClockIcon } from "@spectrum-web-components/icons-workflow";

import { ConsoleOutputElement } from "../../components/output/consoleOutput";
import { StarboardTextEditor } from '../../components/textEditor';
import { Cell } from "../../types";
import { Runtime, CellElements, CellHandlerAttachParameters, ControlButton } from "../../runtime";
import { renderIfHtmlOutput } from "../../components/output/htmlOutput";

import * as AdaptiveCards from "adaptivecards";

export const ADAPTIVE_CARD_CELL_TYPE_DEFINITION = {
    name: "Adaptive Card",
    cellType: ["json-adaptive-card"],
    worker: true,
    createHandler: function (c: Cell, r: Runtime) {
        if (!c.textContent) c.textContent =
`
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2",
    "body": []
}`
        return new AdaptiveCardCellHandler(c, r)
    }
};


export class AdaptiveCardCellHandler extends BaseCellHandler {
    private elements!: CellElements;
    private editor!: StarboardTextEditor;

    private jsRunner: AdaptiveCardTemplateEvaluator;

    private isCurrentlyRunning = false;
    private lastRunId = 0;

    private outputElement?: ConsoleOutputElement;

    constructor(cell: Cell, runtime: Runtime) {
        super(cell, runtime);
        this.jsRunner = new AdaptiveCardTemplateEvaluator();
    }

    private getControls(): TemplateResult {
        const icon = this.isCurrentlyRunning ? ClockIcon : PlayCircleIcon;
        const tooltip = this.isCurrentlyRunning ? "Run Cell" : "Cell is running";
        const runButton: ControlButton = {
            icon,
            tooltip,
            callback: () => this.runtime.controls.emit({ id: this.cell.id, type: "RUN_CELL" }),
        };
        return cellControlsTemplate({ buttons: [runButton] });
    }

    attach(params: CellHandlerAttachParameters) {
        this.elements = params.elements;

        const topElement = this.elements.topElement;
        render(this.getControls(), this.elements.topControlsElement);
        this.editor = new StarboardTextEditor(this.cell, this.runtime, { language: "json" });
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
        htmlOutput.classList.add("cell-output-html");
        render(html`${this.outputElement}${htmlOutput}`, this.elements.bottomElement);

        const outVal = await this.jsRunner.run(this.cell);

        // Not entirely sure this is necessary anymore, but we had to wait one tick with unhooking
        // as some console messages are delayed by one tick it seems.
        await this.outputElement.unhookAfterOneTick(this.runtime.consoleCatcher);

        const val = outVal.value;

        // Create an AdaptiveCard instance
        var adaptiveCard = new AdaptiveCards.AdaptiveCard();
        
        // Set its hostConfig property unless you want to use the default Host Config
        // Host Config defines the style and behavior of a card
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
            // More host config options
        });
        
        // Set the adaptive card's event handlers. onExecuteAction is invoked
        // whenever an action is clicked in the card
        adaptiveCard.onExecuteAction = function(action) { alert("Ow!"); }
        
        // Parse the card payload
        adaptiveCard.parse(val);
        
        // Render the card to an HTML element:
        var renderedCard = adaptiveCard.render();

        const htmlOutputRendered = renderIfHtmlOutput(renderedCard, htmlOutput);

        if (!htmlOutputRendered && val !== undefined) { // Don't show undefined output
            if (outVal.error) {
                console.error(val); // NOTE: perhaps problematic for async code, don't want to loop this!

                if (val.stack !== undefined) {
                    let stackToPrint: string = val.stack;
                    const errMsg: string = val.toString();
                    if (stackToPrint.startsWith(errMsg)) { // Prevent duplicate error msg in Chrome
                        stackToPrint = stackToPrint.substr(errMsg.length);
                    }
                    this.outputElement.addEntry({
                        method: "error",
                        data: [errMsg, stackToPrint]
                    });
                } else {
                    this.outputElement.addEntry({
                        method: "error",
                        data: [val]
                    });
                }
            } else {
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
