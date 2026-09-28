import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { UserPlus, X, Send } from 'lucide-react';

export function SeekerProfileModal({ isOpen, onClose }) {
  const { createHackerSeeker, showToast } = useHackathon();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Fullstack Developer');
  const [skills, setSkills] = useState('React, Docker, Node.js, SQLite');
  const [timezone, setTimezone] = useState('UTC');
  const [github, setGithub] = useState('');
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter your name.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const success = await createHackerSeeker({
      name,
      role,
      skills,
      timezone,
      github,
      bio
    });

    setIsSubmitting(false);
    if (success) {
      setName('');
      setBio('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--df-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--df-surface-2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserPlus size={18} color="var(--df-pink)" />
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Post Teammate Seeker Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--df-text-dim)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Your Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Kai Takahashi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Primary Role *</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Frontend Engineer &amp; UI Polish"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Key Skills (Comma-separated)</label>
              <input
                type="text"
                className="input-field"
                placeholder="React, Docker, Python, Glicko-2, WebSockets"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Timezone</label>
              <select
                className="select-field"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="UTC">UTC (Universal)</option>
                <option value="EST (UTC-5)">EST (New York, Toronto)</option>
                <option value="PST (UTC-8)">PST (San Francisco, Seattle)</option>
                <option value="CET (UTC+1)">CET (Berlin, Paris, Lagos)</option>
                <option value="IST (UTC+5:30)">IST (India, Colombo)</option>
                <option value="JST (UTC+9)">JST (Tokyo, Seoul)</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">GitHub / Portfolio URL</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. https://github.com/kaitakahashi"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Short Bio &amp; What You Want to Build</label>
            <textarea
              className="textarea-field"
              rows={3}
              placeholder="Tell squads what technologies you're excited about and what tracks you're aiming for..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              <Send size={14} /> [ Post on Teammate Matchmaker ]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
