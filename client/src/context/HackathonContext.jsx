import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const HackathonContext = createContext(null);

export function HackathonProvider({ children }) {
  // Current user / role state
  const [currentRole, setCurrentRole] = useState('JUDGE'); // 'ORGANIZER' | 'JUDGE' | 'PARTICIPANT'
  const [selectedJudgeId, setSelectedJudgeId] = useState('judge-1');
  const [userName, setUserName] = useState('Dr. Sarah Chen');

  // Core Data
  const [config, setConfig] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [judges, setJudges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [pairwiseDuels, setPairwiseDuels] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [mentorTickets, setMentorTickets] = useState([]);
  const [hackerSeekers, setHackerSeekers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [leaderboard, setLeaderboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  
  // UI states
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'submissions' | 'judging' | 'leaderboard' | 'teams' | 'schedule' | 'prizes' | 'resources' | 'mentorship' | 'faq' | 'analytics'
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Fetch all core data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [hackRes, subsRes, teamsRes, judgeRes, leaderRes, analRes] = await Promise.all([
        fetch('/api/hackathon').then(r => r.json()),
        fetch('/api/submissions').then(r => r.json()),
        fetch('/api/teams').then(r => r.json()),
        fetch('/api/judging').then(r => r.json()),
        fetch('/api/leaderboard').then(r => r.json()),
        fetch('/api/analytics').then(r => r.json())
      ]);

      if (hackRes.success) {
        setConfig(hackRes.config);
        setTracks(hackRes.tracks || []);
        setCriteria(hackRes.criteria || []);
        setJudges(hackRes.judges || []);
        setSchedule(hackRes.schedule || []);
        setAnnouncements(hackRes.announcements || []);
        setMentorTickets(hackRes.mentorTickets || []);
        setHackerSeekers(hackRes.hackerSeekers || []);
        setFaqs(hackRes.faqs || []);
      }
      if (subsRes.success) setSubmissions(subsRes.submissions || []);
      if (teamsRes.success) setTeams(teamsRes.teams || []);
      if (judgeRes.success) {
        setEvaluations(judgeRes.evaluations || []);
        setPairwiseDuels(judgeRes.pairwiseDuels || []);
      }
      if (leaderRes.success) setLeaderboard(leaderRes);
      if (analRes.success) setAnalytics(analRes);
    } catch (err) {
      console.error('[App] Error fetching hackathon data:', err);
      showToast('Could not sync with backend server. Check connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Judge switch
  const handleSelectJudge = (judgeId) => {
    setSelectedJudgeId(judgeId);
    const j = judges.find(item => item.id === judgeId);
    if (j) setUserName(j.name);
    showToast(`Switched active judge profile to: ${j ? j.name : judgeId}`, 'info');
  };

  // Submit a project
  const createSubmission = async (formData) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎉 "${formData.title}" submitted successfully!`, 'success');
        fetchData();
        return true;
      } else {
        showToast(data.error || 'Failed to submit', 'error');
        return false;
      }
    } catch (err) {
      showToast('Network error submitting project', 'error');
      return false;
    }
  };

  // Upvote project
  const upvoteProject = async (id) => {
    try {
      const res = await fetch(`/api/submissions/${id}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, upvotes: data.upvotes } : s));
        showToast('Upvoted project!', 'success');
      }
    } catch (err) {
      showToast('Failed to upvote', 'error');
    }
  };

  // Submit Rubric Evaluation
  const submitRubricEvaluation = async (submissionId, scores, feedback) => {
    try {
      const currentJudge = judges.find(j => j.id === selectedJudgeId);
      const res = await fetch('/api/judging/rubric', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          judgeId: selectedJudgeId,
          judgeName: currentJudge ? currentJudge.name : userName,
          submissionId,
          scores,
          feedback
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Rubric scorecard saved & normalized!', 'success');
        fetchData();
        return true;
      } else {
        showToast(data.error || 'Failed to save score', 'error');
        return false;
      }
    } catch (err) {
      showToast('Network error recording score', 'error');
      return false;
    }
  };

  // Vote in Pairwise Duel
  const votePairwiseDuel = async (subAId, subBId, winnerId) => {
    try {
      const currentJudge = judges.find(j => j.id === selectedJudgeId);
      const res = await fetch('/api/judging/pairwise/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          judgeId: selectedJudgeId,
          judgeName: currentJudge ? currentJudge.name : userName,
          subAId,
          subBId,
          winnerId
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('⚡ Duel vote recorded! Elo ratings recalculated.', 'success');
        fetchData();
        return true;
      }
    } catch (err) {
      showToast('Error recording duel vote', 'error');
      return false;
    }
  };

  // Create Team
  const createTeam = async (teamData) => {
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Team "${teamData.name}" created!`, 'success');
        fetchData();
        return true;
      }
    } catch (err) {
      showToast('Error creating team', 'error');
      return false;
    }
  };

  // Join Team
  const joinTeam = async (teamId, memberInfo) => {
    try {
      const res = await fetch(`/api/teams/${teamId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberInfo)
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, 'success');
        fetchData();
        return true;
      }
    } catch (err) {
      showToast('Error joining team', 'error');
      return false;
    }
  };

  // Post announcement
  const postAnnouncement = async (annData) => {
    try {
      const res = await fetch('/api/hackathon/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(annData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('📢 Announcement broadcast to all participants!', 'success');
        setAnnouncements(data.announcements);
        return true;
      }
    } catch (err) {
      showToast('Error broadcasting announcement', 'error');
      return false;
    }
  };

  // Create Mentor Ticket
  const createMentorTicket = async (ticketData) => {
    try {
      const res = await fetch('/api/hackathon/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('🎫 Help ticket submitted to mentors!', 'success');
        setMentorTickets(data.mentorTickets);
        return true;
      }
    } catch (err) {
      showToast('Error creating ticket', 'error');
      return false;
    }
  };

  // Update Mentor Ticket (Claim / Resolve)
  const updateMentorTicket = async (ticketId, updateData) => {
    try {
      const res = await fetch(`/api/hackathon/mentorship/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Ticket status updated to ${updateData.status || 'updated'}`, 'success');
        setMentorTickets(data.mentorTickets);
        return true;
      }
    } catch (err) {
      showToast('Error updating ticket', 'error');
      return false;
    }
  };

  // Create Hacker Seeker Profile
  const createHackerSeeker = async (seekerData) => {
    try {
      const res = await fetch('/api/hackathon/seekers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seekerData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('👤 Seeker profile posted on Teammate Matchmaker!', 'success');
        setHackerSeekers(data.hackerSeekers);
        return true;
      }
    } catch (err) {
      showToast('Error creating profile', 'error');
      return false;
    }
  };

  // Ask FAQ
  const askFaq = async (questionData) => {
    try {
      const res = await fetch('/api/hackathon/faqs/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('❓ Question submitted to organizers!', 'success');
        setFaqs(data.faqs);
        return true;
      }
    } catch (err) {
      showToast('Error submitting question', 'error');
      return false;
    }
  };

  // Change Hackathon Phase (Organizer)
  const changePhase = async (newPhase) => {
    try {
      const res = await fetch('/api/hackathon/phase', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newPhase })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Phase updated to: ${newPhase}`, 'success');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update phase', 'error');
    }
  };

  // Reseed Database
  const resetDatabase = async () => {
    try {
      const res = await fetch('/api/hackathon/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast('Database reset to fresh Dogfood 2026 seed state.', 'success');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to reset DB', 'error');
    }
  };

  return (
    <HackathonContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        selectedJudgeId,
        userName,
        handleSelectJudge,
        config,
        tracks,
        criteria,
        judges,
        submissions,
        teams,
        evaluations,
        pairwiseDuels,
        schedule,
        announcements,
        mentorTickets,
        hackerSeekers,
        faqs,
        leaderboard,
        analytics,
        activeTab,
        setActiveTab,
        loading,
        toasts,
        showToast,
        fetchData,
        createSubmission,
        upvoteProject,
        submitRubricEvaluation,
        votePairwiseDuel,
        createTeam,
        joinTeam,
        postAnnouncement,
        createMentorTicket,
        updateMentorTicket,
        createHackerSeeker,
        askFaq,
        changePhase,
        resetDatabase
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}

export function useHackathon() {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
}
