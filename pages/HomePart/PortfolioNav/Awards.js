import React, { useState } from 'react';
import ViewAwards from "./ViewAwards";

const awardList = [
    {
        id: 1,
        category: "School Awards",
        title: "3rd Year BSIT Deans List Award",
        shortdescription: "Deanslist",
        description: "I was Awarded as Deanslist",
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

];



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

    // Sort awards by year descending
    const sortedAwards = [...awardList].sort((a, b) => b.year.localeCompare(a.year));

    // Group sorted awards by category
    const groupedAwards = groupByCategory(sortedAwards);


    const categoryOrder = ["School Awards", "Certificates"];
    
return (
    <div className='w-full flex flex-col items-center mt-15'>
        {categoryOrder.map((category) => {
            const awards = groupedAwards[category];
            if (!awards) return null; // skip if category doesn't exist

            return (
                <div key={category} className="w-full mb-10">
                    {/* Category Title */}
                    <span className="text-2xl mb-6 text-left text-white flex items-center whitespace-nowrap">
                        {category}
                        <span className="ml-4 w-20 border-t-1 border-white" />
                    </span>

                    {/* Awards Grid */}
                    <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {awards.map((award) => (
                            <div
                                key={award.id}
                                tabIndex={0}
                                onClick={() => setSelectedAward(award)}
                                className="group flex flex-col relative bg-gray-900 rounded-lg p-3 gap-3 cursor-pointer hover:scale-[1.05] focus:scale-[1.05] transition-transform duration-300 focus:ring-1 focus:ring-blue-600 outline-none"
                            >
                                {/* Overlay with "View" */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 rounded-lg">
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 group-focus:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                                    <span className="text-white text-lg z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                                        View
                                    </span>
                                </div>

                                {/* Image (only the first image is shown) */}
                                <div className="relative w-full h-48 overflow-hidden rounded">
                                    <img
                                        src={award.image[0]} // Use only the first image
                                        alt={`${award.title} Image`}
                                        className="object-cover h-full w-full"
                                    />
                                </div>

                                {/* Award Info */}
                                <span className="flex flex-col items-center text-white text-sm text-center mt-2">
                                    <h2 className="text-lg font-semibold">{award.title}</h2>
                                    <p className="text-md text-gray-400 font-thin">{award.shortdescription}</p>
                                    <p className="px-4 mt-3 text-gray-500 text-sm">{award.year}</p>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        })}

        {selectedAward && (
            <ViewAwards award={selectedAward} onClose={() => setSelectedAward(null)} />
        )}
    </div>
);

}
