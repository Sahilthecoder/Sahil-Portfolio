import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, AlertTriangle, CheckCircle, Clock, Zap, RefreshCw } from 'lucide-react';
import usePerformanceMetrics from '../hooks/usePerformanceMetrics';

type MetricData = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  unit?: string;
  thresholdGood: number;
  thresholdNeedsImprovement: number;
};

const PerformanceMonitor: React.FC<{ showDetails?: boolean }> = ({ showDetails = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const performanceData = usePerformanceMetrics();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (performanceData.isSupported) {
      const newMetrics: MetricData[] = [];

      // FCP - First Contentful Paint
      if (performanceData.FCP) {
        newMetrics.push({
          name: 'FCP',
          value: performanceData.FCP.value,
          rating: performanceData.FCP.rating,
          unit: 'ms',
          thresholdGood: 1800,
          thresholdNeedsImprovement: 3000,
        });
      }

      // LCP - Largest Contentful Paint
      if (performanceData.LCP) {
        newMetrics.push({
          name: 'LCP',
          value: performanceData.LCP.value,
          rating: performanceData.LCP.rating,
          unit: 'ms',
          thresholdGood: 2500,
          thresholdNeedsImprovement: 4000,
        });
      }

      // FID - First Input Delay
      if (performanceData.FID) {
        newMetrics.push({
          name: 'FID',
          value: performanceData.FID.value,
          rating: performanceData.FID.rating,
          unit: 'ms',
          thresholdGood: 100,
          thresholdNeedsImprovement: 300,
        });
      }

      // CLS - Cumulative Layout Shift
      if (performanceData.CLS) {
        newMetrics.push({
          name: 'CLS',
          value: performanceData.CLS.value,
          rating: performanceData.CLS.rating,
          unit: '',
          thresholdGood: 0.1,
          thresholdNeedsImprovement: 0.25,
        });
      }

      // TTFB - Time to First Byte
      if (performanceData.TTFB) {
        newMetrics.push({
          name: 'TTFB',
          value: performanceData.TTFB.value,
          rating: performanceData.TTFB.rating,
          unit: 'ms',
          thresholdGood: 600,
          thresholdNeedsImprovement: 1800,
        });
      }

      setMetrics(newMetrics);
      setLastUpdated(new Date());
    }
  }, [performanceData]);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-500';
      case 'needs-improvement':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'poor':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatValue = (value: number, unit?: string) => {
    if (unit === 'ms') {
      return `${value.toLocaleString()} ms`;
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 3 });
  };

  const getOverallRating = () => {
    if (metrics.length === 0) return 'loading';
    
    const ratings = metrics.map(m => m.rating);
    
    if (ratings.includes('poor')) return 'poor';
    if (ratings.includes('needs-improvement')) return 'needs-improvement';
    return 'good';
  };

  const overallRating = getOverallRating();
  const overallRatingColor = getRatingColor(overallRating);
  const overallRatingIcon = getRatingIcon(overallRating);

  if (!isClient || !performanceData.isSupported) {
    return showDetails ? (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center">
          <Info className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Performance monitoring is not supported in this browser or environment.
          </p>
        </div>
      </div>
    ) : null;
  }

  const chartData = metrics.map(metric => ({
    name: metric.name,
    value: metric.value,
    thresholdGood: metric.thresholdGood,
    thresholdNeedsImprovement: metric.thresholdNeedsImprovement,
    rating: metric.rating,
  }));

  return (
    <div className="relative">
      {showDetails ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Metrics</h3>
            <div className="flex items-center">
              {lastUpdated && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mr-3">
                  <Clock className="h-3 w-3 mr-1" />
                  {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                title="Refresh metrics"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Performance</h4>
                <div className={`flex items-center ${overallRatingColor}`}>
                  {overallRatingIcon}
                  <span className="ml-1 text-sm font-medium capitalize">
                    {overallRating.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.length > 0 ? (
                    <>
                      {Math.round(
                        (metrics.filter(m => m.rating === 'good').length / metrics.length) * 100
                      )}%
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                        metrics passed
                      </span>
                    </>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Metrics</h4>
              <div className="space-y-2">
                {metrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {metric.name}
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm font-mono ${getRatingColor(metric.rating)}`}>
                        {formatValue(metric.value, metric.unit)}
                      </span>
                      <span className="ml-1">
                        {getRatingIcon(metric.rating)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value.toLocaleString()}${props.payload.unit || ''}`,
                    props.payload.name,
                  ]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.rating === 'good' ? '#10B981' : 
                        entry.rating === 'needs-improvement' ? '#F59E0B' : '#EF4444'
                      } 
                    />
                  ))}
                </Bar>
                {chartData[0]?.thresholdGood && (
                  <Bar 
                    dataKey="thresholdGood" 
                    fill="transparent" 
                    stroke="#10B981" 
                    strokeDasharray="3 3"
                    activeBar={undefined}
                  />
                )}
                {chartData[0]?.thresholdNeedsImprovement && (
                  <Bar 
                    dataKey="thresholdNeedsImprovement" 
                    fill="transparent" 
                    stroke="#F59E0B" 
                    strokeDasharray="3 3"
                    activeBar={undefined}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              Good
              <span className="mx-2">•</span>
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              Needs Improvement
              <span className="mx-2">•</span>
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              Poor
            </p>
            <p className="mt-2">
              <Zap className="inline-block h-3 w-3 text-yellow-500 mr-1" />
              Dotted lines indicate performance thresholds
            </p>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg ${
              overallRating === 'good' 
                ? 'bg-green-500 hover:bg-green-600' 
                : overallRating === 'needs-improvement'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors duration-200`}
            aria-label="Toggle performance monitor"
          >
            <div className="relative">
              <Zap className="h-6 w-6" />
              {overallRating !== 'good' && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">!</span>
                </span>
              )}
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Performance Summary</h3>
                  <div className="flex items-center">
                    <div className={`flex items-center ${overallRatingColor} mr-2`}>
                      {overallRatingIcon}
                      <span className="ml-1 text-xs font-medium capitalize">
                        {overallRating.replace('-', ' ')}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                      aria-label="Close"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {metrics.map((metric) => (
                    <div key={metric.name} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {metric.name}
                        </span>
                        <span className={`font-mono ${getRatingColor(metric.rating)}`}>
                          {formatValue(metric.value, metric.unit)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            metric.rating === 'good' ? 'bg-green-500' :
                            metric.rating === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.min(100, (metric.value / (metric.thresholdNeedsImprovement * 1.5)) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Refresh to update
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default PerformanceMonitor;
