import { useGetMyOrder } from '@/api/order-api'
import { OrderStatusDetail } from '@/components/order-status-detail';
import { OrderStatusHeader } from '@/components/order-status-header';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LocateFixedIcon } from 'lucide-react';

export default function OrderStatusPage() {
    const {
        myOrders,
        isOrderLoading
    } = useGetMyOrder();


    if(isOrderLoading) return "Loading...";

    if(!myOrders || myOrders.length === 0){
        return "No Orders found"
    }

  return (
    <div className='space-y-10'>
      {
        myOrders.map(order => (
            <div key={order._id} className="shadow-md dark:border  space-y-10 md:p-10 p-4 rounded-lg">
                <OrderStatusHeader order={order} />
                 <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={order} />
                  <div className='flex flex-col gap-2'>

                  <AspectRatio ratio={16/5}>
                    <img src={order.restaurant.imageUrl} alt="restaurant-image" className='h-full w-full rounded-md object-cover' />
                  </AspectRatio>
                  <div className='mt-auto'>
                   <h3 className='text-lg font-semibold mt-2'> {order.restaurant.name}</h3>
                    <p className='text-sm flex'><LocateFixedIcon className='mr-1 mt-0.5 h-4 w-4'/>{order.restaurant.city}, {order.restaurant.country}</p>
                  </div>
                 </div>
                  </div>
            </div>
        ))
      }


    </div>
  )
}
