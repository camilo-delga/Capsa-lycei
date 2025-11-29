'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { motion } from 'framer-motion';
import { BookOpen, Users, Bell, FlaskConical, History, Atom, Languages, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const materias = [
  { id: 1, name: 'Matemáticas', teacher: 'Prof. Carlos López', course: '5to A', students: 28, pendingTasks: 3, icon: <BookOpen />, color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Historia', teacher: 'Prof. Ana Martínez', course: '5to A', students: 28, pendingTasks: 1, icon: <History />, color: 'from-amber-500 to-amber-600' },
  { id: 3, name: 'Física', teacher: 'Prof. Roberto Silva', course: '5to A', students: 28, pendingTasks: 2, icon: <Atom />, color: 'from-violet-500 to-violet-600' },
  { id: 4, name: 'Literatura', teacher: 'Prof. María García', course: '5to B', students: 30, pendingTasks: 0, icon: <Languages />, color: 'from-orange-500 to-orange-600' },
  { id: 5, name: 'Biología', teacher: 'Prof. Laura Fernández', course: '5to B', students: 30, pendingTasks: 4, icon: <FlaskConical />, color: 'from-green-500 to-green-600' },
  { id: 6, name: 'Geografía', teacher: 'Prof. Javier Torres', course: '5to B', students: 30, pendingTasks: 2, icon: <Globe />, color: 'from-teal-500 to-teal-600' },
];

const MateriaCard = ({ materia, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className="h-full cursor-pointer"
    onClick={() => onClick(materia)}
  >
    <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className={`relative h-40 bg-gradient-to-br ${materia.color} flex items-center justify-center`}>
        <div className="text-white opacity-20 transform scale-150 transition-transform duration-500 group-hover:scale-175">{React.cloneElement(materia.icon, { size: 80 })}</div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-2xl font-bold text-white">{materia.name}</h3>
          <p className="text-sm text-white/90">{materia.teacher}</p>
        </div>
        {materia.pendingTasks > 0 &&
            <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
                <Bell className="w-3 h-3 mr-1.5"/>
                {materia.pendingTasks} Tareas
            </Badge>
        }
      </div>
      <CardContent className="p-4 flex-grow flex items-center justify-between bg-card">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1.5">
            <Users className="h-4 w-4" />
            <span>{materia.students}</span>
          </span>
          <Badge variant="outline">{materia.course}</Badge>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function VirtualClassroom() {
  const router = useRouter();

  const handleCardClick = (materia) => {
    router.push(`/materias/${materia.id}`);
  };

  const totalPendingTasks = materias.reduce((acc, materia) => acc + materia.pendingTasks, 0);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Mis Materias</h1>
                <p className="text-lg text-muted-foreground mt-1">Accede al contenido, tareas y anuncios de cada materia.</p>
              </div>
              {totalPendingTasks > 0 && (
                  <div className="flex items-center gap-2 bg-destructive/10 text-destructive font-semibold px-4 py-2 rounded-lg">
                      <Bell className="w-5 h-5"/>
                      <span>{totalPendingTasks} tareas pendientes en total</span>
                  </div>
              )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {materias.map((materia, index) => (
              <MateriaCard key={materia.id} materia={materia} index={index} onClick={handleCardClick} />
            ))}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
