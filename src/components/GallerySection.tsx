"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Maximize2 } from 'lucide-react';

const demoPhotos = [
  { src: 'https://images.unsplash.com/photo-1603584173870-7f304f5ac40a?q=80&w=1200', alt: 'Инспекция 1' },
  { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200', alt: 'Инспекция 2' },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200', alt: 'Инспекция 3' },
  { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200', alt: 'Инспекция 4' },
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {demoPhotos.map((photo, i) => (
          <button 
            key={i}
            type="button"
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl border border-slate-200 block w-full bg-gray-100 shadow-sm"
            onClick={() => setIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-w-768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Maximize2 className="text-white w-8 h-8" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={demoPhotos.map(p => ({ src: p.src }))}
        plugins={[Zoom, Thumbnails]}
        portal={{ root: document.body }}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, 0.98)", zIndex: 99999 },
        }}
      />
    </div>
  );
}