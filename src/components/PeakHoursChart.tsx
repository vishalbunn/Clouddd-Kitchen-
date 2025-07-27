import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PeakHoursChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPeakHours = async () => {
      const { data, error } = await supabase.rpc('get_peak_hours');

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    };

    fetchPeakHours();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Peak Hours</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeakHoursChart;
