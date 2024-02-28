import { useGetMyOrder } from "@/api/order-api";
import {
  OrderStatusDetail,
  OrderStatusDetailSkeleton,
} from "@/components/order-status-detail";
import {
  OrderStatusHeader,
  OrderStatusHeaderSkeleton,
} from "@/components/order-status-header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { LocateFixedIcon } from "lucide-react";

export default function OrderStatusPage() {
  const { myOrders, isOrderLoading } = useGetMyOrder();

  if (isOrderLoading) return <OrderStatusPageSkeleton />;

  if (!myOrders || myOrders.length === 0 ) {
    return (
      <div className="justify-center flex-col gap-2 items-center font-semibold flex ">
        <h1 className="text-2xl font-semibold">No Orders Found.</h1>
        <p className="text-muted-foreground text-center">You haven&apos;t ordered anything yet. Please order something and your order details will be displayed here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      {myOrders.map((order) => (
        <div
          key={order._id}
          className="shadow-md dark:border  space-y-10 md:p-10 p-4 rounded-lg"
        >
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <div className="flex flex-col gap-2">
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order.restaurant.imageUrl}
                  alt="restaurant-image"
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
              <div className="mt-auto">
                <h3 className="text-lg font-semibold mt-2">
                  {" "}
                  {order.restaurant.name}
                </h3>
                <p className="text-sm flex">
                  <LocateFixedIcon className="mr-1 mt-0.5 h-4 w-4" />
                  {order.restaurant.city}, {order.restaurant.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderStatusPageSkeleton() {
  return (
    <div className="space-y-10 w-full">
      {new Array(3).fill("").map((_, idx) => (
        <div
          key={idx}
          className="shadow-md dark:border  space-y-10 md:p-10 p-4 rounded-lg"
        >
          <OrderStatusHeaderSkeleton />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetailSkeleton />
            <div className="flex flex-col gap-2">
              <AspectRatio ratio={16 / 5}>
                <Skeleton className="h-full w-full rounded-md" />
              </AspectRatio>
              <div className="mt-auto space-y-2">
                <Skeleton className="w-64 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
