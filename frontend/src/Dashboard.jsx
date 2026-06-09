import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [darkMode] = useState(true);

  const student = {
    name: 'Devinder Kaur',
    current_cgpa: 8.2
  };

  const semesters = [
    {
      id: 1,
      semester_number: 1,
      cgpa: 7.8,
      subjects: [
        { name: 'Data Communications', grade: 'A', score: 8.5 },
        { name: 'Database Management', grade: 'A', score: 8.7 },
        { name: 'DSA', grade: 'A+', score: 9.2 }
      ]
    },
    {
      id: 2,
      semester_number: 2,
      cgpa: 8.2,
      subjects: [
        { name: 'DevOps Fundamentals', grade: 'A+', score: 9.0 },
        { name: 'Operating Systems', grade: 'A', score: 8.8 },
        { name: 'AI/ML Basics', grade: 'A', score: 8.6 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Navigation */}
      <nav className="border-b border-slate-700 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          📚 Student Dashboard
        </h1>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Welcome back, {student.name.split(' ')[0]}</h2>
          <p className="text-slate-400 mb-6">Your academic performance at a glance</p>
          
          {/* CGPA Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 mb-2">Current CGPA</p>
                <p className="text-6xl font-bold">{student.current_cgpa}</p>
                <p className="text-slate-300 mt-2">out of 10.0</p>
              </div>
              <div className="text-right">
                <TrendingUp size={48} className="text-green-400 mb-2" />
                <p className="text-green-400 font-semibold">↑ 0.4 since Sem 1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Semester Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {semesters.map((sem, idx) => (
            <div
              key={sem.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-4">Semester {sem.semester_number}</h3>
              
              {/* CGPA Display */}
              <div className="mb-6">
                <p className="text-4xl font-bold mb-2">{sem.cgpa}</p>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${(sem.cgpa / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Subjects */}
              <div className="space-y-2">
                {sem.subjects.map((subject, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-300">{subject.name}</span>
                    <span className="text-green-400 font-semibold">{subject.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6">CGPA Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={semesters}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="semester_number" stroke="#94A3B8" />
              <YAxis domain={[0, 10]} stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569' }}
                labelStyle={{ color: '#F1F5F9' }}
              />
              <Line 
                type="monotone" 
                dataKey="cgpa" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#6366F1', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}