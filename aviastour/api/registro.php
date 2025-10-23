<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'] ?? '';
$edad = intval($data['edad'] ?? 0);
$usuario = $data['usuario'] ?? '';
$password = $data['password'] ?? '';
$vip = $data['vip'] ?? 'No';
$rol = $data['rol'] ?? 'Cliente'; // ✅ Nuevo

if (!$nombre || !$edad || !$usuario || !$password || !$rol) {
    echo json_encode(['success' => false, 'message' => 'Campos incompletos']);
    exit;
}

// Insertar en compania
$stmt1 = $conn->prepare("INSERT INTO compania (nombre, edad, fecha, vip) VALUES (?, ?, CURDATE(), ?)");
$stmt1->bind_param("sis", $nombre, $edad, $vip);
$stmt1->execute();
$idCliente = $stmt1->insert_id;

// Insertar en usuarios (con rol seleccionado)
$stmt2 = $conn->prepare("INSERT INTO usuarios (usuario, contraseña, rol, id_cliente) VALUES (?, ?, ?, ?)");
$stmt2->bind_param("sssi", $usuario, $password, $rol, $idCliente);
$stmt2->execute();

echo json_encode([
    'success' => true,
    'message' => 'Registro exitoso',
    'user' => [
        'usuario' => $usuario,
        'rol' => $rol,
        'id_cliente' => $idCliente
    ]
]);
?>

