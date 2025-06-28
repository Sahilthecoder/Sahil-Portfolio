import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AIAssistantContext = createContext();

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

export const AIAssistantProvider = ({ children }) => {
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

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real implementation, this would call your LangChain/API endpoint
      // For now, we'll simulate a response
      const response = await simulateAIResponse(text);
      
      const aiMessage = {
        id: uuidv4(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: uuidv4(),
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = (userInput) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.includes('retail') || lowerInput.includes('cash flow') || lowerInput.includes('power bi')) {
          resolve("The Retail Cash Flow Dashboard is an automated system that tracks daily cash flows for retail stores. It integrates Google Sheets with Power BI for real-time financial insights, reducing manual errors by 80% and saving over 5 hours weekly on financial reporting.");
        } else if (lowerInput.includes('ekam') || lowerInput.includes('attendance') || lowerInput.includes('face recognition')) {
          resolve("The Ekam Attendance System uses facial recognition to track employee attendance. It features real-time monitoring, automated reporting, and integrates with existing HR systems to streamline attendance management.");
        } else if (lowerInput.includes('skill') || lowerInput.includes('technolog') || lowerInput.includes('tech stack')) {
          resolve("Sahil is proficient in Power BI, Google Sheets automation, data analysis, and dashboard development. He has experience with Python, JavaScript, and various data visualization tools to create impactful business solutions.");
        } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
          resolve("You can contact Sahil through the contact form on the website or connect on LinkedIn. Would you like me to direct you to the contact page?");
        } else if (lowerInput.includes('experience') || lowerInput.includes('background')) {
          resolve("Sahil has experience in data analysis, business intelligence, and developing automated solutions. His projects demonstrate expertise in turning complex data into actionable insights for business growth.");
        } else if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
          resolve("Hello! I'm here to help you explore Sahil's portfolio. You can ask about specific projects, skills, or request more information about his work experience.");
        } else if (lowerInput.includes('thank')) {
          resolve("You're welcome! Is there anything else you'd like to know about Sahil's work or experience?");
        } else if (lowerInput.includes('project')) {
          resolve("Sahil has worked on several projects including the Retail Cash Flow Dashboard and Ekam Attendance System. Would you like to know more about a specific project?");
        } else {
          resolve("I'm here to help you learn more about Sahil's projects and skills. You can ask about specific projects like the Retail Cash Flow Dashboard or the Ekam Attendance System, or ask about technical skills and experience.");
        }
      }, 800); // Simulate network delay
    });
  };

  const value = {
    isOpen,
    setIsOpen,
    messages,
    setMessages,
    isLoading,
    sendMessage,
  };

  return (
    <AIAssistantContext.Provider value={value}>
      {children}
    </AIAssistantContext.Provider>
  );
};
