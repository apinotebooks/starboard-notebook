"use strict";
function getCurrentScriptPrefix() {
    const cs = document.currentScript;
    if (cs) {
        return cs.src.substring(0, cs.src.lastIndexOf("/") + 1);
    }
}
// @ts-ignore
__webpack_public_path__ = window.starboardArtifactsUrl || getCurrentScriptPrefix() || "./";
//# sourceMappingURL=publicPath.js.map