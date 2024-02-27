import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ListFilter } from "lucide-react";

type MobileCuisineFilterProps = {
    children: React.ReactNode
}

export function MobileCuisineFilter({
    children
}: MobileCuisineFilterProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
        <ListFilter />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-auto scrollbar">
        {children}
      </SheetContent>
    </Sheet>
  )
}
