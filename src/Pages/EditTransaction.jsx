import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Loading from './Components/Loading';
import FormTemplate from './Components/FormTemplate';

const EditTransaction = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {id} = useParams();
  const [transaction, setTransaction] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    const transactionValues = Object.keys(transaction).reduce((obj, key) => {
      if (key !== 'amount') {
        obj[key] = transaction[key].value;
      } else {
        obj[key] = Number(transaction[key]);
      }
      return obj;
    }, {});
    axios
      .put(`${BASE_URL}/transactions/${id}`, transactionValues)
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
    axios
      .get(`${BASE_URL}/transactions/${id}`)
      .then(res => {
        setTransaction(
          Object.keys(res.data).reduce((obj, key) => {
            if (key !== 'amount') {
              obj[key] = {value: res.data[key], label: res.data[key]};
            } else {
              obj[key] = res.data[key];
            }
            return obj;
          }, {}),
        );
      })
      .catch(error => navigate('/transactions/404'));
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <main className="update-transaction">
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
                navigate(`/transactions/transaction/${id}`);
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
              Create Transaction
            </button>
          </div>
        </section>
      ) : (
        <>
          <h1>Update Transaction</h1>
          {isLoading ? (
            <Loading />
          ) : (
            <FormTemplate
              transaction={transaction}
              setTransaction={setTransaction}
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

export default EditTransaction;
