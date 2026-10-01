import { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUserTie,
  FaCheckCircle,
  FaCode,
  FaLayerGroup,
  FaBolt,
  FaStar,
  FaSearchPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaImages,
  FaRocket,
  FaTh,
} from 'react-icons/fa';

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

// Same chip palette the homepage Interests marquee uses, so colours feel familiar.
const ACCENTS = [
  { grad: 'from-blue-400 to-cyan-400', glow: 'rgba(56,189,248,0.35)' },
  { grad: 'from-violet-400 to-purple-500', glow: 'rgba(167,139,250,0.35)' },
  { grad: 'from-emerald-400 to-teal-500', glow: 'rgba(52,211,153,0.35)' },
  { grad: 'from-pink-400 to-rose-500', glow: 'rgba(251,113,133,0.35)' },
  { grad: 'from-amber-400 to-orange-500', glow: 'rgba(251,146,60,0.35)' },
  { grad: 'from-indigo-400 to-blue-500', glow: 'rgba(99,102,241,0.35)' },
];

const accent = (i) => ACCENTS[i % ACCENTS.length];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
};

// Matches the homepage section headers: white word + gradient word + underline bar.
function SectionHeading({ plain, accent: accentWord, align = 'center', icon: Icon }) {
  const alignment = align === 'left' ? 'text-left' : 'text-center';
  const barAlign = align === 'left' ? '' : 'mx-auto';

  return (
    <motion.div variants={fadeIn} className={`mb-8 ${alignment}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 flex items-center gap-3 justify-center">
        {Icon && (
          <span className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/30">
            <Icon className="text-cyan-400 text-lg md:text-xl" />
          </span>
        )}
        <span>
          <span className="text-white">{plain} </span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {accentWord}
          </span>
        </span>
      </h2>
      <div className={`w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full ${barAlign}`} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const image = images[index];

  // Keyboard controls + body scroll lock while open.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#03031A]/95 backdrop-blur-md p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:border-red-400/40 transition-all duration-300"
      >
        <FaTimes />
      </button>

      <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 tracking-[0.3em]">
        {index + 1} / {images.length}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 md:left-6 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-3 md:right-6 p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
      >
        <FaChevronRight />
      </button>

      <motion.figure
        key={image.src}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full flex flex-col items-center gap-4"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={2000}
          height={1250}
          sizes="100vw"
          className="w-auto h-auto max-h-[78vh] max-w-full rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 object-contain"
        />
        <figcaption className="text-center text-xs md:text-sm text-gray-400 px-4">
          {image.alt}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

// Wraps an image so it opens the lightbox on click (and on Enter/Space for keyboard users).
function ZoomableImage({ src, onOpen, className = '', children }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Open image in full view"
      onClick={() => onOpen(src)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(src);
        }
      }}
      className={`group/zoom relative cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${className}`}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#03031A]/60 opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300">
        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
          <FaSearchPlus className="text-cyan-400" />
          Zoom
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WorkCaseStudy({ project }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Every image on the page, in display order, de-duplicated by src.
  const lightboxImages = useMemo(
    () =>
      [
        { src: project.detailCover, alt: project.detailCoverAlt },
        ...(project.features || []).map((f) => ({ src: f.image, alt: f.alt })),
        ...(project.gallery || []),
      ].filter((img, i, arr) => img.src && arr.findIndex((o) => o.src === img.src) === i),
    [project]
  );

  const openLightbox = useCallback(
    (src) => setLightboxIndex(lightboxImages.findIndex((img) => img.src === src)),
    [lightboxImages]
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length),
    [lightboxImages.length]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i + 1) % lightboxImages.length),
    [lightboxImages.length]
  );

  return (
    <>
      <Head>
        <title>{`${project.name} | Carl Wyne Gallardo`}</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={project.name} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:image" content={project.detailCover} />
      </Head>

      <div className="min-h-screen bg-[#03031A] text-white font-sans">
        {/* ---------------- Top bar (mirrors the homepage header) ---------------- */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-in-out ${
            scrolled
              ? 'bg-black/20 backdrop-blur-md shadow-lg shadow-black/20'
              : 'bg-transparent backdrop-blur-0 shadow-none'
          }`}
        >
          <nav className="max-w-6xl mx-auto py-3 md:py-4 px-4 md:px-6 flex items-center justify-between gap-4">
            <Link
              href="/#portfolio"
              className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"
            >
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-white/10 transition-all duration-300">
                <FaArrowLeft className="text-xs text-cyan-400" />
              </span>
              <span className="hidden sm:inline">Back to Portfolio</span>
            </Link>

            <Link
              href="/"
              className="text-sm md:text-lg font-bold whitespace-nowrap bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
            >
              CARL WYNE S. GALLARDO
            </Link>
          </nav>
        </motion.header>

        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 md:px-10">
          {/* Ambient glow, same treatment as the About portrait */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            {/* Left — copy */}
            <motion.div variants={fadeIn} className="order-2 lg:order-1 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {project.featured && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-amber-500/30">
                    <FaStar className="text-[11px]" />
                    Featured
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm text-xs text-blue-300 font-medium">
                  <FaCode className="text-cyan-400" />
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm text-xs text-blue-300 font-medium">
                  <FaCalendarAlt className="text-cyan-400" />
                  {project.period}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm text-xs text-blue-300 font-medium">
                  <FaUserTie className="text-cyan-400" />
                  {project.role}
                </span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {project.name}
                  </span>
                </h1>
                <p className="mt-2 text-lg md:text-xl text-gray-300 font-medium">{project.tagline}</p>
                <div className="w-20 h-1 mt-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full" />
              </div>

              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.live && (
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    {project.liveLabel}
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLightboxIndex(0)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-colors duration-300"
                >
                  <FaImages className="text-cyan-400" />
                  View screens
                </motion.button>
              </div>
            </motion.div>

            {/* Right — cover */}
            <motion.div variants={fadeIn} className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-3xl opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
              <ZoomableImage
                src={project.detailCover}
                onOpen={openLightbox}
                className="relative block rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl shadow-blue-500/10"
              >
                <Image
                  src={project.detailCover}
                  alt={project.detailCoverAlt}
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                />
              </ZoomableImage>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute -bottom-3 -left-3 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ---------------- Stats strip ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <div
            className={`grid grid-cols-2 gap-3 ${
              project.stats.length >= 5 ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-4'
            }`}
          >
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${accent(i).grad} mb-2`}
                  style={{ boxShadow: `0 0 14px ${accent(i).glow}` }}
                >
                  <stat.icon className="text-white text-sm" />
                </div>
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------------- Tech stack ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="py-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading plain="Built" accent="With" />
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-3">
            {project.techstack.map((tech, i) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors duration-200 cursor-default select-none"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${accent(i).grad}`}
                  style={{ boxShadow: `0 0 10px ${accent(i).glow}` }}
                />
                <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-200">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---------------- Problem / Role ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-5"
        >
          <motion.div
            variants={fadeIn}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-rose-400/30 transition-colors duration-300 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-3 mb-4">
              <span
                className="p-2.5 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500"
                style={{ boxShadow: '0 0 14px rgba(251,113,133,0.35)' }}
              >
                <FaExclamationTriangle className="text-white text-sm" />
              </span>
              <h3 className="text-lg font-bold text-white">The Problem</h3>
            </div>
            <p className="relative text-sm text-gray-400 leading-relaxed">{project.problem}</p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-colors duration-300 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-3 mb-4">
              <span
                className="p-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400"
                style={{ boxShadow: '0 0 14px rgba(56,189,248,0.35)' }}
              >
                <FaUserTie className="text-white text-sm" />
              </span>
              <h3 className="text-lg font-bold text-white">{project.approachLabel}</h3>
            </div>
            <p className="relative text-sm text-gray-400 leading-relaxed">{project.approach}</p>
          </motion.div>
        </motion.section>

        {/* ---------------- Outcome ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading plain="The" accent="Outcome" icon={FaRocket} />
          <div className="grid md:grid-cols-3 gap-4">
            {project.outcome.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/[0.03] border border-blue-400/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <span
                  className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${accent(i).grad} mb-3`}
                  style={{ boxShadow: `0 0 14px ${accent(i).glow}` }}
                >
                  <FaCheckCircle className="text-white text-sm" />
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------------- Modules (optional) ---------------- */}
        {project.modules && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
          >
            <SectionHeading plain="Every" accent="Module" icon={FaTh} />
            {project.modulesNote && (
              <motion.p variants={fadeIn} className="text-center text-sm text-gray-500 -mt-4 mb-7">
                {project.modulesNote}
              </motion.p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {project.modules.map((mod, i) => (
                <motion.div
                  key={mod.label}
                  variants={fadeIn}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-colors duration-300 text-center"
                >
                  <span
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${accent(i).grad}`}
                    style={{ boxShadow: `0 0 12px ${accent(i).glow}` }}
                  >
                    <mod.icon className="text-white text-sm" />
                  </span>
                  <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-200">
                    {mod.label}
                  </span>
                  {mod.tag && (
                    <span className="text-[10px] text-gray-600 tracking-wider uppercase">{mod.tag}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ---------------- Feature highlights ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading plain="Inside the" accent="Product" icon={FaBolt} />
          <div className="space-y-6">
            {project.features.map((feature, i) => {
              const FeatureIcon = feature.icon || FaBolt;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeIn}
                  className="group grid md:grid-cols-2 gap-6 items-center p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${accent(i).grad}`}
                        style={{ boxShadow: `0 0 14px ${accent(i).glow}` }}
                      >
                        <FeatureIcon className="text-white text-sm" />
                      </span>
                      <span className="text-xs font-bold tracking-[0.3em] text-gray-600">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.text}</p>
                  </div>
                  <ZoomableImage
                    src={feature.image}
                    onOpen={openLightbox}
                    className={`rounded-xl overflow-hidden border border-white/10 ${
                      i % 2 === 1 ? 'md:order-1' : ''
                    }`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      width={1200}
                      height={750}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-auto object-cover"
                    />
                  </ZoomableImage>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ---------------- Contributions ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading
            plain={project.contributionsHeading?.plain || 'What I'}
            accent={project.contributionsHeading?.accent || 'Built'}
            icon={FaCode}
          />
          <div className="grid md:grid-cols-2 gap-4">
            {project.contributions.map((item, i) => {
              const ItemIcon = item.icon || FaCode;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeIn}
                  whileHover={{ y: -4 }}
                  className="group flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300"
                >
                  <span
                    className={`shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${accent(i).grad}`}
                    style={{ boxShadow: `0 0 14px ${accent(i).glow}` }}
                  >
                    <ItemIcon className="text-white text-sm" />
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ---------------- Technical highlights ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading plain="Under the" accent="Hood" icon={FaLayerGroup} />
          <div className="grid md:grid-cols-2 gap-3">
            {project.technicalHighlights.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeIn}
                className="group flex gap-4 items-start p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <span
                  className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg bg-gradient-to-br ${accent(i).grad} text-white`}
                  style={{ boxShadow: `0 0 12px ${accent(i).glow}` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------------- Gallery ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="pb-14 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <SectionHeading plain="Screens &" accent="Gallery" icon={FaImages} />
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img) => (
              <motion.figure
                key={img.src}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className={`group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 ${
                  img.mobile ? 'sm:col-span-2' : ''
                }`}
              >
                <ZoomableImage
                  src={img.src}
                  onOpen={openLightbox}
                  className={img.mobile ? 'flex justify-center bg-black/30 py-6' : ''}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={750}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                      img.mobile ? 'h-auto w-auto max-h-[520px] rounded-xl' : 'w-full h-auto'
                    }`}
                  />
                </ZoomableImage>
                <figcaption className="px-4 py-3 text-[11px] md:text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {img.alt}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.section>

        {/* ---------------- Closing CTA ---------------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="pb-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        >
          <motion.div
            variants={fadeIn}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent backdrop-blur-sm p-8 md:p-10 text-center"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                <span className="text-white">See it </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  in action
                </span>
              </h2>
              <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                {project.name} is live. Have a look, or head back to the rest of my work.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {project.live && (
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    {project.liveLabel}
                  </motion.a>
                )}
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 transition-colors duration-300"
                >
                  <FaArrowLeft className="text-xs text-cyan-400" />
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Zoom viewer */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              images={lightboxImages}
              index={lightboxIndex}
              onClose={closeLightbox}
              onPrev={prevImage}
              onNext={nextImage}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
