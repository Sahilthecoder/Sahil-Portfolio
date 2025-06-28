import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaSpinner, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaFileUpload,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage
} from 'react-icons/fa';
import { BsRobot, BsLightbulb } from 'react-icons/bs';
import useAIAssistant from '../../hooks/useAIAssistant';

const AIAssistant = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    isListening,
    isProcessingVoice,
    suggestedQuestions,
    voiceLevel,
    fileInputRef,
    handleFileUpload,
    toggleVoiceInput,
    handleSendMessage,
    handleSuggestedQuestionClick,
    voiceCommands = []
  } = useAIAssistant();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
    setInputValue('');
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
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
    if (message.file) {
      return (
        <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {getFileIcon(message.file.name)}
          <div>
            <p className="text-sm font-medium">{message.file.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(message.file.size / 1024).toFixed(1)} KB • {message.file.type}
            </p>
          </div>
        </div>
      );
    }
    return <p className="text-sm">{message.text}</p>;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            className="fixed inset-0 md:bottom-6 md:right-6 md:w-full md:max-w-md md:h-[600px] md:rounded-2xl bg-white dark:bg-gray-800 shadow-2xl flex flex-col z-50 overflow-hidden border-0 md:border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: '100%', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '100%', scale: 0.98 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              // Mobile first: full screen on small devices
              '@media (min-width: 768px)': {
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                width: '100%',
                maxWidth: '28rem',
                height: '37.5rem',
                borderRadius: '1rem',
              },
            }}
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
              {messages.length <= 1 && (
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Try asking me about:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestionClick(question)}
                        className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors flex items-center"
                      >
                        <BsLightbulb className="mr-1.5" size={12} />
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages list */}
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div 
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-900 dark:text-indigo-100 rounded-br-none' 
                        : 'bg-gray-100 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 rounded-bl-none'
                    }`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-sm sm:text-base">
                      {renderMessageContent(message)}
                    </div>
                    <p className="text-xs mt-1.5 opacity-60 text-right">
                      {formatTime(message.timestamp)}
                    </p>
                  </motion.div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form 
              onSubmit={handleSubmit} 
              className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              {/* Voice input UI */}
              <div className="relative mb-3">
                {isListening && (
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-t-xl p-2 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-2 mb-2">
                        <div 
                          className="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                          style={{
                            transform: `scale(${1 + (voiceLevel / 100)})`,
                            opacity: 0.7 + (voiceLevel / 300),
                            transition: 'transform 0.1s ease-out'
                          }}
                        />
                        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-200">
                          Listening...
                        </p>
                      </div>
                      
                      <div className="w-full max-w-xs bg-white/50 dark:bg-black/20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-100"
                          style={{ width: `${voiceLevel}%` }}
                        />
                      </div>
                      
                      {voiceCommands.length > 0 && (
                        <div className="mt-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Try saying:</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {voiceCommands.slice(0, 3).map((cmd, i) => (
                              <span 
                                key={i}
                                className="inline-block px-2 py-1 text-xs bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600"
                              >
                                {cmd}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaMicrophoneSlash className="w-5 h-5" />
                        </div>
                      </div>
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
              </div>
              
              <div className="flex items-center space-x-2">
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
    </>
  );
};

export default AIAssistant;
