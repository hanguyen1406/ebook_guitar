<?php
// Check if a POST request with JSON data has been received
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_SERVER["CONTENT_TYPE"]) && $_SERVER["CONTENT_TYPE"] === "application/json") {
    // Get JSON data from the request body
    $jsonPayload = file_get_contents("php://input");
    
    // Decode the JSON data
    $jsonData = json_decode($jsonPayload, true);
    
    if ($jsonData === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON data"]);
    } else {
        $index = fopen("index.html", "w");       
        
        // echo json_encode(["message" => $jsonData['index']]);
        if($index) {
            fwrite($index, $jsonData['index']);
        }

        echo json_encode(["message" => "JSON data saved successfully"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request"]);
}
?>
