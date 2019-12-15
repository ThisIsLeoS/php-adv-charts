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

/***/ "./step-3/src/js/main.js":
/*!*******************************!*\
  !*** ./step-3/src/js/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var queryStringParams = new URLSearchParams(window.location.search);
var accessLvl = queryStringParams.get("level"); // if the query string is empty, the access level will be "guest"

if (accessLvl === null) accessLvl = "guest";
getData();

function getData() {
  $.ajax({
    "url": "getChartsByAccessLvl.php",
    "method": "GET",
    "data": {
      "level": accessLvl
    },
    "success": function success(charts) {
      if (accessLvl === "guest") prepareAndPrintFatturato(charts.fatturato);else if (accessLvl === "employee") {
        prepareAndPrintFatturato(charts.fatturato);
        prepareAndPrintFatturatoByAgent(charts.fatturato_by_agent);
      } else if (accessLvl === "clevel") {
        prepareAndPrintFatturato(charts.fatturato);
        prepareAndPrintFatturatoByAgent(charts.fatturato_by_agent);
        prepareAndPrintTeamEfficiency(charts.team_efficiency);
      }
    },
    "error": function error(iqXHR, textStatus, errorThrown) {
      alert("iqXHR.status: " + iqXHR.status + "\n" + "textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }
  });
}

function prepareAndPrintFatturato(fatturato) {
  var datasets = getFatturatoDatasets(fatturato.data, "sales");
  var scales = getFatturatoScales();
  printChart(fatturato.type, moment.months(), datasets, scales);
}

function prepareAndPrintFatturatoByAgent(fatturatoByAgent) {
  var labels = Object.keys(fatturatoByAgent.data);
  var datasets = getFatturatoByAgentDatasets(Object.values(fatturatoByAgent.data), "");
  var scales = getFatturatoByAgentScales();
  printChart(fatturatoByAgent.type, labels, datasets, scales);
}

function prepareAndPrintTeamEfficiency(teamEfficiency) {
  var datasetsData = Object.values(teamEfficiency.data);
  var datasetsLabels = Object.keys(teamEfficiency.data);
  var datasets = getTeamEfficiencyDatasets(datasetsData, datasetsLabels);
  var scales = getTeamEfficiencyScales();
  printChart(teamEfficiency.type, moment.months(), datasets, scales);
}

function printChart(type, labels, datasets, scales) {
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
      "datasets": datasets
    },
    "options": {
      "maintainAspectRatio": false,
      "responsive": true,
      "scales": scales
    }
  });
}

function getFatturatoDatasets(data, labels) {
  return [{
    "data": data,
    "label": labels,
    "backgroundColor": "rgb(135,206,250)",
    "borderColor": "rgb(0,191,255)"
  }];
}

function getFatturatoByAgentDatasets(data, labels) {
  return [{
    "data": data,
    "label": labels,
    "backgroundColor": "rgb(255,165,0)",
    "borderColor": "rgb(255,69,0)"
  }];
}

function getTeamEfficiencyDatasets(data, labels) {
  return [{
    "data": data[0],
    "label": labels[0],
    "backgroundColor": "rgba(135,206,250,.2)",
    "borderColor": "rgb(0,191,255)"
  }, {
    "data": data[1],
    "label": labels[1],
    "backgroundColor": "rgba(255,165,0,.2)",
    "borderColor": "rgb(255,69,0)"
  }, {
    "data": data[2],
    "label": labels[2],
    "backgroundColor": "rgba(144,238,144,.2)",
    "borderColor": "rgb(0,128,0)"
  }];
}

function getFatturatoScales() {
  return {
    "yAxes": [{
      "ticks": {
        "beginAtZero": true
      }
    }]
  };
}

function getFatturatoByAgentScales() {
  return {
    "yAxes": [{
      "ticks": {
        "beginAtZero": true,
        "display": false
      },
      "gridLines": {
        "display": false
      }
    }]
  };
}

function getTeamEfficiencyScales() {
  return {
    "yAxes": [{
      "ticks": {
        "beginAtZero": true
      }
    }]
  };
}

/***/ }),

/***/ "./step-3/src/scss/master.scss":
/*!*************************************!*\
  !*** ./step-3/src/scss/master.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************************************!*\
  !*** multi ./step-3/src/js/main.js ./step-3/src/scss/master.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Leo\Documenti Leo\Boolean\Corso\Esercizi\20191212 -13- PHP advanced chart\php-adv-charts\step-3\src\js\main.js */"./step-3/src/js/main.js");
module.exports = __webpack_require__(/*! D:\Leo\Documenti Leo\Boolean\Corso\Esercizi\20191212 -13- PHP advanced chart\php-adv-charts\step-3\src\scss\master.scss */"./step-3/src/scss/master.scss");


/***/ })

/******/ });