import './App.css';
import { Link } from "react-router-dom"; 
import Background from './components/Background';

function App() {
  return (
    
    <Background>
      <main>
        <h1>Quizzical</h1>
        <p className='quiz-desc'>In this quiz game, players respond to multiple-choice questions
          by choosing the correct option from several answers. Points are awarded for each correct response,
          aiming to test knowledge and quick thinking without a competitive winner.</p>
        <Link to="/quiz">Start quiz</Link>
      </main>
    </Background>
    
  )
}

export default App;
