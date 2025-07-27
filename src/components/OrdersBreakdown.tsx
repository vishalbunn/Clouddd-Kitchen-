import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const OrdersBreakdown = () => {
  const [completedOrders, setCompletedOrders] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);

  useEffect(() => {
    const fetchOrdersBreakdown = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count: completedCount, error: completedError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .eq('status', 'Completed');

      if (completedError) {
        console.error(completedError);
      } else {
        setCompletedOrders(completedCount || 0);
      }

      const { count: activeCount, error: activeError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .in('status', ['Received', 'Preparing', 'Ready', 'Out for Delivery']);

      if (activeError) {
        console.error(activeError);
      } else {
        setActiveOrders(activeCount || 0);
      }
    };

    fetchOrdersBreakdown();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Orders Breakdown</h2>
      <p className="text-xl">
        Completed: <span className="font-bold">{completedOrders}</span>
      </p>
      <p className="text-xl">
        Active: <span className="font-bold">{activeOrders}</span>
      </p>
    </div>
  );
};

export default OrdersBreakdown;
