import express from 'express';
import { db } from '../db.js';
import { normalizeScoresAcrossJudges } from '../judgingAlgorithm.js';

const router = express.Router();

// GET normalized leaderboard and track winners
router.get('/', (req, res) => {
  const data = db.get();
  const criteria = data.config.criteria;
  const submissions = data.submissions;
  const evaluations = data.evaluations;

  // Run normalization engine
  const rankings = normalizeScoresAcrossJudges(evaluations, submissions, criteria);

  // Group by Track
  const trackStandings = {};
  data.config.tracks.forEach(tr => {
    trackStandings[tr.id] = {
      track: tr,
      projects: rankings.filter(r => r.track === tr.id)
    };
  });

  // Calculate top pairwise projects
  const pairwiseStandings = [...rankings].sort((a, b) => b.pairwiseScore - a.pairwiseScore);

  res.json({
    success: true,
    status: data.config.status,
    isEmbargoed: data.config.status === 'JUDGING',
    rankings,
    trackStandings,
    pairwiseStandings,
    totalEvaluations: evaluations.length,
    totalDuels: data.pairwiseDuels.length
  });
});

export default router;
