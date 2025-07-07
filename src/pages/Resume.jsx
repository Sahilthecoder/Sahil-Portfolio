// src/pages/Resume.jsx
import React from 'react';

const Resume = () => {
  return (
    <main>
      <h1>Resume</h1>

      <section aria-labelledby="experience-title">
        <h2 id="experience-title">Professional Experience</h2>

        <article>
          <h3>Inventory Specialist & Cash Flow</h3>
          <p>
            <strong>Ekam Indian Groceries, Adelaide, Australia</strong>
            <br />
            Dec 2023 – June 2025
          </p>
          <ul>
            <li>
              Managed daily purchase entries, invoice verification, attendance tracking, and
              supplier coordination across dual store locations.
            </li>
            <li>
              Automated reporting processes and supported cash flow documentation during manager
              absence.
            </li>
            <li>
              Handled purchase data and fruit and vegetable invoices using ERP software and advanced
              Excel functions.
            </li>
            <li>
              Cross-checked supplier invoices and reconciled statements to prevent overbilling,
              ensuring financial accuracy.
            </li>
            <li>Maintained staff attendance and created daily cash reports.</li>
            <li>
              Collaborated with the team to support inventory accuracy and operational flow,
              reducing stock issues significantly.
            </li>
          </ul>
          <p>
            <strong>Highlights:</strong> Reduced billing errors and improved invoice match accuracy
            by 95%. Saved over 4 hours per week through structured Excel logs and automation.
          </p>
        </article>

        <article>
          <h3>GRN Officer</h3>
          <p>
            <strong>Bansal Supermarket, Surat, India</strong>
            <br />
            Dec 2022 – Nov 2023
          </p>
          <ul>
            <li>
              Responsible for goods receipt entries, invoice cross-checking, offer updates, and
              FIFO-based inventory flow.
            </li>
            <li>Maintained operational registers including Top 100/200 item reports.</li>
            <li>
              Conducted regular floor walks and enforced FIFO practices across departments to reduce
              waste.
            </li>
            <li>Handled PI management, rate updates, and price accuracy for fast-moving items.</li>
          </ul>
          <p>
            <strong>Highlights:</strong> Reduced stock discrepancies by 30% through enhanced GRN
            practices. Improved offer accuracy and register organization across 500+ SKUs.
          </p>
        </article>

        <article>
          <h3>Warehouse Supervisor</h3>
          <p>
            <strong>Arzt Health & Private Limited – Jaipur, India</strong>
            <br />
            June 2022 – Nov 2022
          </p>
          <ul>
            <li>
              Oversaw stock control, warehouse documentation, and physical inventory across training
              material storage.
            </li>
            <li>Ensured FIFO handling, audits, and timely replenishment.</li>
            <li>
              Led day-to-day warehouse operations and staff coordination with a strong focus on
              efficiency.
            </li>
            <li>Maintained accurate bin cards, stock logs, and conducted warehouse audits.</li>
          </ul>
          <p>
            <strong>Highlights:</strong> Achieved 100% stock availability across training cycles.
            Streamlined warehouse layout and improved stock handling speed.
          </p>
        </article>
      </section>

      <section aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <p>
          <strong>Bachelor of Science (B.Sc.) – Computer Science</strong>
          <br />
          MDSU University, Rajasthan (2018 – 2021)
        </p>
      </section>
    </main>
  );
};

export default Resume;
