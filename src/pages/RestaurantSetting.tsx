import { useCreateRestaurant } from "@/api/restaurant-api";
import { ManageRestaurantForm } from "@/components/forms/restaurant-form/manage-restaurant-form";

export default function RestaurantSetting() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  return (
    <>
      <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
    </>
  );
}
