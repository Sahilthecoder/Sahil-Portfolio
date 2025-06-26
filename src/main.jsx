import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { VoiceProvider } from './context/VoiceContext';
import { AIContextProvider } from './context/AIContext';
import App from './App';
import './index.css';

// Initialize the application with all context providers
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <VoiceProvider>
          <AIContextProvider>
            <App />
          </AIContextProvider>
        </VoiceProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
