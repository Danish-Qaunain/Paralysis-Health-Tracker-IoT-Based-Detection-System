import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Patient, SensorData } from '../types';

// Mock data
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    patientId: 'P1001',
    username: 'patient1',
    assignedDate: '2023-09-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 62,
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    patientId: 'P1002',
    username: 'patient2',
    assignedDate: '2023-10-20'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 38,
    email: 'robert.j@example.com',
    phone: '555-456-7890',
    patientId: 'P1003',
    username: 'patient3',
    assignedDate: '2023-11-05'
  }
];

const generateMockSensorData = (): SensorData => {
  return {
    timestamp: new Date().toISOString(),
    temperature: 36 + Math.random() * 2, // Between 36-38°C
    flexInput: {
      food: Math.random() > 0.7,
      water: Math.random() > 0.8,
      restroom: Math.random() > 0.85
    },
    ecg: {
      value: 70 + Math.floor(Math.random() * 30), // Between 70-100 BPM
      leadOff: Math.random() > 0.9
    },
    fallDetection: {
      detected: Math.random() > 0.95,
      severity: Math.random() > 0.97 ? 'high' : Math.random() > 0.95 ? 'medium' : Math.random() > 0.9 ? 'low' : 'none'
    }
  };
};

interface DataContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'assignedDate'>) => void;
  deletePatient: (id: string) => void;
  currentPatientData: SensorData | null;
  patientHistoricalData: SensorData[];
  setCurrentPatientId: (id: string | null) => void;
  currentPatientId: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(null);
  const [currentPatientData, setCurrentPatientData] = useState<SensorData | null>(null);
  const [patientHistoricalData, setPatientHistoricalData] = useState<SensorData[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    if (!currentPatientId) return;

    const generateData = () => {
      const newData = generateMockSensorData();
      setCurrentPatientData(newData);
      setPatientHistoricalData(prev => [...prev.slice(-29), newData]);
    };

    // Generate initial historical data
    if (patientHistoricalData.length === 0) {
      const initialData = Array.from({ length: 30 }, () => generateMockSensorData());
      setPatientHistoricalData(initialData);
    }

    generateData();
    const interval = setInterval(generateData, 3000);
    
    return () => clearInterval(interval);
  }, [currentPatientId]);

  const addPatient = (patient: Omit<Patient, 'id' | 'assignedDate'>) => {
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      assignedDate: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, newPatient]);
  };

  const deletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    if (currentPatientId === id) {
      setCurrentPatientId(null);
    }
  };

  return (
    <DataContext.Provider value={{
      patients,
      addPatient,
      deletePatient,
      currentPatientData,
      patientHistoricalData,
      setCurrentPatientId,
      currentPatientId
    }}>
      {children}
    </DataContext.Provider>
  );
};