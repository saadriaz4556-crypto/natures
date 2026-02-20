import Image from "next/image";
import Link from "next/link";
import { Mail, Instagram, MapPin, Camera, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Saad | Saad Nature Photography",
  description:
    "I'm Saad, a photographer from Hazro, Punjab, passionate about capturing the raw beauty of nature in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero strip */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-stone-200 dark:bg-stone-800">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
          alt="Golden wheat fields - about header"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-[0.25em] font-medium mb-2 text-white/70">The Photographer</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold">About Saad</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Portrait */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="/saadriaz.jpeg" //src="/saadriaz.jpeg"

                alt="Portrait placeholder - replace with your own photo"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm">

              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "5+", label: "Years Shooting" },
                { num: "500+", label: "Photos Taken" },
                { num: "20+", label: "Locations" },
              ].map(stat => (
                <div key={stat.label} className="bg-muted rounded-xl p-4 text-center">
                  <p className="font-serif text-2xl font-semibold text-primary">{stat.num}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">My Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight mb-5">
                Hi, I'm Saad
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a photographer from <strong className="text-foreground">Rawalpindi, Punjab, Pakistan</strong>, passionate about capturing the raw and unhurried beauty of the natural world around me.
                </p>
                <p>
                  Growing up in rural Punjab, I was surrounded by wheat fields that turned golden at harvest, skies that erupted in colour at dusk, and a landscape that changed personality with every season. I picked up a camera to hold on to those moments — and never put it down.
                </p>
                <p>
                  My photography focuses on the quiet drama of Punjab's countryside: the way morning light filters through canal-side trees, the stillness of a river at dawn, the pulse of life in a field of wildflowers. I believe every place has a soul — and my job is to show it.
                </p>
                <p>
                  I shoot mostly in the Rawalpindi and Islamabad districts but venture across Pakistan and beyond whenever the light calls. All prints are produced with care on archival-quality paper, so your piece lasts a lifetime.
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="border border-border rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-sm">Get in Touch</h3>
              <div className="space-y-2">
                <a
                  href="mailto:saad@saadnature.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  saadriaz4555@gmail.com
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Rawalpindi , Punjab, Pakistan
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4 text-primary" />
                  @clicks._.by._.saadi
                </a>
              </div>
            </div>

            {/* Gear section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" />
                Gear
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Sony Alpha A7 III",
                  "Sony 24–70mm f/2.8",
                  "Sony 70–200mm f/4",
                  "Manfrotto Carbon Tripod",
                  "Lee Filter System",
                  "DJI Mini 3 Drone",
                ].map(item => (
                  <div key={item} className="bg-muted rounded-lg px-3 py-2 text-xs text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/gallery"
                className="flex-1 text-center bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="flex-1 text-center 
                border border-border text-foreground py-3 rounded-full text-sm font-medium hover:bg-muted transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Philosophy section */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-3">Philosophy</p>
            <blockquote className="font-serif text-2xl sm:text-3xl text-foreground/80 italic leading-relaxed mb-6">
              "Patience is the most powerful lens in my bag. Nature reveals itself to those willing to wait."
            </blockquote>
            <p className="text-muted-foreground">
              I don't chase dramatic locations or manufactured moments. I walk the same fields again and again, in different seasons and different light, until the place tells its own story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
