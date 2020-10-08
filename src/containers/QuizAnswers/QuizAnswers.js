import React, { useEffect, useState } from 'react'
import classes from './QuizAnswers.module.css';


function QuizAnswers(props) {
    const [shuffledArray, setShuffledArray] = useState([]);
    
    const paintAnswer = (color) => {
        if(color === 1)
            return { backgroundColor: 'green' };
        else if(color === -1) 
            return { backgroundColor: 'red' };
        else return {};
    }

    useEffect(() => {
        const correctAnswer = props.correctAnswer;
        let shuffledArray = [...props.incorrectAnswers];
        shuffledArray.splice(Math.floor(Math.random() * shuffledArray.length), 0, correctAnswer);
        setShuffledArray(shuffledArray);
    }, [props.correctAnswer, props.incorrectAnswers])

    const renderShuffledArray = () => {
        return shuffledArray.map((answer, index) => (
            <h1 className={classes.Answer} style={paintAnswer(props.answerFlashArr[index])} key={index} onClick={props.clickable ? () => props.clicked(answer, index) : null}>
                {answer}
            </h1>
        ))
    }

    return (
        <div>
            {renderShuffledArray()}
        </div>
    );
}

export default QuizAnswers
