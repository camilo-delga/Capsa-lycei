import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const getStatusColor = (status) => ({ active: 'bg-green-500', completed: 'bg-blue-500' }[status] || 'bg-gray-500');
const getStatusLabel = (status) => ({ active: 'Activa', completed: 'Completada' }[status] || 'Desconocido');

const PollCard = ({ poll }) => {
  const calculatePercentage = (votes, total) => (total > 0 ? Math.round((votes / total) * 100) : 0);
  const handleAction = () => toast({ title: "🚧 Función no implementada" });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{poll.title}</CardTitle>
            <CardDescription>{poll.description}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(poll.status)} text-white`}>{getStatusLabel(poll.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                <span className="text-sm text-muted-foreground">{option.votes} votos ({calculatePercentage(option.votes, poll.totalVotes)}%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${calculatePercentage(option.votes, poll.totalVotes)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>Total: {poll.totalVotes} votos</p>
            <p>Finaliza: {new Date(poll.endDate).toLocaleDateString('es-ES')}</p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleAction}><Eye className="h-4 w-4" /></Button>
            <Button size="sm" variant="outline" onClick={handleAction}><Edit className="h-4 w-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollCard;