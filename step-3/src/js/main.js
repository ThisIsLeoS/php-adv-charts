var queryStringParams = new URLSearchParams(window.location.search);
var accessLvl = queryStringParams.get("level");

// if the query string is empty, the access level will be "guest"
if (accessLvl === null) accessLvl = "guest";

getData();

function getData() {
    $.ajax({
        "url": "getChartsByAccessLvl.php",
        "method": "GET",
        "data": {
            "level": accessLvl,
        },
        "success": function(charts) {
            if (accessLvl === "guest") prepareAndPrintFatturato(charts.fatturato);
            else if (accessLvl === "employee") {
                prepareAndPrintFatturato(charts.fatturato);
                prepareAndPrintFatturatoByAgent(charts.fatturato_by_agent);
            }
            else if (accessLvl === "clevel") {
                prepareAndPrintFatturato(charts.fatturato);
                prepareAndPrintFatturatoByAgent(charts.fatturato_by_agent);
                prepareAndPrintTeamEfficiency(charts.team_efficiency);
            }
        },
        "error": function (iqXHR, textStatus, errorThrown) {
            alert(
                "iqXHR.status: " + iqXHR.status + "\n" +
                "textStatus: " + textStatus + "\n" +
                "errorThrown: " + errorThrown
            );
        },
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
            "datasets": datasets,
        },
        "options": {
            "maintainAspectRatio": false,
            "responsive": true,
            "scales": scales,
        },
    });
}

function getFatturatoDatasets(data, labels) {
    return [
        {
            "data": data,
            "label": labels,
            "backgroundColor": "rgb(135,206,250)",
            "borderColor": "rgb(0,191,255)",
        },
    ];
}

function getFatturatoByAgentDatasets(data, labels) {
    return [
        {
            "data": data,
            "label": labels,
            "backgroundColor": "rgb(255,165,0)",
            "borderColor": "rgb(255,69,0)",
        },
    ];
}


function getTeamEfficiencyDatasets(data, labels) {
    return [
        {
            "data": data[0],
            "label": labels[0],
            "backgroundColor": "rgba(135,206,250,.2)",
            "borderColor": "rgb(0,191,255)",
        },
        {
            "data": data[1],
            "label": labels[1],
            "backgroundColor": "rgba(255,165,0,.2)",
            "borderColor": "rgb(255,69,0)",
        },
        {
            "data": data[2],
            "label": labels[2],
            "backgroundColor": "rgba(144,238,144,.2)",
            "borderColor": "rgb(0,128,0)",
        },
    ];
}

function getFatturatoScales() {
    return {
        "yAxes": [{
            "ticks": {
                "beginAtZero": true,
            },
        }],
    };
}

function getFatturatoByAgentScales() {
    return {};
}

function getTeamEfficiencyScales() {
    return {
        "yAxes": [{
            "ticks": {
                "beginAtZero": true,
            },
        }],
    };
}
