import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Bell, Settings, Target, Flame, CheckCircle, BookOpen, Bookmark, Book } from 'lucide-react';

const Dashboard = () => {
  const { userStats, savedWords } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
      
      {/* Header spanning all 12 columns */}
      <div style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div>
          <h1 className="serif-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back, Student</h1>
          <p style={{ color: 'var(--text-muted)' }}>Ready to boost your academic vocabulary today?</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Bell size={20} color="var(--text-main)" />
          </button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
            <Settings size={20} color="var(--text-main)" />
          </button>
        </div>
      </div>

      {/* Stats row - 4 cards, each spanning 3 columns */}
      <div className="card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Today's Goal</h3>
          <Target size={20} color="var(--primary)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.goal}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Words</span>
        </div>
        <div style={{ height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', backgroundColor: 'var(--accent)' }}></div>
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Current Streak</h3>
          <Flame size={20} color="#ef4444" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.streak}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Day</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>Keep the momentum going!</p>
      </div>

      <div className="card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Accuracy</h3>
          <CheckCircle size={20} color="var(--accent)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.accuracy}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>%</span>
        </div>
        <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>Target: 80%</p>
      </div>

      <div className="card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Total Learned</h3>
          <BookOpen size={20} color="#3b82f6" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.totalLearned}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Words</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>First steps to mastery</p>
      </div>

      {/* Main Banner - spanning 8 columns */}
      <div className="card card-primary" style={{ gridColumn: 'span 8', display: 'flex', justifyContent: 'space-between', padding: '40px', minHeight: '280px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
          <span className="badge badge-green" style={{ marginBottom: '24px' }}>⚡ Daily Challenge</span>
          <h2 className="serif-heading" style={{ color: 'white', fontSize: '36px', marginBottom: '24px' }}>Start Today's Quiz</h2>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>?</span>
              </div>
              <span style={{ fontSize: '14px', opacity: 0.9 }}>5 Questions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>◷</span>
              </div>
              <span style={{ fontSize: '14px', opacity: 0.9 }}>5 Mins</span>
            </div>
          </div>
          <button className="btn btn-white" onClick={() => navigate('/quiz')} style={{ padding: '12px 32px', fontSize: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Begin Practice</button>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ width: '220px', height: '220px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}>🏆</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress - spanning 4 columns */}
      <div className="card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', minHeight: '280px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="serif-heading" style={{ fontSize: '20px' }}>Weekly Progress</h2>
          <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>•••</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', paddingBottom: '16px' }}>
          {/* Mock Chart */}
          <div style={{ width: '100%', height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
             {[20, 60, 40, 80, 100, 30, 50].map((val, i) => {
               const currentDay = new Date().getDay();
               const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
               const isToday = i === dayIndex;
               return (
                 <div key={i} style={{ width: '12%', backgroundColor: isToday ? 'var(--primary)' : 'var(--bg-color)', height: `${val}%`, borderRadius: '4px 4px 0 0' }}></div>
               );
             })}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
            const currentDay = new Date().getDay();
            const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
            const isToday = i === dayIndex;
            return (
              <span key={i} style={{ color: isToday ? 'var(--primary)' : 'var(--text-muted)', fontWeight: isToday ? 700 : 400 }}>{day}</span>
            );
          })}
        </div>
      </div>

      {/* Recently Saved Words - spanning 12 columns */}
      <div className="card" style={{ gridColumn: 'span 12', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
           <h2 className="serif-heading" style={{ fontSize: '24px' }}>Recently Saved Words</h2>
           <span style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }} onClick={() => navigate('/dictionary')}>View Dictionary</span>
        </div>
        
        {savedWords.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {savedWords.slice(0, 3).map((word, i) => (
              <div key={i} style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 className="serif-heading" style={{ fontSize: '20px', textTransform: 'capitalize' }}>{word.word}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{word.meaning}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
             {[
               { word: 'Ambiguous', desc: 'Open to more than one interpretation...' },
               { word: 'Mitigate', desc: 'Make less severe, serious, or painful...' },
               { word: 'Empirical', desc: 'Based on observation or experience...' }
             ].map((mock, i) => (
               <div key={i} style={{ padding: '24px', border: '1px dashed var(--border)', borderRadius: '16px', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', gap: '16px', opacity: 0.6 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <h3 className="serif-heading" style={{ fontSize: '20px', color: 'var(--text-muted)' }}>{mock.word}</h3>
                   <Bookmark size={16} color="var(--text-light)" />
                 </div>
                 <p style={{ color: 'var(--text-light)', fontSize: '14px', lineHeight: 1.5 }}>{mock.desc}</p>
                 <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>Suggested Preview</div>
               </div>
             ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
