import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      if (error) {
        console.error(error);
      } else {
        setTotalOrders(count || 0);
      }
    };

    fetchTotalOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Total Orders (Today)</h2>
      <p className="text-3xl font-bold">{totalOrders}</p>
    </div>
  );
};

export default TotalOrders;
