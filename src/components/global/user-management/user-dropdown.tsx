import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const UserDropdown = () => {
  const path = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer border-2 border-primary-foreground rounded-full p-1">
          <UserCog2 className="size-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem active={path.includes("login")} asChild>
          <Link href={"/login"}>Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem active={path.includes("register")} asChild>
          <Link href={"/register"}>Register</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"#"}>Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
