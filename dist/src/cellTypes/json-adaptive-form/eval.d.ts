import { Cell } from "../../types";
declare global {
    interface Window {
        $_: any;
        eval: (command: string) => any;
        runtime: any;
    }
}
interface RunResult {
    error: boolean;
    code: string;
    value?: any;
}
export declare class AdaptiveCardTemplateEvaluator {
    run(cell: Cell): Promise<RunResult>;
    extractValues(card: any, request: any): any;
    private parseElement;
    private applyValue;
}
export {};
