'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { getCategoryColor, getCategoryName } from '@/lib/news_utils';

const NewsCard = ({ item, index }) => {
  const handleAction = () => {
    toast({
      title: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getCategoryColor(item.category)} text-white`}>
                    {getCategoryName(item.category)}
                  </Badge>
                  {item.featured && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Destacada
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{item.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.publishDate).toLocaleDateString('es-ES')}</span>
                  </span>
                  <span>{item.readTime} lectura</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{item.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button size="sm" variant="ghost" onClick={handleAction}>
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleAction}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleAction}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
