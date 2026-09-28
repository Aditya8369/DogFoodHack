import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET hackathon config, status, tracks, criteria, judges, schedule, announcements, etc.
router.get('/', (req, res) => {
  const data = db.get();
  res.json({
    success: true,
    config: data.config,
    tracks: data.config.tracks,
    criteria: data.config.criteria,
    judges: data.config.judges,
    organizers: data.config.organizers,
    schedule: data.schedule || [],
    announcements: data.announcements || [],
    mentorTickets: data.mentorTickets || [],
    hackerSeekers: data.hackerSeekers || [],
    faqs: data.faqs || [],
    submissionCount: data.submissions.length,
    teamCount: data.teams.length,
    evaluationCount: data.evaluations.length
  });
});

// POST announcement (Organizer action)
router.post('/announcements', (req, res) => {
  const { title, content, tag, severity, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, error: 'Title and content are required' });
  }

  const data = db.get();
  const newAnn = {
    id: `ann-${Date.now()}`,
    title,
    content,
    tag: tag || 'INFO',
    severity: severity || 'INFO',
    timestamp: new Date().toISOString(),
    author: author || 'Organizer Ops'
  };

  data.announcements = data.announcements || [];
  data.announcements.unshift(newAnn);

  data.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'ANNOUNCEMENT_BROADCAST',
    detail: `Broadcast: "${title}"`,
    timestamp: new Date().toISOString()
  });

  db.save(data);
  res.json({ success: true, announcement: newAnn, announcements: data.announcements });
});

// POST mentor ticket (Participant action)
router.post('/mentorship', (req, res) => {
  const { teamName, topic, category, notes } = req.body;
  if (!teamName || !topic) {
    return res.status(400).json({ success: false, error: 'Team name and topic are required' });
  }

  const data = db.get();
  const newTicket = {
    id: `ticket-${Date.now()}`,
    teamName,
    topic,
    category: category || 'General Help',
    status: 'OPEN',
    claimedBy: null,
    createdAt: new Date().toISOString(),
    notes: notes || ''
  };

  data.mentorTickets = data.mentorTickets || [];
  data.mentorTickets.unshift(newTicket);

  db.save(data);
  res.json({ success: true, ticket: newTicket, mentorTickets: data.mentorTickets });
});

// PATCH mentor ticket (Claim / Resolve action)
router.patch('/mentorship/:id', (req, res) => {
  const { id } = req.params;
  const { status, claimedBy, notes } = req.body;

  const data = db.get();
  data.mentorTickets = data.mentorTickets || [];
  const ticket = data.mentorTickets.find(t => t.id === id);

  if (!ticket) {
    return res.status(404).json({ success: false, error: 'Ticket not found' });
  }

  if (status) ticket.status = status;
  if (claimedBy !== undefined) ticket.claimedBy = claimedBy;
  if (notes) ticket.notes = notes;
  if (status === 'RESOLVED') ticket.resolvedAt = new Date().toISOString();

  db.save(data);
  res.json({ success: true, ticket, mentorTickets: data.mentorTickets });
});

// POST hacker seeker profile (Participant action)
router.post('/seekers', (req, res) => {
  const { name, role, skills, timezone, github, bio } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, error: 'Name and role are required' });
  }

  const data = db.get();
  const newSeeker = {
    id: `seeker-${Date.now()}`,
    name,
    role,
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : ['Fullstack']),
    timezone: timezone || 'UTC',
    github: github || '',
    bio: bio || '',
    status: 'LOOKING'
  };

  data.hackerSeekers = data.hackerSeekers || [];
  data.hackerSeekers.unshift(newSeeker);

  db.save(data);
  res.json({ success: true, seeker: newSeeker, hackerSeekers: data.hackerSeekers });
});

// POST ask FAQ question
router.post('/faqs/ask', (req, res) => {
  const { question, askedBy } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, error: 'Question is required' });
  }

  const data = db.get();
  const newFaq = {
    id: `faq-${Date.now()}`,
    category: 'Community Questions',
    question,
    answer: 'Thank you for your question! An organizer will review and post an answer shortly during the live AMA session.',
    askedBy: askedBy || 'Participant'
  };

  data.faqs = data.faqs || [];
  data.faqs.push(newFaq);

  db.save(data);
  res.json({ success: true, message: 'Question submitted to organizers!', faqs: data.faqs });
});

// PATCH hackathon phase / configuration (Organizer action)
router.patch('/phase', (req, res) => {
  const { status, currentPhaseEnd } = req.body;
  const validPhases = ['REGISTRATION', 'TEAM_BUILDING', 'SUBMISSION', 'JUDGING', 'RESULTS'];

  if (!status || !validPhases.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid hackathon phase.' });
  }

  const data = db.get();
  data.config.status = status;
  if (currentPhaseEnd) {
    data.config.currentPhaseEnd = currentPhaseEnd;
  }

  data.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'PHASE_UPDATED',
    detail: `Phase changed to ${status}`,
    timestamp: new Date().toISOString()
  });

  db.save(data);

  res.json({
    success: true,
    message: `Hackathon phase successfully switched to ${status}`,
    config: data.config
  });
});

// POST reset & reseed database (Organizer action)
router.post('/reset', (req, res) => {
  const fresh = db.reset();
  res.json({
    success: true,
    message: 'Database reset to default Dogfood 2026 state.',
    config: fresh.config
  });
});

export default router;
