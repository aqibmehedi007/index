<?php
// Database connection
$servername = "jupiter";
$username = "aqibmeh1_mysite";
$password = "Aqib#123456789";
$dbname = "aqibmeh1_mysite";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to select all comments ordered by id in descending order
$sql = "SELECT * FROM comments ORDER BY id DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data); // Output comments in JSON format
} else {
    echo "0 results";
}

$conn->close();
?>
