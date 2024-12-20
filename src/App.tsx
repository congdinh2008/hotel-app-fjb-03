import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerLayout from './shared/layouts/CustomerLayout';
import ManagerLayout from './shared/layouts/ManagerLayout';
import Dashboard from './pages/manager/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Layout */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/about" element={<CustomerLayout><About /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />

        {/* Admin Layout */}
        <Route path="/manager/dashboard" element={<ManagerLayout><Dashboard /></ManagerLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
