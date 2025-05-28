import React, { useEffect, useState } from 'react';
import Card from '../common/Card';
import { AlertTriangle } from 'lucide-react';

interface FallDetectionProps {
  detected: boolean;
  severity: 'none' | 'low' | 'medium' | 'high';
}

const FallDetection: React.FC<FallDetectionProps> = ({ detected, severity }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  
  // Play alert sound when fall is detected
  useEffect(() => {
    if (detected && severity !== 'none' && !playingAudio) {
      setIsAlertVisible(true);
      setPlayingAudio(true);
      
      const audio = new Audio('https://bigsoundbank.com/UPLOAD/mp3/1482.mp3');
      audio.volume = 0.5;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio is playing
            setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
              setPlayingAudio(false);
            }, 3000);
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            setPlayingAudio(false);
          });
      }
    }
  }, [detected, severity, playingAudio]);
  
  const getSeverityColor = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  const getSeverityIcon = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };
  
  return (
    <Card title="Fall Detection">
      <div className="flex items-center mb-6">
        <div className={`relative p-3 rounded-full ${detected ? 'bg-red-100' : 'bg-green-100'} mr-4`}>
          <AlertTriangle className={`h-6 w-6 ${detected ? 'text-red-600' : 'text-green-600'}`} />
          {detected && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 animate-ping"></span>
          )}
        </div>
        <div>
          <div className="text-lg font-medium">
            Status: <span className={detected ? 'text-red-600' : 'text-green-600'}>
              {detected ? 'Fall Detected' : 'No Falls Detected'}
            </span>
          </div>
          {detected && (
            <div className="text-sm text-gray-600">
              Severity: <span className={`font-medium ${
                severity === 'high' ? 'text-red-600' : 
                severity === 'medium' ? 'text-orange-600' : 
                severity === 'low' ? 'text-yellow-600' : ''
              }`}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {detected && isAlertVisible && (
        <div className={`p-4 rounded-lg border mb-6 animate-pulse ${getSeverityColor()}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">
                {severity === 'high' ? 'Critical Alert' : 
                 severity === 'medium' ? 'Warning Alert' : 'Caution Alert'}
              </h3>
              <div className="mt-1 text-sm">
                <p>
                  {severity === 'high' ? 
                    'Immediate assistance required! Severe fall detected.' : 
                   severity === 'medium' ? 
                    'Attention needed! Moderate fall detected.' : 
                    'Patient may have experienced a minor fall. Please check.'}
                </p>
              </div>
              <div className="mt-2">
                <button 
                  onClick={() => setIsAlertVisible(false)}
                  className={`text-xs font-medium rounded-md px-2 py-1 ${
                    severity === 'high' ? 'bg-red-200 text-red-800 hover:bg-red-300' : 
                    severity === 'medium' ? 'bg-orange-200 text-orange-800 hover:bg-orange-300' : 
                    'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                  }`}
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Fall Detection Status</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Accelerometer Status:</span>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Detection Sensitivity:</span>
            <span className="text-sm font-medium text-gray-800">Medium</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Calibration:</span>
            <span className="text-sm font-medium text-gray-800">Today, 08:30 AM</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 mr-2">Severity Level:</span>
              <div className="flex-grow flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${getSeverityIcon()}`} style={{ 
                    width: severity === 'high' ? '100%' : 
                           severity === 'medium' ? '66%' : 
                           severity === 'low' ? '33%' : '0%' 
                  }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FallDetection;