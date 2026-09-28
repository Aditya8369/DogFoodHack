import React, { useState } from 'react';
import { HackathonProvider, useHackathon } from './context/HackathonContext';
import { Navbar } from './components/Navbar';
import { CountdownBanner } from './components/CountdownBanner';
import { ToastContainer } from './components/Toast';

import { OverviewView } from './views/OverviewView';
import { SubmissionsView } from './views/SubmissionsView';
import { JudgingStudioView } from './views/JudgingStudioView';
import { LeaderboardView } from './views/LeaderboardView';
import { TeamsView } from './views/TeamsView';
import { AnalyticsDashboardView } from './views/AnalyticsDashboardView';
import { ScheduleTimelineView } from './views/ScheduleTimelineView';
import { PrizesView } from './views/PrizesView';
import { ResourcesView } from './views/ResourcesView';
import { MentorshipView } from './views/MentorshipView';
import { FaqView } from './views/FaqView';
import { GitPresentationView } from './views/GitPresentationView';

import { SubmissionModal } from './components/SubmissionModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RubricScoringModal } from './components/RubricScoringModal';
import { PairwiseDuelModal } from './components/PairwiseDuelModal';
import { TeamMatchmakerModal } from './components/TeamMatchmakerModal';
import { ExportModal } from './components/ExportModal';
import { BroadcastModal } from './components/BroadcastModal';
import { RequestMentorModal } from './components/RequestMentorModal';
import { SeekerProfileModal } from './components/SeekerProfileModal';

function MainApp() {
  const { activeTab, loading } = useHackathon();

  // Modals state
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isPairwiseOpen, setIsPairwiseOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isMentorRequestOpen, setIsMentorRequestOpen] = useState(false);
  const [isSeekerModalOpen, setIsSeekerModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [scoringProject, setScoringProject] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Atmospheric Grid & Scanlines */}
      <div className="df-grain" aria-hidden="true" />
      <div className="df-scanlines" aria-hidden="true" />

      {/* Top Running Marquee Banner */}
      <div className="df-marquee-bar">
        <div className="df-marquee-track">
          <div className="df-marquee-item">
            <span>Build the platform that will judge you</span><span>·</span>
            <span>$45,000 in Prizes &amp; Bounties</span><span>·</span>
            <span>Self-Hostable with Docker Compose</span><span>·</span>
            <span>72-Hour Dual Engine Matrix</span><span>·</span>
            <span>Build the platform that will judge you</span><span>·</span>
            <span>September 26-29, 2026 Online</span><span>·</span>
          </div>
          <div aria-hidden="true" className="df-marquee-item">
            <span>Build the platform that will judge you</span><span>·</span>
            <span>$45,000 in Prizes &amp; Bounties</span><span>·</span>
            <span>Self-Hostable with Docker Compose</span><span>·</span>
            <span>72-Hour Dual Engine Matrix</span><span>·</span>
            <span>Build the platform that will judge you</span><span>·</span>
            <span>September 26-29, 2026 Online</span><span>·</span>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <Navbar
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenBroadcast={() => setIsBroadcastOpen(true)}
      />

      {/* 72h Realtime Countdown & Phase Stepper */}
      <CountdownBanner />

      {/* Main Content Area */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 16px', width: '100%', flex: 1 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', color: '#00E5D0' }}>
            <div className="pulse-dot" style={{ width: '16px', height: '16px', marginBottom: '16px' }} />
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600 }}>Syncing with Dogfood 2026 Engine...</h2>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewView
                onOpenSubmit={() => setIsSubmitOpen(true)}
                onSelectProject={(p) => setSelectedProject(p)}
                onScoreProject={(p) => setScoringProject(p)}
                onOpenPairwise={() => setIsPairwiseOpen(true)}
              />
            )}

            {activeTab === 'git-presentation' && (
              <GitPresentationView />
            )}

            {activeTab === 'schedule' && (
              <ScheduleTimelineView />
            )}

            {activeTab === 'prizes' && (
              <PrizesView
                onOpenSubmit={() => setIsSubmitOpen(true)}
              />
            )}

            {activeTab === 'submissions' && (
              <SubmissionsView
                onOpenSubmit={() => setIsSubmitOpen(true)}
                onSelectProject={(p) => setSelectedProject(p)}
                onScoreProject={(p) => setScoringProject(p)}
              />
            )}

            {activeTab === 'judging' && (
              <JudgingStudioView
                onSelectProject={(p) => setSelectedProject(p)}
                onScoreProject={(p) => setScoringProject(p)}
                onOpenPairwise={() => setIsPairwiseOpen(true)}
              />
            )}

            {activeTab === 'leaderboard' && (
              <LeaderboardView
                onSelectProject={(p) => setSelectedProject(p)}
                onOpenExport={() => setIsExportOpen(true)}
              />
            )}

            {activeTab === 'teams' && (
              <TeamsView
                onOpenCreateTeam={() => setIsCreateTeamOpen(true)}
                onOpenSeekerModal={() => setIsSeekerModalOpen(true)}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesView />
            )}

            {activeTab === 'mentorship' && (
              <MentorshipView
                onOpenRequestModal={() => setIsMentorRequestOpen(true)}
              />
            )}

            {activeTab === 'faq' && (
              <FaqView />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboardView
                onOpenExport={() => setIsExportOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--df-border)',
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--df-text-dim)',
        background: 'var(--df-surface)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
          <div style={{ fontFamily: 'var(--font-mono)' }}>
            <strong style={{ color: '#fff' }}>Dogfood 2026 Hackathon Platform</strong> • Open Source &amp; Self-Hostable
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onScore={(p) => setScoringProject(p)}
      />

      <RubricScoringModal
        project={scoringProject}
        isOpen={Boolean(scoringProject)}
        onClose={() => setScoringProject(null)}
      />

      <PairwiseDuelModal
        isOpen={isPairwiseOpen}
        onClose={() => setIsPairwiseOpen(false)}
      />

      <TeamMatchmakerModal
        isOpen={isCreateTeamOpen}
        onClose={() => setIsCreateTeamOpen(false)}
      />

      <SeekerProfileModal
        isOpen={isSeekerModalOpen}
        onClose={() => setIsSeekerModalOpen(false)}
      />

      <RequestMentorModal
        isOpen={isMentorRequestOpen}
        onClose={() => setIsMentorRequestOpen(false)}
      />

      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Toast Notification HUD */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <HackathonProvider>
      <MainApp />
    </HackathonProvider>
  );
}
