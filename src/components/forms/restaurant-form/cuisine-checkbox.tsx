import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"


type Props = {
    field: ControllerRenderProps<FieldValues, "cuisines">,
    cuisine: string
}

export function CuisineCheckbox({
    field,
    cuisine
}: Props) {
  return (
    <FormItem className="flex flex-row gap-1 items-center space-x-1 space-y-0 mt-2">
        <FormControl>
            <div >
            <Checkbox checked={field.value.includes(cuisine)} onCheckedChange={(checked) => {
                if(checked){
                    field.onChange([...field.value, cuisine])
                }else{
                    field.onChange(field.value.filter((v: string) => v !== cuisine))
                }
            }} />
            </div>
        </FormControl>
            <FormLabel>{cuisine}</FormLabel>
    </FormItem>
  )
}