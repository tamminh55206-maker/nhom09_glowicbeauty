import { Suspense } from "react";
import { UserContent } from "./UserContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[calc(100vh-220px)] bg-white px-4 py-16 dark:bg-[#140F13]">
          <div className="mx-auto max-w-xl border border-[#E8E2E5] bg-white p-8 text-center shadow-[0_10px_22px_rgba(0,0,0,0.12)] dark:bg-[#24171F]">
            <p className="text-base text-[#5D4850] dark:text-[#E6D1D8]">
              Đang tải...
            </p>
          </div>
        </section>
      }
    >
      <UserContent />
    </Suspense>
  );
}
