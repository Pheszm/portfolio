import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { label: 'Home', icon: FaHome, href: 'home' },
  { label: 'About', icon: FaUser, href: 'about' },
  { label: 'Portfolio', icon: FaProjectDiagram, href: 'portfolio' },
  { label: 'Contact', icon: FaEnvelope, href: 'contact' },
];

export default function Header({ activeSection, handleNavClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-black/10 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto py-4 flex items-center transition-all duration-500 ease-in-out overflow-y-auto">
        <span className='hidden md:block'>
          <div
            className={`text-2xl text-blue-700 font-bold transition-opacity duration-500 whitespace-nowrap ${
              scrolled ? 'block' : 'hidden'
            }`}
          >
            CARL WYNE S. GALLARDO
          </div>
        </span>


        <ul
          className={`flex space-x-10 w-full transition-all duration-500 ease-in-out ${
            scrolled ? 'ml-auto justify-end' : 'justify-center'
          }`}
        >
          {navItems.map(({ label, icon: Icon, href }) => (
            <li key={label}>
              <a
                href={`#${href}`}
                onClick={() => handleNavClick(href)}
                className={`group relative text-lg transition-all duration-300 ease-in-out ${
                  activeSection === href
                    ? 'text-blue-500'
                    : 'text-white hover:text-blue-500'
                }`}
              >
                <span
                  className={`inline-flex items-center gap-2 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-blue-500 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${
                    activeSection === href ? 'after:scale-x-100' : ''
                  }`}
                >
                  <Icon size={19} />
                  <span className="text-base">{label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
