import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Trophy, 
  Award, 
  Medal, 
  ShieldCheck, 
  Download, 
  Lock, 
  Unlock, 
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export function LeaderboardView({ onSelectProject, onOpenExport }) {
  const { leaderboard, tracks, currentRole, changePhase, config } = useHackathon();

  const [activeTab, setActiveTab] = useState('overall'); // 'overall' | 'tracks' | 'pairwise'

  const rankings = leaderboard?.rankings || [];
  const trackStandings = leaderboard?.trackStandings || {};
  const isEmbargoed = config?.status === 'JUDGING';

  // Top 3 Podium
  const top1 = rankings[0];
  const top2 = rankings[1];
  const top3 = rankings[2];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '24px 28px',
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
              [ OFFICIAL STANDINGS ]
            </span>
            {isEmbargoed ? (
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
                [ LIVE MATRIX · RECALCULATING ]
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
                [ RESULTS PUBLISHED ]
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            Composite Standings (70% Rubric + 30% Elo)
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '650px' }}>
            Standings computed via dual-engine: <strong>Z-Score Normalized Rubric Calibration (70%)</strong> + <strong>Pairwise Elo Showdowns (30%)</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onOpenExport}>
            <Download size={16} /> Export CSV / JSON
          </button>
          {currentRole === 'ORGANIZER' && (
            <button
              className={isEmbargoed ? "btn btn-primary" : "btn btn-secondary"}
              onClick={() => changePhase(isEmbargoed ? 'RESULTS' : 'JUDGING')}
            >
              {isEmbargoed ? 'Publish Final Results' : 'Re-open Judging'}
            </button>
          )}
        </div>
      </div>

      {/* Top 3 Podium (If at least 3 submissions exist) */}
      {rankings.length >= 3 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'flex-end'
        }}>
          {/* 2nd Place */}
          {top2 && (
            <div
              className="glass-panel glass-panel-hover"
              onClick={() => onSelectProject(top2)}
              style={{
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(148, 163, 184, 0.4)',
                background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.1) 0%, rgba(13, 17, 26, 0.8) 100%)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#0f172a'
              }}>
                2
              </div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Silver Podium</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{top2.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#38bdf8', marginBottom: '14px' }}>{top2.teamName}</p>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                {top2.finalScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PTS</span>
              </div>
            </div>
          )}

          {/* 1st Place (Grand Prix Winner) */}
          {top1 && (
            <div
              className="glass-panel glass-panel-hover"
              onClick={() => onSelectProject(top1)}
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                border: '2px solid #8b5cf6',
                background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.25) 0%, rgba(13, 17, 26, 0.9) 100%)',
                boxShadow: '0 0 35px rgba(139, 92, 246, 0.35)',
                transform: 'scale(1.04)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #8b5cf6, #f59e0b)',
                color: '#fff',
                fontWeight: 800,
                padding: '4px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Trophy size={14} /> 1ST PLACE CHAMPION
              </div>

              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '12px auto 14px',
                fontWeight: 800,
                fontSize: '1.5rem',
                color: '#78350f',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{top1.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#a78bfa', fontWeight: 600, marginBottom: '16px' }}>{top1.teamName}</p>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                {top1.finalScore} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>PTS</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <div
              className="glass-panel glass-panel-hover"
              onClick={() => onSelectProject(top3)}
              style={{
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(217, 119, 6, 0.4)',
                background: 'linear-gradient(180deg, rgba(217, 119, 6, 0.1) 0%, rgba(13, 17, 26, 0.8) 100%)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#fff'
              }}>
                3
              </div>
              <span className="badge badge-amber" style={{ marginBottom: '8px' }}>Bronze Podium</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{top3.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#fbbf24', marginBottom: '14px' }}>{top3.teamName}</p>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                {top3.finalScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PTS</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Standings Table */}
      <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
              Detailed Normalized Scorecards
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Z-Score calibrated scores eliminate bias between generous and harsh reviewers.
            </p>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '14px 12px' }}>Rank</th>
              <th style={{ padding: '14px 12px' }}>Platform & Squad</th>
              <th style={{ padding: '14px 12px' }}>Track</th>
              <th style={{ padding: '14px 12px', textAlign: 'right' }}>Normalized Rubric (70%)</th>
              <th style={{ padding: '14px 12px', textAlign: 'right' }}>Pairwise Elo (30%)</th>
              <th style={{ padding: '14px 12px', textAlign: 'right' }}>Composite Score</th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>Evaluations</th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r) => (
              <tr key={r.submissionId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                {/* Rank */}
                <td style={{ padding: '16px 12px', fontWeight: 800, fontSize: '1.1rem' }}>
                  {r.rank === 1 ? '🥇 1' : r.rank === 2 ? '🥈 2' : r.rank === 3 ? '🥉 3' : `#${r.rank}`}
                </td>

                {/* Title & Team */}
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
                    {r.teamName}
                  </div>
                </td>

                {/* Track */}
                <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                  <span className="badge badge-violet" style={{ fontSize: '0.72rem' }}>
                    {r.track?.replace('track-', '')}
                  </span>
                </td>

                {/* Normalized Score */}
                <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  <strong style={{ color: '#a78bfa' }}>{r.normalizedScore}</strong>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Raw: {r.rawAverage}</div>
                </td>

                {/* Pairwise Elo */}
                <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  <strong style={{ color: '#38bdf8' }}>{r.pairwiseScore}</strong>
                </td>

                {/* Composite Score */}
                <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                  {r.finalScore}
                </td>

                {/* Evaluations count */}
                <td style={{ padding: '16px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  {r.evaluationCount}
                </td>

                {/* Action */}
                <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const fullSub = leaderboard?.rankings?.find(s => s.submissionId === r.submissionId);
                      onSelectProject({
                        id: r.submissionId,
                        title: r.title,
                        teamName: r.teamName,
                        track: r.track,
                        tagline: r.tagline,
                        description: r.description || `Platform created by ${r.teamName}. Built for Dogfood 2026 hackathon.`,
                        repoUrl: r.repoUrl,
                        demoUrl: r.demoUrl,
                        logoUrl: r.logoUrl,
                        pairwiseScore: r.pairwiseScore
                      });
                    }}
                  >
                    View Card
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
