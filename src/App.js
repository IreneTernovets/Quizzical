import './App.css';
import { Link } from "react-router-dom"; 
import Background from './components/Background';

function App() {
  return (
    <main>
      <Background>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
        <Link to="/quiz">Start quiz</Link>
        </Background>
    </main>
  )
}

export default App;
