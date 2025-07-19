// Use relative paths for client-side routing
export const projects = [
  {
    id: 1,
    title: 'Zomato Data Analysis',
    description: 'Comprehensive analysis of Zomato restaurant data to identify trends, customer preferences, and business insights. Used Python, Pandas, and Matplotlib for data processing and visualization.',
    image: '/images/projects/Project1_excel/Project1_Cover-1200w.webp',
    previewImage: '/images/projects/Project1_excel/Project1_Cover-300w.webp',
    tags: ['Python', 'Data Analysis', 'Pandas', 'Data Visualization'],
    link: 'projects/zomato-analysis', // Removed leading slash for consistency
  },
  {
    id: 2,
    title: 'Bansal Supermarket',
    description: 'End-to-end inventory and sales management system for Bansal Supermarket with automated stock tracking, sales reporting, and supplier management.',
    image: '/images/projects/Project2_tableau/Project2_Cover-1200w.webp',
    previewImage: '/images/projects/Project2_tableau/Project2_Cover-300w.webp',
    tags: ['Excel', 'Inventory Management', 'VBA', 'Sales Analysis'],
    link: 'projects/bansal-supermarket' // Removed leading slash for consistency
  },
  {
    id: 3,
    title: 'Ekam Attendance',
    description: 'Automated attendance tracking system with employee scheduling, shift management, and reporting capabilities.',
    image: '/images/projects/Project3_Sql+Sheets/Project3_Cover-1200w.webp',
    previewImage: '/images/projects/Project3_Sql+Sheets/Project3_Cover-300w.webp',
    tags: ['SQL', 'Database', 'HR Management', 'Reporting'],
    link: 'projects/ekam-attendance' // Removed leading slash for consistency
  },
  {
    id: 4,
    title: 'Retail Cash Flow',
    description: 'Comprehensive cash flow tracking and financial management system for monitoring daily business transactions and financial health.',
    image: '/images/projects/Project4_Power_BI/Project4_Cover-1200w.webp',
    previewImage: '/images/projects/Project4_Power_BI/Project4_Cover-300w.webp',
    tags: ['Power BI', 'Financial Analysis', 'Business Intelligence', 'Dashboarding'],
    link: 'projects/retail-cash-flow' // Removed leading slash for consistency
  },
  {
    id: 5,
    title: 'AI Daily Planner',
    description: 'AI-powered decision support system for daily business operations and analytics.',
    image: '/images/projects/Project5_Gpt+Notion/Project5_Cover-1200w.webp',
    previewImage: '/images/projects/Project5_Gpt+Notion/Project5_Cover-300w.webp',
    tags: ['AI', 'GPT', 'Automation', 'Productivity'],
    link: 'projects/ai-daily-decision-system' // Removed leading slash for consistency
  },
  {
    id: 6,
    title: 'Smart Automation',
    description: 'Intelligent automation solutions for business process optimization and workflow management.',
    image: '/images/projects/Project6_Gpt+Zapier/Project6_Cover-1200w.webp',
    previewImage: '/images/projects/Project6_Gpt+Zapier/Project6_Cover-300w.webp',
    tags: ['Automation', 'Zapier', 'Workflow', 'Integration'],
    link: 'https://sahilthecoder.github.io/projects/smart-automation',
    isExternal: true // Mark as external link
  },
  {
    id: 7,
    title: 'Mahira Portfolio',
    description: 'Professional portfolio website showcasing projects and skills.',
    image: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-1200w.webp',
    previewImage: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp',
    tags: ['React', 'Web', 'UI/UX', 'Responsive Design'],
    link: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    github: 'https://github.com/Sahilthecoder/Sahil-Portfolio/tree/main/src/pages/projects/MahiraPortfolio',
    demo: 'https://mahiradesignhub.github.io/mahira-portfolio/',
    isExternal: true // Mark as external link
  }
];

export default projects;
