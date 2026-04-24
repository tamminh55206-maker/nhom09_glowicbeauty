"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import type { UserAccount } from "@/lib/types";
import { UserPanel } from "./UserPanel";

type ProfileFormState = Pick<
  UserAccount,
  "name" | "phone" | "email" | "birthDate" | "shippingAddress"
>;

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

const labelClassName =
  "text-right text-[16px] leading-5 font-normal text-black dark:text-[#F6E8ED]";

const valueInputClassName =
  "w-full border-none bg-transparent p-0 text-left text-[16px] leading-5 font-normal text-black outline-none dark:text-[#F6E8ED]";

function createUsername(name: string, phone: string) {
  const compactName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .split(/\s+/)
    .slice(-2)
    .join("");

  return `${compactName || "glowic"}${phone.slice(-3) || "001"}`;
}

function toDisplayDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  return value;
}

function toStorageDate(value: string) {
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split("/");
    return `${year}-${month}-${day}`;
  }

  return value;
}

function getGenderLabel(name: string) {
  return name.includes("Văn") ? "Nam" : "Chưa cập nhật";
}

export function UserProfileContent() {
  const currentUser = useAuthStore((state) =>
    state.accounts.find((account) => account.id === state.currentUserId) ?? null,
  );
  const updateProfile = useAuthStore((state) => state.updateProfile);

  if (!currentUser) {
    return null;
  }

  return (
    <ProfileForm
      key={currentUser.id}
      currentUser={currentUser}
      updateProfile={updateProfile}
    />
  );
}

function ProfileForm({
  currentUser,
  updateProfile,
}: {
  currentUser: UserAccount;
  updateProfile: (
    updates: Pick<
      UserAccount,
      "name" | "phone" | "email" | "birthDate" | "shippingAddress"
    >,
  ) => void;
}) {
  const [formState, setFormState] = useState<ProfileFormState>({
    name: currentUser.name,
    phone: currentUser.phone,
    email: currentUser.email,
    birthDate: toDisplayDate(currentUser.birthDate),
    shippingAddress: currentUser.shippingAddress,
  });

  const handleChange = (
    key: keyof ProfileFormState,
    value: ProfileFormState[keyof ProfileFormState],
  ) => {
    setFormState((previousState) => ({
      ...previousState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    updateProfile({
      ...formState,
      birthDate: toStorageDate(formState.birthDate),
    });
    toast.success("Hồ sơ của bạn đã được cập nhật.");
  };

  const profileRows = [
    {
      label: "Tên đăng nhập",
      content: (
        <p className={valueInputClassName} style={beVietnamFontStyle}>
          {createUsername(formState.name, formState.phone)}
        </p>
      ),
    },
    {
      label: "Tên",
      content: (
        <input
          type="text"
          value={formState.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className={valueInputClassName}
          style={beVietnamFontStyle}
        />
      ),
    },
    {
      label: "Email",
      content: (
        <input
          type="email"
          value={formState.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className={valueInputClassName}
          style={beVietnamFontStyle}
        />
      ),
    },
    {
      label: "Số điện thoại",
      content: (
        <input
          type="tel"
          value={formState.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className={valueInputClassName}
          style={beVietnamFontStyle}
        />
      ),
    },
    {
      label: "Giới tính",
      content: (
        <p className={valueInputClassName} style={beVietnamFontStyle}>
          {getGenderLabel(formState.name)}
        </p>
      ),
    },
    {
      label: "Ngày sinh",
      content: (
        <input
          type="text"
          value={formState.birthDate}
          onChange={(event) => handleChange("birthDate", event.target.value)}
          className={valueInputClassName}
          style={beVietnamFontStyle}
        />
      ),
    },
  ] as const;

  return (
    <UserPanel
      title="Thông tin cá nhân"
      description="Quản lý thông tin cá nhân để bảo mật tài khoản"
      className="w-full max-w-195.75 rounded-none border-white/10 bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
      headerClassName="min-h-21 h-21 px-7 pt-5.25"
      titleClassName="text-[20px] leading-[25px] font-normal text-black dark:text-[#F6E8ED]"
      descriptionClassName="mt-1.5 text-[16px] leading-5 font-normal text-black dark:text-[#DABBC6]"
      lineClassName="left-3 top-auto bottom-0 w-[calc(100%-24px)] max-w-205"
      bodyClassName="px-7 pb-7 pt-10"
    >
      <div className="relative min-h-77.5">
        <div className="mx-auto grid max-w-152 grid-cols-[182px_minmax(0,1fr)] gap-x-15 gap-y-5">
          {profileRows.map((row) => (
            <div key={row.label} className="contents">
              <p className={labelClassName} style={beVietnamFontStyle}>
                {row.label}
              </p>
              <div>{row.content}</div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleSave}
          className="absolute bottom-0 right-0 h-10.75 rounded-[8px] bg-[#FF98A7] px-5 text-[18px] leading-5.75 font-medium text-white shadow-[0_4px_10px_rgba(218,98,125,0.45)] hover:bg-[#F18EA0]"
          style={beVietnamFontStyle}
        >
          Lưu
        </Button>
      </div>
    </UserPanel>
  );
}