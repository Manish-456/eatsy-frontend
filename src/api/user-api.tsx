const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string;
    email: string;
    name?: string;
    picture?: string;
}

import { useMutation } from "react-query";

export const useCreateUser = () => {
    const createUser = async(userData : CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            throw new Error("Failed to create user")
        };
    }

    const { mutateAsync: registerUser, isLoading, isError, isSuccess } = useMutation(createUser);

    return {
        registerUser,
        isLoading,
        isError,
        isSuccess
    }
}
