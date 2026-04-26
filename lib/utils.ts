import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isProd = process.env.NODE_ENV === "production";

export function assetPath(path: string): string {
  return isProd ? "/nhom09_glowicbeauty" + path : path;
}
