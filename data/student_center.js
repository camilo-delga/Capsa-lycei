export const polls = [
    {
      id: 1,
      title: 'Horario de Recreos Extendidos',
      description: '¿Deberían extenderse los recreos de 15 a 20 minutos?',
      status: 'active',
      endDate: '2024-11-20',
      totalVotes: 156,
      options: [
        { id: 1, text: 'Sí, extender a 20 minutos', votes: 98 },
        { id: 2, text: 'No, mantener 15 minutos', votes: 45 },
        { id: 3, text: 'Extender solo el recreo del mediodía', votes: 13 }
      ]
    },
    {
      id: 2,
      title: 'Actividades para la Semana de la Juventud',
      description: '¿Qué actividades te gustaría que se incluyan en la Semana de la Juventud?',
      status: 'active',
      endDate: '2024-11-25',
      totalVotes: 89,
      options: [
        { id: 1, text: 'Torneo de deportes', votes: 34 },
        { id: 2, text: 'Festival de talentos', votes: 28 },
        { id: 3, text: 'Feria gastronómica', votes: 27 }
      ]
    },
    {
      id: 3,
      title: 'Uniforme Escolar Opcional',
      description: '¿Debería ser opcional el uso del uniforme escolar los viernes?',
      status: 'completed',
      endDate: '2024-11-05',
      totalVotes: 203,
      options: [
        { id: 1, text: 'Sí, uniforme opcional los viernes', votes: 142 },
        { id: 2, text: 'No, mantener uniforme obligatorio', votes: 61 }
      ]
    }
  ];

  export const events = [
    {
      id: 1,
      title: 'Reunión Mensual del Centro de Estudiantes',
      date: '2024-11-15',
      time: '14:00',
      location: 'Salón de Actos',
      type: 'reunion',
      attendees: 12
    },
    {
      id: 2,
      title: 'Organización Semana de la Juventud',
      date: '2024-11-18',
      time: '15:30',
      location: 'Aula 301',
      type: 'planificacion',
      attendees: 8
    },
    {
      id: 3,
      title: 'Presentación de Propuestas a Dirección',
      date: '2024-11-22',
      time: '10:00',
      location: 'Dirección',
      type: 'presentacion',
      attendees: 5
    }
  ];

  export const proposals = [
    {
      id: 1,
      title: 'Instalación de Dispensadores de Agua',
      description: 'Propuesta para instalar dispensadores de agua en cada piso del edificio',
      status: 'approved',
      votes: 187,
      submittedBy: 'María García',
      submittedDate: '2024-10-15'
    },
    {
      id: 2,
      title: 'Zona de Estudio Silencioso en Biblioteca',
      description: 'Crear una zona específica para estudio silencioso en la biblioteca',
      status: 'pending',
      votes: 134,
      submittedBy: 'Juan Pérez',
      submittedDate: '2024-11-01'
    },
    {
      id: 3,
      title: 'Mejora del Sistema de WiFi',
      description: 'Solicitud para mejorar la velocidad y cobertura del WiFi estudiantil',
      status: 'in_review',
      votes: 201,
      submittedBy: 'Ana Rodríguez',
      submittedDate: '2024-10-28'
    }
  ];

  export const statistics = {
    totalStudents: 450,
    activeVoters: 298,
    participationRate: 66,
    completedProposals: 12,
    pendingProposals: 8,
    monthlyGrowth: 15
  };