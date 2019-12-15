<?php
  $charts = [
    'fatturato' => [
        'type' => 'line',
        'data' => [1000,1322,1123,2301,3288,988,502,2300,5332,2300,1233,2322],
        'access' => 'guest'
    ],
    'fatturato_by_agent' => [
      'type' => 'pie',
      'data' => [
        'Marco' => 9000,
        'Giuseppe' => 4000,
        'Mattia' => 3200,
        'Alberto' => 2300
      ],    
      'access' => 'employee'
    ],
    'team_efficiency' => [
      'type' => 'line',
      'data' => [
        'Team1' => [1,0.8,0.7,0.5,0.7,0.8,0.9,0.5,0.6,1,0.3,0.9],
        'Team2' => [0.3,0.6,0.8,0.3,0.6,0.5,0.8,0.7,0.3,0.5,0.6,1],
        'Team3' => [0.2,0.1,0.5,0.1,0.6,0.5,0.4,0.6,0.3,0.4,0.5,0.7],
      ],
      'access' => 'clevel'
    ],
  ];
