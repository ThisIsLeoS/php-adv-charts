<?php
    header('Content-Type: application/json');
    include "data-charts.php";
    $accessLvl = $_GET["level"];
    $filteredCharts = filterChartsByAccessLvl($accessLvl, $charts);
    echo json_encode($filteredCharts);

    function filterChartsByAccessLvl($accessLvl, $charts) {
        $filteredCharts = [];
        if ($accessLvl === "guest") {
            // push into the array all the charts with access level "guest"
            foreach ($charts as $chartName => $chart) {
                if ($chart["access"] === "guest") $filteredCharts[$chartName] = $chart;
            }
        }
        else if ($accessLvl === "employee") {
            // push into the array all the charts with access level "guest" or "employee"
            foreach ($charts as $chartName => $chart) {
                if ($chart["access"] === "guest" || $chart["access"] === "employee") {
                    $filteredCharts[$chartName] = $chart;
                }
            }
        }
        else if ($accessLvl === "clevel") {
            // copy all the elements into the array
            $filteredCharts = $charts;
        }
        return $filteredCharts;
    }
?>