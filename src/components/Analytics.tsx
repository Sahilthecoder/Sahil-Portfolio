import React from 'react';

interface AnalyticsProps {
  domain?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ domain = 'sahil-ali.vercel.app' }) => {
  return <script async defer data-domain={domain} src="https://plausible.io/js/script.js" />;
};

export default Analytics;
