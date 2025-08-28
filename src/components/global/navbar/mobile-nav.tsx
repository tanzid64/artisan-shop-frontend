"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Menu, Search } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "../user-management/user-dropdown";
import { Cart } from "./cart";

export const MobileNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md lg:hidden">
      <div className="px-4 py-3 bg-primary text-white">
        <div className="flex items-center justify-between">
          {/* Menu Sheet Trigger */}
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] bg-accent-foreground text-accent border-primary"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-4">
                    <Link href={"#"}>
                      <Heart fill="red" className="size-6 text-destructive" />
                    </Link>
                    <Link href={"#"}>
                      <Heart className="size-6" />
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="search..."
                    className="w-full rounded-md pl-4 pr-12 py-2 bg-white text-accent-foreground border-0"
                  />
                  <Button
                    size="sm"
                    variant={"ghost"}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3"
                  >
                    <Search className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Artisan Shop</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Cart Sheet Trigger */}
            <Cart />
            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};
