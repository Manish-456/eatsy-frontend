import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/restaurant-api";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RestaurantInfo } from "@/components/restaurant-info";
import { MenuItem } from "@/components/menu-item";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { OrderSummary } from "@/components/order-summary";
import { TMenuItem } from "@/types/types";
import { CheckoutButton } from "@/components/checkout-button";
import { UserFormData } from "@/components/forms/user-profile-form";
import { useGetCurrentUser } from "@/api/user-api";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function DetailPage() {
  const { restaurantId } = useParams();
  const { data, isLoading } = useGetRestaurant(restaurantId);
  const {currentUser} = useGetCurrentUser();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}-${currentUser?._id}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: TMenuItem) => {
    setCartItems((prev) => {
      const existingCartItem = prev.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}-${currentUser?._id}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const updatedCartItem = prev.filter((item) => item._id !== cartItem._id);
      sessionStorage.setItem(
        `cartItems-${restaurantId}-${currentUser?._id}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };

  const onCheckout = (userData: UserFormData) => {
    console.log("userData", userData);
    
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={data.restaurant.imageUrl}
          className="rounded-md h-full w-full object-cover"
          alt={`${data.restaurant.name}_image`}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 ">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={data.restaurant} />
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Menu </CardTitle>
              <Separator />
              <CardContent className="space-y-2 p-0">
                {data.menuItems.map((menuItem) => (
                  <MenuItem addToCart={addToCart} menuItem={menuItem} />
                ))}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <OrderSummary
              removeFromCart={removeFromCart}
              restaurant={data.restaurant}
              cartItems={cartItems}
            />
            <CardFooter>
              <CheckoutButton onCheckout={onCheckout} disabled={cartItems.length === 0} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
