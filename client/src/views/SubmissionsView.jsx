import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Search, Filter, PlusCircle, Layers, SlidersHorizontal } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';

export function SubmissionsView({ onOpenSubmit, onSelectProject, onScoreProject }) {
  const { submissions, tracks } = useHackathon();

  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('votes'); // 'votes' | 'recent' | 'elo'

  // Filter and sort submissions
  const filtered = submissions.filter(sub => {
    const matchesTrack = selectedTrack === 'all' || sub.track === selectedTrack;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      sub.title.toLowerCase().includes(q) || 
      sub.tagline?.toLowerCase().includes(q) || 
      sub.teamName?.toLowerCase().includes(q) ||
      (sub.techStack && sub.techStack.some(t => t.toLowerCase().includes(q)));
    
    return matchesTrack && matchesSearch;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'votes') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'elo') return (b.pairwiseScore || 1200) - (a.pairwiseScore || 1200);
    return new Date(b.submittedAt) - new Date(a.submittedAt);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '80px' }}>
      {/* Header Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        background: 'var(--df-surface)',
        padding: '24px 20px',
        border: '1px solid var(--df-border)'
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-vt)', fontSize: '16px', color: 'var(--df-teal)', letterSpacing: '0.14em', marginBottom: '4px' }}>
            [ DIRECTORY / SUBMISSIONS ]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: 0 }}>
            Hackathon Submissions ({filtered.length})
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', marginTop: '4px' }}>
            Discover and review self-hostable platforms engineered against the Dogfood 2026 specification.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenSubmit}>
          <PlusCircle size={15} /> [ Submit Project ]
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search size={15} color="var(--df-text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search projects by title, tech stack (Docker, SQLite...), or team..."
            style={{ paddingLeft: '36px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Track Filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedTrack('all')}
            className={selectedTrack === 'all' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ All ({submissions.length}) ]
          </button>
          {tracks.map(t => {
            const count = submissions.filter(s => s.track === t.id).length;
            const isSel = selectedTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={isSel ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
              >
                [ {t.name.split(':')[0]} ({count}) ]
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={15} color="var(--df-text-dim)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-field"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
          >
            <option value="votes" style={{ background: '#0B1020', color: '#E6ECFF' }}>SORT: MOST UPVOTED</option>
            <option value="elo" style={{ background: '#0B1020', color: '#E6ECFF' }}>SORT: HIGHEST ELO</option>
            <option value="recent" style={{ background: '#0B1020', color: '#E6ECFF' }}>SORT: RECENTLY SUBMITTED</option>
          </select>
        </div>
      </div>

      {/* Grid of Submissions */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--df-surface)',
          border: '1px solid var(--df-border)',
          color: 'var(--df-text-dim)',
          fontFamily: 'var(--font-mono)'
        }}>
          <Layers size={36} color="var(--df-text-dim)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--df-text)' }}>NO PROJECTS FOUND</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Try adjusting your search queries or submit the first project!</p>
          <button className="btn btn-primary btn-sm" style={{ marginTop: '16px' }} onClick={onOpenSubmit}>
            [ Submit Project ]
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map((sub) => (
            <ProjectCard
              key={sub.id}
              project={sub}
              onSelect={onSelectProject}
              onScore={onScoreProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
