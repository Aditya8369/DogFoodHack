import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Megaphone, X, Send, AlertTriangle, Info, Sparkles } from 'lucide-react';

export function BroadcastModal({ isOpen, onClose }) {
  const { postAnnouncement, userName, currentRole, showToast } = useHackathon();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('LIVE OPS');
  const [severity, setSeverity] = useState('URGENT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Please fill in both title and announcement body.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const success = await postAnnouncement({
      title,
      content,
      tag,
      severity,
      author: userName || 'Organizer Ops'
    });

    setIsSubmitting(false);
    if (success) {
      setTitle('');
      setContent('');
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
            <Megaphone size={18} color="var(--df-pink)" />
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Broadcast Live Announcement
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
          <div className="input-group">
            <label className="input-label">Announcement Headline *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. ⚡ Pairwise duels are now active for all judges!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Tag / Category</label>
              <select
                className="select-field"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="LIVE OPS">LIVE OPS</option>
                <option value="BOUNTY">BOUNTY</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="DEADLINE">DEADLINE</option>
                <option value="MENTORING">MENTORING</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Severity Level</label>
              <select
                className="select-field"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="URGENT">URGENT (Red Neon)</option>
                <option value="BOUNTY">BOUNTY (Pink Glow)</option>
                <option value="INFO">INFO (Teal Cyan)</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Announcement Content / Instructions *</label>
            <textarea
              className="textarea-field"
              rows={4}
              placeholder="Provide clear details, Discord links, or milestone steps..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Modal Footer Actions */}
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
              <Send size={14} /> [ Broadcast Live to All Hackers ]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
