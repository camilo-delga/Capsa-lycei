import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit } from 'lucide-react';
import { getStatusColor, getStatusLabel, calculatePercentage } from '@/lib/student_center_utils';
import { toast } from '@/components/ui/use-toast';

const PollsTab = ({ polls }) => {
  const handleCreatePoll = () => {
    toast({ title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Votaciones Estudiantiles</h2>
        <Button onClick={handleCreatePoll}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Votación
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {polls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{poll.title}</CardTitle>
                  <CardDescription>{poll.description}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(poll.status)} text-white`}>
                  {getStatusLabel(poll.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {poll.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{option.text}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.votes} votos ({calculatePercentage(option.votes, poll.totalVotes)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${calculatePercentage(option.votes, poll.totalVotes)}%` }}
                      ></div>
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
                  <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PollsTab;