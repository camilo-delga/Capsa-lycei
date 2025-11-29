'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PrivacyItem = ({ title, description, checked, onCheckedChange }) => (
    <div className="flex items-center justify-between">
        <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
);

const PrivacyTab = ({ privacy, onPrivacyChange }) => {
    const privacySettings = [
        { key: 'profileVisible', title: 'Perfil Visible', description: 'Permitir que otros usuarios vean tu perfil' },
        { key: 'showEmail', title: 'Mostrar Email', description: 'Hacer visible tu correo electrónico' },
        { key: 'showPhone', title: 'Mostrar Teléfono', description: 'Hacer visible tu número de teléfono' },
        { key: 'allowMessages', title: 'Permitir Mensajes', description: 'Recibir mensajes de otros usuarios' },
    ];

    const handleExportData = () => {
        toast({ title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Configuración de Privacidad</span>
                </CardTitle>
                <CardDescription>
                    Controla quién puede ver tu información
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {privacySettings.map(setting => (
                        <PrivacyItem
                            key={setting.key}
                            title={setting.title}
                            description={setting.description}
                            checked={privacy[setting.key]}
                            onCheckedChange={(checked) => onPrivacyChange(setting.key, checked)}
                        />
                    ))}
                </div>
                <div className="pt-4 border-t">
                    <Button variant="outline" onClick={handleExportData}>
                        Exportar Mis Datos
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrivacyTab;
