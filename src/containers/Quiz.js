import React, { useState, useEffect, useCallback } from 'react';
import QuizAnswer from './QuizAnswers/QuizAnswers'
import QuizScore from './QuizScore/QuizScore'
import classes from './Quiz.module.css';
import ReactCSSTransitionGroup from 'react-transition-group';
import QuizQuestionsCounter from "./QuizQuestionsCounter/QuizQuestionsCounter";
import { Route, Switch, BrowserRouter as Router, useRef } from 'react-router-dom';
import queryString from 'query-string';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Quiz(props) {
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answerFlash, setAnswerFlash] = useState([]);
    const [clickable, setClickable] = useState(true);


    useEffect(() => {
        let isMounted = true;
        const parameters = queryString.parse(props.location.search);

        fetchQuizData(parameters.questions, parameters.category, parameters.difficulty, isMounted)

        return () => { isMounted = false };
    }, [])

    useEffect( () => {
        if (questions !== null && currentQuestion >= questions.length - 1) {
            summaryOfQuizHandler();
        }
    }, [score])

    const textSGMLCleaner = (text) => {
        return text.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'');
    }

    const fetchQuizData = (amountOfQuestions, category, difficulty, isMounted) => {
        setCurrentQuestion(0);
        fetch(`https://opentdb.com/api.php?amount=${amountOfQuestions.toLowerCase()}&category=${category.toLowerCase()}&difficulty=${difficulty.toLowerCase()}`)
            .then(response => response.json())
            .then(response => {
                if (isMounted) {
                    setQuestions(response['results']);
                    setAnswerFlash(Array(response['results'][0]['incorrect_answers'].length + 1).fill(0));
                }
            })
    }

    const pickAnswerHandler = async (answer, index) => {
        setClickable(false);

        let currentScore = score;
        if (answer === questions[currentQuestion]['correct_answer']) {
            currentScore += 1;
            await correctAnswerHandler(index);
        }
        else {
            currentScore -= 1;
            await wrongAnswerHandler(index);
        }
        await sleep(500);
        setScore(currentScore);
        setClickable(true);
        nextQuestion(currentScore);
    }

    const correctAnswerHandler = async (index) => {
        let answerArray = [...answerFlash];
        answerArray[index] = 1;
        setAnswerFlash(answerArray);
    }

    const wrongAnswerHandler = async (index) => {
        let answerArray = [...answerFlash];
        answerArray[index] = -1;
        setAnswerFlash(answerArray);
    }

    const nextQuestion = () => {
        let currentQuestionIndex = currentQuestion;
        let answerFlashArr = new Array(questions[currentQuestionIndex]['incorrect_answers'].length + 1).fill(0);

        currentQuestionIndex += 1;
        
        setCurrentQuestion(currentQuestionIndex);
        setAnswerFlash(answerFlashArr);
    }

    const summaryOfQuizHandler = () => {
        props.history.push({
            pathname: '/summary',
            search: `?score=${score}`
        })
    }

    return (
        <div className={classes.Quiz}>
            <h1 className={classes.Title}>Quiz</h1>
            {questions &&
                <React.Fragment>
                    <h1 className={classes.Question}>{textSGMLCleaner(questions[currentQuestion]['question'])}</h1>
                    <QuizAnswer answerFlashArr={answerFlash} clickable={clickable} clicked={pickAnswerHandler} correctAnswer={questions[currentQuestion]['correct_answer']} incorrectAnswers={questions[currentQuestion]['incorrect_answers']} />
                    <QuizScore gameScore={score} />
                    <QuizQuestionsCounter currentQuestionIndex={currentQuestion + 1} howManyQuestions={questions.length} />
                </React.Fragment>
            }
        </div>
    );
}

export default Quiz;