import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCartIcon } from "lucide-react";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none size-9 border rounded-full">
          <span className="sr-only">Cart</span>
          <ShoppingCartIcon className="h-6 w-6" />
          <div className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            12
          </div>
        </button>
      </SheetTrigger>
      <SheetContent side="right"></SheetContent>
    </Sheet>
  );
};
