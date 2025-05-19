import React from 'react';
import PatientList from '../components/Dashboard/PatientList';

const Dashboard: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Patient Dashboard
        </h1>
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
          <p className="text-gray-700">
            Monitor real-time vital signs and status of all registered patients. Click on "View Details" to see comprehensive data for each patient.
          </p>
        </div>
        <PatientList />
      </div>
    </div>
  );
};

export default Dashboard;