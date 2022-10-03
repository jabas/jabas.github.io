/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/conditioner-core/conditioner-core.js":
/*!***********************************************************!*\
  !*** ./node_modules/conditioner-core/conditioner-core.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* conditioner-core 2.3.3 */
(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else { var mod; }
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
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
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	// links the module to the element and exposes a callback api object
	var bindModule = function bindModule(element, unbind) {
		// gets the name of the module from the element, we assume the name is an alias
		var alias = runPlugin('moduleGetName', element);

		// sets the name of the plugin, this does nothing by default but allows devs to turn an alias into the actual module name
		var name = chainPlugins('moduleSetName', alias);

		// internal state
		var state = {
			destruct: null, // holder for unload method (function returned by module constructor)
			mounting: false
		};

		// api wrapped around module object
		var boundModule = {
			// original name as found on the element
			alias: alias,

			// transformed name
			name: name,

			// reference to the element the module is bound to
			element: element,

			// is the module currently mounted?
			mounted: false,

			// unmounts the module
			unmount: function unmount() {
				// can't be unmounted if no destroy method has been supplied
				// can't be unmounted if not mounted
				if (!state.destruct || !boundModule.mounted) return;

				// about to unmount the module
				eachPlugins('moduleWillUnmount', boundModule);

				// clean up
				state.destruct();

				// no longer mounted
				boundModule.mounted = false;

				// done unmounting the module
				eachPlugins('moduleDidUnmount', boundModule);

				// done unmounting
				boundModule.onunmount.apply(element);
			},

			// requests and loads the module
			mount: function mount() {
				// can't mount an already mounted module
				// can't mount a module that is currently mounting
				if (boundModule.mounted || state.mounting) return;

				// now mounting module
				state.mounting = true;

				// about to mount the module
				eachPlugins('moduleWillMount', boundModule);

				// get the module
				runPlugin('moduleImport', name).then(function (module) {
					// initialise the module, module can return a destroy mehod
					state.destruct = runPlugin('moduleGetDestructor', runPlugin('moduleGetConstructor', module).apply(undefined, _toConsumableArray(runPlugin('moduleSetConstructorArguments', name, element))));

					// no longer mounting
					state.mounting = false;

					// module is now mounted
					boundModule.mounted = true;

					// did mount the module
					eachPlugins('moduleDidMount', boundModule);

					// module has now loaded lets fire the onload event so everyone knows about it
					boundModule.onmount.apply(element, [boundModule]);
				}).catch(function (error) {
					// failed to mount so no longer mounting
					state.mounting = false;

					// failed to mount the module
					eachPlugins('moduleDidCatch', error, boundModule);

					// callback for this specific module
					boundModule.onmounterror.apply(element, [error, boundModule]);

					// let dev know
					throw new Error('Conditioner: ' + error);
				});

				// return state object
				return boundModule;
			},

			// unmounts the module and destroys the attached monitors
			destroy: function destroy() {

				// about to destroy the module
				eachPlugins('moduleWillDestroy', boundModule);

				// not implemented yet
				boundModule.unmount();

				// did destroy the module
				eachPlugins('moduleDidDestroy', boundModule);

				// call public ondestroy so dev can handle it as well
				boundModule.ondestroy.apply(element);

				// call the destroy callback so monitor can be removed as well
				unbind();
			},

			// called when fails to bind the module
			onmounterror: function onmounterror() {},

			// called when the module is loaded, receives the state object, scope is set to element
			onmount: function onmount() {},

			// called when the module is unloaded, scope is set to element
			onunmount: function onunmount() {},

			// called when the module is destroyed
			ondestroy: function ondestroy() {}
		};

		// done!
		return boundModule;
	};

	var queryParamsRegex = /(was)? ?(not)? ?@([a-z]+) ?(.*)?/;
	var queryRegex = /(?:was )?(?:not )?@[a-z]+ ?.*?(?:(?= and (?:was )?(?:not )?@[a-z])|$)/g;

	// convert context values to booleans if value is undefined or a boolean described as string
	var toContextValue = function toContextValue(value) {
		return typeof value === 'undefined' || value === 'true' ? true : value === 'false' ? false : value;
	};

	var extractParams = function extractParams(query) {
		var _query$match = query.match(queryParamsRegex),
		    _query$match2 = _slicedToArray(_query$match, 5),
		    retain = _query$match2[1],
		    invert = _query$match2[2],
		    name = _query$match2[3],
		    value = _query$match2[4];

		// extract groups, we ignore the first array index which is the entire matches string
		return [name, toContextValue(value), invert === 'not', retain === 'was'];
	};

	// @media (min-width:30em) and was @visible true  ->  [ ['media', '(min-width:30em)', false, false], ['visible', 'true', false, true] ]
	var parseQuery = function parseQuery(query) {
		return query.match(queryRegex).map(extractParams);
	};

	// add intert and retain properties to monitor
	var decorateMonitor = function decorateMonitor(monitor, invert, retain) {
		monitor.invert = invert;
		monitor.retain = retain;
		monitor.matched = false;
		return monitor;
	};

	// finds monitor plugins and calls the create method on the first found monitor
	var getContextMonitor = function getContextMonitor(element, name, context) {
		var monitor = getPlugins('monitor').find(function (monitor) {
			return monitor.name === name;
		});
		// @exclude
		if (!monitor) {
			throw new Error('Conditioner: Cannot find monitor with name "@' + name + '". Only the "@media" monitor is always available. Custom monitors can be added with the `addPlugin` method using the `monitors` key. The name of the custom monitor should not include the "@" symbol.');
		}
		// @endexclude
		return monitor.create(context, element);
	};

	// test if monitor contexts are currently valid
	var matchMonitors = function matchMonitors(monitors) {
		return monitors.reduce(function (matches, monitor) {
			// an earlier monitor returned false, so current context will no longer be suitable
			if (!matches) return false;

			// get current match state, takes "not" into account
			var matched = monitor.invert ? !monitor.matches : monitor.matches;

			// mark monitor as has been matched in the past
			if (matched) monitor.matched = true;

			// if retain is enabled with "was" and the monitor has been matched in the past, there's a match
			if (monitor.retain && monitor.matched) return true;

			// return current match state
			return matched;
		},

		// initial value is always match
		true);
	};

	var monitor = exports.monitor = function monitor(query, element) {
		// setup monitor api
		var contextMonitor = {
			matches: false,
			active: false,
			onchange: function onchange() {},
			start: function start() {
				// cannot be activated when already active
				if (contextMonitor.active) return;

				// now activating
				contextMonitor.active = true;

				// listen for context changes
				monitorSets.forEach(function (monitorSet) {
					return monitorSet.forEach(function (monitor) {
						return monitor.addListener(onMonitorEvent);
					});
				});

				// get initial state
				onMonitorEvent();
			},
			stop: function stop() {
				// disable the monitor
				contextMonitor.active = false;

				// disable
				monitorSets.forEach(function (monitorSet) {
					return monitorSet.forEach(function (monitor) {
						// stop listening (if possible)
						if (!monitor.removeListener) return;
						monitor.removeListener(onMonitorEvent);
					});
				});
			},
			destroy: function destroy() {
				contextMonitor.stop();
				monitorSets.length = 0;
			}
		};

		// get different monitor sets (each 'or' creates a separate monitor set) > get monitors for each query
		var monitorSets = query.split(' or ').map(function (subQuery) {
			return parseQuery(subQuery).map(function (params) {
				return decorateMonitor.apply(undefined, [getContextMonitor.apply(undefined, [element].concat(_toConsumableArray(params)))].concat(_toConsumableArray(params.splice(2))));
			});
		});

		// if all monitors return true for .matches getter, we mount the module
		var onMonitorEvent = function onMonitorEvent() {
			// will keep returning false if one of the monitors does not match, else checks matches property
			var matches = monitorSets.reduce(function (matches, monitorSet) {
				return (
					// if one of the sets is true, it's all fine, no need to match the other sets
					matches ? true : matchMonitors(monitorSet)
				);
			}, false);

			// store new state
			contextMonitor.matches = matches;

			// if matches we mount the module, else we unmount
			contextMonitor.onchange(matches);
		};

		return contextMonitor;
	};

	// handles contextual loading and unloading
	var createContextualModule = function createContextualModule(query, boundModule) {
		// setup query monitor
		var moduleMonitor = monitor(query, boundModule.element);
		moduleMonitor.onchange = function (matches) {
			return matches ? boundModule.mount() : boundModule.unmount();
		};

		// start monitoring
		moduleMonitor.start();

		// export monitor
		return moduleMonitor;
	};

	// pass in an element and outputs a bound module object, will wrap bound module in a contextual module if required
	var createModule = function createModule(element) {

		// called when the module is destroyed
		var unbindModule = function unbindModule() {
			return monitor && monitor.destroy();
		};

		// bind the module to the element and receive the module wrapper API
		var boundModule = bindModule(element, unbindModule);

		// get context requirements for this module (if any have been defined)
		var query = runPlugin('moduleGetContext', element);

		// wait for the right context or load the module immidiately if no context supplied
		var monitor = query && createContextualModule(query, boundModule);

		// return module
		return query ? boundModule : boundModule.mount();
	};

	// parse a certain section of the DOM and load bound modules
	var hydrate = exports.hydrate = function hydrate(context) {
		return [].concat(_toConsumableArray(runPlugin('moduleSelector', context))).map(createModule);
	};

	// all registered plugins
	var plugins = [];

	// array includes 'polyfill', Array.prototype.includes was the only feature not supported on Edge
	var includes = function includes(arr, value) {
		return arr.indexOf(value) > -1;
	};

	// plugins are stored in an array as multiple plugins can subscribe to one hook
	var addPlugin = exports.addPlugin = function addPlugin(plugin) {
		return plugins.push(plugin);
	};

	// returns the plugins that match the requested type, as plugins can subscribe to multiple hooks we need to loop over the plugin keys to see if it matches
	var getPlugins = function getPlugins(type) {
		return plugins.filter(function (plugin) {
			return includes(Object.keys(plugin), type);
		}).map(function (plugin) {
			return plugin[type];
		});
	};

	// run for each of the registered plugins
	var eachPlugins = function eachPlugins(type) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return getPlugins(type).forEach(function (plugin) {
			return plugin.apply(undefined, args);
		});
	};

	// run registered plugins but chain input -> output (sync)
	var chainPlugins = function chainPlugins(type) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		return getPlugins(type).reduce(function (args, plugin) {
			return [plugin.apply(undefined, _toConsumableArray(args))];
		}, args).shift();
	};

	// run on last registered plugin
	var runPlugin = function runPlugin(type) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			args[_key3 - 1] = arguments[_key3];
		}

		return getPlugins(type).pop().apply(undefined, args);
	};

	// default plugin configuration
	addPlugin({
		// select all elements that have modules assigned to them
		moduleSelector: function moduleSelector(context) {
			return context.querySelectorAll('[data-module]');
		},

		// returns the context query as defined on the element
		moduleGetContext: function moduleGetContext(element) {
			return element.dataset.context;
		},

		// load the referenced module, by default searches global scope for module name
		moduleImport: function moduleImport(name) {
			return new Promise(function (resolve, reject) {
				if (self[name]) return resolve(self[name]);
				// @exclude
				reject('Cannot find module with name "' + name + '". By default Conditioner will import modules from the global scope, make sure a function named "' + name + '" is defined on the window object. The scope of a function defined with `let` or `const` is limited to the <script> block in which it is defined.');
				// @endexclude
			});
		},

		// returns the module constructor, by default we assume the module returned is a factory function
		moduleGetConstructor: function moduleGetConstructor(module) {
			return module;
		},

		// returns the module destrutor, by default we assume the constructor exports a function
		moduleGetDestructor: function moduleGetDestructor(moduleExports) {
			return moduleExports;
		},

		// arguments to pass to the module constructor as array
		moduleSetConstructorArguments: function moduleSetConstructorArguments(name, element) {
			return [element];
		},

		// where to get name of module
		moduleGetName: function moduleGetName(element) {
			return element.dataset.module;
		},

		// default media query monitor
		monitor: {
			name: 'media',
			create: function create(context) {
				return self.matchMedia(context);
			}
		}
	});
});

