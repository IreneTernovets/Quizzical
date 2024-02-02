import React from 'react'
import Background from '../components/Background'
import QuestionElement from '../components/QuestionElement'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'

const Quiz = () => {
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
      const data = await response.json();
      setQuestions(data.results);
      console.log(data.results)
    };
    if (questions.length === 0) {
      fetchData();
    }
  }, []);

  function shuffleArray(array) {
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  const QuestionElements = questions.map(question => (<QuestionElement
    key={nanoid()}
    question={decode(question.question)}
    shuffledAnswers={shuffleArray([...question.incorrect_answers, question.correct_answer])}
  />))


  return (
    <Background>
      <div className='quiz-body'>
        {QuestionElements}
      </div>
    </Background>
  );
};



export default Quiz