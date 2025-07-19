import React from 'react';
import ProjectCard from './shared/ProjectCard';

const HomeProjectCard = ({ project, index }) => {
  return (
    <ProjectCard 
      project={project}
      index={index}
      className="h-full"
      showViewButton={true}
    />
  );
};

export default HomeProjectCard;
