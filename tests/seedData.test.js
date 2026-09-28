import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  initialHackathonConfig,
  initialTeams,
  initialSubmissions,
  initialEvaluations,
  initialPairwiseDuels,
  initialSchedule,
  initialAnnouncements,
  initialMentorTickets,
  initialHackerSeekers,
  initialFaqs
} from '../server/seedData.js';

describe('Seed Data Integrity and Business Constraints', () => {
  describe('Hackathon Configuration', () => {
    it('should have a valid ID, name, and total hours defined', () => {
      assert.ok(initialHackathonConfig.id, 'Config must have an id');
      assert.ok(initialHackathonConfig.name, 'Config must have a name');
      assert.equal(initialHackathonConfig.totalHours, 72, 'Hackathon must be configured for 72 hours');
    });

    it('should have a recognized lifecycle status', () => {
      const validStatuses = ['REGISTRATION', 'TEAM_BUILDING', 'SUBMISSION', 'JUDGING', 'RESULTS'];
      assert.ok(validStatuses.includes(initialHackathonConfig.status), `Status must be one of: ${validStatuses.join(', ')}`);
    });

    it('should configure criteria weights summing to 100%', () => {
      const criteria = initialHackathonConfig.criteria;
      assert.ok(Array.isArray(criteria) && criteria.length > 0, 'Criteria must be a non-empty array');

      const totalWeight = criteria.reduce((sum, c) => sum + (c.weight || 0), 0);
      assert.equal(totalWeight, 100, 'Sum of criteria weights must equal 100%');
    });

    it('should define tracks with valid prizes and icons', () => {
      const tracks = initialHackathonConfig.tracks;
      assert.ok(Array.isArray(tracks) && tracks.length >= 3, 'Must define at least 3 competition tracks');

      tracks.forEach(track => {
        assert.ok(track.id, 'Track must have an id');
        assert.ok(track.name, 'Track must have a name');
        assert.ok(track.prize, 'Track must specify prize amount');
      });
    });

    it('should define judges and organizers', () => {
      assert.ok(Array.isArray(initialHackathonConfig.judges) && initialHackathonConfig.judges.length > 0, 'Must have judges');
      assert.ok(Array.isArray(initialHackathonConfig.organizers) && initialHackathonConfig.organizers.length > 0, 'Must have organizers');
    });
  });

  describe('Submissions and Track Consistency', () => {
    const validTrackIds = initialHackathonConfig.tracks.map(t => t.id);

    it('should ensure all initial submissions belong to a registered track', () => {
      assert.ok(initialSubmissions.length > 0, 'Initial submissions must not be empty');

      initialSubmissions.forEach(sub => {
        assert.ok(validTrackIds.includes(sub.track), `Submission "${sub.title}" references invalid track "${sub.track}"`);
        assert.ok(sub.id, 'Submission must have an ID');
        assert.ok(sub.title, 'Submission must have a title');
        assert.ok(sub.description, 'Submission must have a description');
        assert.ok(Array.isArray(sub.techStack), 'techStack must be an array');
        assert.ok(typeof sub.pairwiseScore === 'number', 'pairwiseScore must be a number');
      });
    });

    it('should initialize pairwiseScore baseline to 1200 or above', () => {
      initialSubmissions.forEach(sub => {
        assert.ok(sub.pairwiseScore >= 1000 && sub.pairwiseScore <= 2000, `Pairwise score ${sub.pairwiseScore} out of expected range`);
      });
    });
  });

  describe('Evaluations and Judging Consistency', () => {
    const validSubIds = new Set(initialSubmissions.map(s => s.id));
    const validJudgeIds = new Set(initialHackathonConfig.judges.map(j => j.id));
    const validCriteriaIds = new Set(initialHackathonConfig.criteria.map(c => c.id));

    it('should ensure all evaluations link to valid submissions and judges', () => {
      initialEvaluations.forEach(ev => {
        assert.ok(validSubIds.has(ev.submissionId), `Evaluation references unknown submission ${ev.submissionId}`);
        assert.ok(validJudgeIds.has(ev.judgeId), `Evaluation references unknown judge ${ev.judgeId}`);
        assert.ok(Array.isArray(ev.scores), 'Evaluation scores must be an array');

        ev.scores.forEach(s => {
          assert.ok(validCriteriaIds.has(s.criterionId), `Evaluation references unknown criterion ${s.criterionId}`);
          assert.ok(s.score >= 1 && s.score <= 10, `Score ${s.score} must be between 1 and 10`);
        });
      });
    });

    it('should verify pairwise duels link to existing submissions', () => {
      initialPairwiseDuels.forEach(duel => {
        assert.ok(validSubIds.has(duel.subAId), `Duel subAId ${duel.subAId} not found in submissions`);
        assert.ok(validSubIds.has(duel.subBId), `Duel subBId ${duel.subBId} not found in submissions`);
        assert.ok(duel.winnerId === duel.subAId || duel.winnerId === duel.subBId, 'Winner must be subA or subB');
      });
    });
  });

  describe('Teams, Mentorship and Schedule', () => {
    it('should provide valid initial schedule items in chronological progression', () => {
      assert.ok(initialSchedule.length >= 4, 'Must provide full schedule milestones');
      initialSchedule.forEach(item => {
        assert.ok(item.id, 'Schedule item must have an id');
        assert.ok(item.title, 'Schedule item must have a title');
        assert.ok(item.time, 'Schedule item must specify a time description');
      });
    });

    it('should provide mentor tickets with valid status flags', () => {
      const allowedTicketStatuses = ['OPEN', 'CLAIMED', 'RESOLVED'];
      initialMentorTickets.forEach(ticket => {
        assert.ok(allowedTicketStatuses.includes(ticket.status), `Ticket status "${ticket.status}" is invalid`);
        assert.ok(ticket.teamName, 'Ticket must include teamName');
        assert.ok(ticket.topic, 'Ticket must include topic');
      });
    });

    it('should have initial announcements with severity tags', () => {
      const validSeverities = ['INFO', 'WARNING', 'CRITICAL'];
      initialAnnouncements.forEach(ann => {
        assert.ok(validSeverities.includes(ann.severity || 'INFO'), `Announcement severity "${ann.severity}" invalid`);
        assert.ok(ann.title, 'Announcement must have a title');
        assert.ok(ann.content, 'Announcement must have content');
      });
    });

    it('should provide community FAQs', () => {
      assert.ok(initialFaqs.length > 0, 'FAQ list must not be empty');
      initialFaqs.forEach(faq => {
        assert.ok(faq.question, 'FAQ item must contain question');
        assert.ok(faq.answer, 'FAQ item must contain answer');
      });
    });
  });
});
