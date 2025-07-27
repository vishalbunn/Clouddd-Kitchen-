import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Skeleton } from './ui/Skeleton';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  is_available: boolean;
};

const LiveMenuViewer = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true);
      if (error) {
        console.error(error);
      } else {
        setMenuItems(data as MenuItem[]);
      }
      setLoading(false);
    };

    fetchMenuItems();

    const channel = supabase
      .channel('realtime-menu')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'menu_items' },
        (payload) => {
          console.log('Change received!', payload);
          fetchMenuItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="w-full h-48 rounded-md" />
            <Skeleton className="w-2/3 h-6 mt-2" />
            <Skeleton className="w-full h-4 mt-2" />
            <Skeleton className="w-1/4 h-6 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {menuItems.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg">
          <img
            src={item.image_url || 'https://placehold.co/600x400'}
            alt={item.name}
            className="object-cover w-full h-48 rounded-md"
          />
          <h2 className="mt-2 text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveMenuViewer;
