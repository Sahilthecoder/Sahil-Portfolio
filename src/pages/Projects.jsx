import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilePdf, FaChartLine, FaDatabase, FaLaptopCode, FaTools, FaExternalLinkAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import Image from '../components/Image';
import { getImageUrl } from '../config/images';

// Project data
const projects = [
  {
    id: 'zomato',
    title: 'Zomato Market Expansion Analysis',
    description: 'Developed a comprehensive Excel dashboard analyzing Zomato\'s expansion strategy across Indian cities, providing actionable insights on market performance and growth opportunities.',
    icon: <FaChartLine className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    tags: ['Excel', 'Data Analysis', 'Market Strategy'],
    path: '/projects/zomato',
    image: getImageUrl('PROJECT1_COVER'),
    category: 'Market Analysis Dashboard',
    impact: 'Identified key growth opportunities and optimized expansion strategy by analyzing city-wise performance metrics.',
    badge: 'Excel'
  },
  {
    id: 'bansal-supermarket',
    title: 'Retail Sales Performance Dashboard',
    description: 'Designed an interactive Tableau dashboard tracking sales performance, customer behavior, and inventory metrics to support data-driven decision making for Bansal Supermarket.',
    icon: <FaDatabase className="w-6 h-6 text-green-600 dark:text-green-400" />,
    tags: ['Tableau', 'Sales Analytics', 'Retail Insights'],
    path: '/projects/bansal-supermarket',
    image: getImageUrl('PROJECT2_COVER'),
    category: 'Retail Analytics',
    impact: 'Drove 12% revenue growth through data-informed inventory optimization and targeted promotional strategies.',
    badge: 'Tableau'
  },
  {
    id: 'ekam-attendance',
    title: 'Automated HR Management System',
    description: 'Engineered a SQL and Google Sheets-based solution automating attendance tracking and payroll processing for Ekam Indian Groceries, Australia.',
    icon: <FaDatabase className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    tags: ['SQL', 'Google Sheets', 'Process Automation'],
    path: '/projects/ekam-attendance',
    image: getImageUrl('PROJECT3_COVER'),
    category: 'HR Automation',
    impact: 'Reduced monthly HR and accounting workload by 80% through process automation and streamlined reporting.',
    badge: 'SQL + Sheets'
  },
  {
    id: 'retail-cash-flow',
    title: 'Multi-Store Financial Dashboard',
    description: 'Developed a real-time Power BI dashboard for monitoring cash flow and financial transactions across multiple retail locations.',
    icon: <FaChartLine className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    tags: ['Power BI', 'Financial Analysis', 'Data Visualization'],
    path: '/projects/retail-cash-flow',
    image: getImageUrl('PROJECT4_COVER'),
    category: 'Financial Intelligence',
    impact: 'Enhanced financial oversight and reduced cash handling discrepancies through real-time transaction monitoring.',
    badge: 'Power BI'
  },
  {
    id: 'product-sales',
    title: 'Product Sales Automation & Insights Dashboard',
    description: 'Developed an automated sales tracking system combining SQL, Google Sheets, and Power BI to provide real-time insights and enable data-driven retail decisions.',
    icon: <FaChartLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    tags: ['SQL', 'Google Sheets', 'Power BI', 'Automation', 'Retail'],
    path: '/projects/product-sales',
    image: getImageUrl('PROJECT5_COVER'),
    category: 'Retail Analytics',
    impact: 'Reduced reporting time by 80% and decreased stockouts by 60% through automated data processing and real-time inventory tracking.',
    badge: 'SQL + Sheets + Power BI'
  },
  {
    id: 'automation-suite',
    title: 'Enterprise Automation Framework',
    description: 'Architected a suite of AI-powered automations using Zapier to streamline business operations, data processing, and reporting workflows.',
    icon: <FaTools className="w-6 h-6 text-red-600 dark:text-red-400" />,
    tags: ['Process Automation', 'AI Integration', 'Business Intelligence'],
    path: '/projects/automation-suite',
    image: getImageUrl('PROJECT6_COVER'),
    category: 'Business Automation',
    impact: 'Eliminated 60+ hours of monthly manual work through intelligent process automation and system integration.',
    badge: 'AI + Zapier'
  },
  {
    id: 'mahira-portfolio',
    title: 'AI-Enhanced Professional Portfolio',
    description: 'Crafted a sophisticated, responsive portfolio website with AI integration, showcasing professional work and capabilities through an intuitive user interface.',
    icon: <FaLaptopCode className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
    tags: ['Web Development', 'UI/UX Design', 'AI Integration'],
    path: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    image: getImageUrl('PROJECT7_COVER'),
    category: 'Digital Portfolio',
    impact: 'Enhanced professional visibility and attracted international clientele through modern, interactive presentation of work.',
    badge: 'Web + AI',
    isExternal: true
  }
];

