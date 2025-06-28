import { OpenAI } from 'openai';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';

// Initialize the OpenAI chat model
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  modelName: 'gpt-4',
  temperature: 0.7,
});

// Initialize Pinecone client with environment variables
let pinecone = null;

// Only initialize Pinecone if API key is available
if (process.env.REACT_APP_PINECONE_API_KEY) {
  pinecone = new Pinecone({
    apiKey: process.env.REACT_APP_PINECONE_API_KEY,
    environment: process.env.REACT_APP_PINECONE_ENVIRONMENT || 'us-west1-gcp',
  });
}

// Initialize Pinecone vector store
let vectorStore = null;
let isInitializing = false;

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
  // Add more project knowledge as needed
];

// Initialize the vector store
const initVectorStore = async () => {
  if (vectorStore || isInitializing) return;
  
  isInitializing = true;
  
  try {
    if (!pinecone || !process.env.REACT_APP_PINECONE_API_KEY) {
      console.warn('Pinecone is not initialized. Using static knowledge base instead.');
      isInitializing = false;
      return;
    }

    const indexName = process.env.REACT_APP_PINECONE_INDEX || 'portfolio';
    const index = pinecone.Index(indexName);
    
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
    });

    // Initialize the vector store with the latest Pinecone client
    vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: 'portfolio',
    });
    
    console.log('Pinecone vector store initialized');
  } catch (error) {
    console.warn('Error initializing Pinecone vector store. Falling back to static knowledge base.', error);
    vectorStore = null;
  } finally {
    isInitializing = false;
  }
};

// Initialize the vector store when the service is imported
initVectorStore().catch(console.error);

// Function to get relevant context from the knowledge base
const getRelevantContext = async (query) => {
  try {
    // If no vector store is available, fall back to the static knowledge base
    if (!vectorStore || !process.env.REACT_APP_PINECONE_API_KEY) {
      // Simple keyword matching as fallback
      const queryLower = query.toLowerCase();
      const matchedItems = projectKnowledge.filter(item => 
        item.content.toLowerCase().includes(queryLower) ||
        (item.metadata.project && item.metadata.project.toLowerCase().includes(queryLower))
      );
      
      if (matchedItems.length > 0) {
        return matchedItems.map(item => item.content).join('\n\n');
      }
      
      // If no matches found, provide a helpful response
      return `I couldn't find specific information about "${query}" in my knowledge base. ` +
             'Here are some projects you might be interested in: ' +
             projectKnowledge.map(p => p.metadata.project).join(', ');
    }
    
    // Try to get context from the vector store
    const results = await vectorStore.similaritySearch(query, 3);
    if (results && results.length > 0) {
      return results.map(doc => doc.pageContent).join('\n\n');
    }
    
    // Fallback to static knowledge if no results from vector store
    return projectKnowledge
      .filter(item => item.content.toLowerCase().includes(query.toLowerCase()))
      .map(item => item.content)
      .join('\n\n') || 'No relevant information found.';
      
  } catch (error) {
    console.error('Error getting relevant context:', error);
    return 'I encountered an error while retrieving information. Please try again later.';
  }
};

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
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      return "I can help with general questions about Sahil's experience and projects. For specific inquiries, please use the contact form on the website.";
    }

    try {
      // Get relevant context
      const context = await getRelevantContext(lastUserMessage.text);
      
      // Prepare system message with context
      const systemMessage = new SystemMessage({
        content: `You are a helpful AI assistant for Sahil's portfolio. Use the following context to answer questions:
        ${context}
        
        If the user asks about projects, provide specific details about the technologies used, challenges faced, and business impact.
        If you don't know the answer, say you don't know rather than making something up.`
      });

      // Convert messages to the format expected by the chat model
      const formattedMessages = [
        systemMessage,
        ...messages.map(msg => 
          msg.sender === 'user' 
            ? new HumanMessage({ content: msg.text })
            : new SystemMessage({ content: msg.text })
        )
      ];

      // Generate response
      const response = await chatModel.invoke(formattedMessages);
      return response.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return `I'm having trouble processing your request. Here's what I know about the topic: ${projectKnowledge
        .filter(item => item.content.toLowerCase().includes(lastUserMessage.text.toLowerCase()))
        .map(item => item.content)
        .join('\n\n') || 'No specific information found.'}`;
    }
  } catch (error) {
    console.error('Error in AI service:', error);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
};

// Export functions
const aiService = {
  generateAIResponse,
  getNavigationIntent
};

export { generateAIResponse, getNavigationIntent };
export default aiService;
