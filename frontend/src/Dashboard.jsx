import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { TrendingUp, Award, Star, Target } from 'lucide-react';

const radarData = [
  { subject: 'DevOps', score: 92 },
  { subject: 'Programming', score: 88 },
  { subject: 'Databases', score: 86 },
  { subject: 'Algorithms', score: 90 },
  { subject: 'AI/ML', score: 85 },
  { subject: 'Systems', score: 87 },
];

const gradeColor = (grade) => {
  if (grade === 'A+') return '#10B981';
  if (grade === 'A') return '#6366F1';
  if (grade === 'B+') return '#F59E0B';
  return '#94A3B8';
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [animatedCGPA, setAnimatedCGPA] = useState(0);
  const [user, setUser] = useState(null);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (!stored) { navigate('/login'); return; }
    setUser(stored);

    const cgpa = stored.cgpa || 8.2;
    let start = 0;
    const step = (cgpa / 1500) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= cgpa) { setAnimatedCGPA(cgpa); clearInterval(timer); }
      else setAnimatedCGPA(parseFloat(start.toFixed(1)));
    }, 16);

    if (stored.student_id) {
      fetch(`https://student-dashboard-dmy8.onrender.com/api/students/${stored.student_id}/subjects`)
        .then(res => res.json())
        .then(data => {
          const sem1 = data.filter(s => s.semester === 1);
          const sem2 = data.filter(s => s.semester === 2);
          setSemesters([
            { semester_number: 1, cgpa: 7.8, subjects: sem1 },
            { semester_number: 2, cgpa: cgpa, subjects: sem2 },
          ]);
        });
    }

    return () => clearInterval(timer);
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)', color: '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '240px', background: 'rgba(30,41,59,0.95)', borderRight: '1px solid rgba(99,102,241,0.2)', display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 100 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '12px' }}>📚</div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(to right, #6366F1, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EduTrack</h1>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Academic Dashboard</p>
        </div>

        {[
          { label: '🏠 Overview', path: '/dashboard' },
          { label: '📊 Grades', path: '/grades' },
          { label: '📅 Attendance', path: '/attendance' },
          { label: '👤 Profile', path: '/profile' },
        ].map(item => (
          <button key={item.path} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/dashboard' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/dashboard' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/dashboard' ? '600' : '400', borderLeft: item.path === '/dashboard' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', padding: '16px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginBottom: '8px' }}>👩‍💻</div>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#F1F5F9' }}>{user.name?.split(' ')[0]}</p>
          <p style={{ fontSize: '11px', color: '#64748B' }}>{user.branch || 'CSE DevOps'}</p>
        </div>

        <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}
          style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '13px', color: '#6366F1', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Welcome back</p>
            <h2 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px' }}>{user.name}</h2>
            <p style={{ color: '#64748B', fontSize: '15px' }}>UPES Dehradun · {user.branch || 'B.Tech CSE — DevOps'} · {user.year || '2nd Year'}</p>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontSize: '13px', fontWeight: '600' }}>
            🟢 Academic Year 2024-25
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div style={{ padding: '28px', borderRadius: '20px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: '0 20px 60px rgba(99,102,241,0.4)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Current CGPA</p>
            <p style={{ fontSize: '48px', fontWeight: '800', color: '#fff', lineHeight: 1 }}>{animatedCGPA}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>out of 10.0</p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#A7F3D0', fontSize: '13px', fontWeight: '600' }}>
              <TrendingUp size={14} /> ↑ +0.4 from last sem
            </div>
          </div>

          {[
            { label: 'Semesters', value: '2', sub: 'Completed', icon: <Star size={20} />, color: '#F59E0B' },
            { label: 'Best Grade', value: 'A+', sub: 'DevOps & DSA', icon: <Award size={20} />, color: '#10B981' },
            { label: 'Subjects', value: '10', sub: 'Total studied', icon: <Target size={20} />, color: '#8B5CF6' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '24px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${stat.color === '#F59E0B' ? '245,158,11' : stat.color === '#10B981' ? '16,185,129' : '139,92,246'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, marginBottom: '16px' }}>{stat.icon}</div>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#F1F5F9', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>CGPA Progression</h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>Your academic growth over time</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={semesters}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
                <XAxis dataKey="semester_number" stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `Sem ${v}`} />
                <YAxis domain={[7, 10]} stroke="#475569" tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', color: '#F1F5F9' }} />
                <Line type="monotone" dataKey="cgpa" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#6366F1', r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

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
            <div key={sem.semester_number} style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Semester {sem.semester_number}</p>
                  <p style={{ fontSize: '32px', fontWeight: '800' }}>{sem.cgpa} <span style={{ fontSize: '16px', color: '#64748B', fontWeight: '400' }}>/ 10.0</span></p>
                </div>
                <div style={{ fontSize: '32px' }}>{sem.semester_number === 1 ? '📘' : '📗'}</div>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(sem.cgpa / 10) * 100}%`, borderRadius: '999px', background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sem.subjects.slice(0, 4).map((sub, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#94A3B8' }}>{sub.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', background: `rgba(${sub.grade === 'A+' ? '16,185,129' : sub.grade === 'A' ? '99,102,241' : '245,158,11'},0.15)`, color: gradeColor(sub.grade) }}>{sub.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}