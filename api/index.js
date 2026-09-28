import express from 'express';
import cors from 'cors';
import hackathonRoutes from '../server/routes/hackathon.js';
import submissionsRoutes from '../server/routes/submissions.js';
import teamsRoutes from '../server/routes/teams.js';
import judgingRoutes from '../server/routes/judging.js';
import leaderboardRoutes from '../server/routes/leaderboard.js';
import analyticsRoutes from '../server/routes/analytics.js';
import exportRoutes from '../server/routes/export.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health probes
app.get('/health', (req, res) => res.json({ status: 'healthy', platform: 'Vercel Serverless' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', engine: 'Dogfood 2026' }));

// Mount API routes
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/judging', judgingRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/export', exportRoutes);

export default app;
