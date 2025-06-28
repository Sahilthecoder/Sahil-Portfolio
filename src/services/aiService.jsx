import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

// Initialize the OpenAI chat model
const chatModel = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  modelName: 'gpt-4',
  temperature: 0.7,
});

// Static knowledge base
const knowledgeBase = {
  'zomato analysis': {
    path: '/projects/zomato-analysis',
    description: 'Analysis of Zomato restaurant data using Python and data visualization',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn']
  },
};

// Project knowledge base (in a real app, this would be in a vector database)
const projectKnowledge = [
  {
    content: "Retail Cash Flow Dashboard: An automated system that tracks daily cash flows for retail stores. Integrates Google Sheets with Power BI for real-time financial insights. Reduced manual errors by 80% and saved over 5 hours weekly on financial reporting.",
    metadata: { project: 'retail-cash-flow', type: 'overview' }
  },
  {
    content: "Ekam Attendance System: Uses facial recognition to track employee attendance. Features real-time monitoring, automated reporting, and integrates with existing HR systems.",
    metadata: { project: 'ekam-attendance', type: 'overview' }
  },
];

// Initialize the vector store
const initVectorStore = async () => {
  if (vectorStore || isInitializing) return;
  
  isInitializing = true;
  
  try {
    console.warn('Pinecone is not supported in browser environment. Using static knowledge base instead.');
    return;
  } catch (error) {
    console.error('Error initializing vector store:', error);
    throw error;
  } finally {
    isInitializing = false;
  }
};

// Function to get relevant context from the knowledge base
function getRelevantContext(query) {
  // Use static knowledge base
  const relevantProjects = Object.entries(knowledgeBase)
    .filter(([key, project]) => 
      key.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))
    );

  return relevantProjects.map(([key, project]) => `
Project: ${key}
Path: ${project.path}
Description: ${project.description}
Technologies: ${project.technologies.join(', ')}
`).join('\n\n');
}

// Project details for enhanced responses
const projectDetails = {
  'zomato analysis': {
    path: '/projects/zomato-analysis',
    description: 'Zomato Analysis: A data analysis project that provides insights into restaurant trends, ratings, and customer preferences using Zomato data. Features include data visualization, trend analysis, and restaurant recommendations.'
  },
  'bansal supermarket': {
    path: '/projects/bansal-supermarket',
    description: 'Bansal Supermarket Dashboard: A comprehensive retail management system with inventory tracking, sales analytics, and customer management features. Built with React, Node.js, and MongoDB.'
  },
  'ekam attendance': {
    path: '/projects/ekam-attendance',
    description: 'Ekam Attendance System: A facial recognition-based attendance system that automates employee check-ins. Features real-time face detection, automated reporting, and HR system integration.'
  },
  'retail cash flow': {
    path: '/projects/retail-cash-flow',
    description: 'Retail Cash Flow Management: A solution for tracking and managing cash flow in retail environments. Includes features for sales tracking, expense management, and financial reporting.'
  },
  'product sales dashboard': {
    path: '/projects/product-sales-dashboard',
    description: 'Product Sales Dashboard: An interactive dashboard for visualizing and analyzing product sales data. Built with modern web technologies for real-time data visualization.'
  },
  'snape sentiment analysis': {
    path: '/projects/snape-sentiment-analysis',
    description: 'Snape Sentiment Analysis: A natural language processing project that analyzes sentiment in text data. Uses machine learning to determine the emotional tone of written content.'
  },
  // Simple navigation intents
  'home': { path: '/' },
  'about': { path: '/about' },
  'experience': { path: '/experience' },
  'projects': { path: '/projects' },
  'contact': { path: '/contact' }
};

// Navigation intents and their corresponding paths
const navigationIntents = {
  ...Object.fromEntries(
    Object.entries(projectDetails).map(([key, { path }]) => [key, path])
  )
};

// Check if the message is a navigation intent
const getNavigationIntent = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for project-specific queries first
  for (const [key, { path, description }] of Object.entries(projectDetails)) {
    if (lowerMessage.includes(key)) {
      return { 
        type: 'navigation', 
        path,
        response: description
      };
    }
  }
  
  // Check for general navigation
  for (const [intent, path] of Object.entries(navigationIntents)) {
    if (lowerMessage.includes(intent)) {
      return { 
        type: 'navigation', 
        path,
        response: `Taking you to the ${intent} page...`
      };
    }
  }
  
  return null;
};

