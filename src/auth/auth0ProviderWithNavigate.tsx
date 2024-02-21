import { useCreateUser } from "@/api/user-api";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode;
};
export default function Auth0ProviderWithNavigate({ children }: Props) {
  const { registerUser } = useCreateUser();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirect_uri)
    throw new Error("Unable to initialize auth");

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      registerUser({
        email: user.email,
        name: user.name,
        auth0Id: user.sub,
        picture: user.picture,
      });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
