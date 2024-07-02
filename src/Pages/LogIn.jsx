import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import {LuEye} from 'react-icons/lu';
import {LuEyeOff} from 'react-icons/lu';

const LogIn = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {setIsLogged} = useContext(LogInContext);
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const {username, password} = credentials;
    if (!username || !password) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }
    axios
      .post(`${BASE_URL}/usernames/login`, credentials)
      .then(res => {
        setIsLogged(true);
        navigate('/transactions');
      })
      .catch(err => {
        setError(err.response.data.error);
        setTimeout(() => setError(''), 3000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Log In</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={credentials.username}
        onChange={e =>
          setCredentials({...credentials, username: e.target.value})
        }
      />
      <label htmlFor="password">Password:</label>
      <div className="login-form__password">
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
          value={credentials.password}
          onChange={e =>
            setCredentials({...credentials, password: e.target.value})
          }
        />
        {passwordVisibility ? (
          <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
        ) : (
          <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
        )}
      </div>
      <div className="login-form__btns">
        <button type="button" onClick={() => navigate('/transactions')}>
          Cancel
        </button>
        <button type="submit">Log In</button>
      </div>
      <button type="button" onClick={() => navigate('/transactions/signup')}>
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LogIn;
