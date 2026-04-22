import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const basePath = "/nhom09_glowicbeauty";

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}

// Stable price formatter – avoids hydration mismatch caused by
// toLocaleString which may differ between Node.js and browser ICU data.
export function formatPrice(price: number): string {
  const parts: string[] = [];
  let remaining = Math.round(price);
  if (remaining === 0) return "0đ";
  while (remaining > 0) {
    const chunk = remaining % 1000;
    remaining = Math.floor(remaining / 1000);
    if (remaining > 0) {
      parts.unshift(String(chunk).padStart(3, "0"));
    } else {
      parts.unshift(String(chunk));
    }
  }
  return parts.join(".") + "đ";
}
