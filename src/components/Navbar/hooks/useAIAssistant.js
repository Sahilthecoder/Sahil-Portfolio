import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock project data - replace with actual data from your portfolio
const PROJECTS = [
  { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution', technologies: ['React', 'Node.js', 'MongoDB', 'Express'], slug: 'ecommerce-platform' },
  { id: 2, title: 'AI Chatbot', description: 'A conversational AI assistant', technologies: ['Python', 'TensorFlow', 'React', 'WebSockets'], slug: 'ai-chatbot' },
  { id: 3, title: 'Portfolio Website', description: 'My personal portfolio website', technologies: ['React', 'Tailwind CSS', 'Framer Motion'], slug: 'portfolio' },
  { id: 4, title: 'Task Management App', description: 'A collaborative task management tool', technologies: ['React', 'Redux', 'Firebase'], slug: 'task-manager' },
];

// Mock skills data
const SKILLS = [
  { name: 'React', category: 'Frontend', level: 90 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'Python', category: 'Language', level: 80 },
  { name: 'UI/UX Design', category: 'Design', level: 75 },
];

const useAIAssistant = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm your AI assistant. You can ask me about Sahil's projects, skills, or experience.", 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Show me projects using React',
    'What backend technologies do you know?',
    'Tell me about your experience',
  ]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Process user message and generate AI response
  const processMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsProcessing(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process the message and generate response
      const response = await generateResponse(message);
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
        action: response.action,
        data: response.data
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Handle any navigation actions
      if (response.action === 'navigate') {
        setTimeout(() => {
          navigate(response.data.path);
        }, 500);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  // Generate response based on user input
  const generateResponse = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (['hi', 'hello', 'hey', 'hi there', 'hello there'].some(word => lowerMessage.includes(word))) {
      return {
        text: "Hello! I'm your AI assistant. How can I help you today? You can ask about my projects, skills, or experience.",
      };
    }
    
    // Check for project-related queries
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      // Check for specific technology mentions
      const mentionedTech = ['react', 'node', 'python', 'javascript', 'ai', 'machine learning', 'web', 'app']
        .find(tech => lowerMessage.includes(tech));
      
      if (mentionedTech) {
        const matchingProjects = PROJECTS.filter(project => 
          project.technologies.some(tech => tech.toLowerCase().includes(mentionedTech)) ||
          project.title.toLowerCase().includes(mentionedTech) ||
          project.description.toLowerCase().includes(mentionedTech)
        );
        
        if (matchingProjects.length > 0) {
          const projectList = matchingProjects.map(p => `- ${p.title}: ${p.description}`).join('\n');
          return {
            text: `Here are some projects that match your query about ${mentionedTech}:\n\n${projectList}\n\nWould you like to know more about any of these?`,
            data: { projects: matchingProjects }
          };
        }
      }
      
      // General project query
      return {
        text: `I've worked on several projects including:\n\n${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}\n\nWould you like to know more about any specific project?`,
        data: { projects: PROJECTS }
      };
    }
    
    // Check for skills query
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      const mentionedCategory = ['frontend', 'backend', 'language', 'design', 'tool']
        .find(cat => lowerMessage.includes(cat));
      
      if (mentionedCategory) {
        const categorySkills = SKILLS.filter(skill => 
          skill.category.toLowerCase() === mentionedCategory
        );
        
        if (categorySkills.length > 0) {
          const skillList = categorySkills.map(s => `${s.name} (${s.level}%)`).join(', ');
          return {
            text: `Here are my ${mentionedCategory} skills:\n\n${skillList}`,
            data: { skills: categorySkills }
          };
        }
      }
      
      // General skills query
      return {
        text: `I have experience with various technologies including:\n\n${SKILLS.map(s => `- ${s.name} (${s.category}): ${s.level}%`).join('\n')}`,
        data: { skills: SKILLS }
      };
    }
    
    // Check for experience query
    if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('work history')) {
      return {
        text: "I have several years of experience in full-stack development with a focus on creating responsive and user-friendly web applications. I've worked with technologies like React, Node.js, Python, and various databases. Would you like to know more about my specific roles and responsibilities?",
        action: 'navigate',
        data: { path: '/experience' }
      };
    }
    
    // Check for contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('get in touch')) {
      return {
        text: "You can reach me at sahil@example.com or connect with me on LinkedIn. Would you like me to take you to the contact page?",
        action: 'navigate',
        data: { path: '/contact' }
      };
    }
    
    // Default response for unknown queries
    return {
      text: "I'm not sure I understand. You can ask me about my projects, skills, experience, or contact information. Here are some suggestions:\n\n- What projects have you worked on?\n- What technologies do you know?\n- Tell me about your experience\n- How can I contact you?",
      data: { showSuggestions: true }
    };
  };

  // Handle quick action selection
  const handleQuickAction = (action) => {
    processMessage(action);
  };

  return {
    messages,
    isTyping,
    isProcessing,
    suggestions,
    messagesEndRef,
    processMessage,
    handleQuickAction,
  };
};

export default useAIAssistant;
