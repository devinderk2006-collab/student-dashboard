import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Devinder Kaur',
    email: 'devinder.14567@stu.upes.ac.in',
    phone: '+91 98765 43210',
    university: 'UPES Dehradun',
    branch: 'B.Tech CSE — DevOps',
    year: '2nd Year',
    rollNo: 'R22CSE045',
    cgpa: '8.2',
  });

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

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
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/profile' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/profile' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/profile' ? '600' : '400', borderLeft: item.path === '/profile' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <button onClick={() => navigate('/login')} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Profile</h2>
        <p style={{ color: '#64748B', marginBottom: '32px' }}>Your personal information</p>

        {/* Profile Card */}
        <div style={{ padding: '40px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Avatar */}
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', flexShrink: 0 }}>
            👩‍💻
          </div>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#F1F5F9', marginBottom: '4px' }}>{profile.name}</h3>
            <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px' }}>{profile.branch} · {profile.university}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ padding: '4px 14px', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', color: '#818CF8', fontSize: '12px', fontWeight: '600' }}>{profile.year}</span>
              <span style={{ padding: '4px 14px', borderRadius: '999px', background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '12px', fontWeight: '600' }}>CGPA: {profile.cgpa}</span>
              <span style={{ padding: '4px 14px', borderRadius: '999px', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>{profile.rollNo}</span>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)}
            style={{ marginLeft: 'auto', padding: '10px 24px', borderRadius: '10px', border: 'none', background: editing ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
            {editing ? '💾 Save' : '✏️ Edit'}
          </button>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Full Name', key: 'name', icon: '👤' },
            { label: 'Email Address', key: 'email', icon: '📧' },
            { label: 'Phone Number', key: 'phone', icon: '📱' },
            { label: 'Roll Number', key: 'rollNo', icon: '🎓' },
            { label: 'University', key: 'university', icon: '🏛️' },
            { label: 'Branch', key: 'branch', icon: '💻' },
          ].map((field, i) => (
            <div key={i} style={{ padding: '20px 24px', borderRadius: '16px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {field.icon} {field.label}
              </p>
              {editing ? (
                <input
                  value={profile[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  style={{ width: '100%', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', padding: '8px 12px', color: '#F1F5F9', fontSize: '14px', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
                />
              ) : (
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#F1F5F9' }}>{profile[field.key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}