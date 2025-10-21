document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('aviastour_user') || 'null');
    if (!user) return window.location.href = '/aviastour/html/inicio.html';
    if (user.rol.toLowerCase() !== 'administrador') return Utils.redirectByRole(user);

    document.getElementById('userName').textContent = user.usuario || user.email || 'Administrador';
    document.getElementById('userRole').textContent = user.rol;

    loadStats();
    showTab('usuarios');
});

// -----------------------------
// 📊 Cargar estadísticas
// -----------------------------
function loadStats() {
    const statsGrid = document.getElementById('statsGrid');
    const totalUsuarios = AppData.usuarios.length;
    const totalReservas = AppData.reservas.length;
    const clientesVIP = AppData.usuarios.filter(u => u.role === 'cliente' && u.activo).length;
    const destinosPopulares = AppData.viajes.length;

    statsGrid.innerHTML = `
        <div class="stat-card"><h3>${totalUsuarios}</h3><p>Usuarios Totales</p></div>
        <div class="stat-card"><h3>${totalReservas}</h3><p>Reservas Totales</p></div>
        <div class="stat-card"><h3>${clientesVIP}</h3><p>Clientes Activos</p></div>
        <div class="stat-card"><h3>${destinosPopulares}</h3><p>Destinos Registrados</p></div>
    `;
}

// -----------------------------
// 🔹 Control de pestañas
// -----------------------------
function showTab(tab) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
    const tabContent = document.getElementById('tabContent');

    switch (tab) {
        case 'usuarios':
            renderUsuarios(tabContent);
            break;
        case 'reservas':
            renderReservas(tabContent);
            break;
        case 'viajes':
            renderViajes(tabContent);
            break;
        default:
            tabContent.innerHTML = '<p>Selecciona una pestaña.</p>';
    }
}

// -----------------------------
// 👥 Usuarios
// -----------------------------
function renderUsuarios(container) {
    const rows = AppData.usuarios.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.email}</td>
            <td>${u.nombre || ''} ${u.apellido || ''}</td>
            <td>${u.role}</td>
            <td>${u.activo ? '✅ Activo' : '❌ Inactivo'}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteUsuario('${u.id}')">Eliminar</button></td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr><th>ID</th><th>Email</th><th>Nombre</th><th>Rol</th><th>Estado</th><th>Acción</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function deleteUsuario(id) {
    const index = AppData.usuarios.findIndex(u => u.id === id);
    if (index >= 0) {
        AppData.usuarios.splice(index, 1);
        Utils.showToast('Usuario eliminado correctamente', 'success');
        showTab('usuarios');
    }
}

// -----------------------------
// ✈️ Viajes
// -----------------------------
function renderViajes(container) {
    const rows = AppData.viajes.map(v => `
        <tr>
            <td>${v.id}</td>
            <td>${v.destino}</td>
            <td>${v.origen}</td>
            <td>${Utils.formatCOP(v.precio)}</td>
            <td>${v.asientosDisponibles}/${v.asientosTotales}</td>
            <td>${v.activo ? '✅ Disponible' : '❌ No disponible'}</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr><th>ID</th><th>Destino</th><th>Origen</th><th>Precio</th><th>Asientos</th><th>Estado</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

// -----------------------------
// 🧾 Reservas
// -----------------------------
function renderReservas(container) {
    const rows = AppData.reservas.map(r => {
        const viaje = AppData.viajes.find(v => v.id === r.viajeId);
        const user = AppData.usuarios.find(u => u.id === r.userId);
        return `
            <tr>
                <td>${r.id}</td>
                <td>${user ? user.nombre : 'Desconocido'}</td>
                <td>${viaje ? viaje.destino : 'N/A'}</td>
                <td>${r.cantidadPasajeros}</td>
                <td>${Utils.formatCOP(r.precioTotal)}</td>
                <td>${r.estado}</td>
                <td>${Utils.formatDate(r.fechaReserva)}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr><th>ID</th><th>Cliente</th><th>Destino</th><th>Pasajeros</th><th>Total</th><th>Estado</th><th>Fecha</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

// -----------------------------
// 🚪 Logout
// -----------------------------
function logout() {
    localStorage.removeItem('aviastour_user');
    window.location.href = '/aviastour/html/inicio.html';
}


