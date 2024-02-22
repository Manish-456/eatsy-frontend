import { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Images } from "lucide-react";
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";

export function ImageSection() {
  const { control } = useFormContext();
  const [imageName, setImageName] = useState("")
  const inpRef = useRef<HTMLInputElement>(null);

  function handleUploadImage() {
    if (inpRef.current) {
      inpRef.current.click();      
    }
  }

  function handleChange(e:React.ChangeEvent<HTMLInputElement> , field: ControllerRenderProps<FieldValues, "imageFile">){
      if(e.target.files){
        field.onChange(e.target.files[0]);        
        setImageName(e.target.files[0].name);                    
      }
      return;
  }

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Restaurant Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="opacity-0 cursor-pointer"
                  ref={inpRef}
                  onChange={(e) => handleChange(e, field)}
                />
              </FormControl>
              <div
                onClick={handleUploadImage}
                className="flex rounded-md hover:bg-black/10 cursor-pointer h-60 items-center gap-2 justify-center flex-col aspect-square w-60 border"
              >
                <Images className="h-8 text-muted-foreground w-8" />
                <span className="text-sm font-semibold hover:underline text-muted-foreground">
                 {imageName || "Upload an image"}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}