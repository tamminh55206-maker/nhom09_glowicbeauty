"use client";

import { useAuthStore } from "@/lib/store";
import { UserPanel } from "./UserPanel";

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const notificationBodyFontStyle = {
  ...beVietnamFontStyle,
  fontStyle: "normal",
} as const;

const cardHeightClasses = ["min-h-19.75", "min-h-19.5", "min-h-19.75"];

export function UserNotificationsContent() {
  const currentUser = useAuthStore((state) =>
    state.accounts.find((account) => account.id === state.currentUserId) ?? null,
  );

  if (!currentUser) {
    return null;
  }

  return (
    <UserPanel
      title="Thông báo"
      className="w-full max-w-195.75 rounded-none border-white/10 bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
      headerClassName="min-h-21 h-21 px-6.5 pt-10"
      titleClassName="text-[20px] leading-[25px] font-normal text-black dark:text-[#F6E8ED]"
      lineClassName="left-2.5 top-auto bottom-0 w-[calc(100%-20px)] max-w-190.25"
      bodyClassName="px-6.5 pb-10 pt-4.75"
    >
      <div className="space-y-5.25">
        {currentUser.notifications.map((notification, index) => (
          <article
            key={notification.id}
            className={`w-full max-w-181.25 bg-[#D9D9D9] px-3.75 py-2.5 text-black transition-colors dark:bg-[#33252C] dark:text-[#DABBC6] ${cardHeightClasses[index] ?? "min-h-19.75"}`}
          >
            <div
              className="w-full max-w-173.5 text-[12px] leading-3.75"
              style={beVietnamFontStyle}
            >
              <h2 className="font-bold uppercase text-black dark:text-[#F6E8ED]">
                {notification.title}
              </h2>
              <div
                className="mt-0.5 space-y-0 text-[12px] font-normal leading-3.75 text-black dark:text-[#DABBC6]"
                style={notificationBodyFontStyle}
              >
                {notification.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </UserPanel>
  );
}