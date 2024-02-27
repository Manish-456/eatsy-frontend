import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { UsernameMenu } from "./username-menu";
import { useGetCurrentUser } from "@/api/user-api";

export default function MainNav() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { currentUser } = useGetCurrentUser();
  return (
    <>
      {isAuthenticated ? (
        
        <UsernameMenu picture={currentUser?.picture!}/>
      ) : (
        <Button className="font-semibold" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
    </>
  );
}
