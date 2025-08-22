import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePatients from './pages/admin/ManagePatients';
import AddPatientPage from './pages/admin/AddPatientPage';
import EditPatientPage from './pages/admin/EditPatientPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientProfile from './pages/patient/PatientProfile';
import HealthDataPage from './pages/patient/HealthDataPage';

// Protected Route Components
const AdminRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  
  return isAuthenticated && userRole === 'admin' 
    ? element 
    : <Navigate to="/login" replace />;
};

const PatientRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  
  return isAuthenticated && userRole === 'patient' 
    ? element 
    : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute element={<DashboardLayout role="admin" />} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="patients/add" element={<AddPatientPage />} />
          <Route path="patients/edit/:id" element={<EditPatientPage />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientRoute element={<DashboardLayout role="patient" />} />}>
          <Route index element={<PatientDashboard />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="health-data" element={<HealthDataPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;