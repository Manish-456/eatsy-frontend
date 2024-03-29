import {
    FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export function DetailSection() {
    const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Restaurant Details</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
                <Textarea {...field}  rows={5} placeholder="About your restaurant..."/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center gap-4">
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>City</FormLabel>
            <FormControl>
                <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Country</FormLabel>
            <FormControl>
                <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <div className="flex md:flex-row items-center flex-col gap-4">

      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Delivery Charge ($)</FormLabel>
            <FormControl>
                <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel > Delivery Time (in minutes)</FormLabel>
            <FormControl>
                <Input {...field} placeholder="30"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        </div>
    </div>
  );
}

export function DetailSectionSkeleton () {
  return (
    <div className="space-y-6">
    <div>
      <Skeleton className="w-80 h-8 mb-2" />
      <Skeleton className="w-64 h-6" />
    </div>

    <Skeleton className="w-full h-8 mt-8" />
    <Skeleton className="w-full h-24"/>
    <div className="flex md:flex-row items-center flex-col gap-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
    <div className="flex md:flex-row items-center flex-col gap-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
    </div>
  )
}
