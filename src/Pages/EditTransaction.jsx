import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';
import Loading from './Components/Loading';

const EditTransaction = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const {id} = useParams();
  const [transaction, setTransaction] = useState('');
  const [names, setNames] = useState([]);
  const [froms, setFroms] = useState([]);
  const [categories, setCategories] = useState([]);
  const types = [
    {value: 'Withdrawal', label: 'Withdrawal'},
    {value: 'Deposit', label: 'Deposit'},
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setTransaction({...transaction, [e.target.name]: e.target.value});
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setTransaction({...transaction, [actionMeta.name]: selectedOption});
  };

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
    axios.get(`${BASE_URL}/transactions`).then(response => {
      setNames(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.name);
          if (!exists) {
            acc.push({value: transaction.name, label: transaction.name});
          }
          return acc;
        }, []),
      );
      setFroms(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.from);
          if (!exists) {
            acc.push({value: transaction.from, label: transaction.from});
          }
          return acc;
        }, []),
      );
      setCategories(
        response.data.reduce((acc, transaction) => {
          const exists = acc.some(item => item.value === transaction.category);
          if (!exists) {
            acc.push({
              value: transaction.category,
              label: transaction.category,
            });
          }
          return acc;
        }, []),
      );
    });
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
            <form onSubmit={handleSubmit} className="form">
              <div className="form__section">
                <label htmlFor="name">Name</label>
                <CreatableSelect
                  inputId="name"
                  name="name"
                  value={transaction.name}
                  onChange={handleSelectChange}
                  options={names}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="amount">Amount</label>
                <br />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="form__section">
                <label htmlFor="from">From</label>
                <CreatableSelect
                  inputId="from"
                  name="from"
                  value={transaction.from}
                  onChange={handleSelectChange}
                  options={froms}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="category">Category</label>
                <CreatableSelect
                  inputId="category"
                  name="category"
                  value={transaction.category}
                  onChange={handleSelectChange}
                  options={categories}
                  isClearable
                />
              </div>
              <div className="form__section">
                <label htmlFor="type">Type</label>
                <Select
                  inputId="type"
                  name="type"
                  value={transaction.type}
                  onChange={handleSelectChange}
                  options={types}
                />
              </div>
              <div className="form__btns">
                <button
                  type="button"
                  onClick={() => navigate(`/transactions/transaction/${id}`)}
                >
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
              {error && (
                <div className="form__errors">
                  {error && <p style={{color: 'red'}}>{error[0]}</p>}
                  {error && <p style={{color: 'red'}}>{error[1]}</p>}
                  {error && <p style={{color: 'red'}}>{error[2]}</p>}
                </div>
              )}
            </form>
          )}
        </>
      )}
    </main>
  );
};

export default EditTransaction;
