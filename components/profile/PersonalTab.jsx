'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Save } from 'lucide-react';

const PersonalTab = ({ isEditing, profile, onProfileChange, onSave }) => {
    const recentActivity = [
        { id: 1, action: 'Entregó tarea de Matemáticas', date: '2024-11-10 14:30' },
        { id: 2, action: 'Participó en chat de 5to A', date: '2024-11-10 10:15' },
        { id: 3, action: 'Descargó material de Física', date: '2024-11-09 16:45' },
        { id: 4, action: 'Inició sesión desde dispositivo móvil', date: '2024-11-09 08:20' }
    ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Información Personal</span>
          </CardTitle>
          <CardDescription>
            Gestiona tu información personal y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombre Completo</Label>
              {isEditing ? (
                <Input value={profile.name} onChange={(e) => onProfileChange('name', e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded">{profile.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Correo Electrónico</Label>
              {isEditing ? (
                <Input type="email" value={profile.email} onChange={(e) => onProfileChange('email', e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded">{profile.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Teléfono</Label>
              {isEditing ? (
                <Input value={profile.phone} onChange={(e) => onProfileChange('phone', e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded">{profile.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Fecha de Nacimiento</Label>
              {isEditing ? (
                <Input type="date" value={profile.birthDate} onChange={(e) => onProfileChange('birthDate', e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded">{new Date(profile.birthDate).toLocaleDateString('es-ES')}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium">Dirección</Label>
              {isEditing ? (
                <Input value={profile.address} onChange={(e) => onProfileChange('address', e.target.value)} />
              ) : (
                <p className="p-2 bg-muted rounded">{profile.address}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="flex pt-4">
              <Button onClick={onSave}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones realizadas en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleString('es-ES')}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalTab;
