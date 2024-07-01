<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields data
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Validate input
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        // If any field is empty, return error
        $response = array("response" => "error", "message" => "All fields are required.");
        echo json_encode($response);
        exit;
    }

    // You can perform additional validation here

    // Send email (example)
    $to = "aqibcareer007@gmail.com";
    $headers = "From: $name <$email>" . "\r\n";
    $message_body = "Subject: $subject\n\n$message";
    
    if (mail($to, $subject, $message_body, $headers)) {
        // If email sent successfully, return success response
        $response = array("response" => "success");
        echo json_encode($response);
    } else {
        // If there's an error sending email, return error response
        $response = array("response" => "error", "message" => "Error sending message. Please try again later.");
        echo json_encode($response);
    }
} else {
    // If accessed directly, return error response
    $response = array("response" => "error", "message" => "Access denied.");
    echo json_encode($response);
}
?>
