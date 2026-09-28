import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  X, 
  Github, 
  ExternalLink, 
  Video, 
  Award, 
  Heart, 
  Sliders, 
  CheckCircle, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export function ProjectDetailModal({ project, isOpen, onClose, onScore }) {
  const { tracks, currentRole, evaluations, criteria, upvoteProject } = useHackathon();

  if (!isOpen || !project) return null;

  const trackObj = tracks.find(t => t.id === project.track) || { name: project.track || 'General' };
  const projectEvals = evaluations.filter(e => e.submissionId === project.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '900px' }} onClick={e => e.stopPropagation()}>
        {/* Cover Header */}
        <div style={{
          height: '240px',
          width: '100%',
          position: 'relative',
          backgroundColor: '#131826'
        }}>
          <img
            src={project.coverUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80'}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.3) 0%, rgba(7, 9, 14, 0.95) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          {/* Header Info Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={project.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'}
                alt="Logo"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  border: '3px solid #8b5cf6',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-violet">
                    <Award size={12} /> {trackObj.name}
                  </span>
                  <span className="badge badge-cyan">
                    Elo: {project.pairwiseScore || 1200}
                  </span>
                </div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                  {project.title}
                </h1>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  By <strong style={{ color: '#fff' }}>{project.teamName || 'Builder Team'}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => upvoteProject(project.id)}
              >
                <Heart size={14} color="#f43f5e" fill="#f43f5e" /> {project.upvotes || 0} Upvotes
              </button>

              {currentRole === 'JUDGE' && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onClose();
                    onScore(project);
                  }}
                >
                  <Sliders size={14} /> Score in Rubric
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          {/* Quick External Links & Tech Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '20px'
          }}>
            {/* Tech Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.techStack?.map((t, idx) => (
                <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <Github size={14} /> GitHub Repo
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cyan btn-sm"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Video size={14} /> Video Pitch
                </a>
              )}
            </div>
          </div>

          {/* Description / Story */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
              Project Narrative & Architecture
            </h3>
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              whiteSpace: 'pre-line',
              fontSize: '0.92rem',
              lineHeight: '1.7',
              color: 'var(--text-primary)'
            }}>
              {project.description}
            </div>
          </div>

          {/* Judge Reviews & Rubric Breakdowns */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#8b5cf6" />
                Judge Reviews & Normalized Evaluations ({projectEvals.length})
              </h3>
            </div>

            {projectEvals.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)'
              }}>
                No evaluations recorded yet for this project.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {projectEvals.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#8b5cf6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          {ev.judgeName?.[0] || 'J'}
                        </div>
                        <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{ev.judgeName}</strong>
                      </div>
                    </div>

                    {/* Criteria score pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      {ev.scores?.map((sc, idx) => {
                        const crit = criteria.find(c => c.id === sc.criterionId);
                        return (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.78rem',
                              display: 'flex',
                              gap: '6px'
                            }}
                          >
                            <span style={{ color: 'var(--text-secondary)' }}>{crit?.name || sc.criterionId}:</span>
                            <strong style={{ color: '#38bdf8' }}>{sc.score}/100</strong>
                          </div>
                        );
                      })}
                    </div>

                    {ev.feedback && (
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        borderLeft: '2px solid #8b5cf6',
                        paddingLeft: '10px'
                      }}>
                        "{ev.feedback}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
