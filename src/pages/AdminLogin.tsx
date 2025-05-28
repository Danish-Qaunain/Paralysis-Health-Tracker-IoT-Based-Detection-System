import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import AdminLoginComponent from '../components/auth/AdminLogin';

const AdminLogin: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Admin Login - Neuro Health Life';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow">
        <AdminLoginComponent />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;