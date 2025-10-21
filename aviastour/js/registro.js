localStorage.removeItem("aviastour_user");

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("aviastour_user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      Utils.redirectByRole(user);
      return;
    } catch {
      localStorage.removeItem("aviastour_user");
    }
  }

  document
    .getElementById("registerForm")
    .addEventListener("submit", handleRegister);
});

async function handleRegister(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value, 10);
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const vip = document.getElementById("vip").value;
  const rol = document.getElementById("rol").value;

  if (!nombre || !edad || !usuario || !password || !rol) {
    showError("Completa todos los campos requeridos.");
    return;
  }

  const payload = { nombre, edad, usuario, password, vip, rol };
  const btn =
    e.submitter ||
    document.querySelector('#registerForm button[type="submit"]');

  try {
    if (btn) btn.disabled = true;

    const res = await fetch("../api/registro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      if (data.user) {
        localStorage.setItem("aviastour_user", JSON.stringify(data.user));
        showSuccess(data.message || "Registro exitoso. Redirigiendo...");
        setTimeout(() => Utils.redirectByRole(data.user), 1500);
      } else {
        showSuccess(data.message || "Registro exitoso.");
        setTimeout(() => {
          const rol = (data.user?.rol || "cliente").toLowerCase();
          if (rol === "administrador" || rol === "admin")
            window.location.href = "/aviastour/html/administrador.html";
          else if (rol === "empleado")
            window.location.href = "/aviastour/html/empleado.html";
          else window.location.href = "/aviastour/html/cliente.html";
        }, 1500);
      }
    } else {
      showError(data.message || "Error en el registro.");
    }
  } catch (err) {
    console.error(err);
    showError("Error de conexión. Intenta nuevamente.");
  } finally {
    if (btn) btn.disabled = false;
  }
}

function showError(message) {
  const errorDiv = document.getElementById("errorMessage");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  const successDiv = document.getElementById("successMessage");
  if (successDiv) successDiv.classList.add("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 5000);
}

function showSuccess(message) {
  const successDiv = document.getElementById("successMessage");
  successDiv.textContent = message;
  successDiv.classList.remove("hidden");
  const errorDiv = document.getElementById("errorMessage");
  if (errorDiv) errorDiv.classList.add("hidden");
}
