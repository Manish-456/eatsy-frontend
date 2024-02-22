import { ReturnRestaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createRestaurantRequest = async(restaurantData: FormData): Promise<ReturnRestaurant> => {
        const accessToken = await getAccessTokenSilently();

       const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantData
        });

        if(!response.ok){
            throw new Error(`Failed to create restaurant`);
        }
       return response.json();
    }

    const {
        mutateAsync: createRestaurant,
        isLoading,
        isSuccess,
        error
    } = useMutation(createRestaurantRequest);

    if(isSuccess){
        toast.success(`Restaurant created!`);
    }

    if(error){
        toast.error(`Failed to update restaurant!`)
    }

    return {
        createRestaurant,
        isLoading
    }
}