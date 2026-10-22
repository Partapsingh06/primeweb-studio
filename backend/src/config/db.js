import dns from 'node:dns';
import mongoose from 'mongoose';
import { ensureInitialData } from './initData.js';

// Configure reliable DNS servers for resolving MongoDB Atlas SRV records
try {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch {
  // Ignore if not permitted in runtime environment
}

let memoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === 'test') {
    // Isolated in-memory Mongo instance for test suite
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      await mongoose.connect(memUri);
      console.log(`[Database] Test MongoMemoryServer connected at ${memUri}`);
      await ensureInitialData();
      return mongoose.connection;
    } catch (err) {
      console.error('[Database] Failed to initialize Test MongoMemoryServer:', err.message);
      throw err;
    }
  }

  // Enforce MONGODB_URI in production
  if (process.env.NODE_ENV === 'production' && !uri) {
    const errorMsg = '[Database] Fatal: MONGODB_URI environment variable is required in production mode.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Attempt connection to configured URI if present
  if (uri) {
    let cleanUri = uri;
    if (cleanUri.includes('<') || cleanUri.includes('>')) {
      console.warn('[Database] Warning: MONGODB_URI contains placeholder brackets "<" or ">". Stripping brackets automatically.');
      cleanUri = cleanUri.replace(/<([^>]+)>/g, '$1').replace(/[<>]/g, '');
    }

    try {
      const conn = await mongoose.connect(cleanUri, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
      await ensureInitialData();
      return conn.connection;
    } catch (error) {
      console.warn(`[Database] Primary connection failed (${error.message}).`);
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
    }
  }

  // In production, never fall back to in-memory database
  if (process.env.NODE_ENV === 'production') {
    throw new Error('[Database] Fatal: Cannot connect to MongoDB Atlas in production. In-memory fallback is disabled.');
  }

  // In development, fallback gracefully to MongoMemoryServer so full application is immediately functional
  try {
    console.log('[Database] Initializing development MongoMemoryServer (embedded database)...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    const conn = await mongoose.connect(memUri);
    console.log(`[Database] Development MongoMemoryServer connected at ${memUri}`);
    await ensureInitialData();
    return conn.connection;
  } catch (memErr) {
    console.error('[Database] Fatal: Unable to initialize embedded MongoMemoryServer:', memErr.message);
    throw memErr;
  }
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  if (memoryServer) {
    await memoryServer.stop();
  }
};

