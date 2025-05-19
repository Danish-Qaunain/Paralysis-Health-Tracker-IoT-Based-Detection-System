import React from 'react';
import { Activity, ThermometerSnowflake, AlertTriangle, Heart } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'Real-time Vital Monitoring',
      description: 'Monitor heart rate, body temperature, and other vital signs in real-time with IoT sensors.',
      icon: <Activity className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Temperature Tracking',
      description: 'Keep track of body temperature fluctuations to prevent complications.',
      icon: <ThermometerSnowflake className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Instant Alerts',
      description: 'Receive immediate notifications when vital signs exceed normal thresholds.',
      icon: <AlertTriangle className="h-10 w-10 text-blue-500" />
    },
    {
      title: 'Muscle Activity Monitoring',
      description: 'Track muscle movements and activities to assist in rehabilitation progress.',
      icon: <Heart className="h-10 w-10 text-blue-500" />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;