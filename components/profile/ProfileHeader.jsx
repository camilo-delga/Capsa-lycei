'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, X } from 'lucide-react';
import { getProfileRoleColor, getProfileRoleLabel } from '@/lib/profile_utils';

const ProfileHeader = ({ user, isEditing, onEditToggle }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-2xl">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <Badge className={`${getProfileRoleColor(user?.role)} text-white`}>
                {getProfileRoleLabel(user?.role)}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{user?.email}</p>
            {user?.course && (
              <p className="text-sm text-muted-foreground">
                Curso: {user.course}
              </p>
            )}
          </div>
          <Button
            onClick={onEditToggle}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
