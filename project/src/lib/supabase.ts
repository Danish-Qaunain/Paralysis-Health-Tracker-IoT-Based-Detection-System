import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLES = {
  PATIENTS: 'patients',
  HEALTH_DATA: 'health_data',
};

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  diagnosis: string;
  created_at: string;
}

export interface HealthData {
  id: string;
  patient_id: string;
  heart_rate: number;
  temperature: number;
  flex_request: string | null;
  fall_status: boolean;
  recorded_at: string;
}

export async function isAdmin(userEmail: string): Promise<boolean> {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  return userEmail === adminEmail;
}

export async function getPatientProfile(userId: string): Promise<Patient | null> {
  const { data, error } = await supabase
    .from(TABLES.PATIENTS)
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching patient profile:', error);
    return null;
  }

  return data;
}

export async function getPatientHealthData(patientId: string, limit = 50): Promise<HealthData[]> {
  const { data, error } = await supabase
    .from(TABLES.HEALTH_DATA)
    .select('*')
    .eq('patient_id', patientId)
    .order('recorded_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching health data:', error);
    return [];
  }

  return data || [];
}

export async function getAllPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from(TABLES.PATIENTS)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching patients:', error);
    return [];
  }

  return data || [];
}

export async function createPatient(patientData: Omit<Patient, 'id' | 'created_at'>): Promise<Patient | null> {
  const { data, error } = await supabase
    .from(TABLES.PATIENTS)
    .insert([patientData])
    .select()
    .single();

  if (error) {
    console.error('Error creating patient:', error);
    return null;
  }

  return data;
}

export async function updatePatient(id: string, updates: Partial<Omit<Patient, 'id' | 'created_at'>>): Promise<Patient | null> {
  const { data, error } = await supabase
    .from(TABLES.PATIENTS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating patient:', error);
    return null;
  }

  return data;
}

export async function deletePatient(id: string): Promise<boolean> {
  const { error } = await supabase
    .from(TABLES.PATIENTS)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting patient:', error);
    return false;
  }

  return true;
}

// Setup real-time subscription for health data
export function subscribeToPatientHealthData(patientId: string, callback: (payload: HealthData) => void) {
  return supabase
    .channel(`health_data_${patientId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLES.HEALTH_DATA,
        filter: `patient_id=eq.${patientId}`,
      },
      (payload) => {
        callback(payload.new as HealthData);
      }
    )
    .subscribe();
}