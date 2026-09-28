import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { LifeBuoy, X, Send } from 'lucide-react';

export function RequestMentorModal({ isOpen, onClose }) {
  const { createMentorTicket, teams, showToast } = useHackathon();

  const [teamName, setTeamName] = useState(teams[0]?.name || '');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Docker & Deployment');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim() || !topic.trim()) {
      showToast('Please specify team name and your help question.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const success = await createMentorTicket({
      teamName,
      topic,
      category,
      notes
    });

    setIsSubmitting(false);
    if (success) {
      setTopic('');
      setNotes('');
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
            <LifeBuoy size={18} color="var(--df-teal)" />
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Request 1-on-1 Mentor Assistance
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
              <label className="input-label">Squad / Team Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. HyperSync Dynamics"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Category *</label>
              <select
                className="select-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Docker & Deployment">Docker & Deployment</option>
                <option value="Algorithm & Math">Algorithm & Judging Math (Elo/Z-Score)</option>
                <option value="UI/UX & Design">UI/UX Polish & Frontend Performance</option>
                <option value="Pitch & Demo Presentation">Pitch Walkthrough & Demo Review</option>
                <option value="General Architecture">General Architecture & SQLite</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">What do you need help with? *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Container crashes on start when binding volume in SQLite"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Additional Context / Error logs (Optional)</label>
            <textarea
              className="textarea-field"
              rows={3}
              placeholder="Paste stack traces, repo URLs, or Discord handle where mentors can reach you..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              className="btn btn-cyan btn-sm"
              disabled={isSubmitting}
            >
              <Send size={14} /> [ Submit Ticket to Mentors ]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
