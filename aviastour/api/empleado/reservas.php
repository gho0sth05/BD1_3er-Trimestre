<?php
header('Content-Type: application/json');
require '../db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Listar todas las reservas con nombre de cliente
    $sql = "SELECT r.id_reserva, c.nombre AS cliente_nombre, r.destino, r.provincia, 
                   r.fecha_viaje, r.estado
            FROM reservas r
            JOIN compania c ON r.id_cliente = c.id_nombre";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

if ($method === 'PUT') {
    // Actualizar estado de reserva
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id_reserva'] ?? 0);
    $estado = $data['estado'] ?? '';

    if (!$id || !$estado) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE reservas SET estado=? WHERE id_reserva=?");
    $stmt->bind_param("si", $estado, $id);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Reserva actualizada']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Método no permitido']);


