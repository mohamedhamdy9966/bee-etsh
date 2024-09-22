import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

const Notes = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
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

  const handlePdfClick = (pdfPath) => {
    setSelectedPdf(pdfPath);
  };

  return (
    <div className="notes-container">
      {loggedIn ? (
        <>
          <h2>Non Pharma</h2>
          <button onClick={() => handlePdfClick('/All-non-Pharma.pdf')}>
            View Non Pharma Notes
          </button>

          <h2>Pharma</h2>
          <button onClick={() => handlePdfClick('/notes.pdf')}>
            View Pharma Notes
          </button>

          <h2>Calculations</h2>
          <button onClick={() => handlePdfClick('/notes-2.pdf')}>
            View Calculations Notes
          </button>

          <h2>Work Regulations</h2>
          <button onClick={() => handlePdfClick('/Rx-NAPLEX.pdf')}>
            View Work Regulations Notes
          </button>

          {selectedPdf ? (
            <div className="pdf-viewer">
              <embed
                src={selectedPdf}
                title="PDF Viewer"
                width="100%"
                height="500px"
              />
            </div>
          ) : (
            <p>Please select a PDF to view.</p>
          )}
        </>
      ) : (
        <p>You need to be logged in to view the notes.</p>
      )}
    </div>
  );
};

export default Notes;
