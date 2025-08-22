import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { sendContactEmail } from '../../lib/emailService';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await sendContactEmail(formData);
      
      if (success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('There was an error submitting your message. Please try again or contact us directly at lifeneurohealth@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-xl mb-8 text-neutral-600">
              We'd love to hear from you. Reach out with questions, feedback, or to learn more about our IoT health monitoring services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800">Call Us</h3>
              <p className="text-neutral-700 mb-4 leading-relaxed">Available Monday-Friday, 9am-5pm EST</p>
              <p className="text-primary-600 font-medium text-lg">7061852515</p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/30">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800">Email Us</h3>
              <p className="text-neutral-700 mb-4 leading-relaxed">We'll respond within 24 hours</p>
              <p className="text-secondary-600 font-medium text-lg">lifeneurohealth@gmail.com</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Send us a Message</h2>

              {submitted ? (
                <div className="bg-gradient-to-r from-green-50 to-green-25 border border-green-200 text-green-700 p-8 rounded-2xl text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">Thank you for your message!</h3>
                  <p className="text-lg leading-relaxed">
                    We've received your inquiry and will get back to you as soon as possible at{' '}
                    <span className="font-medium">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg px-8 py-3 rounded-full mt-6 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-gradient-to-r from-red-50 to-red-25 border border-red-200 text-red-700 p-4 rounded-2xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label text-neutral-700">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="label text-neutral-700">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="label text-neutral-700">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="IoT Technology Information">IoT Technology Information</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Product Demo Request">Product Demo Request</option>
                      <option value="Healthcare Provider Inquiry">Healthcare Provider Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="label text-neutral-700">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="input bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl resize-none focus:ring-primary-500 focus:border-primary-500"
                      required
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-2xl px-8 py-4 text-lg rounded-full flex items-center justify-center mx-auto transform hover:-translate-y-1 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-neutral-25 to-white py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">How quickly can the IoT monitoring system be set up?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Our IoT system can typically be set up within 1-2 business days after all necessary paperwork and approvals are completed. Our team provides full installation, sensor calibration, and training for both patients and caregivers.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">What sensors are included in the monitoring system?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Our system includes ECG sensors for heart monitoring, temperature sensors (DS18B20), accelerometers for fall detection (ADXL335), flex sensors for gesture recognition, and GSM modules for emergency alerts. All data is transmitted in real-time to our secure dashboard.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">Is the system covered by insurance?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Many insurance providers offer partial or full coverage for our IoT monitoring system. We can help you navigate the insurance process and determine your eligibility based on medical necessity.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">How are patient data and privacy protected?</h3>
              <p className="text-neutral-700 leading-relaxed">
                We take data security very seriously. All sensor data is encrypted during transmission, stored securely in HIPAA-compliant databases, and only accessible to authorized healthcare providers and family members.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">Can the system be customized for individual patients?</h3>
              <p className="text-neutral-700 leading-relaxed">
                Yes, our IoT system is highly customizable. We work with healthcare providers and families to configure sensor thresholds, alert parameters, gesture recognition patterns, and communication preferences to meet each patient's specific needs.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/30">
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">What happens when an emergency is detected?</h3>
              <p className="text-neutral-700 leading-relaxed">
                When our sensors detect an emergency (fall, abnormal vitals, or patient request), the system immediately sends SMS alerts via GSM module, triggers audio alerts through DFPlayer Mini, and notifies caregivers through our real-time dashboard with detailed sensor data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;