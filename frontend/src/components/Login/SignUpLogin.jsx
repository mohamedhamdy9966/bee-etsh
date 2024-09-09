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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      return "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. No spaces are allowed.";
    }
    return null;
  };

  const validateForm = () => {
    const { username, email, password } = formData;

    if (state === "Sign Up" && username.trim().length < 3) {
      return "Username must be at least 3 characters long.";
    }

    if (!email.includes("@") || email.length < 5) {
      return "Please enter a valid email address.";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return passwordError;
    }

    if (state === "Sign Up" && !agreedToTerms) {
      return "You must agree to the terms and conditions.";
    }

    return null;
  };

  const login = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch('https://pharmaca-production.up.railway.app/login', {
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
        setErrors(data.errors || "Login failed. Please check your credentials.");
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
      const response = await fetch('https://pharmaca-production.up.railway.app/signup', {
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
        setErrors(data.errors || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrors("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
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
          <div className="password-field">
            <input 
              name='password' 
              value={formData.password} 
              onChange={changeHandler} 
              type={passwordVisible ? "text" : "password"} 
              placeholder='Password' 
              required 
            />
            <span 
              className="eye-icon" 
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "👁️" : "👁️‍🗨️"} {/* Eye icon */}
            </span>
          </div>
        </div>
        {errors && <p className='loginsignup_errors'>{errors}</p>}
        <button 
          onClick={handleButtonClick} 
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        {state === "Sign Up" ? (
          <>
            <p className='loginsignup_login'> 
              Already Have An Account? 
              <span 
                style={{cursor:"pointer"}} 
                onClick={() => setState("Login")}
              >
                Log In
              </span>
            </p>
            <div className="loginsignup_agree">
              <input 
                type="checkbox" 
                checked={agreedToTerms} 
                onChange={() => setAgreedToTerms(!agreedToTerms)} 
              />
              <p>By continuing, I agree to the terms & conditions</p>
            </div>
          </>
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
      </div>
    </div>
  );
};

export default SignUpLogin;
