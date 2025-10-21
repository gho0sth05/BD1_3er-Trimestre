# BD1_3er-Trimestre
# ✈️ Aviastour - Sistema de Gestión de Viajes Aéreos

**Aviastour** es un sistema web desarrollado en **PHP**, **MySQL**, **HTML**, **CSS** y **JavaScript** para la gestión de reservas aéreas.  
Incluye paneles diferenciados para **Administrador**, **Empleado** y **Cliente**, con autenticación, control de roles, auditoría y manejo de base de datos relacional.

---

## 🚀 Características Principales

### 👤 Roles del sistema
- **Administrador**
  - Gestiona usuarios, roles y viajes.
  - Consulta y supervisa todas las reservas.
  - Control total sobre el sistema.

- **Empleado**
  - Consulta viajes disponibles.
  - Gestiona y actualiza el estado de las reservas (Confirmar / Cancelar).

- **Cliente**
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
│   └── actualizar_reserva.php
|_api/empleado
||_consult.php
| |__reservas.php
│
├── css/
│   ├── administrador.css
│   ├── cliente.css
│   ├── empleado.css
│   ├── index.css
│   ├── inicio.css
│   └── registro.css
|    
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
└── 
```

---

## 🗄️ Base de Datos: `formulariocrud`

La base de datos contiene las siguientes tablas:

- **compania** → Registro de clientes
- **usuarios** → Cuentas de acceso con roles
- **reservas** → Reservas de viajes
- **roles** → Definición de permisos
- **auditoria_reservas** → Registro automático de cambios

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
```

---

## 💻 Instalación Local (XAMPP o Laragon)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/aviastour.git
   ```

2. Mueve la carpeta al directorio `htdocs`:
   ```bash
   C:\xampp\htdocs\aviastour
   ```

3. Importa la base de datos:
   - Abre **phpMyAdmin**
   - Crea una base llamada `formulariocrud`
   - Importa el archivo `database/formulariocrud.sql`

4. Configura la conexión en `api/db.php`:
   ```php
   $host = 'localhost';
   $user = 'root';
   $pass = '';
   $db   = 'formulariocrud';
   ```

5. Inicia Apache y MySQL en XAMPP.

6. Abre en tu navegador:
   ```bash
   http://localhost/aviastour/html/inicio.html
   ```

---

## 🔐 Credenciales de Prueba

| Rol | Usuario | Contraseña |
|------|----------|-------------|
| Administrador | admin_viajes | admin123 |
| Empleado | empleado_viajes | empleado123 |
| Cliente | cliente_viajes | cliente123 |

---

## 🧠 Tecnologías Utilizadas

| Categoría | Tecnologías |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript ,TailwindCSS.|
| **Backend** | PHP |
| **Base de Datos** | MySQL |
| **Servidor Local** | XAMPP |
| **Control de Versiones** | Git / GitHub |

---

## 🧾 Autor

**Desarrollado por:** karen Gonzalez y Laura Fonseca   
🌍 Proyecto académico / tecgbologo de programacion de software

---


---

> ✈️ *“Aviastour: Tu viaje comienza aquí. Gestiona, reserva y vuela con confianza.”*
