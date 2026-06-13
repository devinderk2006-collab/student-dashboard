import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { TrendingUp, Award, BookOpen, Star, Target, Activity } from 'lucide-react';

const student = {
  name: 'Devinder Kaur',
  university: 'UPES Dehradun',
  branch: 'B.Tech CSE — DevOps',
  year: '2nd Year',
  current_cgpa: 8.2,
  previous_cgpa: 7.8,
};

const semesters = [
  {
    id: 1,
    semester_number: 1,
    cgpa: 7.8,
    subjects: [
      { name: 'Programming in C', grade: 'A', score: 8.5 },
      { name: 'Digital Electronics', grade: 'B+', score: 7.8 },
      { name: 'Linear Algebra', grade: 'A', score: 8.3 },
      { name: 'Computer Organisation', grade: 'A', score: 8.7 },
      { name: 'OOP with Java', grade: 'A+', score: 9.0 },
    ],
  },
  {
    id: 2,
    semester_number: 2,
    cgpa: 8.2,
    subjects: [
      { name: 'DevOps Fundamentals', grade: 'A+', score: 9.2 },
      { name: 'Operating Systems', grade: 'A', score: 8.8 },
      { name: 'DBMS', grade: 'A', score: 8.6 },
      { name: 'DSA', grade: 'A+', score: 9.0 },
      { name: 'Elements of AI/ML', grade: 'A', score: 8.5 },
    ],
  },
];

const radarData = [
  { subject: 'DevOps', score: 92 },
  { subject: 'Programming', score: 88 },
  { subject: 'Databases', score: 86 },
  { subject: 'Algorithms', score: 90 },
  { subject: 'AI/ML', score: 85 },
  { subject: 'Systems', score: 87 },
];

const achievements = [
  { icon: '🏆', title: 'Top Performer', desc: 'Semester 2' },
  { icon: '⭐', title: 'Best in DevOps', desc: 'A+ Grade' },
  { icon: '📈', title: 'Consistent Growth', desc: '+0.4 CGPA' },
  { icon: '🎯', title: 'DSA Champion', desc: 'A+ Grade' },
];

