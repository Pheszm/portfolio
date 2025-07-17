import React, { useState } from 'react';

export default function ViewAwards({ award, onClose }) {
    if (!award) return null;
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === award.image.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? award.image.length - 1 : prev - 1
        );
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 bg-gray-900 text-white rounded-lg p-6 max-w-md md:max-w-5xl w-full mx-4 shadow-lg">
                {/* Close Button */}
                <button
                    className="absolute top-1 right-3 text-white hover:text-red-500 text-4xl"
                    onClick={onClose}>
                    &times;
                </button>


                {/* Title & Info */}
                <div className="flex flex-row items-center gap-2">
                    <h2 className="text-xl font-bold ">{award.title}</h2>
                    <p className="text-sm text-gray-400">({award.year})</p>
                </div>
                <p className="mb-2 text-gray-300 text-sm">{award.shortdescription}</p>
                <p className="mb-2 text-gray-400 text-sm">{award.description}</p>




                <div className="relative w-full flex flex-col items-center">
                    <img
                        src={award.image[currentImageIndex]}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="rounded-lg max-h-[80vh] w-auto object-contain"
                    />

                    {award.image.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="h-30 absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded hover:bg-black/70"
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={nextImage}
                                className="h-30 absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded hover:bg-black/70"
                            >
                                &#8594;
                            </button>
                        </>
                    )}

                    <div className="flex justify-center mt-4 gap-2">
                        {award.image.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${
                                    idx === currentImageIndex ? 'bg-white' : 'bg-gray-600'
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
