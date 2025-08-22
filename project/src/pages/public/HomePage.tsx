import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Clock, ShieldCheck, HeartPulse, ActivitySquare, MonitorSmartphone, ArrowRight, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50 text-neutral-800 py-20 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg)',
          }}
        ></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-secondary-100 opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-100 opacity-25 rounded-full blur-xl"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary-200 opacity-15 rounded-full blur-xl"></div>
        </div>
        
        <div className="container-custom relative z-10 flex items-center min-h-[80vh]">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 mb-8">
              <Sparkles className="h-4 w-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-primary-700">Revolutionary IoT Healthcare Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Transforming Healthcare for Paralysis Patients
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-neutral-600 leading-relaxed max-w-4xl mx-auto">
              Innovative monitoring technology that bridges the gap between patients and healthcare providers through real-time IoT sensors and intelligent alerts.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <Link to="/about" className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-neutral-50 border-2 border-primary-200 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Contact Us
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-neutral-600">Real-time Monitoring</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-secondary-600 mb-2">5+</div>
                <div className="text-neutral-600">IoT Sensors</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="text-3xl font-bold text-accent-600 mb-2">Instant</div>
                <div className="text-neutral-600">Emergency Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare for Good Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-white via-primary-25 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary-300 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-300 rounded-full blur-md"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Tagline */}
            <div className="mb-16">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-600 bg-clip-text text-transparent">
                  Healthcare for Good
                </span>
              </h2>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-700 space-y-2">
                <div className="opacity-90">Today.</div>
                <div className="opacity-95">Tomorrow.</div>
                <div className="text-primary-600">Always.</div>
              </div>
            </div>
            
            {/* Supporting Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-white/30">
              <p className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed">
                At Neuro Health Life, we believe healthcare should be accessible, responsive, and compassionate. Our IoT technology creates a bridge between patients and caregivers, ensuring no one faces their challenges alone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">Today</h3>
                  <p className="text-neutral-600">Immediate impact with real-time monitoring and instant alerts</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-secondary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">Tomorrow</h3>
                  <p className="text-neutral-600">Continuous innovation in healthcare technology and patient care</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">Always</h3>
                  <p className="text-neutral-600">Unwavering commitment to patient dignity and quality of life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              We are dedicated to improving the quality of life for paralysis patients through innovative IoT technology and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-primary-25 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-primary-100">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800">Rapid Response</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our real-time IoT monitoring system ensures immediate response to patient needs, reducing waiting times and improving care through automated alerts.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-secondary-25 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-secondary-100">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-10 w-10 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800">Enhanced Safety</h3>
              <p className="text-neutral-600 leading-relaxed">
                Advanced fall detection and vital signs monitoring provide an extra layer of safety for patients, giving peace of mind to caregivers.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-accent-25 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-accent-100">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-10 w-10 text-accent-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800">Empowering Care</h3>
              <p className="text-neutral-600 leading-relaxed">
                Our technology empowers patients to communicate their needs effectively through gesture recognition, enhancing their independence and dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-neutral-25 to-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Our IoT Technology</h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Advanced sensor monitoring solutions designed specifically for paralysis patients and their unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">ECG Monitoring</h3>
              <p className="text-neutral-600 leading-relaxed">
                Continuous heart rate monitoring with real-time alerts for abnormal patterns using AD8232 sensor.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ActivitySquare className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">Fall Detection</h3>
              <p className="text-neutral-600 leading-relaxed">
                Advanced ADXL335 accelerometer technology to detect falls and send immediate SMS alerts via GSM.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MonitorSmartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">Gesture Recognition</h3>
              <p className="text-neutral-600 leading-relaxed">
                Three flex sensors to translate patient movements into specific requests with audio feedback.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800">Temperature Monitoring</h3>
              <p className="text-neutral-600 leading-relaxed">
                DS18B20 sensor for continuous body temperature monitoring with fever detection alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-white via-primary-25 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100 to-secondary-100"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Ready to Transform Patient Care?</h2>
            <p className="text-xl mb-12 text-neutral-600 leading-relaxed">
              Contact us today to learn how Neuro Health Life's IoT monitoring system can enhance the quality of life for paralysis patients through real-time health tracking and intelligent alerts.
            </p>
            <Link to="/contact" className="btn bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-2xl px-12 py-6 text-xl rounded-full transform hover:-translate-y-1 transition-all duration-300">
              Get in Touch
              <ArrowRight className="h-6 w-6 ml-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;