import { getImageUrl } from '../config/images';

export const projects = [
  {
    id: 'project1',
    title: 'Zomato Data Analysis',
    description: 'Comprehensive data analysis of Zomato restaurant data to extract insights about restaurant ratings, cuisines, and customer preferences.',
    image: getImageUrl('PROJECT1_COVER'),
    category: 'Data Analysis',
    technologies: ['Excel', 'Pivot Tables', 'Data Visualization'],
    githubUrl: 'https://github.com/Sahilthecoder/Zomato-Data-Analysis',
    liveUrl: 'https://github.com/Sahilthecoder/Zomato-Data-Analysis'
  },
  {
    id: 'project2',
    title: 'Retail Sales Dashboard',
    description: 'Interactive Tableau dashboard for retail sales analysis, tracking performance metrics and sales trends.',
    image: getImageUrl('PROJECT2_COVER'),
    category: 'Data Visualization',
    technologies: ['Tableau', 'Data Analysis', 'Dashboards'],
    githubUrl: 'https://github.com/Sahilthecoder/Retail-Sales-Dashboard',
    liveUrl: 'https://public.tableau.com/app/profile/sahil.ali/viz/RetailSalesDashboard_17186311978530/Dashboard1'
  },
  {
    id: 'project3',
    title: 'Ekam Attendance System',
    description: 'SQL database solution for managing employee attendance with reporting and analytics capabilities.',
    image: getImageUrl('PROJECT3_COVER'),
    category: 'Database',
    technologies: ['SQL', 'Google Sheets', 'Data Management'],
    githubUrl: 'https://github.com/Sahilthecoder/Ekam-Attendance-System',
    liveUrl: 'https://github.com/Sahilthecoder/Ekam-Attendance-System'
  },
  {
    id: 'project4',
    title: 'Retail Cash Flow Analysis',
    description: 'Power BI dashboard for analyzing retail cash flow and financial performance metrics.',
    image: getImageUrl('PROJECT4_COVER'),
    category: 'Business Intelligence',
    technologies: ['Power BI', 'DAX', 'Data Modeling'],
    githubUrl: 'https://github.com/Sahilthecoder/Retail-Cash-Flow-Analysis',
    liveUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYjY4YjY0MmYtZWIyZS00YzY3LWE2NzItYjQ4ZDc3YzYwNmYxIiwidCI6IjQ2Zjg4YzBiLWE1YjQtNDQ4ZS1iYzQzLTVkY2Q5YzUwYzQyYyJ9'
  },
  {
    id: 'project5',
    title: 'AI-Powered Notion Assistant',
    description: 'Custom GPT integration with Notion to enhance productivity and automate workflow tasks.',
    image: getImageUrl('PROJECT5_COVER'),
    category: 'AI Automation',
    technologies: ['OpenAI API', 'Notion API', 'Python'],
    githubUrl: 'https://github.com/Sahilthecoder/Notion-GPT-Assistant',
    liveUrl: 'https://github.com/Sahilthecoder/Notion-GPT-Assistant'
  }
];

export default projects;
