import React from 'react';
import classes from './QuizScore.module.css';

function QuizScore(props) {
    return (
        <h1 className={classes.gameScore}>Game score is: <strong>{props.gameScore}</strong> pkt</h1>
    )
}

export default QuizScore
