import React from 'react';
import { X, Download, FileText, Database, Code, CheckCircle } from 'lucide-react';

export function ExportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
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
              background: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Download size={18} color="#8b5cf6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Export Hackathon Records
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Download audit scorecards, normalized standings, and submissions
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

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* CSV Leaderboard Card */}
          <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={28} color="#06b6d4" />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Standings & Scorecards (CSV)</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Includes normalized scores, Elo ratings, judge count, repo and demo links.
                </p>
              </div>
            </div>
            <a
              href="/api/export/csv"
              download="dogfood-2026-leaderboard.csv"
              className="btn btn-cyan btn-sm"
              onClick={onClose}
            >
              <Download size={14} /> Download CSV
            </a>
          </div>

          {/* Full Database Snapshot JSON */}
          <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Database size={28} color="#8b5cf6" />
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Complete Database Snapshot (JSON)</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Full dump of configs, teams, all evaluations, audit logs, and pairwise duels.
                </p>
              </div>
            </div>
            <a
              href="/api/export/json"
              download="dogfood-2026-export.json"
              className="btn btn-primary btn-sm"
              onClick={onClose}
            >
              <Download size={14} /> Download JSON
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
