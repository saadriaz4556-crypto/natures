"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_PHOTOS } from "@/lib/photos";
import { PHOTOS } from "@/lib/photos";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(HERO_PHOTOS.map(() => false));

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % HERO_PHOTOS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + HERO_PHOTOS.length) % HERO_PHOTOS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const markLoaded = (idx: number) => {
    setLoaded(prev => { const n = [...prev]; n[idx] = true; return n; });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-900">
      {HERO_PHOTOS.map((photo, idx) => (
        <div
          key={photo.id}
          className={`hero-slide ${idx === current ? "active" : ""}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={idx === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
            onLoad={() => markLoaded(idx)}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>
      ))}

      {/* Caption */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center px-4">
        <div className="text-center text-white fade-in">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
            {HERO_PHOTOS[current].location}
          </p>
          <p className="text-sm text-white/80 font-light">
            {HERO_PHOTOS[current].caption}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {HERO_PHOTOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-sm"
        aria-label="Next photo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase flex flex-col items-center gap-1 animate-bounce">
        <span className="w-px h-8 bg-white/30" />
      </div>
    </div>
  );
}

// Preview grid of recent photos
const PREVIEW_PHOTOS = PHOTOS.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSlideshow />

      {/* Intro section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
          Punjab, Pakistan
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
          Nature Photography by Saad
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Capturing the raw, unhurried beauty of Punjab — from golden wheat fields at harvest to
          the blazing skies of a Hazro sunset. Each image is a quiet moment, preserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="group flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            View Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full font-medium hover:bg-muted transition-colors"
          >
            Shop Prints
          </Link>
        </div>
      </section>

      {/* Divider with quote */}
      <div className="border-y border-border py-10 px-4">
        <p className="text-center font-serif text-xl sm:text-2xl text-foreground/70 italic max-w-2xl mx-auto">
          "In every walk with nature, one receives far more than he seeks."
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">— John Muir</p>
      </div>

      {/* Photo preview grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-2">Recent Work</p>
            <h2 className="font-serif text-3xl font-semibold">From the Field</h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {PREVIEW_PHOTOS.map((photo, i) => (
            <Link
              key={photo.id}
              href={`/gallery?photo=${photo.id}`}
              className={`photo-card relative rounded-xl overflow-hidden bg-muted group ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{photo.caption}</p>
                <p className="text-white/60 text-[10px]">{photo.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories strip */}
      <section className="bg-muted/50 border-y border-border py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-center mb-8">Explore Collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Punjab Landscapes",
                img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
                href: "/gallery?cat=punjab-landscapes",
              },
              {
                label: "Sunsets & Golden Hour",
                img: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=600&q=80",
                href: "/gallery?cat=sunsets-golden-hour",
              },
              {
                label: "Fields & Nature",
                img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
                href: "/gallery?cat=fields-nature",
              },
              {
                label: "Wildlife",
                img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
                href: "/gallery?cat=wildlife",
              },
            ].map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className="photo-card relative aspect-[3/4] rounded-xl overflow-hidden bg-muted group"
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-serif text-sm font-medium leading-tight">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-3">Own the Moment</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            Bring Punjab's Beauty Home
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Fine art prints, professionally produced on archival paper. Every purchase supports independent nature photography from Pakistan.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Shop Prints
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
