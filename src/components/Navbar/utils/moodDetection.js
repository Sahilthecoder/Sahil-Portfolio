import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';

export class MoodDetector {
  constructor() {
    this.model = null;
    this.isDetecting = false;
    this.videoElement = null;
    this.canvasElement = null;
    this.onMoodDetected = null;
    this.detectionInterval = null;
    this.moodHistory = [];
    this.moodLabels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral'];
  }

  // Initialize the model and camera
  async initialize(videoElement, canvasElement, onMoodDetected) {
    try {
      // Check for media devices support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Camera access not supported in this browser');
        return false;
      }

      this.videoElement = videoElement;
      this.canvasElement = canvasElement;
      this.onMoodDetected = onMoodDetected;

      // Load the Face Landmarks model
      await tf.setBackend('webgl');
      this.model = await facemesh.load(
        facemesh.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
      );

      // Start the camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      this.videoElement.srcObject = stream;
      await new Promise((resolve) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play();
          resolve();
        };
      });

      // Set up canvas
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;
      this.ctx = this.canvasElement.getContext('2d');

      return true;
    } catch (error) {
      console.error('Error initializing mood detection:', error);
      return false;
    }
  }

  // Start mood detection
  startDetection() {
    if (this.isDetecting || !this.model) return;

    this.isDetecting = true;
    this.detectionInterval = setInterval(() => this.detectMood(), 1000);
  }

  // Stop mood detection
  stopDetection() {
    if (!this.isDetecting) return;

    clearInterval(this.detectionInterval);
    this.isDetecting = false;
    
    // Stop all video tracks
    if (this.videoElement && this.videoElement.srcObject) {
      const tracks = this.videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  // Detect mood from facial expression
  async detectMood() {
    if (!this.isDetecting || !this.model) return;

    try {
      // Draw video frame to canvas
      this.ctx.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      // Get face landmarks
      const predictions = await this.model.estimateFaces({
        input: this.videoElement,
        returnTensors: false,
        flipHorizontal: false,
        predictIrises: false,
      });

      if (predictions.length > 0) {
        // In a real app, you would analyze the facial landmarks
        // to determine the mood. For this example, we'll simulate it.
        const mood = this.simulateMoodDetection();
        this.moodHistory.push(mood);
        
        // Keep only the last 5 moods
        if (this.moodHistory.length > 5) {
          this.moodHistory.shift();
        }

        // Get the most frequent mood
        const moodCounts = {};
        let maxCount = 0;
        let detectedMood = 'neutral';
        
        this.moodHistory.forEach(m => {
          moodCounts[m] = (moodCounts[m] || 0) + 1;
          if (moodCounts[m] > maxCount) {
            maxCount = moodCounts[m];
            detectedMood = m;
          }
        });

        // Call the callback with the detected mood
        if (this.onMoodDetected) {
          this.onMoodDetected(detectedMood);
        }

        return detectedMood;
      }
    } catch (error) {
      console.error('Error detecting mood:', error);
    }
    
    return 'neutral';
  }

  // Simulate mood detection (for demo purposes)
  simulateMoodDetection() {
    const moods = [
      'happy', 'neutral', 'focused', 'tired', 'thinking', 'confused'
    ];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  // Get theme based on mood
  static getThemeForMood(mood) {
    const moodThemes = {
      happy: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        background: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        dark: false
      },
      focused: {
        primary: '#10b981',
        secondary: '#06b6d4',
        background: 'bg-gradient-to-br from-green-50 to-cyan-50',
        dark: false
      },
      tired: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        background: 'bg-gradient-to-br from-purple-900 to-gray-900',
        dark: true
      },
      thinking: {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        dark: false
      },
      confused: {
        primary: '#f59e0b',
        secondary: '#f97316',
        background: 'bg-gradient-to-br from-amber-50 to-orange-50',
        dark: false
      },
      default: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        background: 'bg-gradient-to-br from-gray-50 to-gray-100',
        dark: false
      }
    };

    return moodThemes[mood] || moodThemes.default;
  }
}

// Singleton instance
export const moodDetector = new MoodDetector();

// Utility function to detect system color scheme
export function detectSystemColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
}

// Utility function to apply theme colors
export function applyThemeColors(theme) {
  const root = document.documentElement;
  
  if (theme.dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Set CSS custom properties for theme colors
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  
  // Update meta theme color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.primary);
  }
}

// Initialize theme based on system preference
if (typeof window !== 'undefined') {
  const isDark = detectSystemColorScheme() === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
