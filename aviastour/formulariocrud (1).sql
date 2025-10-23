-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2025 a las 04:16:06
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
(5, 2, 'root@localhost', 'UPDATE', '2025-10-21 01:55:34', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(6, 7, 'root@localhost', 'UPDATE', '2025-10-21 03:59:49', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(7, 6, 'root@localhost', 'UPDATE', '2025-10-21 04:15:21', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(8, 5, 'root@localhost', 'UPDATE', '2025-10-21 04:48:34', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(9, 5, 'root@localhost', 'UPDATE', '2025-10-21 07:18:12', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(10, 8, 'root@localhost', 'UPDATE', '2025-10-21 07:18:15', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(11, 16, 'root@localhost', 'UPDATE', '2025-10-22 21:00:13', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(12, 13, 'root@localhost', 'UPDATE', '2025-10-22 21:02:11', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(13, 11, 'root@localhost', 'UPDATE', '2025-10-22 21:02:13', 'Reserva modificada: destino de \"Cartagena\" a \"Cartagena\", provincia \"Bolívar\"'),
(14, 15, 'root@localhost', 'UPDATE', '2025-10-22 21:02:13', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(15, 14, 'root@localhost', 'UPDATE', '2025-10-22 21:02:15', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(16, 12, 'root@localhost', 'UPDATE', '2025-10-22 21:02:15', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(17, 10, 'root@localhost', 'UPDATE', '2025-10-22 21:02:17', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(18, 9, 'root@localhost', 'UPDATE', '2025-10-22 21:02:17', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(19, 19, 'root@localhost', 'UPDATE', '2025-10-22 21:04:07', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(20, 18, 'root@localhost', 'UPDATE', '2025-10-22 21:04:09', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(21, 17, 'root@localhost', 'UPDATE', '2025-10-22 21:04:13', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"'),
(22, 20, 'root@localhost', 'UPDATE', '2025-10-22 21:04:38', 'Reserva modificada: destino de \"Medellín\" a \"Medellín\", provincia \"Antioquia\"');

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
(19, 'Camilo', 15, '2025-10-21', 'Sí'),
(20, 'jesus', 54, '2025-10-21', 'Sí'),
(21, 'laura', 18, '2025-10-22', 'Sí'),
(22, 'Amanda', 46, '2025-10-22', 'Sí'),
(23, 'Anderson', 20, '2025-10-22', 'No');

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
  `estado` enum('Pendiente','Confirmada','Cancelada') DEFAULT 'Pendiente',
  `id_viaje` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_cliente`, `destino`, `provincia`, `fecha_viaje`, `estado`, `id_viaje`) VALUES
(1, 1, 'Cartagena', 'Bolívar', '2025-12-10', 'Cancelada', NULL),
(2, 2, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(3, 11, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(4, 11, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(5, 8, 'Cartagena', 'Bolívar', '2025-12-10', 'Cancelada', NULL),
(6, 16, 'Cartagena', 'Bolívar', '2025-12-10', 'Cancelada', NULL),
(7, 16, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(8, 16, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(9, 16, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(10, 16, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(11, 16, 'Cartagena', 'Bolívar', '2025-12-10', 'Confirmada', NULL),
(12, 20, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(13, 20, 'Cartagena', 'Bolívar', '2025-12-10', 'Confirmada', NULL),
(14, 20, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(15, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Confirmada', NULL),
(16, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(17, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(18, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(19, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(20, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Cancelada', NULL),
(21, 22, 'Medellín', 'Antioquia', '2025-11-25', 'Pendiente', NULL),
(22, 23, 'Medellín', 'Antioquia', '2025-11-25', 'Pendiente', NULL);

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
(17, 'cami', 'qwer', 'Empleado', 19),
(18, 'Jesus', '1234', 'Cliente', 20),
(19, 'Laura', '123456', 'Administrador', 21),
(20, 'Amanda', 'asd', 'Cliente', 22),
(21, 'Anderson', '123456', 'Cliente', 23);

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
(14, 'Bogota', 'Cundinamarca', '2026-11-22', 852000.00, 'https://bogota.gov.co/sites/default/files/styles/1050px/public/2023-08/bogota_5.jpeg', 'Disponible'),
(15, 'Barranquilla', 'Atlantico', '2025-11-17', 890000.00, 'https://probarranquilla.org/wp-content/uploads/2022/10/Banner-barranquilla5.jpg', 'Disponible'),
(19, 'Medelli', 'Antioquia', '2025-11-17', 795000.00, 'https://caracol.com.co/resizer/v2/QEXZDVMAYZPXLOM23QEXI4YYJQ.jpg?auth=0acf5ae6fc83b83f453ef3cf7448a56f5035b70686f8de30489f73dfc43e9312&width=650&height=488&quality=70&smart=true', 'Disponible'),
(22, 'Pereira', 'Risaralda', '2026-09-11', 870000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn1NjhQidxmFxvoz-AeamfQT17GX5LT6LiBg&s', 'Disponible'),
(23, 'San Andres', 'Archipiélago', '2026-01-22', 1100000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGt5J6xFL11Na6Y0GvjnMtwcXptpEzcPP5gA&s', 'Disponible'),
(24, 'Cali', 'Valle del Cauca', '2026-03-13', 762000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ss9VeIm7kyTc9YtHyt4Vg48m0p7L7RIfiw&s', 'Disponible'),
(25, 'Cartagena ', 'Bolivar', '2025-10-25', 1120000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiY0BpiWpeGaLqEhUBfvcvgu5La4SdizJe3A&s', 'Disponible'),
(26, 'Santa Marta', 'Magdalena', '2025-12-10', 932000.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWtmu5PRqa3vAir1l2UkXmdIcmfkOSPm6FQ&s', 'Disponible');

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
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `fk_reserva_viaje` (`id_viaje`);

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
  MODIFY `id_auditoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `compania`
--
ALTER TABLE `compania`
  MODIFY `id_nombre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id_viaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
  ADD CONSTRAINT `fk_reserva_viaje` FOREIGN KEY (`id_viaje`) REFERENCES `viajes` (`id_viaje`),
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
