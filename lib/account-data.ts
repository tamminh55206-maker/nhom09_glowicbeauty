import { products } from "./data";
import type { UserAccount, UserOrderItem, UserRegistrationInput } from "./types";

function getProductItem(productId: string, quantity: number): UserOrderItem {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error(`Product ${productId} was not found in catalogue.`);
  }

  return {
    id: product.id,
    name: product.name,
    image: product.images[0],
    price: product.price,
    quantity,
  };
}

function getOrderTotal(items: UserOrderItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const userOneOrderItems = [
  getProductItem("product-01", 1),
  getProductItem("product-11", 1),
];

const userTwoOrderItems = [
  getProductItem("product-03", 1),
  getProductItem("product-05", 2),
];

const userThreeOrderItems = [
  getProductItem("product-08", 1),
  getProductItem("product-14", 1),
];

export const defaultUserAccounts: UserAccount[] = [
  {
    id: "user-01",
    name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "nguyenvana@glowic.vn",
    password: "123456",
    birthDate: "2001-08-12",
    memberTier: "Glow Member Vàng",
    joinedAt: "04/2026",
    shippingAddress: "18 Võ Văn Ngân, Phường Thủ Đức, TP. Hồ Chí Minh",
    notifications: [
      {
        id: "notification-01",
        title: "TƯNG BỪNG TÚI ĐƠN MỪNG ĐẠI LỄ",
        lines: [
          "Siêu voucher khủng đến 444K",
          "Freeship tối đa - Sắm thả ga",
          "Chốt đơn ngay!",
        ],
        postedAt: "23/04/2026",
      },
      {
        id: "notification-02",
        title: "MUA 3 GIẢM 30% - BẬT DEAL LÀM ĐẸP",
        lines: [
          "Cùng deal đẹp cả giỏ từ 1.100.000đ",
          "Thêm nhiều deal chỉ từ 30.000đ",
          "Phi ship 0đ - Quà xinh tới ngay",
        ],
        postedAt: "20/04/2026",
      },
      {
        id: "notification-03",
        title: "SĂN NGAY KẺO LỠ MÃ FREESHIP ĐƠN 0Đ",
        lines: [
          "Mã áp dụng trọn vẹn tới 30/04/2026",
          "Chốt đơn liền tay nhận ngay freeship",
          "Xài ngay kẻo lỡ!",
        ],
        postedAt: "18/04/2026",
      },
    ],
    orders: [
      {
        id: "GH2026042301",
        placedAt: "23/04/2026 09:15",
        status: "pending",
        paymentMethod: "Thanh toán khi nhận hàng",
        shippingAddress: "18 Võ Văn Ngân, Phường Thủ Đức, TP. Hồ Chí Minh",
        total: getOrderTotal(userOneOrderItems),
        items: userOneOrderItems,
      },
      {
        id: "GH2026041507",
        placedAt: "15/04/2026 14:40",
        status: "shipping",
        paymentMethod: "MoMo",
        shippingAddress: "18 Võ Văn Ngân, Phường Thủ Đức, TP. Hồ Chí Minh",
        total: getOrderTotal(userThreeOrderItems),
        items: userThreeOrderItems,
      },
      {
        id: "GH2026040219",
        placedAt: "02/04/2026 19:05",
        status: "delivered",
        paymentMethod: "VNPay",
        shippingAddress: "18 Võ Văn Ngân, Phường Thủ Đức, TP. Hồ Chí Minh",
        total: getOrderTotal(userTwoOrderItems),
        items: userTwoOrderItems,
      },
    ],
  },
  {
    id: "user-02",
    name: "Trần Minh Anh",
    phone: "0987654321",
    email: "tranminhanh@glowic.vn",
    password: "654321",
    birthDate: "1999-11-02",
    memberTier: "Glow Member Bạc",
    joinedAt: "03/2026",
    shippingAddress: "43 Phạm Văn Đồng, TP. Thủ Đức, TP. Hồ Chí Minh",
    notifications: [
      {
        id: "notification-11",
        title: "GLOWIC NHẮC BẠN HOÀN TẤT ĐƠN HÀNG",
        lines: [
          "Giỏ hàng của bạn đang chờ thanh toán",
          "Hoàn tất đơn hôm nay để nhận quà mini size",
          "Đơn xinh chờ bạn đó!",
        ],
        postedAt: "22/04/2026",
      },
      {
        id: "notification-12",
        title: "THÀNH VIÊN BẠC NHẬN MÃ GIẢM 8%",
        lines: [
          "Mã dành riêng cho tài khoản Minh Anh",
          "Áp dụng cho đơn từ 499.000đ",
          "Hiệu lực đến hết 26/04/2026",
        ],
        postedAt: "19/04/2026",
      },
    ],
    orders: [
      {
        id: "GH2026042111",
        placedAt: "21/04/2026 20:12",
        status: "pending",
        paymentMethod: "Thanh toán khi nhận hàng",
        shippingAddress: "43 Phạm Văn Đồng, TP. Thủ Đức, TP. Hồ Chí Minh",
        total: getOrderTotal(userTwoOrderItems),
        items: userTwoOrderItems,
      },
      {
        id: "GH2026040703",
        placedAt: "07/04/2026 10:00",
        status: "cancelled",
        paymentMethod: "VNPay",
        shippingAddress: "43 Phạm Văn Đồng, TP. Thủ Đức, TP. Hồ Chí Minh",
        total: getOrderTotal(userOneOrderItems),
        items: userOneOrderItems,
      },
    ],
  },
];

function createUserId() {
  return `user-${Date.now()}`;
}

export function buildRegisteredAccount(
  input: UserRegistrationInput,
): UserAccount {
  return {
    id: createUserId(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    password: input.password,
    birthDate: input.birthDate,
    memberTier: "Glow Member Mới",
    joinedAt: new Date().toLocaleDateString("vi-VN"),
    shippingAddress: "Chưa cập nhật địa chỉ giao hàng",
    notifications: [
      {
        id: `notification-${Date.now()}`,
        title: "CHÀO MỪNG BẠN ĐẾN VỚI GLOWIC",
        lines: [
          `Xin chào ${input.name}, tài khoản của bạn đã sẵn sàng`,
          "Hoàn thiện hồ sơ để nhận ưu đãi cá nhân hóa",
          "Bắt đầu hành trình glow ngay hôm nay",
        ],
        postedAt: new Date().toLocaleDateString("vi-VN"),
      },
    ],
    orders: [],
  };
}