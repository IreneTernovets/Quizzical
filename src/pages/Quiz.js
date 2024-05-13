import React from 'react'
import Background from '../components/Background'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'
import Question from '../components/Question';

/* decode is used for strings */

const Quiz = () => {
  const [quizData, setQuizData] = React.useState(null);
  const [userAnswers, setUserAnswers] = React.useState({})

  React.useEffect(() => {

    const fetchQuizData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuizData(data.results);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuizData();
  }, [])



  const questionElements = quizData ? quizData.map(question => (
    <Question key={nanoid()}
      id={nanoid()}
      question={decode(question.question)}
      correctAnswer={decode(question.correct_answer)}
      incorrectAnswerArr={question.incorrect_answers}
      onSelectAnswe={handleUserSelect}
    />
  )) : [];

  function handleUserSelect(questionId, selectedAnswer) {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedAnswer
    }))
  }


  return (
    <Background>
      <div className='quiz-body'>
        {quizData ? (
          <ul>
            {questionElements}
          </ul>
        ) : (
          <p>Loading questions...</p>
        )}
        <button className='check-button'>Check answers</button>
      </div>

    </Background>
  );
};



export default Quiz