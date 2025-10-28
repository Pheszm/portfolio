import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBullseye, FaCode, FaPalette, FaDesktop, FaGamepad, FaMicrochip } from 'react-icons/fa';

const LEVEL_ORDER = {
  Expert: 4,
  Advanced: 3,
  Intermediate: 2,
  Beginner: 1,
};

const LEVEL_CONFIG = {
  Expert: { 
    color: 'from-yellow-400 to-orange-500', 
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    percentage: 100 
  },
  Advanced: { 
    color: 'from-blue-400 to-cyan-500', 
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    percentage: 75 
  },
  Intermediate: { 
    color: 'from-green-400 to-emerald-500', 
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30',
    percentage: 50 
  },
  Beginner: { 
    color: 'from-gray-400 to-gray-500', 
    textColor: 'text-gray-400',
    borderColor: 'border-gray-500/30',
    percentage: 25 
  },
};

const skills = [
  {
    name: 'HTML',
    svg: 'https://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Other-html-5-icon.png',
    level: 'Expert',
    category: ['WebDev'],
  },
  {
    name: 'CSS',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'Tailwind',
    svg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKPw4CK4jcH7udsFHZdiB3iIOuI3fUCsxUZosXy4Y1yd25NA-dzCBPrSDIhg1BwObl3w&usqp=CAU',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'Photoshop',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png',
    level: 'Advanced',
    category: ['GraphicsDesigns'],
  },
  {
    name: 'PHP',
    svg: 'https://images.seeklogo.com/logo-png/10/2/php-logo-png_seeklogo-108600.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'Next JS',
    svg: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'Prisma',
    svg: 'https://icons.veryicon.com/png/o/business/vscode-program-item-icon/prisma.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'MySQL',
    svg: 'https://images.icon-icons.com/1381/PNG/512/mysqlworkbench_93532.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'Laravel',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'JavaScript',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    level: 'Advanced',
    category: ['WebDev'],
  },
  {
    name: 'C++',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png',
    level: 'Expert',
    category: ['WindowsApp', 'Games'],
  },
  {
    name: 'Lua',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lua-Logo.svg/1200px-Lua-Logo.svg.png',
    level: 'Advanced',
    category: ['Games'],
  },
  {
    name: 'Python',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png',
    level: 'Expert',
    category: ['WebDev', 'Games'],
  },
  {
    name: 'C#',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1820px-Logo_C_sharp.svg.png',
    level: 'Expert',
    category: ['WindowsApp', 'Games'],
  },
  {
    name: 'AI Prompting',
    svg: 'https://i.pinimg.com/736x/2d/ca/af/2dcaaf0ab1045c20d360fc32cf2ea285.jpg',
    level: 'Expert',
    category: ['WebDev', 'WindowsApp', 'Games'],
  },
  {
    name: 'Arduino',
    svg: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg',
    level: 'Expert',
    category: ['WebDev', 'WindowsApp', 'Hardware'],
  },
  {
    name: 'Canva',
    svg: 'https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg',
    level: 'Advanced',
    category: ['GraphicsDesigns'],
  },
  {
    name: 'Computer Hardware',
    svg: 'https://cdn-icons-png.flaticon.com/512/4618/4618748.png',
    level: 'Advanced',
    category: ['Hardware'],
  },
  {
    name: 'Networking',
    svg: 'https://cdn-icons-png.flaticon.com/512/1086/1086644.png',
    level: 'Advanced',
    category: ['Hardware'],
  },
];

const categories = [
  { value: '', label: 'All Skills', icon: FaBullseye },
  { value: 'WebDev', label: 'Web Dev', icon: FaCode },
  { value: 'GraphicsDesigns', label: 'Graphics', icon: FaPalette },
  { value: 'WindowsApp', label: 'Windows', icon: FaDesktop },
  { value: 'Games', label: 'Games', icon: FaGamepad },
  { value: 'Hardware', label: 'Hardware', icon: FaMicrochip },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredAndSortedSkills = skills
    .filter(skill =>
      selectedCategory === '' ||
      skill.category.includes(selectedCategory)
    )
    .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);

  const getSkillCount = (category) => {
    if (category === '') return skills.length;
    return skills.filter(skill => skill.category.includes(category)).length;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Animated Tab Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 w-full max-w-full">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          const count = getSkillCount(cat.value);
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
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6 w-full"
        >
          {filteredAndSortedSkills.map((skill, index) => {
            const levelConfig = LEVEL_CONFIG[skill.level];
            
            return (
              <motion.div
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative group bg-gradient-to-br from-gray-900 to-gray-800 
                           rounded-2xl p-3 sm:p-4 md:p-5 border ${levelConfig.borderColor}
                           hover:shadow-2xl hover:shadow-blue-500/20 
                           transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${levelConfig.color} 
                                   rounded-xl blur-xl opacity-0 group-hover:opacity-50 
                                   transition-opacity duration-300`} />
                    <img
                      src={skill.svg}
                      alt={skill.name}
                      className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain 
                               drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-white font-semibold text-center text-xs sm:text-sm md:text-base">
                    {skill.name}
                  </h3>

                  {/* Level Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${levelConfig.textColor}
                                 bg-gradient-to-r ${levelConfig.color} bg-clip-text text-transparent
                                 border ${levelConfig.borderColor}`}>
                    {skill.level}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelConfig.percentage}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${levelConfig.color} rounded-full
                                shadow-lg shadow-${levelConfig.color}/50`}
                    />
                  </div>
                </div>

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                                 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredAndSortedSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-400"
        >
          <p className="text-xl">No skills found in this category</p>
        </motion.div>
      )}
    </div>
  );
}
