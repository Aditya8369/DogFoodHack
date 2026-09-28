import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Sliders, 
  Swords, 
  CheckCircle2, 
  Clock, 
  Award, 
  BarChart2, 
  Sparkles, 
  ShieldAlert, 
  UserCheck,
  Eye
} from 'lucide-react';

export function JudgingStudioView({ onScoreProject, onOpenPairwise, onSelectProject }) {
  const { 
    submissions, 
    evaluations, 
    judges, 
    selectedJudgeId, 
    handleSelectJudge, 
    pairwiseDuels,
    tracks,
    criteria 
  } = useHackathon();

  const [activeMode, setActiveMode] = useState('rubric'); // 'rubric' | 'matrix'

  const currentJudge = judges.find(j => j.id === selectedJudgeId);
  
  // Calculate current judge's progress
  const judgeEvals = evaluations.filter(e => e.judgeId === selectedJudgeId);
  const judgedSubIds = new Set(judgeEvals.map(e => e.submissionId));
  const progressPercent = submissions.length > 0 ? Math.round((judgeEvals.length / submissions.length) * 100) : 0;
  const currentJudgeDuels = pairwiseDuels.filter(d => d.judgeId === selectedJudgeId).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '80px' }}>
      {/* Judge Header Profile & Progress */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '24px 28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Judge Avatar and Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={currentJudge?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt="Judge Avatar"
            style={{
              width: '60px',
              height: '60px',
              border: '2px solid var(--df-pink)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--df-text)', margin: 0 }}>
                {currentJudge?.name}
              </h1>
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
                [ VERIFIED EVALUATOR ]
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-text-dim)', marginBottom: '6px' }}>
              {currentJudge?.title}
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {currentJudge?.specialties?.map((s, idx) => (
                <span key={idx} style={{
                  background: 'var(--df-surface-2)',
                  color: 'var(--df-pink)',
                  border: '1px solid var(--df-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '1px 6px'
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress & Quick Actions */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
          minWidth: '260px'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--df-text-dim)' }}>RUBRIC COMPLETION:</span>
            <strong style={{ color: 'var(--df-teal)' }}>{judgeEvals.length} / {submissions.length} ({progressPercent}%)</strong>
          </div>
          
          <div style={{ width: '100%', height: '6px', background: 'var(--df-surface-3)', border: '1px solid var(--df-border)', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--df-teal)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-cyan btn-sm"
              onClick={onOpenPairwise}
            >
              <Swords size={14} /> [ Pairwise Duel Arena ({currentJudgeDuels}) ]
            </button>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--df-border)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveMode('rubric')}
            className={activeMode === 'rubric' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Rubric Scoring Queue ]
          </button>
          <button
            onClick={() => setActiveMode('matrix')}
            className={activeMode === 'matrix' ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Judge Calibration Heatmap ]
          </button>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--df-text-dim)' }}>
          ROLE ISOLATION: Peers' scores hidden during review
        </div>
      </div>

      {/* Mode 1: Rubric Scoring Queue */}
      {activeMode === 'rubric' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {submissions.map((sub) => {
            const isJudged = judgedSubIds.has(sub.id);
            const evalObj = judgeEvals.find(e => e.submissionId === sub.id);
            const trackObj = tracks.find(t => t.id === sub.track);

            return (
              <div
                key={sub.id}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  borderLeft: isJudged ? '4px solid #10b981' : '4px solid #8b5cf6'
                }}
              >
                {/* Left: Project snippet */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <img
                    src={sub.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'}
                    alt="Logo"
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                        {sub.title}
                      </h3>
                      <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>
                        {trackObj?.name.split(':')[0] || 'General'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Team: <strong style={{ color: '#fff' }}>{sub.teamName}</strong> • Elo Rating: <span style={{ color: '#38bdf8' }}>{sub.pairwiseScore || 1200}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {isJudged ? (
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={12} /> Scorecard Submitted
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {evalObj?.scores?.length} criteria reviewed
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-amber">
                        <Clock size={12} /> Pending Review
                      </span>
                    </div>
                  )}

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectProject(sub)}
                    title="Read Narrative & Repo"
                  >
                    <Eye size={14} /> Review
                  </button>

                  <button
                    className={isJudged ? "btn btn-outline btn-sm" : "btn btn-primary btn-sm"}
                    onClick={() => onScoreProject(sub)}
                  >
                    <Sliders size={14} /> {isJudged ? 'Edit Score' : 'Score Project'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Calibration Heatmap */}
      {activeMode === 'matrix' && (
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Multi-Judge Calibration & Coverage Matrix
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Real-time audit overview showing judge assignment coverage across all submissions.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Submission</th>
                <th style={{ padding: '12px' }}>Track</th>
                {judges.map(j => (
                  <th key={j.id} style={{ padding: '12px', textAlign: 'center' }}>
                    {j.name.split(' ')[0]}
                  </th>
                ))}
                <th style={{ padding: '12px', textAlign: 'center' }}>Total Reviews</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => {
                const subEvals = evaluations.filter(e => e.submissionId === sub.id);
                return (
                  <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 600, color: '#fff' }}>
                      {sub.title}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub.teamName}</div>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>
                      {sub.track?.replace('track-', '')}
                    </td>
                    {judges.map(j => {
                      const ev = subEvals.find(e => e.judgeId === j.id);
                      return (
                        <td key={j.id} style={{ padding: '14px 12px', textAlign: 'center' }}>
                          {ev ? (
                            <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                              Scored
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                          )}
                        </td>
                      );
                    })}
                    <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: 700, color: '#38bdf8' }}>
                      {subEvals.length} / {judges.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
