'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const mockUsers = {
  estudiante: {
    email: 'alumno@school.edu.ar',
    password: 'password',
    user: { id: '2', name: 'Juan Pérez', email: 'alumno@school.edu.ar', role: 'alumno', course: '5to B', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }
  },
  profesor: {
    email: 'profesor@school.edu.ar',
    password: 'password123',
    user: { id: '3', name: 'Carlos López', email: 'profesor@school.edu.ar', role: 'docente', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' }
  },
  delegado: {
    email: 'delegado@school.edu.ar',
    password: 'password123',
    user: { id: '4', name: 'María García', email: 'delegado@school.edu.ar', role: 'delegado', course: '5to A', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }
  },
  desarrollador: {
    email: 'dev@school.edu.ar',
    password: 'password123',
    user: { id: '6', name: 'Admin', email: 'dev@school.edu.ar', role: 'administrador', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200' }
  }
};

const LoginPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const userRole = Object.keys(mockUsers).find(role => mockUsers[role].email === email && mockUsers[role].password === password);

    if (userRole) {
      const userData = mockUsers[userRole].user;
      login(userData);
      toast({
        title: 'Inicio de sesión exitoso',
        description: `¡Bienvenido/a de nuevo, ${userData.name}!`,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Error de autenticación',
        description: 'Correo electrónico o contraseña no válidos.',
        variant: 'destructive',
      });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Error de registro',
        description: 'Las contraseñas no coinciden.',
        variant: 'destructive',
      });
      return;
    }
    // Placeholder for actual sign-up logic with Supabase
    toast({
      title: '¡Registro exitoso!',
      description: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
    });
    setIsSigningUp(false);
    // Clear fields
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleQuickLogin = (role) => {
    if (mockUsers[role]) {
      setEmail(mockUsers[role].email);
      setPassword(mockUsers[role].password);
      toast({
        title: 'Datos de prueba cargados',
        description: `Presiona "Iniciar Sesión" para acceder como ${role}.`,
      });
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'circOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'circIn' } },
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative">
      <Button variant="ghost" asChild className="absolute top-6 left-6">
        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Link>
      </Button>
      <div className="w-full max-w-md">
        <Card className="shadow-2xl shadow-slate-300/50 dark:shadow-black/50 rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.22979 5.47686 8.06185 6.25278L4.5 8.75278V15.2528L8.06185 17.7528C9.22979 18.5287 10.8321 18.5287 12 17.7528M12 6.25278C13.1679 5.47686 14.7702 5.47686 15.9381 6.25278L19.5 8.75278V15.2528L15.9381 17.7528C14.7702 18.5287 13.1679 18.5287 12 17.7528" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{isSigningUp ? 'Crea tu cuenta' : 'Bienvenido/a de nuevo'}</h1>
              <p className="text-muted-foreground">{isSigningUp ? 'Completa el formulario para registrarte.' : 'Ingresa tus credenciales para acceder.'}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isSigningUp ? 'signup' : 'login'}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {isSigningUp ? (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input id="name" type="text" placeholder="Juan Pérez" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email-signup">Correo Institucional</Label>
                      <Input id="email-signup" type="email" placeholder="nombre@school.edu.ar" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="password-signup">Contraseña</Label>
                      <Input id="password-signup" type="password" placeholder="Crea una contraseña segura" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <Input id="confirm-password" type="password" placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1" />
                    </div>
                    <Button type="submit" className="w-full text-base font-bold py-3 mt-4" size="lg">Crear Cuenta</Button>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email-login">Correo Institucional</Label>
                      <Input id="email-login" type="email" placeholder="nombre@school.edu.ar" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="password-login">Contraseña</Label>
                      <Input id="password-login" type="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember-me" />
                        <Label htmlFor="remember-me" className="font-normal">Recordarme</Label>
                      </div>
                      <Link href="#" className="text-sm font-medium text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <Button type="submit" className="w-full text-base font-bold py-3 mt-4" size="lg">Iniciar Sesión</Button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)}>
                {isSigningUp ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Crea una'}
              </Button>
            </div>

            {!isSigningUp && (
              <div className="mt-6 border-t pt-6">
                <p className="text-center text-sm font-medium text-muted-foreground mb-4">O inicia sesión rápidamente como:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuickLogin('estudiante')}>Estudiante</Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickLogin('profesor')}>Profesor</Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickLogin('delegado')}>Delegado</Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickLogin('desarrollador')}>Admin</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
