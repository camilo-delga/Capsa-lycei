'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout';
import ProtectedRoute from '@/components/protected-route';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, news as allNews } from '@/data/news';

const NewsCard = ({ news, isFeatured = false }) => {
  const categoryInfo = categories.find(c => c.id === news.category) || {};

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl overflow-hidden bg-card border shadow-sm hover:shadow-lg transition-all duration-300 group ${isFeatured ? 'col-span-1 md:col-span-2' : ''}`}
    >
      <div className="relative">
        <img  className={`w-full object-cover ${isFeatured ? 'h-64' : 'h-48'}`} alt={news.title} src="https://images.unsplash.com/photo-1690120225080-e48e3aea49de" />
        <div className="absolute top-4 left-4">
          <Badge style={{ backgroundColor: categoryInfo.color }} className="text-white capitalize shadow-md">{news.category}</Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors ${isFeatured ? 'text-2xl' : 'text-xl'}`}>{news.title}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{news.excerpt}</p>
        <div className="text-xs text-muted-foreground mt-4 flex justify-between items-center">
          <span>Por {news.author} &bull; {news.publishDate}</span>
          <span>Lectura de {news.readTime}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = allNews
    .filter(news => selectedCategory === 'todas' || news.category === selectedCategory)
    .filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Tablón de Noticias</h1>
            <p className="text-lg text-muted-foreground mt-2">Mantente al día con las últimas novedades y anuncios de la comunidad.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                className="pl-12 text-base py-6 rounded-full bg-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0 bg-card p-1.5 rounded-full flex items-center gap-1 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors capitalize ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredNews.map((news, index) => (
                <NewsCard key={news.id} news={news} isFeatured={index === 0 && selectedCategory === 'todas' && !searchTerm} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold">No se encontraron noticias</h3>
              <p className="text-muted-foreground mt-2">Prueba con otra categoría o término de búsqueda.</p>
            </div>
          )}

        </div>
      </Layout>
    </ProtectedRoute>
  );
}
