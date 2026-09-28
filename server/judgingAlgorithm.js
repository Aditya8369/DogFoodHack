/**
 * Dogfood 2026 - Judging & Normalization Algorithm Engine
 * 
 * Supports:
 * 1. Weighted Rubric-Based Scoring
 * 2. Z-Score Judge Calibration & Normalization (Prevents harsh/lenient judge skew)
 * 3. Bradley-Terry / Elo Pairwise Comparative Ranking
 * 4. Composite Hybrid Rating
 */

export function calculateRubricScore(scores, criteria) {
  if (!scores || !Array.isArray(scores) || scores.length === 0) return 0;
  
  // Calculate weighted average
  let totalWeight = 0;
  let weightedSum = 0;

  criteria.forEach(c => {
    const scoreObj = scores.find(s => s.criterionId === c.id);
    const val = scoreObj ? Number(scoreObj.score) : 0;
    const weight = Number(c.weight) || 1;
    weightedSum += val * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(2)) : 0;
}

/**
 * Normalizes scores across judges using Z-score standardization.
 * Z = (Score - JudgeMean) / JudgeStdDev
 * Re-mapped to standard 0-100 scale: NormalizedScore = 50 + (Z * 15)
 */
export function normalizeScoresAcrossJudges(evaluations, submissions, criteria) {
  // 1. Group raw scores by judge
  const judgeStats = {};
  
  evaluations.forEach(ev => {
    if (!judgeStats[ev.judgeId]) {
      judgeStats[ev.judgeId] = { rawScores: [] };
    }
    const score = calculateRubricScore(ev.scores, criteria);
    judgeStats[ev.judgeId].rawScores.push(score);
  });

  // 2. Compute Mean & StdDev per judge
  Object.keys(judgeStats).forEach(jId => {
    const scores = judgeStats[jId].rawScores;
    const n = scores.length;
    if (n === 0) {
      judgeStats[jId].mean = 0;
      judgeStats[jId].stdDev = 1;
      return;
    }
    const mean = scores.reduce((a, b) => a + b, 0) / n;
    const variance = scores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const stdDev = Math.sqrt(variance) || 1.5; // fallback stdDev to prevent div by zero
    judgeStats[jId].mean = mean;
    judgeStats[jId].stdDev = stdDev;
  });

  // 3. Score each submission with raw and normalized average
  const submissionRankings = submissions.map(sub => {
    const subEvals = evaluations.filter(e => e.submissionId === sub.id);
    
    if (subEvals.length === 0) {
      return {
        submissionId: sub.id,
        title: sub.title,
        track: sub.track,
        teamName: sub.teamName,
        evaluationCount: 0,
        rawAverage: 0,
        normalizedScore: 0,
        pairwiseScore: sub.pairwiseScore || 1200,
        finalScore: 0,
        rank: 0,
        evaluations: []
      };
    }

    let rawTotal = 0;
    let normalizedTotal = 0;

    const detailedEvals = subEvals.map(ev => {
      const raw = calculateRubricScore(ev.scores, criteria);
      const jStat = judgeStats[ev.judgeId] || { mean: raw, stdDev: 1.5 };
      const zScore = (raw - jStat.mean) / (jStat.stdDev || 1);
      // Normalized mapping into 0-100 scale
      const normalized = Math.min(100, Math.max(0, 50 + (zScore * 16)));
      
      rawTotal += raw;
      normalizedTotal += normalized;

      return {
        judgeId: ev.judgeId,
        judgeName: ev.judgeName,
        rawScore: raw,
        normalizedScore: Number(normalized.toFixed(2)),
        feedback: ev.feedback,
        scores: ev.scores
      };
    });

    const rawAverage = Number((rawTotal / subEvals.length).toFixed(2));
    const normalizedAvg = Number((normalizedTotal / subEvals.length).toFixed(2));
    
    // Scale Elo (1200 default) to a 0-100 baseline: 1200 -> 75
    const eloRatio = (sub.pairwiseScore || 1200) / 16;
    
    // Hybrid composite score: 70% normalized rubric + 30% pairwise Elo
    const finalScore = Number(((normalizedAvg * 0.7) + (eloRatio * 0.3)).toFixed(2));

    return {
      submissionId: sub.id,
      title: sub.title,
      tagline: sub.tagline,
      track: sub.track,
      teamName: sub.teamName,
      logoUrl: sub.logoUrl,
      repoUrl: sub.repoUrl,
      demoUrl: sub.demoUrl,
      evaluationCount: subEvals.length,
      rawAverage,
      normalizedScore: normalizedAvg,
      pairwiseScore: sub.pairwiseScore || 1200,
      finalScore,
      evaluations: detailedEvals
    };
  });

  // Sort descending by finalScore
  submissionRankings.sort((a, b) => b.finalScore - a.finalScore);

  // Assign ranks
  submissionRankings.forEach((item, index) => {
    item.rank = index + 1;
  });

  return submissionRankings;
}

/**
 * Updates Pairwise Elo rating after a head-to-head match
 * K-factor = 32
 */
export function updateEloRatings(winnerScore, loserScore, isDraw = false, k = 32) {
  const expectedA = 1 / (1 + Math.pow(10, (loserScore - winnerScore) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (winnerScore - loserScore) / 400));

  const actualA = isDraw ? 0.5 : 1;
  const actualB = isDraw ? 0.5 : 0;

  const newWinnerScore = Math.round(winnerScore + k * (actualA - expectedA));
  const newLoserScore = Math.round(loserScore + k * (actualB - expectedB));

  return {
    winnerNewScore: newWinnerScore,
    loserNewScore: newLoserScore
  };
}
