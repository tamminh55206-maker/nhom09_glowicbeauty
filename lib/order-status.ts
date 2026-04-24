export const ORDER_STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipping: "Đang vận chuyển",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS;

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, (char) => (char === "đ" ? "d" : "D"))
    .toLowerCase()
    .trim();

const recoverMojibake = (value: string) => {
  try {
    return new TextDecoder("utf-8").decode(
      Uint8Array.from(value, (char) => char.charCodeAt(0)),
    );
  } catch {
    return value;
  }
};

export const normalizeOrderStatus = (value: string): OrderStatus => {
  const normalizedValue = normalizeText(recoverMojibake(value));

  switch (normalizedValue) {
    case "pending":
    case "cho xu ly":
      return "pending";
    case "processing":
    case "dang xu ly":
      return "processing";
    case "shipping":
    case "dang van chuyen":
      return "shipping";
    case "completed":
    case "hoan thanh":
      return "completed";
    case "cancelled":
    case "canceled":
    case "da huy":
      return "cancelled";
    default:
      return "processing";
  }
};

export const getOrderStatusLabel = (value: string) =>
  ORDER_STATUS_LABELS[normalizeOrderStatus(value)];

// ADDED
export const canCancelOrder = (value: string) => {
  const normalizedStatus = normalizeOrderStatus(value);
  return normalizedStatus === "processing" || normalizedStatus === "shipping";
};
