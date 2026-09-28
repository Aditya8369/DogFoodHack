import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = useHackathon();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none'
    }}>
      {toasts.map(t => {
        let Icon = Info;
        let bg = 'rgba(13, 17, 26, 0.95)';
        let border = 'rgba(139, 92, 246, 0.4)';
        let iconColor = '#8b5cf6';

        if (t.type === 'success') {
          Icon = CheckCircle2;
          border = 'rgba(16, 185, 129, 0.5)';
          iconColor = '#10b981';
        } else if (t.type === 'error') {
          Icon = XCircle;
          border = 'rgba(244, 63, 94, 0.5)';
          iconColor = '#f43f5e';
        } else if (t.type === 'warning') {
          Icon = AlertTriangle;
          border = 'rgba(245, 158, 11, 0.5)';
          iconColor = '#f59e0b';
        }

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              background: bg,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${border}`,
              color: '#fff',
              fontSize: '0.88rem',
              fontWeight: 500,
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            <Icon size={18} color={iconColor} />
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
