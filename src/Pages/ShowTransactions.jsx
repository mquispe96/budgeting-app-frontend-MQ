import {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {LogInContext} from '../Context/LogInContext';
import Loading from './Components/Loading';
import Transaction from './Components/Transaction';

const ShowTransactions = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {isLogged} = useContext(LogInContext);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/transactions`).then(res => {
      setTransactions(res.data);
      setBalance(
        res.data.reduce((acc, curr) => {
          return curr.type === 'Deposit'
            ? acc + curr.amount
            : acc - curr.amount;
        }, 0),
      );
    })
    .catch(err => navigate('/transactions/404'));
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, [isLogged]);

  return (
    <main className="transactions">
      <h1>Transactions</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="transactions__header">
            <h2>
              Balance:{' '}
              <span
                style={{
                  color:
                    balance >= 2000
                      ? 'green'
                      : balance >= 1000
                        ? 'orange'
                        : balance >= 300
                          ? 'rgb(255, 211, 0)'
                          : 'red',
                }}
              >
                ${balance}
              </span>
            </h2>
            {isLogged && (
              <p onClick={() => navigate('/transactions/transaction/new')}>
                Add a new transaction
              </p>
            )}
          </section>
          <table className="transactions__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>From</th>
                <th>Type</th>
                {isLogged && <th>...</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((log, idx) => (
                <Transaction key={idx} log={log} isLogged={isLogged} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default ShowTransactions;
