import { ReplayIcon, VisibilityOffIcon, LockClosedIcon } from "@spectrum-web-components/icons-workflow";
import { MapRegistry } from "../runtime/registry";
const builtinCellProperties = [
    {
        cellProperty: "run_on_load",
        icon: ReplayIcon,
        name: "Run on load",
        textEnabled: "This cell is run automatically when the notebook is loaded",
        textDisabled: "Run Cell on when the notebook gets loaded"
    },
    {
        cellProperty: "collapsed",
        icon: VisibilityOffIcon,
        name: "Collapse Cell",
        textEnabled: "This cell is collapsed (hidden when not focused)",
        textDisabled: "Collapse cell (hide cell when not focused)",
    },
    {
        cellProperty: "locked",
        icon: LockClosedIcon,
        name: "Locked for Editing",
        textEnabled: "This cell is locked for editing",
        textDisabled: "Lock cell for editing"
    }
];
export function getAvailablePropertyTypes() {
    return [...registry.values()];
}
// Singleton global value
export const registry = new MapRegistry();
builtinCellProperties.forEach((e) => registry.set(e.cellProperty, e));
//# sourceMappingURL=registry.js.map