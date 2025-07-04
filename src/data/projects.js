// Project image helper function
const getProjectImage = (projectId, imageName) => {
  const projectMap = {
    'zomato-analysis': 'Project1 excel',
    'retail-sales-dashboard': 'Project2 tableau',
    'ekam-attendance': 'Project3 Sql+Sheets',
    'retail-cash-flow': 'Project4 Power BI',
    'notion-assistant': 'Project5 Gpt+Notion',
    'zapier-automation': 'Project6 Gpt+Zapier'
  };
  const folderName = projectMap[projectId] || projectId;
  // Encode the folder name and image name to handle spaces and special characters
  const encodedFolder = encodeURIComponent(folderName);
  const encodedImage = encodeURIComponent(imageName);
  return `/images/projects/${encodedFolder}/${encodedImage}`.replace(/%2F/g, '/');
};

export const projects = {
  'zomato-analysis': {
    id: 'zomato-analysis',
    title: 'Zomato Data Analysis',
    description: 'Comprehensive data analysis of Zomato restaurant data to extract insights about restaurant ratings, cuisines, and customer preferences.',
    image: getProjectImage('zomato-analysis', 'Project1 Cover.webp'),
    images: {
      main: 'Project1 Cover.webp',
      gallery: ['zometo-ds.webp', 'zt1.webp', 'zt2.webp']
    },
    category: 'Data Analysis',
    technologies: ['Excel', 'Pivot Tables', 'Data Visualization'],
    githubUrl: 'https://github.com/Sahilthecoder/Zomato-Data-Analysis',
    liveUrl: 'https://github.com/Sahilthecoder/Zomato-Data-Analysis',
    path: '/projects/zomato-analysis'
  },
  'retail-sales-dashboard': {
    id: 'retail-sales-dashboard',
    title: 'Retail Sales Dashboard',
    description: 'Interactive Tableau dashboard for retail sales analysis, tracking performance metrics and sales trends.',
    image: getProjectImage('retail-sales-dashboard', 'Project2 Cover.webp'),
    images: {
      main: 'Project2 Cover.webp',
      gallery: ['bs2.webp', 'bs3.webp', 'bs-top10.webp']
    },
    category: 'Data Visualization',
    technologies: ['Tableau', 'Data Analysis', 'Dashboards'],
    githubUrl: 'https://github.com/Sahilthecoder/Retail-Sales-Dashboard',
    liveUrl: 'https://public.tableau.com/app/profile/sahil.ali/viz/RetailSalesDashboard_17186311978530/Dashboard1',
    path: '/projects/retail-sales-dashboard'
  },
  'ekam-attendance': {
    id: 'ekam-attendance',
    title: 'Ekam Attendance System',
    description: 'SQL database solution for managing employee attendance with reporting and analytics capabilities.',
    image: getProjectImage('ekam-attendance', 'Project3 Cover.webp'),
    images: {
      main: 'Project3 Cover.webp',
      gallery: ['Attendance_before.webp', 'Attendance_after.webp']
    },
    category: 'Database',
    technologies: ['SQL', 'Google Sheets', 'Data Management'],
    githubUrl: 'https://github.com/Sahilthecoder/Ekam-Attendance-System',
    liveUrl: 'https://github.com/Sahilthecoder/Ekam-Attendance-System',
    path: '/projects/ekam-attendance'
  },
  'retail-cash-flow': {
    id: 'retail-cash-flow',
    title: 'Retail Cash Flow Analysis',
    description: 'Power BI dashboard for analyzing retail cash flow, expenses, and financial performance metrics.',
    image: getProjectImage('retail-cash-flow', 'Project4 Cover.webp'),
    images: {
      main: 'Project4 Cover.webp',
      gallery: ['CashFlow1.webp', 'CashFlow2.webp']
    },
    category: 'Business Intelligence',
    technologies: ['Power BI', 'DAX', 'Financial Analysis'],
    githubUrl: 'https://github.com/Sahilthecoder/Retail-Cash-Flow',
    liveUrl: 'https://github.com/Sahilthecoder/Retail-Cash-Flow',
    path: '/projects/retail-cash-flow'
  }
};

export default projects;
