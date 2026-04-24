import { cn } from "@/lib/utils";

const beVietnamFontStyle = {
  fontFamily: 'var(--font-be-vietnam), "Be Vietnam Pro", sans-serif',
} as const;

export function UserPanel({
  title,
  description,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  lineClassName,
  bodyClassName,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  lineClassName?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-[#E8D8DE] bg-white shadow-[0_4px_12px_rgba(69,9,32,0.08)] transition-colors dark:border-[#5A444F] dark:bg-[#24171F]",
        className,
      )}
    >
      <header
        className={cn(
          "relative min-h-24 px-5 py-4 dark:border-[#5A444F] sm:px-8",
          headerClassName,
        )}
      >
        <h1
          className={cn(
            "text-[28px] leading-none text-[#450920] dark:text-[#F6E8ED]",
            titleClassName,
          )}
          style={beVietnamFontStyle}
        >
          {title}
        </h1>
        <div
          className={cn(
            "absolute left-2.5 top-21 h-px w-[calc(100%-20px)] max-w-190.25 bg-[#FF98A7]",
            lineClassName,
          )}
        />
        {description ? (
          <p
            className={cn(
              "mt-12 text-sm leading-6 text-[#6D5660] dark:text-[#DABBC6]",
              descriptionClassName,
            )}
            style={beVietnamFontStyle}
          >
            {description}
          </p>
        ) : null}
      </header>

      <div className={cn("px-5 py-5 sm:px-8 sm:py-7", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}