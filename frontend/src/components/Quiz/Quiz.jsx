import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Assuming react-router-dom is being used

const Quiz = () => {
    const [questions, setQuestions] = useState([]); // State for questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
    const [answers, setAnswers] = useState([]); // Stores selected answers
    const answersButtonRef = useRef(null); // Reference to the container for answer buttons
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);  // Tracks login status

    // Check user login status
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');  // Redirect to login if no token found
            return false;
        }
        setLoggedIn(true);  // Set logged-in state
        fetchQuestions();  // Fetch questions if user is logged in
        return true;
    };

    // Fetch questions from your backend
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:3000/questions'); // Fetch questions from your backend
            const data = await response.json();
    
            // Shuffle the questions
            const shuffledQuestions = shuffleArray(data);
    
            // Format the shuffled questions
            const formattedQuestions = shuffledQuestions.map(question => ({
                question: question.question,
                answers: question.answers.map(answer => answer.text),
                correctAnswerIndex: question.answers.findIndex(answer => answer.correct)
            }));
    
            setQuestions(formattedQuestions);
            setAnswers(Array(formattedQuestions.length).fill(null)); // Initialize answers
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        }
    };
    
    // Helper function to shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    

    // Show current question and answer buttons
    const showQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <>
                <h2>{currentQuestion.question}</h2>
                <div id="answer_btn" ref={answersButtonRef}>
                    {currentQuestion.answers.map((answer, index) => (
                        <button
                            key={index}
                            className={answers[currentQuestionIndex] === index ? 'selected' : ''}
                            onClick={() => selectAnswer(index)}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </>
        );
    };

    // Handle answer selection
    const selectAnswer = (index) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = index; // Store the selected answer index
            return updatedAnswers;
        });
    };

    // Handle quiz completion
    const finishQuiz = () => {
        const score = answers.filter((answer, index) => {
            return questions[index].correctAnswerIndex === answer;
        }).length;

        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
        // Implement logic to display score on the UI instead of alert if required
    };

    return (
        <div>
            {loggedIn ? (
                <>
                    {questions.length > 0 && showQuestion()}

                    <div id="navigation_buttons">
                        <button
                            id="previous_btn"
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            id="next_btn"
                            onClick={() => {
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
                </>
            ) : (
                <p>Redirecting to login...</p>
            )}
        </div>
    );
};

export default Quiz;
