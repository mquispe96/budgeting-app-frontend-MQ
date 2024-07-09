import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loading from './Components/Loading';
import FormTemplate from './Components/FormTemplate';

const NewTransaction = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    from: '',
    category: '',
    type: {value: 'Withdrawal', label: 'Withdrawal'},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const transactionValues = Object.keys(newTransaction).reduce((obj, key) => {
      if (key !== 'amount') {
        obj[key] = newTransaction[key].value;
      } else {
        obj[key] = Number(newTransaction[key]);
      }
      return obj;
    }, {});
    axios
      .post(`${BASE_URL}/transactions`, transactionValues)
      .then(res => {
        setConfirm(res.data);
      })
      .catch(error => {
        setError([
          'Make sure all fields are filled out, and try again.',
          'Make sure the amount is a number.',
          'Psst, you can create new options by typing them in!',
        ]);
        setTimeout(() => {
          setError('');
        }, 5000);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <main className="create-transaction">
      {confirm ? (
        <section className="confirm">
          <p>Transaction created successfully!</p>
          <div className="confirm__btns">
            <button
              onClick={() => {
                setConfirm(false);
                navigate('/transactions');
              }}
            >
              Go to Transactions
            </button>
            <button
              onClick={() => {
                setConfirm(false);
                navigate(`/transactions/transaction/${confirm}`);
              }}
            >
              View Transaction
            </button>
            <button
              onClick={() => {
                setConfirm(false);
                navigate('transactions/transaction/new');
              }}
            >
              Create Another
            </button>
          </div>
        </section>
      ) : (
        <>
          <h1>New Transaction</h1>
          {isLoading ? (
            <Loading />
          ) : (
            <FormTemplate
              transaction={newTransaction}
              setTransaction={setNewTransaction}
              handleSubmit={handleSubmit}
              error={error}
              navigate={navigate}
            />
          )}
        </>
      )}
    </main>
  );
};

export default NewTransaction;
