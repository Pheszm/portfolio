import { FaGithub, FaLinkedin, FaFacebook, FaHeart, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-black/50 border-t border-white/10">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Carl Wyne S. Gallardo
              </span>
            </h3>
            <p className="text-gray-400 text-sm">Web Developer | Designer | IT Professional</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 hover:scale-110 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Carl Wyne S. Gallardo. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
