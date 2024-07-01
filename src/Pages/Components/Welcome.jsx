import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {useComponentVisible} from '../../Custom-Hooks/useComponentVisible.js';
import {LogInContext} from '../../Context/LogInContext';
import {IoMdArrowDropdown} from 'react-icons/io';

const Welcome = () => {
  const {ref, isComponentVisible, setIsComponentVisible} =
    useComponentVisible(false);
  const navigate = useNavigate();

  const {setIsLogged} = useContext(LogInContext);

  return (
    <div className="nav__welcome" ref={ref}>
      <div className="menu-position">
        <span onClick={() => setIsComponentVisible(prev => !prev)}>
          Welcome
          <IoMdArrowDropdown className="menu-arrow" />
        </span>
        {isComponentVisible && (
          <div className="menu">
            <span
              onClick={() => {
                setIsComponentVisible(prev => !prev);
                setIsLogged(false);
              }}
            >
              Sign Out
            </span>
            <span
              onClick={() => {
                setIsComponentVisible(prev => !prev);
                navigate('/delete-account');
              }}
            >
              Delete Account
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