/***/ }),

/***/ "./src/_js/modules lazy recursive ^\\.\\/.*$":
/*!******************************************************************************!*\
  !*** ./src/_js/modules/ lazy ^\.\/.*$ chunkName: [request] namespace object ***!
  \******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./ui/test": [
		"./src/_js/modules/ui/test.js",
		"ui-test"
	],
	"./ui/test.js": [
		"./src/_js/modules/ui/test.js",
		"ui-test"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function() { return Object.keys(map); };
webpackAsyncContext.id = "./src/_js/modules lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/_js/utilities/conditioner.js":
/*!******************************************!*\
  !*** ./src/_js/utilities/conditioner.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var conditioner_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! conditioner-core */ "./node_modules/conditioner-core/conditioner-core.js");
/* harmony import */ var conditioner_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(conditioner_core__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Import conditioner
 * As per: https://pqina.nl/conditioner/
 */


/* prettier-ignore */

/**
 * Configure conditioner to work with dynamic imports & webpack
 */
conditioner_core__WEBPACK_IMPORTED_MODULE_0__.addPlugin({
  // converts module aliases to paths
  moduleSetName: (name) => `${name}.js`,
  // get the module constructor
  moduleGetConstructor: (module) => module.default,
  // override the import
  moduleImport: (name) => __webpack_require__("./src/_js/modules lazy recursive ^\\.\\/.*$")("./" + name),
});

/**
 * Fire up the modules!
 */
conditioner_core__WEBPACK_IMPORTED_MODULE_0__.hydrate(document.documentElement);


/***/ }),

/***/ "./src/_js/utilities/setExtLinks.js":
/*!******************************************!*\
  !*** ./src/_js/utilities/setExtLinks.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Handles external links based on target="_blank"
 *
 * Adds rel="noopener" to the external links as per:
 * https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
 */

const setExtLinks = {
  init: (context = document) => {
    const links = context.querySelectorAll('a[target="_blank"]');
    setExtLinks.initAll(links);
  },

  initAll: (links) => {
    if (links) {
      [...links].forEach((link) => {
        link.setAttribute('rel', 'noopener');
      });
    }
  },
};

setExtLinks.init();

/* harmony default export */ __webpack_exports__["default"] = (setExtLinks);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".mjs";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "kumiko-product-language:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/js/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkumiko_product_language"] = self["webpackChunkkumiko_product_language"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/_js/entry.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities_conditioner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/conditioner */ "./src/_js/utilities/conditioner.js");
/* harmony import */ var _utilities_setExtLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/setExtLinks */ "./src/_js/utilities/setExtLinks.js");
/* your global dependencies */
// import 'MODULE_FROM_NPM';

/**
 * Utilities
 */



/* your components */
// import './components/YOUR_MODULE';

}();
/******/ })()
;
//# sourceMappingURL=bundle.mjs.map