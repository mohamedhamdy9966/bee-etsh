import React, { useState } from 'react';
import './EmailSubscribe.css';

const EmailSubscribe = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubscribe = async () => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      setError('Please enter a valid Gmail address.');
      setSuccess('');  // Clear success message if present
    } else {
      setError('');
      try {
        const response = await fetch('https://pharmaca-production.up.railway.app/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess('Subscribed successfully!');
          setEmail('');  // Clear input field
        } else {
          setError(data.message || 'Subscription failed.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='newsletter'>
      <h2>Get Our Latest Updates On Your Email</h2>
      <p>Subscribe Now and Stay Updated</p>
      <div>
        <input
          type="email"
          placeholder='Your Email ID'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}
    </div>
  );
}

export default EmailSubscribe;
