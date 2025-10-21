let currentUser = null;
let currentTab = "reservas";

window.addEventListener("DOMContentLoaded", async () => {
  currentUser = await Utils.checkAuth();
  if (!currentUser) return;

  if (!Utils.checkRole(currentUser, ["empleado", "admin"])) return;

  loadUserInfo();
  showTab("reservas");
});

function loadUserInfo() {
  document.getElementById("userName").textContent = currentUser.usuario;
  document.getElementById("userEmail").textContent = currentUser.rol;
}

function showTab(tab) {
  currentTab = tab;
  ["reservas", "viajes"].forEach((t) => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) btn.classList.toggle("active", t === tab);
  });

  if (tab === "reservas") {
    loadReservas();
  } else if (tab === "viajes") {
    loadViajes();
  }
}

// =============================
// 📋 GESTIÓN DE RESERVAS
// =============================
async function loadReservas() {
  try {
    const res = await fetch("../api/empleado_reservas.php");
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const html = data.reservas
      .map(
        (r) => `
        <div class="reserva-card">
            <h3>${r.destino} (${r.provincia})</h3>
            <p><b>Cliente:</b> ${r.cliente}</p>
            <p><b>Fecha:</b> ${Utils.formatDate(r.fecha_viaje)}</p>
            <p><b>Estado:</b> <span class="badge ${Utils.getEstadoBadgeClass(
              r.estado
            )}">${r.estado}</span></p>
            <div class="actions">
                ${
                  r.estado === "Pendiente"
                    ? `<button class="btn btn-success" onclick="actualizarReserva(${r.id_reserva}, 'Confirmada')">Confirmar</button>`
                    : ""
                }
                ${
                  r.estado !== "Cancelada"
                    ? `<button class="btn btn-danger" onclick="actualizarReserva(${r.id_reserva}, 'Cancelada')">Cancelar</button>`
                    : ""
                }
            </div>
        </div>
      `
      )
      .join("");

    document.getElementById("tabContent").innerHTML = `
      <h2>Gestión de Reservas</h2>
      <div class="reservas-grid">${html}</div>
    `;
  } catch (err) {
    Utils.showToast("Error al cargar reservas", "error");
  }
}

// =============================
// 🔄 ACTUALIZAR RESERVA (✅ corregido)
// =============================
async function actualizarReserva(id_reserva, estado) {
  try {
    const res = await fetch("../api/actualizar_reserva.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_reserva, estado }), // ✅ ahora correcto
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    Utils.showToast(`Reserva ${estado.toLowerCase()} correctamente`, "success");
    loadReservas();
  } catch (err) {
    Utils.showToast(err.message, "error");
  }
}

// =============================
// ✈️ CONSULTA DE VIAJES
// =============================
async function loadViajes() {
  try {
    const res = await fetch("../api/viajes.php");
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const html = data.viajes
      .map(
        (v) => `
        <div class="viaje-card">
            <h3>${v.destino}</h3>
            <p><b>Provincia:</b> ${v.provincia}</p>
            <p><b>Fecha:</b> ${Utils.formatDate(v.fecha_viaje)}</p>
            <p><b>Estado:</b> ${v.estado}</p>
        </div>
      `
      )
      .join("");

    document.getElementById("tabContent").innerHTML = `
      <h2>Consulta de Viajes</h2>
      <div class="viajes-grid">${html}</div>
    `;
  } catch (err) {
    Utils.showToast("Error al cargar viajes", "error");
  }
}

// =============================
// 🚪 CERRAR SESIÓN
// =============================
function logout() {
  localStorage.removeItem("aviastour_user");
  window.location.href = "../html/inicio.html";
}
