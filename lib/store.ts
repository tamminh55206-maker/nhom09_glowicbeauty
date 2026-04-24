"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "./types";

export interface AuthUser {
  maNguoiDung?: string;
  tenTaiKhoan: string;
  soDienThoai: string;
  email: string;
  ngaySinh: string;
  gioiTinh?: string;
}

interface StoredAccount extends AuthUser {
  matKhau: string;
}

interface AuthResult {
  success: boolean;
  message: string;
  user?: AuthUser;
}

export type OrderStatus = "Đang vận chuyển" | "Đã hoàn thành" | "Đã hủy";

export interface OrderShippingInfo {
  hoTen: string;
  soDienThoai: string;
  tinhThanhPho: string;
  quanHuyen: string;
  phuongXa: string;
  diaChiCuThe: string;
}

export interface OrderLineItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  ownerUserId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  shippingInfo: OrderShippingInfo;
  shippingAddress: string;
  paymentMethod: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  item: OrderLineItem;
}

interface OrderResult {
  success: boolean;
  message: string;
  orders?: Order[];
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

type CartPersistedState = Pick<CartState, "items">;

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
    {
      name: "glowic-cart",
      version: 1,
      migrate: (persistedState) => migrateCartState(persistedState),
    },
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

type QuizPersistedState = Pick<
  QuizState,
  "quizAnswers" | "quizCompleted" | "currentQuestion"
>;

interface CreateOrderInput {
  user: AuthUser | null;
  items: CartItem[];
  shippingInfo: OrderShippingInfo;
  paymentMethod: string;
}

interface OrderState {
  orders: Order[];
  placeOrder: (input: CreateOrderInput) => OrderResult;
  cancelOrder: (orderId: string, ownerUserId: string) => OrderResult;
}

type OrderPersistedState = Pick<OrderState, "orders">;

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
    {
      name: "glowic-quiz",
      version: 1,
      migrate: (persistedState) => migrateQuizState(persistedState),
    },
  ),
);

interface AuthState {
  accounts: StoredAccount[];
  currentUser: AuthUser | null;
  registerUser: (account: StoredAccount) => AuthResult;
  loginUser: (credentials: Pick<StoredAccount, "soDienThoai" | "matKhau">) => AuthResult;
  updateCurrentUser: (nextUser: AuthUser) => AuthResult;
  logout: () => void;
}

type AuthPersistedState = Pick<AuthState, "accounts" | "currentUser">;

const toAuthUser = (account: StoredAccount): AuthUser => ({
  maNguoiDung: account.maNguoiDung,
  tenTaiKhoan: account.tenTaiKhoan,
  soDienThoai: account.soDienThoai,
  email: account.email,
  ngaySinh: account.ngaySinh,
  gioiTinh: account.gioiTinh,
});

const createAccountId = (
  account: Pick<AuthUser, "maNguoiDung" | "tenTaiKhoan" | "soDienThoai" | "email">,
) => {
  if (account.maNguoiDung?.trim()) {
    return account.maNguoiDung.trim();
  }

  const normalizedPhone = account.soDienThoai.replace(/\D/g, "");
  const normalizedEmail = account.email.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedName = account.tenTaiKhoan.toLowerCase().replace(/[^a-z0-9]/g, "");

  return `usr-${normalizedPhone || normalizedEmail || normalizedName || "glowic"}`;
};

const ensureStoredAccountId = (account: StoredAccount): StoredAccount => ({
  ...account,
  maNguoiDung: createAccountId(account),
});

