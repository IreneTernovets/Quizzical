import React from 'react'
import { decode } from 'html-entities';

const Question = (props) => {
    const [answersArray, setAnswersArray] = React.useState(mixAnswers())
    const [selectedValue, setSelectedValue] = React.useState(null);

    function mixAnswers() {
        const randomIndex = Math.floor(Math.random() * (props.incorrectAnswerArr.length + 1))
        return [
            ...props.incorrectAnswerArr.slice(0, randomIndex),
            props.correctAnswer,
            ...props.incorrectAnswerArr.slice(randomIndex)
        ];
    }

    const answerRadios = answersArray.map((answer, index) => (
        <div key={index}>
            <input
                type="radio"
                id={answer}
                name={"quizAnswer" + answer}
                value={answer}
                checked={selectedValue === answer}
                onChange={() => {
                    setSelectedValue(answer);
                    props.onSelectAnswer(props.id, answer);
                }}
            />
            <label htmlFor={answer}>{decode(answer)}</label>
        </div>))

    console.log(answerRadios, selectedValue)

    return (
        <div className='question'>
            <div>{props.question}</div>
            <div>{answerRadios}</div>
        </div>
    )
}

export default Question