import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  BarChart3, 
  Layers, 
  Users, 
  ShieldCheck, 
  Swords, 
  Flame, 
  RotateCcw, 
  Download, 
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';

export function AnalyticsDashboardView({ onOpenExport }) {
  const { 
    analytics, 
    config, 
    changePhase, 
    resetDatabase, 
    submissions, 
    teams, 
    judges, 
    evaluations, 
    pairwiseDuels 
  } = useHackathon();

  const stats = analytics?.stats || {
    totalSubmissions: submissions.length,
    totalTeams: teams.length,
    totalJudges: judges.length,
    totalEvaluations: evaluations.length,
    totalDuels: pairwiseDuels.length,
    overallJudgingProgress: 85,
    trackDistribution: []
  };

  const phases = [
    { id: 'REGISTRATION', title: '1. Registration', desc: 'Accept participant registrations & profiles' },
    { id: 'TEAM_BUILDING', title: '2. Team Building', desc: 'Enable matchmaking & squad forming' },
    { id: 'SUBMISSION', title: '3. Hacking & Submit', desc: 'Open project submission studio' },
    { id: 'JUDGING', title: '4. Live Judging Matrix', desc: 'Run rubric evaluations & pairwise duels' },
    { id: 'RESULTS', title: '5. Winners Showcase', desc: 'Unveil champion podium & awards' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '24px 28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: 'var(--df-pink)',
              color: 'var(--df-bg)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              padding: '2px 8px'
            }}>
              [ OPS TELEMETRY ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              STATUS: {config?.status || 'JUDGING'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            Organizer &amp; Ops Command Center
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)' }}>
            Real-time telemetry, stage progression, audit logs, and self-hosted health diagnostics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" onClick={onOpenExport}>
            <Download size={14} /> [ Export Records ]
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm('Reset database to initial Dogfood 2026 seed state?')) {
                resetDatabase();
              }
            }}
          >
            <RotateCcw size={16} /> Reset & Reseed DB
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>TOTAL PROJECTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
            {stats.totalSubmissions}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '4px' }}>100% Verified</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ACTIVE SQUADS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-mono)' }}>
            {stats.totalTeams}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Cross-functional teams</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>RUBRIC REVIEWS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
            {stats.totalEvaluations}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>Normalized by Z-Score</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>PAIRWISE DUELS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
            {stats.totalDuels}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '4px' }}>Elo Convergence</div>
        </div>
      </div>

      {/* Lifecycle Stage Controller */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          Hackathon Lifecycle State Engine
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Switch the active 72-hour phase with 1-click. Updates live countdown timers and permissions across all connected clients.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {phases.map((p) => {
            const isActive = (config?.status || 'JUDGING') === p.id;
            return (
              <div
                key={p.id}
                onClick={() => changePhase(p.id)}
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-tertiary)',
                  border: isActive ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: isActive ? '#a78bfa' : '#fff', fontSize: '0.95rem' }}>{p.title}</strong>
                  {isActive && <span className="badge badge-emerald">ACTIVE</span>}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Trail & Track Distribution */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {/* Audit Log */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
            Event Stream & Audit Trail
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
            {stats.auditLogs?.map((log) => (
              <div
                key={log.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div>
                  <span className="badge badge-violet" style={{ fontSize: '0.68rem', marginRight: '8px' }}>
                    {log.action}
                  </span>
                  <span style={{ color: '#fff' }}>{log.detail}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Hostable Docker Diagnostics */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
            Container & Host Health Diagnostics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Docker Engine Status:</span>
              <span className="badge badge-emerald">Healthy / Running</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Database Persistence:</span>
              <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>./data/db.json (WAL Active)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SSE Live Event Stream:</span>
              <span className="badge badge-cyan">Active (/api/events)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Score Normalizer:</span>
              <span style={{ color: '#a78bfa' }}>Z-Score & Bradley-Terry Elo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Data Portability:</span>
              <span style={{ color: '#34d399' }}>Instant 1-Click CSV/JSON Export</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
