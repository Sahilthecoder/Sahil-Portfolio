import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [userMood, setUserMood] = useState('neutral');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const location = useLocation();

  // Detect system theme preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  // Update active tab based on route
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    setActiveTab(path);
  }, [location]);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  // Toggle AI assistant
  const toggleAiAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (aiAssistantOpen) setAiAssistantOpen(false);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Close all overlays
  const closeOverlays = () => {
    setIsMenuOpen(false);
    setAiAssistantOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Start voice command
  const startVoiceCommand = () => {
    setIsListening(true);
    // TODO: Implement Web Speech API integration
  };

  // Stop voice command
  const stopVoiceCommand = () => {
    setIsListening(false);
    // Process the voice command
    processVoiceCommand(voiceCommand);
  };

  // Process voice commands
  const processVoiceCommand = (command) => {
    const normalizedCmd = command.toLowerCase().trim();
    // TODO: Implement command processing
    console.log('Processing command:', normalizedCmd);
  };

  // Detect user mood (simplified)
  const detectMood = async () => {
    try {
      // TODO: Integrate with TensorFlow.js for mood detection
      // This is a placeholder for actual implementation
      const moods = ['happy', 'focused', 'neutral', 'tired'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setUserMood(randomMood);
      
      // Adjust theme based on mood
      if (randomMood === 'tired' && !darkMode) {
        toggleDarkMode();
      } else if (randomMood === 'focused' && darkMode) {
        toggleDarkMode();
      }
    } catch (error) {
      console.error('Error detecting mood:', error);
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        isMenuOpen,
        darkMode,
        activeTab,
        aiAssistantOpen,
        userMood,
        voiceCommand,
        isListening,
        analytics,
        toggleDarkMode,
        toggleAiAssistant,
        toggleMenu,
        closeOverlays,
        startVoiceCommand,
        stopVoiceCommand,
        detectMood,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

export { NavbarContext, NavbarProvider, useNavbar };
