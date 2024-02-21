import { User, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { UsernameMenu } from "./username-menu";
import { Button } from "./ui/button";

interface MobileNavLinksProps {
  user: User;
}
export default function MobileNavLinks({ user }: MobileNavLinksProps) {
   const {logout} = useAuth0()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <UsernameMenu />
        <div className="flex  flex-col">
          <h3 className="font-semibold text-[15px]  text-justify">{user?.name}</h3>
          <p className="truncate text-xs">{user?.email}</p>
        </div>
      </div>
      <Button variant={"outline"} asChild className="w-full">
        <Link className="mt-4 px-4 font-semibold" to={"/profile"}>
          Visit Profile
        </Link>
      </Button>
      <Button 
      type="button"
      onClick={() => logout()}
      className="w-full">
       Log Out
      </Button>
    </div>
  );
}
