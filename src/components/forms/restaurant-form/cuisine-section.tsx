import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { CUISINE_LIST } from "@/constants/restaurant-options"
import { useFormContext } from "react-hook-form"
import { CuisineCheckbox } from "./cuisine-checkbox"

export function CuisineSection() {
   const {control} = useFormContext()
  return (
    <div className="space-y-2">
              <h2 className="text-2xl font-bold">Cuisines</h2>
              <FormDescription>
                Select the cuisines that your restaurant serves
              </FormDescription>
              <FormField 
              control={control}
              name="cuisines"
              render={({field}) => (
                <FormItem>
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1">
                        {
                            CUISINE_LIST.map((cuisineItem, index) => (
                                <CuisineCheckbox cuisine={cuisineItem} field={field} key={`${cuisineItem}_${index}`} />
                            ))
                        }
                    </div>
                </FormItem>
              )}
              />
    </div>
  )
}
