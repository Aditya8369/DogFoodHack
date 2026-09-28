import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Heart, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Award, 
  Sliders, 
  Eye, 
  Code2 
} from 'lucide-react';

export function ProjectCard({ project, onSelect, onScore }) {
  const { currentRole, tracks, upvoteProject, evaluations, selectedJudgeId } = useHackathon();

  const trackObj = tracks.find(t => t.id === project.track) || { name: project.track || 'Core Platform' };
  
  // Check if current judge has scored this project
  const judgeEval = evaluations.find(e => e.submissionId === project.id && e.judgeId === selectedJudgeId);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--df-surface)',
      border: '1px solid var(--df-border)',
      position: 'relative',
      transition: 'border-color 0.2s ease, transform 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--df-teal)'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--df-border)'}
    >
      {/* Cover Image with Grayscale Hover Transition */}
      <div style={{
        height: '160px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0E1428',
        borderBottom: '1px solid var(--df-border)'
      }}>
        <img
          src={project.coverUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0.9) contrast(1.1)',
            transition: 'filter 0.3s ease, transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0) contrast(1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(0.9) contrast(1.1)'}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11, 16, 32, 0.2) 0%, rgba(11, 16, 32, 0.85) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Track Badge */}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <span style={{
            background: 'var(--df-surface-2)',
            border: '1px solid var(--df-border)',
            color: 'var(--df-teal)',
            fontFamily: 'var(--font-vt)',
            fontSize: '14px',
            letterSpacing: '0.12em',
            padding: '2px 8px',
            textTransform: 'uppercase'
          }}>
            [ {trackObj.name.split(':')[0]} ]
          </span>
        </div>

        {/* Upvote Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            upvoteProject(project.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'var(--df-bg)',
            border: '1px solid var(--df-border)',
            padding: '3px 8px',
            color: 'var(--df-pink)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Heart size={13} color="var(--df-pink)" fill="var(--df-pink)" />
          <span>{project.upvotes || 0}</span>
        </button>

        {/* Project Logo and Team */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img
            src={project.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'}
            alt="Logo"
            style={{
              width: '36px',
              height: '36px',
              border: '1px solid var(--df-teal)',
              objectFit: 'cover'
            }}
          />
          <div>
            <span style={{ fontFamily: 'var(--font-syne)', fontSize: '0.82rem', color: 'var(--df-teal)', fontWeight: 700 }}>
              {project.teamName || 'Builder Team'}
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--df-text-dim)' }}>
              Elo: <strong style={{ color: 'var(--df-pink)' }}>{project.pairwiseScore || 1200}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-syne)',
          fontSize: '1.05rem',
          fontWeight: 800,
          letterSpacing: '0.01em',
          color: 'var(--df-text)',
          marginBottom: '6px',
          lineHeight: 1.2
        }}>
          {project.title}
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: 'var(--df-text-muted)',
          lineHeight: 1.5,
          marginBottom: '14px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.tagline || project.description?.slice(0, 120)}
        </p>

        {/* Tech Stack Chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '16px',
          marginTop: 'auto'
        }}>
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              padding: '2px 6px',
              background: 'var(--df-bg)',
              color: 'var(--df-text-dim)',
              border: '1px solid var(--df-border)',
              fontFamily: 'var(--font-mono)'
            }}>
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--df-text-faint)', alignSelf: 'center', fontFamily: 'var(--font-mono)' }}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Evaluation status indicator & Action Buttons */}
        <div style={{
          paddingTop: '12px',
          borderTop: '1px solid var(--df-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            {judgeEval ? (
              <span style={{
                fontFamily: 'var(--font-vt)',
                fontSize: '14px',
                color: 'var(--df-teal)',
                letterSpacing: '0.1em'
              }}>
                [ EVALUATED ✓ ]
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--df-text-dim)' }}>
                {project.evaluationCount || 0} reviews
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onSelect(project)}
              title="View Submission Details"
              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
            >
              [ Details ]
            </button>

            {currentRole === 'JUDGE' && (
              <button
                className={judgeEval ? "btn btn-outline btn-sm" : "btn btn-primary btn-sm"}
                onClick={() => onScore(project)}
                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
              >
                {judgeEval ? '[ Re-Score ]' : '[ Judge ]'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
