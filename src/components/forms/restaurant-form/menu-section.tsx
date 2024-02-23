import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import MenuItemInput from './menu-item-input';

export  function MenuSection() {
   const { control } = useFormContext()
   const { fields, append, remove} = useFieldArray({
    control,
    name: 'menuItems'
   });
   

  return (
    <div className="space-y-2">
    <h2 className="text-2xl font-bold">Menu Items</h2>
    <FormDescription>
      Create your menu and give each item a name and a price
    </FormDescription>
    <FormField
    control={control}
    name='menuItems'
    render={() => ( 
        <FormItem className='flex flex-col gap-2'>
            {
                fields.map((_, idx) => (
                    <MenuItemInput removeMenuItem={() => remove(idx)} index={idx} key={idx} />
                ))
            }
        </FormItem>
    )}
    />
    <Button type='button' variant={"ghost"} onClick={() => append({ name: "", price: ""})}>
            Add Menu Item
    </Button>
</div>
  )
}
