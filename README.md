# ⚡ Dogfood 2026: Modern Self-Hostable Hackathon Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](package.json)
[![Acceptance Status](https://img.shields.io/badge/Acceptance-PASSED%20(22%2F22)-brightgreen)](acceptance-report.txt)
[![Docker Ready](https://img.shields.io/badge/Docker-Multi--Stage%20Build-blue?logo=docker)](Dockerfile)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B%20%7C%2020%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb?logo=react)](https://react.dev/)
[![CSS](https://img.shields.io/badge/Styling-Obsidian%20Cyber%20Vanilla%20CSS-ff007f)](client/src/index.css)
[![Zero External DB](https://img.shields.io/badge/Database-Zero--Config%20JSON-purple)](data/db.json)

> **"The Hackathon Built to Hack Hackathons"** — An open-source, fully self-hostable hackathon submission, judging, and live operations platform engineered for high-stakes 72-hour engineering challenges.

---

## 📑 Table of Contents

- [Overview & Philosophy](#-overview--philosophy)
- [🌟 Key Features](#-key-features)
  - [1. 72-Hour Hackathon Lifecycle Engine](#1-72-hour-hackathon-lifecycle-engine)
  - [2. Dual-Engine Scientific Judging System](#2-dual-engine-scientific-judging-system)
  - [3. 11 Dedicated Views & Interactive Modules](#3-11-dedicated-views--interactive-modules)
  - [4. Real-Time Telemetry & SSE Broadcast System](#4-real-time-telemetry--sse-broadcast-system)
  - [5. Role Switcher (Participant, Judge, Organizer)](#5-role-switcher-participant-judge-organizer)
  - [6. High-Polish Obsidian & Neon Cyber UX](#6-high-polish-obsidian--neon-cyber-ux)
  - [7. Auditability, Data Export & 1-Click Reset](#7-auditability-data-export--1-click-reset)
- [📐 System Architecture & Directory Layout](#-system-architecture--directory-layout)
- [🚀 Simple Setup Guides](#-simple-setup-guides)
  - [System Prerequisites](#system-prerequisites)
  - [Method 1: Run with Docker Compose (Recommended)](#method-1-run-with-docker-compose-recommended)
  - [Method 2: Run with Docker CLI](#method-2-run-with-docker-cli)
  - [Method 3: Local Node.js Development Setup](#method-3-local-nodejs-development-setup)
  - [Method 4: Production Node.js Build (Without Docker)](#method-4-production-nodejs-build-without-docker)
- [🧭 5-Minute Quick Tour: Testing All Roles](#-5-minute-quick-tour-testing-all-roles)
- [⚙️ Configuration & Environment Variables](#️-configuration--environment-variables)
- [📊 Scientific Judging Math Explained](#-scientific-judging-math-explained)
- [📡 Complete REST & Real-Time API Reference](#-complete-rest--real-time-api-reference)
- [🔧 Troubleshooting & Frequently Asked Questions](#-troubleshooting--frequently-asked-questions)
- [🤝 Contributing & License](#-contributing--license)

---

## 💡 Overview & Philosophy

Most hackathon platforms suffer from critical flaws:
1. **Harsh vs. Lenient Judge Bias**: A project scored by a critical judge gets artificially low marks compared to one scored by a generous judge.
2. **Heavy Cloud Lock-in**: Hard dependencies on external proprietary SaaS, complex multi-tier database setups, and third-party authentication services.
3. **Fragmented Tooling**: Organizers end up duct-taping Google Forms, spreadsheets, Discord bots, and Devpost.

**Dogfood 2026** solves this in a single self-contained application:
- **Zero external database needed**: Out-of-the-box persistent storage in atomic, thread-safe JSON/SQLite storage.
- **Fair evaluation**: Normalizes rubric variations using **Z-Score standardization** and combines it with **Bradley-Terry Pairwise Elo** duels.
- **One command to deploy**: Ships with a hardened multi-stage Docker build and Docker Compose orchestrator.

---

## 🌟 Key Features

### 1. 72-Hour Hackathon Lifecycle Engine
- **5-Stage State Machine**:
  - `REGISTRATION`: Hacker sign-up, team formation inquiries, and rules review.
  - `TEAM_BUILDING`: Skill-matching seeker profiles, team creation, and recruiting.
  - `SUBMISSION`: Project drafting, Markdown live editing, repo link validation, and video embeds.
  - `JUDGING`: Rubric evaluation forms, pairwise duel comparisons, and embargoed scorecards.
  - `RESULTS`: Final reveal of winners, track breakdowns, and certificate generation.
- **Synchronized Live Countdown HUD**: Real-time ticker counting down hours, minutes, and seconds until the current phase deadline.
- **Organizer Phase Controls**: 1-click stage switching that instantly synchronizes across all connected browser tabs.

### 2. Dual-Engine Scientific Judging System
- **Weighted Multi-Criterion Rubrics**:
  - 🌟 *Innovation & Originality* (25%)
  - 🛠️ *Technical Execution & Architecture* (30%)
  - 🎨 *UI/UX & Developer Flow* (20%)
  - 📦 *Self-Hostability & Completeness* (15%)
  - 📹 *Documentation & Demo Polish* (10%)
- **Z-Score Normalization Engine**: Eliminates grading curves between lenient and strict judges by computing each judge's mean ($\mu$) and standard deviation ($\sigma$):
  $$Z = \frac{x - \mu}{\sigma}$$
  Normalized scores are mapped into a balanced $0-100$ scale ($50 + 16Z$) to ensure statistical fairness.
- **Pairwise Comparison Duels**: Fast-paced head-to-head match arena powered by the **Bradley-Terry / Glicko-2 Elo rating system** ($K=32$) allowing judges to pick winners in seconds.
- **Hybrid Composite Leaderboard**: Computes composite final rankings using $70\%$ Normalized Rubric + $30\%$ Pairwise Elo score.

### 3. 11 Dedicated Views & Interactive Modules
The platform is organized into 11 purpose-built views accessible from the top navigation:

| View | Purpose & Functionality |
|---|---|
| **Overview** | Mission control dashboard with track banners, prize pool, live countdown, rules, and latest submissions. |
| **Schedule** | Interactive 72-hour schedule timeline featuring workshops, deadlines, AMA sessions, and judging milestones. |
| **Prize Pool** | Visual showcase of the $45,000 prize distribution, track sponsor bounties, and criteria requirements. |
| **Submissions** | Gallery of submitted projects with live search, track filtering, tech stack tags, and community upvoting. |
| **Judging Studio** | Evaluator hub showing assigned projects, judge progress bars, rubric scoring modals, and pairwise match queues. |
| **Leaderboard** | Real-time standings with embargo protection during judging, track winners, and raw vs. normalized comparisons. |
| **Teams & Matchmaker** | Team directory with open roles, direct join requests, and a "Hacker Seeker" skills directory. |
| **Resources** | Curated starter templates, Docker boilerplate links, API documentation, design assets, and submission checklists. |
| **Mentorship** | 24/7 live helpdesk ticket queue where hackers submit questions and mentors claim & resolve them in real time. |
| **FAQ & AMA** | Searchable knowledge base answering common questions with an interactive form to submit queries to organizers. |
| **Organizer Analytics** | Command center with judge coverage matrix, submission distribution charts, and live system audit logs. |

### 4. Real-Time Telemetry & SSE Broadcast System
- **Server-Sent Events (SSE)**: Native event stream (`/api/events`) pushing instant live updates to clients without polling.
- **Organizer Broadcast Alerts**: Push high-priority system announcements directly onto participants' screens with sound cues and severity tags (`INFO`, `WARNING`, `CRITICAL`).
- **Live Upvotes & Counters**: Submission upvotes and ticket statuses update dynamically.

### 5. Role Switcher (Participant, Judge, Organizer)
Switch roles instantly with a single click in the top navigation bar:
- **Participant Mode**: Submit projects, edit profiles, upvote submissions, post mentor help tickets, and find teammates.
- **Judge Mode**: Evaluate projects across multiple pre-configured judge profiles (e.g., Dr. Sarah Chen, Alex Rivera, Priya Sharma, Kaito Tanaka), launch pairwise comparisons, and track personal evaluation completion.
- **Organizer Mode**: Broadcast urgent notices, force-change hackathon phases, review real-time audit logs, reseed sample data, and export leaderboard reports.

### 6. High-Polish Obsidian & Neon Cyber UX
- Built with **100% Vanilla CSS** (no Tailwind dependency, maximum flexibility and speed).
- Glassmorphism surfaces, subtle CRT scanlines, and animated background grain.
- Responsive CSS Grid and Flexbox layouts designed for laptops, desktops, and mobile devices.
- Top running cyber-marquee news ticker displaying real-time platform bulletins.
- Accessible contrast ratios with glowing neon accents (`#00E5D0` Cyan, `#8b5cf6` Violet, `#ec4899` Magenta).

### 7. Auditability, Data Export & 1-Click Reset
- **CSV Leaderboard Export**: Download verified standings, rank orders, normalized scores, raw averages, and project links.
- **Full Database JSON Snapshot**: One-click download of the complete platform state (teams, submissions, criteria, evaluations, logs).
- **Audit Logging**: Every score, vote, submission, and stage change is timestamped and recorded in the audit trail.
- **Database Reset & Reseed**: Revert to the default Dogfood 2026 dataset at any time via the organizer panel or API.

---

## 📐 System Architecture & Directory Layout

```
dogfood-hackathon/
├── Dockerfile                  # Production multi-stage Alpine build
├── docker-compose.yml          # Container service definition & data volume
├── package.json                # Root server package manifest & scripts
├── .env.example                # Sample environment configuration
├── README.md                   # Complete documentation
│
├── client/                     # Frontend Application (React 18 + Vite)
│   ├── package.json            # Client dependencies & build scripts
│   ├── vite.config.js          # Vite config & API proxy to port 5000
│   ├── index.html              # HTML entrypoint & Google Fonts (Inter / JetBrains Mono)
│   └── src/
│       ├── main.jsx            # React root mount
│       ├── App.jsx             # Main application layout, modals & tab routing
│       ├── index.css           # Complete obsidian cyber design system
│       │
│       ├── context/
│       │   └── HackathonContext.jsx # Global state manager & SSE listener
│       │
│       ├── components/         # Reusable UI widgets
│       │   ├── Navbar.jsx              # Role switcher & navigation tabs
│       │   ├── CountdownBanner.jsx     # 72-hour phase HUD & progress bar
│       │   ├── ProjectCard.jsx         # Submission card with tags & upvote
│       │   ├── ProjectDetailModal.jsx  # Full project modal with demo video
│       │   ├── SubmissionModal.jsx     # Project submission form with preview
│       │   ├── RubricScoringModal.jsx  # Multi-criterion slider evaluation
│       │   ├── PairwiseDuelModal.jsx   # Bradley-Terry head-to-head arena
│       │   ├── TeamMatchmakerModal.jsx # Squad creation & open role post
│       │   ├── SeekerProfileModal.jsx  # Hacker skill profile registration
│       │   ├── RequestMentorModal.jsx  # Helpdesk ticket submission
│       │   ├── BroadcastModal.jsx      # Organizer live announcement broadcaster
│       │   ├── ExportModal.jsx         # CSV & JSON data export prompt
│       │   └── Toast.jsx               # Floating notification toasts
│       │
│       └── views/              # 11 Main Platform Views
│           ├── OverviewView.jsx        # Landing hub & telemetry summary
│           ├── ScheduleTimelineView.jsx# 72h chronological event calendar
│           ├── PrizesView.jsx          # Prize breakdown & sponsor bounties
│           ├── SubmissionsView.jsx     # Searchable project showcase
│           ├── JudgingStudioView.jsx   # Judge rubric & duel management
│           ├── LeaderboardView.jsx     # Standings & track winners
│           ├── TeamsView.jsx           # Squad finder & hacker seekers
│           ├── ResourcesView.jsx       # Starter kits & developer tools
│           ├── MentorshipView.jsx      # Live ticket helpdesk
│           ├── FaqView.jsx             # Searchable knowledge base
│           └── AnalyticsDashboardView.jsx # Judge matrix & audit logs
│
├── server/                     # Backend API (Express.js ES Modules)
│   ├── index.js                # Express app, static serving & SSE broadcaster
│   ├── db.js                   # Atomic JSON file database storage engine
│   ├── seedData.js             # Seed data (tracks, criteria, sample projects)
│   ├── judgingAlgorithm.js     # Z-Score normalization & Elo math
│   └── routes/                 # REST API Routers
│       ├── hackathon.js        # Config, phases, announcements, mentorship
│       ├── submissions.js      # Project CRUD, filtering, upvoting
│       ├── judging.js          # Rubric scoring & pairwise duel matches
│       ├── leaderboard.js      # Standings computation & embargo logic
│       ├── teams.js            # Squad management & membership
│       ├── analytics.js        # Judge coverage matrix & health metrics
│       └── export.js           # CSV & JSON export generation
├── tests/                      # Automated Test Suite (Node.js native test runner)
│   ├── judgingAlgorithm.test.js# Weighted rubric, Z-Score & Elo unit tests
│   ├── seedData.test.js        # Data integrity, criteria & relation constraints
│   ├── db.test.js              # Persistence, cache & reseed tests
│   └── api.test.js             # End-to-end REST & healthcheck integration tests
│
└── data/                       # Persistent Data Storage (Created on first run)
    └── db.json                 # Primary database file (atomic JSON write-through)
```

---

## 🚀 Simple Setup Guides

Choose the setup method that best suits your environment. **Method 1 (Docker Compose)** is the fastest and recommended for self-hosting.

### System Prerequisites

Make sure you have one of the following installed:
- **For Docker Setup**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / macOS) or Docker Engine + Compose (Linux).
- **For Local Node.js Setup**: [Node.js](https://nodejs.org/) v18.0.0 or v20.0.0+ and `npm` v9.0.0+.
- **Git**: Installed and available in your terminal.

---

### Method 1: Run with Docker Compose (Recommended)

This method builds both the frontend and backend into an optimized Alpine container with automatic data volume persistence.

```bash
# 1. Clone the repository
git clone https://github.com/Aditya8369/Rushabh-Mahajan.git
cd Rushabh-Mahajan

# 2. Start the platform in the background (or npm run docker:run)
docker compose up -d --build
```

- Platform is now live at: **[http://localhost:5000](http://localhost:5000)**
- To view container logs:
  ```bash
  docker compose logs -f
  ```
- To stop the platform:
  ```bash
  docker compose down
  ```

---

### Method 2: Run with Docker CLI

If you prefer using pure Docker commands without compose:

```bash
# 1. Build the production Docker image (or npm run docker:build)
docker build -t dogfood-hackathon .

# 2. Run the container with persistent storage
docker run -d \
  -p 5000:5000 \
  -v dogfood_hackathon_data:/app/data \
  --name dogfood-2026-hackathon \
  dogfood-hackathon
```

- Open **[http://localhost:5000](http://localhost:5000)** in your browser.
- To inspect health status: `docker inspect --format='{{json .State.Health}}' dogfood-2026-hackathon`

---

### Method 3: Local Node.js Development Setup

For developers wanting hot-reloading on both frontend and backend:

#### Step 1: Install Dependencies
Open your terminal (PowerShell, Command Prompt, or Bash) in the project directory:

```bash
# Install server root dependencies
npm install

# Install client dependencies
npm --prefix client install
```

#### Step 2: Configure Environment (Optional)
Copy the example environment file:

```bash
# On Windows PowerShell:
Copy-Item .env.example .env

# On macOS / Linux:
cp .env.example .env
```

#### Step 3: Run the Concurrent Dev Server
```bash
npm run dev
```

This starts:
- 📡 **Backend API Server**: Runs on `http://localhost:5000`
- ⚡ **Vite Frontend Dev Server**: Runs on `http://localhost:5173` (with automated proxy to `5000` for `/api`)

Open **[http://localhost:5173](http://localhost:5173)** in your browser to start developing with instantaneous hot-module replacement (HMR).

---

### Method 4: Production Node.js Build (Without Docker)

To run a production-grade compiled instance directly with Node:

```bash
# 1. Install all dependencies
npm install
npm --prefix client install

# 2. Build the client bundle
npm run build

# 3. Start the production Express server
npm start
```

Open **[http://localhost:5000](http://localhost:5000)**. The server serves the compiled client assets from `client/dist`.

---

### 🧪 Running the Automated Test Suite

The platform includes a test suite covering the judging math engine, database persistence, business constraints, and REST API integration endpoints using Node.js's built-in test runner (zero external dependencies required):

```bash
# Run all test suites
npm test
```

Test suites included:
- `tests/judgingAlgorithm.test.js`: Validates weighted rubrics, Elo upset dynamics, and Z-score bias normalization.
- `tests/seedData.test.js`: Verifies data integrity, criteria weight totals (100%), and track foreign-key references.
- `tests/db.test.js`: Tests atomic save, load, and database reset logic.
- `tests/api.test.js`: Comprehensive integration tests covering all HTTP and SSE API endpoints.

---

## 🧭 5-Minute Quick Tour: Testing All Roles

Once your application is running, follow these steps to experience the complete platform:

### 1. Explore as a Participant
1. In the top navbar, ensure your role is set to **"Participant"**.
2. Click **"+ Submit Project"** in the navigation bar.
3. Fill in a project name, description, GitHub repository link, demo URL, and select a track (e.g. *Grand Prix: Core Platform*).
4. Click **"Submit Project"**. Notice the project immediately appears in the **Submissions** tab.
5. Click the ❤️ upvote button on any project card to see live counter increments.
6. Visit the **Mentorship** tab and click **"Request Mentor"** to submit a help ticket.

### 2. Evaluate as a Judge
1. In the top navbar, click the role dropdown and select **"Judge"**.
2. Choose one of the 4 judge personas (e.g. *Dr. Sarah Chen* or *Alex Rivera*).
3. Navigate to the **Judging** tab.
4. Click **"Score Rubric"** on any project to open the 5-criterion weighted evaluation modal. Adjust the sliders, add written feedback, and submit.
5. Click **"Launch Pairwise Arena"** to duel two projects head-to-head. Pick the winner to recalculate their Bradley-Terry Elo ratings ($K=32$) instantly.

### 3. Manage as an Organizer
1. In the top navbar, switch your role to **"Organizer"**.
2. Click **"Broadcast"** in the navbar to compose an announcement (e.g. *"Submissions close in 15 minutes!"* with severity `CRITICAL`). All open client windows will immediately display the alert.
3. Navigate to the **Analytics** tab to examine:
   - Total evaluations and duel metrics.
   - The interactive **Judge Coverage Matrix** (showing which judges evaluated which projects).
   - Real-time audit logs of every system activity.
4. Try advancing the hackathon phase by clicking the phase buttons in the countdown banner.
5. Click **"Export Data"** to download the official **CSV Leaderboard** or the full **JSON Database Snapshot**.

---

## ⚙️ Configuration & Environment Variables

The platform uses a `.env` file in the root directory for configuration. All settings have sensible defaults:

| Variable | Type | Default | Description |
|---|---|---|---|
| `PORT` | Number | `5000` | Port where the Express API and production static server listens. |
| `NODE_ENV` | String | `development` | Environment mode (`development` or `production`). |
| `DATA_DIR` | String | `./data` | File system path where `db.json` is stored and persisted. |

---

## 📊 Scientific Judging Math Explained

Dogfood 2026 implements a dual-engine evaluation model designed to neutralize judge bias while keeping the process fast.

### 1. Weighted Rubric Scoring
Each criterion $i$ has a configured weight $w_i$. For an evaluation with scores $s_i \in [1, 10]$:
$$\text{RawScore} = \frac{\sum (s_i \cdot w_i)}{\sum w_i}$$

### 2. Z-Score Standardization & Normalization
To prevent "harsh" judges from penalizing projects and "lenient" judges from skewing the results, the system calculates the mean ($\mu_j$) and standard deviation ($\sigma_j$) for each judge $j$:
$$\mu_j = \frac{1}{N_j} \sum_{k=1}^{N_j} \text{RawScore}_k, \quad \sigma_j = \sqrt{\frac{1}{N_j - 1} \sum_{k=1}^{N_j} (\text{RawScore}_k - \mu_j)^2}$$

The standardized Z-score for a given evaluation is:
$$Z = \frac{\text{RawScore} - \mu_j}{\sigma_j}$$

To present this intuitively to participants, the Z-score is scaled to a standard 0–100 range:
$$\text{NormalizedScore} = \text{clamp}\big(50 + (Z \cdot 16),\, 0,\, 100\big)$$

### 3. Bradley-Terry Pairwise Elo Rating
For head-to-head match comparisons in the Pairwise Arena, Elo ratings start at $R_0 = 1200$. When project $A$ (rating $R_A$) faces project $B$ (rating $R_B$), the expected win probability for $A$ is:
$$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$

Upon voting, ratings update with a $K$-factor of $32$:
$$R'_A = R_A + K \cdot (S_A - E_A)$$
where $S_A = 1$ if $A$ wins and $S_A = 0$ if $B$ wins.

### 4. Blended Composite Ranking
The final leaderboard standings blend both evaluation dimensions:
$$\text{FinalScore} = \big(\text{NormalizedScore} \times 0.70\big) + \left(\frac{\text{Elo}}{16} \times 0.30\right)$$
*(An Elo of 1200 corresponds to 75.0 points on the 100-point scale).*

---

## 📡 Complete REST & Real-Time API Reference

All API routes return JSON and are prefixed with `/api`.

### Hackathon Core & Configuration
- **`GET /api/hackathon`**
  - Returns current hackathon phase, tracks, criteria, judges list, schedule items, and announcements.
- **`PATCH /api/hackathon/phase`**
  - Updates the active lifecycle phase (`REGISTRATION`, `TEAM_BUILDING`, `SUBMISSION`, `JUDGING`, `RESULTS`).
  - Request body: `{ "status": "JUDGING", "currentPhaseEnd": "ISO-Date-String" }`
- **`POST /api/hackathon/announcements`**
  - Broadcasts a new announcement to all participants.
  - Request body: `{ "title": "Headline", "content": "Details", "severity": "CRITICAL" }`
- **`POST /api/hackathon/reset`**
  - Reseeds and restores the database to the default seed state.
- **`GET /api/events`**
  - Server-Sent Events (SSE) stream for real-time live push notifications.

### Submissions
- **`GET /api/submissions`**
  - Returns all submitted projects. Supports query parameters `?track=track-core` and `?search=query`.
- **`GET /api/submissions/:id`**
  - Returns details for a single project including its individual rubric evaluations.
- **`POST /api/submissions`**
  - Submits a new project.
  - Request body:
    ```json
    {
      "title": "Autonomous Agent OS",
      "tagline": "AI-orchestrated workflows for developers",
      "description": "Full markdown project description...",
      "track": "track-core",
      "techStack": ["Node.js", "Docker", "React"],
      "repoUrl": "https://github.com/example/project",
      "demoUrl": "https://demo.example.com",
      "videoUrl": "https://youtube.com/watch?v=example",
      "teamName": "CyberBuilders"
    }
    ```
- **`POST /api/submissions/:id/upvote`**
  - Increments the community upvote count for a project.

### Judging & Pairwise Duels
- **`GET /api/judging`**
  - Returns evaluation logs and per-judge completion progress.
  - Optional query parameter: `?judgeId=judge-1`
- **`POST /api/judging/rubric`**
  - Submits a weighted rubric evaluation.
  - Request body:
    ```json
    {
      "judgeId": "judge-1",
      "judgeName": "Dr. Sarah Chen",
      "submissionId": "sub-1",
      "scores": [
        { "criterionId": "crit-innov", "score": 9 },
        { "criterionId": "crit-tech", "score": 10 }
      ],
      "feedback": "Outstanding code architecture and clear Docker instructions."
    }
    ```
- **`GET /api/judging/pairwise/next`**
  - Fetches two randomized projects for a head-to-head pairwise duel.
- **`POST /api/judging/pairwise/vote`**
  - Records the duel winner and recalculates Elo ratings for both projects.
  - Request body: `{ "judgeId": "judge-1", "subAId": "sub-1", "subBId": "sub-2", "winnerId": "sub-1" }`

### Leaderboard & Analytics
- **`GET /api/leaderboard`**
  - Returns calculated rankings, track standings, pairwise leaderboard, and embargo status.
- **`GET /api/analytics`**
  - Returns hackathon telemetry, track distributions, and the judge-submission coverage matrix.

### Mentorship & Teams
- **`GET /api/teams`** / **`POST /api/teams`**
  - Lists and creates hackathon teams with open role tags.
- **`POST /api/teams/:id/join`**
  - Adds a participant to an existing team.
- **`POST /api/hackathon/mentorship`**
  - Submits a mentor help request ticket.
- **`PATCH /api/hackathon/mentorship/:id`**
  - Updates ticket status (`CLAIMED` or `RESOLVED`).
- **`POST /api/hackathon/seekers`**
  - Registers a hacker looking for a squad with their skills and timezone.

### Data Export & Health Checks
- **`GET /api/export/csv`**
  - Generates and streams `dogfood-2026-leaderboard.csv`.
- **`GET /api/export/json`**
  - Streams a complete snapshot of `dogfood-2026-export.json`.
- **`GET /health`** / **`GET /api/health`**
  - Container health check probe returning uptime, status, and timestamp.

---

## 🔧 Troubleshooting & Frequently Asked Questions

### 1. Port 5000 is already in use
If another application or service (such as AirPlay Receiver on macOS) is occupying port 5000:
- **With Docker**: Change the port mapping in `docker-compose.yml` (e.g., `"5050:5000"`) or pass `-p 5050:5000` to `docker run`.
- **With Local Node**: Set `PORT=5050` in your `.env` file before running `npm run dev`.

### 2. Frontend changes do not show up when running `npm start`
When running `npm start`, Express serves the pre-compiled bundle located in `client/dist`. If you modified client files, rebuild the client bundle with:
```bash
npm run build
```
Alternatively, for active frontend development with hot-reloading, use `npm run dev` and navigate to `http://localhost:5173`.

### 3. How do I restore the database back to clean demo data?
You can reseed the database at any time using any of these methods:
- **Via the UI**: Switch to the **Organizer** role in the top bar, go to **Analytics**, and click **"Reset & Reseed Data"**.
- **Via Terminal**: Run `npm run seed` in your project root.
- **Via cURL**:
  ```bash
  curl -X POST http://localhost:5000/api/hackathon/reset
  ```

### 4. Docker container healthcheck fails
Check the container logs to inspect the error:
```bash
docker logs dogfood-2026-hackathon
```
Verify that port `5000` is free on your host machine and that Docker has write permissions to create named volumes.

---

## 🤝 Contributing & License

Contributions, bug reports, and pull requests are welcome!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "Add amazing feature"`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

### License
This project is open-source and released under the **[MIT License](LICENSE)**. Built for **Dogfood 2026**.
