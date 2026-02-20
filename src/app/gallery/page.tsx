"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PHOTOS, CATEGORIES, Photo } from "@/lib/photos";
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Calendar, Download } from "lucide-react";

// Lightbox
function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image container */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[75vh] flex items-center justify-center">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="max-h-[75vh] w-auto object-contain rounded-lg"
            sizes="90vw"
            quality={95}
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-white space-y-1 px-4">
          <p className="font-serif text-lg">{photo.caption}</p>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {photo.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {photo.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single photo card
function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  return (
    <div
      className="photo-card relative overflow-hidden rounded-xl bg-muted cursor-pointer group mb-3 sm:mb-4"
      onClick={onClick}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="w-full h-auto block"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7" />
      </div>
      {/* Caption overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
        <p className="text-white/60 text-[10px] mt-0.5">{photo.location} · {photo.date}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCat = searchParams.get("cat") ?? "all";
  const initialPhoto = searchParams.get("photo");

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? PHOTOS
      : PHOTOS.filter(p => p.category === activeCategory);

  // Open from URL param on mount
  useEffect(() => {
    if (initialPhoto) {
      const found = PHOTOS.find(p => p.id === initialPhoto);
      if (found) setLightboxPhoto(found);
    }
  }, [initialPhoto]);

  const openLightbox = (photo: Photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);

  const lightboxIndex = lightboxPhoto
    ? filteredPhotos.findIndex(p => p.id === lightboxPhoto.id)
    : -1;

  const prevPhoto = useCallback(() => {
    if (lightboxIndex <= 0) return;
    setLightboxPhoto(filteredPhotos[lightboxIndex - 1]);
  }, [lightboxIndex, filteredPhotos]);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex >= filteredPhotos.length - 1) return;
    setLightboxPhoto(filteredPhotos[lightboxIndex + 1]);
  }, [lightboxIndex, filteredPhotos]);

  const changeCategory = (cat: string) => {
    setActiveCategory(cat);
    setLightboxPhoto(null);
  };

  // Split into 3 columns for masonry
  const col1 = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2 = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3 = filteredPhotos.filter((_, i) => i % 3 === 2);

  return (
    <div className="pt-16 min-h-screen">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-2">Portfolio</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">Gallery</h1>
        <p className="text-muted-foreground max-w-xl">
          A collection of photographs from across Punjab — landscapes, skies, fields, and the creatures that call this land home.
        </p>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => changeCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-xs text-muted-foreground mb-6">
          {filteredPhotos.length} {filteredPhotos.length === 1 ? "photo" : "photos"}
        </p>

        {/* 3-column masonry */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map(photo => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => openLightbox(photo)} />
              ))}
            </div>
          ))}
        </div>

        {/* 2-column mobile */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[
            filteredPhotos.filter((_, i) => i % 2 === 0),
            filteredPhotos.filter((_, i) => i % 2 === 1),
          ].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map(photo => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => openLightbox(photo)} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
