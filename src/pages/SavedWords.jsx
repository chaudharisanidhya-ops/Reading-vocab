import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Share2, Trash2, Lightbulb, ArrowRight, Bell, Settings, User, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedWords = () => {
  const { savedWords, toggleSaveWord } = useAppContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="serif-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Saved Vocabulary</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review and master your difficult words.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Bell size={20} color="var(--text-main)" /></button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Settings size={20} color="var(--text-main)" /></button>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
            <img src="https://i.pravatar.cc/100" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Easy', 'Medium', 'Hard'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 24px',
                borderRadius: '24px',
                border: filter === f ? 'none' : '1px solid var(--border)',
                backgroundColor: filter === f ? 'var(--primary)' : 'transparent',
                color: filter === f ? 'white' : 'var(--text-main)',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            placeholder="Search words..." 
            style={{ width: '100%', padding: '12px 16px 12px 48px', borderRadius: '24px', border: '1px solid var(--border)', outline: 'none' }}
          />
        </div>
      </div>

      <div className="layout-2fr-1fr">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {savedWords.length === 0 ? (
            <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
               <h3 className="serif-heading" style={{ fontSize: '24px', marginBottom: '16px' }}>No Saved Words</h3>
               <p style={{ color: 'var(--text-muted)' }}>You haven't saved any words yet. Go to Dictionary to add some!</p>
            </div>
          ) : (
            savedWords.map((word, i) => (
              <div key={i} className="card" style={{ position: 'relative', overflow: 'hidden', padding: '32px' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', backgroundColor: 'var(--bg-color)', borderRadius: '0 0 0 100%', zIndex: 0 }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <span className="badge badge-red-light" style={{ padding: '4px 16px' }}>Hard</span>
                    <Share2 size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                  <h2 className="serif-heading" style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '8px', textTransform: 'capitalize' }}>{word.word}</h2>
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '24px' }}>/ˌkɒmprɪˈhɛnsɪv/ (mocked)</p>
                  
                  <div style={{ height: '1px', backgroundColor: 'var(--border)', marginBottom: '24px' }}></div>
                  
                  <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>{word.meaning}</p>
                  
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Mastery Progress</span>
                      <span style={{ color: 'var(--primary)' }}>0%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px' }}></div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }}>
                      <Book size={18} style={{ marginRight: '8px' }} /> Review Word
                    </button>
                    <button className="btn btn-outline" style={{ padding: '16px' }} onClick={() => toggleSaveWord(word)}>
                      <Trash2 size={18} color="var(--text-muted)" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#e0e7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Lightbulb size={24} color="#4f46e5" />
            </div>
            <h3 className="serif-heading" style={{ fontSize: '20px', marginBottom: '16px' }}>Daily Tip</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>Words like "Comprehensive" often appear in PTE Reading Fill in the Blanks. Practice using it in sentences related to research or reporting.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View PTE Context <ArrowRight size={16} />
            </div>
          </div>

          <div className="card card-primary" style={{ padding: '40px 32px' }}>
            <h3 className="serif-heading" style={{ fontSize: '24px', color: 'white', marginBottom: '16px' }}>Ready for a Quiz?</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>Test your knowledge on 12 words you haven't reviewed this week.</p>
            <button className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', width: 'auto', padding: '12px 24px' }}>Start Flashcards</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedWords;
