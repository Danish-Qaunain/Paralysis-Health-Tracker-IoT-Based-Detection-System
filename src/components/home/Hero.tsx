import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-700 to-cyan-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Advanced IoT Health Monitoring for Paralysis Patients
            </h1>
            <p className="text-xl text-cyan-100 mb-8">
              Real-time monitoring and alert systems to enhance care quality and patient safety.
              Empowering caregivers and medical professionals with crucial health data.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin/login">
                <Button variant="secondary">
                  Admin Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/patient/login">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Patient Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img 
              src="https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Healthcare professional monitoring patient data" 
              className="rounded-xl shadow-lg max-w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;