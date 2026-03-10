import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
    FaTimes, 
    FaChevronLeft, 
    FaChevronRight, 
    FaTrophy, 
    FaCertificate, 
    FaCalendarAlt,
    FaExpand,
    FaCompress
} from 'react-icons/fa';

function ViewAwardsModal({ award, onClose }) {
    if (!award) return null;
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageDirection, setImageDirection] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const categoryConfig = {
        "School Awards": {
            icon: FaTrophy,
            color: "from-yellow-400 to-orange-500",
            badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        },
        "Certificates": {
            icon: FaCertificate,
            color: "from-blue-400 to-cyan-500",
            badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        },
    };

    const config = categoryConfig[award.category] || categoryConfig["Certificates"];
    const CategoryIcon = config.icon;

    const nextImage = () => {
        setImageDirection(1);
        setCurrentImageIndex((prev) =>
            prev === award.image.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setImageDirection(-1);
        setCurrentImageIndex((prev) =>
            prev === 0 ? award.image.length - 1 : prev - 1
        );
    };

    const goToImage = (index) => {
        setImageDirection(index > currentImageIndex ? 1 : -1);
        setCurrentImageIndex(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'f' || e.key === 'F') setIsFullscreen(!isFullscreen);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentImageIndex, isFullscreen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    if (typeof document === 'undefined') return null;
    return ReactDOM.createPortal(
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Background Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative z-10 bg-[#1b1b30] border border-white/15 text-white 
                           rounded-2xl overflow-hidden w-full shadow-2xl shadow-black/60
                           ${isFullscreen ? 'max-w-7xl' : 'max-w-5xl'}`}
            >
                {/* Close & Fullscreen Buttons */}
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
                    onClick={() => setIsFullscreen(!isFullscreen)}
                >
                    {isFullscreen ? 
                        <FaCompress className="text-white text-lg" /> : 
                        <FaExpand className="text-white text-lg" />
                    }
                </motion.button>

                {/* Content */}
                <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                    {/* Title & Info */}
                    <div className="mb-6">
                        <div className="flex items-start gap-3 mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg flex-shrink-0`}>
                                <CategoryIcon className="text-white text-2xl" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    {award.title}
                                </h2>
                                <p className="text-gray-400 text-sm">{award.shortdescription}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.badgeColor} border text-sm font-medium`}>
                                <FaCalendarAlt />
                                <span>{award.year}</span>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.badgeColor} border text-sm font-medium`}>
                                <CategoryIcon />
                                <span>{award.category}</span>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {award.description}
                        </p>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative">
                        <div className={`relative bg-black/30 rounded-xl overflow-hidden ${isFullscreen ? 'h-[70vh]' : 'h-[60vh]'}`}>
                            <AnimatePresence initial={false} custom={imageDirection} mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    custom={imageDirection}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                    }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={award.image[currentImageIndex]}
                                        alt={`${award.title} - Image ${currentImageIndex + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        className="object-contain"
                                        priority={currentImageIndex === 0}
                                        loading={currentImageIndex === 0 ? "eager" : "lazy"}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {award.image.length > 1 && (
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

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                {currentImageIndex + 1} / {award.image.length}
                            </div>
                        </div>

                        {/* Thumbnail Navigation */}
                        {award.image.length > 1 && (
                            <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
                                {award.image.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => goToImage(idx)}
                                        className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentImageIndex ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-white/20 hover:border-white/40'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                        {idx === currentImageIndex && (
                                            <motion.div
                                                layoutId="activeThumbnail"
                                                className="absolute inset-0 bg-blue-500/20"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Dot Indicators (Mobile) */}
                        {award.image.length > 1 && (
                            <div className="flex md:hidden justify-center gap-2 mt-4">
                                {award.image.map((_, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.2 }}
                                        onClick={() => goToImage(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        )}
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
            </motion.div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.7);
                }
            `}</style>
        </motion.div>,
        document.body
    );
}

export default memo(ViewAwardsModal);
