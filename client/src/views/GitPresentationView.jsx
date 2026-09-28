import React, { useState, useEffect, useCallback } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Terminal, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Box, 
  Layers, 
  Cpu, 
  FileCode2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'ARCHITECTURE & FOUNDATION',
    title: 'The 72-Hour Git Architecture: From Zero to Production Engine',
    subtitle: 'High-Velocity Repository Topology for Mission-Critical Engineering',
    icon: GitBranch,
    accent: '#00E5D0',
    content: (
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--df-text)', marginBottom: '20px' }}>
          In a 72-hour dogfooding hackathon, the Git repository is the <strong>sole immutable source of truth</strong>. A disorganized repository leads to merge conflicts, lost hotfixes, and chaotic final deployments.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#00E5D0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <GitBranch size={16} /> 1. Trunk-Based Speed
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Use a protected <code>main</code> branch with short-lived feature branches (<code>feat/rubric-engine</code>, <code>fix/elo-k32</code>). Rebase frequently to maintain a clean linear history.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <ShieldCheck size={16} /> 2. Atomic Semantic Commits
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Follow Conventional Commits (<code>feat:</code>, <code>fix:</code>, <code>perf:</code>, <code>docs:</code>). Enables automated changelog generation and instant rollback traceability.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ec4899', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <Box size={16} /> 3. Monorepo Alignment
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Keep <code>client/</code>, <code>server/</code>, <code>tests/</code>, and <code>Dockerfile</code> in a unified workspace to eliminate version mismatch during rapid 72h iteration.
            </p>
          </div>
        </div>

        <div style={{
          background: '#070a12',
          border: '1px solid var(--df-border)',
          padding: '14px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: '#E6ECFF'
        }}>
          <span style={{ color: '#00E5D0' }}>$ git checkout</span> -b feat/dual-engine-judging<br/>
          <span style={{ color: '#8b5cf6' }}>$ git commit</span> -m "feat(judging): implement Bradley-Terry Elo K=32 & Z-score calibration"<br/>
          <span style={{ color: '#ec4899' }}>$ git push</span> origin feat/dual-engine-judging
        </div>
      </div>
    )
  },
  {
    id: 2,
    tag: 'WORKFLOW & COLLABORATION',
    title: 'Squad Collaboration: Branching, Conflict Resolution & Fast Reviews',
    subtitle: 'Synchronizing High-Stakes Code Under 72-Hour Deadlines',
    icon: GitPullRequest,
    accent: '#8b5cf6',
    content: (
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--df-text)', marginBottom: '20px' }}>
          Squads of 2–5 engineers cannot afford bottlenecked code reviews. The 72-hour workflow optimizes for <strong>micro-pull requests</strong>, fast peer approvals, and continuous merge trains.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--df-pink)', fontSize: '0.9rem', marginBottom: '8px' }}>
              Micro-PR Principle
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Cap pull requests at &lt; 250 lines of diff. Smaller PRs are reviewed in 3 minutes, merge cleanly, and keep team momentum at peak velocity.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: '#00E5D0', fontSize: '0.9rem', marginBottom: '8px' }}>
              Merge Strategy: Squash &amp; Rebase
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Keep <code>main</code> clean. Squash trivial WIP commits into a single cohesive commit upon merging, leaving an audit trail that evaluators can verify effortlessly.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b', fontSize: '0.9rem', marginBottom: '8px' }}>
              Rebase Over Merge Bubbles
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Run <code>git pull --rebase origin main</code> before submitting your PR to prevent cluttered merge bubbles and resolve conflicts in your local sandbox.
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid var(--df-purple)',
          padding: '12px 16px',
          fontSize: '0.85rem'
        }}>
          <Clock size={18} color="var(--df-purple)" />
          <span><strong>Hackathon Tip:</strong> Agree on database schema and API contracts (`DATA-MODEL.md`) in Hour 1 so frontend and backend squads can build in parallel without breaking changes.</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    tag: 'DEVOPS & GITOPS',
    title: 'GitOps Pipeline: Multi-Stage Docker Builds on Every Commit',
    subtitle: 'Automated Container Verification and Zero-Downtime Hot Deployments',
    icon: Box,
    accent: '#00E5D0',
    content: (
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--df-text)', marginBottom: '20px' }}>
          Code that only runs on the developer's laptop fails the <strong>Self-Hostability &amp; Completeness</strong> criterion. Every commit must build cleanly inside Docker without environment leakage.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ color: '#00E5D0', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              Stage 1: Client Compilation
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)' }}>
              Alpine Node 20 installs dependencies with <code>--no-audit --no-fund</code> and compiles the optimized Vite bundle in isolation.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ color: '#ec4899', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              Stage 2: Production Serving
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)' }}>
              Lightweight runtime copies only <code>client/dist</code> and production dependencies. Switches to non-root <code>USER node</code>.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              Stage 3: Automated Health Check
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)' }}>
              Container orchestrator queries <code>/health</code> every 30 seconds via <code>wget</code> to guarantee liveness before traffic routing.
            </p>
          </div>
        </div>

        <div style={{
          background: '#070a12',
          border: '1px solid var(--df-border)',
          padding: '14px 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: '#E6ECFF'
        }}>
          <span style={{ color: '#00E5D0' }}># 1-Command Verification</span><br/>
          docker compose up -d --build &amp;&amp; curl http://localhost:5000/health
        </div>
      </div>
    )
  },
  {
    id: 4,
    tag: 'EVALUATION & INTEGRITY',
    title: 'Judging Auditing: Git Cryptographic Proof of Work & Fair Play',
    subtitle: 'How Evaluators Verify Commit History, Authorship & Submission Timestamps',
    icon: ShieldCheck,
    accent: '#ec4899',
    content: (
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--df-text)', marginBottom: '20px' }}>
          In competitive engineering hackathons, judges evaluate not just the final UI, but the <strong>authenticity of engineering</strong>. Git commit graphs serve as cryptographic proof of legitimate 72-hour work.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', marginBottom: '6px', fontWeight: 600 }}>
              <GitCommit size={16} /> 1. Commit Cadence Analysis
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              A single massive commit at Hour 71 flags potential pre-built code. Regular commit progressions across the 72 hours prove authentic live development.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00E5D0', marginBottom: '6px', fontWeight: 600 }}>
              <FileCode2 size={16} /> 2. Diff Transparency
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Evaluators review pull request diffs to inspect algorithmic elegance (such as <code>server/judgingAlgorithm.js</code>) and ensure zero plagiarized copy-paste.
            </p>
          </div>

          <div style={{ background: 'var(--df-surface)', padding: '16px', border: '1px solid var(--df-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', marginBottom: '6px', fontWeight: 600 }}>
              <Clock size={16} /> 3. Deadline Hard-Stop
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--df-text-dim)', lineHeight: 1.5 }}>
              Commits stamped after the Hour 65 submission freeze are automatically disqualified from scoring by comparing commit SHA timestamps with the active phase end time.
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(236, 72, 153, 0.08)',
          border: '1px solid var(--df-pink)',
          padding: '12px 16px',
          fontSize: '0.85rem'
        }}>
          <strong>Organizer Note:</strong> Dogfood 2026 includes full repository links and commit diff inspection in the <em>Judging Studio</em> and <em>Leaderboard CSV Export</em>.
        </div>
      </div>
    )
  },
  {
    id: 5,
    tag: 'RELEASE & PACKAGING',
    title: 'Submission Freeze: Release Tagging & Self-Hostable Distribution',
    subtitle: 'Locking Down the Golden Master at Hour 65',
    icon: GitMerge,
    accent: '#f59e0b',
    content: (
      <div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--df-text)', marginBottom: '20px' }}>
          When the submission deadline arrives, squads execute the <strong>Golden Master Release Protocol</strong>. This locks the evaluated version and provides judges with immediate 1-command reproduceability.
        </p>

        <div style={{ background: '#070a12', border: '1px solid var(--df-border)', padding: '18px', marginBottom: '24px' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b', fontSize: '0.9rem', marginBottom: '12px' }}>
            [ Official Release Protocol Checklist ]
          </h4>
          <ol style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--df-text-dim)', lineHeight: 1.8 }}>
            <li><strong style={{ color: '#fff' }}>Tag the Submission:</strong> <code>git tag -a v1.0.0-submission -m "Dogfood 2026 Final Release"</code></li>
            <li><strong style={{ color: '#fff' }}>Verify Docker Clean Build:</strong> <code>docker compose down -v &amp;&amp; docker compose up --build</code></li>
            <li><strong style={{ color: '#fff' }}>Generate Data Snapshot:</strong> Ensure seed data or custom demo data persists in <code>data/db.json</code>.</li>
            <li><strong style={{ color: '#fff' }}>Submit Project Form:</strong> Enter GitHub repo URL, Demo link, YouTube video demo, and architectural highlights.</li>
          </ol>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--df-surface)', padding: '14px', border: '1px solid var(--df-border)' }}>
            <span style={{ color: '#00E5D0', fontWeight: 600, fontSize: '0.8rem' }}>✓ ZERO SECRETS IN GIT</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>Ensure <code>.env</code> is git-ignored and only <code>.env.example</code> is committed.</p>
          </div>
          <div style={{ background: 'var(--df-surface)', padding: '14px', border: '1px solid var(--df-border)' }}>
            <span style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.8rem' }}>✓ PERSISTENT DATA BIND</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>Named volumes ensure judge test reviews don't wipe seed evaluations.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    tag: 'CHEATSHEET & TERMINAL RECIPES',
    title: 'Essential Git Recipes for 72-Hour Dogfooding Hackers',
    subtitle: 'Battle-Tested Commands for Instant Terminal Execution',
    icon: Terminal,
    accent: '#00E5D0',
    content: (
      <div>
        <p style={{ fontSize: '0.95rem', color: 'var(--df-text-dim)', marginBottom: '16px' }}>
          Click any command to copy it directly to your clipboard:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              label: 'Initialize & Configure Remote',
              cmd: 'git init && git add . && git commit -m "feat: initial commit for Dogfood 2026"'
            },
            {
              label: 'Start New Feature Branch',
              cmd: 'git checkout -b feat/scoring-normalization-engine'
            },
            {
              label: 'Rebase with Main to Avoid Merge Bubbles',
              cmd: 'git fetch origin && git rebase origin/main'
            },
            {
              label: 'Squash & Clean Local History Before Submission',
              cmd: 'git reset --soft HEAD~3 && git commit -m "feat(core): complete self-hostable platform"'
            },
            {
              label: 'Final Tag & Push for Judging',
              cmd: 'git tag -a v1.0.0-final -m "Final Submission" && git push origin --tags'
            }
          ].map((recipe, idx) => (
            <TerminalSnippet key={idx} label={recipe.label} cmd={recipe.cmd} />
          ))}
        </div>
      </div>
    )
  }
];

