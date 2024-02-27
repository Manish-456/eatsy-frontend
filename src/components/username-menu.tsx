import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { NAV_LINKS } from "@/config/nav-link-config";
import { cn } from "@/lib/utils";


interface UsernameMenuProps {
  picture : string
}

export function UsernameMenu({ picture }: UsernameMenuProps) {
  const { logout } = useAuth0();
  const { pathname } = useLocation();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3">
        <UserAvatar imageUrl={picture} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 p-3 w-56">
        {
          NAV_LINKS.map(link => (
        <DropdownMenuItem asChild key={link.label}>
          <Link to={link.route} className={cn("font-semibold text-[15px]", pathname === link.route && "bg-secondary")}>{link.label}</Link>
        </DropdownMenuItem>
          ))
        }
        <Separator />
        <DropdownMenuItem>
          <Button className="flex flex-1 font-bold" onClick={() => logout()}>
            Logout 
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
