import express from 'express';
import { db } from '../db.js';
import { updateEloRatings } from '../judgingAlgorithm.js';

const router = express.Router();

// GET judging overview: evaluations by judgeId or all
router.get('/', (req, res) => {
  const { judgeId } = req.query;
  const data = db.get();

  let evals = data.evaluations;
  if (judgeId) {
    evals = evals.filter(e => e.judgeId === judgeId);
  }

  // Judge progress calculation
  const totalSubmissions = data.submissions.length;
  const judgesProgress = data.config.judges.map(j => {
    const judgedCount = data.evaluations.filter(e => e.judgeId === j.id).length;
    const duelsCount = data.pairwiseDuels.filter(d => d.judgeId === j.id).length;
    return {
      judgeId: j.id,
      name: j.name,
      avatar: j.avatar,
      title: j.title,
      rubricsCompleted: judgedCount,
      totalSubmissions,
      progressPercent: totalSubmissions > 0 ? Math.round((judgedCount / totalSubmissions) * 100) : 0,
      duelsCompleted: duelsCount
    };
  });

  res.json({
    success: true,
    evaluations: evals,
    pairwiseDuels: data.pairwiseDuels,
    judgesProgress
  });
});

// POST submit a rubric evaluation
router.post('/rubric', (req, res) => {
  const { judgeId, judgeName, submissionId, scores, feedback } = req.body;

  if (!judgeId || !submissionId || !scores || !Array.isArray(scores)) {
    return res.status(400).json({ success: false, error: 'judgeId, submissionId, and scores array are required.' });
  }

  const data = db.get();
  
  // Check if evaluation already exists from this judge for this submission
  const existingIdx = data.evaluations.findIndex(e => e.judgeId === judgeId && e.submissionId === submissionId);
  const evaluationObj = {
    id: existingIdx >= 0 ? data.evaluations[existingIdx].id : `eval-${Date.now()}`,
    judgeId,
    judgeName: judgeName || 'Judge',
    submissionId,
    scores,
    feedback: feedback || '',
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    data.evaluations[existingIdx] = evaluationObj;
  } else {
    data.evaluations.push(evaluationObj);
  }

  data.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'RUBRIC_EVALUATION',
    detail: `${evaluationObj.judgeName} scored submission #${submissionId}`,
    timestamp: new Date().toISOString()
  });

  db.save(data);

  res.json({
    success: true,
    message: 'Rubric evaluation recorded successfully.',
    evaluation: evaluationObj
  });
});

// GET next pairwise match for a judge
router.get('/pairwise/next', (req, res) => {
  const { judgeId } = req.query;
  const data = db.get();

  if (data.submissions.length < 2) {
    return res.status(400).json({ success: false, error: 'At least 2 submissions required for pairwise duels.' });
  }

  // Pick two random submissions (preferably from same track or closest Elo)
  const submissions = [...data.submissions].sort(() => Math.random() - 0.5);
  const subA = submissions[0];
  const subB = submissions[1];

  res.json({
    success: true,
    match: {
      subA,
      subB
    }
  });
});

// POST submit pairwise duel vote
router.post('/pairwise/vote', (req, res) => {
  const { judgeId, judgeName, subAId, subBId, winnerId } = req.body;

  if (!judgeId || !subAId || !subBId || !winnerId) {
    return res.status(400).json({ success: false, error: 'Missing duel parameters.' });
  }

  const data = db.get();
  const subA = data.submissions.find(s => s.id === subAId);
  const subB = data.submissions.find(s => s.id === subBId);

  if (!subA || !subB) {
    return res.status(404).json({ success: false, error: 'Submissions not found for duel.' });
  }

  // Calculate new Elo scores
  const aScore = subA.pairwiseScore || 1200;
  const bScore = subB.pairwiseScore || 1200;
  const winnerIsA = winnerId === subAId;

  const { winnerNewScore, loserNewScore } = updateEloRatings(
    winnerIsA ? aScore : bScore,
    winnerIsA ? bScore : aScore
  );

  if (winnerIsA) {
    subA.pairwiseScore = winnerNewScore;
    subB.pairwiseScore = loserNewScore;
  } else {
    subB.pairwiseScore = winnerNewScore;
    subA.pairwiseScore = loserNewScore;
  }

  const duelRecord = {
    id: `duel-${Date.now()}`,
    judgeId,
    judgeName: judgeName || 'Judge',
    subAId,
    subBId,
    winnerId,
    timestamp: new Date().toISOString()
  };

  data.pairwiseDuels.unshift(duelRecord);
  
  data.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'PAIRWISE_DUEL',
    detail: `${duelRecord.judgeName} voted in duel: Winner "${winnerIsA ? subA.title : subB.title}"`,
    timestamp: new Date().toISOString()
  });

  db.save(data);

  res.json({
    success: true,
    message: 'Pairwise duel recorded and Elo ratings recalculated.',
    subA: { id: subA.id, pairwiseScore: subA.pairwiseScore },
    subB: { id: subB.id, pairwiseScore: subB.pairwiseScore }
  });
});

export default router;
