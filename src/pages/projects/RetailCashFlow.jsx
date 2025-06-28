import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaMoneyBillWave, FaCalculator, FaChartPie, FaSearchDollar, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { FaTable, FaFileExcel } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RetailCashFlow = () => {
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Cash Flow Dashboard</h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Power BI + Google Sheets
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Automated daily cash tracking for two retail stores, reducing errors and enabling real-time financial decisions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['#PowerBI', '#GoogleSheets', '#RetailAnalytics', '#CashFlow', '#Automation'].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaFileExcel className="mr-2" />
                View Dashboard
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaMoneyBillWave className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Stores</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Error Reduction</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">80%</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                  <FaChartLine className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Real-time</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Updates</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-3">
                  <FaCalculator className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automated</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Calculations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0">
                <img 
                  src="/images/projects/Project4 Power BI/CashFlow1.avif" 
                  alt="Retail Cash Flow Dashboard Overview"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              </div>
            </div>
            <p className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Dashboard overview: Real-time cash flow tracking across multiple retail locations.
            </p>
          </div>
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <div className="absolute inset-0">
                <img 
                  src="/images/projects/Project4 Power BI/CashFlow2.avif" 
                  alt="Cash Flow Trends and Analysis"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              </div>
            </div>
            <p className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Historical cash flow trends and detailed analysis.
            </p>
          </div>
        </div>

        {/* Business Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Business Impact</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">
                <FaCheckCircle className="h-full w-full" />
              </div>
              <span className="text-gray-600 dark:text-gray-300">80% reduction in manual errors</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">
                <FaCheckCircle className="h-full w-full" />
              </div>
              <span className="text-gray-600 dark:text-gray-300">Real-time cash position visibility</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">
                <FaCheckCircle className="h-full w-full" />
              </div>
              <span className="text-gray-600 dark:text-gray-300">60% faster financial reporting</span>
            </li>
          </ul>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Overview</h2>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Developed a robust daily cash flow management system for two retail stores by integrating <b>Google Sheets</b> (for data entry) with <b>Power BI</b> (for visualization and analysis). This solution automates daily tracking of cash inflows, outflows, deposits, and discrepancies, providing real-time insights for better decision-making.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Automated data import from Google Sheets to Power BI for real-time dashboard updates</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Daily tracking of sales, expenses, coin additions, and deposits for each store</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Dynamic calculation of opening/closing balances, shortfall/excess, and cash left in drawer</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Custom Power BI dashboards for trend analysis, store comparisons, and anomaly detection</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Business Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reduced manual errors by 80%, enabled instant cash position checks, and improved financial control across both stores.
                  </p>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 flex items-center">
                    <FaCalculator className="mr-2" />
                    Expenses
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Deducted from total. Example: ₹13,000 - ₹5,000 = ₹8,000
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 flex items-center">
                    <FaChartPie className="mr-2" />
                    Closing & Next Day
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Final amount after expenses becomes the next day's opening balance. Example: ₹6,000 deposited, ₹2,000 carried forward.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Technical Implementation</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Google Sheets Integration</h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`=LEFT_TO_DRAWER + DEPOSIT - CLOSING_BALANCE
= D7346 + D7345 - D7342`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power BI DAX Measures</h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// Calculate Closing Balance
Closing Balance = 
SUM('CashFlow'[Opening Balance]) +
SUM('CashFlow'[Total Income]) -
SUM('CashFlow'[Total Expenses]) -
SUM('CashFlow'[Deposit])

// Calculate Variance
Variance = 
[Actual Closing Balance] - [Expected Closing Balance]`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Automated data import from Google Sheets to Power BI</li>
                <li>Daily tracking of sales, expenses, and deposits</li>
                <li>Automatic calculation of opening/closing balances</li>
                <li>Anomaly detection for unusual transactions</li>
                <li>Store-wise performance comparison</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Business Value</h3>
              <ul className="space-y-4">
                <li className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-300">Reduced Errors</h4>
                  <p className="text-sm text-green-700 dark:text-green-200 mt-1">80% reduction in manual calculation errors</p>
                </li>
                <li className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">Time Savings</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">5+ hours saved weekly on financial reporting</p>
                </li>
                <li className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300">Better Decisions</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-200 mt-1">Real-time insights for cash management</p>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Tech Stack</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Power BI</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Data visualization and analysis</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Google Sheets</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Data entry and collaboration</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Power Query</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Data transformation</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">DAX</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Advanced calculations</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Live Demo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Interactive dashboard with real-time data from Google Sheets.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaSearchDollar className="mr-2" />
                  View Live Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RetailCashFlow;
