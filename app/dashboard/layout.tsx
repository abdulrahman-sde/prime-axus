import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DashboardLayout from "@/features/dashboard/dashboard-layout";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return <DashboardLayout>{children}</DashboardLayout>;
}
