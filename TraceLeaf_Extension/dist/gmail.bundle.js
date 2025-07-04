/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/api.js":
/*!***************************!*\
  !*** ./src/common/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendSessionData: () => (/* binding */ sendSessionData)\n/* harmony export */ });\n// common/api.js\r\n\r\nconst API_ENDPOINT = \"https://rave-gou@iiens.net/api/session\"; // adapte à ton domaine\r\n\r\nasync function sendSessionData(site, resolutionDurations, timestamp = Date.now()) {\r\n  const payload = {\r\n    site,\r\n    timestamp,\r\n    session: Object.entries(resolutionDurations).map(([res, duration]) => ({\r\n      resolution: res,\r\n      duration_seconds: duration\r\n    }))\r\n  };\r\n\r\n  try {\r\n    const res = await fetch(API_ENDPOINT, {\r\n      method: \"POST\",\r\n      headers: { \"Content-Type\": \"application/json\" },\r\n      body: JSON.stringify(payload)\r\n    });\r\n\r\n    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);\r\n    console.log(\"[TraceLeaf] ✅ Session envoyée avec succès\");\r\n  } catch (err) {\r\n    console.error(\"[TraceLeaf] ❌ Échec de l’envoi :\", err);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/common/api.js?");

/***/ }),

/***/ "./src/common/overlay.js":
/*!*******************************!*\
  !*** ./src/common/overlay.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createOverlay: () => (/* binding */ createOverlay)\n/* harmony export */ });\n    // common/overlay.js\r\nfunction createOverlay() {\r\n  if (document.getElementById(\"traceleaf-co2-wrapper\")) {\r\n    return document.getElementById(\"traceleaf-co2\");\r\n  }\r\n\r\n  const wrapper = document.createElement(\"div\");\r\n  wrapper.id = \"traceleaf-co2-wrapper\";\r\n  wrapper.style.position = \"fixed\";\r\n  wrapper.style.bottom = \"10px\";\r\n  wrapper.style.right = \"10px\";\r\n  wrapper.style.zIndex = 9999;\r\n  wrapper.style.pointerEvents = \"none\"; // clique à travers\r\n\r\n  const overlay = document.createElement(\"div\");\r\n  overlay.id = \"traceleaf-co2\";\r\n  overlay.style.background = \"rgba(0, 128, 0, 0.9)\";\r\n  overlay.style.color = \"white\";\r\n  overlay.style.padding = \"10px 14px\";\r\n  overlay.style.borderRadius = \"12px\";\r\n  overlay.style.fontSize = \"14px\";\r\n  overlay.style.fontFamily = \"Arial, sans-serif\";\r\n  overlay.style.transition = \"opacity 0.3s ease\";\r\n  overlay.style.opacity = \"8\";\r\n  overlay.style.pointerEvents = \"auto\";\r\n\r\n  overlay.addEventListener(\"mouseenter\", () => {\r\n    overlay.style.opacity = \"0.3\";\r\n    overlay.style.pointerEvents = \"none\";\r\n  });\r\n\r\n  overlay.addEventListener(\"mouseleave\", () => {\r\n    overlay.style.opacity = \"8\";\r\n    overlay.style.pointerEvents = \"auto\";\r\n  });\r\n\r\n  wrapper.appendChild(overlay);\r\n  document.body.appendChild(wrapper);\r\n\r\n  return overlay;\r\n}\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/common/overlay.js?");

/***/ }),

/***/ "./src/common/utils.js":
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDomain: () => (/* binding */ getDomain),\n/* harmony export */   secondsToTimeString: () => (/* binding */ secondsToTimeString)\n/* harmony export */ });\n// common/utils.js\r\nfunction secondsToTimeString(seconds) {\r\n  const mins = Math.floor(seconds / 60);\r\n  const secs = seconds % 60;\r\n  return `${mins}m ${secs}s`;\r\n}\r\n\r\nfunction getDomain() {\r\n  return window.location.hostname.replace(\"www.\", \"\");\r\n}\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/common/utils.js?");

/***/ }),

/***/ "./src/sites/gmail.js":
/*!****************************!*\
  !*** ./src/sites/gmail.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_overlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/overlay.js */ \"./src/common/overlay.js\");\n/* harmony import */ var _common_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/api.js */ \"./src/common/api.js\");\n/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/utils.js */ \"./src/common/utils.js\");\n// sites/gmail.js\r\n\r\n\r\n\r\n\r\nconsole.log(\"[TraceLeaf] 📬 Gmail tracker actif\");\r\n\r\nfunction estimateEmailCO2(hasAttachment) {\r\n  if (hasAttachment) return 50;\r\n  return 4; // estimation pour un mail standard\r\n}\r\n\r\nfunction parseInbox() {\r\n  const mails = [...document.querySelectorAll(\"tr.zA\")]; // Gmail rows\r\n  let count = 0;\r\n  let totalCO2 = 0;\r\n  for (const mailRow of mails) {\r\n    const hasAttach = mailRow.querySelector(\"img[alt='Pièce jointe']\") ||\r\n                      mailRow.querySelector(\"span.aQ\"); // étiquette 'PJ'\r\n    count++;\r\n    totalCO2 += estimateEmailCO2(!!hasAttach);\r\n  }\r\n  return { count, totalCO2 };\r\n}\r\n\r\nfunction refreshOverlay() {\r\n  const { count, totalCO2 } = parseInbox();\r\n  overlay.innerText = `✉️ ${count} mails ≈ ${totalCO2.toFixed(1)} gCO₂`;\r\n}\r\n\r\nconst overlay = (0,_common_overlay_js__WEBPACK_IMPORTED_MODULE_0__.createOverlay)();\r\noverlay.innerText = \"📬 Analyse de l’inbox en cours…\";\r\nlet observer = new MutationObserver(refreshOverlay);\r\nobserver.observe(document.body, { subtree: true, childList: true });\r\nsetTimeout(refreshOverlay, 2000);\r\n\r\nwindow.addEventListener(\"beforeunload\", () => {\r\n  const { count, totalCO2 } = parseInbox();\r\n  console.log(`[TraceLeaf] Gmail : ${count} mails ≈ ${totalCO2.toFixed(1)} gCO₂`);\r\n  (0,_common_api_js__WEBPACK_IMPORTED_MODULE_1__.sendSessionData)((0,_common_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDomain)(), { gmail: totalCO2 });\r\n});\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/sites/gmail.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/sites/gmail.js");
/******/ 	
/******/ })()
;