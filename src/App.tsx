import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerLayout from './shared/layouts/CustomerLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Layout */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/about" element={<CustomerLayout><About /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />

        {/* Admin Layout */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
