import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// GET all teams
router.get('/', (req, res) => {
  const data = db.get();
  res.json({ success: true, teams: data.teams });
});

// POST create a new team
router.post('/', (req, res) => {
  const { name, track, members, lookingForMembers, openRoles } = req.body;
  if (!name || !track) {
    return res.status(400).json({ success: false, error: 'Team name and track are required.' });
  }

  const data = db.get();
  const newTeam = {
    id: `team-${Date.now()}`,
    name,
    track,
    members: members && members.length ? members : [{ name: 'Team Lead (You)', role: 'Lead Architect', email: 'leader@dogfood.dev' }],
    lookingForMembers: Boolean(lookingForMembers),
    openRoles: openRoles || []
  };

  data.teams.push(newTeam);
  db.save(data);

  res.status(201).json({ success: true, team: newTeam });
});

// POST join a team / request
router.post('/:id/join', (req, res) => {
  const { userName, userRole, userEmail } = req.body;
  const data = db.get();
  const team = data.teams.find(t => t.id === req.params.id);

  if (!team) {
    return res.status(404).json({ success: false, error: 'Team not found.' });
  }

  const newMember = {
    name: userName || 'New Hacker',
    role: userRole || 'Fullstack Contributor',
    email: userEmail || 'hacker@dogfood.dev'
  };

  team.members.push(newMember);
  db.save(data);

  res.json({ success: true, team, message: `Successfully joined ${team.name}!` });
});

export default router;
