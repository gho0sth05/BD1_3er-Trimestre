let currentUser = null;
let currentTab = "catalogo";

window.addEventListener("DOMContentLoaded", async () => {
  currentUser = await Utils.checkAuth();
  if (!currentUser) return;

  // Solo permite rol cliente
  if (!Utils.checkRole(currentUser, ["cliente"])) return;

  loadUserInfo();
  showTab("catalogo");
});

function loadUserInfo() {
  document.getElementById("userName").textContent = currentUser.usuario;
  document.getElementById("userEmail").textContent = currentUser.rol;
}

function showTab(tab) {
  currentTab = tab;
  ["catalogo", "reservas"].forEach((t) => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) btn.classList.toggle("active", t === tab);
  });

  if (tab === "catalogo") {
    loadCatalogo();
  } else if (tab === "reservas") {
    loadReservas();
  }
}

// =============================
// 📘 CATÁLOGO DE VIAJES
// =============================
async function loadCatalogo() {
  try {
    document.getElementById("tabContent").innerHTML = `<p>Cargando viajes...</p>`;
    const res = await fetch("../api/viajes.php");
    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    const viajes = data.viajes || [];
    const html = viajes
      .map(
        (v) => `
            <div class="viaje-card">
                <img src="${v.imagen}" alt="${v.destino}" class="viaje-img">
                <div class="viaje-info">
                    <h3>${v.destino}</h3>
                    <p><b>Provincia:</b> ${v.provincia}</p>
                    <p><b>Fecha:</b> ${Utils.formatDate(v.fecha_viaje)}</p>
                    <p><b>Precio:</b> ${Utils.formatCOP(v.precio)}</p>
                    <button class="btn btn-primary" onclick="reservarViaje(${v.id_viaje})">
                      Reservar
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    document.getElementById("tabContent").innerHTML = `
            <h2>Catálogo de Viajes</h2>
            <div class="viajes-grid">${html}</div>
        `;
  } catch (error) {
    console.error(error);
    Utils.showToast("Error al cargar viajes", "error");
    document.getElementById(
      "tabContent"
    ).innerHTML = `<p>Error al cargar catálogo</p>`;
  }
}

async function reservarViaje(id_viaje) {
  try {
    const res = await fetch("../api/reservar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_cliente: currentUser.id_cliente,
        id_viaje,
      }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    Utils.showToast("Reserva creada con éxito", "success");

    // 🔹 Espera medio segundo antes de recargar reservas
    setTimeout(() => showTab("reservas"), 500);
  } catch (err) {
    Utils.showToast(err.message, "error");
  }
}

// =============================
// 📗 MIS RESERVAS
// =============================
async function loadReservas() {
  try {
    document.getElementById("tabContent").innerHTML = `<p>Cargando tus reservas...</p>`;

    const res = await fetch(
      `../api/mis_reservas.php?id_cliente=${currentUser.id_cliente}`
    );
    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    const reservas = data.reservas || [];

    if (reservas.length === 0) {
      document.getElementById("tabContent").innerHTML = `
        <div class="empty-state">
          <h3>No tienes reservas</h3>
          <button class="btn btn-primary" onclick="showTab('catalogo')">
            Ver Viajes
          </button>
        </div>
      `;
      return;
    }

    const html = reservas
      .map(
        (r) => `
          <div class="reserva-card">
            <h3>${r.destino} (${r.provincia})</h3>
            <p><b>Fecha:</b> ${Utils.formatDate(r.fecha_viaje)}</p>
            <p><b>Estado:</b> 
              <span class="badge ${Utils.getEstadoBadgeClass(r.estado)}">
                ${r.estado}
              </span>
            </p>
            ${
              r.estado === "Pendiente"
                ? `<button class="btn btn-danger" onclick="cancelarReserva(${r.id_reserva})">
                    Cancelar
                  </button>`
                : ""
            }
          </div>
        `
      )
      .join("");

    document.getElementById("tabContent").innerHTML = `
      <h2>Mis Reservas</h2>
      <div class="reservas-grid">${html}</div>
    `;
  } catch (error) {
    console.error(error);
    Utils.showToast("Error al cargar tus reservas", "error");
    document.getElementById(
      "tabContent"
    ).innerHTML = `<p>Error al cargar reservas</p>`;
  }
}

async function cancelarReserva(id_reserva) {
  if (!confirm("¿Deseas cancelar esta reserva?")) return;
  try {
    const res = await fetch("../api/cancelar_reserva.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_reserva }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    Utils.showToast("Reserva cancelada", "warning");
    showTab("reservas");
  } catch (err) {
    Utils.showToast(err.message, "error");
  }
}

function logout() {
  localStorage.removeItem("aviastour_user");
  window.location.href = "../html/inicio.html";
}
