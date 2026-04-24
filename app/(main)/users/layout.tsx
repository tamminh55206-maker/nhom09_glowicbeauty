import { UserAreaShell } from "@/components/users/UserAreaShell";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserAreaShell>{children}</UserAreaShell>;
}