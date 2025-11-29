export const getCategoryColor = (category) => {
    const colors = {
      academicas: 'bg-blue-500',
      eventos: 'bg-green-500',
      deportes: 'bg-orange-500',
      institucionales: 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  export const getCategoryName = (category) => {
    const names = {
      academicas: 'Académicas',
      eventos: 'Eventos',
      deportes: 'Deportes',
      institucionales: 'Institucionales'
    };
    return names[category] || 'General';
  };
