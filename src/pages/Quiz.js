import React from 'react'
import Background from '../components/Background'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'
import Question from '../components/Question';


const Quiz = () => {
  const [quizData, setQuizData] = React.useState(null);
  const [userAnswers, setUserAnswers] = React.useState({})
  const [finishGame, setFinishGame] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const preparedData = data.results.map(question => {
        const decodedQuestion = decode(question.question);
        const decodedCorrectAnswer = decode(question.correct_answer);
        const decodedIncorrectAnswers = question.incorrect_answers.map(answer => decode(answer));

        const randomIndex = Math.floor(Math.random() * (decodedIncorrectAnswers.length + 1));
        const mixedArray = [
          ...decodedIncorrectAnswers.slice(0, randomIndex),
          decodedCorrectAnswer,
          ...decodedIncorrectAnswers.slice(randomIndex)
        ];

        return {
          ...question,
          question: decodedQuestion,
          correct_answer: decodedCorrectAnswer,
          incorrect_answers: decodedIncorrectAnswers,
          mixedAnswers: mixedArray
        };
      });

      setQuizData(preparedData);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  };

  React.useEffect(() => {
    fetchQuizData();
  }, []);


  function handleSelect(id, answer) {
    const currentObject = quizData.find(object => object.question === id);
    const isCorrect = currentObject.correct_answer === answer;

    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [id]: {
        answer: answer,
        indicator: isCorrect
      }
    }));
  }

  const questionElements = quizData ? quizData.map(question => {
    const userResponse = userAnswers[question.question];
    return (
      <Question key={nanoid()}
        id={question.question}
        correctAnswer={question.correct_answer}
        question={question.question}
        answers={question.mixedAnswers}
        handleSelect={handleSelect}
        selectedValue={userResponse?.answer}
        isCorrect={userResponse?.indicator}
        finishGame={finishGame}
      />
    )
  }) : [];

  function checkAnswers() {
    setFinishGame(true);
    let answersArray = Object.values(userAnswers);
    let trueCount = answersArray.filter(item => item.indicator).length;
    setCount(trueCount)
  }



  const restartGame = () => {
    setUserAnswers({});
    setFinishGame(false);
    setCount(0);
    fetchQuizData();
  };


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
        <div className='footer'>
          {finishGame && <div className='footer-score'>You scored {count}/5 correct answers</div>}
          {finishGame ? <button className='check-button' onClick={restartGame}>Start again</button> : <button className='check-button' onClick={checkAnswers}>Check answers</button>}
        </div>

      </div>

    </Background>
  );
};



export default Quiz