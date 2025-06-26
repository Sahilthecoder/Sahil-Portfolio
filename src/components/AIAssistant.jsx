import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from '../context/ThemeContext';
import { useVoice } from '../context/VoiceContext';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const { isListening, transcript, toggleListening } = useVoice();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle voice input
  useEffect(() => {
    if (transcript) {
      setInput(prev => `${prev} ${transcript}`.trim());
    }
  }, [transcript]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that!",
        "That's an interesting question. Let me think...",
        "I understand you're asking about " + input.split(' ').slice(0, 3).join(' ') + "...",
        "Thanks for your message! I'll get back to you soon.",
        "I'm designed to assist with portfolio-related questions. How can I help?"
      ];
      
      const aiMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 h-[500px] bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              border: theme === 'futuristic' ? '1px solid rgba(183, 0, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Chat header */}
            <div 
              className="p-4 border-b flex items-center justify-between"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                background: theme === 'futuristic' 
                  ? 'linear-gradient(90deg, rgba(183, 0, 255, 0.2), rgba(0, 247, 255, 0.2))' 
                  : 'transparent'
              }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h3 className="font-bold">AI Assistant</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : theme === 'dark' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-gray-800'}`}
                  >
                    {message.sender === 'ai' && message.id === messages[messages.length - 1]?.id ? (
                      <TypeAnimation
                        sequence={[message.text]}
                        wrapper="span"
                        cursor={false}
                        speed={70}
                        style={{ fontSize: '0.875rem', display: 'inline-block' }}
                      />
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p className="text-xs opacity-50 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 rounded-lg bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: theme === 'dark' ? 'white' : 'black',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-full ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-500'}`}
                    title={isListening ? 'Stop listening' : 'Use voice input'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
                    disabled={!input.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${theme === 'futuristic' 
            ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' 
            : theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-gray-800'}`}
          style={{
            boxShadow: theme === 'futuristic' ? '0 0 20px rgba(183, 0, 255, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default AIAssistant;
