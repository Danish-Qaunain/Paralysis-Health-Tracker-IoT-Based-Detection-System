import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar, FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPatientProfile, Patient } from '../../lib/supabase';

const PatientProfile: React.FC = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const patientData = await getPatientProfile(user.id);
        setPatient(patientData);
      } catch (error) {
        console.error('Error fetching patient profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-neutral-700">Profile information not found.</p>
        <Link to="/patient" className="text-primary-500 hover:text-primary-600 mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/patient"
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-700" />
        </Link>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="card p-6 text-center">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-600 text-3xl font-semibold">
              {patient.name.substring(0, 1)}
            </span>
          </div>
          <h2 className="text-xl font-semibold">{patient.name}</h2>
          <p className="text-neutral-500 mb-6">{patient.email}</p>
          
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-600">Age</span>
              <span className="font-medium">{patient.age} years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Account Created</span>
              <span className="font-medium">{new Date(patient.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Detailed Profile Information */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    className="input pl-10 bg-neutral-50"
                    value={patient.name}
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    className="input pl-10 bg-neutral-50"
                    value={patient.email}
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="label">Age</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="number"
                    className="input pl-10 bg-neutral-50"
                    value={patient.age}
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="label">Diagnosis</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-neutral-400" />
                  </div>
                  <textarea
                    rows={3}
                    className="input pl-10 bg-neutral-50 resize-none"
                    value={patient.diagnosis}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-neutral-600 text-sm">
                To update your profile information, please contact your healthcare provider or administrator.
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <p className="text-neutral-600 mb-4">
                If you need to change your password, please use the password reset function on the login page or contact your administrator.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <p className="text-neutral-600 mb-4">
                Contact your healthcare provider to adjust your notification preferences for alerts and reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;