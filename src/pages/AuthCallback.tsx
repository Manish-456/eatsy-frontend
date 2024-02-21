import { useCreateUser } from "@/api/user-api"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
   const {user} = useAuth0()
   const navigate = useNavigate();
   const hasUserCreated = useRef(false);

   const { registerUser } = useCreateUser();

   useEffect(() => {
    if (user?.sub && user?.email && !hasUserCreated.current) {
        registerUser({
          email: user.email,
          name: user.name,
          auth0Id: user.sub,
          picture: user.picture,
        });
        hasUserCreated.current = true;
      }

      navigate('/');      
   }, [user, registerUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify">Loading...</div>
  )
}
