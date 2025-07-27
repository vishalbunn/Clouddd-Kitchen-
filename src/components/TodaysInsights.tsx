import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const TodaysInsights = () => {
  const [peakTimes, setPeakTimes] = useState<any[]>([]);
  const [mostOrdered, setMostOrdered] = useState<any[]>([]);
  const [avgPrepTime, setAvgPrepTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const { data: peakTimesData, error: peakTimesError } = await supabase.rpc(
        'get_peak_times_today'
      );
      if (peakTimesError) console.error(peakTimesError);
      else setPeakTimes(peakTimesData);

      const { data: mostOrderedData, error: mostOrderedError } =
        await supabase.rpc('get_most_ordered_items_today');
      if (mostOrderedError) console.error(mostOrderedError);
      else setMostOrdered(mostOrderedData);

      const { data: avgPrepTimeData, error: avgPrepTimeError } =
        await supabase.rpc('get_avg_prep_time_today');
      if (avgPrepTimeError) console.error(avgPrepTimeError);
      else setAvgPrepTime(avgPrepTimeData);
    };

    fetchInsights();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Today's Insights</h2>
      <div className="mt-4">
        <h3 className="font-semibold">Peak Order Times</h3>
        <ul>
          {peakTimes.map((time) => (
            <li key={time.hour}>
              {time.hour}:00 - {time.orders} orders
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Most Ordered Items</h3>
        <ul>
          {mostOrdered.map((item) => (
            <li key={item.name}>
              {item.name} - {item.count}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Average Preparation Time</h3>
        <p>{avgPrepTime ? `${avgPrepTime.toFixed(2)} minutes` : 'N/A'}</p>
      </div>
    </div>
  );
};

export default TodaysInsights;
