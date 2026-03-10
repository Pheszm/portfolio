import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBullseye, FaCode, FaPalette, FaDesktop, FaGamepad, FaMicrochip, FaNetworkWired } from 'react-icons/fa';
import { 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiPhp, 
  SiNextdotjs, 
  SiPrisma, 
  SiMysql, 
  SiLaravel, 
  SiJavascript, 
  SiCplusplus, 
  SiLua, 
  SiPython, 
  SiArduino,
  SiCanva,
  SiFirebase
} from 'react-icons/si';
import Image from 'next/image';

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
    icon: SiHtml5,
    level: 'Expert',
    category: ['WebDev'],
    color: '#E34F26',
  },
  {
    name: 'CSS',
    icon: SiCss3,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#1572B6',
  },
  {
    name: 'Tailwind',
    icon: SiTailwindcss,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#06B6D4',
  },
  {
    name: 'Photoshop',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    level: 'Advanced',
    category: ['GraphicsDesigns'],
    color: '#31A8FF',
  },
  {
    name: 'PHP',
    icon: SiPhp,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#777BB4',
  },
  {
    name: 'Next JS',
    icon: SiNextdotjs,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#FFFFFF',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#5A67D8',
  },
  {
    name: 'MySQL',
    icon: SiMysql,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#4479A1',
  },
  {
    name: 'Neon',
    svg: 'https://neon.tech/favicon/favicon.svg',
    level: 'Advanced',
    category: ['WebDev'],
    color: '#00E599',
  },
  {
    name: 'Firebase',
    icon: SiFirebase,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#FFCA28',
  },
  {
    name: 'Laravel',
    icon: SiLaravel,
    level: 'Expert',
    category: ['WebDev'],
    color: '#FF2D20',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    level: 'Advanced',
    category: ['WebDev'],
    color: '#F7DF1E',
  },
  {
    name: 'C++',
    icon: SiCplusplus,
    level: 'Expert',
    category: ['WindowsApp', 'Games'],
    color: '#00599C',
  },
  {
    name: 'Lua',
    icon: SiLua,
    level: 'Advanced',
    category: ['Games'],
    color: '#2C2D72',
  },
  {
    name: 'Python',
    icon: SiPython,
    level: 'Expert',
    category: ['WebDev', 'Games'],
    color: '#3776AB',
  },
  {
    name: 'C#',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg',
    level: 'Expert',
    category: ['WindowsApp', 'Games'],
    color: '#239120',
  },
  {
    name: 'Arduino',
    icon: SiArduino,
    level: 'Expert',
    category: ['WebDev', 'WindowsApp', 'Hardware'],
    color: '#00979D',
  },
  {
    name: 'Canva',
    icon: SiCanva,
    level: 'Advanced',
    category: ['GraphicsDesigns'],
    color: '#00C4CC',
  },
  {
    name: 'Computer Hardware',
    icon: FaMicrochip,
    level: 'Advanced',
    category: ['Hardware'],
    color: '#9CA3AF',
  },
  {
    name: 'Networking',
    icon: FaNetworkWired,
    level: 'Advanced',
    category: ['Hardware'],
    color: '#10B981',
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

function Skills() {
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
                           : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-gray-100 border border-white/10 hover:border-blue-400/20'
                         }`}
            >
              <span className="flex items-center gap-2">
                <IconComponent className="text-lg" />
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
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
                className="relative group bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-5 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
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
                    {skill.icon ? (
                      <skill.icon
                        style={{ color: skill.color }}
                        className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                                 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <Image
                        src={skill.svg}
                        alt={skill.name}
                        width={80}
                        height={80}
                        className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                                 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
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
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
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

export default memo(Skills);
