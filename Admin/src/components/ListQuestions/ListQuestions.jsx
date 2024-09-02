import React, { useEffect, useState } from 'react';
import './ListQuestions.css';
import cross_icon from "../../assets/images/cross-icon.png";

const ListQuestions = () => {

    const remove_question = async (id)=>{
        await fetch('http://localhost:4000/removequestion',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    const [allQuestions, setAllQuestions] = useState([]);

    const fetchInfo = async () => {
        const response = await fetch('http://localhost:4000/allquestions');
        const data = await response.json();
        setAllQuestions(data);
    }

    useEffect(() => {
        fetchInfo();
    }, []); // Corrected to empty dependency array

    return (
        <div className='list-question'>
            <h2>All Questions</h2>
            <div className="listquestion-format-main">
                <p>Questions</p>
                <p>Category</p>
                <p>Explanation</p>
                <p>Answers</p>
                <p>Image</p>
                <p>Remove</p>
            </div>
            <div className="listquestion-allquestions">
                <hr />
                {allQuestions.map((question, index) => {
                    return (
                        <div key={index} className="listquestion-format-main listquestion-format">
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
                            <img onClick={() => { remove_question(question.id) }} src={cross_icon} alt="Remove question" className="listquestion-remove-icon" />
                            </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListQuestions;