const Projects = () => {
  const navigate = useNavigate();

  // Generate structured data for SEO
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: project.image,
        url: project.path.startsWith('http') ? project.path : window.location.origin + project.path
      }
    }))
  }), []);

  const handleProjectClick = (e, project) => {
    if (project.isExternal) {
      e.preventDefault();
      window.open(project.path, '_blank', 'noopener,noreferrer');
      // Track outbound link click
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Outbound Link',
          'event_label': project.path,
          'transport_type': 'beacon'
        });
      }
    }
  };

  // Process projects data
  const processedProjects = useMemo(() => projects.map(project => ({
    ...project,
    isExternal: project.path.startsWith('http'),
    image: project.image || '/images/placeholder.svg',
    category: project.category || 'Project',
    impact: project.impact || ''
  })), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg px-4">
      <SEO 
        title="My Projects"
        description="Explore my portfolio of professional projects showcasing my skills and experience."
        type="website"
        image={getImageUrl('OG_PROJECTS')}
        structuredData={structuredData}
      />
      {/* Hero Section with Animated Blobs */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-dark-bg dark:bg-gradient-to-br dark:from-dark-bg-gradient dark:to-dark-bg">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-dark-primary/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-dark-accent/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-dark-accent-pink/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-dark-text-heading mb-6 leading-tight">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-dark-primary dark:to-dark-accent">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-text-body/80 max-w-3xl mx-auto leading-relaxed">
              Explore my portfolio of data-driven solutions and innovative projects that demonstrate my expertise and creativity.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-8 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <motion.main 
        className="max-w-7xl mx-auto py-8 sm:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProjects.map((project, index) => (
            <Link
              key={project.id}
              to={project.isExternal ? '#' : project.path}
              onClick={(e) => handleProjectClick(e, project)}
              className="group block h-full hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              aria-label={`View ${project.title} project`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-xl"
              >
                <div className="relative w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title} project`}
                        width={800}
                        height={450}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold tracking-wide uppercase text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto space-y-4">
                    {project.impact && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                        <div className="flex items-start">
                          <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                            <span className="font-semibold text-blue-800 dark:text-blue-200">Impact: </span>{project.impact}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700/60 dark:text-gray-200 border border-gray-200 dark:border-gray-600 whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600/60 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mb-12 mt-8">
          <a 
            href="/Sahil_Ali_Cv.pdf" 
            download="Sahil_Ali_Resume.pdf"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            aria-label="Download my resume (PDF)"
            onMouseDown={e => e.preventDefault()}
            onKeyDown={e => e.key === 'Enter' && e.target.click()}
            tabIndex="0"
            role="button"
          >
            <FaFilePdf className="mr-2" aria-hidden="true" />
            <span>Download My Resume</span>
            <span className="sr-only">(Opens in a new tab)</span>
            <FaExternalLinkAlt className="ml-2 w-3 h-3 opacity-70" aria-hidden="true" />
          </a>
        </div>
      </motion.main>
    </div>
  );
};

export default Projects;
