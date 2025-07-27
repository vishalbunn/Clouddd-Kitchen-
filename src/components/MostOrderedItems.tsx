import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const MostOrderedItems = () => {
  const [mostOrderedItems, setMostOrderedItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchMostOrderedItems = async () => {
      const { data, error } = await supabase.rpc('get_most_ordered_items');

      if (error) {
        console.error(error);
      } else {
        setMostOrderedItems(data);
      }
    };

    fetchMostOrderedItems();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Most Ordered Items</h2>
      <ul>
        {mostOrderedItems.map((item) => (
          <li key={item.name} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostOrderedItems;
