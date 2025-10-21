let currentUser = null;
let currentTab = 'viajes';

window.addEventListener('DOMContentLoaded', async () => {
    currentUser = await Utils.checkAuth();
    if (!currentUser) return;

    if (!Utils.checkRole(currentUser, ['administrador'])) return;

    document.getElementById('userName').textContent = currentUser.usuario;
    document.getElementById('userEmail').textContent = currentUser.rol;

    showTab('viajes');
});

function showTab(tab) {
    currentTab = tab;
    ['viajes', 'reservas', 'usuarios'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) btn.classList.toggle('active', t === tab);
    });

    if (tab === 'viajes') loadViajes();
    else if (tab === 'reservas') loadReservas();
    else if (tab === 'usuarios') loadUsuarios();
}

// ==========================
// ✈️ CRUD DE VIAJES
// ==========================
async function loadViajes() {
    try {
        const res = await fetch('../api/viajes.php');
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        const viajes = data.viajes;

        const rows = viajes.map(v => `
            <tr>
                <td>${v.id_viaje}</td>
                <td>${v.destino}</td>
                <td>${v.provincia}</td>
                <td>${Utils.formatDate(v.fecha_viaje)}</td>
                <td>${Utils.formatCOP(v.precio)}</td>
                <td><img src="${v.imagen}" width="80"></td>
                <td>${v.estado}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarViaje(${v.id_viaje})">✏️</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarViaje(${v.id_viaje})">🗑️</button>
                </td>
            </tr>
        `).join('');

        document.getElementById('tabContent').innerHTML = `
            <h2>Gestión de Viajes</h2>
            <button class="btn btn-primary" onclick="nuevoViaje()">+ Nuevo Viaje</button>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th><th>Destino</th><th>Provincia</th><th>Fecha</th><th>Precio</th><th>Imagen</th><th>Estado</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    } catch (err) {
        Utils.showToast(err.message, 'error');
    }
}

function nuevoViaje() {
    const destino = prompt('Destino:');
    const provincia = prompt('Provincia:');
    const fecha_viaje = prompt('Fecha (YYYY-MM-DD):');
    const precio = prompt('Precio:');
    const imagen = prompt('URL de la imagen:');

    fetch('../api/viajes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destino, provincia, fecha_viaje, precio, imagen, estado: 'Disponible' })
    })
        .then(r => r.json())
        .then(d => {
            Utils.showToast(d.message, d.success ? 'success' : 'error');
            if (d.success) loadViajes();
        });
}

function editarViaje(id) {
    const destino = prompt('Nuevo destino:');
    const provincia = prompt('Nueva provincia:');
    const fecha_viaje = prompt('Nueva fecha (YYYY-MM-DD):');
    const precio = prompt('Nuevo precio:');
    const imagen = prompt('Nueva imagen URL:');
    const estado = prompt('Estado (Disponible/Agotado):');

    fetch('../api/viajes.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_viaje: id, destino, provincia, fecha_viaje, precio, imagen, estado })
    })
        .then(r => r.json())
        .then(d => {
            Utils.showToast(d.message, d.success ? 'success' : 'error');
            if (d.success) loadViajes();
        });
}

function eliminarViaje(id) {
    if (!confirm('¿Seguro que quieres eliminar este viaje?')) return;

    fetch('../api/viajes.php', {
        method: 'DELETE',
        body: `id_viaje=${id}`
    })
        .then(r => r.json())
        .then(d => {
            Utils.showToast(d.message, d.success ? 'success' : 'error');
            if (d.success) loadViajes();
        });
}

// ==========================
// 📗 RESERVAS
// ==========================
async function loadReservas() {
    const res = await fetch('../api/reservas_admin.php');
    const data = await res.json();

    if (!data.success) return Utils.showToast(data.message, 'error');

    const html = data.data.map(r => `
        <tr>
            <td>${r.id_reserva}</td>
            <td>${r.cliente_nombre}</td>
            <td>${r.destino}</td>
            <td>${r.provincia}</td>
            <td>${r.estado}</td>
        </tr>
    `).join('');

    document.getElementById('tabContent').innerHTML = `
        <h2>Reservas</h2>
        <table class="data-table">
            <thead><tr><th>ID</th><th>Cliente</th><th>Destino</th><th>Provincia</th><th>Estado</th></tr></thead>
            <tbody>${html}</tbody>
        </table>
    `;
}

// ==========================
// 👥 USUARIOS
// ==========================
async function loadUsuarios() {
    const res = await fetch('../api/usuarios.php');
    const data = await res.json();
    if (!data.success) return Utils.showToast(data.message, 'error');

    const html = data.usuarios.map(u => `
        <div class="usuario-card">
            <h3>${u.usuario}</h3>
            <p><b>Rol:</b> ${u.rol}</p>
        </div>
    `).join('');

    document.getElementById('tabContent').innerHTML = `
        <h2>Usuarios</h2>
        <div class="usuarios-grid">${html}</div>
    `;
}

function logout() {
    localStorage.removeItem('aviastour_user');
    window.location.href = '../html/inicio.html';
}
