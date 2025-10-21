document.addEventListener('DOMContentLoaded', () => {
    // Si ya hay sesión activa, redirige directamente según el rol
    const saved = localStorage.getItem('aviastour_user');
    if (saved) {
        try {
            const user = JSON.parse(saved);
            redirectByRole(user.rol || user.role);
            return;
        } catch {
            localStorage.removeItem('aviastour_user');
        }
    }

    // Escuchar envío del formulario
    const form = document.getElementById('loginForm');
    if (form) form.addEventListener('submit', handleLogin);
});

async function handleLogin(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();
    const btn = document.getElementById('loginBtn');

    if (!usuario || !password) {
        showError('Completa todos los campos.');
        return;
    }

    try {
        if (btn) btn.disabled = true;

        const res = await fetch('../api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        if (!res.ok) {
            showError(`Error del servidor (${res.status})`);
            return;
        }

        const data = await res.json();

        if (!data.success) {
            showError(data.message || 'Credenciales inválidas');
            return;
        }

        const user = data.user || {};
        localStorage.setItem('aviastour_user', JSON.stringify(user));
        redirectByRole(user.rol || 'cliente');

    } catch (err) {
        console.error(err);
        showError('Error de conexión. Intenta nuevamente.');
    } finally {
        if (btn) btn.disabled = false;
    }
}

function redirectByRole(rol) {
    const r = (rol || '').toString().toLowerCase();
    if (r === 'empleado') window.location.href = '/aviastour/html/empleado.html';
    else if (r === 'administrador' || r === 'admin') window.location.href = '/aviastour/html/administrador.html';
    else window.location.href = '/aviastour/html/cliente.html';
}

function showError(message) {
    const el = document.getElementById('errorMessage');
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 5000);
}

