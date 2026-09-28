import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let dbCache = null;

export function loadDatabase() {
  if (dbCache) return dbCache;

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbCache = JSON.parse(raw);
      // Ensure new fields exist even if reading older db.json
      let modified = false;
      if (!dbCache.schedule) { dbCache.schedule = [...initialSchedule]; modified = true; }
      if (!dbCache.announcements) { dbCache.announcements = [...initialAnnouncements]; modified = true; }
      if (!dbCache.mentorTickets) { dbCache.mentorTickets = [...initialMentorTickets]; modified = true; }
      if (!dbCache.hackerSeekers) { dbCache.hackerSeekers = [...initialHackerSeekers]; modified = true; }
      if (!dbCache.faqs) { dbCache.faqs = [...initialFaqs]; modified = true; }
      if (modified) saveDatabase(dbCache);
      return dbCache;
    } catch (err) {
      console.error('[DB] Error loading db.json, reseeding...', err);
    }
  }

  return seedDatabase();
}

export function saveDatabase(data) {
  dbCache = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Error writing to db.json:', err);
  }
}

export function seedDatabase() {
  const data = {
    config: { ...initialHackathonConfig },
    teams: [...initialTeams],
    submissions: [...initialSubmissions],
    evaluations: [...initialEvaluations],
    pairwiseDuels: [...initialPairwiseDuels],
    schedule: [...initialSchedule],
    announcements: [...initialAnnouncements],
    mentorTickets: [...initialMentorTickets],
    hackerSeekers: [...initialHackerSeekers],
    faqs: [...initialFaqs],
    auditLogs: [
      {
        id: "log-1",
        action: "HACKATHON_INITIALIZED",
        detail: "Dogfood 2026 Hackathon Engine initialized in Docker container.",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "log-2",
        action: "PHASE_TRANSITION",
        detail: "Transitioned from SUBMISSION to JUDGING stage.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ]
  };

  saveDatabase(data);
  console.log('[DB] Seeded database with Dogfood 2026 data at', DB_FILE);
  return data;
}

export const db = {
  get: () => loadDatabase(),
  save: (data) => saveDatabase(data),
  reset: () => seedDatabase()
};
