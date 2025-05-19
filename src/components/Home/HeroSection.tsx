import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, ThermometerSnowflake, AlertTriangle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Healthcare for Paralysis Patients
          </h1>
          <p className="text-xl mb-8">
            A comprehensive IoT-enabled platform that provides real-time monitoring and support for patients with paralysis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-700 hover:bg-blue-50 transition-colors px-6 py-3 rounded-lg font-medium shadow-lg"
            >
              Register Patient
            </Link>
            <Link
              to="/dashboard"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 transition-colors px-6 py-3 rounded-lg font-medium"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;