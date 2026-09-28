import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Users, 
  LifeBuoy, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  MessageSquare, 
  Shield, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function MentorshipView({ onOpenRequestModal }) {
  const { 
    mentorTickets, 
    judges, 
    currentRole, 
    selectedJudgeId, 
    userName, 
    updateMentorTicket,
    config
  } = useHackathon();

  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'OPEN' | 'RESOLVED'
  const [resolveNotes, setResolveNotes] = useState({});

  const filteredTickets = mentorTickets.filter((t) => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  const handleClaim = (ticketId) => {
    const currentJudge = judges.find(j => j.id === selectedJudgeId);
    const claimer = currentJudge ? currentJudge.name : (currentRole === 'ORGANIZER' ? 'Organizer Ops' : userName);
    updateMentorTicket(ticketId, { status: 'IN_PROGRESS', claimedBy: claimer });
  };

  const handleResolve = (ticketId) => {
    const note = resolveNotes[ticketId] || 'Assistance provided via Discord Office Hours.';
    updateMentorTicket(ticketId, { status: 'RESOLVED', notes: note });
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
              [ LIVE MENTOR DESK &amp; OFFICE HOURS ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              4 VERIFIED MENTORS ON DUTY
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            1-on-1 Engineering &amp; Judging Help Desk
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '680px' }}>
            Stuck on Docker multi-stage builds, Glicko-2 math, SQLite concurrency, or pitch presentation? Request assistance from industry mentors.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenRequestModal}>
          <LifeBuoy size={16} /> [ Request Mentor Assistance ]
        </button>
      </div>

      {/* Mentor Roster */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">01</span>
          <span className="df-section-tag">[ 01 / ON-CALL MENTOR ROSTER ]</span>
          <span className="df-section-rule" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '16px'
        }}>
          {judges.map((judge) => (
            <div
              key={judge.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <img
                src={judge.avatar}
                alt={judge.name}
                style={{ width: '56px', height: '56px', border: '1px solid var(--df-teal)', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <strong style={{ fontFamily: 'var(--font-syne)', fontSize: '1rem', color: '#fff' }}>
                    {judge.name}
                  </strong>
                  <span className="df-live-dot" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--df-text-dim)', marginBottom: '6px' }}>
                  {judge.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {judge.specialties?.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="badge badge-teal" style={{ fontSize: '0.65rem', padding: '1px 4px' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Ticket Queue */}
      <div>
        <div className="df-section-header">
          <span className="df-ghost-num">02</span>
          <span className="df-section-tag">[ 02 / REALTIME HELP TICKET QUEUE ]</span>
          <span className="df-section-rule" />
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={statusFilter === 'ALL' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ All Tickets ({mentorTickets.length}) ]
          </button>
          <button
            onClick={() => setStatusFilter('OPEN')}
            className={statusFilter === 'OPEN' ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Open &amp; In-Progress ({mentorTickets.filter(t => t.status !== 'RESOLVED').length}) ]
          </button>
          <button
            onClick={() => setStatusFilter('RESOLVED')}
            className={statusFilter === 'RESOLVED' ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Resolved ({mentorTickets.filter(t => t.status === 'RESOLVED').length}) ]
          </button>
        </div>

        {/* Ticket List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredTickets.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              background: 'var(--df-surface)',
              border: '1px solid var(--df-border)',
              color: 'var(--df-text-dim)',
              fontFamily: 'var(--font-mono)'
            }}>
              <LifeBuoy size={36} color="var(--df-text-dim)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--df-text)' }}>NO ACTIVE TICKETS</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>All help requests have been answered or queue is empty.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => {
              const isResolved = ticket.status === 'RESOLVED';
              const isInProgress = ticket.status === 'IN_PROGRESS';

              return (
                <div
                  key={ticket.id}
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    borderLeft: isResolved ? '4px solid #10b981' : (isInProgress ? '4px solid #f59e0b' : '4px solid var(--df-pink)'),
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <div style={{ flex: '1 1 340px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge badge-pink" style={{ fontSize: '0.72rem' }}>
                        {ticket.category}
                      </span>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-teal)' }}>
                        {ticket.teamName}
                      </strong>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--df-text-dim)' }}>
                        • {new Date(ticket.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                      {ticket.topic}
                    </h3>

                    {ticket.notes && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--df-text-muted)', lineHeight: 1.5, marginBottom: '6px' }}>
                        <span style={{ color: 'var(--df-text-dim)' }}>Resolution Notes: </span>
                        {ticket.notes}
                      </p>
                    )}

                    {ticket.claimedBy && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--df-teal)' }}>
                        Assigned Mentor: <strong>{ticket.claimedBy}</strong>
                      </div>
                    )}
                  </div>

                  {/* Actions depending on role */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isResolved ? (
                      <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                        <CheckCircle2 size={13} /> Resolved
                      </span>
                    ) : (
                      <>
                        {!ticket.claimedBy && (currentRole === 'JUDGE' || currentRole === 'ORGANIZER') && (
                          <button
                            className="btn btn-cyan btn-sm"
                            onClick={() => handleClaim(ticket.id)}
                          >
                            <UserCheck size={14} /> Claim Ticket
                          </button>
                        )}

                        {(currentRole === 'JUDGE' || currentRole === 'ORGANIZER') && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleResolve(ticket.id)}
                          >
                            <CheckCircle2 size={14} /> Mark Resolved
                          </button>
                        )}

                        <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                          <Clock size={12} /> {isInProgress ? 'Mentor Helping' : 'Queued'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
