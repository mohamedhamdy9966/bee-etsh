import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Store selected answers
    const [isCorrect, setIsCorrect] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
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
                correctAnswerIndex: question.answers.findIndex(answer => answer.correct),
                explanation: question.explanation || ''
            }));
            setQuestions(formattedQuestions);
            setSelectedAnswers(new Array(formattedQuestions.length).fill(null)); // Initialize answer array
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
                            disabled={selectedAnswers[currentQuestionIndex] !== null}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    const getButtonClass = (index) => {
        const selectedAnswerIndex = selectedAnswers[currentQuestionIndex];
        if (selectedAnswerIndex === null) return ''; // No selection yet
        if (index === selectedAnswerIndex) {
            return isCorrect ? 'correct' : 'wrong';
        } else if (index === questions[currentQuestionIndex].correctAnswerIndex) {
            return 'correct-highlight';
        }
        return '';
    };

    const selectAnswer = (index) => {
        const correct = questions[currentQuestionIndex].correctAnswerIndex === index;
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(updatedAnswers); // Store the selected answer in the array
        setIsCorrect(correct);
        setShowExplanation(true);
    };

    const toggleExplanation = () => {
        setShowExplanation(prevState => !prevState);
    };

    const finishQuiz = () => {
        const score = selectedAnswers.filter(
            (answer, index) => answer === questions[index].correctAnswerIndex
        ).length;
        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    };

    const handleNavigation = (direction) => {
        setIsCorrect(null); // Reset correctness for the new question
        setShowExplanation(false); // Hide explanation when navigating
        if (direction === 'next') {
            if (currentQuestionIndex === questions.length - 1) {
                finishQuiz(); // Call finishQuiz when it's the last question
            } else {
                setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
            }
        } else if (direction === 'previous') {
            setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
        }
    };

    return (
        <div className="quiz-wrapper">
            {loggedIn ? (
                <div className="quiz-container">
                    {questions.length > 0 && showQuestion()}

                    {selectedAnswers[currentQuestionIndex] !== null && (
                        <div>
                            <button onClick={toggleExplanation}>
                                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                            </button>
                            {showExplanation && (
                                <div className="explanation">
                                    <p>{questions[currentQuestionIndex].explanation}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div id="navigation_buttons">
                        <button
                            id="previous_btn"
                            onClick={() => handleNavigation('previous')}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            id="next_btn"
                            onClick={() => handleNavigation('next')}
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
