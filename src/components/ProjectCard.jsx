// src/components/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({
  title,
  description,
  cover,
  liveLink,
  githubLink,
  projectType,
}) => {
  return (
    <article 
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-glass/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      role="article" 
      aria-label={title}
    >
      {cover && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={cover}
            alt={`Screenshot of ${title} project`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-indigo-600 dark:bg-dark-primary rounded-full">
              {projectType}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-heading mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-dark-primary dark:hover:bg-dark-primary/90 rounded-lg transition-colors duration-200"
            >
              <span>Live Preview</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-text-body bg-gray-100 hover:bg-gray-200 dark:bg-dark-glass dark:hover:bg-dark-glass/80 rounded-lg transition-colors duration-200"
            >
              <span>GitHub</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
      </div>
      </div>
    </article>
  );
};

export default ProjectCard;
