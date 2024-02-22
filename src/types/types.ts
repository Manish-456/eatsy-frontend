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
   user: string;
   name: string;
   city: string;
   country: string;
   deliveryPrice: string;
   estimatedDeliveryTime: string;
   createdAt: string;
   menuItems?: TMenuItem[]
   updatedAt: string
}