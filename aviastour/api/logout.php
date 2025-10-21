<?php
header('Content-Type: text/plain; charset=utf-8');
require 'db.php';

echo "✅ Conexión exitosa a la base de datos: formulariocrud\n\n";

// Verificar tabla usuarios
$result = $conn->query("SHOW TABLES");
if ($result && $result->num_rows > 0) {
    echo "Tablas encontradas:\n";
    while ($row = $result->fetch_row()) {
        echo " - " . $row[0] . "\n";
    }
} else {
    echo "⚠️ No se encontraron tablas.\n";
}

echo "\nPrueba de consulta rápida (usuarios):\n";
$q = $conn->query("SELECT usuario, rol FROM usuarios LIMIT 5");
if ($q && $q->num_rows > 0) {
    while ($u = $q->fetch_assoc()) {
        echo "• {$u['usuario']} ({$u['rol']})\n";
    }
} else {
    echo "⚠️ No hay usuarios en la tabla.\n";
}
