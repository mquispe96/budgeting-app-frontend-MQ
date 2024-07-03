import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Loading from './Components/Loading';
import DeleteTransaction from './Components/DeleteTransaction';

const ShowTransaction = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {id} = useParams();
  const [transaction, setTransaction] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/transactions/${id}`).then(res => {
      setTransaction(res.data);
    });
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <main className="transaction">
      <h1>Transaction</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="transaction__details">
            <h2>
              {transaction.type} - {transaction.from}
            </h2>
            <p>
              {transaction.category} - {transaction.name}
            </p>
            <p>Amaount: ${transaction.amount}</p>
            <div className="transaction__date">
              <p>Created: {transaction.created}</p>
              <p>Updated: {transaction.updated}</p>
            </div>
          </section>
          <section className="transaction__btns">
            <button onClick={() => navigate('/transactions')}>Back</button>
            <button onClick={() => navigate(`/transactions/transaction/edit/${id}`)}>
              Edit
            </button>
            <button onClick={() => setShowDeleteWindow(true)}>
              Delete
            </button>
          </section>
        </>
      )}
      {showDeleteWindow && (
        <DeleteTransaction
          id={id}
          setShowDeleteWindow={setShowDeleteWindow}
        />
      )}
    </main>
  );
};

export default ShowTransaction;
