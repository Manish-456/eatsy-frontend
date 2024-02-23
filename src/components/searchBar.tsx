import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type SearchBarProps = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
};

export function SearchBar({ onSubmit, placeholder, onReset }: SearchBarProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if(onReset) onReset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(`flex items-center flex-1 gap-3 justify-between border-2 rounded-full p-3 mx-5`, {
        "border-red-500": form.formState.errors.searchQuery
      })}>
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 hidden md:block text-orange-500"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className="shadow-none border-none text-normal md:font-normal font-semibold md:text-xl focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <Button
            onClick={handleReset}
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
          >
           <X className="h-4 w-4"/>
          </Button>
        )}

        <Button type="submit" className="rounded-full">Search</Button>
      </form>
    </Form>
  );
}
