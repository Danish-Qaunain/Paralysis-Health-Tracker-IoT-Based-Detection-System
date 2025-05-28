import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, UserCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Card from '../common/Card';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!username.trim() || !password.trim()) {
    setError('Please enter both email and password');
    return;
  }

  setLoading(true);
  setError('');

  try {
    // Sign in using Supabase Auth
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: username, // this should be email
      password,
    });

    if (signInError) {
      setError('Invalid email or password');
      return;
    }

    const user = signInData.user;

    // Get role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      setError('User profile not found');
      return;
    }

    if (profile.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setError('Access denied: not an admin');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('An error occurred. Please try again.');
  } finally {
    setLoading(false);
  }
    
    // Simulate password recovery
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRecoverySuccess(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
        setRecoverySuccess(false);
        setRecoveryEmail('');
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {!showForgotPassword ? (
          <Card>
            <div className="flex flex-col items-center mb-6">
              <div className="p-3 bg-cyan-100 rounded-full mb-4">
                <UserCircle className="h-12 w-12 text-cyan-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-2 text-center text-gray-600">
                Sign in to access the admin dashboard
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
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-cyan-600 hover:text-cyan-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              
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
        ) : (
          <Card>
            <div className="flex flex-col items-center mb-6">
              <div className="p-3 bg-cyan-100 rounded-full mb-4">
                <Key className="h-12 w-12 text-cyan-700" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="mt-2 text-center text-gray-600">
                Enter your email to receive password reset instructions
              </p>
            </div>
            
            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError('')}
              />
            )}
            
            {recoverySuccess && (
              <Alert
                type="success"
                message="Password reset instructions have been sent to your email"
              />
            )}
            
            {!recoverySuccess && (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  id="recoveryEmail"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  fullWidth
                />
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                    fullWidth
                  >
                    Back to Login
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    fullWidth
                  >
                    {loading ? 'Sending...' : 'Send Instructions'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;