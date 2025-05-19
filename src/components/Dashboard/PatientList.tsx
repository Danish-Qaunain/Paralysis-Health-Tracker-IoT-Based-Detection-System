import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Trash2, Search, HeartPulse, ThermometerSnowflake, Zap } from 'lucide-react';
import { usePatients } from '../../context/PatientContext';
import { PatientWithSensorData } from '../../types';

const PatientList: React.FC = () => {
  const { patients, removePatient } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.sensorId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get alert status styling
  const getAlertStatusStyle = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle patient deletion with confirmation
  const handleDeletePatient = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete patient "${name}"?`)) {
      removePatient(id);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 border-b border-blue-100 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3 md:mb-0">
          Registered Patients
        </h2>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {filteredPatients.length === 0 ? (
        <div className="p-8 text-center">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No patients found</h3>
          <p className="text-gray-500 mb-4">
            {patients.length === 0 
              ? "There are no registered patients yet." 
              : "No patients match your search criteria."}
          </p>
          {patients.length === 0 && (
            <Link 
              to="/register" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Register New Patient
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sensor ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vital Signs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.sensorId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <div className="flex items-center" title="Heart Rate">
                        <HeartPulse className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-gray-800">
                          {patient.sensorData.heartRate[patient.sensorData.heartRate.length - 1].value.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center" title="Body Temperature">
                        <ThermometerSnowflake className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm text-gray-800">
                          {patient.sensorData.bodyTemperature[patient.sensorData.bodyTemperature.length - 1].value.toFixed(1)}°C
                        </span>
                      </div>
                      <div className="flex items-center" title="Muscle Activity">
                        <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-800">
                          {patient.sensorData.muscleActivity[patient.sensorData.muscleActivity.length - 1].value.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAlertStatusStyle(patient.sensorData.alertStatus)}`}>
                      {patient.sensorData.alertStatus.charAt(0).toUpperCase() + patient.sensorData.alertStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(patient.registeredDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/patient/${patient.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDeletePatient(patient.id, patient.name)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;