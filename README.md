# Plataforma Educativa - Next.js

Moderna plataforma educativa construida con Next.js 14 (App Router), React 18, Tailwind CSS y Radix UI.

## Características

- **Next.js 14 App Router**: Arquitectura moderna con Server Components y Client Components
- **Autenticación**: Sistema de login con roles (estudiante, profesor, delegado, administrador)
- **Dashboard**: Panel principal con estadísticas y gráficos de rendimiento
- **Aulas Virtuales**: Gestión de materias, tareas y recursos
- **Mensajería**: Sistema de chat en tiempo real
- **Noticias**: Centro de noticias y anuncios con filtros por categoría
- **Calendario**: Gestión de eventos académicos
- **Centro de Estudiantes**: Panel especial para delegados con encuestas y propuestas
- **Asistente IA**: Chat asistente integrado
- **Tema Oscuro/Claro**: Soporte completo para modo oscuro
- **Responsive**: Diseño adaptable a móviles y tablets

## Estructura del Proyecto

```
├── app/                          # App Router de Next.js
│   ├── layout.jsx                # Layout raíz con providers
│   ├── page.jsx                  # Página principal (redirect a landing)
│   ├── landing/page.jsx          # Landing page pública
│   ├── login/page.jsx            # Página de login
│   ├── dashboard/page.jsx        # Dashboard principal
│   ├── materias/                 # Aulas virtuales
│   │   ├── page.jsx              # Lista de materias
│   │   └── [subjectId]/page.jsx  # Detalle de materia
│   ├── mensajes/page.jsx         # Sistema de mensajería
│   ├── noticias/page.jsx         # Centro de noticias
│   ├── perfil/page.jsx           # Perfil de usuario
│   ├── calendario/page.jsx       # Calendario académico
│   ├── centro-estudiantes/page.jsx  # Panel de delegados
│   └── asistente/[[...chatId]]/page.jsx  # Asistente IA
│
├── components/                   # Componentes React
│   ├── ui/                       # Componentes UI base (14 componentes)
│   ├── providers/                # Providers (Auth, Theme)
│   ├── messages/                 # Componentes de mensajería
│   ├── news/                     # Componentes de noticias
│   ├── profile/                  # Componentes de perfil
│   ├── virtual-classroom/        # Componentes de aulas
│   ├── student-center/           # Componentes de centro de estudiantes
│   ├── layout.jsx                # Layout principal con navbar
│   ├── protected-route.jsx       # Protección de rutas
│   └── theme-toggle.jsx          # Toggle de tema
│
├── data/                         # Datos mock
│   ├── news.js                   # Noticias
│   ├── classroom.js              # Materias y tareas
│   ├── messages.js               # Mensajes
│   ├── profile.js                # Datos de perfil
│   └── student_center.js         # Encuestas y eventos
│
├── lib/                          # Utilidades
│   ├── utils.js                  # Utilidades generales
│   ├── news_utils.js             # Utilidades de noticias
│   ├── profile_utils.js          # Utilidades de perfil
│   └── student_center_utils.js   # Utilidades de centro estudiantes
│
└── public/                       # Archivos estáticos
```

## Tecnologías Utilizadas

- **Next.js 14.2.0** - Framework de React con App Router
- **React 18.3.1** - Librería de UI
- **Tailwind CSS 3.3.3** - Framework de CSS
- **Radix UI** - Componentes UI accesibles
- **Framer Motion 10.16.4** - Animaciones
- **Lucide React** - Iconos
- **Recharts** - Gráficos y visualizaciones
- **React Day Picker** - Selector de fechas
- **React Markdown** - Renderizado de Markdown

## Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## Usuarios de Prueba

Puedes iniciar sesión con los siguientes usuarios de prueba:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Estudiante | alumno@school.edu.ar | password |
| Profesor | profesor@school.edu.ar | password123 |
| Delegado | delegado@school.edu.ar | password123 |
| Administrador | dev@school.edu.ar | password123 |

## Rutas Principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing page | Público |
| `/login` | Página de login | Público |
| `/dashboard` | Dashboard principal | Protegido |
| `/materias` | Lista de materias | Protegido |
| `/materias/[id]` | Detalle de materia | Protegido |
| `/mensajes` | Sistema de mensajería | Protegido |
| `/noticias` | Centro de noticias | Protegido |
| `/perfil` | Perfil de usuario | Protegido |
| `/calendario` | Calendario académico | Protegido |
| `/centro-estudiantes` | Panel de delegados | Protegido (delegado) |
| `/asistente` | Asistente IA | Protegido |

## Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar build de producción
npm run lint     # Ejecutar linter
```

## Características de Next.js App Router

- **Server Components por defecto**: Mejor rendimiento y SEO
- **Client Components**: Usando directiva `'use client'` para interactividad
- **Rutas dinámicas**: `[id]` para parámetros de ruta
- **Rutas opcionales**: `[[...slug]]` para catch-all opcional
- **Layout anidados**: Reutilización de layouts
- **Metadata API**: SEO optimizado

## Temas

La aplicación soporta tres modos de tema:
- Claro
- Oscuro
- Sistema (detecta preferencia del SO)

El tema se persiste en localStorage.

## Autenticación

El sistema de autenticación usa:
- Context API para estado global
- LocalStorage para persistencia
- Rutas protegidas con componente `ProtectedRoute`
- Control de acceso basado en roles

## Próximos Pasos

- Integrar con API real (actualmente usa datos mock)
- Implementar autenticación real (JWT, OAuth, etc.)
- Agregar tests unitarios y de integración
- Implementar Server Actions para formularios
- Agregar sistema de notificaciones real-time
- Implementar paginación en listas

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de uso educativo.

## Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.
