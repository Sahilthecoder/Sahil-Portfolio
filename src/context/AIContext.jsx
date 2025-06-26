import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);

  // Simulate AI typing effect
  useEffect(() => {
    if (!isTyping || !aiMessage) return;

    const words = aiMessage.split(' ');
    let currentText = '';
    let currentIndex = 0;

    const typeNextWord = () => {
      if (currentIndex < words.length) {
        currentText += (currentIndex > 0 ? ' ' : '') + words[currentIndex];
        
        setConversation(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage.role === 'assistant' && lastMessage.isTyping) {
            lastMessage.content = currentText;
          } else {
            newMessages.push({
              id: Date.now(),
              role: 'assistant',
              content: currentText,
              isTyping: true,
              timestamp: new Date().toISOString()
            });
          }
          
          return newMessages;
        });
        
        currentIndex++;
        // Random typing speed between 50-150ms per word
        const speed = Math.random() * 100 + 50;
        setTimeout(typeNextWord, speed);
      } else {
        // Finish typing
        setConversation(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.isTyping) {
            delete lastMessage.isTyping;
          }
          return newMessages;
        });
        
        setIsTyping(false);
        setAiMessage('');
      }
    };

    typeNextWord();

    return () => {
      // Cleanup if component unmounts during typing
      setIsTyping(false);
    };
  }, [aiMessage, isTyping]);

  const sendMessage = useCallback((message) => {
    if (!message.trim()) return;

    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      const responses = [
        "I can help you with that!",
        "That's an interesting point. Let me think about it...",
        "I understand you're asking about " + message.split(' ').slice(0, 3).join(' ') + "...",
        "Thanks for your message! I'll get back to you soon.",
        "I'm designed to assist with portfolio-related questions. How can I help?",
        "Let me check that information for you...",
        "I'd be happy to help with " + message.split(' ').slice(0, 2).join(' ') + "!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiMessage(randomResponse);
      setIsTyping(true);
    }, 800);
  }, []);

  const toggleAIAssistant = useCallback(() => {
    setIsAIAssistantOpen(prev => !prev);
  }, []);

  const value = {
    isAIAssistantOpen,
    toggleAIAssistant,
    conversation,
    sendMessage,
    isTyping
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIContextProvider');
  }
  return context;
};

export default AIContext;
