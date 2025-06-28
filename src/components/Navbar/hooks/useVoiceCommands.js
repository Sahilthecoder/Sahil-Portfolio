import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useVoiceCommands = (onCommandProcessed) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);
      
      // If the result is final, process the command
      if (event.results[last].isFinal) {
        processVoiceCommand(text);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(`Error: ${event.error}`);
      stopListening();
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        // Restart recognition if it ended unexpectedly
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  // Process voice commands
  const processVoiceCommand = useCallback((command) => {
    if (!command) return;

    const normalizedCmd = command.toLowerCase().trim();
    let processed = false;

    // Navigation commands
    const navCommands = [
      { pattern: /(go to |navigate to |show me |open )?(home|main)/, path: '/' },
      { pattern: /(go to |navigate to |show me |open )?(about|bio|who are you)/, path: '/about' },
      { pattern: /(go to |navigate to |show me |open )?(projects|work|portfolio)/, path: '/projects' },
      { pattern: /(go to |navigate to |show me |open )?(experience|resume|cv|work history)/, path: '/experience' },
      { pattern: /(go to |navigate to |show me |open )?(contact|get in touch|email|reach out)/, path: '/contact' },
    ];

    // Check navigation commands
    for (const { pattern, path } of navCommands) {
      if (pattern.test(normalizedCmd)) {
        navigate(path);
        speak(`Navigating to ${path === '/' ? 'home' : path.substring(1)}`);
        processed = true;
        break;
      }
    }

    // Theme commands
    if (/(switch to |change to |set )?(dark|night|light|day)( mode| theme)?/.test(normalizedCmd)) {
      const isDark = /(dark|night)/.test(normalizedCmd);
      const isLight = /(light|day)/.test(normalizedCmd);
      
      if (isDark || isLight) {
        const shouldBeDark = isDark;
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        
        if ((shouldBeDark && !isCurrentlyDark) || (!shouldBeDark && isCurrentlyDark)) {
          // Toggle dark mode
          document.dispatchEvent(new CustomEvent('toggleDarkMode'));
          speak(`Switching to ${isDark ? 'dark' : 'light'} mode`);
        } else {
          speak(`Already in ${isDark ? 'dark' : 'light'} mode`);
        }
        processed = true;
      }
    }

    // AI Assistant commands
    if (/(open|show|start|talk to) (ai |assistant|chatbot|bot)/.test(normalizedCmd)) {
      document.dispatchEvent(new CustomEvent('toggleAIAssistant', { detail: { open: true } }));
      speak("Opening AI Assistant");
      processed = true;
    }

    // Help command
    if (/(help|what can you do|what commands|list commands)/.test(normalizedCmd)) {
      const helpText = [
        "You can say things like:",
        "- 'Go to projects' to navigate",
        "- 'Switch to dark mode' to change theme",
        "- 'Open AI assistant' to chat with me",
        "- 'Search for React projects' to find specific work"
      ].join('\n');
      
      speak(helpText);
      processed = true;
    }

    // If no command was processed, pass it to the parent component
    if (!processed && onCommandProcessed) {
      onCommandProcessed(normalizedCmd);
    }

    // Reset transcript after processing
    setTranscript('');
  }, [navigate, onCommandProcessed]);

  // Text-to-speech function
  const speak = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start voice recognition
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
      speak("I'm listening...");
    } catch (err) {
      console.error('Error starting voice recognition:', err);
      setError('Error starting voice recognition. Please try again.');
    }
  }, []);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
      speak("Listening stopped");
    } catch (err) {
      console.error('Error stopping voice recognition:', err);
    }
  }, []);

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
    speak
  };
};

export default useVoiceCommands;
