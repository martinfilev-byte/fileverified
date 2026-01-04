"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Maximize2, ImageIcon } from 'lucide-react';

interface GalleryProps {
  images?: string[];
}

export default function GallerySection({ images = [] }: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || images.length === 0) return null;

  // Показваме само първите 5 снимки в мрежата
  const visibleImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {visibleImages.map((src, i) => {
          const isLastVisible = i === 4 && remainingCount > 0;

          return (
            <div 
              key={i}
              className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl bg-gray-100 border border-slate-200 shadow-sm"
              onClick={() => setIndex(i)}
            >
              <Image
                src={src}
                alt={`Инспекция детайл ${i + 1}`}
                fill
                className={`object-cover transition duration-300 group-hover:scale-110 ${isLastVisible ? 'blur-[2px] brightness-50' : ''}`}
                sizes="(max-w-768px) 50vw, 20vw"
              />
              
              {/* Overlay за нормалните снимки */}
              {!isLastVisible && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <Maximize2 className="text-white w-6 h-6" />
                </div>
              )}

              {/* Специален бутон върху 5-тата снимка, ако има още */}
              {isLastVisible && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 group-hover:bg-black/20 transition-colors">
                  <span className="text-2xl font-black">+{remainingCount}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">снимки</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Бутон под галерията за по-добра видимост */}
      {remainingCount > 0 && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => setIndex(0)}
            className="flex items-center gap-2 px-6 py-2 border-2 border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm"
          >
            <ImageIcon className="w-4 h-4" />
            ВИЖ ВСИЧКИ {images.length} СНИМКИ
          </button>
        </div>
      )}

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map(src => ({ src }))}
        plugins={[Zoom, Thumbnails]}
        portal={{ root: document.body }}
      />
    </div>
  );
}