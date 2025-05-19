import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PatientWithSensorData } from '../types';
import { initialPatients, generateSensorData, updateVitalSign } from '../data/patients';

// Define action types
type PatientAction = 
  | { type: 'ADD_PATIENT', payload: PatientWithSensorData }
  | { type: 'REMOVE_PATIENT', payload: string }
  | { type: 'UPDATE_SENSOR_DATA', payload: { id: string, sensorData: any } };

// Context interface
interface PatientContextType {
  patients: PatientWithSensorData[];
  addPatient: (patient: Omit<PatientWithSensorData, 'id' | 'sensorData' | 'registeredDate'>) => void;
  removePatient: (id: string) => void;
}

// Create the context
const PatientContext = createContext<PatientContextType | undefined>(undefined);

// Reducer function
const patientReducer = (state: PatientWithSensorData[], action: PatientAction): PatientWithSensorData[] => {
  switch (action.type) {
    case 'ADD_PATIENT':
      return [...state, action.payload];
    case 'REMOVE_PATIENT':
      return state.filter(patient => patient.id !== action.payload);
    case 'UPDATE_SENSOR_DATA':
      return state.map(patient => 
        patient.id === action.payload.id
          ? { ...patient, sensorData: action.payload.sensorData }
          : patient
      );
    default:
      return state;
  }
};

// Load patients from localStorage or use initial state
const loadPatientsFromStorage = (): PatientWithSensorData[] => {
  const storedPatients = localStorage.getItem('patients');
  return storedPatients ? JSON.parse(storedPatients) : initialPatients;
};

// Provider component
export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, dispatch] = useReducer(patientReducer, loadPatientsFromStorage());

  // Save patients to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Simulate real-time updates to sensor data
  useEffect(() => {
    if (patients.length === 0) return;

    const interval = setInterval(() => {
      patients.forEach(patient => {
        const updatedSensorData = {
          heartRate: updateVitalSign(patient.sensorData.heartRate),
          bodyTemperature: updateVitalSign(patient.sensorData.bodyTemperature),
          muscleActivity: updateVitalSign(patient.sensorData.muscleActivity),
          alertStatus: patient.sensorData.alertStatus
        };

        // Randomly change alert status
        if (Math.random() > 0.95) {
          const statuses = ['normal', 'warning', 'critical'] as const;
          updatedSensorData.alertStatus = statuses[Math.floor(Math.random() * statuses.length)];
        }

        dispatch({
          type: 'UPDATE_SENSOR_DATA',
          payload: { id: patient.id, sensorData: updatedSensorData }
        });
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [patients]);

  // Add new patient
  const addPatient = (patientData: Omit<PatientWithSensorData, 'id' | 'sensorData' | 'registeredDate'>) => {
    const newPatient: PatientWithSensorData = {
      ...patientData,
      id: crypto.randomUUID(),
      sensorData: generateSensorData(),
      registeredDate: new Date().toISOString()
    };
    dispatch({ type: 'ADD_PATIENT', payload: newPatient });
  };

  // Remove patient
  const removePatient = (id: string) => {
    dispatch({ type: 'REMOVE_PATIENT', payload: id });
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, removePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

// Custom hook for using the context
export const usePatients = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};