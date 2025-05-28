import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { SensorData } from '../../types';
import Card from '../common/Card';
import { Heart, AlertCircle } from 'lucide-react';

interface ECGMonitorProps {
  data: SensorData[];
  currentData: SensorData['ecg'];
}

const ECGMonitor: React.FC<ECGMonitorProps> = ({ data, currentData }) => {
  const formattedData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    value: d.ecg.value
  }));
  
  const isHeartRateNormal = currentData.value >= 60 && currentData.value <= 100;
  const isLeadOff = currentData.leadOff;
  
  const getHeartRateStatus = () => {
    if (isLeadOff) return 'Lead Off';
    if (currentData.value > 100) return 'Tachycardia';
    if (currentData.value < 60) return 'Bradycardia';
    return 'Normal';
  };
  
  const getHeartRateColor = () => {
    if (isLeadOff) return 'text-gray-500';
    if (currentData.value > 100) return 'text-red-600';
    if (currentData.value < 60) return 'text-amber-600';
    return 'text-emerald-600';
  };
  
  return (
    <Card title="ECG Monitoring">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          {isLeadOff ? (
            <div className="p-3 rounded-full bg-gray-100 mr-4">
              <AlertCircle className="h-6 w-6 text-gray-500" />
            </div>
          ) : (
            <div className={`p-3 rounded-full ${isHeartRateNormal ? 'bg-emerald-100' : 'bg-red-100'} mr-4`}>
              <Heart className={`h-6 w-6 ${isHeartRateNormal ? 'text-emerald-600' : 'text-red-600'}`} />
            </div>
          )}
          <div>
            <div className="text-2xl font-bold">
              <span className={getHeartRateColor()}>
                {isLeadOff ? '-- ' : currentData.value} BPM
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Status: <span className={getHeartRateColor()}>{getHeartRateStatus()}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
            <span>Normal: 60-100 BPM</span>
          </div>
        </div>
      </div>
      
      {isLeadOff ? (
        <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">ECG Lead Disconnected</h3>
            <p className="text-gray-500">
              Please check the ECG leads and ensure they are properly connected to the patient.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[40, 120]} 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} BPM`, 'Heart Rate']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="3 3" />
              <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default ECGMonitor;