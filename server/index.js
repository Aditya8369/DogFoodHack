import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './db.js';

import hackathonRoutes from './routes/hackathon.js';
import submissionsRoutes from './routes/submissions.js';
import teamsRoutes from './routes/teams.js';
import judgingRoutes from './routes/judging.js';
import leaderboardRoutes from './routes/leaderboard.js';
import analyticsRoutes from './routes/analytics.js';
import exportRoutes from './routes/export.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Healthcheck endpoints (Essential for Docker and Kubernetes orchestration)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'Dogfood 2026 Hackathon Engine'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'Dogfood 2026' });
});

// Mount modular API routes
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/judging', judgingRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/export', exportRoutes);

// Server-Sent Events (SSE) for Real-Time Hackathon Stream
let sseClients = [];

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send initial connected ping
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Dogfood live stream active' })}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// Helper to broadcast SSE event
export function broadcastEvent(type, payload) {
  sseClients.forEach(c => {
    try {
      c.res.write(`data: ${JSON.stringify({ type, payload, timestamp: new Date().toISOString() })}\n\n`);
    } catch (err) {
      console.error('[SSE] Broadcast error:', err);
    }
  });
}

// Serve production static assets if client build exists
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const indexHtml = path.join(clientDistPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head><title>Dogfood 2026 Backend</title></head>
          <body style="font-family: sans-serif; background: #0a0d14; color: #f3f4f6; text-align: center; padding: 50px;">
            <h1 style="color: #8b5cf6;">Dogfood 2026 API Server is Running</h1>
            <p>API is active at <code>/api/hackathon</code></p>
            <p>To view the web UI in development, run the client dev server or execute <code>npm run build</code>.</p>
          </body>
        </html>
      `);
    }
  });
});

// Start Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 Dogfood 2026 Hackathon Platform Ready`);
  console.log(`📡 Server listening on http://localhost:${PORT}`);
  console.log(`🐳 Docker-ready self-hostable service`);
  console.log(`=========================================`);
});
