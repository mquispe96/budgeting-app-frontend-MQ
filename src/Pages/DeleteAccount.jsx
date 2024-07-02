import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import {LuEye} from 'react-icons/lu';
import {LuEyeOff} from 'react-icons/lu';

const DeleteAccount = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const { isLogged,setIsLogged} = useContext(LogInContext);
  const [password, setPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!password) {
      setError('Please fill in all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if(password === isLogged.password){
      axios
        .delete(`${BASE_URL}/usernames/${isLogged.id}`)
        .then(res => {
          setIsLogged(false);
          navigate('/transactions');
        })
        .catch(err => {
          setError(err.response.data.error);
          setTimeout(() => setError(''), 3000);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="delete-form">
      <h2>Delete Account</h2>
      <label htmlFor="password">Password</label>
      <div className="delete-form__password">
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={e =>
            setPassword(e.target.value)
          }
        />
        {!passwordVisibility ? (
          <LuEye onClick={() => setPasswordVisibility(prev => !prev)} />
        ) : (
          <LuEyeOff onClick={() => setPasswordVisibility(prev => !prev)} />
        )}
      </div>
      <div className="delete-form__btns">
        <button type="button" onClick={() => navigate('/transactions')}>
          Cancel
        </button>
        <button type="submit">Delete Account</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default DeleteAccount;
