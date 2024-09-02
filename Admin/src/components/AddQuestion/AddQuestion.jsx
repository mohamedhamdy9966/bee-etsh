import React, { useState } from 'react';
import './AddQuestion.css';
import upload_area from '../../assets/images/upload_icon.svg';

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctAnswerIndex: null,
    category: '',
    explanation: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...questionData.answers];
    updatedAnswers[index] = value;
    setQuestionData(prevState => ({
      ...prevState,
      answers: updatedAnswers
    }));
  };

  const handleCorrectAnswerChange = (index) => {
    setQuestionData(prevState => ({
      ...prevState,
      correctAnswerIndex: index
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setQuestionData(prevState => ({
      ...prevState,
      image: file // Set image in state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, upload the image
      let formData = new FormData();
      formData.append('image', questionData.image);

      let responseData;

      // Fetch image upload
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        // Check if the response is JSON
        const contentType = uploadResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await uploadResponse.json();
        } else {
          console.error('Response was not JSON:', await uploadResponse.text());
          return; // Stop if the response is not JSON
        }

        if (responseData.success) {
          // Transform answers to match backend schema
          const formattedAnswers = questionData.answers.map((text, index) => ({
            text,
            correct: index === questionData.correctAnswerIndex
          }));

          // Prepare the question object
          const question = { 
            ...questionData, 
            image: responseData.image_url,
            answers: formattedAnswers // Use formatted answers
          };

          // Remove 'correctAnswerIndex' as it's no longer needed
          delete question.correctAnswerIndex;

          // Send the question data to the server
          const addQuestionResponse = await fetch('http://localhost:4000/addquestion', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(question),
          });

          if (addQuestionResponse.ok) {
            const addQuestionData = await addQuestionResponse.json();
            addQuestionData.success 
              ? alert("Question added successfully") 
              : alert("Failed to add question");
          } else {
            console.error('Error in addquestion API:', await addQuestionResponse.text());
          }
        }
      } else {
        console.error('Error in upload API:', await uploadResponse.text());
      }
    } catch (error) {
      console.error("Error submitting the question:", error);
    }
  };

  return (
    <div className='add-question'>
      <form onSubmit={handleSubmit}>
        <div className="addquestion-itemfield">
          <p>Question</p>
          <input 
            type="text" 
            name='question' 
            placeholder='Type here question' 
            value={questionData.question}
            onChange={handleInputChange} 
            required
          />
        </div>

        <div className="addquestion-itemfield">
          <p>Answers</p>
          {questionData.answers.map((answer, index) => (
            <div key={index}>
              <input 
                type="text" 
                name={`answer-${index}`} 
                placeholder={`Type here answer ${index + 1}`} 
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)} 
                required
              />
              <label>
                <input 
                  type="radio" 
                  name="correctAnswer" 
                  checked={questionData.correctAnswerIndex === index} 
                  onChange={() => handleCorrectAnswerChange(index)} 
                  required
                /> 
                Correct
              </label>
            </div>
          ))}
        </div>

        <div className="addquestion-category">
          <div className="addquestion-itemfield">
            <p>Question Category</p>
            <select 
              name="category" 
              className='add-question-selector'
              value={questionData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="SPLE">SPLE</option>
              <option value="DHA">DHA</option>
              <option value="HAAD">HAAD</option>
              <option value="MOH">MOH</option>
              <option value="NHRA">NHRA</option>
              <option value="VIVA">VIVA</option>
              <option value="Pearson Vue">Pearson Vue</option>
              <option value="QCHP">QCHP</option>
              <option value="BCPS">BCPS</option>
              <option value="PEBC">PEBC</option>
              <option value="KAPS">KAPS</option>
            </select>
          </div>
        </div>

        <div className="addquestion-explanation">
          <div className="addquestion-itemfield">
            <p>Explanation</p>
            <input 
              type="text" 
              name='explanation' 
              placeholder='Type here explanation' 
              value={questionData.explanation}
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>

        <div className="addquestion-itemfield">
          <label htmlFor="file-input">
            <img 
              src={questionData.image ? URL.createObjectURL(questionData.image) : upload_area} 
              alt="upload Icon" 
              className='addquestion-img' 
            />
          </label>
          <input 
            type="file" 
            name='image' 
            id='file-input' 
            onChange={handleFileChange}
            hidden 
            accept="image/*"
          />
        </div>

        <button type="submit" className='addquestion-btn'>ADD</button>
      </form>
    </div>
  );
};

export default AddQuestion;
