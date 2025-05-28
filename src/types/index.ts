export interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  patientId: string;
  username: string;
  assignedDate: string;
  preferences?: UserPreferences;
}

export interface SensorData {
  timestamp: string;
  temperature: number;
  flexInput: {
    food: boolean;
    water: boolean;
    restroom: boolean;
  };
  ecg: {
    value: number;
    leadOff: boolean;
  };
  fallDetection: {
    detected: boolean;
    severity: 'none' | 'low' | 'medium' | 'high';
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'patient';
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  alertSound: boolean;
  chartRefreshRate: number;
}