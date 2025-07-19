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
  FaChevronUp,
  FaChevronDown,
  FaTable,
  FaArrowLeft,
  FaExpand,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const gradientAnimation = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
};

const BansalSupermarket = () => {
  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Project metadata
  const projectMeta = {
    title: 'AI-Powered Retail Intelligence Platform',
    tagline: 'Transforming Retail with Predictive Analytics',
    description:
      'An advanced AI-driven analytics solution that revolutionized inventory management and sales forecasting for Bansal Supermarket, leveraging machine learning to optimize stock levels and maximize profitability.',
    tags: ['AI/ML', 'Predictive Analytics', 'Inventory Optimization', 'Retail Intelligence'],
    role: 'AI & Data Solutions Architect',
    timeline: 'Q2 2023 - Present',
    tools: ['Tableau', 'Python (Scikit-learn, TensorFlow)', 'SQL', 'AI/ML Models'],
  };

  // Image gallery data with dimensions (width, height)
  const images = [
    {
      id: 'bansal-dashboard',
      name: 'Project2 Cover',
      alt: 'Bansal Supermarket Dashboard',
      description: 'Interactive dashboard showing sales performance and key metrics',
      insights: [
        'Real-time sales tracking across all store locations',
        'Performance comparison against quarterly targets',
        'Top-performing product categories and SKUs',
      ],
      featured: true,
      width: 1600,
      height: 900,
      aspectRatio: '16/9',
      containerClass: 'h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/images/projects/Project2_tableau/Project2_Cover-1200w.webp',
      thumbnail: '/images/projects/Project2_tableau/Project2_Cover-300w.webp',
    },
    {
      id: 'bansal-category',
      name: 'bs3',
      alt: 'Category Analysis: Food vs Non-Food',
      description: 'Detailed breakdown of sales by product category',
      insights: [
        'Revenue contribution by category',
        'Margin analysis across product lines',
        'Seasonal performance trends',
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2',
      containerClass: 'h-80 md:h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/Sahil-Portfolio/images/projects/Project2_tableau/bs3.webp',
    },
    {
      id: 'bansal-top-products',
      name: 'bs-top10',
      alt: 'Top Selling Products',
      description: 'Visualization of best-selling products by volume and revenue',
      insights: [
        'Fastest moving inventory items',
        'Revenue contribution by SKU',
        'Inventory turnover rates',
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2',
      containerClass: 'h-80 md:h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/Sahil-Portfolio/images/projects/Project2_tableau/bs-top10.webp',
    },
    {
      id: 'bansal-stock-turnover',
      name: 'bs-stockTO',
      alt: 'Stock Turnover Analysis',
      description: 'Analysis of inventory turnover rates by product category',
      insights: [
        'Slow-moving vs fast-moving inventory',
        'Stock replenishment recommendations',
        'Carrying cost analysis',
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2',
      containerClass: 'h-80 md:h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/Sahil-Portfolio/images/projects/Project2_tableau/bs-stockTO.webp',
    },
    {
      id: 'bansal-sales-profit',
      name: 'bs-saleVSpft',
      alt: 'Sales vs Profit Analysis',
      description: 'Correlation between sales volume and profit margins',
      insights: [
        'High-margin vs high-volume products',
        'Pricing strategy effectiveness',
        'Opportunities for margin improvement',
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2',
      containerClass: 'h-80 md:h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/Sahil-Portfolio/images/projects/Project2_tableau/bs-saleVSpft.webp',
    },
    {
      id: 'bansal-customer-segments',
      name: 'bs2',
      alt: 'Customer Segmentation Analysis',
      description: 'Customer groups based on purchasing behavior',
      insights: [
        'High-value customer identification',
        'Personalized marketing opportunities',
        'Loyalty program effectiveness',
      ],
      featured: false,
      width: 1200,
      height: 800,
      aspectRatio: '3/2',
      containerClass: 'h-80 md:h-96',
      projectId: 'bansal',
      ext: 'webp',
      path: '/Sahil-Portfolio/images/projects/Project2_tableau/bs2.webp',
    },
  ];

  // Stats data
  const stats = [
    {
      icon: <FaShoppingBasket className="w-6 h-6" />,
      label: 'AI Predictions',
      value: '95%',
      color: 'blue',
      darkColor: 'blue-700',
      description: 'Forecast accuracy rate',
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      label: 'Inventory Reduction',
      value: '30%',
      color: 'indigo',
      darkColor: 'indigo-700',
      description: 'Decrease in excess stock',
    },
    {
      icon: <FaBox className="w-6 h-6" />,
      label: 'Stockouts Prevented',
      value: '85%',
      color: 'purple',
      darkColor: 'purple-700',
      description: 'Reduction in out-of-stock events',
    },
    {
      icon: <FaSearchDollar className="w-6 h-6" />,
      label: 'Profit Boost',
      value: '22%',
      color: 'green',
      darkColor: 'green-700',
      description: 'Increase in net profit margin',
    },
    {
      icon: <FaChartPie className="w-6 h-6" />,
      label: 'AI Models',
      value: '7+',
      color: 'violet',
      darkColor: 'violet-700',
      description: 'Specialized ML models deployed',
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      label: 'Process Automation',
      value: '15',
      color: 'purple',
      darkColor: 'purple-700',
      description: 'Automated workflows',
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      label: 'Data Points',
      value: '2.5M+',
      color: 'indigo',
      darkColor: 'indigo-700',
      description: 'Processed daily',
    },
  ];

  // Tech stack data
  const techStack = [
    { name: 'Machine Learning', icon: '🤖', color: 'blue' },
    { name: 'Tableau', icon: '📊', color: 'indigo' },
    { name: 'Python (Scikit-learn)', icon: '🐍', color: 'green' },
    { name: 'Predictive Analytics', icon: '🔮', color: 'purple' },
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
      maxHeight: '80vh',
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

  // Reusable ImageContainer component with improved styling
  const ImageContainer = ({ image, index, className = '', onClick, isModal = false }) => {
    if (!image) return null;

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick(index);
      } else {
        openImage(index);
      }
    };

    // Get the image path from the image object
    const getImagePath = (img) => {
      if (!img) return '';

      // If we have a direct path, use it
      if (img.path) {
        return img.path;
      }

      // Fallback to constructing the path
      const basePath = '/images/projects/Project2%20tableau';
      const name = (img.name || '').replace(/ /g, '%20');
      const ext = img.ext || 'webp';

      // For the hero image, use the full size
      if (img.featured) {
        return `${basePath}/${name}.${ext}`;
      }

      // For thumbnails, use the smallest size
      if (!isModal && typeof window !== 'undefined') {
        let size = '';
        if (window.innerWidth <= 768) {
          size = '@384w';
        } else if (window.innerWidth <= 1280) {
          size = '@768w';
        } else {
          size = '@1152w';
        }
        return `${basePath}/${name}${size}.${ext}`;
      }

      // For modal, use the best quality
      return `${basePath}/${name}.${ext}`;
    };

    if (isModal) {
      return (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <img
                src={getImagePath(image)}
                alt={image.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getImagePath({ ...image, ext: 'png' });
                }}
              />
              <button
                onClick={closeImage}
                className="absolute top-0 right-0 m-4 text-white hover:text-gray-300 z-10 p-2 bg-black/50 rounded-full"
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1)(e);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1)(e);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
                aria-label="Next image"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
            {image.alt && (
              <div className="mt-4 text-center text-white max-w-2xl">
                <h3 className="text-lg font-medium">{image.alt}</h3>
                {image.description && <p className="text-gray-300 mt-1">{image.description}</p>}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`relative group ${className} w-full`} onClick={handleClick}>
        <div
          className={`relative w-full ${image.containerClass || 'h-64'} bg-gray-50 dark:bg-gray-900/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              src={getImagePath(image)}
              alt={image.alt}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getImagePath({ ...image, ext: 'png' });
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="w-full">
              <h4 className="text-white font-medium text-sm mb-1 truncate">{image.alt}</h4>
              <div className="flex items-center text-xs text-white/80">
                <span className="inline-flex items-center bg-black/50 px-2 py-1 rounded-full">
                  <FaExpand className="mr-1.5 w-3 h-3" />
                  <span className="text-xs">Click to expand</span>
                </span>
              </div>
            </div>
          </div>

          {/* Expand button in top-right corner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            aria-label="Expand image"
          >
            <FaExpand className="w-3.5 h-3.5" />
          </button>
        </div>
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
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 lg:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 h-48 sm:h-64 md:h-[32rem]">
          <img
            src="/images/projects/Project2_tableau/Project2_Cover-1200w.webp"
            srcSet="/images/projects/Project2_tableau/Project2_Cover-300w.webp 300w, /images/projects/Project2_tableau/Project2_Cover-600w.webp 600w, /images/projects/Project2_tableau/Project2_Cover-1200w.webp 1200w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt="Bansal Supermarket Dashboard"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/Sahil-Portfolio/images/fallback-image.jpg';
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-blue-900/20 via-blue-900/15 to-transparent dark:from-blue-800/20 dark:via-blue-800/15"
            variants={gradientAnimation}
            initial="hidden"
            animate="visible"
          />
        </div>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="space-y-4 sm:space-y-6">
            {/* Project Title and Description */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                Advanced Supermarket Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-300/90 leading-relaxed max-w-3xl text-sm sm:text-base">
                Developed an intelligent analytics platform for Bansal Supermarket, providing real-time
                insights into sales trends, inventory management, and customer behavior optimization.
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
                    <div
                      className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-opacity-20 text-${stat.color}-600 dark:text-${stat.color}-400`}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
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
                    <div
                      className={`p-2 rounded-lg bg-${tech.color}-100 dark:bg-opacity-20 text-${tech.color}-600 dark:text-${tech.color}-400`}
                    >
                      {tech.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {tech.name}
                      </p>
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
                  {[
                    '#RetailAnalytics',
                    '#InventoryManagement',
                    '#SalesOptimization',
                    '#DataVisualization',
                  ].map((tag, index) => (
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
                    href="https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/BansalSupermarket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium py-2.5 px-6 rounded-lg text-center border-2 border-indigo-700 dark:border-indigo-600 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        View Code
                      </span>
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
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        View Dashboard
                      </span>
                      <FaExternalLinkAlt className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 w-3.5 h-3.5" />
                    </span>
                    <span className="absolute inset-0 bg-blue-50/80 dark:bg-blue-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Category Performance Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <ImageContainer image={images[1]} index={1} className="w-full rounded-lg" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our comprehensive analysis of Bansal Supermarket's product categories reveals key
                  opportunities for growth and optimization. By examining the distribution between
                  Food and Non-Food segments, we've identified strategic advantages in inventory
                  planning and marketing focus.
                </p>
                <ul className="space-y-3">
                  {[
                    'Identified 28% higher profit margins in premium organic categories',
                    'Optimized shelf space allocation based on category performance',
                    'Developed targeted promotions for underperforming segments',
                    'Established data-driven inventory replenishment strategies',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-3 mt-0.5">
                        <svg
                          className="h-4 w-4 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Top 10 Products */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top 10 Products by Sales Volume
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our analysis of Bansal Supermarket's top-selling products reveals critical
                  patterns in consumer behavior and product performance. The top 10 products account
                  for 42% of total sales volume, with premium organic products showing an 18%
                  quarter-over-quarter growth rate.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-blue-700 dark:text-blue-300 text-sm italic">
                      "Optimizing inventory levels for these top performers could potentially
                      increase overall revenue by up to 15% through better stock availability and
                      reduced holding costs."
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { label: 'Market Share', value: '42%' },
                      { label: 'QoQ Growth', value: '+18%' },
                      { label: 'Avg. Margin', value: '34.5%' },
                      { label: 'Restock Freq.', value: '2.3x/week' },
                    ].map((stat, i) => (
                      <li key={i} className="flex items-center">
                        <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                          {stat.label}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{stat.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <ImageContainer image={images[2]} index={2} className="w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Inventory Turnover Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Inventory Turnover Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <ImageContainer image={images[3]} index={3} className="w-full rounded-lg" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our inventory turnover analysis provides critical insights into Bansal
                  Supermarket's stock efficiency. By tracking how quickly products move off the
                  shelves, we've identified opportunities to optimize inventory levels and reduce
                  carrying costs while maintaining excellent product availability.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { label: 'Avg. Turnover', value: '8.2x', change: '+1.5x', trend: 'up' },
                      { label: 'Carry Cost', value: '22%', change: '-5%', trend: 'down' },
                      { label: 'Stockouts', value: '1.8%', change: '-3.2%', trend: 'down' },
                      { label: 'Excess Stock', value: '12%', change: '-8%', trend: 'down' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                        <div className="flex items-baseline">
                          <span className="text-xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                          </span>
                          <span
                            className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      <span className="font-semibold">Key Insight:</span> Improving turnover rates
                      for slow-moving categories could reduce carrying costs by an estimated $18,000
                      annually.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales vs Profit Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Sales vs Profit Margin Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our comprehensive analysis reveals the critical relationship between sales volume
                  and profit margins across product categories. This visualization helps identify
                  strategic opportunities to optimize the product mix and pricing strategies for
                  maximum profitability.
                </p>

                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      <span className="font-semibold">Opportunity:</span> Premium organic products
                      in the top-right quadrant show both high sales volume and high margins,
                      indicating strong market demand at premium price points.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      {
                        label: 'High-Value Products',
                        value: '28%',
                        desc: 'of SKUs generate 72% of profit',
                      },
                      { label: 'Margin Range', value: '8-42%', desc: 'across product categories' },
                      { label: 'Growth', value: '+15%', desc: 'in premium category sales' },
                    ].map((stat, i) => (
                      <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Key Recommendations:
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Increase marketing focus on high-margin premium products</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Review pricing strategy for low-margin, high-volume items</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Consider discontinuing underperforming SKUs in the bottom-left quadrant
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <ImageContainer image={images[4]} index={4} className="w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Customer Segmentation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Segmentation Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="rounded-lg overflow-hidden mb-6">
                  <ImageContainer image={images[5]} index={5} className="w-full" />
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    <span className="font-semibold">Insight:</span> The 'Premium Organic Shoppers'
                    segment shows 3.2x higher average order value compared to other segments,
                    highlighting a significant revenue opportunity.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Our advanced customer segmentation analysis categorizes Bansal Supermarket's
                  shoppers into distinct groups based on purchasing patterns, preferences, and
                  engagement levels. This enables highly targeted marketing strategies and
                  personalized shopping experiences.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Key Customer Segments:
                  </h4>

                  {[
                    {
                      name: 'Premium Organic Shoppers',
                      desc: 'High-income professionals prioritizing organic and specialty products',
                      value: '22%',
                      growth: '+8%',
                      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
                    },
                    {
                      name: 'Value-Conscious Families',
                      desc: 'Budget-focused shoppers who prioritize deals and bulk purchases',
                      value: '35%',
                      growth: '+2%',
                      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
                    },
                    {
                      name: 'Convenience Shoppers',
                      desc: 'Time-poor customers who value quick trips and ready-to-eat options',
                      value: '28%',
                      growth: '+5%',
                      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
                    },
                    {
                      name: 'Traditional Shoppers',
                      desc: 'Brand-loyal customers with consistent purchasing patterns',
                      value: '15%',
                      growth: '-3%',
                      color: 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200',
                    },
                  ].map((segment, i) => (
                    <div key={i} className={`p-3 rounded-lg ${segment.color}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{segment.name}</h5>
                          <p className="text-sm opacity-80">{segment.desc}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{segment.value}</div>
                          <div
                            className={`text-xs ${parseInt(segment.growth) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                          >
                            {segment.growth} YoY
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">
                    Personalization Opportunities:
                  </h4>
                  <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-300">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Tailored promotions based on segment preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Personalized product recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Customized communication and loyalty rewards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Impact Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Business Value</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Sales Optimization',
                description:
                  'Identified top-performing products and categories to focus inventory and marketing efforts.',
                icon: <FaChartLine className="w-6 h-6 text-blue-500" />,
                borderClass: 'border-blue-100 dark:border-blue-900/30',
                bgGradient: 'from-blue-50/50',
                bgClass: 'bg-blue-100',
                darkFrom: 'dark:from-blue-900/10',
              },
              {
                title: 'Inventory Management',
                description:
                  'Reduced overstock and stockouts through predictive inventory analysis.',
                icon: <FaBox className="w-6 h-6 text-indigo-500" />,
                borderClass: 'border-indigo-100 dark:border-indigo-900/30',
                bgGradient: 'from-indigo-50/50',
                bgClass: 'bg-indigo-100',
                darkFrom: 'dark:from-indigo-900/10',
              },
              {
                title: 'Pricing Strategy',
                description:
                  'Optimized pricing based on demand elasticity and competitor analysis.',
                icon: <FaSearchDollar className="w-6 h-6 text-purple-500" />,
                borderClass: 'border-purple-100 dark:border-purple-900/30',
                bgGradient: 'from-purple-50/50',
                bgClass: 'bg-purple-100',
                darkFrom: 'dark:from-purple-900/10',
              },
              {
                title: 'Customer Insights',
                description:
                  'Identified customer preferences and shopping patterns for targeted marketing.',
                icon: <FaShoppingBasket className="w-6 h-6 text-green-500" />,
                borderClass: 'border-green-100 dark:border-green-900/30',
                bgGradient: 'from-green-50/50',
                bgClass: 'bg-green-100',
                darkFrom: 'dark:from-green-900/10',
              },
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300/90 text-sm">
                      {item.description}
                    </p>
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
                <ImageContainer image={selectedImage} index={currentIndex} isModal={true} />
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
