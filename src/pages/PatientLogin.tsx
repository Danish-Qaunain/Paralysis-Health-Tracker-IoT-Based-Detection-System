import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import PatientLoginComponent from '../components/auth/PatientLogin';

const PatientLogin: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Patient Login - Neuro Health Life';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow">
        <PatientLoginComponent />
      </main>
      <Footer />
    </div>
  );
};

export default PatientLogin;