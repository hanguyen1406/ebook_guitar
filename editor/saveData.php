<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the POST request
    $data = file_get_contents('php://input');
    
    if (!empty($data)) {
       
        $file = fopen("index.html", "w");

        if ($file) {
            // Write the data to the file
            fwrite($file, $data . "\n");
            fclose($file);
            echo "Data saved successfully!";
        } else {
            echo "Failed to open the file for writing.";
        }
    } else {
        echo "Data is empty.";
    }
} else {
    echo "Invalid request.";
}
?>
