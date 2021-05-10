/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { html, render } from "lit-html";
import { BaseCellHandler } from "../base";
import { cellControlsTemplate } from "../../components/controls";
import { JavascriptEvaluator } from "./eval";
import { PlayCircleIcon, ClockIcon } from "@spectrum-web-components/icons-workflow";
import { ConsoleOutputElement } from "../../components/output/consoleOutput";
import { StarboardTextEditor } from '../../components/textEditor';
import { renderIfHtmlOutput } from "../../components/output/htmlOutput";
export const JAVASCRIPT_CONNECTOR_CELL_TYPE_DEFINITION = {
    name: "Javascript Connector",
    cellType: ["javascript-connector"],
    worker: true,
    createHandler: function (c, r) {
        if (!c.textContent)
            c.textContent =
                `
async function handleRequest(request) {

    var model = {
        actionable: false,
        _card: {
            type: 'status'
        },
        title: 'title',
        link: 'https://...',
        linkLabel: 'Go to ...',
        thumbnail: 'https://www.adenin.com/assets/images/identity/logo_adenin.svg'
    }

    return model;
}
`;
        return new JavascriptConnectorCellHandler(c, r);
    }
};
export class JavascriptConnectorCellHandler extends BaseCellHandler {
    constructor(cell, runtime) {
        super(cell, runtime);
        this.isCurrentlyRunning = false;
        this.lastRunId = 0;
        this.jsRunner = new JavascriptEvaluator();
    }
    getControls() {
        const icon = this.isCurrentlyRunning ? ClockIcon : PlayCircleIcon;
        const tooltip = this.isCurrentlyRunning ? "Run Cell" : "Cell is running";
        const runButton = {
            icon,
            tooltip,
            callback: () => this.runtime.controls.emit({ id: this.cell.id, type: "RUN_CELL" }),
        };
        return cellControlsTemplate({ buttons: [runButton] });
    }
    attach(params) {
        this.elements = params.elements;
        const topElement = this.elements.topElement;
        render(this.getControls(), this.elements.topControlsElement);
        this.editor = new StarboardTextEditor(this.cell, this.runtime, { language: "javascript" });
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
        render(html `${this.outputElement}${htmlOutput}`, this.elements.bottomElement);
        const outVal = await this.jsRunner.run(this.cell);
        // Not entirely sure this is necessary anymore, but we had to wait one tick with unhooking
        // as some console messages are delayed by one tick it seems.
        await this.outputElement.unhookAfterOneTick(this.runtime.consoleCatcher);
        const val = outVal.value;
        var iframe = undefined;
        if (!outVal.error) {
            var crushed = this.JSONCrush(JSON.stringify(val));
            // reuse postman visualizer for now
            iframe = html `<iframe src="https://components.adenin.com/components/at-card-preview/loader.html?data=${crushed}" style="width:100%;height:750px;">`;
        }
        const htmlOutputRendered = renderIfHtmlOutput(iframe, htmlOutput, "cell-output-iframe");
        if (!htmlOutputRendered && val !== undefined) { // Don't show undefined output
            if (outVal.error) {
                console.error(val); // NOTE: perhaps problematic for async code, don't want to loop this!
                if (val.stack !== undefined) {
                    let stackToPrint = val.stack;
                    const errMsg = val.toString();
                    if (stackToPrint.startsWith(errMsg)) { // Prevent duplicate error msg in Chrome
                        stackToPrint = stackToPrint.substr(errMsg.length);
                    }
                    this.outputElement.addEntry({
                        method: "error",
                        data: [errMsg, stackToPrint]
                    });
                }
                else {
                    this.outputElement.addEntry({
                        method: "error",
                        data: [val]
                    });
                }
            }
            else {
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
    JSONCrush(string) {
        const maxSubstringLength = 50; // speed it up by limiting max length
        const delimiter = '\u0001'; // used to split parts of crushed string
        // @ts-ignore
        const JSCrush = (string, replaceCharacters) => {
            // JSCrush Algorithm (repleace repeated substrings with single characters)
            let replaceCharacterPos = replaceCharacters.length;
            let splitString = '';
            const ByteLength = (string) => encodeURI(encodeURIComponent(string)).replace(/%../g, 'i').length;
            const HasUnmatchedSurrogate = (string) => {
                // check ends of string for unmatched surrogate pairs
                let c1 = string.charCodeAt(0);
                let c2 = string.charCodeAt(string.length - 1);
                return (c1 >= 0xDC00 && c1 <= 0xDFFF) || (c2 >= 0xD800 && c2 <= 0xDBFF);
            };
            // count instances of substrings
            let substringCount = {};
            for (let substringLength = 2; substringLength < maxSubstringLength; substringLength++)
                for (let i = 0; i < string.length - substringLength; ++i) {
                    let substring = string.substr(i, substringLength);
                    // don't recount if already in list
                    // @ts-ignore
                    if (substringCount[substring])
                        continue;
                    // prevent breaking up unmatched surrogates
                    if (HasUnmatchedSurrogate(substring))
                        continue;
                    // count how many times the substring appears
                    let count = 1;
                    for (let substringPos = string.indexOf(substring, i + substringLength); substringPos >= 0; ++count)
                        substringPos = string.indexOf(substring, substringPos + substringLength);
                    // add to list if it appears multiple times
                    if (count > 1) {
                        // @ts-ignore
                        substringCount[substring] = count;
                    }
                }
            while (true) // loop while string can be crushed more
             {
                // get the next character that is not in the string
                for (; replaceCharacterPos-- && string.includes(replaceCharacters[replaceCharacterPos]);) { }
                if (replaceCharacterPos < 0)
                    break; // ran out of replacement characters
                let replaceCharacter = replaceCharacters[replaceCharacterPos];
                // find the longest substring to replace
                let bestSubstring;
                let bestLengthDelta = 0;
                let replaceByteLength = ByteLength(replaceCharacter);
                for (let substring in substringCount) {
                    // calculate change in length of string if it substring was replaced
                    // @ts-ignore
                    let count = substringCount[substring];
                    let lengthDelta = (count - 1) * ByteLength(substring) - (count + 1) * replaceByteLength;
                    if (!splitString.length)
                        lengthDelta -= ByteLength(delimiter); // include the delimeter length 
                    if (lengthDelta <= 0) {
                        // @ts-ignore
                        delete substringCount[substring];
                    }
                    else if (lengthDelta > bestLengthDelta) {
                        bestSubstring = substring;
                        bestLengthDelta = lengthDelta;
                    }
                }
                if (!bestSubstring)
                    break; // string can't be compressed further
                // create new string with the split character
                string = string.split(bestSubstring).join(replaceCharacter) + replaceCharacter + bestSubstring;
                splitString = replaceCharacter + splitString;
                // update substring count list after the replacement
                let newSubstringCount = {};
                for (let substring in substringCount) {
                    // make a new substring with the replacement
                    let newSubstring = substring.split(bestSubstring).join(replaceCharacter);
                    // count how many times the new substring appears
                    let count = 0;
                    for (let i = string.indexOf(newSubstring); i >= 0; ++count)
                        i = string.indexOf(newSubstring, i + newSubstring.length);
                    // add to list if it appears multiple times
                    if (count > 1) {
                        // @ts-ignore              
                        newSubstringCount[newSubstring] = count;
                    }
                }
                substringCount = newSubstringCount;
            }
            return { a: string, b: splitString };
        };
        // create a string of replacement characters
        let characters = [];
        // prefer replacing with characters that will not be escaped by encodeURIComponent
        const unescapedCharacters = `-_.!~*'()`;
        for (let i = 127; --i;) {
            if ((i >= 48 && i <= 57) || // 0-9
                (i >= 65 && i <= 90) || // A-Z
                (i >= 97 && i <= 122) || // a-z
                unescapedCharacters.includes(String.fromCharCode(i)))
                characters.push(String.fromCharCode(i));
        }
        // pick from extended set last
        for (let i = 32; i < 255; ++i) {
            let c = String.fromCharCode(i);
            if (c != '\\' && !characters.includes(c))
                characters.unshift(c);
        }
        // remove delimiter if it is found in the string        
        string = string.replace(new RegExp(delimiter, 'g'), '');
        // swap out common json characters
        // @ts-ignore
        string = this.JSONCrushSwap(string);
        // crush with JS crush
        const crushed = JSCrush(string, characters);
        // insert delimiter between JSCrush parts
        let crushedString = crushed.a;
        if (crushed.b.length)
            crushedString += delimiter + crushed.b;
        // encode URI
        return encodeURIComponent(crushedString);
    }
    JSONUncrush(string) {
        // string must be a decoded URI component, searchParams.get() does this automatically
        // unsplit the string using the delimiter
        const stringParts = string.split('\u0001');
        // JSUncrush algorithm
        let uncrushedString = stringParts[0];
        if (stringParts.length > 1) {
            let splitString = stringParts[1];
            for (let character of splitString) {
                // split the string using the current splitCharacter
                let splitArray = uncrushedString.split(character);
                // rejoin the string with the last element from the split
                uncrushedString = splitArray.join(splitArray.pop());
            }
        }
        // unswap the json characters in reverse direction
        // @ts-ignore
        return JSONCrushSwap(uncrushedString, 0);
    }
    // @ts-ignore
    JSONCrushSwap(string, forward = 1) {
        // swap out characters for lesser used ones that wont get escaped
        const swapGroups = [
            ['"', "'"],
            ["':", "!"],
            [",'", "~"],
            ['}', ")", '\\', '\\'],
            ['{', "(", '\\', '\\'],
        ];
        // @ts-ignore
        const Swap = (string, g) => {
            let regex = new RegExp(`${(g[2] ? g[2] : '') + g[0]}|${(g[3] ? g[3] : '') + g[1]}`, 'g');
            // @ts-ignore
            return string.replace(regex, $1 => ($1 === g[0] ? g[1] : g[0]));
        };
        // need to be able to swap characters in reverse direction for uncrush
        if (forward)
            for (let i = 0; i < swapGroups.length; ++i)
                string = Swap(string, swapGroups[i]);
        else
            for (let i = swapGroups.length; i--;)
                string = Swap(string, swapGroups[i]);
        return string;
    }
    // Access the data passed to pm.visualizer.set() from the JavaScript
    // code of the Visualizer template
    /* getData(function(err, value) {

        var url = document.getElementById("loader").src.replace(".js", ".html");
        var data = JSONCrush(JSON.stringify(value));
        console.log("** url " + url);
        window.location.href = url + (url.indexOf("?") > 0 ? "&" : "?") + "data=" + data;

    });
*/
    async dispose() {
        this.editor.remove();
    }
}
//# sourceMappingURL=javascript-connector.js.map