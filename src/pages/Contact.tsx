import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import ContactForm from '../components/home/ContactForm';

const Contact: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Contact Us - Neuro Health Life';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-cyan-700 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions about our services or need assistance? 
              Our team is here to help. Reach out to us using the form below.
            </p>
          </div>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;