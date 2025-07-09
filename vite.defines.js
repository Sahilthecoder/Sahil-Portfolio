// vite.defines.js
export default function definesPlugin() {
  return {
    name: 'vite-plugin-defines',
    config(config, { command }) {
      const isBuild = command === 'build';
      return {
        define: {
          __DEFINES__: JSON.stringify({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
            'import.meta.env.DEV': process.env.NODE_ENV !== 'production',
            'import.meta.env.PROD': process.env.NODE_ENV === 'production',
          }),
        },
      };
    },
  };
}
