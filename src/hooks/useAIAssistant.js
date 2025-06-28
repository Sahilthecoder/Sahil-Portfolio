import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { generateAIResponse, getNavigationIntent } from '../services/aiService';

const useAIAssistant = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: "Hi there! I'm your AI Portfolio Assistant. I can help you learn more about Sahil's projects and skills. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const animationFrameRef = useRef(null);
  
  const [suggestedQuestions] = useState([
    'Tell me about the Retail Cash Flow project',
    'What technologies does Sahil know?',
    'How can I contact Sahil?',
    'Tell me about the Ekam Attendance System'
  ]);
  
  const voiceCommands = [
    'Navigate to projects',
    'Show me the about page',
    'Tell me about your experience',
    'What projects have you worked on?',
    'Contact information',
    'Show me the Retail Cash Flow project',
    'Tell me about Ekam Attendance',
    'What skills do you have?',
    'View your resume',
    'Open GitHub profile'
  ];
  
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize speech recognition and audio context
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Web Audio API for voice level detection
    const initAudioContext = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 32;
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
      } catch (error) {
        console.error('Error initializing audio context:', error);
      }
    };

    // Initialize Speech Recognition
    const initSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn('Speech recognition not supported in this browser');
        return;
      }

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        setIsProcessingVoice(true);
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          // Add a small delay to show processing state
          setTimeout(() => {
            handleSendMessage(transcript);
            setIsProcessingVoice(false);
          }, 800);
        } else {
          setIsProcessingVoice(false);
        }
        stopVoiceInput();
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsProcessingVoice(false);
        stopVoiceInput();
      };

      recognitionRef.current.onspeechend = () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    };

    initAudioContext();
    initSpeechRecognition();

    return () => {
      stopVoiceInput();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Voice level animation
  useEffect(() => {
    if (!isListening || !analyserRef.current) {
      setVoiceLevel(0);
      return;
    }

    const updateVoiceLevel = () => {
      if (!analyserRef.current) return;
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      // Scale to 0-100 for the visualizer
      const level = Math.min(Math.max(average, 0), 100);
      
      setVoiceLevel(level);
      animationFrameRef.current = requestAnimationFrame(updateVoiceLevel);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateVoiceLevel);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening]);
  
  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors when stopping an already stopped recognition
      }
    }
    setIsListening(false);
    
    // Stop audio stream
    if (microphoneRef.current) {
      microphoneRef.current.getTracks().forEach(track => track.stop());
      microphoneRef.current = null;
    }
    
    // Reset voice level
    setVoiceLevel(0);
  };

  // Toggle voice input
  const toggleVoiceInput = useCallback(async () => {
    if (!recognitionRef.current) {
      console.error('Speech recognition not supported');
      return;
    }

    if (isListening) {
      stopVoiceInput();
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Set up audio processing
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      microphoneRef.current = stream;
      
      // Start voice recognition
      recognitionRef.current.start();
      setIsListening(true);
      
      // Auto-stop listening after 10 seconds of no speech
      setTimeout(() => {
        if (isListening) {
          stopVoiceInput();
        }
      }, 10000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      stopVoiceInput();
    }
  }, [isListening]);

  // Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      // In a real app, you would process the file content here
      // For now, we'll just send a message about the file
      const message = {
        id: uuidv4(),
        text: `I've uploaded a file: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          content: content
        }
      };
      
      setMessages(prev => [...prev, message]);
      // Process the file and generate a response
      processFileAndRespond(file, content);
    };
    reader.readAsText(file);
  }, []);

  // Process the uploaded file and generate a response
  const processFileAndRespond = async (file, content) => {
    setIsLoading(true);
    try {
      // In a real app, you would process the file content here
      // For now, we'll just send a generic response
      setTimeout(() => {
        const response = {
          id: uuidv4(),
          text: `I've processed your ${file.type} file (${(file.size / 1024).toFixed(2)} KB). I can help analyze project documents, resumes, or any other relevant files.`,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsLoading(false);
    }
  };

  // Send a message and get AI response
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Check for navigation intent
      const navIntent = getNavigationIntent(text);
      if (navIntent) {
        // Add the navigation response message
        const navMessage = {
          id: uuidv4(),
          text: navIntent.response,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update messages with the response
        setMessages(prev => [...prev, navMessage]);
        
        // Navigate to the intended page
        navigate(navIntent.path);
        
        setIsLoading(false);
        return;
      }

      // Get AI response if no navigation intent
      const aiResponse = await generateAIResponse([...messages, userMessage]);
      
      // Add AI response
      const aiMessage = {
        id: uuidv4(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Convert text to speech if enabled
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, navigate]);

  // Handle sending a message
  const handleSendMessage = useCallback((text) => {
    if (!text.trim()) return;
    sendMessage(text);
  }, [sendMessage]);

  // Handle suggested question click
  const handleSuggestedQuestionClick = useCallback((question) => {
    handleSendMessage(question);
  }, [handleSendMessage]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    isListening,
    isProcessingVoice,
    voiceLevel,
    suggestedQuestions,
    voiceCommands,
    fileInputRef,
    handleFileUpload,
    toggleVoiceInput,
    handleSendMessage,
    handleSuggestedQuestionClick,
  };
};

export default useAIAssistant;
