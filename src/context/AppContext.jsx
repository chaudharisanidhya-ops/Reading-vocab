import React, { createContext, useContext, useState, useEffect } from 'react';
import basicVocab from '../data/basic_vocab.json';
import mainVocab from '../data/vocab.json';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Merge local vocabularies uniquely by word
const vocabData = [...mainVocab];
basicVocab.forEach(item => {
  if (!vocabData.some(x => x.word.toLowerCase() === item.word.toLowerCase())) {
    vocabData.push(item);
  }
});

// A robust dictionary of academic synonyms for high-quality MCQ generation
const ACADEMIC_SYNONYMS = {
  "mitigate": "alleviate",
  "comprehensive": "complete",
  "facilitate": "assist",
  "ambiguous": "unclear",
  "empirical": "observational",
  "sustainable": "viable",
  "fluctuate": "vary",
  "envisage": "foresee",
  "substantial": "significant",
  "collaborate": "cooperate",
  "hypothesis": "theory",
  "furthermore": "besides",
  "intense": "extreme",
  "deny": "reject",
  "nucleus": "core",
  "intellectual": "mental",
  "circular": "round",
  "literature": "writings",
  "exposure": "vulnerability",
  "abstract": "conceptual",
  "conservation": "preservation",
  "budget": "allowance",
  "competent": "capable",
  "damp": "moist",
  "combine": "merge",
  "agricultural": "farming",
  "critical": "crucial",
  "distribution": "allocation",
  "capacity": "ability",
  "contest": "competition",
  "prosperity": "wealth",
  "opponent": "rival",
  "launch": "initiate",
  "electric": "charged",
  "manufacturer": "producer",
  "sensible": "rational",
  "determine": "decide",
  "presentation": "demonstration",
  "neutral": "impartial",
  "approach": "method",
  "observe": "watch",
  "rotten": "decayed",
  "gesture": "signal",
  "scent": "aroma",
  "alternative": "substitute",
  "output": "production",
  "potential": "possible",
  "oral": "spoken",
  "association": "alliance",
  "abandon": "leave",
  "statistical": "numerical",
  "accumulate": "gather",
  "acquire": "obtain",
  "adapt": "adjust",
  "advocate": "support",
  "affect": "influence",
  "allocate": "distribute",
  "alter": "change",
  "analyze": "examine",
  "anticipate": "expect",
  "apparent": "obvious",
  "appreciate": "value",
  "approximate": "estimate",
  "arbitrary": "random",
  "aspect": "feature",
  "assemble": "gather",
  "assert": "declare",
  "assess": "evaluate",
  "assume": "suppose",
  "assure": "guarantee",
  "attach": "connect",
  "attain": "achieve",
  "attitude": "outlook",
  "attribute": "ascribe",
  "author": "writer",
  "authority": "power",
  "bias": "prejudice",
  "brief": "short",
  "bulk": "majority",
  "capable": "able",
  "channel": "pathway",
  "chapter": "section",
  "chart": "graph",
  "chemical": "substance",
  "circumstance": "situation",
  "cite": "quote",
  "civil": "civic",
  "clarify": "explain",
  "classic": "traditional",
  "clause": "provision",
  "code": "cipher",
  "cohere": "bind",
  "coincide": "concur",
  "collapse": "fall",
  "colleague": "partner",
  "commence": "begin",
  "comment": "remark",
  "commission": "taskforce",
  "commit": "pledge",
  "commodity": "goods",
  "communicate": "connect",
  "community": "society",
  "compatible": "harmonious",
  "compensate": "repay",
  "compile": "assemble",
  "complement": "supplement",
  "complex": "complicated",
  "component": "part",
  "compound": "mixture",
  "comprehend": "understand",
  "comprise": "consist",
  "compute": "calculate",
  "conceive": "imagine",
  "concentrate": "focus",
  "concept": "idea",
  "conclude": "finish",
  "concrete": "solid",
  "conduct": "behavior",
  "confer": "consult",
  "confine": "limit",
  "confirm": "verify",
  "conflict": "disagreement",
  "conform": "comply",
  "consent": "agreement",
  "consequent": "resulting",
  "considerable": "sizable",
  "consist": "comprise",
  "constant": "continuous",
  "constitute": "compose",
  "constrain": "restrict",
  "construct": "build",
  "consult": "advise",
  "consume": "use",
  "contact": "connection",
  "contemporary": "modern"
};

// Extracts a single word synonym dynamically
const getSynonym = (wordObj) => {
  const w = wordObj.word.toLowerCase();
  if (ACADEMIC_SYNONYMS[w]) return ACADEMIC_SYNONYMS[w];
  
  if (wordObj.meaning) {
    const cleanMeaning = wordObj.meaning
      .toLowerCase()
      .replace(/^(make|state|to|be|having|of|relating|the|a|an|capable|of|able|to)\s+/g, '')
      .split(/[\s,;.]+/)[0];
    if (cleanMeaning && cleanMeaning.length > 2) {
      return cleanMeaning;
    }
  }
  return w;
};

