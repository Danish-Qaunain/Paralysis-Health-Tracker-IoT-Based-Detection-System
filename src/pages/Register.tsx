import React from 'react';
import PatientRegistrationForm from '../components/Register/PatientRegistrationForm';

const Register: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Patient Registration
        </h1>
        <PatientRegistrationForm />
      </div>
    </div>
  );
};

export default Register;