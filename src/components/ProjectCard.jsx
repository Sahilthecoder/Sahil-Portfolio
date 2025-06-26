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
    <article className="project-card" role="region" aria-label={title}>
      {cover && (
        <img
          src={cover}
          alt={`Screenshot of ${title} project`}
          className="project-card__image"
        />
      )}
      <div className="project-card__content">
        <h3>{title}</h3>
        {projectType && <p className="project-type">{projectType}</p>}
        <p>{description}</p>
        <div className="project-card__actions">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Live Preview
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
