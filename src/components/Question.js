import React from 'react'

const Question = (props) => {
    const [answersArray, setAnswersArray] = React.useState(props.answers);

    const answerRadios = answersArray.map((answer, index) => (
        <div className='question-radio-input' key={index}>
            < input

                type="radio"
                id={answer}
                name={"quizAnswer" + answer}
                value={answer}
                checked={props.selectedValue === answer}
                onChange={() => {
                    props.handleSelect(props.id, answer)
                }}
            />
            < label htmlFor={answer} > {answer}</label >
        </div >))

    return (
        <div className='question'>
            <div className='question-question'>{props.question}</div>
            <div className='question-answers-box'>{answerRadios}</div>
            <hr />
        </div>
    )
}

export default Question