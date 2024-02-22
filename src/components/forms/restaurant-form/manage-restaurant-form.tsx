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

type ManageRestaurantProps = {
  onSave: (restaurantData: FormData) => void;
  isLoading: boolean;
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
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageFile: z.instanceof(File, {
    message: "Image is required",
  }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

export function ManageRestaurantForm({
  onSave,
  isLoading,
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

  const onSubmit = (values: RestaurantFormData) => {
    const formData = new FormData();
    
    formData.append('name', values.name);
    formData.append('city', values.city);
    formData.append('country', values.country);

    formData.append('deliveryPrice', (values.deliveryPrice * 100).toString());
    formData.append('estimatedDeliveryTime', values.estimatedDeliveryTime.toString());
    
    values.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    })

    values.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    })

    if(values.imageFile){
      formData.append("imageFile", values.imageFile)
    }

    onSave(formData);
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:p-10">
        <DetailSection/>
        <Separator />
        <CuisineSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        <Separator />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
    </form>
  </Form>;
}
