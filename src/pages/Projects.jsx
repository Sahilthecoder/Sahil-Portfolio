import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, 
  FaDatabase, 
  FaFilePdf, 
  FaExternalLinkAlt, 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaArrowUp,
  FaLaptopCode,
  FaCalendarAlt,
  FaArrowRight,
  FaTools,
  FaGithub
} from 'react-icons/fa';
import SEO from '../components/SEO';
import ProjectImage from '../components/ProjectImage';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    } 
  }
};

// Helper function to handle image loading errors
const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = '/Sahil-Portfolio/images/placeholder.svg';
};

// Categories for filtering - updated to match project categories
const categories = [
  { id: 'all', name: 'All Projects', icon: '📊' },
  { id: 'dashboard', name: 'Data Visualization', icon: '📊' },
  { id: 'analysis', name: 'Data Analysis', icon: '📈' },
  { id: 'excel', name: 'Excel', icon: '📋' },
  { id: 'tableau', name: 'Tableau', icon: '📊' },
  { id: 'sql', name: 'SQL', icon: '🗃️' },
  { id: 'web', name: 'Web Development', icon: '🌐' },
  { id: 'ai', name: 'AI/ML', icon: '🤖' }
];

// Project data
const projects = [
  {
    id: 'zomato',
    title: 'Zomato Market Expansion Analysis',
    description: 'Comprehensive analysis of Zomato\'s expansion strategy across Indian cities with actionable market insights.',
    icon: <FaChartLine className="w-5 h-5 text-blue-500" />,
    tags: ['Excel', 'Data Analysis', 'Market Strategy'],
    path: '/projects/zomato-analysis',
    image: '/Sahil-Portfolio/images/projects/Project1 excel/Project1 Cover.avif',
    category: ['dashboard', 'analysis'],
    impact: 'Identified key growth opportunities and optimized expansion strategy by analyzing city-wise performance metrics.',
    badge: 'Excel',
    featured: true,
    date: '2024-03-15',
    readTime: '5 min read',
    highlights: [
      'Analyzed 10,000+ data points',
      'Identified top 5 high-potential cities',
      'Increased market penetration by 30%'
    ]
  },
  {
    id: 'bansal-supermarket',
    title: 'Retail Sales Performance Dashboard',
    description: 'Designed an interactive Tableau dashboard tracking sales performance, customer behavior, and inventory metrics to support data-driven decision making for Bansal Supermarket.',
    icon: <FaDatabase className="w-6 h-6 text-green-600 dark:text-green-400" />,
    tags: ['Tableau', 'Sales Analytics', 'Retail Insights'],
    path: '/projects/bansal-supermarket',
    image: '/Sahil-Portfolio/images/projects/Project2 tableau/Project2 Cover.avif',
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
    image: '/Sahil-Portfolio/images/projects/Project3 Sql+Sheets/Project3 Cover.avif',
    category: 'HR Automation',
    impact: 'Reduced monthly HR and accounting workload by 80% through process automation and streamlined reporting.',
    badge: 'SQL + Sheets'
  },
  {
    id: 'retail-cash-flow',
    title: 'Multi-Store Financial Dashboard',
    description: 'Developed a real-time Power BI dashboard for monitoring cash flow and financial transactions across multiple retail locations.',
    icon: <FaChartLine className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    tags: ['Power BI', 'Financial Analytics', 'Data Visualization'],
    path: '/projects/retail-cash-flow',
    image: '/Sahil-Portfolio/images/projects/Project4 Power BI/Project4 Cover.avif',
    category: 'Financial Analytics',
    impact: 'Improved financial visibility and reduced reporting time by 90% with automated data processing and visualization.',
    badge: 'Power BI'
  },
  {
    id: 'product-sales',
    title: 'E-commerce Sales Analytics Platform',
    description: 'Built a comprehensive sales analytics platform using Python and Streamlit to track product performance and customer behavior.',
    icon: <FaChartLine className="w-6 h-6 text-red-600 dark:text-red-400" />,
    tags: ['Python', 'Streamlit', 'Data Analysis'],
    path: '/projects/product-sales',
    image: '/Sahil-Portfolio/images/projects/Project5 Gpt+Notion/Project5 Cover.avif',
    category: 'E-commerce Analytics',
    impact: 'Enhanced decision-making with real-time sales insights and predictive analytics.',
    badge: 'Python + Streamlit'
  },
  {
    id: 'snape-sentiment-analysis',
    title: 'Snape Sentiment Analysis',
    description: 'Conducted sentiment analysis on Severus Snape character dialogue from the Harry Potter series using Python and NLTK to uncover emotional patterns and character development.',
    icon: <FaTools className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    tags: ['Python', 'NLTK', 'Sentiment Analysis', 'Data Visualization'],
    path: '/projects/snape-sentiment-analysis',
    image: '/Sahil-Portfolio/images/projects/Project6 Gpt+Zapier/Project6 Cover.avif',
    category: 'NLP Project',
    impact: 'Revealed deep insights into character development and emotional arcs through data-driven analysis.',
    badge: 'Python + NLTK'
  },
  {
    id: 'mahira-portfolio',
    title: 'AI-Enhanced Professional Portfolio',
    description: 'Crafted a sophisticated, responsive portfolio website with AI integration, showcasing professional work and capabilities through an intuitive user interface.',
    icon: <FaLaptopCode className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
    tags: ['React', 'AI Integration', 'Responsive Design'],
    path: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    image: '/Sahil-Portfolio/images/projects/Mahira Portfolio Web+AI/Project7 Cover.avif',
    category: 'Digital Portfolio',
    impact: 'Enhanced professional visibility and attracted international clientele through modern, interactive presentation of work.',
    badge: 'Web + AI',
    isExternal: true
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  
  // Animation variants for the projects grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Handle scroll to top
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

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

  // Handle project click with analytics
  const handleProjectClick = (e, project) => {
    if (project.isExternal) {
      e.preventDefault();
      window.open(project.path, '_blank', 'noopener,noreferrer');
      if (window.gtag) {
        window.gtag('event', 'click', {
          'event_category': 'Outbound Link',
          'event_label': project.path,
          'transport_type': 'beacon'
        });
      }
    } else {
      e.preventDefault();
      navigate(project.path);
    }
  };

  // Enhanced project processing with modern features
  const { filteredProjects, allSkills, allTags, categoryMetadata } = useMemo(() => {
    // Skill and category mapping with metadata
    const metadata = {
      dashboard: { name: 'Data Visualization', icon: '📊', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      analysis: { name: 'Data Analysis', icon: '📈', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
      excel: { name: 'Excel', icon: '📋', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      tableau: { name: 'Tableau', icon: '📊', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
      sql: { name: 'SQL', icon: '🗃️', color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400' },
      web: { name: 'Web Dev', icon: '🌐', color: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-400' },
      ai: { name: 'AI/ML', icon: '🤖', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400' },
      automation: { name: 'Automation', icon: '⚡', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' },
      other: { name: 'Other', icon: '📌', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' }
    };

    // Extract all unique skills and tags
    const skills = new Set();
    const tags = new Set();

    const normalizeCategory = (category) => {
      if (!category) return 'other';
      const normalized = category.toString().toLowerCase().trim();
      return Object.keys(metadata).includes(normalized) ? normalized : 'other';
    };

    const processed = projects.map(project => {
      // Normalize categories
      const projectCategories = Array.isArray(project.category) 
        ? project.category.map(normalizeCategory)
        : [normalizeCategory(project.category)];

      // Process tags and skills
      (project.tags || []).forEach(tag => {
        const normalizedTag = tag.trim().toLowerCase();
        if (normalizedTag) {
          tags.add(normalizedTag);
          if (['excel', 'tableau', 'sql', 'python', 'javascript', 'react', 'node', 'ai', 'ml', 'automation'].includes(normalizedTag)) {
            skills.add(normalizedTag);
          }
        }
      });

      // Generate consistent color based on project ID
      const accentColor = `hsl(${Math.abs(project.id.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)) % 360}, 70%, 60%)`;

      return {
        ...project,
        isExternal: project.path?.startsWith?.('http') || false,
        image: project.image || '/Sahil-Portfolio/images/placeholder.svg',
        categories: [...new Set(projectCategories)],
        impact: project.impact || '',
        date: project.date || '2024-01-01',
        readTime: project.readTime || '5 min read',
        accentColor
      };
    });

    // Filter projects based on search and active category
    const filtered = processed.filter(project => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchFields = [
          project.title,
          project.description,
          ...(project.tags || []),
          ...project.categories.map(cat => metadata[cat]?.name || cat)
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchLower)) return false;
      }
      
      if (activeCategory !== 'all') {
        return project.categories.some(cat => cat === activeCategory);
      }
      
      return true;
    });

    return {
      filteredProjects: filtered,
      allSkills: Array.from(skills).sort(),
      allTags: Array.from(tags).sort(),
      categoryMetadata: metadata
    };
  }, [searchTerm, activeCategory]);

  // Toggle mobile filters
  const toggleFilters = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEO 
        title="My Projects | Portfolio"
        description="Explore my portfolio of professional projects showcasing expertise in data analysis, visualization, and web development."
        type="website"
        image="/images/og-image.jpg"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/50"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6">
              <span className="mr-2">✨</span> Featured Projects
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore a collection of my professional work, from data visualization to web development, each crafted with attention to detail and user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <motion.main 
        className="py-12 sm:py-16 relative"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <motion.div 
                className="relative w-full sm:max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  placeholder="Search projects by title, tech, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search projects"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Clear search"
                  >
                    <FaTimes className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                  </motion.button>
                )}
              </motion.div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={toggleFilters}
                  className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-expanded={isFilterOpen}
                  aria-controls="filter-dropdown"
                >
                  <FaFilter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                
                <div className="hidden sm:flex items-center gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ 
                        y: -2,
                        scale: 1.03,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md transform -translate-y-0.5'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-sm'
                      }`}
                      aria-current={activeCategory === category.id ? 'page' : undefined}
                    >
                      <span className="mr-2 text-base">{category.icon}</span>
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Dropdown */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  id="filter-dropdown"
                  initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    transition: { 
                      opacity: { duration: 0.2 },
                      height: { duration: 0.3, ease: 'easeInOut' },
                      marginTop: { duration: 0.3, ease: 'easeInOut' },
                      marginBottom: { duration: 0.3, ease: 'easeInOut' }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    marginTop: 0, 
                    marginBottom: 0,
                    transition: { 
                      opacity: { duration: 0.2 },
                      height: { duration: 0.2, ease: 'easeInOut' },
                      marginTop: { duration: 0.2, ease: 'easeInOut' },
                      marginBottom: { duration: 0.2, ease: 'easeInOut' }
                    }
                  }}
                  className="overflow-hidden sm:hidden"
                >
                  <div className="flex flex-wrap gap-2 p-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        layoutId={`mobile-filter-${category.id}`}
                        initial={false}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                        }`}
                        aria-current={activeCategory === category.id ? 'page' : undefined}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700"
                  style={{
                    '--accent-color': project.accentColor,
                    '--accent-light': `${project.accentColor}15`
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-color)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Link
                    to={project.path}
                    onClick={(e) => handleProjectClick(e, project)}
                    className={`relative overflow-hidden rounded-2xl shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-900/50 ${
                      project.isExternal ? 'cursor-newtab' : 'cursor-pointer'
                    }`}
                    aria-label={`View ${project.title} project`}
                  >
                    <motion.div
                      className="h-full flex flex-col overflow-hidden"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative pt-[56.25%] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/20 text-white/80">
                                  +{project.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {project.icon || <FaChartLine className="w-5 h-5 text-gray-400" />}
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {project.badge || 'Project'}
                            </span>
                          </div>
                          {project.categories?.[0] && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryMetadata[project.categories[0]]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                              {categoryMetadata[project.categories[0]]?.name || project.categories[0]}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                          {project.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FaCalendarAlt className="mr-1.5 h-4 w-4 flex-shrink-0" />
                              <span>{project.date ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Ongoing'}</span>
                            </div>
                            <Link
                              to={project.path}
                              onClick={(e) => handleProjectClick(e, project)}
                              className="inline-flex items-center text-sm font-medium text-[var(--accent-color)] hover:opacity-80 transition-opacity"
                            >
                              View Project
                              <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 text-gray-300 dark:text-gray-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any projects matching your search. Try adjusting your filters.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </motion.main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollTop}
            className="fixed right-6 bottom-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Resume Download Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Looking for more details?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Download my full resume to see more about my experience, skills, and professional background.
          </p>
          <a 
            href="/Sahil_Ali_Cv.pdf" 
            download="Sahil_Ali_Resume.pdf"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            aria-label="Download my resume (PDF)"
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
            tabIndex={0}
            role="button"
          >
            <FaFilePdf className="mr-2" aria-hidden="true" />
            <span>Download My Resume</span>
            <span className="sr-only">(Opens in a new tab)</span>
            <FaExternalLinkAlt className="ml-2 w-3 h-3 opacity-70" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
