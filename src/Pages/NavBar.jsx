import {useState, useEffect} from 'react';
import {useNavigate, Outlet} from 'react-router-dom';
import {LogInContext} from '../Context/LogInContext';
import Welcome from './Components/Welcome';

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);

  return (
    <LogInContext.Provider value={{isLogged, setIsLogged}}>
      <header className="nav">
        <div className="nav__title">
          <h1 onClick={() => navigate('/transactions')}>Budget App</h1>
        </div>
        {isLogged ? (
          <Welcome />
        ) : (
          <div className="nav__login-btn">
            <button onClick={() => navigate('/login')}>Log In</button>
          </div>
        )}
      </header>
      <Outlet />
    </LogInContext.Provider>
  );
};

export default NavBar;
