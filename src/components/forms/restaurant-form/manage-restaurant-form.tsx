import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { DetailSection } from "./detail-section";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CuisineSection } from "./cuisine-section";
import { MenuSection } from "./menu-section";
import { ImageSection } from "./image-section";
import { ReturnRestaurant } from "@/types/types";
import { useEffect } from "react";

type ManageRestaurantProps = {
  onSave: (restaurantData: FormData) => void;
  isLoading: boolean;
  restaurant?: ReturnRestaurant;
};

const formSchema = z.object({
  name: z.string({
    required_error: "Restaurant name is required!",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  description: z.string({
    required_error: "Description is required"
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      _id: z.optional(z.string()),
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
    ),
    imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, {
    message: "Image is required",
  }).optional(),
}).refine(data => data.imageUrl || data.imageFile, {
  message: "Either image URL or image File must be provided",
  path: ["imageFile"]
});

type RestaurantFormData = z.infer<typeof formSchema>;

export function ManageRestaurantForm({
  onSave,
  isLoading,
  restaurant: restaurantData,
}: ManageRestaurantProps) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  useEffect(() => {
    if (!restaurantData) return;
    const deliveryPrice = restaurantData.restaurant.deliveryPrice / 100;
    const formattedDeliveryPrice = parseInt(deliveryPrice.toFixed(2));

    const menuItemsFormatted = restaurantData.menuItems.map((item) => ({
     ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));
    const { _id, ...rest } = restaurantData.restaurant;

    const updatedRestaurant = {
      ...rest,
      deliveryPrice: formattedDeliveryPrice,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [restaurantData, form]);

  const onSubmit = (values: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("country", values.country);

    formData.append("deliveryPrice", (values.deliveryPrice * 100).toString());
    formData.append(
      "estimatedDeliveryTime",
      values.estimatedDeliveryTime.toString()
    );

    formData.append("description", values.description)

    values.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    values.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      if(restaurantData && menuItem._id){
        formData.append(`menuItems[${index}][_id]`, menuItem._id)
      }
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (values.imageFile) {
      formData.append("imageFile", values.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <DetailSection />
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        <Separator />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}
