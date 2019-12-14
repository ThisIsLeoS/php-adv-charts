getData();

function getData() {
    $.ajax({
        "url": "getAllMatches.php",
        "method": "GET",
        "success": function(data) {
            parseData(data);
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
            "datasets": [
                getChartDatasets(type, data)
            ],
        },
        "options": {
            "maintainAspectRatio": false,
            "responsive": true,
            "scales": {
                "yAxes": [{
                    "ticks": {
                        "beginAtZero": true,
                    }
                }],
            }
        },
    });
}

function getChartDatasets(type, data) {
    var dataSets = {
        "data": data,
    };

    // properties specific for the line chart
    if (type === "line") {
        dataSets.label = "sales";
        dataSets.backgroundColor = "rgb(135,206,250)";
        dataSets.borderColor = "rgb(0,191,255)";
    }

    // properties specific for the pie chart
    if (type === "pie") {
        dataSets.backgroundColor = "rgb(255,165,0)";
        dataSets.borderColor = "rgb(255,69,0)";
    }

    return dataSets;
}
