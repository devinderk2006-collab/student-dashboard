import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    // For now, mock login (we'll connect to backend later)
    if (userType === 'student') {
      localStorage.setItem('userType', 'student');
      localStorage.setItem('studentEmail', email);
      navigate('/dashboard');
    } else {
      localStorage.setItem('userType', 'admin');
      navigate('/admin');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.2)', backdropFilter: 'blur(10px)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F1F5F9', marginBottom: '4px' }}>EduTrack</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Student Portal</p>
        </div>

        {error && (
          <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5', marginBottom: '20px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* User Type Toggle */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', background: 'rgba(99,102,241,0.1)', padding: '6px', borderRadius: '10px' }}>
            {['student', 'admin'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', background: userType === type ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'transparent', color: userType === type ? '#fff' : '#64748B' }}>
                {type === 'student' ? '👨‍🎓 Student' : '👨‍💼 Admin'}
              </button>
            ))}
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#E2E8F0', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="devinder@example.com"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(15,23,42,0.8)', color: '#F1F5F9', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.3)'}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#E2E8F0', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(15,23,42,0.8)', color: '#F1F5F9', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.3)'}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#64748B', fontSize: '12px', marginTop: '16px' }}>
          Demo: Any email + password works for now
        </p>
      </div>
    </div>
  );
}