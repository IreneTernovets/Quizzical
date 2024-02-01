import './App.css';
import React from 'react';
import { Link } from "react-router-dom";
import Background from './components/Background';

function App() {

  return (

    <Background>
      <main>
        <h1>👾Quizzical</h1>
        <p className='quiz-desc'>This quiz game involves answering multiple-choice questions correctly to earn points.
          It focuses on testing knowledge and quick decision-making in a non-competitive format.</p>
        <Link to="/quiz" className="start-button">Start quiz</Link>
      </main>
    </Background>

  )
}

export default App;
