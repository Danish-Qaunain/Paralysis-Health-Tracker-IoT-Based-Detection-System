import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-lg font-semibold">Paralysis Patient Healthcare System</span>
          </div>
          
          <div className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Paralysis Patient Healthcare. All rights reserved.
          </div>
        </div>
        
        <div className="mt-4 text-center text-gray-400 text-xs">
          <p>This system uses IoT technology to monitor and improve care for paralysis patients.</p>
          <p className="mt-2">For emergencies, please contact your healthcare provider directly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;