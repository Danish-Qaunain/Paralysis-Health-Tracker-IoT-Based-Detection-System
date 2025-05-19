import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PatientDetailPage from './pages/PatientDetailPage';
import { PatientProvider } from './context/PatientContext';

function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient/:id" element={<PatientDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PatientProvider>
  );
}

export default App;