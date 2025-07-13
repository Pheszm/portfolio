import { motion } from 'framer-motion';

export default function About({ fadeIn, stagger }) {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      variants={stagger}
      viewport={{ once: false, amount: 0.3 }}
      className="py-20 px-6 max-w-5xl mx-auto"
    >
      <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-8 text-center">
        About Me
      </motion.h2>
      <motion.p variants={fadeIn} className="text-lg text-gray-300 leading-relaxed">
        I'm a passionate developer with 5+ years of experience building web applications. Skilled in React, Next.js, and Node.js, I love creating intuitive and dynamic user experiences.
      </motion.p>
    </motion.section>
  );
}
