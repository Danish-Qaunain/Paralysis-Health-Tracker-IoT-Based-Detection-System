import React from 'react';
import NavigationBar from '../components/common/NavigationBar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Mission from '../components/home/Mission';
import Vision from '../components/home/Vision';
import About from '../components/home/About';
import ContactForm from '../components/home/ContactForm';

const Home: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Neuro Health Life - Paralysis Patient Health Care';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Vision />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;