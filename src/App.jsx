import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import SavedWords from './pages/SavedWords';
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
            <Route path="saved" element={<SavedWords />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
