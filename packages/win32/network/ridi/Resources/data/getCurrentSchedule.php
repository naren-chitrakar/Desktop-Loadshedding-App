<?php

$scheduleArr =
        array(
            'hr' => 3,
            'min' => 30
);

$remMinute = $scheduleArr['min'] - $_REQUEST['thisMinute'];
$remHour = $scheduleArr['hr'] - $_REQUEST['thisHour'];

if ( $remMinute < 0 ) {
    $remHour =  $remHour - 1;
    $remMinute = ( 60 -  $remMinute );
}

if ( $remHour < 0 ) {
    $remHour = $remHour + 24;
}

    
$returnArr = array(
    'minute' => $remMinute,
    'hour' => $remHour
);
die(json_encode($returnArr));
?>