"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  BellRing,
  ChevronRight,
  LogOut,
  ReceiptText,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const navigationItems = [
  {
    href: "/users/notifications",
    label: "Thông báo",
    icon: BellRing,
  },
  {
    href: "/users/profile",
    label: "Thông tin cá nhân",
    icon: UserRound,
  },
  {
    href: "/users/orders",
    label: "Lịch sử mua hàng",
    icon: ReceiptText,
  },
] as const;

export function UserAreaShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useAuthStore((state) =>
    state.accounts.find((account) => account.id === state.currentUserId) ?? null,
  );
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);

  const currentSection =
    navigationItems.find((item) => pathname.startsWith(item.href))?.label ??
    "Tài khoản";

  useEffect(() => {
    if (hasHydrated && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, hasHydrated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!hasHydrated) {
    return null;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <section className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#140F13]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8">
        <nav className="flex items-center gap-1 text-[14px] text-[#2F2528] transition-colors duration-300 dark:text-[#F3E1E7]">
          <Link
            href="/"
            className="transition-colors hover:text-[#B13D67] dark:hover:text-[#F3AABD]"
          >
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 text-[#8E8186] dark:text-[#CDB7BF]" />
          <span className="text-[#8E8186] dark:text-[#CDB7BF]">Tài khoản</span>
          <ChevronRight className="h-4 w-4 text-[#8E8186] dark:text-[#CDB7BF]" />
          <span>{currentSection}</span>
        </nav>

        <div className="mt-2 h-px w-full bg-[#D9D9D9] transition-colors duration-300 dark:bg-[#594A52]" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
          <aside
            className="w-full px-3 pt-3.75 transition-colors lg:max-w-61.75 lg:px-0"
            style={beVietnamFontStyle}
          >
            <div className="relative flex h-17.25 items-center gap-5.25 dark:border-[#5A444F]">
              <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-[#F9DBBD] text-xl font-semibold text-[#8F4F35]">
                {currentUser?.name?.charAt(0) ?? "G"}
              </div>
              <p
                className="text-base leading-5 font-normal text-black dark:text-[#F6E8ED]"
                style={beVietnamFontStyle}
              >
                {currentUser.name}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-full max-w-58.75 bg-[#FF98A7]" />
            </div>

            <div className="mt-3.5 flex flex-col gap-1">
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-4.75 rounded-lg px-3 py-2 transition-colors",
                      isActive
                        ? "bg-[#F4F1F2] text-black dark:bg-[#2D1C24] dark:text-white"
                        : "text-black hover:bg-[#F4F1F2] hover:text-black dark:text-[#D5BAC4] dark:hover:bg-[#2D1C24] dark:hover:text-white",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-8.25 w-8.25 transition-colors",
                        isActive
                          ? "text-[#DA627D]"
                          : "text-[#8E8186] group-hover:text-[#DA627D] dark:text-[#B89CA6]",
                      )}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        isActive
                          ? "text-base leading-5 font-semibold"
                          : "text-base leading-5 font-normal group-hover:font-semibold",
                      )}
                      style={beVietnamFontStyle}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="mt-6 w-full justify-center border-[#E5C4CF] text-[#A53860] hover:bg-[#FFF1F5] hover:text-[#8D234F] dark:border-[#6C4B59] dark:text-[#FFD8E3] dark:hover:bg-[#38232C]"
              style={beVietnamFontStyle}
            >
              <LogOut className="mr-1 h-4 w-4" />
              Đăng xuất
            </Button>
          </aside>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}