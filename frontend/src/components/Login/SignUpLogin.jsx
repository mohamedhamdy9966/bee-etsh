import React, { useState } from 'react';
import './SignUpLogin.css';

export const SignUpLogin = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const login = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      setErrors("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!agreedToTerms) {
      setErrors("You must agree to the terms and conditions.");
      return;
    }

    if (state === "Login") {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
        <h2>{state}</h2>
        <div className="loginsignup_fields">
          {state === "Sign Up" && (
            <input 
              type="text" 
              value={formData.username} 
              onChange={changeHandler} 
              name='username' 
              placeholder='Your Name' 
              required 
            />
          )}
          <input 
            name='email' 
            value={formData.email} 
            onChange={changeHandler} 
            type="email" 
            placeholder='Email' 
            required 
          />
          <input 
            name='password' 
            value={formData.password} 
            onChange={changeHandler} 
            type="password" 
            placeholder='Password' 
            required 
          />
        </div>
        {errors && <p className='loginsignup_errors'>{errors}</p>}
        <button 
          onClick={handleButtonClick} 
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        {state === "Sign Up" ? (
          <p className='loginsignup_login'> 
            Already Have An Account? 
            <span 
              style={{cursor:"pointer"}} 
              onClick={() => setState("Login")}
            >
              Log In
            </span>
          </p>
        ) : (
          <p className='loginsignup_login'> 
            Create An Account? 
            <span 
              style={{cursor:"pointer"}} 
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}

        <div className="loginsignup_agree">
          <input 
            type="checkbox" 
            checked={agreedToTerms} 
            onChange={() => setAgreedToTerms(!agreedToTerms)} 
          />
          <p>By continuing, I agree to the terms & conditions</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;