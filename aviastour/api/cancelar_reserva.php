<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id_reserva = intval($data['id_reserva'] ?? 0);

if (!$id_reserva) {
    echo json_encode(['success' => false, 'message' => 'Falta el ID de la reserva']);
    exit;
}

$stmt = $conn->prepare("UPDATE reservas SET estado='Cancelada' WHERE id_reserva=?");
$stmt->bind_param("i", $id_reserva);
$stmt->execute();

echo json_encode([
    'success' => true,
    'message' => 'Reserva cancelada correctamente'
]);
?>
