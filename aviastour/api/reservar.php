<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id_cliente = intval($data['id_cliente'] ?? 0);
$id_viaje = intval($data['id_viaje'] ?? 0);

if (!$id_cliente || !$id_viaje) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

// ✅ Buscar el viaje correcto en la tabla viajes
$qViaje = $conn->prepare("SELECT destino, provincia, fecha_viaje FROM viajes WHERE id_viaje=?");
$qViaje->bind_param("i", $id_viaje);
$qViaje->execute();
$v = $qViaje->get_result()->fetch_assoc();

if (!$v) {
    echo json_encode(['success' => false, 'message' => 'Viaje no encontrado']);
    exit;
}

// ✅ Insertar nueva reserva con los datos del viaje
$stmt = $conn->prepare("INSERT INTO reservas (id_cliente, destino, provincia, fecha_viaje, estado)
                        VALUES (?, ?, ?, ?, 'Pendiente')");
$stmt->bind_param("isss", $id_cliente, $v['destino'], $v['provincia'], $v['fecha_viaje']);
$stmt->execute();

echo json_encode([
    'success' => true,
    'message' => 'Reserva creada exitosamente',
    'id_reserva' => $stmt->insert_id
]);
?>
