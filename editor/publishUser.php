<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the POST request
    $data = file_get_contents('php://input');
    
    if (!empty($data)) {
       
        $file = fopen("../user/index.html", "w");

        if ($file) {
            // Write the data to the file
            fwrite($file, $data);
            fclose($file);
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