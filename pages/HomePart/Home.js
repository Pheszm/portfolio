import { useEffect, useState, useCallback } from 'react';

import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';





export default function Home() {

  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavClick = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth'});
    }
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; 

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">

      <Header activeSection={activeSection} handleNavClick={handleNavClick} />

      <section id="home">
        <Hero isMounted={isMounted} fadeIn={fadeIn} />
      </section>

      <section id="about">
        <About fadeIn={fadeIn} stagger={stagger} />
      </section>

      <section id="projects">
        <Projects fadeIn={fadeIn} stagger={stagger} />
      </section>

      <section id="contact">
        <Contact fadeIn={fadeIn} stagger={stagger} />
      </section>

      <Footer />
    </div>
  );
}
