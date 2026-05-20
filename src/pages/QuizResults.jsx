import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserStats } = useAppContext();
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
    }
  }, []);

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
        <button className="btn btn-primary" onClick={() => navigate('/')} style={{ padding: '12px 32px' }}>
          Back to Dashboard <ArrowRight size={20} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
