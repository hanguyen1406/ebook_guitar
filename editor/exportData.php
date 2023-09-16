<?php
    $index ="index.html";

    $data = array(
        "index" => file_get_contents($index),
        
    );

    $jsonObject = json_encode($data);

    // Output the JSON object
    echo $jsonObject;

?>