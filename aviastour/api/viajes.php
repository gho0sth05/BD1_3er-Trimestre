<?php
header('Content-Type: application/json');
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// ===============================
// 🔹 GET: listar viajes
// ===============================
if ($method === 'GET') {
    $res = $conn->query("SELECT * FROM viajes ORDER BY fecha_viaje ASC");
    $viajes = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'viajes' => $viajes]);
    exit;
}

// ===============================
// 🔹 POST: crear viaje
// ===============================
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $destino = $data['destino'] ?? '';
    $provincia = $data['provincia'] ?? '';
    $fecha = $data['fecha_viaje'] ?? '';
    $precio = floatval($data['precio'] ?? 0);
    $imagen = $data['imagen'] ?? '';
    $estado = $data['estado'] ?? 'Disponible';

    if (!$destino || !$provincia || !$fecha || !$precio) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos del viaje']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO viajes (destino, provincia, fecha_viaje, precio, imagen, estado) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiss", $destino, $provincia, $fecha, $precio, $imagen, $estado);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Viaje creado correctamente']);
    exit;
}

// ===============================
// 🔹 PUT: actualizar viaje
// ===============================
if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id_viaje'] ?? 0);
    $destino = $data['destino'] ?? '';
    $provincia = $data['provincia'] ?? '';
    $fecha = $data['fecha_viaje'] ?? '';
    $precio = floatval($data['precio'] ?? 0);
    $imagen = $data['imagen'] ?? '';
    $estado = $data['estado'] ?? '';

    if (!$id || !$destino || !$provincia || !$fecha || !$precio) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos para editar']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE viajes SET destino=?, provincia=?, fecha_viaje=?, precio=?, imagen=?, estado=? WHERE id_viaje=?");
    $stmt->bind_param("sssissi", $destino, $provincia, $fecha, $precio, $imagen, $estado, $id);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Viaje actualizado correctamente']);
    exit;
}

// ===============================
// 🔹 DELETE: eliminar viaje
// ===============================
if ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $id = intval($data['id_viaje'] ?? 0);

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID de viaje inválido']);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM viajes WHERE id_viaje=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Viaje eliminado correctamente']);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Método no permitido']);
?>
