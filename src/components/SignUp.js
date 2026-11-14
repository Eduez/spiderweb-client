import React, {useState} from "react";
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState('');
    
    const navigate = useNavigate();

const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.trim(),
        email: email.trim(),
        password,
        bio: bio.trim(),
      }),
    });

    if (response.status === 409) {
      alert('That username or email is already registered.');
      return;
    }

    if (!response.ok) {
      alert(`Signup failed (HTTP ${response.status}).`);
      return;
    }

    alert('Account created. You can now log in.');
    navigate('/');
  } catch {
    alert('Could not reach the API. Check that Spring Boot is running.');
  }
};

//Render HTML Sign up form
    return(
        <div className="signup-container">
            <form onSubmit={handleSignUp} className="signup-form">
            <h2><FontAwesomeIcon icon={faSpider}/> <b>SPIDER</b>WEB</h2>
                <div>
                    <input 
                    type="text" 
                    id="username"
                    placeholder="Username" 
                    required 
                    onChange={(e) => setUserName(e.target.value)}>
                    </input>
                </div>
                <input
                    type="email"
                    name="email"
                    aria-label="Email address"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div>
                    <input 
                    type="password" 
                    id="password"
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="profile-image">Profile Image</label>
                    <input 
                    type="file" 
                    placeholder="Upload Profile Image"  
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}>
                    </input>
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="Bio" 
                    onChange={(e) => setBio(e.target.value)}>
                    </input>
                </div>
                <p>Already have an account? <a href="/">Login</a></p>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;