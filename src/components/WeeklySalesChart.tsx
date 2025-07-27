import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WeeklySalesChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeeklySales = async () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const { data, error } = await supabase
        .from('orders')
        .select('created_at, total')
        .gte('created_at', lastWeek.toISOString());

      if (error) {
        console.error(error);
      } else {
        const salesByDay = data.reduce((acc, order) => {
          const day = new Date(order.created_at).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          if (!acc[day]) {
            acc[day] = 0;
          }
          acc[day] += order.total;
          return acc;
        }, {} as { [key: string]: number });

        const chartData = Object.keys(salesByDay).map((day) => ({
          name: day,
          sales: salesByDay[day],
        }));

        setData(chartData);
      }
    };

    fetchWeeklySales();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Weekly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySalesChart;
