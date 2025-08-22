import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Bell, 
  Thermometer, 
  Heart, 
  Plus,
  AlertTriangle
} from 'lucide-react';
import { getAllPatients, getPatientHealthData, HealthData, Patient } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<HealthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all patients
        const patientsData = await getAllPatients();
        setPatients(patientsData);
        
        // Fetch recent alerts (we'll gather all health data with fall_status=true or abnormal vitals)
        const alerts: HealthData[] = [];
        
        for (const patient of patientsData) {
          const healthData = await getPatientHealthData(patient.id, 10);
          const patientAlerts = healthData.filter(data => 
            data.fall_status || 
            data.temperature > 38.5 || 
            data.temperature < 35.5 ||
            data.heart_rate > 120 || 
            data.heart_rate < 50
          );
          
          alerts.push(...patientAlerts);
        }
        
        // Sort alerts by most recent
        alerts.sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
        setRecentAlerts(alerts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Find patient name by ID
  const getPatientName = (patientId: string): string => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  // Get alert message based on health data
  const getAlertMessage = (data: HealthData): string => {
    if (data.fall_status) return 'Fall detected';
    if (data.temperature > 38.5) return 'High temperature';
    if (data.temperature < 35.5) return 'Low temperature';
    if (data.heart_rate > 120) return 'High heart rate';
    if (data.heart_rate < 50) return 'Low heart rate';
    if (data.flex_request) return `Request: ${data.flex_request}`;
    return 'Alert';
  };

  // Get severity class based on the alert type
  const getAlertSeverity = (data: HealthData): string => {
    if (data.fall_status) return 'bg-red-100 text-red-800';
    if (data.temperature > 39 || data.temperature < 35 || data.heart_rate > 140 || data.heart_rate < 40)
      return 'bg-red-100 text-red-800'; // Critical
    if (data.temperature > 38.5 || data.temperature < 35.5 || data.heart_rate > 120 || data.heart_rate < 50)
      return 'bg-orange-100 text-orange-800'; // Warning
    return 'bg-blue-100 text-blue-800'; // Information
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Admin Dashboard</h1>
        <Link to="/admin/patients/add" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Total Patients</p>
              <h3 className="text-2xl font-bold">{patients.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Active Monitoring</p>
              <h3 className="text-2xl font-bold">{patients.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Recent Alerts</p>
              <h3 className="text-2xl font-bold">{recentAlerts.length}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Patient Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 3D Patient Cards */}
          {patients.length > 0 ? (
            patients.slice(0, 4).map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="card p-6 cursor-pointer transition-all duration-300"
                onClick={() => {
                  // In a real app, navigate to patient details
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <p className="text-neutral-500 text-sm">{patient.age} years old</p>
                  </div>
                  <Link 
                    to={`/admin/patients/edit/${patient.id}`}
                    className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
                
                <p className="mb-4 text-neutral-700">
                  <span className="font-medium">Diagnosis:</span> {patient.diagnosis}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm text-neutral-600">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold mt-1">36.5°C</p>
                  </div>
                  
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm text-neutral-600">Heart Rate</span>
                    </div>
                    <p className="text-lg font-semibold mt-1">78 BPM</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center p-8 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">No patients registered yet.</p>
              <Link to="/admin/patients/add" className="text-primary-500 font-medium mt-2 inline-block">
                Add your first patient
              </Link>
            </div>
          )}
        </div>

        {patients.length > 4 && (
          <div className="mt-4 text-center">
            <Link to="/admin/patients" className="text-primary-500 hover:text-primary-600 font-medium">
              View all {patients.length} patients
            </Link>
          </div>
        )}
      </div>

      {/* Recent Alerts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        
        {recentAlerts.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Alert Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Vital Signs
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {recentAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-neutral-900">{getPatientName(alert.patient_id)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertSeverity(alert)}`}>
                          {getAlertMessage(alert)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Thermometer className="h-4 w-4 text-neutral-500 mr-1" />
                            <span>{alert.temperature.toFixed(1)}°C</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 text-neutral-500 mr-1" />
                            <span>{alert.heart_rate} BPM</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-500">
                        {new Date(alert.recorded_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No recent alerts detected.</p>
            <p className="text-neutral-500 text-sm mt-2">
              Alerts will appear here when patient vitals change or when assistance is requested.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;