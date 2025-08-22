import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChevronLeft, Save, User, Mail, Calendar, FileText, Trash } from 'lucide-react';
import { getPatientProfile, updatePatient, deletePatient } from '../../lib/supabase';

const EditPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    diagnosis: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) {
      navigate('/admin/patients');
      return;
    }
    
    const fetchPatient = async () => {
      try {
        const patient = await getPatientProfile(id);
        
        if (!patient) {
          toast.error('Patient not found');
          navigate('/admin/patients');
          return;
        }
        
        setFormData({
          name: patient.name,
          email: patient.email,
          age: patient.age.toString(),
          diagnosis: patient.diagnosis,
        });
      } catch (error) {
        console.error('Error fetching patient:', error);
        toast.error('Failed to load patient data');
        navigate('/admin/patients');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPatient();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    // Diagnosis validation
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update the patient record
      const patientData = {
        name: formData.name,
        age: Number(formData.age),
        diagnosis: formData.diagnosis,
      };
      
      const updatedPatient = await updatePatient(id, patientData);
      
      if (!updatedPatient) {
        throw new Error('Failed to update patient record');
      }
      
      toast.success('Patient updated successfully');
      navigate('/admin/patients');
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      const success = await deletePatient(id);
      
      if (success) {
        toast.success('Patient deleted successfully');
        navigate('/admin/patients');
      } else {
        toast.error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('An error occurred while deleting patient');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/admin/patients')}
            className="mr-4 p-2 rounded-full hover:bg-neutral-100"
          >
            <ChevronLeft className="h-5 w-5 text-neutral-700" />
          </button>
          <h1 className="text-2xl font-bold">Edit Patient</h1>
        </div>
        
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 flex items-center"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete Patient
        </button>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`input pl-10 ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Enter patient's full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input pl-10 bg-neutral-50"
                  value={formData.email}
                  disabled
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Email cannot be changed as it's used for account login.
              </p>
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className="label">
                Age
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className={`input pl-10 ${errors.age ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Enter patient's age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
            </div>

            {/* Diagnosis Field */}
            <div className="md:col-span-2">
              <label htmlFor="diagnosis" className="label">
                Diagnosis
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-neutral-400" />
                </div>
                <textarea
                  id="diagnosis"
                  name="diagnosis"
                  rows={3}
                  className={`input pl-10 ${errors.diagnosis ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Enter patient's diagnosis or condition"
                  value={formData.diagnosis}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors.diagnosis && <p className="mt-1 text-sm text-red-600">{errors.diagnosis}</p>}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={() => navigate('/admin/patients')}
              className="mr-4 px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-4">
              <Trash className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-900">Confirm Deletion</h3>
              <p className="text-neutral-700 mt-2">
                Are you sure you want to delete this patient? This action cannot be undone and will remove all associated health data.
              </p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPatientPage;