import React from 'react'
import Background from '../components/Background'
import QuestionElement from '../components/QuestionElement'

const Quiz = () => {
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple')
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])


 

  return (
    <Background>
      {questions && questions.map(item => (
        <QuestionElement />
      ))}
    </Background>
  )
}

export default Quiz