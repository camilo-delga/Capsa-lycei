'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MoreVertical, Phone, Video, Paperclip, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ chat, messages, newMessage, onNewMessageChange, onSendMessage, onAttachment, onCall, onVideoCall }) => {
  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
            <div>
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-muted-foreground">
                {chat.type === 'group'
                  ? `${chat.participants} participantes`
                  : 'En línea'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {chat.type === 'individual' && (
              <>
                <Button size="sm" variant="ghost" onClick={onCall}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button size="sm" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </CardContent>

      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={onAttachment}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1"
          />
          <Button onClick={onSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow;
