'use client';

import React from 'react';
import { Video, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ClassesTab = ({ subjects }) => {
  const handleJoinClass = () => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Video className="h-5 w-5" />
          <span>Próximas Clases</span>
        </CardTitle>
        <CardDescription>
          Clases virtuales programadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${subject.color} rounded-full flex items-center justify-center`}>
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{subject.name}</h4>
                  <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                  <p className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(subject.nextClass).toLocaleString('es-ES')}</span>
                  </p>
                </div>
              </div>
              <Button onClick={handleJoinClass}>
                <Video className="h-4 w-4 mr-1" />
                Unirse
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesTab;
