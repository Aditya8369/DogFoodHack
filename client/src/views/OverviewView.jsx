import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Trophy, 
  Terminal, 
  Layers, 
  Swords, 
  ShieldCheck, 
  Sliders, 
  Sparkles, 
  ArrowRight,
  Cpu,
  CheckCircle2,
  Box,
  Flame,
  FileCode,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';

export function OverviewView({ onOpenSubmit, onSelectProject, onScoreProject, onOpenPairwise }) {
  const { config, tracks, criteria, submissions, setActiveTab } = useHackathon();
  const [activeTier, setActiveTier] = useState('T2');

  const featuredProjects = submissions.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingBottom: '80px' }}>
      
      {/* -------------------------------------------------------------
          00. HERO UNIT & 3D LAYERED TYPOGRAPHY
          ------------------------------------------------------------- */}
      <section style={{
        position: 'relative',
        padding: '30px 0 20px',
        borderBottom: '1px solid var(--df-teal)',
        overflow: 'hidden'
      }}>
        {/* Telemetry Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px 24px',
          fontFamily: 'var(--font-vt)',
          fontSize: '18px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--df-text-dim)',
          marginBottom: '28px'
        }}>
          <span>[ UNIT / DF-01 ]</span>
          <span style={{ color: 'var(--df-text-faint)' }}>51.5310°N 0.0500°E</span>
          <span style={{ color: 'var(--df-text-faint)' }}>REV 2.6</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--df-teal)' }}>
            <span className="df-live-dot" /> SYS READY · REGISTRATION OPEN
          </span>
        </div>

        {/* Massive 3D Extruded Title */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div className="df-hero-title-pink-shadow">DOGFOOD</div>
          <div className="df-hero-title-navy-shadow">DOGFOOD</div>
          <h1 className="df-hero-title">
            <span>DOG</span><span style={{ color: 'var(--df-pink)' }}>F</span><span>OOD</span>
          </h1>
        </div>

        {/* Hero Brief Split Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1px',
          background: 'var(--df-border)',
          borderTop: '1px solid var(--df-teal)',
          borderBottom: '1px solid var(--df-border)'
        }}>
          {/* Left Hero Box */}
          <div style={{
            background: 'var(--df-bg)',
            padding: '30px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--df-text)'
              }}>
                Build the platform<br />
                <span style={{ color: 'var(--df-pink)' }}>that will judge you.</span>
              </h2>
              <p style={{
                margin: '16px 0 0',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.8,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--df-text-dim)'
              }}>
                September 26-29, 2026 · Online<br />
                Free · $2,500 in prizes · Self-Hostable
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
              <button 
                className="btn btn-primary"
                onClick={onOpenSubmit}
              >
                [ Submit Project ]
              </button>
              <button 
                className="btn btn-cyan"
                onClick={onOpenPairwise}
              >
                [ Launch Duels &gt;&gt; ]
              </button>
            </div>
          </div>

          {/* Right Hero Box */}
          <div style={{
            background: 'var(--df-bg)',
            padding: '30px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontFamily: 'var(--font-vt)',
              fontSize: '18px',
              letterSpacing: '0.16em',
              color: 'var(--df-text-dim)',
              marginBottom: '12px'
            }}>
              [ BRIEF / 00 ]
            </div>
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              lineHeight: 1.75,
              color: 'var(--df-text-muted)',
              maxWidth: '68ch'
            }}>
              Thirty-five hackathons in, across 85 countries, we know exactly what a submission and judging platform should do. So does every organizer who has ever run one. What none of us has is a modern, open, self-hostable platform that does it. This is the hackathon where you build it. <span style={{ background: 'var(--df-pink)', color: 'var(--df-bg)', padding: '0 4px', fontWeight: 700 }}>The winning project is the one we run.</span>
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'var(--df-text-faint)',
              paddingTop: '20px'
            }}>
              <span>/// 72-HOUR ACTIVE ENGINE</span>
              <span>DOGFOOD PLATFORM ™</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          01. BY THE NUMBERS
          ------------------------------------------------------------- */}
      <section>
        <div className="df-section-header">
          <span className="df-ghost-num">01</span>
          <span className="df-section-tag">[ 01 / BY THE NUMBERS ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '1px',
          background: 'var(--df-border)',
          border: '1px solid var(--df-border)'
        }}>
          {/* Card 1 */}
          <div style={{
            background: 'var(--df-bg)',
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px'
          }}>
            <div style={{ fontFamily: 'var(--font-vt)', fontSize: '18px', letterSpacing: '0.14em', color: 'var(--df-text-dim)' }}>
              UNIT / N-01 <span style={{ color: 'var(--df-pink)' }}>+</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 0.85, color: 'var(--df-pink)' }}>
              35
            </div>
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: 'var(--df-text-muted)' }}>
              hackathons run since 2023 across 85+ countries. The platform spec comes directly from field experience.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'var(--df-bg)',
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px'
          }}>
            <div style={{ fontFamily: 'var(--font-vt)', fontSize: '18px', letterSpacing: '0.14em', color: 'var(--df-text-dim)' }}>
              UNIT / N-02 <span style={{ color: 'var(--df-pink)' }}>+</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 0.85, color: 'var(--df-pink)' }}>
              0
            </div>
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: 'var(--df-text-muted)' }}>
              major hackathon platforms publish an official public API. The whole ecosystem runs on scrapers and CSVs.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{
            background: 'var(--df-bg)',
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px'
          }}>
            <div style={{ fontFamily: 'var(--font-vt)', fontSize: '18px', letterSpacing: '0.14em', color: 'var(--df-text-dim)' }}>
              UNIT / N-03 <span style={{ color: 'var(--df-pink)' }}>+</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', lineHeight: 0.85, color: 'var(--df-pink)' }}>
              5 hours
            </div>
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: 'var(--df-text-muted)' }}>
              for one judge to score 30 projects, by the largest platform's own official estimate.
            </p>
          </div>

          {/* Card 4 - Highlight */}
          <div style={{
            background: 'var(--df-pink)',
            color: 'var(--df-bg)',
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px'
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(11, 16, 32, 0.7)' }}>
              UNIT / N-04 · COUNTDOWN
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: 0.85, color: 'var(--df-bg)' }}>
              72h
            </div>
            <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, lineHeight: 1.6, color: 'var(--df-bg)' }}>
              to build the open-source platform that replaces all of it.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          02. THE PROBLEM & 10-STAGE EVENT PIPELINE (FIG. 01)
          ------------------------------------------------------------- */}
      <section style={{ borderTop: '1px solid var(--df-teal)', paddingTop: '48px' }}>
        <div className="df-section-header">
          <span className="df-ghost-num">02</span>
          <span className="df-section-tag">[ 02 / THE PROBLEM &amp; EVENT PIPELINE ]</span>
          <span className="df-section-rule" />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: 'var(--df-text)',
          marginBottom: '32px',
          maxWidth: '26ch'
        }}>
          Running a hackathon is a data problem wearing a party hat.
        </h2>

        {/* FIG. 01 Interactive 10-Stage Pipeline */}
        <figure style={{
          margin: '0 0 36px',
          border: '1px solid var(--df-border)',
          background: 'var(--df-surface)'
        }}>
          <figcaption style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '10px 16px',
            borderBottom: '1px solid var(--df-border)',
            fontFamily: 'var(--font-space)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--df-text-dim)'
          }}>
            <span style={{ fontFamily: 'var(--font-anton)', fontSize: '13px', letterSpacing: '0.12em', color: 'var(--df-text)' }}>
              FIG. 01 — EVENT PIPELINE / 10 STAGES
            </span>
            <span style={{ color: 'var(--df-pink)', fontWeight: 700 }}>
              FAILURE SURFACE: STAGE 07
            </span>
          </figcaption>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 115px), 1fr))',
            gap: '1px',
            background: 'var(--df-surface-3)'
          }}>
            {[
              { id: '01', name: 'Registration', alert: false },
              { id: '02', name: 'Teams', alert: false },
              { id: '03', name: 'Submissions', alert: false },
              { id: '04', name: 'Eligibility', alert: false },
              { id: '05', name: 'Assignment', alert: false },
              { id: '06', name: 'Scoring', alert: false },
              { id: '07', name: 'Normalization', alert: true },
              { id: '08', name: 'Results', alert: false },
              { id: '09', name: 'Certificates', alert: false },
              { id: '10', name: 'Archive', alert: false }
            ].map((stg) => (
              <div
                key={stg.id}
                style={{
                  background: stg.alert ? '#2A0F1E' : 'var(--df-surface)',
                  padding: '14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  outline: stg.alert ? '1px solid var(--df-pink)' : 'none',
                  outlineOffset: '-1px'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-space)',
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: stg.alert ? 'var(--df-pink)' : 'var(--df-text-dim)'
                }}>
                  {stg.id}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: stg.alert ? 700 : 500,
                  fontSize: '10.5px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: stg.alert ? 'var(--df-text)' : 'var(--df-text-muted)'
                }}>
                  {stg.name}
                </span>
                <span style={{
                  height: '2px',
                  background: stg.alert ? 'var(--df-pink)' : 'var(--df-border-light)'
                }} />
              </div>
            ))}
          </div>
        </figure>

        {/* Critique & Manifesto */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--df-text-muted)' }}>
            <p>
              Registration, teams, submissions, eligibility, judge assignment, scoring, normalization, results, certificates, and an archive somebody can query two years later. Ten stages, each feeding the next.
            </p>
            <p>
              The incumbents converged. Devpost, Devfolio, HackerEarth and Unstop all ship the same basics. Then they stopped: the market leader <strong style={{ color: 'var(--df-text)' }}>cannot weight its criteria</strong>, none publish their normalization maths, and <strong style={{ color: 'var(--df-text)' }}>not one has an official public API</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <blockquote style={{
              margin: 0,
              padding: '24px 20px',
              border: '1px solid var(--df-pink)',
              background: 'var(--df-surface-2)',
              position: 'relative'
            }}>
              <p style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '1.4rem',
                lineHeight: 1.25,
                color: 'var(--df-text)',
                margin: 0
              }}>
                "Build the platform that will judge you."
              </p>
              <div style={{
                marginTop: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'var(--df-teal)'
              }}>
                [ PULL QUOTE · DOGFOOD 2026 SPEC ]
              </div>
            </blockquote>

            <p style={{
              margin: 0,
              padding: '14px 16px',
              borderLeft: '2px solid var(--df-pink)',
              background: 'var(--df-surface)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--df-text)'
            }}>
              We are not asking you to build a demo of a platform. We are asking you to build ours.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          03. WHAT HAPPENS TO THE WINNER
          ------------------------------------------------------------- */}
      <section style={{ borderTop: '1px solid var(--df-teal)', paddingTop: '48px' }}>
        <div className="df-section-header">
          <span className="df-ghost-num">03</span>
          <span className="df-section-tag">[ 03 / DOSSIER · WHAT HAPPENS TO THE WINNER ]</span>
          <span className="df-section-rule" />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: 'var(--df-text)',
          marginBottom: '24px'
        }}>
          What happens to the winner
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1px',
          background: 'var(--df-border)',
          border: '1px solid var(--df-pink)'
        }}>
          {[
            { num: '01', title: 'You keep your work', body: 'Ship under MIT or Apache-2.0. The repo is yours. No copyright transfer, no CLA, no exclusivity.' },
            { num: '02', title: 'We fork it and run it', body: 'The winning project gets forked, self-hosted, and put into production for actual events.' },
            { num: '03', title: 'Credited where it counts', body: 'A credit line on every event page the platform powers, for as long as it powers them.' },
            { num: '04', title: 'We upstream back', body: 'Every bugfix, security hardening pass and feature we build gets sent back to your repository as a PR.' },
            { num: '05', title: 'This is not a maybe', body: 'We run events worldwide and we intend to run them on whatever wins. Commissioned software in the open.' }
          ].map((item) => (
            <div key={item.num} style={{ background: 'var(--df-surface)', padding: '24px 20px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--df-pink)',
                marginBottom: '10px'
              }}>
                {item.num} / {item.title}
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: 'var(--df-text-muted)' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------
          04. THE TIER LADDER (T1 Core, T2 Judging, T3 Public, T4 Stretch)
          ------------------------------------------------------------- */}
      <section style={{ borderTop: '1px solid var(--df-teal)', paddingTop: '48px' }}>
        <div className="df-section-header">
          <span className="df-ghost-num">04</span>
          <span className="df-section-tag">[ 04 / THE TIER LADDER ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', marginBottom: '28px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: 'var(--df-text)',
            margin: 0
          }}>
            The Tier Ladder
          </h2>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--df-text-muted)', maxWidth: '44ch' }}>
            No tracks. One product, four tiers. Your score is how far up the ladder you climbed cleanly.
          </div>
        </div>

        {/* Tier Ladder Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            {
              tier: 'T1',
              name: 'Core',
              req: 'Required floor',
              items: ['Auth & Sessions', 'Real role model (Visitor, Participant, Judge, Org)', 'Configurable tracks & dates', 'Team formation invites', 'Project submissions studio', 'Deadline enforcement']
            },
            {
              tier: 'T2',
              name: 'Judging',
              req: 'Real engineering',
              items: ['Judge assignment engine', 'Weighted rubric scoring', 'Backend-enforced role isolation', 'Live judge progress matrix', 'Z-Score cross-judge normalization', 'CSV & JSON data exports']
            },
            {
              tier: 'T3',
              name: 'Public',
              req: 'Gamification & Anti-abuse',
              items: ['Community voting & quadratic voting', 'Gallery comments & upvoting', 'Blind voting window (results hidden)', 'Ballot project randomization', 'Rate limiting & audit trail log']
            },
            {
              tier: 'T4',
              name: 'Stretch',
              req: 'Enterprise Ecosystem',
              items: ['Complete REST API & OpenAPI spec', 'Event webhooks architecture', 'Signed verifiable judge credentials', 'Embeddable gallery widget', 'Bulk lossless import & export']
            }
          ].map((t) => (
            <div
              key={t.tier}
              style={{
                background: 'var(--df-surface)',
                border: '1px solid var(--df-border)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--df-border)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--df-pink)' }}>{t.tier}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--df-text)' }}>{t.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)' }}>[ VERIFIED ]</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--df-text-dim)', marginBottom: '14px' }}>
                  {t.req}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--df-text-muted)' }}>
                  {t.items.map((it, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: 'var(--df-pink)' }}>&rarr;</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FIG. 02 Role Isolation Matrix */}
        <figure style={{
          border: '1px solid var(--df-border)',
          background: 'var(--df-surface)',
          overflowX: 'auto'
        }}>
          <figcaption style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderBottom: '1px solid var(--df-border)',
            fontFamily: 'var(--font-space)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--df-text-dim)'
          }}>
            <span style={{ fontFamily: 'var(--font-anton)', fontSize: '13px', color: 'var(--df-text)' }}>
              FIG. 02 — ROLE ISOLATION MATRIX / BACKEND-ENFORCED
            </span>
            <span style={{ color: 'var(--df-teal)' }}>● RESTRICTED AT API LEVEL</span>
          </figcaption>
          <table style={{ width: '100%', minWidth: '560px', fontFamily: 'var(--font-space)', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--df-surface-2)', borderBottom: '1px solid var(--df-border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--df-text-dim)' }}>ACTOR</th>
                <th style={{ padding: '10px', textAlign: 'center', color: 'var(--df-text-dim)' }}>OWN SCORES</th>
                <th style={{ padding: '10px', textAlign: 'center', color: 'var(--df-text-dim)' }}>PEER SCORES</th>
                <th style={{ padding: '10px', textAlign: 'center', color: 'var(--df-text-dim)' }}>OTHER TRACK</th>
                <th style={{ padding: '10px', textAlign: 'center', color: 'var(--df-text-dim)' }}>AGGREGATE ELO</th>
                <th style={{ padding: '10px', textAlign: 'center', color: 'var(--df-text-dim)' }}>AUDIT LOG</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'VISITOR', own: '✗', peer: '✗', other: '✗', agg: '✗', audit: '✗' },
                { role: 'PARTICIPANT', own: '✗', peer: '✗', other: '✗', agg: '✗', audit: '✗' },
                { role: 'JUDGE', own: '+', peer: '✗', other: '✗', agg: '✗', audit: '✗' },
                { role: 'ORGANIZER', own: '+', peer: '+', other: '+', agg: '+', audit: '+' },
                { role: 'ADMIN', own: '+', peer: '+', other: '+', agg: '+', audit: '+' }
              ].map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--df-border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--df-text)' }}>{r.role}</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: r.own === '+' ? 'var(--df-teal)' : 'var(--df-pink)' }}>{r.own}</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: r.peer === '+' ? 'var(--df-teal)' : 'var(--df-pink)' }}>{r.peer}</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: r.other === '+' ? 'var(--df-teal)' : 'var(--df-pink)' }}>{r.other}</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: r.agg === '+' ? 'var(--df-teal)' : 'var(--df-pink)' }}>{r.agg}</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: r.audit === '+' ? 'var(--df-teal)' : 'var(--df-pink)' }}>{r.audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </section>

      {/* -------------------------------------------------------------
          05. SCORING CRITERIA & MATHEMATICAL INTEGRITY (FIG. 03)
          ------------------------------------------------------------- */}
      <section style={{ borderTop: '1px solid var(--df-teal)', paddingTop: '48px' }}>
        <div className="df-section-header">
          <span className="df-ghost-num">05</span>
          <span className="df-section-tag">[ 05 / SCORING CRITERIA &amp; MATHEMATICAL INTEGRITY ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', marginBottom: '28px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: 'var(--df-text)',
            margin: 0
          }}>
            Scoring Maths
          </h2>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--df-text-muted)', maxWidth: '50ch' }}>
            Four weighted criteria evaluated on a 1–5 scale, with automatic Z-Score calibration (Z = (x - μ) / σ) to eliminate harsh/lenient judge bias.
          </div>
        </div>

        {/* 4 Criteria Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--df-border)', border: '1px solid var(--df-border)', marginBottom: '32px' }}>
          {[
            { name: 'Tier Completion & Correctness', weight: '40%', desc: 'How far up the ladder you reached, verified by the acceptance suite. T1 is a gate; above that correctness beats breadth.' },
            { name: 'Judging Integrity', weight: '25%', desc: 'Is role isolation enforced at the API? Is your score normalization method documented and mathematically sound?' },
            { name: 'Adoptability & Operability', weight: '20%', desc: 'One command to run. Seeded with real data. Documentation a stranger can follow without questions.' },
            { name: 'Code Quality & Innovation', weight: '15%', desc: 'Idiomatic architecture, clean schema, and the unique engineering touch that made judges want to steal it.' }
          ].map((c, idx) => (
            <div key={idx} style={{ background: 'var(--df-surface)', padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--df-text)', margin: 0 }}>
                  {c.name}
                </h3>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--df-pink)' }}>
                  {c.weight}
                </span>
              </div>
              <div style={{ height: '6px', background: 'var(--df-surface-3)', border: '1px solid var(--df-border)', marginBottom: '10px' }}>
                <div style={{ height: '100%', width: c.weight, background: 'var(--df-pink)' }} />
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--df-text-muted)' }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FIG. 03 Weight Distribution & Normalization Proof */}
        <figure style={{
          border: '1px solid var(--df-border)',
          background: 'var(--df-surface)'
        }}>
          <figcaption style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderBottom: '1px solid var(--df-border)',
            fontFamily: 'var(--font-space)',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--df-text-dim)'
          }}>
            <span style={{ fontFamily: 'var(--font-anton)', fontSize: '13px', color: 'var(--df-text)' }}>
              FIG. 03 — WEIGHT DISTRIBUTION &amp; Z-SCORE CALIBRATION PROOF
            </span>
            <span style={{ color: 'var(--df-pink)' }}>Σ = 100% · SCALE 1–5</span>
          </figcaption>

          <div style={{ display: 'flex', height: '40px', borderBottom: '1px solid var(--df-border)' }}>
            <div style={{ flex: 40, background: 'var(--df-pink)', display: 'flex', alignItems: 'center', paddingLeft: '12px', fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '11px', color: 'var(--df-bg)' }}>
              40% TIER
            </div>
            <div style={{ flex: 25, background: '#B32A50', display: 'flex', alignItems: 'center', paddingLeft: '12px', fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '11px', color: '#fff' }}>
              25% INTEGRITY
            </div>
            <div style={{ flex: 20, background: '#6B1730', display: 'flex', alignItems: 'center', paddingLeft: '12px', fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '11px', color: '#fff' }}>
              20% ADOPT
            </div>
            <div style={{ flex: 15, background: 'var(--df-surface-3)', display: 'flex', alignItems: 'center', paddingLeft: '12px', fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '11px', color: 'var(--df-text-dim)' }}>
              15% CODE
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1px',
            background: 'var(--df-border)'
          }}>
            <div style={{ background: 'var(--df-surface)', padding: '16px' }}>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--df-text-dim)', marginBottom: '12px' }}>
                RAW JUDGE SPREAD (5 JUDGES)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
                <span style={{ flex: 1, height: '50%', background: '#3A4A70' }} />
                <span style={{ flex: 1, height: '90%', background: '#3A4A70' }} />
                <span style={{ flex: 1, height: '35%', background: '#3A4A70' }} />
                <span style={{ flex: 1, height: '65%', background: '#3A4A70' }} />
                <span style={{ flex: 1, height: '100%', background: '#3A4A70' }} />
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--df-text-dim)' }}>
                σ = 0.94 · UNCALIBRATED
              </div>
            </div>

            <div style={{ background: 'var(--df-surface)', padding: '16px' }}>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--df-pink)', marginBottom: '12px' }}>
                NORMALIZED (Z-SCORE)
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
                <span style={{ flex: 1, height: '64%', background: 'var(--df-pink)' }} />
                <span style={{ flex: 1, height: '72%', background: 'var(--df-pink)' }} />
                <span style={{ flex: 1, height: '58%', background: 'var(--df-pink)' }} />
                <span style={{ flex: 1, height: '68%', background: 'var(--df-pink)' }} />
                <span style={{ flex: 1, height: '76%', background: 'var(--df-pink)' }} />
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--df-teal)' }}>
                σ = 0.31 · BIAS ELIMINATED
              </div>
            </div>

            <div style={{ background: 'var(--df-surface)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-space)', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--df-text-dim)' }}>
                RANK DELTA PROOF
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                <span><span style={{ color: 'var(--df-teal)' }}>▲ 4</span> &nbsp;PROJECT ARCHON</span>
                <span><span style={{ color: 'var(--df-teal)' }}>▲ 2</span> &nbsp;GLICKO MATRIX</span>
                <span><span style={{ color: 'var(--df-pink)' }}>▼ 3</span> &nbsp;LEGACY POLL</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--df-text-dim)' }}>
                FIXTURE SET · 40 ENTRIES
              </div>
            </div>
          </div>
        </figure>
      </section>

      {/* -------------------------------------------------------------
          06. FEATURED SUBMISSIONS GALLERY & QUICK ARENA
          ------------------------------------------------------------- */}
      <section style={{ borderTop: '1px solid var(--df-teal)', paddingTop: '48px' }}>
        <div className="df-section-header">
          <span className="df-ghost-num">06</span>
          <span className="df-section-tag">[ 06 / LIVE SUBMISSIONS GALLERY ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
              textTransform: 'uppercase',
              color: 'var(--df-text)',
              margin: 0
            }}>
              Active Submissions ({submissions.length})
            </h2>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('submissions')}
          >
            [ View All Projects &rarr; ]
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '20px'
        }}>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => onSelectProject(project)}
              onScore={() => onScoreProject(project)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
