import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Paralysis Patient Healthcare Detection System
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 text-center">
            Empowering caregivers with real-time monitoring and improved healthcare outcomes for paralysis patients
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <img 
                src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Healthcare professionals monitoring patient data" 
                className="rounded-lg shadow-lg w-full h-auto mb-6"
              />
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  The Paralysis Patient Healthcare Detection System is designed to revolutionize care for paralysis patients through advanced sensor technology and real-time monitoring. Our system provides healthcare providers with critical data to detect potential health issues early, respond promptly to emergencies, and improve the overall quality of life for patients living with paralysis.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Why We Built This
                </h3>
                <p className="text-gray-600">
                  Paralysis patients face unique healthcare challenges that require constant monitoring and specialized care. Traditional monitoring methods often fall short in providing real-time data needed for prompt intervention. Our system bridges this gap by offering continuous, non-invasive monitoring that alerts caregivers to potential issues before they become emergencies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  We envision a future where paralysis patients receive proactive, personalized healthcare through intelligent monitoring systems. By combining advanced sensor technology with intuitive data visualization, we aim to enhance the standard of care, reduce hospitalizations, and empower patients and their caregivers with actionable health insights.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Real-time Monitoring</h4>
                    <p className="text-gray-600">Continuous tracking of vital signs and movement detection for immediate awareness of patient status</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Early Detection</h4>
                    <p className="text-gray-600">Identify potential health issues before they become critical, enabling proactive care</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Enhanced Safety</h4>
                    <p className="text-gray-600">Immediate alerts for abnormal vital signs or concerning health patterns</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Technology Stack
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Hardware Components</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Wearable Sensors: Non-invasive sensors to monitor vital signs and patient movement</li>
                    <li>• IoT Gateway: Secure data transmission from sensors to cloud database</li>
                    <li>• ECG/EKG Monitors: Continuous heart monitoring with advanced pattern recognition</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Software Platform</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Secure Database: HIPAA-compliant storage for patient health data</li>
                    <li>• Real-time Analytics: AI-powered analysis of vital signs and movement patterns</li>
                    <li>• Alert System: Immediate notifications for healthcare providers when readings fall outside safe parameters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;