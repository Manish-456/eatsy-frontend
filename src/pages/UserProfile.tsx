import { useUpdateUser } from "@/api/user-api";
import { UserProfileForm } from "@/components/forms/user-profile-form";


export default function UserProfilePage() {
 const { updateUser, isLoading } = useUpdateUser()
  return <UserProfileForm isLoading={isLoading} onSave={updateUser} />;
}
