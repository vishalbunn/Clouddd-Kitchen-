import React from 'react';
import Layout from '../components/Layout';
import LiveMenuViewer from '../components/LiveMenuViewer';

const LiveMenuPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Live Menu</h1>
      <LiveMenuViewer />
    </Layout>
  );
};

export default LiveMenuPage;
