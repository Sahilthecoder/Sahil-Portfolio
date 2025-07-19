import { Helmet } from 'react-helmet-async';

const FaviconManager = () => {
  // Base URL for GitHub Pages
  const baseUrl = '/Sahil-Portfolio';
  
  return (
    <Helmet>
      {/* Standard favicon */}
      <link rel="icon" type="image/x-icon" href={`${baseUrl}/assets/favicon/favicon.ico`} />
      <link rel="icon" type="image/svg+xml" href={`${baseUrl}/assets/favicon/favicon.svg`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${baseUrl}/assets/favicon/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${baseUrl}/assets/favicon/favicon-16x16.png`} />
      <link rel="manifest" href={`${baseUrl}/site.webmanifest`} />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/assets/favicon/apple-touch-icon.png`} />
      
      {/* Android/Chrome */}
      <link rel="icon" type="image/png" sizes="192x192" href={`${baseUrl}/assets/favicon/android-chrome-192x192.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`${baseUrl}/assets/favicon/android-chrome-512x512.png`} />
      
      {/* Windows 8/10 */}
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-TileImage" content={`${baseUrl}/assets/favicon/mstile-150x150.png`} />
      <meta name="msapplication-square310x310logo" content={`${baseUrl}/assets/favicon/mstile-310x310.png`} />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href={`${baseUrl}/assets/favicon/safari-pinned-tab.svg`} color="#2563eb" />
    </Helmet>
  );
};

export default FaviconManager;
