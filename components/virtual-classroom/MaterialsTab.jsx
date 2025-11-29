'use client';

import React from 'react';
import { FileText, Download, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const MaterialsTab = ({ materials }) => {
  const handleDownloadMaterial = () => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Materiales Recientes</span>
        </CardTitle>
        <CardDescription>
          Últimos materiales subidos por los profesores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {material.subject} • {material.type} • {material.size}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Subido el {new Date(material.uploadDate).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleDownloadMaterial}>
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toast({
                  title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
                })}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsTab;
