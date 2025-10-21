window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('aviastour_user');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        const dashboards = {
            'admin': 'administrador.html',
            'empleado': 'empleado.html',
            'cliente': 'cliente.html'
        };
        window.location.href = dashboards[user.role] || 'inicio.html';
    } else {
        // si no hay sesión activa, ir al login
        window.location.href = 'inicio.html'; // 👈 cámbialo si tu archivo se llama diferente
    }
});