const gradeColor = (grade) => {
  if (grade === 'A+') return '#10B981';
  if (grade === 'A') return '#6366F1';
  if (grade === 'B+') return '#F59E0B';
  return '#94A3B8';
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedCGPA, setAnimatedCGPA] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = student.current_cgpa;
    const duration = 1500;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setAnimatedCGPA(end);
        clearInterval(timer);
      } else {
        setAnimatedCGPA(parseFloat(start.toFixed(1)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)', color: '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '240px', background: 'rgba(30,41,59,0.95)', borderRight: '1px solid rgba(99,102,241,0.2)', display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '12px' }}>📚</div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(to right, #6366F1, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EduTrack</h1>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Academic Dashboard</p>
        </div>

        {[
          { id: 'overview', icon: <Activity size={18} />, label: 'Overview' },
          { id: 'subjects', icon: <BookOpen size={18} />, label: 'Subjects' },
          { id: 'achievements', icon: <Award size={18} />, label: 'Achievements' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: activeTab === tab.id ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: activeTab === tab.id ? '600' : '400', transition: 'all 0.2s', borderLeft: activeTab === tab.id ? '2px solid #6366F1' : '2px solid transparent' }}>
            {tab.icon}
            {tab.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', padding: '16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '8px' }}>👩‍💻</div>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#F1F5F9' }}>{student.name.split(' ')[0]}</p>
          <p style={{ fontSize: '11px', color: '#64748B' }}>{student.branch}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '13px', color: '#6366F1', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Welcome back</p>
            <h2 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px' }}>{student.name}</h2>
            <p style={{ color: '#64748B', fontSize: '15px' }}>{student.university} · {student.branch} · {student.year}</p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontSize: '13px', fontWeight: '600' }}>
            🟢 Academic Year 2024-25
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {/* CGPA Hero Card */}
              <div style={{ gridColumn: 'span 1', padding: '28px', borderRadius: '20px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: '0 20px 60px rgba(99,102,241,0.4)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Current CGPA</p>
                <p style={{ fontSize: '48px', fontWeight: '800', color: '#fff', lineHeight: 1 }}>{animatedCGPA}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>out of 10.0</p>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#A7F3D0', fontSize: '13px', fontWeight: '600' }}>
                  <TrendingUp size={14} />
                  ↑ +0.4 from last sem
                </div>
              </div>

              {[
                { label: 'Semesters', value: '2', sub: 'Completed', icon: <Star size={20} />, color: '#F59E0B' },
                { label: 'Best Grade', value: 'A+', sub: 'DevOps & DSA', icon: <Award size={20} />, color: '#10B981' },
                { label: 'Subjects', value: '10', sub: 'Total studied', icon: <Target size={20} />, color: '#8B5CF6' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '24px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${stat.color === '#F59E0B' ? '245,158,11' : stat.color === '#10B981' ? '16,185,129' : '139,92,246'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, marginBottom: '16px' }}>{stat.icon}</div>
                  <p style={{ fontSize: '28px', fontWeight: '800', color: '#F1F5F9', marginBottom: '4px' }}>{stat.value}</p>
                  <p style={{ fontSize: '12px', color: '#64748B' }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              {/* Line Chart */}
              <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>CGPA Progression</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>Your academic growth over time</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={semesters}>
                    <defs>
                      <linearGradient id="cgpaGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                    <XAxis dataKey="semester_number" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `Sem ${v}`} />
                    <YAxis domain={[7, 10]} stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', color: '#F1F5F9' }} />
                    <Line type="monotone" dataKey="cgpa" stroke="url(#cgpaGradient)" strokeWidth={3} dot={{ fill: '#6366F1', r: 6, strokeWidth: 0 }} activeDot={{ r: 8, fill: '#8B5CF6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Skills Radar</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>Performance across different domains</p>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(99,102,241,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11 }} />
                    <Radar dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Semester Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {semesters.map((sem) => (
                <div key={sem.id} style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Semester {sem.semester_number}</p>
                      <p style={{ fontSize: '32px', fontWeight: '800' }}>{sem.cgpa} <span style={{ fontSize: '16px', color: '#64748B', fontWeight: '400' }}>/ 10.0</span></p>
                    </div>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', border: '2px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                      {sem.semester_number === 1 ? '📘' : '📗'}
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', marginBottom: '20px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(sem.cgpa / 10) * 100}%`, borderRadius: '999px', background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {sem.subjects.map((sub, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#94A3B8' }}>{sub.name}</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', background: `rgba(${sub.grade === 'A+' ? '16,185,129' : sub.grade === 'A' ? '99,102,241' : '245,158,11'},0.15)`, color: gradeColor(sub.grade) }}>{sub.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SUBJECTS TAB */}
        {activeTab === 'subjects' && (
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>All Subjects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {semesters.flatMap(sem =>
                sem.subjects.map((sub, i) => (
                  <div key={i} style={{ padding: '20px 24px', borderRadius: '16px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#F1F5F9', marginBottom: '4px' }}>{sub.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748B' }}>Semester {sem.semester_number} · Score: {sub.score}/10</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', padding: '4px 14px', borderRadius: '999px', background: `rgba(${sub.grade === 'A+' ? '16,185,129' : sub.grade === 'A' ? '99,102,241' : '245,158,11'},0.15)`, color: gradeColor(sub.grade) }}>{sub.grade}</span>
                      <p style={{ fontSize: '20px', fontWeight: '800', color: '#F1F5F9', marginTop: '6px' }}>{sub.score}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ padding: '32px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', textAlign: 'center', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{a.icon}</div>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#F1F5F9', marginBottom: '6px' }}>{a.title}</p>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}