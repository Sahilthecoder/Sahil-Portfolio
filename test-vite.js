const { createServer } = require('vite');

async function startServer() {
  try {
    const server = await createServer({
      // Any valid user config options, plus `mode` and `configFile`
      configFile: false,
      root: __dirname,
      server: {
        port: 3000,
        host: '0.0.0.0',
        open: true
      },
      logLevel: 'info'
    });
    
    await server.listen();
    server.printUrls();
    
    console.log('Vite dev server started successfully!');
  } catch (error) {
    console.error('Failed to start Vite dev server:', error);
    process.exit(1);
  }
}

startServer();
