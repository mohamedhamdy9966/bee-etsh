import React, { useState, useEffect, useRef } from 'react';
import './Exam.css';
import Calculator from '../Calculator/Calculator';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sofa, setSofa] = useState(0);
    const [timer, setTimer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [showCalculator, setShowCalculator] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [wrongAnsweredQuestions, setWrongAnsweredQuestions] = useState([]);
    const [showExplanation, setShowExplanation] = useState({});
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const examDuration = 7200;
    const timerElementRef = useRef(null);
    const answersButtonRef = useRef(null);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:3000/questions');
            const data = await response.json();
            const shuffledQuestions = shuffle(data).slice(0, 105);
            setQuestions(shuffledQuestions);
            setAnswers(Array(shuffledQuestions.length).fill(null));
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');
            return false;
        }
        setLoggedIn(true);
        return true;
    };

    useEffect(() => {
        if (checkLoginStatus()) {
            fetchQuestions();
        }
    }, []);

    const ProgressBar = ({ progress }) => {
        return (
            <div className="progress-bar">
                <div
                    className="progress-bar__fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        );
    };
    
    const calculateProgress = () => {
        const answeredCount = answers.filter(answer => answer !== null).length;
        return (answeredCount / questions.length) * 100;
    };

    useEffect(() => {
        if (questions.length > 0) {
            startExam();
        }
    }, [questions]);

    useEffect(() => {
        showQuestion();
    }, [currentQuestionIndex, questions]);

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (event.button === 2) {
                event.preventDefault();
                if (event.target.classList.contains('btn')) {
                    event.target.style.textDecoration = 'line-through';
                }
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const startExam = () => {
        setCurrentQuestionIndex(0);
        setSofa(0);
        setExamFinished(false);
        setShowCalculator(false);
        startTimer();
    };

    const startTimer = () => {
        let timeRemaining = examDuration;
        const interval = setInterval(() => {
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = timeRemaining % 60;

            if (timerElementRef.current) {
                timerElementRef.current.innerHTML = `<i class="fa-solid fa-clock"></i> Section Time Remaining: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
            }

            if (timeRemaining <= 0) {
                clearInterval(interval);
                finishExam();
            }

            timeRemaining--;
        }, 1000);

        return () => clearInterval(interval);
    };

    const formatTime = (time) => time < 10 ? `0${time}` : time;

    const showQuestion = () => {
        if (questions.length === 0) return;

        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
            const questionElement = document.getElementById("question");
            questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

            if (currentQuestion.image) {
                const imageElement = document.createElement("img");
                imageElement.src = currentQuestion.image;
                imageElement.classList.add("question-image");
                questionElement.appendChild(imageElement);
            }

            const answersButton = answersButtonRef.current;
            answersButton.innerHTML = "";

            currentQuestion.answers.forEach((answer, index) => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                button.dataset.correct = answer.correct ? "true" : "false";

                if (index === answers[currentQuestionIndex]) {
                    button.classList.add("selected-answer");
                }

                button.addEventListener("click", () => selectAnswer(index));
                answersButton.appendChild(button);

                if (answers[currentQuestionIndex] !== null) {
                    button.disabled = true;
                }
            });
        }
    };

    const selectAnswer = (selectedIndex) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = selectedIndex;
            return updatedAnswers;
        });

        const answerButtons = Array.from(answersButtonRef.current.children);

        answerButtons.forEach(button => button.classList.remove("selected-answer"));

        answerButtons[selectedIndex].classList.add("selected-answer");

        answerButtons.forEach(button => button.disabled = true);

        const isCorrect = answerButtons[selectedIndex].dataset.correct === "true";
        if (isCorrect) {
            setSofa(prevSofa => prevSofa + 1);
        } else {
            setWrongAnsweredQuestions(prev => [...prev, questions[currentQuestionIndex]]);
        }

        if (currentQuestionIndex === questions.length - 1) {
            finishExam();
        }
    };

    const flagQuestion = () => {
        setFlaggedQuestions(prev => {
            const isFlagged = prev.includes(currentQuestionIndex);
            if (isFlagged) {
                return prev.filter(index => index !== currentQuestionIndex);
            } else {
                return [...prev, currentQuestionIndex];
            }
        });
    };
    
    const finishExam = () => {
        if (timer) {
            clearInterval(timer);
        }
        setTimer(null);
        setExamFinished(true);
    };

    const toggleExplanation = (index) => {
        setShowExplanation((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleStartExam = () => {
        if (!loggedIn) {
            navigate('/login');
        } else {
            startExam();
        }
    };

    return (
        <div className="exam-wrapper">
            {examFinished ? (
                <div className="exam-results">
                    <h2>Exam Finished</h2>
                    <p>You scored {sofa} out of {questions.length}</p>
                    <button>Try Again</button>
                    {wrongAnsweredQuestions.length > 0 && (
                        <div className="wrong-answers">
                            <h3>Incorrect Answers:</h3>
                            <ul>
                                {wrongAnsweredQuestions.map((question, index) => (
                                    <li key={index}>
                                        <strong>{question.question}</strong>
                                        <ul>
                                            {question.answers.map((answer, i) => (
                                                <li key={i} className={answer.correct ? "correct" : ""}>
                                                    {answer.text}
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={() => toggleExplanation(index)}>
                                            {showExplanation[index] ? 'Hide Explanation' : 'Show Explanation'}
                                        </button>
                                        {showExplanation[index] && (
                                            <p className="explanation">
                                                {question.explanation}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : questions.length === 0 ? (
                <button onClick={handleStartExam}>Start Exam</button>
            ) : (
                <>
                <SidebarBullets 
                        questions={questions} 
                        currentQuestionIndex={currentQuestionIndex} 
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        answers={answers}
                        flaggedQuestions={flaggedQuestions}
                    />
                    <div className="exam-content"><div id="question"></div><div id="answer_btn" ref={answersButtonRef}></div>
                    <div id="navigation_buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button id="previous_btn" style={{ display: 'inline-block', padding: '10px 20px' }} onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}>
                                Previous
                            </button>
                            <button id="finish_btn" style={{ display: 'inline-block', padding: '10px 20px' }} onClick={finishExam}>
                                Finish
                            </button>
                            <button id='flag_btn' style={{ display: 'inline-block', padding: '10px 20px' }} onClick={flagQuestion}>
                                {flaggedQuestions.includes(currentQuestionIndex) ? 'Remove Flag' : 'Flag'}
                            </button>
                            <button id="next_btn" style={{ display: 'inline-block', padding: '10px 20px' }} onClick={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}>
                                Next
                            </button>
                            <button id="toggleCalculator_btn" style={{ display: 'inline-block', padding: '10px 20px' }} onClick={() => setShowCalculator(prev => !prev)}>
                                {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
                            </button>
                            <ProgressBar progress={calculateProgress()} />
                            <div ref={timerElementRef} id="timer"></div>
                        </div>
                        {showCalculator && (
                            <div className="calculator-container">
                                <Calculator />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
    };
    
    const SidebarBullets = ({ questions, currentQuestionIndex, setCurrentQuestionIndex, answers = [], flaggedQuestions }) => {
        return (
            <div className="sidebar">
                {questions.map((_, index) => {
                    const isAnswered = answers[index] !== null;
                    const isFlagged = flaggedQuestions.includes(index); // Check if the question is flagged
                    return (
                        <div 
                            key={index}
                            className={`bullet-item ${index === currentQuestionIndex ? 'on' : ''} ${isAnswered ? 'answered' : ''}`}
                            onClick={() => setCurrentQuestionIndex(index)}
                        >
                            {index + 1}
                            {isFlagged && <FontAwesomeIcon icon={faFlag} className="flag-icon" />} {/* Conditionally render flag icon */}
                        </div>
                    );
                })}
            </div>
        );
    };
    
    
    export default Exam;
