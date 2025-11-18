import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact({ fadeIn, stagger }) {
  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'carlwynegallardo@gmail.com', href: 'mailto:carlwynegallardo@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+63 967 218 2163', href: 'tel:+639672182163' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Brgy. 5, Balingasag Mis. Or. Philippines', href: '#' },
  ];

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
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Send Me a Message <span className="text-gray-400 text-sm">(Currently in Development )</span></h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jdoe@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  required
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
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
