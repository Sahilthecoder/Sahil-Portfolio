import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FiMic, FiMicOff, FiSend, FiX, FiMessageSquare, FiCommand, FiHelpCircle } from 'react-icons/fi';
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
      id: 1,
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
      id: Date.now(),
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
    
    // Process command
    processVoiceCommand(message);
    
    // Clear input
    setInput('');
    setIsProcessing(false);
  };
  
  // Helper function to generate AI responses
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you today?";
    } else if (lowerMessage.includes('help')) {
      return "I can help you navigate the portfolio, provide information, or answer questions. Try asking about projects, skills, or experience.";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return "Here are some of my projects: [Project 1], [Project 2], [Project 3]. Would you like to know more about any of them?";
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('experience')) {
      return "I have experience with React, Node.js, and various web technologies. Is there something specific you'd like to know?";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach me at example@email.com or through the contact form on the website.";
    } else {
      return "I'm not sure how to respond to that. Could you try asking something else?";
    }
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

  // Available voice commands with actions and icons
  const commands = [
    { 
      command: 'navigate home', 
      description: 'Go to home page',
      icon: '🏠',
      action: () => navigate('/')
    },
    { 
      command: 'go to about', 
      description: 'Go to about page',
      icon: '👤',
      action: () => navigate('/about')
    },
    { 
      command: 'show projects', 
      description: 'Show projects page',
      icon: '💼',
      action: () => navigate('/projects')
    },
    { 
      command: 'contact me', 
      description: 'Go to contact page',
      icon: '✉️',
      action: () => navigate('/contact')
    },
    { 
      command: 'toggle theme', 
      description: 'Toggle light/dark mode',
      icon: '🌓',
      action: () => document.documentElement.classList.toggle('dark')
    },
    { 
      command: 'scroll down', 
      description: 'Scroll down the page',
      icon: '⬇️',
      action: () => window.scrollBy({ top: 300, behavior: 'smooth' })
    },
    { 
      command: 'scroll up', 
      description: 'Scroll up the page',
      icon: '⬆️',
      action: () => window.scrollBy({ top: -300, behavior: 'smooth' })
    }
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle voice input
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);

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
      addMessage(`Switching to ${isDarkMode ? 'light' : 'dark'} mode...`, 'ai');
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
      // Only respond if the command isn't empty
      addMessage(`I heard: "${command}". How can I assist you with that?`, 'ai');
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Listening State */}
              <div className="flex flex-col items-center justify-center py-4">
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
                  <AnimatePresence mode='wait'>
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
                      <>
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                      </>
                    )}
                  </svg>
                </button>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isListening ? 'Listening...' : 'Tap to speak'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Try saying: "Show me your projects"
                </p>
              </div>

              {/* Messages */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 transition-colors">
                <div className="h-40 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div
                        className={`inline-block px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-tr-none'
                            : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-none'
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
              </div>

              {/* Available Commands */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FiHelpCircle className="mr-2" />
                  <span className="font-medium">Available Commands</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 -mr-2">
                  {commands.map((cmd, index) => (
                    <div key={index} className="flex items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-700/30 rounded-lg transition-colors cursor-default">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">"{cmd.command}"</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{cmd.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <motion.button
        ref={buttonRef}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-14 h-14 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-600'} text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : isListening ? (
          <FiMic className="w-6 h-6" />
        ) : (
          <FiMessageSquare className="w-6 h-6" />
        )}
        {isListening && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></span>
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
