'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  BookOpen,
  Calendar,
  Newspaper,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  User,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavLink = ({ to, children, isMobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === to || (to !== '/dashboard' && pathname.startsWith(to));

  if (isMobile) {
    return (
      <Link
        href={to}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted'
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-foreground bg-muted'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}>
        {children}
    </Link>
  );
};

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { name: 'Materias', href: '/materias', icon: BookOpen },
    { name: 'Calendario', href: '/calendario', icon: Calendar },
    { name: 'Mensajes', href: '/mensajes', icon: MessageSquare },
    { name: 'Noticias', href: '/noticias', icon: Newspaper },
  ];

  if (user?.role === 'delegado' || user?.role === 'administrador') {
    navigation.push({ name: 'C. Estudiantes', href: '/centro-estudiantes', icon: Users });
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full bg-card/90 backdrop-blur-lg border-b">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                 <div className="w-9 h-9 bg-foreground rounded-xl flex items-center justify-center">
                   <svg className="w-5 h-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.22979 5.47686 8.06185 6.25278L4.5 8.75278V15.2528L8.06185 17.7528C9.22979 18.5287 10.8321 18.5287 12 17.7528M12 6.25278C13.1679 5.47686 14.7702 5.47686 15.9381 6.25278L19.5 8.75278V15.2528L15.9381 17.7528C14.7702 18.5287 13.1679 18.5287 12 17.7528" />
                  </svg>
                </div>
                <span className="font-bold text-xl text-foreground hidden sm:block">Academy</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <nav className="hidden md:flex items-center space-x-2">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="w-px h-6 bg-border hidden md:block mx-2"></div>

              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push('/asistente')}>
                <Sparkles className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Cuenta</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="md:hidden">
                <Button onClick={() => setMobileMenuOpen(true)} variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card shadow-lg md:hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Menú</span>
                <Button onClick={() => setMobileMenuOpen(false)} variant="ghost" size="icon" className="rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} onClick={() => setMobileMenuOpen(false)}>
                      <NavLink
                        to={item.href}
                        isMobile={true}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </NavLink>
                    </div>
                  )
                })}
                 <div onClick={() => setMobileMenuOpen(false)}>
                    <NavLink to="/asistente" isMobile={true}>
                        <Sparkles className="h-5 w-5" />
                        <span>Asistente IA</span>
                    </NavLink>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
