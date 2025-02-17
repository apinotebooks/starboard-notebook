import { Node as ProseNode } from "prosemirror-model";
import { Plugin as ProsePlugin } from "prosemirror-state";
import { MathView } from "./nodeView";
import { EditorView } from "prosemirror-view";
interface IMathPluginState {
    macros: {
        [cmd: string]: string;
    };
    activeNodeViews: MathView[];
}
/**
 * Returns a function suitable for passing as a field in `EditorProps.nodeViews`.
 * @param displayMode TRUE for block math, FALSE for inline math.
 * @see https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews
 */
export declare function createMathView(displayMode: boolean): (node: ProseNode, view: EditorView, getPos: boolean | (() => number)) => MathView;
export declare const mathPlugin: ProsePlugin<IMathPluginState, any>;
export {};
