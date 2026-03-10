import { useState, useEffect, useRef, memo } from 'react';
import TypingWithCursor from '@/components/TypingAnimation';
import { motion } from 'framer-motion';
import Script from 'next/script';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowDown } from 'react-icons/fa';

function Hero({ isMounted, fadeIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ['Web Developer', 'Graphic Designer', 'IT Student', 'Game Developer'];

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Reference: https://www.vantajs.com/?effect=net
  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA && !vantaEffect.current) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x38bd,
        backgroundColor: 0x3031a,
        maxDistance: 21.0,
        spacing: 20.0,
        showDots: true,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('portfolio') || document.querySelector('section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    if (typeof window !== 'undefined') {
      window.open('/api/cv', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Load external scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="beforeInteractive"
      />

      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        ref={vantaRef}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" />

      {/* Main Content Container */}
      <motion.div
        initial="hidden"
        animate={isMounted ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 xl:gap-16">
          
          {/* Left Side - Text Content */}
          <motion.div
            variants={itemVariants}
            className="flex-1 text-center lg:text-left space-y-4 md:space-y-5 max-w-xl order-2 lg:order-1"
          >
            {/* Welcome Badge */}
            <motion.div variants={itemVariants} className="order-1 lg:order-none">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-full text-blue-300 text-xs md:text-sm font-medium backdrop-blur-md shadow-lg">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              <span className="block text-white mb-1 md:mb-2 text-lg md:text-3xl lg:text-4xl">Hi, I'm</span>
              <span className="text-5xl block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Carl Wyne S. Gallardo
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div 
              variants={itemVariants}
              className="text-lg md:text-2xl lg:text-3xl font-semibold"
            >
              <span className="text-blue-400">
                <TypingWithCursor
                  phrases={phrases}
                  currentIndex={currentIndex}
                  onTypingComplete={() => setCurrentIndex((i) => (i + 1) % phrases.length)}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-xs md:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 px-4 lg:px-0"
            >
              Motivated to help push the boundaries of technology and innovation by putting my skills and experience into action.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start pt-2"
            >
              <button 
                onClick={scrollToNext}
                className="group px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm"
              >
                View My Work
                <FaArrowDown className="group-hover:translate-y-1 transition-transform duration-300" size={14} />
              </button>
              <button 
                onClick={handleDownloadCV}
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white/5 backdrop-blur-md text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/10 hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm"
              >
                <FaDownload size={14} />
                Download CV
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 justify-center lg:justify-start pt-1"
            >
              <a
                href="https://github.com/Pheszm"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border-2 border-white/20 text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-110 transition-all duration-300"
              >
                <FaGithub size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/carl-gallardo-138947354/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border-2 border-white/20 text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-110 transition-all duration-300"
              >
                <FaLinkedin size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="mailto:carlwynegallardo@gmail.com"
                className="group w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border-2 border-white/20 text-gray-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-110 transition-all duration-300"
              >
                <FaEnvelope size={16} className="md:w-5 md:h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            variants={imageVariants}
            className="flex-shrink-0 flex items-center justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-all duration-700 animate-pulse" />
              
              {/* Image wrapper with effects */}
              <div className="relative">
                {/* Rotating background shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700 blur-sm" />
                
                {/* Main Image */}
                <div className="relative w-60 h-60 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                  <Image
                    src="/HeroProfileImage2.png"
                    alt="Carl Wyne S. Gallardo"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 384px"
                    className="object-cover rounded-3xl transition-all duration-700"
                    style={{
                      animation: 'float 6s ease-in-out infinite',
                    }}
                  />
                </div>

                {/* Corner accent */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-50 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating particles effect */}
              <div className="absolute top-1/4 -left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
              <div className="absolute bottom-1/3 -right-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(1deg);
          }
          50% {
            transform: translateY(-15px) rotate(-1deg);
          }
          75% {
            transform: translateY(-25px) rotate(0.5deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
    </>
  );
}

export default memo(Hero);
