export const subjects = [
    {
      id: 1,
      name: 'Matemáticas',
      teacher: 'Prof. Carlos López',
      color: 'bg-blue-500',
      students: 28,
      nextClass: '2024-11-15 10:00',
      pendingTasks: 3,
      materials: 12
    },
    {
      id: 2,
      name: 'Historia',
      teacher: 'Prof. Ana Martínez',
      color: 'bg-green-500',
      students: 28,
      nextClass: '2024-11-16 14:00',
      pendingTasks: 1,
      materials: 8
    },
    {
      id: 3,
      name: 'Física',
      teacher: 'Prof. Roberto Silva',
      color: 'bg-purple-500',
      students: 28,
      nextClass: '2024-11-17 09:00',
      pendingTasks: 2,
      materials: 15
    },
    {
      id: 4,
      name: 'Literatura',
      teacher: 'Prof. María García',
      color: 'bg-orange-500',
      students: 28,
      nextClass: '2024-11-18 11:00',
      pendingTasks: 0,
      materials: 6
    }
  ];

  export const recentMaterials = [
    {
      id: 1,
      title: 'Ecuaciones Cuadráticas - Capítulo 5',
      subject: 'Matemáticas',
      type: 'PDF',
      uploadDate: '2024-11-10',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Revolución Industrial - Presentación',
      subject: 'Historia',
      type: 'PPTX',
      uploadDate: '2024-11-09',
      size: '8.1 MB'
    },
    {
      id: 3,
      title: 'Leyes de Newton - Ejercicios',
      subject: 'Física',
      type: 'PDF',
      uploadDate: '2024-11-08',
      size: '1.8 MB'
    }
  ];

  export const pendingTasks = [
    {
      id: 1,
      title: 'Resolver ejercicios 15-20',
      subject: 'Matemáticas',
      dueDate: '2024-11-15',
      priority: 'alta',
      status: 'pendiente'
    },
    {
      id: 2,
      title: 'Ensayo sobre la Revolución Industrial',
      subject: 'Historia',
      dueDate: '2024-11-18',
      priority: 'media',
      status: 'en_progreso'
    },
    {
      id: 3,
      title: 'Laboratorio de Física - Informe',
      subject: 'Física',
      dueDate: '2024-11-20',
      priority: 'baja',
      status: 'pendiente'
    }
  ];