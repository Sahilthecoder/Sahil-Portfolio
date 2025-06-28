import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FiMic, FiMicOff, FiSend, FiX, FiCommand, FiHelpCircle } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return { isListening, transcript, toggleListening };
};

const AIAssistant = () => {
  // Hooks and refs
  const navigate = useNavigate();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg-1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isTyping: true,
      typedText: '',
      typingIndex: 0
    },
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const { isListening, transcript, toggleListening } = useVoiceRecognition();
  
  // Handle typing animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        let hasTyping = false;

        for (let i = 0; i < updatedMessages.length; i++) {
          const msg = updatedMessages[i];
          if (msg.isTyping && msg.typingIndex < msg.text.length) {
            msg.typedText = msg.text.substring(0, msg.typingIndex + 1);
            msg.typingIndex += 1;
            hasTyping = true;
            if (msg.typingIndex >= msg.text.length) {
              msg.isTyping = false;
            }
            break;
          }
        }
        return hasTyping ? [...updatedMessages] : prevMessages;
      });
    }, 30); // Typing speed

    return () => clearInterval(timer);
  }, []);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Handle voice recognition transcript updates
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);
  
  // Toggle chat panel with animation
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  // Robot animation variants
  const robotVariants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    listening: {
      y: [0, -15, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    processing: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Add a new message to the chat
  const addMessage = (text, sender = 'user') => {
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender,
      timestamp: new Date().toISOString(),
      isTyping: sender === 'ai',
      typedText: '',
      typingIndex: 0
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // If it's a user message, process it
    if (sender === 'user') {
      processUserMessage(text);
    }
  };
  
  // Process user message and generate response
  const processUserMessage = (message) => {
    setIsProcessing(true);
    processVoiceCommand(message);
    setInput('');
    setIsProcessing(false);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addMessage(input, 'user');
    setInput('');
  };
  
  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Process voice commands
  const processVoiceCommand = (command) => {
    const normalizedCommand = command.toLowerCase().trim();
    
    // Navigation commands
    if (normalizedCommand.includes('home') || normalizedCommand.includes('go home')) {
      navigate('/');
      addMessage('Navigating to home page...', 'ai');
    } else if (normalizedCommand.includes('about') || normalizedCommand.includes('who are you')) {
      navigate('/about');
      addMessage('Navigating to about page...', 'ai');
    } else if (normalizedCommand.includes('projects') || normalizedCommand.includes('show projects')) {
      navigate('/projects');
      addMessage('Navigating to projects page...', 'ai');
    } else if (normalizedCommand.includes('contact') || normalizedCommand.includes('get in touch')) {
      navigate('/contact');
      addMessage('Navigating to contact page...', 'ai');
    } 
    // Theme commands
    else if (normalizedCommand.includes('theme') || normalizedCommand.includes('dark mode') || normalizedCommand.includes('light mode')) {
      toggleTheme();
      const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'futuristic' : 'dark';
      addMessage(`Switching to ${newTheme} mode...`, 'ai');
    }
    // Scroll commands
    else if (normalizedCommand.includes('scroll down') || normalizedCommand.includes('scroll down the page')) {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      addMessage('Scrolling down...', 'ai');
    } else if (normalizedCommand.includes('scroll up') || normalizedCommand.includes('scroll to top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      addMessage('Scrolling to top...', 'ai');
    }
    // Help command
    else if (normalizedCommand.includes('help') || normalizedCommand.includes('what can you do')) {
      addMessage('I can help you navigate the website, change themes, and answer questions. Try saying "go to projects" or "switch to dark mode".', 'ai');
    }
    // Default response
    else if (normalizedCommand) {
      addMessage(`I heard: "${command}". How can I assist you with that?`, 'ai');
    }
  };

  // Toggle chat with keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 500 }}
            className="w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close assistant"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="h-64 overflow-y-auto mb-4 pr-2 -mr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                      }`}
                    >
                      {message.sender === 'ai' && message.isTyping 
                        ? (message.typedText || '') + (message.isTyping ? '|' : '')
                        : message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`ml-2 p-2 rounded-full ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                  } hover:opacity-80 transition-colors`}
                  aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <FiMicOff /> : <FiMic />}
                </button>
              </form>

              {/* Available Commands */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <FiCommand className="mr-2" />
                  <span className="font-medium">Try saying:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Go to projects', 'Toggle theme', 'Scroll down', 'Help'].map((cmd) => (
                    <span 
                      key={cmd}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => addMessage(cmd, 'user')}
                    >
                      "{cmd}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Robot Button */}
      <motion.button
        ref={buttonRef}
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : isListening 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI Assistant' : isListening ? 'Listening...' : 'Open AI Assistant'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center"
            >
              <FiX className="w-8 h-8" />
            </motion.span>
          ) : (
            <motion.div
              key="robot"
              className="flex flex-col items-center justify-center relative"
              variants={robotVariants}
              animate={isListening ? "listening" : isProcessing ? "processing" : "idle"}
            >
              <FaRobot className="w-8 h-8" />
              {isListening && (
                <div className="absolute -bottom-1 flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 h-1 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
