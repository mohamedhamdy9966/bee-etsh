import React, { useState, useEffect } from 'react';
import './Exam.css';
import Calculator from '../Calculator/Calculator';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import Instructions from '../instructions/Instructions';
import Timer from '../timer/Timer';
import ProgressBar from '../progressBar/ProgressBar';
import Spinner from '../spinner/Spinner';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [sofa, setSofa] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showCalculator, setShowCalculator] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [wrongAnsweredQuestions, setWrongAnsweredQuestions] = useState([]);
    const [showExplanation, setShowExplanation] = useState({});
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const examDuration = 20;
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://pharmaca-production.up.railway.app/allquestions');
            const data = await response.json();
            const shuffledQuestions = shuffle(data).slice(0, 105);
            setQuestions(shuffledQuestions);
            setAnswers(Array(shuffledQuestions.length).fill(null));
        } catch (error) {
            console.error("Error fetching questions:", error);
            alert("There was an issue loading the questions. Please try again later.");
        } finally {
            setLoading(false);
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
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            fetchQuestions();
        }
    }, []);

    const calculateProgress = () => {
        const answeredCount = answers.filter(answer => answer !== null).length;
        return (answeredCount / questions.length) * 100;
    };

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
        setAnswers(Array(questions.length).fill(null));
        setWrongAnsweredQuestions([]);
        setFlaggedQuestions([]);
        setShowExplanation({});
    };

    const selectAnswer = (selectedIndex) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = selectedIndex;
            return updatedAnswers;
        });

        const isCorrect = questions[currentQuestionIndex].answers[selectedIndex].correct;
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
        setExamFinished(true);
    };

    const toggleExplanation = (index) => {
        setShowExplanation((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="exam-wrapper">
            {loading || questions.length === 0 ? (
                <div className='first-cover'>
                <Instructions />
                <Spinner />
                </div>
            ) : !loggedIn ? (
                <div>
                    <p>You need to be logged in to take the exam. Please <a href="/login">login here</a>.</p>
                </div>
            ) : examFinished ? (
                <div className="exam-results">
                    <h2>Exam Finished</h2>
                    <p>You scored {sofa} out of {questions.length}</p>
                    <div className='btn'>Congratulations</div>
                    <button onClick={startExam}>Start Exam</button>
                    {wrongAnsweredQuestions.length > 0 && (
                        <div className="wrong-answers">
                            <h3>The correct Answers For Your Wrong Questions Selected:</h3>
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
            ) : (
                <>
                    <SidebarBullets
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        answers={answers}
                        flaggedQuestions={flaggedQuestions}
                    />
                    <div className="exam-content">
                        <div className="question">
                            <p>{currentQuestionIndex + 1}. {questions[currentQuestionIndex]?.question}</p>
                            {questions[currentQuestionIndex]?.image && (
                                <img src={questions[currentQuestionIndex].image} alt="question visual" className="question-image" />
                            )}
                        </div>
                        <div className="answer_btn">
                            {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`btn ${answers[currentQuestionIndex] === index ? "selected-answer" : ""}`}
                                    onClick={() => selectAnswer(index)}
                                    disabled={answers[currentQuestionIndex] !== null}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                        <div id="navigation_buttons">
                            <button
                                className="previous_btn"
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                            >
                                Previous
                            </button>
                            <button className="finish_btn" onClick={finishExam}>
                                Finish
                            </button>
                            <button className="flag_btn" onClick={flagQuestion}>
                                {flaggedQuestions.includes(currentQuestionIndex) ? 'Unflag' : 'Flag'}
                            </button>
                            <button
                                id="next_btn"
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}
                            >
                                Next
                            </button>
                            <button
                                className="toggleCalculator_btn"
                                onClick={() => setShowCalculator(prev => !prev)}
                            >
                                {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
                            </button>
                            <ProgressBar progress={calculateProgress()} />
                            <Timer duration={examDuration} onFinish={finishExam} />
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
                const isFlagged = flaggedQuestions.includes(index);
                return (
                    <div
                        key={index}
                        className={`bullet-item ${index === currentQuestionIndex ? 'on' : ''} ${isAnswered ? 'answered' : ''}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                    >
                        {index + 1}
                        {isFlagged && <FontAwesomeIcon icon={faFlag} className="flag-icon" />}
                    </div>
                );
            })}
        </div>
    );
};

export default Exam;
