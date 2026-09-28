import React, { useState, useEffect } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { X, Sliders, CheckCircle2, Star, Sparkles, Award } from 'lucide-react';

export function RubricScoringModal({ project, isOpen, onClose }) {
  const { criteria, selectedJudgeId, judges, evaluations, submitRubricEvaluation } = useHackathon();

  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const currentJudge = judges.find(j => j.id === selectedJudgeId);

  // Initialize scores with existing evaluations or defaults (85)
  useEffect(() => {
    if (project && isOpen) {
      const existing = evaluations.find(e => e.submissionId === project.id && e.judgeId === selectedJudgeId);
      if (existing && existing.scores) {
        const initial = {};
        existing.scores.forEach(s => {
          initial[s.criterionId] = s.score;
        });
        setScores(initial);
        setFeedback(existing.feedback || '');
      } else {
        const defaults = {};
        criteria.forEach(c => {
          defaults[c.id] = 85;
        });
        setScores(defaults);
        setFeedback('');
      }
    }
  }, [project, isOpen, selectedJudgeId, evaluations, criteria]);

  if (!isOpen || !project) return null;

  const handleSliderChange = (critId, val) => {
    setScores(prev => ({ ...prev, [critId]: Number(val) }));
  };

  // Calculate live weighted score
  let weightedSum = 0;
  let totalWeight = 0;
  criteria.forEach(c => {
    const val = scores[c.id] || 0;
    const w = Number(c.weight) || 1;
    weightedSum += val * w;
    totalWeight += w;
  });
  const calculatedTotal = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '0.0';

  const handlePreset = (val) => {
    const preset = {};
    criteria.forEach(c => {
      preset[c.id] = val;
    });
    setScores(preset);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formattedScores = Object.keys(scores).map(cId => ({
      criterionId: cId,
      score: scores[cId]
    }));

    const success = await submitRubricEvaluation(project.id, formattedScores, feedback);
    setSubmitting(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sliders size={20} color="#8b5cf6" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Rubric Evaluation Studio
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Scoring: <strong style={{ color: '#fff' }}>{project.title}</strong> as <span style={{ color: '#a78bfa' }}>{currentJudge?.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Quick Presets & Weighted Result pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Presets:</span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handlePreset(95)}
              >
                Outstanding (95)
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handlePreset(85)}
              >
                Strong (85)
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handlePreset(70)}
              >
                Average (70)
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Weighted Score:</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#38bdf8'
              }}>
                {calculatedTotal} / 100
              </span>
            </div>
          </div>

          {/* Criteria Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            {criteria.map((crit) => {
              const val = scores[crit.id] || 80;
              return (
                <div
                  key={crit.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{crit.name}</strong>
                      <span className="badge badge-violet" style={{ marginLeft: '8px', fontSize: '0.7rem' }}>
                        Weight: {crit.weight}%
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: val >= 90 ? '#34d399' : val >= 75 ? '#38bdf8' : '#fbbf24'
                    }}>
                      {val} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ 100</span>
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {crit.description}
                  </p>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    className="rubric-slider"
                    value={val}
                    onChange={(e) => handleSliderChange(crit.id, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          {/* Feedback Notes */}
          <div className="input-group">
            <label className="input-label">Private Judge Notes & Constructive Feedback</label>
            <textarea
              className="textarea-field"
              rows={3}
              placeholder="What made this project stand out? Any bugs, architectural brilliance, or UI polish notes..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          {/* Actions */}
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
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              <CheckCircle2 size={18} /> {submitting ? 'Saving...' : 'Submit Scorecard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
