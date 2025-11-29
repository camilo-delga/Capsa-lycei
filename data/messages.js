import { MessageCircle, Lightbulb } from 'lucide-react';

export const chats = [
    {
      id: 1,
      name: '5to A - Curso General',
      type: 'group',
      participants: 28,
      lastMessage: 'Recuerden: Examen de matemáticas mañana a las 10.',
      lastMessageTime: '10:30',
      unreadCount: 3,
      avatar: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=200',
      pinned: true,
      online: false,
    },
    {
      id: 2,
      name: 'Centro de Estudiantes',
      type: 'group',
      participants: 12,
      lastMessage: 'María: ¿Confirmamos la reunión para el viernes?',
      lastMessageTime: '09:15',
      unreadCount: 1,
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200',
      pinned: true,
      online: false,
    },
    {
      id: 6,
      name: '💡 Ideas y Reseñas',
      type: 'group',
      participants: 'Todos',
      lastMessage: '¡Nueva idea! Podríamos tener más bancos en el patio.',
      lastMessageTime: '11:45',
      unreadCount: 0,
      avatar: null,
      icon: Lightbulb,
      pinned: true,
      online: false,
    },
    {
      id: 3,
      name: 'Prof. Carlos López (Matemáticas)',
      type: 'individual',
      lastMessage: 'Hola Juan, ¿podrías enviarme el ejercicio 15?',
      lastMessageTime: 'Ayer',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200',
      pinned: false,
      online: true,
    },
    {
        id: 4,
        name: 'Proyecto de Física - Grupo 3',
        type: 'group',
        participants: 4,
        lastMessage: 'Ana: Terminé mi parte, ¿quién sigue?',
        lastMessageTime: '18:45',
        unreadCount: 0,
        avatar: 'https://images.unsplash.com/photo-1620712943543-9596c21a412a?w=200',
        pinned: false,
        online: false,
    },
    {
      id: 5,
      name: 'María García (Delegada)',
      type: 'individual',
      lastMessage: 'Perfecto, nos vemos en la reunión.',
      lastMessageTime: 'Dom',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      pinned: false,
      online: false,
    }
  ];

  export const messages = {
    1: [
      { id: 1, sender: { name: 'Prof. Carlos López', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' }, content: 'Buenos días clase. Recuerden: mañana tenemos examen de ecuaciones cuadráticas a las 10.', time: '08:30' },
      { id: 2, sender: { name: 'Ana Rodríguez', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' }, content: '¿El examen incluye los ejercicios del capítulo 6?', time: '08:35' },
      { id: 3, sender: { name: 'Juan Pérez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }, content: 'Sí, hay que estudiar hasta el ejercicio 20 inclusive.', time: '08:37' },
      { id: 4, sender: { name: 'Prof. Carlos López', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' }, content: 'Exacto, Juan. Repasen también las fórmulas que vimos.', time: '08:40' },
    ],
    2: [
      { id: 1, sender: { name: 'María García', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }, content: 'Hola a todos. ¿Confirmamos la reunión de delegados para este viernes a las 14:00?', time: '09:15' },
    ],
    3: [
        { id: 1, sender: { name: 'Prof. Carlos López', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' }, content: 'Hola Juan, ¿podrías enviarme el ejercicio 15 para revisarlo?', time: 'Ayer' },
    ],
    4: [
        { id: 1, sender: { name: 'Ana Rodríguez', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200' }, content: 'Chicos, terminé mi parte del informe de física. ¿Quién sigue con la edición?', time: '18:45' },
    ],
    5: [
        { id: 1, sender: { name: 'Juan Pérez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }, content: 'Hola María, quería consultarte sobre la propuesta de los dispensadores de agua.', time: 'Dom' },
        { id: 2, sender: { name: 'María García', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }, content: '¡Hola Juan! Claro, dime. La estamos presentando mañana a dirección.', time: 'Dom' },
    ],
    6: [
      { id: 1, sender: { name: 'Laura Gómez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }, content: '¡Hola! Se me ocurrió que podríamos tener más bancos en el patio para poder sentarnos durante los recreos. ¿Qué les parece?', time: '11:45' },
      { id: 2, sender: { name: 'Juan Pérez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }, content: '¡Apoyo totalmente la moción! Sería genial.', time: '11:47' }
    ]
  };