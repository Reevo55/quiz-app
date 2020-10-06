import React from 'react'

function QuizAnswers(props) {
    const answers = () => {
         const correctAnswer = props.correctAnswer;
         const shuffledArray = [...props.incorrectAnswers];
         shuffledArray.splice(Math.floor(Math.random() * shuffledArray.length), 0, correctAnswer);

         return shuffledArray.map((answer, index) => (
                 <h1 key={index} onClick={() => props.clicked(answer)}>
                     <strong>X</strong> 
                     <span> - </span>
                     {answer}
                 </h1>
             ))
    }

    return (
        <div>
            {answers()}
        </div>
    );
}

export default QuizAnswers
