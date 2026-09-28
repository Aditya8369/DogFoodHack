import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Bell, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Filter, 
  Radio, 
  Sparkles,
  Play
} from 'lucide-react';

export function ScheduleTimelineView() {
  const { schedule, config, showToast } = useHackathon();
  const [activeDay, setActiveDay] = useState('all'); // 'all' | 1 | 2 | 3
  const [filterType, setFilterType] = useState('ALL');
  const [timezone, setTimezone] = useState('UTC');
  const [subscribedEvents, setSubscribedEvents] = useState(new Set());

  const eventTypes = ['ALL', 'KEYNOTE', 'WORKSHOP', 'DEADLINE', 'MENTORING', 'SOCIAL', 'JUDGING'];

  const filteredSchedule = schedule.filter((evt) => {
    const matchesDay = activeDay === 'all' || evt.day === Number(activeDay);
    const matchesType = filterType === 'ALL' || evt.type === filterType;
    return matchesDay && matchesType;
  });

  const toggleReminder = (id, title) => {
    setSubscribedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Removed reminder for: ${title}`, 'info');
      } else {
        next.add(id);
        showToast(`🔔 Reminder set for: ${title}`, 'success');
      }
      return next;
    });
  };

  // Generate .ics calendar download
  const handleDownloadCalendar = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Dogfood 2026 Hackathon//Schedule//EN\nCALSCALE:GREGORIAN\n`;
    schedule.forEach((evt, idx) => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:[Dogfood 2026] ${evt.title}\nDESCRIPTION:${evt.description}\\nSpeaker: ${evt.speaker}\\nLocation: ${evt.location}\nLOCATION:${evt.location}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dogfood-2026-schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📅 Schedule downloaded as dogfood-2026-schedule.ics', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'var(--df-surface)',
        border: '1px solid var(--df-teal)',
        padding: '24px 28px',
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
              [ ITINERARY & MILESTONES ]
            </span>
            <span style={{ fontFamily: 'var(--font-vt)', fontSize: '15px', color: 'var(--df-teal)', letterSpacing: '0.1em' }}>
              72H CONTINUOUS SPRINT
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--df-text)', margin: '4px 0 6px' }}>
            Live Hackathon Schedule &amp; Keynotes
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--df-text-dim)', maxWidth: '680px' }}>
            Keynotes, Docker workshops, judging duels, and milestone checkpoints. Synchronized across global builder hubs.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handleDownloadCalendar}>
            <Download size={15} /> [ Add to Calendar (.ICS) ]
          </button>
        </div>
      </div>

      {/* Active / Current Live Event Banner */}
      {schedule.some(e => e.active) && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(255, 61, 110, 0.15) 0%, rgba(0, 229, 208, 0.1) 100%)',
          border: '1px solid var(--df-pink)',
          padding: '18px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              background: 'var(--df-pink)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.78rem',
              letterSpacing: '0.1em'
            }}>
              <span className="pulse-dot" style={{ backgroundColor: '#fff' }} /> LIVE EVENT RIGHT NOW
            </span>
            <div>
              <strong style={{ color: '#fff', fontSize: '1.05rem', fontFamily: 'var(--font-syne)' }}>
                {schedule.find(e => e.active)?.title}
              </strong>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--df-teal)' }}>
                {schedule.find(e => e.active)?.location} • {schedule.find(e => e.active)?.speaker}
              </div>
            </div>
          </div>

          <a
            href={config?.discordUrl || 'https://discord.gg'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <Play size={14} /> [ Join Live Stage &gt;&gt; ]
          </a>
        </div>
      )}

      {/* Controls Bar: Day Tabs, Type Filters, Timezone */}
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
        {/* Day Selectors */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveDay('all')}
            className={activeDay === 'all' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ All Days ]
          </button>
          <button
            onClick={() => setActiveDay(1)}
            className={activeDay === 1 ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Day 1: Kickoff ]
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={activeDay === 2 ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Day 2: Sprint &amp; Tech ]
          </button>
          <button
            onClick={() => setActiveDay(3)}
            className={activeDay === 3 ? "btn btn-cyan btn-sm" : "btn btn-secondary btn-sm"}
          >
            [ Day 3: Demos &amp; Awards ]
          </button>
        </div>

        {/* Event Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Filter size={14} color="var(--df-text-dim)" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select-field"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
          >
            {eventTypes.map(t => (
              <option key={t} value={t} style={{ background: '#0B1020', color: '#E6ECFF' }}>
                TYPE: {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSchedule.map((evt, idx) => {
          const isSubscribed = subscribedEvents.has(evt.id);

          return (
            <div
              key={evt.id}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                borderLeft: evt.active ? '4px solid var(--df-pink)' : (evt.completed ? '4px solid var(--df-border-light)' : '4px solid var(--df-teal)'),
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                opacity: evt.completed ? 0.75 : 1
              }}
            >
              {/* Left Details */}
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{
                    background: evt.type === 'DEADLINE' ? 'var(--df-pink-dim)' : 'var(--df-surface-2)',
                    color: evt.type === 'DEADLINE' ? 'var(--df-pink)' : 'var(--df-teal)',
                    border: `1px solid ${evt.type === 'DEADLINE' ? 'var(--df-pink)' : 'var(--df-border)'}`,
                    fontFamily: 'var(--font-vt)',
                    fontSize: '0.95rem',
                    padding: '2px 8px'
                  }}>
                    {evt.type}
                  </span>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--df-pink)', fontWeight: 700 }}>
                    {evt.time}
                  </span>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--df-text-dim)' }}>
                    ({evt.duration})
                  </span>

                  {evt.completed && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle2 size={11} /> Concluded
                    </span>
                  )}
                  {evt.active && (
                    <span className="badge badge-pink" style={{ fontSize: '0.7rem' }}>
                      <Radio size={11} /> In Progress
                    </span>
                  )}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '6px'
                }}>
                  {evt.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.86rem',
                  color: 'var(--df-text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '780px',
                  marginBottom: '10px'
                }}>
                  {evt.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--df-text-dim)'
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <User size={13} color="var(--df-teal)" /> {evt.speaker}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="var(--df-pink)" /> {evt.location}
                  </span>
                </div>
              </div>

              {/* Right Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => toggleReminder(evt.id, evt.title)}
                  className={isSubscribed ? "btn btn-cyan btn-sm" : "btn btn-outline btn-sm"}
                  title="Notify me before start"
                >
                  <Bell size={14} /> {isSubscribed ? 'Alert Set ✓' : 'Set Alert'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
