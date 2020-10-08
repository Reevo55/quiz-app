import React, { useState, useEffect, useCallback } from 'react';
import QuizAnswer from './QuizAnswers/QuizAnswers'
import QuizScore from './QuizScore/QuizScore'
import classes from './Quiz.module.css';
import ReactCSSTransitionGroup from 'react-transition-group';
import QuizQuestionsCounter from "./QuizQuestionsCounter/QuizQuestionsCounter";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answerFlash, setAnswerFlash] = useState([]);
    const [clickable, setClickable] = useState(true);
    const amountOfQuestions = 3;

    useEffect(() => {
        fetchQuizData()
    }, [])

    useEffect(() => {
        console.log("[useEffect Answer flash]")
        console.log(questions.length)
        console.log("[useEffect Answer flash]")
        console.log(answerFlash)
    }, [answerFlash, questions])

    const textSGMLCleaner = (text) => {
        return text.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'');
    }

    const fetchQuizData = () => {
        setCurrentQuestion(0);

        fetch(`https://opentdb.com/api.php?amount=${amountOfQuestions}`)
            .then(response => response.json())
            .then(response => {
                setQuestions(response['results'])
                setAnswerFlash(Array(response['results'][0]['incorrect_answers'].length + 1).fill(0));
            })
            .catch(error => {
                fetchQuizData();
            })
    }

    const pickAnswerHandler = async (answer, index) => {
        console.log("PICK ANSWER HANDLLER")
        setClickable(false);

        let currentScore = score;
        if (answer === questions[currentQuestion]['correct_answer']) {
            await correctAnswerHandler(index);
            currentScore += 1;
        }
        else {
            await wrongAnswerHandler(index);
            currentScore -= 1;
        }
        await sleep(500);
        setClickable(true);
        nextQuestion();
        setScore(currentScore);
    }

    const correctAnswerHandler = async (index) => {
        console.log("[Correct answer handler] should be 1st")
        let answerArray = [...answerFlash];
        answerArray[index] = 1;
        setAnswerFlash(answerArray);
    }

    const wrongAnswerHandler = async (index) => {
        console.log("[Wrong answer handler] should be 1st")
        let answerArray = [...answerFlash];
        answerArray[index] = -1;
        setAnswerFlash(answerArray);
    }

    const nextQuestion = () => {
        console.log("[nextQuestion] should be 2st")

        let currentQuestionIndex = currentQuestion;
        let answerFlashArr = new Array(questions[currentQuestionIndex]['incorrect_answers'].length + 1).fill(0);

        currentQuestionIndex += 1;
        setCurrentQuestion(currentQuestionIndex);
        setAnswerFlash(answerFlashArr);
    }

    return (
        <div className={classes.Quiz}>
            {console.log("Cirrent question: " + currentQuestion, "Score: " + score)}
            <h1 className={classes.Title}>Quiz</h1>
            {questions.length > 0 &&
                <React.Fragment>
                    <h1 className={classes.Question}>{textSGMLCleaner(questions[currentQuestion]['question'])}</h1>
                    <QuizAnswer answerFlashArr={answerFlash} clickable={clickable} clicked={pickAnswerHandler} correctAnswer={questions[currentQuestion]['correct_answer']} incorrectAnswers={questions[currentQuestion]['incorrect_answers']} />
                    <QuizScore gameScore={score} />
                    <QuizQuestionsCounter currentQuestionIndex={currentQuestion} howManyQuestions={questions.length} />
                </React.Fragment>
            }
        </div>
    );
}

export default Quiz;