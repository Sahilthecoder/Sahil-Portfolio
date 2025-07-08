import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const FaviconManager = () => {
  // Base URL for GitHub Pages
  const baseUrl = '/Sahil-Portfolio';
  
  return (
    <Helmet>
      {/* Standard favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href={`${baseUrl}/favicons/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${baseUrl}/favicons/favicon-16x16.png`} />
      <link rel="shortcut icon" href={`${baseUrl}/favicons/favicon.ico`} />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/favicons/apple-touch-icon.png`} />
      
      {/* Android/Chrome */}
      <link rel="manifest" href={`${baseUrl}/site.webmanifest`} />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Windows 8/10 */}
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-TileImage" content={`${baseUrl}/favicons/mstile-150x150.png`} />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href={`${baseUrl}/favicons/safari-pinned-tab.svg`} color="#2563eb" />
    </Helmet>
  );
};

export default FaviconManager;
