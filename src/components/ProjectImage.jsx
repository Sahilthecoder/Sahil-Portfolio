import React from 'react';
import PropTypes from 'prop-types';

const ProjectImage = ({ 
  projectId, 
  imageName, 
  alt, 
  className = '', 
  caption = '' 
}) => {
    // Map project IDs to their corresponding folder names
  const projectFolders = {
    'zomato': 'Project1 excel',
    'bansal': 'Project2 tableau',
    'ekam': 'Project3 Sql+Sheets',
    'retail': 'Project4 Power BI',
    'ai-planner': 'Project5 Gpt+Notion',
    'automation-suite': 'Project6 Gpt+Zapier',
    'mahira-portfolio': 'Mahira Portfolio Web+AI'
  };
  
  const folderName = projectFolders[projectId] || projectId;
  const imagePath = `/images/projects/${folderName}/${imageName}`;
  
  return (
    <div className="relative group w-full">
      <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <div className="absolute inset-0">
            <img
              src={imagePath}
              alt={alt}
              className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${className}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          </div>
        </div>
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {caption}
        </p>
      )}
    </div>
  );
};

ProjectImage.propTypes = {
  projectId: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  caption: PropTypes.string
};

export default ProjectImage;
