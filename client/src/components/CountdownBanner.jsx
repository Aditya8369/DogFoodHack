import React, { useState, useEffect } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Clock, Award, Flame, Terminal, Shield } from 'lucide-react';

export function CountdownBanner() {
  const { config, currentRole, changePhase } = useHackathon();
  const [timeLeft, setTimeLeft] = useState({ hours: 71, minutes: 42, seconds: 18 });

  useEffect(() => {
    if (!config?.currentPhaseEnd) return;

    const interval = setInterval(() => {
      const diff = new Date(config.currentPhaseEnd) - new Date();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config]);

  const phases = [
    { id: 'REGISTRATION', label: '1. Registration' },
    { id: 'TEAM_BUILDING', label: '2. Teams' },
    { id: 'SUBMISSION', label: '3. Hacking' },
    { id: 'JUDGING', label: '4. Judging' },
    { id: 'RESULTS', label: '5. Results' }
  ];

  const currentStatus = config?.status || 'JUDGING';

  return (
    <div style={{
      background: 'var(--df-surface)',
      borderBottom: '1px solid var(--df-border)',
      padding: '10px 20px',
      fontFamily: 'var(--font-mono)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px'
      }}>
        {/* Left: Phase Status & Prize */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            background: 'var(--df-pink)',
            color: 'var(--df-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            padding: '3px 8px',
            textTransform: 'uppercase'
          }}>
            PHASE // {currentStatus}
          </span>

          <span style={{
            color: 'var(--df-text-dim)',
            fontFamily: 'var(--font-vt)',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            PRIZE POOL: <strong style={{ color: 'var(--df-teal)' }}>{config?.prizesTotal || '$2,500 IN PRIZES'}</strong>
          </span>
        </div>

        {/* Center: Realtime Countdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--df-bg)',
          padding: '4px 14px',
          border: '1px solid var(--df-border)'
        }}>
          <Clock size={14} color="var(--df-pink)" />
          <span style={{
            fontFamily: 'var(--font-vt)',
            fontSize: '1rem',
            letterSpacing: '0.14em',
            color: 'var(--df-text-dim)',
            textTransform: 'uppercase'
          }}>
            COUNTDOWN:
          </span>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--df-text)',
            display: 'flex',
            gap: '3px'
          }}>
            <span style={{ color: 'var(--df-pink)' }}>{String(timeLeft.hours).padStart(2, '0')}h</span> :
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span> :
            <span style={{ color: 'var(--df-teal)' }}>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>

        {/* Right: Phase Stepper / Admin switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {currentRole === 'ORGANIZER' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-vt)', fontSize: '0.95rem', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
                [ OPS SWITCH ]:
              </span>
              {phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => changePhase(p.id)}
                  style={{
                    background: currentStatus === p.id ? 'var(--df-pink)' : 'var(--df-bg)',
                    color: currentStatus === p.id ? 'var(--df-bg)' : 'var(--df-text-dim)',
                    border: currentStatus === p.id ? '1px solid var(--df-pink)' : '1px solid var(--df-border)',
                    padding: '2px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  {p.label.split('. ')[1]}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-vt)', fontSize: '0.95rem', letterSpacing: '0.12em', color: 'var(--df-text-dim)' }}>
              <span>[ 72H SYSTEM LIFECYCLE ]</span>
              <span style={{ color: 'var(--df-teal)' }}>DOCKER PERSISTENT</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
