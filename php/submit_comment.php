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

// Retrieve name and comment from the POST request
$name = isset($_POST['name']) ? $_POST['name'] : ''; // Retrieve name from form data
$comment = $_POST['comment'] ?? '';

// Validate if name is empty and set it to "Unknown" if it is
if (empty($name)) {
    $name = "Unknown";
}

// Set default profilepic value
$profilepic = 'img/avatar.png';

// Prepare SQL statement to insert the comment into the database
$sql = "INSERT INTO comments (profilepic, name, comment) VALUES ('$profilepic', '$name', '$comment')";

if ($conn->query($sql) === TRUE) {
    echo "Comment added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
