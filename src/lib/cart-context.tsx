"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, PrintSize } from "@/lib/products";

export interface CartItem {
  id: string; // productId + sizeLabel
  productId: string;
  title: string;
  imageSrc: string;
  size: PrintSize;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: PrintSize } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size } = action.payload;
      const itemId = `${product.id}-${size.label}`;
      const existing = state.items.find(i => i.id === itemId);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          {
            id: itemId,
            productId: product.id,
            title: product.title,
            imageSrc: product.imageSrc,
            size,
            quantity: 1,
          },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case "UPDATE_QTY":
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, size: PrintSize) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false }, (init) => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("saad-nature-cart");
        if (stored) return { ...init, items: JSON.parse(stored) };
      } catch {
        // ignore
      }
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem("saad-nature-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, size: PrintSize) =>
    dispatch({ type: "ADD_ITEM", payload: { product, size } });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const updateQty = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.size.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQty, clearCart, openCart, closeCart, toggleCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
