// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useVoice } from '../context/VoiceContext';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { theme } = useTheme();
  const { isListening } = useVoice();
  const [cursor, setCursor] = useState('default');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Handle mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Change cursor style when hovering over interactive elements
      const target = e.target;
      if (target.closest('a, button, [role="button"]')) {
        setCursor('pointer');
      } else {
        setCursor('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate elements when in view
  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [controls, isInView]);

  // Parallax effect for elements
  const parallaxStyle = (factor = 1) => ({
    transform: `translate(${mousePosition.x * 0.01 * factor}px, ${mousePosition.y * 0.01 * factor}px)`,
    transition: 'transform 0.1s ease-out'
  });

  // Particle configuration
  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: theme === 'dark' ? '#00f7ff' : '#4f46e5'
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: theme === 'dark' ? '#00f7ff' : '#4f46e5',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>

      {/* Custom cursor */}
      <div 
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-transform duration-100 ${
          cursor === 'pointer' ? 'bg-blue-500 scale-150' : 'bg-white scale-100'
        }`}
        style={{
          left: `${mousePosition.x - 12}px`,
          top: `${mousePosition.y - 12}px`,
          mixBlendMode: 'difference',
          transform: `translate3d(0, 0, 0) scale(${cursor === 'pointer' ? 1.5 : 1})`,
          transition: 'transform 0.1s ease, background-color 0.2s ease',
        }}
      />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        aria-label="Introduction"
      >
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={item}
              className="inline-block px-4 py-2 rounded-full bg-opacity-20 bg-blue-500 mb-6 text-sm font-medium text-blue-300"
            >
              {isListening ? (
                <span className="flex items-center justify-center">
                  <span className="flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Listening...
                </span>
              ) : (
                "Welcome to my futuristic portfolio"
              )}
            </motion.div>
            
            <motion.h1 
              variants={item}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              <TypeAnimation
                sequence={[
                  'Hi, I\'m Sahil Ali',
                  1000,
                  'Hi, I\'m a Data Analyst',
                  1000,
                  'Hi, I\'m an Inventory Specialist',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transforming data into <span className="text-blue-400 font-medium">actionable insights</span> and optimizing supply chains through <span className="text-purple-400 font-medium">cutting-edge analytics</span> and automation.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/about" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Explore My Journey
              </Link>
              <a 
                href="#featured" 
                className="px-8 py-4 rounded-full bg-white bg-opacity-10 backdrop-blur-sm text-white font-medium hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 hover:border-opacity-40"
              >
                View My Work
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated elements */}
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500 opacity-20 filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 0, -50],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500 opacity-20 filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
        />
      </section>

      {/* Who am I Section */}
      <section 
        id="who-am-i" 
        className="py-20 relative overflow-hidden"
        aria-labelledby="who-am-i-title"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 
              id="who-am-i-title" 
              className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 inline-block"
            >
              Who am I?
            </h2>
            
            <div className="glass p-8 rounded-2xl backdrop-blur-md border border-white border-opacity-10 shadow-2xl">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm <span className="text-blue-400 font-medium">Sahil Ali</span> — a data-savvy inventory specialist and data analyst with 4+ years of experience transforming supply chains, reducing billing errors, and building automation-powered dashboards.
              </p>
              <p>
                From ERPs and Excel magic to clean data and AI tools, I thrive on streamlining operations, reconciling records, and making business workflows smarter — one insight at a time.
              </p>
              <Link to="/about" className="btn-secondary">Learn More About Me</Link>
              <Link to="/resume" className="btn-secondary">See My Experience</Link>
            </div>
          </motion.div>
        </div>
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
