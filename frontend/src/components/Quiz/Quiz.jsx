import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const answersButtonRef = useRef(null);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');
            return false;
        }
        setLoggedIn(true);
        fetchQuestions();
        return true;
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:4000/allquestions');
            const data = await response.json();
            const shuffledQuestions = shuffleArray(data);
            const formattedQuestions = shuffledQuestions.map(question => ({
                question: question.question,
                answers: question.answers.map(answer => answer.text),
                correctAnswerIndex: question.answers.findIndex(answer => answer.correct)
            }));
            setQuestions(formattedQuestions);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        }
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const showQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <>
                <h2>{currentQuestion.question}</h2>
                <div id="answer_btn" ref={answersButtonRef}>
                    {currentQuestion.answers.map((answer, index) => (
                        <button
                            key={index}
                            className={getButtonClass(index)}
                            onClick={() => selectAnswer(index)}
                            disabled={selectedAnswerIndex !== null}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    const getButtonClass = (index) => {
        if (selectedAnswerIndex === null) return ''; // No selection yet
        if (index === selectedAnswerIndex) {
            return isCorrect ? 'correct' : 'wrong';
        } else if (index === questions[currentQuestionIndex].correctAnswerIndex) {
            return 'correct-highlight'; // Highlight correct answer if wrong one was selected
        }
        return ''; // Default class
    };

    const selectAnswer = (index) => {
        const correct = questions[currentQuestionIndex].correctAnswerIndex === index;
        setSelectedAnswerIndex(index);
        setIsCorrect(correct);
    };

    const finishQuiz = () => {
        const score = questions.reduce((score, question, index) => {
            return score + (question.correctAnswerIndex === selectedAnswerIndex ? 1 : 0);
        }, 0);
        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    };

    return (
        <div className="quiz-wrapper">
            {loggedIn ? (
                <div className="quiz-container">
                    {questions.length > 0 && showQuestion()}

                    <div id="navigation_buttons">
                        <button
                            id="previous_btn"
                            onClick={() => {
                                setSelectedAnswerIndex(null);
                                setIsCorrect(null);
                                setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
                            }}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            id="next_btn"
                            onClick={() => {
                                setSelectedAnswerIndex(null);
                                setIsCorrect(null);
                                if (currentQuestionIndex === questions.length - 1) {
                                    finishQuiz();
                                } else {
                                    setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
                                }
                            }}
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            ) : (
                <p>Redirecting to login...</p>
            )}
        </div>
    );
};

export default Quiz;
