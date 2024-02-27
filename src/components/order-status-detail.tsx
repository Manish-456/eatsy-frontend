import { TOrder } from '@/types/types'
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { DollarSign } from 'lucide-react';

type Props = {
    order: TOrder;
}

export function OrderStatusDetail({order}: Props) {
  return (
    <div className='space-y-5'>
        <div className="flex flex-col">
            <span className="font-semibold">
                Delivering to:
            </span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</span>
        </div>
        <div className="flex gap-2 flex-col">
            <h3 className="font-semibold ">Your Order</h3>
            <ul role='list' className='flex flex-col gap-2'>
                {
                    order.cartItems.map(item => (
                        <li className='text-[14px]'>{item.name} <Badge className='ml-1' >{item.quantity}</Badge></li>
                    ))
                }
            </ul>
        </div>
        <Separator />
        <div className="flex flex-col">
            <span className="font-semibold">Total</span>
            <div className='flex flex-row items-center'><DollarSign className='h-4 w-4 mt-0.5'/> {(order.totalAmount / 100).toFixed(2)}</div>
        </div>
    </div>
  )
}