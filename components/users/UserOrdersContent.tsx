"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useAuthStore } from "@/lib/store";
import type { UserOrderItem, UserOrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UserPanel } from "./UserPanel";

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const statusMap: Record<UserOrderStatus, string> = {
  pending: "ĐANG XÁC NHẬN",
  shipping: "ĐANG VẬN CHUYỂN",
  delivered: "ĐÃ HOÀN THÀNH",
  cancelled: "ĐÃ HỦY",
};

function formatCurrency(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function getPreviewBrand(item: UserOrderItem) {
  return products.find((product) => product.id === item.id)?.brand ?? "Glowic";
}

function getTotalQuantity(items: UserOrderItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function UserOrdersContent() {
  const currentUser = useAuthStore((state) =>
    state.accounts.find((account) => account.id === state.currentUserId) ?? null,
  );
  const cancelOrder = useAuthStore((state) => state.cancelOrder);

  if (!currentUser) {
    return null;
  }

  const handleCancelOrder = (orderId: string) => {
    const result = cancelOrder(orderId);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Đơn hàng đã được huỷ thành công.");
  };

  return (
    <UserPanel
      title="Lịch sử mua hàng"
      className="w-full max-w-195.75 rounded-none border-white/10 bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
      headerClassName="min-h-21 h-21 px-6.5 pt-10"
      titleClassName="text-[20px] leading-[25px] font-normal text-black dark:text-[#F6E8ED]"
      lineClassName="left-2.5 top-auto bottom-0 w-[calc(100%-20px)] max-w-190.25"
      bodyClassName="px-6.5 pb-6 pt-3.5"
    >
      <div className="space-y-0">
        {currentUser.orders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#E5C4CF] bg-[#FFF6F8] px-6 py-8 text-center text-[#7B5B67] dark:border-[#6C4B59] dark:bg-[#2D1C24] dark:text-[#DABBC6]">
            Bạn chưa có đơn hàng nào.
          </div>
        ) : null}

        {currentUser.orders.map((order, index) => {
          const previewItem = order.items[0];
          const totalQuantity = getTotalQuantity(order.items);
          const additionalItems = Math.max(order.items.length - 1, 0);
          const canCancel =
            order.status !== "delivered" && order.status !== "cancelled";

          if (!previewItem) {
            return null;
          }

          return (
            <article
              key={order.id}
              className={cn(
                "grid gap-4 py-5 md:grid-cols-[96px_minmax(0,1fr)_176px] md:items-start",
                index > 0 && "border-t border-[#E0E0E0]",
              )}
            >
              <div className="relative h-22 w-24 overflow-hidden rounded-[10px] border border-[#EFE7EA] bg-[#FFF9FB]">
                <Image
                  src={previewItem.image}
                  alt={previewItem.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="min-w-0 pt-0.5" style={beVietnamFontStyle}>
                <p className="text-[15px] leading-5 font-semibold text-[#C1475A] dark:text-[#FFB7CA]">
                  {getPreviewBrand(previewItem)}
                </p>
                <h2 className="mt-0.5 line-clamp-2 text-[16px] leading-6 font-semibold text-black dark:text-[#F6E8ED]">
                  {previewItem.name}
                </h2>
                <div className="mt-3 space-y-1 text-[15px] leading-6 text-black dark:text-[#DABBC6]">
                  <p>Thanh toán: {order.paymentMethod}</p>
                  <p>SL: {totalQuantity}</p>
                  {additionalItems > 0 ? (
                    <p className="text-[14px] text-[#6A5B61] dark:text-[#CDB7BF]">
                      +{additionalItems} sản phẩm khác trong cùng đơn
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                className="flex flex-col gap-4 pt-0.5 text-left md:min-h-22 md:items-end md:justify-between md:text-right"
                style={beVietnamFontStyle}
              >
                <p className="text-[15px] leading-5 font-semibold uppercase text-[#C1475A] dark:text-[#FFB7CA]">
                  {statusMap[order.status]}
                </p>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <p className="text-[16px] leading-6 font-semibold text-black dark:text-[#F6E8ED]">
                    {formatCurrency(order.total)}
                  </p>
                  {canCancel ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleCancelOrder(order.id)}
                      className="h-9 rounded-md border-[#E5C4CF] px-4 text-[14px] font-medium text-[#A53860] hover:bg-[#FFF1F5] hover:text-[#8D234F] dark:border-[#6C4B59] dark:text-[#FFD8E3] dark:hover:bg-[#38232C] dark:hover:text-[#FFE7EE]"
                      style={beVietnamFontStyle}
                    >
                      Huỷ đơn
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </UserPanel>
  );
}