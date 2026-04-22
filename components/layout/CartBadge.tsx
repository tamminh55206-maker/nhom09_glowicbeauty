"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
      {totalItems}
    </span>
  );
}
