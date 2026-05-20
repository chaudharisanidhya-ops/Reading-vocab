import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Dictionary from './pages/Dictionary';
import SavedWords from './pages/SavedWords';
import Progress from './pages/Progress';
import QuizResults from './pages/QuizResults';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="quiz/results" element={<QuizResults />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="saved" element={<SavedWords />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
