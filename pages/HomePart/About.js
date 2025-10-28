import { motion } from 'framer-motion';
import { FaDesktop, FaBasketballBall, FaCode, FaGamepad, FaPaintBrush, FaMicrochip, FaLaptopCode, FaMicrophone, FaMusic, FaVideo, FaGraduationCap, FaAward } from 'react-icons/fa'; 

export default function About({ fadeIn, stagger }) {
  const stats = [
    { label: 'Years Experience', value: '2+', icon: FaAward },
    { label: 'Projects Completed', value: '15+', icon: FaCode },
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
                <img 
                  src="/GraduationPicture.png" 
                  alt="Carl Wyne S. Gallardo" 
                  className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-3xl group-hover:border-blue-400/30 transition-all duration-500"
                />
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

          {/* Interests Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { icon: FaCode, label: 'Web Development', color: 'from-blue-400 to-cyan-400' },
              { icon: FaPaintBrush, label: 'Graphic Design', color: 'from-cyan-400 to-blue-500' },
              { icon: FaMicrochip, label: 'Computer Hardware', color: 'from-blue-500 to-cyan-500' },
              { icon: FaDesktop, label: 'Game Development', color: 'from-cyan-500 to-blue-400' },
              { icon: FaLaptopCode, label: 'Programming', color: 'from-blue-400 to-cyan-500' },
              { icon: FaBasketballBall, label: 'Basketball', color: 'from-cyan-400 to-blue-400' },
              { icon: FaGamepad, label: 'Video Games', color: 'from-blue-500 to-cyan-400' },
              { icon: FaMicrophone, label: 'Singing', color: 'from-cyan-500 to-blue-500' },
              { icon: FaMusic, label: 'Music Listening', color: 'from-blue-400 to-cyan-400' },
              { icon: FaVideo, label: 'Content Creation', color: 'from-cyan-400 to-blue-500' },
            ].map((interest, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl`} />
                
                {/* Content */}
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <div className={`p-2 md:p-3 bg-gradient-to-br ${interest.color} rounded-lg`}>
                    <interest.icon className="text-xl md:text-2xl text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                    {interest.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
