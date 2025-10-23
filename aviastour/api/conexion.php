<?php
$servername = "localhost";
$username = "root";
$password = ""; // en XAMPP normalmente vacío
$database = "formulariocrud";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>
