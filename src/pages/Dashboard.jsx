import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, X, Edit2, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { savedWords, vocabData, addManualWord } = useAppContext();
  const navigate = useNavigate();
  
  const [showAddWord, setShowAddWord] = useState(false);
  const [newWordText, setNewWordText] = useState('');
  const [addedWordSuccess, setAddedWordSuccess] = useState(null);

  const handleAddWordSubmit = (e) => {
    e.preventDefault();
    if (!newWordText.trim()) return;
    
    const added = addManualWord(newWordText.trim());
    setAddedWordSuccess(added);
    setNewWordText('');
    
    setTimeout(() => {
      setAddedWordSuccess(null);
      setShowAddWord(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header bar styled like the Explore screen */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 className="serif-heading" style={{ fontSize: '28px', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>PTE Vocab</h1>
      </div>

      {/* Daily Vocabulary Challenge quick-entry card */}
      <div className="card card-primary" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderRadius: '24px' }}>
        <div>
          <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', marginBottom: '16px' }}>⚡ Daily Challenge</span>
          <h2 className="serif-heading" style={{ color: 'white', fontSize: '26px', margin: '0 0 12px 0' }}>Start Vocabulary Quiz</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0, maxWidth: '400px', lineHeight: 1.5 }}>
            Practice questions based strictly on the vocabulary words from your uploaded PDF list.
          </p>
        </div>
        <button 
          className="btn btn-white" 
          onClick={() => navigate('/quiz')}
          style={{ padding: '14px 36px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          Begin Quiz <ArrowRight size={18} />
        </button>
      </div>

      {/* Grid of four main categories matching the mockup */}
      <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        
        {/* Favorites Card */}
        <div 
          onClick={() => navigate('/saved')}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="dashboard-card"
        >
          {/* Isometric Heart Graphic */}
          <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
            <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a5d3d3" />
                  <stop offset="100%" stopColor="#8ab4b4" />
                </linearGradient>
              </defs>
              {/* Shadow base */}
              <ellipse cx="32" cy="50" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              {/* 3D Heart shape */}
              <path d="M 32 46 C 24 38 16 32 16 22 C 16 14 22 8 30 8 C 32 8 34 10 36 12 C 38 10 40 8 42 8 C 50 8 56 14 56 22 C 56 32 48 38 42 46 L 32 50 Z" fill="url(#heartGrad)" />
              {/* Glow Highlight */}
              <path d="M 32 46 C 24 38 16 32 16 22 C 16 14 22 8 30 8 C 32 8 34 10 36 12 C 38 10 40 8 42 8 Z" fill="rgba(255,255,255,0.15)" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>Favorites</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{savedWords.length} words saved for practice</p>
          </div>
        </div>

        {/* Your own words Card */}
        <div 
          onClick={() => setShowAddWord(true)}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="dashboard-card"
        >
          {/* Isometric Pencil & Line Graphic */}
          <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
            <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%' }}>
              <ellipse cx="32" cy="52" rx="22" ry="5" fill="rgba(0,0,0,0.3)" />
              {/* Stylized drawn line */}
              <path d="M 12 48 Q 28 36 52 44" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
              {/* Isometric Pen standing */}
              <g transform="rotate(35 32 32)">
                <rect x="28" y="8" width="8" height="34" rx="2" fill="#e2e8f0" />
                <path d="M 28 42 L 32 48 L 36 42 Z" fill="#1e293b" />
                {/* Pen Tip */}
                <circle cx="32" cy="48" r="1.5" fill="var(--primary)" />
                <rect x="29" y="12" width="6" height="4" fill="var(--primary)" />
              </g>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>Your own words</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Add and study custom definitions</p>
          </div>
        </div>

      </div>

      {/* Modern custom CSS injections for hover scale */}
      <style>{`
        .dashboard-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s;
        }
        .dashboard-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.16);
          background-color: var(--surface-hover) !important;
        }
      `}</style>

      {/* Quick Add Custom Word Modal Overlay */}
      {showAddWord && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', backgroundColor: '#1e1e1e', padding: '32px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
            <button 
              onClick={() => setShowAddWord(false)} 
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            
            <h2 className="serif-heading" style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--text-main)' }}>Add to Your Own Words</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px', lineHeight: 1.4 }}>
              Enter any word to automatically generate a definition and add it to your custom study booklet.
            </p>
            
            {addedWordSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="var(--primary)" />
                <div>
                  <h3 style={{ fontSize: '18px', textTransform: 'capitalize', color: 'var(--text-main)', marginBottom: '4px' }}>"{addedWordSuccess.word}" added!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>Saved successfully to your custom list.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddWordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. abet, mitigate, redundant..." 
                  value={newWordText} 
                  onChange={(e) => setNewWordText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#161616',
                    border: '1px solid var(--border)',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={!newWordText.trim()}
                  style={{ padding: '14px', borderRadius: '12px', fontWeight: 700, fontSize: '15px' }}
                >
                  <Plus size={18} style={{ marginRight: '6px' }} /> Save Word
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
