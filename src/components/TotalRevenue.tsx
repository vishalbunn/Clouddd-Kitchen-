import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('orders')
        .select('total')
        .gte('created_at', today.toISOString());

      if (error) {
        console.error(error);
      } else {
        const revenue = data.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(revenue);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Total Revenue (Today)</h2>
      <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
    </div>
  );
};

export default TotalRevenue;
