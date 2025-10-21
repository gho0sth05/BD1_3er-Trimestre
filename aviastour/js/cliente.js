// En si esat primera parte lo comparten casi todos los archivos js

let currentUser = null;
let currentTab = 'catalogo';

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    currentUser = Utils.checkAuth();
    if (!currentUser) return;

    // Verifica los rol de cliente
    if (!Utils.checkRole(currentUser, ['cliente'])) return;

    // Carga datos del usuario
    loadUserInfo();

    // Mostrar la tabla del catálogo
    showTab('catalogo');
});

function loadUserInfo() {
    document.getElementById('userName').textContent = `${currentUser.nombre} ${currentUser.apellido}`;
    document.getElementById('userEmail').textContent = currentUser.email;
}

function showTab(tab) {
    currentTab = tab;

    // Actualizar botones de la tabla
    ['catalogo', 'reservas'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (t === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Cargar contenido de lal tabla
    let content = '';
    if (tab === 'catalogo') {
        content = getCatalogoContent();
    } else if (tab === 'reservas') {
        content = getReservasContent();
    }

    document.getElementById('tabContent').innerHTML = content;
}

// ===== CATALOGO DE VIAJES =====
function getCatalogoContent() {
    const viajesDisponibles = AppData.viajes.filter(v => v.activo && v.asientosDisponibles > 0);

    return `
        <div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 24px;">Descubre Nuestros Destinos</h2>
            
            <div class="mb-4">
                <input type="text" id="searchViajes" placeholder="Buscar destinos..." 
                       style="max-width: 400px;" oninput="filterViajes()">
            </div>

            <div class="viajes-grid" id="viajesGrid">
                ${viajesDisponibles.map(v => `
                    <div class="viaje-card" data-search="${v.destino} ${v.origen}">
                        <div class="viaje-image-container">
                            <img src="${v.imagen}" alt="${v.destino}" class="viaje-image">
                            <div class="viaje-price-badge">${Utils.formatCOP(v.precio)}</div>
                        </div>
                        <div class="viaje-content">
                            <h3 class="viaje-title">${v.destino}</h3>
                            <div class="viaje-info">
                                <div class="viaje-info-item">✈️ ${v.numeroVuelo} - ${v.aerolinea}</div>
                                <div class="viaje-info-item">📍 ${v.origen}</div>
                                <div class="viaje-info-item">📅 ${Utils.formatDate(v.fechaSalida)}</div>
                                <div class="viaje-info-item">⏰ ${Utils.formatDate(v.fechaRegreso)}</div>
                                <div class="viaje-info-item">💺 ${v.asientosDisponibles} asientos disponibles</div>
                            </div>
                            <p class="viaje-description">${v.descripcion}</p>
                            <button class="btn btn-primary btn-block" onclick="mostrarModalReserva('${v.id}')">
                                Reservar Ahora
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filterViajes() {
    const searchValue = document.getElementById('searchViajes').value;
    const cards = document.querySelectorAll('#viajesGrid .viaje-card');
    
    cards.forEach(card => {
        const searchText = card.getAttribute('data-search')?.toLowerCase() || '';
        card.style.display = searchText.includes(searchValue.toLowerCase()) ? '' : 'none';
    });
}

// ===== Zona de las RESERVAS =====
function mostrarModalReserva(viajeId) {
    const viaje = AppData.viajes.find(v => v.id === viajeId);
    if (!viaje) return;

    const modalHTML = `
        <div class="modal" id="reservaModal" onclick="if(event.target === this) cerrarModal()">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Reservar Viaje a ${viaje.destino}</h2>
                </div>
                <div class="modal-body">
                    <form id="reservaForm" onsubmit="crearReserva(event, '${viajeId}')">
                        <div class="form-group">
                            <label class="form-label">Número de Pasajeros</label>
                            <input type="number" id="cantidadPasajeros" min="1" max="${viaje.asientosDisponibles}" 
                                   value="1" required onchange="actualizarTotal('${viajeId}')">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Notas Especiales (Opcional)</label>
                            <textarea id="notasEspeciales" rows="3" 
                                      placeholder="Preferencias de asientos, necesidades especiales, etc."></textarea>
                        </div>
                        
                        <div class="reserva-summary">
                            <div class="summary-row">
                                <span>Precio por persona:</span>
                                <span>${Utils.formatCOP(viaje.precio)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Pasajeros:</span>
                                <span id="displayPasajeros">1</span>
                            </div>
                            <div class="summary-row summary-total">
                                <span>Total:</span>
                                <span class="price" id="totalReserva">${Utils.formatCOP(viaje.precio)}</span>
                            </div>
                        </div>
                        
                        <div class="button-group">
                            <button type="button" onclick="cerrarModal()" class="btn" 
                                    style="background: #e5e7eb; color: #1e293b;">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Confirmar Reserva
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalContainer').innerHTML = modalHTML;
}

function actualizarTotal(viajeId) {
    const viaje = AppData.viajes.find(v => v.id === viajeId);
    const cantidad = parseInt(document.getElementById('cantidadPasajeros').value) || 1;
    const total = viaje.precio * cantidad;

    document.getElementById('displayPasajeros').textContent = cantidad;
    document.getElementById('totalReserva').textContent = Utils.formatCOP(total);
}

function cerrarModal() {
    document.getElementById('modalContainer').innerHTML = '';
}

function crearReserva(e, viajeId) {
    e.preventDefault();

    const viaje = AppData.viajes.find(v => v.id === viajeId);
    const cantidad = parseInt(document.getElementById('cantidadPasajeros').value);
    const notas = document.getElementById('notasEspeciales').value;

    const nuevaReserva = {
        id: Utils.generateId(),
        viajeId: viajeId,
        userId: currentUser.id,
        cantidadPasajeros: cantidad,
        precioTotal: viaje.precio * cantidad,
        estado: 'pendiente',
        fechaReserva: new Date().toISOString(),
        notasEspeciales: notas || undefined
    };

    // Agrega reserva a la base de datos
    AppData.reservas.push(nuevaReserva);

    // Reduce los asientos disponibles
    viaje.asientosDisponibles -= cantidad;

    cerrarModal();
    Utils.showToast(`Reserva creada para ${viaje.destino}`, 'success');
    
    // Cambia a la pestaña de reservas
    showTab('reservas');
}

// ===== Las reservas del cliente =====
function getReservasContent() {
    const misReservas = AppData.reservas
        .filter(r => r.userId === currentUser.id)
        .map(r => ({
            ...r,
            viaje: AppData.viajes.find(v => v.id === r.viajeId)
        }));

    if (misReservas.length === 0) {
        return `
            <div class="empty-state">
                <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <h3 class="empty-title">No tienes reservas</h3>
                <p class="empty-text">Explora nuestros destinos y crea tu primera reserva</p>
                <button onclick="showTab('catalogo')" class="btn btn-primary">Ver Catálogo</button>
            </div>
        `;
    }

    return `
        <div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 24px;">Mis Reservas</h2>
            <div class="reservas-list">
                ${misReservas.map(r => `
                    <div class="reserva-card">
                        <div class="reserva-header">
                            <div>
                                <h3 class="reserva-title">${r.viaje.destino}</h3>
                                <p class="reserva-id">Reserva #${r.id}</p>
                            </div>
                            <span class="badge ${Utils.getEstadoBadgeClass(r.estado)}">
                                ${Utils.getEstadoText(r.estado)}
                            </span>
                        </div>
                        
                        <div class="reserva-grid">
                            <div class="reserva-grid-item">
                                <label>Vuelo</label>
                                <div class="value">${r.viaje.numeroVuelo}</div>
                            </div>
                            <div class="reserva-grid-item">
                                <label>Salida</label>
                                <div class="value">${Utils.formatDate(r.viaje.fechaSalida)}</div>
                            </div>
                            <div class="reserva-grid-item">
                                <label>Pasajeros</label>
                                <div class="value">${r.cantidadPasajeros}</div>
                            </div>
                            <div class="reserva-grid-item">
                                <label>Total</label>
                                <div class="value price">${Utils.formatCOP(r.precioTotal)}</div>
                            </div>
                        </div>
                        
                        ${r.notasEspeciales ? `
                            <div class="reserva-notas">
                                <p class="reserva-notas-title">Notas Especiales:</p>
                                <p class="reserva-notas-text">${r.notasEspeciales}</p>
                            </div>
                        ` : ''}
                        
                        ${r.estado === 'pendiente' ? `
                            <button onclick="cancelarMiReserva('${r.id}', ${r.cantidadPasajeros}, '${r.viajeId}')" 
                                    class="btn btn-danger">
                                Cancelar Reserva
                            </button>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function cancelarMiReserva(id, cantidadPasajeros, viajeId) {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
        const reserva = AppData.reservas.find(r => r.id === id);
        if (reserva) {
            reserva.estado = 'cancelada';

            // Devolver asientos al viaje
            const viaje = AppData.viajes.find(v => v.id === viajeId);
            if (viaje) {
                viaje.asientosDisponibles += cantidadPasajeros;
            }

            Utils.showToast('Tu reserva ha sido cancelada', 'warning');
            showTab('reservas');
        }
    }
}
