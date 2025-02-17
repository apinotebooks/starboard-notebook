/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* Adapted from MIT licensed prosemirror-example-setup package */
import { keymap } from "prosemirror-keymap";
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";
import { Plugin } from "prosemirror-state";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { menuBar } from "prosemirror-menu";
import { buildMenuItems } from "./menu";
import { buildKeymap } from "./keymap";
import { buildInputRules } from "./inputrules";
import { buildMathPlugins } from "./extensions/math/";
export { buildMenuItems, buildKeymap, buildInputRules };
//   options::- The following options are recognized:
//
//     schema:: Schema
//     The schema to generate key bindings and menu items for.
//
//     mapKeys:: ?Object
//     Can be used to [adjust](#example-setup.buildKeymap) the key bindings created.
//
//     menuBar:: ?bool
//     Set to false to disable the menu bar.
//
//     floatingMenu:: ?bool
//     Set to false to make the menu bar non-floating.
//
//     menuContent:: [[MenuItem]]
//     Can be used to override the menu content.
export function setupPlugins(options) {
    const plugins = [
        buildInputRules(options.schema),
        keymap(buildKeymap(options.schema, options.mapKeys)),
        keymap(baseKeymap),
        dropCursor(),
        gapCursor(),
        ...buildMathPlugins(options.schema),
    ];
    if (options.menuBar !== false)
        plugins.push(menuBar({
            floating: options.floatingMenu !== false,
            content: options.menuContent || buildMenuItems(options.schema).fullMenu
        }));
    plugins.push(history());
    return plugins.concat(new Plugin({
        props: {
            attributes: { class: "ProseMirror-example-setup-style" }
        }
    }));
}
//# sourceMappingURL=setup.js.map