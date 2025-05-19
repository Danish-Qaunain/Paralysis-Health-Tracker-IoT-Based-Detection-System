export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contactInfo: string;
  medicalHistory: string;
  sensorId: string;
  registeredDate: string;
}

export interface VitalSign {
  timestamp: string;
  value: number;
}

export interface SensorData {
  heartRate: VitalSign[];
  bodyTemperature: VitalSign[];
  muscleActivity: VitalSign[];
  alertStatus: 'normal' | 'warning' | 'critical';
}

export interface PatientWithSensorData extends Patient {
  sensorData: SensorData;
}