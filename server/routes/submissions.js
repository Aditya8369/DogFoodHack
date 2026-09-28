import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET all submissions with filters
router.get('/', (req, res) => {
  const { track, search } = req.query;
  const data = db.get();
  let list = [...data.submissions];

  if (track && track !== 'all') {
    list = list.filter(s => s.track === track);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.teamName.toLowerCase().includes(q) ||
      (s.techStack && s.techStack.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Attach evaluation count to each
  const listWithStats = list.map(sub => {
    const evals = data.evaluations.filter(e => e.submissionId === sub.id);
    return {
      ...sub,
      evaluationCount: evals.length
    };
  });

  res.json({ success: true, submissions: listWithStats });
});

// GET single submission by ID
router.get('/:id', (req, res) => {
  const data = db.get();
  const sub = data.submissions.find(s => s.id === req.params.id);
  if (!sub) {
    return res.status(404).json({ success: false, error: 'Submission not found' });
  }

  const evals = data.evaluations.filter(e => e.submissionId === sub.id);
  res.json({
    success: true,
    submission: {
      ...sub,
      evaluations: evals
    }
  });
});

// POST new project submission
router.post('/', (req, res) => {
  const {
    title,
    tagline,
    description,
    track,
    techStack,
    repoUrl,
    demoUrl,
    videoUrl,
    logoUrl,
    coverUrl,
    teamName,
    teamId
  } = req.body;

  if (!title || !description || !track) {
    return res.status(400).json({ success: false, error: 'Title, description, and track are required.' });
  }

  const data = db.get();
  const newSubmission = {
    id: `sub-${Date.now()}`,
    teamId: teamId || `team-${Date.now()}`,
    teamName: teamName || 'Independent Builder',
    title,
    tagline: tagline || '',
    description,
    track,
    techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
    repoUrl: repoUrl || '',
    demoUrl: demoUrl || '',
    videoUrl: videoUrl || '',
    logoUrl: logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    coverUrl: coverUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    pairwiseScore: 1200,
    upvotes: 1
  };

  data.submissions.unshift(newSubmission);
  
  data.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'NEW_SUBMISSION',
    detail: `Project "${title}" submitted by ${newSubmission.teamName}`,
    timestamp: new Date().toISOString()
  });

  db.save(data);

  res.status(201).json({ success: true, submission: newSubmission });
});

// POST upvote a project
router.post('/:id/upvote', (req, res) => {
  const data = db.get();
  const sub = data.submissions.find(s => s.id === req.params.id);
  if (!sub) {
    return res.status(404).json({ success: false, error: 'Submission not found' });
  }

  sub.upvotes = (sub.upvotes || 0) + 1;
  db.save(data);

  res.json({ success: true, upvotes: sub.upvotes });
});

export default router;
