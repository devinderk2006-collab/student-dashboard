import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gradesData = [
  {
    semester: 1,
    subjects: [
      { name: 'Programming in C', grade: 'A', score: 8.5, assignments: 42, exams: 44, practical: 18 },
      { name: 'Digital Electronics', grade: 'B+', score: 7.8, assignments: 38, exams: 40, practical: 16 },
      { name: 'Linear Algebra', grade: 'A', score: 8.3, assignments: 40, exams: 43, practical: 17 },
      { name: 'Computer Organisation', grade: 'A', score: 8.7, assignments: 43, exams: 45, practical: 18 },
      { name: 'OOP with Java', grade: 'A+', score: 9.0, assignments: 47, exams: 46, practical: 19 },
    ],
  },
  {
    semester: 2,
    subjects: [
      { name: 'DevOps Fundamentals', grade: 'A+', score: 9.2, assignments: 48, exams: 47, practical: 19 },
      { name: 'Operating Systems', grade: 'A', score: 8.8, assignments: 44, exams: 45, practical: 18 },
      { name: 'DBMS', grade: 'A', score: 8.6, assignments: 43, exams: 44, practical: 18 },
      { name: 'DSA', grade: 'A+', score: 9.0, assignments: 46, exams: 46, practical: 19 },
      { name: 'Elements of AI/ML', grade: 'A', score: 8.5, assignments: 42, exams: 44, practical: 17 },
    ],
  },
];

const gradeColor = (grade) => {
  if (grade === 'A+') return { bg: 'rgba(16,185,129,0.15)', color: '#10B981' };
  if (grade === 'A') return { bg: 'rgba(99,102,241,0.15)', color: '#818CF8' };
  return { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' };
};

export default function Grades() {
  const [activeSem, setActiveSem] = useState(1);
  const navigate = useNavigate();
  const currentSem = gradesData.find(s => s.semester === activeSem);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#F1F5F9', fontFamily: "'Inter', sans-serif", display: 'flex' }}>

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

        <button onClick={() => navigate('/login')} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px', width: '100%' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Grades</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Your subject-wise performance</p>

        {/* Semester Toggle */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {[1, 2].map(sem => (
            <button key={sem} onClick={() => setActiveSem(sem)}
              style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', background: activeSem === sem ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(30,41,59,0.8)', color: activeSem === sem ? '#fff' : '#64748B', border: activeSem === sem ? 'none' : '1px solid rgba(99,102,241,0.2)' }}>
              Semester {sem}
            </button>
          ))}
        </div>

        {/* Subjects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentSem.subjects.map((sub, i) => {
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

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: 'rgba(99,102,241,0.1)', marginBottom: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(sub.score / 10) * 100}%`, borderRadius: '999px', background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }} />
                </div>

                {/* Score Breakdown */}
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
      </div>
    </div>
  );
}