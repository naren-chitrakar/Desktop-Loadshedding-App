<?php
//$groupId = $_POST['groupId'];
//if ( $groupId < 1 || $groupId > 7 )
//    die( "get the fuck out of here");
//$groupId = 1;
//Start Time are counted from the as minutes from the start of the day
//Duration is the number of minutes the light is going to be off
$scheduleArr = array(
    1 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '600'
                    )
                )
            )
    ),
    2 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    ),
    3 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    ),
    4 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    ),
    5 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    ),
    6 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    ),
    7 => array(
            'sun' => array(
                array(
                    array(
                        'startTime' => '300',
                        'duration' => '300'
                    ),
                    array(
                        'startTime' => '700',
                        'duration' => '300'
                    )
                )
            )
    )
);
die( json_encode( $scheduleArr ) );

