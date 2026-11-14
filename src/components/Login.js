import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle Login form submission 
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
      setError('Invalid username or password.');
      return;
    }

    if (!response.ok) {
      setError(`Login failed (HTTP ${response.status}).`);
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ username }));
    navigate('/home');
  } catch {
    setError('Could not reach the API. Check that Spring Boot is running.');
  }
};
//Render HTML Login form
  return (
    <div class="login-container">
     
      <form class="login-form" onSubmit={handleLogin}>
      <h2><FontAwesomeIcon icon={faSpider}/> <b>SPIDER</b>WEB</h2>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p>Do not have an account? <a href="/signup">Sign Up</a></p>
        <button type="submit">Login</button>
      </form>
      {error && <p class="error-message">{error}</p>}
    </div>
  );
};

export default Login;