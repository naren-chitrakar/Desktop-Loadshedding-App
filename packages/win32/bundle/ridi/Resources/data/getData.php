<?

$groupId = $_POST['groupId'];
$scheduleArr = array(
    1 => array(
        'schedule' =>
        array(
            "sun" => array(
                array(
                    array(
                        "1:30 AM - 2:30 PM"
                    ),
                    array(
                        "4:30 AM - 5:30 PM"
                    )
                )
            ),
            "mon" => array(
                array(
                    array(
                        "1:30 AM - 2:30 PM"
                    ),
                    array(
                        "4:30 AM - 5:30 PM"
                    )
                )
            ),
            "tue" => array(
                array(
                    array(
                        "1:30 AM - 2:30 PM"
                    ),
                    array(
                        "4:30 AM - 5:30 PM"
                    )
                )
            ),
            "wed" => array(
                array(
                    array(
                        "1:30 AM - 2:30 AM"
                    ),
                    array(
                        "4:30 PM - 5:30 PM"
                    )
                )
            ),
            "thu" => array(
                array(
                    array(
                        "1:30 AM - 2:30 PM"
                    ),
                    array(
                        "4:30 PM - 5:30 PM"
                    )
                )
            ),
            "fri" => array(
                array(
                    array(
                        "1:30 AM- 2:30 PM"
                    ),
                    array(
                        "4:30 AM- 5:30 PM"
                    )
                )
            ),
            "Sat" => array(
                array(
                    array(
                        "1:30 AM- 2:30 PM"
                    ),
                    array(
                        "4:30 AM- 5:30 PM"
                    )
                )
            ),
        ),
    )
);
die(json_encode($scheduleArr[1]));
?>