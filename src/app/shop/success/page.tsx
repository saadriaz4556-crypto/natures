"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight, Leaf } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-3">
          Order Confirmed!
        </h1>

        <p className="text-muted-foreground mb-2 leading-relaxed">
          Thank you for your purchase. A confirmation email will be sent to you shortly.
        </p>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Your prints are being carefully prepared and will ship within <strong className="text-foreground">5–7 business days</strong>. Each piece is personally reviewed before packaging.
        </p>

        {sessionId && (
          <div className="bg-muted/50 rounded-xl px-4 py-3 mb-8">
            <p className="text-xs text-muted-foreground">
              Order reference: <span className="font-mono text-foreground/70 text-[11px]">{sessionId.slice(0, 24)}…</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
          <Link
            href="/gallery"
            className="flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
          >
            Browse Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Questions? Email{" "}
            <a href="mailto:saad@saadnature.com" className="text-primary hover:underline">
              saad@saadnature.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
