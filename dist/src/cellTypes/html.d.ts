import { BaseCellHandler } from "./base";
import { Cell } from "../types";
import { Runtime, CellHandlerAttachParameters } from "../runtime";
export declare const HTML_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    worker: boolean;
    createHandler: (c: Cell, r: Runtime) => HTMLCellHandler;
};
export declare class HTMLCellHandler extends BaseCellHandler {
    private elements;
    private editor;
    constructor(cell: Cell, runtime: Runtime);
    private getControls;
    attach(params: CellHandlerAttachParameters): void;
    run(): Promise<void>;
    focusEditor(): void;
    dispose(): Promise<void>;
}
