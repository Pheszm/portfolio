import { motion } from 'framer-motion';

export default function Contact({ fadeIn, stagger }) {
  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      variants={stagger}
      viewport={{ once: false, amount: 0.3 }}
      className="py-20 px-6 max-w-5xl mx-auto"
    >
      <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-8 text-center">
        Contact
      </motion.h2>
      <motion.form
        variants={fadeIn}
        className="space-y-6 max-w-lg mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button type="submit" className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Send Message
        </button>
      </motion.form>
    </motion.section>
  );
}
