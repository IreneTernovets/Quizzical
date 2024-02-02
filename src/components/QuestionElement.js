import React from 'react'

const QuestionElement = (props) => {
  console.log(props.shuffledAnswers)
  return (
    <>
      <div className='question'>{props.question}</div>
      <div>{props.shuffledAnswers}</div>
    </>
  )
}

export default QuestionElement