import { CUISINE_LIST } from "@/constants/restaurant-options";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

export function CuisineFilter({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) {
  const handleCuisinesReset = () => onChange([]);

  const handleCuisinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="font-semibold mb-2">Filter by Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 text-blue-500 underline cursor-pointer"
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 border p-2 rounded-lg flex flex-col">
        {CUISINE_LIST.slice(0, isExpanded ? CUISINE_LIST.length : 4).map(
          (cuisine, index) => {
            const isSelected = selectedCuisines?.includes(cuisine);

            return (
              <div className="flex" key={`#${cuisine}_${index}`}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={cn(
                    "flex py-2 gap-2 hover:bg-orange-500/10 flex-1 items-center cursor-pointer text-sm px-4 rounded-md font-semibold",
                    {
                      "bg-orange-500 hover:bg-orange-500/90": isSelected,
                    }
                  )}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          }
        )}
        <Button
          variant={"link"}
          className="flex-1 mt-4"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row">
              View Less <ChevronUp className="h-6 w-6"/>
            </span>
          ) : (
            <span className="flex flex-row ">
              View More <ChevronDown className="h-6 w-6"/>
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
