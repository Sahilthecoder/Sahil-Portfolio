import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getMetrics } from '../../utils/performance';

/**
 * PerformanceMonitor component that displays real-time performance metrics
 */
const PerformanceMonitor = ({
  showOnLoad = false,
  position = 'bottom-right',
  maxWidth = '400px',
  maxHeight = '500px',
  refreshInterval = 2000,
  showCoreWebVitals = true,
  showNavigationTiming = true,
  showResourceTiming = false,
  showCustomMetrics = true,
  showControls = true,
  theme = 'light',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(showOnLoad);
  const [metrics, setMetrics] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [positionStyle, setPositionStyle] = useState({});
  const monitorRef = useRef(null);
  const headerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const metricsIntervalRef = useRef(null);

  // Format bytes to human-readable string
  const formatBytes = useCallback((bytes, decimals = 2) => {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  }, []);

  // Format time in milliseconds
  const formatTime = useCallback((ms, decimals = 1) => {
    if (ms < 1000) return `${ms.toFixed(decimals)} ms`;
    return `${(ms / 1000).toFixed(decimals)} s`;
  }, []);

  // Format CLS score
  const formatCLS = useCallback((value) => {
    if (value < 0.1) return { value: value.toFixed(3), status: 'good' };
    if (value < 0.25) return { value: value.toFixed(3), status: 'needs-improvement' };
    return { value: value.toFixed(3), status: 'poor' };
  }, []);

  // Format FID score
  const formatFID = useCallback((value) => {
    if (value < 100) return { value: Math.round(value), status: 'good' };
    if (value < 300) return { value: Math.round(value), status: 'needs-improvement' };
    return { value: Math.round(value), status: 'poor' };
  }, []);

  // Format LCP score
  const formatLCP = useCallback((value) => {
    if (value < 2500) return { value: Math.round(value), status: 'good' };
    if (value < 4000) return { value: Math.round(value), status: 'needs-improvement' };
    return { value: Math.round(value), status: 'poor' };
  }, []);

  // Update metrics
  const updateMetrics = useCallback(() => {
    const currentMetrics = getMetrics();
    setMetrics(currentMetrics);
  }, []);

  // Set up metrics polling
  useEffect(() => {
    updateMetrics();
    metricsIntervalRef.current = setInterval(updateMetrics, refreshInterval);
    
    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, [refreshInterval, updateMetrics]);

  // Set up drag and drop
  useEffect(() => {
    if (!headerRef.current || !monitorRef.current) return;

    const header = headerRef.current;
    const monitor = monitorRef.current;
    
    const handleMouseDown = (e) => {
      if (e.target !== header && !header.contains(e.target)) return;
      
      const rect = monitor.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);
      
      // Prevent text selection during drag
      e.preventDefault();
    };
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      // Use requestAnimationFrame for smooth dragging
      const updatePosition = () => {
        setPositionStyle({
          position: 'fixed',
          left: `${x}px`,
          top: `${y}px`,
          right: 'auto',
          bottom: 'auto',
          transform: 'none',
        });
      };
      
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    
    header.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, dragOffset]);

  // Set initial position based on prop
  useEffect(() => {
    if (Object.keys(positionStyle).length > 0) return;
    
    const positionMap = {
      'top-left': { top: '20px', left: '20px', right: 'auto', bottom: 'auto' },
      'top-right': { top: '20px', right: '20px', left: 'auto', bottom: 'auto' },
      'bottom-left': { bottom: '20px', left: '20px', right: 'auto', top: 'auto' },
      'bottom-right': { bottom: '20px', right: '20px', left: 'auto', top: 'auto' },
    };
    
    setPositionStyle({
      position: 'fixed',
      ...positionMap[position],
      zIndex: 9999,
    });
  }, [position, positionStyle]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Base styles
  const baseStyles = {
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '13px',
      lineHeight: 1.4,
      color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
      overflow: 'hidden',
      maxWidth,
      maxHeight,
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(4px)',
      ...positionStyle,
    },
    header: {
      padding: '8px 12px',
      backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(243, 244, 246, 0.8)',
      borderBottom: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'move',
      userSelect: 'none',
    },
    title: {
      fontWeight: 600,
      margin: 0,
      fontSize: '13px',
      color: theme === 'dark' ? '#f3f4f6' : '#111827',
    },
    content: {
      flex: 1,
      overflow: 'auto',
      padding: '12px',
    },
    tabContent: {
      marginTop: '12px',
    },
    metricGroup: {
      marginBottom: '16px',
    },
    metricGroupTitle: {
      fontSize: '12px',
      fontWeight: 600,
      margin: '0 0 8px 0',
      paddingBottom: '4px',
      borderBottom: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    metricItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px',
      fontSize: '12px',
    },
    metricLabel: {
      color: theme === 'dark' ? '#d1d5db' : '#4b5563',
    },
    metricValue: {
      fontWeight: 500,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    statusGood: {
      color: theme === 'dark' ? '#6ee7b7' : '#059669',
    },
    statusNeedsImprovement: {
      color: theme === 'dark' ? '#fcd34d' : '#d97706',
    },
    statusPoor: {
      color: theme === 'dark' ? '#fca5a5' : '#dc2626',
    },
    tabs: {
      display: 'flex',
      borderBottom: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)'}`,
      padding: '0 8px',
    },
    tab: {
      padding: '8px 12px',
      fontSize: '12px',
      fontWeight: 500,
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      marginBottom: '-1px',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    },
    tabActive: {
      color: theme === 'dark' ? '#60a5fa' : '#2563eb',
      borderBottomColor: theme === 'dark' ? '#60a5fa' : '#2563eb',
    },
    controls: {
      display: 'flex',
      gap: '8px',
    },
    button: {
      background: 'none',
      border: 'none',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      lineHeight: 1,
    },
    buttonHover: {
      backgroundColor: theme === 'dark' ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.5)',
    },
  };

  // Render metric with status
  const renderMetric = (label, value, formatter = (v) => v, unit = '') => {
    const formatted = formatter(value);
    const status = formatted.status || 'neutral';
    const displayValue = typeof formatted === 'object' ? formatted.value : formatted;
    
    return (
      <div style={baseStyles.metricItem}>
        <span style={baseStyles.metricLabel}>{label}</span>
        <span 
          style={{
            ...baseStyles.metricValue,
            ...(status === 'good' && baseStyles.statusGood),
            ...(status === 'needs-improvement' && baseStyles.statusNeedsImprovement),
            ...(status === 'poor' && baseStyles.statusPoor),
          }}
        >
          {displayValue} {unit}
        </span>
      </div>
    );
  };

  // Render Core Web Vitals
  const renderCoreWebVitals = () => (
    <div style={baseStyles.metricGroup}>
      <h3 style={baseStyles.metricGroupTitle}>Core Web Vitals</h3>
      {renderMetric('CLS', metrics.CLS?.value || 0, formatCLS)}
      {renderMetric('FID', metrics.FID?.value || 0, formatFID, 'ms')}
      {renderMetric('LCP', metrics.LCP?.value || 0, formatLCP, 'ms')}
      {renderMetric('FCP', metrics.FCP?.value || 0, formatTime, 'ms')}
      {renderMetric('INP', metrics.INP?.value || 0, (v) => v, 'ms')}
    </div>
  );

  // Render Navigation Timing
  const renderNavigationTiming = () => (
    <div style={baseStyles.metricGroup}>
      <h3 style={baseStyles.metricGroupTitle}>Navigation Timing</h3>
      {renderMetric('TTFB', metrics.TTFB || 0, formatTime, 'ms')}
      {renderMetric('FMP', metrics.FMP || 0, formatTime, 'ms')}
      {renderMetric('TTI', metrics.TTI || 0, formatTime, 'ms')}
      {renderMetric('TBT', metrics.TBT || 0, formatTime, 'ms')}
      {metrics.navigationTiming && renderMetric('DOM Load', metrics.navigationTiming.domComplete - metrics.navigationTiming.domLoading, formatTime, 'ms')}
      {metrics.navigationTiming && renderMetric('Page Load', metrics.navigationTiming.loadEventEnd - metrics.navigationTiming.startTime, formatTime, 'ms')}
    </div>
  );

  // Render Resource Timing
  const renderResourceTiming = () => {
    if (!metrics.resourceTimings || metrics.resourceTimings.length === 0) {
      return <div>No resource timing data available</div>;
    }
    
    return (
      <div style={baseStyles.metricGroup}>
        <h3 style={baseStyles.metricGroupTitle}>Resource Timing</h3>
        {metrics.resourceTimings.slice(0, 10).map((resource, index) => (
          <div key={index} style={baseStyles.metricItem}>
            <span style={baseStyles.metricLabel} title={resource.name}>
              {resource.name.split('/').pop()}
            </span>
            <span style={baseStyles.metricValue}>
              {formatTime(resource.duration)} • {formatBytes(resource.transferSize || 0)}
            </span>
          </div>
        ))}
        {metrics.resourceTimings.length > 10 && (
          <div style={{ ...baseStyles.metricItem, justifyContent: 'flex-end', fontSize: '11px', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            +{metrics.resourceTimings.length - 10} more resources
          </div>
        )}
      </div>
    );
  };

  // Render Custom Metrics
  const renderCustomMetrics = () => {
    const customMeasures = performance.getEntriesByType('measure');
    
    if (customMeasures.length === 0) {
      return <div>No custom metrics available</div>;
    }
    
    return (
      <div style={baseStyles.metricGroup}>
        <h3 style={baseStyles.metricGroupTitle}>Custom Metrics</h3>
        {customMeasures.slice(0, 10).map((measure, index) => (
          <div key={index} style={baseStyles.metricItem}>
            <span style={baseStyles.metricLabel} title={measure.name}>
              {measure.name}
            </span>
            <span style={baseStyles.metricValue}>
              {formatTime(measure.duration)}
            </span>
          </div>
        ))}
        {customMeasures.length > 10 && (
          <div style={{ ...baseStyles.metricItem, justifyContent: 'flex-end', fontSize: '11px', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            +{customMeasures.length - 10} more measurements
          </div>
        )}
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {showCoreWebVitals && renderCoreWebVitals()}
            {showNavigationTiming && renderNavigationTiming()}
          </>
        );
      case 'resources':
        return showResourceTiming && renderResourceTiming();
      case 'custom':
        return showCustomMetrics && renderCustomMetrics();
      default:
        return null;
    }
  };

  // Don't render if not open
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: theme === 'dark' ? '#1f2937' : '#ffffff',
          border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
          color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
        }}
        title="Open Performance Monitor"
        aria-label="Open Performance Monitor"
      >
        <span style={{ fontSize: '20px' }}>⚡</span>
      </button>
    );
  }

  return (
    <div 
      ref={monitorRef}
      style={{
        ...baseStyles.container,
        ...(isDragging && { cursor: 'grabbing' }),
      }}
      className={className}
    >
      <div 
        ref={headerRef}
        style={baseStyles.header}
      >
        <h2 style={baseStyles.title}>Performance Monitor</h2>
        {showControls && (
          <div style={baseStyles.controls}>
            <button
              onClick={() => updateMetrics()}
              style={baseStyles.button}
              title="Refresh metrics"
              aria-label="Refresh metrics"
            >
              ↻
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={baseStyles.button}
              title="Close"
              aria-label="Close performance monitor"
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      <div style={baseStyles.tabs}>
        <button
          style={{
            ...baseStyles.tab,
            ...(activeTab === 'overview' && baseStyles.tabActive),
          }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          style={{
            ...baseStyles.tab,
            ...(activeTab === 'resources' && baseStyles.tabActive),
          }}
          onClick={() => setActiveTab('resources')}
          disabled={!showResourceTiming}
        >
          Resources
        </button>
        <button
          style={{
            ...baseStyles.tab,
            ...(activeTab === 'custom' && baseStyles.tabActive),
          }}
          onClick={() => setActiveTab('custom')}
          disabled={!showCustomMetrics}
        >
          Custom
        </button>
      </div>
      
      <div style={baseStyles.content}>
        <div style={baseStyles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

PerformanceMonitor.propTypes = {
  /** Whether to show the monitor on load */
  showOnLoad: PropTypes.bool,
  /** Position of the monitor */
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  /** Maximum width of the monitor */
  maxWidth: PropTypes.string,
  /** Maximum height of the monitor */
  maxHeight: PropTypes.string,
  /** Refresh interval in milliseconds */
  refreshInterval: PropTypes.number,
  /** Whether to show Core Web Vitals */
  showCoreWebVitals: PropTypes.bool,
  /** Whether to show navigation timing */
  showNavigationTiming: PropTypes.bool,
  /** Whether to show resource timing */
  showResourceTiming: PropTypes.bool,
  /** Whether to show custom metrics */
  showCustomMetrics: PropTypes.bool,
  /** Whether to show control buttons */
  showControls: PropTypes.bool,
  /** Color theme */
  theme: PropTypes.oneOf(['light', 'dark']),
  /** Additional CSS class name */
  className: PropTypes.string,
};

export default PerformanceMonitor;
