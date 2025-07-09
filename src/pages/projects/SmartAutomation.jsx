import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaTools, FaGithub, FaLink, FaServer, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SmartAutomation = () => {
  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-16 lg:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="w-full md:w-2/3">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Smart Automation Solutions
                </h1>
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Automation + AI
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Intelligent automation solutions leveraging AI and machine learning to streamline
                business processes, reduce manual effort, and improve operational efficiency.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  '#Automation',
                  '#ArtificialIntelligence',
                  '#MachineLearning',
                  '#Robotics',
                  '#ProcessOptimization',
                  '#DeepLearning',
                  '#SentimentAnalysis',
                  '#CharacterAI',
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <FaTools className="mr-2" />
                  <span>BERT, Transformers, NLTK, SpaCy, PyTorch, TensorFlow, BERT</span>
                </div>
                <a
                  href="https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/SnapeSentimentAnalysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <FaGithub className="mr-1" />
                  View on GitHub
                </a>
              </div>

              {/* Project Cover */}
              <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                <img
                  src="https://images.unsplash.com/photo-1608889825205-eeb911fe6048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Severus Snape Sentiment Analysis"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                  }}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Project Highlights
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-green-500 flex items-center justify-center mr-3">
                      <FaSearch className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Advanced NLP Processing
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Implemented BERT and custom transformers for deep semantic analysis of
                        character dialogue
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-purple-500 flex items-center justify-center mr-3">
                      <FaChartPie className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Emotional Intelligence
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Deployed custom ML models to detect 27 distinct emotional states beyond
                        basic sentiment
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500 flex items-center justify-center mr-3">
                      <FaBook className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Narrative Analysis
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Applied graph neural networks to map character relationships and narrative
                        evolution
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Overview
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This advanced NLP research project employs state-of-the-art machine learning
                techniques including BERT, transformer architectures, and graph neural networks to
                perform a comprehensive analysis of Severus Snape's character development. By
                processing over 100,000 words of dialogue and narrative text, the system identifies
                subtle emotional patterns, personality shifts, and relationship dynamics that evolve
                throughout the series.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                The analysis goes beyond basic sentiment analysis, incorporating contextual
                embeddings, attention mechanisms, and temporal modeling to reveal how Snape's
                language use and emotional expression change in relation to key plot points,
                providing unprecedented insights into one of literature's most complex characters.
              </p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technical Implementation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Advanced Data Processing
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Built custom web scraping pipeline with anti-blocking measures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Implemented data augmentation for rare dialogue patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      Applied advanced NLP preprocessing including lemmatization and dependency
                      parsing
                    </span>
                  </li>
                </ul>
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Data Collection Process"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1486406149866-d6fc28fc647f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Machine Learning Analysis
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Fine-tuned BERT model for nuanced sentiment analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Implemented transformer-based emotion classification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>Developed custom attention visualization for interpretability</span>
                  </li>
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Python',
                      'PyTorch',
                      'Transformers',
                      'SpaCy',
                      'NetworkX',
                      'BERT',
                      'HuggingFace',
                    ].map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Emotional Patterns
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Detected significant emotional complexity in dialogue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Identified key emotional turning points</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Emotional Patterns"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1486406149866-d6fc28fc647f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Themes
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Redemption and sacrifice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Love and loss</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Dualities in character</span>
                  </li>
                </ul>
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Thematic Analysis"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1486406149866-d6fc28fc647f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: <FaRobot className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: 'AI-Powered Automation',
                  description: 'Leverage machine learning to automate complex decision-making processes and repetitive tasks.'
                },
                {
                  icon: <FaTools className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: 'Process Optimization',
                  description: 'Streamline workflows and eliminate bottlenecks in business operations.'
                },
                {
                  icon: <FaServer className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: 'Scalable Infrastructure',
                  description: 'Cloud-based solutions that scale with your business needs.'
                },
                {
                  icon: <FaDatabase className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                  title: 'Data Integration',
                  description: 'Seamlessly connect with existing systems and data sources.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Python', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'REST APIs'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/SmartAutomation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaGithub className="mr-2" />
                  View on GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaLink className="mr-2" />
                  Live Demo
                </a>
              </div>
              </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartAutomation;
