export type User = {
    _id: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
    name: string;
    picture: string;
}

export type ReturnRestaurant = {
    restaurant: TRestaurant;
    menuItems: TMenuItem[]
}

export type TMenuItem = {
    _id: string,
    name: string;
    price: number;
    restaurantId: number;
}

export type TRestaurant = {
   _id: string;
   user: string | User;
   name: string;
   city: string;
   country: string;
   deliveryPrice: number;
   estimatedDeliveryTime: number;
   description: string;
   createdAt: string;
   menuItems?: TMenuItem[];
   cuisines: string[];
   imageUrl?: string;
   updatedAt: string
}

export type RestaurantSearchResponse = {data: TRestaurant[], menuItems? : [], pagination: {
    page: number,
    total: number,
    pages: number
} }