// Distractor Selectors matching anti-repetition rules
const getPartiallyRelatedWord = (targetWordObj, allCandidates, bannedWords) => {
  const pool = allCandidates.filter(c => 
    c.word.toLowerCase() !== targetWordObj.word.toLowerCase() && 
    c.quizContext === targetWordObj.quizContext &&
    !bannedWords.includes(getSynonym(c))
  );
  if (pool.length > 0) {
    return getSynonym(pool[Math.floor(Math.random() * pool.length)]);
  }
  
  const poolPos = allCandidates.filter(c => 
    c.word.toLowerCase() !== targetWordObj.word.toLowerCase() && 
    c.pos === targetWordObj.pos &&
    !bannedWords.includes(getSynonym(c))
  );
  if (poolPos.length > 0) {
    return getSynonym(poolPos[Math.floor(Math.random() * poolPos.length)]);
  }
  return getUnrelatedWord(targetWordObj, allCandidates, bannedWords);
};

const getUnrelatedWord = (targetWordObj, allCandidates, bannedWords) => {
  const pool = allCandidates.filter(c => 
    c.word.toLowerCase() !== targetWordObj.word.toLowerCase() && 
    c.quizContext !== targetWordObj.quizContext &&
    !bannedWords.includes(getSynonym(c))
  );
  if (pool.length > 0) {
    return getSynonym(pool[Math.floor(Math.random() * pool.length)]);
  }
  
  const fallbackPool = allCandidates.filter(c => 
    c.word.toLowerCase() !== targetWordObj.word.toLowerCase() &&
    !bannedWords.includes(getSynonym(c))
  );
  return getSynonym(fallbackPool[Math.floor(Math.random() * fallbackPool.length)] || targetWordObj);
};

