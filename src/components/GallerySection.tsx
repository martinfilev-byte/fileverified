"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Maximize2 } from 'lucide-react';

// Директни пътища към твоите 5 снимки
const images = [
  "/images/sample-report/1.jpg",
  "/images/sample-report/2.jpg",
  "/images/sample-report/3.jpg",
  "/images/sample-report/4.jpg",
  "/images/sample-report/5.jpg",
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {images.map((src, i) => (
          <div 
            key={i}
            className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg bg-gray-100 border border-slate-200"
            onClick={() => setIndex(i)}
          >
            <Image
              src={src}
              alt={`Автомобил инспекция ${i + 1}`}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-w-768px) 50vw, 20vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Maximize2 className="text-white w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

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