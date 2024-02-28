import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/restaurant-api";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  RestaurantInfo,
  RestaurantInfoSkeleton,
} from "@/components/restaurant-info";
import { MenuItem } from "@/components/menu-item";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useCreateCheckoutSession } from "@/api/order-api";
import { Skeleton } from "@/components/ui/skeleton";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function DetailPage() {
  const { restaurantId } = useParams();
  const { data, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  const { currentUser } = useGetCurrentUser();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(
      `cartItems-${restaurantId}-${currentUser?._id}`
    );
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

  const onCheckout = async (userData: UserFormData) => {
    if (!data?.restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
        menuItemId: cartItem._id,
      })),

      restaurantId: data.restaurant._id,
      deliveryDetails: {
        name: userData.name,
        email: userData.email as string,
        addressLine1: userData.addressLine1,
        city: userData.city,
        country: userData.country,
      },
    };

    const response = await createCheckoutSession(checkoutData);
    sessionStorage.removeItem(`cartItems-${restaurantId}-${currentUser?._id}`);
    window.location.href = response.url;
  };

  if (isLoading || !data) {
    return <DetailPageSkeleton />;
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
              <CheckoutButton
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
                disabled={cartItems.length === 0}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <AspectRatio ratio={16 / 5}>
        <Skeleton className="h-full w-full rounded-md" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 ">
        <div className="flex flex-col gap-4">
          <RestaurantInfoSkeleton />
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-8 w-24" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-64 h-6" />
              </CardDescription>
              <Separator />
            </CardHeader>

            <CardContent className="space-y-2 ">
              {new Array(4).fill(" ").map((_, idx) => (
                <div key={idx} className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex flex-row gap-4">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-6 " />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-8 w-24" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-64 h-6" />
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-2">
              {new Array(4).fill(" ").map((_, idx) => (
                <div key={idx} className="flex justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Skeleton className="h-6 w-6 " />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="flex flex-row gap-4">
                    <Skeleton className="h-6 w-6 " />
                  </div>
                </div>
              ))}
              <Separator />
            </CardContent>
            <CardFooter>
              <Skeleton className="w-full h-8" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
