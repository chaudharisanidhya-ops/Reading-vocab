import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Book, Bookmark, Lightbulb, ArrowRight, Bell, Settings, User } from 'lucide-react';

const Dictionary = () => {
  const { vocabData, addManualWord, toggleSaveWord, savedWords } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // First search in local JSON
    const found = vocabData.find(v => v.word.toLowerCase() === searchTerm.toLowerCase().trim());
    if (found) {
      setSearchResult(found);
    } else {
      // Manual add mock
      const newWord = addManualWord(searchTerm.trim());
      setSearchResult(newWord);
    }
  };

  const isSaved = searchResult && savedWords.some(w => w.id === searchResult.id);

  return (
    <div className="animate-fade-in">
      <div className="flex-mobile-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
        <div className="w-full-mobile">
          <h1 className="serif-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Dictionary & Search</h1>
          <p style={{ color: 'var(--text-muted)' }}>Find PTE vocabulary meanings and usage.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Bell size={20} color="var(--text-main)" /></button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><Settings size={20} color="var(--text-main)" /></button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}><User size={20} color="var(--text-main)" /></button>
        </div>
      </div>

      <form onSubmit={handleSearch} style={{ position: 'relative', marginBottom: '40px' }}>
        <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={24} />
        <input 
          type="text"
          placeholder="Search academic words like 'Envisage' or 'Empirical'..."
          style={{ width: '100%', padding: '20px 20px 20px 60px', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none', boxShadow: 'var(--shadow-sm)' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', padding: '4px 8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>⌘ K</div>
      </form>

      <div className="layout-2fr-1fr" style={{ marginBottom: '40px' }}>
        <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: searchResult ? 'flex-start' : 'center', justifyContent: searchResult ? 'flex-start' : 'center', padding: '40px' }}>
          {!searchResult ? (
            <>
              <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Book size={48} color="var(--primary)" opacity={0.6} />
              </div>
              <h3 className="serif-heading" style={{ fontSize: '24px', marginBottom: '12px' }}>Your Dictionary is Ready</h3>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>Enter a word to see its academic definition, PTE context, and collocation examples.</p>
            </>
          ) : (
            <div style={{ width: '100%', animation: 'fadeIn 0.4s' }}>
              <div className="flex-mobile-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px' }}>
                <div>
                  <h2 className="serif-heading" style={{ fontSize: '32px', color: 'var(--primary)', textTransform: 'capitalize', marginBottom: '8px' }}>{searchResult.word}</h2>
                  <span className="badge badge-blue-light">{searchResult.quizContext}</span>
                </div>
                <button 
                  onClick={() => toggleSaveWord(searchResult)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px' }}
                >
                  <Bookmark size={24} fill={isSaved ? 'var(--primary)' : 'none'} color={isSaved ? 'var(--primary)' : 'var(--text-light)'} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Meaning</h4>
                  <p style={{ fontSize: '18px', color: 'var(--text-main)', lineHeight: 1.6 }}>{searchResult.meaning}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Example</h4>
                  <p style={{ fontSize: '18px', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.6, borderLeft: '4px solid var(--border)', paddingLeft: '16px' }}>"{searchResult.example}"</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Collocations</h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {searchResult.collocations.map((c, i) => (
                      <span key={i} style={{ padding: '8px 16px', backgroundColor: 'var(--bg-color)', borderRadius: '20px', fontSize: '14px' }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>Recent Searches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Substantial', 'Collaborate', 'Hypothesis'].map((word, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setSearchTerm(word)}>
                  <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>◷</span>
                  </div>
                  <span style={{ fontWeight: 500 }}>{word}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '24px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Clear History</button>
          </div>

          <div className="card card-primary" style={{ padding: '32px' }}>
            <Lightbulb size={24} color="white" style={{ marginBottom: '16px' }} />
            <h3 className="serif-heading" style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>PTE Tip</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.6 }}>Academic collocations are key for Fill in the Blanks. Always look at the words around your search term.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-mobile-col items-mobile-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
          <h2 className="serif-heading" style={{ fontSize: '24px' }}>Trending Vocabulary</h2>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Explore Collocations <ArrowRight size={16} /></span>
        </div>
        <div className="grid-cols-3">
          {[
            { word: 'Sustainable', tag: 'HIGH FREQUENCY', color: 'badge-green', meaning: 'Able to be maintained at a certain rate or level...' },
            { word: 'Furthermore', tag: 'ESSAY CORE', color: 'badge-blue-light', meaning: 'In addition; used to introduce a fresh consideration in an...' },
            { word: 'Fluctuate', tag: 'DESCRIBE IMAGE', color: 'badge-green', meaning: 'Rise and fall irregularly in number or amount.' }
          ].map((item, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className={`badge ${item.color}`}>{item.tag}</span>
                <Bookmark size={16} color="var(--text-light)" />
              </div>
              <h3 className="serif-heading" style={{ fontSize: '20px', marginBottom: '8px' }}>{item.word}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
