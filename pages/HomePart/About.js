import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';
import { FaDesktop, FaBasketballBall, FaCode, FaGamepad, FaPaintBrush, FaMicrochip, FaLaptopCode, FaMicrophone, FaMusic, FaVideo, FaGraduationCap, FaAward } from 'react-icons/fa'; 

function About({ fadeIn, stagger }) {
  const stats = [
    { label: 'Awards', value: '10+', icon: FaAward },
    { label: 'Projects Completed', value: '10+', icon: FaCode },
    { label: 'Technologies', value: '10+', icon: FaLaptopCode },
  ];

  return ( 
    <>
      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={{ once: false, amount: 0.2 }}
        className="min-h-screen py-12 md:py-16 px-6 max-w-7xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header */}
        <motion.div variants={fadeIn} className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-10">
          {/* Left Side - Image */}
          <motion.div
            variants={fadeIn}
            className="lg:w-5/12 flex justify-center order-1 lg:order-1"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Image */}
              <div className="relative">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                  <Image
                    src="/CarlProfessionPic.png" 
                    alt="Carl Wyne S. Gallardo" 
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                    className="object-cover group-hover:border-blue-400/30 transition-all duration-500"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Text */}
          <motion.div variants={fadeIn} className="lg:w-7/12 order-2 lg:order-2 space-y-4 text-center lg:text-left">
            {/* Education Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/30 rounded-full backdrop-blur-sm">
              <FaGraduationCap className="text-cyan-400 text-sm" />
              <span className="text-xs md:text-sm text-blue-300 font-medium">IT Graduate</span>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed text-center lg:text-left">
                I am an <span className="text-cyan-400 font-semibold">Information Technology graduate</span> from <span className="text-blue-400 font-semibold">St. Rita's College of Balingasag</span>, with a passion for Web Development and experience in various web technologies. I also have skills in Arduino, Graphic Design, Computer Hardware, and Game Development.
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed text-center lg:text-left">
                I enjoy learning new things and improving my skills related to the field. I am <span className="text-cyan-400 font-semibold">adaptable</span> and able to quickly adjust to the environment. I work well under pressure and am always looking for opportunities to grow and contribute to projects that combine <span className="text-blue-400 font-semibold">creativity, technology, and problem-solving</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-400/30 hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className="text-xl md:text-2xl text-cyan-400 mx-auto mb-1" />
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interests Section - Integrated */}
        <motion.div variants={fadeIn} className="mt-8">
          {/* Section Header */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center lg:text-left">
              <span className="text-white">My </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Interests
              </span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0" />
          </div>

          {/* Scrolling Marquee */}
          {(() => {
            const row1 = [
              { icon: FaCode,       label: 'Web Development',   color: 'from-blue-400 to-cyan-400',      glow: 'rgba(56,189,248,0.35)' },
              { icon: FaPaintBrush, label: 'Graphic Design',    color: 'from-pink-400 to-rose-500',      glow: 'rgba(251,113,133,0.35)' },
              { icon: FaMicrochip,  label: 'Computer Hardware', color: 'from-violet-400 to-purple-500',  glow: 'rgba(167,139,250,0.35)' },
              { icon: FaDesktop,    label: 'Game Development',  color: 'from-emerald-400 to-teal-500',   glow: 'rgba(52,211,153,0.35)' },
              { icon: FaLaptopCode, label: 'Programming',       color: 'from-indigo-400 to-blue-500',    glow: 'rgba(99,102,241,0.35)' },
            ];
            const row2 = [
              { icon: FaBasketballBall, label: 'Basketball',       color: 'from-orange-400 to-amber-500',  glow: 'rgba(251,146,60,0.35)' },
              { icon: FaGamepad,        label: 'Video Games',      color: 'from-green-400 to-emerald-500', glow: 'rgba(74,222,128,0.35)' },
              { icon: FaMicrophone,     label: 'Singing',          color: 'from-rose-400 to-fuchsia-500',  glow: 'rgba(251,113,133,0.35)' },
              { icon: FaMusic,          label: 'Music Listening',  color: 'from-sky-400 to-cyan-500',      glow: 'rgba(56,189,248,0.35)' },
              { icon: FaVideo,          label: 'Content Creation', color: 'from-yellow-400 to-orange-500', glow: 'rgba(250,204,21,0.35)' },
            ];
            const Chip = ({ item, i }) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ willChange: 'transform' }}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors duration-200 cursor-default flex-shrink-0 select-none"
              >
                <div
                  className={`p-1.5 bg-gradient-to-br ${item.color} rounded-full`}
                  style={{ boxShadow: `0 0 10px ${item.glow}` }}
                >
                  <item.icon className="text-sm text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            );
            return (
              <div className="relative overflow-hidden rounded-2xl py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                {/* Row 1 — scroll left */}
                <div className="flex gap-3 mb-3 w-max interests-row-1">
                  {[...row1, ...row1, ...row1, ...row1].map((item, i) => <Chip key={i} item={item} i={i} />)}
                </div>
                {/* Row 2 — scroll right */}
                <div className="flex gap-3 w-max interests-row-2">
                  {[...row2, ...row2, ...row2, ...row2].map((item, i) => <Chip key={i} item={item} i={i} />)}
                </div>
              </div>
            );
          })()}

          <style jsx>{`
            .interests-row-1 {
              animation: scrollLeft 28s linear infinite;
            }
            .interests-row-1:hover {
              animation-play-state: paused;
            }
            .interests-row-2 {
              animation: scrollRight 22s linear infinite;
            }
            .interests-row-2:hover {
              animation-play-state: paused;
            }
            @keyframes scrollLeft {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            @keyframes scrollRight {
              0%   { transform: translateX(-25%); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </motion.div>
      </motion.section>
    </>
  );
}

export default memo(About);
