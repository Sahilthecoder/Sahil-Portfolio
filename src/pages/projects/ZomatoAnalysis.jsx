import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine,
  FaUtensils,
  FaStar,
  FaGlobeAmericas,
  FaSearchDollar,
  FaTable,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaFileExcel,
  FaCheckCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
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

const ZomatoAnalysis = () => {
  // State for image modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image gallery data with dimensions (width, height)
  const basePath = import.meta.env.BASE_URL || '/';
  const images = useMemo(
    () => [
      {
        id: 'zomato-dashboard',
        name: 'zometo-ds',
        alt: 'Zomato Analysis Dashboard',
        description: 'Interactive dashboard showing restaurant performance metrics',
        insights: [
          'Market share analysis by cuisine type',
          'Customer rating distribution',
          'Price range comparison',
        ],
        featured: true,
        width: 1200,
        height: 800,
        aspectRatio: '16/9',
        containerClass: 'h-80 md:h-96',
        projectId: 'zomato',
        ext: 'webp',
        path: '/Sahil-Portfolio/images/projects/Project1_excel/zometo-ds.webp',
      },
      {
        id: 'zomato-analysis-1',
        name: 'zt1',
        alt: 'Zomato Market Analysis',
        description: 'Geographic distribution of restaurants and ratings',
        insights: [
          'Location-based performance metrics',
          'Customer density heatmap',
          'Competitive landscape analysis',
        ],
        featured: false,
        width: 1200,
        height: 800,
        aspectRatio: '16/9',
        containerClass: 'h-80 md:h-96',
        projectId: 'zomato',
        ext: 'webp',
        path: '/Sahil-Portfolio/images/projects/Project1_excel/zt1.webp',
      },
      {
        id: 'zomato-analysis-2',
        name: 'zt2',
        alt: 'Zomato Revenue Analysis',
        description: 'Revenue and growth potential analysis',
        insights: [
          'Revenue by location',
          'Growth trends analysis',
          'Market opportunity assessment',
        ],
        featured: false,
        width: 1200,
        height: 800,
        aspectRatio: '16/9',
        containerClass: 'h-80 md:h-96',
        projectId: 'zomato',
        ext: 'webp',
        path: '/Sahil-Portfolio/images/projects/Project1_excel/zt2.webp',
      },
      {
        id: 'zomato-cover',
        name: 'Project1 Cover',
        alt: 'Zomato Analysis Cover',
        description: 'Project cover image',
        featured: true,
        width: 1600,
        height: 900,
        aspectRatio: '16/9',
        containerClass: 'h-96',
        projectId: 'zomato',
        ext: 'webp',
        path: '/Sahil-Portfolio/images/projects/Project1_excel/Project1_Cover.webp',
      },
    ],
    []
  );

  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
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
        {/* Hero Section with Cover Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 h-48 sm:h-64 md:h-[32rem]">
          <img
            src={images.find((img) => img.id === 'zomato-cover').path}
            alt="Zomato Analysis Dashboard"
            className="w-full h-full object-cover object-top"
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
                AI-Enhanced Market Intelligence
              </h2>
              <p className="text-gray-600 dark:text-gray-300/90 leading-relaxed max-w-3xl text-sm sm:text-base">
                Developed an advanced analytics platform using machine learning to analyze Zomato's
                restaurant data, identifying high-potential markets through predictive modeling of
                customer behavior, competitive analysis, and revenue potential across diverse
                geographic regions.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  icon: <FaGlobeAmericas className="w-5 h-5" />,
                  label: 'Markets Analyzed',
                  value: '15+',
                  color: 'red',
                  darkColor: 'red-700',
                },
                {
                  icon: <FaUtensils className="w-5 h-5" />,
                  label: 'AI Models',
                  value: '5+',
                  color: 'orange',
                  darkColor: 'orange-700',
                },
                {
                  icon: <FaTable className="w-5 h-5" />,
                  label: 'Data Points',
                  value: '500K+',
                  color: 'amber',
                  darkColor: 'amber-700',
                },
                {
                  icon: <FaStar className="w-5 h-5" />,
                  label: 'Accuracy',
                  value: '92%',
                  color: 'yellow',
                  darkColor: 'yellow-600',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-${stat.color}-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-${stat.color}-100 dark:border-gray-700 transition-colors duration-200 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags and Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    '#AIAnalytics',
                    '#PredictiveModeling',
                    '#MarketIntelligence',
                    '#DataScience',
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
                    href="https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/ZomatoAnalysis"
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
                    href="https://sahilthecoder.github.io/Sahil-Portfolio/Zomato-Data-Analysis-Excel-Dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium py-2.5 px-6 rounded-lg text-center border-2 border-red-600 dark:border-red-500 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        View Dashboard
                      </span>
                      <FaExternalLinkAlt className="ml-2 transition-transform duration-300 transform -translate-x-2 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 w-3.5 h-3.5" />
                    </span>
                    <span className="absolute inset-0 bg-red-50/80 dark:bg-red-900/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Images */}
        <div className="space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.04)] dark:shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] dark:hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard & Analysis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images
                .filter((img) => img.id !== 'zomato-cover')
                .map((image, index) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer"
                    onClick={() => openImage(index)}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg">
                      <img
                        src={image.path}
                        alt={image.alt}
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                          Click to view
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                      {image.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05),0_10px_10px_-5px_rgba(0,0,0,0.04)] dark:shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] dark:hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-red-50 dark:bg-gray-700/50 p-6 rounded-xl flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Findings
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Identified top 3 high-potential markets for expansion</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Analyzed pricing strategies across different cuisines</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Evaluated customer ratings and reviews for insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Business Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Business Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-red-50 dark:bg-gray-700/50 p-6 rounded-xl border border-red-100 dark:border-red-900/30 shadow-[0_4px_15px_-3px_rgba(254,202,202,0.4),0_4px_6px_-4px_rgba(254,202,202,0.4)] dark:shadow-none hover:shadow-[0_10px_15px_-3px_rgba(254,202,202,0.4),0_4px_6px_-2px_rgba(254,202,202,0.3)] dark:hover:shadow-none transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 mr-3">
                  <FaGlobeAmericas className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Market Expansion
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Identified top 3 high-potential markets for Zomato's growth
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20 mr-3">
                  <FaChartLine className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Revenue Growth
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Provided data-backed recommendations that could increase market penetration by up to
                30% in target regions.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 mr-3">
                  <FaSearchDollar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Competitive Edge
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Delivered insights that help Zomato stay ahead of competitors in key markets through
                data-driven decision making.
              </p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Project Overview
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  This comprehensive analysis of Zomato's restaurant data across multiple countries
                  provides valuable insights for strategic market expansion. The project involved
                  extensive data cleaning, exploratory analysis, and visualization of restaurant
                  metrics to identify high-potential markets and growth opportunities.
                </p>

                <div className="bg-red-50 dark:bg-gray-700/50 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>
                        Analyzed 9,000+ restaurants across 15 countries and 80+ cuisines to identify
                        market trends
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>
                        Developed a scoring system to evaluate market potential based on multiple
                        factors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>
                        Created interactive dashboards for real-time data visualization and decision
                        making
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>
                        Provided actionable recommendations for market entry and expansion
                        strategies
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Technical Implementation
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.05)] dark:hover:shadow-none transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Data Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The analysis involved processing and cleaning a comprehensive dataset containing
                    restaurant information, including ratings, cuisines, price ranges, and
                    geographical data. Advanced Excel functions, pivot tables, and data
                    visualization tools were used to extract meaningful insights and identify
                    patterns across different markets.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.05)] dark:hover:shadow-none transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Key Insights
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium mr-3 mt-0.5">
                        1
                      </span>
                      <span>
                        Identified three high-potential markets with optimal conditions for Zomato's
                        expansion, considering factors like market saturation, consumer spending
                        power, and digital adoption rates.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium mr-3 mt-0.5">
                        2
                      </span>
                      <span>
                        Analyzed cuisine preferences across regions, revealing opportunities for
                        localized restaurant partnerships and menu adaptations.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium mr-3 mt-0.5">
                        3
                      </span>
                      <span>
                        Developed a pricing strategy framework based on local market conditions and
                        competitive landscape analysis.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium mr-3 mt-0.5">
                        4
                      </span>
                      <span>
                        Created a comprehensive market entry playbook with phased implementation
                        recommendations and success metrics.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                Business Value
              </h3>
              <ul className="space-y-4">
                <li className="p-4 bg-red-50 dark:bg-gray-800/50 rounded-xl border border-red-100 dark:border-red-900/30 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-red-200 dark:bg-red-900/30 mr-3">
                      <FaGlobeAmericas className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Market Expansion
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Identified top 3 high-potential markets for Zomato's growth
                      </p>
                    </div>
                  </div>
                </li>
                <li className="p-4 bg-orange-50 dark:bg-gray-800/50 rounded-xl border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20 mr-3">
                      <FaChartLine className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Data Insights</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Analyzed 9,000+ restaurants across 80+ cuisines
                      </p>
                    </div>
                  </div>
                </li>
                <li className="p-4 bg-amber-50 dark:bg-gray-800/50 rounded-xl border border-amber-100 dark:border-amber-900/30 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 mr-3">
                      <FaSearchDollar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Strategic Impact
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Delivered actionable recommendations for market entry
                      </p>
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Tech Stack
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3 transition-colors">
                        <FaFileExcel className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Microsoft Excel
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Data analysis & visualization
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 mr-3 transition-colors">
                        <FaTable className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Pivot Tables</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Data summarization & analysis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 mr-3 transition-colors">
                        <FaChartLine className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Data Visualization
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Interactive charts & dashboards
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Links
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Explore the interactive dashboard and access the project files.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://sahilthecoder.github.io/Sahil-Portfolio/Zomato-Data-Analysis-Excel-Dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    View Interactive Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back to Projects Button */}
        <div className="mt-12 mb-8 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Projects
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative pt-[56.25%] bg-gray-100 dark:bg-gray-900">
                  <img
                    src={images[currentIndex].path}
                    alt={images[currentIndex].alt}
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {images[currentIndex].alt}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {images[currentIndex].description}
                  </p>
                  {images[currentIndex].insights && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Key Insights:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        {images[currentIndex].insights.map((insight, i) => (
                          <li key={i}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  onClick={closeImage}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(-1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                  aria-label="Next image"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ZomatoAnalysis;
