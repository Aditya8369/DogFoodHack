import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles, 
  MessageSquare,
  ShieldQuestion
} from 'lucide-react';

export function FaqView() {
  const { faqs, askFaq, showToast } = useHackathon();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedFaqId, setExpandedFaqId] = useState(faqs[0]?.id || null);
  
  // Ask form state
  const [questionText, setQuestionText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['ALL', 'General', 'Self-Hosting & Tech', 'Judging & Scoring', 'Prizes & Tracks', 'Submissions & Repo'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = selectedCategory === 'ALL' || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      faq.question.toLowerCase().includes(q) || 
      faq.answer.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedFaqId(prev => prev === id ? null : id);
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      showToast('Please type your question.', 'warning');
      return;
    }
    setIsSubmitting(true);
    await askFaq({ question: questionText, askedBy: authorName || 'Anonymous Hacker' });
    setQuestionText('');
    setAuthorName('');
    setIsSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '28px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'var(--df-pink)',
              color: 'var(--df-bg)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              padding: '2px 8px'
            }}>
              [ KNOWLEDGE BASE &amp; FAQ ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              COMMUNITY DIRECTORY
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '680px' }}>
            Find immediate answers on judging mathematics, Docker runtime constraints, team eligibility, and submission verification.
          </p>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
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
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={15} color="var(--df-text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search questions by keyword (e.g., Docker, Elo, Prize, Rules)..."
            style={{ paddingLeft: '36px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
            >
              [ {cat} ]
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedFaqId === faq.id;

          return (
            <div
              key={faq.id}
              className="glass-panel"
              style={{
                border: isExpanded ? '1px solid var(--df-teal)' : '1px solid var(--df-border)',
                transition: 'all 0.2s ease'
              }}
            >
              <div
                onClick={() => toggleExpand(faq.id)}
                style={{
                  padding: '18px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge badge-pink" style={{ fontSize: '0.72rem' }}>
                    {faq.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: isExpanded ? 'var(--df-teal)' : '#fff',
                    margin: 0
                  }}>
                    {faq.question}
                  </h3>
                </div>

                <div style={{ color: 'var(--df-text-dim)' }}>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  padding: '0 24px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                  color: 'var(--df-text-muted)',
                  borderTop: '1px solid var(--df-border)',
                  paddingTop: '16px'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask an Organizer Form */}
      <div className="glass-panel" style={{ padding: '28px', borderTop: '2px solid var(--df-pink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <MessageSquare size={18} color="var(--df-pink)" />
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Have a question not listed here?
          </h2>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-text-dim)', marginBottom: '20px' }}>
          Submit your question directly to the hackathon organizers during the live AMA.
        </p>

        <form onSubmit={handleAsk} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '14px' }}>
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label">Your Name / Team Handle (Optional)</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Maya Lin (@hypersync)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">Your Question *</label>
            <textarea
              className="textarea-field"
              placeholder="Ask about evaluation rules, Docker configuration, or track eligibility..."
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isSubmitting}
            style={{ alignSelf: 'flex-start' }}
          >
            <Send size={14} /> [ Submit Question to Organizers ]
          </button>
        </form>
      </div>
    </div>
  );
}