const getConfusingAcademicWord = (targetWordObj, allCandidates, bannedWords) => {
  const pool = allCandidates.filter(c => 
    c.word.toLowerCase() !== targetWordObj.word.toLowerCase() && 
    (c.word.length >= 8 || c.quizContext?.includes("Academic")) &&
    !bannedWords.includes(getSynonym(c))
  );
  if (pool.length > 0) {
    return getSynonym(pool[Math.floor(Math.random() * pool.length)]);
  }
  return getUnrelatedWord(targetWordObj, allCandidates, bannedWords);
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const AppProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('pte_user_stats');
    return saved ? JSON.parse(saved) : {
      goal: 5,
      streak: 1,
      accuracy: 85,
      totalLearned: 12,
      wordsPracticed: 24,
      inRevision: 3
    };
  });

  const [savedWords, setSavedWords] = useState(() => {
    const saved = localStorage.getItem('pte_saved_words');
    return saved ? JSON.parse(saved) : [];
  });

  const [dailyWords, setDailyWords] = useState([]);

  useEffect(() => {
    localStorage.setItem('pte_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('pte_saved_words', JSON.stringify(savedWords));
  }, [savedWords]);

  const toggleSaveWord = (wordObj) => {
    setSavedWords(prev => {
      const exists = prev.find(w => w.word.toLowerCase() === wordObj.word.toLowerCase());
      if (exists) {
        return prev.filter(w => w.word.toLowerCase() !== wordObj.word.toLowerCase());
      }
      return [...prev, wordObj];
    });
  };

  const addManualWord = (wordText) => {
    const existing = vocabData.find(v => v.word.toLowerCase() === wordText.toLowerCase());
    if (existing) {
      toggleSaveWord(existing);
      return existing;
    } else {
      const newWord = {
        id: Date.now(),
        word: wordText.toLowerCase(),
        meaning: "Custom term defined by user.",
        example: "The scholar decided to integrate " + wordText.toLowerCase() + " into their writing.",
        collocations: [wordText.toLowerCase() + " usage", "common " + wordText.toLowerCase()],
        quizContext: "General Vocabulary"
      };
      toggleSaveWord(newWord);
      return newWord;
    }
  };

  const updateWordSRState = (word, isCorrect) => {
    const srData = JSON.parse(localStorage.getItem('pte_spaced_repetition') || '{}');
    const w = word.toLowerCase();
    
    const state = srData[w] || {
      word: w,
      mastery: 0,
      wrong_attempts: 0,
      next_review_time: 0,
      last_practiced: Date.now()
    };
    
    state.last_practiced = Date.now();
    
    if (isCorrect) {
      state.mastery = (state.mastery || 0) + 1;
      state.wrong_attempts = 0;
      
      const reviewDays = state.mastery * 10; // Mastery 1 = 10d, Mastery 2 = 20d...
      state.next_review_time = Date.now() + reviewDays * 24 * 60 * 60 * 1000;
    } else {
      state.wrong_attempts = (state.wrong_attempts || 0) + 1;
      state.mastery = Math.max(0, (state.mastery || 0) - 1);
      
      let nextReviewDays = 3;
      if (state.wrong_attempts === 1) nextReviewDays = 3;
      else if (state.wrong_attempts === 2) nextReviewDays = 7;
      else if (state.wrong_attempts === 3) nextReviewDays = 14;
      else if (state.wrong_attempts >= 4) nextReviewDays = 30;
      
      state.next_review_time = Date.now() + nextReviewDays * 24 * 60 * 60 * 1000;
    }
    
    srData[w] = state;
    localStorage.setItem('pte_spaced_repetition', JSON.stringify(srData));

    // Update revision statistics in stats
    const totalInRevision = Object.values(srData).filter(s => s.wrong_attempts > 0 || s.mastery < 3).length;
    setUserStats(prev => ({
      ...prev,
      inRevision: totalInRevision
    }));
  };

  const generateDailyQuiz = () => {
    // 1. Gather all candidates including custom words
    const allCandidates = [...vocabData];
    savedWords.forEach(saved => {
      if (!allCandidates.some(w => w.word.toLowerCase() === saved.word.toLowerCase())) {
        allCandidates.push(saved);
      }
    });

    // 2. Fetch rolling window history of recent words
    const recentWords = JSON.parse(localStorage.getItem('pte_recent_words') || '[]');
    let filteredCandidates = allCandidates.filter(c => !recentWords.includes(c.word.toLowerCase()));
    
    if (filteredCandidates.length < 5) {
      filteredCandidates = allCandidates; // Fallback to avoid empty quizzes
    }

    // 3. Spaced Repetition queue
    const srData = JSON.parse(localStorage.getItem('pte_spaced_repetition') || '{}');
    const overdue = [];
    const weak = [];
    const newWords = [];

    filteredCandidates.forEach(wordObj => {
      const state = srData[wordObj.word.toLowerCase()] || {
        word: wordObj.word.toLowerCase(),
        mastery: 0,
        wrong_attempts: 0,
        next_review_time: 0,
        last_practiced: 0
      };

      if (state.last_practiced === 0) {
        newWords.push({ wordObj, state });
      } else if (state.next_review_time > 0 && state.next_review_time <= Date.now()) {
        overdue.push({ wordObj, state });
      } else {
        weak.push({ wordObj, state });
      }
    });

    // Priority ordering
    overdue.sort((a, b) => a.state.next_review_time - b.state.next_review_time);
    weak.sort((a, b) => a.state.mastery - b.state.mastery);
    const shuffledNew = newWords.sort(() => 0.5 - Math.random());

    const prioritized = [...overdue, ...weak, ...shuffledNew];

    const selectedQuestions = [];
    const selectedWordsOnly = [];

    const globalBanned = ['important', 'good', 'bad', 'happy', 'sad', 'difficult'];
    const usedOptions = JSON.parse(localStorage.getItem('pte_used_options') || '[]');
    let activeBannedList = [...globalBanned, ...usedOptions];

    for (const item of prioritized) {
      if (selectedQuestions.length >= 5) break;

      const wordObj = item.wordObj;
      const state = item.state;

      if (selectedWordsOnly.includes(wordObj.word.toLowerCase())) continue;

      let difficulty = 'medium';
      if (state.mastery <= 1) difficulty = 'easy';
      else if (state.mastery >= 3) difficulty = 'hard';

      let correctAns = '';
      let shuffledOptions = [];

      if (wordObj.options && typeof wordObj.correctIndex === 'number' && wordObj.correctIndex >= 0) {
        shuffledOptions = wordObj.options;
        correctAns = wordObj.options[wordObj.correctIndex];
      } else {
        correctAns = getSynonym(wordObj);
        const tempBanned = [...activeBannedList, correctAns, wordObj.word.toLowerCase()];

        const d1 = getPartiallyRelatedWord(wordObj, allCandidates, tempBanned);
        const d2 = getUnrelatedWord(wordObj, allCandidates, [...tempBanned, d1]);
        const d3 = getConfusingAcademicWord(wordObj, allCandidates, [...tempBanned, d1, d2]);

        const rawOptions = [correctAns, d1, d2, d3];
        shuffledOptions = shuffleArray(rawOptions);
      }

      selectedQuestions.push({
        ...wordObj,
        question: `Choose the closest meaning of the word '${wordObj.word}'`,
        options: shuffledOptions,
        answer: correctAns,
        difficulty: difficulty
      });

      selectedWordsOnly.push(wordObj.word.toLowerCase());
      activeBannedList.push(...shuffledOptions);
    }

    // Save history
    const newRecent = [...selectedWordsOnly, ...recentWords].slice(0, 15);
    localStorage.setItem('pte_recent_words', JSON.stringify(newRecent));

    const generatedOptions = [];
    selectedQuestions.forEach(q => generatedOptions.push(...q.options));
    const newUsedOptions = [...generatedOptions, ...usedOptions].slice(0, 20);
    localStorage.setItem('pte_used_options', JSON.stringify(newUsedOptions));

    setDailyWords(selectedQuestions);
  };

  useEffect(() => {
    generateDailyQuiz();
  }, [savedWords]);

  const value = {
    userStats,
    setUserStats,
    savedWords,
    toggleSaveWord,
    dailyWords,
    vocabData,
    addManualWord,
    updateWordSRState,
    generateDailyQuiz
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
