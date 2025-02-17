import { BaseCellHandler } from "./base";
import { Cell } from "../types";
import { Runtime, CellHandlerAttachParameters } from "../runtime";
export declare const CSS_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    worker: boolean;
    createHandler: (c: Cell, r: Runtime) => CSSCellHandler;
};
export declare class CSSCellHandler extends BaseCellHandler {
    private elements;
    private editor;
    private changeListener;
    constructor(cell: Cell, runtime: Runtime);
    attach(params: CellHandlerAttachParameters): void;
    run(): Promise<void>;
    focusEditor(): void;
    dispose(): Promise<void>;
}
