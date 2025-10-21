<?php
header('Content-Type: application/json');
require 'db.php';

// ✅ Aceptar solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido (usa POST)'
    ]);
    exit;
}

// ✅ Leer el cuerpo JSON
$data = json_decode(file_get_contents("php://input"), true);

$usuario = $data['usuario'] ?? '';
$password = $data['password'] ?? '';

if (!$usuario || !$password) {
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos de usuario o contraseña'
    ]);
    exit;
}

// ✅ Buscar usuario
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Usuario no encontrado'
    ]);
    exit;
}

$user = $result->fetch_assoc();

// ⚠️ En producción usa password_hash() / password_verify()
if ($password !== $user['contraseña']) {
    echo json_encode([
        'success' => false,
        'message' => 'Contraseña incorrecta'
    ]);
    exit;
}

// ✅ Login correcto
echo json_encode([
    'success' => true,
    'message' => 'Inicio de sesión exitoso',
    'user' => [
        'id_usuario' => $user['id_usuario'],
        'usuario' => $user['usuario'],
        'rol' => $user['rol'],
        'id_cliente' => $user['id_cliente'] ?? null
    ]
]);
?>
  echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}
