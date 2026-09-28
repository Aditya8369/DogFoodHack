import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Users, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Mail, 
  Github, 
  Globe, 
  Search, 
  Filter, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export function TeamsView({ onOpenCreateTeam, onOpenSeekerModal }) {
  const { teams, tracks, hackerSeekers, joinTeam, showToast } = useHackathon();

  const [activeTab, setActiveTab] = useState('squads'); // 'squads' | 'seekers'
  const [joiningTeamId, setJoiningTeamId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Fullstack Developer');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const handleJoin = async (teamId) => {
    if (!userName.trim()) {
      showToast('Please enter your name to join squad.', 'warning');
      return;
    }
    const ok = await joinTeam(teamId, { userName, userRole });
    if (ok) {
      setJoiningTeamId(null);
      setUserName('');
    }
  };

  const filteredTeams = teams.filter(t => {
    const q = searchQuery.toLowerCase();
    return !q || 
      t.name.toLowerCase().includes(q) || 
      t.members?.some(m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q));
  });

  const filteredSeekers = hackerSeekers.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      s.name.toLowerCase().includes(q) || 
      s.role.toLowerCase().includes(q) || 
      s.skills?.some(skill => skill.toLowerCase().includes(q));
    const matchesRole = roleFilter === 'ALL' || s.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '80px' }}>
      
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
          <div style={{ fontFamily: 'var(--font-vt)', fontSize: '16px', color: 'var(--df-teal)', letterSpacing: '0.14em', marginBottom: '4px' }}>
            [ DIRECTORY &amp; MATCHMAKER ]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: 0 }}>
            Hackathon Squads &amp; Teammate Finder
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>
            Find teammates, recruit missing skills, or assemble your cross-functional engineering squad.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button className="btn btn-primary" onClick={onOpenSeekerModal}>
            <UserPlus size={15} /> [ Find a Squad / Post Profile ]
          </button>
          <button className="btn btn-cyan" onClick={onOpenCreateTeam}>
            <Users size={15} /> [ Create New Squad ]
          </button>
        </div>
      </div>

      {/* Tabs Switcher and Search */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        background: 'var(--df-surface)',
        padding: '16px 20px',
        border: '1px solid var(--df-border)'
      }}>
        {/* View Switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('squads')}
            className={activeTab === 'squads' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Squad Directory ({teams.length}) ]
          </button>
          <button
            onClick={() => setActiveTab('seekers')}
            className={activeTab === 'seekers' ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Looking for Teammates ({hackerSeekers.length}) ]
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <Search size={15} color="var(--df-text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            className="input-field"
            placeholder={activeTab === 'squads' ? "Search squads by name or member..." : "Search seekers by skill (React, Docker, AI)..."}
            style={{ paddingLeft: '36px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* View 1: Squad Directory */}
      {activeTab === 'squads' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          gap: '20px'
        }}>
          {filteredTeams.map((team) => {
            const trackObj = tracks.find(t => t.id === team.track);
            const isJoining = joiningTeamId === team.id;

            return (
              <div
                key={team.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: team.lookingForMembers ? '1px solid var(--df-teal)' : '1px solid var(--df-border)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-teal">{trackObj?.name?.split(':')[0] || 'General'}</span>
                    {team.lookingForMembers ? (
                      <span className="badge badge-pink">
                        <Sparkles size={12} /> Recruiting Members
                      </span>
                    ) : (
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={12} /> Full Squad
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
                    {team.name}
                  </h3>

                  {/* Team Members List */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-vt)', fontSize: '0.95rem', color: 'var(--df-text-dim)', marginBottom: '8px', letterSpacing: '0.1em' }}>
                      SQUAD ROSTER ({team.members?.length || 0})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {team.members?.map((m, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'var(--df-bg)',
                            border: '1px solid var(--df-border)',
                            padding: '6px 12px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.82rem'
                          }}
                        >
                          <span style={{ fontWeight: 600, color: '#fff' }}>{m.name}</span>
                          <span style={{ color: 'var(--df-teal)' }}>{m.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open Roles if any */}
                  {team.openRoles && team.openRoles.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-vt)', fontSize: '0.95rem', color: 'var(--df-pink)', marginBottom: '6px' }}>
                        OPEN POSITIONS:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {team.openRoles.map((r, i) => (
                          <span key={i} className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Join action */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--df-border)' }}>
                  {team.lookingForMembers && !isJoining && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => setJoiningTeamId(team.id)}
                    >
                      <UserPlus size={14} /> Join This Squad
                    </button>
                  )}

                  {isJoining && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Your Name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Your Skill / Role (e.g. Docker Engineer)"
                        value={userRole}
                        onChange={e => setUserRole(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1 }}
                          onClick={() => handleJoin(team.id)}
                        >
                          Confirm Join
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setJoiningTeamId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Looking for Teammates / Seeker Board */}
      {activeTab === 'seekers' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '20px'
        }}>
          {filteredSeekers.map((seeker) => (
            <div
              key={seeker.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '4px solid var(--df-pink)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-pink" style={{ fontSize: '0.72rem' }}>
                    Available for Squad
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--df-text-dim)' }}>
                    {seeker.timezone}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                  {seeker.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-teal)', fontWeight: 600, marginBottom: '12px' }}>
                  {seeker.role}
                </div>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {seeker.bio}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {seeker.skills?.map((skill, idx) => (
                    <span key={idx} style={{
                      background: 'var(--df-surface-2)',
                      border: '1px solid var(--df-border)',
                      color: 'var(--df-text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      padding: '2px 8px'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '14px', borderTop: '1px solid var(--df-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {seeker.github ? (
                  <a
                    href={seeker.github.startsWith('http') ? seeker.github : `https://github.com/${seeker.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--df-text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textDecoration: 'none' }}
                  >
                    <Github size={14} /> GitHub
                  </a>
                ) : <span />}

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast(`Invite sent to ${seeker.name}! Connect in Discord #team-matchmaker.`, 'success')}
                >
                  <MessageSquare size={13} /> [ Invite to Squad ]
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
