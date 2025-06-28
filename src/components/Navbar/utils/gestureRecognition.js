// WebXR and Gesture Recognition Utilities
// This module provides gesture recognition for the navbar using the WebXR Device API

class GestureRecognizer {
  constructor() {
    this.xrSession = null;
    this.isSupported = false;
    this.gestureCallbacks = new Map();
    this.isActive = false;
    this.lastGestureTime = 0;
    this.gestureCooldown = 1000; // 1 second cooldown between gestures
    
    // Default gesture mappings
    this.gestureMappings = {
      'wave': 'next',
      'swipe-left': 'back',
      'swipe-right': 'forward',
      'point': 'select',
      'thumbs-up': 'like',
      'peace': 'menu'
    };
    
    this.initialize();
  }
  
  // Initialize the gesture recognizer
  async initialize() {
    // Check for WebXR support
    if ('xr' in navigator) {
      try {
        // Request a session with hand-tracking capabilities
        const supported = await navigator.xr.isSessionSupported('immersive-vr');
        this.isSupported = supported;
        
        if (this.isSupported) {
          console.log('WebXR with hand tracking is supported!');
          this.setupEventListeners();
        } else {
          console.warn('WebXR is supported but hand tracking is not available');
        }
      } catch (error) {
        console.error('Error initializing WebXR:', error);
        this.isSupported = false;
      }
    } else {
      console.warn('WebXR not supported in this browser');
      this.isSupported = false;
    }
  }
  
  // Set up event listeners for DOM events
  setupEventListeners() {
    // Listen for click events on the enter VR/AR button
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-xr="start"]')) {
        this.startSession();
      } else if (event.target.matches('[data-xr="end"]')) {
        this.endSession();
      }
    });
    
    // Listen for keyboard shortcuts (for testing without VR)
    document.addEventListener('keydown', (event) => {
      if (!this.isActive) return;
      
      switch(event.key) {
        case 'ArrowLeft':
          this.triggerGesture('swipe-left');
          break;
        case 'ArrowRight':
          this.triggerGesture('swipe-right');
          break;
        case 'ArrowUp':
          this.triggerGesture('wave');
          break;
        case 'Enter':
          this.triggerGesture('point');
          break;
      }
    });
    
    // Listen for touch events (for mobile gestures)
    this.setupTouchGestures();
  }
  
  // Set up touch gesture recognition
  setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      if (!this.isActive) return;
      
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const xDiff = touchStartX - touchEndX;
      const yDiff = touchStartY - touchEndY;
      
      // Check if the swipe distance is significant
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > minSwipeDistance) {
        if (xDiff > 0) {
          this.triggerGesture('swipe-left');
        } else {
          this.triggerGesture('swipe-right');
        }
      } else if (Math.abs(yDiff) > minSwipeDistance) {
        if (yDiff > 0) {
          this.triggerGesture('swipe-up');
        } else {
          this.triggerGesture('swipe-down');
        }
      } else {
        // Tap gesture
        this.triggerGesture('tap');
      }
    }, { passive: true });
  }
  
  // Start a WebXR session
  async startSession() {
    if (!this.isSupported) {
      console.warn('WebXR not supported');
      return;
    }
    
    try {
      // Request a session with hand-tracking capabilities
      this.xrSession = await navigator.xr.requestSession('immersive-vr', {
        optionalFeatures: ['hand-tracking']
      });
      
      this.isActive = true;
      console.log('WebXR session started');
      
      // Set up session event handlers
      this.xrSession.addEventListener('end', this.onSessionEnded.bind(this));
      
      // Start the render loop
      this.xrSession.requestAnimationFrame(this.onXRFrame.bind(this));
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('xrSessionStarted', { detail: { session: this.xrSession } }));
      
      return true;
    } catch (error) {
      console.error('Error starting WebXR session:', error);
      this.isActive = false;
      return false;
    }
  }
  
  // End the current WebXR session
  async endSession() {
    if (this.xrSession) {
      try {
        await this.xrSession.end();
      } catch (error) {
        console.error('Error ending WebXR session:', error);
      } finally {
        this.xrSession = null;
        this.isActive = false;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('xrSessionEnded'));
      }
    }
  }
  
  // Handle session end
  onSessionEnded() {
    this.xrSession = null;
    this.isActive = false;
    console.log('WebXR session ended');
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('xrSessionEnded'));
  }
  
  // XR frame update loop
  onXRFrame(time, frame) {
    if (!this.xrSession) return;
    
    // Process hand tracking data
    const handPose = frame.getPose(this.xrSession.inputSources[0]?.hand);
    if (handPose) {
      this.processHandPose(handPose);
    }
    
    // Continue the animation loop
    this.xrSession.requestAnimationFrame(this.onXRFrame.bind(this));
  }
  
  // Process hand pose data to detect gestures
  processHandPose(handPose) {
    // This is a simplified example. In a real app, you would analyze joint positions
    // to detect specific hand shapes and movements.
    
    // Get joint positions
    const joints = handPose.joints;
    
    // Example: Detect wave gesture (simplified)
    if (this.isWaving(joints)) {
      this.triggerGesture('wave');
    }
    
    // Example: Detect point gesture
    if (this.isPointing(joints)) {
      this.triggerGesture('point');
    }
    
    // Add more gesture detection logic here
  }
  
  // Detect wave gesture (simplified)
  isWaving(joints) {
    // This is a placeholder. In a real app, you would analyze joint movements
    // over time to detect a waving motion.
    return false;
  }
  
  // Detect point gesture (simplified)
  isPointing(joints) {
    // This is a placeholder. In a real app, you would analyze joint positions
    // to detect an extended index finger.
    return false;
  }
  
  // Register a callback for a specific gesture
  on(gesture, callback) {
    if (!this.gestureCallbacks.has(gesture)) {
      this.gestureCallbacks.set(gesture, []);
    }
    this.gestureCallbacks.get(gesture).push(callback);
    return () => this.off(gesture, callback);
  }
  
  // Remove a gesture callback
  off(gesture, callback) {
    const callbacks = this.gestureCallbacks.get(gesture);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  // Trigger a gesture event
  triggerGesture(gesture, data = {}) {
    // Apply cooldown to prevent rapid firing
    const now = Date.now();
    if (now - this.lastGestureTime < this.gestureCooldown) {
      return;
    }
    
    this.lastGestureTime = now;
    
    // Get the action mapped to this gesture
    const action = this.gestureMappings[gesture] || gesture;
    
    // Call all registered callbacks
    const callbacks = this.gestureCallbacks.get(gesture) || [];
    callbacks.forEach(callback => callback({
      gesture,
      action,
      timestamp: new Date().toISOString(),
      ...data
    }));
    
    // Also trigger global event
    document.dispatchEvent(new CustomEvent('gestureDetected', {
      detail: { gesture, action, ...data }
    }));
    
    console.log(`Gesture detected: ${gesture} -> ${action}`);
  }
  
  // Map a gesture to an action
  mapGestureToAction(gesture, action) {
    this.gestureMappings[gesture] = action;
  }
  
  // Enable or disable gesture recognition
  setActive(active) {
    this.isActive = active;
  }
}

