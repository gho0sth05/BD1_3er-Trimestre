const Utils = {
    async checkAuth() {
        const user = JSON.parse(localStorage.getItem('aviastour_user'));
        if (!user) {
            window.location.href = '../html/inicio.html';
            return null;
        }
        return user;
    },

    checkRole(user, roles) {
        if (!user) {
            window.location.href = '../html/inicio.html';
            return false;
        }

        const rol = (user.rol || user.role || user.tipo || '').toString().toLowerCase();
        if (!roles.map(r => r.toLowerCase()).includes(rol)) {
            window.location.href = '../html/inicio.html';
            return false;
        }

        return true;
    },

    formatCOP(value) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(value);
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    generateId() {
        return 'R' + Math.floor(Math.random() * 1000000);
    },

    // 🚀 Redirigir según el rol del usuario
    redirectByRole(user) {
        if (!user || !user.rol) {
            window.location.href = '../html/inicio.html';
            return;
        }

        switch (user.rol.toLowerCase()) {
            case 'administrador':
                window.location.href = '../html/administrador.html';
                break;
            case 'empleado':
                window.location.href = '../html/empleado.html';
                break;
            case 'cliente':
            default:
                window.location.href = '../html/cliente.html';
                break;
        }
    },

    // 🔖 Clases visuales para estados de reserva
    getEstadoBadgeClass(estado) {
        switch ((estado || '').toLowerCase()) {
            case 'confirmada': return 'badge-success';
            case 'pendiente': return 'badge-warning';
            case 'cancelada': return 'badge-danger';
            default: return 'badge-secondary';
        }
    },

    getEstadoText(estado) {
        switch ((estado || '').toLowerCase()) {
            case 'confirmada': return 'Confirmada';
            case 'pendiente': return 'Pendiente';
            case 'cancelada': return 'Cancelada';
            default: return 'Desconocido';
        }
    },

    // 🚪 Cerrar sesión
    logout() {
        localStorage.removeItem('aviastour_user');
        window.location.href = '/aviastour/html/inicio.html';
    }
};


