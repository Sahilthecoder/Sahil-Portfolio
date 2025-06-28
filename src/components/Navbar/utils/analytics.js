// Simple analytics tracker for the navbar
class NavbarAnalytics {
  constructor() {
    this.visits = this.getStoredData('navbar_visits') || 0;
    this.sectionVisits = this.getStoredData('navbar_section_visits') || {};
    this.lastVisit = this.getStoredData('navbar_last_visit');
    this.engagement = this.getStoredData('navbar_engagement') || {
      clicks: {},
      hovers: {},
      timeSpent: 0,
      lastInteraction: null
    };
    
    this.startTime = Date.now();
    this.currentSection = null;
    this.sectionStartTime = null;
    
    // Initialize
    this.recordVisit();
    this.setupEventListeners();
  }
  
  // Get data from localStorage
  getStoredData(key) {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Save data to localStorage
  saveData(key, data) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Record a visit
  recordVisit() {
    this.visits += 1;
    this.lastVisit = new Date().toISOString();
    
    this.saveData('navbar_visits', this.visits);
    this.saveData('navbar_last_visit', this.lastVisit);
    
    // Send to analytics (in a real app, you would use an analytics service)
    this.sendAnalyticsEvent('page_visit', {
      visits: this.visits,
      lastVisit: this.lastVisit,
      referrer: document.referrer || 'direct'
    });
  }
  
  // Record section view
  recordSectionView(section) {
    if (this.currentSection === section) return;
    
    // Record time spent on previous section
    if (this.currentSection && this.sectionStartTime) {
      const timeSpent = Date.now() - this.sectionStartTime;
      this.recordEngagement('timeSpent', timeSpent);
      
      // Update section visits
      this.sectionVisits[this.currentSection] = (this.sectionVisits[this.currentSection] || 0) + 1;
      this.saveData('navbar_section_visits', this.sectionVisits);
    }
    
    // Update current section
    this.currentSection = section;
    this.sectionStartTime = Date.now();
    
    // Send section view event
    this.sendAnalyticsEvent('section_view', {
      section,
      timestamp: new Date().toISOString()
    });
  }
  
  // Record engagement (clicks, hovers, etc.)
  recordEngagement(type, data) {
    const now = Date.now();
    
    switch (type) {
      case 'click':
        this.engagement.clicks[data.element] = (this.engagement.clicks[data.element] || 0) + 1;
        break;
        
      case 'hover':
        this.engagement.hovers[data.element] = (this.engagement.hovers[data.element] || 0) + 1;
        break;
        
      case 'timeSpent':
        this.engagement.timeSpent += data;
        break;
        
      default:
        break;
    }
    
    this.engagement.lastInteraction = now;
    this.saveData('navbar_engagement', this.engagement);
    
    // Throttle analytics events
    if (!this.lastAnalyticsEvent || now - this.lastAnalyticsEvent > 10000) {
      this.sendAnalyticsEvent('engagement', {
        type,
        ...data,
        timestamp: new Date().toISOString()
      });
      this.lastAnalyticsEvent = now;
    }
  }
  
  // Get section analytics
  getSectionAnalytics(section) {
    const visits = this.sectionVisits[section] || 0;
    const clicks = this.engagement.clicks[section] || 0;
    const hovers = this.engagement.hovers[section] || 0;
    
    // Calculate engagement score (simple formula)
    const engagementScore = Math.min(100, visits * 2 + clicks * 3 + hovers);
    
    // Generate a random trend (in a real app, this would be based on historical data)
    const trend = Math.random() > 0.5 ? 'up' : 'down';
    const trendValue = Math.floor(Math.random() * 30) + 5;
    
    return {
      visits,
      clicks,
      hovers,
      engagementScore,
      trend,
      trendValue,
      lastUpdated: new Date().toISOString()
    };
  }
  
  // Get popular sections
  getPopularSections(limit = 3) {
    const sections = Object.entries(this.sectionVisits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([section, visits]) => ({
        section,
        visits,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        trendValue: Math.floor(Math.random() * 20) + 5
      }));
    
    return sections;
  }
  
  // Set up event listeners
  setupEventListeners() {
    if (typeof window === 'undefined') return;
    
    // Track link clicks
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="/"]');
      if (target) {
        const section = target.getAttribute('href').replace(/^\//, '') || 'home';
        this.recordEngagement('click', {
          element: section,
          text: target.textContent.trim(),
          href: target.getAttribute('href')
        });
      }
    });
    
    // Track hovers (with debounce)
    let hoverTimer;
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a[href^="/"]');
      if (target) {
        clearTimeout(hoverTimer);
        const section = target.getAttribute('href').replace(/^\//, '') || 'home';
        
        hoverTimer = setTimeout(() => {
          this.recordEngagement('hover', {
            element: section,
            text: target.textContent.trim(),
            hoverDuration: 1000 // Default hover duration
          });
        }, 500); // Debounce hovers
      }
    });
    
    // Track time spent on page/section
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - this.startTime;
      this.recordEngagement('timeSpent', timeSpent);
      
      if (this.currentSection && this.sectionStartTime) {
        const sectionTimeSpent = Date.now() - this.sectionStartTime;
        this.recordEngagement('timeSpent', sectionTimeSpent);
      }
    });
    
    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden, record time spent
        const timeSpent = Date.now() - this.startTime;
        this.recordEngagement('timeSpent', timeSpent);
      } else {
        // Page is visible again, reset start time
        this.startTime = Date.now();
      }
    });
  }
  
  // Send analytics event (mock implementation)
  sendAnalyticsEvent(eventName, data) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}:`, data);
    }
    
    // In a real app, you would send this to your analytics service
    // Example:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: eventName, ...data })
    // });
  }
}

// Singleton instance
export const navbarAnalytics = new NavbarAnalytics();

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Helper function to get trend icon
const getTrendIcon = (trend) => {
  if (trend === 'up') {
    return '↑';
  } else if (trend === 'down') {
    return '↓';
  }
  return '→';
};

export { formatNumber, getTrendIcon };
