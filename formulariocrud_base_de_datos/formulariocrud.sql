-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2025 a las 09:08:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `formulariocrud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_reservas`
--

CREATE TABLE `auditoria_reservas` (
  `id_auditoria` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `accion` enum('UPDATE','DELETE') DEFAULT NULL,
  `fecha_accion` datetime DEFAULT current_timestamp(),
  `detalles` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `auditoria_reservas`
--

INSERT INTO `auditoria_reservas` (`id_auditoria`, `id_reserva`, `usuario`, `accion`, `fecha_accion`, `detalles`) VALUES
(1, 3, 'root@localhost', 'UPDATE', '2025-10-21 01:12:38', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(2, 4, 'root@localhost', 'UPDATE', '2025-10-21 01:13:22', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(3, 1, 'root@localhost', 'UPDATE', '2025-10-21 01:54:11', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(4, 1, 'root@localhost', 'UPDATE', '2025-10-21 01:54:12', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(5, 2, 'root@localhost', 'UPDATE', '2025-10-21 01:55:34', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compania`
--

CREATE TABLE `compania` (
  `id_nombre` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `vip` enum('Sí','No') DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compania`
--

INSERT INTO `compania` (`id_nombre`, `nombre`, `edad`, `fecha`, `vip`) VALUES
(1, 'Juan Pérez', 32, '2025-10-19', 'Sí'),
(2, 'María López', 28, '2025-09-10', 'No'),
(3, 'Laura Gómez', 25, '2025-10-20', 'No'),
(4, 'Test', 25, '2025-10-20', 'No'),
(5, 'Test', 30, '2025-10-20', 'No'),
(6, 'karen gonzalez', 17, '2025-10-20', 'No'),
(7, 'lolaaa', 19, '2025-10-20', 'No'),
(8, 'karen gonzalezz', 19, '2025-10-20', 'No'),
(9, 'pepitaa lopex', 18, '2025-10-20', 'No'),
(10, 'pepita montana', 19, '2025-10-20', 'No'),
(11, 'pepita lola', 48, '2025-10-20', 'No'),
(12, 'karennnn', 48, '2025-10-20', 'Sí'),
(13, 'Sofía López', 24, '2025-10-20', 'No'),
(14, 'lolaas', 15, '2025-10-20', 'No'),
(15, 'María Torres', 30, '2025-10-20', 'No'),
(16, 'karmen', 16, '2025-10-20', 'No'),
(17, 'lolaas', 778, '2025-10-20', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `destino` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `fecha_viaje` date NOT NULL,
  `estado` enum('Pendiente','Confirmada','Cancelada') DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_cliente`, `destino`, `provincia`, `fecha_viaje`, `estado`) VALUES
(1, 1, 'Cartagena', 'Bolívar', '2025-12-10', 'Cancelada'),
(2, 2, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada'),
(3, 11, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada'),
(4, 11, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada'),
(5, 8, 'Cartagena', 'Bolívar', '2025-12-10', 'Pendiente');

--
-- Disparadores `reservas`
--
DELIMITER $$
CREATE TRIGGER `auditoria_reserva_delete` AFTER DELETE ON `reservas` FOR EACH ROW BEGIN
  INSERT INTO auditoria_reservas (id_reserva, usuario, accion, detalles)
  VALUES (OLD.id_reserva, USER(), 'DELETE',
          CONCAT('Reserva eliminada: destino "', OLD.destino, '", provincia "', OLD.provincia, '"'));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `auditoria_reserva_update` AFTER UPDATE ON `reservas` FOR EACH ROW BEGIN
  INSERT INTO auditoria_reservas (id_reserva, usuario, accion, detalles)
  VALUES (OLD.id_reserva, USER(), 'UPDATE',
          CONCAT('Reserva modificada: destino de "', OLD.destino, '" a "', NEW.destino, '", provincia "', NEW.provincia, '"'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `privilegios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`, `privilegios`) VALUES
(1, 'Administrador', 'Gestiona toda la base de datos', 'ALL PRIVILEGES'),
(2, 'Empleado', 'Gestiona reservas', 'SELECT, INSERT, UPDATE'),
(3, 'Cliente', 'Crea y consulta sus reservas', 'SELECT, INSERT en reservas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` enum('Administrador','Empleado','Cliente') DEFAULT 'Cliente',
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `contraseña`, `rol`, `id_cliente`) VALUES
(1, 'admin_viajes', 'admin123', 'Administrador', NULL),
(2, 'empleado_viajes', 'empleado123', 'Empleado', NULL),
(3, 'cliente_viajes', 'cliente123', 'Cliente', NULL),
(4, 'laurag', '123456', 'Cliente', 6),
(5, 'lolaaa71', '123456', 'Cliente', 7),
(6, 'camilaaa', '123456', 'Cliente', 8),
(7, 'lopex', '123456', 'Administrador', 9),
(8, 'pepitas', '123456', 'Administrador', 10),
(9, 'pepitasa', '123456', 'Cliente', 11),
(10, 'loloo', '123456', 'Empleado', 12),
(11, 'sofia24', '123456', 'Empleado', 13),
(12, 'lolaaa70', '123456', 'Empleado', 14),
(13, 'mariat', '123456', 'Cliente', 15),
(14, 'karmesa', '123456', 'Cliente', 16),
(15, 'camilaaas', '123456', 'Empleado', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id_viaje` int(11) NOT NULL,
  `destino` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `fecha_viaje` date NOT NULL,
  `precio` decimal(12,2) NOT NULL,
  `imagen` text DEFAULT NULL,
  `estado` enum('Disponible','No Disponible') DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id_viaje`, `destino`, `provincia`, `fecha_viaje`, `precio`, `imagen`, `estado`) VALUES
(1, 'Cartagena', 'Bolívar', '2025-12-10', 1200000.00, 'https://images.unsplash.com/photo-1589391886645-d51941b9f5e4?w=800', 'Disponible'),
(2, 'Medellín', 'Antioquia', '2025-11-25', 950000.00, 'https://images.unsplash.com/photo-1581167754154-8d2f77b36f03?w=800', 'Disponible'),
(3, 'San Andrés', 'Archipiélago', '2025-12-22', 1450000.00, 'https://images.unsplash.com/photo-1605648916334-61a32a1c2b1a?w=800', 'Disponible'),
(4, 'Bogotá', 'Cundinamarca', '2025-10-28', 800000.00, 'https://images.unsplash.com/photo-1614252862447-c1f0bbf0cdbd?w=800', 'Disponible'),
(5, 'Pereira', 'Risaralda', '2025-11-30', 870000.00, 'https://images.unsplash.com/photo-1613747153669-3e3f0e279a52?w=800', 'Disponible'),
(6, 'Santa Marta', 'Magdalena', '2025-12-05', 1100000.00, 'https://images.unsplash.com/photo-1602431130698-c1ec1ec9f1e1?w=800', 'Disponible'),
(7, 'Cali', 'Valle del Cauca', '2025-12-15', 980000.00, 'https://images.unsplash.com/photo-1599946942471-b3c0b28ef8c2?w=800', 'Disponible'),
(8, 'Barranquilla', 'Atlántico', '2025-11-18', 890000.00, 'https://images.unsplash.com/photo-1595922820061-6a8f7c776c79?w=800', 'Disponible');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria_reservas`
--
ALTER TABLE `auditoria_reservas`
  ADD PRIMARY KEY (`id_auditoria`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `compania`
--
ALTER TABLE `compania`
  ADD PRIMARY KEY (`id_nombre`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id_viaje`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auditoria_reservas`
--
ALTER TABLE `auditoria_reservas`
  MODIFY `id_auditoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `compania`
--
ALTER TABLE `compania`
  MODIFY `id_nombre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id_viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auditoria_reservas`
--
ALTER TABLE `auditoria_reservas`
  ADD CONSTRAINT `auditoria_reservas_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `compania` (`id_nombre`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `compania` (`id_nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
