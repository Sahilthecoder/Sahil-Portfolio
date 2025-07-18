module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {
      flexbox: 'no-2009',
      grid: 'autoplace'
    },
    'postcss-flexbugs-fixes': {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/**/*.{js,jsx,ts,tsx,html}',
          './public/index.html',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            'html', 'body', 'active', 'dark', 'light',
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /data-v-.*/,
          ],
          deep: [
            /^v-/, /^vs-/, /^vs-/, /^vgt-/, /^__/,
            /^theme-/, /^data-theme$/,
            /^vs-theme-/, /^vs-con-/, /^vs-sidebar-/, /^vs-*/,
          ],
        },
      },
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
        }],
      }
    } : {})
  },
};
