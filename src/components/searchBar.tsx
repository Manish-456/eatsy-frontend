import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

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
  className?: string;
  searchQuery?: string;
};

export function SearchBar({
  onSubmit,
  placeholder,
  onReset,
  searchQuery,
  className
}: SearchBarProps) {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) onReset();
  };

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          `flex mx-4 items-center flex-1 gap-3 justify-between border-2 rounded-full p-3`, className,
          {
            "border-red-500": form.formState.errors.searchQuery,
          }
        )}
      >
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

        <Button
          onClick={handleReset}
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>

        <Button type="submit" className="rounded-full">
          Search
        </Button>
      </form>
    </Form>
  );
}

export function SearchBarSkeleton(){
  return (
    <div className="rounded-md"
    >
    <Skeleton className="p-8 rounded-full w-full" />
    </div>
  )
}
