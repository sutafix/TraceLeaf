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

/***/ "./src/common/overlay.js":
/*!*******************************!*\
  !*** ./src/common/overlay.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createOverlay: () => (/* binding */ createOverlay)\n/* harmony export */ });\n    // common/overlay.js\r\nfunction createOverlay() {\r\n  if (document.getElementById(\"traceleaf-co2-wrapper\")) {\r\n    return document.getElementById(\"traceleaf-co2\");\r\n  }\r\n\r\n  const wrapper = document.createElement(\"div\");\r\n  wrapper.id = \"traceleaf-co2-wrapper\";\r\n  wrapper.style.position = \"fixed\";\r\n  wrapper.style.bottom = \"10px\";\r\n  wrapper.style.right = \"10px\";\r\n  wrapper.style.zIndex = 9999;\r\n  wrapper.style.pointerEvents = \"none\"; // clique à travers\r\n\r\n  const overlay = document.createElement(\"div\");\r\n  overlay.id = \"traceleaf-co2\";\r\n  overlay.style.background = \"rgba(0, 128, 0, 0.9)\";\r\n  overlay.style.color = \"white\";\r\n  overlay.style.padding = \"10px 14px\";\r\n  overlay.style.borderRadius = \"12px\";\r\n  overlay.style.fontSize = \"14px\";\r\n  overlay.style.fontFamily = \"Arial, sans-serif\";\r\n  overlay.style.transition = \"opacity 0.3s ease\";\r\n  overlay.style.opacity = \"8\";\r\n  overlay.style.pointerEvents = \"auto\";\r\n\r\n  overlay.addEventListener(\"mouseenter\", () => {\r\n    overlay.style.opacity = \"0.3\";\r\n    overlay.style.pointerEvents = \"none\";\r\n  });\r\n\r\n  overlay.addEventListener(\"mouseleave\", () => {\r\n    overlay.style.opacity = \"8\";\r\n    overlay.style.pointerEvents = \"auto\";\r\n  });\r\n\r\n  wrapper.appendChild(overlay);\r\n  document.body.appendChild(wrapper);\r\n\r\n  return overlay;\r\n}\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/common/overlay.js?");

/***/ }),

/***/ "./src/sites/youtube.js":
/*!******************************!*\
  !*** ./src/sites/youtube.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_overlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/overlay.js */ \"./src/common/overlay.js\");\n// sites/youtube.js\r\n\r\n\r\nconsole.log(\"[TraceLeaf] 🧪 YouTube tracker actif\");\r\n\r\nlet currentUrl = location.href;\r\nlet isPlaying = false;\r\nlet lastTick = Date.now();\r\nlet interval;\r\nconst resolutionDurations = {};\r\nlet overlay = null;\r\n\r\nfunction estimateCO2Rate(res) {\r\n  if (res.includes(\"2560\") || res.includes(\"3840\")) return 0.8;\r\n  if (res.includes(\"1920\") || res.includes(\"1080\")) return 0.4;\r\n  if (res.includes(\"1280\") || res.includes(\"720\")) return 0.2;\r\n  if (res.includes(\"640\") || res.includes(\"360\")) return 0.1;\r\n  if (res.includes(\"256\") || res.includes(\"144\")) return 0.05;\r\n  return 0.1;\r\n}\r\n\r\nfunction getQuality() {\r\n  const video = document.querySelector(\"video\");\r\n  return video ? `${video.videoWidth}x${video.videoHeight}` : \"Inconnu\";\r\n}\r\n\r\nfunction updateOverlay() {\r\n  if (!overlay) return;\r\n\r\n  const now = Date.now();\r\n  const delta = Math.floor((now - lastTick) / 1000);\r\n  lastTick = now;\r\n\r\n  const quality = getQuality();\r\n  if (isPlaying && quality !== \"Inconnu\") {\r\n    resolutionDurations[quality] = (resolutionDurations[quality] || 0) + delta;\r\n  }\r\n\r\n  let totalCO2 = 0;\r\n  for (const [res, seconds] of Object.entries(resolutionDurations)) {\r\n    const rate = estimateCO2Rate(res) / 60;\r\n    totalCO2 += seconds * rate;\r\n  }\r\n\r\n  overlay.innerText = `🌿 ${totalCO2.toFixed(3)} gCO₂ | ${quality} | ${isPlaying ? \"▶️\" : \"⏸️\"}`;\r\n}\r\n\r\nfunction setupVideoTracking() {\r\n  const video = document.querySelector(\"video\");\r\n  if (!video || video.__traceleaf_initialized) return;\r\n\r\n  console.log(\"[TraceLeaf] 🎬 Vidéo détectée\");\r\n  video.__traceleaf_initialized = true;\r\n  overlay = (0,_common_overlay_js__WEBPACK_IMPORTED_MODULE_0__.createOverlay)();\r\n\r\n  isPlaying = !video.paused;\r\n  video.addEventListener(\"play\", () => {\r\n    isPlaying = true;\r\n    lastTick = Date.now();\r\n    console.log(\"[TraceLeaf] ▶️ Lecture\");\r\n  });\r\n\r\n  video.addEventListener(\"pause\", () => {\r\n    isPlaying = false;\r\n    console.log(\"[TraceLeaf] ⏸️ Pause\");\r\n  });\r\n\r\n  if (interval) clearInterval(interval);\r\n  lastTick = Date.now();\r\n  interval = setInterval(updateOverlay, 5000);\r\n}\r\n\r\nconst detectUrlChange = () => {\r\n  const newUrl = location.href;\r\n  if (newUrl !== currentUrl) {\r\n    console.log(\"[TraceLeaf] 🔁 URL changée → relance tracking\");\r\n    currentUrl = newUrl;\r\n    setTimeout(setupVideoTracking, 1000);\r\n  }\r\n};\r\n\r\nconst mutationObserver = new MutationObserver(() => {\r\n  setupVideoTracking();\r\n  detectUrlChange();\r\n});\r\n\r\nmutationObserver.observe(document.body, {\r\n  childList: true,\r\n  subtree: true,\r\n});\r\n\r\nsetTimeout(setupVideoTracking, 1000);\r\n\r\nwindow.addEventListener(\"beforeunload\", () => {\r\n  clearInterval(interval);\r\n  let totalCO2 = 0;\r\n  for (const [res, seconds] of Object.entries(resolutionDurations)) {\r\n    const rate = estimateCO2Rate(res) / 60;\r\n    const g = seconds * rate;\r\n    totalCO2 += g;\r\n    console.log(`📊 ${res} : ${Math.round(seconds / 60)} min ≈ ${g.toFixed(2)} gCO₂`);\r\n  }\r\n  console.log(`[TraceLeaf] 💡 Total session ≈ ${totalCO2.toFixed(2)} gCO₂`);\r\n});\r\n\n\n//# sourceURL=webpack://traceleaf_extension/./src/sites/youtube.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/sites/youtube.js");
/******/ 	
/******/ })()
;