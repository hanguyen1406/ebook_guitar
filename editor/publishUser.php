<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the POST request
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data)) {
        $textInput = json_encode($data->textInput);

        $data = $data->data;

        $file = fopen("../user/index.html", "w");
        $textInputFile = fopen("../user/text-input.json", "w");

        if ($file && $textInputFile) {
            // Write the data to the file
            fwrite($file, $data);
            fclose($file);

            fwrite($textInputFile, $textInput);
            fclose($textInputFile);

            echo "Published!";
        } else {
            echo "Failed to publish.";
        }
    } else {
        echo "Data is empty.";
    }
} else {
    echo "Invalid request.";
}

?>