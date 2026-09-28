import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { X, Sparkles, Code2, Link, Image, FileText, Send, Check } from 'lucide-react';

export function SubmissionModal({ isOpen, onClose }) {
  const { tracks, createSubmission } = useHackathon();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    track: tracks[0]?.id || 'track-core',
    teamName: '',
    techStack: 'React, Node.js, Docker, SQLite',
    repoUrl: 'https://github.com/myteam/dogfood-project',
    demoUrl: 'https://demo.dogfood2026.dev',
    videoUrl: 'https://youtube.com/watch?v=demo',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    description: `## Problem Statement
Building a hackathon platform that is easy to self-host with Docker and handles the whole 72-hour lifecycle.

## Architecture
- Modern React + Custom Obsidian UI
- Robust Express & SSE real-time stream
- Z-Score normalized rubric judging & Bradley-Terry pairwise rating
- 1-Command Docker Compose deployment`
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFillDemo = () => {
    setFormData({
      title: 'Vortex: Autonomous Hackathon & Verification Engine',
      tagline: 'Self-healing hackathon node with containerized git commit verification and Elo duels.',
      track: 'track-core',
      teamName: 'Vortex Builders',
      techStack: 'React 18, Node.js, Docker, SQLite, SSE, Tailwind-Free CSS',
      repoUrl: 'https://github.com/vortex-team/vortex-engine',
      demoUrl: 'https://vortex.dogfood.dev',
      videoUrl: 'https://youtube.com/watch?v=vortex-demo',
      logoUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      description: `## Introduction
Vortex was architected for Dogfood 2026 to ensure zero judge bias and instantaneous 1-click Docker deployment.

### Key Highlights
- **Instant Docker Deployment**: \`docker compose up -d\` runs in seconds.
- **Pairwise Glicko-2 Showdowns**: Rapid comparisons for judges.
- **Z-Score Normalization**: Ensures fair evaluation across strict and generous reviewers.
- **Embedded Persistent Storage**: Zero external cloud databases needed.`
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setSubmitting(true);
    const success = await createSubmission({
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
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
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="#8b5cf6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Dogfood 2026 Project Submission Studio
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Publish your 72-hour hackathon project to judges & public showcase
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleFillDemo}
              title="Auto-fill with sample project data"
            >
              Fill Sample Data
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Title */}
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Project Title *</label>
              <input
                type="text"
                name="title"
                className="input-field"
                placeholder="e.g. HyperSync: Real-Time Judging Matrix"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tagline */}
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Short Tagline (Pitch in one sentence)</label>
              <input
                type="text"
                name="tagline"
                className="input-field"
                placeholder="e.g. Autonomous scoring engine with Glicko-2 pairwise duels and self-hosting."
                value={formData.tagline}
                onChange={handleChange}
              />
            </div>

            {/* Track Selection */}
            <div className="input-group">
              <label className="input-label">Hackathon Track *</label>
              <select
                name="track"
                className="select-field"
                value={formData.track}
                onChange={handleChange}
              >
                {tracks.map(t => (
                  <option key={t.id} value={t.id} style={{ background: '#0d111a' }}>
                    {t.name} ({t.prize})
                  </option>
                ))}
              </select>
            </div>

            {/* Team Name */}
            <div className="input-group">
              <label className="input-label">Team Name *</label>
              <input
                type="text"
                name="teamName"
                className="input-field"
                placeholder="e.g. CyberDynasty"
                value={formData.teamName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tech Stack */}
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Tech Stack (comma-separated)</label>
              <input
                type="text"
                name="techStack"
                className="input-field"
                placeholder="e.g. React 18, Node.js, Docker, SQLite, SSE"
                value={formData.techStack}
                onChange={handleChange}
              />
            </div>

            {/* Repo URL */}
            <div className="input-group">
              <label className="input-label">GitHub / GitLab Repository URL</label>
              <input
                type="url"
                name="repoUrl"
                className="input-field"
                placeholder="https://github.com/username/project"
                value={formData.repoUrl}
                onChange={handleChange}
              />
            </div>

            {/* Live Demo URL */}
            <div className="input-group">
              <label className="input-label">Live Demo URL</label>
              <input
                type="url"
                name="demoUrl"
                className="input-field"
                placeholder="https://my-app.dev"
                value={formData.demoUrl}
                onChange={handleChange}
              />
            </div>

            {/* Cover Image URL */}
            <div className="input-group">
              <label className="input-label">Cover Image URL (Unsplash or hosted)</label>
              <input
                type="url"
                name="coverUrl"
                className="input-field"
                placeholder="https://images.unsplash.com/..."
                value={formData.coverUrl}
                onChange={handleChange}
              />
            </div>

            {/* Video Demo URL */}
            <div className="input-group">
              <label className="input-label">Video Demo Link (YouTube / Loom)</label>
              <input
                type="url"
                name="videoUrl"
                className="input-field"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </div>

            {/* Description / Markdown */}
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="input-label">Project Story & Architecture (Markdown Supported) *</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    style={{
                      background: !previewMode ? '#8b5cf6' : 'transparent',
                      color: !previewMode ? '#fff' : 'var(--text-muted)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(true)}
                    style={{
                      background: previewMode ? '#8b5cf6' : 'transparent',
                      color: previewMode ? '#fff' : 'var(--text-muted)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {!previewMode ? (
                <textarea
                  name="description"
                  className="textarea-field"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the problem, your architecture, self-hosting setup, and why it wins..."
                  required
                />
              ) : (
                <div style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  minHeight: '160px',
                  whiteSpace: 'pre-line',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)'
                }}>
                  {formData.description || 'No description entered yet.'}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
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
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              <Send size={18} /> {submitting ? 'Submitting...' : 'Submit Project to Hackathon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
