"use client";
import { Logo } from "@/components/global/logo/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ADMIN_MENU, USER_MENU, VENDOR_MENU } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { CollapsibleMenu } from "./collapsible-menu";

export function AppSidebar({
  role,
  ...props
}: { role: string } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const menues = useMemo(() => {
    if (role === "admin") return ADMIN_MENU;
    if (role === "vendor") return VENDOR_MENU;
    return USER_MENU;
  }, [role]);
  return (
    <Sidebar {...props} collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} asChild>
              <Link href="/" prefetch>
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {menues.map((item) =>
              item.children ? (
                <CollapsibleMenu item={item} key={item.id} />
              ) : (
                <SidebarMenu key={item.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.label}
                      asChild
                      isActive={pathname === item.href}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
