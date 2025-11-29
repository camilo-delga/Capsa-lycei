'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/providers/auth-provider';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, MessageSquare, BarChart2, CheckCircle, Sparkles, AlertCircle, Newspaper, Rss } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';
import { toast } from '@/components/ui/use-toast';
import { news as allNews } from '@/data/news';

const gradesData = [
  { subject: 'Mat', grade: 8 }, { subject: 'Hist', grade: 9 },
  { subject: 'Fís', grade: 7 }, { subject: 'Lit', grade: 10 },
  { subject: 'Bio', grade: 8 }, { subject: 'Geo', grade: 9 }
];

const NewsItem = ({ news }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="flex items-start space-x-4 p-4 rounded-xl transition-colors duration-200 hover:bg-muted">
    <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${news.category === 'urgente' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
      {news.category === 'urgente' ? <AlertCircle className="w-6 h-6"/> : <Newspaper className="w-6 h-6"/>}
    </div>
    <div className="flex-1">
      <Badge variant={news.category === 'urgente' ? 'destructive' : 'secondary'} className="mb-1 capitalize">{news.category}</Badge>
      <h4 className="font-semibold text-foreground">{news.title}</h4>
      <p className="text-sm text-muted-foreground">{news.excerpt}</p>
    </div>
  </motion.div>
);


export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const latestNews = allNews.slice(0, 3);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground">¡Hola de nuevo, {user?.name.split(' ')[0]}!</h1>
            <p className="text-lg text-muted-foreground mt-1">Aquí tienes un resumen de tu actividad y novedades.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.8</div>
                <p className="text-xs text-muted-foreground">+0.2 vs. último período</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                 <p className="text-xs text-muted-foreground">3 ausencias este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 esta semana</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mensajes sin leer</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary-foreground/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-primary-foreground/80">2 de grupos, 3 directos</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Rendimiento Académico</CardTitle>
                <CardDescription>Calificaciones por materia del último bimestre.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                      }}
                      cursor={{ fill: 'hsl(var(--muted))' }}
                    />
                    <Bar dataKey="grade" radius={[4, 4, 0, 0]}>
                      {gradesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" size="lg" onClick={() => router.push('/materias')}><BookOpen className="mr-2 h-4 w-4" /> Ir a Materias</Button>
                  <Button className="w-full justify-start" size="lg" variant="secondary" onClick={() => router.push('/asistente')}><Sparkles className="mr-2 h-4 w-4" /> Asistente Virtual</Button>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle>Próxima Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-red-500/10 text-red-500 p-3 rounded-lg">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold">Ensayo de Literatura</p>
                      <p className="text-sm text-muted-foreground">Vence en 3 días</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Últimas Noticias</CardTitle>
                <CardDescription>Mantente al día con las novedades de la institución.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/noticias')}>
                <Rss className="mr-2 h-4 w-4" /> Ver Todas
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {latestNews.map(news => (
                  <NewsItem key={news.id} news={news} />
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </Layout>
    </ProtectedRoute>
  );
}
