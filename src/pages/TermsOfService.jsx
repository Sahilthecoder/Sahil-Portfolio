import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8"
        >
          <svg 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Sahil Ali's portfolio website. These Terms of Service ("Terms") govern your access to and use of this website. By accessing or using the site, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">2. Intellectual Property Rights</h2>
              <p className="mb-4">
                All content on this website, including but not limited to text, graphics, logos, and images, is the property of Sahil Ali and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">3. Use of the Website</h2>
              <p className="mb-2">You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Use the website in any way that is unlawful, fraudulent, or harmful</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Use the website to copy, store, or transmit any computer viruses or malicious software</li>
                <li>Use any automated means to access the website without our written permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">4. Third-Party Links</h2>
              <p className="mb-4">
                This website may contain links to third-party websites or services that are not owned or controlled by Sahil Ali. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">5. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall Sahil Ali be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">6. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">7. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at {' '}
                <a 
                  href="mailto:Sahilkhan36985@gmail.com" 
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sahilkhan36985@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
