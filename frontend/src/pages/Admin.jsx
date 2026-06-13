import React from 'react';
import { useNavigate } from 'react-router-dom';

const students = [
  { id: 1, name: 'Devinder Kaur', roll: 'R22CSE045', cgpa: 8.2, attendance: 91, branch: 'CSE DevOps', status: 'Good' },
  { id: 2, name: 'Rahul Sharma', roll: 'R22CSE046', cgpa: 7.5, attendance: 78, branch: 'CSE DevOps', status: 'Average' },
  { id: 3, name: 'Priya Singh', roll: 'R22CSE047', cgpa: 9.1, attendance: 95, branch: 'CSE DevOps', status: 'Excellent' },
  { id: 4, name: 'Arjun Mehta', roll: 'R22CSE048', cgpa: 6.8, attendance: 70, branch: 'CSE DevOps', status: 'Low' },
  { id: 5, name: 'Sneha Patel', roll: 'R22CSE049', cgpa: 8.7, attendance: 88, branch: 'CSE DevOps', status: 'Good' },
];

const statusColor = (status) => {
  if (status === 'Excellent') return { bg: 'rgba(16,185,129,0.15)', color: '#10B981' };
  if (status === 'Good') return { bg: 'rgba(99,102,241,0.15)', color: '#818CF8' };
  if (status === 'Average') return { bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' };
  return { bg: 'rgba(239,68,68,0.15)', color: '#FCA5A5' };
};

export default function Admin() {
  const navigate = useNavigate();
  const avgCGPA = (students.reduce((a, b) => a + b.cgpa, 0) / students.length).toFixed(1);
  const avgAttendance = Math.round(students.reduce((a, b) => a + b.attendance, 0) / students.length);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>

      {/* Sidebar */}
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '240px', background: 'rgba(30,41,59,0.95)', borderRight: '1px solid rgba(99,102,241,0.2)', display: 'flex', flexDirection: 'column', padding: '32px 20px', zIndex: 100 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', background: 'linear-gradient(to right, #6366F1, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>EduTrack</h1>
          <p style={{ fontSize: '11px', color: '#6366F1', marginTop: '2px', fontWeight: '600' }}>ADMIN PANEL</p>
        </div>

        {[
          { label: '🏠 Overview', path: '/admin' },
          { label: '👥 Students', path: '/admin/students' },
        ].map(item => (
          <button key={item.path} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/admin' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/admin' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/admin' ? '600' : '400', borderLeft: item.path === '/admin' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <button onClick={() => navigate('/login')} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Admin Overview</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Manage all students from here</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Total Students', value: students.length, icon: '👥', color: '#6366F1' },
            { label: 'Average CGPA', value: avgCGPA, icon: '📊', color: '#8B5CF6' },
            { label: 'Avg Attendance', value: `${avgAttendance}%`, icon: '📅', color: '#10B981' },
            { label: 'Top Performer', value: 'Priya S.', icon: '🏆', color: '#F59E0B' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '24px', borderRadius: '16px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Students Table */}
        <div style={{ borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', overflow: 'hidden' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(99,102,241,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>All Students</h3>
            <button onClick={() => navigate('/admin/students')}
              style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
              + Add Student
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(99,102,241,0.08)' }}>
                {['Name', 'Roll No', 'CGPA', 'Attendance', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => {
                const sc = statusColor(s.status);
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid rgba(99,102,241,0.08)', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                          {s.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#F1F5F9' }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#94A3B8' }}>{s.roll}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#A5B4FC' }}>{s.cgpa}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#94A3B8' }}>{s.attendance}%</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '999px', background: sc.bg, color: sc.color, fontSize: '12px', fontWeight: '600' }}>{s.status}</span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <button style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.3)', background: 'transparent', color: '#818CF8', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}