import Link from "next/link";
import { Leaf, Instagram, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-serif text-base font-semibold">Saad Nature</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Capturing the timeless beauty of Punjab's landscapes, fields, and wildlife through an honest lens.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/shop", label: "Shop Prints" },
                { href: "/about", label: "About Saad" },
                { href: "/contact", label: "Contact" },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Connect</h3>
            <div className="space-y-2 mb-4">
              <a
                href="mailto:saad@saadnature.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                saad@saadnature.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:saad@saadnature.com"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saad Nature Photography. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Hazro, Punjab, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
