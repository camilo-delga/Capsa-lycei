export const getProfileRoleColor = (role) => {
    const colors = {
        alumno: 'bg-blue-500',
        delegado: 'bg-green-500',
        docente: 'bg-purple-500',
        directivo: 'bg-orange-500',
        administrador: 'bg-red-500',
        invitado: 'bg-gray-500'
    };
    return colors[role] || 'bg-gray-500';
};

export const getProfileRoleLabel = (role) => {
    const labels = {
        alumno: 'Alumno',
        delegado: 'Delegado',
        docente: 'Docente',
        directivo: 'Directivo',
        administrador: 'Administrador',
        invitado: 'Invitado'
    };
    return labels[role] || 'Usuario';
};
