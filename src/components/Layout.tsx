import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Orderly Meals</h1>
        <Link to="/login">
          <button className="px-4 py-2 text-white bg-blue-500 rounded">
            Kitchen Portal
          </button>
        </Link>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
