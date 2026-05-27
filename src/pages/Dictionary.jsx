import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, Info, Share2, Heart, Bookmark, Volume2, BookOpen, BarChart2, Grid, User, Award, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const Dictionary = () => {
  const { vocabData, toggleSaveWord, savedWords } = useAppContext();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeWord, setActiveWord] = useState(vocabData[0]); // Default to first word ("intense")
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    const found = vocabData.find(v => v.word.toLowerCase() === searchTerm.toLowerCase().trim());
    if (found) {
      setActiveWord(found);
      setSearchTerm('');
    } else {
      // Basic fallback search by partial match
      const partialFound = vocabData.find(v => v.word.toLowerCase().includes(searchTerm.toLowerCase().trim()));
      if (partialFound) {
        setActiveWord(partialFound);
        setSearchTerm('');
      }
    }
  };

  // Play audio pronunciation of the word using the browser's SpeechSynthesis API
  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Natural pace
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = () => {
    const textToCopy = `${activeWord.word} (${activeWord.pos}) - ${activeWord.meaning}\nExample: ${activeWord.example}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const isFavorited = savedWords.some(w => w.id === activeWord.id);
  const isSavedInCollection = savedWords.some(w => w.id === activeWord.id); // Simple mirror for collection mockup

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Search Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div>
          <h1 className="serif-heading" style={{ fontSize: '28px', color: 'var(--text-main)', margin: 0 }}>Academic Dictionary</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 0 0' }}>Search and study 941 basic words from the PDF</p>
        </div>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '400px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search basic vocabulary words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '13px' }}>Find</button>
        </form>
      </div>

      {/* Main Container combining Card Mockup & Extended list */}
      <div className="layout-2fr-1fr" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
        
        {/* Vocabulary Study Card View (Matches first screenshot) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card Outer Container */}
          <div style={{
            backgroundColor: '#1b1b1b', /* Solid dark-grey background from mockup */
            borderRadius: '26px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'var(--shadow-lg)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '480px',
            position: 'relative'
          }}>
            
            {/* 1. CARD HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              {/* Profile icon */}
              <button style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <User size={20} />
              </button>
              
              {/* Progress bar pill in center */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#8ab4b4',
                fontWeight: 700
              }}>
                <span>🔖 {activeWord.id}/941</span>
                {/* Custom small progress bar */}
                <div style={{ width: '60px', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${(activeWord.id / 941) * 100}%`, height: '100%', backgroundColor: '#8ab4b4' }}></div>
                </div>
              </div>
              
              {/* Crown premium icon */}
              <button style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#eab308' }}>
                <Award size={20} />
              </button>
            </div>

            {/* 2. CARD CENTER BLOCK */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1, justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
              {/* Word in beautiful large serif */}
              <h2 className="serif-heading" style={{ fontSize: '48px', color: 'white', textTransform: 'lowercase', margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>
                {activeWord.word}
              </h2>
              
              {/* Phonetic Pronunciation Badge with speech toggle */}
              <button 
                onClick={() => playSpeech(activeWord.word)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'background-color 0.2s'
                }}
                className="ipa-badge"
              >
                <span>{activeWord.ipa}</span>
                <Volume2 size={16} color="var(--primary)" />
              </button>
              
              {/* Part of Speech and Definition */}
              <p style={{ fontSize: '18px', color: '#d1d5db', margin: '8px 0 0 0', lineHeight: 1.5, maxWidth: '90%' }}>
                <span style={{ fontStyle: 'italic', color: 'var(--primary)', marginRight: '6px', fontWeight: 600 }}>({activeWord.pos})</span>
                {activeWord.meaning}
              </p>
            </div>

            {/* 3. CARD INTERACTIVE BOTTOM ACTIONS */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '24px', marginBottom: '16px' }}>
              {/* Information Drawer toggle */}
              <button 
                onClick={() => setShowFullDetails(!showFullDetails)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: showFullDetails ? 'var(--primary)' : 'var(--text-muted)' }}
                title="View collocations & examples"
              >
                <Info size={22} />
              </button>
              
              {/* Share/Copy button */}
              <button 
                onClick={handleShare}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isCopied ? 'var(--primary)' : 'var(--text-muted)' }}
                title="Copy word details"
              >
                <Share2 size={22} />
              </button>
              
              {/* Heart button (Favorites toggle) */}
              <button 
                onClick={() => toggleSaveWord(activeWord)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFavorited ? '#f87171' : 'var(--text-muted)' }}
                title="Toggle Favorite"
              >
                <Heart size={22} fill={isFavorited ? '#f87171' : 'none'} />
              </button>
              
              {/* Bookmark button (Collections toggle) */}
              <button 
                onClick={() => toggleSaveWord(activeWord)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSavedInCollection ? 'var(--primary)' : 'var(--text-muted)' }}
                title="Save to Collection"
              >
                <Bookmark size={22} fill={isSavedInCollection ? 'var(--primary)' : 'none'} />
              </button>
            </div>
            
            {/* 4. FOOTER NAVIGATION BAR INTEGRATED INSIDE THE STUDY SCREEN */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
              <button 
                onClick={() => navigate('/')} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Grid size={22} />
              </button>
              
              {/* PRACTICE BUTTON WITH GRADUATION CAP */}
              <button 
                onClick={() => navigate('/quiz')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '10px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 700,
                  transition: 'background-color 0.2s'
                }}
                className="practice-pill"
              >
                <BookOpen size={16} color="var(--primary)" />
                Practice
              </button>
              
              <button 
                onClick={() => navigate('/progress')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <BarChart2 size={22} />
              </button>
            </div>

          </div>

          {/* Copy Success indicator overlay */}
          {isCopied && (
            <div className="animate-fade-in" style={{ backgroundColor: 'rgba(138, 180, 180, 0.9)', color: '#161616', padding: '12px 24px', borderRadius: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <CheckCircle2 size={18} /> Copied to clipboard successfully!
            </div>
          )}

          {/* Expanded Tray (Collocations & Sentences) triggered by 'ⓘ' */}
          {showFullDetails && (
            <div className="card animate-fade-in" style={{ padding: '28px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>PTE Example Sentence</h4>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'white', fontStyle: 'italic', borderLeft: '3px solid var(--primary)', paddingLeft: '14px', margin: 0 }}>
                  "{activeWord.example}"
                </p>
              </div>
              
              <div>
                <h4 style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Academic Collocations</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {activeWord.collocations.map((col, idx) => (
                    <span key={idx} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '13px', color: 'var(--text-main)' }}>
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Word Browser List Sidebar (trending words/explore booklet list) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '520px', overflowY: 'auto' }}>
            <h3 className="serif-heading" style={{ fontSize: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', color: 'var(--text-main)' }}>
              Vocab Booklet (1-20)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {vocabData.slice(0, 20).map((wordObj) => {
                const isActive = activeWord.id === wordObj.id;
                return (
                  <div 
                    key={wordObj.id}
                    onClick={() => {
                      setActiveWord(wordObj);
                      setShowFullDetails(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: isActive ? 'var(--secondary)' : 'rgba(255,255,255,0.02)',
                      border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                      transition: 'all 0.2s'
                    }}
                    className="browser-item"
                  >
                    <div>
                      <span style={{ fontSize: '13px', color: isActive ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, marginRight: '8px' }}>
                        #{wordObj.id}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', textTransform: 'capitalize' }}>
                        {wordObj.word}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      ({wordObj.pos})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>PTE EXAM TIP</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
              Use the **Practice** pill on the study card to quickly verify if you can answer fill-in-the-blanks using this word. Always study collocations closely.
            </p>
          </div>

        </div>

      </div>

      <style>{`
        .ipa-badge:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
        }
        .practice-pill:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: scale(1.02);
        }
        .browser-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          transform: translateX(2px);
        }
      `}</style>

    </div>
  );
};

export default Dictionary;
