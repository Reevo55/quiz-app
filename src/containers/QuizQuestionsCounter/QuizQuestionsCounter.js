import React from 'react'
import classes from "./QuizQuestionsCounter.module.css"

function QuizQuestionsCounter(props) {
    return (
        <p className={classes.counter}>Question {props.currentQuestionIndex} out of {props.howManyQuestions}</p>
    )
}

export default QuizQuestionsCounter;
