'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

const NotificationItem = ({ title, description, checked, onCheckedChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

const NotificationsTab = ({ notifications, onNotificationChange }) => {
  const notificationSettings = [
    { key: 'email', title: 'Notificaciones por Email', description: 'Recibir notificaciones en tu correo electrónico' },
    { key: 'push', title: 'Notificaciones Push', description: 'Notificaciones en tiempo real en el navegador' },
    { key: 'sms', title: 'Mensajes SMS', description: 'Notificaciones importantes por SMS' },
    { key: 'calendar', title: 'Recordatorios de Calendario', description: 'Alertas sobre eventos y fechas importantes' },
    { key: 'messages', title: 'Nuevos Mensajes', description: 'Notificaciones de mensajes en chats' },
    { key: 'grades', title: 'Calificaciones', description: 'Alertas sobre nuevas calificaciones' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Preferencias de Notificaciones</span>
        </CardTitle>
        <CardDescription>
          Configura cómo y cuándo recibir notificaciones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationSettings.map(setting => (
          <NotificationItem
            key={setting.key}
            title={setting.title}
            description={setting.description}
            checked={notifications[setting.key]}
            onCheckedChange={(checked) => onNotificationChange(setting.key, checked)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
