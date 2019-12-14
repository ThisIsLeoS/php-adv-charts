/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

getData();

function getData() {
  $.ajax({
    "url": "getAllMatches.php",
    "method": "GET",
    "success": function success(data) {
      parseData(data);
    },
    "error": function error(iqXHR, textStatus, errorThrown) {
      alert("iqXHR.status: " + iqXHR.status + "\n" + "textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }
  });
}

function parseData(data) {
  var fatturato = data.fatturato;
  var fatturatoByAgent = data.fatturato_by_agent;
  var labels = [];
  var salesNums = [];
  printChart(fatturato.type, fatturato.data, moment.months());

  for (var label in fatturatoByAgent.data) {
    if (fatturatoByAgent.data.hasOwnProperty.call(fatturatoByAgent.data, label)) {
      labels.push(label);
      salesNums.push(fatturatoByAgent.data[label]);
    }
  }

  printChart(fatturatoByAgent.type, salesNums, labels);
}

function printChart(type, data, labels) {
  // the chart template is cloned and appended
  var docFragment = $("#chart-template").prop("content");
  var chartTemplate = $(docFragment).children(".chart-container").clone();
  $("main").append(chartTemplate);
  var ctx = chartTemplate.children("canvas");
  Chart.defaults.global.defaultFontSize = 14;
  var chart = new Chart(ctx, {
    "type": type,
    "data": {
      "labels": labels,
      "datasets": [getChartDatasets(type, data)]
    },
    "options": {
      "maintainAspectRatio": false,
      "responsive": true,
      "scales": {
        "yAxes": [{
          "ticks": {
            "beginAtZero": true
          }
        }]
      }
    }
  });
}

function getChartDatasets(type, data) {
  var dataSets = {
    "data": data
  }; // properties specific for the line chart

  if (type === "line") {
    dataSets.label = "sales";
    dataSets.backgroundColor = "rgb(135,206,250)";
    dataSets.borderColor = "rgb(0,191,255)";
  } // properties specific for the pie chart


  if (type === "pie") {
    dataSets.backgroundColor = "rgb(255,165,0)";
    dataSets.borderColor = "rgb(255,69,0)";
  }

  return dataSets;
}

/***/ }),

/***/ "./src/scss/master.scss":
/*!******************************!*\
  !*** ./src/scss/master.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/main.js ./src/scss/master.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Leo\Documenti Leo\Boolean\Corso\Esercizi\20191212 -13- PHP advanced chart\php-adv-charts\src\js\main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! D:\Leo\Documenti Leo\Boolean\Corso\Esercizi\20191212 -13- PHP advanced chart\php-adv-charts\src\scss\master.scss */"./src/scss/master.scss");


/***/ })

/******/ });