import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import getImagePath from '../utils/imagePaths';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back to Projects
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              className="h-full w-full object-cover md:w-full"
              src={project.image.startsWith('http') ? project.image : getImagePath('project', project.id, project.image.split('/').pop())}
              alt={project.title}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold">
              {project.category}
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Technologies</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FiGithub className="mr-2" /> View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