// Singleton instance
export const gestureRecognizer = new GestureRecognizer();

// Helper function to check for WebXR support
export async function checkWebXRSupport() {
  if (!('xr' in navigator)) {
    return { supported: false, message: 'WebXR not supported in this browser' };
  }
  
  try {
    const supported = await navigator.xr.isSessionSupported('immersive-vr');
    return {
      supported,
      message: supported 
        ? 'WebXR with hand tracking is supported!' 
        : 'WebXR is supported but hand tracking is not available'
    };
  } catch (error) {
    return {
      supported: false,
      message: `Error checking WebXR support: ${error.message}`
    };
  }
}

// Helper function to request permission for device motion (for mobile devices)
export async function requestMotionPermission() {
  if (typeof DeviceMotionEvent !== 'undefined' && 
      typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const permission = await DeviceMotionEvent.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting motion permission:', error);
      return false;
    }
  }
  return true; // If not on iOS 13+, assume permission is granted
}

// Initialize the gesture recognizer when the module is loaded
if (typeof window !== 'undefined') {
  // Add a button to start the XR session
  const xrButton = document.createElement('button');
  xrButton.textContent = 'Start AR/VR';
  xrButton.setAttribute('data-xr', 'start');
  xrButton.style.position = 'fixed';
  xrButton.style.bottom = '20px';
  xrButton.style.right = '20px';
  xrButton.style.zIndex = '10000';
  xrButton.style.padding = '10px 20px';
  xrButton.style.background = 'rgba(99, 102, 241, 0.9)';
  xrButton.style.color = 'white';
  xrButton.style.border = 'none';
  xrButton.style.borderRadius = '20px';
  xrButton.style.cursor = 'pointer';
  xrButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
  document.body.appendChild(xrButton);
  
  // Check for WebXR support and update UI
  checkWebXRSupport().then(({ supported, message }) => {
    console.log(message);
    if (!supported) {
      xrButton.textContent = 'AR/VR Not Supported';
      xrButton.disabled = true;
      xrButton.style.opacity = '0.5';
    }
  });
  
  // Request motion permission on user interaction
  const handleFirstInteraction = () => {
    requestMotionPermission();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };
  
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
}
