<?php
    header('Content-Type: application/json');
    include "data.php";
    echo json_encode($data);