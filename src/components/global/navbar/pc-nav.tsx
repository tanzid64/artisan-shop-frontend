"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Mail, Phone, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const PCNavBar = () => {
  // Handle Scroll Nav
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md hidden lg:block">
      {/* Top Navbar hidden on scroll */}
      <div
        className={cn("bg-primary transition-all duration-300 text-white", {
          "-translate-y-full opacity-0 h-0": isScrolled,
          "translate-y-0 opacity-100": !isScrolled,
        })}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Artisan Shop</h1>
            </div>
            {/* Search Bar */}
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
            {/* Contact info & Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>Example@Gmail.Com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+56587554420</span>
              </div>
              <div className="flex space-x-1">
                <Badge variant="destructive" className="bg-red-500">
                  5
                </Badge>
                <Badge variant="secondary" className="bg-green-500">
                  8
                </Badge>
                <Badge variant="secondary" className="bg-blue-500">
                  4
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-accent border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Navigation Menu */}
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="font-medium" asChild>
                    <Link href={"/"}>Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-accent font-medium">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <NavigationMenuLink className="block py-2 ">
                        All Products
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block py-2 ">
                        Categories
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="  font-medium">
                    Vendor
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <NavigationMenuLink className="block py-2">
                        Become a Vendor
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block py-2">
                        Vendor Dashboard
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className=" font-medium">
                    Blog
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className=" font-medium">
                    Campaign
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className=" font-medium">
                    Pages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <NavigationMenuLink className="block py-2">
                        About Us
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block py-2">
                        FAQ
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="font-medium">
                    Track Order
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="text-red-500 hover:text-red-600 font-medium">
                    Daily Deals
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="">
                Contact
              </Button>

              <Button className=" text-white">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>

              <Button variant="ghost" className="relative ">
                <ShoppingCart className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 bg-red-500 text-xs"
                >
                  5
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
