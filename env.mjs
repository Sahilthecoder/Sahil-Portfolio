// Environment variables and defines configuration
export const DEFINES = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
  'import.meta.env.DEV': process.env.NODE_ENV !== 'production',
  'import.meta.env.PROD': process.env.NODE_ENV === 'production',
};

// Make it globally available for Vite
if (typeof global !== 'undefined') {
  global.__DEFINES__ = DEFINES;
}

export default DEFINES;
