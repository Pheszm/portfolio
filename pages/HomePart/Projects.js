import { motion } from 'framer-motion';

export default function Projects({ fadeIn, stagger }) {
  const projectList = [
    { name: 'E-Commerce Platform', desc: 'A full-stack online store with payment integration.' },
    { name: 'Task Manager App', desc: 'A productivity app with real-time collaboration.' },
  ];

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      variants={stagger}
      viewport={{ once: false, amount: 0.3 }}
      className="py-20 px-6 bg-gray-800"
    >
      <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-12 text-center">
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projectList.map((project, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-300">{project.desc}</p>
            <a href="#" className="text-blue-400 hover:underline mt-4 inline-block">
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
