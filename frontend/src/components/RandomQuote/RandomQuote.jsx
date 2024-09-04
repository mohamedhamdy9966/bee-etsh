import React, { useState, useEffect } from 'react';
import './RandomQuote.css';

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: 'The World Is Yours',
    author: 'Al Pacino'
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        setError("Failed to load quotes. Please try again later.");
        console.error("Error fetching quotes:", error);
      }
    };

    loadQuotes();
  }, []);

  const random = () => {
    if (quotes.length > 0) {
      const select = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(select);
    }
  };

  return (
    <div className='container'>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="quote">
            {quote?.text || quote}
          </div>
          <div>
            <div className="line"></div>
            <div className="bottom">
              <div className="author">
                - {quote?.author?.split(',')[0] || "Unknown"}
              </div>
              <div className="icons">
                <button onClick={random}>New Quote</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomQuote;
