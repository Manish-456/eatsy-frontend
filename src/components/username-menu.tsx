import { Link } from "react-router-dom";
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


interface UsernameMenuProps {
  picture : string
}

export function UsernameMenu({ picture }: UsernameMenuProps) {
  const { logout } = useAuth0();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3">
        <UserAvatar imageUrl={picture} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link to={"/user-profile"} className="font-semibold text-[15px]">Visit Profile</Link>
        </DropdownMenuItem>
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
