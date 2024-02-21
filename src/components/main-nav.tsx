import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { UsernameMenu } from "./username-menu";

export default function MainNav() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  return (
    <>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button className="font-semibold" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
    </>
  );
}
