import { CartItem } from "@/pages/DetailPage";
import { TRestaurant } from "@/types/types";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  restaurant: TRestaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export function OrderSummary({ restaurant, cartItems, removeFromCart }: Props) {
  const getTotalCose = () => {
    const totalInCent = cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    const totalWithDelivery = totalInCent + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight flex justify-between">
          <span>Your Order</span>
          <div className="flex items-center gap-0">
            <DollarSign className="mt-1" /> {getTotalCose()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <Badge className="mr-2">{item.quantity}</Badge>
              {item.name}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4" />{" "}
              {((item.price * item.quantity) / 100).toFixed(2)}
              <div className="h-8 w-8 cursor-pointer text-white transition-colors ml-2 rounded-full bg-red-500/70 hover:bg-red-400 flex items-center justify-center" role="button" onClick={() => removeFromCart(item)}>
              <Trash className="h-4 w-4  " />
              </div>
            </div>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <p className="font-semibold">Delivery Charge</p>
          <div className="flex  items-center">
            <DollarSign className="mt-1 h-4 w-4" />{" "}
            {(restaurant.deliveryPrice / 100).toFixed(2)}
          </div>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
