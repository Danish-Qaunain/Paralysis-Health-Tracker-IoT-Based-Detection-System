import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Activity, 
  Thermometer, 
  Heart, 
  Bell, 
  AlertTriangle,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { 
  getPatientProfile, 
  getPatientHealthData,
  Patient,
  HealthData,
  subscribeToPatientHealthData
} from '../../lib/supabase';
import TemperatureChart from '../../components/charts/TemperatureChart';
import HeartRateChart from '../../components/charts/HeartRateChart';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [recentRequests, setRecentRequests] = useState<HealthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestVitals, setLatestVitals] = useState<{
    temperature: number | null;
    heart_rate: number | null;
  }>({
    temperature: null,
    heart_rate: null
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch patient profile
        const patientData = await getPatientProfile(user.id);
        if (patientData) {
          setPatient(patientData);
          
          // Fetch health data
          const data = await getPatientHealthData(user.id, 100);
          setHealthData(data);
          
          // Set latest vitals
          if (data.length > 0) {
            setLatestVitals({
              temperature: data[0].temperature,
              heart_rate: data[0].heart_rate
            });
          }
          
          // Set recent requests
          const requests = data
            .filter(item => item.flex_request)
            .slice(0, 5);
          setRecentRequests(requests);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time updates
    if (user.id) {
      const subscription = subscribeToPatientHealthData(user.id, (newData) => {
        // Update health data list
        setHealthData(prev => [newData, ...prev]);
        
        // Update latest vitals
        setLatestVitals({
          temperature: newData.temperature,
          heart_rate: newData.heart_rate
        });
        
        // Update recent requests if applicable
        if (newData.flex_request) {
          setRecentRequests(prev => [newData, ...prev].slice(0, 5));
        }
      });
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  // Function to determine temperature status
  const getTemperatureStatus = (temp: number | null) => {
    if (temp === null) return { color: 'text-neutral-500', status: 'No data' };
    if (temp > 38.5) return { color: 'text-red-500', status: 'High' };
    if (temp < 35.5) return { color: 'text-blue-500', status: 'Low' };
    return { color: 'text-green-500', status: 'Normal' };
  };

  // Function to determine heart rate status
  const getHeartRateStatus = (rate: number | null) => {
    if (rate === null) return { color: 'text-neutral-500', status: 'No data' };
    if (rate > 120) return { color: 'text-red-500', status: 'High' };
    if (rate < 50) return { color: 'text-blue-500', status: 'Low' };
    return { color: 'text-green-500', status: 'Normal' };
  };

  const temperatureStatus = getTemperatureStatus(latestVitals.temperature);
  const heartRateStatus = getHeartRateStatus(latestVitals.heart_rate);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Patient Dashboard</h1>
        <Link to="/patient/profile" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
          View Profile
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {/* Welcome Card */}
      <div className="card p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h2 className="text-xl font-semibold mb-2">Welcome, {patient?.name}</h2>
        <p>
          Your health data is being monitored in real-time. This dashboard shows your vital signs and allows you to track your health status.
        </p>
      </div>

      {/* Vital Signs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Body Temperature</h2>
            <Thermometer className="h-5 w-5 text-primary-500" />
          </div>
          
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-3xl font-bold">
                {latestVitals.temperature !== null 
                  ? `${latestVitals.temperature.toFixed(1)}°C` 
                  : 'N/A'}
              </p>
              <p className={`${temperatureStatus.color} font-medium`}>
                {temperatureStatus.status}
              </p>
            </div>
            
            <div className="text-sm text-neutral-500">
              {healthData.length > 0 && (
                <p>Last updated: {new Date(healthData[0].recorded_at).toLocaleTimeString()}</p>
              )}
            </div>
          </div>
          
          <div className="h-48">
            <TemperatureChart data={healthData.slice(0, 20).reverse()} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Heart Rate</h2>
            <Heart className="h-5 w-5 text-primary-500" />
          </div>
          
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-3xl font-bold">
                {latestVitals.heart_rate !== null 
                  ? `${latestVitals.heart_rate} BPM` 
                  : 'N/A'}
              </p>
              <p className={`${heartRateStatus.color} font-medium`}>
                {heartRateStatus.status}
              </p>
            </div>
            
            <div className="text-sm text-neutral-500">
              {healthData.length > 0 && (
                <p>Last updated: {new Date(healthData[0].recorded_at).toLocaleTimeString()}</p>
              )}
            </div>
          </div>
          
          <div className="h-48">
            <HeartRateChart data={healthData.slice(0, 20).reverse()} />
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
        
        {recentRequests.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Request
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 text-primary-500 mr-2" />
                          <span className="font-medium">{request.flex_request}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-500">
                        {new Date(request.recorded_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Sent
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card p-8 text-center">
            <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No recent requests found.</p>
            <p className="text-neutral-500 text-sm mt-2">
              Your flex sensor requests will appear here when you make them.
            </p>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        
        {healthData.some(data => data.fall_status) ? (
          <div className="card p-6 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-1">Fall Detected</h3>
                <p className="text-red-700">
                  A fall was detected on {new Date(healthData.find(data => data.fall_status)?.recorded_at || '').toLocaleString()}.
                  Healthcare providers have been notified.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-6 bg-green-50 border-l-4 border-green-500">
            <div className="flex items-start">
              <Bell className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">No Active Alerts</h3>
                <p className="text-green-700">
                  There are currently no critical alerts for your health status.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;