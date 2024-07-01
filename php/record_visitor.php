<?php
// Database connection parameters
$servername = "jupiter";
$username = "aqibmeh1_mysite";
$password = "Aqib#123456789";
$dbname = "aqibmeh1_mysite";

// Establish a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get visitor's IP address
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip_address = $_SERVER['REMOTE_ADDR'];
}

// Get visitor's device name
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$device_name = "Unknown";
if (strpos($user_agent, 'iPhone') !== false || strpos($user_agent, 'iPad') !== false) {
    $device_name = 'iPhone/iPad';
} elseif (strpos($user_agent, 'Android') !== false) {
    $device_name = 'Android';
} elseif (strpos($user_agent, 'Windows') !== false) {
    $device_name = 'Windows';
} elseif (strpos($user_agent, 'Macintosh') !== false) {
    $device_name = 'Macintosh';
} elseif (strpos($user_agent, 'Linux') !== false) {
    $device_name = 'Linux';
}

// Get visitor's browser (You may replace this with a more robust browser detection method)
$browser = $_SERVER['HTTP_USER_AGENT'];

// Get visitor's location (You may replace this with a different geolocation service)
$location_data = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$ip_address));
$city = $location_data['geoplugin_city'];
$region = $location_data['geoplugin_region'];
$country = $location_data['geoplugin_countryName'];

// Prepare SQL statement to insert visitor data into the database
$sql = "INSERT INTO visitor (ip_address, device_name, browser, city, region, country)
        VALUES ('$ip_address', '$device_name', '$browser', '$city', '$region', '$country')";

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    // Log success message
    error_log("Visitor information inserted successfully into the database.");
} else {
    // Log error message if insertion fails
    error_log("Error inserting visitor information into the database: " . $conn->error);
}

// Close the database connection
$conn->close();
?>
