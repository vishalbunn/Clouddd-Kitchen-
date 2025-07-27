import React from 'react';
import Layout from '../components/Layout';
import MenuManagement from '../components/MenuManagement';

const MenuPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Menu Management</h1>
      <MenuManagement />
    </Layout>
  );
};

export default MenuPage;
