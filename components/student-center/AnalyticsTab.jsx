import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AnalyticsTab = () => {
  const participationData = [
    { month: 'Octubre 2024', percentage: 75, color: 'bg-blue-500' },
    { month: 'Septiembre 2024', percentage: 68, color: 'bg-green-500' },
    { month: 'Agosto 2024', percentage: 62, color: 'bg-purple-500' },
  ];

  const proposalsData = [
    { status: 'Aprobadas', count: 12, color: 'bg-green-500' },
    { status: 'Pendientes', count: 8, color: 'bg-yellow-500' },
    { status: 'En Revisión', count: 5, color: 'bg-orange-500' },
    { status: 'Rechazadas', count: 3, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Análisis y Estadísticas</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Participación por Mes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {participationData.map(item => (
                <div key={item.month} className="flex items-center justify-between">
                  <span>{item.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Propuestas por Estado</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proposalsData.map(item => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                    <span>{item.status}</span>
                  </span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;