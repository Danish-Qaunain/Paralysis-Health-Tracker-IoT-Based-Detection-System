import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-xl font-bold">Paralysis Patient Healthcare</span>
          </div>
          
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link 
                to="/" 
                className={`hover:text-blue-200 transition-colors ${isActive('/') ? 'font-bold border-b-2 border-white' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className={`hover:text-blue-200 transition-colors ${isActive('/register') ? 'font-bold border-b-2 border-white' : ''}`}
              >
                Register Patient
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard" 
                className={`hover:text-blue-200 transition-colors ${isActive('/dashboard') ? 'font-bold border-b-2 border-white' : ''}`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
          
          <div className="md:hidden">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Home</Link>
          <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Register Patient</Link>
          <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;