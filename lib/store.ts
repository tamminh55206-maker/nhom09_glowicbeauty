"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "./types";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      },
    }),
    { name: "glowic-cart", skipHydration: true },
  ),
);

// Quiz Store
interface QuizState {
  quizAnswers: string[];
  quizCompleted: boolean;
  currentQuestion: number;
  setQuizAnswers: (answers: string[]) => void;
  setQuizCompleted: (completed: boolean) => void;
  setCurrentQuestion: (question: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizAnswers: [],
      quizCompleted: false,
      currentQuestion: 0,
      setQuizAnswers: (quizAnswers) => set({ quizAnswers }),
      setQuizCompleted: (quizCompleted) => set({ quizCompleted }),
      setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
      resetQuiz: () =>
        set({
          quizAnswers: [],
          quizCompleted: false,
          currentQuestion: 0,
        }),
    }),
    { name: "glowic-quiz", skipHydration: true },
  ),
);
