"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bell,
  ChevronRight,
  FileText,
  IdCard,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { AuthUser, Order, useAuthStore, useOrderStore } from "@/lib/store";

type AccountTab = "notifications" | "profile" | "orders";

interface AccountNotification {
  id: string;
  title: string;
  highlights: string[];
}

interface AccountOrder {
  id: string;
  orderId: string;
  brand: string;
  name: string;
  image: string;
  quantity: number;
  status: string;
  total: number;
  canCancel: boolean;
}

const emptySubscribe = () => () => {};
const ACCOUNT_ACCENT_LINE = "#F29AAF";

interface ProfileDraft {
  tenTaiKhoan: string;
  soDienThoai: string;
  email: string;
  ngaySinh: string;
  gioiTinh: string;
}

const normalizeVietnamese = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

const formatDisplayDate = (value: string) => {
  const parts = value.split("-");

  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return value;
};

const deriveUsername = (user: AuthUser) => {
  const emailPrefix = user.email.split("@")[0]?.trim().toLowerCase();

  if (emailPrefix) {
    return emailPrefix;
  }

  const baseName = normalizeVietnamese(user.tenTaiKhoan)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const normalizedPhone = user.soDienThoai.replace(/\D/g, "");

  return `${baseName || "glowic"}${normalizedPhone.slice(-3)}`;
};

const createProfileDraft = (user: AuthUser): ProfileDraft => ({
  tenTaiKhoan: user.tenTaiKhoan,
  soDienThoai: user.soDienThoai,
  email: user.email,
  ngaySinh: formatDisplayDate(user.ngaySinh),
  gioiTinh: user.gioiTinh?.trim() || "Nam",
});

