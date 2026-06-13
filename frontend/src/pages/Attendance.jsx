import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const attendanceData = [
  { subject: 'Programming in C', total: 40, present: 36, sem: 1 },
  { subject: 'Digital Electronics', total: 38, present: 30, sem: 1 },
  { subject: 'Linear Algebra', total: 42, present: 40, sem: 1 },
  { subject: 'Computer Organisation', total: 40, present: 38, sem: 1 },
  { subject: 'OOP with Java', total: 44, present: 43, sem: 1 },
  { subject: 'DevOps Fundamentals', total: 40, present: 39, sem: 2 },
  { subject: 'Operating Systems', total: 42, present: 38, sem: 2 },
  { subject: 'DBMS', total: 40, present: 37, sem: 2 },
  { subject: 'DSA', total: 44, present: 42, sem: 2 },
  { subject: 'Elements of AI/ML', total: 38, present: 35, sem: 2 },
];

export default function Attendance() {
  const [activeSem, setActiveSem] = useState(1);
  const navigate = useNavigate();
  const filtered = attendanceData.filter(a => a.sem === activeSem);

  const getColor = (pct) => {
    if (pct >= 85) return { bg: 'rgba(16,185,129,0.15)', color: '#10B981', bar: '#10B981' };
    if (pct >= 75) return { bg: 'rgba(99,102,241,0.15)', color: '#818CF8', bar: '#6366F1' };
    return { bg: 'rgba(239,68,68,0.15)', color: '#FCA5A5', bar: '#EF4444' };
  };

  const overallPresent = filtered.reduce((a, b) => a + b.present, 0);
  const overallTotal = filtered.reduce((a, b) => a + b.total, 0);
  const overallPct = Math.round((overallPresent / overallTotal) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '240px', background: 'rgba(30,41,59,0.95)', borderRight: '1px solid rgba(99,102,241,0.2)', display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 100 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(to right, #6366F1, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EduTrack</h1>
        </div>

        {[
          { label: '🏠 Overview', path: '/dashboard' },
          { label: '📊 Grades', path: '/grades' },
          { label: '📅 Attendance', path: '/attendance' },
          { label: '👤 Profile', path: '/profile' },
        ].map(item => (
          <button key={item.path} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/attendance' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/attendance' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/attendance' ? '600' : '400', borderLeft: item.path === '/attendance' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <button onClick={() => navigate('/login')} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Attendance</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Track your subject-wise attendance</p>

        {/* Overall Card */}
        <div style={{ padding: '28px', borderRadius: '20px', background: overallPct >= 75 ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(220,38,38,0.2))', border: `1px solid ${overallPct >= 75 ? 'rgba(99,102,241,0.4)' : 'rgba(239,68,68,0.4)'}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Overall Attendance</p>
            <p style={{ fontSize: '52px', fontWeight: '800', color: '#F1F5F9', lineHeight: 1 }}>{overallPct}%</p>
            <p style={{ color: '#94A3B8', marginTop: '8px', fontSize: '14px' }}>{overallPresent} out of {overallTotal} classes attended</p>
          </div>
          <div style={{ fontSize: '64px' }}>{overallPct >= 85 ? '🌟' : overallPct >= 75 ? '✅' : '⚠️'}</div>
        </div>

        {/* Semester Toggle */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {[1, 2].map(sem => (
            <button key={sem} onClick={() => setActiveSem(sem)}
              style={{ padding: '10px 24px', borderRadius: '10px', border: activeSem === sem ? 'none' : '1px solid rgba(99,102,241,0.2)', cursor: 'pointer', fontSize: '14px', fontWeight: '600', background: activeSem === sem ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(30,41,59,0.8)', color: activeSem === sem ? '#fff' : '#64748B' }}>
              Semester {sem}
            </button>
          ))}
        </div>

        {/* Subject Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((item, i) => {
            const pct = Math.round((item.present / item.total) * 100);
            const c = getColor(pct);
            return (
              <div key={i} style={{ padding: '24px', borderRadius: '16px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: '#F1F5F9', marginBottom: '4px' }}>{item.subject}</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>{item.present}/{item.total} classes attended</p>
                  </div>
                  <div style={{ padding: '6px 16px', borderRadius: '999px', background: c.bg, color: c.color, fontWeight: '700', fontSize: '16px' }}>
                    {pct}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: 'rgba(99,102,241,0.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, borderRadius: '999px', background: c.bar, transition: 'width 0.5s ease' }} />
                </div>

                {pct < 75 && (
                  <p style={{ marginTop: '10px', fontSize: '12px', color: '#FCA5A5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ⚠️ Below 75% — Attendance shortage!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}