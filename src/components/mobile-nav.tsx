import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Welcome to Eatsy</SheetTitle>
          <Separator />
          <SheetDescription className="mt-2 flex">
                <Button className="w-full">Login</Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
