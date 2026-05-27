import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Bell, Flame, Target, BookA, BookMarked, Trophy, Sparkles, ChevronDown } from 'lucide-react';

const Progress = () => {
  const { userStats } = useAppContext();

  return (
    <div className="animate-fade-in">
      <div className="flex-mobile-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '16px' }}>
        <div className="w-full-mobile">
          <h1 className="serif-heading" style={{ fontSize: '32px', marginBottom: '8px', color: 'var(--primary)' }}>Your Learning Progress</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track your journey to PTE reading mastery.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Bell size={20} color="var(--text-main)" /></button>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
            <img src="https://i.pravatar.cc/100" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div className="grid-cols-4" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(234, 88, 12, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={24} color="#ea580c" />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Day Streak</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.streak}</span>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Day</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={24} color="#3b82f6" />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Avg. Accuracy</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.accuracy}%</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(139, 92, 246, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookA size={24} color="#8b5cf6" />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>Words Practiced</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.wordsPracticed}</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookMarked size={24} color="#10b981" />
          </div>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>In Revision</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)' }}>{userStats.inRevision}</span>
          </div>
        </div>
      </div>

      <div className="layout-2fr-1fr">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <div className="flex-mobile-col items-mobile-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '16px' }}>
              <h3 className="serif-heading" style={{ fontSize: '20px' }}>Weekly Activity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer' }}>
                Last 7 Days <ChevronDown size={16} />
              </div>
            </div>
            <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
              {[30, 60, 40, 80, 100, 50, 40].map((val, i) => {
                const currentDay = new Date().getDay();
                const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
                const isToday = i === dayIndex;
                return (
                  <div key={i} style={{ width: '40px', height: `${val}%`, backgroundColor: isToday ? 'var(--primary)' : 'var(--border)', borderRadius: '8px 8px 0 0', position: 'relative' }}></div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const currentDay = new Date().getDay();
                const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
                const isToday = i === dayIndex;
                return (
                  <span key={i} style={{ color: isToday ? 'var(--text-main)' : 'inherit', fontWeight: isToday ? 600 : 400 }}>{day}</span>
                );
              })}
            </div>
          </div>

          <div className="card card-primary" style={{ padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 className="serif-heading" style={{ fontSize: '24px', color: 'white', marginBottom: '16px' }}>Strengthen Your Focus</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '400px' }}>
                You've mastered 10 words this week. Keep going to reach your daily goal of 20.
              </p>
              <button className="btn btn-white" style={{ padding: '12px 24px', fontSize: '16px' }}>Continue Practice</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <h3 className="serif-heading" style={{ fontSize: '20px', marginBottom: '32px' }}>Milestone Progress</h3>
            
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Trophy size={20} color="var(--accent)" />
                <span style={{ fontWeight: 600, fontSize: '16px' }}>Novice</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>Master 100 words</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>10/100</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Trophy size={20} color="var(--primary)" />
                <span style={{ fontWeight: 600, fontSize: '16px' }}>Scholar</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>Master 500 words</span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>10/500</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '2%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '16px' }}>
              <Sparkles size={24} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Daily Suggestion</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Review "Academic" and "Hypothesis" to boost your accuracy score today.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
