import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialStudents = [
  { id: 1, name: 'Devinder Kaur', roll: 'R22CSE045', email: 'devinder@stu.upes.ac.in', cgpa: 8.2, attendance: 91, branch: 'CSE DevOps', year: '2nd Year' },
  { id: 2, name: 'Rahul Sharma', roll: 'R22CSE046', email: 'rahul@stu.upes.ac.in', cgpa: 7.5, attendance: 78, branch: 'CSE DevOps', year: '2nd Year' },
  { id: 3, name: 'Priya Singh', roll: 'R22CSE047', email: 'priya@stu.upes.ac.in', cgpa: 9.1, attendance: 95, branch: 'CSE DevOps', year: '2nd Year' },
  { id: 4, name: 'Arjun Mehta', roll: 'R22CSE048', email: 'arjun@stu.upes.ac.in', cgpa: 6.8, attendance: 70, branch: 'CSE DevOps', year: '2nd Year' },
  { id: 5, name: 'Sneha Patel', roll: 'R22CSE049', email: 'sneha@stu.upes.ac.in', cgpa: 8.7, attendance: 88, branch: 'CSE DevOps', year: '2nd Year' },
];

const empty = { name: '', roll: '', email: '', cgpa: '', attendance: '', branch: 'CSE DevOps', year: '2nd Year' };

export default function AdminStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = () => {
    if (!form.name || !form.email || !form.roll) return;
    if (editId !== null) {
      setStudents(students.map(s => s.id === editId ? { ...form, id: editId, cgpa: parseFloat(form.cgpa), attendance: parseInt(form.attendance) } : s));
      setEditId(null);
    } else {
      setStudents([...students, { ...form, id: Date.now(), cgpa: parseFloat(form.cgpa), attendance: parseInt(form.attendance) }]);
    }
    setForm(empty);
    setShowForm(false);
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditId(s.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setDeleteId(null);
  };

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
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '8px', background: item.path === '/admin/students' ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))' : 'transparent', color: item.path === '/admin/students' ? '#A5B4FC' : '#64748B', fontSize: '14px', fontWeight: item.path === '/admin/students' ? '600' : '400', borderLeft: item.path === '/admin/students' ? '2px solid #6366F1' : '2px solid transparent' }}>
            {item.label}
          </button>
        ))}

        <button onClick={() => navigate('/login')} style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', cursor: 'pointer', fontSize: '14px' }}>
          🚪 Logout
        </button>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '240px', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Manage Students</h2>
            <p style={{ color: '#64748B' }}>Add, edit or remove students</p>
          </div>
          <button onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
            style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
            + Add Student
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{ padding: '28px', borderRadius: '20px', background: 'rgba(30,41,59,0.9)', border: '1px solid rgba(99,102,241,0.3)', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>{editId ? '✏️ Edit Student' : '➕ Add New Student'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Devinder Kaur' },
                { label: 'Roll Number', key: 'roll', placeholder: 'R22CSE045' },
                { label: 'Email', key: 'email', placeholder: 'devinder@stu.upes.ac.in' },
                { label: 'CGPA', key: 'cgpa', placeholder: '8.2' },
                { label: 'Attendance %', key: 'attendance', placeholder: '91' },
                { label: 'Year', key: 'year', placeholder: '2nd Year' },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '6px', fontWeight: '600' }}>{field.label}</label>
                  <input
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(15,23,42,0.8)', color: '#F1F5F9', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleSave}
                style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                💾 Save
              </button>
              <button onClick={() => setShowForm(false)}
                style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)', background: 'transparent', color: '#64748B', cursor: 'pointer', fontSize: '14px' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId && (
          <div style={{ padding: '20px 28px', borderRadius: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#FCA5A5', fontWeight: '600' }}>⚠️ Are you sure you want to delete this student?</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => handleDelete(deleteId)}
                style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                Yes, Delete
              </button>
              <button onClick={() => setDeleteId(null)}
                style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.3)', background: 'transparent', color: '#64748B', cursor: 'pointer', fontSize: '13px' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div style={{ borderRadius: '20px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(99,102,241,0.15)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(99,102,241,0.08)' }}>
                {['Student', 'Roll No', 'Email', 'CGPA', 'Attendance', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} style={{ borderTop: '1px solid rgba(99,102,241,0.08)', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#F1F5F9' }}>{s.name}</p>
                        <p style={{ fontSize: '11px', color: '#64748B' }}>{s.year}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#94A3B8' }}>{s.roll}</td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#94A3B8' }}>{s.email}</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: '#A5B4FC' }}>{s.cgpa}</td>
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: s.attendance < 75 ? '#FCA5A5' : '#94A3B8', fontWeight: s.attendance < 75 ? '700' : '400' }}>{s.attendance}%</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(s)}
                        style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.3)', background: 'transparent', color: '#818CF8', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => setDeleteId(s.id)}
                        style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#FCA5A5', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}