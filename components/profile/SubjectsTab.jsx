'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Check, X, LogOut } from 'lucide-react';

const SubjectItem = ({ subject, onAction, type }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
            <h4 className="font-semibold">{subject.name}</h4>
            <p className="text-sm text-muted-foreground">{subject.teacher}</p>
        </div>
        <div className="flex space-x-2">
            {type === 'invitation' ? (
                <>
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => onAction('accept', subject.id)}>
                        <Check className="h-4 w-4 mr-1" /> Aceptar
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onAction('reject', subject.id)}>
                        <X className="h-4 w-4 mr-1" /> Rechazar
                    </Button>
                </>
            ) : (
                <Button size="sm" variant="destructive" onClick={() => onAction('leave', subject.id)}>
                    <LogOut className="h-4 w-4 mr-1" /> Abandonar
                </Button>
            )}
        </div>
    </div>
);

const SubjectsTab = ({ subjects, invitations, onAction }) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Mis Materias</CardTitle>
                    <CardDescription>Materias en las que estás inscrito actualmente.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {subjects.length > 0 ? (
                        subjects.map(subject => <SubjectItem key={subject.id} subject={subject} onAction={onAction} type="enrolled" />)
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No estás inscrito en ninguna materia.</p>
                    )}
                </CardContent>
            </Card>

            {invitations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Invitaciones Pendientes</CardTitle>
                        <CardDescription>Invitaciones para unirte a nuevas materias.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {invitations.map(subject => <SubjectItem key={subject.id} subject={subject} onAction={onAction} type="invitation" />)}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SubjectsTab;
