/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

 import { render, TemplateResult } from "lit-html";
 import { BaseCellHandler } from "./base";
 import { cellControlsTemplate } from "../components/controls";
 import { TextEditIcon, PlayCircleIcon } from "@spectrum-web-components/icons-workflow";
 import { StarboardTextEditor } from "../components/textEditor";
 import { Cell } from "../types";
 import { Runtime, CellElements, CellHandlerAttachParameters, ControlButton } from "../runtime";
import { katexLoader } from "../components/helpers/katex";
 
 export const LATEX_CELL_TYPE_DEFINITION = {
     name: "LateX (KaTeX)",
     cellType: ["latex"],
     worker: false,
     createHandler: (c: Cell, r: Runtime) => new LatexCellHandler(c, r),
 };
 
 export class LatexCellHandler extends BaseCellHandler {
     private isInEditMode = true;
 
     private elements!: CellElements;
     private editor: any;
 
     constructor(cell: Cell, runtime: Runtime) {
         super(cell, runtime);
     }
 
     private getControls(): TemplateResult {
         let editOrRunButton: ControlButton;
         if (this.isInEditMode) {
             editOrRunButton = {
                 icon: PlayCircleIcon,
                 tooltip: "Render LaTeX",
                 callback: () => this.runtime.controls.emit({id: this.cell.id, type: "RUN_CELL"}),
             };
         } else {
             editOrRunButton = {
                 icon: TextEditIcon,
                 tooltip: "Edit LaTeX",
                 callback: () => this.enterEditMode(),
             };
         }
         
         return cellControlsTemplate({ buttons: [editOrRunButton] });
     }
 
     attach(params: CellHandlerAttachParameters) {
         this.elements = params.elements;
 
         if (this.cell.textContent !== "") {
             this.run();
         } else { // When creating an empty cell, it makes more sense to start in editor mode
             this.enterEditMode();
         }
     }
 
     private setupEditor() {
         const topElement = this.elements.topElement;
         topElement.innerHTML = "";
         this.editor = new StarboardTextEditor(this.cell, this.runtime, {language: "latex", wordWrap: "on"});
         topElement.appendChild(this.editor);
     }
 
     enterEditMode() {
         this.isInEditMode = true;
         this.setupEditor();
         render(this.getControls(), this.elements.topControlsElement);
     }
 
     async run() {
         const topElement = this.elements.topElement;
 
         if (this.editor !== undefined) {
             this.editor.dispose();
             delete this.editor;
         }
 
         (await katexLoader()).render(this.cell.textContent, topElement, {"throwOnError" : false, "errorColor" : " #cc0000", displayMode: true});
         topElement.children[0].addEventListener("dblclick", (_event: any) => this.enterEditMode());
         this.isInEditMode = false;
         render(this.getControls(), this.elements.topControlsElement);
     }
 
     async dispose() {
         if (this.editor) {
             this.editor.dispose();
         }
     }
 
     focusEditor() {
         if (this.editor) {
             this.editor.focus();
         }
     }
 }
 