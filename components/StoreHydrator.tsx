"use client";

import { useEffect } from "react";
import { useCartStore, useQuizStore } from "@/lib/store";

export function StoreHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!useCartStore.persist.hasHydrated()) {
      useCartStore.persist.rehydrate();
    }
    if (!useQuizStore.persist.hasHydrated()) {
      useQuizStore.persist.rehydrate();
    }
  }, []);

  return <>{children}</>;
}
