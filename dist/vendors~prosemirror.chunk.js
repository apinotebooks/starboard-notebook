(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~prosemirror"],{

/***/ "./node_modules/crelt/index.es.js":
/*!****************************************!*\
  !*** ./node_modules/crelt/index.es.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crelt; });
function crelt() {
  var elt = arguments[0]
  if (typeof elt == "string") elt = document.createElement(elt)
  var i = 1, next = arguments[1]
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next) if (Object.prototype.hasOwnProperty.call(next, name)) {
      var value = next[name]
      if (typeof value == "string") elt.setAttribute(name, value)
      else if (value != null) elt[name] = value
    }
    i++
  }
  for (; i < arguments.length; i++) add(elt, arguments[i])
  return elt
}

function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child))
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child)
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++) add(elt, child[i])
  } else {
    throw new RangeError("Unsupported child node: " + child)
  }
}


/***/ }),

/***/ "./node_modules/prosemirror-commands/dist/index.es.js":
/*!************************************************************!*\
  !*** ./node_modules/prosemirror-commands/dist/index.es.js ***!
  \************************************************************/
/*! exports provided: autoJoin, baseKeymap, chainCommands, createParagraphNear, deleteSelection, exitCode, joinBackward, joinDown, joinForward, joinUp, lift, liftEmptyBlock, macBaseKeymap, newlineInCode, pcBaseKeymap, selectAll, selectNodeBackward, selectNodeForward, selectParentNode, setBlockType, splitBlock, splitBlockKeepMarks, toggleMark, wrapIn */
/*! exports used: baseKeymap, chainCommands, deleteSelection, exitCode, joinDown, joinUp, lift, newlineInCode, selectParentNode, setBlockType, toggleMark, wrapIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export autoJoin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return baseKeymap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return chainCommands; });
/* unused harmony export createParagraphNear */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return deleteSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return exitCode; });
/* unused harmony export joinBackward */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return joinDown; });
/* unused harmony export joinForward */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return joinUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return lift; });
/* unused harmony export liftEmptyBlock */
/* unused harmony export macBaseKeymap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return newlineInCode; });
/* unused harmony export pcBaseKeymap */
/* unused harmony export selectAll */
/* unused harmony export selectNodeBackward */
/* unused harmony export selectNodeForward */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return selectParentNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return setBlockType; });
/* unused harmony export splitBlock */
/* unused harmony export splitBlockKeepMarks */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return toggleMark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return wrapIn; });
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");




// :: (EditorState, ?(tr: Transaction)) → bool
// Delete the selection, if there is one.
function deleteSelection(state, dispatch) {
  if (state.selection.empty) { return false }
  if (dispatch) { dispatch(state.tr.deleteSelection().scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// If the selection is empty and at the start of a textblock, try to
// reduce the distance between that block and the one before it—if
// there's a block directly before it that can be joined, join them.
// If not, try to move the selected block closer to the next one in
// the document structure by lifting it out of its parent or moving it
// into a parent of the previous block. Will use the view for accurate
// (bidi-aware) start-of-textblock detection if given.
function joinBackward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("backward", state)
                        : $cursor.parentOffset > 0))
    { return false }

  var $cut = findCutBefore($cursor);

  // If there is no node before this, try to lift
  if (!$cut) {
    var range = $cursor.blockRange(), target = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* liftTarget */ "k"])(range);
    if (target == null) { return false }
    if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
    return true
  }

  var before = $cut.nodeBefore;
  // Apply the joining algorithm
  if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch))
    { return true }

  // If the node below has no content and the node above is
  // selectable, delete the node below and select the one above.
  if ($cursor.parent.content.size == 0 &&
      (textblockAt(before, "end") || prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].isSelectable(before))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(before, "end") ? prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* Selection */ "f"].findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1)
                      : prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(tr.doc, $cut.pos - before.nodeSize));
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  // If the node before is an atom, delete it
  if (before.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) { dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView()); }
    return true
  }

  return false
}

function textblockAt(node, side) {
  for (; node; node = (side == "start" ? node.firstChild : node.lastChild))
    { if (node.isTextblock) { return true } }
  return false
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// When the selection is empty and at the start of a textblock, select
// the node before that textblock, if possible. This is intended to be
// bound to keys like backspace, after
// [`joinBackward`](#commands.joinBackward) or other deleting
// commands, as a fall-back behavior when the schema doesn't allow
// deletion at the selected point.
function selectNodeBackward(state, dispatch, view) {
  var ref = state.selection;
  var $head = ref.$head;
  var empty = ref.empty;
  var $cut = $head;
  if (!empty) { return false }

  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) { return false }
    $cut = findCutBefore($head);
  }
  var node = $cut && $cut.nodeBefore;
  if (!node || !prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].isSelectable(node)) { return false }
  if (dispatch)
    { dispatch(state.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView()); }
  return true
}

function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) { for (var i = $pos.depth - 1; i >= 0; i--) {
    if ($pos.index(i) > 0) { return $pos.doc.resolve($pos.before(i + 1)) }
    if ($pos.node(i).type.spec.isolating) { break }
  } }
  return null
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// If the selection is empty and the cursor is at the end of a
// textblock, try to reduce or remove the boundary between that block
// and the one after it, either by joining them or by moving the other
// block closer to this one in the tree structure. Will use the view
// for accurate start-of-textblock detection if given.
function joinForward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("forward", state)
                        : $cursor.parentOffset < $cursor.parent.content.size))
    { return false }

  var $cut = findCutAfter($cursor);

  // If there is no node after this, there's nothing to do
  if (!$cut) { return false }

  var after = $cut.nodeAfter;
  // Try the joining algorithm
  if (deleteBarrier(state, $cut, dispatch)) { return true }

  // If the node above has no content and the node below is
  // selectable, delete the node above and select the one below.
  if ($cursor.parent.content.size == 0 &&
      (textblockAt(after, "start") || prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].isSelectable(after))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(after, "start") ? prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* Selection */ "f"].findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1)
                      : prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(tr.doc, tr.mapping.map($cut.pos)));
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  // If the next node is an atom, delete it
  if (after.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) { dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView()); }
    return true
  }

  return false
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// When the selection is empty and at the end of a textblock, select
// the node coming after that textblock, if possible. This is intended
// to be bound to keys like delete, after
// [`joinForward`](#commands.joinForward) and similar deleting
// commands, to provide a fall-back behavior when the schema doesn't
// allow deletion at the selected point.
function selectNodeForward(state, dispatch, view) {
  var ref = state.selection;
  var $head = ref.$head;
  var empty = ref.empty;
  var $cut = $head;
  if (!empty) { return false }
  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size)
      { return false }
    $cut = findCutAfter($head);
  }
  var node = $cut && $cut.nodeAfter;
  if (!node || !prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].isSelectable(node)) { return false }
  if (dispatch)
    { dispatch(state.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(state.doc, $cut.pos)).scrollIntoView()); }
  return true
}

function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) { for (var i = $pos.depth - 1; i >= 0; i--) {
    var parent = $pos.node(i);
    if ($pos.index(i) + 1 < parent.childCount) { return $pos.doc.resolve($pos.after(i + 1)) }
    if (parent.type.spec.isolating) { break }
  } }
  return null
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Join the selected block or, if there is a text selection, the
// closest ancestor block of the selection that can be joined, with
// the sibling above it.
function joinUp(state, dispatch) {
  var sel = state.selection, nodeSel = sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"], point;
  if (nodeSel) {
    if (sel.node.isTextblock || !Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canJoin */ "f"])(state.doc, sel.from)) { return false }
    point = sel.from;
  } else {
    point = Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* joinPoint */ "j"])(state.doc, sel.from, -1);
    if (point == null) { return false }
  }
  if (dispatch) {
    var tr = state.tr.join(point);
    if (nodeSel) { tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize)); }
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Join the selected block, or the closest ancestor of the selection
// that can be joined, with the sibling after it.
function joinDown(state, dispatch) {
  var sel = state.selection, point;
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"]) {
    if (sel.node.isTextblock || !Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canJoin */ "f"])(state.doc, sel.to)) { return false }
    point = sel.to;
  } else {
    point = Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* joinPoint */ "j"])(state.doc, sel.to, 1);
    if (point == null) { return false }
  }
  if (dispatch)
    { dispatch(state.tr.join(point).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Lift the selected block, or the closest ancestor block of the
// selection that can be lifted, out of its parent node.
function lift(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  var range = $from.blockRange($to), target = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* liftTarget */ "k"])(range);
  if (target == null) { return false }
  if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If the selection is in a node whose type has a truthy
// [`code`](#model.NodeSpec.code) property in its spec, replace the
// selection with a newline character.
function newlineInCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) { return false }
  if (dispatch) { dispatch(state.tr.insertText("\n").scrollIntoView()); }
  return true
}

function defaultBlockAt(match) {
  for (var i = 0; i < match.edgeCount; i++) {
    var ref = match.edge(i);
    var type = ref.type;
    if (type.isTextblock && !type.hasRequiredAttrs()) { return type }
  }
  return null
}

// :: (EditorState, ?(tr: Transaction)) → bool
// When the selection is in a node with a truthy
// [`code`](#model.NodeSpec.code) property in its spec, create a
// default block after the code block, and move the cursor there.
function exitCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) { return false }
  var above = $head.node(-1), after = $head.indexAfter(-1), type = defaultBlockAt(above.contentMatchAt(after));
  if (!above.canReplaceWith(after, after, type)) { return false }
  if (dispatch) {
    var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* Selection */ "f"].near(tr.doc.resolve(pos), 1));
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If a block node is selected, create an empty paragraph before (if
// it is its parent's first child) or after it.
function createParagraphNear(state, dispatch) {
  var sel = state.selection;
  var $from = sel.$from;
  var $to = sel.$to;
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* AllSelection */ "a"] || $from.parent.inlineContent || $to.parent.inlineContent) { return false }
  var type = defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
  if (!type || !type.isTextblock) { return false }
  if (dispatch) {
    var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
    var tr = state.tr.insert(side, type.createAndFill());
    tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* TextSelection */ "g"].create(tr.doc, side + 1));
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If the cursor is in an empty textblock that can be lifted, lift the
// block.
function liftEmptyBlock(state, dispatch) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || $cursor.parent.content.size) { return false }
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    var before = $cursor.before();
    if (Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(state.doc, before)) {
      if (dispatch) { dispatch(state.tr.split(before).scrollIntoView()); }
      return true
    }
  }
  var range = $cursor.blockRange(), target = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* liftTarget */ "k"])(range);
  if (target == null) { return false }
  if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Split the parent block of the selection. If the selection is a text
// selection, also delete its content.
function splitBlock(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  if (state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"] && state.selection.node.isBlock) {
    if (!$from.parentOffset || !Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(state.doc, $from.pos)) { return false }
    if (dispatch) { dispatch(state.tr.split($from.pos).scrollIntoView()); }
    return true
  }

  if (!$from.parent.isBlock) { return false }

  if (dispatch) {
    var atEnd = $to.parentOffset == $to.parent.content.size;
    var tr = state.tr;
    if (state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* TextSelection */ "g"] || state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* AllSelection */ "a"]) { tr.deleteSelection(); }
    var deflt = $from.depth == 0 ? null : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
    var types = atEnd && deflt ? [{type: deflt}] : null;
    var can = Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(tr.doc, tr.mapping.map($from.pos), 1, types);
    if (!types && !can && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{type: deflt}])) {
      types = [{type: deflt}];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd && !$from.parentOffset && $from.parent.type != deflt &&
          $from.node(-1).canReplace($from.index(-1), $from.indexAfter(-1), prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from([deflt.create(), $from.parent])))
        { tr.setNodeMarkup(tr.mapping.map($from.before()), deflt); }
    }
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Acts like [`splitBlock`](#commands.splitBlock), but without
// resetting the set of active marks at the cursor.
function splitBlockKeepMarks(state, dispatch) {
  return splitBlock(state, dispatch && (function (tr) {
    var marks = state.storedMarks || (state.selection.$to.parentOffset && state.selection.$from.marks());
    if (marks) { tr.ensureMarks(marks); }
    dispatch(tr);
  }))
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Move the selection to the node wrapping the current selection, if
// any. (Will not select the document node.)
function selectParentNode(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var to = ref.to;
  var pos;
  var same = $from.sharedDepth(to);
  if (same == 0) { return false }
  pos = $from.before(same);
  if (dispatch) { dispatch(state.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* NodeSelection */ "c"].create(state.doc, pos))); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Select the whole document.
function selectAll(state, dispatch) {
  if (dispatch) { dispatch(state.tr.setSelection(new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* AllSelection */ "a"](state.doc))); }
  return true
}

function joinMaybeClear(state, $pos, dispatch) {
  var before = $pos.nodeBefore, after = $pos.nodeAfter, index = $pos.index();
  if (!before || !after || !before.type.compatibleContent(after.type)) { return false }
  if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
    if (dispatch) { dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView()); }
    return true
  }
  if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canJoin */ "f"])(state.doc, $pos.pos)))
    { return false }
  if (dispatch)
    { dispatch(state.tr
             .clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount))
             .join($pos.pos)
             .scrollIntoView()); }
  return true
}

function deleteBarrier(state, $cut, dispatch) {
  var before = $cut.nodeBefore, after = $cut.nodeAfter, conn, match;
  if (before.type.spec.isolating || after.type.spec.isolating) { return false }
  if (joinMaybeClear(state, $cut, dispatch)) { return true }

  var canDelAfter = $cut.parent.canReplace($cut.index(), $cut.index() + 1);
  if (canDelAfter &&
      (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) &&
      match.matchType(conn[0] || after.type).validEnd) {
    if (dispatch) {
      var end = $cut.pos + after.nodeSize, wrap = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty;
      for (var i = conn.length - 1; i >= 0; i--)
        { wrap = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(conn[i].create(null, wrap)); }
      wrap = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(before.copy(wrap));
      var tr = state.tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"]($cut.pos - 1, end, $cut.pos, end, new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](wrap, 1, 0), conn.length, true));
      var joinAt = end + 2 * conn.length;
      if (Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canJoin */ "f"])(tr.doc, joinAt)) { tr.join(joinAt); }
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  var selAfter = prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* Selection */ "f"].findFrom($cut, 1);
  var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* liftTarget */ "k"])(range);
  if (target != null && target >= $cut.depth) {
    if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
    return true
  }

  if (canDelAfter && after.isTextblock && textblockAt(before, "end")) {
    var at = before, wrap$1 = [];
    for (;;) {
      wrap$1.push(at);
      if (at.isTextblock) { break }
      at = at.lastChild;
    }
    if (at.canReplace(at.childCount, at.childCount, after.content)) {
      if (dispatch) {
        var end$1 = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty;
        for (var i$1 = wrap$1.length - 1; i$1 >= 0; i$1--) { end$1 = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(wrap$1[i$1].copy(end$1)); }
        var tr$1 = state.tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"]($cut.pos - wrap$1.length, $cut.pos + after.nodeSize,
                                                     $cut.pos + 1, $cut.pos + after.nodeSize - 1,
                                                     new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](end$1, wrap$1.length, 0), 0, true));
        dispatch(tr$1.scrollIntoView());
      }
      return true
    }
  }

  return false
}

// Parameterized commands

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Wrap the selection in a node of the given type with the given
// attributes.
function wrapIn(nodeType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to), wrapping = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* findWrapping */ "i"])(range, nodeType, attrs);
    if (!wrapping) { return false }
    if (dispatch) { dispatch(state.tr.wrap(range, wrapping).scrollIntoView()); }
    return true
  }
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command that tries to set the selected textblocks to the
// given node type with the given attributes.
function setBlockType(nodeType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var from = ref.from;
    var to = ref.to;
    var applicable = false;
    state.doc.nodesBetween(from, to, function (node, pos) {
      if (applicable) { return false }
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) { return }
      if (node.type == nodeType) {
        applicable = true;
      } else {
        var $pos = state.doc.resolve(pos), index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
    });
    if (!applicable) { return false }
    if (dispatch) { dispatch(state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView()); }
    return true
  }
}

function markApplies(doc, ranges, type) {
  var loop = function ( i ) {
    var ref = ranges[i];
    var $from = ref.$from;
    var $to = ref.$to;
    var can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, function (node) {
      if (can) { return false }
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) { return { v: true } }
  };

  for (var i = 0; i < ranges.length; i++) {
    var returned = loop( i );

    if ( returned ) return returned.v;
  }
  return false
}

// :: (MarkType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command function that toggles the given mark with the
// given attributes. Will return `false` when the current selection
// doesn't support that mark. This will remove the mark if any marks
// of that type exist in the selection, or add it otherwise. If the
// selection is empty, this applies to the [stored
// marks](#state.EditorState.storedMarks) instead of a range of the
// document.
function toggleMark(markType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var empty = ref.empty;
    var $cursor = ref.$cursor;
    var ranges = ref.ranges;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) { return false }
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks()))
          { dispatch(state.tr.removeStoredMark(markType)); }
        else
          { dispatch(state.tr.addStoredMark(markType.create(attrs))); }
      } else {
        var has = false, tr = state.tr;
        for (var i = 0; !has && i < ranges.length; i++) {
          var ref$1 = ranges[i];
          var $from = ref$1.$from;
          var $to = ref$1.$to;
          has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
        }
        for (var i$1 = 0; i$1 < ranges.length; i$1++) {
          var ref$2 = ranges[i$1];
          var $from$1 = ref$2.$from;
          var $to$1 = ref$2.$to;
          if (has) {
            tr.removeMark($from$1.pos, $to$1.pos, markType);
          } else {
            var from = $from$1.pos, to = $to$1.pos, start = $from$1.nodeAfter, end = $to$1.nodeBefore;
            var spaceStart = start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
            var spaceEnd = end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
            if (from + spaceStart < to) { from += spaceStart; to -= spaceEnd; }
            tr.addMark(from, to, markType.create(attrs));
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true
  }
}

function wrapDispatchForJoin(dispatch, isJoinable) {
  return function (tr) {
    if (!tr.isGeneric) { return dispatch(tr) }

    var ranges = [];
    for (var i = 0; i < tr.mapping.maps.length; i++) {
      var map = tr.mapping.maps[i];
      for (var j = 0; j < ranges.length; j++)
        { ranges[j] = map.map(ranges[j]); }
      map.forEach(function (_s, _e, from, to) { return ranges.push(from, to); });
    }

    // Figure out which joinable points exist inside those ranges,
    // by checking all node boundaries in their parent nodes.
    var joinable = [];
    for (var i$1 = 0; i$1 < ranges.length; i$1 += 2) {
      var from = ranges[i$1], to = ranges[i$1 + 1];
      var $from = tr.doc.resolve(from), depth = $from.sharedDepth(to), parent = $from.node(depth);
      for (var index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index) {
        var after = parent.maybeChild(index);
        if (!after) { break }
        if (index && joinable.indexOf(pos) == -1) {
          var before = parent.child(index - 1);
          if (before.type == after.type && isJoinable(before, after))
            { joinable.push(pos); }
        }
        pos += after.nodeSize;
      }
    }
    // Join the joinable points
    joinable.sort(function (a, b) { return a - b; });
    for (var i$2 = joinable.length - 1; i$2 >= 0; i$2--) {
      if (Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canJoin */ "f"])(tr.doc, joinable[i$2])) { tr.join(joinable[i$2]); }
    }
    dispatch(tr);
  }
}

// :: ((state: EditorState, ?(tr: Transaction)) → bool, union<(before: Node, after: Node) → bool, [string]>) → (state: EditorState, ?(tr: Transaction)) → bool
// Wrap a command so that, when it produces a transform that causes
// two joinable nodes to end up next to each other, those are joined.
// Nodes are considered joinable when they are of the same type and
// when the `isJoinable` predicate returns true for them or, if an
// array of strings was passed, if their node type name is in that
// array.
function autoJoin(command, isJoinable) {
  if (Array.isArray(isJoinable)) {
    var types = isJoinable;
    isJoinable = function (node) { return types.indexOf(node.type.name) > -1; };
  }
  return function (state, dispatch) { return command(state, dispatch && wrapDispatchForJoin(dispatch, isJoinable)); }
}

// :: (...[(EditorState, ?(tr: Transaction), ?EditorView) → bool]) → (EditorState, ?(tr: Transaction), ?EditorView) → bool
// Combine a number of command functions into a single function (which
// calls them one by one until one returns true).
function chainCommands() {
  var commands = [], len = arguments.length;
  while ( len-- ) commands[ len ] = arguments[ len ];

  return function(state, dispatch, view) {
    for (var i = 0; i < commands.length; i++)
      { if (commands[i](state, dispatch, view)) { return true } }
    return false
  }
}

var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
var del = chainCommands(deleteSelection, joinForward, selectNodeForward);

// :: Object
// A basic keymap containing bindings not specific to any schema.
// Binds the following keys (when multiple commands are listed, they
// are chained with [`chainCommands`](#commands.chainCommands)):
//
// * **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
// * **Mod-Enter** to `exitCode`
// * **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
// * **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
// * **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
// * **Mod-a** to `selectAll`
var pcBaseKeymap = {
  "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
  "Mod-Enter": exitCode,
  "Backspace": backspace,
  "Mod-Backspace": backspace,
  "Delete": del,
  "Mod-Delete": del,
  "Mod-a": selectAll
};

// :: Object
// A copy of `pcBaseKeymap` that also binds **Ctrl-h** like Backspace,
// **Ctrl-d** like Delete, **Alt-Backspace** like Ctrl-Backspace, and
// **Ctrl-Alt-Backspace**, **Alt-Delete**, and **Alt-d** like
// Ctrl-Delete.
var macBaseKeymap = {
  "Ctrl-h": pcBaseKeymap["Backspace"],
  "Alt-Backspace": pcBaseKeymap["Mod-Backspace"],
  "Ctrl-d": pcBaseKeymap["Delete"],
  "Ctrl-Alt-Backspace": pcBaseKeymap["Mod-Delete"],
  "Alt-Delete": pcBaseKeymap["Mod-Delete"],
  "Alt-d": pcBaseKeymap["Mod-Delete"]
};
for (var key in pcBaseKeymap) { macBaseKeymap[key] = pcBaseKeymap[key]; }

// declare global: os, navigator
var mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform)
          : typeof os != "undefined" ? os.platform() == "darwin" : false;

// :: Object
// Depending on the detected platform, this will hold
// [`pcBasekeymap`](#commands.pcBaseKeymap) or
// [`macBaseKeymap`](#commands.macBaseKeymap).
var baseKeymap = mac ? macBaseKeymap : pcBaseKeymap;


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-dropcursor/dist/index.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/prosemirror-dropcursor/dist/index.es.js ***!
  \**************************************************************/
/*! exports provided: dropCursor */
/*! exports used: dropCursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dropCursor; });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");



// :: (options: ?Object) → Plugin
// Create a plugin that, when added to a ProseMirror instance,
// causes a decoration to show up at the drop position when something
// is dragged over the editor.
//
//   options::- These options are supported:
//
//     color:: ?string
//     The color of the cursor. Defaults to `black`.
//
//     width:: ?number
//     The precise width of the cursor in pixels. Defaults to 1.
//
//     class:: ?string
//     A CSS class name to add to the cursor element.
function dropCursor(options) {
  if ( options === void 0 ) options = {};

  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Plugin */ "d"]({
    view: function view(editorView) { return new DropCursorView(editorView, options) }
  })
}

var DropCursorView = function DropCursorView(editorView, options) {
  var this$1 = this;

  this.editorView = editorView;
  this.width = options.width || 1;
  this.color = options.color || "black";
  this.class = options.class;
  this.cursorPos = null;
  this.element = null;
  this.timeout = null;

  this.handlers = ["dragover", "dragend", "drop", "dragleave"].map(function (name) {
    var handler = function (e) { return this$1[name](e); };
    editorView.dom.addEventListener(name, handler);
    return {name: name, handler: handler}
  });
};

DropCursorView.prototype.destroy = function destroy () {
    var this$1 = this;

  this.handlers.forEach(function (ref) {
      var name = ref.name;
      var handler = ref.handler;

      return this$1.editorView.dom.removeEventListener(name, handler);
    });
};

DropCursorView.prototype.update = function update (editorView, prevState) {
  if (this.cursorPos != null && prevState.doc != editorView.state.doc) { this.updateOverlay(); }
};

DropCursorView.prototype.setCursor = function setCursor (pos) {
  if (pos == this.cursorPos) { return }
  this.cursorPos = pos;
  if (pos == null) {
    this.element.parentNode.removeChild(this.element);
    this.element = null;
  } else {
    this.updateOverlay();
  }
};

DropCursorView.prototype.updateOverlay = function updateOverlay () {
  var $pos = this.editorView.state.doc.resolve(this.cursorPos), rect;
  if (!$pos.parent.inlineContent) {
    var before = $pos.nodeBefore, after = $pos.nodeAfter;
    if (before || after) {
      var nodeRect = this.editorView.nodeDOM(this.cursorPos - (before ?before.nodeSize : 0)).getBoundingClientRect();
      var top = before ? nodeRect.bottom : nodeRect.top;
      if (before && after)
        { top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2; }
      rect = {left: nodeRect.left, right: nodeRect.right, top: top - this.width / 2, bottom: top + this.width / 2};
    }
  }
  if (!rect) {
    var coords = this.editorView.coordsAtPos(this.cursorPos);
    rect = {left: coords.left - this.width / 2, right: coords.left + this.width / 2, top: coords.top, bottom: coords.bottom};
  }

  var parent = this.editorView.dom.offsetParent;
  if (!this.element) {
    this.element = parent.appendChild(document.createElement("div"));
    if (this.class) { this.element.className = this.class; }
    this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none; background-color: " + this.color;
  }
  var parentLeft, parentTop;
  if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
    parentLeft = -pageXOffset;
    parentTop = -pageYOffset;
  } else {
    var rect$1 = parent.getBoundingClientRect();
    parentLeft = rect$1.left - parent.scrollLeft;
    parentTop = rect$1.top - parent.scrollTop;
  }
  this.element.style.left = (rect.left - parentLeft) + "px";
  this.element.style.top = (rect.top - parentTop) + "px";
  this.element.style.width = (rect.right - rect.left) + "px";
  this.element.style.height = (rect.bottom - rect.top) + "px";
};

DropCursorView.prototype.scheduleRemoval = function scheduleRemoval (timeout) {
    var this$1 = this;

  clearTimeout(this.timeout);
  this.timeout = setTimeout(function () { return this$1.setCursor(null); }, timeout);
};

DropCursorView.prototype.dragover = function dragover (event) {
  if (!this.editorView.editable) { return }
  var pos = this.editorView.posAtCoords({left: event.clientX, top: event.clientY});
  if (pos) {
    var target = pos.pos;
    if (this.editorView.dragging && this.editorView.dragging.slice) {
      target = Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__[/* dropPoint */ "h"])(this.editorView.state.doc, target, this.editorView.dragging.slice);
      if (target == null) { target = pos.pos; }
    }
    this.setCursor(target);
    this.scheduleRemoval(5000);
  }
};

DropCursorView.prototype.dragend = function dragend () {
  this.scheduleRemoval(20);
};

DropCursorView.prototype.drop = function drop () {
  this.scheduleRemoval(20);
};

DropCursorView.prototype.dragleave = function dragleave (event) {
  if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget))
    { this.setCursor(null); }
};


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-gapcursor/dist/index.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/prosemirror-gapcursor/dist/index.es.js ***!
  \*************************************************************/
/*! exports provided: GapCursor, gapCursor */
/*! exports used: gapCursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GapCursor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gapCursor; });
/* harmony import */ var prosemirror_keymap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-keymap */ "./node_modules/prosemirror-keymap/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");





// ::- Gap cursor selections are represented using this class. Its
// `$anchor` and `$head` properties both point at the cursor position.
var GapCursor = /*@__PURE__*/(function (Selection) {
  function GapCursor($pos) {
    Selection.call(this, $pos, $pos);
  }

  if ( Selection ) GapCursor.__proto__ = Selection;
  GapCursor.prototype = Object.create( Selection && Selection.prototype );
  GapCursor.prototype.constructor = GapCursor;

  GapCursor.prototype.map = function map (doc, mapping) {
    var $pos = doc.resolve(mapping.map(this.head));
    return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos)
  };

  GapCursor.prototype.content = function content () { return prosemirror_model__WEBPACK_IMPORTED_MODULE_3__[/* Slice */ "j"].empty };

  GapCursor.prototype.eq = function eq (other) {
    return other instanceof GapCursor && other.head == this.head
  };

  GapCursor.prototype.toJSON = function toJSON () {
    return {type: "gapcursor", pos: this.head}
  };

  GapCursor.fromJSON = function fromJSON (doc, json) {
    if (typeof json.pos != "number") { throw new RangeError("Invalid input for GapCursor.fromJSON") }
    return new GapCursor(doc.resolve(json.pos))
  };

  GapCursor.prototype.getBookmark = function getBookmark () { return new GapBookmark(this.anchor) };

  GapCursor.valid = function valid ($pos) {
    var parent = $pos.parent;
    if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) { return false }
    var override = parent.type.spec.allowGapCursor;
    if (override != null) { return override }
    var deflt = parent.contentMatchAt($pos.index()).defaultType;
    return deflt && deflt.isTextblock
  };

  GapCursor.findFrom = function findFrom ($pos, dir, mustMove) {
    search: for (;;) {
      if (!mustMove && GapCursor.valid($pos)) { return $pos }
      var pos = $pos.pos, next = null;
      // Scan up from this position
      for (var d = $pos.depth;; d--) {
        var parent = $pos.node(d);
        if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
          next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
          break
        } else if (d == 0) {
          return null
        }
        pos += dir;
        var $cur = $pos.doc.resolve(pos);
        if (GapCursor.valid($cur)) { return $cur }
      }

      // And then down into the next node
      for (;;) {
        var inside = dir > 0 ? next.firstChild : next.lastChild;
        if (!inside) {
          if (next.isAtom && !next.isText && !prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* NodeSelection */ "c"].isSelectable(next)) {
            $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
            mustMove = false;
            continue search
          }
          break
        }
        next = inside;
        pos += dir;
        var $cur$1 = $pos.doc.resolve(pos);
        if (GapCursor.valid($cur$1)) { return $cur$1 }
      }

      return null
    }
  };

  return GapCursor;
}(prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Selection */ "f"]));

GapCursor.prototype.visible = false;

prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Selection */ "f"].jsonID("gapcursor", GapCursor);

var GapBookmark = function GapBookmark(pos) {
  this.pos = pos;
};
GapBookmark.prototype.map = function map (mapping) {
  return new GapBookmark(mapping.map(this.pos))
};
GapBookmark.prototype.resolve = function resolve (doc) {
  var $pos = doc.resolve(this.pos);
  return GapCursor.valid($pos) ? new GapCursor($pos) : prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Selection */ "f"].near($pos)
};

function closedBefore($pos) {
  for (var d = $pos.depth; d >= 0; d--) {
    var index = $pos.index(d);
    // At the start of this parent, look at next one
    if (index == 0) { continue }
    // See if the node before (or its first ancestor) is closed
    for (var before = $pos.node(d).child(index - 1);; before = before.lastChild) {
      if ((before.childCount == 0 && !before.inlineContent) || before.isAtom || before.type.spec.isolating) { return true }
      if (before.inlineContent) { return false }
    }
  }
  // Hit start of document
  return true
}

function closedAfter($pos) {
  for (var d = $pos.depth; d >= 0; d--) {
    var index = $pos.indexAfter(d), parent = $pos.node(d);
    if (index == parent.childCount) { continue }
    for (var after = parent.child(index);; after = after.firstChild) {
      if ((after.childCount == 0 && !after.inlineContent) || after.isAtom || after.type.spec.isolating) { return true }
      if (after.inlineContent) { return false }
    }
  }
  return true
}

// :: () → Plugin
// Create a gap cursor plugin. When enabled, this will capture clicks
// near and arrow-key-motion past places that don't have a normally
// selectable position nearby, and create a gap cursor selection for
// them. The cursor is drawn as an element with class
// `ProseMirror-gapcursor`. You can either include
// `style/gapcursor.css` from the package's directory or add your own
// styles to make it visible.
var gapCursor = function() {
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Plugin */ "d"]({
    props: {
      decorations: drawGapCursor,

      createSelectionBetween: function createSelectionBetween(_view, $anchor, $head) {
        if ($anchor.pos == $head.pos && GapCursor.valid($head)) { return new GapCursor($head) }
      },

      handleClick: handleClick,
      handleKeyDown: handleKeyDown
    }
  })
};

var handleKeyDown = Object(prosemirror_keymap__WEBPACK_IMPORTED_MODULE_0__[/* keydownHandler */ "a"])({
  "ArrowLeft": arrow("horiz", -1),
  "ArrowRight": arrow("horiz", 1),
  "ArrowUp": arrow("vert", -1),
  "ArrowDown": arrow("vert", 1)
});

function arrow(axis, dir) {
  var dirStr = axis == "vert" ? (dir > 0 ? "down" : "up") : (dir > 0 ? "right" : "left");
  return function(state, dispatch, view) {
    var sel = state.selection;
    var $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
    if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* TextSelection */ "g"]) {
      if (!view.endOfTextblock(dirStr) || $start.depth == 0) { return false }
      mustMove = false;
      $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
    }
    var $found = GapCursor.findFrom($start, dir, mustMove);
    if (!$found) { return false }
    if (dispatch) { dispatch(state.tr.setSelection(new GapCursor($found))); }
    return true
  }
}

function handleClick(view, pos, event) {
  if (!view.editable) { return false }
  var $pos = view.state.doc.resolve(pos);
  if (!GapCursor.valid($pos)) { return false }
  var ref = view.posAtCoords({left: event.clientX, top: event.clientY});
  var inside = ref.inside;
  if (inside > -1 && prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* NodeSelection */ "c"].isSelectable(view.state.doc.nodeAt(inside))) { return false }
  view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
  return true
}

function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor)) { return null }
  var node = document.createElement("div");
  node.className = "ProseMirror-gapcursor";
  return prosemirror_view__WEBPACK_IMPORTED_MODULE_2__[/* DecorationSet */ "b"].create(state.doc, [prosemirror_view__WEBPACK_IMPORTED_MODULE_2__[/* Decoration */ "a"].widget(state.selection.head, node, {key: "gapcursor"})])
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-history/dist/index.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/prosemirror-history/dist/index.es.js ***!
  \***********************************************************/
/*! exports provided: HistoryState, closeHistory, history, redo, redoDepth, undo, undoDepth */
/*! exports used: history, redo, undo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HistoryState */
/* unused harmony export closeHistory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return history; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return redo; });
/* unused harmony export redoDepth */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return undo; });
/* unused harmony export undoDepth */
/* harmony import */ var rope_sequence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rope-sequence */ "./node_modules/rope-sequence/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");




// ProseMirror's history isn't simply a way to roll back to a previous
// state, because ProseMirror supports applying changes without adding
// them to the history (for example during collaboration).
//
// To this end, each 'Branch' (one for the undo history and one for
// the redo history) keeps an array of 'Items', which can optionally
// hold a step (an actual undoable change), and always hold a position
// map (which is needed to move changes below them to apply to the
// current document).
//
// An item that has both a step and a selection bookmark is the start
// of an 'event' — a group of changes that will be undone or redone at
// once. (It stores only the bookmark, since that way we don't have to
// provide a document until the selection is actually applied, which
// is useful when compressing.)

// Used to schedule history compression
var max_empty_items = 500;

var Branch = function Branch(items, eventCount) {
  this.items = items;
  this.eventCount = eventCount;
};

// : (EditorState, bool) → ?{transform: Transform, selection: ?SelectionBookmark, remaining: Branch}
// Pop the latest event off the branch's history and apply it
// to a document transform.
Branch.prototype.popEvent = function popEvent (state, preserveItems) {
    var this$1 = this;

  if (this.eventCount == 0) { return null }

  var end = this.items.length;
  for (;; end--) {
    var next = this.items.get(end - 1);
    if (next.selection) { --end; break }
  }

  var remap, mapFrom;
  if (preserveItems) {
    remap = this.remapping(end, this.items.length);
    mapFrom = remap.maps.length;
  }
  var transform = state.tr;
  var selection, remaining;
  var addAfter = [], addBefore = [];

  this.items.forEach(function (item, i) {
    if (!item.step) {
      if (!remap) {
        remap = this$1.remapping(end, i + 1);
        mapFrom = remap.maps.length;
      }
      mapFrom--;
      addBefore.push(item);
      return
    }

    if (remap) {
      addBefore.push(new Item(item.map));
      var step = item.step.map(remap.slice(mapFrom)), map;

      if (step && transform.maybeStep(step).doc) {
        map = transform.mapping.maps[transform.mapping.maps.length - 1];
        addAfter.push(new Item(map, null, null, addAfter.length + addBefore.length));
      }
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
    } else {
      transform.maybeStep(item.step);
    }

    if (item.selection) {
      selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
      remaining = new Branch(this$1.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this$1.eventCount - 1);
      return false
    }
  }, this.items.length, 0);

  return {remaining: remaining, transform: transform, selection: selection}
};

// : (Transform, ?SelectionBookmark, Object) → Branch
// Create a new branch with the given transform added.
Branch.prototype.addTransform = function addTransform (transform, selection, histOptions, preserveItems) {
  var newItems = [], eventCount = this.eventCount;
  var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;

  for (var i = 0; i < transform.steps.length; i++) {
    var step = transform.steps[i].invert(transform.docs[i]);
    var item = new Item(transform.mapping.maps[i], step, selection), merged = (void 0);
    if (merged = lastItem && lastItem.merge(item)) {
      item = merged;
      if (i) { newItems.pop(); }
      else { oldItems = oldItems.slice(0, oldItems.length - 1); }
    }
    newItems.push(item);
    if (selection) {
      eventCount++;
      selection = null;
    }
    if (!preserveItems) { lastItem = item; }
  }
  var overflow = eventCount - histOptions.depth;
  if (overflow > DEPTH_OVERFLOW) {
    oldItems = cutOffEvents(oldItems, overflow);
    eventCount -= overflow;
  }
  return new Branch(oldItems.append(newItems), eventCount)
};

Branch.prototype.remapping = function remapping (from, to) {
  var maps = new prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__[/* Mapping */ "a"];
  this.items.forEach(function (item, i) {
    var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from
        ? maps.maps.length - item.mirrorOffset : null;
    maps.appendMap(item.map, mirrorPos);
  }, from, to);
  return maps
};

Branch.prototype.addMaps = function addMaps (array) {
  if (this.eventCount == 0) { return this }
  return new Branch(this.items.append(array.map(function (map) { return new Item(map); })), this.eventCount)
};

// : (Transform, number)
// When the collab module receives remote changes, the history has
// to know about those, so that it can adjust the steps that were
// rebased on top of the remote changes, and include the position
// maps for the remote changes in its array of items.
Branch.prototype.rebased = function rebased (rebasedTransform, rebasedCount) {
  if (!this.eventCount) { return this }

  var rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);

  var mapping = rebasedTransform.mapping;
  var newUntil = rebasedTransform.steps.length;
  var eventCount = this.eventCount;
  this.items.forEach(function (item) { if (item.selection) { eventCount--; } }, start);

  var iRebased = rebasedCount;
  this.items.forEach(function (item) {
    var pos = mapping.getMirror(--iRebased);
    if (pos == null) { return }
    newUntil = Math.min(newUntil, pos);
    var map = mapping.maps[pos];
    if (item.step) {
      var step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
      var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
      if (selection) { eventCount++; }
      rebasedItems.push(new Item(map, step, selection));
    } else {
      rebasedItems.push(new Item(map));
    }
  }, start);

  var newMaps = [];
  for (var i = rebasedCount; i < newUntil; i++)
    { newMaps.push(new Item(mapping.maps[i])); }
  var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
  var branch = new Branch(items, eventCount);

  if (branch.emptyItemCount() > max_empty_items)
    { branch = branch.compress(this.items.length - rebasedItems.length); }
  return branch
};

Branch.prototype.emptyItemCount = function emptyItemCount () {
  var count = 0;
  this.items.forEach(function (item) { if (!item.step) { count++; } });
  return count
};

// Compressing a branch means rewriting it to push the air (map-only
// items) out. During collaboration, these naturally accumulate
// because each remote change adds one. The `upto` argument is used
// to ensure that only the items below a given level are compressed,
// because `rebased` relies on a clean, untouched set of items in
// order to associate old items with rebased steps.
Branch.prototype.compress = function compress (upto) {
    if ( upto === void 0 ) upto = this.items.length;

  var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
  var items = [], events = 0;
  this.items.forEach(function (item, i) {
    if (i >= upto) {
      items.push(item);
      if (item.selection) { events++; }
    } else if (item.step) {
      var step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
      if (step) {
        var selection = item.selection && item.selection.map(remap.slice(mapFrom));
        if (selection) { events++; }
        var newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
        if (merged = items.length && items[last].merge(newItem))
          { items[last] = merged; }
        else
          { items.push(newItem); }
      }
    } else if (item.map) {
      mapFrom--;
    }
  }, this.items.length, 0);
  return new Branch(rope_sequence__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].from(items.reverse()), events)
};

Branch.empty = new Branch(rope_sequence__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].empty, 0);

function cutOffEvents(items, n) {
  var cutPoint;
  items.forEach(function (item, i) {
    if (item.selection && (n-- == 0)) {
      cutPoint = i;
      return false
    }
  });
  return items.slice(cutPoint)
}

var Item = function Item(map, step, selection, mirrorOffset) {
  // The (forward) step map for this item.
  this.map = map;
  // The inverted step
  this.step = step;
  // If this is non-null, this item is the start of a group, and
  // this selection is the starting selection for the group (the one
  // that was active before the first step was applied)
  this.selection = selection;
  // If this item is the inverse of a previous mapping on the stack,
  // this points at the inverse's offset
  this.mirrorOffset = mirrorOffset;
};

Item.prototype.merge = function merge (other) {
  if (this.step && other.step && !other.selection) {
    var step = other.step.merge(this.step);
    if (step) { return new Item(step.getMap().invert(), step, this.selection) }
  }
};

// The value of the state field that tracks undo/redo history for that
// state. Will be stored in the plugin state when the history plugin
// is active.
var HistoryState = function HistoryState(done, undone, prevRanges, prevTime) {
  this.done = done;
  this.undone = undone;
  this.prevRanges = prevRanges;
  this.prevTime = prevTime;
};

var DEPTH_OVERFLOW = 20;

// : (HistoryState, EditorState, Transaction, Object)
// Record a transformation in undo history.
function applyTransaction(history, state, tr, options) {
  var historyTr = tr.getMeta(historyKey), rebased;
  if (historyTr) { return historyTr.historyState }

  if (tr.getMeta(closeHistoryKey)) { history = new HistoryState(history.done, history.undone, null, 0); }

  var appended = tr.getMeta("appendedTransaction");

  if (tr.steps.length == 0) {
    return history
  } else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo)
      { return new HistoryState(history.done.addTransform(tr, null, options, mustPreserveItems(state)),
                              history.undone, rangesFor(tr.mapping.maps[tr.steps.length - 1]), history.prevTime) }
    else
      { return new HistoryState(history.done, history.undone.addTransform(tr, null, options, mustPreserveItems(state)),
                              null, history.prevTime) }
  } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
    // Group transforms that occur in quick succession into one event.
    var newGroup = history.prevTime == 0 || !appended && (history.prevTime < (tr.time || 0) - options.newGroupDelay ||
                                                          !isAdjacentTo(tr, history.prevRanges));
    var prevRanges = appended ? mapRanges(history.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);
    return new HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null,
                                                      options, mustPreserveItems(state)),
                            Branch.empty, prevRanges, tr.time)
  } else if (rebased = tr.getMeta("rebased")) {
    // Used by the collab module to tell the history that some of its
    // content has been rebased.
    return new HistoryState(history.done.rebased(tr, rebased),
                            history.undone.rebased(tr, rebased),
                            mapRanges(history.prevRanges, tr.mapping), history.prevTime)
  } else {
    return new HistoryState(history.done.addMaps(tr.mapping.maps),
                            history.undone.addMaps(tr.mapping.maps),
                            mapRanges(history.prevRanges, tr.mapping), history.prevTime)
  }
}

function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges) { return false }
  if (!transform.docChanged) { return true }
  var adjacent = false;
  transform.mapping.maps[0].forEach(function (start, end) {
    for (var i = 0; i < prevRanges.length; i += 2)
      { if (start <= prevRanges[i + 1] && end >= prevRanges[i])
        { adjacent = true; } }
  });
  return adjacent
}

function rangesFor(map) {
  var result = [];
  map.forEach(function (_from, _to, from, to) { return result.push(from, to); });
  return result
}

function mapRanges(ranges, mapping) {
  if (!ranges) { return null }
  var result = [];
  for (var i = 0; i < ranges.length; i += 2) {
    var from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
    if (from <= to) { result.push(from, to); }
  }
  return result
}

// : (HistoryState, EditorState, (tr: Transaction), bool)
// Apply the latest event from one branch to the document and shift the event
// onto the other branch.
function histTransaction(history, state, dispatch, redo) {
  var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
  var pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) { return }

  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(),
                                                                  histOptions, preserveItems);

  var newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, {redo: redo, historyState: newHist}).scrollIntoView());
}

var cachedPreserveItems = false, cachedPreserveItemsPlugins = null;
// Check whether any plugin in the given state has a
// `historyPreserveItems` property in its spec, in which case we must
// preserve steps exactly as they came in, so that they can be
// rebased.
function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i = 0; i < plugins.length; i++) { if (plugins[i].spec.historyPreserveItems) {
      cachedPreserveItems = true;
      break
    } }
  }
  return cachedPreserveItems
}

// :: (Transaction) → Transaction
// Set a flag on the given transaction that will prevent further steps
// from being appended to an existing history event (so that they
// require a separate undo command to undo).
function closeHistory(tr) {
  return tr.setMeta(closeHistoryKey, true)
}

var historyKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* PluginKey */ "e"]("history");
var closeHistoryKey = new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* PluginKey */ "e"]("closeHistory");

// :: (?Object) → Plugin
// Returns a plugin that enables the undo history for an editor. The
// plugin will track undo and redo stacks, which can be used with the
// [`undo`](#history.undo) and [`redo`](#history.redo) commands.
//
// You can set an `"addToHistory"` [metadata
// property](#state.Transaction.setMeta) of `false` on a transaction
// to prevent it from being rolled back by undo.
//
//   config::-
//   Supports the following configuration options:
//
//     depth:: ?number
//     The amount of history events that are collected before the
//     oldest events are discarded. Defaults to 100.
//
//     newGroupDelay:: ?number
//     The delay between changes after which a new group should be
//     started. Defaults to 500 (milliseconds). Note that when changes
//     aren't adjacent, a new group is always started.
function history(config) {
  config = {depth: config && config.depth || 100,
            newGroupDelay: config && config.newGroupDelay || 500};
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_2__[/* Plugin */ "d"]({
    key: historyKey,

    state: {
      init: function init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0)
      },
      apply: function apply(tr, hist, state) {
        return applyTransaction(hist, state, tr, config)
      }
    },

    config: config
  })
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that undoes the last change, if any.
function undo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, false); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that redoes the last undone change, if any.
function redo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, true); }
  return true
}

// :: (EditorState) → number
// The amount of undoable events available in a given state.
function undoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.done.eventCount : 0
}

// :: (EditorState) → number
// The amount of redoable events available in a given editor state.
function redoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.undone.eventCount : 0
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-inputrules/dist/index.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/prosemirror-inputrules/dist/index.es.js ***!
  \**************************************************************/
/*! exports provided: InputRule, closeDoubleQuote, closeSingleQuote, ellipsis, emDash, inputRules, openDoubleQuote, openSingleQuote, smartQuotes, textblockTypeInputRule, undoInputRule, wrappingInputRule */
/*! exports used: InputRule, ellipsis, emDash, inputRules, smartQuotes, textblockTypeInputRule, undoInputRule, wrappingInputRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputRule; });
/* unused harmony export closeDoubleQuote */
/* unused harmony export closeSingleQuote */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return emDash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return inputRules; });
/* unused harmony export openDoubleQuote */
/* unused harmony export openSingleQuote */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return smartQuotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return textblockTypeInputRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return undoInputRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return wrappingInputRule; });
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");



// ::- Input rules are regular expressions describing a piece of text
// that, when typed, causes something to happen. This might be
// changing two dashes into an emdash, wrapping a paragraph starting
// with `"> "` into a blockquote, or something entirely different.
var InputRule = function InputRule(match, handler) {
  this.match = match;
  this.handler = typeof handler == "string" ? stringHandler(handler) : handler;
};

function stringHandler(string) {
  return function(state, match, start, end) {
    var insert = string;
    if (match[1]) {
      var offset = match[0].lastIndexOf(match[1]);
      insert += match[0].slice(offset + match[1].length);
      start += offset;
      var cutOff = start - end;
      if (cutOff > 0) {
        insert = match[0].slice(offset - cutOff, offset) + insert;
        start = end;
      }
    }
    return state.tr.insertText(insert, start, end)
  }
}

var MAX_MATCH = 500;

// :: (config: {rules: [InputRule]}) → Plugin
// Create an input rules plugin. When enabled, it will cause text
// input that matches any of the given rules to trigger the rule's
// action.
function inputRules(ref) {
  var rules = ref.rules;

  var plugin = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Plugin */ "d"]({
    state: {
      init: function init() { return null },
      apply: function apply(tr, prev) {
        var stored = tr.getMeta(this);
        if (stored) { return stored }
        return tr.selectionSet || tr.docChanged ? null : prev
      }
    },

    props: {
      handleTextInput: function handleTextInput(view, from, to, text) {
        return run(view, from, to, text, rules, plugin)
      },
      handleDOMEvents: {
        compositionend: function (view) {
          setTimeout(function () {
            var ref = view.state.selection;
            var $cursor = ref.$cursor;
            if ($cursor) { run(view, $cursor.pos, $cursor.pos, "", rules, plugin); }
          });
        }
      }
    },

    isInputRules: true
  });
  return plugin
}

function run(view, from, to, text, rules, plugin) {
  if (view.composing) { return false }
  var state = view.state, $from = state.doc.resolve(from);
  if ($from.parent.type.spec.code) { return false }
  var textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - MAX_MATCH), $from.parentOffset,
                                            null, "\ufffc") + text;
  for (var i = 0; i < rules.length; i++) {
    var match = rules[i].match.exec(textBefore);
    var tr = match && rules[i].handler(state, match, from - (match[0].length - text.length), to);
    if (!tr) { continue }
    view.dispatch(tr.setMeta(plugin, {transform: tr, from: from, to: to, text: text}));
    return true
  }
  return false
}

// :: (EditorState, ?(Transaction)) → bool
// This is a command that will undo an input rule, if applying such a
// rule was the last thing that the user did.
function undoInputRule(state, dispatch) {
  var plugins = state.plugins;
  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i], undoable = (void 0);
    if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
      if (dispatch) {
        var tr = state.tr, toUndo = undoable.transform;
        for (var j = toUndo.steps.length - 1; j >= 0; j--)
          { tr.step(toUndo.steps[j].invert(toUndo.docs[j])); }
        if (undoable.text) {
          var marks = tr.doc.resolve(undoable.from).marks();
          tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks));
        } else {
          tr.delete(undoable.from, undoable.to);
        }
        dispatch(tr);
      }
      return true
    }
  }
  return false
}

// :: InputRule Converts double dashes to an emdash.
var emDash = new InputRule(/--$/, "—");
// :: InputRule Converts three dots to an ellipsis character.
var ellipsis = new InputRule(/\.\.\.$/, "…");
// :: InputRule “Smart” opening double quotes.
var openDoubleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“");
// :: InputRule “Smart” closing double quotes.
var closeDoubleQuote = new InputRule(/"$/, "”");
// :: InputRule “Smart” opening single quotes.
var openSingleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘");
// :: InputRule “Smart” closing single quotes.
var closeSingleQuote = new InputRule(/'$/, "’");

// :: [InputRule] Smart-quote related input rules.
var smartQuotes = [openDoubleQuote, closeDoubleQuote, openSingleQuote, closeSingleQuote];

// :: (RegExp, NodeType, ?union<Object, ([string]) → ?Object>, ?([string], Node) → bool) → InputRule
// Build an input rule for automatically wrapping a textblock when a
// given string is typed. The `regexp` argument is
// directly passed through to the `InputRule` constructor. You'll
// probably want the regexp to start with `^`, so that the pattern can
// only occur at the start of a textblock.
//
// `nodeType` is the type of node to wrap in. If it needs attributes,
// you can either pass them directly, or pass a function that will
// compute them from the regular expression match.
//
// By default, if there's a node with the same type above the newly
// wrapped node, the rule will try to [join](#transform.Transform.join) those
// two nodes. You can pass a join predicate, which takes a regular
// expression match and the node before the wrapped node, and can
// return a boolean to indicate whether a join should happen.
function wrappingInputRule(regexp, nodeType, getAttrs, joinPredicate) {
  return new InputRule(regexp, function (state, match, start, end) {
    var attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    var tr = state.tr.delete(start, end);
    var $start = tr.doc.resolve(start), range = $start.blockRange(), wrapping = range && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__[/* findWrapping */ "i"])(range, nodeType, attrs);
    if (!wrapping) { return null }
    tr.wrap(range, wrapping);
    var before = tr.doc.resolve(start - 1).nodeBefore;
    if (before && before.type == nodeType && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_1__[/* canJoin */ "f"])(tr.doc, start - 1) &&
        (!joinPredicate || joinPredicate(match, before)))
      { tr.join(start - 1); }
    return tr
  })
}

// :: (RegExp, NodeType, ?union<Object, ([string]) → ?Object>) → InputRule
// Build an input rule that changes the type of a textblock when the
// matched text is typed into it. You'll usually want to start your
// regexp with `^` to that it is only matched at the start of a
// textblock. The optional `getAttrs` parameter can be used to compute
// the new node's attributes, and works the same as in the
// `wrappingInputRule` function.
function textblockTypeInputRule(regexp, nodeType, getAttrs) {
  return new InputRule(regexp, function (state, match, start, end) {
    var $start = state.doc.resolve(start);
    var attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)) { return null }
    return state.tr
      .delete(start, end)
      .setBlockType(start, start, nodeType, attrs)
  })
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-keymap/dist/index.es.js":
/*!**********************************************************!*\
  !*** ./node_modules/prosemirror-keymap/dist/index.es.js ***!
  \**********************************************************/
/*! exports provided: keydownHandler, keymap */
/*! exports used: keydownHandler, keymap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return keydownHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return keymap; });
/* harmony import */ var w3c_keyname__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! w3c-keyname */ "./node_modules/w3c-keyname/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");



// declare global: navigator

var mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : false;

function normalizeKeyName(name) {
  var parts = name.split(/-(?!$)/), result = parts[parts.length - 1];
  if (result == "Space") { result = " "; }
  var alt, ctrl, shift, meta;
  for (var i = 0; i < parts.length - 1; i++) {
    var mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) { meta = true; }
    else if (/^a(lt)?$/i.test(mod)) { alt = true; }
    else if (/^(c|ctrl|control)$/i.test(mod)) { ctrl = true; }
    else if (/^s(hift)?$/i.test(mod)) { shift = true; }
    else if (/^mod$/i.test(mod)) { if (mac) { meta = true; } else { ctrl = true; } }
    else { throw new Error("Unrecognized modifier name: " + mod) }
  }
  if (alt) { result = "Alt-" + result; }
  if (ctrl) { result = "Ctrl-" + result; }
  if (meta) { result = "Meta-" + result; }
  if (shift) { result = "Shift-" + result; }
  return result
}

function normalize(map) {
  var copy = Object.create(null);
  for (var prop in map) { copy[normalizeKeyName(prop)] = map[prop]; }
  return copy
}

function modifiers(name, event, shift) {
  if (event.altKey) { name = "Alt-" + name; }
  if (event.ctrlKey) { name = "Ctrl-" + name; }
  if (event.metaKey) { name = "Meta-" + name; }
  if (shift !== false && event.shiftKey) { name = "Shift-" + name; }
  return name
}

// :: (Object) → Plugin
// Create a keymap plugin for the given set of bindings.
//
// Bindings should map key names to [command](#commands)-style
// functions, which will be called with `(EditorState, dispatch,
// EditorView)` arguments, and should return true when they've handled
// the key. Note that the view argument isn't part of the command
// protocol, but can be used as an escape hatch if a binding needs to
// directly interact with the UI.
//
// Key names may be strings like `"Shift-Ctrl-Enter"`—a key
// identifier prefixed with zero or more modifiers. Key identifiers
// are based on the strings that can appear in
// [`KeyEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).
// Use lowercase letters to refer to letter keys (or uppercase letters
// if you want shift to be held). You may use `"Space"` as an alias
// for the `" "` name.
//
// Modifiers can be given in any order. `Shift-` (or `s-`), `Alt-` (or
// `a-`), `Ctrl-` (or `c-` or `Control-`) and `Cmd-` (or `m-` or
// `Meta-`) are recognized. For characters that are created by holding
// shift, the `Shift-` prefix is implied, and should not be added
// explicitly.
//
// You can use `Mod-` as a shorthand for `Cmd-` on Mac and `Ctrl-` on
// other platforms.
//
// You can add multiple keymap plugins to an editor. The order in
// which they appear determines their precedence (the ones early in
// the array get to dispatch first).
function keymap(bindings) {
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_1__[/* Plugin */ "d"]({props: {handleKeyDown: keydownHandler(bindings)}})
}

// :: (Object) → (view: EditorView, event: dom.Event) → bool
// Given a set of bindings (using the same format as
// [`keymap`](#keymap.keymap), return a [keydown
// handler](#view.EditorProps.handleKeyDown) that handles them.
function keydownHandler(bindings) {
  var map = normalize(bindings);
  return function(view, event) {
    var name = Object(w3c_keyname__WEBPACK_IMPORTED_MODULE_0__[/* keyName */ "b"])(event), isChar = name.length == 1 && name != " ", baseName;
    var direct = map[modifiers(name, event, !isChar)];
    if (direct && direct(view.state, view.dispatch, view)) { return true }
    if (isChar && (event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) &&
        (baseName = w3c_keyname__WEBPACK_IMPORTED_MODULE_0__[/* base */ "a"][event.keyCode]) && baseName != name) {
      // Try falling back to the keyCode when there's a modifier
      // active or the character produced isn't ASCII, and our table
      // produces a different name from the the keyCode. See #668,
      // #1060
      var fromCode = map[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) { return true }
    } else if (isChar && event.shiftKey) {
      // Otherwise, if shift is active, also try the binding with the
      // Shift- prefix enabled. See #997
      var withShift = map[modifiers(name, event, true)];
      if (withShift && withShift(view.state, view.dispatch, view)) { return true }
    }
    return false
  }
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-menu/dist/index.es.js":
/*!********************************************************!*\
  !*** ./node_modules/prosemirror-menu/dist/index.es.js ***!
  \********************************************************/
/*! exports provided: Dropdown, DropdownSubmenu, MenuItem, blockTypeItem, icons, joinUpItem, liftItem, menuBar, redoItem, renderGrouped, selectParentNodeItem, undoItem, wrapItem */
/*! exports used: Dropdown, DropdownSubmenu, MenuItem, blockTypeItem, icons, joinUpItem, liftItem, menuBar, redoItem, selectParentNodeItem, undoItem, wrapItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DropdownSubmenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return blockTypeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return icons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return joinUpItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return liftItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return menuBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return redoItem; });
/* unused harmony export renderGrouped */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return selectParentNodeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return undoItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return wrapItem; });
/* harmony import */ var crelt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crelt */ "./node_modules/crelt/index.es.js");
/* harmony import */ var prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-commands */ "./node_modules/prosemirror-commands/dist/index.es.js");
/* harmony import */ var prosemirror_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-history */ "./node_modules/prosemirror-history/dist/index.es.js");
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");





var SVG = "http://www.w3.org/2000/svg";
var XLINK = "http://www.w3.org/1999/xlink";

var prefix = "ProseMirror-icon";

function hashPath(path) {
  var hash = 0;
  for (var i = 0; i < path.length; i++)
    { hash = (((hash << 5) - hash) + path.charCodeAt(i)) | 0; }
  return hash
}

function getIcon(icon) {
  var node = document.createElement("div");
  node.className = prefix;
  if (icon.path) {
    var name = "pm-icon-" + hashPath(icon.path).toString(16);
    if (!document.getElementById(name)) { buildSVG(name, icon); }
    var svg = node.appendChild(document.createElementNS(SVG, "svg"));
    svg.style.width = (icon.width / icon.height) + "em";
    var use = svg.appendChild(document.createElementNS(SVG, "use"));
    use.setAttributeNS(XLINK, "href", /([^#]*)/.exec(document.location)[1] + "#" + name);
  } else if (icon.dom) {
    node.appendChild(icon.dom.cloneNode(true));
  } else {
    node.appendChild(document.createElement("span")).textContent = icon.text || '';
    if (icon.css) { node.firstChild.style.cssText = icon.css; }
  }
  return node
}

function buildSVG(name, data) {
  var collection = document.getElementById(prefix + "-collection");
  if (!collection) {
    collection = document.createElementNS(SVG, "svg");
    collection.id = prefix + "-collection";
    collection.style.display = "none";
    document.body.insertBefore(collection, document.body.firstChild);
  }
  var sym = document.createElementNS(SVG, "symbol");
  sym.id = name;
  sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height);
  var path = sym.appendChild(document.createElementNS(SVG, "path"));
  path.setAttribute("d", data.path);
  collection.appendChild(sym);
}

var prefix$1 = "ProseMirror-menu";

// ::- An icon or label that, when clicked, executes a command.
var MenuItem = function MenuItem(spec) {
  // :: MenuItemSpec
  // The spec used to create the menu item.
  this.spec = spec;
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
// Renders the icon according to its [display
// spec](#menu.MenuItemSpec.display), and adds an event handler which
// executes the command when the representation is clicked.
MenuItem.prototype.render = function render (view) {
  var spec = this.spec;
  var dom = spec.render ? spec.render(view)
      : spec.icon ? getIcon(spec.icon)
      : spec.label ? Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", null, translate(view, spec.label))
      : null;
  if (!dom) { throw new RangeError("MenuItem without icon or label property") }
  if (spec.title) {
    var title = (typeof spec.title === "function" ? spec.title(view.state) : spec.title);
    dom.setAttribute("title", translate(view, title));
  }
  if (spec.class) { dom.classList.add(spec.class); }
  if (spec.css) { dom.style.cssText += spec.css; }

  dom.addEventListener("mousedown", function (e) {
    e.preventDefault();
    if (!dom.classList.contains(prefix$1 + "-disabled"))
      { spec.run(view.state, view.dispatch, view, e); }
  });

  function update(state) {
    if (spec.select) {
      var selected = spec.select(state);
      dom.style.display = selected ? "" : "none";
      if (!selected) { return false }
    }
    var enabled = true;
    if (spec.enable) {
      enabled = spec.enable(state) || false;
      setClass(dom, prefix$1 + "-disabled", !enabled);
    }
    if (spec.active) {
      var active = enabled && spec.active(state) || false;
      setClass(dom, prefix$1 + "-active", active);
    }
    return true
  }

  return {dom: dom, update: update}
};

function translate(view, text) {
  return view._props.translate ? view._props.translate(text) : text
}

// MenuItemSpec:: interface
// The configuration object passed to the `MenuItem` constructor.
//
//   run:: (EditorState, (Transaction), EditorView, dom.Event)
//   The function to execute when the menu item is activated.
//
//   select:: ?(EditorState) → bool
//   Optional function that is used to determine whether the item is
//   appropriate at the moment. Deselected items will be hidden.
//
//   enable:: ?(EditorState) → bool
//   Function that is used to determine if the item is enabled. If
//   given and returning false, the item will be given a disabled
//   styling.
//
//   active:: ?(EditorState) → bool
//   A predicate function to determine whether the item is 'active' (for
//   example, the item for toggling the strong mark might be active then
//   the cursor is in strong text).
//
//   render:: ?(EditorView) → dom.Node
//   A function that renders the item. You must provide either this,
//   [`icon`](#menu.MenuItemSpec.icon), or [`label`](#MenuItemSpec.label).
//
//   icon:: ?Object
//   Describes an icon to show for this item. The object may specify
//   an SVG icon, in which case its `path` property should be an [SVG
//   path
//   spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d),
//   and `width` and `height` should provide the viewbox in which that
//   path exists. Alternatively, it may have a `text` property
//   specifying a string of text that makes up the icon, with an
//   optional `css` property giving additional CSS styling for the
//   text. _Or_ it may contain `dom` property containing a DOM node.
//
//   label:: ?string
//   Makes the item show up as a text label. Mostly useful for items
//   wrapped in a [drop-down](#menu.Dropdown) or similar menu. The object
//   should have a `label` property providing the text to display.
//
//   title:: ?union<string, (EditorState) → string>
//   Defines DOM title (mouseover) text for the item.
//
//   class:: ?string
//   Optionally adds a CSS class to the item's DOM representation.
//
//   css:: ?string
//   Optionally adds a string of inline CSS to the item's DOM
//   representation.

var lastMenuEvent = {time: 0, node: null};
function markMenuEvent(e) {
  lastMenuEvent.time = Date.now();
  lastMenuEvent.node = e.target;
}
function isMenuEvent(wrapper) {
  return Date.now() - 100 < lastMenuEvent.time &&
    lastMenuEvent.node && wrapper.contains(lastMenuEvent.node)
}

// ::- A drop-down menu, displayed as a label with a downwards-pointing
// triangle to the right of it.
var Dropdown = function Dropdown(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState)}
// Render the dropdown menu and sub-items.
Dropdown.prototype.render = function render (view) {
    var this$1 = this;

  var content = renderDropdownItems(this.content, view);

  var label = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-dropdown " + (this.options.class || ""),
                           style: this.options.css},
                   translate(view, this.options.label));
  if (this.options.title) { label.setAttribute("title", translate(view, this.options.title)); }
  var wrap = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-dropdown-wrap"}, label);
  var open = null, listeningOnClose = null;
  var close = function () {
    if (open && open.close()) {
      open = null;
      window.removeEventListener("mousedown", listeningOnClose);
    }
  };
  label.addEventListener("mousedown", function (e) {
    e.preventDefault();
    markMenuEvent(e);
    if (open) {
      close();
    } else {
      open = this$1.expand(wrap, content.dom);
      window.addEventListener("mousedown", listeningOnClose = function () {
        if (!isMenuEvent(wrap)) { close(); }
      });
    }
  });

  function update(state) {
    var inner = content.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner
  }

  return {dom: wrap, update: update}
};

Dropdown.prototype.expand = function expand (dom, items) {
  var menuDOM = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-dropdown-menu " + (this.options.class || "")}, items);

  var done = false;
  function close() {
    if (done) { return }
    done = true;
    dom.removeChild(menuDOM);
    return true
  }
  dom.appendChild(menuDOM);
  return {close: close, node: menuDOM}
};

function renderDropdownItems(items, view) {
  var rendered = [], updates = [];
  for (var i = 0; i < items.length; i++) {
    var ref = items[i].render(view);
    var dom = ref.dom;
    var update = ref.update;
    rendered.push(Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-dropdown-item"}, dom));
    updates.push(update);
  }
  return {dom: rendered, update: combineUpdates(updates, rendered)}
}

function combineUpdates(updates, nodes) {
  return function (state) {
    var something = false;
    for (var i = 0; i < updates.length; i++) {
      var up = updates[i](state);
      nodes[i].style.display = up ? "" : "none";
      if (up) { something = true; }
    }
    return something
  }
}

// ::- Represents a submenu wrapping a group of elements that start
// hidden and expand to the right when hovered over or tapped.
var DropdownSubmenu = function DropdownSubmenu(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
// Renders the submenu.
DropdownSubmenu.prototype.render = function render (view) {
  var items = renderDropdownItems(this.content, view);

  var label = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-submenu-label"}, translate(view, this.options.label));
  var wrap = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-submenu-wrap"}, label,
                 Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$1 + "-submenu"}, items.dom));
  var listeningOnClose = null;
  label.addEventListener("mousedown", function (e) {
    e.preventDefault();
    markMenuEvent(e);
    setClass(wrap, prefix$1 + "-submenu-wrap-active");
    if (!listeningOnClose)
      { window.addEventListener("mousedown", listeningOnClose = function () {
        if (!isMenuEvent(wrap)) {
          wrap.classList.remove(prefix$1 + "-submenu-wrap-active");
          window.removeEventListener("mousedown", listeningOnClose);
          listeningOnClose = null;
        }
      }); }
  });

  function update(state) {
    var inner = items.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner
  }
  return {dom: wrap, update: update}
};

// :: (EditorView, [union<MenuElement, [MenuElement]>]) → {dom: ?dom.DocumentFragment, update: (EditorState) → bool}
// Render the given, possibly nested, array of menu elements into a
// document fragment, placing separators between them (and ensuring no
// superfluous separators appear when some of the groups turn out to
// be empty).
function renderGrouped(view, content) {
  var result = document.createDocumentFragment();
  var updates = [], separators = [];
  for (var i = 0; i < content.length; i++) {
    var items = content[i], localUpdates = [], localNodes = [];
    for (var j = 0; j < items.length; j++) {
      var ref = items[j].render(view);
      var dom = ref.dom;
      var update$1 = ref.update;
      var span = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("span", {class: prefix$1 + "item"}, dom);
      result.appendChild(span);
      localNodes.push(span);
      localUpdates.push(update$1);
    }
    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
      if (i < content.length - 1)
        { separators.push(result.appendChild(separator())); }
    }
  }

  function update(state) {
    var something = false, needSep = false;
    for (var i = 0; i < updates.length; i++) {
      var hasContent = updates[i](state);
      if (i) { separators[i - 1].style.display = needSep && hasContent ? "" : "none"; }
      needSep = hasContent;
      if (hasContent) { something = true; }
    }
    return something
  }
  return {dom: result, update: update}
}

function separator() {
  return Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("span", {class: prefix$1 + "separator"})
}

// :: Object
// A set of basic editor-related icons. Contains the properties
// `join`, `lift`, `selectParentNode`, `undo`, `redo`, `strong`, `em`,
// `code`, `link`, `bulletList`, `orderedList`, and `blockquote`, each
// holding an object that can be used as the `icon` option to
// `MenuItem`.
var icons = {
  join: {
    width: 800, height: 900,
    path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
  },
  lift: {
    width: 1024, height: 1024,
    path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"
  },
  selectParentNode: {text: "\u2b1a", css: "font-weight: bold"},
  undo: {
    width: 1024, height: 1024,
    path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"
  },
  redo: {
    width: 1024, height: 1024,
    path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"
  },
  strong: {
    width: 805, height: 1024,
    path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"
  },
  em: {
    width: 585, height: 1024,
    path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
  },
  code: {
    width: 896, height: 1024,
    path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
  },
  link: {
    width: 951, height: 1024,
    path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"
  },
  bulletList: {
    width: 768, height: 896,
    path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
  },
  orderedList: {
    width: 768, height: 896,
    path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"
  },
  blockquote: {
    width: 640, height: 896,
    path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
  }
};

// :: MenuItem
// Menu item for the `joinUp` command.
var joinUpItem = new MenuItem({
  title: "Join with above block",
  run: prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* joinUp */ "f"],
  select: function (state) { return Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* joinUp */ "f"])(state); },
  icon: icons.join
});

// :: MenuItem
// Menu item for the `lift` command.
var liftItem = new MenuItem({
  title: "Lift out of enclosing block",
  run: prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* lift */ "g"],
  select: function (state) { return Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* lift */ "g"])(state); },
  icon: icons.lift
});

// :: MenuItem
// Menu item for the `selectParentNode` command.
var selectParentNodeItem = new MenuItem({
  title: "Select parent node",
  run: prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* selectParentNode */ "i"],
  select: function (state) { return Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* selectParentNode */ "i"])(state); },
  icon: icons.selectParentNode
});

// :: MenuItem
// Menu item for the `undo` command.
var undoItem = new MenuItem({
  title: "Undo last change",
  run: prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* undo */ "c"],
  enable: function (state) { return Object(prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* undo */ "c"])(state); },
  icon: icons.undo
});

// :: MenuItem
// Menu item for the `redo` command.
var redoItem = new MenuItem({
  title: "Redo last undone change",
  run: prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* redo */ "b"],
  enable: function (state) { return Object(prosemirror_history__WEBPACK_IMPORTED_MODULE_2__[/* redo */ "b"])(state); },
  icon: icons.redo
});

// :: (NodeType, Object) → MenuItem
// Build a menu item for wrapping the selection in a given node type.
// Adds `run` and `select` properties to the ones present in
// `options`. `options.attrs` may be an object or a function.
function wrapItem(nodeType, options) {
  var passedOptions = {
    run: function run(state, dispatch) {
      // FIXME if (options.attrs instanceof Function) options.attrs(state, attrs => wrapIn(nodeType, attrs)(state))
      return Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* wrapIn */ "l"])(nodeType, options.attrs)(state, dispatch)
    },
    select: function select(state) {
      return Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* wrapIn */ "l"])(nodeType, options.attrs instanceof Function ? null : options.attrs)(state)
    }
  };
  for (var prop in options) { passedOptions[prop] = options[prop]; }
  return new MenuItem(passedOptions)
}

// :: (NodeType, Object) → MenuItem
// Build a menu item for changing the type of the textblock around the
// selection to the given type. Provides `run`, `active`, and `select`
// properties. Others must be given in `options`. `options.attrs` may
// be an object to provide the attributes for the textblock node.
function blockTypeItem(nodeType, options) {
  var command = Object(prosemirror_commands__WEBPACK_IMPORTED_MODULE_1__[/* setBlockType */ "j"])(nodeType, options.attrs);
  var passedOptions = {
    run: command,
    enable: function enable(state) { return command(state) },
    active: function active(state) {
      var ref = state.selection;
      var $from = ref.$from;
      var to = ref.to;
      var node = ref.node;
      if (node) { return node.hasMarkup(nodeType, options.attrs) }
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs)
    }
  };
  for (var prop in options) { passedOptions[prop] = options[prop]; }
  return new MenuItem(passedOptions)
}

// Work around classList.toggle being broken in IE11
function setClass(dom, cls, on) {
  if (on) { dom.classList.add(cls); }
  else { dom.classList.remove(cls); }
}

var prefix$2 = "ProseMirror-menubar";

function isIOS() {
  if (typeof navigator == "undefined") { return false }
  var agent = navigator.userAgent;
  return !/Edge\/\d/.test(agent) && /AppleWebKit/.test(agent) && /Mobile\/\w+/.test(agent)
}

// :: (Object) → Plugin
// A plugin that will place a menu bar above the editor. Note that
// this involves wrapping the editor in an additional `<div>`.
//
//   options::-
//   Supports the following options:
//
//     content:: [[MenuElement]]
//     Provides the content of the menu, as a nested array to be
//     passed to `renderGrouped`.
//
//     floating:: ?bool
//     Determines whether the menu floats, i.e. whether it sticks to
//     the top of the viewport when the editor is partially scrolled
//     out of view.
function menuBar(options) {
  return new prosemirror_state__WEBPACK_IMPORTED_MODULE_3__[/* Plugin */ "d"]({
    view: function view(editorView) { return new MenuBarView(editorView, options) }
  })
}

var MenuBarView = function MenuBarView(editorView, options) {
  var this$1 = this;

  this.editorView = editorView;
  this.options = options;

  this.wrapper = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$2 + "-wrapper"});
  this.menu = this.wrapper.appendChild(Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$2}));
  this.menu.className = prefix$2;
  this.spacer = null;

  editorView.dom.parentNode.replaceChild(this.wrapper, editorView.dom);
  this.wrapper.appendChild(editorView.dom);

  this.maxHeight = 0;
  this.widthForMaxHeight = 0;
  this.floating = false;

  var ref = renderGrouped(this.editorView, this.options.content);
  var dom = ref.dom;
  var update = ref.update;
  this.contentUpdate = update;
  this.menu.appendChild(dom);
  this.update();

  if (options.floating && !isIOS()) {
    this.updateFloat();
    var potentialScrollers = getAllWrapping(this.wrapper);
    this.scrollFunc = function (e) {
      var root = this$1.editorView.root;
      if (!(root.body || root).contains(this$1.wrapper)) {
          potentialScrollers.forEach(function (el) { return el.removeEventListener("scroll", this$1.scrollFunc); });
      } else {
          this$1.updateFloat(e.target.getBoundingClientRect && e.target);
      }
    };
    potentialScrollers.forEach(function (el) { return el.addEventListener('scroll', this$1.scrollFunc); });
  }
};

MenuBarView.prototype.update = function update () {
  this.contentUpdate(this.editorView.state);

  if (this.floating) {
    this.updateScrollCursor();
  } else {
    if (this.menu.offsetWidth != this.widthForMaxHeight) {
      this.widthForMaxHeight = this.menu.offsetWidth;
      this.maxHeight = 0;
    }
    if (this.menu.offsetHeight > this.maxHeight) {
      this.maxHeight = this.menu.offsetHeight;
      this.menu.style.minHeight = this.maxHeight + "px";
    }
  }
};

MenuBarView.prototype.updateScrollCursor = function updateScrollCursor () {
  var selection = this.editorView.root.getSelection();
  if (!selection.focusNode) { return }
  var rects = selection.getRangeAt(0).getClientRects();
  var selRect = rects[selectionIsInverted(selection) ? 0 : rects.length - 1];
  if (!selRect) { return }
  var menuRect = this.menu.getBoundingClientRect();
  if (selRect.top < menuRect.bottom && selRect.bottom > menuRect.top) {
    var scrollable = findWrappingScrollable(this.wrapper);
    if (scrollable) { scrollable.scrollTop -= (menuRect.bottom - selRect.top); }
  }
};

MenuBarView.prototype.updateFloat = function updateFloat (scrollAncestor) {
  var parent = this.wrapper, editorRect = parent.getBoundingClientRect(),
      top = scrollAncestor ? Math.max(0, scrollAncestor.getBoundingClientRect().top) : 0;

  if (this.floating) {
    if (editorRect.top >= top || editorRect.bottom < this.menu.offsetHeight + 10) {
      this.floating = false;
      this.menu.style.position = this.menu.style.left = this.menu.style.top = this.menu.style.width = "";
      this.menu.style.display = "";
      this.spacer.parentNode.removeChild(this.spacer);
      this.spacer = null;
    } else {
      var border = (parent.offsetWidth - parent.clientWidth) / 2;
      this.menu.style.left = (editorRect.left + border) + "px";
      this.menu.style.display = (editorRect.top > window.innerHeight ? "none" : "");
      if (scrollAncestor) { this.menu.style.top = top + "px"; }
    }
  } else {
    if (editorRect.top < top && editorRect.bottom >= this.menu.offsetHeight + 10) {
      this.floating = true;
      var menuRect = this.menu.getBoundingClientRect();
      this.menu.style.left = menuRect.left + "px";
      this.menu.style.width = menuRect.width + "px";
      if (scrollAncestor) { this.menu.style.top = top + "px"; }
      this.menu.style.position = "fixed";
      this.spacer = Object(crelt__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])("div", {class: prefix$2 + "-spacer", style: ("height: " + (menuRect.height) + "px")});
      parent.insertBefore(this.spacer, this.menu);
    }
  }
};

MenuBarView.prototype.destroy = function destroy () {
  if (this.wrapper.parentNode)
    { this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper); }
};

// Not precise, but close enough
function selectionIsInverted(selection) {
  if (selection.anchorNode == selection.focusNode) { return selection.anchorOffset > selection.focusOffset }
  return selection.anchorNode.compareDocumentPosition(selection.focusNode) == Node.DOCUMENT_POSITION_FOLLOWING
}

function findWrappingScrollable(node) {
  for (var cur = node.parentNode; cur; cur = cur.parentNode)
    { if (cur.scrollHeight > cur.clientHeight) { return cur } }
}

function getAllWrapping(node) {
    var res = [window];
    for (var cur = node.parentNode; cur; cur = cur.parentNode)
        { res.push(cur); }
    return res
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-schema-list/dist/index.es.js":
/*!***************************************************************!*\
  !*** ./node_modules/prosemirror-schema-list/dist/index.es.js ***!
  \***************************************************************/
/*! exports provided: addListNodes, bulletList, liftListItem, listItem, orderedList, sinkListItem, splitListItem, wrapInList */
/*! exports used: liftListItem, sinkListItem, splitListItem, wrapInList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addListNodes */
/* unused harmony export bulletList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return liftListItem; });
/* unused harmony export listItem */
/* unused harmony export orderedList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sinkListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return splitListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return wrapInList; });
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");



var olDOM = ["ol", 0], ulDOM = ["ul", 0], liDOM = ["li", 0];

// :: NodeSpec
// An ordered list [node spec](#model.NodeSpec). Has a single
// attribute, `order`, which determines the number at which the list
// starts counting, and defaults to 1. Represented as an `<ol>`
// element.
var orderedList = {
  attrs: {order: {default: 1}},
  parseDOM: [{tag: "ol", getAttrs: function getAttrs(dom) {
    return {order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1}
  }}],
  toDOM: function toDOM(node) {
    return node.attrs.order == 1 ? olDOM : ["ol", {start: node.attrs.order}, 0]
  }
};

// :: NodeSpec
// A bullet list node spec, represented in the DOM as `<ul>`.
var bulletList = {
  parseDOM: [{tag: "ul"}],
  toDOM: function toDOM() { return ulDOM }
};

// :: NodeSpec
// A list item (`<li>`) spec.
var listItem = {
  parseDOM: [{tag: "li"}],
  toDOM: function toDOM() { return liDOM },
  defining: true
};

function add(obj, props) {
  var copy = {};
  for (var prop in obj) { copy[prop] = obj[prop]; }
  for (var prop$1 in props) { copy[prop$1] = props[prop$1]; }
  return copy
}

// :: (OrderedMap<NodeSpec>, string, ?string) → OrderedMap<NodeSpec>
// Convenience function for adding list-related node types to a map
// specifying the nodes for a schema. Adds
// [`orderedList`](#schema-list.orderedList) as `"ordered_list"`,
// [`bulletList`](#schema-list.bulletList) as `"bullet_list"`, and
// [`listItem`](#schema-list.listItem) as `"list_item"`.
//
// `itemContent` determines the content expression for the list items.
// If you want the commands defined in this module to apply to your
// list structure, it should have a shape like `"paragraph block*"` or
// `"paragraph (ordered_list | bullet_list)*"`. `listGroup` can be
// given to assign a group name to the list node types, for example
// `"block"`.
function addListNodes(nodes, itemContent, listGroup) {
  return nodes.append({
    ordered_list: add(orderedList, {content: "list_item+", group: listGroup}),
    bullet_list: add(bulletList, {content: "list_item+", group: listGroup}),
    list_item: add(listItem, {content: itemContent})
  })
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command function that wraps the selection in a list with
// the given type an attributes. If `dispatch` is null, only return a
// value to indicate whether this is possible, but don't actually
// perform the change.
function wrapInList(listType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to), doJoin = false, outerRange = range;
    if (!range) { return false }
    // This is at the top of an existing list item
    if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
      // Don't do anything if this is the top of the list
      if ($from.index(range.depth - 1) == 0) { return false }
      var $insert = state.doc.resolve(range.start - 2);
      outerRange = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* NodeRange */ "g"]($insert, $insert, range.depth);
      if (range.endIndex < range.parent.childCount)
        { range = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* NodeRange */ "g"]($from, state.doc.resolve($to.end(range.depth)), range.depth); }
      doJoin = true;
    }
    var wrap = Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* findWrapping */ "i"])(outerRange, listType, attrs, range);
    if (!wrap) { return false }
    if (dispatch) { dispatch(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView()); }
    return true
  }
}

function doWrapInList(tr, range, wrappers, joinBefore, listType) {
  var content = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty;
  for (var i = wrappers.length - 1; i >= 0; i--)
    { content = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(wrappers[i].type.create(wrappers[i].attrs, content)); }

  tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"](range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end,
                                new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](content, 0, 0), wrappers.length, true));

  var found = 0;
  for (var i$1 = 0; i$1 < wrappers.length; i$1++) { if (wrappers[i$1].type == listType) { found = i$1 + 1; } }
  var splitDepth = wrappers.length - found;

  var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
  for (var i$2 = range.startIndex, e = range.endIndex, first = true; i$2 < e; i$2++, first = false) {
    if (!first && Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
      splitPos += 2 * splitDepth;
    }
    splitPos += parent.child(i$2).nodeSize;
  }
  return tr
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Build a command that splits a non-empty textblock at the top level
// of a list item by also splitting that list item.
function splitListItem(itemType) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var node = ref.node;
    if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) { return false }
    var grandParent = $from.node(-1);
    if (grandParent.type != itemType) { return false }
    if ($from.parent.content.size == 0 && $from.node(-1).childCount == $from.indexAfter(-1)) {
      // In an empty block. If this is a nested list, the wrapping
      // list item should be split. Otherwise, bail out and let next
      // command handle lifting.
      if ($from.depth == 2 || $from.node(-3).type != itemType ||
          $from.index(-2) != $from.node(-2).childCount - 1) { return false }
      if (dispatch) {
        var wrap = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty, keepItem = $from.index(-1) > 0;
        // Build a fragment containing empty versions of the structure
        // from the outer list item to the parent node of the cursor
        for (var d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--)
          { wrap = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from($from.node(d).copy(wrap)); }
        // Add a second list item with an empty default start node
        wrap = wrap.append(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(itemType.createAndFill()));
        var tr$1 = state.tr.replace($from.before(keepItem ? null : -1), $from.after(-3), new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](wrap, keepItem ? 3 : 2, 2));
        tr$1.setSelection(state.selection.constructor.near(tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
        dispatch(tr$1.scrollIntoView());
      }
      return true
    }
    var nextType = $to.pos == $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
    var tr = state.tr.delete($from.pos, $to.pos);
    var types = nextType && [null, {type: nextType}];
    if (!Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* canSplit */ "g"])(tr.doc, $from.pos, 2, types)) { return false }
    if (dispatch) { dispatch(tr.split($from.pos, 2, types).scrollIntoView()); }
    return true
  }
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command to lift the list item around the selection up into
// a wrapping list.
function liftListItem(itemType) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type == itemType; });
    if (!range) { return false }
    if (!dispatch) { return true }
    if ($from.node(range.depth - 1).type == itemType) // Inside a parent list
      { return liftToOuterList(state, dispatch, itemType, range) }
    else // Outer list node
      { return liftOutOfList(state, dispatch, range) }
  }
}

function liftToOuterList(state, dispatch, itemType, range) {
  var tr = state.tr, end = range.end, endOfList = range.$to.end(range.depth);
  if (end < endOfList) {
    // There are siblings after the lifted items, which must become
    // children of the last item
    tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"](end - 1, endOfList, end, endOfList,
                                  new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
    range = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* NodeRange */ "g"](tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
  }
  dispatch(tr.lift(range, Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* liftTarget */ "k"])(range)).scrollIntoView());
  return true
}

function liftOutOfList(state, dispatch, range) {
  var tr = state.tr, list = range.parent;
  // Merge the list items into a single big item
  for (var pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
    pos -= list.child(i).nodeSize;
    tr.delete(pos - 1, pos + 1);
  }
  var $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
  var atStart = range.startIndex == 0, atEnd = range.endIndex == list.childCount;
  var parent = $start.node(-1), indexBefore = $start.index(-1);
  if (!parent.canReplace(indexBefore + (atStart ? 0 : 1), indexBefore + 1,
                         item.content.append(atEnd ? prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty : prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(list))))
    { return false }
  var start = $start.pos, end = start + item.nodeSize;
  // Strip off the surrounding list. At the sides where we're not at
  // the end of the list, the existing list is closed. At sides where
  // this is the end, it is overwritten to its end.
  tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"](start - (atStart ? 1 : 0), end + (atEnd ? 1 : 0), start + 1, end - 1,
                                new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"]((atStart ? prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty : prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(list.copy(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty)))
                                          .append(atEnd ? prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty : prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(list.copy(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty))),
                                          atStart ? 0 : 1, atEnd ? 0 : 1), atStart ? 0 : 1));
  dispatch(tr.scrollIntoView());
  return true
}

// :: (NodeType) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command to sink the list item around the selection down
// into an inner list.
function sinkListItem(itemType) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type == itemType; });
    if (!range) { return false }
    var startIndex = range.startIndex;
    if (startIndex == 0) { return false }
    var parent = range.parent, nodeBefore = parent.child(startIndex - 1);
    if (nodeBefore.type != itemType) { return false }

    if (dispatch) {
      var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
      var inner = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(nestedBefore ? itemType.create() : null);
      var slice = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(itemType.create(null, prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(parent.type.create(null, inner)))),
                            nestedBefore ? 3 : 1, 0);
      var before = range.start, after = range.end;
      dispatch(state.tr.step(new prosemirror_transform__WEBPACK_IMPORTED_MODULE_0__[/* ReplaceAroundStep */ "b"](before - (nestedBefore ? 3 : 1), after,
                                                   before, after, slice, 1, true))
               .scrollIntoView());
    }
    return true
  }
}


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/prosemirror-view/dist/index.es.js":
/*!********************************************************!*\
  !*** ./node_modules/prosemirror-view/dist/index.es.js ***!
  \********************************************************/
/*! exports provided: Decoration, DecorationSet, EditorView, __endComposition, __parseFromClipboard, __serializeForClipboard */
/*! exports used: Decoration, DecorationSet, EditorView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Decoration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DecorationSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EditorView; });
/* unused harmony export __endComposition */
/* unused harmony export __parseFromClipboard */
/* unused harmony export __serializeForClipboard */
/* harmony import */ var prosemirror_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prosemirror-state */ "./node_modules/prosemirror-state/dist/index.es.js");
/* harmony import */ var prosemirror_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prosemirror-model */ "./node_modules/prosemirror-model/dist/index.es.js");
/* harmony import */ var prosemirror_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");




var result = {};

if (typeof navigator != "undefined" && typeof document != "undefined") {
  var ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);

  result.mac = /Mac/.test(navigator.platform);
  var ie = result.ie = !!(ie_upto10 || ie_11up || ie_edge);
  result.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
  result.gecko = !ie && /gecko\/(\d+)/i.test(navigator.userAgent);
  result.gecko_version = result.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
  var chrome = !ie && /Chrome\/(\d+)/.exec(navigator.userAgent);
  result.chrome = !!chrome;
  result.chrome_version = chrome && +chrome[1];
  // Is true for both iOS and iPadOS for convenience
  result.safari = !ie && /Apple Computer/.test(navigator.vendor);
  result.ios = result.safari && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2);
  result.android = /Android \d/.test(navigator.userAgent);
  result.webkit = "webkitFontSmoothing" in document.documentElement.style;
  result.webkit_version = result.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
}

var domIndex = function(node) {
  for (var index = 0;; index++) {
    node = node.previousSibling;
    if (!node) { return index }
  }
};

var parentNode = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType == 11 ? parent.host : parent
};

var reusedRange = null;

// Note that this will always return the same range, because DOM range
// objects are every expensive, and keep slowing down subsequent DOM
// updates, for some reason.
var textRange = function(node, from, to) {
  var range = reusedRange || (reusedRange = document.createRange());
  range.setEnd(node, to == null ? node.nodeValue.length : to);
  range.setStart(node, from || 0);
  return range
};

// Scans forward and backward through DOM positions equivalent to the
// given one to see if the two are in the same place (i.e. after a
// text node vs at the end of that text node)
var isEquivalentPosition = function(node, off, targetNode, targetOff) {
  return targetNode && (scanFor(node, off, targetNode, targetOff, -1) ||
                        scanFor(node, off, targetNode, targetOff, 1))
};

var atomElements = /^(img|br|input|textarea|hr)$/i;

function scanFor(node, off, targetNode, targetOff, dir) {
  for (;;) {
    if (node == targetNode && off == targetOff) { return true }
    if (off == (dir < 0 ? 0 : nodeSize(node))) {
      var parent = node.parentNode;
      if (parent.nodeType != 1 || hasBlockDesc(node) || atomElements.test(node.nodeName) || node.contentEditable == "false")
        { return false }
      off = domIndex(node) + (dir < 0 ? 0 : 1);
      node = parent;
    } else if (node.nodeType == 1) {
      node = node.childNodes[off + (dir < 0 ? -1 : 0)];
      if (node.contentEditable == "false") { return false }
      off = dir < 0 ? nodeSize(node) : 0;
    } else {
      return false
    }
  }
}

function nodeSize(node) {
  return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
}

function isOnEdge(node, offset, parent) {
  for (var atStart = offset == 0, atEnd = offset == nodeSize(node); atStart || atEnd;) {
    if (node == parent) { return true }
    var index = domIndex(node);
    node = node.parentNode;
    if (!node) { return false }
    atStart = atStart && index == 0;
    atEnd = atEnd && index == nodeSize(node);
  }
}

function hasBlockDesc(dom) {
  var desc;
  for (var cur = dom; cur; cur = cur.parentNode) { if (desc = cur.pmViewDesc) { break } }
  return desc && desc.node && desc.node.isBlock && (desc.dom == dom || desc.contentDOM == dom)
}

// Work around Chrome issue https://bugs.chromium.org/p/chromium/issues/detail?id=447523
// (isCollapsed inappropriately returns true in shadow dom)
var selectionCollapsed = function(domSel) {
  var collapsed = domSel.isCollapsed;
  if (collapsed && result.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed)
    { collapsed = false; }
  return collapsed
};

function keyEvent(keyCode, key) {
  var event = document.createEvent("Event");
  event.initEvent("keydown", true, true);
  event.keyCode = keyCode;
  event.key = event.code = key;
  return event
}

function windowRect(doc) {
  return {left: 0, right: doc.documentElement.clientWidth,
          top: 0, bottom: doc.documentElement.clientHeight}
}

function getSide(value, side) {
  return typeof value == "number" ? value : value[side]
}

function clientRect(node) {
  var rect = node.getBoundingClientRect();
  // Adjust for elements with style "transform: scale()"
  var scaleX = (rect.width / node.offsetWidth) || 1;
  var scaleY = (rect.height / node.offsetHeight) || 1;
  // Make sure scrollbar width isn't included in the rectangle
  return {left: rect.left, right: rect.left + node.clientWidth * scaleX,
          top: rect.top, bottom: rect.top + node.clientHeight * scaleY}
}

function scrollRectIntoView(view, rect, startDOM) {
  var scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin") || 5;
  var doc = view.dom.ownerDocument;
  for (var parent = startDOM || view.dom;; parent = parentNode(parent)) {
    if (!parent) { break }
    if (parent.nodeType != 1) { continue }
    var atTop = parent == doc.body || parent.nodeType != 1;
    var bounding = atTop ? windowRect(doc) : clientRect(parent);
    var moveX = 0, moveY = 0;
    if (rect.top < bounding.top + getSide(scrollThreshold, "top"))
      { moveY = -(bounding.top - rect.top + getSide(scrollMargin, "top")); }
    else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, "bottom"))
      { moveY = rect.bottom - bounding.bottom + getSide(scrollMargin, "bottom"); }
    if (rect.left < bounding.left + getSide(scrollThreshold, "left"))
      { moveX = -(bounding.left - rect.left + getSide(scrollMargin, "left")); }
    else if (rect.right > bounding.right - getSide(scrollThreshold, "right"))
      { moveX = rect.right - bounding.right + getSide(scrollMargin, "right"); }
    if (moveX || moveY) {
      if (atTop) {
        doc.defaultView.scrollBy(moveX, moveY);
      } else {
        var startX = parent.scrollLeft, startY = parent.scrollTop;
        if (moveY) { parent.scrollTop += moveY; }
        if (moveX) { parent.scrollLeft += moveX; }
        var dX = parent.scrollLeft - startX, dY = parent.scrollTop - startY;
        rect = {left: rect.left - dX, top: rect.top - dY, right: rect.right - dX, bottom: rect.bottom - dY};
      }
    }
    if (atTop) { break }
  }
}

// Store the scroll position of the editor's parent nodes, along with
// the top position of an element near the top of the editor, which
// will be used to make sure the visible viewport remains stable even
// when the size of the content above changes.
function storeScrollPos(view) {
  var rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
  var refDOM, refTop;
  for (var x = (rect.left + rect.right) / 2, y = startY + 1;
       y < Math.min(innerHeight, rect.bottom); y += 5) {
    var dom = view.root.elementFromPoint(x, y);
    if (dom == view.dom || !view.dom.contains(dom)) { continue }
    var localRect = dom.getBoundingClientRect();
    if (localRect.top >= startY - 20) {
      refDOM = dom;
      refTop = localRect.top;
      break
    }
  }
  return {refDOM: refDOM, refTop: refTop, stack: scrollStack(view.dom)}
}

function scrollStack(dom) {
  var stack = [], doc = dom.ownerDocument;
  for (; dom; dom = parentNode(dom)) {
    stack.push({dom: dom, top: dom.scrollTop, left: dom.scrollLeft});
    if (dom == doc) { break }
  }
  return stack
}

// Reset the scroll position of the editor's parent nodes to that what
// it was before, when storeScrollPos was called.
function resetScrollPos(ref) {
  var refDOM = ref.refDOM;
  var refTop = ref.refTop;
  var stack = ref.stack;

  var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
  restoreScrollStack(stack, newRefTop == 0 ? 0 : newRefTop - refTop);
}

function restoreScrollStack(stack, dTop) {
  for (var i = 0; i < stack.length; i++) {
    var ref = stack[i];
    var dom = ref.dom;
    var top = ref.top;
    var left = ref.left;
    if (dom.scrollTop != top + dTop) { dom.scrollTop = top + dTop; }
    if (dom.scrollLeft != left) { dom.scrollLeft = left; }
  }
}

var preventScrollSupported = null;
// Feature-detects support for .focus({preventScroll: true}), and uses
// a fallback kludge when not supported.
function focusPreventScroll(dom) {
  if (dom.setActive) { return dom.setActive() } // in IE
  if (preventScrollSupported) { return dom.focus(preventScrollSupported) }

  var stored = scrollStack(dom);
  dom.focus(preventScrollSupported == null ? {
    get preventScroll() {
      preventScrollSupported = {preventScroll: true};
      return true
    }
  } : undefined);
  if (!preventScrollSupported) {
    preventScrollSupported = false;
    restoreScrollStack(stored, 0);
  }
}

function findOffsetInNode(node, coords) {
  var closest, dxClosest = 2e8, coordsClosest, offset = 0;
  var rowBot = coords.top, rowTop = coords.top;
  for (var child = node.firstChild, childIndex = 0; child; child = child.nextSibling, childIndex++) {
    var rects = (void 0);
    if (child.nodeType == 1) { rects = child.getClientRects(); }
    else if (child.nodeType == 3) { rects = textRange(child).getClientRects(); }
    else { continue }

    for (var i = 0; i < rects.length; i++) {
      var rect = rects[i];
      if (rect.top <= rowBot && rect.bottom >= rowTop) {
        rowBot = Math.max(rect.bottom, rowBot);
        rowTop = Math.min(rect.top, rowTop);
        var dx = rect.left > coords.left ? rect.left - coords.left
            : rect.right < coords.left ? coords.left - rect.right : 0;
        if (dx < dxClosest) {
          closest = child;
          dxClosest = dx;
          coordsClosest = dx && closest.nodeType == 3 ? {left: rect.right < coords.left ? rect.right : rect.left, top: coords.top} : coords;
          if (child.nodeType == 1 && dx)
            { offset = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0); }
          continue
        }
      }
      if (!closest && (coords.left >= rect.right && coords.top >= rect.top ||
                       coords.left >= rect.left && coords.top >= rect.bottom))
        { offset = childIndex + 1; }
    }
  }
  if (closest && closest.nodeType == 3) { return findOffsetInText(closest, coordsClosest) }
  if (!closest || (dxClosest && closest.nodeType == 1)) { return {node: node, offset: offset} }
  return findOffsetInNode(closest, coordsClosest)
}

function findOffsetInText(node, coords) {
  var len = node.nodeValue.length;
  var range = document.createRange();
  for (var i = 0; i < len; i++) {
    range.setEnd(node, i + 1);
    range.setStart(node, i);
    var rect = singleRect(range, 1);
    if (rect.top == rect.bottom) { continue }
    if (inRect(coords, rect))
      { return {node: node, offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0)} }
  }
  return {node: node, offset: 0}
}

function inRect(coords, rect) {
  return coords.left >= rect.left - 1 && coords.left <= rect.right + 1&&
    coords.top >= rect.top - 1 && coords.top <= rect.bottom + 1
}

function targetKludge(dom, coords) {
  var parent = dom.parentNode;
  if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left)
    { return parent }
  return dom
}

function posFromElement(view, elt, coords) {
  var ref = findOffsetInNode(elt, coords);
  var node = ref.node;
  var offset = ref.offset;
  var bias = -1;
  if (node.nodeType == 1 && !node.firstChild) {
    var rect = node.getBoundingClientRect();
    bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
  }
  return view.docView.posFromDOM(node, offset, bias)
}

function posFromCaret(view, node, offset, coords) {
  // Browser (in caretPosition/RangeFromPoint) will agressively
  // normalize towards nearby inline nodes. Since we are interested in
  // positions between block nodes too, we first walk up the hierarchy
  // of nodes to see if there are block nodes that the coordinates
  // fall outside of. If so, we take the position before/after that
  // block. If not, we call `posFromDOM` on the raw node/offset.
  var outside = -1;
  for (var cur = node;;) {
    if (cur == view.dom) { break }
    var desc = view.docView.nearestDesc(cur, true);
    if (!desc) { return null }
    if (desc.node.isBlock && desc.parent) {
      var rect = desc.dom.getBoundingClientRect();
      if (rect.left > coords.left || rect.top > coords.top) { outside = desc.posBefore; }
      else if (rect.right < coords.left || rect.bottom < coords.top) { outside = desc.posAfter; }
      else { break }
    }
    cur = desc.dom.parentNode;
  }
  return outside > -1 ? outside : view.docView.posFromDOM(node, offset)
}

function elementFromPoint(element, coords, box) {
  var len = element.childNodes.length;
  if (len && box.top < box.bottom) {
    for (var startI = Math.max(0, Math.min(len - 1, Math.floor(len * (coords.top - box.top) / (box.bottom - box.top)) - 2)), i = startI;;) {
      var child = element.childNodes[i];
      if (child.nodeType == 1) {
        var rects = child.getClientRects();
        for (var j = 0; j < rects.length; j++) {
          var rect = rects[j];
          if (inRect(coords, rect)) { return elementFromPoint(child, coords, rect) }
        }
      }
      if ((i = (i + 1) % len) == startI) { break }
    }
  }
  return element
}

// Given an x,y position on the editor, get the position in the document.
function posAtCoords(view, coords) {
  var assign, assign$1;

  var root = view.root, node, offset;
  if (root.caretPositionFromPoint) {
    try { // Firefox throws for this call in hard-to-predict circumstances (#994)
      var pos$1 = root.caretPositionFromPoint(coords.left, coords.top);
      if (pos$1) { ((assign = pos$1, node = assign.offsetNode, offset = assign.offset)); }
    } catch (_) {}
  }
  if (!node && root.caretRangeFromPoint) {
    var range = root.caretRangeFromPoint(coords.left, coords.top);
    if (range) { ((assign$1 = range, node = assign$1.startContainer, offset = assign$1.startOffset)); }
  }

  var elt = root.elementFromPoint(coords.left, coords.top + 1), pos;
  if (!elt || !view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) {
    var box = view.dom.getBoundingClientRect();
    if (!inRect(coords, box)) { return null }
    elt = elementFromPoint(view.dom, coords, box);
    if (!elt) { return null }
  }
  // Safari's caretRangeFromPoint returns nonsense when on a draggable element
  if (result.safari && elt.draggable) { node = offset = null; }
  elt = targetKludge(elt, coords);
  if (node) {
    if (result.gecko && node.nodeType == 1) {
      // Firefox will sometimes return offsets into <input> nodes, which
      // have no actual children, from caretPositionFromPoint (#953)
      offset = Math.min(offset, node.childNodes.length);
      // It'll also move the returned position before image nodes,
      // even if those are behind it.
      if (offset < node.childNodes.length) {
        var next = node.childNodes[offset], box$1;
        if (next.nodeName == "IMG" && (box$1 = next.getBoundingClientRect()).right <= coords.left &&
            box$1.bottom > coords.top)
          { offset++; }
      }
    }
    // Suspiciously specific kludge to work around caret*FromPoint
    // never returning a position at the end of the document
    if (node == view.dom && offset == node.childNodes.length - 1 && node.lastChild.nodeType == 1 &&
        coords.top > node.lastChild.getBoundingClientRect().bottom)
      { pos = view.state.doc.content.size; }
    // Ignore positions directly after a BR, since caret*FromPoint
    // 'round up' positions that would be more accurately placed
    // before the BR node.
    else if (offset == 0 || node.nodeType != 1 || node.childNodes[offset - 1].nodeName != "BR")
      { pos = posFromCaret(view, node, offset, coords); }
  }
  if (pos == null) { pos = posFromElement(view, elt, coords); }

  var desc = view.docView.nearestDesc(elt, true);
  return {pos: pos, inside: desc ? desc.posAtStart - desc.border : -1}
}

function singleRect(object, bias) {
  var rects = object.getClientRects();
  return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1]
}

var BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;

// : (EditorView, number, number) → {left: number, top: number, right: number, bottom: number}
// Given a position in the document model, get a bounding box of the
// character at that position, relative to the window.
function coordsAtPos(view, pos, side) {
  var ref = view.docView.domFromPos(pos, side < 0 ? -1 : 1);
  var node = ref.node;
  var offset = ref.offset;

  var supportEmptyRange = result.webkit || result.gecko;
  if (node.nodeType == 3) {
    // These browsers support querying empty text ranges. Prefer that in
    // bidi context or when at the end of a node.
    if (supportEmptyRange && (BIDI.test(node.nodeValue) || (side < 0 ? !offset : offset == node.nodeValue.length))) {
      var rect = singleRect(textRange(node, offset, offset), side);
      // Firefox returns bad results (the position before the space)
      // when querying a position directly after line-broken
      // whitespace. Detect this situation and and kludge around it
      if (result.gecko && offset && /\s/.test(node.nodeValue[offset - 1]) && offset < node.nodeValue.length) {
        var rectBefore = singleRect(textRange(node, offset - 1, offset - 1), -1);
        if (rectBefore.top == rect.top) {
          var rectAfter = singleRect(textRange(node, offset, offset + 1), -1);
          if (rectAfter.top != rect.top)
            { return flattenV(rectAfter, rectAfter.left < rectBefore.left) }
        }
      }
      return rect
    } else {
      var from = offset, to = offset, takeSide = side < 0 ? 1 : -1;
      if (side < 0 && !offset) { to++; takeSide = -1; }
      else if (side >= 0 && offset == node.nodeValue.length) { from--; takeSide = 1; }
      else if (side < 0) { from--; }
      else { to ++; }
      return flattenV(singleRect(textRange(node, from, to), takeSide), takeSide < 0)
    }
  }

  // Return a horizontal line in block context
  if (!view.state.doc.resolve(pos).parent.inlineContent) {
    if (offset && (side < 0 || offset == nodeSize(node))) {
      var before = node.childNodes[offset - 1];
      if (before.nodeType == 1) { return flattenH(before.getBoundingClientRect(), false) }
    }
    if (offset < nodeSize(node)) {
      var after = node.childNodes[offset];
      if (after.nodeType == 1) { return flattenH(after.getBoundingClientRect(), true) }
    }
    return flattenH(node.getBoundingClientRect(), side >= 0)
  }

  // Inline, not in text node (this is not Bidi-safe)
  if (offset && (side < 0 || offset == nodeSize(node))) {
    var before$1 = node.childNodes[offset - 1];
    var target = before$1.nodeType == 3 ? textRange(before$1, nodeSize(before$1) - (supportEmptyRange ? 0 : 1))
        // BR nodes tend to only return the rectangle before them.
        // Only use them if they are the last element in their parent
        : before$1.nodeType == 1 && (before$1.nodeName != "BR" || !before$1.nextSibling) ? before$1 : null;
    if (target) { return flattenV(singleRect(target, 1), false) }
  }
  if (offset < nodeSize(node)) {
    var after$1 = node.childNodes[offset];
    var target$1 = after$1.nodeType == 3 ? textRange(after$1, 0, (supportEmptyRange ? 0 : 1))
        : after$1.nodeType == 1 ? after$1 : null;
    if (target$1) { return flattenV(singleRect(target$1, -1), true) }
  }
  // All else failed, just try to get a rectangle for the target node
  return flattenV(singleRect(node.nodeType == 3 ? textRange(node) : node, -side), side >= 0)
}

function flattenV(rect, left) {
  if (rect.width == 0) { return rect }
  var x = left ? rect.left : rect.right;
  return {top: rect.top, bottom: rect.bottom, left: x, right: x}
}

function flattenH(rect, top) {
  if (rect.height == 0) { return rect }
  var y = top ? rect.top : rect.bottom;
  return {top: y, bottom: y, left: rect.left, right: rect.right}
}

function withFlushedState(view, state, f) {
  var viewState = view.state, active = view.root.activeElement;
  if (viewState != state) { view.updateState(state); }
  if (active != view.dom) { view.focus(); }
  try {
    return f()
  } finally {
    if (viewState != state) { view.updateState(viewState); }
    if (active != view.dom && active) { active.focus(); }
  }
}

// : (EditorView, number, number)
// Whether vertical position motion in a given direction
// from a position would leave a text block.
function endOfTextblockVertical(view, state, dir) {
  var sel = state.selection;
  var $pos = dir == "up" ? sel.$from : sel.$to;
  return withFlushedState(view, state, function () {
    var ref = view.docView.domFromPos($pos.pos, dir == "up" ? -1 : 1);
    var dom = ref.node;
    for (;;) {
      var nearest = view.docView.nearestDesc(dom, true);
      if (!nearest) { break }
      if (nearest.node.isBlock) { dom = nearest.dom; break }
      dom = nearest.dom.parentNode;
    }
    var coords = coordsAtPos(view, $pos.pos, 1);
    for (var child = dom.firstChild; child; child = child.nextSibling) {
      var boxes = (void 0);
      if (child.nodeType == 1) { boxes = child.getClientRects(); }
      else if (child.nodeType == 3) { boxes = textRange(child, 0, child.nodeValue.length).getClientRects(); }
      else { continue }
      for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.bottom > box.top && (dir == "up" ? box.bottom < coords.top + 1 : box.top > coords.bottom - 1))
          { return false }
      }
    }
    return true
  })
}

var maybeRTL = /[\u0590-\u08ac]/;

function endOfTextblockHorizontal(view, state, dir) {
  var ref = state.selection;
  var $head = ref.$head;
  if (!$head.parent.isTextblock) { return false }
  var offset = $head.parentOffset, atStart = !offset, atEnd = offset == $head.parent.content.size;
  var sel = getSelection();
  // If the textblock is all LTR, or the browser doesn't support
  // Selection.modify (Edge), fall back to a primitive approach
  if (!maybeRTL.test($head.parent.textContent) || !sel.modify)
    { return dir == "left" || dir == "backward" ? atStart : atEnd }

  return withFlushedState(view, state, function () {
    // This is a huge hack, but appears to be the best we can
    // currently do: use `Selection.modify` to move the selection by
    // one character, and see if that moves the cursor out of the
    // textblock (or doesn't move it at all, when at the start/end of
    // the document).
    var oldRange = sel.getRangeAt(0), oldNode = sel.focusNode, oldOff = sel.focusOffset;
    var oldBidiLevel = sel.caretBidiLevel; // Only for Firefox
    sel.modify("move", dir, "character");
    var parentDOM = $head.depth ? view.docView.domAfterPos($head.before()) : view.dom;
    var result = !parentDOM.contains(sel.focusNode.nodeType == 1 ? sel.focusNode : sel.focusNode.parentNode) ||
        (oldNode == sel.focusNode && oldOff == sel.focusOffset);
    // Restore the previous selection
    sel.removeAllRanges();
    sel.addRange(oldRange);
    if (oldBidiLevel != null) { sel.caretBidiLevel = oldBidiLevel; }
    return result
  })
}

var cachedState = null, cachedDir = null, cachedResult = false;
function endOfTextblock(view, state, dir) {
  if (cachedState == state && cachedDir == dir) { return cachedResult }
  cachedState = state; cachedDir = dir;
  return cachedResult = dir == "up" || dir == "down"
    ? endOfTextblockVertical(view, state, dir)
    : endOfTextblockHorizontal(view, state, dir)
}

// NodeView:: interface
//
// By default, document nodes are rendered using the result of the
// [`toDOM`](#model.NodeSpec.toDOM) method of their spec, and managed
// entirely by the editor. For some use cases, such as embedded
// node-specific editing interfaces, you want more control over
// the behavior of a node's in-editor representation, and need to
// [define](#view.EditorProps.nodeViews) a custom node view.
//
// Mark views only support `dom` and `contentDOM`, and don't support
// any of the node view methods.
//
// Objects returned as node views must conform to this interface.
//
//   dom:: ?dom.Node
//   The outer DOM node that represents the document node. When not
//   given, the default strategy is used to create a DOM node.
//
//   contentDOM:: ?dom.Node
//   The DOM node that should hold the node's content. Only meaningful
//   if the node view also defines a `dom` property and if its node
//   type is not a leaf node type. When this is present, ProseMirror
//   will take care of rendering the node's children into it. When it
//   is not present, the node view itself is responsible for rendering
//   (or deciding not to render) its child nodes.
//
//   update:: ?(node: Node, decorations: [Decoration], innerDecorations: DecorationSource) → bool
//   When given, this will be called when the view is updating itself.
//   It will be given a node (possibly of a different type), an array
//   of active decorations around the node (which are automatically
//   drawn, and the node view may ignore if it isn't interested in
//   them), and a [decoration source](#view.DecorationSource) that
//   represents any decorations that apply to the content of the node
//   (which again may be ignored). It should return true if it was
//   able to update to that node, and false otherwise. If the node
//   view has a `contentDOM` property (or no `dom` property), updating
//   its child nodes will be handled by ProseMirror.
//
//   selectNode:: ?()
//   Can be used to override the way the node's selected status (as a
//   node selection) is displayed.
//
//   deselectNode:: ?()
//   When defining a `selectNode` method, you should also provide a
//   `deselectNode` method to remove the effect again.
//
//   setSelection:: ?(anchor: number, head: number, root: dom.Document)
//   This will be called to handle setting the selection inside the
//   node. The `anchor` and `head` positions are relative to the start
//   of the node. By default, a DOM selection will be created between
//   the DOM positions corresponding to those positions, but if you
//   override it you can do something else.
//
//   stopEvent:: ?(event: dom.Event) → bool
//   Can be used to prevent the editor view from trying to handle some
//   or all DOM events that bubble up from the node view. Events for
//   which this returns true are not handled by the editor.
//
//   ignoreMutation:: ?(dom.MutationRecord) → bool
//   Called when a DOM
//   [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
//   or a selection change happens within the view. When the change is
//   a selection change, the record will have a `type` property of
//   `"selection"` (which doesn't occur for native mutation records).
//   Return false if the editor should re-read the selection or
//   re-parse the range around the mutation, true if it can safely be
//   ignored.
//
//   destroy:: ?()
//   Called when the node view is removed from the editor or the whole
//   editor is destroyed. (Not available for marks.)

// View descriptions are data structures that describe the DOM that is
// used to represent the editor's content. They are used for:
//
// - Incremental redrawing when the document changes
//
// - Figuring out what part of the document a given DOM position
//   corresponds to
//
// - Wiring in custom implementations of the editing interface for a
//   given node
//
// They form a doubly-linked mutable tree, starting at `view.docView`.

var NOT_DIRTY = 0, CHILD_DIRTY = 1, CONTENT_DIRTY = 2, NODE_DIRTY = 3;

// Superclass for the various kinds of descriptions. Defines their
// basic structure and shared methods.
var ViewDesc = function ViewDesc(parent, children, dom, contentDOM) {
  this.parent = parent;
  this.children = children;
  this.dom = dom;
  // An expando property on the DOM node provides a link back to its
  // description.
  dom.pmViewDesc = this;
  // This is the node that holds the child views. It may be null for
  // descs that don't have children.
  this.contentDOM = contentDOM;
  this.dirty = NOT_DIRTY;
};

var prototypeAccessors = { beforePosition: { configurable: true },size: { configurable: true },border: { configurable: true },posBefore: { configurable: true },posAtStart: { configurable: true },posAfter: { configurable: true },posAtEnd: { configurable: true },contentLost: { configurable: true },domAtom: { configurable: true } };

// Used to check whether a given description corresponds to a
// widget/mark/node.
ViewDesc.prototype.matchesWidget = function matchesWidget () { return false };
ViewDesc.prototype.matchesMark = function matchesMark () { return false };
ViewDesc.prototype.matchesNode = function matchesNode () { return false };
ViewDesc.prototype.matchesHack = function matchesHack () { return false };

prototypeAccessors.beforePosition.get = function () { return false };

// : () → ?ParseRule
// When parsing in-editor content (in domchange.js), we allow
// descriptions to determine the parse rules that should be used to
// parse them.
ViewDesc.prototype.parseRule = function parseRule () { return null };

// : (dom.Event) → bool
// Used by the editor's event handler to ignore events that come
// from certain descs.
ViewDesc.prototype.stopEvent = function stopEvent () { return false };

// The size of the content represented by this desc.
prototypeAccessors.size.get = function () {
  var size = 0;
  for (var i = 0; i < this.children.length; i++) { size += this.children[i].size; }
  return size
};

// For block nodes, this represents the space taken up by their
// start/end tokens.
prototypeAccessors.border.get = function () { return 0 };

ViewDesc.prototype.destroy = function destroy () {
  this.parent = null;
  if (this.dom.pmViewDesc == this) { this.dom.pmViewDesc = null; }
  for (var i = 0; i < this.children.length; i++)
    { this.children[i].destroy(); }
};

ViewDesc.prototype.posBeforeChild = function posBeforeChild (child) {
  for (var i = 0, pos = this.posAtStart; i < this.children.length; i++) {
    var cur = this.children[i];
    if (cur == child) { return pos }
    pos += cur.size;
  }
};

prototypeAccessors.posBefore.get = function () {
  return this.parent.posBeforeChild(this)
};

prototypeAccessors.posAtStart.get = function () {
  return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
};

prototypeAccessors.posAfter.get = function () {
  return this.posBefore + this.size
};

prototypeAccessors.posAtEnd.get = function () {
  return this.posAtStart + this.size - 2 * this.border
};

// : (dom.Node, number, ?number) → number
ViewDesc.prototype.localPosFromDOM = function localPosFromDOM (dom, offset, bias) {
  // If the DOM position is in the content, use the child desc after
  // it to figure out a position.
  if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
    if (bias < 0) {
      var domBefore, desc;
      if (dom == this.contentDOM) {
        domBefore = dom.childNodes[offset - 1];
      } else {
        while (dom.parentNode != this.contentDOM) { dom = dom.parentNode; }
        domBefore = dom.previousSibling;
      }
      while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this)) { domBefore = domBefore.previousSibling; }
      return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart
    } else {
      var domAfter, desc$1;
      if (dom == this.contentDOM) {
        domAfter = dom.childNodes[offset];
      } else {
        while (dom.parentNode != this.contentDOM) { dom = dom.parentNode; }
        domAfter = dom.nextSibling;
      }
      while (domAfter && !((desc$1 = domAfter.pmViewDesc) && desc$1.parent == this)) { domAfter = domAfter.nextSibling; }
      return domAfter ? this.posBeforeChild(desc$1) : this.posAtEnd
    }
  }
  // Otherwise, use various heuristics, falling back on the bias
  // parameter, to determine whether to return the position at the
  // start or at the end of this view desc.
  var atEnd;
  if (dom == this.dom && this.contentDOM) {
    atEnd = offset > domIndex(this.contentDOM);
  } else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
    atEnd = dom.compareDocumentPosition(this.contentDOM) & 2;
  } else if (this.dom.firstChild) {
    if (offset == 0) { for (var search = dom;; search = search.parentNode) {
      if (search == this.dom) { atEnd = false; break }
      if (search.parentNode.firstChild != search) { break }
    } }
    if (atEnd == null && offset == dom.childNodes.length) { for (var search$1 = dom;; search$1 = search$1.parentNode) {
      if (search$1 == this.dom) { atEnd = true; break }
      if (search$1.parentNode.lastChild != search$1) { break }
    } }
  }
  return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart
};

// Scan up the dom finding the first desc that is a descendant of
// this one.
ViewDesc.prototype.nearestDesc = function nearestDesc (dom, onlyNodes) {
  for (var first = true, cur = dom; cur; cur = cur.parentNode) {
    var desc = this.getDesc(cur);
    if (desc && (!onlyNodes || desc.node)) {
      // If dom is outside of this desc's nodeDOM, don't count it.
      if (first && desc.nodeDOM &&
          !(desc.nodeDOM.nodeType == 1 ? desc.nodeDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode) : desc.nodeDOM == dom))
        { first = false; }
      else
        { return desc }
    }
  }
};

ViewDesc.prototype.getDesc = function getDesc (dom) {
  var desc = dom.pmViewDesc;
  for (var cur = desc; cur; cur = cur.parent) { if (cur == this) { return desc } }
};

ViewDesc.prototype.posFromDOM = function posFromDOM (dom, offset, bias) {
  for (var scan = dom; scan; scan = scan.parentNode) {
    var desc = this.getDesc(scan);
    if (desc) { return desc.localPosFromDOM(dom, offset, bias) }
  }
  return -1
};

// : (number) → ?NodeViewDesc
// Find the desc for the node after the given pos, if any. (When a
// parent node overrode rendering, there might not be one.)
ViewDesc.prototype.descAt = function descAt (pos) {
  for (var i = 0, offset = 0; i < this.children.length; i++) {
    var child = this.children[i], end = offset + child.size;
    if (offset == pos && end != offset) {
      while (!child.border && child.children.length) { child = child.children[0]; }
      return child
    }
    if (pos < end) { return child.descAt(pos - offset - child.border) }
    offset = end;
  }
};

// : (number, number) → {node: dom.Node, offset: number}
ViewDesc.prototype.domFromPos = function domFromPos (pos, side) {
  if (!this.contentDOM) { return {node: this.dom, offset: 0} }
  for (var offset = 0, i = 0, first = true;; i++, first = false) {
    // Skip removed or always-before children
    while (i < this.children.length && (this.children[i].beforePosition ||
                                        this.children[i].dom.parentNode != this.contentDOM))
      { offset += this.children[i++].size; }
    var child = i == this.children.length ? null : this.children[i];
    if (offset == pos && (side == 0 || !child || !child.size || child.border || (side < 0 && first)) ||
        child && child.domAtom && pos < offset + child.size) { return {
      node: this.contentDOM,
      offset: child ? domIndex(child.dom) : this.contentDOM.childNodes.length
    } }
    if (!child) { throw new Error("Invalid position " + pos) }
    var end = offset + child.size;
    if (!child.domAtom && (side < 0 && !child.border ? end >= pos : end > pos) &&
        (end > pos || i + 1 >= this.children.length || !this.children[i + 1].beforePosition))
      { return child.domFromPos(pos - offset - child.border, side) }
    offset = end;
  }
};

// Used to find a DOM range in a single parent for a given changed
// range.
ViewDesc.prototype.parseRange = function parseRange (from, to, base) {
    if ( base === void 0 ) base = 0;

  if (this.children.length == 0)
    { return {node: this.contentDOM, from: from, to: to, fromOffset: 0, toOffset: this.contentDOM.childNodes.length} }

  var fromOffset = -1, toOffset = -1;
  for (var offset = base, i = 0;; i++) {
    var child = this.children[i], end = offset + child.size;
    if (fromOffset == -1 && from <= end) {
      var childBase = offset + child.border;
      // FIXME maybe descend mark views to parse a narrower range?
      if (from >= childBase && to <= end - child.border && child.node &&
          child.contentDOM && this.contentDOM.contains(child.contentDOM))
        { return child.parseRange(from, to, childBase) }

      from = offset;
      for (var j = i; j > 0; j--) {
        var prev = this.children[j - 1];
        if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
          fromOffset = domIndex(prev.dom) + 1;
          break
        }
        from -= prev.size;
      }
      if (fromOffset == -1) { fromOffset = 0; }
    }
    if (fromOffset > -1 && (end > to || i == this.children.length - 1)) {
      to = end;
      for (var j$1 = i + 1; j$1 < this.children.length; j$1++) {
        var next = this.children[j$1];
        if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
          toOffset = domIndex(next.dom);
          break
        }
        to += next.size;
      }
      if (toOffset == -1) { toOffset = this.contentDOM.childNodes.length; }
      break
    }
    offset = end;
  }
  return {node: this.contentDOM, from: from, to: to, fromOffset: fromOffset, toOffset: toOffset}
};

ViewDesc.prototype.emptyChildAt = function emptyChildAt (side) {
  if (this.border || !this.contentDOM || !this.children.length) { return false }
  var child = this.children[side < 0 ? 0 : this.children.length - 1];
  return child.size == 0 || child.emptyChildAt(side)
};

// : (number) → dom.Node
ViewDesc.prototype.domAfterPos = function domAfterPos (pos) {
  var ref = this.domFromPos(pos, 0);
    var node = ref.node;
    var offset = ref.offset;
  if (node.nodeType != 1 || offset == node.childNodes.length)
    { throw new RangeError("No node after pos " + pos) }
  return node.childNodes[offset]
};

// : (number, number, dom.Document)
// View descs are responsible for setting any selection that falls
// entirely inside of them, so that custom implementations can do
// custom things with the selection. Note that this falls apart when
// a selection starts in such a node and ends in another, in which
// case we just use whatever domFromPos produces as a best effort.
ViewDesc.prototype.setSelection = function setSelection (anchor, head, root, force) {
  // If the selection falls entirely in a child, give it to that child
  var from = Math.min(anchor, head), to = Math.max(anchor, head);
  for (var i = 0, offset = 0; i < this.children.length; i++) {
    var child = this.children[i], end = offset + child.size;
    if (from > offset && to < end)
      { return child.setSelection(anchor - offset - child.border, head - offset - child.border, root, force) }
    offset = end;
  }

  var anchorDOM = this.domFromPos(anchor, anchor ? -1 : 1);
  var headDOM = head == anchor ? anchorDOM : this.domFromPos(head, head ? -1 : 1);
  var domSel = root.getSelection();

  var brKludge = false;
  // On Firefox, using Selection.collapse to put the cursor after a
  // BR node for some reason doesn't always work (#1073). On Safari,
  // the cursor sometimes inexplicable visually lags behind its
  // reported position in such situations (#1092).
  if ((result.gecko || result.safari) && anchor == head) {
    var node = anchorDOM.node;
      var offset$1 = anchorDOM.offset;
    if (node.nodeType == 3) {
      brKludge = offset$1 && node.nodeValue[offset$1 - 1] == "\n";
      // Issue #1128
      if (brKludge && offset$1 == node.nodeValue.length &&
          node.nextSibling && node.nextSibling.nodeName == "BR")
        { anchorDOM = headDOM = {node: node.parentNode, offset: domIndex(node) + 1}; }
    } else {
      var prev = node.childNodes[offset$1 - 1];
      brKludge = prev && (prev.nodeName == "BR" || prev.contentEditable == "false");
    }
  }

  if (!(force || brKludge && result.safari) &&
      isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) &&
      isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset))
    { return }

  // Selection.extend can be used to create an 'inverted' selection
  // (one where the focus is before the anchor), but not all
  // browsers support it yet.
  var domSelExtended = false;
  if ((domSel.extend || anchor == head) && !brKludge) {
    domSel.collapse(anchorDOM.node, anchorDOM.offset);
    try {
      if (anchor != head) { domSel.extend(headDOM.node, headDOM.offset); }
      domSelExtended = true;
    } catch (err) {
      // In some cases with Chrome the selection is empty after calling
      // collapse, even when it should be valid. This appears to be a bug, but
      // it is difficult to isolate. If this happens fallback to the old path
      // without using extend.
      if (!(err instanceof DOMException)) { throw err }
      // declare global: DOMException
    }
  }
  if (!domSelExtended) {
    if (anchor > head) { var tmp = anchorDOM; anchorDOM = headDOM; headDOM = tmp; }
    var range = document.createRange();
    range.setEnd(headDOM.node, headDOM.offset);
    range.setStart(anchorDOM.node, anchorDOM.offset);
    domSel.removeAllRanges();
    domSel.addRange(range);
  }
};

// : (dom.MutationRecord) → bool
ViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
  return !this.contentDOM && mutation.type != "selection"
};

prototypeAccessors.contentLost.get = function () {
  return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
};

// Remove a subtree of the element tree that has been touched
// by a DOM change, so that the next update will redraw it.
ViewDesc.prototype.markDirty = function markDirty (from, to) {
  for (var offset = 0, i = 0; i < this.children.length; i++) {
    var child = this.children[i], end = offset + child.size;
    if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
      var startInside = offset + child.border, endInside = end - child.border;
      if (from >= startInside && to <= endInside) {
        this.dirty = from == offset || to == end ? CONTENT_DIRTY : CHILD_DIRTY;
        if (from == startInside && to == endInside &&
            (child.contentLost || child.dom.parentNode != this.contentDOM)) { child.dirty = NODE_DIRTY; }
        else { child.markDirty(from - startInside, to - startInside); }
        return
      } else {
        child.dirty = NODE_DIRTY;
      }
    }
    offset = end;
  }
  this.dirty = CONTENT_DIRTY;
};

ViewDesc.prototype.markParentsDirty = function markParentsDirty () {
  var level = 1;
  for (var node = this.parent; node; node = node.parent, level++) {
    var dirty = level == 1 ? CONTENT_DIRTY : CHILD_DIRTY;
    if (node.dirty < dirty) { node.dirty = dirty; }
  }
};

prototypeAccessors.domAtom.get = function () { return false };

Object.defineProperties( ViewDesc.prototype, prototypeAccessors );

// Reused array to avoid allocating fresh arrays for things that will
// stay empty anyway.
var nothing = [];

// A widget desc represents a widget decoration, which is a DOM node
// drawn between the document nodes.
var WidgetViewDesc = /*@__PURE__*/(function (ViewDesc) {
  function WidgetViewDesc(parent, widget, view, pos) {
    var self, dom = widget.type.toDOM;
    if (typeof dom == "function") { dom = dom(view, function () {
      if (!self) { return pos }
      if (self.parent) { return self.parent.posBeforeChild(self) }
    }); }
    if (!widget.type.spec.raw) {
      if (dom.nodeType != 1) {
        var wrap = document.createElement("span");
        wrap.appendChild(dom);
        dom = wrap;
      }
      dom.contentEditable = false;
      dom.classList.add("ProseMirror-widget");
    }
    ViewDesc.call(this, parent, nothing, dom, null);
    this.widget = widget;
    self = this;
  }

  if ( ViewDesc ) WidgetViewDesc.__proto__ = ViewDesc;
  WidgetViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  WidgetViewDesc.prototype.constructor = WidgetViewDesc;

  var prototypeAccessors$1 = { beforePosition: { configurable: true },domAtom: { configurable: true } };

  prototypeAccessors$1.beforePosition.get = function () {
    return this.widget.type.side < 0
  };

  WidgetViewDesc.prototype.matchesWidget = function matchesWidget (widget) {
    return this.dirty == NOT_DIRTY && widget.type.eq(this.widget.type)
  };

  WidgetViewDesc.prototype.parseRule = function parseRule () { return {ignore: true} };

  WidgetViewDesc.prototype.stopEvent = function stopEvent (event) {
    var stop = this.widget.spec.stopEvent;
    return stop ? stop(event) : false
  };

  WidgetViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
    return mutation.type != "selection" || this.widget.spec.ignoreSelection
  };

  prototypeAccessors$1.domAtom.get = function () { return true };

  Object.defineProperties( WidgetViewDesc.prototype, prototypeAccessors$1 );

  return WidgetViewDesc;
}(ViewDesc));

var CompositionViewDesc = /*@__PURE__*/(function (ViewDesc) {
  function CompositionViewDesc(parent, dom, textDOM, text) {
    ViewDesc.call(this, parent, nothing, dom, null);
    this.textDOM = textDOM;
    this.text = text;
  }

  if ( ViewDesc ) CompositionViewDesc.__proto__ = ViewDesc;
  CompositionViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  CompositionViewDesc.prototype.constructor = CompositionViewDesc;

  var prototypeAccessors$2 = { size: { configurable: true } };

  prototypeAccessors$2.size.get = function () { return this.text.length };

  CompositionViewDesc.prototype.localPosFromDOM = function localPosFromDOM (dom, offset) {
    if (dom != this.textDOM) { return this.posAtStart + (offset ? this.size : 0) }
    return this.posAtStart + offset
  };

  CompositionViewDesc.prototype.domFromPos = function domFromPos (pos) {
    return {node: this.textDOM, offset: pos}
  };

  CompositionViewDesc.prototype.ignoreMutation = function ignoreMutation (mut) {
    return mut.type === 'characterData' && mut.target.nodeValue == mut.oldValue
   };

  Object.defineProperties( CompositionViewDesc.prototype, prototypeAccessors$2 );

  return CompositionViewDesc;
}(ViewDesc));

// A mark desc represents a mark. May have multiple children,
// depending on how the mark is split. Note that marks are drawn using
// a fixed nesting order, for simplicity and predictability, so in
// some cases they will be split more often than would appear
// necessary.
var MarkViewDesc = /*@__PURE__*/(function (ViewDesc) {
  function MarkViewDesc(parent, mark, dom, contentDOM) {
    ViewDesc.call(this, parent, [], dom, contentDOM);
    this.mark = mark;
  }

  if ( ViewDesc ) MarkViewDesc.__proto__ = ViewDesc;
  MarkViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  MarkViewDesc.prototype.constructor = MarkViewDesc;

  MarkViewDesc.create = function create (parent, mark, inline, view) {
    var custom = view.nodeViews[mark.type.name];
    var spec = custom && custom(mark, view, inline);
    if (!spec || !spec.dom)
      { spec = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* DOMSerializer */ "b"].renderSpec(document, mark.type.spec.toDOM(mark, inline)); }
    return new MarkViewDesc(parent, mark, spec.dom, spec.contentDOM || spec.dom)
  };

  MarkViewDesc.prototype.parseRule = function parseRule () { return {mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM} };

  MarkViewDesc.prototype.matchesMark = function matchesMark (mark) { return this.dirty != NODE_DIRTY && this.mark.eq(mark) };

  MarkViewDesc.prototype.markDirty = function markDirty (from, to) {
    ViewDesc.prototype.markDirty.call(this, from, to);
    // Move dirty info to nearest node view
    if (this.dirty != NOT_DIRTY) {
      var parent = this.parent;
      while (!parent.node) { parent = parent.parent; }
      if (parent.dirty < this.dirty) { parent.dirty = this.dirty; }
      this.dirty = NOT_DIRTY;
    }
  };

  MarkViewDesc.prototype.slice = function slice (from, to, view) {
    var copy = MarkViewDesc.create(this.parent, this.mark, true, view);
    var nodes = this.children, size = this.size;
    if (to < size) { nodes = replaceNodes(nodes, to, size, view); }
    if (from > 0) { nodes = replaceNodes(nodes, 0, from, view); }
    for (var i = 0; i < nodes.length; i++) { nodes[i].parent = copy; }
    copy.children = nodes;
    return copy
  };

  return MarkViewDesc;
}(ViewDesc));

// Node view descs are the main, most common type of view desc, and
// correspond to an actual node in the document. Unlike mark descs,
// they populate their child array themselves.
var NodeViewDesc = /*@__PURE__*/(function (ViewDesc) {
  function NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos) {
    ViewDesc.call(this, parent, node.isLeaf ? nothing : [], dom, contentDOM);
    this.nodeDOM = nodeDOM;
    this.node = node;
    this.outerDeco = outerDeco;
    this.innerDeco = innerDeco;
    if (contentDOM) { this.updateChildren(view, pos); }
  }

  if ( ViewDesc ) NodeViewDesc.__proto__ = ViewDesc;
  NodeViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  NodeViewDesc.prototype.constructor = NodeViewDesc;

  var prototypeAccessors$3 = { size: { configurable: true },border: { configurable: true },domAtom: { configurable: true } };

  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finnicky
  // implementation details to the user code that they probably will
  // never need.)
  NodeViewDesc.create = function create (parent, node, outerDeco, innerDeco, view, pos) {
    var assign;

    var custom = view.nodeViews[node.type.name], descObj;
    var spec = custom && custom(node, view, function () {
      // (This is a function that allows the custom view to find its
      // own position)
      if (!descObj) { return pos }
      if (descObj.parent) { return descObj.parent.posBeforeChild(descObj) }
    }, outerDeco, innerDeco);

    var dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
    if (node.isText) {
      if (!dom) { dom = document.createTextNode(node.text); }
      else if (dom.nodeType != 3) { throw new RangeError("Text must be rendered as a DOM text node") }
    } else if (!dom) {
((assign = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* DOMSerializer */ "b"].renderSpec(document, node.type.spec.toDOM(node)), dom = assign.dom, contentDOM = assign.contentDOM));
    }
    if (!contentDOM && !node.isText && dom.nodeName != "BR") { // Chrome gets confused by <br contenteditable=false>
      if (!dom.hasAttribute("contenteditable")) { dom.contentEditable = false; }
      if (node.type.spec.draggable) { dom.draggable = true; }
    }

    var nodeDOM = dom;
    dom = applyOuterDeco(dom, outerDeco, node);

    if (spec)
      { return descObj = new CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM,
                                              spec, view, pos + 1) }
    else if (node.isText)
      { return new TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) }
    else
      { return new NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos + 1) }
  };

  NodeViewDesc.prototype.parseRule = function parseRule () {
    var this$1 = this;

    // Experimental kludge to allow opt-in re-parsing of nodes
    if (this.node.type.spec.reparseInView) { return null }
    // FIXME the assumption that this can always return the current
    // attrs means that if the user somehow manages to change the
    // attrs in the dom, that won't be picked up. Not entirely sure
    // whether this is a problem
    var rule = {node: this.node.type.name, attrs: this.node.attrs};
    if (this.node.type.spec.code) { rule.preserveWhitespace = "full"; }
    if (this.contentDOM && !this.contentLost) { rule.contentElement = this.contentDOM; }
    else { rule.getContent = function () { return this$1.contentDOM ? prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty : this$1.node.content; }; }
    return rule
  };

  NodeViewDesc.prototype.matchesNode = function matchesNode (node, outerDeco, innerDeco) {
    return this.dirty == NOT_DIRTY && node.eq(this.node) &&
      sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco)
  };

  prototypeAccessors$3.size.get = function () { return this.node.nodeSize };

  prototypeAccessors$3.border.get = function () { return this.node.isLeaf ? 0 : 1 };

  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  NodeViewDesc.prototype.updateChildren = function updateChildren (view, pos) {
    var this$1 = this;

    var inline = this.node.inlineContent, off = pos;
    var composition = inline && view.composing && this.localCompositionNode(view, pos);
    var updater = new ViewTreeUpdater(this, composition && composition.node);
    iterDeco(this.node, this.innerDeco, function (widget, i, insideNode) {
      if (widget.spec.marks)
        { updater.syncToMarks(widget.spec.marks, inline, view); }
      else if (widget.type.side >= 0 && !insideNode)
        { updater.syncToMarks(i == this$1.node.childCount ? prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Mark */ "d"].none : this$1.node.child(i).marks, inline, view); }
      // If the next node is a desc matching this widget, reuse it,
      // otherwise insert the widget as a new view desc.
      updater.placeWidget(widget, view, off);
    }, function (child, outerDeco, innerDeco, i) {
      // Make sure the wrapping mark descs match the node's marks.
      updater.syncToMarks(child.marks, inline, view);
      // Either find an existing desc that exactly matches this node,
      // and drop the descs before it.
      updater.findNodeMatch(child, outerDeco, innerDeco, i) ||
        // Or try updating the next desc to reflect this node.
        updater.updateNextNode(child, outerDeco, innerDeco, view, i) ||
        // Or just add it as a new desc.
        updater.addNode(child, outerDeco, innerDeco, view, off);
      off += child.nodeSize;
    });
    // Drop all remaining descs after the current position.
    updater.syncToMarks(nothing, inline, view);
    if (this.node.isTextblock) { updater.addTextblockHacks(); }
    updater.destroyRest();

    // Sync the DOM if anything changed
    if (updater.changed || this.dirty == CONTENT_DIRTY) {
      // May have to protect focused DOM from being changed if a composition is active
      if (composition) { this.protectLocalComposition(view, composition); }
      renderDescs(this.contentDOM, this.children, view);
      if (result.ios) { iosHacks(this.dom); }
    }
  };

  NodeViewDesc.prototype.localCompositionNode = function localCompositionNode (view, pos) {
    // Only do something if both the selection and a focused text node
    // are inside of this node, and the node isn't already part of a
    // view that's a child of this view
    var ref = view.state.selection;
    var from = ref.from;
    var to = ref.to;
    if (!(view.state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"]) || from < pos || to > pos + this.node.content.size) { return }
    var sel = view.root.getSelection();
    var textNode = nearbyTextNode(sel.focusNode, sel.focusOffset);
    if (!textNode || !this.dom.contains(textNode.parentNode)) { return }

    // Find the text in the focused node in the node, stop if it's not
    // there (may have been modified through other means, in which
    // case it should overwritten)
    var text = textNode.nodeValue;
    var textPos = findTextInFragment(this.node.content, text, from - pos, to - pos);

    return textPos < 0 ? null : {node: textNode, pos: textPos, text: text}
  };

  NodeViewDesc.prototype.protectLocalComposition = function protectLocalComposition (view, ref) {
    var node = ref.node;
    var pos = ref.pos;
    var text = ref.text;

    // The node is already part of a local view desc, leave it there
    if (this.getDesc(node)) { return }

    // Create a composition view for the orphaned nodes
    var topNode = node;
    for (;; topNode = topNode.parentNode) {
      if (topNode.parentNode == this.contentDOM) { break }
      while (topNode.previousSibling) { topNode.parentNode.removeChild(topNode.previousSibling); }
      while (topNode.nextSibling) { topNode.parentNode.removeChild(topNode.nextSibling); }
      if (topNode.pmViewDesc) { topNode.pmViewDesc = null; }
    }
    var desc = new CompositionViewDesc(this, topNode, node, text);
    view.compositionNodes.push(desc);

    // Patch up this.children to contain the composition view
    this.children = replaceNodes(this.children, pos, pos + text.length, view, desc);
  };

  // : (Node, [Decoration], DecorationSource, EditorView) → bool
  // If this desc be updated to match the given node decoration,
  // do so and return true.
  NodeViewDesc.prototype.update = function update (node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY ||
        !node.sameMarkup(this.node)) { return false }
    this.updateInner(node, outerDeco, innerDeco, view);
    return true
  };

  NodeViewDesc.prototype.updateInner = function updateInner (node, outerDeco, innerDeco, view) {
    this.updateOuterDeco(outerDeco);
    this.node = node;
    this.innerDeco = innerDeco;
    if (this.contentDOM) { this.updateChildren(view, this.posAtStart); }
    this.dirty = NOT_DIRTY;
  };

  NodeViewDesc.prototype.updateOuterDeco = function updateOuterDeco (outerDeco) {
    if (sameOuterDeco(outerDeco, this.outerDeco)) { return }
    var needsWrap = this.nodeDOM.nodeType != 1;
    var oldDOM = this.dom;
    this.dom = patchOuterDeco(this.dom, this.nodeDOM,
                              computeOuterDeco(this.outerDeco, this.node, needsWrap),
                              computeOuterDeco(outerDeco, this.node, needsWrap));
    if (this.dom != oldDOM) {
      oldDOM.pmViewDesc = null;
      this.dom.pmViewDesc = this;
    }
    this.outerDeco = outerDeco;
  };

  // Mark this node as being the selected node.
  NodeViewDesc.prototype.selectNode = function selectNode () {
    this.nodeDOM.classList.add("ProseMirror-selectednode");
    if (this.contentDOM || !this.node.type.spec.draggable) { this.dom.draggable = true; }
  };

  // Remove selected node marking from this node.
  NodeViewDesc.prototype.deselectNode = function deselectNode () {
    this.nodeDOM.classList.remove("ProseMirror-selectednode");
    if (this.contentDOM || !this.node.type.spec.draggable) { this.dom.removeAttribute("draggable"); }
  };

  prototypeAccessors$3.domAtom.get = function () { return this.node.isAtom };

  Object.defineProperties( NodeViewDesc.prototype, prototypeAccessors$3 );

  return NodeViewDesc;
}(ViewDesc));

// Create a view desc for the top-level document node, to be exported
// and used by the view class.
function docViewDesc(doc, outerDeco, innerDeco, dom, view) {
  applyOuterDeco(dom, outerDeco, doc);
  return new NodeViewDesc(null, doc, outerDeco, innerDeco, dom, dom, dom, view, 0)
}

var TextViewDesc = /*@__PURE__*/(function (NodeViewDesc) {
  function TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) {
    NodeViewDesc.call(this, parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view);
  }

  if ( NodeViewDesc ) TextViewDesc.__proto__ = NodeViewDesc;
  TextViewDesc.prototype = Object.create( NodeViewDesc && NodeViewDesc.prototype );
  TextViewDesc.prototype.constructor = TextViewDesc;

  var prototypeAccessors$4 = { domAtom: { configurable: true } };

  TextViewDesc.prototype.parseRule = function parseRule () {
    var skip = this.nodeDOM.parentNode;
    while (skip && skip != this.dom && !skip.pmIsDeco) { skip = skip.parentNode; }
    return {skip: skip || true}
  };

  TextViewDesc.prototype.update = function update (node, outerDeco, _, view) {
    if (this.dirty == NODE_DIRTY || (this.dirty != NOT_DIRTY && !this.inParent()) ||
        !node.sameMarkup(this.node)) { return false }
    this.updateOuterDeco(outerDeco);
    if ((this.dirty != NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue) {
      this.nodeDOM.nodeValue = node.text;
      if (view.trackWrites == this.nodeDOM) { view.trackWrites = null; }
    }
    this.node = node;
    this.dirty = NOT_DIRTY;
    return true
  };

  TextViewDesc.prototype.inParent = function inParent () {
    var parentDOM = this.parent.contentDOM;
    for (var n = this.nodeDOM; n; n = n.parentNode) { if (n == parentDOM) { return true } }
    return false
  };

  TextViewDesc.prototype.domFromPos = function domFromPos (pos) {
    return {node: this.nodeDOM, offset: pos}
  };

  TextViewDesc.prototype.localPosFromDOM = function localPosFromDOM (dom, offset, bias) {
    if (dom == this.nodeDOM) { return this.posAtStart + Math.min(offset, this.node.text.length) }
    return NodeViewDesc.prototype.localPosFromDOM.call(this, dom, offset, bias)
  };

  TextViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
    return mutation.type != "characterData" && mutation.type != "selection"
  };

  TextViewDesc.prototype.slice = function slice (from, to, view) {
    var node = this.node.cut(from, to), dom = document.createTextNode(node.text);
    return new TextViewDesc(this.parent, node, this.outerDeco, this.innerDeco, dom, dom, view)
  };

  prototypeAccessors$4.domAtom.get = function () { return false };

  Object.defineProperties( TextViewDesc.prototype, prototypeAccessors$4 );

  return TextViewDesc;
}(NodeViewDesc));

// A dummy desc used to tag trailing BR or span nodes created to work
// around contentEditable terribleness.
var BRHackViewDesc = /*@__PURE__*/(function (ViewDesc) {
  function BRHackViewDesc () {
    ViewDesc.apply(this, arguments);
  }

  if ( ViewDesc ) BRHackViewDesc.__proto__ = ViewDesc;
  BRHackViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  BRHackViewDesc.prototype.constructor = BRHackViewDesc;

  var prototypeAccessors$5 = { domAtom: { configurable: true } };

  BRHackViewDesc.prototype.parseRule = function parseRule () { return {ignore: true} };
  BRHackViewDesc.prototype.matchesHack = function matchesHack () { return this.dirty == NOT_DIRTY };
  prototypeAccessors$5.domAtom.get = function () { return true };

  Object.defineProperties( BRHackViewDesc.prototype, prototypeAccessors$5 );

  return BRHackViewDesc;
}(ViewDesc));

// A separate subclass is used for customized node views, so that the
// extra checks only have to be made for nodes that are actually
// customized.
var CustomNodeViewDesc = /*@__PURE__*/(function (NodeViewDesc) {
  function CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view, pos) {
    NodeViewDesc.call(this, parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view, pos);
    this.spec = spec;
  }

  if ( NodeViewDesc ) CustomNodeViewDesc.__proto__ = NodeViewDesc;
  CustomNodeViewDesc.prototype = Object.create( NodeViewDesc && NodeViewDesc.prototype );
  CustomNodeViewDesc.prototype.constructor = CustomNodeViewDesc;

  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  CustomNodeViewDesc.prototype.update = function update (node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY) { return false }
    if (this.spec.update) {
      var result = this.spec.update(node, outerDeco, innerDeco);
      if (result) { this.updateInner(node, outerDeco, innerDeco, view); }
      return result
    } else if (!this.contentDOM && !node.isLeaf) {
      return false
    } else {
      return NodeViewDesc.prototype.update.call(this, node, outerDeco, innerDeco, view)
    }
  };

  CustomNodeViewDesc.prototype.selectNode = function selectNode () {
    this.spec.selectNode ? this.spec.selectNode() : NodeViewDesc.prototype.selectNode.call(this);
  };

  CustomNodeViewDesc.prototype.deselectNode = function deselectNode () {
    this.spec.deselectNode ? this.spec.deselectNode() : NodeViewDesc.prototype.deselectNode.call(this);
  };

  CustomNodeViewDesc.prototype.setSelection = function setSelection (anchor, head, root, force) {
    this.spec.setSelection ? this.spec.setSelection(anchor, head, root)
      : NodeViewDesc.prototype.setSelection.call(this, anchor, head, root, force);
  };

  CustomNodeViewDesc.prototype.destroy = function destroy () {
    if (this.spec.destroy) { this.spec.destroy(); }
    NodeViewDesc.prototype.destroy.call(this);
  };

  CustomNodeViewDesc.prototype.stopEvent = function stopEvent (event) {
    return this.spec.stopEvent ? this.spec.stopEvent(event) : false
  };

  CustomNodeViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : NodeViewDesc.prototype.ignoreMutation.call(this, mutation)
  };

  return CustomNodeViewDesc;
}(NodeViewDesc));

// : (dom.Node, [ViewDesc])
// Sync the content of the given DOM node with the nodes associated
// with the given array of view descs, recursing into mark descs
// because this should sync the subtree for a whole node at a time.
function renderDescs(parentDOM, descs, view) {
  var dom = parentDOM.firstChild, written = false;
  for (var i = 0; i < descs.length; i++) {
    var desc = descs[i], childDOM = desc.dom;
    if (childDOM.parentNode == parentDOM) {
      while (childDOM != dom) { dom = rm(dom); written = true; }
      dom = dom.nextSibling;
    } else {
      written = true;
      parentDOM.insertBefore(childDOM, dom);
    }
    if (desc instanceof MarkViewDesc) {
      var pos = dom ? dom.previousSibling : parentDOM.lastChild;
      renderDescs(desc.contentDOM, desc.children, view);
      dom = pos ? pos.nextSibling : parentDOM.firstChild;
    }
  }
  while (dom) { dom = rm(dom); written = true; }
  if (written && view.trackWrites == parentDOM) { view.trackWrites = null; }
}

function OuterDecoLevel(nodeName) {
  if (nodeName) { this.nodeName = nodeName; }
}
OuterDecoLevel.prototype = Object.create(null);

var noDeco = [new OuterDecoLevel];

function computeOuterDeco(outerDeco, node, needsWrap) {
  if (outerDeco.length == 0) { return noDeco }

  var top = needsWrap ? noDeco[0] : new OuterDecoLevel, result = [top];

  for (var i = 0; i < outerDeco.length; i++) {
    var attrs = outerDeco[i].type.attrs;
    if (!attrs) { continue }
    if (attrs.nodeName)
      { result.push(top = new OuterDecoLevel(attrs.nodeName)); }

    for (var name in attrs) {
      var val = attrs[name];
      if (val == null) { continue }
      if (needsWrap && result.length == 1)
        { result.push(top = new OuterDecoLevel(node.isInline ? "span" : "div")); }
      if (name == "class") { top.class = (top.class ? top.class + " " : "") + val; }
      else if (name == "style") { top.style = (top.style ? top.style + ";" : "") + val; }
      else if (name != "nodeName") { top[name] = val; }
    }
  }

  return result
}

function patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
  // Shortcut for trivial case
  if (prevComputed == noDeco && curComputed == noDeco) { return nodeDOM }

  var curDOM = nodeDOM;
  for (var i = 0; i < curComputed.length; i++) {
    var deco = curComputed[i], prev = prevComputed[i];
    if (i) {
      var parent = (void 0);
      if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM &&
          (parent = curDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
        curDOM = parent;
      } else {
        parent = document.createElement(deco.nodeName);
        parent.pmIsDeco = true;
        parent.appendChild(curDOM);
        prev = noDeco[0];
        curDOM = parent;
      }
    }
    patchAttributes(curDOM, prev || noDeco[0], deco);
  }
  return curDOM
}

function patchAttributes(dom, prev, cur) {
  for (var name in prev)
    { if (name != "class" && name != "style" && name != "nodeName" && !(name in cur))
      { dom.removeAttribute(name); } }
  for (var name$1 in cur)
    { if (name$1 != "class" && name$1 != "style" && name$1 != "nodeName" && cur[name$1] != prev[name$1])
      { dom.setAttribute(name$1, cur[name$1]); } }
  if (prev.class != cur.class) {
    var prevList = prev.class ? prev.class.split(" ") : nothing;
    var curList = cur.class ? cur.class.split(" ") : nothing;
    for (var i = 0; i < prevList.length; i++) { if (curList.indexOf(prevList[i]) == -1)
      { dom.classList.remove(prevList[i]); } }
    for (var i$1 = 0; i$1 < curList.length; i$1++) { if (prevList.indexOf(curList[i$1]) == -1)
      { dom.classList.add(curList[i$1]); } }
  }
  if (prev.style != cur.style) {
    if (prev.style) {
      var prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
      while (m = prop.exec(prev.style))
        { dom.style.removeProperty(m[1]); }
    }
    if (cur.style)
      { dom.style.cssText += cur.style; }
  }
}

function applyOuterDeco(dom, deco, node) {
  return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node, dom.nodeType != 1))
}

// : ([Decoration], [Decoration]) → bool
function sameOuterDeco(a, b) {
  if (a.length != b.length) { return false }
  for (var i = 0; i < a.length; i++) { if (!a[i].type.eq(b[i].type)) { return false } }
  return true
}

// Remove a DOM node and return its next sibling.
function rm(dom) {
  var next = dom.nextSibling;
  dom.parentNode.removeChild(dom);
  return next
}

// Helper class for incrementally updating a tree of mark descs and
// the widget and node descs inside of them.
var ViewTreeUpdater = function ViewTreeUpdater(top, lockedNode) {
  this.top = top;
  this.lock = lockedNode;
  // Index into `this.top`'s child array, represents the current
  // update position.
  this.index = 0;
  // When entering a mark, the current top and index are pushed
  // onto this.
  this.stack = [];
  // Tracks whether anything was changed
  this.changed = false;

  var pre = preMatch(top.node.content, top.children);
  this.preMatched = pre.nodes;
  this.preMatchOffset = pre.offset;
};

ViewTreeUpdater.prototype.getPreMatch = function getPreMatch (index) {
  return index >= this.preMatchOffset ? this.preMatched[index - this.preMatchOffset] : null
};

// Destroy and remove the children between the given indices in
// `this.top`.
ViewTreeUpdater.prototype.destroyBetween = function destroyBetween (start, end) {
  if (start == end) { return }
  for (var i = start; i < end; i++) { this.top.children[i].destroy(); }
  this.top.children.splice(start, end - start);
  this.changed = true;
};

// Destroy all remaining children in `this.top`.
ViewTreeUpdater.prototype.destroyRest = function destroyRest () {
  this.destroyBetween(this.index, this.top.children.length);
};

// : ([Mark], EditorView)
// Sync the current stack of mark descs with the given array of
// marks, reusing existing mark descs when possible.
ViewTreeUpdater.prototype.syncToMarks = function syncToMarks (marks, inline, view) {
  var keep = 0, depth = this.stack.length >> 1;
  var maxKeep = Math.min(depth, marks.length);
  while (keep < maxKeep &&
         (keep == depth - 1 ? this.top : this.stack[(keep + 1) << 1]).matchesMark(marks[keep]) && marks[keep].type.spec.spanning !== false)
    { keep++; }

  while (keep < depth) {
    this.destroyRest();
    this.top.dirty = NOT_DIRTY;
    this.index = this.stack.pop();
    this.top = this.stack.pop();
    depth--;
  }
  while (depth < marks.length) {
    this.stack.push(this.top, this.index + 1);
    var found = -1;
    for (var i = this.index; i < Math.min(this.index + 3, this.top.children.length); i++) {
      if (this.top.children[i].matchesMark(marks[depth])) { found = i; break }
    }
    if (found > -1) {
      if (found > this.index) {
        this.changed = true;
        this.destroyBetween(this.index, found);
      }
      this.top = this.top.children[this.index];
    } else {
      var markDesc = MarkViewDesc.create(this.top, marks[depth], inline, view);
      this.top.children.splice(this.index, 0, markDesc);
      this.top = markDesc;
      this.changed = true;
    }
    this.index = 0;
    depth++;
  }
};

// : (Node, [Decoration], DecorationSource) → bool
// Try to find a node desc matching the given data. Skip over it and
// return true when successful.
ViewTreeUpdater.prototype.findNodeMatch = function findNodeMatch (node, outerDeco, innerDeco, index) {
  var found = -1, preMatch = index < 0 ? undefined : this.getPreMatch(index), children = this.top.children;
  if (preMatch && preMatch.matchesNode(node, outerDeco, innerDeco)) {
    found = children.indexOf(preMatch);
  } else {
    for (var i = this.index, e = Math.min(children.length, i + 5); i < e; i++) {
      var child = children[i];
      if (child.matchesNode(node, outerDeco, innerDeco) && this.preMatched.indexOf(child) < 0) {
        found = i;
        break
      }
    }
  }
  if (found < 0) { return false }
  this.destroyBetween(this.index, found);
  this.index++;
  return true
};

// : (Node, [Decoration], DecorationSource, EditorView, Fragment, number) → bool
// Try to update the next node, if any, to the given data. Checks
// pre-matches to avoid overwriting nodes that could still be used.
ViewTreeUpdater.prototype.updateNextNode = function updateNextNode (node, outerDeco, innerDeco, view, index) {
  for (var i = this.index; i < this.top.children.length; i++) {
    var next = this.top.children[i];
    if (next instanceof NodeViewDesc) {
      var preMatch = this.preMatched.indexOf(next);
      if (preMatch > -1 && preMatch + this.preMatchOffset != index) { return false }
      var nextDOM = next.dom;

      // Can't update if nextDOM is or contains this.lock, except if
      // it's a text node whose content already matches the new text
      // and whose decorations match the new ones.
      var locked = this.lock && (nextDOM == this.lock || nextDOM.nodeType == 1 && nextDOM.contains(this.lock.parentNode)) &&
          !(node.isText && next.node && next.node.isText && next.nodeDOM.nodeValue == node.text &&
            next.dirty != NODE_DIRTY && sameOuterDeco(outerDeco, next.outerDeco));
      if (!locked && next.update(node, outerDeco, innerDeco, view)) {
        this.destroyBetween(this.index, i);
        if (next.dom != nextDOM) { this.changed = true; }
        this.index++;
        return true
      }
      break
    }
  }
  return false
};

// : (Node, [Decoration], DecorationSource, EditorView)
// Insert the node as a newly created node desc.
ViewTreeUpdater.prototype.addNode = function addNode (node, outerDeco, innerDeco, view, pos) {
  this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view, pos));
  this.changed = true;
};

ViewTreeUpdater.prototype.placeWidget = function placeWidget (widget, view, pos) {
  var next = this.index < this.top.children.length ? this.top.children[this.index] : null;
  if (next && next.matchesWidget(widget) && (widget == next.widget || !next.widget.type.toDOM.parentNode)) {
    this.index++;
  } else {
    var desc = new WidgetViewDesc(this.top, widget, view, pos);
    this.top.children.splice(this.index++, 0, desc);
    this.changed = true;
  }
};

// Make sure a textblock looks and behaves correctly in
// contentEditable.
ViewTreeUpdater.prototype.addTextblockHacks = function addTextblockHacks () {
  var lastChild = this.top.children[this.index - 1];
  while (lastChild instanceof MarkViewDesc) { lastChild = lastChild.children[lastChild.children.length - 1]; }

  if (!lastChild || // Empty textblock
      !(lastChild instanceof TextViewDesc) ||
      /\n$/.test(lastChild.node.text)) {
    if (this.index < this.top.children.length && this.top.children[this.index].matchesHack()) {
      this.index++;
    } else {
      var dom = document.createElement("br");
      this.top.children.splice(this.index++, 0, new BRHackViewDesc(this.top, nothing, dom, null));
      this.changed = true;
    }
  }
};

// : (Fragment, [ViewDesc]) → [ViewDesc]
// Iterate from the end of the fragment and array of descs to find
// directly matching ones, in order to avoid overeagerly reusing
// those for other nodes. Returns an array whose positions correspond
// to node positions in the fragment, and whose elements are either
// descs matched to the child at that index, or empty.
function preMatch(frag, descs) {
  var result = [], end = frag.childCount;
  for (var i = descs.length - 1; end > 0 && i >= 0; i--) {
    var desc = descs[i], node = desc.node;
    if (!node) { continue }
    if (node != frag.child(end - 1)) { break }
    result.push(desc);
    --end;
  }
  return {nodes: result.reverse(), offset: end}
}

function compareSide(a, b) { return a.type.side - b.type.side }

// : (ViewDesc, DecorationSource, (Decoration, number), (Node, [Decoration], DecorationSource, number))
// This function abstracts iterating over the nodes and decorations in
// a fragment. Calls `onNode` for each node, with its local and child
// decorations. Splits text nodes when there is a decoration starting
// or ending inside of them. Calls `onWidget` for each widget.
function iterDeco(parent, deco, onWidget, onNode) {
  var locals = deco.locals(parent), offset = 0;
  // Simple, cheap variant for when there are no local decorations
  if (locals.length == 0) {
    for (var i = 0; i < parent.childCount; i++) {
      var child = parent.child(i);
      onNode(child, locals, deco.forChild(offset, child), i);
      offset += child.nodeSize;
    }
    return
  }

  var decoIndex = 0, active = [], restNode = null;
  for (var parentIndex = 0;;) {
    if (decoIndex < locals.length && locals[decoIndex].to == offset) {
      var widget = locals[decoIndex++], widgets = (void 0);
      while (decoIndex < locals.length && locals[decoIndex].to == offset)
        { (widgets || (widgets = [widget])).push(locals[decoIndex++]); }
      if (widgets) {
        widgets.sort(compareSide);
        for (var i$1 = 0; i$1 < widgets.length; i$1++) { onWidget(widgets[i$1], parentIndex, !!restNode); }
      } else {
        onWidget(widget, parentIndex, !!restNode);
      }
    }

    var child$1 = (void 0), index = (void 0);
    if (restNode) {
      index = -1;
      child$1 = restNode;
      restNode = null;
    } else if (parentIndex < parent.childCount) {
      index = parentIndex;
      child$1 = parent.child(parentIndex++);
    } else {
      break
    }

    for (var i$2 = 0; i$2 < active.length; i$2++) { if (active[i$2].to <= offset) { active.splice(i$2--, 1); } }
    while (decoIndex < locals.length && locals[decoIndex].from <= offset && locals[decoIndex].to > offset)
      { active.push(locals[decoIndex++]); }

    var end = offset + child$1.nodeSize;
    if (child$1.isText) {
      var cutAt = end;
      if (decoIndex < locals.length && locals[decoIndex].from < cutAt) { cutAt = locals[decoIndex].from; }
      for (var i$3 = 0; i$3 < active.length; i$3++) { if (active[i$3].to < cutAt) { cutAt = active[i$3].to; } }
      if (cutAt < end) {
        restNode = child$1.cut(cutAt - offset);
        child$1 = child$1.cut(0, cutAt - offset);
        end = cutAt;
        index = -1;
      }
    }

    var outerDeco = !active.length ? nothing
        : child$1.isInline && !child$1.isLeaf ? active.filter(function (d) { return !d.inline; })
        : active.slice();
    onNode(child$1, outerDeco, deco.forChild(offset, child$1), index);
    offset = end;
  }
}

// List markers in Mobile Safari will mysteriously disappear
// sometimes. This works around that.
function iosHacks(dom) {
  if (dom.nodeName == "UL" || dom.nodeName == "OL") {
    var oldCSS = dom.style.cssText;
    dom.style.cssText = oldCSS + "; list-style: square !important";
    window.getComputedStyle(dom).listStyle;
    dom.style.cssText = oldCSS;
  }
}

function nearbyTextNode(node, offset) {
  for (;;) {
    if (node.nodeType == 3) { return node }
    if (node.nodeType == 1 && offset > 0) {
      if (node.childNodes.length > offset && node.childNodes[offset].nodeType == 3)
        { return node.childNodes[offset] }
      node = node.childNodes[offset - 1];
      offset = nodeSize(node);
    } else if (node.nodeType == 1 && offset < node.childNodes.length) {
      node = node.childNodes[offset];
      offset = 0;
    } else {
      return null
    }
  }
}

// Find a piece of text in an inline fragment, overlapping from-to
function findTextInFragment(frag, text, from, to) {
  for (var i = 0, pos = 0; i < frag.childCount && pos <= to;) {
    var child = frag.child(i++), childStart = pos;
    pos += child.nodeSize;
    if (!child.isText) { continue }
    var str = child.text;
    while (i < frag.childCount) {
      var next = frag.child(i++);
      pos += next.nodeSize;
      if (!next.isText) { break }
      str += next.text;
    }
    if (pos >= from) {
      var found = str.lastIndexOf(text, to - childStart);
      if (found >= 0 && found + text.length + childStart >= from)
        { return childStart + found }
    }
  }
  return -1
}

// Replace range from-to in an array of view descs with replacement
// (may be null to just delete). This goes very much against the grain
// of the rest of this code, which tends to create nodes with the
// right shape in one go, rather than messing with them after
// creation, but is necessary in the composition hack.
function replaceNodes(nodes, from, to, view, replacement) {
  var result = [];
  for (var i = 0, off = 0; i < nodes.length; i++) {
    var child = nodes[i], start = off, end = off += child.size;
    if (start >= to || end <= from) {
      result.push(child);
    } else {
      if (start < from) { result.push(child.slice(0, from - start, view)); }
      if (replacement) {
        result.push(replacement);
        replacement = null;
      }
      if (end > to) { result.push(child.slice(to - start, child.size, view)); }
    }
  }
  return result
}

function selectionFromDOM(view, origin) {
  var domSel = view.root.getSelection(), doc = view.state.doc;
  if (!domSel.focusNode) { return null }
  var nearestDesc = view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc && nearestDesc.size == 0;
  var head = view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
  if (head < 0) { return null }
  var $head = doc.resolve(head), $anchor, selection;
  if (selectionCollapsed(domSel)) {
    $anchor = $head;
    while (nearestDesc && !nearestDesc.node) { nearestDesc = nearestDesc.parent; }
    if (nearestDesc && nearestDesc.node.isAtom && prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(nearestDesc.node) && nearestDesc.parent
        && !(nearestDesc.node.isInline && isOnEdge(domSel.focusNode, domSel.focusOffset, nearestDesc.dom))) {
      var pos = nearestDesc.posBefore;
      selection = new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"](head == pos ? $head : doc.resolve(pos));
    }
  } else {
    var anchor = view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
    if (anchor < 0) { return null }
    $anchor = doc.resolve(anchor);
  }

  if (!selection) {
    var bias = origin == "pointer" || (view.state.selection.head < $head.pos && !inWidget) ? 1 : -1;
    selection = selectionBetween(view, $anchor, $head, bias);
  }
  return selection
}

function editorOwnsSelection(view) {
  return view.editable ? view.hasFocus() :
    hasSelection(view) && document.activeElement && document.activeElement.contains(view.dom)
}

function selectionToDOM(view, force) {
  var sel = view.state.selection;
  syncNodeSelection(view, sel);

  if (!editorOwnsSelection(view)) { return }

  view.domObserver.disconnectSelection();

  if (view.cursorWrapper) {
    selectCursorWrapper(view);
  } else {
    var anchor = sel.anchor;
    var head = sel.head;
    var resetEditableFrom, resetEditableTo;
    if (brokenSelectBetweenUneditable && !(sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"])) {
      if (!sel.$from.parent.inlineContent)
        { resetEditableFrom = temporarilyEditableNear(view, sel.from); }
      if (!sel.empty && !sel.$from.parent.inlineContent)
        { resetEditableTo = temporarilyEditableNear(view, sel.to); }
    }
    view.docView.setSelection(anchor, head, view.root, force);
    if (brokenSelectBetweenUneditable) {
      if (resetEditableFrom) { resetEditable(resetEditableFrom); }
      if (resetEditableTo) { resetEditable(resetEditableTo); }
    }
    if (sel.visible) {
      view.dom.classList.remove("ProseMirror-hideselection");
    } else {
      view.dom.classList.add("ProseMirror-hideselection");
      if ("onselectionchange" in document) { removeClassOnSelectionChange(view); }
    }
  }

  view.domObserver.setCurSelection();
  view.domObserver.connectSelection();
}

// Kludge to work around Webkit not allowing a selection to start/end
// between non-editable block nodes. We briefly make something
// editable, set the selection, then set it uneditable again.

var brokenSelectBetweenUneditable = result.safari || result.chrome && result.chrome_version < 63;

function temporarilyEditableNear(view, pos) {
  var ref = view.docView.domFromPos(pos, 0);
  var node = ref.node;
  var offset = ref.offset;
  var after = offset < node.childNodes.length ? node.childNodes[offset] : null;
  var before = offset ? node.childNodes[offset - 1] : null;
  if (result.safari && after && after.contentEditable == "false") { return setEditable(after) }
  if ((!after || after.contentEditable == "false") && (!before || before.contentEditable == "false")) {
    if (after) { return setEditable(after) }
    else if (before) { return setEditable(before) }
  }
}

function setEditable(element) {
  element.contentEditable = "true";
  if (result.safari && element.draggable) { element.draggable = false; element.wasDraggable = true; }
  return element
}

function resetEditable(element) {
  element.contentEditable = "false";
  if (element.wasDraggable) { element.draggable = true; element.wasDraggable = null; }
}

function removeClassOnSelectionChange(view) {
  var doc = view.dom.ownerDocument;
  doc.removeEventListener("selectionchange", view.hideSelectionGuard);
  var domSel = view.root.getSelection();
  var node = domSel.anchorNode, offset = domSel.anchorOffset;
  doc.addEventListener("selectionchange", view.hideSelectionGuard = function () {
    if (domSel.anchorNode != node || domSel.anchorOffset != offset) {
      doc.removeEventListener("selectionchange", view.hideSelectionGuard);
      setTimeout(function () {
        if (!editorOwnsSelection(view) || view.state.selection.visible)
          { view.dom.classList.remove("ProseMirror-hideselection"); }
      }, 20);
    }
  });
}

function selectCursorWrapper(view) {
  var domSel = view.root.getSelection(), range = document.createRange();
  var node = view.cursorWrapper.dom, img = node.nodeName == "IMG";
  if (img) { range.setEnd(node.parentNode, domIndex(node) + 1); }
  else { range.setEnd(node, 0); }
  range.collapse(false);
  domSel.removeAllRanges();
  domSel.addRange(range);
  // Kludge to kill 'control selection' in IE11 when selecting an
  // invisible cursor wrapper, since that would result in those weird
  // resize handles and a selection that considers the absolutely
  // positioned wrapper, rather than the root editable node, the
  // focused element.
  if (!img && !view.state.selection.visible && result.ie && result.ie_version <= 11) {
    node.disabled = true;
    node.disabled = false;
  }
}

function syncNodeSelection(view, sel) {
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"]) {
    var desc = view.docView.descAt(sel.from);
    if (desc != view.lastSelectedViewDesc) {
      clearNodeSelection(view);
      if (desc) { desc.selectNode(); }
      view.lastSelectedViewDesc = desc;
    }
  } else {
    clearNodeSelection(view);
  }
}

// Clear all DOM statefulness of the last node selection.
function clearNodeSelection(view) {
  if (view.lastSelectedViewDesc) {
    if (view.lastSelectedViewDesc.parent)
      { view.lastSelectedViewDesc.deselectNode(); }
    view.lastSelectedViewDesc = null;
  }
}

function selectionBetween(view, $anchor, $head, bias) {
  return view.someProp("createSelectionBetween", function (f) { return f(view, $anchor, $head); })
    || prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"].between($anchor, $head, bias)
}

function hasFocusAndSelection(view) {
  if (view.editable && view.root.activeElement != view.dom) { return false }
  return hasSelection(view)
}

function hasSelection(view) {
  var sel = view.root.getSelection();
  if (!sel.anchorNode) { return false }
  try {
    // Firefox will raise 'permission denied' errors when accessing
    // properties of `sel.anchorNode` when it's in a generated CSS
    // element.
    return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode) &&
      (view.editable || view.dom.contains(sel.focusNode.nodeType == 3 ? sel.focusNode.parentNode : sel.focusNode))
  } catch(_) {
    return false
  }
}

function anchorInRightPlace(view) {
  var anchorDOM = view.docView.domFromPos(view.state.selection.anchor, 0);
  var domSel = view.root.getSelection();
  return isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset)
}

function moveSelectionBlock(state, dir) {
  var ref = state.selection;
  var $anchor = ref.$anchor;
  var $head = ref.$head;
  var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
  var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
  return $start && prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Selection */ "f"].findFrom($start, dir)
}

function apply(view, sel) {
  view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
  return true
}

function selectHorizontally(view, dir, mods) {
  var sel = view.state.selection;
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"]) {
    if (!sel.empty || mods.indexOf("s") > -1) {
      return false
    } else if (view.endOfTextblock(dir > 0 ? "right" : "left")) {
      var next = moveSelectionBlock(view.state, dir);
      if (next && (next instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"])) { return apply(view, next) }
      return false
    } else if (!(result.mac && mods.indexOf("m") > -1)) {
      var $head = sel.$head, node = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter, desc;
      if (!node || node.isText) { return false }
      var nodePos = dir < 0 ? $head.pos - node.nodeSize : $head.pos;
      if (!(node.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM)) { return false }
      if (prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(node)) {
        return apply(view, new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"](dir < 0 ? view.state.doc.resolve($head.pos - node.nodeSize) : $head))
      } else if (result.webkit) {
        // Chrome and Safari will introduce extra pointless cursor
        // positions around inline uneditable nodes, so we have to
        // take over and move the cursor past them (#937)
        return apply(view, new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"](view.state.doc.resolve(dir < 0 ? nodePos : nodePos + node.nodeSize)))
      } else {
        return false
      }
    }
  } else if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"] && sel.node.isInline) {
    return apply(view, new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"](dir > 0 ? sel.$to : sel.$from))
  } else {
    var next$1 = moveSelectionBlock(view.state, dir);
    if (next$1) { return apply(view, next$1) }
    return false
  }
}

function nodeLen(node) {
  return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
}

function isIgnorable(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.size == 0 && (dom.nextSibling || dom.nodeName != "BR")
}

// Make sure the cursor isn't directly after one or more ignored
// nodes, which will confuse the browser's cursor motion logic.
function skipIgnoredNodesLeft(view) {
  var sel = view.root.getSelection();
  var node = sel.focusNode, offset = sel.focusOffset;
  if (!node) { return }
  var moveNode, moveOffset, force = false;
  // Gecko will do odd things when the selection is directly in front
  // of a non-editable node, so in that case, move it into the next
  // node if possible. Issue prosemirror/prosemirror#832.
  if (result.gecko && node.nodeType == 1 && offset < nodeLen(node) && isIgnorable(node.childNodes[offset])) { force = true; }
  for (;;) {
    if (offset > 0) {
      if (node.nodeType != 1) {
        break
      } else {
        var before = node.childNodes[offset - 1];
        if (isIgnorable(before)) {
          moveNode = node;
          moveOffset = --offset;
        } else if (before.nodeType == 3) {
          node = before;
          offset = node.nodeValue.length;
        } else { break }
      }
    } else if (isBlockNode(node)) {
      break
    } else {
      var prev = node.previousSibling;
      while (prev && isIgnorable(prev)) {
        moveNode = node.parentNode;
        moveOffset = domIndex(prev);
        prev = prev.previousSibling;
      }
      if (!prev) {
        node = node.parentNode;
        if (node == view.dom) { break }
        offset = 0;
      } else {
        node = prev;
        offset = nodeLen(node);
      }
    }
  }
  if (force) { setSelFocus(view, sel, node, offset); }
  else if (moveNode) { setSelFocus(view, sel, moveNode, moveOffset); }
}

// Make sure the cursor isn't directly before one or more ignored
// nodes.
function skipIgnoredNodesRight(view) {
  var sel = view.root.getSelection();
  var node = sel.focusNode, offset = sel.focusOffset;
  if (!node) { return }
  var len = nodeLen(node);
  var moveNode, moveOffset;
  for (;;) {
    if (offset < len) {
      if (node.nodeType != 1) { break }
      var after = node.childNodes[offset];
      if (isIgnorable(after)) {
        moveNode = node;
        moveOffset = ++offset;
      }
      else { break }
    } else if (isBlockNode(node)) {
      break
    } else {
      var next = node.nextSibling;
      while (next && isIgnorable(next)) {
        moveNode = next.parentNode;
        moveOffset = domIndex(next) + 1;
        next = next.nextSibling;
      }
      if (!next) {
        node = node.parentNode;
        if (node == view.dom) { break }
        offset = len = 0;
      } else {
        node = next;
        offset = 0;
        len = nodeLen(node);
      }
    }
  }
  if (moveNode) { setSelFocus(view, sel, moveNode, moveOffset); }
}

function isBlockNode(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock
}

function setSelFocus(view, sel, node, offset) {
  if (selectionCollapsed(sel)) {
    var range = document.createRange();
    range.setEnd(node, offset);
    range.setStart(node, offset);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (sel.extend) {
    sel.extend(node, offset);
  }
  view.domObserver.setCurSelection();
  var state = view.state;
  // If no state update ends up happening, reset the selection.
  setTimeout(function () {
    if (view.state == state) { selectionToDOM(view); }
  }, 50);
}

// : (EditorState, number)
// Check whether vertical selection motion would involve node
// selections. If so, apply it (if not, the result is left to the
// browser)
function selectVertically(view, dir, mods) {
  var sel = view.state.selection;
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"] && !sel.empty || mods.indexOf("s") > -1) { return false }
  if (result.mac && mods.indexOf("m") > -1) { return false }
  var $from = sel.$from;
  var $to = sel.$to;

  if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
    var next = moveSelectionBlock(view.state, dir);
    if (next && (next instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"]))
      { return apply(view, next) }
  }
  if (!$from.parent.inlineContent) {
    var side = dir < 0 ? $from : $to;
    var beyond = sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* AllSelection */ "a"] ? prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Selection */ "f"].near(side, dir) : prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Selection */ "f"].findFrom(side, dir);
    return beyond ? apply(view, beyond) : false
  }
  return false
}

function stopNativeHorizontalDelete(view, dir) {
  if (!(view.state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"])) { return true }
  var ref = view.state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  var empty = ref.empty;
  if (!$head.sameParent($anchor)) { return true }
  if (!empty) { return false }
  if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) { return true }
  var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
  if (nextNode && !nextNode.isText) {
    var tr = view.state.tr;
    if (dir < 0) { tr.delete($head.pos - nextNode.nodeSize, $head.pos); }
    else { tr.delete($head.pos, $head.pos + nextNode.nodeSize); }
    view.dispatch(tr);
    return true
  }
  return false
}

function switchEditable(view, node, state) {
  view.domObserver.stop();
  node.contentEditable = state;
  view.domObserver.start();
}

// Issue #867 / #1090 / https://bugs.chromium.org/p/chromium/issues/detail?id=903821
// In which Safari (and at some point in the past, Chrome) does really
// wrong things when the down arrow is pressed when the cursor is
// directly at the start of a textblock and has an uneditable node
// after it
function safariDownArrowBug(view) {
  if (!result.safari || view.state.selection.$head.parentOffset > 0) { return }
  var ref = view.root.getSelection();
  var focusNode = ref.focusNode;
  var focusOffset = ref.focusOffset;
  if (focusNode && focusNode.nodeType == 1 && focusOffset == 0 &&
      focusNode.firstChild && focusNode.firstChild.contentEditable == "false") {
    var child = focusNode.firstChild;
    switchEditable(view, child, true);
    setTimeout(function () { return switchEditable(view, child, false); }, 20);
  }
}

// A backdrop key mapping used to make sure we always suppress keys
// that have a dangerous default effect, even if the commands they are
// bound to return false, and to make sure that cursor-motion keys
// find a cursor (as opposed to a node selection) when pressed. For
// cursor-motion keys, the code in the handlers also takes care of
// block selections.

function getMods(event) {
  var result = "";
  if (event.ctrlKey) { result += "c"; }
  if (event.metaKey) { result += "m"; }
  if (event.altKey) { result += "a"; }
  if (event.shiftKey) { result += "s"; }
  return result
}

function captureKeyDown(view, event) {
  var code = event.keyCode, mods = getMods(event);
  if (code == 8 || (result.mac && code == 72 && mods == "c")) { // Backspace, Ctrl-h on Mac
    return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodesLeft(view)
  } else if (code == 46 || (result.mac && code == 68 && mods == "c")) { // Delete, Ctrl-d on Mac
    return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodesRight(view)
  } else if (code == 13 || code == 27) { // Enter, Esc
    return true
  } else if (code == 37) { // Left arrow
    return selectHorizontally(view, -1, mods) || skipIgnoredNodesLeft(view)
  } else if (code == 39) { // Right arrow
    return selectHorizontally(view, 1, mods) || skipIgnoredNodesRight(view)
  } else if (code == 38) { // Up arrow
    return selectVertically(view, -1, mods) || skipIgnoredNodesLeft(view)
  } else if (code == 40) { // Down arrow
    return safariDownArrowBug(view) || selectVertically(view, 1, mods) || skipIgnoredNodesRight(view)
  } else if (mods == (result.mac ? "m" : "c") &&
             (code == 66 || code == 73 || code == 89 || code == 90)) { // Mod-[biyz]
    return true
  }
  return false
}

// Note that all referencing and parsing is done with the
// start-of-operation selection and document, since that's the one
// that the DOM represents. If any changes came in in the meantime,
// the modification is mapped over those before it is applied, in
// readDOMChange.

function parseBetween(view, from_, to_) {
  var ref = view.docView.parseRange(from_, to_);
  var parent = ref.node;
  var fromOffset = ref.fromOffset;
  var toOffset = ref.toOffset;
  var from = ref.from;
  var to = ref.to;

  var domSel = view.root.getSelection(), find = null, anchor = domSel.anchorNode;
  if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
    find = [{node: anchor, offset: domSel.anchorOffset}];
    if (!selectionCollapsed(domSel))
      { find.push({node: domSel.focusNode, offset: domSel.focusOffset}); }
  }
  // Work around issue in Chrome where backspacing sometimes replaces
  // the deleted content with a random BR node (issues #799, #831)
  if (result.chrome && view.lastKeyCode === 8) {
    for (var off = toOffset; off > fromOffset; off--) {
      var node = parent.childNodes[off - 1], desc = node.pmViewDesc;
      if (node.nodeType == "BR" && !desc) { toOffset = off; break }
      if (!desc || desc.size) { break }
    }
  }
  var startDoc = view.state.doc;
  var parser = view.someProp("domParser") || prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* DOMParser */ "a"].fromSchema(view.state.schema);
  var $from = startDoc.resolve(from);

  var sel = null, doc = parser.parse(parent, {
    topNode: $from.parent,
    topMatch: $from.parent.contentMatchAt($from.index()),
    topOpen: true,
    from: fromOffset,
    to: toOffset,
    preserveWhitespace: $from.parent.type.spec.code ? "full" : true,
    editableContent: true,
    findPositions: find,
    ruleFromNode: ruleFromNode,
    context: $from
  });
  if (find && find[0].pos != null) {
    var anchor$1 = find[0].pos, head = find[1] && find[1].pos;
    if (head == null) { head = anchor$1; }
    sel = {anchor: anchor$1 + from, head: head + from};
  }
  return {doc: doc, sel: sel, from: from, to: to}
}

function ruleFromNode(dom) {
  var desc = dom.pmViewDesc;
  if (desc) {
    return desc.parseRule()
  } else if (dom.nodeName == "BR" && dom.parentNode) {
    // Safari replaces the list item or table cell with a BR
    // directly in the list node (?!) if you delete the last
    // character in a list item or table cell (#708, #862)
    if (result.safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) {
      var skip = document.createElement("div");
      skip.appendChild(document.createElement("li"));
      return {skip: skip}
    } else if (dom.parentNode.lastChild == dom || result.safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) {
      return {ignore: true}
    }
  } else if (dom.nodeName == "IMG" && dom.getAttribute("mark-placeholder")) {
    return {ignore: true}
  }
}

function readDOMChange(view, from, to, typeOver, addedNodes) {
  if (from < 0) {
    var origin = view.lastSelectionTime > Date.now() - 50 ? view.lastSelectionOrigin : null;
    var newSel = selectionFromDOM(view, origin);
    if (newSel && !view.state.selection.eq(newSel)) {
      var tr$1 = view.state.tr.setSelection(newSel);
      if (origin == "pointer") { tr$1.setMeta("pointer", true); }
      else if (origin == "key") { tr$1.scrollIntoView(); }
      view.dispatch(tr$1);
    }
    return
  }

  var $before = view.state.doc.resolve(from);
  var shared = $before.sharedDepth(to);
  from = $before.before(shared + 1);
  to = view.state.doc.resolve(to).after(shared + 1);

  var sel = view.state.selection;
  var parse = parseBetween(view, from, to);
  // Chrome sometimes leaves the cursor before the inserted text when
  // composing after a cursor wrapper. This moves it forward.
  if (result.chrome && view.cursorWrapper && parse.sel && parse.sel.anchor == view.cursorWrapper.deco.from) {
    var text = view.cursorWrapper.deco.type.toDOM.nextSibling;
    var size = text && text.nodeValue ? text.nodeValue.length : 1;
    parse.sel = {anchor: parse.sel.anchor + size, head: parse.sel.anchor + size};
  }

  var doc = view.state.doc, compare = doc.slice(parse.from, parse.to);
  var preferredPos, preferredSide;
  // Prefer anchoring to end when Backspace is pressed
  if (view.lastKeyCode === 8 && Date.now() - 100 < view.lastKeyCodeTime) {
    preferredPos = view.state.selection.to;
    preferredSide = "end";
  } else {
    preferredPos = view.state.selection.from;
    preferredSide = "start";
  }
  view.lastKeyCode = null;

  var change = findDiff(compare.content, parse.doc.content, parse.from, preferredPos, preferredSide);
  if (!change) {
    if (typeOver && sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"] && !sel.empty && sel.$head.sameParent(sel.$anchor) &&
        !view.composing && !(parse.sel && parse.sel.anchor != parse.sel.head)) {
      change = {start: sel.from, endA: sel.to, endB: sel.to};
    } else if (result.ios && view.lastIOSEnter > Date.now() - 225 &&
               addedNodes.some(function (n) { return n.nodeName == "DIV" || n.nodeName == "P"; }) &&
               view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(13, "Enter")); })) {
      view.lastIOSEnter = 0;
      return
    } else {
      if (parse.sel) {
        var sel$1 = resolveSelection(view, view.state.doc, parse.sel);
        if (sel$1 && !sel$1.eq(view.state.selection)) { view.dispatch(view.state.tr.setSelection(sel$1)); }
      }
      return
    }
  }
  view.domChangeCount++;
  // Handle the case where overwriting a selection by typing matches
  // the start or end of the selected content, creating a change
  // that's smaller than what was actually overwritten.
  if (view.state.selection.from < view.state.selection.to &&
      change.start == change.endB &&
      view.state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"]) {
    if (change.start > view.state.selection.from && change.start <= view.state.selection.from + 2) {
      change.start = view.state.selection.from;
    } else if (change.endA < view.state.selection.to && change.endA >= view.state.selection.to - 2) {
      change.endB += (view.state.selection.to - change.endA);
      change.endA = view.state.selection.to;
    }
  }

  // IE11 will insert a non-breaking space _ahead_ of the space after
  // the cursor space when adding a space before another space. When
  // that happened, adjust the change to cover the space instead.
  if (result.ie && result.ie_version <= 11 && change.endB == change.start + 1 &&
      change.endA == change.start && change.start > parse.from &&
      parse.doc.textBetween(change.start - parse.from - 1, change.start - parse.from + 1) == " \u00a0") {
    change.start--;
    change.endA--;
    change.endB--;
  }

  var $from = parse.doc.resolveNoCache(change.start - parse.from);
  var $to = parse.doc.resolveNoCache(change.endB - parse.from);
  var inlineChange = $from.sameParent($to) && $from.parent.inlineContent;
  var nextSel;
  // If this looks like the effect of pressing Enter (or was recorded
  // as being an iOS enter press), just dispatch an Enter key instead.
  if (((result.ios && view.lastIOSEnter > Date.now() - 225 &&
        (!inlineChange || addedNodes.some(function (n) { return n.nodeName == "DIV" || n.nodeName == "P"; }))) ||
       (!inlineChange && $from.pos < parse.doc.content.size &&
        (nextSel = prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Selection */ "f"].findFrom(parse.doc.resolve($from.pos + 1), 1, true)) &&
        nextSel.head == $to.pos)) &&
      view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(13, "Enter")); })) {
    view.lastIOSEnter = 0;
    return
  }
  // Same for backspace
  if (view.state.selection.anchor > change.start &&
      looksLikeJoin(doc, change.start, change.endA, $from, $to) &&
      view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(8, "Backspace")); })) {
    if (result.android && result.chrome) { view.domObserver.suppressSelectionUpdates(); } // #820
    return
  }

  // This tries to detect Android virtual keyboard
  // enter-and-pick-suggestion action. That sometimes (see issue
  // #1059) first fires a DOM mutation, before moving the selection to
  // the newly created block. And then, because ProseMirror cleans up
  // the DOM selection, it gives up moving the selection entirely,
  // leaving the cursor in the wrong place. When that happens, we drop
  // the new paragraph from the initial change, and fire a simulated
  // enter key afterwards.
  if (result.android && !inlineChange && $from.start() != $to.start() && $to.parentOffset == 0 && $from.depth == $to.depth &&
      parse.sel && parse.sel.anchor == parse.sel.head && parse.sel.head == change.endA) {
    change.endB -= 2;
    $to = parse.doc.resolveNoCache(change.endB - parse.from);
    setTimeout(function () {
      view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(13, "Enter")); });
    }, 20);
  }

  var chFrom = change.start, chTo = change.endA;

  var tr, storedMarks, markChange, $from1;
  if (inlineChange) {
    if ($from.pos == $to.pos) { // Deletion
      // IE11 sometimes weirdly moves the DOM selection around after
      // backspacing out the first element in a textblock
      if (result.ie && result.ie_version <= 11 && $from.parentOffset == 0) {
        view.domObserver.suppressSelectionUpdates();
        setTimeout(function () { return selectionToDOM(view); }, 20);
      }
      tr = view.state.tr.delete(chFrom, chTo);
      storedMarks = doc.resolve(change.start).marksAcross(doc.resolve(change.endA));
    } else if ( // Adding or removing a mark
      change.endA == change.endB && ($from1 = doc.resolve(change.start)) &&
      (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset),
                                 $from1.parent.content.cut($from1.parentOffset, change.endA - $from1.start())))
    ) {
      tr = view.state.tr;
      if (markChange.type == "add") { tr.addMark(chFrom, chTo, markChange.mark); }
      else { tr.removeMark(chFrom, chTo, markChange.mark); }
    } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
      // Both positions in the same text node -- simply insert text
      var text$1 = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
      if (view.someProp("handleTextInput", function (f) { return f(view, chFrom, chTo, text$1); })) { return }
      tr = view.state.tr.insertText(text$1, chFrom, chTo);
    }
  }

  if (!tr)
    { tr = view.state.tr.replace(chFrom, chTo, parse.doc.slice(change.start - parse.from, change.endB - parse.from)); }
  if (parse.sel) {
    var sel$2 = resolveSelection(view, tr.doc, parse.sel);
    // Chrome Android will sometimes, during composition, report the
    // selection in the wrong place. If it looks like that is
    // happening, don't update the selection.
    // Edge just doesn't move the cursor forward when you start typing
    // in an empty block or between br nodes.
    if (sel$2 && !(result.chrome && result.android && view.composing && sel$2.empty &&
                   (sel$2.head == chFrom || sel$2.head == tr.mapping.map(chTo) - 1) ||
                 result.ie && sel$2.empty && sel$2.head == chFrom))
      { tr.setSelection(sel$2); }
  }
  if (storedMarks) { tr.ensureMarks(storedMarks); }
  view.dispatch(tr.scrollIntoView());
}

function resolveSelection(view, doc, parsedSel) {
  if (Math.max(parsedSel.anchor, parsedSel.head) > doc.content.size) { return null }
  return selectionBetween(view, doc.resolve(parsedSel.anchor), doc.resolve(parsedSel.head))
}

// : (Fragment, Fragment) → ?{mark: Mark, type: string}
// Given two same-length, non-empty fragments of inline content,
// determine whether the first could be created from the second by
// removing or adding a single mark type.
function isMarkChange(cur, prev) {
  var curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
  var added = curMarks, removed = prevMarks, type, mark, update;
  for (var i = 0; i < prevMarks.length; i++) { added = prevMarks[i].removeFromSet(added); }
  for (var i$1 = 0; i$1 < curMarks.length; i$1++) { removed = curMarks[i$1].removeFromSet(removed); }
  if (added.length == 1 && removed.length == 0) {
    mark = added[0];
    type = "add";
    update = function (node) { return node.mark(mark.addToSet(node.marks)); };
  } else if (added.length == 0 && removed.length == 1) {
    mark = removed[0];
    type = "remove";
    update = function (node) { return node.mark(mark.removeFromSet(node.marks)); };
  } else {
    return null
  }
  var updated = [];
  for (var i$2 = 0; i$2 < prev.childCount; i$2++) { updated.push(update(prev.child(i$2))); }
  if (prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(updated).eq(cur)) { return {mark: mark, type: type} }
}

function looksLikeJoin(old, start, end, $newStart, $newEnd) {
  if (!$newStart.parent.isTextblock ||
      // The content must have shrunk
      end - start <= $newEnd.pos - $newStart.pos ||
      // newEnd must point directly at or after the end of the block that newStart points into
      skipClosingAndOpening($newStart, true, false) < $newEnd.pos)
    { return false }

  var $start = old.resolve(start);
  // Start must be at the end of a block
  if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock)
    { return false }
  var $next = old.resolve(skipClosingAndOpening($start, true, true));
  // The next textblock must start before end and end near it
  if (!$next.parent.isTextblock || $next.pos > end ||
      skipClosingAndOpening($next, true, false) < end)
    { return false }

  // The fragments after the join point must match
  return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content)
}

function skipClosingAndOpening($pos, fromEnd, mayOpen) {
  var depth = $pos.depth, end = fromEnd ? $pos.end() : $pos.pos;
  while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
    depth--;
    end++;
    fromEnd = false;
  }
  if (mayOpen) {
    var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
    while (next && !next.isLeaf) {
      next = next.firstChild;
      end++;
    }
  }
  return end
}

function findDiff(a, b, pos, preferredPos, preferredSide) {
  var start = a.findDiffStart(b, pos);
  if (start == null) { return null }
  var ref = a.findDiffEnd(b, pos + a.size, pos + b.size);
  var endA = ref.a;
  var endB = ref.b;
  if (preferredSide == "end") {
    var adjust = Math.max(0, start - Math.min(endA, endB));
    preferredPos -= endA + adjust - start;
  }
  if (endA < start && a.size < b.size) {
    var move = preferredPos <= start && preferredPos >= endA ? start - preferredPos : 0;
    start -= move;
    endB = start + (endB - endA);
    endA = start;
  } else if (endB < start) {
    var move$1 = preferredPos <= start && preferredPos >= endB ? start - preferredPos : 0;
    start -= move$1;
    endA = start + (endA - endB);
    endB = start;
  }
  return {start: start, endA: endA, endB: endB}
}

function serializeForClipboard(view, slice) {
  var context = [];
  var content = slice.content;
  var openStart = slice.openStart;
  var openEnd = slice.openEnd;
  while (openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1) {
    openStart--;
    openEnd--;
    var node = content.firstChild;
    context.push(node.type.name, node.attrs != node.type.defaultAttrs ? node.attrs : null);
    content = node.content;
  }

  var serializer = view.someProp("clipboardSerializer") || prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* DOMSerializer */ "b"].fromSchema(view.state.schema);
  var doc = detachedDoc(), wrap = doc.createElement("div");
  wrap.appendChild(serializer.serializeFragment(content, {document: doc}));

  var firstChild = wrap.firstChild, needsWrap;
  while (firstChild && firstChild.nodeType == 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
    for (var i = needsWrap.length - 1; i >= 0; i--) {
      var wrapper = doc.createElement(needsWrap[i]);
      while (wrap.firstChild) { wrapper.appendChild(wrap.firstChild); }
      wrap.appendChild(wrapper);
    }
    firstChild = wrap.firstChild;
  }

  if (firstChild && firstChild.nodeType == 1)
    { firstChild.setAttribute("data-pm-slice", (openStart + " " + openEnd + " " + (JSON.stringify(context)))); }

  var text = view.someProp("clipboardTextSerializer", function (f) { return f(slice); }) ||
      slice.content.textBetween(0, slice.content.size, "\n\n");

  return {dom: wrap, text: text}
}

// : (EditorView, string, string, ?bool, ResolvedPos) → ?Slice
// Read a slice of content from the clipboard (or drop data).
function parseFromClipboard(view, text, html, plainText, $context) {
  var dom, inCode = $context.parent.type.spec.code, slice;
  if (!html && !text) { return null }
  var asText = text && (plainText || inCode || !html);
  if (asText) {
    view.someProp("transformPastedText", function (f) { text = f(text, inCode || plainText); });
    if (inCode) { return new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(view.state.schema.text(text.replace(/\r\n?/g, "\n"))), 0, 0) }
    var parsed = view.someProp("clipboardTextParser", function (f) { return f(text, $context, plainText); });
    if (parsed) {
      slice = parsed;
    } else {
      dom = document.createElement("div");
      text.trim().split(/(?:\r\n?|\n)+/).forEach(function (block) {
        dom.appendChild(document.createElement("p")).textContent = block;
      });
    }
  } else {
    view.someProp("transformPastedHTML", function (f) { html = f(html); });
    dom = readHTML(html);
  }

  var contextNode = dom && dom.querySelector("[data-pm-slice]");
  var sliceData = contextNode && /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute("data-pm-slice"));
  if (!slice) {
    var parser = view.someProp("clipboardParser") || view.someProp("domParser") || prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* DOMParser */ "a"].fromSchema(view.state.schema);
    slice = parser.parseSlice(dom, {preserveWhitespace: !!(asText || sliceData), context: $context});
  }
  if (sliceData)
    { slice = addContext(closeSlice(slice, +sliceData[1], +sliceData[2]), sliceData[3]); }
  else // HTML wasn't created by ProseMirror. Make sure top-level siblings are coherent
    { slice = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"].maxOpen(normalizeSiblings(slice.content, $context), false); }

  view.someProp("transformPasted", function (f) { slice = f(slice); });
  return slice
}

// Takes a slice parsed with parseSlice, which means there hasn't been
// any content-expression checking done on the top nodes, tries to
// find a parent node in the current context that might fit the nodes,
// and if successful, rebuilds the slice so that it fits into that parent.
//
// This addresses the problem that Transform.replace expects a
// coherent slice, and will fail to place a set of siblings that don't
// fit anywhere in the schema.
function normalizeSiblings(fragment, $context) {
  if (fragment.childCount < 2) { return fragment }
  var loop = function ( d ) {
    var parent = $context.node(d);
    var match = parent.contentMatchAt($context.index(d));
    var lastWrap = (void 0), result = [];
    fragment.forEach(function (node) {
      if (!result) { return }
      var wrap = match.findWrapping(node.type), inLast;
      if (!wrap) { return result = null }
      if (inLast = result.length && lastWrap.length && addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) {
        result[result.length - 1] = inLast;
      } else {
        if (result.length) { result[result.length - 1] = closeRight(result[result.length - 1], lastWrap.length); }
        var wrapped = withWrappers(node, wrap);
        result.push(wrapped);
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });
    if (result) { return { v: prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(result) } }
  };

  for (var d = $context.depth; d >= 0; d--) {
    var returned = loop( d );

    if ( returned ) return returned.v;
  }
  return fragment
}

function withWrappers(node, wrap, from) {
  if ( from === void 0 ) from = 0;

  for (var i = wrap.length - 1; i >= from; i--)
    { node = wrap[i].create(null, prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(node)); }
  return node
}

// Used to group adjacent nodes wrapped in similar parents by
// normalizeSiblings into the same parent node
function addToSibling(wrap, lastWrap, node, sibling, depth) {
  if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
    var inner = addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
    if (inner) { return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner)) }
    var match = sibling.contentMatchAt(sibling.childCount);
    if (match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1]))
      { return sibling.copy(sibling.content.append(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(withWrappers(node, wrap, depth + 1)))) }
  }
}

function closeRight(node, depth) {
  if (depth == 0) { return node }
  var fragment = node.content.replaceChild(node.childCount - 1, closeRight(node.lastChild, depth - 1));
  var fill = node.contentMatchAt(node.childCount).fillBefore(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty, true);
  return node.copy(fragment.append(fill))
}

function closeRange(fragment, side, from, to, depth, openEnd) {
  var node = side < 0 ? fragment.firstChild : fragment.lastChild, inner = node.content;
  if (depth < to - 1) { inner = closeRange(inner, side, from, to, depth + 1, openEnd); }
  if (depth >= from)
    { inner = side < 0 ? node.contentMatchAt(0).fillBefore(inner, fragment.childCount > 1 || openEnd <= depth).append(inner)
      : inner.append(node.contentMatchAt(node.childCount).fillBefore(prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].empty, true)); }
  return fragment.replaceChild(side < 0 ? 0 : fragment.childCount - 1, node.copy(inner))
}

function closeSlice(slice, openStart, openEnd) {
  if (openStart < slice.openStart)
    { slice = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](closeRange(slice.content, -1, openStart, slice.openStart, 0, slice.openEnd), openStart, slice.openEnd); }
  if (openEnd < slice.openEnd)
    { slice = new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](closeRange(slice.content, 1, openEnd, slice.openEnd, 0, 0), slice.openStart, openEnd); }
  return slice
}

// Trick from jQuery -- some elements must be wrapped in other
// elements for innerHTML to work. I.e. if you do `div.innerHTML =
// "<td>..</td>"` the table cells are ignored.
var wrapMap = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};

var _detachedDoc = null;
function detachedDoc() {
  return _detachedDoc || (_detachedDoc = document.implementation.createHTMLDocument("title"))
}

function readHTML(html) {
  var metas = /(\s*<meta [^>]*>)*/.exec(html);
  if (metas) { html = html.slice(metas[0].length); }
  var elt = detachedDoc().createElement("div");
  var firstTag = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(html), wrap, depth = 0;
  if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
    html = wrap.map(function (n) { return "<" + n + ">"; }).join("") + html + wrap.map(function (n) { return "</" + n + ">"; }).reverse().join("");
    depth = wrap.length;
  }
  elt.innerHTML = html;
  for (var i = 0; i < depth; i++) { elt = elt.firstChild; }
  return elt
}

function addContext(slice, context) {
  if (!slice.size) { return slice }
  var schema = slice.content.firstChild.type.schema, array;
  try { array = JSON.parse(context); }
  catch(e) { return slice }
  var content = slice.content;
  var openStart = slice.openStart;
  var openEnd = slice.openEnd;
  for (var i = array.length - 2; i >= 0; i -= 2) {
    var type = schema.nodes[array[i]];
    if (!type || type.hasRequiredAttrs()) { break }
    content = prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "c"].from(type.create(array[i + 1], content));
    openStart++; openEnd++;
  }
  return new prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"](content, openStart, openEnd)
}

var observeOptions = {
  childList: true,
  characterData: true,
  characterDataOldValue: true,
  attributes: true,
  attributeOldValue: true,
  subtree: true
};
// IE11 has very broken mutation observers, so we also listen to DOMCharacterDataModified
var useCharData = result.ie && result.ie_version <= 11;

var SelectionState = function SelectionState() {
  this.anchorNode = this.anchorOffset = this.focusNode = this.focusOffset = null;
};

SelectionState.prototype.set = function set (sel) {
  this.anchorNode = sel.anchorNode; this.anchorOffset = sel.anchorOffset;
  this.focusNode = sel.focusNode; this.focusOffset = sel.focusOffset;
};

SelectionState.prototype.eq = function eq (sel) {
  return sel.anchorNode == this.anchorNode && sel.anchorOffset == this.anchorOffset &&
    sel.focusNode == this.focusNode && sel.focusOffset == this.focusOffset
};

var DOMObserver = function DOMObserver(view, handleDOMChange) {
  var this$1 = this;

  this.view = view;
  this.handleDOMChange = handleDOMChange;
  this.queue = [];
  this.flushingSoon = -1;
  this.observer = window.MutationObserver &&
    new window.MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) { this$1.queue.push(mutations[i]); }
      // IE11 will sometimes (on backspacing out a single character
      // text node after a BR node) call the observer callback
      // before actually updating the DOM, which will cause
      // ProseMirror to miss the change (see #930)
      if (result.ie && result.ie_version <= 11 && mutations.some(
        function (m) { return m.type == "childList" && m.removedNodes.length ||
             m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length; }))
        { this$1.flushSoon(); }
      else
        { this$1.flush(); }
    });
  this.currentSelection = new SelectionState;
  if (useCharData) {
    this.onCharData = function (e) {
      this$1.queue.push({target: e.target, type: "characterData", oldValue: e.prevValue});
      this$1.flushSoon();
    };
  }
  this.onSelectionChange = this.onSelectionChange.bind(this);
  this.suppressingSelectionUpdates = false;
};

DOMObserver.prototype.flushSoon = function flushSoon () {
    var this$1 = this;

  if (this.flushingSoon < 0)
    { this.flushingSoon = window.setTimeout(function () { this$1.flushingSoon = -1; this$1.flush(); }, 20); }
};

DOMObserver.prototype.forceFlush = function forceFlush () {
  if (this.flushingSoon > -1) {
    window.clearTimeout(this.flushingSoon);
    this.flushingSoon = -1;
    this.flush();
  }
};

DOMObserver.prototype.start = function start () {
  if (this.observer)
    { this.observer.observe(this.view.dom, observeOptions); }
  if (useCharData)
    { this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData); }
  this.connectSelection();
};

DOMObserver.prototype.stop = function stop () {
    var this$1 = this;

  if (this.observer) {
    var take = this.observer.takeRecords();
    if (take.length) {
      for (var i = 0; i < take.length; i++) { this.queue.push(take[i]); }
      window.setTimeout(function () { return this$1.flush(); }, 20);
    }
    this.observer.disconnect();
  }
  if (useCharData) { this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData); }
  this.disconnectSelection();
};

DOMObserver.prototype.connectSelection = function connectSelection () {
  this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
};

DOMObserver.prototype.disconnectSelection = function disconnectSelection () {
  this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
};

DOMObserver.prototype.suppressSelectionUpdates = function suppressSelectionUpdates () {
    var this$1 = this;

  this.suppressingSelectionUpdates = true;
  setTimeout(function () { return this$1.suppressingSelectionUpdates = false; }, 50);
};

DOMObserver.prototype.onSelectionChange = function onSelectionChange () {
  if (!hasFocusAndSelection(this.view)) { return }
  if (this.suppressingSelectionUpdates) { return selectionToDOM(this.view) }
  // Deletions on IE11 fire their events in the wrong order, giving
  // us a selection change event before the DOM changes are
  // reported.
  if (result.ie && result.ie_version <= 11 && !this.view.state.selection.empty) {
    var sel = this.view.root.getSelection();
    // Selection.isCollapsed isn't reliable on IE
    if (sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset))
      { return this.flushSoon() }
  }
  this.flush();
};

DOMObserver.prototype.setCurSelection = function setCurSelection () {
  this.currentSelection.set(this.view.root.getSelection());
};

DOMObserver.prototype.ignoreSelectionChange = function ignoreSelectionChange (sel) {
  if (sel.rangeCount == 0) { return true }
  var container = sel.getRangeAt(0).commonAncestorContainer;
  var desc = this.view.docView.nearestDesc(container);
  if (desc && desc.ignoreMutation({type: "selection", target: container.nodeType == 3 ? container.parentNode : container})) {
    this.setCurSelection();
    return true
  }
};

DOMObserver.prototype.flush = function flush () {
  if (!this.view.docView || this.flushingSoon > -1) { return }
  var mutations = this.observer ? this.observer.takeRecords() : [];
  if (this.queue.length) {
    mutations = this.queue.concat(mutations);
    this.queue.length = 0;
  }

  var sel = this.view.root.getSelection();
  var newSel = !this.suppressingSelectionUpdates && !this.currentSelection.eq(sel) && hasSelection(this.view) && !this.ignoreSelectionChange(sel);

  var from = -1, to = -1, typeOver = false, added = [];
  if (this.view.editable) {
    for (var i = 0; i < mutations.length; i++) {
      var result$1 = this.registerMutation(mutations[i], added);
      if (result$1) {
        from = from < 0 ? result$1.from : Math.min(result$1.from, from);
        to = to < 0 ? result$1.to : Math.max(result$1.to, to);
        if (result$1.typeOver) { typeOver = true; }
      }
    }
  }

  if (result.gecko && added.length > 1) {
    var brs = added.filter(function (n) { return n.nodeName == "BR"; });
    if (brs.length == 2) {
      var a = brs[0];
        var b = brs[1];
      if (a.parentNode && a.parentNode.parentNode == b.parentNode) { b.remove(); }
      else { a.remove(); }
    }
  }

  if (from > -1 || newSel) {
    if (from > -1) {
      this.view.docView.markDirty(from, to);
      checkCSS(this.view);
    }
    this.handleDOMChange(from, to, typeOver, added);
    if (this.view.docView.dirty) { this.view.updateState(this.view.state); }
    else if (!this.currentSelection.eq(sel)) { selectionToDOM(this.view); }
    this.currentSelection.set(sel);
  }
};

DOMObserver.prototype.registerMutation = function registerMutation (mut, added) {
  // Ignore mutations inside nodes that were already noted as inserted
  if (added.indexOf(mut.target) > -1) { return null }
  var desc = this.view.docView.nearestDesc(mut.target);
  if (mut.type == "attributes" &&
      (desc == this.view.docView || mut.attributeName == "contenteditable" ||
       // Firefox sometimes fires spurious events for null/empty styles
       (mut.attributeName == "style" && !mut.oldValue && !mut.target.getAttribute("style"))))
    { return null }
  if (!desc || desc.ignoreMutation(mut)) { return null }

  if (mut.type == "childList") {
    if (desc.contentDOM && desc.contentDOM != desc.dom && !desc.contentDOM.contains(mut.target))
      { return {from: desc.posBefore, to: desc.posAfter} }
    var prev = mut.previousSibling, next = mut.nextSibling;
    if (result.ie && result.ie_version <= 11 && mut.addedNodes.length) {
      // IE11 gives us incorrect next/prev siblings for some
      // insertions, so if there are added nodes, recompute those
      for (var i = 0; i < mut.addedNodes.length; i++) {
        var ref = mut.addedNodes[i];
          var previousSibling = ref.previousSibling;
          var nextSibling = ref.nextSibling;
        if (!previousSibling || Array.prototype.indexOf.call(mut.addedNodes, previousSibling) < 0) { prev = previousSibling; }
        if (!nextSibling || Array.prototype.indexOf.call(mut.addedNodes, nextSibling) < 0) { next = nextSibling; }
      }
    }
    var fromOffset = prev && prev.parentNode == mut.target
        ? domIndex(prev) + 1 : 0;
    var from = desc.localPosFromDOM(mut.target, fromOffset, -1);
    var toOffset = next && next.parentNode == mut.target
        ? domIndex(next) : mut.target.childNodes.length;
    for (var i$1 = 0; i$1 < mut.addedNodes.length; i$1++) { added.push(mut.addedNodes[i$1]); }
    var to = desc.localPosFromDOM(mut.target, toOffset, 1);
    return {from: from, to: to}
  } else if (mut.type == "attributes") {
    return {from: desc.posAtStart - desc.border, to: desc.posAtEnd + desc.border}
  } else { // "characterData"
    return {
      from: desc.posAtStart,
      to: desc.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: mut.target.nodeValue == mut.oldValue
    }
  }
};

var cssChecked = false;

function checkCSS(view) {
  if (cssChecked) { return }
  cssChecked = true;
  if (getComputedStyle(view.dom).whiteSpace == "normal")
    { console["warn"]("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."); }
}

// A collection of DOM events that occur within the editor, and callback functions
// to invoke when the event fires.
var handlers = {}, editHandlers = {};

function initInput(view) {
  view.shiftKey = false;
  view.mouseDown = null;
  view.lastKeyCode = null;
  view.lastKeyCodeTime = 0;
  view.lastClick = {time: 0, x: 0, y: 0, type: ""};
  view.lastSelectionOrigin = null;
  view.lastSelectionTime = 0;

  view.lastIOSEnter = 0;
  view.lastIOSEnterFallbackTimeout = null;

  view.composing = false;
  view.composingTimeout = null;
  view.compositionNodes = [];
  view.compositionEndedAt = -2e8;

  view.domObserver = new DOMObserver(view, function (from, to, typeOver, added) { return readDOMChange(view, from, to, typeOver, added); });
  view.domObserver.start();
  // Used by hacks like the beforeinput handler to check whether anything happened in the DOM
  view.domChangeCount = 0;

  view.eventHandlers = Object.create(null);
  var loop = function ( event ) {
    var handler = handlers[event];
    view.dom.addEventListener(event, view.eventHandlers[event] = function (event) {
      if (eventBelongsToView(view, event) && !runCustomHandler(view, event) &&
          (view.editable || !(event.type in editHandlers)))
        { handler(view, event); }
    });
  };

  for (var event in handlers) loop( event );
  // On Safari, for reasons beyond my understanding, adding an input
  // event handler makes an issue where the composition vanishes when
  // you press enter go away.
  if (result.safari) { view.dom.addEventListener("input", function () { return null; }); }

  ensureListeners(view);
}

function setSelectionOrigin(view, origin) {
  view.lastSelectionOrigin = origin;
  view.lastSelectionTime = Date.now();
}

function destroyInput(view) {
  view.domObserver.stop();
  for (var type in view.eventHandlers)
    { view.dom.removeEventListener(type, view.eventHandlers[type]); }
  clearTimeout(view.composingTimeout);
  clearTimeout(view.lastIOSEnterFallbackTimeout);
}

function ensureListeners(view) {
  view.someProp("handleDOMEvents", function (currentHandlers) {
    for (var type in currentHandlers) { if (!view.eventHandlers[type])
      { view.dom.addEventListener(type, view.eventHandlers[type] = function (event) { return runCustomHandler(view, event); }); } }
  });
}

function runCustomHandler(view, event) {
  return view.someProp("handleDOMEvents", function (handlers) {
    var handler = handlers[event.type];
    return handler ? handler(view, event) || event.defaultPrevented : false
  })
}

function eventBelongsToView(view, event) {
  if (!event.bubbles) { return true }
  if (event.defaultPrevented) { return false }
  for (var node = event.target; node != view.dom; node = node.parentNode)
    { if (!node || node.nodeType == 11 ||
        (node.pmViewDesc && node.pmViewDesc.stopEvent(event)))
      { return false } }
  return true
}

function dispatchEvent(view, event) {
  if (!runCustomHandler(view, event) && handlers[event.type] &&
      (view.editable || !(event.type in editHandlers)))
    { handlers[event.type](view, event); }
}

editHandlers.keydown = function (view, event) {
  view.shiftKey = event.keyCode == 16 || event.shiftKey;
  if (inOrNearComposition(view, event)) { return }
  view.domObserver.forceFlush();
  view.lastKeyCode = event.keyCode;
  view.lastKeyCodeTime = Date.now();
  // On iOS, if we preventDefault enter key presses, the virtual
  // keyboard gets confused. So the hack here is to set a flag that
  // makes the DOM change code recognize that what just happens should
  // be replaced by whatever the Enter key handlers do.
  if (result.ios && event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.metaKey) {
    var now = Date.now();
    view.lastIOSEnter = now;
    view.lastIOSEnterFallbackTimeout = setTimeout(function () {
      if (view.lastIOSEnter == now) {
        view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(13, "Enter")); });
        view.lastIOSEnter = 0;
      }
    }, 200);
  } else if (view.someProp("handleKeyDown", function (f) { return f(view, event); }) || captureKeyDown(view, event)) {
    event.preventDefault();
  } else {
    setSelectionOrigin(view, "key");
  }
};

editHandlers.keyup = function (view, e) {
  if (e.keyCode == 16) { view.shiftKey = false; }
};

editHandlers.keypress = function (view, event) {
  if (inOrNearComposition(view, event) || !event.charCode ||
      event.ctrlKey && !event.altKey || result.mac && event.metaKey) { return }

  if (view.someProp("handleKeyPress", function (f) { return f(view, event); })) {
    event.preventDefault();
    return
  }

  var sel = view.state.selection;
  if (!(sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"]) || !sel.$from.sameParent(sel.$to)) {
    var text = String.fromCharCode(event.charCode);
    if (!view.someProp("handleTextInput", function (f) { return f(view, sel.$from.pos, sel.$to.pos, text); }))
      { view.dispatch(view.state.tr.insertText(text).scrollIntoView()); }
    event.preventDefault();
  }
};

function eventCoords(event) { return {left: event.clientX, top: event.clientY} }

function isNear(event, click) {
  var dx = click.x - event.clientX, dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100
}

function runHandlerOnContext(view, propName, pos, inside, event) {
  if (inside == -1) { return false }
  var $pos = view.state.doc.resolve(inside);
  var loop = function ( i ) {
    if (view.someProp(propName, function (f) { return i > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i), event, true)
                                                    : f(view, pos, $pos.node(i), $pos.before(i), event, false); }))
      { return { v: true } }
  };

  for (var i = $pos.depth + 1; i > 0; i--) {
    var returned = loop( i );

    if ( returned ) return returned.v;
  }
  return false
}

function updateSelection(view, selection, origin) {
  if (!view.focused) { view.focus(); }
  var tr = view.state.tr.setSelection(selection);
  if (origin == "pointer") { tr.setMeta("pointer", true); }
  view.dispatch(tr);
}

function selectClickedLeaf(view, inside) {
  if (inside == -1) { return false }
  var $pos = view.state.doc.resolve(inside), node = $pos.nodeAfter;
  if (node && node.isAtom && prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(node)) {
    updateSelection(view, new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"]($pos), "pointer");
    return true
  }
  return false
}

function selectClickedNode(view, inside) {
  if (inside == -1) { return false }
  var sel = view.state.selection, selectedNode, selectAt;
  if (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"]) { selectedNode = sel.node; }

  var $pos = view.state.doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    if (prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(node)) {
      if (selectedNode && sel.$from.depth > 0 &&
          i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos)
        { selectAt = $pos.before(sel.$from.depth); }
      else
        { selectAt = $pos.before(i); }
      break
    }
  }

  if (selectAt != null) {
    updateSelection(view, prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].create(view.state.doc, selectAt), "pointer");
    return true
  } else {
    return false
  }
}

function handleSingleClick(view, pos, inside, event, selectNode) {
  return runHandlerOnContext(view, "handleClickOn", pos, inside, event) ||
    view.someProp("handleClick", function (f) { return f(view, pos, event); }) ||
    (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside))
}

function handleDoubleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) ||
    view.someProp("handleDoubleClick", function (f) { return f(view, pos, event); })
}

function handleTripleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) ||
    view.someProp("handleTripleClick", function (f) { return f(view, pos, event); }) ||
    defaultTripleClick(view, inside)
}

function defaultTripleClick(view, inside) {
  var doc = view.state.doc;
  if (inside == -1) {
    if (doc.inlineContent) {
      updateSelection(view, prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"].create(doc, 0, doc.content.size), "pointer");
      return true
    }
    return false
  }

  var $pos = doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    var nodePos = $pos.before(i);
    if (node.inlineContent)
      { updateSelection(view, prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"].create(doc, nodePos + 1, nodePos + 1 + node.content.size), "pointer"); }
    else if (prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(node))
      { updateSelection(view, prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].create(doc, nodePos), "pointer"); }
    else
      { continue }
    return true
  }
}

function forceDOMFlush(view) {
  return endComposition(view)
}

var selectNodeModifier = result.mac ? "metaKey" : "ctrlKey";

handlers.mousedown = function (view, event) {
  view.shiftKey = event.shiftKey;
  var flushed = forceDOMFlush(view);
  var now = Date.now(), type = "singleClick";
  if (now - view.lastClick.time < 500 && isNear(event, view.lastClick) && !event[selectNodeModifier]) {
    if (view.lastClick.type == "singleClick") { type = "doubleClick"; }
    else if (view.lastClick.type == "doubleClick") { type = "tripleClick"; }
  }
  view.lastClick = {time: now, x: event.clientX, y: event.clientY, type: type};

  var pos = view.posAtCoords(eventCoords(event));
  if (!pos) { return }

  if (type == "singleClick")
    { view.mouseDown = new MouseDown(view, pos, event, flushed); }
  else if ((type == "doubleClick" ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event))
    { event.preventDefault(); }
  else
    { setSelectionOrigin(view, "pointer"); }
};

var MouseDown = function MouseDown(view, pos, event, flushed) {
  var this$1 = this;

  this.view = view;
  this.startDoc = view.state.doc;
  this.pos = pos;
  this.event = event;
  this.flushed = flushed;
  this.selectNode = event[selectNodeModifier];
  this.allowDefault = event.shiftKey;

  var targetNode, targetPos;
  if (pos.inside > -1) {
    targetNode = view.state.doc.nodeAt(pos.inside);
    targetPos = pos.inside;
  } else {
    var $pos = view.state.doc.resolve(pos.pos);
    targetNode = $pos.parent;
    targetPos = $pos.depth ? $pos.before() : 0;
  }

  this.mightDrag = null;

  var target = flushed ? null : event.target;
  var targetDesc = target ? view.docView.nearestDesc(target, true) : null;
  this.target = targetDesc ? targetDesc.dom : null;

  if (targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false ||
      view.state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"] && targetPos == view.state.selection.from)
    { this.mightDrag = {node: targetNode,
                      pos: targetPos,
                      addAttr: this.target && !this.target.draggable,
                      setUneditable: this.target && result.gecko && !this.target.hasAttribute("contentEditable")}; }

  if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
    this.view.domObserver.stop();
    if (this.mightDrag.addAttr) { this.target.draggable = true; }
    if (this.mightDrag.setUneditable)
      { setTimeout(function () { return this$1.target.setAttribute("contentEditable", "false"); }, 20); }
    this.view.domObserver.start();
  }

  view.root.addEventListener("mouseup", this.up = this.up.bind(this));
  view.root.addEventListener("mousemove", this.move = this.move.bind(this));
  setSelectionOrigin(view, "pointer");
};

MouseDown.prototype.done = function done () {
  this.view.root.removeEventListener("mouseup", this.up);
  this.view.root.removeEventListener("mousemove", this.move);
  if (this.mightDrag && this.target) {
    this.view.domObserver.stop();
    if (this.mightDrag.addAttr) { this.target.removeAttribute("draggable"); }
    if (this.mightDrag.setUneditable) { this.target.removeAttribute("contentEditable"); }
    this.view.domObserver.start();
  }
  this.view.mouseDown = null;
};

MouseDown.prototype.up = function up (event) {
  this.done();

  if (!this.view.dom.contains(event.target.nodeType == 3 ? event.target.parentNode : event.target))
    { return }

  var pos = this.pos;
  if (this.view.state.doc != this.startDoc) { pos = this.view.posAtCoords(eventCoords(event)); }

  if (this.allowDefault || !pos) {
    setSelectionOrigin(this.view, "pointer");
  } else if (handleSingleClick(this.view, pos.pos, pos.inside, event, this.selectNode)) {
    event.preventDefault();
  } else if (this.flushed ||
             // Safari ignores clicks on draggable elements
             (result.safari && this.mightDrag && !this.mightDrag.node.isAtom) ||
             // Chrome will sometimes treat a node selection as a
             // cursor, but still report that the node is selected
             // when asked through getSelection. You'll then get a
             // situation where clicking at the point where that
             // (hidden) cursor is doesn't change the selection, and
             // thus doesn't get a reaction from ProseMirror. This
             // works around that.
             (result.chrome && !(this.view.state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* TextSelection */ "g"]) &&
              (pos.pos == this.view.state.selection.from || pos.pos == this.view.state.selection.to))) {
    updateSelection(this.view, prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* Selection */ "f"].near(this.view.state.doc.resolve(pos.pos)), "pointer");
    event.preventDefault();
  } else {
    setSelectionOrigin(this.view, "pointer");
  }
};

MouseDown.prototype.move = function move (event) {
  if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 ||
                             Math.abs(this.event.y - event.clientY) > 4))
    { this.allowDefault = true; }
  setSelectionOrigin(this.view, "pointer");
};

handlers.touchdown = function (view) {
  forceDOMFlush(view);
  setSelectionOrigin(view, "pointer");
};

handlers.contextmenu = function (view) { return forceDOMFlush(view); };

function inOrNearComposition(view, event) {
  if (view.composing) { return true }
  // See https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/.
  // On Japanese input method editors (IMEs), the Enter key is used to confirm character
  // selection. On Safari, when Enter is pressed, compositionend and keydown events are
  // emitted. The keydown event triggers newline insertion, which we don't want.
  // This method returns true if the keydown event should be ignored.
  // We only ignore it once, as pressing Enter a second time *should* insert a newline.
  // Furthermore, the keydown event timestamp must be close to the compositionEndedAt timestamp.
  // This guards against the case where compositionend is triggered without the keyboard
  // (e.g. character confirmation may be done with the mouse), and keydown is triggered
  // afterwards- we wouldn't want to ignore the keydown event in this case.
  if (result.safari && Math.abs(event.timeStamp - view.compositionEndedAt) < 500) {
    view.compositionEndedAt = -2e8;
    return true
  }
  return false
}

// Drop active composition after 5 seconds of inactivity on Android
var timeoutComposition = result.android ? 5000 : -1;

editHandlers.compositionstart = editHandlers.compositionupdate = function (view) {
  if (!view.composing) {
    view.domObserver.flush();
    var state = view.state;
    var $pos = state.selection.$from;
    if (state.selection.empty &&
        (state.storedMarks ||
         (!$pos.textOffset && $pos.parentOffset && $pos.nodeBefore.marks.some(function (m) { return m.type.spec.inclusive === false; })))) {
      // Need to wrap the cursor in mark nodes different from the ones in the DOM context
      view.markCursor = view.state.storedMarks || $pos.marks();
      endComposition(view, true);
      view.markCursor = null;
    } else {
      endComposition(view);
      // In firefox, if the cursor is after but outside a marked node,
      // the inserted text won't inherit the marks. So this moves it
      // inside if necessary.
      if (result.gecko && state.selection.empty && $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.length) {
        var sel = view.root.getSelection();
        for (var node = sel.focusNode, offset = sel.focusOffset; node && node.nodeType == 1 && offset != 0;) {
          var before = offset < 0 ? node.lastChild : node.childNodes[offset - 1];
          if (!before) { break }
          if (before.nodeType == 3) {
            sel.collapse(before, before.nodeValue.length);
            break
          } else {
            node = before;
            offset = -1;
          }
        }
      }
    }
    view.composing = true;
  }
  scheduleComposeEnd(view, timeoutComposition);
};

editHandlers.compositionend = function (view, event) {
  if (view.composing) {
    view.composing = false;
    view.compositionEndedAt = event.timeStamp;
    scheduleComposeEnd(view, 20);
  }
};

function scheduleComposeEnd(view, delay) {
  clearTimeout(view.composingTimeout);
  if (delay > -1) { view.composingTimeout = setTimeout(function () { return endComposition(view); }, delay); }
}

function clearComposition(view) {
  view.composing = false;
  while (view.compositionNodes.length > 0) { view.compositionNodes.pop().markParentsDirty(); }
}

function endComposition(view, forceUpdate) {
  view.domObserver.forceFlush();
  clearComposition(view);
  if (forceUpdate || view.docView.dirty) {
    var sel = selectionFromDOM(view);
    if (sel && !sel.eq(view.state.selection)) { view.dispatch(view.state.tr.setSelection(sel)); }
    else { view.updateState(view.state); }
    return true
  }
  return false
}

function captureCopy(view, dom) {
  // The extra wrapper is somehow necessary on IE/Edge to prevent the
  // content from being mangled when it is put onto the clipboard
  if (!view.dom.parentNode) { return }
  var wrap = view.dom.parentNode.appendChild(document.createElement("div"));
  wrap.appendChild(dom);
  wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
  var sel = getSelection(), range = document.createRange();
  range.selectNodeContents(dom);
  // Done because IE will fire a selectionchange moving the selection
  // to its start when removeAllRanges is called and the editor still
  // has focus (which will mess up the editor's selection state).
  view.dom.blur();
  sel.removeAllRanges();
  sel.addRange(range);
  setTimeout(function () {
    if (wrap.parentNode) { wrap.parentNode.removeChild(wrap); }
    view.focus();
  }, 50);
}

// This is very crude, but unfortunately both these browsers _pretend_
// that they have a clipboard API—all the objects and methods are
// there, they just don't work, and they are hard to test.
var brokenClipboardAPI = (result.ie && result.ie_version < 15) ||
      (result.ios && result.webkit_version < 604);

handlers.copy = editHandlers.cut = function (view, e) {
  var sel = view.state.selection, cut = e.type == "cut";
  if (sel.empty) { return }

  // IE and Edge's clipboard interface is completely broken
  var data = brokenClipboardAPI ? null : e.clipboardData;
  var slice = sel.content();
  var ref = serializeForClipboard(view, slice);
  var dom = ref.dom;
  var text = ref.text;
  if (data) {
    e.preventDefault();
    data.clearData();
    data.setData("text/html", dom.innerHTML);
    data.setData("text/plain", text);
  } else {
    captureCopy(view, dom);
  }
  if (cut) { view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut")); }
};

function sliceSingleNode(slice) {
  return slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 ? slice.content.firstChild : null
}

function capturePaste(view, e) {
  if (!view.dom.parentNode) { return }
  var plainText = view.shiftKey || view.state.selection.$from.parent.type.spec.code;
  var target = view.dom.parentNode.appendChild(document.createElement(plainText ? "textarea" : "div"));
  if (!plainText) { target.contentEditable = "true"; }
  target.style.cssText = "position: fixed; left: -10000px; top: 10px";
  target.focus();
  setTimeout(function () {
    view.focus();
    if (target.parentNode) { target.parentNode.removeChild(target); }
    if (plainText) { doPaste(view, target.value, null, e); }
    else { doPaste(view, target.textContent, target.innerHTML, e); }
  }, 50);
}

function doPaste(view, text, html, e) {
  var slice = parseFromClipboard(view, text, html, view.shiftKey, view.state.selection.$from);
  if (view.someProp("handlePaste", function (f) { return f(view, e, slice || prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"].empty); })) { return true }
  if (!slice) { return false }

  var singleNode = sliceSingleNode(slice);
  var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, view.shiftKey) : view.state.tr.replaceSelection(slice);
  view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"));
  return true
}

editHandlers.paste = function (view, e) {
  var data = brokenClipboardAPI ? null : e.clipboardData;
  if (data && doPaste(view, data.getData("text/plain"), data.getData("text/html"), e)) { e.preventDefault(); }
  else { capturePaste(view, e); }
};

var Dragging = function Dragging(slice, move) {
  this.slice = slice;
  this.move = move;
};

var dragCopyModifier = result.mac ? "altKey" : "ctrlKey";

handlers.dragstart = function (view, e) {
  var mouseDown = view.mouseDown;
  if (mouseDown) { mouseDown.done(); }
  if (!e.dataTransfer) { return }

  var sel = view.state.selection;
  var pos = sel.empty ? null : view.posAtCoords(eventCoords(e));
  if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"] ? sel.to - 1: sel.to)) ; else if (mouseDown && mouseDown.mightDrag) {
    view.dispatch(view.state.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].create(view.state.doc, mouseDown.mightDrag.pos)));
  } else if (e.target && e.target.nodeType == 1) {
    var desc = view.docView.nearestDesc(e.target, true);
    if (!desc || !desc.node.type.spec.draggable || desc == view.docView) { return }
    view.dispatch(view.state.tr.setSelection(prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].create(view.state.doc, desc.posBefore)));
  }
  var slice = view.state.selection.content();
  var ref = serializeForClipboard(view, slice);
  var dom = ref.dom;
  var text = ref.text;
  e.dataTransfer.clearData();
  e.dataTransfer.setData(brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
  if (!brokenClipboardAPI) { e.dataTransfer.setData("text/plain", text); }
  view.dragging = new Dragging(slice, !e[dragCopyModifier]);
};

handlers.dragend = function (view) {
  var dragging = view.dragging;
  window.setTimeout(function () {
    if (view.dragging == dragging)  { view.dragging = null; }
  }, 50);
};

editHandlers.dragover = editHandlers.dragenter = function (_, e) { return e.preventDefault(); };

editHandlers.drop = function (view, e) {
  var dragging = view.dragging;
  view.dragging = null;

  if (!e.dataTransfer) { return }

  var eventPos = view.posAtCoords(eventCoords(e));
  if (!eventPos) { return }
  var $mouse = view.state.doc.resolve(eventPos.pos);
  if (!$mouse) { return }
  var slice = dragging && dragging.slice ||
      parseFromClipboard(view, e.dataTransfer.getData(brokenClipboardAPI ? "Text" : "text/plain"),
                         brokenClipboardAPI ? null : e.dataTransfer.getData("text/html"), false, $mouse);
  var move = dragging && !e[dragCopyModifier];
  if (view.someProp("handleDrop", function (f) { return f(view, e, slice || prosemirror_model__WEBPACK_IMPORTED_MODULE_1__[/* Slice */ "j"].empty, move); })) {
    e.preventDefault();
    return
  }
  if (!slice) { return }

  e.preventDefault();
  var insertPos = slice ? Object(prosemirror_transform__WEBPACK_IMPORTED_MODULE_2__[/* dropPoint */ "h"])(view.state.doc, $mouse.pos, slice) : $mouse.pos;
  if (insertPos == null) { insertPos = $mouse.pos; }

  var tr = view.state.tr;
  if (move) { tr.deleteSelection(); }

  var pos = tr.mapping.map(insertPos);
  var isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
  var beforeInsert = tr.doc;
  if (isNode)
    { tr.replaceRangeWith(pos, pos, slice.content.firstChild); }
  else
    { tr.replaceRange(pos, pos, slice); }
  if (tr.doc.eq(beforeInsert)) { return }

  var $pos = tr.doc.resolve(pos);
  if (isNode && prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"].isSelectable(slice.content.firstChild) &&
      $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) {
    tr.setSelection(new prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"]($pos));
  } else {
    var end = tr.mapping.map(insertPos);
    tr.mapping.maps[tr.mapping.maps.length - 1].forEach(function (_from, _to, _newFrom, newTo) { return end = newTo; });
    tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end)));
  }
  view.focus();
  view.dispatch(tr.setMeta("uiEvent", "drop"));
};

handlers.focus = function (view) {
  if (!view.focused) {
    view.domObserver.stop();
    view.dom.classList.add("ProseMirror-focused");
    view.domObserver.start();
    view.focused = true;
    setTimeout(function () {
      if (view.docView && view.hasFocus() && !view.domObserver.currentSelection.eq(view.root.getSelection()))
        { selectionToDOM(view); }
    }, 20);
  }
};

handlers.blur = function (view) {
  if (view.focused) {
    view.domObserver.stop();
    view.dom.classList.remove("ProseMirror-focused");
    view.domObserver.start();
    view.domObserver.currentSelection.set({});
    view.focused = false;
  }
};

handlers.beforeinput = function (view, event) {
  // We should probably do more with beforeinput events, but support
  // is so spotty that I'm still waiting to see where they are going.

  // Very specific hack to deal with backspace sometimes failing on
  // Chrome Android when after an uneditable node.
  if (result.chrome && result.android && event.inputType == "deleteContentBackward") {
    var domChangeCount = view.domChangeCount;
    setTimeout(function () {
      if (view.domChangeCount != domChangeCount) { return } // Event already had some effect
      // This bug tends to close the virtual keyboard, so we refocus
      view.dom.blur();
      view.focus();
      if (view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(8, "Backspace")); })) { return }
      var ref = view.state.selection;
      var $cursor = ref.$cursor;
      // Crude approximation of backspace behavior when no command handled it
      if ($cursor && $cursor.pos > 0) { view.dispatch(view.state.tr.delete($cursor.pos - 1, $cursor.pos).scrollIntoView()); }
    }, 50);
  }
};

// Make sure all handlers get registered
for (var prop in editHandlers) { handlers[prop] = editHandlers[prop]; }

function compareObjs(a, b) {
  if (a == b) { return true }
  for (var p in a) { if (a[p] !== b[p]) { return false } }
  for (var p$1 in b) { if (!(p$1 in a)) { return false } }
  return true
}

var WidgetType = function WidgetType(toDOM, spec) {
  this.spec = spec || noSpec;
  this.side = this.spec.side || 0;
  this.toDOM = toDOM;
};

WidgetType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var ref = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1);
    var pos = ref.pos;
    var deleted = ref.deleted;
  return deleted ? null : new Decoration(pos - offset, pos - offset, this)
};

WidgetType.prototype.valid = function valid () { return true };

WidgetType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof WidgetType &&
     (this.spec.key && this.spec.key == other.spec.key ||
      this.toDOM == other.toDOM && compareObjs(this.spec, other.spec)))
};

var InlineType = function InlineType(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};

InlineType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset;
  var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset;
  return from >= to ? null : new Decoration(from, to, this)
};

InlineType.prototype.valid = function valid (_, span) { return span.from < span.to };

InlineType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof InlineType && compareObjs(this.attrs, other.attrs) &&
     compareObjs(this.spec, other.spec))
};

InlineType.is = function is (span) { return span.type instanceof InlineType };

var NodeType = function NodeType(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};

NodeType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var from = mapping.mapResult(span.from + oldOffset, 1);
  if (from.deleted) { return null }
  var to = mapping.mapResult(span.to + oldOffset, -1);
  if (to.deleted || to.pos <= from.pos) { return null }
  return new Decoration(from.pos - offset, to.pos - offset, this)
};

NodeType.prototype.valid = function valid (node, span) {
  var ref = node.content.findIndex(span.from);
    var index = ref.index;
    var offset = ref.offset;
  return offset == span.from && offset + node.child(index).nodeSize == span.to
};

NodeType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof NodeType && compareObjs(this.attrs, other.attrs) &&
     compareObjs(this.spec, other.spec))
};

// ::- Decoration objects can be provided to the view through the
// [`decorations` prop](#view.EditorProps.decorations). They come in
// several variants—see the static members of this class for details.
var Decoration = function Decoration(from, to, type) {
  // :: number
  // The start position of the decoration.
  this.from = from;
  // :: number
  // The end position. Will be the same as `from` for [widget
  // decorations](#view.Decoration^widget).
  this.to = to;
  this.type = type;
};

var prototypeAccessors$1 = { spec: { configurable: true },inline: { configurable: true } };

Decoration.prototype.copy = function copy (from, to) {
  return new Decoration(from, to, this.type)
};

Decoration.prototype.eq = function eq (other, offset) {
    if ( offset === void 0 ) offset = 0;

  return this.type.eq(other.type) && this.from + offset == other.from && this.to + offset == other.to
};

Decoration.prototype.map = function map (mapping, offset, oldOffset) {
  return this.type.map(mapping, this, offset, oldOffset)
};

// :: (number, union<(view: EditorView, getPos: () → number) → dom.Node, dom.Node>, ?Object) → Decoration
// Creates a widget decoration, which is a DOM node that's shown in
// the document at the given position. It is recommended that you
// delay rendering the widget by passing a function that will be
// called when the widget is actually drawn in a view, but you can
// also directly pass a DOM node. `getPos` can be used to find the
// widget's current document position.
//
// spec::- These options are supported:
//
//   side:: ?number
//   Controls which side of the document position this widget is
//   associated with. When negative, it is drawn before a cursor
//   at its position, and content inserted at that position ends
//   up after the widget. When zero (the default) or positive, the
//   widget is drawn after the cursor and content inserted there
//   ends up before the widget.
//
//   When there are multiple widgets at a given position, their
//   `side` values determine the order in which they appear. Those
//   with lower values appear first. The ordering of widgets with
//   the same `side` value is unspecified.
//
//   When `marks` is null, `side` also determines the marks that
//   the widget is wrapped in—those of the node before when
//   negative, those of the node after when positive.
//
//   marks:: ?[Mark]
//   The precise set of marks to draw around the widget.
//
//   stopEvent:: ?(event: dom.Event) → bool
//   Can be used to control which DOM events, when they bubble out
//   of this widget, the editor view should ignore.
//
//   ignoreSelection:: ?bool
//   When set (defaults to false), selection changes inside the
//   widget are ignored, and don't cause ProseMirror to try and
//   re-sync the selection with its selection state.
//
//   key:: ?string
//   When comparing decorations of this type (in order to decide
//   whether it needs to be redrawn), ProseMirror will by default
//   compare the widget DOM node by identity. If you pass a key,
//   that key will be compared instead, which can be useful when
//   you generate decorations on the fly and don't want to store
//   and reuse DOM nodes. Make sure that any widgets with the same
//   key are interchangeable—if widgets differ in, for example,
//   the behavior of some event handler, they should get
//   different keys.
Decoration.widget = function widget (pos, toDOM, spec) {
  return new Decoration(pos, pos, new WidgetType(toDOM, spec))
};

// :: (number, number, DecorationAttrs, ?Object) → Decoration
// Creates an inline decoration, which adds the given attributes to
// each inline node between `from` and `to`.
//
// spec::- These options are recognized:
//
//   inclusiveStart:: ?bool
//   Determines how the left side of the decoration is
//   [mapped](#transform.Position_Mapping) when content is
//   inserted directly at that position. By default, the decoration
//   won't include the new content, but you can set this to `true`
//   to make it inclusive.
//
//   inclusiveEnd:: ?bool
//   Determines how the right side of the decoration is mapped.
//   See
//   [`inclusiveStart`](#view.Decoration^inline^spec.inclusiveStart).
Decoration.inline = function inline (from, to, attrs, spec) {
  return new Decoration(from, to, new InlineType(attrs, spec))
};

// :: (number, number, DecorationAttrs, ?Object) → Decoration
// Creates a node decoration. `from` and `to` should point precisely
// before and after a node in the document. That node, and only that
// node, will receive the given attributes.
//
// spec::-
//
// Optional information to store with the decoration. It
// is also used when comparing decorators for equality.
Decoration.node = function node (from, to, attrs, spec) {
  return new Decoration(from, to, new NodeType(attrs, spec))
};

// :: Object
// The spec provided when creating this decoration. Can be useful
// if you've stored extra information in that object.
prototypeAccessors$1.spec.get = function () { return this.type.spec };

prototypeAccessors$1.inline.get = function () { return this.type instanceof InlineType };

Object.defineProperties( Decoration.prototype, prototypeAccessors$1 );

// DecorationAttrs:: interface
// A set of attributes to add to a decorated node. Most properties
// simply directly correspond to DOM attributes of the same name,
// which will be set to the property's value. These are exceptions:
//
//   class:: ?string
//   A CSS class name or a space-separated set of class names to be
//   _added_ to the classes that the node already had.
//
//   style:: ?string
//   A string of CSS to be _added_ to the node's existing `style` property.
//
//   nodeName:: ?string
//   When non-null, the target node is wrapped in a DOM element of
//   this type (and the other attributes are applied to this element).

var none = [], noSpec = {};

// :: class extends DecorationSource
// A collection of [decorations](#view.Decoration), organized in
// such a way that the drawing algorithm can efficiently use and
// compare them. This is a persistent data structure—it is not
// modified, updates create a new value.
var DecorationSet = function DecorationSet(local, children) {
  this.local = local && local.length ? local : none;
  this.children = children && children.length ? children : none;
};

// :: (Node, [Decoration]) → DecorationSet
// Create a set of decorations, using the structure of the given
// document.
DecorationSet.create = function create (doc, decorations) {
  return decorations.length ? buildTree(decorations, doc, 0, noSpec) : empty
};

// :: (?number, ?number, ?(spec: Object) → bool) → [Decoration]
// Find all decorations in this set which touch the given range
// (including decorations that start or end directly at the
// boundaries) and match the given predicate on their spec. When
// `start` and `end` are omitted, all decorations in the set are
// considered. When `predicate` isn't given, all decorations are
// assumed to match.
DecorationSet.prototype.find = function find (start, end, predicate) {
  var result = [];
  this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate);
  return result
};

DecorationSet.prototype.findInner = function findInner (start, end, result, offset, predicate) {
  for (var i = 0; i < this.local.length; i++) {
    var span = this.local[i];
    if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec)))
      { result.push(span.copy(span.from + offset, span.to + offset)); }
  }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
    if (this.children[i$1] < end && this.children[i$1 + 1] > start) {
      var childOff = this.children[i$1] + 1;
      this.children[i$1 + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate);
    }
  }
};

// :: (Mapping, Node, ?Object) → DecorationSet
// Map the set of decorations in response to a change in the
// document.
//
// options::- An optional set of options.
//
//   onRemove:: ?(decorationSpec: Object)
//   When given, this function will be called for each decoration
//   that gets dropped as a result of the mapping, passing the
//   spec of that decoration.
DecorationSet.prototype.map = function map (mapping, doc, options) {
  if (this == empty || mapping.maps.length == 0) { return this }
  return this.mapInner(mapping, doc, 0, 0, options || noSpec)
};

DecorationSet.prototype.mapInner = function mapInner (mapping, node, offset, oldOffset, options) {
  var newLocal;
  for (var i = 0; i < this.local.length; i++) {
    var mapped = this.local[i].map(mapping, offset, oldOffset);
    if (mapped && mapped.type.valid(node, mapped)) { (newLocal || (newLocal = [])).push(mapped); }
    else if (options.onRemove) { options.onRemove(this.local[i].spec); }
  }

  if (this.children.length)
    { return mapChildren(this.children, newLocal, mapping, node, offset, oldOffset, options) }
  else
    { return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty }
};

// :: (Node, [Decoration]) → DecorationSet
// Add the given array of decorations to the ones in the set,
// producing a new set. Needs access to the current document to
// create the appropriate tree structure.
DecorationSet.prototype.add = function add (doc, decorations) {
  if (!decorations.length) { return this }
  if (this == empty) { return DecorationSet.create(doc, decorations) }
  return this.addInner(doc, decorations, 0)
};

DecorationSet.prototype.addInner = function addInner (doc, decorations, offset) {
    var this$1 = this;

  var children, childIndex = 0;
  doc.forEach(function (childNode, childOffset) {
    var baseOffset = childOffset + offset, found;
    if (!(found = takeSpansForNode(decorations, childNode, baseOffset))) { return }

    if (!children) { children = this$1.children.slice(); }
    while (childIndex < children.length && children[childIndex] < childOffset) { childIndex += 3; }
    if (children[childIndex] == childOffset)
      { children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1); }
    else
      { children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found, childNode, baseOffset + 1, noSpec)); }
    childIndex += 3;
  });

  var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset);
  for (var i = 0; i < local.length; i++) { if (!local[i].type.valid(doc, local[i])) { local.splice(i--, 1); } }

  return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local,
                           children || this.children)
};

// :: ([Decoration]) → DecorationSet
// Create a new set that contains the decorations in this set, minus
// the ones in the given array.
DecorationSet.prototype.remove = function remove (decorations) {
  if (decorations.length == 0 || this == empty) { return this }
  return this.removeInner(decorations, 0)
};

DecorationSet.prototype.removeInner = function removeInner (decorations, offset) {
  var children = this.children, local = this.local;
  for (var i = 0; i < children.length; i += 3) {
    var found = (void 0), from = children[i] + offset, to = children[i + 1] + offset;
    for (var j = 0, span = (void 0); j < decorations.length; j++) { if (span = decorations[j]) {
      if (span.from > from && span.to < to) {
        decorations[j] = null
        ;(found || (found = [])).push(span);
      }
    } }
    if (!found) { continue }
    if (children == this.children) { children = this.children.slice(); }
    var removed = children[i + 2].removeInner(found, from + 1);
    if (removed != empty) {
      children[i + 2] = removed;
    } else {
      children.splice(i, 3);
      i -= 3;
    }
  }
  if (local.length) { for (var i$1 = 0, span$1 = (void 0); i$1 < decorations.length; i$1++) { if (span$1 = decorations[i$1]) {
    for (var j$1 = 0; j$1 < local.length; j$1++) { if (local[j$1].eq(span$1, offset)) {
      if (local == this.local) { local = this.local.slice(); }
      local.splice(j$1--, 1);
    } }
  } } }
  if (children == this.children && local == this.local) { return this }
  return local.length || children.length ? new DecorationSet(local, children) : empty
};

DecorationSet.prototype.forChild = function forChild (offset, node) {
  if (this == empty) { return this }
  if (node.isLeaf) { return DecorationSet.empty }

  var child, local;
  for (var i = 0; i < this.children.length; i += 3) { if (this.children[i] >= offset) {
    if (this.children[i] == offset) { child = this.children[i + 2]; }
    break
  } }
  var start = offset + 1, end = start + node.content.size;
  for (var i$1 = 0; i$1 < this.local.length; i$1++) {
    var dec = this.local[i$1];
    if (dec.from < end && dec.to > start && (dec.type instanceof InlineType)) {
      var from = Math.max(start, dec.from) - start, to = Math.min(end, dec.to) - start;
      if (from < to) { (local || (local = [])).push(dec.copy(from, to)); }
    }
  }
  if (local) {
    var localSet = new DecorationSet(local.sort(byPos));
    return child ? new DecorationGroup([localSet, child]) : localSet
  }
  return child || empty
};

DecorationSet.prototype.eq = function eq (other) {
  if (this == other) { return true }
  if (!(other instanceof DecorationSet) ||
      this.local.length != other.local.length ||
      this.children.length != other.children.length) { return false }
  for (var i = 0; i < this.local.length; i++)
    { if (!this.local[i].eq(other.local[i])) { return false } }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3)
    { if (this.children[i$1] != other.children[i$1] ||
        this.children[i$1 + 1] != other.children[i$1 + 1] ||
        !this.children[i$1 + 2].eq(other.children[i$1 + 2])) { return false } }
  return true
};

DecorationSet.prototype.locals = function locals (node) {
  return removeOverlap(this.localsInner(node))
};

DecorationSet.prototype.localsInner = function localsInner (node) {
  if (this == empty) { return none }
  if (node.inlineContent || !this.local.some(InlineType.is)) { return this.local }
  var result = [];
  for (var i = 0; i < this.local.length; i++) {
    if (!(this.local[i].type instanceof InlineType))
      { result.push(this.local[i]); }
  }
  return result
};

// DecorationSource:: interface
// An object that can [provide](#view.EditorProps.decorations)
// decorations. Implemented by [`DecorationSet`](#view.DecorationSet),
// and passed to [node views](#view.EditorProps.nodeViews).

var empty = new DecorationSet();

// :: DecorationSet
// The empty set of decorations.
DecorationSet.empty = empty;

DecorationSet.removeOverlap = removeOverlap;

// :- An abstraction that allows the code dealing with decorations to
// treat multiple DecorationSet objects as if it were a single object
// with (a subset of) the same interface.
var DecorationGroup = function DecorationGroup(members) {
  this.members = members;
};

DecorationGroup.prototype.forChild = function forChild (offset, child) {
  if (child.isLeaf) { return DecorationSet.empty }
  var found = [];
  for (var i = 0; i < this.members.length; i++) {
    var result = this.members[i].forChild(offset, child);
    if (result == empty) { continue }
    if (result instanceof DecorationGroup) { found = found.concat(result.members); }
    else { found.push(result); }
  }
  return DecorationGroup.from(found)
};

DecorationGroup.prototype.eq = function eq (other) {
  if (!(other instanceof DecorationGroup) ||
      other.members.length != this.members.length) { return false }
  for (var i = 0; i < this.members.length; i++)
    { if (!this.members[i].eq(other.members[i])) { return false } }
  return true
};

DecorationGroup.prototype.locals = function locals (node) {
  var result, sorted = true;
  for (var i = 0; i < this.members.length; i++) {
    var locals = this.members[i].localsInner(node);
    if (!locals.length) { continue }
    if (!result) {
      result = locals;
    } else {
      if (sorted) {
        result = result.slice();
        sorted = false;
      }
      for (var j = 0; j < locals.length; j++) { result.push(locals[j]); }
    }
  }
  return result ? removeOverlap(sorted ? result : result.sort(byPos)) : none
};

// : ([DecorationSet]) → union<DecorationSet, DecorationGroup>
// Create a group for the given array of decoration sets, or return
// a single set when possible.
DecorationGroup.from = function from (members) {
  switch (members.length) {
    case 0: return empty
    case 1: return members[0]
    default: return new DecorationGroup(members)
  }
};

function mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
  var children = oldChildren.slice();

  // Mark the children that are directly touched by changes, and
  // move those that are after the changes.
  var shift = function (oldStart, oldEnd, newStart, newEnd) {
    for (var i = 0; i < children.length; i += 3) {
      var end = children[i + 1], dSize = (void 0);
      if (end == -1 || oldStart > end + oldOffset) { continue }
      if (oldEnd >= children[i] + oldOffset) {
        children[i + 1] = -1;
      } else if (newStart >= offset && (dSize = (newEnd - newStart) - (oldEnd - oldStart))) {
        children[i] += dSize;
        children[i + 1] += dSize;
      }
    }
  };
  for (var i = 0; i < mapping.maps.length; i++) { mapping.maps[i].forEach(shift); }

  // Find the child nodes that still correspond to a single node,
  // recursively call mapInner on them and update their positions.
  var mustRebuild = false;
  for (var i$1 = 0; i$1 < children.length; i$1 += 3) { if (children[i$1 + 1] == -1) { // Touched nodes
    var from = mapping.map(oldChildren[i$1] + oldOffset), fromLocal = from - offset;
    if (fromLocal < 0 || fromLocal >= node.content.size) {
      mustRebuild = true;
      continue
    }
    // Must read oldChildren because children was tagged with -1
    var to = mapping.map(oldChildren[i$1 + 1] + oldOffset, -1), toLocal = to - offset;
    var ref = node.content.findIndex(fromLocal);
    var index = ref.index;
    var childOffset = ref.offset;
    var childNode = node.maybeChild(index);
    if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
      var mapped = children[i$1 + 2].mapInner(mapping, childNode, from + 1, oldChildren[i$1] + oldOffset + 1, options);
      if (mapped != empty) {
        children[i$1] = fromLocal;
        children[i$1 + 1] = toLocal;
        children[i$1 + 2] = mapped;
      } else {
        children[i$1 + 1] = -2;
        mustRebuild = true;
      }
    } else {
      mustRebuild = true;
    }
  } }

  // Remaining children must be collected and rebuilt into the appropriate structure
  if (mustRebuild) {
    var decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal || [], mapping,
                                                       offset, oldOffset, options);
    var built = buildTree(decorations, node, 0, options);
    newLocal = built.local;
    for (var i$2 = 0; i$2 < children.length; i$2 += 3) { if (children[i$2 + 1] < 0) {
      children.splice(i$2, 3);
      i$2 -= 3;
    } }
    for (var i$3 = 0, j = 0; i$3 < built.children.length; i$3 += 3) {
      var from$1 = built.children[i$3];
      while (j < children.length && children[j] < from$1) { j += 3; }
      children.splice(j, 0, built.children[i$3], built.children[i$3 + 1], built.children[i$3 + 2]);
    }
  }

  return new DecorationSet(newLocal && newLocal.sort(byPos), children)
}

function moveSpans(spans, offset) {
  if (!offset || !spans.length) { return spans }
  var result = [];
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    result.push(new Decoration(span.from + offset, span.to + offset, span.type));
  }
  return result
}

function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset, oldOffset, options) {
  // Gather all decorations from the remaining marked children
  function gather(set, oldOffset) {
    for (var i = 0; i < set.local.length; i++) {
      var mapped = set.local[i].map(mapping, offset, oldOffset);
      if (mapped) { decorations.push(mapped); }
      else if (options.onRemove) { options.onRemove(set.local[i].spec); }
    }
    for (var i$1 = 0; i$1 < set.children.length; i$1 += 3)
      { gather(set.children[i$1 + 2], set.children[i$1] + oldOffset + 1); }
  }
  for (var i = 0; i < children.length; i += 3) { if (children[i + 1] == -1)
    { gather(children[i + 2], oldChildren[i] + oldOffset + 1); } }

  return decorations
}

function takeSpansForNode(spans, node, offset) {
  if (node.isLeaf) { return null }
  var end = offset + node.nodeSize, found = null;
  for (var i = 0, span = (void 0); i < spans.length; i++) {
    if ((span = spans[i]) && span.from > offset && span.to < end) {
(found || (found = [])).push(span);
      spans[i] = null;
    }
  }
  return found
}

function withoutNulls(array) {
  var result = [];
  for (var i = 0; i < array.length; i++)
    { if (array[i] != null) { result.push(array[i]); } }
  return result
}

// : ([Decoration], Node, number) → DecorationSet
// Build up a tree that corresponds to a set of decorations. `offset`
// is a base offset that should be subtractet from the `from` and `to`
// positions in the spans (so that we don't have to allocate new spans
// for recursive calls).
function buildTree(spans, node, offset, options) {
  var children = [], hasNulls = false;
  node.forEach(function (childNode, localStart) {
    var found = takeSpansForNode(spans, childNode, localStart + offset);
    if (found) {
      hasNulls = true;
      var subtree = buildTree(found, childNode, offset + localStart + 1, options);
      if (subtree != empty)
        { children.push(localStart, localStart + childNode.nodeSize, subtree); }
    }
  });
  var locals = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset).sort(byPos);
  for (var i = 0; i < locals.length; i++) { if (!locals[i].type.valid(node, locals[i])) {
    if (options.onRemove) { options.onRemove(locals[i].spec); }
    locals.splice(i--, 1);
  } }
  return locals.length || children.length ? new DecorationSet(locals, children) : empty
}

// : (Decoration, Decoration) → number
// Used to sort decorations so that ones with a low start position
// come first, and within a set with the same start position, those
// with an smaller end position come first.
function byPos(a, b) {
  return a.from - b.from || a.to - b.to
}

// : ([Decoration]) → [Decoration]
// Scan a sorted array of decorations for partially overlapping spans,
// and split those so that only fully overlapping spans are left (to
// make subsequent rendering easier). Will return the input array if
// no partially overlapping spans are found (the common case).
function removeOverlap(spans) {
  var working = spans;
  for (var i = 0; i < working.length - 1; i++) {
    var span = working[i];
    if (span.from != span.to) { for (var j = i + 1; j < working.length; j++) {
      var next = working[j];
      if (next.from == span.from) {
        if (next.to != span.to) {
          if (working == spans) { working = spans.slice(); }
          // Followed by a partially overlapping larger span. Split that
          // span.
          working[j] = next.copy(next.from, span.to);
          insertAhead(working, j + 1, next.copy(span.to, next.to));
        }
        continue
      } else {
        if (next.from < span.to) {
          if (working == spans) { working = spans.slice(); }
          // The end of this one overlaps with a subsequent span. Split
          // this one.
          working[i] = span.copy(span.from, next.from);
          insertAhead(working, j, span.copy(next.from, span.to));
        }
        break
      }
    } }
  }
  return working
}

function insertAhead(array, i, deco) {
  while (i < array.length && byPos(deco, array[i]) > 0) { i++; }
  array.splice(i, 0, deco);
}

// : (EditorView) → union<DecorationSet, DecorationGroup>
// Get the decorations associated with the current props of a view.
function viewDecorations(view) {
  var found = [];
  view.someProp("decorations", function (f) {
    var result = f(view.state);
    if (result && result != empty) { found.push(result); }
  });
  if (view.cursorWrapper)
    { found.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco])); }
  return DecorationGroup.from(found)
}

// ::- An editor view manages the DOM structure that represents an
// editable document. Its state and behavior are determined by its
// [props](#view.DirectEditorProps).
var EditorView = function EditorView(place, props) {
  this._props = props;
  // :: EditorState
  // The view's current [state](#state.EditorState).
  this.state = props.state;

  this.dispatch = this.dispatch.bind(this);

  this._root = null;
  this.focused = false;
  // Kludge used to work around a Chrome bug
  this.trackWrites = null;

  // :: dom.Element
  // An editable DOM node containing the document. (You probably
  // should not directly interfere with its content.)
  this.dom = (place && place.mount) || document.createElement("div");
  if (place) {
    if (place.appendChild) { place.appendChild(this.dom); }
    else if (place.apply) { place(this.dom); }
    else if (place.mount) { this.mounted = true; }
  }

  // :: bool
  // Indicates whether the editor is currently [editable](#view.EditorProps.editable).
  this.editable = getEditable(this);
  this.markCursor = null;
  this.cursorWrapper = null;
  updateCursorWrapper(this);
  this.nodeViews = buildNodeViews(this);
  this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);

  this.lastSelectedViewDesc = null;
  // :: ?{slice: Slice, move: bool}
  // When editor content is being dragged, this object contains
  // information about the dragged slice and whether it is being
  // copied or moved. At any other time, it is null.
  this.dragging = null;

  initInput(this);

  this.pluginViews = [];
  this.updatePluginViews();
};

var prototypeAccessors$2 = { props: { configurable: true },root: { configurable: true } };

// composing:: boolean
// Holds `true` when a
// [composition](https://developer.mozilla.org/en-US/docs/Mozilla/IME_handling_guide)
// is active.

// :: DirectEditorProps
// The view's current [props](#view.EditorProps).
prototypeAccessors$2.props.get = function () {
  if (this._props.state != this.state) {
    var prev = this._props;
    this._props = {};
    for (var name in prev) { this._props[name] = prev[name]; }
    this._props.state = this.state;
  }
  return this._props
};

// :: (DirectEditorProps)
// Update the view's props. Will immediately cause an update to
// the DOM.
EditorView.prototype.update = function update (props) {
  if (props.handleDOMEvents != this._props.handleDOMEvents) { ensureListeners(this); }
  this._props = props;
  this.updateStateInner(props.state, true);
};

// :: (DirectEditorProps)
// Update the view by updating existing props object with the object
// given as argument. Equivalent to `view.update(Object.assign({},
// view.props, props))`.
EditorView.prototype.setProps = function setProps (props) {
  var updated = {};
  for (var name in this._props) { updated[name] = this._props[name]; }
  updated.state = this.state;
  for (var name$1 in props) { updated[name$1] = props[name$1]; }
  this.update(updated);
};

// :: (EditorState)
// Update the editor's `state` prop, without touching any of the
// other props.
EditorView.prototype.updateState = function updateState (state) {
  this.updateStateInner(state, this.state.plugins != state.plugins);
};

EditorView.prototype.updateStateInner = function updateStateInner (state, reconfigured) {
    var this$1 = this;

  var prev = this.state, redraw = false, updateSel = false;
  // When stored marks are added, stop composition, so that they can
  // be displayed.
  if (state.storedMarks && this.composing) {
    clearComposition(this);
    updateSel = true;
  }
  this.state = state;
  if (reconfigured) {
    var nodeViews = buildNodeViews(this);
    if (changedNodeViews(nodeViews, this.nodeViews)) {
      this.nodeViews = nodeViews;
      redraw = true;
    }
    ensureListeners(this);
  }

  this.editable = getEditable(this);
  updateCursorWrapper(this);
  var innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this);

  var scroll = reconfigured ? "reset"
      : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
  var updateDoc = redraw || !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
  if (updateDoc || !state.selection.eq(prev.selection)) { updateSel = true; }
  var oldScrollPos = scroll == "preserve" && updateSel && this.dom.style.overflowAnchor == null && storeScrollPos(this);

  if (updateSel) {
    this.domObserver.stop();
    // Work around an issue in Chrome, IE, and Edge where changing
    // the DOM around an active selection puts it into a broken
    // state where the thing the user sees differs from the
    // selection reported by the Selection object (#710, #973,
    // #1011, #1013, #1035).
    var forceSelUpdate = updateDoc && (result.ie || result.chrome) && !this.composing &&
        !prev.selection.empty && !state.selection.empty && selectionContextChanged(prev.selection, state.selection);
    if (updateDoc) {
      // If the node that the selection points into is written to,
      // Chrome sometimes starts misreporting the selection, so this
      // tracks that and forces a selection reset when our update
      // did write to the node.
      var chromeKludge = result.chrome ? (this.trackWrites = this.root.getSelection().focusNode) : null;
      if (redraw || !this.docView.update(state.doc, outerDeco, innerDeco, this)) {
        this.docView.updateOuterDeco([]);
        this.docView.destroy();
        this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
      }
      if (chromeKludge && !this.trackWrites) { forceSelUpdate = true; }
    }
    // Work around for an issue where an update arriving right between
    // a DOM selection change and the "selectionchange" event for it
    // can cause a spurious DOM selection update, disrupting mouse
    // drag selection.
    if (forceSelUpdate ||
        !(this.mouseDown && this.domObserver.currentSelection.eq(this.root.getSelection()) && anchorInRightPlace(this))) {
      selectionToDOM(this, forceSelUpdate);
    } else {
      syncNodeSelection(this, state.selection);
      this.domObserver.setCurSelection();
    }
    this.domObserver.start();
  }

  this.updatePluginViews(prev);

  if (scroll == "reset") {
    this.dom.scrollTop = 0;
  } else if (scroll == "to selection") {
    var startDOM = this.root.getSelection().focusNode;
    if (this.someProp("handleScrollToSelection", function (f) { return f(this$1); }))
      ; // Handled
    else if (state.selection instanceof prosemirror_state__WEBPACK_IMPORTED_MODULE_0__[/* NodeSelection */ "c"])
      { scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect(), startDOM); }
    else
      { scrollRectIntoView(this, this.coordsAtPos(state.selection.head, 1), startDOM); }
  } else if (oldScrollPos) {
    resetScrollPos(oldScrollPos);
  }
};

EditorView.prototype.destroyPluginViews = function destroyPluginViews () {
  var view;
  while (view = this.pluginViews.pop()) { if (view.destroy) { view.destroy(); } }
};

EditorView.prototype.updatePluginViews = function updatePluginViews (prevState) {
  if (!prevState || prevState.plugins != this.state.plugins) {
    this.destroyPluginViews();
    for (var i = 0; i < this.state.plugins.length; i++) {
      var plugin = this.state.plugins[i];
      if (plugin.spec.view) { this.pluginViews.push(plugin.spec.view(this)); }
    }
  } else {
    for (var i$1 = 0; i$1 < this.pluginViews.length; i$1++) {
      var pluginView = this.pluginViews[i$1];
      if (pluginView.update) { pluginView.update(this, prevState); }
    }
  }
};

// :: (string, ?(prop: *) → *) → *
// Goes over the values of a prop, first those provided directly,
// then those from plugins (in order), and calls `f` every time a
// non-undefined value is found. When `f` returns a truthy value,
// that is immediately returned. When `f` isn't provided, it is
// treated as the identity function (the prop value is returned
// directly).
EditorView.prototype.someProp = function someProp (propName, f) {
  var prop = this._props && this._props[propName], value;
  if (prop != null && (value = f ? f(prop) : prop)) { return value }
  var plugins = this.state.plugins;
  if (plugins) { for (var i = 0; i < plugins.length; i++) {
    var prop$1 = plugins[i].props[propName];
    if (prop$1 != null && (value = f ? f(prop$1) : prop$1)) { return value }
  } }
};

// :: () → bool
// Query whether the view has focus.
EditorView.prototype.hasFocus = function hasFocus () {
  return this.root.activeElement == this.dom
};

// :: ()
// Focus the editor.
EditorView.prototype.focus = function focus () {
  this.domObserver.stop();
  if (this.editable) { focusPreventScroll(this.dom); }
  selectionToDOM(this);
  this.domObserver.start();
};

// :: union<dom.Document, dom.DocumentFragment>
// Get the document root in which the editor exists. This will
// usually be the top-level `document`, but might be a [shadow
// DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
// root if the editor is inside one.
prototypeAccessors$2.root.get = function () {
  var cached = this._root;
  if (cached == null) { for (var search = this.dom.parentNode; search; search = search.parentNode) {
    if (search.nodeType == 9 || (search.nodeType == 11 && search.host)) {
      if (!search.getSelection) { Object.getPrototypeOf(search).getSelection = function () { return document.getSelection(); }; }
      return this._root = search
    }
  } }
  return cached || document
};

// :: ({left: number, top: number}) → ?{pos: number, inside: number}
// Given a pair of viewport coordinates, return the document
// position that corresponds to them. May return null if the given
// coordinates aren't inside of the editor. When an object is
// returned, its `pos` property is the position nearest to the
// coordinates, and its `inside` property holds the position of the
// inner node that the position falls inside of, or -1 if it is at
// the top level, not in any node.
EditorView.prototype.posAtCoords = function posAtCoords$1 (coords) {
  return posAtCoords(this, coords)
};

// :: (number, number) → {left: number, right: number, top: number, bottom: number}
// Returns the viewport rectangle at a given document position.
// `left` and `right` will be the same number, as this returns a
// flat cursor-ish rectangle. If the position is between two things
// that aren't directly adjacent, `side` determines which element is
// used. When < 0, the element before the position is used,
// otherwise the element after.
EditorView.prototype.coordsAtPos = function coordsAtPos$1 (pos, side) {
    if ( side === void 0 ) side = 1;

  return coordsAtPos(this, pos, side)
};

// :: (number, number) → {node: dom.Node, offset: number}
// Find the DOM position that corresponds to the given document
// position. When `side` is negative, find the position as close as
// possible to the content before the position. When positive,
// prefer positions close to the content after the position. When
// zero, prefer as shallow a position as possible.
//
// Note that you should **not** mutate the editor's internal DOM,
// only inspect it (and even that is usually not necessary).
EditorView.prototype.domAtPos = function domAtPos (pos, side) {
    if ( side === void 0 ) side = 0;

  return this.docView.domFromPos(pos, side)
};

// :: (number) → ?dom.Node
// Find the DOM node that represents the document node after the
// given position. May return `null` when the position doesn't point
// in front of a node or if the node is inside an opaque node view.
//
// This is intended to be able to call things like
// `getBoundingClientRect` on that DOM node. Do **not** mutate the
// editor DOM directly, or add styling this way, since that will be
// immediately overriden by the editor as it redraws the node.
EditorView.prototype.nodeDOM = function nodeDOM (pos) {
  var desc = this.docView.descAt(pos);
  return desc ? desc.nodeDOM : null
};

// :: (dom.Node, number, ?number) → number
// Find the document position that corresponds to a given DOM
// position. (Whenever possible, it is preferable to inspect the
// document structure directly, rather than poking around in the
// DOM, but sometimes—for example when interpreting an event
// target—you don't have a choice.)
//
// The `bias` parameter can be used to influence which side of a DOM
// node to use when the position is inside a leaf node.
EditorView.prototype.posAtDOM = function posAtDOM (node, offset, bias) {
    if ( bias === void 0 ) bias = -1;

  var pos = this.docView.posFromDOM(node, offset, bias);
  if (pos == null) { throw new RangeError("DOM position not inside the editor") }
  return pos
};

// :: (union<"up", "down", "left", "right", "forward", "backward">, ?EditorState) → bool
// Find out whether the selection is at the end of a textblock when
// moving in a given direction. When, for example, given `"left"`,
// it will return true if moving left from the current cursor
// position would leave that position's parent textblock. Will apply
// to the view's current state by default, but it is possible to
// pass a different state.
EditorView.prototype.endOfTextblock = function endOfTextblock$1 (dir, state) {
  return endOfTextblock(this, state || this.state, dir)
};

// :: ()
// Removes the editor from the DOM and destroys all [node
// views](#view.NodeView).
EditorView.prototype.destroy = function destroy () {
  if (!this.docView) { return }
  destroyInput(this);
  this.destroyPluginViews();
  if (this.mounted) {
    this.docView.update(this.state.doc, [], viewDecorations(this), this);
    this.dom.textContent = "";
  } else if (this.dom.parentNode) {
    this.dom.parentNode.removeChild(this.dom);
  }
  this.docView.destroy();
  this.docView = null;
};

// Used for testing.
EditorView.prototype.dispatchEvent = function dispatchEvent$1 (event) {
  return dispatchEvent(this, event)
};

// :: (Transaction)
// Dispatch a transaction. Will call
// [`dispatchTransaction`](#view.DirectEditorProps.dispatchTransaction)
// when given, and otherwise defaults to applying the transaction to
// the current state and calling
// [`updateState`](#view.EditorView.updateState) with the result.
// This method is bound to the view instance, so that it can be
// easily passed around.
EditorView.prototype.dispatch = function dispatch (tr) {
  var dispatchTransaction = this._props.dispatchTransaction;
  if (dispatchTransaction) { dispatchTransaction.call(this, tr); }
  else { this.updateState(this.state.apply(tr)); }
};

Object.defineProperties( EditorView.prototype, prototypeAccessors$2 );

function computeDocDeco(view) {
  var attrs = Object.create(null);
  attrs.class = "ProseMirror";
  attrs.contenteditable = String(view.editable);

  view.someProp("attributes", function (value) {
    if (typeof value == "function") { value = value(view.state); }
    if (value) { for (var attr in value) {
      if (attr == "class")
        { attrs.class += " " + value[attr]; }
      else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName")
        { attrs[attr] = String(value[attr]); }
    } }
  });

  return [Decoration.node(0, view.state.doc.content.size, attrs)]
}

function updateCursorWrapper(view) {
  if (view.markCursor) {
    var dom = document.createElement("img");
    dom.setAttribute("mark-placeholder", "true");
    view.cursorWrapper = {dom: dom, deco: Decoration.widget(view.state.selection.head, dom, {raw: true, marks: view.markCursor})};
  } else {
    view.cursorWrapper = null;
  }
}

function getEditable(view) {
  return !view.someProp("editable", function (value) { return value(view.state) === false; })
}

function selectionContextChanged(sel1, sel2) {
  var depth = Math.min(sel1.$anchor.sharedDepth(sel1.head), sel2.$anchor.sharedDepth(sel2.head));
  return sel1.$anchor.start(depth) != sel2.$anchor.start(depth)
}

function buildNodeViews(view) {
  var result = {};
  view.someProp("nodeViews", function (obj) {
    for (var prop in obj) { if (!Object.prototype.hasOwnProperty.call(result, prop))
      { result[prop] = obj[prop]; } }
  });
  return result
}

function changedNodeViews(a, b) {
  var nA = 0, nB = 0;
  for (var prop in a) {
    if (a[prop] != b[prop]) { return true }
    nA++;
  }
  for (var _ in b) { nB++; }
  return nA != nB
}

// EditorProps:: interface
//
// Props are configuration values that can be passed to an editor view
// or included in a plugin. This interface lists the supported props.
//
// The various event-handling functions may all return `true` to
// indicate that they handled the given event. The view will then take
// care to call `preventDefault` on the event, except with
// `handleDOMEvents`, where the handler itself is responsible for that.
//
// How a prop is resolved depends on the prop. Handler functions are
// called one at a time, starting with the base props and then
// searching through the plugins (in order of appearance) until one of
// them returns true. For some props, the first plugin that yields a
// value gets precedence.
//
//   handleDOMEvents:: ?Object<(view: EditorView, event: dom.Event) → bool>
//   Can be an object mapping DOM event type names to functions that
//   handle them. Such functions will be called before any handling
//   ProseMirror does of events fired on the editable DOM element.
//   Contrary to the other event handling props, when returning true
//   from such a function, you are responsible for calling
//   `preventDefault` yourself (or not, if you want to allow the
//   default behavior).
//
//   handleKeyDown:: ?(view: EditorView, event: dom.KeyboardEvent) → bool
//   Called when the editor receives a `keydown` event.
//
//   handleKeyPress:: ?(view: EditorView, event: dom.KeyboardEvent) → bool
//   Handler for `keypress` events.
//
//   handleTextInput:: ?(view: EditorView, from: number, to: number, text: string) → bool
//   Whenever the user directly input text, this handler is called
//   before the input is applied. If it returns `true`, the default
//   behavior of actually inserting the text is suppressed.
//
//   handleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a click, from the inside out. The
//   `direct` flag will be true for the inner node.
//
//   handleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is clicked, after `handleClickOn` handlers
//   have been called.
//
//   handleDoubleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a double click.
//
//   handleDoubleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is double-clicked, after `handleDoubleClickOn`.
//
//   handleTripleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a triple click.
//
//   handleTripleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is triple-clicked, after `handleTripleClickOn`.
//
//   handlePaste:: ?(view: EditorView, event: dom.ClipboardEvent, slice: Slice) → bool
//   Can be used to override the behavior of pasting. `slice` is the
//   pasted content parsed by the editor, but you can directly access
//   the event to get at the raw content.
//
//   handleDrop:: ?(view: EditorView, event: dom.Event, slice: Slice, moved: bool) → bool
//   Called when something is dropped on the editor. `moved` will be
//   true if this drop moves from the current selection (which should
//   thus be deleted).
//
//   handleScrollToSelection:: ?(view: EditorView) → bool
//   Called when the view, after updating its state, tries to scroll
//   the selection into view. A handler function may return false to
//   indicate that it did not handle the scrolling and further
//   handlers or the default behavior should be tried.
//
//   createSelectionBetween:: ?(view: EditorView, anchor: ResolvedPos, head: ResolvedPos) → ?Selection
//   Can be used to override the way a selection is created when
//   reading a DOM selection between the given anchor and head.
//
//   domParser:: ?DOMParser
//   The [parser](#model.DOMParser) to use when reading editor changes
//   from the DOM. Defaults to calling
//   [`DOMParser.fromSchema`](#model.DOMParser^fromSchema) on the
//   editor's schema.
//
//   transformPastedHTML:: ?(html: string) → string
//   Can be used to transform pasted HTML text, _before_ it is parsed,
//   for example to clean it up.
//
//   clipboardParser:: ?DOMParser
//   The [parser](#model.DOMParser) to use when reading content from
//   the clipboard. When not given, the value of the
//   [`domParser`](#view.EditorProps.domParser) prop is used.
//
//   transformPastedText:: ?(text: string, plain: bool) → string
//   Transform pasted plain text. The `plain` flag will be true when
//   the text is pasted as plain text.
//
//   clipboardTextParser:: ?(text: string, $context: ResolvedPos, plain: bool) → Slice
//   A function to parse text from the clipboard into a document
//   slice. Called after
//   [`transformPastedText`](#view.EditorProps.transformPastedText).
//   The default behavior is to split the text into lines, wrap them
//   in `<p>` tags, and call
//   [`clipboardParser`](#view.EditorProps.clipboardParser) on it.
//   The `plain` flag will be true when the text is pasted as plain text.
//
//   transformPasted:: ?(Slice) → Slice
//   Can be used to transform pasted content before it is applied to
//   the document.
//
//   nodeViews:: ?Object<(node: Node, view: EditorView, getPos: () → number, decorations: [Decoration], innerDecorations: DecorationSource) → NodeView>
//   Allows you to pass custom rendering and behavior logic for nodes
//   and marks. Should map node and mark names to constructor
//   functions that produce a [`NodeView`](#view.NodeView) object
//   implementing the node's display behavior. For nodes, the third
//   argument `getPos` is a function that can be called to get the
//   node's current position, which can be useful when creating
//   transactions to update it. For marks, the third argument is a
//   boolean that indicates whether the mark's content is inline.
//
//   `decorations` is an array of node or inline decorations that are
//   active around the node. They are automatically drawn in the
//   normal way, and you will usually just want to ignore this, but
//   they can also be used as a way to provide context information to
//   the node view without adding it to the document itself.
//
//   `innerDecorations` holds the decorations for the node's content.
//   You can safely ignore this if your view has no content or a
//   `contentDOM` property, since the editor will draw the decorations
//   on the content. But if you, for example, want to create a nested
//   editor with the content, it may make sense to provide it with the
//   inner decorations.
//
//   clipboardSerializer:: ?DOMSerializer
//   The DOM serializer to use when putting content onto the
//   clipboard. If not given, the result of
//   [`DOMSerializer.fromSchema`](#model.DOMSerializer^fromSchema)
//   will be used.
//
//   clipboardTextSerializer:: ?(Slice) → string
//   A function that will be called to get the text for the current
//   selection when copying text to the clipboard. By default, the
//   editor will use [`textBetween`](#model.Node.textBetween) on the
//   selected range.
//
//   decorations:: ?(state: EditorState) → ?DecorationSource
//   A set of [document decorations](#view.Decoration) to show in the
//   view.
//
//   editable:: ?(state: EditorState) → bool
//   When this returns false, the content of the view is not directly
//   editable.
//
//   attributes:: ?union<Object<string>, (EditorState) → ?Object<string>>
//   Control the DOM attributes of the editable element. May be either
//   an object or a function going from an editor state to an object.
//   By default, the element will get a class `"ProseMirror"`, and
//   will have its `contentEditable` attribute determined by the
//   [`editable` prop](#view.EditorProps.editable). Additional classes
//   provided here will be added to the class. For other attributes,
//   the value provided first (as in
//   [`someProp`](#view.EditorView.someProp)) will be used.
//
//   scrollThreshold:: ?union<number, {top: number, right: number, bottom: number, left: number}>
//   Determines the distance (in pixels) between the cursor and the
//   end of the visible viewport at which point, when scrolling the
//   cursor into view, scrolling takes place. Defaults to 0.
//
//   scrollMargin:: ?union<number, {top: number, right: number, bottom: number, left: number}>
//   Determines the extra space (in pixels) that is left above or
//   below the cursor when it is scrolled into view. Defaults to 5.

// DirectEditorProps:: interface extends EditorProps
//
// The props object given directly to the editor view supports two
// fields that can't be used in plugins:
//
//   state:: EditorState
//   The current state of the editor.
//
//   dispatchTransaction:: ?(tr: Transaction)
//   The callback over which to send transactions (state updates)
//   produced by the view. If you specify this, you probably want to
//   make sure this ends up calling the view's
//   [`updateState`](#view.EditorView.updateState) method with a new
//   state that has the transaction
//   [applied](#state.EditorState.apply). The callback will be bound to have
//   the view instance as its `this` binding.


//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./node_modules/rope-sequence/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/rope-sequence/dist/index.es.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var GOOD_LEAF_SIZE = 200;

// :: class<T> A rope sequence is a persistent sequence data structure
// that supports appending, prepending, and slicing without doing a
// full copy. It is represented as a mostly-balanced tree.
var RopeSequence = function RopeSequence () {};

RopeSequence.prototype.append = function append (other) {
  if (!other.length) { return this }
  other = RopeSequence.from(other);

  return (!this.length && other) ||
    (other.length < GOOD_LEAF_SIZE && this.leafAppend(other)) ||
    (this.length < GOOD_LEAF_SIZE && other.leafPrepend(this)) ||
    this.appendInner(other)
};

// :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
// Prepend an array or other rope to this one, returning a new rope.
RopeSequence.prototype.prepend = function prepend (other) {
  if (!other.length) { return this }
  return RopeSequence.from(other).append(this)
};

RopeSequence.prototype.appendInner = function appendInner (other) {
  return new Append(this, other)
};

// :: (?number, ?number) → RopeSequence<T>
// Create a rope repesenting a sub-sequence of this rope.
RopeSequence.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from >= to) { return RopeSequence.empty }
  return this.sliceInner(Math.max(0, from), Math.min(this.length, to))
};

// :: (number) → T
// Retrieve the element at the given position from this rope.
RopeSequence.prototype.get = function get (i) {
  if (i < 0 || i >= this.length) { return undefined }
  return this.getInner(i)
};

// :: ((element: T, index: number) → ?bool, ?number, ?number)
// Call the given function for each element between the given
// indices. This tends to be more efficient than looping over the
// indices and calling `get`, because it doesn't have to descend the
// tree for every element.
RopeSequence.prototype.forEach = function forEach (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from <= to)
    { this.forEachInner(f, from, to, 0); }
  else
    { this.forEachInvertedInner(f, from, to, 0); }
};

// :: ((element: T, index: number) → U, ?number, ?number) → [U]
// Map the given functions over the elements of the rope, producing
// a flat array.
RopeSequence.prototype.map = function map (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  var result = [];
  this.forEach(function (elt, i) { return result.push(f(elt, i)); }, from, to);
  return result
};

// :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
// Create a rope representing the given array, or return the rope
// itself if a rope was given.
RopeSequence.from = function from (values) {
  if (values instanceof RopeSequence) { return values }
  return values && values.length ? new Leaf(values) : RopeSequence.empty
};

var Leaf = /*@__PURE__*/(function (RopeSequence) {
  function Leaf(values) {
    RopeSequence.call(this);
    this.values = values;
  }

  if ( RopeSequence ) Leaf.__proto__ = RopeSequence;
  Leaf.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Leaf.prototype.constructor = Leaf;

  var prototypeAccessors = { length: { configurable: true },depth: { configurable: true } };

  Leaf.prototype.flatten = function flatten () {
    return this.values
  };

  Leaf.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    return new Leaf(this.values.slice(from, to))
  };

  Leaf.prototype.getInner = function getInner (i) {
    return this.values[i]
  };

  Leaf.prototype.forEachInner = function forEachInner (f, from, to, start) {
    for (var i = from; i < to; i++)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    for (var i = from - 1; i >= to; i--)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.leafAppend = function leafAppend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(this.values.concat(other.flatten())) }
  };

  Leaf.prototype.leafPrepend = function leafPrepend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(other.flatten().concat(this.values)) }
  };

  prototypeAccessors.length.get = function () { return this.values.length };

  prototypeAccessors.depth.get = function () { return 0 };

  Object.defineProperties( Leaf.prototype, prototypeAccessors );

  return Leaf;
}(RopeSequence));

// :: RopeSequence
// The empty rope sequence.
RopeSequence.empty = new Leaf([]);

var Append = /*@__PURE__*/(function (RopeSequence) {
  function Append(left, right) {
    RopeSequence.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }

  if ( RopeSequence ) Append.__proto__ = RopeSequence;
  Append.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Append.prototype.constructor = Append;

  Append.prototype.flatten = function flatten () {
    return this.left.flatten().concat(this.right.flatten())
  };

  Append.prototype.getInner = function getInner (i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length)
  };

  Append.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from < leftLen &&
        this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false)
      { return false }
    if (to > leftLen &&
        this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false)
      { return false }
  };

  Append.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from > leftLen &&
        this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false)
      { return false }
    if (to < leftLen &&
        this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false)
      { return false }
  };

  Append.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    var leftLen = this.left.length;
    if (to <= leftLen) { return this.left.slice(from, to) }
    if (from >= leftLen) { return this.right.slice(from - leftLen, to - leftLen) }
    return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen))
  };

  Append.prototype.leafAppend = function leafAppend (other) {
    var inner = this.right.leafAppend(other);
    if (inner) { return new Append(this.left, inner) }
  };

  Append.prototype.leafPrepend = function leafPrepend (other) {
    var inner = this.left.leafPrepend(other);
    if (inner) { return new Append(inner, this.right) }
  };

  Append.prototype.appendInner = function appendInner (other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1)
      { return new Append(this.left, new Append(this.right, other)) }
    return new Append(this, other)
  };

  return Append;
}(RopeSequence));

var ropeSequence = RopeSequence;

/* harmony default export */ __webpack_exports__["a"] = (ropeSequence);


/***/ }),

/***/ "./node_modules/w3c-keyname/index.es.js":
/*!**********************************************!*\
  !*** ./node_modules/w3c-keyname/index.es.js ***!
  \**********************************************/
/*! exports provided: base, shift, keyName */
/*! exports used: base, keyName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return base; });
/* unused harmony export shift */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return keyName; });
var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  229: "q"
}

var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: "\"",
  229: "Q"
}

var chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent)
var safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor)
var gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent)
var mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform)
var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
var brokenModifierNames = chrome && (mac || +chrome[1] < 57) || gecko && mac

// Fill in the digit keys
for (var i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i)

// The function keys
for (var i = 1; i <= 24; i++) base[i + 111] = "F" + i

// And the alphabetic keys
for (var i = 65; i <= 90; i++) {
  base[i] = String.fromCharCode(i + 32)
  shift[i] = String.fromCharCode(i)
}

// For each code that doesn't have a shift-equivalent, copy the base name
for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code]

function keyName(event) {
  // Don't trust event.key in Chrome when there are modifiers until
  // they fix https://bugs.chromium.org/p/chromium/issues/detail?id=633838
  var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) ||
    (safari || ie) && event.shiftKey && event.key && event.key.length == 1
  var name = (!ignoreKey && event.key) ||
    (event.shiftKey ? shift : base)[event.keyCode] ||
    event.key || "Unidentified"
  // Edge sometimes produces wrong names (Issue #3)
  if (name == "Esc") name = "Escape"
  if (name == "Del") name = "Delete"
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
  if (name == "Left") name = "ArrowLeft"
  if (name == "Up") name = "ArrowUp"
  if (name == "Right") name = "ArrowRight"
  if (name == "Down") name = "ArrowDown"
  return name
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3JlbHQvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3NlbWlycm9yLWNvbW1hbmRzL2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3NlbWlycm9yLWRyb3BjdXJzb3IvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvc2VtaXJyb3ItZ2FwY3Vyc29yL2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3NlbWlycm9yLWhpc3RvcnkvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvc2VtaXJyb3ItaW5wdXRydWxlcy9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9zZW1pcnJvci1rZXltYXAvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvc2VtaXJyb3ItbWVudS9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9zZW1pcnJvci1zY2hlbWEtbGlzdC9kaXN0L2luZGV4LmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9zZW1pcnJvci12aWV3L2Rpc3QvaW5kZXguZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvcGUtc2VxdWVuY2UvZGlzdC9pbmRleC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdzNjLWtleW5hbWUvaW5kZXguZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0JBQXNCO0FBQzlCO0FBQ0E7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O0FBQ0EsU0FBUyxtQ0FBbUM7QUFDNUMsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtRUFBbUUsa0NBQWtDO0FBQy9ILEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0Qsb0NBQW9DLEVBQUU7QUFDNUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLE9BQU8sMEJBQTBCLEVBQUU7QUFDbkMsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsR0FBRztBQUM3RTs7QUFFQTtBQUNBLGVBQWUsUUFBUTs7QUFFdkI7QUFDQSxlQUFlLFNBQVM7O0FBRXhCO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InZlbmRvcnN+cHJvc2VtaXJyb3IuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVsdCgpIHtcbiAgdmFyIGVsdCA9IGFyZ3VtZW50c1swXVxuICBpZiAodHlwZW9mIGVsdCA9PSBcInN0cmluZ1wiKSBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsdClcbiAgdmFyIGkgPSAxLCBuZXh0ID0gYXJndW1lbnRzWzFdXG4gIGlmIChuZXh0ICYmIHR5cGVvZiBuZXh0ID09IFwib2JqZWN0XCIgJiYgbmV4dC5ub2RlVHlwZSA9PSBudWxsICYmICFBcnJheS5pc0FycmF5KG5leHQpKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBuZXh0KSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHQsIG5hbWUpKSB7XG4gICAgICB2YXIgdmFsdWUgPSBuZXh0W25hbWVdXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIGVsdC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG4gICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSBlbHRbbmFtZV0gPSB2YWx1ZVxuICAgIH1cbiAgICBpKytcbiAgfVxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYWRkKGVsdCwgYXJndW1lbnRzW2ldKVxuICByZXR1cm4gZWx0XG59XG5cbmZ1bmN0aW9uIGFkZChlbHQsIGNoaWxkKSB7XG4gIGlmICh0eXBlb2YgY2hpbGQgPT0gXCJzdHJpbmdcIikge1xuICAgIGVsdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCkpXG4gIH0gZWxzZSBpZiAoY2hpbGQgPT0gbnVsbCkge1xuICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVUeXBlICE9IG51bGwpIHtcbiAgICBlbHQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkLmxlbmd0aDsgaSsrKSBhZGQoZWx0LCBjaGlsZFtpXSlcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVuc3VwcG9ydGVkIGNoaWxkIG5vZGU6IFwiICsgY2hpbGQpXG4gIH1cbn1cbiIsImltcG9ydCB7IGxpZnRUYXJnZXQsIGNhbkpvaW4sIGpvaW5Qb2ludCwgY2FuU3BsaXQsIFJlcGxhY2VBcm91bmRTdGVwLCBmaW5kV3JhcHBpbmcgfSBmcm9tICdwcm9zZW1pcnJvci10cmFuc2Zvcm0nO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFNsaWNlIH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuaW1wb3J0IHsgTm9kZVNlbGVjdGlvbiwgU2VsZWN0aW9uLCBBbGxTZWxlY3Rpb24sIFRleHRTZWxlY3Rpb24gfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gRGVsZXRlIHRoZSBzZWxlY3Rpb24sIGlmIHRoZXJlIGlzIG9uZS5cbmZ1bmN0aW9uIGRlbGV0ZVNlbGVjdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgaWYgKHN0YXRlLnNlbGVjdGlvbi5lbXB0eSkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuZGVsZXRlU2VsZWN0aW9uKCkuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKEVkaXRvclN0YXRlLCA/KHRyOiBUcmFuc2FjdGlvbiksID9FZGl0b3JWaWV3KSDihpIgYm9vbFxuLy8gSWYgdGhlIHNlbGVjdGlvbiBpcyBlbXB0eSBhbmQgYXQgdGhlIHN0YXJ0IG9mIGEgdGV4dGJsb2NrLCB0cnkgdG9cbi8vIHJlZHVjZSB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGF0IGJsb2NrIGFuZCB0aGUgb25lIGJlZm9yZSBpdOKAlGlmXG4vLyB0aGVyZSdzIGEgYmxvY2sgZGlyZWN0bHkgYmVmb3JlIGl0IHRoYXQgY2FuIGJlIGpvaW5lZCwgam9pbiB0aGVtLlxuLy8gSWYgbm90LCB0cnkgdG8gbW92ZSB0aGUgc2VsZWN0ZWQgYmxvY2sgY2xvc2VyIHRvIHRoZSBuZXh0IG9uZSBpblxuLy8gdGhlIGRvY3VtZW50IHN0cnVjdHVyZSBieSBsaWZ0aW5nIGl0IG91dCBvZiBpdHMgcGFyZW50IG9yIG1vdmluZyBpdFxuLy8gaW50byBhIHBhcmVudCBvZiB0aGUgcHJldmlvdXMgYmxvY2suIFdpbGwgdXNlIHRoZSB2aWV3IGZvciBhY2N1cmF0ZVxuLy8gKGJpZGktYXdhcmUpIHN0YXJ0LW9mLXRleHRibG9jayBkZXRlY3Rpb24gaWYgZ2l2ZW4uXG5mdW5jdGlvbiBqb2luQmFja3dhcmQoc3RhdGUsIGRpc3BhdGNoLCB2aWV3KSB7XG4gIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gIHZhciAkY3Vyc29yID0gcmVmLiRjdXJzb3I7XG4gIGlmICghJGN1cnNvciB8fCAodmlldyA/ICF2aWV3LmVuZE9mVGV4dGJsb2NrKFwiYmFja3dhcmRcIiwgc3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICRjdXJzb3IucGFyZW50T2Zmc2V0ID4gMCkpXG4gICAgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHZhciAkY3V0ID0gZmluZEN1dEJlZm9yZSgkY3Vyc29yKTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyBub2RlIGJlZm9yZSB0aGlzLCB0cnkgdG8gbGlmdFxuICBpZiAoISRjdXQpIHtcbiAgICB2YXIgcmFuZ2UgPSAkY3Vyc29yLmJsb2NrUmFuZ2UoKSwgdGFyZ2V0ID0gcmFuZ2UgJiYgbGlmdFRhcmdldChyYW5nZSk7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKGRpc3BhdGNoKSB7IGRpc3BhdGNoKHN0YXRlLnRyLmxpZnQocmFuZ2UsIHRhcmdldCkuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgdmFyIGJlZm9yZSA9ICRjdXQubm9kZUJlZm9yZTtcbiAgLy8gQXBwbHkgdGhlIGpvaW5pbmcgYWxnb3JpdGhtXG4gIGlmICghYmVmb3JlLnR5cGUuc3BlYy5pc29sYXRpbmcgJiYgZGVsZXRlQmFycmllcihzdGF0ZSwgJGN1dCwgZGlzcGF0Y2gpKVxuICAgIHsgcmV0dXJuIHRydWUgfVxuXG4gIC8vIElmIHRoZSBub2RlIGJlbG93IGhhcyBubyBjb250ZW50IGFuZCB0aGUgbm9kZSBhYm92ZSBpc1xuICAvLyBzZWxlY3RhYmxlLCBkZWxldGUgdGhlIG5vZGUgYmVsb3cgYW5kIHNlbGVjdCB0aGUgb25lIGFib3ZlLlxuICBpZiAoJGN1cnNvci5wYXJlbnQuY29udGVudC5zaXplID09IDAgJiZcbiAgICAgICh0ZXh0YmxvY2tBdChiZWZvcmUsIFwiZW5kXCIpIHx8IE5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKGJlZm9yZSkpKSB7XG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB2YXIgdHIgPSBzdGF0ZS50ci5kZWxldGVSYW5nZSgkY3Vyc29yLmJlZm9yZSgpLCAkY3Vyc29yLmFmdGVyKCkpO1xuICAgICAgdHIuc2V0U2VsZWN0aW9uKHRleHRibG9ja0F0KGJlZm9yZSwgXCJlbmRcIikgPyBTZWxlY3Rpb24uZmluZEZyb20odHIuZG9jLnJlc29sdmUodHIubWFwcGluZy5tYXAoJGN1dC5wb3MsIC0xKSksIC0xKVxuICAgICAgICAgICAgICAgICAgICAgIDogTm9kZVNlbGVjdGlvbi5jcmVhdGUodHIuZG9jLCAkY3V0LnBvcyAtIGJlZm9yZS5ub2RlU2l6ZSkpO1xuICAgICAgZGlzcGF0Y2godHIuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBJZiB0aGUgbm9kZSBiZWZvcmUgaXMgYW4gYXRvbSwgZGVsZXRlIGl0XG4gIGlmIChiZWZvcmUuaXNBdG9tICYmICRjdXQuZGVwdGggPT0gJGN1cnNvci5kZXB0aCAtIDEpIHtcbiAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuZGVsZXRlKCRjdXQucG9zIC0gYmVmb3JlLm5vZGVTaXplLCAkY3V0LnBvcykuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHRleHRibG9ja0F0KG5vZGUsIHNpZGUpIHtcbiAgZm9yICg7IG5vZGU7IG5vZGUgPSAoc2lkZSA9PSBcInN0YXJ0XCIgPyBub2RlLmZpcnN0Q2hpbGQgOiBub2RlLmxhc3RDaGlsZCkpXG4gICAgeyBpZiAobm9kZS5pc1RleHRibG9jaykgeyByZXR1cm4gdHJ1ZSB9IH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pLCA/RWRpdG9yVmlldykg4oaSIGJvb2xcbi8vIFdoZW4gdGhlIHNlbGVjdGlvbiBpcyBlbXB0eSBhbmQgYXQgdGhlIHN0YXJ0IG9mIGEgdGV4dGJsb2NrLCBzZWxlY3Rcbi8vIHRoZSBub2RlIGJlZm9yZSB0aGF0IHRleHRibG9jaywgaWYgcG9zc2libGUuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbi8vIGJvdW5kIHRvIGtleXMgbGlrZSBiYWNrc3BhY2UsIGFmdGVyXG4vLyBbYGpvaW5CYWNrd2FyZGBdKCNjb21tYW5kcy5qb2luQmFja3dhcmQpIG9yIG90aGVyIGRlbGV0aW5nXG4vLyBjb21tYW5kcywgYXMgYSBmYWxsLWJhY2sgYmVoYXZpb3Igd2hlbiB0aGUgc2NoZW1hIGRvZXNuJ3QgYWxsb3dcbi8vIGRlbGV0aW9uIGF0IHRoZSBzZWxlY3RlZCBwb2ludC5cbmZ1bmN0aW9uIHNlbGVjdE5vZGVCYWNrd2FyZChzdGF0ZSwgZGlzcGF0Y2gsIHZpZXcpIHtcbiAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgdmFyICRoZWFkID0gcmVmLiRoZWFkO1xuICB2YXIgZW1wdHkgPSByZWYuZW1wdHk7XG4gIHZhciAkY3V0ID0gJGhlYWQ7XG4gIGlmICghZW1wdHkpIHsgcmV0dXJuIGZhbHNlIH1cblxuICBpZiAoJGhlYWQucGFyZW50LmlzVGV4dGJsb2NrKSB7XG4gICAgaWYgKHZpZXcgPyAhdmlldy5lbmRPZlRleHRibG9jayhcImJhY2t3YXJkXCIsIHN0YXRlKSA6ICRoZWFkLnBhcmVudE9mZnNldCA+IDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAkY3V0ID0gZmluZEN1dEJlZm9yZSgkaGVhZCk7XG4gIH1cbiAgdmFyIG5vZGUgPSAkY3V0ICYmICRjdXQubm9kZUJlZm9yZTtcbiAgaWYgKCFub2RlIHx8ICFOb2RlU2VsZWN0aW9uLmlzU2VsZWN0YWJsZShub2RlKSkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpXG4gICAgeyBkaXNwYXRjaChzdGF0ZS50ci5zZXRTZWxlY3Rpb24oTm9kZVNlbGVjdGlvbi5jcmVhdGUoc3RhdGUuZG9jLCAkY3V0LnBvcyAtIG5vZGUubm9kZVNpemUpKS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaW5kQ3V0QmVmb3JlKCRwb3MpIHtcbiAgaWYgKCEkcG9zLnBhcmVudC50eXBlLnNwZWMuaXNvbGF0aW5nKSB7IGZvciAodmFyIGkgPSAkcG9zLmRlcHRoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoJHBvcy5pbmRleChpKSA+IDApIHsgcmV0dXJuICRwb3MuZG9jLnJlc29sdmUoJHBvcy5iZWZvcmUoaSArIDEpKSB9XG4gICAgaWYgKCRwb3Mubm9kZShpKS50eXBlLnNwZWMuaXNvbGF0aW5nKSB7IGJyZWFrIH1cbiAgfSB9XG4gIHJldHVybiBudWxsXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pLCA/RWRpdG9yVmlldykg4oaSIGJvb2xcbi8vIElmIHRoZSBzZWxlY3Rpb24gaXMgZW1wdHkgYW5kIHRoZSBjdXJzb3IgaXMgYXQgdGhlIGVuZCBvZiBhXG4vLyB0ZXh0YmxvY2ssIHRyeSB0byByZWR1Y2Ugb3IgcmVtb3ZlIHRoZSBib3VuZGFyeSBiZXR3ZWVuIHRoYXQgYmxvY2tcbi8vIGFuZCB0aGUgb25lIGFmdGVyIGl0LCBlaXRoZXIgYnkgam9pbmluZyB0aGVtIG9yIGJ5IG1vdmluZyB0aGUgb3RoZXJcbi8vIGJsb2NrIGNsb3NlciB0byB0aGlzIG9uZSBpbiB0aGUgdHJlZSBzdHJ1Y3R1cmUuIFdpbGwgdXNlIHRoZSB2aWV3XG4vLyBmb3IgYWNjdXJhdGUgc3RhcnQtb2YtdGV4dGJsb2NrIGRldGVjdGlvbiBpZiBnaXZlbi5cbmZ1bmN0aW9uIGpvaW5Gb3J3YXJkKHN0YXRlLCBkaXNwYXRjaCwgdmlldykge1xuICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgJGN1cnNvciA9IHJlZi4kY3Vyc29yO1xuICBpZiAoISRjdXJzb3IgfHwgKHZpZXcgPyAhdmlldy5lbmRPZlRleHRibG9jayhcImZvcndhcmRcIiwgc3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICRjdXJzb3IucGFyZW50T2Zmc2V0IDwgJGN1cnNvci5wYXJlbnQuY29udGVudC5zaXplKSlcbiAgICB7IHJldHVybiBmYWxzZSB9XG5cbiAgdmFyICRjdXQgPSBmaW5kQ3V0QWZ0ZXIoJGN1cnNvcik7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gbm9kZSBhZnRlciB0aGlzLCB0aGVyZSdzIG5vdGhpbmcgdG8gZG9cbiAgaWYgKCEkY3V0KSB7IHJldHVybiBmYWxzZSB9XG5cbiAgdmFyIGFmdGVyID0gJGN1dC5ub2RlQWZ0ZXI7XG4gIC8vIFRyeSB0aGUgam9pbmluZyBhbGdvcml0aG1cbiAgaWYgKGRlbGV0ZUJhcnJpZXIoc3RhdGUsICRjdXQsIGRpc3BhdGNoKSkgeyByZXR1cm4gdHJ1ZSB9XG5cbiAgLy8gSWYgdGhlIG5vZGUgYWJvdmUgaGFzIG5vIGNvbnRlbnQgYW5kIHRoZSBub2RlIGJlbG93IGlzXG4gIC8vIHNlbGVjdGFibGUsIGRlbGV0ZSB0aGUgbm9kZSBhYm92ZSBhbmQgc2VsZWN0IHRoZSBvbmUgYmVsb3cuXG4gIGlmICgkY3Vyc29yLnBhcmVudC5jb250ZW50LnNpemUgPT0gMCAmJlxuICAgICAgKHRleHRibG9ja0F0KGFmdGVyLCBcInN0YXJ0XCIpIHx8IE5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKGFmdGVyKSkpIHtcbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIHZhciB0ciA9IHN0YXRlLnRyLmRlbGV0ZVJhbmdlKCRjdXJzb3IuYmVmb3JlKCksICRjdXJzb3IuYWZ0ZXIoKSk7XG4gICAgICB0ci5zZXRTZWxlY3Rpb24odGV4dGJsb2NrQXQoYWZ0ZXIsIFwic3RhcnRcIikgPyBTZWxlY3Rpb24uZmluZEZyb20odHIuZG9jLnJlc29sdmUodHIubWFwcGluZy5tYXAoJGN1dC5wb3MpKSwgMSlcbiAgICAgICAgICAgICAgICAgICAgICA6IE5vZGVTZWxlY3Rpb24uY3JlYXRlKHRyLmRvYywgdHIubWFwcGluZy5tYXAoJGN1dC5wb3MpKSk7XG4gICAgICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIElmIHRoZSBuZXh0IG5vZGUgaXMgYW4gYXRvbSwgZGVsZXRlIGl0XG4gIGlmIChhZnRlci5pc0F0b20gJiYgJGN1dC5kZXB0aCA9PSAkY3Vyc29yLmRlcHRoIC0gMSkge1xuICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5kZWxldGUoJGN1dC5wb3MsICRjdXQucG9zICsgYWZ0ZXIubm9kZVNpemUpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSwgP0VkaXRvclZpZXcpIOKGkiBib29sXG4vLyBXaGVuIHRoZSBzZWxlY3Rpb24gaXMgZW1wdHkgYW5kIGF0IHRoZSBlbmQgb2YgYSB0ZXh0YmxvY2ssIHNlbGVjdFxuLy8gdGhlIG5vZGUgY29taW5nIGFmdGVyIHRoYXQgdGV4dGJsb2NrLCBpZiBwb3NzaWJsZS4gVGhpcyBpcyBpbnRlbmRlZFxuLy8gdG8gYmUgYm91bmQgdG8ga2V5cyBsaWtlIGRlbGV0ZSwgYWZ0ZXJcbi8vIFtgam9pbkZvcndhcmRgXSgjY29tbWFuZHMuam9pbkZvcndhcmQpIGFuZCBzaW1pbGFyIGRlbGV0aW5nXG4vLyBjb21tYW5kcywgdG8gcHJvdmlkZSBhIGZhbGwtYmFjayBiZWhhdmlvciB3aGVuIHRoZSBzY2hlbWEgZG9lc24ndFxuLy8gYWxsb3cgZGVsZXRpb24gYXQgdGhlIHNlbGVjdGVkIHBvaW50LlxuZnVuY3Rpb24gc2VsZWN0Tm9kZUZvcndhcmQoc3RhdGUsIGRpc3BhdGNoLCB2aWV3KSB7XG4gIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gIHZhciAkaGVhZCA9IHJlZi4kaGVhZDtcbiAgdmFyIGVtcHR5ID0gcmVmLmVtcHR5O1xuICB2YXIgJGN1dCA9ICRoZWFkO1xuICBpZiAoIWVtcHR5KSB7IHJldHVybiBmYWxzZSB9XG4gIGlmICgkaGVhZC5wYXJlbnQuaXNUZXh0YmxvY2spIHtcbiAgICBpZiAodmlldyA/ICF2aWV3LmVuZE9mVGV4dGJsb2NrKFwiZm9yd2FyZFwiLCBzdGF0ZSkgOiAkaGVhZC5wYXJlbnRPZmZzZXQgPCAkaGVhZC5wYXJlbnQuY29udGVudC5zaXplKVxuICAgICAgeyByZXR1cm4gZmFsc2UgfVxuICAgICRjdXQgPSBmaW5kQ3V0QWZ0ZXIoJGhlYWQpO1xuICB9XG4gIHZhciBub2RlID0gJGN1dCAmJiAkY3V0Lm5vZGVBZnRlcjtcbiAgaWYgKCFub2RlIHx8ICFOb2RlU2VsZWN0aW9uLmlzU2VsZWN0YWJsZShub2RlKSkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpXG4gICAgeyBkaXNwYXRjaChzdGF0ZS50ci5zZXRTZWxlY3Rpb24oTm9kZVNlbGVjdGlvbi5jcmVhdGUoc3RhdGUuZG9jLCAkY3V0LnBvcykpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbmRDdXRBZnRlcigkcG9zKSB7XG4gIGlmICghJHBvcy5wYXJlbnQudHlwZS5zcGVjLmlzb2xhdGluZykgeyBmb3IgKHZhciBpID0gJHBvcy5kZXB0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIHBhcmVudCA9ICRwb3Mubm9kZShpKTtcbiAgICBpZiAoJHBvcy5pbmRleChpKSArIDEgPCBwYXJlbnQuY2hpbGRDb3VudCkgeyByZXR1cm4gJHBvcy5kb2MucmVzb2x2ZSgkcG9zLmFmdGVyKGkgKyAxKSkgfVxuICAgIGlmIChwYXJlbnQudHlwZS5zcGVjLmlzb2xhdGluZykgeyBicmVhayB9XG4gIH0gfVxuICByZXR1cm4gbnVsbFxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIEpvaW4gdGhlIHNlbGVjdGVkIGJsb2NrIG9yLCBpZiB0aGVyZSBpcyBhIHRleHQgc2VsZWN0aW9uLCB0aGVcbi8vIGNsb3Nlc3QgYW5jZXN0b3IgYmxvY2sgb2YgdGhlIHNlbGVjdGlvbiB0aGF0IGNhbiBiZSBqb2luZWQsIHdpdGhcbi8vIHRoZSBzaWJsaW5nIGFib3ZlIGl0LlxuZnVuY3Rpb24gam9pblVwKHN0YXRlLCBkaXNwYXRjaCkge1xuICB2YXIgc2VsID0gc3RhdGUuc2VsZWN0aW9uLCBub2RlU2VsID0gc2VsIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiwgcG9pbnQ7XG4gIGlmIChub2RlU2VsKSB7XG4gICAgaWYgKHNlbC5ub2RlLmlzVGV4dGJsb2NrIHx8ICFjYW5Kb2luKHN0YXRlLmRvYywgc2VsLmZyb20pKSB7IHJldHVybiBmYWxzZSB9XG4gICAgcG9pbnQgPSBzZWwuZnJvbTtcbiAgfSBlbHNlIHtcbiAgICBwb2ludCA9IGpvaW5Qb2ludChzdGF0ZS5kb2MsIHNlbC5mcm9tLCAtMSk7XG4gICAgaWYgKHBvaW50ID09IG51bGwpIHsgcmV0dXJuIGZhbHNlIH1cbiAgfVxuICBpZiAoZGlzcGF0Y2gpIHtcbiAgICB2YXIgdHIgPSBzdGF0ZS50ci5qb2luKHBvaW50KTtcbiAgICBpZiAobm9kZVNlbCkgeyB0ci5zZXRTZWxlY3Rpb24oTm9kZVNlbGVjdGlvbi5jcmVhdGUodHIuZG9jLCBwb2ludCAtIHN0YXRlLmRvYy5yZXNvbHZlKHBvaW50KS5ub2RlQmVmb3JlLm5vZGVTaXplKSk7IH1cbiAgICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIEpvaW4gdGhlIHNlbGVjdGVkIGJsb2NrLCBvciB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiB0aGUgc2VsZWN0aW9uXG4vLyB0aGF0IGNhbiBiZSBqb2luZWQsIHdpdGggdGhlIHNpYmxpbmcgYWZ0ZXIgaXQuXG5mdW5jdGlvbiBqb2luRG93bihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgdmFyIHNlbCA9IHN0YXRlLnNlbGVjdGlvbiwgcG9pbnQ7XG4gIGlmIChzZWwgaW5zdGFuY2VvZiBOb2RlU2VsZWN0aW9uKSB7XG4gICAgaWYgKHNlbC5ub2RlLmlzVGV4dGJsb2NrIHx8ICFjYW5Kb2luKHN0YXRlLmRvYywgc2VsLnRvKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIHBvaW50ID0gc2VsLnRvO1xuICB9IGVsc2Uge1xuICAgIHBvaW50ID0gam9pblBvaW50KHN0YXRlLmRvYywgc2VsLnRvLCAxKTtcbiAgICBpZiAocG9pbnQgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2UgfVxuICB9XG4gIGlmIChkaXNwYXRjaClcbiAgICB7IGRpc3BhdGNoKHN0YXRlLnRyLmpvaW4ocG9pbnQpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gTGlmdCB0aGUgc2VsZWN0ZWQgYmxvY2ssIG9yIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGJsb2NrIG9mIHRoZVxuLy8gc2VsZWN0aW9uIHRoYXQgY2FuIGJlIGxpZnRlZCwgb3V0IG9mIGl0cyBwYXJlbnQgbm9kZS5cbmZ1bmN0aW9uIGxpZnQoc3RhdGUsIGRpc3BhdGNoKSB7XG4gIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gIHZhciAkZnJvbSA9IHJlZi4kZnJvbTtcbiAgdmFyICR0byA9IHJlZi4kdG87XG4gIHZhciByYW5nZSA9ICRmcm9tLmJsb2NrUmFuZ2UoJHRvKSwgdGFyZ2V0ID0gcmFuZ2UgJiYgbGlmdFRhcmdldChyYW5nZSk7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIubGlmdChyYW5nZSwgdGFyZ2V0KS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIElmIHRoZSBzZWxlY3Rpb24gaXMgaW4gYSBub2RlIHdob3NlIHR5cGUgaGFzIGEgdHJ1dGh5XG4vLyBbYGNvZGVgXSgjbW9kZWwuTm9kZVNwZWMuY29kZSkgcHJvcGVydHkgaW4gaXRzIHNwZWMsIHJlcGxhY2UgdGhlXG4vLyBzZWxlY3Rpb24gd2l0aCBhIG5ld2xpbmUgY2hhcmFjdGVyLlxuZnVuY3Rpb24gbmV3bGluZUluQ29kZShzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgdmFyICRoZWFkID0gcmVmLiRoZWFkO1xuICB2YXIgJGFuY2hvciA9IHJlZi4kYW5jaG9yO1xuICBpZiAoISRoZWFkLnBhcmVudC50eXBlLnNwZWMuY29kZSB8fCAhJGhlYWQuc2FtZVBhcmVudCgkYW5jaG9yKSkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuaW5zZXJ0VGV4dChcIlxcblwiKS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QmxvY2tBdChtYXRjaCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoLmVkZ2VDb3VudDsgaSsrKSB7XG4gICAgdmFyIHJlZiA9IG1hdGNoLmVkZ2UoaSk7XG4gICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICBpZiAodHlwZS5pc1RleHRibG9jayAmJiAhdHlwZS5oYXNSZXF1aXJlZEF0dHJzKCkpIHsgcmV0dXJuIHR5cGUgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gV2hlbiB0aGUgc2VsZWN0aW9uIGlzIGluIGEgbm9kZSB3aXRoIGEgdHJ1dGh5XG4vLyBbYGNvZGVgXSgjbW9kZWwuTm9kZVNwZWMuY29kZSkgcHJvcGVydHkgaW4gaXRzIHNwZWMsIGNyZWF0ZSBhXG4vLyBkZWZhdWx0IGJsb2NrIGFmdGVyIHRoZSBjb2RlIGJsb2NrLCBhbmQgbW92ZSB0aGUgY3Vyc29yIHRoZXJlLlxuZnVuY3Rpb24gZXhpdENvZGUoc3RhdGUsIGRpc3BhdGNoKSB7XG4gIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gIHZhciAkaGVhZCA9IHJlZi4kaGVhZDtcbiAgdmFyICRhbmNob3IgPSByZWYuJGFuY2hvcjtcbiAgaWYgKCEkaGVhZC5wYXJlbnQudHlwZS5zcGVjLmNvZGUgfHwgISRoZWFkLnNhbWVQYXJlbnQoJGFuY2hvcikpIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyIGFib3ZlID0gJGhlYWQubm9kZSgtMSksIGFmdGVyID0gJGhlYWQuaW5kZXhBZnRlcigtMSksIHR5cGUgPSBkZWZhdWx0QmxvY2tBdChhYm92ZS5jb250ZW50TWF0Y2hBdChhZnRlcikpO1xuICBpZiAoIWFib3ZlLmNhblJlcGxhY2VXaXRoKGFmdGVyLCBhZnRlciwgdHlwZSkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKGRpc3BhdGNoKSB7XG4gICAgdmFyIHBvcyA9ICRoZWFkLmFmdGVyKCksIHRyID0gc3RhdGUudHIucmVwbGFjZVdpdGgocG9zLCBwb3MsIHR5cGUuY3JlYXRlQW5kRmlsbCgpKTtcbiAgICB0ci5zZXRTZWxlY3Rpb24oU2VsZWN0aW9uLm5lYXIodHIuZG9jLnJlc29sdmUocG9zKSwgMSkpO1xuICAgIGRpc3BhdGNoKHRyLnNjcm9sbEludG9WaWV3KCkpO1xuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gSWYgYSBibG9jayBub2RlIGlzIHNlbGVjdGVkLCBjcmVhdGUgYW4gZW1wdHkgcGFyYWdyYXBoIGJlZm9yZSAoaWZcbi8vIGl0IGlzIGl0cyBwYXJlbnQncyBmaXJzdCBjaGlsZCkgb3IgYWZ0ZXIgaXQuXG5mdW5jdGlvbiBjcmVhdGVQYXJhZ3JhcGhOZWFyKHN0YXRlLCBkaXNwYXRjaCkge1xuICB2YXIgc2VsID0gc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgJGZyb20gPSBzZWwuJGZyb207XG4gIHZhciAkdG8gPSBzZWwuJHRvO1xuICBpZiAoc2VsIGluc3RhbmNlb2YgQWxsU2VsZWN0aW9uIHx8ICRmcm9tLnBhcmVudC5pbmxpbmVDb250ZW50IHx8ICR0by5wYXJlbnQuaW5saW5lQ29udGVudCkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgdHlwZSA9IGRlZmF1bHRCbG9ja0F0KCR0by5wYXJlbnQuY29udGVudE1hdGNoQXQoJHRvLmluZGV4QWZ0ZXIoKSkpO1xuICBpZiAoIXR5cGUgfHwgIXR5cGUuaXNUZXh0YmxvY2spIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKGRpc3BhdGNoKSB7XG4gICAgdmFyIHNpZGUgPSAoISRmcm9tLnBhcmVudE9mZnNldCAmJiAkdG8uaW5kZXgoKSA8ICR0by5wYXJlbnQuY2hpbGRDb3VudCA/ICRmcm9tIDogJHRvKS5wb3M7XG4gICAgdmFyIHRyID0gc3RhdGUudHIuaW5zZXJ0KHNpZGUsIHR5cGUuY3JlYXRlQW5kRmlsbCgpKTtcbiAgICB0ci5zZXRTZWxlY3Rpb24oVGV4dFNlbGVjdGlvbi5jcmVhdGUodHIuZG9jLCBzaWRlICsgMSkpO1xuICAgIGRpc3BhdGNoKHRyLnNjcm9sbEludG9WaWV3KCkpO1xuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gSWYgdGhlIGN1cnNvciBpcyBpbiBhbiBlbXB0eSB0ZXh0YmxvY2sgdGhhdCBjYW4gYmUgbGlmdGVkLCBsaWZ0IHRoZVxuLy8gYmxvY2suXG5mdW5jdGlvbiBsaWZ0RW1wdHlCbG9jayhzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgdmFyICRjdXJzb3IgPSByZWYuJGN1cnNvcjtcbiAgaWYgKCEkY3Vyc29yIHx8ICRjdXJzb3IucGFyZW50LmNvbnRlbnQuc2l6ZSkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoJGN1cnNvci5kZXB0aCA+IDEgJiYgJGN1cnNvci5hZnRlcigpICE9ICRjdXJzb3IuZW5kKC0xKSkge1xuICAgIHZhciBiZWZvcmUgPSAkY3Vyc29yLmJlZm9yZSgpO1xuICAgIGlmIChjYW5TcGxpdChzdGF0ZS5kb2MsIGJlZm9yZSkpIHtcbiAgICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5zcGxpdChiZWZvcmUpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICB2YXIgcmFuZ2UgPSAkY3Vyc29yLmJsb2NrUmFuZ2UoKSwgdGFyZ2V0ID0gcmFuZ2UgJiYgbGlmdFRhcmdldChyYW5nZSk7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIubGlmdChyYW5nZSwgdGFyZ2V0KS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIFNwbGl0IHRoZSBwYXJlbnQgYmxvY2sgb2YgdGhlIHNlbGVjdGlvbi4gSWYgdGhlIHNlbGVjdGlvbiBpcyBhIHRleHRcbi8vIHNlbGVjdGlvbiwgYWxzbyBkZWxldGUgaXRzIGNvbnRlbnQuXG5mdW5jdGlvbiBzcGxpdEJsb2NrKHN0YXRlLCBkaXNwYXRjaCkge1xuICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgJGZyb20gPSByZWYuJGZyb207XG4gIHZhciAkdG8gPSByZWYuJHRvO1xuICBpZiAoc3RhdGUuc2VsZWN0aW9uIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiAmJiBzdGF0ZS5zZWxlY3Rpb24ubm9kZS5pc0Jsb2NrKSB7XG4gICAgaWYgKCEkZnJvbS5wYXJlbnRPZmZzZXQgfHwgIWNhblNwbGl0KHN0YXRlLmRvYywgJGZyb20ucG9zKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5zcGxpdCgkZnJvbS5wb3MpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmICghJGZyb20ucGFyZW50LmlzQmxvY2spIHsgcmV0dXJuIGZhbHNlIH1cblxuICBpZiAoZGlzcGF0Y2gpIHtcbiAgICB2YXIgYXRFbmQgPSAkdG8ucGFyZW50T2Zmc2V0ID09ICR0by5wYXJlbnQuY29udGVudC5zaXplO1xuICAgIHZhciB0ciA9IHN0YXRlLnRyO1xuICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uIHx8IHN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEFsbFNlbGVjdGlvbikgeyB0ci5kZWxldGVTZWxlY3Rpb24oKTsgfVxuICAgIHZhciBkZWZsdCA9ICRmcm9tLmRlcHRoID09IDAgPyBudWxsIDogZGVmYXVsdEJsb2NrQXQoJGZyb20ubm9kZSgtMSkuY29udGVudE1hdGNoQXQoJGZyb20uaW5kZXhBZnRlcigtMSkpKTtcbiAgICB2YXIgdHlwZXMgPSBhdEVuZCAmJiBkZWZsdCA/IFt7dHlwZTogZGVmbHR9XSA6IG51bGw7XG4gICAgdmFyIGNhbiA9IGNhblNwbGl0KHRyLmRvYywgdHIubWFwcGluZy5tYXAoJGZyb20ucG9zKSwgMSwgdHlwZXMpO1xuICAgIGlmICghdHlwZXMgJiYgIWNhbiAmJiBjYW5TcGxpdCh0ci5kb2MsIHRyLm1hcHBpbmcubWFwKCRmcm9tLnBvcyksIDEsIGRlZmx0ICYmIFt7dHlwZTogZGVmbHR9XSkpIHtcbiAgICAgIHR5cGVzID0gW3t0eXBlOiBkZWZsdH1dO1xuICAgICAgY2FuID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNhbikge1xuICAgICAgdHIuc3BsaXQodHIubWFwcGluZy5tYXAoJGZyb20ucG9zKSwgMSwgdHlwZXMpO1xuICAgICAgaWYgKCFhdEVuZCAmJiAhJGZyb20ucGFyZW50T2Zmc2V0ICYmICRmcm9tLnBhcmVudC50eXBlICE9IGRlZmx0ICYmXG4gICAgICAgICAgJGZyb20ubm9kZSgtMSkuY2FuUmVwbGFjZSgkZnJvbS5pbmRleCgtMSksICRmcm9tLmluZGV4QWZ0ZXIoLTEpLCBGcmFnbWVudC5mcm9tKFtkZWZsdC5jcmVhdGUoKSwgJGZyb20ucGFyZW50XSkpKVxuICAgICAgICB7IHRyLnNldE5vZGVNYXJrdXAodHIubWFwcGluZy5tYXAoJGZyb20uYmVmb3JlKCkpLCBkZWZsdCk7IH1cbiAgICB9XG4gICAgZGlzcGF0Y2godHIuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKEVkaXRvclN0YXRlLCA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sXG4vLyBBY3RzIGxpa2UgW2BzcGxpdEJsb2NrYF0oI2NvbW1hbmRzLnNwbGl0QmxvY2spLCBidXQgd2l0aG91dFxuLy8gcmVzZXR0aW5nIHRoZSBzZXQgb2YgYWN0aXZlIG1hcmtzIGF0IHRoZSBjdXJzb3IuXG5mdW5jdGlvbiBzcGxpdEJsb2NrS2VlcE1hcmtzKHN0YXRlLCBkaXNwYXRjaCkge1xuICByZXR1cm4gc3BsaXRCbG9jayhzdGF0ZSwgZGlzcGF0Y2ggJiYgKGZ1bmN0aW9uICh0cikge1xuICAgIHZhciBtYXJrcyA9IHN0YXRlLnN0b3JlZE1hcmtzIHx8IChzdGF0ZS5zZWxlY3Rpb24uJHRvLnBhcmVudE9mZnNldCAmJiBzdGF0ZS5zZWxlY3Rpb24uJGZyb20ubWFya3MoKSk7XG4gICAgaWYgKG1hcmtzKSB7IHRyLmVuc3VyZU1hcmtzKG1hcmtzKTsgfVxuICAgIGRpc3BhdGNoKHRyKTtcbiAgfSkpXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gTW92ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSBub2RlIHdyYXBwaW5nIHRoZSBjdXJyZW50IHNlbGVjdGlvbiwgaWZcbi8vIGFueS4gKFdpbGwgbm90IHNlbGVjdCB0aGUgZG9jdW1lbnQgbm9kZS4pXG5mdW5jdGlvbiBzZWxlY3RQYXJlbnROb2RlKHN0YXRlLCBkaXNwYXRjaCkge1xuICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgJGZyb20gPSByZWYuJGZyb207XG4gIHZhciB0byA9IHJlZi50bztcbiAgdmFyIHBvcztcbiAgdmFyIHNhbWUgPSAkZnJvbS5zaGFyZWREZXB0aCh0byk7XG4gIGlmIChzYW1lID09IDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgcG9zID0gJGZyb20uYmVmb3JlKHNhbWUpO1xuICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuc2V0U2VsZWN0aW9uKE5vZGVTZWxlY3Rpb24uY3JlYXRlKHN0YXRlLmRvYywgcG9zKSkpOyB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIDo6IChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gU2VsZWN0IHRoZSB3aG9sZSBkb2N1bWVudC5cbmZ1bmN0aW9uIHNlbGVjdEFsbChzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgaWYgKGRpc3BhdGNoKSB7IGRpc3BhdGNoKHN0YXRlLnRyLnNldFNlbGVjdGlvbihuZXcgQWxsU2VsZWN0aW9uKHN0YXRlLmRvYykpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBqb2luTWF5YmVDbGVhcihzdGF0ZSwgJHBvcywgZGlzcGF0Y2gpIHtcbiAgdmFyIGJlZm9yZSA9ICRwb3Mubm9kZUJlZm9yZSwgYWZ0ZXIgPSAkcG9zLm5vZGVBZnRlciwgaW5kZXggPSAkcG9zLmluZGV4KCk7XG4gIGlmICghYmVmb3JlIHx8ICFhZnRlciB8fCAhYmVmb3JlLnR5cGUuY29tcGF0aWJsZUNvbnRlbnQoYWZ0ZXIudHlwZSkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKCFiZWZvcmUuY29udGVudC5zaXplICYmICRwb3MucGFyZW50LmNhblJlcGxhY2UoaW5kZXggLSAxLCBpbmRleCkpIHtcbiAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIuZGVsZXRlKCRwb3MucG9zIC0gYmVmb3JlLm5vZGVTaXplLCAkcG9zLnBvcykuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmICghJHBvcy5wYXJlbnQuY2FuUmVwbGFjZShpbmRleCwgaW5kZXggKyAxKSB8fCAhKGFmdGVyLmlzVGV4dGJsb2NrIHx8IGNhbkpvaW4oc3RhdGUuZG9jLCAkcG9zLnBvcykpKVxuICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKGRpc3BhdGNoKVxuICAgIHsgZGlzcGF0Y2goc3RhdGUudHJcbiAgICAgICAgICAgICAuY2xlYXJJbmNvbXBhdGlibGUoJHBvcy5wb3MsIGJlZm9yZS50eXBlLCBiZWZvcmUuY29udGVudE1hdGNoQXQoYmVmb3JlLmNoaWxkQ291bnQpKVxuICAgICAgICAgICAgIC5qb2luKCRwb3MucG9zKVxuICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldygpKTsgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBkZWxldGVCYXJyaWVyKHN0YXRlLCAkY3V0LCBkaXNwYXRjaCkge1xuICB2YXIgYmVmb3JlID0gJGN1dC5ub2RlQmVmb3JlLCBhZnRlciA9ICRjdXQubm9kZUFmdGVyLCBjb25uLCBtYXRjaDtcbiAgaWYgKGJlZm9yZS50eXBlLnNwZWMuaXNvbGF0aW5nIHx8IGFmdGVyLnR5cGUuc3BlYy5pc29sYXRpbmcpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKGpvaW5NYXliZUNsZWFyKHN0YXRlLCAkY3V0LCBkaXNwYXRjaCkpIHsgcmV0dXJuIHRydWUgfVxuXG4gIHZhciBjYW5EZWxBZnRlciA9ICRjdXQucGFyZW50LmNhblJlcGxhY2UoJGN1dC5pbmRleCgpLCAkY3V0LmluZGV4KCkgKyAxKTtcbiAgaWYgKGNhbkRlbEFmdGVyICYmXG4gICAgICAoY29ubiA9IChtYXRjaCA9IGJlZm9yZS5jb250ZW50TWF0Y2hBdChiZWZvcmUuY2hpbGRDb3VudCkpLmZpbmRXcmFwcGluZyhhZnRlci50eXBlKSkgJiZcbiAgICAgIG1hdGNoLm1hdGNoVHlwZShjb25uWzBdIHx8IGFmdGVyLnR5cGUpLnZhbGlkRW5kKSB7XG4gICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICB2YXIgZW5kID0gJGN1dC5wb3MgKyBhZnRlci5ub2RlU2l6ZSwgd3JhcCA9IEZyYWdtZW50LmVtcHR5O1xuICAgICAgZm9yICh2YXIgaSA9IGNvbm4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pXG4gICAgICAgIHsgd3JhcCA9IEZyYWdtZW50LmZyb20oY29ubltpXS5jcmVhdGUobnVsbCwgd3JhcCkpOyB9XG4gICAgICB3cmFwID0gRnJhZ21lbnQuZnJvbShiZWZvcmUuY29weSh3cmFwKSk7XG4gICAgICB2YXIgdHIgPSBzdGF0ZS50ci5zdGVwKG5ldyBSZXBsYWNlQXJvdW5kU3RlcCgkY3V0LnBvcyAtIDEsIGVuZCwgJGN1dC5wb3MsIGVuZCwgbmV3IFNsaWNlKHdyYXAsIDEsIDApLCBjb25uLmxlbmd0aCwgdHJ1ZSkpO1xuICAgICAgdmFyIGpvaW5BdCA9IGVuZCArIDIgKiBjb25uLmxlbmd0aDtcbiAgICAgIGlmIChjYW5Kb2luKHRyLmRvYywgam9pbkF0KSkgeyB0ci5qb2luKGpvaW5BdCk7IH1cbiAgICAgIGRpc3BhdGNoKHRyLnNjcm9sbEludG9WaWV3KCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgdmFyIHNlbEFmdGVyID0gU2VsZWN0aW9uLmZpbmRGcm9tKCRjdXQsIDEpO1xuICB2YXIgcmFuZ2UgPSBzZWxBZnRlciAmJiBzZWxBZnRlci4kZnJvbS5ibG9ja1JhbmdlKHNlbEFmdGVyLiR0byksIHRhcmdldCA9IHJhbmdlICYmIGxpZnRUYXJnZXQocmFuZ2UpO1xuICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgdGFyZ2V0ID49ICRjdXQuZGVwdGgpIHtcbiAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIubGlmdChyYW5nZSwgdGFyZ2V0KS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoY2FuRGVsQWZ0ZXIgJiYgYWZ0ZXIuaXNUZXh0YmxvY2sgJiYgdGV4dGJsb2NrQXQoYmVmb3JlLCBcImVuZFwiKSkge1xuICAgIHZhciBhdCA9IGJlZm9yZSwgd3JhcCQxID0gW107XG4gICAgZm9yICg7Oykge1xuICAgICAgd3JhcCQxLnB1c2goYXQpO1xuICAgICAgaWYgKGF0LmlzVGV4dGJsb2NrKSB7IGJyZWFrIH1cbiAgICAgIGF0ID0gYXQubGFzdENoaWxkO1xuICAgIH1cbiAgICBpZiAoYXQuY2FuUmVwbGFjZShhdC5jaGlsZENvdW50LCBhdC5jaGlsZENvdW50LCBhZnRlci5jb250ZW50KSkge1xuICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgIHZhciBlbmQkMSA9IEZyYWdtZW50LmVtcHR5O1xuICAgICAgICBmb3IgKHZhciBpJDEgPSB3cmFwJDEubGVuZ3RoIC0gMTsgaSQxID49IDA7IGkkMS0tKSB7IGVuZCQxID0gRnJhZ21lbnQuZnJvbSh3cmFwJDFbaSQxXS5jb3B5KGVuZCQxKSk7IH1cbiAgICAgICAgdmFyIHRyJDEgPSBzdGF0ZS50ci5zdGVwKG5ldyBSZXBsYWNlQXJvdW5kU3RlcCgkY3V0LnBvcyAtIHdyYXAkMS5sZW5ndGgsICRjdXQucG9zICsgYWZ0ZXIubm9kZVNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjdXQucG9zICsgMSwgJGN1dC5wb3MgKyBhZnRlci5ub2RlU2l6ZSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTbGljZShlbmQkMSwgd3JhcCQxLmxlbmd0aCwgMCksIDAsIHRydWUpKTtcbiAgICAgICAgZGlzcGF0Y2godHIkMS5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIFBhcmFtZXRlcml6ZWQgY29tbWFuZHNcblxuLy8gOjogKE5vZGVUeXBlLCA/T2JqZWN0KSDihpIgKHN0YXRlOiBFZGl0b3JTdGF0ZSwgZGlzcGF0Y2g6ID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIFdyYXAgdGhlIHNlbGVjdGlvbiBpbiBhIG5vZGUgb2YgdGhlIGdpdmVuIHR5cGUgd2l0aCB0aGUgZ2l2ZW5cbi8vIGF0dHJpYnV0ZXMuXG5mdW5jdGlvbiB3cmFwSW4obm9kZVR5cGUsIGF0dHJzKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIHZhciAkZnJvbSA9IHJlZi4kZnJvbTtcbiAgICB2YXIgJHRvID0gcmVmLiR0bztcbiAgICB2YXIgcmFuZ2UgPSAkZnJvbS5ibG9ja1JhbmdlKCR0byksIHdyYXBwaW5nID0gcmFuZ2UgJiYgZmluZFdyYXBwaW5nKHJhbmdlLCBub2RlVHlwZSwgYXR0cnMpO1xuICAgIGlmICghd3JhcHBpbmcpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2goc3RhdGUudHIud3JhcChyYW5nZSwgd3JhcHBpbmcpLnNjcm9sbEludG9WaWV3KCkpOyB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG4vLyA6OiAoTm9kZVR5cGUsID9PYmplY3QpIOKGkiAoc3RhdGU6IEVkaXRvclN0YXRlLCBkaXNwYXRjaDogPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gUmV0dXJucyBhIGNvbW1hbmQgdGhhdCB0cmllcyB0byBzZXQgdGhlIHNlbGVjdGVkIHRleHRibG9ja3MgdG8gdGhlXG4vLyBnaXZlbiBub2RlIHR5cGUgd2l0aCB0aGUgZ2l2ZW4gYXR0cmlidXRlcy5cbmZ1bmN0aW9uIHNldEJsb2NrVHlwZShub2RlVHlwZSwgYXR0cnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgdmFyIGZyb20gPSByZWYuZnJvbTtcbiAgICB2YXIgdG8gPSByZWYudG87XG4gICAgdmFyIGFwcGxpY2FibGUgPSBmYWxzZTtcbiAgICBzdGF0ZS5kb2Mubm9kZXNCZXR3ZWVuKGZyb20sIHRvLCBmdW5jdGlvbiAobm9kZSwgcG9zKSB7XG4gICAgICBpZiAoYXBwbGljYWJsZSkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgaWYgKCFub2RlLmlzVGV4dGJsb2NrIHx8IG5vZGUuaGFzTWFya3VwKG5vZGVUeXBlLCBhdHRycykpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChub2RlLnR5cGUgPT0gbm9kZVR5cGUpIHtcbiAgICAgICAgYXBwbGljYWJsZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgJHBvcyA9IHN0YXRlLmRvYy5yZXNvbHZlKHBvcyksIGluZGV4ID0gJHBvcy5pbmRleCgpO1xuICAgICAgICBhcHBsaWNhYmxlID0gJHBvcy5wYXJlbnQuY2FuUmVwbGFjZVdpdGgoaW5kZXgsIGluZGV4ICsgMSwgbm9kZVR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYXBwbGljYWJsZSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5zZXRCbG9ja1R5cGUoZnJvbSwgdG8sIG5vZGVUeXBlLCBhdHRycykuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIG1hcmtBcHBsaWVzKGRvYywgcmFuZ2VzLCB0eXBlKSB7XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBpICkge1xuICAgIHZhciByZWYgPSByYW5nZXNbaV07XG4gICAgdmFyICRmcm9tID0gcmVmLiRmcm9tO1xuICAgIHZhciAkdG8gPSByZWYuJHRvO1xuICAgIHZhciBjYW4gPSAkZnJvbS5kZXB0aCA9PSAwID8gZG9jLnR5cGUuYWxsb3dzTWFya1R5cGUodHlwZSkgOiBmYWxzZTtcbiAgICBkb2Mubm9kZXNCZXR3ZWVuKCRmcm9tLnBvcywgJHRvLnBvcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChjYW4pIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIGNhbiA9IG5vZGUuaW5saW5lQ29udGVudCAmJiBub2RlLnR5cGUuYWxsb3dzTWFya1R5cGUodHlwZSk7XG4gICAgfSk7XG4gICAgaWYgKGNhbikgeyByZXR1cm4geyB2OiB0cnVlIH0gfVxuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJldHVybmVkID0gbG9vcCggaSApO1xuXG4gICAgaWYgKCByZXR1cm5lZCApIHJldHVybiByZXR1cm5lZC52O1xuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyA6OiAoTWFya1R5cGUsID9PYmplY3QpIOKGkiAoc3RhdGU6IEVkaXRvclN0YXRlLCBkaXNwYXRjaDogPyh0cjogVHJhbnNhY3Rpb24pKSDihpIgYm9vbFxuLy8gQ3JlYXRlIGEgY29tbWFuZCBmdW5jdGlvbiB0aGF0IHRvZ2dsZXMgdGhlIGdpdmVuIG1hcmsgd2l0aCB0aGVcbi8vIGdpdmVuIGF0dHJpYnV0ZXMuIFdpbGwgcmV0dXJuIGBmYWxzZWAgd2hlbiB0aGUgY3VycmVudCBzZWxlY3Rpb25cbi8vIGRvZXNuJ3Qgc3VwcG9ydCB0aGF0IG1hcmsuIFRoaXMgd2lsbCByZW1vdmUgdGhlIG1hcmsgaWYgYW55IG1hcmtzXG4vLyBvZiB0aGF0IHR5cGUgZXhpc3QgaW4gdGhlIHNlbGVjdGlvbiwgb3IgYWRkIGl0IG90aGVyd2lzZS4gSWYgdGhlXG4vLyBzZWxlY3Rpb24gaXMgZW1wdHksIHRoaXMgYXBwbGllcyB0byB0aGUgW3N0b3JlZFxuLy8gbWFya3NdKCNzdGF0ZS5FZGl0b3JTdGF0ZS5zdG9yZWRNYXJrcykgaW5zdGVhZCBvZiBhIHJhbmdlIG9mIHRoZVxuLy8gZG9jdW1lbnQuXG5mdW5jdGlvbiB0b2dnbGVNYXJrKG1hcmtUeXBlLCBhdHRycykge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoKSB7XG4gICAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICB2YXIgZW1wdHkgPSByZWYuZW1wdHk7XG4gICAgdmFyICRjdXJzb3IgPSByZWYuJGN1cnNvcjtcbiAgICB2YXIgcmFuZ2VzID0gcmVmLnJhbmdlcztcbiAgICBpZiAoKGVtcHR5ICYmICEkY3Vyc29yKSB8fCAhbWFya0FwcGxpZXMoc3RhdGUuZG9jLCByYW5nZXMsIG1hcmtUeXBlKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgaWYgKCRjdXJzb3IpIHtcbiAgICAgICAgaWYgKG1hcmtUeXBlLmlzSW5TZXQoc3RhdGUuc3RvcmVkTWFya3MgfHwgJGN1cnNvci5tYXJrcygpKSlcbiAgICAgICAgICB7IGRpc3BhdGNoKHN0YXRlLnRyLnJlbW92ZVN0b3JlZE1hcmsobWFya1R5cGUpKTsgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgeyBkaXNwYXRjaChzdGF0ZS50ci5hZGRTdG9yZWRNYXJrKG1hcmtUeXBlLmNyZWF0ZShhdHRycykpKTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGhhcyA9IGZhbHNlLCB0ciA9IHN0YXRlLnRyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgIWhhcyAmJiBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHJlZiQxID0gcmFuZ2VzW2ldO1xuICAgICAgICAgIHZhciAkZnJvbSA9IHJlZiQxLiRmcm9tO1xuICAgICAgICAgIHZhciAkdG8gPSByZWYkMS4kdG87XG4gICAgICAgICAgaGFzID0gc3RhdGUuZG9jLnJhbmdlSGFzTWFyaygkZnJvbS5wb3MsICR0by5wb3MsIG1hcmtUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCByYW5nZXMubGVuZ3RoOyBpJDErKykge1xuICAgICAgICAgIHZhciByZWYkMiA9IHJhbmdlc1tpJDFdO1xuICAgICAgICAgIHZhciAkZnJvbSQxID0gcmVmJDIuJGZyb207XG4gICAgICAgICAgdmFyICR0byQxID0gcmVmJDIuJHRvO1xuICAgICAgICAgIGlmIChoYXMpIHtcbiAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoJGZyb20kMS5wb3MsICR0byQxLnBvcywgbWFya1R5cGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9ICRmcm9tJDEucG9zLCB0byA9ICR0byQxLnBvcywgc3RhcnQgPSAkZnJvbSQxLm5vZGVBZnRlciwgZW5kID0gJHRvJDEubm9kZUJlZm9yZTtcbiAgICAgICAgICAgIHZhciBzcGFjZVN0YXJ0ID0gc3RhcnQgJiYgc3RhcnQuaXNUZXh0ID8gL15cXHMqLy5leGVjKHN0YXJ0LnRleHQpWzBdLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICB2YXIgc3BhY2VFbmQgPSBlbmQgJiYgZW5kLmlzVGV4dCA/IC9cXHMqJC8uZXhlYyhlbmQudGV4dClbMF0ubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGlmIChmcm9tICsgc3BhY2VTdGFydCA8IHRvKSB7IGZyb20gKz0gc3BhY2VTdGFydDsgdG8gLT0gc3BhY2VFbmQ7IH1cbiAgICAgICAgICAgIHRyLmFkZE1hcmsoZnJvbSwgdG8sIG1hcmtUeXBlLmNyZWF0ZShhdHRycykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwRGlzcGF0Y2hGb3JKb2luKGRpc3BhdGNoLCBpc0pvaW5hYmxlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodHIpIHtcbiAgICBpZiAoIXRyLmlzR2VuZXJpYykgeyByZXR1cm4gZGlzcGF0Y2godHIpIH1cblxuICAgIHZhciByYW5nZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyLm1hcHBpbmcubWFwcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1hcCA9IHRyLm1hcHBpbmcubWFwc1tpXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmFuZ2VzLmxlbmd0aDsgaisrKVxuICAgICAgICB7IHJhbmdlc1tqXSA9IG1hcC5tYXAocmFuZ2VzW2pdKTsgfVxuICAgICAgbWFwLmZvckVhY2goZnVuY3Rpb24gKF9zLCBfZSwgZnJvbSwgdG8pIHsgcmV0dXJuIHJhbmdlcy5wdXNoKGZyb20sIHRvKTsgfSk7XG4gICAgfVxuXG4gICAgLy8gRmlndXJlIG91dCB3aGljaCBqb2luYWJsZSBwb2ludHMgZXhpc3QgaW5zaWRlIHRob3NlIHJhbmdlcyxcbiAgICAvLyBieSBjaGVja2luZyBhbGwgbm9kZSBib3VuZGFyaWVzIGluIHRoZWlyIHBhcmVudCBub2Rlcy5cbiAgICB2YXIgam9pbmFibGUgPSBbXTtcbiAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCByYW5nZXMubGVuZ3RoOyBpJDEgKz0gMikge1xuICAgICAgdmFyIGZyb20gPSByYW5nZXNbaSQxXSwgdG8gPSByYW5nZXNbaSQxICsgMV07XG4gICAgICB2YXIgJGZyb20gPSB0ci5kb2MucmVzb2x2ZShmcm9tKSwgZGVwdGggPSAkZnJvbS5zaGFyZWREZXB0aCh0byksIHBhcmVudCA9ICRmcm9tLm5vZGUoZGVwdGgpO1xuICAgICAgZm9yICh2YXIgaW5kZXggPSAkZnJvbS5pbmRleEFmdGVyKGRlcHRoKSwgcG9zID0gJGZyb20uYWZ0ZXIoZGVwdGggKyAxKTsgcG9zIDw9IHRvOyArK2luZGV4KSB7XG4gICAgICAgIHZhciBhZnRlciA9IHBhcmVudC5tYXliZUNoaWxkKGluZGV4KTtcbiAgICAgICAgaWYgKCFhZnRlcikgeyBicmVhayB9XG4gICAgICAgIGlmIChpbmRleCAmJiBqb2luYWJsZS5pbmRleE9mKHBvcykgPT0gLTEpIHtcbiAgICAgICAgICB2YXIgYmVmb3JlID0gcGFyZW50LmNoaWxkKGluZGV4IC0gMSk7XG4gICAgICAgICAgaWYgKGJlZm9yZS50eXBlID09IGFmdGVyLnR5cGUgJiYgaXNKb2luYWJsZShiZWZvcmUsIGFmdGVyKSlcbiAgICAgICAgICAgIHsgam9pbmFibGUucHVzaChwb3MpOyB9XG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IGFmdGVyLm5vZGVTaXplO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBKb2luIHRoZSBqb2luYWJsZSBwb2ludHNcbiAgICBqb2luYWJsZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhIC0gYjsgfSk7XG4gICAgZm9yICh2YXIgaSQyID0gam9pbmFibGUubGVuZ3RoIC0gMTsgaSQyID49IDA7IGkkMi0tKSB7XG4gICAgICBpZiAoY2FuSm9pbih0ci5kb2MsIGpvaW5hYmxlW2kkMl0pKSB7IHRyLmpvaW4oam9pbmFibGVbaSQyXSk7IH1cbiAgICB9XG4gICAgZGlzcGF0Y2godHIpO1xuICB9XG59XG5cbi8vIDo6ICgoc3RhdGU6IEVkaXRvclN0YXRlLCA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sLCB1bmlvbjwoYmVmb3JlOiBOb2RlLCBhZnRlcjogTm9kZSkg4oaSIGJvb2wsIFtzdHJpbmddPikg4oaSIChzdGF0ZTogRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIFdyYXAgYSBjb21tYW5kIHNvIHRoYXQsIHdoZW4gaXQgcHJvZHVjZXMgYSB0cmFuc2Zvcm0gdGhhdCBjYXVzZXNcbi8vIHR3byBqb2luYWJsZSBub2RlcyB0byBlbmQgdXAgbmV4dCB0byBlYWNoIG90aGVyLCB0aG9zZSBhcmUgam9pbmVkLlxuLy8gTm9kZXMgYXJlIGNvbnNpZGVyZWQgam9pbmFibGUgd2hlbiB0aGV5IGFyZSBvZiB0aGUgc2FtZSB0eXBlIGFuZFxuLy8gd2hlbiB0aGUgYGlzSm9pbmFibGVgIHByZWRpY2F0ZSByZXR1cm5zIHRydWUgZm9yIHRoZW0gb3IsIGlmIGFuXG4vLyBhcnJheSBvZiBzdHJpbmdzIHdhcyBwYXNzZWQsIGlmIHRoZWlyIG5vZGUgdHlwZSBuYW1lIGlzIGluIHRoYXRcbi8vIGFycmF5LlxuZnVuY3Rpb24gYXV0b0pvaW4oY29tbWFuZCwgaXNKb2luYWJsZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShpc0pvaW5hYmxlKSkge1xuICAgIHZhciB0eXBlcyA9IGlzSm9pbmFibGU7XG4gICAgaXNKb2luYWJsZSA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiB0eXBlcy5pbmRleE9mKG5vZGUudHlwZS5uYW1lKSA+IC0xOyB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGRpc3BhdGNoKSB7IHJldHVybiBjb21tYW5kKHN0YXRlLCBkaXNwYXRjaCAmJiB3cmFwRGlzcGF0Y2hGb3JKb2luKGRpc3BhdGNoLCBpc0pvaW5hYmxlKSk7IH1cbn1cblxuLy8gOjogKC4uLlsoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSwgP0VkaXRvclZpZXcpIOKGkiBib29sXSkg4oaSIChFZGl0b3JTdGF0ZSwgPyh0cjogVHJhbnNhY3Rpb24pLCA/RWRpdG9yVmlldykg4oaSIGJvb2xcbi8vIENvbWJpbmUgYSBudW1iZXIgb2YgY29tbWFuZCBmdW5jdGlvbnMgaW50byBhIHNpbmdsZSBmdW5jdGlvbiAod2hpY2hcbi8vIGNhbGxzIHRoZW0gb25lIGJ5IG9uZSB1bnRpbCBvbmUgcmV0dXJucyB0cnVlKS5cbmZ1bmN0aW9uIGNoYWluQ29tbWFuZHMoKSB7XG4gIHZhciBjb21tYW5kcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgY29tbWFuZHNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoLCB2aWV3KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKylcbiAgICAgIHsgaWYgKGNvbW1hbmRzW2ldKHN0YXRlLCBkaXNwYXRjaCwgdmlldykpIHsgcmV0dXJuIHRydWUgfSB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxudmFyIGJhY2tzcGFjZSA9IGNoYWluQ29tbWFuZHMoZGVsZXRlU2VsZWN0aW9uLCBqb2luQmFja3dhcmQsIHNlbGVjdE5vZGVCYWNrd2FyZCk7XG52YXIgZGVsID0gY2hhaW5Db21tYW5kcyhkZWxldGVTZWxlY3Rpb24sIGpvaW5Gb3J3YXJkLCBzZWxlY3ROb2RlRm9yd2FyZCk7XG5cbi8vIDo6IE9iamVjdFxuLy8gQSBiYXNpYyBrZXltYXAgY29udGFpbmluZyBiaW5kaW5ncyBub3Qgc3BlY2lmaWMgdG8gYW55IHNjaGVtYS5cbi8vIEJpbmRzIHRoZSBmb2xsb3dpbmcga2V5cyAod2hlbiBtdWx0aXBsZSBjb21tYW5kcyBhcmUgbGlzdGVkLCB0aGV5XG4vLyBhcmUgY2hhaW5lZCB3aXRoIFtgY2hhaW5Db21tYW5kc2BdKCNjb21tYW5kcy5jaGFpbkNvbW1hbmRzKSk6XG4vL1xuLy8gKiAqKkVudGVyKiogdG8gYG5ld2xpbmVJbkNvZGVgLCBgY3JlYXRlUGFyYWdyYXBoTmVhcmAsIGBsaWZ0RW1wdHlCbG9ja2AsIGBzcGxpdEJsb2NrYFxuLy8gKiAqKk1vZC1FbnRlcioqIHRvIGBleGl0Q29kZWBcbi8vICogKipCYWNrc3BhY2UqKiBhbmQgKipNb2QtQmFja3NwYWNlKiogdG8gYGRlbGV0ZVNlbGVjdGlvbmAsIGBqb2luQmFja3dhcmRgLCBgc2VsZWN0Tm9kZUJhY2t3YXJkYFxuLy8gKiAqKkRlbGV0ZSoqIGFuZCAqKk1vZC1EZWxldGUqKiB0byBgZGVsZXRlU2VsZWN0aW9uYCwgYGpvaW5Gb3J3YXJkYCwgYHNlbGVjdE5vZGVGb3J3YXJkYFxuLy8gKiAqKk1vZC1EZWxldGUqKiB0byBgZGVsZXRlU2VsZWN0aW9uYCwgYGpvaW5Gb3J3YXJkYCwgYHNlbGVjdE5vZGVGb3J3YXJkYFxuLy8gKiAqKk1vZC1hKiogdG8gYHNlbGVjdEFsbGBcbnZhciBwY0Jhc2VLZXltYXAgPSB7XG4gIFwiRW50ZXJcIjogY2hhaW5Db21tYW5kcyhuZXdsaW5lSW5Db2RlLCBjcmVhdGVQYXJhZ3JhcGhOZWFyLCBsaWZ0RW1wdHlCbG9jaywgc3BsaXRCbG9jayksXG4gIFwiTW9kLUVudGVyXCI6IGV4aXRDb2RlLFxuICBcIkJhY2tzcGFjZVwiOiBiYWNrc3BhY2UsXG4gIFwiTW9kLUJhY2tzcGFjZVwiOiBiYWNrc3BhY2UsXG4gIFwiRGVsZXRlXCI6IGRlbCxcbiAgXCJNb2QtRGVsZXRlXCI6IGRlbCxcbiAgXCJNb2QtYVwiOiBzZWxlY3RBbGxcbn07XG5cbi8vIDo6IE9iamVjdFxuLy8gQSBjb3B5IG9mIGBwY0Jhc2VLZXltYXBgIHRoYXQgYWxzbyBiaW5kcyAqKkN0cmwtaCoqIGxpa2UgQmFja3NwYWNlLFxuLy8gKipDdHJsLWQqKiBsaWtlIERlbGV0ZSwgKipBbHQtQmFja3NwYWNlKiogbGlrZSBDdHJsLUJhY2tzcGFjZSwgYW5kXG4vLyAqKkN0cmwtQWx0LUJhY2tzcGFjZSoqLCAqKkFsdC1EZWxldGUqKiwgYW5kICoqQWx0LWQqKiBsaWtlXG4vLyBDdHJsLURlbGV0ZS5cbnZhciBtYWNCYXNlS2V5bWFwID0ge1xuICBcIkN0cmwtaFwiOiBwY0Jhc2VLZXltYXBbXCJCYWNrc3BhY2VcIl0sXG4gIFwiQWx0LUJhY2tzcGFjZVwiOiBwY0Jhc2VLZXltYXBbXCJNb2QtQmFja3NwYWNlXCJdLFxuICBcIkN0cmwtZFwiOiBwY0Jhc2VLZXltYXBbXCJEZWxldGVcIl0sXG4gIFwiQ3RybC1BbHQtQmFja3NwYWNlXCI6IHBjQmFzZUtleW1hcFtcIk1vZC1EZWxldGVcIl0sXG4gIFwiQWx0LURlbGV0ZVwiOiBwY0Jhc2VLZXltYXBbXCJNb2QtRGVsZXRlXCJdLFxuICBcIkFsdC1kXCI6IHBjQmFzZUtleW1hcFtcIk1vZC1EZWxldGVcIl1cbn07XG5mb3IgKHZhciBrZXkgaW4gcGNCYXNlS2V5bWFwKSB7IG1hY0Jhc2VLZXltYXBba2V5XSA9IHBjQmFzZUtleW1hcFtrZXldOyB9XG5cbi8vIGRlY2xhcmUgZ2xvYmFsOiBvcywgbmF2aWdhdG9yXG52YXIgbWFjID0gdHlwZW9mIG5hdmlnYXRvciAhPSBcInVuZGVmaW5lZFwiID8gL01hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pXG4gICAgICAgICAgOiB0eXBlb2Ygb3MgIT0gXCJ1bmRlZmluZWRcIiA/IG9zLnBsYXRmb3JtKCkgPT0gXCJkYXJ3aW5cIiA6IGZhbHNlO1xuXG4vLyA6OiBPYmplY3Rcbi8vIERlcGVuZGluZyBvbiB0aGUgZGV0ZWN0ZWQgcGxhdGZvcm0sIHRoaXMgd2lsbCBob2xkXG4vLyBbYHBjQmFzZWtleW1hcGBdKCNjb21tYW5kcy5wY0Jhc2VLZXltYXApIG9yXG4vLyBbYG1hY0Jhc2VLZXltYXBgXSgjY29tbWFuZHMubWFjQmFzZUtleW1hcCkuXG52YXIgYmFzZUtleW1hcCA9IG1hYyA/IG1hY0Jhc2VLZXltYXAgOiBwY0Jhc2VLZXltYXA7XG5cbmV4cG9ydCB7IGF1dG9Kb2luLCBiYXNlS2V5bWFwLCBjaGFpbkNvbW1hbmRzLCBjcmVhdGVQYXJhZ3JhcGhOZWFyLCBkZWxldGVTZWxlY3Rpb24sIGV4aXRDb2RlLCBqb2luQmFja3dhcmQsIGpvaW5Eb3duLCBqb2luRm9yd2FyZCwgam9pblVwLCBsaWZ0LCBsaWZ0RW1wdHlCbG9jaywgbWFjQmFzZUtleW1hcCwgbmV3bGluZUluQ29kZSwgcGNCYXNlS2V5bWFwLCBzZWxlY3RBbGwsIHNlbGVjdE5vZGVCYWNrd2FyZCwgc2VsZWN0Tm9kZUZvcndhcmQsIHNlbGVjdFBhcmVudE5vZGUsIHNldEJsb2NrVHlwZSwgc3BsaXRCbG9jaywgc3BsaXRCbG9ja0tlZXBNYXJrcywgdG9nZ2xlTWFyaywgd3JhcEluIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lcy5qcy5tYXBcbiIsImltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3Byb3NlbWlycm9yLXN0YXRlJztcbmltcG9ydCB7IGRyb3BQb2ludCB9IGZyb20gJ3Byb3NlbWlycm9yLXRyYW5zZm9ybSc7XG5cbi8vIDo6IChvcHRpb25zOiA/T2JqZWN0KSDihpIgUGx1Z2luXG4vLyBDcmVhdGUgYSBwbHVnaW4gdGhhdCwgd2hlbiBhZGRlZCB0byBhIFByb3NlTWlycm9yIGluc3RhbmNlLFxuLy8gY2F1c2VzIGEgZGVjb3JhdGlvbiB0byBzaG93IHVwIGF0IHRoZSBkcm9wIHBvc2l0aW9uIHdoZW4gc29tZXRoaW5nXG4vLyBpcyBkcmFnZ2VkIG92ZXIgdGhlIGVkaXRvci5cbi8vXG4vLyAgIG9wdGlvbnM6Oi0gVGhlc2Ugb3B0aW9ucyBhcmUgc3VwcG9ydGVkOlxuLy9cbi8vICAgICBjb2xvcjo6ID9zdHJpbmdcbi8vICAgICBUaGUgY29sb3Igb2YgdGhlIGN1cnNvci4gRGVmYXVsdHMgdG8gYGJsYWNrYC5cbi8vXG4vLyAgICAgd2lkdGg6OiA/bnVtYmVyXG4vLyAgICAgVGhlIHByZWNpc2Ugd2lkdGggb2YgdGhlIGN1cnNvciBpbiBwaXhlbHMuIERlZmF1bHRzIHRvIDEuXG4vL1xuLy8gICAgIGNsYXNzOjogP3N0cmluZ1xuLy8gICAgIEEgQ1NTIGNsYXNzIG5hbWUgdG8gYWRkIHRvIHRoZSBjdXJzb3IgZWxlbWVudC5cbmZ1bmN0aW9uIGRyb3BDdXJzb3Iob3B0aW9ucykge1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICByZXR1cm4gbmV3IFBsdWdpbih7XG4gICAgdmlldzogZnVuY3Rpb24gdmlldyhlZGl0b3JWaWV3KSB7IHJldHVybiBuZXcgRHJvcEN1cnNvclZpZXcoZWRpdG9yVmlldywgb3B0aW9ucykgfVxuICB9KVxufVxuXG52YXIgRHJvcEN1cnNvclZpZXcgPSBmdW5jdGlvbiBEcm9wQ3Vyc29yVmlldyhlZGl0b3JWaWV3LCBvcHRpb25zKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHRoaXMuZWRpdG9yVmlldyA9IGVkaXRvclZpZXc7XG4gIHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDE7XG4gIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yIHx8IFwiYmxhY2tcIjtcbiAgdGhpcy5jbGFzcyA9IG9wdGlvbnMuY2xhc3M7XG4gIHRoaXMuY3Vyc29yUG9zID0gbnVsbDtcbiAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICB0aGlzLmhhbmRsZXJzID0gW1wiZHJhZ292ZXJcIiwgXCJkcmFnZW5kXCIsIFwiZHJvcFwiLCBcImRyYWdsZWF2ZVwiXS5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiB0aGlzJDFbbmFtZV0oZSk7IH07XG4gICAgZWRpdG9yVmlldy5kb20uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICByZXR1cm4ge25hbWU6IG5hbWUsIGhhbmRsZXI6IGhhbmRsZXJ9XG4gIH0pO1xufTtcblxuRHJvcEN1cnNvclZpZXcucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB0aGlzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgdmFyIG5hbWUgPSByZWYubmFtZTtcbiAgICAgIHZhciBoYW5kbGVyID0gcmVmLmhhbmRsZXI7XG5cbiAgICAgIHJldHVybiB0aGlzJDEuZWRpdG9yVmlldy5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICB9KTtcbn07XG5cbkRyb3BDdXJzb3JWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKGVkaXRvclZpZXcsIHByZXZTdGF0ZSkge1xuICBpZiAodGhpcy5jdXJzb3JQb3MgIT0gbnVsbCAmJiBwcmV2U3RhdGUuZG9jICE9IGVkaXRvclZpZXcuc3RhdGUuZG9jKSB7IHRoaXMudXBkYXRlT3ZlcmxheSgpOyB9XG59O1xuXG5Ecm9wQ3Vyc29yVmlldy5wcm90b3R5cGUuc2V0Q3Vyc29yID0gZnVuY3Rpb24gc2V0Q3Vyc29yIChwb3MpIHtcbiAgaWYgKHBvcyA9PSB0aGlzLmN1cnNvclBvcykgeyByZXR1cm4gfVxuICB0aGlzLmN1cnNvclBvcyA9IHBvcztcbiAgaWYgKHBvcyA9PSBudWxsKSB7XG4gICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheSgpO1xuICB9XG59O1xuXG5Ecm9wQ3Vyc29yVmlldy5wcm90b3R5cGUudXBkYXRlT3ZlcmxheSA9IGZ1bmN0aW9uIHVwZGF0ZU92ZXJsYXkgKCkge1xuICB2YXIgJHBvcyA9IHRoaXMuZWRpdG9yVmlldy5zdGF0ZS5kb2MucmVzb2x2ZSh0aGlzLmN1cnNvclBvcyksIHJlY3Q7XG4gIGlmICghJHBvcy5wYXJlbnQuaW5saW5lQ29udGVudCkge1xuICAgIHZhciBiZWZvcmUgPSAkcG9zLm5vZGVCZWZvcmUsIGFmdGVyID0gJHBvcy5ub2RlQWZ0ZXI7XG4gICAgaWYgKGJlZm9yZSB8fCBhZnRlcikge1xuICAgICAgdmFyIG5vZGVSZWN0ID0gdGhpcy5lZGl0b3JWaWV3Lm5vZGVET00odGhpcy5jdXJzb3JQb3MgLSAoYmVmb3JlID9iZWZvcmUubm9kZVNpemUgOiAwKSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgdG9wID0gYmVmb3JlID8gbm9kZVJlY3QuYm90dG9tIDogbm9kZVJlY3QudG9wO1xuICAgICAgaWYgKGJlZm9yZSAmJiBhZnRlcilcbiAgICAgICAgeyB0b3AgPSAodG9wICsgdGhpcy5lZGl0b3JWaWV3Lm5vZGVET00odGhpcy5jdXJzb3JQb3MpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkgLyAyOyB9XG4gICAgICByZWN0ID0ge2xlZnQ6IG5vZGVSZWN0LmxlZnQsIHJpZ2h0OiBub2RlUmVjdC5yaWdodCwgdG9wOiB0b3AgLSB0aGlzLndpZHRoIC8gMiwgYm90dG9tOiB0b3AgKyB0aGlzLndpZHRoIC8gMn07XG4gICAgfVxuICB9XG4gIGlmICghcmVjdCkge1xuICAgIHZhciBjb29yZHMgPSB0aGlzLmVkaXRvclZpZXcuY29vcmRzQXRQb3ModGhpcy5jdXJzb3JQb3MpO1xuICAgIHJlY3QgPSB7bGVmdDogY29vcmRzLmxlZnQgLSB0aGlzLndpZHRoIC8gMiwgcmlnaHQ6IGNvb3Jkcy5sZWZ0ICsgdGhpcy53aWR0aCAvIDIsIHRvcDogY29vcmRzLnRvcCwgYm90dG9tOiBjb29yZHMuYm90dG9tfTtcbiAgfVxuXG4gIHZhciBwYXJlbnQgPSB0aGlzLmVkaXRvclZpZXcuZG9tLm9mZnNldFBhcmVudDtcbiAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBwYXJlbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgaWYgKHRoaXMuY2xhc3MpIHsgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuY2xhc3M7IH1cbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlOyB6LWluZGV4OiA1MDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IGJhY2tncm91bmQtY29sb3I6IFwiICsgdGhpcy5jb2xvcjtcbiAgfVxuICB2YXIgcGFyZW50TGVmdCwgcGFyZW50VG9wO1xuICBpZiAoIXBhcmVudCB8fCBwYXJlbnQgPT0gZG9jdW1lbnQuYm9keSAmJiBnZXRDb21wdXRlZFN0eWxlKHBhcmVudCkucG9zaXRpb24gPT0gXCJzdGF0aWNcIikge1xuICAgIHBhcmVudExlZnQgPSAtcGFnZVhPZmZzZXQ7XG4gICAgcGFyZW50VG9wID0gLXBhZ2VZT2Zmc2V0O1xuICB9IGVsc2Uge1xuICAgIHZhciByZWN0JDEgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcGFyZW50TGVmdCA9IHJlY3QkMS5sZWZ0IC0gcGFyZW50LnNjcm9sbExlZnQ7XG4gICAgcGFyZW50VG9wID0gcmVjdCQxLnRvcCAtIHBhcmVudC5zY3JvbGxUb3A7XG4gIH1cbiAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSAocmVjdC5sZWZ0IC0gcGFyZW50TGVmdCkgKyBcInB4XCI7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAocmVjdC50b3AgLSBwYXJlbnRUb3ApICsgXCJweFwiO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSAocmVjdC5yaWdodCAtIHJlY3QubGVmdCkgKyBcInB4XCI7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAocmVjdC5ib3R0b20gLSByZWN0LnRvcCkgKyBcInB4XCI7XG59O1xuXG5Ecm9wQ3Vyc29yVmlldy5wcm90b3R5cGUuc2NoZWR1bGVSZW1vdmFsID0gZnVuY3Rpb24gc2NoZWR1bGVSZW1vdmFsICh0aW1lb3V0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNldEN1cnNvcihudWxsKTsgfSwgdGltZW91dCk7XG59O1xuXG5Ecm9wQ3Vyc29yVmlldy5wcm90b3R5cGUuZHJhZ292ZXIgPSBmdW5jdGlvbiBkcmFnb3ZlciAoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLmVkaXRvclZpZXcuZWRpdGFibGUpIHsgcmV0dXJuIH1cbiAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yVmlldy5wb3NBdENvb3Jkcyh7bGVmdDogZXZlbnQuY2xpZW50WCwgdG9wOiBldmVudC5jbGllbnRZfSk7XG4gIGlmIChwb3MpIHtcbiAgICB2YXIgdGFyZ2V0ID0gcG9zLnBvcztcbiAgICBpZiAodGhpcy5lZGl0b3JWaWV3LmRyYWdnaW5nICYmIHRoaXMuZWRpdG9yVmlldy5kcmFnZ2luZy5zbGljZSkge1xuICAgICAgdGFyZ2V0ID0gZHJvcFBvaW50KHRoaXMuZWRpdG9yVmlldy5zdGF0ZS5kb2MsIHRhcmdldCwgdGhpcy5lZGl0b3JWaWV3LmRyYWdnaW5nLnNsaWNlKTtcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkgeyB0YXJnZXQgPSBwb3MucG9zOyB9XG4gICAgfVxuICAgIHRoaXMuc2V0Q3Vyc29yKHRhcmdldCk7XG4gICAgdGhpcy5zY2hlZHVsZVJlbW92YWwoNTAwMCk7XG4gIH1cbn07XG5cbkRyb3BDdXJzb3JWaWV3LnByb3RvdHlwZS5kcmFnZW5kID0gZnVuY3Rpb24gZHJhZ2VuZCAoKSB7XG4gIHRoaXMuc2NoZWR1bGVSZW1vdmFsKDIwKTtcbn07XG5cbkRyb3BDdXJzb3JWaWV3LnByb3RvdHlwZS5kcm9wID0gZnVuY3Rpb24gZHJvcCAoKSB7XG4gIHRoaXMuc2NoZWR1bGVSZW1vdmFsKDIwKTtcbn07XG5cbkRyb3BDdXJzb3JWaWV3LnByb3RvdHlwZS5kcmFnbGVhdmUgPSBmdW5jdGlvbiBkcmFnbGVhdmUgKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5lZGl0b3JWaWV3LmRvbSB8fCAhdGhpcy5lZGl0b3JWaWV3LmRvbS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSlcbiAgICB7IHRoaXMuc2V0Q3Vyc29yKG51bGwpOyB9XG59O1xuXG5leHBvcnQgeyBkcm9wQ3Vyc29yIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lcy5qcy5tYXBcbiIsImltcG9ydCB7IGtleWRvd25IYW5kbGVyIH0gZnJvbSAncHJvc2VtaXJyb3Ita2V5bWFwJztcbmltcG9ydCB7IE5vZGVTZWxlY3Rpb24sIFNlbGVjdGlvbiwgUGx1Z2luLCBUZXh0U2VsZWN0aW9uIH0gZnJvbSAncHJvc2VtaXJyb3Itc3RhdGUnO1xuaW1wb3J0IHsgRGVjb3JhdGlvblNldCwgRGVjb3JhdGlvbiB9IGZyb20gJ3Byb3NlbWlycm9yLXZpZXcnO1xuaW1wb3J0IHsgU2xpY2UgfSBmcm9tICdwcm9zZW1pcnJvci1tb2RlbCc7XG5cbi8vIDo6LSBHYXAgY3Vyc29yIHNlbGVjdGlvbnMgYXJlIHJlcHJlc2VudGVkIHVzaW5nIHRoaXMgY2xhc3MuIEl0c1xuLy8gYCRhbmNob3JgIGFuZCBgJGhlYWRgIHByb3BlcnRpZXMgYm90aCBwb2ludCBhdCB0aGUgY3Vyc29yIHBvc2l0aW9uLlxudmFyIEdhcEN1cnNvciA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFNlbGVjdGlvbikge1xuICBmdW5jdGlvbiBHYXBDdXJzb3IoJHBvcykge1xuICAgIFNlbGVjdGlvbi5jYWxsKHRoaXMsICRwb3MsICRwb3MpO1xuICB9XG5cbiAgaWYgKCBTZWxlY3Rpb24gKSBHYXBDdXJzb3IuX19wcm90b19fID0gU2VsZWN0aW9uO1xuICBHYXBDdXJzb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggU2VsZWN0aW9uICYmIFNlbGVjdGlvbi5wcm90b3R5cGUgKTtcbiAgR2FwQ3Vyc29yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdhcEN1cnNvcjtcblxuICBHYXBDdXJzb3IucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAoZG9jLCBtYXBwaW5nKSB7XG4gICAgdmFyICRwb3MgPSBkb2MucmVzb2x2ZShtYXBwaW5nLm1hcCh0aGlzLmhlYWQpKTtcbiAgICByZXR1cm4gR2FwQ3Vyc29yLnZhbGlkKCRwb3MpID8gbmV3IEdhcEN1cnNvcigkcG9zKSA6IFNlbGVjdGlvbi5uZWFyKCRwb3MpXG4gIH07XG5cbiAgR2FwQ3Vyc29yLnByb3RvdHlwZS5jb250ZW50ID0gZnVuY3Rpb24gY29udGVudCAoKSB7IHJldHVybiBTbGljZS5lbXB0eSB9O1xuXG4gIEdhcEN1cnNvci5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSAob3RoZXIpIHtcbiAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBHYXBDdXJzb3IgJiYgb3RoZXIuaGVhZCA9PSB0aGlzLmhlYWRcbiAgfTtcblxuICBHYXBDdXJzb3IucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gICAgcmV0dXJuIHt0eXBlOiBcImdhcGN1cnNvclwiLCBwb3M6IHRoaXMuaGVhZH1cbiAgfTtcblxuICBHYXBDdXJzb3IuZnJvbUpTT04gPSBmdW5jdGlvbiBmcm9tSlNPTiAoZG9jLCBqc29uKSB7XG4gICAgaWYgKHR5cGVvZiBqc29uLnBvcyAhPSBcIm51bWJlclwiKSB7IHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCBpbnB1dCBmb3IgR2FwQ3Vyc29yLmZyb21KU09OXCIpIH1cbiAgICByZXR1cm4gbmV3IEdhcEN1cnNvcihkb2MucmVzb2x2ZShqc29uLnBvcykpXG4gIH07XG5cbiAgR2FwQ3Vyc29yLnByb3RvdHlwZS5nZXRCb29rbWFyayA9IGZ1bmN0aW9uIGdldEJvb2ttYXJrICgpIHsgcmV0dXJuIG5ldyBHYXBCb29rbWFyayh0aGlzLmFuY2hvcikgfTtcblxuICBHYXBDdXJzb3IudmFsaWQgPSBmdW5jdGlvbiB2YWxpZCAoJHBvcykge1xuICAgIHZhciBwYXJlbnQgPSAkcG9zLnBhcmVudDtcbiAgICBpZiAocGFyZW50LmlzVGV4dGJsb2NrIHx8ICFjbG9zZWRCZWZvcmUoJHBvcykgfHwgIWNsb3NlZEFmdGVyKCRwb3MpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgdmFyIG92ZXJyaWRlID0gcGFyZW50LnR5cGUuc3BlYy5hbGxvd0dhcEN1cnNvcjtcbiAgICBpZiAob3ZlcnJpZGUgIT0gbnVsbCkgeyByZXR1cm4gb3ZlcnJpZGUgfVxuICAgIHZhciBkZWZsdCA9IHBhcmVudC5jb250ZW50TWF0Y2hBdCgkcG9zLmluZGV4KCkpLmRlZmF1bHRUeXBlO1xuICAgIHJldHVybiBkZWZsdCAmJiBkZWZsdC5pc1RleHRibG9ja1xuICB9O1xuXG4gIEdhcEN1cnNvci5maW5kRnJvbSA9IGZ1bmN0aW9uIGZpbmRGcm9tICgkcG9zLCBkaXIsIG11c3RNb3ZlKSB7XG4gICAgc2VhcmNoOiBmb3IgKDs7KSB7XG4gICAgICBpZiAoIW11c3RNb3ZlICYmIEdhcEN1cnNvci52YWxpZCgkcG9zKSkgeyByZXR1cm4gJHBvcyB9XG4gICAgICB2YXIgcG9zID0gJHBvcy5wb3MsIG5leHQgPSBudWxsO1xuICAgICAgLy8gU2NhbiB1cCBmcm9tIHRoaXMgcG9zaXRpb25cbiAgICAgIGZvciAodmFyIGQgPSAkcG9zLmRlcHRoOzsgZC0tKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSAkcG9zLm5vZGUoZCk7XG4gICAgICAgIGlmIChkaXIgPiAwID8gJHBvcy5pbmRleEFmdGVyKGQpIDwgcGFyZW50LmNoaWxkQ291bnQgOiAkcG9zLmluZGV4KGQpID4gMCkge1xuICAgICAgICAgIG5leHQgPSBwYXJlbnQuY2hpbGQoZGlyID4gMCA/ICRwb3MuaW5kZXhBZnRlcihkKSA6ICRwb3MuaW5kZXgoZCkgLSAxKTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKGQgPT0gMCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgdmFyICRjdXIgPSAkcG9zLmRvYy5yZXNvbHZlKHBvcyk7XG4gICAgICAgIGlmIChHYXBDdXJzb3IudmFsaWQoJGN1cikpIHsgcmV0dXJuICRjdXIgfVxuICAgICAgfVxuXG4gICAgICAvLyBBbmQgdGhlbiBkb3duIGludG8gdGhlIG5leHQgbm9kZVxuICAgICAgZm9yICg7Oykge1xuICAgICAgICB2YXIgaW5zaWRlID0gZGlyID4gMCA/IG5leHQuZmlyc3RDaGlsZCA6IG5leHQubGFzdENoaWxkO1xuICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgIGlmIChuZXh0LmlzQXRvbSAmJiAhbmV4dC5pc1RleHQgJiYgIU5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKG5leHQpKSB7XG4gICAgICAgICAgICAkcG9zID0gJHBvcy5kb2MucmVzb2x2ZShwb3MgKyBuZXh0Lm5vZGVTaXplICogZGlyKTtcbiAgICAgICAgICAgIG11c3RNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZSBzZWFyY2hcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBuZXh0ID0gaW5zaWRlO1xuICAgICAgICBwb3MgKz0gZGlyO1xuICAgICAgICB2YXIgJGN1ciQxID0gJHBvcy5kb2MucmVzb2x2ZShwb3MpO1xuICAgICAgICBpZiAoR2FwQ3Vyc29yLnZhbGlkKCRjdXIkMSkpIHsgcmV0dXJuICRjdXIkMSB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBHYXBDdXJzb3I7XG59KFNlbGVjdGlvbikpO1xuXG5HYXBDdXJzb3IucHJvdG90eXBlLnZpc2libGUgPSBmYWxzZTtcblxuU2VsZWN0aW9uLmpzb25JRChcImdhcGN1cnNvclwiLCBHYXBDdXJzb3IpO1xuXG52YXIgR2FwQm9va21hcmsgPSBmdW5jdGlvbiBHYXBCb29rbWFyayhwb3MpIHtcbiAgdGhpcy5wb3MgPSBwb3M7XG59O1xuR2FwQm9va21hcmsucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAobWFwcGluZykge1xuICByZXR1cm4gbmV3IEdhcEJvb2ttYXJrKG1hcHBpbmcubWFwKHRoaXMucG9zKSlcbn07XG5HYXBCb29rbWFyay5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUgKGRvYykge1xuICB2YXIgJHBvcyA9IGRvYy5yZXNvbHZlKHRoaXMucG9zKTtcbiAgcmV0dXJuIEdhcEN1cnNvci52YWxpZCgkcG9zKSA/IG5ldyBHYXBDdXJzb3IoJHBvcykgOiBTZWxlY3Rpb24ubmVhcigkcG9zKVxufTtcblxuZnVuY3Rpb24gY2xvc2VkQmVmb3JlKCRwb3MpIHtcbiAgZm9yICh2YXIgZCA9ICRwb3MuZGVwdGg7IGQgPj0gMDsgZC0tKSB7XG4gICAgdmFyIGluZGV4ID0gJHBvcy5pbmRleChkKTtcbiAgICAvLyBBdCB0aGUgc3RhcnQgb2YgdGhpcyBwYXJlbnQsIGxvb2sgYXQgbmV4dCBvbmVcbiAgICBpZiAoaW5kZXggPT0gMCkgeyBjb250aW51ZSB9XG4gICAgLy8gU2VlIGlmIHRoZSBub2RlIGJlZm9yZSAob3IgaXRzIGZpcnN0IGFuY2VzdG9yKSBpcyBjbG9zZWRcbiAgICBmb3IgKHZhciBiZWZvcmUgPSAkcG9zLm5vZGUoZCkuY2hpbGQoaW5kZXggLSAxKTs7IGJlZm9yZSA9IGJlZm9yZS5sYXN0Q2hpbGQpIHtcbiAgICAgIGlmICgoYmVmb3JlLmNoaWxkQ291bnQgPT0gMCAmJiAhYmVmb3JlLmlubGluZUNvbnRlbnQpIHx8IGJlZm9yZS5pc0F0b20gfHwgYmVmb3JlLnR5cGUuc3BlYy5pc29sYXRpbmcpIHsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYgKGJlZm9yZS5pbmxpbmVDb250ZW50KSB7IHJldHVybiBmYWxzZSB9XG4gICAgfVxuICB9XG4gIC8vIEhpdCBzdGFydCBvZiBkb2N1bWVudFxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBjbG9zZWRBZnRlcigkcG9zKSB7XG4gIGZvciAodmFyIGQgPSAkcG9zLmRlcHRoOyBkID49IDA7IGQtLSkge1xuICAgIHZhciBpbmRleCA9ICRwb3MuaW5kZXhBZnRlcihkKSwgcGFyZW50ID0gJHBvcy5ub2RlKGQpO1xuICAgIGlmIChpbmRleCA9PSBwYXJlbnQuY2hpbGRDb3VudCkgeyBjb250aW51ZSB9XG4gICAgZm9yICh2YXIgYWZ0ZXIgPSBwYXJlbnQuY2hpbGQoaW5kZXgpOzsgYWZ0ZXIgPSBhZnRlci5maXJzdENoaWxkKSB7XG4gICAgICBpZiAoKGFmdGVyLmNoaWxkQ291bnQgPT0gMCAmJiAhYWZ0ZXIuaW5saW5lQ29udGVudCkgfHwgYWZ0ZXIuaXNBdG9tIHx8IGFmdGVyLnR5cGUuc3BlYy5pc29sYXRpbmcpIHsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYgKGFmdGVyLmlubGluZUNvbnRlbnQpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKCkg4oaSIFBsdWdpblxuLy8gQ3JlYXRlIGEgZ2FwIGN1cnNvciBwbHVnaW4uIFdoZW4gZW5hYmxlZCwgdGhpcyB3aWxsIGNhcHR1cmUgY2xpY2tzXG4vLyBuZWFyIGFuZCBhcnJvdy1rZXktbW90aW9uIHBhc3QgcGxhY2VzIHRoYXQgZG9uJ3QgaGF2ZSBhIG5vcm1hbGx5XG4vLyBzZWxlY3RhYmxlIHBvc2l0aW9uIG5lYXJieSwgYW5kIGNyZWF0ZSBhIGdhcCBjdXJzb3Igc2VsZWN0aW9uIGZvclxuLy8gdGhlbS4gVGhlIGN1cnNvciBpcyBkcmF3biBhcyBhbiBlbGVtZW50IHdpdGggY2xhc3Ncbi8vIGBQcm9zZU1pcnJvci1nYXBjdXJzb3JgLiBZb3UgY2FuIGVpdGhlciBpbmNsdWRlXG4vLyBgc3R5bGUvZ2FwY3Vyc29yLmNzc2AgZnJvbSB0aGUgcGFja2FnZSdzIGRpcmVjdG9yeSBvciBhZGQgeW91ciBvd25cbi8vIHN0eWxlcyB0byBtYWtlIGl0IHZpc2libGUuXG52YXIgZ2FwQ3Vyc29yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUGx1Z2luKHtcbiAgICBwcm9wczoge1xuICAgICAgZGVjb3JhdGlvbnM6IGRyYXdHYXBDdXJzb3IsXG5cbiAgICAgIGNyZWF0ZVNlbGVjdGlvbkJldHdlZW46IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdGlvbkJldHdlZW4oX3ZpZXcsICRhbmNob3IsICRoZWFkKSB7XG4gICAgICAgIGlmICgkYW5jaG9yLnBvcyA9PSAkaGVhZC5wb3MgJiYgR2FwQ3Vyc29yLnZhbGlkKCRoZWFkKSkgeyByZXR1cm4gbmV3IEdhcEN1cnNvcigkaGVhZCkgfVxuICAgICAgfSxcblxuICAgICAgaGFuZGxlQ2xpY2s6IGhhbmRsZUNsaWNrLFxuICAgICAgaGFuZGxlS2V5RG93bjogaGFuZGxlS2V5RG93blxuICAgIH1cbiAgfSlcbn07XG5cbnZhciBoYW5kbGVLZXlEb3duID0ga2V5ZG93bkhhbmRsZXIoe1xuICBcIkFycm93TGVmdFwiOiBhcnJvdyhcImhvcml6XCIsIC0xKSxcbiAgXCJBcnJvd1JpZ2h0XCI6IGFycm93KFwiaG9yaXpcIiwgMSksXG4gIFwiQXJyb3dVcFwiOiBhcnJvdyhcInZlcnRcIiwgLTEpLFxuICBcIkFycm93RG93blwiOiBhcnJvdyhcInZlcnRcIiwgMSlcbn0pO1xuXG5mdW5jdGlvbiBhcnJvdyhheGlzLCBkaXIpIHtcbiAgdmFyIGRpclN0ciA9IGF4aXMgPT0gXCJ2ZXJ0XCIgPyAoZGlyID4gMCA/IFwiZG93blwiIDogXCJ1cFwiKSA6IChkaXIgPiAwID8gXCJyaWdodFwiIDogXCJsZWZ0XCIpO1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoLCB2aWV3KSB7XG4gICAgdmFyIHNlbCA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICB2YXIgJHN0YXJ0ID0gZGlyID4gMCA/IHNlbC4kdG8gOiBzZWwuJGZyb20sIG11c3RNb3ZlID0gc2VsLmVtcHR5O1xuICAgIGlmIChzZWwgaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB7XG4gICAgICBpZiAoIXZpZXcuZW5kT2ZUZXh0YmxvY2soZGlyU3RyKSB8fCAkc3RhcnQuZGVwdGggPT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgbXVzdE1vdmUgPSBmYWxzZTtcbiAgICAgICRzdGFydCA9IHN0YXRlLmRvYy5yZXNvbHZlKGRpciA+IDAgPyAkc3RhcnQuYWZ0ZXIoKSA6ICRzdGFydC5iZWZvcmUoKSk7XG4gICAgfVxuICAgIHZhciAkZm91bmQgPSBHYXBDdXJzb3IuZmluZEZyb20oJHN0YXJ0LCBkaXIsIG11c3RNb3ZlKTtcbiAgICBpZiAoISRmb3VuZCkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChzdGF0ZS50ci5zZXRTZWxlY3Rpb24obmV3IEdhcEN1cnNvcigkZm91bmQpKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKHZpZXcsIHBvcywgZXZlbnQpIHtcbiAgaWYgKCF2aWV3LmVkaXRhYmxlKSB7IHJldHVybiBmYWxzZSB9XG4gIHZhciAkcG9zID0gdmlldy5zdGF0ZS5kb2MucmVzb2x2ZShwb3MpO1xuICBpZiAoIUdhcEN1cnNvci52YWxpZCgkcG9zKSkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgcmVmID0gdmlldy5wb3NBdENvb3Jkcyh7bGVmdDogZXZlbnQuY2xpZW50WCwgdG9wOiBldmVudC5jbGllbnRZfSk7XG4gIHZhciBpbnNpZGUgPSByZWYuaW5zaWRlO1xuICBpZiAoaW5zaWRlID4gLTEgJiYgTm9kZVNlbGVjdGlvbi5pc1NlbGVjdGFibGUodmlldy5zdGF0ZS5kb2Mubm9kZUF0KGluc2lkZSkpKSB7IHJldHVybiBmYWxzZSB9XG4gIHZpZXcuZGlzcGF0Y2godmlldy5zdGF0ZS50ci5zZXRTZWxlY3Rpb24obmV3IEdhcEN1cnNvcigkcG9zKSkpO1xuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBkcmF3R2FwQ3Vyc29yKHN0YXRlKSB7XG4gIGlmICghKHN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIEdhcEN1cnNvcikpIHsgcmV0dXJuIG51bGwgfVxuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG5vZGUuY2xhc3NOYW1lID0gXCJQcm9zZU1pcnJvci1nYXBjdXJzb3JcIjtcbiAgcmV0dXJuIERlY29yYXRpb25TZXQuY3JlYXRlKHN0YXRlLmRvYywgW0RlY29yYXRpb24ud2lkZ2V0KHN0YXRlLnNlbGVjdGlvbi5oZWFkLCBub2RlLCB7a2V5OiBcImdhcGN1cnNvclwifSldKVxufVxuXG5leHBvcnQgeyBHYXBDdXJzb3IsIGdhcEN1cnNvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJpbXBvcnQgUm9wZVNlcXVlbmNlIGZyb20gJ3JvcGUtc2VxdWVuY2UnO1xuaW1wb3J0IHsgTWFwcGluZyB9IGZyb20gJ3Byb3NlbWlycm9yLXRyYW5zZm9ybSc7XG5pbXBvcnQgeyBQbHVnaW5LZXksIFBsdWdpbiB9IGZyb20gJ3Byb3NlbWlycm9yLXN0YXRlJztcblxuLy8gUHJvc2VNaXJyb3IncyBoaXN0b3J5IGlzbid0IHNpbXBseSBhIHdheSB0byByb2xsIGJhY2sgdG8gYSBwcmV2aW91c1xuLy8gc3RhdGUsIGJlY2F1c2UgUHJvc2VNaXJyb3Igc3VwcG9ydHMgYXBwbHlpbmcgY2hhbmdlcyB3aXRob3V0IGFkZGluZ1xuLy8gdGhlbSB0byB0aGUgaGlzdG9yeSAoZm9yIGV4YW1wbGUgZHVyaW5nIGNvbGxhYm9yYXRpb24pLlxuLy9cbi8vIFRvIHRoaXMgZW5kLCBlYWNoICdCcmFuY2gnIChvbmUgZm9yIHRoZSB1bmRvIGhpc3RvcnkgYW5kIG9uZSBmb3Jcbi8vIHRoZSByZWRvIGhpc3RvcnkpIGtlZXBzIGFuIGFycmF5IG9mICdJdGVtcycsIHdoaWNoIGNhbiBvcHRpb25hbGx5XG4vLyBob2xkIGEgc3RlcCAoYW4gYWN0dWFsIHVuZG9hYmxlIGNoYW5nZSksIGFuZCBhbHdheXMgaG9sZCBhIHBvc2l0aW9uXG4vLyBtYXAgKHdoaWNoIGlzIG5lZWRlZCB0byBtb3ZlIGNoYW5nZXMgYmVsb3cgdGhlbSB0byBhcHBseSB0byB0aGVcbi8vIGN1cnJlbnQgZG9jdW1lbnQpLlxuLy9cbi8vIEFuIGl0ZW0gdGhhdCBoYXMgYm90aCBhIHN0ZXAgYW5kIGEgc2VsZWN0aW9uIGJvb2ttYXJrIGlzIHRoZSBzdGFydFxuLy8gb2YgYW4gJ2V2ZW50JyDigJQgYSBncm91cCBvZiBjaGFuZ2VzIHRoYXQgd2lsbCBiZSB1bmRvbmUgb3IgcmVkb25lIGF0XG4vLyBvbmNlLiAoSXQgc3RvcmVzIG9ubHkgdGhlIGJvb2ttYXJrLCBzaW5jZSB0aGF0IHdheSB3ZSBkb24ndCBoYXZlIHRvXG4vLyBwcm92aWRlIGEgZG9jdW1lbnQgdW50aWwgdGhlIHNlbGVjdGlvbiBpcyBhY3R1YWxseSBhcHBsaWVkLCB3aGljaFxuLy8gaXMgdXNlZnVsIHdoZW4gY29tcHJlc3NpbmcuKVxuXG4vLyBVc2VkIHRvIHNjaGVkdWxlIGhpc3RvcnkgY29tcHJlc3Npb25cbnZhciBtYXhfZW1wdHlfaXRlbXMgPSA1MDA7XG5cbnZhciBCcmFuY2ggPSBmdW5jdGlvbiBCcmFuY2goaXRlbXMsIGV2ZW50Q291bnQpIHtcbiAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICB0aGlzLmV2ZW50Q291bnQgPSBldmVudENvdW50O1xufTtcblxuLy8gOiAoRWRpdG9yU3RhdGUsIGJvb2wpIOKGkiA/e3RyYW5zZm9ybTogVHJhbnNmb3JtLCBzZWxlY3Rpb246ID9TZWxlY3Rpb25Cb29rbWFyaywgcmVtYWluaW5nOiBCcmFuY2h9XG4vLyBQb3AgdGhlIGxhdGVzdCBldmVudCBvZmYgdGhlIGJyYW5jaCdzIGhpc3RvcnkgYW5kIGFwcGx5IGl0XG4vLyB0byBhIGRvY3VtZW50IHRyYW5zZm9ybS5cbkJyYW5jaC5wcm90b3R5cGUucG9wRXZlbnQgPSBmdW5jdGlvbiBwb3BFdmVudCAoc3RhdGUsIHByZXNlcnZlSXRlbXMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodGhpcy5ldmVudENvdW50ID09IDApIHsgcmV0dXJuIG51bGwgfVxuXG4gIHZhciBlbmQgPSB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgZm9yICg7OyBlbmQtLSkge1xuICAgIHZhciBuZXh0ID0gdGhpcy5pdGVtcy5nZXQoZW5kIC0gMSk7XG4gICAgaWYgKG5leHQuc2VsZWN0aW9uKSB7IC0tZW5kOyBicmVhayB9XG4gIH1cblxuICB2YXIgcmVtYXAsIG1hcEZyb207XG4gIGlmIChwcmVzZXJ2ZUl0ZW1zKSB7XG4gICAgcmVtYXAgPSB0aGlzLnJlbWFwcGluZyhlbmQsIHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICBtYXBGcm9tID0gcmVtYXAubWFwcy5sZW5ndGg7XG4gIH1cbiAgdmFyIHRyYW5zZm9ybSA9IHN0YXRlLnRyO1xuICB2YXIgc2VsZWN0aW9uLCByZW1haW5pbmc7XG4gIHZhciBhZGRBZnRlciA9IFtdLCBhZGRCZWZvcmUgPSBbXTtcblxuICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICBpZiAoIWl0ZW0uc3RlcCkge1xuICAgICAgaWYgKCFyZW1hcCkge1xuICAgICAgICByZW1hcCA9IHRoaXMkMS5yZW1hcHBpbmcoZW5kLCBpICsgMSk7XG4gICAgICAgIG1hcEZyb20gPSByZW1hcC5tYXBzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIG1hcEZyb20tLTtcbiAgICAgIGFkZEJlZm9yZS5wdXNoKGl0ZW0pO1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJlbWFwKSB7XG4gICAgICBhZGRCZWZvcmUucHVzaChuZXcgSXRlbShpdGVtLm1hcCkpO1xuICAgICAgdmFyIHN0ZXAgPSBpdGVtLnN0ZXAubWFwKHJlbWFwLnNsaWNlKG1hcEZyb20pKSwgbWFwO1xuXG4gICAgICBpZiAoc3RlcCAmJiB0cmFuc2Zvcm0ubWF5YmVTdGVwKHN0ZXApLmRvYykge1xuICAgICAgICBtYXAgPSB0cmFuc2Zvcm0ubWFwcGluZy5tYXBzW3RyYW5zZm9ybS5tYXBwaW5nLm1hcHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGFkZEFmdGVyLnB1c2gobmV3IEl0ZW0obWFwLCBudWxsLCBudWxsLCBhZGRBZnRlci5sZW5ndGggKyBhZGRCZWZvcmUubGVuZ3RoKSk7XG4gICAgICB9XG4gICAgICBtYXBGcm9tLS07XG4gICAgICBpZiAobWFwKSB7IHJlbWFwLmFwcGVuZE1hcChtYXAsIG1hcEZyb20pOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybS5tYXliZVN0ZXAoaXRlbS5zdGVwKTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5zZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbiA9IHJlbWFwID8gaXRlbS5zZWxlY3Rpb24ubWFwKHJlbWFwLnNsaWNlKG1hcEZyb20pKSA6IGl0ZW0uc2VsZWN0aW9uO1xuICAgICAgcmVtYWluaW5nID0gbmV3IEJyYW5jaCh0aGlzJDEuaXRlbXMuc2xpY2UoMCwgZW5kKS5hcHBlbmQoYWRkQmVmb3JlLnJldmVyc2UoKS5jb25jYXQoYWRkQWZ0ZXIpKSwgdGhpcyQxLmV2ZW50Q291bnQgLSAxKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSwgdGhpcy5pdGVtcy5sZW5ndGgsIDApO1xuXG4gIHJldHVybiB7cmVtYWluaW5nOiByZW1haW5pbmcsIHRyYW5zZm9ybTogdHJhbnNmb3JtLCBzZWxlY3Rpb246IHNlbGVjdGlvbn1cbn07XG5cbi8vIDogKFRyYW5zZm9ybSwgP1NlbGVjdGlvbkJvb2ttYXJrLCBPYmplY3QpIOKGkiBCcmFuY2hcbi8vIENyZWF0ZSBhIG5ldyBicmFuY2ggd2l0aCB0aGUgZ2l2ZW4gdHJhbnNmb3JtIGFkZGVkLlxuQnJhbmNoLnByb3RvdHlwZS5hZGRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBhZGRUcmFuc2Zvcm0gKHRyYW5zZm9ybSwgc2VsZWN0aW9uLCBoaXN0T3B0aW9ucywgcHJlc2VydmVJdGVtcykge1xuICB2YXIgbmV3SXRlbXMgPSBbXSwgZXZlbnRDb3VudCA9IHRoaXMuZXZlbnRDb3VudDtcbiAgdmFyIG9sZEl0ZW1zID0gdGhpcy5pdGVtcywgbGFzdEl0ZW0gPSAhcHJlc2VydmVJdGVtcyAmJiBvbGRJdGVtcy5sZW5ndGggPyBvbGRJdGVtcy5nZXQob2xkSXRlbXMubGVuZ3RoIC0gMSkgOiBudWxsO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNmb3JtLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN0ZXAgPSB0cmFuc2Zvcm0uc3RlcHNbaV0uaW52ZXJ0KHRyYW5zZm9ybS5kb2NzW2ldKTtcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKHRyYW5zZm9ybS5tYXBwaW5nLm1hcHNbaV0sIHN0ZXAsIHNlbGVjdGlvbiksIG1lcmdlZCA9ICh2b2lkIDApO1xuICAgIGlmIChtZXJnZWQgPSBsYXN0SXRlbSAmJiBsYXN0SXRlbS5tZXJnZShpdGVtKSkge1xuICAgICAgaXRlbSA9IG1lcmdlZDtcbiAgICAgIGlmIChpKSB7IG5ld0l0ZW1zLnBvcCgpOyB9XG4gICAgICBlbHNlIHsgb2xkSXRlbXMgPSBvbGRJdGVtcy5zbGljZSgwLCBvbGRJdGVtcy5sZW5ndGggLSAxKTsgfVxuICAgIH1cbiAgICBuZXdJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIGV2ZW50Q291bnQrKztcbiAgICAgIHNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcHJlc2VydmVJdGVtcykgeyBsYXN0SXRlbSA9IGl0ZW07IH1cbiAgfVxuICB2YXIgb3ZlcmZsb3cgPSBldmVudENvdW50IC0gaGlzdE9wdGlvbnMuZGVwdGg7XG4gIGlmIChvdmVyZmxvdyA+IERFUFRIX09WRVJGTE9XKSB7XG4gICAgb2xkSXRlbXMgPSBjdXRPZmZFdmVudHMob2xkSXRlbXMsIG92ZXJmbG93KTtcbiAgICBldmVudENvdW50IC09IG92ZXJmbG93O1xuICB9XG4gIHJldHVybiBuZXcgQnJhbmNoKG9sZEl0ZW1zLmFwcGVuZChuZXdJdGVtcyksIGV2ZW50Q291bnQpXG59O1xuXG5CcmFuY2gucHJvdG90eXBlLnJlbWFwcGluZyA9IGZ1bmN0aW9uIHJlbWFwcGluZyAoZnJvbSwgdG8pIHtcbiAgdmFyIG1hcHMgPSBuZXcgTWFwcGluZztcbiAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgdmFyIG1pcnJvclBvcyA9IGl0ZW0ubWlycm9yT2Zmc2V0ICE9IG51bGwgJiYgaSAtIGl0ZW0ubWlycm9yT2Zmc2V0ID49IGZyb21cbiAgICAgICAgPyBtYXBzLm1hcHMubGVuZ3RoIC0gaXRlbS5taXJyb3JPZmZzZXQgOiBudWxsO1xuICAgIG1hcHMuYXBwZW5kTWFwKGl0ZW0ubWFwLCBtaXJyb3JQb3MpO1xuICB9LCBmcm9tLCB0byk7XG4gIHJldHVybiBtYXBzXG59O1xuXG5CcmFuY2gucHJvdG90eXBlLmFkZE1hcHMgPSBmdW5jdGlvbiBhZGRNYXBzIChhcnJheSkge1xuICBpZiAodGhpcy5ldmVudENvdW50ID09IDApIHsgcmV0dXJuIHRoaXMgfVxuICByZXR1cm4gbmV3IEJyYW5jaCh0aGlzLml0ZW1zLmFwcGVuZChhcnJheS5tYXAoZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbmV3IEl0ZW0obWFwKTsgfSkpLCB0aGlzLmV2ZW50Q291bnQpXG59O1xuXG4vLyA6IChUcmFuc2Zvcm0sIG51bWJlcilcbi8vIFdoZW4gdGhlIGNvbGxhYiBtb2R1bGUgcmVjZWl2ZXMgcmVtb3RlIGNoYW5nZXMsIHRoZSBoaXN0b3J5IGhhc1xuLy8gdG8ga25vdyBhYm91dCB0aG9zZSwgc28gdGhhdCBpdCBjYW4gYWRqdXN0IHRoZSBzdGVwcyB0aGF0IHdlcmVcbi8vIHJlYmFzZWQgb24gdG9wIG9mIHRoZSByZW1vdGUgY2hhbmdlcywgYW5kIGluY2x1ZGUgdGhlIHBvc2l0aW9uXG4vLyBtYXBzIGZvciB0aGUgcmVtb3RlIGNoYW5nZXMgaW4gaXRzIGFycmF5IG9mIGl0ZW1zLlxuQnJhbmNoLnByb3RvdHlwZS5yZWJhc2VkID0gZnVuY3Rpb24gcmViYXNlZCAocmViYXNlZFRyYW5zZm9ybSwgcmViYXNlZENvdW50KSB7XG4gIGlmICghdGhpcy5ldmVudENvdW50KSB7IHJldHVybiB0aGlzIH1cblxuICB2YXIgcmViYXNlZEl0ZW1zID0gW10sIHN0YXJ0ID0gTWF0aC5tYXgoMCwgdGhpcy5pdGVtcy5sZW5ndGggLSByZWJhc2VkQ291bnQpO1xuXG4gIHZhciBtYXBwaW5nID0gcmViYXNlZFRyYW5zZm9ybS5tYXBwaW5nO1xuICB2YXIgbmV3VW50aWwgPSByZWJhc2VkVHJhbnNmb3JtLnN0ZXBzLmxlbmd0aDtcbiAgdmFyIGV2ZW50Q291bnQgPSB0aGlzLmV2ZW50Q291bnQ7XG4gIHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyBpZiAoaXRlbS5zZWxlY3Rpb24pIHsgZXZlbnRDb3VudC0tOyB9IH0sIHN0YXJ0KTtcblxuICB2YXIgaVJlYmFzZWQgPSByZWJhc2VkQ291bnQ7XG4gIHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIHZhciBwb3MgPSBtYXBwaW5nLmdldE1pcnJvcigtLWlSZWJhc2VkKTtcbiAgICBpZiAocG9zID09IG51bGwpIHsgcmV0dXJuIH1cbiAgICBuZXdVbnRpbCA9IE1hdGgubWluKG5ld1VudGlsLCBwb3MpO1xuICAgIHZhciBtYXAgPSBtYXBwaW5nLm1hcHNbcG9zXTtcbiAgICBpZiAoaXRlbS5zdGVwKSB7XG4gICAgICB2YXIgc3RlcCA9IHJlYmFzZWRUcmFuc2Zvcm0uc3RlcHNbcG9zXS5pbnZlcnQocmViYXNlZFRyYW5zZm9ybS5kb2NzW3Bvc10pO1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IGl0ZW0uc2VsZWN0aW9uICYmIGl0ZW0uc2VsZWN0aW9uLm1hcChtYXBwaW5nLnNsaWNlKGlSZWJhc2VkICsgMSwgcG9zKSk7XG4gICAgICBpZiAoc2VsZWN0aW9uKSB7IGV2ZW50Q291bnQrKzsgfVxuICAgICAgcmViYXNlZEl0ZW1zLnB1c2gobmV3IEl0ZW0obWFwLCBzdGVwLCBzZWxlY3Rpb24pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmViYXNlZEl0ZW1zLnB1c2gobmV3IEl0ZW0obWFwKSk7XG4gICAgfVxuICB9LCBzdGFydCk7XG5cbiAgdmFyIG5ld01hcHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHJlYmFzZWRDb3VudDsgaSA8IG5ld1VudGlsOyBpKyspXG4gICAgeyBuZXdNYXBzLnB1c2gobmV3IEl0ZW0obWFwcGluZy5tYXBzW2ldKSk7IH1cbiAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcy5zbGljZSgwLCBzdGFydCkuYXBwZW5kKG5ld01hcHMpLmFwcGVuZChyZWJhc2VkSXRlbXMpO1xuICB2YXIgYnJhbmNoID0gbmV3IEJyYW5jaChpdGVtcywgZXZlbnRDb3VudCk7XG5cbiAgaWYgKGJyYW5jaC5lbXB0eUl0ZW1Db3VudCgpID4gbWF4X2VtcHR5X2l0ZW1zKVxuICAgIHsgYnJhbmNoID0gYnJhbmNoLmNvbXByZXNzKHRoaXMuaXRlbXMubGVuZ3RoIC0gcmViYXNlZEl0ZW1zLmxlbmd0aCk7IH1cbiAgcmV0dXJuIGJyYW5jaFxufTtcblxuQnJhbmNoLnByb3RvdHlwZS5lbXB0eUl0ZW1Db3VudCA9IGZ1bmN0aW9uIGVtcHR5SXRlbUNvdW50ICgpIHtcbiAgdmFyIGNvdW50ID0gMDtcbiAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IGlmICghaXRlbS5zdGVwKSB7IGNvdW50Kys7IH0gfSk7XG4gIHJldHVybiBjb3VudFxufTtcblxuLy8gQ29tcHJlc3NpbmcgYSBicmFuY2ggbWVhbnMgcmV3cml0aW5nIGl0IHRvIHB1c2ggdGhlIGFpciAobWFwLW9ubHlcbi8vIGl0ZW1zKSBvdXQuIER1cmluZyBjb2xsYWJvcmF0aW9uLCB0aGVzZSBuYXR1cmFsbHkgYWNjdW11bGF0ZVxuLy8gYmVjYXVzZSBlYWNoIHJlbW90ZSBjaGFuZ2UgYWRkcyBvbmUuIFRoZSBgdXB0b2AgYXJndW1lbnQgaXMgdXNlZFxuLy8gdG8gZW5zdXJlIHRoYXQgb25seSB0aGUgaXRlbXMgYmVsb3cgYSBnaXZlbiBsZXZlbCBhcmUgY29tcHJlc3NlZCxcbi8vIGJlY2F1c2UgYHJlYmFzZWRgIHJlbGllcyBvbiBhIGNsZWFuLCB1bnRvdWNoZWQgc2V0IG9mIGl0ZW1zIGluXG4vLyBvcmRlciB0byBhc3NvY2lhdGUgb2xkIGl0ZW1zIHdpdGggcmViYXNlZCBzdGVwcy5cbkJyYW5jaC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbiBjb21wcmVzcyAodXB0bykge1xuICAgIGlmICggdXB0byA9PT0gdm9pZCAwICkgdXB0byA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuXG4gIHZhciByZW1hcCA9IHRoaXMucmVtYXBwaW5nKDAsIHVwdG8pLCBtYXBGcm9tID0gcmVtYXAubWFwcy5sZW5ndGg7XG4gIHZhciBpdGVtcyA9IFtdLCBldmVudHMgPSAwO1xuICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICBpZiAoaSA+PSB1cHRvKSB7XG4gICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgaWYgKGl0ZW0uc2VsZWN0aW9uKSB7IGV2ZW50cysrOyB9XG4gICAgfSBlbHNlIGlmIChpdGVtLnN0ZXApIHtcbiAgICAgIHZhciBzdGVwID0gaXRlbS5zdGVwLm1hcChyZW1hcC5zbGljZShtYXBGcm9tKSksIG1hcCA9IHN0ZXAgJiYgc3RlcC5nZXRNYXAoKTtcbiAgICAgIG1hcEZyb20tLTtcbiAgICAgIGlmIChtYXApIHsgcmVtYXAuYXBwZW5kTWFwKG1hcCwgbWFwRnJvbSk7IH1cbiAgICAgIGlmIChzdGVwKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBpdGVtLnNlbGVjdGlvbiAmJiBpdGVtLnNlbGVjdGlvbi5tYXAocmVtYXAuc2xpY2UobWFwRnJvbSkpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uKSB7IGV2ZW50cysrOyB9XG4gICAgICAgIHZhciBuZXdJdGVtID0gbmV3IEl0ZW0obWFwLmludmVydCgpLCBzdGVwLCBzZWxlY3Rpb24pLCBtZXJnZWQsIGxhc3QgPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBpZiAobWVyZ2VkID0gaXRlbXMubGVuZ3RoICYmIGl0ZW1zW2xhc3RdLm1lcmdlKG5ld0l0ZW0pKVxuICAgICAgICAgIHsgaXRlbXNbbGFzdF0gPSBtZXJnZWQ7IH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIHsgaXRlbXMucHVzaChuZXdJdGVtKTsgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbS5tYXApIHtcbiAgICAgIG1hcEZyb20tLTtcbiAgICB9XG4gIH0sIHRoaXMuaXRlbXMubGVuZ3RoLCAwKTtcbiAgcmV0dXJuIG5ldyBCcmFuY2goUm9wZVNlcXVlbmNlLmZyb20oaXRlbXMucmV2ZXJzZSgpKSwgZXZlbnRzKVxufTtcblxuQnJhbmNoLmVtcHR5ID0gbmV3IEJyYW5jaChSb3BlU2VxdWVuY2UuZW1wdHksIDApO1xuXG5mdW5jdGlvbiBjdXRPZmZFdmVudHMoaXRlbXMsIG4pIHtcbiAgdmFyIGN1dFBvaW50O1xuICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgaWYgKGl0ZW0uc2VsZWN0aW9uICYmIChuLS0gPT0gMCkpIHtcbiAgICAgIGN1dFBvaW50ID0gaTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpdGVtcy5zbGljZShjdXRQb2ludClcbn1cblxudmFyIEl0ZW0gPSBmdW5jdGlvbiBJdGVtKG1hcCwgc3RlcCwgc2VsZWN0aW9uLCBtaXJyb3JPZmZzZXQpIHtcbiAgLy8gVGhlIChmb3J3YXJkKSBzdGVwIG1hcCBmb3IgdGhpcyBpdGVtLlxuICB0aGlzLm1hcCA9IG1hcDtcbiAgLy8gVGhlIGludmVydGVkIHN0ZXBcbiAgdGhpcy5zdGVwID0gc3RlcDtcbiAgLy8gSWYgdGhpcyBpcyBub24tbnVsbCwgdGhpcyBpdGVtIGlzIHRoZSBzdGFydCBvZiBhIGdyb3VwLCBhbmRcbiAgLy8gdGhpcyBzZWxlY3Rpb24gaXMgdGhlIHN0YXJ0aW5nIHNlbGVjdGlvbiBmb3IgdGhlIGdyb3VwICh0aGUgb25lXG4gIC8vIHRoYXQgd2FzIGFjdGl2ZSBiZWZvcmUgdGhlIGZpcnN0IHN0ZXAgd2FzIGFwcGxpZWQpXG4gIHRoaXMuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAvLyBJZiB0aGlzIGl0ZW0gaXMgdGhlIGludmVyc2Ugb2YgYSBwcmV2aW91cyBtYXBwaW5nIG9uIHRoZSBzdGFjayxcbiAgLy8gdGhpcyBwb2ludHMgYXQgdGhlIGludmVyc2UncyBvZmZzZXRcbiAgdGhpcy5taXJyb3JPZmZzZXQgPSBtaXJyb3JPZmZzZXQ7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlIChvdGhlcikge1xuICBpZiAodGhpcy5zdGVwICYmIG90aGVyLnN0ZXAgJiYgIW90aGVyLnNlbGVjdGlvbikge1xuICAgIHZhciBzdGVwID0gb3RoZXIuc3RlcC5tZXJnZSh0aGlzLnN0ZXApO1xuICAgIGlmIChzdGVwKSB7IHJldHVybiBuZXcgSXRlbShzdGVwLmdldE1hcCgpLmludmVydCgpLCBzdGVwLCB0aGlzLnNlbGVjdGlvbikgfVxuICB9XG59O1xuXG4vLyBUaGUgdmFsdWUgb2YgdGhlIHN0YXRlIGZpZWxkIHRoYXQgdHJhY2tzIHVuZG8vcmVkbyBoaXN0b3J5IGZvciB0aGF0XG4vLyBzdGF0ZS4gV2lsbCBiZSBzdG9yZWQgaW4gdGhlIHBsdWdpbiBzdGF0ZSB3aGVuIHRoZSBoaXN0b3J5IHBsdWdpblxuLy8gaXMgYWN0aXZlLlxudmFyIEhpc3RvcnlTdGF0ZSA9IGZ1bmN0aW9uIEhpc3RvcnlTdGF0ZShkb25lLCB1bmRvbmUsIHByZXZSYW5nZXMsIHByZXZUaW1lKSB7XG4gIHRoaXMuZG9uZSA9IGRvbmU7XG4gIHRoaXMudW5kb25lID0gdW5kb25lO1xuICB0aGlzLnByZXZSYW5nZXMgPSBwcmV2UmFuZ2VzO1xuICB0aGlzLnByZXZUaW1lID0gcHJldlRpbWU7XG59O1xuXG52YXIgREVQVEhfT1ZFUkZMT1cgPSAyMDtcblxuLy8gOiAoSGlzdG9yeVN0YXRlLCBFZGl0b3JTdGF0ZSwgVHJhbnNhY3Rpb24sIE9iamVjdClcbi8vIFJlY29yZCBhIHRyYW5zZm9ybWF0aW9uIGluIHVuZG8gaGlzdG9yeS5cbmZ1bmN0aW9uIGFwcGx5VHJhbnNhY3Rpb24oaGlzdG9yeSwgc3RhdGUsIHRyLCBvcHRpb25zKSB7XG4gIHZhciBoaXN0b3J5VHIgPSB0ci5nZXRNZXRhKGhpc3RvcnlLZXkpLCByZWJhc2VkO1xuICBpZiAoaGlzdG9yeVRyKSB7IHJldHVybiBoaXN0b3J5VHIuaGlzdG9yeVN0YXRlIH1cblxuICBpZiAodHIuZ2V0TWV0YShjbG9zZUhpc3RvcnlLZXkpKSB7IGhpc3RvcnkgPSBuZXcgSGlzdG9yeVN0YXRlKGhpc3RvcnkuZG9uZSwgaGlzdG9yeS51bmRvbmUsIG51bGwsIDApOyB9XG5cbiAgdmFyIGFwcGVuZGVkID0gdHIuZ2V0TWV0YShcImFwcGVuZGVkVHJhbnNhY3Rpb25cIik7XG5cbiAgaWYgKHRyLnN0ZXBzLmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIGhpc3RvcnlcbiAgfSBlbHNlIGlmIChhcHBlbmRlZCAmJiBhcHBlbmRlZC5nZXRNZXRhKGhpc3RvcnlLZXkpKSB7XG4gICAgaWYgKGFwcGVuZGVkLmdldE1ldGEoaGlzdG9yeUtleSkucmVkbylcbiAgICAgIHsgcmV0dXJuIG5ldyBIaXN0b3J5U3RhdGUoaGlzdG9yeS5kb25lLmFkZFRyYW5zZm9ybSh0ciwgbnVsbCwgb3B0aW9ucywgbXVzdFByZXNlcnZlSXRlbXMoc3RhdGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkudW5kb25lLCByYW5nZXNGb3IodHIubWFwcGluZy5tYXBzW3RyLnN0ZXBzLmxlbmd0aCAtIDFdKSwgaGlzdG9yeS5wcmV2VGltZSkgfVxuICAgIGVsc2VcbiAgICAgIHsgcmV0dXJuIG5ldyBIaXN0b3J5U3RhdGUoaGlzdG9yeS5kb25lLCBoaXN0b3J5LnVuZG9uZS5hZGRUcmFuc2Zvcm0odHIsIG51bGwsIG9wdGlvbnMsIG11c3RQcmVzZXJ2ZUl0ZW1zKHN0YXRlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLCBoaXN0b3J5LnByZXZUaW1lKSB9XG4gIH0gZWxzZSBpZiAodHIuZ2V0TWV0YShcImFkZFRvSGlzdG9yeVwiKSAhPT0gZmFsc2UgJiYgIShhcHBlbmRlZCAmJiBhcHBlbmRlZC5nZXRNZXRhKFwiYWRkVG9IaXN0b3J5XCIpID09PSBmYWxzZSkpIHtcbiAgICAvLyBHcm91cCB0cmFuc2Zvcm1zIHRoYXQgb2NjdXIgaW4gcXVpY2sgc3VjY2Vzc2lvbiBpbnRvIG9uZSBldmVudC5cbiAgICB2YXIgbmV3R3JvdXAgPSBoaXN0b3J5LnByZXZUaW1lID09IDAgfHwgIWFwcGVuZGVkICYmIChoaXN0b3J5LnByZXZUaW1lIDwgKHRyLnRpbWUgfHwgMCkgLSBvcHRpb25zLm5ld0dyb3VwRGVsYXkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaXNBZGphY2VudFRvKHRyLCBoaXN0b3J5LnByZXZSYW5nZXMpKTtcbiAgICB2YXIgcHJldlJhbmdlcyA9IGFwcGVuZGVkID8gbWFwUmFuZ2VzKGhpc3RvcnkucHJldlJhbmdlcywgdHIubWFwcGluZykgOiByYW5nZXNGb3IodHIubWFwcGluZy5tYXBzW3RyLnN0ZXBzLmxlbmd0aCAtIDFdKTtcbiAgICByZXR1cm4gbmV3IEhpc3RvcnlTdGF0ZShoaXN0b3J5LmRvbmUuYWRkVHJhbnNmb3JtKHRyLCBuZXdHcm91cCA/IHN0YXRlLnNlbGVjdGlvbi5nZXRCb29rbWFyaygpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMsIG11c3RQcmVzZXJ2ZUl0ZW1zKHN0YXRlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQnJhbmNoLmVtcHR5LCBwcmV2UmFuZ2VzLCB0ci50aW1lKVxuICB9IGVsc2UgaWYgKHJlYmFzZWQgPSB0ci5nZXRNZXRhKFwicmViYXNlZFwiKSkge1xuICAgIC8vIFVzZWQgYnkgdGhlIGNvbGxhYiBtb2R1bGUgdG8gdGVsbCB0aGUgaGlzdG9yeSB0aGF0IHNvbWUgb2YgaXRzXG4gICAgLy8gY29udGVudCBoYXMgYmVlbiByZWJhc2VkLlxuICAgIHJldHVybiBuZXcgSGlzdG9yeVN0YXRlKGhpc3RvcnkuZG9uZS5yZWJhc2VkKHRyLCByZWJhc2VkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnVuZG9uZS5yZWJhc2VkKHRyLCByZWJhc2VkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBSYW5nZXMoaGlzdG9yeS5wcmV2UmFuZ2VzLCB0ci5tYXBwaW5nKSwgaGlzdG9yeS5wcmV2VGltZSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEhpc3RvcnlTdGF0ZShoaXN0b3J5LmRvbmUuYWRkTWFwcyh0ci5tYXBwaW5nLm1hcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkudW5kb25lLmFkZE1hcHModHIubWFwcGluZy5tYXBzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBSYW5nZXMoaGlzdG9yeS5wcmV2UmFuZ2VzLCB0ci5tYXBwaW5nKSwgaGlzdG9yeS5wcmV2VGltZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0FkamFjZW50VG8odHJhbnNmb3JtLCBwcmV2UmFuZ2VzKSB7XG4gIGlmICghcHJldlJhbmdlcykgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoIXRyYW5zZm9ybS5kb2NDaGFuZ2VkKSB7IHJldHVybiB0cnVlIH1cbiAgdmFyIGFkamFjZW50ID0gZmFsc2U7XG4gIHRyYW5zZm9ybS5tYXBwaW5nLm1hcHNbMF0uZm9yRWFjaChmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJldlJhbmdlcy5sZW5ndGg7IGkgKz0gMilcbiAgICAgIHsgaWYgKHN0YXJ0IDw9IHByZXZSYW5nZXNbaSArIDFdICYmIGVuZCA+PSBwcmV2UmFuZ2VzW2ldKVxuICAgICAgICB7IGFkamFjZW50ID0gdHJ1ZTsgfSB9XG4gIH0pO1xuICByZXR1cm4gYWRqYWNlbnRcbn1cblxuZnVuY3Rpb24gcmFuZ2VzRm9yKG1hcCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uIChfZnJvbSwgX3RvLCBmcm9tLCB0bykgeyByZXR1cm4gcmVzdWx0LnB1c2goZnJvbSwgdG8pOyB9KTtcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBtYXBSYW5nZXMocmFuZ2VzLCBtYXBwaW5nKSB7XG4gIGlmICghcmFuZ2VzKSB7IHJldHVybiBudWxsIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBmcm9tID0gbWFwcGluZy5tYXAocmFuZ2VzW2ldLCAxKSwgdG8gPSBtYXBwaW5nLm1hcChyYW5nZXNbaSArIDFdLCAtMSk7XG4gICAgaWYgKGZyb20gPD0gdG8pIHsgcmVzdWx0LnB1c2goZnJvbSwgdG8pOyB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyA6IChIaXN0b3J5U3RhdGUsIEVkaXRvclN0YXRlLCAodHI6IFRyYW5zYWN0aW9uKSwgYm9vbClcbi8vIEFwcGx5IHRoZSBsYXRlc3QgZXZlbnQgZnJvbSBvbmUgYnJhbmNoIHRvIHRoZSBkb2N1bWVudCBhbmQgc2hpZnQgdGhlIGV2ZW50XG4vLyBvbnRvIHRoZSBvdGhlciBicmFuY2guXG5mdW5jdGlvbiBoaXN0VHJhbnNhY3Rpb24oaGlzdG9yeSwgc3RhdGUsIGRpc3BhdGNoLCByZWRvKSB7XG4gIHZhciBwcmVzZXJ2ZUl0ZW1zID0gbXVzdFByZXNlcnZlSXRlbXMoc3RhdGUpLCBoaXN0T3B0aW9ucyA9IGhpc3RvcnlLZXkuZ2V0KHN0YXRlKS5zcGVjLmNvbmZpZztcbiAgdmFyIHBvcCA9IChyZWRvID8gaGlzdG9yeS51bmRvbmUgOiBoaXN0b3J5LmRvbmUpLnBvcEV2ZW50KHN0YXRlLCBwcmVzZXJ2ZUl0ZW1zKTtcbiAgaWYgKCFwb3ApIHsgcmV0dXJuIH1cblxuICB2YXIgc2VsZWN0aW9uID0gcG9wLnNlbGVjdGlvbi5yZXNvbHZlKHBvcC50cmFuc2Zvcm0uZG9jKTtcbiAgdmFyIGFkZGVkID0gKHJlZG8gPyBoaXN0b3J5LmRvbmUgOiBoaXN0b3J5LnVuZG9uZSkuYWRkVHJhbnNmb3JtKHBvcC50cmFuc2Zvcm0sIHN0YXRlLnNlbGVjdGlvbi5nZXRCb29rbWFyaygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlzdE9wdGlvbnMsIHByZXNlcnZlSXRlbXMpO1xuXG4gIHZhciBuZXdIaXN0ID0gbmV3IEhpc3RvcnlTdGF0ZShyZWRvID8gYWRkZWQgOiBwb3AucmVtYWluaW5nLCByZWRvID8gcG9wLnJlbWFpbmluZyA6IGFkZGVkLCBudWxsLCAwKTtcbiAgZGlzcGF0Y2gocG9wLnRyYW5zZm9ybS5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uKS5zZXRNZXRhKGhpc3RvcnlLZXksIHtyZWRvOiByZWRvLCBoaXN0b3J5U3RhdGU6IG5ld0hpc3R9KS5zY3JvbGxJbnRvVmlldygpKTtcbn1cblxudmFyIGNhY2hlZFByZXNlcnZlSXRlbXMgPSBmYWxzZSwgY2FjaGVkUHJlc2VydmVJdGVtc1BsdWdpbnMgPSBudWxsO1xuLy8gQ2hlY2sgd2hldGhlciBhbnkgcGx1Z2luIGluIHRoZSBnaXZlbiBzdGF0ZSBoYXMgYVxuLy8gYGhpc3RvcnlQcmVzZXJ2ZUl0ZW1zYCBwcm9wZXJ0eSBpbiBpdHMgc3BlYywgaW4gd2hpY2ggY2FzZSB3ZSBtdXN0XG4vLyBwcmVzZXJ2ZSBzdGVwcyBleGFjdGx5IGFzIHRoZXkgY2FtZSBpbiwgc28gdGhhdCB0aGV5IGNhbiBiZVxuLy8gcmViYXNlZC5cbmZ1bmN0aW9uIG11c3RQcmVzZXJ2ZUl0ZW1zKHN0YXRlKSB7XG4gIHZhciBwbHVnaW5zID0gc3RhdGUucGx1Z2lucztcbiAgaWYgKGNhY2hlZFByZXNlcnZlSXRlbXNQbHVnaW5zICE9IHBsdWdpbnMpIHtcbiAgICBjYWNoZWRQcmVzZXJ2ZUl0ZW1zID0gZmFsc2U7XG4gICAgY2FjaGVkUHJlc2VydmVJdGVtc1BsdWdpbnMgPSBwbHVnaW5zO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykgeyBpZiAocGx1Z2luc1tpXS5zcGVjLmhpc3RvcnlQcmVzZXJ2ZUl0ZW1zKSB7XG4gICAgICBjYWNoZWRQcmVzZXJ2ZUl0ZW1zID0gdHJ1ZTtcbiAgICAgIGJyZWFrXG4gICAgfSB9XG4gIH1cbiAgcmV0dXJuIGNhY2hlZFByZXNlcnZlSXRlbXNcbn1cblxuLy8gOjogKFRyYW5zYWN0aW9uKSDihpIgVHJhbnNhY3Rpb25cbi8vIFNldCBhIGZsYWcgb24gdGhlIGdpdmVuIHRyYW5zYWN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IGZ1cnRoZXIgc3RlcHNcbi8vIGZyb20gYmVpbmcgYXBwZW5kZWQgdG8gYW4gZXhpc3RpbmcgaGlzdG9yeSBldmVudCAoc28gdGhhdCB0aGV5XG4vLyByZXF1aXJlIGEgc2VwYXJhdGUgdW5kbyBjb21tYW5kIHRvIHVuZG8pLlxuZnVuY3Rpb24gY2xvc2VIaXN0b3J5KHRyKSB7XG4gIHJldHVybiB0ci5zZXRNZXRhKGNsb3NlSGlzdG9yeUtleSwgdHJ1ZSlcbn1cblxudmFyIGhpc3RvcnlLZXkgPSBuZXcgUGx1Z2luS2V5KFwiaGlzdG9yeVwiKTtcbnZhciBjbG9zZUhpc3RvcnlLZXkgPSBuZXcgUGx1Z2luS2V5KFwiY2xvc2VIaXN0b3J5XCIpO1xuXG4vLyA6OiAoP09iamVjdCkg4oaSIFBsdWdpblxuLy8gUmV0dXJucyBhIHBsdWdpbiB0aGF0IGVuYWJsZXMgdGhlIHVuZG8gaGlzdG9yeSBmb3IgYW4gZWRpdG9yLiBUaGVcbi8vIHBsdWdpbiB3aWxsIHRyYWNrIHVuZG8gYW5kIHJlZG8gc3RhY2tzLCB3aGljaCBjYW4gYmUgdXNlZCB3aXRoIHRoZVxuLy8gW2B1bmRvYF0oI2hpc3RvcnkudW5kbykgYW5kIFtgcmVkb2BdKCNoaXN0b3J5LnJlZG8pIGNvbW1hbmRzLlxuLy9cbi8vIFlvdSBjYW4gc2V0IGFuIGBcImFkZFRvSGlzdG9yeVwiYCBbbWV0YWRhdGFcbi8vIHByb3BlcnR5XSgjc3RhdGUuVHJhbnNhY3Rpb24uc2V0TWV0YSkgb2YgYGZhbHNlYCBvbiBhIHRyYW5zYWN0aW9uXG4vLyB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgcm9sbGVkIGJhY2sgYnkgdW5kby5cbi8vXG4vLyAgIGNvbmZpZzo6LVxuLy8gICBTdXBwb3J0cyB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb24gb3B0aW9uczpcbi8vXG4vLyAgICAgZGVwdGg6OiA/bnVtYmVyXG4vLyAgICAgVGhlIGFtb3VudCBvZiBoaXN0b3J5IGV2ZW50cyB0aGF0IGFyZSBjb2xsZWN0ZWQgYmVmb3JlIHRoZVxuLy8gICAgIG9sZGVzdCBldmVudHMgYXJlIGRpc2NhcmRlZC4gRGVmYXVsdHMgdG8gMTAwLlxuLy9cbi8vICAgICBuZXdHcm91cERlbGF5OjogP251bWJlclxuLy8gICAgIFRoZSBkZWxheSBiZXR3ZWVuIGNoYW5nZXMgYWZ0ZXIgd2hpY2ggYSBuZXcgZ3JvdXAgc2hvdWxkIGJlXG4vLyAgICAgc3RhcnRlZC4gRGVmYXVsdHMgdG8gNTAwIChtaWxsaXNlY29uZHMpLiBOb3RlIHRoYXQgd2hlbiBjaGFuZ2VzXG4vLyAgICAgYXJlbid0IGFkamFjZW50LCBhIG5ldyBncm91cCBpcyBhbHdheXMgc3RhcnRlZC5cbmZ1bmN0aW9uIGhpc3RvcnkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IHtkZXB0aDogY29uZmlnICYmIGNvbmZpZy5kZXB0aCB8fCAxMDAsXG4gICAgICAgICAgICBuZXdHcm91cERlbGF5OiBjb25maWcgJiYgY29uZmlnLm5ld0dyb3VwRGVsYXkgfHwgNTAwfTtcbiAgcmV0dXJuIG5ldyBQbHVnaW4oe1xuICAgIGtleTogaGlzdG9yeUtleSxcblxuICAgIHN0YXRlOiB7XG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IEhpc3RvcnlTdGF0ZShCcmFuY2guZW1wdHksIEJyYW5jaC5lbXB0eSwgbnVsbCwgMClcbiAgICAgIH0sXG4gICAgICBhcHBseTogZnVuY3Rpb24gYXBwbHkodHIsIGhpc3QsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBhcHBseVRyYW5zYWN0aW9uKGhpc3QsIHN0YXRlLCB0ciwgY29uZmlnKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25maWc6IGNvbmZpZ1xuICB9KVxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUsID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIEEgY29tbWFuZCBmdW5jdGlvbiB0aGF0IHVuZG9lcyB0aGUgbGFzdCBjaGFuZ2UsIGlmIGFueS5cbmZ1bmN0aW9uIHVuZG8oc3RhdGUsIGRpc3BhdGNoKSB7XG4gIHZhciBoaXN0ID0gaGlzdG9yeUtleS5nZXRTdGF0ZShzdGF0ZSk7XG4gIGlmICghaGlzdCB8fCBoaXN0LmRvbmUuZXZlbnRDb3VudCA9PSAwKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmIChkaXNwYXRjaCkgeyBoaXN0VHJhbnNhY3Rpb24oaGlzdCwgc3RhdGUsIGRpc3BhdGNoLCBmYWxzZSk7IH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKEVkaXRvclN0YXRlLCA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sXG4vLyBBIGNvbW1hbmQgZnVuY3Rpb24gdGhhdCByZWRvZXMgdGhlIGxhc3QgdW5kb25lIGNoYW5nZSwgaWYgYW55LlxuZnVuY3Rpb24gcmVkbyhzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgdmFyIGhpc3QgPSBoaXN0b3J5S2V5LmdldFN0YXRlKHN0YXRlKTtcbiAgaWYgKCFoaXN0IHx8IGhpc3QudW5kb25lLmV2ZW50Q291bnQgPT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAoZGlzcGF0Y2gpIHsgaGlzdFRyYW5zYWN0aW9uKGhpc3QsIHN0YXRlLCBkaXNwYXRjaCwgdHJ1ZSk7IH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKEVkaXRvclN0YXRlKSDihpIgbnVtYmVyXG4vLyBUaGUgYW1vdW50IG9mIHVuZG9hYmxlIGV2ZW50cyBhdmFpbGFibGUgaW4gYSBnaXZlbiBzdGF0ZS5cbmZ1bmN0aW9uIHVuZG9EZXB0aChzdGF0ZSkge1xuICB2YXIgaGlzdCA9IGhpc3RvcnlLZXkuZ2V0U3RhdGUoc3RhdGUpO1xuICByZXR1cm4gaGlzdCA/IGhpc3QuZG9uZS5ldmVudENvdW50IDogMFxufVxuXG4vLyA6OiAoRWRpdG9yU3RhdGUpIOKGkiBudW1iZXJcbi8vIFRoZSBhbW91bnQgb2YgcmVkb2FibGUgZXZlbnRzIGF2YWlsYWJsZSBpbiBhIGdpdmVuIGVkaXRvciBzdGF0ZS5cbmZ1bmN0aW9uIHJlZG9EZXB0aChzdGF0ZSkge1xuICB2YXIgaGlzdCA9IGhpc3RvcnlLZXkuZ2V0U3RhdGUoc3RhdGUpO1xuICByZXR1cm4gaGlzdCA/IGhpc3QudW5kb25lLmV2ZW50Q291bnQgOiAwXG59XG5cbmV4cG9ydCB7IEhpc3RvcnlTdGF0ZSwgY2xvc2VIaXN0b3J5LCBoaXN0b3J5LCByZWRvLCByZWRvRGVwdGgsIHVuZG8sIHVuZG9EZXB0aCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJpbXBvcnQgeyBQbHVnaW4gfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5pbXBvcnQgeyBmaW5kV3JhcHBpbmcsIGNhbkpvaW4gfSBmcm9tICdwcm9zZW1pcnJvci10cmFuc2Zvcm0nO1xuXG4vLyA6Oi0gSW5wdXQgcnVsZXMgYXJlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZGVzY3JpYmluZyBhIHBpZWNlIG9mIHRleHRcbi8vIHRoYXQsIHdoZW4gdHlwZWQsIGNhdXNlcyBzb21ldGhpbmcgdG8gaGFwcGVuLiBUaGlzIG1pZ2h0IGJlXG4vLyBjaGFuZ2luZyB0d28gZGFzaGVzIGludG8gYW4gZW1kYXNoLCB3cmFwcGluZyBhIHBhcmFncmFwaCBzdGFydGluZ1xuLy8gd2l0aCBgXCI+IFwiYCBpbnRvIGEgYmxvY2txdW90ZSwgb3Igc29tZXRoaW5nIGVudGlyZWx5IGRpZmZlcmVudC5cbnZhciBJbnB1dFJ1bGUgPSBmdW5jdGlvbiBJbnB1dFJ1bGUobWF0Y2gsIGhhbmRsZXIpIHtcbiAgdGhpcy5tYXRjaCA9IG1hdGNoO1xuICB0aGlzLmhhbmRsZXIgPSB0eXBlb2YgaGFuZGxlciA9PSBcInN0cmluZ1wiID8gc3RyaW5nSGFuZGxlcihoYW5kbGVyKSA6IGhhbmRsZXI7XG59O1xuXG5mdW5jdGlvbiBzdHJpbmdIYW5kbGVyKHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIG1hdGNoLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIGluc2VydCA9IHN0cmluZztcbiAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgIHZhciBvZmZzZXQgPSBtYXRjaFswXS5sYXN0SW5kZXhPZihtYXRjaFsxXSk7XG4gICAgICBpbnNlcnQgKz0gbWF0Y2hbMF0uc2xpY2Uob2Zmc2V0ICsgbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICAgIHN0YXJ0ICs9IG9mZnNldDtcbiAgICAgIHZhciBjdXRPZmYgPSBzdGFydCAtIGVuZDtcbiAgICAgIGlmIChjdXRPZmYgPiAwKSB7XG4gICAgICAgIGluc2VydCA9IG1hdGNoWzBdLnNsaWNlKG9mZnNldCAtIGN1dE9mZiwgb2Zmc2V0KSArIGluc2VydDtcbiAgICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZS50ci5pbnNlcnRUZXh0KGluc2VydCwgc3RhcnQsIGVuZClcbiAgfVxufVxuXG52YXIgTUFYX01BVENIID0gNTAwO1xuXG4vLyA6OiAoY29uZmlnOiB7cnVsZXM6IFtJbnB1dFJ1bGVdfSkg4oaSIFBsdWdpblxuLy8gQ3JlYXRlIGFuIGlucHV0IHJ1bGVzIHBsdWdpbi4gV2hlbiBlbmFibGVkLCBpdCB3aWxsIGNhdXNlIHRleHRcbi8vIGlucHV0IHRoYXQgbWF0Y2hlcyBhbnkgb2YgdGhlIGdpdmVuIHJ1bGVzIHRvIHRyaWdnZXIgdGhlIHJ1bGUnc1xuLy8gYWN0aW9uLlxuZnVuY3Rpb24gaW5wdXRSdWxlcyhyZWYpIHtcbiAgdmFyIHJ1bGVzID0gcmVmLnJ1bGVzO1xuXG4gIHZhciBwbHVnaW4gPSBuZXcgUGx1Z2luKHtcbiAgICBzdGF0ZToge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHsgcmV0dXJuIG51bGwgfSxcbiAgICAgIGFwcGx5OiBmdW5jdGlvbiBhcHBseSh0ciwgcHJldikge1xuICAgICAgICB2YXIgc3RvcmVkID0gdHIuZ2V0TWV0YSh0aGlzKTtcbiAgICAgICAgaWYgKHN0b3JlZCkgeyByZXR1cm4gc3RvcmVkIH1cbiAgICAgICAgcmV0dXJuIHRyLnNlbGVjdGlvblNldCB8fCB0ci5kb2NDaGFuZ2VkID8gbnVsbCA6IHByZXZcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvcHM6IHtcbiAgICAgIGhhbmRsZVRleHRJbnB1dDogZnVuY3Rpb24gaGFuZGxlVGV4dElucHV0KHZpZXcsIGZyb20sIHRvLCB0ZXh0KSB7XG4gICAgICAgIHJldHVybiBydW4odmlldywgZnJvbSwgdG8sIHRleHQsIHJ1bGVzLCBwbHVnaW4pXG4gICAgICB9LFxuICAgICAgaGFuZGxlRE9NRXZlbnRzOiB7XG4gICAgICAgIGNvbXBvc2l0aW9uZW5kOiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlZiA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uO1xuICAgICAgICAgICAgdmFyICRjdXJzb3IgPSByZWYuJGN1cnNvcjtcbiAgICAgICAgICAgIGlmICgkY3Vyc29yKSB7IHJ1bih2aWV3LCAkY3Vyc29yLnBvcywgJGN1cnNvci5wb3MsIFwiXCIsIHJ1bGVzLCBwbHVnaW4pOyB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNJbnB1dFJ1bGVzOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gcGx1Z2luXG59XG5cbmZ1bmN0aW9uIHJ1bih2aWV3LCBmcm9tLCB0bywgdGV4dCwgcnVsZXMsIHBsdWdpbikge1xuICBpZiAodmlldy5jb21wb3NpbmcpIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyIHN0YXRlID0gdmlldy5zdGF0ZSwgJGZyb20gPSBzdGF0ZS5kb2MucmVzb2x2ZShmcm9tKTtcbiAgaWYgKCRmcm9tLnBhcmVudC50eXBlLnNwZWMuY29kZSkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgdGV4dEJlZm9yZSA9ICRmcm9tLnBhcmVudC50ZXh0QmV0d2VlbihNYXRoLm1heCgwLCAkZnJvbS5wYXJlbnRPZmZzZXQgLSBNQVhfTUFUQ0gpLCAkZnJvbS5wYXJlbnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIFwiXFx1ZmZmY1wiKSArIHRleHQ7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbWF0Y2ggPSBydWxlc1tpXS5tYXRjaC5leGVjKHRleHRCZWZvcmUpO1xuICAgIHZhciB0ciA9IG1hdGNoICYmIHJ1bGVzW2ldLmhhbmRsZXIoc3RhdGUsIG1hdGNoLCBmcm9tIC0gKG1hdGNoWzBdLmxlbmd0aCAtIHRleHQubGVuZ3RoKSwgdG8pO1xuICAgIGlmICghdHIpIHsgY29udGludWUgfVxuICAgIHZpZXcuZGlzcGF0Y2godHIuc2V0TWV0YShwbHVnaW4sIHt0cmFuc2Zvcm06IHRyLCBmcm9tOiBmcm9tLCB0bzogdG8sIHRleHQ6IHRleHR9KSk7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gOjogKEVkaXRvclN0YXRlLCA/KFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIFRoaXMgaXMgYSBjb21tYW5kIHRoYXQgd2lsbCB1bmRvIGFuIGlucHV0IHJ1bGUsIGlmIGFwcGx5aW5nIHN1Y2ggYVxuLy8gcnVsZSB3YXMgdGhlIGxhc3QgdGhpbmcgdGhhdCB0aGUgdXNlciBkaWQuXG5mdW5jdGlvbiB1bmRvSW5wdXRSdWxlKHN0YXRlLCBkaXNwYXRjaCkge1xuICB2YXIgcGx1Z2lucyA9IHN0YXRlLnBsdWdpbnM7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbHVnaW4gPSBwbHVnaW5zW2ldLCB1bmRvYWJsZSA9ICh2b2lkIDApO1xuICAgIGlmIChwbHVnaW4uc3BlYy5pc0lucHV0UnVsZXMgJiYgKHVuZG9hYmxlID0gcGx1Z2luLmdldFN0YXRlKHN0YXRlKSkpIHtcbiAgICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgICB2YXIgdHIgPSBzdGF0ZS50ciwgdG9VbmRvID0gdW5kb2FibGUudHJhbnNmb3JtO1xuICAgICAgICBmb3IgKHZhciBqID0gdG9VbmRvLnN0ZXBzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKVxuICAgICAgICAgIHsgdHIuc3RlcCh0b1VuZG8uc3RlcHNbal0uaW52ZXJ0KHRvVW5kby5kb2NzW2pdKSk7IH1cbiAgICAgICAgaWYgKHVuZG9hYmxlLnRleHQpIHtcbiAgICAgICAgICB2YXIgbWFya3MgPSB0ci5kb2MucmVzb2x2ZSh1bmRvYWJsZS5mcm9tKS5tYXJrcygpO1xuICAgICAgICAgIHRyLnJlcGxhY2VXaXRoKHVuZG9hYmxlLmZyb20sIHVuZG9hYmxlLnRvLCBzdGF0ZS5zY2hlbWEudGV4dCh1bmRvYWJsZS50ZXh0LCBtYXJrcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyLmRlbGV0ZSh1bmRvYWJsZS5mcm9tLCB1bmRvYWJsZS50byk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2godHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIDo6IElucHV0UnVsZSBDb252ZXJ0cyBkb3VibGUgZGFzaGVzIHRvIGFuIGVtZGFzaC5cbnZhciBlbURhc2ggPSBuZXcgSW5wdXRSdWxlKC8tLSQvLCBcIuKAlFwiKTtcbi8vIDo6IElucHV0UnVsZSBDb252ZXJ0cyB0aHJlZSBkb3RzIHRvIGFuIGVsbGlwc2lzIGNoYXJhY3Rlci5cbnZhciBlbGxpcHNpcyA9IG5ldyBJbnB1dFJ1bGUoL1xcLlxcLlxcLiQvLCBcIuKAplwiKTtcbi8vIDo6IElucHV0UnVsZSDigJxTbWFydOKAnSBvcGVuaW5nIGRvdWJsZSBxdW90ZXMuXG52YXIgb3BlbkRvdWJsZVF1b3RlID0gbmV3IElucHV0UnVsZSgvKD86XnxbXFxzXFx7XFxbXFwoXFw8J1wiXFx1MjAxOFxcdTIwMUNdKShcIikkLywgXCLigJxcIik7XG4vLyA6OiBJbnB1dFJ1bGUg4oCcU21hcnTigJ0gY2xvc2luZyBkb3VibGUgcXVvdGVzLlxudmFyIGNsb3NlRG91YmxlUXVvdGUgPSBuZXcgSW5wdXRSdWxlKC9cIiQvLCBcIuKAnVwiKTtcbi8vIDo6IElucHV0UnVsZSDigJxTbWFydOKAnSBvcGVuaW5nIHNpbmdsZSBxdW90ZXMuXG52YXIgb3BlblNpbmdsZVF1b3RlID0gbmV3IElucHV0UnVsZSgvKD86XnxbXFxzXFx7XFxbXFwoXFw8J1wiXFx1MjAxOFxcdTIwMUNdKSgnKSQvLCBcIuKAmFwiKTtcbi8vIDo6IElucHV0UnVsZSDigJxTbWFydOKAnSBjbG9zaW5nIHNpbmdsZSBxdW90ZXMuXG52YXIgY2xvc2VTaW5nbGVRdW90ZSA9IG5ldyBJbnB1dFJ1bGUoLyckLywgXCLigJlcIik7XG5cbi8vIDo6IFtJbnB1dFJ1bGVdIFNtYXJ0LXF1b3RlIHJlbGF0ZWQgaW5wdXQgcnVsZXMuXG52YXIgc21hcnRRdW90ZXMgPSBbb3BlbkRvdWJsZVF1b3RlLCBjbG9zZURvdWJsZVF1b3RlLCBvcGVuU2luZ2xlUXVvdGUsIGNsb3NlU2luZ2xlUXVvdGVdO1xuXG4vLyA6OiAoUmVnRXhwLCBOb2RlVHlwZSwgP3VuaW9uPE9iamVjdCwgKFtzdHJpbmddKSDihpIgP09iamVjdD4sID8oW3N0cmluZ10sIE5vZGUpIOKGkiBib29sKSDihpIgSW5wdXRSdWxlXG4vLyBCdWlsZCBhbiBpbnB1dCBydWxlIGZvciBhdXRvbWF0aWNhbGx5IHdyYXBwaW5nIGEgdGV4dGJsb2NrIHdoZW4gYVxuLy8gZ2l2ZW4gc3RyaW5nIGlzIHR5cGVkLiBUaGUgYHJlZ2V4cGAgYXJndW1lbnQgaXNcbi8vIGRpcmVjdGx5IHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBgSW5wdXRSdWxlYCBjb25zdHJ1Y3Rvci4gWW91J2xsXG4vLyBwcm9iYWJseSB3YW50IHRoZSByZWdleHAgdG8gc3RhcnQgd2l0aCBgXmAsIHNvIHRoYXQgdGhlIHBhdHRlcm4gY2FuXG4vLyBvbmx5IG9jY3VyIGF0IHRoZSBzdGFydCBvZiBhIHRleHRibG9jay5cbi8vXG4vLyBgbm9kZVR5cGVgIGlzIHRoZSB0eXBlIG9mIG5vZGUgdG8gd3JhcCBpbi4gSWYgaXQgbmVlZHMgYXR0cmlidXRlcyxcbi8vIHlvdSBjYW4gZWl0aGVyIHBhc3MgdGhlbSBkaXJlY3RseSwgb3IgcGFzcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbFxuLy8gY29tcHV0ZSB0aGVtIGZyb20gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXRjaC5cbi8vXG4vLyBCeSBkZWZhdWx0LCBpZiB0aGVyZSdzIGEgbm9kZSB3aXRoIHRoZSBzYW1lIHR5cGUgYWJvdmUgdGhlIG5ld2x5XG4vLyB3cmFwcGVkIG5vZGUsIHRoZSBydWxlIHdpbGwgdHJ5IHRvIFtqb2luXSgjdHJhbnNmb3JtLlRyYW5zZm9ybS5qb2luKSB0aG9zZVxuLy8gdHdvIG5vZGVzLiBZb3UgY2FuIHBhc3MgYSBqb2luIHByZWRpY2F0ZSwgd2hpY2ggdGFrZXMgYSByZWd1bGFyXG4vLyBleHByZXNzaW9uIG1hdGNoIGFuZCB0aGUgbm9kZSBiZWZvcmUgdGhlIHdyYXBwZWQgbm9kZSwgYW5kIGNhblxuLy8gcmV0dXJuIGEgYm9vbGVhbiB0byBpbmRpY2F0ZSB3aGV0aGVyIGEgam9pbiBzaG91bGQgaGFwcGVuLlxuZnVuY3Rpb24gd3JhcHBpbmdJbnB1dFJ1bGUocmVnZXhwLCBub2RlVHlwZSwgZ2V0QXR0cnMsIGpvaW5QcmVkaWNhdGUpIHtcbiAgcmV0dXJuIG5ldyBJbnB1dFJ1bGUocmVnZXhwLCBmdW5jdGlvbiAoc3RhdGUsIG1hdGNoLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIGF0dHJzID0gZ2V0QXR0cnMgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IGdldEF0dHJzKG1hdGNoKSA6IGdldEF0dHJzO1xuICAgIHZhciB0ciA9IHN0YXRlLnRyLmRlbGV0ZShzdGFydCwgZW5kKTtcbiAgICB2YXIgJHN0YXJ0ID0gdHIuZG9jLnJlc29sdmUoc3RhcnQpLCByYW5nZSA9ICRzdGFydC5ibG9ja1JhbmdlKCksIHdyYXBwaW5nID0gcmFuZ2UgJiYgZmluZFdyYXBwaW5nKHJhbmdlLCBub2RlVHlwZSwgYXR0cnMpO1xuICAgIGlmICghd3JhcHBpbmcpIHsgcmV0dXJuIG51bGwgfVxuICAgIHRyLndyYXAocmFuZ2UsIHdyYXBwaW5nKTtcbiAgICB2YXIgYmVmb3JlID0gdHIuZG9jLnJlc29sdmUoc3RhcnQgLSAxKS5ub2RlQmVmb3JlO1xuICAgIGlmIChiZWZvcmUgJiYgYmVmb3JlLnR5cGUgPT0gbm9kZVR5cGUgJiYgY2FuSm9pbih0ci5kb2MsIHN0YXJ0IC0gMSkgJiZcbiAgICAgICAgKCFqb2luUHJlZGljYXRlIHx8IGpvaW5QcmVkaWNhdGUobWF0Y2gsIGJlZm9yZSkpKVxuICAgICAgeyB0ci5qb2luKHN0YXJ0IC0gMSk7IH1cbiAgICByZXR1cm4gdHJcbiAgfSlcbn1cblxuLy8gOjogKFJlZ0V4cCwgTm9kZVR5cGUsID91bmlvbjxPYmplY3QsIChbc3RyaW5nXSkg4oaSID9PYmplY3Q+KSDihpIgSW5wdXRSdWxlXG4vLyBCdWlsZCBhbiBpbnB1dCBydWxlIHRoYXQgY2hhbmdlcyB0aGUgdHlwZSBvZiBhIHRleHRibG9jayB3aGVuIHRoZVxuLy8gbWF0Y2hlZCB0ZXh0IGlzIHR5cGVkIGludG8gaXQuIFlvdSdsbCB1c3VhbGx5IHdhbnQgdG8gc3RhcnQgeW91clxuLy8gcmVnZXhwIHdpdGggYF5gIHRvIHRoYXQgaXQgaXMgb25seSBtYXRjaGVkIGF0IHRoZSBzdGFydCBvZiBhXG4vLyB0ZXh0YmxvY2suIFRoZSBvcHRpb25hbCBgZ2V0QXR0cnNgIHBhcmFtZXRlciBjYW4gYmUgdXNlZCB0byBjb21wdXRlXG4vLyB0aGUgbmV3IG5vZGUncyBhdHRyaWJ1dGVzLCBhbmQgd29ya3MgdGhlIHNhbWUgYXMgaW4gdGhlXG4vLyBgd3JhcHBpbmdJbnB1dFJ1bGVgIGZ1bmN0aW9uLlxuZnVuY3Rpb24gdGV4dGJsb2NrVHlwZUlucHV0UnVsZShyZWdleHAsIG5vZGVUeXBlLCBnZXRBdHRycykge1xuICByZXR1cm4gbmV3IElucHV0UnVsZShyZWdleHAsIGZ1bmN0aW9uIChzdGF0ZSwgbWF0Y2gsIHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgJHN0YXJ0ID0gc3RhdGUuZG9jLnJlc29sdmUoc3RhcnQpO1xuICAgIHZhciBhdHRycyA9IGdldEF0dHJzIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBnZXRBdHRycyhtYXRjaCkgOiBnZXRBdHRycztcbiAgICBpZiAoISRzdGFydC5ub2RlKC0xKS5jYW5SZXBsYWNlV2l0aCgkc3RhcnQuaW5kZXgoLTEpLCAkc3RhcnQuaW5kZXhBZnRlcigtMSksIG5vZGVUeXBlKSkgeyByZXR1cm4gbnVsbCB9XG4gICAgcmV0dXJuIHN0YXRlLnRyXG4gICAgICAuZGVsZXRlKHN0YXJ0LCBlbmQpXG4gICAgICAuc2V0QmxvY2tUeXBlKHN0YXJ0LCBzdGFydCwgbm9kZVR5cGUsIGF0dHJzKVxuICB9KVxufVxuXG5leHBvcnQgeyBJbnB1dFJ1bGUsIGNsb3NlRG91YmxlUXVvdGUsIGNsb3NlU2luZ2xlUXVvdGUsIGVsbGlwc2lzLCBlbURhc2gsIGlucHV0UnVsZXMsIG9wZW5Eb3VibGVRdW90ZSwgb3BlblNpbmdsZVF1b3RlLCBzbWFydFF1b3RlcywgdGV4dGJsb2NrVHlwZUlucHV0UnVsZSwgdW5kb0lucHV0UnVsZSwgd3JhcHBpbmdJbnB1dFJ1bGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiaW1wb3J0IHsga2V5TmFtZSwgYmFzZSB9IGZyb20gJ3czYy1rZXluYW1lJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3Byb3NlbWlycm9yLXN0YXRlJztcblxuLy8gZGVjbGFyZSBnbG9iYWw6IG5hdmlnYXRvclxuXG52YXIgbWFjID0gdHlwZW9mIG5hdmlnYXRvciAhPSBcInVuZGVmaW5lZFwiID8gL01hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pIDogZmFsc2U7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUtleU5hbWUobmFtZSkge1xuICB2YXIgcGFydHMgPSBuYW1lLnNwbGl0KC8tKD8hJCkvKSwgcmVzdWx0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gIGlmIChyZXN1bHQgPT0gXCJTcGFjZVwiKSB7IHJlc3VsdCA9IFwiIFwiOyB9XG4gIHZhciBhbHQsIGN0cmwsIHNoaWZ0LCBtZXRhO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIHZhciBtb2QgPSBwYXJ0c1tpXTtcbiAgICBpZiAoL14oY21kfG1ldGF8bSkkL2kudGVzdChtb2QpKSB7IG1ldGEgPSB0cnVlOyB9XG4gICAgZWxzZSBpZiAoL15hKGx0KT8kL2kudGVzdChtb2QpKSB7IGFsdCA9IHRydWU7IH1cbiAgICBlbHNlIGlmICgvXihjfGN0cmx8Y29udHJvbCkkL2kudGVzdChtb2QpKSB7IGN0cmwgPSB0cnVlOyB9XG4gICAgZWxzZSBpZiAoL15zKGhpZnQpPyQvaS50ZXN0KG1vZCkpIHsgc2hpZnQgPSB0cnVlOyB9XG4gICAgZWxzZSBpZiAoL15tb2QkL2kudGVzdChtb2QpKSB7IGlmIChtYWMpIHsgbWV0YSA9IHRydWU7IH0gZWxzZSB7IGN0cmwgPSB0cnVlOyB9IH1cbiAgICBlbHNlIHsgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1vZGlmaWVyIG5hbWU6IFwiICsgbW9kKSB9XG4gIH1cbiAgaWYgKGFsdCkgeyByZXN1bHQgPSBcIkFsdC1cIiArIHJlc3VsdDsgfVxuICBpZiAoY3RybCkgeyByZXN1bHQgPSBcIkN0cmwtXCIgKyByZXN1bHQ7IH1cbiAgaWYgKG1ldGEpIHsgcmVzdWx0ID0gXCJNZXRhLVwiICsgcmVzdWx0OyB9XG4gIGlmIChzaGlmdCkgeyByZXN1bHQgPSBcIlNoaWZ0LVwiICsgcmVzdWx0OyB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKG1hcCkge1xuICB2YXIgY29weSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZvciAodmFyIHByb3AgaW4gbWFwKSB7IGNvcHlbbm9ybWFsaXplS2V5TmFtZShwcm9wKV0gPSBtYXBbcHJvcF07IH1cbiAgcmV0dXJuIGNvcHlcbn1cblxuZnVuY3Rpb24gbW9kaWZpZXJzKG5hbWUsIGV2ZW50LCBzaGlmdCkge1xuICBpZiAoZXZlbnQuYWx0S2V5KSB7IG5hbWUgPSBcIkFsdC1cIiArIG5hbWU7IH1cbiAgaWYgKGV2ZW50LmN0cmxLZXkpIHsgbmFtZSA9IFwiQ3RybC1cIiArIG5hbWU7IH1cbiAgaWYgKGV2ZW50Lm1ldGFLZXkpIHsgbmFtZSA9IFwiTWV0YS1cIiArIG5hbWU7IH1cbiAgaWYgKHNoaWZ0ICE9PSBmYWxzZSAmJiBldmVudC5zaGlmdEtleSkgeyBuYW1lID0gXCJTaGlmdC1cIiArIG5hbWU7IH1cbiAgcmV0dXJuIG5hbWVcbn1cblxuLy8gOjogKE9iamVjdCkg4oaSIFBsdWdpblxuLy8gQ3JlYXRlIGEga2V5bWFwIHBsdWdpbiBmb3IgdGhlIGdpdmVuIHNldCBvZiBiaW5kaW5ncy5cbi8vXG4vLyBCaW5kaW5ncyBzaG91bGQgbWFwIGtleSBuYW1lcyB0byBbY29tbWFuZF0oI2NvbW1hbmRzKS1zdHlsZVxuLy8gZnVuY3Rpb25zLCB3aGljaCB3aWxsIGJlIGNhbGxlZCB3aXRoIGAoRWRpdG9yU3RhdGUsIGRpc3BhdGNoLFxuLy8gRWRpdG9yVmlldylgIGFyZ3VtZW50cywgYW5kIHNob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHRoZXkndmUgaGFuZGxlZFxuLy8gdGhlIGtleS4gTm90ZSB0aGF0IHRoZSB2aWV3IGFyZ3VtZW50IGlzbid0IHBhcnQgb2YgdGhlIGNvbW1hbmRcbi8vIHByb3RvY29sLCBidXQgY2FuIGJlIHVzZWQgYXMgYW4gZXNjYXBlIGhhdGNoIGlmIGEgYmluZGluZyBuZWVkcyB0b1xuLy8gZGlyZWN0bHkgaW50ZXJhY3Qgd2l0aCB0aGUgVUkuXG4vL1xuLy8gS2V5IG5hbWVzIG1heSBiZSBzdHJpbmdzIGxpa2UgYFwiU2hpZnQtQ3RybC1FbnRlclwiYOKAlGEga2V5XG4vLyBpZGVudGlmaWVyIHByZWZpeGVkIHdpdGggemVybyBvciBtb3JlIG1vZGlmaWVycy4gS2V5IGlkZW50aWZpZXJzXG4vLyBhcmUgYmFzZWQgb24gdGhlIHN0cmluZ3MgdGhhdCBjYW4gYXBwZWFyIGluXG4vLyBbYEtleUV2ZW50LmtleWBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2tleSkuXG4vLyBVc2UgbG93ZXJjYXNlIGxldHRlcnMgdG8gcmVmZXIgdG8gbGV0dGVyIGtleXMgKG9yIHVwcGVyY2FzZSBsZXR0ZXJzXG4vLyBpZiB5b3Ugd2FudCBzaGlmdCB0byBiZSBoZWxkKS4gWW91IG1heSB1c2UgYFwiU3BhY2VcImAgYXMgYW4gYWxpYXNcbi8vIGZvciB0aGUgYFwiIFwiYCBuYW1lLlxuLy9cbi8vIE1vZGlmaWVycyBjYW4gYmUgZ2l2ZW4gaW4gYW55IG9yZGVyLiBgU2hpZnQtYCAob3IgYHMtYCksIGBBbHQtYCAob3Jcbi8vIGBhLWApLCBgQ3RybC1gIChvciBgYy1gIG9yIGBDb250cm9sLWApIGFuZCBgQ21kLWAgKG9yIGBtLWAgb3Jcbi8vIGBNZXRhLWApIGFyZSByZWNvZ25pemVkLiBGb3IgY2hhcmFjdGVycyB0aGF0IGFyZSBjcmVhdGVkIGJ5IGhvbGRpbmdcbi8vIHNoaWZ0LCB0aGUgYFNoaWZ0LWAgcHJlZml4IGlzIGltcGxpZWQsIGFuZCBzaG91bGQgbm90IGJlIGFkZGVkXG4vLyBleHBsaWNpdGx5LlxuLy9cbi8vIFlvdSBjYW4gdXNlIGBNb2QtYCBhcyBhIHNob3J0aGFuZCBmb3IgYENtZC1gIG9uIE1hYyBhbmQgYEN0cmwtYCBvblxuLy8gb3RoZXIgcGxhdGZvcm1zLlxuLy9cbi8vIFlvdSBjYW4gYWRkIG11bHRpcGxlIGtleW1hcCBwbHVnaW5zIHRvIGFuIGVkaXRvci4gVGhlIG9yZGVyIGluXG4vLyB3aGljaCB0aGV5IGFwcGVhciBkZXRlcm1pbmVzIHRoZWlyIHByZWNlZGVuY2UgKHRoZSBvbmVzIGVhcmx5IGluXG4vLyB0aGUgYXJyYXkgZ2V0IHRvIGRpc3BhdGNoIGZpcnN0KS5cbmZ1bmN0aW9uIGtleW1hcChiaW5kaW5ncykge1xuICByZXR1cm4gbmV3IFBsdWdpbih7cHJvcHM6IHtoYW5kbGVLZXlEb3duOiBrZXlkb3duSGFuZGxlcihiaW5kaW5ncyl9fSlcbn1cblxuLy8gOjogKE9iamVjdCkg4oaSICh2aWV3OiBFZGl0b3JWaWV3LCBldmVudDogZG9tLkV2ZW50KSDihpIgYm9vbFxuLy8gR2l2ZW4gYSBzZXQgb2YgYmluZGluZ3MgKHVzaW5nIHRoZSBzYW1lIGZvcm1hdCBhc1xuLy8gW2BrZXltYXBgXSgja2V5bWFwLmtleW1hcCksIHJldHVybiBhIFtrZXlkb3duXG4vLyBoYW5kbGVyXSgjdmlldy5FZGl0b3JQcm9wcy5oYW5kbGVLZXlEb3duKSB0aGF0IGhhbmRsZXMgdGhlbS5cbmZ1bmN0aW9uIGtleWRvd25IYW5kbGVyKGJpbmRpbmdzKSB7XG4gIHZhciBtYXAgPSBub3JtYWxpemUoYmluZGluZ3MpO1xuICByZXR1cm4gZnVuY3Rpb24odmlldywgZXZlbnQpIHtcbiAgICB2YXIgbmFtZSA9IGtleU5hbWUoZXZlbnQpLCBpc0NoYXIgPSBuYW1lLmxlbmd0aCA9PSAxICYmIG5hbWUgIT0gXCIgXCIsIGJhc2VOYW1lO1xuICAgIHZhciBkaXJlY3QgPSBtYXBbbW9kaWZpZXJzKG5hbWUsIGV2ZW50LCAhaXNDaGFyKV07XG4gICAgaWYgKGRpcmVjdCAmJiBkaXJlY3Qodmlldy5zdGF0ZSwgdmlldy5kaXNwYXRjaCwgdmlldykpIHsgcmV0dXJuIHRydWUgfVxuICAgIGlmIChpc0NoYXIgJiYgKGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5IHx8IG5hbWUuY2hhckNvZGVBdCgwKSA+IDEyNykgJiZcbiAgICAgICAgKGJhc2VOYW1lID0gYmFzZVtldmVudC5rZXlDb2RlXSkgJiYgYmFzZU5hbWUgIT0gbmFtZSkge1xuICAgICAgLy8gVHJ5IGZhbGxpbmcgYmFjayB0byB0aGUga2V5Q29kZSB3aGVuIHRoZXJlJ3MgYSBtb2RpZmllclxuICAgICAgLy8gYWN0aXZlIG9yIHRoZSBjaGFyYWN0ZXIgcHJvZHVjZWQgaXNuJ3QgQVNDSUksIGFuZCBvdXIgdGFibGVcbiAgICAgIC8vIHByb2R1Y2VzIGEgZGlmZmVyZW50IG5hbWUgZnJvbSB0aGUgdGhlIGtleUNvZGUuIFNlZSAjNjY4LFxuICAgICAgLy8gIzEwNjBcbiAgICAgIHZhciBmcm9tQ29kZSA9IG1hcFttb2RpZmllcnMoYmFzZU5hbWUsIGV2ZW50LCB0cnVlKV07XG4gICAgICBpZiAoZnJvbUNvZGUgJiYgZnJvbUNvZGUodmlldy5zdGF0ZSwgdmlldy5kaXNwYXRjaCwgdmlldykpIHsgcmV0dXJuIHRydWUgfVxuICAgIH0gZWxzZSBpZiAoaXNDaGFyICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAvLyBPdGhlcndpc2UsIGlmIHNoaWZ0IGlzIGFjdGl2ZSwgYWxzbyB0cnkgdGhlIGJpbmRpbmcgd2l0aCB0aGVcbiAgICAgIC8vIFNoaWZ0LSBwcmVmaXggZW5hYmxlZC4gU2VlICM5OTdcbiAgICAgIHZhciB3aXRoU2hpZnQgPSBtYXBbbW9kaWZpZXJzKG5hbWUsIGV2ZW50LCB0cnVlKV07XG4gICAgICBpZiAod2l0aFNoaWZ0ICYmIHdpdGhTaGlmdCh2aWV3LnN0YXRlLCB2aWV3LmRpc3BhdGNoLCB2aWV3KSkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCB7IGtleWRvd25IYW5kbGVyLCBrZXltYXAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiaW1wb3J0IGNyZWwgZnJvbSAnY3JlbHQnO1xuaW1wb3J0IHsgam9pblVwLCBsaWZ0LCBzZWxlY3RQYXJlbnROb2RlLCBzZXRCbG9ja1R5cGUsIHdyYXBJbiB9IGZyb20gJ3Byb3NlbWlycm9yLWNvbW1hbmRzJztcbmltcG9ydCB7IHVuZG8sIHJlZG8gfSBmcm9tICdwcm9zZW1pcnJvci1oaXN0b3J5JztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3Byb3NlbWlycm9yLXN0YXRlJztcblxudmFyIFNWRyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbnZhciBYTElOSyA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiO1xuXG52YXIgcHJlZml4ID0gXCJQcm9zZU1pcnJvci1pY29uXCI7XG5cbmZ1bmN0aW9uIGhhc2hQYXRoKHBhdGgpIHtcbiAgdmFyIGhhc2ggPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspXG4gICAgeyBoYXNoID0gKCgoaGFzaCA8PCA1KSAtIGhhc2gpICsgcGF0aC5jaGFyQ29kZUF0KGkpKSB8IDA7IH1cbiAgcmV0dXJuIGhhc2hcbn1cblxuZnVuY3Rpb24gZ2V0SWNvbihpY29uKSB7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbm9kZS5jbGFzc05hbWUgPSBwcmVmaXg7XG4gIGlmIChpY29uLnBhdGgpIHtcbiAgICB2YXIgbmFtZSA9IFwicG0taWNvbi1cIiArIGhhc2hQYXRoKGljb24ucGF0aCkudG9TdHJpbmcoMTYpO1xuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSkpIHsgYnVpbGRTVkcobmFtZSwgaWNvbik7IH1cbiAgICB2YXIgc3ZnID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHLCBcInN2Z1wiKSk7XG4gICAgc3ZnLnN0eWxlLndpZHRoID0gKGljb24ud2lkdGggLyBpY29uLmhlaWdodCkgKyBcImVtXCI7XG4gICAgdmFyIHVzZSA9IHN2Zy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHLCBcInVzZVwiKSk7XG4gICAgdXNlLnNldEF0dHJpYnV0ZU5TKFhMSU5LLCBcImhyZWZcIiwgLyhbXiNdKikvLmV4ZWMoZG9jdW1lbnQubG9jYXRpb24pWzFdICsgXCIjXCIgKyBuYW1lKTtcbiAgfSBlbHNlIGlmIChpY29uLmRvbSkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoaWNvbi5kb20uY2xvbmVOb2RlKHRydWUpKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpKS50ZXh0Q29udGVudCA9IGljb24udGV4dCB8fCAnJztcbiAgICBpZiAoaWNvbi5jc3MpIHsgbm9kZS5maXJzdENoaWxkLnN0eWxlLmNzc1RleHQgPSBpY29uLmNzczsgfVxuICB9XG4gIHJldHVybiBub2RlXG59XG5cbmZ1bmN0aW9uIGJ1aWxkU1ZHKG5hbWUsIGRhdGEpIHtcbiAgdmFyIGNvbGxlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXggKyBcIi1jb2xsZWN0aW9uXCIpO1xuICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICBjb2xsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWRywgXCJzdmdcIik7XG4gICAgY29sbGVjdGlvbi5pZCA9IHByZWZpeCArIFwiLWNvbGxlY3Rpb25cIjtcbiAgICBjb2xsZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShjb2xsZWN0aW9uLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuICB9XG4gIHZhciBzeW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHLCBcInN5bWJvbFwiKTtcbiAgc3ltLmlkID0gbmFtZTtcbiAgc3ltLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgXCIgKyBkYXRhLndpZHRoICsgXCIgXCIgKyBkYXRhLmhlaWdodCk7XG4gIHZhciBwYXRoID0gc3ltLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkcsIFwicGF0aFwiKSk7XG4gIHBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBkYXRhLnBhdGgpO1xuICBjb2xsZWN0aW9uLmFwcGVuZENoaWxkKHN5bSk7XG59XG5cbnZhciBwcmVmaXgkMSA9IFwiUHJvc2VNaXJyb3ItbWVudVwiO1xuXG4vLyA6Oi0gQW4gaWNvbiBvciBsYWJlbCB0aGF0LCB3aGVuIGNsaWNrZWQsIGV4ZWN1dGVzIGEgY29tbWFuZC5cbnZhciBNZW51SXRlbSA9IGZ1bmN0aW9uIE1lbnVJdGVtKHNwZWMpIHtcbiAgLy8gOjogTWVudUl0ZW1TcGVjXG4gIC8vIFRoZSBzcGVjIHVzZWQgdG8gY3JlYXRlIHRoZSBtZW51IGl0ZW0uXG4gIHRoaXMuc3BlYyA9IHNwZWM7XG59O1xuXG4vLyA6OiAoRWRpdG9yVmlldykg4oaSIHtkb206IGRvbS5Ob2RlLCB1cGRhdGU6IChFZGl0b3JTdGF0ZSkg4oaSIGJvb2x9XG4vLyBSZW5kZXJzIHRoZSBpY29uIGFjY29yZGluZyB0byBpdHMgW2Rpc3BsYXlcbi8vIHNwZWNdKCNtZW51Lk1lbnVJdGVtU3BlYy5kaXNwbGF5KSwgYW5kIGFkZHMgYW4gZXZlbnQgaGFuZGxlciB3aGljaFxuLy8gZXhlY3V0ZXMgdGhlIGNvbW1hbmQgd2hlbiB0aGUgcmVwcmVzZW50YXRpb24gaXMgY2xpY2tlZC5cbk1lbnVJdGVtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKHZpZXcpIHtcbiAgdmFyIHNwZWMgPSB0aGlzLnNwZWM7XG4gIHZhciBkb20gPSBzcGVjLnJlbmRlciA/IHNwZWMucmVuZGVyKHZpZXcpXG4gICAgICA6IHNwZWMuaWNvbiA/IGdldEljb24oc3BlYy5pY29uKVxuICAgICAgOiBzcGVjLmxhYmVsID8gY3JlbChcImRpdlwiLCBudWxsLCB0cmFuc2xhdGUodmlldywgc3BlYy5sYWJlbCkpXG4gICAgICA6IG51bGw7XG4gIGlmICghZG9tKSB7IHRocm93IG5ldyBSYW5nZUVycm9yKFwiTWVudUl0ZW0gd2l0aG91dCBpY29uIG9yIGxhYmVsIHByb3BlcnR5XCIpIH1cbiAgaWYgKHNwZWMudGl0bGUpIHtcbiAgICB2YXIgdGl0bGUgPSAodHlwZW9mIHNwZWMudGl0bGUgPT09IFwiZnVuY3Rpb25cIiA/IHNwZWMudGl0bGUodmlldy5zdGF0ZSkgOiBzcGVjLnRpdGxlKTtcbiAgICBkb20uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdHJhbnNsYXRlKHZpZXcsIHRpdGxlKSk7XG4gIH1cbiAgaWYgKHNwZWMuY2xhc3MpIHsgZG9tLmNsYXNzTGlzdC5hZGQoc3BlYy5jbGFzcyk7IH1cbiAgaWYgKHNwZWMuY3NzKSB7IGRvbS5zdHlsZS5jc3NUZXh0ICs9IHNwZWMuY3NzOyB9XG5cbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFkb20uY2xhc3NMaXN0LmNvbnRhaW5zKHByZWZpeCQxICsgXCItZGlzYWJsZWRcIikpXG4gICAgICB7IHNwZWMucnVuKHZpZXcuc3RhdGUsIHZpZXcuZGlzcGF0Y2gsIHZpZXcsIGUpOyB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZShzdGF0ZSkge1xuICAgIGlmIChzcGVjLnNlbGVjdCkge1xuICAgICAgdmFyIHNlbGVjdGVkID0gc3BlYy5zZWxlY3Qoc3RhdGUpO1xuICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSBzZWxlY3RlZCA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgIGlmICghc2VsZWN0ZWQpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gICAgdmFyIGVuYWJsZWQgPSB0cnVlO1xuICAgIGlmIChzcGVjLmVuYWJsZSkge1xuICAgICAgZW5hYmxlZCA9IHNwZWMuZW5hYmxlKHN0YXRlKSB8fCBmYWxzZTtcbiAgICAgIHNldENsYXNzKGRvbSwgcHJlZml4JDEgKyBcIi1kaXNhYmxlZFwiLCAhZW5hYmxlZCk7XG4gICAgfVxuICAgIGlmIChzcGVjLmFjdGl2ZSkge1xuICAgICAgdmFyIGFjdGl2ZSA9IGVuYWJsZWQgJiYgc3BlYy5hY3RpdmUoc3RhdGUpIHx8IGZhbHNlO1xuICAgICAgc2V0Q2xhc3MoZG9tLCBwcmVmaXgkMSArIFwiLWFjdGl2ZVwiLCBhY3RpdmUpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIHtkb206IGRvbSwgdXBkYXRlOiB1cGRhdGV9XG59O1xuXG5mdW5jdGlvbiB0cmFuc2xhdGUodmlldywgdGV4dCkge1xuICByZXR1cm4gdmlldy5fcHJvcHMudHJhbnNsYXRlID8gdmlldy5fcHJvcHMudHJhbnNsYXRlKHRleHQpIDogdGV4dFxufVxuXG4vLyBNZW51SXRlbVNwZWM6OiBpbnRlcmZhY2Vcbi8vIFRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBwYXNzZWQgdG8gdGhlIGBNZW51SXRlbWAgY29uc3RydWN0b3IuXG4vL1xuLy8gICBydW46OiAoRWRpdG9yU3RhdGUsIChUcmFuc2FjdGlvbiksIEVkaXRvclZpZXcsIGRvbS5FdmVudClcbi8vICAgVGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgbWVudSBpdGVtIGlzIGFjdGl2YXRlZC5cbi8vXG4vLyAgIHNlbGVjdDo6ID8oRWRpdG9yU3RhdGUpIOKGkiBib29sXG4vLyAgIE9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgaXRlbSBpc1xuLy8gICBhcHByb3ByaWF0ZSBhdCB0aGUgbW9tZW50LiBEZXNlbGVjdGVkIGl0ZW1zIHdpbGwgYmUgaGlkZGVuLlxuLy9cbi8vICAgZW5hYmxlOjogPyhFZGl0b3JTdGF0ZSkg4oaSIGJvb2xcbi8vICAgRnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgaXRlbSBpcyBlbmFibGVkLiBJZlxuLy8gICBnaXZlbiBhbmQgcmV0dXJuaW5nIGZhbHNlLCB0aGUgaXRlbSB3aWxsIGJlIGdpdmVuIGEgZGlzYWJsZWRcbi8vICAgc3R5bGluZy5cbi8vXG4vLyAgIGFjdGl2ZTo6ID8oRWRpdG9yU3RhdGUpIOKGkiBib29sXG4vLyAgIEEgcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBpdGVtIGlzICdhY3RpdmUnIChmb3Jcbi8vICAgZXhhbXBsZSwgdGhlIGl0ZW0gZm9yIHRvZ2dsaW5nIHRoZSBzdHJvbmcgbWFyayBtaWdodCBiZSBhY3RpdmUgdGhlblxuLy8gICB0aGUgY3Vyc29yIGlzIGluIHN0cm9uZyB0ZXh0KS5cbi8vXG4vLyAgIHJlbmRlcjo6ID8oRWRpdG9yVmlldykg4oaSIGRvbS5Ob2RlXG4vLyAgIEEgZnVuY3Rpb24gdGhhdCByZW5kZXJzIHRoZSBpdGVtLiBZb3UgbXVzdCBwcm92aWRlIGVpdGhlciB0aGlzLFxuLy8gICBbYGljb25gXSgjbWVudS5NZW51SXRlbVNwZWMuaWNvbiksIG9yIFtgbGFiZWxgXSgjTWVudUl0ZW1TcGVjLmxhYmVsKS5cbi8vXG4vLyAgIGljb246OiA/T2JqZWN0XG4vLyAgIERlc2NyaWJlcyBhbiBpY29uIHRvIHNob3cgZm9yIHRoaXMgaXRlbS4gVGhlIG9iamVjdCBtYXkgc3BlY2lmeVxuLy8gICBhbiBTVkcgaWNvbiwgaW4gd2hpY2ggY2FzZSBpdHMgYHBhdGhgIHByb3BlcnR5IHNob3VsZCBiZSBhbiBbU1ZHXG4vLyAgIHBhdGhcbi8vICAgc3BlY10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9kKSxcbi8vICAgYW5kIGB3aWR0aGAgYW5kIGBoZWlnaHRgIHNob3VsZCBwcm92aWRlIHRoZSB2aWV3Ym94IGluIHdoaWNoIHRoYXRcbi8vICAgcGF0aCBleGlzdHMuIEFsdGVybmF0aXZlbHksIGl0IG1heSBoYXZlIGEgYHRleHRgIHByb3BlcnR5XG4vLyAgIHNwZWNpZnlpbmcgYSBzdHJpbmcgb2YgdGV4dCB0aGF0IG1ha2VzIHVwIHRoZSBpY29uLCB3aXRoIGFuXG4vLyAgIG9wdGlvbmFsIGBjc3NgIHByb3BlcnR5IGdpdmluZyBhZGRpdGlvbmFsIENTUyBzdHlsaW5nIGZvciB0aGVcbi8vICAgdGV4dC4gX09yXyBpdCBtYXkgY29udGFpbiBgZG9tYCBwcm9wZXJ0eSBjb250YWluaW5nIGEgRE9NIG5vZGUuXG4vL1xuLy8gICBsYWJlbDo6ID9zdHJpbmdcbi8vICAgTWFrZXMgdGhlIGl0ZW0gc2hvdyB1cCBhcyBhIHRleHQgbGFiZWwuIE1vc3RseSB1c2VmdWwgZm9yIGl0ZW1zXG4vLyAgIHdyYXBwZWQgaW4gYSBbZHJvcC1kb3duXSgjbWVudS5Ecm9wZG93bikgb3Igc2ltaWxhciBtZW51LiBUaGUgb2JqZWN0XG4vLyAgIHNob3VsZCBoYXZlIGEgYGxhYmVsYCBwcm9wZXJ0eSBwcm92aWRpbmcgdGhlIHRleHQgdG8gZGlzcGxheS5cbi8vXG4vLyAgIHRpdGxlOjogP3VuaW9uPHN0cmluZywgKEVkaXRvclN0YXRlKSDihpIgc3RyaW5nPlxuLy8gICBEZWZpbmVzIERPTSB0aXRsZSAobW91c2VvdmVyKSB0ZXh0IGZvciB0aGUgaXRlbS5cbi8vXG4vLyAgIGNsYXNzOjogP3N0cmluZ1xuLy8gICBPcHRpb25hbGx5IGFkZHMgYSBDU1MgY2xhc3MgdG8gdGhlIGl0ZW0ncyBET00gcmVwcmVzZW50YXRpb24uXG4vL1xuLy8gICBjc3M6OiA/c3RyaW5nXG4vLyAgIE9wdGlvbmFsbHkgYWRkcyBhIHN0cmluZyBvZiBpbmxpbmUgQ1NTIHRvIHRoZSBpdGVtJ3MgRE9NXG4vLyAgIHJlcHJlc2VudGF0aW9uLlxuXG52YXIgbGFzdE1lbnVFdmVudCA9IHt0aW1lOiAwLCBub2RlOiBudWxsfTtcbmZ1bmN0aW9uIG1hcmtNZW51RXZlbnQoZSkge1xuICBsYXN0TWVudUV2ZW50LnRpbWUgPSBEYXRlLm5vdygpO1xuICBsYXN0TWVudUV2ZW50Lm5vZGUgPSBlLnRhcmdldDtcbn1cbmZ1bmN0aW9uIGlzTWVudUV2ZW50KHdyYXBwZXIpIHtcbiAgcmV0dXJuIERhdGUubm93KCkgLSAxMDAgPCBsYXN0TWVudUV2ZW50LnRpbWUgJiZcbiAgICBsYXN0TWVudUV2ZW50Lm5vZGUgJiYgd3JhcHBlci5jb250YWlucyhsYXN0TWVudUV2ZW50Lm5vZGUpXG59XG5cbi8vIDo6LSBBIGRyb3AtZG93biBtZW51LCBkaXNwbGF5ZWQgYXMgYSBsYWJlbCB3aXRoIGEgZG93bndhcmRzLXBvaW50aW5nXG4vLyB0cmlhbmdsZSB0byB0aGUgcmlnaHQgb2YgaXQuXG52YXIgRHJvcGRvd24gPSBmdW5jdGlvbiBEcm9wZG93bihjb250ZW50LCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuY29udGVudCA9IEFycmF5LmlzQXJyYXkoY29udGVudCkgPyBjb250ZW50IDogW2NvbnRlbnRdO1xufTtcblxuLy8gOjogKEVkaXRvclZpZXcpIOKGkiB7ZG9tOiBkb20uTm9kZSwgdXBkYXRlOiAoRWRpdG9yU3RhdGUpfVxuLy8gUmVuZGVyIHRoZSBkcm9wZG93biBtZW51IGFuZCBzdWItaXRlbXMuXG5Ecm9wZG93bi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh2aWV3KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGNvbnRlbnQgPSByZW5kZXJEcm9wZG93bkl0ZW1zKHRoaXMuY29udGVudCwgdmlldyk7XG5cbiAgdmFyIGxhYmVsID0gY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQxICsgXCItZHJvcGRvd24gXCIgKyAodGhpcy5vcHRpb25zLmNsYXNzIHx8IFwiXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMub3B0aW9ucy5jc3N9LFxuICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSh2aWV3LCB0aGlzLm9wdGlvbnMubGFiZWwpKTtcbiAgaWYgKHRoaXMub3B0aW9ucy50aXRsZSkgeyBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCB0cmFuc2xhdGUodmlldywgdGhpcy5vcHRpb25zLnRpdGxlKSk7IH1cbiAgdmFyIHdyYXAgPSBjcmVsKFwiZGl2XCIsIHtjbGFzczogcHJlZml4JDEgKyBcIi1kcm9wZG93bi13cmFwXCJ9LCBsYWJlbCk7XG4gIHZhciBvcGVuID0gbnVsbCwgbGlzdGVuaW5nT25DbG9zZSA9IG51bGw7XG4gIHZhciBjbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAob3BlbiAmJiBvcGVuLmNsb3NlKCkpIHtcbiAgICAgIG9wZW4gPSBudWxsO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbGlzdGVuaW5nT25DbG9zZSk7XG4gICAgfVxuICB9O1xuICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG1hcmtNZW51RXZlbnQoZSk7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW4gPSB0aGlzJDEuZXhwYW5kKHdyYXAsIGNvbnRlbnQuZG9tKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmluZ09uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNNZW51RXZlbnQod3JhcCkpIHsgY2xvc2UoKTsgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiB1cGRhdGUoc3RhdGUpIHtcbiAgICB2YXIgaW5uZXIgPSBjb250ZW50LnVwZGF0ZShzdGF0ZSk7XG4gICAgd3JhcC5zdHlsZS5kaXNwbGF5ID0gaW5uZXIgPyBcIlwiIDogXCJub25lXCI7XG4gICAgcmV0dXJuIGlubmVyXG4gIH1cblxuICByZXR1cm4ge2RvbTogd3JhcCwgdXBkYXRlOiB1cGRhdGV9XG59O1xuXG5Ecm9wZG93bi5wcm90b3R5cGUuZXhwYW5kID0gZnVuY3Rpb24gZXhwYW5kIChkb20sIGl0ZW1zKSB7XG4gIHZhciBtZW51RE9NID0gY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQxICsgXCItZHJvcGRvd24tbWVudSBcIiArICh0aGlzLm9wdGlvbnMuY2xhc3MgfHwgXCJcIil9LCBpdGVtcyk7XG5cbiAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgaWYgKGRvbmUpIHsgcmV0dXJuIH1cbiAgICBkb25lID0gdHJ1ZTtcbiAgICBkb20ucmVtb3ZlQ2hpbGQobWVudURPTSk7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBkb20uYXBwZW5kQ2hpbGQobWVudURPTSk7XG4gIHJldHVybiB7Y2xvc2U6IGNsb3NlLCBub2RlOiBtZW51RE9NfVxufTtcblxuZnVuY3Rpb24gcmVuZGVyRHJvcGRvd25JdGVtcyhpdGVtcywgdmlldykge1xuICB2YXIgcmVuZGVyZWQgPSBbXSwgdXBkYXRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlZiA9IGl0ZW1zW2ldLnJlbmRlcih2aWV3KTtcbiAgICB2YXIgZG9tID0gcmVmLmRvbTtcbiAgICB2YXIgdXBkYXRlID0gcmVmLnVwZGF0ZTtcbiAgICByZW5kZXJlZC5wdXNoKGNyZWwoXCJkaXZcIiwge2NsYXNzOiBwcmVmaXgkMSArIFwiLWRyb3Bkb3duLWl0ZW1cIn0sIGRvbSkpO1xuICAgIHVwZGF0ZXMucHVzaCh1cGRhdGUpO1xuICB9XG4gIHJldHVybiB7ZG9tOiByZW5kZXJlZCwgdXBkYXRlOiBjb21iaW5lVXBkYXRlcyh1cGRhdGVzLCByZW5kZXJlZCl9XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVVcGRhdGVzKHVwZGF0ZXMsIG5vZGVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICB2YXIgc29tZXRoaW5nID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cGRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdXAgPSB1cGRhdGVzW2ldKHN0YXRlKTtcbiAgICAgIG5vZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSB1cCA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgIGlmICh1cCkgeyBzb21ldGhpbmcgPSB0cnVlOyB9XG4gICAgfVxuICAgIHJldHVybiBzb21ldGhpbmdcbiAgfVxufVxuXG4vLyA6Oi0gUmVwcmVzZW50cyBhIHN1Ym1lbnUgd3JhcHBpbmcgYSBncm91cCBvZiBlbGVtZW50cyB0aGF0IHN0YXJ0XG4vLyBoaWRkZW4gYW5kIGV4cGFuZCB0byB0aGUgcmlnaHQgd2hlbiBob3ZlcmVkIG92ZXIgb3IgdGFwcGVkLlxudmFyIERyb3Bkb3duU3VibWVudSA9IGZ1bmN0aW9uIERyb3Bkb3duU3VibWVudShjb250ZW50LCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuY29udGVudCA9IEFycmF5LmlzQXJyYXkoY29udGVudCkgPyBjb250ZW50IDogW2NvbnRlbnRdO1xufTtcblxuLy8gOjogKEVkaXRvclZpZXcpIOKGkiB7ZG9tOiBkb20uTm9kZSwgdXBkYXRlOiAoRWRpdG9yU3RhdGUpIOKGkiBib29sfVxuLy8gUmVuZGVycyB0aGUgc3VibWVudS5cbkRyb3Bkb3duU3VibWVudS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh2aWV3KSB7XG4gIHZhciBpdGVtcyA9IHJlbmRlckRyb3Bkb3duSXRlbXModGhpcy5jb250ZW50LCB2aWV3KTtcblxuICB2YXIgbGFiZWwgPSBjcmVsKFwiZGl2XCIsIHtjbGFzczogcHJlZml4JDEgKyBcIi1zdWJtZW51LWxhYmVsXCJ9LCB0cmFuc2xhdGUodmlldywgdGhpcy5vcHRpb25zLmxhYmVsKSk7XG4gIHZhciB3cmFwID0gY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQxICsgXCItc3VibWVudS13cmFwXCJ9LCBsYWJlbCxcbiAgICAgICAgICAgICAgICAgY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQxICsgXCItc3VibWVudVwifSwgaXRlbXMuZG9tKSk7XG4gIHZhciBsaXN0ZW5pbmdPbkNsb3NlID0gbnVsbDtcbiAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBtYXJrTWVudUV2ZW50KGUpO1xuICAgIHNldENsYXNzKHdyYXAsIHByZWZpeCQxICsgXCItc3VibWVudS13cmFwLWFjdGl2ZVwiKTtcbiAgICBpZiAoIWxpc3RlbmluZ09uQ2xvc2UpXG4gICAgICB7IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmluZ09uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNNZW51RXZlbnQod3JhcCkpIHtcbiAgICAgICAgICB3cmFwLmNsYXNzTGlzdC5yZW1vdmUocHJlZml4JDEgKyBcIi1zdWJtZW51LXdyYXAtYWN0aXZlXCIpO1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmluZ09uQ2xvc2UpO1xuICAgICAgICAgIGxpc3RlbmluZ09uQ2xvc2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTsgfVxuICB9KTtcblxuICBmdW5jdGlvbiB1cGRhdGUoc3RhdGUpIHtcbiAgICB2YXIgaW5uZXIgPSBpdGVtcy51cGRhdGUoc3RhdGUpO1xuICAgIHdyYXAuc3R5bGUuZGlzcGxheSA9IGlubmVyID8gXCJcIiA6IFwibm9uZVwiO1xuICAgIHJldHVybiBpbm5lclxuICB9XG4gIHJldHVybiB7ZG9tOiB3cmFwLCB1cGRhdGU6IHVwZGF0ZX1cbn07XG5cbi8vIDo6IChFZGl0b3JWaWV3LCBbdW5pb248TWVudUVsZW1lbnQsIFtNZW51RWxlbWVudF0+XSkg4oaSIHtkb206ID9kb20uRG9jdW1lbnRGcmFnbWVudCwgdXBkYXRlOiAoRWRpdG9yU3RhdGUpIOKGkiBib29sfVxuLy8gUmVuZGVyIHRoZSBnaXZlbiwgcG9zc2libHkgbmVzdGVkLCBhcnJheSBvZiBtZW51IGVsZW1lbnRzIGludG8gYVxuLy8gZG9jdW1lbnQgZnJhZ21lbnQsIHBsYWNpbmcgc2VwYXJhdG9ycyBiZXR3ZWVuIHRoZW0gKGFuZCBlbnN1cmluZyBub1xuLy8gc3VwZXJmbHVvdXMgc2VwYXJhdG9ycyBhcHBlYXIgd2hlbiBzb21lIG9mIHRoZSBncm91cHMgdHVybiBvdXQgdG9cbi8vIGJlIGVtcHR5KS5cbmZ1bmN0aW9uIHJlbmRlckdyb3VwZWQodmlldywgY29udGVudCkge1xuICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgdXBkYXRlcyA9IFtdLCBzZXBhcmF0b3JzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtcyA9IGNvbnRlbnRbaV0sIGxvY2FsVXBkYXRlcyA9IFtdLCBsb2NhbE5vZGVzID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtcy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIHJlZiA9IGl0ZW1zW2pdLnJlbmRlcih2aWV3KTtcbiAgICAgIHZhciBkb20gPSByZWYuZG9tO1xuICAgICAgdmFyIHVwZGF0ZSQxID0gcmVmLnVwZGF0ZTtcbiAgICAgIHZhciBzcGFuID0gY3JlbChcInNwYW5cIiwge2NsYXNzOiBwcmVmaXgkMSArIFwiaXRlbVwifSwgZG9tKTtcbiAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgIGxvY2FsTm9kZXMucHVzaChzcGFuKTtcbiAgICAgIGxvY2FsVXBkYXRlcy5wdXNoKHVwZGF0ZSQxKTtcbiAgICB9XG4gICAgaWYgKGxvY2FsVXBkYXRlcy5sZW5ndGgpIHtcbiAgICAgIHVwZGF0ZXMucHVzaChjb21iaW5lVXBkYXRlcyhsb2NhbFVwZGF0ZXMsIGxvY2FsTm9kZXMpKTtcbiAgICAgIGlmIChpIDwgY29udGVudC5sZW5ndGggLSAxKVxuICAgICAgICB7IHNlcGFyYXRvcnMucHVzaChyZXN1bHQuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yKCkpKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShzdGF0ZSkge1xuICAgIHZhciBzb21ldGhpbmcgPSBmYWxzZSwgbmVlZFNlcCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXBkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhhc0NvbnRlbnQgPSB1cGRhdGVzW2ldKHN0YXRlKTtcbiAgICAgIGlmIChpKSB7IHNlcGFyYXRvcnNbaSAtIDFdLnN0eWxlLmRpc3BsYXkgPSBuZWVkU2VwICYmIGhhc0NvbnRlbnQgPyBcIlwiIDogXCJub25lXCI7IH1cbiAgICAgIG5lZWRTZXAgPSBoYXNDb250ZW50O1xuICAgICAgaWYgKGhhc0NvbnRlbnQpIHsgc29tZXRoaW5nID0gdHJ1ZTsgfVxuICAgIH1cbiAgICByZXR1cm4gc29tZXRoaW5nXG4gIH1cbiAgcmV0dXJuIHtkb206IHJlc3VsdCwgdXBkYXRlOiB1cGRhdGV9XG59XG5cbmZ1bmN0aW9uIHNlcGFyYXRvcigpIHtcbiAgcmV0dXJuIGNyZWwoXCJzcGFuXCIsIHtjbGFzczogcHJlZml4JDEgKyBcInNlcGFyYXRvclwifSlcbn1cblxuLy8gOjogT2JqZWN0XG4vLyBBIHNldCBvZiBiYXNpYyBlZGl0b3ItcmVsYXRlZCBpY29ucy4gQ29udGFpbnMgdGhlIHByb3BlcnRpZXNcbi8vIGBqb2luYCwgYGxpZnRgLCBgc2VsZWN0UGFyZW50Tm9kZWAsIGB1bmRvYCwgYHJlZG9gLCBgc3Ryb25nYCwgYGVtYCxcbi8vIGBjb2RlYCwgYGxpbmtgLCBgYnVsbGV0TGlzdGAsIGBvcmRlcmVkTGlzdGAsIGFuZCBgYmxvY2txdW90ZWAsIGVhY2hcbi8vIGhvbGRpbmcgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGBpY29uYCBvcHRpb24gdG9cbi8vIGBNZW51SXRlbWAuXG52YXIgaWNvbnMgPSB7XG4gIGpvaW46IHtcbiAgICB3aWR0aDogODAwLCBoZWlnaHQ6IDkwMCxcbiAgICBwYXRoOiBcIk0wIDc1aDgwMHYxMjVoLTgwMHogTTAgODI1aDgwMHYtMTI1aC04MDB6IE0yNTAgNDAwaDEwMHYtMTAwaDEwMHYxMDBoMTAwdjEwMGgtMTAwdjEwMGgtMTAwdi0xMDBoLTEwMHpcIlxuICB9LFxuICBsaWZ0OiB7XG4gICAgd2lkdGg6IDEwMjQsIGhlaWdodDogMTAyNCxcbiAgICBwYXRoOiBcIk0yMTkgMzEwdjMyOXEwIDctNSAxMnQtMTIgNXEtOCAwLTEzLTVsLTE2NC0xNjRxLTUtNS01LTEzdDUtMTNsMTY0LTE2NHE1LTUgMTMtNSA3IDAgMTIgNXQ1IDEyek0xMDI0IDc0OXYxMDlxMCA3LTUgMTJ0LTEyIDVoLTk4N3EtNyAwLTEyLTV0LTUtMTJ2LTEwOXEwLTcgNS0xMnQxMi01aDk4N3E3IDAgMTIgNXQ1IDEyek0xMDI0IDUzMHYxMDlxMCA3LTUgMTJ0LTEyIDVoLTYyMXEtNyAwLTEyLTV0LTUtMTJ2LTEwOXEwLTcgNS0xMnQxMi01aDYyMXE3IDAgMTIgNXQ1IDEyek0xMDI0IDMxMHYxMDlxMCA3LTUgMTJ0LTEyIDVoLTYyMXEtNyAwLTEyLTV0LTUtMTJ2LTEwOXEwLTcgNS0xMnQxMi01aDYyMXE3IDAgMTIgNXQ1IDEyek0xMDI0IDkxdjEwOXEwIDctNSAxMnQtMTIgNWgtOTg3cS03IDAtMTItNXQtNS0xMnYtMTA5cTAtNyA1LTEydDEyLTVoOTg3cTcgMCAxMiA1dDUgMTJ6XCJcbiAgfSxcbiAgc2VsZWN0UGFyZW50Tm9kZToge3RleHQ6IFwiXFx1MmIxYVwiLCBjc3M6IFwiZm9udC13ZWlnaHQ6IGJvbGRcIn0sXG4gIHVuZG86IHtcbiAgICB3aWR0aDogMTAyNCwgaGVpZ2h0OiAxMDI0LFxuICAgIHBhdGg6IFwiTTc2MSAxMDI0YzExMy0yMDYgMTMyLTUyMC0zMTMtNTA5djI1M2wtMzg0LTM4NCAzODQtMzg0djI0OGM1MzQtMTMgNTk0IDQ3MiAzMTMgNzc1elwiXG4gIH0sXG4gIHJlZG86IHtcbiAgICB3aWR0aDogMTAyNCwgaGVpZ2h0OiAxMDI0LFxuICAgIHBhdGg6IFwiTTU3NiAyNDh2LTI0OGwzODQgMzg0LTM4NCAzODR2LTI1M2MtNDQ2LTEwLTQyNyAzMDMtMzEzIDUwOS0yODAtMzAzLTIyMS03ODkgMzEzLTc3NXpcIlxuICB9LFxuICBzdHJvbmc6IHtcbiAgICB3aWR0aDogODA1LCBoZWlnaHQ6IDEwMjQsXG4gICAgcGF0aDogXCJNMzE3IDg2OXE0MiAxOCA4MCAxOCAyMTQgMCAyMTQtMTkxIDAtNjUtMjMtMTAyLTE1LTI1LTM1LTQydC0zOC0yNi00Ni0xNC00OC02LTU0LTFxLTQxIDAtNTcgNSAwIDMwLTAgOTB0LTAgOTBxMCA0LTAgMzh0LTAgNTUgMiA0NyA2IDM4ek0zMDkgNDQycTI0IDQgNjIgNCA0NiAwIDgxLTd0NjItMjUgNDItNTEgMTQtODFxMC00MC0xNi03MHQtNDUtNDYtNjEtMjQtNzAtOHEtMjggMC03NCA3IDAgMjggMiA4NnQyIDg2cTAgMTUtMCA0NXQtMCA0NXEwIDI2IDAgMzl6TTAgOTUwbDEtNTNxOC0yIDQ4LTl0NjAtMTVxNC02IDctMTV0NC0xOSAzLTE4IDEtMjEgMC0xOXYtMzdxMC01NjEtMTItNTg1LTItNC0xMi04dC0yNS02LTI4LTQtMjctMi0xNy0xbC0yLTQ3cTU2LTEgMTk0LTZ0MjEzLTVxMTMgMCAzOSAwdDM4IDBxNDAgMCA3OCA3dDczIDI0IDYxIDQwIDQyIDU5IDE2IDc4cTAgMjktOSA1NHQtMjIgNDEtMzYgMzItNDEgMjUtNDggMjJxODggMjAgMTQ2IDc2dDU4IDE0MXEwIDU3LTIwIDEwMnQtNTMgNzQtNzggNDgtOTMgMjctMTAwIDhxLTI1IDAtNzUtMXQtNzUtMXEtNjAgMC0xNzUgNnQtMTMyIDZ6XCJcbiAgfSxcbiAgZW06IHtcbiAgICB3aWR0aDogNTg1LCBoZWlnaHQ6IDEwMjQsXG4gICAgcGF0aDogXCJNMCA5NDlsOS00OHEzLTEgNDYtMTJ0NjMtMjFxMTYtMjAgMjMtNTcgMC00IDM1LTE2NXQ2NS0zMTAgMjktMTY5di0xNHEtMTMtNy0zMS0xMHQtMzktNC0zMy0zbDEwLTU4cTE4IDEgNjggM3Q4NSA0IDY4IDFxMjcgMCA1Ni0xdDY5LTQgNTYtM3EtMiAyMi0xMCA1MC0xNyA1LTU4IDE2dC02MiAxOXEtNCAxMC04IDI0dC01IDIyLTQgMjYtMyAyNHEtMTUgODQtNTAgMjM5dC00NCAyMDNxLTEgNS03IDMzdC0xMSA1MS05IDQ3LTMgMzJsMCAxMHE5IDIgMTA1IDE3LTEgMjUtOSA1Ni02IDAtMTggMHQtMTggMHEtMTYgMC00OS01dC00OS01cS03OC0xLTExNy0xLTI5IDAtODEgNXQtNjkgNnpcIlxuICB9LFxuICBjb2RlOiB7XG4gICAgd2lkdGg6IDg5NiwgaGVpZ2h0OiAxMDI0LFxuICAgIHBhdGg6IFwiTTYwOCAxOTJsLTk2IDk2IDIyNCAyMjQtMjI0IDIyNCA5NiA5NiAyODgtMzIwLTI4OC0zMjB6TTI4OCAxOTJsLTI4OCAzMjAgMjg4IDMyMCA5Ni05Ni0yMjQtMjI0IDIyNC0yMjQtOTYtOTZ6XCJcbiAgfSxcbiAgbGluazoge1xuICAgIHdpZHRoOiA5NTEsIGhlaWdodDogMTAyNCxcbiAgICBwYXRoOiBcIk04MzIgNjk0cTAtMjItMTYtMzhsLTExOC0xMThxLTE2LTE2LTM4LTE2LTI0IDAtNDEgMTggMSAxIDEwIDEwdDEyIDEyIDggMTAgNyAxNCAyIDE1cTAgMjItMTYgMzh0LTM4IDE2cS04IDAtMTUtMnQtMTQtNy0xMC04LTEyLTEyLTEwLTEwcS0xOCAxNy0xOCA0MSAwIDIyIDE2IDM4bDExNyAxMThxMTUgMTUgMzggMTUgMjIgMCAzOC0xNGw4NC04M3ExNi0xNiAxNi0zOHpNNDMwIDI5MnEwLTIyLTE2LTM4bC0xMTctMTE4cS0xNi0xNi0zOC0xNi0yMiAwLTM4IDE1bC04NCA4M3EtMTYgMTYtMTYgMzggMCAyMiAxNiAzOGwxMTggMTE4cTE1IDE1IDM4IDE1IDI0IDAgNDEtMTctMS0xLTEwLTEwdC0xMi0xMi04LTEwLTctMTQtMi0xNXEwLTIyIDE2LTM4dDM4LTE2cTggMCAxNSAydDE0IDcgMTAgOCAxMiAxMiAxMCAxMHExOC0xNyAxOC00MXpNOTQxIDY5NHEwIDY4LTQ4IDExNmwtODQgODNxLTQ3IDQ3LTExNiA0Ny02OSAwLTExNi00OGwtMTE3LTExOHEtNDctNDctNDctMTE2IDAtNzAgNTAtMTE5bC01MC01MHEtNDkgNTAtMTE4IDUwLTY4IDAtMTE2LTQ4bC0xMTgtMTE4cS00OC00OC00OC0xMTZ0NDgtMTE2bDg0LTgzcTQ3LTQ3IDExNi00NyA2OSAwIDExNiA0OGwxMTcgMTE4cTQ3IDQ3IDQ3IDExNiAwIDcwLTUwIDExOWw1MCA1MHE0OS01MCAxMTgtNTAgNjggMCAxMTYgNDhsMTE4IDExOHE0OCA0OCA0OCAxMTZ6XCJcbiAgfSxcbiAgYnVsbGV0TGlzdDoge1xuICAgIHdpZHRoOiA3NjgsIGhlaWdodDogODk2LFxuICAgIHBhdGg6IFwiTTAgNTEyaDEyOHYtMTI4aC0xMjh2MTI4ek0wIDI1NmgxMjh2LTEyOGgtMTI4djEyOHpNMCA3NjhoMTI4di0xMjhoLTEyOHYxMjh6TTI1NiA1MTJoNTEydi0xMjhoLTUxMnYxMjh6TTI1NiAyNTZoNTEydi0xMjhoLTUxMnYxMjh6TTI1NiA3NjhoNTEydi0xMjhoLTUxMnYxMjh6XCJcbiAgfSxcbiAgb3JkZXJlZExpc3Q6IHtcbiAgICB3aWR0aDogNzY4LCBoZWlnaHQ6IDg5NixcbiAgICBwYXRoOiBcIk0zMjAgNTEyaDQ0OHYtMTI4aC00NDh2MTI4ek0zMjAgNzY4aDQ0OHYtMTI4aC00NDh2MTI4ek0zMjAgMTI4djEyOGg0NDh2LTEyOGgtNDQ4ek03OSAzODRoNzh2LTI1NmgtMzZsLTg1IDIzdjUwbDQzLTJ2MTg1ek0xODkgNTkwYzAtMzYtMTItNzgtOTYtNzgtMzMgMC02NCA2LTgzIDE2bDEgNjZjMjEtMTAgNDItMTUgNjctMTVzMzIgMTEgMzIgMjhjMCAyNi0zMCA1OC0xMTAgMTEydjUwaDE5MnYtNjdsLTkxIDJjNDktMzAgODctNjYgODctMTEzbDEtMXpcIlxuICB9LFxuICBibG9ja3F1b3RlOiB7XG4gICAgd2lkdGg6IDY0MCwgaGVpZ2h0OiA4OTYsXG4gICAgcGF0aDogXCJNMCA0NDh2MjU2aDI1NnYtMjU2aC0xMjhjMCAwIDAtMTI4IDEyOC0xMjh2LTEyOGMwIDAtMjU2IDAtMjU2IDI1NnpNNjQwIDMyMHYtMTI4YzAgMC0yNTYgMC0yNTYgMjU2djI1NmgyNTZ2LTI1NmgtMTI4YzAgMCAwLTEyOCAxMjgtMTI4elwiXG4gIH1cbn07XG5cbi8vIDo6IE1lbnVJdGVtXG4vLyBNZW51IGl0ZW0gZm9yIHRoZSBgam9pblVwYCBjb21tYW5kLlxudmFyIGpvaW5VcEl0ZW0gPSBuZXcgTWVudUl0ZW0oe1xuICB0aXRsZTogXCJKb2luIHdpdGggYWJvdmUgYmxvY2tcIixcbiAgcnVuOiBqb2luVXAsXG4gIHNlbGVjdDogZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBqb2luVXAoc3RhdGUpOyB9LFxuICBpY29uOiBpY29ucy5qb2luXG59KTtcblxuLy8gOjogTWVudUl0ZW1cbi8vIE1lbnUgaXRlbSBmb3IgdGhlIGBsaWZ0YCBjb21tYW5kLlxudmFyIGxpZnRJdGVtID0gbmV3IE1lbnVJdGVtKHtcbiAgdGl0bGU6IFwiTGlmdCBvdXQgb2YgZW5jbG9zaW5nIGJsb2NrXCIsXG4gIHJ1bjogbGlmdCxcbiAgc2VsZWN0OiBmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIGxpZnQoc3RhdGUpOyB9LFxuICBpY29uOiBpY29ucy5saWZ0XG59KTtcblxuLy8gOjogTWVudUl0ZW1cbi8vIE1lbnUgaXRlbSBmb3IgdGhlIGBzZWxlY3RQYXJlbnROb2RlYCBjb21tYW5kLlxudmFyIHNlbGVjdFBhcmVudE5vZGVJdGVtID0gbmV3IE1lbnVJdGVtKHtcbiAgdGl0bGU6IFwiU2VsZWN0IHBhcmVudCBub2RlXCIsXG4gIHJ1bjogc2VsZWN0UGFyZW50Tm9kZSxcbiAgc2VsZWN0OiBmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHNlbGVjdFBhcmVudE5vZGUoc3RhdGUpOyB9LFxuICBpY29uOiBpY29ucy5zZWxlY3RQYXJlbnROb2RlXG59KTtcblxuLy8gOjogTWVudUl0ZW1cbi8vIE1lbnUgaXRlbSBmb3IgdGhlIGB1bmRvYCBjb21tYW5kLlxudmFyIHVuZG9JdGVtID0gbmV3IE1lbnVJdGVtKHtcbiAgdGl0bGU6IFwiVW5kbyBsYXN0IGNoYW5nZVwiLFxuICBydW46IHVuZG8sXG4gIGVuYWJsZTogZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiB1bmRvKHN0YXRlKTsgfSxcbiAgaWNvbjogaWNvbnMudW5kb1xufSk7XG5cbi8vIDo6IE1lbnVJdGVtXG4vLyBNZW51IGl0ZW0gZm9yIHRoZSBgcmVkb2AgY29tbWFuZC5cbnZhciByZWRvSXRlbSA9IG5ldyBNZW51SXRlbSh7XG4gIHRpdGxlOiBcIlJlZG8gbGFzdCB1bmRvbmUgY2hhbmdlXCIsXG4gIHJ1bjogcmVkbyxcbiAgZW5hYmxlOiBmdW5jdGlvbiAoc3RhdGUpIHsgcmV0dXJuIHJlZG8oc3RhdGUpOyB9LFxuICBpY29uOiBpY29ucy5yZWRvXG59KTtcblxuLy8gOjogKE5vZGVUeXBlLCBPYmplY3QpIOKGkiBNZW51SXRlbVxuLy8gQnVpbGQgYSBtZW51IGl0ZW0gZm9yIHdyYXBwaW5nIHRoZSBzZWxlY3Rpb24gaW4gYSBnaXZlbiBub2RlIHR5cGUuXG4vLyBBZGRzIGBydW5gIGFuZCBgc2VsZWN0YCBwcm9wZXJ0aWVzIHRvIHRoZSBvbmVzIHByZXNlbnQgaW5cbi8vIGBvcHRpb25zYC4gYG9wdGlvbnMuYXR0cnNgIG1heSBiZSBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIHdyYXBJdGVtKG5vZGVUeXBlLCBvcHRpb25zKSB7XG4gIHZhciBwYXNzZWRPcHRpb25zID0ge1xuICAgIHJ1bjogZnVuY3Rpb24gcnVuKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgICAgLy8gRklYTUUgaWYgKG9wdGlvbnMuYXR0cnMgaW5zdGFuY2VvZiBGdW5jdGlvbikgb3B0aW9ucy5hdHRycyhzdGF0ZSwgYXR0cnMgPT4gd3JhcEluKG5vZGVUeXBlLCBhdHRycykoc3RhdGUpKVxuICAgICAgcmV0dXJuIHdyYXBJbihub2RlVHlwZSwgb3B0aW9ucy5hdHRycykoc3RhdGUsIGRpc3BhdGNoKVxuICAgIH0sXG4gICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3Qoc3RhdGUpIHtcbiAgICAgIHJldHVybiB3cmFwSW4obm9kZVR5cGUsIG9wdGlvbnMuYXR0cnMgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IG51bGwgOiBvcHRpb25zLmF0dHJzKShzdGF0ZSlcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIHByb3AgaW4gb3B0aW9ucykgeyBwYXNzZWRPcHRpb25zW3Byb3BdID0gb3B0aW9uc1twcm9wXTsgfVxuICByZXR1cm4gbmV3IE1lbnVJdGVtKHBhc3NlZE9wdGlvbnMpXG59XG5cbi8vIDo6IChOb2RlVHlwZSwgT2JqZWN0KSDihpIgTWVudUl0ZW1cbi8vIEJ1aWxkIGEgbWVudSBpdGVtIGZvciBjaGFuZ2luZyB0aGUgdHlwZSBvZiB0aGUgdGV4dGJsb2NrIGFyb3VuZCB0aGVcbi8vIHNlbGVjdGlvbiB0byB0aGUgZ2l2ZW4gdHlwZS4gUHJvdmlkZXMgYHJ1bmAsIGBhY3RpdmVgLCBhbmQgYHNlbGVjdGBcbi8vIHByb3BlcnRpZXMuIE90aGVycyBtdXN0IGJlIGdpdmVuIGluIGBvcHRpb25zYC4gYG9wdGlvbnMuYXR0cnNgIG1heVxuLy8gYmUgYW4gb2JqZWN0IHRvIHByb3ZpZGUgdGhlIGF0dHJpYnV0ZXMgZm9yIHRoZSB0ZXh0YmxvY2sgbm9kZS5cbmZ1bmN0aW9uIGJsb2NrVHlwZUl0ZW0obm9kZVR5cGUsIG9wdGlvbnMpIHtcbiAgdmFyIGNvbW1hbmQgPSBzZXRCbG9ja1R5cGUobm9kZVR5cGUsIG9wdGlvbnMuYXR0cnMpO1xuICB2YXIgcGFzc2VkT3B0aW9ucyA9IHtcbiAgICBydW46IGNvbW1hbmQsXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoc3RhdGUpIHsgcmV0dXJuIGNvbW1hbmQoc3RhdGUpIH0sXG4gICAgYWN0aXZlOiBmdW5jdGlvbiBhY3RpdmUoc3RhdGUpIHtcbiAgICAgIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgICB2YXIgJGZyb20gPSByZWYuJGZyb207XG4gICAgICB2YXIgdG8gPSByZWYudG87XG4gICAgICB2YXIgbm9kZSA9IHJlZi5ub2RlO1xuICAgICAgaWYgKG5vZGUpIHsgcmV0dXJuIG5vZGUuaGFzTWFya3VwKG5vZGVUeXBlLCBvcHRpb25zLmF0dHJzKSB9XG4gICAgICByZXR1cm4gdG8gPD0gJGZyb20uZW5kKCkgJiYgJGZyb20ucGFyZW50Lmhhc01hcmt1cChub2RlVHlwZSwgb3B0aW9ucy5hdHRycylcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIHByb3AgaW4gb3B0aW9ucykgeyBwYXNzZWRPcHRpb25zW3Byb3BdID0gb3B0aW9uc1twcm9wXTsgfVxuICByZXR1cm4gbmV3IE1lbnVJdGVtKHBhc3NlZE9wdGlvbnMpXG59XG5cbi8vIFdvcmsgYXJvdW5kIGNsYXNzTGlzdC50b2dnbGUgYmVpbmcgYnJva2VuIGluIElFMTFcbmZ1bmN0aW9uIHNldENsYXNzKGRvbSwgY2xzLCBvbikge1xuICBpZiAob24pIHsgZG9tLmNsYXNzTGlzdC5hZGQoY2xzKTsgfVxuICBlbHNlIHsgZG9tLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTsgfVxufVxuXG52YXIgcHJlZml4JDIgPSBcIlByb3NlTWlycm9yLW1lbnViYXJcIjtcblxuZnVuY3Rpb24gaXNJT1MoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yID09IFwidW5kZWZpbmVkXCIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuICEvRWRnZVxcL1xcZC8udGVzdChhZ2VudCkgJiYgL0FwcGxlV2ViS2l0Ly50ZXN0KGFnZW50KSAmJiAvTW9iaWxlXFwvXFx3Ky8udGVzdChhZ2VudClcbn1cblxuLy8gOjogKE9iamVjdCkg4oaSIFBsdWdpblxuLy8gQSBwbHVnaW4gdGhhdCB3aWxsIHBsYWNlIGEgbWVudSBiYXIgYWJvdmUgdGhlIGVkaXRvci4gTm90ZSB0aGF0XG4vLyB0aGlzIGludm9sdmVzIHdyYXBwaW5nIHRoZSBlZGl0b3IgaW4gYW4gYWRkaXRpb25hbCBgPGRpdj5gLlxuLy9cbi8vICAgb3B0aW9uczo6LVxuLy8gICBTdXBwb3J0cyB0aGUgZm9sbG93aW5nIG9wdGlvbnM6XG4vL1xuLy8gICAgIGNvbnRlbnQ6OiBbW01lbnVFbGVtZW50XV1cbi8vICAgICBQcm92aWRlcyB0aGUgY29udGVudCBvZiB0aGUgbWVudSwgYXMgYSBuZXN0ZWQgYXJyYXkgdG8gYmVcbi8vICAgICBwYXNzZWQgdG8gYHJlbmRlckdyb3VwZWRgLlxuLy9cbi8vICAgICBmbG9hdGluZzo6ID9ib29sXG4vLyAgICAgRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBtZW51IGZsb2F0cywgaS5lLiB3aGV0aGVyIGl0IHN0aWNrcyB0b1xuLy8gICAgIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0IHdoZW4gdGhlIGVkaXRvciBpcyBwYXJ0aWFsbHkgc2Nyb2xsZWRcbi8vICAgICBvdXQgb2Ygdmlldy5cbmZ1bmN0aW9uIG1lbnVCYXIob3B0aW9ucykge1xuICByZXR1cm4gbmV3IFBsdWdpbih7XG4gICAgdmlldzogZnVuY3Rpb24gdmlldyhlZGl0b3JWaWV3KSB7IHJldHVybiBuZXcgTWVudUJhclZpZXcoZWRpdG9yVmlldywgb3B0aW9ucykgfVxuICB9KVxufVxuXG52YXIgTWVudUJhclZpZXcgPSBmdW5jdGlvbiBNZW51QmFyVmlldyhlZGl0b3JWaWV3LCBvcHRpb25zKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHRoaXMuZWRpdG9yVmlldyA9IGVkaXRvclZpZXc7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgdGhpcy53cmFwcGVyID0gY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQyICsgXCItd3JhcHBlclwifSk7XG4gIHRoaXMubWVudSA9IHRoaXMud3JhcHBlci5hcHBlbmRDaGlsZChjcmVsKFwiZGl2XCIsIHtjbGFzczogcHJlZml4JDJ9KSk7XG4gIHRoaXMubWVudS5jbGFzc05hbWUgPSBwcmVmaXgkMjtcbiAgdGhpcy5zcGFjZXIgPSBudWxsO1xuXG4gIGVkaXRvclZpZXcuZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaXMud3JhcHBlciwgZWRpdG9yVmlldy5kb20pO1xuICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQoZWRpdG9yVmlldy5kb20pO1xuXG4gIHRoaXMubWF4SGVpZ2h0ID0gMDtcbiAgdGhpcy53aWR0aEZvck1heEhlaWdodCA9IDA7XG4gIHRoaXMuZmxvYXRpbmcgPSBmYWxzZTtcblxuICB2YXIgcmVmID0gcmVuZGVyR3JvdXBlZCh0aGlzLmVkaXRvclZpZXcsIHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgdmFyIGRvbSA9IHJlZi5kb207XG4gIHZhciB1cGRhdGUgPSByZWYudXBkYXRlO1xuICB0aGlzLmNvbnRlbnRVcGRhdGUgPSB1cGRhdGU7XG4gIHRoaXMubWVudS5hcHBlbmRDaGlsZChkb20pO1xuICB0aGlzLnVwZGF0ZSgpO1xuXG4gIGlmIChvcHRpb25zLmZsb2F0aW5nICYmICFpc0lPUygpKSB7XG4gICAgdGhpcy51cGRhdGVGbG9hdCgpO1xuICAgIHZhciBwb3RlbnRpYWxTY3JvbGxlcnMgPSBnZXRBbGxXcmFwcGluZyh0aGlzLndyYXBwZXIpO1xuICAgIHRoaXMuc2Nyb2xsRnVuYyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgcm9vdCA9IHRoaXMkMS5lZGl0b3JWaWV3LnJvb3Q7XG4gICAgICBpZiAoIShyb290LmJvZHkgfHwgcm9vdCkuY29udGFpbnModGhpcyQxLndyYXBwZXIpKSB7XG4gICAgICAgICAgcG90ZW50aWFsU2Nyb2xsZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMkMS5zY3JvbGxGdW5jKTsgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMkMS51cGRhdGVGbG9hdChlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgZS50YXJnZXQpO1xuICAgICAgfVxuICAgIH07XG4gICAgcG90ZW50aWFsU2Nyb2xsZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzJDEuc2Nyb2xsRnVuYyk7IH0pO1xuICB9XG59O1xuXG5NZW51QmFyVmlldy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgdGhpcy5jb250ZW50VXBkYXRlKHRoaXMuZWRpdG9yVmlldy5zdGF0ZSk7XG5cbiAgaWYgKHRoaXMuZmxvYXRpbmcpIHtcbiAgICB0aGlzLnVwZGF0ZVNjcm9sbEN1cnNvcigpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLm1lbnUub2Zmc2V0V2lkdGggIT0gdGhpcy53aWR0aEZvck1heEhlaWdodCkge1xuICAgICAgdGhpcy53aWR0aEZvck1heEhlaWdodCA9IHRoaXMubWVudS5vZmZzZXRXaWR0aDtcbiAgICAgIHRoaXMubWF4SGVpZ2h0ID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMubWVudS5vZmZzZXRIZWlnaHQgPiB0aGlzLm1heEhlaWdodCkge1xuICAgICAgdGhpcy5tYXhIZWlnaHQgPSB0aGlzLm1lbnUub2Zmc2V0SGVpZ2h0O1xuICAgICAgdGhpcy5tZW51LnN0eWxlLm1pbkhlaWdodCA9IHRoaXMubWF4SGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgfVxufTtcblxuTWVudUJhclZpZXcucHJvdG90eXBlLnVwZGF0ZVNjcm9sbEN1cnNvciA9IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEN1cnNvciAoKSB7XG4gIHZhciBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvclZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgaWYgKCFzZWxlY3Rpb24uZm9jdXNOb2RlKSB7IHJldHVybiB9XG4gIHZhciByZWN0cyA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmdldENsaWVudFJlY3RzKCk7XG4gIHZhciBzZWxSZWN0ID0gcmVjdHNbc2VsZWN0aW9uSXNJbnZlcnRlZChzZWxlY3Rpb24pID8gMCA6IHJlY3RzLmxlbmd0aCAtIDFdO1xuICBpZiAoIXNlbFJlY3QpIHsgcmV0dXJuIH1cbiAgdmFyIG1lbnVSZWN0ID0gdGhpcy5tZW51LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBpZiAoc2VsUmVjdC50b3AgPCBtZW51UmVjdC5ib3R0b20gJiYgc2VsUmVjdC5ib3R0b20gPiBtZW51UmVjdC50b3ApIHtcbiAgICB2YXIgc2Nyb2xsYWJsZSA9IGZpbmRXcmFwcGluZ1Njcm9sbGFibGUodGhpcy53cmFwcGVyKTtcbiAgICBpZiAoc2Nyb2xsYWJsZSkgeyBzY3JvbGxhYmxlLnNjcm9sbFRvcCAtPSAobWVudVJlY3QuYm90dG9tIC0gc2VsUmVjdC50b3ApOyB9XG4gIH1cbn07XG5cbk1lbnVCYXJWaWV3LnByb3RvdHlwZS51cGRhdGVGbG9hdCA9IGZ1bmN0aW9uIHVwZGF0ZUZsb2F0IChzY3JvbGxBbmNlc3Rvcikge1xuICB2YXIgcGFyZW50ID0gdGhpcy53cmFwcGVyLCBlZGl0b3JSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgdG9wID0gc2Nyb2xsQW5jZXN0b3IgPyBNYXRoLm1heCgwLCBzY3JvbGxBbmNlc3Rvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIDogMDtcblxuICBpZiAodGhpcy5mbG9hdGluZykge1xuICAgIGlmIChlZGl0b3JSZWN0LnRvcCA+PSB0b3AgfHwgZWRpdG9yUmVjdC5ib3R0b20gPCB0aGlzLm1lbnUub2Zmc2V0SGVpZ2h0ICsgMTApIHtcbiAgICAgIHRoaXMuZmxvYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMubWVudS5zdHlsZS5wb3NpdGlvbiA9IHRoaXMubWVudS5zdHlsZS5sZWZ0ID0gdGhpcy5tZW51LnN0eWxlLnRvcCA9IHRoaXMubWVudS5zdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICB0aGlzLm1lbnUuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICB0aGlzLnNwYWNlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3BhY2VyKTtcbiAgICAgIHRoaXMuc3BhY2VyID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJvcmRlciA9IChwYXJlbnQub2Zmc2V0V2lkdGggLSBwYXJlbnQuY2xpZW50V2lkdGgpIC8gMjtcbiAgICAgIHRoaXMubWVudS5zdHlsZS5sZWZ0ID0gKGVkaXRvclJlY3QubGVmdCArIGJvcmRlcikgKyBcInB4XCI7XG4gICAgICB0aGlzLm1lbnUuc3R5bGUuZGlzcGxheSA9IChlZGl0b3JSZWN0LnRvcCA+IHdpbmRvdy5pbm5lckhlaWdodCA/IFwibm9uZVwiIDogXCJcIik7XG4gICAgICBpZiAoc2Nyb2xsQW5jZXN0b3IpIHsgdGhpcy5tZW51LnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjsgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZWRpdG9yUmVjdC50b3AgPCB0b3AgJiYgZWRpdG9yUmVjdC5ib3R0b20gPj0gdGhpcy5tZW51Lm9mZnNldEhlaWdodCArIDEwKSB7XG4gICAgICB0aGlzLmZsb2F0aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBtZW51UmVjdCA9IHRoaXMubWVudS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMubWVudS5zdHlsZS5sZWZ0ID0gbWVudVJlY3QubGVmdCArIFwicHhcIjtcbiAgICAgIHRoaXMubWVudS5zdHlsZS53aWR0aCA9IG1lbnVSZWN0LndpZHRoICsgXCJweFwiO1xuICAgICAgaWYgKHNjcm9sbEFuY2VzdG9yKSB7IHRoaXMubWVudS5zdHlsZS50b3AgPSB0b3AgKyBcInB4XCI7IH1cbiAgICAgIHRoaXMubWVudS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHRoaXMuc3BhY2VyID0gY3JlbChcImRpdlwiLCB7Y2xhc3M6IHByZWZpeCQyICsgXCItc3BhY2VyXCIsIHN0eWxlOiAoXCJoZWlnaHQ6IFwiICsgKG1lbnVSZWN0LmhlaWdodCkgKyBcInB4XCIpfSk7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuc3BhY2VyLCB0aGlzLm1lbnUpO1xuICAgIH1cbiAgfVxufTtcblxuTWVudUJhclZpZXcucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgaWYgKHRoaXMud3JhcHBlci5wYXJlbnROb2RlKVxuICAgIHsgdGhpcy53cmFwcGVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaXMuZWRpdG9yVmlldy5kb20sIHRoaXMud3JhcHBlcik7IH1cbn07XG5cbi8vIE5vdCBwcmVjaXNlLCBidXQgY2xvc2UgZW5vdWdoXG5mdW5jdGlvbiBzZWxlY3Rpb25Jc0ludmVydGVkKHNlbGVjdGlvbikge1xuICBpZiAoc2VsZWN0aW9uLmFuY2hvck5vZGUgPT0gc2VsZWN0aW9uLmZvY3VzTm9kZSkgeyByZXR1cm4gc2VsZWN0aW9uLmFuY2hvck9mZnNldCA+IHNlbGVjdGlvbi5mb2N1c09mZnNldCB9XG4gIHJldHVybiBzZWxlY3Rpb24uYW5jaG9yTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihzZWxlY3Rpb24uZm9jdXNOb2RlKSA9PSBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lOR1xufVxuXG5mdW5jdGlvbiBmaW5kV3JhcHBpbmdTY3JvbGxhYmxlKG5vZGUpIHtcbiAgZm9yICh2YXIgY3VyID0gbm9kZS5wYXJlbnROb2RlOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlKVxuICAgIHsgaWYgKGN1ci5zY3JvbGxIZWlnaHQgPiBjdXIuY2xpZW50SGVpZ2h0KSB7IHJldHVybiBjdXIgfSB9XG59XG5cbmZ1bmN0aW9uIGdldEFsbFdyYXBwaW5nKG5vZGUpIHtcbiAgICB2YXIgcmVzID0gW3dpbmRvd107XG4gICAgZm9yICh2YXIgY3VyID0gbm9kZS5wYXJlbnROb2RlOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlKVxuICAgICAgICB7IHJlcy5wdXNoKGN1cik7IH1cbiAgICByZXR1cm4gcmVzXG59XG5cbmV4cG9ydCB7IERyb3Bkb3duLCBEcm9wZG93blN1Ym1lbnUsIE1lbnVJdGVtLCBibG9ja1R5cGVJdGVtLCBpY29ucywgam9pblVwSXRlbSwgbGlmdEl0ZW0sIG1lbnVCYXIsIHJlZG9JdGVtLCByZW5kZXJHcm91cGVkLCBzZWxlY3RQYXJlbnROb2RlSXRlbSwgdW5kb0l0ZW0sIHdyYXBJdGVtIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5lcy5qcy5tYXBcbiIsImltcG9ydCB7IGZpbmRXcmFwcGluZywgUmVwbGFjZUFyb3VuZFN0ZXAsIGNhblNwbGl0LCBsaWZ0VGFyZ2V0IH0gZnJvbSAncHJvc2VtaXJyb3ItdHJhbnNmb3JtJztcbmltcG9ydCB7IE5vZGVSYW5nZSwgRnJhZ21lbnQsIFNsaWNlIH0gZnJvbSAncHJvc2VtaXJyb3ItbW9kZWwnO1xuXG52YXIgb2xET00gPSBbXCJvbFwiLCAwXSwgdWxET00gPSBbXCJ1bFwiLCAwXSwgbGlET00gPSBbXCJsaVwiLCAwXTtcblxuLy8gOjogTm9kZVNwZWNcbi8vIEFuIG9yZGVyZWQgbGlzdCBbbm9kZSBzcGVjXSgjbW9kZWwuTm9kZVNwZWMpLiBIYXMgYSBzaW5nbGVcbi8vIGF0dHJpYnV0ZSwgYG9yZGVyYCwgd2hpY2ggZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIGF0IHdoaWNoIHRoZSBsaXN0XG4vLyBzdGFydHMgY291bnRpbmcsIGFuZCBkZWZhdWx0cyB0byAxLiBSZXByZXNlbnRlZCBhcyBhbiBgPG9sPmBcbi8vIGVsZW1lbnQuXG52YXIgb3JkZXJlZExpc3QgPSB7XG4gIGF0dHJzOiB7b3JkZXI6IHtkZWZhdWx0OiAxfX0sXG4gIHBhcnNlRE9NOiBbe3RhZzogXCJvbFwiLCBnZXRBdHRyczogZnVuY3Rpb24gZ2V0QXR0cnMoZG9tKSB7XG4gICAgcmV0dXJuIHtvcmRlcjogZG9tLmhhc0F0dHJpYnV0ZShcInN0YXJ0XCIpID8gK2RvbS5nZXRBdHRyaWJ1dGUoXCJzdGFydFwiKSA6IDF9XG4gIH19XSxcbiAgdG9ET006IGZ1bmN0aW9uIHRvRE9NKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5hdHRycy5vcmRlciA9PSAxID8gb2xET00gOiBbXCJvbFwiLCB7c3RhcnQ6IG5vZGUuYXR0cnMub3JkZXJ9LCAwXVxuICB9XG59O1xuXG4vLyA6OiBOb2RlU3BlY1xuLy8gQSBidWxsZXQgbGlzdCBub2RlIHNwZWMsIHJlcHJlc2VudGVkIGluIHRoZSBET00gYXMgYDx1bD5gLlxudmFyIGJ1bGxldExpc3QgPSB7XG4gIHBhcnNlRE9NOiBbe3RhZzogXCJ1bFwifV0sXG4gIHRvRE9NOiBmdW5jdGlvbiB0b0RPTSgpIHsgcmV0dXJuIHVsRE9NIH1cbn07XG5cbi8vIDo6IE5vZGVTcGVjXG4vLyBBIGxpc3QgaXRlbSAoYDxsaT5gKSBzcGVjLlxudmFyIGxpc3RJdGVtID0ge1xuICBwYXJzZURPTTogW3t0YWc6IFwibGlcIn1dLFxuICB0b0RPTTogZnVuY3Rpb24gdG9ET00oKSB7IHJldHVybiBsaURPTSB9LFxuICBkZWZpbmluZzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gYWRkKG9iaiwgcHJvcHMpIHtcbiAgdmFyIGNvcHkgPSB7fTtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHsgY29weVtwcm9wXSA9IG9ialtwcm9wXTsgfVxuICBmb3IgKHZhciBwcm9wJDEgaW4gcHJvcHMpIHsgY29weVtwcm9wJDFdID0gcHJvcHNbcHJvcCQxXTsgfVxuICByZXR1cm4gY29weVxufVxuXG4vLyA6OiAoT3JkZXJlZE1hcDxOb2RlU3BlYz4sIHN0cmluZywgP3N0cmluZykg4oaSIE9yZGVyZWRNYXA8Tm9kZVNwZWM+XG4vLyBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgYWRkaW5nIGxpc3QtcmVsYXRlZCBub2RlIHR5cGVzIHRvIGEgbWFwXG4vLyBzcGVjaWZ5aW5nIHRoZSBub2RlcyBmb3IgYSBzY2hlbWEuIEFkZHNcbi8vIFtgb3JkZXJlZExpc3RgXSgjc2NoZW1hLWxpc3Qub3JkZXJlZExpc3QpIGFzIGBcIm9yZGVyZWRfbGlzdFwiYCxcbi8vIFtgYnVsbGV0TGlzdGBdKCNzY2hlbWEtbGlzdC5idWxsZXRMaXN0KSBhcyBgXCJidWxsZXRfbGlzdFwiYCwgYW5kXG4vLyBbYGxpc3RJdGVtYF0oI3NjaGVtYS1saXN0Lmxpc3RJdGVtKSBhcyBgXCJsaXN0X2l0ZW1cImAuXG4vL1xuLy8gYGl0ZW1Db250ZW50YCBkZXRlcm1pbmVzIHRoZSBjb250ZW50IGV4cHJlc3Npb24gZm9yIHRoZSBsaXN0IGl0ZW1zLlxuLy8gSWYgeW91IHdhbnQgdGhlIGNvbW1hbmRzIGRlZmluZWQgaW4gdGhpcyBtb2R1bGUgdG8gYXBwbHkgdG8geW91clxuLy8gbGlzdCBzdHJ1Y3R1cmUsIGl0IHNob3VsZCBoYXZlIGEgc2hhcGUgbGlrZSBgXCJwYXJhZ3JhcGggYmxvY2sqXCJgIG9yXG4vLyBgXCJwYXJhZ3JhcGggKG9yZGVyZWRfbGlzdCB8IGJ1bGxldF9saXN0KSpcImAuIGBsaXN0R3JvdXBgIGNhbiBiZVxuLy8gZ2l2ZW4gdG8gYXNzaWduIGEgZ3JvdXAgbmFtZSB0byB0aGUgbGlzdCBub2RlIHR5cGVzLCBmb3IgZXhhbXBsZVxuLy8gYFwiYmxvY2tcImAuXG5mdW5jdGlvbiBhZGRMaXN0Tm9kZXMobm9kZXMsIGl0ZW1Db250ZW50LCBsaXN0R3JvdXApIHtcbiAgcmV0dXJuIG5vZGVzLmFwcGVuZCh7XG4gICAgb3JkZXJlZF9saXN0OiBhZGQob3JkZXJlZExpc3QsIHtjb250ZW50OiBcImxpc3RfaXRlbStcIiwgZ3JvdXA6IGxpc3RHcm91cH0pLFxuICAgIGJ1bGxldF9saXN0OiBhZGQoYnVsbGV0TGlzdCwge2NvbnRlbnQ6IFwibGlzdF9pdGVtK1wiLCBncm91cDogbGlzdEdyb3VwfSksXG4gICAgbGlzdF9pdGVtOiBhZGQobGlzdEl0ZW0sIHtjb250ZW50OiBpdGVtQ29udGVudH0pXG4gIH0pXG59XG5cbi8vIDo6IChOb2RlVHlwZSwgP09iamVjdCkg4oaSIChzdGF0ZTogRWRpdG9yU3RhdGUsIGRpc3BhdGNoOiA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sXG4vLyBSZXR1cm5zIGEgY29tbWFuZCBmdW5jdGlvbiB0aGF0IHdyYXBzIHRoZSBzZWxlY3Rpb24gaW4gYSBsaXN0IHdpdGhcbi8vIHRoZSBnaXZlbiB0eXBlIGFuIGF0dHJpYnV0ZXMuIElmIGBkaXNwYXRjaGAgaXMgbnVsbCwgb25seSByZXR1cm4gYVxuLy8gdmFsdWUgdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIGlzIHBvc3NpYmxlLCBidXQgZG9uJ3QgYWN0dWFsbHlcbi8vIHBlcmZvcm0gdGhlIGNoYW5nZS5cbmZ1bmN0aW9uIHdyYXBJbkxpc3QobGlzdFR5cGUsIGF0dHJzKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgZGlzcGF0Y2gpIHtcbiAgICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICAgIHZhciAkZnJvbSA9IHJlZi4kZnJvbTtcbiAgICB2YXIgJHRvID0gcmVmLiR0bztcbiAgICB2YXIgcmFuZ2UgPSAkZnJvbS5ibG9ja1JhbmdlKCR0byksIGRvSm9pbiA9IGZhbHNlLCBvdXRlclJhbmdlID0gcmFuZ2U7XG4gICAgaWYgKCFyYW5nZSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIC8vIFRoaXMgaXMgYXQgdGhlIHRvcCBvZiBhbiBleGlzdGluZyBsaXN0IGl0ZW1cbiAgICBpZiAocmFuZ2UuZGVwdGggPj0gMiAmJiAkZnJvbS5ub2RlKHJhbmdlLmRlcHRoIC0gMSkudHlwZS5jb21wYXRpYmxlQ29udGVudChsaXN0VHlwZSkgJiYgcmFuZ2Uuc3RhcnRJbmRleCA9PSAwKSB7XG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGlzIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICAgIGlmICgkZnJvbS5pbmRleChyYW5nZS5kZXB0aCAtIDEpID09IDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIHZhciAkaW5zZXJ0ID0gc3RhdGUuZG9jLnJlc29sdmUocmFuZ2Uuc3RhcnQgLSAyKTtcbiAgICAgIG91dGVyUmFuZ2UgPSBuZXcgTm9kZVJhbmdlKCRpbnNlcnQsICRpbnNlcnQsIHJhbmdlLmRlcHRoKTtcbiAgICAgIGlmIChyYW5nZS5lbmRJbmRleCA8IHJhbmdlLnBhcmVudC5jaGlsZENvdW50KVxuICAgICAgICB7IHJhbmdlID0gbmV3IE5vZGVSYW5nZSgkZnJvbSwgc3RhdGUuZG9jLnJlc29sdmUoJHRvLmVuZChyYW5nZS5kZXB0aCkpLCByYW5nZS5kZXB0aCk7IH1cbiAgICAgIGRvSm9pbiA9IHRydWU7XG4gICAgfVxuICAgIHZhciB3cmFwID0gZmluZFdyYXBwaW5nKG91dGVyUmFuZ2UsIGxpc3RUeXBlLCBhdHRycywgcmFuZ2UpO1xuICAgIGlmICghd3JhcCkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmIChkaXNwYXRjaCkgeyBkaXNwYXRjaChkb1dyYXBJbkxpc3Qoc3RhdGUudHIsIHJhbmdlLCB3cmFwLCBkb0pvaW4sIGxpc3RUeXBlKS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cblxuZnVuY3Rpb24gZG9XcmFwSW5MaXN0KHRyLCByYW5nZSwgd3JhcHBlcnMsIGpvaW5CZWZvcmUsIGxpc3RUeXBlKSB7XG4gIHZhciBjb250ZW50ID0gRnJhZ21lbnQuZW1wdHk7XG4gIGZvciAodmFyIGkgPSB3cmFwcGVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcbiAgICB7IGNvbnRlbnQgPSBGcmFnbWVudC5mcm9tKHdyYXBwZXJzW2ldLnR5cGUuY3JlYXRlKHdyYXBwZXJzW2ldLmF0dHJzLCBjb250ZW50KSk7IH1cblxuICB0ci5zdGVwKG5ldyBSZXBsYWNlQXJvdW5kU3RlcChyYW5nZS5zdGFydCAtIChqb2luQmVmb3JlID8gMiA6IDApLCByYW5nZS5lbmQsIHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTbGljZShjb250ZW50LCAwLCAwKSwgd3JhcHBlcnMubGVuZ3RoLCB0cnVlKSk7XG5cbiAgdmFyIGZvdW5kID0gMDtcbiAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgd3JhcHBlcnMubGVuZ3RoOyBpJDErKykgeyBpZiAod3JhcHBlcnNbaSQxXS50eXBlID09IGxpc3RUeXBlKSB7IGZvdW5kID0gaSQxICsgMTsgfSB9XG4gIHZhciBzcGxpdERlcHRoID0gd3JhcHBlcnMubGVuZ3RoIC0gZm91bmQ7XG5cbiAgdmFyIHNwbGl0UG9zID0gcmFuZ2Uuc3RhcnQgKyB3cmFwcGVycy5sZW5ndGggLSAoam9pbkJlZm9yZSA/IDIgOiAwKSwgcGFyZW50ID0gcmFuZ2UucGFyZW50O1xuICBmb3IgKHZhciBpJDIgPSByYW5nZS5zdGFydEluZGV4LCBlID0gcmFuZ2UuZW5kSW5kZXgsIGZpcnN0ID0gdHJ1ZTsgaSQyIDwgZTsgaSQyKyssIGZpcnN0ID0gZmFsc2UpIHtcbiAgICBpZiAoIWZpcnN0ICYmIGNhblNwbGl0KHRyLmRvYywgc3BsaXRQb3MsIHNwbGl0RGVwdGgpKSB7XG4gICAgICB0ci5zcGxpdChzcGxpdFBvcywgc3BsaXREZXB0aCk7XG4gICAgICBzcGxpdFBvcyArPSAyICogc3BsaXREZXB0aDtcbiAgICB9XG4gICAgc3BsaXRQb3MgKz0gcGFyZW50LmNoaWxkKGkkMikubm9kZVNpemU7XG4gIH1cbiAgcmV0dXJuIHRyXG59XG5cbi8vIDo6IChOb2RlVHlwZSkg4oaSIChzdGF0ZTogRWRpdG9yU3RhdGUsIGRpc3BhdGNoOiA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sXG4vLyBCdWlsZCBhIGNvbW1hbmQgdGhhdCBzcGxpdHMgYSBub24tZW1wdHkgdGV4dGJsb2NrIGF0IHRoZSB0b3AgbGV2ZWxcbi8vIG9mIGEgbGlzdCBpdGVtIGJ5IGFsc28gc3BsaXR0aW5nIHRoYXQgbGlzdCBpdGVtLlxuZnVuY3Rpb24gc3BsaXRMaXN0SXRlbShpdGVtVHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoKSB7XG4gICAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICB2YXIgJGZyb20gPSByZWYuJGZyb207XG4gICAgdmFyICR0byA9IHJlZi4kdG87XG4gICAgdmFyIG5vZGUgPSByZWYubm9kZTtcbiAgICBpZiAoKG5vZGUgJiYgbm9kZS5pc0Jsb2NrKSB8fCAkZnJvbS5kZXB0aCA8IDIgfHwgISRmcm9tLnNhbWVQYXJlbnQoJHRvKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIHZhciBncmFuZFBhcmVudCA9ICRmcm9tLm5vZGUoLTEpO1xuICAgIGlmIChncmFuZFBhcmVudC50eXBlICE9IGl0ZW1UeXBlKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCRmcm9tLnBhcmVudC5jb250ZW50LnNpemUgPT0gMCAmJiAkZnJvbS5ub2RlKC0xKS5jaGlsZENvdW50ID09ICRmcm9tLmluZGV4QWZ0ZXIoLTEpKSB7XG4gICAgICAvLyBJbiBhbiBlbXB0eSBibG9jay4gSWYgdGhpcyBpcyBhIG5lc3RlZCBsaXN0LCB0aGUgd3JhcHBpbmdcbiAgICAgIC8vIGxpc3QgaXRlbSBzaG91bGQgYmUgc3BsaXQuIE90aGVyd2lzZSwgYmFpbCBvdXQgYW5kIGxldCBuZXh0XG4gICAgICAvLyBjb21tYW5kIGhhbmRsZSBsaWZ0aW5nLlxuICAgICAgaWYgKCRmcm9tLmRlcHRoID09IDIgfHwgJGZyb20ubm9kZSgtMykudHlwZSAhPSBpdGVtVHlwZSB8fFxuICAgICAgICAgICRmcm9tLmluZGV4KC0yKSAhPSAkZnJvbS5ub2RlKC0yKS5jaGlsZENvdW50IC0gMSkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgaWYgKGRpc3BhdGNoKSB7XG4gICAgICAgIHZhciB3cmFwID0gRnJhZ21lbnQuZW1wdHksIGtlZXBJdGVtID0gJGZyb20uaW5kZXgoLTEpID4gMDtcbiAgICAgICAgLy8gQnVpbGQgYSBmcmFnbWVudCBjb250YWluaW5nIGVtcHR5IHZlcnNpb25zIG9mIHRoZSBzdHJ1Y3R1cmVcbiAgICAgICAgLy8gZnJvbSB0aGUgb3V0ZXIgbGlzdCBpdGVtIHRvIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgY3Vyc29yXG4gICAgICAgIGZvciAodmFyIGQgPSAkZnJvbS5kZXB0aCAtIChrZWVwSXRlbSA/IDEgOiAyKTsgZCA+PSAkZnJvbS5kZXB0aCAtIDM7IGQtLSlcbiAgICAgICAgICB7IHdyYXAgPSBGcmFnbWVudC5mcm9tKCRmcm9tLm5vZGUoZCkuY29weSh3cmFwKSk7IH1cbiAgICAgICAgLy8gQWRkIGEgc2Vjb25kIGxpc3QgaXRlbSB3aXRoIGFuIGVtcHR5IGRlZmF1bHQgc3RhcnQgbm9kZVxuICAgICAgICB3cmFwID0gd3JhcC5hcHBlbmQoRnJhZ21lbnQuZnJvbShpdGVtVHlwZS5jcmVhdGVBbmRGaWxsKCkpKTtcbiAgICAgICAgdmFyIHRyJDEgPSBzdGF0ZS50ci5yZXBsYWNlKCRmcm9tLmJlZm9yZShrZWVwSXRlbSA/IG51bGwgOiAtMSksICRmcm9tLmFmdGVyKC0zKSwgbmV3IFNsaWNlKHdyYXAsIGtlZXBJdGVtID8gMyA6IDIsIDIpKTtcbiAgICAgICAgdHIkMS5zZXRTZWxlY3Rpb24oc3RhdGUuc2VsZWN0aW9uLmNvbnN0cnVjdG9yLm5lYXIodHIkMS5kb2MucmVzb2x2ZSgkZnJvbS5wb3MgKyAoa2VlcEl0ZW0gPyAzIDogMikpKSk7XG4gICAgICAgIGRpc3BhdGNoKHRyJDEuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICB2YXIgbmV4dFR5cGUgPSAkdG8ucG9zID09ICRmcm9tLmVuZCgpID8gZ3JhbmRQYXJlbnQuY29udGVudE1hdGNoQXQoMCkuZGVmYXVsdFR5cGUgOiBudWxsO1xuICAgIHZhciB0ciA9IHN0YXRlLnRyLmRlbGV0ZSgkZnJvbS5wb3MsICR0by5wb3MpO1xuICAgIHZhciB0eXBlcyA9IG5leHRUeXBlICYmIFtudWxsLCB7dHlwZTogbmV4dFR5cGV9XTtcbiAgICBpZiAoIWNhblNwbGl0KHRyLmRvYywgJGZyb20ucG9zLCAyLCB0eXBlcykpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoZGlzcGF0Y2gpIHsgZGlzcGF0Y2godHIuc3BsaXQoJGZyb20ucG9zLCAyLCB0eXBlcykuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbi8vIDo6IChOb2RlVHlwZSkg4oaSIChzdGF0ZTogRWRpdG9yU3RhdGUsIGRpc3BhdGNoOiA/KHRyOiBUcmFuc2FjdGlvbikpIOKGkiBib29sXG4vLyBDcmVhdGUgYSBjb21tYW5kIHRvIGxpZnQgdGhlIGxpc3QgaXRlbSBhcm91bmQgdGhlIHNlbGVjdGlvbiB1cCBpbnRvXG4vLyBhIHdyYXBwaW5nIGxpc3QuXG5mdW5jdGlvbiBsaWZ0TGlzdEl0ZW0oaXRlbVR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBkaXNwYXRjaCkge1xuICAgIHZhciByZWYgPSBzdGF0ZS5zZWxlY3Rpb247XG4gICAgdmFyICRmcm9tID0gcmVmLiRmcm9tO1xuICAgIHZhciAkdG8gPSByZWYuJHRvO1xuICAgIHZhciByYW5nZSA9ICRmcm9tLmJsb2NrUmFuZ2UoJHRvLCBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5jaGlsZENvdW50ICYmIG5vZGUuZmlyc3RDaGlsZC50eXBlID09IGl0ZW1UeXBlOyB9KTtcbiAgICBpZiAoIXJhbmdlKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFkaXNwYXRjaCkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgaWYgKCRmcm9tLm5vZGUocmFuZ2UuZGVwdGggLSAxKS50eXBlID09IGl0ZW1UeXBlKSAvLyBJbnNpZGUgYSBwYXJlbnQgbGlzdFxuICAgICAgeyByZXR1cm4gbGlmdFRvT3V0ZXJMaXN0KHN0YXRlLCBkaXNwYXRjaCwgaXRlbVR5cGUsIHJhbmdlKSB9XG4gICAgZWxzZSAvLyBPdXRlciBsaXN0IG5vZGVcbiAgICAgIHsgcmV0dXJuIGxpZnRPdXRPZkxpc3Qoc3RhdGUsIGRpc3BhdGNoLCByYW5nZSkgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGxpZnRUb091dGVyTGlzdChzdGF0ZSwgZGlzcGF0Y2gsIGl0ZW1UeXBlLCByYW5nZSkge1xuICB2YXIgdHIgPSBzdGF0ZS50ciwgZW5kID0gcmFuZ2UuZW5kLCBlbmRPZkxpc3QgPSByYW5nZS4kdG8uZW5kKHJhbmdlLmRlcHRoKTtcbiAgaWYgKGVuZCA8IGVuZE9mTGlzdCkge1xuICAgIC8vIFRoZXJlIGFyZSBzaWJsaW5ncyBhZnRlciB0aGUgbGlmdGVkIGl0ZW1zLCB3aGljaCBtdXN0IGJlY29tZVxuICAgIC8vIGNoaWxkcmVuIG9mIHRoZSBsYXN0IGl0ZW1cbiAgICB0ci5zdGVwKG5ldyBSZXBsYWNlQXJvdW5kU3RlcChlbmQgLSAxLCBlbmRPZkxpc3QsIGVuZCwgZW5kT2ZMaXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTbGljZShGcmFnbWVudC5mcm9tKGl0ZW1UeXBlLmNyZWF0ZShudWxsLCByYW5nZS5wYXJlbnQuY29weSgpKSksIDEsIDApLCAxLCB0cnVlKSk7XG4gICAgcmFuZ2UgPSBuZXcgTm9kZVJhbmdlKHRyLmRvYy5yZXNvbHZlKHJhbmdlLiRmcm9tLnBvcyksIHRyLmRvYy5yZXNvbHZlKGVuZE9mTGlzdCksIHJhbmdlLmRlcHRoKTtcbiAgfVxuICBkaXNwYXRjaCh0ci5saWZ0KHJhbmdlLCBsaWZ0VGFyZ2V0KHJhbmdlKSkuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGxpZnRPdXRPZkxpc3Qoc3RhdGUsIGRpc3BhdGNoLCByYW5nZSkge1xuICB2YXIgdHIgPSBzdGF0ZS50ciwgbGlzdCA9IHJhbmdlLnBhcmVudDtcbiAgLy8gTWVyZ2UgdGhlIGxpc3QgaXRlbXMgaW50byBhIHNpbmdsZSBiaWcgaXRlbVxuICBmb3IgKHZhciBwb3MgPSByYW5nZS5lbmQsIGkgPSByYW5nZS5lbmRJbmRleCAtIDEsIGUgPSByYW5nZS5zdGFydEluZGV4OyBpID4gZTsgaS0tKSB7XG4gICAgcG9zIC09IGxpc3QuY2hpbGQoaSkubm9kZVNpemU7XG4gICAgdHIuZGVsZXRlKHBvcyAtIDEsIHBvcyArIDEpO1xuICB9XG4gIHZhciAkc3RhcnQgPSB0ci5kb2MucmVzb2x2ZShyYW5nZS5zdGFydCksIGl0ZW0gPSAkc3RhcnQubm9kZUFmdGVyO1xuICB2YXIgYXRTdGFydCA9IHJhbmdlLnN0YXJ0SW5kZXggPT0gMCwgYXRFbmQgPSByYW5nZS5lbmRJbmRleCA9PSBsaXN0LmNoaWxkQ291bnQ7XG4gIHZhciBwYXJlbnQgPSAkc3RhcnQubm9kZSgtMSksIGluZGV4QmVmb3JlID0gJHN0YXJ0LmluZGV4KC0xKTtcbiAgaWYgKCFwYXJlbnQuY2FuUmVwbGFjZShpbmRleEJlZm9yZSArIChhdFN0YXJ0ID8gMCA6IDEpLCBpbmRleEJlZm9yZSArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZW50LmFwcGVuZChhdEVuZCA/IEZyYWdtZW50LmVtcHR5IDogRnJhZ21lbnQuZnJvbShsaXN0KSkpKVxuICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyIHN0YXJ0ID0gJHN0YXJ0LnBvcywgZW5kID0gc3RhcnQgKyBpdGVtLm5vZGVTaXplO1xuICAvLyBTdHJpcCBvZmYgdGhlIHN1cnJvdW5kaW5nIGxpc3QuIEF0IHRoZSBzaWRlcyB3aGVyZSB3ZSdyZSBub3QgYXRcbiAgLy8gdGhlIGVuZCBvZiB0aGUgbGlzdCwgdGhlIGV4aXN0aW5nIGxpc3QgaXMgY2xvc2VkLiBBdCBzaWRlcyB3aGVyZVxuICAvLyB0aGlzIGlzIHRoZSBlbmQsIGl0IGlzIG92ZXJ3cml0dGVuIHRvIGl0cyBlbmQuXG4gIHRyLnN0ZXAobmV3IFJlcGxhY2VBcm91bmRTdGVwKHN0YXJ0IC0gKGF0U3RhcnQgPyAxIDogMCksIGVuZCArIChhdEVuZCA/IDEgOiAwKSwgc3RhcnQgKyAxLCBlbmQgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2xpY2UoKGF0U3RhcnQgPyBGcmFnbWVudC5lbXB0eSA6IEZyYWdtZW50LmZyb20obGlzdC5jb3B5KEZyYWdtZW50LmVtcHR5KSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKGF0RW5kID8gRnJhZ21lbnQuZW1wdHkgOiBGcmFnbWVudC5mcm9tKGxpc3QuY29weShGcmFnbWVudC5lbXB0eSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0U3RhcnQgPyAwIDogMSwgYXRFbmQgPyAwIDogMSksIGF0U3RhcnQgPyAwIDogMSkpO1xuICBkaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gOjogKE5vZGVUeXBlKSDihpIgKHN0YXRlOiBFZGl0b3JTdGF0ZSwgZGlzcGF0Y2g6ID8odHI6IFRyYW5zYWN0aW9uKSkg4oaSIGJvb2xcbi8vIENyZWF0ZSBhIGNvbW1hbmQgdG8gc2luayB0aGUgbGlzdCBpdGVtIGFyb3VuZCB0aGUgc2VsZWN0aW9uIGRvd25cbi8vIGludG8gYW4gaW5uZXIgbGlzdC5cbmZ1bmN0aW9uIHNpbmtMaXN0SXRlbShpdGVtVHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGRpc3BhdGNoKSB7XG4gICAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgICB2YXIgJGZyb20gPSByZWYuJGZyb207XG4gICAgdmFyICR0byA9IHJlZi4kdG87XG4gICAgdmFyIHJhbmdlID0gJGZyb20uYmxvY2tSYW5nZSgkdG8sIGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLmNoaWxkQ291bnQgJiYgbm9kZS5maXJzdENoaWxkLnR5cGUgPT0gaXRlbVR5cGU7IH0pO1xuICAgIGlmICghcmFuZ2UpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICB2YXIgc3RhcnRJbmRleCA9IHJhbmdlLnN0YXJ0SW5kZXg7XG4gICAgaWYgKHN0YXJ0SW5kZXggPT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgIHZhciBwYXJlbnQgPSByYW5nZS5wYXJlbnQsIG5vZGVCZWZvcmUgPSBwYXJlbnQuY2hpbGQoc3RhcnRJbmRleCAtIDEpO1xuICAgIGlmIChub2RlQmVmb3JlLnR5cGUgIT0gaXRlbVR5cGUpIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGlmIChkaXNwYXRjaCkge1xuICAgICAgdmFyIG5lc3RlZEJlZm9yZSA9IG5vZGVCZWZvcmUubGFzdENoaWxkICYmIG5vZGVCZWZvcmUubGFzdENoaWxkLnR5cGUgPT0gcGFyZW50LnR5cGU7XG4gICAgICB2YXIgaW5uZXIgPSBGcmFnbWVudC5mcm9tKG5lc3RlZEJlZm9yZSA/IGl0ZW1UeXBlLmNyZWF0ZSgpIDogbnVsbCk7XG4gICAgICB2YXIgc2xpY2UgPSBuZXcgU2xpY2UoRnJhZ21lbnQuZnJvbShpdGVtVHlwZS5jcmVhdGUobnVsbCwgRnJhZ21lbnQuZnJvbShwYXJlbnQudHlwZS5jcmVhdGUobnVsbCwgaW5uZXIpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZEJlZm9yZSA/IDMgOiAxLCAwKTtcbiAgICAgIHZhciBiZWZvcmUgPSByYW5nZS5zdGFydCwgYWZ0ZXIgPSByYW5nZS5lbmQ7XG4gICAgICBkaXNwYXRjaChzdGF0ZS50ci5zdGVwKG5ldyBSZXBsYWNlQXJvdW5kU3RlcChiZWZvcmUgLSAobmVzdGVkQmVmb3JlID8gMyA6IDEpLCBhZnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZSwgYWZ0ZXIsIHNsaWNlLCAxLCB0cnVlKSlcbiAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldygpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5leHBvcnQgeyBhZGRMaXN0Tm9kZXMsIGJ1bGxldExpc3QsIGxpZnRMaXN0SXRlbSwgbGlzdEl0ZW0sIG9yZGVyZWRMaXN0LCBzaW5rTGlzdEl0ZW0sIHNwbGl0TGlzdEl0ZW0sIHdyYXBJbkxpc3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzLmpzLm1hcFxuIiwiaW1wb3J0IHsgVGV4dFNlbGVjdGlvbiwgTm9kZVNlbGVjdGlvbiwgU2VsZWN0aW9uLCBBbGxTZWxlY3Rpb24gfSBmcm9tICdwcm9zZW1pcnJvci1zdGF0ZSc7XG5pbXBvcnQgeyBET01TZXJpYWxpemVyLCBGcmFnbWVudCwgTWFyaywgRE9NUGFyc2VyLCBTbGljZSB9IGZyb20gJ3Byb3NlbWlycm9yLW1vZGVsJztcbmltcG9ydCB7IGRyb3BQb2ludCB9IGZyb20gJ3Byb3NlbWlycm9yLXRyYW5zZm9ybSc7XG5cbnZhciByZXN1bHQgPSB7fTtcblxuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZG9jdW1lbnQgIT0gXCJ1bmRlZmluZWRcIikge1xuICB2YXIgaWVfZWRnZSA9IC9FZGdlXFwvKFxcZCspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgaWVfdXB0bzEwID0gL01TSUUgXFxkLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgaWVfMTF1cCA9IC9UcmlkZW50XFwvKD86WzctOV18XFxkezIsfSlcXC4uKnJ2OihcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICByZXN1bHQubWFjID0gL01hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pO1xuICB2YXIgaWUgPSByZXN1bHQuaWUgPSAhIShpZV91cHRvMTAgfHwgaWVfMTF1cCB8fCBpZV9lZGdlKTtcbiAgcmVzdWx0LmllX3ZlcnNpb24gPSBpZV91cHRvMTAgPyBkb2N1bWVudC5kb2N1bWVudE1vZGUgfHwgNiA6IGllXzExdXAgPyAraWVfMTF1cFsxXSA6IGllX2VkZ2UgPyAraWVfZWRnZVsxXSA6IG51bGw7XG4gIHJlc3VsdC5nZWNrbyA9ICFpZSAmJiAvZ2Vja29cXC8oXFxkKykvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICByZXN1bHQuZ2Vja29fdmVyc2lvbiA9IHJlc3VsdC5nZWNrbyAmJiArKC9GaXJlZm94XFwvKFxcZCspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFswLCAwXSlbMV07XG4gIHZhciBjaHJvbWUgPSAhaWUgJiYgL0Nocm9tZVxcLyhcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgcmVzdWx0LmNocm9tZSA9ICEhY2hyb21lO1xuICByZXN1bHQuY2hyb21lX3ZlcnNpb24gPSBjaHJvbWUgJiYgK2Nocm9tZVsxXTtcbiAgLy8gSXMgdHJ1ZSBmb3IgYm90aCBpT1MgYW5kIGlQYWRPUyBmb3IgY29udmVuaWVuY2VcbiAgcmVzdWx0LnNhZmFyaSA9ICFpZSAmJiAvQXBwbGUgQ29tcHV0ZXIvLnRlc3QobmF2aWdhdG9yLnZlbmRvcik7XG4gIHJlc3VsdC5pb3MgPSByZXN1bHQuc2FmYXJpICYmICgvTW9iaWxlXFwvXFx3Ky8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAyKTtcbiAgcmVzdWx0LmFuZHJvaWQgPSAvQW5kcm9pZCBcXGQvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHJlc3VsdC53ZWJraXQgPSBcIndlYmtpdEZvbnRTbW9vdGhpbmdcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG4gIHJlc3VsdC53ZWJraXRfdmVyc2lvbiA9IHJlc3VsdC53ZWJraXQgJiYgKygvXFxiQXBwbGVXZWJLaXRcXC8oXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWzAsIDBdKVsxXTtcbn1cblxudmFyIGRvbUluZGV4ID0gZnVuY3Rpb24obm9kZSkge1xuICBmb3IgKHZhciBpbmRleCA9IDA7OyBpbmRleCsrKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGlmICghbm9kZSkgeyByZXR1cm4gaW5kZXggfVxuICB9XG59O1xuXG52YXIgcGFyZW50Tm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT0gMTEgPyBwYXJlbnQuaG9zdCA6IHBhcmVudFxufTtcblxudmFyIHJldXNlZFJhbmdlID0gbnVsbDtcblxuLy8gTm90ZSB0aGF0IHRoaXMgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSBzYW1lIHJhbmdlLCBiZWNhdXNlIERPTSByYW5nZVxuLy8gb2JqZWN0cyBhcmUgZXZlcnkgZXhwZW5zaXZlLCBhbmQga2VlcCBzbG93aW5nIGRvd24gc3Vic2VxdWVudCBET01cbi8vIHVwZGF0ZXMsIGZvciBzb21lIHJlYXNvbi5cbnZhciB0ZXh0UmFuZ2UgPSBmdW5jdGlvbihub2RlLCBmcm9tLCB0bykge1xuICB2YXIgcmFuZ2UgPSByZXVzZWRSYW5nZSB8fCAocmV1c2VkUmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpKTtcbiAgcmFuZ2Uuc2V0RW5kKG5vZGUsIHRvID09IG51bGwgPyBub2RlLm5vZGVWYWx1ZS5sZW5ndGggOiB0byk7XG4gIHJhbmdlLnNldFN0YXJ0KG5vZGUsIGZyb20gfHwgMCk7XG4gIHJldHVybiByYW5nZVxufTtcblxuLy8gU2NhbnMgZm9yd2FyZCBhbmQgYmFja3dhcmQgdGhyb3VnaCBET00gcG9zaXRpb25zIGVxdWl2YWxlbnQgdG8gdGhlXG4vLyBnaXZlbiBvbmUgdG8gc2VlIGlmIHRoZSB0d28gYXJlIGluIHRoZSBzYW1lIHBsYWNlIChpLmUuIGFmdGVyIGFcbi8vIHRleHQgbm9kZSB2cyBhdCB0aGUgZW5kIG9mIHRoYXQgdGV4dCBub2RlKVxudmFyIGlzRXF1aXZhbGVudFBvc2l0aW9uID0gZnVuY3Rpb24obm9kZSwgb2ZmLCB0YXJnZXROb2RlLCB0YXJnZXRPZmYpIHtcbiAgcmV0dXJuIHRhcmdldE5vZGUgJiYgKHNjYW5Gb3Iobm9kZSwgb2ZmLCB0YXJnZXROb2RlLCB0YXJnZXRPZmYsIC0xKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbkZvcihub2RlLCBvZmYsIHRhcmdldE5vZGUsIHRhcmdldE9mZiwgMSkpXG59O1xuXG52YXIgYXRvbUVsZW1lbnRzID0gL14oaW1nfGJyfGlucHV0fHRleHRhcmVhfGhyKSQvaTtcblxuZnVuY3Rpb24gc2NhbkZvcihub2RlLCBvZmYsIHRhcmdldE5vZGUsIHRhcmdldE9mZiwgZGlyKSB7XG4gIGZvciAoOzspIHtcbiAgICBpZiAobm9kZSA9PSB0YXJnZXROb2RlICYmIG9mZiA9PSB0YXJnZXRPZmYpIHsgcmV0dXJuIHRydWUgfVxuICAgIGlmIChvZmYgPT0gKGRpciA8IDAgPyAwIDogbm9kZVNpemUobm9kZSkpKSB7XG4gICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudC5ub2RlVHlwZSAhPSAxIHx8IGhhc0Jsb2NrRGVzYyhub2RlKSB8fCBhdG9tRWxlbWVudHMudGVzdChub2RlLm5vZGVOYW1lKSB8fCBub2RlLmNvbnRlbnRFZGl0YWJsZSA9PSBcImZhbHNlXCIpXG4gICAgICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIG9mZiA9IGRvbUluZGV4KG5vZGUpICsgKGRpciA8IDAgPyAwIDogMSk7XG4gICAgICBub2RlID0gcGFyZW50O1xuICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICBub2RlID0gbm9kZS5jaGlsZE5vZGVzW29mZiArIChkaXIgPCAwID8gLTEgOiAwKV07XG4gICAgICBpZiAobm9kZS5jb250ZW50RWRpdGFibGUgPT0gXCJmYWxzZVwiKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICBvZmYgPSBkaXIgPCAwID8gbm9kZVNpemUobm9kZSkgOiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9kZVNpemUobm9kZSkge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PSAzID8gbm9kZS5ub2RlVmFsdWUubGVuZ3RoIDogbm9kZS5jaGlsZE5vZGVzLmxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc09uRWRnZShub2RlLCBvZmZzZXQsIHBhcmVudCkge1xuICBmb3IgKHZhciBhdFN0YXJ0ID0gb2Zmc2V0ID09IDAsIGF0RW5kID0gb2Zmc2V0ID09IG5vZGVTaXplKG5vZGUpOyBhdFN0YXJ0IHx8IGF0RW5kOykge1xuICAgIGlmIChub2RlID09IHBhcmVudCkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgdmFyIGluZGV4ID0gZG9tSW5kZXgobm9kZSk7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAoIW5vZGUpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBhdFN0YXJ0ID0gYXRTdGFydCAmJiBpbmRleCA9PSAwO1xuICAgIGF0RW5kID0gYXRFbmQgJiYgaW5kZXggPT0gbm9kZVNpemUobm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzQmxvY2tEZXNjKGRvbSkge1xuICB2YXIgZGVzYztcbiAgZm9yICh2YXIgY3VyID0gZG9tOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlKSB7IGlmIChkZXNjID0gY3VyLnBtVmlld0Rlc2MpIHsgYnJlYWsgfSB9XG4gIHJldHVybiBkZXNjICYmIGRlc2Mubm9kZSAmJiBkZXNjLm5vZGUuaXNCbG9jayAmJiAoZGVzYy5kb20gPT0gZG9tIHx8IGRlc2MuY29udGVudERPTSA9PSBkb20pXG59XG5cbi8vIFdvcmsgYXJvdW5kIENocm9tZSBpc3N1ZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NDc1MjNcbi8vIChpc0NvbGxhcHNlZCBpbmFwcHJvcHJpYXRlbHkgcmV0dXJucyB0cnVlIGluIHNoYWRvdyBkb20pXG52YXIgc2VsZWN0aW9uQ29sbGFwc2VkID0gZnVuY3Rpb24oZG9tU2VsKSB7XG4gIHZhciBjb2xsYXBzZWQgPSBkb21TZWwuaXNDb2xsYXBzZWQ7XG4gIGlmIChjb2xsYXBzZWQgJiYgcmVzdWx0LmNocm9tZSAmJiBkb21TZWwucmFuZ2VDb3VudCAmJiAhZG9tU2VsLmdldFJhbmdlQXQoMCkuY29sbGFwc2VkKVxuICAgIHsgY29sbGFwc2VkID0gZmFsc2U7IH1cbiAgcmV0dXJuIGNvbGxhcHNlZFxufTtcblxuZnVuY3Rpb24ga2V5RXZlbnQoa2V5Q29kZSwga2V5KSB7XG4gIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gIGV2ZW50LmluaXRFdmVudChcImtleWRvd25cIiwgdHJ1ZSwgdHJ1ZSk7XG4gIGV2ZW50LmtleUNvZGUgPSBrZXlDb2RlO1xuICBldmVudC5rZXkgPSBldmVudC5jb2RlID0ga2V5O1xuICByZXR1cm4gZXZlbnRcbn1cblxuZnVuY3Rpb24gd2luZG93UmVjdChkb2MpIHtcbiAgcmV0dXJuIHtsZWZ0OiAwLCByaWdodDogZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICB0b3A6IDAsIGJvdHRvbTogZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR9XG59XG5cbmZ1bmN0aW9uIGdldFNpZGUodmFsdWUsIHNpZGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSBcIm51bWJlclwiID8gdmFsdWUgOiB2YWx1ZVtzaWRlXVxufVxuXG5mdW5jdGlvbiBjbGllbnRSZWN0KG5vZGUpIHtcbiAgdmFyIHJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAvLyBBZGp1c3QgZm9yIGVsZW1lbnRzIHdpdGggc3R5bGUgXCJ0cmFuc2Zvcm06IHNjYWxlKClcIlxuICB2YXIgc2NhbGVYID0gKHJlY3Qud2lkdGggLyBub2RlLm9mZnNldFdpZHRoKSB8fCAxO1xuICB2YXIgc2NhbGVZID0gKHJlY3QuaGVpZ2h0IC8gbm9kZS5vZmZzZXRIZWlnaHQpIHx8IDE7XG4gIC8vIE1ha2Ugc3VyZSBzY3JvbGxiYXIgd2lkdGggaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIHJlY3RhbmdsZVxuICByZXR1cm4ge2xlZnQ6IHJlY3QubGVmdCwgcmlnaHQ6IHJlY3QubGVmdCArIG5vZGUuY2xpZW50V2lkdGggKiBzY2FsZVgsXG4gICAgICAgICAgdG9wOiByZWN0LnRvcCwgYm90dG9tOiByZWN0LnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0ICogc2NhbGVZfVxufVxuXG5mdW5jdGlvbiBzY3JvbGxSZWN0SW50b1ZpZXcodmlldywgcmVjdCwgc3RhcnRET00pIHtcbiAgdmFyIHNjcm9sbFRocmVzaG9sZCA9IHZpZXcuc29tZVByb3AoXCJzY3JvbGxUaHJlc2hvbGRcIikgfHwgMCwgc2Nyb2xsTWFyZ2luID0gdmlldy5zb21lUHJvcChcInNjcm9sbE1hcmdpblwiKSB8fCA1O1xuICB2YXIgZG9jID0gdmlldy5kb20ub3duZXJEb2N1bWVudDtcbiAgZm9yICh2YXIgcGFyZW50ID0gc3RhcnRET00gfHwgdmlldy5kb207OyBwYXJlbnQgPSBwYXJlbnROb2RlKHBhcmVudCkpIHtcbiAgICBpZiAoIXBhcmVudCkgeyBicmVhayB9XG4gICAgaWYgKHBhcmVudC5ub2RlVHlwZSAhPSAxKSB7IGNvbnRpbnVlIH1cbiAgICB2YXIgYXRUb3AgPSBwYXJlbnQgPT0gZG9jLmJvZHkgfHwgcGFyZW50Lm5vZGVUeXBlICE9IDE7XG4gICAgdmFyIGJvdW5kaW5nID0gYXRUb3AgPyB3aW5kb3dSZWN0KGRvYykgOiBjbGllbnRSZWN0KHBhcmVudCk7XG4gICAgdmFyIG1vdmVYID0gMCwgbW92ZVkgPSAwO1xuICAgIGlmIChyZWN0LnRvcCA8IGJvdW5kaW5nLnRvcCArIGdldFNpZGUoc2Nyb2xsVGhyZXNob2xkLCBcInRvcFwiKSlcbiAgICAgIHsgbW92ZVkgPSAtKGJvdW5kaW5nLnRvcCAtIHJlY3QudG9wICsgZ2V0U2lkZShzY3JvbGxNYXJnaW4sIFwidG9wXCIpKTsgfVxuICAgIGVsc2UgaWYgKHJlY3QuYm90dG9tID4gYm91bmRpbmcuYm90dG9tIC0gZ2V0U2lkZShzY3JvbGxUaHJlc2hvbGQsIFwiYm90dG9tXCIpKVxuICAgICAgeyBtb3ZlWSA9IHJlY3QuYm90dG9tIC0gYm91bmRpbmcuYm90dG9tICsgZ2V0U2lkZShzY3JvbGxNYXJnaW4sIFwiYm90dG9tXCIpOyB9XG4gICAgaWYgKHJlY3QubGVmdCA8IGJvdW5kaW5nLmxlZnQgKyBnZXRTaWRlKHNjcm9sbFRocmVzaG9sZCwgXCJsZWZ0XCIpKVxuICAgICAgeyBtb3ZlWCA9IC0oYm91bmRpbmcubGVmdCAtIHJlY3QubGVmdCArIGdldFNpZGUoc2Nyb2xsTWFyZ2luLCBcImxlZnRcIikpOyB9XG4gICAgZWxzZSBpZiAocmVjdC5yaWdodCA+IGJvdW5kaW5nLnJpZ2h0IC0gZ2V0U2lkZShzY3JvbGxUaHJlc2hvbGQsIFwicmlnaHRcIikpXG4gICAgICB7IG1vdmVYID0gcmVjdC5yaWdodCAtIGJvdW5kaW5nLnJpZ2h0ICsgZ2V0U2lkZShzY3JvbGxNYXJnaW4sIFwicmlnaHRcIik7IH1cbiAgICBpZiAobW92ZVggfHwgbW92ZVkpIHtcbiAgICAgIGlmIChhdFRvcCkge1xuICAgICAgICBkb2MuZGVmYXVsdFZpZXcuc2Nyb2xsQnkobW92ZVgsIG1vdmVZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzdGFydFggPSBwYXJlbnQuc2Nyb2xsTGVmdCwgc3RhcnRZID0gcGFyZW50LnNjcm9sbFRvcDtcbiAgICAgICAgaWYgKG1vdmVZKSB7IHBhcmVudC5zY3JvbGxUb3AgKz0gbW92ZVk7IH1cbiAgICAgICAgaWYgKG1vdmVYKSB7IHBhcmVudC5zY3JvbGxMZWZ0ICs9IG1vdmVYOyB9XG4gICAgICAgIHZhciBkWCA9IHBhcmVudC5zY3JvbGxMZWZ0IC0gc3RhcnRYLCBkWSA9IHBhcmVudC5zY3JvbGxUb3AgLSBzdGFydFk7XG4gICAgICAgIHJlY3QgPSB7bGVmdDogcmVjdC5sZWZ0IC0gZFgsIHRvcDogcmVjdC50b3AgLSBkWSwgcmlnaHQ6IHJlY3QucmlnaHQgLSBkWCwgYm90dG9tOiByZWN0LmJvdHRvbSAtIGRZfTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF0VG9wKSB7IGJyZWFrIH1cbiAgfVxufVxuXG4vLyBTdG9yZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBlZGl0b3IncyBwYXJlbnQgbm9kZXMsIGFsb25nIHdpdGhcbi8vIHRoZSB0b3AgcG9zaXRpb24gb2YgYW4gZWxlbWVudCBuZWFyIHRoZSB0b3Agb2YgdGhlIGVkaXRvciwgd2hpY2hcbi8vIHdpbGwgYmUgdXNlZCB0byBtYWtlIHN1cmUgdGhlIHZpc2libGUgdmlld3BvcnQgcmVtYWlucyBzdGFibGUgZXZlblxuLy8gd2hlbiB0aGUgc2l6ZSBvZiB0aGUgY29udGVudCBhYm92ZSBjaGFuZ2VzLlxuZnVuY3Rpb24gc3RvcmVTY3JvbGxQb3Modmlldykge1xuICB2YXIgcmVjdCA9IHZpZXcuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzdGFydFkgPSBNYXRoLm1heCgwLCByZWN0LnRvcCk7XG4gIHZhciByZWZET00sIHJlZlRvcDtcbiAgZm9yICh2YXIgeCA9IChyZWN0LmxlZnQgKyByZWN0LnJpZ2h0KSAvIDIsIHkgPSBzdGFydFkgKyAxO1xuICAgICAgIHkgPCBNYXRoLm1pbihpbm5lckhlaWdodCwgcmVjdC5ib3R0b20pOyB5ICs9IDUpIHtcbiAgICB2YXIgZG9tID0gdmlldy5yb290LmVsZW1lbnRGcm9tUG9pbnQoeCwgeSk7XG4gICAgaWYgKGRvbSA9PSB2aWV3LmRvbSB8fCAhdmlldy5kb20uY29udGFpbnMoZG9tKSkgeyBjb250aW51ZSB9XG4gICAgdmFyIGxvY2FsUmVjdCA9IGRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAobG9jYWxSZWN0LnRvcCA+PSBzdGFydFkgLSAyMCkge1xuICAgICAgcmVmRE9NID0gZG9tO1xuICAgICAgcmVmVG9wID0gbG9jYWxSZWN0LnRvcDtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiB7cmVmRE9NOiByZWZET00sIHJlZlRvcDogcmVmVG9wLCBzdGFjazogc2Nyb2xsU3RhY2sodmlldy5kb20pfVxufVxuXG5mdW5jdGlvbiBzY3JvbGxTdGFjayhkb20pIHtcbiAgdmFyIHN0YWNrID0gW10sIGRvYyA9IGRvbS5vd25lckRvY3VtZW50O1xuICBmb3IgKDsgZG9tOyBkb20gPSBwYXJlbnROb2RlKGRvbSkpIHtcbiAgICBzdGFjay5wdXNoKHtkb206IGRvbSwgdG9wOiBkb20uc2Nyb2xsVG9wLCBsZWZ0OiBkb20uc2Nyb2xsTGVmdH0pO1xuICAgIGlmIChkb20gPT0gZG9jKSB7IGJyZWFrIH1cbiAgfVxuICByZXR1cm4gc3RhY2tcbn1cblxuLy8gUmVzZXQgdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgZWRpdG9yJ3MgcGFyZW50IG5vZGVzIHRvIHRoYXQgd2hhdFxuLy8gaXQgd2FzIGJlZm9yZSwgd2hlbiBzdG9yZVNjcm9sbFBvcyB3YXMgY2FsbGVkLlxuZnVuY3Rpb24gcmVzZXRTY3JvbGxQb3MocmVmKSB7XG4gIHZhciByZWZET00gPSByZWYucmVmRE9NO1xuICB2YXIgcmVmVG9wID0gcmVmLnJlZlRvcDtcbiAgdmFyIHN0YWNrID0gcmVmLnN0YWNrO1xuXG4gIHZhciBuZXdSZWZUb3AgPSByZWZET00gPyByZWZET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDogMDtcbiAgcmVzdG9yZVNjcm9sbFN0YWNrKHN0YWNrLCBuZXdSZWZUb3AgPT0gMCA/IDAgOiBuZXdSZWZUb3AgLSByZWZUb3ApO1xufVxuXG5mdW5jdGlvbiByZXN0b3JlU2Nyb2xsU3RhY2soc3RhY2ssIGRUb3ApIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWYgPSBzdGFja1tpXTtcbiAgICB2YXIgZG9tID0gcmVmLmRvbTtcbiAgICB2YXIgdG9wID0gcmVmLnRvcDtcbiAgICB2YXIgbGVmdCA9IHJlZi5sZWZ0O1xuICAgIGlmIChkb20uc2Nyb2xsVG9wICE9IHRvcCArIGRUb3ApIHsgZG9tLnNjcm9sbFRvcCA9IHRvcCArIGRUb3A7IH1cbiAgICBpZiAoZG9tLnNjcm9sbExlZnQgIT0gbGVmdCkgeyBkb20uc2Nyb2xsTGVmdCA9IGxlZnQ7IH1cbiAgfVxufVxuXG52YXIgcHJldmVudFNjcm9sbFN1cHBvcnRlZCA9IG51bGw7XG4vLyBGZWF0dXJlLWRldGVjdHMgc3VwcG9ydCBmb3IgLmZvY3VzKHtwcmV2ZW50U2Nyb2xsOiB0cnVlfSksIGFuZCB1c2VzXG4vLyBhIGZhbGxiYWNrIGtsdWRnZSB3aGVuIG5vdCBzdXBwb3J0ZWQuXG5mdW5jdGlvbiBmb2N1c1ByZXZlbnRTY3JvbGwoZG9tKSB7XG4gIGlmIChkb20uc2V0QWN0aXZlKSB7IHJldHVybiBkb20uc2V0QWN0aXZlKCkgfSAvLyBpbiBJRVxuICBpZiAocHJldmVudFNjcm9sbFN1cHBvcnRlZCkgeyByZXR1cm4gZG9tLmZvY3VzKHByZXZlbnRTY3JvbGxTdXBwb3J0ZWQpIH1cblxuICB2YXIgc3RvcmVkID0gc2Nyb2xsU3RhY2soZG9tKTtcbiAgZG9tLmZvY3VzKHByZXZlbnRTY3JvbGxTdXBwb3J0ZWQgPT0gbnVsbCA/IHtcbiAgICBnZXQgcHJldmVudFNjcm9sbCgpIHtcbiAgICAgIHByZXZlbnRTY3JvbGxTdXBwb3J0ZWQgPSB7cHJldmVudFNjcm9sbDogdHJ1ZX07XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfSA6IHVuZGVmaW5lZCk7XG4gIGlmICghcHJldmVudFNjcm9sbFN1cHBvcnRlZCkge1xuICAgIHByZXZlbnRTY3JvbGxTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICByZXN0b3JlU2Nyb2xsU3RhY2soc3RvcmVkLCAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kT2Zmc2V0SW5Ob2RlKG5vZGUsIGNvb3Jkcykge1xuICB2YXIgY2xvc2VzdCwgZHhDbG9zZXN0ID0gMmU4LCBjb29yZHNDbG9zZXN0LCBvZmZzZXQgPSAwO1xuICB2YXIgcm93Qm90ID0gY29vcmRzLnRvcCwgcm93VG9wID0gY29vcmRzLnRvcDtcbiAgZm9yICh2YXIgY2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQsIGNoaWxkSW5kZXggPSAwOyBjaGlsZDsgY2hpbGQgPSBjaGlsZC5uZXh0U2libGluZywgY2hpbGRJbmRleCsrKSB7XG4gICAgdmFyIHJlY3RzID0gKHZvaWQgMCk7XG4gICAgaWYgKGNoaWxkLm5vZGVUeXBlID09IDEpIHsgcmVjdHMgPSBjaGlsZC5nZXRDbGllbnRSZWN0cygpOyB9XG4gICAgZWxzZSBpZiAoY2hpbGQubm9kZVR5cGUgPT0gMykgeyByZWN0cyA9IHRleHRSYW5nZShjaGlsZCkuZ2V0Q2xpZW50UmVjdHMoKTsgfVxuICAgIGVsc2UgeyBjb250aW51ZSB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmVjdCA9IHJlY3RzW2ldO1xuICAgICAgaWYgKHJlY3QudG9wIDw9IHJvd0JvdCAmJiByZWN0LmJvdHRvbSA+PSByb3dUb3ApIHtcbiAgICAgICAgcm93Qm90ID0gTWF0aC5tYXgocmVjdC5ib3R0b20sIHJvd0JvdCk7XG4gICAgICAgIHJvd1RvcCA9IE1hdGgubWluKHJlY3QudG9wLCByb3dUb3ApO1xuICAgICAgICB2YXIgZHggPSByZWN0LmxlZnQgPiBjb29yZHMubGVmdCA/IHJlY3QubGVmdCAtIGNvb3Jkcy5sZWZ0XG4gICAgICAgICAgICA6IHJlY3QucmlnaHQgPCBjb29yZHMubGVmdCA/IGNvb3Jkcy5sZWZ0IC0gcmVjdC5yaWdodCA6IDA7XG4gICAgICAgIGlmIChkeCA8IGR4Q2xvc2VzdCkge1xuICAgICAgICAgIGNsb3Nlc3QgPSBjaGlsZDtcbiAgICAgICAgICBkeENsb3Nlc3QgPSBkeDtcbiAgICAgICAgICBjb29yZHNDbG9zZXN0ID0gZHggJiYgY2xvc2VzdC5ub2RlVHlwZSA9PSAzID8ge2xlZnQ6IHJlY3QucmlnaHQgPCBjb29yZHMubGVmdCA/IHJlY3QucmlnaHQgOiByZWN0LmxlZnQsIHRvcDogY29vcmRzLnRvcH0gOiBjb29yZHM7XG4gICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09IDEgJiYgZHgpXG4gICAgICAgICAgICB7IG9mZnNldCA9IGNoaWxkSW5kZXggKyAoY29vcmRzLmxlZnQgPj0gKHJlY3QubGVmdCArIHJlY3QucmlnaHQpIC8gMiA/IDEgOiAwKTsgfVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghY2xvc2VzdCAmJiAoY29vcmRzLmxlZnQgPj0gcmVjdC5yaWdodCAmJiBjb29yZHMudG9wID49IHJlY3QudG9wIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5sZWZ0ID49IHJlY3QubGVmdCAmJiBjb29yZHMudG9wID49IHJlY3QuYm90dG9tKSlcbiAgICAgICAgeyBvZmZzZXQgPSBjaGlsZEluZGV4ICsgMTsgfVxuICAgIH1cbiAgfVxuICBpZiAoY2xvc2VzdCAmJiBjbG9zZXN0Lm5vZGVUeXBlID09IDMpIHsgcmV0dXJuIGZpbmRPZmZzZXRJblRleHQoY2xvc2VzdCwgY29vcmRzQ2xvc2VzdCkgfVxuICBpZiAoIWNsb3Nlc3QgfHwgKGR4Q2xvc2VzdCAmJiBjbG9zZXN0Lm5vZGVUeXBlID09IDEpKSB7IHJldHVybiB7bm9kZTogbm9kZSwgb2Zmc2V0OiBvZmZzZXR9IH1cbiAgcmV0dXJuIGZpbmRPZmZzZXRJbk5vZGUoY2xvc2VzdCwgY29vcmRzQ2xvc2VzdClcbn1cblxuZnVuY3Rpb24gZmluZE9mZnNldEluVGV4dChub2RlLCBjb29yZHMpIHtcbiAgdmFyIGxlbiA9IG5vZGUubm9kZVZhbHVlLmxlbmd0aDtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHJhbmdlLnNldEVuZChub2RlLCBpICsgMSk7XG4gICAgcmFuZ2Uuc2V0U3RhcnQobm9kZSwgaSk7XG4gICAgdmFyIHJlY3QgPSBzaW5nbGVSZWN0KHJhbmdlLCAxKTtcbiAgICBpZiAocmVjdC50b3AgPT0gcmVjdC5ib3R0b20pIHsgY29udGludWUgfVxuICAgIGlmIChpblJlY3QoY29vcmRzLCByZWN0KSlcbiAgICAgIHsgcmV0dXJuIHtub2RlOiBub2RlLCBvZmZzZXQ6IGkgKyAoY29vcmRzLmxlZnQgPj0gKHJlY3QubGVmdCArIHJlY3QucmlnaHQpIC8gMiA/IDEgOiAwKX0gfVxuICB9XG4gIHJldHVybiB7bm9kZTogbm9kZSwgb2Zmc2V0OiAwfVxufVxuXG5mdW5jdGlvbiBpblJlY3QoY29vcmRzLCByZWN0KSB7XG4gIHJldHVybiBjb29yZHMubGVmdCA+PSByZWN0LmxlZnQgLSAxICYmIGNvb3Jkcy5sZWZ0IDw9IHJlY3QucmlnaHQgKyAxJiZcbiAgICBjb29yZHMudG9wID49IHJlY3QudG9wIC0gMSAmJiBjb29yZHMudG9wIDw9IHJlY3QuYm90dG9tICsgMVxufVxuXG5mdW5jdGlvbiB0YXJnZXRLbHVkZ2UoZG9tLCBjb29yZHMpIHtcbiAgdmFyIHBhcmVudCA9IGRvbS5wYXJlbnROb2RlO1xuICBpZiAocGFyZW50ICYmIC9ebGkkL2kudGVzdChwYXJlbnQubm9kZU5hbWUpICYmIGNvb3Jkcy5sZWZ0IDwgZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpXG4gICAgeyByZXR1cm4gcGFyZW50IH1cbiAgcmV0dXJuIGRvbVxufVxuXG5mdW5jdGlvbiBwb3NGcm9tRWxlbWVudCh2aWV3LCBlbHQsIGNvb3Jkcykge1xuICB2YXIgcmVmID0gZmluZE9mZnNldEluTm9kZShlbHQsIGNvb3Jkcyk7XG4gIHZhciBub2RlID0gcmVmLm5vZGU7XG4gIHZhciBvZmZzZXQgPSByZWYub2Zmc2V0O1xuICB2YXIgYmlhcyA9IC0xO1xuICBpZiAobm9kZS5ub2RlVHlwZSA9PSAxICYmICFub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICB2YXIgcmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgYmlhcyA9IHJlY3QubGVmdCAhPSByZWN0LnJpZ2h0ICYmIGNvb3Jkcy5sZWZ0ID4gKHJlY3QubGVmdCArIHJlY3QucmlnaHQpIC8gMiA/IDEgOiAtMTtcbiAgfVxuICByZXR1cm4gdmlldy5kb2NWaWV3LnBvc0Zyb21ET00obm9kZSwgb2Zmc2V0LCBiaWFzKVxufVxuXG5mdW5jdGlvbiBwb3NGcm9tQ2FyZXQodmlldywgbm9kZSwgb2Zmc2V0LCBjb29yZHMpIHtcbiAgLy8gQnJvd3NlciAoaW4gY2FyZXRQb3NpdGlvbi9SYW5nZUZyb21Qb2ludCkgd2lsbCBhZ3Jlc3NpdmVseVxuICAvLyBub3JtYWxpemUgdG93YXJkcyBuZWFyYnkgaW5saW5lIG5vZGVzLiBTaW5jZSB3ZSBhcmUgaW50ZXJlc3RlZCBpblxuICAvLyBwb3NpdGlvbnMgYmV0d2VlbiBibG9jayBub2RlcyB0b28sIHdlIGZpcnN0IHdhbGsgdXAgdGhlIGhpZXJhcmNoeVxuICAvLyBvZiBub2RlcyB0byBzZWUgaWYgdGhlcmUgYXJlIGJsb2NrIG5vZGVzIHRoYXQgdGhlIGNvb3JkaW5hdGVzXG4gIC8vIGZhbGwgb3V0c2lkZSBvZi4gSWYgc28sIHdlIHRha2UgdGhlIHBvc2l0aW9uIGJlZm9yZS9hZnRlciB0aGF0XG4gIC8vIGJsb2NrLiBJZiBub3QsIHdlIGNhbGwgYHBvc0Zyb21ET01gIG9uIHRoZSByYXcgbm9kZS9vZmZzZXQuXG4gIHZhciBvdXRzaWRlID0gLTE7XG4gIGZvciAodmFyIGN1ciA9IG5vZGU7Oykge1xuICAgIGlmIChjdXIgPT0gdmlldy5kb20pIHsgYnJlYWsgfVxuICAgIHZhciBkZXNjID0gdmlldy5kb2NWaWV3Lm5lYXJlc3REZXNjKGN1ciwgdHJ1ZSk7XG4gICAgaWYgKCFkZXNjKSB7IHJldHVybiBudWxsIH1cbiAgICBpZiAoZGVzYy5ub2RlLmlzQmxvY2sgJiYgZGVzYy5wYXJlbnQpIHtcbiAgICAgIHZhciByZWN0ID0gZGVzYy5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAocmVjdC5sZWZ0ID4gY29vcmRzLmxlZnQgfHwgcmVjdC50b3AgPiBjb29yZHMudG9wKSB7IG91dHNpZGUgPSBkZXNjLnBvc0JlZm9yZTsgfVxuICAgICAgZWxzZSBpZiAocmVjdC5yaWdodCA8IGNvb3Jkcy5sZWZ0IHx8IHJlY3QuYm90dG9tIDwgY29vcmRzLnRvcCkgeyBvdXRzaWRlID0gZGVzYy5wb3NBZnRlcjsgfVxuICAgICAgZWxzZSB7IGJyZWFrIH1cbiAgICB9XG4gICAgY3VyID0gZGVzYy5kb20ucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gb3V0c2lkZSA+IC0xID8gb3V0c2lkZSA6IHZpZXcuZG9jVmlldy5wb3NGcm9tRE9NKG5vZGUsIG9mZnNldClcbn1cblxuZnVuY3Rpb24gZWxlbWVudEZyb21Qb2ludChlbGVtZW50LCBjb29yZHMsIGJveCkge1xuICB2YXIgbGVuID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgaWYgKGxlbiAmJiBib3gudG9wIDwgYm94LmJvdHRvbSkge1xuICAgIGZvciAodmFyIHN0YXJ0SSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGxlbiAtIDEsIE1hdGguZmxvb3IobGVuICogKGNvb3Jkcy50b3AgLSBib3gudG9wKSAvIChib3guYm90dG9tIC0gYm94LnRvcCkpIC0gMikpLCBpID0gc3RhcnRJOzspIHtcbiAgICAgIHZhciBjaGlsZCA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PSAxKSB7XG4gICAgICAgIHZhciByZWN0cyA9IGNoaWxkLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmVjdCA9IHJlY3RzW2pdO1xuICAgICAgICAgIGlmIChpblJlY3QoY29vcmRzLCByZWN0KSkgeyByZXR1cm4gZWxlbWVudEZyb21Qb2ludChjaGlsZCwgY29vcmRzLCByZWN0KSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgoaSA9IChpICsgMSkgJSBsZW4pID09IHN0YXJ0SSkgeyBicmVhayB9XG4gICAgfVxuICB9XG4gIHJldHVybiBlbGVtZW50XG59XG5cbi8vIEdpdmVuIGFuIHgseSBwb3NpdGlvbiBvbiB0aGUgZWRpdG9yLCBnZXQgdGhlIHBvc2l0aW9uIGluIHRoZSBkb2N1bWVudC5cbmZ1bmN0aW9uIHBvc0F0Q29vcmRzKHZpZXcsIGNvb3Jkcykge1xuICB2YXIgYXNzaWduLCBhc3NpZ24kMTtcblxuICB2YXIgcm9vdCA9IHZpZXcucm9vdCwgbm9kZSwgb2Zmc2V0O1xuICBpZiAocm9vdC5jYXJldFBvc2l0aW9uRnJvbVBvaW50KSB7XG4gICAgdHJ5IHsgLy8gRmlyZWZveCB0aHJvd3MgZm9yIHRoaXMgY2FsbCBpbiBoYXJkLXRvLXByZWRpY3QgY2lyY3Vtc3RhbmNlcyAoIzk5NClcbiAgICAgIHZhciBwb3MkMSA9IHJvb3QuY2FyZXRQb3NpdGlvbkZyb21Qb2ludChjb29yZHMubGVmdCwgY29vcmRzLnRvcCk7XG4gICAgICBpZiAocG9zJDEpIHsgKChhc3NpZ24gPSBwb3MkMSwgbm9kZSA9IGFzc2lnbi5vZmZzZXROb2RlLCBvZmZzZXQgPSBhc3NpZ24ub2Zmc2V0KSk7IH1cbiAgICB9IGNhdGNoIChfKSB7fVxuICB9XG4gIGlmICghbm9kZSAmJiByb290LmNhcmV0UmFuZ2VGcm9tUG9pbnQpIHtcbiAgICB2YXIgcmFuZ2UgPSByb290LmNhcmV0UmFuZ2VGcm9tUG9pbnQoY29vcmRzLmxlZnQsIGNvb3Jkcy50b3ApO1xuICAgIGlmIChyYW5nZSkgeyAoKGFzc2lnbiQxID0gcmFuZ2UsIG5vZGUgPSBhc3NpZ24kMS5zdGFydENvbnRhaW5lciwgb2Zmc2V0ID0gYXNzaWduJDEuc3RhcnRPZmZzZXQpKTsgfVxuICB9XG5cbiAgdmFyIGVsdCA9IHJvb3QuZWxlbWVudEZyb21Qb2ludChjb29yZHMubGVmdCwgY29vcmRzLnRvcCArIDEpLCBwb3M7XG4gIGlmICghZWx0IHx8ICF2aWV3LmRvbS5jb250YWlucyhlbHQubm9kZVR5cGUgIT0gMSA/IGVsdC5wYXJlbnROb2RlIDogZWx0KSkge1xuICAgIHZhciBib3ggPSB2aWV3LmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoIWluUmVjdChjb29yZHMsIGJveCkpIHsgcmV0dXJuIG51bGwgfVxuICAgIGVsdCA9IGVsZW1lbnRGcm9tUG9pbnQodmlldy5kb20sIGNvb3JkcywgYm94KTtcbiAgICBpZiAoIWVsdCkgeyByZXR1cm4gbnVsbCB9XG4gIH1cbiAgLy8gU2FmYXJpJ3MgY2FyZXRSYW5nZUZyb21Qb2ludCByZXR1cm5zIG5vbnNlbnNlIHdoZW4gb24gYSBkcmFnZ2FibGUgZWxlbWVudFxuICBpZiAocmVzdWx0LnNhZmFyaSAmJiBlbHQuZHJhZ2dhYmxlKSB7IG5vZGUgPSBvZmZzZXQgPSBudWxsOyB9XG4gIGVsdCA9IHRhcmdldEtsdWRnZShlbHQsIGNvb3Jkcyk7XG4gIGlmIChub2RlKSB7XG4gICAgaWYgKHJlc3VsdC5nZWNrbyAmJiBub2RlLm5vZGVUeXBlID09IDEpIHtcbiAgICAgIC8vIEZpcmVmb3ggd2lsbCBzb21ldGltZXMgcmV0dXJuIG9mZnNldHMgaW50byA8aW5wdXQ+IG5vZGVzLCB3aGljaFxuICAgICAgLy8gaGF2ZSBubyBhY3R1YWwgY2hpbGRyZW4sIGZyb20gY2FyZXRQb3NpdGlvbkZyb21Qb2ludCAoIzk1MylcbiAgICAgIG9mZnNldCA9IE1hdGgubWluKG9mZnNldCwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgICAvLyBJdCdsbCBhbHNvIG1vdmUgdGhlIHJldHVybmVkIHBvc2l0aW9uIGJlZm9yZSBpbWFnZSBub2RlcyxcbiAgICAgIC8vIGV2ZW4gaWYgdGhvc2UgYXJlIGJlaGluZCBpdC5cbiAgICAgIGlmIChvZmZzZXQgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBuZXh0ID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldF0sIGJveCQxO1xuICAgICAgICBpZiAobmV4dC5ub2RlTmFtZSA9PSBcIklNR1wiICYmIChib3gkMSA9IG5leHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLnJpZ2h0IDw9IGNvb3Jkcy5sZWZ0ICYmXG4gICAgICAgICAgICBib3gkMS5ib3R0b20gPiBjb29yZHMudG9wKVxuICAgICAgICAgIHsgb2Zmc2V0Kys7IH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gU3VzcGljaW91c2x5IHNwZWNpZmljIGtsdWRnZSB0byB3b3JrIGFyb3VuZCBjYXJldCpGcm9tUG9pbnRcbiAgICAvLyBuZXZlciByZXR1cm5pbmcgYSBwb3NpdGlvbiBhdCB0aGUgZW5kIG9mIHRoZSBkb2N1bWVudFxuICAgIGlmIChub2RlID09IHZpZXcuZG9tICYmIG9mZnNldCA9PSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIC0gMSAmJiBub2RlLmxhc3RDaGlsZC5ub2RlVHlwZSA9PSAxICYmXG4gICAgICAgIGNvb3Jkcy50b3AgPiBub2RlLmxhc3RDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20pXG4gICAgICB7IHBvcyA9IHZpZXcuc3RhdGUuZG9jLmNvbnRlbnQuc2l6ZTsgfVxuICAgIC8vIElnbm9yZSBwb3NpdGlvbnMgZGlyZWN0bHkgYWZ0ZXIgYSBCUiwgc2luY2UgY2FyZXQqRnJvbVBvaW50XG4gICAgLy8gJ3JvdW5kIHVwJyBwb3NpdGlvbnMgdGhhdCB3b3VsZCBiZSBtb3JlIGFjY3VyYXRlbHkgcGxhY2VkXG4gICAgLy8gYmVmb3JlIHRoZSBCUiBub2RlLlxuICAgIGVsc2UgaWYgKG9mZnNldCA9PSAwIHx8IG5vZGUubm9kZVR5cGUgIT0gMSB8fCBub2RlLmNoaWxkTm9kZXNbb2Zmc2V0IC0gMV0ubm9kZU5hbWUgIT0gXCJCUlwiKVxuICAgICAgeyBwb3MgPSBwb3NGcm9tQ2FyZXQodmlldywgbm9kZSwgb2Zmc2V0LCBjb29yZHMpOyB9XG4gIH1cbiAgaWYgKHBvcyA9PSBudWxsKSB7IHBvcyA9IHBvc0Zyb21FbGVtZW50KHZpZXcsIGVsdCwgY29vcmRzKTsgfVxuXG4gIHZhciBkZXNjID0gdmlldy5kb2NWaWV3Lm5lYXJlc3REZXNjKGVsdCwgdHJ1ZSk7XG4gIHJldHVybiB7cG9zOiBwb3MsIGluc2lkZTogZGVzYyA/IGRlc2MucG9zQXRTdGFydCAtIGRlc2MuYm9yZGVyIDogLTF9XG59XG5cbmZ1bmN0aW9uIHNpbmdsZVJlY3Qob2JqZWN0LCBiaWFzKSB7XG4gIHZhciByZWN0cyA9IG9iamVjdC5nZXRDbGllbnRSZWN0cygpO1xuICByZXR1cm4gIXJlY3RzLmxlbmd0aCA/IG9iamVjdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IHJlY3RzW2JpYXMgPCAwID8gMCA6IHJlY3RzLmxlbmd0aCAtIDFdXG59XG5cbnZhciBCSURJID0gL1tcXHUwNTkwLVxcdTA1ZjRcXHUwNjAwLVxcdTA2ZmZcXHUwNzAwLVxcdTA4YWNdLztcblxuLy8gOiAoRWRpdG9yVmlldywgbnVtYmVyLCBudW1iZXIpIOKGkiB7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXJ9XG4vLyBHaXZlbiBhIHBvc2l0aW9uIGluIHRoZSBkb2N1bWVudCBtb2RlbCwgZ2V0IGEgYm91bmRpbmcgYm94IG9mIHRoZVxuLy8gY2hhcmFjdGVyIGF0IHRoYXQgcG9zaXRpb24sIHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cuXG5mdW5jdGlvbiBjb29yZHNBdFBvcyh2aWV3LCBwb3MsIHNpZGUpIHtcbiAgdmFyIHJlZiA9IHZpZXcuZG9jVmlldy5kb21Gcm9tUG9zKHBvcywgc2lkZSA8IDAgPyAtMSA6IDEpO1xuICB2YXIgbm9kZSA9IHJlZi5ub2RlO1xuICB2YXIgb2Zmc2V0ID0gcmVmLm9mZnNldDtcblxuICB2YXIgc3VwcG9ydEVtcHR5UmFuZ2UgPSByZXN1bHQud2Via2l0IHx8IHJlc3VsdC5nZWNrbztcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT0gMykge1xuICAgIC8vIFRoZXNlIGJyb3dzZXJzIHN1cHBvcnQgcXVlcnlpbmcgZW1wdHkgdGV4dCByYW5nZXMuIFByZWZlciB0aGF0IGluXG4gICAgLy8gYmlkaSBjb250ZXh0IG9yIHdoZW4gYXQgdGhlIGVuZCBvZiBhIG5vZGUuXG4gICAgaWYgKHN1cHBvcnRFbXB0eVJhbmdlICYmIChCSURJLnRlc3Qobm9kZS5ub2RlVmFsdWUpIHx8IChzaWRlIDwgMCA/ICFvZmZzZXQgOiBvZmZzZXQgPT0gbm9kZS5ub2RlVmFsdWUubGVuZ3RoKSkpIHtcbiAgICAgIHZhciByZWN0ID0gc2luZ2xlUmVjdCh0ZXh0UmFuZ2Uobm9kZSwgb2Zmc2V0LCBvZmZzZXQpLCBzaWRlKTtcbiAgICAgIC8vIEZpcmVmb3ggcmV0dXJucyBiYWQgcmVzdWx0cyAodGhlIHBvc2l0aW9uIGJlZm9yZSB0aGUgc3BhY2UpXG4gICAgICAvLyB3aGVuIHF1ZXJ5aW5nIGEgcG9zaXRpb24gZGlyZWN0bHkgYWZ0ZXIgbGluZS1icm9rZW5cbiAgICAgIC8vIHdoaXRlc3BhY2UuIERldGVjdCB0aGlzIHNpdHVhdGlvbiBhbmQgYW5kIGtsdWRnZSBhcm91bmQgaXRcbiAgICAgIGlmIChyZXN1bHQuZ2Vja28gJiYgb2Zmc2V0ICYmIC9cXHMvLnRlc3Qobm9kZS5ub2RlVmFsdWVbb2Zmc2V0IC0gMV0pICYmIG9mZnNldCA8IG5vZGUubm9kZVZhbHVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgcmVjdEJlZm9yZSA9IHNpbmdsZVJlY3QodGV4dFJhbmdlKG5vZGUsIG9mZnNldCAtIDEsIG9mZnNldCAtIDEpLCAtMSk7XG4gICAgICAgIGlmIChyZWN0QmVmb3JlLnRvcCA9PSByZWN0LnRvcCkge1xuICAgICAgICAgIHZhciByZWN0QWZ0ZXIgPSBzaW5nbGVSZWN0KHRleHRSYW5nZShub2RlLCBvZmZzZXQsIG9mZnNldCArIDEpLCAtMSk7XG4gICAgICAgICAgaWYgKHJlY3RBZnRlci50b3AgIT0gcmVjdC50b3ApXG4gICAgICAgICAgICB7IHJldHVybiBmbGF0dGVuVihyZWN0QWZ0ZXIsIHJlY3RBZnRlci5sZWZ0IDwgcmVjdEJlZm9yZS5sZWZ0KSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmcm9tID0gb2Zmc2V0LCB0byA9IG9mZnNldCwgdGFrZVNpZGUgPSBzaWRlIDwgMCA/IDEgOiAtMTtcbiAgICAgIGlmIChzaWRlIDwgMCAmJiAhb2Zmc2V0KSB7IHRvKys7IHRha2VTaWRlID0gLTE7IH1cbiAgICAgIGVsc2UgaWYgKHNpZGUgPj0gMCAmJiBvZmZzZXQgPT0gbm9kZS5ub2RlVmFsdWUubGVuZ3RoKSB7IGZyb20tLTsgdGFrZVNpZGUgPSAxOyB9XG4gICAgICBlbHNlIGlmIChzaWRlIDwgMCkgeyBmcm9tLS07IH1cbiAgICAgIGVsc2UgeyB0byArKzsgfVxuICAgICAgcmV0dXJuIGZsYXR0ZW5WKHNpbmdsZVJlY3QodGV4dFJhbmdlKG5vZGUsIGZyb20sIHRvKSwgdGFrZVNpZGUpLCB0YWtlU2lkZSA8IDApXG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIGEgaG9yaXpvbnRhbCBsaW5lIGluIGJsb2NrIGNvbnRleHRcbiAgaWYgKCF2aWV3LnN0YXRlLmRvYy5yZXNvbHZlKHBvcykucGFyZW50LmlubGluZUNvbnRlbnQpIHtcbiAgICBpZiAob2Zmc2V0ICYmIChzaWRlIDwgMCB8fCBvZmZzZXQgPT0gbm9kZVNpemUobm9kZSkpKSB7XG4gICAgICB2YXIgYmVmb3JlID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldCAtIDFdO1xuICAgICAgaWYgKGJlZm9yZS5ub2RlVHlwZSA9PSAxKSB7IHJldHVybiBmbGF0dGVuSChiZWZvcmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGZhbHNlKSB9XG4gICAgfVxuICAgIGlmIChvZmZzZXQgPCBub2RlU2l6ZShub2RlKSkge1xuICAgICAgdmFyIGFmdGVyID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldF07XG4gICAgICBpZiAoYWZ0ZXIubm9kZVR5cGUgPT0gMSkgeyByZXR1cm4gZmxhdHRlbkgoYWZ0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHRydWUpIH1cbiAgICB9XG4gICAgcmV0dXJuIGZsYXR0ZW5IKG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHNpZGUgPj0gMClcbiAgfVxuXG4gIC8vIElubGluZSwgbm90IGluIHRleHQgbm9kZSAodGhpcyBpcyBub3QgQmlkaS1zYWZlKVxuICBpZiAob2Zmc2V0ICYmIChzaWRlIDwgMCB8fCBvZmZzZXQgPT0gbm9kZVNpemUobm9kZSkpKSB7XG4gICAgdmFyIGJlZm9yZSQxID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldCAtIDFdO1xuICAgIHZhciB0YXJnZXQgPSBiZWZvcmUkMS5ub2RlVHlwZSA9PSAzID8gdGV4dFJhbmdlKGJlZm9yZSQxLCBub2RlU2l6ZShiZWZvcmUkMSkgLSAoc3VwcG9ydEVtcHR5UmFuZ2UgPyAwIDogMSkpXG4gICAgICAgIC8vIEJSIG5vZGVzIHRlbmQgdG8gb25seSByZXR1cm4gdGhlIHJlY3RhbmdsZSBiZWZvcmUgdGhlbS5cbiAgICAgICAgLy8gT25seSB1c2UgdGhlbSBpZiB0aGV5IGFyZSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZWlyIHBhcmVudFxuICAgICAgICA6IGJlZm9yZSQxLm5vZGVUeXBlID09IDEgJiYgKGJlZm9yZSQxLm5vZGVOYW1lICE9IFwiQlJcIiB8fCAhYmVmb3JlJDEubmV4dFNpYmxpbmcpID8gYmVmb3JlJDEgOiBudWxsO1xuICAgIGlmICh0YXJnZXQpIHsgcmV0dXJuIGZsYXR0ZW5WKHNpbmdsZVJlY3QodGFyZ2V0LCAxKSwgZmFsc2UpIH1cbiAgfVxuICBpZiAob2Zmc2V0IDwgbm9kZVNpemUobm9kZSkpIHtcbiAgICB2YXIgYWZ0ZXIkMSA9IG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdO1xuICAgIHZhciB0YXJnZXQkMSA9IGFmdGVyJDEubm9kZVR5cGUgPT0gMyA/IHRleHRSYW5nZShhZnRlciQxLCAwLCAoc3VwcG9ydEVtcHR5UmFuZ2UgPyAwIDogMSkpXG4gICAgICAgIDogYWZ0ZXIkMS5ub2RlVHlwZSA9PSAxID8gYWZ0ZXIkMSA6IG51bGw7XG4gICAgaWYgKHRhcmdldCQxKSB7IHJldHVybiBmbGF0dGVuVihzaW5nbGVSZWN0KHRhcmdldCQxLCAtMSksIHRydWUpIH1cbiAgfVxuICAvLyBBbGwgZWxzZSBmYWlsZWQsIGp1c3QgdHJ5IHRvIGdldCBhIHJlY3RhbmdsZSBmb3IgdGhlIHRhcmdldCBub2RlXG4gIHJldHVybiBmbGF0dGVuVihzaW5nbGVSZWN0KG5vZGUubm9kZVR5cGUgPT0gMyA/IHRleHRSYW5nZShub2RlKSA6IG5vZGUsIC1zaWRlKSwgc2lkZSA+PSAwKVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuVihyZWN0LCBsZWZ0KSB7XG4gIGlmIChyZWN0LndpZHRoID09IDApIHsgcmV0dXJuIHJlY3QgfVxuICB2YXIgeCA9IGxlZnQgPyByZWN0LmxlZnQgOiByZWN0LnJpZ2h0O1xuICByZXR1cm4ge3RvcDogcmVjdC50b3AsIGJvdHRvbTogcmVjdC5ib3R0b20sIGxlZnQ6IHgsIHJpZ2h0OiB4fVxufVxuXG5mdW5jdGlvbiBmbGF0dGVuSChyZWN0LCB0b3ApIHtcbiAgaWYgKHJlY3QuaGVpZ2h0ID09IDApIHsgcmV0dXJuIHJlY3QgfVxuICB2YXIgeSA9IHRvcCA/IHJlY3QudG9wIDogcmVjdC5ib3R0b207XG4gIHJldHVybiB7dG9wOiB5LCBib3R0b206IHksIGxlZnQ6IHJlY3QubGVmdCwgcmlnaHQ6IHJlY3QucmlnaHR9XG59XG5cbmZ1bmN0aW9uIHdpdGhGbHVzaGVkU3RhdGUodmlldywgc3RhdGUsIGYpIHtcbiAgdmFyIHZpZXdTdGF0ZSA9IHZpZXcuc3RhdGUsIGFjdGl2ZSA9IHZpZXcucm9vdC5hY3RpdmVFbGVtZW50O1xuICBpZiAodmlld1N0YXRlICE9IHN0YXRlKSB7IHZpZXcudXBkYXRlU3RhdGUoc3RhdGUpOyB9XG4gIGlmIChhY3RpdmUgIT0gdmlldy5kb20pIHsgdmlldy5mb2N1cygpOyB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIGYoKVxuICB9IGZpbmFsbHkge1xuICAgIGlmICh2aWV3U3RhdGUgIT0gc3RhdGUpIHsgdmlldy51cGRhdGVTdGF0ZSh2aWV3U3RhdGUpOyB9XG4gICAgaWYgKGFjdGl2ZSAhPSB2aWV3LmRvbSAmJiBhY3RpdmUpIHsgYWN0aXZlLmZvY3VzKCk7IH1cbiAgfVxufVxuXG4vLyA6IChFZGl0b3JWaWV3LCBudW1iZXIsIG51bWJlcilcbi8vIFdoZXRoZXIgdmVydGljYWwgcG9zaXRpb24gbW90aW9uIGluIGEgZ2l2ZW4gZGlyZWN0aW9uXG4vLyBmcm9tIGEgcG9zaXRpb24gd291bGQgbGVhdmUgYSB0ZXh0IGJsb2NrLlxuZnVuY3Rpb24gZW5kT2ZUZXh0YmxvY2tWZXJ0aWNhbCh2aWV3LCBzdGF0ZSwgZGlyKSB7XG4gIHZhciBzZWwgPSBzdGF0ZS5zZWxlY3Rpb247XG4gIHZhciAkcG9zID0gZGlyID09IFwidXBcIiA/IHNlbC4kZnJvbSA6IHNlbC4kdG87XG4gIHJldHVybiB3aXRoRmx1c2hlZFN0YXRlKHZpZXcsIHN0YXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlZiA9IHZpZXcuZG9jVmlldy5kb21Gcm9tUG9zKCRwb3MucG9zLCBkaXIgPT0gXCJ1cFwiID8gLTEgOiAxKTtcbiAgICB2YXIgZG9tID0gcmVmLm5vZGU7XG4gICAgZm9yICg7Oykge1xuICAgICAgdmFyIG5lYXJlc3QgPSB2aWV3LmRvY1ZpZXcubmVhcmVzdERlc2MoZG9tLCB0cnVlKTtcbiAgICAgIGlmICghbmVhcmVzdCkgeyBicmVhayB9XG4gICAgICBpZiAobmVhcmVzdC5ub2RlLmlzQmxvY2spIHsgZG9tID0gbmVhcmVzdC5kb207IGJyZWFrIH1cbiAgICAgIGRvbSA9IG5lYXJlc3QuZG9tLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHZhciBjb29yZHMgPSBjb29yZHNBdFBvcyh2aWV3LCAkcG9zLnBvcywgMSk7XG4gICAgZm9yICh2YXIgY2hpbGQgPSBkb20uZmlyc3RDaGlsZDsgY2hpbGQ7IGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmcpIHtcbiAgICAgIHZhciBib3hlcyA9ICh2b2lkIDApO1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09IDEpIHsgYm94ZXMgPSBjaGlsZC5nZXRDbGllbnRSZWN0cygpOyB9XG4gICAgICBlbHNlIGlmIChjaGlsZC5ub2RlVHlwZSA9PSAzKSB7IGJveGVzID0gdGV4dFJhbmdlKGNoaWxkLCAwLCBjaGlsZC5ub2RlVmFsdWUubGVuZ3RoKS5nZXRDbGllbnRSZWN0cygpOyB9XG4gICAgICBlbHNlIHsgY29udGludWUgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYm94ID0gYm94ZXNbaV07XG4gICAgICAgIGlmIChib3guYm90dG9tID4gYm94LnRvcCAmJiAoZGlyID09IFwidXBcIiA/IGJveC5ib3R0b20gPCBjb29yZHMudG9wICsgMSA6IGJveC50b3AgPiBjb29yZHMuYm90dG9tIC0gMSkpXG4gICAgICAgICAgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9KVxufVxuXG52YXIgbWF5YmVSVEwgPSAvW1xcdTA1OTAtXFx1MDhhY10vO1xuXG5mdW5jdGlvbiBlbmRPZlRleHRibG9ja0hvcml6b250YWwodmlldywgc3RhdGUsIGRpcikge1xuICB2YXIgcmVmID0gc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgJGhlYWQgPSByZWYuJGhlYWQ7XG4gIGlmICghJGhlYWQucGFyZW50LmlzVGV4dGJsb2NrKSB7IHJldHVybiBmYWxzZSB9XG4gIHZhciBvZmZzZXQgPSAkaGVhZC5wYXJlbnRPZmZzZXQsIGF0U3RhcnQgPSAhb2Zmc2V0LCBhdEVuZCA9IG9mZnNldCA9PSAkaGVhZC5wYXJlbnQuY29udGVudC5zaXplO1xuICB2YXIgc2VsID0gZ2V0U2VsZWN0aW9uKCk7XG4gIC8vIElmIHRoZSB0ZXh0YmxvY2sgaXMgYWxsIExUUiwgb3IgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0XG4gIC8vIFNlbGVjdGlvbi5tb2RpZnkgKEVkZ2UpLCBmYWxsIGJhY2sgdG8gYSBwcmltaXRpdmUgYXBwcm9hY2hcbiAgaWYgKCFtYXliZVJUTC50ZXN0KCRoZWFkLnBhcmVudC50ZXh0Q29udGVudCkgfHwgIXNlbC5tb2RpZnkpXG4gICAgeyByZXR1cm4gZGlyID09IFwibGVmdFwiIHx8IGRpciA9PSBcImJhY2t3YXJkXCIgPyBhdFN0YXJ0IDogYXRFbmQgfVxuXG4gIHJldHVybiB3aXRoRmx1c2hlZFN0YXRlKHZpZXcsIHN0YXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVGhpcyBpcyBhIGh1Z2UgaGFjaywgYnV0IGFwcGVhcnMgdG8gYmUgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gY3VycmVudGx5IGRvOiB1c2UgYFNlbGVjdGlvbi5tb2RpZnlgIHRvIG1vdmUgdGhlIHNlbGVjdGlvbiBieVxuICAgIC8vIG9uZSBjaGFyYWN0ZXIsIGFuZCBzZWUgaWYgdGhhdCBtb3ZlcyB0aGUgY3Vyc29yIG91dCBvZiB0aGVcbiAgICAvLyB0ZXh0YmxvY2sgKG9yIGRvZXNuJ3QgbW92ZSBpdCBhdCBhbGwsIHdoZW4gYXQgdGhlIHN0YXJ0L2VuZCBvZlxuICAgIC8vIHRoZSBkb2N1bWVudCkuXG4gICAgdmFyIG9sZFJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCksIG9sZE5vZGUgPSBzZWwuZm9jdXNOb2RlLCBvbGRPZmYgPSBzZWwuZm9jdXNPZmZzZXQ7XG4gICAgdmFyIG9sZEJpZGlMZXZlbCA9IHNlbC5jYXJldEJpZGlMZXZlbDsgLy8gT25seSBmb3IgRmlyZWZveFxuICAgIHNlbC5tb2RpZnkoXCJtb3ZlXCIsIGRpciwgXCJjaGFyYWN0ZXJcIik7XG4gICAgdmFyIHBhcmVudERPTSA9ICRoZWFkLmRlcHRoID8gdmlldy5kb2NWaWV3LmRvbUFmdGVyUG9zKCRoZWFkLmJlZm9yZSgpKSA6IHZpZXcuZG9tO1xuICAgIHZhciByZXN1bHQgPSAhcGFyZW50RE9NLmNvbnRhaW5zKHNlbC5mb2N1c05vZGUubm9kZVR5cGUgPT0gMSA/IHNlbC5mb2N1c05vZGUgOiBzZWwuZm9jdXNOb2RlLnBhcmVudE5vZGUpIHx8XG4gICAgICAgIChvbGROb2RlID09IHNlbC5mb2N1c05vZGUgJiYgb2xkT2ZmID09IHNlbC5mb2N1c09mZnNldCk7XG4gICAgLy8gUmVzdG9yZSB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIHNlbC5hZGRSYW5nZShvbGRSYW5nZSk7XG4gICAgaWYgKG9sZEJpZGlMZXZlbCAhPSBudWxsKSB7IHNlbC5jYXJldEJpZGlMZXZlbCA9IG9sZEJpZGlMZXZlbDsgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcbn1cblxudmFyIGNhY2hlZFN0YXRlID0gbnVsbCwgY2FjaGVkRGlyID0gbnVsbCwgY2FjaGVkUmVzdWx0ID0gZmFsc2U7XG5mdW5jdGlvbiBlbmRPZlRleHRibG9jayh2aWV3LCBzdGF0ZSwgZGlyKSB7XG4gIGlmIChjYWNoZWRTdGF0ZSA9PSBzdGF0ZSAmJiBjYWNoZWREaXIgPT0gZGlyKSB7IHJldHVybiBjYWNoZWRSZXN1bHQgfVxuICBjYWNoZWRTdGF0ZSA9IHN0YXRlOyBjYWNoZWREaXIgPSBkaXI7XG4gIHJldHVybiBjYWNoZWRSZXN1bHQgPSBkaXIgPT0gXCJ1cFwiIHx8IGRpciA9PSBcImRvd25cIlxuICAgID8gZW5kT2ZUZXh0YmxvY2tWZXJ0aWNhbCh2aWV3LCBzdGF0ZSwgZGlyKVxuICAgIDogZW5kT2ZUZXh0YmxvY2tIb3Jpem9udGFsKHZpZXcsIHN0YXRlLCBkaXIpXG59XG5cbi8vIE5vZGVWaWV3OjogaW50ZXJmYWNlXG4vL1xuLy8gQnkgZGVmYXVsdCwgZG9jdW1lbnQgbm9kZXMgYXJlIHJlbmRlcmVkIHVzaW5nIHRoZSByZXN1bHQgb2YgdGhlXG4vLyBbYHRvRE9NYF0oI21vZGVsLk5vZGVTcGVjLnRvRE9NKSBtZXRob2Qgb2YgdGhlaXIgc3BlYywgYW5kIG1hbmFnZWRcbi8vIGVudGlyZWx5IGJ5IHRoZSBlZGl0b3IuIEZvciBzb21lIHVzZSBjYXNlcywgc3VjaCBhcyBlbWJlZGRlZFxuLy8gbm9kZS1zcGVjaWZpYyBlZGl0aW5nIGludGVyZmFjZXMsIHlvdSB3YW50IG1vcmUgY29udHJvbCBvdmVyXG4vLyB0aGUgYmVoYXZpb3Igb2YgYSBub2RlJ3MgaW4tZWRpdG9yIHJlcHJlc2VudGF0aW9uLCBhbmQgbmVlZCB0b1xuLy8gW2RlZmluZV0oI3ZpZXcuRWRpdG9yUHJvcHMubm9kZVZpZXdzKSBhIGN1c3RvbSBub2RlIHZpZXcuXG4vL1xuLy8gTWFyayB2aWV3cyBvbmx5IHN1cHBvcnQgYGRvbWAgYW5kIGBjb250ZW50RE9NYCwgYW5kIGRvbid0IHN1cHBvcnRcbi8vIGFueSBvZiB0aGUgbm9kZSB2aWV3IG1ldGhvZHMuXG4vL1xuLy8gT2JqZWN0cyByZXR1cm5lZCBhcyBub2RlIHZpZXdzIG11c3QgY29uZm9ybSB0byB0aGlzIGludGVyZmFjZS5cbi8vXG4vLyAgIGRvbTo6ID9kb20uTm9kZVxuLy8gICBUaGUgb3V0ZXIgRE9NIG5vZGUgdGhhdCByZXByZXNlbnRzIHRoZSBkb2N1bWVudCBub2RlLiBXaGVuIG5vdFxuLy8gICBnaXZlbiwgdGhlIGRlZmF1bHQgc3RyYXRlZ3kgaXMgdXNlZCB0byBjcmVhdGUgYSBET00gbm9kZS5cbi8vXG4vLyAgIGNvbnRlbnRET006OiA/ZG9tLk5vZGVcbi8vICAgVGhlIERPTSBub2RlIHRoYXQgc2hvdWxkIGhvbGQgdGhlIG5vZGUncyBjb250ZW50LiBPbmx5IG1lYW5pbmdmdWxcbi8vICAgaWYgdGhlIG5vZGUgdmlldyBhbHNvIGRlZmluZXMgYSBgZG9tYCBwcm9wZXJ0eSBhbmQgaWYgaXRzIG5vZGVcbi8vICAgdHlwZSBpcyBub3QgYSBsZWFmIG5vZGUgdHlwZS4gV2hlbiB0aGlzIGlzIHByZXNlbnQsIFByb3NlTWlycm9yXG4vLyAgIHdpbGwgdGFrZSBjYXJlIG9mIHJlbmRlcmluZyB0aGUgbm9kZSdzIGNoaWxkcmVuIGludG8gaXQuIFdoZW4gaXRcbi8vICAgaXMgbm90IHByZXNlbnQsIHRoZSBub2RlIHZpZXcgaXRzZWxmIGlzIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmdcbi8vICAgKG9yIGRlY2lkaW5nIG5vdCB0byByZW5kZXIpIGl0cyBjaGlsZCBub2Rlcy5cbi8vXG4vLyAgIHVwZGF0ZTo6ID8obm9kZTogTm9kZSwgZGVjb3JhdGlvbnM6IFtEZWNvcmF0aW9uXSwgaW5uZXJEZWNvcmF0aW9uczogRGVjb3JhdGlvblNvdXJjZSkg4oaSIGJvb2xcbi8vICAgV2hlbiBnaXZlbiwgdGhpcyB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIHVwZGF0aW5nIGl0c2VsZi5cbi8vICAgSXQgd2lsbCBiZSBnaXZlbiBhIG5vZGUgKHBvc3NpYmx5IG9mIGEgZGlmZmVyZW50IHR5cGUpLCBhbiBhcnJheVxuLy8gICBvZiBhY3RpdmUgZGVjb3JhdGlvbnMgYXJvdW5kIHRoZSBub2RlICh3aGljaCBhcmUgYXV0b21hdGljYWxseVxuLy8gICBkcmF3biwgYW5kIHRoZSBub2RlIHZpZXcgbWF5IGlnbm9yZSBpZiBpdCBpc24ndCBpbnRlcmVzdGVkIGluXG4vLyAgIHRoZW0pLCBhbmQgYSBbZGVjb3JhdGlvbiBzb3VyY2VdKCN2aWV3LkRlY29yYXRpb25Tb3VyY2UpIHRoYXRcbi8vICAgcmVwcmVzZW50cyBhbnkgZGVjb3JhdGlvbnMgdGhhdCBhcHBseSB0byB0aGUgY29udGVudCBvZiB0aGUgbm9kZVxuLy8gICAod2hpY2ggYWdhaW4gbWF5IGJlIGlnbm9yZWQpLiBJdCBzaG91bGQgcmV0dXJuIHRydWUgaWYgaXQgd2FzXG4vLyAgIGFibGUgdG8gdXBkYXRlIHRvIHRoYXQgbm9kZSwgYW5kIGZhbHNlIG90aGVyd2lzZS4gSWYgdGhlIG5vZGVcbi8vICAgdmlldyBoYXMgYSBgY29udGVudERPTWAgcHJvcGVydHkgKG9yIG5vIGBkb21gIHByb3BlcnR5KSwgdXBkYXRpbmdcbi8vICAgaXRzIGNoaWxkIG5vZGVzIHdpbGwgYmUgaGFuZGxlZCBieSBQcm9zZU1pcnJvci5cbi8vXG4vLyAgIHNlbGVjdE5vZGU6OiA/KClcbi8vICAgQ2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIHdheSB0aGUgbm9kZSdzIHNlbGVjdGVkIHN0YXR1cyAoYXMgYVxuLy8gICBub2RlIHNlbGVjdGlvbikgaXMgZGlzcGxheWVkLlxuLy9cbi8vICAgZGVzZWxlY3ROb2RlOjogPygpXG4vLyAgIFdoZW4gZGVmaW5pbmcgYSBgc2VsZWN0Tm9kZWAgbWV0aG9kLCB5b3Ugc2hvdWxkIGFsc28gcHJvdmlkZSBhXG4vLyAgIGBkZXNlbGVjdE5vZGVgIG1ldGhvZCB0byByZW1vdmUgdGhlIGVmZmVjdCBhZ2Fpbi5cbi8vXG4vLyAgIHNldFNlbGVjdGlvbjo6ID8oYW5jaG9yOiBudW1iZXIsIGhlYWQ6IG51bWJlciwgcm9vdDogZG9tLkRvY3VtZW50KVxuLy8gICBUaGlzIHdpbGwgYmUgY2FsbGVkIHRvIGhhbmRsZSBzZXR0aW5nIHRoZSBzZWxlY3Rpb24gaW5zaWRlIHRoZVxuLy8gICBub2RlLiBUaGUgYGFuY2hvcmAgYW5kIGBoZWFkYCBwb3NpdGlvbnMgYXJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydFxuLy8gICBvZiB0aGUgbm9kZS4gQnkgZGVmYXVsdCwgYSBET00gc2VsZWN0aW9uIHdpbGwgYmUgY3JlYXRlZCBiZXR3ZWVuXG4vLyAgIHRoZSBET00gcG9zaXRpb25zIGNvcnJlc3BvbmRpbmcgdG8gdGhvc2UgcG9zaXRpb25zLCBidXQgaWYgeW91XG4vLyAgIG92ZXJyaWRlIGl0IHlvdSBjYW4gZG8gc29tZXRoaW5nIGVsc2UuXG4vL1xuLy8gICBzdG9wRXZlbnQ6OiA/KGV2ZW50OiBkb20uRXZlbnQpIOKGkiBib29sXG4vLyAgIENhbiBiZSB1c2VkIHRvIHByZXZlbnQgdGhlIGVkaXRvciB2aWV3IGZyb20gdHJ5aW5nIHRvIGhhbmRsZSBzb21lXG4vLyAgIG9yIGFsbCBET00gZXZlbnRzIHRoYXQgYnViYmxlIHVwIGZyb20gdGhlIG5vZGUgdmlldy4gRXZlbnRzIGZvclxuLy8gICB3aGljaCB0aGlzIHJldHVybnMgdHJ1ZSBhcmUgbm90IGhhbmRsZWQgYnkgdGhlIGVkaXRvci5cbi8vXG4vLyAgIGlnbm9yZU11dGF0aW9uOjogPyhkb20uTXV0YXRpb25SZWNvcmQpIOKGkiBib29sXG4vLyAgIENhbGxlZCB3aGVuIGEgRE9NXG4vLyAgIFttdXRhdGlvbl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL011dGF0aW9uT2JzZXJ2ZXIpXG4vLyAgIG9yIGEgc2VsZWN0aW9uIGNoYW5nZSBoYXBwZW5zIHdpdGhpbiB0aGUgdmlldy4gV2hlbiB0aGUgY2hhbmdlIGlzXG4vLyAgIGEgc2VsZWN0aW9uIGNoYW5nZSwgdGhlIHJlY29yZCB3aWxsIGhhdmUgYSBgdHlwZWAgcHJvcGVydHkgb2Zcbi8vICAgYFwic2VsZWN0aW9uXCJgICh3aGljaCBkb2Vzbid0IG9jY3VyIGZvciBuYXRpdmUgbXV0YXRpb24gcmVjb3JkcykuXG4vLyAgIFJldHVybiBmYWxzZSBpZiB0aGUgZWRpdG9yIHNob3VsZCByZS1yZWFkIHRoZSBzZWxlY3Rpb24gb3Jcbi8vICAgcmUtcGFyc2UgdGhlIHJhbmdlIGFyb3VuZCB0aGUgbXV0YXRpb24sIHRydWUgaWYgaXQgY2FuIHNhZmVseSBiZVxuLy8gICBpZ25vcmVkLlxuLy9cbi8vICAgZGVzdHJveTo6ID8oKVxuLy8gICBDYWxsZWQgd2hlbiB0aGUgbm9kZSB2aWV3IGlzIHJlbW92ZWQgZnJvbSB0aGUgZWRpdG9yIG9yIHRoZSB3aG9sZVxuLy8gICBlZGl0b3IgaXMgZGVzdHJveWVkLiAoTm90IGF2YWlsYWJsZSBmb3IgbWFya3MuKVxuXG4vLyBWaWV3IGRlc2NyaXB0aW9ucyBhcmUgZGF0YSBzdHJ1Y3R1cmVzIHRoYXQgZGVzY3JpYmUgdGhlIERPTSB0aGF0IGlzXG4vLyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWRpdG9yJ3MgY29udGVudC4gVGhleSBhcmUgdXNlZCBmb3I6XG4vL1xuLy8gLSBJbmNyZW1lbnRhbCByZWRyYXdpbmcgd2hlbiB0aGUgZG9jdW1lbnQgY2hhbmdlc1xuLy9cbi8vIC0gRmlndXJpbmcgb3V0IHdoYXQgcGFydCBvZiB0aGUgZG9jdW1lbnQgYSBnaXZlbiBET00gcG9zaXRpb25cbi8vICAgY29ycmVzcG9uZHMgdG9cbi8vXG4vLyAtIFdpcmluZyBpbiBjdXN0b20gaW1wbGVtZW50YXRpb25zIG9mIHRoZSBlZGl0aW5nIGludGVyZmFjZSBmb3IgYVxuLy8gICBnaXZlbiBub2RlXG4vL1xuLy8gVGhleSBmb3JtIGEgZG91Ymx5LWxpbmtlZCBtdXRhYmxlIHRyZWUsIHN0YXJ0aW5nIGF0IGB2aWV3LmRvY1ZpZXdgLlxuXG52YXIgTk9UX0RJUlRZID0gMCwgQ0hJTERfRElSVFkgPSAxLCBDT05URU5UX0RJUlRZID0gMiwgTk9ERV9ESVJUWSA9IDM7XG5cbi8vIFN1cGVyY2xhc3MgZm9yIHRoZSB2YXJpb3VzIGtpbmRzIG9mIGRlc2NyaXB0aW9ucy4gRGVmaW5lcyB0aGVpclxuLy8gYmFzaWMgc3RydWN0dXJlIGFuZCBzaGFyZWQgbWV0aG9kcy5cbnZhciBWaWV3RGVzYyA9IGZ1bmN0aW9uIFZpZXdEZXNjKHBhcmVudCwgY2hpbGRyZW4sIGRvbSwgY29udGVudERPTSkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLmRvbSA9IGRvbTtcbiAgLy8gQW4gZXhwYW5kbyBwcm9wZXJ0eSBvbiB0aGUgRE9NIG5vZGUgcHJvdmlkZXMgYSBsaW5rIGJhY2sgdG8gaXRzXG4gIC8vIGRlc2NyaXB0aW9uLlxuICBkb20ucG1WaWV3RGVzYyA9IHRoaXM7XG4gIC8vIFRoaXMgaXMgdGhlIG5vZGUgdGhhdCBob2xkcyB0aGUgY2hpbGQgdmlld3MuIEl0IG1heSBiZSBudWxsIGZvclxuICAvLyBkZXNjcyB0aGF0IGRvbid0IGhhdmUgY2hpbGRyZW4uXG4gIHRoaXMuY29udGVudERPTSA9IGNvbnRlbnRET007XG4gIHRoaXMuZGlydHkgPSBOT1RfRElSVFk7XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBiZWZvcmVQb3NpdGlvbjogeyBjb25maWd1cmFibGU6IHRydWUgfSxzaXplOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LGJvcmRlcjogeyBjb25maWd1cmFibGU6IHRydWUgfSxwb3NCZWZvcmU6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0scG9zQXRTdGFydDogeyBjb25maWd1cmFibGU6IHRydWUgfSxwb3NBZnRlcjogeyBjb25maWd1cmFibGU6IHRydWUgfSxwb3NBdEVuZDogeyBjb25maWd1cmFibGU6IHRydWUgfSxjb250ZW50TG9zdDogeyBjb25maWd1cmFibGU6IHRydWUgfSxkb21BdG9tOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbi8vIFVzZWQgdG8gY2hlY2sgd2hldGhlciBhIGdpdmVuIGRlc2NyaXB0aW9uIGNvcnJlc3BvbmRzIHRvIGFcbi8vIHdpZGdldC9tYXJrL25vZGUuXG5WaWV3RGVzYy5wcm90b3R5cGUubWF0Y2hlc1dpZGdldCA9IGZ1bmN0aW9uIG1hdGNoZXNXaWRnZXQgKCkgeyByZXR1cm4gZmFsc2UgfTtcblZpZXdEZXNjLnByb3RvdHlwZS5tYXRjaGVzTWFyayA9IGZ1bmN0aW9uIG1hdGNoZXNNYXJrICgpIHsgcmV0dXJuIGZhbHNlIH07XG5WaWV3RGVzYy5wcm90b3R5cGUubWF0Y2hlc05vZGUgPSBmdW5jdGlvbiBtYXRjaGVzTm9kZSAoKSB7IHJldHVybiBmYWxzZSB9O1xuVmlld0Rlc2MucHJvdG90eXBlLm1hdGNoZXNIYWNrID0gZnVuY3Rpb24gbWF0Y2hlc0hhY2sgKCkgeyByZXR1cm4gZmFsc2UgfTtcblxucHJvdG90eXBlQWNjZXNzb3JzLmJlZm9yZVBvc2l0aW9uLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlIH07XG5cbi8vIDogKCkg4oaSID9QYXJzZVJ1bGVcbi8vIFdoZW4gcGFyc2luZyBpbi1lZGl0b3IgY29udGVudCAoaW4gZG9tY2hhbmdlLmpzKSwgd2UgYWxsb3dcbi8vIGRlc2NyaXB0aW9ucyB0byBkZXRlcm1pbmUgdGhlIHBhcnNlIHJ1bGVzIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG9cbi8vIHBhcnNlIHRoZW0uXG5WaWV3RGVzYy5wcm90b3R5cGUucGFyc2VSdWxlID0gZnVuY3Rpb24gcGFyc2VSdWxlICgpIHsgcmV0dXJuIG51bGwgfTtcblxuLy8gOiAoZG9tLkV2ZW50KSDihpIgYm9vbFxuLy8gVXNlZCBieSB0aGUgZWRpdG9yJ3MgZXZlbnQgaGFuZGxlciB0byBpZ25vcmUgZXZlbnRzIHRoYXQgY29tZVxuLy8gZnJvbSBjZXJ0YWluIGRlc2NzLlxuVmlld0Rlc2MucHJvdG90eXBlLnN0b3BFdmVudCA9IGZ1bmN0aW9uIHN0b3BFdmVudCAoKSB7IHJldHVybiBmYWxzZSB9O1xuXG4vLyBUaGUgc2l6ZSBvZiB0aGUgY29udGVudCByZXByZXNlbnRlZCBieSB0aGlzIGRlc2MuXG5wcm90b3R5cGVBY2Nlc3NvcnMuc2l6ZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzaXplID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7IHNpemUgKz0gdGhpcy5jaGlsZHJlbltpXS5zaXplOyB9XG4gIHJldHVybiBzaXplXG59O1xuXG4vLyBGb3IgYmxvY2sgbm9kZXMsIHRoaXMgcmVwcmVzZW50cyB0aGUgc3BhY2UgdGFrZW4gdXAgYnkgdGhlaXJcbi8vIHN0YXJ0L2VuZCB0b2tlbnMuXG5wcm90b3R5cGVBY2Nlc3NvcnMuYm9yZGVyLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuVmlld0Rlc2MucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICBpZiAodGhpcy5kb20ucG1WaWV3RGVzYyA9PSB0aGlzKSB7IHRoaXMuZG9tLnBtVmlld0Rlc2MgPSBudWxsOyB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICB7IHRoaXMuY2hpbGRyZW5baV0uZGVzdHJveSgpOyB9XG59O1xuXG5WaWV3RGVzYy5wcm90b3R5cGUucG9zQmVmb3JlQ2hpbGQgPSBmdW5jdGlvbiBwb3NCZWZvcmVDaGlsZCAoY2hpbGQpIHtcbiAgZm9yICh2YXIgaSA9IDAsIHBvcyA9IHRoaXMucG9zQXRTdGFydDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY3VyID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICBpZiAoY3VyID09IGNoaWxkKSB7IHJldHVybiBwb3MgfVxuICAgIHBvcyArPSBjdXIuc2l6ZTtcbiAgfVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnBvc0JlZm9yZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBhcmVudC5wb3NCZWZvcmVDaGlsZCh0aGlzKVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnBvc0F0U3RhcnQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5wb3NCZWZvcmVDaGlsZCh0aGlzKSArIHRoaXMuYm9yZGVyIDogMFxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnBvc0FmdGVyLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucG9zQmVmb3JlICsgdGhpcy5zaXplXG59O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMucG9zQXRFbmQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wb3NBdFN0YXJ0ICsgdGhpcy5zaXplIC0gMiAqIHRoaXMuYm9yZGVyXG59O1xuXG4vLyA6IChkb20uTm9kZSwgbnVtYmVyLCA/bnVtYmVyKSDihpIgbnVtYmVyXG5WaWV3RGVzYy5wcm90b3R5cGUubG9jYWxQb3NGcm9tRE9NID0gZnVuY3Rpb24gbG9jYWxQb3NGcm9tRE9NIChkb20sIG9mZnNldCwgYmlhcykge1xuICAvLyBJZiB0aGUgRE9NIHBvc2l0aW9uIGlzIGluIHRoZSBjb250ZW50LCB1c2UgdGhlIGNoaWxkIGRlc2MgYWZ0ZXJcbiAgLy8gaXQgdG8gZmlndXJlIG91dCBhIHBvc2l0aW9uLlxuICBpZiAodGhpcy5jb250ZW50RE9NICYmIHRoaXMuY29udGVudERPTS5jb250YWlucyhkb20ubm9kZVR5cGUgPT0gMSA/IGRvbSA6IGRvbS5wYXJlbnROb2RlKSkge1xuICAgIGlmIChiaWFzIDwgMCkge1xuICAgICAgdmFyIGRvbUJlZm9yZSwgZGVzYztcbiAgICAgIGlmIChkb20gPT0gdGhpcy5jb250ZW50RE9NKSB7XG4gICAgICAgIGRvbUJlZm9yZSA9IGRvbS5jaGlsZE5vZGVzW29mZnNldCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGRvbS5wYXJlbnROb2RlICE9IHRoaXMuY29udGVudERPTSkgeyBkb20gPSBkb20ucGFyZW50Tm9kZTsgfVxuICAgICAgICBkb21CZWZvcmUgPSBkb20ucHJldmlvdXNTaWJsaW5nO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGRvbUJlZm9yZSAmJiAhKChkZXNjID0gZG9tQmVmb3JlLnBtVmlld0Rlc2MpICYmIGRlc2MucGFyZW50ID09IHRoaXMpKSB7IGRvbUJlZm9yZSA9IGRvbUJlZm9yZS5wcmV2aW91c1NpYmxpbmc7IH1cbiAgICAgIHJldHVybiBkb21CZWZvcmUgPyB0aGlzLnBvc0JlZm9yZUNoaWxkKGRlc2MpICsgZGVzYy5zaXplIDogdGhpcy5wb3NBdFN0YXJ0XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkb21BZnRlciwgZGVzYyQxO1xuICAgICAgaWYgKGRvbSA9PSB0aGlzLmNvbnRlbnRET00pIHtcbiAgICAgICAgZG9tQWZ0ZXIgPSBkb20uY2hpbGROb2Rlc1tvZmZzZXRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGRvbS5wYXJlbnROb2RlICE9IHRoaXMuY29udGVudERPTSkgeyBkb20gPSBkb20ucGFyZW50Tm9kZTsgfVxuICAgICAgICBkb21BZnRlciA9IGRvbS5uZXh0U2libGluZztcbiAgICAgIH1cbiAgICAgIHdoaWxlIChkb21BZnRlciAmJiAhKChkZXNjJDEgPSBkb21BZnRlci5wbVZpZXdEZXNjKSAmJiBkZXNjJDEucGFyZW50ID09IHRoaXMpKSB7IGRvbUFmdGVyID0gZG9tQWZ0ZXIubmV4dFNpYmxpbmc7IH1cbiAgICAgIHJldHVybiBkb21BZnRlciA/IHRoaXMucG9zQmVmb3JlQ2hpbGQoZGVzYyQxKSA6IHRoaXMucG9zQXRFbmRcbiAgICB9XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCB1c2UgdmFyaW91cyBoZXVyaXN0aWNzLCBmYWxsaW5nIGJhY2sgb24gdGhlIGJpYXNcbiAgLy8gcGFyYW1ldGVyLCB0byBkZXRlcm1pbmUgd2hldGhlciB0byByZXR1cm4gdGhlIHBvc2l0aW9uIGF0IHRoZVxuICAvLyBzdGFydCBvciBhdCB0aGUgZW5kIG9mIHRoaXMgdmlldyBkZXNjLlxuICB2YXIgYXRFbmQ7XG4gIGlmIChkb20gPT0gdGhpcy5kb20gJiYgdGhpcy5jb250ZW50RE9NKSB7XG4gICAgYXRFbmQgPSBvZmZzZXQgPiBkb21JbmRleCh0aGlzLmNvbnRlbnRET00pO1xuICB9IGVsc2UgaWYgKHRoaXMuY29udGVudERPTSAmJiB0aGlzLmNvbnRlbnRET00gIT0gdGhpcy5kb20gJiYgdGhpcy5kb20uY29udGFpbnModGhpcy5jb250ZW50RE9NKSkge1xuICAgIGF0RW5kID0gZG9tLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHRoaXMuY29udGVudERPTSkgJiAyO1xuICB9IGVsc2UgaWYgKHRoaXMuZG9tLmZpcnN0Q2hpbGQpIHtcbiAgICBpZiAob2Zmc2V0ID09IDApIHsgZm9yICh2YXIgc2VhcmNoID0gZG9tOzsgc2VhcmNoID0gc2VhcmNoLnBhcmVudE5vZGUpIHtcbiAgICAgIGlmIChzZWFyY2ggPT0gdGhpcy5kb20pIHsgYXRFbmQgPSBmYWxzZTsgYnJlYWsgfVxuICAgICAgaWYgKHNlYXJjaC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQgIT0gc2VhcmNoKSB7IGJyZWFrIH1cbiAgICB9IH1cbiAgICBpZiAoYXRFbmQgPT0gbnVsbCAmJiBvZmZzZXQgPT0gZG9tLmNoaWxkTm9kZXMubGVuZ3RoKSB7IGZvciAodmFyIHNlYXJjaCQxID0gZG9tOzsgc2VhcmNoJDEgPSBzZWFyY2gkMS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAoc2VhcmNoJDEgPT0gdGhpcy5kb20pIHsgYXRFbmQgPSB0cnVlOyBicmVhayB9XG4gICAgICBpZiAoc2VhcmNoJDEucGFyZW50Tm9kZS5sYXN0Q2hpbGQgIT0gc2VhcmNoJDEpIHsgYnJlYWsgfVxuICAgIH0gfVxuICB9XG4gIHJldHVybiAoYXRFbmQgPT0gbnVsbCA/IGJpYXMgPiAwIDogYXRFbmQpID8gdGhpcy5wb3NBdEVuZCA6IHRoaXMucG9zQXRTdGFydFxufTtcblxuLy8gU2NhbiB1cCB0aGUgZG9tIGZpbmRpbmcgdGhlIGZpcnN0IGRlc2MgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2Zcbi8vIHRoaXMgb25lLlxuVmlld0Rlc2MucHJvdG90eXBlLm5lYXJlc3REZXNjID0gZnVuY3Rpb24gbmVhcmVzdERlc2MgKGRvbSwgb25seU5vZGVzKSB7XG4gIGZvciAodmFyIGZpcnN0ID0gdHJ1ZSwgY3VyID0gZG9tOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlKSB7XG4gICAgdmFyIGRlc2MgPSB0aGlzLmdldERlc2MoY3VyKTtcbiAgICBpZiAoZGVzYyAmJiAoIW9ubHlOb2RlcyB8fCBkZXNjLm5vZGUpKSB7XG4gICAgICAvLyBJZiBkb20gaXMgb3V0c2lkZSBvZiB0aGlzIGRlc2MncyBub2RlRE9NLCBkb24ndCBjb3VudCBpdC5cbiAgICAgIGlmIChmaXJzdCAmJiBkZXNjLm5vZGVET00gJiZcbiAgICAgICAgICAhKGRlc2Mubm9kZURPTS5ub2RlVHlwZSA9PSAxID8gZGVzYy5ub2RlRE9NLmNvbnRhaW5zKGRvbS5ub2RlVHlwZSA9PSAxID8gZG9tIDogZG9tLnBhcmVudE5vZGUpIDogZGVzYy5ub2RlRE9NID09IGRvbSkpXG4gICAgICAgIHsgZmlyc3QgPSBmYWxzZTsgfVxuICAgICAgZWxzZVxuICAgICAgICB7IHJldHVybiBkZXNjIH1cbiAgICB9XG4gIH1cbn07XG5cblZpZXdEZXNjLnByb3RvdHlwZS5nZXREZXNjID0gZnVuY3Rpb24gZ2V0RGVzYyAoZG9tKSB7XG4gIHZhciBkZXNjID0gZG9tLnBtVmlld0Rlc2M7XG4gIGZvciAodmFyIGN1ciA9IGRlc2M7IGN1cjsgY3VyID0gY3VyLnBhcmVudCkgeyBpZiAoY3VyID09IHRoaXMpIHsgcmV0dXJuIGRlc2MgfSB9XG59O1xuXG5WaWV3RGVzYy5wcm90b3R5cGUucG9zRnJvbURPTSA9IGZ1bmN0aW9uIHBvc0Zyb21ET00gKGRvbSwgb2Zmc2V0LCBiaWFzKSB7XG4gIGZvciAodmFyIHNjYW4gPSBkb207IHNjYW47IHNjYW4gPSBzY2FuLnBhcmVudE5vZGUpIHtcbiAgICB2YXIgZGVzYyA9IHRoaXMuZ2V0RGVzYyhzY2FuKTtcbiAgICBpZiAoZGVzYykgeyByZXR1cm4gZGVzYy5sb2NhbFBvc0Zyb21ET00oZG9tLCBvZmZzZXQsIGJpYXMpIH1cbiAgfVxuICByZXR1cm4gLTFcbn07XG5cbi8vIDogKG51bWJlcikg4oaSID9Ob2RlVmlld0Rlc2Ncbi8vIEZpbmQgdGhlIGRlc2MgZm9yIHRoZSBub2RlIGFmdGVyIHRoZSBnaXZlbiBwb3MsIGlmIGFueS4gKFdoZW4gYVxuLy8gcGFyZW50IG5vZGUgb3ZlcnJvZGUgcmVuZGVyaW5nLCB0aGVyZSBtaWdodCBub3QgYmUgb25lLilcblZpZXdEZXNjLnByb3RvdHlwZS5kZXNjQXQgPSBmdW5jdGlvbiBkZXNjQXQgKHBvcykge1xuICBmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldLCBlbmQgPSBvZmZzZXQgKyBjaGlsZC5zaXplO1xuICAgIGlmIChvZmZzZXQgPT0gcG9zICYmIGVuZCAhPSBvZmZzZXQpIHtcbiAgICAgIHdoaWxlICghY2hpbGQuYm9yZGVyICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCkgeyBjaGlsZCA9IGNoaWxkLmNoaWxkcmVuWzBdOyB9XG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgaWYgKHBvcyA8IGVuZCkgeyByZXR1cm4gY2hpbGQuZGVzY0F0KHBvcyAtIG9mZnNldCAtIGNoaWxkLmJvcmRlcikgfVxuICAgIG9mZnNldCA9IGVuZDtcbiAgfVxufTtcblxuLy8gOiAobnVtYmVyLCBudW1iZXIpIOKGkiB7bm9kZTogZG9tLk5vZGUsIG9mZnNldDogbnVtYmVyfVxuVmlld0Rlc2MucHJvdG90eXBlLmRvbUZyb21Qb3MgPSBmdW5jdGlvbiBkb21Gcm9tUG9zIChwb3MsIHNpZGUpIHtcbiAgaWYgKCF0aGlzLmNvbnRlbnRET00pIHsgcmV0dXJuIHtub2RlOiB0aGlzLmRvbSwgb2Zmc2V0OiAwfSB9XG4gIGZvciAodmFyIG9mZnNldCA9IDAsIGkgPSAwLCBmaXJzdCA9IHRydWU7OyBpKyssIGZpcnN0ID0gZmFsc2UpIHtcbiAgICAvLyBTa2lwIHJlbW92ZWQgb3IgYWx3YXlzLWJlZm9yZSBjaGlsZHJlblxuICAgIHdoaWxlIChpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGggJiYgKHRoaXMuY2hpbGRyZW5baV0uYmVmb3JlUG9zaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLmRvbS5wYXJlbnROb2RlICE9IHRoaXMuY29udGVudERPTSkpXG4gICAgICB7IG9mZnNldCArPSB0aGlzLmNoaWxkcmVuW2krK10uc2l6ZTsgfVxuICAgIHZhciBjaGlsZCA9IGkgPT0gdGhpcy5jaGlsZHJlbi5sZW5ndGggPyBudWxsIDogdGhpcy5jaGlsZHJlbltpXTtcbiAgICBpZiAob2Zmc2V0ID09IHBvcyAmJiAoc2lkZSA9PSAwIHx8ICFjaGlsZCB8fCAhY2hpbGQuc2l6ZSB8fCBjaGlsZC5ib3JkZXIgfHwgKHNpZGUgPCAwICYmIGZpcnN0KSkgfHxcbiAgICAgICAgY2hpbGQgJiYgY2hpbGQuZG9tQXRvbSAmJiBwb3MgPCBvZmZzZXQgKyBjaGlsZC5zaXplKSB7IHJldHVybiB7XG4gICAgICBub2RlOiB0aGlzLmNvbnRlbnRET00sXG4gICAgICBvZmZzZXQ6IGNoaWxkID8gZG9tSW5kZXgoY2hpbGQuZG9tKSA6IHRoaXMuY29udGVudERPTS5jaGlsZE5vZGVzLmxlbmd0aFxuICAgIH0gfVxuICAgIGlmICghY2hpbGQpIHsgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwb3NpdGlvbiBcIiArIHBvcykgfVxuICAgIHZhciBlbmQgPSBvZmZzZXQgKyBjaGlsZC5zaXplO1xuICAgIGlmICghY2hpbGQuZG9tQXRvbSAmJiAoc2lkZSA8IDAgJiYgIWNoaWxkLmJvcmRlciA/IGVuZCA+PSBwb3MgOiBlbmQgPiBwb3MpICYmXG4gICAgICAgIChlbmQgPiBwb3MgfHwgaSArIDEgPj0gdGhpcy5jaGlsZHJlbi5sZW5ndGggfHwgIXRoaXMuY2hpbGRyZW5baSArIDFdLmJlZm9yZVBvc2l0aW9uKSlcbiAgICAgIHsgcmV0dXJuIGNoaWxkLmRvbUZyb21Qb3MocG9zIC0gb2Zmc2V0IC0gY2hpbGQuYm9yZGVyLCBzaWRlKSB9XG4gICAgb2Zmc2V0ID0gZW5kO1xuICB9XG59O1xuXG4vLyBVc2VkIHRvIGZpbmQgYSBET00gcmFuZ2UgaW4gYSBzaW5nbGUgcGFyZW50IGZvciBhIGdpdmVuIGNoYW5nZWRcbi8vIHJhbmdlLlxuVmlld0Rlc2MucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbiBwYXJzZVJhbmdlIChmcm9tLCB0bywgYmFzZSkge1xuICAgIGlmICggYmFzZSA9PT0gdm9pZCAwICkgYmFzZSA9IDA7XG5cbiAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09IDApXG4gICAgeyByZXR1cm4ge25vZGU6IHRoaXMuY29udGVudERPTSwgZnJvbTogZnJvbSwgdG86IHRvLCBmcm9tT2Zmc2V0OiAwLCB0b09mZnNldDogdGhpcy5jb250ZW50RE9NLmNoaWxkTm9kZXMubGVuZ3RofSB9XG5cbiAgdmFyIGZyb21PZmZzZXQgPSAtMSwgdG9PZmZzZXQgPSAtMTtcbiAgZm9yICh2YXIgb2Zmc2V0ID0gYmFzZSwgaSA9IDA7OyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldLCBlbmQgPSBvZmZzZXQgKyBjaGlsZC5zaXplO1xuICAgIGlmIChmcm9tT2Zmc2V0ID09IC0xICYmIGZyb20gPD0gZW5kKSB7XG4gICAgICB2YXIgY2hpbGRCYXNlID0gb2Zmc2V0ICsgY2hpbGQuYm9yZGVyO1xuICAgICAgLy8gRklYTUUgbWF5YmUgZGVzY2VuZCBtYXJrIHZpZXdzIHRvIHBhcnNlIGEgbmFycm93ZXIgcmFuZ2U/XG4gICAgICBpZiAoZnJvbSA+PSBjaGlsZEJhc2UgJiYgdG8gPD0gZW5kIC0gY2hpbGQuYm9yZGVyICYmIGNoaWxkLm5vZGUgJiZcbiAgICAgICAgICBjaGlsZC5jb250ZW50RE9NICYmIHRoaXMuY29udGVudERPTS5jb250YWlucyhjaGlsZC5jb250ZW50RE9NKSlcbiAgICAgICAgeyByZXR1cm4gY2hpbGQucGFyc2VSYW5nZShmcm9tLCB0bywgY2hpbGRCYXNlKSB9XG5cbiAgICAgIGZyb20gPSBvZmZzZXQ7XG4gICAgICBmb3IgKHZhciBqID0gaTsgaiA+IDA7IGotLSkge1xuICAgICAgICB2YXIgcHJldiA9IHRoaXMuY2hpbGRyZW5baiAtIDFdO1xuICAgICAgICBpZiAocHJldi5zaXplICYmIHByZXYuZG9tLnBhcmVudE5vZGUgPT0gdGhpcy5jb250ZW50RE9NICYmICFwcmV2LmVtcHR5Q2hpbGRBdCgxKSkge1xuICAgICAgICAgIGZyb21PZmZzZXQgPSBkb21JbmRleChwcmV2LmRvbSkgKyAxO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgZnJvbSAtPSBwcmV2LnNpemU7XG4gICAgICB9XG4gICAgICBpZiAoZnJvbU9mZnNldCA9PSAtMSkgeyBmcm9tT2Zmc2V0ID0gMDsgfVxuICAgIH1cbiAgICBpZiAoZnJvbU9mZnNldCA+IC0xICYmIChlbmQgPiB0byB8fCBpID09IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHRvID0gZW5kO1xuICAgICAgZm9yICh2YXIgaiQxID0gaSArIDE7IGokMSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBqJDErKykge1xuICAgICAgICB2YXIgbmV4dCA9IHRoaXMuY2hpbGRyZW5baiQxXTtcbiAgICAgICAgaWYgKG5leHQuc2l6ZSAmJiBuZXh0LmRvbS5wYXJlbnROb2RlID09IHRoaXMuY29udGVudERPTSAmJiAhbmV4dC5lbXB0eUNoaWxkQXQoLTEpKSB7XG4gICAgICAgICAgdG9PZmZzZXQgPSBkb21JbmRleChuZXh0LmRvbSk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB0byArPSBuZXh0LnNpemU7XG4gICAgICB9XG4gICAgICBpZiAodG9PZmZzZXQgPT0gLTEpIHsgdG9PZmZzZXQgPSB0aGlzLmNvbnRlbnRET00uY2hpbGROb2Rlcy5sZW5ndGg7IH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIG9mZnNldCA9IGVuZDtcbiAgfVxuICByZXR1cm4ge25vZGU6IHRoaXMuY29udGVudERPTSwgZnJvbTogZnJvbSwgdG86IHRvLCBmcm9tT2Zmc2V0OiBmcm9tT2Zmc2V0LCB0b09mZnNldDogdG9PZmZzZXR9XG59O1xuXG5WaWV3RGVzYy5wcm90b3R5cGUuZW1wdHlDaGlsZEF0ID0gZnVuY3Rpb24gZW1wdHlDaGlsZEF0IChzaWRlKSB7XG4gIGlmICh0aGlzLmJvcmRlciB8fCAhdGhpcy5jb250ZW50RE9NIHx8ICF0aGlzLmNoaWxkcmVuLmxlbmd0aCkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW3NpZGUgPCAwID8gMCA6IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gIHJldHVybiBjaGlsZC5zaXplID09IDAgfHwgY2hpbGQuZW1wdHlDaGlsZEF0KHNpZGUpXG59O1xuXG4vLyA6IChudW1iZXIpIOKGkiBkb20uTm9kZVxuVmlld0Rlc2MucHJvdG90eXBlLmRvbUFmdGVyUG9zID0gZnVuY3Rpb24gZG9tQWZ0ZXJQb3MgKHBvcykge1xuICB2YXIgcmVmID0gdGhpcy5kb21Gcm9tUG9zKHBvcywgMCk7XG4gICAgdmFyIG5vZGUgPSByZWYubm9kZTtcbiAgICB2YXIgb2Zmc2V0ID0gcmVmLm9mZnNldDtcbiAgaWYgKG5vZGUubm9kZVR5cGUgIT0gMSB8fCBvZmZzZXQgPT0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICB7IHRocm93IG5ldyBSYW5nZUVycm9yKFwiTm8gbm9kZSBhZnRlciBwb3MgXCIgKyBwb3MpIH1cbiAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdXG59O1xuXG4vLyA6IChudW1iZXIsIG51bWJlciwgZG9tLkRvY3VtZW50KVxuLy8gVmlldyBkZXNjcyBhcmUgcmVzcG9uc2libGUgZm9yIHNldHRpbmcgYW55IHNlbGVjdGlvbiB0aGF0IGZhbGxzXG4vLyBlbnRpcmVseSBpbnNpZGUgb2YgdGhlbSwgc28gdGhhdCBjdXN0b20gaW1wbGVtZW50YXRpb25zIGNhbiBkb1xuLy8gY3VzdG9tIHRoaW5ncyB3aXRoIHRoZSBzZWxlY3Rpb24uIE5vdGUgdGhhdCB0aGlzIGZhbGxzIGFwYXJ0IHdoZW5cbi8vIGEgc2VsZWN0aW9uIHN0YXJ0cyBpbiBzdWNoIGEgbm9kZSBhbmQgZW5kcyBpbiBhbm90aGVyLCBpbiB3aGljaFxuLy8gY2FzZSB3ZSBqdXN0IHVzZSB3aGF0ZXZlciBkb21Gcm9tUG9zIHByb2R1Y2VzIGFzIGEgYmVzdCBlZmZvcnQuXG5WaWV3RGVzYy5wcm90b3R5cGUuc2V0U2VsZWN0aW9uID0gZnVuY3Rpb24gc2V0U2VsZWN0aW9uIChhbmNob3IsIGhlYWQsIHJvb3QsIGZvcmNlKSB7XG4gIC8vIElmIHRoZSBzZWxlY3Rpb24gZmFsbHMgZW50aXJlbHkgaW4gYSBjaGlsZCwgZ2l2ZSBpdCB0byB0aGF0IGNoaWxkXG4gIHZhciBmcm9tID0gTWF0aC5taW4oYW5jaG9yLCBoZWFkKSwgdG8gPSBNYXRoLm1heChhbmNob3IsIGhlYWQpO1xuICBmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldLCBlbmQgPSBvZmZzZXQgKyBjaGlsZC5zaXplO1xuICAgIGlmIChmcm9tID4gb2Zmc2V0ICYmIHRvIDwgZW5kKVxuICAgICAgeyByZXR1cm4gY2hpbGQuc2V0U2VsZWN0aW9uKGFuY2hvciAtIG9mZnNldCAtIGNoaWxkLmJvcmRlciwgaGVhZCAtIG9mZnNldCAtIGNoaWxkLmJvcmRlciwgcm9vdCwgZm9yY2UpIH1cbiAgICBvZmZzZXQgPSBlbmQ7XG4gIH1cblxuICB2YXIgYW5jaG9yRE9NID0gdGhpcy5kb21Gcm9tUG9zKGFuY2hvciwgYW5jaG9yID8gLTEgOiAxKTtcbiAgdmFyIGhlYWRET00gPSBoZWFkID09IGFuY2hvciA/IGFuY2hvckRPTSA6IHRoaXMuZG9tRnJvbVBvcyhoZWFkLCBoZWFkID8gLTEgOiAxKTtcbiAgdmFyIGRvbVNlbCA9IHJvb3QuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgdmFyIGJyS2x1ZGdlID0gZmFsc2U7XG4gIC8vIE9uIEZpcmVmb3gsIHVzaW5nIFNlbGVjdGlvbi5jb2xsYXBzZSB0byBwdXQgdGhlIGN1cnNvciBhZnRlciBhXG4gIC8vIEJSIG5vZGUgZm9yIHNvbWUgcmVhc29uIGRvZXNuJ3QgYWx3YXlzIHdvcmsgKCMxMDczKS4gT24gU2FmYXJpLFxuICAvLyB0aGUgY3Vyc29yIHNvbWV0aW1lcyBpbmV4cGxpY2FibGUgdmlzdWFsbHkgbGFncyBiZWhpbmQgaXRzXG4gIC8vIHJlcG9ydGVkIHBvc2l0aW9uIGluIHN1Y2ggc2l0dWF0aW9ucyAoIzEwOTIpLlxuICBpZiAoKHJlc3VsdC5nZWNrbyB8fCByZXN1bHQuc2FmYXJpKSAmJiBhbmNob3IgPT0gaGVhZCkge1xuICAgIHZhciBub2RlID0gYW5jaG9yRE9NLm5vZGU7XG4gICAgICB2YXIgb2Zmc2V0JDEgPSBhbmNob3JET00ub2Zmc2V0O1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIHtcbiAgICAgIGJyS2x1ZGdlID0gb2Zmc2V0JDEgJiYgbm9kZS5ub2RlVmFsdWVbb2Zmc2V0JDEgLSAxXSA9PSBcIlxcblwiO1xuICAgICAgLy8gSXNzdWUgIzExMjhcbiAgICAgIGlmIChicktsdWRnZSAmJiBvZmZzZXQkMSA9PSBub2RlLm5vZGVWYWx1ZS5sZW5ndGggJiZcbiAgICAgICAgICBub2RlLm5leHRTaWJsaW5nICYmIG5vZGUubmV4dFNpYmxpbmcubm9kZU5hbWUgPT0gXCJCUlwiKVxuICAgICAgICB7IGFuY2hvckRPTSA9IGhlYWRET00gPSB7bm9kZTogbm9kZS5wYXJlbnROb2RlLCBvZmZzZXQ6IGRvbUluZGV4KG5vZGUpICsgMX07IH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHByZXYgPSBub2RlLmNoaWxkTm9kZXNbb2Zmc2V0JDEgLSAxXTtcbiAgICAgIGJyS2x1ZGdlID0gcHJldiAmJiAocHJldi5ub2RlTmFtZSA9PSBcIkJSXCIgfHwgcHJldi5jb250ZW50RWRpdGFibGUgPT0gXCJmYWxzZVwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIShmb3JjZSB8fCBicktsdWRnZSAmJiByZXN1bHQuc2FmYXJpKSAmJlxuICAgICAgaXNFcXVpdmFsZW50UG9zaXRpb24oYW5jaG9yRE9NLm5vZGUsIGFuY2hvckRPTS5vZmZzZXQsIGRvbVNlbC5hbmNob3JOb2RlLCBkb21TZWwuYW5jaG9yT2Zmc2V0KSAmJlxuICAgICAgaXNFcXVpdmFsZW50UG9zaXRpb24oaGVhZERPTS5ub2RlLCBoZWFkRE9NLm9mZnNldCwgZG9tU2VsLmZvY3VzTm9kZSwgZG9tU2VsLmZvY3VzT2Zmc2V0KSlcbiAgICB7IHJldHVybiB9XG5cbiAgLy8gU2VsZWN0aW9uLmV4dGVuZCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYW4gJ2ludmVydGVkJyBzZWxlY3Rpb25cbiAgLy8gKG9uZSB3aGVyZSB0aGUgZm9jdXMgaXMgYmVmb3JlIHRoZSBhbmNob3IpLCBidXQgbm90IGFsbFxuICAvLyBicm93c2VycyBzdXBwb3J0IGl0IHlldC5cbiAgdmFyIGRvbVNlbEV4dGVuZGVkID0gZmFsc2U7XG4gIGlmICgoZG9tU2VsLmV4dGVuZCB8fCBhbmNob3IgPT0gaGVhZCkgJiYgIWJyS2x1ZGdlKSB7XG4gICAgZG9tU2VsLmNvbGxhcHNlKGFuY2hvckRPTS5ub2RlLCBhbmNob3JET00ub2Zmc2V0KTtcbiAgICB0cnkge1xuICAgICAgaWYgKGFuY2hvciAhPSBoZWFkKSB7IGRvbVNlbC5leHRlbmQoaGVhZERPTS5ub2RlLCBoZWFkRE9NLm9mZnNldCk7IH1cbiAgICAgIGRvbVNlbEV4dGVuZGVkID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIEluIHNvbWUgY2FzZXMgd2l0aCBDaHJvbWUgdGhlIHNlbGVjdGlvbiBpcyBlbXB0eSBhZnRlciBjYWxsaW5nXG4gICAgICAvLyBjb2xsYXBzZSwgZXZlbiB3aGVuIGl0IHNob3VsZCBiZSB2YWxpZC4gVGhpcyBhcHBlYXJzIHRvIGJlIGEgYnVnLCBidXRcbiAgICAgIC8vIGl0IGlzIGRpZmZpY3VsdCB0byBpc29sYXRlLiBJZiB0aGlzIGhhcHBlbnMgZmFsbGJhY2sgdG8gdGhlIG9sZCBwYXRoXG4gICAgICAvLyB3aXRob3V0IHVzaW5nIGV4dGVuZC5cbiAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbikpIHsgdGhyb3cgZXJyIH1cbiAgICAgIC8vIGRlY2xhcmUgZ2xvYmFsOiBET01FeGNlcHRpb25cbiAgICB9XG4gIH1cbiAgaWYgKCFkb21TZWxFeHRlbmRlZCkge1xuICAgIGlmIChhbmNob3IgPiBoZWFkKSB7IHZhciB0bXAgPSBhbmNob3JET007IGFuY2hvckRPTSA9IGhlYWRET007IGhlYWRET00gPSB0bXA7IH1cbiAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNldEVuZChoZWFkRE9NLm5vZGUsIGhlYWRET00ub2Zmc2V0KTtcbiAgICByYW5nZS5zZXRTdGFydChhbmNob3JET00ubm9kZSwgYW5jaG9yRE9NLm9mZnNldCk7XG4gICAgZG9tU2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIGRvbVNlbC5hZGRSYW5nZShyYW5nZSk7XG4gIH1cbn07XG5cbi8vIDogKGRvbS5NdXRhdGlvblJlY29yZCkg4oaSIGJvb2xcblZpZXdEZXNjLnByb3RvdHlwZS5pZ25vcmVNdXRhdGlvbiA9IGZ1bmN0aW9uIGlnbm9yZU11dGF0aW9uIChtdXRhdGlvbikge1xuICByZXR1cm4gIXRoaXMuY29udGVudERPTSAmJiBtdXRhdGlvbi50eXBlICE9IFwic2VsZWN0aW9uXCJcbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5jb250ZW50TG9zdC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNvbnRlbnRET00gJiYgdGhpcy5jb250ZW50RE9NICE9IHRoaXMuZG9tICYmICF0aGlzLmRvbS5jb250YWlucyh0aGlzLmNvbnRlbnRET00pXG59O1xuXG4vLyBSZW1vdmUgYSBzdWJ0cmVlIG9mIHRoZSBlbGVtZW50IHRyZWUgdGhhdCBoYXMgYmVlbiB0b3VjaGVkXG4vLyBieSBhIERPTSBjaGFuZ2UsIHNvIHRoYXQgdGhlIG5leHQgdXBkYXRlIHdpbGwgcmVkcmF3IGl0LlxuVmlld0Rlc2MucHJvdG90eXBlLm1hcmtEaXJ0eSA9IGZ1bmN0aW9uIG1hcmtEaXJ0eSAoZnJvbSwgdG8pIHtcbiAgZm9yICh2YXIgb2Zmc2V0ID0gMCwgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXSwgZW5kID0gb2Zmc2V0ICsgY2hpbGQuc2l6ZTtcbiAgICBpZiAob2Zmc2V0ID09IGVuZCA/IGZyb20gPD0gZW5kICYmIHRvID49IG9mZnNldCA6IGZyb20gPCBlbmQgJiYgdG8gPiBvZmZzZXQpIHtcbiAgICAgIHZhciBzdGFydEluc2lkZSA9IG9mZnNldCArIGNoaWxkLmJvcmRlciwgZW5kSW5zaWRlID0gZW5kIC0gY2hpbGQuYm9yZGVyO1xuICAgICAgaWYgKGZyb20gPj0gc3RhcnRJbnNpZGUgJiYgdG8gPD0gZW5kSW5zaWRlKSB7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmcm9tID09IG9mZnNldCB8fCB0byA9PSBlbmQgPyBDT05URU5UX0RJUlRZIDogQ0hJTERfRElSVFk7XG4gICAgICAgIGlmIChmcm9tID09IHN0YXJ0SW5zaWRlICYmIHRvID09IGVuZEluc2lkZSAmJlxuICAgICAgICAgICAgKGNoaWxkLmNvbnRlbnRMb3N0IHx8IGNoaWxkLmRvbS5wYXJlbnROb2RlICE9IHRoaXMuY29udGVudERPTSkpIHsgY2hpbGQuZGlydHkgPSBOT0RFX0RJUlRZOyB9XG4gICAgICAgIGVsc2UgeyBjaGlsZC5tYXJrRGlydHkoZnJvbSAtIHN0YXJ0SW5zaWRlLCB0byAtIHN0YXJ0SW5zaWRlKTsgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkLmRpcnR5ID0gTk9ERV9ESVJUWTtcbiAgICAgIH1cbiAgICB9XG4gICAgb2Zmc2V0ID0gZW5kO1xuICB9XG4gIHRoaXMuZGlydHkgPSBDT05URU5UX0RJUlRZO1xufTtcblxuVmlld0Rlc2MucHJvdG90eXBlLm1hcmtQYXJlbnRzRGlydHkgPSBmdW5jdGlvbiBtYXJrUGFyZW50c0RpcnR5ICgpIHtcbiAgdmFyIGxldmVsID0gMTtcbiAgZm9yICh2YXIgbm9kZSA9IHRoaXMucGFyZW50OyBub2RlOyBub2RlID0gbm9kZS5wYXJlbnQsIGxldmVsKyspIHtcbiAgICB2YXIgZGlydHkgPSBsZXZlbCA9PSAxID8gQ09OVEVOVF9ESVJUWSA6IENISUxEX0RJUlRZO1xuICAgIGlmIChub2RlLmRpcnR5IDwgZGlydHkpIHsgbm9kZS5kaXJ0eSA9IGRpcnR5OyB9XG4gIH1cbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5kb21BdG9tLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlIH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWaWV3RGVzYy5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG4vLyBSZXVzZWQgYXJyYXkgdG8gYXZvaWQgYWxsb2NhdGluZyBmcmVzaCBhcnJheXMgZm9yIHRoaW5ncyB0aGF0IHdpbGxcbi8vIHN0YXkgZW1wdHkgYW55d2F5LlxudmFyIG5vdGhpbmcgPSBbXTtcblxuLy8gQSB3aWRnZXQgZGVzYyByZXByZXNlbnRzIGEgd2lkZ2V0IGRlY29yYXRpb24sIHdoaWNoIGlzIGEgRE9NIG5vZGVcbi8vIGRyYXduIGJldHdlZW4gdGhlIGRvY3VtZW50IG5vZGVzLlxudmFyIFdpZGdldFZpZXdEZXNjID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoVmlld0Rlc2MpIHtcbiAgZnVuY3Rpb24gV2lkZ2V0Vmlld0Rlc2MocGFyZW50LCB3aWRnZXQsIHZpZXcsIHBvcykge1xuICAgIHZhciBzZWxmLCBkb20gPSB3aWRnZXQudHlwZS50b0RPTTtcbiAgICBpZiAodHlwZW9mIGRvbSA9PSBcImZ1bmN0aW9uXCIpIHsgZG9tID0gZG9tKHZpZXcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc2VsZikgeyByZXR1cm4gcG9zIH1cbiAgICAgIGlmIChzZWxmLnBhcmVudCkgeyByZXR1cm4gc2VsZi5wYXJlbnQucG9zQmVmb3JlQ2hpbGQoc2VsZikgfVxuICAgIH0pOyB9XG4gICAgaWYgKCF3aWRnZXQudHlwZS5zcGVjLnJhdykge1xuICAgICAgaWYgKGRvbS5ub2RlVHlwZSAhPSAxKSB7XG4gICAgICAgIHZhciB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHdyYXAuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICAgICAgZG9tID0gd3JhcDtcbiAgICAgIH1cbiAgICAgIGRvbS5jb250ZW50RWRpdGFibGUgPSBmYWxzZTtcbiAgICAgIGRvbS5jbGFzc0xpc3QuYWRkKFwiUHJvc2VNaXJyb3Itd2lkZ2V0XCIpO1xuICAgIH1cbiAgICBWaWV3RGVzYy5jYWxsKHRoaXMsIHBhcmVudCwgbm90aGluZywgZG9tLCBudWxsKTtcbiAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICBzZWxmID0gdGhpcztcbiAgfVxuXG4gIGlmICggVmlld0Rlc2MgKSBXaWRnZXRWaWV3RGVzYy5fX3Byb3RvX18gPSBWaWV3RGVzYztcbiAgV2lkZ2V0Vmlld0Rlc2MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVmlld0Rlc2MgJiYgVmlld0Rlc2MucHJvdG90eXBlICk7XG4gIFdpZGdldFZpZXdEZXNjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFdpZGdldFZpZXdEZXNjO1xuXG4gIHZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMSA9IHsgYmVmb3JlUG9zaXRpb246IHsgY29uZmlndXJhYmxlOiB0cnVlIH0sZG9tQXRvbTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIHByb3RvdHlwZUFjY2Vzc29ycyQxLmJlZm9yZVBvc2l0aW9uLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQudHlwZS5zaWRlIDwgMFxuICB9O1xuXG4gIFdpZGdldFZpZXdEZXNjLnByb3RvdHlwZS5tYXRjaGVzV2lkZ2V0ID0gZnVuY3Rpb24gbWF0Y2hlc1dpZGdldCAod2lkZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZGlydHkgPT0gTk9UX0RJUlRZICYmIHdpZGdldC50eXBlLmVxKHRoaXMud2lkZ2V0LnR5cGUpXG4gIH07XG5cbiAgV2lkZ2V0Vmlld0Rlc2MucHJvdG90eXBlLnBhcnNlUnVsZSA9IGZ1bmN0aW9uIHBhcnNlUnVsZSAoKSB7IHJldHVybiB7aWdub3JlOiB0cnVlfSB9O1xuXG4gIFdpZGdldFZpZXdEZXNjLnByb3RvdHlwZS5zdG9wRXZlbnQgPSBmdW5jdGlvbiBzdG9wRXZlbnQgKGV2ZW50KSB7XG4gICAgdmFyIHN0b3AgPSB0aGlzLndpZGdldC5zcGVjLnN0b3BFdmVudDtcbiAgICByZXR1cm4gc3RvcCA/IHN0b3AoZXZlbnQpIDogZmFsc2VcbiAgfTtcblxuICBXaWRnZXRWaWV3RGVzYy5wcm90b3R5cGUuaWdub3JlTXV0YXRpb24gPSBmdW5jdGlvbiBpZ25vcmVNdXRhdGlvbiAobXV0YXRpb24pIHtcbiAgICByZXR1cm4gbXV0YXRpb24udHlwZSAhPSBcInNlbGVjdGlvblwiIHx8IHRoaXMud2lkZ2V0LnNwZWMuaWdub3JlU2VsZWN0aW9uXG4gIH07XG5cbiAgcHJvdG90eXBlQWNjZXNzb3JzJDEuZG9tQXRvbS5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFdpZGdldFZpZXdEZXNjLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzJDEgKTtcblxuICByZXR1cm4gV2lkZ2V0Vmlld0Rlc2M7XG59KFZpZXdEZXNjKSk7XG5cbnZhciBDb21wb3NpdGlvblZpZXdEZXNjID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoVmlld0Rlc2MpIHtcbiAgZnVuY3Rpb24gQ29tcG9zaXRpb25WaWV3RGVzYyhwYXJlbnQsIGRvbSwgdGV4dERPTSwgdGV4dCkge1xuICAgIFZpZXdEZXNjLmNhbGwodGhpcywgcGFyZW50LCBub3RoaW5nLCBkb20sIG51bGwpO1xuICAgIHRoaXMudGV4dERPTSA9IHRleHRET007XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgfVxuXG4gIGlmICggVmlld0Rlc2MgKSBDb21wb3NpdGlvblZpZXdEZXNjLl9fcHJvdG9fXyA9IFZpZXdEZXNjO1xuICBDb21wb3NpdGlvblZpZXdEZXNjLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFZpZXdEZXNjICYmIFZpZXdEZXNjLnByb3RvdHlwZSApO1xuICBDb21wb3NpdGlvblZpZXdEZXNjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbXBvc2l0aW9uVmlld0Rlc2M7XG5cbiAgdmFyIHByb3RvdHlwZUFjY2Vzc29ycyQyID0geyBzaXplOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbiAgcHJvdG90eXBlQWNjZXNzb3JzJDIuc2l6ZS5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnRleHQubGVuZ3RoIH07XG5cbiAgQ29tcG9zaXRpb25WaWV3RGVzYy5wcm90b3R5cGUubG9jYWxQb3NGcm9tRE9NID0gZnVuY3Rpb24gbG9jYWxQb3NGcm9tRE9NIChkb20sIG9mZnNldCkge1xuICAgIGlmIChkb20gIT0gdGhpcy50ZXh0RE9NKSB7IHJldHVybiB0aGlzLnBvc0F0U3RhcnQgKyAob2Zmc2V0ID8gdGhpcy5zaXplIDogMCkgfVxuICAgIHJldHVybiB0aGlzLnBvc0F0U3RhcnQgKyBvZmZzZXRcbiAgfTtcblxuICBDb21wb3NpdGlvblZpZXdEZXNjLnByb3RvdHlwZS5kb21Gcm9tUG9zID0gZnVuY3Rpb24gZG9tRnJvbVBvcyAocG9zKSB7XG4gICAgcmV0dXJuIHtub2RlOiB0aGlzLnRleHRET00sIG9mZnNldDogcG9zfVxuICB9O1xuXG4gIENvbXBvc2l0aW9uVmlld0Rlc2MucHJvdG90eXBlLmlnbm9yZU11dGF0aW9uID0gZnVuY3Rpb24gaWdub3JlTXV0YXRpb24gKG11dCkge1xuICAgIHJldHVybiBtdXQudHlwZSA9PT0gJ2NoYXJhY3RlckRhdGEnICYmIG11dC50YXJnZXQubm9kZVZhbHVlID09IG11dC5vbGRWYWx1ZVxuICAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyggQ29tcG9zaXRpb25WaWV3RGVzYy5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyQyICk7XG5cbiAgcmV0dXJuIENvbXBvc2l0aW9uVmlld0Rlc2M7XG59KFZpZXdEZXNjKSk7XG5cbi8vIEEgbWFyayBkZXNjIHJlcHJlc2VudHMgYSBtYXJrLiBNYXkgaGF2ZSBtdWx0aXBsZSBjaGlsZHJlbixcbi8vIGRlcGVuZGluZyBvbiBob3cgdGhlIG1hcmsgaXMgc3BsaXQuIE5vdGUgdGhhdCBtYXJrcyBhcmUgZHJhd24gdXNpbmdcbi8vIGEgZml4ZWQgbmVzdGluZyBvcmRlciwgZm9yIHNpbXBsaWNpdHkgYW5kIHByZWRpY3RhYmlsaXR5LCBzbyBpblxuLy8gc29tZSBjYXNlcyB0aGV5IHdpbGwgYmUgc3BsaXQgbW9yZSBvZnRlbiB0aGFuIHdvdWxkIGFwcGVhclxuLy8gbmVjZXNzYXJ5LlxudmFyIE1hcmtWaWV3RGVzYyA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFZpZXdEZXNjKSB7XG4gIGZ1bmN0aW9uIE1hcmtWaWV3RGVzYyhwYXJlbnQsIG1hcmssIGRvbSwgY29udGVudERPTSkge1xuICAgIFZpZXdEZXNjLmNhbGwodGhpcywgcGFyZW50LCBbXSwgZG9tLCBjb250ZW50RE9NKTtcbiAgICB0aGlzLm1hcmsgPSBtYXJrO1xuICB9XG5cbiAgaWYgKCBWaWV3RGVzYyApIE1hcmtWaWV3RGVzYy5fX3Byb3RvX18gPSBWaWV3RGVzYztcbiAgTWFya1ZpZXdEZXNjLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFZpZXdEZXNjICYmIFZpZXdEZXNjLnByb3RvdHlwZSApO1xuICBNYXJrVmlld0Rlc2MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFya1ZpZXdEZXNjO1xuXG4gIE1hcmtWaWV3RGVzYy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUgKHBhcmVudCwgbWFyaywgaW5saW5lLCB2aWV3KSB7XG4gICAgdmFyIGN1c3RvbSA9IHZpZXcubm9kZVZpZXdzW21hcmsudHlwZS5uYW1lXTtcbiAgICB2YXIgc3BlYyA9IGN1c3RvbSAmJiBjdXN0b20obWFyaywgdmlldywgaW5saW5lKTtcbiAgICBpZiAoIXNwZWMgfHwgIXNwZWMuZG9tKVxuICAgICAgeyBzcGVjID0gRE9NU2VyaWFsaXplci5yZW5kZXJTcGVjKGRvY3VtZW50LCBtYXJrLnR5cGUuc3BlYy50b0RPTShtYXJrLCBpbmxpbmUpKTsgfVxuICAgIHJldHVybiBuZXcgTWFya1ZpZXdEZXNjKHBhcmVudCwgbWFyaywgc3BlYy5kb20sIHNwZWMuY29udGVudERPTSB8fCBzcGVjLmRvbSlcbiAgfTtcblxuICBNYXJrVmlld0Rlc2MucHJvdG90eXBlLnBhcnNlUnVsZSA9IGZ1bmN0aW9uIHBhcnNlUnVsZSAoKSB7IHJldHVybiB7bWFyazogdGhpcy5tYXJrLnR5cGUubmFtZSwgYXR0cnM6IHRoaXMubWFyay5hdHRycywgY29udGVudEVsZW1lbnQ6IHRoaXMuY29udGVudERPTX0gfTtcblxuICBNYXJrVmlld0Rlc2MucHJvdG90eXBlLm1hdGNoZXNNYXJrID0gZnVuY3Rpb24gbWF0Y2hlc01hcmsgKG1hcmspIHsgcmV0dXJuIHRoaXMuZGlydHkgIT0gTk9ERV9ESVJUWSAmJiB0aGlzLm1hcmsuZXEobWFyaykgfTtcblxuICBNYXJrVmlld0Rlc2MucHJvdG90eXBlLm1hcmtEaXJ0eSA9IGZ1bmN0aW9uIG1hcmtEaXJ0eSAoZnJvbSwgdG8pIHtcbiAgICBWaWV3RGVzYy5wcm90b3R5cGUubWFya0RpcnR5LmNhbGwodGhpcywgZnJvbSwgdG8pO1xuICAgIC8vIE1vdmUgZGlydHkgaW5mbyB0byBuZWFyZXN0IG5vZGUgdmlld1xuICAgIGlmICh0aGlzLmRpcnR5ICE9IE5PVF9ESVJUWSkge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgd2hpbGUgKCFwYXJlbnQubm9kZSkgeyBwYXJlbnQgPSBwYXJlbnQucGFyZW50OyB9XG4gICAgICBpZiAocGFyZW50LmRpcnR5IDwgdGhpcy5kaXJ0eSkgeyBwYXJlbnQuZGlydHkgPSB0aGlzLmRpcnR5OyB9XG4gICAgICB0aGlzLmRpcnR5ID0gTk9UX0RJUlRZO1xuICAgIH1cbiAgfTtcblxuICBNYXJrVmlld0Rlc2MucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKGZyb20sIHRvLCB2aWV3KSB7XG4gICAgdmFyIGNvcHkgPSBNYXJrVmlld0Rlc2MuY3JlYXRlKHRoaXMucGFyZW50LCB0aGlzLm1hcmssIHRydWUsIHZpZXcpO1xuICAgIHZhciBub2RlcyA9IHRoaXMuY2hpbGRyZW4sIHNpemUgPSB0aGlzLnNpemU7XG4gICAgaWYgKHRvIDwgc2l6ZSkgeyBub2RlcyA9IHJlcGxhY2VOb2Rlcyhub2RlcywgdG8sIHNpemUsIHZpZXcpOyB9XG4gICAgaWYgKGZyb20gPiAwKSB7IG5vZGVzID0gcmVwbGFjZU5vZGVzKG5vZGVzLCAwLCBmcm9tLCB2aWV3KTsgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHsgbm9kZXNbaV0ucGFyZW50ID0gY29weTsgfVxuICAgIGNvcHkuY2hpbGRyZW4gPSBub2RlcztcbiAgICByZXR1cm4gY29weVxuICB9O1xuXG4gIHJldHVybiBNYXJrVmlld0Rlc2M7XG59KFZpZXdEZXNjKSk7XG5cbi8vIE5vZGUgdmlldyBkZXNjcyBhcmUgdGhlIG1haW4sIG1vc3QgY29tbW9uIHR5cGUgb2YgdmlldyBkZXNjLCBhbmRcbi8vIGNvcnJlc3BvbmQgdG8gYW4gYWN0dWFsIG5vZGUgaW4gdGhlIGRvY3VtZW50LiBVbmxpa2UgbWFyayBkZXNjcyxcbi8vIHRoZXkgcG9wdWxhdGUgdGhlaXIgY2hpbGQgYXJyYXkgdGhlbXNlbHZlcy5cbnZhciBOb2RlVmlld0Rlc2MgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChWaWV3RGVzYykge1xuICBmdW5jdGlvbiBOb2RlVmlld0Rlc2MocGFyZW50LCBub2RlLCBvdXRlckRlY28sIGlubmVyRGVjbywgZG9tLCBjb250ZW50RE9NLCBub2RlRE9NLCB2aWV3LCBwb3MpIHtcbiAgICBWaWV3RGVzYy5jYWxsKHRoaXMsIHBhcmVudCwgbm9kZS5pc0xlYWYgPyBub3RoaW5nIDogW10sIGRvbSwgY29udGVudERPTSk7XG4gICAgdGhpcy5ub2RlRE9NID0gbm9kZURPTTtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMub3V0ZXJEZWNvID0gb3V0ZXJEZWNvO1xuICAgIHRoaXMuaW5uZXJEZWNvID0gaW5uZXJEZWNvO1xuICAgIGlmIChjb250ZW50RE9NKSB7IHRoaXMudXBkYXRlQ2hpbGRyZW4odmlldywgcG9zKTsgfVxuICB9XG5cbiAgaWYgKCBWaWV3RGVzYyApIE5vZGVWaWV3RGVzYy5fX3Byb3RvX18gPSBWaWV3RGVzYztcbiAgTm9kZVZpZXdEZXNjLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFZpZXdEZXNjICYmIFZpZXdEZXNjLnByb3RvdHlwZSApO1xuICBOb2RlVmlld0Rlc2MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm9kZVZpZXdEZXNjO1xuXG4gIHZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMyA9IHsgc2l6ZTogeyBjb25maWd1cmFibGU6IHRydWUgfSxib3JkZXI6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0sZG9tQXRvbTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIC8vIEJ5IGRlZmF1bHQsIGEgbm9kZSBpcyByZW5kZXJlZCB1c2luZyB0aGUgYHRvRE9NYCBtZXRob2QgZnJvbSB0aGVcbiAgLy8gbm9kZSB0eXBlIHNwZWMuIEJ1dCBjbGllbnQgY29kZSBjYW4gdXNlIHRoZSBgbm9kZVZpZXdzYCBzcGVjIHRvXG4gIC8vIHN1cHBseSBhIGN1c3RvbSBub2RlIHZpZXcsIHdoaWNoIGNhbiBpbmZsdWVuY2UgdmFyaW91cyBhc3BlY3RzIG9mXG4gIC8vIHRoZSB3YXkgdGhlIG5vZGUgd29ya3MuXG4gIC8vXG4gIC8vIChVc2luZyBzdWJjbGFzc2luZyBmb3IgdGhpcyB3YXMgaW50ZW50aW9uYWxseSBkZWNpZGVkIGFnYWluc3QsXG4gIC8vIHNpbmNlIGl0J2QgcmVxdWlyZSBleHBvc2luZyBhIHdob2xlIHNsZXcgb2YgZmlubmlja3lcbiAgLy8gaW1wbGVtZW50YXRpb24gZGV0YWlscyB0byB0aGUgdXNlciBjb2RlIHRoYXQgdGhleSBwcm9iYWJseSB3aWxsXG4gIC8vIG5ldmVyIG5lZWQuKVxuICBOb2RlVmlld0Rlc2MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlIChwYXJlbnQsIG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCB2aWV3LCBwb3MpIHtcbiAgICB2YXIgYXNzaWduO1xuXG4gICAgdmFyIGN1c3RvbSA9IHZpZXcubm9kZVZpZXdzW25vZGUudHlwZS5uYW1lXSwgZGVzY09iajtcbiAgICB2YXIgc3BlYyA9IGN1c3RvbSAmJiBjdXN0b20obm9kZSwgdmlldywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gKFRoaXMgaXMgYSBmdW5jdGlvbiB0aGF0IGFsbG93cyB0aGUgY3VzdG9tIHZpZXcgdG8gZmluZCBpdHNcbiAgICAgIC8vIG93biBwb3NpdGlvbilcbiAgICAgIGlmICghZGVzY09iaikgeyByZXR1cm4gcG9zIH1cbiAgICAgIGlmIChkZXNjT2JqLnBhcmVudCkgeyByZXR1cm4gZGVzY09iai5wYXJlbnQucG9zQmVmb3JlQ2hpbGQoZGVzY09iaikgfVxuICAgIH0sIG91dGVyRGVjbywgaW5uZXJEZWNvKTtcblxuICAgIHZhciBkb20gPSBzcGVjICYmIHNwZWMuZG9tLCBjb250ZW50RE9NID0gc3BlYyAmJiBzcGVjLmNvbnRlbnRET007XG4gICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICBpZiAoIWRvbSkgeyBkb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlLnRleHQpOyB9XG4gICAgICBlbHNlIGlmIChkb20ubm9kZVR5cGUgIT0gMykgeyB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlRleHQgbXVzdCBiZSByZW5kZXJlZCBhcyBhIERPTSB0ZXh0IG5vZGVcIikgfVxuICAgIH0gZWxzZSBpZiAoIWRvbSkge1xuKChhc3NpZ24gPSBET01TZXJpYWxpemVyLnJlbmRlclNwZWMoZG9jdW1lbnQsIG5vZGUudHlwZS5zcGVjLnRvRE9NKG5vZGUpKSwgZG9tID0gYXNzaWduLmRvbSwgY29udGVudERPTSA9IGFzc2lnbi5jb250ZW50RE9NKSk7XG4gICAgfVxuICAgIGlmICghY29udGVudERPTSAmJiAhbm9kZS5pc1RleHQgJiYgZG9tLm5vZGVOYW1lICE9IFwiQlJcIikgeyAvLyBDaHJvbWUgZ2V0cyBjb25mdXNlZCBieSA8YnIgY29udGVudGVkaXRhYmxlPWZhbHNlPlxuICAgICAgaWYgKCFkb20uaGFzQXR0cmlidXRlKFwiY29udGVudGVkaXRhYmxlXCIpKSB7IGRvbS5jb250ZW50RWRpdGFibGUgPSBmYWxzZTsgfVxuICAgICAgaWYgKG5vZGUudHlwZS5zcGVjLmRyYWdnYWJsZSkgeyBkb20uZHJhZ2dhYmxlID0gdHJ1ZTsgfVxuICAgIH1cblxuICAgIHZhciBub2RlRE9NID0gZG9tO1xuICAgIGRvbSA9IGFwcGx5T3V0ZXJEZWNvKGRvbSwgb3V0ZXJEZWNvLCBub2RlKTtcblxuICAgIGlmIChzcGVjKVxuICAgICAgeyByZXR1cm4gZGVzY09iaiA9IG5ldyBDdXN0b21Ob2RlVmlld0Rlc2MocGFyZW50LCBub2RlLCBvdXRlckRlY28sIGlubmVyRGVjbywgZG9tLCBjb250ZW50RE9NLCBub2RlRE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWMsIHZpZXcsIHBvcyArIDEpIH1cbiAgICBlbHNlIGlmIChub2RlLmlzVGV4dClcbiAgICAgIHsgcmV0dXJuIG5ldyBUZXh0Vmlld0Rlc2MocGFyZW50LCBub2RlLCBvdXRlckRlY28sIGlubmVyRGVjbywgZG9tLCBub2RlRE9NLCB2aWV3KSB9XG4gICAgZWxzZVxuICAgICAgeyByZXR1cm4gbmV3IE5vZGVWaWV3RGVzYyhwYXJlbnQsIG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBkb20sIGNvbnRlbnRET00sIG5vZGVET00sIHZpZXcsIHBvcyArIDEpIH1cbiAgfTtcblxuICBOb2RlVmlld0Rlc2MucHJvdG90eXBlLnBhcnNlUnVsZSA9IGZ1bmN0aW9uIHBhcnNlUnVsZSAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAvLyBFeHBlcmltZW50YWwga2x1ZGdlIHRvIGFsbG93IG9wdC1pbiByZS1wYXJzaW5nIG9mIG5vZGVzXG4gICAgaWYgKHRoaXMubm9kZS50eXBlLnNwZWMucmVwYXJzZUluVmlldykgeyByZXR1cm4gbnVsbCB9XG4gICAgLy8gRklYTUUgdGhlIGFzc3VtcHRpb24gdGhhdCB0aGlzIGNhbiBhbHdheXMgcmV0dXJuIHRoZSBjdXJyZW50XG4gICAgLy8gYXR0cnMgbWVhbnMgdGhhdCBpZiB0aGUgdXNlciBzb21laG93IG1hbmFnZXMgdG8gY2hhbmdlIHRoZVxuICAgIC8vIGF0dHJzIGluIHRoZSBkb20sIHRoYXQgd29uJ3QgYmUgcGlja2VkIHVwLiBOb3QgZW50aXJlbHkgc3VyZVxuICAgIC8vIHdoZXRoZXIgdGhpcyBpcyBhIHByb2JsZW1cbiAgICB2YXIgcnVsZSA9IHtub2RlOiB0aGlzLm5vZGUudHlwZS5uYW1lLCBhdHRyczogdGhpcy5ub2RlLmF0dHJzfTtcbiAgICBpZiAodGhpcy5ub2RlLnR5cGUuc3BlYy5jb2RlKSB7IHJ1bGUucHJlc2VydmVXaGl0ZXNwYWNlID0gXCJmdWxsXCI7IH1cbiAgICBpZiAodGhpcy5jb250ZW50RE9NICYmICF0aGlzLmNvbnRlbnRMb3N0KSB7IHJ1bGUuY29udGVudEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRET007IH1cbiAgICBlbHNlIHsgcnVsZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLmNvbnRlbnRET00gPyBGcmFnbWVudC5lbXB0eSA6IHRoaXMkMS5ub2RlLmNvbnRlbnQ7IH07IH1cbiAgICByZXR1cm4gcnVsZVxuICB9O1xuXG4gIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUubWF0Y2hlc05vZGUgPSBmdW5jdGlvbiBtYXRjaGVzTm9kZSAobm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28pIHtcbiAgICByZXR1cm4gdGhpcy5kaXJ0eSA9PSBOT1RfRElSVFkgJiYgbm9kZS5lcSh0aGlzLm5vZGUpICYmXG4gICAgICBzYW1lT3V0ZXJEZWNvKG91dGVyRGVjbywgdGhpcy5vdXRlckRlY28pICYmIGlubmVyRGVjby5lcSh0aGlzLmlubmVyRGVjbylcbiAgfTtcblxuICBwcm90b3R5cGVBY2Nlc3NvcnMkMy5zaXplLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMubm9kZS5ub2RlU2l6ZSB9O1xuXG4gIHByb3RvdHlwZUFjY2Vzc29ycyQzLmJvcmRlci5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLm5vZGUuaXNMZWFmID8gMCA6IDEgfTtcblxuICAvLyBTeW5jcyBgdGhpcy5jaGlsZHJlbmAgdG8gbWF0Y2ggYHRoaXMubm9kZS5jb250ZW50YCBhbmQgdGhlIGxvY2FsXG4gIC8vIGRlY29yYXRpb25zLCBwb3NzaWJseSBpbnRyb2R1Y2luZyBuZXN0aW5nIGZvciBtYXJrcy4gVGhlbiwgaW4gYVxuICAvLyBzZXBhcmF0ZSBzdGVwLCBzeW5jcyB0aGUgRE9NIGluc2lkZSBgdGhpcy5jb250ZW50RE9NYCB0b1xuICAvLyBgdGhpcy5jaGlsZHJlbmAuXG4gIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUudXBkYXRlQ2hpbGRyZW4gPSBmdW5jdGlvbiB1cGRhdGVDaGlsZHJlbiAodmlldywgcG9zKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgaW5saW5lID0gdGhpcy5ub2RlLmlubGluZUNvbnRlbnQsIG9mZiA9IHBvcztcbiAgICB2YXIgY29tcG9zaXRpb24gPSBpbmxpbmUgJiYgdmlldy5jb21wb3NpbmcgJiYgdGhpcy5sb2NhbENvbXBvc2l0aW9uTm9kZSh2aWV3LCBwb3MpO1xuICAgIHZhciB1cGRhdGVyID0gbmV3IFZpZXdUcmVlVXBkYXRlcih0aGlzLCBjb21wb3NpdGlvbiAmJiBjb21wb3NpdGlvbi5ub2RlKTtcbiAgICBpdGVyRGVjbyh0aGlzLm5vZGUsIHRoaXMuaW5uZXJEZWNvLCBmdW5jdGlvbiAod2lkZ2V0LCBpLCBpbnNpZGVOb2RlKSB7XG4gICAgICBpZiAod2lkZ2V0LnNwZWMubWFya3MpXG4gICAgICAgIHsgdXBkYXRlci5zeW5jVG9NYXJrcyh3aWRnZXQuc3BlYy5tYXJrcywgaW5saW5lLCB2aWV3KTsgfVxuICAgICAgZWxzZSBpZiAod2lkZ2V0LnR5cGUuc2lkZSA+PSAwICYmICFpbnNpZGVOb2RlKVxuICAgICAgICB7IHVwZGF0ZXIuc3luY1RvTWFya3MoaSA9PSB0aGlzJDEubm9kZS5jaGlsZENvdW50ID8gTWFyay5ub25lIDogdGhpcyQxLm5vZGUuY2hpbGQoaSkubWFya3MsIGlubGluZSwgdmlldyk7IH1cbiAgICAgIC8vIElmIHRoZSBuZXh0IG5vZGUgaXMgYSBkZXNjIG1hdGNoaW5nIHRoaXMgd2lkZ2V0LCByZXVzZSBpdCxcbiAgICAgIC8vIG90aGVyd2lzZSBpbnNlcnQgdGhlIHdpZGdldCBhcyBhIG5ldyB2aWV3IGRlc2MuXG4gICAgICB1cGRhdGVyLnBsYWNlV2lkZ2V0KHdpZGdldCwgdmlldywgb2ZmKTtcbiAgICB9LCBmdW5jdGlvbiAoY2hpbGQsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBpKSB7XG4gICAgICAvLyBNYWtlIHN1cmUgdGhlIHdyYXBwaW5nIG1hcmsgZGVzY3MgbWF0Y2ggdGhlIG5vZGUncyBtYXJrcy5cbiAgICAgIHVwZGF0ZXIuc3luY1RvTWFya3MoY2hpbGQubWFya3MsIGlubGluZSwgdmlldyk7XG4gICAgICAvLyBFaXRoZXIgZmluZCBhbiBleGlzdGluZyBkZXNjIHRoYXQgZXhhY3RseSBtYXRjaGVzIHRoaXMgbm9kZSxcbiAgICAgIC8vIGFuZCBkcm9wIHRoZSBkZXNjcyBiZWZvcmUgaXQuXG4gICAgICB1cGRhdGVyLmZpbmROb2RlTWF0Y2goY2hpbGQsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBpKSB8fFxuICAgICAgICAvLyBPciB0cnkgdXBkYXRpbmcgdGhlIG5leHQgZGVzYyB0byByZWZsZWN0IHRoaXMgbm9kZS5cbiAgICAgICAgdXBkYXRlci51cGRhdGVOZXh0Tm9kZShjaGlsZCwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcsIGkpIHx8XG4gICAgICAgIC8vIE9yIGp1c3QgYWRkIGl0IGFzIGEgbmV3IGRlc2MuXG4gICAgICAgIHVwZGF0ZXIuYWRkTm9kZShjaGlsZCwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcsIG9mZik7XG4gICAgICBvZmYgKz0gY2hpbGQubm9kZVNpemU7XG4gICAgfSk7XG4gICAgLy8gRHJvcCBhbGwgcmVtYWluaW5nIGRlc2NzIGFmdGVyIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgIHVwZGF0ZXIuc3luY1RvTWFya3Mobm90aGluZywgaW5saW5lLCB2aWV3KTtcbiAgICBpZiAodGhpcy5ub2RlLmlzVGV4dGJsb2NrKSB7IHVwZGF0ZXIuYWRkVGV4dGJsb2NrSGFja3MoKTsgfVxuICAgIHVwZGF0ZXIuZGVzdHJveVJlc3QoKTtcblxuICAgIC8vIFN5bmMgdGhlIERPTSBpZiBhbnl0aGluZyBjaGFuZ2VkXG4gICAgaWYgKHVwZGF0ZXIuY2hhbmdlZCB8fCB0aGlzLmRpcnR5ID09IENPTlRFTlRfRElSVFkpIHtcbiAgICAgIC8vIE1heSBoYXZlIHRvIHByb3RlY3QgZm9jdXNlZCBET00gZnJvbSBiZWluZyBjaGFuZ2VkIGlmIGEgY29tcG9zaXRpb24gaXMgYWN0aXZlXG4gICAgICBpZiAoY29tcG9zaXRpb24pIHsgdGhpcy5wcm90ZWN0TG9jYWxDb21wb3NpdGlvbih2aWV3LCBjb21wb3NpdGlvbik7IH1cbiAgICAgIHJlbmRlckRlc2NzKHRoaXMuY29udGVudERPTSwgdGhpcy5jaGlsZHJlbiwgdmlldyk7XG4gICAgICBpZiAocmVzdWx0LmlvcykgeyBpb3NIYWNrcyh0aGlzLmRvbSk7IH1cbiAgICB9XG4gIH07XG5cbiAgTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5sb2NhbENvbXBvc2l0aW9uTm9kZSA9IGZ1bmN0aW9uIGxvY2FsQ29tcG9zaXRpb25Ob2RlICh2aWV3LCBwb3MpIHtcbiAgICAvLyBPbmx5IGRvIHNvbWV0aGluZyBpZiBib3RoIHRoZSBzZWxlY3Rpb24gYW5kIGEgZm9jdXNlZCB0ZXh0IG5vZGVcbiAgICAvLyBhcmUgaW5zaWRlIG9mIHRoaXMgbm9kZSwgYW5kIHRoZSBub2RlIGlzbid0IGFscmVhZHkgcGFydCBvZiBhXG4gICAgLy8gdmlldyB0aGF0J3MgYSBjaGlsZCBvZiB0aGlzIHZpZXdcbiAgICB2YXIgcmVmID0gdmlldy5zdGF0ZS5zZWxlY3Rpb247XG4gICAgdmFyIGZyb20gPSByZWYuZnJvbTtcbiAgICB2YXIgdG8gPSByZWYudG87XG4gICAgaWYgKCEodmlldy5zdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB8fCBmcm9tIDwgcG9zIHx8IHRvID4gcG9zICsgdGhpcy5ub2RlLmNvbnRlbnQuc2l6ZSkgeyByZXR1cm4gfVxuICAgIHZhciBzZWwgPSB2aWV3LnJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgdmFyIHRleHROb2RlID0gbmVhcmJ5VGV4dE5vZGUoc2VsLmZvY3VzTm9kZSwgc2VsLmZvY3VzT2Zmc2V0KTtcbiAgICBpZiAoIXRleHROb2RlIHx8ICF0aGlzLmRvbS5jb250YWlucyh0ZXh0Tm9kZS5wYXJlbnROb2RlKSkgeyByZXR1cm4gfVxuXG4gICAgLy8gRmluZCB0aGUgdGV4dCBpbiB0aGUgZm9jdXNlZCBub2RlIGluIHRoZSBub2RlLCBzdG9wIGlmIGl0J3Mgbm90XG4gICAgLy8gdGhlcmUgKG1heSBoYXZlIGJlZW4gbW9kaWZpZWQgdGhyb3VnaCBvdGhlciBtZWFucywgaW4gd2hpY2hcbiAgICAvLyBjYXNlIGl0IHNob3VsZCBvdmVyd3JpdHRlbilcbiAgICB2YXIgdGV4dCA9IHRleHROb2RlLm5vZGVWYWx1ZTtcbiAgICB2YXIgdGV4dFBvcyA9IGZpbmRUZXh0SW5GcmFnbWVudCh0aGlzLm5vZGUuY29udGVudCwgdGV4dCwgZnJvbSAtIHBvcywgdG8gLSBwb3MpO1xuXG4gICAgcmV0dXJuIHRleHRQb3MgPCAwID8gbnVsbCA6IHtub2RlOiB0ZXh0Tm9kZSwgcG9zOiB0ZXh0UG9zLCB0ZXh0OiB0ZXh0fVxuICB9O1xuXG4gIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUucHJvdGVjdExvY2FsQ29tcG9zaXRpb24gPSBmdW5jdGlvbiBwcm90ZWN0TG9jYWxDb21wb3NpdGlvbiAodmlldywgcmVmKSB7XG4gICAgdmFyIG5vZGUgPSByZWYubm9kZTtcbiAgICB2YXIgcG9zID0gcmVmLnBvcztcbiAgICB2YXIgdGV4dCA9IHJlZi50ZXh0O1xuXG4gICAgLy8gVGhlIG5vZGUgaXMgYWxyZWFkeSBwYXJ0IG9mIGEgbG9jYWwgdmlldyBkZXNjLCBsZWF2ZSBpdCB0aGVyZVxuICAgIGlmICh0aGlzLmdldERlc2Mobm9kZSkpIHsgcmV0dXJuIH1cblxuICAgIC8vIENyZWF0ZSBhIGNvbXBvc2l0aW9uIHZpZXcgZm9yIHRoZSBvcnBoYW5lZCBub2Rlc1xuICAgIHZhciB0b3BOb2RlID0gbm9kZTtcbiAgICBmb3IgKDs7IHRvcE5vZGUgPSB0b3BOb2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIGlmICh0b3BOb2RlLnBhcmVudE5vZGUgPT0gdGhpcy5jb250ZW50RE9NKSB7IGJyZWFrIH1cbiAgICAgIHdoaWxlICh0b3BOb2RlLnByZXZpb3VzU2libGluZykgeyB0b3BOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG9wTm9kZS5wcmV2aW91c1NpYmxpbmcpOyB9XG4gICAgICB3aGlsZSAodG9wTm9kZS5uZXh0U2libGluZykgeyB0b3BOb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodG9wTm9kZS5uZXh0U2libGluZyk7IH1cbiAgICAgIGlmICh0b3BOb2RlLnBtVmlld0Rlc2MpIHsgdG9wTm9kZS5wbVZpZXdEZXNjID0gbnVsbDsgfVxuICAgIH1cbiAgICB2YXIgZGVzYyA9IG5ldyBDb21wb3NpdGlvblZpZXdEZXNjKHRoaXMsIHRvcE5vZGUsIG5vZGUsIHRleHQpO1xuICAgIHZpZXcuY29tcG9zaXRpb25Ob2Rlcy5wdXNoKGRlc2MpO1xuXG4gICAgLy8gUGF0Y2ggdXAgdGhpcy5jaGlsZHJlbiB0byBjb250YWluIHRoZSBjb21wb3NpdGlvbiB2aWV3XG4gICAgdGhpcy5jaGlsZHJlbiA9IHJlcGxhY2VOb2Rlcyh0aGlzLmNoaWxkcmVuLCBwb3MsIHBvcyArIHRleHQubGVuZ3RoLCB2aWV3LCBkZXNjKTtcbiAgfTtcblxuICAvLyA6IChOb2RlLCBbRGVjb3JhdGlvbl0sIERlY29yYXRpb25Tb3VyY2UsIEVkaXRvclZpZXcpIOKGkiBib29sXG4gIC8vIElmIHRoaXMgZGVzYyBiZSB1cGRhdGVkIHRvIG1hdGNoIHRoZSBnaXZlbiBub2RlIGRlY29yYXRpb24sXG4gIC8vIGRvIHNvIGFuZCByZXR1cm4gdHJ1ZS5cbiAgTm9kZVZpZXdEZXNjLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCB2aWV3KSB7XG4gICAgaWYgKHRoaXMuZGlydHkgPT0gTk9ERV9ESVJUWSB8fFxuICAgICAgICAhbm9kZS5zYW1lTWFya3VwKHRoaXMubm9kZSkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnVwZGF0ZUlubmVyKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCB2aWV3KTtcbiAgICByZXR1cm4gdHJ1ZVxuICB9O1xuXG4gIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUudXBkYXRlSW5uZXIgPSBmdW5jdGlvbiB1cGRhdGVJbm5lciAobm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcpIHtcbiAgICB0aGlzLnVwZGF0ZU91dGVyRGVjbyhvdXRlckRlY28pO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy5pbm5lckRlY28gPSBpbm5lckRlY287XG4gICAgaWYgKHRoaXMuY29udGVudERPTSkgeyB0aGlzLnVwZGF0ZUNoaWxkcmVuKHZpZXcsIHRoaXMucG9zQXRTdGFydCk7IH1cbiAgICB0aGlzLmRpcnR5ID0gTk9UX0RJUlRZO1xuICB9O1xuXG4gIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUudXBkYXRlT3V0ZXJEZWNvID0gZnVuY3Rpb24gdXBkYXRlT3V0ZXJEZWNvIChvdXRlckRlY28pIHtcbiAgICBpZiAoc2FtZU91dGVyRGVjbyhvdXRlckRlY28sIHRoaXMub3V0ZXJEZWNvKSkgeyByZXR1cm4gfVxuICAgIHZhciBuZWVkc1dyYXAgPSB0aGlzLm5vZGVET00ubm9kZVR5cGUgIT0gMTtcbiAgICB2YXIgb2xkRE9NID0gdGhpcy5kb207XG4gICAgdGhpcy5kb20gPSBwYXRjaE91dGVyRGVjbyh0aGlzLmRvbSwgdGhpcy5ub2RlRE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZU91dGVyRGVjbyh0aGlzLm91dGVyRGVjbywgdGhpcy5ub2RlLCBuZWVkc1dyYXApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHV0ZU91dGVyRGVjbyhvdXRlckRlY28sIHRoaXMubm9kZSwgbmVlZHNXcmFwKSk7XG4gICAgaWYgKHRoaXMuZG9tICE9IG9sZERPTSkge1xuICAgICAgb2xkRE9NLnBtVmlld0Rlc2MgPSBudWxsO1xuICAgICAgdGhpcy5kb20ucG1WaWV3RGVzYyA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMub3V0ZXJEZWNvID0gb3V0ZXJEZWNvO1xuICB9O1xuXG4gIC8vIE1hcmsgdGhpcyBub2RlIGFzIGJlaW5nIHRoZSBzZWxlY3RlZCBub2RlLlxuICBOb2RlVmlld0Rlc2MucHJvdG90eXBlLnNlbGVjdE5vZGUgPSBmdW5jdGlvbiBzZWxlY3ROb2RlICgpIHtcbiAgICB0aGlzLm5vZGVET00uY2xhc3NMaXN0LmFkZChcIlByb3NlTWlycm9yLXNlbGVjdGVkbm9kZVwiKTtcbiAgICBpZiAodGhpcy5jb250ZW50RE9NIHx8ICF0aGlzLm5vZGUudHlwZS5zcGVjLmRyYWdnYWJsZSkgeyB0aGlzLmRvbS5kcmFnZ2FibGUgPSB0cnVlOyB9XG4gIH07XG5cbiAgLy8gUmVtb3ZlIHNlbGVjdGVkIG5vZGUgbWFya2luZyBmcm9tIHRoaXMgbm9kZS5cbiAgTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5kZXNlbGVjdE5vZGUgPSBmdW5jdGlvbiBkZXNlbGVjdE5vZGUgKCkge1xuICAgIHRoaXMubm9kZURPTS5jbGFzc0xpc3QucmVtb3ZlKFwiUHJvc2VNaXJyb3Itc2VsZWN0ZWRub2RlXCIpO1xuICAgIGlmICh0aGlzLmNvbnRlbnRET00gfHwgIXRoaXMubm9kZS50eXBlLnNwZWMuZHJhZ2dhYmxlKSB7IHRoaXMuZG9tLnJlbW92ZUF0dHJpYnV0ZShcImRyYWdnYWJsZVwiKTsgfVxuICB9O1xuXG4gIHByb3RvdHlwZUFjY2Vzc29ycyQzLmRvbUF0b20uZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5ub2RlLmlzQXRvbSB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBOb2RlVmlld0Rlc2MucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMkMyApO1xuXG4gIHJldHVybiBOb2RlVmlld0Rlc2M7XG59KFZpZXdEZXNjKSk7XG5cbi8vIENyZWF0ZSBhIHZpZXcgZGVzYyBmb3IgdGhlIHRvcC1sZXZlbCBkb2N1bWVudCBub2RlLCB0byBiZSBleHBvcnRlZFxuLy8gYW5kIHVzZWQgYnkgdGhlIHZpZXcgY2xhc3MuXG5mdW5jdGlvbiBkb2NWaWV3RGVzYyhkb2MsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBkb20sIHZpZXcpIHtcbiAgYXBwbHlPdXRlckRlY28oZG9tLCBvdXRlckRlY28sIGRvYyk7XG4gIHJldHVybiBuZXcgTm9kZVZpZXdEZXNjKG51bGwsIGRvYywgb3V0ZXJEZWNvLCBpbm5lckRlY28sIGRvbSwgZG9tLCBkb20sIHZpZXcsIDApXG59XG5cbnZhciBUZXh0Vmlld0Rlc2MgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChOb2RlVmlld0Rlc2MpIHtcbiAgZnVuY3Rpb24gVGV4dFZpZXdEZXNjKHBhcmVudCwgbm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIGRvbSwgbm9kZURPTSwgdmlldykge1xuICAgIE5vZGVWaWV3RGVzYy5jYWxsKHRoaXMsIHBhcmVudCwgbm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIGRvbSwgbnVsbCwgbm9kZURPTSwgdmlldyk7XG4gIH1cblxuICBpZiAoIE5vZGVWaWV3RGVzYyApIFRleHRWaWV3RGVzYy5fX3Byb3RvX18gPSBOb2RlVmlld0Rlc2M7XG4gIFRleHRWaWV3RGVzYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBOb2RlVmlld0Rlc2MgJiYgTm9kZVZpZXdEZXNjLnByb3RvdHlwZSApO1xuICBUZXh0Vmlld0Rlc2MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGV4dFZpZXdEZXNjO1xuXG4gIHZhciBwcm90b3R5cGVBY2Nlc3NvcnMkNCA9IHsgZG9tQXRvbTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIFRleHRWaWV3RGVzYy5wcm90b3R5cGUucGFyc2VSdWxlID0gZnVuY3Rpb24gcGFyc2VSdWxlICgpIHtcbiAgICB2YXIgc2tpcCA9IHRoaXMubm9kZURPTS5wYXJlbnROb2RlO1xuICAgIHdoaWxlIChza2lwICYmIHNraXAgIT0gdGhpcy5kb20gJiYgIXNraXAucG1Jc0RlY28pIHsgc2tpcCA9IHNraXAucGFyZW50Tm9kZTsgfVxuICAgIHJldHVybiB7c2tpcDogc2tpcCB8fCB0cnVlfVxuICB9O1xuXG4gIFRleHRWaWV3RGVzYy5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChub2RlLCBvdXRlckRlY28sIF8sIHZpZXcpIHtcbiAgICBpZiAodGhpcy5kaXJ0eSA9PSBOT0RFX0RJUlRZIHx8ICh0aGlzLmRpcnR5ICE9IE5PVF9ESVJUWSAmJiAhdGhpcy5pblBhcmVudCgpKSB8fFxuICAgICAgICAhbm9kZS5zYW1lTWFya3VwKHRoaXMubm9kZSkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnVwZGF0ZU91dGVyRGVjbyhvdXRlckRlY28pO1xuICAgIGlmICgodGhpcy5kaXJ0eSAhPSBOT1RfRElSVFkgfHwgbm9kZS50ZXh0ICE9IHRoaXMubm9kZS50ZXh0KSAmJiBub2RlLnRleHQgIT0gdGhpcy5ub2RlRE9NLm5vZGVWYWx1ZSkge1xuICAgICAgdGhpcy5ub2RlRE9NLm5vZGVWYWx1ZSA9IG5vZGUudGV4dDtcbiAgICAgIGlmICh2aWV3LnRyYWNrV3JpdGVzID09IHRoaXMubm9kZURPTSkgeyB2aWV3LnRyYWNrV3JpdGVzID0gbnVsbDsgfVxuICAgIH1cbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMuZGlydHkgPSBOT1RfRElSVFk7XG4gICAgcmV0dXJuIHRydWVcbiAgfTtcblxuICBUZXh0Vmlld0Rlc2MucHJvdG90eXBlLmluUGFyZW50ID0gZnVuY3Rpb24gaW5QYXJlbnQgKCkge1xuICAgIHZhciBwYXJlbnRET00gPSB0aGlzLnBhcmVudC5jb250ZW50RE9NO1xuICAgIGZvciAodmFyIG4gPSB0aGlzLm5vZGVET007IG47IG4gPSBuLnBhcmVudE5vZGUpIHsgaWYgKG4gPT0gcGFyZW50RE9NKSB7IHJldHVybiB0cnVlIH0gfVxuICAgIHJldHVybiBmYWxzZVxuICB9O1xuXG4gIFRleHRWaWV3RGVzYy5wcm90b3R5cGUuZG9tRnJvbVBvcyA9IGZ1bmN0aW9uIGRvbUZyb21Qb3MgKHBvcykge1xuICAgIHJldHVybiB7bm9kZTogdGhpcy5ub2RlRE9NLCBvZmZzZXQ6IHBvc31cbiAgfTtcblxuICBUZXh0Vmlld0Rlc2MucHJvdG90eXBlLmxvY2FsUG9zRnJvbURPTSA9IGZ1bmN0aW9uIGxvY2FsUG9zRnJvbURPTSAoZG9tLCBvZmZzZXQsIGJpYXMpIHtcbiAgICBpZiAoZG9tID09IHRoaXMubm9kZURPTSkgeyByZXR1cm4gdGhpcy5wb3NBdFN0YXJ0ICsgTWF0aC5taW4ob2Zmc2V0LCB0aGlzLm5vZGUudGV4dC5sZW5ndGgpIH1cbiAgICByZXR1cm4gTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5sb2NhbFBvc0Zyb21ET00uY2FsbCh0aGlzLCBkb20sIG9mZnNldCwgYmlhcylcbiAgfTtcblxuICBUZXh0Vmlld0Rlc2MucHJvdG90eXBlLmlnbm9yZU11dGF0aW9uID0gZnVuY3Rpb24gaWdub3JlTXV0YXRpb24gKG11dGF0aW9uKSB7XG4gICAgcmV0dXJuIG11dGF0aW9uLnR5cGUgIT0gXCJjaGFyYWN0ZXJEYXRhXCIgJiYgbXV0YXRpb24udHlwZSAhPSBcInNlbGVjdGlvblwiXG4gIH07XG5cbiAgVGV4dFZpZXdEZXNjLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChmcm9tLCB0bywgdmlldykge1xuICAgIHZhciBub2RlID0gdGhpcy5ub2RlLmN1dChmcm9tLCB0byksIGRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUudGV4dCk7XG4gICAgcmV0dXJuIG5ldyBUZXh0Vmlld0Rlc2ModGhpcy5wYXJlbnQsIG5vZGUsIHRoaXMub3V0ZXJEZWNvLCB0aGlzLmlubmVyRGVjbywgZG9tLCBkb20sIHZpZXcpXG4gIH07XG5cbiAgcHJvdG90eXBlQWNjZXNzb3JzJDQuZG9tQXRvbS5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZSB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBUZXh0Vmlld0Rlc2MucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMkNCApO1xuXG4gIHJldHVybiBUZXh0Vmlld0Rlc2M7XG59KE5vZGVWaWV3RGVzYykpO1xuXG4vLyBBIGR1bW15IGRlc2MgdXNlZCB0byB0YWcgdHJhaWxpbmcgQlIgb3Igc3BhbiBub2RlcyBjcmVhdGVkIHRvIHdvcmtcbi8vIGFyb3VuZCBjb250ZW50RWRpdGFibGUgdGVycmlibGVuZXNzLlxudmFyIEJSSGFja1ZpZXdEZXNjID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoVmlld0Rlc2MpIHtcbiAgZnVuY3Rpb24gQlJIYWNrVmlld0Rlc2MgKCkge1xuICAgIFZpZXdEZXNjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBpZiAoIFZpZXdEZXNjICkgQlJIYWNrVmlld0Rlc2MuX19wcm90b19fID0gVmlld0Rlc2M7XG4gIEJSSGFja1ZpZXdEZXNjLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFZpZXdEZXNjICYmIFZpZXdEZXNjLnByb3RvdHlwZSApO1xuICBCUkhhY2tWaWV3RGVzYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCUkhhY2tWaWV3RGVzYztcblxuICB2YXIgcHJvdG90eXBlQWNjZXNzb3JzJDUgPSB7IGRvbUF0b206IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxuICBCUkhhY2tWaWV3RGVzYy5wcm90b3R5cGUucGFyc2VSdWxlID0gZnVuY3Rpb24gcGFyc2VSdWxlICgpIHsgcmV0dXJuIHtpZ25vcmU6IHRydWV9IH07XG4gIEJSSGFja1ZpZXdEZXNjLnByb3RvdHlwZS5tYXRjaGVzSGFjayA9IGZ1bmN0aW9uIG1hdGNoZXNIYWNrICgpIHsgcmV0dXJuIHRoaXMuZGlydHkgPT0gTk9UX0RJUlRZIH07XG4gIHByb3RvdHlwZUFjY2Vzc29ycyQ1LmRvbUF0b20uZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZSB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBCUkhhY2tWaWV3RGVzYy5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyQ1ICk7XG5cbiAgcmV0dXJuIEJSSGFja1ZpZXdEZXNjO1xufShWaWV3RGVzYykpO1xuXG4vLyBBIHNlcGFyYXRlIHN1YmNsYXNzIGlzIHVzZWQgZm9yIGN1c3RvbWl6ZWQgbm9kZSB2aWV3cywgc28gdGhhdCB0aGVcbi8vIGV4dHJhIGNoZWNrcyBvbmx5IGhhdmUgdG8gYmUgbWFkZSBmb3Igbm9kZXMgdGhhdCBhcmUgYWN0dWFsbHlcbi8vIGN1c3RvbWl6ZWQuXG52YXIgQ3VzdG9tTm9kZVZpZXdEZXNjID0gLypAX19QVVJFX18qLyhmdW5jdGlvbiAoTm9kZVZpZXdEZXNjKSB7XG4gIGZ1bmN0aW9uIEN1c3RvbU5vZGVWaWV3RGVzYyhwYXJlbnQsIG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBkb20sIGNvbnRlbnRET00sIG5vZGVET00sIHNwZWMsIHZpZXcsIHBvcykge1xuICAgIE5vZGVWaWV3RGVzYy5jYWxsKHRoaXMsIHBhcmVudCwgbm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIGRvbSwgY29udGVudERPTSwgbm9kZURPTSwgdmlldywgcG9zKTtcbiAgICB0aGlzLnNwZWMgPSBzcGVjO1xuICB9XG5cbiAgaWYgKCBOb2RlVmlld0Rlc2MgKSBDdXN0b21Ob2RlVmlld0Rlc2MuX19wcm90b19fID0gTm9kZVZpZXdEZXNjO1xuICBDdXN0b21Ob2RlVmlld0Rlc2MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggTm9kZVZpZXdEZXNjICYmIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUgKTtcbiAgQ3VzdG9tTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEN1c3RvbU5vZGVWaWV3RGVzYztcblxuICAvLyBBIGN1c3RvbSBgdXBkYXRlYCBtZXRob2QgZ2V0cyB0byBkZWNpZGUgd2hldGhlciB0aGUgdXBkYXRlIGdvZXNcbiAgLy8gdGhyb3VnaC4gSWYgaXQgZG9lcywgYW5kIHRoZXJlJ3MgYSBgY29udGVudERPTWAgbm9kZSwgb3VyIGxvZ2ljXG4gIC8vIHVwZGF0ZXMgdGhlIGNoaWxkcmVuLlxuICBDdXN0b21Ob2RlVmlld0Rlc2MucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAobm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcpIHtcbiAgICBpZiAodGhpcy5kaXJ0eSA9PSBOT0RFX0RJUlRZKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKHRoaXMuc3BlYy51cGRhdGUpIHtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLnNwZWMudXBkYXRlKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvKTtcbiAgICAgIGlmIChyZXN1bHQpIHsgdGhpcy51cGRhdGVJbm5lcihub2RlLCBvdXRlckRlY28sIGlubmVyRGVjbywgdmlldyk7IH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmNvbnRlbnRET00gJiYgIW5vZGUuaXNMZWFmKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgbm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcpXG4gICAgfVxuICB9O1xuXG4gIEN1c3RvbU5vZGVWaWV3RGVzYy5wcm90b3R5cGUuc2VsZWN0Tm9kZSA9IGZ1bmN0aW9uIHNlbGVjdE5vZGUgKCkge1xuICAgIHRoaXMuc3BlYy5zZWxlY3ROb2RlID8gdGhpcy5zcGVjLnNlbGVjdE5vZGUoKSA6IE5vZGVWaWV3RGVzYy5wcm90b3R5cGUuc2VsZWN0Tm9kZS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIEN1c3RvbU5vZGVWaWV3RGVzYy5wcm90b3R5cGUuZGVzZWxlY3ROb2RlID0gZnVuY3Rpb24gZGVzZWxlY3ROb2RlICgpIHtcbiAgICB0aGlzLnNwZWMuZGVzZWxlY3ROb2RlID8gdGhpcy5zcGVjLmRlc2VsZWN0Tm9kZSgpIDogTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5kZXNlbGVjdE5vZGUuY2FsbCh0aGlzKTtcbiAgfTtcblxuICBDdXN0b21Ob2RlVmlld0Rlc2MucHJvdG90eXBlLnNldFNlbGVjdGlvbiA9IGZ1bmN0aW9uIHNldFNlbGVjdGlvbiAoYW5jaG9yLCBoZWFkLCByb290LCBmb3JjZSkge1xuICAgIHRoaXMuc3BlYy5zZXRTZWxlY3Rpb24gPyB0aGlzLnNwZWMuc2V0U2VsZWN0aW9uKGFuY2hvciwgaGVhZCwgcm9vdClcbiAgICAgIDogTm9kZVZpZXdEZXNjLnByb3RvdHlwZS5zZXRTZWxlY3Rpb24uY2FsbCh0aGlzLCBhbmNob3IsIGhlYWQsIHJvb3QsIGZvcmNlKTtcbiAgfTtcblxuICBDdXN0b21Ob2RlVmlld0Rlc2MucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy5zcGVjLmRlc3Ryb3kpIHsgdGhpcy5zcGVjLmRlc3Ryb3koKTsgfVxuICAgIE5vZGVWaWV3RGVzYy5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIEN1c3RvbU5vZGVWaWV3RGVzYy5wcm90b3R5cGUuc3RvcEV2ZW50ID0gZnVuY3Rpb24gc3RvcEV2ZW50IChldmVudCkge1xuICAgIHJldHVybiB0aGlzLnNwZWMuc3RvcEV2ZW50ID8gdGhpcy5zcGVjLnN0b3BFdmVudChldmVudCkgOiBmYWxzZVxuICB9O1xuXG4gIEN1c3RvbU5vZGVWaWV3RGVzYy5wcm90b3R5cGUuaWdub3JlTXV0YXRpb24gPSBmdW5jdGlvbiBpZ25vcmVNdXRhdGlvbiAobXV0YXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5zcGVjLmlnbm9yZU11dGF0aW9uID8gdGhpcy5zcGVjLmlnbm9yZU11dGF0aW9uKG11dGF0aW9uKSA6IE5vZGVWaWV3RGVzYy5wcm90b3R5cGUuaWdub3JlTXV0YXRpb24uY2FsbCh0aGlzLCBtdXRhdGlvbilcbiAgfTtcblxuICByZXR1cm4gQ3VzdG9tTm9kZVZpZXdEZXNjO1xufShOb2RlVmlld0Rlc2MpKTtcblxuLy8gOiAoZG9tLk5vZGUsIFtWaWV3RGVzY10pXG4vLyBTeW5jIHRoZSBjb250ZW50IG9mIHRoZSBnaXZlbiBET00gbm9kZSB3aXRoIHRoZSBub2RlcyBhc3NvY2lhdGVkXG4vLyB3aXRoIHRoZSBnaXZlbiBhcnJheSBvZiB2aWV3IGRlc2NzLCByZWN1cnNpbmcgaW50byBtYXJrIGRlc2NzXG4vLyBiZWNhdXNlIHRoaXMgc2hvdWxkIHN5bmMgdGhlIHN1YnRyZWUgZm9yIGEgd2hvbGUgbm9kZSBhdCBhIHRpbWUuXG5mdW5jdGlvbiByZW5kZXJEZXNjcyhwYXJlbnRET00sIGRlc2NzLCB2aWV3KSB7XG4gIHZhciBkb20gPSBwYXJlbnRET00uZmlyc3RDaGlsZCwgd3JpdHRlbiA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlc2NzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2MgPSBkZXNjc1tpXSwgY2hpbGRET00gPSBkZXNjLmRvbTtcbiAgICBpZiAoY2hpbGRET00ucGFyZW50Tm9kZSA9PSBwYXJlbnRET00pIHtcbiAgICAgIHdoaWxlIChjaGlsZERPTSAhPSBkb20pIHsgZG9tID0gcm0oZG9tKTsgd3JpdHRlbiA9IHRydWU7IH1cbiAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgd3JpdHRlbiA9IHRydWU7XG4gICAgICBwYXJlbnRET00uaW5zZXJ0QmVmb3JlKGNoaWxkRE9NLCBkb20pO1xuICAgIH1cbiAgICBpZiAoZGVzYyBpbnN0YW5jZW9mIE1hcmtWaWV3RGVzYykge1xuICAgICAgdmFyIHBvcyA9IGRvbSA/IGRvbS5wcmV2aW91c1NpYmxpbmcgOiBwYXJlbnRET00ubGFzdENoaWxkO1xuICAgICAgcmVuZGVyRGVzY3MoZGVzYy5jb250ZW50RE9NLCBkZXNjLmNoaWxkcmVuLCB2aWV3KTtcbiAgICAgIGRvbSA9IHBvcyA/IHBvcy5uZXh0U2libGluZyA6IHBhcmVudERPTS5maXJzdENoaWxkO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoZG9tKSB7IGRvbSA9IHJtKGRvbSk7IHdyaXR0ZW4gPSB0cnVlOyB9XG4gIGlmICh3cml0dGVuICYmIHZpZXcudHJhY2tXcml0ZXMgPT0gcGFyZW50RE9NKSB7IHZpZXcudHJhY2tXcml0ZXMgPSBudWxsOyB9XG59XG5cbmZ1bmN0aW9uIE91dGVyRGVjb0xldmVsKG5vZGVOYW1lKSB7XG4gIGlmIChub2RlTmFtZSkgeyB0aGlzLm5vZGVOYW1lID0gbm9kZU5hbWU7IH1cbn1cbk91dGVyRGVjb0xldmVsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbnZhciBub0RlY28gPSBbbmV3IE91dGVyRGVjb0xldmVsXTtcblxuZnVuY3Rpb24gY29tcHV0ZU91dGVyRGVjbyhvdXRlckRlY28sIG5vZGUsIG5lZWRzV3JhcCkge1xuICBpZiAob3V0ZXJEZWNvLmxlbmd0aCA9PSAwKSB7IHJldHVybiBub0RlY28gfVxuXG4gIHZhciB0b3AgPSBuZWVkc1dyYXAgPyBub0RlY29bMF0gOiBuZXcgT3V0ZXJEZWNvTGV2ZWwsIHJlc3VsdCA9IFt0b3BdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb3V0ZXJEZWNvLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGF0dHJzID0gb3V0ZXJEZWNvW2ldLnR5cGUuYXR0cnM7XG4gICAgaWYgKCFhdHRycykgeyBjb250aW51ZSB9XG4gICAgaWYgKGF0dHJzLm5vZGVOYW1lKVxuICAgICAgeyByZXN1bHQucHVzaCh0b3AgPSBuZXcgT3V0ZXJEZWNvTGV2ZWwoYXR0cnMubm9kZU5hbWUpKTsgfVxuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBhdHRycykge1xuICAgICAgdmFyIHZhbCA9IGF0dHJzW25hbWVdO1xuICAgICAgaWYgKHZhbCA9PSBudWxsKSB7IGNvbnRpbnVlIH1cbiAgICAgIGlmIChuZWVkc1dyYXAgJiYgcmVzdWx0Lmxlbmd0aCA9PSAxKVxuICAgICAgICB7IHJlc3VsdC5wdXNoKHRvcCA9IG5ldyBPdXRlckRlY29MZXZlbChub2RlLmlzSW5saW5lID8gXCJzcGFuXCIgOiBcImRpdlwiKSk7IH1cbiAgICAgIGlmIChuYW1lID09IFwiY2xhc3NcIikgeyB0b3AuY2xhc3MgPSAodG9wLmNsYXNzID8gdG9wLmNsYXNzICsgXCIgXCIgOiBcIlwiKSArIHZhbDsgfVxuICAgICAgZWxzZSBpZiAobmFtZSA9PSBcInN0eWxlXCIpIHsgdG9wLnN0eWxlID0gKHRvcC5zdHlsZSA/IHRvcC5zdHlsZSArIFwiO1wiIDogXCJcIikgKyB2YWw7IH1cbiAgICAgIGVsc2UgaWYgKG5hbWUgIT0gXCJub2RlTmFtZVwiKSB7IHRvcFtuYW1lXSA9IHZhbDsgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gcGF0Y2hPdXRlckRlY28ob3V0ZXJET00sIG5vZGVET00sIHByZXZDb21wdXRlZCwgY3VyQ29tcHV0ZWQpIHtcbiAgLy8gU2hvcnRjdXQgZm9yIHRyaXZpYWwgY2FzZVxuICBpZiAocHJldkNvbXB1dGVkID09IG5vRGVjbyAmJiBjdXJDb21wdXRlZCA9PSBub0RlY28pIHsgcmV0dXJuIG5vZGVET00gfVxuXG4gIHZhciBjdXJET00gPSBub2RlRE9NO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ckNvbXB1dGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlY28gPSBjdXJDb21wdXRlZFtpXSwgcHJldiA9IHByZXZDb21wdXRlZFtpXTtcbiAgICBpZiAoaSkge1xuICAgICAgdmFyIHBhcmVudCA9ICh2b2lkIDApO1xuICAgICAgaWYgKHByZXYgJiYgcHJldi5ub2RlTmFtZSA9PSBkZWNvLm5vZGVOYW1lICYmIGN1ckRPTSAhPSBvdXRlckRPTSAmJlxuICAgICAgICAgIChwYXJlbnQgPSBjdXJET00ucGFyZW50Tm9kZSkgJiYgcGFyZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBkZWNvLm5vZGVOYW1lKSB7XG4gICAgICAgIGN1ckRPTSA9IHBhcmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZGVjby5ub2RlTmFtZSk7XG4gICAgICAgIHBhcmVudC5wbUlzRGVjbyA9IHRydWU7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjdXJET00pO1xuICAgICAgICBwcmV2ID0gbm9EZWNvWzBdO1xuICAgICAgICBjdXJET00gPSBwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGNoQXR0cmlidXRlcyhjdXJET00sIHByZXYgfHwgbm9EZWNvWzBdLCBkZWNvKTtcbiAgfVxuICByZXR1cm4gY3VyRE9NXG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cmlidXRlcyhkb20sIHByZXYsIGN1cikge1xuICBmb3IgKHZhciBuYW1lIGluIHByZXYpXG4gICAgeyBpZiAobmFtZSAhPSBcImNsYXNzXCIgJiYgbmFtZSAhPSBcInN0eWxlXCIgJiYgbmFtZSAhPSBcIm5vZGVOYW1lXCIgJiYgIShuYW1lIGluIGN1cikpXG4gICAgICB7IGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH0gfVxuICBmb3IgKHZhciBuYW1lJDEgaW4gY3VyKVxuICAgIHsgaWYgKG5hbWUkMSAhPSBcImNsYXNzXCIgJiYgbmFtZSQxICE9IFwic3R5bGVcIiAmJiBuYW1lJDEgIT0gXCJub2RlTmFtZVwiICYmIGN1cltuYW1lJDFdICE9IHByZXZbbmFtZSQxXSlcbiAgICAgIHsgZG9tLnNldEF0dHJpYnV0ZShuYW1lJDEsIGN1cltuYW1lJDFdKTsgfSB9XG4gIGlmIChwcmV2LmNsYXNzICE9IGN1ci5jbGFzcykge1xuICAgIHZhciBwcmV2TGlzdCA9IHByZXYuY2xhc3MgPyBwcmV2LmNsYXNzLnNwbGl0KFwiIFwiKSA6IG5vdGhpbmc7XG4gICAgdmFyIGN1ckxpc3QgPSBjdXIuY2xhc3MgPyBjdXIuY2xhc3Muc3BsaXQoXCIgXCIpIDogbm90aGluZztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZMaXN0Lmxlbmd0aDsgaSsrKSB7IGlmIChjdXJMaXN0LmluZGV4T2YocHJldkxpc3RbaV0pID09IC0xKVxuICAgICAgeyBkb20uY2xhc3NMaXN0LnJlbW92ZShwcmV2TGlzdFtpXSk7IH0gfVxuICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGN1ckxpc3QubGVuZ3RoOyBpJDErKykgeyBpZiAocHJldkxpc3QuaW5kZXhPZihjdXJMaXN0W2kkMV0pID09IC0xKVxuICAgICAgeyBkb20uY2xhc3NMaXN0LmFkZChjdXJMaXN0W2kkMV0pOyB9IH1cbiAgfVxuICBpZiAocHJldi5zdHlsZSAhPSBjdXIuc3R5bGUpIHtcbiAgICBpZiAocHJldi5zdHlsZSkge1xuICAgICAgdmFyIHByb3AgPSAvXFxzKihbXFx3XFwtXFx4YTEtXFx1ZmZmZl0rKVxccyo6KD86XCIoPzpcXFxcLnxbXlwiXSkqXCJ8Jyg/OlxcXFwufFteJ10pKid8XFwoLio/XFwpfFteO10pKi9nLCBtO1xuICAgICAgd2hpbGUgKG0gPSBwcm9wLmV4ZWMocHJldi5zdHlsZSkpXG4gICAgICAgIHsgZG9tLnN0eWxlLnJlbW92ZVByb3BlcnR5KG1bMV0pOyB9XG4gICAgfVxuICAgIGlmIChjdXIuc3R5bGUpXG4gICAgICB7IGRvbS5zdHlsZS5jc3NUZXh0ICs9IGN1ci5zdHlsZTsgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5T3V0ZXJEZWNvKGRvbSwgZGVjbywgbm9kZSkge1xuICByZXR1cm4gcGF0Y2hPdXRlckRlY28oZG9tLCBkb20sIG5vRGVjbywgY29tcHV0ZU91dGVyRGVjbyhkZWNvLCBub2RlLCBkb20ubm9kZVR5cGUgIT0gMSkpXG59XG5cbi8vIDogKFtEZWNvcmF0aW9uXSwgW0RlY29yYXRpb25dKSDihpIgYm9vbFxuZnVuY3Rpb24gc2FtZU91dGVyRGVjbyhhLCBiKSB7XG4gIGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgeyByZXR1cm4gZmFsc2UgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHsgaWYgKCFhW2ldLnR5cGUuZXEoYltpXS50eXBlKSkgeyByZXR1cm4gZmFsc2UgfSB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIFJlbW92ZSBhIERPTSBub2RlIGFuZCByZXR1cm4gaXRzIG5leHQgc2libGluZy5cbmZ1bmN0aW9uIHJtKGRvbSkge1xuICB2YXIgbmV4dCA9IGRvbS5uZXh0U2libGluZztcbiAgZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKTtcbiAgcmV0dXJuIG5leHRcbn1cblxuLy8gSGVscGVyIGNsYXNzIGZvciBpbmNyZW1lbnRhbGx5IHVwZGF0aW5nIGEgdHJlZSBvZiBtYXJrIGRlc2NzIGFuZFxuLy8gdGhlIHdpZGdldCBhbmQgbm9kZSBkZXNjcyBpbnNpZGUgb2YgdGhlbS5cbnZhciBWaWV3VHJlZVVwZGF0ZXIgPSBmdW5jdGlvbiBWaWV3VHJlZVVwZGF0ZXIodG9wLCBsb2NrZWROb2RlKSB7XG4gIHRoaXMudG9wID0gdG9wO1xuICB0aGlzLmxvY2sgPSBsb2NrZWROb2RlO1xuICAvLyBJbmRleCBpbnRvIGB0aGlzLnRvcGAncyBjaGlsZCBhcnJheSwgcmVwcmVzZW50cyB0aGUgY3VycmVudFxuICAvLyB1cGRhdGUgcG9zaXRpb24uXG4gIHRoaXMuaW5kZXggPSAwO1xuICAvLyBXaGVuIGVudGVyaW5nIGEgbWFyaywgdGhlIGN1cnJlbnQgdG9wIGFuZCBpbmRleCBhcmUgcHVzaGVkXG4gIC8vIG9udG8gdGhpcy5cbiAgdGhpcy5zdGFjayA9IFtdO1xuICAvLyBUcmFja3Mgd2hldGhlciBhbnl0aGluZyB3YXMgY2hhbmdlZFxuICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcblxuICB2YXIgcHJlID0gcHJlTWF0Y2godG9wLm5vZGUuY29udGVudCwgdG9wLmNoaWxkcmVuKTtcbiAgdGhpcy5wcmVNYXRjaGVkID0gcHJlLm5vZGVzO1xuICB0aGlzLnByZU1hdGNoT2Zmc2V0ID0gcHJlLm9mZnNldDtcbn07XG5cblZpZXdUcmVlVXBkYXRlci5wcm90b3R5cGUuZ2V0UHJlTWF0Y2ggPSBmdW5jdGlvbiBnZXRQcmVNYXRjaCAoaW5kZXgpIHtcbiAgcmV0dXJuIGluZGV4ID49IHRoaXMucHJlTWF0Y2hPZmZzZXQgPyB0aGlzLnByZU1hdGNoZWRbaW5kZXggLSB0aGlzLnByZU1hdGNoT2Zmc2V0XSA6IG51bGxcbn07XG5cbi8vIERlc3Ryb3kgYW5kIHJlbW92ZSB0aGUgY2hpbGRyZW4gYmV0d2VlbiB0aGUgZ2l2ZW4gaW5kaWNlcyBpblxuLy8gYHRoaXMudG9wYC5cblZpZXdUcmVlVXBkYXRlci5wcm90b3R5cGUuZGVzdHJveUJldHdlZW4gPSBmdW5jdGlvbiBkZXN0cm95QmV0d2VlbiAoc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT0gZW5kKSB7IHJldHVybiB9XG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7IHRoaXMudG9wLmNoaWxkcmVuW2ldLmRlc3Ryb3koKTsgfVxuICB0aGlzLnRvcC5jaGlsZHJlbi5zcGxpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0KTtcbiAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbn07XG5cbi8vIERlc3Ryb3kgYWxsIHJlbWFpbmluZyBjaGlsZHJlbiBpbiBgdGhpcy50b3BgLlxuVmlld1RyZWVVcGRhdGVyLnByb3RvdHlwZS5kZXN0cm95UmVzdCA9IGZ1bmN0aW9uIGRlc3Ryb3lSZXN0ICgpIHtcbiAgdGhpcy5kZXN0cm95QmV0d2Vlbih0aGlzLmluZGV4LCB0aGlzLnRvcC5jaGlsZHJlbi5sZW5ndGgpO1xufTtcblxuLy8gOiAoW01hcmtdLCBFZGl0b3JWaWV3KVxuLy8gU3luYyB0aGUgY3VycmVudCBzdGFjayBvZiBtYXJrIGRlc2NzIHdpdGggdGhlIGdpdmVuIGFycmF5IG9mXG4vLyBtYXJrcywgcmV1c2luZyBleGlzdGluZyBtYXJrIGRlc2NzIHdoZW4gcG9zc2libGUuXG5WaWV3VHJlZVVwZGF0ZXIucHJvdG90eXBlLnN5bmNUb01hcmtzID0gZnVuY3Rpb24gc3luY1RvTWFya3MgKG1hcmtzLCBpbmxpbmUsIHZpZXcpIHtcbiAgdmFyIGtlZXAgPSAwLCBkZXB0aCA9IHRoaXMuc3RhY2subGVuZ3RoID4+IDE7XG4gIHZhciBtYXhLZWVwID0gTWF0aC5taW4oZGVwdGgsIG1hcmtzLmxlbmd0aCk7XG4gIHdoaWxlIChrZWVwIDwgbWF4S2VlcCAmJlxuICAgICAgICAgKGtlZXAgPT0gZGVwdGggLSAxID8gdGhpcy50b3AgOiB0aGlzLnN0YWNrWyhrZWVwICsgMSkgPDwgMV0pLm1hdGNoZXNNYXJrKG1hcmtzW2tlZXBdKSAmJiBtYXJrc1trZWVwXS50eXBlLnNwZWMuc3Bhbm5pbmcgIT09IGZhbHNlKVxuICAgIHsga2VlcCsrOyB9XG5cbiAgd2hpbGUgKGtlZXAgPCBkZXB0aCkge1xuICAgIHRoaXMuZGVzdHJveVJlc3QoKTtcbiAgICB0aGlzLnRvcC5kaXJ0eSA9IE5PVF9ESVJUWTtcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICB0aGlzLnRvcCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgZGVwdGgtLTtcbiAgfVxuICB3aGlsZSAoZGVwdGggPCBtYXJrcy5sZW5ndGgpIHtcbiAgICB0aGlzLnN0YWNrLnB1c2godGhpcy50b3AsIHRoaXMuaW5kZXggKyAxKTtcbiAgICB2YXIgZm91bmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5pbmRleDsgaSA8IE1hdGgubWluKHRoaXMuaW5kZXggKyAzLCB0aGlzLnRvcC5jaGlsZHJlbi5sZW5ndGgpOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRvcC5jaGlsZHJlbltpXS5tYXRjaGVzTWFyayhtYXJrc1tkZXB0aF0pKSB7IGZvdW5kID0gaTsgYnJlYWsgfVxuICAgIH1cbiAgICBpZiAoZm91bmQgPiAtMSkge1xuICAgICAgaWYgKGZvdW5kID4gdGhpcy5pbmRleCkge1xuICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc3Ryb3lCZXR3ZWVuKHRoaXMuaW5kZXgsIGZvdW5kKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9wID0gdGhpcy50b3AuY2hpbGRyZW5bdGhpcy5pbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXJrRGVzYyA9IE1hcmtWaWV3RGVzYy5jcmVhdGUodGhpcy50b3AsIG1hcmtzW2RlcHRoXSwgaW5saW5lLCB2aWV3KTtcbiAgICAgIHRoaXMudG9wLmNoaWxkcmVuLnNwbGljZSh0aGlzLmluZGV4LCAwLCBtYXJrRGVzYyk7XG4gICAgICB0aGlzLnRvcCA9IG1hcmtEZXNjO1xuICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgZGVwdGgrKztcbiAgfVxufTtcblxuLy8gOiAoTm9kZSwgW0RlY29yYXRpb25dLCBEZWNvcmF0aW9uU291cmNlKSDihpIgYm9vbFxuLy8gVHJ5IHRvIGZpbmQgYSBub2RlIGRlc2MgbWF0Y2hpbmcgdGhlIGdpdmVuIGRhdGEuIFNraXAgb3ZlciBpdCBhbmRcbi8vIHJldHVybiB0cnVlIHdoZW4gc3VjY2Vzc2Z1bC5cblZpZXdUcmVlVXBkYXRlci5wcm90b3R5cGUuZmluZE5vZGVNYXRjaCA9IGZ1bmN0aW9uIGZpbmROb2RlTWF0Y2ggKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCBpbmRleCkge1xuICB2YXIgZm91bmQgPSAtMSwgcHJlTWF0Y2ggPSBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiB0aGlzLmdldFByZU1hdGNoKGluZGV4KSwgY2hpbGRyZW4gPSB0aGlzLnRvcC5jaGlsZHJlbjtcbiAgaWYgKHByZU1hdGNoICYmIHByZU1hdGNoLm1hdGNoZXNOb2RlKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvKSkge1xuICAgIGZvdW5kID0gY2hpbGRyZW4uaW5kZXhPZihwcmVNYXRjaCk7XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMuaW5kZXgsIGUgPSBNYXRoLm1pbihjaGlsZHJlbi5sZW5ndGgsIGkgKyA1KTsgaSA8IGU7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoY2hpbGQubWF0Y2hlc05vZGUobm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28pICYmIHRoaXMucHJlTWF0Y2hlZC5pbmRleE9mKGNoaWxkKSA8IDApIHtcbiAgICAgICAgZm91bmQgPSBpO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZm91bmQgPCAwKSB7IHJldHVybiBmYWxzZSB9XG4gIHRoaXMuZGVzdHJveUJldHdlZW4odGhpcy5pbmRleCwgZm91bmQpO1xuICB0aGlzLmluZGV4Kys7XG4gIHJldHVybiB0cnVlXG59O1xuXG4vLyA6IChOb2RlLCBbRGVjb3JhdGlvbl0sIERlY29yYXRpb25Tb3VyY2UsIEVkaXRvclZpZXcsIEZyYWdtZW50LCBudW1iZXIpIOKGkiBib29sXG4vLyBUcnkgdG8gdXBkYXRlIHRoZSBuZXh0IG5vZGUsIGlmIGFueSwgdG8gdGhlIGdpdmVuIGRhdGEuIENoZWNrc1xuLy8gcHJlLW1hdGNoZXMgdG8gYXZvaWQgb3ZlcndyaXRpbmcgbm9kZXMgdGhhdCBjb3VsZCBzdGlsbCBiZSB1c2VkLlxuVmlld1RyZWVVcGRhdGVyLnByb3RvdHlwZS51cGRhdGVOZXh0Tm9kZSA9IGZ1bmN0aW9uIHVwZGF0ZU5leHROb2RlIChub2RlLCBvdXRlckRlY28sIGlubmVyRGVjbywgdmlldywgaW5kZXgpIHtcbiAgZm9yICh2YXIgaSA9IHRoaXMuaW5kZXg7IGkgPCB0aGlzLnRvcC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuZXh0ID0gdGhpcy50b3AuY2hpbGRyZW5baV07XG4gICAgaWYgKG5leHQgaW5zdGFuY2VvZiBOb2RlVmlld0Rlc2MpIHtcbiAgICAgIHZhciBwcmVNYXRjaCA9IHRoaXMucHJlTWF0Y2hlZC5pbmRleE9mKG5leHQpO1xuICAgICAgaWYgKHByZU1hdGNoID4gLTEgJiYgcHJlTWF0Y2ggKyB0aGlzLnByZU1hdGNoT2Zmc2V0ICE9IGluZGV4KSB7IHJldHVybiBmYWxzZSB9XG4gICAgICB2YXIgbmV4dERPTSA9IG5leHQuZG9tO1xuXG4gICAgICAvLyBDYW4ndCB1cGRhdGUgaWYgbmV4dERPTSBpcyBvciBjb250YWlucyB0aGlzLmxvY2ssIGV4Y2VwdCBpZlxuICAgICAgLy8gaXQncyBhIHRleHQgbm9kZSB3aG9zZSBjb250ZW50IGFscmVhZHkgbWF0Y2hlcyB0aGUgbmV3IHRleHRcbiAgICAgIC8vIGFuZCB3aG9zZSBkZWNvcmF0aW9ucyBtYXRjaCB0aGUgbmV3IG9uZXMuXG4gICAgICB2YXIgbG9ja2VkID0gdGhpcy5sb2NrICYmIChuZXh0RE9NID09IHRoaXMubG9jayB8fCBuZXh0RE9NLm5vZGVUeXBlID09IDEgJiYgbmV4dERPTS5jb250YWlucyh0aGlzLmxvY2sucGFyZW50Tm9kZSkpICYmXG4gICAgICAgICAgIShub2RlLmlzVGV4dCAmJiBuZXh0Lm5vZGUgJiYgbmV4dC5ub2RlLmlzVGV4dCAmJiBuZXh0Lm5vZGVET00ubm9kZVZhbHVlID09IG5vZGUudGV4dCAmJlxuICAgICAgICAgICAgbmV4dC5kaXJ0eSAhPSBOT0RFX0RJUlRZICYmIHNhbWVPdXRlckRlY28ob3V0ZXJEZWNvLCBuZXh0Lm91dGVyRGVjbykpO1xuICAgICAgaWYgKCFsb2NrZWQgJiYgbmV4dC51cGRhdGUobm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcpKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveUJldHdlZW4odGhpcy5pbmRleCwgaSk7XG4gICAgICAgIGlmIChuZXh0LmRvbSAhPSBuZXh0RE9NKSB7IHRoaXMuY2hhbmdlZCA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59O1xuXG4vLyA6IChOb2RlLCBbRGVjb3JhdGlvbl0sIERlY29yYXRpb25Tb3VyY2UsIEVkaXRvclZpZXcpXG4vLyBJbnNlcnQgdGhlIG5vZGUgYXMgYSBuZXdseSBjcmVhdGVkIG5vZGUgZGVzYy5cblZpZXdUcmVlVXBkYXRlci5wcm90b3R5cGUuYWRkTm9kZSA9IGZ1bmN0aW9uIGFkZE5vZGUgKG5vZGUsIG91dGVyRGVjbywgaW5uZXJEZWNvLCB2aWV3LCBwb3MpIHtcbiAgdGhpcy50b3AuY2hpbGRyZW4uc3BsaWNlKHRoaXMuaW5kZXgrKywgMCwgTm9kZVZpZXdEZXNjLmNyZWF0ZSh0aGlzLnRvcCwgbm9kZSwgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHZpZXcsIHBvcykpO1xuICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xufTtcblxuVmlld1RyZWVVcGRhdGVyLnByb3RvdHlwZS5wbGFjZVdpZGdldCA9IGZ1bmN0aW9uIHBsYWNlV2lkZ2V0ICh3aWRnZXQsIHZpZXcsIHBvcykge1xuICB2YXIgbmV4dCA9IHRoaXMuaW5kZXggPCB0aGlzLnRvcC5jaGlsZHJlbi5sZW5ndGggPyB0aGlzLnRvcC5jaGlsZHJlblt0aGlzLmluZGV4XSA6IG51bGw7XG4gIGlmIChuZXh0ICYmIG5leHQubWF0Y2hlc1dpZGdldCh3aWRnZXQpICYmICh3aWRnZXQgPT0gbmV4dC53aWRnZXQgfHwgIW5leHQud2lkZ2V0LnR5cGUudG9ET00ucGFyZW50Tm9kZSkpIHtcbiAgICB0aGlzLmluZGV4Kys7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRlc2MgPSBuZXcgV2lkZ2V0Vmlld0Rlc2ModGhpcy50b3AsIHdpZGdldCwgdmlldywgcG9zKTtcbiAgICB0aGlzLnRvcC5jaGlsZHJlbi5zcGxpY2UodGhpcy5pbmRleCsrLCAwLCBkZXNjKTtcbiAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vLyBNYWtlIHN1cmUgYSB0ZXh0YmxvY2sgbG9va3MgYW5kIGJlaGF2ZXMgY29ycmVjdGx5IGluXG4vLyBjb250ZW50RWRpdGFibGUuXG5WaWV3VHJlZVVwZGF0ZXIucHJvdG90eXBlLmFkZFRleHRibG9ja0hhY2tzID0gZnVuY3Rpb24gYWRkVGV4dGJsb2NrSGFja3MgKCkge1xuICB2YXIgbGFzdENoaWxkID0gdGhpcy50b3AuY2hpbGRyZW5bdGhpcy5pbmRleCAtIDFdO1xuICB3aGlsZSAobGFzdENoaWxkIGluc3RhbmNlb2YgTWFya1ZpZXdEZXNjKSB7IGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5jaGlsZHJlbltsYXN0Q2hpbGQuY2hpbGRyZW4ubGVuZ3RoIC0gMV07IH1cblxuICBpZiAoIWxhc3RDaGlsZCB8fCAvLyBFbXB0eSB0ZXh0YmxvY2tcbiAgICAgICEobGFzdENoaWxkIGluc3RhbmNlb2YgVGV4dFZpZXdEZXNjKSB8fFxuICAgICAgL1xcbiQvLnRlc3QobGFzdENoaWxkLm5vZGUudGV4dCkpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMudG9wLmNoaWxkcmVuLmxlbmd0aCAmJiB0aGlzLnRvcC5jaGlsZHJlblt0aGlzLmluZGV4XS5tYXRjaGVzSGFjaygpKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICB0aGlzLnRvcC5jaGlsZHJlbi5zcGxpY2UodGhpcy5pbmRleCsrLCAwLCBuZXcgQlJIYWNrVmlld0Rlc2ModGhpcy50b3AsIG5vdGhpbmcsIGRvbSwgbnVsbCkpO1xuICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIDogKEZyYWdtZW50LCBbVmlld0Rlc2NdKSDihpIgW1ZpZXdEZXNjXVxuLy8gSXRlcmF0ZSBmcm9tIHRoZSBlbmQgb2YgdGhlIGZyYWdtZW50IGFuZCBhcnJheSBvZiBkZXNjcyB0byBmaW5kXG4vLyBkaXJlY3RseSBtYXRjaGluZyBvbmVzLCBpbiBvcmRlciB0byBhdm9pZCBvdmVyZWFnZXJseSByZXVzaW5nXG4vLyB0aG9zZSBmb3Igb3RoZXIgbm9kZXMuIFJldHVybnMgYW4gYXJyYXkgd2hvc2UgcG9zaXRpb25zIGNvcnJlc3BvbmRcbi8vIHRvIG5vZGUgcG9zaXRpb25zIGluIHRoZSBmcmFnbWVudCwgYW5kIHdob3NlIGVsZW1lbnRzIGFyZSBlaXRoZXJcbi8vIGRlc2NzIG1hdGNoZWQgdG8gdGhlIGNoaWxkIGF0IHRoYXQgaW5kZXgsIG9yIGVtcHR5LlxuZnVuY3Rpb24gcHJlTWF0Y2goZnJhZywgZGVzY3MpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLCBlbmQgPSBmcmFnLmNoaWxkQ291bnQ7XG4gIGZvciAodmFyIGkgPSBkZXNjcy5sZW5ndGggLSAxOyBlbmQgPiAwICYmIGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGRlc2MgPSBkZXNjc1tpXSwgbm9kZSA9IGRlc2Mubm9kZTtcbiAgICBpZiAoIW5vZGUpIHsgY29udGludWUgfVxuICAgIGlmIChub2RlICE9IGZyYWcuY2hpbGQoZW5kIC0gMSkpIHsgYnJlYWsgfVxuICAgIHJlc3VsdC5wdXNoKGRlc2MpO1xuICAgIC0tZW5kO1xuICB9XG4gIHJldHVybiB7bm9kZXM6IHJlc3VsdC5yZXZlcnNlKCksIG9mZnNldDogZW5kfVxufVxuXG5mdW5jdGlvbiBjb21wYXJlU2lkZShhLCBiKSB7IHJldHVybiBhLnR5cGUuc2lkZSAtIGIudHlwZS5zaWRlIH1cblxuLy8gOiAoVmlld0Rlc2MsIERlY29yYXRpb25Tb3VyY2UsIChEZWNvcmF0aW9uLCBudW1iZXIpLCAoTm9kZSwgW0RlY29yYXRpb25dLCBEZWNvcmF0aW9uU291cmNlLCBudW1iZXIpKVxuLy8gVGhpcyBmdW5jdGlvbiBhYnN0cmFjdHMgaXRlcmF0aW5nIG92ZXIgdGhlIG5vZGVzIGFuZCBkZWNvcmF0aW9ucyBpblxuLy8gYSBmcmFnbWVudC4gQ2FsbHMgYG9uTm9kZWAgZm9yIGVhY2ggbm9kZSwgd2l0aCBpdHMgbG9jYWwgYW5kIGNoaWxkXG4vLyBkZWNvcmF0aW9ucy4gU3BsaXRzIHRleHQgbm9kZXMgd2hlbiB0aGVyZSBpcyBhIGRlY29yYXRpb24gc3RhcnRpbmdcbi8vIG9yIGVuZGluZyBpbnNpZGUgb2YgdGhlbS4gQ2FsbHMgYG9uV2lkZ2V0YCBmb3IgZWFjaCB3aWRnZXQuXG5mdW5jdGlvbiBpdGVyRGVjbyhwYXJlbnQsIGRlY28sIG9uV2lkZ2V0LCBvbk5vZGUpIHtcbiAgdmFyIGxvY2FscyA9IGRlY28ubG9jYWxzKHBhcmVudCksIG9mZnNldCA9IDA7XG4gIC8vIFNpbXBsZSwgY2hlYXAgdmFyaWFudCBmb3Igd2hlbiB0aGVyZSBhcmUgbm8gbG9jYWwgZGVjb3JhdGlvbnNcbiAgaWYgKGxvY2Fscy5sZW5ndGggPT0gMCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkQ291bnQ7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gcGFyZW50LmNoaWxkKGkpO1xuICAgICAgb25Ob2RlKGNoaWxkLCBsb2NhbHMsIGRlY28uZm9yQ2hpbGQob2Zmc2V0LCBjaGlsZCksIGkpO1xuICAgICAgb2Zmc2V0ICs9IGNoaWxkLm5vZGVTaXplO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBkZWNvSW5kZXggPSAwLCBhY3RpdmUgPSBbXSwgcmVzdE5vZGUgPSBudWxsO1xuICBmb3IgKHZhciBwYXJlbnRJbmRleCA9IDA7Oykge1xuICAgIGlmIChkZWNvSW5kZXggPCBsb2NhbHMubGVuZ3RoICYmIGxvY2Fsc1tkZWNvSW5kZXhdLnRvID09IG9mZnNldCkge1xuICAgICAgdmFyIHdpZGdldCA9IGxvY2Fsc1tkZWNvSW5kZXgrK10sIHdpZGdldHMgPSAodm9pZCAwKTtcbiAgICAgIHdoaWxlIChkZWNvSW5kZXggPCBsb2NhbHMubGVuZ3RoICYmIGxvY2Fsc1tkZWNvSW5kZXhdLnRvID09IG9mZnNldClcbiAgICAgICAgeyAod2lkZ2V0cyB8fCAod2lkZ2V0cyA9IFt3aWRnZXRdKSkucHVzaChsb2NhbHNbZGVjb0luZGV4KytdKTsgfVxuICAgICAgaWYgKHdpZGdldHMpIHtcbiAgICAgICAgd2lkZ2V0cy5zb3J0KGNvbXBhcmVTaWRlKTtcbiAgICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgd2lkZ2V0cy5sZW5ndGg7IGkkMSsrKSB7IG9uV2lkZ2V0KHdpZGdldHNbaSQxXSwgcGFyZW50SW5kZXgsICEhcmVzdE5vZGUpOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbldpZGdldCh3aWRnZXQsIHBhcmVudEluZGV4LCAhIXJlc3ROb2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hpbGQkMSA9ICh2b2lkIDApLCBpbmRleCA9ICh2b2lkIDApO1xuICAgIGlmIChyZXN0Tm9kZSkge1xuICAgICAgaW5kZXggPSAtMTtcbiAgICAgIGNoaWxkJDEgPSByZXN0Tm9kZTtcbiAgICAgIHJlc3ROb2RlID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHBhcmVudEluZGV4IDwgcGFyZW50LmNoaWxkQ291bnQpIHtcbiAgICAgIGluZGV4ID0gcGFyZW50SW5kZXg7XG4gICAgICBjaGlsZCQxID0gcGFyZW50LmNoaWxkKHBhcmVudEluZGV4KyspO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGZvciAodmFyIGkkMiA9IDA7IGkkMiA8IGFjdGl2ZS5sZW5ndGg7IGkkMisrKSB7IGlmIChhY3RpdmVbaSQyXS50byA8PSBvZmZzZXQpIHsgYWN0aXZlLnNwbGljZShpJDItLSwgMSk7IH0gfVxuICAgIHdoaWxlIChkZWNvSW5kZXggPCBsb2NhbHMubGVuZ3RoICYmIGxvY2Fsc1tkZWNvSW5kZXhdLmZyb20gPD0gb2Zmc2V0ICYmIGxvY2Fsc1tkZWNvSW5kZXhdLnRvID4gb2Zmc2V0KVxuICAgICAgeyBhY3RpdmUucHVzaChsb2NhbHNbZGVjb0luZGV4KytdKTsgfVxuXG4gICAgdmFyIGVuZCA9IG9mZnNldCArIGNoaWxkJDEubm9kZVNpemU7XG4gICAgaWYgKGNoaWxkJDEuaXNUZXh0KSB7XG4gICAgICB2YXIgY3V0QXQgPSBlbmQ7XG4gICAgICBpZiAoZGVjb0luZGV4IDwgbG9jYWxzLmxlbmd0aCAmJiBsb2NhbHNbZGVjb0luZGV4XS5mcm9tIDwgY3V0QXQpIHsgY3V0QXQgPSBsb2NhbHNbZGVjb0luZGV4XS5mcm9tOyB9XG4gICAgICBmb3IgKHZhciBpJDMgPSAwOyBpJDMgPCBhY3RpdmUubGVuZ3RoOyBpJDMrKykgeyBpZiAoYWN0aXZlW2kkM10udG8gPCBjdXRBdCkgeyBjdXRBdCA9IGFjdGl2ZVtpJDNdLnRvOyB9IH1cbiAgICAgIGlmIChjdXRBdCA8IGVuZCkge1xuICAgICAgICByZXN0Tm9kZSA9IGNoaWxkJDEuY3V0KGN1dEF0IC0gb2Zmc2V0KTtcbiAgICAgICAgY2hpbGQkMSA9IGNoaWxkJDEuY3V0KDAsIGN1dEF0IC0gb2Zmc2V0KTtcbiAgICAgICAgZW5kID0gY3V0QXQ7XG4gICAgICAgIGluZGV4ID0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG91dGVyRGVjbyA9ICFhY3RpdmUubGVuZ3RoID8gbm90aGluZ1xuICAgICAgICA6IGNoaWxkJDEuaXNJbmxpbmUgJiYgIWNoaWxkJDEuaXNMZWFmID8gYWN0aXZlLmZpbHRlcihmdW5jdGlvbiAoZCkgeyByZXR1cm4gIWQuaW5saW5lOyB9KVxuICAgICAgICA6IGFjdGl2ZS5zbGljZSgpO1xuICAgIG9uTm9kZShjaGlsZCQxLCBvdXRlckRlY28sIGRlY28uZm9yQ2hpbGQob2Zmc2V0LCBjaGlsZCQxKSwgaW5kZXgpO1xuICAgIG9mZnNldCA9IGVuZDtcbiAgfVxufVxuXG4vLyBMaXN0IG1hcmtlcnMgaW4gTW9iaWxlIFNhZmFyaSB3aWxsIG15c3RlcmlvdXNseSBkaXNhcHBlYXJcbi8vIHNvbWV0aW1lcy4gVGhpcyB3b3JrcyBhcm91bmQgdGhhdC5cbmZ1bmN0aW9uIGlvc0hhY2tzKGRvbSkge1xuICBpZiAoZG9tLm5vZGVOYW1lID09IFwiVUxcIiB8fCBkb20ubm9kZU5hbWUgPT0gXCJPTFwiKSB7XG4gICAgdmFyIG9sZENTUyA9IGRvbS5zdHlsZS5jc3NUZXh0O1xuICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gb2xkQ1NTICsgXCI7IGxpc3Qtc3R5bGU6IHNxdWFyZSAhaW1wb3J0YW50XCI7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tKS5saXN0U3R5bGU7XG4gICAgZG9tLnN0eWxlLmNzc1RleHQgPSBvbGRDU1M7XG4gIH1cbn1cblxuZnVuY3Rpb24gbmVhcmJ5VGV4dE5vZGUobm9kZSwgb2Zmc2V0KSB7XG4gIGZvciAoOzspIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSAzKSB7IHJldHVybiBub2RlIH1cbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSAxICYmIG9mZnNldCA+IDApIHtcbiAgICAgIGlmIChub2RlLmNoaWxkTm9kZXMubGVuZ3RoID4gb2Zmc2V0ICYmIG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdLm5vZGVUeXBlID09IDMpXG4gICAgICAgIHsgcmV0dXJuIG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdIH1cbiAgICAgIG5vZGUgPSBub2RlLmNoaWxkTm9kZXNbb2Zmc2V0IC0gMV07XG4gICAgICBvZmZzZXQgPSBub2RlU2l6ZShub2RlKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT0gMSAmJiBvZmZzZXQgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBub2RlID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldF07XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufVxuXG4vLyBGaW5kIGEgcGllY2Ugb2YgdGV4dCBpbiBhbiBpbmxpbmUgZnJhZ21lbnQsIG92ZXJsYXBwaW5nIGZyb20tdG9cbmZ1bmN0aW9uIGZpbmRUZXh0SW5GcmFnbWVudChmcmFnLCB0ZXh0LCBmcm9tLCB0bykge1xuICBmb3IgKHZhciBpID0gMCwgcG9zID0gMDsgaSA8IGZyYWcuY2hpbGRDb3VudCAmJiBwb3MgPD0gdG87KSB7XG4gICAgdmFyIGNoaWxkID0gZnJhZy5jaGlsZChpKyspLCBjaGlsZFN0YXJ0ID0gcG9zO1xuICAgIHBvcyArPSBjaGlsZC5ub2RlU2l6ZTtcbiAgICBpZiAoIWNoaWxkLmlzVGV4dCkgeyBjb250aW51ZSB9XG4gICAgdmFyIHN0ciA9IGNoaWxkLnRleHQ7XG4gICAgd2hpbGUgKGkgPCBmcmFnLmNoaWxkQ291bnQpIHtcbiAgICAgIHZhciBuZXh0ID0gZnJhZy5jaGlsZChpKyspO1xuICAgICAgcG9zICs9IG5leHQubm9kZVNpemU7XG4gICAgICBpZiAoIW5leHQuaXNUZXh0KSB7IGJyZWFrIH1cbiAgICAgIHN0ciArPSBuZXh0LnRleHQ7XG4gICAgfVxuICAgIGlmIChwb3MgPj0gZnJvbSkge1xuICAgICAgdmFyIGZvdW5kID0gc3RyLmxhc3RJbmRleE9mKHRleHQsIHRvIC0gY2hpbGRTdGFydCk7XG4gICAgICBpZiAoZm91bmQgPj0gMCAmJiBmb3VuZCArIHRleHQubGVuZ3RoICsgY2hpbGRTdGFydCA+PSBmcm9tKVxuICAgICAgICB7IHJldHVybiBjaGlsZFN0YXJ0ICsgZm91bmQgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gLTFcbn1cblxuLy8gUmVwbGFjZSByYW5nZSBmcm9tLXRvIGluIGFuIGFycmF5IG9mIHZpZXcgZGVzY3Mgd2l0aCByZXBsYWNlbWVudFxuLy8gKG1heSBiZSBudWxsIHRvIGp1c3QgZGVsZXRlKS4gVGhpcyBnb2VzIHZlcnkgbXVjaCBhZ2FpbnN0IHRoZSBncmFpblxuLy8gb2YgdGhlIHJlc3Qgb2YgdGhpcyBjb2RlLCB3aGljaCB0ZW5kcyB0byBjcmVhdGUgbm9kZXMgd2l0aCB0aGVcbi8vIHJpZ2h0IHNoYXBlIGluIG9uZSBnbywgcmF0aGVyIHRoYW4gbWVzc2luZyB3aXRoIHRoZW0gYWZ0ZXJcbi8vIGNyZWF0aW9uLCBidXQgaXMgbmVjZXNzYXJ5IGluIHRoZSBjb21wb3NpdGlvbiBoYWNrLlxuZnVuY3Rpb24gcmVwbGFjZU5vZGVzKG5vZGVzLCBmcm9tLCB0bywgdmlldywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgb2ZmID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNoaWxkID0gbm9kZXNbaV0sIHN0YXJ0ID0gb2ZmLCBlbmQgPSBvZmYgKz0gY2hpbGQuc2l6ZTtcbiAgICBpZiAoc3RhcnQgPj0gdG8gfHwgZW5kIDw9IGZyb20pIHtcbiAgICAgIHJlc3VsdC5wdXNoKGNoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXJ0IDwgZnJvbSkgeyByZXN1bHQucHVzaChjaGlsZC5zbGljZSgwLCBmcm9tIC0gc3RhcnQsIHZpZXcpKTsgfVxuICAgICAgaWYgKHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJlcGxhY2VtZW50KTtcbiAgICAgICAgcmVwbGFjZW1lbnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGVuZCA+IHRvKSB7IHJlc3VsdC5wdXNoKGNoaWxkLnNsaWNlKHRvIC0gc3RhcnQsIGNoaWxkLnNpemUsIHZpZXcpKTsgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbkZyb21ET00odmlldywgb3JpZ2luKSB7XG4gIHZhciBkb21TZWwgPSB2aWV3LnJvb3QuZ2V0U2VsZWN0aW9uKCksIGRvYyA9IHZpZXcuc3RhdGUuZG9jO1xuICBpZiAoIWRvbVNlbC5mb2N1c05vZGUpIHsgcmV0dXJuIG51bGwgfVxuICB2YXIgbmVhcmVzdERlc2MgPSB2aWV3LmRvY1ZpZXcubmVhcmVzdERlc2MoZG9tU2VsLmZvY3VzTm9kZSksIGluV2lkZ2V0ID0gbmVhcmVzdERlc2MgJiYgbmVhcmVzdERlc2Muc2l6ZSA9PSAwO1xuICB2YXIgaGVhZCA9IHZpZXcuZG9jVmlldy5wb3NGcm9tRE9NKGRvbVNlbC5mb2N1c05vZGUsIGRvbVNlbC5mb2N1c09mZnNldCk7XG4gIGlmIChoZWFkIDwgMCkgeyByZXR1cm4gbnVsbCB9XG4gIHZhciAkaGVhZCA9IGRvYy5yZXNvbHZlKGhlYWQpLCAkYW5jaG9yLCBzZWxlY3Rpb247XG4gIGlmIChzZWxlY3Rpb25Db2xsYXBzZWQoZG9tU2VsKSkge1xuICAgICRhbmNob3IgPSAkaGVhZDtcbiAgICB3aGlsZSAobmVhcmVzdERlc2MgJiYgIW5lYXJlc3REZXNjLm5vZGUpIHsgbmVhcmVzdERlc2MgPSBuZWFyZXN0RGVzYy5wYXJlbnQ7IH1cbiAgICBpZiAobmVhcmVzdERlc2MgJiYgbmVhcmVzdERlc2Mubm9kZS5pc0F0b20gJiYgTm9kZVNlbGVjdGlvbi5pc1NlbGVjdGFibGUobmVhcmVzdERlc2Mubm9kZSkgJiYgbmVhcmVzdERlc2MucGFyZW50XG4gICAgICAgICYmICEobmVhcmVzdERlc2Mubm9kZS5pc0lubGluZSAmJiBpc09uRWRnZShkb21TZWwuZm9jdXNOb2RlLCBkb21TZWwuZm9jdXNPZmZzZXQsIG5lYXJlc3REZXNjLmRvbSkpKSB7XG4gICAgICB2YXIgcG9zID0gbmVhcmVzdERlc2MucG9zQmVmb3JlO1xuICAgICAgc2VsZWN0aW9uID0gbmV3IE5vZGVTZWxlY3Rpb24oaGVhZCA9PSBwb3MgPyAkaGVhZCA6IGRvYy5yZXNvbHZlKHBvcykpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYW5jaG9yID0gdmlldy5kb2NWaWV3LnBvc0Zyb21ET00oZG9tU2VsLmFuY2hvck5vZGUsIGRvbVNlbC5hbmNob3JPZmZzZXQpO1xuICAgIGlmIChhbmNob3IgPCAwKSB7IHJldHVybiBudWxsIH1cbiAgICAkYW5jaG9yID0gZG9jLnJlc29sdmUoYW5jaG9yKTtcbiAgfVxuXG4gIGlmICghc2VsZWN0aW9uKSB7XG4gICAgdmFyIGJpYXMgPSBvcmlnaW4gPT0gXCJwb2ludGVyXCIgfHwgKHZpZXcuc3RhdGUuc2VsZWN0aW9uLmhlYWQgPCAkaGVhZC5wb3MgJiYgIWluV2lkZ2V0KSA/IDEgOiAtMTtcbiAgICBzZWxlY3Rpb24gPSBzZWxlY3Rpb25CZXR3ZWVuKHZpZXcsICRhbmNob3IsICRoZWFkLCBiaWFzKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0aW9uXG59XG5cbmZ1bmN0aW9uIGVkaXRvck93bnNTZWxlY3Rpb24odmlldykge1xuICByZXR1cm4gdmlldy5lZGl0YWJsZSA/IHZpZXcuaGFzRm9jdXMoKSA6XG4gICAgaGFzU2VsZWN0aW9uKHZpZXcpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jb250YWlucyh2aWV3LmRvbSlcbn1cblxuZnVuY3Rpb24gc2VsZWN0aW9uVG9ET00odmlldywgZm9yY2UpIHtcbiAgdmFyIHNlbCA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uO1xuICBzeW5jTm9kZVNlbGVjdGlvbih2aWV3LCBzZWwpO1xuXG4gIGlmICghZWRpdG9yT3duc1NlbGVjdGlvbih2aWV3KSkgeyByZXR1cm4gfVxuXG4gIHZpZXcuZG9tT2JzZXJ2ZXIuZGlzY29ubmVjdFNlbGVjdGlvbigpO1xuXG4gIGlmICh2aWV3LmN1cnNvcldyYXBwZXIpIHtcbiAgICBzZWxlY3RDdXJzb3JXcmFwcGVyKHZpZXcpO1xuICB9IGVsc2Uge1xuICAgIHZhciBhbmNob3IgPSBzZWwuYW5jaG9yO1xuICAgIHZhciBoZWFkID0gc2VsLmhlYWQ7XG4gICAgdmFyIHJlc2V0RWRpdGFibGVGcm9tLCByZXNldEVkaXRhYmxlVG87XG4gICAgaWYgKGJyb2tlblNlbGVjdEJldHdlZW5VbmVkaXRhYmxlICYmICEoc2VsIGluc3RhbmNlb2YgVGV4dFNlbGVjdGlvbikpIHtcbiAgICAgIGlmICghc2VsLiRmcm9tLnBhcmVudC5pbmxpbmVDb250ZW50KVxuICAgICAgICB7IHJlc2V0RWRpdGFibGVGcm9tID0gdGVtcG9yYXJpbHlFZGl0YWJsZU5lYXIodmlldywgc2VsLmZyb20pOyB9XG4gICAgICBpZiAoIXNlbC5lbXB0eSAmJiAhc2VsLiRmcm9tLnBhcmVudC5pbmxpbmVDb250ZW50KVxuICAgICAgICB7IHJlc2V0RWRpdGFibGVUbyA9IHRlbXBvcmFyaWx5RWRpdGFibGVOZWFyKHZpZXcsIHNlbC50byk7IH1cbiAgICB9XG4gICAgdmlldy5kb2NWaWV3LnNldFNlbGVjdGlvbihhbmNob3IsIGhlYWQsIHZpZXcucm9vdCwgZm9yY2UpO1xuICAgIGlmIChicm9rZW5TZWxlY3RCZXR3ZWVuVW5lZGl0YWJsZSkge1xuICAgICAgaWYgKHJlc2V0RWRpdGFibGVGcm9tKSB7IHJlc2V0RWRpdGFibGUocmVzZXRFZGl0YWJsZUZyb20pOyB9XG4gICAgICBpZiAocmVzZXRFZGl0YWJsZVRvKSB7IHJlc2V0RWRpdGFibGUocmVzZXRFZGl0YWJsZVRvKTsgfVxuICAgIH1cbiAgICBpZiAoc2VsLnZpc2libGUpIHtcbiAgICAgIHZpZXcuZG9tLmNsYXNzTGlzdC5yZW1vdmUoXCJQcm9zZU1pcnJvci1oaWRlc2VsZWN0aW9uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWV3LmRvbS5jbGFzc0xpc3QuYWRkKFwiUHJvc2VNaXJyb3ItaGlkZXNlbGVjdGlvblwiKTtcbiAgICAgIGlmIChcIm9uc2VsZWN0aW9uY2hhbmdlXCIgaW4gZG9jdW1lbnQpIHsgcmVtb3ZlQ2xhc3NPblNlbGVjdGlvbkNoYW5nZSh2aWV3KTsgfVxuICAgIH1cbiAgfVxuXG4gIHZpZXcuZG9tT2JzZXJ2ZXIuc2V0Q3VyU2VsZWN0aW9uKCk7XG4gIHZpZXcuZG9tT2JzZXJ2ZXIuY29ubmVjdFNlbGVjdGlvbigpO1xufVxuXG4vLyBLbHVkZ2UgdG8gd29yayBhcm91bmQgV2Via2l0IG5vdCBhbGxvd2luZyBhIHNlbGVjdGlvbiB0byBzdGFydC9lbmRcbi8vIGJldHdlZW4gbm9uLWVkaXRhYmxlIGJsb2NrIG5vZGVzLiBXZSBicmllZmx5IG1ha2Ugc29tZXRoaW5nXG4vLyBlZGl0YWJsZSwgc2V0IHRoZSBzZWxlY3Rpb24sIHRoZW4gc2V0IGl0IHVuZWRpdGFibGUgYWdhaW4uXG5cbnZhciBicm9rZW5TZWxlY3RCZXR3ZWVuVW5lZGl0YWJsZSA9IHJlc3VsdC5zYWZhcmkgfHwgcmVzdWx0LmNocm9tZSAmJiByZXN1bHQuY2hyb21lX3ZlcnNpb24gPCA2MztcblxuZnVuY3Rpb24gdGVtcG9yYXJpbHlFZGl0YWJsZU5lYXIodmlldywgcG9zKSB7XG4gIHZhciByZWYgPSB2aWV3LmRvY1ZpZXcuZG9tRnJvbVBvcyhwb3MsIDApO1xuICB2YXIgbm9kZSA9IHJlZi5ub2RlO1xuICB2YXIgb2Zmc2V0ID0gcmVmLm9mZnNldDtcbiAgdmFyIGFmdGVyID0gb2Zmc2V0IDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA/IG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdIDogbnVsbDtcbiAgdmFyIGJlZm9yZSA9IG9mZnNldCA/IG5vZGUuY2hpbGROb2Rlc1tvZmZzZXQgLSAxXSA6IG51bGw7XG4gIGlmIChyZXN1bHQuc2FmYXJpICYmIGFmdGVyICYmIGFmdGVyLmNvbnRlbnRFZGl0YWJsZSA9PSBcImZhbHNlXCIpIHsgcmV0dXJuIHNldEVkaXRhYmxlKGFmdGVyKSB9XG4gIGlmICgoIWFmdGVyIHx8IGFmdGVyLmNvbnRlbnRFZGl0YWJsZSA9PSBcImZhbHNlXCIpICYmICghYmVmb3JlIHx8IGJlZm9yZS5jb250ZW50RWRpdGFibGUgPT0gXCJmYWxzZVwiKSkge1xuICAgIGlmIChhZnRlcikgeyByZXR1cm4gc2V0RWRpdGFibGUoYWZ0ZXIpIH1cbiAgICBlbHNlIGlmIChiZWZvcmUpIHsgcmV0dXJuIHNldEVkaXRhYmxlKGJlZm9yZSkgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldEVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBcInRydWVcIjtcbiAgaWYgKHJlc3VsdC5zYWZhcmkgJiYgZWxlbWVudC5kcmFnZ2FibGUpIHsgZWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTsgZWxlbWVudC53YXNEcmFnZ2FibGUgPSB0cnVlOyB9XG4gIHJldHVybiBlbGVtZW50XG59XG5cbmZ1bmN0aW9uIHJlc2V0RWRpdGFibGUoZWxlbWVudCkge1xuICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IFwiZmFsc2VcIjtcbiAgaWYgKGVsZW1lbnQud2FzRHJhZ2dhYmxlKSB7IGVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTsgZWxlbWVudC53YXNEcmFnZ2FibGUgPSBudWxsOyB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzT25TZWxlY3Rpb25DaGFuZ2Uodmlldykge1xuICB2YXIgZG9jID0gdmlldy5kb20ub3duZXJEb2N1bWVudDtcbiAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWxlY3Rpb25jaGFuZ2VcIiwgdmlldy5oaWRlU2VsZWN0aW9uR3VhcmQpO1xuICB2YXIgZG9tU2VsID0gdmlldy5yb290LmdldFNlbGVjdGlvbigpO1xuICB2YXIgbm9kZSA9IGRvbVNlbC5hbmNob3JOb2RlLCBvZmZzZXQgPSBkb21TZWwuYW5jaG9yT2Zmc2V0O1xuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdGlvbmNoYW5nZVwiLCB2aWV3LmhpZGVTZWxlY3Rpb25HdWFyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZG9tU2VsLmFuY2hvck5vZGUgIT0gbm9kZSB8fCBkb21TZWwuYW5jaG9yT2Zmc2V0ICE9IG9mZnNldCkge1xuICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWxlY3Rpb25jaGFuZ2VcIiwgdmlldy5oaWRlU2VsZWN0aW9uR3VhcmQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZWRpdG9yT3duc1NlbGVjdGlvbih2aWV3KSB8fCB2aWV3LnN0YXRlLnNlbGVjdGlvbi52aXNpYmxlKVxuICAgICAgICAgIHsgdmlldy5kb20uY2xhc3NMaXN0LnJlbW92ZShcIlByb3NlTWlycm9yLWhpZGVzZWxlY3Rpb25cIik7IH1cbiAgICAgIH0sIDIwKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RDdXJzb3JXcmFwcGVyKHZpZXcpIHtcbiAgdmFyIGRvbVNlbCA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKSwgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB2YXIgbm9kZSA9IHZpZXcuY3Vyc29yV3JhcHBlci5kb20sIGltZyA9IG5vZGUubm9kZU5hbWUgPT0gXCJJTUdcIjtcbiAgaWYgKGltZykgeyByYW5nZS5zZXRFbmQobm9kZS5wYXJlbnROb2RlLCBkb21JbmRleChub2RlKSArIDEpOyB9XG4gIGVsc2UgeyByYW5nZS5zZXRFbmQobm9kZSwgMCk7IH1cbiAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICBkb21TZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIGRvbVNlbC5hZGRSYW5nZShyYW5nZSk7XG4gIC8vIEtsdWRnZSB0byBraWxsICdjb250cm9sIHNlbGVjdGlvbicgaW4gSUUxMSB3aGVuIHNlbGVjdGluZyBhblxuICAvLyBpbnZpc2libGUgY3Vyc29yIHdyYXBwZXIsIHNpbmNlIHRoYXQgd291bGQgcmVzdWx0IGluIHRob3NlIHdlaXJkXG4gIC8vIHJlc2l6ZSBoYW5kbGVzIGFuZCBhIHNlbGVjdGlvbiB0aGF0IGNvbnNpZGVycyB0aGUgYWJzb2x1dGVseVxuICAvLyBwb3NpdGlvbmVkIHdyYXBwZXIsIHJhdGhlciB0aGFuIHRoZSByb290IGVkaXRhYmxlIG5vZGUsIHRoZVxuICAvLyBmb2N1c2VkIGVsZW1lbnQuXG4gIGlmICghaW1nICYmICF2aWV3LnN0YXRlLnNlbGVjdGlvbi52aXNpYmxlICYmIHJlc3VsdC5pZSAmJiByZXN1bHQuaWVfdmVyc2lvbiA8PSAxMSkge1xuICAgIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xuICAgIG5vZGUuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzeW5jTm9kZVNlbGVjdGlvbih2aWV3LCBzZWwpIHtcbiAgaWYgKHNlbCBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24pIHtcbiAgICB2YXIgZGVzYyA9IHZpZXcuZG9jVmlldy5kZXNjQXQoc2VsLmZyb20pO1xuICAgIGlmIChkZXNjICE9IHZpZXcubGFzdFNlbGVjdGVkVmlld0Rlc2MpIHtcbiAgICAgIGNsZWFyTm9kZVNlbGVjdGlvbih2aWV3KTtcbiAgICAgIGlmIChkZXNjKSB7IGRlc2Muc2VsZWN0Tm9kZSgpOyB9XG4gICAgICB2aWV3Lmxhc3RTZWxlY3RlZFZpZXdEZXNjID0gZGVzYztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2xlYXJOb2RlU2VsZWN0aW9uKHZpZXcpO1xuICB9XG59XG5cbi8vIENsZWFyIGFsbCBET00gc3RhdGVmdWxuZXNzIG9mIHRoZSBsYXN0IG5vZGUgc2VsZWN0aW9uLlxuZnVuY3Rpb24gY2xlYXJOb2RlU2VsZWN0aW9uKHZpZXcpIHtcbiAgaWYgKHZpZXcubGFzdFNlbGVjdGVkVmlld0Rlc2MpIHtcbiAgICBpZiAodmlldy5sYXN0U2VsZWN0ZWRWaWV3RGVzYy5wYXJlbnQpXG4gICAgICB7IHZpZXcubGFzdFNlbGVjdGVkVmlld0Rlc2MuZGVzZWxlY3ROb2RlKCk7IH1cbiAgICB2aWV3Lmxhc3RTZWxlY3RlZFZpZXdEZXNjID0gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25CZXR3ZWVuKHZpZXcsICRhbmNob3IsICRoZWFkLCBiaWFzKSB7XG4gIHJldHVybiB2aWV3LnNvbWVQcm9wKFwiY3JlYXRlU2VsZWN0aW9uQmV0d2VlblwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCAkYW5jaG9yLCAkaGVhZCk7IH0pXG4gICAgfHwgVGV4dFNlbGVjdGlvbi5iZXR3ZWVuKCRhbmNob3IsICRoZWFkLCBiaWFzKVxufVxuXG5mdW5jdGlvbiBoYXNGb2N1c0FuZFNlbGVjdGlvbih2aWV3KSB7XG4gIGlmICh2aWV3LmVkaXRhYmxlICYmIHZpZXcucm9vdC5hY3RpdmVFbGVtZW50ICE9IHZpZXcuZG9tKSB7IHJldHVybiBmYWxzZSB9XG4gIHJldHVybiBoYXNTZWxlY3Rpb24odmlldylcbn1cblxuZnVuY3Rpb24gaGFzU2VsZWN0aW9uKHZpZXcpIHtcbiAgdmFyIHNlbCA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgaWYgKCFzZWwuYW5jaG9yTm9kZSkgeyByZXR1cm4gZmFsc2UgfVxuICB0cnkge1xuICAgIC8vIEZpcmVmb3ggd2lsbCByYWlzZSAncGVybWlzc2lvbiBkZW5pZWQnIGVycm9ycyB3aGVuIGFjY2Vzc2luZ1xuICAgIC8vIHByb3BlcnRpZXMgb2YgYHNlbC5hbmNob3JOb2RlYCB3aGVuIGl0J3MgaW4gYSBnZW5lcmF0ZWQgQ1NTXG4gICAgLy8gZWxlbWVudC5cbiAgICByZXR1cm4gdmlldy5kb20uY29udGFpbnMoc2VsLmFuY2hvck5vZGUubm9kZVR5cGUgPT0gMyA/IHNlbC5hbmNob3JOb2RlLnBhcmVudE5vZGUgOiBzZWwuYW5jaG9yTm9kZSkgJiZcbiAgICAgICh2aWV3LmVkaXRhYmxlIHx8IHZpZXcuZG9tLmNvbnRhaW5zKHNlbC5mb2N1c05vZGUubm9kZVR5cGUgPT0gMyA/IHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZSA6IHNlbC5mb2N1c05vZGUpKVxuICB9IGNhdGNoKF8pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBhbmNob3JJblJpZ2h0UGxhY2Uodmlldykge1xuICB2YXIgYW5jaG9yRE9NID0gdmlldy5kb2NWaWV3LmRvbUZyb21Qb3Modmlldy5zdGF0ZS5zZWxlY3Rpb24uYW5jaG9yLCAwKTtcbiAgdmFyIGRvbVNlbCA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgcmV0dXJuIGlzRXF1aXZhbGVudFBvc2l0aW9uKGFuY2hvckRPTS5ub2RlLCBhbmNob3JET00ub2Zmc2V0LCBkb21TZWwuYW5jaG9yTm9kZSwgZG9tU2VsLmFuY2hvck9mZnNldClcbn1cblxuZnVuY3Rpb24gbW92ZVNlbGVjdGlvbkJsb2NrKHN0YXRlLCBkaXIpIHtcbiAgdmFyIHJlZiA9IHN0YXRlLnNlbGVjdGlvbjtcbiAgdmFyICRhbmNob3IgPSByZWYuJGFuY2hvcjtcbiAgdmFyICRoZWFkID0gcmVmLiRoZWFkO1xuICB2YXIgJHNpZGUgPSBkaXIgPiAwID8gJGFuY2hvci5tYXgoJGhlYWQpIDogJGFuY2hvci5taW4oJGhlYWQpO1xuICB2YXIgJHN0YXJ0ID0gISRzaWRlLnBhcmVudC5pbmxpbmVDb250ZW50ID8gJHNpZGUgOiAkc2lkZS5kZXB0aCA/IHN0YXRlLmRvYy5yZXNvbHZlKGRpciA+IDAgPyAkc2lkZS5hZnRlcigpIDogJHNpZGUuYmVmb3JlKCkpIDogbnVsbDtcbiAgcmV0dXJuICRzdGFydCAmJiBTZWxlY3Rpb24uZmluZEZyb20oJHN0YXJ0LCBkaXIpXG59XG5cbmZ1bmN0aW9uIGFwcGx5KHZpZXcsIHNlbCkge1xuICB2aWV3LmRpc3BhdGNoKHZpZXcuc3RhdGUudHIuc2V0U2VsZWN0aW9uKHNlbCkuc2Nyb2xsSW50b1ZpZXcoKSk7XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHNlbGVjdEhvcml6b250YWxseSh2aWV3LCBkaXIsIG1vZHMpIHtcbiAgdmFyIHNlbCA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uO1xuICBpZiAoc2VsIGluc3RhbmNlb2YgVGV4dFNlbGVjdGlvbikge1xuICAgIGlmICghc2VsLmVtcHR5IHx8IG1vZHMuaW5kZXhPZihcInNcIikgPiAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmICh2aWV3LmVuZE9mVGV4dGJsb2NrKGRpciA+IDAgPyBcInJpZ2h0XCIgOiBcImxlZnRcIikpIHtcbiAgICAgIHZhciBuZXh0ID0gbW92ZVNlbGVjdGlvbkJsb2NrKHZpZXcuc3RhdGUsIGRpcik7XG4gICAgICBpZiAobmV4dCAmJiAobmV4dCBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24pKSB7IHJldHVybiBhcHBseSh2aWV3LCBuZXh0KSB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKCEocmVzdWx0Lm1hYyAmJiBtb2RzLmluZGV4T2YoXCJtXCIpID4gLTEpKSB7XG4gICAgICB2YXIgJGhlYWQgPSBzZWwuJGhlYWQsIG5vZGUgPSAkaGVhZC50ZXh0T2Zmc2V0ID8gbnVsbCA6IGRpciA8IDAgPyAkaGVhZC5ub2RlQmVmb3JlIDogJGhlYWQubm9kZUFmdGVyLCBkZXNjO1xuICAgICAgaWYgKCFub2RlIHx8IG5vZGUuaXNUZXh0KSB7IHJldHVybiBmYWxzZSB9XG4gICAgICB2YXIgbm9kZVBvcyA9IGRpciA8IDAgPyAkaGVhZC5wb3MgLSBub2RlLm5vZGVTaXplIDogJGhlYWQucG9zO1xuICAgICAgaWYgKCEobm9kZS5pc0F0b20gfHwgKGRlc2MgPSB2aWV3LmRvY1ZpZXcuZGVzY0F0KG5vZGVQb3MpKSAmJiAhZGVzYy5jb250ZW50RE9NKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgaWYgKE5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiBhcHBseSh2aWV3LCBuZXcgTm9kZVNlbGVjdGlvbihkaXIgPCAwID8gdmlldy5zdGF0ZS5kb2MucmVzb2x2ZSgkaGVhZC5wb3MgLSBub2RlLm5vZGVTaXplKSA6ICRoZWFkKSlcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LndlYmtpdCkge1xuICAgICAgICAvLyBDaHJvbWUgYW5kIFNhZmFyaSB3aWxsIGludHJvZHVjZSBleHRyYSBwb2ludGxlc3MgY3Vyc29yXG4gICAgICAgIC8vIHBvc2l0aW9ucyBhcm91bmQgaW5saW5lIHVuZWRpdGFibGUgbm9kZXMsIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gdGFrZSBvdmVyIGFuZCBtb3ZlIHRoZSBjdXJzb3IgcGFzdCB0aGVtICgjOTM3KVxuICAgICAgICByZXR1cm4gYXBwbHkodmlldywgbmV3IFRleHRTZWxlY3Rpb24odmlldy5zdGF0ZS5kb2MucmVzb2x2ZShkaXIgPCAwID8gbm9kZVBvcyA6IG5vZGVQb3MgKyBub2RlLm5vZGVTaXplKSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2VsIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiAmJiBzZWwubm9kZS5pc0lubGluZSkge1xuICAgIHJldHVybiBhcHBseSh2aWV3LCBuZXcgVGV4dFNlbGVjdGlvbihkaXIgPiAwID8gc2VsLiR0byA6IHNlbC4kZnJvbSkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIG5leHQkMSA9IG1vdmVTZWxlY3Rpb25CbG9jayh2aWV3LnN0YXRlLCBkaXIpO1xuICAgIGlmIChuZXh0JDEpIHsgcmV0dXJuIGFwcGx5KHZpZXcsIG5leHQkMSkgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vZGVMZW4obm9kZSkge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PSAzID8gbm9kZS5ub2RlVmFsdWUubGVuZ3RoIDogbm9kZS5jaGlsZE5vZGVzLmxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0lnbm9yYWJsZShkb20pIHtcbiAgdmFyIGRlc2MgPSBkb20ucG1WaWV3RGVzYztcbiAgcmV0dXJuIGRlc2MgJiYgZGVzYy5zaXplID09IDAgJiYgKGRvbS5uZXh0U2libGluZyB8fCBkb20ubm9kZU5hbWUgIT0gXCJCUlwiKVxufVxuXG4vLyBNYWtlIHN1cmUgdGhlIGN1cnNvciBpc24ndCBkaXJlY3RseSBhZnRlciBvbmUgb3IgbW9yZSBpZ25vcmVkXG4vLyBub2Rlcywgd2hpY2ggd2lsbCBjb25mdXNlIHRoZSBicm93c2VyJ3MgY3Vyc29yIG1vdGlvbiBsb2dpYy5cbmZ1bmN0aW9uIHNraXBJZ25vcmVkTm9kZXNMZWZ0KHZpZXcpIHtcbiAgdmFyIHNlbCA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgdmFyIG5vZGUgPSBzZWwuZm9jdXNOb2RlLCBvZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7XG4gIGlmICghbm9kZSkgeyByZXR1cm4gfVxuICB2YXIgbW92ZU5vZGUsIG1vdmVPZmZzZXQsIGZvcmNlID0gZmFsc2U7XG4gIC8vIEdlY2tvIHdpbGwgZG8gb2RkIHRoaW5ncyB3aGVuIHRoZSBzZWxlY3Rpb24gaXMgZGlyZWN0bHkgaW4gZnJvbnRcbiAgLy8gb2YgYSBub24tZWRpdGFibGUgbm9kZSwgc28gaW4gdGhhdCBjYXNlLCBtb3ZlIGl0IGludG8gdGhlIG5leHRcbiAgLy8gbm9kZSBpZiBwb3NzaWJsZS4gSXNzdWUgcHJvc2VtaXJyb3IvcHJvc2VtaXJyb3IjODMyLlxuICBpZiAocmVzdWx0LmdlY2tvICYmIG5vZGUubm9kZVR5cGUgPT0gMSAmJiBvZmZzZXQgPCBub2RlTGVuKG5vZGUpICYmIGlzSWdub3JhYmxlKG5vZGUuY2hpbGROb2Rlc1tvZmZzZXRdKSkgeyBmb3JjZSA9IHRydWU7IH1cbiAgZm9yICg7Oykge1xuICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPSAxKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYmVmb3JlID0gbm9kZS5jaGlsZE5vZGVzW29mZnNldCAtIDFdO1xuICAgICAgICBpZiAoaXNJZ25vcmFibGUoYmVmb3JlKSkge1xuICAgICAgICAgIG1vdmVOb2RlID0gbm9kZTtcbiAgICAgICAgICBtb3ZlT2Zmc2V0ID0gLS1vZmZzZXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYmVmb3JlLm5vZGVUeXBlID09IDMpIHtcbiAgICAgICAgICBub2RlID0gYmVmb3JlO1xuICAgICAgICAgIG9mZnNldCA9IG5vZGUubm9kZVZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHsgYnJlYWsgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNCbG9ja05vZGUobm9kZSkpIHtcbiAgICAgIGJyZWFrXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwcmV2ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICB3aGlsZSAocHJldiAmJiBpc0lnbm9yYWJsZShwcmV2KSkge1xuICAgICAgICBtb3ZlTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgbW92ZU9mZnNldCA9IGRvbUluZGV4KHByZXYpO1xuICAgICAgICBwcmV2ID0gcHJldi5wcmV2aW91c1NpYmxpbmc7XG4gICAgICB9XG4gICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKG5vZGUgPT0gdmlldy5kb20pIHsgYnJlYWsgfVxuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZSA9IHByZXY7XG4gICAgICAgIG9mZnNldCA9IG5vZGVMZW4obm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChmb3JjZSkgeyBzZXRTZWxGb2N1cyh2aWV3LCBzZWwsIG5vZGUsIG9mZnNldCk7IH1cbiAgZWxzZSBpZiAobW92ZU5vZGUpIHsgc2V0U2VsRm9jdXModmlldywgc2VsLCBtb3ZlTm9kZSwgbW92ZU9mZnNldCk7IH1cbn1cblxuLy8gTWFrZSBzdXJlIHRoZSBjdXJzb3IgaXNuJ3QgZGlyZWN0bHkgYmVmb3JlIG9uZSBvciBtb3JlIGlnbm9yZWRcbi8vIG5vZGVzLlxuZnVuY3Rpb24gc2tpcElnbm9yZWROb2Rlc1JpZ2h0KHZpZXcpIHtcbiAgdmFyIHNlbCA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgdmFyIG5vZGUgPSBzZWwuZm9jdXNOb2RlLCBvZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7XG4gIGlmICghbm9kZSkgeyByZXR1cm4gfVxuICB2YXIgbGVuID0gbm9kZUxlbihub2RlKTtcbiAgdmFyIG1vdmVOb2RlLCBtb3ZlT2Zmc2V0O1xuICBmb3IgKDs7KSB7XG4gICAgaWYgKG9mZnNldCA8IGxlbikge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT0gMSkgeyBicmVhayB9XG4gICAgICB2YXIgYWZ0ZXIgPSBub2RlLmNoaWxkTm9kZXNbb2Zmc2V0XTtcbiAgICAgIGlmIChpc0lnbm9yYWJsZShhZnRlcikpIHtcbiAgICAgICAgbW92ZU5vZGUgPSBub2RlO1xuICAgICAgICBtb3ZlT2Zmc2V0ID0gKytvZmZzZXQ7XG4gICAgICB9XG4gICAgICBlbHNlIHsgYnJlYWsgfVxuICAgIH0gZWxzZSBpZiAoaXNCbG9ja05vZGUobm9kZSkpIHtcbiAgICAgIGJyZWFrXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIHdoaWxlIChuZXh0ICYmIGlzSWdub3JhYmxlKG5leHQpKSB7XG4gICAgICAgIG1vdmVOb2RlID0gbmV4dC5wYXJlbnROb2RlO1xuICAgICAgICBtb3ZlT2Zmc2V0ID0gZG9tSW5kZXgobmV4dCkgKyAxO1xuICAgICAgICBuZXh0ID0gbmV4dC5uZXh0U2libGluZztcbiAgICAgIH1cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAobm9kZSA9PSB2aWV3LmRvbSkgeyBicmVhayB9XG4gICAgICAgIG9mZnNldCA9IGxlbiA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlID0gbmV4dDtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgbGVuID0gbm9kZUxlbihub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKG1vdmVOb2RlKSB7IHNldFNlbEZvY3VzKHZpZXcsIHNlbCwgbW92ZU5vZGUsIG1vdmVPZmZzZXQpOyB9XG59XG5cbmZ1bmN0aW9uIGlzQmxvY2tOb2RlKGRvbSkge1xuICB2YXIgZGVzYyA9IGRvbS5wbVZpZXdEZXNjO1xuICByZXR1cm4gZGVzYyAmJiBkZXNjLm5vZGUgJiYgZGVzYy5ub2RlLmlzQmxvY2tcbn1cblxuZnVuY3Rpb24gc2V0U2VsRm9jdXModmlldywgc2VsLCBub2RlLCBvZmZzZXQpIHtcbiAgaWYgKHNlbGVjdGlvbkNvbGxhcHNlZChzZWwpKSB7XG4gICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZXRFbmQobm9kZSwgb2Zmc2V0KTtcbiAgICByYW5nZS5zZXRTdGFydChub2RlLCBvZmZzZXQpO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICB9IGVsc2UgaWYgKHNlbC5leHRlbmQpIHtcbiAgICBzZWwuZXh0ZW5kKG5vZGUsIG9mZnNldCk7XG4gIH1cbiAgdmlldy5kb21PYnNlcnZlci5zZXRDdXJTZWxlY3Rpb24oKTtcbiAgdmFyIHN0YXRlID0gdmlldy5zdGF0ZTtcbiAgLy8gSWYgbm8gc3RhdGUgdXBkYXRlIGVuZHMgdXAgaGFwcGVuaW5nLCByZXNldCB0aGUgc2VsZWN0aW9uLlxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodmlldy5zdGF0ZSA9PSBzdGF0ZSkgeyBzZWxlY3Rpb25Ub0RPTSh2aWV3KTsgfVxuICB9LCA1MCk7XG59XG5cbi8vIDogKEVkaXRvclN0YXRlLCBudW1iZXIpXG4vLyBDaGVjayB3aGV0aGVyIHZlcnRpY2FsIHNlbGVjdGlvbiBtb3Rpb24gd291bGQgaW52b2x2ZSBub2RlXG4vLyBzZWxlY3Rpb25zLiBJZiBzbywgYXBwbHkgaXQgKGlmIG5vdCwgdGhlIHJlc3VsdCBpcyBsZWZ0IHRvIHRoZVxuLy8gYnJvd3NlcilcbmZ1bmN0aW9uIHNlbGVjdFZlcnRpY2FsbHkodmlldywgZGlyLCBtb2RzKSB7XG4gIHZhciBzZWwgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbjtcbiAgaWYgKHNlbCBpbnN0YW5jZW9mIFRleHRTZWxlY3Rpb24gJiYgIXNlbC5lbXB0eSB8fCBtb2RzLmluZGV4T2YoXCJzXCIpID4gLTEpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHJlc3VsdC5tYWMgJiYgbW9kcy5pbmRleE9mKFwibVwiKSA+IC0xKSB7IHJldHVybiBmYWxzZSB9XG4gIHZhciAkZnJvbSA9IHNlbC4kZnJvbTtcbiAgdmFyICR0byA9IHNlbC4kdG87XG5cbiAgaWYgKCEkZnJvbS5wYXJlbnQuaW5saW5lQ29udGVudCB8fCB2aWV3LmVuZE9mVGV4dGJsb2NrKGRpciA8IDAgPyBcInVwXCIgOiBcImRvd25cIikpIHtcbiAgICB2YXIgbmV4dCA9IG1vdmVTZWxlY3Rpb25CbG9jayh2aWV3LnN0YXRlLCBkaXIpO1xuICAgIGlmIChuZXh0ICYmIChuZXh0IGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbikpXG4gICAgICB7IHJldHVybiBhcHBseSh2aWV3LCBuZXh0KSB9XG4gIH1cbiAgaWYgKCEkZnJvbS5wYXJlbnQuaW5saW5lQ29udGVudCkge1xuICAgIHZhciBzaWRlID0gZGlyIDwgMCA/ICRmcm9tIDogJHRvO1xuICAgIHZhciBiZXlvbmQgPSBzZWwgaW5zdGFuY2VvZiBBbGxTZWxlY3Rpb24gPyBTZWxlY3Rpb24ubmVhcihzaWRlLCBkaXIpIDogU2VsZWN0aW9uLmZpbmRGcm9tKHNpZGUsIGRpcik7XG4gICAgcmV0dXJuIGJleW9uZCA/IGFwcGx5KHZpZXcsIGJleW9uZCkgOiBmYWxzZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBzdG9wTmF0aXZlSG9yaXpvbnRhbERlbGV0ZSh2aWV3LCBkaXIpIHtcbiAgaWYgKCEodmlldy5zdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSkgeyByZXR1cm4gdHJ1ZSB9XG4gIHZhciByZWYgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbjtcbiAgdmFyICRoZWFkID0gcmVmLiRoZWFkO1xuICB2YXIgJGFuY2hvciA9IHJlZi4kYW5jaG9yO1xuICB2YXIgZW1wdHkgPSByZWYuZW1wdHk7XG4gIGlmICghJGhlYWQuc2FtZVBhcmVudCgkYW5jaG9yKSkgeyByZXR1cm4gdHJ1ZSB9XG4gIGlmICghZW1wdHkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHZpZXcuZW5kT2ZUZXh0YmxvY2soZGlyID4gMCA/IFwiZm9yd2FyZFwiIDogXCJiYWNrd2FyZFwiKSkgeyByZXR1cm4gdHJ1ZSB9XG4gIHZhciBuZXh0Tm9kZSA9ICEkaGVhZC50ZXh0T2Zmc2V0ICYmIChkaXIgPCAwID8gJGhlYWQubm9kZUJlZm9yZSA6ICRoZWFkLm5vZGVBZnRlcik7XG4gIGlmIChuZXh0Tm9kZSAmJiAhbmV4dE5vZGUuaXNUZXh0KSB7XG4gICAgdmFyIHRyID0gdmlldy5zdGF0ZS50cjtcbiAgICBpZiAoZGlyIDwgMCkgeyB0ci5kZWxldGUoJGhlYWQucG9zIC0gbmV4dE5vZGUubm9kZVNpemUsICRoZWFkLnBvcyk7IH1cbiAgICBlbHNlIHsgdHIuZGVsZXRlKCRoZWFkLnBvcywgJGhlYWQucG9zICsgbmV4dE5vZGUubm9kZVNpemUpOyB9XG4gICAgdmlldy5kaXNwYXRjaCh0cik7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gc3dpdGNoRWRpdGFibGUodmlldywgbm9kZSwgc3RhdGUpIHtcbiAgdmlldy5kb21PYnNlcnZlci5zdG9wKCk7XG4gIG5vZGUuY29udGVudEVkaXRhYmxlID0gc3RhdGU7XG4gIHZpZXcuZG9tT2JzZXJ2ZXIuc3RhcnQoKTtcbn1cblxuLy8gSXNzdWUgIzg2NyAvICMxMDkwIC8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9OTAzODIxXG4vLyBJbiB3aGljaCBTYWZhcmkgKGFuZCBhdCBzb21lIHBvaW50IGluIHRoZSBwYXN0LCBDaHJvbWUpIGRvZXMgcmVhbGx5XG4vLyB3cm9uZyB0aGluZ3Mgd2hlbiB0aGUgZG93biBhcnJvdyBpcyBwcmVzc2VkIHdoZW4gdGhlIGN1cnNvciBpc1xuLy8gZGlyZWN0bHkgYXQgdGhlIHN0YXJ0IG9mIGEgdGV4dGJsb2NrIGFuZCBoYXMgYW4gdW5lZGl0YWJsZSBub2RlXG4vLyBhZnRlciBpdFxuZnVuY3Rpb24gc2FmYXJpRG93bkFycm93QnVnKHZpZXcpIHtcbiAgaWYgKCFyZXN1bHQuc2FmYXJpIHx8IHZpZXcuc3RhdGUuc2VsZWN0aW9uLiRoZWFkLnBhcmVudE9mZnNldCA+IDApIHsgcmV0dXJuIH1cbiAgdmFyIHJlZiA9IHZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgdmFyIGZvY3VzTm9kZSA9IHJlZi5mb2N1c05vZGU7XG4gIHZhciBmb2N1c09mZnNldCA9IHJlZi5mb2N1c09mZnNldDtcbiAgaWYgKGZvY3VzTm9kZSAmJiBmb2N1c05vZGUubm9kZVR5cGUgPT0gMSAmJiBmb2N1c09mZnNldCA9PSAwICYmXG4gICAgICBmb2N1c05vZGUuZmlyc3RDaGlsZCAmJiBmb2N1c05vZGUuZmlyc3RDaGlsZC5jb250ZW50RWRpdGFibGUgPT0gXCJmYWxzZVwiKSB7XG4gICAgdmFyIGNoaWxkID0gZm9jdXNOb2RlLmZpcnN0Q2hpbGQ7XG4gICAgc3dpdGNoRWRpdGFibGUodmlldywgY2hpbGQsIHRydWUpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3dpdGNoRWRpdGFibGUodmlldywgY2hpbGQsIGZhbHNlKTsgfSwgMjApO1xuICB9XG59XG5cbi8vIEEgYmFja2Ryb3Aga2V5IG1hcHBpbmcgdXNlZCB0byBtYWtlIHN1cmUgd2UgYWx3YXlzIHN1cHByZXNzIGtleXNcbi8vIHRoYXQgaGF2ZSBhIGRhbmdlcm91cyBkZWZhdWx0IGVmZmVjdCwgZXZlbiBpZiB0aGUgY29tbWFuZHMgdGhleSBhcmVcbi8vIGJvdW5kIHRvIHJldHVybiBmYWxzZSwgYW5kIHRvIG1ha2Ugc3VyZSB0aGF0IGN1cnNvci1tb3Rpb24ga2V5c1xuLy8gZmluZCBhIGN1cnNvciAoYXMgb3Bwb3NlZCB0byBhIG5vZGUgc2VsZWN0aW9uKSB3aGVuIHByZXNzZWQuIEZvclxuLy8gY3Vyc29yLW1vdGlvbiBrZXlzLCB0aGUgY29kZSBpbiB0aGUgaGFuZGxlcnMgYWxzbyB0YWtlcyBjYXJlIG9mXG4vLyBibG9jayBzZWxlY3Rpb25zLlxuXG5mdW5jdGlvbiBnZXRNb2RzKGV2ZW50KSB7XG4gIHZhciByZXN1bHQgPSBcIlwiO1xuICBpZiAoZXZlbnQuY3RybEtleSkgeyByZXN1bHQgKz0gXCJjXCI7IH1cbiAgaWYgKGV2ZW50Lm1ldGFLZXkpIHsgcmVzdWx0ICs9IFwibVwiOyB9XG4gIGlmIChldmVudC5hbHRLZXkpIHsgcmVzdWx0ICs9IFwiYVwiOyB9XG4gIGlmIChldmVudC5zaGlmdEtleSkgeyByZXN1bHQgKz0gXCJzXCI7IH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBjYXB0dXJlS2V5RG93bih2aWV3LCBldmVudCkge1xuICB2YXIgY29kZSA9IGV2ZW50LmtleUNvZGUsIG1vZHMgPSBnZXRNb2RzKGV2ZW50KTtcbiAgaWYgKGNvZGUgPT0gOCB8fCAocmVzdWx0Lm1hYyAmJiBjb2RlID09IDcyICYmIG1vZHMgPT0gXCJjXCIpKSB7IC8vIEJhY2tzcGFjZSwgQ3RybC1oIG9uIE1hY1xuICAgIHJldHVybiBzdG9wTmF0aXZlSG9yaXpvbnRhbERlbGV0ZSh2aWV3LCAtMSkgfHwgc2tpcElnbm9yZWROb2Rlc0xlZnQodmlldylcbiAgfSBlbHNlIGlmIChjb2RlID09IDQ2IHx8IChyZXN1bHQubWFjICYmIGNvZGUgPT0gNjggJiYgbW9kcyA9PSBcImNcIikpIHsgLy8gRGVsZXRlLCBDdHJsLWQgb24gTWFjXG4gICAgcmV0dXJuIHN0b3BOYXRpdmVIb3Jpem9udGFsRGVsZXRlKHZpZXcsIDEpIHx8IHNraXBJZ25vcmVkTm9kZXNSaWdodCh2aWV3KVxuICB9IGVsc2UgaWYgKGNvZGUgPT0gMTMgfHwgY29kZSA9PSAyNykgeyAvLyBFbnRlciwgRXNjXG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChjb2RlID09IDM3KSB7IC8vIExlZnQgYXJyb3dcbiAgICByZXR1cm4gc2VsZWN0SG9yaXpvbnRhbGx5KHZpZXcsIC0xLCBtb2RzKSB8fCBza2lwSWdub3JlZE5vZGVzTGVmdCh2aWV3KVxuICB9IGVsc2UgaWYgKGNvZGUgPT0gMzkpIHsgLy8gUmlnaHQgYXJyb3dcbiAgICByZXR1cm4gc2VsZWN0SG9yaXpvbnRhbGx5KHZpZXcsIDEsIG1vZHMpIHx8IHNraXBJZ25vcmVkTm9kZXNSaWdodCh2aWV3KVxuICB9IGVsc2UgaWYgKGNvZGUgPT0gMzgpIHsgLy8gVXAgYXJyb3dcbiAgICByZXR1cm4gc2VsZWN0VmVydGljYWxseSh2aWV3LCAtMSwgbW9kcykgfHwgc2tpcElnbm9yZWROb2Rlc0xlZnQodmlldylcbiAgfSBlbHNlIGlmIChjb2RlID09IDQwKSB7IC8vIERvd24gYXJyb3dcbiAgICByZXR1cm4gc2FmYXJpRG93bkFycm93QnVnKHZpZXcpIHx8IHNlbGVjdFZlcnRpY2FsbHkodmlldywgMSwgbW9kcykgfHwgc2tpcElnbm9yZWROb2Rlc1JpZ2h0KHZpZXcpXG4gIH0gZWxzZSBpZiAobW9kcyA9PSAocmVzdWx0Lm1hYyA/IFwibVwiIDogXCJjXCIpICYmXG4gICAgICAgICAgICAgKGNvZGUgPT0gNjYgfHwgY29kZSA9PSA3MyB8fCBjb2RlID09IDg5IHx8IGNvZGUgPT0gOTApKSB7IC8vIE1vZC1bYml5el1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBOb3RlIHRoYXQgYWxsIHJlZmVyZW5jaW5nIGFuZCBwYXJzaW5nIGlzIGRvbmUgd2l0aCB0aGVcbi8vIHN0YXJ0LW9mLW9wZXJhdGlvbiBzZWxlY3Rpb24gYW5kIGRvY3VtZW50LCBzaW5jZSB0aGF0J3MgdGhlIG9uZVxuLy8gdGhhdCB0aGUgRE9NIHJlcHJlc2VudHMuIElmIGFueSBjaGFuZ2VzIGNhbWUgaW4gaW4gdGhlIG1lYW50aW1lLFxuLy8gdGhlIG1vZGlmaWNhdGlvbiBpcyBtYXBwZWQgb3ZlciB0aG9zZSBiZWZvcmUgaXQgaXMgYXBwbGllZCwgaW5cbi8vIHJlYWRET01DaGFuZ2UuXG5cbmZ1bmN0aW9uIHBhcnNlQmV0d2Vlbih2aWV3LCBmcm9tXywgdG9fKSB7XG4gIHZhciByZWYgPSB2aWV3LmRvY1ZpZXcucGFyc2VSYW5nZShmcm9tXywgdG9fKTtcbiAgdmFyIHBhcmVudCA9IHJlZi5ub2RlO1xuICB2YXIgZnJvbU9mZnNldCA9IHJlZi5mcm9tT2Zmc2V0O1xuICB2YXIgdG9PZmZzZXQgPSByZWYudG9PZmZzZXQ7XG4gIHZhciBmcm9tID0gcmVmLmZyb207XG4gIHZhciB0byA9IHJlZi50bztcblxuICB2YXIgZG9tU2VsID0gdmlldy5yb290LmdldFNlbGVjdGlvbigpLCBmaW5kID0gbnVsbCwgYW5jaG9yID0gZG9tU2VsLmFuY2hvck5vZGU7XG4gIGlmIChhbmNob3IgJiYgdmlldy5kb20uY29udGFpbnMoYW5jaG9yLm5vZGVUeXBlID09IDEgPyBhbmNob3IgOiBhbmNob3IucGFyZW50Tm9kZSkpIHtcbiAgICBmaW5kID0gW3tub2RlOiBhbmNob3IsIG9mZnNldDogZG9tU2VsLmFuY2hvck9mZnNldH1dO1xuICAgIGlmICghc2VsZWN0aW9uQ29sbGFwc2VkKGRvbVNlbCkpXG4gICAgICB7IGZpbmQucHVzaCh7bm9kZTogZG9tU2VsLmZvY3VzTm9kZSwgb2Zmc2V0OiBkb21TZWwuZm9jdXNPZmZzZXR9KTsgfVxuICB9XG4gIC8vIFdvcmsgYXJvdW5kIGlzc3VlIGluIENocm9tZSB3aGVyZSBiYWNrc3BhY2luZyBzb21ldGltZXMgcmVwbGFjZXNcbiAgLy8gdGhlIGRlbGV0ZWQgY29udGVudCB3aXRoIGEgcmFuZG9tIEJSIG5vZGUgKGlzc3VlcyAjNzk5LCAjODMxKVxuICBpZiAocmVzdWx0LmNocm9tZSAmJiB2aWV3Lmxhc3RLZXlDb2RlID09PSA4KSB7XG4gICAgZm9yICh2YXIgb2ZmID0gdG9PZmZzZXQ7IG9mZiA+IGZyb21PZmZzZXQ7IG9mZi0tKSB7XG4gICAgICB2YXIgbm9kZSA9IHBhcmVudC5jaGlsZE5vZGVzW29mZiAtIDFdLCBkZXNjID0gbm9kZS5wbVZpZXdEZXNjO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gXCJCUlwiICYmICFkZXNjKSB7IHRvT2Zmc2V0ID0gb2ZmOyBicmVhayB9XG4gICAgICBpZiAoIWRlc2MgfHwgZGVzYy5zaXplKSB7IGJyZWFrIH1cbiAgICB9XG4gIH1cbiAgdmFyIHN0YXJ0RG9jID0gdmlldy5zdGF0ZS5kb2M7XG4gIHZhciBwYXJzZXIgPSB2aWV3LnNvbWVQcm9wKFwiZG9tUGFyc2VyXCIpIHx8IERPTVBhcnNlci5mcm9tU2NoZW1hKHZpZXcuc3RhdGUuc2NoZW1hKTtcbiAgdmFyICRmcm9tID0gc3RhcnREb2MucmVzb2x2ZShmcm9tKTtcblxuICB2YXIgc2VsID0gbnVsbCwgZG9jID0gcGFyc2VyLnBhcnNlKHBhcmVudCwge1xuICAgIHRvcE5vZGU6ICRmcm9tLnBhcmVudCxcbiAgICB0b3BNYXRjaDogJGZyb20ucGFyZW50LmNvbnRlbnRNYXRjaEF0KCRmcm9tLmluZGV4KCkpLFxuICAgIHRvcE9wZW46IHRydWUsXG4gICAgZnJvbTogZnJvbU9mZnNldCxcbiAgICB0bzogdG9PZmZzZXQsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlOiAkZnJvbS5wYXJlbnQudHlwZS5zcGVjLmNvZGUgPyBcImZ1bGxcIiA6IHRydWUsXG4gICAgZWRpdGFibGVDb250ZW50OiB0cnVlLFxuICAgIGZpbmRQb3NpdGlvbnM6IGZpbmQsXG4gICAgcnVsZUZyb21Ob2RlOiBydWxlRnJvbU5vZGUsXG4gICAgY29udGV4dDogJGZyb21cbiAgfSk7XG4gIGlmIChmaW5kICYmIGZpbmRbMF0ucG9zICE9IG51bGwpIHtcbiAgICB2YXIgYW5jaG9yJDEgPSBmaW5kWzBdLnBvcywgaGVhZCA9IGZpbmRbMV0gJiYgZmluZFsxXS5wb3M7XG4gICAgaWYgKGhlYWQgPT0gbnVsbCkgeyBoZWFkID0gYW5jaG9yJDE7IH1cbiAgICBzZWwgPSB7YW5jaG9yOiBhbmNob3IkMSArIGZyb20sIGhlYWQ6IGhlYWQgKyBmcm9tfTtcbiAgfVxuICByZXR1cm4ge2RvYzogZG9jLCBzZWw6IHNlbCwgZnJvbTogZnJvbSwgdG86IHRvfVxufVxuXG5mdW5jdGlvbiBydWxlRnJvbU5vZGUoZG9tKSB7XG4gIHZhciBkZXNjID0gZG9tLnBtVmlld0Rlc2M7XG4gIGlmIChkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MucGFyc2VSdWxlKClcbiAgfSBlbHNlIGlmIChkb20ubm9kZU5hbWUgPT0gXCJCUlwiICYmIGRvbS5wYXJlbnROb2RlKSB7XG4gICAgLy8gU2FmYXJpIHJlcGxhY2VzIHRoZSBsaXN0IGl0ZW0gb3IgdGFibGUgY2VsbCB3aXRoIGEgQlJcbiAgICAvLyBkaXJlY3RseSBpbiB0aGUgbGlzdCBub2RlICg/ISkgaWYgeW91IGRlbGV0ZSB0aGUgbGFzdFxuICAgIC8vIGNoYXJhY3RlciBpbiBhIGxpc3QgaXRlbSBvciB0YWJsZSBjZWxsICgjNzA4LCAjODYyKVxuICAgIGlmIChyZXN1bHQuc2FmYXJpICYmIC9eKHVsfG9sKSQvaS50ZXN0KGRvbS5wYXJlbnROb2RlLm5vZGVOYW1lKSkge1xuICAgICAgdmFyIHNraXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc2tpcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIikpO1xuICAgICAgcmV0dXJuIHtza2lwOiBza2lwfVxuICAgIH0gZWxzZSBpZiAoZG9tLnBhcmVudE5vZGUubGFzdENoaWxkID09IGRvbSB8fCByZXN1bHQuc2FmYXJpICYmIC9eKHRyfHRhYmxlKSQvaS50ZXN0KGRvbS5wYXJlbnROb2RlLm5vZGVOYW1lKSkge1xuICAgICAgcmV0dXJuIHtpZ25vcmU6IHRydWV9XG4gICAgfVxuICB9IGVsc2UgaWYgKGRvbS5ub2RlTmFtZSA9PSBcIklNR1wiICYmIGRvbS5nZXRBdHRyaWJ1dGUoXCJtYXJrLXBsYWNlaG9sZGVyXCIpKSB7XG4gICAgcmV0dXJuIHtpZ25vcmU6IHRydWV9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZERPTUNoYW5nZSh2aWV3LCBmcm9tLCB0bywgdHlwZU92ZXIsIGFkZGVkTm9kZXMpIHtcbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgdmFyIG9yaWdpbiA9IHZpZXcubGFzdFNlbGVjdGlvblRpbWUgPiBEYXRlLm5vdygpIC0gNTAgPyB2aWV3Lmxhc3RTZWxlY3Rpb25PcmlnaW4gOiBudWxsO1xuICAgIHZhciBuZXdTZWwgPSBzZWxlY3Rpb25Gcm9tRE9NKHZpZXcsIG9yaWdpbik7XG4gICAgaWYgKG5ld1NlbCAmJiAhdmlldy5zdGF0ZS5zZWxlY3Rpb24uZXEobmV3U2VsKSkge1xuICAgICAgdmFyIHRyJDEgPSB2aWV3LnN0YXRlLnRyLnNldFNlbGVjdGlvbihuZXdTZWwpO1xuICAgICAgaWYgKG9yaWdpbiA9PSBcInBvaW50ZXJcIikgeyB0ciQxLnNldE1ldGEoXCJwb2ludGVyXCIsIHRydWUpOyB9XG4gICAgICBlbHNlIGlmIChvcmlnaW4gPT0gXCJrZXlcIikgeyB0ciQxLnNjcm9sbEludG9WaWV3KCk7IH1cbiAgICAgIHZpZXcuZGlzcGF0Y2godHIkMSk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgdmFyICRiZWZvcmUgPSB2aWV3LnN0YXRlLmRvYy5yZXNvbHZlKGZyb20pO1xuICB2YXIgc2hhcmVkID0gJGJlZm9yZS5zaGFyZWREZXB0aCh0byk7XG4gIGZyb20gPSAkYmVmb3JlLmJlZm9yZShzaGFyZWQgKyAxKTtcbiAgdG8gPSB2aWV3LnN0YXRlLmRvYy5yZXNvbHZlKHRvKS5hZnRlcihzaGFyZWQgKyAxKTtcblxuICB2YXIgc2VsID0gdmlldy5zdGF0ZS5zZWxlY3Rpb247XG4gIHZhciBwYXJzZSA9IHBhcnNlQmV0d2Vlbih2aWV3LCBmcm9tLCB0byk7XG4gIC8vIENocm9tZSBzb21ldGltZXMgbGVhdmVzIHRoZSBjdXJzb3IgYmVmb3JlIHRoZSBpbnNlcnRlZCB0ZXh0IHdoZW5cbiAgLy8gY29tcG9zaW5nIGFmdGVyIGEgY3Vyc29yIHdyYXBwZXIuIFRoaXMgbW92ZXMgaXQgZm9yd2FyZC5cbiAgaWYgKHJlc3VsdC5jaHJvbWUgJiYgdmlldy5jdXJzb3JXcmFwcGVyICYmIHBhcnNlLnNlbCAmJiBwYXJzZS5zZWwuYW5jaG9yID09IHZpZXcuY3Vyc29yV3JhcHBlci5kZWNvLmZyb20pIHtcbiAgICB2YXIgdGV4dCA9IHZpZXcuY3Vyc29yV3JhcHBlci5kZWNvLnR5cGUudG9ET00ubmV4dFNpYmxpbmc7XG4gICAgdmFyIHNpemUgPSB0ZXh0ICYmIHRleHQubm9kZVZhbHVlID8gdGV4dC5ub2RlVmFsdWUubGVuZ3RoIDogMTtcbiAgICBwYXJzZS5zZWwgPSB7YW5jaG9yOiBwYXJzZS5zZWwuYW5jaG9yICsgc2l6ZSwgaGVhZDogcGFyc2Uuc2VsLmFuY2hvciArIHNpemV9O1xuICB9XG5cbiAgdmFyIGRvYyA9IHZpZXcuc3RhdGUuZG9jLCBjb21wYXJlID0gZG9jLnNsaWNlKHBhcnNlLmZyb20sIHBhcnNlLnRvKTtcbiAgdmFyIHByZWZlcnJlZFBvcywgcHJlZmVycmVkU2lkZTtcbiAgLy8gUHJlZmVyIGFuY2hvcmluZyB0byBlbmQgd2hlbiBCYWNrc3BhY2UgaXMgcHJlc3NlZFxuICBpZiAodmlldy5sYXN0S2V5Q29kZSA9PT0gOCAmJiBEYXRlLm5vdygpIC0gMTAwIDwgdmlldy5sYXN0S2V5Q29kZVRpbWUpIHtcbiAgICBwcmVmZXJyZWRQb3MgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbi50bztcbiAgICBwcmVmZXJyZWRTaWRlID0gXCJlbmRcIjtcbiAgfSBlbHNlIHtcbiAgICBwcmVmZXJyZWRQb3MgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbi5mcm9tO1xuICAgIHByZWZlcnJlZFNpZGUgPSBcInN0YXJ0XCI7XG4gIH1cbiAgdmlldy5sYXN0S2V5Q29kZSA9IG51bGw7XG5cbiAgdmFyIGNoYW5nZSA9IGZpbmREaWZmKGNvbXBhcmUuY29udGVudCwgcGFyc2UuZG9jLmNvbnRlbnQsIHBhcnNlLmZyb20sIHByZWZlcnJlZFBvcywgcHJlZmVycmVkU2lkZSk7XG4gIGlmICghY2hhbmdlKSB7XG4gICAgaWYgKHR5cGVPdmVyICYmIHNlbCBpbnN0YW5jZW9mIFRleHRTZWxlY3Rpb24gJiYgIXNlbC5lbXB0eSAmJiBzZWwuJGhlYWQuc2FtZVBhcmVudChzZWwuJGFuY2hvcikgJiZcbiAgICAgICAgIXZpZXcuY29tcG9zaW5nICYmICEocGFyc2Uuc2VsICYmIHBhcnNlLnNlbC5hbmNob3IgIT0gcGFyc2Uuc2VsLmhlYWQpKSB7XG4gICAgICBjaGFuZ2UgPSB7c3RhcnQ6IHNlbC5mcm9tLCBlbmRBOiBzZWwudG8sIGVuZEI6IHNlbC50b307XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuaW9zICYmIHZpZXcubGFzdElPU0VudGVyID4gRGF0ZS5ub3coKSAtIDIyNSAmJlxuICAgICAgICAgICAgICAgYWRkZWROb2Rlcy5zb21lKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLm5vZGVOYW1lID09IFwiRElWXCIgfHwgbi5ub2RlTmFtZSA9PSBcIlBcIjsgfSkgJiZcbiAgICAgICAgICAgICAgIHZpZXcuc29tZVByb3AoXCJoYW5kbGVLZXlEb3duXCIsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKHZpZXcsIGtleUV2ZW50KDEzLCBcIkVudGVyXCIpKTsgfSkpIHtcbiAgICAgIHZpZXcubGFzdElPU0VudGVyID0gMDtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyc2Uuc2VsKSB7XG4gICAgICAgIHZhciBzZWwkMSA9IHJlc29sdmVTZWxlY3Rpb24odmlldywgdmlldy5zdGF0ZS5kb2MsIHBhcnNlLnNlbCk7XG4gICAgICAgIGlmIChzZWwkMSAmJiAhc2VsJDEuZXEodmlldy5zdGF0ZS5zZWxlY3Rpb24pKSB7IHZpZXcuZGlzcGF0Y2godmlldy5zdGF0ZS50ci5zZXRTZWxlY3Rpb24oc2VsJDEpKTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG4gIHZpZXcuZG9tQ2hhbmdlQ291bnQrKztcbiAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIG92ZXJ3cml0aW5nIGEgc2VsZWN0aW9uIGJ5IHR5cGluZyBtYXRjaGVzXG4gIC8vIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIHNlbGVjdGVkIGNvbnRlbnQsIGNyZWF0aW5nIGEgY2hhbmdlXG4gIC8vIHRoYXQncyBzbWFsbGVyIHRoYW4gd2hhdCB3YXMgYWN0dWFsbHkgb3ZlcndyaXR0ZW4uXG4gIGlmICh2aWV3LnN0YXRlLnNlbGVjdGlvbi5mcm9tIDwgdmlldy5zdGF0ZS5zZWxlY3Rpb24udG8gJiZcbiAgICAgIGNoYW5nZS5zdGFydCA9PSBjaGFuZ2UuZW5kQiAmJlxuICAgICAgdmlldy5zdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB7XG4gICAgaWYgKGNoYW5nZS5zdGFydCA+IHZpZXcuc3RhdGUuc2VsZWN0aW9uLmZyb20gJiYgY2hhbmdlLnN0YXJ0IDw9IHZpZXcuc3RhdGUuc2VsZWN0aW9uLmZyb20gKyAyKSB7XG4gICAgICBjaGFuZ2Uuc3RhcnQgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbi5mcm9tO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlLmVuZEEgPCB2aWV3LnN0YXRlLnNlbGVjdGlvbi50byAmJiBjaGFuZ2UuZW5kQSA+PSB2aWV3LnN0YXRlLnNlbGVjdGlvbi50byAtIDIpIHtcbiAgICAgIGNoYW5nZS5lbmRCICs9ICh2aWV3LnN0YXRlLnNlbGVjdGlvbi50byAtIGNoYW5nZS5lbmRBKTtcbiAgICAgIGNoYW5nZS5lbmRBID0gdmlldy5zdGF0ZS5zZWxlY3Rpb24udG87XG4gICAgfVxuICB9XG5cbiAgLy8gSUUxMSB3aWxsIGluc2VydCBhIG5vbi1icmVha2luZyBzcGFjZSBfYWhlYWRfIG9mIHRoZSBzcGFjZSBhZnRlclxuICAvLyB0aGUgY3Vyc29yIHNwYWNlIHdoZW4gYWRkaW5nIGEgc3BhY2UgYmVmb3JlIGFub3RoZXIgc3BhY2UuIFdoZW5cbiAgLy8gdGhhdCBoYXBwZW5lZCwgYWRqdXN0IHRoZSBjaGFuZ2UgdG8gY292ZXIgdGhlIHNwYWNlIGluc3RlYWQuXG4gIGlmIChyZXN1bHQuaWUgJiYgcmVzdWx0LmllX3ZlcnNpb24gPD0gMTEgJiYgY2hhbmdlLmVuZEIgPT0gY2hhbmdlLnN0YXJ0ICsgMSAmJlxuICAgICAgY2hhbmdlLmVuZEEgPT0gY2hhbmdlLnN0YXJ0ICYmIGNoYW5nZS5zdGFydCA+IHBhcnNlLmZyb20gJiZcbiAgICAgIHBhcnNlLmRvYy50ZXh0QmV0d2VlbihjaGFuZ2Uuc3RhcnQgLSBwYXJzZS5mcm9tIC0gMSwgY2hhbmdlLnN0YXJ0IC0gcGFyc2UuZnJvbSArIDEpID09IFwiIFxcdTAwYTBcIikge1xuICAgIGNoYW5nZS5zdGFydC0tO1xuICAgIGNoYW5nZS5lbmRBLS07XG4gICAgY2hhbmdlLmVuZEItLTtcbiAgfVxuXG4gIHZhciAkZnJvbSA9IHBhcnNlLmRvYy5yZXNvbHZlTm9DYWNoZShjaGFuZ2Uuc3RhcnQgLSBwYXJzZS5mcm9tKTtcbiAgdmFyICR0byA9IHBhcnNlLmRvYy5yZXNvbHZlTm9DYWNoZShjaGFuZ2UuZW5kQiAtIHBhcnNlLmZyb20pO1xuICB2YXIgaW5saW5lQ2hhbmdlID0gJGZyb20uc2FtZVBhcmVudCgkdG8pICYmICRmcm9tLnBhcmVudC5pbmxpbmVDb250ZW50O1xuICB2YXIgbmV4dFNlbDtcbiAgLy8gSWYgdGhpcyBsb29rcyBsaWtlIHRoZSBlZmZlY3Qgb2YgcHJlc3NpbmcgRW50ZXIgKG9yIHdhcyByZWNvcmRlZFxuICAvLyBhcyBiZWluZyBhbiBpT1MgZW50ZXIgcHJlc3MpLCBqdXN0IGRpc3BhdGNoIGFuIEVudGVyIGtleSBpbnN0ZWFkLlxuICBpZiAoKChyZXN1bHQuaW9zICYmIHZpZXcubGFzdElPU0VudGVyID4gRGF0ZS5ub3coKSAtIDIyNSAmJlxuICAgICAgICAoIWlubGluZUNoYW5nZSB8fCBhZGRlZE5vZGVzLnNvbWUoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4ubm9kZU5hbWUgPT0gXCJESVZcIiB8fCBuLm5vZGVOYW1lID09IFwiUFwiOyB9KSkpIHx8XG4gICAgICAgKCFpbmxpbmVDaGFuZ2UgJiYgJGZyb20ucG9zIDwgcGFyc2UuZG9jLmNvbnRlbnQuc2l6ZSAmJlxuICAgICAgICAobmV4dFNlbCA9IFNlbGVjdGlvbi5maW5kRnJvbShwYXJzZS5kb2MucmVzb2x2ZSgkZnJvbS5wb3MgKyAxKSwgMSwgdHJ1ZSkpICYmXG4gICAgICAgIG5leHRTZWwuaGVhZCA9PSAkdG8ucG9zKSkgJiZcbiAgICAgIHZpZXcuc29tZVByb3AoXCJoYW5kbGVLZXlEb3duXCIsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKHZpZXcsIGtleUV2ZW50KDEzLCBcIkVudGVyXCIpKTsgfSkpIHtcbiAgICB2aWV3Lmxhc3RJT1NFbnRlciA9IDA7XG4gICAgcmV0dXJuXG4gIH1cbiAgLy8gU2FtZSBmb3IgYmFja3NwYWNlXG4gIGlmICh2aWV3LnN0YXRlLnNlbGVjdGlvbi5hbmNob3IgPiBjaGFuZ2Uuc3RhcnQgJiZcbiAgICAgIGxvb2tzTGlrZUpvaW4oZG9jLCBjaGFuZ2Uuc3RhcnQsIGNoYW5nZS5lbmRBLCAkZnJvbSwgJHRvKSAmJlxuICAgICAgdmlldy5zb21lUHJvcChcImhhbmRsZUtleURvd25cIiwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYodmlldywga2V5RXZlbnQoOCwgXCJCYWNrc3BhY2VcIikpOyB9KSkge1xuICAgIGlmIChyZXN1bHQuYW5kcm9pZCAmJiByZXN1bHQuY2hyb21lKSB7IHZpZXcuZG9tT2JzZXJ2ZXIuc3VwcHJlc3NTZWxlY3Rpb25VcGRhdGVzKCk7IH0gLy8gIzgyMFxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gVGhpcyB0cmllcyB0byBkZXRlY3QgQW5kcm9pZCB2aXJ0dWFsIGtleWJvYXJkXG4gIC8vIGVudGVyLWFuZC1waWNrLXN1Z2dlc3Rpb24gYWN0aW9uLiBUaGF0IHNvbWV0aW1lcyAoc2VlIGlzc3VlXG4gIC8vICMxMDU5KSBmaXJzdCBmaXJlcyBhIERPTSBtdXRhdGlvbiwgYmVmb3JlIG1vdmluZyB0aGUgc2VsZWN0aW9uIHRvXG4gIC8vIHRoZSBuZXdseSBjcmVhdGVkIGJsb2NrLiBBbmQgdGhlbiwgYmVjYXVzZSBQcm9zZU1pcnJvciBjbGVhbnMgdXBcbiAgLy8gdGhlIERPTSBzZWxlY3Rpb24sIGl0IGdpdmVzIHVwIG1vdmluZyB0aGUgc2VsZWN0aW9uIGVudGlyZWx5LFxuICAvLyBsZWF2aW5nIHRoZSBjdXJzb3IgaW4gdGhlIHdyb25nIHBsYWNlLiBXaGVuIHRoYXQgaGFwcGVucywgd2UgZHJvcFxuICAvLyB0aGUgbmV3IHBhcmFncmFwaCBmcm9tIHRoZSBpbml0aWFsIGNoYW5nZSwgYW5kIGZpcmUgYSBzaW11bGF0ZWRcbiAgLy8gZW50ZXIga2V5IGFmdGVyd2FyZHMuXG4gIGlmIChyZXN1bHQuYW5kcm9pZCAmJiAhaW5saW5lQ2hhbmdlICYmICRmcm9tLnN0YXJ0KCkgIT0gJHRvLnN0YXJ0KCkgJiYgJHRvLnBhcmVudE9mZnNldCA9PSAwICYmICRmcm9tLmRlcHRoID09ICR0by5kZXB0aCAmJlxuICAgICAgcGFyc2Uuc2VsICYmIHBhcnNlLnNlbC5hbmNob3IgPT0gcGFyc2Uuc2VsLmhlYWQgJiYgcGFyc2Uuc2VsLmhlYWQgPT0gY2hhbmdlLmVuZEEpIHtcbiAgICBjaGFuZ2UuZW5kQiAtPSAyO1xuICAgICR0byA9IHBhcnNlLmRvYy5yZXNvbHZlTm9DYWNoZShjaGFuZ2UuZW5kQiAtIHBhcnNlLmZyb20pO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmlldy5zb21lUHJvcChcImhhbmRsZUtleURvd25cIiwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYodmlldywga2V5RXZlbnQoMTMsIFwiRW50ZXJcIikpOyB9KTtcbiAgICB9LCAyMCk7XG4gIH1cblxuICB2YXIgY2hGcm9tID0gY2hhbmdlLnN0YXJ0LCBjaFRvID0gY2hhbmdlLmVuZEE7XG5cbiAgdmFyIHRyLCBzdG9yZWRNYXJrcywgbWFya0NoYW5nZSwgJGZyb20xO1xuICBpZiAoaW5saW5lQ2hhbmdlKSB7XG4gICAgaWYgKCRmcm9tLnBvcyA9PSAkdG8ucG9zKSB7IC8vIERlbGV0aW9uXG4gICAgICAvLyBJRTExIHNvbWV0aW1lcyB3ZWlyZGx5IG1vdmVzIHRoZSBET00gc2VsZWN0aW9uIGFyb3VuZCBhZnRlclxuICAgICAgLy8gYmFja3NwYWNpbmcgb3V0IHRoZSBmaXJzdCBlbGVtZW50IGluIGEgdGV4dGJsb2NrXG4gICAgICBpZiAocmVzdWx0LmllICYmIHJlc3VsdC5pZV92ZXJzaW9uIDw9IDExICYmICRmcm9tLnBhcmVudE9mZnNldCA9PSAwKSB7XG4gICAgICAgIHZpZXcuZG9tT2JzZXJ2ZXIuc3VwcHJlc3NTZWxlY3Rpb25VcGRhdGVzKCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZWN0aW9uVG9ET00odmlldyk7IH0sIDIwKTtcbiAgICAgIH1cbiAgICAgIHRyID0gdmlldy5zdGF0ZS50ci5kZWxldGUoY2hGcm9tLCBjaFRvKTtcbiAgICAgIHN0b3JlZE1hcmtzID0gZG9jLnJlc29sdmUoY2hhbmdlLnN0YXJ0KS5tYXJrc0Fjcm9zcyhkb2MucmVzb2x2ZShjaGFuZ2UuZW5kQSkpO1xuICAgIH0gZWxzZSBpZiAoIC8vIEFkZGluZyBvciByZW1vdmluZyBhIG1hcmtcbiAgICAgIGNoYW5nZS5lbmRBID09IGNoYW5nZS5lbmRCICYmICgkZnJvbTEgPSBkb2MucmVzb2x2ZShjaGFuZ2Uuc3RhcnQpKSAmJlxuICAgICAgKG1hcmtDaGFuZ2UgPSBpc01hcmtDaGFuZ2UoJGZyb20ucGFyZW50LmNvbnRlbnQuY3V0KCRmcm9tLnBhcmVudE9mZnNldCwgJHRvLnBhcmVudE9mZnNldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZnJvbTEucGFyZW50LmNvbnRlbnQuY3V0KCRmcm9tMS5wYXJlbnRPZmZzZXQsIGNoYW5nZS5lbmRBIC0gJGZyb20xLnN0YXJ0KCkpKSlcbiAgICApIHtcbiAgICAgIHRyID0gdmlldy5zdGF0ZS50cjtcbiAgICAgIGlmIChtYXJrQ2hhbmdlLnR5cGUgPT0gXCJhZGRcIikgeyB0ci5hZGRNYXJrKGNoRnJvbSwgY2hUbywgbWFya0NoYW5nZS5tYXJrKTsgfVxuICAgICAgZWxzZSB7IHRyLnJlbW92ZU1hcmsoY2hGcm9tLCBjaFRvLCBtYXJrQ2hhbmdlLm1hcmspOyB9XG4gICAgfSBlbHNlIGlmICgkZnJvbS5wYXJlbnQuY2hpbGQoJGZyb20uaW5kZXgoKSkuaXNUZXh0ICYmICRmcm9tLmluZGV4KCkgPT0gJHRvLmluZGV4KCkgLSAoJHRvLnRleHRPZmZzZXQgPyAwIDogMSkpIHtcbiAgICAgIC8vIEJvdGggcG9zaXRpb25zIGluIHRoZSBzYW1lIHRleHQgbm9kZSAtLSBzaW1wbHkgaW5zZXJ0IHRleHRcbiAgICAgIHZhciB0ZXh0JDEgPSAkZnJvbS5wYXJlbnQudGV4dEJldHdlZW4oJGZyb20ucGFyZW50T2Zmc2V0LCAkdG8ucGFyZW50T2Zmc2V0KTtcbiAgICAgIGlmICh2aWV3LnNvbWVQcm9wKFwiaGFuZGxlVGV4dElucHV0XCIsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKHZpZXcsIGNoRnJvbSwgY2hUbywgdGV4dCQxKTsgfSkpIHsgcmV0dXJuIH1cbiAgICAgIHRyID0gdmlldy5zdGF0ZS50ci5pbnNlcnRUZXh0KHRleHQkMSwgY2hGcm9tLCBjaFRvKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRyKVxuICAgIHsgdHIgPSB2aWV3LnN0YXRlLnRyLnJlcGxhY2UoY2hGcm9tLCBjaFRvLCBwYXJzZS5kb2Muc2xpY2UoY2hhbmdlLnN0YXJ0IC0gcGFyc2UuZnJvbSwgY2hhbmdlLmVuZEIgLSBwYXJzZS5mcm9tKSk7IH1cbiAgaWYgKHBhcnNlLnNlbCkge1xuICAgIHZhciBzZWwkMiA9IHJlc29sdmVTZWxlY3Rpb24odmlldywgdHIuZG9jLCBwYXJzZS5zZWwpO1xuICAgIC8vIENocm9tZSBBbmRyb2lkIHdpbGwgc29tZXRpbWVzLCBkdXJpbmcgY29tcG9zaXRpb24sIHJlcG9ydCB0aGVcbiAgICAvLyBzZWxlY3Rpb24gaW4gdGhlIHdyb25nIHBsYWNlLiBJZiBpdCBsb29rcyBsaWtlIHRoYXQgaXNcbiAgICAvLyBoYXBwZW5pbmcsIGRvbid0IHVwZGF0ZSB0aGUgc2VsZWN0aW9uLlxuICAgIC8vIEVkZ2UganVzdCBkb2Vzbid0IG1vdmUgdGhlIGN1cnNvciBmb3J3YXJkIHdoZW4geW91IHN0YXJ0IHR5cGluZ1xuICAgIC8vIGluIGFuIGVtcHR5IGJsb2NrIG9yIGJldHdlZW4gYnIgbm9kZXMuXG4gICAgaWYgKHNlbCQyICYmICEocmVzdWx0LmNocm9tZSAmJiByZXN1bHQuYW5kcm9pZCAmJiB2aWV3LmNvbXBvc2luZyAmJiBzZWwkMi5lbXB0eSAmJlxuICAgICAgICAgICAgICAgICAgIChzZWwkMi5oZWFkID09IGNoRnJvbSB8fCBzZWwkMi5oZWFkID09IHRyLm1hcHBpbmcubWFwKGNoVG8pIC0gMSkgfHxcbiAgICAgICAgICAgICAgICAgcmVzdWx0LmllICYmIHNlbCQyLmVtcHR5ICYmIHNlbCQyLmhlYWQgPT0gY2hGcm9tKSlcbiAgICAgIHsgdHIuc2V0U2VsZWN0aW9uKHNlbCQyKTsgfVxuICB9XG4gIGlmIChzdG9yZWRNYXJrcykgeyB0ci5lbnN1cmVNYXJrcyhzdG9yZWRNYXJrcyk7IH1cbiAgdmlldy5kaXNwYXRjaCh0ci5zY3JvbGxJbnRvVmlldygpKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNlbGVjdGlvbih2aWV3LCBkb2MsIHBhcnNlZFNlbCkge1xuICBpZiAoTWF0aC5tYXgocGFyc2VkU2VsLmFuY2hvciwgcGFyc2VkU2VsLmhlYWQpID4gZG9jLmNvbnRlbnQuc2l6ZSkgeyByZXR1cm4gbnVsbCB9XG4gIHJldHVybiBzZWxlY3Rpb25CZXR3ZWVuKHZpZXcsIGRvYy5yZXNvbHZlKHBhcnNlZFNlbC5hbmNob3IpLCBkb2MucmVzb2x2ZShwYXJzZWRTZWwuaGVhZCkpXG59XG5cbi8vIDogKEZyYWdtZW50LCBGcmFnbWVudCkg4oaSID97bWFyazogTWFyaywgdHlwZTogc3RyaW5nfVxuLy8gR2l2ZW4gdHdvIHNhbWUtbGVuZ3RoLCBub24tZW1wdHkgZnJhZ21lbnRzIG9mIGlubGluZSBjb250ZW50LFxuLy8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGZpcnN0IGNvdWxkIGJlIGNyZWF0ZWQgZnJvbSB0aGUgc2Vjb25kIGJ5XG4vLyByZW1vdmluZyBvciBhZGRpbmcgYSBzaW5nbGUgbWFyayB0eXBlLlxuZnVuY3Rpb24gaXNNYXJrQ2hhbmdlKGN1ciwgcHJldikge1xuICB2YXIgY3VyTWFya3MgPSBjdXIuZmlyc3RDaGlsZC5tYXJrcywgcHJldk1hcmtzID0gcHJldi5maXJzdENoaWxkLm1hcmtzO1xuICB2YXIgYWRkZWQgPSBjdXJNYXJrcywgcmVtb3ZlZCA9IHByZXZNYXJrcywgdHlwZSwgbWFyaywgdXBkYXRlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZNYXJrcy5sZW5ndGg7IGkrKykgeyBhZGRlZCA9IHByZXZNYXJrc1tpXS5yZW1vdmVGcm9tU2V0KGFkZGVkKTsgfVxuICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjdXJNYXJrcy5sZW5ndGg7IGkkMSsrKSB7IHJlbW92ZWQgPSBjdXJNYXJrc1tpJDFdLnJlbW92ZUZyb21TZXQocmVtb3ZlZCk7IH1cbiAgaWYgKGFkZGVkLmxlbmd0aCA9PSAxICYmIHJlbW92ZWQubGVuZ3RoID09IDApIHtcbiAgICBtYXJrID0gYWRkZWRbMF07XG4gICAgdHlwZSA9IFwiYWRkXCI7XG4gICAgdXBkYXRlID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUubWFyayhtYXJrLmFkZFRvU2V0KG5vZGUubWFya3MpKTsgfTtcbiAgfSBlbHNlIGlmIChhZGRlZC5sZW5ndGggPT0gMCAmJiByZW1vdmVkLmxlbmd0aCA9PSAxKSB7XG4gICAgbWFyayA9IHJlbW92ZWRbMF07XG4gICAgdHlwZSA9IFwicmVtb3ZlXCI7XG4gICAgdXBkYXRlID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUubWFyayhtYXJrLnJlbW92ZUZyb21TZXQobm9kZS5tYXJrcykpOyB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmFyIHVwZGF0ZWQgPSBbXTtcbiAgZm9yICh2YXIgaSQyID0gMDsgaSQyIDwgcHJldi5jaGlsZENvdW50OyBpJDIrKykgeyB1cGRhdGVkLnB1c2godXBkYXRlKHByZXYuY2hpbGQoaSQyKSkpOyB9XG4gIGlmIChGcmFnbWVudC5mcm9tKHVwZGF0ZWQpLmVxKGN1cikpIHsgcmV0dXJuIHttYXJrOiBtYXJrLCB0eXBlOiB0eXBlfSB9XG59XG5cbmZ1bmN0aW9uIGxvb2tzTGlrZUpvaW4ob2xkLCBzdGFydCwgZW5kLCAkbmV3U3RhcnQsICRuZXdFbmQpIHtcbiAgaWYgKCEkbmV3U3RhcnQucGFyZW50LmlzVGV4dGJsb2NrIHx8XG4gICAgICAvLyBUaGUgY29udGVudCBtdXN0IGhhdmUgc2hydW5rXG4gICAgICBlbmQgLSBzdGFydCA8PSAkbmV3RW5kLnBvcyAtICRuZXdTdGFydC5wb3MgfHxcbiAgICAgIC8vIG5ld0VuZCBtdXN0IHBvaW50IGRpcmVjdGx5IGF0IG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIGJsb2NrIHRoYXQgbmV3U3RhcnQgcG9pbnRzIGludG9cbiAgICAgIHNraXBDbG9zaW5nQW5kT3BlbmluZygkbmV3U3RhcnQsIHRydWUsIGZhbHNlKSA8ICRuZXdFbmQucG9zKVxuICAgIHsgcmV0dXJuIGZhbHNlIH1cblxuICB2YXIgJHN0YXJ0ID0gb2xkLnJlc29sdmUoc3RhcnQpO1xuICAvLyBTdGFydCBtdXN0IGJlIGF0IHRoZSBlbmQgb2YgYSBibG9ja1xuICBpZiAoJHN0YXJ0LnBhcmVudE9mZnNldCA8ICRzdGFydC5wYXJlbnQuY29udGVudC5zaXplIHx8ICEkc3RhcnQucGFyZW50LmlzVGV4dGJsb2NrKVxuICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyICRuZXh0ID0gb2xkLnJlc29sdmUoc2tpcENsb3NpbmdBbmRPcGVuaW5nKCRzdGFydCwgdHJ1ZSwgdHJ1ZSkpO1xuICAvLyBUaGUgbmV4dCB0ZXh0YmxvY2sgbXVzdCBzdGFydCBiZWZvcmUgZW5kIGFuZCBlbmQgbmVhciBpdFxuICBpZiAoISRuZXh0LnBhcmVudC5pc1RleHRibG9jayB8fCAkbmV4dC5wb3MgPiBlbmQgfHxcbiAgICAgIHNraXBDbG9zaW5nQW5kT3BlbmluZygkbmV4dCwgdHJ1ZSwgZmFsc2UpIDwgZW5kKVxuICAgIHsgcmV0dXJuIGZhbHNlIH1cblxuICAvLyBUaGUgZnJhZ21lbnRzIGFmdGVyIHRoZSBqb2luIHBvaW50IG11c3QgbWF0Y2hcbiAgcmV0dXJuICRuZXdTdGFydC5wYXJlbnQuY29udGVudC5jdXQoJG5ld1N0YXJ0LnBhcmVudE9mZnNldCkuZXEoJG5leHQucGFyZW50LmNvbnRlbnQpXG59XG5cbmZ1bmN0aW9uIHNraXBDbG9zaW5nQW5kT3BlbmluZygkcG9zLCBmcm9tRW5kLCBtYXlPcGVuKSB7XG4gIHZhciBkZXB0aCA9ICRwb3MuZGVwdGgsIGVuZCA9IGZyb21FbmQgPyAkcG9zLmVuZCgpIDogJHBvcy5wb3M7XG4gIHdoaWxlIChkZXB0aCA+IDAgJiYgKGZyb21FbmQgfHwgJHBvcy5pbmRleEFmdGVyKGRlcHRoKSA9PSAkcG9zLm5vZGUoZGVwdGgpLmNoaWxkQ291bnQpKSB7XG4gICAgZGVwdGgtLTtcbiAgICBlbmQrKztcbiAgICBmcm9tRW5kID0gZmFsc2U7XG4gIH1cbiAgaWYgKG1heU9wZW4pIHtcbiAgICB2YXIgbmV4dCA9ICRwb3Mubm9kZShkZXB0aCkubWF5YmVDaGlsZCgkcG9zLmluZGV4QWZ0ZXIoZGVwdGgpKTtcbiAgICB3aGlsZSAobmV4dCAmJiAhbmV4dC5pc0xlYWYpIHtcbiAgICAgIG5leHQgPSBuZXh0LmZpcnN0Q2hpbGQ7XG4gICAgICBlbmQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVuZFxufVxuXG5mdW5jdGlvbiBmaW5kRGlmZihhLCBiLCBwb3MsIHByZWZlcnJlZFBvcywgcHJlZmVycmVkU2lkZSkge1xuICB2YXIgc3RhcnQgPSBhLmZpbmREaWZmU3RhcnQoYiwgcG9zKTtcbiAgaWYgKHN0YXJ0ID09IG51bGwpIHsgcmV0dXJuIG51bGwgfVxuICB2YXIgcmVmID0gYS5maW5kRGlmZkVuZChiLCBwb3MgKyBhLnNpemUsIHBvcyArIGIuc2l6ZSk7XG4gIHZhciBlbmRBID0gcmVmLmE7XG4gIHZhciBlbmRCID0gcmVmLmI7XG4gIGlmIChwcmVmZXJyZWRTaWRlID09IFwiZW5kXCIpIHtcbiAgICB2YXIgYWRqdXN0ID0gTWF0aC5tYXgoMCwgc3RhcnQgLSBNYXRoLm1pbihlbmRBLCBlbmRCKSk7XG4gICAgcHJlZmVycmVkUG9zIC09IGVuZEEgKyBhZGp1c3QgLSBzdGFydDtcbiAgfVxuICBpZiAoZW5kQSA8IHN0YXJ0ICYmIGEuc2l6ZSA8IGIuc2l6ZSkge1xuICAgIHZhciBtb3ZlID0gcHJlZmVycmVkUG9zIDw9IHN0YXJ0ICYmIHByZWZlcnJlZFBvcyA+PSBlbmRBID8gc3RhcnQgLSBwcmVmZXJyZWRQb3MgOiAwO1xuICAgIHN0YXJ0IC09IG1vdmU7XG4gICAgZW5kQiA9IHN0YXJ0ICsgKGVuZEIgLSBlbmRBKTtcbiAgICBlbmRBID0gc3RhcnQ7XG4gIH0gZWxzZSBpZiAoZW5kQiA8IHN0YXJ0KSB7XG4gICAgdmFyIG1vdmUkMSA9IHByZWZlcnJlZFBvcyA8PSBzdGFydCAmJiBwcmVmZXJyZWRQb3MgPj0gZW5kQiA/IHN0YXJ0IC0gcHJlZmVycmVkUG9zIDogMDtcbiAgICBzdGFydCAtPSBtb3ZlJDE7XG4gICAgZW5kQSA9IHN0YXJ0ICsgKGVuZEEgLSBlbmRCKTtcbiAgICBlbmRCID0gc3RhcnQ7XG4gIH1cbiAgcmV0dXJuIHtzdGFydDogc3RhcnQsIGVuZEE6IGVuZEEsIGVuZEI6IGVuZEJ9XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUZvckNsaXBib2FyZCh2aWV3LCBzbGljZSkge1xuICB2YXIgY29udGV4dCA9IFtdO1xuICB2YXIgY29udGVudCA9IHNsaWNlLmNvbnRlbnQ7XG4gIHZhciBvcGVuU3RhcnQgPSBzbGljZS5vcGVuU3RhcnQ7XG4gIHZhciBvcGVuRW5kID0gc2xpY2Uub3BlbkVuZDtcbiAgd2hpbGUgKG9wZW5TdGFydCA+IDEgJiYgb3BlbkVuZCA+IDEgJiYgY29udGVudC5jaGlsZENvdW50ID09IDEgJiYgY29udGVudC5maXJzdENoaWxkLmNoaWxkQ291bnQgPT0gMSkge1xuICAgIG9wZW5TdGFydC0tO1xuICAgIG9wZW5FbmQtLTtcbiAgICB2YXIgbm9kZSA9IGNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICBjb250ZXh0LnB1c2gobm9kZS50eXBlLm5hbWUsIG5vZGUuYXR0cnMgIT0gbm9kZS50eXBlLmRlZmF1bHRBdHRycyA/IG5vZGUuYXR0cnMgOiBudWxsKTtcbiAgICBjb250ZW50ID0gbm9kZS5jb250ZW50O1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZXIgPSB2aWV3LnNvbWVQcm9wKFwiY2xpcGJvYXJkU2VyaWFsaXplclwiKSB8fCBET01TZXJpYWxpemVyLmZyb21TY2hlbWEodmlldy5zdGF0ZS5zY2hlbWEpO1xuICB2YXIgZG9jID0gZGV0YWNoZWREb2MoKSwgd3JhcCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3cmFwLmFwcGVuZENoaWxkKHNlcmlhbGl6ZXIuc2VyaWFsaXplRnJhZ21lbnQoY29udGVudCwge2RvY3VtZW50OiBkb2N9KSk7XG5cbiAgdmFyIGZpcnN0Q2hpbGQgPSB3cmFwLmZpcnN0Q2hpbGQsIG5lZWRzV3JhcDtcbiAgd2hpbGUgKGZpcnN0Q2hpbGQgJiYgZmlyc3RDaGlsZC5ub2RlVHlwZSA9PSAxICYmIChuZWVkc1dyYXAgPSB3cmFwTWFwW2ZpcnN0Q2hpbGQubm9kZU5hbWUudG9Mb3dlckNhc2UoKV0pKSB7XG4gICAgZm9yICh2YXIgaSA9IG5lZWRzV3JhcC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudChuZWVkc1dyYXBbaV0pO1xuICAgICAgd2hpbGUgKHdyYXAuZmlyc3RDaGlsZCkgeyB3cmFwcGVyLmFwcGVuZENoaWxkKHdyYXAuZmlyc3RDaGlsZCk7IH1cbiAgICAgIHdyYXAuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gICAgfVxuICAgIGZpcnN0Q2hpbGQgPSB3cmFwLmZpcnN0Q2hpbGQ7XG4gIH1cblxuICBpZiAoZmlyc3RDaGlsZCAmJiBmaXJzdENoaWxkLm5vZGVUeXBlID09IDEpXG4gICAgeyBmaXJzdENoaWxkLnNldEF0dHJpYnV0ZShcImRhdGEtcG0tc2xpY2VcIiwgKG9wZW5TdGFydCArIFwiIFwiICsgb3BlbkVuZCArIFwiIFwiICsgKEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKSkpOyB9XG5cbiAgdmFyIHRleHQgPSB2aWV3LnNvbWVQcm9wKFwiY2xpcGJvYXJkVGV4dFNlcmlhbGl6ZXJcIiwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYoc2xpY2UpOyB9KSB8fFxuICAgICAgc2xpY2UuY29udGVudC50ZXh0QmV0d2VlbigwLCBzbGljZS5jb250ZW50LnNpemUsIFwiXFxuXFxuXCIpO1xuXG4gIHJldHVybiB7ZG9tOiB3cmFwLCB0ZXh0OiB0ZXh0fVxufVxuXG4vLyA6IChFZGl0b3JWaWV3LCBzdHJpbmcsIHN0cmluZywgP2Jvb2wsIFJlc29sdmVkUG9zKSDihpIgP1NsaWNlXG4vLyBSZWFkIGEgc2xpY2Ugb2YgY29udGVudCBmcm9tIHRoZSBjbGlwYm9hcmQgKG9yIGRyb3AgZGF0YSkuXG5mdW5jdGlvbiBwYXJzZUZyb21DbGlwYm9hcmQodmlldywgdGV4dCwgaHRtbCwgcGxhaW5UZXh0LCAkY29udGV4dCkge1xuICB2YXIgZG9tLCBpbkNvZGUgPSAkY29udGV4dC5wYXJlbnQudHlwZS5zcGVjLmNvZGUsIHNsaWNlO1xuICBpZiAoIWh0bWwgJiYgIXRleHQpIHsgcmV0dXJuIG51bGwgfVxuICB2YXIgYXNUZXh0ID0gdGV4dCAmJiAocGxhaW5UZXh0IHx8IGluQ29kZSB8fCAhaHRtbCk7XG4gIGlmIChhc1RleHQpIHtcbiAgICB2aWV3LnNvbWVQcm9wKFwidHJhbnNmb3JtUGFzdGVkVGV4dFwiLCBmdW5jdGlvbiAoZikgeyB0ZXh0ID0gZih0ZXh0LCBpbkNvZGUgfHwgcGxhaW5UZXh0KTsgfSk7XG4gICAgaWYgKGluQ29kZSkgeyByZXR1cm4gbmV3IFNsaWNlKEZyYWdtZW50LmZyb20odmlldy5zdGF0ZS5zY2hlbWEudGV4dCh0ZXh0LnJlcGxhY2UoL1xcclxcbj8vZywgXCJcXG5cIikpKSwgMCwgMCkgfVxuICAgIHZhciBwYXJzZWQgPSB2aWV3LnNvbWVQcm9wKFwiY2xpcGJvYXJkVGV4dFBhcnNlclwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih0ZXh0LCAkY29udGV4dCwgcGxhaW5UZXh0KTsgfSk7XG4gICAgaWYgKHBhcnNlZCkge1xuICAgICAgc2xpY2UgPSBwYXJzZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0ZXh0LnRyaW0oKS5zcGxpdCgvKD86XFxyXFxuP3xcXG4pKy8pLmZvckVhY2goZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIGRvbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSkudGV4dENvbnRlbnQgPSBibG9jaztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2aWV3LnNvbWVQcm9wKFwidHJhbnNmb3JtUGFzdGVkSFRNTFwiLCBmdW5jdGlvbiAoZikgeyBodG1sID0gZihodG1sKTsgfSk7XG4gICAgZG9tID0gcmVhZEhUTUwoaHRtbCk7XG4gIH1cblxuICB2YXIgY29udGV4dE5vZGUgPSBkb20gJiYgZG9tLnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wbS1zbGljZV1cIik7XG4gIHZhciBzbGljZURhdGEgPSBjb250ZXh0Tm9kZSAmJiAvXihcXGQrKSAoXFxkKykgKC4qKS8uZXhlYyhjb250ZXh0Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBtLXNsaWNlXCIpKTtcbiAgaWYgKCFzbGljZSkge1xuICAgIHZhciBwYXJzZXIgPSB2aWV3LnNvbWVQcm9wKFwiY2xpcGJvYXJkUGFyc2VyXCIpIHx8IHZpZXcuc29tZVByb3AoXCJkb21QYXJzZXJcIikgfHwgRE9NUGFyc2VyLmZyb21TY2hlbWEodmlldy5zdGF0ZS5zY2hlbWEpO1xuICAgIHNsaWNlID0gcGFyc2VyLnBhcnNlU2xpY2UoZG9tLCB7cHJlc2VydmVXaGl0ZXNwYWNlOiAhIShhc1RleHQgfHwgc2xpY2VEYXRhKSwgY29udGV4dDogJGNvbnRleHR9KTtcbiAgfVxuICBpZiAoc2xpY2VEYXRhKVxuICAgIHsgc2xpY2UgPSBhZGRDb250ZXh0KGNsb3NlU2xpY2Uoc2xpY2UsICtzbGljZURhdGFbMV0sICtzbGljZURhdGFbMl0pLCBzbGljZURhdGFbM10pOyB9XG4gIGVsc2UgLy8gSFRNTCB3YXNuJ3QgY3JlYXRlZCBieSBQcm9zZU1pcnJvci4gTWFrZSBzdXJlIHRvcC1sZXZlbCBzaWJsaW5ncyBhcmUgY29oZXJlbnRcbiAgICB7IHNsaWNlID0gU2xpY2UubWF4T3Blbihub3JtYWxpemVTaWJsaW5ncyhzbGljZS5jb250ZW50LCAkY29udGV4dCksIGZhbHNlKTsgfVxuXG4gIHZpZXcuc29tZVByb3AoXCJ0cmFuc2Zvcm1QYXN0ZWRcIiwgZnVuY3Rpb24gKGYpIHsgc2xpY2UgPSBmKHNsaWNlKTsgfSk7XG4gIHJldHVybiBzbGljZVxufVxuXG4vLyBUYWtlcyBhIHNsaWNlIHBhcnNlZCB3aXRoIHBhcnNlU2xpY2UsIHdoaWNoIG1lYW5zIHRoZXJlIGhhc24ndCBiZWVuXG4vLyBhbnkgY29udGVudC1leHByZXNzaW9uIGNoZWNraW5nIGRvbmUgb24gdGhlIHRvcCBub2RlcywgdHJpZXMgdG9cbi8vIGZpbmQgYSBwYXJlbnQgbm9kZSBpbiB0aGUgY3VycmVudCBjb250ZXh0IHRoYXQgbWlnaHQgZml0IHRoZSBub2Rlcyxcbi8vIGFuZCBpZiBzdWNjZXNzZnVsLCByZWJ1aWxkcyB0aGUgc2xpY2Ugc28gdGhhdCBpdCBmaXRzIGludG8gdGhhdCBwYXJlbnQuXG4vL1xuLy8gVGhpcyBhZGRyZXNzZXMgdGhlIHByb2JsZW0gdGhhdCBUcmFuc2Zvcm0ucmVwbGFjZSBleHBlY3RzIGFcbi8vIGNvaGVyZW50IHNsaWNlLCBhbmQgd2lsbCBmYWlsIHRvIHBsYWNlIGEgc2V0IG9mIHNpYmxpbmdzIHRoYXQgZG9uJ3Rcbi8vIGZpdCBhbnl3aGVyZSBpbiB0aGUgc2NoZW1hLlxuZnVuY3Rpb24gbm9ybWFsaXplU2libGluZ3MoZnJhZ21lbnQsICRjb250ZXh0KSB7XG4gIGlmIChmcmFnbWVudC5jaGlsZENvdW50IDwgMikgeyByZXR1cm4gZnJhZ21lbnQgfVxuICB2YXIgbG9vcCA9IGZ1bmN0aW9uICggZCApIHtcbiAgICB2YXIgcGFyZW50ID0gJGNvbnRleHQubm9kZShkKTtcbiAgICB2YXIgbWF0Y2ggPSBwYXJlbnQuY29udGVudE1hdGNoQXQoJGNvbnRleHQuaW5kZXgoZCkpO1xuICAgIHZhciBsYXN0V3JhcCA9ICh2b2lkIDApLCByZXN1bHQgPSBbXTtcbiAgICBmcmFnbWVudC5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAoIXJlc3VsdCkgeyByZXR1cm4gfVxuICAgICAgdmFyIHdyYXAgPSBtYXRjaC5maW5kV3JhcHBpbmcobm9kZS50eXBlKSwgaW5MYXN0O1xuICAgICAgaWYgKCF3cmFwKSB7IHJldHVybiByZXN1bHQgPSBudWxsIH1cbiAgICAgIGlmIChpbkxhc3QgPSByZXN1bHQubGVuZ3RoICYmIGxhc3RXcmFwLmxlbmd0aCAmJiBhZGRUb1NpYmxpbmcod3JhcCwgbGFzdFdyYXAsIG5vZGUsIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0sIDApKSB7XG4gICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gPSBpbkxhc3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkgeyByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdID0gY2xvc2VSaWdodChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdLCBsYXN0V3JhcC5sZW5ndGgpOyB9XG4gICAgICAgIHZhciB3cmFwcGVkID0gd2l0aFdyYXBwZXJzKG5vZGUsIHdyYXApO1xuICAgICAgICByZXN1bHQucHVzaCh3cmFwcGVkKTtcbiAgICAgICAgbWF0Y2ggPSBtYXRjaC5tYXRjaFR5cGUod3JhcHBlZC50eXBlLCB3cmFwcGVkLmF0dHJzKTtcbiAgICAgICAgbGFzdFdyYXAgPSB3cmFwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChyZXN1bHQpIHsgcmV0dXJuIHsgdjogRnJhZ21lbnQuZnJvbShyZXN1bHQpIH0gfVxuICB9O1xuXG4gIGZvciAodmFyIGQgPSAkY29udGV4dC5kZXB0aDsgZCA+PSAwOyBkLS0pIHtcbiAgICB2YXIgcmV0dXJuZWQgPSBsb29wKCBkICk7XG5cbiAgICBpZiAoIHJldHVybmVkICkgcmV0dXJuIHJldHVybmVkLnY7XG4gIH1cbiAgcmV0dXJuIGZyYWdtZW50XG59XG5cbmZ1bmN0aW9uIHdpdGhXcmFwcGVycyhub2RlLCB3cmFwLCBmcm9tKSB7XG4gIGlmICggZnJvbSA9PT0gdm9pZCAwICkgZnJvbSA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IHdyYXAubGVuZ3RoIC0gMTsgaSA+PSBmcm9tOyBpLS0pXG4gICAgeyBub2RlID0gd3JhcFtpXS5jcmVhdGUobnVsbCwgRnJhZ21lbnQuZnJvbShub2RlKSk7IH1cbiAgcmV0dXJuIG5vZGVcbn1cblxuLy8gVXNlZCB0byBncm91cCBhZGphY2VudCBub2RlcyB3cmFwcGVkIGluIHNpbWlsYXIgcGFyZW50cyBieVxuLy8gbm9ybWFsaXplU2libGluZ3MgaW50byB0aGUgc2FtZSBwYXJlbnQgbm9kZVxuZnVuY3Rpb24gYWRkVG9TaWJsaW5nKHdyYXAsIGxhc3RXcmFwLCBub2RlLCBzaWJsaW5nLCBkZXB0aCkge1xuICBpZiAoZGVwdGggPCB3cmFwLmxlbmd0aCAmJiBkZXB0aCA8IGxhc3RXcmFwLmxlbmd0aCAmJiB3cmFwW2RlcHRoXSA9PSBsYXN0V3JhcFtkZXB0aF0pIHtcbiAgICB2YXIgaW5uZXIgPSBhZGRUb1NpYmxpbmcod3JhcCwgbGFzdFdyYXAsIG5vZGUsIHNpYmxpbmcubGFzdENoaWxkLCBkZXB0aCArIDEpO1xuICAgIGlmIChpbm5lcikgeyByZXR1cm4gc2libGluZy5jb3B5KHNpYmxpbmcuY29udGVudC5yZXBsYWNlQ2hpbGQoc2libGluZy5jaGlsZENvdW50IC0gMSwgaW5uZXIpKSB9XG4gICAgdmFyIG1hdGNoID0gc2libGluZy5jb250ZW50TWF0Y2hBdChzaWJsaW5nLmNoaWxkQ291bnQpO1xuICAgIGlmIChtYXRjaC5tYXRjaFR5cGUoZGVwdGggPT0gd3JhcC5sZW5ndGggLSAxID8gbm9kZS50eXBlIDogd3JhcFtkZXB0aCArIDFdKSlcbiAgICAgIHsgcmV0dXJuIHNpYmxpbmcuY29weShzaWJsaW5nLmNvbnRlbnQuYXBwZW5kKEZyYWdtZW50LmZyb20od2l0aFdyYXBwZXJzKG5vZGUsIHdyYXAsIGRlcHRoICsgMSkpKSkgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlUmlnaHQobm9kZSwgZGVwdGgpIHtcbiAgaWYgKGRlcHRoID09IDApIHsgcmV0dXJuIG5vZGUgfVxuICB2YXIgZnJhZ21lbnQgPSBub2RlLmNvbnRlbnQucmVwbGFjZUNoaWxkKG5vZGUuY2hpbGRDb3VudCAtIDEsIGNsb3NlUmlnaHQobm9kZS5sYXN0Q2hpbGQsIGRlcHRoIC0gMSkpO1xuICB2YXIgZmlsbCA9IG5vZGUuY29udGVudE1hdGNoQXQobm9kZS5jaGlsZENvdW50KS5maWxsQmVmb3JlKEZyYWdtZW50LmVtcHR5LCB0cnVlKTtcbiAgcmV0dXJuIG5vZGUuY29weShmcmFnbWVudC5hcHBlbmQoZmlsbCkpXG59XG5cbmZ1bmN0aW9uIGNsb3NlUmFuZ2UoZnJhZ21lbnQsIHNpZGUsIGZyb20sIHRvLCBkZXB0aCwgb3BlbkVuZCkge1xuICB2YXIgbm9kZSA9IHNpZGUgPCAwID8gZnJhZ21lbnQuZmlyc3RDaGlsZCA6IGZyYWdtZW50Lmxhc3RDaGlsZCwgaW5uZXIgPSBub2RlLmNvbnRlbnQ7XG4gIGlmIChkZXB0aCA8IHRvIC0gMSkgeyBpbm5lciA9IGNsb3NlUmFuZ2UoaW5uZXIsIHNpZGUsIGZyb20sIHRvLCBkZXB0aCArIDEsIG9wZW5FbmQpOyB9XG4gIGlmIChkZXB0aCA+PSBmcm9tKVxuICAgIHsgaW5uZXIgPSBzaWRlIDwgMCA/IG5vZGUuY29udGVudE1hdGNoQXQoMCkuZmlsbEJlZm9yZShpbm5lciwgZnJhZ21lbnQuY2hpbGRDb3VudCA+IDEgfHwgb3BlbkVuZCA8PSBkZXB0aCkuYXBwZW5kKGlubmVyKVxuICAgICAgOiBpbm5lci5hcHBlbmQobm9kZS5jb250ZW50TWF0Y2hBdChub2RlLmNoaWxkQ291bnQpLmZpbGxCZWZvcmUoRnJhZ21lbnQuZW1wdHksIHRydWUpKTsgfVxuICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZUNoaWxkKHNpZGUgPCAwID8gMCA6IGZyYWdtZW50LmNoaWxkQ291bnQgLSAxLCBub2RlLmNvcHkoaW5uZXIpKVxufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWNlKHNsaWNlLCBvcGVuU3RhcnQsIG9wZW5FbmQpIHtcbiAgaWYgKG9wZW5TdGFydCA8IHNsaWNlLm9wZW5TdGFydClcbiAgICB7IHNsaWNlID0gbmV3IFNsaWNlKGNsb3NlUmFuZ2Uoc2xpY2UuY29udGVudCwgLTEsIG9wZW5TdGFydCwgc2xpY2Uub3BlblN0YXJ0LCAwLCBzbGljZS5vcGVuRW5kKSwgb3BlblN0YXJ0LCBzbGljZS5vcGVuRW5kKTsgfVxuICBpZiAob3BlbkVuZCA8IHNsaWNlLm9wZW5FbmQpXG4gICAgeyBzbGljZSA9IG5ldyBTbGljZShjbG9zZVJhbmdlKHNsaWNlLmNvbnRlbnQsIDEsIG9wZW5FbmQsIHNsaWNlLm9wZW5FbmQsIDAsIDApLCBzbGljZS5vcGVuU3RhcnQsIG9wZW5FbmQpOyB9XG4gIHJldHVybiBzbGljZVxufVxuXG4vLyBUcmljayBmcm9tIGpRdWVyeSAtLSBzb21lIGVsZW1lbnRzIG11c3QgYmUgd3JhcHBlZCBpbiBvdGhlclxuLy8gZWxlbWVudHMgZm9yIGlubmVySFRNTCB0byB3b3JrLiBJLmUuIGlmIHlvdSBkbyBgZGl2LmlubmVySFRNTCA9XG4vLyBcIjx0ZD4uLjwvdGQ+XCJgIHRoZSB0YWJsZSBjZWxscyBhcmUgaWdub3JlZC5cbnZhciB3cmFwTWFwID0ge1xuICB0aGVhZDogW1widGFibGVcIl0sXG4gIHRib2R5OiBbXCJ0YWJsZVwiXSxcbiAgdGZvb3Q6IFtcInRhYmxlXCJdLFxuICBjYXB0aW9uOiBbXCJ0YWJsZVwiXSxcbiAgY29sZ3JvdXA6IFtcInRhYmxlXCJdLFxuICBjb2w6IFtcInRhYmxlXCIsIFwiY29sZ3JvdXBcIl0sXG4gIHRyOiBbXCJ0YWJsZVwiLCBcInRib2R5XCJdLFxuICB0ZDogW1widGFibGVcIiwgXCJ0Ym9keVwiLCBcInRyXCJdLFxuICB0aDogW1widGFibGVcIiwgXCJ0Ym9keVwiLCBcInRyXCJdXG59O1xuXG52YXIgX2RldGFjaGVkRG9jID0gbnVsbDtcbmZ1bmN0aW9uIGRldGFjaGVkRG9jKCkge1xuICByZXR1cm4gX2RldGFjaGVkRG9jIHx8IChfZGV0YWNoZWREb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJ0aXRsZVwiKSlcbn1cblxuZnVuY3Rpb24gcmVhZEhUTUwoaHRtbCkge1xuICB2YXIgbWV0YXMgPSAvKFxccyo8bWV0YSBbXj5dKj4pKi8uZXhlYyhodG1sKTtcbiAgaWYgKG1ldGFzKSB7IGh0bWwgPSBodG1sLnNsaWNlKG1ldGFzWzBdLmxlbmd0aCk7IH1cbiAgdmFyIGVsdCA9IGRldGFjaGVkRG9jKCkuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmFyIGZpcnN0VGFnID0gLyg/OjxtZXRhIFtePl0qPikqPChbYS16XVtePlxcc10rKS9pLmV4ZWMoaHRtbCksIHdyYXAsIGRlcHRoID0gMDtcbiAgaWYgKHdyYXAgPSBmaXJzdFRhZyAmJiB3cmFwTWFwW2ZpcnN0VGFnWzFdLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgaHRtbCA9IHdyYXAubWFwKGZ1bmN0aW9uIChuKSB7IHJldHVybiBcIjxcIiArIG4gKyBcIj5cIjsgfSkuam9pbihcIlwiKSArIGh0bWwgKyB3cmFwLm1hcChmdW5jdGlvbiAobikgeyByZXR1cm4gXCI8L1wiICsgbiArIFwiPlwiOyB9KS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICBkZXB0aCA9IHdyYXAubGVuZ3RoO1xuICB9XG4gIGVsdC5pbm5lckhUTUwgPSBodG1sO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHRoOyBpKyspIHsgZWx0ID0gZWx0LmZpcnN0Q2hpbGQ7IH1cbiAgcmV0dXJuIGVsdFxufVxuXG5mdW5jdGlvbiBhZGRDb250ZXh0KHNsaWNlLCBjb250ZXh0KSB7XG4gIGlmICghc2xpY2Uuc2l6ZSkgeyByZXR1cm4gc2xpY2UgfVxuICB2YXIgc2NoZW1hID0gc2xpY2UuY29udGVudC5maXJzdENoaWxkLnR5cGUuc2NoZW1hLCBhcnJheTtcbiAgdHJ5IHsgYXJyYXkgPSBKU09OLnBhcnNlKGNvbnRleHQpOyB9XG4gIGNhdGNoKGUpIHsgcmV0dXJuIHNsaWNlIH1cbiAgdmFyIGNvbnRlbnQgPSBzbGljZS5jb250ZW50O1xuICB2YXIgb3BlblN0YXJ0ID0gc2xpY2Uub3BlblN0YXJ0O1xuICB2YXIgb3BlbkVuZCA9IHNsaWNlLm9wZW5FbmQ7XG4gIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGggLSAyOyBpID49IDA7IGkgLT0gMikge1xuICAgIHZhciB0eXBlID0gc2NoZW1hLm5vZGVzW2FycmF5W2ldXTtcbiAgICBpZiAoIXR5cGUgfHwgdHlwZS5oYXNSZXF1aXJlZEF0dHJzKCkpIHsgYnJlYWsgfVxuICAgIGNvbnRlbnQgPSBGcmFnbWVudC5mcm9tKHR5cGUuY3JlYXRlKGFycmF5W2kgKyAxXSwgY29udGVudCkpO1xuICAgIG9wZW5TdGFydCsrOyBvcGVuRW5kKys7XG4gIH1cbiAgcmV0dXJuIG5ldyBTbGljZShjb250ZW50LCBvcGVuU3RhcnQsIG9wZW5FbmQpXG59XG5cbnZhciBvYnNlcnZlT3B0aW9ucyA9IHtcbiAgY2hpbGRMaXN0OiB0cnVlLFxuICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWUsXG4gIGF0dHJpYnV0ZXM6IHRydWUsXG4gIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICBzdWJ0cmVlOiB0cnVlXG59O1xuLy8gSUUxMSBoYXMgdmVyeSBicm9rZW4gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB3ZSBhbHNvIGxpc3RlbiB0byBET01DaGFyYWN0ZXJEYXRhTW9kaWZpZWRcbnZhciB1c2VDaGFyRGF0YSA9IHJlc3VsdC5pZSAmJiByZXN1bHQuaWVfdmVyc2lvbiA8PSAxMTtcblxudmFyIFNlbGVjdGlvblN0YXRlID0gZnVuY3Rpb24gU2VsZWN0aW9uU3RhdGUoKSB7XG4gIHRoaXMuYW5jaG9yTm9kZSA9IHRoaXMuYW5jaG9yT2Zmc2V0ID0gdGhpcy5mb2N1c05vZGUgPSB0aGlzLmZvY3VzT2Zmc2V0ID0gbnVsbDtcbn07XG5cblNlbGVjdGlvblN0YXRlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQgKHNlbCkge1xuICB0aGlzLmFuY2hvck5vZGUgPSBzZWwuYW5jaG9yTm9kZTsgdGhpcy5hbmNob3JPZmZzZXQgPSBzZWwuYW5jaG9yT2Zmc2V0O1xuICB0aGlzLmZvY3VzTm9kZSA9IHNlbC5mb2N1c05vZGU7IHRoaXMuZm9jdXNPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7XG59O1xuXG5TZWxlY3Rpb25TdGF0ZS5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSAoc2VsKSB7XG4gIHJldHVybiBzZWwuYW5jaG9yTm9kZSA9PSB0aGlzLmFuY2hvck5vZGUgJiYgc2VsLmFuY2hvck9mZnNldCA9PSB0aGlzLmFuY2hvck9mZnNldCAmJlxuICAgIHNlbC5mb2N1c05vZGUgPT0gdGhpcy5mb2N1c05vZGUgJiYgc2VsLmZvY3VzT2Zmc2V0ID09IHRoaXMuZm9jdXNPZmZzZXRcbn07XG5cbnZhciBET01PYnNlcnZlciA9IGZ1bmN0aW9uIERPTU9ic2VydmVyKHZpZXcsIGhhbmRsZURPTUNoYW5nZSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB0aGlzLnZpZXcgPSB2aWV3O1xuICB0aGlzLmhhbmRsZURPTUNoYW5nZSA9IGhhbmRsZURPTUNoYW5nZTtcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuICB0aGlzLmZsdXNoaW5nU29vbiA9IC0xO1xuICB0aGlzLm9ic2VydmVyID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgJiZcbiAgICBuZXcgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHsgdGhpcyQxLnF1ZXVlLnB1c2gobXV0YXRpb25zW2ldKTsgfVxuICAgICAgLy8gSUUxMSB3aWxsIHNvbWV0aW1lcyAob24gYmFja3NwYWNpbmcgb3V0IGEgc2luZ2xlIGNoYXJhY3RlclxuICAgICAgLy8gdGV4dCBub2RlIGFmdGVyIGEgQlIgbm9kZSkgY2FsbCB0aGUgb2JzZXJ2ZXIgY2FsbGJhY2tcbiAgICAgIC8vIGJlZm9yZSBhY3R1YWxseSB1cGRhdGluZyB0aGUgRE9NLCB3aGljaCB3aWxsIGNhdXNlXG4gICAgICAvLyBQcm9zZU1pcnJvciB0byBtaXNzIHRoZSBjaGFuZ2UgKHNlZSAjOTMwKVxuICAgICAgaWYgKHJlc3VsdC5pZSAmJiByZXN1bHQuaWVfdmVyc2lvbiA8PSAxMSAmJiBtdXRhdGlvbnMuc29tZShcbiAgICAgICAgZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0udHlwZSA9PSBcImNoaWxkTGlzdFwiICYmIG0ucmVtb3ZlZE5vZGVzLmxlbmd0aCB8fFxuICAgICAgICAgICAgIG0udHlwZSA9PSBcImNoYXJhY3RlckRhdGFcIiAmJiBtLm9sZFZhbHVlLmxlbmd0aCA+IG0udGFyZ2V0Lm5vZGVWYWx1ZS5sZW5ndGg7IH0pKVxuICAgICAgICB7IHRoaXMkMS5mbHVzaFNvb24oKTsgfVxuICAgICAgZWxzZVxuICAgICAgICB7IHRoaXMkMS5mbHVzaCgpOyB9XG4gICAgfSk7XG4gIHRoaXMuY3VycmVudFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25TdGF0ZTtcbiAgaWYgKHVzZUNoYXJEYXRhKSB7XG4gICAgdGhpcy5vbkNoYXJEYXRhID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHRoaXMkMS5xdWV1ZS5wdXNoKHt0YXJnZXQ6IGUudGFyZ2V0LCB0eXBlOiBcImNoYXJhY3RlckRhdGFcIiwgb2xkVmFsdWU6IGUucHJldlZhbHVlfSk7XG4gICAgICB0aGlzJDEuZmx1c2hTb29uKCk7XG4gICAgfTtcbiAgfVxuICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlID0gdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICB0aGlzLnN1cHByZXNzaW5nU2VsZWN0aW9uVXBkYXRlcyA9IGZhbHNlO1xufTtcblxuRE9NT2JzZXJ2ZXIucHJvdG90eXBlLmZsdXNoU29vbiA9IGZ1bmN0aW9uIGZsdXNoU29vbiAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuZmx1c2hpbmdTb29uIDwgMClcbiAgICB7IHRoaXMuZmx1c2hpbmdTb29uID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aGlzJDEuZmx1c2hpbmdTb29uID0gLTE7IHRoaXMkMS5mbHVzaCgpOyB9LCAyMCk7IH1cbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5mb3JjZUZsdXNoID0gZnVuY3Rpb24gZm9yY2VGbHVzaCAoKSB7XG4gIGlmICh0aGlzLmZsdXNoaW5nU29vbiA+IC0xKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmZsdXNoaW5nU29vbik7XG4gICAgdGhpcy5mbHVzaGluZ1Nvb24gPSAtMTtcbiAgICB0aGlzLmZsdXNoKCk7XG4gIH1cbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIHN0YXJ0ICgpIHtcbiAgaWYgKHRoaXMub2JzZXJ2ZXIpXG4gICAgeyB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcy52aWV3LmRvbSwgb2JzZXJ2ZU9wdGlvbnMpOyB9XG4gIGlmICh1c2VDaGFyRGF0YSlcbiAgICB7IHRoaXMudmlldy5kb20uYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZFwiLCB0aGlzLm9uQ2hhckRhdGEpOyB9XG4gIHRoaXMuY29ubmVjdFNlbGVjdGlvbigpO1xufTtcblxuRE9NT2JzZXJ2ZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiBzdG9wICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgIHZhciB0YWtlID0gdGhpcy5vYnNlcnZlci50YWtlUmVjb3JkcygpO1xuICAgIGlmICh0YWtlLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWtlLmxlbmd0aDsgaSsrKSB7IHRoaXMucXVldWUucHVzaCh0YWtlW2ldKTsgfVxuICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLmZsdXNoKCk7IH0sIDIwKTtcbiAgICB9XG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH1cbiAgaWYgKHVzZUNoYXJEYXRhKSB7IHRoaXMudmlldy5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZFwiLCB0aGlzLm9uQ2hhckRhdGEpOyB9XG4gIHRoaXMuZGlzY29ubmVjdFNlbGVjdGlvbigpO1xufTtcblxuRE9NT2JzZXJ2ZXIucHJvdG90eXBlLmNvbm5lY3RTZWxlY3Rpb24gPSBmdW5jdGlvbiBjb25uZWN0U2VsZWN0aW9uICgpIHtcbiAgdGhpcy52aWV3LmRvbS5vd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3Rpb25jaGFuZ2VcIiwgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSk7XG59O1xuXG5ET01PYnNlcnZlci5wcm90b3R5cGUuZGlzY29ubmVjdFNlbGVjdGlvbiA9IGZ1bmN0aW9uIGRpc2Nvbm5lY3RTZWxlY3Rpb24gKCkge1xuICB0aGlzLnZpZXcuZG9tLm93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlbGVjdGlvbmNoYW5nZVwiLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKTtcbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5zdXBwcmVzc1NlbGVjdGlvblVwZGF0ZXMgPSBmdW5jdGlvbiBzdXBwcmVzc1NlbGVjdGlvblVwZGF0ZXMgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHRoaXMuc3VwcHJlc3NpbmdTZWxlY3Rpb25VcGRhdGVzID0gdHJ1ZTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuc3VwcHJlc3NpbmdTZWxlY3Rpb25VcGRhdGVzID0gZmFsc2U7IH0sIDUwKTtcbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5vblNlbGVjdGlvbkNoYW5nZSA9IGZ1bmN0aW9uIG9uU2VsZWN0aW9uQ2hhbmdlICgpIHtcbiAgaWYgKCFoYXNGb2N1c0FuZFNlbGVjdGlvbih0aGlzLnZpZXcpKSB7IHJldHVybiB9XG4gIGlmICh0aGlzLnN1cHByZXNzaW5nU2VsZWN0aW9uVXBkYXRlcykgeyByZXR1cm4gc2VsZWN0aW9uVG9ET00odGhpcy52aWV3KSB9XG4gIC8vIERlbGV0aW9ucyBvbiBJRTExIGZpcmUgdGhlaXIgZXZlbnRzIGluIHRoZSB3cm9uZyBvcmRlciwgZ2l2aW5nXG4gIC8vIHVzIGEgc2VsZWN0aW9uIGNoYW5nZSBldmVudCBiZWZvcmUgdGhlIERPTSBjaGFuZ2VzIGFyZVxuICAvLyByZXBvcnRlZC5cbiAgaWYgKHJlc3VsdC5pZSAmJiByZXN1bHQuaWVfdmVyc2lvbiA8PSAxMSAmJiAhdGhpcy52aWV3LnN0YXRlLnNlbGVjdGlvbi5lbXB0eSkge1xuICAgIHZhciBzZWwgPSB0aGlzLnZpZXcucm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgICAvLyBTZWxlY3Rpb24uaXNDb2xsYXBzZWQgaXNuJ3QgcmVsaWFibGUgb24gSUVcbiAgICBpZiAoc2VsLmZvY3VzTm9kZSAmJiBpc0VxdWl2YWxlbnRQb3NpdGlvbihzZWwuZm9jdXNOb2RlLCBzZWwuZm9jdXNPZmZzZXQsIHNlbC5hbmNob3JOb2RlLCBzZWwuYW5jaG9yT2Zmc2V0KSlcbiAgICAgIHsgcmV0dXJuIHRoaXMuZmx1c2hTb29uKCkgfVxuICB9XG4gIHRoaXMuZmx1c2goKTtcbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5zZXRDdXJTZWxlY3Rpb24gPSBmdW5jdGlvbiBzZXRDdXJTZWxlY3Rpb24gKCkge1xuICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24uc2V0KHRoaXMudmlldy5yb290LmdldFNlbGVjdGlvbigpKTtcbn07XG5cbkRPTU9ic2VydmVyLnByb3RvdHlwZS5pZ25vcmVTZWxlY3Rpb25DaGFuZ2UgPSBmdW5jdGlvbiBpZ25vcmVTZWxlY3Rpb25DaGFuZ2UgKHNlbCkge1xuICBpZiAoc2VsLnJhbmdlQ291bnQgPT0gMCkgeyByZXR1cm4gdHJ1ZSB9XG4gIHZhciBjb250YWluZXIgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcbiAgdmFyIGRlc2MgPSB0aGlzLnZpZXcuZG9jVmlldy5uZWFyZXN0RGVzYyhjb250YWluZXIpO1xuICBpZiAoZGVzYyAmJiBkZXNjLmlnbm9yZU11dGF0aW9uKHt0eXBlOiBcInNlbGVjdGlvblwiLCB0YXJnZXQ6IGNvbnRhaW5lci5ub2RlVHlwZSA9PSAzID8gY29udGFpbmVyLnBhcmVudE5vZGUgOiBjb250YWluZXJ9KSkge1xuICAgIHRoaXMuc2V0Q3VyU2VsZWN0aW9uKCk7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufTtcblxuRE9NT2JzZXJ2ZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gZmx1c2ggKCkge1xuICBpZiAoIXRoaXMudmlldy5kb2NWaWV3IHx8IHRoaXMuZmx1c2hpbmdTb29uID4gLTEpIHsgcmV0dXJuIH1cbiAgdmFyIG11dGF0aW9ucyA9IHRoaXMub2JzZXJ2ZXIgPyB0aGlzLm9ic2VydmVyLnRha2VSZWNvcmRzKCkgOiBbXTtcbiAgaWYgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgbXV0YXRpb25zID0gdGhpcy5xdWV1ZS5jb25jYXQobXV0YXRpb25zKTtcbiAgICB0aGlzLnF1ZXVlLmxlbmd0aCA9IDA7XG4gIH1cblxuICB2YXIgc2VsID0gdGhpcy52aWV3LnJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gIHZhciBuZXdTZWwgPSAhdGhpcy5zdXBwcmVzc2luZ1NlbGVjdGlvblVwZGF0ZXMgJiYgIXRoaXMuY3VycmVudFNlbGVjdGlvbi5lcShzZWwpICYmIGhhc1NlbGVjdGlvbih0aGlzLnZpZXcpICYmICF0aGlzLmlnbm9yZVNlbGVjdGlvbkNoYW5nZShzZWwpO1xuXG4gIHZhciBmcm9tID0gLTEsIHRvID0gLTEsIHR5cGVPdmVyID0gZmFsc2UsIGFkZGVkID0gW107XG4gIGlmICh0aGlzLnZpZXcuZWRpdGFibGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJlc3VsdCQxID0gdGhpcy5yZWdpc3Rlck11dGF0aW9uKG11dGF0aW9uc1tpXSwgYWRkZWQpO1xuICAgICAgaWYgKHJlc3VsdCQxKSB7XG4gICAgICAgIGZyb20gPSBmcm9tIDwgMCA/IHJlc3VsdCQxLmZyb20gOiBNYXRoLm1pbihyZXN1bHQkMS5mcm9tLCBmcm9tKTtcbiAgICAgICAgdG8gPSB0byA8IDAgPyByZXN1bHQkMS50byA6IE1hdGgubWF4KHJlc3VsdCQxLnRvLCB0byk7XG4gICAgICAgIGlmIChyZXN1bHQkMS50eXBlT3ZlcikgeyB0eXBlT3ZlciA9IHRydWU7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAocmVzdWx0LmdlY2tvICYmIGFkZGVkLmxlbmd0aCA+IDEpIHtcbiAgICB2YXIgYnJzID0gYWRkZWQuZmlsdGVyKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLm5vZGVOYW1lID09IFwiQlJcIjsgfSk7XG4gICAgaWYgKGJycy5sZW5ndGggPT0gMikge1xuICAgICAgdmFyIGEgPSBicnNbMF07XG4gICAgICAgIHZhciBiID0gYnJzWzFdO1xuICAgICAgaWYgKGEucGFyZW50Tm9kZSAmJiBhLnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PSBiLnBhcmVudE5vZGUpIHsgYi5yZW1vdmUoKTsgfVxuICAgICAgZWxzZSB7IGEucmVtb3ZlKCk7IH1cbiAgICB9XG4gIH1cblxuICBpZiAoZnJvbSA+IC0xIHx8IG5ld1NlbCkge1xuICAgIGlmIChmcm9tID4gLTEpIHtcbiAgICAgIHRoaXMudmlldy5kb2NWaWV3Lm1hcmtEaXJ0eShmcm9tLCB0byk7XG4gICAgICBjaGVja0NTUyh0aGlzLnZpZXcpO1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZURPTUNoYW5nZShmcm9tLCB0bywgdHlwZU92ZXIsIGFkZGVkKTtcbiAgICBpZiAodGhpcy52aWV3LmRvY1ZpZXcuZGlydHkpIHsgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKHRoaXMudmlldy5zdGF0ZSk7IH1cbiAgICBlbHNlIGlmICghdGhpcy5jdXJyZW50U2VsZWN0aW9uLmVxKHNlbCkpIHsgc2VsZWN0aW9uVG9ET00odGhpcy52aWV3KTsgfVxuICAgIHRoaXMuY3VycmVudFNlbGVjdGlvbi5zZXQoc2VsKTtcbiAgfVxufTtcblxuRE9NT2JzZXJ2ZXIucHJvdG90eXBlLnJlZ2lzdGVyTXV0YXRpb24gPSBmdW5jdGlvbiByZWdpc3Rlck11dGF0aW9uIChtdXQsIGFkZGVkKSB7XG4gIC8vIElnbm9yZSBtdXRhdGlvbnMgaW5zaWRlIG5vZGVzIHRoYXQgd2VyZSBhbHJlYWR5IG5vdGVkIGFzIGluc2VydGVkXG4gIGlmIChhZGRlZC5pbmRleE9mKG11dC50YXJnZXQpID4gLTEpIHsgcmV0dXJuIG51bGwgfVxuICB2YXIgZGVzYyA9IHRoaXMudmlldy5kb2NWaWV3Lm5lYXJlc3REZXNjKG11dC50YXJnZXQpO1xuICBpZiAobXV0LnR5cGUgPT0gXCJhdHRyaWJ1dGVzXCIgJiZcbiAgICAgIChkZXNjID09IHRoaXMudmlldy5kb2NWaWV3IHx8IG11dC5hdHRyaWJ1dGVOYW1lID09IFwiY29udGVudGVkaXRhYmxlXCIgfHxcbiAgICAgICAvLyBGaXJlZm94IHNvbWV0aW1lcyBmaXJlcyBzcHVyaW91cyBldmVudHMgZm9yIG51bGwvZW1wdHkgc3R5bGVzXG4gICAgICAgKG11dC5hdHRyaWJ1dGVOYW1lID09IFwic3R5bGVcIiAmJiAhbXV0Lm9sZFZhbHVlICYmICFtdXQudGFyZ2V0LmdldEF0dHJpYnV0ZShcInN0eWxlXCIpKSkpXG4gICAgeyByZXR1cm4gbnVsbCB9XG4gIGlmICghZGVzYyB8fCBkZXNjLmlnbm9yZU11dGF0aW9uKG11dCkpIHsgcmV0dXJuIG51bGwgfVxuXG4gIGlmIChtdXQudHlwZSA9PSBcImNoaWxkTGlzdFwiKSB7XG4gICAgaWYgKGRlc2MuY29udGVudERPTSAmJiBkZXNjLmNvbnRlbnRET00gIT0gZGVzYy5kb20gJiYgIWRlc2MuY29udGVudERPTS5jb250YWlucyhtdXQudGFyZ2V0KSlcbiAgICAgIHsgcmV0dXJuIHtmcm9tOiBkZXNjLnBvc0JlZm9yZSwgdG86IGRlc2MucG9zQWZ0ZXJ9IH1cbiAgICB2YXIgcHJldiA9IG11dC5wcmV2aW91c1NpYmxpbmcsIG5leHQgPSBtdXQubmV4dFNpYmxpbmc7XG4gICAgaWYgKHJlc3VsdC5pZSAmJiByZXN1bHQuaWVfdmVyc2lvbiA8PSAxMSAmJiBtdXQuYWRkZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIC8vIElFMTEgZ2l2ZXMgdXMgaW5jb3JyZWN0IG5leHQvcHJldiBzaWJsaW5ncyBmb3Igc29tZVxuICAgICAgLy8gaW5zZXJ0aW9ucywgc28gaWYgdGhlcmUgYXJlIGFkZGVkIG5vZGVzLCByZWNvbXB1dGUgdGhvc2VcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXV0LmFkZGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJlZiA9IG11dC5hZGRlZE5vZGVzW2ldO1xuICAgICAgICAgIHZhciBwcmV2aW91c1NpYmxpbmcgPSByZWYucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgIHZhciBuZXh0U2libGluZyA9IHJlZi5uZXh0U2libGluZztcbiAgICAgICAgaWYgKCFwcmV2aW91c1NpYmxpbmcgfHwgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChtdXQuYWRkZWROb2RlcywgcHJldmlvdXNTaWJsaW5nKSA8IDApIHsgcHJldiA9IHByZXZpb3VzU2libGluZzsgfVxuICAgICAgICBpZiAoIW5leHRTaWJsaW5nIHx8IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwobXV0LmFkZGVkTm9kZXMsIG5leHRTaWJsaW5nKSA8IDApIHsgbmV4dCA9IG5leHRTaWJsaW5nOyB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBmcm9tT2Zmc2V0ID0gcHJldiAmJiBwcmV2LnBhcmVudE5vZGUgPT0gbXV0LnRhcmdldFxuICAgICAgICA/IGRvbUluZGV4KHByZXYpICsgMSA6IDA7XG4gICAgdmFyIGZyb20gPSBkZXNjLmxvY2FsUG9zRnJvbURPTShtdXQudGFyZ2V0LCBmcm9tT2Zmc2V0LCAtMSk7XG4gICAgdmFyIHRvT2Zmc2V0ID0gbmV4dCAmJiBuZXh0LnBhcmVudE5vZGUgPT0gbXV0LnRhcmdldFxuICAgICAgICA/IGRvbUluZGV4KG5leHQpIDogbXV0LnRhcmdldC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBtdXQuYWRkZWROb2Rlcy5sZW5ndGg7IGkkMSsrKSB7IGFkZGVkLnB1c2gobXV0LmFkZGVkTm9kZXNbaSQxXSk7IH1cbiAgICB2YXIgdG8gPSBkZXNjLmxvY2FsUG9zRnJvbURPTShtdXQudGFyZ2V0LCB0b09mZnNldCwgMSk7XG4gICAgcmV0dXJuIHtmcm9tOiBmcm9tLCB0bzogdG99XG4gIH0gZWxzZSBpZiAobXV0LnR5cGUgPT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICByZXR1cm4ge2Zyb206IGRlc2MucG9zQXRTdGFydCAtIGRlc2MuYm9yZGVyLCB0bzogZGVzYy5wb3NBdEVuZCArIGRlc2MuYm9yZGVyfVxuICB9IGVsc2UgeyAvLyBcImNoYXJhY3RlckRhdGFcIlxuICAgIHJldHVybiB7XG4gICAgICBmcm9tOiBkZXNjLnBvc0F0U3RhcnQsXG4gICAgICB0bzogZGVzYy5wb3NBdEVuZCxcbiAgICAgIC8vIEFuIGV2ZW50IHdhcyBnZW5lcmF0ZWQgZm9yIGEgdGV4dCBjaGFuZ2UgdGhhdCBkaWRuJ3QgY2hhbmdlXG4gICAgICAvLyBhbnkgdGV4dC4gTWFyayB0aGUgZG9tIGNoYW5nZSB0byBmYWxsIGJhY2sgdG8gYXNzdW1pbmcgdGhlXG4gICAgICAvLyBzZWxlY3Rpb24gd2FzIHR5cGVkIG92ZXIgd2l0aCBhbiBpZGVudGljYWwgdmFsdWUgaWYgaXQgY2FuJ3RcbiAgICAgIC8vIGZpbmQgYW5vdGhlciBjaGFuZ2UuXG4gICAgICB0eXBlT3ZlcjogbXV0LnRhcmdldC5ub2RlVmFsdWUgPT0gbXV0Lm9sZFZhbHVlXG4gICAgfVxuICB9XG59O1xuXG52YXIgY3NzQ2hlY2tlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBjaGVja0NTUyh2aWV3KSB7XG4gIGlmIChjc3NDaGVja2VkKSB7IHJldHVybiB9XG4gIGNzc0NoZWNrZWQgPSB0cnVlO1xuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSh2aWV3LmRvbSkud2hpdGVTcGFjZSA9PSBcIm5vcm1hbFwiKVxuICAgIHsgY29uc29sZVtcIndhcm5cIl0oXCJQcm9zZU1pcnJvciBleHBlY3RzIHRoZSBDU1Mgd2hpdGUtc3BhY2UgcHJvcGVydHkgdG8gYmUgc2V0LCBwcmVmZXJhYmx5IHRvICdwcmUtd3JhcCcuIEl0IGlzIHJlY29tbWVuZGVkIHRvIGxvYWQgc3R5bGUvcHJvc2VtaXJyb3IuY3NzIGZyb20gdGhlIHByb3NlbWlycm9yLXZpZXcgcGFja2FnZS5cIik7IH1cbn1cblxuLy8gQSBjb2xsZWN0aW9uIG9mIERPTSBldmVudHMgdGhhdCBvY2N1ciB3aXRoaW4gdGhlIGVkaXRvciwgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xuLy8gdG8gaW52b2tlIHdoZW4gdGhlIGV2ZW50IGZpcmVzLlxudmFyIGhhbmRsZXJzID0ge30sIGVkaXRIYW5kbGVycyA9IHt9O1xuXG5mdW5jdGlvbiBpbml0SW5wdXQodmlldykge1xuICB2aWV3LnNoaWZ0S2V5ID0gZmFsc2U7XG4gIHZpZXcubW91c2VEb3duID0gbnVsbDtcbiAgdmlldy5sYXN0S2V5Q29kZSA9IG51bGw7XG4gIHZpZXcubGFzdEtleUNvZGVUaW1lID0gMDtcbiAgdmlldy5sYXN0Q2xpY2sgPSB7dGltZTogMCwgeDogMCwgeTogMCwgdHlwZTogXCJcIn07XG4gIHZpZXcubGFzdFNlbGVjdGlvbk9yaWdpbiA9IG51bGw7XG4gIHZpZXcubGFzdFNlbGVjdGlvblRpbWUgPSAwO1xuXG4gIHZpZXcubGFzdElPU0VudGVyID0gMDtcbiAgdmlldy5sYXN0SU9TRW50ZXJGYWxsYmFja1RpbWVvdXQgPSBudWxsO1xuXG4gIHZpZXcuY29tcG9zaW5nID0gZmFsc2U7XG4gIHZpZXcuY29tcG9zaW5nVGltZW91dCA9IG51bGw7XG4gIHZpZXcuY29tcG9zaXRpb25Ob2RlcyA9IFtdO1xuICB2aWV3LmNvbXBvc2l0aW9uRW5kZWRBdCA9IC0yZTg7XG5cbiAgdmlldy5kb21PYnNlcnZlciA9IG5ldyBET01PYnNlcnZlcih2aWV3LCBmdW5jdGlvbiAoZnJvbSwgdG8sIHR5cGVPdmVyLCBhZGRlZCkgeyByZXR1cm4gcmVhZERPTUNoYW5nZSh2aWV3LCBmcm9tLCB0bywgdHlwZU92ZXIsIGFkZGVkKTsgfSk7XG4gIHZpZXcuZG9tT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgLy8gVXNlZCBieSBoYWNrcyBsaWtlIHRoZSBiZWZvcmVpbnB1dCBoYW5kbGVyIHRvIGNoZWNrIHdoZXRoZXIgYW55dGhpbmcgaGFwcGVuZWQgaW4gdGhlIERPTVxuICB2aWV3LmRvbUNoYW5nZUNvdW50ID0gMDtcblxuICB2aWV3LmV2ZW50SGFuZGxlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbG9vcCA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVyc1tldmVudF07XG4gICAgdmlldy5kb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdmlldy5ldmVudEhhbmRsZXJzW2V2ZW50XSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50QmVsb25nc1RvVmlldyh2aWV3LCBldmVudCkgJiYgIXJ1bkN1c3RvbUhhbmRsZXIodmlldywgZXZlbnQpICYmXG4gICAgICAgICAgKHZpZXcuZWRpdGFibGUgfHwgIShldmVudC50eXBlIGluIGVkaXRIYW5kbGVycykpKVxuICAgICAgICB7IGhhbmRsZXIodmlldywgZXZlbnQpOyB9XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgZXZlbnQgaW4gaGFuZGxlcnMpIGxvb3AoIGV2ZW50ICk7XG4gIC8vIE9uIFNhZmFyaSwgZm9yIHJlYXNvbnMgYmV5b25kIG15IHVuZGVyc3RhbmRpbmcsIGFkZGluZyBhbiBpbnB1dFxuICAvLyBldmVudCBoYW5kbGVyIG1ha2VzIGFuIGlzc3VlIHdoZXJlIHRoZSBjb21wb3NpdGlvbiB2YW5pc2hlcyB3aGVuXG4gIC8vIHlvdSBwcmVzcyBlbnRlciBnbyBhd2F5LlxuICBpZiAocmVzdWx0LnNhZmFyaSkgeyB2aWV3LmRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSk7IH1cblxuICBlbnN1cmVMaXN0ZW5lcnModmlldyk7XG59XG5cbmZ1bmN0aW9uIHNldFNlbGVjdGlvbk9yaWdpbih2aWV3LCBvcmlnaW4pIHtcbiAgdmlldy5sYXN0U2VsZWN0aW9uT3JpZ2luID0gb3JpZ2luO1xuICB2aWV3Lmxhc3RTZWxlY3Rpb25UaW1lID0gRGF0ZS5ub3coKTtcbn1cblxuZnVuY3Rpb24gZGVzdHJveUlucHV0KHZpZXcpIHtcbiAgdmlldy5kb21PYnNlcnZlci5zdG9wKCk7XG4gIGZvciAodmFyIHR5cGUgaW4gdmlldy5ldmVudEhhbmRsZXJzKVxuICAgIHsgdmlldy5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB2aWV3LmV2ZW50SGFuZGxlcnNbdHlwZV0pOyB9XG4gIGNsZWFyVGltZW91dCh2aWV3LmNvbXBvc2luZ1RpbWVvdXQpO1xuICBjbGVhclRpbWVvdXQodmlldy5sYXN0SU9TRW50ZXJGYWxsYmFja1RpbWVvdXQpO1xufVxuXG5mdW5jdGlvbiBlbnN1cmVMaXN0ZW5lcnModmlldykge1xuICB2aWV3LnNvbWVQcm9wKFwiaGFuZGxlRE9NRXZlbnRzXCIsIGZ1bmN0aW9uIChjdXJyZW50SGFuZGxlcnMpIHtcbiAgICBmb3IgKHZhciB0eXBlIGluIGN1cnJlbnRIYW5kbGVycykgeyBpZiAoIXZpZXcuZXZlbnRIYW5kbGVyc1t0eXBlXSlcbiAgICAgIHsgdmlldy5kb20uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB2aWV3LmV2ZW50SGFuZGxlcnNbdHlwZV0gPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIHJ1bkN1c3RvbUhhbmRsZXIodmlldywgZXZlbnQpOyB9KTsgfSB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBydW5DdXN0b21IYW5kbGVyKHZpZXcsIGV2ZW50KSB7XG4gIHJldHVybiB2aWV3LnNvbWVQcm9wKFwiaGFuZGxlRE9NRXZlbnRzXCIsIGZ1bmN0aW9uIChoYW5kbGVycykge1xuICAgIHZhciBoYW5kbGVyID0gaGFuZGxlcnNbZXZlbnQudHlwZV07XG4gICAgcmV0dXJuIGhhbmRsZXIgPyBoYW5kbGVyKHZpZXcsIGV2ZW50KSB8fCBldmVudC5kZWZhdWx0UHJldmVudGVkIDogZmFsc2VcbiAgfSlcbn1cblxuZnVuY3Rpb24gZXZlbnRCZWxvbmdzVG9WaWV3KHZpZXcsIGV2ZW50KSB7XG4gIGlmICghZXZlbnQuYnViYmxlcykgeyByZXR1cm4gdHJ1ZSB9XG4gIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7IHJldHVybiBmYWxzZSB9XG4gIGZvciAodmFyIG5vZGUgPSBldmVudC50YXJnZXQ7IG5vZGUgIT0gdmlldy5kb207IG5vZGUgPSBub2RlLnBhcmVudE5vZGUpXG4gICAgeyBpZiAoIW5vZGUgfHwgbm9kZS5ub2RlVHlwZSA9PSAxMSB8fFxuICAgICAgICAobm9kZS5wbVZpZXdEZXNjICYmIG5vZGUucG1WaWV3RGVzYy5zdG9wRXZlbnQoZXZlbnQpKSlcbiAgICAgIHsgcmV0dXJuIGZhbHNlIH0gfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KHZpZXcsIGV2ZW50KSB7XG4gIGlmICghcnVuQ3VzdG9tSGFuZGxlcih2aWV3LCBldmVudCkgJiYgaGFuZGxlcnNbZXZlbnQudHlwZV0gJiZcbiAgICAgICh2aWV3LmVkaXRhYmxlIHx8ICEoZXZlbnQudHlwZSBpbiBlZGl0SGFuZGxlcnMpKSlcbiAgICB7IGhhbmRsZXJzW2V2ZW50LnR5cGVdKHZpZXcsIGV2ZW50KTsgfVxufVxuXG5lZGl0SGFuZGxlcnMua2V5ZG93biA9IGZ1bmN0aW9uICh2aWV3LCBldmVudCkge1xuICB2aWV3LnNoaWZ0S2V5ID0gZXZlbnQua2V5Q29kZSA9PSAxNiB8fCBldmVudC5zaGlmdEtleTtcbiAgaWYgKGluT3JOZWFyQ29tcG9zaXRpb24odmlldywgZXZlbnQpKSB7IHJldHVybiB9XG4gIHZpZXcuZG9tT2JzZXJ2ZXIuZm9yY2VGbHVzaCgpO1xuICB2aWV3Lmxhc3RLZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgdmlldy5sYXN0S2V5Q29kZVRpbWUgPSBEYXRlLm5vdygpO1xuICAvLyBPbiBpT1MsIGlmIHdlIHByZXZlbnREZWZhdWx0IGVudGVyIGtleSBwcmVzc2VzLCB0aGUgdmlydHVhbFxuICAvLyBrZXlib2FyZCBnZXRzIGNvbmZ1c2VkLiBTbyB0aGUgaGFjayBoZXJlIGlzIHRvIHNldCBhIGZsYWcgdGhhdFxuICAvLyBtYWtlcyB0aGUgRE9NIGNoYW5nZSBjb2RlIHJlY29nbml6ZSB0aGF0IHdoYXQganVzdCBoYXBwZW5zIHNob3VsZFxuICAvLyBiZSByZXBsYWNlZCBieSB3aGF0ZXZlciB0aGUgRW50ZXIga2V5IGhhbmRsZXJzIGRvLlxuICBpZiAocmVzdWx0LmlvcyAmJiBldmVudC5rZXlDb2RlID09IDEzICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5hbHRLZXkgJiYgIWV2ZW50Lm1ldGFLZXkpIHtcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICB2aWV3Lmxhc3RJT1NFbnRlciA9IG5vdztcbiAgICB2aWV3Lmxhc3RJT1NFbnRlckZhbGxiYWNrVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHZpZXcubGFzdElPU0VudGVyID09IG5vdykge1xuICAgICAgICB2aWV3LnNvbWVQcm9wKFwiaGFuZGxlS2V5RG93blwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBrZXlFdmVudCgxMywgXCJFbnRlclwiKSk7IH0pO1xuICAgICAgICB2aWV3Lmxhc3RJT1NFbnRlciA9IDA7XG4gICAgICB9XG4gICAgfSwgMjAwKTtcbiAgfSBlbHNlIGlmICh2aWV3LnNvbWVQcm9wKFwiaGFuZGxlS2V5RG93blwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBldmVudCk7IH0pIHx8IGNhcHR1cmVLZXlEb3duKHZpZXcsIGV2ZW50KSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0gZWxzZSB7XG4gICAgc2V0U2VsZWN0aW9uT3JpZ2luKHZpZXcsIFwia2V5XCIpO1xuICB9XG59O1xuXG5lZGl0SGFuZGxlcnMua2V5dXAgPSBmdW5jdGlvbiAodmlldywgZSkge1xuICBpZiAoZS5rZXlDb2RlID09IDE2KSB7IHZpZXcuc2hpZnRLZXkgPSBmYWxzZTsgfVxufTtcblxuZWRpdEhhbmRsZXJzLmtleXByZXNzID0gZnVuY3Rpb24gKHZpZXcsIGV2ZW50KSB7XG4gIGlmIChpbk9yTmVhckNvbXBvc2l0aW9uKHZpZXcsIGV2ZW50KSB8fCAhZXZlbnQuY2hhckNvZGUgfHxcbiAgICAgIGV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50LmFsdEtleSB8fCByZXN1bHQubWFjICYmIGV2ZW50Lm1ldGFLZXkpIHsgcmV0dXJuIH1cblxuICBpZiAodmlldy5zb21lUHJvcChcImhhbmRsZUtleVByZXNzXCIsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKHZpZXcsIGV2ZW50KTsgfSkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHNlbCA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uO1xuICBpZiAoIShzZWwgaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSB8fCAhc2VsLiRmcm9tLnNhbWVQYXJlbnQoc2VsLiR0bykpIHtcbiAgICB2YXIgdGV4dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQuY2hhckNvZGUpO1xuICAgIGlmICghdmlldy5zb21lUHJvcChcImhhbmRsZVRleHRJbnB1dFwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBzZWwuJGZyb20ucG9zLCBzZWwuJHRvLnBvcywgdGV4dCk7IH0pKVxuICAgICAgeyB2aWV3LmRpc3BhdGNoKHZpZXcuc3RhdGUudHIuaW5zZXJ0VGV4dCh0ZXh0KS5zY3JvbGxJbnRvVmlldygpKTsgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGV2ZW50Q29vcmRzKGV2ZW50KSB7IHJldHVybiB7bGVmdDogZXZlbnQuY2xpZW50WCwgdG9wOiBldmVudC5jbGllbnRZfSB9XG5cbmZ1bmN0aW9uIGlzTmVhcihldmVudCwgY2xpY2spIHtcbiAgdmFyIGR4ID0gY2xpY2sueCAtIGV2ZW50LmNsaWVudFgsIGR5ID0gY2xpY2sueSAtIGV2ZW50LmNsaWVudFk7XG4gIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeSA8IDEwMFxufVxuXG5mdW5jdGlvbiBydW5IYW5kbGVyT25Db250ZXh0KHZpZXcsIHByb3BOYW1lLCBwb3MsIGluc2lkZSwgZXZlbnQpIHtcbiAgaWYgKGluc2lkZSA9PSAtMSkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgJHBvcyA9IHZpZXcuc3RhdGUuZG9jLnJlc29sdmUoaW5zaWRlKTtcbiAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGkgKSB7XG4gICAgaWYgKHZpZXcuc29tZVByb3AocHJvcE5hbWUsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBpID4gJHBvcy5kZXB0aCA/IGYodmlldywgcG9zLCAkcG9zLm5vZGVBZnRlciwgJHBvcy5iZWZvcmUoaSksIGV2ZW50LCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZih2aWV3LCBwb3MsICRwb3Mubm9kZShpKSwgJHBvcy5iZWZvcmUoaSksIGV2ZW50LCBmYWxzZSk7IH0pKVxuICAgICAgeyByZXR1cm4geyB2OiB0cnVlIH0gfVxuICB9O1xuXG4gIGZvciAodmFyIGkgPSAkcG9zLmRlcHRoICsgMTsgaSA+IDA7IGktLSkge1xuICAgIHZhciByZXR1cm5lZCA9IGxvb3AoIGkgKTtcblxuICAgIGlmICggcmV0dXJuZWQgKSByZXR1cm4gcmV0dXJuZWQudjtcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uKHZpZXcsIHNlbGVjdGlvbiwgb3JpZ2luKSB7XG4gIGlmICghdmlldy5mb2N1c2VkKSB7IHZpZXcuZm9jdXMoKTsgfVxuICB2YXIgdHIgPSB2aWV3LnN0YXRlLnRyLnNldFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuICBpZiAob3JpZ2luID09IFwicG9pbnRlclwiKSB7IHRyLnNldE1ldGEoXCJwb2ludGVyXCIsIHRydWUpOyB9XG4gIHZpZXcuZGlzcGF0Y2godHIpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RDbGlja2VkTGVhZih2aWV3LCBpbnNpZGUpIHtcbiAgaWYgKGluc2lkZSA9PSAtMSkgeyByZXR1cm4gZmFsc2UgfVxuICB2YXIgJHBvcyA9IHZpZXcuc3RhdGUuZG9jLnJlc29sdmUoaW5zaWRlKSwgbm9kZSA9ICRwb3Mubm9kZUFmdGVyO1xuICBpZiAobm9kZSAmJiBub2RlLmlzQXRvbSAmJiBOb2RlU2VsZWN0aW9uLmlzU2VsZWN0YWJsZShub2RlKSkge1xuICAgIHVwZGF0ZVNlbGVjdGlvbih2aWV3LCBuZXcgTm9kZVNlbGVjdGlvbigkcG9zKSwgXCJwb2ludGVyXCIpO1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHNlbGVjdENsaWNrZWROb2RlKHZpZXcsIGluc2lkZSkge1xuICBpZiAoaW5zaWRlID09IC0xKSB7IHJldHVybiBmYWxzZSB9XG4gIHZhciBzZWwgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbiwgc2VsZWN0ZWROb2RlLCBzZWxlY3RBdDtcbiAgaWYgKHNlbCBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24pIHsgc2VsZWN0ZWROb2RlID0gc2VsLm5vZGU7IH1cblxuICB2YXIgJHBvcyA9IHZpZXcuc3RhdGUuZG9jLnJlc29sdmUoaW5zaWRlKTtcbiAgZm9yICh2YXIgaSA9ICRwb3MuZGVwdGggKyAxOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIG5vZGUgPSBpID4gJHBvcy5kZXB0aCA/ICRwb3Mubm9kZUFmdGVyIDogJHBvcy5ub2RlKGkpO1xuICAgIGlmIChOb2RlU2VsZWN0aW9uLmlzU2VsZWN0YWJsZShub2RlKSkge1xuICAgICAgaWYgKHNlbGVjdGVkTm9kZSAmJiBzZWwuJGZyb20uZGVwdGggPiAwICYmXG4gICAgICAgICAgaSA+PSBzZWwuJGZyb20uZGVwdGggJiYgJHBvcy5iZWZvcmUoc2VsLiRmcm9tLmRlcHRoICsgMSkgPT0gc2VsLiRmcm9tLnBvcylcbiAgICAgICAgeyBzZWxlY3RBdCA9ICRwb3MuYmVmb3JlKHNlbC4kZnJvbS5kZXB0aCk7IH1cbiAgICAgIGVsc2VcbiAgICAgICAgeyBzZWxlY3RBdCA9ICRwb3MuYmVmb3JlKGkpOyB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZWxlY3RBdCAhPSBudWxsKSB7XG4gICAgdXBkYXRlU2VsZWN0aW9uKHZpZXcsIE5vZGVTZWxlY3Rpb24uY3JlYXRlKHZpZXcuc3RhdGUuZG9jLCBzZWxlY3RBdCksIFwicG9pbnRlclwiKTtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVNpbmdsZUNsaWNrKHZpZXcsIHBvcywgaW5zaWRlLCBldmVudCwgc2VsZWN0Tm9kZSkge1xuICByZXR1cm4gcnVuSGFuZGxlck9uQ29udGV4dCh2aWV3LCBcImhhbmRsZUNsaWNrT25cIiwgcG9zLCBpbnNpZGUsIGV2ZW50KSB8fFxuICAgIHZpZXcuc29tZVByb3AoXCJoYW5kbGVDbGlja1wiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBwb3MsIGV2ZW50KTsgfSkgfHxcbiAgICAoc2VsZWN0Tm9kZSA/IHNlbGVjdENsaWNrZWROb2RlKHZpZXcsIGluc2lkZSkgOiBzZWxlY3RDbGlja2VkTGVhZih2aWV3LCBpbnNpZGUpKVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEb3VibGVDbGljayh2aWV3LCBwb3MsIGluc2lkZSwgZXZlbnQpIHtcbiAgcmV0dXJuIHJ1bkhhbmRsZXJPbkNvbnRleHQodmlldywgXCJoYW5kbGVEb3VibGVDbGlja09uXCIsIHBvcywgaW5zaWRlLCBldmVudCkgfHxcbiAgICB2aWV3LnNvbWVQcm9wKFwiaGFuZGxlRG91YmxlQ2xpY2tcIiwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYodmlldywgcG9zLCBldmVudCk7IH0pXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVRyaXBsZUNsaWNrKHZpZXcsIHBvcywgaW5zaWRlLCBldmVudCkge1xuICByZXR1cm4gcnVuSGFuZGxlck9uQ29udGV4dCh2aWV3LCBcImhhbmRsZVRyaXBsZUNsaWNrT25cIiwgcG9zLCBpbnNpZGUsIGV2ZW50KSB8fFxuICAgIHZpZXcuc29tZVByb3AoXCJoYW5kbGVUcmlwbGVDbGlja1wiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBwb3MsIGV2ZW50KTsgfSkgfHxcbiAgICBkZWZhdWx0VHJpcGxlQ2xpY2sodmlldywgaW5zaWRlKVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0VHJpcGxlQ2xpY2sodmlldywgaW5zaWRlKSB7XG4gIHZhciBkb2MgPSB2aWV3LnN0YXRlLmRvYztcbiAgaWYgKGluc2lkZSA9PSAtMSkge1xuICAgIGlmIChkb2MuaW5saW5lQ29udGVudCkge1xuICAgICAgdXBkYXRlU2VsZWN0aW9uKHZpZXcsIFRleHRTZWxlY3Rpb24uY3JlYXRlKGRvYywgMCwgZG9jLmNvbnRlbnQuc2l6ZSksIFwicG9pbnRlclwiKTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdmFyICRwb3MgPSBkb2MucmVzb2x2ZShpbnNpZGUpO1xuICBmb3IgKHZhciBpID0gJHBvcy5kZXB0aCArIDE7IGkgPiAwOyBpLS0pIHtcbiAgICB2YXIgbm9kZSA9IGkgPiAkcG9zLmRlcHRoID8gJHBvcy5ub2RlQWZ0ZXIgOiAkcG9zLm5vZGUoaSk7XG4gICAgdmFyIG5vZGVQb3MgPSAkcG9zLmJlZm9yZShpKTtcbiAgICBpZiAobm9kZS5pbmxpbmVDb250ZW50KVxuICAgICAgeyB1cGRhdGVTZWxlY3Rpb24odmlldywgVGV4dFNlbGVjdGlvbi5jcmVhdGUoZG9jLCBub2RlUG9zICsgMSwgbm9kZVBvcyArIDEgKyBub2RlLmNvbnRlbnQuc2l6ZSksIFwicG9pbnRlclwiKTsgfVxuICAgIGVsc2UgaWYgKE5vZGVTZWxlY3Rpb24uaXNTZWxlY3RhYmxlKG5vZGUpKVxuICAgICAgeyB1cGRhdGVTZWxlY3Rpb24odmlldywgTm9kZVNlbGVjdGlvbi5jcmVhdGUoZG9jLCBub2RlUG9zKSwgXCJwb2ludGVyXCIpOyB9XG4gICAgZWxzZVxuICAgICAgeyBjb250aW51ZSB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JjZURPTUZsdXNoKHZpZXcpIHtcbiAgcmV0dXJuIGVuZENvbXBvc2l0aW9uKHZpZXcpXG59XG5cbnZhciBzZWxlY3ROb2RlTW9kaWZpZXIgPSByZXN1bHQubWFjID8gXCJtZXRhS2V5XCIgOiBcImN0cmxLZXlcIjtcblxuaGFuZGxlcnMubW91c2Vkb3duID0gZnVuY3Rpb24gKHZpZXcsIGV2ZW50KSB7XG4gIHZpZXcuc2hpZnRLZXkgPSBldmVudC5zaGlmdEtleTtcbiAgdmFyIGZsdXNoZWQgPSBmb3JjZURPTUZsdXNoKHZpZXcpO1xuICB2YXIgbm93ID0gRGF0ZS5ub3coKSwgdHlwZSA9IFwic2luZ2xlQ2xpY2tcIjtcbiAgaWYgKG5vdyAtIHZpZXcubGFzdENsaWNrLnRpbWUgPCA1MDAgJiYgaXNOZWFyKGV2ZW50LCB2aWV3Lmxhc3RDbGljaykgJiYgIWV2ZW50W3NlbGVjdE5vZGVNb2RpZmllcl0pIHtcbiAgICBpZiAodmlldy5sYXN0Q2xpY2sudHlwZSA9PSBcInNpbmdsZUNsaWNrXCIpIHsgdHlwZSA9IFwiZG91YmxlQ2xpY2tcIjsgfVxuICAgIGVsc2UgaWYgKHZpZXcubGFzdENsaWNrLnR5cGUgPT0gXCJkb3VibGVDbGlja1wiKSB7IHR5cGUgPSBcInRyaXBsZUNsaWNrXCI7IH1cbiAgfVxuICB2aWV3Lmxhc3RDbGljayA9IHt0aW1lOiBub3csIHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFksIHR5cGU6IHR5cGV9O1xuXG4gIHZhciBwb3MgPSB2aWV3LnBvc0F0Q29vcmRzKGV2ZW50Q29vcmRzKGV2ZW50KSk7XG4gIGlmICghcG9zKSB7IHJldHVybiB9XG5cbiAgaWYgKHR5cGUgPT0gXCJzaW5nbGVDbGlja1wiKVxuICAgIHsgdmlldy5tb3VzZURvd24gPSBuZXcgTW91c2VEb3duKHZpZXcsIHBvcywgZXZlbnQsIGZsdXNoZWQpOyB9XG4gIGVsc2UgaWYgKCh0eXBlID09IFwiZG91YmxlQ2xpY2tcIiA/IGhhbmRsZURvdWJsZUNsaWNrIDogaGFuZGxlVHJpcGxlQ2xpY2spKHZpZXcsIHBvcy5wb3MsIHBvcy5pbnNpZGUsIGV2ZW50KSlcbiAgICB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cbiAgZWxzZVxuICAgIHsgc2V0U2VsZWN0aW9uT3JpZ2luKHZpZXcsIFwicG9pbnRlclwiKTsgfVxufTtcblxudmFyIE1vdXNlRG93biA9IGZ1bmN0aW9uIE1vdXNlRG93bih2aWV3LCBwb3MsIGV2ZW50LCBmbHVzaGVkKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHRoaXMudmlldyA9IHZpZXc7XG4gIHRoaXMuc3RhcnREb2MgPSB2aWV3LnN0YXRlLmRvYztcbiAgdGhpcy5wb3MgPSBwb3M7XG4gIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgdGhpcy5mbHVzaGVkID0gZmx1c2hlZDtcbiAgdGhpcy5zZWxlY3ROb2RlID0gZXZlbnRbc2VsZWN0Tm9kZU1vZGlmaWVyXTtcbiAgdGhpcy5hbGxvd0RlZmF1bHQgPSBldmVudC5zaGlmdEtleTtcblxuICB2YXIgdGFyZ2V0Tm9kZSwgdGFyZ2V0UG9zO1xuICBpZiAocG9zLmluc2lkZSA+IC0xKSB7XG4gICAgdGFyZ2V0Tm9kZSA9IHZpZXcuc3RhdGUuZG9jLm5vZGVBdChwb3MuaW5zaWRlKTtcbiAgICB0YXJnZXRQb3MgPSBwb3MuaW5zaWRlO1xuICB9IGVsc2Uge1xuICAgIHZhciAkcG9zID0gdmlldy5zdGF0ZS5kb2MucmVzb2x2ZShwb3MucG9zKTtcbiAgICB0YXJnZXROb2RlID0gJHBvcy5wYXJlbnQ7XG4gICAgdGFyZ2V0UG9zID0gJHBvcy5kZXB0aCA/ICRwb3MuYmVmb3JlKCkgOiAwO1xuICB9XG5cbiAgdGhpcy5taWdodERyYWcgPSBudWxsO1xuXG4gIHZhciB0YXJnZXQgPSBmbHVzaGVkID8gbnVsbCA6IGV2ZW50LnRhcmdldDtcbiAgdmFyIHRhcmdldERlc2MgPSB0YXJnZXQgPyB2aWV3LmRvY1ZpZXcubmVhcmVzdERlc2ModGFyZ2V0LCB0cnVlKSA6IG51bGw7XG4gIHRoaXMudGFyZ2V0ID0gdGFyZ2V0RGVzYyA/IHRhcmdldERlc2MuZG9tIDogbnVsbDtcblxuICBpZiAodGFyZ2V0Tm9kZS50eXBlLnNwZWMuZHJhZ2dhYmxlICYmIHRhcmdldE5vZGUudHlwZS5zcGVjLnNlbGVjdGFibGUgIT09IGZhbHNlIHx8XG4gICAgICB2aWV3LnN0YXRlLnNlbGVjdGlvbiBpbnN0YW5jZW9mIE5vZGVTZWxlY3Rpb24gJiYgdGFyZ2V0UG9zID09IHZpZXcuc3RhdGUuc2VsZWN0aW9uLmZyb20pXG4gICAgeyB0aGlzLm1pZ2h0RHJhZyA9IHtub2RlOiB0YXJnZXROb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHBvczogdGFyZ2V0UG9zLFxuICAgICAgICAgICAgICAgICAgICAgIGFkZEF0dHI6IHRoaXMudGFyZ2V0ICYmICF0aGlzLnRhcmdldC5kcmFnZ2FibGUsXG4gICAgICAgICAgICAgICAgICAgICAgc2V0VW5lZGl0YWJsZTogdGhpcy50YXJnZXQgJiYgcmVzdWx0LmdlY2tvICYmICF0aGlzLnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJjb250ZW50RWRpdGFibGVcIil9OyB9XG5cbiAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMubWlnaHREcmFnICYmICh0aGlzLm1pZ2h0RHJhZy5hZGRBdHRyIHx8IHRoaXMubWlnaHREcmFnLnNldFVuZWRpdGFibGUpKSB7XG4gICAgdGhpcy52aWV3LmRvbU9ic2VydmVyLnN0b3AoKTtcbiAgICBpZiAodGhpcy5taWdodERyYWcuYWRkQXR0cikgeyB0aGlzLnRhcmdldC5kcmFnZ2FibGUgPSB0cnVlOyB9XG4gICAgaWYgKHRoaXMubWlnaHREcmFnLnNldFVuZWRpdGFibGUpXG4gICAgICB7IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjb250ZW50RWRpdGFibGVcIiwgXCJmYWxzZVwiKTsgfSwgMjApOyB9XG4gICAgdGhpcy52aWV3LmRvbU9ic2VydmVyLnN0YXJ0KCk7XG4gIH1cblxuICB2aWV3LnJvb3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy51cCA9IHRoaXMudXAuYmluZCh0aGlzKSk7XG4gIHZpZXcucm9vdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpKTtcbiAgc2V0U2VsZWN0aW9uT3JpZ2luKHZpZXcsIFwicG9pbnRlclwiKTtcbn07XG5cbk1vdXNlRG93bi5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIGRvbmUgKCkge1xuICB0aGlzLnZpZXcucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLnVwKTtcbiAgdGhpcy52aWV3LnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdmUpO1xuICBpZiAodGhpcy5taWdodERyYWcgJiYgdGhpcy50YXJnZXQpIHtcbiAgICB0aGlzLnZpZXcuZG9tT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIGlmICh0aGlzLm1pZ2h0RHJhZy5hZGRBdHRyKSB7IHRoaXMudGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcImRyYWdnYWJsZVwiKTsgfVxuICAgIGlmICh0aGlzLm1pZ2h0RHJhZy5zZXRVbmVkaXRhYmxlKSB7IHRoaXMudGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcImNvbnRlbnRFZGl0YWJsZVwiKTsgfVxuICAgIHRoaXMudmlldy5kb21PYnNlcnZlci5zdGFydCgpO1xuICB9XG4gIHRoaXMudmlldy5tb3VzZURvd24gPSBudWxsO1xufTtcblxuTW91c2VEb3duLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uIHVwIChldmVudCkge1xuICB0aGlzLmRvbmUoKTtcblxuICBpZiAoIXRoaXMudmlldy5kb20uY29udGFpbnMoZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09IDMgPyBldmVudC50YXJnZXQucGFyZW50Tm9kZSA6IGV2ZW50LnRhcmdldCkpXG4gICAgeyByZXR1cm4gfVxuXG4gIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgaWYgKHRoaXMudmlldy5zdGF0ZS5kb2MgIT0gdGhpcy5zdGFydERvYykgeyBwb3MgPSB0aGlzLnZpZXcucG9zQXRDb29yZHMoZXZlbnRDb29yZHMoZXZlbnQpKTsgfVxuXG4gIGlmICh0aGlzLmFsbG93RGVmYXVsdCB8fCAhcG9zKSB7XG4gICAgc2V0U2VsZWN0aW9uT3JpZ2luKHRoaXMudmlldywgXCJwb2ludGVyXCIpO1xuICB9IGVsc2UgaWYgKGhhbmRsZVNpbmdsZUNsaWNrKHRoaXMudmlldywgcG9zLnBvcywgcG9zLmluc2lkZSwgZXZlbnQsIHRoaXMuc2VsZWN0Tm9kZSkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZmx1c2hlZCB8fFxuICAgICAgICAgICAgIC8vIFNhZmFyaSBpZ25vcmVzIGNsaWNrcyBvbiBkcmFnZ2FibGUgZWxlbWVudHNcbiAgICAgICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiB0aGlzLm1pZ2h0RHJhZyAmJiAhdGhpcy5taWdodERyYWcubm9kZS5pc0F0b20pIHx8XG4gICAgICAgICAgICAgLy8gQ2hyb21lIHdpbGwgc29tZXRpbWVzIHRyZWF0IGEgbm9kZSBzZWxlY3Rpb24gYXMgYVxuICAgICAgICAgICAgIC8vIGN1cnNvciwgYnV0IHN0aWxsIHJlcG9ydCB0aGF0IHRoZSBub2RlIGlzIHNlbGVjdGVkXG4gICAgICAgICAgICAgLy8gd2hlbiBhc2tlZCB0aHJvdWdoIGdldFNlbGVjdGlvbi4gWW91J2xsIHRoZW4gZ2V0IGFcbiAgICAgICAgICAgICAvLyBzaXR1YXRpb24gd2hlcmUgY2xpY2tpbmcgYXQgdGhlIHBvaW50IHdoZXJlIHRoYXRcbiAgICAgICAgICAgICAvLyAoaGlkZGVuKSBjdXJzb3IgaXMgZG9lc24ndCBjaGFuZ2UgdGhlIHNlbGVjdGlvbiwgYW5kXG4gICAgICAgICAgICAgLy8gdGh1cyBkb2Vzbid0IGdldCBhIHJlYWN0aW9uIGZyb20gUHJvc2VNaXJyb3IuIFRoaXNcbiAgICAgICAgICAgICAvLyB3b3JrcyBhcm91bmQgdGhhdC5cbiAgICAgICAgICAgICAocmVzdWx0LmNocm9tZSAmJiAhKHRoaXMudmlldy5zdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBUZXh0U2VsZWN0aW9uKSAmJlxuICAgICAgICAgICAgICAocG9zLnBvcyA9PSB0aGlzLnZpZXcuc3RhdGUuc2VsZWN0aW9uLmZyb20gfHwgcG9zLnBvcyA9PSB0aGlzLnZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKSkpIHtcbiAgICB1cGRhdGVTZWxlY3Rpb24odGhpcy52aWV3LCBTZWxlY3Rpb24ubmVhcih0aGlzLnZpZXcuc3RhdGUuZG9jLnJlc29sdmUocG9zLnBvcykpLCBcInBvaW50ZXJcIik7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRTZWxlY3Rpb25PcmlnaW4odGhpcy52aWV3LCBcInBvaW50ZXJcIik7XG4gIH1cbn07XG5cbk1vdXNlRG93bi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIG1vdmUgKGV2ZW50KSB7XG4gIGlmICghdGhpcy5hbGxvd0RlZmF1bHQgJiYgKE1hdGguYWJzKHRoaXMuZXZlbnQueCAtIGV2ZW50LmNsaWVudFgpID4gNCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLmV2ZW50LnkgLSBldmVudC5jbGllbnRZKSA+IDQpKVxuICAgIHsgdGhpcy5hbGxvd0RlZmF1bHQgPSB0cnVlOyB9XG4gIHNldFNlbGVjdGlvbk9yaWdpbih0aGlzLnZpZXcsIFwicG9pbnRlclwiKTtcbn07XG5cbmhhbmRsZXJzLnRvdWNoZG93biA9IGZ1bmN0aW9uICh2aWV3KSB7XG4gIGZvcmNlRE9NRmx1c2godmlldyk7XG4gIHNldFNlbGVjdGlvbk9yaWdpbih2aWV3LCBcInBvaW50ZXJcIik7XG59O1xuXG5oYW5kbGVycy5jb250ZXh0bWVudSA9IGZ1bmN0aW9uICh2aWV3KSB7IHJldHVybiBmb3JjZURPTUZsdXNoKHZpZXcpOyB9O1xuXG5mdW5jdGlvbiBpbk9yTmVhckNvbXBvc2l0aW9uKHZpZXcsIGV2ZW50KSB7XG4gIGlmICh2aWV3LmNvbXBvc2luZykgeyByZXR1cm4gdHJ1ZSB9XG4gIC8vIFNlZSBodHRwczovL3d3dy5zdHVtLmRlLzIwMTYvMDYvMjQvaGFuZGxpbmctaW1lLWV2ZW50cy1pbi1qYXZhc2NyaXB0Ly5cbiAgLy8gT24gSmFwYW5lc2UgaW5wdXQgbWV0aG9kIGVkaXRvcnMgKElNRXMpLCB0aGUgRW50ZXIga2V5IGlzIHVzZWQgdG8gY29uZmlybSBjaGFyYWN0ZXJcbiAgLy8gc2VsZWN0aW9uLiBPbiBTYWZhcmksIHdoZW4gRW50ZXIgaXMgcHJlc3NlZCwgY29tcG9zaXRpb25lbmQgYW5kIGtleWRvd24gZXZlbnRzIGFyZVxuICAvLyBlbWl0dGVkLiBUaGUga2V5ZG93biBldmVudCB0cmlnZ2VycyBuZXdsaW5lIGluc2VydGlvbiwgd2hpY2ggd2UgZG9uJ3Qgd2FudC5cbiAgLy8gVGhpcyBtZXRob2QgcmV0dXJucyB0cnVlIGlmIHRoZSBrZXlkb3duIGV2ZW50IHNob3VsZCBiZSBpZ25vcmVkLlxuICAvLyBXZSBvbmx5IGlnbm9yZSBpdCBvbmNlLCBhcyBwcmVzc2luZyBFbnRlciBhIHNlY29uZCB0aW1lICpzaG91bGQqIGluc2VydCBhIG5ld2xpbmUuXG4gIC8vIEZ1cnRoZXJtb3JlLCB0aGUga2V5ZG93biBldmVudCB0aW1lc3RhbXAgbXVzdCBiZSBjbG9zZSB0byB0aGUgY29tcG9zaXRpb25FbmRlZEF0IHRpbWVzdGFtcC5cbiAgLy8gVGhpcyBndWFyZHMgYWdhaW5zdCB0aGUgY2FzZSB3aGVyZSBjb21wb3NpdGlvbmVuZCBpcyB0cmlnZ2VyZWQgd2l0aG91dCB0aGUga2V5Ym9hcmRcbiAgLy8gKGUuZy4gY2hhcmFjdGVyIGNvbmZpcm1hdGlvbiBtYXkgYmUgZG9uZSB3aXRoIHRoZSBtb3VzZSksIGFuZCBrZXlkb3duIGlzIHRyaWdnZXJlZFxuICAvLyBhZnRlcndhcmRzLSB3ZSB3b3VsZG4ndCB3YW50IHRvIGlnbm9yZSB0aGUga2V5ZG93biBldmVudCBpbiB0aGlzIGNhc2UuXG4gIGlmIChyZXN1bHQuc2FmYXJpICYmIE1hdGguYWJzKGV2ZW50LnRpbWVTdGFtcCAtIHZpZXcuY29tcG9zaXRpb25FbmRlZEF0KSA8IDUwMCkge1xuICAgIHZpZXcuY29tcG9zaXRpb25FbmRlZEF0ID0gLTJlODtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBEcm9wIGFjdGl2ZSBjb21wb3NpdGlvbiBhZnRlciA1IHNlY29uZHMgb2YgaW5hY3Rpdml0eSBvbiBBbmRyb2lkXG52YXIgdGltZW91dENvbXBvc2l0aW9uID0gcmVzdWx0LmFuZHJvaWQgPyA1MDAwIDogLTE7XG5cbmVkaXRIYW5kbGVycy5jb21wb3NpdGlvbnN0YXJ0ID0gZWRpdEhhbmRsZXJzLmNvbXBvc2l0aW9udXBkYXRlID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgaWYgKCF2aWV3LmNvbXBvc2luZykge1xuICAgIHZpZXcuZG9tT2JzZXJ2ZXIuZmx1c2goKTtcbiAgICB2YXIgc3RhdGUgPSB2aWV3LnN0YXRlO1xuICAgIHZhciAkcG9zID0gc3RhdGUuc2VsZWN0aW9uLiRmcm9tO1xuICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24uZW1wdHkgJiZcbiAgICAgICAgKHN0YXRlLnN0b3JlZE1hcmtzIHx8XG4gICAgICAgICAoISRwb3MudGV4dE9mZnNldCAmJiAkcG9zLnBhcmVudE9mZnNldCAmJiAkcG9zLm5vZGVCZWZvcmUubWFya3Muc29tZShmdW5jdGlvbiAobSkgeyByZXR1cm4gbS50eXBlLnNwZWMuaW5jbHVzaXZlID09PSBmYWxzZTsgfSkpKSkge1xuICAgICAgLy8gTmVlZCB0byB3cmFwIHRoZSBjdXJzb3IgaW4gbWFyayBub2RlcyBkaWZmZXJlbnQgZnJvbSB0aGUgb25lcyBpbiB0aGUgRE9NIGNvbnRleHRcbiAgICAgIHZpZXcubWFya0N1cnNvciA9IHZpZXcuc3RhdGUuc3RvcmVkTWFya3MgfHwgJHBvcy5tYXJrcygpO1xuICAgICAgZW5kQ29tcG9zaXRpb24odmlldywgdHJ1ZSk7XG4gICAgICB2aWV3Lm1hcmtDdXJzb3IgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmRDb21wb3NpdGlvbih2aWV3KTtcbiAgICAgIC8vIEluIGZpcmVmb3gsIGlmIHRoZSBjdXJzb3IgaXMgYWZ0ZXIgYnV0IG91dHNpZGUgYSBtYXJrZWQgbm9kZSxcbiAgICAgIC8vIHRoZSBpbnNlcnRlZCB0ZXh0IHdvbid0IGluaGVyaXQgdGhlIG1hcmtzLiBTbyB0aGlzIG1vdmVzIGl0XG4gICAgICAvLyBpbnNpZGUgaWYgbmVjZXNzYXJ5LlxuICAgICAgaWYgKHJlc3VsdC5nZWNrbyAmJiBzdGF0ZS5zZWxlY3Rpb24uZW1wdHkgJiYgJHBvcy5wYXJlbnRPZmZzZXQgJiYgISRwb3MudGV4dE9mZnNldCAmJiAkcG9zLm5vZGVCZWZvcmUubWFya3MubGVuZ3RoKSB7XG4gICAgICAgIHZhciBzZWwgPSB2aWV3LnJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGZvciAodmFyIG5vZGUgPSBzZWwuZm9jdXNOb2RlLCBvZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7IG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PSAxICYmIG9mZnNldCAhPSAwOykge1xuICAgICAgICAgIHZhciBiZWZvcmUgPSBvZmZzZXQgPCAwID8gbm9kZS5sYXN0Q2hpbGQgOiBub2RlLmNoaWxkTm9kZXNbb2Zmc2V0IC0gMV07XG4gICAgICAgICAgaWYgKCFiZWZvcmUpIHsgYnJlYWsgfVxuICAgICAgICAgIGlmIChiZWZvcmUubm9kZVR5cGUgPT0gMykge1xuICAgICAgICAgICAgc2VsLmNvbGxhcHNlKGJlZm9yZSwgYmVmb3JlLm5vZGVWYWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IGJlZm9yZTtcbiAgICAgICAgICAgIG9mZnNldCA9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2aWV3LmNvbXBvc2luZyA9IHRydWU7XG4gIH1cbiAgc2NoZWR1bGVDb21wb3NlRW5kKHZpZXcsIHRpbWVvdXRDb21wb3NpdGlvbik7XG59O1xuXG5lZGl0SGFuZGxlcnMuY29tcG9zaXRpb25lbmQgPSBmdW5jdGlvbiAodmlldywgZXZlbnQpIHtcbiAgaWYgKHZpZXcuY29tcG9zaW5nKSB7XG4gICAgdmlldy5jb21wb3NpbmcgPSBmYWxzZTtcbiAgICB2aWV3LmNvbXBvc2l0aW9uRW5kZWRBdCA9IGV2ZW50LnRpbWVTdGFtcDtcbiAgICBzY2hlZHVsZUNvbXBvc2VFbmQodmlldywgMjApO1xuICB9XG59O1xuXG5mdW5jdGlvbiBzY2hlZHVsZUNvbXBvc2VFbmQodmlldywgZGVsYXkpIHtcbiAgY2xlYXJUaW1lb3V0KHZpZXcuY29tcG9zaW5nVGltZW91dCk7XG4gIGlmIChkZWxheSA+IC0xKSB7IHZpZXcuY29tcG9zaW5nVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5kQ29tcG9zaXRpb24odmlldyk7IH0sIGRlbGF5KTsgfVxufVxuXG5mdW5jdGlvbiBjbGVhckNvbXBvc2l0aW9uKHZpZXcpIHtcbiAgdmlldy5jb21wb3NpbmcgPSBmYWxzZTtcbiAgd2hpbGUgKHZpZXcuY29tcG9zaXRpb25Ob2Rlcy5sZW5ndGggPiAwKSB7IHZpZXcuY29tcG9zaXRpb25Ob2Rlcy5wb3AoKS5tYXJrUGFyZW50c0RpcnR5KCk7IH1cbn1cblxuZnVuY3Rpb24gZW5kQ29tcG9zaXRpb24odmlldywgZm9yY2VVcGRhdGUpIHtcbiAgdmlldy5kb21PYnNlcnZlci5mb3JjZUZsdXNoKCk7XG4gIGNsZWFyQ29tcG9zaXRpb24odmlldyk7XG4gIGlmIChmb3JjZVVwZGF0ZSB8fCB2aWV3LmRvY1ZpZXcuZGlydHkpIHtcbiAgICB2YXIgc2VsID0gc2VsZWN0aW9uRnJvbURPTSh2aWV3KTtcbiAgICBpZiAoc2VsICYmICFzZWwuZXEodmlldy5zdGF0ZS5zZWxlY3Rpb24pKSB7IHZpZXcuZGlzcGF0Y2godmlldy5zdGF0ZS50ci5zZXRTZWxlY3Rpb24oc2VsKSk7IH1cbiAgICBlbHNlIHsgdmlldy51cGRhdGVTdGF0ZSh2aWV3LnN0YXRlKTsgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNhcHR1cmVDb3B5KHZpZXcsIGRvbSkge1xuICAvLyBUaGUgZXh0cmEgd3JhcHBlciBpcyBzb21laG93IG5lY2Vzc2FyeSBvbiBJRS9FZGdlIHRvIHByZXZlbnQgdGhlXG4gIC8vIGNvbnRlbnQgZnJvbSBiZWluZyBtYW5nbGVkIHdoZW4gaXQgaXMgcHV0IG9udG8gdGhlIGNsaXBib2FyZFxuICBpZiAoIXZpZXcuZG9tLnBhcmVudE5vZGUpIHsgcmV0dXJuIH1cbiAgdmFyIHdyYXAgPSB2aWV3LmRvbS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICB3cmFwLmFwcGVuZENoaWxkKGRvbSk7XG4gIHdyYXAuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGZpeGVkOyBsZWZ0OiAtMTAwMDBweDsgdG9wOiAxMHB4XCI7XG4gIHZhciBzZWwgPSBnZXRTZWxlY3Rpb24oKSwgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZG9tKTtcbiAgLy8gRG9uZSBiZWNhdXNlIElFIHdpbGwgZmlyZSBhIHNlbGVjdGlvbmNoYW5nZSBtb3ZpbmcgdGhlIHNlbGVjdGlvblxuICAvLyB0byBpdHMgc3RhcnQgd2hlbiByZW1vdmVBbGxSYW5nZXMgaXMgY2FsbGVkIGFuZCB0aGUgZWRpdG9yIHN0aWxsXG4gIC8vIGhhcyBmb2N1cyAod2hpY2ggd2lsbCBtZXNzIHVwIHRoZSBlZGl0b3IncyBzZWxlY3Rpb24gc3RhdGUpLlxuICB2aWV3LmRvbS5ibHVyKCk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHdyYXAucGFyZW50Tm9kZSkgeyB3cmFwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod3JhcCk7IH1cbiAgICB2aWV3LmZvY3VzKCk7XG4gIH0sIDUwKTtcbn1cblxuLy8gVGhpcyBpcyB2ZXJ5IGNydWRlLCBidXQgdW5mb3J0dW5hdGVseSBib3RoIHRoZXNlIGJyb3dzZXJzIF9wcmV0ZW5kX1xuLy8gdGhhdCB0aGV5IGhhdmUgYSBjbGlwYm9hcmQgQVBJ4oCUYWxsIHRoZSBvYmplY3RzIGFuZCBtZXRob2RzIGFyZVxuLy8gdGhlcmUsIHRoZXkganVzdCBkb24ndCB3b3JrLCBhbmQgdGhleSBhcmUgaGFyZCB0byB0ZXN0LlxudmFyIGJyb2tlbkNsaXBib2FyZEFQSSA9IChyZXN1bHQuaWUgJiYgcmVzdWx0LmllX3ZlcnNpb24gPCAxNSkgfHxcbiAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC53ZWJraXRfdmVyc2lvbiA8IDYwNCk7XG5cbmhhbmRsZXJzLmNvcHkgPSBlZGl0SGFuZGxlcnMuY3V0ID0gZnVuY3Rpb24gKHZpZXcsIGUpIHtcbiAgdmFyIHNlbCA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uLCBjdXQgPSBlLnR5cGUgPT0gXCJjdXRcIjtcbiAgaWYgKHNlbC5lbXB0eSkgeyByZXR1cm4gfVxuXG4gIC8vIElFIGFuZCBFZGdlJ3MgY2xpcGJvYXJkIGludGVyZmFjZSBpcyBjb21wbGV0ZWx5IGJyb2tlblxuICB2YXIgZGF0YSA9IGJyb2tlbkNsaXBib2FyZEFQSSA/IG51bGwgOiBlLmNsaXBib2FyZERhdGE7XG4gIHZhciBzbGljZSA9IHNlbC5jb250ZW50KCk7XG4gIHZhciByZWYgPSBzZXJpYWxpemVGb3JDbGlwYm9hcmQodmlldywgc2xpY2UpO1xuICB2YXIgZG9tID0gcmVmLmRvbTtcbiAgdmFyIHRleHQgPSByZWYudGV4dDtcbiAgaWYgKGRhdGEpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZGF0YS5jbGVhckRhdGEoKTtcbiAgICBkYXRhLnNldERhdGEoXCJ0ZXh0L2h0bWxcIiwgZG9tLmlubmVySFRNTCk7XG4gICAgZGF0YS5zZXREYXRhKFwidGV4dC9wbGFpblwiLCB0ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICBjYXB0dXJlQ29weSh2aWV3LCBkb20pO1xuICB9XG4gIGlmIChjdXQpIHsgdmlldy5kaXNwYXRjaCh2aWV3LnN0YXRlLnRyLmRlbGV0ZVNlbGVjdGlvbigpLnNjcm9sbEludG9WaWV3KCkuc2V0TWV0YShcInVpRXZlbnRcIiwgXCJjdXRcIikpOyB9XG59O1xuXG5mdW5jdGlvbiBzbGljZVNpbmdsZU5vZGUoc2xpY2UpIHtcbiAgcmV0dXJuIHNsaWNlLm9wZW5TdGFydCA9PSAwICYmIHNsaWNlLm9wZW5FbmQgPT0gMCAmJiBzbGljZS5jb250ZW50LmNoaWxkQ291bnQgPT0gMSA/IHNsaWNlLmNvbnRlbnQuZmlyc3RDaGlsZCA6IG51bGxcbn1cblxuZnVuY3Rpb24gY2FwdHVyZVBhc3RlKHZpZXcsIGUpIHtcbiAgaWYgKCF2aWV3LmRvbS5wYXJlbnROb2RlKSB7IHJldHVybiB9XG4gIHZhciBwbGFpblRleHQgPSB2aWV3LnNoaWZ0S2V5IHx8IHZpZXcuc3RhdGUuc2VsZWN0aW9uLiRmcm9tLnBhcmVudC50eXBlLnNwZWMuY29kZTtcbiAgdmFyIHRhcmdldCA9IHZpZXcuZG9tLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChwbGFpblRleHQgPyBcInRleHRhcmVhXCIgOiBcImRpdlwiKSk7XG4gIGlmICghcGxhaW5UZXh0KSB7IHRhcmdldC5jb250ZW50RWRpdGFibGUgPSBcInRydWVcIjsgfVxuICB0YXJnZXQuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGZpeGVkOyBsZWZ0OiAtMTAwMDBweDsgdG9wOiAxMHB4XCI7XG4gIHRhcmdldC5mb2N1cygpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB2aWV3LmZvY3VzKCk7XG4gICAgaWYgKHRhcmdldC5wYXJlbnROb2RlKSB7IHRhcmdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldCk7IH1cbiAgICBpZiAocGxhaW5UZXh0KSB7IGRvUGFzdGUodmlldywgdGFyZ2V0LnZhbHVlLCBudWxsLCBlKTsgfVxuICAgIGVsc2UgeyBkb1Bhc3RlKHZpZXcsIHRhcmdldC50ZXh0Q29udGVudCwgdGFyZ2V0LmlubmVySFRNTCwgZSk7IH1cbiAgfSwgNTApO1xufVxuXG5mdW5jdGlvbiBkb1Bhc3RlKHZpZXcsIHRleHQsIGh0bWwsIGUpIHtcbiAgdmFyIHNsaWNlID0gcGFyc2VGcm9tQ2xpcGJvYXJkKHZpZXcsIHRleHQsIGh0bWwsIHZpZXcuc2hpZnRLZXksIHZpZXcuc3RhdGUuc2VsZWN0aW9uLiRmcm9tKTtcbiAgaWYgKHZpZXcuc29tZVByb3AoXCJoYW5kbGVQYXN0ZVwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBlLCBzbGljZSB8fCBTbGljZS5lbXB0eSk7IH0pKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKCFzbGljZSkgeyByZXR1cm4gZmFsc2UgfVxuXG4gIHZhciBzaW5nbGVOb2RlID0gc2xpY2VTaW5nbGVOb2RlKHNsaWNlKTtcbiAgdmFyIHRyID0gc2luZ2xlTm9kZSA/IHZpZXcuc3RhdGUudHIucmVwbGFjZVNlbGVjdGlvbldpdGgoc2luZ2xlTm9kZSwgdmlldy5zaGlmdEtleSkgOiB2aWV3LnN0YXRlLnRyLnJlcGxhY2VTZWxlY3Rpb24oc2xpY2UpO1xuICB2aWV3LmRpc3BhdGNoKHRyLnNjcm9sbEludG9WaWV3KCkuc2V0TWV0YShcInBhc3RlXCIsIHRydWUpLnNldE1ldGEoXCJ1aUV2ZW50XCIsIFwicGFzdGVcIikpO1xuICByZXR1cm4gdHJ1ZVxufVxuXG5lZGl0SGFuZGxlcnMucGFzdGUgPSBmdW5jdGlvbiAodmlldywgZSkge1xuICB2YXIgZGF0YSA9IGJyb2tlbkNsaXBib2FyZEFQSSA/IG51bGwgOiBlLmNsaXBib2FyZERhdGE7XG4gIGlmIChkYXRhICYmIGRvUGFzdGUodmlldywgZGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKSwgZGF0YS5nZXREYXRhKFwidGV4dC9odG1sXCIpLCBlKSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cbiAgZWxzZSB7IGNhcHR1cmVQYXN0ZSh2aWV3LCBlKTsgfVxufTtcblxudmFyIERyYWdnaW5nID0gZnVuY3Rpb24gRHJhZ2dpbmcoc2xpY2UsIG1vdmUpIHtcbiAgdGhpcy5zbGljZSA9IHNsaWNlO1xuICB0aGlzLm1vdmUgPSBtb3ZlO1xufTtcblxudmFyIGRyYWdDb3B5TW9kaWZpZXIgPSByZXN1bHQubWFjID8gXCJhbHRLZXlcIiA6IFwiY3RybEtleVwiO1xuXG5oYW5kbGVycy5kcmFnc3RhcnQgPSBmdW5jdGlvbiAodmlldywgZSkge1xuICB2YXIgbW91c2VEb3duID0gdmlldy5tb3VzZURvd247XG4gIGlmIChtb3VzZURvd24pIHsgbW91c2VEb3duLmRvbmUoKTsgfVxuICBpZiAoIWUuZGF0YVRyYW5zZmVyKSB7IHJldHVybiB9XG5cbiAgdmFyIHNlbCA9IHZpZXcuc3RhdGUuc2VsZWN0aW9uO1xuICB2YXIgcG9zID0gc2VsLmVtcHR5ID8gbnVsbCA6IHZpZXcucG9zQXRDb29yZHMoZXZlbnRDb29yZHMoZSkpO1xuICBpZiAocG9zICYmIHBvcy5wb3MgPj0gc2VsLmZyb20gJiYgcG9zLnBvcyA8PSAoc2VsIGluc3RhbmNlb2YgTm9kZVNlbGVjdGlvbiA/IHNlbC50byAtIDE6IHNlbC50bykpIDsgZWxzZSBpZiAobW91c2VEb3duICYmIG1vdXNlRG93bi5taWdodERyYWcpIHtcbiAgICB2aWV3LmRpc3BhdGNoKHZpZXcuc3RhdGUudHIuc2V0U2VsZWN0aW9uKE5vZGVTZWxlY3Rpb24uY3JlYXRlKHZpZXcuc3RhdGUuZG9jLCBtb3VzZURvd24ubWlnaHREcmFnLnBvcykpKTtcbiAgfSBlbHNlIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlVHlwZSA9PSAxKSB7XG4gICAgdmFyIGRlc2MgPSB2aWV3LmRvY1ZpZXcubmVhcmVzdERlc2MoZS50YXJnZXQsIHRydWUpO1xuICAgIGlmICghZGVzYyB8fCAhZGVzYy5ub2RlLnR5cGUuc3BlYy5kcmFnZ2FibGUgfHwgZGVzYyA9PSB2aWV3LmRvY1ZpZXcpIHsgcmV0dXJuIH1cbiAgICB2aWV3LmRpc3BhdGNoKHZpZXcuc3RhdGUudHIuc2V0U2VsZWN0aW9uKE5vZGVTZWxlY3Rpb24uY3JlYXRlKHZpZXcuc3RhdGUuZG9jLCBkZXNjLnBvc0JlZm9yZSkpKTtcbiAgfVxuICB2YXIgc2xpY2UgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbi5jb250ZW50KCk7XG4gIHZhciByZWYgPSBzZXJpYWxpemVGb3JDbGlwYm9hcmQodmlldywgc2xpY2UpO1xuICB2YXIgZG9tID0gcmVmLmRvbTtcbiAgdmFyIHRleHQgPSByZWYudGV4dDtcbiAgZS5kYXRhVHJhbnNmZXIuY2xlYXJEYXRhKCk7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoYnJva2VuQ2xpcGJvYXJkQVBJID8gXCJUZXh0XCIgOiBcInRleHQvaHRtbFwiLCBkb20uaW5uZXJIVE1MKTtcbiAgaWYgKCFicm9rZW5DbGlwYm9hcmRBUEkpIHsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGV4dCk7IH1cbiAgdmlldy5kcmFnZ2luZyA9IG5ldyBEcmFnZ2luZyhzbGljZSwgIWVbZHJhZ0NvcHlNb2RpZmllcl0pO1xufTtcblxuaGFuZGxlcnMuZHJhZ2VuZCA9IGZ1bmN0aW9uICh2aWV3KSB7XG4gIHZhciBkcmFnZ2luZyA9IHZpZXcuZHJhZ2dpbmc7XG4gIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodmlldy5kcmFnZ2luZyA9PSBkcmFnZ2luZykgIHsgdmlldy5kcmFnZ2luZyA9IG51bGw7IH1cbiAgfSwgNTApO1xufTtcblxuZWRpdEhhbmRsZXJzLmRyYWdvdmVyID0gZWRpdEhhbmRsZXJzLmRyYWdlbnRlciA9IGZ1bmN0aW9uIChfLCBlKSB7IHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7IH07XG5cbmVkaXRIYW5kbGVycy5kcm9wID0gZnVuY3Rpb24gKHZpZXcsIGUpIHtcbiAgdmFyIGRyYWdnaW5nID0gdmlldy5kcmFnZ2luZztcbiAgdmlldy5kcmFnZ2luZyA9IG51bGw7XG5cbiAgaWYgKCFlLmRhdGFUcmFuc2ZlcikgeyByZXR1cm4gfVxuXG4gIHZhciBldmVudFBvcyA9IHZpZXcucG9zQXRDb29yZHMoZXZlbnRDb29yZHMoZSkpO1xuICBpZiAoIWV2ZW50UG9zKSB7IHJldHVybiB9XG4gIHZhciAkbW91c2UgPSB2aWV3LnN0YXRlLmRvYy5yZXNvbHZlKGV2ZW50UG9zLnBvcyk7XG4gIGlmICghJG1vdXNlKSB7IHJldHVybiB9XG4gIHZhciBzbGljZSA9IGRyYWdnaW5nICYmIGRyYWdnaW5nLnNsaWNlIHx8XG4gICAgICBwYXJzZUZyb21DbGlwYm9hcmQodmlldywgZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShicm9rZW5DbGlwYm9hcmRBUEkgPyBcIlRleHRcIiA6IFwidGV4dC9wbGFpblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBicm9rZW5DbGlwYm9hcmRBUEkgPyBudWxsIDogZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvaHRtbFwiKSwgZmFsc2UsICRtb3VzZSk7XG4gIHZhciBtb3ZlID0gZHJhZ2dpbmcgJiYgIWVbZHJhZ0NvcHlNb2RpZmllcl07XG4gIGlmICh2aWV3LnNvbWVQcm9wKFwiaGFuZGxlRHJvcFwiLCBmdW5jdGlvbiAoZikgeyByZXR1cm4gZih2aWV3LCBlLCBzbGljZSB8fCBTbGljZS5lbXB0eSwgbW92ZSk7IH0pKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVyblxuICB9XG4gIGlmICghc2xpY2UpIHsgcmV0dXJuIH1cblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHZhciBpbnNlcnRQb3MgPSBzbGljZSA/IGRyb3BQb2ludCh2aWV3LnN0YXRlLmRvYywgJG1vdXNlLnBvcywgc2xpY2UpIDogJG1vdXNlLnBvcztcbiAgaWYgKGluc2VydFBvcyA9PSBudWxsKSB7IGluc2VydFBvcyA9ICRtb3VzZS5wb3M7IH1cblxuICB2YXIgdHIgPSB2aWV3LnN0YXRlLnRyO1xuICBpZiAobW92ZSkgeyB0ci5kZWxldGVTZWxlY3Rpb24oKTsgfVxuXG4gIHZhciBwb3MgPSB0ci5tYXBwaW5nLm1hcChpbnNlcnRQb3MpO1xuICB2YXIgaXNOb2RlID0gc2xpY2Uub3BlblN0YXJ0ID09IDAgJiYgc2xpY2Uub3BlbkVuZCA9PSAwICYmIHNsaWNlLmNvbnRlbnQuY2hpbGRDb3VudCA9PSAxO1xuICB2YXIgYmVmb3JlSW5zZXJ0ID0gdHIuZG9jO1xuICBpZiAoaXNOb2RlKVxuICAgIHsgdHIucmVwbGFjZVJhbmdlV2l0aChwb3MsIHBvcywgc2xpY2UuY29udGVudC5maXJzdENoaWxkKTsgfVxuICBlbHNlXG4gICAgeyB0ci5yZXBsYWNlUmFuZ2UocG9zLCBwb3MsIHNsaWNlKTsgfVxuICBpZiAodHIuZG9jLmVxKGJlZm9yZUluc2VydCkpIHsgcmV0dXJuIH1cblxuICB2YXIgJHBvcyA9IHRyLmRvYy5yZXNvbHZlKHBvcyk7XG4gIGlmIChpc05vZGUgJiYgTm9kZVNlbGVjdGlvbi5pc1NlbGVjdGFibGUoc2xpY2UuY29udGVudC5maXJzdENoaWxkKSAmJlxuICAgICAgJHBvcy5ub2RlQWZ0ZXIgJiYgJHBvcy5ub2RlQWZ0ZXIuc2FtZU1hcmt1cChzbGljZS5jb250ZW50LmZpcnN0Q2hpbGQpKSB7XG4gICAgdHIuc2V0U2VsZWN0aW9uKG5ldyBOb2RlU2VsZWN0aW9uKCRwb3MpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZW5kID0gdHIubWFwcGluZy5tYXAoaW5zZXJ0UG9zKTtcbiAgICB0ci5tYXBwaW5nLm1hcHNbdHIubWFwcGluZy5tYXBzLmxlbmd0aCAtIDFdLmZvckVhY2goZnVuY3Rpb24gKF9mcm9tLCBfdG8sIF9uZXdGcm9tLCBuZXdUbykgeyByZXR1cm4gZW5kID0gbmV3VG87IH0pO1xuICAgIHRyLnNldFNlbGVjdGlvbihzZWxlY3Rpb25CZXR3ZWVuKHZpZXcsICRwb3MsIHRyLmRvYy5yZXNvbHZlKGVuZCkpKTtcbiAgfVxuICB2aWV3LmZvY3VzKCk7XG4gIHZpZXcuZGlzcGF0Y2godHIuc2V0TWV0YShcInVpRXZlbnRcIiwgXCJkcm9wXCIpKTtcbn07XG5cbmhhbmRsZXJzLmZvY3VzID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgaWYgKCF2aWV3LmZvY3VzZWQpIHtcbiAgICB2aWV3LmRvbU9ic2VydmVyLnN0b3AoKTtcbiAgICB2aWV3LmRvbS5jbGFzc0xpc3QuYWRkKFwiUHJvc2VNaXJyb3ItZm9jdXNlZFwiKTtcbiAgICB2aWV3LmRvbU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgdmlldy5mb2N1c2VkID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh2aWV3LmRvY1ZpZXcgJiYgdmlldy5oYXNGb2N1cygpICYmICF2aWV3LmRvbU9ic2VydmVyLmN1cnJlbnRTZWxlY3Rpb24uZXEodmlldy5yb290LmdldFNlbGVjdGlvbigpKSlcbiAgICAgICAgeyBzZWxlY3Rpb25Ub0RPTSh2aWV3KTsgfVxuICAgIH0sIDIwKTtcbiAgfVxufTtcblxuaGFuZGxlcnMuYmx1ciA9IGZ1bmN0aW9uICh2aWV3KSB7XG4gIGlmICh2aWV3LmZvY3VzZWQpIHtcbiAgICB2aWV3LmRvbU9ic2VydmVyLnN0b3AoKTtcbiAgICB2aWV3LmRvbS5jbGFzc0xpc3QucmVtb3ZlKFwiUHJvc2VNaXJyb3ItZm9jdXNlZFwiKTtcbiAgICB2aWV3LmRvbU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgdmlldy5kb21PYnNlcnZlci5jdXJyZW50U2VsZWN0aW9uLnNldCh7fSk7XG4gICAgdmlldy5mb2N1c2VkID0gZmFsc2U7XG4gIH1cbn07XG5cbmhhbmRsZXJzLmJlZm9yZWlucHV0ID0gZnVuY3Rpb24gKHZpZXcsIGV2ZW50KSB7XG4gIC8vIFdlIHNob3VsZCBwcm9iYWJseSBkbyBtb3JlIHdpdGggYmVmb3JlaW5wdXQgZXZlbnRzLCBidXQgc3VwcG9ydFxuICAvLyBpcyBzbyBzcG90dHkgdGhhdCBJJ20gc3RpbGwgd2FpdGluZyB0byBzZWUgd2hlcmUgdGhleSBhcmUgZ29pbmcuXG5cbiAgLy8gVmVyeSBzcGVjaWZpYyBoYWNrIHRvIGRlYWwgd2l0aCBiYWNrc3BhY2Ugc29tZXRpbWVzIGZhaWxpbmcgb25cbiAgLy8gQ2hyb21lIEFuZHJvaWQgd2hlbiBhZnRlciBhbiB1bmVkaXRhYmxlIG5vZGUuXG4gIGlmIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC5hbmRyb2lkICYmIGV2ZW50LmlucHV0VHlwZSA9PSBcImRlbGV0ZUNvbnRlbnRCYWNrd2FyZFwiKSB7XG4gICAgdmFyIGRvbUNoYW5nZUNvdW50ID0gdmlldy5kb21DaGFuZ2VDb3VudDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh2aWV3LmRvbUNoYW5nZUNvdW50ICE9IGRvbUNoYW5nZUNvdW50KSB7IHJldHVybiB9IC8vIEV2ZW50IGFscmVhZHkgaGFkIHNvbWUgZWZmZWN0XG4gICAgICAvLyBUaGlzIGJ1ZyB0ZW5kcyB0byBjbG9zZSB0aGUgdmlydHVhbCBrZXlib2FyZCwgc28gd2UgcmVmb2N1c1xuICAgICAgdmlldy5kb20uYmx1cigpO1xuICAgICAgdmlldy5mb2N1cygpO1xuICAgICAgaWYgKHZpZXcuc29tZVByb3AoXCJoYW5kbGVLZXlEb3duXCIsIGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKHZpZXcsIGtleUV2ZW50KDgsIFwiQmFja3NwYWNlXCIpKTsgfSkpIHsgcmV0dXJuIH1cbiAgICAgIHZhciByZWYgPSB2aWV3LnN0YXRlLnNlbGVjdGlvbjtcbiAgICAgIHZhciAkY3Vyc29yID0gcmVmLiRjdXJzb3I7XG4gICAgICAvLyBDcnVkZSBhcHByb3hpbWF0aW9uIG9mIGJhY2tzcGFjZSBiZWhhdmlvciB3aGVuIG5vIGNvbW1hbmQgaGFuZGxlZCBpdFxuICAgICAgaWYgKCRjdXJzb3IgJiYgJGN1cnNvci5wb3MgPiAwKSB7IHZpZXcuZGlzcGF0Y2godmlldy5zdGF0ZS50ci5kZWxldGUoJGN1cnNvci5wb3MgLSAxLCAkY3Vyc29yLnBvcykuc2Nyb2xsSW50b1ZpZXcoKSk7IH1cbiAgICB9LCA1MCk7XG4gIH1cbn07XG5cbi8vIE1ha2Ugc3VyZSBhbGwgaGFuZGxlcnMgZ2V0IHJlZ2lzdGVyZWRcbmZvciAodmFyIHByb3AgaW4gZWRpdEhhbmRsZXJzKSB7IGhhbmRsZXJzW3Byb3BdID0gZWRpdEhhbmRsZXJzW3Byb3BdOyB9XG5cbmZ1bmN0aW9uIGNvbXBhcmVPYmpzKGEsIGIpIHtcbiAgaWYgKGEgPT0gYikgeyByZXR1cm4gdHJ1ZSB9XG4gIGZvciAodmFyIHAgaW4gYSkgeyBpZiAoYVtwXSAhPT0gYltwXSkgeyByZXR1cm4gZmFsc2UgfSB9XG4gIGZvciAodmFyIHAkMSBpbiBiKSB7IGlmICghKHAkMSBpbiBhKSkgeyByZXR1cm4gZmFsc2UgfSB9XG4gIHJldHVybiB0cnVlXG59XG5cbnZhciBXaWRnZXRUeXBlID0gZnVuY3Rpb24gV2lkZ2V0VHlwZSh0b0RPTSwgc3BlYykge1xuICB0aGlzLnNwZWMgPSBzcGVjIHx8IG5vU3BlYztcbiAgdGhpcy5zaWRlID0gdGhpcy5zcGVjLnNpZGUgfHwgMDtcbiAgdGhpcy50b0RPTSA9IHRvRE9NO1xufTtcblxuV2lkZ2V0VHlwZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwaW5nLCBzcGFuLCBvZmZzZXQsIG9sZE9mZnNldCkge1xuICB2YXIgcmVmID0gbWFwcGluZy5tYXBSZXN1bHQoc3Bhbi5mcm9tICsgb2xkT2Zmc2V0LCB0aGlzLnNpZGUgPCAwID8gLTEgOiAxKTtcbiAgICB2YXIgcG9zID0gcmVmLnBvcztcbiAgICB2YXIgZGVsZXRlZCA9IHJlZi5kZWxldGVkO1xuICByZXR1cm4gZGVsZXRlZCA/IG51bGwgOiBuZXcgRGVjb3JhdGlvbihwb3MgLSBvZmZzZXQsIHBvcyAtIG9mZnNldCwgdGhpcylcbn07XG5cbldpZGdldFR5cGUucHJvdG90eXBlLnZhbGlkID0gZnVuY3Rpb24gdmFsaWQgKCkgeyByZXR1cm4gdHJ1ZSB9O1xuXG5XaWRnZXRUeXBlLnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxIChvdGhlcikge1xuICByZXR1cm4gdGhpcyA9PSBvdGhlciB8fFxuICAgIChvdGhlciBpbnN0YW5jZW9mIFdpZGdldFR5cGUgJiZcbiAgICAgKHRoaXMuc3BlYy5rZXkgJiYgdGhpcy5zcGVjLmtleSA9PSBvdGhlci5zcGVjLmtleSB8fFxuICAgICAgdGhpcy50b0RPTSA9PSBvdGhlci50b0RPTSAmJiBjb21wYXJlT2Jqcyh0aGlzLnNwZWMsIG90aGVyLnNwZWMpKSlcbn07XG5cbnZhciBJbmxpbmVUeXBlID0gZnVuY3Rpb24gSW5saW5lVHlwZShhdHRycywgc3BlYykge1xuICB0aGlzLnNwZWMgPSBzcGVjIHx8IG5vU3BlYztcbiAgdGhpcy5hdHRycyA9IGF0dHJzO1xufTtcblxuSW5saW5lVHlwZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwaW5nLCBzcGFuLCBvZmZzZXQsIG9sZE9mZnNldCkge1xuICB2YXIgZnJvbSA9IG1hcHBpbmcubWFwKHNwYW4uZnJvbSArIG9sZE9mZnNldCwgdGhpcy5zcGVjLmluY2x1c2l2ZVN0YXJ0ID8gLTEgOiAxKSAtIG9mZnNldDtcbiAgdmFyIHRvID0gbWFwcGluZy5tYXAoc3Bhbi50byArIG9sZE9mZnNldCwgdGhpcy5zcGVjLmluY2x1c2l2ZUVuZCA/IDEgOiAtMSkgLSBvZmZzZXQ7XG4gIHJldHVybiBmcm9tID49IHRvID8gbnVsbCA6IG5ldyBEZWNvcmF0aW9uKGZyb20sIHRvLCB0aGlzKVxufTtcblxuSW5saW5lVHlwZS5wcm90b3R5cGUudmFsaWQgPSBmdW5jdGlvbiB2YWxpZCAoXywgc3BhbikgeyByZXR1cm4gc3Bhbi5mcm9tIDwgc3Bhbi50byB9O1xuXG5JbmxpbmVUeXBlLnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxIChvdGhlcikge1xuICByZXR1cm4gdGhpcyA9PSBvdGhlciB8fFxuICAgIChvdGhlciBpbnN0YW5jZW9mIElubGluZVR5cGUgJiYgY29tcGFyZU9ianModGhpcy5hdHRycywgb3RoZXIuYXR0cnMpICYmXG4gICAgIGNvbXBhcmVPYmpzKHRoaXMuc3BlYywgb3RoZXIuc3BlYykpXG59O1xuXG5JbmxpbmVUeXBlLmlzID0gZnVuY3Rpb24gaXMgKHNwYW4pIHsgcmV0dXJuIHNwYW4udHlwZSBpbnN0YW5jZW9mIElubGluZVR5cGUgfTtcblxudmFyIE5vZGVUeXBlID0gZnVuY3Rpb24gTm9kZVR5cGUoYXR0cnMsIHNwZWMpIHtcbiAgdGhpcy5zcGVjID0gc3BlYyB8fCBub1NwZWM7XG4gIHRoaXMuYXR0cnMgPSBhdHRycztcbn07XG5cbk5vZGVUeXBlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBpbmcsIHNwYW4sIG9mZnNldCwgb2xkT2Zmc2V0KSB7XG4gIHZhciBmcm9tID0gbWFwcGluZy5tYXBSZXN1bHQoc3Bhbi5mcm9tICsgb2xkT2Zmc2V0LCAxKTtcbiAgaWYgKGZyb20uZGVsZXRlZCkgeyByZXR1cm4gbnVsbCB9XG4gIHZhciB0byA9IG1hcHBpbmcubWFwUmVzdWx0KHNwYW4udG8gKyBvbGRPZmZzZXQsIC0xKTtcbiAgaWYgKHRvLmRlbGV0ZWQgfHwgdG8ucG9zIDw9IGZyb20ucG9zKSB7IHJldHVybiBudWxsIH1cbiAgcmV0dXJuIG5ldyBEZWNvcmF0aW9uKGZyb20ucG9zIC0gb2Zmc2V0LCB0by5wb3MgLSBvZmZzZXQsIHRoaXMpXG59O1xuXG5Ob2RlVHlwZS5wcm90b3R5cGUudmFsaWQgPSBmdW5jdGlvbiB2YWxpZCAobm9kZSwgc3Bhbikge1xuICB2YXIgcmVmID0gbm9kZS5jb250ZW50LmZpbmRJbmRleChzcGFuLmZyb20pO1xuICAgIHZhciBpbmRleCA9IHJlZi5pbmRleDtcbiAgICB2YXIgb2Zmc2V0ID0gcmVmLm9mZnNldDtcbiAgcmV0dXJuIG9mZnNldCA9PSBzcGFuLmZyb20gJiYgb2Zmc2V0ICsgbm9kZS5jaGlsZChpbmRleCkubm9kZVNpemUgPT0gc3Bhbi50b1xufTtcblxuTm9kZVR5cGUucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gZXEgKG90aGVyKSB7XG4gIHJldHVybiB0aGlzID09IG90aGVyIHx8XG4gICAgKG90aGVyIGluc3RhbmNlb2YgTm9kZVR5cGUgJiYgY29tcGFyZU9ianModGhpcy5hdHRycywgb3RoZXIuYXR0cnMpICYmXG4gICAgIGNvbXBhcmVPYmpzKHRoaXMuc3BlYywgb3RoZXIuc3BlYykpXG59O1xuXG4vLyA6Oi0gRGVjb3JhdGlvbiBvYmplY3RzIGNhbiBiZSBwcm92aWRlZCB0byB0aGUgdmlldyB0aHJvdWdoIHRoZVxuLy8gW2BkZWNvcmF0aW9uc2AgcHJvcF0oI3ZpZXcuRWRpdG9yUHJvcHMuZGVjb3JhdGlvbnMpLiBUaGV5IGNvbWUgaW5cbi8vIHNldmVyYWwgdmFyaWFudHPigJRzZWUgdGhlIHN0YXRpYyBtZW1iZXJzIG9mIHRoaXMgY2xhc3MgZm9yIGRldGFpbHMuXG52YXIgRGVjb3JhdGlvbiA9IGZ1bmN0aW9uIERlY29yYXRpb24oZnJvbSwgdG8sIHR5cGUpIHtcbiAgLy8gOjogbnVtYmVyXG4gIC8vIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgZGVjb3JhdGlvbi5cbiAgdGhpcy5mcm9tID0gZnJvbTtcbiAgLy8gOjogbnVtYmVyXG4gIC8vIFRoZSBlbmQgcG9zaXRpb24uIFdpbGwgYmUgdGhlIHNhbWUgYXMgYGZyb21gIGZvciBbd2lkZ2V0XG4gIC8vIGRlY29yYXRpb25zXSgjdmlldy5EZWNvcmF0aW9uXndpZGdldCkuXG4gIHRoaXMudG8gPSB0bztcbiAgdGhpcy50eXBlID0gdHlwZTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMSA9IHsgc3BlYzogeyBjb25maWd1cmFibGU6IHRydWUgfSxpbmxpbmU6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxuRGVjb3JhdGlvbi5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKGZyb20sIHRvKSB7XG4gIHJldHVybiBuZXcgRGVjb3JhdGlvbihmcm9tLCB0bywgdGhpcy50eXBlKVxufTtcblxuRGVjb3JhdGlvbi5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSAob3RoZXIsIG9mZnNldCkge1xuICAgIGlmICggb2Zmc2V0ID09PSB2b2lkIDAgKSBvZmZzZXQgPSAwO1xuXG4gIHJldHVybiB0aGlzLnR5cGUuZXEob3RoZXIudHlwZSkgJiYgdGhpcy5mcm9tICsgb2Zmc2V0ID09IG90aGVyLmZyb20gJiYgdGhpcy50byArIG9mZnNldCA9PSBvdGhlci50b1xufTtcblxuRGVjb3JhdGlvbi5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwaW5nLCBvZmZzZXQsIG9sZE9mZnNldCkge1xuICByZXR1cm4gdGhpcy50eXBlLm1hcChtYXBwaW5nLCB0aGlzLCBvZmZzZXQsIG9sZE9mZnNldClcbn07XG5cbi8vIDo6IChudW1iZXIsIHVuaW9uPCh2aWV3OiBFZGl0b3JWaWV3LCBnZXRQb3M6ICgpIOKGkiBudW1iZXIpIOKGkiBkb20uTm9kZSwgZG9tLk5vZGU+LCA/T2JqZWN0KSDihpIgRGVjb3JhdGlvblxuLy8gQ3JlYXRlcyBhIHdpZGdldCBkZWNvcmF0aW9uLCB3aGljaCBpcyBhIERPTSBub2RlIHRoYXQncyBzaG93biBpblxuLy8gdGhlIGRvY3VtZW50IGF0IHRoZSBnaXZlbiBwb3NpdGlvbi4gSXQgaXMgcmVjb21tZW5kZWQgdGhhdCB5b3Vcbi8vIGRlbGF5IHJlbmRlcmluZyB0aGUgd2lkZ2V0IGJ5IHBhc3NpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmVcbi8vIGNhbGxlZCB3aGVuIHRoZSB3aWRnZXQgaXMgYWN0dWFsbHkgZHJhd24gaW4gYSB2aWV3LCBidXQgeW91IGNhblxuLy8gYWxzbyBkaXJlY3RseSBwYXNzIGEgRE9NIG5vZGUuIGBnZXRQb3NgIGNhbiBiZSB1c2VkIHRvIGZpbmQgdGhlXG4vLyB3aWRnZXQncyBjdXJyZW50IGRvY3VtZW50IHBvc2l0aW9uLlxuLy9cbi8vIHNwZWM6Oi0gVGhlc2Ugb3B0aW9ucyBhcmUgc3VwcG9ydGVkOlxuLy9cbi8vICAgc2lkZTo6ID9udW1iZXJcbi8vICAgQ29udHJvbHMgd2hpY2ggc2lkZSBvZiB0aGUgZG9jdW1lbnQgcG9zaXRpb24gdGhpcyB3aWRnZXQgaXNcbi8vICAgYXNzb2NpYXRlZCB3aXRoLiBXaGVuIG5lZ2F0aXZlLCBpdCBpcyBkcmF3biBiZWZvcmUgYSBjdXJzb3Jcbi8vICAgYXQgaXRzIHBvc2l0aW9uLCBhbmQgY29udGVudCBpbnNlcnRlZCBhdCB0aGF0IHBvc2l0aW9uIGVuZHNcbi8vICAgdXAgYWZ0ZXIgdGhlIHdpZGdldC4gV2hlbiB6ZXJvICh0aGUgZGVmYXVsdCkgb3IgcG9zaXRpdmUsIHRoZVxuLy8gICB3aWRnZXQgaXMgZHJhd24gYWZ0ZXIgdGhlIGN1cnNvciBhbmQgY29udGVudCBpbnNlcnRlZCB0aGVyZVxuLy8gICBlbmRzIHVwIGJlZm9yZSB0aGUgd2lkZ2V0LlxuLy9cbi8vICAgV2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgd2lkZ2V0cyBhdCBhIGdpdmVuIHBvc2l0aW9uLCB0aGVpclxuLy8gICBgc2lkZWAgdmFsdWVzIGRldGVybWluZSB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSBhcHBlYXIuIFRob3NlXG4vLyAgIHdpdGggbG93ZXIgdmFsdWVzIGFwcGVhciBmaXJzdC4gVGhlIG9yZGVyaW5nIG9mIHdpZGdldHMgd2l0aFxuLy8gICB0aGUgc2FtZSBgc2lkZWAgdmFsdWUgaXMgdW5zcGVjaWZpZWQuXG4vL1xuLy8gICBXaGVuIGBtYXJrc2AgaXMgbnVsbCwgYHNpZGVgIGFsc28gZGV0ZXJtaW5lcyB0aGUgbWFya3MgdGhhdFxuLy8gICB0aGUgd2lkZ2V0IGlzIHdyYXBwZWQgaW7igJR0aG9zZSBvZiB0aGUgbm9kZSBiZWZvcmUgd2hlblxuLy8gICBuZWdhdGl2ZSwgdGhvc2Ugb2YgdGhlIG5vZGUgYWZ0ZXIgd2hlbiBwb3NpdGl2ZS5cbi8vXG4vLyAgIG1hcmtzOjogP1tNYXJrXVxuLy8gICBUaGUgcHJlY2lzZSBzZXQgb2YgbWFya3MgdG8gZHJhdyBhcm91bmQgdGhlIHdpZGdldC5cbi8vXG4vLyAgIHN0b3BFdmVudDo6ID8oZXZlbnQ6IGRvbS5FdmVudCkg4oaSIGJvb2xcbi8vICAgQ2FuIGJlIHVzZWQgdG8gY29udHJvbCB3aGljaCBET00gZXZlbnRzLCB3aGVuIHRoZXkgYnViYmxlIG91dFxuLy8gICBvZiB0aGlzIHdpZGdldCwgdGhlIGVkaXRvciB2aWV3IHNob3VsZCBpZ25vcmUuXG4vL1xuLy8gICBpZ25vcmVTZWxlY3Rpb246OiA/Ym9vbFxuLy8gICBXaGVuIHNldCAoZGVmYXVsdHMgdG8gZmFsc2UpLCBzZWxlY3Rpb24gY2hhbmdlcyBpbnNpZGUgdGhlXG4vLyAgIHdpZGdldCBhcmUgaWdub3JlZCwgYW5kIGRvbid0IGNhdXNlIFByb3NlTWlycm9yIHRvIHRyeSBhbmRcbi8vICAgcmUtc3luYyB0aGUgc2VsZWN0aW9uIHdpdGggaXRzIHNlbGVjdGlvbiBzdGF0ZS5cbi8vXG4vLyAgIGtleTo6ID9zdHJpbmdcbi8vICAgV2hlbiBjb21wYXJpbmcgZGVjb3JhdGlvbnMgb2YgdGhpcyB0eXBlIChpbiBvcmRlciB0byBkZWNpZGVcbi8vICAgd2hldGhlciBpdCBuZWVkcyB0byBiZSByZWRyYXduKSwgUHJvc2VNaXJyb3Igd2lsbCBieSBkZWZhdWx0XG4vLyAgIGNvbXBhcmUgdGhlIHdpZGdldCBET00gbm9kZSBieSBpZGVudGl0eS4gSWYgeW91IHBhc3MgYSBrZXksXG4vLyAgIHRoYXQga2V5IHdpbGwgYmUgY29tcGFyZWQgaW5zdGVhZCwgd2hpY2ggY2FuIGJlIHVzZWZ1bCB3aGVuXG4vLyAgIHlvdSBnZW5lcmF0ZSBkZWNvcmF0aW9ucyBvbiB0aGUgZmx5IGFuZCBkb24ndCB3YW50IHRvIHN0b3JlXG4vLyAgIGFuZCByZXVzZSBET00gbm9kZXMuIE1ha2Ugc3VyZSB0aGF0IGFueSB3aWRnZXRzIHdpdGggdGhlIHNhbWVcbi8vICAga2V5IGFyZSBpbnRlcmNoYW5nZWFibGXigJRpZiB3aWRnZXRzIGRpZmZlciBpbiwgZm9yIGV4YW1wbGUsXG4vLyAgIHRoZSBiZWhhdmlvciBvZiBzb21lIGV2ZW50IGhhbmRsZXIsIHRoZXkgc2hvdWxkIGdldFxuLy8gICBkaWZmZXJlbnQga2V5cy5cbkRlY29yYXRpb24ud2lkZ2V0ID0gZnVuY3Rpb24gd2lkZ2V0IChwb3MsIHRvRE9NLCBzcGVjKSB7XG4gIHJldHVybiBuZXcgRGVjb3JhdGlvbihwb3MsIHBvcywgbmV3IFdpZGdldFR5cGUodG9ET00sIHNwZWMpKVxufTtcblxuLy8gOjogKG51bWJlciwgbnVtYmVyLCBEZWNvcmF0aW9uQXR0cnMsID9PYmplY3QpIOKGkiBEZWNvcmF0aW9uXG4vLyBDcmVhdGVzIGFuIGlubGluZSBkZWNvcmF0aW9uLCB3aGljaCBhZGRzIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIHRvXG4vLyBlYWNoIGlubGluZSBub2RlIGJldHdlZW4gYGZyb21gIGFuZCBgdG9gLlxuLy9cbi8vIHNwZWM6Oi0gVGhlc2Ugb3B0aW9ucyBhcmUgcmVjb2duaXplZDpcbi8vXG4vLyAgIGluY2x1c2l2ZVN0YXJ0OjogP2Jvb2xcbi8vICAgRGV0ZXJtaW5lcyBob3cgdGhlIGxlZnQgc2lkZSBvZiB0aGUgZGVjb3JhdGlvbiBpc1xuLy8gICBbbWFwcGVkXSgjdHJhbnNmb3JtLlBvc2l0aW9uX01hcHBpbmcpIHdoZW4gY29udGVudCBpc1xuLy8gICBpbnNlcnRlZCBkaXJlY3RseSBhdCB0aGF0IHBvc2l0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZGVjb3JhdGlvblxuLy8gICB3b24ndCBpbmNsdWRlIHRoZSBuZXcgY29udGVudCwgYnV0IHlvdSBjYW4gc2V0IHRoaXMgdG8gYHRydWVgXG4vLyAgIHRvIG1ha2UgaXQgaW5jbHVzaXZlLlxuLy9cbi8vICAgaW5jbHVzaXZlRW5kOjogP2Jvb2xcbi8vICAgRGV0ZXJtaW5lcyBob3cgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGRlY29yYXRpb24gaXMgbWFwcGVkLlxuLy8gICBTZWVcbi8vICAgW2BpbmNsdXNpdmVTdGFydGBdKCN2aWV3LkRlY29yYXRpb25eaW5saW5lXnNwZWMuaW5jbHVzaXZlU3RhcnQpLlxuRGVjb3JhdGlvbi5pbmxpbmUgPSBmdW5jdGlvbiBpbmxpbmUgKGZyb20sIHRvLCBhdHRycywgc3BlYykge1xuICByZXR1cm4gbmV3IERlY29yYXRpb24oZnJvbSwgdG8sIG5ldyBJbmxpbmVUeXBlKGF0dHJzLCBzcGVjKSlcbn07XG5cbi8vIDo6IChudW1iZXIsIG51bWJlciwgRGVjb3JhdGlvbkF0dHJzLCA/T2JqZWN0KSDihpIgRGVjb3JhdGlvblxuLy8gQ3JlYXRlcyBhIG5vZGUgZGVjb3JhdGlvbi4gYGZyb21gIGFuZCBgdG9gIHNob3VsZCBwb2ludCBwcmVjaXNlbHlcbi8vIGJlZm9yZSBhbmQgYWZ0ZXIgYSBub2RlIGluIHRoZSBkb2N1bWVudC4gVGhhdCBub2RlLCBhbmQgb25seSB0aGF0XG4vLyBub2RlLCB3aWxsIHJlY2VpdmUgdGhlIGdpdmVuIGF0dHJpYnV0ZXMuXG4vL1xuLy8gc3BlYzo6LVxuLy9cbi8vIE9wdGlvbmFsIGluZm9ybWF0aW9uIHRvIHN0b3JlIHdpdGggdGhlIGRlY29yYXRpb24uIEl0XG4vLyBpcyBhbHNvIHVzZWQgd2hlbiBjb21wYXJpbmcgZGVjb3JhdG9ycyBmb3IgZXF1YWxpdHkuXG5EZWNvcmF0aW9uLm5vZGUgPSBmdW5jdGlvbiBub2RlIChmcm9tLCB0bywgYXR0cnMsIHNwZWMpIHtcbiAgcmV0dXJuIG5ldyBEZWNvcmF0aW9uKGZyb20sIHRvLCBuZXcgTm9kZVR5cGUoYXR0cnMsIHNwZWMpKVxufTtcblxuLy8gOjogT2JqZWN0XG4vLyBUaGUgc3BlYyBwcm92aWRlZCB3aGVuIGNyZWF0aW5nIHRoaXMgZGVjb3JhdGlvbi4gQ2FuIGJlIHVzZWZ1bFxuLy8gaWYgeW91J3ZlIHN0b3JlZCBleHRyYSBpbmZvcm1hdGlvbiBpbiB0aGF0IG9iamVjdC5cbnByb3RvdHlwZUFjY2Vzc29ycyQxLnNwZWMuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy50eXBlLnNwZWMgfTtcblxucHJvdG90eXBlQWNjZXNzb3JzJDEuaW5saW5lLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudHlwZSBpbnN0YW5jZW9mIElubGluZVR5cGUgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIERlY29yYXRpb24ucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMkMSApO1xuXG4vLyBEZWNvcmF0aW9uQXR0cnM6OiBpbnRlcmZhY2Vcbi8vIEEgc2V0IG9mIGF0dHJpYnV0ZXMgdG8gYWRkIHRvIGEgZGVjb3JhdGVkIG5vZGUuIE1vc3QgcHJvcGVydGllc1xuLy8gc2ltcGx5IGRpcmVjdGx5IGNvcnJlc3BvbmQgdG8gRE9NIGF0dHJpYnV0ZXMgb2YgdGhlIHNhbWUgbmFtZSxcbi8vIHdoaWNoIHdpbGwgYmUgc2V0IHRvIHRoZSBwcm9wZXJ0eSdzIHZhbHVlLiBUaGVzZSBhcmUgZXhjZXB0aW9uczpcbi8vXG4vLyAgIGNsYXNzOjogP3N0cmluZ1xuLy8gICBBIENTUyBjbGFzcyBuYW1lIG9yIGEgc3BhY2Utc2VwYXJhdGVkIHNldCBvZiBjbGFzcyBuYW1lcyB0byBiZVxuLy8gICBfYWRkZWRfIHRvIHRoZSBjbGFzc2VzIHRoYXQgdGhlIG5vZGUgYWxyZWFkeSBoYWQuXG4vL1xuLy8gICBzdHlsZTo6ID9zdHJpbmdcbi8vICAgQSBzdHJpbmcgb2YgQ1NTIHRvIGJlIF9hZGRlZF8gdG8gdGhlIG5vZGUncyBleGlzdGluZyBgc3R5bGVgIHByb3BlcnR5LlxuLy9cbi8vICAgbm9kZU5hbWU6OiA/c3RyaW5nXG4vLyAgIFdoZW4gbm9uLW51bGwsIHRoZSB0YXJnZXQgbm9kZSBpcyB3cmFwcGVkIGluIGEgRE9NIGVsZW1lbnQgb2Zcbi8vICAgdGhpcyB0eXBlIChhbmQgdGhlIG90aGVyIGF0dHJpYnV0ZXMgYXJlIGFwcGxpZWQgdG8gdGhpcyBlbGVtZW50KS5cblxudmFyIG5vbmUgPSBbXSwgbm9TcGVjID0ge307XG5cbi8vIDo6IGNsYXNzIGV4dGVuZHMgRGVjb3JhdGlvblNvdXJjZVxuLy8gQSBjb2xsZWN0aW9uIG9mIFtkZWNvcmF0aW9uc10oI3ZpZXcuRGVjb3JhdGlvbiksIG9yZ2FuaXplZCBpblxuLy8gc3VjaCBhIHdheSB0aGF0IHRoZSBkcmF3aW5nIGFsZ29yaXRobSBjYW4gZWZmaWNpZW50bHkgdXNlIGFuZFxuLy8gY29tcGFyZSB0aGVtLiBUaGlzIGlzIGEgcGVyc2lzdGVudCBkYXRhIHN0cnVjdHVyZeKAlGl0IGlzIG5vdFxuLy8gbW9kaWZpZWQsIHVwZGF0ZXMgY3JlYXRlIGEgbmV3IHZhbHVlLlxudmFyIERlY29yYXRpb25TZXQgPSBmdW5jdGlvbiBEZWNvcmF0aW9uU2V0KGxvY2FsLCBjaGlsZHJlbikge1xuICB0aGlzLmxvY2FsID0gbG9jYWwgJiYgbG9jYWwubGVuZ3RoID8gbG9jYWwgOiBub25lO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID8gY2hpbGRyZW4gOiBub25lO1xufTtcblxuLy8gOjogKE5vZGUsIFtEZWNvcmF0aW9uXSkg4oaSIERlY29yYXRpb25TZXRcbi8vIENyZWF0ZSBhIHNldCBvZiBkZWNvcmF0aW9ucywgdXNpbmcgdGhlIHN0cnVjdHVyZSBvZiB0aGUgZ2l2ZW5cbi8vIGRvY3VtZW50LlxuRGVjb3JhdGlvblNldC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUgKGRvYywgZGVjb3JhdGlvbnMpIHtcbiAgcmV0dXJuIGRlY29yYXRpb25zLmxlbmd0aCA/IGJ1aWxkVHJlZShkZWNvcmF0aW9ucywgZG9jLCAwLCBub1NwZWMpIDogZW1wdHlcbn07XG5cbi8vIDo6ICg/bnVtYmVyLCA/bnVtYmVyLCA/KHNwZWM6IE9iamVjdCkg4oaSIGJvb2wpIOKGkiBbRGVjb3JhdGlvbl1cbi8vIEZpbmQgYWxsIGRlY29yYXRpb25zIGluIHRoaXMgc2V0IHdoaWNoIHRvdWNoIHRoZSBnaXZlbiByYW5nZVxuLy8gKGluY2x1ZGluZyBkZWNvcmF0aW9ucyB0aGF0IHN0YXJ0IG9yIGVuZCBkaXJlY3RseSBhdCB0aGVcbi8vIGJvdW5kYXJpZXMpIGFuZCBtYXRjaCB0aGUgZ2l2ZW4gcHJlZGljYXRlIG9uIHRoZWlyIHNwZWMuIFdoZW5cbi8vIGBzdGFydGAgYW5kIGBlbmRgIGFyZSBvbWl0dGVkLCBhbGwgZGVjb3JhdGlvbnMgaW4gdGhlIHNldCBhcmVcbi8vIGNvbnNpZGVyZWQuIFdoZW4gYHByZWRpY2F0ZWAgaXNuJ3QgZ2l2ZW4sIGFsbCBkZWNvcmF0aW9ucyBhcmVcbi8vIGFzc3VtZWQgdG8gbWF0Y2guXG5EZWNvcmF0aW9uU2V0LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gZmluZCAoc3RhcnQsIGVuZCwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdGhpcy5maW5kSW5uZXIoc3RhcnQgPT0gbnVsbCA/IDAgOiBzdGFydCwgZW5kID09IG51bGwgPyAxZTkgOiBlbmQsIHJlc3VsdCwgMCwgcHJlZGljYXRlKTtcbiAgcmV0dXJuIHJlc3VsdFxufTtcblxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUuZmluZElubmVyID0gZnVuY3Rpb24gZmluZElubmVyIChzdGFydCwgZW5kLCByZXN1bHQsIG9mZnNldCwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sb2NhbC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzcGFuID0gdGhpcy5sb2NhbFtpXTtcbiAgICBpZiAoc3Bhbi5mcm9tIDw9IGVuZCAmJiBzcGFuLnRvID49IHN0YXJ0ICYmICghcHJlZGljYXRlIHx8IHByZWRpY2F0ZShzcGFuLnNwZWMpKSlcbiAgICAgIHsgcmVzdWx0LnB1c2goc3Bhbi5jb3B5KHNwYW4uZnJvbSArIG9mZnNldCwgc3Bhbi50byArIG9mZnNldCkpOyB9XG4gIH1cbiAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkkMSArPSAzKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW5baSQxXSA8IGVuZCAmJiB0aGlzLmNoaWxkcmVuW2kkMSArIDFdID4gc3RhcnQpIHtcbiAgICAgIHZhciBjaGlsZE9mZiA9IHRoaXMuY2hpbGRyZW5baSQxXSArIDE7XG4gICAgICB0aGlzLmNoaWxkcmVuW2kkMSArIDJdLmZpbmRJbm5lcihzdGFydCAtIGNoaWxkT2ZmLCBlbmQgLSBjaGlsZE9mZiwgcmVzdWx0LCBvZmZzZXQgKyBjaGlsZE9mZiwgcHJlZGljYXRlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIDo6IChNYXBwaW5nLCBOb2RlLCA/T2JqZWN0KSDihpIgRGVjb3JhdGlvblNldFxuLy8gTWFwIHRoZSBzZXQgb2YgZGVjb3JhdGlvbnMgaW4gcmVzcG9uc2UgdG8gYSBjaGFuZ2UgaW4gdGhlXG4vLyBkb2N1bWVudC5cbi8vXG4vLyBvcHRpb25zOjotIEFuIG9wdGlvbmFsIHNldCBvZiBvcHRpb25zLlxuLy9cbi8vICAgb25SZW1vdmU6OiA/KGRlY29yYXRpb25TcGVjOiBPYmplY3QpXG4vLyAgIFdoZW4gZ2l2ZW4sIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggZGVjb3JhdGlvblxuLy8gICB0aGF0IGdldHMgZHJvcHBlZCBhcyBhIHJlc3VsdCBvZiB0aGUgbWFwcGluZywgcGFzc2luZyB0aGVcbi8vICAgc3BlYyBvZiB0aGF0IGRlY29yYXRpb24uXG5EZWNvcmF0aW9uU2V0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBtYXAgKG1hcHBpbmcsIGRvYywgb3B0aW9ucykge1xuICBpZiAodGhpcyA9PSBlbXB0eSB8fCBtYXBwaW5nLm1hcHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXMgfVxuICByZXR1cm4gdGhpcy5tYXBJbm5lcihtYXBwaW5nLCBkb2MsIDAsIDAsIG9wdGlvbnMgfHwgbm9TcGVjKVxufTtcblxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUubWFwSW5uZXIgPSBmdW5jdGlvbiBtYXBJbm5lciAobWFwcGluZywgbm9kZSwgb2Zmc2V0LCBvbGRPZmZzZXQsIG9wdGlvbnMpIHtcbiAgdmFyIG5ld0xvY2FsO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9jYWwubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbWFwcGVkID0gdGhpcy5sb2NhbFtpXS5tYXAobWFwcGluZywgb2Zmc2V0LCBvbGRPZmZzZXQpO1xuICAgIGlmIChtYXBwZWQgJiYgbWFwcGVkLnR5cGUudmFsaWQobm9kZSwgbWFwcGVkKSkgeyAobmV3TG9jYWwgfHwgKG5ld0xvY2FsID0gW10pKS5wdXNoKG1hcHBlZCk7IH1cbiAgICBlbHNlIGlmIChvcHRpb25zLm9uUmVtb3ZlKSB7IG9wdGlvbnMub25SZW1vdmUodGhpcy5sb2NhbFtpXS5zcGVjKTsgfVxuICB9XG5cbiAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKVxuICAgIHsgcmV0dXJuIG1hcENoaWxkcmVuKHRoaXMuY2hpbGRyZW4sIG5ld0xvY2FsLCBtYXBwaW5nLCBub2RlLCBvZmZzZXQsIG9sZE9mZnNldCwgb3B0aW9ucykgfVxuICBlbHNlXG4gICAgeyByZXR1cm4gbmV3TG9jYWwgPyBuZXcgRGVjb3JhdGlvblNldChuZXdMb2NhbC5zb3J0KGJ5UG9zKSkgOiBlbXB0eSB9XG59O1xuXG4vLyA6OiAoTm9kZSwgW0RlY29yYXRpb25dKSDihpIgRGVjb3JhdGlvblNldFxuLy8gQWRkIHRoZSBnaXZlbiBhcnJheSBvZiBkZWNvcmF0aW9ucyB0byB0aGUgb25lcyBpbiB0aGUgc2V0LFxuLy8gcHJvZHVjaW5nIGEgbmV3IHNldC4gTmVlZHMgYWNjZXNzIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50IHRvXG4vLyBjcmVhdGUgdGhlIGFwcHJvcHJpYXRlIHRyZWUgc3RydWN0dXJlLlxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChkb2MsIGRlY29yYXRpb25zKSB7XG4gIGlmICghZGVjb3JhdGlvbnMubGVuZ3RoKSB7IHJldHVybiB0aGlzIH1cbiAgaWYgKHRoaXMgPT0gZW1wdHkpIHsgcmV0dXJuIERlY29yYXRpb25TZXQuY3JlYXRlKGRvYywgZGVjb3JhdGlvbnMpIH1cbiAgcmV0dXJuIHRoaXMuYWRkSW5uZXIoZG9jLCBkZWNvcmF0aW9ucywgMClcbn07XG5cbkRlY29yYXRpb25TZXQucHJvdG90eXBlLmFkZElubmVyID0gZnVuY3Rpb24gYWRkSW5uZXIgKGRvYywgZGVjb3JhdGlvbnMsIG9mZnNldCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBjaGlsZHJlbiwgY2hpbGRJbmRleCA9IDA7XG4gIGRvYy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE5vZGUsIGNoaWxkT2Zmc2V0KSB7XG4gICAgdmFyIGJhc2VPZmZzZXQgPSBjaGlsZE9mZnNldCArIG9mZnNldCwgZm91bmQ7XG4gICAgaWYgKCEoZm91bmQgPSB0YWtlU3BhbnNGb3JOb2RlKGRlY29yYXRpb25zLCBjaGlsZE5vZGUsIGJhc2VPZmZzZXQpKSkgeyByZXR1cm4gfVxuXG4gICAgaWYgKCFjaGlsZHJlbikgeyBjaGlsZHJlbiA9IHRoaXMkMS5jaGlsZHJlbi5zbGljZSgpOyB9XG4gICAgd2hpbGUgKGNoaWxkSW5kZXggPCBjaGlsZHJlbi5sZW5ndGggJiYgY2hpbGRyZW5bY2hpbGRJbmRleF0gPCBjaGlsZE9mZnNldCkgeyBjaGlsZEluZGV4ICs9IDM7IH1cbiAgICBpZiAoY2hpbGRyZW5bY2hpbGRJbmRleF0gPT0gY2hpbGRPZmZzZXQpXG4gICAgICB7IGNoaWxkcmVuW2NoaWxkSW5kZXggKyAyXSA9IGNoaWxkcmVuW2NoaWxkSW5kZXggKyAyXS5hZGRJbm5lcihjaGlsZE5vZGUsIGZvdW5kLCBiYXNlT2Zmc2V0ICsgMSk7IH1cbiAgICBlbHNlXG4gICAgICB7IGNoaWxkcmVuLnNwbGljZShjaGlsZEluZGV4LCAwLCBjaGlsZE9mZnNldCwgY2hpbGRPZmZzZXQgKyBjaGlsZE5vZGUubm9kZVNpemUsIGJ1aWxkVHJlZShmb3VuZCwgY2hpbGROb2RlLCBiYXNlT2Zmc2V0ICsgMSwgbm9TcGVjKSk7IH1cbiAgICBjaGlsZEluZGV4ICs9IDM7XG4gIH0pO1xuXG4gIHZhciBsb2NhbCA9IG1vdmVTcGFucyhjaGlsZEluZGV4ID8gd2l0aG91dE51bGxzKGRlY29yYXRpb25zKSA6IGRlY29yYXRpb25zLCAtb2Zmc2V0KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhbC5sZW5ndGg7IGkrKykgeyBpZiAoIWxvY2FsW2ldLnR5cGUudmFsaWQoZG9jLCBsb2NhbFtpXSkpIHsgbG9jYWwuc3BsaWNlKGktLSwgMSk7IH0gfVxuXG4gIHJldHVybiBuZXcgRGVjb3JhdGlvblNldChsb2NhbC5sZW5ndGggPyB0aGlzLmxvY2FsLmNvbmNhdChsb2NhbCkuc29ydChieVBvcykgOiB0aGlzLmxvY2FsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gfHwgdGhpcy5jaGlsZHJlbilcbn07XG5cbi8vIDo6IChbRGVjb3JhdGlvbl0pIOKGkiBEZWNvcmF0aW9uU2V0XG4vLyBDcmVhdGUgYSBuZXcgc2V0IHRoYXQgY29udGFpbnMgdGhlIGRlY29yYXRpb25zIGluIHRoaXMgc2V0LCBtaW51c1xuLy8gdGhlIG9uZXMgaW4gdGhlIGdpdmVuIGFycmF5LlxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChkZWNvcmF0aW9ucykge1xuICBpZiAoZGVjb3JhdGlvbnMubGVuZ3RoID09IDAgfHwgdGhpcyA9PSBlbXB0eSkgeyByZXR1cm4gdGhpcyB9XG4gIHJldHVybiB0aGlzLnJlbW92ZUlubmVyKGRlY29yYXRpb25zLCAwKVxufTtcblxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUucmVtb3ZlSW5uZXIgPSBmdW5jdGlvbiByZW1vdmVJbm5lciAoZGVjb3JhdGlvbnMsIG9mZnNldCkge1xuICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLCBsb2NhbCA9IHRoaXMubG9jYWw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpICs9IDMpIHtcbiAgICB2YXIgZm91bmQgPSAodm9pZCAwKSwgZnJvbSA9IGNoaWxkcmVuW2ldICsgb2Zmc2V0LCB0byA9IGNoaWxkcmVuW2kgKyAxXSArIG9mZnNldDtcbiAgICBmb3IgKHZhciBqID0gMCwgc3BhbiA9ICh2b2lkIDApOyBqIDwgZGVjb3JhdGlvbnMubGVuZ3RoOyBqKyspIHsgaWYgKHNwYW4gPSBkZWNvcmF0aW9uc1tqXSkge1xuICAgICAgaWYgKHNwYW4uZnJvbSA+IGZyb20gJiYgc3Bhbi50byA8IHRvKSB7XG4gICAgICAgIGRlY29yYXRpb25zW2pdID0gbnVsbFxuICAgICAgICA7KGZvdW5kIHx8IChmb3VuZCA9IFtdKSkucHVzaChzcGFuKTtcbiAgICAgIH1cbiAgICB9IH1cbiAgICBpZiAoIWZvdW5kKSB7IGNvbnRpbnVlIH1cbiAgICBpZiAoY2hpbGRyZW4gPT0gdGhpcy5jaGlsZHJlbikgeyBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uc2xpY2UoKTsgfVxuICAgIHZhciByZW1vdmVkID0gY2hpbGRyZW5baSArIDJdLnJlbW92ZUlubmVyKGZvdW5kLCBmcm9tICsgMSk7XG4gICAgaWYgKHJlbW92ZWQgIT0gZW1wdHkpIHtcbiAgICAgIGNoaWxkcmVuW2kgKyAyXSA9IHJlbW92ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuLnNwbGljZShpLCAzKTtcbiAgICAgIGkgLT0gMztcbiAgICB9XG4gIH1cbiAgaWYgKGxvY2FsLmxlbmd0aCkgeyBmb3IgKHZhciBpJDEgPSAwLCBzcGFuJDEgPSAodm9pZCAwKTsgaSQxIDwgZGVjb3JhdGlvbnMubGVuZ3RoOyBpJDErKykgeyBpZiAoc3BhbiQxID0gZGVjb3JhdGlvbnNbaSQxXSkge1xuICAgIGZvciAodmFyIGokMSA9IDA7IGokMSA8IGxvY2FsLmxlbmd0aDsgaiQxKyspIHsgaWYgKGxvY2FsW2okMV0uZXEoc3BhbiQxLCBvZmZzZXQpKSB7XG4gICAgICBpZiAobG9jYWwgPT0gdGhpcy5sb2NhbCkgeyBsb2NhbCA9IHRoaXMubG9jYWwuc2xpY2UoKTsgfVxuICAgICAgbG9jYWwuc3BsaWNlKGokMS0tLCAxKTtcbiAgICB9IH1cbiAgfSB9IH1cbiAgaWYgKGNoaWxkcmVuID09IHRoaXMuY2hpbGRyZW4gJiYgbG9jYWwgPT0gdGhpcy5sb2NhbCkgeyByZXR1cm4gdGhpcyB9XG4gIHJldHVybiBsb2NhbC5sZW5ndGggfHwgY2hpbGRyZW4ubGVuZ3RoID8gbmV3IERlY29yYXRpb25TZXQobG9jYWwsIGNoaWxkcmVuKSA6IGVtcHR5XG59O1xuXG5EZWNvcmF0aW9uU2V0LnByb3RvdHlwZS5mb3JDaGlsZCA9IGZ1bmN0aW9uIGZvckNoaWxkIChvZmZzZXQsIG5vZGUpIHtcbiAgaWYgKHRoaXMgPT0gZW1wdHkpIHsgcmV0dXJuIHRoaXMgfVxuICBpZiAobm9kZS5pc0xlYWYpIHsgcmV0dXJuIERlY29yYXRpb25TZXQuZW1wdHkgfVxuXG4gIHZhciBjaGlsZCwgbG9jYWw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgKz0gMykgeyBpZiAodGhpcy5jaGlsZHJlbltpXSA+PSBvZmZzZXQpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbltpXSA9PSBvZmZzZXQpIHsgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2kgKyAyXTsgfVxuICAgIGJyZWFrXG4gIH0gfVxuICB2YXIgc3RhcnQgPSBvZmZzZXQgKyAxLCBlbmQgPSBzdGFydCArIG5vZGUuY29udGVudC5zaXplO1xuICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCB0aGlzLmxvY2FsLmxlbmd0aDsgaSQxKyspIHtcbiAgICB2YXIgZGVjID0gdGhpcy5sb2NhbFtpJDFdO1xuICAgIGlmIChkZWMuZnJvbSA8IGVuZCAmJiBkZWMudG8gPiBzdGFydCAmJiAoZGVjLnR5cGUgaW5zdGFuY2VvZiBJbmxpbmVUeXBlKSkge1xuICAgICAgdmFyIGZyb20gPSBNYXRoLm1heChzdGFydCwgZGVjLmZyb20pIC0gc3RhcnQsIHRvID0gTWF0aC5taW4oZW5kLCBkZWMudG8pIC0gc3RhcnQ7XG4gICAgICBpZiAoZnJvbSA8IHRvKSB7IChsb2NhbCB8fCAobG9jYWwgPSBbXSkpLnB1c2goZGVjLmNvcHkoZnJvbSwgdG8pKTsgfVxuICAgIH1cbiAgfVxuICBpZiAobG9jYWwpIHtcbiAgICB2YXIgbG9jYWxTZXQgPSBuZXcgRGVjb3JhdGlvblNldChsb2NhbC5zb3J0KGJ5UG9zKSk7XG4gICAgcmV0dXJuIGNoaWxkID8gbmV3IERlY29yYXRpb25Hcm91cChbbG9jYWxTZXQsIGNoaWxkXSkgOiBsb2NhbFNldFxuICB9XG4gIHJldHVybiBjaGlsZCB8fCBlbXB0eVxufTtcblxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiBlcSAob3RoZXIpIHtcbiAgaWYgKHRoaXMgPT0gb3RoZXIpIHsgcmV0dXJuIHRydWUgfVxuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIERlY29yYXRpb25TZXQpIHx8XG4gICAgICB0aGlzLmxvY2FsLmxlbmd0aCAhPSBvdGhlci5sb2NhbC5sZW5ndGggfHxcbiAgICAgIHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9IG90aGVyLmNoaWxkcmVuLmxlbmd0aCkgeyByZXR1cm4gZmFsc2UgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9jYWwubGVuZ3RoOyBpKyspXG4gICAgeyBpZiAoIXRoaXMubG9jYWxbaV0uZXEob3RoZXIubG9jYWxbaV0pKSB7IHJldHVybiBmYWxzZSB9IH1cbiAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkkMSArPSAzKVxuICAgIHsgaWYgKHRoaXMuY2hpbGRyZW5baSQxXSAhPSBvdGhlci5jaGlsZHJlbltpJDFdIHx8XG4gICAgICAgIHRoaXMuY2hpbGRyZW5baSQxICsgMV0gIT0gb3RoZXIuY2hpbGRyZW5baSQxICsgMV0gfHxcbiAgICAgICAgIXRoaXMuY2hpbGRyZW5baSQxICsgMl0uZXEob3RoZXIuY2hpbGRyZW5baSQxICsgMl0pKSB7IHJldHVybiBmYWxzZSB9IH1cbiAgcmV0dXJuIHRydWVcbn07XG5cbkRlY29yYXRpb25TZXQucHJvdG90eXBlLmxvY2FscyA9IGZ1bmN0aW9uIGxvY2FscyAobm9kZSkge1xuICByZXR1cm4gcmVtb3ZlT3ZlcmxhcCh0aGlzLmxvY2Fsc0lubmVyKG5vZGUpKVxufTtcblxuRGVjb3JhdGlvblNldC5wcm90b3R5cGUubG9jYWxzSW5uZXIgPSBmdW5jdGlvbiBsb2NhbHNJbm5lciAobm9kZSkge1xuICBpZiAodGhpcyA9PSBlbXB0eSkgeyByZXR1cm4gbm9uZSB9XG4gIGlmIChub2RlLmlubGluZUNvbnRlbnQgfHwgIXRoaXMubG9jYWwuc29tZShJbmxpbmVUeXBlLmlzKSkgeyByZXR1cm4gdGhpcy5sb2NhbCB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxvY2FsLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCEodGhpcy5sb2NhbFtpXS50eXBlIGluc3RhbmNlb2YgSW5saW5lVHlwZSkpXG4gICAgICB7IHJlc3VsdC5wdXNoKHRoaXMubG9jYWxbaV0pOyB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufTtcblxuLy8gRGVjb3JhdGlvblNvdXJjZTo6IGludGVyZmFjZVxuLy8gQW4gb2JqZWN0IHRoYXQgY2FuIFtwcm92aWRlXSgjdmlldy5FZGl0b3JQcm9wcy5kZWNvcmF0aW9ucylcbi8vIGRlY29yYXRpb25zLiBJbXBsZW1lbnRlZCBieSBbYERlY29yYXRpb25TZXRgXSgjdmlldy5EZWNvcmF0aW9uU2V0KSxcbi8vIGFuZCBwYXNzZWQgdG8gW25vZGUgdmlld3NdKCN2aWV3LkVkaXRvclByb3BzLm5vZGVWaWV3cykuXG5cbnZhciBlbXB0eSA9IG5ldyBEZWNvcmF0aW9uU2V0KCk7XG5cbi8vIDo6IERlY29yYXRpb25TZXRcbi8vIFRoZSBlbXB0eSBzZXQgb2YgZGVjb3JhdGlvbnMuXG5EZWNvcmF0aW9uU2V0LmVtcHR5ID0gZW1wdHk7XG5cbkRlY29yYXRpb25TZXQucmVtb3ZlT3ZlcmxhcCA9IHJlbW92ZU92ZXJsYXA7XG5cbi8vIDotIEFuIGFic3RyYWN0aW9uIHRoYXQgYWxsb3dzIHRoZSBjb2RlIGRlYWxpbmcgd2l0aCBkZWNvcmF0aW9ucyB0b1xuLy8gdHJlYXQgbXVsdGlwbGUgRGVjb3JhdGlvblNldCBvYmplY3RzIGFzIGlmIGl0IHdlcmUgYSBzaW5nbGUgb2JqZWN0XG4vLyB3aXRoIChhIHN1YnNldCBvZikgdGhlIHNhbWUgaW50ZXJmYWNlLlxudmFyIERlY29yYXRpb25Hcm91cCA9IGZ1bmN0aW9uIERlY29yYXRpb25Hcm91cChtZW1iZXJzKSB7XG4gIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG59O1xuXG5EZWNvcmF0aW9uR3JvdXAucHJvdG90eXBlLmZvckNoaWxkID0gZnVuY3Rpb24gZm9yQ2hpbGQgKG9mZnNldCwgY2hpbGQpIHtcbiAgaWYgKGNoaWxkLmlzTGVhZikgeyByZXR1cm4gRGVjb3JhdGlvblNldC5lbXB0eSB9XG4gIHZhciBmb3VuZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLm1lbWJlcnNbaV0uZm9yQ2hpbGQob2Zmc2V0LCBjaGlsZCk7XG4gICAgaWYgKHJlc3VsdCA9PSBlbXB0eSkgeyBjb250aW51ZSB9XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIERlY29yYXRpb25Hcm91cCkgeyBmb3VuZCA9IGZvdW5kLmNvbmNhdChyZXN1bHQubWVtYmVycyk7IH1cbiAgICBlbHNlIHsgZm91bmQucHVzaChyZXN1bHQpOyB9XG4gIH1cbiAgcmV0dXJuIERlY29yYXRpb25Hcm91cC5mcm9tKGZvdW5kKVxufTtcblxuRGVjb3JhdGlvbkdyb3VwLnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIGVxIChvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIERlY29yYXRpb25Hcm91cCkgfHxcbiAgICAgIG90aGVyLm1lbWJlcnMubGVuZ3RoICE9IHRoaXMubWVtYmVycy5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1lbWJlcnMubGVuZ3RoOyBpKyspXG4gICAgeyBpZiAoIXRoaXMubWVtYmVyc1tpXS5lcShvdGhlci5tZW1iZXJzW2ldKSkgeyByZXR1cm4gZmFsc2UgfSB9XG4gIHJldHVybiB0cnVlXG59O1xuXG5EZWNvcmF0aW9uR3JvdXAucHJvdG90eXBlLmxvY2FscyA9IGZ1bmN0aW9uIGxvY2FscyAobm9kZSkge1xuICB2YXIgcmVzdWx0LCBzb3J0ZWQgPSB0cnVlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsb2NhbHMgPSB0aGlzLm1lbWJlcnNbaV0ubG9jYWxzSW5uZXIobm9kZSk7XG4gICAgaWYgKCFsb2NhbHMubGVuZ3RoKSB7IGNvbnRpbnVlIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gbG9jYWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc29ydGVkKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zbGljZSgpO1xuICAgICAgICBzb3J0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbG9jYWxzLmxlbmd0aDsgaisrKSB7IHJlc3VsdC5wdXNoKGxvY2Fsc1tqXSk7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdCA/IHJlbW92ZU92ZXJsYXAoc29ydGVkID8gcmVzdWx0IDogcmVzdWx0LnNvcnQoYnlQb3MpKSA6IG5vbmVcbn07XG5cbi8vIDogKFtEZWNvcmF0aW9uU2V0XSkg4oaSIHVuaW9uPERlY29yYXRpb25TZXQsIERlY29yYXRpb25Hcm91cD5cbi8vIENyZWF0ZSBhIGdyb3VwIGZvciB0aGUgZ2l2ZW4gYXJyYXkgb2YgZGVjb3JhdGlvbiBzZXRzLCBvciByZXR1cm5cbi8vIGEgc2luZ2xlIHNldCB3aGVuIHBvc3NpYmxlLlxuRGVjb3JhdGlvbkdyb3VwLmZyb20gPSBmdW5jdGlvbiBmcm9tIChtZW1iZXJzKSB7XG4gIHN3aXRjaCAobWVtYmVycy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBlbXB0eVxuICAgIGNhc2UgMTogcmV0dXJuIG1lbWJlcnNbMF1cbiAgICBkZWZhdWx0OiByZXR1cm4gbmV3IERlY29yYXRpb25Hcm91cChtZW1iZXJzKVxuICB9XG59O1xuXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3TG9jYWwsIG1hcHBpbmcsIG5vZGUsIG9mZnNldCwgb2xkT2Zmc2V0LCBvcHRpb25zKSB7XG4gIHZhciBjaGlsZHJlbiA9IG9sZENoaWxkcmVuLnNsaWNlKCk7XG5cbiAgLy8gTWFyayB0aGUgY2hpbGRyZW4gdGhhdCBhcmUgZGlyZWN0bHkgdG91Y2hlZCBieSBjaGFuZ2VzLCBhbmRcbiAgLy8gbW92ZSB0aG9zZSB0aGF0IGFyZSBhZnRlciB0aGUgY2hhbmdlcy5cbiAgdmFyIHNoaWZ0ID0gZnVuY3Rpb24gKG9sZFN0YXJ0LCBvbGRFbmQsIG5ld1N0YXJ0LCBuZXdFbmQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICB2YXIgZW5kID0gY2hpbGRyZW5baSArIDFdLCBkU2l6ZSA9ICh2b2lkIDApO1xuICAgICAgaWYgKGVuZCA9PSAtMSB8fCBvbGRTdGFydCA+IGVuZCArIG9sZE9mZnNldCkgeyBjb250aW51ZSB9XG4gICAgICBpZiAob2xkRW5kID49IGNoaWxkcmVuW2ldICsgb2xkT2Zmc2V0KSB7XG4gICAgICAgIGNoaWxkcmVuW2kgKyAxXSA9IC0xO1xuICAgICAgfSBlbHNlIGlmIChuZXdTdGFydCA+PSBvZmZzZXQgJiYgKGRTaXplID0gKG5ld0VuZCAtIG5ld1N0YXJ0KSAtIChvbGRFbmQgLSBvbGRTdGFydCkpKSB7XG4gICAgICAgIGNoaWxkcmVuW2ldICs9IGRTaXplO1xuICAgICAgICBjaGlsZHJlbltpICsgMV0gKz0gZFNpemU7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hcHBpbmcubWFwcy5sZW5ndGg7IGkrKykgeyBtYXBwaW5nLm1hcHNbaV0uZm9yRWFjaChzaGlmdCk7IH1cblxuICAvLyBGaW5kIHRoZSBjaGlsZCBub2RlcyB0aGF0IHN0aWxsIGNvcnJlc3BvbmQgdG8gYSBzaW5nbGUgbm9kZSxcbiAgLy8gcmVjdXJzaXZlbHkgY2FsbCBtYXBJbm5lciBvbiB0aGVtIGFuZCB1cGRhdGUgdGhlaXIgcG9zaXRpb25zLlxuICB2YXIgbXVzdFJlYnVpbGQgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgY2hpbGRyZW4ubGVuZ3RoOyBpJDEgKz0gMykgeyBpZiAoY2hpbGRyZW5baSQxICsgMV0gPT0gLTEpIHsgLy8gVG91Y2hlZCBub2Rlc1xuICAgIHZhciBmcm9tID0gbWFwcGluZy5tYXAob2xkQ2hpbGRyZW5baSQxXSArIG9sZE9mZnNldCksIGZyb21Mb2NhbCA9IGZyb20gLSBvZmZzZXQ7XG4gICAgaWYgKGZyb21Mb2NhbCA8IDAgfHwgZnJvbUxvY2FsID49IG5vZGUuY29udGVudC5zaXplKSB7XG4gICAgICBtdXN0UmVidWlsZCA9IHRydWU7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICAvLyBNdXN0IHJlYWQgb2xkQ2hpbGRyZW4gYmVjYXVzZSBjaGlsZHJlbiB3YXMgdGFnZ2VkIHdpdGggLTFcbiAgICB2YXIgdG8gPSBtYXBwaW5nLm1hcChvbGRDaGlsZHJlbltpJDEgKyAxXSArIG9sZE9mZnNldCwgLTEpLCB0b0xvY2FsID0gdG8gLSBvZmZzZXQ7XG4gICAgdmFyIHJlZiA9IG5vZGUuY29udGVudC5maW5kSW5kZXgoZnJvbUxvY2FsKTtcbiAgICB2YXIgaW5kZXggPSByZWYuaW5kZXg7XG4gICAgdmFyIGNoaWxkT2Zmc2V0ID0gcmVmLm9mZnNldDtcbiAgICB2YXIgY2hpbGROb2RlID0gbm9kZS5tYXliZUNoaWxkKGluZGV4KTtcbiAgICBpZiAoY2hpbGROb2RlICYmIGNoaWxkT2Zmc2V0ID09IGZyb21Mb2NhbCAmJiBjaGlsZE9mZnNldCArIGNoaWxkTm9kZS5ub2RlU2l6ZSA9PSB0b0xvY2FsKSB7XG4gICAgICB2YXIgbWFwcGVkID0gY2hpbGRyZW5baSQxICsgMl0ubWFwSW5uZXIobWFwcGluZywgY2hpbGROb2RlLCBmcm9tICsgMSwgb2xkQ2hpbGRyZW5baSQxXSArIG9sZE9mZnNldCArIDEsIG9wdGlvbnMpO1xuICAgICAgaWYgKG1hcHBlZCAhPSBlbXB0eSkge1xuICAgICAgICBjaGlsZHJlbltpJDFdID0gZnJvbUxvY2FsO1xuICAgICAgICBjaGlsZHJlbltpJDEgKyAxXSA9IHRvTG9jYWw7XG4gICAgICAgIGNoaWxkcmVuW2kkMSArIDJdID0gbWFwcGVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRyZW5baSQxICsgMV0gPSAtMjtcbiAgICAgICAgbXVzdFJlYnVpbGQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtdXN0UmVidWlsZCA9IHRydWU7XG4gICAgfVxuICB9IH1cblxuICAvLyBSZW1haW5pbmcgY2hpbGRyZW4gbXVzdCBiZSBjb2xsZWN0ZWQgYW5kIHJlYnVpbHQgaW50byB0aGUgYXBwcm9wcmlhdGUgc3RydWN0dXJlXG4gIGlmIChtdXN0UmVidWlsZCkge1xuICAgIHZhciBkZWNvcmF0aW9ucyA9IG1hcEFuZEdhdGhlclJlbWFpbmluZ0RlY29yYXRpb25zKGNoaWxkcmVuLCBvbGRDaGlsZHJlbiwgbmV3TG9jYWwgfHwgW10sIG1hcHBpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LCBvbGRPZmZzZXQsIG9wdGlvbnMpO1xuICAgIHZhciBidWlsdCA9IGJ1aWxkVHJlZShkZWNvcmF0aW9ucywgbm9kZSwgMCwgb3B0aW9ucyk7XG4gICAgbmV3TG9jYWwgPSBidWlsdC5sb2NhbDtcbiAgICBmb3IgKHZhciBpJDIgPSAwOyBpJDIgPCBjaGlsZHJlbi5sZW5ndGg7IGkkMiArPSAzKSB7IGlmIChjaGlsZHJlbltpJDIgKyAxXSA8IDApIHtcbiAgICAgIGNoaWxkcmVuLnNwbGljZShpJDIsIDMpO1xuICAgICAgaSQyIC09IDM7XG4gICAgfSB9XG4gICAgZm9yICh2YXIgaSQzID0gMCwgaiA9IDA7IGkkMyA8IGJ1aWx0LmNoaWxkcmVuLmxlbmd0aDsgaSQzICs9IDMpIHtcbiAgICAgIHZhciBmcm9tJDEgPSBidWlsdC5jaGlsZHJlbltpJDNdO1xuICAgICAgd2hpbGUgKGogPCBjaGlsZHJlbi5sZW5ndGggJiYgY2hpbGRyZW5bal0gPCBmcm9tJDEpIHsgaiArPSAzOyB9XG4gICAgICBjaGlsZHJlbi5zcGxpY2UoaiwgMCwgYnVpbHQuY2hpbGRyZW5baSQzXSwgYnVpbHQuY2hpbGRyZW5baSQzICsgMV0sIGJ1aWx0LmNoaWxkcmVuW2kkMyArIDJdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IERlY29yYXRpb25TZXQobmV3TG9jYWwgJiYgbmV3TG9jYWwuc29ydChieVBvcyksIGNoaWxkcmVuKVxufVxuXG5mdW5jdGlvbiBtb3ZlU3BhbnMoc3BhbnMsIG9mZnNldCkge1xuICBpZiAoIW9mZnNldCB8fCAhc3BhbnMubGVuZ3RoKSB7IHJldHVybiBzcGFucyB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGFucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzcGFuID0gc3BhbnNbaV07XG4gICAgcmVzdWx0LnB1c2gobmV3IERlY29yYXRpb24oc3Bhbi5mcm9tICsgb2Zmc2V0LCBzcGFuLnRvICsgb2Zmc2V0LCBzcGFuLnR5cGUpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIG1hcEFuZEdhdGhlclJlbWFpbmluZ0RlY29yYXRpb25zKGNoaWxkcmVuLCBvbGRDaGlsZHJlbiwgZGVjb3JhdGlvbnMsIG1hcHBpbmcsIG9mZnNldCwgb2xkT2Zmc2V0LCBvcHRpb25zKSB7XG4gIC8vIEdhdGhlciBhbGwgZGVjb3JhdGlvbnMgZnJvbSB0aGUgcmVtYWluaW5nIG1hcmtlZCBjaGlsZHJlblxuICBmdW5jdGlvbiBnYXRoZXIoc2V0LCBvbGRPZmZzZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sb2NhbC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG1hcHBlZCA9IHNldC5sb2NhbFtpXS5tYXAobWFwcGluZywgb2Zmc2V0LCBvbGRPZmZzZXQpO1xuICAgICAgaWYgKG1hcHBlZCkgeyBkZWNvcmF0aW9ucy5wdXNoKG1hcHBlZCk7IH1cbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMub25SZW1vdmUpIHsgb3B0aW9ucy5vblJlbW92ZShzZXQubG9jYWxbaV0uc3BlYyk7IH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgc2V0LmNoaWxkcmVuLmxlbmd0aDsgaSQxICs9IDMpXG4gICAgICB7IGdhdGhlcihzZXQuY2hpbGRyZW5baSQxICsgMl0sIHNldC5jaGlsZHJlbltpJDFdICsgb2xkT2Zmc2V0ICsgMSk7IH1cbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArPSAzKSB7IGlmIChjaGlsZHJlbltpICsgMV0gPT0gLTEpXG4gICAgeyBnYXRoZXIoY2hpbGRyZW5baSArIDJdLCBvbGRDaGlsZHJlbltpXSArIG9sZE9mZnNldCArIDEpOyB9IH1cblxuICByZXR1cm4gZGVjb3JhdGlvbnNcbn1cblxuZnVuY3Rpb24gdGFrZVNwYW5zRm9yTm9kZShzcGFucywgbm9kZSwgb2Zmc2V0KSB7XG4gIGlmIChub2RlLmlzTGVhZikgeyByZXR1cm4gbnVsbCB9XG4gIHZhciBlbmQgPSBvZmZzZXQgKyBub2RlLm5vZGVTaXplLCBmb3VuZCA9IG51bGw7XG4gIGZvciAodmFyIGkgPSAwLCBzcGFuID0gKHZvaWQgMCk7IGkgPCBzcGFucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICgoc3BhbiA9IHNwYW5zW2ldKSAmJiBzcGFuLmZyb20gPiBvZmZzZXQgJiYgc3Bhbi50byA8IGVuZCkge1xuKGZvdW5kIHx8IChmb3VuZCA9IFtdKSkucHVzaChzcGFuKTtcbiAgICAgIHNwYW5zW2ldID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvdW5kXG59XG5cbmZ1bmN0aW9uIHdpdGhvdXROdWxscyhhcnJheSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspXG4gICAgeyBpZiAoYXJyYXlbaV0gIT0gbnVsbCkgeyByZXN1bHQucHVzaChhcnJheVtpXSk7IH0gfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIDogKFtEZWNvcmF0aW9uXSwgTm9kZSwgbnVtYmVyKSDihpIgRGVjb3JhdGlvblNldFxuLy8gQnVpbGQgdXAgYSB0cmVlIHRoYXQgY29ycmVzcG9uZHMgdG8gYSBzZXQgb2YgZGVjb3JhdGlvbnMuIGBvZmZzZXRgXG4vLyBpcyBhIGJhc2Ugb2Zmc2V0IHRoYXQgc2hvdWxkIGJlIHN1YnRyYWN0ZXQgZnJvbSB0aGUgYGZyb21gIGFuZCBgdG9gXG4vLyBwb3NpdGlvbnMgaW4gdGhlIHNwYW5zIChzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gYWxsb2NhdGUgbmV3IHNwYW5zXG4vLyBmb3IgcmVjdXJzaXZlIGNhbGxzKS5cbmZ1bmN0aW9uIGJ1aWxkVHJlZShzcGFucywgbm9kZSwgb2Zmc2V0LCBvcHRpb25zKSB7XG4gIHZhciBjaGlsZHJlbiA9IFtdLCBoYXNOdWxscyA9IGZhbHNlO1xuICBub2RlLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTm9kZSwgbG9jYWxTdGFydCkge1xuICAgIHZhciBmb3VuZCA9IHRha2VTcGFuc0Zvck5vZGUoc3BhbnMsIGNoaWxkTm9kZSwgbG9jYWxTdGFydCArIG9mZnNldCk7XG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBoYXNOdWxscyA9IHRydWU7XG4gICAgICB2YXIgc3VidHJlZSA9IGJ1aWxkVHJlZShmb3VuZCwgY2hpbGROb2RlLCBvZmZzZXQgKyBsb2NhbFN0YXJ0ICsgMSwgb3B0aW9ucyk7XG4gICAgICBpZiAoc3VidHJlZSAhPSBlbXB0eSlcbiAgICAgICAgeyBjaGlsZHJlbi5wdXNoKGxvY2FsU3RhcnQsIGxvY2FsU3RhcnQgKyBjaGlsZE5vZGUubm9kZVNpemUsIHN1YnRyZWUpOyB9XG4gICAgfVxuICB9KTtcbiAgdmFyIGxvY2FscyA9IG1vdmVTcGFucyhoYXNOdWxscyA/IHdpdGhvdXROdWxscyhzcGFucykgOiBzcGFucywgLW9mZnNldCkuc29ydChieVBvcyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYWxzLmxlbmd0aDsgaSsrKSB7IGlmICghbG9jYWxzW2ldLnR5cGUudmFsaWQobm9kZSwgbG9jYWxzW2ldKSkge1xuICAgIGlmIChvcHRpb25zLm9uUmVtb3ZlKSB7IG9wdGlvbnMub25SZW1vdmUobG9jYWxzW2ldLnNwZWMpOyB9XG4gICAgbG9jYWxzLnNwbGljZShpLS0sIDEpO1xuICB9IH1cbiAgcmV0dXJuIGxvY2Fscy5sZW5ndGggfHwgY2hpbGRyZW4ubGVuZ3RoID8gbmV3IERlY29yYXRpb25TZXQobG9jYWxzLCBjaGlsZHJlbikgOiBlbXB0eVxufVxuXG4vLyA6IChEZWNvcmF0aW9uLCBEZWNvcmF0aW9uKSDihpIgbnVtYmVyXG4vLyBVc2VkIHRvIHNvcnQgZGVjb3JhdGlvbnMgc28gdGhhdCBvbmVzIHdpdGggYSBsb3cgc3RhcnQgcG9zaXRpb25cbi8vIGNvbWUgZmlyc3QsIGFuZCB3aXRoaW4gYSBzZXQgd2l0aCB0aGUgc2FtZSBzdGFydCBwb3NpdGlvbiwgdGhvc2Vcbi8vIHdpdGggYW4gc21hbGxlciBlbmQgcG9zaXRpb24gY29tZSBmaXJzdC5cbmZ1bmN0aW9uIGJ5UG9zKGEsIGIpIHtcbiAgcmV0dXJuIGEuZnJvbSAtIGIuZnJvbSB8fCBhLnRvIC0gYi50b1xufVxuXG4vLyA6IChbRGVjb3JhdGlvbl0pIOKGkiBbRGVjb3JhdGlvbl1cbi8vIFNjYW4gYSBzb3J0ZWQgYXJyYXkgb2YgZGVjb3JhdGlvbnMgZm9yIHBhcnRpYWxseSBvdmVybGFwcGluZyBzcGFucyxcbi8vIGFuZCBzcGxpdCB0aG9zZSBzbyB0aGF0IG9ubHkgZnVsbHkgb3ZlcmxhcHBpbmcgc3BhbnMgYXJlIGxlZnQgKHRvXG4vLyBtYWtlIHN1YnNlcXVlbnQgcmVuZGVyaW5nIGVhc2llcikuIFdpbGwgcmV0dXJuIHRoZSBpbnB1dCBhcnJheSBpZlxuLy8gbm8gcGFydGlhbGx5IG92ZXJsYXBwaW5nIHNwYW5zIGFyZSBmb3VuZCAodGhlIGNvbW1vbiBjYXNlKS5cbmZ1bmN0aW9uIHJlbW92ZU92ZXJsYXAoc3BhbnMpIHtcbiAgdmFyIHdvcmtpbmcgPSBzcGFucztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3JraW5nLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIHZhciBzcGFuID0gd29ya2luZ1tpXTtcbiAgICBpZiAoc3Bhbi5mcm9tICE9IHNwYW4udG8pIHsgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgd29ya2luZy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIG5leHQgPSB3b3JraW5nW2pdO1xuICAgICAgaWYgKG5leHQuZnJvbSA9PSBzcGFuLmZyb20pIHtcbiAgICAgICAgaWYgKG5leHQudG8gIT0gc3Bhbi50bykge1xuICAgICAgICAgIGlmICh3b3JraW5nID09IHNwYW5zKSB7IHdvcmtpbmcgPSBzcGFucy5zbGljZSgpOyB9XG4gICAgICAgICAgLy8gRm9sbG93ZWQgYnkgYSBwYXJ0aWFsbHkgb3ZlcmxhcHBpbmcgbGFyZ2VyIHNwYW4uIFNwbGl0IHRoYXRcbiAgICAgICAgICAvLyBzcGFuLlxuICAgICAgICAgIHdvcmtpbmdbal0gPSBuZXh0LmNvcHkobmV4dC5mcm9tLCBzcGFuLnRvKTtcbiAgICAgICAgICBpbnNlcnRBaGVhZCh3b3JraW5nLCBqICsgMSwgbmV4dC5jb3B5KHNwYW4udG8sIG5leHQudG8pKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG5leHQuZnJvbSA8IHNwYW4udG8pIHtcbiAgICAgICAgICBpZiAod29ya2luZyA9PSBzcGFucykgeyB3b3JraW5nID0gc3BhbnMuc2xpY2UoKTsgfVxuICAgICAgICAgIC8vIFRoZSBlbmQgb2YgdGhpcyBvbmUgb3ZlcmxhcHMgd2l0aCBhIHN1YnNlcXVlbnQgc3Bhbi4gU3BsaXRcbiAgICAgICAgICAvLyB0aGlzIG9uZS5cbiAgICAgICAgICB3b3JraW5nW2ldID0gc3Bhbi5jb3B5KHNwYW4uZnJvbSwgbmV4dC5mcm9tKTtcbiAgICAgICAgICBpbnNlcnRBaGVhZCh3b3JraW5nLCBqLCBzcGFuLmNvcHkobmV4dC5mcm9tLCBzcGFuLnRvKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9IH1cbiAgfVxuICByZXR1cm4gd29ya2luZ1xufVxuXG5mdW5jdGlvbiBpbnNlcnRBaGVhZChhcnJheSwgaSwgZGVjbykge1xuICB3aGlsZSAoaSA8IGFycmF5Lmxlbmd0aCAmJiBieVBvcyhkZWNvLCBhcnJheVtpXSkgPiAwKSB7IGkrKzsgfVxuICBhcnJheS5zcGxpY2UoaSwgMCwgZGVjbyk7XG59XG5cbi8vIDogKEVkaXRvclZpZXcpIOKGkiB1bmlvbjxEZWNvcmF0aW9uU2V0LCBEZWNvcmF0aW9uR3JvdXA+XG4vLyBHZXQgdGhlIGRlY29yYXRpb25zIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBwcm9wcyBvZiBhIHZpZXcuXG5mdW5jdGlvbiB2aWV3RGVjb3JhdGlvbnModmlldykge1xuICB2YXIgZm91bmQgPSBbXTtcbiAgdmlldy5zb21lUHJvcChcImRlY29yYXRpb25zXCIsIGZ1bmN0aW9uIChmKSB7XG4gICAgdmFyIHJlc3VsdCA9IGYodmlldy5zdGF0ZSk7XG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgIT0gZW1wdHkpIHsgZm91bmQucHVzaChyZXN1bHQpOyB9XG4gIH0pO1xuICBpZiAodmlldy5jdXJzb3JXcmFwcGVyKVxuICAgIHsgZm91bmQucHVzaChEZWNvcmF0aW9uU2V0LmNyZWF0ZSh2aWV3LnN0YXRlLmRvYywgW3ZpZXcuY3Vyc29yV3JhcHBlci5kZWNvXSkpOyB9XG4gIHJldHVybiBEZWNvcmF0aW9uR3JvdXAuZnJvbShmb3VuZClcbn1cblxuLy8gOjotIEFuIGVkaXRvciB2aWV3IG1hbmFnZXMgdGhlIERPTSBzdHJ1Y3R1cmUgdGhhdCByZXByZXNlbnRzIGFuXG4vLyBlZGl0YWJsZSBkb2N1bWVudC4gSXRzIHN0YXRlIGFuZCBiZWhhdmlvciBhcmUgZGV0ZXJtaW5lZCBieSBpdHNcbi8vIFtwcm9wc10oI3ZpZXcuRGlyZWN0RWRpdG9yUHJvcHMpLlxudmFyIEVkaXRvclZpZXcgPSBmdW5jdGlvbiBFZGl0b3JWaWV3KHBsYWNlLCBwcm9wcykge1xuICB0aGlzLl9wcm9wcyA9IHByb3BzO1xuICAvLyA6OiBFZGl0b3JTdGF0ZVxuICAvLyBUaGUgdmlldydzIGN1cnJlbnQgW3N0YXRlXSgjc3RhdGUuRWRpdG9yU3RhdGUpLlxuICB0aGlzLnN0YXRlID0gcHJvcHMuc3RhdGU7XG5cbiAgdGhpcy5kaXNwYXRjaCA9IHRoaXMuZGlzcGF0Y2guYmluZCh0aGlzKTtcblxuICB0aGlzLl9yb290ID0gbnVsbDtcbiAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gIC8vIEtsdWRnZSB1c2VkIHRvIHdvcmsgYXJvdW5kIGEgQ2hyb21lIGJ1Z1xuICB0aGlzLnRyYWNrV3JpdGVzID0gbnVsbDtcblxuICAvLyA6OiBkb20uRWxlbWVudFxuICAvLyBBbiBlZGl0YWJsZSBET00gbm9kZSBjb250YWluaW5nIHRoZSBkb2N1bWVudC4gKFlvdSBwcm9iYWJseVxuICAvLyBzaG91bGQgbm90IGRpcmVjdGx5IGludGVyZmVyZSB3aXRoIGl0cyBjb250ZW50LilcbiAgdGhpcy5kb20gPSAocGxhY2UgJiYgcGxhY2UubW91bnQpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlmIChwbGFjZSkge1xuICAgIGlmIChwbGFjZS5hcHBlbmRDaGlsZCkgeyBwbGFjZS5hcHBlbmRDaGlsZCh0aGlzLmRvbSk7IH1cbiAgICBlbHNlIGlmIChwbGFjZS5hcHBseSkgeyBwbGFjZSh0aGlzLmRvbSk7IH1cbiAgICBlbHNlIGlmIChwbGFjZS5tb3VudCkgeyB0aGlzLm1vdW50ZWQgPSB0cnVlOyB9XG4gIH1cblxuICAvLyA6OiBib29sXG4gIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoZSBlZGl0b3IgaXMgY3VycmVudGx5IFtlZGl0YWJsZV0oI3ZpZXcuRWRpdG9yUHJvcHMuZWRpdGFibGUpLlxuICB0aGlzLmVkaXRhYmxlID0gZ2V0RWRpdGFibGUodGhpcyk7XG4gIHRoaXMubWFya0N1cnNvciA9IG51bGw7XG4gIHRoaXMuY3Vyc29yV3JhcHBlciA9IG51bGw7XG4gIHVwZGF0ZUN1cnNvcldyYXBwZXIodGhpcyk7XG4gIHRoaXMubm9kZVZpZXdzID0gYnVpbGROb2RlVmlld3ModGhpcyk7XG4gIHRoaXMuZG9jVmlldyA9IGRvY1ZpZXdEZXNjKHRoaXMuc3RhdGUuZG9jLCBjb21wdXRlRG9jRGVjbyh0aGlzKSwgdmlld0RlY29yYXRpb25zKHRoaXMpLCB0aGlzLmRvbSwgdGhpcyk7XG5cbiAgdGhpcy5sYXN0U2VsZWN0ZWRWaWV3RGVzYyA9IG51bGw7XG4gIC8vIDo6ID97c2xpY2U6IFNsaWNlLCBtb3ZlOiBib29sfVxuICAvLyBXaGVuIGVkaXRvciBjb250ZW50IGlzIGJlaW5nIGRyYWdnZWQsIHRoaXMgb2JqZWN0IGNvbnRhaW5zXG4gIC8vIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkcmFnZ2VkIHNsaWNlIGFuZCB3aGV0aGVyIGl0IGlzIGJlaW5nXG4gIC8vIGNvcGllZCBvciBtb3ZlZC4gQXQgYW55IG90aGVyIHRpbWUsIGl0IGlzIG51bGwuXG4gIHRoaXMuZHJhZ2dpbmcgPSBudWxsO1xuXG4gIGluaXRJbnB1dCh0aGlzKTtcblxuICB0aGlzLnBsdWdpblZpZXdzID0gW107XG4gIHRoaXMudXBkYXRlUGx1Z2luVmlld3MoKTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMiA9IHsgcHJvcHM6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0scm9vdDogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4vLyBjb21wb3Npbmc6OiBib29sZWFuXG4vLyBIb2xkcyBgdHJ1ZWAgd2hlbiBhXG4vLyBbY29tcG9zaXRpb25dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9JTUVfaGFuZGxpbmdfZ3VpZGUpXG4vLyBpcyBhY3RpdmUuXG5cbi8vIDo6IERpcmVjdEVkaXRvclByb3BzXG4vLyBUaGUgdmlldydzIGN1cnJlbnQgW3Byb3BzXSgjdmlldy5FZGl0b3JQcm9wcykuXG5wcm90b3R5cGVBY2Nlc3NvcnMkMi5wcm9wcy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9wcm9wcy5zdGF0ZSAhPSB0aGlzLnN0YXRlKSB7XG4gICAgdmFyIHByZXYgPSB0aGlzLl9wcm9wcztcbiAgICB0aGlzLl9wcm9wcyA9IHt9O1xuICAgIGZvciAodmFyIG5hbWUgaW4gcHJldikgeyB0aGlzLl9wcm9wc1tuYW1lXSA9IHByZXZbbmFtZV07IH1cbiAgICB0aGlzLl9wcm9wcy5zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX3Byb3BzXG59O1xuXG4vLyA6OiAoRGlyZWN0RWRpdG9yUHJvcHMpXG4vLyBVcGRhdGUgdGhlIHZpZXcncyBwcm9wcy4gV2lsbCBpbW1lZGlhdGVseSBjYXVzZSBhbiB1cGRhdGUgdG9cbi8vIHRoZSBET00uXG5FZGl0b3JWaWV3LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKHByb3BzKSB7XG4gIGlmIChwcm9wcy5oYW5kbGVET01FdmVudHMgIT0gdGhpcy5fcHJvcHMuaGFuZGxlRE9NRXZlbnRzKSB7IGVuc3VyZUxpc3RlbmVycyh0aGlzKTsgfVxuICB0aGlzLl9wcm9wcyA9IHByb3BzO1xuICB0aGlzLnVwZGF0ZVN0YXRlSW5uZXIocHJvcHMuc3RhdGUsIHRydWUpO1xufTtcblxuLy8gOjogKERpcmVjdEVkaXRvclByb3BzKVxuLy8gVXBkYXRlIHRoZSB2aWV3IGJ5IHVwZGF0aW5nIGV4aXN0aW5nIHByb3BzIG9iamVjdCB3aXRoIHRoZSBvYmplY3Rcbi8vIGdpdmVuIGFzIGFyZ3VtZW50LiBFcXVpdmFsZW50IHRvIGB2aWV3LnVwZGF0ZShPYmplY3QuYXNzaWduKHt9LFxuLy8gdmlldy5wcm9wcywgcHJvcHMpKWAuXG5FZGl0b3JWaWV3LnByb3RvdHlwZS5zZXRQcm9wcyA9IGZ1bmN0aW9uIHNldFByb3BzIChwcm9wcykge1xuICB2YXIgdXBkYXRlZCA9IHt9O1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMuX3Byb3BzKSB7IHVwZGF0ZWRbbmFtZV0gPSB0aGlzLl9wcm9wc1tuYW1lXTsgfVxuICB1cGRhdGVkLnN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgZm9yICh2YXIgbmFtZSQxIGluIHByb3BzKSB7IHVwZGF0ZWRbbmFtZSQxXSA9IHByb3BzW25hbWUkMV07IH1cbiAgdGhpcy51cGRhdGUodXBkYXRlZCk7XG59O1xuXG4vLyA6OiAoRWRpdG9yU3RhdGUpXG4vLyBVcGRhdGUgdGhlIGVkaXRvcidzIGBzdGF0ZWAgcHJvcCwgd2l0aG91dCB0b3VjaGluZyBhbnkgb2YgdGhlXG4vLyBvdGhlciBwcm9wcy5cbkVkaXRvclZpZXcucHJvdG90eXBlLnVwZGF0ZVN0YXRlID0gZnVuY3Rpb24gdXBkYXRlU3RhdGUgKHN0YXRlKSB7XG4gIHRoaXMudXBkYXRlU3RhdGVJbm5lcihzdGF0ZSwgdGhpcy5zdGF0ZS5wbHVnaW5zICE9IHN0YXRlLnBsdWdpbnMpO1xufTtcblxuRWRpdG9yVmlldy5wcm90b3R5cGUudXBkYXRlU3RhdGVJbm5lciA9IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlSW5uZXIgKHN0YXRlLCByZWNvbmZpZ3VyZWQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgcHJldiA9IHRoaXMuc3RhdGUsIHJlZHJhdyA9IGZhbHNlLCB1cGRhdGVTZWwgPSBmYWxzZTtcbiAgLy8gV2hlbiBzdG9yZWQgbWFya3MgYXJlIGFkZGVkLCBzdG9wIGNvbXBvc2l0aW9uLCBzbyB0aGF0IHRoZXkgY2FuXG4gIC8vIGJlIGRpc3BsYXllZC5cbiAgaWYgKHN0YXRlLnN0b3JlZE1hcmtzICYmIHRoaXMuY29tcG9zaW5nKSB7XG4gICAgY2xlYXJDb21wb3NpdGlvbih0aGlzKTtcbiAgICB1cGRhdGVTZWwgPSB0cnVlO1xuICB9XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgaWYgKHJlY29uZmlndXJlZCkge1xuICAgIHZhciBub2RlVmlld3MgPSBidWlsZE5vZGVWaWV3cyh0aGlzKTtcbiAgICBpZiAoY2hhbmdlZE5vZGVWaWV3cyhub2RlVmlld3MsIHRoaXMubm9kZVZpZXdzKSkge1xuICAgICAgdGhpcy5ub2RlVmlld3MgPSBub2RlVmlld3M7XG4gICAgICByZWRyYXcgPSB0cnVlO1xuICAgIH1cbiAgICBlbnN1cmVMaXN0ZW5lcnModGhpcyk7XG4gIH1cblxuICB0aGlzLmVkaXRhYmxlID0gZ2V0RWRpdGFibGUodGhpcyk7XG4gIHVwZGF0ZUN1cnNvcldyYXBwZXIodGhpcyk7XG4gIHZhciBpbm5lckRlY28gPSB2aWV3RGVjb3JhdGlvbnModGhpcyksIG91dGVyRGVjbyA9IGNvbXB1dGVEb2NEZWNvKHRoaXMpO1xuXG4gIHZhciBzY3JvbGwgPSByZWNvbmZpZ3VyZWQgPyBcInJlc2V0XCJcbiAgICAgIDogc3RhdGUuc2Nyb2xsVG9TZWxlY3Rpb24gPiBwcmV2LnNjcm9sbFRvU2VsZWN0aW9uID8gXCJ0byBzZWxlY3Rpb25cIiA6IFwicHJlc2VydmVcIjtcbiAgdmFyIHVwZGF0ZURvYyA9IHJlZHJhdyB8fCAhdGhpcy5kb2NWaWV3Lm1hdGNoZXNOb2RlKHN0YXRlLmRvYywgb3V0ZXJEZWNvLCBpbm5lckRlY28pO1xuICBpZiAodXBkYXRlRG9jIHx8ICFzdGF0ZS5zZWxlY3Rpb24uZXEocHJldi5zZWxlY3Rpb24pKSB7IHVwZGF0ZVNlbCA9IHRydWU7IH1cbiAgdmFyIG9sZFNjcm9sbFBvcyA9IHNjcm9sbCA9PSBcInByZXNlcnZlXCIgJiYgdXBkYXRlU2VsICYmIHRoaXMuZG9tLnN0eWxlLm92ZXJmbG93QW5jaG9yID09IG51bGwgJiYgc3RvcmVTY3JvbGxQb3ModGhpcyk7XG5cbiAgaWYgKHVwZGF0ZVNlbCkge1xuICAgIHRoaXMuZG9tT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIC8vIFdvcmsgYXJvdW5kIGFuIGlzc3VlIGluIENocm9tZSwgSUUsIGFuZCBFZGdlIHdoZXJlIGNoYW5naW5nXG4gICAgLy8gdGhlIERPTSBhcm91bmQgYW4gYWN0aXZlIHNlbGVjdGlvbiBwdXRzIGl0IGludG8gYSBicm9rZW5cbiAgICAvLyBzdGF0ZSB3aGVyZSB0aGUgdGhpbmcgdGhlIHVzZXIgc2VlcyBkaWZmZXJzIGZyb20gdGhlXG4gICAgLy8gc2VsZWN0aW9uIHJlcG9ydGVkIGJ5IHRoZSBTZWxlY3Rpb24gb2JqZWN0ICgjNzEwLCAjOTczLFxuICAgIC8vICMxMDExLCAjMTAxMywgIzEwMzUpLlxuICAgIHZhciBmb3JjZVNlbFVwZGF0ZSA9IHVwZGF0ZURvYyAmJiAocmVzdWx0LmllIHx8IHJlc3VsdC5jaHJvbWUpICYmICF0aGlzLmNvbXBvc2luZyAmJlxuICAgICAgICAhcHJldi5zZWxlY3Rpb24uZW1wdHkgJiYgIXN0YXRlLnNlbGVjdGlvbi5lbXB0eSAmJiBzZWxlY3Rpb25Db250ZXh0Q2hhbmdlZChwcmV2LnNlbGVjdGlvbiwgc3RhdGUuc2VsZWN0aW9uKTtcbiAgICBpZiAodXBkYXRlRG9jKSB7XG4gICAgICAvLyBJZiB0aGUgbm9kZSB0aGF0IHRoZSBzZWxlY3Rpb24gcG9pbnRzIGludG8gaXMgd3JpdHRlbiB0byxcbiAgICAgIC8vIENocm9tZSBzb21ldGltZXMgc3RhcnRzIG1pc3JlcG9ydGluZyB0aGUgc2VsZWN0aW9uLCBzbyB0aGlzXG4gICAgICAvLyB0cmFja3MgdGhhdCBhbmQgZm9yY2VzIGEgc2VsZWN0aW9uIHJlc2V0IHdoZW4gb3VyIHVwZGF0ZVxuICAgICAgLy8gZGlkIHdyaXRlIHRvIHRoZSBub2RlLlxuICAgICAgdmFyIGNocm9tZUtsdWRnZSA9IHJlc3VsdC5jaHJvbWUgPyAodGhpcy50cmFja1dyaXRlcyA9IHRoaXMucm9vdC5nZXRTZWxlY3Rpb24oKS5mb2N1c05vZGUpIDogbnVsbDtcbiAgICAgIGlmIChyZWRyYXcgfHwgIXRoaXMuZG9jVmlldy51cGRhdGUoc3RhdGUuZG9jLCBvdXRlckRlY28sIGlubmVyRGVjbywgdGhpcykpIHtcbiAgICAgICAgdGhpcy5kb2NWaWV3LnVwZGF0ZU91dGVyRGVjbyhbXSk7XG4gICAgICAgIHRoaXMuZG9jVmlldy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZG9jVmlldyA9IGRvY1ZpZXdEZXNjKHN0YXRlLmRvYywgb3V0ZXJEZWNvLCBpbm5lckRlY28sIHRoaXMuZG9tLCB0aGlzKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaHJvbWVLbHVkZ2UgJiYgIXRoaXMudHJhY2tXcml0ZXMpIHsgZm9yY2VTZWxVcGRhdGUgPSB0cnVlOyB9XG4gICAgfVxuICAgIC8vIFdvcmsgYXJvdW5kIGZvciBhbiBpc3N1ZSB3aGVyZSBhbiB1cGRhdGUgYXJyaXZpbmcgcmlnaHQgYmV0d2VlblxuICAgIC8vIGEgRE9NIHNlbGVjdGlvbiBjaGFuZ2UgYW5kIHRoZSBcInNlbGVjdGlvbmNoYW5nZVwiIGV2ZW50IGZvciBpdFxuICAgIC8vIGNhbiBjYXVzZSBhIHNwdXJpb3VzIERPTSBzZWxlY3Rpb24gdXBkYXRlLCBkaXNydXB0aW5nIG1vdXNlXG4gICAgLy8gZHJhZyBzZWxlY3Rpb24uXG4gICAgaWYgKGZvcmNlU2VsVXBkYXRlIHx8XG4gICAgICAgICEodGhpcy5tb3VzZURvd24gJiYgdGhpcy5kb21PYnNlcnZlci5jdXJyZW50U2VsZWN0aW9uLmVxKHRoaXMucm9vdC5nZXRTZWxlY3Rpb24oKSkgJiYgYW5jaG9ySW5SaWdodFBsYWNlKHRoaXMpKSkge1xuICAgICAgc2VsZWN0aW9uVG9ET00odGhpcywgZm9yY2VTZWxVcGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jTm9kZVNlbGVjdGlvbih0aGlzLCBzdGF0ZS5zZWxlY3Rpb24pO1xuICAgICAgdGhpcy5kb21PYnNlcnZlci5zZXRDdXJTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5kb21PYnNlcnZlci5zdGFydCgpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVQbHVnaW5WaWV3cyhwcmV2KTtcblxuICBpZiAoc2Nyb2xsID09IFwicmVzZXRcIikge1xuICAgIHRoaXMuZG9tLnNjcm9sbFRvcCA9IDA7XG4gIH0gZWxzZSBpZiAoc2Nyb2xsID09IFwidG8gc2VsZWN0aW9uXCIpIHtcbiAgICB2YXIgc3RhcnRET00gPSB0aGlzLnJvb3QuZ2V0U2VsZWN0aW9uKCkuZm9jdXNOb2RlO1xuICAgIGlmICh0aGlzLnNvbWVQcm9wKFwiaGFuZGxlU2Nyb2xsVG9TZWxlY3Rpb25cIiwgZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYodGhpcyQxKTsgfSkpXG4gICAgICA7IC8vIEhhbmRsZWRcbiAgICBlbHNlIGlmIChzdGF0ZS5zZWxlY3Rpb24gaW5zdGFuY2VvZiBOb2RlU2VsZWN0aW9uKVxuICAgICAgeyBzY3JvbGxSZWN0SW50b1ZpZXcodGhpcywgdGhpcy5kb2NWaWV3LmRvbUFmdGVyUG9zKHN0YXRlLnNlbGVjdGlvbi5mcm9tKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgc3RhcnRET00pOyB9XG4gICAgZWxzZVxuICAgICAgeyBzY3JvbGxSZWN0SW50b1ZpZXcodGhpcywgdGhpcy5jb29yZHNBdFBvcyhzdGF0ZS5zZWxlY3Rpb24uaGVhZCwgMSksIHN0YXJ0RE9NKTsgfVxuICB9IGVsc2UgaWYgKG9sZFNjcm9sbFBvcykge1xuICAgIHJlc2V0U2Nyb2xsUG9zKG9sZFNjcm9sbFBvcyk7XG4gIH1cbn07XG5cbkVkaXRvclZpZXcucHJvdG90eXBlLmRlc3Ryb3lQbHVnaW5WaWV3cyA9IGZ1bmN0aW9uIGRlc3Ryb3lQbHVnaW5WaWV3cyAoKSB7XG4gIHZhciB2aWV3O1xuICB3aGlsZSAodmlldyA9IHRoaXMucGx1Z2luVmlld3MucG9wKCkpIHsgaWYgKHZpZXcuZGVzdHJveSkgeyB2aWV3LmRlc3Ryb3koKTsgfSB9XG59O1xuXG5FZGl0b3JWaWV3LnByb3RvdHlwZS51cGRhdGVQbHVnaW5WaWV3cyA9IGZ1bmN0aW9uIHVwZGF0ZVBsdWdpblZpZXdzIChwcmV2U3RhdGUpIHtcbiAgaWYgKCFwcmV2U3RhdGUgfHwgcHJldlN0YXRlLnBsdWdpbnMgIT0gdGhpcy5zdGF0ZS5wbHVnaW5zKSB7XG4gICAgdGhpcy5kZXN0cm95UGx1Z2luVmlld3MoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUucGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBsdWdpbiA9IHRoaXMuc3RhdGUucGx1Z2luc1tpXTtcbiAgICAgIGlmIChwbHVnaW4uc3BlYy52aWV3KSB7IHRoaXMucGx1Z2luVmlld3MucHVzaChwbHVnaW4uc3BlYy52aWV3KHRoaXMpKTsgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCB0aGlzLnBsdWdpblZpZXdzLmxlbmd0aDsgaSQxKyspIHtcbiAgICAgIHZhciBwbHVnaW5WaWV3ID0gdGhpcy5wbHVnaW5WaWV3c1tpJDFdO1xuICAgICAgaWYgKHBsdWdpblZpZXcudXBkYXRlKSB7IHBsdWdpblZpZXcudXBkYXRlKHRoaXMsIHByZXZTdGF0ZSk7IH1cbiAgICB9XG4gIH1cbn07XG5cbi8vIDo6IChzdHJpbmcsID8ocHJvcDogKikg4oaSICopIOKGkiAqXG4vLyBHb2VzIG92ZXIgdGhlIHZhbHVlcyBvZiBhIHByb3AsIGZpcnN0IHRob3NlIHByb3ZpZGVkIGRpcmVjdGx5LFxuLy8gdGhlbiB0aG9zZSBmcm9tIHBsdWdpbnMgKGluIG9yZGVyKSwgYW5kIGNhbGxzIGBmYCBldmVyeSB0aW1lIGFcbi8vIG5vbi11bmRlZmluZWQgdmFsdWUgaXMgZm91bmQuIFdoZW4gYGZgIHJldHVybnMgYSB0cnV0aHkgdmFsdWUsXG4vLyB0aGF0IGlzIGltbWVkaWF0ZWx5IHJldHVybmVkLiBXaGVuIGBmYCBpc24ndCBwcm92aWRlZCwgaXQgaXNcbi8vIHRyZWF0ZWQgYXMgdGhlIGlkZW50aXR5IGZ1bmN0aW9uICh0aGUgcHJvcCB2YWx1ZSBpcyByZXR1cm5lZFxuLy8gZGlyZWN0bHkpLlxuRWRpdG9yVmlldy5wcm90b3R5cGUuc29tZVByb3AgPSBmdW5jdGlvbiBzb21lUHJvcCAocHJvcE5hbWUsIGYpIHtcbiAgdmFyIHByb3AgPSB0aGlzLl9wcm9wcyAmJiB0aGlzLl9wcm9wc1twcm9wTmFtZV0sIHZhbHVlO1xuICBpZiAocHJvcCAhPSBudWxsICYmICh2YWx1ZSA9IGYgPyBmKHByb3ApIDogcHJvcCkpIHsgcmV0dXJuIHZhbHVlIH1cbiAgdmFyIHBsdWdpbnMgPSB0aGlzLnN0YXRlLnBsdWdpbnM7XG4gIGlmIChwbHVnaW5zKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwcm9wJDEgPSBwbHVnaW5zW2ldLnByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAocHJvcCQxICE9IG51bGwgJiYgKHZhbHVlID0gZiA/IGYocHJvcCQxKSA6IHByb3AkMSkpIHsgcmV0dXJuIHZhbHVlIH1cbiAgfSB9XG59O1xuXG4vLyA6OiAoKSDihpIgYm9vbFxuLy8gUXVlcnkgd2hldGhlciB0aGUgdmlldyBoYXMgZm9jdXMuXG5FZGl0b3JWaWV3LnByb3RvdHlwZS5oYXNGb2N1cyA9IGZ1bmN0aW9uIGhhc0ZvY3VzICgpIHtcbiAgcmV0dXJuIHRoaXMucm9vdC5hY3RpdmVFbGVtZW50ID09IHRoaXMuZG9tXG59O1xuXG4vLyA6OiAoKVxuLy8gRm9jdXMgdGhlIGVkaXRvci5cbkVkaXRvclZpZXcucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24gZm9jdXMgKCkge1xuICB0aGlzLmRvbU9ic2VydmVyLnN0b3AoKTtcbiAgaWYgKHRoaXMuZWRpdGFibGUpIHsgZm9jdXNQcmV2ZW50U2Nyb2xsKHRoaXMuZG9tKTsgfVxuICBzZWxlY3Rpb25Ub0RPTSh0aGlzKTtcbiAgdGhpcy5kb21PYnNlcnZlci5zdGFydCgpO1xufTtcblxuLy8gOjogdW5pb248ZG9tLkRvY3VtZW50LCBkb20uRG9jdW1lbnRGcmFnbWVudD5cbi8vIEdldCB0aGUgZG9jdW1lbnQgcm9vdCBpbiB3aGljaCB0aGUgZWRpdG9yIGV4aXN0cy4gVGhpcyB3aWxsXG4vLyB1c3VhbGx5IGJlIHRoZSB0b3AtbGV2ZWwgYGRvY3VtZW50YCwgYnV0IG1pZ2h0IGJlIGEgW3NoYWRvd1xuLy8gRE9NXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9XZWJfQ29tcG9uZW50cy9TaGFkb3dfRE9NKVxuLy8gcm9vdCBpZiB0aGUgZWRpdG9yIGlzIGluc2lkZSBvbmUuXG5wcm90b3R5cGVBY2Nlc3NvcnMkMi5yb290LmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNhY2hlZCA9IHRoaXMuX3Jvb3Q7XG4gIGlmIChjYWNoZWQgPT0gbnVsbCkgeyBmb3IgKHZhciBzZWFyY2ggPSB0aGlzLmRvbS5wYXJlbnROb2RlOyBzZWFyY2g7IHNlYXJjaCA9IHNlYXJjaC5wYXJlbnROb2RlKSB7XG4gICAgaWYgKHNlYXJjaC5ub2RlVHlwZSA9PSA5IHx8IChzZWFyY2gubm9kZVR5cGUgPT0gMTEgJiYgc2VhcmNoLmhvc3QpKSB7XG4gICAgICBpZiAoIXNlYXJjaC5nZXRTZWxlY3Rpb24pIHsgT2JqZWN0LmdldFByb3RvdHlwZU9mKHNlYXJjaCkuZ2V0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7IH07IH1cbiAgICAgIHJldHVybiB0aGlzLl9yb290ID0gc2VhcmNoXG4gICAgfVxuICB9IH1cbiAgcmV0dXJuIGNhY2hlZCB8fCBkb2N1bWVudFxufTtcblxuLy8gOjogKHtsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfSkg4oaSID97cG9zOiBudW1iZXIsIGluc2lkZTogbnVtYmVyfVxuLy8gR2l2ZW4gYSBwYWlyIG9mIHZpZXdwb3J0IGNvb3JkaW5hdGVzLCByZXR1cm4gdGhlIGRvY3VtZW50XG4vLyBwb3NpdGlvbiB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZW0uIE1heSByZXR1cm4gbnVsbCBpZiB0aGUgZ2l2ZW5cbi8vIGNvb3JkaW5hdGVzIGFyZW4ndCBpbnNpZGUgb2YgdGhlIGVkaXRvci4gV2hlbiBhbiBvYmplY3QgaXNcbi8vIHJldHVybmVkLCBpdHMgYHBvc2AgcHJvcGVydHkgaXMgdGhlIHBvc2l0aW9uIG5lYXJlc3QgdG8gdGhlXG4vLyBjb29yZGluYXRlcywgYW5kIGl0cyBgaW5zaWRlYCBwcm9wZXJ0eSBob2xkcyB0aGUgcG9zaXRpb24gb2YgdGhlXG4vLyBpbm5lciBub2RlIHRoYXQgdGhlIHBvc2l0aW9uIGZhbGxzIGluc2lkZSBvZiwgb3IgLTEgaWYgaXQgaXMgYXRcbi8vIHRoZSB0b3AgbGV2ZWwsIG5vdCBpbiBhbnkgbm9kZS5cbkVkaXRvclZpZXcucHJvdG90eXBlLnBvc0F0Q29vcmRzID0gZnVuY3Rpb24gcG9zQXRDb29yZHMkMSAoY29vcmRzKSB7XG4gIHJldHVybiBwb3NBdENvb3Jkcyh0aGlzLCBjb29yZHMpXG59O1xuXG4vLyA6OiAobnVtYmVyLCBudW1iZXIpIOKGkiB7bGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXJ9XG4vLyBSZXR1cm5zIHRoZSB2aWV3cG9ydCByZWN0YW5nbGUgYXQgYSBnaXZlbiBkb2N1bWVudCBwb3NpdGlvbi5cbi8vIGBsZWZ0YCBhbmQgYHJpZ2h0YCB3aWxsIGJlIHRoZSBzYW1lIG51bWJlciwgYXMgdGhpcyByZXR1cm5zIGFcbi8vIGZsYXQgY3Vyc29yLWlzaCByZWN0YW5nbGUuIElmIHRoZSBwb3NpdGlvbiBpcyBiZXR3ZWVuIHR3byB0aGluZ3Ncbi8vIHRoYXQgYXJlbid0IGRpcmVjdGx5IGFkamFjZW50LCBgc2lkZWAgZGV0ZXJtaW5lcyB3aGljaCBlbGVtZW50IGlzXG4vLyB1c2VkLiBXaGVuIDwgMCwgdGhlIGVsZW1lbnQgYmVmb3JlIHRoZSBwb3NpdGlvbiBpcyB1c2VkLFxuLy8gb3RoZXJ3aXNlIHRoZSBlbGVtZW50IGFmdGVyLlxuRWRpdG9yVmlldy5wcm90b3R5cGUuY29vcmRzQXRQb3MgPSBmdW5jdGlvbiBjb29yZHNBdFBvcyQxIChwb3MsIHNpZGUpIHtcbiAgICBpZiAoIHNpZGUgPT09IHZvaWQgMCApIHNpZGUgPSAxO1xuXG4gIHJldHVybiBjb29yZHNBdFBvcyh0aGlzLCBwb3MsIHNpZGUpXG59O1xuXG4vLyA6OiAobnVtYmVyLCBudW1iZXIpIOKGkiB7bm9kZTogZG9tLk5vZGUsIG9mZnNldDogbnVtYmVyfVxuLy8gRmluZCB0aGUgRE9NIHBvc2l0aW9uIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGdpdmVuIGRvY3VtZW50XG4vLyBwb3NpdGlvbi4gV2hlbiBgc2lkZWAgaXMgbmVnYXRpdmUsIGZpbmQgdGhlIHBvc2l0aW9uIGFzIGNsb3NlIGFzXG4vLyBwb3NzaWJsZSB0byB0aGUgY29udGVudCBiZWZvcmUgdGhlIHBvc2l0aW9uLiBXaGVuIHBvc2l0aXZlLFxuLy8gcHJlZmVyIHBvc2l0aW9ucyBjbG9zZSB0byB0aGUgY29udGVudCBhZnRlciB0aGUgcG9zaXRpb24uIFdoZW5cbi8vIHplcm8sIHByZWZlciBhcyBzaGFsbG93IGEgcG9zaXRpb24gYXMgcG9zc2libGUuXG4vL1xuLy8gTm90ZSB0aGF0IHlvdSBzaG91bGQgKipub3QqKiBtdXRhdGUgdGhlIGVkaXRvcidzIGludGVybmFsIERPTSxcbi8vIG9ubHkgaW5zcGVjdCBpdCAoYW5kIGV2ZW4gdGhhdCBpcyB1c3VhbGx5IG5vdCBuZWNlc3NhcnkpLlxuRWRpdG9yVmlldy5wcm90b3R5cGUuZG9tQXRQb3MgPSBmdW5jdGlvbiBkb21BdFBvcyAocG9zLCBzaWRlKSB7XG4gICAgaWYgKCBzaWRlID09PSB2b2lkIDAgKSBzaWRlID0gMDtcblxuICByZXR1cm4gdGhpcy5kb2NWaWV3LmRvbUZyb21Qb3MocG9zLCBzaWRlKVxufTtcblxuLy8gOjogKG51bWJlcikg4oaSID9kb20uTm9kZVxuLy8gRmluZCB0aGUgRE9NIG5vZGUgdGhhdCByZXByZXNlbnRzIHRoZSBkb2N1bWVudCBub2RlIGFmdGVyIHRoZVxuLy8gZ2l2ZW4gcG9zaXRpb24uIE1heSByZXR1cm4gYG51bGxgIHdoZW4gdGhlIHBvc2l0aW9uIGRvZXNuJ3QgcG9pbnRcbi8vIGluIGZyb250IG9mIGEgbm9kZSBvciBpZiB0aGUgbm9kZSBpcyBpbnNpZGUgYW4gb3BhcXVlIG5vZGUgdmlldy5cbi8vXG4vLyBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGFibGUgdG8gY2FsbCB0aGluZ3MgbGlrZVxuLy8gYGdldEJvdW5kaW5nQ2xpZW50UmVjdGAgb24gdGhhdCBET00gbm9kZS4gRG8gKipub3QqKiBtdXRhdGUgdGhlXG4vLyBlZGl0b3IgRE9NIGRpcmVjdGx5LCBvciBhZGQgc3R5bGluZyB0aGlzIHdheSwgc2luY2UgdGhhdCB3aWxsIGJlXG4vLyBpbW1lZGlhdGVseSBvdmVycmlkZW4gYnkgdGhlIGVkaXRvciBhcyBpdCByZWRyYXdzIHRoZSBub2RlLlxuRWRpdG9yVmlldy5wcm90b3R5cGUubm9kZURPTSA9IGZ1bmN0aW9uIG5vZGVET00gKHBvcykge1xuICB2YXIgZGVzYyA9IHRoaXMuZG9jVmlldy5kZXNjQXQocG9zKTtcbiAgcmV0dXJuIGRlc2MgPyBkZXNjLm5vZGVET00gOiBudWxsXG59O1xuXG4vLyA6OiAoZG9tLk5vZGUsIG51bWJlciwgP251bWJlcikg4oaSIG51bWJlclxuLy8gRmluZCB0aGUgZG9jdW1lbnQgcG9zaXRpb24gdGhhdCBjb3JyZXNwb25kcyB0byBhIGdpdmVuIERPTVxuLy8gcG9zaXRpb24uIChXaGVuZXZlciBwb3NzaWJsZSwgaXQgaXMgcHJlZmVyYWJsZSB0byBpbnNwZWN0IHRoZVxuLy8gZG9jdW1lbnQgc3RydWN0dXJlIGRpcmVjdGx5LCByYXRoZXIgdGhhbiBwb2tpbmcgYXJvdW5kIGluIHRoZVxuLy8gRE9NLCBidXQgc29tZXRpbWVz4oCUZm9yIGV4YW1wbGUgd2hlbiBpbnRlcnByZXRpbmcgYW4gZXZlbnRcbi8vIHRhcmdldOKAlHlvdSBkb24ndCBoYXZlIGEgY2hvaWNlLilcbi8vXG4vLyBUaGUgYGJpYXNgIHBhcmFtZXRlciBjYW4gYmUgdXNlZCB0byBpbmZsdWVuY2Ugd2hpY2ggc2lkZSBvZiBhIERPTVxuLy8gbm9kZSB0byB1c2Ugd2hlbiB0aGUgcG9zaXRpb24gaXMgaW5zaWRlIGEgbGVhZiBub2RlLlxuRWRpdG9yVmlldy5wcm90b3R5cGUucG9zQXRET00gPSBmdW5jdGlvbiBwb3NBdERPTSAobm9kZSwgb2Zmc2V0LCBiaWFzKSB7XG4gICAgaWYgKCBiaWFzID09PSB2b2lkIDAgKSBiaWFzID0gLTE7XG5cbiAgdmFyIHBvcyA9IHRoaXMuZG9jVmlldy5wb3NGcm9tRE9NKG5vZGUsIG9mZnNldCwgYmlhcyk7XG4gIGlmIChwb3MgPT0gbnVsbCkgeyB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkRPTSBwb3NpdGlvbiBub3QgaW5zaWRlIHRoZSBlZGl0b3JcIikgfVxuICByZXR1cm4gcG9zXG59O1xuXG4vLyA6OiAodW5pb248XCJ1cFwiLCBcImRvd25cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJmb3J3YXJkXCIsIFwiYmFja3dhcmRcIj4sID9FZGl0b3JTdGF0ZSkg4oaSIGJvb2xcbi8vIEZpbmQgb3V0IHdoZXRoZXIgdGhlIHNlbGVjdGlvbiBpcyBhdCB0aGUgZW5kIG9mIGEgdGV4dGJsb2NrIHdoZW5cbi8vIG1vdmluZyBpbiBhIGdpdmVuIGRpcmVjdGlvbi4gV2hlbiwgZm9yIGV4YW1wbGUsIGdpdmVuIGBcImxlZnRcImAsXG4vLyBpdCB3aWxsIHJldHVybiB0cnVlIGlmIG1vdmluZyBsZWZ0IGZyb20gdGhlIGN1cnJlbnQgY3Vyc29yXG4vLyBwb3NpdGlvbiB3b3VsZCBsZWF2ZSB0aGF0IHBvc2l0aW9uJ3MgcGFyZW50IHRleHRibG9jay4gV2lsbCBhcHBseVxuLy8gdG8gdGhlIHZpZXcncyBjdXJyZW50IHN0YXRlIGJ5IGRlZmF1bHQsIGJ1dCBpdCBpcyBwb3NzaWJsZSB0b1xuLy8gcGFzcyBhIGRpZmZlcmVudCBzdGF0ZS5cbkVkaXRvclZpZXcucHJvdG90eXBlLmVuZE9mVGV4dGJsb2NrID0gZnVuY3Rpb24gZW5kT2ZUZXh0YmxvY2skMSAoZGlyLCBzdGF0ZSkge1xuICByZXR1cm4gZW5kT2ZUZXh0YmxvY2sodGhpcywgc3RhdGUgfHwgdGhpcy5zdGF0ZSwgZGlyKVxufTtcblxuLy8gOjogKClcbi8vIFJlbW92ZXMgdGhlIGVkaXRvciBmcm9tIHRoZSBET00gYW5kIGRlc3Ryb3lzIGFsbCBbbm9kZVxuLy8gdmlld3NdKCN2aWV3Lk5vZGVWaWV3KS5cbkVkaXRvclZpZXcucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgaWYgKCF0aGlzLmRvY1ZpZXcpIHsgcmV0dXJuIH1cbiAgZGVzdHJveUlucHV0KHRoaXMpO1xuICB0aGlzLmRlc3Ryb3lQbHVnaW5WaWV3cygpO1xuICBpZiAodGhpcy5tb3VudGVkKSB7XG4gICAgdGhpcy5kb2NWaWV3LnVwZGF0ZSh0aGlzLnN0YXRlLmRvYywgW10sIHZpZXdEZWNvcmF0aW9ucyh0aGlzKSwgdGhpcyk7XG4gICAgdGhpcy5kb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICB9IGVsc2UgaWYgKHRoaXMuZG9tLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG9tKTtcbiAgfVxuICB0aGlzLmRvY1ZpZXcuZGVzdHJveSgpO1xuICB0aGlzLmRvY1ZpZXcgPSBudWxsO1xufTtcblxuLy8gVXNlZCBmb3IgdGVzdGluZy5cbkVkaXRvclZpZXcucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50JDEgKGV2ZW50KSB7XG4gIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIGV2ZW50KVxufTtcblxuLy8gOjogKFRyYW5zYWN0aW9uKVxuLy8gRGlzcGF0Y2ggYSB0cmFuc2FjdGlvbi4gV2lsbCBjYWxsXG4vLyBbYGRpc3BhdGNoVHJhbnNhY3Rpb25gXSgjdmlldy5EaXJlY3RFZGl0b3JQcm9wcy5kaXNwYXRjaFRyYW5zYWN0aW9uKVxuLy8gd2hlbiBnaXZlbiwgYW5kIG90aGVyd2lzZSBkZWZhdWx0cyB0byBhcHBseWluZyB0aGUgdHJhbnNhY3Rpb24gdG9cbi8vIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBjYWxsaW5nXG4vLyBbYHVwZGF0ZVN0YXRlYF0oI3ZpZXcuRWRpdG9yVmlldy51cGRhdGVTdGF0ZSkgd2l0aCB0aGUgcmVzdWx0LlxuLy8gVGhpcyBtZXRob2QgaXMgYm91bmQgdG8gdGhlIHZpZXcgaW5zdGFuY2UsIHNvIHRoYXQgaXQgY2FuIGJlXG4vLyBlYXNpbHkgcGFzc2VkIGFyb3VuZC5cbkVkaXRvclZpZXcucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2ggKHRyKSB7XG4gIHZhciBkaXNwYXRjaFRyYW5zYWN0aW9uID0gdGhpcy5fcHJvcHMuZGlzcGF0Y2hUcmFuc2FjdGlvbjtcbiAgaWYgKGRpc3BhdGNoVHJhbnNhY3Rpb24pIHsgZGlzcGF0Y2hUcmFuc2FjdGlvbi5jYWxsKHRoaXMsIHRyKTsgfVxuICBlbHNlIHsgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlLmFwcGx5KHRyKSk7IH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBFZGl0b3JWaWV3LnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzJDIgKTtcblxuZnVuY3Rpb24gY29tcHV0ZURvY0RlY28odmlldykge1xuICB2YXIgYXR0cnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBhdHRycy5jbGFzcyA9IFwiUHJvc2VNaXJyb3JcIjtcbiAgYXR0cnMuY29udGVudGVkaXRhYmxlID0gU3RyaW5nKHZpZXcuZWRpdGFibGUpO1xuXG4gIHZpZXcuc29tZVByb3AoXCJhdHRyaWJ1dGVzXCIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJmdW5jdGlvblwiKSB7IHZhbHVlID0gdmFsdWUodmlldy5zdGF0ZSk7IH1cbiAgICBpZiAodmFsdWUpIHsgZm9yICh2YXIgYXR0ciBpbiB2YWx1ZSkge1xuICAgICAgaWYgKGF0dHIgPT0gXCJjbGFzc1wiKVxuICAgICAgICB7IGF0dHJzLmNsYXNzICs9IFwiIFwiICsgdmFsdWVbYXR0cl07IH1cbiAgICAgIGVsc2UgaWYgKCFhdHRyc1thdHRyXSAmJiBhdHRyICE9IFwiY29udGVudGVkaXRhYmxlXCIgJiYgYXR0ciAhPSBcIm5vZGVOYW1lXCIpXG4gICAgICAgIHsgYXR0cnNbYXR0cl0gPSBTdHJpbmcodmFsdWVbYXR0cl0pOyB9XG4gICAgfSB9XG4gIH0pO1xuXG4gIHJldHVybiBbRGVjb3JhdGlvbi5ub2RlKDAsIHZpZXcuc3RhdGUuZG9jLmNvbnRlbnQuc2l6ZSwgYXR0cnMpXVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDdXJzb3JXcmFwcGVyKHZpZXcpIHtcbiAgaWYgKHZpZXcubWFya0N1cnNvcikge1xuICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRvbS5zZXRBdHRyaWJ1dGUoXCJtYXJrLXBsYWNlaG9sZGVyXCIsIFwidHJ1ZVwiKTtcbiAgICB2aWV3LmN1cnNvcldyYXBwZXIgPSB7ZG9tOiBkb20sIGRlY286IERlY29yYXRpb24ud2lkZ2V0KHZpZXcuc3RhdGUuc2VsZWN0aW9uLmhlYWQsIGRvbSwge3JhdzogdHJ1ZSwgbWFya3M6IHZpZXcubWFya0N1cnNvcn0pfTtcbiAgfSBlbHNlIHtcbiAgICB2aWV3LmN1cnNvcldyYXBwZXIgPSBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVkaXRhYmxlKHZpZXcpIHtcbiAgcmV0dXJuICF2aWV3LnNvbWVQcm9wKFwiZWRpdGFibGVcIiwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZSh2aWV3LnN0YXRlKSA9PT0gZmFsc2U7IH0pXG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbkNvbnRleHRDaGFuZ2VkKHNlbDEsIHNlbDIpIHtcbiAgdmFyIGRlcHRoID0gTWF0aC5taW4oc2VsMS4kYW5jaG9yLnNoYXJlZERlcHRoKHNlbDEuaGVhZCksIHNlbDIuJGFuY2hvci5zaGFyZWREZXB0aChzZWwyLmhlYWQpKTtcbiAgcmV0dXJuIHNlbDEuJGFuY2hvci5zdGFydChkZXB0aCkgIT0gc2VsMi4kYW5jaG9yLnN0YXJ0KGRlcHRoKVxufVxuXG5mdW5jdGlvbiBidWlsZE5vZGVWaWV3cyh2aWV3KSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmlldy5zb21lUHJvcChcIm5vZGVWaWV3c1wiLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0LCBwcm9wKSlcbiAgICAgIHsgcmVzdWx0W3Byb3BdID0gb2JqW3Byb3BdOyB9IH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gY2hhbmdlZE5vZGVWaWV3cyhhLCBiKSB7XG4gIHZhciBuQSA9IDAsIG5CID0gMDtcbiAgZm9yICh2YXIgcHJvcCBpbiBhKSB7XG4gICAgaWYgKGFbcHJvcF0gIT0gYltwcm9wXSkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgbkErKztcbiAgfVxuICBmb3IgKHZhciBfIGluIGIpIHsgbkIrKzsgfVxuICByZXR1cm4gbkEgIT0gbkJcbn1cblxuLy8gRWRpdG9yUHJvcHM6OiBpbnRlcmZhY2Vcbi8vXG4vLyBQcm9wcyBhcmUgY29uZmlndXJhdGlvbiB2YWx1ZXMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGFuIGVkaXRvciB2aWV3XG4vLyBvciBpbmNsdWRlZCBpbiBhIHBsdWdpbi4gVGhpcyBpbnRlcmZhY2UgbGlzdHMgdGhlIHN1cHBvcnRlZCBwcm9wcy5cbi8vXG4vLyBUaGUgdmFyaW91cyBldmVudC1oYW5kbGluZyBmdW5jdGlvbnMgbWF5IGFsbCByZXR1cm4gYHRydWVgIHRvXG4vLyBpbmRpY2F0ZSB0aGF0IHRoZXkgaGFuZGxlZCB0aGUgZ2l2ZW4gZXZlbnQuIFRoZSB2aWV3IHdpbGwgdGhlbiB0YWtlXG4vLyBjYXJlIHRvIGNhbGwgYHByZXZlbnREZWZhdWx0YCBvbiB0aGUgZXZlbnQsIGV4Y2VwdCB3aXRoXG4vLyBgaGFuZGxlRE9NRXZlbnRzYCwgd2hlcmUgdGhlIGhhbmRsZXIgaXRzZWxmIGlzIHJlc3BvbnNpYmxlIGZvciB0aGF0LlxuLy9cbi8vIEhvdyBhIHByb3AgaXMgcmVzb2x2ZWQgZGVwZW5kcyBvbiB0aGUgcHJvcC4gSGFuZGxlciBmdW5jdGlvbnMgYXJlXG4vLyBjYWxsZWQgb25lIGF0IGEgdGltZSwgc3RhcnRpbmcgd2l0aCB0aGUgYmFzZSBwcm9wcyBhbmQgdGhlblxuLy8gc2VhcmNoaW5nIHRocm91Z2ggdGhlIHBsdWdpbnMgKGluIG9yZGVyIG9mIGFwcGVhcmFuY2UpIHVudGlsIG9uZSBvZlxuLy8gdGhlbSByZXR1cm5zIHRydWUuIEZvciBzb21lIHByb3BzLCB0aGUgZmlyc3QgcGx1Z2luIHRoYXQgeWllbGRzIGFcbi8vIHZhbHVlIGdldHMgcHJlY2VkZW5jZS5cbi8vXG4vLyAgIGhhbmRsZURPTUV2ZW50czo6ID9PYmplY3Q8KHZpZXc6IEVkaXRvclZpZXcsIGV2ZW50OiBkb20uRXZlbnQpIOKGkiBib29sPlxuLy8gICBDYW4gYmUgYW4gb2JqZWN0IG1hcHBpbmcgRE9NIGV2ZW50IHR5cGUgbmFtZXMgdG8gZnVuY3Rpb25zIHRoYXRcbi8vICAgaGFuZGxlIHRoZW0uIFN1Y2ggZnVuY3Rpb25zIHdpbGwgYmUgY2FsbGVkIGJlZm9yZSBhbnkgaGFuZGxpbmdcbi8vICAgUHJvc2VNaXJyb3IgZG9lcyBvZiBldmVudHMgZmlyZWQgb24gdGhlIGVkaXRhYmxlIERPTSBlbGVtZW50LlxuLy8gICBDb250cmFyeSB0byB0aGUgb3RoZXIgZXZlbnQgaGFuZGxpbmcgcHJvcHMsIHdoZW4gcmV0dXJuaW5nIHRydWVcbi8vICAgZnJvbSBzdWNoIGEgZnVuY3Rpb24sIHlvdSBhcmUgcmVzcG9uc2libGUgZm9yIGNhbGxpbmdcbi8vICAgYHByZXZlbnREZWZhdWx0YCB5b3Vyc2VsZiAob3Igbm90LCBpZiB5b3Ugd2FudCB0byBhbGxvdyB0aGVcbi8vICAgZGVmYXVsdCBiZWhhdmlvcikuXG4vL1xuLy8gICBoYW5kbGVLZXlEb3duOjogPyh2aWV3OiBFZGl0b3JWaWV3LCBldmVudDogZG9tLktleWJvYXJkRXZlbnQpIOKGkiBib29sXG4vLyAgIENhbGxlZCB3aGVuIHRoZSBlZGl0b3IgcmVjZWl2ZXMgYSBga2V5ZG93bmAgZXZlbnQuXG4vL1xuLy8gICBoYW5kbGVLZXlQcmVzczo6ID8odmlldzogRWRpdG9yVmlldywgZXZlbnQ6IGRvbS5LZXlib2FyZEV2ZW50KSDihpIgYm9vbFxuLy8gICBIYW5kbGVyIGZvciBga2V5cHJlc3NgIGV2ZW50cy5cbi8vXG4vLyAgIGhhbmRsZVRleHRJbnB1dDo6ID8odmlldzogRWRpdG9yVmlldywgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpIOKGkiBib29sXG4vLyAgIFdoZW5ldmVyIHRoZSB1c2VyIGRpcmVjdGx5IGlucHV0IHRleHQsIHRoaXMgaGFuZGxlciBpcyBjYWxsZWRcbi8vICAgYmVmb3JlIHRoZSBpbnB1dCBpcyBhcHBsaWVkLiBJZiBpdCByZXR1cm5zIGB0cnVlYCwgdGhlIGRlZmF1bHRcbi8vICAgYmVoYXZpb3Igb2YgYWN0dWFsbHkgaW5zZXJ0aW5nIHRoZSB0ZXh0IGlzIHN1cHByZXNzZWQuXG4vL1xuLy8gICBoYW5kbGVDbGlja09uOjogPyh2aWV3OiBFZGl0b3JWaWV3LCBwb3M6IG51bWJlciwgbm9kZTogTm9kZSwgbm9kZVBvczogbnVtYmVyLCBldmVudDogZG9tLk1vdXNlRXZlbnQsIGRpcmVjdDogYm9vbCkg4oaSIGJvb2xcbi8vICAgQ2FsbGVkIGZvciBlYWNoIG5vZGUgYXJvdW5kIGEgY2xpY2ssIGZyb20gdGhlIGluc2lkZSBvdXQuIFRoZVxuLy8gICBgZGlyZWN0YCBmbGFnIHdpbGwgYmUgdHJ1ZSBmb3IgdGhlIGlubmVyIG5vZGUuXG4vL1xuLy8gICBoYW5kbGVDbGljazo6ID8odmlldzogRWRpdG9yVmlldywgcG9zOiBudW1iZXIsIGV2ZW50OiBkb20uTW91c2VFdmVudCkg4oaSIGJvb2xcbi8vICAgQ2FsbGVkIHdoZW4gdGhlIGVkaXRvciBpcyBjbGlja2VkLCBhZnRlciBgaGFuZGxlQ2xpY2tPbmAgaGFuZGxlcnNcbi8vICAgaGF2ZSBiZWVuIGNhbGxlZC5cbi8vXG4vLyAgIGhhbmRsZURvdWJsZUNsaWNrT246OiA/KHZpZXc6IEVkaXRvclZpZXcsIHBvczogbnVtYmVyLCBub2RlOiBOb2RlLCBub2RlUG9zOiBudW1iZXIsIGV2ZW50OiBkb20uTW91c2VFdmVudCwgZGlyZWN0OiBib29sKSDihpIgYm9vbFxuLy8gICBDYWxsZWQgZm9yIGVhY2ggbm9kZSBhcm91bmQgYSBkb3VibGUgY2xpY2suXG4vL1xuLy8gICBoYW5kbGVEb3VibGVDbGljazo6ID8odmlldzogRWRpdG9yVmlldywgcG9zOiBudW1iZXIsIGV2ZW50OiBkb20uTW91c2VFdmVudCkg4oaSIGJvb2xcbi8vICAgQ2FsbGVkIHdoZW4gdGhlIGVkaXRvciBpcyBkb3VibGUtY2xpY2tlZCwgYWZ0ZXIgYGhhbmRsZURvdWJsZUNsaWNrT25gLlxuLy9cbi8vICAgaGFuZGxlVHJpcGxlQ2xpY2tPbjo6ID8odmlldzogRWRpdG9yVmlldywgcG9zOiBudW1iZXIsIG5vZGU6IE5vZGUsIG5vZGVQb3M6IG51bWJlciwgZXZlbnQ6IGRvbS5Nb3VzZUV2ZW50LCBkaXJlY3Q6IGJvb2wpIOKGkiBib29sXG4vLyAgIENhbGxlZCBmb3IgZWFjaCBub2RlIGFyb3VuZCBhIHRyaXBsZSBjbGljay5cbi8vXG4vLyAgIGhhbmRsZVRyaXBsZUNsaWNrOjogPyh2aWV3OiBFZGl0b3JWaWV3LCBwb3M6IG51bWJlciwgZXZlbnQ6IGRvbS5Nb3VzZUV2ZW50KSDihpIgYm9vbFxuLy8gICBDYWxsZWQgd2hlbiB0aGUgZWRpdG9yIGlzIHRyaXBsZS1jbGlja2VkLCBhZnRlciBgaGFuZGxlVHJpcGxlQ2xpY2tPbmAuXG4vL1xuLy8gICBoYW5kbGVQYXN0ZTo6ID8odmlldzogRWRpdG9yVmlldywgZXZlbnQ6IGRvbS5DbGlwYm9hcmRFdmVudCwgc2xpY2U6IFNsaWNlKSDihpIgYm9vbFxuLy8gICBDYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgYmVoYXZpb3Igb2YgcGFzdGluZy4gYHNsaWNlYCBpcyB0aGVcbi8vICAgcGFzdGVkIGNvbnRlbnQgcGFyc2VkIGJ5IHRoZSBlZGl0b3IsIGJ1dCB5b3UgY2FuIGRpcmVjdGx5IGFjY2Vzc1xuLy8gICB0aGUgZXZlbnQgdG8gZ2V0IGF0IHRoZSByYXcgY29udGVudC5cbi8vXG4vLyAgIGhhbmRsZURyb3A6OiA/KHZpZXc6IEVkaXRvclZpZXcsIGV2ZW50OiBkb20uRXZlbnQsIHNsaWNlOiBTbGljZSwgbW92ZWQ6IGJvb2wpIOKGkiBib29sXG4vLyAgIENhbGxlZCB3aGVuIHNvbWV0aGluZyBpcyBkcm9wcGVkIG9uIHRoZSBlZGl0b3IuIGBtb3ZlZGAgd2lsbCBiZVxuLy8gICB0cnVlIGlmIHRoaXMgZHJvcCBtb3ZlcyBmcm9tIHRoZSBjdXJyZW50IHNlbGVjdGlvbiAod2hpY2ggc2hvdWxkXG4vLyAgIHRodXMgYmUgZGVsZXRlZCkuXG4vL1xuLy8gICBoYW5kbGVTY3JvbGxUb1NlbGVjdGlvbjo6ID8odmlldzogRWRpdG9yVmlldykg4oaSIGJvb2xcbi8vICAgQ2FsbGVkIHdoZW4gdGhlIHZpZXcsIGFmdGVyIHVwZGF0aW5nIGl0cyBzdGF0ZSwgdHJpZXMgdG8gc2Nyb2xsXG4vLyAgIHRoZSBzZWxlY3Rpb24gaW50byB2aWV3LiBBIGhhbmRsZXIgZnVuY3Rpb24gbWF5IHJldHVybiBmYWxzZSB0b1xuLy8gICBpbmRpY2F0ZSB0aGF0IGl0IGRpZCBub3QgaGFuZGxlIHRoZSBzY3JvbGxpbmcgYW5kIGZ1cnRoZXJcbi8vICAgaGFuZGxlcnMgb3IgdGhlIGRlZmF1bHQgYmVoYXZpb3Igc2hvdWxkIGJlIHRyaWVkLlxuLy9cbi8vICAgY3JlYXRlU2VsZWN0aW9uQmV0d2Vlbjo6ID8odmlldzogRWRpdG9yVmlldywgYW5jaG9yOiBSZXNvbHZlZFBvcywgaGVhZDogUmVzb2x2ZWRQb3MpIOKGkiA/U2VsZWN0aW9uXG4vLyAgIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSB3YXkgYSBzZWxlY3Rpb24gaXMgY3JlYXRlZCB3aGVuXG4vLyAgIHJlYWRpbmcgYSBET00gc2VsZWN0aW9uIGJldHdlZW4gdGhlIGdpdmVuIGFuY2hvciBhbmQgaGVhZC5cbi8vXG4vLyAgIGRvbVBhcnNlcjo6ID9ET01QYXJzZXJcbi8vICAgVGhlIFtwYXJzZXJdKCNtb2RlbC5ET01QYXJzZXIpIHRvIHVzZSB3aGVuIHJlYWRpbmcgZWRpdG9yIGNoYW5nZXNcbi8vICAgZnJvbSB0aGUgRE9NLiBEZWZhdWx0cyB0byBjYWxsaW5nXG4vLyAgIFtgRE9NUGFyc2VyLmZyb21TY2hlbWFgXSgjbW9kZWwuRE9NUGFyc2VyXmZyb21TY2hlbWEpIG9uIHRoZVxuLy8gICBlZGl0b3IncyBzY2hlbWEuXG4vL1xuLy8gICB0cmFuc2Zvcm1QYXN0ZWRIVE1MOjogPyhodG1sOiBzdHJpbmcpIOKGkiBzdHJpbmdcbi8vICAgQ2FuIGJlIHVzZWQgdG8gdHJhbnNmb3JtIHBhc3RlZCBIVE1MIHRleHQsIF9iZWZvcmVfIGl0IGlzIHBhcnNlZCxcbi8vICAgZm9yIGV4YW1wbGUgdG8gY2xlYW4gaXQgdXAuXG4vL1xuLy8gICBjbGlwYm9hcmRQYXJzZXI6OiA/RE9NUGFyc2VyXG4vLyAgIFRoZSBbcGFyc2VyXSgjbW9kZWwuRE9NUGFyc2VyKSB0byB1c2Ugd2hlbiByZWFkaW5nIGNvbnRlbnQgZnJvbVxuLy8gICB0aGUgY2xpcGJvYXJkLiBXaGVuIG5vdCBnaXZlbiwgdGhlIHZhbHVlIG9mIHRoZVxuLy8gICBbYGRvbVBhcnNlcmBdKCN2aWV3LkVkaXRvclByb3BzLmRvbVBhcnNlcikgcHJvcCBpcyB1c2VkLlxuLy9cbi8vICAgdHJhbnNmb3JtUGFzdGVkVGV4dDo6ID8odGV4dDogc3RyaW5nLCBwbGFpbjogYm9vbCkg4oaSIHN0cmluZ1xuLy8gICBUcmFuc2Zvcm0gcGFzdGVkIHBsYWluIHRleHQuIFRoZSBgcGxhaW5gIGZsYWcgd2lsbCBiZSB0cnVlIHdoZW5cbi8vICAgdGhlIHRleHQgaXMgcGFzdGVkIGFzIHBsYWluIHRleHQuXG4vL1xuLy8gICBjbGlwYm9hcmRUZXh0UGFyc2VyOjogPyh0ZXh0OiBzdHJpbmcsICRjb250ZXh0OiBSZXNvbHZlZFBvcywgcGxhaW46IGJvb2wpIOKGkiBTbGljZVxuLy8gICBBIGZ1bmN0aW9uIHRvIHBhcnNlIHRleHQgZnJvbSB0aGUgY2xpcGJvYXJkIGludG8gYSBkb2N1bWVudFxuLy8gICBzbGljZS4gQ2FsbGVkIGFmdGVyXG4vLyAgIFtgdHJhbnNmb3JtUGFzdGVkVGV4dGBdKCN2aWV3LkVkaXRvclByb3BzLnRyYW5zZm9ybVBhc3RlZFRleHQpLlxuLy8gICBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyB0byBzcGxpdCB0aGUgdGV4dCBpbnRvIGxpbmVzLCB3cmFwIHRoZW1cbi8vICAgaW4gYDxwPmAgdGFncywgYW5kIGNhbGxcbi8vICAgW2BjbGlwYm9hcmRQYXJzZXJgXSgjdmlldy5FZGl0b3JQcm9wcy5jbGlwYm9hcmRQYXJzZXIpIG9uIGl0LlxuLy8gICBUaGUgYHBsYWluYCBmbGFnIHdpbGwgYmUgdHJ1ZSB3aGVuIHRoZSB0ZXh0IGlzIHBhc3RlZCBhcyBwbGFpbiB0ZXh0LlxuLy9cbi8vICAgdHJhbnNmb3JtUGFzdGVkOjogPyhTbGljZSkg4oaSIFNsaWNlXG4vLyAgIENhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSBwYXN0ZWQgY29udGVudCBiZWZvcmUgaXQgaXMgYXBwbGllZCB0b1xuLy8gICB0aGUgZG9jdW1lbnQuXG4vL1xuLy8gICBub2RlVmlld3M6OiA/T2JqZWN0PChub2RlOiBOb2RlLCB2aWV3OiBFZGl0b3JWaWV3LCBnZXRQb3M6ICgpIOKGkiBudW1iZXIsIGRlY29yYXRpb25zOiBbRGVjb3JhdGlvbl0sIGlubmVyRGVjb3JhdGlvbnM6IERlY29yYXRpb25Tb3VyY2UpIOKGkiBOb2RlVmlldz5cbi8vICAgQWxsb3dzIHlvdSB0byBwYXNzIGN1c3RvbSByZW5kZXJpbmcgYW5kIGJlaGF2aW9yIGxvZ2ljIGZvciBub2Rlc1xuLy8gICBhbmQgbWFya3MuIFNob3VsZCBtYXAgbm9kZSBhbmQgbWFyayBuYW1lcyB0byBjb25zdHJ1Y3RvclxuLy8gICBmdW5jdGlvbnMgdGhhdCBwcm9kdWNlIGEgW2BOb2RlVmlld2BdKCN2aWV3Lk5vZGVWaWV3KSBvYmplY3Rcbi8vICAgaW1wbGVtZW50aW5nIHRoZSBub2RlJ3MgZGlzcGxheSBiZWhhdmlvci4gRm9yIG5vZGVzLCB0aGUgdGhpcmRcbi8vICAgYXJndW1lbnQgYGdldFBvc2AgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gZ2V0IHRoZVxuLy8gICBub2RlJ3MgY3VycmVudCBwb3NpdGlvbiwgd2hpY2ggY2FuIGJlIHVzZWZ1bCB3aGVuIGNyZWF0aW5nXG4vLyAgIHRyYW5zYWN0aW9ucyB0byB1cGRhdGUgaXQuIEZvciBtYXJrcywgdGhlIHRoaXJkIGFyZ3VtZW50IGlzIGFcbi8vICAgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBtYXJrJ3MgY29udGVudCBpcyBpbmxpbmUuXG4vL1xuLy8gICBgZGVjb3JhdGlvbnNgIGlzIGFuIGFycmF5IG9mIG5vZGUgb3IgaW5saW5lIGRlY29yYXRpb25zIHRoYXQgYXJlXG4vLyAgIGFjdGl2ZSBhcm91bmQgdGhlIG5vZGUuIFRoZXkgYXJlIGF1dG9tYXRpY2FsbHkgZHJhd24gaW4gdGhlXG4vLyAgIG5vcm1hbCB3YXksIGFuZCB5b3Ugd2lsbCB1c3VhbGx5IGp1c3Qgd2FudCB0byBpZ25vcmUgdGhpcywgYnV0XG4vLyAgIHRoZXkgY2FuIGFsc28gYmUgdXNlZCBhcyBhIHdheSB0byBwcm92aWRlIGNvbnRleHQgaW5mb3JtYXRpb24gdG9cbi8vICAgdGhlIG5vZGUgdmlldyB3aXRob3V0IGFkZGluZyBpdCB0byB0aGUgZG9jdW1lbnQgaXRzZWxmLlxuLy9cbi8vICAgYGlubmVyRGVjb3JhdGlvbnNgIGhvbGRzIHRoZSBkZWNvcmF0aW9ucyBmb3IgdGhlIG5vZGUncyBjb250ZW50LlxuLy8gICBZb3UgY2FuIHNhZmVseSBpZ25vcmUgdGhpcyBpZiB5b3VyIHZpZXcgaGFzIG5vIGNvbnRlbnQgb3IgYVxuLy8gICBgY29udGVudERPTWAgcHJvcGVydHksIHNpbmNlIHRoZSBlZGl0b3Igd2lsbCBkcmF3IHRoZSBkZWNvcmF0aW9uc1xuLy8gICBvbiB0aGUgY29udGVudC4gQnV0IGlmIHlvdSwgZm9yIGV4YW1wbGUsIHdhbnQgdG8gY3JlYXRlIGEgbmVzdGVkXG4vLyAgIGVkaXRvciB3aXRoIHRoZSBjb250ZW50LCBpdCBtYXkgbWFrZSBzZW5zZSB0byBwcm92aWRlIGl0IHdpdGggdGhlXG4vLyAgIGlubmVyIGRlY29yYXRpb25zLlxuLy9cbi8vICAgY2xpcGJvYXJkU2VyaWFsaXplcjo6ID9ET01TZXJpYWxpemVyXG4vLyAgIFRoZSBET00gc2VyaWFsaXplciB0byB1c2Ugd2hlbiBwdXR0aW5nIGNvbnRlbnQgb250byB0aGVcbi8vICAgY2xpcGJvYXJkLiBJZiBub3QgZ2l2ZW4sIHRoZSByZXN1bHQgb2Zcbi8vICAgW2BET01TZXJpYWxpemVyLmZyb21TY2hlbWFgXSgjbW9kZWwuRE9NU2VyaWFsaXplcl5mcm9tU2NoZW1hKVxuLy8gICB3aWxsIGJlIHVzZWQuXG4vL1xuLy8gICBjbGlwYm9hcmRUZXh0U2VyaWFsaXplcjo6ID8oU2xpY2UpIOKGkiBzdHJpbmdcbi8vICAgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHRvIGdldCB0aGUgdGV4dCBmb3IgdGhlIGN1cnJlbnRcbi8vICAgc2VsZWN0aW9uIHdoZW4gY29weWluZyB0ZXh0IHRvIHRoZSBjbGlwYm9hcmQuIEJ5IGRlZmF1bHQsIHRoZVxuLy8gICBlZGl0b3Igd2lsbCB1c2UgW2B0ZXh0QmV0d2VlbmBdKCNtb2RlbC5Ob2RlLnRleHRCZXR3ZWVuKSBvbiB0aGVcbi8vICAgc2VsZWN0ZWQgcmFuZ2UuXG4vL1xuLy8gICBkZWNvcmF0aW9uczo6ID8oc3RhdGU6IEVkaXRvclN0YXRlKSDihpIgP0RlY29yYXRpb25Tb3VyY2Vcbi8vICAgQSBzZXQgb2YgW2RvY3VtZW50IGRlY29yYXRpb25zXSgjdmlldy5EZWNvcmF0aW9uKSB0byBzaG93IGluIHRoZVxuLy8gICB2aWV3LlxuLy9cbi8vICAgZWRpdGFibGU6OiA/KHN0YXRlOiBFZGl0b3JTdGF0ZSkg4oaSIGJvb2xcbi8vICAgV2hlbiB0aGlzIHJldHVybnMgZmFsc2UsIHRoZSBjb250ZW50IG9mIHRoZSB2aWV3IGlzIG5vdCBkaXJlY3RseVxuLy8gICBlZGl0YWJsZS5cbi8vXG4vLyAgIGF0dHJpYnV0ZXM6OiA/dW5pb248T2JqZWN0PHN0cmluZz4sIChFZGl0b3JTdGF0ZSkg4oaSID9PYmplY3Q8c3RyaW5nPj5cbi8vICAgQ29udHJvbCB0aGUgRE9NIGF0dHJpYnV0ZXMgb2YgdGhlIGVkaXRhYmxlIGVsZW1lbnQuIE1heSBiZSBlaXRoZXJcbi8vICAgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24gZ29pbmcgZnJvbSBhbiBlZGl0b3Igc3RhdGUgdG8gYW4gb2JqZWN0LlxuLy8gICBCeSBkZWZhdWx0LCB0aGUgZWxlbWVudCB3aWxsIGdldCBhIGNsYXNzIGBcIlByb3NlTWlycm9yXCJgLCBhbmRcbi8vICAgd2lsbCBoYXZlIGl0cyBgY29udGVudEVkaXRhYmxlYCBhdHRyaWJ1dGUgZGV0ZXJtaW5lZCBieSB0aGVcbi8vICAgW2BlZGl0YWJsZWAgcHJvcF0oI3ZpZXcuRWRpdG9yUHJvcHMuZWRpdGFibGUpLiBBZGRpdGlvbmFsIGNsYXNzZXNcbi8vICAgcHJvdmlkZWQgaGVyZSB3aWxsIGJlIGFkZGVkIHRvIHRoZSBjbGFzcy4gRm9yIG90aGVyIGF0dHJpYnV0ZXMsXG4vLyAgIHRoZSB2YWx1ZSBwcm92aWRlZCBmaXJzdCAoYXMgaW5cbi8vICAgW2Bzb21lUHJvcGBdKCN2aWV3LkVkaXRvclZpZXcuc29tZVByb3ApKSB3aWxsIGJlIHVzZWQuXG4vL1xuLy8gICBzY3JvbGxUaHJlc2hvbGQ6OiA/dW5pb248bnVtYmVyLCB7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9PlxuLy8gICBEZXRlcm1pbmVzIHRoZSBkaXN0YW5jZSAoaW4gcGl4ZWxzKSBiZXR3ZWVuIHRoZSBjdXJzb3IgYW5kIHRoZVxuLy8gICBlbmQgb2YgdGhlIHZpc2libGUgdmlld3BvcnQgYXQgd2hpY2ggcG9pbnQsIHdoZW4gc2Nyb2xsaW5nIHRoZVxuLy8gICBjdXJzb3IgaW50byB2aWV3LCBzY3JvbGxpbmcgdGFrZXMgcGxhY2UuIERlZmF1bHRzIHRvIDAuXG4vL1xuLy8gICBzY3JvbGxNYXJnaW46OiA/dW5pb248bnVtYmVyLCB7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9PlxuLy8gICBEZXRlcm1pbmVzIHRoZSBleHRyYSBzcGFjZSAoaW4gcGl4ZWxzKSB0aGF0IGlzIGxlZnQgYWJvdmUgb3Jcbi8vICAgYmVsb3cgdGhlIGN1cnNvciB3aGVuIGl0IGlzIHNjcm9sbGVkIGludG8gdmlldy4gRGVmYXVsdHMgdG8gNS5cblxuLy8gRGlyZWN0RWRpdG9yUHJvcHM6OiBpbnRlcmZhY2UgZXh0ZW5kcyBFZGl0b3JQcm9wc1xuLy9cbi8vIFRoZSBwcm9wcyBvYmplY3QgZ2l2ZW4gZGlyZWN0bHkgdG8gdGhlIGVkaXRvciB2aWV3IHN1cHBvcnRzIHR3b1xuLy8gZmllbGRzIHRoYXQgY2FuJ3QgYmUgdXNlZCBpbiBwbHVnaW5zOlxuLy9cbi8vICAgc3RhdGU6OiBFZGl0b3JTdGF0ZVxuLy8gICBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZWRpdG9yLlxuLy9cbi8vICAgZGlzcGF0Y2hUcmFuc2FjdGlvbjo6ID8odHI6IFRyYW5zYWN0aW9uKVxuLy8gICBUaGUgY2FsbGJhY2sgb3ZlciB3aGljaCB0byBzZW5kIHRyYW5zYWN0aW9ucyAoc3RhdGUgdXBkYXRlcylcbi8vICAgcHJvZHVjZWQgYnkgdGhlIHZpZXcuIElmIHlvdSBzcGVjaWZ5IHRoaXMsIHlvdSBwcm9iYWJseSB3YW50IHRvXG4vLyAgIG1ha2Ugc3VyZSB0aGlzIGVuZHMgdXAgY2FsbGluZyB0aGUgdmlldydzXG4vLyAgIFtgdXBkYXRlU3RhdGVgXSgjdmlldy5FZGl0b3JWaWV3LnVwZGF0ZVN0YXRlKSBtZXRob2Qgd2l0aCBhIG5ld1xuLy8gICBzdGF0ZSB0aGF0IGhhcyB0aGUgdHJhbnNhY3Rpb25cbi8vICAgW2FwcGxpZWRdKCNzdGF0ZS5FZGl0b3JTdGF0ZS5hcHBseSkuIFRoZSBjYWxsYmFjayB3aWxsIGJlIGJvdW5kIHRvIGhhdmVcbi8vICAgdGhlIHZpZXcgaW5zdGFuY2UgYXMgaXRzIGB0aGlzYCBiaW5kaW5nLlxuXG5leHBvcnQgeyBEZWNvcmF0aW9uLCBEZWNvcmF0aW9uU2V0LCBFZGl0b3JWaWV3LCBlbmRDb21wb3NpdGlvbiBhcyBfX2VuZENvbXBvc2l0aW9uLCBwYXJzZUZyb21DbGlwYm9hcmQgYXMgX19wYXJzZUZyb21DbGlwYm9hcmQsIHNlcmlhbGl6ZUZvckNsaXBib2FyZCBhcyBfX3NlcmlhbGl6ZUZvckNsaXBib2FyZCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXMuanMubWFwXG4iLCJ2YXIgR09PRF9MRUFGX1NJWkUgPSAyMDA7XG5cbi8vIDo6IGNsYXNzPFQ+IEEgcm9wZSBzZXF1ZW5jZSBpcyBhIHBlcnNpc3RlbnQgc2VxdWVuY2UgZGF0YSBzdHJ1Y3R1cmVcbi8vIHRoYXQgc3VwcG9ydHMgYXBwZW5kaW5nLCBwcmVwZW5kaW5nLCBhbmQgc2xpY2luZyB3aXRob3V0IGRvaW5nIGFcbi8vIGZ1bGwgY29weS4gSXQgaXMgcmVwcmVzZW50ZWQgYXMgYSBtb3N0bHktYmFsYW5jZWQgdHJlZS5cbnZhciBSb3BlU2VxdWVuY2UgPSBmdW5jdGlvbiBSb3BlU2VxdWVuY2UgKCkge307XG5cblJvcGVTZXF1ZW5jZS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kIChvdGhlcikge1xuICBpZiAoIW90aGVyLmxlbmd0aCkgeyByZXR1cm4gdGhpcyB9XG4gIG90aGVyID0gUm9wZVNlcXVlbmNlLmZyb20ob3RoZXIpO1xuXG4gIHJldHVybiAoIXRoaXMubGVuZ3RoICYmIG90aGVyKSB8fFxuICAgIChvdGhlci5sZW5ndGggPCBHT09EX0xFQUZfU0laRSAmJiB0aGlzLmxlYWZBcHBlbmQob3RoZXIpKSB8fFxuICAgICh0aGlzLmxlbmd0aCA8IEdPT0RfTEVBRl9TSVpFICYmIG90aGVyLmxlYWZQcmVwZW5kKHRoaXMpKSB8fFxuICAgIHRoaXMuYXBwZW5kSW5uZXIob3RoZXIpXG59O1xuXG4vLyA6OiAodW5pb248W1RdLCBSb3BlU2VxdWVuY2U8VD4+KSDihpIgUm9wZVNlcXVlbmNlPFQ+XG4vLyBQcmVwZW5kIGFuIGFycmF5IG9yIG90aGVyIHJvcGUgdG8gdGhpcyBvbmUsIHJldHVybmluZyBhIG5ldyByb3BlLlxuUm9wZVNlcXVlbmNlLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gcHJlcGVuZCAob3RoZXIpIHtcbiAgaWYgKCFvdGhlci5sZW5ndGgpIHsgcmV0dXJuIHRoaXMgfVxuICByZXR1cm4gUm9wZVNlcXVlbmNlLmZyb20ob3RoZXIpLmFwcGVuZCh0aGlzKVxufTtcblxuUm9wZVNlcXVlbmNlLnByb3RvdHlwZS5hcHBlbmRJbm5lciA9IGZ1bmN0aW9uIGFwcGVuZElubmVyIChvdGhlcikge1xuICByZXR1cm4gbmV3IEFwcGVuZCh0aGlzLCBvdGhlcilcbn07XG5cbi8vIDo6ICg/bnVtYmVyLCA/bnVtYmVyKSDihpIgUm9wZVNlcXVlbmNlPFQ+XG4vLyBDcmVhdGUgYSByb3BlIHJlcGVzZW50aW5nIGEgc3ViLXNlcXVlbmNlIG9mIHRoaXMgcm9wZS5cblJvcGVTZXF1ZW5jZS5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoZnJvbSwgdG8pIHtcbiAgICBpZiAoIGZyb20gPT09IHZvaWQgMCApIGZyb20gPSAwO1xuICAgIGlmICggdG8gPT09IHZvaWQgMCApIHRvID0gdGhpcy5sZW5ndGg7XG5cbiAgaWYgKGZyb20gPj0gdG8pIHsgcmV0dXJuIFJvcGVTZXF1ZW5jZS5lbXB0eSB9XG4gIHJldHVybiB0aGlzLnNsaWNlSW5uZXIoTWF0aC5tYXgoMCwgZnJvbSksIE1hdGgubWluKHRoaXMubGVuZ3RoLCB0bykpXG59O1xuXG4vLyA6OiAobnVtYmVyKSDihpIgVFxuLy8gUmV0cmlldmUgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIGZyb20gdGhpcyByb3BlLlxuUm9wZVNlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKGkpIHtcbiAgaWYgKGkgPCAwIHx8IGkgPj0gdGhpcy5sZW5ndGgpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gIHJldHVybiB0aGlzLmdldElubmVyKGkpXG59O1xuXG4vLyA6OiAoKGVsZW1lbnQ6IFQsIGluZGV4OiBudW1iZXIpIOKGkiA/Ym9vbCwgP251bWJlciwgP251bWJlcilcbi8vIENhbGwgdGhlIGdpdmVuIGZ1bmN0aW9uIGZvciBlYWNoIGVsZW1lbnQgYmV0d2VlbiB0aGUgZ2l2ZW5cbi8vIGluZGljZXMuIFRoaXMgdGVuZHMgdG8gYmUgbW9yZSBlZmZpY2llbnQgdGhhbiBsb29waW5nIG92ZXIgdGhlXG4vLyBpbmRpY2VzIGFuZCBjYWxsaW5nIGBnZXRgLCBiZWNhdXNlIGl0IGRvZXNuJ3QgaGF2ZSB0byBkZXNjZW5kIHRoZVxuLy8gdHJlZSBmb3IgZXZlcnkgZWxlbWVudC5cblJvcGVTZXF1ZW5jZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2ggKGYsIGZyb20sIHRvKSB7XG4gICAgaWYgKCBmcm9tID09PSB2b2lkIDAgKSBmcm9tID0gMDtcbiAgICBpZiAoIHRvID09PSB2b2lkIDAgKSB0byA9IHRoaXMubGVuZ3RoO1xuXG4gIGlmIChmcm9tIDw9IHRvKVxuICAgIHsgdGhpcy5mb3JFYWNoSW5uZXIoZiwgZnJvbSwgdG8sIDApOyB9XG4gIGVsc2VcbiAgICB7IHRoaXMuZm9yRWFjaEludmVydGVkSW5uZXIoZiwgZnJvbSwgdG8sIDApOyB9XG59O1xuXG4vLyA6OiAoKGVsZW1lbnQ6IFQsIGluZGV4OiBudW1iZXIpIOKGkiBVLCA/bnVtYmVyLCA/bnVtYmVyKSDihpIgW1VdXG4vLyBNYXAgdGhlIGdpdmVuIGZ1bmN0aW9ucyBvdmVyIHRoZSBlbGVtZW50cyBvZiB0aGUgcm9wZSwgcHJvZHVjaW5nXG4vLyBhIGZsYXQgYXJyYXkuXG5Sb3BlU2VxdWVuY2UucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIG1hcCAoZiwgZnJvbSwgdG8pIHtcbiAgICBpZiAoIGZyb20gPT09IHZvaWQgMCApIGZyb20gPSAwO1xuICAgIGlmICggdG8gPT09IHZvaWQgMCApIHRvID0gdGhpcy5sZW5ndGg7XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGVsdCwgaSkgeyByZXR1cm4gcmVzdWx0LnB1c2goZihlbHQsIGkpKTsgfSwgZnJvbSwgdG8pO1xuICByZXR1cm4gcmVzdWx0XG59O1xuXG4vLyA6OiAoP3VuaW9uPFtUXSwgUm9wZVNlcXVlbmNlPFQ+Pikg4oaSIFJvcGVTZXF1ZW5jZTxUPlxuLy8gQ3JlYXRlIGEgcm9wZSByZXByZXNlbnRpbmcgdGhlIGdpdmVuIGFycmF5LCBvciByZXR1cm4gdGhlIHJvcGVcbi8vIGl0c2VsZiBpZiBhIHJvcGUgd2FzIGdpdmVuLlxuUm9wZVNlcXVlbmNlLmZyb20gPSBmdW5jdGlvbiBmcm9tICh2YWx1ZXMpIHtcbiAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFJvcGVTZXF1ZW5jZSkgeyByZXR1cm4gdmFsdWVzIH1cbiAgcmV0dXJuIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID8gbmV3IExlYWYodmFsdWVzKSA6IFJvcGVTZXF1ZW5jZS5lbXB0eVxufTtcblxudmFyIExlYWYgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChSb3BlU2VxdWVuY2UpIHtcbiAgZnVuY3Rpb24gTGVhZih2YWx1ZXMpIHtcbiAgICBSb3BlU2VxdWVuY2UuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgfVxuXG4gIGlmICggUm9wZVNlcXVlbmNlICkgTGVhZi5fX3Byb3RvX18gPSBSb3BlU2VxdWVuY2U7XG4gIExlYWYucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggUm9wZVNlcXVlbmNlICYmIFJvcGVTZXF1ZW5jZS5wcm90b3R5cGUgKTtcbiAgTGVhZi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMZWFmO1xuXG4gIHZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGxlbmd0aDogeyBjb25maWd1cmFibGU6IHRydWUgfSxkZXB0aDogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIExlYWYucHJvdG90eXBlLmZsYXR0ZW4gPSBmdW5jdGlvbiBmbGF0dGVuICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNcbiAgfTtcblxuICBMZWFmLnByb3RvdHlwZS5zbGljZUlubmVyID0gZnVuY3Rpb24gc2xpY2VJbm5lciAoZnJvbSwgdG8pIHtcbiAgICBpZiAoZnJvbSA9PSAwICYmIHRvID09IHRoaXMubGVuZ3RoKSB7IHJldHVybiB0aGlzIH1cbiAgICByZXR1cm4gbmV3IExlYWYodGhpcy52YWx1ZXMuc2xpY2UoZnJvbSwgdG8pKVxuICB9O1xuXG4gIExlYWYucHJvdG90eXBlLmdldElubmVyID0gZnVuY3Rpb24gZ2V0SW5uZXIgKGkpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNbaV1cbiAgfTtcblxuICBMZWFmLnByb3RvdHlwZS5mb3JFYWNoSW5uZXIgPSBmdW5jdGlvbiBmb3JFYWNoSW5uZXIgKGYsIGZyb20sIHRvLCBzdGFydCkge1xuICAgIGZvciAodmFyIGkgPSBmcm9tOyBpIDwgdG87IGkrKylcbiAgICAgIHsgaWYgKGYodGhpcy52YWx1ZXNbaV0sIHN0YXJ0ICsgaSkgPT09IGZhbHNlKSB7IHJldHVybiBmYWxzZSB9IH1cbiAgfTtcblxuICBMZWFmLnByb3RvdHlwZS5mb3JFYWNoSW52ZXJ0ZWRJbm5lciA9IGZ1bmN0aW9uIGZvckVhY2hJbnZlcnRlZElubmVyIChmLCBmcm9tLCB0bywgc3RhcnQpIHtcbiAgICBmb3IgKHZhciBpID0gZnJvbSAtIDE7IGkgPj0gdG87IGktLSlcbiAgICAgIHsgaWYgKGYodGhpcy52YWx1ZXNbaV0sIHN0YXJ0ICsgaSkgPT09IGZhbHNlKSB7IHJldHVybiBmYWxzZSB9IH1cbiAgfTtcblxuICBMZWFmLnByb3RvdHlwZS5sZWFmQXBwZW5kID0gZnVuY3Rpb24gbGVhZkFwcGVuZCAob3RoZXIpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggKyBvdGhlci5sZW5ndGggPD0gR09PRF9MRUFGX1NJWkUpXG4gICAgICB7IHJldHVybiBuZXcgTGVhZih0aGlzLnZhbHVlcy5jb25jYXQob3RoZXIuZmxhdHRlbigpKSkgfVxuICB9O1xuXG4gIExlYWYucHJvdG90eXBlLmxlYWZQcmVwZW5kID0gZnVuY3Rpb24gbGVhZlByZXBlbmQgKG90aGVyKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoICsgb3RoZXIubGVuZ3RoIDw9IEdPT0RfTEVBRl9TSVpFKVxuICAgICAgeyByZXR1cm4gbmV3IExlYWYob3RoZXIuZmxhdHRlbigpLmNvbmNhdCh0aGlzLnZhbHVlcykpIH1cbiAgfTtcblxuICBwcm90b3R5cGVBY2Nlc3NvcnMubGVuZ3RoLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aCB9O1xuXG4gIHByb3RvdHlwZUFjY2Vzc29ycy5kZXB0aC5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAwIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIExlYWYucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxuICByZXR1cm4gTGVhZjtcbn0oUm9wZVNlcXVlbmNlKSk7XG5cbi8vIDo6IFJvcGVTZXF1ZW5jZVxuLy8gVGhlIGVtcHR5IHJvcGUgc2VxdWVuY2UuXG5Sb3BlU2VxdWVuY2UuZW1wdHkgPSBuZXcgTGVhZihbXSk7XG5cbnZhciBBcHBlbmQgPSAvKkBfX1BVUkVfXyovKGZ1bmN0aW9uIChSb3BlU2VxdWVuY2UpIHtcbiAgZnVuY3Rpb24gQXBwZW5kKGxlZnQsIHJpZ2h0KSB7XG4gICAgUm9wZVNlcXVlbmNlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy5sZW5ndGggPSBsZWZ0Lmxlbmd0aCArIHJpZ2h0Lmxlbmd0aDtcbiAgICB0aGlzLmRlcHRoID0gTWF0aC5tYXgobGVmdC5kZXB0aCwgcmlnaHQuZGVwdGgpICsgMTtcbiAgfVxuXG4gIGlmICggUm9wZVNlcXVlbmNlICkgQXBwZW5kLl9fcHJvdG9fXyA9IFJvcGVTZXF1ZW5jZTtcbiAgQXBwZW5kLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFJvcGVTZXF1ZW5jZSAmJiBSb3BlU2VxdWVuY2UucHJvdG90eXBlICk7XG4gIEFwcGVuZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBlbmQ7XG5cbiAgQXBwZW5kLnByb3RvdHlwZS5mbGF0dGVuID0gZnVuY3Rpb24gZmxhdHRlbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdC5mbGF0dGVuKCkuY29uY2F0KHRoaXMucmlnaHQuZmxhdHRlbigpKVxuICB9O1xuXG4gIEFwcGVuZC5wcm90b3R5cGUuZ2V0SW5uZXIgPSBmdW5jdGlvbiBnZXRJbm5lciAoaSkge1xuICAgIHJldHVybiBpIDwgdGhpcy5sZWZ0Lmxlbmd0aCA/IHRoaXMubGVmdC5nZXQoaSkgOiB0aGlzLnJpZ2h0LmdldChpIC0gdGhpcy5sZWZ0Lmxlbmd0aClcbiAgfTtcblxuICBBcHBlbmQucHJvdG90eXBlLmZvckVhY2hJbm5lciA9IGZ1bmN0aW9uIGZvckVhY2hJbm5lciAoZiwgZnJvbSwgdG8sIHN0YXJ0KSB7XG4gICAgdmFyIGxlZnRMZW4gPSB0aGlzLmxlZnQubGVuZ3RoO1xuICAgIGlmIChmcm9tIDwgbGVmdExlbiAmJlxuICAgICAgICB0aGlzLmxlZnQuZm9yRWFjaElubmVyKGYsIGZyb20sIE1hdGgubWluKHRvLCBsZWZ0TGVuKSwgc3RhcnQpID09PSBmYWxzZSlcbiAgICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAodG8gPiBsZWZ0TGVuICYmXG4gICAgICAgIHRoaXMucmlnaHQuZm9yRWFjaElubmVyKGYsIE1hdGgubWF4KGZyb20gLSBsZWZ0TGVuLCAwKSwgTWF0aC5taW4odGhpcy5sZW5ndGgsIHRvKSAtIGxlZnRMZW4sIHN0YXJ0ICsgbGVmdExlbikgPT09IGZhbHNlKVxuICAgICAgeyByZXR1cm4gZmFsc2UgfVxuICB9O1xuXG4gIEFwcGVuZC5wcm90b3R5cGUuZm9yRWFjaEludmVydGVkSW5uZXIgPSBmdW5jdGlvbiBmb3JFYWNoSW52ZXJ0ZWRJbm5lciAoZiwgZnJvbSwgdG8sIHN0YXJ0KSB7XG4gICAgdmFyIGxlZnRMZW4gPSB0aGlzLmxlZnQubGVuZ3RoO1xuICAgIGlmIChmcm9tID4gbGVmdExlbiAmJlxuICAgICAgICB0aGlzLnJpZ2h0LmZvckVhY2hJbnZlcnRlZElubmVyKGYsIGZyb20gLSBsZWZ0TGVuLCBNYXRoLm1heCh0bywgbGVmdExlbikgLSBsZWZ0TGVuLCBzdGFydCArIGxlZnRMZW4pID09PSBmYWxzZSlcbiAgICAgIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAodG8gPCBsZWZ0TGVuICYmXG4gICAgICAgIHRoaXMubGVmdC5mb3JFYWNoSW52ZXJ0ZWRJbm5lcihmLCBNYXRoLm1pbihmcm9tLCBsZWZ0TGVuKSwgdG8sIHN0YXJ0KSA9PT0gZmFsc2UpXG4gICAgICB7IHJldHVybiBmYWxzZSB9XG4gIH07XG5cbiAgQXBwZW5kLnByb3RvdHlwZS5zbGljZUlubmVyID0gZnVuY3Rpb24gc2xpY2VJbm5lciAoZnJvbSwgdG8pIHtcbiAgICBpZiAoZnJvbSA9PSAwICYmIHRvID09IHRoaXMubGVuZ3RoKSB7IHJldHVybiB0aGlzIH1cbiAgICB2YXIgbGVmdExlbiA9IHRoaXMubGVmdC5sZW5ndGg7XG4gICAgaWYgKHRvIDw9IGxlZnRMZW4pIHsgcmV0dXJuIHRoaXMubGVmdC5zbGljZShmcm9tLCB0bykgfVxuICAgIGlmIChmcm9tID49IGxlZnRMZW4pIHsgcmV0dXJuIHRoaXMucmlnaHQuc2xpY2UoZnJvbSAtIGxlZnRMZW4sIHRvIC0gbGVmdExlbikgfVxuICAgIHJldHVybiB0aGlzLmxlZnQuc2xpY2UoZnJvbSwgbGVmdExlbikuYXBwZW5kKHRoaXMucmlnaHQuc2xpY2UoMCwgdG8gLSBsZWZ0TGVuKSlcbiAgfTtcblxuICBBcHBlbmQucHJvdG90eXBlLmxlYWZBcHBlbmQgPSBmdW5jdGlvbiBsZWFmQXBwZW5kIChvdGhlcikge1xuICAgIHZhciBpbm5lciA9IHRoaXMucmlnaHQubGVhZkFwcGVuZChvdGhlcik7XG4gICAgaWYgKGlubmVyKSB7IHJldHVybiBuZXcgQXBwZW5kKHRoaXMubGVmdCwgaW5uZXIpIH1cbiAgfTtcblxuICBBcHBlbmQucHJvdG90eXBlLmxlYWZQcmVwZW5kID0gZnVuY3Rpb24gbGVhZlByZXBlbmQgKG90aGVyKSB7XG4gICAgdmFyIGlubmVyID0gdGhpcy5sZWZ0LmxlYWZQcmVwZW5kKG90aGVyKTtcbiAgICBpZiAoaW5uZXIpIHsgcmV0dXJuIG5ldyBBcHBlbmQoaW5uZXIsIHRoaXMucmlnaHQpIH1cbiAgfTtcblxuICBBcHBlbmQucHJvdG90eXBlLmFwcGVuZElubmVyID0gZnVuY3Rpb24gYXBwZW5kSW5uZXIgKG90aGVyKSB7XG4gICAgaWYgKHRoaXMubGVmdC5kZXB0aCA+PSBNYXRoLm1heCh0aGlzLnJpZ2h0LmRlcHRoLCBvdGhlci5kZXB0aCkgKyAxKVxuICAgICAgeyByZXR1cm4gbmV3IEFwcGVuZCh0aGlzLmxlZnQsIG5ldyBBcHBlbmQodGhpcy5yaWdodCwgb3RoZXIpKSB9XG4gICAgcmV0dXJuIG5ldyBBcHBlbmQodGhpcywgb3RoZXIpXG4gIH07XG5cbiAgcmV0dXJuIEFwcGVuZDtcbn0oUm9wZVNlcXVlbmNlKSk7XG5cbnZhciByb3BlU2VxdWVuY2UgPSBSb3BlU2VxdWVuY2U7XG5cbmV4cG9ydCBkZWZhdWx0IHJvcGVTZXF1ZW5jZTtcbiIsImV4cG9ydCB2YXIgYmFzZSA9IHtcbiAgODogXCJCYWNrc3BhY2VcIixcbiAgOTogXCJUYWJcIixcbiAgMTA6IFwiRW50ZXJcIixcbiAgMTI6IFwiTnVtTG9ja1wiLFxuICAxMzogXCJFbnRlclwiLFxuICAxNjogXCJTaGlmdFwiLFxuICAxNzogXCJDb250cm9sXCIsXG4gIDE4OiBcIkFsdFwiLFxuICAyMDogXCJDYXBzTG9ja1wiLFxuICAyNzogXCJFc2NhcGVcIixcbiAgMzI6IFwiIFwiLFxuICAzMzogXCJQYWdlVXBcIixcbiAgMzQ6IFwiUGFnZURvd25cIixcbiAgMzU6IFwiRW5kXCIsXG4gIDM2OiBcIkhvbWVcIixcbiAgMzc6IFwiQXJyb3dMZWZ0XCIsXG4gIDM4OiBcIkFycm93VXBcIixcbiAgMzk6IFwiQXJyb3dSaWdodFwiLFxuICA0MDogXCJBcnJvd0Rvd25cIixcbiAgNDQ6IFwiUHJpbnRTY3JlZW5cIixcbiAgNDU6IFwiSW5zZXJ0XCIsXG4gIDQ2OiBcIkRlbGV0ZVwiLFxuICA1OTogXCI7XCIsXG4gIDYxOiBcIj1cIixcbiAgOTE6IFwiTWV0YVwiLFxuICA5MjogXCJNZXRhXCIsXG4gIDEwNjogXCIqXCIsXG4gIDEwNzogXCIrXCIsXG4gIDEwODogXCIsXCIsXG4gIDEwOTogXCItXCIsXG4gIDExMDogXCIuXCIsXG4gIDExMTogXCIvXCIsXG4gIDE0NDogXCJOdW1Mb2NrXCIsXG4gIDE0NTogXCJTY3JvbGxMb2NrXCIsXG4gIDE2MDogXCJTaGlmdFwiLFxuICAxNjE6IFwiU2hpZnRcIixcbiAgMTYyOiBcIkNvbnRyb2xcIixcbiAgMTYzOiBcIkNvbnRyb2xcIixcbiAgMTY0OiBcIkFsdFwiLFxuICAxNjU6IFwiQWx0XCIsXG4gIDE3MzogXCItXCIsXG4gIDE4NjogXCI7XCIsXG4gIDE4NzogXCI9XCIsXG4gIDE4ODogXCIsXCIsXG4gIDE4OTogXCItXCIsXG4gIDE5MDogXCIuXCIsXG4gIDE5MTogXCIvXCIsXG4gIDE5MjogXCJgXCIsXG4gIDIxOTogXCJbXCIsXG4gIDIyMDogXCJcXFxcXCIsXG4gIDIyMTogXCJdXCIsXG4gIDIyMjogXCInXCIsXG4gIDIyOTogXCJxXCJcbn1cblxuZXhwb3J0IHZhciBzaGlmdCA9IHtcbiAgNDg6IFwiKVwiLFxuICA0OTogXCIhXCIsXG4gIDUwOiBcIkBcIixcbiAgNTE6IFwiI1wiLFxuICA1MjogXCIkXCIsXG4gIDUzOiBcIiVcIixcbiAgNTQ6IFwiXlwiLFxuICA1NTogXCImXCIsXG4gIDU2OiBcIipcIixcbiAgNTc6IFwiKFwiLFxuICA1OTogXCI6XCIsXG4gIDYxOiBcIitcIixcbiAgMTczOiBcIl9cIixcbiAgMTg2OiBcIjpcIixcbiAgMTg3OiBcIitcIixcbiAgMTg4OiBcIjxcIixcbiAgMTg5OiBcIl9cIixcbiAgMTkwOiBcIj5cIixcbiAgMTkxOiBcIj9cIixcbiAgMTkyOiBcIn5cIixcbiAgMjE5OiBcIntcIixcbiAgMjIwOiBcInxcIixcbiAgMjIxOiBcIn1cIixcbiAgMjIyOiBcIlxcXCJcIixcbiAgMjI5OiBcIlFcIlxufVxuXG52YXIgY2hyb21lID0gdHlwZW9mIG5hdmlnYXRvciAhPSBcInVuZGVmaW5lZFwiICYmIC9DaHJvbWVcXC8oXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudClcbnZhciBzYWZhcmkgPSB0eXBlb2YgbmF2aWdhdG9yICE9IFwidW5kZWZpbmVkXCIgJiYgL0FwcGxlIENvbXB1dGVyLy50ZXN0KG5hdmlnYXRvci52ZW5kb3IpXG52YXIgZ2Vja28gPSB0eXBlb2YgbmF2aWdhdG9yICE9IFwidW5kZWZpbmVkXCIgJiYgL0dlY2tvXFwvXFxkKy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxudmFyIG1hYyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT0gXCJ1bmRlZmluZWRcIiAmJiAvTWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSlcbnZhciBpZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT0gXCJ1bmRlZmluZWRcIiAmJiAvTVNJRSBcXGR8VHJpZGVudFxcLyg/Ols3LTldfFxcZHsyLH0pXFwuLipydjooXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudClcbnZhciBicm9rZW5Nb2RpZmllck5hbWVzID0gY2hyb21lICYmIChtYWMgfHwgK2Nocm9tZVsxXSA8IDU3KSB8fCBnZWNrbyAmJiBtYWNcblxuLy8gRmlsbCBpbiB0aGUgZGlnaXQga2V5c1xuZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSBiYXNlWzQ4ICsgaV0gPSBiYXNlWzk2ICsgaV0gPSBTdHJpbmcoaSlcblxuLy8gVGhlIGZ1bmN0aW9uIGtleXNcbmZvciAodmFyIGkgPSAxOyBpIDw9IDI0OyBpKyspIGJhc2VbaSArIDExMV0gPSBcIkZcIiArIGlcblxuLy8gQW5kIHRoZSBhbHBoYWJldGljIGtleXNcbmZvciAodmFyIGkgPSA2NTsgaSA8PSA5MDsgaSsrKSB7XG4gIGJhc2VbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkgKyAzMilcbiAgc2hpZnRbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXG59XG5cbi8vIEZvciBlYWNoIGNvZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBzaGlmdC1lcXVpdmFsZW50LCBjb3B5IHRoZSBiYXNlIG5hbWVcbmZvciAodmFyIGNvZGUgaW4gYmFzZSkgaWYgKCFzaGlmdC5oYXNPd25Qcm9wZXJ0eShjb2RlKSkgc2hpZnRbY29kZV0gPSBiYXNlW2NvZGVdXG5cbmV4cG9ydCBmdW5jdGlvbiBrZXlOYW1lKGV2ZW50KSB7XG4gIC8vIERvbid0IHRydXN0IGV2ZW50LmtleSBpbiBDaHJvbWUgd2hlbiB0aGVyZSBhcmUgbW9kaWZpZXJzIHVudGlsXG4gIC8vIHRoZXkgZml4IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzMzgzOFxuICB2YXIgaWdub3JlS2V5ID0gYnJva2VuTW9kaWZpZXJOYW1lcyAmJiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQubWV0YUtleSkgfHxcbiAgICAoc2FmYXJpIHx8IGllKSAmJiBldmVudC5zaGlmdEtleSAmJiBldmVudC5rZXkgJiYgZXZlbnQua2V5Lmxlbmd0aCA9PSAxXG4gIHZhciBuYW1lID0gKCFpZ25vcmVLZXkgJiYgZXZlbnQua2V5KSB8fFxuICAgIChldmVudC5zaGlmdEtleSA/IHNoaWZ0IDogYmFzZSlbZXZlbnQua2V5Q29kZV0gfHxcbiAgICBldmVudC5rZXkgfHwgXCJVbmlkZW50aWZpZWRcIlxuICAvLyBFZGdlIHNvbWV0aW1lcyBwcm9kdWNlcyB3cm9uZyBuYW1lcyAoSXNzdWUgIzMpXG4gIGlmIChuYW1lID09IFwiRXNjXCIpIG5hbWUgPSBcIkVzY2FwZVwiXG4gIGlmIChuYW1lID09IFwiRGVsXCIpIG5hbWUgPSBcIkRlbGV0ZVwiXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzg4NjA1NzEvXG4gIGlmIChuYW1lID09IFwiTGVmdFwiKSBuYW1lID0gXCJBcnJvd0xlZnRcIlxuICBpZiAobmFtZSA9PSBcIlVwXCIpIG5hbWUgPSBcIkFycm93VXBcIlxuICBpZiAobmFtZSA9PSBcIlJpZ2h0XCIpIG5hbWUgPSBcIkFycm93UmlnaHRcIlxuICBpZiAobmFtZSA9PSBcIkRvd25cIikgbmFtZSA9IFwiQXJyb3dEb3duXCJcbiAgcmV0dXJuIG5hbWVcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=