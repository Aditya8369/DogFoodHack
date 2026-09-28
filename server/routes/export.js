import express from 'express';
import { db } from '../db.js';
import { normalizeScoresAcrossJudges } from '../judgingAlgorithm.js';

const router = express.Router();

// Export full hackathon snapshot as JSON
router.get('/json', (req, res) => {
  const data = db.get();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="dogfood-2026-export.json"');
  res.send(JSON.stringify(data, null, 2));
});

// Export rankings & scorecards as CSV
router.get('/csv', (req, res) => {
  const data = db.get();
  const rankings = normalizeScoresAcrossJudges(data.evaluations, data.submissions, data.config.criteria);

  let csv = 'Rank,Title,Team,Track,Normalized Score,Raw Average,Pairwise Elo,Evaluations Count,Repo URL,Demo URL\n';
  
  rankings.forEach(r => {
    const escapedTitle = `"${(r.title || '').replace(/"/g, '""')}"`;
    const escapedTeam = `"${(r.teamName || '').replace(/"/g, '""')}"`;
    csv += `${r.rank},${escapedTitle},${escapedTeam},${r.track},${r.normalizedScore},${r.rawAverage},${r.pairwiseScore},${r.evaluationCount},${r.repoUrl},${r.demoUrl}\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="dogfood-2026-leaderboard.csv"');
  res.send(csv);
});

export default router;
