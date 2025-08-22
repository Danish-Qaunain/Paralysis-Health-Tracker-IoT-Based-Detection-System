import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ChevronLeft, 
  Thermometer, 
  Heart, 
  AlertTriangle, 
  MessageSquare,
  Calendar,
  Download
} from 'lucide-react';
import { getPatientHealthData, HealthData } from '../../lib/supabase';
import TemperatureChart from '../../components/charts/TemperatureChart';
import HeartRateChart from '../../components/charts/HeartRateChart';

const HealthDataPage: React.FC = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [filteredData, setFilteredData] = useState<HealthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'temperature', 'heart', 'requests', 'falls'
  const [dateRange, setDateRange] = useState('7d'); // '24h', '7d', '30d', '90d'

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch a large amount of health data for filtering
        const data = await getPatientHealthData(user.id, 500);
        setHealthData(data);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Apply filters to health data
    if (healthData.length === 0) {
      setFilteredData([]);
      return;
    }

    // Apply date range filter
    let dateFiltered = [...healthData];
    const now = new Date();
    
    if (dateRange === '24h') {
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      dateFiltered = dateFiltered.filter(item => new Date(item.recorded_at) > yesterday);
    } else if (dateRange === '7d') {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFiltered = dateFiltered.filter(item => new Date(item.recorded_at) > lastWeek);
    } else if (dateRange === '30d') {
      const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFiltered = dateFiltered.filter(item => new Date(item.recorded_at) > lastMonth);
    } else if (dateRange === '90d') {
      const lastQuarter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      dateFiltered = dateFiltered.filter(item => new Date(item.recorded_at) > lastQuarter);
    }

    // Apply data type filter
    if (filter === 'temperature') {
      dateFiltered = dateFiltered.filter(item => 
        item.temperature > 38.5 || item.temperature < 35.5
      );
    } else if (filter === 'heart') {
      dateFiltered = dateFiltered.filter(item => 
        item.heart_rate > 120 || item.heart_rate < 50
      );
    } else if (filter === 'requests') {
      dateFiltered = dateFiltered.filter(item => item.flex_request);
    } else if (filter === 'falls') {
      dateFiltered = dateFiltered.filter(item => item.fall_status);
    }

    setFilteredData(dateFiltered);
  }, [healthData, filter, dateRange]);

  const downloadData = () => {
    if (filteredData.length === 0) return;
    
    // Create CSV content
    const headers = ['Date', 'Time', 'Temperature (°C)', 'Heart Rate (BPM)', 'Request', 'Fall Detected'];
    const csvRows = [headers];
    
    filteredData.forEach(item => {
      const date = new Date(item.recorded_at);
      const row = [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        item.temperature.toString(),
        item.heart_rate.toString(),
        item.flex_request || '',
        item.fall_status ? 'Yes' : 'No'
      ];
      csvRows.push(row);
    });
    
    // Convert to CSV
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-data-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/patient"
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-700" />
        </Link>
        <h1 className="text-2xl font-bold">Health Data</h1>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="label">Data Type</label>
            <select 
              className="input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Data</option>
              <option value="temperature">Temperature Alerts</option>
              <option value="heart">Heart Rate Alerts</option>
              <option value="requests">Assistance Requests</option>
              <option value="falls">Fall Detections</option>
            </select>
          </div>
          
          <div>
            <label className="label">Time Period</label>
            <select 
              className="input"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          
          <div className="ml-auto self-end">
            <button 
              onClick={downloadData}
              className="btn border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              disabled={filteredData.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Thermometer className="h-5 w-5 text-primary-500 mr-2" />
            Temperature History
          </h2>
          <div className="h-64">
            {filteredData.length > 0 ? (
              <TemperatureChart data={filteredData.slice(0, 50).reverse()} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-neutral-500">No temperature data available for the selected period</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Heart className="h-5 w-5 text-primary-500 mr-2" />
            Heart Rate History
          </h2>
          <div className="h-64">
            {filteredData.length > 0 ? (
              <HeartRateChart data={filteredData.slice(0, 50).reverse()} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-neutral-500">No heart rate data available for the selected period</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">Health Data Records</h2>
          <div className="text-sm text-neutral-500">
            Showing {filteredData.length} records
          </div>
        </div>
        
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Temperature
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Heart Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Assistance Request
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Fall Detected
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredData.map((data) => {
                  // Determine temperature status
                  let tempClass = 'text-green-500';
                  if (data.temperature > 38.5) tempClass = 'text-red-500';
                  else if (data.temperature < 35.5) tempClass = 'text-blue-500';
                  
                  // Determine heart rate status
                  let heartClass = 'text-green-500';
                  if (data.heart_rate > 120) heartClass = 'text-red-500';
                  else if (data.heart_rate < 50) heartClass = 'text-blue-500';
                  
                  return (
                    <tr key={data.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-neutral-400 mr-2" />
                          <span>{new Date(data.recorded_at).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={tempClass}>{data.temperature.toFixed(1)}°C</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={heartClass}>{data.heart_rate} BPM</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.flex_request ? (
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-primary-500 mr-2" />
                            <span>{data.flex_request}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.fall_status ? (
                          <div className="flex items-center text-red-500">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span>Yes</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400">No</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No health data found for the selected filters.</p>
            <p className="text-neutral-500 text-sm mt-2">
              Try adjusting your filter criteria or time period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthDataPage;