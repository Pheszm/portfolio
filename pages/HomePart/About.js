import { motion } from 'framer-motion';
import { FaDesktop, FaBasketballBall, FaCode, FaGamepad, FaPaintBrush, FaMicrochip, FaLaptopCode, FaMicrophone, FaMusic, FaVideo } from 'react-icons/fa'; 

export default function About({ fadeIn, stagger }) {
  return ( 
    <>
      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={{ once: false, amount: 0.3 }}
        className="py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center pt-30"
      >
        {/* Left Side (Text) */}
        <motion.div className="lg:w-1/2 mb-8 lg:mb-0">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold mb-8 text-center lg:text-left text-white pt-5"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-300 leading-relaxed text-center lg:text-left">
            I am an Information Technology graduate from St. Rita's College of Balingasag, with a passion for Web Development and experience in various web technologies. I also have skills in Arduino, Graphic Design, Computer Hardware, and Game Development.            
            <br/><br/>
            I enjoy learning new things and improving my skills related to the field. I am adaptable and able to quickly adjust to the environment.  I work well under pressure and am always looking for opportunities to grow and contribute to projects that combines creativity, technology, and problem-solving.
          </motion.p>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          variants={fadeIn}
          className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/GraduationPicture.png" 
            alt="Your Name" 
            className="rounded-full w-80 h-80 object-cover shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* Interests Section */}
      <motion.section
        id="interests"
        initial="hidden"
        whileInView="visible"
        variants={stagger}
        viewport={{ once: false, amount: 0.3 }}
        className="py-20 px-6 max-w-7xl mx-auto"
      >

      <motion.h3
        variants={fadeIn}
        className="text-2xl mb-6 text-left text-white flex items-center whitespace-nowrap"
      >
        My Interests
        <span className="ml-4 w-20 border-t-1 border-white" />
      </motion.h3>



        <motion.div 
          variants={fadeIn} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-white text-center"
        >

          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaCode className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Web Development
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaPaintBrush className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Graphic Design
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaMicrochip className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Computer Hardware
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaDesktop className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Game Development
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaLaptopCode className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Programming
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaBasketballBall className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Basketball
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaGamepad className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Video Games
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaMicrophone className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Singing
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaMusic className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Music Listening
              </span>
            </span>
          </div>


          <div className="relative inline-flex h-20 overflow-hidden rounded-sm p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#0508bcff_50%,#ffffff_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-sm bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <FaVideo className="text-3xl mr-4 flex-shrink-0 text-white" />
              <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white">
                Content Create
              </span>
            </span>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
