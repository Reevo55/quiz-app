import React, { useState, useEffect, useCallback } from 'react';
import QuizAnswer from './QuizAnswers/QuizAnswers'
import QuizScore from './QuizScore/QuizScore'
import classes from './Quiz.css';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchQuizData()
    }, [])

    const fetchQuizData = () => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(response => response.json())
            .then(response => setQuestions(response['results']))
            .catch(error => {
                console.log(error);
                fetchQuizData();
            })
    }

    const pickAnswerHandler = (answer) => {
        console.log(answer);

        let currentScore = score;
        if (answer === questions[currentQuestion]['correct_answer']) {
            currentScore += 1;
        }
        else currentScore -= 1;

        nextQuestion();
        setScore(currentScore);
    }

    const nextQuestion = () => {
        let currentQuestionIndex = currentQuestion;
        currentQuestionIndex += 1;
        setCurrentQuestion(currentQuestionIndex);
    }

    return (
        <div className={classes.Quiz}>
            {console.log("Cirrent question: " + currentQuestion, "Score: " + score)}
            <h1>Quiz</h1>
            {questions.length > 0 &&
                <React.Fragment>
                    <h1>{questions[currentQuestion]['question']}</h1>
                    <QuizAnswer clicked={pickAnswerHandler} correctAnswer={questions[currentQuestion]['correct_answer']} incorrectAnswers={questions[currentQuestion]['incorrect_answers']} />
                    <QuizScore gameScore={score} />
                </React.Fragment>
            }
        </div>
    );
}

export default Quiz;