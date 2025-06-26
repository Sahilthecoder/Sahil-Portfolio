// src/pages/Projects.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <main>
      <h1>Projects</h1>
      <p>Explore my projects where I apply data analysis and inventory management skills to solve real-world challenges.</p>

      <section aria-labelledby="project-zomato">
        <h2 id="project-zomato">
          Zomato Restaurant Expansion Analysis <small>Excel</small>
        </h2>
        <p>
          <strong>Market Strategy Dashboard</strong>
          <br />
          Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.
        </p>
        <Link to="#" className="btn-primary">
          Explore Project
        </Link>
      </section>

      <section aria-labelledby="project-bansal">
        <h2 id="project-bansal">
          Bansal Supermarket Sales Analysis <small>Tableau</small>
        </h2>
        <p>
          <strong>Sales Performance Insights</strong>
          <br />
          Created a dynamic Tableau dashboard revealing daily/weekly sales trends, customer behavior, and category performance for better decision-making. Boosted revenue by 12% through optimized inventory and promotions.
        </p>
        <Link to="#" className="btn-primary">
          Explore Project
        </Link>
      </section>

      <section aria-labelledby="project-ekam">
        <h2 id="project-ekam">
          Ekam Attendance Tracker <small>SQL + Sheets</small>
        </h2>
        <p>
          <strong>HR & Finance Automation</strong>
          <br />
          Automated attendance and payroll data reporting using SQL queries and Google Sheets for Ekam Indian Groceries, Australia. Reduced manual reporting time by 80% monthly for HR and accounts.
        </p>
        <Link to="#" className="btn-primary">
          Explore Project
        </Link>
      </section>

      <section aria-labelledby="project-cashflow">
        <h2 id="project-cashflow">
          Daily Cash Flow Dashboard <small>Power BI</small>
        </h2>
        <p>
          <strong>Retail Finance Tracker</strong>
          <br />
          Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time. Improved financial visibility and reduced cash errors significantly.
        </p>
        <Link to="#" className="btn-primary">
          Explore Project
        </Link>
      </section>

      <section aria-labelledby="project-ai-planner">
        <h2 id="project-ai-planner">
          AI-Powered Daily Decision & Automation System <small>GPT + Notion</small>
        </h2>
        <p>
          <strong>AI-Powered Planning</strong>
          <br />
          Built an AI-based planner using GPT, Notion, and Google Sheets—automating journaling, routines, and task tracking. Saved 2+ hours daily by automating decisions and personal workflows.
        </p>
        <Link to="#" className="btn-primary">
          Explore the AI
        </Link>
      </section>

      <section aria-labelledby="project-automation-suite">
        <h2 id="project-automation-suite">
          Smart Automation Suite <small>GPT + Zapier</small>
        </h2>
        <p>
          <strong>Business Workflow Automation</strong>
          <br />
          Designed AI + Zapier automations for Excel and emails—auto-generating reports, syncing data, and streamlining ops for daily business use. Saved 15+ hours/month by eliminating repetitive manual work.
        </p>
        <Link to="#" className="btn-primary">
          See the Project
        </Link>
      </section>

      <section aria-labelledby="project-mahira">
        <h2 id="project-mahira">
          Mahira’s GitHub Portfolio <small>Web + AI</small>
        </h2>
        <p>
          <strong>AI-Enhanced Personal Website</strong>
          <br />
          Designed and hosted a professional AI-integrated portfolio for Mahira Chaudhry on GitHub with responsive UI and project showcases. Attracted international clients and improved creative visibility.
        </p>
        <a href="https://github.com/MahiraChaudhry" target="_blank" rel="noopener noreferrer" className="btn-primary">
          View Portfolio
        </a>
      </section>
    </main>
  );
};

export default Projects;
