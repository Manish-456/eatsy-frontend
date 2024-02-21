import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

export function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3">
        <UserAvatar imageUrl={user?.picture!} />
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
