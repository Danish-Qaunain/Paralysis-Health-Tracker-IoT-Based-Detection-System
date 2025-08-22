import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Lightbulb, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const teamMembers = [
    {
      id: 1,
      name: "Prof. SAUNAK BHATTACHARYA",
      title: "HEAD OF THE DEPARTMENT DEPT. OF ELECTRONICS & COMMUNICATION ENGINEERING",
      image: "https://s3.ap-south-1.amazonaws.com/neurohealthlife.site/HOD.jpg"
    },
    {
      id: 2,
      name: "DR. ABHIJIT KUNDU",
      title: "ASSOCIATE PROFESSOR DEPT. OF ELECTRONICS & COMMUNICATION ENGINEERING",
      image: "https://s3.ap-south-1.amazonaws.com/neurohealthlife.site/mentor.jpg"
    },
    {
      id: 3,
      name: "MD DANISH QAUNAIN",
      title: "TEAM LEAD, TECHNICAL LEAD ",
      image: "https://s3.ap-south-1.amazonaws.com/neurohealthlife.site/Danish.jpg",
    },
    { 
      id: 4,
      name: "HRIDHI KUMARI",
      title: "TEAM MEMBER",
      image: "https://s3.ap-south-1.amazonaws.com/neurohealthlife.site/Hridhi.jpg"
    }
  ];

  const membersPerSlide = 3;
  const totalSlides = Math.ceil(teamMembers.length / membersPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideMembers = () => {
    const startIndex = currentSlide * membersPerSlide;
    return teamMembers.slice(startIndex, startIndex + membersPerSlide);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-neutral-50 to-primary-50 text-neutral-800 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-secondary-100 opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-100 opacity-25 rounded-full blur-xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">About Neuro Health Life</h1>
            <p className="text-xl mb-8 text-neutral-600">
              Learn about our mission, our team, and our commitment to revolutionizing care for paralysis patients.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Our Story</h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Neuro Health Life was founded by a team of healthcare professionals and engineers who recognized a critical gap in care for paralysis patients. Through personal experiences with family members and patients, we witnessed the challenges faced by those with limited mobility and their caregivers.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                We set out to create a technology platform that would bridge this gap, providing a voice for patients who struggle to communicate their needs and a reliable monitoring system for caregivers who can't always be present.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Today, we're proud to offer a comprehensive solution that enhances patient dignity, improves response times, and provides peace of mind to families and healthcare providers.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-100">
              <img 
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg" 
                alt="Medical professionals in a meeting" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gradient-to-br from-neutral-25 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Our Core Values</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              These principles guide everything we do at Neuro Health Life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-800">Patient-Centered Approach</h3>
              <p className="text-neutral-700 leading-relaxed">
                We design every aspect of our technology with the patient's needs, dignity, and comfort as our primary consideration. Our solutions aim to enhance quality of life while respecting individual preferences and privacy.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-800">Excellence in Innovation</h3>
              <p className="text-neutral-700 leading-relaxed">
                We continuously push the boundaries of what's possible, combining medical expertise with cutting-edge technology to create solutions that are both highly effective and user-friendly.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-800">Empowerment Through Technology</h3>
              <p className="text-neutral-700 leading-relaxed">
                We believe technology should empower patients and caregivers, not complicate their lives. Our systems are designed to be intuitive, reliable, and genuinely helpful in everyday scenarios.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-800">Responsive Care</h3>
              <p className="text-neutral-700 leading-relaxed">
                We understand that timely response is crucial in healthcare. Our monitoring systems and alerts are designed to ensure that patient needs are addressed promptly, improving outcomes and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Slider */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-white via-primary-25 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary-300 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-300 rounded-full blur-md"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">Our Team</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Meet the dedicated professionals working to revolutionize paralysis patient care.
            </p>
          </div>

          {/* Team Slider */}
          <div className="relative">
            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:shadow-xl transition-all duration-300 border border-white/30"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-6 w-6 text-neutral-600" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:shadow-xl transition-all duration-300 border border-white/30"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight className="h-6 w-6 text-neutral-600" />
                </button>
              </>
            )}

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
              {getCurrentSlideMembers().map((member) => (
                <div 
                  key={member.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-white/30"
                >
                  {/* Image Section */}
                  <div className="relative aspect-w-4 aspect-h-3">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-neutral-800">{member.name}</h3>
                    <p className="text-primary-600 font-medium">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary-500 scale-125 shadow-lg' 
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-white via-primary-25 to-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-100 to-secondary-100"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-white/30 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-700 leading-relaxed">
              Whether you're a healthcare provider, a patient, or a family member, we invite you to learn more about how our technology can help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-2xl px-8 py-4 text-lg rounded-full transform hover:-translate-y-1 transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;