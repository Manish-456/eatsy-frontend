import { ReturnRestaurant, TOrder, UpdateStatusOrderRequest } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantData: FormData
  ): Promise<ReturnRestaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create restaurant`);
    }
    return response.json();
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success(`Restaurant created!`);
  }

  if (error) {
    toast.error(`Failed to update restaurant!`);
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurant = async (): Promise<ReturnRestaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error(`Failed to get restaurant`);
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "myRestaurant",
    getMyRestaurant
  );

  return {
    restaurant,
    isLoading,
  };
};

export const useRemoveRestaurantImage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const removeRestaurantImageRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/remove-image`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) throw new Error(`Failed to remove image`);

    return response.json();
  };

  const {
    mutate: removeRestaurantImage,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: removeRestaurantImageRequest,
    onSuccess: () => queryClient.invalidateQueries(["myRestaurant"]),
  });

  if (isSuccess) {
    toast.success(`Image removed successfully`);
  }
  if (error) {
    toast.error(`Failed to remove image`);
  }

  return {
    isLoading,
    removeRestaurantImage,
  };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantData: FormData
  ): Promise<ReturnRestaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantData,
    });

    if (!response.ok) throw new Error(`Failed to update restaurant`);

    return response.json();
  };

 const {mutateAsync: updateRestaurant, isLoading, error, isSuccess} = useMutation({
    mutationFn: updateRestaurantRequest,
  });

  if(isSuccess){
    toast.success(`Restaurant updated!`);
  }

  if(error){
    toast.error(`Failed to update restaurant`);
  }

  return {
    updateRestaurant,
    isLoading
  }
};

export const useGetMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrderRequest = async (): Promise<TOrder[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get orders`);
    }

    return response.json();
  };

  const { data: myRestaurantOrders, isLoading: isOrderLoading } = useQuery(
    ["myRestaurantOrders"],
    getMyRestaurantOrderRequest
  );

  return {
    myRestaurantOrders,
    isOrderLoading,
  };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyRestaurantOrderRequest = async (
    updateStatusOrderRequest: UpdateStatusOrderRequest
  ): Promise<ReturnRestaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: updateStatusOrderRequest.status
      }),
    });

    if (!response.ok) throw new Error(`Failed to update order`);

    return response.json();
  };

 const {mutateAsync: updateOrderStatus, isLoading, error, isSuccess} = useMutation({
    mutationFn: updateMyRestaurantOrderRequest,
    onSuccess: () => queryClient.invalidateQueries(["myRestaurantOrders"])
  });

  if(isSuccess){
    toast.success(`Order updated!`);
  }

  if(error){
    toast.error(`Failed to update order`);
  }

  return {
    updateOrderStatus,
    isLoading
  }
};


export const useRemoveMyRestaurantMenu = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const removeMyRestaurantMenuRequest = async(menuItemId: string) => {
   const accessToken = await getAccessTokenSilently();

   const response: any = await fetch(`${API_BASE_URL}/api/my/restaurant/menu-item/${menuItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
   });

   if(!response.ok) throw new Error(response.message);

   return response.json();
  }

  const {mutate: removeMenuItem, isLoading, error, isSuccess} = useMutation(removeMyRestaurantMenuRequest, {
    onSuccess: () => queryClient.invalidateQueries("myRestaurant")
  })
  
  if(error){
    toast.error(`Failed to remove menu. Please check if this menu item already ordered.`)
  }  


  return {
    removeMenuItem,
    isLoading
  }

}