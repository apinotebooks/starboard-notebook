import { html, render } from "lit-html";
import { isProbablyTemplateResult } from "../../cellTypes/javascript/util";
export function renderIfHtmlOutput(val, intoElement, outputClass = "cell-output-html") {
    let didRender = false;
    if (val instanceof HTMLElement) {
        intoElement.appendChild(val);
        didRender = true;
    }
    else if (isProbablyTemplateResult(val)) {
        render(html `${val}`, intoElement);
        didRender = true;
    }
    if (didRender && outputClass) {
        intoElement.classList.add(outputClass);
    }
    return didRender;
}
//# sourceMappingURL=htmlOutput.js.map