import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

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
import MobileNavLinks from "./mobile-nav-links";
import { useGetCurrentUser } from "@/api/user-api";

export function MobileNav() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const {currentUser} = useGetCurrentUser();
  
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 mt-1 text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Welcome to Eatsy</SheetTitle>
          <Separator />
          <SheetDescription className="mt-2 text-start">
            {!isAuthenticated ? (
              <Button
                onClick={async () => await loginWithRedirect()}
                className="w-full"
              >
                Login
              </Button>
            ) : (
              <MobileNavLinks user={currentUser!} />
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
