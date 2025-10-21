// ===============================
// 📋 Panel de Empleado - Aviastour
// ===============================

let currentUser = null;
let currentTab = 'consulta';
const API_BASE = "../api/empleado/";

// ===============================
// 🚀 Inicialización
// ===============================
window.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticación
    currentUser = await Utils.checkAuth();
    if (!currentUser) return;

    // Validar rol
    if (!Utils.checkRole(currentUser, ['empleado', 'admin'])) return;

    // Cargar datos del usuario
    loadUserInfo();

    // Mostrar pestaña inicial
    showTab('consulta');
});

// ===============================
// 👤 Cargar información del usuario
// ===============================
function loadUserInfo() {
    document.getElementById('userName').textContent =
        currentUser.nombre || currentUser.usuario || 'Empleado';
    document.getElementById('userEmail').textContent =
        currentUser.email || currentUser.rol || '';
}

// ===============================
// 🧭 Tabs dinámicos
// ===============================
async function showTab(tab) {
    currentTab = tab;

    // Actualizar botones activos
    ['consulta', 'reservas'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) btn.classList.toggle('active', t === tab);
    });

    const container = document.getElementById('tabContent');
    container.innerHTML = '<p class="loading">Cargando datos...</p>';

    if (tab === 'consulta') {
        container.innerHTML = await getConsultaContent();
    } else if (tab === 'reservas') {
        container.innerHTML = await getReservasContent();
    }
}

// ===============================
// ✈️ Consultar viajes
// ===============================
async function getConsultaContent() {
    try {
        const res = await fetch(`${API_BASE}consulta.php`);
        const data = await res.json();

        if (!data.success) throw new Error(data.message || 'Error cargando viajes');

        return `
            <div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px;">
                    Consulta de Viajes Disponibles
                </h2>

                <div class="mb-4">
                    <input type="text" id="searchViajes" placeholder="Buscar destino o provincia..."
                        style="max-width: 400px;" oninput="filterViajes()">
                </div>

                <div class="viajes-grid" id="viajesGrid">
                    ${data.destinos.map(v => `
                        <div class="viaje-card" data-search="${v.destino} ${v.provincia}">
                            <div class="viaje-content">
                                <h3 class="viaje-title">${v.destino}</h3>
                                <div class="viaje-info">
                                    <div>📍 ${v.provincia}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="stats-container mt-4">
                    <div class="stat-card">
                        <h3>Total Viajes</h3>
                        <p>${data.estadisticas.total}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Pendientes</h3>
                        <p>${data.estadisticas.pendientes}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Confirmadas</h3>
                        <p>${data.estadisticas.confirmadas}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        Utils.showToast(err.message, 'error');
        return '<p class="error-message">⚠️ Error al cargar los viajes.</p>';
    }
}

function filterViajes() {
    const term = document.getElementById('searchViajes').value.toLowerCase();
    document.querySelectorAll('#viajesGrid .viaje-card').forEach(card => {
        const text = card.getAttribute('data-search').toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
    });
}

// ===============================
// 🎟️ Gestionar reservas
// ===============================
async function getReservasContent() {
    try {
        const res = await fetch(`${API_BASE}reservas.php`);
        const data = await res.json();

        if (!data.success) throw new Error(data.message || 'Error cargando reservas');

        return `
            <div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px;">
                    Gestión de Reservas
                </h2>

                <div class="mb-4" style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <input type="text" id="searchReservas" placeholder="Buscar reserva..."
                        style="flex: 1; max-width: 400px;" oninput="filterReservas()">
                    <select id="filterEstado" style="width: 200px;" onchange="filterReservas()">
                        <option value="">Todos los estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Destino</th>
                                <th>Provincia</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th style="text-align:right;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="reservasTableBody">
                            ${data.data.map(r => `
                                <tr data-estado="${r.estado}" 
                                    data-search="${r.id_reserva} ${r.cliente_nombre} ${r.destino}">
                                    <td>#${r.id_reserva}</td>
                                    <td>${r.cliente_nombre}</td>
                                    <td>${r.destino}</td>
                                    <td>${r.provincia}</td>
                                    <td>${Utils.formatDate(r.fecha_viaje)}</td>
                                    <td><span class="badge badge-${r.estado.toLowerCase()}">${r.estado}</span></td>
                                    <td style="text-align:right;">
                                        ${r.estado === 'Pendiente' ? `
                                            <button class="btn btn-success btn-sm"
                                                onclick="actualizarReserva(${r.id_reserva}, 'Confirmada')">
                                                Confirmar
                                            </button>` : ''}
                                        ${r.estado !== 'Cancelada' ? `
                                            <button class="btn btn-danger btn-sm"
                                                onclick="actualizarReserva(${r.id_reserva}, 'Cancelada')">
                                                Cancelar
                                            </button>` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (err) {
        Utils.showToast(err.message, 'error');
        return '<p class="error-message">⚠️ Error al cargar las reservas.</p>';
    }
}

// ===============================
// 🔄 Filtrado y actualización
// ===============================
function filterReservas() {
    const term = document.getElementById('searchReservas').value.toLowerCase();
    const estado = document.getElementById('filterEstado').value;

    document.querySelectorAll('#reservasTableBody tr').forEach(row => {
        const matchText = row.getAttribute('data-search').toLowerCase().includes(term);
        const matchEstado = !estado || row.getAttribute('data-estado') === estado;
        row.style.display = matchText && matchEstado ? '' : 'none';
    });
}

async function actualizarReserva(id, estado) {
    try {
        const res = await fetch(`${API_BASE}reservas.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_reserva: id, estado })
        });
        const data = await res.json();

        if (!data.success) throw new Error(data.message);
        Utils.showToast(`Reserva ${estado.toLowerCase()} correctamente`, 'success');
        showTab('reservas');
    } catch (err) {
        Utils.showToast(err.message, 'error');
    }
}

// ===============================
// 🚪 Cerrar sesión
// ===============================
function logout() {
    localStorage.removeItem('aviastour_user');
    window.location.href = '../html/inicio.html';
}


