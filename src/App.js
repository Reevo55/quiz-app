import React from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './containers/Quiz'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuizSummary from './containers/QuizSummary/QuizSummary';
import QuizStart from './containers/QuizStart/QuizStart'

function App() {
  return (
    <Router>
      <Route path='/' exact component={QuizStart} />
      <Route path='/quiz' exact component={Quiz} />
      <Route path='/summary' exact component={QuizSummary} />
    </Router>
  );
}

export default App;
