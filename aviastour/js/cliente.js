// empleado.js — Panel de Empleado Aviastour ✈️
let currentUser = null;
let currentTab = 'consulta';

window.addEventListener('DOMContentLoaded', () => {
  // Verifica si hay sesión
  currentUser = Utils.checkAuth();
  if (!currentUser) return;

  // Verifica rol de empleado
  if (!Utils.checkRole(currentUser, ['empleado'])) return;

  loadUserInfo();
  showTab('consulta');
});

function loadUserInfo() {
  document.getElementById('userName').textContent = currentUser.nombre;
  document.getElementById('userEmail').textContent = currentUser.email;
}

function showTab(tab) {
  currentTab = tab;

  ['consulta', 'reservas'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (t === tab) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const container = document.getElementById('tabContent');
  container.innerHTML = '<p class="loading">Cargando datos...</p>';

  if (tab === 'consulta') container.innerHTML = getConsultaContent();
  else if (tab === 'reservas') container.innerHTML = getReservasContent();
}

// ============================
// ✈️ CONSULTA DE VIAJES
// ============================
function getConsultaContent() {
  const viajes = AppData.viajes;

  return `
    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Listado de Viajes</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th><th>Destino</th><th>Origen</th><th>Salida</th>
          <th>Regreso</th><th>Precio</th><th>Asientos</th><th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${viajes.map(v => `
          <tr>
            <td>${v.id}</td>
            <td>${v.destino}</td>
            <td>${v.origen}</td>
            <td>${Utils.formatDate(v.fechaSalida)}</td>
            <td>${Utils.formatDate(v.fechaRegreso)}</td>
            <td>${Utils.formatCOP(v.precio)}</td>
            <td>${v.asientosDisponibles}/${v.asientosTotales}</td>
            <td>${v.activo ? 'Activo' : 'Inactivo'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ============================
// 🎟️ GESTIÓN DE RESERVAS
// ============================
function getReservasContent() {
  const reservas = AppData.reservas.map(r => ({
    ...r,
    cliente: AppData.usuarios.find(u => u.id === r.userId),
    viaje: AppData.viajes.find(v => v.id === r.viajeId)
  }));

  return `
    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Gestión de Reservas</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th><th>Cliente</th><th>Destino</th><th>Pasajeros</th>
          <th>Total</th><th>Estado</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${reservas.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.cliente ? r.cliente.nombre : 'Desconocido'}</td>
            <td>${r.viaje ? r.viaje.destino : '-'}</td>
            <td>${r.cantidadPasajeros}</td>
            <td>${Utils.formatCOP(r.precioTotal)}</td>
            <td><span class="badge ${Utils.getEstadoBadgeClass(r.estado)}">${r.estado}</span></td>
            <td>
              <button class="btn btn-success btn-sm" onclick="actualizarEstado('${r.id}', 'confirmada')">✅ Confirmar</button>
              <button class="btn btn-danger btn-sm" onclick="actualizarEstado('${r.id}', 'cancelada')">❌ Cancelar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function actualizarEstado(reservaId, nuevoEstado) {
  const reserva = AppData.reservas.find(r => r.id === reservaId);
  if (!reserva) return;

  reserva.estado = nuevoEstado;
  Utils.showToast(`Reserva #${reserva.id} marcada como ${nuevoEstado}`, 'info');
  showTab('reservas');
}

// ============================
// 🔚 CERRAR SESIÓN
// ============================
function logout() {
  localStorage.removeItem('aviastour_user');
  window.location.href = '/aviastour/html/inicio.html';
}



