// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section id="hero" aria-label="Introduction">
        <h1>Hi, I'm Sahil Ali</h1>
        <p>Inventory Management, Data Analysis & Reporting, and Excel are my keys to unlock efficiency.</p>
        <p>As an Inventory Specialist and Data Analyst, I transform data into actionable business insights.</p>
        <Link to="/about" className="btn-primary">Let's Explore More!</Link>
      </section>

      {/* Who am I Section */}
      <section id="who-am-i" aria-labelledby="who-am-i-title">
        <h2 id="who-am-i-title">Who am I?</h2>
        <p>
          I’m <strong>Sahil Ali</strong> — a data-savvy inventory specialist and aspiring data analyst with 4+ years of experience transforming supply chains, reducing billing errors, and building automation-powered dashboards.
        </p>
        <p>
          From ERPs and Excel magic to clean data and AI tools, I thrive on streamlining operations, reconciling records, and making business workflows smarter — one insight at a time.
        </p>
        <Link to="/about" className="btn-secondary">Learn More About Me</Link>
        <Link to="/resume" className="btn-secondary">See My Experience</Link>
      </section>

      {/* Experience Section */}
      <section id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <p>
          Over the years, I’ve worked across retail, supermarket, and warehouse operations — including roles at Ekam Indian Groceries (Australia), Bansal Supermarket, and Arzt Health.
        </p>
        <p>
          Whether it’s GRNs, invoice accuracy, inventory audits, or building AI-powered tools for reporting — I’ve consistently improved efficiency, cut errors, and delivered measurable value.
        </p>
        <Link to="/resume#experience" className="btn-secondary">View My Journey</Link>
        <Link to="/projects" className="btn-secondary">Check Out the Projects</Link>
      </section>

      {/* Projects Preview Section */}
      <section id="projects-preview" aria-labelledby="projects-preview-title">
        <h2 id="projects-preview-title">View All Projects ←</h2>
        <p>Explore my projects where I apply data analysis and inventory management skills to solve real-world challenges.</p>

        {/* Static project preview cards; consider replacing with dynamic mapping */}
        <article className="project-card">
          <h3>Zomato Restaurant Expansion Analysis <small>Excel</small></h3>
          <p>
            <strong>Market Strategy Dashboard</strong><br />
            Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights. Helped identify high-performing regions and new expansion opportunities.
          </p>
          <Link to="/projects#zomato" className="btn-tertiary">Explore Project</Link>
        </article>

        <article className="project-card">
          <h3>Bansal Supermarket Sales Analysis <small>Tableau</small></h3>
          <p>
            <strong>Sales Performance Insights</strong><br />
            Created a dynamic Tableau dashboard revealing daily/weekly sales trends, customer behavior, and category performance for better decision-making. Boosted revenue by 12% through optimized inventory and promotions.
          </p>
          <Link to="/projects#bansal" className="btn-tertiary">Explore Project</Link>
        </article>

        <article className="project-card">
          <h3>Ekam Attendance Tracker <small>SQL + Sheets</small></h3>
          <p>
            <strong>HR & Finance Automation</strong><br />
            Automated attendance and payroll data reporting using SQL queries and Google Sheets for Ekam Indian Groceries, Australia. Reduced manual reporting time by 80% monthly for HR and accounts.
          </p>
          <Link to="/projects#ekam" className="btn-tertiary">Explore Project</Link>
        </article>

        <article className="project-card">
          <h3>Daily Cash Flow Dashboard <small>Power BI</small></h3>
          <p>
            <strong>Retail Finance Tracker</strong><br />
            Created a multi-store Power BI dashboard to track daily cash flow and flag discrepancies across Ekam locations in real time. Improved financial visibility and reduced cash errors significantly.
          </p>
          <Link to="/projects#cashflow" className="btn-tertiary">Explore Project</Link>
        </article>

        <article className="project-card">
          <h3>AI-Powered Daily Decision & Automation System <small>GPT + Notion</small></h3>
          <p>
            <strong>AI-Powered Planning</strong><br />
            Built an AI-based planner using GPT, Notion, and Google Sheets—automating journaling, routines, and task tracking. Saved 2+ hours daily by automating decisions and personal workflows.
          </p>
          <Link to="/projects#ai-planner" className="btn-tertiary">Explore the AI</Link>
        </article>

        <article className="project-card">
          <h3>Smart Automation Suite <small>GPT + Zapier</small></h3>
          <p>
            <strong>Business Workflow Automation</strong><br />
            Designed AI + Zapier automations for Excel and emails—auto-generating reports, syncing data, and streamlining ops for daily business use. Saved 15+ hours/month by eliminating repetitive manual work.
          </p>
          <Link to="/projects#automation-suite" className="btn-tertiary">See the Project</Link>
        </article>

        <article className="project-card">
          <h3>Mahira’s GitHub Portfolio <small>Web + AI</small></h3>
          <p>
            <strong>AI-Enhanced Personal Website</strong><br />
            Designed and hosted a professional AI-integrated portfolio for Mahira Chaudhry on GitHub with responsive UI and project showcases. Attracted international clients and improved creative visibility.
          </p>
          <a href="https://github.com/MahiraChaudhry" target="_blank" rel="noopener noreferrer" className="btn-tertiary">View Portfolio</a>
        </article>

        <Link to="/projects" className="btn-primary">View All Projects</Link>
      </section>

      {/* Contact Section */}
      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Get in touch with Me</h2>
        <p>Let's connect! Your data and my expertise can create impactful solutions.</p>
        <ul>
          <li>Location: Rajasthan, India (Open for Relocation)</li>
          <li>Email: <a href="mailto:sahilkhan36985@gmail.com">sahilkhan36985@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/SahilTheCoder" target="_blank" rel="noopener noreferrer">github.com/SahilTheCoder</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/sahil-ali-714867242/" target="_blank" rel="noopener noreferrer">linkedin.com/in/sahil-ali-714867242/</a></li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
