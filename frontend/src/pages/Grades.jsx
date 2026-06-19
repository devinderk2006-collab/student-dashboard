import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const gradeColor = (grade) => {
  if (grade === 'A+') return { bg: 'rgba(16,185,129,0.15)', color: '#10B981' };
  if (grade === 'A') return { bg: 'rgba(99,102,241,0.15)', color: '#818CF8' };
  return { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' };
};

export default function Grades() {
  const [activeSem, setActiveSem] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/login'); return; }

    fetch(`https://student-dashboard-dmy8.onrender.com
/api/students/${user.student_id}/subjects`)
      .then(res => res.json())
      .then(data => { setSubjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const filtered = subjects.filter(s => s.semester === activeSem);

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
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/grades' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/grades' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/grades' ? '600' : '400', borderLeft: item.path === '/grades' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}
          style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Grades</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Your subject-wise performance</p>

        {/* Semester Toggle */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {[1, 2].map(sem => (
            <button key={sem} onClick={() => setActiveSem(sem)}
              style={{ padding: '10px 24px', borderRadius: '10px', border: activeSem === sem ? 'none' : '1px solid rgba(99,102,241,0.2)', cursor: 'pointer', fontSize: '14px', fontWeight: '600', background: activeSem === sem ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(30,41,59,0.8)', color: activeSem === sem ? '#fff' : '#64748B' }}>
              Semester {sem}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#64748B', padding: '60px' }}>Loading grades...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748B', padding: '60px' }}>No subjects found for this semester.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((sub, i) => {
              const gc = gradeColor(sub.grade);
              return (
                <div key={i} style={{ padding: '24px', borderRadius: '16px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#F1F5F9', marginBottom: '4px' }}>{sub.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>Score: {sub.score}/10</p>
                    </div>
                    <span style={{ padding: '6px 16px', borderRadius: '999px', background: gc.bg, color: gc.color, fontWeight: '700', fontSize: '14px' }}>{sub.grade}</span>
                  </div>

                  <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: 'rgba(99,102,241,0.1)', marginBottom: '16px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(sub.score / 10) * 100}%`, borderRadius: '999px', background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { label: 'Assignments', value: `${sub.assignments}/50` },
                      { label: 'Exams', value: `${sub.exams}/50` },
                      { label: 'Practical', value: `${sub.practical}/20` },
                    ].map((item, j) => (
                      <div key={j} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(99,102,241,0.08)', textAlign: 'center' }}>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#A5B4FC', marginBottom: '4px' }}>{item.value}</p>
                        <p style={{ fontSize: '11px', color: '#64748B' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}