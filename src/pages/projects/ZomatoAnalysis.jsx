import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaDownload, FaEnvelope, FaArrowLeft, FaSearchDollar, FaChartPie, FaChartBar, FaGlobeAmericas, FaStar, FaUtensils, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../config/images';

const ZomatoAnalysis = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors group"
        >
          <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Zomato Restaurant Expansion Analysis</h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Excel Dashboard
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Data-driven market expansion strategy for Zomato's growth across emerging countries.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#Excel', '#DataDashboard', '#Zomato', '#MarketAnalysis', '#ExpansionStrategy'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaDownload className="mr-2" />
                Download Report
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                <FaEnvelope className="mr-2" />
                Contact
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaGlobeAmericas className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Countries Analyzed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">15+</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaUtensils className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Restaurants</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">10,000+</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                  <FaStar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Rating</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">4.29/5</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-3">
                  <FaDollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Price Range</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">$$-$$$</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl shadow-lg mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive Dashboard</h3>
              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 rounded-full">Excel</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <img 
                src={getImageUrl('PROJECT1_COVER')} 
                alt="Zomato Expansion Dashboard"
                className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/1200x600?text=Zomato+Expansion+Dashboard';
                }}
              />
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interactive Excel dashboard showing market analysis, restaurant distribution, and expansion opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Market Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaChartPie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Analysis</h3>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={getImageUrl('PROJECT1_COVER')}
                  alt="Zomato Analysis Dashboard"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x600?text=Zomato+Analysis+Dashboard';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive analysis of restaurant distribution, ratings, and pricing across target markets to identify expansion opportunities.
              </p>
            </div>
          </div>

          {/* Restaurant Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaChartBar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Restaurant Performance</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={getImageUrl('PROJECT1_ZT2')} 
                  alt="Restaurant Performance Metrics"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x450?text=Restaurant+Performance+Metrics';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed performance metrics including ratings, price ranges, and cuisine diversity to guide expansion strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Project Methodology */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Methodology</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Data Collection & Cleaning</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Gathered restaurant data from Zomato's API and public sources</li>
                  <li>Cleaned and standardized location, cuisine, and rating information</li>
                  <li>Validated data consistency across different regions</li>
                  <li>Handled missing values and outliers appropriately</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Analysis & Visualization</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Created interactive dashboards in Excel for data exploration</li>
                  <li>Analyzed market trends, restaurant performance, and category contributions</li>
                  <li>Calculated key metrics like average ratings and price ranges</li>
                  <li>Developed visualizations to communicate insights effectively</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Deliverables</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Interactive Excel dashboard for market analysis</li>
                  <li>Comprehensive report with actionable insights and recommendations</li>
                  <li>Market potential assessment with expansion priorities</li>
                  <li>Competitive analysis and positioning strategy</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Sample Excel Formula:</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                <code className="text-indigo-600 dark:text-indigo-300">
                  =AVERAGEIFS(RatingColumn, CountryColumn, "Philippines")
                </code>
              </pre>
            </div>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg">
              <p className="text-green-700 dark:text-green-400 font-medium">
                <span className="font-bold">Impact:</span> Enabled Zomato's team to identify priority regions swiftly, reducing reporting time by 70% and improving market opportunity accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Findings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Market Insights</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Turkey leads with the highest number of restaurants, followed by the Philippines and Indonesia.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Philippines and Indonesia show superior average ratings, indicating strong customer approval.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Qatar exhibits the highest average pricing, suggesting a premium market segment.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Prioritize expansion in the Philippines and Indonesia for quality-focused growth.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Target Qatar for premium market positioning.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Leverage Turkey's volume-driven market with diverse cuisine offerings.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ZomatoAnalysis;
