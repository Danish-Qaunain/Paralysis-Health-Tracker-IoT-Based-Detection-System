import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Card from '../common/Card';
import { useAuth } from '../../context/AuthContext';

const PatientLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const success = await login(username, password, 'patient');
      
      if (success) {
        navigate('/patient/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-emerald-100 rounded-full mb-4">
              <UserCircle className="h-12 w-12 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Patient Login</h2>
            <p className="mt-2 text-center text-gray-600">
              Sign in to access your health dashboard
            </p>
          </div>
          
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
            />
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientLogin;