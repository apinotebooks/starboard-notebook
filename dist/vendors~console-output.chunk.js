(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~console-output"],{

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ "./node_modules/@emotion/cache/dist/cache.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/cache/dist/cache.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/stylis */ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");




// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new _emotion_stylis__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"](stylisOptions);

  if (true) {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if ( true && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  }

  if (true) {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new _emotion_sheet__WEBPACK_IMPORTED_MODULE_0__[/* StyleSheet */ "a"]({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

/* harmony default export */ __webpack_exports__["a"] = (createCache);


/***/ }),

/***/ "./node_modules/@emotion/core/dist/core.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/core/dist/core.browser.esm.js ***!
  \*************************************************************/
/*! exports provided: css, CacheProvider, ClassNames, Global, ThemeContext, jsx, keyframes, withEmotionCache */
/*! exports used: ThemeContext, withEmotionCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CacheProvider */
/* unused harmony export ClassNames */
/* unused harmony export Global */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeContext; });
/* unused harmony export jsx */
/* unused harmony export keyframes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return withEmotionCache; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/cache */ "./node_modules/@emotion/cache/dist/cache.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");
/* harmony import */ var _emotion_sheet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/sheet */ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js");
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/css */ "./node_modules/@emotion/css/dist/css.browser.esm.js");









var EmotionCacheContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? Object(_emotion_cache__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])() : null);
var ThemeContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(render);
};

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__[/* getRegisteredStyles */ "a"])(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__[/* serializeStyles */ "a"])(registeredStyles);

  if ( true && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__[/* serializeStyles */ "a"])([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__[/* insertStyles */ "b"])(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ( false || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(type, newProps);

  return ele;
};

var Emotion =
/* #__PURE__ */
withEmotionCache(function (props, cache, ref) {
  // use Context.read for the theme when it's stable
  if (typeof props.css === 'function') {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (true) {
  Emotion.displayName = 'EmotionCssPropInternal';
} // $FlowFixMe


var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"].apply(undefined, args);
  }

  if ( true && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (true) {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)jsx.*\n\s+at (?:Object\.|)([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  createElementArgArray[1] = newProps;

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"].apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false;
var Global =
/* #__PURE__ */
withEmotionCache(function (props, cache) {
  if ( true && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;

  if (typeof styles === 'function') {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
      var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__[/* serializeStyles */ "a"])([styles(theme)]);
      return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }

  var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__[/* serializeStyles */ "a"])([styles]);
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(InnerGlobal, _React$Component);

  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.sheet = new _emotion_sheet__WEBPACK_IMPORTED_MODULE_5__[/* StyleSheet */ "a"]({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + "=\"" + this.props.serialized.name + "\"]");

    if (node !== null) {
      this.sheet.tags.push(node);
    }

    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }

    this.insertStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  };

  _proto.insertStyles = function insertStyles$1() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__[/* insertStyles */ "b"])(this.props.cache, this.props.serialized.next, true);
    }

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }

    this.props.cache.insert("", this.props.serialized, this.sheet, false);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {

    return null;
  };

  return InnerGlobal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var keyframes = function keyframes() {
  var insertable = _emotion_css__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__[/* getRegisteredStyles */ "a"])(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(ThemeContext.Consumer, null, function (theme) {
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_4__[/* serializeStyles */ "a"])(args, context.registered);

      {
        Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_3__[/* insertStyles */ "b"])(context, serialized, false);
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "development" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    return ele;
  });
});




/***/ }),

/***/ "./node_modules/@emotion/css/dist/css.browser.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/@emotion/css/dist/css.browser.esm.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");


function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_0__[/* serializeStyles */ "a"])(args);
}

/* harmony default export */ __webpack_exports__["a"] = (css);


/***/ }),

/***/ "./node_modules/@emotion/hash/dist/hash.browser.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@emotion/hash/dist/hash.browser.esm.js ***!
  \*************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

/* harmony default export */ __webpack_exports__["a"] = (murmur2);


/***/ }),

/***/ "./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["a"] = (index);


/***/ }),

/***/ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["a"] = (memoize);


/***/ }),

/***/ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emotion/serialize/dist/serialize.browser.esm.js ***!
  \***********************************************************************/
/*! exports provided: serializeStyles */
/*! exports used: serializeStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return serializeStyles; });
/* harmony import */ var _emotion_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/hash */ "./node_modules/@emotion/hash/dist/hash.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/unitless */ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/memoize */ "./node_modules/@emotion/memoize/dist/memoize.browser.esm.js");




var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (_emotion_unitless__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"][key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (true) {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if ( true && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if ( true && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (true) {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if ( true && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if ( true && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if ( true && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if ( true && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (true) {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = Object(_emotion_hash__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(styles) + identifierName;

  if (true) {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};




/***/ }),

/***/ "./node_modules/@emotion/sheet/dist/sheet.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/sheet/dist/sheet.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: StyleSheet */
/*! exports used: StyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleSheet; });
/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "development" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (true) {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();




/***/ }),

/***/ "./node_modules/@emotion/styled-base/dist/styled-base.browser.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@emotion/styled-base/dist/styled-base.browser.esm.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var _emotion_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/utils */ "./node_modules/@emotion/utils/dist/utils.browser.esm.js");
/* harmony import */ var _emotion_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/serialize */ "./node_modules/@emotion/serialize/dist/serialize.browser.esm.js");







var testOmitPropsOnStringTag = _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"];

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme' && key !== 'innerRef';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";

var createStyled = function createStyled(tag, options) {
  if (true) {
    if (tag === undefined) {
      throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
    }
  }

  var identifierName;
  var shouldForwardProp;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
    shouldForwardProp = tag.__emotion_forwardProp && options.shouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && // $FlowFixMe
      options.shouldForwardProp(propName);
    } : options.shouldForwardProp;
  }

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args);
    } else {
      if ( true && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles.push(args[0][0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {
        if ( true && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }

        styles.push(args[i], args[0][i]);
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class


    var Styled = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* withEmotionCache */ "b"])(function (props, context, ref) {
      return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_emotion_core__WEBPACK_IMPORTED_MODULE_3__[/* ThemeContext */ "a"].Consumer, null, function (theme) {
        var finalTag = shouldUseAs && props.as || baseTag;
        var className = '';
        var classInterpolations = [];
        var mergedProps = props;

        if (props.theme == null) {
          mergedProps = {};

          for (var key in props) {
            mergedProps[key] = props[key];
          }

          mergedProps.theme = theme;
        }

        if (typeof props.className === 'string') {
          className = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__[/* getRegisteredStyles */ "a"])(context.registered, classInterpolations, props.className);
        } else if (props.className != null) {
          className = props.className + " ";
        }

        var serialized = Object(_emotion_serialize__WEBPACK_IMPORTED_MODULE_5__[/* serializeStyles */ "a"])(styles.concat(classInterpolations), context.registered, mergedProps);
        var rules = Object(_emotion_utils__WEBPACK_IMPORTED_MODULE_4__[/* insertStyles */ "b"])(context, serialized, typeof finalTag === 'string');
        className += context.key + "-" + serialized.name;

        if (targetClassName !== undefined) {
          className += " " + targetClassName;
        }

        var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
        var newProps = {};

        for (var _key in props) {
          if (shouldUseAs && _key === 'as') continue;

          if ( // $FlowFixMe
          finalShouldForwardProp(_key)) {
            newProps[_key] = props[_key];
          }
        }

        newProps.className = className;
        newProps.ref = ref || props.innerRef;

        if ( true && props.innerRef) {
          console.error('`innerRef` is deprecated and will be removed in a future major version of Emotion, please use the `ref` prop instead' + (identifierName === undefined ? '' : " in the usage of `" + identifierName + "`"));
        }

        var ele = Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(finalTag, newProps);

        return ele;
      });
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (targetClassName === undefined && "development" !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        } // $FlowFixMe: coerce undefined to string


        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      return createStyled(nextTag, nextOptions !== undefined ? _objectSpread({}, options || {}, {}, nextOptions) : options).apply(void 0, styles);
    };

    return Styled;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createStyled);


/***/ }),

/***/ "./node_modules/@emotion/styled/dist/styled.browser.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/styled/dist/styled.browser.esm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled-base */ "./node_modules/@emotion/styled-base/dist/styled-base.browser.esm.js");


var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

var newStyled = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].bind();
tags.forEach(function (tagName) {
  newStyled[tagName] = newStyled(tagName);
});

/* harmony default export */ __webpack_exports__["a"] = (newStyled);


/***/ }),

/***/ "./node_modules/@emotion/stylis/dist/stylis.browser.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ __webpack_exports__["a"] = (stylis_min);


/***/ }),

/***/ "./node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["a"] = (unitlessKeys);


/***/ }),

/***/ "./node_modules/@emotion/utils/dist/utils.browser.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emotion/utils/dist/utils.browser.esm.js ***!
  \***************************************************************/
/*! exports provided: getRegisteredStyles, insertStyles */
/*! exports used: getRegisteredStyles, insertStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRegisteredStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return insertStyles; });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ }),

/***/ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (weakMemoize);


/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/Message.js":
/*!*******************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/Message.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion-theming */ "./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements */ "./node_modules/console-feed-modern/lib/Component/elements.js");
/* harmony import */ var _message_parsers_Formatted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message-parsers/Formatted */ "./node_modules/console-feed-modern/lib/Component/message-parsers/Formatted.js");
/* harmony import */ var _message_parsers_Object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message-parsers/Object */ "./node_modules/console-feed-modern/lib/Component/message-parsers/Object.js");
/* harmony import */ var _message_parsers_Error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./message-parsers/Error */ "./node_modules/console-feed-modern/lib/Component/message-parsers/Error.js");






class ConsoleMessage extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.theme = (theme) => ({
            ...theme,
            method: this.props.log.method
        });
    }
    render() {
        const { log } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](emotion_theming__WEBPACK_IMPORTED_MODULE_1__[/* ThemeProvider */ "a"], { theme: this.theme },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_2__[/* Message */ "c"], { "data-method": log.method },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_2__[/* Icon */ "b"], null),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_2__[/* Content */ "a"], null, this.getNode()))));
    }
    getNode() {
        const { log } = this.props;
        // Error handling
        const error = this.typeCheck(log);
        if (error)
            return error;
        // Chrome formatting
        if (log.data.length > 0 &&
            typeof log.data[0] === 'string' &&
            log.data[0].indexOf('%') > -1) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_message_parsers_Formatted__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], { data: log.data });
        }
        // Error panel
        if (log.data.every(message => typeof message === 'string') &&
            log.method === 'error') {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_message_parsers_Error__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], { log: log });
        }
        // Normal inspector
        const quoted = typeof log.data[0] !== 'string';
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_message_parsers_Object__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], { log: log, quoted: quoted });
    }
    typeCheck(log) {
        if (!log) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_message_parsers_Formatted__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], { data: [
                    `%c[console-feed] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
                    'color: red',
                    'color: orange',
                    'color: cyan'
                ] }));
        }
        else if (!(log.data instanceof Array)) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_message_parsers_Formatted__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], { data: [
                    '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
                    'color: red',
                    'color: orange',
                    'color: cyan'
                ] }));
        }
        return false;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ConsoleMessage);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21wb25lbnQvTWVzc2FnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFFOUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVuRCxPQUFPLFNBQVMsTUFBTSw2QkFBNkIsQ0FBQTtBQUNuRCxPQUFPLFVBQVUsTUFBTSwwQkFBMEIsQ0FBQTtBQUNqRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxNQUFNLGNBQWUsU0FBUSxLQUFLLENBQUMsYUFBZ0M7SUFBbkU7O1FBQ0UsVUFBSyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsS0FBSztZQUNSLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNO1NBQzlCLENBQUMsQ0FBQTtJQXFFSixDQUFDO0lBbkVDLE1BQU07UUFDSixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUMxQixPQUFPLENBQ0wsb0JBQUMsYUFBYSxJQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUM5QixvQkFBQyxPQUFPLG1CQUFjLEdBQUcsQ0FBQyxNQUFNO2dCQUM5QixvQkFBQyxJQUFJLE9BQUc7Z0JBQ1Isb0JBQUMsT0FBTyxRQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBVyxDQUMzQixDQUNJLENBQ2pCLENBQUE7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBRTFCLGlCQUFpQjtRQUNqQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQUksS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFBO1FBRXZCLG9CQUFvQjtRQUNwQixJQUNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDbkIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7WUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzdCO1lBQ0EsT0FBTyxvQkFBQyxTQUFTLElBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUksQ0FBQTtTQUNyQztRQUVELGNBQWM7UUFDZCxJQUNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUN0QjtZQUNBLE9BQU8sb0JBQUMsVUFBVSxJQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUksQ0FBQTtTQUNoQztRQUVELG1CQUFtQjtRQUNuQixNQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFBO1FBQzlDLE9BQU8sb0JBQUMsVUFBVSxJQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBSSxDQUFBO0lBQ2pELENBQUM7SUFFRCxTQUFTLENBQUMsR0FBUTtRQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTyxDQUNMLG9CQUFDLFNBQVMsSUFDUixJQUFJLEVBQUU7b0JBQ0osZ0VBQWdFLE9BQU8sR0FBRyxzQ0FBc0M7b0JBQ2hILFlBQVk7b0JBQ1osZUFBZTtvQkFDZixhQUFhO2lCQUNkLEdBQ0QsQ0FDSCxDQUFBO1NBQ0Y7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sQ0FDTCxvQkFBQyxTQUFTLElBQ1IsSUFBSSxFQUFFO29CQUNKLDBFQUEwRTtvQkFDMUUsWUFBWTtvQkFDWixlQUFlO29CQUNmLGFBQWE7aUJBQ2QsR0FDRCxDQUNILENBQUE7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztDQUNGO0FBRUQsZUFBZSxjQUFjLENBQUEifQ==

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/devtools-parser/format-message.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/devtools-parser/format-message.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatWithSubstitutionString; });
/* harmony import */ var _string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string-utils */ "./node_modules/console-feed-modern/lib/Component/devtools-parser/string-utils.js");

function createAppend(s) {
    const container = document.createDocumentFragment();
    container.appendChild(document.createTextNode(s));
    return container;
}
/**
 * @param {string} format
 * @param {!Array.<!SDK.RemoteObject>} parameters
 * @param {!Element} formattedResult
 */
function formatWithSubstitutionString(format, parameters, formattedResult) {
    const formatters = {};
    function stringFormatter(obj) {
        if (typeof obj !== 'string') {
            return '';
        }
        return String(obj);
    }
    function floatFormatter(obj) {
        if (typeof obj !== 'number')
            return 'NaN';
        return obj;
    }
    function integerFormatter(obj) {
        if (typeof obj !== 'number')
            return 'NaN';
        return Math.floor(obj);
    }
    let currentStyle = null;
    function styleFormatter(obj) {
        currentStyle = {};
        const buffer = document.createElement('span');
        buffer.setAttribute('style', obj);
        for (let i = 0; i < buffer.style.length; i++) {
            const property = buffer.style[i];
            if (isWhitelistedProperty(property))
                currentStyle[property] = buffer.style[property];
        }
    }
    function isWhitelistedProperty(property) {
        const prefixes = [
            'background',
            'border',
            'color',
            'font',
            'line',
            'margin',
            'padding',
            'text',
            '-webkit-background',
            '-webkit-border',
            '-webkit-font',
            '-webkit-margin',
            '-webkit-padding',
            '-webkit-text'
        ];
        for (let i = 0; i < prefixes.length; i++) {
            if (property.startsWith(prefixes[i]))
                return true;
        }
        return false;
    }
    formatters.s = stringFormatter;
    formatters.f = floatFormatter;
    // Firebug allows both %i and %d for formatting integers.
    formatters.i = integerFormatter;
    formatters.d = integerFormatter;
    // Firebug uses %c for styling the message.
    formatters.c = styleFormatter;
    function append(a, b) {
        if (b instanceof Node) {
            a.appendChild(b);
        }
        else if (typeof b !== 'undefined') {
            let toAppend = createAppend(String(b));
            if (currentStyle) {
                let wrapper = document.createElement('span');
                wrapper.appendChild(toAppend);
                applyCurrentStyle(wrapper);
                for (let i = 0; i < wrapper.children.length; ++i)
                    applyCurrentStyle(wrapper.children[i]);
                toAppend = wrapper;
            }
            a.appendChild(toAppend);
        }
        return a;
    }
    /**
     * @param {!Element} element
     */
    function applyCurrentStyle(element) {
        for (var key in currentStyle)
            element.style[key] = currentStyle[key];
    }
    // String.format does treat formattedResult like a Builder, result is an object.
    return _string_utils__WEBPACK_IMPORTED_MODULE_0__[/* String */ "a"].format(format, parameters, formatters, formattedResult, append);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LW1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L2RldnRvb2xzLXBhcnNlci9mb3JtYXQtbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRXRELFNBQVMsWUFBWSxDQUFDLENBQVM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDbkQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFakQsT0FBTyxTQUFTLENBQUE7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLDRCQUE0QixDQUNsRCxNQUFXLEVBQ1gsVUFBZSxFQUNmLGVBQW9CO0lBRXBCLE1BQU0sVUFBVSxHQUFRLEVBQUUsQ0FBQTtJQUUxQixTQUFTLGVBQWUsQ0FBQyxHQUFRO1FBQy9CLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7UUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRUQsU0FBUyxjQUFjLENBQUMsR0FBUTtRQUM5QixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUN6QyxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQVE7UUFDaEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUE7UUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFlBQVksR0FBUSxJQUFJLENBQUE7SUFDNUIsU0FBUyxj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

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/devtools-parser/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/devtools-parser/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var linkifyjs_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! linkifyjs/html */ "./node_modules/linkifyjs/html.js");
/* harmony import */ var linkifyjs_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(linkifyjs_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _format_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./format-message */ "./node_modules/console-feed-modern/lib/Component/devtools-parser/format-message.js");


/**
 * Formats a console log message using the Devtools parser and returns HTML
 * @param args The arguments passed to the console method
 */
function formatMessage(args) {
    const formattedResult = document.createElement('span');
    Object(_format_message__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(args[0], args.slice(1), formattedResult);
    return linkifyjs_html__WEBPACK_IMPORTED_MODULE_0__(formattedResult.outerHTML.replace(/(?:\r\n|\r|\n)/g, '<br />'));
}
/* harmony default export */ __webpack_exports__["a"] = (formatMessage);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L2RldnRvb2xzLXBhcnNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLGdCQUFnQixDQUFBO0FBQ3pDLE9BQU8sbUJBQW1CLE1BQU0sa0JBQWtCLENBQUE7QUFFbEQ7OztHQUdHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBVztJQUNoQyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRXRELG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRTVELE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7QUFDaEYsQ0FBQztBQUVELGVBQWUsYUFBYSxDQUFBIn0=

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/devtools-parser/string-utils.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/devtools-parser/string-utils.js ***!
  \****************************************************************************************/
/*! exports provided: String */
/*! exports used: String */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return String; });
// Taken from the source of chrome devtools:
// https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/platform/utilities.js#L805-L1006
// Copyright 2014 The Chromium Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
var String;
(function (String) {
    /**
     * @param {string} string
     * @param {number} index
     * @return {boolean}
     */
    function isDigitAt(string, index) {
        var c = string.charCodeAt(index);
        return 48 <= c && c <= 57;
    }
    /**
     * @param {string} format
     * @param {!Object.<string, function(string, ...):*>} formatters
     * @return {!Array.<!Object>}
     */
    function tokenizeFormatString(format, formatters) {
        var tokens = [];
        var substitutionIndex = 0;
        function addStringToken(str) {
            if (tokens.length && tokens[tokens.length - 1].type === 'string')
                tokens[tokens.length - 1].value += str;
            else
                tokens.push({ type: 'string', value: str });
        }
        function addSpecifierToken(specifier, precision, substitutionIndex) {
            tokens.push({
                type: 'specifier',
                specifier: specifier,
                precision: precision,
                substitutionIndex: substitutionIndex
            });
        }
        var index = 0;
        for (var precentIndex = format.indexOf('%', index); precentIndex !== -1; precentIndex = format.indexOf('%', index)) {
            if (format.length === index)
                // unescaped % sign at the end of the format string.
                break;
            addStringToken(format.substring(index, precentIndex));
            index = precentIndex + 1;
            if (format[index] === '%') {
                // %% escape sequence.
                addStringToken('%');
                ++index;
                continue;
            }
            if (isDigitAt(format, index)) {
                // The first character is a number, it might be a substitution index.
                var number = parseInt(format.substring(index), 10);
                while (isDigitAt(format, index))
                    ++index;
                // If the number is greater than zero and ends with a "$",
                // then this is a substitution index.
                if (number > 0 && format[index] === '$') {
                    substitutionIndex = number - 1;
                    ++index;
                }
            }
            var precision = -1;
            if (format[index] === '.') {
                // This is a precision specifier. If no digit follows the ".",
                // then the precision should be zero.
                ++index;
                precision = parseInt(format.substring(index), 10);
                if (isNaN(precision))
                    precision = 0;
                while (isDigitAt(format, index))
                    ++index;
            }
            if (!(format[index] in formatters)) {
                addStringToken(format.substring(precentIndex, index + 1));
                ++index;
                continue;
            }
            addSpecifierToken(format[index], precision, substitutionIndex);
            ++substitutionIndex;
            ++index;
        }
        addStringToken(format.substring(index));
        return tokens;
    }
    /**
     * @param {string} format
     * @param {?ArrayLike} substitutions
     * @param {!Object.<string, function(string, ...):Q>} formatters
     * @param {!T} initialValue
     * @param {function(T, Q): T|undefined} append
     * @param {!Array.<!Object>=} tokenizedFormat
     * @return {!{formattedResult: T, unusedSubstitutions: ?ArrayLike}};
     * @template T, Q
     */
    function format(format, substitutions, formatters, initialValue, append, tokenizedFormat) {
        if (!format || !substitutions || !substitutions.length)
            return {
                formattedResult: append(initialValue, format),
                unusedSubstitutions: substitutions
            };
        function prettyFunctionName() {
            return ('String.format("' +
                format +
                '", "' +
                Array.prototype.join.call(substitutions, '", "') +
                '")');
        }
        function warn(msg) {
            console.warn(prettyFunctionName() + ': ' + msg);
        }
        function error(msg) {
            console.error(prettyFunctionName() + ': ' + msg);
        }
        var result = initialValue;
        var tokens = tokenizedFormat || tokenizeFormatString(format, formatters);
        var usedSubstitutionIndexes = {};
        for (var i = 0; i < tokens.length; ++i) {
            var token = tokens[i];
            if (token.type === 'string') {
                result = append(result, token.value);
                continue;
            }
            if (token.type !== 'specifier') {
                error('Unknown token type "' + token.type + '" found.');
                continue;
            }
            if (token.substitutionIndex >= substitutions.length) {
                // If there are not enough substitutions for the current substitutionIndex
                // just output the format specifier literally and move on.
                error('not enough substitution arguments. Had ' +
                    substitutions.length +
                    ' but needed ' +
                    (token.substitutionIndex + 1) +
                    ', so substitution was skipped.');
                result = append(result, '%' + (token.precision > -1 ? token.precision : '') + token.specifier);
                continue;
            }
            usedSubstitutionIndexes[token.substitutionIndex] = true;
            if (!(token.specifier in formatters)) {
                // Encountered an unsupported format character, treat as a string.
                warn('unsupported format character \u201C' +
                    token.specifier +
                    '\u201D. Treating as a string.');
                result = append(result, substitutions[token.substitutionIndex]);
                continue;
            }
            result = append(result, formatters[token.specifier](substitutions[token.substitutionIndex], token));
        }
        var unusedSubstitutions = [];
        for (var i = 0; i < substitutions.length; ++i) {
            if (i in usedSubstitutionIndexes)
                continue;
            unusedSubstitutions.push(substitutions[i]);
        }
        return { formattedResult: result, unusedSubstitutions: unusedSubstitutions };
    }
    String.format = format;
})(String || (String = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbXBvbmVudC9kZXZ0b29scy1wYXJzZXIvc3RyaW5nLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0QztBQUM1Qyw2R0FBNkc7QUFFN0csNERBQTREO0FBQzVELEVBQUU7QUFDRixxRUFBcUU7QUFDckUseUVBQXlFO0FBQ3pFLE9BQU87QUFDUCxFQUFFO0FBQ0Ysc0VBQXNFO0FBQ3RFLGdFQUFnRTtBQUNoRSwrREFBK0Q7QUFDL0QseUVBQXlFO0FBQ3pFLGdFQUFnRTtBQUNoRSxnQkFBZ0I7QUFDaEIsNERBQTREO0FBQzVELHVFQUF1RTtBQUN2RSwyREFBMkQ7QUFDM0QsRUFBRTtBQUNGLHNFQUFzRTtBQUN0RSxvRUFBb0U7QUFDcEUsd0VBQXdFO0FBQ3hFLHVFQUF1RTtBQUN2RSx3RUFBd0U7QUFDeEUsbUVBQW1FO0FBQ25FLHdFQUF3RTtBQUN4RSx3RUFBd0U7QUFDeEUsc0VBQXNFO0FBQ3RFLHdFQUF3RTtBQUN4RSx1RUFBdUU7QUFFdkUsTUFBTSxLQUFXLE1BQU0sQ0EyTXRCO0FBM01ELFdBQWlCLE1BQU07SUFDckI7Ozs7T0FJRztJQUNILFNBQVMsU0FBUyxDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQ3hDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLG9CQUFvQixDQUFDLE1BQVcsRUFBRSxVQUFlO1FBQ3hELElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQTtRQUNwQixJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQTtRQUV6QixTQUFTLGNBQWMsQ0FBQyxHQUFRO1lBQzlCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENB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

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/elements.js":
/*!********************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/elements.js ***!
  \********************************************************************/
/*! exports provided: Root, Message, Icon, Content */
/*! exports used: Content, Icon, Message, Root */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Content; });
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ "./node_modules/console-feed-modern/lib/Component/theme/index.js");

/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */
const Themed = (style, method, styles) => styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
    styles[`LOG_${style.toUpperCase()}`];
/**
 * console-feed
 */
const Root = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('div')({
    wordBreak: 'break-word',
    width: '100%',
});
/**
 * console-message
 */
const Message = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('div')(({ theme: { styles, method } }) => ({
    position: 'relative',
    display: 'flex',
    color: Themed('color', method, styles),
    backgroundColor: Themed('background', method, styles),
    borderTop: `1px solid ${Themed('border', method, styles)}`,
    borderBottom: `1px solid ${Themed('border', method, styles)}`,
    marginTop: -1,
    marginBottom: +/^warn|error$/.test(method),
    paddingLeft: 10,
    boxSizing: 'border-box',
    '& *': {
        verticalAlign: 'top',
        boxSizing: 'border-box',
        fontFamily: styles.BASE_FONT_FAMILY,
        whiteSpace: 'pre-wrap',
        fontSize: styles.BASE_FONT_SIZE
    },
    '& a': {
        color: 'rgb(177, 177, 177)'
    }
}));
/**
 * message-icon
 */
const Icon = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('div')(({ theme: { styles, method } }) => ({
    width: styles.LOG_ICON_WIDTH,
    height: styles.LOG_ICON_HEIGHT,
    backgroundImage: Themed('icon', method, styles),
    backgroundRepeat: 'no-repeat',
    backgroundSize: styles.LOG_ICON_BACKGROUND_SIZE,
    backgroundPosition: '50% 50%'
}));
/**
 * console-content
 */
const Content = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('div')(({ theme: { styles } }) => ({
    clear: 'right',
    position: 'relative',
    padding: styles.PADDING,
    marginLeft: 15,
    minHeight: 18,
    flex: 'auto',
    width: 'calc(100% - 15px)'
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tcG9uZW50L2VsZW1lbnRzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxTQUFTLENBQUE7QUFFNUI7Ozs7R0FJRztBQUNILE1BQU0sTUFBTSxHQUFHLENBQ2IsS0FBYSxFQUNiLE1BQWMsRUFDZCxNQUFrQyxFQUNsQyxFQUFFLENBQ0YsTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO0lBQzVELE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFFdEM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLEtBQUssRUFBRSxNQUFNO0NBQ2QsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RSxRQUFRLEVBQUUsVUFBVTtJQUNwQixPQUFPLEVBQUUsTUFBTTtJQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDdEMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNyRCxTQUFTLEVBQUUsYUFBYSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtJQUMxRCxZQUFZLEVBQUUsYUFBYSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtJQUM3RCxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2IsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsV0FBVyxFQUFFLEVBQUU7SUFDZixTQUFTLEVBQUUsWUFBWTtJQUN2QixLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQUUsS0FBSztRQUNwQixTQUFTLEVBQUUsWUFBWTtRQUN2QixVQUFVLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtRQUNuQyxVQUFVLEVBQUUsVUFBVTtRQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLGNBQWM7S0FDaEM7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsb0JBQW9CO0tBQzVCO0NBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLEtBQUssRUFBRSxNQUFNLENBQUMsY0FBYztJQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLGVBQWU7SUFDOUIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUMvQyxnQkFBZ0IsRUFBRSxXQUFXO0lBQzdCLGNBQWMsRUFBRSxNQUFNLENBQUMsd0JBQXdCO0lBQy9DLGtCQUFrQixFQUFFLFNBQVM7Q0FDOUIsQ0FBQyxDQUFDLENBQUE7QUFFSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0QsS0FBSyxFQUFFLE9BQU87SUFDZCxRQUFRLEVBQUUsVUFBVTtJQUNwQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87SUFDdkIsVUFBVSxFQUFFLEVBQUU7SUFDZCxTQUFTLEVBQUUsRUFBRTtJQUNiLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLG1CQUFtQjtDQUMzQixDQUFDLENBQUMsQ0FBQSJ9

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion-theming */ "./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js");
/* harmony import */ var _theme_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme/default */ "./node_modules/console-feed-modern/lib/Component/theme/default.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements */ "./node_modules/console-feed-modern/lib/Component/elements.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Message */ "./node_modules/console-feed-modern/lib/Component/Message.js");





// https://stackoverflow.com/a/48254637/4089357
const customStringify = function (v) {
    const cache = new Set();
    return JSON.stringify(v, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our set
            cache.add(value);
        }
        return value;
    });
};
class Console extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    constructor() {
        super(...arguments);
        this.theme = () => ({
            variant: this.props.variant || 'light',
            styles: {
                ...Object(_theme_default__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this.props),
                ...this.props.styles
            }
        });
    }
    render() {
        let { filter = [], logs = [], searchKeywords, logFilter } = this.props;
        const regex = new RegExp(searchKeywords);
        const filterFun = logFilter
            ? logFilter
            : log => regex.test(customStringify(log));
        // @ts-ignore
        logs = logs.filter(filterFun);
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](emotion_theming__WEBPACK_IMPORTED_MODULE_1__[/* ThemeProvider */ "a"], { theme: this.theme },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* Root */ "d"], null, logs.map((log, i) => {
                // If the filter is defined and doesn't include the method
                const filtered = filter.length !== 0 &&
                    log.method &&
                    filter.indexOf(log.method) === -1;
                return filtered ? null : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Message__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], { log: log, key: `${log.method}-${i}` }));
            }))));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Console);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tcG9uZW50L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFFL0MsT0FBTyxNQUFNLE1BQU0saUJBQWlCLENBQUE7QUFFcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNqQyxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUE7QUFFL0IsK0NBQStDO0FBQy9DLE1BQU0sZUFBZSxHQUFHLFVBQVMsQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSztRQUMxQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQy9DLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsd0NBQXdDO2dCQUN4QyxPQUFNO2FBQ1A7WUFDRCx5QkFBeUI7WUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNqQjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxNQUFNLE9BQVEsU0FBUSxLQUFLLENBQUMsYUFBeUI7SUFBckQ7O1FBQ0UsVUFBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTztZQUN0QyxNQUFNLEVBQUU7Z0JBQ04sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDckI7U0FDRixDQUFDLENBQUE7SUFnQ0osQ0FBQztJQTlCQyxNQUFNO1FBQ0osSUFBSSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUV0RSxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUV4QyxNQUFNLFNBQVMsR0FBRyxTQUFTO1lBQ3pCLENBQUMsQ0FBQyxTQUFTO1lBQ1gsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUUzQyxhQUFhO1FBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFN0IsT0FBTyxDQUNMLG9CQUFDLGFBQWEsSUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDOUIsb0JBQUMsSUFBSSxRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLDBEQUEwRDtnQkFDMUQsTUFBTSxRQUFRLEdBQ1osTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO29CQUNuQixHQUFHLENBQUMsTUFBTTtvQkFDVixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtnQkFFbkMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDdkIsb0JBQUMsT0FBTyxJQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsR0FBSSxDQUNqRCxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQ0csQ0FDTyxDQUNqQixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBRUQsZUFBZSxPQUFPLENBQUEifQ==

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/message-parsers/Error.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/message-parsers/Error.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var linkifyjs_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! linkifyjs/react */ "./node_modules/linkifyjs/react.js");
/* harmony import */ var linkifyjs_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(linkifyjs_react__WEBPACK_IMPORTED_MODULE_1__);


function splitMessage(message) {
    const breakIndex = message.indexOf('\n');
    // consider that there can be line without a break
    if (breakIndex === -1) {
        return message;
    }
    return message.substr(0, breakIndex);
}
class ErrorPanel extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        const { log } = this.props;
        /* This checks for error logTypes and shortens the message in the console by wrapping
        it a <details /> tag and putting the first line in a <summary /> tag and the other lines
        follow after that. This creates a nice collapsible error message */
        let otherErrorLines;
        const msgLine = log.data.join(' ');
        const firstLine = splitMessage(msgLine);
        const msgArray = msgLine.split('\n');
        if (msgArray.length > 1) {
            otherErrorLines = msgArray.slice(1);
        }
        if (!otherErrorLines) {
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](linkifyjs_react__WEBPACK_IMPORTED_MODULE_1__, null, log.data.join(' '));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("details", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("summary", { style: { outline: 'none', cursor: 'pointer' } }, firstLine),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](linkifyjs_react__WEBPACK_IMPORTED_MODULE_1__, null, otherErrorLines.join('\n\r'))));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ErrorPanel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L21lc3NhZ2UtcGFyc2Vycy9FcnJvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUE7QUFFOUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQTtBQU0xQyxTQUFTLFlBQVksQ0FBQyxPQUFlO0lBQ25DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEMsa0RBQWtEO0lBQ2xELElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sT0FBTyxDQUFBO0tBQ2Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVcsU0FBUSxLQUFLLENBQUMsYUFBeUI7SUFDdEQsTUFBTTtRQUNKLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQzFCOzsyRUFFbUU7UUFDbkUsSUFBSSxlQUFlLENBQUE7UUFDbkIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixlQUFlLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwQztRQUVELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDcEIsT0FBTyxvQkFBQyxPQUFPLFFBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQVcsQ0FBQTtTQUMvQztRQUVELE9BQU8sQ0FDTDtZQUNFLGlDQUFTLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUNuRCxTQUFTLENBQ0Y7WUFDVixvQkFBQyxPQUFPLFFBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBVyxDQUN6QyxDQUNYLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxlQUFlLFVBQVUsQ0FBQSJ9

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/message-parsers/Formatted.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/message-parsers/Formatted.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _react_inspector_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react-inspector/elements */ "./node_modules/console-feed-modern/lib/Component/react-inspector/elements.js");
/* harmony import */ var _devtools_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../devtools-parser */ "./node_modules/console-feed-modern/lib/Component/devtools-parser/index.js");



class Formatted extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_react_inspector_elements__WEBPACK_IMPORTED_MODULE_1__[/* Root */ "c"], { "data-type": "formatted", dangerouslySetInnerHTML: {
                __html: Object(_devtools_parser__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this.props.data || [])
            } }));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Formatted);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWF0dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbXBvbmVudC9tZXNzYWdlLXBhcnNlcnMvRm9ybWF0dGVkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFFbEQsT0FBTyxNQUFNLE1BQU0sb0JBQW9CLENBQUE7QUFNdkMsTUFBTSxTQUFVLFNBQVEsS0FBSyxDQUFDLGFBQXlCO0lBQ3JELE1BQU07UUFDSixPQUFPLENBQ0wsb0JBQUMsSUFBSSxpQkFDTyxXQUFXLEVBQ3JCLHVCQUF1QixFQUFFO2dCQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQzthQUN0QyxHQUNELENBQ0gsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQUVELGVBQWUsU0FBUyxDQUFBIn0=

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/message-parsers/Object.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/message-parsers/Object.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion-theming */ "./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js");
/* harmony import */ var _react_inspector_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react-inspector/elements */ "./node_modules/console-feed-modern/lib/Component/react-inspector/elements.js");
/* harmony import */ var linkifyjs_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! linkifyjs/react */ "./node_modules/linkifyjs/react.js");
/* harmony import */ var linkifyjs_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(linkifyjs_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _react_inspector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../react-inspector */ "./node_modules/console-feed-modern/lib/Component/react-inspector/index.js");





class ObjectTree extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
    render() {
        const { theme, quoted, log } = this.props;
        return log.data.map((message, i) => {
            if (typeof message === 'string') {
                const string = !quoted && message.length ? (`${message} `) : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "\""),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { style: {
                            color: theme.styles.OBJECT_VALUE_STRING_COLOR
                        } }, message),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "\" ")));
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_react_inspector_elements__WEBPACK_IMPORTED_MODULE_2__[/* Root */ "c"], { "data-type": "string", key: i },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](linkifyjs_react__WEBPACK_IMPORTED_MODULE_3__, null, string)));
            }
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_react_inspector__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], { data: message, key: i });
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Object(emotion_theming__WEBPACK_IMPORTED_MODULE_1__[/* withTheme */ "b"])(ObjectTree));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbXBvbmVudC9tZXNzYWdlLXBhcnNlcnMvT2JqZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUU5QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBRWxELE9BQU8sS0FBSyxPQUFPLE1BQU0saUJBQWlCLENBQUE7QUFFMUMsT0FBTyxTQUFTLE1BQU0sb0JBQW9CLENBQUE7QUFRMUMsTUFBTSxVQUFXLFNBQVEsS0FBSyxDQUFDLGFBQXlCO0lBQ3RELE1BQU07UUFDSixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBRXpDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLE1BQU0sTUFBTSxHQUNWLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQzFCLEdBQUcsT0FBTyxHQUFHLENBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FDRjtvQkFDRSx1Q0FBYztvQkFDZCw4QkFDRSxLQUFLLEVBQUU7NEJBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCO3lCQUM5QyxJQUNBLE9BQU8sQ0FDSDtvQkFDUCx3Q0FBZSxDQUNWLENBQ1IsQ0FBQTtnQkFFSCxPQUFPLENBQ0wsb0JBQUMsSUFBSSxpQkFBVyxRQUFRLEVBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzdCLG9CQUFDLE9BQU8sUUFBRSxNQUFNLENBQVcsQ0FDdEIsQ0FDUixDQUFBO2FBQ0Y7WUFFRCxPQUFPLG9CQUFDLFNBQVMsSUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUksQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQUVELGVBQWUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBIn0=

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/react-inspector/elements.js":
/*!************************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/react-inspector/elements.js ***!
  \************************************************************************************/
/*! exports provided: Root, Table, HTML, Constructor */
/*! exports used: Constructor, HTML, Root, Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constructor; });
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme */ "./node_modules/console-feed-modern/lib/Component/theme/index.js");

/**
 * Object root
 */
const Root = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('div')({
    display: 'inline-block',
    wordBreak: 'break-all',
    // Note(gzuidhof): Commented to remove empty line after console output.
    // '&::after': {
    //   content: `' '`,
    //   display: 'inline-block'
    // },
    '& > li': {
        backgroundColor: 'transparent !important',
        display: 'inline-block'
    },
    '& ol:empty': {
        paddingLeft: '0 !important'
    }
});
/**
 * Table
 */
const Table = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('span')({
    '& > li': {
        display: 'inline-block',
        marginTop: 5
    }
});
/**
 * HTML
 */
const HTML = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('span')({
    display: 'inline-block',
    '& div:hover': {
        backgroundColor: 'rgba(255, 220, 158, .05) !important',
        borderRadius: '2px'
    }
});
/**
 * Object constructor
 */
const Constructor = Object(_theme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('span')({
    '& > span > span:nth-child(1)': {
        opacity: 0.6
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3JlYWN0LWluc3BlY3Rvci9lbGVtZW50cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFBO0FBRTdCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsY0FBYztJQUN2QixTQUFTLEVBQUUsV0FBVztJQUN0Qix1RUFBdUU7SUFDdkUsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIsS0FBSztJQUNMLFFBQVEsRUFBRTtRQUNSLGVBQWUsRUFBRSx3QkFBd0I7UUFDekMsT0FBTyxFQUFFLGNBQWM7S0FDeEI7SUFDRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUsY0FBYztLQUM1QjtDQUNGLENBQUMsQ0FBQTtBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsY0FBYztRQUN2QixTQUFTLEVBQUUsQ0FBQztLQUNiO0NBQ0YsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLGFBQWEsRUFBRTtRQUNiLGVBQWUsRUFBRSxxQ0FBcUM7UUFDdEQsWUFBWSxFQUFFLEtBQUs7S0FDcEI7Q0FDRixDQUFDLENBQUE7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsOEJBQThCLEVBQUU7UUFDOUIsT0FBTyxFQUFFLEdBQUc7S0FDYjtDQUNGLENBQUMsQ0FBQSJ9

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/react-inspector/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/react-inspector/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! emotion-theming */ "./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_inspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-inspector */ "./node_modules/react-inspector/dist/es/react-inspector.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements */ "./node_modules/console-feed-modern/lib/Component/react-inspector/elements.js");




const CustomObjectLabel = ({ name, data, isNonenumerable = false }) => (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null,
    typeof name === 'string' ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectName */ "d"], { name: name, dimmed: isNonenumerable })) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectPreview */ "e"], { data: name })),
    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, ": "),
    react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectValue */ "g"], { object: data })));
class CustomInspector extends react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"] {
    render() {
        const { data, theme } = this.props;
        const { styles, method } = theme;
        const dom = data instanceof HTMLElement;
        const table = method === 'table';
        return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* Root */ "c"], { "data-type": table ? 'table' : dom ? 'html' : 'object' }, table ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* Table */ "d"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* Inspector */ "b"], Object.assign({}, this.props, { theme: styles, table: true })),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* Inspector */ "b"], Object.assign({}, this.props, { theme: styles })))) : dom ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* HTML */ "b"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* DOMInspector */ "a"], Object.assign({}, this.props, { theme: styles })))) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* Inspector */ "b"], Object.assign({}, this.props, { theme: styles, nodeRenderer: this.nodeRenderer.bind(this) })))));
    }
    getCustomNode(data) {
        const { styles } = this.props.theme;
        const constructor = data && data.constructor ? data.constructor.name : null;
        if (data && data['$$'] !== undefined && data['$$']['type'] === 'PyProxy') {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { fontStyle: 'italic' } },
                "PyProxy ",
                `{`,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { color: 'rgb(79, 186, 240)' } }, data.toString()),
                `}`));
        }
        if (data && data[Symbol.toStringTag] === 'Module') {
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { fontStyle: 'italic' } },
                "Module ",
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectPreview */ "e"], { data: data })));
        }
        if (constructor === 'Function')
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { fontStyle: 'italic' } },
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectPreview */ "e"], { data: data }),
                ` {`,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { color: 'rgb(181, 181, 181)' } }, data.body),
                `}`));
        if (constructor === 'Promise')
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { fontStyle: 'italic' } },
                "Promise ",
                `{`,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", { style: { opacity: 0.6 } }, `<pending>`),
                `}`));
        if (data instanceof HTMLElement)
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* HTML */ "b"], null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* DOMInspector */ "a"], { data: data, theme: styles })));
        return null;
    }
    nodeRenderer(props) {
        let { depth, name, data, isNonenumerable } = props;
        // Root
        if (depth === 0) {
            const customNode = this.getCustomNode(data);
            return customNode || react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectRootLabel */ "f"], { name: name, data: data });
        }
        if (name === 'constructor')
            return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* Constructor */ "a"], null,
                react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectLabel */ "c"], { name: "<constructor>", data: data.name, isNonenumerable: isNonenumerable })));
        const customNode = this.getCustomNode(data);
        return customNode ? (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_elements__WEBPACK_IMPORTED_MODULE_3__[/* Root */ "c"], null,
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_inspector__WEBPACK_IMPORTED_MODULE_2__[/* ObjectName */ "d"], { name: name }),
            react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", null, ": "),
            customNode)) : (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](CustomObjectLabel, { name: name, data: data, isNonenumerable: isNonenumerable }));
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Object(emotion_theming__WEBPACK_IMPORTED_MODULE_0__[/* withTheme */ "b"])(CustomInspector));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3JlYWN0LWluc3BlY3Rvci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzNDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFBO0FBQzlCLE9BQU8sRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULFdBQVcsRUFDWCxVQUFVLEVBQ1YsZUFBZSxFQUNmLFdBQVcsRUFDWCxhQUFhLEVBQ2QsTUFBTSxpQkFBaUIsQ0FBQTtBQUd4QixPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBTzNELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUNyRTtJQUNHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDMUIsb0JBQUMsVUFBVSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsR0FBSSxDQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUNGLG9CQUFDLGFBQWEsSUFBQyxJQUFJLEVBQUUsSUFBSSxHQUFJLENBQzlCO0lBQ0QsdUNBQWU7SUFDZixvQkFBQyxXQUFXLElBQUMsTUFBTSxFQUFFLElBQUksR0FBSSxDQUN4QixDQUNSLENBQUE7QUFFRCxNQUFNLGVBQWdCLFNBQVEsS0FBSyxDQUFDLGFBQXlCO0lBQzNELE1BQU07UUFDSixNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDbEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUE7UUFFaEMsTUFBTSxHQUFHLEdBQUcsSUFB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

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/theme/default.js":
/*!*************************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/theme/default.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_inspector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-inspector */ "./node_modules/react-inspector/dist/es/react-inspector.js");

const styles = (props) => ({
    ...((props.variant || 'light') === 'light' ? react_inspector__WEBPACK_IMPORTED_MODULE_0__[/* chromeLight */ "i"] : react_inspector__WEBPACK_IMPORTED_MODULE_0__[/* chromeDark */ "h"]),
    /**
     * General
     */
    PADDING: '3px 22px 2px 0',
    /**
     * Default log styles
     */
    LOG_COLOR: 'rgba(255,255,255,0.9)',
    LOG_BACKGROUND: 'transparent',
    LOG_BORDER: 'rgba(255,255,255,0.03)',
    LOG_ICON_WIDTH: 10,
    LOG_ICON_HEIGHT: 18,
    LOG_ICON: 'none',
    /**
     * Log types
     */
    LOG_WARN_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACkSURBVChTbY7BCoJQFERn0Q/3BX1JuxQjsSCXiV8gtCgxhCIrKIRIqKDVzXl5w5cNHBjm6eGinXiAXu5inY2xYm/mbpIh+vcFhLA3sx0athNUhymEsP+10lAEEA17x8o/9wFuNGnYuVlWve0SQl7P0sBu3aq2R1Q/1JzSkYGd29eqNv2wjdnUuvNRciC/N+qe+7gidbA8zyHkOINsvA/sumcOkjcabcBmw2+mMgAAAABJRU5ErkJggg==)`,
    LOG_WARN_BACKGROUND: '#332b00',
    LOG_WARN_COLOR: '#ffdc9e',
    LOG_WARN_BORDER: '#650',
    LOG_ERROR_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVChTY4CB7ZI8tmfU5E6e01b+DMIgNkgMKg0BR9Vkux6YWPx/bemIgkFiIDmwogOaqrYPzazAEm8DwuGKYGyQHEgNw0VT05Mwib9v3v7/kJEHxiA2TDFIDcNNU4vPMFPACj58/P/v40cwGyYOUsNwy8IZRSFIEUgxskKQGoZrzp4ErQapYbgYHG371M4dLACTQGaD5EBqwD6/FpzQ9dTBE64IhkFiIDmwIhi4mlJqey8o4eR9r8jPIAxig8QgsgwMAFZz1YtGPXgjAAAAAElFTkSuQmCC)`,
    LOG_ERROR_BACKGROUND: '#290000',
    LOG_ERROR_BORDER: '#5b0000',
    LOG_ERROR_COLOR: '#ff8080',
    LOG_DEBUG_ICON: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 459 459'%3e%3cpath fill='%234D88FF' d='M433.5 127.5h-71.4a177.7 177.7 0 0 0-45.9-51L357 35.7 321.3 0l-56.1 56.1c-10.2-2.6-23-5.1-35.7-5.1s-25.5 2.5-35.7 5.1L137.7 0 102 35.7l40.8 40.8a177.7 177.7 0 0 0-45.9 51H25.5v51H79c-2.5 7.7-2.5 17.9-2.5 25.5v25.5h-51v51h51V306a88 88 0 0 0 2.5 25.5H25.5v51h71.4A152.2 152.2 0 0 0 229.5 459c56.1 0 107.1-30.6 132.6-76.5h71.4v-51H380c2.5-7.7 2.5-17.9 2.5-25.5v-25.5h51v-51h-51V204c0-7.7 0-17.9-2.5-25.5h53.5v-51zm-153 204h-102v-51h102v51zm0-102h-102v-51h102v51z'/%3e%3c/svg%3e")`,
    LOG_DEBUG_BACKGROUND: '',
    LOG_DEBUG_BORDER: '',
    LOG_DEBUG_COLOR: '#4D88FF',
    LOG_COMMAND_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVChTY6AtmDx5cvnUqVP1oFzsoL+/XwCo8DEQv584caIVVBg7mDBhghxQ4Y2+vr6vU6ZM8YAKYwdA00SB+CxQ8S+g4jCoMCYgSiFRVpPkGaAiHMHDwAAA5Ko+F4/l6+MAAAAASUVORK5CYII=)`,
    LOG_RESULT_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABpSURBVChTY6A92LNnj96uXbvKoVzsYMeOHVbbt29/D1T4eP/+/QJQYVSwe/duD6CCr0B8A8iWgwqjAqBk2NatW38B6bPbtm0TBYkBFbsA+c9ANFgRCBCtEASAAoSthgGiPAMD2IOHgQEA521bM7uG52wAAAAASUVORK5CYII=)`,
    LOG_INFO_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVChTY4ABp/AztmZBZ07qe538rO114rOa8+GTskYHbKHSEOARd6nLIOTsf61gIA46U6kVePYQiK3uc/K/hPG+LrCi8IyrtkZh5yCKgk/80w46ba0RdGYGhH/2v6rXyf88qtttGVwSLp2ECQLxeiAu1wo6uwpJ7L+o2f6TDA6xZz8jCyqFnuHXCj4djywmZXHoM/EK0azGqhBsNYpngL6VCTnGqRF4xgKo+D5IDO4ZEEAKnjcQBafvqwWf/YoSPDCAP8AZGAC7mLM81zgOTQAAAABJRU5ErkJggg==)`,
    /**
     * Fonts
     */
    BASE_FONT_FAMILY: 'Consolas, Lucida Console, Courier New, monospace',
    BASE_FONT_SIZE: '12px',
    /**
     * Other
     */
    ARROW_FONT_SIZE: 10,
    OBJECT_VALUE_STRING_COLOR: 'rgb(233,63,59)'
});
/* harmony default export */ __webpack_exports__["a"] = (styles);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db21wb25lbnQvdGhlbWUvZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBSXpELE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FDOUIsQ0FBQztJQUNDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN0RTs7T0FFRztJQUNILE9BQU8sRUFBRSxnQkFBZ0I7SUFFekI7O09BRUc7SUFDSCxTQUFTLEVBQUUsdUJBQXVCO0lBQ2xDLGNBQWMsRUFBRSxhQUFhO0lBQzdCLFVBQVUsRUFBRSx3QkFBd0I7SUFDcEMsY0FBYyxFQUFFLEVBQUU7SUFDbEIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsUUFBUSxFQUFFLE1BQU07SUFFaEI7O09BRUc7SUFDSCxhQUFhLEVBQUUseVlBQXlZO0lBQ3haLG1CQUFtQixFQUFFLFNBQVM7SUFDOUIsY0FBYyxFQUFFLFNBQVM7SUFDekIsZUFBZSxFQUFFLE1BQU07SUFFdkIsY0FBYyxFQUFFLGliQUFpYjtJQUNqYyxvQkFBb0IsRUFBRSxTQUFTO0lBQy9CLGdCQUFnQixFQUFFLFNBQVM7SUFDM0IsZUFBZSxFQUFFLFNBQVM7SUFFMUIsY0FBYyxFQUFFLGttQkFBa21CO0lBQ2xuQixvQkFBb0IsRUFBRSxFQUFFO0lBQ3hCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsZUFBZSxFQUFFLFNBQVM7SUFFMUIsZ0JBQWdCLEVBQUUscVNBQXFTO0lBQ3ZULGVBQWUsRUFBRSx5VEFBeVQ7SUFDMVUsYUFBYSxFQUFFLHliQUF5YjtJQUV4Yzs7T0FFRztJQUNILGdCQUFnQixFQUFFLGtEQUFrRDtJQUNwRSxjQUFjLEVBQUUsTUFBTTtJQUV0Qjs7T0FFRztJQUNILGVBQWUsRUFBRSxFQUFFO0lBQ25CLHlCQUF5QixFQUFFLGdCQUFnQjtDQUNqQyxDQUFBLENBQUE7QUFFZCxlQUFlLE1BQU0sQ0FBQSJ9

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Component/theme/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Component/theme/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/styled.browser.esm.js");

/* harmony default export */ __webpack_exports__["a"] = (_emotion_styled__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3RoZW1lL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBd0IsTUFBTSxpQkFBaUIsQ0FBQTtBQUd0RCxlQUFlLE1BQStCLENBQUEifQ==

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/Unhook/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/Unhook/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Unhook a console constructor and restore back the Native methods
 * @argument console The Console constructor to Hook
 */
function Unhook(console) {
    if (console.feed) {
        for (const method of Object.keys(console.feed.pointers)) {
            console[method] = console.feed.pointers[method];
        }
        return delete console.feed;
    }
    else {
        return false;
    }
}
/* unused harmony default export */ var _unused_webpack_default_export = (Unhook);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvVW5ob29rL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7R0FHRztBQUNILFNBQVMsTUFBTSxDQUFDLE9BQXNCO0lBQ3BDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtRQUNoQixLQUFLLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2RCxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDaEQ7UUFDRCxPQUFPLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQTtLQUMzQjtTQUFNO1FBQ0wsT0FBTyxLQUFLLENBQUE7S0FDYjtBQUNILENBQUM7QUFFRCxlQUFlLE1BQU0sQ0FBQSJ9

/***/ }),

/***/ "./node_modules/console-feed-modern/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/console-feed-modern/lib/index.js ***!
  \*******************************************************/
/*! exports provided: Console, Hook, Unhook, Decode, Encode */
/*! exports used: Console */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./node_modules/console-feed-modern/lib/Component/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _Component__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony import */ var _Hook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hook */ "./node_modules/console-feed-modern/lib/Hook/index.js");
/* harmony import */ var _Unhook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Unhook */ "./node_modules/console-feed-modern/lib/Unhook/index.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./node_modules/console-feed-modern/lib/Transform/index.js");





//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDaEQsT0FBTyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDeEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFBIn0=

/***/ }),

/***/ "./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js":
/*!**************************************************************************!*\
  !*** ./node_modules/emotion-theming/dist/emotion-theming.browser.esm.js ***!
  \**************************************************************************/
/*! exports provided: ThemeProvider, useTheme, withTheme */
/*! exports used: ThemeProvider, withTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemeProvider; });
/* unused harmony export useTheme */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return withTheme; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var _emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/weak-memoize */ "./node_modules/@emotion/weak-memoize/dist/weak-memoize.browser.esm.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    if ( true && (mergedTheme == null || typeof mergedTheme !== 'object' || Array.isArray(mergedTheme))) {
      throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
    }

    return mergedTheme;
  }

  if ( true && (theme == null || typeof theme !== 'object' || Array.isArray(theme))) {
    throw new Error('[ThemeProvider] Please make your theme prop a plain object');
  }

  return _objectSpread({}, outerTheme, {}, theme);
};

var createCacheWithTheme = Object(_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(function (outerTheme) {
  return Object(_emotion_weak_memoize__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(function (theme) {
    return getTheme(outerTheme, theme);
  });
});

var ThemeProvider = function ThemeProvider(props) {
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* ThemeContext */ "a"].Consumer, null, function (theme) {
    if (props.theme !== theme) {
      theme = createCacheWithTheme(theme)(props.theme);
    }

    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* ThemeContext */ "a"].Provider, {
      value: theme
    }, props.children);
  });
};

// should we change this to be forwardRef/withCSSContext style so it doesn't merge with props?
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* ThemeContext */ "a"].Consumer, null, function (theme) {
      return Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_4___default()({
        theme: theme,
        ref: ref
      }, props));
    });
  }; // $FlowFixMe


  var WithTheme = Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default()(WithTheme, Component);
}

function useTheme() {
  return react__WEBPACK_IMPORTED_MODULE_1__["default"].useContext(_emotion_core__WEBPACK_IMPORTED_MODULE_2__[/* ThemeContext */ "a"]);
}




/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/is-dom/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-dom/index.js ***!
  \**************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! is-object */ "./node_modules/is-object/index.js")
var isWindow = __webpack_require__(/*! is-window */ "./node_modules/is-window/index.js")

function isNode (val) {
  if (!isObject(val) || !isWindow(window) || typeof window.Node !== 'function') {
    return false
  }

  return typeof val.nodeType === 'number' &&
    typeof val.nodeName === 'string'
}

module.exports = isNode


/***/ }),

/***/ "./node_modules/is-object/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-object/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};


/***/ }),

/***/ "./node_modules/is-window/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-window/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {

  if (obj == null) {
    return false;
  }

  var o = Object(obj);

  return o === o.window;
};


/***/ }),

/***/ "./node_modules/linkifyjs/html.js":
/*!****************************************!*\
  !*** ./node_modules/linkifyjs/html.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/linkify-html */ "./node_modules/linkifyjs/lib/linkify-html.js").default;


/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify-html.js":
/*!****************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify-html.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = linkifyHtml;

var _simpleHtmlTokenizer = __webpack_require__(/*! ./simple-html-tokenizer */ "./node_modules/linkifyjs/lib/simple-html-tokenizer.js");

var _simpleHtmlTokenizer2 = _interopRequireDefault(_simpleHtmlTokenizer);

var _linkify = __webpack_require__(/*! ./linkify */ "./node_modules/linkifyjs/lib/linkify.js");

var linkify = _interopRequireWildcard(_linkify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = linkify.options;
var Options = options.Options;


var StartTag = 'StartTag';
var EndTag = 'EndTag';
var Chars = 'Chars';
var Comment = 'Comment';

/**
	`tokens` and `token` in this section refer to tokens generated by the HTML
	parser.
*/
function linkifyHtml(str) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var tokens = _simpleHtmlTokenizer2.default.tokenize(str);
	var linkifiedTokens = [];
	var linkified = [];
	var i;

	opts = new Options(opts);

	// Linkify the tokens given by the parser
	for (i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		if (token.type === StartTag) {
			linkifiedTokens.push(token);

			// Ignore all the contents of ignored tags
			var tagName = token.tagName.toUpperCase();
			var isIgnored = tagName === 'A' || options.contains(opts.ignoreTags, tagName);
			if (!isIgnored) {
				continue;
			}

			var preskipLen = linkifiedTokens.length;
			skipTagTokens(tagName, tokens, ++i, linkifiedTokens);
			i += linkifiedTokens.length - preskipLen - 1;
			continue;
		} else if (token.type !== Chars) {
			// Skip this token, it's not important
			linkifiedTokens.push(token);
			continue;
		}

		// Valid text token, linkify it!
		var linkifedChars = linkifyChars(token.chars, opts);
		linkifiedTokens.push.apply(linkifiedTokens, linkifedChars);
	}

	// Convert the tokens back into a string
	for (i = 0; i < linkifiedTokens.length; i++) {
		var _token = linkifiedTokens[i];
		switch (_token.type) {
			case StartTag:
				{
					var link = '<' + _token.tagName;
					if (_token.attributes.length > 0) {
						var attrs = attrsToStrings(_token.attributes);
						link += ' ' + attrs.join(' ');
					}
					link += '>';
					linkified.push(link);
					break;
				}
			case EndTag:
				linkified.push('</' + _token.tagName + '>');
				break;
			case Chars:
				linkified.push(escapeText(_token.chars));
				break;
			case Comment:
				linkified.push('<!--' + escapeText(_token.chars) + '-->');
				break;
		}
	}

	return linkified.join('');
}

/**
	`tokens` and `token` in this section referes to tokens returned by
	`linkify.tokenize`. `linkified` will contain HTML Parser-style tokens
*/
function linkifyChars(str, opts) {
	var tokens = linkify.tokenize(str);
	var result = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		if (token.type === 'nl' && opts.nl2br) {
			result.push({
				type: StartTag,
				tagName: 'br',
				attributes: [],
				selfClosing: true
			});
			continue;
		} else if (!token.isLink || !opts.check(token)) {
			result.push({ type: Chars, chars: token.toString() });
			continue;
		}

		var _opts$resolve = opts.resolve(token),
		    formatted = _opts$resolve.formatted,
		    formattedHref = _opts$resolve.formattedHref,
		    tagName = _opts$resolve.tagName,
		    className = _opts$resolve.className,
		    target = _opts$resolve.target,
		    attributes = _opts$resolve.attributes;

		// Build up attributes


		var attributeArray = [['href', formattedHref]];

		if (className) {
			attributeArray.push(['class', className]);
		}

		if (target) {
			attributeArray.push(['target', target]);
		}

		for (var attr in attributes) {
			attributeArray.push([attr, attributes[attr]]);
		}

		// Add the required tokens
		result.push({
			type: StartTag,
			tagName: tagName,
			attributes: attributeArray,
			selfClosing: false
		});
		result.push({ type: Chars, chars: formatted });
		result.push({ type: EndTag, tagName: tagName });
	}

	return result;
}

/**
	Returns a list of tokens skipped until the closing tag of tagName.

	* `tagName` is the closing tag which will prompt us to stop skipping
	* `tokens` is the array of tokens generated by HTML5Tokenizer which
	* `i` is the index immediately after the opening tag to skip
	* `skippedTokens` is an array which skipped tokens are being pushed into

	Caveats

	* Assumes that i is the first token after the given opening tagName
	* The closing tag will be skipped, but nothing after it
	* Will track whether there is a nested tag of the same type
*/
function skipTagTokens(tagName, tokens, i, skippedTokens) {

	// number of tokens of this type on the [fictional] stack
	var stackCount = 1;

	while (i < tokens.length && stackCount > 0) {
		var token = tokens[i];

		if (token.type === StartTag && token.tagName.toUpperCase() === tagName) {
			// Nested tag of the same type, "add to stack"
			stackCount++;
		} else if (token.type === EndTag && token.tagName.toUpperCase() === tagName) {
			// Closing tag
			stackCount--;
		}

		skippedTokens.push(token);
		i++;
	}

	// Note that if stackCount > 0 here, the HTML is probably invalid
	return skippedTokens;
}

function escapeText(text) {
	// Not required, HTML tokenizer ensures this occurs properly
	return text;
}

function escapeAttr(attr) {
	return attr.replace(/"/g, '&quot;');
}

function attrsToStrings(attrs) {
	var attrStrs = [];
	for (var i = 0; i < attrs.length; i++) {
		var _attrs$i = attrs[i],
		    name = _attrs$i[0],
		    value = _attrs$i[1];

		attrStrs.push(name + '="' + escapeAttr(value) + '"');
	}
	return attrStrs;
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify-react.js":
/*!*****************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify-react.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");

var _react2 = _interopRequireDefault(_react);

var _linkify = __webpack_require__(/*! ./linkify */ "./node_modules/linkifyjs/lib/linkify.js");

var linkify = _interopRequireWildcard(_linkify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = linkify.options;
var Options = options.Options;

// Given a string, converts to an array of valid React components
// (which may include strings)

function stringToElements(str, opts) {

	var tokens = linkify.tokenize(str);
	var elements = [];
	var linkId = 0;

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];

		if (token.type === 'nl' && opts.nl2br) {
			elements.push(_react2.default.createElement('br', { key: 'linkified-' + ++linkId }));
			continue;
		} else if (!token.isLink || !opts.check(token)) {
			// Regular text
			elements.push(token.toString());
			continue;
		}

		var _opts$resolve = opts.resolve(token),
		    formatted = _opts$resolve.formatted,
		    formattedHref = _opts$resolve.formattedHref,
		    tagName = _opts$resolve.tagName,
		    className = _opts$resolve.className,
		    target = _opts$resolve.target,
		    attributes = _opts$resolve.attributes;

		var props = {
			key: 'linkified-' + ++linkId,
			href: formattedHref
		};

		if (className) {
			props.className = className;
		}

		if (target) {
			props.target = target;
		}

		// Build up additional attributes
		// Support for events via attributes hash
		if (attributes) {
			for (var attr in attributes) {
				props[attr] = attributes[attr];
			}
		}

		elements.push(_react2.default.createElement(tagName, props, formatted));
	}

	return elements;
}

// Recursively linkify the contents of the given React Element instance
function linkifyReactElement(element, opts) {
	var elementId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	if (_react2.default.Children.count(element.props.children) === 0) {
		// No need to clone if the element had no children
		return element;
	}

	var children = [];

	_react2.default.Children.forEach(element.props.children, function (child) {
		if (typeof child === 'string') {
			// ensure that we always generate unique element IDs for keys
			elementId = elementId + 1;
			children.push.apply(children, stringToElements(child, opts));
		} else if (_react2.default.isValidElement(child)) {
			if (typeof child.type === 'string' && options.contains(opts.ignoreTags, child.type.toUpperCase())) {
				// Don't linkify this element
				children.push(child);
			} else {
				children.push(linkifyReactElement(child, opts, ++elementId));
			}
		} else {
			// Unknown element type, just push
			children.push(child);
		}
	});

	// Set a default unique key, copy over remaining props
	var newProps = { key: 'linkified-element-' + elementId };
	for (var prop in element.props) {
		newProps[prop] = element.props[prop];
	}

	return _react2.default.cloneElement(element, newProps, children);
}

var Linkify = function (_React$Component) {
	_inherits(Linkify, _React$Component);

	function Linkify() {
		_classCallCheck(this, Linkify);

		return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	Linkify.prototype.render = function render() {
		// Copy over all non-linkify-specific props
		var newProps = { key: 'linkified-element-0' };
		for (var prop in this.props) {
			if (prop !== 'options' && prop !== 'tagName') {
				newProps[prop] = this.props[prop];
			}
		}

		var opts = new Options(this.props.options);
		var tagName = this.props.tagName || 'span';
		var element = _react2.default.createElement(tagName, newProps);

		return linkifyReactElement(element, opts, 0);
	};

	return Linkify;
}(_react2.default.Component);

exports.default = Linkify;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify.js":
/*!***********************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.inherits = exports.find = undefined;

var _class = __webpack_require__(/*! ./linkify/utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

var _options = __webpack_require__(/*! ./linkify/utils/options */ "./node_modules/linkifyjs/lib/linkify/utils/options.js");

var options = _interopRequireWildcard(_options);

var _scanner = __webpack_require__(/*! ./linkify/core/scanner */ "./node_modules/linkifyjs/lib/linkify/core/scanner.js");

var scanner = _interopRequireWildcard(_scanner);

var _parser = __webpack_require__(/*! ./linkify/core/parser */ "./node_modules/linkifyjs/lib/linkify/core/parser.js");

var parser = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

/**
	Converts a string into tokens that represent linkable and non-linkable bits
	@method tokenize
	@param {String} str
	@return {Array} tokens
*/
var tokenize = function tokenize(str) {
	return parser.run(scanner.run(str));
};

/**
	Returns a list of linkable items in the given string.
*/
var find = function find(str) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	var tokens = tokenize(str);
	var filtered = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.isLink && (!type || token.type === type)) {
			filtered.push(token.toObject());
		}
	}

	return filtered;
};

/**
	Is the given string valid linkable text of some sort
	Note that this does not trim the text for you.

	Optionally pass in a second `type` param, which is the type of link to test
	for.

	For example,

		test(str, 'email');

	Will return `true` if str is a valid email.
*/
var test = function test(str) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	var tokens = tokenize(str);
	return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
};

// Scanner and parser provide states and tokens for the lexicographic stage
// (will be used to add additional link types)
exports.find = find;
exports.inherits = _class.inherits;
exports.options = options;
exports.parser = parser;
exports.scanner = scanner;
exports.test = test;
exports.tokenize = tokenize;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/parser.js":
/*!***********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/parser.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__(/*! ./state */ "./node_modules/linkifyjs/lib/linkify/core/state.js");

var _multi = __webpack_require__(/*! ./tokens/multi */ "./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js");

var MULTI_TOKENS = _interopRequireWildcard(_multi);

var _text = __webpack_require__(/*! ./tokens/text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main parser
*/

var makeState = function makeState(tokenClass) {
	return new _state.TokenState(tokenClass);
};

// The universal starting state.
var S_START = makeState();

// Intermediate states for URLs. Note that domains that begin with a protocol
// are treated slighly differently from those that don't.
var S_PROTOCOL = makeState(); // e.g., 'http:'
var S_MAILTO = makeState(); // 'mailto:'
var S_PROTOCOL_SLASH = makeState(); // e.g., '/', 'http:/''
var S_PROTOCOL_SLASH_SLASH = makeState(); // e.g., '//', 'http://'
var S_DOMAIN = makeState(); // parsed string ends with a potential domain name (A)
var S_DOMAIN_DOT = makeState(); // (A) domain followed by DOT
var S_TLD = makeState(_multi.URL); // (A) Simplest possible URL with no query string
var S_TLD_COLON = makeState(); // (A) URL followed by colon (potential port number here)
var S_TLD_PORT = makeState(_multi.URL); // TLD followed by a port number
var S_URL = makeState(_multi.URL); // Long URL with optional port and maybe query string
var S_URL_NON_ACCEPTING = makeState(); // URL followed by some symbols (will not be part of the final URL)
var S_URL_OPENBRACE = makeState(); // URL followed by {
var S_URL_OPENBRACKET = makeState(); // URL followed by [
var S_URL_OPENANGLEBRACKET = makeState(); // URL followed by <
var S_URL_OPENPAREN = makeState(); // URL followed by (
var S_URL_OPENBRACE_Q = makeState(_multi.URL); // URL followed by { and some symbols that the URL can end it
var S_URL_OPENBRACKET_Q = makeState(_multi.URL); // URL followed by [ and some symbols that the URL can end it
var S_URL_OPENANGLEBRACKET_Q = makeState(_multi.URL); // URL followed by < and some symbols that the URL can end it
var S_URL_OPENPAREN_Q = makeState(_multi.URL); // URL followed by ( and some symbols that the URL can end it
var S_URL_OPENBRACE_SYMS = makeState(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it
var S_URL_OPENBRACKET_SYMS = makeState(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it
var S_URL_OPENANGLEBRACKET_SYMS = makeState(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it
var S_URL_OPENPAREN_SYMS = makeState(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it
var S_EMAIL_DOMAIN = makeState(); // parsed string starts with local email info + @ with a potential domain name (C)
var S_EMAIL_DOMAIN_DOT = makeState(); // (C) domain followed by DOT
var S_EMAIL = makeState(_multi.EMAIL); // (C) Possible email address (could have more tlds)
var S_EMAIL_COLON = makeState(); // (C) URL followed by colon (potential port number here)
var S_EMAIL_PORT = makeState(_multi.EMAIL); // (C) Email address with a port
var S_MAILTO_EMAIL = makeState(_multi.MAILTOEMAIL); // Email that begins with the mailto prefix (D)
var S_MAILTO_EMAIL_NON_ACCEPTING = makeState(); // (D) Followed by some non-query string chars
var S_LOCALPART = makeState(); // Local part of the email address
var S_LOCALPART_AT = makeState(); // Local part of the email address plus @
var S_LOCALPART_DOT = makeState(); // Local part of the email address plus '.' (localpart cannot end in .)
var S_NL = makeState(_multi.NL); // single new line

// Make path from start to protocol (with '//')
S_START.on(_text.NL, S_NL).on(_text.PROTOCOL, S_PROTOCOL).on(_text.MAILTO, S_MAILTO).on(_text.SLASH, S_PROTOCOL_SLASH);

S_PROTOCOL.on(_text.SLASH, S_PROTOCOL_SLASH);
S_PROTOCOL_SLASH.on(_text.SLASH, S_PROTOCOL_SLASH_SLASH);

// The very first potential domain name
S_START.on(_text.TLD, S_DOMAIN).on(_text.DOMAIN, S_DOMAIN).on(_text.LOCALHOST, S_TLD).on(_text.NUM, S_DOMAIN);

// Force URL for protocol followed by anything sane
S_PROTOCOL_SLASH_SLASH.on(_text.TLD, S_URL).on(_text.DOMAIN, S_URL).on(_text.NUM, S_URL).on(_text.LOCALHOST, S_URL);

// Account for dots and hyphens
// hyphens are usually parts of domain names
S_DOMAIN.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL_DOMAIN.on(_text.DOT, S_EMAIL_DOMAIN_DOT);

// Hyphen can jump back to a domain name

// After the first domain and a dot, we can find either a URL or another domain
S_DOMAIN_DOT.on(_text.TLD, S_TLD).on(_text.DOMAIN, S_DOMAIN).on(_text.NUM, S_DOMAIN).on(_text.LOCALHOST, S_DOMAIN);

S_EMAIL_DOMAIN_DOT.on(_text.TLD, S_EMAIL).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.NUM, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL_DOMAIN);

// S_TLD accepts! But the URL could be longer, try to find a match greedily
// The `run` function should be able to "rollback" to the accepting state
S_TLD.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL.on(_text.DOT, S_EMAIL_DOMAIN_DOT);

// Become real URLs after `SLASH` or `COLON NUM SLASH`
// Here PSS and non-PSS converge
S_TLD.on(_text.COLON, S_TLD_COLON).on(_text.SLASH, S_URL);
S_TLD_COLON.on(_text.NUM, S_TLD_PORT);
S_TLD_PORT.on(_text.SLASH, S_URL);
S_EMAIL.on(_text.COLON, S_EMAIL_COLON);
S_EMAIL_COLON.on(_text.NUM, S_EMAIL_PORT);

// Types of characters the URL can definitely end in
var qsAccepting = [_text.DOMAIN, _text.AT, _text.LOCALHOST, _text.NUM, _text.PLUS, _text.POUND, _text.PROTOCOL, _text.SLASH, _text.TLD, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND];

// Types of tokens that can follow a URL and be part of the query string
// but cannot be the very last characters
// Characters that cannot appear in the URL at all should be excluded
var qsNonAccepting = [_text.COLON, _text.DOT, _text.QUERY, _text.PUNCTUATION, _text.CLOSEBRACE, _text.CLOSEBRACKET, _text.CLOSEANGLEBRACKET, _text.CLOSEPAREN, _text.OPENBRACE, _text.OPENBRACKET, _text.OPENANGLEBRACKET, _text.OPENPAREN];

// These states are responsible primarily for determining whether or not to
// include the final round bracket.

// URL, followed by an opening bracket
S_URL.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN);

// URL with extra symbols at the end, followed by an opening bracket
S_URL_NON_ACCEPTING.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN);

// Closing bracket component. This character WILL be included in the URL
S_URL_OPENBRACE.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_Q.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_Q.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_Q.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_Q.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_SYMS.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_SYMS.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_SYMS.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_SYMS.on(_text.CLOSEPAREN, S_URL);

// URL that beings with an opening bracket, followed by a symbols.
// Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
// has a single opening bracket for some reason).
S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

// URL that begins with an opening bracket, followed by some symbols
S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);

S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_SYMS.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

// Account for the query string
S_URL.on(qsAccepting, S_URL);
S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);

S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING);

// Email address-specific state definitions
// Note: We are not allowing '/' in email addresses since this would interfere
// with real URLs

// For addresses with the mailto prefix
// 'mailto:' followed by anything sane is a valid email
S_MAILTO.on(_text.TLD, S_MAILTO_EMAIL).on(_text.DOMAIN, S_MAILTO_EMAIL).on(_text.NUM, S_MAILTO_EMAIL).on(_text.LOCALHOST, S_MAILTO_EMAIL);

// Greedily get more potential valid email values
S_MAILTO_EMAIL.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
S_MAILTO_EMAIL_NON_ACCEPTING.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);

// For addresses without the mailto prefix
// Tokens allowed in the localpart of the email
var localpartAccepting = [_text.DOMAIN, _text.NUM, _text.PLUS, _text.POUND, _text.QUERY, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND, _text.TLD];

// Some of the tokens in `localpartAccepting` are already accounted for here and
// will not be overwritten (don't worry)
S_DOMAIN.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_TLD.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);

// Okay we're on a localpart. Now what?
// TODO: IP addresses and what if the email starts with numbers?
S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT) // close to an email address now
.on(_text.DOT, S_LOCALPART_DOT);
S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
S_LOCALPART_AT.on(_text.TLD, S_EMAIL_DOMAIN).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL);
// States following `@` defined above

var run = function run(tokens) {
	var len = tokens.length;
	var cursor = 0;
	var multis = [];
	var textTokens = [];

	while (cursor < len) {
		var state = S_START;
		var secondState = null;
		var nextState = null;
		var multiLength = 0;
		var latestAccepting = null;
		var sinceAccepts = -1;

		while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
			// Starting tokens with nowhere to jump to.
			// Consider these to be just plain text
			textTokens.push(tokens[cursor++]);
		}

		while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {

			// Get the next state
			secondState = null;
			state = nextState;

			// Keep track of the latest accepting state
			if (state.accepts()) {
				sinceAccepts = 0;
				latestAccepting = state;
			} else if (sinceAccepts >= 0) {
				sinceAccepts++;
			}

			cursor++;
			multiLength++;
		}

		if (sinceAccepts < 0) {

			// No accepting state was found, part of a regular text token
			// Add all the tokens we looked at to the text tokens array
			for (var i = cursor - multiLength; i < cursor; i++) {
				textTokens.push(tokens[i]);
			}
		} else {

			// Accepting state!

			// First close off the textTokens (if available)
			if (textTokens.length > 0) {
				multis.push(new _multi.TEXT(textTokens));
				textTokens = [];
			}

			// Roll back to the latest accepting state
			cursor -= sinceAccepts;
			multiLength -= sinceAccepts;

			// Create a new multitoken
			var MULTI = latestAccepting.emit();
			multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
		}
	}

	// Finally close off the textTokens (if available)
	if (textTokens.length > 0) {
		multis.push(new _multi.TEXT(textTokens));
	}

	return multis;
};

exports.State = _state.TokenState;
exports.TOKENS = MULTI_TOKENS;
exports.run = run;
exports.start = S_START;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/scanner.js":
/*!************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/scanner.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__(/*! ./state */ "./node_modules/linkifyjs/lib/linkify/core/state.js");

var _text = __webpack_require__(/*! ./tokens/text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");

var TOKENS = _interopRequireWildcard(_text);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var tlds = 'aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.

	@module linkify
	@submodule scanner
	@main scanner
*/

var NUMBERS = '0123456789'.split('');
var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
var WHITESPACE = [' ', '\f', '\r', '\t', '\v', '\xA0', '\u1680', '\u180E']; // excluding line breaks

var domainStates = []; // states that jump to DOMAIN on /[a-z0-9]/
var makeState = function makeState(tokenClass) {
	return new _state.CharacterState(tokenClass);
};

// Frequently used states
var S_START = makeState();
var S_NUM = makeState(_text.NUM);
var S_DOMAIN = makeState(_text.DOMAIN);
var S_DOMAIN_HYPHEN = makeState(); // domain followed by 1 or more hyphen characters
var S_WS = makeState(_text.WS);

// States for special URL symbols
S_START.on('@', makeState(_text.AT)).on('.', makeState(_text.DOT)).on('+', makeState(_text.PLUS)).on('#', makeState(_text.POUND)).on('?', makeState(_text.QUERY)).on('/', makeState(_text.SLASH)).on('_', makeState(_text.UNDERSCORE)).on(':', makeState(_text.COLON)).on('{', makeState(_text.OPENBRACE)).on('[', makeState(_text.OPENBRACKET)).on('<', makeState(_text.OPENANGLEBRACKET)).on('(', makeState(_text.OPENPAREN)).on('}', makeState(_text.CLOSEBRACE)).on(']', makeState(_text.CLOSEBRACKET)).on('>', makeState(_text.CLOSEANGLEBRACKET)).on(')', makeState(_text.CLOSEPAREN)).on('&', makeState(_text.AMPERSAND)).on([',', ';', '!', '"', '\''], makeState(_text.PUNCTUATION));

// Whitespace jumps
// Tokens of only non-newline whitespace are arbitrarily long
S_START.on('\n', makeState(_text.NL)).on(WHITESPACE, S_WS);

// If any whitespace except newline, more whitespace!
S_WS.on(WHITESPACE, S_WS);

// Generates states for top-level domains
// Note that this is most accurate when tlds are in alphabetical order
for (var i = 0; i < tlds.length; i++) {
	var newStates = (0, _state.stateify)(tlds[i], S_START, _text.TLD, _text.DOMAIN);
	domainStates.push.apply(domainStates, newStates);
}

// Collect the states generated by different protocls
var partialProtocolFileStates = (0, _state.stateify)('file', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolFtpStates = (0, _state.stateify)('ftp', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolHttpStates = (0, _state.stateify)('http', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolMailtoStates = (0, _state.stateify)('mailto', S_START, _text.DOMAIN, _text.DOMAIN);

// Add the states to the array of DOMAINeric states
domainStates.push.apply(domainStates, partialProtocolFileStates);
domainStates.push.apply(domainStates, partialProtocolFtpStates);
domainStates.push.apply(domainStates, partialProtocolHttpStates);
domainStates.push.apply(domainStates, partialProtocolMailtoStates);

// Protocol states
var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
var S_MAILTO = partialProtocolMailtoStates.pop();
var S_PROTOCOL_SECURE = makeState(_text.DOMAIN);
var S_FULL_PROTOCOL = makeState(_text.PROTOCOL); // Full protocol ends with COLON
var S_FULL_MAILTO = makeState(_text.MAILTO); // Mailto ends with COLON

// Secure protocols (end with 's')
S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

domainStates.push(S_PROTOCOL_SECURE);

// Become protocol tokens after a COLON
S_PROTOCOL_FILE.on(':', S_FULL_PROTOCOL);
S_PROTOCOL_SECURE.on(':', S_FULL_PROTOCOL);
S_MAILTO.on(':', S_FULL_MAILTO);

// Localhost
var partialLocalhostStates = (0, _state.stateify)('localhost', S_START, _text.LOCALHOST, _text.DOMAIN);
domainStates.push.apply(domainStates, partialLocalhostStates);

// Everything else
// DOMAINs make more DOMAINs
// Number and character transitions
S_START.on(NUMBERS, S_NUM);
S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_NUM).on(ALPHANUM, S_DOMAIN); // number becomes DOMAIN

S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);

// All the generated states should have a jump to DOMAIN
for (var _i = 0; _i < domainStates.length; _i++) {
	domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
}

S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_DOMAIN).on(ALPHANUM, S_DOMAIN);

// Set default transition
S_START.defaultTransition = makeState(_text.SYM);

/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {String} str Input string to scan
	@return {Array} Array of TOKEN instances
*/
var run = function run(str) {

	// The state machine only looks at lowercase strings.
	// This selective `toLowerCase` is used because lowercasing the entire
	// string causes the length and character position to vary in some in some
	// non-English strings. This happens only on V8-based runtimes.
	var lowerStr = str.replace(/[A-Z]/g, function (c) {
		return c.toLowerCase();
	});
	var len = str.length;
	var tokens = []; // return value

	var cursor = 0;

	// Tokenize the string
	while (cursor < len) {
		var state = S_START;
		var nextState = null;
		var tokenLength = 0;
		var latestAccepting = null;
		var sinceAccepts = -1;

		while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
			state = nextState;

			// Keep track of the latest accepting state
			if (state.accepts()) {
				sinceAccepts = 0;
				latestAccepting = state;
			} else if (sinceAccepts >= 0) {
				sinceAccepts++;
			}

			tokenLength++;
			cursor++;
		}

		if (sinceAccepts < 0) {
			continue;
		} // Should never happen

		// Roll back to the latest accepting state
		cursor -= sinceAccepts;
		tokenLength -= sinceAccepts;

		// Get the class for the new token
		var TOKEN = latestAccepting.emit(); // Current token class

		// No more jumps, just make a new token
		tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
	}

	return tokens;
};

var start = S_START;
exports.State = _state.CharacterState;
exports.TOKENS = TOKENS;
exports.run = run;
exports.start = start;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/state.js":
/*!**********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/state.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.stateify = exports.TokenState = exports.CharacterState = undefined;

var _class = __webpack_require__(/*! ../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

function createStateClass() {
	return function (tClass) {
		this.j = [];
		this.T = tClass || null;
	};
}

/**
	A simple state machine that can emit token classes

	The `j` property in this class refers to state jumps. It's a
	multidimensional array where for each element:

	* index [0] is a symbol or class of symbols to transition to.
	* index [1] is a State instance which matches

	The type of symbol will depend on the target implementation for this class.
	In Linkify, we have a two-stage scanner. Each stage uses this state machine
	but with a slighly different (polymorphic) implementation.

	The `T` property refers to the token class.

	TODO: Can the `on` and `next` methods be combined?

	@class BaseState
*/
var BaseState = createStateClass();
BaseState.prototype = {
	defaultTransition: false,

	/**
 	@method constructor
 	@param {Class} tClass Pass in the kind of token to emit if there are
 		no jumps after this state and the state is accepting.
 */

	/**
 	On the given symbol(s), this machine should go to the given state
 		@method on
 	@param {Array|Mixed} symbol
 	@param {BaseState} state Note that the type of this state should be the
 		same as the current instance (i.e., don't pass in a different
 		subclass)
 */
	on: function on(symbol, state) {
		if (symbol instanceof Array) {
			for (var i = 0; i < symbol.length; i++) {
				this.j.push([symbol[i], state]);
			}
			return this;
		}
		this.j.push([symbol, state]);
		return this;
	},


	/**
 	Given the next item, returns next state for that item
 	@method next
 	@param {Mixed} item Should be an instance of the symbols handled by
 		this particular machine.
 	@return {State} state Returns false if no jumps are available
 */
	next: function next(item) {
		for (var i = 0; i < this.j.length; i++) {
			var jump = this.j[i];
			var symbol = jump[0]; // Next item to check for
			var state = jump[1]; // State to jump to if items match

			// compare item with symbol
			if (this.test(item, symbol)) {
				return state;
			}
		}

		// Nowhere left to jump!
		return this.defaultTransition;
	},


	/**
 	Does this state accept?
 	`true` only of `this.T` exists
 		@method accepts
 	@return {Boolean}
 */
	accepts: function accepts() {
		return !!this.T;
	},


	/**
 	Determine whether a given item "symbolizes" the symbol, where symbol is
 	a class of items handled by this state machine.
 		This method should be overriden in extended classes.
 		@method test
 	@param {Mixed} item Does this item match the given symbol?
 	@param {Mixed} symbol
 	@return {Boolean}
 */
	test: function test(item, symbol) {
		return item === symbol;
	},


	/**
 	Emit the token for this State (just return it in this case)
 	If this emits a token, this instance is an accepting state
 	@method emit
 	@return {Class} T
 */
	emit: function emit() {
		return this.T;
	}
};

/**
	State machine for string-based input

	@class CharacterState
	@extends BaseState
*/
var CharacterState = (0, _class.inherits)(BaseState, createStateClass(), {
	/**
 	Does the given character match the given character or regular
 	expression?
 		@method test
 	@param {String} char
 	@param {String|RegExp} charOrRegExp
 	@return {Boolean}
 */
	test: function test(character, charOrRegExp) {
		return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
	}
});

/**
	State machine for input in the form of TextTokens

	@class TokenState
	@extends BaseState
*/
var TokenState = (0, _class.inherits)(BaseState, createStateClass(), {

	/**
  * Similar to `on`, but returns the state the results in the transition from
  * the given item
  * @method jump
  * @param {Mixed} item
  * @param {Token} [token]
  * @return state
  */
	jump: function jump(token) {
		var tClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		var state = this.next(new token('')); // dummy temp token
		if (state === this.defaultTransition) {
			// Make a new state!
			state = new this.constructor(tClass);
			this.on(token, state);
		} else if (tClass) {
			state.T = tClass;
		}
		return state;
	},


	/**
 	Is the given token an instance of the given token class?
 		@method test
 	@param {TextToken} token
 	@param {Class} tokenClass
 	@return {Boolean}
 */
	test: function test(token, tokenClass) {
		return token instanceof tokenClass;
	}
});

/**
	Given a non-empty target string, generates states (if required) for each
	consecutive substring of characters in str starting from the beginning of
	the string. The final state will have a special value, as specified in
	options. All other "in between" substrings will have a default end state.

	This turns the state machine into a Trie-like data structure (rather than a
	intelligently-designed DFA).

	Note that I haven't really tried these with any strings other than
	DOMAIN.

	@param {String} str
	@param {CharacterState} start State to jump from the first character
	@param {Class} endToken Token class to emit when the given string has been
		matched and no more jumps exist.
	@param {Class} defaultToken "Filler token", or which token type to emit when
		we don't have a full match
	@return {Array} list of newly-created states
*/
function stateify(str, start, endToken, defaultToken) {
	var i = 0,
	    len = str.length,
	    state = start,
	    newStates = [],
	    nextState = void 0;

	// Find the next state without a jump to the next character
	while (i < len && (nextState = state.next(str[i]))) {
		state = nextState;
		i++;
	}

	if (i >= len) {
		return [];
	} // no new tokens were added

	while (i < len - 1) {
		nextState = new CharacterState(defaultToken);
		newStates.push(nextState);
		state.on(str[i], nextState);
		state = nextState;
		i++;
	}

	nextState = new CharacterState(endToken);
	newStates.push(nextState);
	state.on(str[len - 1], nextState);

	return newStates;
}

exports.CharacterState = CharacterState;
exports.TokenState = TokenState;
exports.stateify = stateify;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js":
/*!******************************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js ***!
  \******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createTokenClass() {
	return function (value) {
		if (value) {
			this.v = value;
		}
	};
}

exports.createTokenClass = createTokenClass;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js":
/*!*****************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.URL = exports.TEXT = exports.NL = exports.EMAIL = exports.MAILTOEMAIL = exports.Base = undefined;

var _createTokenClass = __webpack_require__(/*! ./create-token-class */ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js");

var _class = __webpack_require__(/*! ../../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

var _text = __webpack_require__(/*! ./text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");

/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/

// Is the given token a valid domain token?
// Should nums be included here?
function isDomainToken(token) {
	return token instanceof _text.DOMAIN || token instanceof _text.TLD;
}

/**
	Abstract class used for manufacturing tokens of text tokens. That is rather
	than the value for a token being a small string of text, it's value an array
	of text tokens.

	Used for grouping together URLs, emails, hashtags, and other potential
	creations.

	@class MultiToken
	@abstract
*/
var MultiToken = (0, _createTokenClass.createTokenClass)();

MultiToken.prototype = {
	/**
 	String representing the type for this token
 	@property type
 	@default 'TOKEN'
 */
	type: 'token',

	/**
 	Is this multitoken a link?
 	@property isLink
 	@default false
 */
	isLink: false,

	/**
 	Return the string this token represents.
 	@method toString
 	@return {String}
 */
	toString: function toString() {
		var result = [];
		for (var i = 0; i < this.v.length; i++) {
			result.push(this.v[i].toString());
		}
		return result.join('');
	},


	/**
 	What should the value for this token be in the `href` HTML attribute?
 	Returns the `.toString` value by default.
 		@method toHref
 	@return {String}
 */
	toHref: function toHref() {
		return this.toString();
	},


	/**
 	Returns a hash of relevant values for this token, which includes keys
 	* type - Kind of token ('url', 'email', etc.)
 	* value - Original text
 	* href - The value that should be added to the anchor tag's href
 		attribute
 		@method toObject
 	@param {String} [protocol] `'http'` by default
 	@return {Object}
 */
	toObject: function toObject() {
		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

		return {
			type: this.type,
			value: this.toString(),
			href: this.toHref(protocol)
		};
	}
};

/**
	Represents an arbitrarily mailto email address with the prefix included
	@class MAILTO
	@extends MultiToken
*/
var MAILTOEMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'email',
	isLink: true
});

/**
	Represents a list of tokens making up a valid email address
	@class EMAIL
	@extends MultiToken
*/
var EMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'email',
	isLink: true,
	toHref: function toHref() {
		return 'mailto:' + this.toString();
	}
});

/**
	Represents some plain text
	@class TEXT
	@extends MultiToken
*/
var TEXT = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), { type: 'text' });

/**
	Multi-linebreak token - represents a line break
	@class NL
	@extends MultiToken
*/
var NL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), { type: 'nl' });

/**
	Represents a list of tokens making up a valid URL
	@class URL
	@extends MultiToken
*/
var URL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'url',
	isLink: true,

	/**
 	Lowercases relevant parts of the domain and adds the protocol if
 	required. Note that this will not escape unsafe HTML characters in the
 	URL.
 		@method href
 	@param {String} protocol
 	@return {String}
 */
	toHref: function toHref() {
		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

		var hasProtocol = false;
		var hasSlashSlash = false;
		var tokens = this.v;
		var result = [];
		var i = 0;

		// Make the first part of the domain lowercase
		// Lowercase protocol
		while (tokens[i] instanceof _text.PROTOCOL) {
			hasProtocol = true;
			result.push(tokens[i].toString().toLowerCase());
			i++;
		}

		// Skip slash-slash
		while (tokens[i] instanceof _text.SLASH) {
			hasSlashSlash = true;
			result.push(tokens[i].toString());
			i++;
		}

		// Lowercase all other characters in the domain
		while (isDomainToken(tokens[i])) {
			result.push(tokens[i].toString().toLowerCase());
			i++;
		}

		// Leave all other characters as they were written
		for (; i < tokens.length; i++) {
			result.push(tokens[i].toString());
		}

		result = result.join('');

		if (!(hasProtocol || hasSlashSlash)) {
			result = protocol + '://' + result;
		}

		return result;
	},
	hasProtocol: function hasProtocol() {
		return this.v[0] instanceof _text.PROTOCOL;
	}
});

exports.Base = MultiToken;
exports.MAILTOEMAIL = MAILTOEMAIL;
exports.EMAIL = EMAIL;
exports.NL = NL;
exports.TEXT = TEXT;
exports.URL = URL;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js":
/*!****************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/text.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AMPERSAND = exports.CLOSEPAREN = exports.CLOSEANGLEBRACKET = exports.CLOSEBRACKET = exports.CLOSEBRACE = exports.OPENPAREN = exports.OPENANGLEBRACKET = exports.OPENBRACKET = exports.OPENBRACE = exports.WS = exports.TLD = exports.SYM = exports.UNDERSCORE = exports.SLASH = exports.MAILTO = exports.PROTOCOL = exports.QUERY = exports.POUND = exports.PLUS = exports.NUM = exports.NL = exports.LOCALHOST = exports.PUNCTUATION = exports.DOT = exports.COLON = exports.AT = exports.DOMAIN = exports.Base = undefined;

var _createTokenClass = __webpack_require__(/*! ./create-token-class */ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js");

var _class = __webpack_require__(/*! ../../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

/******************************************************************************
	Text Tokens
	Tokens composed of strings
******************************************************************************/

/**
	Abstract class used for manufacturing text tokens.
	Pass in the value this token represents

	@class TextToken
	@abstract
*/
var TextToken = (0, _createTokenClass.createTokenClass)();
TextToken.prototype = {
	toString: function toString() {
		return this.v + '';
	}
};

function inheritsToken(value) {
	var props = value ? { v: value } : {};
	return (0, _class.inherits)(TextToken, (0, _createTokenClass.createTokenClass)(), props);
}

/**
	A valid domain token
	@class DOMAIN
	@extends TextToken
*/
var DOMAIN = inheritsToken();

/**
	@class AT
	@extends TextToken
*/
var AT = inheritsToken('@');

/**
	Represents a single colon `:` character

	@class COLON
	@extends TextToken
*/
var COLON = inheritsToken(':');

/**
	@class DOT
	@extends TextToken
*/
var DOT = inheritsToken('.');

/**
	A character class that can surround the URL, but which the URL cannot begin
	or end with. Does not include certain English punctuation like parentheses.

	@class PUNCTUATION
	@extends TextToken
*/
var PUNCTUATION = inheritsToken();

/**
	The word localhost (by itself)
	@class LOCALHOST
	@extends TextToken
*/
var LOCALHOST = inheritsToken();

/**
	Newline token
	@class NL
	@extends TextToken
*/
var NL = inheritsToken('\n');

/**
	@class NUM
	@extends TextToken
*/
var NUM = inheritsToken();

/**
	@class PLUS
	@extends TextToken
*/
var PLUS = inheritsToken('+');

/**
	@class POUND
	@extends TextToken
*/
var POUND = inheritsToken('#');

/**
	Represents a web URL protocol. Supported types include

	* `http:`
	* `https:`
	* `ftp:`
	* `ftps:`

	@class PROTOCOL
	@extends TextToken
*/
var PROTOCOL = inheritsToken();

/**
	Represents the start of the email URI protocol

	@class MAILTO
	@extends TextToken
*/
var MAILTO = inheritsToken('mailto:');

/**
	@class QUERY
	@extends TextToken
*/
var QUERY = inheritsToken('?');

/**
	@class SLASH
	@extends TextToken
*/
var SLASH = inheritsToken('/');

/**
	@class UNDERSCORE
	@extends TextToken
*/
var UNDERSCORE = inheritsToken('_');

/**
	One ore more non-whitespace symbol.
	@class SYM
	@extends TextToken
*/
var SYM = inheritsToken();

/**
	@class TLD
	@extends TextToken
*/
var TLD = inheritsToken();

/**
	Represents a string of consecutive whitespace characters

	@class WS
	@extends TextToken
*/
var WS = inheritsToken();

/**
	Opening/closing bracket classes
*/

var OPENBRACE = inheritsToken('{');
var OPENBRACKET = inheritsToken('[');
var OPENANGLEBRACKET = inheritsToken('<');
var OPENPAREN = inheritsToken('(');
var CLOSEBRACE = inheritsToken('}');
var CLOSEBRACKET = inheritsToken(']');
var CLOSEANGLEBRACKET = inheritsToken('>');
var CLOSEPAREN = inheritsToken(')');

var AMPERSAND = inheritsToken('&');

exports.Base = TextToken;
exports.DOMAIN = DOMAIN;
exports.AT = AT;
exports.COLON = COLON;
exports.DOT = DOT;
exports.PUNCTUATION = PUNCTUATION;
exports.LOCALHOST = LOCALHOST;
exports.NL = NL;
exports.NUM = NUM;
exports.PLUS = PLUS;
exports.POUND = POUND;
exports.QUERY = QUERY;
exports.PROTOCOL = PROTOCOL;
exports.MAILTO = MAILTO;
exports.SLASH = SLASH;
exports.UNDERSCORE = UNDERSCORE;
exports.SYM = SYM;
exports.TLD = TLD;
exports.WS = WS;
exports.OPENBRACE = OPENBRACE;
exports.OPENBRACKET = OPENBRACKET;
exports.OPENANGLEBRACKET = OPENANGLEBRACKET;
exports.OPENPAREN = OPENPAREN;
exports.CLOSEBRACE = CLOSEBRACE;
exports.CLOSEBRACKET = CLOSEBRACKET;
exports.CLOSEANGLEBRACKET = CLOSEANGLEBRACKET;
exports.CLOSEPAREN = CLOSEPAREN;
exports.AMPERSAND = AMPERSAND;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/utils/class.js":
/*!***********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/utils/class.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.inherits = inherits;
function inherits(parent, child) {
	var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var extended = Object.create(parent.prototype);
	for (var p in props) {
		extended[p] = props[p];
	}
	extended.constructor = child;
	child.prototype = extended;
	return child;
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/utils/options.js":
/*!*************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/utils/options.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var defaults = {
	defaultProtocol: 'http',
	events: null,
	format: noop,
	formatHref: noop,
	nl2br: false,
	tagName: 'a',
	target: typeToTarget,
	validate: true,
	ignoreTags: [],
	attributes: null,
	className: 'linkified' // Deprecated value - no default class will be provided in the future
};

exports.defaults = defaults;
exports.Options = Options;
exports.contains = contains;


function Options(opts) {
	opts = opts || {};

	this.defaultProtocol = opts.hasOwnProperty('defaultProtocol') ? opts.defaultProtocol : defaults.defaultProtocol;
	this.events = opts.hasOwnProperty('events') ? opts.events : defaults.events;
	this.format = opts.hasOwnProperty('format') ? opts.format : defaults.format;
	this.formatHref = opts.hasOwnProperty('formatHref') ? opts.formatHref : defaults.formatHref;
	this.nl2br = opts.hasOwnProperty('nl2br') ? opts.nl2br : defaults.nl2br;
	this.tagName = opts.hasOwnProperty('tagName') ? opts.tagName : defaults.tagName;
	this.target = opts.hasOwnProperty('target') ? opts.target : defaults.target;
	this.validate = opts.hasOwnProperty('validate') ? opts.validate : defaults.validate;
	this.ignoreTags = [];

	// linkAttributes and linkClass is deprecated
	this.attributes = opts.attributes || opts.linkAttributes || defaults.attributes;
	this.className = opts.hasOwnProperty('className') ? opts.className : opts.linkClass || defaults.className;

	// Make all tags names upper case
	var ignoredTags = opts.hasOwnProperty('ignoreTags') ? opts.ignoreTags : defaults.ignoreTags;
	for (var i = 0; i < ignoredTags.length; i++) {
		this.ignoreTags.push(ignoredTags[i].toUpperCase());
	}
}

Options.prototype = {
	/**
  * Given the token, return all options for how it should be displayed
  */
	resolve: function resolve(token) {
		var href = token.toHref(this.defaultProtocol);
		return {
			formatted: this.get('format', token.toString(), token),
			formattedHref: this.get('formatHref', href, token),
			tagName: this.get('tagName', href, token),
			className: this.get('className', href, token),
			target: this.get('target', href, token),
			events: this.getObject('events', href, token),
			attributes: this.getObject('attributes', href, token)
		};
	},


	/**
  * Returns true or false based on whether a token should be displayed as a
  * link based on the user options. By default,
  */
	check: function check(token) {
		return this.get('validate', token.toString(), token);
	},


	// Private methods

	/**
  * Resolve an option's value based on the value of the option and the given
  * params.
  * @param {String} key Name of option to use
  * @param operator will be passed to the target option if it's method
  * @param {MultiToken} token The token from linkify.tokenize
  */
	get: function get(key, operator, token) {
		var optionValue = void 0,
		    option = this[key];
		if (!option) {
			return option;
		}

		switch (typeof option === 'undefined' ? 'undefined' : _typeof(option)) {
			case 'function':
				return option(operator, token.type);
			case 'object':
				optionValue = option.hasOwnProperty(token.type) ? option[token.type] : defaults[key];
				return typeof optionValue === 'function' ? optionValue(operator, token.type) : optionValue;
		}

		return option;
	},
	getObject: function getObject(key, operator, token) {
		var option = this[key];
		return typeof option === 'function' ? option(operator, token.type) : option;
	}
};

/**
 * Quick indexOf replacement for checking the ignoreTags option
 */
function contains(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === value) {
			return true;
		}
	}
	return false;
}

function noop(val) {
	return val;
}

function typeToTarget(href, type) {
	return type === 'url' ? '_blank' : null;
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer.js":
/*!*************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _html5NamedCharRefs = __webpack_require__(/*! ./simple-html-tokenizer/html5-named-char-refs */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/html5-named-char-refs.js");

var _html5NamedCharRefs2 = _interopRequireDefault(_html5NamedCharRefs);

var _entityParser = __webpack_require__(/*! ./simple-html-tokenizer/entity-parser */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/entity-parser.js");

var _entityParser2 = _interopRequireDefault(_entityParser);

var _eventedTokenizer = __webpack_require__(/*! ./simple-html-tokenizer/evented-tokenizer */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/evented-tokenizer.js");

var _eventedTokenizer2 = _interopRequireDefault(_eventedTokenizer);

var _tokenizer = __webpack_require__(/*! ./simple-html-tokenizer/tokenizer */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenizer.js");

var _tokenizer2 = _interopRequireDefault(_tokenizer);

var _tokenize = __webpack_require__(/*! ./simple-html-tokenizer/tokenize */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenize.js");

var _tokenize2 = _interopRequireDefault(_tokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTML5Tokenizer = {
	HTML5NamedCharRefs: _html5NamedCharRefs2.default,
	EntityParser: _entityParser2.default,
	EventedTokenizer: _eventedTokenizer2.default,
	Tokenizer: _tokenizer2.default,
	tokenize: _tokenize2.default
};

exports.default = HTML5Tokenizer;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/entity-parser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/entity-parser.js ***!
  \***************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function EntityParser(named) {
  this.named = named;
}

var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
var CHARCODE = /^#([0-9]+)$/;
var NAMED = /^([A-Za-z0-9]+)$/;

EntityParser.prototype.parse = function (entity) {
  if (!entity) {
    return;
  }
  var matches = entity.match(HEXCHARCODE);
  if (matches) {
    return "&#x" + matches[1] + ";";
  }
  matches = entity.match(CHARCODE);
  if (matches) {
    return "&#" + matches[1] + ";";
  }
  matches = entity.match(NAMED);
  if (matches) {
    return this.named[matches[1]] || "&" + matches[1] + ";";
  }
};

exports.default = EntityParser;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/evented-tokenizer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/evented-tokenizer.js ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/utils.js");

function EventedTokenizer(delegate, entityParser) {
  this.delegate = delegate;
  this.entityParser = entityParser;

  this.state = null;
  this.input = null;

  this.index = -1;
  this.line = -1;
  this.column = -1;
  this.tagLine = -1;
  this.tagColumn = -1;

  this.reset();
}

EventedTokenizer.prototype = {
  reset: function reset() {
    this.state = 'beforeData';
    this.input = '';

    this.index = 0;
    this.line = 1;
    this.column = 0;

    this.tagLine = -1;
    this.tagColumn = -1;

    this.delegate.reset();
  },

  tokenize: function tokenize(input) {
    this.reset();
    this.tokenizePart(input);
    this.tokenizeEOF();
  },

  tokenizePart: function tokenizePart(input) {
    this.input += (0, _utils.preprocessInput)(input);

    while (this.index < this.input.length) {
      this.states[this.state].call(this);
    }
  },

  tokenizeEOF: function tokenizeEOF() {
    this.flushData();
  },

  flushData: function flushData() {
    if (this.state === 'data') {
      this.delegate.finishData();
      this.state = 'beforeData';
    }
  },

  peek: function peek() {
    return this.input.charAt(this.index);
  },

  consume: function consume() {
    var char = this.peek();

    this.index++;

    if (char === "\n") {
      this.line++;
      this.column = 0;
    } else {
      this.column++;
    }

    return char;
  },

  consumeCharRef: function consumeCharRef() {
    var endIndex = this.input.indexOf(';', this.index);
    if (endIndex === -1) {
      return;
    }
    var entity = this.input.slice(this.index, endIndex);
    var chars = this.entityParser.parse(entity);
    if (chars) {
      var count = entity.length;
      // consume the entity chars
      while (count) {
        this.consume();
        count--;
      }
      // consume the `;`
      this.consume();

      return chars;
    }
  },

  markTagStart: function markTagStart() {
    // these properties to be removed in next major bump
    this.tagLine = this.line;
    this.tagColumn = this.column;

    if (this.delegate.tagOpen) {
      this.delegate.tagOpen();
    }
  },

  states: {
    beforeData: function beforeData() {
      var char = this.peek();

      if (char === "<") {
        this.state = 'tagOpen';
        this.markTagStart();
        this.consume();
      } else {
        this.state = 'data';
        this.delegate.beginData();
      }
    },

    data: function data() {
      var char = this.peek();

      if (char === "<") {
        this.delegate.finishData();
        this.state = 'tagOpen';
        this.markTagStart();
        this.consume();
      } else if (char === "&") {
        this.consume();
        this.delegate.appendToData(this.consumeCharRef() || "&");
      } else {
        this.consume();
        this.delegate.appendToData(char);
      }
    },

    tagOpen: function tagOpen() {
      var char = this.consume();

      if (char === "!") {
        this.state = 'markupDeclaration';
      } else if (char === "/") {
        this.state = 'endTagOpen';
      } else if ((0, _utils.isAlpha)(char)) {
        this.state = 'tagName';
        this.delegate.beginStartTag();
        this.delegate.appendToTagName(char.toLowerCase());
      }
    },

    markupDeclaration: function markupDeclaration() {
      var char = this.consume();

      if (char === "-" && this.input.charAt(this.index) === "-") {
        this.consume();
        this.state = 'commentStart';
        this.delegate.beginComment();
      }
    },

    commentStart: function commentStart() {
      var char = this.consume();

      if (char === "-") {
        this.state = 'commentStartDash';
      } else if (char === ">") {
        this.delegate.finishComment();
        this.state = 'beforeData';
      } else {
        this.delegate.appendToCommentData(char);
        this.state = 'comment';
      }
    },

    commentStartDash: function commentStartDash() {
      var char = this.consume();

      if (char === "-") {
        this.state = 'commentEnd';
      } else if (char === ">") {
        this.delegate.finishComment();
        this.state = 'beforeData';
      } else {
        this.delegate.appendToCommentData("-");
        this.state = 'comment';
      }
    },

    comment: function comment() {
      var char = this.consume();

      if (char === "-") {
        this.state = 'commentEndDash';
      } else {
        this.delegate.appendToCommentData(char);
      }
    },

    commentEndDash: function commentEndDash() {
      var char = this.consume();

      if (char === "-") {
        this.state = 'commentEnd';
      } else {
        this.delegate.appendToCommentData("-" + char);
        this.state = 'comment';
      }
    },

    commentEnd: function commentEnd() {
      var char = this.consume();

      if (char === ">") {
        this.delegate.finishComment();
        this.state = 'beforeData';
      } else {
        this.delegate.appendToCommentData("--" + char);
        this.state = 'comment';
      }
    },

    tagName: function tagName() {
      var char = this.consume();

      if ((0, _utils.isSpace)(char)) {
        this.state = 'beforeAttributeName';
      } else if (char === "/") {
        this.state = 'selfClosingStartTag';
      } else if (char === ">") {
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.delegate.appendToTagName(char);
      }
    },

    beforeAttributeName: function beforeAttributeName() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.consume();
        return;
      } else if (char === "/") {
        this.state = 'selfClosingStartTag';
        this.consume();
      } else if (char === ">") {
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.state = 'attributeName';
        this.delegate.beginAttribute();
        this.consume();
        this.delegate.appendToAttributeName(char);
      }
    },

    attributeName: function attributeName() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.state = 'afterAttributeName';
        this.consume();
      } else if (char === "/") {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.state = 'selfClosingStartTag';
      } else if (char === "=") {
        this.state = 'beforeAttributeValue';
        this.consume();
      } else if (char === ">") {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.consume();
        this.delegate.appendToAttributeName(char);
      }
    },

    afterAttributeName: function afterAttributeName() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.consume();
        return;
      } else if (char === "/") {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.state = 'selfClosingStartTag';
      } else if (char === "=") {
        this.consume();
        this.state = 'beforeAttributeValue';
      } else if (char === ">") {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.state = 'attributeName';
        this.delegate.beginAttribute();
        this.delegate.appendToAttributeName(char);
      }
    },

    beforeAttributeValue: function beforeAttributeValue() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.consume();
      } else if (char === '"') {
        this.state = 'attributeValueDoubleQuoted';
        this.delegate.beginAttributeValue(true);
        this.consume();
      } else if (char === "'") {
        this.state = 'attributeValueSingleQuoted';
        this.delegate.beginAttributeValue(true);
        this.consume();
      } else if (char === ">") {
        this.delegate.beginAttributeValue(false);
        this.delegate.finishAttributeValue();
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.state = 'attributeValueUnquoted';
        this.delegate.beginAttributeValue(false);
        this.consume();
        this.delegate.appendToAttributeValue(char);
      }
    },

    attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
      var char = this.consume();

      if (char === '"') {
        this.delegate.finishAttributeValue();
        this.state = 'afterAttributeValueQuoted';
      } else if (char === "&") {
        this.delegate.appendToAttributeValue(this.consumeCharRef('"') || "&");
      } else {
        this.delegate.appendToAttributeValue(char);
      }
    },

    attributeValueSingleQuoted: function attributeValueSingleQuoted() {
      var char = this.consume();

      if (char === "'") {
        this.delegate.finishAttributeValue();
        this.state = 'afterAttributeValueQuoted';
      } else if (char === "&") {
        this.delegate.appendToAttributeValue(this.consumeCharRef("'") || "&");
      } else {
        this.delegate.appendToAttributeValue(char);
      }
    },

    attributeValueUnquoted: function attributeValueUnquoted() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.delegate.finishAttributeValue();
        this.consume();
        this.state = 'beforeAttributeName';
      } else if (char === "&") {
        this.consume();
        this.delegate.appendToAttributeValue(this.consumeCharRef(">") || "&");
      } else if (char === ">") {
        this.delegate.finishAttributeValue();
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.consume();
        this.delegate.appendToAttributeValue(char);
      }
    },

    afterAttributeValueQuoted: function afterAttributeValueQuoted() {
      var char = this.peek();

      if ((0, _utils.isSpace)(char)) {
        this.consume();
        this.state = 'beforeAttributeName';
      } else if (char === "/") {
        this.consume();
        this.state = 'selfClosingStartTag';
      } else if (char === ">") {
        this.consume();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.state = 'beforeAttributeName';
      }
    },

    selfClosingStartTag: function selfClosingStartTag() {
      var char = this.peek();

      if (char === ">") {
        this.consume();
        this.delegate.markTagAsSelfClosing();
        this.delegate.finishTag();
        this.state = 'beforeData';
      } else {
        this.state = 'beforeAttributeName';
      }
    },

    endTagOpen: function endTagOpen() {
      var char = this.consume();

      if ((0, _utils.isAlpha)(char)) {
        this.state = 'tagName';
        this.delegate.beginEndTag();
        this.delegate.appendToTagName(char.toLowerCase());
      }
    }
  }
};

exports.default = EventedTokenizer;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/html5-named-char-refs.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/html5-named-char-refs.js ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var HTML5NamedCharRefs = {
    // We don't need the complete named character reference because linkifyHtml
    // does not modify the escape sequences. We do need &nbsp; so that
    // whitespace is parsed properly. Other types of whitespace should already
    // be accounted for
    nbsp: "\xA0"
};
exports.default = HTML5NamedCharRefs;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenize.js":
/*!**********************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenize.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = tokenize;

var _tokenizer = __webpack_require__(/*! ./tokenizer */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenizer.js");

var _tokenizer2 = _interopRequireDefault(_tokenizer);

var _entityParser = __webpack_require__(/*! ./entity-parser */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/entity-parser.js");

var _entityParser2 = _interopRequireDefault(_entityParser);

var _html5NamedCharRefs = __webpack_require__(/*! ./html5-named-char-refs */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/html5-named-char-refs.js");

var _html5NamedCharRefs2 = _interopRequireDefault(_html5NamedCharRefs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenize(input, options) {
  var tokenizer = new _tokenizer2.default(new _entityParser2.default(_html5NamedCharRefs2.default), options);
  return tokenizer.tokenize(input);
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenizer.js":
/*!***********************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/tokenizer.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _eventedTokenizer = __webpack_require__(/*! ./evented-tokenizer */ "./node_modules/linkifyjs/lib/simple-html-tokenizer/evented-tokenizer.js");

var _eventedTokenizer2 = _interopRequireDefault(_eventedTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tokenizer(entityParser, options) {
  this.token = null;
  this.startLine = 1;
  this.startColumn = 0;
  this.options = options || {};
  this.tokenizer = new _eventedTokenizer2.default(this, entityParser);
}

Tokenizer.prototype = {
  tokenize: function tokenize(input) {
    this.tokens = [];
    this.tokenizer.tokenize(input);
    return this.tokens;
  },

  tokenizePart: function tokenizePart(input) {
    this.tokens = [];
    this.tokenizer.tokenizePart(input);
    return this.tokens;
  },

  tokenizeEOF: function tokenizeEOF() {
    this.tokens = [];
    this.tokenizer.tokenizeEOF();
    return this.tokens[0];
  },

  reset: function reset() {
    this.token = null;
    this.startLine = 1;
    this.startColumn = 0;
  },

  addLocInfo: function addLocInfo() {
    if (this.options.loc) {
      this.token.loc = {
        start: {
          line: this.startLine,
          column: this.startColumn
        },
        end: {
          line: this.tokenizer.line,
          column: this.tokenizer.column
        }
      };
    }
    this.startLine = this.tokenizer.line;
    this.startColumn = this.tokenizer.column;
  },

  // Data

  beginData: function beginData() {
    this.token = {
      type: 'Chars',
      chars: ''
    };
    this.tokens.push(this.token);
  },

  appendToData: function appendToData(char) {
    this.token.chars += char;
  },

  finishData: function finishData() {
    this.addLocInfo();
  },

  // Comment

  beginComment: function beginComment() {
    this.token = {
      type: 'Comment',
      chars: ''
    };
    this.tokens.push(this.token);
  },

  appendToCommentData: function appendToCommentData(char) {
    this.token.chars += char;
  },

  finishComment: function finishComment() {
    this.addLocInfo();
  },

  // Tags - basic

  beginStartTag: function beginStartTag() {
    this.token = {
      type: 'StartTag',
      tagName: '',
      attributes: [],
      selfClosing: false
    };
    this.tokens.push(this.token);
  },

  beginEndTag: function beginEndTag() {
    this.token = {
      type: 'EndTag',
      tagName: ''
    };
    this.tokens.push(this.token);
  },

  finishTag: function finishTag() {
    this.addLocInfo();
  },

  markTagAsSelfClosing: function markTagAsSelfClosing() {
    this.token.selfClosing = true;
  },

  // Tags - name

  appendToTagName: function appendToTagName(char) {
    this.token.tagName += char;
  },

  // Tags - attributes

  beginAttribute: function beginAttribute() {
    this._currentAttribute = ["", "", null];
    this.token.attributes.push(this._currentAttribute);
  },

  appendToAttributeName: function appendToAttributeName(char) {
    this._currentAttribute[0] += char;
  },

  beginAttributeValue: function beginAttributeValue(isQuoted) {
    this._currentAttribute[2] = isQuoted;
  },

  appendToAttributeValue: function appendToAttributeValue(char) {
    this._currentAttribute[1] = this._currentAttribute[1] || "";
    this._currentAttribute[1] += char;
  },

  finishAttributeValue: function finishAttributeValue() {}
};

exports.default = Tokenizer;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/simple-html-tokenizer/utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/simple-html-tokenizer/utils.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isSpace = isSpace;
exports.isAlpha = isAlpha;
exports.preprocessInput = preprocessInput;
var WSP = /[\t\n\f ]/;
var ALPHA = /[A-Za-z]/;
var CRLF = /\r\n?/g;

function isSpace(char) {
  return WSP.test(char);
}

function isAlpha(char) {
  return ALPHA.test(char);
}

function preprocessInput(input) {
  return input.replace(CRLF, "\n");
}

/***/ }),

/***/ "./node_modules/linkifyjs/react.js":
/*!*****************************************!*\
  !*** ./node_modules/linkifyjs/react.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/linkify-react */ "./node_modules/linkifyjs/lib/linkify-react.js").default;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary, createElement, createContext, createRef, Fragment, Component, default, version, Children, render, hydrate, unmountComponentAtNode, createPortal, createFactory, cloneElement, isValidElement, findDOMNode, PureComponent, memo, forwardRef, unstable_batchedUpdates, StrictMode, Suspense, SuspenseList, lazy, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return en; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return H; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return cn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return P; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return rn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return un; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return ln; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return k; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return fn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrictMode", function() { return an; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suspense", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspenseList", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lazy", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", function() { return tn; });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["a"]; });

function E(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function w(n){this.props=n}function C(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(w.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"]).isPureReactComponent=!0,w.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var R=preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__b;preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),R&&R(n)};var x="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function k(n){function t(t,e){var r=E({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=x,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var O=function(n,t){return null==n?null:Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(n).map(t))},A={map:O,forEach:O,count:function(n){return n?Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(n).length:0},only:function(n){var t=Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"]},N=preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__e;function L(n){return n&&((n=E({},n)).__c=null,n.__k=n.__k&&n.__k.map(L)),n}function U(n){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(U)),n}function F(){this.__u=0,this.t=null,this.__b=null}function M(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function j(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(e,u)}return u.displayName="Lazy",u.__f=!0,u}function D(){this.u=null,this.o=null}preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t.__c);N(n,t,e)},(F.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"]).__c=function(n,t){var e=this;null==e.t&&(e.t=[]),e.t.push(t);var r=M(e.__v),u=!1,o=function(){u||(u=!0,t.componentWillUnmount=t.__c,r?r(i):i())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){o(),t.__c&&t.__c()};var i=function(){var n;if(!--e.__u)for(e.__v.__k[0]=U(e.state.__e),e.setState({__e:e.__b=null});n=e.t.pop();)n.forceUpdate()},c=e.__v;c&&!0===c.__h||e.__u++||e.setState({__e:e.__b=e.__v.__k[0]}),n.then(o,o)},F.prototype.componentWillUnmount=function(){this.t=[]},F.prototype.render=function(n,t){this.__b&&(this.__v.__k&&(this.__v.__k[0]=L(this.__b)),this.__b=null);var e=t.__e&&Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(preact__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "b"],null,n.fallback);return e&&(e.__h=null),[Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(preact__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "b"],null,t.__e?null:n.children),e]};var I=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function T(n){return this.getChildContext=function(){return n.context},n.children}function W(n){var t=this,e=n.i,r=Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(T,{context:t.context},n.__v);t.componentWillUnmount=function(){var n=t.l.parentNode;n&&n.removeChild(t.l),Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* __u */ "c"])(t.s)},t.i&&t.i!==e&&(t.componentWillUnmount(),t.h=!1),n.__v?t.h?(e.__k=t.__k,Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* render */ "j"])(r,e),t.__k=e.__k):(t.l=document.createTextNode(""),t.__k=e.__k,Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* hydrate */ "h"])("",e),e.appendChild(t.l),t.h=!0,t.i=e,Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* render */ "j"])(r,e,t.l),e.__k=t.__k,t.__k=t.l.__k):t.h&&t.componentWillUnmount(),t.s=r}function P(n,t){return Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"])(W,{__v:n,i:t})}(D.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"]).__e=function(n){var t=this,e=M(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),I(t,n,r)):u()};e?e(o):o()}},D.prototype.render=function(n){this.u=null,this.o=new Map;var t=Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},D.prototype.componentDidUpdate=D.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){I(n,e,t)})};var z="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,B="undefined"!=typeof Symbol?/fil|che|rad/i:/fil|che|ra/i;function H(n,t,e){return null==t.__k&&(t.textContent=""),Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* render */ "j"])(n,t),"function"==typeof e&&e(),n?n.__c:null}function Z(n,t,e){return Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* hydrate */ "h"])(n,t),"function"==typeof e&&e(),n?n.__c:null}preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"].prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"].prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var Y=preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].event;function $(){}function q(){return this.cancelBubble}function G(){return this.defaultPrevented}preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].event=function(n){return Y&&(n=Y(n)),n.persist=$,n.isPropagationStopped=q,n.isDefaultPrevented=G,n.nativeEvent=n};var J,K={configurable:!0,get:function(){return this.class}},Q={configurable:!0,get:function(){return this.className}},X=preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].vnode;preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!B.test(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():V.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* toChildArray */ "k"])(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),n.props=r}t&&r&&("className"in r?Object.defineProperty(r,"class",Q):Object.defineProperty(r,"className",K)),n.$$typeof=z,X&&X(n)};var nn=preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__r;preact__WEBPACK_IMPORTED_MODULE_1__[/* options */ "i"].__r=function(n){nn&&nn(n),J=n.__c};var tn={ReactCurrentDispatcher:{current:{readContext:function(n){return J.__n[n.__c].props.value}}}},en="16.8.0";function rn(n){return preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"].bind(null,n)}function un(n){return!!n&&n.$$typeof===z}function on(n){return un(n)?preact__WEBPACK_IMPORTED_MODULE_1__[/* cloneElement */ "d"].apply(null,arguments):n}function cn(n){return!!n.__k&&(Object(preact__WEBPACK_IMPORTED_MODULE_1__[/* render */ "j"])(null,n),!0)}function ln(n){return n&&(n.base||1===n.nodeType&&n)||null}var fn=function(n,t){return n(t)},an=preact__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "b"];/* harmony default export */ __webpack_exports__["default"] = ({useState:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useState */ "k"],useReducer:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useReducer */ "i"],useEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useEffect */ "d"],useLayoutEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useLayoutEffect */ "g"],useRef:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useRef */ "j"],useImperativeHandle:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useImperativeHandle */ "f"],useMemo:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useMemo */ "h"],useCallback:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useCallback */ "a"],useContext:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useContext */ "b"],useDebugValue:preact_hooks__WEBPACK_IMPORTED_MODULE_0__[/* useDebugValue */ "c"],version:"16.8.0",Children:A,render:H,hydrate:Z,unmountComponentAtNode:cn,createPortal:P,createElement:preact__WEBPACK_IMPORTED_MODULE_1__[/* createElement */ "f"],createContext:preact__WEBPACK_IMPORTED_MODULE_1__[/* createContext */ "e"],createFactory:rn,cloneElement:on,createRef:preact__WEBPACK_IMPORTED_MODULE_1__[/* createRef */ "g"],Fragment:preact__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "b"],isValidElement:un,findDOMNode:ln,Component:preact__WEBPACK_IMPORTED_MODULE_1__[/* Component */ "a"],PureComponent:w,memo:C,forwardRef:k,unstable_batchedUpdates:fn,StrictMode:preact__WEBPACK_IMPORTED_MODULE_1__[/* Fragment */ "b"],Suspense:F,SuspenseList:D,lazy:j,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:tn});
//# sourceMappingURL=compat.module.js.map


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/*! exports provided: render, hydrate, createElement, h, Fragment, createRef, isValidElement, Component, cloneElement, createContext, toChildArray, __u, options */
/*! exports used: Component, Fragment, __u, cloneElement, createContext, createElement, createRef, hydrate, options, render, toChildArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return h; });
/* unused harmony export h */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return y; });
/* unused harmony export isValidElement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return b; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return n; });
var n,l,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function h(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function y(){return{current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(g)}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s({},o)).__v=i,t=$(f,o,i,l.__n,void 0!==f.ownerSVGElement,null!=o.__h?[r]:null,u,null==r?_(o):r,o.__h),j(u,o),t!=r&&w(o)))})}function m(n,l,u,i,t,o,r,c,s,h){var y,d,w,k,g,m,b,A=i&&i.__k||e,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type)A[y]=void 0;else for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null}g=$(n,k,w=w||f,t,o,r,c,s,h),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),s=x(n,k,w,A,r,g,s),h||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w))}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&L(A[y],A[y]);if(b)for(y=0;y<b.length;y++)I(b[y],b[++y],b[++y])}function b(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){b(n,l)}):l.push(n)),l}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else{for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r}return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function C(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else"o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?N:z,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u))}function z(l){this.l[l.type+!1](n.event?n.event(l):l)}function N(l){this.l[l.type+!0](n.event?n.event(l):l)}function T(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&T(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)))}function $(l,u,i,t,o,r,f,e,c){var a,h,v,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(g,x):(u.__c=h=new d(g,x),h.constructor=P,h.render=M),b&&b.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,P.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,h.__h.length&&f.push(h),T(u,e,l);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,w)})}h.context=x,h.props=g,h.state=h.__s,(a=n.__r)&&a(u),h.__d=!1,h.__v=u,h.__P=l,a=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(w=h.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),k&&(h.__E=h.__=null),h.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i)}return u.__e}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function H(n,l,u,i,t,o,r,c){var s,a,h,v,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else{if(null!=o&&(o=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===n.innerHTML)||(n.innerHTML=v&&v.__html||""))}A(n,d,p,t,c),v?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1))}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o)}function M(n,l,u){return this.constructor(n,u)}function O(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=h(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),j(c,l)}function S(n,l){O(n,l,o)}function q(n,l,u){var i,t,o,r=arguments,f=s({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function B(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n,u,i){return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l}throw n}},l=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f,r=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary */
/*! exports used: useCallback, useContext, useDebugValue, useEffect, useErrorBoundary, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return d; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,u,r,o=0,i=[],c=preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__r,f=preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].diffed,e=preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__c,a=preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].unmount;function v(t,r){preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__h&&preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function m(n){return o=1,p(k,n)}function p(n,r,o){var i=v(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):k(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=u),i.__}function y(r,o){var i=v(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__s&&j(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i))}function l(r,o){var i=v(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__s&&j(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i))}function h(n){return o=5,_(function(){return{current:n}},[])}function s(n,t,u){o=6,l(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==u?u:u.concat(n))}function _(n,u){var r=v(t++,7);return j(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,_(function(){return n},t)}function F(n){var r=u.context[n.__c],o=v(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T(t,u){preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].useDebugValue(u?u(t):t)}function d(n){var r=v(t++,10),o=m();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function q(){i.some(function(t){if(t.__P)try{t.__H.__h.forEach(b),t.__H.__h.forEach(g),t.__H.__h=[]}catch(u){return t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__e(u,t.__v),!0}}),i=[]}preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__r=function(n){c&&c(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(b),r.__h.forEach(g),r.__h=[])},preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].diffed=function(t){f&&f(t);var u=t.__c;u&&u.__H&&u.__H.__h.length&&(1!==i.push(u)&&r===preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].requestAnimationFrame||((r=preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),x&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);x&&(t=requestAnimationFrame(u))})(q))},preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__c=function(t,u){u.some(function(t){try{t.__h.forEach(b),t.__h=t.__h.filter(function(n){return!n.__||g(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__e(r,t.__v)}}),e&&e(t,u)},preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].unmount=function(t){a&&a(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(b)}catch(t){preact__WEBPACK_IMPORTED_MODULE_0__[/* options */ "i"].__e(t,u.__v)}};var x="function"==typeof requestAnimationFrame;function b(n){"function"==typeof n.u&&n.u()}function g(n){n.u=n.__()}function j(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function k(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-inspector/dist/es/react-inspector.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-inspector/dist/es/react-inspector.js ***!
  \*****************************************************************/
/*! exports provided: default, DOMInspector, Inspector, ObjectInspector, ObjectLabel, ObjectName, ObjectPreview, ObjectRootLabel, ObjectValue, TableInspector, chromeDark, chromeLight */
/*! exports used: DOMInspector, Inspector, ObjectLabel, ObjectName, ObjectPreview, ObjectRootLabel, ObjectValue, chromeDark, chromeLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DOMInspector$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Inspector; });
/* unused harmony export ObjectInspector */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ObjectLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ObjectName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ObjectPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ObjectRootLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ObjectValue; });
/* unused harmony export TableInspector */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return theme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return theme$1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-dom */ "./node_modules/is-dom/index.js");
/* harmony import */ var is_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is_dom__WEBPACK_IMPORTED_MODULE_2__);




function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  module.exports = _extends;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var objectWithoutProperties = _objectWithoutProperties;

var theme = {
  BASE_FONT_FAMILY: 'Menlo, monospace',
  BASE_FONT_SIZE: '11px',
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: 'rgb(36, 36, 36)',
  BASE_COLOR: 'rgb(213, 213, 213)',
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: 'rgb(227, 110, 236)',
  OBJECT_VALUE_NULL_COLOR: 'rgb(127, 127, 127)',
  OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(127, 127, 127)',
  OBJECT_VALUE_REGEXP_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_STRING_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_SYMBOL_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_NUMBER_COLOR: 'hsl(252, 100%, 75%)',
  OBJECT_VALUE_BOOLEAN_COLOR: 'hsl(252, 100%, 75%)',
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(85, 106, 242)',
  HTML_TAG_COLOR: 'rgb(93, 176, 215)',
  HTML_TAGNAME_COLOR: 'rgb(93, 176, 215)',
  HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
  HTML_ATTRIBUTE_NAME_COLOR: 'rgb(155, 187, 220)',
  HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(242, 151, 102)',
  HTML_COMMENT_COLOR: 'rgb(137, 137, 137)',
  HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',
  ARROW_COLOR: 'rgb(145, 145, 145)',
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: '0',
  TREENODE_FONT_FAMILY: 'Menlo, monospace',
  TREENODE_FONT_SIZE: '11px',
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: 'rgb(85, 85, 85)',
  TABLE_TH_BACKGROUND_COLOR: 'rgb(44, 44, 44)',
  TABLE_TH_HOVER_COLOR: 'rgb(48, 48, 48)',
  TABLE_SORT_ICON_COLOR: 'black',
  TABLE_DATA_BACKGROUND_IMAGE: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))',
  TABLE_DATA_BACKGROUND_SIZE: '128px 32px'
};

var theme$1 = {
  BASE_FONT_FAMILY: 'Menlo, monospace',
  BASE_FONT_SIZE: '11px',
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: 'white',
  BASE_COLOR: 'black',
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
  OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_REGEXP_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_STRING_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_SYMBOL_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
  HTML_TAG_COLOR: 'rgb(168, 148, 166)',
  HTML_TAGNAME_COLOR: 'rgb(136, 18, 128)',
  HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
  HTML_ATTRIBUTE_NAME_COLOR: 'rgb(153, 69, 0)',
  HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(26, 26, 166)',
  HTML_COMMENT_COLOR: 'rgb(35, 110, 37)',
  HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',
  ARROW_COLOR: '#6e6e6e',
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: '0',
  TREENODE_FONT_FAMILY: 'Menlo, monospace',
  TREENODE_FONT_SIZE: '11px',
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: '#aaa',
  TABLE_TH_BACKGROUND_COLOR: '#eee',
  TABLE_TH_HOVER_COLOR: 'hsla(0, 0%, 90%, 1)',
  TABLE_SORT_ICON_COLOR: '#6e6e6e',
  TABLE_DATA_BACKGROUND_IMAGE: 'linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))',
  TABLE_DATA_BACKGROUND_SIZE: '128px 32px'
};

var themes = /*#__PURE__*/Object.freeze({
__proto__: null,
chromeDark: theme,
chromeLight: theme$1
});

var runtime_1 = createCommonjsModule(function (module) {
  var runtime = function (exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise =
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;
    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    Gp[iteratorSymbol] = function () {
      return this;
    };
    Gp.toString = function () {
      return "[object Generator]";
    };
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
            next.value = undefined$1;
            next.done = true;
            return next;
          };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    exports.values = values;
    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }
    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
   module.exports );
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
var slicedToArray = _slicedToArray;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
    return _typeof(obj);
  }
  module.exports = _typeof;
});

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
var toConsumableArray = _toConsumableArray;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var defineProperty = _defineProperty;

var ExpandedPathsContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])([{}, function () {}]);

var unselectable = {
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  OUserSelect: 'none',
  userSelect: 'none'
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var base = (function (theme) {
  return {
    DOMNodePreview: {
      htmlOpenTag: {
        base: {
          color: theme.HTML_TAG_COLOR
        },
        tagName: {
          color: theme.HTML_TAGNAME_COLOR,
          textTransform: theme.HTML_TAGNAME_TEXT_TRANSFORM
        },
        htmlAttributeName: {
          color: theme.HTML_ATTRIBUTE_NAME_COLOR
        },
        htmlAttributeValue: {
          color: theme.HTML_ATTRIBUTE_VALUE_COLOR
        }
      },
      htmlCloseTag: {
        base: {
          color: theme.HTML_TAG_COLOR
        },
        offsetLeft: {
          marginLeft: -theme.TREENODE_PADDING_LEFT
        },
        tagName: {
          color: theme.HTML_TAGNAME_COLOR,
          textTransform: theme.HTML_TAGNAME_TEXT_TRANSFORM
        }
      },
      htmlComment: {
        color: theme.HTML_COMMENT_COLOR
      },
      htmlDoctype: {
        color: theme.HTML_DOCTYPE_COLOR
      }
    },
    ObjectPreview: {
      objectDescription: {
        fontStyle: 'italic'
      },
      preview: {
        fontStyle: 'italic'
      },
      arrayMaxProperties: theme.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
      objectMaxProperties: theme.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
    },
    ObjectName: {
      base: {
        color: theme.OBJECT_NAME_COLOR
      },
      dimmed: {
        opacity: 0.6
      }
    },
    ObjectValue: {
      objectValueNull: {
        color: theme.OBJECT_VALUE_NULL_COLOR
      },
      objectValueUndefined: {
        color: theme.OBJECT_VALUE_UNDEFINED_COLOR
      },
      objectValueRegExp: {
        color: theme.OBJECT_VALUE_REGEXP_COLOR
      },
      objectValueString: {
        color: theme.OBJECT_VALUE_STRING_COLOR
      },
      objectValueSymbol: {
        color: theme.OBJECT_VALUE_SYMBOL_COLOR
      },
      objectValueNumber: {
        color: theme.OBJECT_VALUE_NUMBER_COLOR
      },
      objectValueBoolean: {
        color: theme.OBJECT_VALUE_BOOLEAN_COLOR
      },
      objectValueFunctionPrefix: {
        color: theme.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
        fontStyle: 'italic'
      },
      objectValueFunctionName: {
        fontStyle: 'italic'
      }
    },
    TreeView: {
      treeViewOutline: {
        padding: 0,
        margin: 0,
        listStyleType: 'none'
      }
    },
    TreeNode: {
      treeNodeBase: {
        color: theme.BASE_COLOR,
        backgroundColor: theme.BASE_BACKGROUND_COLOR,
        lineHeight: theme.TREENODE_LINE_HEIGHT,
        cursor: 'default',
        boxSizing: 'border-box',
        listStyle: 'none',
        fontFamily: theme.TREENODE_FONT_FAMILY,
        fontSize: theme.TREENODE_FONT_SIZE
      },
      treeNodePreviewContainer: {},
      treeNodePlaceholder: _objectSpread({
        whiteSpace: 'pre',
        fontSize: theme.ARROW_FONT_SIZE,
        marginRight: theme.ARROW_MARGIN_RIGHT
      }, unselectable),
      treeNodeArrow: {
        base: _objectSpread(_objectSpread({
          color: theme.ARROW_COLOR,
          display: 'inline-block',
          fontSize: theme.ARROW_FONT_SIZE,
          marginRight: theme.ARROW_MARGIN_RIGHT
        }, parseFloat(theme.ARROW_ANIMATION_DURATION) > 0 ? {
          transition: "transform ".concat(theme.ARROW_ANIMATION_DURATION, " ease 0s")
        } : {}), unselectable),
        expanded: {
          WebkitTransform: 'rotateZ(90deg)',
          MozTransform: 'rotateZ(90deg)',
          transform: 'rotateZ(90deg)'
        },
        collapsed: {
          WebkitTransform: 'rotateZ(0deg)',
          MozTransform: 'rotateZ(0deg)',
          transform: 'rotateZ(0deg)'
        }
      },
      treeNodeChildNodesContainer: {
        margin: 0,
        paddingLeft: theme.TREENODE_PADDING_LEFT
      }
    },
    TableInspector: {
      base: {
        color: theme.BASE_COLOR,
        position: 'relative',
        border: "1px solid ".concat(theme.TABLE_BORDER_COLOR),
        fontFamily: theme.BASE_FONT_FAMILY,
        fontSize: theme.BASE_FONT_SIZE,
        lineHeight: '120%',
        boxSizing: 'border-box',
        cursor: 'default'
      }
    },
    TableInspectorHeaderContainer: {
      base: {
        top: 0,
        height: '17px',
        left: 0,
        right: 0,
        overflowX: 'hidden'
      },
      table: {
        tableLayout: 'fixed',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: '100%',
        width: '100%',
        margin: 0
      }
    },
    TableInspectorDataContainer: {
      tr: {
        display: 'table-row'
      },
      td: {
        boxSizing: 'border-box',
        border: 'none',
        height: '16px',
        verticalAlign: 'top',
        padding: '1px 4px',
        WebkitUserSelect: 'text',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        lineHeight: '14px'
      },
      div: {
        position: 'static',
        top: '17px',
        bottom: 0,
        overflowY: 'overlay',
        transform: 'translateZ(0)',
        left: 0,
        right: 0,
        overflowX: 'hidden'
      },
      table: {
        positon: 'static',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderTop: '0 none transparent',
        margin: 0,
        backgroundImage: theme.TABLE_DATA_BACKGROUND_IMAGE,
        backgroundSize: theme.TABLE_DATA_BACKGROUND_SIZE,
        tableLayout: 'fixed',
        borderSpacing: 0,
        borderCollapse: 'separate',
        width: '100%',
        fontSize: theme.BASE_FONT_SIZE,
        lineHeight: '120%'
      }
    },
    TableInspectorTH: {
      base: {
        position: 'relative',
        height: 'auto',
        textAlign: 'left',
        backgroundColor: theme.TABLE_TH_BACKGROUND_COLOR,
        borderBottom: "1px solid ".concat(theme.TABLE_BORDER_COLOR),
        fontWeight: 'normal',
        verticalAlign: 'middle',
        padding: '0 4px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        lineHeight: '14px',
        ':hover': {
          backgroundColor: theme.TABLE_TH_HOVER_COLOR
        }
      },
      div: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: theme.BASE_FONT_SIZE,
        lineHeight: '120%'
      }
    },
    TableInspectorLeftBorder: {
      none: {
        borderLeft: 'none'
      },
      solid: {
        borderLeft: "1px solid ".concat(theme.TABLE_BORDER_COLOR)
      }
    },
    TableInspectorSortIcon: _objectSpread({
      display: 'block',
      marginRight: 3,
      width: 8,
      height: 7,
      marginTop: -7,
      color: theme.TABLE_SORT_ICON_COLOR,
      fontSize: 12
    }, unselectable)
  };
});

var DEFAULT_THEME_NAME = 'chromeLight';
var ThemeContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(base(themes[DEFAULT_THEME_NAME]));
var useStyles = function useStyles(baseStylesKey) {
  var themeStyles = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ThemeContext);
  return themeStyles[baseStylesKey];
};
var themeAcceptor = function themeAcceptor(WrappedComponent) {
  var ThemeAcceptor = function ThemeAcceptor(_ref) {
    var _ref$theme = _ref.theme,
        theme = _ref$theme === void 0 ? DEFAULT_THEME_NAME : _ref$theme,
        restProps = objectWithoutProperties(_ref, ["theme"]);
    var themeStyles = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
      switch (Object.prototype.toString.call(theme)) {
        case '[object String]':
          return base(themes[theme]);
        case '[object Object]':
          return base(theme);
        default:
          return base(themes[DEFAULT_THEME_NAME]);
      }
    }, [theme]);
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ThemeContext.Provider, {
      value: themeStyles
    }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(WrappedComponent, restProps));
  };
  ThemeAcceptor.propTypes = {
    theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object])
  };
  return ThemeAcceptor;
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Arrow = function Arrow(_ref) {
  var expanded = _ref.expanded,
      styles = _ref.styles;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: _objectSpread$1(_objectSpread$1({}, styles.base), expanded ? styles.expanded : styles.collapsed)
  }, "\u25B6");
};
var TreeNode = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (props) {
  props = _objectSpread$1({
    expanded: true,
    nodeRenderer: function nodeRenderer(_ref2) {
      var name = _ref2.name;
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, name);
    },
    onClick: function onClick() {},
    shouldShowArrow: false,
    shouldShowPlaceholder: true
  }, props);
  var _props = props,
      expanded = _props.expanded,
      onClick = _props.onClick,
      children = _props.children,
      nodeRenderer = _props.nodeRenderer,
      title = _props.title,
      shouldShowArrow = _props.shouldShowArrow,
      shouldShowPlaceholder = _props.shouldShowPlaceholder;
  var styles = useStyles('TreeNode');
  var NodeRenderer = nodeRenderer;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
    "aria-expanded": expanded,
    role: "treeitem",
    style: styles.treeNodeBase,
    title: title
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles.treeNodePreviewContainer,
    onClick: onClick
  }, shouldShowArrow || react__WEBPACK_IMPORTED_MODULE_0__["Children"].count(children) > 0 ? react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(Arrow, {
    expanded: expanded,
    styles: styles.treeNodeArrow
  }) : shouldShowPlaceholder && react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: styles.treeNodePlaceholder
  }, "\xA0"), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(NodeRenderer, props)), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ol", {
    role: "group",
    style: styles.treeNodeChildNodesContainer
  }, expanded ? children : undefined));
});
TreeNode.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  expanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  shouldShowArrow: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  shouldShowPlaceholder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  nodeRenderer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var DEFAULT_ROOT_PATH = '$';
var WILDCARD = '*';
function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}
var wildcardPathsFromLevel = function wildcardPathsFromLevel(level) {
  return Array.from({
    length: level
  }, function (_, i) {
    return [DEFAULT_ROOT_PATH].concat(Array.from({
      length: i
    }, function () {
      return '*';
    })).join('.');
  });
};
var getExpandedPaths = function getExpandedPaths(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths) {
  var wildcardPaths = [].concat(wildcardPathsFromLevel(expandLevel)).concat(expandPaths).filter(function (path) {
    return typeof path === 'string';
  });
  var expandedPaths = [];
  wildcardPaths.forEach(function (wildcardPath) {
    var keyPaths = wildcardPath.split('.');
    var populatePaths = function populatePaths(curData, curPath, depth) {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }
      var key = keyPaths[depth];
      if (depth === 0) {
        if (hasChildNodes(curData, dataIterator) && (key === DEFAULT_ROOT_PATH || key === WILDCARD)) {
          populatePaths(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          var _iterator = _createForOfIteratorHelper(dataIterator(curData)),
              _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _step.value,
                  name = _step$value.name,
                  _data = _step$value.data;
              if (hasChildNodes(_data, dataIterator)) {
                populatePaths(_data, "".concat(curPath, ".").concat(name), depth + 1);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          var value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, "".concat(curPath, ".").concat(key), depth + 1);
          }
        }
      }
    };
    populatePaths(data, '', 0);
  });
  return expandedPaths.reduce(function (obj, path) {
    obj[path] = true;
    return obj;
  }, _objectSpread$2({}, prevExpandedPaths));
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ConnectedTreeNode = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (props) {
  var data = props.data,
      dataIterator = props.dataIterator,
      path = props.path,
      depth = props.depth,
      nodeRenderer = props.nodeRenderer;
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(ExpandedPathsContext),
      _useContext2 = slicedToArray(_useContext, 2),
      expandedPaths = _useContext2[0],
      setExpandedPaths = _useContext2[1];
  var nodeHasChildNodes = hasChildNodes(data, dataIterator);
  var expanded = !!expandedPaths[path];
  var handleClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return nodeHasChildNodes && setExpandedPaths(function (prevExpandedPaths) {
      return _objectSpread$3(_objectSpread$3({}, prevExpandedPaths), {}, defineProperty({}, path, !expanded));
    });
  }, [nodeHasChildNodes, setExpandedPaths, path, expanded]);
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TreeNode, _extends_1({
    expanded: expanded,
    onClick: handleClick
    ,
    shouldShowArrow: nodeHasChildNodes
    ,
    shouldShowPlaceholder: depth > 0
    ,
    nodeRenderer: nodeRenderer
  }, props),
  expanded ? toConsumableArray(dataIterator(data)).map(function (_ref) {
    var name = _ref.name,
        data = _ref.data,
        renderNodeProps = objectWithoutProperties(_ref, ["name", "data"]);
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ConnectedTreeNode, _extends_1({
      name: name,
      data: data,
      depth: depth + 1,
      path: "".concat(path, ".").concat(name),
      key: name,
      dataIterator: dataIterator,
      nodeRenderer: nodeRenderer
    }, renderNodeProps));
  }) : null);
});
ConnectedTreeNode.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  dataIterator: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  depth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  expanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  nodeRenderer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
var TreeView = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (_ref2) {
  var name = _ref2.name,
      data = _ref2.data,
      dataIterator = _ref2.dataIterator,
      nodeRenderer = _ref2.nodeRenderer,
      expandPaths = _ref2.expandPaths,
      expandLevel = _ref2.expandLevel;
  var styles = useStyles('TreeView');
  var stateAndSetter = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  var _stateAndSetter = slicedToArray(stateAndSetter, 2),
      setExpandedPaths = _stateAndSetter[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function () {
    return setExpandedPaths(function (prevExpandedPaths) {
      return getExpandedPaths(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths);
    });
  }, [data, dataIterator, expandPaths, expandLevel]);
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ExpandedPathsContext.Provider, {
    value: stateAndSetter
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ol", {
    role: "tree",
    style: styles.treeViewOutline
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ConnectedTreeNode, {
    name: name,
    data: data,
    dataIterator: dataIterator,
    depth: 0,
    path: DEFAULT_ROOT_PATH,
    nodeRenderer: nodeRenderer
  })));
});
TreeView.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  dataIterator: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  nodeRenderer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  expandPaths: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array]),
  expandLevel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ObjectName = function ObjectName(_ref) {
  var name = _ref.name,
      _ref$dimmed = _ref.dimmed,
      dimmed = _ref$dimmed === void 0 ? false : _ref$dimmed,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles;
  var themeStyles = useStyles('ObjectName');
  var appliedStyles = _objectSpread$4(_objectSpread$4(_objectSpread$4({}, themeStyles.base), dimmed ? themeStyles['dimmed'] : {}), styles);
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: appliedStyles
  }, name);
};
ObjectName.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dimmed: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ObjectValue = function ObjectValue(_ref) {
  var object = _ref.object,
      styles = _ref.styles;
  var themeStyles = useStyles('ObjectValue');
  var mkStyle = function mkStyle(key) {
    return _objectSpread$5(_objectSpread$5({}, themeStyles[key]), styles);
  };
  switch (_typeof_1(object)) {
    case 'bigint':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueNumber')
      }, String(object), "n");
    case 'number':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueNumber')
      }, String(object));
    case 'string':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueString')
      }, "\"", object, "\"");
    case 'boolean':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueBoolean')
      }, String(object));
    case 'undefined':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueUndefined')
      }, "undefined");
    case 'object':
      if (object === null) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          style: mkStyle('objectValueNull')
        }, "null");
      }
      if (object instanceof Date) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, object.toString());
      }
      if (object instanceof RegExp) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          style: mkStyle('objectValueRegExp')
        }, object.toString());
      }
      if (Array.isArray(object)) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, "Array(".concat(object.length, ")"));
      }
      if (!object.constructor) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, "Object");
      }
      if (typeof object.constructor.isBuffer === 'function' && object.constructor.isBuffer(object)) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, "Buffer[".concat(object.length, "]"));
      }
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, object.constructor.name);
    case 'function':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueFunctionPrefix')
      }, "\u0192\xA0"), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueFunctionName')
      }, object.name, "()"));
    case 'symbol':
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: mkStyle('objectValueSymbol')
      }, object.toString());
    default:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null);
  }
};
ObjectValue.propTypes = {
  object: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
};

var hasOwnProperty = Object.prototype.hasOwnProperty;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

function getPropertyValue(object, propertyName) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
  if (propertyDescriptor.get) {
    try {
      return propertyDescriptor.get();
    } catch (_unused) {
      return propertyDescriptor.get;
    }
  }
  return object[propertyName];
}

function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }
  return arr.slice(1).reduce(function (xs, x) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}
var ObjectPreview = function ObjectPreview(_ref) {
  var data = _ref.data;
  var styles = useStyles('ObjectPreview');
  var object = data;
  if (_typeof_1(object) !== 'object' || object === null || object instanceof Date || object instanceof RegExp) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectValue, {
      object: object
    });
  }
  if (Array.isArray(object)) {
    var maxProperties = styles.arrayMaxProperties;
    var previewArray = object.slice(0, maxProperties).map(function (element, index) {
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectValue, {
        key: index,
        object: element
      });
    });
    if (object.length > maxProperties) {
      previewArray.push( react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        key: "ellipsis"
      }, "\u2026"));
    }
    var arrayLength = object.length;
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_0__["default"].Fragment, null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: styles.objectDescription
    }, arrayLength === 0 ? "" : "(".concat(arrayLength, ")\xA0")), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: styles.preview
    }, "[", intersperse(previewArray, ', '), "]"));
  } else {
    var _maxProperties = styles.objectMaxProperties;
    var propertyNodes = [];
    for (var propertyName in object) {
      if (hasOwnProperty.call(object, propertyName)) {
        var ellipsis = void 0;
        if (propertyNodes.length === _maxProperties - 1 && Object.keys(object).length > _maxProperties) {
          ellipsis = react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
            key: 'ellipsis'
          }, "\u2026");
        }
        var propertyValue = getPropertyValue(object, propertyName);
        propertyNodes.push( react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          key: propertyName
        }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectName, {
          name: propertyName || "\"\""
        }), ":\xA0", react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectValue, {
          object: propertyValue
        }), ellipsis));
        if (ellipsis) break;
      }
    }
    var objectConstructorName = object.constructor ? object.constructor.name : 'Object';
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_0__["default"].Fragment, null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: styles.objectDescription
    }, objectConstructorName === 'Object' ? '' : "".concat(objectConstructorName, " ")), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: styles.preview
    }, '{', intersperse(propertyNodes, ', '), '}'));
  }
};

var ObjectRootLabel = function ObjectRootLabel(_ref) {
  var name = _ref.name,
      data = _ref.data;
  if (typeof name === 'string') {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectName, {
      name: name
    }), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, ": "), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectPreview, {
      data: data
    }));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectPreview, {
      data: data
    });
  }
};

var ObjectLabel = function ObjectLabel(_ref) {
  var name = _ref.name,
      data = _ref.data,
      _ref$isNonenumerable = _ref.isNonenumerable,
      isNonenumerable = _ref$isNonenumerable === void 0 ? false : _ref$isNonenumerable;
  var object = data;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, typeof name === 'string' ? react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectName, {
    name: name,
    dimmed: isNonenumerable
  }) : react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectPreview, {
    data: name
  }), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, ": "), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectValue, {
    object: object
  }));
};
ObjectLabel.propTypes = {
  isNonenumerable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var createIterator = function createIterator(showNonenumerable, sortObjectKeys) {
  var objectIterator = regenerator.mark(function objectIterator(data) {
    var shouldIterate, dataIsArray, i, _iterator, _step, entry, _entry, k, v, keys, _iterator2, _step2, propertyName, propertyValue, _propertyValue;
    return regenerator.wrap(function objectIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldIterate = _typeof_1(data) === 'object' && data !== null || typeof data === 'function';
            if (shouldIterate) {
              _context.next = 3;
              break;
            }
            return _context.abrupt("return");
          case 3:
            dataIsArray = Array.isArray(data);
            if (!(!dataIsArray && data[Symbol.iterator])) {
              _context.next = 32;
              break;
            }
            i = 0;
            _iterator = _createForOfIteratorHelper$1(data);
            _context.prev = 7;
            _iterator.s();
          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 22;
              break;
            }
            entry = _step.value;
            if (!(Array.isArray(entry) && entry.length === 2)) {
              _context.next = 17;
              break;
            }
            _entry = slicedToArray(entry, 2), k = _entry[0], v = _entry[1];
            _context.next = 15;
            return {
              name: k,
              data: v
            };
          case 15:
            _context.next = 19;
            break;
          case 17:
            _context.next = 19;
            return {
              name: i.toString(),
              data: entry
            };
          case 19:
            i++;
          case 20:
            _context.next = 9;
            break;
          case 22:
            _context.next = 27;
            break;
          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](7);
            _iterator.e(_context.t0);
          case 27:
            _context.prev = 27;
            _iterator.f();
            return _context.finish(27);
          case 30:
            _context.next = 64;
            break;
          case 32:
            keys = Object.getOwnPropertyNames(data);
            if (sortObjectKeys === true && !dataIsArray) {
              keys.sort();
            } else if (typeof sortObjectKeys === 'function') {
              keys.sort(sortObjectKeys);
            }
            _iterator2 = _createForOfIteratorHelper$1(keys);
            _context.prev = 35;
            _iterator2.s();
          case 37:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 53;
              break;
            }
            propertyName = _step2.value;
            if (!propertyIsEnumerable.call(data, propertyName)) {
              _context.next = 45;
              break;
            }
            propertyValue = getPropertyValue(data, propertyName);
            _context.next = 43;
            return {
              name: propertyName || "\"\"",
              data: propertyValue
            };
          case 43:
            _context.next = 51;
            break;
          case 45:
            if (!showNonenumerable) {
              _context.next = 51;
              break;
            }
            _propertyValue = void 0;
            try {
              _propertyValue = getPropertyValue(data, propertyName);
            } catch (e) {
            }
            if (!(_propertyValue !== undefined)) {
              _context.next = 51;
              break;
            }
            _context.next = 51;
            return {
              name: propertyName,
              data: _propertyValue,
              isNonenumerable: true
            };
          case 51:
            _context.next = 37;
            break;
          case 53:
            _context.next = 58;
            break;
          case 55:
            _context.prev = 55;
            _context.t1 = _context["catch"](35);
            _iterator2.e(_context.t1);
          case 58:
            _context.prev = 58;
            _iterator2.f();
            return _context.finish(58);
          case 61:
            if (!(showNonenumerable && data !== Object.prototype
            )) {
              _context.next = 64;
              break;
            }
            _context.next = 64;
            return {
              name: '__proto__',
              data: Object.getPrototypeOf(data),
              isNonenumerable: true
            };
          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, objectIterator, null, [[7, 24, 27, 30], [35, 55, 58, 61]]);
  });
  return objectIterator;
};
var defaultNodeRenderer = function defaultNodeRenderer(_ref) {
  var depth = _ref.depth,
      name = _ref.name,
      data = _ref.data,
      isNonenumerable = _ref.isNonenumerable;
  return depth === 0 ? react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectRootLabel, {
    name: name,
    data: data
  }) : react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectLabel, {
    name: name,
    data: data,
    isNonenumerable: isNonenumerable
  });
};
var ObjectInspector = function ObjectInspector(_ref2) {
  var _ref2$showNonenumerab = _ref2.showNonenumerable,
      showNonenumerable = _ref2$showNonenumerab === void 0 ? false : _ref2$showNonenumerab,
      sortObjectKeys = _ref2.sortObjectKeys,
      nodeRenderer = _ref2.nodeRenderer,
      treeViewProps = objectWithoutProperties(_ref2, ["showNonenumerable", "sortObjectKeys", "nodeRenderer"]);
  var dataIterator = createIterator(showNonenumerable, sortObjectKeys);
  var renderer = nodeRenderer ? nodeRenderer : defaultNodeRenderer;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TreeView, _extends_1({
    nodeRenderer: renderer,
    dataIterator: dataIterator
  }, treeViewProps));
};
ObjectInspector.propTypes = {
  expandLevel: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  expandPaths: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array]),
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  showNonenumerable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  sortObjectKeys: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  nodeRenderer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
var ObjectInspector$1 = themeAcceptor(ObjectInspector);

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement
  ) {
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
        return true;
      }
      k++;
    }
    return false;
  };
}
function getHeaders(data) {
  if (_typeof_1(data) === 'object') {
    var rowHeaders;
    if (Array.isArray(data)) {
      var nRows = data.length;
      rowHeaders = toConsumableArray(Array(nRows).keys());
    } else if (data !== null) {
      rowHeaders = Object.keys(data);
    }
    var colHeaders = rowHeaders.reduce(function (colHeaders, rowHeader) {
      var row = data[rowHeader];
      if (_typeof_1(row) === 'object' && row !== null) {
        var cols = Object.keys(row);
        cols.reduce(function (xs, x) {
          if (!xs.includes(x)) {
            xs.push(x);
          }
          return xs;
        }, colHeaders);
      }
      return colHeaders;
    }, []);
    return {
      rowHeaders: rowHeaders,
      colHeaders: colHeaders
    };
  }
  return undefined;
}

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var DataContainer = function DataContainer(_ref) {
  var rows = _ref.rows,
      columns = _ref.columns,
      rowsData = _ref.rowsData;
  var styles = useStyles('TableInspectorDataContainer');
  var borderStyles = useStyles('TableInspectorLeftBorder');
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles.div
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("table", {
    style: styles.table
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("colgroup", null), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("tbody", null, rows.map(function (row, i) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("tr", {
      key: row,
      style: styles.tr
    }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("td", {
      style: _objectSpread$6(_objectSpread$6({}, styles.td), borderStyles.none)
    }, row), columns.map(function (column) {
      var rowData = rowsData[i];
      if (_typeof_1(rowData) === 'object' && rowData !== null && hasOwnProperty.call(rowData, column)) {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("td", {
          key: column,
          style: _objectSpread$6(_objectSpread$6({}, styles.td), borderStyles.solid)
        }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectValue, {
          object: rowData[column]
        }));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("td", {
          key: column,
          style: _objectSpread$6(_objectSpread$6({}, styles.td), borderStyles.solid)
        });
      }
    }));
  }))));
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SortIconContainer = function SortIconContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: {
      position: 'absolute',
      top: 1,
      right: 0,
      bottom: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }, props.children);
};
var SortIcon = function SortIcon(_ref) {
  var sortAscending = _ref.sortAscending;
  var styles = useStyles('TableInspectorSortIcon');
  var glyph = sortAscending ? '▲' : '▼';
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles
  }, glyph);
};
var TH = function TH(_ref2) {
  var _ref2$sortAscending = _ref2.sortAscending,
      sortAscending = _ref2$sortAscending === void 0 ? false : _ref2$sortAscending,
      _ref2$sorted = _ref2.sorted,
      sorted = _ref2$sorted === void 0 ? false : _ref2$sorted,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? undefined : _ref2$onClick,
      _ref2$borderStyle = _ref2.borderStyle,
      borderStyle = _ref2$borderStyle === void 0 ? {} : _ref2$borderStyle,
      children = _ref2.children,
      thProps = objectWithoutProperties(_ref2, ["sortAscending", "sorted", "onClick", "borderStyle", "children"]);
  var styles = useStyles('TableInspectorTH');
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = slicedToArray(_useState, 2),
      hovered = _useState2[0],
      setHovered = _useState2[1];
  var handleMouseEnter = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return setHovered(true);
  }, []);
  var handleMouseLeave = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return setHovered(false);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("th", _extends_1({}, thProps, {
    style: _objectSpread$7(_objectSpread$7(_objectSpread$7({}, styles.base), borderStyle), hovered ? styles.base[':hover'] : {}),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: onClick
  }), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles.div
  }, children), sorted && react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(SortIconContainer, null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(SortIcon, {
    sortAscending: sortAscending
  })));
};

var HeaderContainer = function HeaderContainer(_ref) {
  var _ref$indexColumnText = _ref.indexColumnText,
      indexColumnText = _ref$indexColumnText === void 0 ? '(index)' : _ref$indexColumnText,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      sorted = _ref.sorted,
      sortIndexColumn = _ref.sortIndexColumn,
      sortColumn = _ref.sortColumn,
      sortAscending = _ref.sortAscending,
      onTHClick = _ref.onTHClick,
      onIndexTHClick = _ref.onIndexTHClick;
  var styles = useStyles('TableInspectorHeaderContainer');
  var borderStyles = useStyles('TableInspectorLeftBorder');
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles.base
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("table", {
    style: styles.table
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("tbody", null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TH, {
    borderStyle: borderStyles.none,
    sorted: sorted && sortIndexColumn,
    sortAscending: sortAscending,
    onClick: onIndexTHClick
  }, indexColumnText), columns.map(function (column) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TH, {
      borderStyle: borderStyles.solid,
      key: column,
      sorted: sorted && sortColumn === column,
      sortAscending: sortAscending,
      onClick: onTHClick.bind(null, column)
    }, column);
  })))));
};

var TableInspector = function TableInspector(_ref) {
  var data = _ref.data,
      columns = _ref.columns;
  var styles = useStyles('TableInspector');
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    sorted: false,
    sortIndexColumn: false,
    sortColumn: undefined,
    sortAscending: false
  }),
      _useState2 = slicedToArray(_useState, 2),
      _useState2$ = _useState2[0],
      sorted = _useState2$.sorted,
      sortIndexColumn = _useState2$.sortIndexColumn,
      sortColumn = _useState2$.sortColumn,
      sortAscending = _useState2$.sortAscending,
      setState = _useState2[1];
  var handleIndexTHClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    setState(function (_ref2) {
      var sortIndexColumn = _ref2.sortIndexColumn,
          sortAscending = _ref2.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: true,
        sortColumn: undefined,
        sortAscending: sortIndexColumn ? !sortAscending : true
      };
    });
  }, []);
  var handleTHClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (col) {
    setState(function (_ref3) {
      var sortColumn = _ref3.sortColumn,
          sortAscending = _ref3.sortAscending;
      return {
        sorted: true,
        sortIndexColumn: false,
        sortColumn: col,
        sortAscending: col === sortColumn ? !sortAscending : true
      };
    });
  }, []);
  if (_typeof_1(data) !== 'object' || data === null) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null);
  }
  var _getHeaders = getHeaders(data),
      rowHeaders = _getHeaders.rowHeaders,
      colHeaders = _getHeaders.colHeaders;
  if (columns !== undefined) {
    colHeaders = columns;
  }
  var rowsData = rowHeaders.map(function (rowHeader) {
    return data[rowHeader];
  });
  var columnDataWithRowIndexes;
  if (sortColumn !== undefined) {
    columnDataWithRowIndexes = rowsData.map(function (rowData, index) {
      if (_typeof_1(rowData) === 'object' && rowData !== null
      ) {
          var columnData = rowData[sortColumn];
          return [columnData, index];
        }
      return [undefined, index];
    });
  } else {
    if (sortIndexColumn) {
      columnDataWithRowIndexes = rowHeaders.map(function (rowData, index) {
        var columnData = rowHeaders[index];
        return [columnData, index];
      });
    }
  }
  if (columnDataWithRowIndexes !== undefined) {
    var comparator = function comparator(mapper, ascending) {
      return function (a, b) {
        var v1 = mapper(a);
        var v2 = mapper(b);
        var type1 = _typeof_1(v1);
        var type2 = _typeof_1(v2);
        var lt = function lt(v1, v2) {
          if (v1 < v2) {
            return -1;
          } else if (v1 > v2) {
            return 1;
          } else {
            return 0;
          }
        };
        var result;
        if (type1 === type2) {
          result = lt(v1, v2);
        } else {
          var order = {
            string: 0,
            number: 1,
            object: 2,
            symbol: 3,
            boolean: 4,
            undefined: 5,
            function: 6
          };
          result = lt(order[type1], order[type2]);
        }
        if (!ascending) result = -result;
        return result;
      };
    };
    var sortedRowIndexes = columnDataWithRowIndexes.sort(comparator(function (item) {
      return item[0];
    }, sortAscending)).map(function (item) {
      return item[1];
    });
    rowHeaders = sortedRowIndexes.map(function (i) {
      return rowHeaders[i];
    });
    rowsData = sortedRowIndexes.map(function (i) {
      return rowsData[i];
    });
  }
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: styles.base
  }, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(HeaderContainer, {
    columns: colHeaders
    ,
    sorted: sorted,
    sortIndexColumn: sortIndexColumn,
    sortColumn: sortColumn,
    sortAscending: sortAscending,
    onTHClick: handleTHClick,
    onIndexTHClick: handleIndexTHClick
  }), react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(DataContainer, {
    rows: rowHeaders,
    columns: colHeaders,
    rowsData: rowsData
  }));
};
TableInspector.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object]),
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};
var TableInspector$1 = themeAcceptor(TableInspector);

var TEXT_NODE_MAX_INLINE_CHARS = 80;
var shouldInline = function shouldInline(data) {
  return data.childNodes.length === 0 || data.childNodes.length === 1 && data.childNodes[0].nodeType === Node.TEXT_NODE && data.textContent.length < TEXT_NODE_MAX_INLINE_CHARS;
};

var OpenTag = function OpenTag(_ref) {
  var tagName = _ref.tagName,
      attributes = _ref.attributes,
      styles = _ref.styles;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: styles.base
  }, '<', react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: styles.tagName
  }, tagName), function () {
    if (attributes) {
      var attributeNodes = [];
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        attributeNodes.push( react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          key: i
        }, ' ', react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          style: styles.htmlAttributeName
        }, attribute.name), '="', react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          style: styles.htmlAttributeValue
        }, attribute.value), '"'));
      }
      return attributeNodes;
    }
  }(), '>');
};
var CloseTag = function CloseTag(_ref2) {
  var tagName = _ref2.tagName,
      _ref2$isChildNode = _ref2.isChildNode,
      isChildNode = _ref2$isChildNode === void 0 ? false : _ref2$isChildNode,
      styles = _ref2.styles;
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: _extends_1({}, styles.base, isChildNode && styles.offsetLeft)
  }, '</', react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
    style: styles.tagName
  }, tagName), '>');
};
var nameByNodeType = {
  1: 'ELEMENT_NODE',
  3: 'TEXT_NODE',
  7: 'PROCESSING_INSTRUCTION_NODE',
  8: 'COMMENT_NODE',
  9: 'DOCUMENT_NODE',
  10: 'DOCUMENT_TYPE_NODE',
  11: 'DOCUMENT_FRAGMENT_NODE'
};
var DOMNodePreview = function DOMNodePreview(_ref3) {
  var isCloseTag = _ref3.isCloseTag,
      data = _ref3.data,
      expanded = _ref3.expanded;
  var styles = useStyles('DOMNodePreview');
  if (isCloseTag) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(CloseTag, {
      styles: styles.htmlCloseTag,
      isChildNode: true,
      tagName: data.tagName
    });
  }
  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(OpenTag, {
        tagName: data.tagName,
        attributes: data.attributes,
        styles: styles.htmlOpenTag
      }), shouldInline(data) ? data.textContent : !expanded && '…', !expanded && react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(CloseTag, {
        tagName: data.tagName,
        styles: styles.htmlCloseTag
      }));
    case Node.TEXT_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, data.textContent);
    case Node.CDATA_SECTION_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, '<![CDATA[' + data.textContent + ']]>');
    case Node.COMMENT_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: styles.htmlComment
      }, '<!--', data.textContent, '-->');
    case Node.PROCESSING_INSTRUCTION_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, data.nodeName);
    case Node.DOCUMENT_TYPE_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: styles.htmlDoctype
      }, '<!DOCTYPE ', data.name, data.publicId ? " PUBLIC \"".concat(data.publicId, "\"") : '', !data.publicId && data.systemId ? ' SYSTEM' : '', data.systemId ? " \"".concat(data.systemId, "\"") : '', '>');
    case Node.DOCUMENT_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, data.nodeName);
    case Node.DOCUMENT_FRAGMENT_NODE:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, data.nodeName);
    default:
      return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, nameByNodeType[data.nodeType]);
  }
};
DOMNodePreview.propTypes = {
  isCloseTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  expanded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};

var domIterator = regenerator.mark(function domIterator(data) {
  var textInlined, i, node;
  return regenerator.wrap(function domIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(data && data.childNodes)) {
            _context.next = 17;
            break;
          }
          textInlined = shouldInline(data);
          if (!textInlined) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");
        case 4:
          i = 0;
        case 5:
          if (!(i < data.childNodes.length)) {
            _context.next = 14;
            break;
          }
          node = data.childNodes[i];
          if (!(node.nodeType === Node.TEXT_NODE && node.textContent.trim().length === 0)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("continue", 11);
        case 9:
          _context.next = 11;
          return {
            name: "".concat(node.tagName, "[").concat(i, "]"),
            data: node
          };
        case 11:
          i++;
          _context.next = 5;
          break;
        case 14:
          if (!data.tagName) {
            _context.next = 17;
            break;
          }
          _context.next = 17;
          return {
            name: 'CLOSE_TAG',
            data: {
              tagName: data.tagName
            },
            isCloseTag: true
          };
        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, domIterator);
});
var DOMInspector = function DOMInspector(props) {
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TreeView, _extends_1({
    nodeRenderer: DOMNodePreview,
    dataIterator: domIterator
  }, props));
};
DOMInspector.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
var DOMInspector$1 = themeAcceptor(DOMInspector);

var Inspector = function Inspector(_ref) {
  var _ref$table = _ref.table,
      table = _ref$table === void 0 ? false : _ref$table,
      data = _ref.data,
      rest = objectWithoutProperties(_ref, ["table", "data"]);
  if (table) {
    return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(TableInspector$1, _extends_1({
      data: data
    }, rest));
  }
  if (is_dom__WEBPACK_IMPORTED_MODULE_2___default()(data)) return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(DOMInspector$1, _extends_1({
    data: data
  }, rest));
  return react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ObjectInspector$1, _extends_1({
    data: data
  }, rest));
};
Inspector.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  table: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

/* unused harmony default export */ var _unused_webpack_default_export = (Inspector);

//# sourceMappingURL=react-inspector.js.map


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NhY2hlL2Rpc3QvY2FjaGUuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2NvcmUvZGlzdC9jb3JlLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9jc3MvZGlzdC9jc3MuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL2hhc2gvZGlzdC9oYXNoLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9pcy1wcm9wLXZhbGlkL2Rpc3QvaXMtcHJvcC12YWxpZC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vbWVtb2l6ZS9kaXN0L21lbW9pemUuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3NlcmlhbGl6ZS9kaXN0L3NlcmlhbGl6ZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc2hlZXQvZGlzdC9zaGVldC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc3R5bGVkLWJhc2UvZGlzdC9zdHlsZWQtYmFzZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGVtb3Rpb24vc3R5bGVkL2Rpc3Qvc3R5bGVkLmJyb3dzZXIuZXNtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9zdHlsaXMuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3VuaXRsZXNzL2Rpc3QvdW5pdGxlc3MuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3V0aWxzL2Rpc3QvdXRpbHMuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BlbW90aW9uL3dlYWstbWVtb2l6ZS9kaXN0L3dlYWstbWVtb2l6ZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29uc29sZS1mZWVkLW1vZGVybi9saWIvQ29tcG9uZW50L01lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL0NvbXBvbmVudC9kZXZ0b29scy1wYXJzZXIvZm9ybWF0LW1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL0NvbXBvbmVudC9kZXZ0b29scy1wYXJzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL0NvbXBvbmVudC9kZXZ0b29scy1wYXJzZXIvc3RyaW5nLXV0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWZlZWQtbW9kZXJuL2xpYi9Db21wb25lbnQvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL0NvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29uc29sZS1mZWVkLW1vZGVybi9saWIvQ29tcG9uZW50L21lc3NhZ2UtcGFyc2Vycy9FcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29uc29sZS1mZWVkLW1vZGVybi9saWIvQ29tcG9uZW50L21lc3NhZ2UtcGFyc2Vycy9Gb3JtYXR0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL0NvbXBvbmVudC9tZXNzYWdlLXBhcnNlcnMvT2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWZlZWQtbW9kZXJuL2xpYi9Db21wb25lbnQvcmVhY3QtaW5zcGVjdG9yL2VsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWZlZWQtbW9kZXJuL2xpYi9Db21wb25lbnQvcmVhY3QtaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWZlZWQtbW9kZXJuL2xpYi9Db21wb25lbnQvdGhlbWUvZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29uc29sZS1mZWVkLW1vZGVybi9saWIvQ29tcG9uZW50L3RoZW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb25zb2xlLWZlZWQtbW9kZXJuL2xpYi9Vbmhvb2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtZmVlZC1tb2Rlcm4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbW90aW9uLXRoZW1pbmcvZGlzdC9lbW90aW9uLXRoZW1pbmcuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2Rpc3QvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MuY2pzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtd2luZG93L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9saW5raWZ5LWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvbGlua2lmeS1yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9saW5raWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvbGliL2xpbmtpZnkvY29yZS9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvbGlua2lmeS9jb3JlL3NjYW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvbGlua2lmeS9jb3JlL3N0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvbGliL2xpbmtpZnkvY29yZS90b2tlbnMvY3JlYXRlLXRva2VuLWNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvbGliL2xpbmtpZnkvY29yZS90b2tlbnMvbXVsdGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvbGlua2lmeS9jb3JlL3Rva2Vucy90ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvbGliL2xpbmtpZnkvdXRpbHMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvbGlua2lmeS91dGlscy9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saW5raWZ5anMvbGliL3NpbXBsZS1odG1sLXRva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvZW50aXR5LXBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvZXZlbnRlZC10b2tlbml6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvc2ltcGxlLWh0bWwtdG9rZW5pemVyL2h0bWw1LW5hbWVkLWNoYXItcmVmcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvdG9rZW5pemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9saWIvc2ltcGxlLWh0bWwtdG9rZW5pemVyL3Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGlua2lmeWpzL2xpYi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpbmtpZnlqcy9yZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJlYWN0L2NvbXBhdC9kaXN0L2NvbXBhdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9kaXN0L2hvb2tzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWluc3BlY3Rvci9kaXN0L2VzL3JlYWN0LWluc3BlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvY2pzL3JlYWN0LWlzLmRldmVsb3BtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQjs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBNEM7QUFDUDtBQUNOOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixPQUFPO0FBQzNCLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQ7QUFDakQ7O0FBRUE7QUFDQTtBQUNBLGtGQUFrRixxQ0FBcUMseUNBQXlDO0FBQ2hLOztBQUVBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpTUFBaU07QUFDak07O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCOztBQUVBO0FBQ0EsNkJBQTZCLE9BQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELDZEQUE2RCxPQUFPO0FBQ3BIO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLEVBQUU7QUFDN0I7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUN0bUIxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7QUNqRDVCO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Qjs7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O0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxVQUFVLEtBQXFDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxLQUFxQyw0RkFBNEYsU0FBTTtBQUM3STtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxJQUFxQztBQUN6QyxnQkFBZ0IsbUJBQU8sQ0FBQyxrREFBVTs7QUFFbEM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsdUZBQTJCO0FBQ3RELENBQUMsTUFBTSxFQUlOOzs7Ozs7Ozs7Ozs7OztBQ2xCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEg7QUFDdkY7QUFDUjs7QUFFM0I7QUFDQSxrQkFBa0IsWUFBWSxFQUFFO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsUUFBUTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGdEQUFnRCxRQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVMsS0FBSztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ3BMYTs7QUFFYixJQUFJLEtBQXFDLEVBQUUsRUFFMUM7QUFDRCxtQkFBbUIsbUJBQU8sQ0FBQywwRkFBK0I7QUFDMUQiLCJmaWxlIjoidmVuZG9yc35jb25zb2xlLW91dHB1dC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHM7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0c0xvb3NlOyIsImltcG9ydCB7IFN0eWxlU2hlZXQgfSBmcm9tICdAZW1vdGlvbi9zaGVldCc7XG5pbXBvcnQgU3R5bGlzIGZyb20gJ0BlbW90aW9uL3N0eWxpcyc7XG5pbXBvcnQgJ0BlbW90aW9uL3dlYWstbWVtb2l6ZSc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90aHlzdWx0YW4vc3R5bGlzLmpzL3RyZWUvbWFzdGVyL3BsdWdpbnMvcnVsZS1zaGVldFxuLy8gaW5saW5lZCB0byBhdm9pZCB1bWQgd3JhcHBlciBhbmQgcGVlckRlcCB3YXJuaW5ncy9pbnN0YWxsaW5nIHN0eWxpc1xuLy8gc2luY2Ugd2UgdXNlIHN0eWxpcyBhZnRlciBjbG9zdXJlIGNvbXBpbGVyXG52YXIgZGVsaW1pdGVyID0gJy8qfCovJztcbnZhciBuZWVkbGUgPSBkZWxpbWl0ZXIgKyAnfSc7XG5cbmZ1bmN0aW9uIHRvU2hlZXQoYmxvY2spIHtcbiAgaWYgKGJsb2NrKSB7XG4gICAgU2hlZXQuY3VycmVudC5pbnNlcnQoYmxvY2sgKyAnfScpO1xuICB9XG59XG5cbnZhciBTaGVldCA9IHtcbiAgY3VycmVudDogbnVsbFxufTtcbnZhciBydWxlU2hlZXQgPSBmdW5jdGlvbiBydWxlU2hlZXQoY29udGV4dCwgY29udGVudCwgc2VsZWN0b3JzLCBwYXJlbnRzLCBsaW5lLCBjb2x1bW4sIGxlbmd0aCwgbnMsIGRlcHRoLCBhdCkge1xuICBzd2l0Y2ggKGNvbnRleHQpIHtcbiAgICAvLyBwcm9wZXJ0eVxuICAgIGNhc2UgMTpcbiAgICAgIHtcbiAgICAgICAgc3dpdGNoIChjb250ZW50LmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAvLyBAaW1wb3J0XG4gICAgICAgICAgICAgIFNoZWV0LmN1cnJlbnQuaW5zZXJ0KGNvbnRlbnQgKyAnOycpO1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy8gY2hhcmNvZGUgZm9yIGxcblxuICAgICAgICAgIGNhc2UgMTA4OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAvLyBjaGFyY29kZSBmb3IgYlxuICAgICAgICAgICAgICAvLyB0aGlzIGlnbm9yZXMgbGFiZWxcbiAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgyKSA9PT0gOTgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIC8vIHNlbGVjdG9yXG5cbiAgICBjYXNlIDI6XG4gICAgICB7XG4gICAgICAgIGlmIChucyA9PT0gMCkgcmV0dXJuIGNvbnRlbnQgKyBkZWxpbWl0ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIC8vIGF0LXJ1bGVcblxuICAgIGNhc2UgMzpcbiAgICAgIHtcbiAgICAgICAgc3dpdGNoIChucykge1xuICAgICAgICAgIC8vIEBmb250LWZhY2UsIEBwYWdlXG4gICAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgY2FzZSAxMTI6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFNoZWV0LmN1cnJlbnQuaW5zZXJ0KHNlbGVjdG9yc1swXSArIGNvbnRlbnQpO1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByZXR1cm4gY29udGVudCArIChhdCA9PT0gMCA/IGRlbGltaXRlciA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgY2FzZSAtMjpcbiAgICAgIHtcbiAgICAgICAgY29udGVudC5zcGxpdChuZWVkbGUpLmZvckVhY2godG9TaGVldCk7XG4gICAgICB9XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDYWNoZSA9IGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuICB2YXIga2V5ID0gb3B0aW9ucy5rZXkgfHwgJ2Nzcyc7XG4gIHZhciBzdHlsaXNPcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnByZWZpeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3R5bGlzT3B0aW9ucyA9IHtcbiAgICAgIHByZWZpeDogb3B0aW9ucy5wcmVmaXhcbiAgICB9O1xuICB9XG5cbiAgdmFyIHN0eWxpcyA9IG5ldyBTdHlsaXMoc3R5bGlzT3B0aW9ucyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgaWYgKC9bXmEtei1dLy50ZXN0KGtleSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtb3Rpb24ga2V5IG11c3Qgb25seSBjb250YWluIGxvd2VyIGNhc2UgYWxwaGFiZXRpY2FsIGNoYXJhY3RlcnMgYW5kIC0gYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcGFzc2VkXCIpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbnNlcnRlZCA9IHt9OyAvLyAkRmxvd0ZpeE1lXG5cbiAgdmFyIGNvbnRhaW5lcjtcblxuICB7XG4gICAgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZG9jdW1lbnQuaGVhZDtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3R5bGVbZGF0YS1lbW90aW9uLVwiICsga2V5ICsgXCJdXCIpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgYXR0cmliID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVtb3Rpb24tXCIgKyBrZXkpOyAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgIGF0dHJpYi5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGluc2VydGVkW2lkXSA9IHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfaW5zZXJ0O1xuXG4gIHtcbiAgICBzdHlsaXMudXNlKG9wdGlvbnMuc3R5bGlzUGx1Z2lucykocnVsZVNoZWV0KTtcblxuICAgIF9pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQoc2VsZWN0b3IsIHNlcmlhbGl6ZWQsIHNoZWV0LCBzaG91bGRDYWNoZSkge1xuICAgICAgdmFyIG5hbWUgPSBzZXJpYWxpemVkLm5hbWU7XG4gICAgICBTaGVldC5jdXJyZW50ID0gc2hlZXQ7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHNlcmlhbGl6ZWQubWFwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1hcCA9IHNlcmlhbGl6ZWQubWFwO1xuICAgICAgICBTaGVldC5jdXJyZW50ID0ge1xuICAgICAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KHJ1bGUpIHtcbiAgICAgICAgICAgIHNoZWV0Lmluc2VydChydWxlICsgbWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHN0eWxpcyhzZWxlY3Rvciwgc2VyaWFsaXplZC5zdHlsZXMpO1xuXG4gICAgICBpZiAoc2hvdWxkQ2FjaGUpIHtcbiAgICAgICAgY2FjaGUuaW5zZXJ0ZWRbbmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWJmNzM3MWE0Y2Q3ZTYwMDllZjYxZDBhXG4gICAgdmFyIGNvbW1lbnRTdGFydCA9IC9cXC9cXCovZztcbiAgICB2YXIgY29tbWVudEVuZCA9IC9cXCpcXC8vZztcbiAgICBzdHlsaXMudXNlKGZ1bmN0aW9uIChjb250ZXh0LCBjb250ZW50KSB7XG4gICAgICBzd2l0Y2ggKGNvbnRleHQpIHtcbiAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3aGlsZSAoY29tbWVudFN0YXJ0LnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgY29tbWVudEVuZC5sYXN0SW5kZXggPSBjb21tZW50U3RhcnQubGFzdEluZGV4O1xuXG4gICAgICAgICAgICAgIGlmIChjb21tZW50RW5kLnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50U3RhcnQubGFzdEluZGV4ID0gY29tbWVudEVuZC5sYXN0SW5kZXg7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgc3R5bGVzIGhhdmUgYW4gdW50ZXJtaW5hdGVkIGNvbW1lbnQgKFwiLypcIiB3aXRob3V0IGNvcnJlc3BvbmRpbmcgXCIqL1wiKS4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tbWVudFN0YXJ0Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgc3R5bGlzLnVzZShmdW5jdGlvbiAoY29udGV4dCwgY29udGVudCwgc2VsZWN0b3JzKSB7XG4gICAgICBzd2l0Y2ggKGNvbnRleHQpIHtcbiAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZmxhZyA9ICdlbW90aW9uLWRpc2FibGUtc2VydmVyLXJlbmRlcmluZy11bnNhZmUtc2VsZWN0b3Itd2FybmluZy1wbGVhc2UtZG8tbm90LXVzZS10aGlzLXRoZS13YXJuaW5nLWV4aXN0cy1mb3ItYS1yZWFzb24nO1xuICAgICAgICAgICAgdmFyIHVuc2FmZVBzZXVkb0NsYXNzZXMgPSBjb250ZW50Lm1hdGNoKC8oOmZpcnN0fDpudGh8Om50aC1sYXN0KS1jaGlsZC9nKTtcblxuICAgICAgICAgICAgaWYgKHVuc2FmZVBzZXVkb0NsYXNzZXMgJiYgY2FjaGUuY29tcGF0ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHVuc2FmZVBzZXVkb0NsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAodW5zYWZlUHNldWRvQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWdub3JlUmVnRXhwID0gbmV3IFJlZ0V4cCh1bnNhZmVQc2V1ZG9DbGFzcyArIFwiLipcXFxcL1xcXFwqIFwiICsgZmxhZyArIFwiIFxcXFwqXFxcXC9cIik7XG4gICAgICAgICAgICAgICAgdmFyIGlnbm9yZSA9IGlnbm9yZVJlZ0V4cC50ZXN0KGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHVuc2FmZVBzZXVkb0NsYXNzICYmICFpZ25vcmUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgcHNldWRvIGNsYXNzIFxcXCJcIiArIHVuc2FmZVBzZXVkb0NsYXNzICsgXCJcXFwiIGlzIHBvdGVudGlhbGx5IHVuc2FmZSB3aGVuIGRvaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy4gVHJ5IGNoYW5naW5nIGl0IHRvIFxcXCJcIiArIHVuc2FmZVBzZXVkb0NsYXNzLnNwbGl0KCctY2hpbGQnKVswXSArIFwiLW9mLXR5cGVcXFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgY2FjaGUgPSB7XG4gICAga2V5OiBrZXksXG4gICAgc2hlZXQ6IG5ldyBTdHlsZVNoZWV0KHtcbiAgICAgIGtleToga2V5LFxuICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICBub25jZTogb3B0aW9ucy5ub25jZSxcbiAgICAgIHNwZWVkeTogb3B0aW9ucy5zcGVlZHlcbiAgICB9KSxcbiAgICBub25jZTogb3B0aW9ucy5ub25jZSxcbiAgICBpbnNlcnRlZDogaW5zZXJ0ZWQsXG4gICAgcmVnaXN0ZXJlZDoge30sXG4gICAgaW5zZXJ0OiBfaW5zZXJ0XG4gIH07XG4gIHJldHVybiBjYWNoZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNhY2hlO1xuIiwiaW1wb3J0IF9pbmhlcml0c0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHNMb29zZSc7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBmb3J3YXJkUmVmLCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgZ2V0UmVnaXN0ZXJlZFN0eWxlcywgaW5zZXJ0U3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vdXRpbHMnO1xuaW1wb3J0IHsgc2VyaWFsaXplU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vc2VyaWFsaXplJztcbmltcG9ydCB7IFN0eWxlU2hlZXQgfSBmcm9tICdAZW1vdGlvbi9zaGVldCc7XG5pbXBvcnQgY3NzIGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5cbnZhciBFbW90aW9uQ2FjaGVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCggLy8gd2UncmUgZG9pbmcgdGhpcyB0byBhdm9pZCBwcmVjb25zdHJ1Y3QncyBkZWFkIGNvZGUgZWxpbWluYXRpb24gaW4gdGhpcyBvbmUgY2FzZVxuLy8gYmVjYXVzZSB0aGlzIG1vZHVsZSBpcyBwcmltYXJpbHkgaW50ZW5kZWQgZm9yIHRoZSBicm93c2VyIGFuZCBub2RlXG4vLyBidXQgaXQncyBhbHNvIHJlcXVpcmVkIGluIHJlYWN0IG5hdGl2ZSBhbmQgc2ltaWxhciBlbnZpcm9ubWVudHMgc29tZXRpbWVzXG4vLyBhbmQgd2UgY291bGQgaGF2ZSBhIHNwZWNpYWwgYnVpbGQganVzdCBmb3IgdGhhdFxuLy8gYnV0IHRoaXMgaXMgbXVjaCBlYXNpZXIgYW5kIHRoZSBuYXRpdmUgcGFja2FnZXNcbi8vIG1pZ2h0IHVzZSBhIGRpZmZlcmVudCB0aGVtZSBjb250ZXh0IGluIHRoZSBmdXR1cmUgYW55d2F5XG50eXBlb2YgSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnID8gY3JlYXRlQ2FjaGUoKSA6IG51bGwpO1xudmFyIFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xudmFyIENhY2hlUHJvdmlkZXIgPSBFbW90aW9uQ2FjaGVDb250ZXh0LlByb3ZpZGVyO1xuXG52YXIgd2l0aEVtb3Rpb25DYWNoZSA9IGZ1bmN0aW9uIHdpdGhFbW90aW9uQ2FjaGUoZnVuYykge1xuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHByb3BzLCByZWYpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChFbW90aW9uQ2FjaGVDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgIHJldHVybiBmdW5jKHByb3BzLCBjYWNoZSwgcmVmKTtcbiAgICB9KTtcbiAgfTsgLy8gJEZsb3dGaXhNZVxuXG5cbiAgcmV0dXJuIGZvcndhcmRSZWYocmVuZGVyKTtcbn07XG5cbi8vIHRodXMgd2Ugb25seSBuZWVkIHRvIHJlcGxhY2Ugd2hhdCBpcyBhIHZhbGlkIGNoYXJhY3RlciBmb3IgSlMsIGJ1dCBub3QgZm9yIENTU1xuXG52YXIgc2FuaXRpemVJZGVudGlmaWVyID0gZnVuY3Rpb24gc2FuaXRpemVJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgcmV0dXJuIGlkZW50aWZpZXIucmVwbGFjZSgvXFwkL2csICctJyk7XG59O1xuXG52YXIgdHlwZVByb3BOYW1lID0gJ19fRU1PVElPTl9UWVBFX1BMRUFTRV9ET19OT1RfVVNFX18nO1xudmFyIGxhYmVsUHJvcE5hbWUgPSAnX19FTU9USU9OX0xBQkVMX1BMRUFTRV9ET19OT1RfVVNFX18nO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihjYWNoZSwgcHJvcHMsIHRoZW1lLCByZWYpIHtcbiAgdmFyIGNzc1Byb3AgPSB0aGVtZSA9PT0gbnVsbCA/IHByb3BzLmNzcyA6IHByb3BzLmNzcyh0aGVtZSk7IC8vIHNvIHRoYXQgdXNpbmcgYGNzc2AgZnJvbSBgZW1vdGlvbmAgYW5kIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgY3NzIHByb3Agd29ya3NcbiAgLy8gbm90IHBhc3NpbmcgdGhlIHJlZ2lzdGVyZWQgY2FjaGUgdG8gc2VyaWFsaXplU3R5bGVzIGJlY2F1c2UgaXQgd291bGRcbiAgLy8gbWFrZSBjZXJ0YWluIGJhYmVsIG9wdGltaXNhdGlvbnMgbm90IHBvc3NpYmxlXG5cbiAgaWYgKHR5cGVvZiBjc3NQcm9wID09PSAnc3RyaW5nJyAmJiBjYWNoZS5yZWdpc3RlcmVkW2Nzc1Byb3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICBjc3NQcm9wID0gY2FjaGUucmVnaXN0ZXJlZFtjc3NQcm9wXTtcbiAgfVxuXG4gIHZhciB0eXBlID0gcHJvcHNbdHlwZVByb3BOYW1lXTtcbiAgdmFyIHJlZ2lzdGVyZWRTdHlsZXMgPSBbY3NzUHJvcF07XG4gIHZhciBjbGFzc05hbWUgPSAnJztcblxuICBpZiAodHlwZW9mIHByb3BzLmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjbGFzc05hbWUgPSBnZXRSZWdpc3RlcmVkU3R5bGVzKGNhY2hlLnJlZ2lzdGVyZWQsIHJlZ2lzdGVyZWRTdHlsZXMsIHByb3BzLmNsYXNzTmFtZSk7XG4gIH0gZWxzZSBpZiAocHJvcHMuY2xhc3NOYW1lICE9IG51bGwpIHtcbiAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyBcIiBcIjtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkID0gc2VyaWFsaXplU3R5bGVzKHJlZ2lzdGVyZWRTdHlsZXMpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHNlcmlhbGl6ZWQubmFtZS5pbmRleE9mKCctJykgPT09IC0xKSB7XG4gICAgdmFyIGxhYmVsRnJvbVN0YWNrID0gcHJvcHNbbGFiZWxQcm9wTmFtZV07XG5cbiAgICBpZiAobGFiZWxGcm9tU3RhY2spIHtcbiAgICAgIHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVTdHlsZXMoW3NlcmlhbGl6ZWQsICdsYWJlbDonICsgbGFiZWxGcm9tU3RhY2sgKyAnOyddKTtcbiAgICB9XG4gIH1cblxuICB2YXIgcnVsZXMgPSBpbnNlcnRTdHlsZXMoY2FjaGUsIHNlcmlhbGl6ZWQsIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyk7XG4gIGNsYXNzTmFtZSArPSBjYWNoZS5rZXkgKyBcIi1cIiArIHNlcmlhbGl6ZWQubmFtZTtcbiAgdmFyIG5ld1Byb3BzID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwocHJvcHMsIGtleSkgJiYga2V5ICE9PSAnY3NzJyAmJiBrZXkgIT09IHR5cGVQcm9wTmFtZSAmJiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB8fCBrZXkgIT09IGxhYmVsUHJvcE5hbWUpKSB7XG4gICAgICBuZXdQcm9wc1trZXldID0gcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cblxuICBuZXdQcm9wcy5yZWYgPSByZWY7XG4gIG5ld1Byb3BzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgdmFyIGVsZSA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgbmV3UHJvcHMpO1xuXG4gIHJldHVybiBlbGU7XG59O1xuXG52YXIgRW1vdGlvbiA9XG4vKiAjX19QVVJFX18gKi9cbndpdGhFbW90aW9uQ2FjaGUoZnVuY3Rpb24gKHByb3BzLCBjYWNoZSwgcmVmKSB7XG4gIC8vIHVzZSBDb250ZXh0LnJlYWQgZm9yIHRoZSB0aGVtZSB3aGVuIGl0J3Mgc3RhYmxlXG4gIGlmICh0eXBlb2YgcHJvcHMuY3NzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoVGhlbWVDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAodGhlbWUpIHtcbiAgICAgIHJldHVybiByZW5kZXIoY2FjaGUsIHByb3BzLCB0aGVtZSwgcmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZW5kZXIoY2FjaGUsIHByb3BzLCBudWxsLCByZWYpO1xufSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIEVtb3Rpb24uZGlzcGxheU5hbWUgPSAnRW1vdGlvbkNzc1Byb3BJbnRlcm5hbCc7XG59IC8vICRGbG93Rml4TWVcblxuXG52YXIganN4ID0gZnVuY3Rpb24ganN4KHR5cGUsIHByb3BzKSB7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gIGlmIChwcm9wcyA9PSBudWxsIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCAnY3NzJykpIHtcbiAgICAvLyAkRmxvd0ZpeE1lXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBwcm9wcy5jc3MgPT09ICdzdHJpbmcnICYmIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY3NzIGRlY2xhcmF0aW9uXG4gIHByb3BzLmNzcy5pbmRleE9mKCc6JykgIT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5ncyBhcmUgbm90IGFsbG93ZWQgYXMgY3NzIHByb3AgdmFsdWVzLCBwbGVhc2Ugd3JhcCBpdCBpbiBhIGNzcyB0ZW1wbGF0ZSBsaXRlcmFsIGZyb20gJ0BlbW90aW9uL2NzcycgbGlrZSB0aGlzOiBjc3NgXCIgKyBwcm9wcy5jc3MgKyBcImBcIik7XG4gIH1cblxuICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgY3JlYXRlRWxlbWVudEFyZ0FycmF5ID0gbmV3IEFycmF5KGFyZ3NMZW5ndGgpO1xuICBjcmVhdGVFbGVtZW50QXJnQXJyYXlbMF0gPSBFbW90aW9uO1xuICB2YXIgbmV3UHJvcHMgPSB7fTtcblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywga2V5KSkge1xuICAgICAgbmV3UHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgfVxuICB9XG5cbiAgbmV3UHJvcHNbdHlwZVByb3BOYW1lXSA9IHR5cGU7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblxuICAgIGlmIChlcnJvci5zdGFjaykge1xuICAgICAgLy8gY2hyb21lXG4gICAgICB2YXIgbWF0Y2ggPSBlcnJvci5zdGFjay5tYXRjaCgvYXQgKD86T2JqZWN0XFwufE1vZHVsZVxcLnwpanN4LipcXG5cXHMrYXQgKD86T2JqZWN0XFwufCkoW0EtWl1bQS1aYS16JF0rKSAvKTtcblxuICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAvLyBzYWZhcmkgYW5kIGZpcmVmb3hcbiAgICAgICAgbWF0Y2ggPSBlcnJvci5zdGFjay5tYXRjaCgvLipcXG4oW0EtWl1bQS1aYS16JF0rKUAvKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG5ld1Byb3BzW2xhYmVsUHJvcE5hbWVdID0gc2FuaXRpemVJZGVudGlmaWVyKG1hdGNoWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVFbGVtZW50QXJnQXJyYXlbMV0gPSBuZXdQcm9wcztcblxuICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3NMZW5ndGg7IGkrKykge1xuICAgIGNyZWF0ZUVsZW1lbnRBcmdBcnJheVtpXSA9IGFyZ3NbaV07XG4gIH0gLy8gJEZsb3dGaXhNZVxuXG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQuYXBwbHkobnVsbCwgY3JlYXRlRWxlbWVudEFyZ0FycmF5KTtcbn07XG5cbnZhciB3YXJuZWRBYm91dENzc1Byb3BGb3JHbG9iYWwgPSBmYWxzZTtcbnZhciBHbG9iYWwgPVxuLyogI19fUFVSRV9fICovXG53aXRoRW1vdGlvbkNhY2hlKGZ1bmN0aW9uIChwcm9wcywgY2FjaGUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIXdhcm5lZEFib3V0Q3NzUHJvcEZvckdsb2JhbCAmJiAoIC8vIGNoZWNrIGZvciBjbGFzc05hbWUgYXMgd2VsbCBzaW5jZSB0aGUgdXNlciBpc1xuICAvLyBwcm9iYWJseSB1c2luZyB0aGUgY3VzdG9tIGNyZWF0ZUVsZW1lbnQgd2hpY2hcbiAgLy8gbWVhbnMgaXQgd2lsbCBiZSB0dXJuZWQgaW50byBhIGNsYXNzTmFtZSBwcm9wXG4gIC8vICRGbG93Rml4TWUgSSBkb24ndCByZWFsbHkgd2FudCB0byBhZGQgaXQgdG8gdGhlIHR5cGUgc2luY2UgaXQgc2hvdWxkbid0IGJlIHVzZWRcbiAgcHJvcHMuY2xhc3NOYW1lIHx8IHByb3BzLmNzcykpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSXQgbG9va3MgbGlrZSB5b3UncmUgdXNpbmcgdGhlIGNzcyBwcm9wIG9uIEdsb2JhbCwgZGlkIHlvdSBtZWFuIHRvIHVzZSB0aGUgc3R5bGVzIHByb3AgaW5zdGVhZD9cIik7XG4gICAgd2FybmVkQWJvdXRDc3NQcm9wRm9yR2xvYmFsID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBzdHlsZXMgPSBwcm9wcy5zdHlsZXM7XG5cbiAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudChUaGVtZUNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uICh0aGVtZSkge1xuICAgICAgdmFyIHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVTdHlsZXMoW3N0eWxlcyh0aGVtZSldKTtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KElubmVyR2xvYmFsLCB7XG4gICAgICAgIHNlcmlhbGl6ZWQ6IHNlcmlhbGl6ZWQsXG4gICAgICAgIGNhY2hlOiBjYWNoZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZCA9IHNlcmlhbGl6ZVN0eWxlcyhbc3R5bGVzXSk7XG4gIHJldHVybiBjcmVhdGVFbGVtZW50KElubmVyR2xvYmFsLCB7XG4gICAgc2VyaWFsaXplZDogc2VyaWFsaXplZCxcbiAgICBjYWNoZTogY2FjaGVcbiAgfSk7XG59KTtcblxuLy8gbWFpbnRhaW4gcGxhY2Ugb3ZlciByZXJlbmRlcnMuXG4vLyBpbml0aWFsIHJlbmRlciBmcm9tIGJyb3dzZXIsIGluc2VydEJlZm9yZSBjb250ZXh0LnNoZWV0LnRhZ3NbMF0gb3IgaWYgYSBzdHlsZSBoYXNuJ3QgYmVlbiBpbnNlcnRlZCB0aGVyZSB5ZXQsIGFwcGVuZENoaWxkXG4vLyBpbml0aWFsIGNsaWVudC1zaWRlIHJlbmRlciBmcm9tIFNTUiwgdXNlIHBsYWNlIG9mIGh5ZHJhdGluZyB0YWdcbnZhciBJbm5lckdsb2JhbCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHNMb29zZShJbm5lckdsb2JhbCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5uZXJHbG9iYWwocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICByZXR1cm4gX1JlYWN0JENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IElubmVyR2xvYmFsLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNoZWV0ID0gbmV3IFN0eWxlU2hlZXQoe1xuICAgICAga2V5OiB0aGlzLnByb3BzLmNhY2hlLmtleSArIFwiLWdsb2JhbFwiLFxuICAgICAgbm9uY2U6IHRoaXMucHJvcHMuY2FjaGUuc2hlZXQubm9uY2UsXG4gICAgICBjb250YWluZXI6IHRoaXMucHJvcHMuY2FjaGUuc2hlZXQuY29udGFpbmVyXG4gICAgfSk7IC8vICRGbG93Rml4TWVcblxuICAgIHZhciBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInN0eWxlW2RhdGEtZW1vdGlvbi1cIiArIHRoaXMucHJvcHMuY2FjaGUua2V5ICsgXCI9XFxcIlwiICsgdGhpcy5wcm9wcy5zZXJpYWxpemVkLm5hbWUgKyBcIlxcXCJdXCIpO1xuXG4gICAgaWYgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2hlZXQudGFncy5wdXNoKG5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmNhY2hlLnNoZWV0LnRhZ3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNoZWV0LmJlZm9yZSA9IHRoaXMucHJvcHMuY2FjaGUuc2hlZXQudGFnc1swXTtcbiAgICB9XG5cbiAgICB0aGlzLmluc2VydFN0eWxlcygpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHByZXZQcm9wcy5zZXJpYWxpemVkLm5hbWUgIT09IHRoaXMucHJvcHMuc2VyaWFsaXplZC5uYW1lKSB7XG4gICAgICB0aGlzLmluc2VydFN0eWxlcygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaW5zZXJ0U3R5bGVzID0gZnVuY3Rpb24gaW5zZXJ0U3R5bGVzJDEoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2VyaWFsaXplZC5uZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGluc2VydCBrZXlmcmFtZXNcbiAgICAgIGluc2VydFN0eWxlcyh0aGlzLnByb3BzLmNhY2hlLCB0aGlzLnByb3BzLnNlcmlhbGl6ZWQubmV4dCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hlZXQudGFncy5sZW5ndGgpIHtcbiAgICAgIC8vIGlmIHRoaXMgZG9lc24ndCBleGlzdCB0aGVuIGl0IHdpbGwgYmUgbnVsbCBzbyB0aGUgc3R5bGUgZWxlbWVudCB3aWxsIGJlIGFwcGVuZGVkXG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2hlZXQudGFnc1t0aGlzLnNoZWV0LnRhZ3MubGVuZ3RoIC0gMV0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgdGhpcy5zaGVldC5iZWZvcmUgPSBlbGVtZW50O1xuICAgICAgdGhpcy5zaGVldC5mbHVzaCgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMuY2FjaGUuaW5zZXJ0KFwiXCIsIHRoaXMucHJvcHMuc2VyaWFsaXplZCwgdGhpcy5zaGVldCwgZmFsc2UpO1xuICB9O1xuXG4gIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuc2hlZXQuZmx1c2goKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIElubmVyR2xvYmFsO1xufShDb21wb25lbnQpO1xuXG52YXIga2V5ZnJhbWVzID0gZnVuY3Rpb24ga2V5ZnJhbWVzKCkge1xuICB2YXIgaW5zZXJ0YWJsZSA9IGNzcy5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gIHZhciBuYW1lID0gXCJhbmltYXRpb24tXCIgKyBpbnNlcnRhYmxlLm5hbWU7IC8vICRGbG93Rml4TWVcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgc3R5bGVzOiBcIkBrZXlmcmFtZXMgXCIgKyBuYW1lICsgXCJ7XCIgKyBpbnNlcnRhYmxlLnN0eWxlcyArIFwifVwiLFxuICAgIGFuaW06IDEsXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIFwiX0VNT19cIiArIHRoaXMubmFtZSArIFwiX1wiICsgdGhpcy5zdHlsZXMgKyBcIl9FTU9fXCI7XG4gICAgfVxuICB9O1xufTtcblxudmFyIGNsYXNzbmFtZXMgPSBmdW5jdGlvbiBjbGFzc25hbWVzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBjbHMgPSAnJztcblxuICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGFyZyA9IGFyZ3NbaV07XG4gICAgaWYgKGFyZyA9PSBudWxsKSBjb250aW51ZTtcbiAgICB2YXIgdG9BZGQgPSB2b2lkIDA7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBhcmcpIHtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgICAgIHRvQWRkID0gY2xhc3NuYW1lcyhhcmcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b0FkZCA9ICcnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrIGluIGFyZykge1xuICAgICAgICAgICAgICBpZiAoYXJnW2tdICYmIGspIHtcbiAgICAgICAgICAgICAgICB0b0FkZCAmJiAodG9BZGQgKz0gJyAnKTtcbiAgICAgICAgICAgICAgICB0b0FkZCArPSBrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIHRvQWRkID0gYXJnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvQWRkKSB7XG4gICAgICBjbHMgJiYgKGNscyArPSAnICcpO1xuICAgICAgY2xzICs9IHRvQWRkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbHM7XG59O1xuXG5mdW5jdGlvbiBtZXJnZShyZWdpc3RlcmVkLCBjc3MsIGNsYXNzTmFtZSkge1xuICB2YXIgcmVnaXN0ZXJlZFN0eWxlcyA9IFtdO1xuICB2YXIgcmF3Q2xhc3NOYW1lID0gZ2V0UmVnaXN0ZXJlZFN0eWxlcyhyZWdpc3RlcmVkLCByZWdpc3RlcmVkU3R5bGVzLCBjbGFzc05hbWUpO1xuXG4gIGlmIChyZWdpc3RlcmVkU3R5bGVzLmxlbmd0aCA8IDIpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lO1xuICB9XG5cbiAgcmV0dXJuIHJhd0NsYXNzTmFtZSArIGNzcyhyZWdpc3RlcmVkU3R5bGVzKTtcbn1cblxudmFyIENsYXNzTmFtZXMgPSB3aXRoRW1vdGlvbkNhY2hlKGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCkge1xuICByZXR1cm4gY3JlYXRlRWxlbWVudChUaGVtZUNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uICh0aGVtZSkge1xuICAgIHZhciBoYXNSZW5kZXJlZCA9IGZhbHNlO1xuXG4gICAgdmFyIGNzcyA9IGZ1bmN0aW9uIGNzcygpIHtcbiAgICAgIGlmIChoYXNSZW5kZXJlZCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY3NzIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIHJlbmRlcicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcmlhbGl6ZWQgPSBzZXJpYWxpemVTdHlsZXMoYXJncywgY29udGV4dC5yZWdpc3RlcmVkKTtcblxuICAgICAge1xuICAgICAgICBpbnNlcnRTdHlsZXMoY29udGV4dCwgc2VyaWFsaXplZCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGV4dC5rZXkgKyBcIi1cIiArIHNlcmlhbGl6ZWQubmFtZTtcbiAgICB9O1xuXG4gICAgdmFyIGN4ID0gZnVuY3Rpb24gY3goKSB7XG4gICAgICBpZiAoaGFzUmVuZGVyZWQgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N4IGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIHJlbmRlcicpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVyZ2UoY29udGV4dC5yZWdpc3RlcmVkLCBjc3MsIGNsYXNzbmFtZXMoYXJncykpO1xuICAgIH07XG5cbiAgICB2YXIgY29udGVudCA9IHtcbiAgICAgIGNzczogY3NzLFxuICAgICAgY3g6IGN4LFxuICAgICAgdGhlbWU6IHRoZW1lXG4gICAgfTtcbiAgICB2YXIgZWxlID0gcHJvcHMuY2hpbGRyZW4oY29udGVudCk7XG4gICAgaGFzUmVuZGVyZWQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGVsZTtcbiAgfSk7XG59KTtcblxuZXhwb3J0IHsgQ2FjaGVQcm92aWRlciwgQ2xhc3NOYW1lcywgR2xvYmFsLCBUaGVtZUNvbnRleHQsIGpzeCwga2V5ZnJhbWVzLCB3aXRoRW1vdGlvbkNhY2hlIH07XG4iLCJpbXBvcnQgeyBzZXJpYWxpemVTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9zZXJpYWxpemUnO1xuXG5mdW5jdGlvbiBjc3MoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gc2VyaWFsaXplU3R5bGVzKGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjc3M7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2dhcnljb3VydC9tdXJtdXJoYXNoLWpzXG4vLyBQb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYWFwcGxlYnkvc21oYXNoZXIvYmxvYi82MWEwNTMwZjI4Mjc3ZjJlODUwYmZjMzk2MDBjZTYxZDAyYjUxOGRlL3NyYy9NdXJtdXJIYXNoMi5jcHAjTDM3LUw4NlxuZnVuY3Rpb24gbXVybXVyMihzdHIpIHtcbiAgLy8gJ20nIGFuZCAncicgYXJlIG1peGluZyBjb25zdGFudHMgZ2VuZXJhdGVkIG9mZmxpbmUuXG4gIC8vIFRoZXkncmUgbm90IHJlYWxseSAnbWFnaWMnLCB0aGV5IGp1c3QgaGFwcGVuIHRvIHdvcmsgd2VsbC5cbiAgLy8gY29uc3QgbSA9IDB4NWJkMWU5OTU7XG4gIC8vIGNvbnN0IHIgPSAyNDtcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgaGFzaFxuICB2YXIgaCA9IDA7IC8vIE1peCA0IGJ5dGVzIGF0IGEgdGltZSBpbnRvIHRoZSBoYXNoXG5cbiAgdmFyIGssXG4gICAgICBpID0gMCxcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XG5cbiAgZm9yICg7IGxlbiA+PSA0OyArK2ksIGxlbiAtPSA0KSB7XG4gICAgayA9IHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZiB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgOCB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMTYgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDI0O1xuICAgIGsgPVxuICAgIC8qIE1hdGguaW11bChrLCBtKTogKi9cbiAgICAoayAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKChrID4+PiAxNikgKiAweGU5OTUgPDwgMTYpO1xuICAgIGsgXj1cbiAgICAvKiBrID4+PiByOiAqL1xuICAgIGsgPj4+IDI0O1xuICAgIGggPVxuICAgIC8qIE1hdGguaW11bChrLCBtKTogKi9cbiAgICAoayAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKChrID4+PiAxNikgKiAweGU5OTUgPDwgMTYpIF5cbiAgICAvKiBNYXRoLmltdWwoaCwgbSk6ICovXG4gICAgKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoaCA+Pj4gMTYpICogMHhlOTk1IDw8IDE2KTtcbiAgfSAvLyBIYW5kbGUgdGhlIGxhc3QgZmV3IGJ5dGVzIG9mIHRoZSBpbnB1dCBhcnJheVxuXG5cbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDM6XG4gICAgICBoIF49IChzdHIuY2hhckNvZGVBdChpICsgMikgJiAweGZmKSA8PCAxNjtcblxuICAgIGNhc2UgMjpcbiAgICAgIGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4ZmYpIDw8IDg7XG5cbiAgICBjYXNlIDE6XG4gICAgICBoIF49IHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZjtcbiAgICAgIGggPVxuICAgICAgLyogTWF0aC5pbXVsKGgsIG0pOiAqL1xuICAgICAgKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoaCA+Pj4gMTYpICogMHhlOTk1IDw8IDE2KTtcbiAgfSAvLyBEbyBhIGZldyBmaW5hbCBtaXhlcyBvZiB0aGUgaGFzaCB0byBlbnN1cmUgdGhlIGxhc3QgZmV3XG4gIC8vIGJ5dGVzIGFyZSB3ZWxsLWluY29ycG9yYXRlZC5cblxuXG4gIGggXj0gaCA+Pj4gMTM7XG4gIGggPVxuICAvKiBNYXRoLmltdWwoaCwgbSk6ICovXG4gIChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKGggPj4+IDE2KSAqIDB4ZTk5NSA8PCAxNik7XG4gIHJldHVybiAoKGggXiBoID4+PiAxNSkgPj4+IDApLnRvU3RyaW5nKDM2KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbXVybXVyMjtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJ0BlbW90aW9uL21lbW9pemUnO1xuXG52YXIgcmVhY3RQcm9wc1JlZ2V4ID0gL14oKGNoaWxkcmVufGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MfGtleXxyZWZ8YXV0b0ZvY3VzfGRlZmF1bHRWYWx1ZXxkZWZhdWx0Q2hlY2tlZHxpbm5lckhUTUx8c3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nfHN1cHByZXNzSHlkcmF0aW9uV2FybmluZ3x2YWx1ZUxpbmt8YWNjZXB0fGFjY2VwdENoYXJzZXR8YWNjZXNzS2V5fGFjdGlvbnxhbGxvd3xhbGxvd1VzZXJNZWRpYXxhbGxvd1BheW1lbnRSZXF1ZXN0fGFsbG93RnVsbFNjcmVlbnxhbGxvd1RyYW5zcGFyZW5jeXxhbHR8YXN5bmN8YXV0b0NvbXBsZXRlfGF1dG9QbGF5fGNhcHR1cmV8Y2VsbFBhZGRpbmd8Y2VsbFNwYWNpbmd8Y2hhbGxlbmdlfGNoYXJTZXR8Y2hlY2tlZHxjaXRlfGNsYXNzSUR8Y2xhc3NOYW1lfGNvbHN8Y29sU3Bhbnxjb250ZW50fGNvbnRlbnRFZGl0YWJsZXxjb250ZXh0TWVudXxjb250cm9sc3xjb250cm9sc0xpc3R8Y29vcmRzfGNyb3NzT3JpZ2lufGRhdGF8ZGF0ZVRpbWV8ZGVjb2Rpbmd8ZGVmYXVsdHxkZWZlcnxkaXJ8ZGlzYWJsZWR8ZGlzYWJsZVBpY3R1cmVJblBpY3R1cmV8ZG93bmxvYWR8ZHJhZ2dhYmxlfGVuY1R5cGV8Zm9ybXxmb3JtQWN0aW9ufGZvcm1FbmNUeXBlfGZvcm1NZXRob2R8Zm9ybU5vVmFsaWRhdGV8Zm9ybVRhcmdldHxmcmFtZUJvcmRlcnxoZWFkZXJzfGhlaWdodHxoaWRkZW58aGlnaHxocmVmfGhyZWZMYW5nfGh0bWxGb3J8aHR0cEVxdWl2fGlkfGlucHV0TW9kZXxpbnRlZ3JpdHl8aXN8a2V5UGFyYW1zfGtleVR5cGV8a2luZHxsYWJlbHxsYW5nfGxpc3R8bG9hZGluZ3xsb29wfGxvd3xtYXJnaW5IZWlnaHR8bWFyZ2luV2lkdGh8bWF4fG1heExlbmd0aHxtZWRpYXxtZWRpYUdyb3VwfG1ldGhvZHxtaW58bWluTGVuZ3RofG11bHRpcGxlfG11dGVkfG5hbWV8bm9uY2V8bm9WYWxpZGF0ZXxvcGVufG9wdGltdW18cGF0dGVybnxwbGFjZWhvbGRlcnxwbGF5c0lubGluZXxwb3N0ZXJ8cHJlbG9hZHxwcm9maWxlfHJhZGlvR3JvdXB8cmVhZE9ubHl8cmVmZXJyZXJQb2xpY3l8cmVsfHJlcXVpcmVkfHJldmVyc2VkfHJvbGV8cm93c3xyb3dTcGFufHNhbmRib3h8c2NvcGV8c2NvcGVkfHNjcm9sbGluZ3xzZWFtbGVzc3xzZWxlY3RlZHxzaGFwZXxzaXplfHNpemVzfHNsb3R8c3BhbnxzcGVsbENoZWNrfHNyY3xzcmNEb2N8c3JjTGFuZ3xzcmNTZXR8c3RhcnR8c3RlcHxzdHlsZXxzdW1tYXJ5fHRhYkluZGV4fHRhcmdldHx0aXRsZXx0eXBlfHVzZU1hcHx2YWx1ZXx3aWR0aHx3bW9kZXx3cmFwfGFib3V0fGRhdGF0eXBlfGlubGlzdHxwcmVmaXh8cHJvcGVydHl8cmVzb3VyY2V8dHlwZW9mfHZvY2FifGF1dG9DYXBpdGFsaXplfGF1dG9Db3JyZWN0fGF1dG9TYXZlfGNvbG9yfGluZXJ0fGl0ZW1Qcm9wfGl0ZW1TY29wZXxpdGVtVHlwZXxpdGVtSUR8aXRlbVJlZnxvbnxyZXN1bHRzfHNlY3VyaXR5fHVuc2VsZWN0YWJsZXxhY2NlbnRIZWlnaHR8YWNjdW11bGF0ZXxhZGRpdGl2ZXxhbGlnbm1lbnRCYXNlbGluZXxhbGxvd1Jlb3JkZXJ8YWxwaGFiZXRpY3xhbXBsaXR1ZGV8YXJhYmljRm9ybXxhc2NlbnR8YXR0cmlidXRlTmFtZXxhdHRyaWJ1dGVUeXBlfGF1dG9SZXZlcnNlfGF6aW11dGh8YmFzZUZyZXF1ZW5jeXxiYXNlbGluZVNoaWZ0fGJhc2VQcm9maWxlfGJib3h8YmVnaW58Ymlhc3xieXxjYWxjTW9kZXxjYXBIZWlnaHR8Y2xpcHxjbGlwUGF0aFVuaXRzfGNsaXBQYXRofGNsaXBSdWxlfGNvbG9ySW50ZXJwb2xhdGlvbnxjb2xvckludGVycG9sYXRpb25GaWx0ZXJzfGNvbG9yUHJvZmlsZXxjb2xvclJlbmRlcmluZ3xjb250ZW50U2NyaXB0VHlwZXxjb250ZW50U3R5bGVUeXBlfGN1cnNvcnxjeHxjeXxkfGRlY2VsZXJhdGV8ZGVzY2VudHxkaWZmdXNlQ29uc3RhbnR8ZGlyZWN0aW9ufGRpc3BsYXl8ZGl2aXNvcnxkb21pbmFudEJhc2VsaW5lfGR1cnxkeHxkeXxlZGdlTW9kZXxlbGV2YXRpb258ZW5hYmxlQmFja2dyb3VuZHxlbmR8ZXhwb25lbnR8ZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZHxmaWxsfGZpbGxPcGFjaXR5fGZpbGxSdWxlfGZpbHRlcnxmaWx0ZXJSZXN8ZmlsdGVyVW5pdHN8Zmxvb2RDb2xvcnxmbG9vZE9wYWNpdHl8Zm9jdXNhYmxlfGZvbnRGYW1pbHl8Zm9udFNpemV8Zm9udFNpemVBZGp1c3R8Zm9udFN0cmV0Y2h8Zm9udFN0eWxlfGZvbnRWYXJpYW50fGZvbnRXZWlnaHR8Zm9ybWF0fGZyb218ZnJ8Znh8Znl8ZzF8ZzJ8Z2x5cGhOYW1lfGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsfGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbHxnbHlwaFJlZnxncmFkaWVudFRyYW5zZm9ybXxncmFkaWVudFVuaXRzfGhhbmdpbmd8aG9yaXpBZHZYfGhvcml6T3JpZ2luWHxpZGVvZ3JhcGhpY3xpbWFnZVJlbmRlcmluZ3xpbnxpbjJ8aW50ZXJjZXB0fGt8azF8azJ8azN8azR8a2VybmVsTWF0cml4fGtlcm5lbFVuaXRMZW5ndGh8a2VybmluZ3xrZXlQb2ludHN8a2V5U3BsaW5lc3xrZXlUaW1lc3xsZW5ndGhBZGp1c3R8bGV0dGVyU3BhY2luZ3xsaWdodGluZ0NvbG9yfGxpbWl0aW5nQ29uZUFuZ2xlfGxvY2FsfG1hcmtlckVuZHxtYXJrZXJNaWR8bWFya2VyU3RhcnR8bWFya2VySGVpZ2h0fG1hcmtlclVuaXRzfG1hcmtlcldpZHRofG1hc2t8bWFza0NvbnRlbnRVbml0c3xtYXNrVW5pdHN8bWF0aGVtYXRpY2FsfG1vZGV8bnVtT2N0YXZlc3xvZmZzZXR8b3BhY2l0eXxvcGVyYXRvcnxvcmRlcnxvcmllbnR8b3JpZW50YXRpb258b3JpZ2lufG92ZXJmbG93fG92ZXJsaW5lUG9zaXRpb258b3ZlcmxpbmVUaGlja25lc3N8cGFub3NlMXxwYWludE9yZGVyfHBhdGhMZW5ndGh8cGF0dGVybkNvbnRlbnRVbml0c3xwYXR0ZXJuVHJhbnNmb3JtfHBhdHRlcm5Vbml0c3xwb2ludGVyRXZlbnRzfHBvaW50c3xwb2ludHNBdFh8cG9pbnRzQXRZfHBvaW50c0F0WnxwcmVzZXJ2ZUFscGhhfHByZXNlcnZlQXNwZWN0UmF0aW98cHJpbWl0aXZlVW5pdHN8cnxyYWRpdXN8cmVmWHxyZWZZfHJlbmRlcmluZ0ludGVudHxyZXBlYXRDb3VudHxyZXBlYXREdXJ8cmVxdWlyZWRFeHRlbnNpb25zfHJlcXVpcmVkRmVhdHVyZXN8cmVzdGFydHxyZXN1bHR8cm90YXRlfHJ4fHJ5fHNjYWxlfHNlZWR8c2hhcGVSZW5kZXJpbmd8c2xvcGV8c3BhY2luZ3xzcGVjdWxhckNvbnN0YW50fHNwZWN1bGFyRXhwb25lbnR8c3BlZWR8c3ByZWFkTWV0aG9kfHN0YXJ0T2Zmc2V0fHN0ZERldmlhdGlvbnxzdGVtaHxzdGVtdnxzdGl0Y2hUaWxlc3xzdG9wQ29sb3J8c3RvcE9wYWNpdHl8c3RyaWtldGhyb3VnaFBvc2l0aW9ufHN0cmlrZXRocm91Z2hUaGlja25lc3N8c3RyaW5nfHN0cm9rZXxzdHJva2VEYXNoYXJyYXl8c3Ryb2tlRGFzaG9mZnNldHxzdHJva2VMaW5lY2FwfHN0cm9rZUxpbmVqb2lufHN0cm9rZU1pdGVybGltaXR8c3Ryb2tlT3BhY2l0eXxzdHJva2VXaWR0aHxzdXJmYWNlU2NhbGV8c3lzdGVtTGFuZ3VhZ2V8dGFibGVWYWx1ZXN8dGFyZ2V0WHx0YXJnZXRZfHRleHRBbmNob3J8dGV4dERlY29yYXRpb258dGV4dFJlbmRlcmluZ3x0ZXh0TGVuZ3RofHRvfHRyYW5zZm9ybXx1MXx1Mnx1bmRlcmxpbmVQb3NpdGlvbnx1bmRlcmxpbmVUaGlja25lc3N8dW5pY29kZXx1bmljb2RlQmlkaXx1bmljb2RlUmFuZ2V8dW5pdHNQZXJFbXx2QWxwaGFiZXRpY3x2SGFuZ2luZ3x2SWRlb2dyYXBoaWN8dk1hdGhlbWF0aWNhbHx2YWx1ZXN8dmVjdG9yRWZmZWN0fHZlcnNpb258dmVydEFkdll8dmVydE9yaWdpblh8dmVydE9yaWdpbll8dmlld0JveHx2aWV3VGFyZ2V0fHZpc2liaWxpdHl8d2lkdGhzfHdvcmRTcGFjaW5nfHdyaXRpbmdNb2RlfHh8eEhlaWdodHx4MXx4Mnx4Q2hhbm5lbFNlbGVjdG9yfHhsaW5rQWN0dWF0ZXx4bGlua0FyY3JvbGV8eGxpbmtIcmVmfHhsaW5rUm9sZXx4bGlua1Nob3d8eGxpbmtUaXRsZXx4bGlua1R5cGV8eG1sQmFzZXx4bWxuc3x4bWxuc1hsaW5rfHhtbExhbmd8eG1sU3BhY2V8eXx5MXx5Mnx5Q2hhbm5lbFNlbGVjdG9yfHp8em9vbUFuZFBhbnxmb3J8Y2xhc3N8YXV0b2ZvY3VzKXwoKFtEZF1bQWFdW1R0XVtBYV18W0FhXVtScl1bSWldW0FhXXx4KS0uKikpJC87IC8vIGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNWJmZWU2OGE0Y2Q3ZTYwMDllZjYxZDIzXG5cbnZhciBpbmRleCA9IG1lbW9pemUoZnVuY3Rpb24gKHByb3ApIHtcbiAgcmV0dXJuIHJlYWN0UHJvcHNSZWdleC50ZXN0KHByb3ApIHx8IHByb3AuY2hhckNvZGVBdCgwKSA9PT0gMTExXG4gIC8qIG8gKi9cbiAgJiYgcHJvcC5jaGFyQ29kZUF0KDEpID09PSAxMTBcbiAgLyogbiAqL1xuICAmJiBwcm9wLmNoYXJDb2RlQXQoMikgPCA5MTtcbn1cbi8qIForMSAqL1xuKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJmdW5jdGlvbiBtZW1vaXplKGZuKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIGlmIChjYWNoZVthcmddID09PSB1bmRlZmluZWQpIGNhY2hlW2FyZ10gPSBmbihhcmcpO1xuICAgIHJldHVybiBjYWNoZVthcmddO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuIiwiaW1wb3J0IGhhc2hTdHJpbmcgZnJvbSAnQGVtb3Rpb24vaGFzaCc7XG5pbXBvcnQgdW5pdGxlc3MgZnJvbSAnQGVtb3Rpb24vdW5pdGxlc3MnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnQGVtb3Rpb24vbWVtb2l6ZSc7XG5cbnZhciBJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUiA9IFwiWW91IGhhdmUgaWxsZWdhbCBlc2NhcGUgc2VxdWVuY2UgaW4geW91ciB0ZW1wbGF0ZSBsaXRlcmFsLCBtb3N0IGxpa2VseSBpbnNpZGUgY29udGVudCdzIHByb3BlcnR5IHZhbHVlLlxcbkJlY2F1c2UgeW91IHdyaXRlIHlvdXIgQ1NTIGluc2lkZSBhIEphdmFTY3JpcHQgc3RyaW5nIHlvdSBhY3R1YWxseSBoYXZlIHRvIGRvIGRvdWJsZSBlc2NhcGluZywgc28gZm9yIGV4YW1wbGUgXFxcImNvbnRlbnQ6ICdcXFxcMDBkNyc7XFxcIiBzaG91bGQgYmVjb21lIFxcXCJjb250ZW50OiAnXFxcXFxcXFwwMGQ3JztcXFwiLlxcbllvdSBjYW4gcmVhZCBtb3JlIGFib3V0IHRoaXMgaGVyZTpcXG5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9UZW1wbGF0ZV9saXRlcmFscyNFUzIwMThfcmV2aXNpb25fb2ZfaWxsZWdhbF9lc2NhcGVfc2VxdWVuY2VzXCI7XG52YXIgVU5ERUZJTkVEX0FTX09CSkVDVF9LRVlfRVJST1IgPSBcIllvdSBoYXZlIHBhc3NlZCBpbiBmYWxzeSB2YWx1ZSBhcyBzdHlsZSBvYmplY3QncyBrZXkgKGNhbiBoYXBwZW4gd2hlbiBpbiBleGFtcGxlIHlvdSBwYXNzIHVuZXhwb3J0ZWQgY29tcG9uZW50IGFzIGNvbXB1dGVkIGtleSkuXCI7XG52YXIgaHlwaGVuYXRlUmVnZXggPSAvW0EtWl18Xm1zL2c7XG52YXIgYW5pbWF0aW9uUmVnZXggPSAvX0VNT18oW15fXSs/KV8oW15dKj8pX0VNT18vZztcblxudmFyIGlzQ3VzdG9tUHJvcGVydHkgPSBmdW5jdGlvbiBpc0N1c3RvbVByb3BlcnR5KHByb3BlcnR5KSB7XG4gIHJldHVybiBwcm9wZXJ0eS5jaGFyQ29kZUF0KDEpID09PSA0NTtcbn07XG5cbnZhciBpc1Byb2Nlc3NhYmxlVmFsdWUgPSBmdW5jdGlvbiBpc1Byb2Nlc3NhYmxlVmFsdWUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbic7XG59O1xuXG52YXIgcHJvY2Vzc1N0eWxlTmFtZSA9IG1lbW9pemUoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gaXNDdXN0b21Qcm9wZXJ0eShzdHlsZU5hbWUpID8gc3R5bGVOYW1lIDogc3R5bGVOYW1lLnJlcGxhY2UoaHlwaGVuYXRlUmVnZXgsICctJCYnKS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbnZhciBwcm9jZXNzU3R5bGVWYWx1ZSA9IGZ1bmN0aW9uIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgc3dpdGNoIChrZXkpIHtcbiAgICBjYXNlICdhbmltYXRpb24nOlxuICAgIGNhc2UgJ2FuaW1hdGlvbk5hbWUnOlxuICAgICAge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKGFuaW1hdGlvblJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gsIHAxLCBwMikge1xuICAgICAgICAgICAgY3Vyc29yID0ge1xuICAgICAgICAgICAgICBuYW1lOiBwMSxcbiAgICAgICAgICAgICAgc3R5bGVzOiBwMixcbiAgICAgICAgICAgICAgbmV4dDogY3Vyc29yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHAxO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBpZiAodW5pdGxlc3Nba2V5XSAhPT0gMSAmJiAhaXNDdXN0b21Qcm9wZXJ0eShrZXkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGNvbnRlbnRWYWx1ZVBhdHRlcm4gPSAvKGF0dHJ8Y2FsY3xjb3VudGVycz98dXJsKVxcKC87XG4gIHZhciBjb250ZW50VmFsdWVzID0gWydub3JtYWwnLCAnbm9uZScsICdjb3VudGVyJywgJ29wZW4tcXVvdGUnLCAnY2xvc2UtcXVvdGUnLCAnbm8tb3Blbi1xdW90ZScsICduby1jbG9zZS1xdW90ZScsICdpbml0aWFsJywgJ2luaGVyaXQnLCAndW5zZXQnXTtcbiAgdmFyIG9sZFByb2Nlc3NTdHlsZVZhbHVlID0gcHJvY2Vzc1N0eWxlVmFsdWU7XG4gIHZhciBtc1BhdHRlcm4gPSAvXi1tcy0vO1xuICB2YXIgaHlwaGVuUGF0dGVybiA9IC8tKC4pL2c7XG4gIHZhciBoeXBoZW5hdGVkQ2FjaGUgPSB7fTtcblxuICBwcm9jZXNzU3R5bGVWYWx1ZSA9IGZ1bmN0aW9uIHByb2Nlc3NTdHlsZVZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5ID09PSAnY29udGVudCcpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IGNvbnRlbnRWYWx1ZXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xICYmICFjb250ZW50VmFsdWVQYXR0ZXJuLnRlc3QodmFsdWUpICYmICh2YWx1ZS5jaGFyQXQoMCkgIT09IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAxKSB8fCB2YWx1ZS5jaGFyQXQoMCkgIT09ICdcIicgJiYgdmFsdWUuY2hhckF0KDApICE9PSBcIidcIikpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSBzZWVtIHRvIGJlIHVzaW5nIGEgdmFsdWUgZm9yICdjb250ZW50JyB3aXRob3V0IHF1b3RlcywgdHJ5IHJlcGxhY2luZyBpdCB3aXRoIGBjb250ZW50OiAnXFxcIlwiICsgdmFsdWUgKyBcIlxcXCInYFwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJvY2Vzc2VkID0gb2xkUHJvY2Vzc1N0eWxlVmFsdWUoa2V5LCB2YWx1ZSk7XG5cbiAgICBpZiAocHJvY2Vzc2VkICE9PSAnJyAmJiAhaXNDdXN0b21Qcm9wZXJ0eShrZXkpICYmIGtleS5pbmRleE9mKCctJykgIT09IC0xICYmIGh5cGhlbmF0ZWRDYWNoZVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGh5cGhlbmF0ZWRDYWNoZVtrZXldID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2luZyBrZWJhYi1jYXNlIGZvciBjc3MgcHJvcGVydGllcyBpbiBvYmplY3RzIGlzIG5vdCBzdXBwb3J0ZWQuIERpZCB5b3UgbWVhbiBcIiArIGtleS5yZXBsYWNlKG1zUGF0dGVybiwgJ21zLScpLnJlcGxhY2UoaHlwaGVuUGF0dGVybiwgZnVuY3Rpb24gKHN0ciwgX2NoYXIpIHtcbiAgICAgICAgcmV0dXJuIF9jaGFyLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9KSArIFwiP1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvY2Vzc2VkO1xuICB9O1xufVxuXG52YXIgc2hvdWxkV2FybkFib3V0SW50ZXJwb2xhdGluZ0NsYXNzTmFtZUZyb21Dc3MgPSB0cnVlO1xuXG5mdW5jdGlvbiBoYW5kbGVJbnRlcnBvbGF0aW9uKG1lcmdlZFByb3BzLCByZWdpc3RlcmVkLCBpbnRlcnBvbGF0aW9uLCBjb3VsZEJlU2VsZWN0b3JJbnRlcnBvbGF0aW9uKSB7XG4gIGlmIChpbnRlcnBvbGF0aW9uID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoaW50ZXJwb2xhdGlvbi5fX2Vtb3Rpb25fc3R5bGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpbnRlcnBvbGF0aW9uLnRvU3RyaW5nKCkgPT09ICdOT19DT01QT05FTlRfU0VMRUNUT1InKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudCBzZWxlY3RvcnMgY2FuIG9ubHkgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGJhYmVsLXBsdWdpbi1lbW90aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnBvbGF0aW9uO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlb2YgaW50ZXJwb2xhdGlvbikge1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAge1xuICAgICAgICBpZiAoaW50ZXJwb2xhdGlvbi5hbmltID09PSAxKSB7XG4gICAgICAgICAgY3Vyc29yID0ge1xuICAgICAgICAgICAgbmFtZTogaW50ZXJwb2xhdGlvbi5uYW1lLFxuICAgICAgICAgICAgc3R5bGVzOiBpbnRlcnBvbGF0aW9uLnN0eWxlcyxcbiAgICAgICAgICAgIG5leHQ6IGN1cnNvclxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGludGVycG9sYXRpb24ubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnRlcnBvbGF0aW9uLnN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIG5leHQgPSBpbnRlcnBvbGF0aW9uLm5leHQ7XG5cbiAgICAgICAgICBpZiAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBub3QgdGhlIG1vc3QgZWZmaWNpZW50IHRoaW5nIGV2ZXIgYnV0IHRoaXMgaXMgYSBwcmV0dHkgcmFyZSBjYXNlXG4gICAgICAgICAgICAvLyBhbmQgdGhlcmUgd2lsbCBiZSB2ZXJ5IGZldyBpdGVyYXRpb25zIG9mIHRoaXMgZ2VuZXJhbGx5XG4gICAgICAgICAgICB3aGlsZSAobmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGN1cnNvciA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXh0Lm5hbWUsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiBuZXh0LnN0eWxlcyxcbiAgICAgICAgICAgICAgICBuZXh0OiBjdXJzb3JcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3R5bGVzID0gaW50ZXJwb2xhdGlvbi5zdHlsZXMgKyBcIjtcIjtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGludGVycG9sYXRpb24ubWFwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0eWxlcyArPSBpbnRlcnBvbGF0aW9uLm1hcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0Zyb21PYmplY3QobWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIGludGVycG9sYXRpb24pO1xuICAgICAgfVxuXG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAge1xuICAgICAgICBpZiAobWVyZ2VkUHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBwcmV2aW91c0N1cnNvciA9IGN1cnNvcjtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gaW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcyk7XG4gICAgICAgICAgY3Vyc29yID0gcHJldmlvdXNDdXJzb3I7XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZUludGVycG9sYXRpb24obWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIHJlc3VsdCwgY291bGRCZVNlbGVjdG9ySW50ZXJwb2xhdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Z1bmN0aW9ucyB0aGF0IGFyZSBpbnRlcnBvbGF0ZWQgaW4gY3NzIGNhbGxzIHdpbGwgYmUgc3RyaW5naWZpZWQuXFxuJyArICdJZiB5b3Ugd2FudCB0byBoYXZlIGEgY3NzIGNhbGwgYmFzZWQgb24gcHJvcHMsIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNzcyBjYWxsIGxpa2UgdGhpc1xcbicgKyAnbGV0IGR5bmFtaWNTdHlsZSA9IChwcm9wcykgPT4gY3NzYGNvbG9yOiAke3Byb3BzLmNvbG9yfWBcXG4nICsgJ0l0IGNhbiBiZSBjYWxsZWQgZGlyZWN0bHkgd2l0aCBwcm9wcyBvciBpbnRlcnBvbGF0ZWQgaW4gYSBzdHlsZWQgY2FsbCBsaWtlIHRoaXNcXG4nICsgXCJsZXQgU29tZUNvbXBvbmVudCA9IHN0eWxlZCgnZGl2JylgJHtkeW5hbWljU3R5bGV9YFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gW107XG4gICAgICAgIHZhciByZXBsYWNlZCA9IGludGVycG9sYXRpb24ucmVwbGFjZShhbmltYXRpb25SZWdleCwgZnVuY3Rpb24gKG1hdGNoLCBwMSwgcDIpIHtcbiAgICAgICAgICB2YXIgZmFrZVZhck5hbWUgPSBcImFuaW1hdGlvblwiICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgICAgbWF0Y2hlZC5wdXNoKFwiY29uc3QgXCIgKyBmYWtlVmFyTmFtZSArIFwiID0ga2V5ZnJhbWVzYFwiICsgcDIucmVwbGFjZSgvXkBrZXlmcmFtZXMgYW5pbWF0aW9uLVxcdysvLCAnJykgKyBcImBcIik7XG4gICAgICAgICAgcmV0dXJuIFwiJHtcIiArIGZha2VWYXJOYW1lICsgXCJ9XCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtYXRjaGVkLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2BrZXlmcmFtZXNgIG91dHB1dCBnb3QgaW50ZXJwb2xhdGVkIGludG8gcGxhaW4gc3RyaW5nLCBwbGVhc2Ugd3JhcCBpdCB3aXRoIGBjc3NgLlxcblxcbicgKyAnSW5zdGVhZCBvZiBkb2luZyB0aGlzOlxcblxcbicgKyBbXS5jb25jYXQobWF0Y2hlZCwgW1wiYFwiICsgcmVwbGFjZWQgKyBcImBcIl0pLmpvaW4oJ1xcbicpICsgJ1xcblxcbllvdSBzaG91bGQgd3JhcCBpdCB3aXRoIGBjc3NgIGxpa2UgdGhpczpcXG5cXG4nICsgKFwiY3NzYFwiICsgcmVwbGFjZWQgKyBcImBcIikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICB9IC8vIGZpbmFsaXplIHN0cmluZyB2YWx1ZXMgKHJlZ3VsYXIgc3RyaW5ncyBhbmQgZnVuY3Rpb25zIGludGVycG9sYXRlZCBpbnRvIGNzcyBjYWxscylcblxuXG4gIGlmIChyZWdpc3RlcmVkID09IG51bGwpIHtcbiAgICByZXR1cm4gaW50ZXJwb2xhdGlvbjtcbiAgfVxuXG4gIHZhciBjYWNoZWQgPSByZWdpc3RlcmVkW2ludGVycG9sYXRpb25dO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvdWxkQmVTZWxlY3RvckludGVycG9sYXRpb24gJiYgc2hvdWxkV2FybkFib3V0SW50ZXJwb2xhdGluZ0NsYXNzTmFtZUZyb21Dc3MgJiYgY2FjaGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zb2xlLmVycm9yKCdJbnRlcnBvbGF0aW5nIGEgY2xhc3NOYW1lIGZyb20gY3NzYGAgaXMgbm90IHJlY29tbWVuZGVkIGFuZCB3aWxsIGNhdXNlIHByb2JsZW1zIHdpdGggY29tcG9zaXRpb24uXFxuJyArICdJbnRlcnBvbGF0aW5nIGEgY2xhc3NOYW1lIGZyb20gY3NzYGAgd2lsbCBiZSBjb21wbGV0ZWx5IHVuc3VwcG9ydGVkIGluIGEgZnV0dXJlIG1ham9yIHZlcnNpb24gb2YgRW1vdGlvbicpO1xuICAgIHNob3VsZFdhcm5BYm91dEludGVycG9sYXRpbmdDbGFzc05hbWVGcm9tQ3NzID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY2FjaGVkICE9PSB1bmRlZmluZWQgJiYgIWNvdWxkQmVTZWxlY3RvckludGVycG9sYXRpb24gPyBjYWNoZWQgOiBpbnRlcnBvbGF0aW9uO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHJpbmdGcm9tT2JqZWN0KG1lcmdlZFByb3BzLCByZWdpc3RlcmVkLCBvYmopIHtcbiAgdmFyIHN0cmluZyA9ICcnO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyaW5nICs9IGhhbmRsZUludGVycG9sYXRpb24obWVyZ2VkUHJvcHMsIHJlZ2lzdGVyZWQsIG9ialtpXSwgZmFsc2UpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBfa2V5IGluIG9iaikge1xuICAgICAgdmFyIHZhbHVlID0gb2JqW19rZXldO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAocmVnaXN0ZXJlZCAhPSBudWxsICYmIHJlZ2lzdGVyZWRbdmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdHJpbmcgKz0gX2tleSArIFwie1wiICsgcmVnaXN0ZXJlZFt2YWx1ZV0gKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIGlmIChpc1Byb2Nlc3NhYmxlVmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgc3RyaW5nICs9IHByb2Nlc3NTdHlsZU5hbWUoX2tleSkgKyBcIjpcIiArIHByb2Nlc3NTdHlsZVZhbHVlKF9rZXksIHZhbHVlKSArIFwiO1wiO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX2tleSA9PT0gJ05PX0NPTVBPTkVOVF9TRUxFQ1RPUicgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcG9uZW50IHNlbGVjdG9ycyBjYW4gb25seSBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYmFiZWwtcGx1Z2luLWVtb3Rpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlWzBdID09PSAnc3RyaW5nJyAmJiAocmVnaXN0ZXJlZCA9PSBudWxsIHx8IHJlZ2lzdGVyZWRbdmFsdWVbMF1dID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHZhbHVlLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgaWYgKGlzUHJvY2Vzc2FibGVWYWx1ZSh2YWx1ZVtfaV0pKSB7XG4gICAgICAgICAgICAgIHN0cmluZyArPSBwcm9jZXNzU3R5bGVOYW1lKF9rZXkpICsgXCI6XCIgKyBwcm9jZXNzU3R5bGVWYWx1ZShfa2V5LCB2YWx1ZVtfaV0pICsgXCI7XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpbnRlcnBvbGF0ZWQgPSBoYW5kbGVJbnRlcnBvbGF0aW9uKG1lcmdlZFByb3BzLCByZWdpc3RlcmVkLCB2YWx1ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgc3dpdGNoIChfa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdhbmltYXRpb24nOlxuICAgICAgICAgICAgY2FzZSAnYW5pbWF0aW9uTmFtZSc6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gcHJvY2Vzc1N0eWxlTmFtZShfa2V5KSArIFwiOlwiICsgaW50ZXJwb2xhdGVkICsgXCI7XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIF9rZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFVOREVGSU5FRF9BU19PQkpFQ1RfS0VZX0VSUk9SKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gX2tleSArIFwie1wiICsgaW50ZXJwb2xhdGVkICsgXCJ9XCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RyaW5nO1xufVxuXG52YXIgbGFiZWxQYXR0ZXJuID0gL2xhYmVsOlxccyooW15cXHM7XFxue10rKVxccyo7L2c7XG52YXIgc291cmNlTWFwUGF0dGVybjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc291cmNlTWFwUGF0dGVybiA9IC9cXC9cXCojXFxzc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjtcXFMrXFxzK1xcKlxcLy87XG59IC8vIHRoaXMgaXMgdGhlIGN1cnNvciBmb3Iga2V5ZnJhbWVzXG4vLyBrZXlmcmFtZXMgYXJlIHN0b3JlZCBvbiB0aGUgU2VyaWFsaXplZFN0eWxlcyBvYmplY3QgYXMgYSBsaW5rZWQgbGlzdFxuXG5cbnZhciBjdXJzb3I7XG52YXIgc2VyaWFsaXplU3R5bGVzID0gZnVuY3Rpb24gc2VyaWFsaXplU3R5bGVzKGFyZ3MsIHJlZ2lzdGVyZWQsIG1lcmdlZFByb3BzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgYXJnc1swXSAhPT0gbnVsbCAmJiBhcmdzWzBdLnN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFyZ3NbMF07XG4gIH1cblxuICB2YXIgc3RyaW5nTW9kZSA9IHRydWU7XG4gIHZhciBzdHlsZXMgPSAnJztcbiAgY3Vyc29yID0gdW5kZWZpbmVkO1xuICB2YXIgc3RyaW5ncyA9IGFyZ3NbMF07XG5cbiAgaWYgKHN0cmluZ3MgPT0gbnVsbCB8fCBzdHJpbmdzLnJhdyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RyaW5nTW9kZSA9IGZhbHNlO1xuICAgIHN0eWxlcyArPSBoYW5kbGVJbnRlcnBvbGF0aW9uKG1lcmdlZFByb3BzLCByZWdpc3RlcmVkLCBzdHJpbmdzLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgc3RyaW5nc1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKElMTEVHQUxfRVNDQVBFX1NFUVVFTkNFX0VSUk9SKTtcbiAgICB9XG5cbiAgICBzdHlsZXMgKz0gc3RyaW5nc1swXTtcbiAgfSAvLyB3ZSBzdGFydCBhdCAxIHNpbmNlIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGUgZmlyc3QgYXJnXG5cblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBzdHlsZXMgKz0gaGFuZGxlSW50ZXJwb2xhdGlvbihtZXJnZWRQcm9wcywgcmVnaXN0ZXJlZCwgYXJnc1tpXSwgc3R5bGVzLmNoYXJDb2RlQXQoc3R5bGVzLmxlbmd0aCAtIDEpID09PSA0Nik7XG5cbiAgICBpZiAoc3RyaW5nTW9kZSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgc3RyaW5nc1tpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoSUxMRUdBTF9FU0NBUEVfU0VRVUVOQ0VfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZXMgKz0gc3RyaW5nc1tpXTtcbiAgICB9XG4gIH1cblxuICB2YXIgc291cmNlTWFwO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgc3R5bGVzID0gc3R5bGVzLnJlcGxhY2Uoc291cmNlTWFwUGF0dGVybiwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICBzb3VyY2VNYXAgPSBtYXRjaDtcbiAgICAgIHJldHVybiAnJztcbiAgICB9KTtcbiAgfSAvLyB1c2luZyBhIGdsb2JhbCByZWdleCB3aXRoIC5leGVjIGlzIHN0YXRlZnVsIHNvIGxhc3RJbmRleCBoYXMgdG8gYmUgcmVzZXQgZWFjaCB0aW1lXG5cblxuICBsYWJlbFBhdHRlcm4ubGFzdEluZGV4ID0gMDtcbiAgdmFyIGlkZW50aWZpZXJOYW1lID0gJyc7XG4gIHZhciBtYXRjaDsgLy8gaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81YjgwOWMyY2YyOTQ5ODAwYTBmNjFmYjVcblxuICB3aGlsZSAoKG1hdGNoID0gbGFiZWxQYXR0ZXJuLmV4ZWMoc3R5bGVzKSkgIT09IG51bGwpIHtcbiAgICBpZGVudGlmaWVyTmFtZSArPSAnLScgKyAvLyAkRmxvd0ZpeE1lIHdlIGtub3cgaXQncyBub3QgbnVsbFxuICAgIG1hdGNoWzFdO1xuICB9XG5cbiAgdmFyIG5hbWUgPSBoYXNoU3RyaW5nKHN0eWxlcykgKyBpZGVudGlmaWVyTmFtZTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vICRGbG93Rml4TWUgU2VyaWFsaXplZFN0eWxlcyB0eXBlIGRvZXNuJ3QgaGF2ZSB0b1N0cmluZyBwcm9wZXJ0eSAoYW5kIHdlIGRvbid0IHdhbnQgdG8gYWRkIGl0KVxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgc3R5bGVzOiBzdHlsZXMsXG4gICAgICBtYXA6IHNvdXJjZU1hcCxcbiAgICAgIG5leHQ6IGN1cnNvcixcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIFwiWW91IGhhdmUgdHJpZWQgdG8gc3RyaW5naWZ5IG9iamVjdCByZXR1cm5lZCBmcm9tIGBjc3NgIGZ1bmN0aW9uLiBJdCBpc24ndCBzdXBwb3NlZCB0byBiZSB1c2VkIGRpcmVjdGx5IChlLmcuIGFzIHZhbHVlIG9mIHRoZSBgY2xhc3NOYW1lYCBwcm9wKSwgYnV0IHJhdGhlciBoYW5kZWQgdG8gZW1vdGlvbiBzbyBpdCBjYW4gaGFuZGxlIGl0IChlLmcuIGFzIHZhbHVlIG9mIGBjc3NgIHByb3ApLlwiO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgc3R5bGVzOiBzdHlsZXMsXG4gICAgbmV4dDogY3Vyc29yXG4gIH07XG59O1xuXG5leHBvcnQgeyBzZXJpYWxpemVTdHlsZXMgfTtcbiIsIi8qXG5cbkJhc2VkIG9mZiBnbGFtb3IncyBTdHlsZVNoZWV0LCB0aGFua3MgU3VuaWwg4p2k77iPXG5cbmhpZ2ggcGVyZm9ybWFuY2UgU3R5bGVTaGVldCBmb3IgY3NzLWluLWpzIHN5c3RlbXNcblxuLSB1c2VzIG11bHRpcGxlIHN0eWxlIHRhZ3MgYmVoaW5kIHRoZSBzY2VuZXMgZm9yIG1pbGxpb25zIG9mIHJ1bGVzXG4tIHVzZXMgYGluc2VydFJ1bGVgIGZvciBhcHBlbmRpbmcgaW4gcHJvZHVjdGlvbiBmb3IgKm11Y2gqIGZhc3RlciBwZXJmb3JtYW5jZVxuXG4vLyB1c2FnZVxuXG5pbXBvcnQgeyBTdHlsZVNoZWV0IH0gZnJvbSAnQGVtb3Rpb24vc2hlZXQnXG5cbmxldCBzdHlsZVNoZWV0ID0gbmV3IFN0eWxlU2hlZXQoeyBrZXk6ICcnLCBjb250YWluZXI6IGRvY3VtZW50LmhlYWQgfSlcblxuc3R5bGVTaGVldC5pbnNlcnQoJyNib3ggeyBib3JkZXI6IDFweCBzb2xpZCByZWQ7IH0nKVxuLSBhcHBlbmRzIGEgY3NzIHJ1bGUgaW50byB0aGUgc3R5bGVzaGVldFxuXG5zdHlsZVNoZWV0LmZsdXNoKClcbi0gZW1wdGllcyB0aGUgc3R5bGVzaGVldCBvZiBhbGwgaXRzIGNvbnRlbnRzXG5cbiovXG4vLyAkRmxvd0ZpeE1lXG5mdW5jdGlvbiBzaGVldEZvclRhZyh0YWcpIHtcbiAgaWYgKHRhZy5zaGVldCkge1xuICAgIC8vICRGbG93Rml4TWVcbiAgICByZXR1cm4gdGFnLnNoZWV0O1xuICB9IC8vIHRoaXMgd2VpcmRuZXNzIGJyb3VnaHQgdG8geW91IGJ5IGZpcmVmb3hcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChkb2N1bWVudC5zdHlsZVNoZWV0c1tpXS5vd25lck5vZGUgPT09IHRhZykge1xuICAgICAgLy8gJEZsb3dGaXhNZVxuICAgICAgcmV0dXJuIGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdGFnLnNldEF0dHJpYnV0ZSgnZGF0YS1lbW90aW9uJywgb3B0aW9ucy5rZXkpO1xuXG4gIGlmIChvcHRpb25zLm5vbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdub25jZScsIG9wdGlvbnMubm9uY2UpO1xuICB9XG5cbiAgdGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG4gIHJldHVybiB0YWc7XG59XG5cbnZhciBTdHlsZVNoZWV0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVTaGVldChvcHRpb25zKSB7XG4gICAgdGhpcy5pc1NwZWVkeSA9IG9wdGlvbnMuc3BlZWR5ID09PSB1bmRlZmluZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nIDogb3B0aW9ucy5zcGVlZHk7XG4gICAgdGhpcy50YWdzID0gW107XG4gICAgdGhpcy5jdHIgPSAwO1xuICAgIHRoaXMubm9uY2UgPSBvcHRpb25zLm5vbmNlOyAvLyBrZXkgaXMgdGhlIHZhbHVlIG9mIHRoZSBkYXRhLWVtb3Rpb24gYXR0cmlidXRlLCBpdCdzIHVzZWQgdG8gaWRlbnRpZnkgZGlmZmVyZW50IHNoZWV0c1xuXG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMuYmVmb3JlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTdHlsZVNoZWV0LnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24gaW5zZXJ0KHJ1bGUpIHtcbiAgICAvLyB0aGUgbWF4IGxlbmd0aCBpcyBob3cgbWFueSBydWxlcyB3ZSBoYXZlIHBlciBzdHlsZSB0YWcsIGl0J3MgNjUwMDAgaW4gc3BlZWR5IG1vZGVcbiAgICAvLyBpdCdzIDEgaW4gZGV2IGJlY2F1c2Ugd2UgaW5zZXJ0IHNvdXJjZSBtYXBzIHRoYXQgbWFwIGEgc2luZ2xlIHJ1bGUgdG8gYSBsb2NhdGlvblxuICAgIC8vIGFuZCB5b3UgY2FuIG9ubHkgaGF2ZSBvbmUgc291cmNlIG1hcCBwZXIgc3R5bGUgdGFnXG4gICAgaWYgKHRoaXMuY3RyICUgKHRoaXMuaXNTcGVlZHkgPyA2NTAwMCA6IDEpID09PSAwKSB7XG4gICAgICB2YXIgX3RhZyA9IGNyZWF0ZVN0eWxlRWxlbWVudCh0aGlzKTtcblxuICAgICAgdmFyIGJlZm9yZTtcblxuICAgICAgaWYgKHRoaXMudGFncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYmVmb3JlID0gdGhpcy5iZWZvcmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiZWZvcmUgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdLm5leHRTaWJsaW5nO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUoX3RhZywgYmVmb3JlKTtcbiAgICAgIHRoaXMudGFncy5wdXNoKF90YWcpO1xuICAgIH1cblxuICAgIHZhciB0YWcgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdO1xuXG4gICAgaWYgKHRoaXMuaXNTcGVlZHkpIHtcbiAgICAgIHZhciBzaGVldCA9IHNoZWV0Rm9yVGFnKHRhZyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRoaXMgaXMgYSByZWFsbHkgaG90IHBhdGhcbiAgICAgICAgLy8gd2UgY2hlY2sgdGhlIHNlY29uZCBjaGFyYWN0ZXIgZmlyc3QgYmVjYXVzZSBoYXZpbmcgXCJpXCJcbiAgICAgICAgLy8gYXMgdGhlIHNlY29uZCBjaGFyYWN0ZXIgd2lsbCBoYXBwZW4gbGVzcyBvZnRlbiB0aGFuXG4gICAgICAgIC8vIGhhdmluZyBcIkBcIiBhcyB0aGUgZmlyc3QgY2hhcmFjdGVyXG4gICAgICAgIHZhciBpc0ltcG9ydFJ1bGUgPSBydWxlLmNoYXJDb2RlQXQoMSkgPT09IDEwNSAmJiBydWxlLmNoYXJDb2RlQXQoMCkgPT09IDY0OyAvLyB0aGlzIGlzIHRoZSB1bHRyYWZhc3QgdmVyc2lvbiwgd29ya3MgYWNyb3NzIGJyb3dzZXJzXG4gICAgICAgIC8vIHRoZSBiaWcgZHJhd2JhY2sgaXMgdGhhdCB0aGUgY3NzIHdvbid0IGJlIGVkaXRhYmxlIGluIGRldnRvb2xzXG5cbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShydWxlLCAvLyB3ZSBuZWVkIHRvIGluc2VydCBAaW1wb3J0IHJ1bGVzIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gICAgICAgIC8vIG90aGVyd2lzZSB0aGVyZSB3aWxsIGJlIGFuIGVycm9yXG4gICAgICAgIC8vIHRlY2huaWNhbGx5IHRoaXMgbWVhbnMgdGhhdCB0aGUgQGltcG9ydCBydWxlcyB3aWxsXG4gICAgICAgIC8vIF91c3VhbGx5Xyhub3QgYWx3YXlzIHNpbmNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIHN0eWxlIHRhZ3MpXG4gICAgICAgIC8vIGJlIHRoZSBmaXJzdCBvbmVzIGluIHByb2QgYW5kIGdlbmVyYWxseSBsYXRlciBpbiBkZXZcbiAgICAgICAgLy8gdGhpcyBzaG91bGRuJ3QgcmVhbGx5IG1hdHRlciBpbiB0aGUgcmVhbCB3b3JsZCB0aG91Z2hcbiAgICAgICAgLy8gQGltcG9ydCBpcyBnZW5lcmFsbHkgb25seSB1c2VkIGZvciBmb250IGZhY2VzIGZyb20gZ29vZ2xlIGZvbnRzIGFuZCBldGMuXG4gICAgICAgIC8vIHNvIHdoaWxlIHRoaXMgY291bGQgYmUgdGVjaG5pY2FsbHkgY29ycmVjdCB0aGVuIGl0IHdvdWxkIGJlIHNsb3dlciBhbmQgbGFyZ2VyXG4gICAgICAgIC8vIGZvciBhIHRpbnkgYml0IG9mIGNvcnJlY3RuZXNzIHRoYXQgd29uJ3QgbWF0dGVyIGluIHRoZSByZWFsIHdvcmxkXG4gICAgICAgIGlzSW1wb3J0UnVsZSA/IDAgOiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIlRoZXJlIHdhcyBhIHByb2JsZW0gaW5zZXJ0aW5nIHRoZSBmb2xsb3dpbmcgcnVsZTogXFxcIlwiICsgcnVsZSArIFwiXFxcIlwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocnVsZSkpO1xuICAgIH1cblxuICAgIHRoaXMuY3RyKys7XG4gIH07XG5cbiAgX3Byb3RvLmZsdXNoID0gZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgLy8gJEZsb3dGaXhNZVxuICAgIHRoaXMudGFncy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHJldHVybiB0YWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YWcpO1xuICAgIH0pO1xuICAgIHRoaXMudGFncyA9IFtdO1xuICAgIHRoaXMuY3RyID0gMDtcbiAgfTtcblxuICByZXR1cm4gU3R5bGVTaGVldDtcbn0oKTtcblxuZXhwb3J0IHsgU3R5bGVTaGVldCB9O1xuIiwiaW1wb3J0IF9kZWZpbmVQcm9wZXJ0eSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5JztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaXNQcm9wVmFsaWQgZnJvbSAnQGVtb3Rpb24vaXMtcHJvcC12YWxpZCc7XG5pbXBvcnQgeyB3aXRoRW1vdGlvbkNhY2hlLCBUaGVtZUNvbnRleHQgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IGdldFJlZ2lzdGVyZWRTdHlsZXMsIGluc2VydFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3V0aWxzJztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3NlcmlhbGl6ZSc7XG5cbnZhciB0ZXN0T21pdFByb3BzT25TdHJpbmdUYWcgPSBpc1Byb3BWYWxpZDtcblxudmFyIHRlc3RPbWl0UHJvcHNPbkNvbXBvbmVudCA9IGZ1bmN0aW9uIHRlc3RPbWl0UHJvcHNPbkNvbXBvbmVudChrZXkpIHtcbiAgcmV0dXJuIGtleSAhPT0gJ3RoZW1lJyAmJiBrZXkgIT09ICdpbm5lclJlZic7XG59O1xuXG52YXIgZ2V0RGVmYXVsdFNob3VsZEZvcndhcmRQcm9wID0gZnVuY3Rpb24gZ2V0RGVmYXVsdFNob3VsZEZvcndhcmRQcm9wKHRhZykge1xuICByZXR1cm4gdHlwZW9mIHRhZyA9PT0gJ3N0cmluZycgJiYgLy8gOTYgaXMgb25lIGxlc3MgdGhhbiB0aGUgY2hhciBjb2RlXG4gIC8vIGZvciBcImFcIiBzbyB0aGlzIGlzIGNoZWNraW5nIHRoYXRcbiAgLy8gaXQncyBhIGxvd2VyY2FzZSBjaGFyYWN0ZXJcbiAgdGFnLmNoYXJDb2RlQXQoMCkgPiA5NiA/IHRlc3RPbWl0UHJvcHNPblN0cmluZ1RhZyA6IHRlc3RPbWl0UHJvcHNPbkNvbXBvbmVudDtcbn07XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhzb3VyY2UsIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgSUxMRUdBTF9FU0NBUEVfU0VRVUVOQ0VfRVJST1IgPSBcIllvdSBoYXZlIGlsbGVnYWwgZXNjYXBlIHNlcXVlbmNlIGluIHlvdXIgdGVtcGxhdGUgbGl0ZXJhbCwgbW9zdCBsaWtlbHkgaW5zaWRlIGNvbnRlbnQncyBwcm9wZXJ0eSB2YWx1ZS5cXG5CZWNhdXNlIHlvdSB3cml0ZSB5b3VyIENTUyBpbnNpZGUgYSBKYXZhU2NyaXB0IHN0cmluZyB5b3UgYWN0dWFsbHkgaGF2ZSB0byBkbyBkb3VibGUgZXNjYXBpbmcsIHNvIGZvciBleGFtcGxlIFxcXCJjb250ZW50OiAnXFxcXDAwZDcnO1xcXCIgc2hvdWxkIGJlY29tZSBcXFwiY29udGVudDogJ1xcXFxcXFxcMDBkNyc7XFxcIi5cXG5Zb3UgY2FuIHJlYWQgbW9yZSBhYm91dCB0aGlzIGhlcmU6XFxuaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvVGVtcGxhdGVfbGl0ZXJhbHMjRVMyMDE4X3JldmlzaW9uX29mX2lsbGVnYWxfZXNjYXBlX3NlcXVlbmNlc1wiO1xuXG52YXIgY3JlYXRlU3R5bGVkID0gZnVuY3Rpb24gY3JlYXRlU3R5bGVkKHRhZywgb3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmICh0YWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYXJlIHRyeWluZyB0byBjcmVhdGUgYSBzdHlsZWQgZWxlbWVudCB3aXRoIGFuIHVuZGVmaW5lZCBjb21wb25lbnQuXFxuWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBpbXBvcnQgaXQuJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGlkZW50aWZpZXJOYW1lO1xuICB2YXIgc2hvdWxkRm9yd2FyZFByb3A7XG4gIHZhciB0YXJnZXRDbGFzc05hbWU7XG5cbiAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlkZW50aWZpZXJOYW1lID0gb3B0aW9ucy5sYWJlbDtcbiAgICB0YXJnZXRDbGFzc05hbWUgPSBvcHRpb25zLnRhcmdldDtcbiAgICBzaG91bGRGb3J3YXJkUHJvcCA9IHRhZy5fX2Vtb3Rpb25fZm9yd2FyZFByb3AgJiYgb3B0aW9ucy5zaG91bGRGb3J3YXJkUHJvcCA/IGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuIHRhZy5fX2Vtb3Rpb25fZm9yd2FyZFByb3AocHJvcE5hbWUpICYmIC8vICRGbG93Rml4TWVcbiAgICAgIG9wdGlvbnMuc2hvdWxkRm9yd2FyZFByb3AocHJvcE5hbWUpO1xuICAgIH0gOiBvcHRpb25zLnNob3VsZEZvcndhcmRQcm9wO1xuICB9XG5cbiAgdmFyIGlzUmVhbCA9IHRhZy5fX2Vtb3Rpb25fcmVhbCA9PT0gdGFnO1xuICB2YXIgYmFzZVRhZyA9IGlzUmVhbCAmJiB0YWcuX19lbW90aW9uX2Jhc2UgfHwgdGFnO1xuXG4gIGlmICh0eXBlb2Ygc2hvdWxkRm9yd2FyZFByb3AgIT09ICdmdW5jdGlvbicgJiYgaXNSZWFsKSB7XG4gICAgc2hvdWxkRm9yd2FyZFByb3AgPSB0YWcuX19lbW90aW9uX2ZvcndhcmRQcm9wO1xuICB9XG5cbiAgdmFyIGRlZmF1bHRTaG91bGRGb3J3YXJkUHJvcCA9IHNob3VsZEZvcndhcmRQcm9wIHx8IGdldERlZmF1bHRTaG91bGRGb3J3YXJkUHJvcChiYXNlVGFnKTtcbiAgdmFyIHNob3VsZFVzZUFzID0gIWRlZmF1bHRTaG91bGRGb3J3YXJkUHJvcCgnYXMnKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgc3R5bGVzID0gaXNSZWFsICYmIHRhZy5fX2Vtb3Rpb25fc3R5bGVzICE9PSB1bmRlZmluZWQgPyB0YWcuX19lbW90aW9uX3N0eWxlcy5zbGljZSgwKSA6IFtdO1xuXG4gICAgaWYgKGlkZW50aWZpZXJOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0eWxlcy5wdXNoKFwibGFiZWw6XCIgKyBpZGVudGlmaWVyTmFtZSArIFwiO1wiKTtcbiAgICB9XG5cbiAgICBpZiAoYXJnc1swXSA9PSBudWxsIHx8IGFyZ3NbMF0ucmF3ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0eWxlcy5wdXNoLmFwcGx5KHN0eWxlcywgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGFyZ3NbMF1bMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKElMTEVHQUxfRVNDQVBFX1NFUVVFTkNFX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVzLnB1c2goYXJnc1swXVswXSk7XG4gICAgICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gICAgICB2YXIgaSA9IDE7XG5cbiAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgYXJnc1swXVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihJTExFR0FMX0VTQ0FQRV9TRVFVRU5DRV9FUlJPUik7XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZXMucHVzaChhcmdzW2ldLCBhcmdzWzBdW2ldKTtcbiAgICAgIH1cbiAgICB9IC8vICRGbG93Rml4TWU6IHdlIG5lZWQgdG8gY2FzdCBTdGF0ZWxlc3NGdW5jdGlvbmFsQ29tcG9uZW50IHRvIG91ciBQcml2YXRlU3R5bGVkQ29tcG9uZW50IGNsYXNzXG5cblxuICAgIHZhciBTdHlsZWQgPSB3aXRoRW1vdGlvbkNhY2hlKGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgcmVmKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChUaGVtZUNvbnRleHQuQ29uc3VtZXIsIG51bGwsIGZ1bmN0aW9uICh0aGVtZSkge1xuICAgICAgICB2YXIgZmluYWxUYWcgPSBzaG91bGRVc2VBcyAmJiBwcm9wcy5hcyB8fCBiYXNlVGFnO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIHZhciBjbGFzc0ludGVycG9sYXRpb25zID0gW107XG4gICAgICAgIHZhciBtZXJnZWRQcm9wcyA9IHByb3BzO1xuXG4gICAgICAgIGlmIChwcm9wcy50aGVtZSA9PSBudWxsKSB7XG4gICAgICAgICAgbWVyZ2VkUHJvcHMgPSB7fTtcblxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgbWVyZ2VkUHJvcHNba2V5XSA9IHByb3BzW2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWVyZ2VkUHJvcHMudGhlbWUgPSB0aGVtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcHMuY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IGdldFJlZ2lzdGVyZWRTdHlsZXMoY29udGV4dC5yZWdpc3RlcmVkLCBjbGFzc0ludGVycG9sYXRpb25zLCBwcm9wcy5jbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLmNsYXNzTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VyaWFsaXplZCA9IHNlcmlhbGl6ZVN0eWxlcyhzdHlsZXMuY29uY2F0KGNsYXNzSW50ZXJwb2xhdGlvbnMpLCBjb250ZXh0LnJlZ2lzdGVyZWQsIG1lcmdlZFByb3BzKTtcbiAgICAgICAgdmFyIHJ1bGVzID0gaW5zZXJ0U3R5bGVzKGNvbnRleHQsIHNlcmlhbGl6ZWQsIHR5cGVvZiBmaW5hbFRhZyA9PT0gJ3N0cmluZycpO1xuICAgICAgICBjbGFzc05hbWUgKz0gY29udGV4dC5rZXkgKyBcIi1cIiArIHNlcmlhbGl6ZWQubmFtZTtcblxuICAgICAgICBpZiAodGFyZ2V0Q2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjbGFzc05hbWUgKz0gXCIgXCIgKyB0YXJnZXRDbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmluYWxTaG91bGRGb3J3YXJkUHJvcCA9IHNob3VsZFVzZUFzICYmIHNob3VsZEZvcndhcmRQcm9wID09PSB1bmRlZmluZWQgPyBnZXREZWZhdWx0U2hvdWxkRm9yd2FyZFByb3AoZmluYWxUYWcpIDogZGVmYXVsdFNob3VsZEZvcndhcmRQcm9wO1xuICAgICAgICB2YXIgbmV3UHJvcHMgPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBfa2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgaWYgKHNob3VsZFVzZUFzICYmIF9rZXkgPT09ICdhcycpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKCAvLyAkRmxvd0ZpeE1lXG4gICAgICAgICAgZmluYWxTaG91bGRGb3J3YXJkUHJvcChfa2V5KSkge1xuICAgICAgICAgICAgbmV3UHJvcHNbX2tleV0gPSBwcm9wc1tfa2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZXdQcm9wcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIG5ld1Byb3BzLnJlZiA9IHJlZiB8fCBwcm9wcy5pbm5lclJlZjtcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBwcm9wcy5pbm5lclJlZikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Bpbm5lclJlZmAgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIG1ham9yIHZlcnNpb24gb2YgRW1vdGlvbiwgcGxlYXNlIHVzZSB0aGUgYHJlZmAgcHJvcCBpbnN0ZWFkJyArIChpZGVudGlmaWVyTmFtZSA9PT0gdW5kZWZpbmVkID8gJycgOiBcIiBpbiB0aGUgdXNhZ2Ugb2YgYFwiICsgaWRlbnRpZmllck5hbWUgKyBcImBcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZSA9IGNyZWF0ZUVsZW1lbnQoZmluYWxUYWcsIG5ld1Byb3BzKTtcblxuICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgU3R5bGVkLmRpc3BsYXlOYW1lID0gaWRlbnRpZmllck5hbWUgIT09IHVuZGVmaW5lZCA/IGlkZW50aWZpZXJOYW1lIDogXCJTdHlsZWQoXCIgKyAodHlwZW9mIGJhc2VUYWcgPT09ICdzdHJpbmcnID8gYmFzZVRhZyA6IGJhc2VUYWcuZGlzcGxheU5hbWUgfHwgYmFzZVRhZy5uYW1lIHx8ICdDb21wb25lbnQnKSArIFwiKVwiO1xuICAgIFN0eWxlZC5kZWZhdWx0UHJvcHMgPSB0YWcuZGVmYXVsdFByb3BzO1xuICAgIFN0eWxlZC5fX2Vtb3Rpb25fcmVhbCA9IFN0eWxlZDtcbiAgICBTdHlsZWQuX19lbW90aW9uX2Jhc2UgPSBiYXNlVGFnO1xuICAgIFN0eWxlZC5fX2Vtb3Rpb25fc3R5bGVzID0gc3R5bGVzO1xuICAgIFN0eWxlZC5fX2Vtb3Rpb25fZm9yd2FyZFByb3AgPSBzaG91bGRGb3J3YXJkUHJvcDtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3R5bGVkLCAndG9TdHJpbmcnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgICAgIGlmICh0YXJnZXRDbGFzc05hbWUgPT09IHVuZGVmaW5lZCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuICdOT19DT01QT05FTlRfU0VMRUNUT1InO1xuICAgICAgICB9IC8vICRGbG93Rml4TWU6IGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG5cblxuICAgICAgICByZXR1cm4gXCIuXCIgKyB0YXJnZXRDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBTdHlsZWQud2l0aENvbXBvbmVudCA9IGZ1bmN0aW9uIChuZXh0VGFnLCBuZXh0T3B0aW9ucykge1xuICAgICAgcmV0dXJuIGNyZWF0ZVN0eWxlZChuZXh0VGFnLCBuZXh0T3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucyB8fCB7fSwge30sIG5leHRPcHRpb25zKSA6IG9wdGlvbnMpLmFwcGx5KHZvaWQgMCwgc3R5bGVzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0eWxlZDtcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0eWxlZDtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkLWJhc2UnO1xuXG52YXIgdGFncyA9IFsnYScsICdhYmJyJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmFzZScsICdiZGknLCAnYmRvJywgJ2JpZycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpdicsICdkbCcsICdkdCcsICdlbScsICdlbWJlZCcsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2lmcmFtZScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdrZXlnZW4nLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ2xpbmsnLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdtZXRlcicsICduYXYnLCAnbm9zY3JpcHQnLCAnb2JqZWN0JywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwYXJhbScsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NjcmlwdCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhbicsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndGl0bGUnLCAndHInLCAndHJhY2snLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJywgLy8gU1ZHXG4nY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2RlZnMnLCAnZWxsaXBzZScsICdmb3JlaWduT2JqZWN0JywgJ2cnLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJHcmFkaWVudCcsICdtYXNrJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbEdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdmcnLCAndGV4dCcsICd0c3BhbiddO1xuXG52YXIgbmV3U3R5bGVkID0gc3R5bGVkLmJpbmQoKTtcbnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnTmFtZSkge1xuICBuZXdTdHlsZWRbdGFnTmFtZV0gPSBuZXdTdHlsZWQodGFnTmFtZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3U3R5bGVkO1xuIiwiZnVuY3Rpb24gc3R5bGlzX21pbiAoVykge1xuICBmdW5jdGlvbiBNKGQsIGMsIGUsIGgsIGEpIHtcbiAgICBmb3IgKHZhciBtID0gMCwgYiA9IDAsIHYgPSAwLCBuID0gMCwgcSwgZywgeCA9IDAsIEsgPSAwLCBrLCB1ID0gayA9IHEgPSAwLCBsID0gMCwgciA9IDAsIEkgPSAwLCB0ID0gMCwgQiA9IGUubGVuZ3RoLCBKID0gQiAtIDEsIHksIGYgPSAnJywgcCA9ICcnLCBGID0gJycsIEcgPSAnJywgQzsgbCA8IEI7KSB7XG4gICAgICBnID0gZS5jaGFyQ29kZUF0KGwpO1xuICAgICAgbCA9PT0gSiAmJiAwICE9PSBiICsgbiArIHYgKyBtICYmICgwICE9PSBiICYmIChnID0gNDcgPT09IGIgPyAxMCA6IDQ3KSwgbiA9IHYgPSBtID0gMCwgQisrLCBKKyspO1xuXG4gICAgICBpZiAoMCA9PT0gYiArIG4gKyB2ICsgbSkge1xuICAgICAgICBpZiAobCA9PT0gSiAmJiAoMCA8IHIgJiYgKGYgPSBmLnJlcGxhY2UoTiwgJycpKSwgMCA8IGYudHJpbSgpLmxlbmd0aCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBmICs9IGUuY2hhckF0KGwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGcgPSA1OTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgIGNhc2UgMTIzOlxuICAgICAgICAgICAgZiA9IGYudHJpbSgpO1xuICAgICAgICAgICAgcSA9IGYuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIGsgPSAxO1xuXG4gICAgICAgICAgICBmb3IgKHQgPSArK2w7IGwgPCBCOykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGcgPSBlLmNoYXJDb2RlQXQobCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEyMzpcbiAgICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgICAgICAgICAgICBrLS07XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICBzd2l0Y2ggKGcgPSBlLmNoYXJDb2RlQXQobCArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh1ID0gbCArIDE7IHUgPCBKOyArK3UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlLmNoYXJDb2RlQXQodSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDQyID09PSBnICYmIDQyID09PSBlLmNoYXJDb2RlQXQodSAtIDEpICYmIGwgKyAyICE9PSB1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDQ3ID09PSBnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGwgPSB1O1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICAgICAgICBnKys7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgZysrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgZm9yICg7IGwrKyA8IEogJiYgZS5jaGFyQ29kZUF0KGwpICE9PSBnOykge1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoMCA9PT0gaykgYnJlYWs7XG4gICAgICAgICAgICAgIGwrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgayA9IGUuc3Vic3RyaW5nKHQsIGwpO1xuICAgICAgICAgICAgMCA9PT0gcSAmJiAocSA9IChmID0gZi5yZXBsYWNlKGNhLCAnJykudHJpbSgpKS5jaGFyQ29kZUF0KDApKTtcblxuICAgICAgICAgICAgc3dpdGNoIChxKSB7XG4gICAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgICAgMCA8IHIgJiYgKGYgPSBmLnJlcGxhY2UoTiwgJycpKTtcbiAgICAgICAgICAgICAgICBnID0gZi5jaGFyQ29kZUF0KDEpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwMDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA5OlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICByID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHIgPSBPO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGsgPSBNKGMsIHIsIGssIGcsIGEgKyAxKTtcbiAgICAgICAgICAgICAgICB0ID0gay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgMCA8IEEgJiYgKHIgPSBYKE8sIGYsIEkpLCBDID0gSCgzLCBrLCByLCBjLCBELCB6LCB0LCBnLCBhLCBoKSwgZiA9IHIuam9pbignJyksIHZvaWQgMCAhPT0gQyAmJiAwID09PSAodCA9IChrID0gQy50cmltKCkpLmxlbmd0aCkgJiYgKGcgPSAwLCBrID0gJycpKTtcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHQpIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgICAgIGYgPSBmLnJlcGxhY2UoZGEsIGVhKTtcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwOTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIGsgPSBmICsgJ3snICsgayArICd9JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA3OlxuICAgICAgICAgICAgICAgICAgICBmID0gZi5yZXBsYWNlKGZhLCAnJDEgJDInKTtcbiAgICAgICAgICAgICAgICAgICAgayA9IGYgKyAneycgKyBrICsgJ30nO1xuICAgICAgICAgICAgICAgICAgICBrID0gMSA9PT0gdyB8fCAyID09PSB3ICYmIEwoJ0AnICsgaywgMykgPyAnQC13ZWJraXQtJyArIGsgKyAnQCcgKyBrIDogJ0AnICsgaztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGsgPSBmICsgaywgMTEyID09PSBoICYmIChrID0gKHAgKz0gaywgJycpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgayA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgayA9IE0oYywgWChjLCBmLCBJKSwgaywgaCwgYSArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGICs9IGs7XG4gICAgICAgICAgICBrID0gSSA9IHIgPSB1ID0gcSA9IDA7XG4gICAgICAgICAgICBmID0gJyc7XG4gICAgICAgICAgICBnID0gZS5jaGFyQ29kZUF0KCsrbCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgICBmID0gKDAgPCByID8gZi5yZXBsYWNlKE4sICcnKSA6IGYpLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICgxIDwgKHQgPSBmLmxlbmd0aCkpIHN3aXRjaCAoMCA9PT0gdSAmJiAocSA9IGYuY2hhckNvZGVBdCgwKSwgNDUgPT09IHEgfHwgOTYgPCBxICYmIDEyMyA+IHEpICYmICh0ID0gKGYgPSBmLnJlcGxhY2UoJyAnLCAnOicpKS5sZW5ndGgpLCAwIDwgQSAmJiB2b2lkIDAgIT09IChDID0gSCgxLCBmLCBjLCBkLCBELCB6LCBwLmxlbmd0aCwgaCwgYSwgaCkpICYmIDAgPT09ICh0ID0gKGYgPSBDLnRyaW0oKSkubGVuZ3RoKSAmJiAoZiA9ICdcXHgwMFxceDAwJyksIHEgPSBmLmNoYXJDb2RlQXQoMCksIGcgPSBmLmNoYXJDb2RlQXQoMSksIHEpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgICAgaWYgKDEwNSA9PT0gZyB8fCA5OSA9PT0gZykge1xuICAgICAgICAgICAgICAgICAgRyArPSBmICsgZS5jaGFyQXQobCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICA1OCAhPT0gZi5jaGFyQ29kZUF0KHQgLSAxKSAmJiAocCArPSBQKGYsIHEsIGcsIGYuY2hhckNvZGVBdCgyKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSSA9IHIgPSB1ID0gcSA9IDA7XG4gICAgICAgICAgICBmID0gJyc7XG4gICAgICAgICAgICBnID0gZS5jaGFyQ29kZUF0KCsrbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgNDcgPT09IGIgPyBiID0gMCA6IDAgPT09IDEgKyBxICYmIDEwNyAhPT0gaCAmJiAwIDwgZi5sZW5ndGggJiYgKHIgPSAxLCBmICs9ICdcXHgwMCcpO1xuICAgICAgICAgIDAgPCBBICogWSAmJiBIKDAsIGYsIGMsIGQsIEQsIHosIHAubGVuZ3RoLCBoLCBhLCBoKTtcbiAgICAgICAgICB6ID0gMTtcbiAgICAgICAgICBEKys7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA1OTpcbiAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgICAgaWYgKDAgPT09IGIgKyBuICsgdiArIG0pIHtcbiAgICAgICAgICAgIHorKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHorKztcbiAgICAgICAgICB5ID0gZS5jaGFyQXQobCk7XG5cbiAgICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgIGlmICgwID09PSBuICsgbSArIGIpIHN3aXRjaCAoeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgY2FzZSA1ODpcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgIHkgPSAnJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIDMyICE9PSBnICYmICh5ID0gJyAnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB5ID0gJ1xcXFwwJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgIHkgPSAnXFxcXGYnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgeSA9ICdcXFxcdic7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgKHIgPSBJID0gMSwgeSA9ICdcXGYnICsgeSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDEwODpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IG4gKyBiICsgbSArIEUgJiYgMCA8IHUpIHN3aXRjaCAobCAtIHUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAxMTIgPT09IHggJiYgNTggPT09IGUuY2hhckNvZGVBdChsIC0gMykgJiYgKEUgPSB4KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgIDExMSA9PT0gSyAmJiAoRSA9IEspO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgKHUgPSBsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDQ6XG4gICAgICAgICAgICAgIDAgPT09IGIgKyB2ICsgbiArIG0gJiYgKHIgPSAxLCB5ICs9ICdcXHInKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAwID09PSBiICYmIChuID0gbiA9PT0gZyA/IDAgOiAwID09PSBuID8gZyA6IG4pO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA5MTpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyB2ICYmIG0rKztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgOTM6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgdiAmJiBtLS07XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQxOlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIG0gJiYgdi0tO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IG4gKyBiICsgbSkge1xuICAgICAgICAgICAgICAgIGlmICgwID09PSBxKSBzd2l0Y2ggKDIgKiB4ICsgMyAqIEspIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgNTMzOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYrKztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAwID09PSBiICsgdiArIG4gKyBtICsgdSArIGsgJiYgKGsgPSAxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICBpZiAoISgwIDwgbiArIG0gKyB2KSkgc3dpdGNoIChiKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoICgyICogZyArIDMgKiBlLmNoYXJDb2RlQXQobCArIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjM1OlxuICAgICAgICAgICAgICAgICAgICAgIGIgPSA0NztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIDIyMDpcbiAgICAgICAgICAgICAgICAgICAgICB0ID0gbCwgYiA9IDQyO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDI6XG4gICAgICAgICAgICAgICAgICA0NyA9PT0gZyAmJiA0MiA9PT0geCAmJiB0ICsgMiAhPT0gbCAmJiAoMzMgPT09IGUuY2hhckNvZGVBdCh0ICsgMikgJiYgKHAgKz0gZS5zdWJzdHJpbmcodCwgbCArIDEpKSwgeSA9ICcnLCBiID0gMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAwID09PSBiICYmIChmICs9IHkpO1xuICAgICAgfVxuXG4gICAgICBLID0geDtcbiAgICAgIHggPSBnO1xuICAgICAgbCsrO1xuICAgIH1cblxuICAgIHQgPSBwLmxlbmd0aDtcblxuICAgIGlmICgwIDwgdCkge1xuICAgICAgciA9IGM7XG4gICAgICBpZiAoMCA8IEEgJiYgKEMgPSBIKDIsIHAsIHIsIGQsIEQsIHosIHQsIGgsIGEsIGgpLCB2b2lkIDAgIT09IEMgJiYgMCA9PT0gKHAgPSBDKS5sZW5ndGgpKSByZXR1cm4gRyArIHAgKyBGO1xuICAgICAgcCA9IHIuam9pbignLCcpICsgJ3snICsgcCArICd9JztcblxuICAgICAgaWYgKDAgIT09IHcgKiBFKSB7XG4gICAgICAgIDIgIT09IHcgfHwgTChwLCAyKSB8fCAoRSA9IDApO1xuXG4gICAgICAgIHN3aXRjaCAoRSkge1xuICAgICAgICAgIGNhc2UgMTExOlxuICAgICAgICAgICAgcCA9IHAucmVwbGFjZShoYSwgJzotbW96LSQxJykgKyBwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDExMjpcbiAgICAgICAgICAgIHAgPSBwLnJlcGxhY2UoUSwgJzo6LXdlYmtpdC1pbnB1dC0kMScpICsgcC5yZXBsYWNlKFEsICc6Oi1tb3otJDEnKSArIHAucmVwbGFjZShRLCAnOi1tcy1pbnB1dC0kMScpICsgcDtcbiAgICAgICAgfVxuXG4gICAgICAgIEUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBHICsgcCArIEY7XG4gIH1cblxuICBmdW5jdGlvbiBYKGQsIGMsIGUpIHtcbiAgICB2YXIgaCA9IGMudHJpbSgpLnNwbGl0KGlhKTtcbiAgICBjID0gaDtcbiAgICB2YXIgYSA9IGgubGVuZ3RoLFxuICAgICAgICBtID0gZC5sZW5ndGg7XG5cbiAgICBzd2l0Y2ggKG0pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdmFyIGIgPSAwO1xuXG4gICAgICAgIGZvciAoZCA9IDAgPT09IG0gPyAnJyA6IGRbMF0gKyAnICc7IGIgPCBhOyArK2IpIHtcbiAgICAgICAgICBjW2JdID0gWihkLCBjW2JdLCBlKS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHYgPSBiID0gMDtcblxuICAgICAgICBmb3IgKGMgPSBbXTsgYiA8IGE7ICsrYikge1xuICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbTsgKytuKSB7XG4gICAgICAgICAgICBjW3YrK10gPSBaKGRbbl0gKyAnICcsIGhbYl0sIGUpLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBjO1xuICB9XG5cbiAgZnVuY3Rpb24gWihkLCBjLCBlKSB7XG4gICAgdmFyIGggPSBjLmNoYXJDb2RlQXQoMCk7XG4gICAgMzMgPiBoICYmIChoID0gKGMgPSBjLnRyaW0oKSkuY2hhckNvZGVBdCgwKSk7XG5cbiAgICBzd2l0Y2ggKGgpIHtcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHJldHVybiBjLnJlcGxhY2UoRiwgJyQxJyArIGQudHJpbSgpKTtcblxuICAgICAgY2FzZSA1ODpcbiAgICAgICAgcmV0dXJuIGQudHJpbSgpICsgYy5yZXBsYWNlKEYsICckMScgKyBkLnRyaW0oKSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICgwIDwgMSAqIGUgJiYgMCA8IGMuaW5kZXhPZignXFxmJykpIHJldHVybiBjLnJlcGxhY2UoRiwgKDU4ID09PSBkLmNoYXJDb2RlQXQoMCkgPyAnJyA6ICckMScpICsgZC50cmltKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBkICsgYztcbiAgfVxuXG4gIGZ1bmN0aW9uIFAoZCwgYywgZSwgaCkge1xuICAgIHZhciBhID0gZCArICc7JyxcbiAgICAgICAgbSA9IDIgKiBjICsgMyAqIGUgKyA0ICogaDtcblxuICAgIGlmICg5NDQgPT09IG0pIHtcbiAgICAgIGQgPSBhLmluZGV4T2YoJzonLCA5KSArIDE7XG4gICAgICB2YXIgYiA9IGEuc3Vic3RyaW5nKGQsIGEubGVuZ3RoIC0gMSkudHJpbSgpO1xuICAgICAgYiA9IGEuc3Vic3RyaW5nKDAsIGQpLnRyaW0oKSArIGIgKyAnOyc7XG4gICAgICByZXR1cm4gMSA9PT0gdyB8fCAyID09PSB3ICYmIEwoYiwgMSkgPyAnLXdlYmtpdC0nICsgYiArIGIgOiBiO1xuICAgIH1cblxuICAgIGlmICgwID09PSB3IHx8IDIgPT09IHcgJiYgIUwoYSwgMSkpIHJldHVybiBhO1xuXG4gICAgc3dpdGNoIChtKSB7XG4gICAgICBjYXNlIDEwMTU6XG4gICAgICAgIHJldHVybiA5NyA9PT0gYS5jaGFyQ29kZUF0KDEwKSA/ICctd2Via2l0LScgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTUxOlxuICAgICAgICByZXR1cm4gMTE2ID09PSBhLmNoYXJDb2RlQXQoMykgPyAnLXdlYmtpdC0nICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDk2MzpcbiAgICAgICAgcmV0dXJuIDExMCA9PT0gYS5jaGFyQ29kZUF0KDUpID8gJy13ZWJraXQtJyArIGEgKyBhIDogYTtcblxuICAgICAgY2FzZSAxMDA5OlxuICAgICAgICBpZiAoMTAwICE9PSBhLmNoYXJDb2RlQXQoNCkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDk2OTpcbiAgICAgIGNhc2UgOTQyOlxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDk3ODpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tb3otJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDEwMTk6XG4gICAgICBjYXNlIDk4MzpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tb3otJyArIGEgKyAnLW1zLScgKyBhICsgYTtcblxuICAgICAgY2FzZSA4ODM6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDgpKSByZXR1cm4gJy13ZWJraXQtJyArIGEgKyBhO1xuICAgICAgICBpZiAoMCA8IGEuaW5kZXhPZignaW1hZ2Utc2V0KCcsIDExKSkgcmV0dXJuIGEucmVwbGFjZShqYSwgJyQxLXdlYmtpdC0kMicpICsgYTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTMyOlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg0KSkgc3dpdGNoIChhLmNoYXJDb2RlQXQoNSkpIHtcbiAgICAgICAgICBjYXNlIDEwMzpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC1ib3gtJyArIGEucmVwbGFjZSgnLWdyb3cnLCAnJykgKyAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGEucmVwbGFjZSgnZ3JvdycsICdwb3NpdGl2ZScpICsgYTtcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYS5yZXBsYWNlKCdzaHJpbmsnLCAnbmVnYXRpdmUnKSArIGE7XG5cbiAgICAgICAgICBjYXNlIDk4OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYS5yZXBsYWNlKCdiYXNpcycsICdwcmVmZXJyZWQtc2l6ZScpICsgYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBhICsgYTtcblxuICAgICAgY2FzZSA5NjQ6XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgMTAyMzpcbiAgICAgICAgaWYgKDk5ICE9PSBhLmNoYXJDb2RlQXQoOCkpIGJyZWFrO1xuICAgICAgICBiID0gYS5zdWJzdHJpbmcoYS5pbmRleE9mKCc6JywgMTUpKS5yZXBsYWNlKCdmbGV4LScsICcnKS5yZXBsYWNlKCdzcGFjZS1iZXR3ZWVuJywgJ2p1c3RpZnknKTtcbiAgICAgICAgcmV0dXJuICctd2Via2l0LWJveC1wYWNrJyArIGIgKyAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC1wYWNrJyArIGIgKyBhO1xuXG4gICAgICBjYXNlIDEwMDU6XG4gICAgICAgIHJldHVybiBrYS50ZXN0KGEpID8gYS5yZXBsYWNlKGFhLCAnOi13ZWJraXQtJykgKyBhLnJlcGxhY2UoYWEsICc6LW1vei0nKSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDFlMzpcbiAgICAgICAgYiA9IGEuc3Vic3RyaW5nKDEzKS50cmltKCk7XG4gICAgICAgIGMgPSBiLmluZGV4T2YoJy0nKSArIDE7XG5cbiAgICAgICAgc3dpdGNoIChiLmNoYXJDb2RlQXQoMCkgKyBiLmNoYXJDb2RlQXQoYykpIHtcbiAgICAgICAgICBjYXNlIDIyNjpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgJ3RiJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjMyOlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCAndGItcmwnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMjA6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsICdscicpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBiICsgYTtcblxuICAgICAgY2FzZSAxMDE3OlxuICAgICAgICBpZiAoLTEgPT09IGEuaW5kZXhPZignc3RpY2t5JywgOSkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDk3NTpcbiAgICAgICAgYyA9IChhID0gZCkubGVuZ3RoIC0gMTA7XG4gICAgICAgIGIgPSAoMzMgPT09IGEuY2hhckNvZGVBdChjKSA/IGEuc3Vic3RyaW5nKDAsIGMpIDogYSkuc3Vic3RyaW5nKGQuaW5kZXhPZignOicsIDcpICsgMSkudHJpbSgpO1xuXG4gICAgICAgIHN3aXRjaCAobSA9IGIuY2hhckNvZGVBdCgwKSArIChiLmNoYXJDb2RlQXQoNykgfCAwKSkge1xuICAgICAgICAgIGNhc2UgMjAzOlxuICAgICAgICAgICAgaWYgKDExMSA+IGIuY2hhckNvZGVBdCg4KSkgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UoYiwgJy13ZWJraXQtJyArIGIpICsgJzsnICsgYTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMDc6XG4gICAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgICBhID0gYS5yZXBsYWNlKGIsICctd2Via2l0LScgKyAoMTAyIDwgbSA/ICdpbmxpbmUtJyA6ICcnKSArICdib3gnKSArICc7JyArIGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgYikgKyAnOycgKyBhLnJlcGxhY2UoYiwgJy1tcy0nICsgYiArICdib3gnKSArICc7JyArIGE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYSArICc7JztcblxuICAgICAgY2FzZSA5Mzg6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDUpKSBzd2l0Y2ggKGEuY2hhckNvZGVBdCg2KSkge1xuICAgICAgICAgIGNhc2UgMTA1OlxuICAgICAgICAgICAgcmV0dXJuIGIgPSBhLnJlcGxhY2UoJy1pdGVtcycsICcnKSwgJy13ZWJraXQtJyArIGEgKyAnLXdlYmtpdC1ib3gtJyArIGIgKyAnLW1zLWZsZXgtJyArIGIgKyBhO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLWZsZXgtaXRlbS0nICsgYS5yZXBsYWNlKGJhLCAnJykgKyBhO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC1saW5lLXBhY2snICsgYS5yZXBsYWNlKCdhbGlnbi1jb250ZW50JywgJycpLnJlcGxhY2UoYmEsICcnKSArIGE7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTczOlxuICAgICAgY2FzZSA5ODk6XG4gICAgICAgIGlmICg0NSAhPT0gYS5jaGFyQ29kZUF0KDMpIHx8IDEyMiA9PT0gYS5jaGFyQ29kZUF0KDQpKSBicmVhaztcblxuICAgICAgY2FzZSA5MzE6XG4gICAgICBjYXNlIDk1MzpcbiAgICAgICAgaWYgKCEwID09PSBsYS50ZXN0KGQpKSByZXR1cm4gMTE1ID09PSAoYiA9IGQuc3Vic3RyaW5nKGQuaW5kZXhPZignOicpICsgMSkpLmNoYXJDb2RlQXQoMCkgPyBQKGQucmVwbGFjZSgnc3RyZXRjaCcsICdmaWxsLWF2YWlsYWJsZScpLCBjLCBlLCBoKS5yZXBsYWNlKCc6ZmlsbC1hdmFpbGFibGUnLCAnOnN0cmV0Y2gnKSA6IGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgYikgKyBhLnJlcGxhY2UoYiwgJy1tb3otJyArIGIucmVwbGFjZSgnZmlsbC0nLCAnJykpICsgYTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTYyOlxuICAgICAgICBpZiAoYSA9ICctd2Via2l0LScgKyBhICsgKDEwMiA9PT0gYS5jaGFyQ29kZUF0KDUpID8gJy1tcy0nICsgYSA6ICcnKSArIGEsIDIxMSA9PT0gZSArIGggJiYgMTA1ID09PSBhLmNoYXJDb2RlQXQoMTMpICYmIDAgPCBhLmluZGV4T2YoJ3RyYW5zZm9ybScsIDEwKSkgcmV0dXJuIGEuc3Vic3RyaW5nKDAsIGEuaW5kZXhPZignOycsIDI3KSArIDEpLnJlcGxhY2UobWEsICckMS13ZWJraXQtJDInKSArIGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICBmdW5jdGlvbiBMKGQsIGMpIHtcbiAgICB2YXIgZSA9IGQuaW5kZXhPZigxID09PSBjID8gJzonIDogJ3snKSxcbiAgICAgICAgaCA9IGQuc3Vic3RyaW5nKDAsIDMgIT09IGMgPyBlIDogMTApO1xuICAgIGUgPSBkLnN1YnN0cmluZyhlICsgMSwgZC5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gUigyICE9PSBjID8gaCA6IGgucmVwbGFjZShuYSwgJyQxJyksIGUsIGMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWEoZCwgYykge1xuICAgIHZhciBlID0gUChjLCBjLmNoYXJDb2RlQXQoMCksIGMuY2hhckNvZGVBdCgxKSwgYy5jaGFyQ29kZUF0KDIpKTtcbiAgICByZXR1cm4gZSAhPT0gYyArICc7JyA/IGUucmVwbGFjZShvYSwgJyBvciAoJDEpJykuc3Vic3RyaW5nKDQpIDogJygnICsgYyArICcpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIEgoZCwgYywgZSwgaCwgYSwgbSwgYiwgdiwgbiwgcSkge1xuICAgIGZvciAodmFyIGcgPSAwLCB4ID0gYywgdzsgZyA8IEE7ICsrZykge1xuICAgICAgc3dpdGNoICh3ID0gU1tnXS5jYWxsKEIsIGQsIHgsIGUsIGgsIGEsIG0sIGIsIHYsIG4sIHEpKSB7XG4gICAgICAgIGNhc2Ugdm9pZCAwOlxuICAgICAgICBjYXNlICExOlxuICAgICAgICBjYXNlICEwOlxuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB4ID0gdztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoeCAhPT0gYykgcmV0dXJuIHg7XG4gIH1cblxuICBmdW5jdGlvbiBUKGQpIHtcbiAgICBzd2l0Y2ggKGQpIHtcbiAgICAgIGNhc2Ugdm9pZCAwOlxuICAgICAgY2FzZSBudWxsOlxuICAgICAgICBBID0gUy5sZW5ndGggPSAwO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBkKSBTW0ErK10gPSBkO2Vsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgZCkgZm9yICh2YXIgYyA9IDAsIGUgPSBkLmxlbmd0aDsgYyA8IGU7ICsrYykge1xuICAgICAgICAgIFQoZFtjXSk7XG4gICAgICAgIH0gZWxzZSBZID0gISFkIHwgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gVDtcbiAgfVxuXG4gIGZ1bmN0aW9uIFUoZCkge1xuICAgIGQgPSBkLnByZWZpeDtcbiAgICB2b2lkIDAgIT09IGQgJiYgKFIgPSBudWxsLCBkID8gJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGQgPyB3ID0gMSA6ICh3ID0gMiwgUiA9IGQpIDogdyA9IDApO1xuICAgIHJldHVybiBVO1xuICB9XG5cbiAgZnVuY3Rpb24gQihkLCBjKSB7XG4gICAgdmFyIGUgPSBkO1xuICAgIDMzID4gZS5jaGFyQ29kZUF0KDApICYmIChlID0gZS50cmltKCkpO1xuICAgIFYgPSBlO1xuICAgIGUgPSBbVl07XG5cbiAgICBpZiAoMCA8IEEpIHtcbiAgICAgIHZhciBoID0gSCgtMSwgYywgZSwgZSwgRCwgeiwgMCwgMCwgMCwgMCk7XG4gICAgICB2b2lkIDAgIT09IGggJiYgJ3N0cmluZycgPT09IHR5cGVvZiBoICYmIChjID0gaCk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBNKE8sIGUsIGMsIDAsIDApO1xuICAgIDAgPCBBICYmIChoID0gSCgtMiwgYSwgZSwgZSwgRCwgeiwgYS5sZW5ndGgsIDAsIDAsIDApLCB2b2lkIDAgIT09IGggJiYgKGEgPSBoKSk7XG4gICAgViA9ICcnO1xuICAgIEUgPSAwO1xuICAgIHogPSBEID0gMTtcbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIHZhciBjYSA9IC9eXFwwKy9nLFxuICAgICAgTiA9IC9bXFwwXFxyXFxmXS9nLFxuICAgICAgYWEgPSAvOiAqL2csXG4gICAgICBrYSA9IC96b298Z3JhLyxcbiAgICAgIG1hID0gLyhbLDogXSkodHJhbnNmb3JtKS9nLFxuICAgICAgaWEgPSAvLFxccis/L2csXG4gICAgICBGID0gLyhbXFx0XFxyXFxuIF0pKlxcZj8mL2csXG4gICAgICBmYSA9IC9AKGtcXHcrKVxccyooXFxTKilcXHMqLyxcbiAgICAgIFEgPSAvOjoocGxhY2UpL2csXG4gICAgICBoYSA9IC86KHJlYWQtb25seSkvZyxcbiAgICAgIEcgPSAvW3N2aF1cXHcrLVt0YmxyXXsyfS8sXG4gICAgICBkYSA9IC9cXChcXHMqKC4qKVxccypcXCkvZyxcbiAgICAgIG9hID0gLyhbXFxzXFxTXSo/KTsvZyxcbiAgICAgIGJhID0gLy1zZWxmfGZsZXgtL2csXG4gICAgICBuYSA9IC9bXl0qPyg6W3JwXVtlbF1hW1xcdy1dKylbXl0qLyxcbiAgICAgIGxhID0gL3N0cmV0Y2h8OlxccypcXHcrXFwtKD86Y29udGV8YXZhaWwpLyxcbiAgICAgIGphID0gLyhbXi1dKShpbWFnZS1zZXRcXCgpLyxcbiAgICAgIHogPSAxLFxuICAgICAgRCA9IDEsXG4gICAgICBFID0gMCxcbiAgICAgIHcgPSAxLFxuICAgICAgTyA9IFtdLFxuICAgICAgUyA9IFtdLFxuICAgICAgQSA9IDAsXG4gICAgICBSID0gbnVsbCxcbiAgICAgIFkgPSAwLFxuICAgICAgViA9ICcnO1xuICBCLnVzZSA9IFQ7XG4gIEIuc2V0ID0gVTtcbiAgdm9pZCAwICE9PSBXICYmIFUoVyk7XG4gIHJldHVybiBCO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsaXNfbWluO1xuIiwidmFyIHVuaXRsZXNzS2V5cyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IDEsXG4gIGJvcmRlckltYWdlT3V0c2V0OiAxLFxuICBib3JkZXJJbWFnZVNsaWNlOiAxLFxuICBib3JkZXJJbWFnZVdpZHRoOiAxLFxuICBib3hGbGV4OiAxLFxuICBib3hGbGV4R3JvdXA6IDEsXG4gIGJveE9yZGluYWxHcm91cDogMSxcbiAgY29sdW1uQ291bnQ6IDEsXG4gIGNvbHVtbnM6IDEsXG4gIGZsZXg6IDEsXG4gIGZsZXhHcm93OiAxLFxuICBmbGV4UG9zaXRpdmU6IDEsXG4gIGZsZXhTaHJpbms6IDEsXG4gIGZsZXhOZWdhdGl2ZTogMSxcbiAgZmxleE9yZGVyOiAxLFxuICBncmlkUm93OiAxLFxuICBncmlkUm93RW5kOiAxLFxuICBncmlkUm93U3BhbjogMSxcbiAgZ3JpZFJvd1N0YXJ0OiAxLFxuICBncmlkQ29sdW1uOiAxLFxuICBncmlkQ29sdW1uRW5kOiAxLFxuICBncmlkQ29sdW1uU3BhbjogMSxcbiAgZ3JpZENvbHVtblN0YXJ0OiAxLFxuICBtc0dyaWRSb3c6IDEsXG4gIG1zR3JpZFJvd1NwYW46IDEsXG4gIG1zR3JpZENvbHVtbjogMSxcbiAgbXNHcmlkQ29sdW1uU3BhbjogMSxcbiAgZm9udFdlaWdodDogMSxcbiAgbGluZUhlaWdodDogMSxcbiAgb3BhY2l0eTogMSxcbiAgb3JkZXI6IDEsXG4gIG9ycGhhbnM6IDEsXG4gIHRhYlNpemU6IDEsXG4gIHdpZG93czogMSxcbiAgekluZGV4OiAxLFxuICB6b29tOiAxLFxuICBXZWJraXRMaW5lQ2xhbXA6IDEsXG4gIC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcbiAgZmlsbE9wYWNpdHk6IDEsXG4gIGZsb29kT3BhY2l0eTogMSxcbiAgc3RvcE9wYWNpdHk6IDEsXG4gIHN0cm9rZURhc2hhcnJheTogMSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogMSxcbiAgc3Ryb2tlTWl0ZXJsaW1pdDogMSxcbiAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgc3Ryb2tlV2lkdGg6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVuaXRsZXNzS2V5cztcbiIsInZhciBpc0Jyb3dzZXIgPSBcIm9iamVjdFwiICE9PSAndW5kZWZpbmVkJztcbmZ1bmN0aW9uIGdldFJlZ2lzdGVyZWRTdHlsZXMocmVnaXN0ZXJlZCwgcmVnaXN0ZXJlZFN0eWxlcywgY2xhc3NOYW1lcykge1xuICB2YXIgcmF3Q2xhc3NOYW1lID0gJyc7XG4gIGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICBpZiAocmVnaXN0ZXJlZFtjbGFzc05hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlZ2lzdGVyZWRTdHlsZXMucHVzaChyZWdpc3RlcmVkW2NsYXNzTmFtZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXdDbGFzc05hbWUgKz0gY2xhc3NOYW1lICsgXCIgXCI7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJhd0NsYXNzTmFtZTtcbn1cbnZhciBpbnNlcnRTdHlsZXMgPSBmdW5jdGlvbiBpbnNlcnRTdHlsZXMoY2FjaGUsIHNlcmlhbGl6ZWQsIGlzU3RyaW5nVGFnKSB7XG4gIHZhciBjbGFzc05hbWUgPSBjYWNoZS5rZXkgKyBcIi1cIiArIHNlcmlhbGl6ZWQubmFtZTtcblxuICBpZiAoIC8vIHdlIG9ubHkgbmVlZCB0byBhZGQgdGhlIHN0eWxlcyB0byB0aGUgcmVnaXN0ZXJlZCBjYWNoZSBpZiB0aGVcbiAgLy8gY2xhc3MgbmFtZSBjb3VsZCBiZSB1c2VkIGZ1cnRoZXIgZG93blxuICAvLyB0aGUgdHJlZSBidXQgaWYgaXQncyBhIHN0cmluZyB0YWcsIHdlIGtub3cgaXQgd29uJ3RcbiAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byBhZGQgaXQgdG8gcmVnaXN0ZXJlZCBjYWNoZS5cbiAgLy8gdGhpcyBpbXByb3ZlcyBtZW1vcnkgdXNhZ2Ugc2luY2Ugd2UgY2FuIGF2b2lkIHN0b3JpbmcgdGhlIHdob2xlIHN0eWxlIHN0cmluZ1xuICAoaXNTdHJpbmdUYWcgPT09IGZhbHNlIHx8IC8vIHdlIG5lZWQgdG8gYWx3YXlzIHN0b3JlIGl0IGlmIHdlJ3JlIGluIGNvbXBhdCBtb2RlIGFuZFxuICAvLyBpbiBub2RlIHNpbmNlIGVtb3Rpb24tc2VydmVyIHJlbGllcyBvbiB3aGV0aGVyIGEgc3R5bGUgaXMgaW5cbiAgLy8gdGhlIHJlZ2lzdGVyZWQgY2FjaGUgdG8ga25vdyB3aGV0aGVyIGEgc3R5bGUgaXMgZ2xvYmFsIG9yIG5vdFxuICAvLyBhbHNvLCBub3RlIHRoYXQgdGhpcyBjaGVjayB3aWxsIGJlIGRlYWQgY29kZSBlbGltaW5hdGVkIGluIHRoZSBicm93c2VyXG4gIGlzQnJvd3NlciA9PT0gZmFsc2UgJiYgY2FjaGUuY29tcGF0ICE9PSB1bmRlZmluZWQpICYmIGNhY2hlLnJlZ2lzdGVyZWRbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FjaGUucmVnaXN0ZXJlZFtjbGFzc05hbWVdID0gc2VyaWFsaXplZC5zdHlsZXM7XG4gIH1cblxuICBpZiAoY2FjaGUuaW5zZXJ0ZWRbc2VyaWFsaXplZC5uYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBzZXJpYWxpemVkO1xuXG4gICAgZG8ge1xuICAgICAgdmFyIG1heWJlU3R5bGVzID0gY2FjaGUuaW5zZXJ0KFwiLlwiICsgY2xhc3NOYW1lLCBjdXJyZW50LCBjYWNoZS5zaGVldCwgdHJ1ZSk7XG5cbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgfSB3aGlsZSAoY3VycmVudCAhPT0gdW5kZWZpbmVkKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0UmVnaXN0ZXJlZFN0eWxlcywgaW5zZXJ0U3R5bGVzIH07XG4iLCJ2YXIgd2Vha01lbW9pemUgPSBmdW5jdGlvbiB3ZWFrTWVtb2l6ZShmdW5jKSB7XG4gIC8vICRGbG93Rml4TWUgZmxvdyBkb2Vzbid0IGluY2x1ZGUgYWxsIG5vbi1wcmltaXRpdmUgdHlwZXMgYXMgYWxsb3dlZCBmb3Igd2Vha21hcHNcbiAgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAoY2FjaGUuaGFzKGFyZykpIHtcbiAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoYXJnKTtcbiAgICB9XG5cbiAgICB2YXIgcmV0ID0gZnVuYyhhcmcpO1xuICAgIGNhY2hlLnNldChhcmcsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdlYWtNZW1vaXplO1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnZW1vdGlvbi10aGVtaW5nJztcclxuaW1wb3J0IHsgTWVzc2FnZSwgSWNvbiwgQ29udGVudCB9IGZyb20gJy4vZWxlbWVudHMnO1xyXG5pbXBvcnQgRm9ybWF0dGVkIGZyb20gJy4vbWVzc2FnZS1wYXJzZXJzL0Zvcm1hdHRlZCc7XHJcbmltcG9ydCBPYmplY3RUcmVlIGZyb20gJy4vbWVzc2FnZS1wYXJzZXJzL09iamVjdCc7XHJcbmltcG9ydCBFcnJvclBhbmVsIGZyb20gJy4vbWVzc2FnZS1wYXJzZXJzL0Vycm9yJztcclxuY2xhc3MgQ29uc29sZU1lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICh0aGVtZSkgPT4gKHtcclxuICAgICAgICAgICAgLi4udGhlbWUsXHJcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5wcm9wcy5sb2cubWV0aG9kXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2cgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFRoZW1lUHJvdmlkZXIsIHsgdGhlbWU6IHRoaXMudGhlbWUgfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlLCB7IFwiZGF0YS1tZXRob2RcIjogbG9nLm1ldGhvZCB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLCBudWxsKSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGVudCwgbnVsbCwgdGhpcy5nZXROb2RlKCkpKSkpO1xyXG4gICAgfVxyXG4gICAgZ2V0Tm9kZSgpIHtcclxuICAgICAgICBjb25zdCB7IGxvZyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyBFcnJvciBoYW5kbGluZ1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy50eXBlQ2hlY2sobG9nKTtcclxuICAgICAgICBpZiAoZXJyb3IpXHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgICAvLyBDaHJvbWUgZm9ybWF0dGluZ1xyXG4gICAgICAgIGlmIChsb2cuZGF0YS5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBsb2cuZGF0YVswXSA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgbG9nLmRhdGFbMF0uaW5kZXhPZignJScpID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybWF0dGVkLCB7IGRhdGE6IGxvZy5kYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFcnJvciBwYW5lbFxyXG4gICAgICAgIGlmIChsb2cuZGF0YS5ldmVyeShtZXNzYWdlID0+IHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykgJiZcclxuICAgICAgICAgICAgbG9nLm1ldGhvZCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChFcnJvclBhbmVsLCB7IGxvZzogbG9nIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOb3JtYWwgaW5zcGVjdG9yXHJcbiAgICAgICAgY29uc3QgcXVvdGVkID0gdHlwZW9mIGxvZy5kYXRhWzBdICE9PSAnc3RyaW5nJztcclxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RUcmVlLCB7IGxvZzogbG9nLCBxdW90ZWQ6IHF1b3RlZCB9KTtcclxuICAgIH1cclxuICAgIHR5cGVDaGVjayhsb2cpIHtcclxuICAgICAgICBpZiAoIWxvZykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybWF0dGVkLCB7IGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICBgJWNbY29uc29sZS1mZWVkXSAlY0ZhaWxlZCB0byBwYXJzZSBtZXNzYWdlISAlY2xvZyB3YXMgdHlwZW9mICR7dHlwZW9mIGxvZ30sIGJ1dCBpdCBzaG91bGQndmUgYmVlbiBhIGxvZyBvYmplY3RgLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb2xvcjogcmVkJyxcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3I6IG9yYW5nZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yOiBjeWFuJ1xyXG4gICAgICAgICAgICAgICAgXSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCEobG9nLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1hdHRlZCwgeyBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJyVjW2NvbnNvbGUtZmVlZF0gJWNGYWlsZWQgdG8gcGFyc2UgbWVzc2FnZSEgJWNsb2cuZGF0YSB3YXMgbm90IGFuIGFycmF5IScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yOiByZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb2xvcjogb3JhbmdlJyxcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3I6IGN5YW4nXHJcbiAgICAgICAgICAgICAgICBdIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENvbnNvbGVNZXNzYWdlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z6YzJGblpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMM055WXk5RGIyMXdiMjVsYm5RdlRXVnpjMkZuWlM1MGMzZ2lYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVDBGQlR5eExRVUZMTEV0QlFVc3NUVUZCVFN4UFFVRlBMRU5CUVVFN1FVRkZPVUlzVDBGQlR5eEZRVUZGTEdGQlFXRXNSVUZCUlN4TlFVRk5MR2xDUVVGcFFpeERRVUZCTzBGQlJTOURMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRmxCUVZrc1EwRkJRVHRCUVVWdVJDeFBRVUZQTEZOQlFWTXNUVUZCVFN3MlFrRkJOa0lzUTBGQlFUdEJRVU51UkN4UFFVRlBMRlZCUVZVc1RVRkJUU3d3UWtGQk1FSXNRMEZCUVR0QlFVTnFSQ3hQUVVGUExGVkJRVlVzVFVGQlRTeDVRa0ZCZVVJc1EwRkJRVHRCUVVWb1JDeE5RVUZOTEdOQlFXVXNVMEZCVVN4TFFVRkxMRU5CUVVNc1lVRkJaME03U1VGQmJrVTdPMUZCUTBVc1ZVRkJTeXhIUVVGSExFTkJRVU1zUzBGQldTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTNwQ0xFZEJRVWNzUzBGQlN6dFpRVU5TTEUxQlFVMHNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTzFOQlF6bENMRU5CUVVNc1EwRkJRVHRKUVhGRlNpeERRVUZETzBsQmJrVkRMRTFCUVUwN1VVRkRTaXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRVHRSUVVNeFFpeFBRVUZQTEVOQlEwd3NiMEpCUVVNc1lVRkJZU3hKUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3p0WlFVTTVRaXh2UWtGQlF5eFBRVUZQTEcxQ1FVRmpMRWRCUVVjc1EwRkJReXhOUVVGTk8yZENRVU01UWl4dlFrRkJReXhKUVVGSkxFOUJRVWM3WjBKQlExSXNiMEpCUVVNc1QwRkJUeXhSUVVGRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCVnl4RFFVTXpRaXhEUVVOSkxFTkJRMnBDTEVOQlFVRTdTVUZEU0N4RFFVRkRPMGxCUlVRc1QwRkJUenRSUVVOTUxFMUJRVTBzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGQk8xRkJSVEZDTEdsQ1FVRnBRanRSUVVOcVFpeE5RVUZOTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZCTzFGQlEycERMRWxCUVVrc1MwRkJTenRaUVVGRkxFOUJRVThzUzBGQlN5eERRVUZCTzFGQlJYWkNMRzlDUVVGdlFqdFJRVU53UWl4SlFVTkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTTdXVUZEYmtJc1QwRkJUeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRkZCUVZFN1dVRkRMMElzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUXpkQ08xbEJRMEVzVDBGQlR5eHZRa0ZCUXl4VFFVRlRMRWxCUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVkQlFVa3NRMEZCUVR0VFFVTnlRenRSUVVWRUxHTkJRV003VVVGRFpDeEpRVU5GTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTXNUMEZCVHl4UFFVRlBMRXRCUVVzc1VVRkJVU3hEUVVGRE8xbEJRM1JFTEVkQlFVY3NRMEZCUXl4TlFVRk5MRXRCUVVzc1QwRkJUeXhGUVVOMFFqdFpRVU5CTEU5QlFVOHNiMEpCUVVNc1ZVRkJWU3hKUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVkQlFVa3NRMEZCUVR0VFFVTm9RenRSUVVWRUxHMUNRVUZ0UWp0UlFVTnVRaXhOUVVGTkxFMUJRVTBzUjBGQlJ5eFBRVUZQTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzVVVGQlVTeERRVUZCTzFGQlF6bERMRTlCUVU4c2IwSkJRVU1zVlVGQlZTeEpRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUjBGQlNTeERRVUZCTzBsQlEycEVMRU5CUVVNN1NVRkZSQ3hUUVVGVExFTkJRVU1zUjBGQlVUdFJRVU5vUWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhGUVVGRk8xbEJRMUlzVDBGQlR5eERRVU5NTEc5Q1FVRkRMRk5CUVZNc1NVRkRVaXhKUVVGSkxFVkJRVVU3YjBKQlEwb3NaMFZCUVdkRkxFOUJRVThzUjBGQlJ5eHpRMEZCYzBNN2IwSkJRMmhJTEZsQlFWazdiMEpCUTFvc1pVRkJaVHR2UWtGRFppeGhRVUZoTzJsQ1FVTmtMRWRCUTBRc1EwRkRTQ3hEUVVGQk8xTkJRMFk3WVVGQlRTeEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3haUVVGWkxFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEzWkRMRTlCUVU4c1EwRkRUQ3h2UWtGQlF5eFRRVUZUTEVsQlExSXNTVUZCU1N4RlFVRkZPMjlDUVVOS0xEQkZRVUV3UlR0dlFrRkRNVVVzV1VGQldUdHZRa0ZEV2l4bFFVRmxPMjlDUVVObUxHRkJRV0U3YVVKQlEyUXNSMEZEUkN4RFFVTklMRU5CUVVFN1UwRkRSanRSUVVORUxFOUJRVThzUzBGQlN5eERRVUZCTzBsQlEyUXNRMEZCUXp0RFFVTkdPMEZCUlVRc1pVRkJaU3hqUVVGakxFTkJRVUVpZlE9PSIsImltcG9ydCB7IFN0cmluZyBhcyBTdHJpbmdVdGlscyB9IGZyb20gJy4vc3RyaW5nLXV0aWxzJztcclxuZnVuY3Rpb24gY3JlYXRlQXBwZW5kKHMpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKSk7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0XHJcbiAqIEBwYXJhbSB7IUFycmF5LjwhU0RLLlJlbW90ZU9iamVjdD59IHBhcmFtZXRlcnNcclxuICogQHBhcmFtIHshRWxlbWVudH0gZm9ybWF0dGVkUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRXaXRoU3Vic3RpdHV0aW9uU3RyaW5nKGZvcm1hdCwgcGFyYW1ldGVycywgZm9ybWF0dGVkUmVzdWx0KSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZXJzID0ge307XHJcbiAgICBmdW5jdGlvbiBzdHJpbmdGb3JtYXR0ZXIob2JqKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZmxvYXRGb3JtYXR0ZXIob2JqKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gJ05hTic7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGludGVnZXJGb3JtYXR0ZXIob2JqKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gJ05hTic7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3Iob2JqKTtcclxuICAgIH1cclxuICAgIGxldCBjdXJyZW50U3R5bGUgPSBudWxsO1xyXG4gICAgZnVuY3Rpb24gc3R5bGVGb3JtYXR0ZXIob2JqKSB7XHJcbiAgICAgICAgY3VycmVudFN0eWxlID0ge307XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGJ1ZmZlci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgb2JqKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5zdHlsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGJ1ZmZlci5zdHlsZVtpXTtcclxuICAgICAgICAgICAgaWYgKGlzV2hpdGVsaXN0ZWRQcm9wZXJ0eShwcm9wZXJ0eSkpXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U3R5bGVbcHJvcGVydHldID0gYnVmZmVyLnN0eWxlW3Byb3BlcnR5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc1doaXRlbGlzdGVkUHJvcGVydHkocHJvcGVydHkpIHtcclxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IFtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQnLFxyXG4gICAgICAgICAgICAnYm9yZGVyJyxcclxuICAgICAgICAgICAgJ2NvbG9yJyxcclxuICAgICAgICAgICAgJ2ZvbnQnLFxyXG4gICAgICAgICAgICAnbGluZScsXHJcbiAgICAgICAgICAgICdtYXJnaW4nLFxyXG4gICAgICAgICAgICAncGFkZGluZycsXHJcbiAgICAgICAgICAgICd0ZXh0JyxcclxuICAgICAgICAgICAgJy13ZWJraXQtYmFja2dyb3VuZCcsXHJcbiAgICAgICAgICAgICctd2Via2l0LWJvcmRlcicsXHJcbiAgICAgICAgICAgICctd2Via2l0LWZvbnQnLFxyXG4gICAgICAgICAgICAnLXdlYmtpdC1tYXJnaW4nLFxyXG4gICAgICAgICAgICAnLXdlYmtpdC1wYWRkaW5nJyxcclxuICAgICAgICAgICAgJy13ZWJraXQtdGV4dCdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnR5LnN0YXJ0c1dpdGgocHJlZml4ZXNbaV0pKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZvcm1hdHRlcnMucyA9IHN0cmluZ0Zvcm1hdHRlcjtcclxuICAgIGZvcm1hdHRlcnMuZiA9IGZsb2F0Rm9ybWF0dGVyO1xyXG4gICAgLy8gRmlyZWJ1ZyBhbGxvd3MgYm90aCAlaSBhbmQgJWQgZm9yIGZvcm1hdHRpbmcgaW50ZWdlcnMuXHJcbiAgICBmb3JtYXR0ZXJzLmkgPSBpbnRlZ2VyRm9ybWF0dGVyO1xyXG4gICAgZm9ybWF0dGVycy5kID0gaW50ZWdlckZvcm1hdHRlcjtcclxuICAgIC8vIEZpcmVidWcgdXNlcyAlYyBmb3Igc3R5bGluZyB0aGUgbWVzc2FnZS5cclxuICAgIGZvcm1hdHRlcnMuYyA9IHN0eWxlRm9ybWF0dGVyO1xyXG4gICAgZnVuY3Rpb24gYXBwZW5kKGEsIGIpIHtcclxuICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICAgICAgYS5hcHBlbmRDaGlsZChiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCB0b0FwcGVuZCA9IGNyZWF0ZUFwcGVuZChTdHJpbmcoYikpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodG9BcHBlbmQpO1xyXG4gICAgICAgICAgICAgICAgYXBwbHlDdXJyZW50U3R5bGUod3JhcHBlcik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlDdXJyZW50U3R5bGUod3JhcHBlci5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgICAgICB0b0FwcGVuZCA9IHdyYXBwZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYS5hcHBlbmRDaGlsZCh0b0FwcGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGFwcGx5Q3VycmVudFN0eWxlKGVsZW1lbnQpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY3VycmVudFN0eWxlKVxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSBjdXJyZW50U3R5bGVba2V5XTtcclxuICAgIH1cclxuICAgIC8vIFN0cmluZy5mb3JtYXQgZG9lcyB0cmVhdCBmb3JtYXR0ZWRSZXN1bHQgbGlrZSBhIEJ1aWxkZXIsIHJlc3VsdCBpcyBhbiBvYmplY3QuXHJcbiAgICByZXR1cm4gU3RyaW5nVXRpbHMuZm9ybWF0KGZvcm1hdCwgcGFyYW1ldGVycywgZm9ybWF0dGVycywgZm9ybWF0dGVkUmVzdWx0LCBhcHBlbmQpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVptOXliV0YwTFcxbGMzTmhaMlV1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12UTI5dGNHOXVaVzUwTDJSbGRuUnZiMnh6TFhCaGNuTmxjaTltYjNKdFlYUXRiV1Z6YzJGblpTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc1RVRkJUU3hKUVVGSkxGZEJRVmNzUlVGQlJTeE5RVUZOTEdkQ1FVRm5RaXhEUVVGQk8wRkJSWFJFTEZOQlFWTXNXVUZCV1N4RFFVRkRMRU5CUVZNN1NVRkROMElzVFVGQlRTeFRRVUZUTEVkQlFVY3NVVUZCVVN4RFFVRkRMSE5DUVVGelFpeEZRVUZGTEVOQlFVRTdTVUZEYmtRc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVUU3U1VGRmFrUXNUMEZCVHl4VFFVRlRMRU5CUVVFN1FVRkRiRUlzUTBGQlF6dEJRVVZFT3pzN08wZEJTVWM3UVVGRFNDeE5RVUZOTEVOQlFVTXNUMEZCVHl4VlFVRlZMRFJDUVVFMFFpeERRVU5zUkN4TlFVRlhMRVZCUTFnc1ZVRkJaU3hGUVVObUxHVkJRVzlDTzBsQlJYQkNMRTFCUVUwc1ZVRkJWU3hIUVVGUkxFVkJRVVVzUTBGQlFUdEpRVVV4UWl4VFFVRlRMR1ZCUVdVc1EwRkJReXhIUVVGUk8xRkJReTlDTEVsQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVVzc1VVRkJVU3hGUVVGRk8xbEJRek5DTEU5QlFVOHNSVUZCUlN4RFFVRkJPMU5CUTFZN1VVRkZSQ3hQUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUVR0SlFVTndRaXhEUVVGRE8wbEJSVVFzVTBGQlV5eGpRVUZqTEVOQlFVTXNSMEZCVVR0UlFVTTVRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eExRVUZMTEZGQlFWRTdXVUZCUlN4UFFVRlBMRXRCUVVzc1EwRkJRVHRSUVVONlF5eFBRVUZQTEVkQlFVY3NRMEZCUVR0SlFVTmFMRU5CUVVNN1NVRkZSQ3hUUVVGVExHZENRVUZuUWl4RFFVRkRMRWRCUVZFN1VVRkRhRU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NTMEZCU3l4UlFVRlJPMWxCUVVVc1QwRkJUeXhMUVVGTExFTkJRVUU3VVVGRGVrTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZCTzBsQlEzaENMRU5CUVVNN1NVRkZSQ3hKUVVGSkxGbEJRVmtzUjBGQlVTeEpRVUZKTEVOQlFVRTdTVUZETlVJc1UwRkJVeXhqUVVGakxFTkJRVU1zUjBGQlVUdFJRVU01UWl4WlFVRlpMRWRCUVVjc1JVRkJSU3hEUVVGQk8xRkJRMnBDTEUxQlFVMHNUVUZCVFN4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVRTdVVUZETjBNc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eFBRVUZQTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVFN1VVRkRha01zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8xbEJRelZETEUxQlFVMHNVVUZCVVN4SFFVRkhMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEYUVNc1NVRkJTU3h4UWtGQmNVSXNRMEZCUXl4UlFVRlJMRU5CUVVNN1owSkJRMnBETEZsQlFWa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkJPMU5CUTJ4RU8wbEJRMGdzUTBGQlF6dEpRVVZFTEZOQlFWTXNjVUpCUVhGQ0xFTkJRVU1zVVVGQlowSTdVVUZETjBNc1RVRkJUU3hSUVVGUkxFZEJRVWM3V1VGRFppeFpRVUZaTzFsQlExb3NVVUZCVVR0WlFVTlNMRTlCUVU4N1dVRkRVQ3hOUVVGTk8xbEJRMDRzVFVGQlRUdFpRVU5PTEZGQlFWRTdXVUZEVWl4VFFVRlRPMWxCUTFRc1RVRkJUVHRaUVVOT0xHOUNRVUZ2UWp0WlFVTndRaXhuUWtGQlowSTdXVUZEYUVJc1kwRkJZenRaUVVOa0xHZENRVUZuUWp0WlFVTm9RaXhwUWtGQmFVSTdXVUZEYWtJc1kwRkJZenRUUVVObUxFTkJRVUU3VVVGRFJDeExRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzVVVGQlVTeERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRaUVVONFF5eEpRVUZKTEZGQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVRkZMRTlCUVU4c1NVRkJTU3hEUVVGQk8xTkJRMnhFTzFGQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVFN1NVRkRaQ3hEUVVGRE8wbEJSVVFzVlVGQlZTeERRVUZETEVOQlFVTXNSMEZCUnl4bFFVRmxMRU5CUVVFN1NVRkRPVUlzVlVGQlZTeERRVUZETEVOQlFVTXNSMEZCUnl4alFVRmpMRU5CUVVFN1NVRkROMElzZVVSQlFYbEVPMGxCUTNwRUxGVkJRVlVzUTBGQlF5eERRVUZETEVkQlFVY3NaMEpCUVdkQ0xFTkJRVUU3U1VGREwwSXNWVUZCVlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhuUWtGQlowSXNRMEZCUVR0SlFVVXZRaXd5UTBGQk1rTTdTVUZETTBNc1ZVRkJWU3hEUVVGRExFTkJRVU1zUjBGQlJ5eGpRVUZqTEVOQlFVRTdTVUZGTjBJc1UwRkJVeXhOUVVGTkxFTkJRVU1zUTBGQlRTeEZRVUZGTEVOQlFVMDdVVUZETlVJc1NVRkJTU3hEUVVGRExGbEJRVmtzU1VGQlNTeEZRVUZGTzFsQlEzSkNMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdVMEZEYWtJN1lVRkJUU3hKUVVGSkxFOUJRVThzUTBGQlF5eExRVUZMTEZkQlFWY3NSVUZCUlR0WlFVTnVReXhKUVVGSkxGRkJRVkVzUjBGQlVTeFpRVUZaTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVUU3V1VGRk0wTXNTVUZCU1N4WlFVRlpMRVZCUVVVN1owSkJRMmhDTEVsQlFVa3NUMEZCVHl4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVRTdaMEpCUXpWRExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVFN1owSkJRemRDTEdsQ1FVRnBRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZCTzJkQ1FVTXhRaXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRExGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUlN4RFFVRkRPMjlDUVVNNVF5eHBRa0ZCYVVJc1EwRkJReXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFN1owSkJRM2hETEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVFN1lVRkRia0k3V1VGRFJDeERRVUZETEVOQlFVTXNWMEZCVnl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGQk8xTkJRM2hDTzFGQlEwUXNUMEZCVHl4RFFVRkRMRU5CUVVFN1NVRkRWaXhEUVVGRE8wbEJSVVE3TzA5QlJVYzdTVUZEU0N4VFFVRlRMR2xDUVVGcFFpeERRVUZETEU5QlFWazdVVUZEY2tNc1MwRkJTeXhKUVVGSkxFZEJRVWNzU1VGQlNTeFpRVUZaTzFsQlFVVXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVFN1NVRkRkRVVzUTBGQlF6dEpRVVZFTEdkR1FVRm5SanRKUVVOb1JpeFBRVUZQTEZkQlFWY3NRMEZCUXl4TlFVRk5MRU5CUTNaQ0xFMUJRVTBzUlVGRFRpeFZRVUZWTEVWQlExWXNWVUZCVlN4RlFVTldMR1ZCUVdVc1JVRkRaaXhOUVVGTkxFTkJRMUFzUTBGQlFUdEJRVU5JTEVOQlFVTWlmUT09IiwiaW1wb3J0ICogYXMgTGlua2lmeSBmcm9tICdsaW5raWZ5anMvaHRtbCc7XHJcbmltcG9ydCBmb3JtYXRNZXNzYWdlU3RyaW5nIGZyb20gJy4vZm9ybWF0LW1lc3NhZ2UnO1xyXG4vKipcclxuICogRm9ybWF0cyBhIGNvbnNvbGUgbG9nIG1lc3NhZ2UgdXNpbmcgdGhlIERldnRvb2xzIHBhcnNlciBhbmQgcmV0dXJucyBIVE1MXHJcbiAqIEBwYXJhbSBhcmdzIFRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBjb25zb2xlIG1ldGhvZFxyXG4gKi9cclxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShhcmdzKSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBmb3JtYXRNZXNzYWdlU3RyaW5nKGFyZ3NbMF0sIGFyZ3Muc2xpY2UoMSksIGZvcm1hdHRlZFJlc3VsdCk7XHJcbiAgICByZXR1cm4gTGlua2lmeShmb3JtYXR0ZWRSZXN1bHQub3V0ZXJIVE1MLnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnPGJyIC8+JykpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdE1lc3NhZ2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12UTI5dGNHOXVaVzUwTDJSbGRuUnZiMnh6TFhCaGNuTmxjaTlwYm1SbGVDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRXRCUVVzc1QwRkJUeXhOUVVGTkxHZENRVUZuUWl4RFFVRkJPMEZCUTNwRExFOUJRVThzYlVKQlFXMUNMRTFCUVUwc2EwSkJRV3RDTEVOQlFVRTdRVUZGYkVRN096dEhRVWRITzBGQlEwZ3NVMEZCVXl4aFFVRmhMRU5CUVVNc1NVRkJWenRKUVVOb1F5eE5RVUZOTEdWQlFXVXNSMEZCUnl4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZCTzBsQlJYUkVMRzFDUVVGdFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMR1ZCUVdVc1EwRkJReXhEUVVGQk8wbEJSVFZFTEU5QlFVOHNUMEZCVHl4RFFVRkRMR1ZCUVdVc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEdsQ1FVRnBRaXhGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVRTdRVUZEYUVZc1EwRkJRenRCUVVWRUxHVkJRV1VzWVVGQllTeERRVUZCSW4wPSIsIi8vIFRha2VuIGZyb20gdGhlIHNvdXJjZSBvZiBjaHJvbWUgZGV2dG9vbHM6XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9DaHJvbWVEZXZUb29scy9kZXZ0b29scy1mcm9udGVuZC9ibG9iL21hc3Rlci9mcm9udF9lbmQvcGxhdGZvcm0vdXRpbGl0aWVzLmpzI0w4MDUtTDEwMDZcclxuLy8gQ29weXJpZ2h0IDIwMTQgVGhlIENocm9taXVtIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxyXG4vLyBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlXHJcbi8vIG1ldDpcclxuLy9cclxuLy8gICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxyXG4vLyBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXHJcbi8vICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxyXG4vLyBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyXHJcbi8vIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGVcclxuLy8gZGlzdHJpYnV0aW9uLlxyXG4vLyAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgR29vZ2xlIEluYy4gbm9yIHRoZSBuYW1lcyBvZiBpdHNcclxuLy8gY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb21cclxuLy8gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cclxuLy9cclxuLy8gVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SU1xyXG4vLyBcIkFTIElTXCIgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UXHJcbi8vIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUlxyXG4vLyBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVFxyXG4vLyBPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCxcclxuLy8gU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVFxyXG4vLyBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSxcclxuLy8gREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZXHJcbi8vIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcclxuLy8gKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXHJcbi8vIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXHJcbmV4cG9ydCB2YXIgU3RyaW5nO1xyXG4oZnVuY3Rpb24gKFN0cmluZykge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzRGlnaXRBdChzdHJpbmcsIGluZGV4KSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIDQ4IDw9IGMgJiYgYyA8PSA1NztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdFxyXG4gICAgICogQHBhcmFtIHshT2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKHN0cmluZywgLi4uKToqPn0gZm9ybWF0dGVyc1xyXG4gICAgICogQHJldHVybiB7IUFycmF5LjwhT2JqZWN0Pn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdG9rZW5pemVGb3JtYXRTdHJpbmcoZm9ybWF0LCBmb3JtYXR0ZXJzKSB7XHJcbiAgICAgICAgdmFyIHRva2VucyA9IFtdO1xyXG4gICAgICAgIHZhciBzdWJzdGl0dXRpb25JbmRleCA9IDA7XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3RyaW5nVG9rZW4oc3RyKSB7XHJcbiAgICAgICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0udHlwZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnZhbHVlICs9IHN0cjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiAnc3RyaW5nJywgdmFsdWU6IHN0ciB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3BlY2lmaWVyVG9rZW4oc3BlY2lmaWVyLCBwcmVjaXNpb24sIHN1YnN0aXR1dGlvbkluZGV4KSB7XHJcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzcGVjaWZpZXInLFxyXG4gICAgICAgICAgICAgICAgc3BlY2lmaWVyOiBzcGVjaWZpZXIsXHJcbiAgICAgICAgICAgICAgICBwcmVjaXNpb246IHByZWNpc2lvbixcclxuICAgICAgICAgICAgICAgIHN1YnN0aXR1dGlvbkluZGV4OiBzdWJzdGl0dXRpb25JbmRleFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBwcmVjZW50SW5kZXggPSBmb3JtYXQuaW5kZXhPZignJScsIGluZGV4KTsgcHJlY2VudEluZGV4ICE9PSAtMTsgcHJlY2VudEluZGV4ID0gZm9ybWF0LmluZGV4T2YoJyUnLCBpbmRleCkpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdC5sZW5ndGggPT09IGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLy8gdW5lc2NhcGVkICUgc2lnbiBhdCB0aGUgZW5kIG9mIHRoZSBmb3JtYXQgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGFkZFN0cmluZ1Rva2VuKGZvcm1hdC5zdWJzdHJpbmcoaW5kZXgsIHByZWNlbnRJbmRleCkpO1xyXG4gICAgICAgICAgICBpbmRleCA9IHByZWNlbnRJbmRleCArIDE7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXRbaW5kZXhdID09PSAnJScpIHtcclxuICAgICAgICAgICAgICAgIC8vICUlIGVzY2FwZSBzZXF1ZW5jZS5cclxuICAgICAgICAgICAgICAgIGFkZFN0cmluZ1Rva2VuKCclJyk7XHJcbiAgICAgICAgICAgICAgICArK2luZGV4O1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzRGlnaXRBdChmb3JtYXQsIGluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGZpcnN0IGNoYXJhY3RlciBpcyBhIG51bWJlciwgaXQgbWlnaHQgYmUgYSBzdWJzdGl0dXRpb24gaW5kZXguXHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoZm9ybWF0LnN1YnN0cmluZyhpbmRleCksIDEwKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpc0RpZ2l0QXQoZm9ybWF0LCBpbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgKytpbmRleDtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBudW1iZXIgaXMgZ3JlYXRlciB0aGFuIHplcm8gYW5kIGVuZHMgd2l0aCBhIFwiJFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGlzIGEgc3Vic3RpdHV0aW9uIGluZGV4LlxyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDAgJiYgZm9ybWF0W2luZGV4XSA9PT0gJyQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic3RpdHV0aW9uSW5kZXggPSBudW1iZXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByZWNpc2lvbiA9IC0xO1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0W2luZGV4XSA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgcHJlY2lzaW9uIHNwZWNpZmllci4gSWYgbm8gZGlnaXQgZm9sbG93cyB0aGUgXCIuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBwcmVjaXNpb24gc2hvdWxkIGJlIHplcm8uXHJcbiAgICAgICAgICAgICAgICArK2luZGV4O1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gcGFyc2VJbnQoZm9ybWF0LnN1YnN0cmluZyhpbmRleCksIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihwcmVjaXNpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaXNEaWdpdEF0KGZvcm1hdCwgaW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEoZm9ybWF0W2luZGV4XSBpbiBmb3JtYXR0ZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgYWRkU3RyaW5nVG9rZW4oZm9ybWF0LnN1YnN0cmluZyhwcmVjZW50SW5kZXgsIGluZGV4ICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgKytpbmRleDtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFNwZWNpZmllclRva2VuKGZvcm1hdFtpbmRleF0sIHByZWNpc2lvbiwgc3Vic3RpdHV0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICArK3N1YnN0aXR1dGlvbkluZGV4O1xyXG4gICAgICAgICAgICArK2luZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRTdHJpbmdUb2tlbihmb3JtYXQuc3Vic3RyaW5nKGluZGV4KSk7XHJcbiAgICAgICAgcmV0dXJuIHRva2VucztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdFxyXG4gICAgICogQHBhcmFtIHs/QXJyYXlMaWtlfSBzdWJzdGl0dXRpb25zXHJcbiAgICAgKiBAcGFyYW0geyFPYmplY3QuPHN0cmluZywgZnVuY3Rpb24oc3RyaW5nLCAuLi4pOlE+fSBmb3JtYXR0ZXJzXHJcbiAgICAgKiBAcGFyYW0geyFUfSBpbml0aWFsVmFsdWVcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oVCwgUSk6IFR8dW5kZWZpbmVkfSBhcHBlbmRcclxuICAgICAqIEBwYXJhbSB7IUFycmF5LjwhT2JqZWN0Pj19IHRva2VuaXplZEZvcm1hdFxyXG4gICAgICogQHJldHVybiB7IXtmb3JtYXR0ZWRSZXN1bHQ6IFQsIHVudXNlZFN1YnN0aXR1dGlvbnM6ID9BcnJheUxpa2V9fTtcclxuICAgICAqIEB0ZW1wbGF0ZSBULCBRXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGZvcm1hdChmb3JtYXQsIHN1YnN0aXR1dGlvbnMsIGZvcm1hdHRlcnMsIGluaXRpYWxWYWx1ZSwgYXBwZW5kLCB0b2tlbml6ZWRGb3JtYXQpIHtcclxuICAgICAgICBpZiAoIWZvcm1hdCB8fCAhc3Vic3RpdHV0aW9ucyB8fCAhc3Vic3RpdHV0aW9ucy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHQ6IGFwcGVuZChpbml0aWFsVmFsdWUsIGZvcm1hdCksXHJcbiAgICAgICAgICAgICAgICB1bnVzZWRTdWJzdGl0dXRpb25zOiBzdWJzdGl0dXRpb25zXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gcHJldHR5RnVuY3Rpb25OYW1lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKCdTdHJpbmcuZm9ybWF0KFwiJyArXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgK1xyXG4gICAgICAgICAgICAgICAgJ1wiLCBcIicgK1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChzdWJzdGl0dXRpb25zLCAnXCIsIFwiJykgK1xyXG4gICAgICAgICAgICAgICAgJ1wiKScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB3YXJuKG1zZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4ocHJldHR5RnVuY3Rpb25OYW1lKCkgKyAnOiAnICsgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IobXNnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocHJldHR5RnVuY3Rpb25OYW1lKCkgKyAnOiAnICsgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkRm9ybWF0IHx8IHRva2VuaXplRm9ybWF0U3RyaW5nKGZvcm1hdCwgZm9ybWF0dGVycyk7XHJcbiAgICAgICAgdmFyIHVzZWRTdWJzdGl0dXRpb25JbmRleGVzID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xyXG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFwcGVuZChyZXN1bHQsIHRva2VuLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnc3BlY2lmaWVyJykge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ1Vua25vd24gdG9rZW4gdHlwZSBcIicgKyB0b2tlbi50eXBlICsgJ1wiIGZvdW5kLicpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRva2VuLnN1YnN0aXR1dGlvbkluZGV4ID49IHN1YnN0aXR1dGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm90IGVub3VnaCBzdWJzdGl0dXRpb25zIGZvciB0aGUgY3VycmVudCBzdWJzdGl0dXRpb25JbmRleFxyXG4gICAgICAgICAgICAgICAgLy8ganVzdCBvdXRwdXQgdGhlIGZvcm1hdCBzcGVjaWZpZXIgbGl0ZXJhbGx5IGFuZCBtb3ZlIG9uLlxyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ25vdCBlbm91Z2ggc3Vic3RpdHV0aW9uIGFyZ3VtZW50cy4gSGFkICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnN0aXR1dGlvbnMubGVuZ3RoICtcclxuICAgICAgICAgICAgICAgICAgICAnIGJ1dCBuZWVkZWQgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgKHRva2VuLnN1YnN0aXR1dGlvbkluZGV4ICsgMSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICcsIHNvIHN1YnN0aXR1dGlvbiB3YXMgc2tpcHBlZC4nKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFwcGVuZChyZXN1bHQsICclJyArICh0b2tlbi5wcmVjaXNpb24gPiAtMSA/IHRva2VuLnByZWNpc2lvbiA6ICcnKSArIHRva2VuLnNwZWNpZmllcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1c2VkU3Vic3RpdHV0aW9uSW5kZXhlc1t0b2tlbi5zdWJzdGl0dXRpb25JbmRleF0gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoISh0b2tlbi5zcGVjaWZpZXIgaW4gZm9ybWF0dGVycykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVuY291bnRlcmVkIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCBjaGFyYWN0ZXIsIHRyZWF0IGFzIGEgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgd2FybigndW5zdXBwb3J0ZWQgZm9ybWF0IGNoYXJhY3RlciBcXHUyMDFDJyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uc3BlY2lmaWVyICtcclxuICAgICAgICAgICAgICAgICAgICAnXFx1MjAxRC4gVHJlYXRpbmcgYXMgYSBzdHJpbmcuJyk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBhcHBlbmQocmVzdWx0LCBzdWJzdGl0dXRpb25zW3Rva2VuLnN1YnN0aXR1dGlvbkluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHQgPSBhcHBlbmQocmVzdWx0LCBmb3JtYXR0ZXJzW3Rva2VuLnNwZWNpZmllcl0oc3Vic3RpdHV0aW9uc1t0b2tlbi5zdWJzdGl0dXRpb25JbmRleF0sIHRva2VuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1bnVzZWRTdWJzdGl0dXRpb25zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzdGl0dXRpb25zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChpIGluIHVzZWRTdWJzdGl0dXRpb25JbmRleGVzKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIHVudXNlZFN1YnN0aXR1dGlvbnMucHVzaChzdWJzdGl0dXRpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgZm9ybWF0dGVkUmVzdWx0OiByZXN1bHQsIHVudXNlZFN1YnN0aXR1dGlvbnM6IHVudXNlZFN1YnN0aXR1dGlvbnMgfTtcclxuICAgIH1cclxuICAgIFN0cmluZy5mb3JtYXQgPSBmb3JtYXQ7XHJcbn0pKFN0cmluZyB8fCAoU3RyaW5nID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzNSeWFXNW5MWFYwYVd4ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwwTnZiWEJ2Ym1WdWRDOWtaWFowYjI5c2N5MXdZWEp6WlhJdmMzUnlhVzVuTFhWMGFXeHpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxEUkRRVUUwUXp0QlFVTTFReXcyUjBGQk5rYzdRVUZGTjBjc05FUkJRVFJFTzBGQlF6VkVMRVZCUVVVN1FVRkRSaXh4UlVGQmNVVTdRVUZEY2tVc2VVVkJRWGxGTzBGQlEzcEZMRTlCUVU4N1FVRkRVQ3hGUVVGRk8wRkJRMFlzYzBWQlFYTkZPMEZCUTNSRkxHZEZRVUZuUlR0QlFVTm9SU3dyUkVGQkswUTdRVUZETDBRc2VVVkJRWGxGTzBGQlEzcEZMR2RGUVVGblJUdEJRVU5vUlN4blFrRkJaMEk3UVVGRGFFSXNORVJCUVRSRU8wRkJRelZFTEhWRlFVRjFSVHRCUVVOMlJTd3lSRUZCTWtRN1FVRkRNMFFzUlVGQlJUdEJRVU5HTEhORlFVRnpSVHRCUVVOMFJTeHZSVUZCYjBVN1FVRkRjRVVzZDBWQlFYZEZPMEZCUTNoRkxIVkZRVUYxUlR0QlFVTjJSU3gzUlVGQmQwVTdRVUZEZUVVc2JVVkJRVzFGTzBGQlEyNUZMSGRGUVVGM1JUdEJRVU40UlN4M1JVRkJkMFU3UVVGRGVFVXNjMFZCUVhORk8wRkJRM1JGTEhkRlFVRjNSVHRCUVVONFJTeDFSVUZCZFVVN1FVRkZka1VzVFVGQlRTeExRVUZYTEUxQlFVMHNRMEV5VFhSQ08wRkJNMDFFTEZkQlFXbENMRTFCUVUwN1NVRkRja0k3T3pzN1QwRkpSenRKUVVOSUxGTkJRVk1zVTBGQlV5eERRVUZETEUxQlFWY3NSVUZCUlN4TFFVRlZPMUZCUTNoRExFbEJRVWtzUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVUU3VVVGRGFFTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVRTdTVUZETTBJc1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTQ3hUUVVGVExHOUNRVUZ2UWl4RFFVRkRMRTFCUVZjc1JVRkJSU3hWUVVGbE8xRkJRM2hFTEVsQlFVa3NUVUZCVFN4SFFVRlJMRVZCUVVVc1EwRkJRVHRSUVVOd1FpeEpRVUZKTEdsQ1FVRnBRaXhIUVVGSExFTkJRVU1zUTBGQlFUdFJRVVY2UWl4VFFVRlRMR05CUVdNc1EwRkJReXhIUVVGUk8xbEJRemxDTEVsQlFVa3NUVUZCVFN4RFFVRkRMRTFCUVUwc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVVVGQlVUdG5Ra0ZET1VRc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhKUVVGSkxFZEJRVWNzUTBGQlFUczdaMEpCUTI1RExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1VVRkJVU3hGUVVGRkxFdEJRVXNzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkJPMUZCUTJ4RUxFTkJRVU03VVVGRlJDeFRRVUZUTEdsQ1FVRnBRaXhEUVVGRExGTkJRV01zUlVGQlJTeFRRVUZqTEVWQlFVVXNhVUpCUVhOQ08xbEJReTlGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNN1owSkJRMVlzU1VGQlNTeEZRVUZGTEZkQlFWYzdaMEpCUTJwQ0xGTkJRVk1zUlVGQlJTeFRRVUZUTzJkQ1FVTndRaXhUUVVGVExFVkJRVVVzVTBGQlV6dG5Ra0ZEY0VJc2FVSkJRV2xDTEVWQlFVVXNhVUpCUVdsQ08yRkJRM0pETEVOQlFVTXNRMEZCUVR0UlFVTktMRU5CUVVNN1VVRkZSQ3hKUVVGSkxFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVRTdVVUZEWWl4TFFVTkZMRWxCUVVrc1dVRkJXU3hIUVVGSExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZMRXRCUVVzc1EwRkJReXhGUVVNM1F5eFpRVUZaTEV0QlFVc3NRMEZCUXl4RFFVRkRMRVZCUTI1Q0xGbEJRVmtzUjBGQlJ5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1JVRkJSU3hMUVVGTExFTkJRVU1zUlVGRGVrTTdXVUZEUVN4SlFVRkpMRTFCUVUwc1EwRkJReXhOUVVGTkxFdEJRVXNzUzBGQlN6dG5Ra0ZEZWtJc2IwUkJRVzlFTzJkQ1FVTndSQ3hOUVVGTE8xbEJRMUFzWTBGQll5eERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETEVOQlFVRTdXVUZEY2tRc1MwRkJTeXhIUVVGSExGbEJRVmtzUjBGQlJ5eERRVUZETEVOQlFVRTdXVUZGZUVJc1NVRkJTU3hOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RlFVRkZPMmRDUVVONlFpeHpRa0ZCYzBJN1owSkJRM1JDTEdOQlFXTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRVHRuUWtGRGJrSXNSVUZCUlN4TFFVRkxMRU5CUVVFN1owSkJRMUFzVTBGQlVUdGhRVU5VTzFsQlJVUXNTVUZCU1N4VFFVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFdEJRVXNzUTBGQlF5eEZRVUZGTzJkQ1FVTTFRaXh4UlVGQmNVVTdaMEpCUTNKRkxFbEJRVWtzVFVGQlRTeEhRVUZITEZGQlFWRXNRMEZCUXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkJPMmRDUVVOc1JDeFBRVUZQTEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRE8yOUNRVUZGTEVWQlFVVXNTMEZCU3l4RFFVRkJPMmRDUVVWNFF5d3dSRUZCTUVRN1owSkJRekZFTEhGRFFVRnhRenRuUWtGRGNrTXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRVZCUVVVN2IwSkJRM1pETEdsQ1FVRnBRaXhIUVVGSExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVRTdiMEpCUXpsQ0xFVkJRVVVzUzBGQlN5eERRVUZCTzJsQ1FVTlNPMkZCUTBZN1dVRkZSQ3hKUVVGSkxGTkJRVk1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUVR0WlFVTnNRaXhKUVVGSkxFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRVZCUVVVN1owSkJRM3BDTERoRVFVRTRSRHRuUWtGRE9VUXNjVU5CUVhGRE8yZENRVU55UXl4RlFVRkZMRXRCUVVzc1EwRkJRVHRuUWtGRFVDeFRRVUZUTEVkQlFVY3NVVUZCVVN4RFFVRkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVFN1owSkJRMnBFTEVsQlFVa3NTMEZCU3l4RFFVRkRMRk5CUVZNc1EwRkJRenR2UWtGQlJTeFRRVUZUTEVkQlFVY3NRMEZCUXl4RFFVRkJPMmRDUVVWdVF5eFBRVUZQTEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRE8yOUNRVUZGTEVWQlFVVXNTMEZCU3l4RFFVRkJPMkZCUTNwRE8xbEJSVVFzU1VGQlNTeERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxGVkJRVlVzUTBGQlF5eEZRVUZGTzJkQ1FVTnNReXhqUVVGakxFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4WlFVRlpMRVZCUVVVc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRTdaMEpCUTNwRUxFVkJRVVVzUzBGQlN5eERRVUZCTzJkQ1FVTlFMRk5CUVZFN1lVRkRWRHRaUVVWRUxHbENRVUZwUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUlVGQlJTeFRRVUZUTEVWQlFVVXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlFUdFpRVVU1UkN4RlFVRkZMR2xDUVVGcFFpeERRVUZCTzFsQlEyNUNMRVZCUVVVc1MwRkJTeXhEUVVGQk8xTkJRMUk3VVVGRlJDeGpRVUZqTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZCTzFGQlJYWkRMRTlCUVU4c1RVRkJUU3hEUVVGQk8wbEJRMllzUTBGQlF6dEpRVWRFT3pzN096czdPenM3VDBGVFJ6dEpRVU5JTEZOQlFXZENMRTFCUVUwc1EwRkRjRUlzVFVGQldTeEZRVU5hTEdGQlFXMUNMRVZCUTI1Q0xGVkJRV2RDTEVWQlEyaENMRmxCUVd0Q0xFVkJRMnhDTEUxQlFWa3NSVUZEV2l4bFFVRnhRanRSUVVWeVFpeEpRVUZKTEVOQlFVTXNUVUZCVFN4SlFVRkpMRU5CUVVNc1lVRkJZU3hKUVVGSkxFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMDdXVUZEY0VRc1QwRkJUenRuUWtGRFRDeGxRVUZsTEVWQlFVVXNUVUZCVFN4RFFVRkRMRmxCUVZrc1JVRkJSU3hOUVVGTkxFTkJRVU03WjBKQlF6ZERMRzFDUVVGdFFpeEZRVUZGTEdGQlFXRTdZVUZEYmtNc1EwRkJRVHRSUVVWSUxGTkJRVk1zYTBKQlFXdENPMWxCUTNwQ0xFOUJRVThzUTBGRFRDeHBRa0ZCYVVJN1owSkJRMnBDTEUxQlFVMDdaMEpCUTA0c1RVRkJUVHRuUWtGRFRpeExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zWVVGQllTeEZRVUZGTEUxQlFVMHNRMEZCUXp0blFrRkRhRVFzU1VGQlNTeERRVU5NTEVOQlFVRTdVVUZEU0N4RFFVRkRPMUZCUlVRc1UwRkJVeXhKUVVGSkxFTkJRVU1zUjBGQlVUdFpRVU53UWl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RlFVRkZMRWRCUVVjc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZCTzFGQlEycEVMRU5CUVVNN1VVRkZSQ3hUUVVGVExFdEJRVXNzUTBGQlF5eEhRVUZSTzFsQlEzSkNMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zYTBKQlFXdENMRVZCUVVVc1IwRkJSeXhKUVVGSkxFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVRTdVVUZEYkVRc1EwRkJRenRSUVVWRUxFbEJRVWtzVFVGQlRTeEhRVUZITEZsQlFWa3NRMEZCUVR0UlFVTjZRaXhKUVVGSkxFMUJRVTBzUjBGRFVpeGxRVUZsTEVsQlFVa3NiMEpCUVc5Q0xFTkJRVU1zVFVGQlRTeEZRVUZGTEZWQlFWVXNRMEZCUXl4RFFVRkJPMUZCUXpkRUxFbEJRVWtzZFVKQlFYVkNMRWRCUVVjc1JVRkJSU3hEUVVGQk8xRkJSV2hETEV0QlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVVc1EwRkJReXhGUVVGRk8xbEJRM1JETEVsQlFVa3NTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlFUdFpRVVZ5UWl4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFdEJRVXNzVVVGQlVTeEZRVUZGTzJkQ1FVTXpRaXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVUU3WjBKQlEzQkRMRk5CUVZFN1lVRkRWRHRaUVVWRUxFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NTMEZCU3l4WFFVRlhMRVZCUVVVN1owSkJRemxDTEV0QlFVc3NRMEZCUXl4elFrRkJjMElzUjBGQlJ5eExRVUZMTEVOQlFVTXNTVUZCU1N4SFFVRkhMRlZCUVZVc1EwRkJReXhEUVVGQk8yZENRVU4yUkN4VFFVRlJPMkZCUTFRN1dVRkZSQ3hKUVVGSkxFdEJRVXNzUTBGQlF5eHBRa0ZCYVVJc1NVRkJTU3hoUVVGaExFTkJRVU1zVFVGQlRTeEZRVUZGTzJkQ1FVTnVSQ3d3UlVGQk1FVTdaMEpCUXpGRkxEQkVRVUV3UkR0blFrRkRNVVFzUzBGQlN5eERRVU5JTEhsRFFVRjVRenR2UWtGRGRrTXNZVUZCWVN4RFFVRkRMRTFCUVUwN2IwSkJRM0JDTEdOQlFXTTdiMEpCUTJRc1EwRkJReXhMUVVGTExFTkJRVU1zYVVKQlFXbENMRWRCUVVjc1EwRkJReXhEUVVGRE8yOUNRVU0zUWl4blEwRkJaME1zUTBGRGJrTXNRMEZCUVR0blFrRkRSQ3hOUVVGTkxFZEJRVWNzVFVGQlRTeERRVU5pTEUxQlFVMHNSVUZEVGl4SFFVRkhMRWRCUVVjc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVU4wUlN4RFFVRkJPMmRDUVVORUxGTkJRVkU3WVVGRFZEdFpRVVZFTEhWQ1FVRjFRaXhEUVVGRExFdEJRVXNzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlFUdFpRVVYyUkN4SlFVRkpMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEpRVUZKTEZWQlFWVXNRMEZCUXl4RlFVRkZPMmRDUVVOd1F5eHJSVUZCYTBVN1owSkJRMnhGTEVsQlFVa3NRMEZEUml4eFEwRkJjVU03YjBKQlEyNURMRXRCUVVzc1EwRkJReXhUUVVGVE8yOUNRVU5tTEN0Q1FVRXJRaXhEUVVOc1F5eERRVUZCTzJkQ1FVTkVMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTEdGQlFXRXNRMEZCUXl4TFFVRkxMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXl4RFFVRkJPMmRDUVVNdlJDeFRRVUZSTzJGQlExUTdXVUZGUkN4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVOaUxFMUJRVTBzUlVGRFRpeFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVONlFpeGhRVUZoTEVOQlFVTXNTMEZCU3l4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVWQlEzUkRMRXRCUVVzc1EwRkRUaXhEUVVOR0xFTkJRVUU3VTBGRFJqdFJRVVZFTEVsQlFVa3NiVUpCUVcxQ0xFZEJRVWNzUlVGQlV5eERRVUZCTzFGQlEyNURMRXRCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4aFFVRmhMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVVVzUTBGQlF5eEZRVUZGTzFsQlF6ZERMRWxCUVVrc1EwRkJReXhKUVVGSkxIVkNRVUYxUWp0blFrRkJSU3hUUVVGUk8xbEJRekZETEcxQ1FVRnRRaXhEUVVGRExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRUUVVNelF6dFJRVVZFTEU5QlFVOHNSVUZCUlN4bFFVRmxMRVZCUVVVc1RVRkJUU3hGUVVGRkxHMUNRVUZ0UWl4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEVOQlFVRTdTVUZET1VVc1EwRkJRenRKUVdoSFpTeGhRVUZOTEZOQlowZHlRaXhEUVVGQk8wRkJRMGdzUTBGQlF5eEZRVE5OWjBJc1RVRkJUU3hMUVVGT0xFMUJRVTBzVVVFeVRYUkNJbjA9IiwiaW1wb3J0IHN0eWxlZCBmcm9tICcuL3RoZW1lJztcclxuLyoqXHJcbiAqIFJldHVybiB0aGVtZWQgbG9nLW1ldGhvZCBzdHlsZVxyXG4gKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlXHJcbiAqIEBwYXJhbSB0eXBlIFRoZSBtZXRob2RcclxuICovXHJcbmNvbnN0IFRoZW1lZCA9IChzdHlsZSwgbWV0aG9kLCBzdHlsZXMpID0+IHN0eWxlc1tgTE9HXyR7bWV0aG9kLnRvVXBwZXJDYXNlKCl9XyR7c3R5bGUudG9VcHBlckNhc2UoKX1gXSB8fFxyXG4gICAgc3R5bGVzW2BMT0dfJHtzdHlsZS50b1VwcGVyQ2FzZSgpfWBdO1xyXG4vKipcclxuICogY29uc29sZS1mZWVkXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUm9vdCA9IHN0eWxlZCgnZGl2Jykoe1xyXG4gICAgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXHJcbiAgICB3aWR0aDogJzEwMCUnLFxyXG59KTtcclxuLyoqXHJcbiAqIGNvbnNvbGUtbWVzc2FnZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1lc3NhZ2UgPSBzdHlsZWQoJ2RpdicpKCh7IHRoZW1lOiB7IHN0eWxlcywgbWV0aG9kIH0gfSkgPT4gKHtcclxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgY29sb3I6IFRoZW1lZCgnY29sb3InLCBtZXRob2QsIHN0eWxlcyksXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFRoZW1lZCgnYmFja2dyb3VuZCcsIG1ldGhvZCwgc3R5bGVzKSxcclxuICAgIGJvcmRlclRvcDogYDFweCBzb2xpZCAke1RoZW1lZCgnYm9yZGVyJywgbWV0aG9kLCBzdHlsZXMpfWAsXHJcbiAgICBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHtUaGVtZWQoJ2JvcmRlcicsIG1ldGhvZCwgc3R5bGVzKX1gLFxyXG4gICAgbWFyZ2luVG9wOiAtMSxcclxuICAgIG1hcmdpbkJvdHRvbTogKy9ed2FybnxlcnJvciQvLnRlc3QobWV0aG9kKSxcclxuICAgIHBhZGRpbmdMZWZ0OiAxMCxcclxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgJyYgKic6IHtcclxuICAgICAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJyxcclxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICBmb250RmFtaWx5OiBzdHlsZXMuQkFTRV9GT05UX0ZBTUlMWSxcclxuICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxyXG4gICAgICAgIGZvbnRTaXplOiBzdHlsZXMuQkFTRV9GT05UX1NJWkVcclxuICAgIH0sXHJcbiAgICAnJiBhJzoge1xyXG4gICAgICAgIGNvbG9yOiAncmdiKDE3NywgMTc3LCAxNzcpJ1xyXG4gICAgfVxyXG59KSk7XHJcbi8qKlxyXG4gKiBtZXNzYWdlLWljb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBJY29uID0gc3R5bGVkKCdkaXYnKSgoeyB0aGVtZTogeyBzdHlsZXMsIG1ldGhvZCB9IH0pID0+ICh7XHJcbiAgICB3aWR0aDogc3R5bGVzLkxPR19JQ09OX1dJRFRILFxyXG4gICAgaGVpZ2h0OiBzdHlsZXMuTE9HX0lDT05fSEVJR0hULFxyXG4gICAgYmFja2dyb3VuZEltYWdlOiBUaGVtZWQoJ2ljb24nLCBtZXRob2QsIHN0eWxlcyksXHJcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JyxcclxuICAgIGJhY2tncm91bmRTaXplOiBzdHlsZXMuTE9HX0lDT05fQkFDS0dST1VORF9TSVpFLFxyXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnNTAlIDUwJSdcclxufSkpO1xyXG4vKipcclxuICogY29uc29sZS1jb250ZW50XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQ29udGVudCA9IHN0eWxlZCgnZGl2JykoKHsgdGhlbWU6IHsgc3R5bGVzIH0gfSkgPT4gKHtcclxuICAgIGNsZWFyOiAncmlnaHQnLFxyXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICBwYWRkaW5nOiBzdHlsZXMuUEFERElORyxcclxuICAgIG1hcmdpbkxlZnQ6IDE1LFxyXG4gICAgbWluSGVpZ2h0OiAxOCxcclxuICAgIGZsZXg6ICdhdXRvJyxcclxuICAgIHdpZHRoOiAnY2FsYygxMDAlIC0gMTVweCknXHJcbn0pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWld4bGJXVnVkSE11YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZRMjl0Y0c5dVpXNTBMMlZzWlcxbGJuUnpMblJ6ZUNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEUxQlFVMHNUVUZCVFN4VFFVRlRMRU5CUVVFN1FVRkZOVUk3T3pzN1IwRkpSenRCUVVOSUxFMUJRVTBzVFVGQlRTeEhRVUZITEVOQlEySXNTMEZCWVN4RlFVTmlMRTFCUVdNc1JVRkRaQ3hOUVVGclF5eEZRVU5zUXl4RlFVRkZMRU5CUTBZc1RVRkJUU3hEUVVGRExFOUJRVThzVFVGQlRTeERRVUZETEZkQlFWY3NSVUZCUlN4SlFVRkpMRXRCUVVzc1EwRkJReXhYUVVGWExFVkJRVVVzUlVGQlJTeERRVUZETzBsQlF6VkVMRTFCUVUwc1EwRkJReXhQUVVGUExFdEJRVXNzUTBGQlF5eFhRVUZYTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVFN1FVRkZkRU03TzBkQlJVYzdRVUZEU0N4TlFVRk5MRU5CUVVNc1RVRkJUU3hKUVVGSkxFZEJRVWNzVFVGQlRTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMGxCUTJoRExGTkJRVk1zUlVGQlJTeFpRVUZaTzBsQlEzWkNMRXRCUVVzc1JVRkJSU3hOUVVGTk8wTkJRMlFzUTBGQlF5eERRVUZCTzBGQlJVWTdPMGRCUlVjN1FVRkRTQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeExRVUZMTEVWQlFVVXNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0SlFVTjJSU3hSUVVGUkxFVkJRVVVzVlVGQlZUdEpRVU53UWl4UFFVRlBMRVZCUVVVc1RVRkJUVHRKUVVObUxFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTFCUVUwc1JVRkJSU3hOUVVGTkxFTkJRVU03U1VGRGRFTXNaVUZCWlN4RlFVRkZMRTFCUVUwc1EwRkJReXhaUVVGWkxFVkJRVVVzVFVGQlRTeEZRVUZGTEUxQlFVMHNRMEZCUXp0SlFVTnlSQ3hUUVVGVExFVkJRVVVzWVVGQllTeE5RVUZOTEVOQlFVTXNVVUZCVVN4RlFVRkZMRTFCUVUwc1JVRkJSU3hOUVVGTkxFTkJRVU1zUlVGQlJUdEpRVU14UkN4WlFVRlpMRVZCUVVVc1lVRkJZU3hOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZGTEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1JVRkJSVHRKUVVNM1JDeFRRVUZUTEVWQlFVVXNRMEZCUXl4RFFVRkRPMGxCUTJJc1dVRkJXU3hGUVVGRkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNN1NVRkRNVU1zVjBGQlZ5eEZRVUZGTEVWQlFVVTdTVUZEWml4VFFVRlRMRVZCUVVVc1dVRkJXVHRKUVVOMlFpeExRVUZMTEVWQlFVVTdVVUZEVEN4aFFVRmhMRVZCUVVVc1MwRkJTenRSUVVOd1FpeFRRVUZUTEVWQlFVVXNXVUZCV1R0UlFVTjJRaXhWUVVGVkxFVkJRVVVzVFVGQlRTeERRVUZETEdkQ1FVRm5RanRSUVVOdVF5eFZRVUZWTEVWQlFVVXNWVUZCVlR0UlFVTjBRaXhSUVVGUkxFVkJRVVVzVFVGQlRTeERRVUZETEdOQlFXTTdTMEZEYUVNN1NVRkRSQ3hMUVVGTExFVkJRVVU3VVVGRFRDeExRVUZMTEVWQlFVVXNiMEpCUVc5Q08wdEJRelZDTzBOQlEwWXNRMEZCUXl4RFFVRkRMRU5CUVVFN1FVRkZTRHM3UjBGRlJ6dEJRVU5JTEUxQlFVMHNRMEZCUXl4TlFVRk5MRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1JVRkJSU3hGUVVGRkxFMUJRVTBzUlVGQlJTeE5RVUZOTEVWQlFVVXNSVUZCUlN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJRM0JGTEV0QlFVc3NSVUZCUlN4TlFVRk5MRU5CUVVNc1kwRkJZenRKUVVNMVFpeE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRMR1ZCUVdVN1NVRkRPVUlzWlVGQlpTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF6dEpRVU12UXl4blFrRkJaMElzUlVGQlJTeFhRVUZYTzBsQlF6ZENMR05CUVdNc1JVRkJSU3hOUVVGTkxFTkJRVU1zZDBKQlFYZENPMGxCUXk5RExHdENRVUZyUWl4RlFVRkZMRk5CUVZNN1EwRkRPVUlzUTBGQlF5eERRVUZETEVOQlFVRTdRVUZGU0RzN1IwRkZSenRCUVVOSUxFMUJRVTBzUTBGQlF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4RlFVRkZMRTFCUVUwc1JVRkJSU3hGUVVGRkxFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdTVUZETDBRc1MwRkJTeXhGUVVGRkxFOUJRVTg3U1VGRFpDeFJRVUZSTEVWQlFVVXNWVUZCVlR0SlFVTndRaXhQUVVGUExFVkJRVVVzVFVGQlRTeERRVUZETEU5QlFVODdTVUZEZGtJc1ZVRkJWU3hGUVVGRkxFVkJRVVU3U1VGRFpDeFRRVUZUTEVWQlFVVXNSVUZCUlR0SlFVTmlMRWxCUVVrc1JVRkJSU3hOUVVGTk8wbEJRMW9zUzBGQlN5eEZRVUZGTEcxQ1FVRnRRanREUVVNelFpeERRVUZETEVOQlFVTXNRMEZCUVNKOSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ2Vtb3Rpb24tdGhlbWluZyc7XHJcbmltcG9ydCBTdHlsZXMgZnJvbSAnLi90aGVtZS9kZWZhdWx0JztcclxuaW1wb3J0IHsgUm9vdCB9IGZyb20gJy4vZWxlbWVudHMnO1xyXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL01lc3NhZ2UnO1xyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgyNTQ2MzcvNDA4OTM1N1xyXG5jb25zdCBjdXN0b21TdHJpbmdpZnkgPSBmdW5jdGlvbiAodikge1xyXG4gICAgY29uc3QgY2FjaGUgPSBuZXcgU2V0KCk7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY2FjaGUuaGFzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2lyY3VsYXIgcmVmZXJlbmNlIGZvdW5kLCBkaXNjYXJkIGtleVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHZhbHVlIGluIG91ciBzZXRcclxuICAgICAgICAgICAgY2FjaGUuYWRkKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSk7XHJcbn07XHJcbmNsYXNzIENvbnNvbGUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgdGhpcy50aGVtZSA9ICgpID0+ICh7XHJcbiAgICAgICAgICAgIHZhcmlhbnQ6IHRoaXMucHJvcHMudmFyaWFudCB8fCAnbGlnaHQnLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHtcclxuICAgICAgICAgICAgICAgIC4uLlN0eWxlcyh0aGlzLnByb3BzKSxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgeyBmaWx0ZXIgPSBbXSwgbG9ncyA9IFtdLCBzZWFyY2hLZXl3b3JkcywgbG9nRmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChzZWFyY2hLZXl3b3Jkcyk7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyRnVuID0gbG9nRmlsdGVyXHJcbiAgICAgICAgICAgID8gbG9nRmlsdGVyXHJcbiAgICAgICAgICAgIDogbG9nID0+IHJlZ2V4LnRlc3QoY3VzdG9tU3RyaW5naWZ5KGxvZykpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBsb2dzID0gbG9ncy5maWx0ZXIoZmlsdGVyRnVuKTtcclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGhlbWVQcm92aWRlciwgeyB0aGVtZTogdGhpcy50aGVtZSB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvb3QsIG51bGwsIGxvZ3MubWFwKChsb2csIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgaXMgZGVmaW5lZCBhbmQgZG9lc24ndCBpbmNsdWRlIHRoZSBtZXRob2RcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gZmlsdGVyLmxlbmd0aCAhPT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGxvZy5tZXRob2QgJiZcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaW5kZXhPZihsb2cubWV0aG9kKSA9PT0gLTE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQgPyBudWxsIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZSwgeyBsb2c6IGxvZywga2V5OiBgJHtsb2cubWV0aG9kfS0ke2l9YCB9KSk7XHJcbiAgICAgICAgICAgIH0pKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENvbnNvbGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZRMjl0Y0c5dVpXNTBMMmx1WkdWNExuUnplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRXRCUVVzc1MwRkJTeXhOUVVGTkxFOUJRVThzUTBGQlFUdEJRVU01UWl4UFFVRlBMRVZCUVVVc1lVRkJZU3hGUVVGRkxFMUJRVTBzYVVKQlFXbENMRU5CUVVFN1FVRkZMME1zVDBGQlR5eE5RVUZOTEUxQlFVMHNhVUpCUVdsQ0xFTkJRVUU3UVVGRmNFTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJSU3hOUVVGTkxGbEJRVmtzUTBGQlFUdEJRVU5xUXl4UFFVRlBMRTlCUVU4c1RVRkJUU3hYUVVGWExFTkJRVUU3UVVGRkwwSXNLME5CUVN0RE8wRkJReTlETEUxQlFVMHNaVUZCWlN4SFFVRkhMRlZCUVZNc1EwRkJRenRKUVVOb1F5eE5RVUZOTEV0QlFVc3NSMEZCUnl4SlFVRkpMRWRCUVVjc1JVRkJSU3hEUVVGQk8wbEJRM1pDTEU5QlFVOHNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzVlVGQlV5eEhRVUZITEVWQlFVVXNTMEZCU3p0UlFVTXhReXhKUVVGSkxFOUJRVThzUzBGQlN5eExRVUZMTEZGQlFWRXNTVUZCU1N4TFFVRkxMRXRCUVVzc1NVRkJTU3hGUVVGRk8xbEJReTlETEVsQlFVa3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFTkJRVU1zUlVGQlJUdG5Ra0ZEY0VJc2QwTkJRWGRETzJkQ1FVTjRReXhQUVVGTk8yRkJRMUE3V1VGRFJDeDVRa0ZCZVVJN1dVRkRla0lzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRVHRUUVVOcVFqdFJRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkJPMGxCUTJRc1EwRkJReXhEUVVGRExFTkJRVUU3UVVGRFNpeERRVUZETEVOQlFVRTdRVUZGUkN4TlFVRk5MRTlCUVZFc1UwRkJVU3hMUVVGTExFTkJRVU1zWVVGQmVVSTdTVUZCY2tRN08xRkJRMFVzVlVGQlN5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkRZaXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRWxCUVVrc1QwRkJUenRaUVVOMFF5eE5RVUZOTEVWQlFVVTdaMEpCUTA0c1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXp0blFrRkRja0lzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwN1lVRkRja0k3VTBGRFJpeERRVUZETEVOQlFVRTdTVUZuUTBvc1EwRkJRenRKUVRsQ1F5eE5RVUZOTzFGQlEwb3NTVUZCU1N4RlFVRkZMRTFCUVUwc1IwRkJSeXhGUVVGRkxFVkJRVVVzU1VGQlNTeEhRVUZITEVWQlFVVXNSVUZCUlN4alFVRmpMRVZCUVVVc1UwRkJVeXhGUVVGRkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUVR0UlFVVjBSU3hOUVVGTkxFdEJRVXNzUjBGQlJ5eEpRVUZKTEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRVHRSUVVWNFF5eE5RVUZOTEZOQlFWTXNSMEZCUnl4VFFVRlRPMWxCUTNwQ0xFTkJRVU1zUTBGQlF5eFRRVUZUTzFsQlExZ3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlFUdFJRVVV6UXl4aFFVRmhPMUZCUTJJc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVFN1VVRkZOMElzVDBGQlR5eERRVU5NTEc5Q1FVRkRMR0ZCUVdFc1NVRkJReXhMUVVGTExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVczdXVUZET1VJc2IwSkJRVU1zU1VGQlNTeFJRVU5HTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdaMEpCUTI1Q0xEQkVRVUV3UkR0blFrRkRNVVFzVFVGQlRTeFJRVUZSTEVkQlExb3NUVUZCVFN4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRE8yOUNRVU51UWl4SFFVRkhMRU5CUVVNc1RVRkJUVHR2UWtGRFZpeE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUVR0blFrRkZia01zVDBGQlR5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGRGRrSXNiMEpCUVVNc1QwRkJUeXhKUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1IwRkJSeXhEUVVGRExFMUJRVTBzU1VGQlNTeERRVUZETEVWQlFVVXNSMEZCU1N4RFFVTnFSQ3hEUVVGQk8xbEJRMGdzUTBGQlF5eERRVUZETEVOQlEwY3NRMEZEVHl4RFFVTnFRaXhEUVVGQk8wbEJRMGdzUTBGQlF6dERRVU5HTzBGQlJVUXNaVUZCWlN4UFFVRlBMRU5CUVVFaWZRPT0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIExpbmtpZnkgZnJvbSAnbGlua2lmeWpzL3JlYWN0JztcclxuZnVuY3Rpb24gc3BsaXRNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGJyZWFrSW5kZXggPSBtZXNzYWdlLmluZGV4T2YoJ1xcbicpO1xyXG4gICAgLy8gY29uc2lkZXIgdGhhdCB0aGVyZSBjYW4gYmUgbGluZSB3aXRob3V0IGEgYnJlYWtcclxuICAgIGlmIChicmVha0luZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2Uuc3Vic3RyKDAsIGJyZWFrSW5kZXgpO1xyXG59XHJcbmNsYXNzIEVycm9yUGFuZWwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGxvZyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvKiBUaGlzIGNoZWNrcyBmb3IgZXJyb3IgbG9nVHlwZXMgYW5kIHNob3J0ZW5zIHRoZSBtZXNzYWdlIGluIHRoZSBjb25zb2xlIGJ5IHdyYXBwaW5nXHJcbiAgICAgICAgaXQgYSA8ZGV0YWlscyAvPiB0YWcgYW5kIHB1dHRpbmcgdGhlIGZpcnN0IGxpbmUgaW4gYSA8c3VtbWFyeSAvPiB0YWcgYW5kIHRoZSBvdGhlciBsaW5lc1xyXG4gICAgICAgIGZvbGxvdyBhZnRlciB0aGF0LiBUaGlzIGNyZWF0ZXMgYSBuaWNlIGNvbGxhcHNpYmxlIGVycm9yIG1lc3NhZ2UgKi9cclxuICAgICAgICBsZXQgb3RoZXJFcnJvckxpbmVzO1xyXG4gICAgICAgIGNvbnN0IG1zZ0xpbmUgPSBsb2cuZGF0YS5qb2luKCcgJyk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RMaW5lID0gc3BsaXRNZXNzYWdlKG1zZ0xpbmUpO1xyXG4gICAgICAgIGNvbnN0IG1zZ0FycmF5ID0gbXNnTGluZS5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgaWYgKG1zZ0FycmF5Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgb3RoZXJFcnJvckxpbmVzID0gbXNnQXJyYXkuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghb3RoZXJFcnJvckxpbmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmtpZnksIG51bGwsIGxvZy5kYXRhLmpvaW4oJyAnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRldGFpbHNcIiwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInN1bW1hcnlcIiwgeyBzdHlsZTogeyBvdXRsaW5lOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInIH0gfSwgZmlyc3RMaW5lKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5raWZ5LCBudWxsLCBvdGhlckVycm9yTGluZXMuam9pbignXFxuXFxyJykpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRXJyb3JQYW5lbDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUlhKeWIzSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZRMjl0Y0c5dVpXNTBMMjFsYzNOaFoyVXRjR0Z5YzJWeWN5OUZjbkp2Y2k1MGMzZ2lYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVDBGQlR5eExRVUZMTEV0QlFVc3NUVUZCVFN4UFFVRlBMRU5CUVVFN1FVRkZPVUlzVDBGQlR5eExRVUZMTEU5QlFVOHNUVUZCVFN4cFFrRkJhVUlzUTBGQlFUdEJRVTB4UXl4VFFVRlRMRmxCUVZrc1EwRkJReXhQUVVGbE8wbEJRMjVETEUxQlFVMHNWVUZCVlN4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVRTdTVUZEZUVNc2EwUkJRV3RFTzBsQlEyeEVMRWxCUVVrc1ZVRkJWU3hMUVVGTExFTkJRVU1zUTBGQlF5eEZRVUZGTzFGQlEzSkNMRTlCUVU4c1QwRkJUeXhEUVVGQk8wdEJRMlk3U1VGRFJDeFBRVUZQTEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhGUVVGRkxGVkJRVlVzUTBGQlF5eERRVUZCTzBGQlEzUkRMRU5CUVVNN1FVRkZSQ3hOUVVGTkxGVkJRVmNzVTBGQlVTeExRVUZMTEVOQlFVTXNZVUZCZVVJN1NVRkRkRVFzVFVGQlRUdFJRVU5LTEUxQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZCTzFGQlF6RkNPenN5UlVGRmJVVTdVVUZEYmtVc1NVRkJTU3hsUVVGbExFTkJRVUU3VVVGRGJrSXNUVUZCVFN4UFFVRlBMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVFN1VVRkRiRU1zVFVGQlRTeFRRVUZUTEVkQlFVY3NXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGQk8xRkJRM1pETEUxQlFVMHNVVUZCVVN4SFFVRkhMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVRTdVVUZEY0VNc1NVRkJTU3hSUVVGUkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVTjJRaXhsUVVGbExFZEJRVWNzVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRVHRUUVVOd1F6dFJRVVZFTEVsQlFVa3NRMEZCUXl4bFFVRmxMRVZCUVVVN1dVRkRjRUlzVDBGQlR5eHZRa0ZCUXl4UFFVRlBMRkZCUVVVc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVZjc1EwRkJRVHRUUVVNdlF6dFJRVVZFTEU5QlFVOHNRMEZEVER0WlFVTkZMR2xEUVVGVExFdEJRVXNzUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxGTkJRVk1zUlVGQlJTeEpRVU51UkN4VFFVRlRMRU5CUTBZN1dVRkRWaXh2UWtGQlF5eFBRVUZQTEZGQlFVVXNaVUZCWlN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlZ5eERRVU42UXl4RFFVTllMRU5CUVVFN1NVRkRTQ3hEUVVGRE8wTkJRMFk3UVVGRlJDeGxRVUZsTEZWQlFWVXNRMEZCUVNKOSIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm9vdCB9IGZyb20gJy4uL3JlYWN0LWluc3BlY3Rvci9lbGVtZW50cyc7XHJcbmltcG9ydCBGb3JtYXQgZnJvbSAnLi4vZGV2dG9vbHMtcGFyc2VyJztcclxuY2xhc3MgRm9ybWF0dGVkIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJvb3QsIHsgXCJkYXRhLXR5cGVcIjogXCJmb3JtYXR0ZWRcIiwgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcclxuICAgICAgICAgICAgICAgIF9faHRtbDogRm9ybWF0KHRoaXMucHJvcHMuZGF0YSB8fCBbXSlcclxuICAgICAgICAgICAgfSB9KSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRm9ybWF0dGVkO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSbTl5YldGMGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMME52YlhCdmJtVnVkQzl0WlhOellXZGxMWEJoY25ObGNuTXZSbTl5YldGMGRHVmtMblJ6ZUNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEV0QlFVc3NTMEZCU3l4TlFVRk5MRTlCUVU4c1EwRkJRVHRCUVVNNVFpeFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTFCUVUwc05rSkJRVFpDTEVOQlFVRTdRVUZGYkVRc1QwRkJUeXhOUVVGTkxFMUJRVTBzYjBKQlFXOUNMRU5CUVVFN1FVRk5ka01zVFVGQlRTeFRRVUZWTEZOQlFWRXNTMEZCU3l4RFFVRkRMR0ZCUVhsQ08wbEJRM0pFTEUxQlFVMDdVVUZEU2l4UFFVRlBMRU5CUTB3c2IwSkJRVU1zU1VGQlNTeHBRa0ZEVHl4WFFVRlhMRVZCUTNKQ0xIVkNRVUYxUWl4RlFVRkZPMmRDUVVOMlFpeE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEpRVUZKTEVWQlFVVXNRMEZCUXp0aFFVTjBReXhIUVVORUxFTkJRMGdzUTBGQlFUdEpRVU5JTEVOQlFVTTdRMEZEUmp0QlFVVkVMR1ZCUVdVc1UwRkJVeXhEUVVGQkluMD0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhUaGVtZSB9IGZyb20gJ2Vtb3Rpb24tdGhlbWluZyc7XHJcbmltcG9ydCB7IFJvb3QgfSBmcm9tICcuLi9yZWFjdC1pbnNwZWN0b3IvZWxlbWVudHMnO1xyXG5pbXBvcnQgKiBhcyBMaW5raWZ5IGZyb20gJ2xpbmtpZnlqcy9yZWFjdCc7XHJcbmltcG9ydCBJbnNwZWN0b3IgZnJvbSAnLi4vcmVhY3QtaW5zcGVjdG9yJztcclxuY2xhc3MgT2JqZWN0VHJlZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGhlbWUsIHF1b3RlZCwgbG9nIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBsb2cuZGF0YS5tYXAoKG1lc3NhZ2UsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gIXF1b3RlZCAmJiBtZXNzYWdlLmxlbmd0aCA/IChgJHttZXNzYWdlfSBgKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiXFxcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuc3R5bGVzLk9CSkVDVF9WQUxVRV9TVFJJTkdfQ09MT1JcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBtZXNzYWdlKSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlxcXCIgXCIpKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm9vdCwgeyBcImRhdGEtdHlwZVwiOiBcInN0cmluZ1wiLCBrZXk6IGkgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExpbmtpZnksIG51bGwsIHN0cmluZykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbnNwZWN0b3IsIHsgZGF0YTogbWVzc2FnZSwga2V5OiBpIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZShPYmplY3RUcmVlKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVDJKcVpXTjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMME52YlhCdmJtVnVkQzl0WlhOellXZGxMWEJoY25ObGNuTXZUMkpxWldOMExuUnplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRXRCUVVzc1MwRkJTeXhOUVVGTkxFOUJRVThzUTBGQlFUdEJRVVU1UWl4UFFVRlBMRVZCUVVVc1UwRkJVeXhGUVVGRkxFMUJRVTBzYVVKQlFXbENMRU5CUVVFN1FVRkRNME1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlN4TlFVRk5MRFpDUVVFMlFpeERRVUZCTzBGQlJXeEVMRTlCUVU4c1MwRkJTeXhQUVVGUExFMUJRVTBzYVVKQlFXbENMRU5CUVVFN1FVRkZNVU1zVDBGQlR5eFRRVUZUTEUxQlFVMHNiMEpCUVc5Q0xFTkJRVUU3UVVGUk1VTXNUVUZCVFN4VlFVRlhMRk5CUVZFc1MwRkJTeXhEUVVGRExHRkJRWGxDTzBsQlEzUkVMRTFCUVUwN1VVRkRTaXhOUVVGTkxFVkJRVVVzUzBGQlN5eEZRVUZGTEUxQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZCTzFGQlJYcERMRTlCUVU4c1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4UFFVRlpMRVZCUVVVc1EwRkJVeXhGUVVGRkxFVkJRVVU3V1VGRE9VTXNTVUZCU1N4UFFVRlBMRTlCUVU4c1MwRkJTeXhSUVVGUkxFVkJRVVU3WjBKQlF5OUNMRTFCUVUwc1RVRkJUU3hIUVVOV0xFTkJRVU1zVFVGQlRTeEpRVUZKTEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRekZDTEVkQlFVY3NUMEZCVHl4SFFVRkhMRU5CUTJRc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGRFJqdHZRa0ZEUlN4MVEwRkJZenR2UWtGRFpDdzRRa0ZEUlN4TFFVRkxMRVZCUVVVN05FSkJRMHdzUzBGQlN5eEZRVUZGTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc2VVSkJRWGxDTzNsQ1FVTTVReXhKUVVOQkxFOUJRVThzUTBGRFNEdHZRa0ZEVUN4M1EwRkJaU3hEUVVOV0xFTkJRMUlzUTBGQlFUdG5Ra0ZGU0N4UFFVRlBMRU5CUTB3c2IwSkJRVU1zU1VGQlNTeHBRa0ZCVnl4UlFVRlJMRVZCUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03YjBKQlF6ZENMRzlDUVVGRExFOUJRVThzVVVGQlJTeE5RVUZOTEVOQlFWY3NRMEZEZEVJc1EwRkRVaXhEUVVGQk8yRkJRMFk3V1VGRlJDeFBRVUZQTEc5Q1FVRkRMRk5CUVZNc1NVRkJReXhKUVVGSkxFVkJRVVVzVDBGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4RFFVRkRMRWRCUVVrc1EwRkJRVHRSUVVNM1F5eERRVUZETEVOQlFVTXNRMEZCUVR0SlFVTktMRU5CUVVNN1EwRkRSanRCUVVWRUxHVkJRV1VzVTBGQlV5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkJJbjA9IiwiaW1wb3J0IHN0eWxlZCBmcm9tICcuLi90aGVtZSc7XHJcbi8qKlxyXG4gKiBPYmplY3Qgcm9vdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFJvb3QgPSBzdHlsZWQoJ2RpdicpKHtcclxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcclxuICAgIC8vIE5vdGUoZ3p1aWRob2YpOiBDb21tZW50ZWQgdG8gcmVtb3ZlIGVtcHR5IGxpbmUgYWZ0ZXIgY29uc29sZSBvdXRwdXQuXHJcbiAgICAvLyAnJjo6YWZ0ZXInOiB7XHJcbiAgICAvLyAgIGNvbnRlbnQ6IGAnICdgLFxyXG4gICAgLy8gICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgLy8gfSxcclxuICAgICcmID4gbGknOiB7XHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQgIWltcG9ydGFudCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgIH0sXHJcbiAgICAnJiBvbDplbXB0eSc6IHtcclxuICAgICAgICBwYWRkaW5nTGVmdDogJzAgIWltcG9ydGFudCdcclxuICAgIH1cclxufSk7XHJcbi8qKlxyXG4gKiBUYWJsZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRhYmxlID0gc3R5bGVkKCdzcGFuJykoe1xyXG4gICAgJyYgPiBsaSc6IHtcclxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICBtYXJnaW5Ub3A6IDVcclxuICAgIH1cclxufSk7XHJcbi8qKlxyXG4gKiBIVE1MXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgSFRNTCA9IHN0eWxlZCgnc3BhbicpKHtcclxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgJyYgZGl2OmhvdmVyJzoge1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyMjAsIDE1OCwgLjA1KSAhaW1wb3J0YW50JyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnXHJcbiAgICB9XHJcbn0pO1xyXG4vKipcclxuICogT2JqZWN0IGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQ29uc3RydWN0b3IgPSBzdHlsZWQoJ3NwYW4nKSh7XHJcbiAgICAnJiA+IHNwYW4gPiBzcGFuOm50aC1jaGlsZCgxKSc6IHtcclxuICAgICAgICBvcGFjaXR5OiAwLjZcclxuICAgIH1cclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVpXeGxiV1Z1ZEhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlEyOXRjRzl1Wlc1MEwzSmxZV04wTFdsdWMzQmxZM1J2Y2k5bGJHVnRaVzUwY3k1MGMzZ2lYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVDBGQlR5eE5RVUZOTEUxQlFVMHNWVUZCVlN4RFFVRkJPMEZCUlRkQ096dEhRVVZITzBGQlEwZ3NUVUZCVFN4RFFVRkRMRTFCUVUwc1NVRkJTU3hIUVVGSExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTm9ReXhQUVVGUExFVkJRVVVzWTBGQll6dEpRVU4yUWl4VFFVRlRMRVZCUVVVc1YwRkJWenRKUVVOMFFpeDFSVUZCZFVVN1NVRkRka1VzWjBKQlFXZENPMGxCUTJoQ0xHOUNRVUZ2UWp0SlFVTndRaXcwUWtGQk5FSTdTVUZETlVJc1MwRkJTenRKUVVOTUxGRkJRVkVzUlVGQlJUdFJRVU5TTEdWQlFXVXNSVUZCUlN4M1FrRkJkMEk3VVVGRGVrTXNUMEZCVHl4RlFVRkZMR05CUVdNN1MwRkRlRUk3U1VGRFJDeFpRVUZaTEVWQlFVVTdVVUZEV2l4WFFVRlhMRVZCUVVVc1kwRkJZenRMUVVNMVFqdERRVU5HTEVOQlFVTXNRMEZCUVR0QlFVVkdPenRIUVVWSE8wRkJRMGdzVFVGQlRTeERRVUZETEUxQlFVMHNTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU5zUXl4UlFVRlJMRVZCUVVVN1VVRkRVaXhQUVVGUExFVkJRVVVzWTBGQll6dFJRVU4yUWl4VFFVRlRMRVZCUVVVc1EwRkJRenRMUVVOaU8wTkJRMFlzUTBGQlF5eERRVUZCTzBGQlJVWTdPMGRCUlVjN1FVRkRTQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeEpRVUZKTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8wbEJRMnBETEU5QlFVOHNSVUZCUlN4alFVRmpPMGxCUTNaQ0xHRkJRV0VzUlVGQlJUdFJRVU5pTEdWQlFXVXNSVUZCUlN4eFEwRkJjVU03VVVGRGRFUXNXVUZCV1N4RlFVRkZMRXRCUVVzN1MwRkRjRUk3UTBGRFJpeERRVUZETEVOQlFVRTdRVUZGUmpzN1IwRkZSenRCUVVOSUxFMUJRVTBzUTBGQlF5eE5RVUZOTEZkQlFWY3NSMEZCUnl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03U1VGRGVFTXNPRUpCUVRoQ0xFVkJRVVU3VVVGRE9VSXNUMEZCVHl4RlFVRkZMRWRCUVVjN1MwRkRZanREUVVOR0xFTkJRVU1zUTBGQlFTSjkiLCJpbXBvcnQgeyB3aXRoVGhlbWUgfSBmcm9tICdlbW90aW9uLXRoZW1pbmcnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERPTUluc3BlY3RvciwgSW5zcGVjdG9yLCBPYmplY3RMYWJlbCwgT2JqZWN0TmFtZSwgT2JqZWN0Um9vdExhYmVsLCBPYmplY3RWYWx1ZSwgT2JqZWN0UHJldmlldyB9IGZyb20gJ3JlYWN0LWluc3BlY3Rvcic7XHJcbmltcG9ydCB7IENvbnN0cnVjdG9yLCBIVE1MLCBSb290LCBUYWJsZSB9IGZyb20gJy4vZWxlbWVudHMnO1xyXG5jb25zdCBDdXN0b21PYmplY3RMYWJlbCA9ICh7IG5hbWUsIGRhdGEsIGlzTm9uZW51bWVyYWJsZSA9IGZhbHNlIH0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLFxyXG4gICAgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0TmFtZSwgeyBuYW1lOiBuYW1lLCBkaW1tZWQ6IGlzTm9uZW51bWVyYWJsZSB9KSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RQcmV2aWV3LCB7IGRhdGE6IG5hbWUgfSkpLFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCI6IFwiKSxcclxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0VmFsdWUsIHsgb2JqZWN0OiBkYXRhIH0pKSk7XHJcbmNsYXNzIEN1c3RvbUluc3BlY3RvciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSwgdGhlbWUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBzdHlsZXMsIG1ldGhvZCB9ID0gdGhlbWU7XHJcbiAgICAgICAgY29uc3QgZG9tID0gZGF0YSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IHRhYmxlID0gbWV0aG9kID09PSAndGFibGUnO1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSb290LCB7IFwiZGF0YS10eXBlXCI6IHRhYmxlID8gJ3RhYmxlJyA6IGRvbSA/ICdodG1sJyA6ICdvYmplY3QnIH0sIHRhYmxlID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5zcGVjdG9yLCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7IHRoZW1lOiBzdHlsZXMsIHRhYmxlOiB0cnVlIH0pKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnNwZWN0b3IsIE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIHsgdGhlbWU6IHN0eWxlcyB9KSkpKSA6IGRvbSA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEhUTUwsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRE9NSW5zcGVjdG9yLCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7IHRoZW1lOiBzdHlsZXMgfSkpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChJbnNwZWN0b3IsIE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIHsgdGhlbWU6IHN0eWxlcywgbm9kZVJlbmRlcmVyOiB0aGlzLm5vZGVSZW5kZXJlci5iaW5kKHRoaXMpIH0pKSkpKTtcclxuICAgIH1cclxuICAgIGdldEN1c3RvbU5vZGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHsgc3R5bGVzIH0gPSB0aGlzLnByb3BzLnRoZW1lO1xyXG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gZGF0YSAmJiBkYXRhLmNvbnN0cnVjdG9yID8gZGF0YS5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbDtcclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWyckJCddICE9PSB1bmRlZmluZWQgJiYgZGF0YVsnJCQnXVsndHlwZSddID09PSAnUHlQcm94eScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZvbnRTdHlsZTogJ2l0YWxpYycgfSB9LFxyXG4gICAgICAgICAgICAgICAgXCJQeVByb3h5IFwiLFxyXG4gICAgICAgICAgICAgICAgYHtgLFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyBjb2xvcjogJ3JnYig3OSwgMTg2LCAyNDApJyB9IH0sIGRhdGEudG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgICAgICBgfWApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVtTeW1ib2wudG9TdHJpbmdUYWddID09PSAnTW9kdWxlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgZm9udFN0eWxlOiAnaXRhbGljJyB9IH0sXHJcbiAgICAgICAgICAgICAgICBcIk1vZHVsZSBcIixcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0UHJldmlldywgeyBkYXRhOiBkYXRhIH0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25zdHJ1Y3RvciA9PT0gJ0Z1bmN0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IGZvbnRTdHlsZTogJ2l0YWxpYycgfSB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RQcmV2aWV3LCB7IGRhdGE6IGRhdGEgfSksXHJcbiAgICAgICAgICAgICAgICBgIHtgLFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyBjb2xvcjogJ3JnYigxODEsIDE4MSwgMTgxKScgfSB9LCBkYXRhLmJvZHkpLFxyXG4gICAgICAgICAgICAgICAgYH1gKSk7XHJcbiAgICAgICAgaWYgKGNvbnN0cnVjdG9yID09PSAnUHJvbWlzZScpXHJcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyBmb250U3R5bGU6ICdpdGFsaWMnIH0gfSxcclxuICAgICAgICAgICAgICAgIFwiUHJvbWlzZSBcIixcclxuICAgICAgICAgICAgICAgIGB7YCxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgb3BhY2l0eTogMC42IH0gfSwgYDxwZW5kaW5nPmApLFxyXG4gICAgICAgICAgICAgICAgYH1gKSk7XHJcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcclxuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEhUTUwsIG51bGwsXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KERPTUluc3BlY3RvciwgeyBkYXRhOiBkYXRhLCB0aGVtZTogc3R5bGVzIH0pKSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBub2RlUmVuZGVyZXIocHJvcHMpIHtcclxuICAgICAgICBsZXQgeyBkZXB0aCwgbmFtZSwgZGF0YSwgaXNOb25lbnVtZXJhYmxlIH0gPSBwcm9wcztcclxuICAgICAgICAvLyBSb290XHJcbiAgICAgICAgaWYgKGRlcHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbU5vZGUgPSB0aGlzLmdldEN1c3RvbU5vZGUoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21Ob2RlIHx8IFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0Um9vdExhYmVsLCB7IG5hbWU6IG5hbWUsIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lID09PSAnY29uc3RydWN0b3InKVxyXG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29uc3RydWN0b3IsIG51bGwsXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdExhYmVsLCB7IG5hbWU6IFwiPGNvbnN0cnVjdG9yPlwiLCBkYXRhOiBkYXRhLm5hbWUsIGlzTm9uZW51bWVyYWJsZTogaXNOb25lbnVtZXJhYmxlIH0pKSk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tTm9kZSA9IHRoaXMuZ2V0Q3VzdG9tTm9kZShkYXRhKTtcclxuICAgICAgICByZXR1cm4gY3VzdG9tTm9kZSA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFJvb3QsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0TmFtZSwgeyBuYW1lOiBuYW1lIH0pLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIjogXCIpLFxyXG4gICAgICAgICAgICBjdXN0b21Ob2RlKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChDdXN0b21PYmplY3RMYWJlbCwgeyBuYW1lOiBuYW1lLCBkYXRhOiBkYXRhLCBpc05vbmVudW1lcmFibGU6IGlzTm9uZW51bWVyYWJsZSB9KSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lKEN1c3RvbUluc3BlY3Rvcik7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12UTI5dGNHOXVaVzUwTDNKbFlXTjBMV2x1YzNCbFkzUnZjaTlwYm1SbGVDNTBjM2dpWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1QwRkJUeXhGUVVGRkxGTkJRVk1zUlVGQlJTeE5RVUZOTEdsQ1FVRnBRaXhEUVVGQk8wRkJRek5ETEU5QlFVOHNTMEZCU3l4TFFVRkxMRTFCUVUwc1QwRkJUeXhEUVVGQk8wRkJRemxDTEU5QlFVOHNSVUZEVEN4WlFVRlpMRVZCUTFvc1UwRkJVeXhGUVVOVUxGZEJRVmNzUlVGRFdDeFZRVUZWTEVWQlExWXNaVUZCWlN4RlFVTm1MRmRCUVZjc1JVRkRXQ3hoUVVGaExFVkJRMlFzVFVGQlRTeHBRa0ZCYVVJc1EwRkJRVHRCUVVkNFFpeFBRVUZQTEVWQlFVVXNWMEZCVnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzUzBGQlN5eEZRVUZGTEUxQlFVMHNXVUZCV1N4RFFVRkJPMEZCVHpORUxFMUJRVTBzYVVKQlFXbENMRWRCUVVjc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNaVUZCWlN4SFFVRkhMRXRCUVVzc1JVRkJSU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVU55UlR0SlFVTkhMRTlCUVU4c1NVRkJTU3hMUVVGTExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZETVVJc2IwSkJRVU1zVlVGQlZTeEpRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1RVRkJUU3hGUVVGRkxHVkJRV1VzUjBGQlNTeERRVU53UkN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVOR0xHOUNRVUZETEdGQlFXRXNTVUZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hIUVVGSkxFTkJRemxDTzBsQlEwUXNkVU5CUVdVN1NVRkRaaXh2UWtGQlF5eFhRVUZYTEVsQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1IwRkJTU3hEUVVONFFpeERRVU5TTEVOQlFVRTdRVUZGUkN4TlFVRk5MR1ZCUVdkQ0xGTkJRVkVzUzBGQlN5eERRVUZETEdGQlFYbENPMGxCUXpORUxFMUJRVTA3VVVGRFNpeE5RVUZOTEVWQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVRTdVVUZEYkVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlJTeE5RVUZOTEVWQlFVVXNSMEZCUnl4TFFVRkxMRU5CUVVFN1VVRkZhRU1zVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4WlFVRlpMRmRCUVZjc1EwRkJRVHRSUVVOMlF5eE5RVUZOTEV0QlFVc3NSMEZCUnl4TlFVRk5MRXRCUVVzc1QwRkJUeXhEUVVGQk8xRkJSV2hETEU5QlFVOHNRMEZEVEN4dlFrRkJReXhKUVVGSkxHbENRVUZaTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zVVVGQlVTeEpRVU4yUkN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRMUFzYjBKQlFVTXNTMEZCU3p0WlFVTktMRzlDUVVGRExGTkJRVk1zYjBKQlFVc3NTVUZCU1N4RFFVRkRMRXRCUVVzc1NVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTEV0QlFVc3NWVUZCUnp0WlFVTnNSQ3h2UWtGQlF5eFRRVUZUTEc5Q1FVRkxMRWxCUVVrc1EwRkJReXhMUVVGTExFbEJRVVVzUzBGQlN5eEZRVUZGTEUxQlFVMHNTVUZCU1N4RFFVTjBReXhEUVVOVUxFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkRVaXh2UWtGQlF5eEpRVUZKTzFsQlEwZ3NiMEpCUVVNc1dVRkJXU3h2UWtGQlN5eEpRVUZKTEVOQlFVTXNTMEZCU3l4SlFVRkZMRXRCUVVzc1JVRkJSU3hOUVVGTkxFbEJRVWtzUTBGRE1VTXNRMEZEVWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVOR0xHOUNRVUZETEZOQlFWTXNiMEpCUTBvc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGRFpDeExRVUZMTEVWQlFVVXNUVUZCVFN4RlFVTmlMRmxCUVZrc1JVRkJSU3hKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkRNVU1zUTBGRFNDeERRVU5KTEVOQlExSXNRMEZCUVR0SlFVTklMRU5CUVVNN1NVRkZSQ3hoUVVGaExFTkJRVU1zU1VGQlV6dFJRVU55UWl4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVFN1VVRkRia01zVFVGQlRTeFhRVUZYTEVkQlFVY3NTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVRTdVVUZGTTBVc1NVRkJTU3hKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRk5CUVZNc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1UwRkJVeXhGUVVGRk8xbEJRM2hGTEU5QlFVOHNRMEZEVEN3NFFrRkJUU3hMUVVGTExFVkJRVVVzUlVGQlJTeFRRVUZUTEVWQlFVVXNVVUZCVVN4RlFVRkZPenRuUWtGRGVrSXNSMEZCUnp0blFrRkRXaXc0UWtGQlRTeExRVUZMTEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc2JVSkJRVzFDTEVWQlFVVXNTVUZCUnl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVkU3WjBKQlEzQkZMRWRCUVVjc1EwRkRReXhEUVVOU0xFTkJRVUU3VTBGRFJqdFJRVVZFTEVsQlFVa3NTVUZCU1N4SlFVRkpMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEV0QlFVc3NVVUZCVVN4RlFVRkZPMWxCUTJwRUxFOUJRVThzUTBGRFRDdzRRa0ZCVFN4TFFVRkxMRVZCUVVVc1JVRkJSU3hUUVVGVExFVkJRVVVzVVVGQlVTeEZRVUZGT3p0blFrRkRNMElzYjBKQlFVTXNZVUZCWVN4SlFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFZEJRVWtzUTBGREwwSXNRMEZEVWl4RFFVRkJPMU5CUTBZN1VVRkZSQ3hKUVVGSkxGZEJRVmNzUzBGQlN5eFZRVUZWTzFsQlF6VkNMRTlCUVU4c1EwRkRUQ3c0UWtGQlRTeExRVUZMTEVWQlFVVXNSVUZCUlN4VFFVRlRMRVZCUVVVc1VVRkJVU3hGUVVGRk8yZENRVU5zUXl4dlFrRkJReXhoUVVGaExFbEJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSMEZCU1R0blFrRkROVUlzU1VGQlNUdG5Ra0ZEVEN3NFFrRkJUU3hMUVVGTExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzU1VGQlJ5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRlJPMmRDUVVNdlJDeEhRVUZITEVOQlEwTXNRMEZEVWl4RFFVRkJPMUZCUlVnc1NVRkJTU3hYUVVGWExFdEJRVXNzVTBGQlV6dFpRVU16UWl4UFFVRlBMRU5CUTB3c09FSkJRVTBzUzBGQlN5eEZRVUZGTEVWQlFVVXNVMEZCVXl4RlFVRkZMRkZCUVZFc1JVRkJSVHM3WjBKQlEzcENMRWRCUVVjN1owSkJRMW9zT0VKQlFVMHNTMEZCU3l4RlFVRkZMRVZCUVVVc1QwRkJUeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZITEZkQlFWY3NRMEZCVVR0blFrRkRiRVFzUjBGQlJ5eERRVU5ETEVOQlExSXNRMEZCUVR0UlFVVklMRWxCUVVrc1NVRkJTU3haUVVGWkxGZEJRVmM3V1VGRE4wSXNUMEZCVHl4RFFVTk1MRzlDUVVGRExFbEJRVWs3WjBKQlEwZ3NiMEpCUVVNc1dVRkJXU3hKUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZMRTFCUVUwc1IwRkJTU3hEUVVOMFF5eERRVU5TTEVOQlFVRTdVVUZEU0N4UFFVRlBMRWxCUVVrc1EwRkJRVHRKUVVOaUxFTkJRVU03U1VGRlJDeFpRVUZaTEVOQlFVTXNTMEZCVlR0UlFVTnlRaXhKUVVGSkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1pVRkJaU3hGUVVGRkxFZEJRVWNzUzBGQlN5eERRVUZCTzFGQlJXeEVMRTlCUVU4N1VVRkRVQ3hKUVVGSkxFdEJRVXNzUzBGQlN5eERRVUZETEVWQlFVVTdXVUZEWml4TlFVRk5MRlZCUVZVc1IwRkJSeXhKUVVGSkxFTkJRVU1zWVVGQllTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkJPMWxCUXpORExFOUJRVThzVlVGQlZTeEpRVUZKTEc5Q1FVRkRMR1ZCUVdVc1NVRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRWRCUVVrc1EwRkJRVHRUUVVOcVJUdFJRVVZFTEVsQlFVa3NTVUZCU1N4TFFVRkxMR0ZCUVdFN1dVRkRlRUlzVDBGQlR5eERRVU5NTEc5Q1FVRkRMRmRCUVZjN1owSkJRMVlzYjBKQlFVTXNWMEZCVnl4SlFVTldMRWxCUVVrc1JVRkJReXhsUVVGbExFVkJRM0JDTEVsQlFVa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVObUxHVkJRV1VzUlVGQlJTeGxRVUZsTEVkQlEyaERMRU5CUTFVc1EwRkRaaXhEUVVGQk8xRkJSVWdzVFVGQlRTeFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlFUdFJRVVV6UXl4UFFVRlBMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGRGJFSXNiMEpCUVVNc1NVRkJTVHRaUVVOSUxHOUNRVUZETEZWQlFWVXNTVUZCUXl4SlFVRkpMRVZCUVVVc1NVRkJTU3hIUVVGSk8xbEJRekZDTEhWRFFVRmxPMWxCUTJRc1ZVRkJWU3hEUVVOT0xFTkJRMUlzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZEUml4dlFrRkJReXhwUWtGQmFVSXNTVUZEYUVJc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGRFZpeEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVTldMR1ZCUVdVc1JVRkJSU3hsUVVGbExFZEJRMmhETEVOQlEwZ3NRMEZCUVR0SlFVTklMRU5CUVVNN1EwRkRSanRCUVVWRUxHVkJRV1VzVTBGQlV5eERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkJJbjA9IiwiaW1wb3J0IHsgY2hyb21lRGFyaywgY2hyb21lTGlnaHQgfSBmcm9tICdyZWFjdC1pbnNwZWN0b3InO1xyXG5jb25zdCBzdHlsZXMgPSAocHJvcHMpID0+ICh7XHJcbiAgICAuLi4oKHByb3BzLnZhcmlhbnQgfHwgJ2xpZ2h0JykgPT09ICdsaWdodCcgPyBjaHJvbWVMaWdodCA6IGNocm9tZURhcmspLFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmFsXHJcbiAgICAgKi9cclxuICAgIFBBRERJTkc6ICczcHggMjJweCAycHggMCcsXHJcbiAgICAvKipcclxuICAgICAqIERlZmF1bHQgbG9nIHN0eWxlc1xyXG4gICAgICovXHJcbiAgICBMT0dfQ09MT1I6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOSknLFxyXG4gICAgTE9HX0JBQ0tHUk9VTkQ6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBMT0dfQk9SREVSOiAncmdiYSgyNTUsMjU1LDI1NSwwLjAzKScsXHJcbiAgICBMT0dfSUNPTl9XSURUSDogMTAsXHJcbiAgICBMT0dfSUNPTl9IRUlHSFQ6IDE4LFxyXG4gICAgTE9HX0lDT046ICdub25lJyxcclxuICAgIC8qKlxyXG4gICAgICogTG9nIHR5cGVzXHJcbiAgICAgKi9cclxuICAgIExPR19XQVJOX0lDT046IGB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBb0FBQUFLQ0FZQUFBQ05Ncys5QUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUNrU1VSQlZDaFRiWTdCQ29KUUZFUm4wUS8zQlgxSnV4UWpzU0NYaVY4Z3RDZ3hoQ0lyS0lSSXFLRFZ6WGw1dzVjTkhCam02ZUdpblhpQVh1NWluWTJ4WW0vbWJwSWgrdmNGaExBM3N4MGF0aE5VaHltRXNQKzEwbEFFRUExN3g4by85d0Z1TkduWXVWbFd2ZTBTUWw3UDBzQnUzYXEyUjFRLzFKelNrWUdkMjllcU52MndqZG5VdXZOUmNpQy9OK3FlKzdnaWRiQTh6eUhrT0lOc3ZBL3N1bWNPa2pjYWJjQm13MittTWdBQUFBQkpSVTVFcmtKZ2dnPT0pYCxcclxuICAgIExPR19XQVJOX0JBQ0tHUk9VTkQ6ICcjMzMyYjAwJyxcclxuICAgIExPR19XQVJOX0NPTE9SOiAnI2ZmZGM5ZScsXHJcbiAgICBMT0dfV0FSTl9CT1JERVI6ICcjNjUwJyxcclxuICAgIExPR19FUlJPUl9JQ09OOiBgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBS0NBWUFBQUNOTXMrOUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFERVNVUkJWQ2hUWTRDQjdaSTh0bWZVNUU2ZTAxYitETUlnTmtnTUtnMEJSOVZrdXg2WVdQeC9iZW1JZ2tGaUlEbXdvZ09hcXJZUHphekFFbThEd3VHS1lHeVFIRWdOdzBWVDA1TXdpYjl2M3Y3L2tKRUh4aUEyVERGSURjTk5VNHZQTUZQQUNqNTgvUC92NDBjd0d5WU9Vc053eThJWlJTRklFVWd4c2tLUUdvWnJ6cDRFclFhcFliZ1lIRzM3MU00ZExBQ1RRR2FENUVCcXdENi9GcHpROWRUQkU2NEloa0ZpSURtd0loaTRtbEpxZXk4bzRlUjlyOGpQSUF4aWc4UWdzZ3dNQUZaejFZdEdQWGdqQUFBQUFFbEZUa1N1UW1DQylgLFxyXG4gICAgTE9HX0VSUk9SX0JBQ0tHUk9VTkQ6ICcjMjkwMDAwJyxcclxuICAgIExPR19FUlJPUl9CT1JERVI6ICcjNWIwMDAwJyxcclxuICAgIExPR19FUlJPUl9DT0xPUjogJyNmZjgwODAnLFxyXG4gICAgTE9HX0RFQlVHX0lDT046IGB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VVEYtOCwlM2NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgNDU5IDQ1OSclM2UlM2NwYXRoIGZpbGw9JyUyMzREODhGRicgZD0nTTQzMy41IDEyNy41aC03MS40YTE3Ny43IDE3Ny43IDAgMCAwLTQ1LjktNTFMMzU3IDM1LjcgMzIxLjMgMGwtNTYuMSA1Ni4xYy0xMC4yLTIuNi0yMy01LjEtMzUuNy01LjFzLTI1LjUgMi41LTM1LjcgNS4xTDEzNy43IDAgMTAyIDM1LjdsNDAuOCA0MC44YTE3Ny43IDE3Ny43IDAgMCAwLTQ1LjkgNTFIMjUuNXY1MUg3OWMtMi41IDcuNy0yLjUgMTcuOS0yLjUgMjUuNXYyNS41aC01MXY1MWg1MVYzMDZhODggODggMCAwIDAgMi41IDI1LjVIMjUuNXY1MWg3MS40QTE1Mi4yIDE1Mi4yIDAgMCAwIDIyOS41IDQ1OWM1Ni4xIDAgMTA3LjEtMzAuNiAxMzIuNi03Ni41aDcxLjR2LTUxSDM4MGMyLjUtNy43IDIuNS0xNy45IDIuNS0yNS41di0yNS41aDUxdi01MWgtNTFWMjA0YzAtNy43IDAtMTcuOS0yLjUtMjUuNWg1My41di01MXptLTE1MyAyMDRoLTEwMnYtNTFoMTAydjUxem0wLTEwMmgtMTAydi01MWgxMDJ2NTF6Jy8lM2UlM2Mvc3ZnJTNlXCIpYCxcclxuICAgIExPR19ERUJVR19CQUNLR1JPVU5EOiAnJyxcclxuICAgIExPR19ERUJVR19CT1JERVI6ICcnLFxyXG4gICAgTE9HX0RFQlVHX0NPTE9SOiAnIzREODhGRicsXHJcbiAgICBMT0dfQ09NTUFORF9JQ09OOiBgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBS0NBWUFBQUNOTXMrOUFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFCYVNVUkJWQ2hUWTZBdG1EeDVjdm5VcVZQMW9GenNvTCsvWHdDbzhERVF2NTg0Y2FJVlZCZzdtREJoZ2h4UTRZMit2cjZ2VTZaTThZQUtZd2RBMDBTQitDeFE4UytnNGpDb01DWWdTaUZSVnBQa0dhQWlITUhEd0FBQTVLbytGNC9sNitNQUFBQUFTVVZPUks1Q1lJST0pYCxcclxuICAgIExPR19SRVNVTFRfSUNPTjogYHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFvQUFBQUtDQVlBQUFDTk1zKzlBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFBSmNFaFpjd0FBRHNNQUFBN0RBY2R2cUdRQUFBQnBTVVJCVkNoVFk2QTkyTE5uajk2dVhidktvVnpzWU1lT0hWYmJ0MjkvRDFUNGVQLysvUUpRWVZTd2UvZHVENkNDcjBCOEE4aVdnd3FqQXFCazJOYXRXMzhCNmJQYnRtMFRCWWtCRmJzQStjOUFORmdSQ0JDdEVBU0FBb1N0aGdHaVBBTUQySU9IZ1FFQTUyMWJNN3VHNTJ3QUFBQUFTVVZPUks1Q1lJST0pYCxcclxuICAgIExPR19JTkZPX0lDT046IGB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBb0FBQUFLQ0FZQUFBQ05Ncys5QUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQURJU1VSQlZDaFRZNEFCcC9BenRtWkJaMDdxZTUzOHJPMTE0ck9hOCtHVHNrWUhiS0hTRU9BUmQ2bkxJT1RzZjYxZ0lBNDZVNmtWZVBZUWlLM3VjL0svaFBHK0xyQ2k4SXlydGtaaDV5Q0tnay84MHc0NmJhMFJkR1lHaEgvMnY2clh5Zjg4cXR0dEdWd1NMcDJFQ1FMeGVpQXUxd282dXdwSjdMK28yZjZUREE2eFp6OGpDeXFGbnVIWENqNGRqeXdtWlhIb00vRUswYXpHcWhCc05ZcG5nTDZWQ1RuR3FSRjR4Z0tvK0Q1SURPNFpFRUFLbmpjUUJhZnZxd1dmL1lvU1BEQ0FQOEFaR0FDN21MTTgxemdPVFFBQUFBQkpSVTVFcmtKZ2dnPT0pYCxcclxuICAgIC8qKlxyXG4gICAgICogRm9udHNcclxuICAgICAqL1xyXG4gICAgQkFTRV9GT05UX0ZBTUlMWTogJ0NvbnNvbGFzLCBMdWNpZGEgQ29uc29sZSwgQ291cmllciBOZXcsIG1vbm9zcGFjZScsXHJcbiAgICBCQVNFX0ZPTlRfU0laRTogJzEycHgnLFxyXG4gICAgLyoqXHJcbiAgICAgKiBPdGhlclxyXG4gICAgICovXHJcbiAgICBBUlJPV19GT05UX1NJWkU6IDEwLFxyXG4gICAgT0JKRUNUX1ZBTFVFX1NUUklOR19DT0xPUjogJ3JnYigyMzMsNjMsNTkpJ1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc3R5bGVzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laR1ZtWVhWc2RDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OURiMjF3YjI1bGJuUXZkR2hsYldVdlpHVm1ZWFZzZEM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExFVkJRVVVzVlVGQlZTeEZRVUZGTEZkQlFWY3NSVUZCUlN4TlFVRk5MR2xDUVVGcFFpeERRVUZCTzBGQlNYcEVMRTFCUVUwc1RVRkJUU3hIUVVGSExFTkJRVU1zUzBGQldTeEZRVUZGTEVWQlFVVXNRMEZET1VJc1EwRkJRenRKUVVORExFZEJRVWNzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRWxCUVVrc1QwRkJUeXhEUVVGRExFdEJRVXNzVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF6dEpRVU4wUlRzN1QwRkZSenRKUVVOSUxFOUJRVThzUlVGQlJTeG5Ra0ZCWjBJN1NVRkZla0k3TzA5QlJVYzdTVUZEU0N4VFFVRlRMRVZCUVVVc2RVSkJRWFZDTzBsQlEyeERMR05CUVdNc1JVRkJSU3hoUVVGaE8wbEJRemRDTEZWQlFWVXNSVUZCUlN4M1FrRkJkMEk3U1VGRGNFTXNZMEZCWXl4RlFVRkZMRVZCUVVVN1NVRkRiRUlzWlVGQlpTeEZRVUZGTEVWQlFVVTdTVUZEYmtJc1VVRkJVU3hGUVVGRkxFMUJRVTA3U1VGRmFFSTdPMDlCUlVjN1NVRkRTQ3hoUVVGaExFVkJRVVVzZVZsQlFYbFpPMGxCUTNoYUxHMUNRVUZ0UWl4RlFVRkZMRk5CUVZNN1NVRkRPVUlzWTBGQll5eEZRVUZGTEZOQlFWTTdTVUZEZWtJc1pVRkJaU3hGUVVGRkxFMUJRVTA3U1VGRmRrSXNZMEZCWXl4RlFVRkZMR2xpUVVGcFlqdEpRVU5xWXl4dlFrRkJiMElzUlVGQlJTeFRRVUZUTzBsQlF5OUNMR2RDUVVGblFpeEZRVUZGTEZOQlFWTTdTVUZETTBJc1pVRkJaU3hGUVVGRkxGTkJRVk03U1VGRk1VSXNZMEZCWXl4RlFVRkZMR3R0UWtGQmEyMUNPMGxCUTJ4dVFpeHZRa0ZCYjBJc1JVRkJSU3hGUVVGRk8wbEJRM2hDTEdkQ1FVRm5RaXhGUVVGRkxFVkJRVVU3U1VGRGNFSXNaVUZCWlN4RlFVRkZMRk5CUVZNN1NVRkZNVUlzWjBKQlFXZENMRVZCUVVVc2NWTkJRWEZUTzBsQlEzWlVMR1ZCUVdVc1JVRkJSU3g1VkVGQmVWUTdTVUZETVZVc1lVRkJZU3hGUVVGRkxIbGlRVUY1WWp0SlFVVjRZenM3VDBGRlJ6dEpRVU5JTEdkQ1FVRm5RaXhGUVVGRkxHdEVRVUZyUkR0SlFVTndSU3hqUVVGakxFVkJRVVVzVFVGQlRUdEpRVVYwUWpzN1QwRkZSenRKUVVOSUxHVkJRV1VzUlVGQlJTeEZRVUZGTzBsQlEyNUNMSGxDUVVGNVFpeEZRVUZGTEdkQ1FVRm5RanREUVVOcVF5eERRVUZCTEVOQlFVRTdRVUZGWkN4bFFVRmxMRTFCUVUwc1EwRkJRU0o5IiwiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5leHBvcnQgZGVmYXVsdCBzdHlsZWQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12UTI5dGNHOXVaVzUwTDNSb1pXMWxMMmx1WkdWNExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEU5QlFVOHNUVUZCZDBJc1RVRkJUU3hwUWtGQmFVSXNRMEZCUVR0QlFVZDBSQ3hsUVVGbExFMUJRU3RDTEVOQlFVRWlmUT09IiwiLyoqXHJcbiAqIFVuaG9vayBhIGNvbnNvbGUgY29uc3RydWN0b3IgYW5kIHJlc3RvcmUgYmFjayB0aGUgTmF0aXZlIG1ldGhvZHNcclxuICogQGFyZ3VtZW50IGNvbnNvbGUgVGhlIENvbnNvbGUgY29uc3RydWN0b3IgdG8gSG9va1xyXG4gKi9cclxuZnVuY3Rpb24gVW5ob29rKGNvbnNvbGUpIHtcclxuICAgIGlmIChjb25zb2xlLmZlZWQpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZCBvZiBPYmplY3Qua2V5cyhjb25zb2xlLmZlZWQucG9pbnRlcnMpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGVbbWV0aG9kXSA9IGNvbnNvbGUuZmVlZC5wb2ludGVyc1ttZXRob2RdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVsZXRlIGNvbnNvbGUuZmVlZDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBVbmhvb2s7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZWVzVvYjI5ckwybHVaR1Y0TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVVkJPenM3UjBGSFJ6dEJRVU5JTEZOQlFWTXNUVUZCVFN4RFFVRkRMRTlCUVhOQ08wbEJRM0JETEVsQlFVa3NUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSVHRSUVVOb1FpeExRVUZMTEUxQlFVMHNUVUZCVFN4SlFVRkpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSVHRaUVVOMlJDeFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFN1UwRkRhRVE3VVVGRFJDeFBRVUZQTEU5QlFVOHNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJRVHRMUVVNelFqdFRRVUZOTzFGQlEwd3NUMEZCVHl4TFFVRkxMRU5CUVVFN1MwRkRZanRCUVVOSUxFTkJRVU03UVVGRlJDeGxRVUZsTEUxQlFVMHNRMEZCUVNKOSIsImV4cG9ydCB7IGRlZmF1bHQgYXMgQ29uc29sZSB9IGZyb20gJy4vQ29tcG9uZW50JztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBIb29rIH0gZnJvbSAnLi9Ib29rJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBVbmhvb2sgfSBmcm9tICcuL1VuaG9vayc7XHJcbmV4cG9ydCB7IERlY29kZSB9IGZyb20gJy4vVHJhbnNmb3JtJztcclxuZXhwb3J0IHsgRW5jb2RlIH0gZnJvbSAnLi9UcmFuc2Zvcm0nO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVDBGQlR5eEZRVUZGTEU5QlFVOHNTVUZCU1N4UFFVRlBMRVZCUVVVc1RVRkJUU3hoUVVGaExFTkJRVUU3UVVGRGFFUXNUMEZCVHl4RlFVRkZMRTlCUVU4c1NVRkJTU3hKUVVGSkxFVkJRVVVzVFVGQlRTeFJRVUZSTEVOQlFVRTdRVUZEZUVNc1QwRkJUeXhGUVVGRkxFOUJRVThzU1VGQlNTeE5RVUZOTEVWQlFVVXNUVUZCVFN4VlFVRlZMRU5CUVVFN1FVRkZOVU1zVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TlFVRk5MR0ZCUVdFc1EwRkJRVHRCUVVOd1F5eFBRVUZQTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTFCUVUwc1lVRkJZU3hEUVVGQkluMD0iLCJpbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IFJlYWN0X19kZWZhdWx0LCB7IGNyZWF0ZUVsZW1lbnQsIGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUaGVtZUNvbnRleHQgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB3ZWFrTWVtb2l6ZSBmcm9tICdAZW1vdGlvbi93ZWFrLW1lbW9pemUnO1xuaW1wb3J0IF9leHRlbmRzIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcyc7XG5pbXBvcnQgaG9pc3ROb25SZWFjdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMoc291cmNlLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgZ2V0VGhlbWUgPSBmdW5jdGlvbiBnZXRUaGVtZShvdXRlclRoZW1lLCB0aGVtZSkge1xuICBpZiAodHlwZW9mIHRoZW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIG1lcmdlZFRoZW1lID0gdGhlbWUob3V0ZXJUaGVtZSk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAobWVyZ2VkVGhlbWUgPT0gbnVsbCB8fCB0eXBlb2YgbWVyZ2VkVGhlbWUgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkobWVyZ2VkVGhlbWUpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVGhlbWVQcm92aWRlcl0gUGxlYXNlIHJldHVybiBhbiBvYmplY3QgZnJvbSB5b3VyIHRoZW1lIGZ1bmN0aW9uLCBpLmUuIHRoZW1lPXsoKSA9PiAoe30pfSEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVyZ2VkVGhlbWU7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAodGhlbWUgPT0gbnVsbCB8fCB0eXBlb2YgdGhlbWUgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkodGhlbWUpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignW1RoZW1lUHJvdmlkZXJdIFBsZWFzZSBtYWtlIHlvdXIgdGhlbWUgcHJvcCBhIHBsYWluIG9iamVjdCcpO1xuICB9XG5cbiAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe30sIG91dGVyVGhlbWUsIHt9LCB0aGVtZSk7XG59O1xuXG52YXIgY3JlYXRlQ2FjaGVXaXRoVGhlbWUgPSB3ZWFrTWVtb2l6ZShmdW5jdGlvbiAob3V0ZXJUaGVtZSkge1xuICByZXR1cm4gd2Vha01lbW9pemUoZnVuY3Rpb24gKHRoZW1lKSB7XG4gICAgcmV0dXJuIGdldFRoZW1lKG91dGVyVGhlbWUsIHRoZW1lKTtcbiAgfSk7XG59KTtcblxudmFyIFRoZW1lUHJvdmlkZXIgPSBmdW5jdGlvbiBUaGVtZVByb3ZpZGVyKHByb3BzKSB7XG4gIHJldHVybiBjcmVhdGVFbGVtZW50KFRoZW1lQ29udGV4dC5Db25zdW1lciwgbnVsbCwgZnVuY3Rpb24gKHRoZW1lKSB7XG4gICAgaWYgKHByb3BzLnRoZW1lICE9PSB0aGVtZSkge1xuICAgICAgdGhlbWUgPSBjcmVhdGVDYWNoZVdpdGhUaGVtZSh0aGVtZSkocHJvcHMudGhlbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KFRoZW1lQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IHRoZW1lXG4gICAgfSwgcHJvcHMuY2hpbGRyZW4pO1xuICB9KTtcbn07XG5cbi8vIHNob3VsZCB3ZSBjaGFuZ2UgdGhpcyB0byBiZSBmb3J3YXJkUmVmL3dpdGhDU1NDb250ZXh0IHN0eWxlIHNvIGl0IGRvZXNuJ3QgbWVyZ2Ugd2l0aCBwcm9wcz9cbmZ1bmN0aW9uIHdpdGhUaGVtZShDb21wb25lbnQpIHtcbiAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihwcm9wcywgcmVmKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoVGhlbWVDb250ZXh0LkNvbnN1bWVyLCBudWxsLCBmdW5jdGlvbiAodGhlbWUpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgX2V4dGVuZHMoe1xuICAgICAgICB0aGVtZTogdGhlbWUsXG4gICAgICAgIHJlZjogcmVmXG4gICAgICB9LCBwcm9wcykpO1xuICAgIH0pO1xuICB9OyAvLyAkRmxvd0ZpeE1lXG5cblxuICB2YXIgV2l0aFRoZW1lID0gZm9yd2FyZFJlZihyZW5kZXIpO1xuICBXaXRoVGhlbWUuZGlzcGxheU5hbWUgPSBcIldpdGhUaGVtZShcIiArIGNvbXBvbmVudE5hbWUgKyBcIilcIjtcbiAgcmV0dXJuIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKFdpdGhUaGVtZSwgQ29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gdXNlVGhlbWUoKSB7XG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC51c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG59XG5cbmV4cG9ydCB7IFRoZW1lUHJvdmlkZXIsIHVzZVRoZW1lLCB3aXRoVGhlbWUgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gIGNvbnRleHRUeXBlOiB0cnVlLFxuICBjb250ZXh0VHlwZXM6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yOiB0cnVlLFxuICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gIG1peGluczogdHJ1ZSxcbiAgcHJvcFR5cGVzOiB0cnVlLFxuICB0eXBlOiB0cnVlXG59O1xudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gIG5hbWU6IHRydWUsXG4gIGxlbmd0aDogdHJ1ZSxcbiAgcHJvdG90eXBlOiB0cnVlLFxuICBjYWxsZXI6IHRydWUsXG4gIGNhbGxlZTogdHJ1ZSxcbiAgYXJndW1lbnRzOiB0cnVlLFxuICBhcml0eTogdHJ1ZVxufTtcbnZhciBGT1JXQVJEX1JFRl9TVEFUSUNTID0ge1xuICAnJCR0eXBlb2YnOiB0cnVlLFxuICByZW5kZXI6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIHByb3BUeXBlczogdHJ1ZVxufTtcbnZhciBNRU1PX1NUQVRJQ1MgPSB7XG4gICckJHR5cGVvZic6IHRydWUsXG4gIGNvbXBhcmU6IHRydWUsXG4gIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgZGlzcGxheU5hbWU6IHRydWUsXG4gIHByb3BUeXBlczogdHJ1ZSxcbiAgdHlwZTogdHJ1ZVxufTtcbnZhciBUWVBFX1NUQVRJQ1MgPSB7fTtcblRZUEVfU1RBVElDU1tyZWFjdElzLkZvcndhcmRSZWZdID0gRk9SV0FSRF9SRUZfU1RBVElDUztcblRZUEVfU1RBVElDU1tyZWFjdElzLk1lbW9dID0gTUVNT19TVEFUSUNTO1xuXG5mdW5jdGlvbiBnZXRTdGF0aWNzKGNvbXBvbmVudCkge1xuICAvLyBSZWFjdCB2MTYuMTEgYW5kIGJlbG93XG4gIGlmIChyZWFjdElzLmlzTWVtbyhjb21wb25lbnQpKSB7XG4gICAgcmV0dXJuIE1FTU9fU1RBVElDUztcbiAgfSAvLyBSZWFjdCB2MTYuMTIgYW5kIGFib3ZlXG5cblxuICByZXR1cm4gVFlQRV9TVEFUSUNTW2NvbXBvbmVudFsnJCR0eXBlb2YnXV0gfHwgUkVBQ1RfU1RBVElDUztcbn1cblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbmZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcbiAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFN0YXRpY3MgPSBnZXRTdGF0aWNzKHRhcmdldENvbXBvbmVudCk7XG4gICAgdmFyIHNvdXJjZVN0YXRpY3MgPSBnZXRTdGF0aWNzKHNvdXJjZUNvbXBvbmVudCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICBpZiAoIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAhKGJsYWNrbGlzdCAmJiBibGFja2xpc3Rba2V5XSkgJiYgIShzb3VyY2VTdGF0aWNzICYmIHNvdXJjZVN0YXRpY3Nba2V5XSkgJiYgISh0YXJnZXRTdGF0aWNzICYmIHRhcmdldFN0YXRpY3Nba2V5XSkpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldENvbXBvbmVudCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvaXN0Tm9uUmVhY3RTdGF0aWNzO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXMtb2JqZWN0JylcbnZhciBpc1dpbmRvdyA9IHJlcXVpcmUoJ2lzLXdpbmRvdycpXG5cbmZ1bmN0aW9uIGlzTm9kZSAodmFsKSB7XG4gIGlmICghaXNPYmplY3QodmFsKSB8fCAhaXNXaW5kb3cod2luZG93KSB8fCB0eXBlb2Ygd2luZG93Lk5vZGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgdmFsLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJlxuICAgIHR5cGVvZiB2YWwubm9kZU5hbWUgPT09ICdzdHJpbmcnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOb2RlXG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG5cdHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiAmJiB4ICE9PSBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG5cbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIG8gPSBPYmplY3Qob2JqKTtcblxuICByZXR1cm4gbyA9PT0gby53aW5kb3c7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9saW5raWZ5LWh0bWwnKS5kZWZhdWx0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gbGlua2lmeUh0bWw7XG5cbnZhciBfc2ltcGxlSHRtbFRva2VuaXplciA9IHJlcXVpcmUoJy4vc2ltcGxlLWh0bWwtdG9rZW5pemVyJyk7XG5cbnZhciBfc2ltcGxlSHRtbFRva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaW1wbGVIdG1sVG9rZW5pemVyKTtcblxudmFyIF9saW5raWZ5ID0gcmVxdWlyZSgnLi9saW5raWZ5Jyk7XG5cbnZhciBsaW5raWZ5ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2xpbmtpZnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgb3B0aW9ucyA9IGxpbmtpZnkub3B0aW9ucztcbnZhciBPcHRpb25zID0gb3B0aW9ucy5PcHRpb25zO1xuXG5cbnZhciBTdGFydFRhZyA9ICdTdGFydFRhZyc7XG52YXIgRW5kVGFnID0gJ0VuZFRhZyc7XG52YXIgQ2hhcnMgPSAnQ2hhcnMnO1xudmFyIENvbW1lbnQgPSAnQ29tbWVudCc7XG5cbi8qKlxuXHRgdG9rZW5zYCBhbmQgYHRva2VuYCBpbiB0aGlzIHNlY3Rpb24gcmVmZXIgdG8gdG9rZW5zIGdlbmVyYXRlZCBieSB0aGUgSFRNTFxuXHRwYXJzZXIuXG4qL1xuZnVuY3Rpb24gbGlua2lmeUh0bWwoc3RyKSB7XG5cdHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHR2YXIgdG9rZW5zID0gX3NpbXBsZUh0bWxUb2tlbml6ZXIyLmRlZmF1bHQudG9rZW5pemUoc3RyKTtcblx0dmFyIGxpbmtpZmllZFRva2VucyA9IFtdO1xuXHR2YXIgbGlua2lmaWVkID0gW107XG5cdHZhciBpO1xuXG5cdG9wdHMgPSBuZXcgT3B0aW9ucyhvcHRzKTtcblxuXHQvLyBMaW5raWZ5IHRoZSB0b2tlbnMgZ2l2ZW4gYnkgdGhlIHBhcnNlclxuXHRmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG5cdFx0aWYgKHRva2VuLnR5cGUgPT09IFN0YXJ0VGFnKSB7XG5cdFx0XHRsaW5raWZpZWRUb2tlbnMucHVzaCh0b2tlbik7XG5cblx0XHRcdC8vIElnbm9yZSBhbGwgdGhlIGNvbnRlbnRzIG9mIGlnbm9yZWQgdGFnc1xuXHRcdFx0dmFyIHRhZ05hbWUgPSB0b2tlbi50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR2YXIgaXNJZ25vcmVkID0gdGFnTmFtZSA9PT0gJ0EnIHx8IG9wdGlvbnMuY29udGFpbnMob3B0cy5pZ25vcmVUYWdzLCB0YWdOYW1lKTtcblx0XHRcdGlmICghaXNJZ25vcmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcHJlc2tpcExlbiA9IGxpbmtpZmllZFRva2Vucy5sZW5ndGg7XG5cdFx0XHRza2lwVGFnVG9rZW5zKHRhZ05hbWUsIHRva2VucywgKytpLCBsaW5raWZpZWRUb2tlbnMpO1xuXHRcdFx0aSArPSBsaW5raWZpZWRUb2tlbnMubGVuZ3RoIC0gcHJlc2tpcExlbiAtIDE7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKHRva2VuLnR5cGUgIT09IENoYXJzKSB7XG5cdFx0XHQvLyBTa2lwIHRoaXMgdG9rZW4sIGl0J3Mgbm90IGltcG9ydGFudFxuXHRcdFx0bGlua2lmaWVkVG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWQgdGV4dCB0b2tlbiwgbGlua2lmeSBpdCFcblx0XHR2YXIgbGlua2lmZWRDaGFycyA9IGxpbmtpZnlDaGFycyh0b2tlbi5jaGFycywgb3B0cyk7XG5cdFx0bGlua2lmaWVkVG9rZW5zLnB1c2guYXBwbHkobGlua2lmaWVkVG9rZW5zLCBsaW5raWZlZENoYXJzKTtcblx0fVxuXG5cdC8vIENvbnZlcnQgdGhlIHRva2VucyBiYWNrIGludG8gYSBzdHJpbmdcblx0Zm9yIChpID0gMDsgaSA8IGxpbmtpZmllZFRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBfdG9rZW4gPSBsaW5raWZpZWRUb2tlbnNbaV07XG5cdFx0c3dpdGNoIChfdG9rZW4udHlwZSkge1xuXHRcdFx0Y2FzZSBTdGFydFRhZzpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHZhciBsaW5rID0gJzwnICsgX3Rva2VuLnRhZ05hbWU7XG5cdFx0XHRcdFx0aWYgKF90b2tlbi5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdHZhciBhdHRycyA9IGF0dHJzVG9TdHJpbmdzKF90b2tlbi5hdHRyaWJ1dGVzKTtcblx0XHRcdFx0XHRcdGxpbmsgKz0gJyAnICsgYXR0cnMuam9pbignICcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsaW5rICs9ICc+Jztcblx0XHRcdFx0XHRsaW5raWZpZWQucHVzaChsaW5rKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBFbmRUYWc6XG5cdFx0XHRcdGxpbmtpZmllZC5wdXNoKCc8LycgKyBfdG9rZW4udGFnTmFtZSArICc+Jyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBDaGFyczpcblx0XHRcdFx0bGlua2lmaWVkLnB1c2goZXNjYXBlVGV4dChfdG9rZW4uY2hhcnMpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIENvbW1lbnQ6XG5cdFx0XHRcdGxpbmtpZmllZC5wdXNoKCc8IS0tJyArIGVzY2FwZVRleHQoX3Rva2VuLmNoYXJzKSArICctLT4nKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGxpbmtpZmllZC5qb2luKCcnKTtcbn1cblxuLyoqXG5cdGB0b2tlbnNgIGFuZCBgdG9rZW5gIGluIHRoaXMgc2VjdGlvbiByZWZlcmVzIHRvIHRva2VucyByZXR1cm5lZCBieVxuXHRgbGlua2lmeS50b2tlbml6ZWAuIGBsaW5raWZpZWRgIHdpbGwgY29udGFpbiBIVE1MIFBhcnNlci1zdHlsZSB0b2tlbnNcbiovXG5mdW5jdGlvbiBsaW5raWZ5Q2hhcnMoc3RyLCBvcHRzKSB7XG5cdHZhciB0b2tlbnMgPSBsaW5raWZ5LnRva2VuaXplKHN0cik7XG5cdHZhciByZXN1bHQgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdGlmICh0b2tlbi50eXBlID09PSAnbmwnICYmIG9wdHMubmwyYnIpIHtcblx0XHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdFx0dHlwZTogU3RhcnRUYWcsXG5cdFx0XHRcdHRhZ05hbWU6ICdicicsXG5cdFx0XHRcdGF0dHJpYnV0ZXM6IFtdLFxuXHRcdFx0XHRzZWxmQ2xvc2luZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKCF0b2tlbi5pc0xpbmsgfHwgIW9wdHMuY2hlY2sodG9rZW4pKSB7XG5cdFx0XHRyZXN1bHQucHVzaCh7IHR5cGU6IENoYXJzLCBjaGFyczogdG9rZW4udG9TdHJpbmcoKSB9KTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciBfb3B0cyRyZXNvbHZlID0gb3B0cy5yZXNvbHZlKHRva2VuKSxcblx0XHQgICAgZm9ybWF0dGVkID0gX29wdHMkcmVzb2x2ZS5mb3JtYXR0ZWQsXG5cdFx0ICAgIGZvcm1hdHRlZEhyZWYgPSBfb3B0cyRyZXNvbHZlLmZvcm1hdHRlZEhyZWYsXG5cdFx0ICAgIHRhZ05hbWUgPSBfb3B0cyRyZXNvbHZlLnRhZ05hbWUsXG5cdFx0ICAgIGNsYXNzTmFtZSA9IF9vcHRzJHJlc29sdmUuY2xhc3NOYW1lLFxuXHRcdCAgICB0YXJnZXQgPSBfb3B0cyRyZXNvbHZlLnRhcmdldCxcblx0XHQgICAgYXR0cmlidXRlcyA9IF9vcHRzJHJlc29sdmUuYXR0cmlidXRlcztcblxuXHRcdC8vIEJ1aWxkIHVwIGF0dHJpYnV0ZXNcblxuXG5cdFx0dmFyIGF0dHJpYnV0ZUFycmF5ID0gW1snaHJlZicsIGZvcm1hdHRlZEhyZWZdXTtcblxuXHRcdGlmIChjbGFzc05hbWUpIHtcblx0XHRcdGF0dHJpYnV0ZUFycmF5LnB1c2goWydjbGFzcycsIGNsYXNzTmFtZV0pO1xuXHRcdH1cblxuXHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdGF0dHJpYnV0ZUFycmF5LnB1c2goWyd0YXJnZXQnLCB0YXJnZXRdKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBhdHRyIGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdGF0dHJpYnV0ZUFycmF5LnB1c2goW2F0dHIsIGF0dHJpYnV0ZXNbYXR0cl1dKTtcblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlcXVpcmVkIHRva2Vuc1xuXHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdHR5cGU6IFN0YXJ0VGFnLFxuXHRcdFx0dGFnTmFtZTogdGFnTmFtZSxcblx0XHRcdGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZUFycmF5LFxuXHRcdFx0c2VsZkNsb3Npbmc6IGZhbHNlXG5cdFx0fSk7XG5cdFx0cmVzdWx0LnB1c2goeyB0eXBlOiBDaGFycywgY2hhcnM6IGZvcm1hdHRlZCB9KTtcblx0XHRyZXN1bHQucHVzaCh7IHR5cGU6IEVuZFRhZywgdGFnTmFtZTogdGFnTmFtZSB9KTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuXHRSZXR1cm5zIGEgbGlzdCBvZiB0b2tlbnMgc2tpcHBlZCB1bnRpbCB0aGUgY2xvc2luZyB0YWcgb2YgdGFnTmFtZS5cblxuXHQqIGB0YWdOYW1lYCBpcyB0aGUgY2xvc2luZyB0YWcgd2hpY2ggd2lsbCBwcm9tcHQgdXMgdG8gc3RvcCBza2lwcGluZ1xuXHQqIGB0b2tlbnNgIGlzIHRoZSBhcnJheSBvZiB0b2tlbnMgZ2VuZXJhdGVkIGJ5IEhUTUw1VG9rZW5pemVyIHdoaWNoXG5cdCogYGlgIGlzIHRoZSBpbmRleCBpbW1lZGlhdGVseSBhZnRlciB0aGUgb3BlbmluZyB0YWcgdG8gc2tpcFxuXHQqIGBza2lwcGVkVG9rZW5zYCBpcyBhbiBhcnJheSB3aGljaCBza2lwcGVkIHRva2VucyBhcmUgYmVpbmcgcHVzaGVkIGludG9cblxuXHRDYXZlYXRzXG5cblx0KiBBc3N1bWVzIHRoYXQgaSBpcyB0aGUgZmlyc3QgdG9rZW4gYWZ0ZXIgdGhlIGdpdmVuIG9wZW5pbmcgdGFnTmFtZVxuXHQqIFRoZSBjbG9zaW5nIHRhZyB3aWxsIGJlIHNraXBwZWQsIGJ1dCBub3RoaW5nIGFmdGVyIGl0XG5cdCogV2lsbCB0cmFjayB3aGV0aGVyIHRoZXJlIGlzIGEgbmVzdGVkIHRhZyBvZiB0aGUgc2FtZSB0eXBlXG4qL1xuZnVuY3Rpb24gc2tpcFRhZ1Rva2Vucyh0YWdOYW1lLCB0b2tlbnMsIGksIHNraXBwZWRUb2tlbnMpIHtcblxuXHQvLyBudW1iZXIgb2YgdG9rZW5zIG9mIHRoaXMgdHlwZSBvbiB0aGUgW2ZpY3Rpb25hbF0gc3RhY2tcblx0dmFyIHN0YWNrQ291bnQgPSAxO1xuXG5cdHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCAmJiBzdGFja0NvdW50ID4gMCkge1xuXHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdGlmICh0b2tlbi50eXBlID09PSBTdGFydFRhZyAmJiB0b2tlbi50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IHRhZ05hbWUpIHtcblx0XHRcdC8vIE5lc3RlZCB0YWcgb2YgdGhlIHNhbWUgdHlwZSwgXCJhZGQgdG8gc3RhY2tcIlxuXHRcdFx0c3RhY2tDb3VudCsrO1xuXHRcdH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gRW5kVGFnICYmIHRva2VuLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gdGFnTmFtZSkge1xuXHRcdFx0Ly8gQ2xvc2luZyB0YWdcblx0XHRcdHN0YWNrQ291bnQtLTtcblx0XHR9XG5cblx0XHRza2lwcGVkVG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIE5vdGUgdGhhdCBpZiBzdGFja0NvdW50ID4gMCBoZXJlLCB0aGUgSFRNTCBpcyBwcm9iYWJseSBpbnZhbGlkXG5cdHJldHVybiBza2lwcGVkVG9rZW5zO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVUZXh0KHRleHQpIHtcblx0Ly8gTm90IHJlcXVpcmVkLCBIVE1MIHRva2VuaXplciBlbnN1cmVzIHRoaXMgb2NjdXJzIHByb3Blcmx5XG5cdHJldHVybiB0ZXh0O1xufVxuXG5mdW5jdGlvbiBlc2NhcGVBdHRyKGF0dHIpIHtcblx0cmV0dXJuIGF0dHIucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBhdHRyc1RvU3RyaW5ncyhhdHRycykge1xuXHR2YXIgYXR0clN0cnMgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBfYXR0cnMkaSA9IGF0dHJzW2ldLFxuXHRcdCAgICBuYW1lID0gX2F0dHJzJGlbMF0sXG5cdFx0ICAgIHZhbHVlID0gX2F0dHJzJGlbMV07XG5cblx0XHRhdHRyU3Rycy5wdXNoKG5hbWUgKyAnPVwiJyArIGVzY2FwZUF0dHIodmFsdWUpICsgJ1wiJyk7XG5cdH1cblx0cmV0dXJuIGF0dHJTdHJzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2xpbmtpZnkgPSByZXF1aXJlKCcuL2xpbmtpZnknKTtcblxudmFyIGxpbmtpZnkgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfbGlua2lmeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIG9wdGlvbnMgPSBsaW5raWZ5Lm9wdGlvbnM7XG52YXIgT3B0aW9ucyA9IG9wdGlvbnMuT3B0aW9ucztcblxuLy8gR2l2ZW4gYSBzdHJpbmcsIGNvbnZlcnRzIHRvIGFuIGFycmF5IG9mIHZhbGlkIFJlYWN0IGNvbXBvbmVudHNcbi8vICh3aGljaCBtYXkgaW5jbHVkZSBzdHJpbmdzKVxuXG5mdW5jdGlvbiBzdHJpbmdUb0VsZW1lbnRzKHN0ciwgb3B0cykge1xuXG5cdHZhciB0b2tlbnMgPSBsaW5raWZ5LnRva2VuaXplKHN0cik7XG5cdHZhciBlbGVtZW50cyA9IFtdO1xuXHR2YXIgbGlua0lkID0gMDtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdGlmICh0b2tlbi50eXBlID09PSAnbmwnICYmIG9wdHMubmwyYnIpIHtcblx0XHRcdGVsZW1lbnRzLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgeyBrZXk6ICdsaW5raWZpZWQtJyArICsrbGlua0lkIH0pKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gZWxzZSBpZiAoIXRva2VuLmlzTGluayB8fCAhb3B0cy5jaGVjayh0b2tlbikpIHtcblx0XHRcdC8vIFJlZ3VsYXIgdGV4dFxuXHRcdFx0ZWxlbWVudHMucHVzaCh0b2tlbi50b1N0cmluZygpKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciBfb3B0cyRyZXNvbHZlID0gb3B0cy5yZXNvbHZlKHRva2VuKSxcblx0XHQgICAgZm9ybWF0dGVkID0gX29wdHMkcmVzb2x2ZS5mb3JtYXR0ZWQsXG5cdFx0ICAgIGZvcm1hdHRlZEhyZWYgPSBfb3B0cyRyZXNvbHZlLmZvcm1hdHRlZEhyZWYsXG5cdFx0ICAgIHRhZ05hbWUgPSBfb3B0cyRyZXNvbHZlLnRhZ05hbWUsXG5cdFx0ICAgIGNsYXNzTmFtZSA9IF9vcHRzJHJlc29sdmUuY2xhc3NOYW1lLFxuXHRcdCAgICB0YXJnZXQgPSBfb3B0cyRyZXNvbHZlLnRhcmdldCxcblx0XHQgICAgYXR0cmlidXRlcyA9IF9vcHRzJHJlc29sdmUuYXR0cmlidXRlcztcblxuXHRcdHZhciBwcm9wcyA9IHtcblx0XHRcdGtleTogJ2xpbmtpZmllZC0nICsgKytsaW5rSWQsXG5cdFx0XHRocmVmOiBmb3JtYXR0ZWRIcmVmXG5cdFx0fTtcblxuXHRcdGlmIChjbGFzc05hbWUpIHtcblx0XHRcdHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0XHR9XG5cblx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRwcm9wcy50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gQnVpbGQgdXAgYWRkaXRpb25hbCBhdHRyaWJ1dGVzXG5cdFx0Ly8gU3VwcG9ydCBmb3IgZXZlbnRzIHZpYSBhdHRyaWJ1dGVzIGhhc2hcblx0XHRpZiAoYXR0cmlidXRlcykge1xuXHRcdFx0Zm9yICh2YXIgYXR0ciBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHByb3BzW2F0dHJdID0gYXR0cmlidXRlc1thdHRyXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRlbGVtZW50cy5wdXNoKF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBmb3JtYXR0ZWQpKTtcblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn1cblxuLy8gUmVjdXJzaXZlbHkgbGlua2lmeSB0aGUgY29udGVudHMgb2YgdGhlIGdpdmVuIFJlYWN0IEVsZW1lbnQgaW5zdGFuY2VcbmZ1bmN0aW9uIGxpbmtpZnlSZWFjdEVsZW1lbnQoZWxlbWVudCwgb3B0cykge1xuXHR2YXIgZWxlbWVudElkID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAwO1xuXG5cdGlmIChfcmVhY3QyLmRlZmF1bHQuQ2hpbGRyZW4uY291bnQoZWxlbWVudC5wcm9wcy5jaGlsZHJlbikgPT09IDApIHtcblx0XHQvLyBObyBuZWVkIHRvIGNsb25lIGlmIHRoZSBlbGVtZW50IGhhZCBubyBjaGlsZHJlblxuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9XG5cblx0dmFyIGNoaWxkcmVuID0gW107XG5cblx0X3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLmZvckVhY2goZWxlbWVudC5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG5cdFx0aWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIGVuc3VyZSB0aGF0IHdlIGFsd2F5cyBnZW5lcmF0ZSB1bmlxdWUgZWxlbWVudCBJRHMgZm9yIGtleXNcblx0XHRcdGVsZW1lbnRJZCA9IGVsZW1lbnRJZCArIDE7XG5cdFx0XHRjaGlsZHJlbi5wdXNoLmFwcGx5KGNoaWxkcmVuLCBzdHJpbmdUb0VsZW1lbnRzKGNoaWxkLCBvcHRzKSk7XG5cdFx0fSBlbHNlIGlmIChfcmVhY3QyLmRlZmF1bHQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG5cdFx0XHRpZiAodHlwZW9mIGNoaWxkLnR5cGUgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMuY29udGFpbnMob3B0cy5pZ25vcmVUYWdzLCBjaGlsZC50eXBlLnRvVXBwZXJDYXNlKCkpKSB7XG5cdFx0XHRcdC8vIERvbid0IGxpbmtpZnkgdGhpcyBlbGVtZW50XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChsaW5raWZ5UmVhY3RFbGVtZW50KGNoaWxkLCBvcHRzLCArK2VsZW1lbnRJZCkpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBVbmtub3duIGVsZW1lbnQgdHlwZSwganVzdCBwdXNoXG5cdFx0XHRjaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFNldCBhIGRlZmF1bHQgdW5pcXVlIGtleSwgY29weSBvdmVyIHJlbWFpbmluZyBwcm9wc1xuXHR2YXIgbmV3UHJvcHMgPSB7IGtleTogJ2xpbmtpZmllZC1lbGVtZW50LScgKyBlbGVtZW50SWQgfTtcblx0Zm9yICh2YXIgcHJvcCBpbiBlbGVtZW50LnByb3BzKSB7XG5cdFx0bmV3UHJvcHNbcHJvcF0gPSBlbGVtZW50LnByb3BzW3Byb3BdO1xuXHR9XG5cblx0cmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwgbmV3UHJvcHMsIGNoaWxkcmVuKTtcbn1cblxudmFyIExpbmtpZnkgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRfaW5oZXJpdHMoTGlua2lmeSwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gTGlua2lmeSgpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGlua2lmeSk7XG5cblx0XHRyZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcblx0fVxuXG5cdExpbmtpZnkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHQvLyBDb3B5IG92ZXIgYWxsIG5vbi1saW5raWZ5LXNwZWNpZmljIHByb3BzXG5cdFx0dmFyIG5ld1Byb3BzID0geyBrZXk6ICdsaW5raWZpZWQtZWxlbWVudC0wJyB9O1xuXHRcdGZvciAodmFyIHByb3AgaW4gdGhpcy5wcm9wcykge1xuXHRcdFx0aWYgKHByb3AgIT09ICdvcHRpb25zJyAmJiBwcm9wICE9PSAndGFnTmFtZScpIHtcblx0XHRcdFx0bmV3UHJvcHNbcHJvcF0gPSB0aGlzLnByb3BzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBvcHRzID0gbmV3IE9wdGlvbnModGhpcy5wcm9wcy5vcHRpb25zKTtcblx0XHR2YXIgdGFnTmFtZSA9IHRoaXMucHJvcHMudGFnTmFtZSB8fCAnc3Bhbic7XG5cdFx0dmFyIGVsZW1lbnQgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBuZXdQcm9wcyk7XG5cblx0XHRyZXR1cm4gbGlua2lmeVJlYWN0RWxlbWVudChlbGVtZW50LCBvcHRzLCAwKTtcblx0fTtcblxuXHRyZXR1cm4gTGlua2lmeTtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtpZnk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy50b2tlbml6ZSA9IGV4cG9ydHMudGVzdCA9IGV4cG9ydHMuc2Nhbm5lciA9IGV4cG9ydHMucGFyc2VyID0gZXhwb3J0cy5vcHRpb25zID0gZXhwb3J0cy5pbmhlcml0cyA9IGV4cG9ydHMuZmluZCA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzcyA9IHJlcXVpcmUoJy4vbGlua2lmeS91dGlscy9jbGFzcycpO1xuXG52YXIgX29wdGlvbnMgPSByZXF1aXJlKCcuL2xpbmtpZnkvdXRpbHMvb3B0aW9ucycpO1xuXG52YXIgb3B0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9vcHRpb25zKTtcblxudmFyIF9zY2FubmVyID0gcmVxdWlyZSgnLi9saW5raWZ5L2NvcmUvc2Nhbm5lcicpO1xuXG52YXIgc2Nhbm5lciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zY2FubmVyKTtcblxudmFyIF9wYXJzZXIgPSByZXF1aXJlKCcuL2xpbmtpZnkvY29yZS9wYXJzZXInKTtcblxudmFyIHBhcnNlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9wYXJzZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcblx0QXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uIChhcmcpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH07XG59XG5cbi8qKlxuXHRDb252ZXJ0cyBhIHN0cmluZyBpbnRvIHRva2VucyB0aGF0IHJlcHJlc2VudCBsaW5rYWJsZSBhbmQgbm9uLWxpbmthYmxlIGJpdHNcblx0QG1ldGhvZCB0b2tlbml6ZVxuXHRAcGFyYW0ge1N0cmluZ30gc3RyXG5cdEByZXR1cm4ge0FycmF5fSB0b2tlbnNcbiovXG52YXIgdG9rZW5pemUgPSBmdW5jdGlvbiB0b2tlbml6ZShzdHIpIHtcblx0cmV0dXJuIHBhcnNlci5ydW4oc2Nhbm5lci5ydW4oc3RyKSk7XG59O1xuXG4vKipcblx0UmV0dXJucyBhIGxpc3Qgb2YgbGlua2FibGUgaXRlbXMgaW4gdGhlIGdpdmVuIHN0cmluZy5cbiovXG52YXIgZmluZCA9IGZ1bmN0aW9uIGZpbmQoc3RyKSB7XG5cdHZhciB0eXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuXG5cdHZhciB0b2tlbnMgPSB0b2tlbml6ZShzdHIpO1xuXHR2YXIgZmlsdGVyZWQgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblx0XHRpZiAodG9rZW4uaXNMaW5rICYmICghdHlwZSB8fCB0b2tlbi50eXBlID09PSB0eXBlKSkge1xuXHRcdFx0ZmlsdGVyZWQucHVzaCh0b2tlbi50b09iamVjdCgpKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmlsdGVyZWQ7XG59O1xuXG4vKipcblx0SXMgdGhlIGdpdmVuIHN0cmluZyB2YWxpZCBsaW5rYWJsZSB0ZXh0IG9mIHNvbWUgc29ydFxuXHROb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCB0cmltIHRoZSB0ZXh0IGZvciB5b3UuXG5cblx0T3B0aW9uYWxseSBwYXNzIGluIGEgc2Vjb25kIGB0eXBlYCBwYXJhbSwgd2hpY2ggaXMgdGhlIHR5cGUgb2YgbGluayB0byB0ZXN0XG5cdGZvci5cblxuXHRGb3IgZXhhbXBsZSxcblxuXHRcdHRlc3Qoc3RyLCAnZW1haWwnKTtcblxuXHRXaWxsIHJldHVybiBgdHJ1ZWAgaWYgc3RyIGlzIGEgdmFsaWQgZW1haWwuXG4qL1xudmFyIHRlc3QgPSBmdW5jdGlvbiB0ZXN0KHN0cikge1xuXHR2YXIgdHlwZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuXHR2YXIgdG9rZW5zID0gdG9rZW5pemUoc3RyKTtcblx0cmV0dXJuIHRva2Vucy5sZW5ndGggPT09IDEgJiYgdG9rZW5zWzBdLmlzTGluayAmJiAoIXR5cGUgfHwgdG9rZW5zWzBdLnR5cGUgPT09IHR5cGUpO1xufTtcblxuLy8gU2Nhbm5lciBhbmQgcGFyc2VyIHByb3ZpZGUgc3RhdGVzIGFuZCB0b2tlbnMgZm9yIHRoZSBsZXhpY29ncmFwaGljIHN0YWdlXG4vLyAod2lsbCBiZSB1c2VkIHRvIGFkZCBhZGRpdGlvbmFsIGxpbmsgdHlwZXMpXG5leHBvcnRzLmZpbmQgPSBmaW5kO1xuZXhwb3J0cy5pbmhlcml0cyA9IF9jbGFzcy5pbmhlcml0cztcbmV4cG9ydHMub3B0aW9ucyA9IG9wdGlvbnM7XG5leHBvcnRzLnBhcnNlciA9IHBhcnNlcjtcbmV4cG9ydHMuc2Nhbm5lciA9IHNjYW5uZXI7XG5leHBvcnRzLnRlc3QgPSB0ZXN0O1xuZXhwb3J0cy50b2tlbml6ZSA9IHRva2VuaXplOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuc3RhcnQgPSBleHBvcnRzLnJ1biA9IGV4cG9ydHMuVE9LRU5TID0gZXhwb3J0cy5TdGF0ZSA9IHVuZGVmaW5lZDtcblxudmFyIF9zdGF0ZSA9IHJlcXVpcmUoJy4vc3RhdGUnKTtcblxudmFyIF9tdWx0aSA9IHJlcXVpcmUoJy4vdG9rZW5zL211bHRpJyk7XG5cbnZhciBNVUxUSV9UT0tFTlMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfbXVsdGkpO1xuXG52YXIgX3RleHQgPSByZXF1aXJlKCcuL3Rva2Vucy90ZXh0Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbi8qKlxuXHROb3QgZXhhY3RseSBwYXJzZXIsIG1vcmUgbGlrZSB0aGUgc2Vjb25kLXN0YWdlIHNjYW5uZXIgKGFsdGhvdWdoIHdlIGNhblxuXHR0aGVvcmV0aWNhbGx5IGhvdHN3YXAgdGhlIGNvZGUgaGVyZSB3aXRoIGEgcmVhbCBwYXJzZXIgaW4gdGhlIGZ1dHVyZS4uLiBidXRcblx0Zm9yIGEgbGl0dGxlIFVSTC1maW5kaW5nIHV0aWxpdHkgYWJzdHJhY3Qgc3ludGF4IHRyZWVzIG1heSBiZSBhIGxpdHRsZVxuXHRvdmVya2lsbCkuXG5cblx0VVJMIGZvcm1hdDogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VUklfc2NoZW1lXG5cdEVtYWlsIGZvcm1hdDogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbWFpbF9hZGRyZXNzIChsaW5rcyB0byBSRkMgaW5cblx0cmVmZXJlbmNlKVxuXG5cdEBtb2R1bGUgbGlua2lmeVxuXHRAc3VibW9kdWxlIHBhcnNlclxuXHRAbWFpbiBwYXJzZXJcbiovXG5cbnZhciBtYWtlU3RhdGUgPSBmdW5jdGlvbiBtYWtlU3RhdGUodG9rZW5DbGFzcykge1xuXHRyZXR1cm4gbmV3IF9zdGF0ZS5Ub2tlblN0YXRlKHRva2VuQ2xhc3MpO1xufTtcblxuLy8gVGhlIHVuaXZlcnNhbCBzdGFydGluZyBzdGF0ZS5cbnZhciBTX1NUQVJUID0gbWFrZVN0YXRlKCk7XG5cbi8vIEludGVybWVkaWF0ZSBzdGF0ZXMgZm9yIFVSTHMuIE5vdGUgdGhhdCBkb21haW5zIHRoYXQgYmVnaW4gd2l0aCBhIHByb3RvY29sXG4vLyBhcmUgdHJlYXRlZCBzbGlnaGx5IGRpZmZlcmVudGx5IGZyb20gdGhvc2UgdGhhdCBkb24ndC5cbnZhciBTX1BST1RPQ09MID0gbWFrZVN0YXRlKCk7IC8vIGUuZy4sICdodHRwOidcbnZhciBTX01BSUxUTyA9IG1ha2VTdGF0ZSgpOyAvLyAnbWFpbHRvOidcbnZhciBTX1BST1RPQ09MX1NMQVNIID0gbWFrZVN0YXRlKCk7IC8vIGUuZy4sICcvJywgJ2h0dHA6LycnXG52YXIgU19QUk9UT0NPTF9TTEFTSF9TTEFTSCA9IG1ha2VTdGF0ZSgpOyAvLyBlLmcuLCAnLy8nLCAnaHR0cDovLydcbnZhciBTX0RPTUFJTiA9IG1ha2VTdGF0ZSgpOyAvLyBwYXJzZWQgc3RyaW5nIGVuZHMgd2l0aCBhIHBvdGVudGlhbCBkb21haW4gbmFtZSAoQSlcbnZhciBTX0RPTUFJTl9ET1QgPSBtYWtlU3RhdGUoKTsgLy8gKEEpIGRvbWFpbiBmb2xsb3dlZCBieSBET1RcbnZhciBTX1RMRCA9IG1ha2VTdGF0ZShfbXVsdGkuVVJMKTsgLy8gKEEpIFNpbXBsZXN0IHBvc3NpYmxlIFVSTCB3aXRoIG5vIHF1ZXJ5IHN0cmluZ1xudmFyIFNfVExEX0NPTE9OID0gbWFrZVN0YXRlKCk7IC8vIChBKSBVUkwgZm9sbG93ZWQgYnkgY29sb24gKHBvdGVudGlhbCBwb3J0IG51bWJlciBoZXJlKVxudmFyIFNfVExEX1BPUlQgPSBtYWtlU3RhdGUoX211bHRpLlVSTCk7IC8vIFRMRCBmb2xsb3dlZCBieSBhIHBvcnQgbnVtYmVyXG52YXIgU19VUkwgPSBtYWtlU3RhdGUoX211bHRpLlVSTCk7IC8vIExvbmcgVVJMIHdpdGggb3B0aW9uYWwgcG9ydCBhbmQgbWF5YmUgcXVlcnkgc3RyaW5nXG52YXIgU19VUkxfTk9OX0FDQ0VQVElORyA9IG1ha2VTdGF0ZSgpOyAvLyBVUkwgZm9sbG93ZWQgYnkgc29tZSBzeW1ib2xzICh3aWxsIG5vdCBiZSBwYXJ0IG9mIHRoZSBmaW5hbCBVUkwpXG52YXIgU19VUkxfT1BFTkJSQUNFID0gbWFrZVN0YXRlKCk7IC8vIFVSTCBmb2xsb3dlZCBieSB7XG52YXIgU19VUkxfT1BFTkJSQUNLRVQgPSBtYWtlU3RhdGUoKTsgLy8gVVJMIGZvbGxvd2VkIGJ5IFtcbnZhciBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUID0gbWFrZVN0YXRlKCk7IC8vIFVSTCBmb2xsb3dlZCBieSA8XG52YXIgU19VUkxfT1BFTlBBUkVOID0gbWFrZVN0YXRlKCk7IC8vIFVSTCBmb2xsb3dlZCBieSAoXG52YXIgU19VUkxfT1BFTkJSQUNFX1EgPSBtYWtlU3RhdGUoX211bHRpLlVSTCk7IC8vIFVSTCBmb2xsb3dlZCBieSB7IGFuZCBzb21lIHN5bWJvbHMgdGhhdCB0aGUgVVJMIGNhbiBlbmQgaXRcbnZhciBTX1VSTF9PUEVOQlJBQ0tFVF9RID0gbWFrZVN0YXRlKF9tdWx0aS5VUkwpOyAvLyBVUkwgZm9sbG93ZWQgYnkgWyBhbmQgc29tZSBzeW1ib2xzIHRoYXQgdGhlIFVSTCBjYW4gZW5kIGl0XG52YXIgU19VUkxfT1BFTkFOR0xFQlJBQ0tFVF9RID0gbWFrZVN0YXRlKF9tdWx0aS5VUkwpOyAvLyBVUkwgZm9sbG93ZWQgYnkgPCBhbmQgc29tZSBzeW1ib2xzIHRoYXQgdGhlIFVSTCBjYW4gZW5kIGl0XG52YXIgU19VUkxfT1BFTlBBUkVOX1EgPSBtYWtlU3RhdGUoX211bHRpLlVSTCk7IC8vIFVSTCBmb2xsb3dlZCBieSAoIGFuZCBzb21lIHN5bWJvbHMgdGhhdCB0aGUgVVJMIGNhbiBlbmQgaXRcbnZhciBTX1VSTF9PUEVOQlJBQ0VfU1lNUyA9IG1ha2VTdGF0ZSgpOyAvLyBTX1VSTF9PUEVOQlJBQ0VfUSBmb2xsb3dlZCBieSBzb21lIHN5bWJvbHMgaXQgY2Fubm90IGVuZCBpdFxudmFyIFNfVVJMX09QRU5CUkFDS0VUX1NZTVMgPSBtYWtlU3RhdGUoKTsgLy8gU19VUkxfT1BFTkJSQUNLRVRfUSBmb2xsb3dlZCBieSBzb21lIHN5bWJvbHMgaXQgY2Fubm90IGVuZCBpdFxudmFyIFNfVVJMX09QRU5BTkdMRUJSQUNLRVRfU1lNUyA9IG1ha2VTdGF0ZSgpOyAvLyBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1EgZm9sbG93ZWQgYnkgc29tZSBzeW1ib2xzIGl0IGNhbm5vdCBlbmQgaXRcbnZhciBTX1VSTF9PUEVOUEFSRU5fU1lNUyA9IG1ha2VTdGF0ZSgpOyAvLyBTX1VSTF9PUEVOUEFSRU5fUSBmb2xsb3dlZCBieSBzb21lIHN5bWJvbHMgaXQgY2Fubm90IGVuZCBpdFxudmFyIFNfRU1BSUxfRE9NQUlOID0gbWFrZVN0YXRlKCk7IC8vIHBhcnNlZCBzdHJpbmcgc3RhcnRzIHdpdGggbG9jYWwgZW1haWwgaW5mbyArIEAgd2l0aCBhIHBvdGVudGlhbCBkb21haW4gbmFtZSAoQylcbnZhciBTX0VNQUlMX0RPTUFJTl9ET1QgPSBtYWtlU3RhdGUoKTsgLy8gKEMpIGRvbWFpbiBmb2xsb3dlZCBieSBET1RcbnZhciBTX0VNQUlMID0gbWFrZVN0YXRlKF9tdWx0aS5FTUFJTCk7IC8vIChDKSBQb3NzaWJsZSBlbWFpbCBhZGRyZXNzIChjb3VsZCBoYXZlIG1vcmUgdGxkcylcbnZhciBTX0VNQUlMX0NPTE9OID0gbWFrZVN0YXRlKCk7IC8vIChDKSBVUkwgZm9sbG93ZWQgYnkgY29sb24gKHBvdGVudGlhbCBwb3J0IG51bWJlciBoZXJlKVxudmFyIFNfRU1BSUxfUE9SVCA9IG1ha2VTdGF0ZShfbXVsdGkuRU1BSUwpOyAvLyAoQykgRW1haWwgYWRkcmVzcyB3aXRoIGEgcG9ydFxudmFyIFNfTUFJTFRPX0VNQUlMID0gbWFrZVN0YXRlKF9tdWx0aS5NQUlMVE9FTUFJTCk7IC8vIEVtYWlsIHRoYXQgYmVnaW5zIHdpdGggdGhlIG1haWx0byBwcmVmaXggKEQpXG52YXIgU19NQUlMVE9fRU1BSUxfTk9OX0FDQ0VQVElORyA9IG1ha2VTdGF0ZSgpOyAvLyAoRCkgRm9sbG93ZWQgYnkgc29tZSBub24tcXVlcnkgc3RyaW5nIGNoYXJzXG52YXIgU19MT0NBTFBBUlQgPSBtYWtlU3RhdGUoKTsgLy8gTG9jYWwgcGFydCBvZiB0aGUgZW1haWwgYWRkcmVzc1xudmFyIFNfTE9DQUxQQVJUX0FUID0gbWFrZVN0YXRlKCk7IC8vIExvY2FsIHBhcnQgb2YgdGhlIGVtYWlsIGFkZHJlc3MgcGx1cyBAXG52YXIgU19MT0NBTFBBUlRfRE9UID0gbWFrZVN0YXRlKCk7IC8vIExvY2FsIHBhcnQgb2YgdGhlIGVtYWlsIGFkZHJlc3MgcGx1cyAnLicgKGxvY2FscGFydCBjYW5ub3QgZW5kIGluIC4pXG52YXIgU19OTCA9IG1ha2VTdGF0ZShfbXVsdGkuTkwpOyAvLyBzaW5nbGUgbmV3IGxpbmVcblxuLy8gTWFrZSBwYXRoIGZyb20gc3RhcnQgdG8gcHJvdG9jb2wgKHdpdGggJy8vJylcblNfU1RBUlQub24oX3RleHQuTkwsIFNfTkwpLm9uKF90ZXh0LlBST1RPQ09MLCBTX1BST1RPQ09MKS5vbihfdGV4dC5NQUlMVE8sIFNfTUFJTFRPKS5vbihfdGV4dC5TTEFTSCwgU19QUk9UT0NPTF9TTEFTSCk7XG5cblNfUFJPVE9DT0wub24oX3RleHQuU0xBU0gsIFNfUFJPVE9DT0xfU0xBU0gpO1xuU19QUk9UT0NPTF9TTEFTSC5vbihfdGV4dC5TTEFTSCwgU19QUk9UT0NPTF9TTEFTSF9TTEFTSCk7XG5cbi8vIFRoZSB2ZXJ5IGZpcnN0IHBvdGVudGlhbCBkb21haW4gbmFtZVxuU19TVEFSVC5vbihfdGV4dC5UTEQsIFNfRE9NQUlOKS5vbihfdGV4dC5ET01BSU4sIFNfRE9NQUlOKS5vbihfdGV4dC5MT0NBTEhPU1QsIFNfVExEKS5vbihfdGV4dC5OVU0sIFNfRE9NQUlOKTtcblxuLy8gRm9yY2UgVVJMIGZvciBwcm90b2NvbCBmb2xsb3dlZCBieSBhbnl0aGluZyBzYW5lXG5TX1BST1RPQ09MX1NMQVNIX1NMQVNILm9uKF90ZXh0LlRMRCwgU19VUkwpLm9uKF90ZXh0LkRPTUFJTiwgU19VUkwpLm9uKF90ZXh0Lk5VTSwgU19VUkwpLm9uKF90ZXh0LkxPQ0FMSE9TVCwgU19VUkwpO1xuXG4vLyBBY2NvdW50IGZvciBkb3RzIGFuZCBoeXBoZW5zXG4vLyBoeXBoZW5zIGFyZSB1c3VhbGx5IHBhcnRzIG9mIGRvbWFpbiBuYW1lc1xuU19ET01BSU4ub24oX3RleHQuRE9ULCBTX0RPTUFJTl9ET1QpO1xuU19FTUFJTF9ET01BSU4ub24oX3RleHQuRE9ULCBTX0VNQUlMX0RPTUFJTl9ET1QpO1xuXG4vLyBIeXBoZW4gY2FuIGp1bXAgYmFjayB0byBhIGRvbWFpbiBuYW1lXG5cbi8vIEFmdGVyIHRoZSBmaXJzdCBkb21haW4gYW5kIGEgZG90LCB3ZSBjYW4gZmluZCBlaXRoZXIgYSBVUkwgb3IgYW5vdGhlciBkb21haW5cblNfRE9NQUlOX0RPVC5vbihfdGV4dC5UTEQsIFNfVExEKS5vbihfdGV4dC5ET01BSU4sIFNfRE9NQUlOKS5vbihfdGV4dC5OVU0sIFNfRE9NQUlOKS5vbihfdGV4dC5MT0NBTEhPU1QsIFNfRE9NQUlOKTtcblxuU19FTUFJTF9ET01BSU5fRE9ULm9uKF90ZXh0LlRMRCwgU19FTUFJTCkub24oX3RleHQuRE9NQUlOLCBTX0VNQUlMX0RPTUFJTikub24oX3RleHQuTlVNLCBTX0VNQUlMX0RPTUFJTikub24oX3RleHQuTE9DQUxIT1NULCBTX0VNQUlMX0RPTUFJTik7XG5cbi8vIFNfVExEIGFjY2VwdHMhIEJ1dCB0aGUgVVJMIGNvdWxkIGJlIGxvbmdlciwgdHJ5IHRvIGZpbmQgYSBtYXRjaCBncmVlZGlseVxuLy8gVGhlIGBydW5gIGZ1bmN0aW9uIHNob3VsZCBiZSBhYmxlIHRvIFwicm9sbGJhY2tcIiB0byB0aGUgYWNjZXB0aW5nIHN0YXRlXG5TX1RMRC5vbihfdGV4dC5ET1QsIFNfRE9NQUlOX0RPVCk7XG5TX0VNQUlMLm9uKF90ZXh0LkRPVCwgU19FTUFJTF9ET01BSU5fRE9UKTtcblxuLy8gQmVjb21lIHJlYWwgVVJMcyBhZnRlciBgU0xBU0hgIG9yIGBDT0xPTiBOVU0gU0xBU0hgXG4vLyBIZXJlIFBTUyBhbmQgbm9uLVBTUyBjb252ZXJnZVxuU19UTEQub24oX3RleHQuQ09MT04sIFNfVExEX0NPTE9OKS5vbihfdGV4dC5TTEFTSCwgU19VUkwpO1xuU19UTERfQ09MT04ub24oX3RleHQuTlVNLCBTX1RMRF9QT1JUKTtcblNfVExEX1BPUlQub24oX3RleHQuU0xBU0gsIFNfVVJMKTtcblNfRU1BSUwub24oX3RleHQuQ09MT04sIFNfRU1BSUxfQ09MT04pO1xuU19FTUFJTF9DT0xPTi5vbihfdGV4dC5OVU0sIFNfRU1BSUxfUE9SVCk7XG5cbi8vIFR5cGVzIG9mIGNoYXJhY3RlcnMgdGhlIFVSTCBjYW4gZGVmaW5pdGVseSBlbmQgaW5cbnZhciBxc0FjY2VwdGluZyA9IFtfdGV4dC5ET01BSU4sIF90ZXh0LkFULCBfdGV4dC5MT0NBTEhPU1QsIF90ZXh0Lk5VTSwgX3RleHQuUExVUywgX3RleHQuUE9VTkQsIF90ZXh0LlBST1RPQ09MLCBfdGV4dC5TTEFTSCwgX3RleHQuVExELCBfdGV4dC5VTkRFUlNDT1JFLCBfdGV4dC5TWU0sIF90ZXh0LkFNUEVSU0FORF07XG5cbi8vIFR5cGVzIG9mIHRva2VucyB0aGF0IGNhbiBmb2xsb3cgYSBVUkwgYW5kIGJlIHBhcnQgb2YgdGhlIHF1ZXJ5IHN0cmluZ1xuLy8gYnV0IGNhbm5vdCBiZSB0aGUgdmVyeSBsYXN0IGNoYXJhY3RlcnNcbi8vIENoYXJhY3RlcnMgdGhhdCBjYW5ub3QgYXBwZWFyIGluIHRoZSBVUkwgYXQgYWxsIHNob3VsZCBiZSBleGNsdWRlZFxudmFyIHFzTm9uQWNjZXB0aW5nID0gW190ZXh0LkNPTE9OLCBfdGV4dC5ET1QsIF90ZXh0LlFVRVJZLCBfdGV4dC5QVU5DVFVBVElPTiwgX3RleHQuQ0xPU0VCUkFDRSwgX3RleHQuQ0xPU0VCUkFDS0VULCBfdGV4dC5DTE9TRUFOR0xFQlJBQ0tFVCwgX3RleHQuQ0xPU0VQQVJFTiwgX3RleHQuT1BFTkJSQUNFLCBfdGV4dC5PUEVOQlJBQ0tFVCwgX3RleHQuT1BFTkFOR0xFQlJBQ0tFVCwgX3RleHQuT1BFTlBBUkVOXTtcblxuLy8gVGhlc2Ugc3RhdGVzIGFyZSByZXNwb25zaWJsZSBwcmltYXJpbHkgZm9yIGRldGVybWluaW5nIHdoZXRoZXIgb3Igbm90IHRvXG4vLyBpbmNsdWRlIHRoZSBmaW5hbCByb3VuZCBicmFja2V0LlxuXG4vLyBVUkwsIGZvbGxvd2VkIGJ5IGFuIG9wZW5pbmcgYnJhY2tldFxuU19VUkwub24oX3RleHQuT1BFTkJSQUNFLCBTX1VSTF9PUEVOQlJBQ0UpLm9uKF90ZXh0Lk9QRU5CUkFDS0VULCBTX1VSTF9PUEVOQlJBQ0tFVCkub24oX3RleHQuT1BFTkFOR0xFQlJBQ0tFVCwgU19VUkxfT1BFTkFOR0xFQlJBQ0tFVCkub24oX3RleHQuT1BFTlBBUkVOLCBTX1VSTF9PUEVOUEFSRU4pO1xuXG4vLyBVUkwgd2l0aCBleHRyYSBzeW1ib2xzIGF0IHRoZSBlbmQsIGZvbGxvd2VkIGJ5IGFuIG9wZW5pbmcgYnJhY2tldFxuU19VUkxfTk9OX0FDQ0VQVElORy5vbihfdGV4dC5PUEVOQlJBQ0UsIFNfVVJMX09QRU5CUkFDRSkub24oX3RleHQuT1BFTkJSQUNLRVQsIFNfVVJMX09QRU5CUkFDS0VUKS5vbihfdGV4dC5PUEVOQU5HTEVCUkFDS0VULCBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUKS5vbihfdGV4dC5PUEVOUEFSRU4sIFNfVVJMX09QRU5QQVJFTik7XG5cbi8vIENsb3NpbmcgYnJhY2tldCBjb21wb25lbnQuIFRoaXMgY2hhcmFjdGVyIFdJTEwgYmUgaW5jbHVkZWQgaW4gdGhlIFVSTFxuU19VUkxfT1BFTkJSQUNFLm9uKF90ZXh0LkNMT1NFQlJBQ0UsIFNfVVJMKTtcblNfVVJMX09QRU5CUkFDS0VULm9uKF90ZXh0LkNMT1NFQlJBQ0tFVCwgU19VUkwpO1xuU19VUkxfT1BFTkFOR0xFQlJBQ0tFVC5vbihfdGV4dC5DTE9TRUFOR0xFQlJBQ0tFVCwgU19VUkwpO1xuU19VUkxfT1BFTlBBUkVOLm9uKF90ZXh0LkNMT1NFUEFSRU4sIFNfVVJMKTtcblNfVVJMX09QRU5CUkFDRV9RLm9uKF90ZXh0LkNMT1NFQlJBQ0UsIFNfVVJMKTtcblNfVVJMX09QRU5CUkFDS0VUX1Eub24oX3RleHQuQ0xPU0VCUkFDS0VULCBTX1VSTCk7XG5TX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1Eub24oX3RleHQuQ0xPU0VBTkdMRUJSQUNLRVQsIFNfVVJMKTtcblNfVVJMX09QRU5QQVJFTl9RLm9uKF90ZXh0LkNMT1NFUEFSRU4sIFNfVVJMKTtcblNfVVJMX09QRU5CUkFDRV9TWU1TLm9uKF90ZXh0LkNMT1NFQlJBQ0UsIFNfVVJMKTtcblNfVVJMX09QRU5CUkFDS0VUX1NZTVMub24oX3RleHQuQ0xPU0VCUkFDS0VULCBTX1VSTCk7XG5TX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1NZTVMub24oX3RleHQuQ0xPU0VBTkdMRUJSQUNLRVQsIFNfVVJMKTtcblNfVVJMX09QRU5QQVJFTl9TWU1TLm9uKF90ZXh0LkNMT1NFUEFSRU4sIFNfVVJMKTtcblxuLy8gVVJMIHRoYXQgYmVpbmdzIHdpdGggYW4gb3BlbmluZyBicmFja2V0LCBmb2xsb3dlZCBieSBhIHN5bWJvbHMuXG4vLyBOb3RlIHRoYXQgdGhlIGZpbmFsIHN0YXRlIGNhbiBzdGlsbCBiZSBgU19VUkxfT1BFTkJSQUNFX1FgIChpZiB0aGUgVVJMIG9ubHlcbi8vIGhhcyBhIHNpbmdsZSBvcGVuaW5nIGJyYWNrZXQgZm9yIHNvbWUgcmVhc29uKS5cblNfVVJMX09QRU5CUkFDRS5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTkJSQUNFX1EpO1xuU19VUkxfT1BFTkJSQUNLRVQub24ocXNBY2NlcHRpbmcsIFNfVVJMX09QRU5CUkFDS0VUX1EpO1xuU19VUkxfT1BFTkFOR0xFQlJBQ0tFVC5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTkFOR0xFQlJBQ0tFVF9RKTtcblNfVVJMX09QRU5QQVJFTi5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTlBBUkVOX1EpO1xuU19VUkxfT1BFTkJSQUNFLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOQlJBQ0VfU1lNUyk7XG5TX1VSTF9PUEVOQlJBQ0tFVC5vbihxc05vbkFjY2VwdGluZywgU19VUkxfT1BFTkJSQUNLRVRfU1lNUyk7XG5TX1VSTF9PUEVOQU5HTEVCUkFDS0VULm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1NZTVMpO1xuU19VUkxfT1BFTlBBUkVOLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOUEFSRU5fU1lNUyk7XG5cbi8vIFVSTCB0aGF0IGJlZ2lucyB3aXRoIGFuIG9wZW5pbmcgYnJhY2tldCwgZm9sbG93ZWQgYnkgc29tZSBzeW1ib2xzXG5TX1VSTF9PUEVOQlJBQ0VfUS5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTkJSQUNFX1EpO1xuU19VUkxfT1BFTkJSQUNLRVRfUS5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTkJSQUNLRVRfUSk7XG5TX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1Eub24ocXNBY2NlcHRpbmcsIFNfVVJMX09QRU5BTkdMRUJSQUNLRVRfUSk7XG5TX1VSTF9PUEVOUEFSRU5fUS5vbihxc0FjY2VwdGluZywgU19VUkxfT1BFTlBBUkVOX1EpO1xuU19VUkxfT1BFTkJSQUNFX1Eub24ocXNOb25BY2NlcHRpbmcsIFNfVVJMX09QRU5CUkFDRV9RKTtcblNfVVJMX09QRU5CUkFDS0VUX1Eub24ocXNOb25BY2NlcHRpbmcsIFNfVVJMX09QRU5CUkFDS0VUX1EpO1xuU19VUkxfT1BFTkFOR0xFQlJBQ0tFVF9RLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1EpO1xuU19VUkxfT1BFTlBBUkVOX1Eub24ocXNOb25BY2NlcHRpbmcsIFNfVVJMX09QRU5QQVJFTl9RKTtcblxuU19VUkxfT1BFTkJSQUNFX1NZTVMub24ocXNBY2NlcHRpbmcsIFNfVVJMX09QRU5CUkFDRV9RKTtcblNfVVJMX09QRU5CUkFDS0VUX1NZTVMub24ocXNBY2NlcHRpbmcsIFNfVVJMX09QRU5CUkFDS0VUX1EpO1xuU19VUkxfT1BFTkFOR0xFQlJBQ0tFVF9TWU1TLm9uKHFzQWNjZXB0aW5nLCBTX1VSTF9PUEVOQU5HTEVCUkFDS0VUX1EpO1xuU19VUkxfT1BFTlBBUkVOX1NZTVMub24ocXNBY2NlcHRpbmcsIFNfVVJMX09QRU5QQVJFTl9RKTtcblNfVVJMX09QRU5CUkFDRV9TWU1TLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOQlJBQ0VfU1lNUyk7XG5TX1VSTF9PUEVOQlJBQ0tFVF9TWU1TLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOQlJBQ0tFVF9TWU1TKTtcblNfVVJMX09QRU5BTkdMRUJSQUNLRVRfU1lNUy5vbihxc05vbkFjY2VwdGluZywgU19VUkxfT1BFTkFOR0xFQlJBQ0tFVF9TWU1TKTtcblNfVVJMX09QRU5QQVJFTl9TWU1TLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9PUEVOUEFSRU5fU1lNUyk7XG5cbi8vIEFjY291bnQgZm9yIHRoZSBxdWVyeSBzdHJpbmdcblNfVVJMLm9uKHFzQWNjZXB0aW5nLCBTX1VSTCk7XG5TX1VSTF9OT05fQUNDRVBUSU5HLm9uKHFzQWNjZXB0aW5nLCBTX1VSTCk7XG5cblNfVVJMLm9uKHFzTm9uQWNjZXB0aW5nLCBTX1VSTF9OT05fQUNDRVBUSU5HKTtcblNfVVJMX05PTl9BQ0NFUFRJTkcub24ocXNOb25BY2NlcHRpbmcsIFNfVVJMX05PTl9BQ0NFUFRJTkcpO1xuXG4vLyBFbWFpbCBhZGRyZXNzLXNwZWNpZmljIHN0YXRlIGRlZmluaXRpb25zXG4vLyBOb3RlOiBXZSBhcmUgbm90IGFsbG93aW5nICcvJyBpbiBlbWFpbCBhZGRyZXNzZXMgc2luY2UgdGhpcyB3b3VsZCBpbnRlcmZlcmVcbi8vIHdpdGggcmVhbCBVUkxzXG5cbi8vIEZvciBhZGRyZXNzZXMgd2l0aCB0aGUgbWFpbHRvIHByZWZpeFxuLy8gJ21haWx0bzonIGZvbGxvd2VkIGJ5IGFueXRoaW5nIHNhbmUgaXMgYSB2YWxpZCBlbWFpbFxuU19NQUlMVE8ub24oX3RleHQuVExELCBTX01BSUxUT19FTUFJTCkub24oX3RleHQuRE9NQUlOLCBTX01BSUxUT19FTUFJTCkub24oX3RleHQuTlVNLCBTX01BSUxUT19FTUFJTCkub24oX3RleHQuTE9DQUxIT1NULCBTX01BSUxUT19FTUFJTCk7XG5cbi8vIEdyZWVkaWx5IGdldCBtb3JlIHBvdGVudGlhbCB2YWxpZCBlbWFpbCB2YWx1ZXNcblNfTUFJTFRPX0VNQUlMLm9uKHFzQWNjZXB0aW5nLCBTX01BSUxUT19FTUFJTCkub24ocXNOb25BY2NlcHRpbmcsIFNfTUFJTFRPX0VNQUlMX05PTl9BQ0NFUFRJTkcpO1xuU19NQUlMVE9fRU1BSUxfTk9OX0FDQ0VQVElORy5vbihxc0FjY2VwdGluZywgU19NQUlMVE9fRU1BSUwpLm9uKHFzTm9uQWNjZXB0aW5nLCBTX01BSUxUT19FTUFJTF9OT05fQUNDRVBUSU5HKTtcblxuLy8gRm9yIGFkZHJlc3NlcyB3aXRob3V0IHRoZSBtYWlsdG8gcHJlZml4XG4vLyBUb2tlbnMgYWxsb3dlZCBpbiB0aGUgbG9jYWxwYXJ0IG9mIHRoZSBlbWFpbFxudmFyIGxvY2FscGFydEFjY2VwdGluZyA9IFtfdGV4dC5ET01BSU4sIF90ZXh0Lk5VTSwgX3RleHQuUExVUywgX3RleHQuUE9VTkQsIF90ZXh0LlFVRVJZLCBfdGV4dC5VTkRFUlNDT1JFLCBfdGV4dC5TWU0sIF90ZXh0LkFNUEVSU0FORCwgX3RleHQuVExEXTtcblxuLy8gU29tZSBvZiB0aGUgdG9rZW5zIGluIGBsb2NhbHBhcnRBY2NlcHRpbmdgIGFyZSBhbHJlYWR5IGFjY291bnRlZCBmb3IgaGVyZSBhbmRcbi8vIHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuIChkb24ndCB3b3JyeSlcblNfRE9NQUlOLm9uKGxvY2FscGFydEFjY2VwdGluZywgU19MT0NBTFBBUlQpLm9uKF90ZXh0LkFULCBTX0xPQ0FMUEFSVF9BVCk7XG5TX1RMRC5vbihsb2NhbHBhcnRBY2NlcHRpbmcsIFNfTE9DQUxQQVJUKS5vbihfdGV4dC5BVCwgU19MT0NBTFBBUlRfQVQpO1xuU19ET01BSU5fRE9ULm9uKGxvY2FscGFydEFjY2VwdGluZywgU19MT0NBTFBBUlQpO1xuXG4vLyBPa2F5IHdlJ3JlIG9uIGEgbG9jYWxwYXJ0LiBOb3cgd2hhdD9cbi8vIFRPRE86IElQIGFkZHJlc3NlcyBhbmQgd2hhdCBpZiB0aGUgZW1haWwgc3RhcnRzIHdpdGggbnVtYmVycz9cblNfTE9DQUxQQVJULm9uKGxvY2FscGFydEFjY2VwdGluZywgU19MT0NBTFBBUlQpLm9uKF90ZXh0LkFULCBTX0xPQ0FMUEFSVF9BVCkgLy8gY2xvc2UgdG8gYW4gZW1haWwgYWRkcmVzcyBub3dcbi5vbihfdGV4dC5ET1QsIFNfTE9DQUxQQVJUX0RPVCk7XG5TX0xPQ0FMUEFSVF9ET1Qub24obG9jYWxwYXJ0QWNjZXB0aW5nLCBTX0xPQ0FMUEFSVCk7XG5TX0xPQ0FMUEFSVF9BVC5vbihfdGV4dC5UTEQsIFNfRU1BSUxfRE9NQUlOKS5vbihfdGV4dC5ET01BSU4sIFNfRU1BSUxfRE9NQUlOKS5vbihfdGV4dC5MT0NBTEhPU1QsIFNfRU1BSUwpO1xuLy8gU3RhdGVzIGZvbGxvd2luZyBgQGAgZGVmaW5lZCBhYm92ZVxuXG52YXIgcnVuID0gZnVuY3Rpb24gcnVuKHRva2Vucykge1xuXHR2YXIgbGVuID0gdG9rZW5zLmxlbmd0aDtcblx0dmFyIGN1cnNvciA9IDA7XG5cdHZhciBtdWx0aXMgPSBbXTtcblx0dmFyIHRleHRUb2tlbnMgPSBbXTtcblxuXHR3aGlsZSAoY3Vyc29yIDwgbGVuKSB7XG5cdFx0dmFyIHN0YXRlID0gU19TVEFSVDtcblx0XHR2YXIgc2Vjb25kU3RhdGUgPSBudWxsO1xuXHRcdHZhciBuZXh0U3RhdGUgPSBudWxsO1xuXHRcdHZhciBtdWx0aUxlbmd0aCA9IDA7XG5cdFx0dmFyIGxhdGVzdEFjY2VwdGluZyA9IG51bGw7XG5cdFx0dmFyIHNpbmNlQWNjZXB0cyA9IC0xO1xuXG5cdFx0d2hpbGUgKGN1cnNvciA8IGxlbiAmJiAhKHNlY29uZFN0YXRlID0gc3RhdGUubmV4dCh0b2tlbnNbY3Vyc29yXSkpKSB7XG5cdFx0XHQvLyBTdGFydGluZyB0b2tlbnMgd2l0aCBub3doZXJlIHRvIGp1bXAgdG8uXG5cdFx0XHQvLyBDb25zaWRlciB0aGVzZSB0byBiZSBqdXN0IHBsYWluIHRleHRcblx0XHRcdHRleHRUb2tlbnMucHVzaCh0b2tlbnNbY3Vyc29yKytdKTtcblx0XHR9XG5cblx0XHR3aGlsZSAoY3Vyc29yIDwgbGVuICYmIChuZXh0U3RhdGUgPSBzZWNvbmRTdGF0ZSB8fCBzdGF0ZS5uZXh0KHRva2Vuc1tjdXJzb3JdKSkpIHtcblxuXHRcdFx0Ly8gR2V0IHRoZSBuZXh0IHN0YXRlXG5cdFx0XHRzZWNvbmRTdGF0ZSA9IG51bGw7XG5cdFx0XHRzdGF0ZSA9IG5leHRTdGF0ZTtcblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB0aGUgbGF0ZXN0IGFjY2VwdGluZyBzdGF0ZVxuXHRcdFx0aWYgKHN0YXRlLmFjY2VwdHMoKSkge1xuXHRcdFx0XHRzaW5jZUFjY2VwdHMgPSAwO1xuXHRcdFx0XHRsYXRlc3RBY2NlcHRpbmcgPSBzdGF0ZTtcblx0XHRcdH0gZWxzZSBpZiAoc2luY2VBY2NlcHRzID49IDApIHtcblx0XHRcdFx0c2luY2VBY2NlcHRzKys7XG5cdFx0XHR9XG5cblx0XHRcdGN1cnNvcisrO1xuXHRcdFx0bXVsdGlMZW5ndGgrKztcblx0XHR9XG5cblx0XHRpZiAoc2luY2VBY2NlcHRzIDwgMCkge1xuXG5cdFx0XHQvLyBObyBhY2NlcHRpbmcgc3RhdGUgd2FzIGZvdW5kLCBwYXJ0IG9mIGEgcmVndWxhciB0ZXh0IHRva2VuXG5cdFx0XHQvLyBBZGQgYWxsIHRoZSB0b2tlbnMgd2UgbG9va2VkIGF0IHRvIHRoZSB0ZXh0IHRva2VucyBhcnJheVxuXHRcdFx0Zm9yICh2YXIgaSA9IGN1cnNvciAtIG11bHRpTGVuZ3RoOyBpIDwgY3Vyc29yOyBpKyspIHtcblx0XHRcdFx0dGV4dFRva2Vucy5wdXNoKHRva2Vuc1tpXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQWNjZXB0aW5nIHN0YXRlIVxuXG5cdFx0XHQvLyBGaXJzdCBjbG9zZSBvZmYgdGhlIHRleHRUb2tlbnMgKGlmIGF2YWlsYWJsZSlcblx0XHRcdGlmICh0ZXh0VG9rZW5zLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bXVsdGlzLnB1c2gobmV3IF9tdWx0aS5URVhUKHRleHRUb2tlbnMpKTtcblx0XHRcdFx0dGV4dFRva2VucyA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSb2xsIGJhY2sgdG8gdGhlIGxhdGVzdCBhY2NlcHRpbmcgc3RhdGVcblx0XHRcdGN1cnNvciAtPSBzaW5jZUFjY2VwdHM7XG5cdFx0XHRtdWx0aUxlbmd0aCAtPSBzaW5jZUFjY2VwdHM7XG5cblx0XHRcdC8vIENyZWF0ZSBhIG5ldyBtdWx0aXRva2VuXG5cdFx0XHR2YXIgTVVMVEkgPSBsYXRlc3RBY2NlcHRpbmcuZW1pdCgpO1xuXHRcdFx0bXVsdGlzLnB1c2gobmV3IE1VTFRJKHRva2Vucy5zbGljZShjdXJzb3IgLSBtdWx0aUxlbmd0aCwgY3Vyc29yKSkpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEZpbmFsbHkgY2xvc2Ugb2ZmIHRoZSB0ZXh0VG9rZW5zIChpZiBhdmFpbGFibGUpXG5cdGlmICh0ZXh0VG9rZW5zLmxlbmd0aCA+IDApIHtcblx0XHRtdWx0aXMucHVzaChuZXcgX211bHRpLlRFWFQodGV4dFRva2VucykpO1xuXHR9XG5cblx0cmV0dXJuIG11bHRpcztcbn07XG5cbmV4cG9ydHMuU3RhdGUgPSBfc3RhdGUuVG9rZW5TdGF0ZTtcbmV4cG9ydHMuVE9LRU5TID0gTVVMVElfVE9LRU5TO1xuZXhwb3J0cy5ydW4gPSBydW47XG5leHBvcnRzLnN0YXJ0ID0gU19TVEFSVDsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnN0YXJ0ID0gZXhwb3J0cy5ydW4gPSBleHBvcnRzLlRPS0VOUyA9IGV4cG9ydHMuU3RhdGUgPSB1bmRlZmluZWQ7XG5cbnZhciBfc3RhdGUgPSByZXF1aXJlKCcuL3N0YXRlJyk7XG5cbnZhciBfdGV4dCA9IHJlcXVpcmUoJy4vdG9rZW5zL3RleHQnKTtcblxudmFyIFRPS0VOUyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF90ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIHRsZHMgPSAnYWFhfGFhcnB8YWJhcnRofGFiYnxhYmJvdHR8YWJidmllfGFiY3xhYmxlfGFib2dhZG98YWJ1ZGhhYml8YWN8YWNhZGVteXxhY2NlbnR1cmV8YWNjb3VudGFudHxhY2NvdW50YW50c3xhY298YWN0aXZlfGFjdG9yfGFkfGFkYWN8YWRzfGFkdWx0fGFlfGFlZ3xhZXJvfGFldG5hfGFmfGFmYW1pbHljb21wYW55fGFmbHxhZnJpY2F8YWd8YWdha2hhbnxhZ2VuY3l8YWl8YWlnfGFpZ298YWlyYnVzfGFpcmZvcmNlfGFpcnRlbHxha2RufGFsfGFsZmFyb21lb3xhbGliYWJhfGFsaXBheXxhbGxmaW5hbnp8YWxsc3RhdGV8YWxseXxhbHNhY2V8YWxzdG9tfGFtfGFtZXJpY2FuZXhwcmVzc3xhbWVyaWNhbmZhbWlseXxhbWV4fGFtZmFtfGFtaWNhfGFtc3RlcmRhbXxhbmFseXRpY3N8YW5kcm9pZHxhbnF1YW58YW56fGFvfGFvbHxhcGFydG1lbnRzfGFwcHxhcHBsZXxhcXxhcXVhcmVsbGV8YXJ8YXJhYnxhcmFtY298YXJjaGl8YXJteXxhcnBhfGFydHxhcnRlfGFzfGFzZGF8YXNpYXxhc3NvY2lhdGVzfGF0fGF0aGxldGF8YXR0b3JuZXl8YXV8YXVjdGlvbnxhdWRpfGF1ZGlibGV8YXVkaW98YXVzcG9zdHxhdXRob3J8YXV0b3xhdXRvc3xhdmlhbmNhfGF3fGF3c3xheHxheGF8YXp8YXp1cmV8YmF8YmFieXxiYWlkdXxiYW5hbWV4fGJhbmFuYXJlcHVibGljfGJhbmR8YmFua3xiYXJ8YmFyY2Vsb25hfGJhcmNsYXljYXJkfGJhcmNsYXlzfGJhcmVmb290fGJhcmdhaW5zfGJhc2ViYWxsfGJhc2tldGJhbGx8YmF1aGF1c3xiYXllcm58YmJ8YmJjfGJidHxiYnZhfGJjZ3xiY258YmR8YmV8YmVhdHN8YmVhdXR5fGJlZXJ8YmVudGxleXxiZXJsaW58YmVzdHxiZXN0YnV5fGJldHxiZnxiZ3xiaHxiaGFydGl8Yml8YmlibGV8YmlkfGJpa2V8YmluZ3xiaW5nb3xiaW98Yml6fGJqfGJsYWNrfGJsYWNrZnJpZGF5fGJsYW5jb3xibG9ja2J1c3RlcnxibG9nfGJsb29tYmVyZ3xibHVlfGJtfGJtc3xibXd8Ym58Ym5sfGJucHBhcmliYXN8Ym98Ym9hdHN8Ym9laHJpbmdlcnxib2ZhfGJvbXxib25kfGJvb3xib29rfGJvb2tpbmd8Ym9vdHN8Ym9zY2h8Ym9zdGlrfGJvc3Rvbnxib3R8Ym91dGlxdWV8Ym94fGJyfGJyYWRlc2NvfGJyaWRnZXN0b25lfGJyb2Fkd2F5fGJyb2tlcnxicm90aGVyfGJydXNzZWxzfGJzfGJ0fGJ1ZGFwZXN0fGJ1Z2F0dGl8YnVpbGR8YnVpbGRlcnN8YnVzaW5lc3N8YnV5fGJ1enp8YnZ8Ynd8Ynl8Ynp8YnpofGNhfGNhYnxjYWZlfGNhbHxjYWxsfGNhbHZpbmtsZWlufGNhbXxjYW1lcmF8Y2FtcHxjYW5jZXJyZXNlYXJjaHxjYW5vbnxjYXBldG93bnxjYXBpdGFsfGNhcGl0YWxvbmV8Y2FyfGNhcmF2YW58Y2FyZHN8Y2FyZXxjYXJlZXJ8Y2FyZWVyc3xjYXJzfGNhcnRpZXJ8Y2FzYXxjYXNlfGNhc2VpaHxjYXNofGNhc2lub3xjYXR8Y2F0ZXJpbmd8Y2F0aG9saWN8Y2JhfGNibnxjYnJlfGNic3xjY3xjZHxjZWJ8Y2VudGVyfGNlb3xjZXJufGNmfGNmYXxjZmR8Y2d8Y2h8Y2hhbmVsfGNoYW5uZWx8Y2hhc2V8Y2hhdHxjaGVhcHxjaGludGFpfGNobG9lfGNocmlzdG1hc3xjaHJvbWV8Y2hyeXNsZXJ8Y2h1cmNofGNpfGNpcHJpYW5pfGNpcmNsZXxjaXNjb3xjaXRhZGVsfGNpdGl8Y2l0aWN8Y2l0eXxjaXR5ZWF0c3xja3xjbHxjbGFpbXN8Y2xlYW5pbmd8Y2xpY2t8Y2xpbmljfGNsaW5pcXVlfGNsb3RoaW5nfGNsb3VkfGNsdWJ8Y2x1Ym1lZHxjbXxjbnxjb3xjb2FjaHxjb2Rlc3xjb2ZmZWV8Y29sbGVnZXxjb2xvZ25lfGNvbXxjb21jYXN0fGNvbW1iYW5rfGNvbW11bml0eXxjb21wYW55fGNvbXBhcmV8Y29tcHV0ZXJ8Y29tc2VjfGNvbmRvc3xjb25zdHJ1Y3Rpb258Y29uc3VsdGluZ3xjb250YWN0fGNvbnRyYWN0b3JzfGNvb2tpbmd8Y29va2luZ2NoYW5uZWx8Y29vbHxjb29wfGNvcnNpY2F8Y291bnRyeXxjb3Vwb258Y291cG9uc3xjb3Vyc2VzfGNyfGNyZWRpdHxjcmVkaXRjYXJkfGNyZWRpdHVuaW9ufGNyaWNrZXR8Y3Jvd258Y3JzfGNydWlzZXxjcnVpc2VzfGNzY3xjdXxjdWlzaW5lbGxhfGN2fGN3fGN4fGN5fGN5bXJ1fGN5b3V8Y3p8ZGFidXJ8ZGFkfGRhbmNlfGRhdGF8ZGF0ZXxkYXRpbmd8ZGF0c3VufGRheXxkY2xrfGRkc3xkZXxkZWFsfGRlYWxlcnxkZWFsc3xkZWdyZWV8ZGVsaXZlcnl8ZGVsbHxkZWxvaXR0ZXxkZWx0YXxkZW1vY3JhdHxkZW50YWx8ZGVudGlzdHxkZXNpfGRlc2lnbnxkZXZ8ZGhsfGRpYW1vbmRzfGRpZXR8ZGlnaXRhbHxkaXJlY3R8ZGlyZWN0b3J5fGRpc2NvdW50fGRpc2NvdmVyfGRpc2h8ZGl5fGRqfGRrfGRtfGRucHxkb3xkb2NzfGRvY3Rvcnxkb2RnZXxkb2d8ZG9oYXxkb21haW5zfGRvdHxkb3dubG9hZHxkcml2ZXxkdHZ8ZHViYWl8ZHVja3xkdW5sb3B8ZHVuc3xkdXBvbnR8ZHVyYmFufGR2YWd8ZHZyfGR6fGVhcnRofGVhdHxlY3xlY298ZWRla2F8ZWR1fGVkdWNhdGlvbnxlZXxlZ3xlbWFpbHxlbWVyY2t8ZW5lcmd5fGVuZ2luZWVyfGVuZ2luZWVyaW5nfGVudGVycHJpc2VzfGVwb3N0fGVwc29ufGVxdWlwbWVudHxlcnxlcmljc3Nvbnxlcm5pfGVzfGVzcXxlc3RhdGV8ZXN1cmFuY2V8ZXR8ZXRpc2FsYXR8ZXV8ZXVyb3Zpc2lvbnxldXN8ZXZlbnRzfGV2ZXJiYW5rfGV4Y2hhbmdlfGV4cGVydHxleHBvc2VkfGV4cHJlc3N8ZXh0cmFzcGFjZXxmYWdlfGZhaWx8ZmFpcndpbmRzfGZhaXRofGZhbWlseXxmYW58ZmFuc3xmYXJtfGZhcm1lcnN8ZmFzaGlvbnxmYXN0fGZlZGV4fGZlZWRiYWNrfGZlcnJhcml8ZmVycmVyb3xmaXxmaWF0fGZpZGVsaXR5fGZpZG98ZmlsbXxmaW5hbHxmaW5hbmNlfGZpbmFuY2lhbHxmaXJlfGZpcmVzdG9uZXxmaXJtZGFsZXxmaXNofGZpc2hpbmd8Zml0fGZpdG5lc3N8Zmp8Zmt8ZmxpY2tyfGZsaWdodHN8ZmxpcnxmbG9yaXN0fGZsb3dlcnN8Zmx5fGZtfGZvfGZvb3xmb29kfGZvb2RuZXR3b3JrfGZvb3RiYWxsfGZvcmR8Zm9yZXh8Zm9yc2FsZXxmb3J1bXxmb3VuZGF0aW9ufGZveHxmcnxmcmVlfGZyZXNlbml1c3xmcmx8ZnJvZ2Fuc3xmcm9udGRvb3J8ZnJvbnRpZXJ8ZnRyfGZ1aml0c3V8ZnVqaXhlcm94fGZ1bnxmdW5kfGZ1cm5pdHVyZXxmdXRib2x8ZnlpfGdhfGdhbHxnYWxsZXJ5fGdhbGxvfGdhbGx1cHxnYW1lfGdhbWVzfGdhcHxnYXJkZW58Z2J8Z2JpenxnZHxnZG58Z2V8Z2VhfGdlbnR8Z2VudGluZ3xnZW9yZ2V8Z2Z8Z2d8Z2dlZXxnaHxnaXxnaWZ0fGdpZnRzfGdpdmVzfGdpdmluZ3xnbHxnbGFkZXxnbGFzc3xnbGV8Z2xvYmFsfGdsb2JvfGdtfGdtYWlsfGdtYmh8Z21vfGdteHxnbnxnb2RhZGR5fGdvbGR8Z29sZHBvaW50fGdvbGZ8Z29vfGdvb2RoYW5kc3xnb29keWVhcnxnb29nfGdvb2dsZXxnb3B8Z290fGdvdnxncHxncXxncnxncmFpbmdlcnxncmFwaGljc3xncmF0aXN8Z3JlZW58Z3JpcGV8Z3JvY2VyeXxncm91cHxnc3xndHxndXxndWFyZGlhbnxndWNjaXxndWdlfGd1aWRlfGd1aXRhcnN8Z3VydXxnd3xneXxoYWlyfGhhbWJ1cmd8aGFuZ291dHxoYXVzfGhib3xoZGZjfGhkZmNiYW5rfGhlYWx0aHxoZWFsdGhjYXJlfGhlbHB8aGVsc2lua2l8aGVyZXxoZXJtZXN8aGd0dnxoaXBob3B8aGlzYW1pdHN1fGhpdGFjaGl8aGl2fGhrfGhrdHxobXxobnxob2NrZXl8aG9sZGluZ3N8aG9saWRheXxob21lZGVwb3R8aG9tZWdvb2RzfGhvbWVzfGhvbWVzZW5zZXxob25kYXxob25leXdlbGx8aG9yc2V8aG9zcGl0YWx8aG9zdHxob3N0aW5nfGhvdHxob3RlbGVzfGhvdGVsc3xob3RtYWlsfGhvdXNlfGhvd3xocnxoc2JjfGh0fGh0Y3xodXxodWdoZXN8aHlhdHR8aHl1bmRhaXxpYm18aWNiY3xpY2V8aWN1fGlkfGllfGllZWV8aWZtfGlrYW5vfGlsfGltfGltYW1hdHxpbWRifGltbW98aW1tb2JpbGllbnxpbnxpbmR1c3RyaWVzfGluZmluaXRpfGluZm98aW5nfGlua3xpbnN0aXR1dGV8aW5zdXJhbmNlfGluc3VyZXxpbnR8aW50ZWx8aW50ZXJuYXRpb25hbHxpbnR1aXR8aW52ZXN0bWVudHN8aW98aXBpcmFuZ2F8aXF8aXJ8aXJpc2h8aXN8aXNlbGVjdHxpc21haWxpfGlzdHxpc3RhbmJ1bHxpdHxpdGF1fGl0dnxpdmVjb3xpd2N8amFndWFyfGphdmF8amNifGpjcHxqZXxqZWVwfGpldHp0fGpld2Vscnl8amlvfGpsY3xqbGx8am18am1wfGpuanxqb3xqb2JzfGpvYnVyZ3xqb3R8am95fGpwfGpwbW9yZ2FufGpwcnN8anVlZ29zfGp1bmlwZXJ8a2F1ZmVufGtkZGl8a2V8a2Vycnlob3RlbHN8a2Vycnlsb2dpc3RpY3N8a2Vycnlwcm9wZXJ0aWVzfGtmaHxrZ3xraHxraXxraWF8a2ltfGtpbmRlcnxraW5kbGV8a2l0Y2hlbnxraXdpfGttfGtufGtvZWxufGtvbWF0c3V8a29zaGVyfGtwfGtwbWd8a3BufGtyfGtyZHxrcmVkfGt1b2tncm91cHxrd3xreXxreW90b3xrenxsYXxsYWNhaXhhfGxhZGJyb2tlc3xsYW1ib3JnaGluaXxsYW1lcnxsYW5jYXN0ZXJ8bGFuY2lhfGxhbmNvbWV8bGFuZHxsYW5kcm92ZXJ8bGFueGVzc3xsYXNhbGxlfGxhdHxsYXRpbm98bGF0cm9iZXxsYXd8bGF3eWVyfGxifGxjfGxkc3xsZWFzZXxsZWNsZXJjfGxlZnJha3xsZWdhbHxsZWdvfGxleHVzfGxnYnR8bGl8bGlhaXNvbnxsaWRsfGxpZmV8bGlmZWluc3VyYW5jZXxsaWZlc3R5bGV8bGlnaHRpbmd8bGlrZXxsaWxseXxsaW1pdGVkfGxpbW98bGluY29sbnxsaW5kZXxsaW5rfGxpcHN5fGxpdmV8bGl2aW5nfGxpeGlsfGxrfGxvYW58bG9hbnN8bG9ja2VyfGxvY3VzfGxvZnR8bG9sfGxvbmRvbnxsb3R0ZXxsb3R0b3xsb3ZlfGxwbHxscGxmaW5hbmNpYWx8bHJ8bHN8bHR8bHRkfGx0ZGF8bHV8bHVuZGJlY2t8bHVwaW58bHV4ZXxsdXh1cnl8bHZ8bHl8bWF8bWFjeXN8bWFkcmlkfG1haWZ8bWFpc29ufG1ha2V1cHxtYW58bWFuYWdlbWVudHxtYW5nb3xtYXB8bWFya2V0fG1hcmtldGluZ3xtYXJrZXRzfG1hcnJpb3R0fG1hcnNoYWxsc3xtYXNlcmF0aXxtYXR0ZWx8bWJhfG1jfG1ja2luc2V5fG1kfG1lfG1lZHxtZWRpYXxtZWV0fG1lbGJvdXJuZXxtZW1lfG1lbW9yaWFsfG1lbnxtZW51fG1lb3xtZXJja21zZHxtZXRsaWZlfG1nfG1ofG1pYW1pfG1pY3Jvc29mdHxtaWx8bWluaXxtaW50fG1pdHxtaXRzdWJpc2hpfG1rfG1sfG1sYnxtbHN8bW18bW1hfG1ufG1vfG1vYml8bW9iaWxlfG1vYmlseXxtb2RhfG1vZXxtb2l8bW9tfG1vbmFzaHxtb25leXxtb25zdGVyfG1vcGFyfG1vcm1vbnxtb3J0Z2FnZXxtb3Njb3d8bW90b3xtb3RvcmN5Y2xlc3xtb3Z8bW92aWV8bW92aXN0YXJ8bXB8bXF8bXJ8bXN8bXNkfG10fG10bnxtdHJ8bXV8bXVzZXVtfG11dHVhbHxtdnxtd3xteHxteXxtenxuYXxuYWJ8bmFkZXh8bmFnb3lhfG5hbWV8bmF0aW9ud2lkZXxuYXR1cmF8bmF2eXxuYmF8bmN8bmV8bmVjfG5ldHxuZXRiYW5rfG5ldGZsaXh8bmV0d29ya3xuZXVzdGFyfG5ld3xuZXdob2xsYW5kfG5ld3N8bmV4dHxuZXh0ZGlyZWN0fG5leHVzfG5mfG5mbHxuZ3xuZ298bmhrfG5pfG5pY298bmlrZXxuaWtvbnxuaW5qYXxuaXNzYW58bmlzc2F5fG5sfG5vfG5va2lhfG5vcnRod2VzdGVybm11dHVhbHxub3J0b258bm93fG5vd3J1enxub3d0dnxucHxucnxucmF8bnJ3fG50dHxudXxueWN8bnp8b2JpfG9ic2VydmVyfG9mZnxvZmZpY2V8b2tpbmF3YXxvbGF5YW58b2xheWFuZ3JvdXB8b2xkbmF2eXxvbGxvfG9tfG9tZWdhfG9uZXxvbmd8b25sfG9ubGluZXxvbnlvdXJzaWRlfG9vb3xvcGVufG9yYWNsZXxvcmFuZ2V8b3JnfG9yZ2FuaWN8b3JpZ2luc3xvc2FrYXxvdHN1a2F8b3R0fG92aHxwYXxwYWdlfHBhbmFzb25pY3xwYW5lcmFpfHBhcmlzfHBhcnN8cGFydG5lcnN8cGFydHN8cGFydHl8cGFzc2FnZW5zfHBheXxwY2N3fHBlfHBldHxwZnxwZml6ZXJ8cGd8cGh8cGhhcm1hY3l8cGhkfHBoaWxpcHN8cGhvbmV8cGhvdG98cGhvdG9ncmFwaHl8cGhvdG9zfHBoeXNpb3xwaWFnZXR8cGljc3xwaWN0ZXR8cGljdHVyZXN8cGlkfHBpbnxwaW5nfHBpbmt8cGlvbmVlcnxwaXp6YXxwa3xwbHxwbGFjZXxwbGF5fHBsYXlzdGF0aW9ufHBsdW1iaW5nfHBsdXN8cG18cG58cG5jfHBvaGx8cG9rZXJ8cG9saXRpZXxwb3JufHBvc3R8cHJ8cHJhbWVyaWNhfHByYXhpfHByZXNzfHByaW1lfHByb3xwcm9kfHByb2R1Y3Rpb25zfHByb2Z8cHJvZ3Jlc3NpdmV8cHJvbW98cHJvcGVydGllc3xwcm9wZXJ0eXxwcm90ZWN0aW9ufHBydXxwcnVkZW50aWFsfHBzfHB0fHB1Ynxwd3xwd2N8cHl8cWF8cXBvbnxxdWViZWN8cXVlc3R8cXZjfHJhY2luZ3xyYWRpb3xyYWlkfHJlfHJlYWR8cmVhbGVzdGF0ZXxyZWFsdG9yfHJlYWx0eXxyZWNpcGVzfHJlZHxyZWRzdG9uZXxyZWR1bWJyZWxsYXxyZWhhYnxyZWlzZXxyZWlzZW58cmVpdHxyZWxpYW5jZXxyZW58cmVudHxyZW50YWxzfHJlcGFpcnxyZXBvcnR8cmVwdWJsaWNhbnxyZXN0fHJlc3RhdXJhbnR8cmV2aWV3fHJldmlld3N8cmV4cm90aHxyaWNofHJpY2hhcmRsaXxyaWNvaHxyaWdodGF0aG9tZXxyaWx8cmlvfHJpcHxybWl0fHJvfHJvY2hlcnxyb2Nrc3xyb2Rlb3xyb2dlcnN8cm9vbXxyc3xyc3ZwfHJ1fHJ1Z2J5fHJ1aHJ8cnVufHJ3fHJ3ZXxyeXVreXV8c2F8c2FhcmxhbmR8c2FmZXxzYWZldHl8c2FrdXJhfHNhbGV8c2Fsb258c2Ftc2NsdWJ8c2Ftc3VuZ3xzYW5kdmlrfHNhbmR2aWtjb3JvbWFudHxzYW5vZml8c2FwfHNhcG98c2FybHxzYXN8c2F2ZXxzYXhvfHNifHNiaXxzYnN8c2N8c2NhfHNjYnxzY2hhZWZmbGVyfHNjaG1pZHR8c2Nob2xhcnNoaXBzfHNjaG9vbHxzY2h1bGV8c2Nod2FyenxzY2llbmNlfHNjam9obnNvbnxzY29yfHNjb3R8c2R8c2V8c2VhcmNofHNlYXR8c2VjdXJlfHNlY3VyaXR5fHNlZWt8c2VsZWN0fHNlbmVyfHNlcnZpY2VzfHNlc3xzZXZlbnxzZXd8c2V4fHNleHl8c2ZyfHNnfHNofHNoYW5ncmlsYXxzaGFycHxzaGF3fHNoZWxsfHNoaWF8c2hpa3NoYXxzaG9lc3xzaG9wfHNob3BwaW5nfHNob3VqaXxzaG93fHNob3d0aW1lfHNocmlyYW18c2l8c2lsa3xzaW5hfHNpbmdsZXN8c2l0ZXxzanxza3xza2l8c2tpbnxza3l8c2t5cGV8c2x8c2xpbmd8c218c21hcnR8c21pbGV8c258c25jZnxzb3xzb2NjZXJ8c29jaWFsfHNvZnRiYW5rfHNvZnR3YXJlfHNvaHV8c29sYXJ8c29sdXRpb25zfHNvbmd8c29ueXxzb3l8c3BhY2V8c3BpZWdlbHxzcG90fHNwcmVhZGJldHRpbmd8c3J8c3JsfHNydHxzdHxzdGFkYXxzdGFwbGVzfHN0YXJ8c3Rhcmh1YnxzdGF0ZWJhbmt8c3RhdGVmYXJtfHN0YXRvaWx8c3RjfHN0Y2dyb3VwfHN0b2NraG9sbXxzdG9yYWdlfHN0b3JlfHN0cmVhbXxzdHVkaW98c3R1ZHl8c3R5bGV8c3V8c3Vja3N8c3VwcGxpZXN8c3VwcGx5fHN1cHBvcnR8c3VyZnxzdXJnZXJ5fHN1enVraXxzdnxzd2F0Y2h8c3dpZnRjb3Zlcnxzd2lzc3xzeHxzeXxzeWRuZXl8c3ltYW50ZWN8c3lzdGVtc3xzenx0YWJ8dGFpcGVpfHRhbGt8dGFvYmFvfHRhcmdldHx0YXRhbW90b3JzfHRhdGFyfHRhdHRvb3x0YXh8dGF4aXx0Y3x0Y2l8dGR8dGRrfHRlYW18dGVjaHx0ZWNobm9sb2d5fHRlbHx0ZWxlY2l0eXx0ZWxlZm9uaWNhfHRlbWFzZWt8dGVubmlzfHRldmF8dGZ8dGd8dGh8dGhkfHRoZWF0ZXJ8dGhlYXRyZXx0aWFhfHRpY2tldHN8dGllbmRhfHRpZmZhbnl8dGlwc3x0aXJlc3x0aXJvbHx0anx0am1heHh8dGp4fHRrfHRrbWF4eHx0bHx0bXx0bWFsbHx0bnx0b3x0b2RheXx0b2t5b3x0b29sc3x0b3B8dG9yYXl8dG9zaGliYXx0b3RhbHx0b3Vyc3x0b3dufHRveW90YXx0b3lzfHRyfHRyYWRlfHRyYWRpbmd8dHJhaW5pbmd8dHJhdmVsfHRyYXZlbGNoYW5uZWx8dHJhdmVsZXJzfHRyYXZlbGVyc2luc3VyYW5jZXx0cnVzdHx0cnZ8dHR8dHViZXx0dWl8dHVuZXN8dHVzaHV8dHZ8dHZzfHR3fHR6fHVhfHViYW5rfHVic3x1Y29ubmVjdHx1Z3x1a3x1bmljb218dW5pdmVyc2l0eXx1bm98dW9sfHVwc3x1c3x1eXx1enx2YXx2YWNhdGlvbnN8dmFuYXx2YW5ndWFyZHx2Y3x2ZXx2ZWdhc3x2ZW50dXJlc3x2ZXJpc2lnbnx2ZXJzaWNoZXJ1bmd8dmV0fHZnfHZpfHZpYWplc3x2aWRlb3x2aWd8dmlraW5nfHZpbGxhc3x2aW58dmlwfHZpcmdpbnx2aXNhfHZpc2lvbnx2aXN0YXx2aXN0YXByaW50fHZpdmF8dml2b3x2bGFhbmRlcmVufHZufHZvZGthfHZvbGtzd2FnZW58dm9sdm98dm90ZXx2b3Rpbmd8dm90b3x2b3lhZ2V8dnV8dnVlbG9zfHdhbGVzfHdhbG1hcnR8d2FsdGVyfHdhbmd8d2FuZ2dvdXx3YXJtYW58d2F0Y2h8d2F0Y2hlc3x3ZWF0aGVyfHdlYXRoZXJjaGFubmVsfHdlYmNhbXx3ZWJlcnx3ZWJzaXRlfHdlZHx3ZWRkaW5nfHdlaWJvfHdlaXJ8d2Z8d2hvc3dob3x3aWVufHdpa2l8d2lsbGlhbWhpbGx8d2lufHdpbmRvd3N8d2luZXx3aW5uZXJzfHdtZXx3b2x0ZXJza2x1d2VyfHdvb2RzaWRlfHdvcmt8d29ya3N8d29ybGR8d293fHdzfHd0Y3x3dGZ8eGJveHx4ZXJveHx4ZmluaXR5fHhpaHVhbnx4aW58eG4tLTExYjRjM2R8eG4tLTFjazJlMWJ8eG4tLTFxcXcyM2F8eG4tLTJzY3JqOWN8eG4tLTMwcnI3eXx4bi0tM2JzdDAwbXx4bi0tM2RzNDQzZ3x4bi0tM2UwYjcwN2V8eG4tLTNoY3JqOWN8eG4tLTNvcTE4dmw4cG4zNmF8eG4tLTNweHU4a3x4bi0tNDJjMmQ5YXx4bi0tNDVicjVjeWx8eG4tLTQ1YnJqOWN8eG4tLTQ1cTExY3x4bi0tNGdicmltfHhuLS01NGI3ZnRhMGNjfHhuLS01NXF3NDJnfHhuLS01NXF4NWR8eG4tLTVzdTM0ajkzNmJnc2d8eG4tLTV0em01Z3x4bi0tNmZyejgyZ3x4bi0tNnFxOTg2YjN4bHx4bi0tODBhZHhoa3N8eG4tLTgwYW8yMWF8eG4tLTgwYXFlY2RyMWF8eG4tLTgwYXNlaGRifHhuLS04MGFzd2d8eG4tLTh5MGEwNjNhfHhuLS05MGEzYWN8eG4tLTkwYWV8eG4tLTkwYWlzfHhuLS05ZGJxMmF8eG4tLTlldDUydXx4bi0tOWtydDAwYXx4bi0tYjR3NjA1ZmVyZHx4bi0tYmNrMWI5YTVkcmU0Y3x4bi0tYzFhdmd8eG4tLWMyYnI3Z3x4bi0tY2NrMmIzYnx4bi0tY2c0YmtpfHhuLS1jbGNoYzBlYTBiMmcyYTlnY2R8eG4tLWN6cjY5NGJ8eG4tLWN6cnMwdHx4bi0tY3pydTJkfHhuLS1kMWFjajNifHhuLS1kMWFsZnx4bi0tZTFhNGN8eG4tLWVja3ZkdGM5ZHx4bi0tZWZ2eTg4aHx4bi0tZXN0djc1Z3x4bi0tZmN0NDI5a3x4bi0tZmhiZWl8eG4tLWZpcTIyOGM1aHN8eG4tLWZpcTY0Ynx4bi0tZmlxczhzfHhuLS1maXF6OXN8eG4tLWZqcTcyMGF8eG4tLWZsdzM1MWV8eG4tLWZwY3JqOWMzZHx4bi0tZnpjMmM5ZTJjfHhuLS1menlzOGQ2OXV2Z218eG4tLWcyeHg0OGN8eG4tLWdja3IzZjBmfHhuLS1nZWNyajljfHhuLS1nazNhdDFlfHhuLS1oMmJyZWczZXZlfHhuLS1oMmJyajljfHhuLS1oMmJyajljOGN8eG4tLWh4dDgxNGV8eG4tLWkxYjZiMWE2YTJlfHhuLS1pbXI1MTNufHhuLS1pbzBhN2l8eG4tLWoxYWVmfHhuLS1qMWFtaHx4bi0tajZ3MTkzZ3x4bi0tamxxNjF1OXc3Ynx4bi0tanZyMTg5bXx4bi0ta2NyeDc3ZDF4NGF8eG4tLWtwcncxM2R8eG4tLWtwcnk1N2R8eG4tLWtwdTcxNmZ8eG4tLWtwdXQzaXx4bi0tbDFhY2N8eG4tLWxnYmJhdDFhZDhqfHhuLS1tZ2I5YXdiZnx4bi0tbWdiYTNhM2VqdHx4bi0tbWdiYTNhNGYxNmF8eG4tLW1nYmE3YzBiYm4wYXx4bi0tbWdiYWFrYzdkdmZ8eG4tLW1nYmFhbTdhOGh8eG4tLW1nYmFiMmJkfHhuLS1tZ2JhaTlhemdxcDZqfHhuLS1tZ2JheWg3Z3BhfHhuLS1tZ2JiOWZicG9ifHhuLS1tZ2JiaDFhfHhuLS1tZ2JiaDFhNzFlfHhuLS1tZ2JjMGE5YXpjZ3x4bi0tbWdiY2E3ZHpkb3x4bi0tbWdiZXJwNGE1ZDRhcnx4bi0tbWdiZ3U4MmF8eG4tLW1nYmk0ZWNleHB8eG4tLW1nYnBsMmZofHhuLS1tZ2J0M2RoZHx4bi0tbWdidHgyYnx4bi0tbWdieDRjZDBhYnx4bi0tbWl4ODkxZnx4bi0tbWsxYnU0NGN8eG4tLW14dHExbXx4bi0tbmdiYzVhemR8eG4tLW5nYmU5ZTBhfHhuLS1uZ2JyeHx4bi0tbm9kZXx4bi0tbnF2N2Z8eG4tLW5xdjdmczAwZW1hfHhuLS1ueXF5MjZhfHhuLS1vM2N3NGh8eG4tLW9nYnBmOGZsfHhuLS1wMWFjZnx4bi0tcDFhaXx4bi0tcGJ0OTc3Y3x4bi0tcGdiczBkaHx4bi0tcHNzeTJ1fHhuLS1xOWp5YjRjfHhuLS1xY2thMXBtY3x4bi0tcXhhbXx4bi0tcmhxdjk2Z3x4bi0tcm92dTg4Ynx4bi0tcnZjMWUwYW0zZXx4bi0tczlicmo5Y3x4bi0tc2VzNTU0Z3x4bi0tdDYwYjU2YXx4bi0tdGNrd2V8eG4tLXRpcTQ5eHF5anx4bi0tdW51cDR5fHhuLS12ZXJtZ2Vuc2JlcmF0ZXItY3RifHhuLS12ZXJtZ2Vuc2JlcmF0dW5nLXB3Ynx4bi0tdmhxdXZ8eG4tLXZ1cTg2MWJ8eG4tLXc0cjg1ZWw4Zmh1NWRucmF8eG4tLXc0cnM0MGx8eG4tLXdnYmgxY3x4bi0td2dibDZhfHhuLS14aHE1MjFifHhuLS14a2MyYWwzaHllMmF8eG4tLXhrYzJkbDNhNWVlMGh8eG4tLXk5YTNhcXx4bi0teWZybzRpNjdvfHhuLS15Z2JpMmFtbXh8eG4tLXpmcjE2NGJ8eHBlcmlhfHh4eHx4eXp8eWFjaHRzfHlhaG9vfHlhbWF4dW58eWFuZGV4fHllfHlvZG9iYXNoaXx5b2dhfHlva29oYW1hfHlvdXx5b3V0dWJlfHl0fHl1bnx6YXx6YXBwb3N8emFyYXx6ZXJvfHppcHx6aXBwb3x6bXx6b25lfHp1ZXJpY2h8encnLnNwbGl0KCd8Jyk7IC8vIG1hY3JvLCBzZWUgZ3VscGZpbGUuanNcblxuLyoqXG5cdFRoZSBzY2FubmVyIHByb3ZpZGVzIGFuIGludGVyZmFjZSB0aGF0IHRha2VzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXQsIGFuZFxuXHRvdXRwdXRzIGFuIGFycmF5IG9mIHRva2VucyBpbnN0YW5jZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgZWFzeSBVUkwgcGFyc2luZy5cblxuXHRAbW9kdWxlIGxpbmtpZnlcblx0QHN1Ym1vZHVsZSBzY2FubmVyXG5cdEBtYWluIHNjYW5uZXJcbiovXG5cbnZhciBOVU1CRVJTID0gJzAxMjM0NTY3ODknLnNwbGl0KCcnKTtcbnZhciBBTFBIQU5VTSA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCcnKTtcbnZhciBXSElURVNQQUNFID0gWycgJywgJ1xcZicsICdcXHInLCAnXFx0JywgJ1xcdicsICdcXHhBMCcsICdcXHUxNjgwJywgJ1xcdTE4MEUnXTsgLy8gZXhjbHVkaW5nIGxpbmUgYnJlYWtzXG5cbnZhciBkb21haW5TdGF0ZXMgPSBbXTsgLy8gc3RhdGVzIHRoYXQganVtcCB0byBET01BSU4gb24gL1thLXowLTldL1xudmFyIG1ha2VTdGF0ZSA9IGZ1bmN0aW9uIG1ha2VTdGF0ZSh0b2tlbkNsYXNzKSB7XG5cdHJldHVybiBuZXcgX3N0YXRlLkNoYXJhY3RlclN0YXRlKHRva2VuQ2xhc3MpO1xufTtcblxuLy8gRnJlcXVlbnRseSB1c2VkIHN0YXRlc1xudmFyIFNfU1RBUlQgPSBtYWtlU3RhdGUoKTtcbnZhciBTX05VTSA9IG1ha2VTdGF0ZShfdGV4dC5OVU0pO1xudmFyIFNfRE9NQUlOID0gbWFrZVN0YXRlKF90ZXh0LkRPTUFJTik7XG52YXIgU19ET01BSU5fSFlQSEVOID0gbWFrZVN0YXRlKCk7IC8vIGRvbWFpbiBmb2xsb3dlZCBieSAxIG9yIG1vcmUgaHlwaGVuIGNoYXJhY3RlcnNcbnZhciBTX1dTID0gbWFrZVN0YXRlKF90ZXh0LldTKTtcblxuLy8gU3RhdGVzIGZvciBzcGVjaWFsIFVSTCBzeW1ib2xzXG5TX1NUQVJULm9uKCdAJywgbWFrZVN0YXRlKF90ZXh0LkFUKSkub24oJy4nLCBtYWtlU3RhdGUoX3RleHQuRE9UKSkub24oJysnLCBtYWtlU3RhdGUoX3RleHQuUExVUykpLm9uKCcjJywgbWFrZVN0YXRlKF90ZXh0LlBPVU5EKSkub24oJz8nLCBtYWtlU3RhdGUoX3RleHQuUVVFUlkpKS5vbignLycsIG1ha2VTdGF0ZShfdGV4dC5TTEFTSCkpLm9uKCdfJywgbWFrZVN0YXRlKF90ZXh0LlVOREVSU0NPUkUpKS5vbignOicsIG1ha2VTdGF0ZShfdGV4dC5DT0xPTikpLm9uKCd7JywgbWFrZVN0YXRlKF90ZXh0Lk9QRU5CUkFDRSkpLm9uKCdbJywgbWFrZVN0YXRlKF90ZXh0Lk9QRU5CUkFDS0VUKSkub24oJzwnLCBtYWtlU3RhdGUoX3RleHQuT1BFTkFOR0xFQlJBQ0tFVCkpLm9uKCcoJywgbWFrZVN0YXRlKF90ZXh0Lk9QRU5QQVJFTikpLm9uKCd9JywgbWFrZVN0YXRlKF90ZXh0LkNMT1NFQlJBQ0UpKS5vbignXScsIG1ha2VTdGF0ZShfdGV4dC5DTE9TRUJSQUNLRVQpKS5vbignPicsIG1ha2VTdGF0ZShfdGV4dC5DTE9TRUFOR0xFQlJBQ0tFVCkpLm9uKCcpJywgbWFrZVN0YXRlKF90ZXh0LkNMT1NFUEFSRU4pKS5vbignJicsIG1ha2VTdGF0ZShfdGV4dC5BTVBFUlNBTkQpKS5vbihbJywnLCAnOycsICchJywgJ1wiJywgJ1xcJyddLCBtYWtlU3RhdGUoX3RleHQuUFVOQ1RVQVRJT04pKTtcblxuLy8gV2hpdGVzcGFjZSBqdW1wc1xuLy8gVG9rZW5zIG9mIG9ubHkgbm9uLW5ld2xpbmUgd2hpdGVzcGFjZSBhcmUgYXJiaXRyYXJpbHkgbG9uZ1xuU19TVEFSVC5vbignXFxuJywgbWFrZVN0YXRlKF90ZXh0Lk5MKSkub24oV0hJVEVTUEFDRSwgU19XUyk7XG5cbi8vIElmIGFueSB3aGl0ZXNwYWNlIGV4Y2VwdCBuZXdsaW5lLCBtb3JlIHdoaXRlc3BhY2UhXG5TX1dTLm9uKFdISVRFU1BBQ0UsIFNfV1MpO1xuXG4vLyBHZW5lcmF0ZXMgc3RhdGVzIGZvciB0b3AtbGV2ZWwgZG9tYWluc1xuLy8gTm90ZSB0aGF0IHRoaXMgaXMgbW9zdCBhY2N1cmF0ZSB3aGVuIHRsZHMgYXJlIGluIGFscGhhYmV0aWNhbCBvcmRlclxuZm9yICh2YXIgaSA9IDA7IGkgPCB0bGRzLmxlbmd0aDsgaSsrKSB7XG5cdHZhciBuZXdTdGF0ZXMgPSAoMCwgX3N0YXRlLnN0YXRlaWZ5KSh0bGRzW2ldLCBTX1NUQVJULCBfdGV4dC5UTEQsIF90ZXh0LkRPTUFJTik7XG5cdGRvbWFpblN0YXRlcy5wdXNoLmFwcGx5KGRvbWFpblN0YXRlcywgbmV3U3RhdGVzKTtcbn1cblxuLy8gQ29sbGVjdCB0aGUgc3RhdGVzIGdlbmVyYXRlZCBieSBkaWZmZXJlbnQgcHJvdG9jbHNcbnZhciBwYXJ0aWFsUHJvdG9jb2xGaWxlU3RhdGVzID0gKDAsIF9zdGF0ZS5zdGF0ZWlmeSkoJ2ZpbGUnLCBTX1NUQVJULCBfdGV4dC5ET01BSU4sIF90ZXh0LkRPTUFJTik7XG52YXIgcGFydGlhbFByb3RvY29sRnRwU3RhdGVzID0gKDAsIF9zdGF0ZS5zdGF0ZWlmeSkoJ2Z0cCcsIFNfU1RBUlQsIF90ZXh0LkRPTUFJTiwgX3RleHQuRE9NQUlOKTtcbnZhciBwYXJ0aWFsUHJvdG9jb2xIdHRwU3RhdGVzID0gKDAsIF9zdGF0ZS5zdGF0ZWlmeSkoJ2h0dHAnLCBTX1NUQVJULCBfdGV4dC5ET01BSU4sIF90ZXh0LkRPTUFJTik7XG52YXIgcGFydGlhbFByb3RvY29sTWFpbHRvU3RhdGVzID0gKDAsIF9zdGF0ZS5zdGF0ZWlmeSkoJ21haWx0bycsIFNfU1RBUlQsIF90ZXh0LkRPTUFJTiwgX3RleHQuRE9NQUlOKTtcblxuLy8gQWRkIHRoZSBzdGF0ZXMgdG8gdGhlIGFycmF5IG9mIERPTUFJTmVyaWMgc3RhdGVzXG5kb21haW5TdGF0ZXMucHVzaC5hcHBseShkb21haW5TdGF0ZXMsIHBhcnRpYWxQcm90b2NvbEZpbGVTdGF0ZXMpO1xuZG9tYWluU3RhdGVzLnB1c2guYXBwbHkoZG9tYWluU3RhdGVzLCBwYXJ0aWFsUHJvdG9jb2xGdHBTdGF0ZXMpO1xuZG9tYWluU3RhdGVzLnB1c2guYXBwbHkoZG9tYWluU3RhdGVzLCBwYXJ0aWFsUHJvdG9jb2xIdHRwU3RhdGVzKTtcbmRvbWFpblN0YXRlcy5wdXNoLmFwcGx5KGRvbWFpblN0YXRlcywgcGFydGlhbFByb3RvY29sTWFpbHRvU3RhdGVzKTtcblxuLy8gUHJvdG9jb2wgc3RhdGVzXG52YXIgU19QUk9UT0NPTF9GSUxFID0gcGFydGlhbFByb3RvY29sRmlsZVN0YXRlcy5wb3AoKTtcbnZhciBTX1BST1RPQ09MX0ZUUCA9IHBhcnRpYWxQcm90b2NvbEZ0cFN0YXRlcy5wb3AoKTtcbnZhciBTX1BST1RPQ09MX0hUVFAgPSBwYXJ0aWFsUHJvdG9jb2xIdHRwU3RhdGVzLnBvcCgpO1xudmFyIFNfTUFJTFRPID0gcGFydGlhbFByb3RvY29sTWFpbHRvU3RhdGVzLnBvcCgpO1xudmFyIFNfUFJPVE9DT0xfU0VDVVJFID0gbWFrZVN0YXRlKF90ZXh0LkRPTUFJTik7XG52YXIgU19GVUxMX1BST1RPQ09MID0gbWFrZVN0YXRlKF90ZXh0LlBST1RPQ09MKTsgLy8gRnVsbCBwcm90b2NvbCBlbmRzIHdpdGggQ09MT05cbnZhciBTX0ZVTExfTUFJTFRPID0gbWFrZVN0YXRlKF90ZXh0Lk1BSUxUTyk7IC8vIE1haWx0byBlbmRzIHdpdGggQ09MT05cblxuLy8gU2VjdXJlIHByb3RvY29scyAoZW5kIHdpdGggJ3MnKVxuU19QUk9UT0NPTF9GVFAub24oJ3MnLCBTX1BST1RPQ09MX1NFQ1VSRSkub24oJzonLCBTX0ZVTExfUFJPVE9DT0wpO1xuXG5TX1BST1RPQ09MX0hUVFAub24oJ3MnLCBTX1BST1RPQ09MX1NFQ1VSRSkub24oJzonLCBTX0ZVTExfUFJPVE9DT0wpO1xuXG5kb21haW5TdGF0ZXMucHVzaChTX1BST1RPQ09MX1NFQ1VSRSk7XG5cbi8vIEJlY29tZSBwcm90b2NvbCB0b2tlbnMgYWZ0ZXIgYSBDT0xPTlxuU19QUk9UT0NPTF9GSUxFLm9uKCc6JywgU19GVUxMX1BST1RPQ09MKTtcblNfUFJPVE9DT0xfU0VDVVJFLm9uKCc6JywgU19GVUxMX1BST1RPQ09MKTtcblNfTUFJTFRPLm9uKCc6JywgU19GVUxMX01BSUxUTyk7XG5cbi8vIExvY2FsaG9zdFxudmFyIHBhcnRpYWxMb2NhbGhvc3RTdGF0ZXMgPSAoMCwgX3N0YXRlLnN0YXRlaWZ5KSgnbG9jYWxob3N0JywgU19TVEFSVCwgX3RleHQuTE9DQUxIT1NULCBfdGV4dC5ET01BSU4pO1xuZG9tYWluU3RhdGVzLnB1c2guYXBwbHkoZG9tYWluU3RhdGVzLCBwYXJ0aWFsTG9jYWxob3N0U3RhdGVzKTtcblxuLy8gRXZlcnl0aGluZyBlbHNlXG4vLyBET01BSU5zIG1ha2UgbW9yZSBET01BSU5zXG4vLyBOdW1iZXIgYW5kIGNoYXJhY3RlciB0cmFuc2l0aW9uc1xuU19TVEFSVC5vbihOVU1CRVJTLCBTX05VTSk7XG5TX05VTS5vbignLScsIFNfRE9NQUlOX0hZUEhFTikub24oTlVNQkVSUywgU19OVU0pLm9uKEFMUEhBTlVNLCBTX0RPTUFJTik7IC8vIG51bWJlciBiZWNvbWVzIERPTUFJTlxuXG5TX0RPTUFJTi5vbignLScsIFNfRE9NQUlOX0hZUEhFTikub24oQUxQSEFOVU0sIFNfRE9NQUlOKTtcblxuLy8gQWxsIHRoZSBnZW5lcmF0ZWQgc3RhdGVzIHNob3VsZCBoYXZlIGEganVtcCB0byBET01BSU5cbmZvciAodmFyIF9pID0gMDsgX2kgPCBkb21haW5TdGF0ZXMubGVuZ3RoOyBfaSsrKSB7XG5cdGRvbWFpblN0YXRlc1tfaV0ub24oJy0nLCBTX0RPTUFJTl9IWVBIRU4pLm9uKEFMUEhBTlVNLCBTX0RPTUFJTik7XG59XG5cblNfRE9NQUlOX0hZUEhFTi5vbignLScsIFNfRE9NQUlOX0hZUEhFTikub24oTlVNQkVSUywgU19ET01BSU4pLm9uKEFMUEhBTlVNLCBTX0RPTUFJTik7XG5cbi8vIFNldCBkZWZhdWx0IHRyYW5zaXRpb25cblNfU1RBUlQuZGVmYXVsdFRyYW5zaXRpb24gPSBtYWtlU3RhdGUoX3RleHQuU1lNKTtcblxuLyoqXG5cdEdpdmVuIGEgc3RyaW5nLCByZXR1cm5zIGFuIGFycmF5IG9mIFRPS0VOIGluc3RhbmNlcyByZXByZXNlbnRpbmcgdGhlXG5cdGNvbXBvc2l0aW9uIG9mIHRoYXQgc3RyaW5nLlxuXG5cdEBtZXRob2QgcnVuXG5cdEBwYXJhbSB7U3RyaW5nfSBzdHIgSW5wdXQgc3RyaW5nIHRvIHNjYW5cblx0QHJldHVybiB7QXJyYXl9IEFycmF5IG9mIFRPS0VOIGluc3RhbmNlc1xuKi9cbnZhciBydW4gPSBmdW5jdGlvbiBydW4oc3RyKSB7XG5cblx0Ly8gVGhlIHN0YXRlIG1hY2hpbmUgb25seSBsb29rcyBhdCBsb3dlcmNhc2Ugc3RyaW5ncy5cblx0Ly8gVGhpcyBzZWxlY3RpdmUgYHRvTG93ZXJDYXNlYCBpcyB1c2VkIGJlY2F1c2UgbG93ZXJjYXNpbmcgdGhlIGVudGlyZVxuXHQvLyBzdHJpbmcgY2F1c2VzIHRoZSBsZW5ndGggYW5kIGNoYXJhY3RlciBwb3NpdGlvbiB0byB2YXJ5IGluIHNvbWUgaW4gc29tZVxuXHQvLyBub24tRW5nbGlzaCBzdHJpbmdzLiBUaGlzIGhhcHBlbnMgb25seSBvbiBWOC1iYXNlZCBydW50aW1lcy5cblx0dmFyIGxvd2VyU3RyID0gc3RyLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuIGMudG9Mb3dlckNhc2UoKTtcblx0fSk7XG5cdHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuXHR2YXIgdG9rZW5zID0gW107IC8vIHJldHVybiB2YWx1ZVxuXG5cdHZhciBjdXJzb3IgPSAwO1xuXG5cdC8vIFRva2VuaXplIHRoZSBzdHJpbmdcblx0d2hpbGUgKGN1cnNvciA8IGxlbikge1xuXHRcdHZhciBzdGF0ZSA9IFNfU1RBUlQ7XG5cdFx0dmFyIG5leHRTdGF0ZSA9IG51bGw7XG5cdFx0dmFyIHRva2VuTGVuZ3RoID0gMDtcblx0XHR2YXIgbGF0ZXN0QWNjZXB0aW5nID0gbnVsbDtcblx0XHR2YXIgc2luY2VBY2NlcHRzID0gLTE7XG5cblx0XHR3aGlsZSAoY3Vyc29yIDwgbGVuICYmIChuZXh0U3RhdGUgPSBzdGF0ZS5uZXh0KGxvd2VyU3RyW2N1cnNvcl0pKSkge1xuXHRcdFx0c3RhdGUgPSBuZXh0U3RhdGU7XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2YgdGhlIGxhdGVzdCBhY2NlcHRpbmcgc3RhdGVcblx0XHRcdGlmIChzdGF0ZS5hY2NlcHRzKCkpIHtcblx0XHRcdFx0c2luY2VBY2NlcHRzID0gMDtcblx0XHRcdFx0bGF0ZXN0QWNjZXB0aW5nID0gc3RhdGU7XG5cdFx0XHR9IGVsc2UgaWYgKHNpbmNlQWNjZXB0cyA+PSAwKSB7XG5cdFx0XHRcdHNpbmNlQWNjZXB0cysrO1xuXHRcdFx0fVxuXG5cdFx0XHR0b2tlbkxlbmd0aCsrO1xuXHRcdFx0Y3Vyc29yKys7XG5cdFx0fVxuXG5cdFx0aWYgKHNpbmNlQWNjZXB0cyA8IDApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH0gLy8gU2hvdWxkIG5ldmVyIGhhcHBlblxuXG5cdFx0Ly8gUm9sbCBiYWNrIHRvIHRoZSBsYXRlc3QgYWNjZXB0aW5nIHN0YXRlXG5cdFx0Y3Vyc29yIC09IHNpbmNlQWNjZXB0cztcblx0XHR0b2tlbkxlbmd0aCAtPSBzaW5jZUFjY2VwdHM7XG5cblx0XHQvLyBHZXQgdGhlIGNsYXNzIGZvciB0aGUgbmV3IHRva2VuXG5cdFx0dmFyIFRPS0VOID0gbGF0ZXN0QWNjZXB0aW5nLmVtaXQoKTsgLy8gQ3VycmVudCB0b2tlbiBjbGFzc1xuXG5cdFx0Ly8gTm8gbW9yZSBqdW1wcywganVzdCBtYWtlIGEgbmV3IHRva2VuXG5cdFx0dG9rZW5zLnB1c2gobmV3IFRPS0VOKHN0ci5zdWJzdHIoY3Vyc29yIC0gdG9rZW5MZW5ndGgsIHRva2VuTGVuZ3RoKSkpO1xuXHR9XG5cblx0cmV0dXJuIHRva2Vucztcbn07XG5cbnZhciBzdGFydCA9IFNfU1RBUlQ7XG5leHBvcnRzLlN0YXRlID0gX3N0YXRlLkNoYXJhY3RlclN0YXRlO1xuZXhwb3J0cy5UT0tFTlMgPSBUT0tFTlM7XG5leHBvcnRzLnJ1biA9IHJ1bjtcbmV4cG9ydHMuc3RhcnQgPSBzdGFydDsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnN0YXRlaWZ5ID0gZXhwb3J0cy5Ub2tlblN0YXRlID0gZXhwb3J0cy5DaGFyYWN0ZXJTdGF0ZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jbGFzcyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NsYXNzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRlQ2xhc3MoKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodENsYXNzKSB7XG5cdFx0dGhpcy5qID0gW107XG5cdFx0dGhpcy5UID0gdENsYXNzIHx8IG51bGw7XG5cdH07XG59XG5cbi8qKlxuXHRBIHNpbXBsZSBzdGF0ZSBtYWNoaW5lIHRoYXQgY2FuIGVtaXQgdG9rZW4gY2xhc3Nlc1xuXG5cdFRoZSBgamAgcHJvcGVydHkgaW4gdGhpcyBjbGFzcyByZWZlcnMgdG8gc3RhdGUganVtcHMuIEl0J3MgYVxuXHRtdWx0aWRpbWVuc2lvbmFsIGFycmF5IHdoZXJlIGZvciBlYWNoIGVsZW1lbnQ6XG5cblx0KiBpbmRleCBbMF0gaXMgYSBzeW1ib2wgb3IgY2xhc3Mgb2Ygc3ltYm9scyB0byB0cmFuc2l0aW9uIHRvLlxuXHQqIGluZGV4IFsxXSBpcyBhIFN0YXRlIGluc3RhbmNlIHdoaWNoIG1hdGNoZXNcblxuXHRUaGUgdHlwZSBvZiBzeW1ib2wgd2lsbCBkZXBlbmQgb24gdGhlIHRhcmdldCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBjbGFzcy5cblx0SW4gTGlua2lmeSwgd2UgaGF2ZSBhIHR3by1zdGFnZSBzY2FubmVyLiBFYWNoIHN0YWdlIHVzZXMgdGhpcyBzdGF0ZSBtYWNoaW5lXG5cdGJ1dCB3aXRoIGEgc2xpZ2hseSBkaWZmZXJlbnQgKHBvbHltb3JwaGljKSBpbXBsZW1lbnRhdGlvbi5cblxuXHRUaGUgYFRgIHByb3BlcnR5IHJlZmVycyB0byB0aGUgdG9rZW4gY2xhc3MuXG5cblx0VE9ETzogQ2FuIHRoZSBgb25gIGFuZCBgbmV4dGAgbWV0aG9kcyBiZSBjb21iaW5lZD9cblxuXHRAY2xhc3MgQmFzZVN0YXRlXG4qL1xudmFyIEJhc2VTdGF0ZSA9IGNyZWF0ZVN0YXRlQ2xhc3MoKTtcbkJhc2VTdGF0ZS5wcm90b3R5cGUgPSB7XG5cdGRlZmF1bHRUcmFuc2l0aW9uOiBmYWxzZSxcblxuXHQvKipcbiBcdEBtZXRob2QgY29uc3RydWN0b3JcbiBcdEBwYXJhbSB7Q2xhc3N9IHRDbGFzcyBQYXNzIGluIHRoZSBraW5kIG9mIHRva2VuIHRvIGVtaXQgaWYgdGhlcmUgYXJlXG4gXHRcdG5vIGp1bXBzIGFmdGVyIHRoaXMgc3RhdGUgYW5kIHRoZSBzdGF0ZSBpcyBhY2NlcHRpbmcuXG4gKi9cblxuXHQvKipcbiBcdE9uIHRoZSBnaXZlbiBzeW1ib2wocyksIHRoaXMgbWFjaGluZSBzaG91bGQgZ28gdG8gdGhlIGdpdmVuIHN0YXRlXG4gXHRcdEBtZXRob2Qgb25cbiBcdEBwYXJhbSB7QXJyYXl8TWl4ZWR9IHN5bWJvbFxuIFx0QHBhcmFtIHtCYXNlU3RhdGV9IHN0YXRlIE5vdGUgdGhhdCB0aGUgdHlwZSBvZiB0aGlzIHN0YXRlIHNob3VsZCBiZSB0aGVcbiBcdFx0c2FtZSBhcyB0aGUgY3VycmVudCBpbnN0YW5jZSAoaS5lLiwgZG9uJ3QgcGFzcyBpbiBhIGRpZmZlcmVudFxuIFx0XHRzdWJjbGFzcylcbiAqL1xuXHRvbjogZnVuY3Rpb24gb24oc3ltYm9sLCBzdGF0ZSkge1xuXHRcdGlmIChzeW1ib2wgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2wubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy5qLnB1c2goW3N5bWJvbFtpXSwgc3RhdGVdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHR0aGlzLmoucHVzaChbc3ltYm9sLCBzdGF0ZV0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cblx0LyoqXG4gXHRHaXZlbiB0aGUgbmV4dCBpdGVtLCByZXR1cm5zIG5leHQgc3RhdGUgZm9yIHRoYXQgaXRlbVxuIFx0QG1ldGhvZCBuZXh0XG4gXHRAcGFyYW0ge01peGVkfSBpdGVtIFNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiB0aGUgc3ltYm9scyBoYW5kbGVkIGJ5XG4gXHRcdHRoaXMgcGFydGljdWxhciBtYWNoaW5lLlxuIFx0QHJldHVybiB7U3RhdGV9IHN0YXRlIFJldHVybnMgZmFsc2UgaWYgbm8ganVtcHMgYXJlIGF2YWlsYWJsZVxuICovXG5cdG5leHQ6IGZ1bmN0aW9uIG5leHQoaXRlbSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5qLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIganVtcCA9IHRoaXMualtpXTtcblx0XHRcdHZhciBzeW1ib2wgPSBqdW1wWzBdOyAvLyBOZXh0IGl0ZW0gdG8gY2hlY2sgZm9yXG5cdFx0XHR2YXIgc3RhdGUgPSBqdW1wWzFdOyAvLyBTdGF0ZSB0byBqdW1wIHRvIGlmIGl0ZW1zIG1hdGNoXG5cblx0XHRcdC8vIGNvbXBhcmUgaXRlbSB3aXRoIHN5bWJvbFxuXHRcdFx0aWYgKHRoaXMudGVzdChpdGVtLCBzeW1ib2wpKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBOb3doZXJlIGxlZnQgdG8ganVtcCFcblx0XHRyZXR1cm4gdGhpcy5kZWZhdWx0VHJhbnNpdGlvbjtcblx0fSxcblxuXG5cdC8qKlxuIFx0RG9lcyB0aGlzIHN0YXRlIGFjY2VwdD9cbiBcdGB0cnVlYCBvbmx5IG9mIGB0aGlzLlRgIGV4aXN0c1xuIFx0XHRAbWV0aG9kIGFjY2VwdHNcbiBcdEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblx0YWNjZXB0czogZnVuY3Rpb24gYWNjZXB0cygpIHtcblx0XHRyZXR1cm4gISF0aGlzLlQ7XG5cdH0sXG5cblxuXHQvKipcbiBcdERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gaXRlbSBcInN5bWJvbGl6ZXNcIiB0aGUgc3ltYm9sLCB3aGVyZSBzeW1ib2wgaXNcbiBcdGEgY2xhc3Mgb2YgaXRlbXMgaGFuZGxlZCBieSB0aGlzIHN0YXRlIG1hY2hpbmUuXG4gXHRcdFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW4gaW4gZXh0ZW5kZWQgY2xhc3Nlcy5cbiBcdFx0QG1ldGhvZCB0ZXN0XG4gXHRAcGFyYW0ge01peGVkfSBpdGVtIERvZXMgdGhpcyBpdGVtIG1hdGNoIHRoZSBnaXZlbiBzeW1ib2w/XG4gXHRAcGFyYW0ge01peGVkfSBzeW1ib2xcbiBcdEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblx0dGVzdDogZnVuY3Rpb24gdGVzdChpdGVtLCBzeW1ib2wpIHtcblx0XHRyZXR1cm4gaXRlbSA9PT0gc3ltYm9sO1xuXHR9LFxuXG5cblx0LyoqXG4gXHRFbWl0IHRoZSB0b2tlbiBmb3IgdGhpcyBTdGF0ZSAoanVzdCByZXR1cm4gaXQgaW4gdGhpcyBjYXNlKVxuIFx0SWYgdGhpcyBlbWl0cyBhIHRva2VuLCB0aGlzIGluc3RhbmNlIGlzIGFuIGFjY2VwdGluZyBzdGF0ZVxuIFx0QG1ldGhvZCBlbWl0XG4gXHRAcmV0dXJuIHtDbGFzc30gVFxuICovXG5cdGVtaXQ6IGZ1bmN0aW9uIGVtaXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuVDtcblx0fVxufTtcblxuLyoqXG5cdFN0YXRlIG1hY2hpbmUgZm9yIHN0cmluZy1iYXNlZCBpbnB1dFxuXG5cdEBjbGFzcyBDaGFyYWN0ZXJTdGF0ZVxuXHRAZXh0ZW5kcyBCYXNlU3RhdGVcbiovXG52YXIgQ2hhcmFjdGVyU3RhdGUgPSAoMCwgX2NsYXNzLmluaGVyaXRzKShCYXNlU3RhdGUsIGNyZWF0ZVN0YXRlQ2xhc3MoKSwge1xuXHQvKipcbiBcdERvZXMgdGhlIGdpdmVuIGNoYXJhY3RlciBtYXRjaCB0aGUgZ2l2ZW4gY2hhcmFjdGVyIG9yIHJlZ3VsYXJcbiBcdGV4cHJlc3Npb24/XG4gXHRcdEBtZXRob2QgdGVzdFxuIFx0QHBhcmFtIHtTdHJpbmd9IGNoYXJcbiBcdEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gY2hhck9yUmVnRXhwXG4gXHRAcmV0dXJuIHtCb29sZWFufVxuICovXG5cdHRlc3Q6IGZ1bmN0aW9uIHRlc3QoY2hhcmFjdGVyLCBjaGFyT3JSZWdFeHApIHtcblx0XHRyZXR1cm4gY2hhcmFjdGVyID09PSBjaGFyT3JSZWdFeHAgfHwgY2hhck9yUmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwICYmIGNoYXJPclJlZ0V4cC50ZXN0KGNoYXJhY3Rlcik7XG5cdH1cbn0pO1xuXG4vKipcblx0U3RhdGUgbWFjaGluZSBmb3IgaW5wdXQgaW4gdGhlIGZvcm0gb2YgVGV4dFRva2Vuc1xuXG5cdEBjbGFzcyBUb2tlblN0YXRlXG5cdEBleHRlbmRzIEJhc2VTdGF0ZVxuKi9cbnZhciBUb2tlblN0YXRlID0gKDAsIF9jbGFzcy5pbmhlcml0cykoQmFzZVN0YXRlLCBjcmVhdGVTdGF0ZUNsYXNzKCksIHtcblxuXHQvKipcbiAgKiBTaW1pbGFyIHRvIGBvbmAsIGJ1dCByZXR1cm5zIHRoZSBzdGF0ZSB0aGUgcmVzdWx0cyBpbiB0aGUgdHJhbnNpdGlvbiBmcm9tXG4gICogdGhlIGdpdmVuIGl0ZW1cbiAgKiBAbWV0aG9kIGp1bXBcbiAgKiBAcGFyYW0ge01peGVkfSBpdGVtXG4gICogQHBhcmFtIHtUb2tlbn0gW3Rva2VuXVxuICAqIEByZXR1cm4gc3RhdGVcbiAgKi9cblx0anVtcDogZnVuY3Rpb24ganVtcCh0b2tlbikge1xuXHRcdHZhciB0Q2xhc3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG5cblx0XHR2YXIgc3RhdGUgPSB0aGlzLm5leHQobmV3IHRva2VuKCcnKSk7IC8vIGR1bW15IHRlbXAgdG9rZW5cblx0XHRpZiAoc3RhdGUgPT09IHRoaXMuZGVmYXVsdFRyYW5zaXRpb24pIHtcblx0XHRcdC8vIE1ha2UgYSBuZXcgc3RhdGUhXG5cdFx0XHRzdGF0ZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRDbGFzcyk7XG5cdFx0XHR0aGlzLm9uKHRva2VuLCBzdGF0ZSk7XG5cdFx0fSBlbHNlIGlmICh0Q2xhc3MpIHtcblx0XHRcdHN0YXRlLlQgPSB0Q2xhc3M7XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZTtcblx0fSxcblxuXG5cdC8qKlxuIFx0SXMgdGhlIGdpdmVuIHRva2VuIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiB0b2tlbiBjbGFzcz9cbiBcdFx0QG1ldGhvZCB0ZXN0XG4gXHRAcGFyYW0ge1RleHRUb2tlbn0gdG9rZW5cbiBcdEBwYXJhbSB7Q2xhc3N9IHRva2VuQ2xhc3NcbiBcdEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblx0dGVzdDogZnVuY3Rpb24gdGVzdCh0b2tlbiwgdG9rZW5DbGFzcykge1xuXHRcdHJldHVybiB0b2tlbiBpbnN0YW5jZW9mIHRva2VuQ2xhc3M7XG5cdH1cbn0pO1xuXG4vKipcblx0R2l2ZW4gYSBub24tZW1wdHkgdGFyZ2V0IHN0cmluZywgZ2VuZXJhdGVzIHN0YXRlcyAoaWYgcmVxdWlyZWQpIGZvciBlYWNoXG5cdGNvbnNlY3V0aXZlIHN1YnN0cmluZyBvZiBjaGFyYWN0ZXJzIGluIHN0ciBzdGFydGluZyBmcm9tIHRoZSBiZWdpbm5pbmcgb2Zcblx0dGhlIHN0cmluZy4gVGhlIGZpbmFsIHN0YXRlIHdpbGwgaGF2ZSBhIHNwZWNpYWwgdmFsdWUsIGFzIHNwZWNpZmllZCBpblxuXHRvcHRpb25zLiBBbGwgb3RoZXIgXCJpbiBiZXR3ZWVuXCIgc3Vic3RyaW5ncyB3aWxsIGhhdmUgYSBkZWZhdWx0IGVuZCBzdGF0ZS5cblxuXHRUaGlzIHR1cm5zIHRoZSBzdGF0ZSBtYWNoaW5lIGludG8gYSBUcmllLWxpa2UgZGF0YSBzdHJ1Y3R1cmUgKHJhdGhlciB0aGFuIGFcblx0aW50ZWxsaWdlbnRseS1kZXNpZ25lZCBERkEpLlxuXG5cdE5vdGUgdGhhdCBJIGhhdmVuJ3QgcmVhbGx5IHRyaWVkIHRoZXNlIHdpdGggYW55IHN0cmluZ3Mgb3RoZXIgdGhhblxuXHRET01BSU4uXG5cblx0QHBhcmFtIHtTdHJpbmd9IHN0clxuXHRAcGFyYW0ge0NoYXJhY3RlclN0YXRlfSBzdGFydCBTdGF0ZSB0byBqdW1wIGZyb20gdGhlIGZpcnN0IGNoYXJhY3RlclxuXHRAcGFyYW0ge0NsYXNzfSBlbmRUb2tlbiBUb2tlbiBjbGFzcyB0byBlbWl0IHdoZW4gdGhlIGdpdmVuIHN0cmluZyBoYXMgYmVlblxuXHRcdG1hdGNoZWQgYW5kIG5vIG1vcmUganVtcHMgZXhpc3QuXG5cdEBwYXJhbSB7Q2xhc3N9IGRlZmF1bHRUb2tlbiBcIkZpbGxlciB0b2tlblwiLCBvciB3aGljaCB0b2tlbiB0eXBlIHRvIGVtaXQgd2hlblxuXHRcdHdlIGRvbid0IGhhdmUgYSBmdWxsIG1hdGNoXG5cdEByZXR1cm4ge0FycmF5fSBsaXN0IG9mIG5ld2x5LWNyZWF0ZWQgc3RhdGVzXG4qL1xuZnVuY3Rpb24gc3RhdGVpZnkoc3RyLCBzdGFydCwgZW5kVG9rZW4sIGRlZmF1bHRUb2tlbikge1xuXHR2YXIgaSA9IDAsXG5cdCAgICBsZW4gPSBzdHIubGVuZ3RoLFxuXHQgICAgc3RhdGUgPSBzdGFydCxcblx0ICAgIG5ld1N0YXRlcyA9IFtdLFxuXHQgICAgbmV4dFN0YXRlID0gdm9pZCAwO1xuXG5cdC8vIEZpbmQgdGhlIG5leHQgc3RhdGUgd2l0aG91dCBhIGp1bXAgdG8gdGhlIG5leHQgY2hhcmFjdGVyXG5cdHdoaWxlIChpIDwgbGVuICYmIChuZXh0U3RhdGUgPSBzdGF0ZS5uZXh0KHN0cltpXSkpKSB7XG5cdFx0c3RhdGUgPSBuZXh0U3RhdGU7XG5cdFx0aSsrO1xuXHR9XG5cblx0aWYgKGkgPj0gbGVuKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9IC8vIG5vIG5ldyB0b2tlbnMgd2VyZSBhZGRlZFxuXG5cdHdoaWxlIChpIDwgbGVuIC0gMSkge1xuXHRcdG5leHRTdGF0ZSA9IG5ldyBDaGFyYWN0ZXJTdGF0ZShkZWZhdWx0VG9rZW4pO1xuXHRcdG5ld1N0YXRlcy5wdXNoKG5leHRTdGF0ZSk7XG5cdFx0c3RhdGUub24oc3RyW2ldLCBuZXh0U3RhdGUpO1xuXHRcdHN0YXRlID0gbmV4dFN0YXRlO1xuXHRcdGkrKztcblx0fVxuXG5cdG5leHRTdGF0ZSA9IG5ldyBDaGFyYWN0ZXJTdGF0ZShlbmRUb2tlbik7XG5cdG5ld1N0YXRlcy5wdXNoKG5leHRTdGF0ZSk7XG5cdHN0YXRlLm9uKHN0cltsZW4gLSAxXSwgbmV4dFN0YXRlKTtcblxuXHRyZXR1cm4gbmV3U3RhdGVzO1xufVxuXG5leHBvcnRzLkNoYXJhY3RlclN0YXRlID0gQ2hhcmFjdGVyU3RhdGU7XG5leHBvcnRzLlRva2VuU3RhdGUgPSBUb2tlblN0YXRlO1xuZXhwb3J0cy5zdGF0ZWlmeSA9IHN0YXRlaWZ5OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gY3JlYXRlVG9rZW5DbGFzcygpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dGhpcy52ID0gdmFsdWU7XG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnRzLmNyZWF0ZVRva2VuQ2xhc3MgPSBjcmVhdGVUb2tlbkNsYXNzOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuVVJMID0gZXhwb3J0cy5URVhUID0gZXhwb3J0cy5OTCA9IGV4cG9ydHMuRU1BSUwgPSBleHBvcnRzLk1BSUxUT0VNQUlMID0gZXhwb3J0cy5CYXNlID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZVRva2VuQ2xhc3MgPSByZXF1aXJlKCcuL2NyZWF0ZS10b2tlbi1jbGFzcycpO1xuXG52YXIgX2NsYXNzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvY2xhc3MnKTtcblxudmFyIF90ZXh0ID0gcmVxdWlyZSgnLi90ZXh0Jyk7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0TXVsdGktVG9rZW5zXG5cdFRva2VucyBjb21wb3NlZCBvZiBhcnJheXMgb2YgVGV4dFRva2Vuc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vLyBJcyB0aGUgZ2l2ZW4gdG9rZW4gYSB2YWxpZCBkb21haW4gdG9rZW4/XG4vLyBTaG91bGQgbnVtcyBiZSBpbmNsdWRlZCBoZXJlP1xuZnVuY3Rpb24gaXNEb21haW5Ub2tlbih0b2tlbikge1xuXHRyZXR1cm4gdG9rZW4gaW5zdGFuY2VvZiBfdGV4dC5ET01BSU4gfHwgdG9rZW4gaW5zdGFuY2VvZiBfdGV4dC5UTEQ7XG59XG5cbi8qKlxuXHRBYnN0cmFjdCBjbGFzcyB1c2VkIGZvciBtYW51ZmFjdHVyaW5nIHRva2VucyBvZiB0ZXh0IHRva2Vucy4gVGhhdCBpcyByYXRoZXJcblx0dGhhbiB0aGUgdmFsdWUgZm9yIGEgdG9rZW4gYmVpbmcgYSBzbWFsbCBzdHJpbmcgb2YgdGV4dCwgaXQncyB2YWx1ZSBhbiBhcnJheVxuXHRvZiB0ZXh0IHRva2Vucy5cblxuXHRVc2VkIGZvciBncm91cGluZyB0b2dldGhlciBVUkxzLCBlbWFpbHMsIGhhc2h0YWdzLCBhbmQgb3RoZXIgcG90ZW50aWFsXG5cdGNyZWF0aW9ucy5cblxuXHRAY2xhc3MgTXVsdGlUb2tlblxuXHRAYWJzdHJhY3RcbiovXG52YXIgTXVsdGlUb2tlbiA9ICgwLCBfY3JlYXRlVG9rZW5DbGFzcy5jcmVhdGVUb2tlbkNsYXNzKSgpO1xuXG5NdWx0aVRva2VuLnByb3RvdHlwZSA9IHtcblx0LyoqXG4gXHRTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB0eXBlIGZvciB0aGlzIHRva2VuXG4gXHRAcHJvcGVydHkgdHlwZVxuIFx0QGRlZmF1bHQgJ1RPS0VOJ1xuICovXG5cdHR5cGU6ICd0b2tlbicsXG5cblx0LyoqXG4gXHRJcyB0aGlzIG11bHRpdG9rZW4gYSBsaW5rP1xuIFx0QHByb3BlcnR5IGlzTGlua1xuIFx0QGRlZmF1bHQgZmFsc2VcbiAqL1xuXHRpc0xpbms6IGZhbHNlLFxuXG5cdC8qKlxuIFx0UmV0dXJuIHRoZSBzdHJpbmcgdGhpcyB0b2tlbiByZXByZXNlbnRzLlxuIFx0QG1ldGhvZCB0b1N0cmluZ1xuIFx0QHJldHVybiB7U3RyaW5nfVxuICovXG5cdHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnYubGVuZ3RoOyBpKyspIHtcblx0XHRcdHJlc3VsdC5wdXNoKHRoaXMudltpXS50b1N0cmluZygpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXG5cdC8qKlxuIFx0V2hhdCBzaG91bGQgdGhlIHZhbHVlIGZvciB0aGlzIHRva2VuIGJlIGluIHRoZSBgaHJlZmAgSFRNTCBhdHRyaWJ1dGU/XG4gXHRSZXR1cm5zIHRoZSBgLnRvU3RyaW5nYCB2YWx1ZSBieSBkZWZhdWx0LlxuIFx0XHRAbWV0aG9kIHRvSHJlZlxuIFx0QHJldHVybiB7U3RyaW5nfVxuICovXG5cdHRvSHJlZjogZnVuY3Rpb24gdG9IcmVmKCkge1xuXHRcdHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG5cdH0sXG5cblxuXHQvKipcbiBcdFJldHVybnMgYSBoYXNoIG9mIHJlbGV2YW50IHZhbHVlcyBmb3IgdGhpcyB0b2tlbiwgd2hpY2ggaW5jbHVkZXMga2V5c1xuIFx0KiB0eXBlIC0gS2luZCBvZiB0b2tlbiAoJ3VybCcsICdlbWFpbCcsIGV0Yy4pXG4gXHQqIHZhbHVlIC0gT3JpZ2luYWwgdGV4dFxuIFx0KiBocmVmIC0gVGhlIHZhbHVlIHRoYXQgc2hvdWxkIGJlIGFkZGVkIHRvIHRoZSBhbmNob3IgdGFnJ3MgaHJlZlxuIFx0XHRhdHRyaWJ1dGVcbiBcdFx0QG1ldGhvZCB0b09iamVjdFxuIFx0QHBhcmFtIHtTdHJpbmd9IFtwcm90b2NvbF0gYCdodHRwJ2AgYnkgZGVmYXVsdFxuIFx0QHJldHVybiB7T2JqZWN0fVxuICovXG5cdHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCgpIHtcblx0XHR2YXIgcHJvdG9jb2wgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdodHRwJztcblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiB0aGlzLnR5cGUsXG5cdFx0XHR2YWx1ZTogdGhpcy50b1N0cmluZygpLFxuXHRcdFx0aHJlZjogdGhpcy50b0hyZWYocHJvdG9jb2wpXG5cdFx0fTtcblx0fVxufTtcblxuLyoqXG5cdFJlcHJlc2VudHMgYW4gYXJiaXRyYXJpbHkgbWFpbHRvIGVtYWlsIGFkZHJlc3Mgd2l0aCB0aGUgcHJlZml4IGluY2x1ZGVkXG5cdEBjbGFzcyBNQUlMVE9cblx0QGV4dGVuZHMgTXVsdGlUb2tlblxuKi9cbnZhciBNQUlMVE9FTUFJTCA9ICgwLCBfY2xhc3MuaW5oZXJpdHMpKE11bHRpVG9rZW4sICgwLCBfY3JlYXRlVG9rZW5DbGFzcy5jcmVhdGVUb2tlbkNsYXNzKSgpLCB7XG5cdHR5cGU6ICdlbWFpbCcsXG5cdGlzTGluazogdHJ1ZVxufSk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIGEgbGlzdCBvZiB0b2tlbnMgbWFraW5nIHVwIGEgdmFsaWQgZW1haWwgYWRkcmVzc1xuXHRAY2xhc3MgRU1BSUxcblx0QGV4dGVuZHMgTXVsdGlUb2tlblxuKi9cbnZhciBFTUFJTCA9ICgwLCBfY2xhc3MuaW5oZXJpdHMpKE11bHRpVG9rZW4sICgwLCBfY3JlYXRlVG9rZW5DbGFzcy5jcmVhdGVUb2tlbkNsYXNzKSgpLCB7XG5cdHR5cGU6ICdlbWFpbCcsXG5cdGlzTGluazogdHJ1ZSxcblx0dG9IcmVmOiBmdW5jdGlvbiB0b0hyZWYoKSB7XG5cdFx0cmV0dXJuICdtYWlsdG86JyArIHRoaXMudG9TdHJpbmcoKTtcblx0fVxufSk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIHNvbWUgcGxhaW4gdGV4dFxuXHRAY2xhc3MgVEVYVFxuXHRAZXh0ZW5kcyBNdWx0aVRva2VuXG4qL1xudmFyIFRFWFQgPSAoMCwgX2NsYXNzLmluaGVyaXRzKShNdWx0aVRva2VuLCAoMCwgX2NyZWF0ZVRva2VuQ2xhc3MuY3JlYXRlVG9rZW5DbGFzcykoKSwgeyB0eXBlOiAndGV4dCcgfSk7XG5cbi8qKlxuXHRNdWx0aS1saW5lYnJlYWsgdG9rZW4gLSByZXByZXNlbnRzIGEgbGluZSBicmVha1xuXHRAY2xhc3MgTkxcblx0QGV4dGVuZHMgTXVsdGlUb2tlblxuKi9cbnZhciBOTCA9ICgwLCBfY2xhc3MuaW5oZXJpdHMpKE11bHRpVG9rZW4sICgwLCBfY3JlYXRlVG9rZW5DbGFzcy5jcmVhdGVUb2tlbkNsYXNzKSgpLCB7IHR5cGU6ICdubCcgfSk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIGEgbGlzdCBvZiB0b2tlbnMgbWFraW5nIHVwIGEgdmFsaWQgVVJMXG5cdEBjbGFzcyBVUkxcblx0QGV4dGVuZHMgTXVsdGlUb2tlblxuKi9cbnZhciBVUkwgPSAoMCwgX2NsYXNzLmluaGVyaXRzKShNdWx0aVRva2VuLCAoMCwgX2NyZWF0ZVRva2VuQ2xhc3MuY3JlYXRlVG9rZW5DbGFzcykoKSwge1xuXHR0eXBlOiAndXJsJyxcblx0aXNMaW5rOiB0cnVlLFxuXG5cdC8qKlxuIFx0TG93ZXJjYXNlcyByZWxldmFudCBwYXJ0cyBvZiB0aGUgZG9tYWluIGFuZCBhZGRzIHRoZSBwcm90b2NvbCBpZlxuIFx0cmVxdWlyZWQuIE5vdGUgdGhhdCB0aGlzIHdpbGwgbm90IGVzY2FwZSB1bnNhZmUgSFRNTCBjaGFyYWN0ZXJzIGluIHRoZVxuIFx0VVJMLlxuIFx0XHRAbWV0aG9kIGhyZWZcbiBcdEBwYXJhbSB7U3RyaW5nfSBwcm90b2NvbFxuIFx0QHJldHVybiB7U3RyaW5nfVxuICovXG5cdHRvSHJlZjogZnVuY3Rpb24gdG9IcmVmKCkge1xuXHRcdHZhciBwcm90b2NvbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2h0dHAnO1xuXG5cdFx0dmFyIGhhc1Byb3RvY29sID0gZmFsc2U7XG5cdFx0dmFyIGhhc1NsYXNoU2xhc2ggPSBmYWxzZTtcblx0XHR2YXIgdG9rZW5zID0gdGhpcy52O1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR2YXIgaSA9IDA7XG5cblx0XHQvLyBNYWtlIHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSBkb21haW4gbG93ZXJjYXNlXG5cdFx0Ly8gTG93ZXJjYXNlIHByb3RvY29sXG5cdFx0d2hpbGUgKHRva2Vuc1tpXSBpbnN0YW5jZW9mIF90ZXh0LlBST1RPQ09MKSB7XG5cdFx0XHRoYXNQcm90b2NvbCA9IHRydWU7XG5cdFx0XHRyZXN1bHQucHVzaCh0b2tlbnNbaV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHQvLyBTa2lwIHNsYXNoLXNsYXNoXG5cdFx0d2hpbGUgKHRva2Vuc1tpXSBpbnN0YW5jZW9mIF90ZXh0LlNMQVNIKSB7XG5cdFx0XHRoYXNTbGFzaFNsYXNoID0gdHJ1ZTtcblx0XHRcdHJlc3VsdC5wdXNoKHRva2Vuc1tpXS50b1N0cmluZygpKTtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHQvLyBMb3dlcmNhc2UgYWxsIG90aGVyIGNoYXJhY3RlcnMgaW4gdGhlIGRvbWFpblxuXHRcdHdoaWxlIChpc0RvbWFpblRva2VuKHRva2Vuc1tpXSkpIHtcblx0XHRcdHJlc3VsdC5wdXNoKHRva2Vuc1tpXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdC8vIExlYXZlIGFsbCBvdGhlciBjaGFyYWN0ZXJzIGFzIHRoZXkgd2VyZSB3cml0dGVuXG5cdFx0Zm9yICg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHJlc3VsdC5wdXNoKHRva2Vuc1tpXS50b1N0cmluZygpKTtcblx0XHR9XG5cblx0XHRyZXN1bHQgPSByZXN1bHQuam9pbignJyk7XG5cblx0XHRpZiAoIShoYXNQcm90b2NvbCB8fCBoYXNTbGFzaFNsYXNoKSkge1xuXHRcdFx0cmVzdWx0ID0gcHJvdG9jb2wgKyAnOi8vJyArIHJlc3VsdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXHRoYXNQcm90b2NvbDogZnVuY3Rpb24gaGFzUHJvdG9jb2woKSB7XG5cdFx0cmV0dXJuIHRoaXMudlswXSBpbnN0YW5jZW9mIF90ZXh0LlBST1RPQ09MO1xuXHR9XG59KTtcblxuZXhwb3J0cy5CYXNlID0gTXVsdGlUb2tlbjtcbmV4cG9ydHMuTUFJTFRPRU1BSUwgPSBNQUlMVE9FTUFJTDtcbmV4cG9ydHMuRU1BSUwgPSBFTUFJTDtcbmV4cG9ydHMuTkwgPSBOTDtcbmV4cG9ydHMuVEVYVCA9IFRFWFQ7XG5leHBvcnRzLlVSTCA9IFVSTDsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFNUEVSU0FORCA9IGV4cG9ydHMuQ0xPU0VQQVJFTiA9IGV4cG9ydHMuQ0xPU0VBTkdMRUJSQUNLRVQgPSBleHBvcnRzLkNMT1NFQlJBQ0tFVCA9IGV4cG9ydHMuQ0xPU0VCUkFDRSA9IGV4cG9ydHMuT1BFTlBBUkVOID0gZXhwb3J0cy5PUEVOQU5HTEVCUkFDS0VUID0gZXhwb3J0cy5PUEVOQlJBQ0tFVCA9IGV4cG9ydHMuT1BFTkJSQUNFID0gZXhwb3J0cy5XUyA9IGV4cG9ydHMuVExEID0gZXhwb3J0cy5TWU0gPSBleHBvcnRzLlVOREVSU0NPUkUgPSBleHBvcnRzLlNMQVNIID0gZXhwb3J0cy5NQUlMVE8gPSBleHBvcnRzLlBST1RPQ09MID0gZXhwb3J0cy5RVUVSWSA9IGV4cG9ydHMuUE9VTkQgPSBleHBvcnRzLlBMVVMgPSBleHBvcnRzLk5VTSA9IGV4cG9ydHMuTkwgPSBleHBvcnRzLkxPQ0FMSE9TVCA9IGV4cG9ydHMuUFVOQ1RVQVRJT04gPSBleHBvcnRzLkRPVCA9IGV4cG9ydHMuQ09MT04gPSBleHBvcnRzLkFUID0gZXhwb3J0cy5ET01BSU4gPSBleHBvcnRzLkJhc2UgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlVG9rZW5DbGFzcyA9IHJlcXVpcmUoJy4vY3JlYXRlLXRva2VuLWNsYXNzJyk7XG5cbnZhciBfY2xhc3MgPSByZXF1aXJlKCcuLi8uLi91dGlscy9jbGFzcycpO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdFRleHQgVG9rZW5zXG5cdFRva2VucyBjb21wb3NlZCBvZiBzdHJpbmdzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuXHRBYnN0cmFjdCBjbGFzcyB1c2VkIGZvciBtYW51ZmFjdHVyaW5nIHRleHQgdG9rZW5zLlxuXHRQYXNzIGluIHRoZSB2YWx1ZSB0aGlzIHRva2VuIHJlcHJlc2VudHNcblxuXHRAY2xhc3MgVGV4dFRva2VuXG5cdEBhYnN0cmFjdFxuKi9cbnZhciBUZXh0VG9rZW4gPSAoMCwgX2NyZWF0ZVRva2VuQ2xhc3MuY3JlYXRlVG9rZW5DbGFzcykoKTtcblRleHRUb2tlbi5wcm90b3R5cGUgPSB7XG5cdHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy52ICsgJyc7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGluaGVyaXRzVG9rZW4odmFsdWUpIHtcblx0dmFyIHByb3BzID0gdmFsdWUgPyB7IHY6IHZhbHVlIH0gOiB7fTtcblx0cmV0dXJuICgwLCBfY2xhc3MuaW5oZXJpdHMpKFRleHRUb2tlbiwgKDAsIF9jcmVhdGVUb2tlbkNsYXNzLmNyZWF0ZVRva2VuQ2xhc3MpKCksIHByb3BzKTtcbn1cblxuLyoqXG5cdEEgdmFsaWQgZG9tYWluIHRva2VuXG5cdEBjbGFzcyBET01BSU5cblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIERPTUFJTiA9IGluaGVyaXRzVG9rZW4oKTtcblxuLyoqXG5cdEBjbGFzcyBBVFxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgQVQgPSBpbmhlcml0c1Rva2VuKCdAJyk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIGEgc2luZ2xlIGNvbG9uIGA6YCBjaGFyYWN0ZXJcblxuXHRAY2xhc3MgQ09MT05cblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIENPTE9OID0gaW5oZXJpdHNUb2tlbignOicpO1xuXG4vKipcblx0QGNsYXNzIERPVFxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgRE9UID0gaW5oZXJpdHNUb2tlbignLicpO1xuXG4vKipcblx0QSBjaGFyYWN0ZXIgY2xhc3MgdGhhdCBjYW4gc3Vycm91bmQgdGhlIFVSTCwgYnV0IHdoaWNoIHRoZSBVUkwgY2Fubm90IGJlZ2luXG5cdG9yIGVuZCB3aXRoLiBEb2VzIG5vdCBpbmNsdWRlIGNlcnRhaW4gRW5nbGlzaCBwdW5jdHVhdGlvbiBsaWtlIHBhcmVudGhlc2VzLlxuXG5cdEBjbGFzcyBQVU5DVFVBVElPTlxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgUFVOQ1RVQVRJT04gPSBpbmhlcml0c1Rva2VuKCk7XG5cbi8qKlxuXHRUaGUgd29yZCBsb2NhbGhvc3QgKGJ5IGl0c2VsZilcblx0QGNsYXNzIExPQ0FMSE9TVFxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgTE9DQUxIT1NUID0gaW5oZXJpdHNUb2tlbigpO1xuXG4vKipcblx0TmV3bGluZSB0b2tlblxuXHRAY2xhc3MgTkxcblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIE5MID0gaW5oZXJpdHNUb2tlbignXFxuJyk7XG5cbi8qKlxuXHRAY2xhc3MgTlVNXG5cdEBleHRlbmRzIFRleHRUb2tlblxuKi9cbnZhciBOVU0gPSBpbmhlcml0c1Rva2VuKCk7XG5cbi8qKlxuXHRAY2xhc3MgUExVU1xuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgUExVUyA9IGluaGVyaXRzVG9rZW4oJysnKTtcblxuLyoqXG5cdEBjbGFzcyBQT1VORFxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgUE9VTkQgPSBpbmhlcml0c1Rva2VuKCcjJyk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIGEgd2ViIFVSTCBwcm90b2NvbC4gU3VwcG9ydGVkIHR5cGVzIGluY2x1ZGVcblxuXHQqIGBodHRwOmBcblx0KiBgaHR0cHM6YFxuXHQqIGBmdHA6YFxuXHQqIGBmdHBzOmBcblxuXHRAY2xhc3MgUFJPVE9DT0xcblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIFBST1RPQ09MID0gaW5oZXJpdHNUb2tlbigpO1xuXG4vKipcblx0UmVwcmVzZW50cyB0aGUgc3RhcnQgb2YgdGhlIGVtYWlsIFVSSSBwcm90b2NvbFxuXG5cdEBjbGFzcyBNQUlMVE9cblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIE1BSUxUTyA9IGluaGVyaXRzVG9rZW4oJ21haWx0bzonKTtcblxuLyoqXG5cdEBjbGFzcyBRVUVSWVxuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgUVVFUlkgPSBpbmhlcml0c1Rva2VuKCc/Jyk7XG5cbi8qKlxuXHRAY2xhc3MgU0xBU0hcblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIFNMQVNIID0gaW5oZXJpdHNUb2tlbignLycpO1xuXG4vKipcblx0QGNsYXNzIFVOREVSU0NPUkVcblx0QGV4dGVuZHMgVGV4dFRva2VuXG4qL1xudmFyIFVOREVSU0NPUkUgPSBpbmhlcml0c1Rva2VuKCdfJyk7XG5cbi8qKlxuXHRPbmUgb3JlIG1vcmUgbm9uLXdoaXRlc3BhY2Ugc3ltYm9sLlxuXHRAY2xhc3MgU1lNXG5cdEBleHRlbmRzIFRleHRUb2tlblxuKi9cbnZhciBTWU0gPSBpbmhlcml0c1Rva2VuKCk7XG5cbi8qKlxuXHRAY2xhc3MgVExEXG5cdEBleHRlbmRzIFRleHRUb2tlblxuKi9cbnZhciBUTEQgPSBpbmhlcml0c1Rva2VuKCk7XG5cbi8qKlxuXHRSZXByZXNlbnRzIGEgc3RyaW5nIG9mIGNvbnNlY3V0aXZlIHdoaXRlc3BhY2UgY2hhcmFjdGVyc1xuXG5cdEBjbGFzcyBXU1xuXHRAZXh0ZW5kcyBUZXh0VG9rZW5cbiovXG52YXIgV1MgPSBpbmhlcml0c1Rva2VuKCk7XG5cbi8qKlxuXHRPcGVuaW5nL2Nsb3NpbmcgYnJhY2tldCBjbGFzc2VzXG4qL1xuXG52YXIgT1BFTkJSQUNFID0gaW5oZXJpdHNUb2tlbigneycpO1xudmFyIE9QRU5CUkFDS0VUID0gaW5oZXJpdHNUb2tlbignWycpO1xudmFyIE9QRU5BTkdMRUJSQUNLRVQgPSBpbmhlcml0c1Rva2VuKCc8Jyk7XG52YXIgT1BFTlBBUkVOID0gaW5oZXJpdHNUb2tlbignKCcpO1xudmFyIENMT1NFQlJBQ0UgPSBpbmhlcml0c1Rva2VuKCd9Jyk7XG52YXIgQ0xPU0VCUkFDS0VUID0gaW5oZXJpdHNUb2tlbignXScpO1xudmFyIENMT1NFQU5HTEVCUkFDS0VUID0gaW5oZXJpdHNUb2tlbignPicpO1xudmFyIENMT1NFUEFSRU4gPSBpbmhlcml0c1Rva2VuKCcpJyk7XG5cbnZhciBBTVBFUlNBTkQgPSBpbmhlcml0c1Rva2VuKCcmJyk7XG5cbmV4cG9ydHMuQmFzZSA9IFRleHRUb2tlbjtcbmV4cG9ydHMuRE9NQUlOID0gRE9NQUlOO1xuZXhwb3J0cy5BVCA9IEFUO1xuZXhwb3J0cy5DT0xPTiA9IENPTE9OO1xuZXhwb3J0cy5ET1QgPSBET1Q7XG5leHBvcnRzLlBVTkNUVUFUSU9OID0gUFVOQ1RVQVRJT047XG5leHBvcnRzLkxPQ0FMSE9TVCA9IExPQ0FMSE9TVDtcbmV4cG9ydHMuTkwgPSBOTDtcbmV4cG9ydHMuTlVNID0gTlVNO1xuZXhwb3J0cy5QTFVTID0gUExVUztcbmV4cG9ydHMuUE9VTkQgPSBQT1VORDtcbmV4cG9ydHMuUVVFUlkgPSBRVUVSWTtcbmV4cG9ydHMuUFJPVE9DT0wgPSBQUk9UT0NPTDtcbmV4cG9ydHMuTUFJTFRPID0gTUFJTFRPO1xuZXhwb3J0cy5TTEFTSCA9IFNMQVNIO1xuZXhwb3J0cy5VTkRFUlNDT1JFID0gVU5ERVJTQ09SRTtcbmV4cG9ydHMuU1lNID0gU1lNO1xuZXhwb3J0cy5UTEQgPSBUTEQ7XG5leHBvcnRzLldTID0gV1M7XG5leHBvcnRzLk9QRU5CUkFDRSA9IE9QRU5CUkFDRTtcbmV4cG9ydHMuT1BFTkJSQUNLRVQgPSBPUEVOQlJBQ0tFVDtcbmV4cG9ydHMuT1BFTkFOR0xFQlJBQ0tFVCA9IE9QRU5BTkdMRUJSQUNLRVQ7XG5leHBvcnRzLk9QRU5QQVJFTiA9IE9QRU5QQVJFTjtcbmV4cG9ydHMuQ0xPU0VCUkFDRSA9IENMT1NFQlJBQ0U7XG5leHBvcnRzLkNMT1NFQlJBQ0tFVCA9IENMT1NFQlJBQ0tFVDtcbmV4cG9ydHMuQ0xPU0VBTkdMRUJSQUNLRVQgPSBDTE9TRUFOR0xFQlJBQ0tFVDtcbmV4cG9ydHMuQ0xPU0VQQVJFTiA9IENMT1NFUEFSRU47XG5leHBvcnRzLkFNUEVSU0FORCA9IEFNUEVSU0FORDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuaW5oZXJpdHMgPSBpbmhlcml0cztcbmZ1bmN0aW9uIGluaGVyaXRzKHBhcmVudCwgY2hpbGQpIHtcblx0dmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcblxuXHR2YXIgZXh0ZW5kZWQgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuXHRmb3IgKHZhciBwIGluIHByb3BzKSB7XG5cdFx0ZXh0ZW5kZWRbcF0gPSBwcm9wc1twXTtcblx0fVxuXHRleHRlbmRlZC5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuXHRjaGlsZC5wcm90b3R5cGUgPSBleHRlbmRlZDtcblx0cmV0dXJuIGNoaWxkO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgZGVmYXVsdHMgPSB7XG5cdGRlZmF1bHRQcm90b2NvbDogJ2h0dHAnLFxuXHRldmVudHM6IG51bGwsXG5cdGZvcm1hdDogbm9vcCxcblx0Zm9ybWF0SHJlZjogbm9vcCxcblx0bmwyYnI6IGZhbHNlLFxuXHR0YWdOYW1lOiAnYScsXG5cdHRhcmdldDogdHlwZVRvVGFyZ2V0LFxuXHR2YWxpZGF0ZTogdHJ1ZSxcblx0aWdub3JlVGFnczogW10sXG5cdGF0dHJpYnV0ZXM6IG51bGwsXG5cdGNsYXNzTmFtZTogJ2xpbmtpZmllZCcgLy8gRGVwcmVjYXRlZCB2YWx1ZSAtIG5vIGRlZmF1bHQgY2xhc3Mgd2lsbCBiZSBwcm92aWRlZCBpbiB0aGUgZnV0dXJlXG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZGVmYXVsdHM7XG5leHBvcnRzLk9wdGlvbnMgPSBPcHRpb25zO1xuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xuXG5cbmZ1bmN0aW9uIE9wdGlvbnMob3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblxuXHR0aGlzLmRlZmF1bHRQcm90b2NvbCA9IG9wdHMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHRQcm90b2NvbCcpID8gb3B0cy5kZWZhdWx0UHJvdG9jb2wgOiBkZWZhdWx0cy5kZWZhdWx0UHJvdG9jb2w7XG5cdHRoaXMuZXZlbnRzID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgPyBvcHRzLmV2ZW50cyA6IGRlZmF1bHRzLmV2ZW50cztcblx0dGhpcy5mb3JtYXQgPSBvcHRzLmhhc093blByb3BlcnR5KCdmb3JtYXQnKSA/IG9wdHMuZm9ybWF0IDogZGVmYXVsdHMuZm9ybWF0O1xuXHR0aGlzLmZvcm1hdEhyZWYgPSBvcHRzLmhhc093blByb3BlcnR5KCdmb3JtYXRIcmVmJykgPyBvcHRzLmZvcm1hdEhyZWYgOiBkZWZhdWx0cy5mb3JtYXRIcmVmO1xuXHR0aGlzLm5sMmJyID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnbmwyYnInKSA/IG9wdHMubmwyYnIgOiBkZWZhdWx0cy5ubDJicjtcblx0dGhpcy50YWdOYW1lID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgndGFnTmFtZScpID8gb3B0cy50YWdOYW1lIDogZGVmYXVsdHMudGFnTmFtZTtcblx0dGhpcy50YXJnZXQgPSBvcHRzLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSA/IG9wdHMudGFyZ2V0IDogZGVmYXVsdHMudGFyZ2V0O1xuXHR0aGlzLnZhbGlkYXRlID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgndmFsaWRhdGUnKSA/IG9wdHMudmFsaWRhdGUgOiBkZWZhdWx0cy52YWxpZGF0ZTtcblx0dGhpcy5pZ25vcmVUYWdzID0gW107XG5cblx0Ly8gbGlua0F0dHJpYnV0ZXMgYW5kIGxpbmtDbGFzcyBpcyBkZXByZWNhdGVkXG5cdHRoaXMuYXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcyB8fCBvcHRzLmxpbmtBdHRyaWJ1dGVzIHx8IGRlZmF1bHRzLmF0dHJpYnV0ZXM7XG5cdHRoaXMuY2xhc3NOYW1lID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3NOYW1lJykgPyBvcHRzLmNsYXNzTmFtZSA6IG9wdHMubGlua0NsYXNzIHx8IGRlZmF1bHRzLmNsYXNzTmFtZTtcblxuXHQvLyBNYWtlIGFsbCB0YWdzIG5hbWVzIHVwcGVyIGNhc2Vcblx0dmFyIGlnbm9yZWRUYWdzID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnaWdub3JlVGFncycpID8gb3B0cy5pZ25vcmVUYWdzIDogZGVmYXVsdHMuaWdub3JlVGFncztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpZ25vcmVkVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuaWdub3JlVGFncy5wdXNoKGlnbm9yZWRUYWdzW2ldLnRvVXBwZXJDYXNlKCkpO1xuXHR9XG59XG5cbk9wdGlvbnMucHJvdG90eXBlID0ge1xuXHQvKipcbiAgKiBHaXZlbiB0aGUgdG9rZW4sIHJldHVybiBhbGwgb3B0aW9ucyBmb3IgaG93IGl0IHNob3VsZCBiZSBkaXNwbGF5ZWRcbiAgKi9cblx0cmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh0b2tlbikge1xuXHRcdHZhciBocmVmID0gdG9rZW4udG9IcmVmKHRoaXMuZGVmYXVsdFByb3RvY29sKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Zm9ybWF0dGVkOiB0aGlzLmdldCgnZm9ybWF0JywgdG9rZW4udG9TdHJpbmcoKSwgdG9rZW4pLFxuXHRcdFx0Zm9ybWF0dGVkSHJlZjogdGhpcy5nZXQoJ2Zvcm1hdEhyZWYnLCBocmVmLCB0b2tlbiksXG5cdFx0XHR0YWdOYW1lOiB0aGlzLmdldCgndGFnTmFtZScsIGhyZWYsIHRva2VuKSxcblx0XHRcdGNsYXNzTmFtZTogdGhpcy5nZXQoJ2NsYXNzTmFtZScsIGhyZWYsIHRva2VuKSxcblx0XHRcdHRhcmdldDogdGhpcy5nZXQoJ3RhcmdldCcsIGhyZWYsIHRva2VuKSxcblx0XHRcdGV2ZW50czogdGhpcy5nZXRPYmplY3QoJ2V2ZW50cycsIGhyZWYsIHRva2VuKSxcblx0XHRcdGF0dHJpYnV0ZXM6IHRoaXMuZ2V0T2JqZWN0KCdhdHRyaWJ1dGVzJywgaHJlZiwgdG9rZW4pXG5cdFx0fTtcblx0fSxcblxuXG5cdC8qKlxuICAqIFJldHVybnMgdHJ1ZSBvciBmYWxzZSBiYXNlZCBvbiB3aGV0aGVyIGEgdG9rZW4gc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBhXG4gICogbGluayBiYXNlZCBvbiB0aGUgdXNlciBvcHRpb25zLiBCeSBkZWZhdWx0LFxuICAqL1xuXHRjaGVjazogZnVuY3Rpb24gY2hlY2sodG9rZW4pIHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3ZhbGlkYXRlJywgdG9rZW4udG9TdHJpbmcoKSwgdG9rZW4pO1xuXHR9LFxuXG5cblx0Ly8gUHJpdmF0ZSBtZXRob2RzXG5cblx0LyoqXG4gICogUmVzb2x2ZSBhbiBvcHRpb24ncyB2YWx1ZSBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhlIG9wdGlvbiBhbmQgdGhlIGdpdmVuXG4gICogcGFyYW1zLlxuICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgTmFtZSBvZiBvcHRpb24gdG8gdXNlXG4gICogQHBhcmFtIG9wZXJhdG9yIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0YXJnZXQgb3B0aW9uIGlmIGl0J3MgbWV0aG9kXG4gICogQHBhcmFtIHtNdWx0aVRva2VufSB0b2tlbiBUaGUgdG9rZW4gZnJvbSBsaW5raWZ5LnRva2VuaXplXG4gICovXG5cdGdldDogZnVuY3Rpb24gZ2V0KGtleSwgb3BlcmF0b3IsIHRva2VuKSB7XG5cdFx0dmFyIG9wdGlvblZhbHVlID0gdm9pZCAwLFxuXHRcdCAgICBvcHRpb24gPSB0aGlzW2tleV07XG5cdFx0aWYgKCFvcHRpb24pIHtcblx0XHRcdHJldHVybiBvcHRpb247XG5cdFx0fVxuXG5cdFx0c3dpdGNoICh0eXBlb2Ygb3B0aW9uID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvcHRpb24pKSB7XG5cdFx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRcdHJldHVybiBvcHRpb24ob3BlcmF0b3IsIHRva2VuLnR5cGUpO1xuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0b3B0aW9uVmFsdWUgPSBvcHRpb24uaGFzT3duUHJvcGVydHkodG9rZW4udHlwZSkgPyBvcHRpb25bdG9rZW4udHlwZV0gOiBkZWZhdWx0c1trZXldO1xuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIG9wdGlvblZhbHVlID09PSAnZnVuY3Rpb24nID8gb3B0aW9uVmFsdWUob3BlcmF0b3IsIHRva2VuLnR5cGUpIDogb3B0aW9uVmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9wdGlvbjtcblx0fSxcblx0Z2V0T2JqZWN0OiBmdW5jdGlvbiBnZXRPYmplY3Qoa2V5LCBvcGVyYXRvciwgdG9rZW4pIHtcblx0XHR2YXIgb3B0aW9uID0gdGhpc1trZXldO1xuXHRcdHJldHVybiB0eXBlb2Ygb3B0aW9uID09PSAnZnVuY3Rpb24nID8gb3B0aW9uKG9wZXJhdG9yLCB0b2tlbi50eXBlKSA6IG9wdGlvbjtcblx0fVxufTtcblxuLyoqXG4gKiBRdWljayBpbmRleE9mIHJlcGxhY2VtZW50IGZvciBjaGVja2luZyB0aGUgaWdub3JlVGFncyBvcHRpb25cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyLCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChhcnJbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBub29wKHZhbCkge1xuXHRyZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiB0eXBlVG9UYXJnZXQoaHJlZiwgdHlwZSkge1xuXHRyZXR1cm4gdHlwZSA9PT0gJ3VybCcgPyAnX2JsYW5rJyA6IG51bGw7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2h0bWw1TmFtZWRDaGFyUmVmcyA9IHJlcXVpcmUoJy4vc2ltcGxlLWh0bWwtdG9rZW5pemVyL2h0bWw1LW5hbWVkLWNoYXItcmVmcycpO1xuXG52YXIgX2h0bWw1TmFtZWRDaGFyUmVmczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9odG1sNU5hbWVkQ2hhclJlZnMpO1xuXG52YXIgX2VudGl0eVBhcnNlciA9IHJlcXVpcmUoJy4vc2ltcGxlLWh0bWwtdG9rZW5pemVyL2VudGl0eS1wYXJzZXInKTtcblxudmFyIF9lbnRpdHlQYXJzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5UGFyc2VyKTtcblxudmFyIF9ldmVudGVkVG9rZW5pemVyID0gcmVxdWlyZSgnLi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvZXZlbnRlZC10b2tlbml6ZXInKTtcblxudmFyIF9ldmVudGVkVG9rZW5pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50ZWRUb2tlbml6ZXIpO1xuXG52YXIgX3Rva2VuaXplciA9IHJlcXVpcmUoJy4vc2ltcGxlLWh0bWwtdG9rZW5pemVyL3Rva2VuaXplcicpO1xuXG52YXIgX3Rva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b2tlbml6ZXIpO1xuXG52YXIgX3Rva2VuaXplID0gcmVxdWlyZSgnLi9zaW1wbGUtaHRtbC10b2tlbml6ZXIvdG9rZW5pemUnKTtcblxudmFyIF90b2tlbml6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b2tlbml6ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBIVE1MNVRva2VuaXplciA9IHtcblx0SFRNTDVOYW1lZENoYXJSZWZzOiBfaHRtbDVOYW1lZENoYXJSZWZzMi5kZWZhdWx0LFxuXHRFbnRpdHlQYXJzZXI6IF9lbnRpdHlQYXJzZXIyLmRlZmF1bHQsXG5cdEV2ZW50ZWRUb2tlbml6ZXI6IF9ldmVudGVkVG9rZW5pemVyMi5kZWZhdWx0LFxuXHRUb2tlbml6ZXI6IF90b2tlbml6ZXIyLmRlZmF1bHQsXG5cdHRva2VuaXplOiBfdG9rZW5pemUyLmRlZmF1bHRcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEhUTUw1VG9rZW5pemVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gRW50aXR5UGFyc2VyKG5hbWVkKSB7XG4gIHRoaXMubmFtZWQgPSBuYW1lZDtcbn1cblxudmFyIEhFWENIQVJDT0RFID0gL14jW3hYXShbQS1GYS1mMC05XSspJC87XG52YXIgQ0hBUkNPREUgPSAvXiMoWzAtOV0rKSQvO1xudmFyIE5BTUVEID0gL14oW0EtWmEtejAtOV0rKSQvO1xuXG5FbnRpdHlQYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICBpZiAoIWVudGl0eSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2hlcyA9IGVudGl0eS5tYXRjaChIRVhDSEFSQ09ERSk7XG4gIGlmIChtYXRjaGVzKSB7XG4gICAgcmV0dXJuIFwiJiN4XCIgKyBtYXRjaGVzWzFdICsgXCI7XCI7XG4gIH1cbiAgbWF0Y2hlcyA9IGVudGl0eS5tYXRjaChDSEFSQ09ERSk7XG4gIGlmIChtYXRjaGVzKSB7XG4gICAgcmV0dXJuIFwiJiNcIiArIG1hdGNoZXNbMV0gKyBcIjtcIjtcbiAgfVxuICBtYXRjaGVzID0gZW50aXR5Lm1hdGNoKE5BTUVEKTtcbiAgaWYgKG1hdGNoZXMpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lZFttYXRjaGVzWzFdXSB8fCBcIiZcIiArIG1hdGNoZXNbMV0gKyBcIjtcIjtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRW50aXR5UGFyc2VyOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuZnVuY3Rpb24gRXZlbnRlZFRva2VuaXplcihkZWxlZ2F0ZSwgZW50aXR5UGFyc2VyKSB7XG4gIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgdGhpcy5lbnRpdHlQYXJzZXIgPSBlbnRpdHlQYXJzZXI7XG5cbiAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gIHRoaXMuaW5wdXQgPSBudWxsO1xuXG4gIHRoaXMuaW5kZXggPSAtMTtcbiAgdGhpcy5saW5lID0gLTE7XG4gIHRoaXMuY29sdW1uID0gLTE7XG4gIHRoaXMudGFnTGluZSA9IC0xO1xuICB0aGlzLnRhZ0NvbHVtbiA9IC0xO1xuXG4gIHRoaXMucmVzZXQoKTtcbn1cblxuRXZlbnRlZFRva2VuaXplci5wcm90b3R5cGUgPSB7XG4gIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZURhdGEnO1xuICAgIHRoaXMuaW5wdXQgPSAnJztcblxuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMubGluZSA9IDE7XG4gICAgdGhpcy5jb2x1bW4gPSAwO1xuXG4gICAgdGhpcy50YWdMaW5lID0gLTE7XG4gICAgdGhpcy50YWdDb2x1bW4gPSAtMTtcblxuICAgIHRoaXMuZGVsZWdhdGUucmVzZXQoKTtcbiAgfSxcblxuICB0b2tlbml6ZTogZnVuY3Rpb24gdG9rZW5pemUoaW5wdXQpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy50b2tlbml6ZVBhcnQoaW5wdXQpO1xuICAgIHRoaXMudG9rZW5pemVFT0YoKTtcbiAgfSxcblxuICB0b2tlbml6ZVBhcnQ6IGZ1bmN0aW9uIHRva2VuaXplUGFydChpbnB1dCkge1xuICAgIHRoaXMuaW5wdXQgKz0gKDAsIF91dGlscy5wcmVwcm9jZXNzSW5wdXQpKGlucHV0KTtcblxuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy5pbnB1dC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3RhdGVzW3RoaXMuc3RhdGVdLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIHRva2VuaXplRU9GOiBmdW5jdGlvbiB0b2tlbml6ZUVPRigpIHtcbiAgICB0aGlzLmZsdXNoRGF0YSgpO1xuICB9LFxuXG4gIGZsdXNoRGF0YTogZnVuY3Rpb24gZmx1c2hEYXRhKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnZGF0YScpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoRGF0YSgpO1xuICAgICAgdGhpcy5zdGF0ZSA9ICdiZWZvcmVEYXRhJztcbiAgICB9XG4gIH0sXG5cbiAgcGVlazogZnVuY3Rpb24gcGVlaygpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC5jaGFyQXQodGhpcy5pbmRleCk7XG4gIH0sXG5cbiAgY29uc3VtZTogZnVuY3Rpb24gY29uc3VtZSgpIHtcbiAgICB2YXIgY2hhciA9IHRoaXMucGVlaygpO1xuXG4gICAgdGhpcy5pbmRleCsrO1xuXG4gICAgaWYgKGNoYXIgPT09IFwiXFxuXCIpIHtcbiAgICAgIHRoaXMubGluZSsrO1xuICAgICAgdGhpcy5jb2x1bW4gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbHVtbisrO1xuICAgIH1cblxuICAgIHJldHVybiBjaGFyO1xuICB9LFxuXG4gIGNvbnN1bWVDaGFyUmVmOiBmdW5jdGlvbiBjb25zdW1lQ2hhclJlZigpIHtcbiAgICB2YXIgZW5kSW5kZXggPSB0aGlzLmlucHV0LmluZGV4T2YoJzsnLCB0aGlzLmluZGV4KTtcbiAgICBpZiAoZW5kSW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbnRpdHkgPSB0aGlzLmlucHV0LnNsaWNlKHRoaXMuaW5kZXgsIGVuZEluZGV4KTtcbiAgICB2YXIgY2hhcnMgPSB0aGlzLmVudGl0eVBhcnNlci5wYXJzZShlbnRpdHkpO1xuICAgIGlmIChjaGFycykge1xuICAgICAgdmFyIGNvdW50ID0gZW50aXR5Lmxlbmd0aDtcbiAgICAgIC8vIGNvbnN1bWUgdGhlIGVudGl0eSBjaGFyc1xuICAgICAgd2hpbGUgKGNvdW50KSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICBjb3VudC0tO1xuICAgICAgfVxuICAgICAgLy8gY29uc3VtZSB0aGUgYDtgXG4gICAgICB0aGlzLmNvbnN1bWUoKTtcblxuICAgICAgcmV0dXJuIGNoYXJzO1xuICAgIH1cbiAgfSxcblxuICBtYXJrVGFnU3RhcnQ6IGZ1bmN0aW9uIG1hcmtUYWdTdGFydCgpIHtcbiAgICAvLyB0aGVzZSBwcm9wZXJ0aWVzIHRvIGJlIHJlbW92ZWQgaW4gbmV4dCBtYWpvciBidW1wXG4gICAgdGhpcy50YWdMaW5lID0gdGhpcy5saW5lO1xuICAgIHRoaXMudGFnQ29sdW1uID0gdGhpcy5jb2x1bW47XG5cbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS50YWdPcGVuKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnRhZ09wZW4oKTtcbiAgICB9XG4gIH0sXG5cbiAgc3RhdGVzOiB7XG4gICAgYmVmb3JlRGF0YTogZnVuY3Rpb24gYmVmb3JlRGF0YSgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5wZWVrKCk7XG5cbiAgICAgIGlmIChjaGFyID09PSBcIjxcIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3RhZ09wZW4nO1xuICAgICAgICB0aGlzLm1hcmtUYWdTdGFydCgpO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnZGF0YSc7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW5EYXRhKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMucGVlaygpO1xuXG4gICAgICBpZiAoY2hhciA9PT0gXCI8XCIpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5maW5pc2hEYXRhKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAndGFnT3Blbic7XG4gICAgICAgIHRoaXMubWFya1RhZ1N0YXJ0KCk7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIiZcIikge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb0RhdGEodGhpcy5jb25zdW1lQ2hhclJlZigpIHx8IFwiJlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvRGF0YShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGFnT3BlbjogZnVuY3Rpb24gdGFnT3BlbigpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5jb25zdW1lKCk7XG5cbiAgICAgIGlmIChjaGFyID09PSBcIiFcIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ21hcmt1cERlY2xhcmF0aW9uJztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCIvXCIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdlbmRUYWdPcGVuJztcbiAgICAgIH0gZWxzZSBpZiAoKDAsIF91dGlscy5pc0FscGhhKShjaGFyKSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3RhZ05hbWUnO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luU3RhcnRUYWcoKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb1RhZ05hbWUoY2hhci50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbWFya3VwRGVjbGFyYXRpb246IGZ1bmN0aW9uIG1hcmt1cERlY2xhcmF0aW9uKCkge1xuICAgICAgdmFyIGNoYXIgPSB0aGlzLmNvbnN1bWUoKTtcblxuICAgICAgaWYgKGNoYXIgPT09IFwiLVwiICYmIHRoaXMuaW5wdXQuY2hhckF0KHRoaXMuaW5kZXgpID09PSBcIi1cIikge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb21tZW50U3RhcnQnO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQ29tbWVudCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21tZW50U3RhcnQ6IGZ1bmN0aW9uIGNvbW1lbnRTdGFydCgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5jb25zdW1lKCk7XG5cbiAgICAgIGlmIChjaGFyID09PSBcIi1cIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2NvbW1lbnRTdGFydERhc2gnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIj5cIikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaENvbW1lbnQoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdiZWZvcmVEYXRhJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9Db21tZW50RGF0YShjaGFyKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb21tZW50JztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tbWVudFN0YXJ0RGFzaDogZnVuY3Rpb24gY29tbWVudFN0YXJ0RGFzaCgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5jb25zdW1lKCk7XG5cbiAgICAgIGlmIChjaGFyID09PSBcIi1cIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2NvbW1lbnRFbmQnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIj5cIikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaENvbW1lbnQoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdiZWZvcmVEYXRhJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9Db21tZW50RGF0YShcIi1cIik7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnY29tbWVudCc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbW1lbnQ6IGZ1bmN0aW9uIGNvbW1lbnQoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMuY29uc3VtZSgpO1xuXG4gICAgICBpZiAoY2hhciA9PT0gXCItXCIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb21tZW50RW5kRGFzaCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvQ29tbWVudERhdGEoY2hhcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbW1lbnRFbmREYXNoOiBmdW5jdGlvbiBjb21tZW50RW5kRGFzaCgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5jb25zdW1lKCk7XG5cbiAgICAgIGlmIChjaGFyID09PSBcIi1cIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2NvbW1lbnRFbmQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb0NvbW1lbnREYXRhKFwiLVwiICsgY2hhcik7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnY29tbWVudCc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNvbW1lbnRFbmQ6IGZ1bmN0aW9uIGNvbW1lbnRFbmQoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMuY29uc3VtZSgpO1xuXG4gICAgICBpZiAoY2hhciA9PT0gXCI+XCIpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5maW5pc2hDb21tZW50KCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvQ29tbWVudERhdGEoXCItLVwiICsgY2hhcik7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnY29tbWVudCc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRhZ05hbWU6IGZ1bmN0aW9uIHRhZ05hbWUoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMuY29uc3VtZSgpO1xuXG4gICAgICBpZiAoKDAsIF91dGlscy5pc1NwYWNlKShjaGFyKSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZUF0dHJpYnV0ZU5hbWUnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIi9cIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3NlbGZDbG9zaW5nU3RhcnRUYWcnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIj5cIikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaFRhZygpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZURhdGEnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb1RhZ05hbWUoY2hhcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGJlZm9yZUF0dHJpYnV0ZU5hbWU6IGZ1bmN0aW9uIGJlZm9yZUF0dHJpYnV0ZU5hbWUoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMucGVlaygpO1xuXG4gICAgICBpZiAoKDAsIF91dGlscy5pc1NwYWNlKShjaGFyKSkge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIi9cIikge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3NlbGZDbG9zaW5nU3RhcnRUYWcnO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCI+XCIpIHtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoVGFnKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dHJpYnV0ZU5hbWUnO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQXR0cmlidXRlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvQXR0cmlidXRlTmFtZShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXR0cmlidXRlTmFtZTogZnVuY3Rpb24gYXR0cmlidXRlTmFtZSgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5wZWVrKCk7XG5cbiAgICAgIGlmICgoMCwgX3V0aWxzLmlzU3BhY2UpKGNoYXIpKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYWZ0ZXJBdHRyaWJ1dGVOYW1lJztcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiL1wiKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW5BdHRyaWJ1dGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnc2VsZkNsb3NpbmdTdGFydFRhZyc7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiPVwiKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlQXR0cmlidXRlVmFsdWUnO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCI+XCIpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbkF0dHJpYnV0ZVZhbHVlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5maW5pc2hBdHRyaWJ1dGVWYWx1ZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5maW5pc2hUYWcoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdiZWZvcmVEYXRhJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvQXR0cmlidXRlTmFtZShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWZ0ZXJBdHRyaWJ1dGVOYW1lOiBmdW5jdGlvbiBhZnRlckF0dHJpYnV0ZU5hbWUoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMucGVlaygpO1xuXG4gICAgICBpZiAoKDAsIF91dGlscy5pc1NwYWNlKShjaGFyKSkge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIi9cIikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQXR0cmlidXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaEF0dHJpYnV0ZVZhbHVlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3NlbGZDbG9zaW5nU3RhcnRUYWcnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIj1cIikge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdiZWZvcmVBdHRyaWJ1dGVWYWx1ZSc7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiPlwiKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW5BdHRyaWJ1dGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoVGFnKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQXR0cmlidXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaEF0dHJpYnV0ZVZhbHVlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dHJpYnV0ZU5hbWUnO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQXR0cmlidXRlKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9BdHRyaWJ1dGVOYW1lKGNoYXIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBiZWZvcmVBdHRyaWJ1dGVWYWx1ZTogZnVuY3Rpb24gYmVmb3JlQXR0cmlidXRlVmFsdWUoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMucGVlaygpO1xuXG4gICAgICBpZiAoKDAsIF91dGlscy5pc1NwYWNlKShjaGFyKSkge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dHJpYnV0ZVZhbHVlRG91YmxlUXVvdGVkJztcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbkF0dHJpYnV0ZVZhbHVlKHRydWUpO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCInXCIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdhdHRyaWJ1dGVWYWx1ZVNpbmdsZVF1b3RlZCc7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW5BdHRyaWJ1dGVWYWx1ZSh0cnVlKTtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiPlwiKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW5BdHRyaWJ1dGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoVGFnKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2F0dHJpYnV0ZVZhbHVlVW5xdW90ZWQnO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luQXR0cmlidXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb0F0dHJpYnV0ZVZhbHVlKGNoYXIpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhdHRyaWJ1dGVWYWx1ZURvdWJsZVF1b3RlZDogZnVuY3Rpb24gYXR0cmlidXRlVmFsdWVEb3VibGVRdW90ZWQoKSB7XG4gICAgICB2YXIgY2hhciA9IHRoaXMuY29uc3VtZSgpO1xuXG4gICAgICBpZiAoY2hhciA9PT0gJ1wiJykge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaEF0dHJpYnV0ZVZhbHVlKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYWZ0ZXJBdHRyaWJ1dGVWYWx1ZVF1b3RlZCc7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiJlwiKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9BdHRyaWJ1dGVWYWx1ZSh0aGlzLmNvbnN1bWVDaGFyUmVmKCdcIicpIHx8IFwiJlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9BdHRyaWJ1dGVWYWx1ZShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXR0cmlidXRlVmFsdWVTaW5nbGVRdW90ZWQ6IGZ1bmN0aW9uIGF0dHJpYnV0ZVZhbHVlU2luZ2xlUXVvdGVkKCkge1xuICAgICAgdmFyIGNoYXIgPSB0aGlzLmNvbnN1bWUoKTtcblxuICAgICAgaWYgKGNoYXIgPT09IFwiJ1wiKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdhZnRlckF0dHJpYnV0ZVZhbHVlUXVvdGVkJztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCImXCIpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRUb0F0dHJpYnV0ZVZhbHVlKHRoaXMuY29uc3VtZUNoYXJSZWYoXCInXCIpIHx8IFwiJlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9BdHRyaWJ1dGVWYWx1ZShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXR0cmlidXRlVmFsdWVVbnF1b3RlZDogZnVuY3Rpb24gYXR0cmlidXRlVmFsdWVVbnF1b3RlZCgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5wZWVrKCk7XG5cbiAgICAgIGlmICgoMCwgX3V0aWxzLmlzU3BhY2UpKGNoYXIpKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoQXR0cmlidXRlVmFsdWUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlQXR0cmlidXRlTmFtZSc7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IFwiJlwiKSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvQXR0cmlidXRlVmFsdWUodGhpcy5jb25zdW1lQ2hhclJlZihcIj5cIikgfHwgXCImXCIpO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIj5cIikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaEF0dHJpYnV0ZVZhbHVlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmZpbmlzaFRhZygpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZURhdGEnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kVG9BdHRyaWJ1dGVWYWx1ZShjaGFyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWZ0ZXJBdHRyaWJ1dGVWYWx1ZVF1b3RlZDogZnVuY3Rpb24gYWZ0ZXJBdHRyaWJ1dGVWYWx1ZVF1b3RlZCgpIHtcbiAgICAgIHZhciBjaGFyID0gdGhpcy5wZWVrKCk7XG5cbiAgICAgIGlmICgoMCwgX3V0aWxzLmlzU3BhY2UpKGNoYXIpKSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZUF0dHJpYnV0ZU5hbWUnO1xuICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIi9cIikge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdzZWxmQ2xvc2luZ1N0YXJ0VGFnJztcbiAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCI+XCIpIHtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoVGFnKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZUF0dHJpYnV0ZU5hbWUnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZWxmQ2xvc2luZ1N0YXJ0VGFnOiBmdW5jdGlvbiBzZWxmQ2xvc2luZ1N0YXJ0VGFnKCkge1xuICAgICAgdmFyIGNoYXIgPSB0aGlzLnBlZWsoKTtcblxuICAgICAgaWYgKGNoYXIgPT09IFwiPlwiKSB7XG4gICAgICAgIHRoaXMuY29uc3VtZSgpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLm1hcmtUYWdBc1NlbGZDbG9zaW5nKCk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuZmluaXNoVGFnKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSAnYmVmb3JlRGF0YSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2JlZm9yZUF0dHJpYnV0ZU5hbWUnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlbmRUYWdPcGVuOiBmdW5jdGlvbiBlbmRUYWdPcGVuKCkge1xuICAgICAgdmFyIGNoYXIgPSB0aGlzLmNvbnN1bWUoKTtcblxuICAgICAgaWYgKCgwLCBfdXRpbHMuaXNBbHBoYSkoY2hhcikpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICd0YWdOYW1lJztcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbkVuZFRhZygpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZFRvVGFnTmFtZShjaGFyLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRlZFRva2VuaXplcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBIVE1MNU5hbWVkQ2hhclJlZnMgPSB7XG4gICAgLy8gV2UgZG9uJ3QgbmVlZCB0aGUgY29tcGxldGUgbmFtZWQgY2hhcmFjdGVyIHJlZmVyZW5jZSBiZWNhdXNlIGxpbmtpZnlIdG1sXG4gICAgLy8gZG9lcyBub3QgbW9kaWZ5IHRoZSBlc2NhcGUgc2VxdWVuY2VzLiBXZSBkbyBuZWVkICZuYnNwOyBzbyB0aGF0XG4gICAgLy8gd2hpdGVzcGFjZSBpcyBwYXJzZWQgcHJvcGVybHkuIE90aGVyIHR5cGVzIG9mIHdoaXRlc3BhY2Ugc2hvdWxkIGFscmVhZHlcbiAgICAvLyBiZSBhY2NvdW50ZWQgZm9yXG4gICAgbmJzcDogXCJcXHhBMFwiXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gSFRNTDVOYW1lZENoYXJSZWZzOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRva2VuaXplO1xuXG52YXIgX3Rva2VuaXplciA9IHJlcXVpcmUoJy4vdG9rZW5pemVyJyk7XG5cbnZhciBfdG9rZW5pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Rva2VuaXplcik7XG5cbnZhciBfZW50aXR5UGFyc2VyID0gcmVxdWlyZSgnLi9lbnRpdHktcGFyc2VyJyk7XG5cbnZhciBfZW50aXR5UGFyc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eVBhcnNlcik7XG5cbnZhciBfaHRtbDVOYW1lZENoYXJSZWZzID0gcmVxdWlyZSgnLi9odG1sNS1uYW1lZC1jaGFyLXJlZnMnKTtcblxudmFyIF9odG1sNU5hbWVkQ2hhclJlZnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaHRtbDVOYW1lZENoYXJSZWZzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdG9rZW5pemUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VuaXplciA9IG5ldyBfdG9rZW5pemVyMi5kZWZhdWx0KG5ldyBfZW50aXR5UGFyc2VyMi5kZWZhdWx0KF9odG1sNU5hbWVkQ2hhclJlZnMyLmRlZmF1bHQpLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRva2VuaXplci50b2tlbml6ZShpbnB1dCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V2ZW50ZWRUb2tlbml6ZXIgPSByZXF1aXJlKCcuL2V2ZW50ZWQtdG9rZW5pemVyJyk7XG5cbnZhciBfZXZlbnRlZFRva2VuaXplcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudGVkVG9rZW5pemVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gVG9rZW5pemVyKGVudGl0eVBhcnNlciwgb3B0aW9ucykge1xuICB0aGlzLnRva2VuID0gbnVsbDtcbiAgdGhpcy5zdGFydExpbmUgPSAxO1xuICB0aGlzLnN0YXJ0Q29sdW1uID0gMDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy50b2tlbml6ZXIgPSBuZXcgX2V2ZW50ZWRUb2tlbml6ZXIyLmRlZmF1bHQodGhpcywgZW50aXR5UGFyc2VyKTtcbn1cblxuVG9rZW5pemVyLnByb3RvdHlwZSA9IHtcbiAgdG9rZW5pemU6IGZ1bmN0aW9uIHRva2VuaXplKGlucHV0KSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2VuaXplci50b2tlbml6ZShpbnB1dCk7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zO1xuICB9LFxuXG4gIHRva2VuaXplUGFydDogZnVuY3Rpb24gdG9rZW5pemVQYXJ0KGlucHV0KSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2VuaXplci50b2tlbml6ZVBhcnQoaW5wdXQpO1xuICAgIHJldHVybiB0aGlzLnRva2VucztcbiAgfSxcblxuICB0b2tlbml6ZUVPRjogZnVuY3Rpb24gdG9rZW5pemVFT0YoKSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2VuaXplci50b2tlbml6ZUVPRigpO1xuICAgIHJldHVybiB0aGlzLnRva2Vuc1swXTtcbiAgfSxcblxuICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy50b2tlbiA9IG51bGw7XG4gICAgdGhpcy5zdGFydExpbmUgPSAxO1xuICAgIHRoaXMuc3RhcnRDb2x1bW4gPSAwO1xuICB9LFxuXG4gIGFkZExvY0luZm86IGZ1bmN0aW9uIGFkZExvY0luZm8oKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5sb2MpIHtcbiAgICAgIHRoaXMudG9rZW4ubG9jID0ge1xuICAgICAgICBzdGFydDoge1xuICAgICAgICAgIGxpbmU6IHRoaXMuc3RhcnRMaW5lLFxuICAgICAgICAgIGNvbHVtbjogdGhpcy5zdGFydENvbHVtblxuICAgICAgICB9LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICBsaW5lOiB0aGlzLnRva2VuaXplci5saW5lLFxuICAgICAgICAgIGNvbHVtbjogdGhpcy50b2tlbml6ZXIuY29sdW1uXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuc3RhcnRMaW5lID0gdGhpcy50b2tlbml6ZXIubGluZTtcbiAgICB0aGlzLnN0YXJ0Q29sdW1uID0gdGhpcy50b2tlbml6ZXIuY29sdW1uO1xuICB9LFxuXG4gIC8vIERhdGFcblxuICBiZWdpbkRhdGE6IGZ1bmN0aW9uIGJlZ2luRGF0YSgpIHtcbiAgICB0aGlzLnRva2VuID0ge1xuICAgICAgdHlwZTogJ0NoYXJzJyxcbiAgICAgIGNoYXJzOiAnJ1xuICAgIH07XG4gICAgdGhpcy50b2tlbnMucHVzaCh0aGlzLnRva2VuKTtcbiAgfSxcblxuICBhcHBlbmRUb0RhdGE6IGZ1bmN0aW9uIGFwcGVuZFRvRGF0YShjaGFyKSB7XG4gICAgdGhpcy50b2tlbi5jaGFycyArPSBjaGFyO1xuICB9LFxuXG4gIGZpbmlzaERhdGE6IGZ1bmN0aW9uIGZpbmlzaERhdGEoKSB7XG4gICAgdGhpcy5hZGRMb2NJbmZvKCk7XG4gIH0sXG5cbiAgLy8gQ29tbWVudFxuXG4gIGJlZ2luQ29tbWVudDogZnVuY3Rpb24gYmVnaW5Db21tZW50KCkge1xuICAgIHRoaXMudG9rZW4gPSB7XG4gICAgICB0eXBlOiAnQ29tbWVudCcsXG4gICAgICBjaGFyczogJydcbiAgICB9O1xuICAgIHRoaXMudG9rZW5zLnB1c2godGhpcy50b2tlbik7XG4gIH0sXG5cbiAgYXBwZW5kVG9Db21tZW50RGF0YTogZnVuY3Rpb24gYXBwZW5kVG9Db21tZW50RGF0YShjaGFyKSB7XG4gICAgdGhpcy50b2tlbi5jaGFycyArPSBjaGFyO1xuICB9LFxuXG4gIGZpbmlzaENvbW1lbnQ6IGZ1bmN0aW9uIGZpbmlzaENvbW1lbnQoKSB7XG4gICAgdGhpcy5hZGRMb2NJbmZvKCk7XG4gIH0sXG5cbiAgLy8gVGFncyAtIGJhc2ljXG5cbiAgYmVnaW5TdGFydFRhZzogZnVuY3Rpb24gYmVnaW5TdGFydFRhZygpIHtcbiAgICB0aGlzLnRva2VuID0ge1xuICAgICAgdHlwZTogJ1N0YXJ0VGFnJyxcbiAgICAgIHRhZ05hbWU6ICcnLFxuICAgICAgYXR0cmlidXRlczogW10sXG4gICAgICBzZWxmQ2xvc2luZzogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMudG9rZW5zLnB1c2godGhpcy50b2tlbik7XG4gIH0sXG5cbiAgYmVnaW5FbmRUYWc6IGZ1bmN0aW9uIGJlZ2luRW5kVGFnKCkge1xuICAgIHRoaXMudG9rZW4gPSB7XG4gICAgICB0eXBlOiAnRW5kVGFnJyxcbiAgICAgIHRhZ05hbWU6ICcnXG4gICAgfTtcbiAgICB0aGlzLnRva2Vucy5wdXNoKHRoaXMudG9rZW4pO1xuICB9LFxuXG4gIGZpbmlzaFRhZzogZnVuY3Rpb24gZmluaXNoVGFnKCkge1xuICAgIHRoaXMuYWRkTG9jSW5mbygpO1xuICB9LFxuXG4gIG1hcmtUYWdBc1NlbGZDbG9zaW5nOiBmdW5jdGlvbiBtYXJrVGFnQXNTZWxmQ2xvc2luZygpIHtcbiAgICB0aGlzLnRva2VuLnNlbGZDbG9zaW5nID0gdHJ1ZTtcbiAgfSxcblxuICAvLyBUYWdzIC0gbmFtZVxuXG4gIGFwcGVuZFRvVGFnTmFtZTogZnVuY3Rpb24gYXBwZW5kVG9UYWdOYW1lKGNoYXIpIHtcbiAgICB0aGlzLnRva2VuLnRhZ05hbWUgKz0gY2hhcjtcbiAgfSxcblxuICAvLyBUYWdzIC0gYXR0cmlidXRlc1xuXG4gIGJlZ2luQXR0cmlidXRlOiBmdW5jdGlvbiBiZWdpbkF0dHJpYnV0ZSgpIHtcbiAgICB0aGlzLl9jdXJyZW50QXR0cmlidXRlID0gW1wiXCIsIFwiXCIsIG51bGxdO1xuICAgIHRoaXMudG9rZW4uYXR0cmlidXRlcy5wdXNoKHRoaXMuX2N1cnJlbnRBdHRyaWJ1dGUpO1xuICB9LFxuXG4gIGFwcGVuZFRvQXR0cmlidXRlTmFtZTogZnVuY3Rpb24gYXBwZW5kVG9BdHRyaWJ1dGVOYW1lKGNoYXIpIHtcbiAgICB0aGlzLl9jdXJyZW50QXR0cmlidXRlWzBdICs9IGNoYXI7XG4gIH0sXG5cbiAgYmVnaW5BdHRyaWJ1dGVWYWx1ZTogZnVuY3Rpb24gYmVnaW5BdHRyaWJ1dGVWYWx1ZShpc1F1b3RlZCkge1xuICAgIHRoaXMuX2N1cnJlbnRBdHRyaWJ1dGVbMl0gPSBpc1F1b3RlZDtcbiAgfSxcblxuICBhcHBlbmRUb0F0dHJpYnV0ZVZhbHVlOiBmdW5jdGlvbiBhcHBlbmRUb0F0dHJpYnV0ZVZhbHVlKGNoYXIpIHtcbiAgICB0aGlzLl9jdXJyZW50QXR0cmlidXRlWzFdID0gdGhpcy5fY3VycmVudEF0dHJpYnV0ZVsxXSB8fCBcIlwiO1xuICAgIHRoaXMuX2N1cnJlbnRBdHRyaWJ1dGVbMV0gKz0gY2hhcjtcbiAgfSxcblxuICBmaW5pc2hBdHRyaWJ1dGVWYWx1ZTogZnVuY3Rpb24gZmluaXNoQXR0cmlidXRlVmFsdWUoKSB7fVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVG9rZW5pemVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5pc1NwYWNlID0gaXNTcGFjZTtcbmV4cG9ydHMuaXNBbHBoYSA9IGlzQWxwaGE7XG5leHBvcnRzLnByZXByb2Nlc3NJbnB1dCA9IHByZXByb2Nlc3NJbnB1dDtcbnZhciBXU1AgPSAvW1xcdFxcblxcZiBdLztcbnZhciBBTFBIQSA9IC9bQS1aYS16XS87XG52YXIgQ1JMRiA9IC9cXHJcXG4/L2c7XG5cbmZ1bmN0aW9uIGlzU3BhY2UoY2hhcikge1xuICByZXR1cm4gV1NQLnRlc3QoY2hhcik7XG59XG5cbmZ1bmN0aW9uIGlzQWxwaGEoY2hhcikge1xuICByZXR1cm4gQUxQSEEudGVzdChjaGFyKTtcbn1cblxuZnVuY3Rpb24gcHJlcHJvY2Vzc0lucHV0KGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKENSTEYsIFwiXFxuXCIpO1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvbGlua2lmeS1yZWFjdCcpLmRlZmF1bHQ7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiaW1wb3J0e3VzZVN0YXRlIGFzIG4sdXNlUmVkdWNlciBhcyB0LHVzZUVmZmVjdCBhcyBlLHVzZUxheW91dEVmZmVjdCBhcyByLHVzZVJlZiBhcyB1LHVzZUltcGVyYXRpdmVIYW5kbGUgYXMgbyx1c2VNZW1vIGFzIGksdXNlQ2FsbGJhY2sgYXMgYyx1c2VDb250ZXh0IGFzIGwsdXNlRGVidWdWYWx1ZSBhcyBmfWZyb21cInByZWFjdC9ob29rc1wiO2V4cG9ydCpmcm9tXCJwcmVhY3QvaG9va3NcIjtpbXBvcnR7Q29tcG9uZW50IGFzIGEsY3JlYXRlRWxlbWVudCBhcyBzLG9wdGlvbnMgYXMgaCx0b0NoaWxkQXJyYXkgYXMgdixGcmFnbWVudCBhcyBwLGh5ZHJhdGUgYXMgZCxyZW5kZXIgYXMgbSxfX3UgYXMgYixjbG9uZUVsZW1lbnQgYXMgeSxjcmVhdGVSZWYgYXMgXyxjcmVhdGVDb250ZXh0IGFzIGd9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e2NyZWF0ZUVsZW1lbnQsY3JlYXRlQ29udGV4dCxjcmVhdGVSZWYsRnJhZ21lbnQsQ29tcG9uZW50fWZyb21cInByZWFjdFwiO2Z1bmN0aW9uIEUobix0KXtmb3IodmFyIGUgaW4gdCluW2VdPXRbZV07cmV0dXJuIG59ZnVuY3Rpb24gUyhuLHQpe2Zvcih2YXIgZSBpbiBuKWlmKFwiX19zb3VyY2VcIiE9PWUmJiEoZSBpbiB0KSlyZXR1cm4hMDtmb3IodmFyIHIgaW4gdClpZihcIl9fc291cmNlXCIhPT1yJiZuW3JdIT09dFtyXSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiB3KG4pe3RoaXMucHJvcHM9bn1mdW5jdGlvbiBDKG4sdCl7ZnVuY3Rpb24gZShuKXt2YXIgZT10aGlzLnByb3BzLnJlZixyPWU9PW4ucmVmO3JldHVybiFyJiZlJiYoZS5jYWxsP2UobnVsbCk6ZS5jdXJyZW50PW51bGwpLHQ/IXQodGhpcy5wcm9wcyxuKXx8IXI6Uyh0aGlzLnByb3BzLG4pfWZ1bmN0aW9uIHIodCl7cmV0dXJuIHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlPWUscyhuLHQpfXJldHVybiByLmRpc3BsYXlOYW1lPVwiTWVtbyhcIisobi5kaXNwbGF5TmFtZXx8bi5uYW1lKStcIilcIixyLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50PSEwLHIuX19mPSEwLHJ9KHcucHJvdG90eXBlPW5ldyBhKS5pc1B1cmVSZWFjdENvbXBvbmVudD0hMCx3LnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGU9ZnVuY3Rpb24obix0KXtyZXR1cm4gUyh0aGlzLnByb3BzLG4pfHxTKHRoaXMuc3RhdGUsdCl9O3ZhciBSPWguX19iO2guX19iPWZ1bmN0aW9uKG4pe24udHlwZSYmbi50eXBlLl9fZiYmbi5yZWYmJihuLnByb3BzLnJlZj1uLnJlZixuLnJlZj1udWxsKSxSJiZSKG4pfTt2YXIgeD1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuZm9yJiZTeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIil8fDM5MTE7ZnVuY3Rpb24gayhuKXtmdW5jdGlvbiB0KHQsZSl7dmFyIHI9RSh7fSx0KTtyZXR1cm4gZGVsZXRlIHIucmVmLG4ociwoZT10LnJlZnx8ZSkmJihcIm9iamVjdFwiIT10eXBlb2YgZXx8XCJjdXJyZW50XCJpbiBlKT9lOm51bGwpfXJldHVybiB0LiQkdHlwZW9mPXgsdC5yZW5kZXI9dCx0LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50PXQuX19mPSEwLHQuZGlzcGxheU5hbWU9XCJGb3J3YXJkUmVmKFwiKyhuLmRpc3BsYXlOYW1lfHxuLm5hbWUpK1wiKVwiLHR9dmFyIE89ZnVuY3Rpb24obix0KXtyZXR1cm4gbnVsbD09bj9udWxsOnYodihuKS5tYXAodCkpfSxBPXttYXA6Tyxmb3JFYWNoOk8sY291bnQ6ZnVuY3Rpb24obil7cmV0dXJuIG4/dihuKS5sZW5ndGg6MH0sb25seTpmdW5jdGlvbihuKXt2YXIgdD12KG4pO2lmKDEhPT10Lmxlbmd0aCl0aHJvd1wiQ2hpbGRyZW4ub25seVwiO3JldHVybiB0WzBdfSx0b0FycmF5OnZ9LE49aC5fX2U7ZnVuY3Rpb24gTChuKXtyZXR1cm4gbiYmKChuPUUoe30sbikpLl9fYz1udWxsLG4uX19rPW4uX19rJiZuLl9fay5tYXAoTCkpLG59ZnVuY3Rpb24gVShuKXtyZXR1cm4gbiYmKG4uX192PW51bGwsbi5fX2s9bi5fX2smJm4uX19rLm1hcChVKSksbn1mdW5jdGlvbiBGKCl7dGhpcy5fX3U9MCx0aGlzLnQ9bnVsbCx0aGlzLl9fYj1udWxsfWZ1bmN0aW9uIE0obil7dmFyIHQ9bi5fXy5fX2M7cmV0dXJuIHQmJnQuX19lJiZ0Ll9fZShuKX1mdW5jdGlvbiBqKG4pe3ZhciB0LGUscjtmdW5jdGlvbiB1KHUpe2lmKHR8fCh0PW4oKSkudGhlbihmdW5jdGlvbihuKXtlPW4uZGVmYXVsdHx8bn0sZnVuY3Rpb24obil7cj1ufSkscil0aHJvdyByO2lmKCFlKXRocm93IHQ7cmV0dXJuIHMoZSx1KX1yZXR1cm4gdS5kaXNwbGF5TmFtZT1cIkxhenlcIix1Ll9fZj0hMCx1fWZ1bmN0aW9uIEQoKXt0aGlzLnU9bnVsbCx0aGlzLm89bnVsbH1oLl9fZT1mdW5jdGlvbihuLHQsZSl7aWYobi50aGVuKWZvcih2YXIgcix1PXQ7dT11Ll9fOylpZigocj11Ll9fYykmJnIuX19jKXJldHVybiBudWxsPT10Ll9fZSYmKHQuX19lPWUuX19lLHQuX19rPWUuX19rKSxyLl9fYyhuLHQuX19jKTtOKG4sdCxlKX0sKEYucHJvdG90eXBlPW5ldyBhKS5fX2M9ZnVuY3Rpb24obix0KXt2YXIgZT10aGlzO251bGw9PWUudCYmKGUudD1bXSksZS50LnB1c2godCk7dmFyIHI9TShlLl9fdiksdT0hMSxvPWZ1bmN0aW9uKCl7dXx8KHU9ITAsdC5jb21wb25lbnRXaWxsVW5tb3VudD10Ll9fYyxyP3IoaSk6aSgpKX07dC5fX2M9dC5jb21wb25lbnRXaWxsVW5tb3VudCx0LmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7bygpLHQuX19jJiZ0Ll9fYygpfTt2YXIgaT1mdW5jdGlvbigpe3ZhciBuO2lmKCEtLWUuX191KWZvcihlLl9fdi5fX2tbMF09VShlLnN0YXRlLl9fZSksZS5zZXRTdGF0ZSh7X19lOmUuX19iPW51bGx9KTtuPWUudC5wb3AoKTspbi5mb3JjZVVwZGF0ZSgpfSxjPWUuX192O2MmJiEwPT09Yy5fX2h8fGUuX191Kyt8fGUuc2V0U3RhdGUoe19fZTplLl9fYj1lLl9fdi5fX2tbMF19KSxuLnRoZW4obyxvKX0sRi5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQ9ZnVuY3Rpb24oKXt0aGlzLnQ9W119LEYucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihuLHQpe3RoaXMuX19iJiYodGhpcy5fX3YuX19rJiYodGhpcy5fX3YuX19rWzBdPUwodGhpcy5fX2IpKSx0aGlzLl9fYj1udWxsKTt2YXIgZT10Ll9fZSYmcyhwLG51bGwsbi5mYWxsYmFjayk7cmV0dXJuIGUmJihlLl9faD1udWxsKSxbcyhwLG51bGwsdC5fX2U/bnVsbDpuLmNoaWxkcmVuKSxlXX07dmFyIEk9ZnVuY3Rpb24obix0LGUpe2lmKCsrZVsxXT09PWVbMF0mJm4uby5kZWxldGUodCksbi5wcm9wcy5yZXZlYWxPcmRlciYmKFwidFwiIT09bi5wcm9wcy5yZXZlYWxPcmRlclswXXx8IW4uby5zaXplKSlmb3IoZT1uLnU7ZTspe2Zvcig7ZS5sZW5ndGg+MzspZS5wb3AoKSgpO2lmKGVbMV08ZVswXSlicmVhaztuLnU9ZT1lWzJdfX07ZnVuY3Rpb24gVChuKXtyZXR1cm4gdGhpcy5nZXRDaGlsZENvbnRleHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbi5jb250ZXh0fSxuLmNoaWxkcmVufWZ1bmN0aW9uIFcobil7dmFyIHQ9dGhpcyxlPW4uaSxyPXMoVCx7Y29udGV4dDp0LmNvbnRleHR9LG4uX192KTt0LmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dmFyIG49dC5sLnBhcmVudE5vZGU7biYmbi5yZW1vdmVDaGlsZCh0LmwpLGIodC5zKX0sdC5pJiZ0LmkhPT1lJiYodC5jb21wb25lbnRXaWxsVW5tb3VudCgpLHQuaD0hMSksbi5fX3Y/dC5oPyhlLl9faz10Ll9fayxtKHIsZSksdC5fX2s9ZS5fX2spOih0Lmw9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIiksdC5fX2s9ZS5fX2ssZChcIlwiLGUpLGUuYXBwZW5kQ2hpbGQodC5sKSx0Lmg9ITAsdC5pPWUsbShyLGUsdC5sKSxlLl9faz10Ll9fayx0Ll9faz10LmwuX19rKTp0LmgmJnQuY29tcG9uZW50V2lsbFVubW91bnQoKSx0LnM9cn1mdW5jdGlvbiBQKG4sdCl7cmV0dXJuIHMoVyx7X192Om4saTp0fSl9KEQucHJvdG90eXBlPW5ldyBhKS5fX2U9ZnVuY3Rpb24obil7dmFyIHQ9dGhpcyxlPU0odC5fX3YpLHI9dC5vLmdldChuKTtyZXR1cm4gclswXSsrLGZ1bmN0aW9uKHUpe3ZhciBvPWZ1bmN0aW9uKCl7dC5wcm9wcy5yZXZlYWxPcmRlcj8oci5wdXNoKHUpLEkodCxuLHIpKTp1KCl9O2U/ZShvKTpvKCl9fSxELnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24obil7dGhpcy51PW51bGwsdGhpcy5vPW5ldyBNYXA7dmFyIHQ9dihuLmNoaWxkcmVuKTtuLnJldmVhbE9yZGVyJiZcImJcIj09PW4ucmV2ZWFsT3JkZXJbMF0mJnQucmV2ZXJzZSgpO2Zvcih2YXIgZT10Lmxlbmd0aDtlLS07KXRoaXMuby5zZXQodFtlXSx0aGlzLnU9WzEsMCx0aGlzLnVdKTtyZXR1cm4gbi5jaGlsZHJlbn0sRC5wcm90b3R5cGUuY29tcG9uZW50RGlkVXBkYXRlPUQucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50PWZ1bmN0aW9uKCl7dmFyIG49dGhpczt0aGlzLm8uZm9yRWFjaChmdW5jdGlvbih0LGUpe0kobixlLHQpfSl9O3ZhciB6PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5mb3ImJlN5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpfHw2MDEwMyxWPS9eKD86YWNjZW50fGFsaWdubWVudHxhcmFiaWN8YmFzZWxpbmV8Y2FwfGNsaXAoPyFQYXRoVSl8Y29sb3J8ZmlsbHxmbG9vZHxmb250fGdseXBoKD8hUil8aG9yaXp8bWFya2VyKD8hSHxXfFUpfG92ZXJsaW5lfHBhaW50fHN0b3B8c3RyaWtldGhyb3VnaHxzdHJva2V8dGV4dCg/IUwpfHVuZGVybGluZXx1bmljb2RlfHVuaXRzfHZ8dmVjdG9yfHZlcnR8d29yZHx3cml0aW5nfHgoPyFDKSlbQS1aXS8sQj1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sPy9maWx8Y2hlfHJhZC9pOi9maWx8Y2hlfHJhL2k7ZnVuY3Rpb24gSChuLHQsZSl7cmV0dXJuIG51bGw9PXQuX19rJiYodC50ZXh0Q29udGVudD1cIlwiKSxtKG4sdCksXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmZSgpLG4/bi5fX2M6bnVsbH1mdW5jdGlvbiBaKG4sdCxlKXtyZXR1cm4gZChuLHQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJmUoKSxuP24uX19jOm51bGx9YS5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudD17fSxbXCJjb21wb25lbnRXaWxsTW91bnRcIixcImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNcIixcImNvbXBvbmVudFdpbGxVcGRhdGVcIl0uZm9yRWFjaChmdW5jdGlvbihuKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5wcm90b3R5cGUsbix7Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzW1wiVU5TQUZFX1wiK25dfSxzZXQ6ZnVuY3Rpb24odCl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsbix7Y29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOnR9KX19KX0pO3ZhciBZPWguZXZlbnQ7ZnVuY3Rpb24gJCgpe31mdW5jdGlvbiBxKCl7cmV0dXJuIHRoaXMuY2FuY2VsQnViYmxlfWZ1bmN0aW9uIEcoKXtyZXR1cm4gdGhpcy5kZWZhdWx0UHJldmVudGVkfWguZXZlbnQ9ZnVuY3Rpb24obil7cmV0dXJuIFkmJihuPVkobikpLG4ucGVyc2lzdD0kLG4uaXNQcm9wYWdhdGlvblN0b3BwZWQ9cSxuLmlzRGVmYXVsdFByZXZlbnRlZD1HLG4ubmF0aXZlRXZlbnQ9bn07dmFyIEosSz17Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzfX0sUT17Y29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzTmFtZX19LFg9aC52bm9kZTtoLnZub2RlPWZ1bmN0aW9uKG4pe3ZhciB0PW4udHlwZSxlPW4ucHJvcHMscj1lO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXtmb3IodmFyIHUgaW4gcj17fSxlKXt2YXIgbz1lW3VdO1wiZGVmYXVsdFZhbHVlXCI9PT11JiZcInZhbHVlXCJpbiBlJiZudWxsPT1lLnZhbHVlP3U9XCJ2YWx1ZVwiOlwiZG93bmxvYWRcIj09PXUmJiEwPT09bz9vPVwiXCI6L29uZG91YmxlY2xpY2svaS50ZXN0KHUpP3U9XCJvbmRibGNsaWNrXCI6L15vbmNoYW5nZSh0ZXh0YXJlYXxpbnB1dCkvaS50ZXN0KHUrdCkmJiFCLnRlc3QoZS50eXBlKT91PVwib25pbnB1dFwiOi9eb24oQW5pfFRyYXxUb3V8QmVmb3JlSW5wKS8udGVzdCh1KT91PXUudG9Mb3dlckNhc2UoKTpWLnRlc3QodSk/dT11LnJlcGxhY2UoL1tBLVowLTldLyxcIi0kJlwiKS50b0xvd2VyQ2FzZSgpOm51bGw9PT1vJiYobz12b2lkIDApLHJbdV09b31cInNlbGVjdFwiPT10JiZyLm11bHRpcGxlJiZBcnJheS5pc0FycmF5KHIudmFsdWUpJiYoci52YWx1ZT12KGUuY2hpbGRyZW4pLmZvckVhY2goZnVuY3Rpb24obil7bi5wcm9wcy5zZWxlY3RlZD0tMSE9ci52YWx1ZS5pbmRleE9mKG4ucHJvcHMudmFsdWUpfSkpLG4ucHJvcHM9cn10JiZyJiYoXCJjbGFzc05hbWVcImluIHI/T2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJjbGFzc1wiLFEpOk9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiY2xhc3NOYW1lXCIsSykpLG4uJCR0eXBlb2Y9eixYJiZYKG4pfTt2YXIgbm49aC5fX3I7aC5fX3I9ZnVuY3Rpb24obil7bm4mJm5uKG4pLEo9bi5fX2N9O3ZhciB0bj17UmVhY3RDdXJyZW50RGlzcGF0Y2hlcjp7Y3VycmVudDp7cmVhZENvbnRleHQ6ZnVuY3Rpb24obil7cmV0dXJuIEouX19uW24uX19jXS5wcm9wcy52YWx1ZX19fX0sZW49XCIxNi44LjBcIjtmdW5jdGlvbiBybihuKXtyZXR1cm4gcy5iaW5kKG51bGwsbil9ZnVuY3Rpb24gdW4obil7cmV0dXJuISFuJiZuLiQkdHlwZW9mPT09en1mdW5jdGlvbiBvbihuKXtyZXR1cm4gdW4obik/eS5hcHBseShudWxsLGFyZ3VtZW50cyk6bn1mdW5jdGlvbiBjbihuKXtyZXR1cm4hIW4uX19rJiYobShudWxsLG4pLCEwKX1mdW5jdGlvbiBsbihuKXtyZXR1cm4gbiYmKG4uYmFzZXx8MT09PW4ubm9kZVR5cGUmJm4pfHxudWxsfXZhciBmbj1mdW5jdGlvbihuLHQpe3JldHVybiBuKHQpfSxhbj1wO2V4cG9ydCBkZWZhdWx0e3VzZVN0YXRlOm4sdXNlUmVkdWNlcjp0LHVzZUVmZmVjdDplLHVzZUxheW91dEVmZmVjdDpyLHVzZVJlZjp1LHVzZUltcGVyYXRpdmVIYW5kbGU6byx1c2VNZW1vOmksdXNlQ2FsbGJhY2s6Yyx1c2VDb250ZXh0OmwsdXNlRGVidWdWYWx1ZTpmLHZlcnNpb246XCIxNi44LjBcIixDaGlsZHJlbjpBLHJlbmRlcjpILGh5ZHJhdGU6Wix1bm1vdW50Q29tcG9uZW50QXROb2RlOmNuLGNyZWF0ZVBvcnRhbDpQLGNyZWF0ZUVsZW1lbnQ6cyxjcmVhdGVDb250ZXh0OmcsY3JlYXRlRmFjdG9yeTpybixjbG9uZUVsZW1lbnQ6b24sY3JlYXRlUmVmOl8sRnJhZ21lbnQ6cCxpc1ZhbGlkRWxlbWVudDp1bixmaW5kRE9NTm9kZTpsbixDb21wb25lbnQ6YSxQdXJlQ29tcG9uZW50OncsbWVtbzpDLGZvcndhcmRSZWY6ayx1bnN0YWJsZV9iYXRjaGVkVXBkYXRlczpmbixTdHJpY3RNb2RlOnAsU3VzcGVuc2U6RixTdXNwZW5zZUxpc3Q6RCxsYXp5OmosX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6dG59O2V4cG9ydHtlbiBhcyB2ZXJzaW9uLEEgYXMgQ2hpbGRyZW4sSCBhcyByZW5kZXIsWiBhcyBoeWRyYXRlLGNuIGFzIHVubW91bnRDb21wb25lbnRBdE5vZGUsUCBhcyBjcmVhdGVQb3J0YWwscm4gYXMgY3JlYXRlRmFjdG9yeSxvbiBhcyBjbG9uZUVsZW1lbnQsdW4gYXMgaXNWYWxpZEVsZW1lbnQsbG4gYXMgZmluZERPTU5vZGUsdyBhcyBQdXJlQ29tcG9uZW50LEMgYXMgbWVtbyxrIGFzIGZvcndhcmRSZWYsZm4gYXMgdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMsYW4gYXMgU3RyaWN0TW9kZSxGIGFzIFN1c3BlbnNlLEQgYXMgU3VzcGVuc2VMaXN0LGogYXMgbGF6eSx0biBhcyBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wYXQubW9kdWxlLmpzLm1hcFxuIiwidmFyIG4sbCx1LGksdCxvLHIsZj17fSxlPVtdLGM9L2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaTtmdW5jdGlvbiBzKG4sbCl7Zm9yKHZhciB1IGluIGwpblt1XT1sW3VdO3JldHVybiBufWZ1bmN0aW9uIGEobil7dmFyIGw9bi5wYXJlbnROb2RlO2wmJmwucmVtb3ZlQ2hpbGQobil9ZnVuY3Rpb24gaChuLGwsdSl7dmFyIGksdCxvLHI9YXJndW1lbnRzLGY9e307Zm9yKG8gaW4gbClcImtleVwiPT1vP2k9bFtvXTpcInJlZlwiPT1vP3Q9bFtvXTpmW29dPWxbb107aWYoYXJndW1lbnRzLmxlbmd0aD4zKWZvcih1PVt1XSxvPTM7bzxhcmd1bWVudHMubGVuZ3RoO28rKyl1LnB1c2gocltvXSk7aWYobnVsbCE9dSYmKGYuY2hpbGRyZW49dSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbnVsbCE9bi5kZWZhdWx0UHJvcHMpZm9yKG8gaW4gbi5kZWZhdWx0UHJvcHMpdm9pZCAwPT09ZltvXSYmKGZbb109bi5kZWZhdWx0UHJvcHNbb10pO3JldHVybiB2KG4sZixpLHQsbnVsbCl9ZnVuY3Rpb24gdihsLHUsaSx0LG8pe3ZhciByPXt0eXBlOmwscHJvcHM6dSxrZXk6aSxyZWY6dCxfX2s6bnVsbCxfXzpudWxsLF9fYjowLF9fZTpudWxsLF9fZDp2b2lkIDAsX19jOm51bGwsX19oOm51bGwsY29uc3RydWN0b3I6dm9pZCAwLF9fdjpvfTtyZXR1cm4gbnVsbD09byYmKHIuX192PXIpLG51bGwhPW4udm5vZGUmJm4udm5vZGUocikscn1mdW5jdGlvbiB5KCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19ZnVuY3Rpb24gcChuKXtyZXR1cm4gbi5jaGlsZHJlbn1mdW5jdGlvbiBkKG4sbCl7dGhpcy5wcm9wcz1uLHRoaXMuY29udGV4dD1sfWZ1bmN0aW9uIF8obixsKXtpZihudWxsPT1sKXJldHVybiBuLl9fP18obi5fXyxuLl9fLl9fay5pbmRleE9mKG4pKzEpOm51bGw7Zm9yKHZhciB1O2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXJldHVybiB1Ll9fZTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuLnR5cGU/XyhuKTpudWxsfWZ1bmN0aW9uIHcobil7dmFyIGwsdTtpZihudWxsIT0obj1uLl9fKSYmbnVsbCE9bi5fX2Mpe2ZvcihuLl9fZT1uLl9fYy5iYXNlPW51bGwsbD0wO2w8bi5fX2subGVuZ3RoO2wrKylpZihudWxsIT0odT1uLl9fa1tsXSkmJm51bGwhPXUuX19lKXtuLl9fZT1uLl9fYy5iYXNlPXUuX19lO2JyZWFrfXJldHVybiB3KG4pfX1mdW5jdGlvbiBrKGwpeyghbC5fX2QmJihsLl9fZD0hMCkmJnUucHVzaChsKSYmIWcuX19yKyt8fHQhPT1uLmRlYm91bmNlUmVuZGVyaW5nKSYmKCh0PW4uZGVib3VuY2VSZW5kZXJpbmcpfHxpKShnKX1mdW5jdGlvbiBnKCl7Zm9yKHZhciBuO2cuX19yPXUubGVuZ3RoOyluPXUuc29ydChmdW5jdGlvbihuLGwpe3JldHVybiBuLl9fdi5fX2ItbC5fX3YuX19ifSksdT1bXSxuLnNvbWUoZnVuY3Rpb24obil7dmFyIGwsdSxpLHQsbyxyLGY7bi5fX2QmJihyPShvPShsPW4pLl9fdikuX19lLChmPWwuX19QKSYmKHU9W10sKGk9cyh7fSxvKSkuX192PWksdD0kKGYsbyxpLGwuX19uLHZvaWQgMCE9PWYub3duZXJTVkdFbGVtZW50LG51bGwhPW8uX19oP1tyXTpudWxsLHUsbnVsbD09cj9fKG8pOnIsby5fX2gpLGoodSxvKSx0IT1yJiZ3KG8pKSl9KX1mdW5jdGlvbiBtKG4sbCx1LGksdCxvLHIsYyxzLGgpe3ZhciB5LGQsdyxrLGcsbSxiLEE9aSYmaS5fX2t8fGUsUD1BLmxlbmd0aDtmb3Iocz09ZiYmKHM9bnVsbCE9cj9yWzBdOlA/XyhpLDApOm51bGwpLHUuX19rPVtdLHk9MDt5PGwubGVuZ3RoO3krKylpZihudWxsIT0oaz11Ll9fa1t5XT1udWxsPT0oaz1sW3ldKXx8XCJib29sZWFuXCI9PXR5cGVvZiBrP251bGw6XCJzdHJpbmdcIj09dHlwZW9mIGt8fFwibnVtYmVyXCI9PXR5cGVvZiBrP3YobnVsbCxrLG51bGwsbnVsbCxrKTpBcnJheS5pc0FycmF5KGspP3YocCx7Y2hpbGRyZW46a30sbnVsbCxudWxsLG51bGwpOm51bGwhPWsuX19lfHxudWxsIT1rLl9fYz92KGsudHlwZSxrLnByb3BzLGsua2V5LG51bGwsay5fX3YpOmspKXtpZihrLl9fPXUsay5fX2I9dS5fX2IrMSxudWxsPT09KHc9QVt5XSl8fHcmJmsua2V5PT13LmtleSYmay50eXBlPT09dy50eXBlKUFbeV09dm9pZCAwO2Vsc2UgZm9yKGQ9MDtkPFA7ZCsrKXtpZigodz1BW2RdKSYmay5rZXk9PXcua2V5JiZrLnR5cGU9PT13LnR5cGUpe0FbZF09dm9pZCAwO2JyZWFrfXc9bnVsbH1nPSQobixrLHc9d3x8Zix0LG8scixjLHMsaCksKGQ9ay5yZWYpJiZ3LnJlZiE9ZCYmKGJ8fChiPVtdKSx3LnJlZiYmYi5wdXNoKHcucmVmLG51bGwsayksYi5wdXNoKGQsay5fX2N8fGcsaykpLG51bGwhPWc/KG51bGw9PW0mJihtPWcpLHM9eChuLGssdyxBLHIsZyxzKSxofHxcIm9wdGlvblwiIT11LnR5cGU/XCJmdW5jdGlvblwiPT10eXBlb2YgdS50eXBlJiYodS5fX2Q9cyk6bi52YWx1ZT1cIlwiKTpzJiZ3Ll9fZT09cyYmcy5wYXJlbnROb2RlIT1uJiYocz1fKHcpKX1pZih1Ll9fZT1tLG51bGwhPXImJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUudHlwZSlmb3IoeT1yLmxlbmd0aDt5LS07KW51bGwhPXJbeV0mJmEoclt5XSk7Zm9yKHk9UDt5LS07KW51bGwhPUFbeV0mJkwoQVt5XSxBW3ldKTtpZihiKWZvcih5PTA7eTxiLmxlbmd0aDt5KyspSShiW3ldLGJbKyt5XSxiWysreV0pfWZ1bmN0aW9uIGIobixsKXtyZXR1cm4gbD1sfHxbXSxudWxsPT1ufHxcImJvb2xlYW5cIj09dHlwZW9mIG58fChBcnJheS5pc0FycmF5KG4pP24uc29tZShmdW5jdGlvbihuKXtiKG4sbCl9KTpsLnB1c2gobikpLGx9ZnVuY3Rpb24geChuLGwsdSxpLHQsbyxyKXt2YXIgZixlLGM7aWYodm9pZCAwIT09bC5fX2QpZj1sLl9fZCxsLl9fZD12b2lkIDA7ZWxzZSBpZih0PT11fHxvIT1yfHxudWxsPT1vLnBhcmVudE5vZGUpbjppZihudWxsPT1yfHxyLnBhcmVudE5vZGUhPT1uKW4uYXBwZW5kQ2hpbGQobyksZj1udWxsO2Vsc2V7Zm9yKGU9cixjPTA7KGU9ZS5uZXh0U2libGluZykmJmM8aS5sZW5ndGg7Yys9MilpZihlPT1vKWJyZWFrIG47bi5pbnNlcnRCZWZvcmUobyxyKSxmPXJ9cmV0dXJuIHZvaWQgMCE9PWY/ZjpvLm5leHRTaWJsaW5nfWZ1bmN0aW9uIEEobixsLHUsaSx0KXt2YXIgbztmb3IobyBpbiB1KVwiY2hpbGRyZW5cIj09PW98fFwia2V5XCI9PT1vfHxvIGluIGx8fEMobixvLG51bGwsdVtvXSxpKTtmb3IobyBpbiBsKXQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGxbb118fFwiY2hpbGRyZW5cIj09PW98fFwia2V5XCI9PT1vfHxcInZhbHVlXCI9PT1vfHxcImNoZWNrZWRcIj09PW98fHVbb109PT1sW29dfHxDKG4sbyxsW29dLHVbb10saSl9ZnVuY3Rpb24gUChuLGwsdSl7XCItXCI9PT1sWzBdP24uc2V0UHJvcGVydHkobCx1KTpuW2xdPW51bGw9PXU/XCJcIjpcIm51bWJlclwiIT10eXBlb2YgdXx8Yy50ZXN0KGwpP3U6dStcInB4XCJ9ZnVuY3Rpb24gQyhuLGwsdSxpLHQpe3ZhciBvLHIsZjtpZih0JiZcImNsYXNzTmFtZVwiPT1sJiYobD1cImNsYXNzXCIpLFwic3R5bGVcIj09PWwpaWYoXCJzdHJpbmdcIj09dHlwZW9mIHUpbi5zdHlsZS5jc3NUZXh0PXU7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2YgaSYmKG4uc3R5bGUuY3NzVGV4dD1pPVwiXCIpLGkpZm9yKGwgaW4gaSl1JiZsIGluIHV8fFAobi5zdHlsZSxsLFwiXCIpO2lmKHUpZm9yKGwgaW4gdSlpJiZ1W2xdPT09aVtsXXx8UChuLnN0eWxlLGwsdVtsXSl9ZWxzZVwib1wiPT09bFswXSYmXCJuXCI9PT1sWzFdPyhvPWwhPT0obD1sLnJlcGxhY2UoL0NhcHR1cmUkLyxcIlwiKSksKHI9bC50b0xvd2VyQ2FzZSgpKWluIG4mJihsPXIpLGw9bC5zbGljZSgyKSxuLmx8fChuLmw9e30pLG4ubFtsK29dPXUsZj1vP046eix1P2l8fG4uYWRkRXZlbnRMaXN0ZW5lcihsLGYsbyk6bi5yZW1vdmVFdmVudExpc3RlbmVyKGwsZixvKSk6XCJsaXN0XCIhPT1sJiZcInRhZ05hbWVcIiE9PWwmJlwiZm9ybVwiIT09bCYmXCJ0eXBlXCIhPT1sJiZcInNpemVcIiE9PWwmJlwiZG93bmxvYWRcIiE9PWwmJlwiaHJlZlwiIT09bCYmIXQmJmwgaW4gbj9uW2xdPW51bGw9PXU/XCJcIjp1OlwiZnVuY3Rpb25cIiE9dHlwZW9mIHUmJlwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcIiE9PWwmJihsIT09KGw9bC5yZXBsYWNlKC94bGluazo/LyxcIlwiKSk/bnVsbD09dXx8ITE9PT11P24ucmVtb3ZlQXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsbC50b0xvd2VyQ2FzZSgpKTpuLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLGwudG9Mb3dlckNhc2UoKSx1KTpudWxsPT11fHwhMT09PXUmJiEvXmFyLy50ZXN0KGwpP24ucmVtb3ZlQXR0cmlidXRlKGwpOm4uc2V0QXR0cmlidXRlKGwsdSkpfWZ1bmN0aW9uIHoobCl7dGhpcy5sW2wudHlwZSshMV0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIE4obCl7dGhpcy5sW2wudHlwZSshMF0obi5ldmVudD9uLmV2ZW50KGwpOmwpfWZ1bmN0aW9uIFQobixsLHUpe3ZhciBpLHQ7Zm9yKGk9MDtpPG4uX19rLmxlbmd0aDtpKyspKHQ9bi5fX2tbaV0pJiYodC5fXz1uLHQuX19lJiYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC50eXBlJiZ0Ll9fay5sZW5ndGg+MSYmVCh0LGwsdSksbD14KHUsdCx0LG4uX19rLG51bGwsdC5fX2UsbCksXCJmdW5jdGlvblwiPT10eXBlb2Ygbi50eXBlJiYobi5fX2Q9bCkpKX1mdW5jdGlvbiAkKGwsdSxpLHQsbyxyLGYsZSxjKXt2YXIgYSxoLHYseSxfLHcsayxnLGIseCxBLFA9dS50eXBlO2lmKHZvaWQgMCE9PXUuY29uc3RydWN0b3IpcmV0dXJuIG51bGw7bnVsbCE9aS5fX2gmJihjPWkuX19oLGU9dS5fX2U9aS5fX2UsdS5fX2g9bnVsbCxyPVtlXSksKGE9bi5fX2IpJiZhKHUpO3RyeXtuOmlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFApe2lmKGc9dS5wcm9wcyxiPShhPVAuY29udGV4dFR5cGUpJiZ0W2EuX19jXSx4PWE/Yj9iLnByb3BzLnZhbHVlOmEuX186dCxpLl9fYz9rPShoPXUuX19jPWkuX19jKS5fXz1oLl9fRTooXCJwcm90b3R5cGVcImluIFAmJlAucHJvdG90eXBlLnJlbmRlcj91Ll9fYz1oPW5ldyBQKGcseCk6KHUuX19jPWg9bmV3IGQoZyx4KSxoLmNvbnN0cnVjdG9yPVAsaC5yZW5kZXI9TSksYiYmYi5zdWIoaCksaC5wcm9wcz1nLGguc3RhdGV8fChoLnN0YXRlPXt9KSxoLmNvbnRleHQ9eCxoLl9fbj10LHY9aC5fX2Q9ITAsaC5fX2g9W10pLG51bGw9PWguX19zJiYoaC5fX3M9aC5zdGF0ZSksbnVsbCE9UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJihoLl9fcz09aC5zdGF0ZSYmKGguX19zPXMoe30saC5fX3MpKSxzKGguX19zLFAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKGcsaC5fX3MpKSkseT1oLnByb3BzLF89aC5zdGF0ZSx2KW51bGw9PVAuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzJiZudWxsIT1oLmNvbXBvbmVudFdpbGxNb3VudCYmaC5jb21wb25lbnRXaWxsTW91bnQoKSxudWxsIT1oLmNvbXBvbmVudERpZE1vdW50JiZoLl9faC5wdXNoKGguY29tcG9uZW50RGlkTW91bnQpO2Vsc2V7aWYobnVsbD09UC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMmJmchPT15JiZudWxsIT1oLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMmJmguY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhnLHgpLCFoLl9fZSYmbnVsbCE9aC5zaG91bGRDb21wb25lbnRVcGRhdGUmJiExPT09aC5zaG91bGRDb21wb25lbnRVcGRhdGUoZyxoLl9fcyx4KXx8dS5fX3Y9PT1pLl9fdil7aC5wcm9wcz1nLGguc3RhdGU9aC5fX3MsdS5fX3YhPT1pLl9fdiYmKGguX19kPSExKSxoLl9fdj11LHUuX19lPWkuX19lLHUuX19rPWkuX19rLGguX19oLmxlbmd0aCYmZi5wdXNoKGgpLFQodSxlLGwpO2JyZWFrIG59bnVsbCE9aC5jb21wb25lbnRXaWxsVXBkYXRlJiZoLmNvbXBvbmVudFdpbGxVcGRhdGUoZyxoLl9fcyx4KSxudWxsIT1oLmNvbXBvbmVudERpZFVwZGF0ZSYmaC5fX2gucHVzaChmdW5jdGlvbigpe2guY29tcG9uZW50RGlkVXBkYXRlKHksXyx3KX0pfWguY29udGV4dD14LGgucHJvcHM9ZyxoLnN0YXRlPWguX19zLChhPW4uX19yKSYmYSh1KSxoLl9fZD0hMSxoLl9fdj11LGguX19QPWwsYT1oLnJlbmRlcihoLnByb3BzLGguc3RhdGUsaC5jb250ZXh0KSxoLnN0YXRlPWguX19zLG51bGwhPWguZ2V0Q2hpbGRDb250ZXh0JiYodD1zKHMoe30sdCksaC5nZXRDaGlsZENvbnRleHQoKSkpLHZ8fG51bGw9PWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGV8fCh3PWguZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoeSxfKSksQT1udWxsIT1hJiZhLnR5cGU9PXAmJm51bGw9PWEua2V5P2EucHJvcHMuY2hpbGRyZW46YSxtKGwsQXJyYXkuaXNBcnJheShBKT9BOltBXSx1LGksdCxvLHIsZixlLGMpLGguYmFzZT11Ll9fZSx1Ll9faD1udWxsLGguX19oLmxlbmd0aCYmZi5wdXNoKGgpLGsmJihoLl9fRT1oLl9fPW51bGwpLGguX19lPSExfWVsc2UgbnVsbD09ciYmdS5fX3Y9PT1pLl9fdj8odS5fX2s9aS5fX2ssdS5fX2U9aS5fX2UpOnUuX19lPUgoaS5fX2UsdSxpLHQsbyxyLGYsYyk7KGE9bi5kaWZmZWQpJiZhKHUpfWNhdGNoKGwpe3UuX192PW51bGwsKGN8fG51bGwhPXIpJiYodS5fX2U9ZSx1Ll9faD0hIWMscltyLmluZGV4T2YoZSldPW51bGwpLG4uX19lKGwsdSxpKX1yZXR1cm4gdS5fX2V9ZnVuY3Rpb24gaihsLHUpe24uX19jJiZuLl9fYyh1LGwpLGwuc29tZShmdW5jdGlvbih1KXt0cnl7bD11Ll9faCx1Ll9faD1bXSxsLnNvbWUoZnVuY3Rpb24obil7bi5jYWxsKHUpfSl9Y2F0Y2gobCl7bi5fX2UobCx1Ll9fdil9fSl9ZnVuY3Rpb24gSChuLGwsdSxpLHQsbyxyLGMpe3ZhciBzLGEsaCx2LHkscD11LnByb3BzLGQ9bC5wcm9wcztpZih0PVwic3ZnXCI9PT1sLnR5cGV8fHQsbnVsbCE9bylmb3Iocz0wO3M8by5sZW5ndGg7cysrKWlmKG51bGwhPShhPW9bc10pJiYoKG51bGw9PT1sLnR5cGU/Mz09PWEubm9kZVR5cGU6YS5sb2NhbE5hbWU9PT1sLnR5cGUpfHxuPT1hKSl7bj1hLG9bc109bnVsbDticmVha31pZihudWxsPT1uKXtpZihudWxsPT09bC50eXBlKXJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkKTtuPXQ/ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixsLnR5cGUpOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobC50eXBlLGQuaXMmJntpczpkLmlzfSksbz1udWxsLGM9ITF9aWYobnVsbD09PWwudHlwZSlwPT09ZHx8YyYmbi5kYXRhPT09ZHx8KG4uZGF0YT1kKTtlbHNle2lmKG51bGwhPW8mJihvPWUuc2xpY2UuY2FsbChuLmNoaWxkTm9kZXMpKSxoPShwPXUucHJvcHN8fGYpLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLHY9ZC5kYW5nZXJvdXNseVNldElubmVySFRNTCwhYyl7aWYobnVsbCE9bylmb3IocD17fSx5PTA7eTxuLmF0dHJpYnV0ZXMubGVuZ3RoO3krKylwW24uYXR0cmlidXRlc1t5XS5uYW1lXT1uLmF0dHJpYnV0ZXNbeV0udmFsdWU7KHZ8fGgpJiYodiYmKGgmJnYuX19odG1sPT1oLl9faHRtbHx8di5fX2h0bWw9PT1uLmlubmVySFRNTCl8fChuLmlubmVySFRNTD12JiZ2Ll9faHRtbHx8XCJcIikpfUEobixkLHAsdCxjKSx2P2wuX19rPVtdOihzPWwucHJvcHMuY2hpbGRyZW4sbShuLEFycmF5LmlzQXJyYXkocyk/czpbc10sbCx1LGksXCJmb3JlaWduT2JqZWN0XCIhPT1sLnR5cGUmJnQsbyxyLGYsYykpLGN8fChcInZhbHVlXCJpbiBkJiZ2b2lkIDAhPT0ocz1kLnZhbHVlKSYmKHMhPT1uLnZhbHVlfHxcInByb2dyZXNzXCI9PT1sLnR5cGUmJiFzKSYmQyhuLFwidmFsdWVcIixzLHAudmFsdWUsITEpLFwiY2hlY2tlZFwiaW4gZCYmdm9pZCAwIT09KHM9ZC5jaGVja2VkKSYmcyE9PW4uY2hlY2tlZCYmQyhuLFwiY2hlY2tlZFwiLHMscC5jaGVja2VkLCExKSl9cmV0dXJuIG59ZnVuY3Rpb24gSShsLHUsaSl7dHJ5e1wiZnVuY3Rpb25cIj09dHlwZW9mIGw/bCh1KTpsLmN1cnJlbnQ9dX1jYXRjaChsKXtuLl9fZShsLGkpfX1mdW5jdGlvbiBMKGwsdSxpKXt2YXIgdCxvLHI7aWYobi51bm1vdW50JiZuLnVubW91bnQobCksKHQ9bC5yZWYpJiYodC5jdXJyZW50JiZ0LmN1cnJlbnQhPT1sLl9fZXx8SSh0LG51bGwsdSkpLGl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGwudHlwZXx8KGk9bnVsbCE9KG89bC5fX2UpKSxsLl9fZT1sLl9fZD12b2lkIDAsbnVsbCE9KHQ9bC5fX2MpKXtpZih0LmNvbXBvbmVudFdpbGxVbm1vdW50KXRyeXt0LmNvbXBvbmVudFdpbGxVbm1vdW50KCl9Y2F0Y2gobCl7bi5fX2UobCx1KX10LmJhc2U9dC5fX1A9bnVsbH1pZih0PWwuX19rKWZvcihyPTA7cjx0Lmxlbmd0aDtyKyspdFtyXSYmTCh0W3JdLHUsaSk7bnVsbCE9byYmYShvKX1mdW5jdGlvbiBNKG4sbCx1KXtyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvcihuLHUpfWZ1bmN0aW9uIE8obCx1LGkpe3ZhciB0LHIsYztuLl9fJiZuLl9fKGwsdSkscj0odD1pPT09byk/bnVsbDppJiZpLl9fa3x8dS5fX2ssbD1oKHAsbnVsbCxbbF0pLGM9W10sJCh1LCh0P3U6aXx8dSkuX19rPWwscnx8ZixmLHZvaWQgMCE9PXUub3duZXJTVkdFbGVtZW50LGkmJiF0P1tpXTpyP251bGw6dS5jaGlsZE5vZGVzLmxlbmd0aD9lLnNsaWNlLmNhbGwodS5jaGlsZE5vZGVzKTpudWxsLGMsaXx8Zix0KSxqKGMsbCl9ZnVuY3Rpb24gUyhuLGwpe08obixsLG8pfWZ1bmN0aW9uIHEobixsLHUpe3ZhciBpLHQsbyxyPWFyZ3VtZW50cyxmPXMoe30sbi5wcm9wcyk7Zm9yKG8gaW4gbClcImtleVwiPT1vP2k9bFtvXTpcInJlZlwiPT1vP3Q9bFtvXTpmW29dPWxbb107aWYoYXJndW1lbnRzLmxlbmd0aD4zKWZvcih1PVt1XSxvPTM7bzxhcmd1bWVudHMubGVuZ3RoO28rKyl1LnB1c2gocltvXSk7cmV0dXJuIG51bGwhPXUmJihmLmNoaWxkcmVuPXUpLHYobi50eXBlLGYsaXx8bi5rZXksdHx8bi5yZWYsbnVsbCl9ZnVuY3Rpb24gQihuLGwpe3ZhciB1PXtfX2M6bD1cIl9fY0NcIityKyssX186bixDb25zdW1lcjpmdW5jdGlvbihuLGwpe3JldHVybiBuLmNoaWxkcmVuKGwpfSxQcm92aWRlcjpmdW5jdGlvbihuLHUsaSl7cmV0dXJuIHRoaXMuZ2V0Q2hpbGRDb250ZXh0fHwodT1bXSwoaT17fSlbbF09dGhpcyx0aGlzLmdldENoaWxkQ29udGV4dD1mdW5jdGlvbigpe3JldHVybiBpfSx0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLnByb3BzLnZhbHVlIT09bi52YWx1ZSYmdS5zb21lKGspfSx0aGlzLnN1Yj1mdW5jdGlvbihuKXt1LnB1c2gobik7dmFyIGw9bi5jb21wb25lbnRXaWxsVW5tb3VudDtuLmNvbXBvbmVudFdpbGxVbm1vdW50PWZ1bmN0aW9uKCl7dS5zcGxpY2UodS5pbmRleE9mKG4pLDEpLGwmJmwuY2FsbChuKX19KSxuLmNoaWxkcmVufX07cmV0dXJuIHUuUHJvdmlkZXIuX189dS5Db25zdW1lci5jb250ZXh0VHlwZT11fW49e19fZTpmdW5jdGlvbihuLGwpe2Zvcih2YXIgdSxpLHQsbz1sLl9faDtsPWwuX187KWlmKCh1PWwuX19jKSYmIXUuX18pdHJ5e2lmKChpPXUuY29uc3RydWN0b3IpJiZudWxsIT1pLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciYmKHUuc2V0U3RhdGUoaS5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IobikpLHQ9dS5fX2QpLG51bGwhPXUuY29tcG9uZW50RGlkQ2F0Y2gmJih1LmNvbXBvbmVudERpZENhdGNoKG4pLHQ9dS5fX2QpLHQpcmV0dXJuIGwuX19oPW8sdS5fX0U9dX1jYXRjaChsKXtuPWx9dGhyb3cgbn19LGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGwhPW4mJnZvaWQgMD09PW4uY29uc3RydWN0b3J9LGQucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKG4sbCl7dmFyIHU7dT1udWxsIT10aGlzLl9fcyYmdGhpcy5fX3MhPT10aGlzLnN0YXRlP3RoaXMuX19zOnRoaXMuX19zPXMoe30sdGhpcy5zdGF0ZSksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmKG49bihzKHt9LHUpLHRoaXMucHJvcHMpKSxuJiZzKHUsbiksbnVsbCE9biYmdGhpcy5fX3YmJihsJiZ0aGlzLl9faC5wdXNoKGwpLGsodGhpcykpfSxkLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihuKXt0aGlzLl9fdiYmKHRoaXMuX19lPSEwLG4mJnRoaXMuX19oLnB1c2gobiksayh0aGlzKSl9LGQucHJvdG90eXBlLnJlbmRlcj1wLHU9W10saT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm9taXNlP1Byb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSk6c2V0VGltZW91dCxnLl9fcj0wLG89ZixyPTA7ZXhwb3J0e08gYXMgcmVuZGVyLFMgYXMgaHlkcmF0ZSxoIGFzIGNyZWF0ZUVsZW1lbnQsaCxwIGFzIEZyYWdtZW50LHkgYXMgY3JlYXRlUmVmLGwgYXMgaXNWYWxpZEVsZW1lbnQsZCBhcyBDb21wb25lbnQscSBhcyBjbG9uZUVsZW1lbnQsQiBhcyBjcmVhdGVDb250ZXh0LGIgYXMgdG9DaGlsZEFycmF5LEwgYXMgX191LG4gYXMgb3B0aW9uc307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubW9kdWxlLmpzLm1hcFxuIiwiaW1wb3J0e29wdGlvbnMgYXMgbn1mcm9tXCJwcmVhY3RcIjt2YXIgdCx1LHIsbz0wLGk9W10sYz1uLl9fcixmPW4uZGlmZmVkLGU9bi5fX2MsYT1uLnVubW91bnQ7ZnVuY3Rpb24gdih0LHIpe24uX19oJiZuLl9faCh1LHQsb3x8ciksbz0wO3ZhciBpPXUuX19IfHwodS5fX0g9e19fOltdLF9faDpbXX0pO3JldHVybiB0Pj1pLl9fLmxlbmd0aCYmaS5fXy5wdXNoKHt9KSxpLl9fW3RdfWZ1bmN0aW9uIG0obil7cmV0dXJuIG89MSxwKGssbil9ZnVuY3Rpb24gcChuLHIsbyl7dmFyIGk9dih0KyssMik7cmV0dXJuIGkudD1uLGkuX19jfHwoaS5fXz1bbz9vKHIpOmsodm9pZCAwLHIpLGZ1bmN0aW9uKG4pe3ZhciB0PWkudChpLl9fWzBdLG4pO2kuX19bMF0hPT10JiYoaS5fXz1bdCxpLl9fWzFdXSxpLl9fYy5zZXRTdGF0ZSh7fSkpfV0saS5fX2M9dSksaS5fX31mdW5jdGlvbiB5KHIsbyl7dmFyIGk9dih0KyssMyk7IW4uX19zJiZqKGkuX19ILG8pJiYoaS5fXz1yLGkuX19IPW8sdS5fX0guX19oLnB1c2goaSkpfWZ1bmN0aW9uIGwocixvKXt2YXIgaT12KHQrKyw0KTshbi5fX3MmJmooaS5fX0gsbykmJihpLl9fPXIsaS5fX0g9byx1Ll9faC5wdXNoKGkpKX1mdW5jdGlvbiBoKG4pe3JldHVybiBvPTUsXyhmdW5jdGlvbigpe3JldHVybntjdXJyZW50Om59fSxbXSl9ZnVuY3Rpb24gcyhuLHQsdSl7bz02LGwoZnVuY3Rpb24oKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24odCgpKTpuJiYobi5jdXJyZW50PXQoKSl9LG51bGw9PXU/dTp1LmNvbmNhdChuKSl9ZnVuY3Rpb24gXyhuLHUpe3ZhciByPXYodCsrLDcpO3JldHVybiBqKHIuX19ILHUpJiYoci5fXz1uKCksci5fX0g9dSxyLl9faD1uKSxyLl9ffWZ1bmN0aW9uIEEobix0KXtyZXR1cm4gbz04LF8oZnVuY3Rpb24oKXtyZXR1cm4gbn0sdCl9ZnVuY3Rpb24gRihuKXt2YXIgcj11LmNvbnRleHRbbi5fX2NdLG89dih0KyssOSk7cmV0dXJuIG8uX19jPW4scj8obnVsbD09by5fXyYmKG8uX189ITAsci5zdWIodSkpLHIucHJvcHMudmFsdWUpOm4uX199ZnVuY3Rpb24gVCh0LHUpe24udXNlRGVidWdWYWx1ZSYmbi51c2VEZWJ1Z1ZhbHVlKHU/dSh0KTp0KX1mdW5jdGlvbiBkKG4pe3ZhciByPXYodCsrLDEwKSxvPW0oKTtyZXR1cm4gci5fXz1uLHUuY29tcG9uZW50RGlkQ2F0Y2h8fCh1LmNvbXBvbmVudERpZENhdGNoPWZ1bmN0aW9uKG4pe3IuX18mJnIuX18obiksb1sxXShuKX0pLFtvWzBdLGZ1bmN0aW9uKCl7b1sxXSh2b2lkIDApfV19ZnVuY3Rpb24gcSgpe2kuc29tZShmdW5jdGlvbih0KXtpZih0Ll9fUCl0cnl7dC5fX0guX19oLmZvckVhY2goYiksdC5fX0guX19oLmZvckVhY2goZyksdC5fX0guX19oPVtdfWNhdGNoKHUpe3JldHVybiB0Ll9fSC5fX2g9W10sbi5fX2UodSx0Ll9fdiksITB9fSksaT1bXX1uLl9fcj1mdW5jdGlvbihuKXtjJiZjKG4pLHQ9MDt2YXIgcj0odT1uLl9fYykuX19IO3ImJihyLl9faC5mb3JFYWNoKGIpLHIuX19oLmZvckVhY2goZyksci5fX2g9W10pfSxuLmRpZmZlZD1mdW5jdGlvbih0KXtmJiZmKHQpO3ZhciB1PXQuX19jO3UmJnUuX19IJiZ1Ll9fSC5fX2gubGVuZ3RoJiYoMSE9PWkucHVzaCh1KSYmcj09PW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwoKHI9bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpfHxmdW5jdGlvbihuKXt2YXIgdCx1PWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHIpLHgmJmNhbmNlbEFuaW1hdGlvbkZyYW1lKHQpLHNldFRpbWVvdXQobil9LHI9c2V0VGltZW91dCh1LDEwMCk7eCYmKHQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHUpKX0pKHEpKX0sbi5fX2M9ZnVuY3Rpb24odCx1KXt1LnNvbWUoZnVuY3Rpb24odCl7dHJ5e3QuX19oLmZvckVhY2goYiksdC5fX2g9dC5fX2guZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiFuLl9ffHxnKG4pfSl9Y2F0Y2gocil7dS5zb21lKGZ1bmN0aW9uKG4pe24uX19oJiYobi5fX2g9W10pfSksdT1bXSxuLl9fZShyLHQuX192KX19KSxlJiZlKHQsdSl9LG4udW5tb3VudD1mdW5jdGlvbih0KXthJiZhKHQpO3ZhciB1PXQuX19jO2lmKHUmJnUuX19IKXRyeXt1Ll9fSC5fXy5mb3JFYWNoKGIpfWNhdGNoKHQpe24uX19lKHQsdS5fX3YpfX07dmFyIHg9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO2Z1bmN0aW9uIGIobil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbi51JiZuLnUoKX1mdW5jdGlvbiBnKG4pe24udT1uLl9fKCl9ZnVuY3Rpb24gaihuLHQpe3JldHVybiFufHxuLmxlbmd0aCE9PXQubGVuZ3RofHx0LnNvbWUoZnVuY3Rpb24odCx1KXtyZXR1cm4gdCE9PW5bdV19KX1mdW5jdGlvbiBrKG4sdCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdD90KG4pOnR9ZXhwb3J0e20gYXMgdXNlU3RhdGUscCBhcyB1c2VSZWR1Y2VyLHkgYXMgdXNlRWZmZWN0LGwgYXMgdXNlTGF5b3V0RWZmZWN0LGggYXMgdXNlUmVmLHMgYXMgdXNlSW1wZXJhdGl2ZUhhbmRsZSxfIGFzIHVzZU1lbW8sQSBhcyB1c2VDYWxsYmFjayxGIGFzIHVzZUNvbnRleHQsVCBhcyB1c2VEZWJ1Z1ZhbHVlLGQgYXMgdXNlRXJyb3JCb3VuZGFyeX07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ob29rcy5tb2R1bGUuanMubWFwXG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXNldHMgd2FybmluZyBjYWNoZSB3aGVuIHRlc3RpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2hlY2tQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdElzID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbnZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgZWxlbWVudFR5cGU6IGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJyArIHByb3BGdWxsTmFtZSArICdgIHByb3Agb24gYCcgKyBjb21wb25lbnROYW1lICArICdgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZVR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghUmVhY3RJcy5pc1ZhbGlkRWxlbWVudFR5cGUocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQgdHlwZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50cyBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXksIGdvdCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLiAnICtcbiAgICAgICAgICAgICdBIGNvbW1vbiBtaXN0YWtlIGlzIHRvIHdyaXRlIG9uZU9mKHgsIHksIHopIGluc3RlYWQgb2Ygb25lT2YoW3gsIHksIHpdKS4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGFycmF5LicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcywgZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgU3RyaW5nKHByb3BWYWx1ZSkgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKGhhcyhwcm9wVmFsdWUsIGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmYWxzeSB2YWx1ZSBjYW4ndCBiZSBhIFN5bWJvbFxuICAgIGlmICghcHJvcFZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMucmVzZXRXYXJuaW5nQ2FjaGUgPSBjaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZTtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoUmVhY3RJcy5pc0VsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZU1lbW8sIHVzZUNvbnRleHQsIG1lbW8sIENoaWxkcmVuLCB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZUxheW91dEVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgaXNET00gZnJvbSAnaXMtZG9tJztcblxuZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRyZXR1cm4gbW9kdWxlID0geyBleHBvcnRzOiB7fSB9LCBmbihtb2R1bGUsIG1vZHVsZS5leHBvcnRzKSwgbW9kdWxlLmV4cG9ydHM7XG59XG5cbnZhciBfZXh0ZW5kc18xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSkge1xuICBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG4gICAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgbW9kdWxlLmV4cG9ydHMgPSBfZXh0ZW5kcztcbn0pO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpO1xuICB2YXIga2V5LCBpO1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzO1xuXG52YXIgdGhlbWUgPSB7XG4gIEJBU0VfRk9OVF9GQU1JTFk6ICdNZW5sbywgbW9ub3NwYWNlJyxcbiAgQkFTRV9GT05UX1NJWkU6ICcxMXB4JyxcbiAgQkFTRV9MSU5FX0hFSUdIVDogMS4yLFxuICBCQVNFX0JBQ0tHUk9VTkRfQ09MT1I6ICdyZ2IoMzYsIDM2LCAzNiknLFxuICBCQVNFX0NPTE9SOiAncmdiKDIxMywgMjEzLCAyMTMpJyxcbiAgT0JKRUNUX1BSRVZJRVdfQVJSQVlfTUFYX1BST1BFUlRJRVM6IDEwLFxuICBPQkpFQ1RfUFJFVklFV19PQkpFQ1RfTUFYX1BST1BFUlRJRVM6IDUsXG4gIE9CSkVDVF9OQU1FX0NPTE9SOiAncmdiKDIyNywgMTEwLCAyMzYpJyxcbiAgT0JKRUNUX1ZBTFVFX05VTExfQ09MT1I6ICdyZ2IoMTI3LCAxMjcsIDEyNyknLFxuICBPQkpFQ1RfVkFMVUVfVU5ERUZJTkVEX0NPTE9SOiAncmdiKDEyNywgMTI3LCAxMjcpJyxcbiAgT0JKRUNUX1ZBTFVFX1JFR0VYUF9DT0xPUjogJ3JnYigyMzMsIDYzLCA1OSknLFxuICBPQkpFQ1RfVkFMVUVfU1RSSU5HX0NPTE9SOiAncmdiKDIzMywgNjMsIDU5KScsXG4gIE9CSkVDVF9WQUxVRV9TWU1CT0xfQ09MT1I6ICdyZ2IoMjMzLCA2MywgNTkpJyxcbiAgT0JKRUNUX1ZBTFVFX05VTUJFUl9DT0xPUjogJ2hzbCgyNTIsIDEwMCUsIDc1JSknLFxuICBPQkpFQ1RfVkFMVUVfQk9PTEVBTl9DT0xPUjogJ2hzbCgyNTIsIDEwMCUsIDc1JSknLFxuICBPQkpFQ1RfVkFMVUVfRlVOQ1RJT05fUFJFRklYX0NPTE9SOiAncmdiKDg1LCAxMDYsIDI0MiknLFxuICBIVE1MX1RBR19DT0xPUjogJ3JnYig5MywgMTc2LCAyMTUpJyxcbiAgSFRNTF9UQUdOQU1FX0NPTE9SOiAncmdiKDkzLCAxNzYsIDIxNSknLFxuICBIVE1MX1RBR05BTUVfVEVYVF9UUkFOU0ZPUk06ICdsb3dlcmNhc2UnLFxuICBIVE1MX0FUVFJJQlVURV9OQU1FX0NPTE9SOiAncmdiKDE1NSwgMTg3LCAyMjApJyxcbiAgSFRNTF9BVFRSSUJVVEVfVkFMVUVfQ09MT1I6ICdyZ2IoMjQyLCAxNTEsIDEwMiknLFxuICBIVE1MX0NPTU1FTlRfQ09MT1I6ICdyZ2IoMTM3LCAxMzcsIDEzNyknLFxuICBIVE1MX0RPQ1RZUEVfQ09MT1I6ICdyZ2IoMTkyLCAxOTIsIDE5MiknLFxuICBBUlJPV19DT0xPUjogJ3JnYigxNDUsIDE0NSwgMTQ1KScsXG4gIEFSUk9XX01BUkdJTl9SSUdIVDogMyxcbiAgQVJST1dfRk9OVF9TSVpFOiAxMixcbiAgQVJST1dfQU5JTUFUSU9OX0RVUkFUSU9OOiAnMCcsXG4gIFRSRUVOT0RFX0ZPTlRfRkFNSUxZOiAnTWVubG8sIG1vbm9zcGFjZScsXG4gIFRSRUVOT0RFX0ZPTlRfU0laRTogJzExcHgnLFxuICBUUkVFTk9ERV9MSU5FX0hFSUdIVDogMS4yLFxuICBUUkVFTk9ERV9QQURESU5HX0xFRlQ6IDEyLFxuICBUQUJMRV9CT1JERVJfQ09MT1I6ICdyZ2IoODUsIDg1LCA4NSknLFxuICBUQUJMRV9USF9CQUNLR1JPVU5EX0NPTE9SOiAncmdiKDQ0LCA0NCwgNDQpJyxcbiAgVEFCTEVfVEhfSE9WRVJfQ09MT1I6ICdyZ2IoNDgsIDQ4LCA0OCknLFxuICBUQUJMRV9TT1JUX0lDT05fQ09MT1I6ICdibGFjaycsXG4gIFRBQkxFX0RBVEFfQkFDS0dST1VORF9JTUFHRTogJ2xpbmVhci1ncmFkaWVudChyZ2JhKDI1NSwgMjU1LCAyNTUsIDApLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDUwJSwgcmdiYSg1MSwgMTM5LCAyNTUsIDAuMDk4MDM5MikgNTAlLCByZ2JhKDUxLCAxMzksIDI1NSwgMC4wOTgwMzkyKSknLFxuICBUQUJMRV9EQVRBX0JBQ0tHUk9VTkRfU0laRTogJzEyOHB4IDMycHgnXG59O1xuXG52YXIgdGhlbWUkMSA9IHtcbiAgQkFTRV9GT05UX0ZBTUlMWTogJ01lbmxvLCBtb25vc3BhY2UnLFxuICBCQVNFX0ZPTlRfU0laRTogJzExcHgnLFxuICBCQVNFX0xJTkVfSEVJR0hUOiAxLjIsXG4gIEJBU0VfQkFDS0dST1VORF9DT0xPUjogJ3doaXRlJyxcbiAgQkFTRV9DT0xPUjogJ2JsYWNrJyxcbiAgT0JKRUNUX1BSRVZJRVdfQVJSQVlfTUFYX1BST1BFUlRJRVM6IDEwLFxuICBPQkpFQ1RfUFJFVklFV19PQkpFQ1RfTUFYX1BST1BFUlRJRVM6IDUsXG4gIE9CSkVDVF9OQU1FX0NPTE9SOiAncmdiKDEzNiwgMTksIDE0NSknLFxuICBPQkpFQ1RfVkFMVUVfTlVMTF9DT0xPUjogJ3JnYigxMjgsIDEyOCwgMTI4KScsXG4gIE9CSkVDVF9WQUxVRV9VTkRFRklORURfQ09MT1I6ICdyZ2IoMTI4LCAxMjgsIDEyOCknLFxuICBPQkpFQ1RfVkFMVUVfUkVHRVhQX0NPTE9SOiAncmdiKDE5NiwgMjYsIDIyKScsXG4gIE9CSkVDVF9WQUxVRV9TVFJJTkdfQ09MT1I6ICdyZ2IoMTk2LCAyNiwgMjIpJyxcbiAgT0JKRUNUX1ZBTFVFX1NZTUJPTF9DT0xPUjogJ3JnYigxOTYsIDI2LCAyMiknLFxuICBPQkpFQ1RfVkFMVUVfTlVNQkVSX0NPTE9SOiAncmdiKDI4LCAwLCAyMDcpJyxcbiAgT0JKRUNUX1ZBTFVFX0JPT0xFQU5fQ09MT1I6ICdyZ2IoMjgsIDAsIDIwNyknLFxuICBPQkpFQ1RfVkFMVUVfRlVOQ1RJT05fUFJFRklYX0NPTE9SOiAncmdiKDEzLCAzNCwgMTcwKScsXG4gIEhUTUxfVEFHX0NPTE9SOiAncmdiKDE2OCwgMTQ4LCAxNjYpJyxcbiAgSFRNTF9UQUdOQU1FX0NPTE9SOiAncmdiKDEzNiwgMTgsIDEyOCknLFxuICBIVE1MX1RBR05BTUVfVEVYVF9UUkFOU0ZPUk06ICdsb3dlcmNhc2UnLFxuICBIVE1MX0FUVFJJQlVURV9OQU1FX0NPTE9SOiAncmdiKDE1MywgNjksIDApJyxcbiAgSFRNTF9BVFRSSUJVVEVfVkFMVUVfQ09MT1I6ICdyZ2IoMjYsIDI2LCAxNjYpJyxcbiAgSFRNTF9DT01NRU5UX0NPTE9SOiAncmdiKDM1LCAxMTAsIDM3KScsXG4gIEhUTUxfRE9DVFlQRV9DT0xPUjogJ3JnYigxOTIsIDE5MiwgMTkyKScsXG4gIEFSUk9XX0NPTE9SOiAnIzZlNmU2ZScsXG4gIEFSUk9XX01BUkdJTl9SSUdIVDogMyxcbiAgQVJST1dfRk9OVF9TSVpFOiAxMixcbiAgQVJST1dfQU5JTUFUSU9OX0RVUkFUSU9OOiAnMCcsXG4gIFRSRUVOT0RFX0ZPTlRfRkFNSUxZOiAnTWVubG8sIG1vbm9zcGFjZScsXG4gIFRSRUVOT0RFX0ZPTlRfU0laRTogJzExcHgnLFxuICBUUkVFTk9ERV9MSU5FX0hFSUdIVDogMS4yLFxuICBUUkVFTk9ERV9QQURESU5HX0xFRlQ6IDEyLFxuICBUQUJMRV9CT1JERVJfQ09MT1I6ICcjYWFhJyxcbiAgVEFCTEVfVEhfQkFDS0dST1VORF9DT0xPUjogJyNlZWUnLFxuICBUQUJMRV9USF9IT1ZFUl9DT0xPUjogJ2hzbGEoMCwgMCUsIDkwJSwgMSknLFxuICBUQUJMRV9TT1JUX0lDT05fQ09MT1I6ICcjNmU2ZTZlJyxcbiAgVEFCTEVfREFUQV9CQUNLR1JPVU5EX0lNQUdFOiAnbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgd2hpdGUsIHdoaXRlIDUwJSwgcmdiKDIzNCwgMjQzLCAyNTUpIDUwJSwgcmdiKDIzNCwgMjQzLCAyNTUpKScsXG4gIFRBQkxFX0RBVEFfQkFDS0dST1VORF9TSVpFOiAnMTI4cHggMzJweCdcbn07XG5cbnZhciB0aGVtZXMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG5fX3Byb3RvX186IG51bGwsXG5jaHJvbWVEYXJrOiB0aGVtZSxcbmNocm9tZUxpZ2h0OiB0aGVtZSQxXG59KTtcblxudmFyIHJ1bnRpbWVfMSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgdmFyIHJ1bnRpbWUgPSBmdW5jdGlvbiAoZXhwb3J0cykge1xuICAgIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gICAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICAgIHZhciB1bmRlZmluZWQkMTtcbiAgICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICAgIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gICAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuICAgIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiBnZW5lcmF0b3I7XG4gICAgfVxuICAgIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gICAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFwibm9ybWFsXCIsXG4gICAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICAgIGFyZzogZXJyXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICAgIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICAgIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gICAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcbiAgICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuICAgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gICAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICAgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gICAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICAgIH1cbiAgICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPSBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY3RvciA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgOiBmYWxzZTtcbiAgICB9O1xuICAgIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICAgIH1cbiAgICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICAgIHJldHVybiBnZW5GdW47XG4gICAgfTtcbiAgICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgX19hd2FpdDogYXJnXG4gICAgICB9O1xuICAgIH07XG4gICAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcbiAgICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgICB9XG4gICAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcbiAgICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24gKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcbiAgICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbikgPyBpdGVyXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IEdlblN0YXRlQ29tcGxldGVkIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQkMSkge1xuICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkJDE7XG4gICAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgIGlmICghaW5mbykge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQkMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICB9XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuICAgIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuICAgIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgICAgfTtcbiAgICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgICAgfVxuICAgICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgICAgfVxuICAgICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgICAgdGhpcy50cnlFbnRyaWVzID0gW3tcbiAgICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgICAgfV07XG4gICAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgICB0aGlzLnJlc2V0KHRydWUpO1xuICAgIH1cbiAgICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICAgIGtleXMucmV2ZXJzZSgpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgICAgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQkMTtcbiAgICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZXh0OiBkb25lUmVzdWx0XG4gICAgICB9O1xuICAgIH1cbiAgICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcbiAgICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCQxLFxuICAgICAgICBkb25lOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuICAgICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQkMTtcbiAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZCQxO1xuICAgICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcbiAgICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZCQxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICAgIH0sXG4gICAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkJDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG4gICAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJiAodHlwZSA9PT0gXCJicmVha1wiIHx8IHR5cGUgPT09IFwiY29udGludWVcIikgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgICByZWNvcmQuYXJnID0gYXJnO1xuICAgICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHwgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH0sXG4gICAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNhdGNoXCI6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgICAgfSxcbiAgICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIChpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQkMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBleHBvcnRzO1xuICB9KFxuICAgbW9kdWxlLmV4cG9ydHMgKTtcbiAgdHJ5IHtcbiAgICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn0pO1xuXG52YXIgcmVnZW5lcmF0b3IgPSBydW50aW1lXzE7XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cbnZhciBhcnJheVdpdGhIb2xlcyA9IF9hcnJheVdpdGhIb2xlcztcblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBfYXJyO1xufVxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0O1xuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuICByZXR1cm4gYXJyMjtcbn1cbnZhciBhcnJheUxpa2VUb0FycmF5ID0gX2FycmF5TGlrZVRvQXJyYXk7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXk7XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG52YXIgbm9uSXRlcmFibGVSZXN0ID0gX25vbkl0ZXJhYmxlUmVzdDtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cbnZhciBzbGljZWRUb0FycmF5ID0gX3NsaWNlZFRvQXJyYXk7XG5cbnZhciBfdHlwZW9mXzEgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG4gIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBfdHlwZW9mKG9iaik7XG4gIH1cbiAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mO1xufSk7XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cbnZhciBhcnJheVdpdGhvdXRIb2xlcyA9IF9hcnJheVdpdGhvdXRIb2xlcztcblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IF9pdGVyYWJsZVRvQXJyYXk7XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSBfbm9uSXRlcmFibGVTcHJlYWQ7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxudmFyIHRvQ29uc3VtYWJsZUFycmF5ID0gX3RvQ29uc3VtYWJsZUFycmF5O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG52YXIgZGVmaW5lUHJvcGVydHkgPSBfZGVmaW5lUHJvcGVydHk7XG5cbnZhciBFeHBhbmRlZFBhdGhzQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoW3t9LCBmdW5jdGlvbiAoKSB7fV0pO1xuXG52YXIgdW5zZWxlY3RhYmxlID0ge1xuICBXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcbiAgV2Via2l0VXNlclNlbGVjdDogJ25vbmUnLFxuICBLaHRtbFVzZXJTZWxlY3Q6ICdub25lJyxcbiAgTW96VXNlclNlbGVjdDogJ25vbmUnLFxuICBtc1VzZXJTZWxlY3Q6ICdub25lJyxcbiAgT1VzZXJTZWxlY3Q6ICdub25lJyxcbiAgdXNlclNlbGVjdDogJ25vbmUnXG59O1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHsgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTsgfSBlbHNlIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cbnZhciBiYXNlID0gKGZ1bmN0aW9uICh0aGVtZSkge1xuICByZXR1cm4ge1xuICAgIERPTU5vZGVQcmV2aWV3OiB7XG4gICAgICBodG1sT3BlblRhZzoge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgY29sb3I6IHRoZW1lLkhUTUxfVEFHX0NPTE9SXG4gICAgICAgIH0sXG4gICAgICAgIHRhZ05hbWU6IHtcbiAgICAgICAgICBjb2xvcjogdGhlbWUuSFRNTF9UQUdOQU1FX0NPTE9SLFxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06IHRoZW1lLkhUTUxfVEFHTkFNRV9URVhUX1RSQU5TRk9STVxuICAgICAgICB9LFxuICAgICAgICBodG1sQXR0cmlidXRlTmFtZToge1xuICAgICAgICAgIGNvbG9yOiB0aGVtZS5IVE1MX0FUVFJJQlVURV9OQU1FX0NPTE9SXG4gICAgICAgIH0sXG4gICAgICAgIGh0bWxBdHRyaWJ1dGVWYWx1ZToge1xuICAgICAgICAgIGNvbG9yOiB0aGVtZS5IVE1MX0FUVFJJQlVURV9WQUxVRV9DT0xPUlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaHRtbENsb3NlVGFnOiB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBjb2xvcjogdGhlbWUuSFRNTF9UQUdfQ09MT1JcbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0TGVmdDoge1xuICAgICAgICAgIG1hcmdpbkxlZnQ6IC10aGVtZS5UUkVFTk9ERV9QQURESU5HX0xFRlRcbiAgICAgICAgfSxcbiAgICAgICAgdGFnTmFtZToge1xuICAgICAgICAgIGNvbG9yOiB0aGVtZS5IVE1MX1RBR05BTUVfQ09MT1IsXG4gICAgICAgICAgdGV4dFRyYW5zZm9ybTogdGhlbWUuSFRNTF9UQUdOQU1FX1RFWFRfVFJBTlNGT1JNXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBodG1sQ29tbWVudDoge1xuICAgICAgICBjb2xvcjogdGhlbWUuSFRNTF9DT01NRU5UX0NPTE9SXG4gICAgICB9LFxuICAgICAgaHRtbERvY3R5cGU6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLkhUTUxfRE9DVFlQRV9DT0xPUlxuICAgICAgfVxuICAgIH0sXG4gICAgT2JqZWN0UHJldmlldzoge1xuICAgICAgb2JqZWN0RGVzY3JpcHRpb246IHtcbiAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJ1xuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJ1xuICAgICAgfSxcbiAgICAgIGFycmF5TWF4UHJvcGVydGllczogdGhlbWUuT0JKRUNUX1BSRVZJRVdfQVJSQVlfTUFYX1BST1BFUlRJRVMsXG4gICAgICBvYmplY3RNYXhQcm9wZXJ0aWVzOiB0aGVtZS5PQkpFQ1RfUFJFVklFV19PQkpFQ1RfTUFYX1BST1BFUlRJRVNcbiAgICB9LFxuICAgIE9iamVjdE5hbWU6IHtcbiAgICAgIGJhc2U6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLk9CSkVDVF9OQU1FX0NPTE9SXG4gICAgICB9LFxuICAgICAgZGltbWVkOiB7XG4gICAgICAgIG9wYWNpdHk6IDAuNlxuICAgICAgfVxuICAgIH0sXG4gICAgT2JqZWN0VmFsdWU6IHtcbiAgICAgIG9iamVjdFZhbHVlTnVsbDoge1xuICAgICAgICBjb2xvcjogdGhlbWUuT0JKRUNUX1ZBTFVFX05VTExfQ09MT1JcbiAgICAgIH0sXG4gICAgICBvYmplY3RWYWx1ZVVuZGVmaW5lZDoge1xuICAgICAgICBjb2xvcjogdGhlbWUuT0JKRUNUX1ZBTFVFX1VOREVGSU5FRF9DT0xPUlxuICAgICAgfSxcbiAgICAgIG9iamVjdFZhbHVlUmVnRXhwOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5PQkpFQ1RfVkFMVUVfUkVHRVhQX0NPTE9SXG4gICAgICB9LFxuICAgICAgb2JqZWN0VmFsdWVTdHJpbmc6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLk9CSkVDVF9WQUxVRV9TVFJJTkdfQ09MT1JcbiAgICAgIH0sXG4gICAgICBvYmplY3RWYWx1ZVN5bWJvbDoge1xuICAgICAgICBjb2xvcjogdGhlbWUuT0JKRUNUX1ZBTFVFX1NZTUJPTF9DT0xPUlxuICAgICAgfSxcbiAgICAgIG9iamVjdFZhbHVlTnVtYmVyOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5PQkpFQ1RfVkFMVUVfTlVNQkVSX0NPTE9SXG4gICAgICB9LFxuICAgICAgb2JqZWN0VmFsdWVCb29sZWFuOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5PQkpFQ1RfVkFMVUVfQk9PTEVBTl9DT0xPUlxuICAgICAgfSxcbiAgICAgIG9iamVjdFZhbHVlRnVuY3Rpb25QcmVmaXg6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLk9CSkVDVF9WQUxVRV9GVU5DVElPTl9QUkVGSVhfQ09MT1IsXG4gICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYydcbiAgICAgIH0sXG4gICAgICBvYmplY3RWYWx1ZUZ1bmN0aW9uTmFtZToge1xuICAgICAgICBmb250U3R5bGU6ICdpdGFsaWMnXG4gICAgICB9XG4gICAgfSxcbiAgICBUcmVlVmlldzoge1xuICAgICAgdHJlZVZpZXdPdXRsaW5lOiB7XG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgbGlzdFN0eWxlVHlwZTogJ25vbmUnXG4gICAgICB9XG4gICAgfSxcbiAgICBUcmVlTm9kZToge1xuICAgICAgdHJlZU5vZGVCYXNlOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5CQVNFX0NPTE9SLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLkJBU0VfQkFDS0dST1VORF9DT0xPUixcbiAgICAgICAgbGluZUhlaWdodDogdGhlbWUuVFJFRU5PREVfTElORV9IRUlHSFQsXG4gICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgbGlzdFN0eWxlOiAnbm9uZScsXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLlRSRUVOT0RFX0ZPTlRfRkFNSUxZLFxuICAgICAgICBmb250U2l6ZTogdGhlbWUuVFJFRU5PREVfRk9OVF9TSVpFXG4gICAgICB9LFxuICAgICAgdHJlZU5vZGVQcmV2aWV3Q29udGFpbmVyOiB7fSxcbiAgICAgIHRyZWVOb2RlUGxhY2Vob2xkZXI6IF9vYmplY3RTcHJlYWQoe1xuICAgICAgICB3aGl0ZVNwYWNlOiAncHJlJyxcbiAgICAgICAgZm9udFNpemU6IHRoZW1lLkFSUk9XX0ZPTlRfU0laRSxcbiAgICAgICAgbWFyZ2luUmlnaHQ6IHRoZW1lLkFSUk9XX01BUkdJTl9SSUdIVFxuICAgICAgfSwgdW5zZWxlY3RhYmxlKSxcbiAgICAgIHRyZWVOb2RlQXJyb3c6IHtcbiAgICAgICAgYmFzZTogX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICBjb2xvcjogdGhlbWUuQVJST1dfQ09MT1IsXG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgZm9udFNpemU6IHRoZW1lLkFSUk9XX0ZPTlRfU0laRSxcbiAgICAgICAgICBtYXJnaW5SaWdodDogdGhlbWUuQVJST1dfTUFSR0lOX1JJR0hUXG4gICAgICAgIH0sIHBhcnNlRmxvYXQodGhlbWUuQVJST1dfQU5JTUFUSU9OX0RVUkFUSU9OKSA+IDAgPyB7XG4gICAgICAgICAgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gXCIuY29uY2F0KHRoZW1lLkFSUk9XX0FOSU1BVElPTl9EVVJBVElPTiwgXCIgZWFzZSAwc1wiKVxuICAgICAgICB9IDoge30pLCB1bnNlbGVjdGFibGUpLFxuICAgICAgICBleHBhbmRlZDoge1xuICAgICAgICAgIFdlYmtpdFRyYW5zZm9ybTogJ3JvdGF0ZVooOTBkZWcpJyxcbiAgICAgICAgICBNb3pUcmFuc2Zvcm06ICdyb3RhdGVaKDkwZGVnKScsXG4gICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlWig5MGRlZyknXG4gICAgICAgIH0sXG4gICAgICAgIGNvbGxhcHNlZDoge1xuICAgICAgICAgIFdlYmtpdFRyYW5zZm9ybTogJ3JvdGF0ZVooMGRlZyknLFxuICAgICAgICAgIE1velRyYW5zZm9ybTogJ3JvdGF0ZVooMGRlZyknLFxuICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZVooMGRlZyknXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0cmVlTm9kZUNoaWxkTm9kZXNDb250YWluZXI6IHtcbiAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICBwYWRkaW5nTGVmdDogdGhlbWUuVFJFRU5PREVfUEFERElOR19MRUZUXG4gICAgICB9XG4gICAgfSxcbiAgICBUYWJsZUluc3BlY3Rvcjoge1xuICAgICAgYmFzZToge1xuICAgICAgICBjb2xvcjogdGhlbWUuQkFTRV9DT0xPUixcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgXCIuY29uY2F0KHRoZW1lLlRBQkxFX0JPUkRFUl9DT0xPUiksXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLkJBU0VfRk9OVF9GQU1JTFksXG4gICAgICAgIGZvbnRTaXplOiB0aGVtZS5CQVNFX0ZPTlRfU0laRSxcbiAgICAgICAgbGluZUhlaWdodDogJzEyMCUnLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCdcbiAgICAgIH1cbiAgICB9LFxuICAgIFRhYmxlSW5zcGVjdG9ySGVhZGVyQ29udGFpbmVyOiB7XG4gICAgICBiYXNlOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgaGVpZ2h0OiAnMTdweCcsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nXG4gICAgICB9LFxuICAgICAgdGFibGU6IHtcbiAgICAgICAgdGFibGVMYXlvdXQ6ICdmaXhlZCcsXG4gICAgICAgIGJvcmRlclNwYWNpbmc6IDAsXG4gICAgICAgIGJvcmRlckNvbGxhcHNlOiAnc2VwYXJhdGUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWFyZ2luOiAwXG4gICAgICB9XG4gICAgfSxcbiAgICBUYWJsZUluc3BlY3RvckRhdGFDb250YWluZXI6IHtcbiAgICAgIHRyOiB7XG4gICAgICAgIGRpc3BsYXk6ICd0YWJsZS1yb3cnXG4gICAgICB9LFxuICAgICAgdGQ6IHtcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICBoZWlnaHQ6ICcxNnB4JyxcbiAgICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICAgIHBhZGRpbmc6ICcxcHggNHB4JyxcbiAgICAgICAgV2Via2l0VXNlclNlbGVjdDogJ3RleHQnLFxuICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGxpbmVIZWlnaHQ6ICcxNHB4J1xuICAgICAgfSxcbiAgICAgIGRpdjoge1xuICAgICAgICBwb3NpdGlvbjogJ3N0YXRpYycsXG4gICAgICAgIHRvcDogJzE3cHgnLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIG92ZXJmbG93WTogJ292ZXJsYXknLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVaKDApJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIG92ZXJmbG93WDogJ2hpZGRlbidcbiAgICAgIH0sXG4gICAgICB0YWJsZToge1xuICAgICAgICBwb3NpdG9uOiAnc3RhdGljJyxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBib3JkZXJUb3A6ICcwIG5vbmUgdHJhbnNwYXJlbnQnLFxuICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogdGhlbWUuVEFCTEVfREFUQV9CQUNLR1JPVU5EX0lNQUdFLFxuICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogdGhlbWUuVEFCTEVfREFUQV9CQUNLR1JPVU5EX1NJWkUsXG4gICAgICAgIHRhYmxlTGF5b3V0OiAnZml4ZWQnLFxuICAgICAgICBib3JkZXJTcGFjaW5nOiAwLFxuICAgICAgICBib3JkZXJDb2xsYXBzZTogJ3NlcGFyYXRlJyxcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgZm9udFNpemU6IHRoZW1lLkJBU0VfRk9OVF9TSVpFLFxuICAgICAgICBsaW5lSGVpZ2h0OiAnMTIwJSdcbiAgICAgIH1cbiAgICB9LFxuICAgIFRhYmxlSW5zcGVjdG9yVEg6IHtcbiAgICAgIGJhc2U6IHtcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5UQUJMRV9USF9CQUNLR1JPVU5EX0NPTE9SLFxuICAgICAgICBib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkIFwiLmNvbmNhdCh0aGVtZS5UQUJMRV9CT1JERVJfQ09MT1IpLFxuICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgIHBhZGRpbmc6ICcwIDRweCcsXG4gICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgbGluZUhlaWdodDogJzE0cHgnLFxuICAgICAgICAnOmhvdmVyJzoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuVEFCTEVfVEhfSE9WRVJfQ09MT1JcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpdjoge1xuICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIGZvbnRTaXplOiB0aGVtZS5CQVNFX0ZPTlRfU0laRSxcbiAgICAgICAgbGluZUhlaWdodDogJzEyMCUnXG4gICAgICB9XG4gICAgfSxcbiAgICBUYWJsZUluc3BlY3RvckxlZnRCb3JkZXI6IHtcbiAgICAgIG5vbmU6IHtcbiAgICAgICAgYm9yZGVyTGVmdDogJ25vbmUnXG4gICAgICB9LFxuICAgICAgc29saWQ6IHtcbiAgICAgICAgYm9yZGVyTGVmdDogXCIxcHggc29saWQgXCIuY29uY2F0KHRoZW1lLlRBQkxFX0JPUkRFUl9DT0xPUilcbiAgICAgIH1cbiAgICB9LFxuICAgIFRhYmxlSW5zcGVjdG9yU29ydEljb246IF9vYmplY3RTcHJlYWQoe1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIG1hcmdpblJpZ2h0OiAzLFxuICAgICAgd2lkdGg6IDgsXG4gICAgICBoZWlnaHQ6IDcsXG4gICAgICBtYXJnaW5Ub3A6IC03LFxuICAgICAgY29sb3I6IHRoZW1lLlRBQkxFX1NPUlRfSUNPTl9DT0xPUixcbiAgICAgIGZvbnRTaXplOiAxMlxuICAgIH0sIHVuc2VsZWN0YWJsZSlcbiAgfTtcbn0pO1xuXG52YXIgREVGQVVMVF9USEVNRV9OQU1FID0gJ2Nocm9tZUxpZ2h0JztcbnZhciBUaGVtZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KGJhc2UodGhlbWVzW0RFRkFVTFRfVEhFTUVfTkFNRV0pKTtcbnZhciB1c2VTdHlsZXMgPSBmdW5jdGlvbiB1c2VTdHlsZXMoYmFzZVN0eWxlc0tleSkge1xuICB2YXIgdGhlbWVTdHlsZXMgPSB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG4gIHJldHVybiB0aGVtZVN0eWxlc1tiYXNlU3R5bGVzS2V5XTtcbn07XG52YXIgdGhlbWVBY2NlcHRvciA9IGZ1bmN0aW9uIHRoZW1lQWNjZXB0b3IoV3JhcHBlZENvbXBvbmVudCkge1xuICB2YXIgVGhlbWVBY2NlcHRvciA9IGZ1bmN0aW9uIFRoZW1lQWNjZXB0b3IoX3JlZikge1xuICAgIHZhciBfcmVmJHRoZW1lID0gX3JlZi50aGVtZSxcbiAgICAgICAgdGhlbWUgPSBfcmVmJHRoZW1lID09PSB2b2lkIDAgPyBERUZBVUxUX1RIRU1FX05BTUUgOiBfcmVmJHRoZW1lLFxuICAgICAgICByZXN0UHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbXCJ0aGVtZVwiXSk7XG4gICAgdmFyIHRoZW1lU3R5bGVzID0gdXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGVtZSkpIHtcbiAgICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgICByZXR1cm4gYmFzZSh0aGVtZXNbdGhlbWVdKTtcbiAgICAgICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzpcbiAgICAgICAgICByZXR1cm4gYmFzZSh0aGVtZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGJhc2UodGhlbWVzW0RFRkFVTFRfVEhFTUVfTkFNRV0pO1xuICAgICAgfVxuICAgIH0sIFt0aGVtZV0pO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRoZW1lQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IHRoZW1lU3R5bGVzXG4gICAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCByZXN0UHJvcHMpKTtcbiAgfTtcbiAgVGhlbWVBY2NlcHRvci5wcm9wVHlwZXMgPSB7XG4gICAgdGhlbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5vYmplY3RdKVxuICB9O1xuICByZXR1cm4gVGhlbWVBY2NlcHRvcjtcbn07XG5cbmZ1bmN0aW9uIG93bktleXMkMShvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkMSh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDEoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDEoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgQXJyb3cgPSBmdW5jdGlvbiBBcnJvdyhfcmVmKSB7XG4gIHZhciBleHBhbmRlZCA9IF9yZWYuZXhwYW5kZWQsXG4gICAgICBzdHlsZXMgPSBfcmVmLnN0eWxlcztcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICBzdHlsZTogX29iamVjdFNwcmVhZCQxKF9vYmplY3RTcHJlYWQkMSh7fSwgc3R5bGVzLmJhc2UpLCBleHBhbmRlZCA/IHN0eWxlcy5leHBhbmRlZCA6IHN0eWxlcy5jb2xsYXBzZWQpXG4gIH0sIFwiXFx1MjVCNlwiKTtcbn07XG52YXIgVHJlZU5vZGUgPSBtZW1vKGZ1bmN0aW9uIChwcm9wcykge1xuICBwcm9wcyA9IF9vYmplY3RTcHJlYWQkMSh7XG4gICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgbm9kZVJlbmRlcmVyOiBmdW5jdGlvbiBub2RlUmVuZGVyZXIoX3JlZjIpIHtcbiAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBuYW1lKTtcbiAgICB9LFxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7fSxcbiAgICBzaG91bGRTaG93QXJyb3c6IGZhbHNlLFxuICAgIHNob3VsZFNob3dQbGFjZWhvbGRlcjogdHJ1ZVxuICB9LCBwcm9wcyk7XG4gIHZhciBfcHJvcHMgPSBwcm9wcyxcbiAgICAgIGV4cGFuZGVkID0gX3Byb3BzLmV4cGFuZGVkLFxuICAgICAgb25DbGljayA9IF9wcm9wcy5vbkNsaWNrLFxuICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICBub2RlUmVuZGVyZXIgPSBfcHJvcHMubm9kZVJlbmRlcmVyLFxuICAgICAgdGl0bGUgPSBfcHJvcHMudGl0bGUsXG4gICAgICBzaG91bGRTaG93QXJyb3cgPSBfcHJvcHMuc2hvdWxkU2hvd0Fycm93LFxuICAgICAgc2hvdWxkU2hvd1BsYWNlaG9sZGVyID0gX3Byb3BzLnNob3VsZFNob3dQbGFjZWhvbGRlcjtcbiAgdmFyIHN0eWxlcyA9IHVzZVN0eWxlcygnVHJlZU5vZGUnKTtcbiAgdmFyIE5vZGVSZW5kZXJlciA9IG5vZGVSZW5kZXJlcjtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XG4gICAgXCJhcmlhLWV4cGFuZGVkXCI6IGV4cGFuZGVkLFxuICAgIHJvbGU6IFwidHJlZWl0ZW1cIixcbiAgICBzdHlsZTogc3R5bGVzLnRyZWVOb2RlQmFzZSxcbiAgICB0aXRsZTogdGl0bGVcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgc3R5bGU6IHN0eWxlcy50cmVlTm9kZVByZXZpZXdDb250YWluZXIsXG4gICAgb25DbGljazogb25DbGlja1xuICB9LCBzaG91bGRTaG93QXJyb3cgfHwgQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXJyb3csIHtcbiAgICBleHBhbmRlZDogZXhwYW5kZWQsXG4gICAgc3R5bGVzOiBzdHlsZXMudHJlZU5vZGVBcnJvd1xuICB9KSA6IHNob3VsZFNob3dQbGFjZWhvbGRlciAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgc3R5bGU6IHN0eWxlcy50cmVlTm9kZVBsYWNlaG9sZGVyXG4gIH0sIFwiXFx4QTBcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTm9kZVJlbmRlcmVyLCBwcm9wcykpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwib2xcIiwge1xuICAgIHJvbGU6IFwiZ3JvdXBcIixcbiAgICBzdHlsZTogc3R5bGVzLnRyZWVOb2RlQ2hpbGROb2Rlc0NvbnRhaW5lclxuICB9LCBleHBhbmRlZCA/IGNoaWxkcmVuIDogdW5kZWZpbmVkKSk7XG59KTtcblRyZWVOb2RlLnByb3BUeXBlcyA9IHtcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGF0YTogUHJvcFR5cGVzLmFueSxcbiAgZXhwYW5kZWQ6IFByb3BUeXBlcy5ib29sLFxuICBzaG91bGRTaG93QXJyb3c6IFByb3BUeXBlcy5ib29sLFxuICBzaG91bGRTaG93UGxhY2Vob2xkZXI6IFByb3BUeXBlcy5ib29sLFxuICBub2RlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuZnVuY3Rpb24gb3duS2V5cyQyKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSk7IGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCQyKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgaWYgKGkgJSAyKSB7IG93bktleXMkMihPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMkMihPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5JDEobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdC5yZXR1cm4gIT0gbnVsbCkgaXQucmV0dXJuKCk7IH0gZmluYWxseSB7IGlmIChkaWRFcnIpIHRocm93IGVycjsgfSB9IH07IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSQxKG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkkMShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5JDEobywgbWluTGVuKTsgfVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkkMShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cbnZhciBERUZBVUxUX1JPT1RfUEFUSCA9ICckJztcbnZhciBXSUxEQ0FSRCA9ICcqJztcbmZ1bmN0aW9uIGhhc0NoaWxkTm9kZXMoZGF0YSwgZGF0YUl0ZXJhdG9yKSB7XG4gIHJldHVybiAhZGF0YUl0ZXJhdG9yKGRhdGEpLm5leHQoKS5kb25lO1xufVxudmFyIHdpbGRjYXJkUGF0aHNGcm9tTGV2ZWwgPSBmdW5jdGlvbiB3aWxkY2FyZFBhdGhzRnJvbUxldmVsKGxldmVsKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHtcbiAgICBsZW5ndGg6IGxldmVsXG4gIH0sIGZ1bmN0aW9uIChfLCBpKSB7XG4gICAgcmV0dXJuIFtERUZBVUxUX1JPT1RfUEFUSF0uY29uY2F0KEFycmF5LmZyb20oe1xuICAgICAgbGVuZ3RoOiBpXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICcqJztcbiAgICB9KSkuam9pbignLicpO1xuICB9KTtcbn07XG52YXIgZ2V0RXhwYW5kZWRQYXRocyA9IGZ1bmN0aW9uIGdldEV4cGFuZGVkUGF0aHMoZGF0YSwgZGF0YUl0ZXJhdG9yLCBleHBhbmRQYXRocywgZXhwYW5kTGV2ZWwsIHByZXZFeHBhbmRlZFBhdGhzKSB7XG4gIHZhciB3aWxkY2FyZFBhdGhzID0gW10uY29uY2F0KHdpbGRjYXJkUGF0aHNGcm9tTGV2ZWwoZXhwYW5kTGV2ZWwpKS5jb25jYXQoZXhwYW5kUGF0aHMpLmZpbHRlcihmdW5jdGlvbiAocGF0aCkge1xuICAgIHJldHVybiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZyc7XG4gIH0pO1xuICB2YXIgZXhwYW5kZWRQYXRocyA9IFtdO1xuICB3aWxkY2FyZFBhdGhzLmZvckVhY2goZnVuY3Rpb24gKHdpbGRjYXJkUGF0aCkge1xuICAgIHZhciBrZXlQYXRocyA9IHdpbGRjYXJkUGF0aC5zcGxpdCgnLicpO1xuICAgIHZhciBwb3B1bGF0ZVBhdGhzID0gZnVuY3Rpb24gcG9wdWxhdGVQYXRocyhjdXJEYXRhLCBjdXJQYXRoLCBkZXB0aCkge1xuICAgICAgaWYgKGRlcHRoID09PSBrZXlQYXRocy5sZW5ndGgpIHtcbiAgICAgICAgZXhwYW5kZWRQYXRocy5wdXNoKGN1clBhdGgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIga2V5ID0ga2V5UGF0aHNbZGVwdGhdO1xuICAgICAgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgICAgIGlmIChoYXNDaGlsZE5vZGVzKGN1ckRhdGEsIGRhdGFJdGVyYXRvcikgJiYgKGtleSA9PT0gREVGQVVMVF9ST09UX1BBVEggfHwga2V5ID09PSBXSUxEQ0FSRCkpIHtcbiAgICAgICAgICBwb3B1bGF0ZVBhdGhzKGN1ckRhdGEsIERFRkFVTFRfUk9PVF9QQVRILCBkZXB0aCArIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoa2V5ID09PSBXSUxEQ0FSRCkge1xuICAgICAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihkYXRhSXRlcmF0b3IoY3VyRGF0YSkpLFxuICAgICAgICAgICAgICBfc3RlcDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIF9zdGVwJHZhbHVlID0gX3N0ZXAudmFsdWUsXG4gICAgICAgICAgICAgICAgICBuYW1lID0gX3N0ZXAkdmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICAgIF9kYXRhID0gX3N0ZXAkdmFsdWUuZGF0YTtcbiAgICAgICAgICAgICAgaWYgKGhhc0NoaWxkTm9kZXMoX2RhdGEsIGRhdGFJdGVyYXRvcikpIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVBhdGhzKF9kYXRhLCBcIlwiLmNvbmNhdChjdXJQYXRoLCBcIi5cIikuY29uY2F0KG5hbWUpLCBkZXB0aCArIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IuZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBjdXJEYXRhW2tleV07XG4gICAgICAgICAgaWYgKGhhc0NoaWxkTm9kZXModmFsdWUsIGRhdGFJdGVyYXRvcikpIHtcbiAgICAgICAgICAgIHBvcHVsYXRlUGF0aHModmFsdWUsIFwiXCIuY29uY2F0KGN1clBhdGgsIFwiLlwiKS5jb25jYXQoa2V5KSwgZGVwdGggKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHBvcHVsYXRlUGF0aHMoZGF0YSwgJycsIDApO1xuICB9KTtcbiAgcmV0dXJuIGV4cGFuZGVkUGF0aHMucmVkdWNlKGZ1bmN0aW9uIChvYmosIHBhdGgpIHtcbiAgICBvYmpbcGF0aF0gPSB0cnVlO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIF9vYmplY3RTcHJlYWQkMih7fSwgcHJldkV4cGFuZGVkUGF0aHMpKTtcbn07XG5cbmZ1bmN0aW9uIG93bktleXMkMyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkMyh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgQ29ubmVjdGVkVHJlZU5vZGUgPSBtZW1vKGZ1bmN0aW9uIChwcm9wcykge1xuICB2YXIgZGF0YSA9IHByb3BzLmRhdGEsXG4gICAgICBkYXRhSXRlcmF0b3IgPSBwcm9wcy5kYXRhSXRlcmF0b3IsXG4gICAgICBwYXRoID0gcHJvcHMucGF0aCxcbiAgICAgIGRlcHRoID0gcHJvcHMuZGVwdGgsXG4gICAgICBub2RlUmVuZGVyZXIgPSBwcm9wcy5ub2RlUmVuZGVyZXI7XG4gIHZhciBfdXNlQ29udGV4dCA9IHVzZUNvbnRleHQoRXhwYW5kZWRQYXRoc0NvbnRleHQpLFxuICAgICAgX3VzZUNvbnRleHQyID0gc2xpY2VkVG9BcnJheShfdXNlQ29udGV4dCwgMiksXG4gICAgICBleHBhbmRlZFBhdGhzID0gX3VzZUNvbnRleHQyWzBdLFxuICAgICAgc2V0RXhwYW5kZWRQYXRocyA9IF91c2VDb250ZXh0MlsxXTtcbiAgdmFyIG5vZGVIYXNDaGlsZE5vZGVzID0gaGFzQ2hpbGROb2RlcyhkYXRhLCBkYXRhSXRlcmF0b3IpO1xuICB2YXIgZXhwYW5kZWQgPSAhIWV4cGFuZGVkUGF0aHNbcGF0aF07XG4gIHZhciBoYW5kbGVDbGljayA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbm9kZUhhc0NoaWxkTm9kZXMgJiYgc2V0RXhwYW5kZWRQYXRocyhmdW5jdGlvbiAocHJldkV4cGFuZGVkUGF0aHMpIHtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkJDMoX29iamVjdFNwcmVhZCQzKHt9LCBwcmV2RXhwYW5kZWRQYXRocyksIHt9LCBkZWZpbmVQcm9wZXJ0eSh7fSwgcGF0aCwgIWV4cGFuZGVkKSk7XG4gICAgfSk7XG4gIH0sIFtub2RlSGFzQ2hpbGROb2Rlcywgc2V0RXhwYW5kZWRQYXRocywgcGF0aCwgZXhwYW5kZWRdKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJlZU5vZGUsIF9leHRlbmRzXzEoe1xuICAgIGV4cGFuZGVkOiBleHBhbmRlZCxcbiAgICBvbkNsaWNrOiBoYW5kbGVDbGlja1xuICAgICxcbiAgICBzaG91bGRTaG93QXJyb3c6IG5vZGVIYXNDaGlsZE5vZGVzXG4gICAgLFxuICAgIHNob3VsZFNob3dQbGFjZWhvbGRlcjogZGVwdGggPiAwXG4gICAgLFxuICAgIG5vZGVSZW5kZXJlcjogbm9kZVJlbmRlcmVyXG4gIH0sIHByb3BzKSxcbiAgZXhwYW5kZWQgPyB0b0NvbnN1bWFibGVBcnJheShkYXRhSXRlcmF0b3IoZGF0YSkpLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICBkYXRhID0gX3JlZi5kYXRhLFxuICAgICAgICByZW5kZXJOb2RlUHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbXCJuYW1lXCIsIFwiZGF0YVwiXSk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29ubmVjdGVkVHJlZU5vZGUsIF9leHRlbmRzXzEoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBkZXB0aDogZGVwdGggKyAxLFxuICAgICAgcGF0aDogXCJcIi5jb25jYXQocGF0aCwgXCIuXCIpLmNvbmNhdChuYW1lKSxcbiAgICAgIGtleTogbmFtZSxcbiAgICAgIGRhdGFJdGVyYXRvcjogZGF0YUl0ZXJhdG9yLFxuICAgICAgbm9kZVJlbmRlcmVyOiBub2RlUmVuZGVyZXJcbiAgICB9LCByZW5kZXJOb2RlUHJvcHMpKTtcbiAgfSkgOiBudWxsKTtcbn0pO1xuQ29ubmVjdGVkVHJlZU5vZGUucHJvcFR5cGVzID0ge1xuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhOiBQcm9wVHlwZXMuYW55LFxuICBkYXRhSXRlcmF0b3I6IFByb3BUeXBlcy5mdW5jLFxuICBkZXB0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgZXhwYW5kZWQ6IFByb3BUeXBlcy5ib29sLFxuICBub2RlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jXG59O1xudmFyIFRyZWVWaWV3ID0gbWVtbyhmdW5jdGlvbiAoX3JlZjIpIHtcbiAgdmFyIG5hbWUgPSBfcmVmMi5uYW1lLFxuICAgICAgZGF0YSA9IF9yZWYyLmRhdGEsXG4gICAgICBkYXRhSXRlcmF0b3IgPSBfcmVmMi5kYXRhSXRlcmF0b3IsXG4gICAgICBub2RlUmVuZGVyZXIgPSBfcmVmMi5ub2RlUmVuZGVyZXIsXG4gICAgICBleHBhbmRQYXRocyA9IF9yZWYyLmV4cGFuZFBhdGhzLFxuICAgICAgZXhwYW5kTGV2ZWwgPSBfcmVmMi5leHBhbmRMZXZlbDtcbiAgdmFyIHN0eWxlcyA9IHVzZVN0eWxlcygnVHJlZVZpZXcnKTtcbiAgdmFyIHN0YXRlQW5kU2V0dGVyID0gdXNlU3RhdGUoe30pO1xuICB2YXIgX3N0YXRlQW5kU2V0dGVyID0gc2xpY2VkVG9BcnJheShzdGF0ZUFuZFNldHRlciwgMiksXG4gICAgICBzZXRFeHBhbmRlZFBhdGhzID0gX3N0YXRlQW5kU2V0dGVyWzFdO1xuICB1c2VMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZXRFeHBhbmRlZFBhdGhzKGZ1bmN0aW9uIChwcmV2RXhwYW5kZWRQYXRocykge1xuICAgICAgcmV0dXJuIGdldEV4cGFuZGVkUGF0aHMoZGF0YSwgZGF0YUl0ZXJhdG9yLCBleHBhbmRQYXRocywgZXhwYW5kTGV2ZWwsIHByZXZFeHBhbmRlZFBhdGhzKTtcbiAgICB9KTtcbiAgfSwgW2RhdGEsIGRhdGFJdGVyYXRvciwgZXhwYW5kUGF0aHMsIGV4cGFuZExldmVsXSk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEV4cGFuZGVkUGF0aHNDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHN0YXRlQW5kU2V0dGVyXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvbFwiLCB7XG4gICAgcm9sZTogXCJ0cmVlXCIsXG4gICAgc3R5bGU6IHN0eWxlcy50cmVlVmlld091dGxpbmVcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChDb25uZWN0ZWRUcmVlTm9kZSwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBkYXRhSXRlcmF0b3I6IGRhdGFJdGVyYXRvcixcbiAgICBkZXB0aDogMCxcbiAgICBwYXRoOiBERUZBVUxUX1JPT1RfUEFUSCxcbiAgICBub2RlUmVuZGVyZXI6IG5vZGVSZW5kZXJlclxuICB9KSkpO1xufSk7XG5UcmVlVmlldy5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFByb3BUeXBlcy5hbnksXG4gIGRhdGFJdGVyYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG4gIG5vZGVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gIGV4cGFuZFBhdGhzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuYXJyYXldKSxcbiAgZXhwYW5kTGV2ZWw6IFByb3BUeXBlcy5udW1iZXJcbn07XG5cbmZ1bmN0aW9uIG93bktleXMkNChvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkNCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDQoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDQoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgT2JqZWN0TmFtZSA9IGZ1bmN0aW9uIE9iamVjdE5hbWUoX3JlZikge1xuICB2YXIgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIF9yZWYkZGltbWVkID0gX3JlZi5kaW1tZWQsXG4gICAgICBkaW1tZWQgPSBfcmVmJGRpbW1lZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGRpbW1lZCxcbiAgICAgIF9yZWYkc3R5bGVzID0gX3JlZi5zdHlsZXMsXG4gICAgICBzdHlsZXMgPSBfcmVmJHN0eWxlcyA9PT0gdm9pZCAwID8ge30gOiBfcmVmJHN0eWxlcztcbiAgdmFyIHRoZW1lU3R5bGVzID0gdXNlU3R5bGVzKCdPYmplY3ROYW1lJyk7XG4gIHZhciBhcHBsaWVkU3R5bGVzID0gX29iamVjdFNwcmVhZCQ0KF9vYmplY3RTcHJlYWQkNChfb2JqZWN0U3ByZWFkJDQoe30sIHRoZW1lU3R5bGVzLmJhc2UpLCBkaW1tZWQgPyB0aGVtZVN0eWxlc1snZGltbWVkJ10gOiB7fSksIHN0eWxlcyk7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgc3R5bGU6IGFwcGxpZWRTdHlsZXNcbiAgfSwgbmFtZSk7XG59O1xuT2JqZWN0TmFtZS5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRpbW1lZDogUHJvcFR5cGVzLmJvb2xcbn07XG5cbmZ1bmN0aW9uIG93bktleXMkNShvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkNSh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDUoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDUoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgT2JqZWN0VmFsdWUgPSBmdW5jdGlvbiBPYmplY3RWYWx1ZShfcmVmKSB7XG4gIHZhciBvYmplY3QgPSBfcmVmLm9iamVjdCxcbiAgICAgIHN0eWxlcyA9IF9yZWYuc3R5bGVzO1xuICB2YXIgdGhlbWVTdHlsZXMgPSB1c2VTdHlsZXMoJ09iamVjdFZhbHVlJyk7XG4gIHZhciBta1N0eWxlID0gZnVuY3Rpb24gbWtTdHlsZShrZXkpIHtcbiAgICByZXR1cm4gX29iamVjdFNwcmVhZCQ1KF9vYmplY3RTcHJlYWQkNSh7fSwgdGhlbWVTdHlsZXNba2V5XSksIHN0eWxlcyk7XG4gIH07XG4gIHN3aXRjaCAoX3R5cGVvZl8xKG9iamVjdCkpIHtcbiAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlTnVtYmVyJylcbiAgICAgIH0sIFN0cmluZyhvYmplY3QpLCBcIm5cIik7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgIHN0eWxlOiBta1N0eWxlKCdvYmplY3RWYWx1ZU51bWJlcicpXG4gICAgICB9LCBTdHJpbmcob2JqZWN0KSk7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgIHN0eWxlOiBta1N0eWxlKCdvYmplY3RWYWx1ZVN0cmluZycpXG4gICAgICB9LCBcIlxcXCJcIiwgb2JqZWN0LCBcIlxcXCJcIik7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgICBzdHlsZTogbWtTdHlsZSgnb2JqZWN0VmFsdWVCb29sZWFuJylcbiAgICAgIH0sIFN0cmluZyhvYmplY3QpKTtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlVW5kZWZpbmVkJylcbiAgICAgIH0sIFwidW5kZWZpbmVkXCIpO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAob2JqZWN0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlTnVsbCcpXG4gICAgICAgIH0sIFwibnVsbFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBvYmplY3QudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlUmVnRXhwJylcbiAgICAgICAgfSwgb2JqZWN0LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJBcnJheShcIi5jb25jYXQob2JqZWN0Lmxlbmd0aCwgXCIpXCIpKTtcbiAgICAgIH1cbiAgICAgIGlmICghb2JqZWN0LmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIk9iamVjdFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iamVjdC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkJ1ZmZlcltcIi5jb25jYXQob2JqZWN0Lmxlbmd0aCwgXCJdXCIpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBvYmplY3QuY29uc3RydWN0b3IubmFtZSk7XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlRnVuY3Rpb25QcmVmaXgnKVxuICAgICAgfSwgXCJcXHUwMTkyXFx4QTBcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlRnVuY3Rpb25OYW1lJylcbiAgICAgIH0sIG9iamVjdC5uYW1lLCBcIigpXCIpKTtcbiAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgc3R5bGU6IG1rU3R5bGUoJ29iamVjdFZhbHVlU3ltYm9sJylcbiAgICAgIH0sIG9iamVjdC50b1N0cmluZygpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwpO1xuICB9XG59O1xuT2JqZWN0VmFsdWUucHJvcFR5cGVzID0ge1xuICBvYmplY3Q6IFByb3BUeXBlcy5hbnlcbn07XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eVZhbHVlKG9iamVjdCwgcHJvcGVydHlOYW1lKSB7XG4gIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHlOYW1lKTtcbiAgaWYgKHByb3BlcnR5RGVzY3JpcHRvci5nZXQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHByb3BlcnR5RGVzY3JpcHRvci5nZXQoKTtcbiAgICB9IGNhdGNoIChfdW51c2VkKSB7XG4gICAgICByZXR1cm4gcHJvcGVydHlEZXNjcmlwdG9yLmdldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdFtwcm9wZXJ0eU5hbWVdO1xufVxuXG5mdW5jdGlvbiBpbnRlcnNwZXJzZShhcnIsIHNlcCkge1xuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gYXJyLnNsaWNlKDEpLnJlZHVjZShmdW5jdGlvbiAoeHMsIHgpIHtcbiAgICByZXR1cm4geHMuY29uY2F0KFtzZXAsIHhdKTtcbiAgfSwgW2FyclswXV0pO1xufVxudmFyIE9iamVjdFByZXZpZXcgPSBmdW5jdGlvbiBPYmplY3RQcmV2aWV3KF9yZWYpIHtcbiAgdmFyIGRhdGEgPSBfcmVmLmRhdGE7XG4gIHZhciBzdHlsZXMgPSB1c2VTdHlsZXMoJ09iamVjdFByZXZpZXcnKTtcbiAgdmFyIG9iamVjdCA9IGRhdGE7XG4gIGlmIChfdHlwZW9mXzEob2JqZWN0KSAhPT0gJ29iamVjdCcgfHwgb2JqZWN0ID09PSBudWxsIHx8IG9iamVjdCBpbnN0YW5jZW9mIERhdGUgfHwgb2JqZWN0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0VmFsdWUsIHtcbiAgICAgIG9iamVjdDogb2JqZWN0XG4gICAgfSk7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgIHZhciBtYXhQcm9wZXJ0aWVzID0gc3R5bGVzLmFycmF5TWF4UHJvcGVydGllcztcbiAgICB2YXIgcHJldmlld0FycmF5ID0gb2JqZWN0LnNsaWNlKDAsIG1heFByb3BlcnRpZXMpLm1hcChmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdFZhbHVlLCB7XG4gICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgIG9iamVjdDogZWxlbWVudFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKG9iamVjdC5sZW5ndGggPiBtYXhQcm9wZXJ0aWVzKSB7XG4gICAgICBwcmV2aWV3QXJyYXkucHVzaCggUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgICBrZXk6IFwiZWxsaXBzaXNcIlxuICAgICAgfSwgXCJcXHUyMDI2XCIpKTtcbiAgICB9XG4gICAgdmFyIGFycmF5TGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgc3R5bGU6IHN0eWxlcy5vYmplY3REZXNjcmlwdGlvblxuICAgIH0sIGFycmF5TGVuZ3RoID09PSAwID8gXCJcIiA6IFwiKFwiLmNvbmNhdChhcnJheUxlbmd0aCwgXCIpXFx4QTBcIikpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICBzdHlsZTogc3R5bGVzLnByZXZpZXdcbiAgICB9LCBcIltcIiwgaW50ZXJzcGVyc2UocHJldmlld0FycmF5LCAnLCAnKSwgXCJdXCIpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgX21heFByb3BlcnRpZXMgPSBzdHlsZXMub2JqZWN0TWF4UHJvcGVydGllcztcbiAgICB2YXIgcHJvcGVydHlOb2RlcyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBvYmplY3QpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHlOYW1lKSkge1xuICAgICAgICB2YXIgZWxsaXBzaXMgPSB2b2lkIDA7XG4gICAgICAgIGlmIChwcm9wZXJ0eU5vZGVzLmxlbmd0aCA9PT0gX21heFByb3BlcnRpZXMgLSAxICYmIE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID4gX21heFByb3BlcnRpZXMpIHtcbiAgICAgICAgICBlbGxpcHNpcyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgIGtleTogJ2VsbGlwc2lzJ1xuICAgICAgICAgIH0sIFwiXFx1MjAyNlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZSA9IGdldFByb3BlcnR5VmFsdWUob2JqZWN0LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBwcm9wZXJ0eU5vZGVzLnB1c2goIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgICBrZXk6IHByb3BlcnR5TmFtZVxuICAgICAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdE5hbWUsIHtcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eU5hbWUgfHwgXCJcXFwiXFxcIlwiXG4gICAgICAgIH0pLCBcIjpcXHhBMFwiLCBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdFZhbHVlLCB7XG4gICAgICAgICAgb2JqZWN0OiBwcm9wZXJ0eVZhbHVlXG4gICAgICAgIH0pLCBlbGxpcHNpcykpO1xuICAgICAgICBpZiAoZWxsaXBzaXMpIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgb2JqZWN0Q29uc3RydWN0b3JOYW1lID0gb2JqZWN0LmNvbnN0cnVjdG9yID8gb2JqZWN0LmNvbnN0cnVjdG9yLm5hbWUgOiAnT2JqZWN0JztcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgc3R5bGU6IHN0eWxlcy5vYmplY3REZXNjcmlwdGlvblxuICAgIH0sIG9iamVjdENvbnN0cnVjdG9yTmFtZSA9PT0gJ09iamVjdCcgPyAnJyA6IFwiXCIuY29uY2F0KG9iamVjdENvbnN0cnVjdG9yTmFtZSwgXCIgXCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgc3R5bGU6IHN0eWxlcy5wcmV2aWV3XG4gICAgfSwgJ3snLCBpbnRlcnNwZXJzZShwcm9wZXJ0eU5vZGVzLCAnLCAnKSwgJ30nKSk7XG4gIH1cbn07XG5cbnZhciBPYmplY3RSb290TGFiZWwgPSBmdW5jdGlvbiBPYmplY3RSb290TGFiZWwoX3JlZikge1xuICB2YXIgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIGRhdGEgPSBfcmVmLmRhdGE7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3ROYW1lLCB7XG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiOiBcIiksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0UHJldmlldywge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RQcmV2aWV3LCB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gIH1cbn07XG5cbnZhciBPYmplY3RMYWJlbCA9IGZ1bmN0aW9uIE9iamVjdExhYmVsKF9yZWYpIHtcbiAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBkYXRhID0gX3JlZi5kYXRhLFxuICAgICAgX3JlZiRpc05vbmVudW1lcmFibGUgPSBfcmVmLmlzTm9uZW51bWVyYWJsZSxcbiAgICAgIGlzTm9uZW51bWVyYWJsZSA9IF9yZWYkaXNOb25lbnVtZXJhYmxlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkaXNOb25lbnVtZXJhYmxlO1xuICB2YXIgb2JqZWN0ID0gZGF0YTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0TmFtZSwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZGltbWVkOiBpc05vbmVudW1lcmFibGVcbiAgfSkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdFByZXZpZXcsIHtcbiAgICBkYXRhOiBuYW1lXG4gIH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIjogXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdFZhbHVlLCB7XG4gICAgb2JqZWN0OiBvYmplY3RcbiAgfSkpO1xufTtcbk9iamVjdExhYmVsLnByb3BUeXBlcyA9IHtcbiAgaXNOb25lbnVtZXJhYmxlOiBQcm9wVHlwZXMuYm9vbFxufTtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIkMShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSQyKG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXQucmV0dXJuICE9IG51bGwpIGl0LnJldHVybigpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkkMihvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5JDIobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheSQyKG8sIG1pbkxlbik7IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5JDIoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG52YXIgY3JlYXRlSXRlcmF0b3IgPSBmdW5jdGlvbiBjcmVhdGVJdGVyYXRvcihzaG93Tm9uZW51bWVyYWJsZSwgc29ydE9iamVjdEtleXMpIHtcbiAgdmFyIG9iamVjdEl0ZXJhdG9yID0gcmVnZW5lcmF0b3IubWFyayhmdW5jdGlvbiBvYmplY3RJdGVyYXRvcihkYXRhKSB7XG4gICAgdmFyIHNob3VsZEl0ZXJhdGUsIGRhdGFJc0FycmF5LCBpLCBfaXRlcmF0b3IsIF9zdGVwLCBlbnRyeSwgX2VudHJ5LCBrLCB2LCBrZXlzLCBfaXRlcmF0b3IyLCBfc3RlcDIsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSwgX3Byb3BlcnR5VmFsdWU7XG4gICAgcmV0dXJuIHJlZ2VuZXJhdG9yLndyYXAoZnVuY3Rpb24gb2JqZWN0SXRlcmF0b3IkKF9jb250ZXh0KSB7XG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgc2hvdWxkSXRlcmF0ZSA9IF90eXBlb2ZfMShkYXRhKSA9PT0gJ29iamVjdCcgJiYgZGF0YSAhPT0gbnVsbCB8fCB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgIGlmIChzaG91bGRJdGVyYXRlKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIik7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZGF0YUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGRhdGEpO1xuICAgICAgICAgICAgaWYgKCEoIWRhdGFJc0FycmF5ICYmIGRhdGFbU3ltYm9sLml0ZXJhdG9yXSkpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDMyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIkMShkYXRhKTtcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSA3O1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnMoKTtcbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBpZiAoKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZSkge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW50cnkgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmICghKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5Lmxlbmd0aCA9PT0gMikpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE3O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9lbnRyeSA9IHNsaWNlZFRvQXJyYXkoZW50cnksIDIpLCBrID0gX2VudHJ5WzBdLCB2ID0gX2VudHJ5WzFdO1xuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE1O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbmFtZTogayxcbiAgICAgICAgICAgICAgZGF0YTogdlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxNzpcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAxOTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG5hbWU6IGkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgZGF0YTogZW50cnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgY2FzZSAxOTpcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICBjYXNlIDIwOlxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDIyOlxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI3O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyNDpcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAyNDtcbiAgICAgICAgICAgIF9jb250ZXh0LnQwID0gX2NvbnRleHRbXCJjYXRjaFwiXSg3KTtcbiAgICAgICAgICAgIF9pdGVyYXRvci5lKF9jb250ZXh0LnQwKTtcbiAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDI3O1xuICAgICAgICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5maW5pc2goMjcpO1xuICAgICAgICAgIGNhc2UgMzA6XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpO1xuICAgICAgICAgICAgaWYgKHNvcnRPYmplY3RLZXlzID09PSB0cnVlICYmICFkYXRhSXNBcnJheSkge1xuICAgICAgICAgICAgICBrZXlzLnNvcnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNvcnRPYmplY3RLZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGtleXMuc29ydChzb3J0T2JqZWN0S2V5cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIkMShrZXlzKTtcbiAgICAgICAgICAgIF9jb250ZXh0LnByZXYgPSAzNTtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucygpO1xuICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBpZiAoKF9zdGVwMiA9IF9pdGVyYXRvcjIubigpKS5kb25lKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1MztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoZGF0YSwgcHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcGVydHlWYWx1ZSA9IGdldFByb3BlcnR5VmFsdWUoZGF0YSwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0MztcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG5hbWU6IHByb3BlcnR5TmFtZSB8fCBcIlxcXCJcXFwiXCIsXG4gICAgICAgICAgICAgIGRhdGE6IHByb3BlcnR5VmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgY2FzZSA0MzpcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1MTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICBpZiAoIXNob3dOb25lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1MTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfcHJvcGVydHlWYWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIF9wcm9wZXJ0eVZhbHVlID0gZ2V0UHJvcGVydHlWYWx1ZShkYXRhLCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoX3Byb3BlcnR5VmFsdWUgIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDUxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1MTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgICAgICAgICAgZGF0YTogX3Byb3BlcnR5VmFsdWUsXG4gICAgICAgICAgICAgIGlzTm9uZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICBjYXNlIDUxOlxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM3O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1MzpcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1ODtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNTU6XG4gICAgICAgICAgICBfY29udGV4dC5wcmV2ID0gNTU7XG4gICAgICAgICAgICBfY29udGV4dC50MSA9IF9jb250ZXh0W1wiY2F0Y2hcIl0oMzUpO1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5lKF9jb250ZXh0LnQxKTtcbiAgICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgX2NvbnRleHQucHJldiA9IDU4O1xuICAgICAgICAgICAgX2l0ZXJhdG9yMi5mKCk7XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuZmluaXNoKDU4KTtcbiAgICAgICAgICBjYXNlIDYxOlxuICAgICAgICAgICAgaWYgKCEoc2hvd05vbmVudW1lcmFibGUgJiYgZGF0YSAhPT0gT2JqZWN0LnByb3RvdHlwZVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gNjQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDY0O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbmFtZTogJ19fcHJvdG9fXycsXG4gICAgICAgICAgICAgIGRhdGE6IE9iamVjdC5nZXRQcm90b3R5cGVPZihkYXRhKSxcbiAgICAgICAgICAgICAgaXNOb25lbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9iamVjdEl0ZXJhdG9yLCBudWxsLCBbWzcsIDI0LCAyNywgMzBdLCBbMzUsIDU1LCA1OCwgNjFdXSk7XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0SXRlcmF0b3I7XG59O1xudmFyIGRlZmF1bHROb2RlUmVuZGVyZXIgPSBmdW5jdGlvbiBkZWZhdWx0Tm9kZVJlbmRlcmVyKF9yZWYpIHtcbiAgdmFyIGRlcHRoID0gX3JlZi5kZXB0aCxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBkYXRhID0gX3JlZi5kYXRhLFxuICAgICAgaXNOb25lbnVtZXJhYmxlID0gX3JlZi5pc05vbmVudW1lcmFibGU7XG4gIHJldHVybiBkZXB0aCA9PT0gMCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoT2JqZWN0Um9vdExhYmVsLCB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBkYXRhOiBkYXRhXG4gIH0pIDogUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RMYWJlbCwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBpc05vbmVudW1lcmFibGU6IGlzTm9uZW51bWVyYWJsZVxuICB9KTtcbn07XG52YXIgT2JqZWN0SW5zcGVjdG9yID0gZnVuY3Rpb24gT2JqZWN0SW5zcGVjdG9yKF9yZWYyKSB7XG4gIHZhciBfcmVmMiRzaG93Tm9uZW51bWVyYWIgPSBfcmVmMi5zaG93Tm9uZW51bWVyYWJsZSxcbiAgICAgIHNob3dOb25lbnVtZXJhYmxlID0gX3JlZjIkc2hvd05vbmVudW1lcmFiID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYyJHNob3dOb25lbnVtZXJhYixcbiAgICAgIHNvcnRPYmplY3RLZXlzID0gX3JlZjIuc29ydE9iamVjdEtleXMsXG4gICAgICBub2RlUmVuZGVyZXIgPSBfcmVmMi5ub2RlUmVuZGVyZXIsXG4gICAgICB0cmVlVmlld1Byb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFtcInNob3dOb25lbnVtZXJhYmxlXCIsIFwic29ydE9iamVjdEtleXNcIiwgXCJub2RlUmVuZGVyZXJcIl0pO1xuICB2YXIgZGF0YUl0ZXJhdG9yID0gY3JlYXRlSXRlcmF0b3Ioc2hvd05vbmVudW1lcmFibGUsIHNvcnRPYmplY3RLZXlzKTtcbiAgdmFyIHJlbmRlcmVyID0gbm9kZVJlbmRlcmVyID8gbm9kZVJlbmRlcmVyIDogZGVmYXVsdE5vZGVSZW5kZXJlcjtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJlZVZpZXcsIF9leHRlbmRzXzEoe1xuICAgIG5vZGVSZW5kZXJlcjogcmVuZGVyZXIsXG4gICAgZGF0YUl0ZXJhdG9yOiBkYXRhSXRlcmF0b3JcbiAgfSwgdHJlZVZpZXdQcm9wcykpO1xufTtcbk9iamVjdEluc3BlY3Rvci5wcm9wVHlwZXMgPSB7XG4gIGV4cGFuZExldmVsOiBQcm9wVHlwZXMubnVtYmVyLFxuICBleHBhbmRQYXRoczogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmFycmF5XSksXG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGE6IFByb3BUeXBlcy5hbnksXG4gIHNob3dOb25lbnVtZXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgc29ydE9iamVjdEtleXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICBub2RlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jXG59O1xudmFyIE9iamVjdEluc3BlY3RvciQxID0gdGhlbWVBY2NlcHRvcihPYmplY3RJbnNwZWN0b3IpO1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcykge1xuICBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiAoc2VhcmNoRWxlbWVudFxuICApIHtcbiAgICB2YXIgTyA9IE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuID0gcGFyc2VJbnQoTy5sZW5ndGgpIHx8IDA7XG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbiA9IHBhcnNlSW50KGFyZ3VtZW50c1sxXSkgfHwgMDtcbiAgICB2YXIgaztcbiAgICBpZiAobiA+PSAwKSB7XG4gICAgICBrID0gbjtcbiAgICB9IGVsc2Uge1xuICAgICAgayA9IGxlbiArIG47XG4gICAgICBpZiAoayA8IDApIHtcbiAgICAgICAgayA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjdXJyZW50RWxlbWVudDtcbiAgICB3aGlsZSAoayA8IGxlbikge1xuICAgICAgY3VycmVudEVsZW1lbnQgPSBPW2tdO1xuICAgICAgaWYgKHNlYXJjaEVsZW1lbnQgPT09IGN1cnJlbnRFbGVtZW50IHx8IHNlYXJjaEVsZW1lbnQgIT09IHNlYXJjaEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaysrO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59XG5mdW5jdGlvbiBnZXRIZWFkZXJzKGRhdGEpIHtcbiAgaWYgKF90eXBlb2ZfMShkYXRhKSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcm93SGVhZGVycztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdmFyIG5Sb3dzID0gZGF0YS5sZW5ndGg7XG4gICAgICByb3dIZWFkZXJzID0gdG9Db25zdW1hYmxlQXJyYXkoQXJyYXkoblJvd3MpLmtleXMoKSk7XG4gICAgfSBlbHNlIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICByb3dIZWFkZXJzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgfVxuICAgIHZhciBjb2xIZWFkZXJzID0gcm93SGVhZGVycy5yZWR1Y2UoZnVuY3Rpb24gKGNvbEhlYWRlcnMsIHJvd0hlYWRlcikge1xuICAgICAgdmFyIHJvdyA9IGRhdGFbcm93SGVhZGVyXTtcbiAgICAgIGlmIChfdHlwZW9mXzEocm93KSA9PT0gJ29iamVjdCcgJiYgcm93ICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBjb2xzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICAgICAgY29scy5yZWR1Y2UoZnVuY3Rpb24gKHhzLCB4KSB7XG4gICAgICAgICAgaWYgKCF4cy5pbmNsdWRlcyh4KSkge1xuICAgICAgICAgICAgeHMucHVzaCh4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHhzO1xuICAgICAgICB9LCBjb2xIZWFkZXJzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xIZWFkZXJzO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4ge1xuICAgICAgcm93SGVhZGVyczogcm93SGVhZGVycyxcbiAgICAgIGNvbEhlYWRlcnM6IGNvbEhlYWRlcnNcbiAgICB9O1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIG93bktleXMkNihvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkNih0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDYoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDYoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgRGF0YUNvbnRhaW5lciA9IGZ1bmN0aW9uIERhdGFDb250YWluZXIoX3JlZikge1xuICB2YXIgcm93cyA9IF9yZWYucm93cyxcbiAgICAgIGNvbHVtbnMgPSBfcmVmLmNvbHVtbnMsXG4gICAgICByb3dzRGF0YSA9IF9yZWYucm93c0RhdGE7XG4gIHZhciBzdHlsZXMgPSB1c2VTdHlsZXMoJ1RhYmxlSW5zcGVjdG9yRGF0YUNvbnRhaW5lcicpO1xuICB2YXIgYm9yZGVyU3R5bGVzID0gdXNlU3R5bGVzKCdUYWJsZUluc3BlY3RvckxlZnRCb3JkZXInKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIHN0eWxlOiBzdHlsZXMuZGl2XG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCB7XG4gICAgc3R5bGU6IHN0eWxlcy50YWJsZVxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29sZ3JvdXBcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLCByb3dzLm1hcChmdW5jdGlvbiAocm93LCBpKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7XG4gICAgICBrZXk6IHJvdyxcbiAgICAgIHN0eWxlOiBzdHlsZXMudHJcbiAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwge1xuICAgICAgc3R5bGU6IF9vYmplY3RTcHJlYWQkNihfb2JqZWN0U3ByZWFkJDYoe30sIHN0eWxlcy50ZCksIGJvcmRlclN0eWxlcy5ub25lKVxuICAgIH0sIHJvdyksIGNvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICAgIHZhciByb3dEYXRhID0gcm93c0RhdGFbaV07XG4gICAgICBpZiAoX3R5cGVvZl8xKHJvd0RhdGEpID09PSAnb2JqZWN0JyAmJiByb3dEYXRhICE9PSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwocm93RGF0YSwgY29sdW1uKSkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHtcbiAgICAgICAgICBrZXk6IGNvbHVtbixcbiAgICAgICAgICBzdHlsZTogX29iamVjdFNwcmVhZCQ2KF9vYmplY3RTcHJlYWQkNih7fSwgc3R5bGVzLnRkKSwgYm9yZGVyU3R5bGVzLnNvbGlkKVxuICAgICAgICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KE9iamVjdFZhbHVlLCB7XG4gICAgICAgICAgb2JqZWN0OiByb3dEYXRhW2NvbHVtbl1cbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7XG4gICAgICAgICAga2V5OiBjb2x1bW4sXG4gICAgICAgICAgc3R5bGU6IF9vYmplY3RTcHJlYWQkNihfb2JqZWN0U3ByZWFkJDYoe30sIHN0eWxlcy50ZCksIGJvcmRlclN0eWxlcy5zb2xpZClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9KSkpKTtcbn07XG5cbmZ1bmN0aW9uIG93bktleXMkNyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQkNyh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzJDcoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzJDcoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG52YXIgU29ydEljb25Db250YWluZXIgPSBmdW5jdGlvbiBTb3J0SWNvbkNvbnRhaW5lcihwcm9wcykge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAxLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDEsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xuICAgIH1cbiAgfSwgcHJvcHMuY2hpbGRyZW4pO1xufTtcbnZhciBTb3J0SWNvbiA9IGZ1bmN0aW9uIFNvcnRJY29uKF9yZWYpIHtcbiAgdmFyIHNvcnRBc2NlbmRpbmcgPSBfcmVmLnNvcnRBc2NlbmRpbmc7XG4gIHZhciBzdHlsZXMgPSB1c2VTdHlsZXMoJ1RhYmxlSW5zcGVjdG9yU29ydEljb24nKTtcbiAgdmFyIGdseXBoID0gc29ydEFzY2VuZGluZyA/ICfilrInIDogJ+KWvCc7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBzdHlsZTogc3R5bGVzXG4gIH0sIGdseXBoKTtcbn07XG52YXIgVEggPSBmdW5jdGlvbiBUSChfcmVmMikge1xuICB2YXIgX3JlZjIkc29ydEFzY2VuZGluZyA9IF9yZWYyLnNvcnRBc2NlbmRpbmcsXG4gICAgICBzb3J0QXNjZW5kaW5nID0gX3JlZjIkc29ydEFzY2VuZGluZyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmMiRzb3J0QXNjZW5kaW5nLFxuICAgICAgX3JlZjIkc29ydGVkID0gX3JlZjIuc29ydGVkLFxuICAgICAgc29ydGVkID0gX3JlZjIkc29ydGVkID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYyJHNvcnRlZCxcbiAgICAgIF9yZWYyJG9uQ2xpY2sgPSBfcmVmMi5vbkNsaWNrLFxuICAgICAgb25DbGljayA9IF9yZWYyJG9uQ2xpY2sgPT09IHZvaWQgMCA/IHVuZGVmaW5lZCA6IF9yZWYyJG9uQ2xpY2ssXG4gICAgICBfcmVmMiRib3JkZXJTdHlsZSA9IF9yZWYyLmJvcmRlclN0eWxlLFxuICAgICAgYm9yZGVyU3R5bGUgPSBfcmVmMiRib3JkZXJTdHlsZSA9PT0gdm9pZCAwID8ge30gOiBfcmVmMiRib3JkZXJTdHlsZSxcbiAgICAgIGNoaWxkcmVuID0gX3JlZjIuY2hpbGRyZW4sXG4gICAgICB0aFByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFtcInNvcnRBc2NlbmRpbmdcIiwgXCJzb3J0ZWRcIiwgXCJvbkNsaWNrXCIsIFwiYm9yZGVyU3R5bGVcIiwgXCJjaGlsZHJlblwiXSk7XG4gIHZhciBzdHlsZXMgPSB1c2VTdHlsZXMoJ1RhYmxlSW5zcGVjdG9yVEgnKTtcbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGZhbHNlKSxcbiAgICAgIF91c2VTdGF0ZTIgPSBzbGljZWRUb0FycmF5KF91c2VTdGF0ZSwgMiksXG4gICAgICBob3ZlcmVkID0gX3VzZVN0YXRlMlswXSxcbiAgICAgIHNldEhvdmVyZWQgPSBfdXNlU3RhdGUyWzFdO1xuICB2YXIgaGFuZGxlTW91c2VFbnRlciA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2V0SG92ZXJlZCh0cnVlKTtcbiAgfSwgW10pO1xuICB2YXIgaGFuZGxlTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2V0SG92ZXJlZChmYWxzZSk7XG4gIH0sIFtdKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBfZXh0ZW5kc18xKHt9LCB0aFByb3BzLCB7XG4gICAgc3R5bGU6IF9vYmplY3RTcHJlYWQkNyhfb2JqZWN0U3ByZWFkJDcoX29iamVjdFNwcmVhZCQ3KHt9LCBzdHlsZXMuYmFzZSksIGJvcmRlclN0eWxlKSwgaG92ZXJlZCA/IHN0eWxlcy5iYXNlWyc6aG92ZXInXSA6IHt9KSxcbiAgICBvbk1vdXNlRW50ZXI6IGhhbmRsZU1vdXNlRW50ZXIsXG4gICAgb25Nb3VzZUxlYXZlOiBoYW5kbGVNb3VzZUxlYXZlLFxuICAgIG9uQ2xpY2s6IG9uQ2xpY2tcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIHN0eWxlOiBzdHlsZXMuZGl2XG4gIH0sIGNoaWxkcmVuKSwgc29ydGVkICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU29ydEljb25Db250YWluZXIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU29ydEljb24sIHtcbiAgICBzb3J0QXNjZW5kaW5nOiBzb3J0QXNjZW5kaW5nXG4gIH0pKSk7XG59O1xuXG52YXIgSGVhZGVyQ29udGFpbmVyID0gZnVuY3Rpb24gSGVhZGVyQ29udGFpbmVyKF9yZWYpIHtcbiAgdmFyIF9yZWYkaW5kZXhDb2x1bW5UZXh0ID0gX3JlZi5pbmRleENvbHVtblRleHQsXG4gICAgICBpbmRleENvbHVtblRleHQgPSBfcmVmJGluZGV4Q29sdW1uVGV4dCA9PT0gdm9pZCAwID8gJyhpbmRleCknIDogX3JlZiRpbmRleENvbHVtblRleHQsXG4gICAgICBfcmVmJGNvbHVtbnMgPSBfcmVmLmNvbHVtbnMsXG4gICAgICBjb2x1bW5zID0gX3JlZiRjb2x1bW5zID09PSB2b2lkIDAgPyBbXSA6IF9yZWYkY29sdW1ucyxcbiAgICAgIHNvcnRlZCA9IF9yZWYuc29ydGVkLFxuICAgICAgc29ydEluZGV4Q29sdW1uID0gX3JlZi5zb3J0SW5kZXhDb2x1bW4sXG4gICAgICBzb3J0Q29sdW1uID0gX3JlZi5zb3J0Q29sdW1uLFxuICAgICAgc29ydEFzY2VuZGluZyA9IF9yZWYuc29ydEFzY2VuZGluZyxcbiAgICAgIG9uVEhDbGljayA9IF9yZWYub25USENsaWNrLFxuICAgICAgb25JbmRleFRIQ2xpY2sgPSBfcmVmLm9uSW5kZXhUSENsaWNrO1xuICB2YXIgc3R5bGVzID0gdXNlU3R5bGVzKCdUYWJsZUluc3BlY3RvckhlYWRlckNvbnRhaW5lcicpO1xuICB2YXIgYm9yZGVyU3R5bGVzID0gdXNlU3R5bGVzKCdUYWJsZUluc3BlY3RvckxlZnRCb3JkZXInKTtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIHN0eWxlOiBzdHlsZXMuYmFzZVxuICB9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwge1xuICAgIHN0eWxlOiBzdHlsZXMudGFibGVcbiAgfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFRILCB7XG4gICAgYm9yZGVyU3R5bGU6IGJvcmRlclN0eWxlcy5ub25lLFxuICAgIHNvcnRlZDogc29ydGVkICYmIHNvcnRJbmRleENvbHVtbixcbiAgICBzb3J0QXNjZW5kaW5nOiBzb3J0QXNjZW5kaW5nLFxuICAgIG9uQ2xpY2s6IG9uSW5kZXhUSENsaWNrXG4gIH0sIGluZGV4Q29sdW1uVGV4dCksIGNvbHVtbnMubWFwKGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUSCwge1xuICAgICAgYm9yZGVyU3R5bGU6IGJvcmRlclN0eWxlcy5zb2xpZCxcbiAgICAgIGtleTogY29sdW1uLFxuICAgICAgc29ydGVkOiBzb3J0ZWQgJiYgc29ydENvbHVtbiA9PT0gY29sdW1uLFxuICAgICAgc29ydEFzY2VuZGluZzogc29ydEFzY2VuZGluZyxcbiAgICAgIG9uQ2xpY2s6IG9uVEhDbGljay5iaW5kKG51bGwsIGNvbHVtbilcbiAgICB9LCBjb2x1bW4pO1xuICB9KSkpKSk7XG59O1xuXG52YXIgVGFibGVJbnNwZWN0b3IgPSBmdW5jdGlvbiBUYWJsZUluc3BlY3RvcihfcmVmKSB7XG4gIHZhciBkYXRhID0gX3JlZi5kYXRhLFxuICAgICAgY29sdW1ucyA9IF9yZWYuY29sdW1ucztcbiAgdmFyIHN0eWxlcyA9IHVzZVN0eWxlcygnVGFibGVJbnNwZWN0b3InKTtcbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKHtcbiAgICBzb3J0ZWQ6IGZhbHNlLFxuICAgIHNvcnRJbmRleENvbHVtbjogZmFsc2UsXG4gICAgc29ydENvbHVtbjogdW5kZWZpbmVkLFxuICAgIHNvcnRBc2NlbmRpbmc6IGZhbHNlXG4gIH0pLFxuICAgICAgX3VzZVN0YXRlMiA9IHNsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgIF91c2VTdGF0ZTIkID0gX3VzZVN0YXRlMlswXSxcbiAgICAgIHNvcnRlZCA9IF91c2VTdGF0ZTIkLnNvcnRlZCxcbiAgICAgIHNvcnRJbmRleENvbHVtbiA9IF91c2VTdGF0ZTIkLnNvcnRJbmRleENvbHVtbixcbiAgICAgIHNvcnRDb2x1bW4gPSBfdXNlU3RhdGUyJC5zb3J0Q29sdW1uLFxuICAgICAgc29ydEFzY2VuZGluZyA9IF91c2VTdGF0ZTIkLnNvcnRBc2NlbmRpbmcsXG4gICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV07XG4gIHZhciBoYW5kbGVJbmRleFRIQ2xpY2sgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgc2V0U3RhdGUoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgc29ydEluZGV4Q29sdW1uID0gX3JlZjIuc29ydEluZGV4Q29sdW1uLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmcgPSBfcmVmMi5zb3J0QXNjZW5kaW5nO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydGVkOiB0cnVlLFxuICAgICAgICBzb3J0SW5kZXhDb2x1bW46IHRydWUsXG4gICAgICAgIHNvcnRDb2x1bW46IHVuZGVmaW5lZCxcbiAgICAgICAgc29ydEFzY2VuZGluZzogc29ydEluZGV4Q29sdW1uID8gIXNvcnRBc2NlbmRpbmcgOiB0cnVlXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIHZhciBoYW5kbGVUSENsaWNrID0gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKGNvbCkge1xuICAgIHNldFN0YXRlKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgdmFyIHNvcnRDb2x1bW4gPSBfcmVmMy5zb3J0Q29sdW1uLFxuICAgICAgICAgIHNvcnRBc2NlbmRpbmcgPSBfcmVmMy5zb3J0QXNjZW5kaW5nO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydGVkOiB0cnVlLFxuICAgICAgICBzb3J0SW5kZXhDb2x1bW46IGZhbHNlLFxuICAgICAgICBzb3J0Q29sdW1uOiBjb2wsXG4gICAgICAgIHNvcnRBc2NlbmRpbmc6IGNvbCA9PT0gc29ydENvbHVtbiA/ICFzb3J0QXNjZW5kaW5nIDogdHJ1ZVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSwgW10pO1xuICBpZiAoX3R5cGVvZl8xKGRhdGEpICE9PSAnb2JqZWN0JyB8fCBkYXRhID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCk7XG4gIH1cbiAgdmFyIF9nZXRIZWFkZXJzID0gZ2V0SGVhZGVycyhkYXRhKSxcbiAgICAgIHJvd0hlYWRlcnMgPSBfZ2V0SGVhZGVycy5yb3dIZWFkZXJzLFxuICAgICAgY29sSGVhZGVycyA9IF9nZXRIZWFkZXJzLmNvbEhlYWRlcnM7XG4gIGlmIChjb2x1bW5zICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb2xIZWFkZXJzID0gY29sdW1ucztcbiAgfVxuICB2YXIgcm93c0RhdGEgPSByb3dIZWFkZXJzLm1hcChmdW5jdGlvbiAocm93SGVhZGVyKSB7XG4gICAgcmV0dXJuIGRhdGFbcm93SGVhZGVyXTtcbiAgfSk7XG4gIHZhciBjb2x1bW5EYXRhV2l0aFJvd0luZGV4ZXM7XG4gIGlmIChzb3J0Q29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb2x1bW5EYXRhV2l0aFJvd0luZGV4ZXMgPSByb3dzRGF0YS5tYXAoZnVuY3Rpb24gKHJvd0RhdGEsIGluZGV4KSB7XG4gICAgICBpZiAoX3R5cGVvZl8xKHJvd0RhdGEpID09PSAnb2JqZWN0JyAmJiByb3dEYXRhICE9PSBudWxsXG4gICAgICApIHtcbiAgICAgICAgICB2YXIgY29sdW1uRGF0YSA9IHJvd0RhdGFbc29ydENvbHVtbl07XG4gICAgICAgICAgcmV0dXJuIFtjb2x1bW5EYXRhLCBpbmRleF07XG4gICAgICAgIH1cbiAgICAgIHJldHVybiBbdW5kZWZpbmVkLCBpbmRleF07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHNvcnRJbmRleENvbHVtbikge1xuICAgICAgY29sdW1uRGF0YVdpdGhSb3dJbmRleGVzID0gcm93SGVhZGVycy5tYXAoZnVuY3Rpb24gKHJvd0RhdGEsIGluZGV4KSB7XG4gICAgICAgIHZhciBjb2x1bW5EYXRhID0gcm93SGVhZGVyc1tpbmRleF07XG4gICAgICAgIHJldHVybiBbY29sdW1uRGF0YSwgaW5kZXhdO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGlmIChjb2x1bW5EYXRhV2l0aFJvd0luZGV4ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBjb21wYXJhdG9yID0gZnVuY3Rpb24gY29tcGFyYXRvcihtYXBwZXIsIGFzY2VuZGluZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciB2MSA9IG1hcHBlcihhKTtcbiAgICAgICAgdmFyIHYyID0gbWFwcGVyKGIpO1xuICAgICAgICB2YXIgdHlwZTEgPSBfdHlwZW9mXzEodjEpO1xuICAgICAgICB2YXIgdHlwZTIgPSBfdHlwZW9mXzEodjIpO1xuICAgICAgICB2YXIgbHQgPSBmdW5jdGlvbiBsdCh2MSwgdjIpIHtcbiAgICAgICAgICBpZiAodjEgPCB2Mikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH0gZWxzZSBpZiAodjEgPiB2Mikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKHR5cGUxID09PSB0eXBlMikge1xuICAgICAgICAgIHJlc3VsdCA9IGx0KHYxLCB2Mik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG9yZGVyID0ge1xuICAgICAgICAgICAgc3RyaW5nOiAwLFxuICAgICAgICAgICAgbnVtYmVyOiAxLFxuICAgICAgICAgICAgb2JqZWN0OiAyLFxuICAgICAgICAgICAgc3ltYm9sOiAzLFxuICAgICAgICAgICAgYm9vbGVhbjogNCxcbiAgICAgICAgICAgIHVuZGVmaW5lZDogNSxcbiAgICAgICAgICAgIGZ1bmN0aW9uOiA2XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXN1bHQgPSBsdChvcmRlclt0eXBlMV0sIG9yZGVyW3R5cGUyXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhc2NlbmRpbmcpIHJlc3VsdCA9IC1yZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNvcnRlZFJvd0luZGV4ZXMgPSBjb2x1bW5EYXRhV2l0aFJvd0luZGV4ZXMuc29ydChjb21wYXJhdG9yKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbVswXTtcbiAgICB9LCBzb3J0QXNjZW5kaW5nKSkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbVsxXTtcbiAgICB9KTtcbiAgICByb3dIZWFkZXJzID0gc29ydGVkUm93SW5kZXhlcy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiByb3dIZWFkZXJzW2ldO1xuICAgIH0pO1xuICAgIHJvd3NEYXRhID0gc29ydGVkUm93SW5kZXhlcy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiByb3dzRGF0YVtpXTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgc3R5bGU6IHN0eWxlcy5iYXNlXG4gIH0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGVyQ29udGFpbmVyLCB7XG4gICAgY29sdW1uczogY29sSGVhZGVyc1xuICAgICxcbiAgICBzb3J0ZWQ6IHNvcnRlZCxcbiAgICBzb3J0SW5kZXhDb2x1bW46IHNvcnRJbmRleENvbHVtbixcbiAgICBzb3J0Q29sdW1uOiBzb3J0Q29sdW1uLFxuICAgIHNvcnRBc2NlbmRpbmc6IHNvcnRBc2NlbmRpbmcsXG4gICAgb25USENsaWNrOiBoYW5kbGVUSENsaWNrLFxuICAgIG9uSW5kZXhUSENsaWNrOiBoYW5kbGVJbmRleFRIQ2xpY2tcbiAgfSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YUNvbnRhaW5lciwge1xuICAgIHJvd3M6IHJvd0hlYWRlcnMsXG4gICAgY29sdW1uczogY29sSGVhZGVycyxcbiAgICByb3dzRGF0YTogcm93c0RhdGFcbiAgfSkpO1xufTtcblRhYmxlSW5zcGVjdG9yLnByb3BUeXBlcyA9IHtcbiAgZGF0YTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5LCBQcm9wVHlwZXMub2JqZWN0XSksXG4gIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheVxufTtcbnZhciBUYWJsZUluc3BlY3RvciQxID0gdGhlbWVBY2NlcHRvcihUYWJsZUluc3BlY3Rvcik7XG5cbnZhciBURVhUX05PREVfTUFYX0lOTElORV9DSEFSUyA9IDgwO1xudmFyIHNob3VsZElubGluZSA9IGZ1bmN0aW9uIHNob3VsZElubGluZShkYXRhKSB7XG4gIHJldHVybiBkYXRhLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwIHx8IGRhdGEuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgZGF0YS5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBkYXRhLnRleHRDb250ZW50Lmxlbmd0aCA8IFRFWFRfTk9ERV9NQVhfSU5MSU5FX0NIQVJTO1xufTtcblxudmFyIE9wZW5UYWcgPSBmdW5jdGlvbiBPcGVuVGFnKF9yZWYpIHtcbiAgdmFyIHRhZ05hbWUgPSBfcmVmLnRhZ05hbWUsXG4gICAgICBhdHRyaWJ1dGVzID0gX3JlZi5hdHRyaWJ1dGVzLFxuICAgICAgc3R5bGVzID0gX3JlZi5zdHlsZXM7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgc3R5bGU6IHN0eWxlcy5iYXNlXG4gIH0sICc8JywgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgIHN0eWxlOiBzdHlsZXMudGFnTmFtZVxuICB9LCB0YWdOYW1lKSwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICB2YXIgYXR0cmlidXRlTm9kZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgYXR0cmlidXRlTm9kZXMucHVzaCggUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgICAgICAgIGtleTogaVxuICAgICAgICB9LCAnICcsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdHlsZTogc3R5bGVzLmh0bWxBdHRyaWJ1dGVOYW1lXG4gICAgICAgIH0sIGF0dHJpYnV0ZS5uYW1lKSwgJz1cIicsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdHlsZTogc3R5bGVzLmh0bWxBdHRyaWJ1dGVWYWx1ZVxuICAgICAgICB9LCBhdHRyaWJ1dGUudmFsdWUpLCAnXCInKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXR0cmlidXRlTm9kZXM7XG4gICAgfVxuICB9KCksICc+Jyk7XG59O1xudmFyIENsb3NlVGFnID0gZnVuY3Rpb24gQ2xvc2VUYWcoX3JlZjIpIHtcbiAgdmFyIHRhZ05hbWUgPSBfcmVmMi50YWdOYW1lLFxuICAgICAgX3JlZjIkaXNDaGlsZE5vZGUgPSBfcmVmMi5pc0NoaWxkTm9kZSxcbiAgICAgIGlzQ2hpbGROb2RlID0gX3JlZjIkaXNDaGlsZE5vZGUgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZjIkaXNDaGlsZE5vZGUsXG4gICAgICBzdHlsZXMgPSBfcmVmMi5zdHlsZXM7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgc3R5bGU6IF9leHRlbmRzXzEoe30sIHN0eWxlcy5iYXNlLCBpc0NoaWxkTm9kZSAmJiBzdHlsZXMub2Zmc2V0TGVmdClcbiAgfSwgJzwvJywgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xuICAgIHN0eWxlOiBzdHlsZXMudGFnTmFtZVxuICB9LCB0YWdOYW1lKSwgJz4nKTtcbn07XG52YXIgbmFtZUJ5Tm9kZVR5cGUgPSB7XG4gIDE6ICdFTEVNRU5UX05PREUnLFxuICAzOiAnVEVYVF9OT0RFJyxcbiAgNzogJ1BST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERScsXG4gIDg6ICdDT01NRU5UX05PREUnLFxuICA5OiAnRE9DVU1FTlRfTk9ERScsXG4gIDEwOiAnRE9DVU1FTlRfVFlQRV9OT0RFJyxcbiAgMTE6ICdET0NVTUVOVF9GUkFHTUVOVF9OT0RFJ1xufTtcbnZhciBET01Ob2RlUHJldmlldyA9IGZ1bmN0aW9uIERPTU5vZGVQcmV2aWV3KF9yZWYzKSB7XG4gIHZhciBpc0Nsb3NlVGFnID0gX3JlZjMuaXNDbG9zZVRhZyxcbiAgICAgIGRhdGEgPSBfcmVmMy5kYXRhLFxuICAgICAgZXhwYW5kZWQgPSBfcmVmMy5leHBhbmRlZDtcbiAgdmFyIHN0eWxlcyA9IHVzZVN0eWxlcygnRE9NTm9kZVByZXZpZXcnKTtcbiAgaWYgKGlzQ2xvc2VUYWcpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDbG9zZVRhZywge1xuICAgICAgc3R5bGVzOiBzdHlsZXMuaHRtbENsb3NlVGFnLFxuICAgICAgaXNDaGlsZE5vZGU6IHRydWUsXG4gICAgICB0YWdOYW1lOiBkYXRhLnRhZ05hbWVcbiAgICB9KTtcbiAgfVxuICBzd2l0Y2ggKGRhdGEubm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoT3BlblRhZywge1xuICAgICAgICB0YWdOYW1lOiBkYXRhLnRhZ05hbWUsXG4gICAgICAgIGF0dHJpYnV0ZXM6IGRhdGEuYXR0cmlidXRlcyxcbiAgICAgICAgc3R5bGVzOiBzdHlsZXMuaHRtbE9wZW5UYWdcbiAgICAgIH0pLCBzaG91bGRJbmxpbmUoZGF0YSkgPyBkYXRhLnRleHRDb250ZW50IDogIWV4cGFuZGVkICYmICfigKYnLCAhZXhwYW5kZWQgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChDbG9zZVRhZywge1xuICAgICAgICB0YWdOYW1lOiBkYXRhLnRhZ05hbWUsXG4gICAgICAgIHN0eWxlczogc3R5bGVzLmh0bWxDbG9zZVRhZ1xuICAgICAgfSkpO1xuICAgIGNhc2UgTm9kZS5URVhUX05PREU6XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgZGF0YS50ZXh0Q29udGVudCk7XG4gICAgY2FzZSBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERTpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCAnPCFbQ0RBVEFbJyArIGRhdGEudGV4dENvbnRlbnQgKyAnXV0+Jyk7XG4gICAgY2FzZSBOb2RlLkNPTU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZXMuaHRtbENvbW1lbnRcbiAgICAgIH0sICc8IS0tJywgZGF0YS50ZXh0Q29udGVudCwgJy0tPicpO1xuICAgIGNhc2UgTm9kZS5QUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREU6XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgZGF0YS5ub2RlTmFtZSk7XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERTpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZXMuaHRtbERvY3R5cGVcbiAgICAgIH0sICc8IURPQ1RZUEUgJywgZGF0YS5uYW1lLCBkYXRhLnB1YmxpY0lkID8gXCIgUFVCTElDIFxcXCJcIi5jb25jYXQoZGF0YS5wdWJsaWNJZCwgXCJcXFwiXCIpIDogJycsICFkYXRhLnB1YmxpY0lkICYmIGRhdGEuc3lzdGVtSWQgPyAnIFNZU1RFTScgOiAnJywgZGF0YS5zeXN0ZW1JZCA/IFwiIFxcXCJcIi5jb25jYXQoZGF0YS5zeXN0ZW1JZCwgXCJcXFwiXCIpIDogJycsICc+Jyk7XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgZGF0YS5ub2RlTmFtZSk7XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgZGF0YS5ub2RlTmFtZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBuYW1lQnlOb2RlVHlwZVtkYXRhLm5vZGVUeXBlXSk7XG4gIH1cbn07XG5ET01Ob2RlUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGlzQ2xvc2VUYWc6IFByb3BUeXBlcy5ib29sLFxuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGV4cGFuZGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG59O1xuXG52YXIgZG9tSXRlcmF0b3IgPSByZWdlbmVyYXRvci5tYXJrKGZ1bmN0aW9uIGRvbUl0ZXJhdG9yKGRhdGEpIHtcbiAgdmFyIHRleHRJbmxpbmVkLCBpLCBub2RlO1xuICByZXR1cm4gcmVnZW5lcmF0b3Iud3JhcChmdW5jdGlvbiBkb21JdGVyYXRvciQoX2NvbnRleHQpIHtcbiAgICB3aGlsZSAoMSkge1xuICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgaWYgKCEoZGF0YSAmJiBkYXRhLmNoaWxkTm9kZXMpKSB7XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGV4dElubGluZWQgPSBzaG91bGRJbmxpbmUoZGF0YSk7XG4gICAgICAgICAgaWYgKCF0ZXh0SW5saW5lZCkge1xuICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9jb250ZXh0LmFicnVwdChcInJldHVyblwiKTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIGkgPSAwO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgaWYgKCEoaSA8IGRhdGEuY2hpbGROb2Rlcy5sZW5ndGgpKSB7XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbm9kZSA9IGRhdGEuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICBpZiAoIShub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gOTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwiY29udGludWVcIiwgMTEpO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgX2NvbnRleHQubmV4dCA9IDExO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBcIlwiLmNvbmNhdChub2RlLnRhZ05hbWUsIFwiW1wiKS5jb25jYXQoaSwgXCJdXCIpLFxuICAgICAgICAgICAgZGF0YTogbm9kZVxuICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA1O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgIGlmICghZGF0YS50YWdOYW1lKSB7XG4gICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMTc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgX2NvbnRleHQubmV4dCA9IDE3O1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAnQ0xPU0VfVEFHJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdGFnTmFtZTogZGF0YS50YWdOYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDbG9zZVRhZzogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgMTc6XG4gICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZG9tSXRlcmF0b3IpO1xufSk7XG52YXIgRE9NSW5zcGVjdG9yID0gZnVuY3Rpb24gRE9NSW5zcGVjdG9yKHByb3BzKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRyZWVWaWV3LCBfZXh0ZW5kc18xKHtcbiAgICBub2RlUmVuZGVyZXI6IERPTU5vZGVQcmV2aWV3LFxuICAgIGRhdGFJdGVyYXRvcjogZG9tSXRlcmF0b3JcbiAgfSwgcHJvcHMpKTtcbn07XG5ET01JbnNwZWN0b3IucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn07XG52YXIgRE9NSW5zcGVjdG9yJDEgPSB0aGVtZUFjY2VwdG9yKERPTUluc3BlY3Rvcik7XG5cbnZhciBJbnNwZWN0b3IgPSBmdW5jdGlvbiBJbnNwZWN0b3IoX3JlZikge1xuICB2YXIgX3JlZiR0YWJsZSA9IF9yZWYudGFibGUsXG4gICAgICB0YWJsZSA9IF9yZWYkdGFibGUgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiR0YWJsZSxcbiAgICAgIGRhdGEgPSBfcmVmLmRhdGEsXG4gICAgICByZXN0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgW1widGFibGVcIiwgXCJkYXRhXCJdKTtcbiAgaWYgKHRhYmxlKSB7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVJbnNwZWN0b3IkMSwgX2V4dGVuZHNfMSh7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgcmVzdCkpO1xuICB9XG4gIGlmIChpc0RPTShkYXRhKSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRE9NSW5zcGVjdG9yJDEsIF9leHRlbmRzXzEoe1xuICAgIGRhdGE6IGRhdGFcbiAgfSwgcmVzdCkpO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChPYmplY3RJbnNwZWN0b3IkMSwgX2V4dGVuZHNfMSh7XG4gICAgZGF0YTogZGF0YVxuICB9LCByZXN0KSk7XG59O1xuSW5zcGVjdG9yLnByb3BUeXBlcyA9IHtcbiAgZGF0YTogUHJvcFR5cGVzLmFueSxcbiAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgdGFibGU6IFByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbnNwZWN0b3I7XG5leHBvcnQgeyBET01JbnNwZWN0b3IkMSBhcyBET01JbnNwZWN0b3IsIEluc3BlY3RvciwgT2JqZWN0SW5zcGVjdG9yJDEgYXMgT2JqZWN0SW5zcGVjdG9yLCBPYmplY3RMYWJlbCwgT2JqZWN0TmFtZSwgT2JqZWN0UHJldmlldywgT2JqZWN0Um9vdExhYmVsLCBPYmplY3RWYWx1ZSwgVGFibGVJbnNwZWN0b3IkMSBhcyBUYWJsZUluc3BlY3RvciwgdGhlbWUgYXMgY2hyb21lRGFyaywgdGhlbWUkMSBhcyBjaHJvbWVMaWdodCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtaW5zcGVjdG9yLmpzLm1hcFxuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9CTE9DS19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYmxvY2snKSA6IDB4ZWFkOTtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0gLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxuXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=