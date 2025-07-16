import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Works from './PortfolioNav/Works';
import Skills from './PortfolioNav/Skills';


export default function Portfolio({ fadeIn, stagger }) {
  const [activeTab, setActiveTab] = useState('Works');

  const tabList = ['Works', 'Awards/Certificates', 'Skills'];

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
        className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white pt-7">
        Portfolio
      </motion.h2>

      <motion.div
        variants={fadeIn}
        className="p-4 sm:p-6 rounded-lg shadow-lg bg-[#03031A] ">
        <nav className="flex flex-wrap justify-center sm:justify-evenly gap-4 sm:gap-8 mb-4">
          {tabList.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`whitespace-nowrap py-2 md:px-40 border-b-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-300 hover:text-gray-400 hover:border-gray-300'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </nav>

        <div className="text-gray-300 mt-6">

            {activeTab === 'Works' && <Works/>}
            {activeTab === 'Awards/Certificates' && 'A collection of my professional certifications.'}
            {activeTab === 'Skills' && <Skills/>}

        </div>
      </motion.div>

    </motion.section>
  );
}
