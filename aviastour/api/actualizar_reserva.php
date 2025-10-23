<?php
header('Content-Type: application/json; charset=utf-8');
require 'db.php';

// Solo aceptar método PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Leer datos enviados en formato JSON
$data = json_decode(file_get_contents("php://input"), true);
$id_reserva = intval($data['id_reserva'] ?? 0);
$estado = $data['estado'] ?? '';

if (!$id_reserva || !$estado) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

// Actualizar estado de la reserva
$stmt = $conn->prepare("UPDATE reservas SET estado = ? WHERE id_reserva = ?");
$stmt->bind_param("si", $estado, $id_reserva);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Reserva actualizada correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar la reserva']);
}
?>
