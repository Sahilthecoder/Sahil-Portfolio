import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as speechCommands from '@tensorflow-models/speech-commands';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);
  const [recognizer, setRecognizer] = useState(null);
  const [commands, setCommands] = useState({
    'navigate home': { action: () => window.location.href = '/', confidence: 0 },
    'go to about': { action: () => window.location.href = '/about', confidence: 0 },
    'show projects': { action: () => window.location.href = '/projects', confidence: 0 },
    'contact me': { action: () => window.location.href = '/contact', confidence: 0 },
    'toggle theme': { action: () => document.documentElement.classList.toggle('dark'), confidence: 0 },
    'scroll down': { action: () => window.scrollBy(0, 300), confidence: 0 },
    'scroll up': { action: () => window.scrollBy(0, -300), confidence: 0 },
  });

  // Initialize the speech command recognizer
  useEffect(() => {
    const initRecognizer = async () => {
      try {
        // Check for browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
          setIsSupported(false);
          return;
        }

        // Load the speech commands model
        const recognizer = speechCommands.create('BROWSER_FFT');
        await recognizer.ensureModelLoaded();
        
        // Get the list of words the recognizer has been trained on
        const words = recognizer.wordLabels();
        
        // Update commands with the ones that are supported
        const supportedCommands = {};
        Object.entries(commands).forEach(([phrase, cmd]) => {
          const wordsInPhrase = phrase.toLowerCase().split(' ');
          if (wordsInPhrase.every(word => words.includes(word))) {
            supportedCommands[phrase] = cmd;
          }
        });
        
        setCommands(supportedCommands);
        setRecognizer(recognizer);
      } catch (err) {
        console.error('Error initializing speech recognition:', err);
        setError('Failed to initialize voice commands. Please try again later.');
        setIsSupported(false);
      }
    };

    initRecognizer();

    return () => {
      if (recognizer) {
        recognizer.stopListening();
      }
    };
  }, []);

  const startListening = useCallback(async () => {
    if (!recognizer || !isSupported) return;

    try {
      setIsListening(true);
      setError(null);
      
      // Start listening for commands
      recognizer.listen(
        (result) => {
          const scores = Array.from(result.scores);
          const maxScore = Math.max(...scores);
          const index = scores.indexOf(maxScore);
          const word = recognizer.wordLabels()[index];
          
          // Update transcript
          setTranscript(prev => `${prev} ${word}`.trim());
          
          // Check if the word is part of any command
          Object.entries(commands).forEach(([phrase, cmd]) => {
            if (transcript.toLowerCase().includes(phrase.toLowerCase())) {
              // Update confidence
              const newCommands = { ...commands };
              newCommands[phrase].confidence = maxScore;
              setCommands(newCommands);
              
              // Execute command if confidence is high enough
              if (maxScore > 0.8) {
                cmd.action();
                setTranscript('');
              }
            }
          });
        },
        {
          includeSpectrogram: true,
          probabilityThreshold: 0.7,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.5
        }
      );
    } catch (err) {
      console.error('Error starting voice recognition:', err);
      setError('Failed to start voice recognition. Please check your microphone permissions.');
      setIsListening(false);
    }
  }, [recognizer, isSupported, commands, transcript]);

  const stopListening = useCallback(() => {
    if (recognizer) {
      recognizer.stopListening();
    }
    setIsListening(false);
  }, [recognizer]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const value = {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    toggleListening,
    commands: Object.keys(commands),
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export default VoiceContext;
