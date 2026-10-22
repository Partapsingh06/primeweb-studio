import './config/env.js';
import dns from 'node:dns';
try {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch {
  // Ignore if not permitted
}

import app from './app.js';
import { connectDB, closeDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and guarantee database readiness before listening for HTTP requests
connectDB().then(() => {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`=================================================`);
    console.log(`  PrimeWeb Studio Backend API Running           `);
    console.log(`  Local: http://localhost:${PORT}               `);
    console.log(`  IPv4:  http://127.0.0.1:${PORT}               `);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=================================================`);
  });

  const handleShutdown = async (signal) => {
    console.log(`[Server] Received ${signal}. Closing HTTP server and database...`);
    server.close(async () => {
      await closeDB();
      console.log('[Server] Gracefully terminated.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}).catch((err) => {
  console.error('[Server] Fatal startup error:', err.message);
  process.exit(1);
});
