import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog';
import { toast } from 'sonner';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  is_available: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  is_available: boolean;
};

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from('menu_items').select('*');
    if (error) {
      toast.error('Failed to fetch menu items');
    } else {
      setMenuItems(data as MenuItem[]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(data)
        .eq('id', editingItem.id);
      if (error) {
        toast.error('Failed to update menu item');
      } else {
        toast.success('Menu item updated successfully');
        setEditingItem(null);
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from('menu_items').insert(data);
      if (error) {
        toast.error('Failed to add menu item');
      } else {
        toast.success('Menu item added successfully');
        setIsDialogOpen(false);
      }
    }
    fetchMenuItems();
    reset();
  };

  const deleteMenuItem = async (id: number) => {
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete menu item');
    } else {
      toast.success('Menu item deleted successfully');
    }
    fetchMenuItems();
  };

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    setValue('name', item.name);
    setValue('price', item.price);
    setValue('description', item.description);
    setValue('image_url', item.image_url);
    setValue('is_available', item.is_available);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingItem(null);
    reset();
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={openAddDialog}
            className="flex items-center px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Menu Item
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Name</label>
              <input {...register('name')} className="w-full p-2 border" />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="w-full p-2 border"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label>Description</label>
              <textarea
                {...register('description')}
                className="w-full p-2 border"
              />
            </div>
            <div>
              <label>Image URL</label>
              <input {...register('image_url')} className="w-full p-2 border" />
            </div>
            <div>
              <label>
                <input type="checkbox" {...register('is_available')} />
                Is Available
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <table className="w-full mt-4 text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Available</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">${item.price.toFixed(2)}</td>
              <td className="p-2 border">
                {item.is_available ? 'Yes' : 'No'}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => openEditDialog(item)}
                  className="p-2 text-blue-500"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="p-2 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
