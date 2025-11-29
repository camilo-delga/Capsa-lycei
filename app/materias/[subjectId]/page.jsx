'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, History, Atom, Languages, Globe, FlaskConical, ArrowLeft, Megaphone, ClipboardList, Folder, Video } from 'lucide-react';

const materiasData = {
  1: { id: 1, name: 'Matemáticas', teacher: 'Prof. Carlos López', icon: <BookOpen />, announcements: [{id: 1, title: 'Recordatorio Examen Parcial', date:'2025-07-10'}], tasks: [{id: 1, title: 'Ejercicios de Ecuaciones', dueDate:'2025-07-15'}], resources: [{id: 1, name: 'Guía de Fórmulas.pdf'}], classes: [{id: 1, topic: 'Clase de Repaso', date:'2025-07-12'}] },
  2: { id: 2, name: 'Historia', teacher: 'Prof. Ana Martínez', icon: <History />, announcements: [], tasks: [], resources: [], classes: [] },
  3: { id: 3, name: 'Física', teacher: 'Prof. Roberto Silva', icon: <Atom />, announcements: [], tasks: [], resources: [], classes: [] },
  4: { id: 4, name: 'Literatura', teacher: 'Prof. María García', icon: <Languages />, announcements: [], tasks: [], resources: [], classes: [] },
  5: { id: 5, name: 'Biología', teacher: 'Prof. Laura Fernández', icon: <FlaskConical />, announcements: [], tasks: [], resources: [], classes: [] },
  6: { id: 6, name: 'Geografía', teacher: 'Prof. Javier Torres', icon: <Globe />, announcements: [], tasks: [], resources: [], classes: [] },
};

const EmptyState = ({ icon, title, description }) => (
    <div className="text-center py-16">
        <div className="mx-auto bg-muted text-muted-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

export default function SubjectDetail() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params.subjectId;
    const subject = materiasData[subjectId];

    if (!subject) {
        return (
            <ProtectedRoute>
                <Layout>
                    <div className="text-center py-10">Materia no encontrada</div>
                </Layout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Layout>
                <div className="space-y-6">
                    <div>
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/materias">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Materias
                            </Link>
                        </Button>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">{subject.name}</h1>
                                <p className="text-lg text-muted-foreground mt-1">Impartida por: {subject.teacher}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-xl text-primary">
                                {React.cloneElement(subject.icon, { size: 32 })}
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="announcements" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="announcements">Anuncios</TabsTrigger>
                            <TabsTrigger value="tasks">Tareas</TabsTrigger>
                            <TabsTrigger value="resources">Recursos</TabsTrigger>
                            <TabsTrigger value="classes">Clases Virtuales</TabsTrigger>
                        </TabsList>

                        <TabsContent value="announcements">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Últimos Anuncios</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {subject.announcements.length > 0 ? subject.announcements.map(a => <div key={a.id}>{a.title}</div>) : (
                                        <EmptyState icon={<Megaphone size={24}/>} title="Sin Anuncios" description="El profesor no ha publicado anuncios recientemente."/>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="tasks">
                            <Card>
                                <CardHeader><CardTitle>Tareas Pendientes</CardTitle></CardHeader>
                                <CardContent>
                                    {subject.tasks.length > 0 ? subject.tasks.map(t => <div key={t.id}>{t.title}</div>) : (
                                         <EmptyState icon={<ClipboardList size={24}/>} title="Sin Tareas" description="No tienes tareas pendientes en esta materia."/>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="resources">
                            <Card>
                                <CardHeader><CardTitle>Material de Estudio</CardTitle></CardHeader>
                                <CardContent>
                                    {subject.resources.length > 0 ? subject.resources.map(r => <div key={r.id}>{r.name}</div>) : (
                                        <EmptyState icon={<Folder size={24}/>} title="Sin Recursos" description="El profesor no ha subido materiales para esta materia."/>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="classes">
                            <Card>
                                <CardHeader><CardTitle>Clases Virtuales</CardTitle></CardHeader>
                                <CardContent>
                                    {subject.classes.length > 0 ? subject.classes.map(c => <div key={c.id}>{c.topic}</div>) : (
                                        <EmptyState icon={<Video size={24}/>} title="Sin Clases Programadas" description="No hay clases virtuales programadas por el momento."/>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </Layout>
        </ProtectedRoute>
    );
}
