<?php
    header('Content-Type: application/json');
    include "data-charts.php";
    $accessLvl = $_GET["level"];
    $filteredCharts = filterChartsByAccessLvl($accessLvl, $charts);
    echo json_encode($filteredCharts);

    function filterChartsByAccessLvl($accessLvl, $charts) {
        $filteredCharts = $charts;
        if ($accessLvl === "guest") {
            /* the elements with access level "employee" or "clevel" are removed from the array */
            foreach ($filteredCharts as $chartName => $chartData) {
                if ($chartData["access"] === "employee" || $chartData["access"] === "clevel") {
                    unset($filteredCharts[$chartName]);
                }
            }
        }
        else if ($accessLvl === "employee") {
            // the elements with access level "clevel" are removed from the array
            foreach ($filteredCharts as $chartName => $chartData) {
                if ($chartData["access"] === "clevel") unset($filteredCharts[$chartName]);
            }
        }
        return $filteredCharts;
    }
?>