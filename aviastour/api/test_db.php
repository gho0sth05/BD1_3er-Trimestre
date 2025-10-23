<?php
header('Content-Type: text/plain; charset=utf-8');
require 'db.php';

echo "✅ Conexión exitosa a la base de datos: formulariocrud\n\n";

$result = $conn->query("SHOW TABLES");
if ($result && $result->num_rows > 0) {
    echo "Tablas encontradas:\n";
    while ($row = $result->fetch_row()) {
        echo " - " . $row[0] . "\n";
    }
} else {
    echo "⚠️ No se encontraron tablas.\n";
}