import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const DeleteTransaction = ({setShowDeleteWindow, id}) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();

  return (
    <section className="delete-window">
      <p>Are you sure you want to delete this transaction?</p>
      <div className="delete-window__btns">
        <button onClick={() => setShowDeleteWindow(false)}>Cancel</button>
        <button
          onClick={() => {
            axios.delete(`${BASE_URL}/transactions/${id}`);
            setShowDeleteWindow(false);
            navigate('/transactions');
          }}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default DeleteTransaction;
