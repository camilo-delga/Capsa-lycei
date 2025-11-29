'use client';

import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  const events = useMemo(() => [
    { date: new Date(2025, 6, 15), title: 'Conferencia de Padres y Profesores', type: 'reunion' },
    { date: new Date(2025, 6, 20), title: 'Examen Parcial de Matemáticas', type: 'examen' },
    { date: new Date(2025, 6, 21), title: 'Examen Parcial de Historia', type: 'examen' },
    { date: new Date(2025, 6, 25), title: 'Feriado Escolar', type: 'feriado' },
    { date: new Date(2025, 6, 3), title: 'Entrega de proyecto de Física', type: 'entrega' },
    { date: new Date(2025, 7, 1), title: 'Inicio del segundo cuatrimestre', type: 'evento' },
  ], []);

  const sortedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date - b.date);
  }, [events]);

  const getEventColor = (type) => {
    switch (type) {
      case 'reunion': return 'bg-purple-500';
      case 'examen': return 'bg-red-500';
      case 'feriado': return 'bg-green-500';
      case 'entrega': return 'bg-blue-500';
      case 'evento': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const DayWithDot = ({ date, displayMonth }) => {
    const dayEvents = events.filter(e => e.date.toDateString() === date.toDateString());

    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <span>{format(date, 'd')}</span>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
        )}
      </div>
    );
  };

  const selectedDayEvents = events.filter(e => e.date.toDateString() === date.toDateString());

  const handleNewEvent = () => {
    toast({
      title: '🚧 Función no implementada',
      description: 'Pronto podrás agregar tus propios eventos al calendario.',
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <main className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Calendario</h1>
                <p className="text-lg text-muted-foreground mt-1">Organiza tus eventos y fechas importantes.</p>
              </div>
              <Button size="lg" onClick={handleNewEvent}>
                <Plus className="mr-2 h-5 w-5" /> Nuevo Evento
              </Button>
            </div>
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-2">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  className="w-full"
                  classNames={{
                    root: 'p-4',
                    months: 'space-y-4',
                    caption_label: 'text-xl font-bold',
                    nav_button: 'h-9 w-9',
                    head_cell: 'w-full text-muted-foreground font-semibold text-sm uppercase pb-2',
                    table: 'w-full border-collapse mt-4',
                    row: 'flex w-full mt-2',
                    cell: 'h-16 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg',
                    day: 'h-full w-full p-1 font-normal aria-selected:opacity-100 rounded-lg transition-colors hover:bg-accent',
                    day_selected: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90',
                    day_today: 'bg-accent text-accent-foreground font-bold',
                    day_outside: 'text-muted-foreground/50 opacity-50',
                  }}
                  components={{
                    Day: DayWithDot,
                    IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
                    IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
                  }}
                />
              </CardContent>
            </Card>
          </main>

          <aside className="lg:col-span-1 space-y-6 sticky top-24">
             <Card className="rounded-2xl shadow-lg">
               <CardHeader>
                 <CardTitle>
                   Próximos Eventos
                 </CardTitle>
               </CardHeader>
               <CardContent>
                  {sortedEvents.length > 0 ? (
                      <div className="space-y-4">
                          {sortedEvents.slice(0, 5).map((event, index) => (
                          <div key={index} className="flex items-start space-x-3">
                              <div className={`mt-1.5 h-3 w-3 rounded-full flex-shrink-0 ${getEventColor(event.type)}`}></div>
                              <div>
                                  <p className="font-semibold text-foreground">{event.title}</p>
                                  <p className="text-sm text-muted-foreground">{format(event.date, "EEEE, d 'de' MMMM", { locale: es })}</p>
                              </div>
                          </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-muted-foreground">No hay eventos próximos.</p>
                  )}
               </CardContent>
             </Card>
          </aside>

        </div>
      </Layout>
    </ProtectedRoute>
  );
}
