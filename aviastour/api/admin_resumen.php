<?php
header('Content-Type: application/json');
require 'db.php';

$stats = [
    'usuarios' => $conn->query("SELECT COUNT(*) AS c FROM usuarios")->fetch_assoc()['c'],
    'reservas' => $conn->query("SELECT COUNT(*) AS c FROM reservas")->fetch_assoc()['c'],
    'pendientes' => $conn->query("SELECT COUNT(*) AS c FROM reservas WHERE estado='Pendiente'")->fetch_assoc()['c'],
    'confirmadas' => $conn->query("SELECT COUNT(*) AS c FROM reservas WHERE estado='Confirmada'")->fetch_assoc()['c'],
];

echo json_encode(['success' => true, 'stats' => $stats]);
?>
