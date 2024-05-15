import React from 'react'
import Background from '../components/Background'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'
import Question from '../components/Question';

/* decode is used for strings */

const Quiz = () => {
  const [quizData, setQuizData] = React.useState(null);
  const [userAnswers, setUserAnswers] = React.useState({
  })

  React.useEffect(() => {

    const fetchQuizData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const preparedData = data.results.map(question => {

          const randomIndex = Math.floor(Math.random() * (question.incorrect_answers.length + 1))
          const mixedArray = [
            ...question.incorrect_answers.slice(0, randomIndex),
            question.correct_answer,
            ...question.incorrect_answers.slice(randomIndex)
          ];

          return {
            ...question,
            mixedAnswers: mixedArray
          }
        })

        setQuizData(preparedData);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuizData();
  }, [])

  function handleSelect(id, answer) {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [id]: answer
    }))
  }

  const questionElements = quizData ? quizData.map(question => {

    return (
      <Question key={nanoid()}
        id={decode(question.question)}
        question={decode(question.question)}
        answers={question.mixedAnswers}
        handleSelect={handleSelect}
        selectedValue={userAnswers[decode(question.question)]}
      />
    )
  }) : [];

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