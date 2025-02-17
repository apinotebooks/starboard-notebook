/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { html } from "lit-html";
import { AlertCircleIcon } from "@spectrum-web-components/icons-workflow";
import { registry, getAvailablePropertyTypes } from "../cellProperties/registry";
// Note: These controls are not "Components" in the lit-element sense
export function cellControlsTemplate(controls) {
    const buttons = controls.buttons;
    return html `
        ${buttons.map((button) => html `
            <button @click="${button.callback}" class="cell-controls-button ${button.hide === undefined ? "auto-hide" : button.hide} " title="${button.tooltip}">
                ${button.icon({ width: 20, height: 20 })}
            </button>
            `)}
    `;
}
export function getPropertiesIcons(cell, togglePropertyFunction) {
    const iconTemplates = [];
    for (const prop of Object.getOwnPropertyNames(cell.metadata.properties)) {
        const propertyDef = registry.get(prop) || { icon: AlertCircleIcon, textEnabled: `Unknown property "${prop}"`, textDisabled: ``, name: `Unknown` };
        const templateResult = html `
            <button @click=${() => togglePropertyFunction(prop)} class="cell-controls-button" title=${propertyDef.textEnabled}>
                            ${propertyDef.icon({ width: 16, height: 16 })}
            </button>
        `;
        iconTemplates.push(templateResult);
    }
    return html `${iconTemplates}`;
}
export function getPropertiesPopoverIcons(cell, togglePropertyFunction) {
    return html `
        <div class="m-2 d-flex">
        ${getAvailablePropertyTypes().map((def) => {
        const isActive = cell.metadata.properties[def.cellProperty] !== undefined;
        const helpText = isActive ? def.textEnabled : def.textDisabled;
        const style = isActive ? "color: #8d27f4" : "";
        return html `
                    <button style=${style} @click=${() => togglePropertyFunction(def.cellProperty)} class="cell-controls-button" title=${helpText}>
                                    ${def.icon({ width: 16, height: 16 })}
                    </button>
                `;
    })}
        </div>
    `;
}
//# sourceMappingURL=controls.js.map