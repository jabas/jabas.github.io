"use strict";
(self["webpackChunkkumiko_product_language"] = self["webpackChunkkumiko_product_language"] || []).push([["ui-test"],{

/***/ "./src/_js/modules/ui/test.js":
/*!************************************!*\
  !*** ./src/_js/modules/ui/test.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// define a new class
class YourClass {
  // init class, i.e. store DOM elements
  constructor($element) {
    this.$element = $element;
  }

  init() {
    // kick-off methods, i.e. add event handlers
    this.YourMethod();
  }

  YourMethod() {
    // DOM manipulation happens here
    this.$element.textContent = 'Component mounted';
  }
}

/* harmony default export */ __webpack_exports__["default"] = (($element) => {
  const inst = new YourClass($element);
  inst.init();
});


/***/ })

}]);
//# sourceMappingURL=ui-test.mjs.map