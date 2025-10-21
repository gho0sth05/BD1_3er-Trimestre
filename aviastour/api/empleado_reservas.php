<?php
header('Content-Type: application/json');
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT r.id_reserva, c.nombre AS cliente, r.destino, r.provincia, r.fecha_viaje, r.estado
            FROM reservas r
            JOIN compania c ON r.id_cliente = c.id_nombre
            ORDER BY r.fecha_viaje DESC";
    $res = $conn->query($sql);
    echo json_encode(['success' => true, 'reservas' => $res->fetch_all(MYSQLI_ASSOC)]);
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id_reserva'] ?? 0);
    $estado = $data['estado'] ?? '';

    $stmt = $conn->prepare("UPDATE reservas SET estado=? WHERE id_reserva=?");
    $stmt->bind_param("si", $estado, $id);
    $stmt->execute();
    echo json_encode(['success' => true]);
    exit;
}
?>
