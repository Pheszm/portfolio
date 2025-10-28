import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaCertificate, FaCalendarAlt, FaEye, FaImages } from 'react-icons/fa';
import ViewAwardsModal from "./ViewAwardsModal";

const awardList = [
    {
        id: 1,
        category: "School Awards",
        title: "3rd Year BSIT Deans List Award",
        shortdescription: "Deanslist",
        description: "The 3rd Year BSIT Dean's List Award honors students in the Bachelor of Science in Information Technology program who have achieved exceptional academic performance in their third year, maintaining high grades and a strong GPA. It recognizes their dedication and excellence in their studies.",
        year: "2022",
        image: ["/AwardsAssets/TechnoCert.jpg", "MyMedals.png"],
    },
    {
        id: 2,
        category: "Certificates",
        title: "Smart Technopreneurship 101",
        shortdescription: "TESDA Online Certification Award",
        description: "I took the Smart Technopreneurship 101 certification course in 2023 through TESDA Online and have just been awarded the certificate",
        year: "2023",
        image: ["/AwardsAssets/TechnoCert.jpg"],
    },
    {
        id: 3,
        category: "Certificates",
        title: "Google I/O Extended 2025 Certificate of Participation",
        shortdescription: "Google I/O Extended 2025",
        description: "The **Google I/O Extended 2025 Certificate of Participation** for AI, Firebase, and Google Updates recognizes attendees who engage with the latest advancements in Google technologies, including updates to AI tools, Firebase features, and other Google products. Participants dive into how these innovations can be applied to improve app development, data management, and machine learning, while also staying up-to-date with Google's evolving ecosystem and new features unveiled at the Google I/O event.",
        year: "2025",
        image: ["/AwardsAssets/GoogleIO/GoogleIOCertificate.png", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_1.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_2.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_3.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_4.jpg"],
    },
];

const categoryConfig = {
    "School Awards": {
        icon: FaTrophy,
        color: "from-yellow-400 to-orange-500",
        borderColor: "border-yellow-500/30",
        badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    },
    "Certificates": {
        icon: FaCertificate,
        color: "from-blue-400 to-cyan-500",
        borderColor: "border-blue-500/30",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    },
};

// Group awards by category
function groupByCategory(awards) {
    return awards.reduce((groups, award) => {
        if (!groups[award.category]) {
            groups[award.category] = [];
        }
        groups[award.category].push(award);
        return groups;
    }, {});
}

export default function Awards() {
    const [selectedAward, setSelectedAward] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sort awards by year descending
    const sortedAwards = [...awardList].sort((a, b) => b.year.localeCompare(a.year));

    // Filter and group awards
    const filteredAwards = selectedCategory === 'all' 
        ? sortedAwards 
        : sortedAwards.filter(award => award.category === selectedCategory);

    const groupedAwards = groupByCategory(filteredAwards);
    const categoryOrder = ["School Awards", "Certificates"];

    const categories = [
        { value: 'all', label: 'All Awards', icon: FaTrophy },
        { value: 'School Awards', label: 'School Awards', icon: FaTrophy },
        { value: 'Certificates', label: 'Certificates', icon: FaCertificate },
    ];

    const getAwardCount = (category) => {
        if (category === 'all') return awardList.length;
        return awardList.filter(award => award.category === category).length;
    };

    return (
        <div className='w-full flex flex-col items-center px-2 md:px-4'>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 w-full">
                {categories.map((cat) => {
                    const isActive = selectedCategory === cat.value;
                    const count = getAwardCount(cat.value);
                    const IconComponent = cat.icon;

                    return (
                        <motion.button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base
                                       transition-all duration-300 backdrop-blur-sm
                                       ${isActive 
                                         ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' 
                                         : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                                       }`}
                        >
                            <span className="flex items-center gap-2">
                                <IconComponent className="text-lg" />
                                <span>{cat.label}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-700'}`}>
                                    {count}
                                </span>
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeAwardTab"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Awards by Category */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {categoryOrder.map((category) => {
                        const awards = groupedAwards[category];
                        if (!awards || awards.length === 0) return null;

                        const config = categoryConfig[category];
                        const CategoryIcon = config.icon;

                        return (
                            <motion.div 
                                key={category} 
                                className="w-full mb-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Category Header */}
                                <motion.div 
                                    className="flex items-center gap-3 mb-6"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}>
                                        <CategoryIcon className="text-white text-xl" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        {category}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.badgeColor} border`}>
                                        {awards.length} {awards.length === 1 ? 'Award' : 'Awards'}
                                    </span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent ml-4" />
                                </motion.div>

                                {/* Awards Grid */}
                                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                                    {awards.map((award, index) => (
                                        <motion.div
                                            key={award.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            onClick={() => setSelectedAward(award)}
                                            className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 
                                                       rounded-2xl overflow-hidden cursor-pointer
                                                       border ${config.borderColor}
                                                       hover:shadow-2xl hover:shadow-blue-500/20 
                                                       transition-all duration-300`}
                                        >
                                            {/* Image Container */}
                                            <div className="relative w-full h-56 overflow-hidden">
                                                <img
                                                    src={award.image[0]}
                                                    alt={award.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 
                                                             group-hover:scale-110"
                                                />
                                                
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent 
                                                               opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                                
                                                {/* View Button Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center 
                                                               opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-full 
                                                                   flex items-center gap-2 transform scale-90 group-hover:scale-100 
                                                                   transition-transform duration-300">
                                                        <FaEye className="text-white text-lg" />
                                                        <span className="text-white font-semibold">View Details</span>
                                                    </div>
                                                </div>

                                                {/* Image Count Badge */}
                                                {award.image.length > 1 && (
                                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm 
                                                                   px-3 py-1.5 rounded-full flex items-center gap-2">
                                                        <FaImages className="text-blue-400 text-sm" />
                                                        <span className="text-white text-xs font-medium">
                                                            {award.image.length}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Year Badge */}
                                                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                                                               px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                                    <FaCalendarAlt className="text-white text-xs" />
                                                    <span className="text-white text-sm font-bold">{award.year}</span>
                                                </div>
                                            </div>

                                            {/* Award Info */}
                                            <div className="p-5 space-y-3">
                                                <h3 className="text-white font-bold text-lg line-clamp-2 
                                                              group-hover:text-blue-400 transition-colors duration-300">
                                                    {award.title}
                                                </h3>
                                                
                                                <p className="text-gray-400 text-sm line-clamp-2">
                                                    {award.shortdescription}
                                                </p>

                                                {/* Category Badge */}
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg 
                                                               ${config.badgeColor} border text-xs font-medium`}>
                                                    <CategoryIcon />
                                                    <span>{award.category}</span>
                                                </div>
                                            </div>

                                            {/* Hover Shine Effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                                           transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                                                               via-white/5 to-transparent -translate-x-full 
                                                               group-hover:translate-x-full transition-transform duration-1000" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredAwards.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 text-gray-400"
                >
                    <FaTrophy className="text-6xl mx-auto mb-4 opacity-20" />
                    <p className="text-xl">No awards found in this category</p>
                </motion.div>
            )}

            {/* Award Modal */}
            {selectedAward && (
                <ViewAwardsModal award={selectedAward} onClose={() => setSelectedAward(null)} />
            )}
        </div>
    );
}
