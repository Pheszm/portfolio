import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaGamepad, FaCode, FaDesktop, FaTerminal, FaPalette, FaExternalLinkAlt, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ViewWorksModal from './ViewWorksModal';

const categoryConfig = {
    "GAME": {
        icon: FaGamepad,
        color: "from-green-400 to-emerald-500",
        borderColor: "border-green-500/30",
        badgeColor: "bg-green-500/20 text-green-400 border-green-500/50",
    },
    "Web App": {
        icon: FaCode,
        color: "from-blue-400 to-cyan-500",
        borderColor: "border-blue-500/30",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    },
    "Windows App": {
        icon: FaDesktop,
        color: "from-purple-400 to-violet-500",
        borderColor: "border-purple-500/30",
        badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    },
    "Console App": {
        icon: FaTerminal,
        color: "from-yellow-400 to-orange-500",
        borderColor: "border-yellow-500/30",
        badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    },
    "Graphics Designs": {
        icon: FaPalette,
        color: "from-pink-400 to-rose-500",
        borderColor: "border-pink-500/30",
        badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/50",
    },
};

const projectList = [
    {
        id: 1,
        title: "DICT Graphic Designer",
        year: "2026",
        description: "Interned with the Department of Information and Communications Technology (DICT) as a graphic designer. I created visual content for government programs, digital literacy campaigns, and technology-focused initiatives. My designs helped communicate tech education, e-government services, and community outreach programs to the public.",
        category: "Graphics Designs",
        image: "/WorksAssets/DictGraphicDesign_imgs/Dictpicss1.png",
        imagesFolder: "DictGraphicDesign_imgs"
    },
    {
        id: 2,
        title: "SBI Graphic Designer",
        year: "2025",
        description: "SBI runs several businesses, including a Lying-In clinic, Lechon, and an Animal Bite Center and Vaccination Clinic. I work with them on commission as a graphic designer. I create clear posters and graphics for marketing and social media posts. I keep the style consistent for each business so people can recognize the brand. Samples of my work are shown below.",
        category: "Graphics Designs",
        image: "/WorksAssets/SBI_imgs/1.jpg",
        imagesFolder: "SBI_imgs"
    },
    {
        id: 3,
        title: "Roblox Balingasag",
        year: "2025",
        description: "A Roblox game that recreates key places in Balingasag, Misamis Oriental. I built the map and basic interactions using Roblox Studio tools. I am the solo developer and the owner of this game. The documentation link is attached, and the images below show sample scenes from the game.",
        category: "GAME",
        image: "/WorksAssets/RobloxProfile.png",
        livePreview: "https://www.roblox.com/games/120612489905096/Balingasag",
        link: "https://www.canva.com/design/DAGtMOSJ7vc/nr29ThSaFIGaWOdOXlPByQ/view?utm_content=DAGtMOSJ7vc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb7f11bc843",
        // Folder inside public/WorksAssets to auto-load images in the modal
        imagesFolder: "Roblox_bali_imgs"
    },
    {
        id: 4,
        title: "Spinfinity",
        year: "2023",
        description: ".NET C# tool that makes picking random winners easy and fun. Whether for a contest, raffle, or any event.",
        category: "Windows App",
        image: "/WorksAssets/SpinfinityProfile.jpg",
        link: "https://www.canva.com/design/DAFx_fd-Dco/7mCD5q3E1j-ae2k0_nj-Ug/view?utm_content=DAFx_fd-Dco&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h64a2df2efd",
        imagesFolder: "Roblox_bali_imgs"
    },
    {
        id: 5,
        title: "Arcadia",
        year: "2021",
        description: "ARCADIA is an educational Scratch game featuring mini-games Space Math, Hangman, and MoreLess that build math and problem-solving through challenges.",
        category: "GAME",
        image: "/WorksAssets/AcadiaProfile.jpg",
        livePreview: "https://scratch.mit.edu/projects/557441661/",
        link: "https://www.canva.com/design/DAGtO4nXGfQ/6reZLP4ZbdhitSl7mbKmzA/view?utm_content=DAGtO4nXGfQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h38e3a09315",
    },
    {
        id: 6,
        title: "ManageIT",
        year: "2024",
        description: "Designed and developed ManageIT, a web-based AVR inventory and reservation system using vanilla PHP and CSS. Delivered a full-stack workflow with custom API–based QR code scanning to simplify check-ins and asset tracking, enabling students to reserve items efficiently and staff to manage inventory with clarity.",
        category: "Web App",
        image: "/WorksAssets/ManageIT_imgs/1.png",
        link: "https://www.canva.com/design/DAFx_fd-Dco/7mCD5q3E1j-ae2k0_nj-Ug/view?utm_content=DAFx_fd-Dco&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h64a2df2efd",
        imagesFolder: "ManageIT_imgs"    
    },
    {
        id: 7,
        title: "Library Book Lending List",
        year: "2022",
        description: "A simple Python program that helps our High School Library staff manage book lending and records.",
        category: "Console App",
        image: "/WorksAssets/LBLL_imgs/LLLProfile.jpg",
        link: "https://www.canva.com/design/DAFp7eiXGVc/1HhkjF9kP5S-T0FCyZsOGQ/view?utm_content=DAFp7eiXGVc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he34706880e",
        imagesFolder: "LBLL_imgs"
    },
    {
        id: 8,
        title: "SRCB AVR SYSTEM",
        year: "2024",
        description: "A web-based AVR system built with Next.js and Prisma DB, featuring a modern React UI and a robust ORM-backed data layer for reliable, maintainable data operations. I was the full-stack developer on this project.",
        category: "Web App",
        livePreview:"https://srcb-avr-system.vercel.app/",
        image: "/WorksAssets/Lablog_imgs/1.png",
        imagesFolder: "Lablog_imgs"
    },
    {
        id: 9,
        title: "Hotel Reservation System",
        year: "2024",
        description: "A hotel reservation platform built with vanilla PHP. I served as the Frontend Developer and Graphics Designer, crafting the UI and visual assets.",
        category: "Web App",
        image: "/WorksAssets/HRS_imgs/HRS1.png",
        link: "https://www.canva.com/design/DAFp7eiXGVc/1HhkjF9kP5S-T0FCyZsOGQ/view?utm_content=DAFp7eiXGVc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he34706880e",
        livePreview: "https://pheszm.github.io/HotelReservationSystem/",
        imagesFolder: "HRS_imgs"
    },
    {
        id: 10,
        title: "IT Departamental Shirt Design",
        year: "2025",
        description: "I was assigned to design our IT Departmental shirt for Intramurals 2025. I handled the full graphics process—from concept and typography to color palette and print‑ready layout—to deliver a bold, cohesive design that represents the department’s identity.",
        category: "Graphics Designs",
        image: "/WorksAssets/Itdept2025_imgs/1.jpg",
        imagesFolder: "Itdept2025_imgs"
    },
    {
        id: 11,
        title: "SRCB HED Grading Portal",
        year: "2026",
        description: "Commissioned by SRCB as a paid project to develop a comprehensive student grade portal. The system enables students to access their grades anytime, anywhere, view academic performance across all subjects, track progress, and stay updated with real-time grade postings. Built with Next.js and Prisma DB for a modern, responsive experience.",
        category: "Web App",
        livePreview:"https://hedgradeportal.srcbsystems.net/",
        image: "/WorksAssets/SRCB-HED-P_imgs/Mainpiccc.png",
        imagesFolder: "SRCB-HED-P_imgs"
    },
    {
        id: 12,
        title: "DICT X TOD Activity Monitoring App",
        year: "2026",
        description: "Developed during my internship at the Department of Information and Communications Technology (DICT). I built an activity monitoring web app for the TOD (Technical Operations Division), integrating an AI-powered province and district picker to streamline location-based data entry. The application is now live and actively used in the field.",
        category: "Web App",
        livePreview:"https://dict-tod-activity-summary-app.vercel.app/",
        image: "/WorksAssets/DICTtodapp_imgs/dicttod1.png",
        imagesFolder: "DICTtodapp_imgs"
    },
        {
        id: 13,
        title: "SRCB HED Online Assessment",
        year: "2026",
        description: "Our Capstone Project — a full-featured Online Assessment System developed for SRCB's Higher Education Department. The system includes AI-powered essay scoring, eye tracking, facial recognition for identity verification, browser lockdown to prevent cheating, and item randomization to ensure exam integrity. Built to provide a secure, modern, and reliable online examination experience for both students and faculty.",
        category: "Web App",
        livePreview:"https://sas.srcbsystems.com/",
        image: "/WorksAssets/SrcbHoa_imgs/srcbhoapage1.png",
        imagesFolder: "SrcbHoa_imgs"
    },
];

