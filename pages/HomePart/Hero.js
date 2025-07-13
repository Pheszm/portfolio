import { useState } from 'react';
import TypingWithCursor from '@/components/TypingAnimation';
import { motion } from 'framer-motion';

export default function Hero({ isMounted, fadeIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ['Web Developer', 'Graphic Designer'];

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate={isMounted ? 'visible' : 'hidden'}
      variants={fadeIn}
      className="h-screen bg-[#151515ff] flex items-center justify-center pt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 gap-10">
        
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold text-blue-800">
            <TypingWithCursor phrases={phrases} currentIndex={currentIndex} onTypingComplete={() => setCurrentIndex((i) => (i + 1) % phrases.length)} />
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-blue-900">Full Stack Developer</motion.p>
          <motion.a variants={fadeIn} href="#contact" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition">
            Get In Touch
          </motion.a>
        </div>

        <motion.img
          variants={fadeIn}
          src="/GraduationPicture.png" 
          alt="Graduation Picture"
          className="md:w-1/2 w-64 md:w-96 rounded-lg object-cover"
        />
        
      </div>
    </motion.section>
  );
}
