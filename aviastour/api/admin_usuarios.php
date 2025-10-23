<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $res = $conn->query("SELECT id_usuario, usuario, rol FROM usuarios");
    echo json_encode(['success' => true, 'usuarios' => $res->fetch_all(MYSQLI_ASSOC)]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id_usuario'] ?? 0);
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id_usuario=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(['success' => true]);
    exit;
}
?>
