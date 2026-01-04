"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Maximize2 } from 'lucide-react';

// Използваме твоите нови локални снимки от public/images/sample-report/
const demoPhotos = [
  { src: '/images/sample-report/1.jpg', category: 'Екстериор' },
  { src: '/images/sample-report/2.jpg', category: 'Екстериор' },
  { src: '/images/sample-report/3.jpg', category: 'Двигател' },
  { src: '/images/sample-report/4.jpg', category: 'Интериор' },
  { src: '/images/sample-report/5.jpg', category: 'Интериор' },
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState('Всички');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categories = ['Всички', 'Екстериор', 'Интериор', 'Двигател'];
  const filteredPhotos = filter === 'Всички' 
    ? demoPhotos 
    : demoPhotos.filter(p => p.category === filter);

  return (
    <div className="w-full bg-white p-6">
      {/* Категории */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Мрежа със снимки */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 shadow-2xl rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
        {filteredPhotos.map((photo, i) => (
          <button 
            key={i}
            type="button"
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden bg-slate-200 block w-full"
            onClick={() => setIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.category}
              fill
              className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-w-768px) 50vw, 25vw"
              priority={i < 4}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <Maximize2 className="text-white w-6 h-6" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox преглед */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={filteredPhotos.map(p => ({ src: p.src }))}
        plugins={[Zoom, Thumbnails]}
        portal={{ root: document.body }}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, 0.98)", zIndex: 99999 },
        }}
      />
    </div>
  );
}