// En si esat primera parte lo comparten casi todos los archivos js

let currentUser = null;
let currentTab = 'consulta';

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    currentUser = Utils.checkAuth();
    if (!currentUser) return;

    // Verifica el rol de empleado
    if (!Utils.checkRole(currentUser, ['empleado', 'admin'])) return;

    // Carga los datos del usuario
    loadUserInfo();

    // Mostrar la tabla de consulta
    showTab('consulta');
});

function loadUserInfo() {
    document.getElementById('userName').textContent = `${currentUser.nombre} ${currentUser.apellido}`;
    document.getElementById('userEmail').textContent = currentUser.email;
}

function showTab(tab) {
    currentTab = tab;

    // Actualizar los botones de las tablas
    ['consulta', 'reservas'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Cargar el ncontenido de las tablas
    let content = '';
    if (tab === 'consulta') {
        content = getConsultaContent();
    } else if (tab === 'reservas') {
        content = getReservasContent();
    }

    document.getElementById('tabContent').innerHTML = content;
}

// ===== CONSULTA VIAJES =====
f// ...existing code...

async function getConsultaContent() {
    try {
        const response = await fetch('/api/empleado/consulta.php');
        const data = await response.json();
        
        if (!data.success) throw new Error(data.message);
        
        return `
            <div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px;">Consulta de Viajes Disponibles</h2>
                
                <div class="mb-4">
                    <input type="text" id="searchViajes" placeholder="Buscar por destino o provincia..." 
                           style="max-width: 400px;" oninput="filterViajes()">
                </div>

                <div class="viajes-grid" id="viajesGrid">
                    ${data.destinos.map(v => `
                        <div class="viaje-card" data-search="${v.destino} ${v.provincia}">
                            <div class="viaje-content">
                                <h3 class="viaje-title">${v.destino}</h3>
                                <div class="viaje-info">
                                    <div class="viaje-info-item">📍 ${v.provincia}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="stats-container mt-4">
                    <div class="stat-card">
                        <h3>Total Reservas</h3>
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
    } catch (error) {
        Utils.showToast(error.message, 'error');
        return '<p class="error-message">Error al cargar los datos</p>';
    }
}

async function getReservasContent() {
    try {
        const response = await fetch('/api/empleado/reservas.php');
        const data = await response.json();
        
        if (!data.success) throw new Error(data.message);
        
        return `
            <div>
                <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px;">Gestión de Reservas</h2>
                
                <div class="mb-4" style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <input type="text" id="searchReservas" placeholder="Buscar reservas..." 
                           style="flex: 1; max-width: 400px;" oninput="filterReservas()">
                    <select id="filterEstado" style="width: 200px;" onchange="filterReservas()">
                        <option value="">Todos los estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Destino</th>
                                <th>Provincia</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th style="text-align: right;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="reservasTableBody">
                            ${data.data.map(r => `
                                <tr data-estado="${r.estado}" data-search="${r.id_reserva} ${r.cliente_nombre} ${r.destino}">
                                    <td style="font-weight: 600;">#${r.id_reserva}</td>
                                    <td>${r.cliente_nombre}</td>
                                    <td>${r.destino}</td>
                                    <td>${r.provincia}</td>
                                    <td>${Utils.formatDate(r.fecha_viaje)}</td>
                                    <td><span class="badge ${Utils.getEstadoBadgeClass(r.estado)}">${r.estado}</span></td>
                                    <td style="text-align: right;">
                                        ${r.estado === 'Pendiente' ? `
                                            <button class="btn btn-success btn-sm" onclick="confirmarReserva(${r.id_reserva})">Confirmar</button>
                                        ` : ''}
                                        ${r.estado !== 'Cancelada' ? `
                                            <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${r.id_reserva})">Cancelar</button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        Utils.showToast(error.message, 'error');
        return '<p class="error-message">Error al cargar las reservas</p>';
    }
}

async function confirmarReserva(id) {
    try {
        const response = await fetch('/api/empleado/reservas.php', {
            method: 'PUT',
            body: JSON.stringify({
                id_reserva: id,
                estado: 'Confirmada'
            })
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        Utils.showToast('Reserva confirmada exitosamente', 'success');
        showTab('reservas');
    } catch (error) {
        Utils.showToast(error.message, 'error');
    }
}

async function cancelarReserva(id) {
    if (!confirm('¿Está seguro de cancelar esta reserva?')) return;
    
    try {
        const response = await fetch('/api/empleado/reservas.php', {
            method: 'PUT',
            body: JSON.stringify({
                id_reserva: id,
                estado: 'Cancelada'
            })
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        
        Utils.showToast('Reserva cancelada exitosamente', 'warning');
        showTab('reservas');
    } catch (error) {
        Utils.showToast(error.message, 'error');
    }
}

