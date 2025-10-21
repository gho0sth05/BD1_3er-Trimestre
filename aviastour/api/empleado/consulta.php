<?php
header('Content-Type: application/json');
require '../db.php';

// Obtener lista de destinos y provincias únicos
$query = "SELECT DISTINCT destino, provincia FROM reservas";
$res = $conn->query($query);
$destinos = $res->fetch_all(MYSQLI_ASSOC);

// Calcular estadísticas
$stats = [
    'total' => $conn->query("SELECT COUNT(*) AS c FROM reservas")->fetch_assoc()['c'],
    'pendientes' => $conn->query("SELECT COUNT(*) AS c FROM reservas WHERE estado='Pendiente'")->fetch_assoc()['c'],
    'confirmadas' => $conn->query("SELECT COUNT(*) AS c FROM reservas WHERE estado='Confirmada'")->fetch_assoc()['c']
];

echo json_encode([
    'success' => true,
    'destinos' => $destinos,
    'estadisticas' => $stats
]);



