import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  FileCode, 
  Terminal, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  Box, 
  Shield 
} from 'lucide-react';

export function ResourcesView() {
  const { showToast } = useHackathon();
  const [copiedKey, setCopiedKey] = useState(null);
  
  // Interactive checklist state
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Public GitHub or GitLab repository with MIT/Apache-2.0 License', checked: true },
    { id: 'c2', label: 'Dockerfile or docker-compose.yml tested and operational', checked: true },
    { id: 'c3', label: 'Persistent database storage without external SaaS dependencies', checked: false },
    { id: 'c4', label: '2-Minute Video Pitch Walkthrough uploaded (YouTube / Loom / Vimeo)', checked: false },
    { id: 'c5', label: 'Comprehensive README.md with 1-step installation instructions', checked: false },
    { id: 'c6', label: 'Healthcheck endpoint (/health or /api/health) responding with status 200', checked: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const checklistPercent = Math.round((checkedCount / checklist.length) * 100);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied boilerplate snippet to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const dockerfileSnippet = `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:5000/health || exit 1
CMD ["node", "server/index.js"]`;

  const dockerComposeSnippet = `version: '3.8'
services:
  dogfood-engine:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
    environment:
      - PORT=5000
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:5000/health"]
      interval: 15s
      timeout: 5s
      retries: 3`;

  const glicko2Snippet = `// Glicko-2 Elo Rating Adjustment Calculation
function updateElo(ratingA, ratingB, outcomeA, k = 32) {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const newRatingA = Math.round(ratingA + k * (outcomeA - expectedA));
  const newRatingB = Math.round(ratingB + k * ((1 - outcomeA) - (1 - expectedA)));
  return { newRatingA, newRatingB };
}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '28px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'var(--df-pink)',
              color: 'var(--df-bg)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              padding: '2px 8px'
            }}>
              [ HACKER VAULT & STARTER KITS ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              OPEN TOOLS & CODE
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            Developer Resources &amp; Boilerplates
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '680px' }}>
            Official templates, Docker blueprints, Glicko-2 scoring algorithms, and interactive submission readiness checklist.
          </p>
        </div>
      </div>

      {/* Interactive Submission Readiness Checklist */}
      <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--df-pink)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Pre-Submission Readiness Checklist
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>
              Ensure your platform passes all automated scoring criteria before code freeze.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--df-teal)', fontWeight: 700 }}>
              {checkedCount} / {checklist.length} Completed ({checklistPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'var(--df-surface-3)', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{
            width: `${checklistPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--df-pink), var(--df-teal))',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Checklist items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: item.checked ? 'var(--df-teal-dim)' : 'var(--df-bg)',
                border: item.checked ? '1px solid var(--df-teal)' : '1px solid var(--df-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.checked ? (
                <CheckSquare size={18} color="var(--df-teal)" />
              ) : (
                <Square size={18} color="var(--df-text-dim)" />
              )}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                color: item.checked ? '#fff' : 'var(--df-text-muted)',
                textDecoration: item.checked ? 'none' : 'none'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Boilerplate Snippets */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">01</span>
          <span className="df-section-tag">[ 01 / DOCKER RUNTIME BLUEPRINTS ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '20px'
        }}>
          {/* Multi-stage Dockerfile */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '1.1rem', color: 'var(--df-teal)' }}>
                [ TEMPLATE: Dockerfile (Multi-Stage) ]
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(dockerfileSnippet, 'dockerfile')}
              >
                {copiedKey === 'dockerfile' ? <Check size={13} color="var(--df-teal)" /> : <Copy size={13} />}
                {copiedKey === 'dockerfile' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre style={{
              background: 'var(--df-bg)',
              border: '1px solid var(--df-border)',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--df-text-muted)',
              overflowX: 'auto',
              maxHeight: '260px'
            }}>
              <code>{dockerfileSnippet}</code>
            </pre>
          </div>

          {/* Docker Compose */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '1.1rem', color: 'var(--df-pink)' }}>
                [ TEMPLATE: docker-compose.yml ]
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(dockerComposeSnippet, 'compose')}
              >
                {copiedKey === 'compose' ? <Check size={13} color="var(--df-teal)" /> : <Copy size={13} />}
                {copiedKey === 'compose' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre style={{
              background: 'var(--df-bg)',
              border: '1px solid var(--df-border)',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--df-text-muted)',
              overflowX: 'auto',
              maxHeight: '260px'
            }}>
              <code>{dockerComposeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Judging Algorithm Blueprint */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">02</span>
          <span className="df-section-tag">[ 02 / DUAL-ENGINE MATH FORMULAS ]</span>
          <span className="df-section-rule" />
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.15rem', color: '#fff' }}>
                Glicko-2 &amp; Z-Score Normalization Engine
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>
                Mathematical formula used to calculate composite rankings: <strong>FinalScore = (0.70 × NormalizedRubric) + (0.30 × (Elo / 16))</strong>.
              </p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => copyToClipboard(glicko2Snippet, 'glicko')}
            >
              {copiedKey === 'glicko' ? <Check size={13} color="var(--df-teal)" /> : <Copy size={13} />}
              {copiedKey === 'glicko' ? 'Copied' : 'Copy'}
            </button>
          </div>

          <pre style={{
            background: 'var(--df-bg)',
            border: '1px solid var(--df-border)',
            padding: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--df-text-muted)',
            overflowX: 'auto'
          }}>
            <code>{glicko2Snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
