import { TMenuItem } from "@/types/types"
import {  DollarSign, ShoppingCart } from "lucide-react"

type MenuItemProps = {
  menuItem: TMenuItem;
  addToCart: (menuItem: TMenuItem) => void;
}
export function  MenuItem({addToCart, menuItem}: MenuItemProps) {
  return (
    <div onClick={() => addToCart(menuItem)} className="flex cursor-pointer items-center py-2 hover:bg-secondary/80 px-2 rounded-md justify-between">
        <div>

      <h3 className="font-semibold">{menuItem.name}</h3>
      <p className="flex items-center text-sm"><DollarSign className="w-4 mt-1 mr-0.5 h-4" /> {(menuItem.price / 100).toFixed(2)}</p>
        </div>
        <div>
            <ShoppingCart className="h-5 text-orange-500 w-5" />
        </div>
    </div>
  )
}
