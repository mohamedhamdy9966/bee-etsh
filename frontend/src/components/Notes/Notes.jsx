import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

const Notes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, [navigate]);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
      return false;
    }
    setLoggedIn(true);
    return true;
  };

  return (
    <div className="notes-container">
      {loggedIn ? (
        <>
          <h2>Non Pharma</h2>
          <a href='/All-non-Pharma.pdf' target="_blank" rel="noopener noreferrer">
            View Non Pharma Notes
          </a>

          <h2>Pharma</h2>
          <a href='/notes.pdf' target="_blank" rel="noopener noreferrer">
            View Pharma Notes
          </a>

          <h2>Calculations</h2>
          <a href='/notes-2.pdf' target="_blank" rel="noopener noreferrer">
            View Calculations Notes
          </a>

          <h2>Work Regulations</h2>
          <a href='/Rx-NAPLEX.pdf' target="_blank" rel="noopener noreferrer">
            View Work Regulations Notes
          </a>
        </>
      ) : (
        <p>You need to be logged in to view the notes.</p>
      )}
    </div>
  );
};

export default Notes;
