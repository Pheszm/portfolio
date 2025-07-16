import React from 'react';

const skills = [
    {
        name: 'HTML',
        svg: 'https://icons.iconarchive.com/icons/cornmanthe3rd/plex/512/Other-html-5-icon.png',
        level: 'Expert'
    },
    {
        name: 'CSS',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg',
        level: 'Advanced'
    },
    {
    name: 'Tailwind',
    svg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKPw4CK4jcH7udsFHZdiB3iIOuI3fUCsxUZosXy4Y1yd25NA-dzCBPrSDIhg1BwObl3w&usqp=CAU',
    level: 'Advanced'
    },
    {
        name: 'Photoshop',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png',
        level: 'Advanced'
    },
    {
        name: 'PHP',
        svg: 'https://images.seeklogo.com/logo-png/10/2/php-logo-png_seeklogo-108600.png',
        level: 'Advanced'
    },
    {
        name: 'Next JS',
        svg: 'https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png',
        level: 'Advance'
    },
    {
        name: 'Laravel',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png',
        level: 'Advance'
    },
    {
        name: 'JavaScript',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        level: 'Advanced'
    },
    {
        name: 'C++',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png',
        level: 'Expert'
    },
    {
        name: 'Lua',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lua-Logo.svg/1200px-Lua-Logo.svg.png',
        level: 'Advance'
    },
    {
        name: 'Python',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png',
        level: 'Expert'
    },
    {
        name: 'C#',
        svg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1820px-Logo_C_sharp.svg.png',
        level: 'Expert'
    },
];

export default function Skills() {
  return (
    <div className="w-full flex flex-col items-center md:px-4">
      <h1 className="text-white text-2xl font-semibold mb-6">Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-10xl">
        {skills.map((skill, index) => (

            <div
            key={index}
            tabIndex={0}  
            role="link"
            onKeyDown={(e) => ['Enter', ' '].includes(e.key) && window.open(skill.link, '_blank')}
            className="relative group flex flex-row gap-5 items-center bg-gray-900 rounded-lg p-5 hover:scale-[1.05] focus:scale-[1.05] active:scale-[1.05] transition-transform duration-300 cursor-pointer"
            >
            <img
                src={skill.svg}
                alt={skill.name}
                className="w-14 h-14 rounded-sm"
            />
            <p className="text-white text-xs md:text-md lg:text-lg">{skill.name}</p>

            <div className="w-full absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-black/30 text-white text-sm px-3 py-1 rounded-sm text-center">
                {skill.level}
            </div>
            </div>

        ))}
      </div>
    </div>
  );
}
