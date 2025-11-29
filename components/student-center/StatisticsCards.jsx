import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, TrendingUp, FileText } from 'lucide-react';

const StatisticsCards = ({ statistics }) => {
  const statItems = [
    { icon: Users, value: statistics.totalStudents, label: 'Total Estudiantes', color: 'text-blue-500' },
    { icon: UserCheck, value: statistics.activeVoters, label: 'Votantes Activos', color: 'text-green-500' },
    { icon: TrendingUp, value: `${statistics.participationRate}%`, label: 'Participación', color: 'text-purple-500' },
    { icon: FileText, value: statistics.completedProposals, label: 'Propuestas Aprobadas', color: 'text-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map(item => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="p-6 text-center">
              <Icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatisticsCards;