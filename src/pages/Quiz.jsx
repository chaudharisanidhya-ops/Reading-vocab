import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HelpCircle, Clock, ArrowRight } from 'lucide-react';

const Quiz = () => {
  const { dailyWords } = useAppContext();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(45);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNext(); // Auto next on timeout
    }
  }, [timeLeft]);

  const currentQuestion = dailyWords[currentIndex];

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion?.correctIndex;
    const newAnswers = [...answers, { word: currentQuestion, isCorrect, selectedOption }];
    
    if (currentIndex < 4) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimeLeft(45);
    } else {
      // Quiz finished
      setAnswers(newAnswers);
      navigate('/quiz/results', { state: { results: newAnswers } });
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex-mobile-col items-mobile-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '16px' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>PTE Academic Vocabulary</p>
          <h1 className="serif-heading" style={{ fontSize: '32px', color: 'var(--primary)' }}>Daily Quiz Challenge</h1>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          Question <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{currentIndex + 1}</span> of 5
        </div>
      </div>

      <div style={{ height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', marginBottom: '40px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((currentIndex) / 5) * 100}%`, backgroundColor: 'var(--accent)', transition: 'width 0.3s ease' }}></div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: '40px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <HelpCircle color="var(--primary)" size={24} style={{ flexShrink: 0, marginTop: '4px' }} />
          <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--text-main)' }}>
            "{currentQuestion.example.replace(currentQuestion.word, '_________')}"
          </p>
        </div>
        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
           <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ⓘ Context: <span style={{ fontStyle: 'italic' }}>{currentQuestion.quizContext}</span></span>
        </div>
      </div>

      <div className="grid-cols-2" style={{ marginBottom: '40px' }}>
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            className="card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
              border: selectedOption === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
              backgroundColor: selectedOption === idx ? 'var(--secondary)' : 'var(--surface)',
              transition: 'all 0.2s',
              textAlign: 'left'
            }}
            onClick={() => setSelectedOption(idx)}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: selectedOption === idx ? 'var(--primary)' : '#f1f5f9', color: selectedOption === idx ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {String.fromCharCode(65 + idx)}
            </div>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{opt}</span>
          </button>
        ))}
      </div>

      <div className="flex-mobile-col items-mobile-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <Clock size={20} />
          <span style={{ fontWeight: 500, color: timeLeft <= 10 ? '#ef4444' : 'inherit' }}>
            Time Remaining: 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
        <button 
          className="btn btn-primary w-full-mobile" 
          style={{ padding: '12px 32px', fontSize: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          Check Answer <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
