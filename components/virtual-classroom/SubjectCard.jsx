'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SubjectCard = ({ subject, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 * index }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => onClick(subject)}
    >
      <CardContent className="p-6">
        <div className={`w-12 h-12 ${subject.color} rounded-full flex items-center justify-center mb-4`}>
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-bold mb-2">{subject.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{subject.teacher}</p>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{subject.students} estudiantes</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tareas pendientes:</span>
            <Badge variant={subject.pendingTasks > 0 ? "destructive" : "secondary"}>
              {subject.pendingTasks}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Materiales:</span>
            <span className="font-medium">{subject.materials}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default SubjectCard;