const normalizeStoredDate = (value: string) => {
  const trimmedValue = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
    const [year, month, day] = trimmedValue.split("-");
    const parsedDate = new Date(`${trimmedValue}T00:00:00Z`);

    if (
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.getUTCFullYear().toString() === year &&
      String(parsedDate.getUTCMonth() + 1).padStart(2, "0") === month &&
      String(parsedDate.getUTCDate()).padStart(2, "0") === day
    ) {
      return trimmedValue;
    }

    return null;
  }

  const displayDateMatch = trimmedValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!displayDateMatch) {
    return null;
  }

  const [, day, month, year] = displayDateMatch;
  const normalizedDate = `${year}-${month}-${day}`;
  const parsedDate = new Date(`${normalizedDate}T00:00:00Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getUTCFullYear().toString() !== year ||
    String(parsedDate.getUTCMonth() + 1).padStart(2, "0") !== month ||
    String(parsedDate.getUTCDate()).padStart(2, "0") !== day
  ) {
    return null;
  }

  return normalizedDate;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value: string) => /^\d{9,11}$/.test(value);

const accountTabs: Array<{
  id: AccountTab;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "profile", label: "Thông tin cá nhân", icon: IdCard },
  { id: "orders", label: "Lịch sử đơn hàng", icon: FileText },
];

const resolveAccountTab = (value: string | null): AccountTab => {
  if (value === "profile" || value === "orders") {
    return value;
  }

  return "notifications";
};

const buildNotifications = (): AccountNotification[] => [
  {
    id: "voucher-holiday",
    title: "TUNG DIỆU TỪ 1K ĐÓN MỪNG ĐẠI LỄ",
    highlights: [
      "😊 Săn voucher khủng đến 444K",
      "🌈 Freeship tận nhà - Sắm sửa thả ga",
      "🎉 Chốt đơn ngay!",
    ],
  },
  {
    id: "flash-sale",
    title: "MUA 3 GIẢM 30% SẮP BẮT ĐẦU",
    highlights: [
      "🥰 Cùng deal độc quyền giá từ 1.000Đ",
      "🎉 Thêm nhiều deal chỉ từ 3.000Đ, 9.000Đ",
      "⚡ Phí ship 0Đ - Chuẩn bị săn ngay!",
    ],
  },
  {
    id: "cod-info",
    title: "🛒 XÀI NGAY KẺO LỠ MÃ FREESHIP ĐƠN 0Đ",
    highlights: [
      "🎁 Mã sẽ hết hạn vào 30-04-2026!",
      "😃 Chốt đơn liền tay nhận ngay freeship!",
      "💥 Xài ngay kẻo lỡ!",
    ],
  },
];

const buildOrders = (orders: Order[], ownerUserId?: string): AccountOrder[] => {
  if (!ownerUserId) {
    return [];
  }

  return orders
    .filter((order) => order.ownerUserId === ownerUserId)
    .map((order) => ({
      id: order.id,
      orderId: order.id,
      brand: order.item.product.brand,
      name: order.item.product.name,
      image: order.item.product.images[0] ?? "",
      quantity: order.item.quantity,
      status: order.status.toLocaleUpperCase("vi-VN"),
      total: order.item.unitPrice * order.item.quantity,
      canCancel: order.status === "Đang vận chuyển",
    }));
};

function AccountDashboard({
  currentUser,
  activeTab,
  onTabChange,
}: {
  currentUser: AuthUser;
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const updateCurrentUser = useAuthStore((state) => state.updateCurrentUser);
  const storedOrders = useOrderStore((state) => state.orders);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const notifications = buildNotifications();
  const orders = buildOrders(storedOrders, currentUser.maNguoiDung);
  const isOrdersTab = activeTab === "orders";
  const isProfileTab = activeTab === "profile";
  const activeTabLabel = accountTabs.find((tab) => tab.id === activeTab)?.label;
  const initialProfileDraft = createProfileDraft(currentUser);
  const [draftUser, setDraftUser] = useState<ProfileDraft>(initialProfileDraft);
  const usernamePreview = deriveUsername({
    ...currentUser,
    tenTaiKhoan: draftUser.tenTaiKhoan,
    soDienThoai: draftUser.soDienThoai,
    email: draftUser.email,
  });
  const isProfileDirty =
    draftUser.tenTaiKhoan !== initialProfileDraft.tenTaiKhoan ||
    draftUser.soDienThoai !== initialProfileDraft.soDienThoai ||
    draftUser.email !== initialProfileDraft.email ||
    draftUser.ngaySinh !== initialProfileDraft.ngaySinh ||
    draftUser.gioiTinh !== initialProfileDraft.gioiTinh;

  const profileRows = [
    { label: "Tên đăng nhập", value: usernamePreview, editable: false },
    {
      label: "Tên",
      value: draftUser.tenTaiKhoan,
      editable: true,
      field: "tenTaiKhoan" as const,
      autoComplete: "name",
      inputMode: "text" as const,
    },
    {
      label: "Email",
      value: draftUser.email,
      editable: true,
      field: "email" as const,
      autoComplete: "email",
      inputMode: "email" as const,
    },
    {
      label: "Số điện thoại",
      value: draftUser.soDienThoai,
      editable: true,
      field: "soDienThoai" as const,
      autoComplete: "tel",
      inputMode: "tel" as const,
    },
    {
      label: "Giới tính",
      value: draftUser.gioiTinh,
      editable: true,
      field: "gioiTinh" as const,
      autoComplete: "sex",
      inputMode: "text" as const,
    },
    {
      label: "Ngày sinh",
      value: draftUser.ngaySinh,
      editable: true,
      field: "ngaySinh" as const,
      autoComplete: "bday",
      inputMode: "numeric" as const,
      placeholder: "dd/mm/yyyy",
    },
  ];

  const handleFieldChange = (field: keyof ProfileDraft, value: string) => {
    setDraftUser((previousDraft) => ({
      ...previousDraft,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    const normalizedPhone = draftUser.soDienThoai.replace(/\s+/g, "");
    const normalizedDate = normalizeStoredDate(draftUser.ngaySinh);
    const nextUser: AuthUser = {
      tenTaiKhoan: draftUser.tenTaiKhoan.trim(),
      soDienThoai: normalizedPhone,
      email: draftUser.email.trim(),
      ngaySinh: normalizedDate ?? "",
      gioiTinh: draftUser.gioiTinh.trim() || "Nam",
    };

    if (!nextUser.tenTaiKhoan || !nextUser.soDienThoai || !nextUser.email) {
      toast.error("Vui lòng điền đầy đủ thông tin cá nhân.");
      return;
    }

    if (!isValidEmail(nextUser.email)) {
      toast.error("Email chưa đúng định dạng.");
      return;
    }

    if (!isValidPhone(nextUser.soDienThoai)) {
      toast.error("Số điện thoại cần có từ 9 đến 11 chữ số.");
      return;
    }

    if (!normalizedDate) {
      toast.error("Ngày sinh cần theo định dạng dd/mm/yyyy.");
      return;
    }

    const result = updateCurrentUser(nextUser);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setDraftUser(createProfileDraft(nextUser));
    toast.success(result.message);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCancelOrder = (orderId: string) => {
    if (!currentUser.maNguoiDung) {
      toast.error("Không xác định được tài khoản để hủy đơn.");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này không?")) {
      return;
    }

    const result = cancelOrder(orderId, currentUser.maNguoiDung);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <section className="min-h-[calc(100vh-220px)] bg-white py-4 dark:bg-[#140F13]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-[13px] text-[#2F2528] dark:text-[#EAD8DE]">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="transition-colors hover:text-[#A53860]">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Tài khoản</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{accountTabs.find((tab) => tab.id === activeTab)?.label}</span>
          </div>
          <div
            className="mt-3 h-px dark:bg-[#4B3741]"
            style={{
              width: "min(1213px, 100%)",
              backgroundColor: "#D9D9D9",
            }}
          />
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:pb-4">
          <aside className="flex min-h-105 flex-col pt-3">
            <div className="flex items-center gap-4 px-3">
              <div className="h-14.5 w-14.5 rounded-full bg-[#F8D7B1]" />
              <div className="min-w-0">
                <p className="truncate text-[16px] font-medium text-[#1F1A1C] dark:text-white">
                  {currentUser.tenTaiKhoan}
                </p>
              </div>
            </div>

            <div
              className="mt-2.5 h-px dark:bg-[#654554]"
              style={{ backgroundColor: ACCOUNT_ACCENT_LINE }}
            />

            <nav className="mt-4 space-y-1.5">
              {accountTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`group flex w-full cursor-pointer items-center gap-4 px-3 py-2.25 text-left text-[15px] leading-6 transition-colors duration-200 ${
                      isActive
                        ? "font-bold text-[#111111] hover:text-[#DA627D] dark:text-white dark:hover:text-[#F0B4C3]"
                        : "text-[#222222] hover:text-[#DA627D] dark:text-[#DDBBC7] dark:hover:text-[#F0B4C3]"
                    }`}
                  >
                    <Icon
                      strokeWidth={1.8}
                      className={`h-6 w-6 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-[#DA627D] group-hover:text-[#F07688]"
                          : "text-[#E38CA0] group-hover:text-[#F07688] dark:text-[#F0B4C3] dark:group-hover:text-[#F7B8C5]"
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {activeTab === "profile" && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-auto ml-18.5 w-fit cursor-pointer rounded-[7px] border border-[#F07688] bg-[#FFA4B0] px-4.5 py-2.25 text-[18px] font-semibold text-white shadow-[0_4px_7px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-[#F07688] hover:shadow-[0_7px_14px_rgba(240,118,136,0.35)]"
                style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                Đăng xuất
              </button>
            )}
          </aside>

          <div
            className={`w-full border bg-white dark:border-[#503745] dark:bg-[#24171F] ${
              isOrdersTab
                ? "border-[#F1ECEE]"
                : "border-[#EFEAEC] px-6.5 py-7 shadow-[0_9px_20px_rgba(0,0,0,0.16)] lg:max-w-195.5"
            }`}
            style={
              isOrdersTab
                ? {
                    width: "100%",
                    maxWidth: "783px",
                    minHeight: "556px",
                    padding: "40px 26px 33px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
                  }
                : undefined
            }
          >
            <div className={isOrdersTab ? "pb-0" : "pb-4"}>
              <h1
                className="text-[#111111] dark:text-white"
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "25px",
                }}
              >
                {activeTabLabel}
              </h1>

              {isProfileTab && (
                <p
                  className="mt-0.5 text-[#363032] dark:text-white"
                  style={{
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "19px",
                  }}
                >
                  Quản lý thông tin cá nhân để bảo mật tài khoản
                </p>
              )}

              <div
                className="h-px dark:bg-[#704556]"
                style={
                  isOrdersTab
                    ? {
                        marginTop: "19px",
                        marginLeft: "-16px",
                        width: "min(761px, calc(100% + 32px))",
                        backgroundColor: "#DA627D",
                      }
                    : {
                        marginTop: isProfileTab ? "14px" : "16px",
                        backgroundColor: ACCOUNT_ACCENT_LINE,
                      }
                }
              />
            </div>

            {activeTab === "notifications" && (
              <div className="space-y-5 pt-1">
                {notifications.map((notification) => (
                  <article
                    key={notification.id}
                    className="min-h-20 bg-[#D9D9D9] px-3.5 py-2.5 text-[#34282C] dark:bg-[#32262B] dark:text-[#F7E8EC]"
                    style={{
                      fontFamily: '"Be Vietnam Pro", sans-serif',
                    }}
                  >
                    <h2
                      className="uppercase text-[#1D1A1B] dark:text-[#FFD6E1]"
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "15px",
                      }}
                    >
                      {notification.title}
                    </h2>
                    <div
                      className="mt-0.5 space-y-px text-[#2B2527] dark:text-[#E6D1D8]"
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "15px",
                      }}
                    >
                      {notification.highlights.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "profile" && (
              <form
                className="pt-1"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSaveProfile();
                }}
              >
                <div className="mx-auto mt-8.5 grid max-w-140 grid-cols-[185px_minmax(0,1fr)] gap-x-10 gap-y-5">
                  {profileRows.map((row) => (
                    <div key={row.label} className="contents">
                      <div
                        className="text-right text-[#1F1A1C] dark:text-[#E6D1D8]"
                        style={{
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "18px",
                        }}
                      >
                        {row.label}
                      </div>
                      {row.editable ? (
                        <label
                          className="flex min-h-7 items-end border-b border-[#E9DBDF] pb-1 transition focus-within:border-[#F29AAF] hover:border-[#E0B0BE] dark:border-[#5A3E49] dark:focus-within:border-[#F29AAF] dark:hover:border-[#8A5A6D]"
                          style={{
                            fontFamily: '"Be Vietnam Pro", sans-serif',
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "18px",
                          }}
                        >
                          <input
                            value={row.value}
                            onChange={(event) => handleFieldChange(row.field, event.target.value)}
                            autoComplete={row.autoComplete}
                            inputMode={row.inputMode}
                            placeholder={row.placeholder}
                            className="w-full bg-transparent text-[#111111] outline-none placeholder:text-[#AA9BA1] dark:text-white dark:placeholder:text-[#B796A3]"
                          />
                        </label>
                      ) : (
                        <div
                          className="min-h-7 border-b border-transparent pb-1 text-[#111111] dark:text-white"
                          style={{
                            fontFamily: '"Be Vietnam Pro", sans-serif',
                            fontSize: "14px",
                            fontWeight: 400,
                            lineHeight: "18px",
                          }}
                        >
                          {row.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-16.5 flex justify-end">
                  <button
                    type="submit"
                    className={`cursor-pointer rounded-[7px] border border-[#F07688] px-3 py-2 text-[18px] font-semibold text-white shadow-[0_4px_7px_rgba(0,0,0,0.18)] transition-all duration-200 ${
                      isProfileDirty
                        ? "bg-[#FFA4B0] hover:-translate-y-px hover:bg-[#F07688] hover:shadow-[0_7px_14px_rgba(240,118,136,0.35)]"
                        : "bg-[#F4C0C8] hover:bg-[#F4C0C8]"
                    }`}
                    style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            )}

            {activeTab === "orders" && (
              orders.length > 0 ? (
                <div
                  className="pt-0.5"
                  style={{
                    marginTop: "19px",
                    width: "min(694px, 100%)",
                  }}
                >
                  {orders.map((order, index) => (
                    <article
                      key={order.id}
                      className={index === 0 ? "" : "border-t border-[#D9D9D9] dark:border-[#4A353F]"}
                      style={{
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                        paddingTop: index === 0 ? "0px" : index === 1 ? "34px" : "24px",
                        paddingBottom: index === orders.length - 1 ? "0px" : "19px",
                      }}
                    >
                      <div className="grid gap-y-3 sm:grid-cols-[102px_minmax(0,417px)_151px] sm:items-start sm:gap-x-6">
                        <div
                          className="relative overflow-hidden rounded-[10px] border border-[#D9D9D9] bg-white dark:border-[#4F3944] dark:bg-[#2A1C23]"
                          style={{ width: "102px", height: "102px" }}
                        >
                          {order.image ? (
                            <Image
                              src={order.image}
                              alt={order.name}
                              fill
                              sizes="102px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-[#F4EBEE] dark:bg-[#35242C]" />
                          )}
                        </div>

                        <div
                          className="min-w-0 pt-0.5"
                          style={{ maxWidth: "417px", minHeight: "102px" }}
                        >
                          <p
                            className="text-[#A53860]"
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            {order.brand}
                          </p>
                          <p
                            className="mt-0.75 text-[#000000] dark:text-white"
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "18px",
                            }}
                          >
                            {order.name}
                          </p>
                          <p
                            className="mt-11.25 text-[#000000] dark:text-[#F6E8EC]"
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "18px",
                            }}
                          >
                            SL: {order.quantity}
                          </p>
                        </div>

                        <div
                          className="col-span-2 flex flex-col justify-between sm:col-span-1 sm:items-end"
                          style={{ minHeight: "102px", width: "151px" }}
                        >
                          <p
                            className="text-left text-[#D35A7B] sm:text-right"
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              lineHeight: "18px",
                              color: "#A53860",
                            }}
                          >
                            {order.status}
                          </p>
                          <div className="flex flex-col items-start gap-2 sm:items-end">
                            <p
                              className="text-left text-[#000000] dark:text-white sm:text-right"
                              style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                lineHeight: "18px",
                              }}
                            >
                              {order.total.toLocaleString("vi-VN")} đ
                            </p>

                            {order.canCancel && (
                              <button
                                type="button"
                                onClick={() => handleCancelOrder(order.orderId)}
                                className="rounded-md border border-[#DA627D] px-2.5 py-1 text-[12px] font-semibold text-[#A53860] transition hover:bg-[#FFF0F3] dark:hover:bg-[#352028]"
                              >
                                Hủy đơn
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div
                  className="flex min-h-55 items-center justify-center"
                  style={{
                    marginTop: "19px",
                    width: "min(694px, 100%)",
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                  }}
                >
                  <p className="text-[16px] font-medium text-[#6E5A61] dark:text-[#E6D1D8]">
                    chưa có đơn hàng nào
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useAuthStore((state) => state.currentUser);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const activeTab = resolveAccountTab(searchParams.get("tab"));

  useEffect(() => {
    if (isClient && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isClient, router]);

  const handleTabChange = (tab: AccountTab) => {
    router.replace(tab === "notifications" ? "/tai-khoan" : `/tai-khoan?tab=${tab}`);
  };

  if (!isClient || !currentUser) {
    return (
      <section className="min-h-[calc(100vh-220px)] bg-white px-4 py-16 dark:bg-[#140F13]">
        <div className="mx-auto max-w-xl border border-[#E8E2E5] bg-white p-8 text-center shadow-[0_10px_22px_rgba(0,0,0,0.12)] dark:bg-[#24171F]">
          <p className="text-base text-[#5D4850] dark:text-[#E6D1D8]">
            Đang chuyển bạn đến trang đăng nhập...
          </p>
        </div>
      </section>
    );
  }

  return (
    <AccountDashboard
      key={`${currentUser.maNguoiDung ?? ""}-${currentUser.soDienThoai}-${currentUser.email}-${currentUser.tenTaiKhoan}-${currentUser.ngaySinh}-${currentUser.gioiTinh ?? ""}`}
      currentUser={currentUser}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
}