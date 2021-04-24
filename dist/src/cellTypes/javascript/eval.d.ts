import { Cell } from "../../types";
declare global {
    interface Window {
        $_: any;
        request: any;
        eval: (command: string) => any;
    }
}
interface RunResult {
    error: boolean;
    code: string;
    value?: any;
}
export declare class JavascriptEvaluator {
    run(cell: Cell): Promise<RunResult>;
    precompile(code: string): Promise<string>;
}
export {};
