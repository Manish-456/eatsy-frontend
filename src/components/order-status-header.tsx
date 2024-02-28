import { cn } from "@/lib/utils";
import { TOrder } from "@/types/types";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { ORDER_STATUSES } from "@/config/order-status-config";
import { Skeleton } from "./ui/skeleton";

type Props = {
  order: TOrder;
};

export function OrderStatusHeader({ order }: Props) {
  const status = ORDER_STATUSES.find((status) => status.name === order.status);

  const getExpectedDeliveryTime = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };
  
  return (
    <>
      <h1 className="text-xl  font-semibold tracking-tight flex flex-col gap-1 md:flex-row md:justify-between">
        <span>
          Order Status:{" "}
          <span className={cn("text-white ", status?.className)}>
            {status?.label}
          </span>
        </span>
        <span className="text-lg  font-normal">
          Expected by: {getExpectedDeliveryTime()}
        </span>
      </h1>
      <Progress className="animate-pulse" value={status?.value} />
      <Separator />
    </>
  );
}

export function OrderStatusHeaderSkeleton(){
  return (
    <>
    <div className="flex gap-4 flex-col md:flex-row md:justify-between">
    <Skeleton className="w-80 h-8" />
    <Skeleton className="w-32 h-8" />
    </div>
      <Skeleton className="w-full h-3" />
      <Separator />
    </>
  )
}