import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAssetPath } from '../utils/assetUtils';

const Favicon = () => {
  // Generate favicon and app icon links
  const faviconPath = getAssetPath('images/favicon.ico');
  const appleTouchIconPath = getAssetPath('images/apple-touch-icon.png');
  const safariPinnedTabPath = getAssetPath('images/safari-pinned-tab.svg');
  
  // Preload critical icons
  useEffect(() => {
    const preloadIcons = async () => {
      await Promise.all([
        preloadImage(faviconPath),
        preloadImage(appleTouchIconPath),
        preloadImage(safariPinnedTabPath),
      ]);
    };
    
    preloadIcons();
  }, [faviconPath, appleTouchIconPath, safariPinnedTabPath]);

  return (
    <Helmet>
      {/* Standard favicon */}
      <link rel="icon" href={faviconPath} />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconPath} />
      
      {/* Safari Pinned Tab */}
      <link rel="mask-icon" href={safariPinnedTabPath} color="#5bbad5" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-config" content={getAssetPath('images/browserconfig.xml')} />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="msapplication-TileImage" content={getAssetPath('images/mstile-144x144.png')} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-navbutton-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href={getAssetPath('site.webmanifest')} />
    </Helmet>
  );
};

export default Favicon;
