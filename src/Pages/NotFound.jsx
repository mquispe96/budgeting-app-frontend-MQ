import {useNavigate} from 'react-router-dom';
import fzf from '../../public/404.webp';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <img src={fzf} alt="404" />
      <button onClick={() => navigate('/transactions')}>Go Home</button>
    </main>
  );
};

export default NotFound;
