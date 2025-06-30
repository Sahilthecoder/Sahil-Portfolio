import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectLayout = ({
  title,
  description,
  tags = [],
  children,
  stats = [],
  links = {},
  category,
  date,
  role,
  tools = []
}) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors group"
        >
          <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
                  {category && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {category}
                    </span>
                  )}
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {(date || role || tools.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                    {date && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Date</p>
                        <p className="text-sm text-gray-900 dark:text-white">{date}</p>
                      </div>
                    )}
                    {role && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Role</p>
                        <p className="text-sm text-gray-900 dark:text-white">{role}</p>
                      </div>
                    )}
                    {tools.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Tools</p>
                        <p className="text-sm text-gray-900 dark:text-white">{tools.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 mt-4 md:mt-0">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                )}
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            {stats.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-4 rounded-xl ${stat.bgColor || 'bg-gray-50 dark:bg-gray-700/30'}`}>
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${stat.iconBgColor || 'bg-indigo-100 dark:bg-indigo-900/30'} ${stat.iconColor || 'text-indigo-600 dark:text-indigo-400'} mr-3`}>
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {child}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectLayout;
