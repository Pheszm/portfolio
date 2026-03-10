import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function Contact({ fadeIn, stagger }) {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'carlwynegallardo@gmail.com', href: 'mailto:carlwynegallardo@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+63 967 218 2163', href: 'tel:+639672182163' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Brgy. 5, Balingasag Mis. Or. Philippines', href: '#' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 5000);
    }
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      variants={stagger}
      viewport={{ once: false, amount: 0.2 }}
      className="min-h-screen py-12 md:py-16 px-6 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* Section Header */}
      <motion.div variants={fadeIn} className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          <span className="text-white">Get In </span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mx-auto rounded-full mb-4" />
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities and collaborations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side - Contact Info */}
        <motion.div variants={fadeIn} className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                variants={fadeIn}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-xl text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm md:text-base text-white font-medium">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Decorative Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl" />
            <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-gray-300 text-sm md:text-base italic leading-relaxed">
                "Let's create something amazing together. Your ideas combined with my skills can make great things happen!"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div variants={fadeIn}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            
            {/* Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {submitStatus === 'success' ? (
                  <FaCheckCircle className="text-xl flex-shrink-0" />
                ) : (
                  <FaExclamationCircle className="text-xl flex-shrink-0" />
                )}
                <p className="text-sm">{statusMessage}</p>
              </motion.div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jdoe@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <FaPaperPlane className="text-sm" />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(Contact);
