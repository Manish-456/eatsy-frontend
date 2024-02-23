import { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Images, Trash2 } from "lucide-react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useRemoveRestaurantImage } from "@/api/my-restaurant-api";

export function ImageSection() {
  const { control, watch } = useFormContext();
  const [imageName, setImageName] = useState("");
  const inpRef = useRef<HTMLInputElement>(null);
  const { isLoading, removeRestaurantImage } = useRemoveRestaurantImage();
  const existingImageUrl = watch("imageUrl");

  function handleUploadImage() {
    if (inpRef.current) {
      inpRef.current.click();
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "imageFile">
  ) {
    if (e.target.files) {
      field.onChange(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
    return;
  }

  const handleRemoveImage =  () => {
     removeRestaurantImage()
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Restaurant Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex md:flex-row flex-col mx-auto gap-8 lg:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9} className="group relative md:flex-1">
            <img
              src={existingImageUrl}
              className="mt-4 rounded-md object-cover h-full w-full"
            />
            {!isLoading && (
              <div className="bg-black/70 h-full w-full absolute group-hover:opacity-75 -bottom-4 opacity-0 " />
            )}
            {isLoading && (
              <div className="bg-black/70 h-full w-full absolute -bottom-4 opacity-60 " />
            )}
            <div className="absolute right-4 top-8">
              <Button
                type="button"
                size={"icon"}
                onClick={handleRemoveImage}
                className="group-hover:flex transition-all hidden"
                variant={"destructive"}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="opacity-0 h-0 w-0 cursor-pointer"
                  ref={inpRef}
                  onChange={(e) => handleChange(e, field)}
                />
              </FormControl>
              {!existingImageUrl && (
                <div
                  onClick={handleUploadImage}
                  className="flex rounded-md mx-auto hover:bg-black/10 cursor-pointer h-60 items-center gap-2 justify-center flex-col aspect-square w-60 border"
                >
                  <Images className="h-8 text-muted-foreground w-8" />
                  <span className="text-sm font-semibold hover:underline text-muted-foreground">
                    {imageName || "Upload an image"}
                  </span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
