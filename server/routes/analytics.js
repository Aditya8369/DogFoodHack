import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET hackathon analytics, health, and judge progress matrix
router.get('/', (req, res) => {
  const data = db.get();
  
  const totalSubmissions = data.submissions.length;
  const totalJudges = data.config.judges.length;
  const totalEvals = data.evaluations.length;
  const maxPossibleEvals = totalSubmissions * totalJudges;
  const overallJudgingProgress = maxPossibleEvals > 0 ? Math.round((totalEvals / maxPossibleEvals) * 100) : 0;

  // Track breakdown
  const trackDistribution = data.config.tracks.map(t => ({
    id: t.id,
    name: t.name,
    count: data.submissions.filter(s => s.track === t.id).length
  }));

  // Judge coverage matrix: for each submission, which judges evaluated it
  const matrix = data.submissions.map(s => {
    const judgeReviews = {};
    data.config.judges.forEach(j => {
      const ev = data.evaluations.find(e => e.submissionId === s.id && e.judgeId === j.id);
      judgeReviews[j.id] = ev ? { scored: true, id: ev.id } : { scored: false };
    });

    return {
      submissionId: s.id,
      title: s.title,
      teamName: s.teamName,
      reviews: judgeReviews
    };
  });

  res.json({
    success: true,
    stats: {
      totalSubmissions,
      totalTeams: data.teams.length,
      totalJudges,
      totalEvaluations: totalEvals,
      totalDuels: data.pairwiseDuels.length,
      overallJudgingProgress,
      trackDistribution,
      auditLogs: data.auditLogs.slice(0, 10)
    },
    matrix
  });
});

export default router;
