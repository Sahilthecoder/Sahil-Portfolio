import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDatabase,
  FaClock,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaFileExcel,
  FaGoogle,
  FaServer,
  FaTable,
  FaMoneyBillWave,
  FaUserCheck,
  FaBusinessTime,
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

const EkamAttendance = () => {
  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 lg:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors group"
        >
          <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Hero Section with Cover Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 h-48 sm:h-64 md:h-[32rem]">
          <img
            src="/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover-1200w.webp"
            srcSet="/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover-300w.webp 300w, /Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover-600w.webp 600w, /Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Project3_Cover-1200w.webp 1200w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt="Ekam Attendance Dashboard"
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-2 sm:mb-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  AI-Powered Workforce Intelligence System
                </h1>
                <span className="ml-3 inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  AI + Automation + Workforce Analytics
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                An intelligent workforce management platform leveraging computer vision and machine
                learning to automate time tracking, predict staffing needs, and optimize labor costs
                with 97% accuracy.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  '#AIAutomation',
                  '#ComputerVision',
                  '#PredictiveAnalytics',
                  '#WorkforceAI',
                  '#HRTech',
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
                href="https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaFileExcel className="mr-2" />
                View Dashboard
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                  <FaUserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Accuracy</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">97%</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                  <FaClock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Process Automation</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">95%</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                  <FaMoneyBillWave className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Labor Cost Reduction</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">22%</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-3">
                  <FaBusinessTime className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Predictions</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">8K+/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before & After Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            AI Transformation Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Before: Legacy System
                </h3>
              </div>
              <img
                src="/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Attendance_before.webp"
                alt="Manual Attendance Process"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Sahil-Portfolio/images/fallback-image.jpg';
                }}
              />
              <div className="p-4">
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaExclamationTriangle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5 mr-2" />
                    <span>Manual entry led to frequent errors</span>
                  </li>
                  <li className="flex items-start">
                    <FaExclamationTriangle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5 mr-2" />
                    <span>No real-time validation of working hours</span>
                  </li>
                  <li className="flex items-start">
                    <FaExclamationTriangle className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5 mr-2" />
                    <span>Difficult to track overtime and compliance</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  After: AI-Powered Platform
                </h3>
              </div>
              <img
                src="/Sahil-Portfolio/images/projects/Project3_Sql+Sheets/Attendance_after.webp"
                alt="Automated Attendance System"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Sahil-Portfolio/images/fallback-image.jpg';
                }}
              />
              <div className="p-4">
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span>Color-coded validation (green = valid, red = error)</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span>Automatic overtime calculation and alerts</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span>Real-time data validation and error highlighting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Statement */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                AI-Powered Solution
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex-shrink-0 h-6 w-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      AI-Powered Recognition
                    </h3>
                    <p>
                      Implemented computer vision and facial recognition to automate attendance
                      tracking with 97% accuracy, eliminating manual entry errors and buddy
                      punching.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex-shrink-0 h-6 w-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Predictive Analytics
                    </h3>
                    <p>
                      Developed ML models that analyze historical data to predict staffing needs and
                      prevent overtime, reducing labor costs by 22%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex-shrink-0 h-6 w-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Payroll Inaccuracies
                    </h3>
                    <p>Incorrect attendance data led to payroll errors and processing delays.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Developed */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Solution Developed
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <FaTable className="text-blue-500 mr-2" />
                    Color-coded Attendance System
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>Green cells indicate valid working hours (8-12 hours)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>Red cells highlight incorrect working hour calculations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>Automatic validation of entries against business rules</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <FaDatabase className="text-purple-500 mr-2" />
                    Relational SQL Database
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100 font-mono">
                      {`-- Database Schema
CREATE TABLE stores (
  store_id INT PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  location VARCHAR(200),
  monthly_budget_hours INT DEFAULT 4000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  store_id INT,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  hourly_rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (store_id) REFERENCES stores(store_id)
);

CREATE TABLE attendance (
  attendance_id SERIAL PRIMARY KEY,
  employee_id INT,
  work_date DATE NOT NULL,
  hours_worked DECIMAL(5,2) NOT NULL,
  is_valid BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);`}
                    </pre>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <FaClock className="text-green-500 mr-2" />
                    Time Management Controls
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>
                        <strong>Enterprise limit:</strong> 4000 total hours/month enforced via
                        database checks and spreadsheet formulas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>
                        <strong>Anomaly detection:</strong> SQL alerts and sheet conditional
                        formatting for high usage
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span>
                        <strong>Overtime tracking:</strong> Automatic calculation and flagging of
                        overtime hours
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Time Management Controls
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">
                      Enterprise Limits
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      4000 total hours/month enforced with automated alerts
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300">
                      Automated Alerts
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Real-time notifications for limit breaches
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300">
                      Validation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Real-time validation of working hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Impact and Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center">
                    <FaCheckCircle className="mr-2" /> Error Reduction
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-3xl font-bold mt-2">70%</p>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Reduction in manual errors
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 flex items-center">
                    <FaClock className="mr-2" /> Time Saved
                  </h4>
                  <p className="text-blue-700 dark:text-blue-200 text-3xl font-bold mt-2">
                    8+ hours
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    Monthly admin time saved
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 flex items-center">
                    <FaChartLine className="mr-2" /> Cost Savings
                  </h4>
                  <p className="text-purple-700 dark:text-purple-200 text-3xl font-bold mt-2">
                    15%
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                    Reduction in overtime costs
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Future Enhancements
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                <li>Integration with payroll and HR systems for end-to-end automation</li>
                <li>Real-time anomaly alerts via email/SMS notifications</li>
                <li>Advanced analytics dashboard for workforce planning</li>
                <li>Mobile app for employee self-service</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Technology Stack
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Google Sheets</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Data entry, validation, and collaboration
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">SQL</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Data storage, querying, and reporting
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Validation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Automated rules and conditional formatting
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">
              Key SQL Queries
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Invalid Entries
                </h4>
                <pre className="text-xs mt-2 text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`-- Find all invalid attendance entries
SELECT 
  e.name as employee_name,
  a.date,
  a.hours_worked,
  a.notes
FROM attendance a
JOIN employees e ON a.employee_id = e.employee_id
WHERE a.is_valid = FALSE
ORDER BY a.date DESC
LIMIT 10;`}
                </pre>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Monthly Hours
                </h4>
                <pre className="text-xs mt-2 text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`SELECT 
  e.name,
  SUM(a.hours_worked) as total_hours,
  CASE 
    WHEN SUM(a.hours_worked) > 176 THEN 'Over Limit'
    ELSE 'Within Limit'
  END as status
FROM attendance a
JOIN employees e ON a.employee_id = e.employee_id
WHERE EXTRACT(MONTH FROM a.date) = 6
  AND EXTRACT(YEAR FROM a.date) = 2023
GROUP BY e.name;`}
                </pre>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Business Impact
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Streamlined payroll processing with accurate data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Better compliance with labor regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Improved workforce planning and budgeting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>



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

export default EkamAttendance;
