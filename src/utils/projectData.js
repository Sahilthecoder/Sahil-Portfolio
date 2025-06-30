// Project image helper function
const getProjectImage = (projectId, imageName) => {
  const basePath = import.meta.env.BASE_URL;
  return `${basePath}images/projects/${projectId}/${imageName}`;
};

// Project data with image references
export const projects = {
  'zomato-analysis': {
    id: 'zomato-analysis',
    title: 'Zomato Restaurant Expansion Analysis',
    description: 'Built an interactive Excel dashboard to analyze Zomato\'s city-wise expansion strategy across India, uncovering performance trends and market insights.',
    get image() {
      return getProjectImage('Project1 excel', 'Project1 Cover.avif');
    },
    images: {
      get main() { return 'Project1 Cover.avif'; },
      get gallery() { return ['zometo-ds.avif', 'zt1.avif', 'zt2.avif']; }
    },
    category: 'Market Strategy Dashboard',
    tech: ['Excel', 'Data Analysis', 'Dashboard'],
    path: '/projects/zomato-analysis',
    impact: 'Helped identify high-performing regions and new expansion opportunities',
    badge: 'Excel',
    techLabel: 'Market Strategy Dashboard'
  },
  'bansal-supermarket': {
    id: 'bansal-supermarket',
    title: 'Bansal Supermarket Sales Analysis',
    description: 'Created a dynamic Tableau dashboard revealing daily/weekly sales trends, customer behavior, and category performance for better decision-making.',
    get image() {
      return getProjectImage('Project2 tableau', 'Project2 Cover.avif');
    },
    images: {
      get main() { return 'Project2 Cover.avif'; },
      get gallery() { return ['bs-saleVSpft.avif', 'bs-stockTO.avif', 'bs-top10.avif', 'bs2.avif', 'bs3.avif']; }
    },
    category: 'Retail Analytics',
    tech: ['Tableau', 'Data Visualization', 'Sales Analysis'],
    path: '/projects/bansal-supermarket',
    impact: 'Boosted revenue by 12% through optimized inventory and promotions',
    badge: 'Tableau',
    techLabel: 'Sales Performance Insights'
  },
  'retail-cash-flow': {
    id: 'retail-cash-flow',
    title: 'Daily Cash Flow Dashboard',
    description: 'Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time.',
    get image() {
      return getProjectImage('Project4 Power BI', 'Project4 Cover.avif');
    },
    images: {
      get main() { return 'Project4 Cover.avif'; },
      get gallery() { return ['Store_POWERBI1.avif', 'CashFlow1.avif', 'CashFlow2.avif']; }
    },
    category: 'Retail Finance',
    tech: ['Power BI', 'Google Sheets', 'Data Visualization'],
    path: '/projects/retail-cash-flow',
    impact: 'Improved financial visibility and reduced cash errors significantly',
    badge: 'Power BI',
    techLabel: 'Retail Finance Tracker'
  },
  ekam: {
    id: 'ekam-attendance',
    title: 'Ekam Attendance Management',
    description: 'Developed a SQL and Google Sheets solution to track employee attendance and working hours with automated reporting.',
    get image() {
      return getProjectImage('Project3 Sql+Sheets', 'Project3 Cover.avif');
    },
    images: {
      get main() { return 'Project3 Cover.avif'; },
      get gallery() { return ['ekam1.avif', 'ekam2.avif', 'ekam3.avif']; }
    },
    category: 'HR Automation',
    tech: ['SQL', 'Google Sheets', 'Automation'],
    path: '/projects/ekam-attendance',
    impact: 'Reduced manual reporting time by 80% monthly for HR and accounts',
    badge: 'SQL + Sheets',
    techLabel: 'HR & Finance Automation'
  },
  aiPlanner: {
    id: 'ai-planner',
    title: 'AI-Powered Daily Planner',
    description: 'Built an AI-enhanced daily planning tool that integrates with Notion to optimize task scheduling and productivity.',
    get image() {
      return getProjectImage('Project5 Gpt+Notion', 'Project5 Cover.avif');
    },
    images: {
      get main() { return 'Project5 Cover.avif'; },
      get gallery() { return ['ai-planner1.avif', 'ai-planner2.avif', 'ai-planner3.avif']; }
    },
    category: 'AI-Powered Planning',
    tech: ['GPT', 'Notion', 'Automation'],
    path: '/projects/ai-planner',
    impact: 'Saved 2+ hours daily by automating decisions and personal workflows.',
    badge: 'GPT + Notion',
    techLabel: 'AI-Powered Planning'
  },
  automationSuite: {
    id: 'automation-suite',
    title: 'Zapier Automation Suite',
    description: 'Developed a suite of Zapier automations to streamline business workflows and reduce manual data entry.',
    get image() {
      return getProjectImage('Project6 Gpt+Zapier', 'Project6 Cover.avif');
    },
    images: {
      get main() { return 'Project6 Cover.avif'; },
      get gallery() { return ['zapier1.avif', 'zapier2.avif', 'zapier3.avif']; }
    },
    category: 'Business Workflow Automation',
    tech: ['Zapier', 'Automation', 'Business Ops'],
    path: '/projects/automation-suite',
    impact: 'Saved 15+ hours/month by eliminating repetitive manual work.',
    badge: 'GPT + Zapier',
    techLabel: 'Business Workflow Automation'
  },
  mahiraPortfolio: {
    id: 'mahira-portfolio',
    title: 'Mahira\'s GitHub Portfolio',
    description: 'Designed and hosted a professional AI-integrated portfolio for Mahira Chaudhry on GitHub with responsive UI and project showcases.',
    get image() {
      return getProjectImage('Mahira Portfolio Web+AI', 'Project7 Cover.avif');
    },
    images: {
      main: 'Project7 Cover.avif',
      gallery: ['mahira1.avif', 'mahira2.avif', 'mahira3.avif']
    },
    category: 'AI-Enhanced Personal Website',
    tech: ['Web Design', 'GitHub Pages', 'AI Integration'],
    path: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    impact: 'Attracted international clients and improved creative visibility.',
    badge: 'Web + AI',
    techLabel: 'AI-Enhanced Personal Website',
    isExternal: true
  },
  sentiment: {
    id: 'sentiment',
    title: 'Snape Sentiment Analysis',
    description: 'Customer feedback analysis tool',
    images: {
      main: 'analysis.jpg',
      gallery: ['dashboard.jpg', 'insights.jpg']
    },
    category: 'NLP',
    tech: ['Python', 'NLP', 'Sentiment Analysis']
  }
};

// Get project by ID
export const getProject = (projectId) => {
  return projects[projectId] || null;
};

// Get all projects
export const getAllProjects = () => {
  return Object.values(projects);
};

export default {
  getProjectImage,
  getProject,
  getAllProjects
};
