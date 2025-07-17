import React, { useState } from 'react';

const LEVEL_ORDER = {
  Expert: 4,
  Advanced: 3,
  Advance: 2,
  Intermediate: 1,
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
    level: 'Advance',
    category: ['WebDev'],
  },
  {
    name: 'Prisma',
    svg: 'https://icons.veryicon.com/png/o/business/vscode-program-item-icon/prisma.png',
    level: 'Advance',
    category: ['WebDev'],
  },
  {
    name: 'MySQL',
    svg: 'https://images.icon-icons.com/1381/PNG/512/mysqlworkbench_93532.png',
    level: 'Advance',
    category: ['WebDev'],
  },
  {
    name: 'Laravel',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png',
    level: 'Advance',
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
    level: 'Advance',
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
    name: 'ChatGPT',
    svg: 'https://static.vecteezy.com/system/resources/thumbnails/021/059/825/small_2x/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg',
    level: 'Expert',
    category: ['WebDev', 'WindowsApp', 'Games'],
  },
  {
    name: 'Canva',
    svg: 'https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg',
    level: 'Advance',
    category: ['GraphicsDesigns'],
  },
  {
    name: 'Computer Hardware',
    svg: 'https://cdn-icons-png.flaticon.com/512/4618/4618748.png',
    level: 'Advance',
    category: ['Hardware'],
  },
  {
    name: 'Networking',
    svg: 'https://cdn-icons-png.flaticon.com/512/1086/1086644.png',
    level: 'Intermediate',
    category: ['Hardware'],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredAndSortedSkills = skills
    .filter(skill =>
      selectedCategory === '' ||
      skill.category.includes(selectedCategory)
    )
    .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);

  return (
    <div className="w-full flex flex-col items-center md:px-4">
      <select
        id="dropdown"
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="block px-4 py-2 text-white bg-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 mb-5"
      >
        <option value="">All</option>
        <option value="GraphicsDesigns">Graphics Design</option>
        <option value="WebDev">Web Development</option>
        <option value="WindowsApp">Windows Application</option>
        <option value="Games">Games</option>
        <option value="Hardware">Hardware</option>
      </select>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-10xl">
        {filteredAndSortedSkills.map((skill, index) => (
      <div
          key={index}
          tabIndex={0}
          role="link"
          className="relative group flex flex-row gap-5 items-center bg-gray-900 rounded-lg p-5 
                    hover:scale-[1.05] focus:scale-[1.05] transition-transform duration-300 
                    focus:outline-none cursor-pointer"
        >
        <img
          src={skill.svg}
          alt={skill.name}
          className="w-14 h-14 rounded-sm"
        />
        <p className="text-white text-xs md:text-md lg:text-lg">{skill.name}</p>

        <div className="w-full absolute bottom-0 left-0 opacity-0 
                        group-hover:opacity-100 group-focus:opacity-100 
                        transition-opacity duration-300 
                        bg-black/30 text-white text-sm px-3 py-1 rounded-sm text-center">
          {skill.level}
        </div>
      </div>

        ))}
      </div>
    </div>
  );
}
