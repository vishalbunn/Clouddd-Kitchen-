import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Welcome to Orderly Meals</h1>
        <p className="mt-4 text-lg">Your one-stop solution for meal ordering.</p>
        <Link to="/dashboard">
          <button className="px-4 py-2 mt-8 text-white bg-blue-500 rounded">
            Go to Kitchen Dashboard
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
