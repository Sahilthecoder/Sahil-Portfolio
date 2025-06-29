import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaChartPie, FaBox, FaSearchDollar, FaTable, FaShoppingBasket, FaChartBar, FaArrowLeft, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../config/images';

const BansalSupermarket = () => {
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
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bansal Supermarket Sales Analysis</h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Tableau Dashboard
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive analysis of sales data to optimize inventory, pricing, and boost profitability.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["#Tableau", "#RetailAnalytics", "#SalesAnalysis", "#InventoryManagement", "#DataVisualization"].map((tag, index) => (
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
                <FaChartLine className="mr-2" />
                View Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This analysis dives deep into Bansal Supermarket's sales data to uncover valuable insights for inventory management, 
                  pricing strategies, and overall business optimization. The project focuses on identifying top-performing products, 
                  analyzing category performance, and providing data-driven recommendations.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹238,035</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Sales</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">17.5%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Top Margin</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,188</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Top Profit (₹)</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Insights</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>TIRUPATI COTTONSEED OIL 1lt</strong> leads in sales volume but operates on thin margins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>LOVE BITE NANKHATAI 500g</strong> boasts the highest profit margin at 17.5%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Food category dominates sales but shows varying profit margins across items</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</h4>
                    <p className="text-gray-800 dark:text-gray-200">Data Analyst</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tools Used</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">Tableau</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded">Excel</span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">Data Analysis</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Key Metrics</h4>
                    <ul className="mt-1 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-center">
                        <FaShoppingBasket className="w-4 h-4 mr-2 text-blue-500" />
                        <span>1,000+ SKUs Analyzed</span>
                      </li>
                      <li className="flex items-center">
                        <FaChartLine className="w-4 h-4 mr-2 text-green-500" />
                        <span>15% Profit Increase Potential</span>
                      </li>
                      <li className="flex items-center">
                        <FaTable className="w-4 h-4 mr-2 text-purple-500" />
                        <span>6-Month Sales Period</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interactive Dashboard</h3>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-full">Tableau</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <img 
                  src="/images/projects/Project2 tableau/bs2.avif" 
                  alt="Bansal Supermarket Sales Dashboard"
                  className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.svg';
                  }}
                />
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Interactive dashboard showing sales performance, top products, and category analysis with filtering capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Sales by Category */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaChartPie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={getImageUrl('PROJECT2_BS3')} 
                  alt="Food vs Non-Food Sales Distribution"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x600?text=Bansal+Supermarket+Dashboard';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Food products dominate sales with 68% share, while Non-Food accounts for 32%. This distribution helps in inventory planning and category management.
              </p>
            </div>
          </div>

          {/* Top Performing Products */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaChartBar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top 10 Products</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={getImageUrl('PROJECT2_BS_TOP10')} 
                  alt="Top 10 Best-Selling Products"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x600?text=Bansal+Supermarket+Dashboard';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                TIRUPATI COTTONSEED OIL leads in sales volume, while LOVE BITE NANKHATAI shows the highest profit margin at 17.5%.
              </p>
            </div>
          </div>
        </div>

        {/* Stock Turnover Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 mr-3">
                <FaBox className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stock Turnover Analysis</h3>
            </div>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img 
                src={getImageUrl('PROJECT2_BS_STOCK')} 
                alt="Stock Turnover Rate by Category"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/1200x600?text=Bansal+Supermarket+Dashboard';
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Findings</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Beverages show the highest turnover rate at 1.8x</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Snacks and Staples follow closely with 1.5x and 1.4x respectively</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Personal Care shows the lowest turnover at 0.8x</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Increase stock levels for high-turnover categories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Review and optimize inventory for low-turnover items</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consider promotions for slow-moving inventory</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Product Performance Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sales (₹)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit (₹)</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Margin (%)</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">TIRUPATI COTTONSEED OIL 1lt</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">OIL (EDIBLE)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">63,636</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">1,188</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">1.87%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">RAAG PALMOLIVE OIL POUCH 1 LTR</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">OIL (EDIBLE)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">35,326</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">967</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">2.74%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">LOVE BITE NANKHATAI 500g</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">SNACKS</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">28,450</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">1,025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400 font-medium">17.50%</td>
                  </tr>
                </tbody>
              </table>
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
                  <li>Gathered sales data from Bansal Supermarket's retail management system</li>
                  <li>Cleaned and standardized product names, categories, and pricing information</li>
                  <li>Validated data consistency across different time periods</li>
                  <li>Handled missing values and outliers appropriately</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Analysis & Visualization</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Created interactive dashboards in Tableau for data exploration</li>
                  <li>Analyzed sales trends, product performance, and category contributions</li>
                  <li>Calculated key metrics like profit margins and stock turnover rates</li>
                  <li>Developed visualizations to communicate insights effectively</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Deliverables</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Interactive Tableau dashboard for real-time performance monitoring</li>
                  <li>Comprehensive report with actionable insights and recommendations</li>
                  <li>Product performance analysis with focus on profitability</li>
                  <li>Inventory optimization suggestions based on turnover rates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3">
                  <FaSearchDollar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Sale Value</p>
                  <p className="font-semibold text-gray-800 dark:text-white">₹238,035</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3">
                  <FaChartLine className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Top Profit</p>
                  <p className="font-semibold text-gray-800 dark:text-white">₹1,188</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3">
                  <FaChartPie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Top Margin</p>
                  <p className="font-semibold text-gray-800 dark:text-white">17.5%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                Tableau
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                Data Analysis
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                Retail Analytics
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Project Insights</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>TIRUPATI COTTONSEED OIL 1lt is the highest-selling product but has a low profit margin</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>LOVE BITE NANKHATAI 500g has the highest profit margin at 17.5%</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Significant opportunity to optimize inventory based on turnover rates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BansalSupermarket;
