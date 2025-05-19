import React from 'react';
import PatientDetails from '../components/Dashboard/PatientDetails';

const PatientDetailPage: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <PatientDetails />
    </div>
  );
};

export default PatientDetailPage;