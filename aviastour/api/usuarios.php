<?php
header('Content-Type: application/json');
require 'db.php';

$sql = "SELECT id_usuario, usuario, rol FROM usuarios ORDER BY rol";
$res = $conn->query($sql);
$usuarios = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode([
    'success' => true,
    'usuarios' => $usuarios
]);
?>
