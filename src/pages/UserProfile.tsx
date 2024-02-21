import { useGetCurrentUser, useUpdateUser } from "@/api/user-api";
import { UserProfileForm } from "@/components/forms/user-profile-form";
import { Loader2 } from "lucide-react";


export default function UserProfilePage() {
 const { updateUser, isLoading } = useUpdateUser();
 const {currentUser, isLoading: isUserLoading} = useGetCurrentUser();

 if(isUserLoading) {
  return <div className="mt-40 flex items-center justify-center ">
    <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
  </div>
 }

 if(!currentUser) {
  return <div className="text-lg font-semibold text-center mt-40">
     Unable to load user profile
  </div>
 }

  return <UserProfileForm isLoading={isLoading} onSave={updateUser} currentUser={currentUser} />;
}
