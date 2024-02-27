import {
  useCreateRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrder,
  useUpdateRestaurant,
} from "@/api/my-restaurant-api";
import { ManageRestaurantForm } from "@/components/forms/restaurant-form/manage-restaurant-form";
import { OrderItemCard } from "@/components/order-item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RestaurantSetting() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isRestaurantUpdating } =
    useUpdateRestaurant();

    const { myRestaurantOrders: orders } = useGetMyRestaurantOrder()

  const isEditing = !!restaurant;

  return (
    <div>
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">
          Manage Restaurant
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5  py-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map(order => (
          <OrderItemCard order={order} key={order._id} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant"  className="space-y-5  py-10 rounded-lg">
      <ManageRestaurantForm
        isLoading={isLoading || isRestaurantUpdating}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        restaurant={restaurant}
      />
      </TabsContent>
    </Tabs>
    </div>
  );
}
