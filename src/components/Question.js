import React from 'react'
import { decode } from 'html-entities';

const Question = (props) => {
    const [answersArray, setAnswersArray] = React.useState(props.answers);

    console.log(props.selectedValue)

    const answerRadios = answersArray.map((answer, index) => (
        <div key={index}>
            <input
                type="radio"
                id={answer}
                name={"quizAnswer" + answer}
                value={answer}
                checked={props.selectedValue === answer}
                onChange={() => {
                    props.handleSelect(props.id, answer)
                }}
            />
            <label htmlFor={answer}>{decode(answer)}</label>
        </div>))


    return (
        <div className='question'>
            <div>{props.question}</div>
            <div>{answerRadios}</div>
        </div>
    )
}

export default Question