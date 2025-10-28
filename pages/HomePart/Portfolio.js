import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, lazy, Suspense } from 'react';
import { FaBriefcase, FaTrophy, FaCode } from 'react-icons/fa';

// Lazy load components for better performance
const Works = lazy(() => import('./PortfolioNav/Works'));
const Skills = lazy(() => import('./PortfolioNav/Skills'));
const Awards = lazy(() => import('./PortfolioNav/Awards'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function Portfolio({ fadeIn, stagger }) {
  const [activeTab, setActiveTab] = useState('Works');

  const tabList = [
    { name: 'Works', icon: FaBriefcase, component: Works },
    { name: 'Awards/Certificates', icon: FaTrophy, component: Awards },
    { name: 'Skills', icon: FaCode, component: Skills },
  ];

  const ActiveComponent = tabList.find(tab => tab.name === activeTab)?.component;

  return (
    <motion.section
      id="portfolio"
      initial="hidden"
      whileInView="visible"
      variants={stagger}
      viewport={{ once: false, amount: 0.3 }}
      className="py-16 px-4 sm:px-6 md:px-10 bg-[#010113ff]"
    >
      <motion.h2
        variants={fadeIn}
        className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white pt-7"
      >
        Portfolio
      </motion.h2>

      <motion.div
        variants={fadeIn}
        className="p-4 sm:p-6 rounded-lg shadow-lg bg-[#03031A]"
      >
        {/* Tab Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
          {tabList.map((tab, index) => (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`whitespace-nowrap py-2 px-4 border-b-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === tab.name
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-gray-400 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </nav>

        {/* Tab Content with Lazy Loading */}
        <div className="text-gray-300 mt-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                {ActiveComponent && <ActiveComponent />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  );
}
