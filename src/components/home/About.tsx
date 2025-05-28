import React from 'react';
import { Users, HeartPulse, Brain, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Neuro Health Life</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering healthcare technology that transforms the lives of paralysis patients through intelligent monitoring and personalized care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our multidisciplinary team brings together expertise from healthcare, technology, and patient advocacy. With decades of combined experience, we understand the unique challenges faced by paralysis patients and their caregivers.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white">
                <HeartPulse className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Patient-Centered Approach</h3>
              <p className="text-gray-600">
                Every feature of our system is designed with patient needs at the center. We continuously collaborate with patients, caregivers, and healthcare providers to ensure our solutions address real-world challenges and improve quality of life.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white">
                <Brain className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Innovative Technology</h3>
              <p className="text-gray-600">
                Our IoT health monitoring system leverages cutting-edge technology including advanced sensors, real-time data analytics, and intuitive interfaces. We continuously refine our platform to incorporate the latest advancements in healthcare technology.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">24/7 Monitoring</h3>
              <p className="text-gray-600">
                Our system provides round-the-clock monitoring, giving peace of mind to patients and caregivers alike. With instant alerts and comprehensive data tracking, we ensure that critical health events are detected and addressed promptly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;