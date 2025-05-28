import React from 'react';

const Vision: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Future of healthcare technology"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                At Neuro Health Life, we envision a future where technology bridges the gap between paralysis patients and healthcare providers, creating a seamless care ecosystem that enhances quality of life.
              </p>
              
              <p className="text-lg">
                We strive to be at the forefront of healthcare innovation, developing intelligent systems that anticipate patient needs, prevent complications, and enable greater independence.
              </p>
              
              <p className="text-lg">
                Our goal is to create a world where every paralysis patient has access to advanced monitoring solutions that provide peace of mind to them and their loved ones.
              </p>
              
              <div className="pt-4 border-t border-gray-200">
                <blockquote className="italic text-lg text-cyan-700">
                  "Transforming paralysis care through technology, one patient at a time."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;