"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "./types";

const recoverMojibake = (value: string) => {
  try {
    return new TextDecoder("utf-8").decode(
      Uint8Array.from(value, (char) => char.charCodeAt(0)),
    );
  } catch {
    return value;
  }
};

const normalizeOrderStatus = (value: string) => recoverMojibake(value);

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

export interface AuthUser {
  maNguoiDung?: string;
  tenTaiKhoan: string;
  soDienThoai: string;
  email: string;
  ngaySinh: string;
  gioiTinh: string;
  matKhau?: string;
}

export interface AuthState {
  currentUser: AuthUser | null;
  users: AuthUser[];
  registerUser: (user: AuthUser) => { success: boolean; message: string };
  loginUser: (soDienThoai: string, matKhau: string) => { success: boolean; message: string };
  updateCurrentUser: (user: AuthUser) => { success: boolean; message: string };
  logout: () => void;
  checkUserExists: (soDienThoai: string, email: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      registerUser: (user: AuthUser) => {
        const existingUser = get().users.find(
          (u) => u.soDienThoai === user.soDienThoai || u.email === user.email,
        );

        if (existingUser) {
          return {
            success: false,
            message:
              existingUser.soDienThoai === user.soDienThoai
                ? "Số điện thoại này đã được đăng ký."
                : "Email này đã được đăng ký.",
          };
        }

        const newUser = {
          ...user,
          maNguoiDung: `user_${Date.now()}`,
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));

        return { success: true, message: "Đăng ký thành công!" };
      },

      loginUser: (soDienThoai: string, matKhau: string) => {
        const user = get().users.find((u) => u.soDienThoai === soDienThoai);

        if (!user) {
          return {
            success: false,
            message: "Tài khoản không tồn tại. Vui lòng đăng ký trước.",
          };
        }

        if (user.matKhau !== matKhau) {
          return {
            success: false,
            message: "Mật khẩu không chính xác.",
          };
        }

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.matKhau;
        set({ currentUser: userWithoutPassword });

        return { success: true, message: "Đăng nhập thành công!" };
      },

      updateCurrentUser: (user: AuthUser) => {
        set((state) => ({
          currentUser: user,
          users: state.users.map((u) => (u.maNguoiDung === user.maNguoiDung ? user : u)),
        }));
        return { success: true, message: "Cập nhật thông tin thành công." };
      },

      logout: () => set({ currentUser: null }),

      checkUserExists: (soDienThoai: string, email: string) => {
        return get().users.some((u) => u.soDienThoai === soDienThoai || u.email === email);
      },
    }),
    { name: "glowic-auth" },
  ),
);

export interface Order {
  id: string;
  ownerUserId: string;
  item: {
    product: Product;
    quantity: number;
    unitPrice: number;
  };
  status: string;
}

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  cancelOrder: (orderId: string, ownerUserId: string) => { success: boolean; message: string };
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      setOrders: (orders) => set({ orders }),
      cancelOrder: (orderId, ownerUserId) => {
        const existingOrder = get().orders.find(
          (order) => order.id === orderId && order.ownerUserId === ownerUserId,
        );

        if (!existingOrder) {
          return { success: false, message: "Đơn hàng không tồn tại hoặc không hợp lệ." };
        }

        if (normalizeOrderStatus(existingOrder.status) !== "Đang vận chuyển") {
          return { success: false, message: "Đơn hàng không thể hủy." };
        }

        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status: "Đã hủy" } : order,
          ),
        });

        return { success: true, message: "Hủy đơn hàng thành công." };
      },
    }),
    { name: "glowic-orders" },
  ),
);
