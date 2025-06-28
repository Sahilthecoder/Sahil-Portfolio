import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMic, FiX, FiMessageSquare, FiZap } from 'react-icons/fi';
import useAIAssistant from '../hooks/useAIAssistant';

const AIAssistant = () => {
  const { aiAssistantOpen, toggleAiAssistant } = useNavbar();
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const {
    messages,
    isTyping,
    isProcessing,
    suggestions,
    processMessage,
    handleQuickAction
  } = useAIAssistant();

  // Focus input when assistant opens
  useEffect(() => {
    if (aiAssistantOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [aiAssistantOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;
    
    const message = inputMessage.trim();
    setInputMessage('');
    processMessage(message);
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      // Stop voice input
      setIsListening(false);
      // In a real app, you would stop the speech recognition here
    } else {
      // Start voice input
      setIsListening(true);
      // In a real app, you would start the speech recognition here
      // and update inputMessage with the transcribed text
    }
  };

  // Format message timestamps
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 300 
      } 
    },
    exit: { 
      x: '100%',
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 300 
      } 
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {aiAssistantOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleAiAssistant}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          
          {/* Assistant Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col border-l border-white/10 dark:border-gray-800/30"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 dark:border-gray-800/30 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <FiZap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs opacity-80">Ask me anything about my work</p>
                  </div>
                </div>
                <button
                  onClick={toggleAiAssistant}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close assistant"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>
                      <div className={`text-xs mt-1 opacity-70 text-right ${
                        message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex items-center space-x-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 w-24"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse delay-200"></div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>
            
            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 pb-2 overflow-x-auto">
                <div className="flex space-x-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(suggestion)}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Area */}
            <div className="p-4 border-t border-white/10 dark:border-gray-800/30">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  disabled={isProcessing}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    className={`p-2 rounded-full ${
                      isListening 
                        ? 'text-red-500 bg-red-100 dark:bg-red-900/30' 
                        : 'text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400'
                    } transition-colors`}
                    title={isListening ? 'Listening...' : 'Voice input'}
                  >
                    <FiMic className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isProcessing}
                    className={`p-2 rounded-full ${
                      inputMessage.trim() 
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
                        : 'text-gray-400 bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                    } transition-colors`}
                    title="Send message"
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                Ask about my projects, skills, or experience
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;
