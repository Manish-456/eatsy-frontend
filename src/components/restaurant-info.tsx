import { TRestaurant } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LocateFixedIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
  restaurant: TRestaurant;
};

export function RestaurantInfo({ restaurant }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{restaurant.name}</CardTitle>
        <div className="flex text-sm items-center dark:text-slate-300 text-slate-500">
          <LocateFixedIcon className="mr-2  h-4 w-4" /> {restaurant.city},{" "}
          {restaurant.country}
        </div>
        <CardDescription>
            {restaurant?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 ">
        <h2 className="text-lg font-semibold">Available Cuisines</h2>

        {restaurant.cuisines.map((cuisine) => (
          <Button
            key={cuisine}
            variant={"outline"}
            className="mr-2 border border-orange-200/10"
          >
            {cuisine}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}



export function RestaurantInfoSkeleton(){
  return (
    <div className="w-full rounded-md space-y-4 border p-4">
     <Skeleton className="h-8 w-64" />
     <div className="flex items-center gap-4">
      <Skeleton className="rounded-full w-4 h-4" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-24" />
     </div>
     <Skeleton className="h-24 w-full" />
     <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <div className="flex flex-wrap gap-4">
      {
        new Array(5).fill("").map((_,idx) => <Skeleton className="h-8 w-24" key={idx} />)
      }
      </div>
     </div>
    </div>
  )
}
