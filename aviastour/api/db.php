<?php
header('Content-Type: application/json; charset=utf-8');

// Configuración de conexión
$host = 'localhost';
$user = 'root'; // Usuario de XAMPP
$pass = '';     // Contraseña por defecto vacía
$db   = 'formulariocrud';

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión: ' . $conn->connect_error
    ]));
}

$conn->set_charset('utf8mb4');
?>



