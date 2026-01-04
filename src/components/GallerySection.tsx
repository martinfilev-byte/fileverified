"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { Maximize2 } from 'lucide-react';

const demoPhotos = [
  { src: 'https://images.unsplash.com/photo-1603584173870-7f304f5ac40a?q=80&w=2069', alt: 'Инспекция 1' },
  { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070', alt: 'Инспекция 2' },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070', alt: 'Инспекция 3' },
  { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070', alt: 'Инспекция 4' },
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {demoPhotos.map((photo, i) => (
          <div 
            key={i}
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl border border-slate-100"
            onClick={() => setIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-w-768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
              <Maximize2 className="text-white w-6 h-6 shadow-sm" />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={demoPhotos.map(p => ({ src: p.src }))}
        plugins={[Zoom]}
      />
    </div>
  );
}