// Common questions and their static responses
const commonQuestions = {
  // Contact Information
  'how can i contact you': 'You can contact Sahil via email at sahil@example.com or connect with him on LinkedIn at https://linkedin.com/in/sahil-ali. For professional inquiries, please use the contact form on the website.',
  'contact': 'You can reach Sahil through email at sahil@example.com or via LinkedIn at https://linkedin.com/in/sahil-ali. The contact form on the website is also a great way to get in touch!',
  'email': 'Sahil can be reached at sahil@example.com',
  'linkedin': 'Connect with Sahil on LinkedIn: https://linkedin.com/in/sahil-ali',
  'github': 'Check out Sahil\'s GitHub profile: https://github.com/sahil-ali',
  'resume': 'You can view and download Sahil\'s resume from the Resume section of this portfolio.',
  'about': 'Sahil is a skilled developer with experience in building web applications and data solutions. He specializes in React, Node.js, and data analysis.',
  
  // Projects
  'projects': 'Here are some of Sahil\'s notable projects:\n\n' +
    '1. Retail Cash Flow Management System\n' +
    '   - A comprehensive solution for managing retail store cash flows\n' +
    '   - Technologies: React, Node.js, MongoDB, Express\n' +
    '   - Features: Real-time analytics, sales tracking, inventory management\n\n' +
    '2. Ekam Attendance System\n' +
    '   - Facial recognition-based attendance system\n' +
    '   - Technologies: Python, OpenCV, TensorFlow, Flask\n' +
    '   - Features: Real-time face detection, automated reporting, HR integration\n\n' +
    '3. Portfolio Website (This site!)\n' +
    '   - Modern, responsive portfolio built with React\n' +
    '   - Technologies: React, Tailwind CSS, Vite\n' +
    '   - Features: AI assistant, project showcase, responsive design',
    
  'retail': 'Retail Cash Flow Management System:\n' +
    'A comprehensive solution for managing retail store cash flows with real-time analytics and inventory management.\n' +
    'Key Features:\n' +
    '- Sales tracking and reporting\n' +
    '- Inventory management\n' +
    '- Employee performance metrics\n' +
    '- Real-time dashboard\n' +
    'Tech Stack: React, Node.js, MongoDB, Express',
    
  'ekam': 'Ekam Attendance System:\n' +
    'A facial recognition-based attendance system that automates employee check-ins.\n' +
    'Key Features:\n' +
    '- Real-time face detection and recognition\n' +
    '- Automated attendance reports\n' +
    '- Integration with HR systems\n' +
    '- Mobile-responsive web interface\n' +
    'Tech Stack: Python, OpenCV, TensorFlow, Flask',
    
  // Skills
  'skills': 'Sahil has expertise in the following areas:\n\n' +
    'Frontend Development:\n' +
    '- React.js, JavaScript, TypeScript\n' +
    '- HTML5, CSS3, Tailwind CSS\n' +
    '- Redux, Context API\n\n' +
    'Backend Development:\n' +
    '- Node.js, Express.js\n' +
    '- Python, Flask\n' +
    '- RESTful APIs, GraphQL\n\n' +
    'Data Science & AI/ML:\n' +
    '- Python, Pandas, NumPy\n' +
    '- TensorFlow, OpenCV\n' +
    '- Data analysis and visualization',
    
  // Experience
  'experience': 'Sahil has professional experience in:\n\n' +
    '1. Full Stack Developer at Tech Solutions Inc. (2022-Present)\n' +
    '   - Developing and maintaining web applications\n' +
    '   - Leading frontend architecture decisions\n\n' +
    '2. Software Engineer at Digital Innovations (2020-2022)\n' +
    '   - Built and deployed scalable backend services\n' +
    '   - Implemented CI/CD pipelines\n\n' +
    '3. Data Science Intern at AI Research Lab (2019-2020)\n' +
    '   - Developed machine learning models\n' +
    '   - Worked on computer vision projects',
    
  // Default fallback
  'help': 'I can help you with information about:\n' +
    '- Sahil\'s projects and portfolio\n' +
    '- Technical skills and expertise\n' +
    '- Professional experience\n' +
    '- How to get in touch\n\n' +
    'Try asking about:\n' +
    '- "Tell me about your projects"\n' +
    '- "What are your technical skills?"\n' +
    '- "How can I contact you?"',
  
  // Aliases
  'project': 'projects',
  'skill': 'skills',
  'exp': 'experience',
  'work': 'experience',
  'background': 'experience',
  'show projects': 'projects',
  'list projects': 'projects',
  'what can you do': 'help'
};

// Function to check for common questions
const getCommonResponse = (question) => {
  const lowerQuestion = question.toLowerCase();
  for (const [key, response] of Object.entries(commonQuestions)) {
    if (lowerQuestion.includes(key)) {
      return response;
    }
  }
  return null;
};

// Function to generate AI response
const generateAIResponse = async (messages) => {
  try {
    // Get the last user message
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(msg => msg.sender === 'user');

    if (!lastUserMessage) return "I'm not sure how to respond to that.";

    // Check for common questions first
    const commonResponse = getCommonResponse(lastUserMessage.text);
    if (commonResponse) {
      return commonResponse;
    }

    // If no common response, check if OpenAI is configured
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      return "I can help with general questions about Sahil's experience and projects. For specific inquiries, please use the contact form on the website.";
    }

    // Get relevant context
    const context = await getRelevantContext(lastUserMessage.text);
    
    // Prepare messages for chat model
    const systemMessage = new SystemMessage(`You are a helpful AI assistant for Sahil's portfolio. Use the following context to answer questions:
      ${context}
      
      If the user asks about projects, provide specific details about the technologies used, challenges faced, and business impact.
      If you don't know the answer, say you don't know rather than making something up.`);
    const userMessage = new HumanMessage(lastUserMessage.text);
    const response = await chatModel.invoke([systemMessage, userMessage]);
    return response.content;
  } catch (error) {
    console.error('Error in AI service:', error);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
};

export { generateAIResponse, getNavigationIntent };
