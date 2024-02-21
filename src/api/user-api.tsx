import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name?: string;
  picture?: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUser = async (userData: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: registerUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUser);

  return {
    registerUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type updateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string
}

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserDetails = async (userData: updateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset
  } = useMutation(updateUserDetails);

   if(isSuccess){
    toast.success("Profile updated!");
   }

   if(error){
    toast.error(error.toString());
    reset()
   }

  return {
    updateUser,
    isLoading
  };
};


