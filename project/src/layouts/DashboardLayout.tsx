import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Brain, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  Activity, 
  User, 
  LogOut,
  Bell
} from 'lucide-react';

interface DashboardLayoutProps {
  role: 'admin' | 'patient';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { signOut, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/patients', label: 'Manage Patients', icon: <Users className="h-5 w-5" /> },
  ];

  const patientNavItems = [
    { path: '/patient', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/patient/profile', label: 'My Profile', icon: <User className="h-5 w-5" /> },
    { path: '/patient/health-data', label: 'Health Data', icon: <Activity className="h-5 w-5" /> },
  ];

  const navItems = role === 'admin' ? adminNavItems : patientNavItems;

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-neutral-200">
        <div className="p-4 border-b border-neutral-200">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary-500" />
            <span className="text-lg font-display font-bold text-primary-500">Neuro Health Life</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 w-full px-4 py-3 text-left text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-7 w-7 text-primary-500" />
          <span className="text-lg font-display font-bold text-primary-500">Neuro Health Life</span>
        </Link>
        
        <div className="relative">
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50">
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="h-7 w-7 text-primary-500" />
                <span className="text-lg font-display font-bold text-primary-500">Neuro Health</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-md text-neutral-700 hover:bg-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 border-b border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {user?.email?.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{user?.email}</div>
                  <div className="text-sm text-neutral-500 capitalize">{role}</div>
                </div>
              </div>
            </div>
            
            <nav className="py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 w-full px-4 py-3 text-left text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-neutral-800">
              {role === 'admin' ? 'Admin Dashboard' : 'Patient Dashboard'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full text-neutral-700 hover:bg-neutral-100">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium">
                    {user?.email?.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{user?.email}</div>
                  <div className="text-sm text-neutral-500 capitalize">{role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;