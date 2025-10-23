// Verificar si ya hay sesión activa al cargar
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('aviastour_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        // dirije a la zona específica según el rol
        const dashboards = {
            'admin': 'administrador.html',
            'empleado': 'empleado.html',
            'cliente': 'cliente.html'
        };
        window.location.href = dashboards[user.role] || 'inicio.html';
    }
});
