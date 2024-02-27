import { ORDER_STATUS, TOrder } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { ORDER_STATUSES } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/my-restaurant-api";
import { useEffect, useState } from "react";

type Props = {
  order: TOrder;
};

export function OrderItemCard({ order }: Props) {
  const { updateOrderStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<ORDER_STATUS>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const getTime = () => {
    const orderedDateTime = new Date(order.createdAt);

    const hours = orderedDateTime.getHours();
    const minutes = orderedDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const handleStatusChange = async (newStatus: ORDER_STATUS) => {
    updateOrderStatus({
      orderId: order._id,
      status: newStatus,
    });

    setStatus(newStatus);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 md:gap-10 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-0.5  font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-1 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
              , {order.deliveryDetails.country}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-1 font-normal">{getTime()}</span>
          </div>
          <div className="flex items-center">
            Total Cost:
            <span className="ml-0.5 flex  items-center font-normal">
              <DollarSign className="h-4 w-4 mt-0.5" />{" "}
              {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <div key={item.menuItemId}>
              <Badge className="mr-2">{item.quantity}</Badge>
              {item.name}
            </div>
          ))}
        </div>
        <div className="flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            disabled={isLoading}
            value={status}
            onValueChange={(value) => handleStatusChange(value as ORDER_STATUS)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUSES.map((status) => (
                <SelectItem value={status.name}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
