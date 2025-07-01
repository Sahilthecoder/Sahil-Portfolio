import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaSpinner, 
  FaTimes, 
  FaPaperPlane, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaFileAlt,
  FaFileUpload 
} from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';
import ErrorBoundary from '../ErrorBoundary';

// Lazy load the heavy component
const AIAssistantContent = lazy(() => import('./AIAssistantContent'));

// Loading component for the AI Assistant
const LoadingSpinner = () => (
  <div className="fixed bottom-8 right-8 w-96 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center justify-center">
    <FaSpinner className="w-6 h-6 animate-spin text-blue-600 mr-3" />
    <span>Loading AI Assistant...</span>
  </div>
);

// Error component for the AI Assistant
const AIAssistantError = ({ onRetry }) => (
  <div className="fixed bottom-8 right-8 w-96 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-2xl shadow-xl p-4">
    <div className="text-red-600 dark:text-red-400 font-medium mb-2">
      Failed to load AI Assistant
    </div>
    <p className="text-sm text-red-500 dark:text-red-400 mb-3">
      There was an error loading the AI Assistant. Please try again.
    </p>
    <button
      onClick={onRetry}
      className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900/70 text-red-700 dark:text-red-300 rounded-md transition-colors"
    >
      Retry
    </button>
  </div>
);

const AIAssistant = () => {
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Default values for the AI Assistant context
  const {
    isOpen = false,
    setIsOpen = () => {},
    messages = [],
    isLoading = false,
    isListening = false,
    isProcessingVoice = false,
    suggestedQuestions = [],
    voiceLevel = 0,
    fileInputRef = useRef(null),
    handleFileUpload = () => {},
    toggleVoiceInput = () => {},
    handleSendMessage = () => {},
    handleSuggestedQuestionClick = () => {},
    voiceCommands = []
  } = useAIAssistant?.() || {};

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage?.(inputValue);
    setInputValue('');
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 mr-2" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500 mr-2" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-green-500 mr-2" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-yellow-500 mr-2" />;
      default:
        return <FaFileAlt className="text-gray-500 mr-2" />;
    }
  };

  const renderMessageContent = (message) => {
    if (message?.file) {
      return (
        <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center">
            {getFileIcon(message.file.name)}
            <a 
              href={message.file.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {message.file.name}
            </a>
          </div>
        </div>
      );
    }
    return <p className="whitespace-pre-line">{message?.text || ''}</p>;
  };

  const handleRetry = () => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <ErrorBoundary
        fallback={({ error, resetErrorBoundary }) => (
          <AIAssistantError onRetry={resetErrorBoundary} />
        )}
        onReset={handleRetry}
      >
        <AIAssistantContent />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <AIAssistantError onRetry={resetErrorBoundary} />
      )}
      onError={() => setHasError(true)}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence>
          {isOpen ? (
            <motion.div 
              className="fixed inset-0 md:bottom-6 md:right-6 md:w-full md:max-w-md md:h-[600px] md:rounded-2xl bg-white dark:bg-gray-800 shadow-2xl flex flex-col z-50 overflow-hidden border-0 md:border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: '100%', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%', scale: 0.98 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <BsRobot className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-semibold text-lg truncate">Portfolio Assistant</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close chat"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4">
                {/* Welcome message with suggestions */}
                {messages?.length <= 1 && (
                  <div className="space-y-3 mb-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Hi! I'm your AI assistant. Ask me about my projects, skills, or experience.
                    </div>
                    {suggestedQuestions?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedQuestionClick?.(question)}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Chat messages */}
                {messages?.map((message, index) => (
                  <div
                    key={message?.id || index}
                    className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message?.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">
                          {message?.sender === 'user' ? 'You' : 'Assistant'}
                        </span>
                        <span className="text-xs opacity-70 ml-2">
                          {formatTime(message?.timestamp || new Date())}
                        </span>
                      </div>
                      {renderMessageContent(message)}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-white dark:bg-gray-800"
              >
                {/* Voice input UI */}
                {isListening && (
                  <div className="relative mb-3">
                    <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-t-xl p-2 transition-all duration-300">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2 mb-2">
                          {[0.1, 0.3, 0.5, 0.2, 0.4].map((level, i) => (
                            <div 
                              key={i}
                              className="w-2 h-6 bg-indigo-500 rounded-sm" 
                              style={{ height: `${(voiceLevel || level) * 100}%` }}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          Listening... {voiceCommands[0] && `(Try: "${voiceCommands[0]}")`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between px-1">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 rounded-full"
                      aria-label="Upload file"
                    >
                      <FaFileUpload className="w-5 h-5" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    disabled={isProcessingVoice}
                    className={`p-3 rounded-full ${
                      isListening 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' 
                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-800/50'
                    } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-800 relative`}
                    aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isProcessingVoice ? (
                      <FaSpinner className="w-5 h-5 animate-spin" />
                    ) : isListening ? (
                      <FaMicrophoneSlash className="w-5 h-5" />
                    ) : (
                      <FaMicrophone className="w-5 h-5" />
                    )}
                    {isListening && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about projects, skills, or experience..."
                    className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-70 placeholder-gray-400 dark:placeholder-gray-500"
                    disabled={isLoading || isListening}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2.5 sm:p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.button
              key="ai-assistant-button"
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              aria-label="Open AI Assistant"
            >
              <FaRobot className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AIAssistant;
