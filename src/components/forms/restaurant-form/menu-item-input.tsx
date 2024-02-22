import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

export default function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext();
  return (
    <div className="flex-row items-end flex gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => <FormItem>
            <FormLabel>Name <FormMessage /></FormLabel>
            <FormControl>
                <Input {...field} placeholder="Cheese Burger" />
            </FormControl>
        </FormItem>}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => <FormItem>
            <FormLabel>Price ($) <FormMessage /></FormLabel>
            <FormControl>
                <Input {...field} placeholder="8.00" />
            </FormControl>
        </FormItem>}
      />
      <Button size={"icon"} onClick={removeMenuItem} type={"button"} variant={"destructive"}>
        <Trash className="h-4 w-4"/>
      </Button>
    </div>
  );
}
