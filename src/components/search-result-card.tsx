import { Link } from "react-router-dom";
import { TRestaurant } from "@/types/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Banknote, Clock, LocateFixedIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  restaurant: TRestaurant;
};

export default function SearchResultCard({ restaurant }: Props) {
  return (
    <Link
      to={`/restaurant/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 10}>
        <img
          src={restaurant.imageUrl}
          alt="restaurant image"
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:underline">
          {restaurant.name}
        </h3>
        <div id="card-content" className="grid grid-cols-1 gap-2">
          <div className="flex flex-row gap-2 flex-wrap">
            {restaurant.cuisines.slice(0, 30).map((cuisine, index) => (
              <div className="flex gap-2" key={index}>
                <Button size={"sm"} variant={"outline"}>
                  {cuisine}
                </Button>
                {}
              </div>
            ))}
            {restaurant.cuisines.length > 30 && (
              <span className="ml-2 mt-2">...</span>
            )}
          </div>
          <div className="flex mt-3 justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600">
                <Clock className="text-green-600 h-5 w-5" />
                <span className="font-semibold text-sm">
                  {" "}
                  {restaurant.estimatedDeliveryTime} mins
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="text-muted-foreground"/>
                <span className="text-sm text-muted-foreground font-semibold">
                  {" "}
                  Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center mr-4 gap-2">
            <LocateFixedIcon className="h-5 w-5 text-orange-500"/>
              <span className="text-sm font-semibold text-orange-500">
              {
                    restaurant.city + ", " + restaurant.country
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SearchResultCardSkeleton () {
  return (
    <div className="grid lg:grid-cols-[2fr_3fr] gap-5">
        <AspectRatio ratio={16/10}>
          <Skeleton className="h-full w-full rounded-md" />
        </AspectRatio>

        <div className="gap-2  flex flex-col">
          <Skeleton className="h-12 w-64" />

        <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-row gap-2 flex-wrap">
            {new Array(10).fill("").map((_, index) => (
              <div className="flex gap-2" key={index}>
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
            
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-12" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8 rounded-md" />

                <Skeleton className="h-5 w-12">
                  {" "}
                </Skeleton>
              </div>
            <div className="flex ml-auto items-center -mt-8 mr-4 gap-2">
            <Skeleton className="h-5 w-8 rounded-md" />

<Skeleton className="h-5 w-24">
  {" "}
</Skeleton>
</div>
            </div>
          </div>
        </div>
    </div>
  )
}
