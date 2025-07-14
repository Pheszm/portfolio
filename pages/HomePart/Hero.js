import { useState, useEffect, useRef } from 'react';
import TypingWithCursor from '@/components/TypingAnimation';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function Hero({ isMounted, fadeIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ['Web Developer', 'Graphic Designer', ' IT Professional', 'Game Developer'];

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Reference: https://www.vantajs.com/?effect=net#(backgroundAlpha:1,backgroundColor:197402,color:14525,gyroControls:!f,maxDistance:21,minHeight:200,minWidth:200,mouseControls:!t,points:10,scale:1,scaleMobile:1,showDots:!f,spacing:16,touchControls:!t)
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

      <motion.section
        id="home"
        initial="hidden"
        animate={isMounted ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="h-screen flex items-center justify-center relative overflow-hidden"
        ref={vantaRef}
      >
        <div className="flex flex-col md:flex-row items-center justify-center h-full w-full px-20 gap-0 relative z-10">
          {/* Text */}
          <div className="order-2 md:order-1 md:w-1/2 text-center md:text-left space-y-3">
            <motion.h1 variants={fadeIn} className="text-2xl pt-5 md:pt-0 md:text-4xl font-semibold">
              <span className="text-white">I'M </span>
              <span className="text-blue-500">CARL WYNE S. GALLARDO</span>
            </motion.h1>

            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-normal text-blue-600">
              <TypingWithCursor
                phrases={phrases}
                currentIndex={currentIndex}
                onTypingComplete={() => setCurrentIndex((i) => (i + 1) % phrases.length)}
              />
            </motion.h2>
          </div>

          <motion.img
            variants={fadeIn}
            src="/GraduationPicture.png"
            alt="Graduation Picture"
            className="order-1 md:order-2 md:w-1/2 w-90 md:w-130 rounded-lg object-cover"
            style={{
              animation: 'float 5s ease-in-out infinite',
            }}
          />
            <style jsx>{`
              @keyframes float {
                0% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
                100% {
                  transform: translateY(0);
                }
              }
            `}
            </style>
          <img/>
        </div>
      </motion.section>
    </>
  );
}
