import { SearchState } from "@/pages/searchPage";
import { RestaurantSearchResponse, ReturnRestaurant } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);

  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) throw new Error(`Failed to get restaurant`);

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState, city],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByRequest = async (): Promise<ReturnRestaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) throw new Error("Failed to get restaurant");

    return response.json();
  };

  const { data, isLoading } = useQuery(
    ["getRestaurant"],
    getRestaurantByRequest,
    { enabled: !!restaurantId }
  );

  return {
    data,
    isLoading,
  };
};
