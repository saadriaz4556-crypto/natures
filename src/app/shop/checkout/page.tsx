"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/shop");
    }
  }, [state.items.length, router]);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: state.items }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (state.items.length === 0) return null;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-6 h-6 text-primary" />
          <h1 className="font-serif text-3xl font-semibold">Order Summary</h1>
        </div>

        <div className="space-y-4 mb-8">
          {state.items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.size.label} — {item.size.dimensions}
                </p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm flex-shrink-0">
                ${(item.size.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-border pt-6 mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-lg">
            <span className="font-serif">Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 rounded-full font-medium text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Redirecting to Stripe...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Proceed to Secure Checkout
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          Payments are encrypted and processed securely by Stripe
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Prints are manually fulfilled and ship within 5–7 business days.
        </p>
      </div>
    </div>
  );
}
