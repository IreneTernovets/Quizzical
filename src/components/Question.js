import React from 'react'

const Question = (props) => {
    const [answersArray, setAnswersArray] = React.useState(props.answers);

    const answerRadios = answersArray.map((answer, index) => {
        let style = "answer-label"; // Default style

        if (props.finishGame) {
            if (answer === props.correctAnswer) {
                style = "correct-answer";
            } else if (answer === props.selectedValue) {
                style = props.isCorrect ? "green" : "red";
            } else {
                style = "neutral-answer";
            }
        }

        return (
            <div className="question-radio-input" key={index}>
                <input
                    className='input-radio'
                    disabled={props.finishGame}
                    type="radio"
                    id={answer}
                    name={"quizAnswer" + props.id}
                    value={answer}
                    checked={props.selectedValue === answer}
                    onChange={() => {
                        props.handleSelect(props.id, answer)
                    }}
                />
                <label className={style} htmlFor={answer}>{answer}</label>
            </div>
        )
    })

    return (
        <div className='question'>
            <div className='question-question'>{props.question}</div>
            <div className='question-answers-box'>{answerRadios}</div>
            <hr />
        </div>
    )
}

export default Question