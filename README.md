# 🛫 BD1_3er-Trimestre — Aviastour  
### ✈️ *Sistema de Gestión de Viajes Aéreos*

**Aviastour** es un sistema web desarrollado en **PHP**, **MySQL**, **HTML**, **CSS** y **JavaScript** para la **gestión de reservas aéreas**.  
El sistema ofrece **paneles diferenciados** para **Administrador**, **Empleado** y **Cliente**, con autenticación, control de roles, auditoría y base de datos relacional.

---

## 🚀 Características Principales

### 👤 Roles del Sistema

#### 🧑‍💼 Administrador
- Gestiona usuarios, roles y viajes.  
- Supervisa todas las reservas.  
- Tiene control total sobre el sistema.

#### 👷 Empleado
- Consulta viajes disponibles.  
- Gestiona y actualiza el estado de las reservas (Confirmar / Cancelar).

#### 🧍 Cliente
- Visualiza el catálogo de viajes con imágenes.  
- Crea nuevas reservas de forma sencilla.  
- Consulta y cancela sus reservas existentes.

---

## 🧩 Estructura del Proyecto

```

aviastour/
│
├── api/
│   ├── auth.php
│   ├── db.php
│   ├── viajes.php
│   ├── reservas.php
│   ├── mis_reservas.php
│   ├── reservar.php
│   ├── cancelar_reserva.php
│   ├── empleado_reservas.php
│   ├── actualizar_reserva.php
│   └── empleado/
│       ├── consult.php
│       └── reservas.php
│
├── css/
│   ├── administrador.css
│   ├── cliente.css
│   ├── empleado.css
│   ├── index.css
│   ├── inicio.css
│   └── registro.css
│
├── html/
│   ├── administrador.html
│   ├── cliente.html
│   ├── empleado.html
│   ├── index.html
│   ├── inicio.html
│   └── registro.html
│
├── js/
│   ├── utils.js
│   ├── administrador.js
│   ├── cliente.js
│   ├── empleado.js
│   ├── index.js
│   ├── inicio.js
│   └── registro.js
│
├── public/
│   └── logo.jpg
│
└── database/
└── formulariocrud.sql

````

---

## 🗄️ Base de Datos: `formulariocrud`

La base de datos está compuesta por las siguientes tablas:

| Tabla | Descripción |
|--------|--------------|
| **compania** | Registro de clientes. |
| **usuarios** | Cuentas de acceso con sus roles. |
| **reservas** | Información de reservas realizadas. |
| **roles** | Definición de permisos por tipo de usuario. |
| **auditoria_reservas** | Registro automático de cambios en las reservas. |

---

### 🎯 Trigger de Auditoría

```sql
CREATE TRIGGER auditoria_reserva_update
AFTER UPDATE ON reservas
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_reservas (id_reserva, usuario, accion, detalles)
  VALUES (
    OLD.id_reserva,
    USER(),
    'UPDATE',
    CONCAT('Reserva modificada: estado "', OLD.estado, '" → "', NEW.estado, '"')
  );
END;
````

---

## ⚙️ Instalación Local (XAMPP o Laragon)

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/aviastour.git
   ```

2. **Mover la carpeta al directorio `htdocs`:**

   ```bash
   C:\xampp\htdocs\aviastour
   ```

3. **Importar la base de datos:**

   * Abre **phpMyAdmin**
   * Crea una base de datos llamada `formulariocrud`
   * Importa el archivo `database/formulariocrud.sql`

4. **Configurar conexión en `api/db.php`:**

   ```php
   $host = 'localhost';
   $user = 'root';
   $pass = '';
   $db   = 'formulariocrud';
   ```

5. **Iniciar Apache y MySQL** en XAMPP.

6. **Abrir en el navegador:**

   ```
   http://localhost/aviastour/html/inicio.html
   ```

---

## 🔐 Credenciales de Prueba

| Rol                 | Usuario         | Contraseña  |
| ------------------- | --------------- | ----------- |
| 🧑‍💼 Administrador | admin_viajes    | admin123    |
| 👷 Empleado         | empleado_viajes | empleado123 |
| 🧍 Cliente          | cliente_viajes  | cliente123  |

---

## 🧠 Tecnologías Utilizadas

| Categoría                | Tecnologías                          |
| ------------------------ | ------------------------------------ |
| **Frontend**             | HTML5, CSS3, JavaScript, TailwindCSS |
| **Backend**              | PHP                                  |
| **Base de Datos**        | MySQL                                |
| **Servidor Local**       | XAMPP                                |
| **Control de Versiones** | Git / GitHub                         |

---

## 🎨 Mockup del Proyecto

🔗 **[Ver diseño en Figma](https://www.figma.com/proto/nlPMHXNGcbGAUnCuHI4uUg/Sin-t%C3%ADtulo?node-id=0-1&t=T59f5kfRhGGfvhRl-1)**

---
## 📍 Mapa de navegacion 
```

Inicio (index.html)
│
├── Registro (registro.html)
│
├── Inicio de sesión (inicio.html) ──> según credenciales →
│       ├── Panel Administrador (administrador.html)
│       │       ├── Gestión de Usuarios
│       │       ├── Gestión de Roles
│       │       ├── Gestión de Viajes
│       │       └── Consultar Reservas
│       │
│       ├── Panel Empleado (empleado.html)
│       │       ├── Ver Viajes Disponibles
│       │       ├── Ver Reservas de Clientes
│       │       └── Actualizar Estado de Reserva (Confirmar/Cancelar)
│       │
│       └── Panel Cliente (cliente.html)
│               ├── Ver Catálogo de Viajes
│               ├── Crear Reserva
│               ├── Ver Mis Reservas
│               └── Cancelar Reserva
│
└── Cerrar Sesión → vuelve a Inicio
````

---

## 🧾 Autores

**Desarrollado por:**
👩‍💻 *Karen González*
👩‍💻 *Laura Fonseca*

📚 Proyecto académico — *Tecnología en Programación de Software*
🏛️ **Servicio Nacional de Aprendizaje (SENA)**

---

> ✈️ *“Aviastour: Tu viaje comienza aquí. Gestiona, reserva y vuela con confianza.”*


