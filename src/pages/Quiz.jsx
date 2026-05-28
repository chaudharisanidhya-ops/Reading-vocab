import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { HelpCircle, Clock, ArrowRight, X, AlertCircle, Bookmark } from 'lucide-react';

const Quiz = () => {
  const { dailyWords, savedWords, toggleSaveWord, vocabData } = useAppContext();
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

  // Use the pre-generated MCQ options directly
  const optionsForQuestion = useMemo(() => {
    return currentQuestion ? currentQuestion.options : [];
  }, [currentQuestion]);

  // Stable state of whether the current word is saved
  const isWordSaved = useMemo(() => {
    if (!currentQuestion || !savedWords) return false;
    return savedWords.some(w => w.word.toLowerCase() === currentQuestion.word.toLowerCase());
  }, [currentQuestion, savedWords]);

  const highlightWord = (sentence, word) => {
    if (!sentence || !word) return '';
    const parts = sentence.split(new RegExp(`\\b(${word})\\b`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === word.toLowerCase() 
        ? <span key={index} style={{ borderBottom: '2px dashed var(--primary)', fontWeight: 600, color: 'var(--text-main)', fontStyle: 'normal' }}>{part}</span>
        : <span key={index}>{part}</span>
    );
  };

  const handleNext = () => {
    const isCorrect = optionsForQuestion[selectedOption] === currentQuestion.answer;
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

  if (!currentQuestion) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
      <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
      <p style={{ color: 'var(--text-muted)' }}>Loading vocabulary challenge...</p>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Quiz Screen Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <X size={24} />
          </button>
          <div>
            <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>DAILY CHALLENGE</span>
            <h1 className="serif-heading" style={{ fontSize: '24px', color: 'var(--text-main)', margin: '4px 0 0 0', fontWeight: 700 }}>Academic Quiz</h1>
          </div>
        </div>
        
        {/* Progress Pill Indicator */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          Question <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{currentIndex + 1}</span> of 5
        </div>
      </div>

      {/* Modern thin horizontal progress gauge */}
      <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((currentIndex + 1) / 5) * 100}%`, backgroundColor: 'var(--primary)', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
      </div>

      {/* Main Question Card presenting the word and a save/bookmark option */}
      <div className="card" style={{ borderLeft: '4px solid var(--primary)', padding: '36px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-light)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Vocabulary Word</span>
            <h2 className="serif-heading" style={{ fontSize: '32px', color: 'var(--primary)', margin: '4px 0 0 0', textTransform: 'capitalize', fontWeight: 700 }}>
              {currentQuestion.word}
            </h2>
          </div>
          
          {/* Premium Save Word bookmark button */}
          <button
            onClick={() => toggleSaveWord(currentQuestion)}
            style={{
              background: isWordSaved ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.05)',
              border: isWordSaved ? '1px solid var(--primary)' : '1px solid var(--border)',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none'
            }}
            title={isWordSaved ? "Saved" : "Save Word"}
          >
            <Bookmark 
              size={22} 
              fill={isWordSaved ? "var(--primary)" : "none"} 
              color={isWordSaved ? "var(--primary)" : "var(--text-muted)"} 
            />
          </button>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '4px 0' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-light)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Context & Usage Hint</span>
          <p style={{ color: 'var(--text-main)', fontStyle: 'italic', margin: 0, fontSize: '16px', lineHeight: 1.5 }}>
            "{highlightWord(currentQuestion.example, currentQuestion.word)}"
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border)', alignSelf: 'flex-start' }}>
          <AlertCircle size={16} color="var(--primary)" />
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>
            PTE Context: <span style={{ color: 'var(--text-main)', fontStyle: 'normal', fontWeight: 600 }}>{currentQuestion.quizContext}</span>
          </span>
        </div>
      </div>

      {/* Interactive Options Stack / Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {optionsForQuestion.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              className="option-button"
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                backgroundColor: isSelected ? 'rgba(138, 180, 180, 0.12)' : '#222222',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'left',
                outline: 'none',
                position: 'relative'
              }}
              onClick={() => setSelectedOption(idx)}
            >
              {/* Styled Circular Option Badge A, B, C, D */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#161616' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0
              }}>
                {String.fromCharCode(65 + idx)}
              </div>
              
              <span style={{ fontSize: '15px', fontWeight: 600, color: isSelected ? 'var(--primary)' : 'var(--text-main)', lineHeight: 1.4, textTransform: 'capitalize' }}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .option-button:hover {
          background-color: var(--surface-hover) !important;
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Quiz Footer controls: Timer & Submit */}
      <div className="flex-mobile-col items-mobile-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
        
        {/* Working Circular Timer Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
          <Clock size={20} color={timeLeft <= 10 ? '#f87171' : 'var(--primary)'} />
          <span style={{ fontWeight: 600, color: timeLeft <= 10 ? '#f87171' : 'var(--text-main)', fontSize: '15px' }}>
            Time Remaining: <span style={{ fontFamily: 'monospace' }}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </span>
        </div>
        
        <button 
          className="btn btn-primary w-full-mobile" 
          style={{ 
            padding: '14px 40px', 
            fontSize: '16px', 
            fontWeight: 700, 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            borderRadius: '16px',
            opacity: selectedOption === null ? 0.5 : 1,
            cursor: selectedOption === null ? 'not-allowed' : 'pointer'
          }}
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
