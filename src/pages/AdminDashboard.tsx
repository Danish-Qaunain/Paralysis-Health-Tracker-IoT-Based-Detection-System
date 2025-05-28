import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserPlus, Users, ChevronLeft, RefreshCw } from 'lucide-react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PatientsList from '../components/admin/PatientsList';
import PatientForm from '../components/admin/PatientForm';
import TemperatureChart from '../components/monitoring/TemperatureChart';
import ECGMonitor from '../components/monitoring/ECGMonitor';
import FlexInputs from '../components/monitoring/FlexInputs';
import FallDetection from '../components/monitoring/FallDetection';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { patients, currentPatientData, patientHistoricalData, setCurrentPatientId, currentPatientId } = useData();
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  React.useEffect(() => {
    document.title = 'Admin Dashboard - Neuro Health Life';
  }, []);
  
  React.useEffect(() => {
    if (currentPatientData) {
      setLastUpdated(new Date());
    }
  }, [currentPatientData]);
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  const handleViewPatient = (id: string) => {
    setCurrentPatientId(id);
  };
  
  const handleBackToPatients = () => {
    setCurrentPatientId(null);
  };
  
  const currentPatient = patients.find(p => p.id === currentPatientId);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!currentPatientId ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                  <p className="text-gray-600">
                    Manage patients and monitor their health data
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    variant="primary" 
                    onClick={() => setShowAddPatient(true)}
                    className="flex items-center"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add New Patient
                  </Button>
                </div>
              </div>
              
              {showAddPatient ? (
                <Card title="Register New Patient">
                  <PatientForm onCancel={() => setShowAddPatient(false)} />
                </Card>
              ) : (
                <Card 
                  title="Patients List" 
                  headerAction={
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {patients.length} Patients
                    </div>
                  }
                >
                  <PatientsList onViewPatient={handleViewPatient} />
                </Card>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center">
                  <button 
                    onClick={handleBackToPatients}
                    className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      {currentPatient?.name}
                    </h1>
                    <p className="text-gray-600">
                      Patient ID: {currentPatient?.patientId} | Age: {currentPatient?.age}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                  <div className="animate-spin">
                    <RefreshCw className="h-4 w-4 text-cyan-600" />
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
                  <span className="text-lg text-gray-600">Loading patient data...</span>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;