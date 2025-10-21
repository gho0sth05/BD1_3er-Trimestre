// Base de datos improvisada para la pagina, con estos son con los que
//  deja entarr por ahora hatsa q pongas la base de datos 
const AppData = {
    usuarios: [
        {
            id: '1',
            email: 'admin@aviastour.com',
            password: 'admin123',
            nombre: 'Carlos',
            apellido: 'Rodríguez',
            role: 'admin',
            telefono: '+57 312 345 6789',
            createdAt: '2024-01-15T10:00:00Z',
            activo: true
        },
        {
            id: '2',
            email: 'empleado@aviastour.com',
            password: 'empleado123',
            nombre: 'María',
            apellido: 'García',
            role: 'empleado',
            telefono: '+57 323 456 7890',
            createdAt: '2024-02-20T14:30:00Z',
            activo: true
        },
        {
            id: '3',
            email: 'cliente@example.com',
            password: 'cliente123',
            nombre: 'Juan',
            apellido: 'Pérez',
            role: 'cliente',
            telefono: '+57 334 567 8901',
            createdAt: '2024-05-10T09:15:00Z',
            activo: true
        },
        {
            id: '4',
            email: 'ana.lopez@example.com',
            password: 'ana123',
            nombre: 'Ana',
            apellido: 'López',
            role: 'cliente',
            telefono: '+57 345 678 9012',
            createdAt: '2024-06-22T16:45:00Z',
            activo: true
        },
        {
            id: '5',
            email: 'pedro.martin@example.com',
            password: 'pedro123',
            nombre: 'Pedro',
            apellido: 'Martín',
            role: 'cliente',
            createdAt: '2024-08-05T11:20:00Z',
            activo: false
        }
    ],

    viajes: [
        {
            id: '1',
            destino: 'París, Francia',
            origen: 'Madrid, España',
            fechaSalida: '2025-11-15T08:00:00Z',
            fechaRegreso: '2025-11-22T18:00:00Z',
            precio: 1850000,
            asientosDisponibles: 45,
            asientosTotales: 180,
            aerolinea: 'Iberia',
            numeroVuelo: 'IB3456',
            descripcion: 'Viaje directo a la ciudad de la luz. Incluye equipaje de mano y facturado.',
            imagen: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
            activo: true
        },
        {
            id: '2',
            destino: 'Roma, Italia',
            origen: 'Barcelona, España',
            fechaSalida: '2025-11-20T10:30:00Z',
            fechaRegreso: '2025-11-27T16:00:00Z',
            precio: 1560000,
            asientosDisponibles: 12,
            asientosTotales: 150,
            aerolinea: 'Vueling',
            numeroVuelo: 'VY8721',
            descripcion: 'Descubre la ciudad eterna con nuestro vuelo directo.',
            imagen: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
            activo: true
        },
        {
            id: '3',
            destino: 'Londres, Reino Unido',
            origen: 'Madrid, España',
            fechaSalida: '2025-12-01T06:45:00Z',
            fechaRegreso: '2025-12-08T20:30:00Z',
            precio: 1315000,
            asientosDisponibles: 78,
            asientosTotales: 200,
            aerolinea: 'British Airways',
            numeroVuelo: 'BA4512',
            descripcion: 'Vuelo cómodo a la capital británica. WiFi disponible a bordo.',
            imagen: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
            activo: true
        },
        {
            id: '4',
            destino: 'Ámsterdam, Países Bajos',
            origen: 'Valencia, España',
            fechaSalida: '2025-11-25T12:00:00Z',
            fechaRegreso: '2025-12-02T14:30:00Z',
            precio: 1192000,
            asientosDisponibles: 0,
            asientosTotales: 120,
            aerolinea: 'KLM',
            numeroVuelo: 'KL1298',
            descripcion: 'Vuelo agotado. Explora los canales y museos de Ámsterdam.',
            imagen: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
            activo: true
        },
        {
            id: '5',
            destino: 'Nueva York, EE.UU.',
            origen: 'Madrid, España',
            fechaSalida: '2025-12-10T22:00:00Z',
            fechaRegreso: '2025-12-20T11:00:00Z',
            precio: 3495000,
            asientosDisponibles: 95,
            asientosTotales: 280,
            aerolinea: 'American Airlines',
            numeroVuelo: 'AA0123',
            descripcion: 'Vuelo transatlántico con entretenimiento premium. La ciudad que nunca duerme te espera.',
            imagen: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
            activo: true
        },
        {
            id: '6',
            destino: 'Tokio, Japón',
            origen: 'Barcelona, España',
            fechaSalida: '2026-01-15T14:00:00Z',
            fechaRegreso: '2026-01-29T09:00:00Z',
            precio: 4935000,
            asientosDisponibles: 34,
            asientosTotales: 350,
            aerolinea: 'Japan Airlines',
            numeroVuelo: 'JL0456',
            descripcion: 'Experimenta la cultura japonesa. Vuelo con una escala en Frankfurt.',
            imagen: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
            activo: true
        },
        {
            id: '7',
            destino: 'Cancún, México',
            origen: 'Madrid, España',
            fechaSalida: '2025-11-30T16:30:00Z',
            fechaRegreso: '2025-12-14T19:00:00Z',
            precio: 2960000,
            asientosDisponibles: 0,
            asientosTotales: 220,
            aerolinea: 'Aeroméxico',
            numeroVuelo: 'AM2389',
            descripcion: 'Playas paradisíacas del Caribe. Incluye comidas a bordo.',
            imagen: 'https://images.unsplash.com/photo-1571406252241-db33f3b8c1f0?w=800',
            activo: false
        }
    ],

    reservas: [
        {
            id: '1',
            viajeId: '1',
            userId: '3',
            cantidadPasajeros: 2,
            precioTotal: 3700000,
            estado: 'confirmada',
            fechaReserva: '2025-10-15T14:30:00Z',
            notasEspeciales: 'Asientos juntos preferiblemente'
        },
        {
            id: '2',
            viajeId: '2',
            userId: '3',
            cantidadPasajeros: 1,
            precioTotal: 1560000,
            estado: 'pendiente',
            fechaReserva: '2025-10-18T09:15:00Z'
        },
        {
            id: '3',
            viajeId: '5',
            userId: '4',
            cantidadPasajeros: 3,
            precioTotal: 10485000,
            estado: 'confirmada',
            fechaReserva: '2025-10-10T11:20:00Z',
            notasEspeciales: 'Viaje familiar - niños de 5 y 8 años'
        },
        {
            id: '4',
            viajeId: '3',
            userId: '4',
            cantidadPasajeros: 1,
            precioTotal: 1315000,
            estado: 'cancelada',
            fechaReserva: '2025-09-28T16:45:00Z'
        }
    ]
};
