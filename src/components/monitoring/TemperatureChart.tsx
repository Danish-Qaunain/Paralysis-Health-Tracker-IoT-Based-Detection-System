import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { SensorData } from '../../types';
import Card from '../common/Card';
import { Thermometer } from 'lucide-react';

interface TemperatureChartProps {
  data: SensorData[];
  currentValue: number;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data, currentValue }) => {
  const formattedData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: d.temperature
  }));
  
  const isTemperatureNormal = currentValue >= 36 && currentValue <= 37.5;
  const isTemperatureHigh = currentValue > 37.5;
  
  const getTemperatureStatus = () => {
    if (isTemperatureHigh) return 'High';
    if (isTemperatureNormal) return 'Normal';
    return 'Low';
  };
  
  const getTemperatureColor = () => {
    if (isTemperatureHigh) return 'text-red-600';
    if (isTemperatureNormal) return 'text-emerald-600';
    return 'text-blue-600';
  };
  
  return (
    <Card title="Body Temperature">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className={`p-3 rounded-full ${isTemperatureHigh ? 'bg-red-100' : isTemperatureNormal ? 'bg-emerald-100' : 'bg-blue-100'} mr-4`}>
            <Thermometer className={`h-6 w-6 ${isTemperatureHigh ? 'text-red-600' : isTemperatureNormal ? 'text-emerald-600' : 'text-blue-600'}`} />
          </div>
          <div>
            <div className="text-2xl font-bold">
              <span className={getTemperatureColor()}>{currentValue.toFixed(1)}°C</span>
            </div>
            <div className="text-sm text-gray-500">
              Status: <span className={getTemperatureColor()}>{getTemperatureStatus()}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
            <span>Normal: 36.0-37.5°C</span>
          </div>
        </div>
      </div>
      
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
              domain={[35, 40]} 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temperature']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0891b2" 
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TemperatureChart;