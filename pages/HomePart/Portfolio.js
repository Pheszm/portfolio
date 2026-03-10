import { motion } from 'framer-motion';
import React, { useState, lazy, Suspense, memo } from 'react';
import { FaBriefcase, FaTrophy, FaCode } from 'react-icons/fa';

// Lazy load components for better performance
const Works = lazy(() => import('./PortfolioNav/Works'));
const Skills = lazy(() => import('./PortfolioNav/Skills'));
const Awards = lazy(() => import('./PortfolioNav/Awards'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 bg-blue-400/30 rounded-full animate-pulse" />
      </div>
    </div>
    <p className="text-sm text-gray-400 tracking-wide animate-pulse">Loading...</p>
  </div>
);

function Portfolio({ fadeIn, stagger }) {
  const [activeTab, setActiveTab] = useState('Works/Projects');

  const tabList = [
    { name: 'Works/Projects', icon: FaBriefcase, component: Works },
    { name: 'Awards/Certificates', icon: FaTrophy, component: Awards },
    { name: 'Skills/Technologies', icon: FaCode, component: Skills },
  ];

  const ActiveComponent = tabList.find(tab => tab.name === activeTab)?.component;

  return (
    <section
      id="portfolio"
      className="py-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <motion.div variants={fadeIn} className="text-center mb-10 pt-7">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          <span className="text-white">My </span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Portfolio
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mx-auto rounded-full" />
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl overflow-hidden"
      >
        {/* Tab Navigation */}
        <nav className="flex flex-wrap justify-center gap-1 sm:gap-2 p-3 border-b border-white/10 bg-white/5">
          {tabList.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <motion.button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex items-center gap-2 whitespace-nowrap py-2 px-4 sm:px-5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-blue-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`text-base ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                {tab.name}
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 text-gray-300 min-h-[420px]">
          <div key={activeTab}>
            <Suspense fallback={<LoadingSpinner />}>
              {ActiveComponent && <ActiveComponent />}
            </Suspense>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(Portfolio);
