import React from 'react';
import Card from '../common/Card';
import { Coffee, Droplet, File as Toilet } from 'lucide-react';

interface FlexInputsProps {
  food: boolean;
  water: boolean;
  restroom: boolean;
}

const FlexInputs: React.FC<FlexInputsProps> = ({ food, water, restroom }) => {
  return (
    <Card title="Patient Requests">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-lg ${food ? 'bg-amber-50 border-2 border-amber-500' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full ${food ? 'bg-amber-100' : 'bg-gray-100'} mb-3`}>
              <Coffee className={`h-6 w-6 ${food ? 'text-amber-600' : 'text-gray-400'}`} />
            </div>
            <h3 className="text-lg font-medium mb-1">Food Request</h3>
            <p className={`text-sm ${food ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
              {food ? 'ACTIVE' : 'None'}
            </p>
            {food && (
              <div className="mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full animate-pulse">
                Attention Needed
              </div>
            )}
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${water ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full ${water ? 'bg-blue-100' : 'bg-gray-100'} mb-3`}>
              <Droplet className={`h-6 w-6 ${water ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <h3 className="text-lg font-medium mb-1">Water Request</h3>
            <p className={`text-sm ${water ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {water ? 'ACTIVE' : 'None'}
            </p>
            {water && (
              <div className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full animate-pulse">
                Attention Needed
              </div>
            )}
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${restroom ? 'bg-purple-50 border-2 border-purple-500' : 'bg-gray-50 border border-gray-200'} transition-all duration-300`}>
          <div className="flex flex-col items-center text-center">
            <div className={`p-3 rounded-full ${restroom ? 'bg-purple-100' : 'bg-gray-100'} mb-3`}>
              <Toilet className={`h-6 w-6 ${restroom ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
            <h3 className="text-lg font-medium mb-1">Restroom Request</h3>
            <p className={`text-sm ${restroom ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
              {restroom ? 'ACTIVE' : 'None'}
            </p>
            {restroom && (
              <div className="mt-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full animate-pulse">
                Attention Needed
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">About Patient Requests</h4>
        <p className="text-sm text-gray-600">
          These indicators show real-time requests from the patient using flex sensors. 
          When a request is active, please attend to the patient's needs as soon as possible.
        </p>
      </div>
    </Card>
  );
};

export default FlexInputs;