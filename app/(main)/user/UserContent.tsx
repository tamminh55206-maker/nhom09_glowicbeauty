"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import {
  AccountDashboard,
  resolveAccountTab,
  type AccountTab,
} from "./AccountDashboard";

const emptySubscribe = () => () => {};

export function UserContent() {
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
    router.replace(tab === "notifications" ? "/user" : `/user?tab=${tab}`);
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
