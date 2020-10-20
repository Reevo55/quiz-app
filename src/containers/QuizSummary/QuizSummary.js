import React from 'react'
import queryString from 'query-string';
import classes from "./QuizSummary.module.css";

function QuizSummary(props) {
  const parameters = queryString.parse(props.location.search);

  const quizResetHandler = () => {
    props.history.goBack()
  }
  
  const newSettingsHandler = () => {
    props.history.push({
      pathname: "/"
    });
  }

  return (
    <div className={classes.QuizSummary}>
      <h1 className={classes.Score}>Your score is: <strong>{parameters.score}</strong></h1>
      <div className={classes.Options}>
        <button className={classes.OptionBtn} onClick={() => quizResetHandler()}>One more time!</button>
        <button className={classes.OptionBtn} onClick={() => newSettingsHandler()}>New settings!</button>
      </div>
    </div>
  )
}

export default QuizSummary
