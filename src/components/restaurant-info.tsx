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