const ensureAuthUserId = (user: AuthUser): AuthUser => ({
  ...user,
  maNguoiDung: createAccountId(user),
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isProduct = (value: unknown): value is Product =>
  isRecord(value) && typeof value.id === "string" && typeof value.price === "number";

const isCartItem = (value: unknown): value is CartItem =>
  isRecord(value) && typeof value.quantity === "number" && isProduct(value.product);

const isStoredAccount = (value: unknown): value is StoredAccount =>
  isRecord(value) &&
  (typeof value.maNguoiDung === "string" || typeof value.maNguoiDung === "undefined") &&
  typeof value.tenTaiKhoan === "string" &&
  typeof value.soDienThoai === "string" &&
  typeof value.email === "string" &&
  typeof value.ngaySinh === "string" &&
  (typeof value.gioiTinh === "string" || typeof value.gioiTinh === "undefined") &&
  typeof value.matKhau === "string";

const isAuthUser = (value: unknown): value is AuthUser =>
  isRecord(value) &&
  (typeof value.maNguoiDung === "string" || typeof value.maNguoiDung === "undefined") &&
  typeof value.tenTaiKhoan === "string" &&
  typeof value.soDienThoai === "string" &&
  typeof value.email === "string" &&
  typeof value.ngaySinh === "string" &&
  (typeof value.gioiTinh === "string" || typeof value.gioiTinh === "undefined");

const orderStatuses: OrderStatus[] = ["Đang vận chuyển", "Đã hoàn thành", "Đã hủy"];

const isOrderStatus = (value: unknown): value is OrderStatus =>
  typeof value === "string" && orderStatuses.includes(value as OrderStatus);

const isOrderShippingInfo = (value: unknown): value is OrderShippingInfo =>
  isRecord(value) &&
  typeof value.hoTen === "string" &&
  typeof value.soDienThoai === "string" &&
  typeof value.tinhThanhPho === "string" &&
  typeof value.quanHuyen === "string" &&
  typeof value.phuongXa === "string" &&
  typeof value.diaChiCuThe === "string";

const isOrderLineItem = (value: unknown): value is OrderLineItem =>
  isRecord(value) &&
  isProduct(value.product) &&
  typeof value.quantity === "number" &&
  typeof value.unitPrice === "number";

const isOrder = (value: unknown): value is Order =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.ownerUserId === "string" &&
  typeof value.ownerName === "string" &&
  typeof value.ownerPhone === "string" &&
  typeof value.ownerEmail === "string" &&
  isOrderShippingInfo(value.shippingInfo) &&
  typeof value.shippingAddress === "string" &&
  typeof value.paymentMethod === "string" &&
  isOrderStatus(value.status) &&
  typeof value.total === "number" &&
  typeof value.createdAt === "string" &&
  isOrderLineItem(value.item);

const createShippingAddress = (shippingInfo: OrderShippingInfo) =>
  [
    shippingInfo.diaChiCuThe.trim(),
    shippingInfo.phuongXa.trim(),
    shippingInfo.quanHuyen.trim(),
    shippingInfo.tinhThanhPho.trim(),
  ]
    .filter(Boolean)
    .join(", ");

const createOrderId = (createdAt: Date, index: number) => {
  const yy = createdAt.getFullYear().toString().slice(-2);
  const mm = String(createdAt.getMonth() + 1).padStart(2, "0");
  const dd = String(createdAt.getDate()).padStart(2, "0");
  const hh = String(createdAt.getHours()).padStart(2, "0");
  const minute = String(createdAt.getMinutes()).padStart(2, "0");

  return `GLW-${yy}${mm}${dd}-${hh}${minute}${String(index + 1).padStart(2, "0")}`;
};

const migrateAuthState = (persistedState: unknown): AuthPersistedState => {
  if (!isRecord(persistedState)) {
    return {
      accounts: [],
      currentUser: null,
    };
  }

  const accounts = Array.isArray(persistedState.accounts)
    ? persistedState.accounts.filter(isStoredAccount).map(ensureStoredAccountId)
    : [];

  const persistedCurrentUser = persistedState.currentUser;
  let currentUser: AuthUser | null = null;

  if (isStoredAccount(persistedCurrentUser)) {
    currentUser = toAuthUser(ensureStoredAccountId(persistedCurrentUser));
  } else if (isAuthUser(persistedCurrentUser)) {
    currentUser = ensureAuthUserId({
      ...persistedCurrentUser,
      maNguoiDung:
        accounts.find(
          (account) =>
            account.soDienThoai === persistedCurrentUser.soDienThoai ||
            account.email.toLowerCase() === persistedCurrentUser.email.toLowerCase(),
        )?.maNguoiDung ?? persistedCurrentUser.maNguoiDung,
    });
  }

  return {
    accounts,
    currentUser,
  };
};

const migrateCartState = (persistedState: unknown): CartPersistedState => {
  if (!isRecord(persistedState)) {
    return { items: [] };
  }

  return {
    items: Array.isArray(persistedState.items)
      ? persistedState.items.filter(isCartItem)
      : [],
  };
};

const migrateQuizState = (persistedState: unknown): QuizPersistedState => {
  if (!isRecord(persistedState)) {
    return {
      quizAnswers: [],
      quizCompleted: false,
      currentQuestion: 0,
    };
  }

  return {
    quizAnswers: Array.isArray(persistedState.quizAnswers)
      ? persistedState.quizAnswers.filter(
          (answer): answer is string => typeof answer === "string",
        )
      : [],
    quizCompleted:
      typeof persistedState.quizCompleted === "boolean"
        ? persistedState.quizCompleted
        : false,
    currentQuestion:
      typeof persistedState.currentQuestion === "number"
        ? persistedState.currentQuestion
        : 0,
  };
};

const migrateOrderState = (persistedState: unknown): OrderPersistedState => {
  if (!isRecord(persistedState)) {
    return { orders: [] };
  }

  return {
    orders: Array.isArray(persistedState.orders)
      ? persistedState.orders.filter(isOrder)
      : [],
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: [],
      currentUser: null,

      registerUser: (account) => {
        const nextAccount = ensureStoredAccountId(account);
        const existedAccount = get().accounts.find(
          (storedAccount) =>
            storedAccount.soDienThoai === nextAccount.soDienThoai ||
            storedAccount.email.toLowerCase() === nextAccount.email.toLowerCase(),
        );

        if (existedAccount) {
          return {
            success: false,
            message: "Số điện thoại hoặc email này đã được đăng ký.",
          };
        }

        const nextUser = toAuthUser(nextAccount);

        set((state) => ({
          accounts: [...state.accounts, nextAccount],
          currentUser: nextUser,
        }));

        return {
          success: true,
          message: `Chào mừng ${nextUser.tenTaiKhoan} đến với Glowic.`,
          user: nextUser,
        };
      },

      loginUser: ({ soDienThoai, matKhau }) => {
        const matchedAccount = get().accounts.find(
          (account) =>
            account.soDienThoai === soDienThoai && account.matKhau === matKhau,
        );

        if (!matchedAccount) {
          return {
            success: false,
            message: "Sai số điện thoại hoặc mật khẩu.",
          };
        }

        const nextUser = toAuthUser(matchedAccount);
        set({ currentUser: nextUser });

        return {
          success: true,
          message: `Xin chào ${nextUser.tenTaiKhoan}!`,
          user: nextUser,
        };
      },

      updateCurrentUser: (nextUser) => {
        const currentUser = get().currentUser;

        if (!currentUser) {
          return {
            success: false,
            message: "Bạn cần đăng nhập để cập nhật thông tin.",
          };
        }

        const ensuredCurrentUser = ensureAuthUserId(currentUser);
        const ensuredNextUser = ensureAuthUserId({
          ...nextUser,
          maNguoiDung: ensuredCurrentUser.maNguoiDung,
        });

        const duplicatedAccount = get().accounts.find(
          (account) =>
            account.maNguoiDung !== ensuredCurrentUser.maNguoiDung &&
            (account.soDienThoai === ensuredNextUser.soDienThoai ||
              account.email.toLowerCase() === ensuredNextUser.email.toLowerCase()),
        );

        if (duplicatedAccount) {
          return {
            success: false,
            message: "Số điện thoại hoặc email này đã được sử dụng.",
          };
        }

        set((state) => ({
          currentUser: ensuredNextUser,
          accounts: state.accounts.map((account) =>
            account.maNguoiDung === ensuredCurrentUser.maNguoiDung
              ? { ...account, ...ensuredNextUser }
              : account,
          ),
        }));

        return {
          success: true,
          message: "Thông tin cá nhân đã được cập nhật.",
          user: ensuredNextUser,
        };
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: "glowic-auth",
      version: 1,
      migrate: (persistedState) => migrateAuthState(persistedState),
      partialize: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
      }),
    },
  ),
);

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: ({ user, items, shippingInfo, paymentMethod }) => {
        if (!user) {
          return {
            success: false,
            message: "Vui lòng đăng nhập trước khi đặt hàng để lưu lịch sử mua hàng.",
          };
        }

        if (items.length === 0) {
          return {
            success: false,
            message: "Giỏ hàng trống.",
          };
        }

        const ensuredUser = ensureAuthUserId(user);
        const createdAt = new Date();
        const createdOrders = items.map((item, index) => ({
          id: createOrderId(createdAt, index),
          ownerUserId: ensuredUser.maNguoiDung ?? createAccountId(ensuredUser),
          ownerName: ensuredUser.tenTaiKhoan,
          ownerPhone: ensuredUser.soDienThoai,
          ownerEmail: ensuredUser.email,
          shippingInfo,
          shippingAddress: createShippingAddress(shippingInfo),
          paymentMethod,
          status: "Đang vận chuyển" as OrderStatus,
          total: item.product.price * item.quantity,
          createdAt: createdAt.toISOString(),
          item: {
            product: item.product,
            quantity: item.quantity,
            unitPrice: item.product.price,
          },
        }));

        set((state) => ({
          orders: [...createdOrders, ...state.orders],
        }));

        return {
          success: true,
          message: "Đặt hàng thành công. Đơn hàng đã được lưu vào lịch sử mua hàng.",
          orders: createdOrders,
        };
      },

      cancelOrder: (orderId, ownerUserId) => {
        const matchedOrder = get().orders.find(
          (order) => order.id === orderId && order.ownerUserId === ownerUserId,
        );

        if (!matchedOrder) {
          return {
            success: false,
            message: "Không tìm thấy đơn hàng để hủy.",
          };
        }

        if (matchedOrder.status === "Đã hoàn thành") {
          return {
            success: false,
            message: "Đơn hàng đã giao thành công nên không thể hủy.",
          };
        }

        if (matchedOrder.status === "Đã hủy") {
          return {
            success: false,
            message: "Đơn hàng này đã được hủy trước đó.",
          };
        }

        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId && order.ownerUserId === ownerUserId
              ? { ...order, status: "Đã hủy" }
              : order,
          ),
        }));

        return {
          success: true,
          message: "Đơn hàng đã được hủy thành công.",
        };
      },
    }),
    {
      name: "glowic-orders",
      version: 1,
      migrate: (persistedState) => migrateOrderState(persistedState),
      partialize: (state) => ({
        orders: state.orders,
      }),
    },
  ),
);
