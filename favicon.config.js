module.exports = {
  // Your app's title (used for the manifest)
  appName: "Sahil Ali - Portfolio",
  appShortName: "Sahil Ali",
  appDescription: "Data Analyst and Inventory Specialist Portfolio",
  
  // Your theme color
  themeColor: "#2563eb",
  backgroundColor: "#ffffff",
  
  // Path to your source logo (should be at least 512x512px)
  logo: "./public/images/logo-hd.png",
  
  // Output directory (relative to the root of your project)
  outputDir: "./public/favicons",
  
  // Favicon configuration
  faviconConfig: {
    // Favicon generation settings
    appName: "Sahil Ali",
    appShortName: "Sahil",
    appDescription: "Data Analyst and Inventory Specialist",
    developerName: "Sahil Ali",
    developerURL: "https://sahilthecoder.github.io/Sahil-Portfolio",
    dir: "auto",
    lang: "en-US",
    background: "#fff",
    theme_color: "#2563eb",
    appleStatusBarStyle: "black-translucent",
    display: "standalone",
    orientation: "portrait",
    scope: "/Sahil-Portfolio/",
    start_url: "/Sahil-Portfolio/",
    prefer_related_applications: false,
    version: "1.0",
    logging: true,
    pixel_art: false,
    loadManifestWithCredentials: false,
    manifestMaskable: false,
    
    // Icons configuration
    icons: {
      // For modern browsers and devices
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      windows: true,
      yandex: false
    },
    
    // Path configuration
    path: "/Sahil-Portfolio/favicons/"
  }
};
