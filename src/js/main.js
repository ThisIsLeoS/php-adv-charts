// @ts-check

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
        labels.push(label);
        salesNums.push(fatturatoByAgent.data[label]);
    }
    printChart(fatturatoByAgent.type, salesNums, labels);
}

function printChart(type, data, labels) {
    var ctx = "chart-" + type;
    Chart.defaults.global.defaultFontSize = 14;
    var chart = new Chart(ctx, {
        "type": type,
        "data": {
            "labels": labels,
            "datasets": [{
                "label": '# of sales',
                "backgroundColor": 'rgb(135,206,250)',
                "borderColor": 'rgb(0,191,255)',
                "data": data,
            }]
        },
        "options": {
            "maintainAspectRatio": false,
            "responsive": true,
            "scales": {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }],
            }
        },
    });
}
