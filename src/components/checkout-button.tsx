import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserFormData, UserProfileForm } from "@/components/forms/user-profile-form";
import { useGetCurrentUser } from "@/api/user-api";

type CheckoutButtonProps = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}

export function CheckoutButton({
  onCheckout,
  disabled,
  isLoading
}: CheckoutButtonProps) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { currentUser, isLoading: isGetUserLoading } = useGetCurrentUser();
  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button type="button" className="flex-1" onClick={onLogin}>
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="flex-1" type="button" size={"lg"}>
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="md:p-0">
        {/* max-w-[425px] md:min-w-[700px] */}
        <UserProfileForm
          currentUser={currentUser!}
          onSave={onCheckout}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
          isLoading={isGetUserLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
