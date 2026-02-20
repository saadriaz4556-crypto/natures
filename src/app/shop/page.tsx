"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product, PrintSize } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Check, MapPin, X } from "lucide-react";

// Product detail modal
function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PrintSize>(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden bg-muted">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              priority
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{product.category}</p>
                <h2 className="font-serif text-xl font-semibold leading-tight">{product.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
              <MapPin className="w-3 h-3" />
              {product.location}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Select Format & Size</p>
              <div className="space-y-2">
                {product.sizes.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                      selectedSize.label === size.label
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedSize.label === size.label ? "border-primary" : "border-muted-foreground/40"
                      }`}>
                        {selectedSize.label === size.label && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-foreground">{size.label}</span>
                        <span className="text-muted-foreground ml-2 text-xs">{size.dimensions}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">${size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-all ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart — ${selectedSize.price}
                  </>
                )}
              </button>
              <p className="text-xs text-center text-muted-foreground">
                Prints fulfilled within 5–7 business days. Secure checkout via Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product card
function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const minPrice = Math.min(...product.sizes.map(s => s.price));

  return (
    <div
      className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="photo-card relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1">{product.category}</p>
        <h3 className="font-serif text-base font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          {product.location}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="font-semibold text-base">${minPrice}</span>
          </div>
          <span className="text-xs text-muted-foreground">{product.sizes.length} options</span>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState("all");
  const { totalItems, toggleCart } = useCart();

  const categories = ["all", "Punjab Landscapes", "Sunsets & Golden Hour", "Fields & Nature", "Wildlife"];
  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-2">Fine Art Prints</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-2">Shop</h1>
              <p className="text-muted-foreground max-w-xl text-sm">
                Professional archival prints and digital downloads. Each piece is carefully curated from field sessions across Punjab.
              </p>
            </div>
            {totalItems > 0 && (
              <button
                onClick={toggleCart}
                className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" />
                Cart ({totalItems})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat === "all" ? "All Prints" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-xs text-muted-foreground mb-6">{filtered.length} {filtered.length === 1 ? "print" : "prints"} available</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Info section */}
        <div className="mt-16 border-t border-border pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Archival Quality",
              desc: "Printed on 300gsm acid-free fine art paper using pigment inks — built to last over 100 years.",
            },
            {
              title: "Manual Fulfillment",
              desc: "Each print is personally reviewed and packaged. Your order ships within 5–7 business days.",
            },
            {
              title: "Secure Checkout",
              desc: "Payments are processed via Stripe. Your card details are never stored on our servers.",
            },
          ].map(item => (
            <div key={item.title} className="space-y-2">
              <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
