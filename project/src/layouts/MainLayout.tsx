import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, ChevronDown, Brain, LogIn } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isAuthenticated, userRole, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin';
    if (userRole === 'patient') return '/patient';
    return '/login';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed w-full z-30 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-display font-bold text-primary-500">Neuro Health Life</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-primary-500' : 'text-neutral-700 hover:text-primary-500'}`}>
                Home
              </Link>
              <Link to="/about" className={`font-medium ${location.pathname === '/about' ? 'text-primary-500' : 'text-neutral-700 hover:text-primary-500'}`}>
                About
              </Link>
              <Link to="/contact" className={`font-medium ${location.pathname === '/contact' ? 'text-primary-500' : 'text-neutral-700 hover:text-primary-500'}`}>
                Contact
              </Link>
              
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 font-medium text-neutral-700 hover:text-primary-500">
                    <span>Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                    <div className="py-1">
                      <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500">
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn-primary">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="container-custom py-4 space-y-2">
              <Link to="/" className="block py-2 font-medium text-neutral-700 hover:text-primary-500">
                Home
              </Link>
              <Link to="/about" className="block py-2 font-medium text-neutral-700 hover:text-primary-500">
                About
              </Link>
              <Link to="/contact" className="block py-2 font-medium text-neutral-700 hover:text-primary-500">
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardLink()} className="block py-2 font-medium text-neutral-700 hover:text-primary-500">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="block py-2 font-medium text-neutral-700 hover:text-primary-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="block py-2 font-medium text-primary-500 hover:text-primary-600">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer with Darker Colors */}
      <footer className="bg-gradient-to-br from-neutral-800 to-neutral-900 text-white py-12 border-t border-neutral-700">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-display font-bold text-primary-400">Neuro Health Life</span>
              </div>
              <p className="text-neutral-300 mb-4 leading-relaxed">
                Empowering paralysis patients through innovative technology and compassionate care.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-neutral-300">
                <li>
                  <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
              <address className="not-italic text-neutral-300">
                <p className="mt-2">lifeneurohealth@gmail.com</p>
                <p>7061852515</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Neuro Health Life. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;