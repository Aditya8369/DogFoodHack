import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import cors from 'cors';
import { db } from '../server/db.js';

import hackathonRoutes from '../server/routes/hackathon.js';
import submissionsRoutes from '../server/routes/submissions.js';
import teamsRoutes from '../server/routes/teams.js';
import judgingRoutes from '../server/routes/judging.js';
import leaderboardRoutes from '../server/routes/leaderboard.js';
import analyticsRoutes from '../server/routes/analytics.js';
import exportRoutes from '../server/routes/export.js';

describe('REST & Real-Time API Integration Tests', () => {
  let app;
  let server;
  let baseUrl;

  before(async () => {
    // Ensure clean database state
    db.reset();

    app = express();
    app.use(cors());
    app.use(express.json());

    // Healthcheck probes
    app.get('/health', (req, res) => {
      res.json({ status: 'healthy', uptime: process.uptime(), app: 'Dogfood 2026 Test' });
    });
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', engine: 'Dogfood 2026' });
    });

    // Mount all routes exactly like production server
    app.use('/api/hackathon', hackathonRoutes);
    app.use('/api/submissions', submissionsRoutes);
    app.use('/api/teams', teamsRoutes);
    app.use('/api/judging', judgingRoutes);
    app.use('/api/leaderboard', leaderboardRoutes);
    app.use('/api/analytics', analyticsRoutes);
    app.use('/api/export', exportRoutes);

    // Listen on port 0 for an ephemeral available port to prevent any port collision
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const address = server.address();
        baseUrl = `http://127.0.0.1:${address.port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  describe('Health Probes', () => {
    it('GET /health should return 200 with healthy status', async () => {
      const res = await fetch(`${baseUrl}/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'healthy');
      assert.ok(data.uptime !== undefined);
    });

    it('GET /api/health should return ok', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'ok');
    });
  });

  describe('Hackathon Lifecycle & Operations (/api/hackathon)', () => {
    it('GET /api/hackathon should return platform config, tracks, and criteria', async () => {
      const res = await fetch(`${baseUrl}/api/hackathon`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.config);
      assert.ok(Array.isArray(data.tracks));
      assert.ok(Array.isArray(data.criteria));
      assert.ok(Array.isArray(data.judges));
      assert.ok(Array.isArray(data.organizers));
      assert.ok(data.submissionCount > 0);
    });

    it('PATCH /api/hackathon/phase should allow transition to a valid phase', async () => {
      const res = await fetch(`${baseUrl}/api/hackathon/phase`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESULTS' })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.config.status, 'RESULTS');
    });

    it('PATCH /api/hackathon/phase should reject an invalid phase', async () => {
      const res = await fetch(`${baseUrl}/api/hackathon/phase`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'INVALID_STAGE_NAME' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error);
    });

    it('POST /api/hackathon/announcements should create a broadcast notification', async () => {
      const payload = {
        title: 'Emergency Server Maintenance',
        content: 'Database backup scheduled in 10 minutes.',
        severity: 'CRITICAL',
        author: 'Admin Ops'
      };

      const res = await fetch(`${baseUrl}/api/hackathon/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.announcement.title, payload.title);
      assert.equal(data.announcement.severity, 'CRITICAL');
    });

    it('POST /api/hackathon/mentorship should create a support ticket', async () => {
      const ticketPayload = {
        teamName: 'CyberPioneers',
        topic: 'Docker compose volume permission bug on Alpine',
        category: 'Docker & DevOps',
        notes: 'Help needed to mount persistent data directory'
      };

      const res = await fetch(`${baseUrl}/api/hackathon/mentorship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketPayload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.ticket.teamName, ticketPayload.teamName);
      assert.equal(data.ticket.status, 'OPEN');
    });

    it('POST /api/hackathon/seekers should register a hacker seeker profile', async () => {
      const seekerPayload = {
        name: 'Jordan Sparks',
        role: 'Fullstack & Rust Engineer',
        skills: 'Rust, React, Docker, WebAssembly',
        timezone: 'UTC-5',
        github: 'https://github.com/jsparks',
        bio: 'Looking for a high-intensity hackathon team'
      };

      const res = await fetch(`${baseUrl}/api/hackathon/seekers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seekerPayload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.seeker.name, 'Jordan Sparks');
      assert.ok(Array.isArray(data.seeker.skills));
    });
  });

  describe('Submissions API (/api/submissions)', () => {
    let createdSubId;

    it('GET /api/submissions should list all submissions', async () => {
      const res = await fetch(`${baseUrl}/api/submissions`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.submissions));
      assert.ok(data.submissions.length > 0);
    });

    it('GET /api/submissions should filter by search query', async () => {
      const res = await fetch(`${baseUrl}/api/submissions?search=Docker`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.submissions));
    });

    it('POST /api/submissions should create a new project', async () => {
      const newSub = {
        title: 'Neural Matrix Engine',
        tagline: 'Self-improving AI orchestrator',
        description: 'Comprehensive markdown description of the neural matrix platform.',
        track: 'track-core',
        techStack: ['Node.js', 'Docker', 'React', 'PyTorch'],
        repoUrl: 'https://github.com/matrix/engine',
        demoUrl: 'https://engine.matrix.test',
        teamName: 'MatrixLabs'
      };

      const res = await fetch(`${baseUrl}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSub)
      });

      assert.equal(res.status, 201);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.submission.title, newSub.title);
      assert.equal(data.submission.track, newSub.track);
      assert.equal(data.submission.pairwiseScore, 1200);
      createdSubId = data.submission.id;
    });

    it('GET /api/submissions/:id should return single project details', async () => {
      assert.ok(createdSubId, 'createdSubId must be defined');
      const res = await fetch(`${baseUrl}/api/submissions/${createdSubId}`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.submission.id, createdSubId);
      assert.ok(Array.isArray(data.submission.evaluations));
    });

    it('POST /api/submissions/:id/upvote should increment upvote counter', async () => {
      const res = await fetch(`${baseUrl}/api/submissions/${createdSubId}/upvote`, {
        method: 'POST'
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.upvotes >= 1);
    });
  });

  describe('Judging & Pairwise Duels (/api/judging)', () => {
    it('GET /api/judging should return evaluations and judge progress list', async () => {
      const res = await fetch(`${baseUrl}/api/judging`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.evaluations));
      assert.ok(Array.isArray(data.judgesProgress));
      assert.ok(Array.isArray(data.pairwiseDuels));
    });

    it('POST /api/judging/rubric should record a judge scorecard evaluation', async () => {
      const subRes = await fetch(`${baseUrl}/api/submissions`);
      const subData = await subRes.json();
      const targetSub = subData.submissions[0];

      const rubricPayload = {
        judgeId: 'judge-1',
        judgeName: 'Dr. Sarah Chen',
        submissionId: targetSub.id,
        scores: [
          { criterionId: 'crit-innov', score: 9 },
          { criterionId: 'crit-tech', score: 10 },
          { criterionId: 'crit-ux', score: 8 },
          { criterionId: 'crit-practical', score: 9 },
          { criterionId: 'crit-presentation', score: 8 }
        ],
        feedback: 'Superb architecture and flawless documentation.'
      };

      const res = await fetch(`${baseUrl}/api/judging/rubric`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rubricPayload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.evaluation.submissionId, targetSub.id);
      assert.equal(data.evaluation.judgeId, 'judge-1');
    });

    it('GET /api/judging/pairwise/next should return two candidates for head-to-head match', async () => {
      const res = await fetch(`${baseUrl}/api/judging/pairwise/next`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.match.subA);
      assert.ok(data.match.subB);
      assert.notEqual(data.match.subA.id, data.match.subB.id);
    });

    it('POST /api/judging/pairwise/vote should cast duel vote and update Elo ratings', async () => {
      const matchRes = await fetch(`${baseUrl}/api/judging/pairwise/next`);
      const matchData = await matchRes.json();
      const { subA, subB } = matchData.match;

      const votePayload = {
        judgeId: 'judge-2',
        judgeName: 'Marcus Vance',
        subAId: subA.id,
        subBId: subB.id,
        winnerId: subA.id
      };

      const res = await fetch(`${baseUrl}/api/judging/pairwise/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(votePayload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.subA.pairwiseScore);
      assert.ok(data.subB.pairwiseScore);
    });
  });

  describe('Leaderboard & Analytics (/api/leaderboard, /api/analytics)', () => {
    it('GET /api/leaderboard should return ranked projects and track standings', async () => {
      const res = await fetch(`${baseUrl}/api/leaderboard`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.rankings));
      assert.ok(data.trackStandings);
      assert.ok(Array.isArray(data.pairwiseStandings));

      if (data.rankings.length >= 2) {
        assert.ok(data.rankings[0].finalScore >= data.rankings[1].finalScore);
      }
    });

    it('GET /api/analytics should return telemetry metrics and judge coverage matrix', async () => {
      const res = await fetch(`${baseUrl}/api/analytics`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.stats);
      assert.ok(data.stats.totalSubmissions > 0);
      assert.ok(Array.isArray(data.matrix));
    });
  });

  describe('Teams API (/api/teams)', () => {
    let testTeamId;

    it('GET /api/teams should list all teams', async () => {
      const res = await fetch(`${baseUrl}/api/teams`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.teams));
    });

    it('POST /api/teams should create a new team with open roles', async () => {
      const teamPayload = {
        name: 'Quantum Hackers',
        track: 'track-core',
        lookingForMembers: true,
        openRoles: ['Frontend Engineer', 'ML Specialist']
      };

      const res = await fetch(`${baseUrl}/api/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamPayload)
      });

      assert.equal(res.status, 201);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.team.name, teamPayload.name);
      testTeamId = data.team.id;
    });

    it('POST /api/teams/:id/join should add a new member', async () => {
      assert.ok(testTeamId);
      const joinPayload = {
        userName: 'Taylor SwiftDev',
        userRole: 'Frontend Specialist',
        userEmail: 'taylor@dev.test'
      };

      const res = await fetch(`${baseUrl}/api/teams/${testTeamId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(joinPayload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      const joinedMember = data.team.members.find(m => m.name === joinPayload.userName);
      assert.ok(joinedMember, 'Member should be added to team');
    });
  });

  describe('Export API (/api/export)', () => {
    it('GET /api/export/csv should return CSV file header and content', async () => {
      const res = await fetch(`${baseUrl}/api/export/csv`);
      assert.equal(res.status, 200);
      assert.ok(res.headers.get('content-type').includes('text/csv'));
      const text = await res.text();
      assert.ok(text.startsWith('Rank,Title,Team,Track'));
    });

    it('GET /api/export/json should return full JSON database dump', async () => {
      const res = await fetch(`${baseUrl}/api/export/json`);
      assert.equal(res.status, 200);
      assert.ok(res.headers.get('content-type').includes('application/json'));
      const data = await res.json();
      assert.ok(data.config);
      assert.ok(data.submissions);
    });
  });
});
