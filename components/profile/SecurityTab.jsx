'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SecurityTab = ({ security, onSecurityChange }) => {
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const handleChangePassword = () => {
        if (!isEditingPassword) {
            setIsEditingPassword(true);
            return;
        }

        if (passwords.new !== passwords.confirm) {
            toast({ title: "Error", description: "Las nuevas contraseñas no coinciden.", variant: "destructive" });
            return;
        }
        if (passwords.new.length < 8) {
            toast({ title: "Error", description: "La nueva contraseña debe tener al menos 8 caracteres.", variant: "destructive" });
            return;
        }

        toast({ title: "Contraseña actualizada", description: "Tu contraseña ha sido cambiada exitosamente." });
        setIsEditingPassword(false);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Seguridad y Contraseña</CardTitle>
                <CardDescription>
                    Gestiona la seguridad de tu cuenta y actualiza tu contraseña.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Autenticación en Dos Pasos (2FA)</h4>
                            <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta.</p>
                        </div>
                        <Switch
                            checked={security.twoFactor}
                            onCheckedChange={(checked) => onSecurityChange('twoFactor', checked)}
                        />
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <h4 className="font-medium">Alertas de Inicio de Sesión</h4>
                            <p className="text-sm text-muted-foreground">Recibe una notificación si se inicia sesión desde un dispositivo desconocido.</p>
                        </div>
                        <Switch
                            checked={security.loginAlerts}
                            onCheckedChange={(checked) => onSecurityChange('loginAlerts', checked)}
                        />
                    </div>
                </div>

                <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Cambiar Contraseña</h3>
                    {isEditingPassword ? (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="current-password">Contraseña Actual</Label>
                                <Input id="current-password" type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="new-password">Nueva Contraseña</Label>
                                <Input id="new-password" type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} />
                            </div>
                            <div>
                                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                                <Input id="confirm-password" type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}/>
                            </div>
                            <div className="flex space-x-2">
                                <Button onClick={handleChangePassword}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Contraseña
                                </Button>
                                <Button variant="ghost" onClick={() => setIsEditingPassword(false)}>Cancelar</Button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={handleChangePassword}>
                            <Lock className="h-4 w-4 mr-2" />
                            Cambiar Contraseña
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SecurityTab;
