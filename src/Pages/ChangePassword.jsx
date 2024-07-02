import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import {LuEye} from 'react-icons/lu';
import {LuEyeOff} from 'react-icons/lu';

const ChangePassword = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {isLogged, setIsLogged} = useContext(LogInContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState({
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
    if (!oldPassword || !newPassword.password || !newPassword.confirmPassword) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (oldPassword !== isLogged.password) {
      setError('Old password is incorrect');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (newPassword.password !== newPassword.confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 3000);
      return;
    }
    axios
      .put(`${BASE_URL}/usernames/${isLogged.id}`, {
        password: newPassword.password,
      })
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
    setPasswordPassed(Object.values(validationResults).every(result => result));
  }, [validationResults]);

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <h2>Change Password</h2>
      <label htmlFor="old-password">Old Password:</label>
      <div className="update-form__password">
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="old-password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        {!passwordVisibility ? (
          <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
        ) : (
          <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
        )}
      </div>
      <label htmlFor="new-password">New Password:</label>
      <div className="update-form__password">
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="new-password"
          value={newPassword.password}
          onChange={e => {
            setNewPassword({...newPassword, password: e.target.value});
            validatePassword(e.target.value);
          }}
        />
        {!passwordVisibility ? (
          <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
        ) : (
          <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
        )}
      </div>
      {!passwordPassed && !newPassword.password ? (
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
                validationResults.noRepeat && newPassword.password
                  ? 'green'
                  : 'red',
            }}
          >
            Does not contain consecutive repeated characters
          </li>
        </ul>
      ) : (
        <>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="update-form__password">
            <input
              type={passwordVisibility ? 'text' : 'password'}
              id="confirm-password"
              value={newPassword.confirmPassword}
              onChange={e =>
                setNewPassword({
                  ...newPassword,
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
      <div className="update-form__btns">
        <button type="button" onClick={() => navigate('/transactions')}>
          Cancel
        </button>
        <button type="submit">Change Password</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ChangePassword;