const itemsPerPage = 6;

const categories = [
    { value: '', label: 'All Projects', icon: FaCode },
    { value: 'GAME', label: 'Games', icon: FaGamepad },
    { value: 'Web App', label: 'Web Apps', icon: FaCode },
    { value: 'Windows App', label: 'Windows Apps', icon: FaDesktop },
    { value: 'Console App', label: 'Console Apps', icon: FaTerminal },
    { value: 'Graphics Designs', label: 'Graphics', icon: FaPalette },
];

function Works() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedWork, setSelectedWork] = useState(null);

    const filteredProjects = (selectedCategory
        ? projectList.filter(project => project.category === selectedCategory)
        : [...projectList]
    ).sort((a, b) => parseInt(b.year) - parseInt(a.year));

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const getProjectCount = (category) => {
        if (category === '') return projectList.length;
        return projectList.filter(project => project.category === category).length;
    };

    return (
        <div className='w-full flex flex-col items-center px-2 md:px-4'>
            {/* Category Filter Tabs */}
            <p className="text-sm text-gray-400 mb-6">(This is just a selection of my work—I'm still compiling more.)</p>
            <div className="flex flex-wrap justify-center gap-1.5 mb-8 w-full">
                {categories.map((cat) => {
                    const isActive = selectedCategory === cat.value;
                    const count = getProjectCount(cat.value);
                    const IconComponent = cat.icon;

                    return (
                        <motion.button
                            key={cat.value}
                            onClick={() => handleCategoryChange(cat.value)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${isActive ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white shadow-md shadow-blue-500/30' : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 hover:bg-white/8'}`}
                        >
                            <IconComponent className="text-[11px] shrink-0" />
                            <span>{cat.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-gray-500'}`}>
                                {count}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory + currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
                >
                    {paginatedProjects.map((project, index) => {
                        const config = categoryConfig[project.category];
                        const CategoryIcon = config.icon;

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                onClick={() => setSelectedWork(project)}
                                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-blue-400/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Bottom slide-up label */}
                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out px-4 py-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                        <span className="text-white text-xs font-semibold tracking-widest uppercase">Open Project</span>
                                    </div>

                                    {/* Top-right corner icon */}
                                    <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                        <FaExternalLinkAlt className="text-white text-xs" />
                                    </div>

                                    {/* Year Badge */}
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                        <FaCalendarAlt className="text-white text-xs" />
                                        <span className="text-white text-sm font-bold">{project.year}</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 space-y-3">
                                    <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Category Badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.badgeColor} border text-xs font-medium`}>
                                        <CategoryIcon />
                                        <span>{project.category}</span>
                                    </div>
                                </div>

                                {/* Hover Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 text-gray-400"
                >
                    <FaCode className="text-6xl mx-auto mb-4 opacity-20" />
                    <p className="text-xl">No projects found in this category</p>
                </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center gap-2 mt-8">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-all duration-300 ${currentPage === 1 ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed' : 'bg-white/5 text-white border border-white/10 hover:bg-blue-500/30 hover:border-blue-400/50'}`}
                    >
                        <FaChevronLeft />
                    </motion.button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <motion.button
                            key={i + 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === i + 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'}`}
                        >
                            {i + 1}
                        </motion.button>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-all duration-300 ${currentPage === totalPages ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed' : 'bg-white/5 text-white border border-white/10 hover:bg-blue-500/30 hover:border-blue-400/50'}`}
                    >
                        <FaChevronRight />
                    </motion.button>
                </div>
            )}
            {/* Work Details Modal */}
            <AnimatePresence>
                {selectedWork && (
                    <ViewWorksModal
                        work={selectedWork}
                        onClose={() => setSelectedWork(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default memo(Works);
