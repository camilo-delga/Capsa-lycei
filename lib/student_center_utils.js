export const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-500',
      completed: 'bg-blue-500',
      approved: 'bg-green-500',
      pending: 'bg-yellow-500',
      in_review: 'bg-orange-500',
      rejected: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  export const getStatusLabel = (status) => {
    const labels = {
      active: 'Activa',
      completed: 'Completada',
      approved: 'Aprobada',
      pending: 'Pendiente',
      in_review: 'En Revisión',
      rejected: 'Rechazada'
    };
    return labels[status] || 'Desconocido';
  };

  export const calculatePercentage = (votes, total) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };
