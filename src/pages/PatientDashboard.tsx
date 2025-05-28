import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import UserPreferences from '../components/common/UserPreferences';
import TemperatureChart from '../components/monitoring/TemperatureChart';
import ECGMonitor from '../components/monitoring/ECGMonitor';
import FlexInputs from '../components/monitoring/FlexInputs';
import FallDetection from '../components/monitoring/FallDetection';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const PatientDashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { patients, currentPatientData, patientHistoricalData, setCurrentPatientId } = useData();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  useEffect(() => {
    document.title = 'Patient Dashboard - Neuro Health Life';
  }, []);
  
  useEffect(() => {
    if (user?.role === 'patient') {
      const patient = patients.find(p => p.username === user.username);
      if (patient) {
        setCurrentPatientId(patient.id);
      }
    }
  }, [user, patients, setCurrentPatientId]);
  
  useEffect(() => {
    if (currentPatientData) {
      setLastUpdated(new Date());
    }
  }, [currentPatientData]);
  
  if (!isAuthenticated || user?.role !== 'patient') {
    return <Navigate to="/patient/login" replace />;
  }

  const fontSize = user?.preferences?.fontSize || 'medium';
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${fontSizeClasses[fontSize]}`}>
      <NavigationBar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Health Dashboard</h1>
              <p className="text-gray-600">
                Real-time monitoring of your vital signs and status
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <UserPreferences />
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
                <div className="animate-spin">
                  <RefreshCw className="h-4 w-4 text-cyan-600" />
                </div>
              </div>
            </div>
          </div>
          
          {currentPatientData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TemperatureChart 
                data={patientHistoricalData} 
                currentValue={currentPatientData.temperature} 
              />
              
              <ECGMonitor 
                data={patientHistoricalData} 
                currentData={currentPatientData.ecg} 
              />
              
              <FlexInputs 
                food={currentPatientData.flexInput.food}
                water={currentPatientData.flexInput.water}
                restroom={currentPatientData.flexInput.restroom}
              />
              
              <FallDetection 
                detected={currentPatientData.fallDetection.detected}
                severity={currentPatientData.fallDetection.severity}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin mr-3">
                <RefreshCw className="h-8 w-8 text-cyan-600" />
              </div>
              <span className="text-lg text-gray-600">Loading your health data...</span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;