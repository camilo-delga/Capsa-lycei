'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { polls, events, proposals, statistics } from '@/data/student_center';
import StatisticsCards from '@/components/student-center/StatisticsCards';
import PollsTab from '@/components/student-center/PollsTab';
import EventsTab from '@/components/student-center/EventsTab';
import ProposalsTab from '@/components/student-center/ProposalsTab';
import AnalyticsTab from '@/components/student-center/AnalyticsTab';

export default function StudentCenter() {
  return (
    <ProtectedRoute requiredRole="delegado">
      <Layout>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Centro de Estudiantes</h1>
                <p className="text-muted-foreground">Panel de gestión para delegados y representantes estudiantiles</p>
              </div>
              <div className="hidden md:block">
                <img  alt="Estudiantes en reunión" className="w-24 h-24 rounded-lg" src="https://images.unsplash.com/photo-1658161587858-d4814b7c9591" />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <StatisticsCards statistics={statistics} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Tabs defaultValue="polls" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="polls">Votaciones</TabsTrigger>
                <TabsTrigger value="events">Eventos</TabsTrigger>
                <TabsTrigger value="proposals">Propuestas</TabsTrigger>
                <TabsTrigger value="analytics">Análisis</TabsTrigger>
              </TabsList>

              <TabsContent value="polls"><PollsTab polls={polls} /></TabsContent>
              <TabsContent value="events"><EventsTab events={events} /></TabsContent>
              <TabsContent value="proposals"><ProposalsTab proposals={proposals} /></TabsContent>
              <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
