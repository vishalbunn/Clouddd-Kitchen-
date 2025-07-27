import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
        </div>
        <nav className="mt-5">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/menu"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Menu Management
          </Link>
          <Link
            to="/live-menu"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Live Menu
          </Link>
          <Link
            to="/payment"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Payment
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default Layout;
