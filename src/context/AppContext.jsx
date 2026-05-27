import React, { createContext, useContext, useState, useEffect } from 'react';
import vocabData from '../data/basic_vocab.json';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    goal: 5,
    streak: 1,
    accuracy: 20,
    totalLearned: 5,
    wordsPracticed: 10,
    inRevision: 1
  });

  const [savedWords, setSavedWords] = useState([]);
  const [dailyWords, setDailyWords] = useState([]);
  
  useEffect(() => {
    // Select 5 random words for daily challenge
    const shuffled = [...vocabData].sort(() => 0.5 - Math.random());
    setDailyWords(shuffled.slice(0, 5));
  }, []);

  const toggleSaveWord = (wordObj) => {
    setSavedWords(prev => {
      const exists = prev.find(w => w.id === wordObj.id);
      if (exists) {
        return prev.filter(w => w.id !== wordObj.id);
      }
      return [...prev, wordObj];
    });
  };
  
  const addManualWord = (wordText) => {
    // Basic mock implementation for adding manual words
    const existing = vocabData.find(v => v.word.toLowerCase() === wordText.toLowerCase());
    if (existing) {
      toggleSaveWord(existing);
      return existing;
    } else {
      const newWord = {
        id: Date.now(),
        word: wordText.toLowerCase(),
        meaning: "Meaning fetched for " + wordText,
        example: "This is an example sentence using " + wordText + ".",
        collocations: [wordText + " usage", "common " + wordText],
        options: [wordText, "wrong1", "wrong2", "wrong3"],
        correctIndex: 0,
        quizContext: "General Vocabulary"
      };
      toggleSaveWord(newWord);
      return newWord;
    }
  }

  const value = {
    userStats,
    setUserStats,
    savedWords,
    toggleSaveWord,
    dailyWords,
    vocabData,
    addManualWord
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
