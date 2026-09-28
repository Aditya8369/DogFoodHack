import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRubricScore,
  normalizeScoresAcrossJudges,
  updateEloRatings
} from '../server/judgingAlgorithm.js';

describe('Judging Algorithm Engine', () => {
  // Sample criteria for testing
  const sampleCriteria = [
    { id: 'crit-innov', name: 'Innovation', weight: 25 },
    { id: 'crit-tech', name: 'Technical Execution', weight: 35 },
    { id: 'crit-ux', name: 'UI/UX', weight: 20 },
    { id: 'crit-host', name: 'Self-Hostability', weight: 20 }
  ];

  describe('calculateRubricScore', () => {
    it('should return 0 when scores array is missing or empty', () => {
      assert.equal(calculateRubricScore([], sampleCriteria), 0);
      assert.equal(calculateRubricScore(null, sampleCriteria), 0);
      assert.equal(calculateRubricScore(undefined, sampleCriteria), 0);
    });

    it('should compute weighted average correctly for all criteria', () => {
      // 9*25 + 8*35 + 10*20 + 7*20 = 225 + 280 + 200 + 140 = 845 / 100 = 8.45
      const scores = [
        { criterionId: 'crit-innov', score: 9 },
        { criterionId: 'crit-tech', score: 8 },
        { criterionId: 'crit-ux', score: 10 },
        { criterionId: 'crit-host', score: 7 }
      ];

      const result = calculateRubricScore(scores, sampleCriteria);
      assert.equal(result, 8.45);
    });

    it('should handle partial scores by counting missing criteria as 0', () => {
      // Only 1 criterion evaluated: 10 * 25 = 250 / 100 = 2.5
      const partialScores = [
        { criterionId: 'crit-innov', score: 10 }
      ];

      const result = calculateRubricScore(partialScores, sampleCriteria);
      assert.equal(result, 2.5);
    });

    it('should handle custom criteria weight configurations', () => {
      const customCriteria = [
        { id: 'c1', weight: 1 },
        { id: 'c2', weight: 3 }
      ];
      const scores = [
        { criterionId: 'c1', score: 4 },
        { criterionId: 'c2', score: 8 }
      ];
      // (4*1 + 8*3) / (1 + 3) = 28 / 4 = 7.00
      assert.equal(calculateRubricScore(scores, customCriteria), 7);
    });
  });

  describe('updateEloRatings (Bradley-Terry)', () => {
    it('should award points to winner and deduct equal points from loser when ratings are equal', () => {
      const initialScore = 1200;
      const { winnerNewScore, loserNewScore } = updateEloRatings(initialScore, initialScore, false, 32);

      // Expected win prob is 0.5. Change = 32 * (1 - 0.5) = +16 for winner, -16 for loser
      assert.equal(winnerNewScore, 1216);
      assert.equal(loserNewScore, 1184);
      assert.equal((winnerNewScore - initialScore), (initialScore - loserNewScore));
    });

    it('should grant a larger rating increase when an underdog defeats a favorite', () => {
      const underdogScore = 1000;
      const favoriteScore = 1400;

      // Underdog wins against favorite
      const upset = updateEloRatings(underdogScore, favoriteScore, false, 32);
      const upsetDelta = upset.winnerNewScore - underdogScore;

      // Expected favorite wins against underdog
      const expectedWin = updateEloRatings(favoriteScore, underdogScore, false, 32);
      const expectedDelta = expectedWin.winnerNewScore - favoriteScore;

      assert.ok(upsetDelta > expectedDelta, 'Upset delta must exceed expected win delta');
      assert.ok(upsetDelta > 25, 'Upset win should give substantial Elo boost');
    });

    it('should handle draw results with minimal rating drift when ratings are equal', () => {
      const score = 1200;
      const { winnerNewScore, loserNewScore } = updateEloRatings(score, score, true, 32);

      // In a draw between equals, expected is 0.5 and actual is 0.5 => 0 change
      assert.equal(winnerNewScore, 1200);
      assert.equal(loserNewScore, 1200);
    });

    it('should respect custom K-factors', () => {
      const score = 1200;
      const highK = updateEloRatings(score, score, false, 64);
      const lowK = updateEloRatings(score, score, false, 16);

      assert.equal(highK.winnerNewScore, 1232);
      assert.equal(lowK.winnerNewScore, 1208);
    });
  });

  describe('normalizeScoresAcrossJudges', () => {
    const testCriteria = [
      { id: 'crit-1', weight: 50 },
      { id: 'crit-2', weight: 50 }
    ];

    const testSubmissions = [
      { id: 'sub-alpha', title: 'Alpha Project', track: 'core', teamName: 'Team Alpha', pairwiseScore: 1200 },
      { id: 'sub-beta', title: 'Beta Project', track: 'core', teamName: 'Team Beta', pairwiseScore: 1200 },
      { id: 'sub-gamma', title: 'Gamma Project', track: 'ai', teamName: 'Team Gamma', pairwiseScore: 1200 }
    ];

    it('should handle submissions with no evaluations gracefully', () => {
      const rankings = normalizeScoresAcrossJudges([], testSubmissions, testCriteria);

      assert.equal(rankings.length, 3);
      rankings.forEach(r => {
        assert.equal(r.evaluationCount, 0);
        assert.equal(r.rawAverage, 0);
        assert.equal(r.normalizedScore, 0);
      });
    });

    it('should normalize scores to eliminate judge leniency / harshness bias', () => {
      // Judge 1 (Harsh): Gives 4.0 to Alpha, 6.0 to Beta (Mean = 5.0)
      // Judge 2 (Lenient): Gives 7.0 to Alpha, 9.0 to Beta (Mean = 8.0)
      const evaluations = [
        // Judge 1 evaluations
        {
          id: 'ev-1',
          judgeId: 'judge-harsh',
          judgeName: 'Harsh Judge',
          submissionId: 'sub-alpha',
          scores: [{ criterionId: 'crit-1', score: 4 }, { criterionId: 'crit-2', score: 4 }],
          feedback: 'Strict review'
        },
        {
          id: 'ev-2',
          judgeId: 'judge-harsh',
          judgeName: 'Harsh Judge',
          submissionId: 'sub-beta',
          scores: [{ criterionId: 'crit-1', score: 6 }, { criterionId: 'crit-2', score: 6 }],
          feedback: 'Better'
        },
        // Judge 2 evaluations
        {
          id: 'ev-3',
          judgeId: 'judge-lenient',
          judgeName: 'Lenient Judge',
          submissionId: 'sub-alpha',
          scores: [{ criterionId: 'crit-1', score: 7 }, { criterionId: 'crit-2', score: 7 }],
          feedback: 'Nice'
        },
        {
          id: 'ev-4',
          judgeId: 'judge-lenient',
          judgeName: 'Lenient Judge',
          submissionId: 'sub-beta',
          scores: [{ criterionId: 'crit-1', score: 9 }, { criterionId: 'crit-2', score: 9 }],
          feedback: 'Superb'
        }
      ];

      const rankings = normalizeScoresAcrossJudges(evaluations, testSubmissions, testCriteria);

      // Beta should rank higher than Alpha because both judges rated Beta higher than their individual mean
      const alphaRank = rankings.find(r => r.submissionId === 'sub-alpha');
      const betaRank = rankings.find(r => r.submissionId === 'sub-beta');

      assert.ok(betaRank.finalScore > alphaRank.finalScore, 'Beta must score higher than Alpha');
      assert.equal(betaRank.rank, 1, 'Beta should be ranked #1');
      assert.equal(alphaRank.rank, 2, 'Alpha should be ranked #2');

      // Normalized score must fall within valid bounds [0, 100]
      assert.ok(alphaRank.normalizedScore >= 0 && alphaRank.normalizedScore <= 100);
      assert.ok(betaRank.normalizedScore >= 0 && betaRank.normalizedScore <= 100);
    });

    it('should compute blended composite score combining normalized rubric and pairwise Elo', () => {
      // Sub A: High rubric (10/10), default Elo 1200
      // Sub B: Lower rubric (6/10), but massive Elo 1600 from duels
      const evals = [
        {
          id: 'ev-1',
          judgeId: 'judge-1',
          submissionId: 'sub-alpha',
          scores: [{ criterionId: 'crit-1', score: 10 }, { criterionId: 'crit-2', score: 10 }]
        },
        {
          id: 'ev-2',
          judgeId: 'judge-1',
          submissionId: 'sub-beta',
          scores: [{ criterionId: 'crit-1', score: 6 }, { criterionId: 'crit-2', score: 6 }]
        }
      ];

      const customSubs = [
        { id: 'sub-alpha', title: 'Alpha', track: 'core', pairwiseScore: 1200 },
        { id: 'sub-beta', title: 'Beta', track: 'core', pairwiseScore: 1600 }
      ];

      const rankings = normalizeScoresAcrossJudges(evals, customSubs, testCriteria);
      const alpha = rankings.find(r => r.submissionId === 'sub-alpha');
      const beta = rankings.find(r => r.submissionId === 'sub-beta');

      // Verify that finalScore is calculated using: (normalizedAvg * 0.7) + (eloRatio * 0.3)
      const expectedAlphaEloRatio = 1200 / 16; // 75
      const expectedBetaEloRatio = 1600 / 16;  // 100

      const calculatedAlphaFinal = Number(((alpha.normalizedScore * 0.7) + (expectedAlphaEloRatio * 0.3)).toFixed(2));
      const calculatedBetaFinal = Number(((beta.normalizedScore * 0.7) + (expectedBetaEloRatio * 0.3)).toFixed(2));

      assert.equal(alpha.finalScore, calculatedAlphaFinal);
      assert.equal(beta.finalScore, calculatedBetaFinal);
    });

    it('should assign descending ranks (1, 2, 3...) sequentially without gaps', () => {
      const evals = [
        { id: 'e1', judgeId: 'j1', submissionId: 'sub-alpha', scores: [{ criterionId: 'crit-1', score: 9 }, { criterionId: 'crit-2', score: 9 }] },
        { id: 'e2', judgeId: 'j1', submissionId: 'sub-beta', scores: [{ criterionId: 'crit-1', score: 7 }, { criterionId: 'crit-2', score: 7 }] },
        { id: 'e3', judgeId: 'j1', submissionId: 'sub-gamma', scores: [{ criterionId: 'crit-1', score: 5 }, { criterionId: 'crit-2', score: 5 }] }
      ];

      const rankings = normalizeScoresAcrossJudges(evals, testSubmissions, testCriteria);

      assert.equal(rankings[0].rank, 1);
      assert.equal(rankings[1].rank, 2);
      assert.equal(rankings[2].rank, 3);
      assert.ok(rankings[0].finalScore >= rankings[1].finalScore);
      assert.ok(rankings[1].finalScore >= rankings[2].finalScore);
    });
  });
});
