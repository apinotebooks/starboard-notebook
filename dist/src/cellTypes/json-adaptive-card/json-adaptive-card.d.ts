import { BaseCellHandler } from "../base";
import { Cell } from "../../types";
import { Runtime, CellHandlerAttachParameters } from "../../runtime";
export declare const ADAPTIVE_CARD_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string[];
    worker: boolean;
    createHandler: (c: Cell, r: Runtime) => AdaptiveCardCellHandler;
};
export declare class AdaptiveCardCellHandler extends BaseCellHandler {
    private elements;
    private editor;
    private jsRunner;
    private isCurrentlyRunning;
    private lastRunId;
    private outputElement?;
    constructor(cell: Cell, runtime: Runtime);
    private getControls;
    attach(params: CellHandlerAttachParameters): void;
    run(): Promise<void>;
    focusEditor(): void;
    dispose(): Promise<void>;
}
