// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main>
      <section aria-labelledby="about-title">
        <h1 id="about-title">Who am I?</h1>
        <p>
          Hello! I am <strong>Sahil Ali</strong>, an Inventory Specialist, Data Analyst, and System Optimizer based in Rajasthan, India. With over 4 years of hands-on experience, I specialize in managing stock levels, streamlining purchasing processes, and ensuring data accuracy for operational excellence.
        </p>
        <p>
          My expertise lies in leveraging ERP systems like Erply, advanced Excel functions such as VLOOKUP and Pivot Tables, and data-driven decision-making to optimize inventory and reporting processes. I am passionate about turning raw data into actionable insights that drive business success.
        </p>
        <p>
          Beyond my technical skills, I am a detail-oriented team player who thrives on collaboration and continuous improvement. I believe that accuracy and efficiency are the backbone of any successful supply chain.
        </p>
        <p>
          Throughout my career, I have successfully implemented automation techniques that reduce manual work and improve data integrity. I have experience in creating dashboards and reports that provide real-time insights to stakeholders, helping guide strategic decisions and improve inventory turnover rates.
        </p>
        <p>
          My passion for learning keeps me updated with the latest tools and technologies in data analytics, including AI-driven platforms such as ChatGPT and Perplexity, which I use to enhance data processing and problem-solving capabilities.
        </p>
        <p>
          I am committed to delivering solutions that not only meet operational needs but also empower businesses to grow sustainably and efficiently.
        </p>
      </section>

      <section aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <p>
          <strong>Bachelor of Science (B.Sc.) in Computer Science</strong><br />
          MDSU University, Rajasthan (2018 – 2021)
        </p>
      </section>

      <nav aria-label="Page navigation" className="about-navigation">
        <Link to="/" className="btn-secondary">Home</Link>
        <Link to="/projects" className="btn-secondary">Projects</Link>
        <Link to="/resume" className="btn-secondary">Resume</Link>
        <Link to="/contact" className="btn-secondary">Contact</Link>
      </nav>
    </main>
  );
};

export default About;
