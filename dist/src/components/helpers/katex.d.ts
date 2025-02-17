import katex from 'katex';
import MarkdownIt from 'markdown-it';
/**
 * Will eventually resolve to katex if loadModule is ever called (indirectly).
 */
export declare const katexEventualPromise: Promise<{
    katex: typeof katex;
    katexPlugin: any;
}>;
export declare function katexLoader(): Promise<typeof katex>;
export declare function hookMarkdownItToKaTeX(markdownItInstance: MarkdownIt): Promise<void>;
