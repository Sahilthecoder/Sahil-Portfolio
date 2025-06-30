import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, 
  FaChartPie, 
  FaBox, 
  FaSearchDollar, 
  FaShoppingBasket, 
  FaChartBar, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaFileExcel,
  FaCheckCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTable,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProjectImage from '../../components/ProjectImage';

const BansalSupermarket = () => {
  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Project metadata
  const projectMeta = {
    title: "AI-Powered Retail Intelligence Platform",
    tagline: "Transforming Retail with Predictive Analytics",
    description: "An advanced AI-driven analytics solution that revolutionized inventory management and sales forecasting for Bansal Supermarket, leveraging machine learning to optimize stock levels and maximize profitability.",
    tags: ["AI/ML", "Predictive Analytics", "Inventory Optimization", "Retail Intelligence"],
    role: "AI & Data Solutions Architect",
    timeline: "Q2 2023 - Present",
    tools: ["Tableau", "Python (Scikit-learn, TensorFlow)", "SQL", "AI/ML Models"]
  };

  // Image gallery data with dimensions (width, height)
  const images = [
    { 
      id: 'bansal-dashboard', 
      name: 'bs2.avif', 
      alt: 'Bansal Supermarket Dashboard',
      description: 'Interactive dashboard showing sales performance and key metrics',
      insights: [
        "Real-time sales tracking across all store locations",
        "Performance comparison against quarterly targets",
        "Top-performing product categories and SKUs"
      ],
      featured: true,
      width: 1920,
      height: 1080,
      aspectRatio: '16/9'
    },
    { 
      id: 'bansal-category', 
      name: 'bs3.avif', 
      alt: 'Category Analysis: Food vs Non-Food',
      description: 'Detailed breakdown of sales by product category',
      insights: [
        "Revenue contribution by category",
        "Margin analysis across product lines",
        "Seasonal performance trends"
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2'
    },
    { 
      id: 'bansal-top-products', 
      name: 'bs-top-products.avif', 
      alt: 'Top Selling Products',
      description: 'Visualization of best-selling products by volume and revenue',
      insights: [
        "Fastest moving inventory items",
        "Revenue contribution by SKU",
        "Inventory turnover rates"
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2'
    },
    { 
      id: 'bansal-stock-turnover', 
      name: 'bs-stockTO.avif', 
      alt: 'Stock Turnover Analysis',
      description: 'Analysis of inventory turnover rates by product category',
      insights: [
        "Slow-moving vs fast-moving inventory",
        "Stock replenishment recommendations",
        "Carrying cost analysis"
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2'
    },
    { 
      id: 'bansal-sales-profit', 
      name: 'bs-saleVSpft.avif', 
      alt: 'Sales vs Profit Analysis',
      description: 'Scatter plot comparing sales volume against profit margins',
      insights: [
        "High-value, high-margin products",
        "Pricing optimization opportunities",
        "Product performance segmentation"
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2'
    }
  ];

  // Stats data
  const stats = [
    { 
      icon: <FaShoppingBasket className="w-6 h-6" />, 
      label: 'AI Predictions', 
      value: '95%',
      color: 'blue',
      darkColor: 'blue-700',
      description: 'Forecast accuracy rate'
    },
    { 
      icon: <FaChartLine className="w-6 h-6" />, 
      label: 'Inventory Reduction', 
      value: '30%',
      color: 'indigo',
      darkColor: 'indigo-700',
      description: 'Decrease in excess stock'
    },
    { 
      icon: <FaBox className="w-6 h-6" />, 
      label: 'Stockouts Prevented', 
      value: '85%',
      color: 'purple',
      darkColor: 'purple-700',
      description: 'Reduction in out-of-stock events'
    },
    { 
      icon: <FaSearchDollar className="w-6 h-6" />, 
      label: 'Profit Boost', 
      value: '22%',
      color: 'green',
      darkColor: 'green-700',
      description: 'Increase in net profit margin'
    },
    { 
      icon: <FaChartPie className="w-6 h-6" />, 
      label: 'AI Models', 
      value: '7+',
      color: 'violet',
      darkColor: 'violet-700',
      description: 'Specialized ML models deployed'
    },
    { 
      icon: <FaChartLine className="w-6 h-6" />, 
      label: 'Process Automation', 
      value: '15',
      color: 'purple',
      darkColor: 'purple-700',
      description: 'Automated workflows'
    },
    { 
      icon: <FaChartLine className="w-6 h-6" />, 
      label: 'Data Points', 
      value: '2.5M+',
      color: 'indigo',
      darkColor: 'indigo-700',
      description: 'Processed daily'
    }
  ];

  // Tech stack data
  const techStack = [
    { name: 'Machine Learning', icon: '🤖', color: 'blue' },
    { name: 'Tableau', icon: '📊', color: 'indigo' },
    { name: 'Python (Scikit-learn)', icon: '🐍', color: 'green' },
    { name: 'Predictive Analytics', icon: '🔮', color: 'purple' }
  ];

  // Calculate image container style based on image dimensions
  const getImageContainerStyle = (image) => {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;
    
    let width = image.width;
    let height = image.height;
    
    // Scale down if image is larger than viewport
    if (width > maxWidth) {
      const ratio = maxWidth / width;
      width *= ratio;
      height *= ratio;
    }
    
    if (height > maxHeight) {
      const ratio = maxHeight / height;
      width *= ratio;
      height *= ratio;
    }
    
    return {
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: '90vw',
      maxHeight: '80vh'
    };
  };

  // Open image in modal
  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate between images in modal
  const navigateImage = (direction) => (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Reusable ImageContainer component
  const ImageContainer = ({ image, index, className = '', onClick, isModal = false }) => {
    const imagePath = `/Sahil-Portfolio/images/projects/Project2 tableau/${image.name}`;
    
    const content = (
      <div 
        className={`relative ${!isModal ? 'group cursor-pointer' : ''} ${className}`}
        onClick={!isModal ? () => onClick ? onClick(index) : openImage(index) : undefined}
      >
        {isModal ? (
          // Modal view - full screen image
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={imagePath}
              alt={image.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/Sahil-Portfolio/images/placeholder.svg';
              }}
            />
          </div>
        ) : (
          // Gallery view - simple container
          <div className="relative w-full h-full">
            <img 
              src={imagePath}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/Sahil-Portfolio/images/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <span className="text-white bg-black/70 px-4 py-2 rounded-full text-sm font-medium">
                Click to view full size
              </span>
            </div>
          </div>
        )}
      </div>
    );

    if (isModal) {
      return content;
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        {content}
      </div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Cover Image */}
        <div className="relative rounded-2xl overflow-hidden mb-12 h-96">
          <ProjectImage
            projectId="Project2 tableau"
            imageName="Project2 Cover.avif"
            alt="Bansal Supermarket Dashboard"
            className="w-full h-full object-cover"
            zoomOnHover={false}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
          <div className="absolute bottom-0 right-0 p-8 max-w-2xl">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">Bansal Supermarket Analytics</h1>
              <p className="text-xl text-gray-100 mb-6">Data-driven insights for retail optimization and growth</p>
              <div className="flex flex-wrap justify-end gap-2">
                {['#RetailAnalytics', '#InventoryManagement', '#SalesOptimization', '#DataVisualization'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white text-sm rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="space-y-8">
            {/* Project Title and Description */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Project Overview</h2>
              <p className="text-gray-600 dark:text-gray-300/90 leading-relaxed max-w-3xl">
                A comprehensive analysis of Bansal Supermarket's sales data to derive actionable insights for inventory management, 
                pricing strategies, and sales optimization. This project focuses on understanding customer purchasing patterns, 
                product performance, and inventory turnover to drive business growth.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-${stat.color}-50 dark:bg-gray-800 p-4 rounded-lg border border-${stat.color}-100 dark:border-gray-700 transition-colors duration-200 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-opacity-20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{stat.value}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{stat.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className={`bg-${tech.color}-50 dark:bg-gray-800 p-4 rounded-lg border border-${tech.color}-100 dark:border-gray-700 transition-colors duration-200 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${tech.color}-100 dark:bg-opacity-20 text-${tech.color}-600 dark:text-${tech.color}-400`}>
                      {tech.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{tech.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags and Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['#RetailAnalytics', '#InventoryManagement', '#SalesOptimization', '#DataVisualization'].map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/Sahilthecoder/Sahil-Portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium py-2.5 px-6 rounded-lg text-center border-2 border-indigo-700 dark:border-indigo-600 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">View Code</span>
                      <FaGithub className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 w-4 h-4" />
                    </span>
                    <span className="absolute inset-0 bg-indigo-50/80 dark:bg-indigo-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium py-2.5 px-6 rounded-lg text-center border-2 border-blue-600 dark:border-blue-500 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">View Dashboard</span>
                      <FaExternalLinkAlt className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 w-3.5 h-3.5" />
                    </span>
                    <span className="absolute inset-0 bg-blue-50/80 dark:bg-blue-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualizations */}
        <div className="space-y-16">
          {/* Main Dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Bansal Supermarket - Sales Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Comprehensive overview of sales performance, top products, and revenue metrics</p>
            <ImageContainer 
              image={images[0]} 
              index={0} 
              className="w-full"
            />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Dashboard overview: Top selling items, profitability, and key metrics visualized from Bansal Supermarket sales data.
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This analysis breaks down sales between Food and Non-Food categories, highlighting the dominant segment in Bansal Supermarket's product mix. Understanding this distribution helps in strategic inventory planning and marketing focus.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">Identifies top-performing categories for inventory focus</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">Helps in optimizing shelf space allocation</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">Guides promotional strategies for underperforming categories</span>
            </li>
          </ul>

          {/* Top 10 Items */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top 10 Products by Sales Volume</h3>
            <ImageContainer 
              image={images[1]} 
              index={1} 
              className="w-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300">
              This visualization highlights the top 10 best-selling products in Bansal Supermarket. The horizontal bar chart provides a clear comparison of sales performance across different items, allowing for quick identification of high-demand products that drive revenue.
            </p>
          </div>

          {/* Stock Turnover Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Inventory Turnover Analysis</h3>
            <ImageContainer 
              image={images[3]} 
              index={3} 
              className="w-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300">
              The stock turnover rate analysis shows how quickly inventory is sold and replaced over a specific period. This metric is crucial for inventory management, helping to identify slow-moving items that may require promotional support or discontinuation, as well as fast-moving items that may need increased stock levels.
            </p>
          </div>

          {/* Sales vs Profit Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profitability Analysis by Product</h3>
            <ImageContainer 
              image={images[4]} 
              index={4} 
              className="w-full mb-6"
            />
            <p className="text-gray-600 dark:text-gray-300">
              This scatter plot compares sales volume against profit margins across different products. It helps identify:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>High Sales, High Margin</strong> (Stars): Focus on these products</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>High Sales, Low Margin</strong>: Consider price optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Low Sales, High Margin</strong>: Potential for promotion</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Low Sales, Low Margin</strong>: Candidates for discontinuation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Impact Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Business Value</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Sales Optimization',
                description: 'Identified top-performing products and categories to focus inventory and marketing efforts.',
                icon: <FaChartLine className="w-6 h-6 text-blue-500" />,
                borderClass: 'border-blue-100 dark:border-blue-900/30',
                bgGradient: 'from-blue-50/50',
                bgClass: 'bg-blue-100',
                darkFrom: 'dark:from-blue-900/10'
              },
              {
                title: 'Inventory Management',
                description: 'Reduced overstock and stockouts through predictive inventory analysis.',
                icon: <FaBox className="w-6 h-6 text-indigo-500" />,
                borderClass: 'border-indigo-100 dark:border-indigo-900/30',
                bgGradient: 'from-indigo-50/50',
                bgClass: 'bg-indigo-100',
                darkFrom: 'dark:from-indigo-900/10'
              },
              {
                title: 'Pricing Strategy',
                description: 'Optimized pricing based on demand elasticity and competitor analysis.',
                icon: <FaSearchDollar className="w-6 h-6 text-purple-500" />,
                borderClass: 'border-purple-100 dark:border-purple-900/30',
                bgGradient: 'from-purple-50/50',
                bgClass: 'bg-purple-100',
                darkFrom: 'dark:from-purple-900/10'
              },
              {
                title: 'Customer Insights',
                description: 'Identified customer preferences and shopping patterns for targeted marketing.',
                icon: <FaShoppingBasket className="w-6 h-6 text-green-500" />,
                borderClass: 'border-green-100 dark:border-green-900/30',
                bgGradient: 'from-green-50/50',
                bgClass: 'bg-green-100',
                darkFrom: 'dark:from-green-900/10'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl border ${item.borderClass} bg-gradient-to-br ${item.bgGradient} to-transparent ${item.darkFrom} dark:to-transparent hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-lg ${item.bgClass} dark:bg-opacity-20`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300/90 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeImage}
            >
              <button 
                type="button"
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  closeImage();
                }}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              
              <button 
                type="button"
                className="absolute left-4 text-white hover:text-gray-300 text-2xl p-2 bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              
              <div 
                className="relative mx-auto max-w-4xl w-full" 
                onClick={(e) => e.stopPropagation()}
                style={getImageContainerStyle(selectedImage)}
                role="dialog"
                aria-modal="true"
                aria-label="Image viewer"
              >
                <ImageContainer 
                  image={selectedImage}
                  index={currentIndex}
                  isModal={true}
                />
                <p className="text-white text-center mt-2 text-sm md:text-base">
                  {selectedImage.alt} ({currentIndex + 1}/{images.length})
                </p>
              </div>
              
              <button 
                type="button"
                className="absolute right-4 text-white hover:text-gray-300 text-2xl p-2 bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Projects Button */}
        <div className="mt-16 mb-8 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Projects
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BansalSupermarket;
