import { useEffect, useState } from 'react';
import './ListQuestions.css';
import cross_icon from "../../assets/images/cross-icon.png";

const ListQuestions = () => {

    const [allQuestions, setAllQuestions] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Track which question is being edited
    const [editedQuestion, setEditedQuestion] = useState({
        question: '',
        category: '',
        explanation: '',
        answers: [{ text: '', correct: false }],
        image: ''
    });

    const fetchInfo = async () => {
        const response = await fetch('https://pharmaca-backend.vercel.app/allquestions');
        const data = await response.json();
        setAllQuestions(data);
    }

    const remove_question = async (id) => {
        await fetch('https://pharmaca-backend.vercel.app/removequestion', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        fetchInfo();
    }

    const update_question = async (id) => {
        await fetch(`https://pharmaca-backend.vercel.app/updatequestion/${id}`, {
            method: 'POST', // You may use PUT if that's supported by your server.
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedQuestion)
        });
        setIsEditing(null);
        fetchInfo();
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleEdit = (question) => {
        setIsEditing(question.id); // Set the editing mode for the question
        setEditedQuestion(question); // Populate the form with existing question data
    }

    const handleInputChange = (e, field) => {
        setEditedQuestion({
            ...editedQuestion,
            [field]: e.target.value
        });
    }

    const handleAnswerChange = (e, index, field) => {
        const updatedAnswers = editedQuestion.answers.map((answer, i) => (
            i === index ? { ...answer, [field]: field === 'correct' ? e.target.checked : e.target.value } : answer
        ));
        setEditedQuestion({
            ...editedQuestion,
            answers: updatedAnswers
        });
    }

    return (
        <div className='list-question'>
            <h2>All Questions</h2>
            <div className="listquestion-format-main">
                <p>Questions</p>
                <p>Category</p>
                <p>Explanation</p>
                <p>Answers</p>
                <p>Image</p>
                <p>Edit</p>
                <p>Remove</p>
            </div>
            <div className="listquestion-allquestions">
                <hr />
                {allQuestions.map((question, index) => (
                    <div key={index} className="listquestion-format-main listquestion-format">
                        {isEditing === question.id ? (
                            // Edit Form
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editedQuestion.question}
                                    onChange={(e) => handleInputChange(e, 'question')}
                                />
                                <input
                                    type="text"
                                    value={editedQuestion.category}
                                    onChange={(e) => handleInputChange(e, 'category')}
                                />
                                <input
                                    type="text"
                                    value={editedQuestion.explanation}
                                    onChange={(e) => handleInputChange(e, 'explanation')}
                                />
                                <div>
                                    {editedQuestion.answers.map((answer, i) => (
                                        <div key={i}>
                                            <input
                                                type="text"
                                                value={answer.text}
                                                onChange={(e) => handleAnswerChange(e, i, 'text')}
                                            />
                                            <label>
                                                Correct
                                                <input
                                                    type="checkbox"
                                                    checked={answer.correct}
                                                    onChange={(e) => handleAnswerChange(e, i, 'correct')}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => update_question(question.id)}>Save</button>
                                <button onClick={() => setIsEditing(null)}>Cancel</button>
                            </div>
                        ) : (
                            // Display Question
                            <>
                                <p>{question.question}</p>
                                <p>{question.category}</p>
                                <p>{question.explanation}</p>
                                <div>
                                    {question.answers.map((answer, i) => (
                                        <p key={i}>{answer.text} {answer.correct && "(Correct)"}</p>
                                    ))}
                                </div>
                                {question.image && (
                                    <img src={question.image} alt="Question related" className="listquestion-question-icon" />
                                )}
                                <button onClick={() => handleEdit(question)}>Edit</button>
                                <img onClick={() => { remove_question(question.id) }} src={cross_icon} alt="Remove question" className="listquestion-remove-icon" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListQuestions;
