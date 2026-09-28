import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../server/db.js';

describe('Database Storage Engine (server/db.js)', () => {
  beforeEach(() => {
    // Reset to clean seed data before each test
    db.reset();
  });

  it('should return initial dataset on db.get()', () => {
    const data = db.get();
    assert.ok(data, 'Data object must exist');
    assert.ok(data.config, 'Data must have config');
    assert.ok(Array.isArray(data.teams), 'Teams must be an array');
    assert.ok(Array.isArray(data.submissions), 'Submissions must be an array');
    assert.ok(Array.isArray(data.evaluations), 'Evaluations must be an array');
    assert.ok(Array.isArray(data.pairwiseDuels), 'PairwiseDuels must be an array');
    assert.ok(Array.isArray(data.schedule), 'Schedule must be an array');
    assert.ok(Array.isArray(data.announcements), 'Announcements must be an array');
    assert.ok(Array.isArray(data.mentorTickets), 'MentorTickets must be an array');
    assert.ok(Array.isArray(data.hackerSeekers), 'HackerSeekers must be an array');
    assert.ok(Array.isArray(data.faqs), 'Faqs must be an array');
    assert.ok(Array.isArray(data.auditLogs), 'AuditLogs must be an array');
  });

  it('should persist updates correctly with db.save()', () => {
    const data = db.get();
    const initialSubCount = data.submissions.length;

    const testProject = {
      id: `test-sub-${Date.now()}`,
      title: 'Automated Test Project',
      tagline: 'Built by test suite',
      description: 'Test description',
      track: 'track-core',
      techStack: ['Node.js', 'Express'],
      repoUrl: 'https://github.com/test/repo',
      demoUrl: 'https://test.demo',
      teamName: 'QualityAssurance Squad',
      pairwiseScore: 1200,
      upvotes: 0
    };

    data.submissions.unshift(testProject);
    db.save(data);

    const reloadedData = db.get();
    assert.equal(reloadedData.submissions.length, initialSubCount + 1);
    assert.equal(reloadedData.submissions[0].id, testProject.id);
    assert.equal(reloadedData.submissions[0].title, testProject.title);
  });

  it('should restore clean seed state on db.reset()', () => {
    const data = db.get();
    data.submissions = []; // Clear submissions
    db.save(data);

    assert.equal(db.get().submissions.length, 0);

    // Call reset
    const fresh = db.reset();
    assert.ok(fresh.submissions.length > 0, 'Reset must restore default submissions');
    assert.ok(db.get().submissions.length > 0);
  });

  it('should record and retain audit logs', () => {
    const data = db.get();
    const newLog = {
      id: `log-test-${Date.now()}`,
      action: 'SYSTEM_TEST_RUN',
      detail: 'Unit tests verified DB engine',
      timestamp: new Date().toISOString()
    };

    data.auditLogs.unshift(newLog);
    db.save(data);

    const refreshed = db.get();
    assert.equal(refreshed.auditLogs[0].id, newLog.id);
    assert.equal(refreshed.auditLogs[0].action, 'SYSTEM_TEST_RUN');
  });
});
