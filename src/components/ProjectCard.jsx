// src/components/ProjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { getImagePath } from '../utils/imageUtils.jsx';

const ProjectCard = ({ title, description, cover, liveLink, githubLink, projectType, id }) => {
  // Format the image source URL
  const formatImageSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return getImagePath('projects', '', path);
  };

  // Determine if this is an internal or external link
  const isInternalLink = liveLink && !liveLink.startsWith('http') && !liveLink.startsWith('//');
  
  const navigate = useNavigate();
  
  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on a button or link
    if (e.target.closest('button, a')) {
      return;
    }
    if (liveLink) {
      if (isInternalLink) {
        navigate(liveLink);
      } else {
        window.open(liveLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Wrapper component for project card content
  const ProjectContent = () => (
    <div 
      onClick={handleCardClick}
      className="group card hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden animate-fade-in"
      style={{
        '--delay': Math.random() * 0.5 + 's',
        animationDelay: 'var(--delay)'
      }}
    >
      {cover && (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={formatImageSrc(cover)}
            alt={`Screenshot of ${title} project`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            fallbackSrc={getImagePath('', 'fallback', 'placeholder.svg')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-indigo-600 dark:bg-dark-primary rounded-full">
              {projectType}
            </span>
          </div>
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-heading dark:text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-pretty text-gray-600 dark:text-gray-300 mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-3 mt-auto">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              View Project
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.685-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <article
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-dark-glass/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
      role="article"
      aria-label={title}
    >
      {isInternalLink ? (
        <Link 
          to={liveLink.startsWith('/') ? liveLink : `/${liveLink}`}
          className="block h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <ProjectContent />
        </Link>
      ) : (
        <div className="h-full">
          <ProjectContent />
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
