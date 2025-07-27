import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MenuPage from './pages/MenuPage';
import LiveMenuPage from './pages/LiveMenuPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/live-menu" element={<LiveMenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
