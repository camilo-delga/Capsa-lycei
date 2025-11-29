'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, Calendar, ClipboardList, HelpCircle, Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import ReactMarkdown from 'react-markdown';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default function AssistantPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();

  // Handle optional catch-all route - chatId might be undefined or an array
  const chatId = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : 'new';

  const [chats, setChats] = useLocalStorage('ai-chats', {});
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const currentChat = chats[chatId] || null;

  useEffect(() => {
    if (chatId === 'new') {
      const newChatId = uuidv4();
      const newChat = {
        id: newChatId,
        title: 'Nueva Conversación',
        messages: [{
          id: 1,
          sender: 'ai',
          text: `¡Hola, ${user?.name.split(' ')[0]}! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?`,
        }],
        createdAt: new Date().toISOString(),
      };
      setChats(prev => ({ ...prev, [newChatId]: newChat }));
      router.replace(`/asistente/${newChatId}`);
    }
  }, [chatId, router, setChats, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [currentChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentChat) return;

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      text: input,
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
    };
    setChats(prev => ({ ...prev, [chatId]: updatedChat }));

    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input, updatedChat.messages);
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
        title: updatedChat.messages.length < 3 ? input.substring(0, 30) + '...' : updatedChat.title,
      };
      setChats(prev => ({ ...prev, [chatId]: finalChat }));
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickAction = (text) => {
    if (isLoading || !currentChat) return;
    const userMessage = { id: uuidv4(), sender: 'user', text };
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
    };
    setChats(prev => ({ ...prev, [chatId]: updatedChat }));
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = getAIResponse(text, updatedChat.messages);
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      };
      setChats(prev => ({ ...prev, [chatId]: finalChat }));
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userInput, chatHistory) => {
    const lowerCaseInput = userInput.toLowerCase();
    let responseText = "No he entendido bien tu petición. Recuerda que soy un asistente en desarrollo. Puedes probar preguntándome sobre tus tareas pendientes, tu próxima clase o pidiéndome que cree un recordatorio.";

    if (lowerCaseInput.includes('hola') || lowerCaseInput.includes('buenos días')) {
        responseText = `¡Hola de nuevo! ¿En qué puedo ayudarte?`;
    } else if (lowerCaseInput.includes('tareas pendientes') || lowerCaseInput.includes('deberes')) {
        responseText = `Claro, déjame revisar... Aquí tienes un resumen de tus tareas pendientes:\n- **Ensayo de Literatura:** Vence en 3 días.\n- **Problemas de Física:** Vencen en 5 días.\n- **Cuestionario de Historia:** Vence mañana.\n¡No te olvides de entregarlas a tiempo!`;
    } else if (lowerCaseInput.includes('próxima clase') || lowerCaseInput.includes('siguiente clase')) {
        responseText = "Tu próxima clase es **Matemáticas con el Prof. Carlos López** a las 10:00 AM en el Aula 3B.";
    } else if (lowerCaseInput.includes('recordatorio') || lowerCaseInput.includes('recuérdame')) {
        responseText = "¡Hecho! He creado un recordatorio. Te avisaré sobre 'Estudiar para el examen de Biología' esta tarde a las 5:00 PM. ¿Necesitas algo más?";
        toast({ title: "Recordatorio Creado", description: "Se ha añadido un nuevo recordatorio a tu calendario." });
    } else if (lowerCaseInput.includes('gracias')) {
        responseText = "¡De nada! Estoy aquí para ayudarte cuando lo necesites.";
    }

    return {
      id: uuidv4(),
      sender: 'ai',
      text: responseText,
    };
  };

  const handleDeleteChat = (idToDelete) => {
    const newChats = { ...chats };
    delete newChats[idToDelete];
    setChats(newChats);
    if (chatId === idToDelete) {
      router.push('/asistente');
    }
  };

  const sortedChats = Object.values(chats).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="flex h-screen bg-card dark:bg-gray-900 text-foreground">
        <aside className="w-64 bg-gray-50 dark:bg-gray-800/50 p-4 flex flex-col border-r dark:border-gray-700">
          <Button onClick={() => router.push('/asistente')} className="w-full mb-4">
            <Plus className="w-4 h-4 mr-2" /> Nueva Conversación
          </Button>
          <div className="flex-grow overflow-y-auto space-y-1 -mr-2 pr-2">
            {sortedChats.map(chat => (
              <Link
                href={`/asistente/${chat.id}`}
                key={chat.id}
                className={`flex items-center justify-between p-2 rounded-lg group ${chatId === chat.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
              >
                <div className="flex items-center min-w-0">
                  <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-sm font-medium">{chat.title}</span>
                </div>
                <Trash2
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteChat(chat.id); }}
                  className="w-4 h-4 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t dark:border-gray-700">
            <Link href="/perfil" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">{user?.name}</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative">
          <Button onClick={() => router.push('/dashboard')} variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full z-10">
            <X className="w-5 h-5" />
          </Button>
          <div className="flex-grow p-4 md:p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence>
                {currentChat?.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-4`}
                  >
                    <Avatar className="w-8 h-8 border">
                      {msg.sender === 'ai' ? (
                        <div className="w-full h-full bg-primary flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                      ) : (
                        <>
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className="flex-1 pt-1">
                      <p className="font-bold text-sm mb-2">{msg.sender === 'ai' ? 'Asistente' : user.name}</p>
                      <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-li:my-0">
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-4"
                >
                  <Avatar className="w-8 h-8 border">
                    <div className="w-full h-full bg-primary flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </Avatar>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-sm mb-2">Asistente</p>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-0"></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 border-t dark:border-gray-700 bg-card dark:bg-gray-900">
            <div className="max-w-3xl mx-auto">
              {currentChat?.messages.length <= 1 && (
                <div className="mb-3 flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => handleQuickAction("¿Cuáles son mis tareas pendientes?")}><ClipboardList className="w-4 h-4 mr-2"/>Tareas pendientes</Button>
                    <Button size="sm" variant="outline" onClick={() => handleQuickAction("¿Cuál es mi próxima clase?")}><Calendar className="w-4 h-4 mr-2"/>Próxima clase</Button>
                    <Button size="sm" variant="outline" onClick={() => handleQuickAction("Recuérdame estudiar para el examen de Biología")}><HelpCircle className="w-4 h-4 mr-2"/>Crear recordatorio</Button>
                </div>
              )}
              <form onSubmit={handleSendMessage} className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-grow pr-12 h-12 text-base bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  disabled={isLoading || !currentChat}
                />
                <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" disabled={isLoading || !input.trim() || !currentChat}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
