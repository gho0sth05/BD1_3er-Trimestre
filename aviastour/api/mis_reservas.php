<?php
header('Content-Type: application/json');
require 'db.php';

$id_cliente = intval($_GET['id_cliente'] ?? 0);

if (!$id_cliente) {
    echo json_encode(['success' => false, 'message' => 'Falta el ID del cliente']);
    exit;
}

try {
    $sql = "SELECT id_reserva, destino, provincia, fecha_viaje, estado
            FROM reservas
            WHERE id_cliente = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_cliente);
    $stmt->execute();
    $result = $stmt->get_result();

    $reservas = [];
    while ($r = $result->fetch_assoc()) {
        $reservas[] = $r;
    }

    echo json_encode(['success' => true, 'reservas' => $reservas]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
