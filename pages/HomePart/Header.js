import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { label: 'Home', icon: FaHome, href: 'home' },
  { label: 'About', icon: FaUser, href: 'about' },
  { label: 'Portfolio', icon: FaProjectDiagram, href: 'portfolio' },
  { label: 'Contact', icon: FaEnvelope, href: 'contact' },
];

function Header({ activeSection, handleNavClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
        <nav className="max-w-6xl mx-auto py-3 md:py-4 px-4 md:px-6 flex items-center transition-all duration-500 ease-in-out overflow-x-auto">
          <span className='hidden md:block'>
            <div
              className={`text-2xl font-bold transition-opacity duration-500 whitespace-nowrap bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient ${
                scrolled ? 'block' : 'hidden'
              }`}
            >
              CARL WYNE S. GALLARDO
            </div>
          </span>


          <ul
            className={`flex space-x-4 md:space-x-10 w-full transition-all duration-500 ease-in-out justify-center ${
              scrolled ? 'md:ml-auto md:justify-end' : ''
            }`}
          >
            {navItems.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={`#${href}`}
                  onClick={() => handleNavClick(href)}
                  className="group relative text-sm md:text-lg transition-all duration-300 ease-in-out"
                >
                  <span
                    className={`inline-flex flex-col md:flex-row items-center gap-1 md:gap-2 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-gradient-to-r after:from-blue-400 after:via-cyan-400 after:to-blue-500 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${
                      activeSection === href ? 'after:scale-x-100' : ''
                    }`}
                  >
                    <Icon 
                      size={18}
                      className={`md:w-[19px] md:h-[19px] transition-all duration-300 ${
                        activeSection === href
                          ? 'text-cyan-400'
                          : 'text-white group-hover:text-cyan-400'
                      }`}
                    />
                    <span 
                      className={`text-xs md:text-base transition-all duration-300 whitespace-nowrap ${
                        activeSection === href
                          ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient'
                          : 'text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent'
                      }`}
                      style={activeSection === href ? { backgroundSize: '200% 200%' } : {}}
                    >
                      {label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Gradient animation CSS */}
      <style jsx>{`
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
    </>
  );
}

export default memo(Header);
