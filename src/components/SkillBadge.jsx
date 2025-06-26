// Example inside About.jsx or Skills section
import SkillBadge from '../components/SkillBadge';

const skills = [
  'Inventory Management',
  'Data Analysis',
  'Excel (VLOOKUP, Pivot Tables)',
  'ERP Systems (Erply)',
  'SQL',
  'Tableau',
  'Power BI',
  'Automation (Zapier, GPT)',
];

const SkillsSection = () => (
  <section aria-labelledby="skills-title">
    <h2 id="skills-title">Skills</h2>
    <div className="skills-container">
      {skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} />
      ))}
    </div>
  </section>
);

export default SkillsSection;
