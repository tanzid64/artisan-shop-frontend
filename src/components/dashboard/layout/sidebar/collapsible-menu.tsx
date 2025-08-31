import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IMenuItem } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CollapsibleMenu = ({ item }: { item: IMenuItem }) => {
  const pathname = usePathname();
  return (
    <Collapsible
      title={item.label}
      defaultOpen={pathname.includes(item.href)}
      className="group/collapsible"
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.label}>
              {item.icon && <item.icon />}
              <span>{item.label}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenuSub>
              {item?.children &&
                item?.children.map((item) => (
                  <SidebarMenuSubItem key={item.id}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarMenu>
    </Collapsible>
  );
};
