export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-gradient-to-b from-white to-[#C1475A]/20 px-4 py-12">
      {children}
    </div>
  );
}
