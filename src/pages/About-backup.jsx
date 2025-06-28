import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaDownload,
  FaPhone,
  FaGlobe,
  FaDatabase,
  FaChartLine,
  FaCode,
  FaServer,
  FaTools,
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaLaptopCode,
  FaFilePdf,
  FaChartBar,
  FaDesktop,
  FaArrowRight
} from 'react-icons/fa';

// About Component
const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const aboutRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Animation variants
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your JSX content here */}
    </div>
  );
};

const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
  };

  // Navigation items
  const navItems = [
    { id: 'about', label: 'About Me', icon: <FaLaptopCode className="mr-2" /> },
    { id: 'skills', label: 'Skills', icon: <FaTools className="mr-2" /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap className="mr-2" /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope className="mr-2" /> },
  ];

  // Technical Skills
  const technicalSkills = [
    {
      category: 'Data Analysis',
      skills: [
        { name: 'Python', level: 90, icon: <FaCode className="text-blue-500" /> },
        { name: 'SQL', level: 85, icon: <FaDatabase className="text-blue-500" /> },
        { name: 'Data Visualization', level: 88, icon: <FaChartBar className="text-yellow-500" /> },
        { name: 'Data Analysis', level: 90, icon: <FaChartLine className="text-purple-500" /> },
        { name: 'Excel', level: 92, icon: <FaFilePdf className="text-green-600" /> },
        { name: 'Cloud Computing', level: 78, icon: <FaServer className="text-blue-400" /> },
        { name: 'JavaScript', level: 75, icon: <FaCode className="text-yellow-400" /> },
        { name: 'Web Development', level: 80, icon: <FaDesktop className="text-orange-500" /> },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'SQL', level: 90, icon: <FaDatabase className="text-blue-500" /> },
        { name: 'MySQL', level: 85, icon: <FaDatabase className="text-orange-500" /> },
        { name: 'MongoDB', level: 75, icon: <FaDatabase className="text-green-500" /> },
      ],
    },
    {
      category: 'Web Technologies',
      skills: [
        { name: 'JavaScript', level: 80, icon: <FaCode className="text-yellow-400" /> },
        { name: 'HTML5', level: 90, icon: <FaCode className="text-orange-500" /> },
        { name: 'CSS3', level: 85, icon: <FaCode className="text-blue-500" /> },
      ],
    },
  ];

  // Soft Skills
  const softSkills = [
    { name: 'Problem Solving', level: 95 },
    { name: 'Communication', level: 90 },
    { name: 'Team Collaboration', level: 92 },
    { name: 'Time Management', level: 88 },
    { name: 'Critical Thinking', level: 90 },
  ];

  // Education
  const education = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'Rajasthan Technical University',
      year: '2014 - 2018',
      description: 'Specialized in Data Structures, Algorithms, and Database Management',
    },
    {
      degree: 'Data Science Certification',
      institution: 'IIT Madras',
      year: '2019',
      description: 'Focused on Machine Learning and Statistical Analysis',
    },
  ];

  // Contact Information
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-indigo-500" />,
      text: 'sahilkhan36985@gmail.com',
      link: 'mailto:sahilkhan36985@gmail.com',
    },
    {
      icon: <FaPhone className="text-green-500" />,
      text: '+91 6377XXXXXX',
      link: 'tel:+916377XXXXXX',
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      text: 'Jaipur, Rajasthan, India',
      link: 'https://goo.gl/maps/your-location',
    },
    {
      icon: <FaGithub className="text-gray-700" />,
      text: 'github.com/SahilTheCoder',
      link: 'https://github.com/SahilTheCoder',
    },
    {
      icon: <FaLinkedin className="text-blue-600" />,
      text: 'linkedin.com/in/sahil-ali-714867242',
      link: 'https://linkedin.com/in/sahil-ali-714867242',
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="mb-10 md:mb-0 md:mr-12"
              variants={item}
              initial="hidden"
              animate="show"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 p-1 bg-white/10 backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="/images/profile.avif"
                    alt="Sahil Ali"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Sahil+Ali&background=4f46e5&color=fff&size=512';
                    }}
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center md:text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                variants={item}
              >
                Sahil{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700">
                  Ali
                </span>
              </motion.h1>
              <motion.div 
                className="text-xl md:text-2xl font-medium text-gray-700 mb-6"
                variants={item}
              >
                Data Analyst & Inventory Specialist
              </motion.div>
              <motion.p 
                className="text-lg text-gray-700 max-w-2xl mb-8 leading-relaxed"
                variants={item}
              >
                Transforming complex data into actionable insights to drive business growth and operational efficiency.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center md:justify-start gap-4"
                variants={item}
              >
                <a 
                  href="#contact" 
                  className="bg-indigo-700 text-white hover:bg-indigo-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                >
                  <FaEnvelope className="mr-2" /> Contact Me
                </a>
                <a 
                  href="/resume.pdf" 
                  download
                  className="group relative border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <FaDownload className="mr-2 transition-transform duration-300 group-hover:scale-110" /> 
                    Download CV
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.section 
              id="about"
              ref={aboutRef}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item} className="flex items-center mb-8">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FaLaptopCode className="text-indigo-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">Who am I?</h2>
              </motion.div>
              
              <motion.div variants={item} className="space-y-6 text-gray-700 leading-relaxed">
                <p>Hello! I am <strong className="text-indigo-700">Sahil Ali</strong>, an Inventory Specialist, Data Analyst, and System Optimizer based in Rajasthan, India. With over 4 years of hands-on experience, I specialize in managing stock levels, streamlining purchasing processes, and ensuring data accuracy for operational excellence.</p>

                <p>My expertise lies in leveraging ERP systems like Erply, advanced Excel functions such as VLOOKUP and Pivot Tables, and data-driven decision-making to optimize inventory and reporting processes. I am passionate about turning raw data into actionable insights that drive business success.</p>

                <p>Beyond my technical skills, I am a detail-oriented team player who thrives on collaboration and continuous improvement. I believe that accuracy and efficiency are the backbone of any successful supply chain.</p>

                <p>Throughout my career, I have successfully implemented automation techniques that reduce manual work and improve data integrity. I have experience in creating dashboards and reports that provide real-time insights to stakeholders, helping guide strategic decisions and improve inventory turnover rates.</p>

                <p>My passion for learning keeps me updated with the latest tools and technologies in data analytics, including AI-driven platforms such as ChatGPT and Perplexity, which I use to enhance data processing and problem-solving capabilities.</p>

                <p>I am committed to delivering solutions that not only meet operational needs but also empower businesses to grow sustainably and efficiently.</p>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Education</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-indigo-700">Bachelor of Science (B.Sc.) in Computer Science</h4>
                    <p className="text-gray-600">MDSU University, Rajasthan (2018 – 2021)</p>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Projects</h3>
                <p className="text-gray-600 mb-4">Explore my projects where I apply data analysis and inventory management skills to real-world problems.</p>
                <Link 
                  to="/projects" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Learn more <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>

              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Experience</h3>
                <p className="text-gray-600 mb-4">From inventory management to data analysis roles, my professional journey is full of growth and achievements.</p>
                <Link 
                  to="/experience" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Learn more <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sahil Ali</h2>
                <div className="w-16 h-1 bg-indigo-500 mx-auto my-3 rounded-full"></div>
                <p className="text-gray-600">Inventory Specialist & Data Analyst</p>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      window.scrollTo({
                        top: document.getElementById(item.id)?.offsetTop - 100,
                        behavior: 'smooth'
                      });
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                      activeSection === item.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
                <div className="space-y-3">
                  {contactInfo.slice(0, 3).map((item, index) => (
                    <a 
                      key={index} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ))}
                </div>
                <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200">
                  {contactInfo.slice(3).map((item, index) => (
                    <a 
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-gray-500 hover:text-indigo-600 transition-colors"
                      aria-label={item.text}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <motion.section 
            id="skills"
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white rounded-xl shadow-lg p-8 mt-8"
          >
            <motion.div variants={item} className="flex items-center mb-8">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <FaTools className="text-indigo-600 text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 ml-4">Skills & Expertise</h2>
            </motion.div>
            
            <motion.div variants={container} className="space-y-8">
              {technicalSkills.map((category, index) => (
                <motion.div key={index} variants={item} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            {skill.icon}
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              <motion.div variants={item}>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Education Section */}
          <motion.section 
            id="education"
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white rounded-xl shadow-lg p-8 mt-8"
          >
              <motion.div variants={item} className="flex items-center mb-8">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FaGraduationCap className="text-indigo-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">Education</h2>
              </motion.div>
              
              <motion.div variants={container} className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    variants={item}
                    className="relative pl-8 pb-8 border-l-2 border-indigo-200"
                  >
                    <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-2 top-1 border-2 border-white" />
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm">
                        <span className="font-medium">{edu.institution}</span>
                        <span className="hidden sm:block sm:mx-2">•</span>
                        <span>{edu.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{edu.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Contact Section */}
            <motion.section 
              id="contact"
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <motion.div variants={item} className="flex items-center mb-8">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FaEnvelope className="text-indigo-600 text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">Get In Touch</h2>
              </motion.div>
              
              <motion.div variants={item} className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out to me through any of the following channels:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-2xl">
                        {contact.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">
                          {contact.text.split(':')[0]}
                        </h4>
                        <p className="text-gray-600">
                          {contact.text.split(':').length > 1 ? contact.text.split(':')[1].trim() : contact.text}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Let's Work Together</h3>
                  <p className="text-gray-700 mb-6">
                    Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
                  </p>
                  <a 
                    href="mailto:sahilkhan36985@gmail.com" 
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FaEnvelope className="mr-2" />
                    Send Me a Message
                  </a>
                </div>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
