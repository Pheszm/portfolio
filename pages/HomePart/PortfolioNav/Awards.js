import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTrophy, FaCertificate, FaCalendarAlt, FaEye, FaImages } from 'react-icons/fa';
import ViewAwardsModal from "./ViewAwardsModal";

const awardList = [
    {
        id: 1,
        category: "School Awards",
        title: "2nd Year BSIT Deans List Award",
        shortdescription: "Recognized for outstanding academic performance and high GPA in third year BSIT",
        description: "The 2nd Year BSIT Dean's List Award honors students in the Bachelor of Science in Information Technology program who have achieved exceptional academic performance in their third year, maintaining high grades and a strong GPA. It recognizes their dedication and excellence in their studies.",
        year: "2023",
        image: ["/AwardsAssets/2023Awards/DeansList_Award2023.png", "/AwardsAssets/2023Awards/MyMedals2023.png"],
    },
    {
        id: 2,
        category: "Certificates",
        title: "Smart Technopreneurship 101",
        shortdescription: "Completed TESDA online course on technology entrepreneurship and business innovation",
        description: "I took the Smart Technopreneurship 101 certification course in 2023 through TESDA Online and have just been awarded the certificate",
        year: "2023",
        image: ["/AwardsAssets/TechnoCert.jpg"],
    },
    {
        id: 3,
        category: "Certificates",
        title: "Google I/O Extended 2025 Certificate of Participation",
        shortdescription: "Attended Google I/O Extended event featuring AI, Firebase, and latest Google technologies",
        description: "The **Google I/O Extended 2025 Certificate of Participation** for AI, Firebase, and Google Updates recognizes attendees who engage with the latest advancements in Google technologies, including updates to AI tools, Firebase features, and other Google products. Participants dive into how these innovations can be applied to improve app development, data management, and machine learning, while also staying up-to-date with Google's evolving ecosystem and new features unveiled at the Google I/O event.",
        year: "2025",
        image: ["/AwardsAssets/GoogleIO/GoogleIOCertificate.png", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_1.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_2.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_3.jpg", "/AwardsAssets/GoogleIO/GoogleIO_Documentation_4.jpg"],
    },
    {
        id: 4,
        category: "School Awards",
        title: "2nd Year BSIT Deportment Award",
        shortdescription: "Awarded for excellent behavior, good manners, and positive role model conduct",
        description: "The Deportment Award recognizes students who show excellent behavior and good manners throughout the school year. This award is given to students who respect their teachers and classmates, follow school rules, and act as positive role models. It celebrates those who maintain a professional attitude and demonstrate strong character both inside and outside the classroom.",
        year: "2023",
        image: ["/AwardsAssets/2023Awards/Deportment_Award2023.png", "/AwardsAssets/2023Awards/MyMedals2023.png"],
    },
    {
        id: 5,
        category: "School Awards",
        title: "ITDays Programming Champion 2023",
        shortdescription: "First place winner in IT Days programming competition solving complex coding challenges",
        description: "This award was earned by winning the programming competition during IT Days 2023. The competition tested my coding skills, problem-solving abilities, and knowledge of programming concepts. I competed against other students and successfully solved challenging programming problems to claim the championship title. This achievement shows my dedication to learning and mastering programming.",
        year: "2023",
        image: ["/AwardsAssets/2023Awards/Programing_Champ2023.png", "/AwardsAssets/2023Awards/Programing_Champzz2023.jpg"],
    },
    {
        id: 6,
        category: "School Awards",
        title: "ITDays Programming Champion 2024",
        shortdescription: "Back-to-back programming champion demonstrating consistent excellence in coding",
        description: "I defended my programming championship title during IT Days 2024. This back-to-back victory demonstrates my continuous growth and improvement in programming skills. The competition required me to write efficient code, debug problems quickly, and think creatively to solve complex challenges. Winning this award again proves my consistent performance and passion for programming.",
        year: "2024",
        image: ["/AwardsAssets/2024Awards/Programing_Champ2024.png", "/AwardsAssets/2024Awards/ProgQuizPic1.jpg", "/AwardsAssets/2024Awards/ProgQuizPic2.jpg"],
    },
    {
        id: 7,
        category: "School Awards",
        title: "ITDays Quiz Bee Champion 2024",
        shortdescription: "Champion in IT knowledge quiz covering computer science and technology topics",
        description: "The Quiz Bee Champion award was earned by winning the IT knowledge competition during IT Days 2024. This quiz tested my understanding of various IT topics including computer science, technology trends, programming languages, and information systems. I answered questions faster and more accurately than other competitors, showing my broad knowledge in the field of Information Technology.",
        year: "2024",
        image: ["/AwardsAssets/2024Awards/QuizBee_Champ2024.png", "/AwardsAssets/2024Awards/ProgQuizPic1.jpg", "/AwardsAssets/2024Awards/ProgQuizPic2.jpg"],
    },
    {
        id: 8,
        category: "School Awards",
        title: "ITDays Academic Excellence Recogintion 2023",
        shortdescription: "Recognized for outstanding academic performance in IT studies and high grades",
        description: "The Academic Excellence Recognition Award celebrates students who show outstanding performance in their studies during IT Days. This award honors my strong academic achievements, dedication to learning, and consistent high grades in IT-related subjects. It recognizes my commitment to academic success and my ability to excel in both theoretical knowledge and practical skills throughout the school year.",
        year: "2023",
        image: ["/AwardsAssets/2023Awards/Academic_Excellence_Recognition2024.png", "/AwardsAssets/2023Awards/Programing_Champzz2023.jpg"],
    },
    {
        id: 9,
        category: "School Awards",
        title: "Application Developer Award 2024",
        shortdescription: "Honored for exceptional skills in designing and building functional software applications",
        description: "The Application Developer Award celebrates my skills in building complete software applications from start to finish. This award recognizes my ability to turn ideas into working programs that people can actually use. It honors my knowledge of coding, my talent for creating easy-to-use designs, and my commitment to writing clean and efficient code. This achievement shows my readiness to create real-world technology solutions.",
        year: "2024",
        image: ["/AwardsAssets/2024Awards/ApplicationDev_Award2024.png", "/AwardsAssets/2024Awards/Awarding2024.jpg"],
    },
    {
        id: 10,
        category: "School Awards",
        title: "Service Award 2024",
        shortdescription: "Recognized for active community service and dedication to helping school activities",
        description: "The Service Award recognizes students who actively contribute to the school community through volunteer work and helpful actions. This award honors my dedication to serving others, participating in school activities, and making a positive impact on campus life. It celebrates my willingness to help fellow students, support school events, and give back to the community with a spirit of generosity and teamwork.",
        year: "2024",
        image: ["/AwardsAssets/2024Awards/Service_Award2024.png", "/AwardsAssets/2024Awards/Awarding2024.jpg"],
    },
    {
        id: 11,
        category: "School Awards",
        title: "ITDays Programming Champion 2025",
        shortdescription: "Three-peat champion achieving third consecutive programming competition victory",
        description: "I achieved my third consecutive programming championship during IT Days 2025. This three-peat victory shows my mastery of programming and problem-solving skills. The competition challenged me to write complex code under time pressure and solve difficult programming tasks. This award proves my continued excellence and growth as a programmer, making me a consistent champion in coding competitions.",
        year: "2025",
        image: ["/AwardsAssets/2025Awards/Programing_Champ2025.png", "/AwardsAssets/2025Awards/PictureeeDocu2025.jpg"],
    },
    {
        id: 12,
        category: "School Awards",
        title: "ITDays Speed Typing Award 2025",
        shortdescription: "Awarded for fast and accurate typing skills in IT Days competition",
        description: "The Speed Typing Award recognizes my fast and accurate typing skills during the IT Days 2025 competition. This award shows my ability to type quickly without making mistakes, which is an important skill for any programmer or IT professional. Speed typing helps me write code faster and work more efficiently on computer tasks. This achievement demonstrates my technical proficiency and keyboard mastery.",
        year: "2025",
        image: ["/AwardsAssets/2025Awards/SpeedTyping_Second2025.png", "/AwardsAssets/2025Awards/PictureeeDocu2025.jpg"],
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

function Awards() {
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
        <div className='w-full flex flex-col items-center min-h-screen'>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 w-full max-w-full">
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
            <div className="w-full">
                {categoryOrder.map((category) => {
                    const awards = groupedAwards[category];
                    if (!awards || awards.length === 0) return null;

                    const config = categoryConfig[category];
                    const CategoryIcon = config.icon;

                    return (
                        <div 
                            key={category} 
                            className="w-full mb-12"
                        >
                                {/* Category Header */}
                                <div 
                                    className="flex items-center gap-3 mb-6"
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
                                </div>

                                {/* Awards Grid */}
                                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6'>
                                    {awards.map((award, index) => (
                                        <div
                                            key={award.id}
                                            onClick={() => setSelectedAward(award)}
                                            className={`group relative bg-gray-800
                                                       rounded-2xl overflow-hidden cursor-pointer
                                                       border-2 ${config.borderColor}
                                                       hover:shadow-2xl hover:shadow-blue-500/20 
                                                       transition-all duration-300 hover:-translate-y-2 opacity-100`}
                                            style={{ visibility: 'visible', display: 'block' }}
                                        >
                                            {/* Image Container */}
                                            <div className="relative w-full h-48 overflow-hidden">
                                                <Image
                                                    src={award.image[0]}
                                                    alt={award.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-500 
                                                             group-hover:scale-110"
                                                    loading="lazy"
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>

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

export default memo(Awards);
