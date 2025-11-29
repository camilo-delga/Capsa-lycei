'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Facebook, Instagram, Twitter, Youtube, BrainCircuit, ShieldCheck, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ReviewCard = ({ name, role, review, avatar, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-card p-6 rounded-2xl shadow-sm flex flex-col"
    >
        <div className="flex items-center mb-4">
            <img  class="w-12 h-12 rounded-full mr-4 object-cover" alt={name} src="https://images.unsplash.com/photo-1643101447193-9c59d5db2771" />
            <div>
                <h4 className="font-bold">{name}</h4>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </div>
        <p className="text-muted-foreground flex-grow">"{review}"</p>
        <div className="flex text-yellow-400 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
    </motion.div>
);

const LandingPage = () => {
  const router = useRouter();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "¡Gracias por suscribirte!",
      description: "Recibirás las últimas noticias y actualizaciones de Academy.",
    });
    e.target.reset();
  };

  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-lg border-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
           <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
                 <svg className="w-6 h-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.22979 5.47686 8.06185 6.25278L4.5 8.75278V15.2528L8.06185 17.7528C9.22979 18.5287 10.8321 18.5287 12 17.7528M12 6.25278C13.1679 5.47686 14.7702 5.47686 15.9381 6.25278L19.5 8.75278V15.2528L15.9381 17.7528C14.7702 18.5287 13.1679 18.5287 12 17.7528" />
                </svg>
              </div>
              <span className="font-bold text-2xl">Academy</span>
            </div>
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild><a href="#servicios">Servicios</a></Button>
            <Button variant="ghost" asChild><a href="#galeria">Galería</a></Button>
            <Button variant="ghost" asChild><a href="#reseñas">Reseñas</a></Button>
          </nav>
          <Button size="lg" onClick={() => router.push('/login')}>Iniciar Sesión</Button>
        </div>
      </header>

      <main>
        <section className="text-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
           <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
           <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Educación que <span className="text-primary">inspira</span> el mañana.
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground mb-10">
              Forjando líderes y innovadores con una base sólida en excelencia, integridad y visión global desde 1953.
            </p>
            <Button size="lg" className="text-lg py-7 px-10 shadow-lg shadow-primary/20" onClick={() => router.push('/login')}>
              Acceder a la Plataforma
            </Button>
          </motion.div>
        </section>

        <section id="servicios" className="py-24 bg-background">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">Plataforma Escolar Innovadora</h2>
                <p className="text-muted-foreground text-lg">
                    Ofrecemos una plataforma web y aplicación móvil con diseño moderno y funcional, facilitando la gestión escolar y la comunicación entre estudiantes y profesores.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img  className="rounded-2xl shadow-xl w-full aspect-video object-cover" alt="Dashboard de la plataforma en una tablet y un móvil" src="https://images.unsplash.com/photo-1653105665395-2f29163544cc" />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
               <motion.div
                className="order-last md:order-first"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img  className="rounded-2xl shadow-xl w-full aspect-video object-cover" alt="Grupo de estudiantes colaborando en un proyecto" src="https://images.unsplash.com/photo-1565841327798-694bc2074762" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">Nuestra Misión</h2>
                <p className="text-muted-foreground text-lg">
                  Nuestra misión es proporcionar herramientas educativas accesibles y efectivas, promoviendo un entorno de aprendizaje colaborativo y organizado para todos los usuarios.
                </p>
              </motion.div>
            </div>

          </div>
        </section>

        <section id="why-us" className="py-24 bg-card">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">¿Por qué elegir Academy?</h2>
              <p className="text-muted-foreground text-lg mt-3">Creamos un ecosistema digital centrado en el éxito del estudiante.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="inline-block p-4 bg-primary/10 text-primary rounded-xl mb-4"><BrainCircuit size={40}/></div>
                    <h3 className="text-xl font-bold mb-2">IA Integrada</h3>
                    <p className="text-muted-foreground">Asistente virtual para resolver dudas, organizar tareas y personalizar el aprendizaje.</p>
                </div>
                <div className="text-center p-6">
                    <div className="inline-block p-4 bg-primary/10 text-primary rounded-xl mb-4"><ShieldCheck size={40}/></div>
                    <h3 className="text-xl font-bold mb-2">Seguridad y Confianza</h3>
                    <p className="text-muted-foreground">Un entorno seguro y privado para la comunicación y el almacenamiento de datos.</p>
                </div>
                <div className="text-center p-6">
                    <div className="inline-block p-4 bg-primary/10 text-primary rounded-xl mb-4"><Users size={40}/></div>
                    <h3 className="text-xl font-bold mb-2">Comunidad Conectada</h3>
                    <p className="text-muted-foreground">Herramientas que fomentan la colaboración entre alumnos, docentes y familias.</p>
                </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Galería</h2>
              <p className="text-muted-foreground text-lg mt-3">Explora el diseño moderno de nuestra plataforma escolar interactiva.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div whileHover={{scale: 1.05}} className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <img  class="w-full h-full object-cover" alt="Vista del dashboard principal" src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5" />
              </motion.div>
              <motion.div whileHover={{scale: 1.05}} className="rounded-2xl overflow-hidden shadow-lg">
                  <img  class="w-full h-full object-cover" alt="Calendario de eventos escolares" src="https://images.unsplash.com/photo-1606327054476-256fc9690fe2" />
              </motion.div>
              <motion.div whileHover={{scale: 1.05}} className="rounded-2xl overflow-hidden shadow-lg">
                  <img  class="w-full h-full object-cover" alt="Interfaz de chat de mensajería" src="https://images.unsplash.com/photo-1604332195161-dd16db9dd6a4" />
              </motion.div>
              <motion.div whileHover={{scale: 1.05}} className="rounded-2xl overflow-hidden shadow-lg">
                  <img  class="w-full h-full object-cover" alt="Página de detalle de una materia" src="https://images.unsplash.com/photo-1545193711-d586b3b39890" />
              </motion.div>
              <motion.div whileHover={{scale: 1.05}} className="rounded-2xl overflow-hidden shadow-lg">
                  <img  class="w-full h-full object-cover" alt="Perfil de un estudiante" src="https://images.unsplash.com/photo-1666892666066-abe5c4865e9c" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="reseñas" className="py-24 bg-card">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Lo que dicen nuestros alumnos</h2>
              <p className="text-muted-foreground text-lg mt-3">Opiniones reales de estudiantes y profesores que usan Academy a diario.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ReviewCard name="Laura Gómez" role="Estudiante de 5º Curso" review="La plataforma es súper intuitiva. Me ayuda a tener todas mis materias y tareas organizadas en un solo lugar. ¡El calendario es un salvavidas!" avatar="Retrato de una estudiante sonriendo" delay={0.1} />
              <ReviewCard name="Carlos Mendoza" role="Profesor de Física" review="Academy ha transformado la forma en que me comunico con mis alumnos. Subir recursos y enviar anuncios es increíblemente fácil y rápido." avatar="Retrato de un profesor" delay={0.2} />
              <ReviewCard name="Sofía Rodríguez" role="Delegada del Centro de Estudiantes" review="Como delegada, las herramientas de encuestas y propuestas son geniales para organizar eventos y tomar decisiones. ¡La comunicación con los estudiantes nunca fue tan fluida!" avatar="Retrato de una delegada estudiantil" delay={0.3} />
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-gray-300">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h3 className="font-bold text-white text-lg mb-4">Características</h3>
                <p className="text-gray-400 mb-4">Plataforma escolar moderna y accesible para todos.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
                  <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
                  <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
                  <a href="#" className="text-gray-400 hover:text-white"><Youtube /></a>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-4">Contacto</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>+34 912 345 678</li>
                  <li>contacto@academy.edu</li>
                  <li>Calle Falsa 123, Madrid</li>
                </ul>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-bold text-white text-lg mb-4">Recibe nuestras noticias</h3>
                <p className="text-gray-400 mb-4">Suscríbete para recibir información sobre eventos, noticias y actualizaciones de la plataforma.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <Input type="email" placeholder="Introduce tu correo aquí" className="bg-gray-700 border-gray-600 text-white" required />
                  <Button type="submit" variant="secondary">Suscribirse</Button>
                </form>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Academy. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
