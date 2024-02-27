import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { User } from "@/types/types";
import { UserAvatar } from "@/components/user-avatar";
import { NAV_LINKS } from "@/config/nav-link-config";

interface MobileNavLinksProps {
  user: User;
}
export default function MobileNavLinks({ user }: MobileNavLinksProps) {
  const { logout } = useAuth0();

  const { pathname } = useLocation();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <UserAvatar imageUrl={user?.picture} />
        <div className="flex  flex-col">
          <h3 className="font-semibold text-[15px] truncate  text-justify">
            {user?.name}
          </h3>
          <p className="truncate text-xs">{user?.email}</p>
        </div>
      </div>
      {NAV_LINKS.map((link) => (
        <Button
          key={link.route}
          variant={pathname === link.route ? "secondary" : "outline"}
          asChild
          className="w-full"
        >
          <Link className="mt-4 px-4 font-semibold" to={link.route}>
            {link.label}
          </Link>
        </Button>
      ))}
      <Button type="button" onClick={() => logout()} className="w-full">
        Log Out
      </Button>
    </div>
  );
}
