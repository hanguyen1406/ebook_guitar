<?php
$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $index = $data->index;
    echo 'hello: '.$index;
    
}
?>
