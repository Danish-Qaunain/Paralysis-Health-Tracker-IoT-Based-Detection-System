import { PatientWithSensorData } from '../types';

// Initial state - empty array
export const initialPatients: PatientWithSensorData[] = [];

// Helper function to generate random vital sign data
export const generateVitalSigns = (count: number, min: number, max: number) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const timestamp = new Date(now.getTime() - (count - i) * 60000).toISOString(); // Each point is 1 minute apart
    return {
      timestamp,
      value: Math.floor(Math.random() * (max - min + 1)) + min
    };
  });
};

// Generate random sensor data for a patient
export const generateSensorData = () => {
  return {
    heartRate: generateVitalSigns(24, 60, 100), // Last 24 minutes of heart rate data
    bodyTemperature: generateVitalSigns(24, 36, 38), // Last 24 minutes of body temperature data
    muscleActivity: generateVitalSigns(24, 1, 10), // Last 24 minutes of muscle activity data (scale 1-10)
    alertStatus: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'normal'
  };
};

// Update a specific vital sign with a new value
export const updateVitalSign = (vitalSigns: any[], maxLength = 24) => {
  const now = new Date().toISOString();
  const newValue = vitalSigns[vitalSigns.length - 1].value + 
    (Math.random() > 0.5 ? 1 : -1) * Math.random() * 3;
  
  const newSigns = [
    ...vitalSigns.slice(1),
    { timestamp: now, value: newValue }
  ];
  
  return newSigns;
};