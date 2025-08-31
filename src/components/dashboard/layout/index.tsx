import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { NavBar } from "./nav-bar";
import { AppSidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const role = (await cookies()).get("role")?.value ?? "user";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <NavBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
// This is comment
