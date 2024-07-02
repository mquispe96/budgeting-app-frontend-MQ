import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import {LuEye} from 'react-icons/lu';
import {LuEyeOff} from 'react-icons/lu';

const SignUp = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {setIsLogged} = useContext(LogInContext);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState('');
  const [validationResults, setValidationResults] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    noRepeat: true,
  });
  const [passwordPassed, setPasswordPassed] = useState(false);

  const validatePassword = password => {
    setValidationResults({
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@#$!%*?&]/.test(password),
      noRepeat: !/(.)\1/.test(password),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {username, password, confirmPassword} = credentials;
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 3000);
      return;
    }
    axios
      .post(`${BASE_URL}/usernames`, {username, password})
      .then(res => {
        setIsLogged(res.data);
        navigate('/transactions');
      })
      .catch(err => {
        setError(err.response.data.error);
        setTimeout(() => setError(''), 3000);
      });
  };

  useEffect(() => {
    setPasswordPassed(
      Object.values(validationResults).every(result => result === true),
    );
  }, [validationResults]);

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
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
      <div className="signup-form__password">
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
          value={credentials.password}
          onChange={e => {
            setCredentials({...credentials, password: e.target.value});
            validatePassword(e.target.value);
          }}
        />
        {!passwordVisibility ? (
          <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
        ) : (
          <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
        )}
      </div>
      {!passwordPassed && !credentials.password ? (
        ''
      ) : !passwordPassed ? (
        <ul>
          <li style={{color: validationResults.length ? 'green' : 'red'}}>
            At least 12 characters
          </li>
          <li style={{color: validationResults.lowercase ? 'green' : 'red'}}>
            Contains lowercase letters
          </li>
          <li style={{color: validationResults.uppercase ? 'green' : 'red'}}>
            Contains uppercase letters
          </li>
          <li style={{color: validationResults.number ? 'green' : 'red'}}>
            Contains numbers
          </li>
          <li style={{color: validationResults.specialChar ? 'green' : 'red'}}>
            Contains special characters (@#$!%*?&)
          </li>
          <li
            style={{
              color:
                validationResults.noRepeat && credentials.password
                  ? 'green'
                  : 'red',
            }}
          >
            Does not contain consecutive repeated characters
          </li>
        </ul>
      ) : (
        <>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="signup-form__password">
            <input
              type={passwordVisibility ? 'text' : 'password'}
              id="confirmPassword"
              value={credentials.confirmPassword}
              onChange={e =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value,
                })
              }
            />
            {!passwordVisibility ? (
              <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
            ) : (
              <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
            )}
          </div>
        </>
      )}
      <div className="signup-form__btns">
        <button type="button" onClick={() => navigate('/transactions')}>
          Cancel
        </button>
        <button type="submit">Sign Up</button>
      </div>
      <button type="button" onClick={() => navigate('/transactions/login')}>
        Log In
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;
