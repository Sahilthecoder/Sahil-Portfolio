import React, { useState, useEffect } from 'react';
import ModernButton from '../ui/ModernButton';
import { FiCode, FiCopy, FiCheck, FiMail, FiGithub, FiArrowRight, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const UIPlayground = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);
  
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const buttonVariants = [
    { label: 'Primary', variant: 'primary' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Outline', variant: 'outline' },
    { label: 'Ghost', variant: 'ghost' },
    { label: 'Danger', variant: 'danger' },
  ];
  
  const buttonSizes = [
    { label: 'Small', size: 'sm' },
    { label: 'Medium', size: 'md' },
    { label: 'Large', size: 'lg' },
  ];
  
  const buttonCode = `// ModernButton Component
<ModernButton 
  variant="primary" 
  size="md" 
  icon="arrow" 
  iconPosition="right"
  className="my-2"
>
  Click Me
</ModernButton>`;

  if (!isVisible) return null;
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">
            UI Playground
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore modern UI components built with Tailwind CSS and Framer Motion
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['buttons', 'cards', 'animations', 'forms'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Buttons Tab */}
        {activeTab === 'buttons' && (
          <div className="space-y-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Button Variants</h3>
                <button
                  onClick={() => copyCode(buttonCode)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
                  title="Copy code"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Variants */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-4">
                    {buttonVariants.map(({ label, variant }) => (
                      <ModernButton key={variant} variant={variant}>
                        {label} Button
                      </ModernButton>
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    {buttonSizes.map(({ label, size }) => (
                      <ModernButton key={size} size={size} variant="primary">
                        {label}
                      </ModernButton>
                    ))}
                  </div>
                </div>
                
                {/* With Icons */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">With Icons</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <ModernButton variant="primary" icon="mail" iconPosition="left">
                      Email Me
                    </ModernButton>
                    <ModernButton variant="outline" icon="github">
                      GitHub
                    </ModernButton>
                    <ModernButton variant="ghost" icon="arrow" iconPosition="right">
                      View Projects
                    </ModernButton>
                  </div>
                </div>
                
                {/* Loading State */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Loading State</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <ModernButton variant="primary" isLoading>
                      Processing...
                    </ModernButton>
                    <ModernButton variant="outline" isLoading>
                      Loading...
                    </ModernButton>
                  </div>
                </div>
                
                {/* Full Width */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Full Width</h4>
                  <ModernButton variant="primary" fullWidth className="mb-4">
                    Full Width Button
                  </ModernButton>
                  <ModernButton variant="outline" fullWidth icon="arrow" iconPosition="right">
                    Full Width with Icon
                  </ModernButton>
                </div>
              </div>
              
              {/* Code Example */}
              <div className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>{buttonCode}</code>
                </pre>
              </div>
            </div>
            
            {/* Animation Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Animation Examples</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl text-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl animate-float">
                    🚀
                  </div>
                  <h4 className="font-medium mb-2">Float Animation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Subtle floating effect for attention-grabbing elements
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/30 dark:to-accent-800/20 rounded-xl text-center">
                  <div className="w-16 h-16 bg-accent-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl animate-scale-in">
                    ✨
                  </div>
                  <h4 className="font-medium mb-2">Scale In</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smooth scale animation for content appearing on screen
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl animate-fade-in">
                    🎯
                  </div>
                  <h4 className="font-medium mb-2">Fade In</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Clean fade-in effect for smooth content transitions
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Coming Soon Tabs */}
        {activeTab !== 'buttons' && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto
            ">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-500 mx-auto mb-6">
                <FiCode className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're working on more amazing UI components for you to explore!
              </p>
              <ModernButton 
                variant="primary" 
                onClick={() => setActiveTab('buttons')}
              >
                Back to Buttons
              </ModernButton>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default UIPlayground;
