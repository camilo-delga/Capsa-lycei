import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Vote } from 'lucide-react';
import { getStatusColor, getStatusLabel } from '@/lib/student_center_utils';
import { toast } from '@/components/ui/use-toast';

const ProposalsTab = ({ proposals }) => {
  const handleCreateProposal = () => {
    toast({ title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Propuestas Estudiantiles</h2>
        <Button onClick={handleCreateProposal}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Propuesta
        </Button>
      </div>
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{proposal.title}</h3>
                    <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                      {getStatusLabel(proposal.status)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{proposal.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Por: {proposal.submittedBy}</span>
                    <span>Fecha: {new Date(proposal.submittedDate).toLocaleDateString('es-ES')}</span>
                    <span className="flex items-center space-x-1">
                      <Vote className="h-4 w-4" />
                      <span>{proposal.votes} votos de apoyo</span>
                    </span>
                  </div>
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

export default ProposalsTab;