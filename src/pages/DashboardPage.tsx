import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';
import TotalOrders from '../components/TotalOrders';
import OrdersBreakdown from '../components/OrdersBreakdown';
import TotalRevenue from '../components/TotalRevenue';
import WeeklySalesChart from '../components/WeeklySalesChart';
import MostOrderedItems from '../components/MostOrderedItems';
import PeakHoursChart from '../components/PeakHoursChart';
import LiveOrderFeed from '../components/LiveOrderFeed';
import TodaysInsights from '../components/TodaysInsights';

const DashboardPage = () => {
  const { user, protectedRoute } = useAuth();

  useEffect(() => {
    protectedRoute(['admin', 'kitchen']);
  }, [user]);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
            <TotalOrders />
            <OrdersBreakdown />
            <TotalRevenue />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
            <WeeklySalesChart />
            <MostOrderedItems />
          </div>
          <div className="mt-4">
            <PeakHoursChart />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <LiveOrderFeed />
          <TodaysInsights />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
