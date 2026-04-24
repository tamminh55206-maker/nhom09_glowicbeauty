"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildRegisteredAccount, defaultUserAccounts } from "./account-data";
import type {
  CartItem,
  Product,
  UserAccount,
  UserOrderItem,
  UserRegistrationInput,
} from "./types";

function createPlacedAtLabel() {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, "0");
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const year = now.getFullYear();
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function createOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  const uniqueSuffix = `${Date.now()}`.slice(-4);

  return `GH${year}${month}${day}${uniqueSuffix}`;
}

function mapCartItemsToOrderItems(items: CartItem[]): UserOrderItem[] {
  return items.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    image: item.product.images[0],
    price: item.product.price,
    quantity: item.quantity,
  }));
}

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
    { name: "glowic-cart" },
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
    { name: "glowic-quiz" },
  ),
);

interface AuthState {
  accounts: UserAccount[];
  currentUserId: string | null;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  login: (phone: string, password: string) => {
    success: boolean;
    error?: string;
  };
  registerAccount: (
    input: UserRegistrationInput,
  ) => { success: boolean; error?: string };
  updateProfile: (
    updates: Pick<
      UserAccount,
      "name" | "phone" | "email" | "birthDate" | "shippingAddress"
    >,
  ) => void;
  placeOrder: (input: {
    items: CartItem[];
    paymentMethod: string;
    shippingAddress: string;
    total: number;
  }) => { success: boolean; error?: string };
  cancelOrder: (orderId: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accounts: defaultUserAccounts,
      currentUserId: null,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },

      login: (phone, password) => {
        let result: { success: boolean; error?: string } = {
          success: false,
          error: "Số điện thoại hoặc mật khẩu chưa đúng.",
        };

        set((state) => {
          const account = state.accounts.find(
            (item) => item.phone === phone && item.password === password,
          );

          if (!account) {
            return state;
          }

          result = { success: true };

          return {
            currentUserId: account.id,
          };
        });

        return result;
      },

      registerAccount: (input) => {
        let result: { success: boolean; error?: string } = { success: true };

        set((state) => {
          const duplicatedPhone = state.accounts.some(
            (account) => account.phone === input.phone,
          );
          const duplicatedEmail = state.accounts.some(
            (account) =>
              account.email.toLowerCase() === input.email.toLowerCase(),
          );

          if (duplicatedPhone) {
            result = {
              success: false,
              error: "Số điện thoại này đã được đăng ký.",
            };
            return state;
          }

          if (duplicatedEmail) {
            result = {
              success: false,
              error: "E-mail này đã được sử dụng.",
            };
            return state;
          }

          const nextAccount = buildRegisteredAccount(input);

          return {
            accounts: [...state.accounts, nextAccount],
          };
        });

        return result;
      },

      updateProfile: (updates) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === state.currentUserId
              ? { ...account, ...updates }
              : account,
          ),
        }));
      },

      placeOrder: ({ items, paymentMethod, shippingAddress, total }) => {
        let result: { success: boolean; error?: string } = {
          success: false,
          error: "Vui lòng đăng nhập để lưu đơn hàng.",
        };

        if (items.length === 0) {
          return {
            success: false,
            error: "Giỏ hàng trống.",
          };
        }

        set((state) => {
          if (!state.currentUserId) {
            return state;
          }

          const nextOrder = {
            id: createOrderId(),
            placedAt: createPlacedAtLabel(),
            status: "pending" as const,
            paymentMethod,
            shippingAddress,
            total,
            items: mapCartItemsToOrderItems(items),
          };

          result = { success: true };

          return {
            accounts: state.accounts.map((account) =>
              account.id === state.currentUserId
                ? {
                    ...account,
                    orders: [nextOrder, ...account.orders],
                  }
                : account,
            ),
          };
        });

        return result;
      },

      cancelOrder: (orderId) => {
        let result: { success: boolean; error?: string } = {
          success: false,
          error: "Không thể huỷ đơn hàng này.",
        };

        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.id !== state.currentUserId) {
              return account;
            }

            return {
              ...account,
              orders: account.orders.map((order) => {
                if (order.id !== orderId) {
                  return order;
                }

                if (
                  order.status === "delivered" ||
                  order.status === "cancelled"
                ) {
                  return order;
                }

                result = { success: true };

                return {
                  ...order,
                  status: "cancelled",
                };
              }),
            };
          }),
        }));

        return result;
      },

      logout: () => {
        set({ currentUserId: null });
      },
    }),
    {
      name: "glowic-auth",
      version: 2,
      partialize: (state) => ({
        accounts: state.accounts,
        currentUserId: state.currentUserId,
      }),
      migrate: (persistedState) => {
        const state = persistedState as Partial<AuthState> | undefined;

        return {
          accounts: state?.accounts ?? defaultUserAccounts,
          currentUserId: null,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
