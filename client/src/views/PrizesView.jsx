import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Cpu, 
  Layers, 
  Box, 
  CheckCircle, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Gift,
  Coins
} from 'lucide-react';

export function PrizesView({ onOpenSubmit }) {
  const { tracks, criteria, config, showToast } = useHackathon();
  const [selectedTrack, setSelectedTrack] = useState('track-core');

  const sponsorPerks = [
    {
      title: "AWS Cloud & Bedrock AI Credits",
      sponsor: "Amazon Web Services",
      value: "$10,000 Credits",
      description: "Free EC2, ECS, and Bedrock compute credits for every verified team.",
      code: "DOGFOOD2026-AWS-HACK"
    },
    {
      title: "Docker Pro Subscriptions",
      sponsor: "Docker Inc.",
      value: "1-Year Team Access",
      description: "High-speed multi-arch container image builds and automated vulnerability scanning.",
      code: "DOCKER-DOGFOOD-PRO"
    },
    {
      title: "GitHub Copilot Enterprise Access",
      sponsor: "GitHub",
      value: "Hackathon Free Tier",
      description: "AI-assisted pair programming and automated PR summaries.",
      code: "GITHUB-DOGFOOD-DEV"
    },
    {
      title: "JetBrains All Products Pack",
      sponsor: "JetBrains",
      value: "6-Month License",
      description: "Full IDE suite including WebStorm, GoLand, PyCharm, and CLion.",
      code: "JETBRAINS-DF2026"
    }
  ];

  const handleCopyCode = (code, title) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied perk coupon for ${title}!`, 'success');
  };

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
              [ PRIZE POOL MATRIX ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              DIRECT CASH & BOUNTIES
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            {config?.prizesTotal || '$45,000 USD'} in Cash &amp; Bounties
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '680px' }}>
            Compete across four dedicated architectural tracks or aim for the Grand Prix. Plus developer credits from top infrastructure partners.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenSubmit}>
          <Trophy size={16} /> [ Enter Competition ]
        </button>
      </div>

      {/* Main Track Bounties Grid */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">01</span>
          <span className="df-section-tag">[ 01 / TRACK BOUNTIES ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px'
        }}>
          {tracks.map((track, idx) => {
            const isGrand = idx === 0;
            return (
              <div
                key={track.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isGrand ? '2px solid var(--df-pink)' : '1px solid var(--df-border)',
                  background: isGrand ? 'linear-gradient(180deg, rgba(255, 61, 110, 0.08) 0%, var(--df-surface) 100%)' : 'var(--df-surface)',
                  position: 'relative'
                }}
              >
                {isGrand && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '16px',
                    background: 'var(--df-pink)',
                    color: 'var(--df-bg)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    padding: '2px 8px',
                    textTransform: 'uppercase'
                  }}>
                    ★ FLAGSHIP TRACK
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.78rem' }}>
                      {track.sponsor || 'Official Track'}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      color: isGrand ? 'var(--df-pink)' : 'var(--df-teal)'
                    }}>
                      {track.prize}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '10px'
                  }}>
                    {track.name}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    color: 'var(--df-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '16px'
                  }}>
                    {track.description}
                  </p>
                </div>

                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--df-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--df-text-dim)'
                }}>
                  <span>Automated Rubric + Elo</span>
                  <span style={{ color: 'var(--df-teal)' }}>Open to All Teams</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Judging Criteria & Rubric Weights Breakdown */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">02</span>
          <span className="df-section-tag">[ 02 / OFFICIAL SCORING WEIGHTS ]</span>
          <span className="df-section-rule" />
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '16px'
          }}>
            {criteria.map((crit) => (
              <div
                key={crit.id}
                style={{
                  background: 'var(--df-bg)',
                  border: '1px solid var(--df-border)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontFamily: 'var(--font-syne)', fontSize: '0.95rem', color: '#fff' }}>
                    {crit.name}
                  </strong>
                  <span style={{
                    background: 'var(--df-teal-dim)',
                    color: 'var(--df-teal)',
                    border: '1px solid var(--df-teal)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '1px 6px'
                  }}>
                    {crit.weight}%
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--df-text-dim)', lineHeight: 1.5, margin: 0 }}>
                  {crit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Developer Perks & Cloud Credits Vault */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">03</span>
          <span className="df-section-tag">[ 03 / DEVELOPER PERKS &amp; CLOUD CREDITS ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '16px'
        }}>
          {sponsorPerks.map((perk, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-vt)', fontSize: '1rem', color: 'var(--df-text-dim)' }}>
                    {perk.sponsor}
                  </span>
                  <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>
                    {perk.value}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {perk.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--df-text-muted)', lineHeight: 1.5 }}>
                  {perk.description}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--df-border)' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', fontSize: '0.75rem' }}
                  onClick={() => handleCopyCode(perk.code, perk.title)}
                >
                  <Gift size={13} /> [ Copy Claim Code: {perk.code} ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
