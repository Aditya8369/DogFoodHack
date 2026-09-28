import React, { useState, useEffect } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Swords, 
  X, 
  Trophy, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Zap,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export function PairwiseDuelModal({ isOpen, onClose }) {
  const { submissions, votePairwiseDuel, selectedJudgeId, judges } = useHackathon();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);

  const currentJudge = judges.find(j => j.id === selectedJudgeId);

  const fetchNextMatch = () => {
    if (submissions.length < 2) return;
    setLoading(true);
    // Shuffle and pick 2 distinct submissions
    const shuffled = [...submissions].sort(() => Math.random() - 0.5);
    setMatch({
      subA: shuffled[0],
      subB: shuffled[1]
    });
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchNextMatch();
    }
  }, [isOpen, submissions]);

  if (!isOpen) return null;

  const handleVote = async (winnerId) => {
    if (!match || voting) return;
    setVoting(true);
    await votePairwiseDuel(match.subA.id, match.subB.id, winnerId);
    setVoting(false);
    fetchNextMatch();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '980px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #f43f5e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)'
            }}>
              <Swords size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                  Pairwise Comparison Duel Arena
                </h2>
                <span className="badge badge-amber">Glicko-2 / Elo Rating</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Pick the stronger project overall to instantly refine the global ranking matrix.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={fetchNextMatch}
              title="Skip to another matchup"
            >
              <RefreshCw size={14} /> Skip Match
            </button>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Duel Matchup Arena */}
        <div style={{ padding: '28px' }}>
          {loading || !match ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Loading candidate projects...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '20px',
              alignItems: 'stretch'
            }}>
              {/* Project A Card */}
              <div
                className="glass-panel duel-card"
                onClick={() => handleVote(match.subA.id)}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative'
                }}
              >
                <div style={{
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  position: 'relative'
                }}>
                  <img
                    src={match.subA.coverUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80'}
                    alt={match.subA.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="badge badge-violet" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    Option A
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>{match.subA.teamName}</span>
                  <span className="badge badge-cyan">Elo: {match.subA.pairwiseScore || 1200}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {match.subA.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px', flex: 1 }}>
                  {match.subA.tagline || match.subA.description?.slice(0, 100)}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                  {match.subA.techStack?.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: 'auto' }}
                  disabled={voting}
                >
                  <Zap size={16} /> Vote for {match.subA.title.split(':')[0]}
                </button>
              </div>

              {/* VS Divider */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 8px'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#1e293b',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: '#f43f5e',
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}>
                  VS
                </div>
              </div>

              {/* Project B Card */}
              <div
                className="glass-panel duel-card"
                onClick={() => handleVote(match.subB.id)}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative'
                }}
              >
                <div style={{
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  position: 'relative'
                }}>
                  <img
                    src={match.subB.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
                    alt={match.subB.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="badge badge-cyan" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    Option B
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>{match.subB.teamName}</span>
                  <span className="badge badge-cyan">Elo: {match.subB.pairwiseScore || 1200}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {match.subB.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px', flex: 1 }}>
                  {match.subB.tagline || match.subB.description?.slice(0, 100)}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                  {match.subB.techStack?.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-cyan btn-lg"
                  style={{ width: '100%', marginTop: 'auto' }}
                  disabled={voting}
                >
                  <Zap size={16} /> Vote for {match.subB.title.split(':')[0]}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
