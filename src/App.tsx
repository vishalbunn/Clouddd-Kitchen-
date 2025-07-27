import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Import all the necessary pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MenuPage from './pages/MenuPage';
import LiveMenuPage from './pages/LiveMenuPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Combined routes from both branches */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/live-menu" element={<LiveMenuPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
