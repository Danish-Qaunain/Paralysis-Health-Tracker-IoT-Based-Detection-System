import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeatureSection from '../components/Home/FeatureSection';
import AboutSection from '../components/Home/AboutSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
    </div>
  );
};

export default Home;