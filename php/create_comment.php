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

// Retrieve comment data from POST request
$name = $_POST['name'];
$comment = $_POST['comment'];
$profilepic = $_POST['profilepic'];

// Prepare SQL statement to insert comment into database
$sql = "INSERT INTO comments (profilepic, name, comment) VALUES ('$profilepic', '$name', '$comment')";

if ($conn->query($sql) === TRUE) {
    echo "Comment added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
