'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Search, Users, Pin } from 'lucide-react';

const ChatList = ({ chats, selectedChat, onChatSelect, searchTerm, onSearchChange }) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Mensajes</span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversaciones..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b ${
                selectedChat?.id === chat.id ? 'bg-accent' : ''
              }`}
              onClick={() => onChatSelect(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>
                      {chat.type === 'group' ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        chat.name.split(' ').map(n => n[0]).join('').toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {chat.unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate flex items-center space-x-1">
                      <span>{chat.name}</span>
                      {chat.pinned && <Pin className="h-3 w-3 text-primary" />}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.type === 'group' && (
                    <p className="text-xs text-muted-foreground">
                      {chat.participants} participantes
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatList;
