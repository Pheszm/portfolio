import React, { useEffect, useState, memo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaCode,
  FaGamepad,
  FaDesktop,
  FaTerminal,
  FaPalette,
  FaPaperclip,
  FaExternalLinkAlt,
  FaExpand,
  FaCompress,
  FaPlay,
  FaGithub,
  FaBook,
} from 'react-icons/fa';

// Category icon/color mapping (aligned with Works.js)
const categoryConfig = {
  GAME: {
    icon: FaGamepad,
    color: 'from-green-400 to-emerald-500',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/50',
  },
  'Web App': {
    icon: FaCode,
    color: 'from-blue-400 to-cyan-500',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  },
  'Windows App': {
    icon: FaDesktop,
    color: 'from-purple-400 to-violet-500',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  },
  'Console App': {
    icon: FaTerminal,
    color: 'from-yellow-400 to-orange-500',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  },
  'Graphics Designs': {
    icon: FaPalette,
    color: 'from-pink-400 to-rose-500',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  },
};

function ViewWorksModal({ work, onClose }) {
  if (!work) return null;

  const config = categoryConfig[work.category] || categoryConfig['Web App'];
  const CategoryIcon = config.icon;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch images dynamically from a folder inside public/WorksAssets
  useEffect(() => {
    let aborted = false;
    const fetchImages = async () => {
      if (!work.imagesFolder) {
        setImages([]);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/works-images?folder=${encodeURIComponent(work.imagesFolder)}`);
        if (!res.ok) {
          throw new Error('Failed to load images');
        }
        const data = await res.json();
        if (!aborted) {
          setImages(Array.isArray(data.images) ? data.images : []);
          setCurrentImageIndex(0);
        }
      } catch (e) {
        if (!aborted) setError('Unable to load gallery images.');
      } finally {
        if (!aborted) setLoading(false);
      }
    };
    fetchImages();
    return () => {
      aborted = true;
    };
  }, [work.imagesFolder]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'f' || e.key === 'F') setIsFullscreen((v) => !v);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentImageIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    if (!images.length) return;
    setImageDirection(1);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!images.length) return;
    setImageDirection(-1);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index) => {
    if (!images.length) return;
    setImageDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const attachments = Array.isArray(work.attachments)
    ? work.attachments
    : [];
  
  // Add link and livePreview as separate buttons
  if (work.link) {
    attachments.push({ label: 'Documentation', url: work.link, type: 'link' });
  }
  if (work.livePreview) {
    attachments.push({ label: 'Live Preview', url: work.livePreview, type: 'live' });
  }

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative z-10 bg-[#1b1b30] border border-white/15 text-white rounded-2xl overflow-hidden w-full shadow-2xl shadow-black/60 ${
          isFullscreen ? 'max-w-7xl' : 'max-w-5xl'
        }`}
      >
        {/* Close & Fullscreen */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/70 transition-all duration-300 z-20 border border-white/20"
          onClick={onClose}
        >
          <FaTimes className="text-white text-xl" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-16 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-blue-500/40 transition-all duration-300 z-20 border border-white/20"
          onClick={() => setIsFullscreen((v) => !v)}
        >
          {isFullscreen ? <FaCompress className="text-white text-lg" /> : <FaExpand className="text-white text-lg" />}
        </motion.button>

        {/* Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg flex-shrink-0`}>
                <CategoryIcon className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{work.title}</h2>
                {work.shortdescription && (
                  <p className="text-gray-400 text-sm">{work.shortdescription}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {work.year && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.badgeColor} border text-sm font-medium`}>
                  <FaCalendarAlt />
                  <span>{work.year}</span>
                </div>
              )}
              {work.category && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.badgeColor} border text-sm font-medium`}>
                  <CategoryIcon />
                  <span>{work.category}</span>
                </div>
              )}
            </div>

            {work.description && (
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{work.description}</p>
            )}
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <FaPaperclip className="text-blue-400" />
                <h3 className="text-white font-semibold">Attachments / Links</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {attachments.map((att, idx) => {
                  const isLive = att.type === 'live';
                  const ButtonIcon = isLive ? FaPlay : FaBook;
                  
                  return (
                    <motion.a
                      key={idx}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                        isLive
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border border-green-500/50 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border border-blue-500/50 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30'
                      }`}
                    >
                      <ButtonIcon className="text-lg" />
                      <span className="text-sm">{att.label || 'Open'}</span>
                      <FaExternalLinkAlt className="text-xs opacity-70" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Image Carousel (from folder) */}
          <div className="relative">
            <div className={`relative bg-black/30 rounded-xl overflow-hidden ${isFullscreen ? 'h-[70vh]' : 'h-[60vh]'}`}>
              {loading && (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Loading gallery...</div>
              )}

              {!loading && error && (
                <div className="w-full h-full flex items-center justify-center text-red-400 text-sm">{error}</div>
              )}

              {!loading && !error && images.length > 0 && (
                <AnimatePresence initial={false} custom={imageDirection}>
                  <motion.div
                    key={currentImageIndex}
                    custom={imageDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: 'tween', duration: 0.18, ease: 'easeInOut' }, opacity: { duration: 0.12 } }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${work.title} - Image ${currentImageIndex + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                      className="object-contain"
                      quality={50}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 border border-white/20"
                  >
                    <FaChevronLeft className="text-white text-xl" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 border border-white/20"
                  >
                    <FaChevronRight className="text-white text-xl" />
                  </motion.button>
                </>
              )}

              {/* Counter */}
              {images.length > 0 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToImage(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      idx === currentImageIndex ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" quality={60} />
                    {idx === currentImageIndex && <motion.div layoutId="activeThumbnail" className="absolute inset-0 bg-blue-500/20" />}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Dot Indicators (Mobile) */}
            {images.length > 1 && (
              <div className="flex md:hidden justify-center gap-2 mt-4">
                {images.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => goToImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Preload adjacent images for instant navigation */}
            {images.length > 1 && [-1, 1].map(offset => {
              const idx = (currentImageIndex + offset + images.length) % images.length;
              return <img key={`preload-${idx}`} src={images[idx]} alt="" className="hidden" fetchPriority="high" />;
            })}
          </div>

          {/* Keyboard Hints */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-400 text-xs text-center">
              Use <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white mx-1">→</kbd>
              to navigate, <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">ESC</kbd> to close,
              <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white ml-1">F</kbd> for fullscreen
            </p>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.5); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.7); }
        `}</style>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default memo(ViewWorksModal);

