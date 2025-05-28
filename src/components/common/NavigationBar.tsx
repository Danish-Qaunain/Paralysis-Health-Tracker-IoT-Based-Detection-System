import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavigationBar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Admin Login', path: '/admin/login', hideWhenAuth: true },
    { title: 'Patient Login', path: '/patient/login', hideWhenAuth: true },
    { title: 'Contact', path: '/contact' }
  ];

  const authLinks = user?.role === 'admin' 
    ? [{ title: 'Dashboard', path: '/admin/dashboard' }]
    : [{ title: 'Dashboard', path: '/patient/dashboard' }];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-cyan-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Neuro Health Life</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link, index) => (
                (!isAuthenticated || !link.hideWhenAuth) && (
                  <Link
                    key={index}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              ))}
              
              {isAuthenticated && (
                <>
                  {authLinks.map((link, index) => (
                    <Link
                      key={`auth-${index}`}
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive(link.path)
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {link.title}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              (!isAuthenticated || !link.hideWhenAuth) && (
                <Link
                  key={index}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-cyan-50 text-cyan-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              )
            ))}
            
            {isAuthenticated && (
              <>
                {authLinks.map((link, index) => (
                  <Link
                    key={`auth-mobile-${index}`}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.path)
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;