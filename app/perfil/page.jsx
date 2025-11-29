'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from '@/components/ui/use-toast';
import { initialProfile } from '@/data/profile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import SecurityTab from '@/components/profile/SecurityTab';
import { User, Bell, Shield, Book, Sun, Moon } from 'lucide-react';
import NotificationsTab from '@/components/profile/NotificationsTab';
import PersonalTab from '@/components/profile/PersonalTab';
import SubjectsTab from '@/components/profile/SubjectsTab';
import { useTheme } from "@/components/providers/theme-provider"

export default function Profile() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const [editedProfile, setEditedProfile] = useState({
    ...initialProfile,
    name: user?.name || initialProfile.name,
    email: user?.email || initialProfile.email,
  });

  const [notifications, setNotifications] = useState({
    email: true, push: true, sms: false, calendar: true, messages: true, grades: true
  });
  const [security, setSecurity] = useState({
    twoFactor: false, sessionTimeout: '30', loginAlerts: true
  });
  const [subjects, setSubjects] = useState({
    enrolled: [
        { id: 1, name: 'Matemáticas', teacher: 'Prof. Carlos López' },
        { id: 3, name: 'Física', teacher: 'Prof. Roberto Silva' },
    ],
    invitations: [
        { id: 2, name: 'Historia', teacher: 'Prof. Ana Martínez' },
    ]
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({ title: "Perfil actualizado", description: "Tus cambios han sido guardados exitosamente" });
  };

  const handleEditToggle = () => {
    if (isEditing) {
        setEditedProfile({
            ...initialProfile,
            name: user?.name || initialProfile.name,
            email: user?.email || initialProfile.email,
        });
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (field, value) => {
    setEditedProfile(prev => ({...prev, [field]: value}));
  };

  const handleSettingsChange = (setter, key, value) => {
    setter(prev => ({ ...prev, [key]: value }));
    toast({ title: "Configuración actualizada", description: "Tus preferencias han sido guardadas" });
  };

  const handleSubjectAction = (action, subjectId) => {
    if (action === 'accept') {
        const subjectToMove = subjects.invitations.find(s => s.id === subjectId);
        setSubjects(prev => ({
            enrolled: [...prev.enrolled, subjectToMove],
            invitations: prev.invitations.filter(s => s.id !== subjectId)
        }));
        toast({ title: "¡Inscrito!", description: `Te has inscrito en ${subjectToMove.name}.` });
    } else if (action === 'reject') {
        const subjectToRemove = subjects.invitations.find(s => s.id === subjectId);
        setSubjects(prev => ({
            ...prev,
            invitations: prev.invitations.filter(s => s.id !== subjectId)
        }));
        toast({ title: "Invitación rechazada", description: `Rechazaste la invitación a ${subjectToRemove.name}.`, variant: 'destructive' });
    } else if (action === 'leave') {
        const subjectToLeave = subjects.enrolled.find(s => s.id === subjectId);
        setSubjects(prev => ({
            ...prev,
            enrolled: prev.enrolled.filter(s => s.id !== subjectId)
        }));
        toast({ title: "Materia abandonada", description: `Has abandonado ${subjectToLeave.name}.` });
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <ProfileHeader user={user} isEditing={isEditing} onEditToggle={handleEditToggle} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
                <TabsTrigger value="personal"><User className="w-4 h-4 mr-2" />Personal</TabsTrigger>
                <TabsTrigger value="subjects"><Book className="w-4 h-4 mr-2"/>Materias</TabsTrigger>
                <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2"/>Seguridad</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2"/>Notificaciones</TabsTrigger>
                <TabsTrigger value="theme">
                  {theme === 'dark' ? <Moon className="w-4 h-4 mr-2"/> : <Sun className="w-4 h-4 mr-2"/>}
                  Apariencia
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal"><PersonalTab isEditing={isEditing} profile={editedProfile} onProfileChange={handleProfileChange} onSave={handleSaveProfile} /></TabsContent>
              <TabsContent value="subjects"><SubjectsTab subjects={subjects.enrolled} invitations={subjects.invitations} onAction={handleSubjectAction} /></TabsContent>
              <TabsContent value="security"><SecurityTab security={security} onSecurityChange={(k, v) => handleSettingsChange(setSecurity, k, v)} /></TabsContent>
              <TabsContent value="notifications"><NotificationsTab notifications={notifications} onNotificationChange={(k, v) => handleSettingsChange(setNotifications, k, v)} /></TabsContent>
              <TabsContent value="theme">
                <Card>
                  <CardHeader>
                    <CardTitle>Apariencia</CardTitle>
                    <CardDescription>Selecciona el tema visual de la plataforma.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Claro</Button>
                      <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Oscuro</Button>
                      <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>Sistema</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
