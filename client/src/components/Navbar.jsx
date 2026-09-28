import React, { useState, useEffect } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Trophy, 
  Layers, 
  CheckSquare, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Download, 
  PlusCircle,
  Sparkles, 
  Terminal, 
  Calendar, 
  Gift, 
  BookOpen, 
  LifeBuoy, 
  HelpCircle, 
  Megaphone, 
  Menu, 
  X,
  GitBranch,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export function Navbar({ onOpenSubmit, onOpenExport, onOpenBroadcast }) {
  const { 
    activeTab, 
    setActiveTab, 
    currentRole, 
    setCurrentRole, 
    judges, 
    selectedJudgeId, 
    handleSelectJudge,
    submissions,
    mentorTickets,
    announcements
  } = useHackathon();

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const openTicketsCount = mentorTickets.filter(t => t.status !== 'RESOLVED').length;

  const navCategories = [
    {
      category: 'CORE PLATFORM & ARCHITECTURE',
      color: 'var(--df-teal)',
      items: [
        { 
          id: 'overview', 
          label: 'Brief & Spec', 
          desc: 'Hackathon vision, track specifications & rules', 
          icon: Layers,
          badge: null
        },
        { 
          id: 'git-presentation', 
          label: 'Git Presentation', 
          desc: '72h Git architecture, workflows & slide deck', 
          icon: GitBranch, 
          badge: 'NEW' 
        },
        { 
          id: 'schedule', 
          label: 'Schedule Timeline', 
          desc: '72-hour milestone checklist & deadlines', 
          icon: Calendar,
          badge: null
        },
        { 
          id: 'prizes', 
          label: 'Prizes & Tracks', 
          desc: '$45,000 USD prize breakdown & sponsor bounties', 
          icon: Gift,
          badge: null
        }
      ]
    },
    {
      category: 'PROJECTS & SQUADS',
      color: 'var(--df-pink)',
      items: [
        { 
          id: 'submissions', 
          label: 'Projects Gallery', 
          desc: 'Explore all submitted software with tech tags & search', 
          icon: Trophy, 
          badge: submissions.length > 0 ? `${submissions.length}` : null 
        },
        { 
          id: 'teams', 
          label: 'Squads & Matchmaker', 
          desc: 'Team recruitment, open positions & hacker seekers', 
          icon: Users,
          badge: null
        },
        { 
          id: 'resources', 
          label: 'Hacker Vault', 
          desc: 'Starter kits, Docker templates & developer resources', 
          icon: BookOpen,
          badge: null
        }
      ]
    },
    {
      category: 'EVALUATION & OPERATIONS',
      color: '#8b5cf6',
      items: [
        { 
          id: 'judging', 
          label: 'Judging Studio', 
          desc: 'Weighted rubrics, pairwise Elo arena & progress HUD', 
          icon: CheckSquare, 
          badge: currentRole === 'JUDGE' ? 'Active' : null 
        },
        { 
          id: 'leaderboard', 
          label: 'Leaderboard & Elo', 
          desc: 'Z-score normalized rankings, track champions & embargo', 
          icon: BarChart3,
          badge: null
        },
        { 
          id: 'mentorship', 
          label: 'Mentor Helpdesk', 
          desc: '24/7 live technical ticket queue & mentor claim', 
          icon: LifeBuoy, 
          badge: openTicketsCount > 0 ? `${openTicketsCount} open` : null 
        },
        { 
          id: 'faq', 
          label: 'FAQ & Community AMA', 
          desc: 'Searchable knowledge base & live queries to organizers', 
          icon: HelpCircle,
          badge: null
        },
        { 
          id: 'analytics', 
          label: 'Organizer Ops', 
          desc: 'Judge review coverage matrix & real-time audit ledger', 
          icon: Terminal,
          badge: null
        }
      ]
    }
  ];

  // Flattened item lookup for active badge
  const allNavItems = navCategories.flatMap(c => c.items);
  const currentActiveItem = allNavItems.find(i => i.id === activeTab) || allNavItems[0];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsNavDrawerOpen(false);
  };

  // Keyboard shortcut listener (ESC to close, M to toggle menu)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNavDrawerOpen) {
        setIsNavDrawerOpen(false);
      } else if ((e.key === 'm' || e.key === 'M') && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        setIsNavDrawerOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavDrawerOpen]);

  return (
    <>
      <header 
        className="df-main-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'rgba(11, 16, 32, 0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--df-teal)'
        }}
      >
        {/* Sub-HUD Telemetry Line */}
        <div 
          className="df-telemetry-hud"
          style={{
            background: 'var(--df-surface)',
            borderBottom: '1px solid var(--df-border)',
            padding: '3px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-vt)',
            fontSize: '13px',
            letterSpacing: '0.12em',
            color: 'var(--df-text-dim)',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 1002
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>[ UNIT / DF-01 ]</span>
            <span style={{ color: 'var(--df-text-faint)' }}>51.5310°N 0.0500°E</span>
            <span style={{ color: 'var(--df-text-faint)' }}>REV 2.6</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--df-teal)' }}>
              <span className="df-live-dot" /> SYS READY · 72H DUAL-ENGINE
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {announcements.length > 0 && (
              <span style={{ color: 'var(--df-pink)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Megaphone size={11} /> {announcements[0]?.title.slice(0, 38)}...
              </span>
            )}
            <span style={{ color: 'var(--df-teal)' }}>DOGFOOD PLATFORM</span>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div 
          className="df-navbar-bar"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 16px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            position: 'relative',
            zIndex: 1002
          }}
        >
          {/* Left Corner: Interactive Hamburger Navigation Button + Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flexShrink: 0 }}>
            {/* Interactive Hamburger Navigation Button - At Left Corner */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsNavDrawerOpen(prev => !prev);
              }}
              className={`df-hamburger-trigger ${isNavDrawerOpen ? 'is-active' : ''}`}
              aria-label="Toggle Navigation Directory"
              title="Open Platform Navigation Matrix (Press 'M')"
            >
              {isNavDrawerOpen ? <X size={17} color="var(--df-pink)" /> : <Menu size={17} color="var(--df-teal)" />}
              <span className="df-hamburger-text">
                [ <strong>{isNavDrawerOpen ? 'CLOSE' : 'MENU'}</strong> ]
              </span>
              <span className="df-hamburger-active-badge df-hide-tablet">
                <span className="df-live-dot" />
                {currentActiveItem?.label}
              </span>
            </button>

          <span className="df-nav-divider" style={{ width: '1px', height: '22px', background: 'var(--df-border)', display: 'inline-block', flexShrink: 0 }} />

          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('overview')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              letterSpacing: '-0.02em',
              color: 'var(--df-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              whiteSpace: 'nowrap'
            }}>
              DOGFOOD<span style={{ color: 'var(--df-pink)', fontWeight: 400, fontSize: '0.85rem' }}>®</span>
            </div>
            <span className="df-hide-mobile" style={{ width: '1px', height: '16px', background: 'var(--df-border)' }} />
            <span className="df-hide-mobile" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: 'var(--df-text-dim)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              SELF-HOSTABLE
            </span>
          </div>
        </div>

        {/* Right Actions & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          
          {/* Quick Submit CTA */}
          <button 
            className="btn btn-primary btn-sm df-hide-mobile"
            onClick={onOpenSubmit}
            title="Submit Hackathon Project"
            style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <PlusCircle size={14} /> [ Submit ]
          </button>

          {/* Organizer Broadcast button */}
          {currentRole === 'ORGANIZER' && (
            <button
              className="btn btn-cyan btn-sm df-hide-mobile"
              onClick={onOpenBroadcast}
              title="Broadcast Live Announcement"
              style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Megaphone size={14} /> [ Alert ]
            </button>
          )}

          {/* Export Data */}
          <button 
            className="btn btn-outline btn-sm df-hide-mobile"
            onClick={onOpenExport}
            title="Export Data & Scorecards"
            style={{ padding: '6px 10px' }}
          >
            <Download size={14} />
          </button>

          {/* Quick Role / Persona Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--df-surface)',
            padding: '4px 8px',
            border: '1px solid var(--df-border)'
          }}>
            <ShieldCheck size={14} color="var(--df-teal)" />
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--df-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="JUDGE" style={{ background: '#0B1020', color: '#E6ECFF' }}>JUDGE</option>
              <option value="ORGANIZER" style={{ background: '#0B1020', color: '#E6ECFF' }}>ORGANIZER</option>
              <option value="PARTICIPANT" style={{ background: '#0B1020', color: '#E6ECFF' }}>HACKER</option>
            </select>

            {currentRole === 'JUDGE' && (
              <select
                value={selectedJudgeId}
                onChange={(e) => handleSelectJudge(e.target.value)}
                className="df-hide-mobile"
                style={{
                  background: 'var(--df-surface-2)',
                  border: '1px solid var(--df-teal)',
                  color: 'var(--df-teal)',
                  padding: '2px 6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {judges.map(j => (
                  <option key={j.id} value={j.id} style={{ background: '#0B1020', color: '#E6ECFF' }}>
                    {j.name.split(' ')[0]}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Interactive Navigation Matrix Drawer Overlay */}
    {isNavDrawerOpen && (
      <div 
        className="df-nav-overlay"
        onClick={() => setIsNavDrawerOpen(false)}
      >
          <div 
            className="df-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div style={{
              background: 'var(--df-surface)',
              borderBottom: '1px solid var(--df-border)',
              padding: '12px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={16} color="var(--df-teal)" />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#fff',
                  textTransform: 'uppercase'
                }}>
                  NAVIGATION MATRIX
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--df-teal)',
                  background: 'var(--df-teal-dim)',
                  padding: '2px 6px',
                  border: '1px solid var(--df-teal)'
                }}>
                  {currentRole}
                </span>

                <button
                  onClick={() => setIsNavDrawerOpen(false)}
                  style={{
                    background: 'var(--df-surface-2)',
                    border: '1px solid var(--df-border)',
                    color: 'var(--df-pink)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Close Navigation (ESC)"
                >
                  <X size={13} /> [ CLOSE ]
                </button>
              </div>
            </div>

            {/* Categorized Navigation Grid */}
            <div className="df-nav-grid">
              {navCategories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Category Header */}
                  <div style={{
                    fontFamily: 'var(--font-vt)',
                    fontSize: '1rem',
                    letterSpacing: '0.14em',
                    color: cat.color,
                    paddingBottom: '4px',
                    borderBottom: `1px solid ${cat.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>[ {cat.category} ]</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--df-text-faint)', fontFamily: 'var(--font-mono)' }}>
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cat.items.map((item) => {
                      const isActive = activeTab === item.id;
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.id}
                          className={`df-nav-card ${isActive ? 'active' : ''}`}
                          onClick={() => handleNavClick(item.id)}
                        >
                          <div className="df-nav-card-icon" style={{ borderColor: isActive ? 'var(--df-pink)' : 'var(--df-border)' }}>
                            <IconComponent size={18} color={isActive ? 'var(--df-pink)' : cat.color} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="df-nav-card-title">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span style={{
                                  background: item.badge === 'NEW' ? 'var(--df-teal)' : (item.id === 'mentorship' ? '#f59e0b' : 'var(--df-pink)'),
                                  color: '#070a12',
                                  fontSize: '0.62rem',
                                  padding: '1px 5px',
                                  fontWeight: 800,
                                  letterSpacing: '0.04em'
                                }}>
                                  {item.badge}
                                </span>
                              )}
                              {isActive && (
                                <span style={{ color: 'var(--df-pink)', fontSize: '0.72rem', marginLeft: 'auto' }}>
                                  [ ACTIVE ]
                                </span>
                              )}
                            </div>
                            <div className="df-nav-card-desc">
                              {item.desc}
                            </div>
                          </div>

                          <ChevronRight size={14} color={isActive ? 'var(--df-pink)' : 'var(--df-text-faint)'} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Drawer Footer */}
            <div style={{
              background: 'var(--df-surface)',
              borderTop: '1px solid var(--df-border)',
              padding: '12px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setIsNavDrawerOpen(false);
                    onOpenSubmit();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', padding: '5px 10px' }}
                >
                  <PlusCircle size={13} /> Submit Project
                </button>

                {currentRole === 'ORGANIZER' && (
                  <button
                    className="btn btn-cyan btn-sm"
                    onClick={() => {
                      setIsNavDrawerOpen(false);
                      onOpenBroadcast();
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', padding: '5px 10px' }}
                  >
                    <Megaphone size={13} /> Broadcast Alert
                  </button>
                )}

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setIsNavDrawerOpen(false);
                    onOpenExport();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', padding: '5px 10px' }}
                >
                  <Download size={13} /> Export Data
                </button>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--df-text-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Dogfood 2026 // Platform</span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
