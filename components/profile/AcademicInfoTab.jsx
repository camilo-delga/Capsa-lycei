import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AcademicInfoTab = ({ academicInfo }) => {
  const progressPercentage = (parseInt(academicInfo.completedCredits) / parseInt(academicInfo.totalCredits)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Académica</CardTitle>
        <CardDescription>Detalles sobre tu progreso académico</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Curso Actual</label>
              <p className="text-lg font-semibold">{academicInfo.course}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID Estudiante</label>
              <p className="text-lg font-semibold">{academicInfo.studentId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Fecha de Ingreso</label>
              <p className="text-lg font-semibold">{new Date(academicInfo.enrollmentDate).toLocaleDateString('es-ES')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Graduación Esperada</label>
              <p className="text-lg font-semibold">{new Date(academicInfo.expectedGraduation).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Promedio General</label>
              <p className="text-2xl font-bold text-green-600">{academicInfo.currentGPA}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Progreso de Créditos</label>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completados: {academicInfo.completedCredits}</span>
                  <span>Total: {academicInfo.totalCredits}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% completado</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicInfoTab;
