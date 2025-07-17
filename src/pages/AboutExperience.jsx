import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserTie, 
  FaBriefcase, 
  FaClipboardList, 
  FaWarehouse, 
  FaRobot, 
  FaCheck, 
  FaStar, 
  FaLightbulb, 
  FaDownload,
  FaChartBar,
  FaTools,
  FaDatabase,
  FaGraduationCap,
  FaBookOpen,
  FaLanguage,
  FaGlobeAsia,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaGlobe,
  FaCog,
  FaCode,
  FaWhatsapp,
  FaArrowRight,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { FiDownload, FiMail, FiMapPin, FiMessageSquare, FiExternalLink } from 'react-icons/fi';

import { useLocation } from 'react-router-dom';
import '../styles/animations.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Animation components
const AnimatedSection = ({ children, className = '', delay = 0, ...props }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay * 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Sub-components
const SectionHeader = ({ title, subtitle, icon, className = '', highlight = '' }) => {
  const titleParts = title.split(highlight);
  
  return (
    <motion.div 
      className={`mb-16 text-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white mb-6 shadow-lg shadow-indigo-500/20 animate-float">
        {React.cloneElement(icon, { className: 'w-8 h-8' })}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              {highlight}
            </span>
            {titleParts[1]}
          </>
        ) : (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
            {title}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

const SkillBadge = ({ icon, text, className = '', ...props }) => (
  <motion.div 
    className={`inline-flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 ${className}`}
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    <span className="text-indigo-500">{icon}</span>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{text}</span>
  </motion.div>
);

const Card = ({ children, className = '', hoverEffect = true, ...props }) => (
  <motion.div
    className={`card ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}
    whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
    {...props}
  >
    {children}
  </motion.div>
);

const GlassCard = ({ children, className = '', ...props }) => (
  <motion.div
    className={`card-glass hover:shadow-xl ${className}`}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    {...props}
  >
    {children}
  </motion.div>
);

const GradientBorderCard = ({ children, className = '', ...props }) => (
  <div className="border-gradient">
    <motion.div
      className={className}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      {...props}
    >
      {children}
    </motion.div>
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'border-2 border-current text-current hover:bg-opacity-10 hover:bg-current'
  };

  return (
    <motion.button
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {iconPosition === 'left' && Icon && <Icon className="mr-2" />}
      <span>{children}</span>
      {iconPosition === 'right' && Icon && <Icon className="ml-2" />}
    </motion.button>
  );
};

const AboutSection = React.forwardRef((props, ref) => {
  // Language Skills Data
  const languageSkills = [
    { name: 'English', level: 70 },
    { name: 'Hindi', level: 100 },
    { name: 'Punjabi', level: 70 },
    { name: 'Gujarati', level: 50 }
  ];

  // Core Expertise Data
  const coreExpertise = [
    {
      icon: <FaClipboardList className="w-5 h-5" />,
      title: "Inventory Management",
      description: "Expert in stock control, demand forecasting, and supply chain optimization."
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      title: "Data Analysis",
      description: "Transforming raw data into actionable business insights and visualizations."
    },
    {
      icon: <FaTools className="w-5 h-5" />,
      title: "Process Automation",
      description: "Implementing automated solutions to streamline operations and reduce manual work."
    },
    {
      icon: <FaDatabase className="w-5 h-5" />,
      title: "ERP Systems",
      description: "Proficient in Erply and other ERP solutions for business process management."
    }
  ];

  // Education Data
  const education = [
    {
      degree: "Bachelor of Science (B.Sc.) - PCM",
      institution: "MDSU University, Rajasthan",
      duration: "Jan 2018 – Jan 2021",
      description: "Major in Physics, Chemistry, and Mathematics with a focus on analytical problem-solving and quantitative analysis.",
      icon: <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-xl" />
    },
    {
      degree: "Self-Study & Professional Development",
      institution: "Online Learning Platforms",
      duration: "Ongoing",
      description: "Continuously enhancing skills in AI tools, data analytics, and business intelligence through online courses and hands-on projects.",
      icon: <FaBookOpen className="text-blue-600 dark:text-blue-400 text-xl" />
    }
  ];

  // Language Skills Data
  const languages = [
    {
      name: "English",
      level: "Proficiant",
      proficiency: 70,
      icon: <FaLanguage className="text-green-600 dark:text-green-400" />
    },
    {
      name: "Hindi",
      level: "Native",
      proficiency: 100,
      icon: <FaGlobeAsia className="text-orange-600 dark:text-orange-400" />
    }
  ];

  // Technical Skills Data
  const technicalSkills = [
    { name: 'ERP Systems', level: 95 },
    { name: 'Excel (VBA)', level: 90 },
    { name: 'Data Analysis', level: 88 },
    { name: 'Process Automation', level: 85 },
    { name: 'Inventory Optimization', level: 92 },
    { name: 'SQL', level: 85 },
    { name: 'Power BI', level: 82 },
    { name: 'Python', level: 80 }
  ];

  // AI Tools Expertise
  const aiTools = [
    { name: 'ChatGPT', description: 'Advanced prompt engineering and AI-assisted workflows' },
    { name: 'Perplexity AI', description: 'Research and data analysis enhancement' },
  ];

  // Profile Card
  const ProfileCard = () => {
    const handleDownload = (e) => {
      e.preventDefault();
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = '/assets/Sahil_Ali_Cv.pdf';
      link.download = 'Sahil-Ali-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <AnimatedSection className="lg:col-span-1">
        <GlassCard className="h-full flex flex-col relative group overflow-visible">
          <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-xl overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 group-hover:-translate-y-2 z-10">
              <div className="relative h-36 w-36 rounded-2xl border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-xl">
                <img 
                  src="/Sahil-Portfolio/images/profile/profile.webp" 
                  alt="Sahil Ali - Inventory & Data Specialist" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="144"
                  height="144"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
          <div className="pt-16 pb-8 px-6 text-center flex-1 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sahil Ali</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 font-medium">
              Inventory & Data Specialist
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
              Transforming data into actionable insights and optimizing inventory operations with precision and efficiency.
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button 
                as="a" 
                href="https://www.linkedin.com/in/sahil-ali-714867242/" 
                target="_blank" 
                rel="noopener noreferrer nofollow" 
                size="sm" 
                variant="ghost"
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                aria-label="Connect on LinkedIn"
                title="Connect on LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </Button>
              <Button 
                as="a" 
                href="https://wa.me/919875771550" 
                target="_blank" 
                rel="noopener noreferrer nofollow" 
                size="sm" 
                variant="ghost"
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                aria-label="Message on WhatsApp"
                title="Message on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </Button>
              <Button 
                as="a" 
                href="mailto:sahilkhan36985@gmail.com"
                target="_blank"
                size="sm" 
                variant="ghost"
                className="w-10 h-10 p-0 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                aria-label="Send an email"
                title="Send an email"
              >
                <FiMail className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleDownload}
                variant="primary"
                size="sm"
                icon={FiDownload}
                iconPosition="left"
                className="w-full justify-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Download Resume"
              >
                Download CV
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-blue-400"></div>
        </GlassCard>
      </AnimatedSection>
    );
  };;

  // Main Content
  const MainContent = () => (
    <div className="lg:col-span-3 space-y-8">
      {/* About Me */}
      <AnimatedSection delay={1}>
        <Card className="relative overflow-hidden group">
          {/* Decorative gradient blob */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full filter blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 mr-4">
                <FaUserTie className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Professional Profile
              </h3>
            </div>
            
            <div className="prose dark:prose-invert max-w-none space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-medium text-gray-900 dark:text-white">Results-driven professional</span> with over 4 years of experience in inventory management, data analysis, and business process optimization. 
                Based in Rajasthan, India, I specialize in transforming complex data into strategic insights that drive operational excellence and business growth.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My expertise lies in leveraging cutting-edge technologies, including AI-powered analytics and automation tools, to optimize inventory levels, 
                reduce operational costs, and improve supply chain efficiency. I'm passionate about implementing data-driven solutions that enhance business 
                performance and create sustainable competitive advantages.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Beyond technical skills, I'm a collaborative problem-solver who thrives in dynamic environments. I believe in continuous learning and 
                staying ahead of industry trends to deliver innovative solutions that address real-world business challenges.
              </p>
            </div>
            
            {/* Skills chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Inventory Management', 'Data Analysis', 'Process Optimization', 'ERP Systems', 'Advanced Excel', 'Automation', 'Supply Chain', 'Business Intelligence'].map((skill, i) => (
                <SkillBadge 
                  key={i} 
                  text={skill} 
                  icon={<FaCheck className="text-green-500" />}
                  className="text-xs px-3 py-1.5 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700/70 transition-colors"
                />
              ))}
            </div>
          </div>
        </Card>
      </AnimatedSection>

      {/* Language Skills */}
      <AnimatedSection delay={2}>
        <Card className="relative overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full filter blur-3xl"></div>
          
          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 mr-4">
                <FaLanguage className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Language Skills
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languageSkills.map((language, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 hover:bg-white dark:hover:bg-gray-700/50 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                      {language.name}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {language.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            </div>
            
            
        </Card>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection delay={3} className="lg:col-span-4">
        <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full -mr-16 -mt-16 transform transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-white/5 rounded-full -ml-20 -mb-20 transform transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to Transform Your <span className="text-yellow-300">Business Operations</span>?
            </h3>
            <p className="text-indigo-100 text-base sm:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Let's collaborate to optimize your inventory, analyze your data, and implement efficient solutions that drive growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
              <Button
                as="a"
                href="/resume.pdf"
                download="Sahil-Ali-Resume.pdf"
                variant="secondary"
                size="lg"
                icon={FiDownload}
                iconPosition="left"
                className="w-full sm:w-auto justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Download My Resume"
              >
                Download My Resume
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto justify-center bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30"
                icon={FiMessageSquare}
                iconPosition="left"
                aria-label="Get in Touch"
              >
                Get In Touch
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 text-sm text-indigo-200">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span>Available for freelance projects</span>
              </div>
              <div className="hidden sm:block text-white/30">•</div>
              <a 
                href="https://wa.me/919875771550" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center hover:text-white transition-colors"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                <span>+91 98757 71550</span>
              </a>
              <div className="hidden sm:block text-white/30">•</div>
              <a 
                href="mailto:sahilkhan36985@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="flex items-center hover:text-white transition-colors"
                aria-label="Send an email"
              >
                <FiMail className="w-4 h-4 mr-2" />
                <span>sahilkhan36985@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" id="about">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="About " 
          subtitle="Crafting data-driven solutions and optimizing operations with precision and innovation."
          icon={<FaUserTie />}
          highlight="Me"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          <ProfileCard />
          <MainContent />
        </div>
      </div>
    </section>
  )
});

AboutSection.displayName = 'AboutSection';

const ExperienceSection = React.forwardRef((props, ref) => {
  const experiences = [
    {
      id: 1,
      role: 'Inventory Specialist & Cash Flow',
      company: 'Ekam Indian Groceries',
      location: 'Adelaide, Australia',
      duration: 'Dec 2023 – June 2025',
      achievements: [
        'Managed daily purchase entries, invoice verification, attendance tracking, and supplier coordination across dual store locations',
        'Automated reporting processes and supported cash flow documentation during manager absence',
        'Handled purchase data and fruit and vegetable invoices using ERP software and advanced Excel functions',
        'Cross-checked supplier invoices and reconciled statements to prevent overbilling, ensuring financial accuracy',
        'Maintained staff attendance and created daily cash reports',
        'Collaborated with the team to support inventory accuracy and operational flow, reducing stock issues significantly'
      ],
      highlights: [
        'Reduced billing errors and improved invoice match accuracy by 95%',
        'Saved over 4 hours per week through structured Excel logs and automation'
      ],
      tags: ['Inventory Management', 'Excel Automation', 'Financial Reporting', 'ERP Systems'],
      icon: <FaBriefcase />,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 2,
      role: 'GRN Officer',
      company: 'Bansal Supermarket',
      location: 'Surat, India',
      duration: 'Dec 2022 – Nov 2023',
      achievements: [
        'Responsible for goods receipt entries, invoice cross-checking, offer updates, and FIFO-based inventory flow',
        'Maintained operational registers including Top 100/200 item reports',
        'Managed GRNs, MRP/offer changes, and 10-item register maintenance with precision',
        'Conducted regular floor walks and enforced FIFO practices across departments to reduce waste',
        'Handled PI management, rate updates, and price accuracy for fast-moving items'
      ],
      highlights: [
        'Reduced stock discrepancies by 30% through enhanced GRN practices',
        'Improved offer accuracy and register organization across 500+ SKUs'
      ],
      tags: ['Goods Receipt', 'Inventory Control', 'FIFO Management', 'Vendor Coordination'],
      icon: <FaClipboardList />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      role: 'Warehouse Supervisor',
      company: 'Arzt Health & Private Limited',
      location: 'Jaipur, India',
      duration: 'June 2022 – Nov 2022',
      achievements: [
        'Oversaw stock control, warehouse documentation, and physical inventory across training material storage',
        'Ensured FIFO handling, audits, and timely replenishment',
        'Led day-to-day warehouse operations and staff coordination with a strong focus on efficiency',
        'Maintained accurate bin cards, stock logs, and conducted warehouse audits',
        'Implemented FIFO principles and organized material flow for training batches'
      ],
      highlights: [
        'Achieved 100% stock availability across training cycles',
        'Streamlined warehouse layout and improved stock handling speed'
      ],
      tags: ['Warehouse Management', 'Inventory Control', 'Team Leadership', 'Process Improvement'],
      icon: <FaWarehouse />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      role: 'Data Analyst & Automation Specialist',
      company: 'Self-Driven Projects & Automation',
      location: 'Remote',
      duration: '2024 – Present',
      achievements: [
        'Designed and developed a professional portfolio website to showcase data analytics, automation, and inventory management expertise',
        'Utilized cutting-edge AI and creative tools to enhance productivity, insights, and workflow automation',
        'Leveraged ChatGPT for code generation, SQL query optimization, and automating routine analysis tasks',
        'Incorporated Perplexity AI for real-time data insights, quick research, and refining data narratives',
        'Used advanced Google Sheets formulas and Apps Script to automate dashboards, KPI tracking, and vendor reporting',
        'Implemented dynamic data visualizations and streamlined reporting for personal and client projects'
      ],
      highlights: [
        'Created a fully automated portfolio site and project dashboards',
        'Enhanced productivity through AI-driven research and process automation'
      ],
      tags: ['Data Analysis', 'Automation', 'AI Integration', 'Dashboard Development'],
      icon: <FaRobot />,
      color: 'from-green-500 to-teal-500'
    }
  ];

  // Group experiences by year for timeline view
  const experiencesByYear = experiences.reduce((acc, exp) => {
    const year = exp.duration.split('–')[1]?.trim() || 'Present';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(exp);
    return acc;
  }, {});

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/30" id="experience">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="Professional Journey"
          subtitle="My career path and professional achievements"
          icon={<FaBriefcase />}
        />

        <div className="mt-16">
          {Object.entries(experiencesByYear).map(([year, yearExperiences], yearIndex) => (
            <motion.div 
              key={year} 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700 ml-[1.5rem] md:ml-[2.5rem]">
                <div className="absolute -left-1.5 top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900"></div>
              </div>
              
              <div className="ml-12 md:ml-20 mb-16">
                <motion.div 
                  className="inline-block px-4 py-1 mb-6 text-sm font-medium text-white bg-indigo-600 rounded-full"
                  variants={fadeInUp}
                >
                  {year}
                </motion.div>
                
                <div className="space-y-8">
                  {yearExperiences.map((exp, expIndex) => (
                    <motion.div 
                      key={exp.id}
                      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-l-4 border-${exp.color.split('-')[1]}-500`}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${exp.color} text-white`}>
                                {exp.icon}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <span className="font-medium">{exp.company}</span>
                                  <span className="hidden sm:block mx-2">•</span>
                                  <span>{exp.location}</span>
                                </div>
                                <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                                  {exp.duration}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2.5">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-indigo-200 dark:bg-indigo-700 mr-3"></span>
                                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {exp.highlights && exp.highlights.length > 0 && (
                              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/50 rounded-lg border border-blue-100 dark:border-gray-700">
                                <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center">
                                  <FaStar className="text-yellow-500 mr-2" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {exp.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-blue-500 mr-2 mt-1">✓</span>
                                      <span className="text-blue-700 dark:text-blue-300">{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {exp.tags && exp.tags.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {exp.tags.map((tag, i) => (
                              <span 
                                key={i}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

const AboutExperience = ({ initialSection = 'about' }) => {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const heroRef = useRef(null);

  // Handle initial scroll to section if there's a hash in the URL
  useEffect(() => {
    if (window.location.hash) {
      const section = window.location.hash.replace('#', '');
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Hero Section Component
  const HeroSection = () => (
    <section ref={heroRef} className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden px-4 sm:px-6 min-h-[80vh] flex items-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          {/* Animated grid pattern with subtle movement */}
          <motion.div 
            className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #6366f1 1px, transparent 1px),
                linear-gradient(to bottom, #6366f1 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f43f5e, #f59e0b)',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Floating elements with staggered animation */}
          <motion.div 
            className="absolute top-1/4 -left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute top-1/2 -right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              delay: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 25,
              delay: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FaUserTie className="mr-1.5" />
              <span>Professional Profile</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              About My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">Professional</span> <br className="hidden sm:block" />Journey & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Experience</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              With over 4 years of experience in inventory management, data analysis, and process optimization, I've helped businesses streamline operations and make data-driven decisions. Here's a closer look at my professional background and expertise.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a 
                href="#about"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaUserTie />
                About Me
              </a>
              <a 
                href="#experience"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaBriefcase />
                My Experience
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative max-w-md mx-auto lg:mr-0">
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Professional Business Analytics"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/fallback-image.jpg';
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10"></div>
              
              {/* Floating badges */}
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <FaClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Experience</p>
                    <p className="font-semibold text-gray-900 dark:text-white">4+ Years</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <FaCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                    <p className="font-semibold text-gray-900 dark:text-white">50+ Completed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </section>
  );



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main>
        <HeroSection ref={heroRef} />
        <AboutSection ref={aboutRef} />
        <ExperienceSection ref={experienceRef} />
      </main>
    </div>
  );
};

export default AboutExperience;
