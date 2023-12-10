<?php
$data = json_decode(file_get_contents("php://input"));
$jsonData = file_get_contents('text-input.json');

$textInput = json_decode($jsonData, true);

if ($data) {
    $index = intval($data->index);
    echo $textInput[$index];
    
}
?>
