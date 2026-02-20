"use client";

import { useCart } from "@/lib/cart-context";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg font-semibold">
              Your Cart {totalItems > 0 && <span className="text-muted-foreground text-sm font-normal">({totalItems})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/60 hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="text-sm font-medium text-primary hover:underline"
              >
                Browse Prints →
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map(item => (
                <li key={item.id} className="flex gap-4">
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
                    <p className="text-sm font-medium leading-tight truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.size.label} — {item.size.dimensions}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded-full">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">${(item.size.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-semibold font-serif">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping calculated at checkout. Prints are fulfilled manually within 5–7 business days.</p>
            <Link
              href="/shop/checkout"
              onClick={closeCart}
              className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
