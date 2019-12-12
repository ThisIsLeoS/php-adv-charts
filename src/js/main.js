// @ts-check

getData();

function getData() {
    $.ajax({
        "url": "getAllMatches.php",
        "method": "GET",
        "success": function(data) {
            printChart(data);
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

function printChart(data) {
    var ctx = document.getElementsByClassName("chart")[0].getContext('2d');
    Chart.defaults.global.defaultFontSize = 14;
    var chart = new Chart(ctx, {
        "type": 'line',
        "data": {
            "labels": moment.months(),
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
        },
    });
}
