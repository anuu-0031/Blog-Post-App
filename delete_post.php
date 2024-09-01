<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "blog_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$post_id = $_POST['id'] ?? '';

if (empty($post_id)) {
    echo json_encode(["status" => "error", "message" => "Post ID is required."]);
    exit;
}

// Delete post from the database
$stmt = $conn->prepare("DELETE FROM posts WHERE id = ?");
$stmt->bind_param("i", $post_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Post deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error deleting post."]);
}

$stmt->close();
$conn->close();
?>
