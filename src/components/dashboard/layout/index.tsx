import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NavBar } from "./nav-bar";
import { AppSidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: { name: string; href: string; icon: React.ReactNode }[];
}
export const DashboardLayout = ({
  children,
  sidebarItems,
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
// This is comment
