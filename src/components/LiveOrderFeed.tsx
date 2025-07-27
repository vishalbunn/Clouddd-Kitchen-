import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

type Order = {
  id: number;
  created_at: string;
  customer_name: string;
  status: string;
  order_items: {
    quantity: number;
    menu_items: {
      name: string;
    };
  }[];
};

const LiveOrderFeed = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          id,
          created_at,
          customer_name,
          status,
          order_items (
            quantity,
            menu_items (
              name
            )
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setOrders(data as Order[]);
      }
    };

    fetchOrders();

    const channel = supabase
      .channel('realtime-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateOrderStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Live Order Feed</h2>
      <div className="mt-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Order ID: {order.id}</p>
                <p>Customer: {order.customer_name}</p>
                <p>
                  Time:{' '}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value)
                  }
                  className="p-2 border rounded-md"
                >
                  <option value="Received">Received</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready">Ready</option>
                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <ul>
                {order.order_items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.menu_items.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveOrderFeed;
