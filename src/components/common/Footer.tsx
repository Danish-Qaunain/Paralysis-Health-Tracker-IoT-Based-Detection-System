import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Activity className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-xl font-bold">Neuro Health Life</span>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced IoT health monitoring for paralysis patients, providing real-time care and support.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link to="/patient/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Patient Login
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-cyan-400" />
                <a href="mailto:info@neurohealthlife.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                  info@neurohealthlife.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-cyan-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-cyan-400" />
                <span className="text-gray-300">
                  123 Medical Center Drive,<br />
                  Healthcare City, HC 10001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Neuro Health Life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;