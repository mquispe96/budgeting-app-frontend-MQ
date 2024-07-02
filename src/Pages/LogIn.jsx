import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';

const LogIn = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {setIsLogged} = useContext(LogInContext);
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
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
      <input
        type="password"
        id="password"
        value={credentials.password}
        onChange={e =>
          setCredentials({...credentials, password: e.target.value})
        }
      />
      <div className="login-form__btns">
        <button type='button' onClick={() => navigate('/transactions')}>Cancel</button>
        <button type='submit'>Log In</button>
      </div>
      <button type='button' onClick={() => navigate('/transactions/signup')}>Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LogIn;
