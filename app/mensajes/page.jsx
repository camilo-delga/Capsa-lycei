'use client';

import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Users, MoreVertical, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/providers/auth-provider';
import { chats as initialChats, messages as initialMessages } from '@/data/messages';

const ChatListItem = ({ chat, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(chat)}
    className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
      isSelected ? 'bg-primary/10' : 'hover:bg-muted'
    }`}
  >
    <div className="relative">
      <Avatar className="h-12 w-12">
        {chat.avatar ? (
          <AvatarImage src={chat.avatar} alt={chat.name} />
        ) : (
          <AvatarFallback className="bg-primary/10 text-primary">
            {chat.icon && <chat.icon size={24} />}
          </AvatarFallback>
        )}
        <AvatarFallback className="bg-muted-foreground/20">
          {chat.type === 'group' ? <Users /> : chat.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
        <p className="text-xs text-muted-foreground">{chat.lastMessageTime}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
        {chat.unreadCount > 0 && <Badge className="bg-primary h-5 w-5 p-0 flex items-center justify-center text-xs">{chat.unreadCount}</Badge>}
      </div>
    </div>
  </button>
);

const MessageBubble = ({ message, senderAvatar }) => {
  const { user } = useAuth();
  const isMe = message.sender.name === user.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-3 w-full ${isMe ? 'justify-end' : ''}`}
    >
      {!isMe && (
        <Avatar className="h-8 w-8 self-end">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[70%]`}>
        <div className={`p-3 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-background border rounded-bl-md'}`}>
          {!isMe && <p className="font-bold text-sm mb-1 text-primary">{message.sender.name}</p>}
          <p className="text-sm leading-snug">{message.content}</p>
        </div>
        <p className={`text-xs mt-1 px-1 ${isMe ? 'text-right' : 'text-left'} text-muted-foreground`}>{message.time}</p>
      </div>
    </motion.div>
  );
};

export default function Messages() {
  const [chats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState(initialMessages[selectedChat.id] || []);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages[selectedChat.id] || []);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: { name: user.name, avatar: user.avatar },
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex border rounded-2xl bg-card overflow-hidden" style={{height: 'calc(100vh - 8rem)'}}>
          <aside className="w-[320px] border-r flex flex-col p-4 space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Mensajes</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-9 rounded-xl" />
            </div>
            <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-1">
               <p className="text-xs font-semibold text-muted-foreground uppercase pt-3 pb-1 px-2">Anclados</p>
              {chats.filter(c=>c.pinned).map(chat => (
                  <ChatListItem key={chat.id} chat={chat} isSelected={selectedChat.id === chat.id} onSelect={setSelectedChat} />
              ))}
               <p className="text-xs font-semibold text-muted-foreground uppercase pt-3 pb-1 px-2">Todos los chats</p>
              {chats.filter(c=>!c.pinned).map(chat => (
                  <ChatListItem key={chat.id} chat={chat} isSelected={selectedChat.id === chat.id} onSelect={setSelectedChat} />
              ))}
            </div>
          </aside>

          <main className="flex-1 flex flex-col bg-background">
            {selectedChat ? (
              <>
                <header className="p-4 border-b flex items-center justify-between bg-card">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                       {selectedChat.avatar ? (
                          <AvatarImage src={selectedChat.avatar} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {selectedChat.icon && <selectedChat.icon size={20} />}
                          </AvatarFallback>
                        )}
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-bold text-foreground">{selectedChat.name}</h2>
                      <p className="text-xs text-muted-foreground">{selectedChat.participants ? `${selectedChat.participants} participantes` : 'En línea'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                      <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                  </div>
                </header>

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} message={msg} senderAvatar={msg.sender.avatar} />
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                <footer className="p-4 border-t bg-card">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-muted border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary"
                    />
                    <Button type="submit" size="icon" className="rounded-full">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Selecciona un chat para empezar a conversar</p>
              </div>
            )}
          </main>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