function TerminalSnippet({ label, cmd }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: '#070a12',
      border: '1px solid var(--df-border)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--df-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#00E5D0', whiteSpace: 'nowrap' }}>
          <span style={{ color: 'var(--df-pink)' }}>$ </span>{cmd}
        </div>
      </div>

      <button
        onClick={handleCopy}
        style={{
          background: copied ? 'rgba(0, 229, 208, 0.15)' : 'var(--df-surface)',
          border: copied ? '1px solid #00E5D0' : '1px solid var(--df-border)',
          color: copied ? '#00E5D0' : 'var(--df-text-dim)',
          padding: '6px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexShrink: 0
        }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

// Sample Git Interactive Graph Nodes
const GIT_GRAPH_NODES = [
  { id: 'c1', hash: '8f2a1b9', branch: 'main', author: 'Elena R.', time: 'Hour 02', msg: 'init: repository setup & multi-stage Dockerfile' },
  { id: 'c2', hash: 'e39c4d2', branch: 'main', author: 'Marcus V.', time: 'Hour 14', msg: 'feat(db): atomic JSON storage & in-memory cache' },
  { id: 'c3', hash: 'b17e8f5', branch: 'feat/judging', author: 'Dr. Sarah Chen', time: 'Hour 28', msg: 'feat(math): Z-score normalization & Elo updates' },
  { id: 'c4', hash: 'c90a421', branch: 'feat/ui', author: 'Maya Lin', time: 'Hour 38', msg: 'ui(cyber): Obsidian theme & 11 responsive views' },
  { id: 'c5', hash: 'f42b890', branch: 'main', author: 'Chen Wei', time: 'Hour 52', msg: 'merge: squad workflows & SSE live stream integration' },
  { id: 'c6', hash: 'a11d73c', branch: 'main', author: 'Dogfood Lead', time: 'Hour 65', msg: 'release: tag v1.0.0-final & test suite verification' }
];

export function GitPresentationView() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState(GIT_GRAPH_NODES[GIT_GRAPH_NODES.length - 1]);

  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  // Autoplay timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  const CurrentIcon = currentSlide.icon;

  return (
    <div style={{
      maxWidth: isFullscreen ? '100%' : '1360px',
      margin: '0 auto',
      position: isFullscreen ? 'fixed' : 'relative',
      top: isFullscreen ? 0 : 'auto',
      left: isFullscreen ? 0 : 'auto',
      right: isFullscreen ? 0 : 'auto',
      bottom: isFullscreen ? 0 : 'auto',
      zIndex: isFullscreen ? 9999 : 'auto',
      background: isFullscreen ? '#0a0d14' : 'transparent',
      padding: isFullscreen ? '32px' : '0',
      minHeight: isFullscreen ? '100vh' : 'auto',
      overflowY: isFullscreen ? 'auto' : 'visible'
    }}>
      
      {/* Top Header Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--df-border)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00E5D0', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <Sparkles size={14} /> DOGFOOD 2026 // WORKFLOW DECK
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', margin: '4px 0 0 0' }}>
            Git Architecture &amp; Presentation Studio
          </h1>
        </div>

        {/* Presentation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pause Autoplay' : 'Autoplay'}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div style={{
        background: 'var(--df-surface)',
        border: `1px solid ${currentSlide.accent || 'var(--df-teal)'}`,
        boxShadow: `0 0 24px -6px ${currentSlide.accent}22`,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        {/* Slide Progress Ticker */}
        <div style={{
          height: '4px',
          background: 'rgba(255, 255, 255, 0.08)',
          width: '100%',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            background: currentSlide.accent || 'var(--df-pink)',
            width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Slide Content Header */}
        <div style={{ padding: '28px 32px 16px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '3px 8px',
                background: `${currentSlide.accent}15`,
                color: currentSlide.accent,
                border: `1px solid ${currentSlide.accent}40`,
                textTransform: 'uppercase'
              }}>
                {currentSlide.tag}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: '#fff', margin: '12px 0 4px 0' }}>
                {currentSlide.title}
              </h2>
              <div style={{ fontSize: '0.95rem', color: 'var(--df-text-dim)', fontFamily: 'var(--font-mono)' }}>
                {currentSlide.subtitle}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--df-text-faint)',
              background: '#070a12',
              padding: '6px 12px',
              border: '1px solid var(--df-border)'
            }}>
              <span style={{ color: currentSlide.accent, fontWeight: 700 }}>
                {String(currentSlideIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Slide Body */}
        <div style={{ padding: '0 32px 28px 32px', minHeight: '340px' }}>
          {currentSlide.content}
        </div>

        {/* Slide Navigation Footer Bar */}
        <div style={{
          borderTop: '1px solid var(--df-border)',
          background: 'rgba(7, 10, 18, 0.95)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={handlePrev}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ChevronLeft size={14} /> Previous
          </button>

          {/* Quick Slide Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                style={{
                  width: idx === currentSlideIndex ? '28px' : '8px',
                  height: '8px',
                  background: idx === currentSlideIndex ? currentSlide.accent : 'var(--df-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
                title={`Go to slide ${s.id}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Git Commit Graph Simulator */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-border)',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitCommit size={18} color="#00E5D0" /> 72-Hour Git Commit Timeline (Verified Provenance)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--df-text-dim)', margin: '4px 0 0 0' }}>
              Click any commit node to inspect cryptographic hashes, author metadata, and verified evaluation diffs.
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--df-teal)' }}>
            [ STATUS: CLEAN REPOSITORY TREE ]
          </span>
        </div>

        {/* Visual Commit Node Sequence */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          position: 'relative',
          marginBottom: '20px'
        }}>
          {GIT_GRAPH_NODES.map((node, i) => {
            const isSelected = selectedCommit?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedCommit(node)}
                style={{
                  background: isSelected ? 'rgba(0, 229, 208, 0.08)' : '#070a12',
                  border: isSelected ? '1px solid #00E5D0' : '1px solid var(--df-border)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00E5D0', fontWeight: 700 }}>
                    {node.hash}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--df-text-faint)', fontFamily: 'var(--font-mono)' }}>
                    {node.time}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#fff', lineHeight: 1.3, marginBottom: '6px' }}>
                  {node.msg}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--df-text-dim)', fontFamily: 'var(--font-mono)' }}>
                  By: {node.author} ({node.branch})
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Commit Detail Inspector */}
        {selectedCommit && (
          <div style={{
            background: '#070a12',
            border: '1px solid var(--df-border)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <span style={{ color: 'var(--df-pink)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>
                COMMIT INSPECTOR // {selectedCommit.hash}
              </span>
              <div style={{ color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>
                "{selectedCommit.msg}"
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--df-text-dim)' }}>
              <span>Branch: <strong style={{ color: '#00E5D0' }}>{selectedCommit.branch}</strong></span>
              <span>Author: <strong style={{ color: '#8b5cf6' }}>{selectedCommit.author}</strong></span>
              <span>Timeline: <strong style={{ color: '#f59e0b' }}>{selectedCommit.time}</strong></span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
