import { BaseCellHandler } from "../base";
import { Cell } from "../../types";
import { Runtime, CellHandlerAttachParameters } from "../../runtime";
export declare const JAVASCRIPT_CONNECTOR_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string[];
    worker: boolean;
    createHandler: (c: Cell, r: Runtime) => JavascriptConnectorCellHandler;
};
export declare class JavascriptConnectorCellHandler extends BaseCellHandler {
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
    JSONCrush(string: string): string;
    JSONUncrush(string: string): any;
    JSONCrushSwap(string: any, forward?: number): any;
    dispose(): Promise<void>;
}
