import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, HeartPulse, ThermometerSnowflake, Zap, ArrowLeft, User, Phone, CalendarDays } from 'lucide-react';
import { usePatients } from '../../context/PatientContext';
import { PatientWithSensorData, VitalSign } from '../../types';

// Line chart component
const LineChart: React.FC<{ data: VitalSign[], color: string, label: string, unit: string }> = ({ 
  data, color, label, unit 
}) => {
  // We'll simulate a chart with CSS
  const maxValue = Math.max(...data.map(d => d.value)) * 1.2; // Add 20% margin
  const minValue = Math.min(...data.map(d => d.value)) * 0.8; // Add 20% margin
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
      <div className="h-40 flex items-end space-x-1">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / (maxValue - minValue)) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="w-full relative">
                <div 
                  className={`w-full ${color} transition-all duration-500`} 
                  style={{ height: `${Math.max(height, 5)}%` }}
                ></div>
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-1 px-2 rounded text-xs whitespace-nowrap">
                  {point.value.toFixed(1)} {unit}
                  <br />
                  {new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients } = usePatients();
  const [patient, setPatient] = useState<PatientWithSensorData | null>(null);
  
  useEffect(() => {
    const foundPatient = patients.find(p => p.id === id);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      navigate('/dashboard');
    }
  }, [id, patients, navigate]);
  
  if (!patient) {
    return (
      <div className="flex justify-center items-center h-64">
        <Activity className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get alert status styling
  const getAlertStatusStyle = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-blue-600 text-white">
          <h2 className="text-2xl font-bold">{patient.name}</h2>
          <div className="text-blue-100">Patient ID: {patient.id.substring(0, 8)}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="flex items-center border rounded-lg p-3">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Age / Gender</div>
              <div className="font-medium">{patient.age} years, {patient.gender}</div>
            </div>
          </div>
          
          <div className="flex items-center border rounded-lg p-3">
            <Phone className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Contact Info</div>
              <div className="font-medium">{patient.contactInfo}</div>
            </div>
          </div>
          
          <div className="flex items-center border rounded-lg p-3">
            <CalendarDays className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">Registered On</div>
              <div className="font-medium">{formatDate(patient.registeredDate)}</div>
            </div>
          </div>
        </div>
        
        {patient.medicalHistory && (
          <div className="px-6 pb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Medical History</h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {patient.medicalHistory}
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Real-time Vital Signs
          </h2>
          
          <div className={`px-3 py-1 rounded-full border ${getAlertStatusStyle(patient.sensorData.alertStatus)}`}>
            {patient.sensorData.alertStatus.charAt(0).toUpperCase() + patient.sensorData.alertStatus.slice(1)} Status
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="flex items-center bg-red-50 p-4 rounded-lg">
            <HeartPulse className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Heart Rate</div>
              <div className="text-2xl font-semibold text-gray-800">
                {patient.sensorData.heartRate[patient.sensorData.heartRate.length - 1].value.toFixed(0)} <span className="text-sm font-normal">bpm</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <ThermometerSnowflake className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Body Temperature</div>
              <div className="text-2xl font-semibold text-gray-800">
                {patient.sensorData.bodyTemperature[patient.sensorData.bodyTemperature.length - 1].value.toFixed(1)} <span className="text-sm font-normal">°C</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
            <Zap className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Muscle Activity</div>
              <div className="text-2xl font-semibold text-gray-800">
                {patient.sensorData.muscleActivity[patient.sensorData.muscleActivity.length - 1].value.toFixed(1)} <span className="text-sm font-normal">units</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-0">
          <h3 className="text-lg font-medium text-gray-800 mb-4">24-Minute History</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <LineChart 
              data={patient.sensorData.heartRate} 
              color="bg-red-400" 
              label="Heart Rate (bpm)" 
              unit="bpm"
            />
            
            <LineChart 
              data={patient.sensorData.bodyTemperature} 
              color="bg-blue-400" 
              label="Body Temperature (°C)" 
              unit="°C"
            />
            
            <LineChart 
              data={patient.sensorData.muscleActivity} 
              color="bg-yellow-400" 
              label="Muscle Activity" 
              unit="units"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;