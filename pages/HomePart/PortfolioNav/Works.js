import React, { useState } from 'react';

const projectList = [
    {
        id: 1,
        title: "Roblox Balingasag",
        description: "A replica of Balingasag, Misamis Oriental, developed on the Roblox platform using its built-in tools.",
        category: "GAME",
        badgeClass: "bg-green-900",
        image: "/WorksAssets/RobloxProfile.png",
        link: "https://www.canva.com/design/DAGtMOSJ7vc/nr29ThSaFIGaWOdOXlPByQ/view?utm_content=DAGtMOSJ7vc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb7f11bc843"
    },
    {
        id: 2,
        title: "Library Book Lending List",
        description: "A simple Python program that helps our High School Library staff manage book lending and records.",
        category: "Console App",
        badgeClass: "bg-yellow-900",
        image: "/WorksAssets/LLLProfile.jpg",
        link: "https://www.canva.com/design/DAFp7eiXGVc/1HhkjF9kP5S-T0FCyZsOGQ/view?utm_content=DAFp7eiXGVc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he34706880e"
    },
    {
        id: 3,
        title: "Spinfinity",
        description: ".NET C# tool that makes picking random winners easy and fun. Whether for a contest, raffle, or any event.",
        category: "Windows App",
        badgeClass: "bg-violet-900",
        image: "/WorksAssets/SpinfinityProfile.jpg",
        link: "https://www.canva.com/design/DAFx_fd-Dco/7mCD5q3E1j-ae2k0_nj-Ug/view?utm_content=DAFx_fd-Dco&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h64a2df2efd"
    },
    {
        id: 4,
        title: "Arcadia",
        description: "ARCADIA is an educational Scratch game featuring mini-games Space Math, Hangman, and MoreLess that build math and problem-solving through challenges.",
        category: "GAME",
        badgeClass: "bg-green-900",
        image: "/WorksAssets/AcadiaProfile.jpg",
        link: "https://www.canva.com/design/DAGtO4nXGfQ/6reZLP4ZbdhitSl7mbKmzA/view?utm_content=DAGtO4nXGfQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h38e3a09315"
    }
];

const itemsPerPage = 6;

export default function Works() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProjects = selectedCategory
        ? projectList.filter(project => project.category === selectedCategory)
        : projectList;

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // reset to first page on filter change
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <select
                id="dropdown"
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="block px-4 py-2 text-white bg-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mb-5"
            >
                <option value="">All</option>
                <option value="Graphics Designs">Graphics Designs</option>
                <option value="Web App">Web Application</option>
                <option value="GAME">Game</option>
                <option value="Console App">Console Application</option>
                <option value="Windows App">Windows Application</option>
            </select>

            <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {paginatedProjects.map((project) => (
                    <div
                        key={project.id}
                        tabIndex={0}
                        role="link"
                        onClick={() => window.open(project.link, '_blank')}
                        onKeyDown={(e) => ['Enter', ' '].includes(e.key) && window.open(project.link, '_blank')}
                        className="relative group flex bg-gray-900 rounded-lg p-3 gap-3 cursor-pointer hover:scale-[1.05] focus:scale-[1.05] transition-transform duration-300 focus:ring-1 focus:ring-blue-600"
                    >
                        <img src={project.image} alt={project.title} className="w-30 h-30" />
                        <span className="flex flex-col items-start text-white text-sm">
                            <h2 className="text-lg">{project.title}</h2>
                            <p className='text-gray-400 text-md'>{project.description}</p>
                            <p className={`${project.badgeClass} rounded-full px-4 mt-3 text-gray-300`}>{project.category}</p>
                        </span>
                        <div className="absolute top-1 left-1 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            View Project
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
