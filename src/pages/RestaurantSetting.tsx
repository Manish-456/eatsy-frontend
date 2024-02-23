import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useUpdateRestaurant,
} from "@/api/my-restaurant-api";
import { ManageRestaurantForm } from "@/components/forms/restaurant-form/manage-restaurant-form";

export default function RestaurantSetting() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isRestaurantUpdating } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;
  return (
    <>
      <ManageRestaurantForm
        isLoading={isLoading || isRestaurantUpdating}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        restaurant={restaurant}
      />
    </>
  );
}
