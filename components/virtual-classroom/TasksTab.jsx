'use client';

import React from 'react';
import { AlertCircle, Upload, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const TasksTab = ({ tasks }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      alta: 'bg-red-500',
      media: 'bg-yellow-500',
      baja: 'bg-green-500'
    };
    return colors[priority] || 'bg-gray-500';
  };

  const getStatusIcon = (status) => {
    if (status === 'completada') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'en_progreso') return <Clock className="h-4 w-4 text-yellow-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  const handleUploadTask = () => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>Tareas Pendientes</span>
        </CardTitle>
        <CardDescription>
          Gestiona tus tareas y entregas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                  {task.priority}
                </Badge>
                <Button size="sm" onClick={handleUploadTask}>
                  <Upload className="h-4 w-4 mr-1" />
                  Entregar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksTab;
