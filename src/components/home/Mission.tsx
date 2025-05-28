import React from 'react';
import { Heart, Shield, Zap } from 'lucide-react';
import Card from '../common/Card';

const Mission: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to improving the quality of life for paralysis patients through innovative technology and compassionate care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-cyan-500 transition-transform duration-300 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-cyan-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empowering Care</h3>
              <p className="text-gray-600">
                Providing caregivers and healthcare professionals with real-time data to make informed decisions and deliver optimal care.
              </p>
            </div>
          </Card>
          
          <Card className="border-t-4 border-emerald-500 transition-transform duration-300 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-emerald-100 rounded-full mb-4">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rapid Response</h3>
              <p className="text-gray-600">
                Enabling immediate alerts and notifications for critical health events, reducing response time in emergency situations.
              </p>
            </div>
          </Card>
          
          <Card className="border-t-4 border-indigo-500 transition-transform duration-300 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Safety</h3>
              <p className="text-gray-600">
                Implementing advanced monitoring systems to detect falls, vital sign anomalies, and patient needs for comprehensive safety.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mission;