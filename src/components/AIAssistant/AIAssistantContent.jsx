import React, { useRef, useEffect } from 'react';
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

const AIAssistantContent = () => {
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
    inputValue,
    setInputValue,
    handleSendMessage,
    handleKeyDown,
    toggleListening,
    handleFileUpload,
    handleFileChange,
    handleSuggestionClick,
    formatMessageContent,
    getFileIcon
  } = useAIAssistant();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open AI Assistant"
        >
          <BsRobot className="w-8 h-8" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
      style={{ height: '600px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BsRobot className="w-5 h-5" />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close AI Assistant"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500 dark:text-gray-400">
            <BsRobot className="w-12 h-12 mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
            <p className="text-sm mb-6">Ask me anything about my work, skills, or experience.</p>
            
            <div className="w-full space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="w-full text-left p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-100 dark:bg-blue-900 rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 rounded-bl-none'
                  }`}
                >
                  {message.type === 'text' ? (
                    <div className="prose dark:prose-invert prose-sm">
                      {formatMessageContent(message.content)}
                    </div>
                  ) : message.type === 'file' ? (
                    <div className="flex items-center space-x-2">
                      {getFileIcon(message.fileType)}
                      <span className="text-sm">{message.fileName}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              ref={inputRef}
            />
            <div className="absolute right-2 flex space-x-1">
              <button
                onClick={toggleListening}
                disabled={isProcessingVoice}
                className={`p-2 rounded-full ${
                  isListening
                    ? 'text-red-500 bg-red-100 dark:bg-red-900/30'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                } transition-colors`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? (
                  <div className="flex items-center">
                    <div 
                      className="w-2 h-2 bg-red-500 rounded-full mr-1"
                      style={{
                        transform: `scale(${1 + (voiceLevel / 100) * 2})`,
                        opacity: 0.8 + (voiceLevel / 100) * 0.2,
                        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                      }}
                    />
                    <FaMicrophoneSlash className="w-4 h-4" />
                  </div>
                ) : isProcessingVoice ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaMicrophone className="w-4 h-4" />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <button
                onClick={handleFileUpload}
                disabled={isLoading}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Upload file"
              >
                <FaFileUpload className="w-4 h-4" />
              </button>
              <button
                onClick={() => inputValue.trim() && handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-full ${
                  inputValue.trim()
                    ? 'text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    : 'text-gray-400 cursor-not-allowed'
                } transition-colors`}
                aria-label="Send message"
              >
                {isLoading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaPaperPlane className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Try: "Tell me about your experience"</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantContent;
