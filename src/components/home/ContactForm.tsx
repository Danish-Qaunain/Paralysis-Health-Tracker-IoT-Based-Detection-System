import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    // Simulate form submission
    setFormStatus({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };
  
  return (
    <div className="py-16 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? Get in touch with our team and we'll be happy to assist you.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {formStatus && (
            <Alert
              type={formStatus.success ? 'success' : 'error'}
              message={formStatus.message}
              autoClose={true}
            />
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              fullWidth
            />
            
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              fullWidth
            />
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                className={`px-3 py-2 bg-white border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 w-full`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;