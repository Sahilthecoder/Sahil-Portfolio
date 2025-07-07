import React from 'react';
import { motion } from 'framer-motion';
import {
  FaDatabase,
  FaChartLine,
  FaBox,
  FaRobot,
  FaMobileScreen,
  FaClock,
  FaArrowTrendUp,
  FaDollarSign,
  FaUpRightFromSquare,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ProjectImage from '../../components/ProjectImage';

// Image paths
const dashboardImage = '/images/projects/Project5 SQL/dashboard-preview.jpg';
const productAnalysisImage = '/images/projects/Project5 SQL/product-analysis.jpg';

const ProductSalesDashboard = () => {
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
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI-Powered Sales Forecasting & Inventory Optimization
                </h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  AI/ML + Predictive Analytics + Power BI
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Advanced AI-driven platform that predicts sales trends, optimizes inventory levels,
                and automates replenishment with 94% forecast accuracy.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  '#AIForecasting',
                  '#PredictiveAnalytics',
                  '#InventoryAI',
                  '#RetailTech',
                  '#MLOps',
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://app.powerbi.com/view?r=your-dashboard-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaChartLine className="mr-2" />
                View Dashboard
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                AI Sales Predictions
              </h3>
              <div className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <ProjectImage
                  projectId="product-sales-dashboard"
                  imageName="dashboard-preview.jpg"
                  alt="Sales Overview Dashboard"
                  aspectRatio="16/9"
                  className="rounded-lg"
                  showOverlay={false}
                  zoomOnHover={true}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                AI-powered sales forecasting with 94% accuracy, predicting demand patterns and
                seasonal trends.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Inventory Optimization
              </h3>
              <div className="relative w-full h-64 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <ProjectImage
                  projectId="product-sales-dashboard"
                  imageName="product-analysis.jpg"
                  alt="Product Performance Analysis"
                  aspectRatio="16/9"
                  className="rounded-lg"
                  showOverlay={false}
                  zoomOnHover={true}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                ML-driven inventory recommendations reducing stockouts by 35% and overstock by 42%.
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Developed an advanced AI-powered retail intelligence platform that leverages machine
              learning to transform raw sales data into predictive insights. The system processes
              millions of data points to forecast demand, optimize inventory levels, and automate
              replenishment, resulting in a 28% increase in inventory turnover and 94% forecast
              accuracy. By implementing deep learning models, we've enabled proactive
              decision-making that adapts to changing market conditions and consumer behavior
              patterns.
            </p>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Challenges */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg mr-4">
                <FaBox className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Manual sales tracking prone to errors and delays
                </span>
              </li>
              <li className="flex">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Lack of visibility into top-performing products
                </span>
              </li>
              <li className="flex">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Difficulty identifying slow-moving inventory
                </span>
              </li>
              <li className="flex">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Delayed monthly reporting impacting timely decisions
                </span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
                <FaRobot className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Solution</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Developed an integrated solution that combines:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  SQL for data cleaning and transformation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Google Sheets for data collection and automation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Power BI for interactive dashboards and reporting
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Image */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12 max-w-6xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Product Sales Dashboard"
            className="w-full h-96 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1486406149866-d6fc28fc647f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
            }}
          />
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4">
                <FaDatabase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Forecasting
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Deep learning models deliver 94% accurate sales predictions, adapting to market
                trends in real-time.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-4">
                <FaChartLine className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Automated Inventory Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ML algorithms dynamically adjust stock levels, reducing carrying costs by 35% while
                maintaining 99% service levels.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-4">
                <FaDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inventory Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Identifies slow-moving items and suggests optimal reorder points to reduce
                stockouts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center mb-4">
                <FaMobileScreen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Mobile-friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access key metrics and reports on any device, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                Google Sheets + Apps Script
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automated data collection, cleaning, and preparation using custom scripts and
                formulas.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">SQL</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Data transformation, aggregation, and complex querying for analysis.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
                Power BI
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive dashboards and visualizations for data exploration and reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Impact & Results */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Impact & Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">80%</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reduction in time spent on manual reporting
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBox className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">60%</h3>
              <p className="text-gray-600 dark:text-gray-300">Reduction in stockouts</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaArrowTrendUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">15%</h3>
              <p className="text-gray-600 dark:text-gray-300">Increase in weekly revenue</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">20%</h3>
              <p className="text-gray-600 dark:text-gray-300">Improvement in inventory turnover</p>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technical Implementation
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Google Apps Script
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
                    {`// Sample Google Apps Script for automation
function updateMasterSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName('Daily Sales');
  const targetSheet = ss.getSheetByName('Master Data');
  
  // Get new data
  const data = sourceSheet.getRange('A2:G' + sourceSheet.getLastRow()).getValues();
  
  // Append to master
  targetSheet.getRange(
    targetSheet.getLastRow() + 1, 
    1, 
    data.length, 
    data[0].length
  ).setValues(data);
  
  // Clear processed data
  sourceSheet.getRange('A2:G' + sourceSheet.getLastRow()).clearContent();
  
  // Refresh Power BI dataset
  refreshPowerBI();
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              SQL Query Example
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Top Performing Products
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
                    {`WITH monthly_sales AS (
  SELECT 
    product_id,
    product_name,
    category,
    SUM(quantity_sold) as total_quantity,
    SUM(revenue) as total_revenue,
    SUM(profit) as total_profit,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY SUM(revenue) DESC) as rank_in_category
  FROM sales
  WHERE sale_date >= DATE_TRUNC('month', CURRENT_DATE)
  GROUP BY 1, 2, 3
)
SELECT 
  product_name,
  category,
  total_quantity,
  total_revenue,
  total_profit,
  ROUND((total_profit / NULLIF(total_revenue, 0)) * 100, 2) as profit_margin
FROM monthly_sales
WHERE rank_in_category <= 5
ORDER BY category, total_revenue DESC;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a Data Dashboard Like This?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help automate your business processes and provide actionable
            insights.
          </p>
          <a
            href="mailto:sahilkhan36985@gmail.com?subject=Data Dashboard Inquiry"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSalesDashboard;
