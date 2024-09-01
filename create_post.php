<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "blog_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Validate inputs
$title = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';

if (empty($title) || empty($content)) {
    echo json_encode(["status" => "error", "message" => "Title and content are required."]);
    exit;
}

// Insert post into the database
$stmt = $conn->prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
$stmt->bind_param("ss", $title, $content);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Post created successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error creating post."]);
}

$stmt->close();
$conn->close();

?>
