import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserStats, updateWordSRState } = useAppContext();
  const results = location.state?.results || [];

  const score = results.filter(r => r.isCorrect).length;

  useEffect(() => {
    if (results.length > 0) {
      setUserStats(prev => ({
        ...prev,
        streak: prev.streak + 1,
        totalLearned: prev.totalLearned + 5,
        wordsPracticed: prev.wordsPracticed + 5,
        accuracy: Math.round(((prev.accuracy * prev.wordsPracticed) + (score / 5 * 100) * 5) / (prev.wordsPracticed + 5))
      }));

      // Update Spaced Repetition states for all words in this quiz
      results.forEach(res => {
        updateWordSRState(res.word.word, res.isCorrect);
      });
    }
  }, []);

  // Select one word for the Example Sentence Spotlight (prioritize incorrect answers for learning reinforcement)
  const spotlightItem = useMemo(() => {
    if (results.length === 0) return null;
    const incorrect = results.filter(r => !r.isCorrect);
    if (incorrect.length > 0) {
      return incorrect[Math.floor(Math.random() * incorrect.length)];
    }
    return results[Math.floor(Math.random() * results.length)];
  }, [results]);

  if (results.length === 0) {
    return <div>No results found. <button onClick={() => navigate('/')}>Go Home</button></div>;
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="serif-heading" style={{ fontSize: '36px', color: 'var(--primary)', marginBottom: '16px' }}>Quiz Completed!</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'var(--secondary)', borderRadius: '32px', fontWeight: 600, color: 'var(--primary)', fontSize: '20px' }}>
          Score: {score} / 5
        </div>
      </div>

      {/* Dynamic Example Sentence Spotlight Card */}
      {spotlightItem && (
        <div className="card animate-fade-in" style={{
          background: 'linear-gradient(135deg, rgba(138, 180, 180, 0.1) 0%, rgba(34, 34, 34, 0.8) 100%)',
          border: '1px solid rgba(138, 180, 180, 0.25)',
          padding: '36px',
          borderRadius: '24px',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(138, 180, 180, 0.08)',
            filter: 'blur(30px)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '16px' }}>
            <BookOpen size={20} />
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Daily Spotlight Example
            </span>
          </div>

          <h2 className="serif-heading" style={{ fontSize: '32px', color: 'var(--primary)', margin: '0 0 16px 0', textTransform: 'capitalize', fontWeight: 700 }}>
            {spotlightItem.word.word}
          </h2>

          <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', margin: '16px 0 24px' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Contextual Sentence</span>
            <p style={{
              color: 'var(--text-main)',
              fontStyle: 'italic',
              margin: 0,
              fontSize: '20px',
              lineHeight: 1.6,
              fontWeight: 500,
              borderLeft: '3px solid var(--primary)',
              paddingLeft: '20px'
            }}>
              "{spotlightItem.word.example}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '24px' }}>
            <div>
              <span style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Definition</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>{spotlightItem.word.meaning}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="serif-heading" style={{ fontSize: '24px', marginBottom: '24px' }}>Word Review</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
        {results.map((item, idx) => (
          <div key={idx} className="card" style={{ borderLeft: `4px solid ${item.isCorrect ? 'var(--accent)' : '#ef4444'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.isCorrect ? <CheckCircle color="var(--accent)" /> : <XCircle color="#ef4444" />}
                <h3 className="serif-heading" style={{ fontSize: '20px', textTransform: 'capitalize' }}>{item.word.word}</h3>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '36px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Meaning</span>
                <p style={{ color: 'var(--text-main)', marginTop: '4px' }}>{item.word.meaning}</p>
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Example Sentence</span>
                <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginTop: '4px' }}>"{item.word.example}"</p>
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Collocations</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {item.word.collocations.map((c, i) => (
                    <span key={i} style={{ backgroundColor: 'var(--bg-color)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-main)' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary w-full-mobile" onClick={() => navigate('/')} style={{ padding: '12px 32px' }}>
          Back to Dashboard <ArrowRight size={20} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
