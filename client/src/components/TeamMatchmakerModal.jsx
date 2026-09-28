import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { X, Users, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

export function TeamMatchmakerModal({ isOpen, onClose }) {
  const { tracks, createTeam } = useHackathon();

  const [name, setName] = useState('');
  const [track, setTrack] = useState(tracks[0]?.id || 'track-core');
  const [lookingForMembers, setLookingForMembers] = useState(true);
  const [openRoles, setOpenRoles] = useState('Frontend Dev, Docker Specialist');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    setSubmitting(true);
    const success = await createTeam({
      name,
      track,
      lookingForMembers,
      openRoles: openRoles.split(',').map(r => r.trim()).filter(Boolean),
      members: [{ name: 'Team Lead (You)', role: 'Lead Architect', email: 'lead@builder.dev' }]
    });
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={18} color="#06b6d4" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Create a Hackathon Squad
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Form your team and find collaborators for Dogfood 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div className="input-group">
            <label className="input-label">Squad / Team Name *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. CyberMatrix Labs"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Target Hackathon Track *</label>
            <select
              className="select-field"
              value={track}
              onChange={e => setTrack(e.target.value)}
            >
              {tracks.map(t => (
                <option key={t.id} value={t.id} style={{ background: '#0d111a' }}>
                  {t.name} ({t.prize})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Open Roles / Looking For (comma-separated)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Frontend Dev, ML Engineer, UI/UX Designer"
              value={openRoles}
              onChange={e => setOpenRoles(e.target.value)}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            background: 'var(--bg-tertiary)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <input
              type="checkbox"
              id="lookingCheck"
              checked={lookingForMembers}
              onChange={e => setLookingForMembers(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="lookingCheck" style={{ fontSize: '0.88rem', color: '#fff', cursor: 'pointer' }}>
              List on Team Matchmaker Directory (open for hacker join requests)
            </label>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-cyan btn-lg"
              disabled={submitting}
            >
              <UserPlus size={18} /> {submitting ? 'Creating Squad...' : 'Register Squad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
